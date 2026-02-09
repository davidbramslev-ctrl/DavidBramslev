document.addEventListener("DOMContentLoaded", () => {
  const filmItems = document.querySelectorAll(".film-list li");
  const modal = document.getElementById("modal");
  const videoFrame = document.getElementById("videoFrame");
  const filmInfo = document.getElementById("filmInfo");
  const body = document.body;

  const bgImages = {
    "THE WAIT": "media/TheWait.png",
    "OVER-WOKE": "media/OVER-WOKE1.png",
    "YOU LIKE DRUGS": "media/YouLikeDrugs1.png",
    "WHERE DID I GO": "media/WhereDidIGo.jpg",
    "EN LYCKLIG MAN": "media/EnLyckligman5.png",
    "WHITE ANASTASIA": "media/WHITEANASTASIA3.png",
    FEELINGS: "media/Feelings1.PNG",
    "KEVINS GOLD": "media/KevinsGold1.jpeg",
    "COFFEE BREAK": "media/CoffeeBreak1.JPG",
  };

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function clearBackground() {
    body.classList.remove("bg-cover");
    body.style.backgroundImage = "";
    body.style.backgroundSize = "";
    body.style.backgroundPosition = "";
    body.style.backgroundRepeat = "";
  }

  function setBackgroundFor(title) {
    const img = bgImages[title];
    if (img) {
      body.classList.add("bg-cover");
      body.style.backgroundImage = `url('${img}')`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
      body.style.backgroundRepeat = "no-repeat";
    } else {
      clearBackground();
    }
  }

  // --- Desktop behavior: hover preview + click opens modal
  filmItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.textContent.trim().toUpperCase();
      setBackgroundFor(title);

      // Handle "coming soon" items
      if (item.classList.contains("coming-soon")) {
        filmInfo.textContent = "COMING SOON";
        videoFrame.src = "";
        modal.classList.remove("hidden");
        body.classList.add("modal-open");
        return;
      }

      const videoUrl = item.getAttribute("data-video");
      const infoText = item.getAttribute("data-info") || "";

      videoFrame.src = videoUrl;
      filmInfo.textContent = infoText;
      modal.classList.remove("hidden");
      body.classList.add("modal-open");
    });

    item.addEventListener("mouseenter", () => {
      if (isMobile() || !modal.classList.contains("hidden")) return;
      const title = item.textContent.trim().toUpperCase();
      setBackgroundFor(title);
      item.classList.add("mobile-hover");
    });

    item.addEventListener("mouseleave", () => {
      if (isMobile() || !modal.classList.contains("hidden")) return;
      setTimeout(() => {
        const stillHovering = Array.from(filmItems).some((el) =>
          el.matches(":hover"),
        );
        if (!stillHovering) clearBackground();
        item.classList.remove("mobile-hover");
      }, 150);
    });
  });

  // --- Mobile: use IntersectionObserver to pick the 'in-view' item
  let observer;
  function initMobileObserver() {
    if (observer) observer.disconnect();
    if (!isMobile()) return;

    // When >60% of the li is visible, treat it as active
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.6) {
            // clear previous
            filmItems.forEach((i) => i.classList.remove("mobile-hover"));
            entry.target.classList.add("mobile-hover");
            const title = entry.target.textContent.trim().toUpperCase();
            setBackgroundFor(title);
          }
        });
      },
      { threshold: [0.6] },
    );

    filmItems.forEach((item) => observer.observe(item));
  }

  // initialize (and re-init on resize/orientation change)
  initMobileObserver();
  window.addEventListener("resize", initMobileObserver);
  window.addEventListener("orientationchange", initMobileObserver);

  // --- Modal close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      body.classList.remove("modal-open");
      videoFrame.src = "";
      clearBackground();
    }
  });
});
