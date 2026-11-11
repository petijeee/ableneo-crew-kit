# Ableneo Crew Hub

A Claude Code workspace that turns the **Ableneo brand strategy** into an operational
crew: a knowledge hub, specialized agents, an always-on brand context file, and
automation that keeps everything on-brand.

> **Claim:** *Intelligence that works.*

## What's in here

```
ABLENEO.md                 # Always-on brand operating context (read first)
knowledge/                 # The knowledge hub, distilled brand strategy & assets
  ├── README.md            # Index of the hub
  ├── brand-core.md        # Vision, mission, promise, essence, system
  ├── voice-and-tone.md    # Language principles + verbal codes
  ├── positioning.md       # Archetype, enemy, cultural role, narrative
  ├── audience.md          # Who we talk to + category entry points
  ├── design-manual.md     # Design Guidelines 2025 distilled, start here for visuals
  ├── offering.md          # 10 productized offerings, four-pillar lens
  ├── methodology-essa.md  # Four pillars + business impact first
  ├── templates/           # Official 16:9 pptx template + slot map
  ├── color-palette.md     # Brand colors with roles, tints & pairing rules
  ├── typography.md        # Ableneo + Poppins, hierarchy, alignment
  ├── logo-and-iconography.md # Logo usage, safe zone, misuse, icon system
  └── design-tokens.json   # Color, type, deck and motion tokens
deck-kit/                  # HTML render engine (carousels, social visuals, overlays)
video-system/              # Lock-in motion system + video quality gate
scripts/                   # Session hook, build_deck.py, video + AI b-roll tools
.claude/
  ├── agents/              # The crew (brand + production)
  ├── commands/            # Slash commands (/new-deck, /brand-check, /rewrite-voice)
  └── settings.json        # SessionStart hook + permission config
```
(The SessionStart hook script lives at `ableneo/scripts/session-start.sh`.)

## How to use it

1. **Open this repo in Claude Code.** The SessionStart hook surfaces the brand
   context automatically.
2. **Delegate to the crew.** Ask for a deck, copy, or a brand review and the right
   agent picks it up (e.g. *"draft a one-pager for CIOs"* → `copywriter`).
3. **Check before shipping.** Run `/brand-check` on any draft to validate it against
   `ABLENEO.md`.

## The crew

| Agent | Use it for |
|---|---|
| `brand-strategist` | Positioning calls, messaging architecture, "is this on-strategy?" |
| `copywriter` | Headlines, decks, web/sales copy in the Ableneo voice |
| `presentation-builder` | Deck structure & narrative arcs |
| `visual-designer` | Palette application, design tokens, visual identity |
| `brand-guardian` | Final QA against the brand guidelines |
| `content-linkedin` | LinkedIn posts, carousels, event comms |
| `web-ableneo` | ableneo.com content, SEO/AI-search, schema |
| `video-producer` | Event recordings into 9:16 social clips + captions |
| `ai-video-producer` | AI-generated product/explainer videos (ComfyUI + deck-kit) |

## Source material

Built from three sources:
- **ABLENEO Brand Strategy (FINAL)**, positioning, voice, audience, narrative.
- **ABLENEO Design Guidelines 2025**, logo, color system, typography, iconography.
- **Brand palette**, the official color values.

> **Decks:** the official 16:9 `ableneo_presentation_template.pptx` is in `knowledge/templates/`.
> `scripts/build_deck.py SPEC.json` builds on its 19 named layouts.
