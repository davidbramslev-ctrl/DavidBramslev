(() => {
  document.querySelectorAll(".project-player-poster").forEach((poster) => {
    poster.addEventListener("click", () => {
      const player = poster.closest(".project-detail-player");
      if (!player) return;

      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${poster.dataset.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&transparent=0`;
      iframe.title = poster.dataset.filmTitle;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;

      player.replaceChildren(iframe);
    });
  });
})();
