---
description: Rewrite text into the Ableneo voice, precise, clear, confident, human
---

Rewrite the following into the Ableneo voice: **$ARGUMENTS**

Use the `copywriter` agent. Apply `ableneo/knowledge/voice-and-tone.md`:
- Numbers over adjectives, swap vague claims for measurable phrasing; mark `[METRIC NEEDED: …]` instead of inventing numbers.
- Short declarative sentences. No hype, acronyms, or filler.
- Confident, remove "maybe / could / in the future."
- Human, strip corporate theater.
- Every headline must pass the glass-wall test.

Return the strongest single rewrite first. Show before → after only where it teaches
the principle. Add 1-2 alternatives only if a genuine choice exists. Then hand off to
`brand-guardian` if the text is customer-facing.
