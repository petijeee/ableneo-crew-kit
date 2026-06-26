# Assets

Where the reusable brand and production assets live. Paths are references, the large
binaries are not copied into this repo. Confirm a path before depending on it.

## Brand
- **Logo (SVG):** `video-pipeline/linkedin-intro/assets/logo-ableneo.svg` (in this repo).
- **Design guidelines (high-res PDF):**
  `/Users/peterurbanec/claude-transfer/CLAUDE-CODE/DASHBOARD/ableneo_design_guidelines_high-res.pdf`
  (several identical copies exist under `claude-transfer/CLAUDE-CODE/`).
- **Design tokens (machine-readable):** `ableneo/knowledge/design-tokens.json`.
- Color, type, logo rules: `color-palette.md`, `typography.md`, `logo-and-iconography.md`.

## Video production
- **Pipeline:** `video-pipeline/linkedin-intro/` (hyperframes + ffmpeg, see its `CLAUDE.md`).
- **Clip metadata:** `video-pipeline/linkedin-intro/clips.json`.
- **Compositions:** intro/outro/event-promo/lidri-transformacie under `compositions/`.

## Visual / carousel
- **Carousel + cover render:** `ableneo event promo/slides/generate.mjs`,
  `ableneo event promo/event-cover-hrivnak/` (Puppeteer HTML to PNG).

## Knowledge base (research retrieval)
- **Strategist KB CLI:** `strategist.py` (`ingest` / `ask` / `research` / `status`),
  store in `.strategist/`.

## Pending
- `ableneo/knowledge/templates/ableneo_presentation_template.pptx` is not yet present.
  The presentation-builder works from documented palette, type, and voice until it lands.
