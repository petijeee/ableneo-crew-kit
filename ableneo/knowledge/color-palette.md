# Color Palette

> Source of truth: **ABLENEO Design Guidelines 2025** + brand palette.
> Each color has official HEX and CMYK. Machine-readable values: `design-tokens.json`.

## The color rule
**Lime + Charcoal + White is the default. Sky Blue and Violet join Lime only as category coding.**
(Changed 2026-10-05 by Peter, from "one chromatic family at a time". Started on the web, now applies to all communication.)

- ✅ Lime + Charcoal/White/Grey (default, and the answer whenever there is nothing to code)
- ✅ Sky Blue or Violet + Charcoal/White/Grey (accent pieces)
- ✅ Lime, Sky Blue and Violet on one page/slide/scene **as category coding**: each item owns one family and keeps
  it through the whole piece (e.g. Telco lime, Banking sky blue, Insurance violet; process steps; chart series; chapters)
- ❌ Two families inside one element (one card, block, chip, icon, or one chart series)
- ❌ Color used decoratively with no category behind it
- ❌ Lime text on Violet/Blue or the reverse (insufficient contrast, visual noise, lost hierarchy)

Color is an accent (a dot, a line, a chip, a block, the key number), never a body fill. Neutrals carry the layout.

## Primary colors

| Name | HEX | CMYK | Role |
|---|---|---|---|
| **Lime** (Lime 100%) | `#CDDE00` | 25 / 0 / 100 / 0 | Primary brand color. Energy, the "signal." Highlights, key accents. |
| **Charcoal** (Charcoal 100%) | `#1D2024` | 76 / 68 / 62 / 72 | Primary text, dark surfaces/backgrounds. |
| **White** | `#FFFFFF` | 0 / 0 / 0 / 0 | Primary background. Space, clarity. |

### Lime tints (backgrounds, type, data viz)
| Tint | HEX | CMYK |
|---|---|---|
| Lime 80% | `#DCE84D` | 18 / 0 / 83 / 0 |
| Lime 70% | `#E1EB66` | 15 / 0 / 73 / 0 |
| Lime 60% | `#E6EF80` | 13 / 0 / 62 / 0 |
| Lime 50% | (50% tint of `#CDDE00`) |, |

### Charcoal tints
Charcoal 95% / 85% / 75% / 65%, progressively lighter charcoal/greys for surfaces,
typography, and data visualisation.

## Secondary colors

### Accents, for category coding next to Lime, never inside the same element
| Name | HEX | CMYK |
|---|---|---|
| **Violet** | `#B6B0F2` | 27 / 29 / 0 / 0 |
| **Sky Blue** | `#C3D3FD` | 20 / 12 / 0 / 0 |

### Neutrals
| Name | HEX | CMYK |
|---|---|---|
| **Steel Grey** | `#49576A` | 75 / 60 / 42 / 22 |
| Cool Grey 100 | (neutral) |, |
| Cool Grey 50 | (neutral) |, |
| Light Grey 100 | (neutral) |, |
| Light Grey 50 | (neutral) |, |

> Cool/Light grey HEX values weren't numerically specified in the guidelines deck
> (shown as swatches). Use the named steps from the brand asset library; when an exact
> value is needed, sample from the official palette file and update `design-tokens.json`.

## Usage guidance
- **Default scheme:** Charcoal + White + Lime. Lime is an accent, not a body color, it draws the eye to the one thing that matters (a number, a CTA, a highlight).
- **Data visualisation:** one family + charcoal/grey steps, with Lime on the single most important data point. When series are categories, code them one family per series and keep the coding consistent with the rest of the piece.
- **Accessibility:** keep chromatic colors on neutral backgrounds for contrast. Never set Lime type on Violet/Blue or vice versa.
- **Backgrounds:** Charcoal for dark mode, White for light mode, Lime as a full-bleed statement background (with Charcoal type only).
