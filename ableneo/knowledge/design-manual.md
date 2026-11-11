# Design manual

> Source of truth for every visual: **ABLENEO Design Guidelines 2025** (36 pages).
> Any visual, deck, carousel or video starts here. The other knowledge files are its distillation.

## Where it lives
- **Confluence (canonical):** Marketing & Sales → BRAND REFRESH 2026 → 02. Design Guidelines
  (`ableneo_design_guidelines_all.pdf`). Next to it: 03 Templates, 04 Assets, 07 LOGOS.
- **Local copy:** download the PDF from Confluence; it is not stored in this repo.
- **Read it:** `pdftoppm -r 30 -png <pdf> p`, then view the pages.

## Structure
| Section | Page | Distilled in |
|---|---|---|
| 01 Logo & Mark Design | 3 | `logo-and-iconography.md` |
| 02 Safe Zone & Usage | 9 | `logo-and-iconography.md` |
| 03 Color Palette | 14 | `color-palette.md`, `design-tokens.json → color` |
| 04 Typography | 23 | `typography.md`, `design-tokens.json → typography` |
| 05 Brand Claim | 29 | `brand-core.md` ("Intelligence that works") |
| 06 Iconography | 31 | `logo-and-iconography.md` |

## Signature elements (reuse these, don't invent new ones)
- **Supergraphic:** the logo mark scaled up and cropped off the edge, about 5% on charcoal. Covers and section dividers.
- **Section divider:** big lime index number (01, 02) + title in Light + arrow in a circle, bottom right.
- **Label chip:** small lime chip with the section name, top left (charcoal text).
- **Logo** bottom left on every page (top on covers and CTA). Approved variants only.
- **Icons in circles:** solid (lime fill, charcoal line) for emphasis, linear (outline) for support. Rounded, one stroke weight.
- **Color blocks** that hold the key statement. Emphasis inside: white bold on a color block, lime bold on charcoal.
- **Pill highlight** around one key word.
- **Data viz** in one color family (bars, dot matrix e.g. 80%, pie; Lime tints for series), or one family per category when series are categories.
- **Photography:** lime duotone or neutral, never competing with the chromatic family.
- **Web set** (diamond, contrast chips, line-art drawings, expandable cards, logo marquee): see *Application: Web* below.

## Application: LinkedIn carousel (Figma templates)
Three sets in the manual: **primary colours**, **primary + accent** (Sky Blue / Violet), **with photography**.
Slide pattern: cover (headline + statement block) → header row (tag + page no.) with a giant ghost
page number (outline on light, low-contrast fill on dark) → icon list → full-color slide with a big
icon circle and a pill word → CTA slide (arrow circle + lime button + photo).
Color families alternate between slides, or sit on one slide as category coding (one family per item, never two in one element). Engine: `ableneo/deck-kit/`.
Primary + accent set keeps the primary backgrounds (dark, light, light, dark, lime, dark); the accent (Sky Blue OR Violet, one per carousel) enters as a statement block on a light slide. Only the photo set gives the accent a full slide.

## Application: Stat cards (bento)
Source: Figma **MARKETING-COMMS** (`figma.com/design/yI2oG1wTw2ZACI9wqoC6ou`, page *templates* › section *Case_study*, nodes 12:1105–12:1186). Engine: `statBento()` in deck-kit, 1:1 geometry.
- Four schemes: charcoal frame + lime hero + white tile + **Sky Blue** text tile; same with **Violet** text tile; **Sky** (`#C7D6FD`) or **Violet** (`#CBC6F6`) frame + white hero + charcoal tile with lime number + **Steel** (`#49576A`) text tile.
- Number: digits **Ableneo Medium 195 px**, unit (%, ×) **Ableneo Light**, centered in the tile. Labels **Poppins Regular 44 px**, centered.
- Text tile: kicker Poppins 44 px + main line Ableneo Medium 95 px / 84 px, centered. Logo tile is outline only (4 px), square corners everywhere, faint supergraphic on the frame.
- Note: Figma violet `#CBC6F6` differs from tokens `#B6B0F2`.

The same Figma file also holds: Medium blog headers, single image (photo + lime mark), case-study photo sets (NBS, ZSE, ČSOB), Humans of ableneo, LinkedIn banners, workshop covers, all three carousel sets.

