# Templates

Official Ableneo source files. The crew builds against these directly.

## `ableneo_presentation_template.pptx` — provided ✓

The official 16:9 presentation template (1 master, 19 named layouts). The
`presentation-builder` agent maps every slide to one of its layouts; the
assembler `ableneo/scripts/build_deck.py` writes your content into the
inherited placeholders, so brand styling comes from the template by
construction.

### Fonts (read this)

This public copy **references the Ableneo fonts by name but does not embed the
font binaries** (they are proprietary). So:

- On a machine with the **Ableneo OTFs installed** → renders fully on-brand.
- Without them → PowerPoint substitutes a fallback font. Shape, layout, color
  and numbers stay on-brand; only the typeface differs.

Install the Ableneo OTFs (Light, Regular, Medium, SemiBold, Bold) on your
system for pixel-correct output.

## Build a deck

1. `presentation-builder` writes the slide-by-slide arc, maps each slide to a
   layout name, and emits a **deck spec JSON**.
2. Assemble the `.pptx`:
   ```
   python3 ableneo/scripts/build_deck.py spec.json -o ableneo/outputs/my-deck.pptx
   ```
   (needs `python-pptx`: `pip install python-pptx`)
3. Run `/brand-check` before it goes out.

## Slot map

`layout-slot-map.json` lists, per layout, the title/footer idx and content
slots in reading order with geometry. Regenerate it with
`python3 ableneo/scripts/build_deck.py --dump-map`. See the docstring at the
top of `build_deck.py` for the full spec schema.
