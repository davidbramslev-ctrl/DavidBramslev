(() => {
  const startVideo = (video) => {
    video.muted = true;
    video.playsInline = true;
    const play = () => video.play().catch(() => {});
    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }
  };

  const startAll = () => {
    document.querySelectorAll("video[autoplay]").forEach(startVideo);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAll);
  } else {
    startAll();
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startAll();
  });
})();
