# ableneo-crew

Unified AI crew for executing all Ableneo outputs. Peter orchestrates, agents execute,
all grounded in one shared knowledge hub.

> **Claim:** *Intelligence that works.*

## For colleagues

New here? Start with [`ableneo/COLLEAGUES.md`](ableneo/COLLEAGUES.md).

## Layout

```
ableneo/
  ABLENEO.md          # always-on operating context (read first)
  COLLEAGUES.md       # start here (manual pre kolegov)
  knowledge/          # single source of truth (brand system + offering + ESSA)
  deck-kit/           # branded render engine (decks, carousels, video overlays)
  scripts/            # session-start hook, video + AI b-roll tooling
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

## Voice rules (non-negotiable)
Precise (numbers over adjectives), clear, confident, human. No em dashes. No two-sentence
reject-then-replace ("We don't X. We do Y."). Glass-wall test on every headline.

## Notes
- Colleague version of the crew (brand system + production tooling). Commercial strategy,
  client specifics, performance, and publishing infrastructure stay in Peter's private workspace.
- Some actions need API keys (LinkedIn publishing, AI b-roll generation). You prepare and
  refine; final publish and metrics go through Peter.
