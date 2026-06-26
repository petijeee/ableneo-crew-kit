# Color Palette

> Source of truth: **ABLENEO Design Guidelines 2025** + brand palette.
> Each color has official HEX and CMYK. Machine-readable values: `design-tokens.json`.

## The one rule that breaks designs
**Only one chromatic color family at a time, Lime *or* Blue *or* Violet, and always
paired with neutrals (white, grey, black).**

- ✅ Lime + Charcoal/White/Grey
- ✅ Sky Blue + Charcoal/White/Grey
- ✅ Violet + Charcoal/White/Grey
- ❌ Lime + Violet, Lime + Blue, Blue + Violet (never mix chromatic families)
- ❌ Lime text on Violet/Blue (insufficient contrast, visual noise, lost hierarchy)

This keeps the system controlled, balanced, accessible, and distinctly recognisable.

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

### Accents, use one at a time, never with Lime
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
- **Data visualisation:** stay within one chromatic family + charcoal/grey steps; reserve Lime to highlight the single most important data point.
- **Accessibility:** keep chromatic colors on neutral backgrounds for contrast. Never set Lime type on Violet/Blue or vice versa.
- **Backgrounds:** Charcoal for dark mode, White for light mode, Lime as a full-bleed statement background (with Charcoal type only).
