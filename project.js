document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-media");
  const iframe = document.querySelector(".hero-video iframe");
  const playCursor = document.querySelector(".play-cursor");
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  if (!hero || !iframe || !playCursor) return;

  function syncPromptLabel() {
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
