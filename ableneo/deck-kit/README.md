# ableneo deck-kit

Shared rendering engine for on-brand Ableneo social/deck visuals. It encodes the
official Figma carousel system so every visual looks on-brand by construction, not
hand-built each time. Mirrors `ableneo/knowledge/design-tokens.json`.

## What it gives you
- **Real Ableneo font** (embedded from `assets/fonts/`, falls back to Poppins if absent).
- **Real logo** (`logoOnDark`, `logoOnLight`).
- **Tokens** (`TOKENS`, plus `LIME`, `CHARCOAL`, `PERI`, ...).
- **Signature devices**: background grid (`gridDark`/`gridLight`), giant
  ghost number, header row, arrow pill, panel cards.
- **Color variants** (`variants.dark` / `.light` / `.lime`) with matching logo, ink, grid.
- **Helpers**: `page()`, `head(tag,num,col)`, `arrow(stroke)`, `ghost(n,col,pos)`.
- **Manual modules** (Design Guidelines 2025, use these, don't re-implement per renderer):
  `variants.sky/.violet`, `rhythm` (slide backgrounds per manual set), `ghostOutline`, `icon`/`iconCircle`
  (solid = emphasis, outline = support), `block` (statement color block), `pill` (one key word),
  `supergraphic`, `dotMatrix(pct)`, `statBento(stats, 'dark'|'dark-violet'|'sky'|'violet')`.
  Visual index: `node render-manual-reference.mjs` → `outputs/deck-kit-manual-reference.png`.

## Design language (match the reference)
- **Headlines**: Ableneo **Light (300)**, large, letter-spacing -1px. Emphasis word in
  **Bold (700)**, in `LIME` (on dark) or `WHITE` (on lime) or inside a `PERI` block (on light).
- **Body**: Ableneo Regular (400), `sub` opacity.
- **Color per `color-palette.md`**: Lime default on neutral bg; periwinkle for blocks/pills; several families on one slide only as category coding, never two in one element.
- 1080×1350 (4:5). Margin 90. Card radius 18. Pill radius 60.
- Every slide: logo (bottom-left, or top on cover/CTA) + arrow pill (bottom-right) + header tag + page number; cover and CTA omit the number.

## Usage
```js
import { page, head, arrow, ghost, variants, LIME, CHARCOAL, PERI } from './deck-kit.mjs';
const v = variants.dark;
const slide = page(`<div class="slide" style="background:${v.bg};">${v.grid}
  <div class="pad"><div>${v.logo}</div>
    <div class="fill">
      <div class="h-light" style="font-size:104px;color:${v.ink};">Hook line</div>
      <div class="h-bold" style="font-size:104px;color:${LIME};">emphasis.</div>
    </div></div>
  <div class="foot"><span class="body" style="color:${v.sub};">[ tag ]</span>${arrow(v.arrowInk)}</div></div>`);
// then render slide HTML -> PNG (puppeteer), see example.mjs
```
Run the example: `node example.mjs` (renders `example-1.png`, `example-2.png`).
A full real deck built on this language: `../../ableneo event promo/carousel-lifecycle/render-v3.mjs`.

## Fonts (important)
`assets/fonts/Ableneo-*.otf` are proprietary brand fonts. They are **gitignored** and not
pushed. To use the kit, place the Ableneo OTFs (Light, Regular, Medium, SemiBold, Bold) into
`assets/fonts/`. Without them the kit renders in Poppins (the documented web fallback).
