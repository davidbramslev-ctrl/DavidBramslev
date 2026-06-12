# David Bramslev Portfolio

A lightweight static HTML/CSS portfolio for David Bramslev, a director, screenwriter and editor based between Oslo and Copenhagen.

## Live site

Published with GitHub Pages from the `main` branch.

## Open locally

Open `index.html` directly in a browser, or run a tiny local server from this folder:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

## Files

- `index.html` — landing page with positioning, selected work, availability, About and Contact sections, a fullscreen video hero and a typography-only work list with hover-reveal backgrounds.
- `the-wait.html` and the other root-level project pages — individual film/project pages with real media, loglines, on-site Vimeo embeds, project facts and optional stills/BTS sections where assets exist.
- `styles.css` — all typography, layout, responsive behavior, dark visual treatment, subtle motion, typography work links, hover-reveal backgrounds, and contrast styles.
- `assets/` — copied video, thumbnails, stills, portrait, and media used by this site.

## Where to edit text

- Change homepage titles, work entries, about text, contact email and availability copy in `index.html`.
- Change each project title, logline, Vimeo embed/link, year, role, location and description in its matching project HTML file.
- Adjust colors, spacing, type size, responsive breakpoints, and image treatments in `styles.css`.

The site keeps web-ready media in `assets/`. The homepage uses `assets/media/LOOPINGBGVID.mp4` as a fullscreen muted loop and overlays the David Bramslev nameplate directly on the video. The work section is text-only; hover/focus reveals each project image as the page background using the larger files in `assets/media/`, not the phone-oriented thumbnails.
