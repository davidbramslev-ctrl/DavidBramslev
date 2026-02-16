document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-media");
  const iframe = document.querySelector(".hero-video iframe");
  const playCursor = document.querySelector(".play-cursor");
  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const customCursorLabel = (hero?.dataset.cursorLabel || "").trim();
  const isComingSoon = customCursorLabel.toUpperCase() === "COMING SOON";

  if (!hero || !playCursor) return;

  function syncPromptLabel() {
    if (customCursorLabel) {
      playCursor.textContent = customCursorLabel;
      return;
    }
    playCursor.textContent = mobileQuery.matches ? "CLICK TO PLAY" : "PLAY";
  }

  function syncPromptOpacity() {
    if (!mobileQuery.matches) {
      playCursor.style.opacity = "";
      return;
    }
    if (hero.classList.contains("is-playing")) {
      playCursor.style.opacity = "0";
      return;
    }
    const fadeDistance = 140;
    const progress = Math.min(window.scrollY / fadeDistance, 1);
    playCursor.style.opacity = String(1 - progress);
  }

  syncPromptLabel();
  syncPromptOpacity();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", () => {
      syncPromptLabel();
      syncPromptOpacity();
    });
  } else {
    mobileQuery.addListener(() => {
      syncPromptLabel();
      syncPromptOpacity();
    });
  }

  window.addEventListener("scroll", syncPromptOpacity, { passive: true });

  function playVideo() {
    if (isComingSoon || !iframe) return;
    const url = hero.getAttribute("data-video");
    if (!url) return;
    const joiner = url.includes("?") ? "&" : "?";
    iframe.src = `${url}${joiner}autoplay=1&title=0&byline=0&portrait=0`;
    hero.classList.add("is-playing");
    syncPromptOpacity();
  }

  hero.addEventListener("mousemove", (event) => {
    if (hero.classList.contains("is-playing")) return;
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    playCursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    playCursor.style.opacity = "1";
  });

  hero.addEventListener("mouseleave", () => {
    playCursor.style.opacity = "0";
  });

  hero.addEventListener("click", playVideo);
});
