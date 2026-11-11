# Assets

Reusable brand and production assets in this repo.

## Brand
- **Logo (SVG):** `ableneo/deck-kit/assets/ableneo-logo-on-dark.svg`, `...-on-light.svg`.
- **Design manual:** `design-manual.md` (Design Guidelines 2025 distilled; the PDF lives on Confluence).
- **Design tokens (machine-readable):** `ableneo/knowledge/design-tokens.json`.
- **Fonts:** Ableneo OTF is proprietary and is not in this repo. Poppins is the web fallback.
  See `ableneo/deck-kit/assets/fonts/README.md`.
- Color, type, logo rules: `color-palette.md`, `typography.md`, `logo-and-iconography.md`.

## Render engine (decks, carousels, video overlays)
- **deck-kit:** `ableneo/deck-kit/deck-kit.mjs` (tokens, colors, fonts, components).
- **Example:** `ableneo/deck-kit/example.mjs`.
- **Visual index of every manual module:** `node ableneo/deck-kit/render-manual-reference.mjs`.
- **pptx decks on the official template:** `python ableneo/scripts/build_deck.py SPEC.json`
  (template + slot map in `ableneo/knowledge/templates/`).

## Video / AI b-roll
- **Transcribe (event recording to text + srt):** `ableneo/scripts/transcribe.sh`.
- **9:16 social render (letterbox + brand subtitles):** `ableneo/scripts/make-9x16.sh`.
- **ComfyUI Cloud client (AI b-roll):** `ableneo/scripts/comfy_client.py` (needs an API key).
- **Workflows:** `ableneo/workflows/` (ComfyUI API format).

## Motion
- **Lock-in system:** `ableneo/video-system/MOTION.md` (spec) + `motion.mjs` (GSAP helpers).
- **Quality gate:** `ableneo/video-system/RUBRIC.md`; standard: `REFERENCE-BIBLE.md`.
