# Templates

Official Ableneo source files. The crew builds against these directly.

## `ableneo_presentation_template.pptx`: provided ✓

The official 16:9 presentation template. **Source of truth for any slide deck.**
`presentation-builder` follows its slide master and named layouts; it does not
invent off-template layouts. Exact theme palette, format, fonts, and the full
layout inventory are pinned in `knowledge/design-tokens.json` → `presentation`.

### Specs (from the file)

- **Format:** 16:9, 18288000 × 10287000 EMU (20" × 11.25", 1920 × 1080 @ 96dpi)
- **Master:** 1 · **Layouts:** 19 · embeds the real Ableneo OTFs (Regular / Medium / SemiBold / Bold), so it renders on-brand on any machine.
- **Theme palette:** charcoal `#1D2024`, panel `#282B2F`, white `#FFFFFF`, light surface `#F5F5F5`, lime `#CDDE00`, periwinkle `#C3D3FD`, steel `#495769`, cool greys `#97A5B8` / `#BAC7DA`, light grey `#E7EBEF`.

### Layout map (pick by intent)

| Layout | Use for |
|---|---|
| **Cover** | Opening title slide |
| **Section Divider / Primary** | Major section break (lime/charcoal) |
| **Section Divider / Secondary** | Section break (periwinkle/neutral) |
| **Agenda / Overview** | Agenda / contents |
| **Title Only** | Bare title, no body |
| **Text – Single Column** | One column of running text |
| **Text – Two Columns** | Two-column text |
| **Text + Visual** | Text beside an image/visual |
| **Overview / Mixed content** | Mixed content overview |
| **Key Numbers – 3** | Three big stats |
| **Key Numbers – 6** | Six stats grid |
| **Cards – 4** | Four card tiles |
| **Cards – 6** | Six card tiles |
| **Timeline / Roadmap (4 Phases)** | Four-phase roadmap |
| **Timeline / Custom** | Custom timeline |
| **Process / Steps** | Step / process flow |
| **Quote – Centered** | Centered pull quote |
| **Quote – Left Aligned** | Left-aligned pull quote |
| **Contact** | Closing contact / CTA |

### How to build a deck

1. `presentation-builder` writes the slide-by-slide arc and maps each slide to a layout name above, then emits a **deck spec JSON** (schema below).
2. Voice and numbers follow `ABLENEO.md` + `knowledge/voice-and-tone.md`; color per `color-palette.md` (Lime default; accents only as category coding).
3. Assemble the real `.pptx` with the assembler:
   ```
   python3 ableneo/scripts/build_deck.py spec.json -o ableneo/outputs/my-deck.pptx
   ```
   It strips the template's example slides and builds your slides on the real layouts, so the deck inherits the master, theme palette, and embedded Ableneo fonts. For HTML/PDF social visuals (4:5) use `deck-kit` instead: that is a separate surface.
4. Run `/brand-check` (brand-guardian) before the deck goes out.

### Deck spec & slot map

- **Slot map:** `layout-slot-map.json` lists, per layout, the title idx, footer idx, and content slots in reading order with geometry. Regenerate it from the `.pptx` with `python3 ableneo/scripts/build_deck.py --dump-map`.
- **Spec schema:** a slide is `{ "layout": "<one of the 19 names>", "title": "...", "slots": [...] | {"<idx>": "..."}, "pictures": {"<idx>": "path.png"} }`.
  - `slots` as a **list** fills the layout's content slots in reading order (skips title idx 0 and footer idx 10).
  - `slots` as a **dict keyed by idx** gives exact control (use for Key Numbers, Cards, Timeline, Process where order is grid-like).
  - `title` fills idx 0. Layouts without a title (Cover, dividers) take the headline as the first `slots` entry.
- The assembler never sets fonts or colors; it only writes text into inherited placeholders, so brand styling comes from the template by construction.

### Notes for builders

- **Layout names are fixed identifiers.** They contain en dashes (`Key Numbers – 3`, `Text – Single Column`). The no-dash voice rule applies to slide copy, not to these names. Quote them verbatim when mapping slides.
- **Dividers follow the category coding.** The template ships a periwinkle `Section Divider / Secondary`. Alternate lime and periwinkle dividers only when the deck codes its chapters by family (one family per chapter, kept on that chapter's slides); otherwise use one divider style for the whole deck.
- **Repeating a layout is fine** when it creates intentional rhythm (e.g. `Key Numbers – 3` for the problem cost and again for the proof). Reuse for parallelism, not to pad.
- **Per-layout placeholder/slot detail is in `layout-slot-map.json`** (title idx, footer idx, content slots in reading order with geometry).
- **Display placeholders are sized for short copy.** Cover headline (156pt) and Contact title (178pt) have autofit off in the template. `build_deck.py` measures long copy and sets an explicit shrunk font size so it fits without overflowing into the next block; it only ever changes size, never family or color. Keep cover headlines and the Contact closing line short for the intended display impact; the shrink is a safety net, not a license for long titles.

> Note: the social/carousel surfaces in `design-tokens.json` (`deck`, `surface`) come from the Figma 4:5 carousel system and are intentionally distinct from this 16:9 presentation theme. Use the right surface for the job.
