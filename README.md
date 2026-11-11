# ableneo-crew-kit

A public brand kit for Ableneo colleagues. Open it in Claude Code, describe what you need,
and the agents produce decks, posts, visuals and videos that follow the Ableneo brand guidelines.

> **Claim:** *Intelligence that works.*

## Source of truth (in this order)
1. **ABLENEO Design Guidelines 2025** is the top authority. If anything in this repo conflicts
   with it, the guidelines win. Distilled in `ableneo/knowledge/design-manual.md`; the PDF lives on Confluence.
2. **ABLENEO Brand Strategy (FINAL)** for voice, positioning and audience, where the guidelines are silent.
3. **`ableneo/knowledge/`** distills both. Agents and outputs follow it.

The only documented exceptions are the web rules and the color-coding rule listed in `design-manual.md`.

## For colleagues

New here? Start with [`ableneo/COLLEAGUES.md`](ableneo/COLLEAGUES.md).

## Layout

```
ableneo/
  ABLENEO.md          # always-on operating context (read first)
  COLLEAGUES.md       # start here (manual pre kolegov)
  knowledge/          # single source of truth (brand system, design manual, offering, method)
  deck-kit/           # branded render engine (carousels, social visuals, video overlays)
  video-system/       # Lock-in motion system + video quality gate
  scripts/            # session-start hook, build_deck.py (pptx), video + AI b-roll tooling
  workflows/          # ComfyUI workflows (API format)
  outputs/            # your dated deliverables (YYYY-MM-DD-ableneo-*)
.claude/
  agents/             # the crew (brand + production)
  commands/           # /new-deck, /brand-check, /rewrite-voice
  settings.json       # SessionStart hook registration
```

## The crew

**Brand layer:** brand-strategist, copywriter, presentation-builder, visual-designer, brand-guardian.
**Production layer:** content-linkedin, web-ableneo, video-producer, ai-video-producer.

## Brand rules (non-negotiable)
- **Voice:** precise (numbers over adjectives), clear, confident, human. No em dashes. No
  two-sentence reject-then-replace ("We don't X. We do Y."). Glass-wall test on every headline.
- **Color:** Lime `#CDDE00` + Charcoal `#1D2024` + White by default. Sky Blue / Violet only as
  category coding, one family per item, never two in one element. No lime top bar.
- **Method:** four pillars, Human, Process, Technology, Data. Security underneath, governance on top.
- **Visuals:** start at `ableneo/knowledge/design-manual.md`.

## Notes
- Colleague version of the crew (brand system + production tooling). Commercial strategy,
  client specifics, performance, and publishing infrastructure stay in Peter's private workspace.
- Some actions need API keys (LinkedIn publishing, AI b-roll generation). You prepare and
  refine; final publish and metrics go through Peter.
