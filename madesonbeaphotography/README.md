# Madeson Bea Photography — Website

A conversion-focused, photography-first website for Madeson Bea (Northern California,
Sacramento to Chico). Static HTML/CSS/JS — no build step, no dependencies.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000      # then visit http://localhost:8000
```

## Pages

- `index.html` — homepage (conversion journey: hero → trust → work → experience → about → services → testimonials → process → final CTA)
- `portfolio.html` — filterable portfolio (real galleries)
- `experience.html` — process + FAQ
- `about.html` — about Madeson
- `inquire.html` — inquiry/booking page with confirmation state

## Where the photos come from

The site currently loads real photos directly from Madeson's public Pixieset
galleries (`images.pixieset.com`) — DIAZ, Kiddos, Baby Miller, All-Stars,
Dodgers, Nico & Sidra, Amy (live), Chikoko, Farm to Fork, Olivia, Rachel.

**Before real launch, replace the hotlinks with exported files:**

1. Export high-res versions from Pixieset (or the originals from Lightroom).
2. Drop them in `images/` and update each `<img src="...">` to the local path.
3. Recommended sizes: hero ≥ 2400px wide; grid images ≥ 1600px on the long side.
   Convert to WebP for ~30% smaller files (e.g. with squoosh.app).

Why: hotlinked images break if a gallery is deleted or re-uploaded, and Pixieset's
1024–1600px renditions are below ideal for a full-bleed hero on large screens.
The `images/` folder still contains styled placeholder frames — the site falls back
to a broken-image box only if a Pixieset URL disappears, so do the swap before launch.

## Still needed from Madeson

- A portrait of Madeson for the About sections (currently a styled placeholder at `images/about-portrait.jpg`)
- 2–3 real client testimonials (search `[Client Name]` in the HTML)
- Instagram/Facebook URLs (footer links are `#` placeholders)
- Final domain — update `rel="canonical"` URLs and the JSON-LD block in each page head
- Confirmation of the 24-hour reply promise used across the site

## Wiring up the inquiry form

The form on `inquire.html` currently runs in demo mode (`action="#demo"`), showing
the confirmation state without sending anything. To make it live, either:

- **Formspree**: create a form at formspree.io, set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`, or
- **Netlify Forms** (if hosted on Netlify): add `data-netlify="true"` to the `<form>`, or
- Point it at any endpoint and adapt the handler in `js/main.js` (see the comment in the submit listener).

Set up an instant auto-acknowledgment email — replying fast is the single biggest
conversion lever (research: connection likelihood is ~100x higher inside 5 minutes).

## Performance & accessibility already handled

Self-hosted variable fonts (one WOFF2 each for Fraunces + Inter), hero preloaded and
never lazy-loaded, everything below the fold lazy-loaded, explicit dimensions +
CSS aspect-ratio on all images (no layout shift), reveal animations disabled under
`prefers-reduced-motion`, WCAG AA contrast throughout, keyboard-accessible nav and
forms, semantic headings, per-page titles/descriptions, LocalBusiness JSON-LD.
