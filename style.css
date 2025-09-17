document.addEventListener("DOMContentLoaded", () => {

  const filmItems = document.querySelectorAll(".film-list li");
  const body = document.body;

  // Map titles to background images
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

  // Find the film title closest to the top
  function getTopItem() {
    let topItem = null;
    let minTop = Infinity;
    filmItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top >= 60 && rect.top < minTop) { // 60px ~ header height
        minTop = rect.top;
        topItem = item;
      }
    });
    return topItem;
  }

  // Apply highlight + background on scroll
  function updateMobileHighlightBg() {
    if (!isMobile()) return;

    filmItems.forEach(item => {
      item.classList.remove("mobile-hover");
    });

    const topItem = getTopItem();
    if (topItem) {
      topItem.classList.add("mobile-hover");
      const title = topItem.textContent.trim().toUpperCase();
      const imgPath = bgImages[title];
      if (imgPath) {
        body.style.backgroundImage = `url('${imgPath}')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
      }
    } else {
      body.style.backgroundImage = "";
    }
  }

  window.addEventListener("scroll", updateMobileHighlightBg, { passive: true });
  window.addEventListener("resize", updateMobileHighlightBg);
  updateMobileHighlightBg();

    // Desktop: keep hover/click logic
    filmItems.forEach(item => {
      item.addEventListener("click", () => {
        const videoUrl = item.getAttribute("data-video");
        const infoText = item.getAttribute("data-info");
        const title = item.textContent.trim().toUpperCase();
        const imgPath = bgImages[title];
        if (imgPath) {
          body.style.backgroundImage = `url('${imgPath}')`;
          body.style.backgroundSize = 'cover';
          body.style.backgroundPosition = 'center';
          body.style.backgroundRepeat = 'no-repeat';
          modalActive = true;
        }
        videoFrame.src = videoUrl;
        filmInfo.textContent = infoText;
        modal.classList.remove("hidden");
      });
      if (!isMobile()) {
        item.addEventListener("mouseenter", () => {
          if (modalActive) return;
          const title = item.textContent.trim().toUpperCase();
          const imgPath = bgImages[title];
          if (imgPath) {
            body.style.backgroundImage = `url('${imgPath}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.backgroundRepeat = 'no-repeat';
            item.classList.add('mobile-hover');
          }
        });
        item.addEventListener("mouseleave", () => {
          if (modalActive) return;
          setTimeout(() => {
            // Only clear background if not hovering any film title
            const isHoveringAny = Array.from(filmItems).some(el => el.matches(':hover'));
            if (!isHoveringAny) {
              body.style.backgroundImage = '';
              item.classList.remove('mobile-hover');
            }
          }, 500);
        });
      }
    });

    // Close modal when clicking outside modal-content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        videoFrame.src = ""; // Stop video when closing
        body.style.backgroundImage = '';
        modalActive = false;
      }
    });
});
