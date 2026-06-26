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
  ├── color-palette.md     # Brand colors with roles, tints & pairing rules
  ├── typography.md        # Ableneo + Poppins, hierarchy, alignment
  ├── logo-and-iconography.md # Logo usage, safe zone, misuse, icon system
  └── design-tokens.json   # Machine-readable design tokens
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

> ⚠️ **Pending:** `ableneo_presentation_template.pptx` was not provided. The
> `presentation-builder` works from the documented palette, type, and voice; drop the
> template into `knowledge/templates/` and update `design-tokens.json` to wire it in.
