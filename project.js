document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-media");
  const iframe = document.querySelector(".hero-video iframe");
  const playCursor = document.querySelector(".play-cursor");

  if (!hero || !iframe || !playCursor) return;

  function playVideo() {
    const url = hero.getAttribute("data-video");
    if (!url) return;
    const joiner = url.includes("?") ? "&" : "?";
    iframe.src = `${url}${joiner}autoplay=1&title=0&byline=0&portrait=0`;
    hero.classList.add("is-playing");
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
