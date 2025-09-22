diff --git a/script.js b/script.js
index 988d0ccbc74d3bef9c59aa35701854e2abb35612..28c07a251ad205d72acc196076e52adaaa026856 100644
--- a/script.js
+++ b/script.js
@@ -1,100 +1,183 @@
 document.addEventListener("DOMContentLoaded", () => {
   const filmItems = document.querySelectorAll(".film-list li");
   const modal = document.getElementById("modal");
   const videoFrame = document.getElementById("videoFrame");
   const filmInfo = document.getElementById("filmInfo");
   const body = document.body;
+  const header = document.querySelector(".site-header");
 
   const bgImages = {
     "OVER-WOKE": "media/OVER-WOKE1.png",
     "YOU LIKE DRUGS": "media/YouLikeDrugs1.png",
     "WHERE DID I GO": "media/WhereDidIGo.jpg",
     "EN LYCKLIG MAN": "media/EnLyckligman5.png",
     "WHITE ANASTASIA": "media/WHITEANASTASIA3.png",
     "FEELINGS": "media/Feelings1.PNG",
     "KEVINS GOLD": "media/KevinsGold1.jpeg",
     "COFFEE BREAK": "media/CoffeeBreak1.JPG"
   };
 
   function isMobile() {
     return window.innerWidth <= 768;
   }
 
+  let activeItem = null;
+  let isModalOpen = false;
+  let scrollScheduled = false;
+  let mobileScrollEnabled = false;
+
   function setBackgroundFor(title) {
     const img = bgImages[title];
     if (img) {
       body.style.backgroundImage = `url('${img}')`;
       body.style.backgroundSize = "cover";
       body.style.backgroundPosition = "center";
       body.style.backgroundRepeat = "no-repeat";
     } else {
       body.style.backgroundImage = "";
     }
   }
 
+  function setActiveItem(item, options = {}) {
+    const { force = false } = options;
+
+    if (!force && item === activeItem) {
+      return;
+    }
+
+    filmItems.forEach(el => {
+      el.classList.toggle("mobile-hover", el === item);
+    });
+
+    activeItem = item || null;
+
+    if (item) {
+      const title = item.textContent.trim().toUpperCase();
+      setBackgroundFor(title);
+    } else {
+      body.style.backgroundImage = "";
+    }
+  }
+
+  function handleDesktopHoverLeave(item) {
+    if (isMobile() || isModalOpen) return;
+
+    const stillHovering = Array.from(filmItems).some(el => el.matches(":hover"));
+    if (!stillHovering) {
+      setActiveItem(null);
+    }
+  }
+
   // --- Desktop behavior: hover preview + click opens modal
   filmItems.forEach(item => {
     item.addEventListener("click", () => {
       const videoUrl = item.getAttribute("data-video");
       const infoText = item.getAttribute("data-info") || "";
       const title = item.textContent.trim().toUpperCase();
 
-      setBackgroundFor(title);
+      setActiveItem(item, { force: true });
       videoFrame.src = videoUrl;
       filmInfo.textContent = infoText;
       modal.classList.remove("hidden");
+      isModalOpen = true;
     });
 
     item.addEventListener("mouseenter", () => {
-      if (isMobile() || !modal.classList.contains("hidden")) return;
-      const title = item.textContent.trim().toUpperCase();
-      setBackgroundFor(title);
-      item.classList.add("mobile-hover");
+      if (isMobile() || isModalOpen) return;
+      setActiveItem(item, { force: true });
     });
 
     item.addEventListener("mouseleave", () => {
-      if (isMobile() || !modal.classList.contains("hidden")) return;
-      setTimeout(() => {
-        const stillHovering = Array.from(filmItems).some(el => el.matches(":hover"));
-        if (!stillHovering) body.style.backgroundImage = "";
-        item.classList.remove("mobile-hover");
-      }, 150);
+      if (isMobile() || isModalOpen) return;
+      setTimeout(() => handleDesktopHoverLeave(item), 150);
     });
   });
 
-  // --- Mobile: use IntersectionObserver to pick the 'in-view' item
-  let observer;
-  function initMobileObserver() {
-    if (observer) observer.disconnect();
-    if (!isMobile()) return;
-
-    // When >60% of the li is visible, treat it as active
-    observer = new IntersectionObserver(entries => {
-      entries.forEach(entry => {
-        if (entry.intersectionRatio > 0.6) {
-          // clear previous
-          filmItems.forEach(i => i.classList.remove("mobile-hover"));
-          entry.target.classList.add("mobile-hover");
-          const title = entry.target.textContent.trim().toUpperCase();
-          setBackgroundFor(title);
-        }
-      });
-    }, { threshold: [0.6] });
-
-    filmItems.forEach(item => observer.observe(item));
+  function findItemClosestToAnchor(anchorY) {
+    let candidate = null;
+    let nextBelow = null;
+    let lastAbove = null;
+
+    for (const item of filmItems) {
+      const rect = item.getBoundingClientRect();
+      if (rect.top <= anchorY && rect.bottom >= anchorY) {
+        candidate = item;
+        break;
+      }
+
+      if (rect.top > anchorY && !nextBelow) {
+        nextBelow = item;
+      }
+
+      if (rect.bottom < anchorY) {
+        lastAbove = item;
+      }
+    }
+
+    return candidate || lastAbove || nextBelow || null;
+  }
+
+  function updateMobileActive(force = false) {
+    if (!isMobile() || isModalOpen) return;
+
+    const headerRect = header ? header.getBoundingClientRect() : null;
+    const anchorY = (headerRect ? headerRect.bottom : 0) + 16;
+    const nextItem = findItemClosestToAnchor(anchorY) || filmItems[filmItems.length - 1];
+
+    if (nextItem) {
+      setActiveItem(nextItem, { force });
+    }
+  }
+
+  function scheduleMobileUpdate() {
+    if (!mobileScrollEnabled || scrollScheduled) return;
+
+    scrollScheduled = true;
+    requestAnimationFrame(() => {
+      scrollScheduled = false;
+      updateMobileActive();
+    });
+  }
+
+  function enableMobileScrollTracking() {
+    if (mobileScrollEnabled) return;
+
+    mobileScrollEnabled = true;
+    window.addEventListener("scroll", scheduleMobileUpdate, { passive: true });
+    updateMobileActive(true);
+  }
+
+  function disableMobileScrollTracking() {
+    if (!mobileScrollEnabled) return;
+
+    window.removeEventListener("scroll", scheduleMobileUpdate);
+    mobileScrollEnabled = false;
+    scrollScheduled = false;
+    if (!isModalOpen) {
+      setActiveItem(null);
+    }
+  }
+
+  function handleViewportChange() {
+    if (isMobile()) {
+      enableMobileScrollTracking();
+    } else {
+      disableMobileScrollTracking();
+    }
   }
 
-  // initialize (and re-init on resize/orientation change)
-  initMobileObserver();
-  window.addEventListener("resize", initMobileObserver);
-  window.addEventListener("orientationchange", initMobileObserver);
+  handleViewportChange();
+  window.addEventListener("resize", handleViewportChange);
+  window.addEventListener("orientationchange", handleViewportChange);
 
   // --- Modal close
   modal.addEventListener("click", (e) => {
     if (e.target === modal) {
       modal.classList.add("hidden");
       videoFrame.src = "";
       body.style.backgroundImage = "";
+      isModalOpen = false;
+      updateMobileActive(true);
     }
   });
 });