## Application: Web (ableneo.com redesign, 2026)
Source: Figma Draft 2.1, built in `ableneo/web-homepage-v2/` (live preview in the homepage artifact).
Adopted into the visual approach on 2026-10-05 at Peter's request. Exact values: `design-tokens.json → web`.

**Principles**
- **Dark first, one light break.** Charcoal is the base. White sections are pauses for the argument
  (capabilities, proof), never more than one in a row.
- **Big and calm type.** Headlines in Ableneo Regular at large size (hero 72/80, section 48/56), all white,
  no colored words in the headline, no closing period. A small uppercase eyebrow label (Poppins SemiBold 12, tracking 0.72)
  sits above every headline. Body in Poppins Light 16/24 or 20/28.
- **Hairlines, not boxes.** 1px lines in `#404246` on charcoal frame cards, split columns and draw
  texture (vertical line grids, horizontal rules). Square corners everywhere except the diamond.
- **Color is an accent on a line or a dot.** A 12px dot before the label, a 2px bar at the card bottom,
  a filled chip. Never a colored headline, never a colored paragraph.
- **The number leads.** Stat number large (80 desktop / 44 mobile) in the card's accent, label under it,
  story in a separate column behind a hairline.
- **Drawings, not photos.** Illustrations are thin technical line art (1.5px, `#3B3E44`) cropped by the
  card edge, plus one or two small white accents (cloud, signal, lock, shield). One drawing per industry:
  telco tower, bank facade, umbrella, wind turbine. Generator: `web-homepage-v2/tools/result_art.py`.
- **Text lives in HTML.** No quotes, names or labels baked into images.

**Signature elements from the web** (use these on web and digital; propose before reusing elsewhere)
- **The diamond:** rounded square rotated 45° (136px, radius 32, 2px lime stroke, charcoal fill) holding
  a white arrow. Enters as a rolling circle that locks into the diamond (Lock-in easings, 1.6s, replays on hover).
  It continues the circle-to-square Lottie from the old ableneo.com.
- **Contrast chips:** before/after pairs. Dim chip (charcoal, hairline border, grey text) for what the market
  does, white chip (white fill, charcoal text) for what we do, joined by a line grid.
- **Expandable result cards:** one card open at a time. The open card shows the drawing, the story column
  and an accent bottom bar; closed cards show only the number and a `+` box.
- **Logo marquee:** monochrome client logos in `#596677`, grouped by industry under eyebrow labels,
  endless 60s linear loop, edge fade, pauses on hover, static when reduced motion is on.
- **Proof row:** short regulated-grade facts with a lime dot bullet (ISO 27001, ECB assessment, tender wins).
- **Buttons:** lime fill with charcoal uppercase Poppins SemiBold, square corners; secondary is a 1px white
  outline; the big CTA button is charcoal with an arrow on the right.

**Layout and behavior**
- 1440 artboard, 1328 container, 56px gutters; mobile breakpoint 768px, 20px gutters, everything stacks.
- Reveal on scroll: 16px rise, 0.5s. Every animation has a `prefers-reduced-motion` fallback.

**Web rules that differ from the manual** (decided by Peter, 2026-10-05; they apply to web only)
- **Several chromatic families on one page are allowed as category coding** (born here, now the general
  rule for all communication, see `color-palette.md`).
- **Headlines in Ableneo Regular** at large size, instead of Bold.
- **Stat numbers are Regular, sized up** (80px) instead of bolded.
- **No period at the end of a headline.** This covers display lines too (eyebrow, h1, h2, contrast lines,
  CTA headline). Body copy keeps its punctuation.

## Motion
The manual has no motion section. Motion is defined by the **Lock-in** system:
`ableneo/video-system/MOTION.md`, helpers in `video-system/motion.mjs`, tokens in
`design-tokens.json → motion` (`motion.elements` maps every element above to its move).
The partial lime top bar is **not** a brand element. It is not in the manual and is retired everywhere (static, decks, social, motion) since 2026-10-19 by Peter's call.

## Known gaps vs. the manual
- Steel Grey: manual reads `#49576A`, the presentation template theme uses `#495769` (tokens follow the template).
- Charcoal tints 95/85/75/65 and Lime 50 have no pinned hex yet.
