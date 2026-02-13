document.addEventListener("DOMContentLoaded", () => {
  const filmItems = document.querySelectorAll(".film-item");
  const body = document.body;
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  const bgImages = {
    "THE WAIT": "media/thewait.png",
    "OVER-WOKE": "media/over-woke1.png",
    "YOU LIKE DRUGS": "media/youlikedrugs1.png",
    "WHERE DID I GO": "media/wheredidigo.jpg",
    "EN LYCKLIG MAN": "media/enlyckligman5.png",
    "WHITE ANASTASIA": "media/whiteanastasia3.png",
    FEELINGS: "media/feelings1.png",
    "KEVINS GOLD": "media/kevinsgold1.jpeg",
  };

  function isMobile() {
    return mobileQuery.matches;
  }

  function clearBackground() {
    body.classList.remove("bg-cover");
    body.style.backgroundImage = "";
    body.style.backgroundSize = "";
    body.style.backgroundPosition = "";
    body.style.backgroundRepeat = "";
  }

  function setBackgroundFor(title) {
    if (isMobile()) return;
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

  filmItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      const title = item.dataset.title || "";
      setBackgroundFor(title);
      item.classList.add("mobile-hover");
    });

    item.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      setTimeout(() => {
        const stillHovering = Array.from(filmItems).some((el) =>
          el.matches(":hover"),
        );
        if (!stillHovering) clearBackground();
        item.classList.remove("mobile-hover");
      }, 150);
    });
  });

  const comingSoonItems = document.querySelectorAll(".film-item.coming-soon");
  comingSoonItems.forEach((item) => {
    const link = item.querySelector("a");
    const showBadge = () => {
      if (isMobile()) return;
      item.classList.add("is-active");
    };
    if (link) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showBadge();
      });
    }
    item.addEventListener("click", (event) => {
      event.preventDefault();
      showBadge();
    });

    item.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      item.classList.remove("is-active");
    });
  });
});
