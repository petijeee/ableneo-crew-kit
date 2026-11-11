#!/usr/bin/env bash
# Ableneo Crew Hub, SessionStart hook (corrected for the ableneo/ subdir layout).
# Surfaces the brand operating context at the start of every session so the crew
# stays on-brand without being asked. Output is injected into the session context.
#
# To enable: register this in .claude/settings.json as a SessionStart hook
# (see ableneo/README.md). Path below assumes the repo root.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

emit() { printf '%s\n' "$1"; }

emit "ABLENEO CREW HUB, claim: \"Intelligence that works.\""
emit ""
emit "Brand canon is loaded. Before producing anything, honor:"
emit "  - ableneo/ABLENEO.md, always-on brand operating context"
emit "  - ableneo/knowledge/design-manual.md, ABLENEO Design Guidelines 2025: source of truth for every visual (signature elements, carousel templates)"
emit "  - ableneo/knowledge/, brand-core, voice-and-tone, positioning, audience, color-palette, typography, logo-and-iconography"
emit "  - ableneo/knowledge/ offering layer: offering, methodology-essa, assets"
emit ""
emit "Non-negotiable voice (Peter's rules win):"
emit "  - Precise (numbers over adjectives), clear, confident, human. Glass-wall test on every headline."
emit "  - No em dashes. No two-sentence reject-then-replace (\"We don't X. We do Y.\")."
emit "  - Color: Lime + Charcoal + White by default; Sky Blue / Violet join only as category coding (one family per item, never two in one element, color only on neutrals)."
emit "  - Type: Ableneo (Poppins on web). Headline Bold / Subhead SemiBold / Body Regular. Bold the number (web: Regular, sized up, no headline period)."
emit "  - Motion: Lock-in system (video-system/MOTION.md, motion.mjs, tokens -> motion). No lime top bar in motion."
emit ""
emit "Brand crew (.claude/agents): brand-strategist, copywriter, presentation-builder, visual-designer, brand-guardian"
emit "Production crew: content-linkedin, web-ableneo, video-producer, ai-video-producer"
emit "Commands: /new-deck, /brand-check, /rewrite-voice"


if [ -f "$ROOT/ableneo/knowledge/templates/ableneo_presentation_template.pptx" ]; then
  emit ""
  emit "Deck system: official 16:9 ableneo_presentation_template.pptx is in knowledge/templates/ (1 master, 19 named layouts, embeds Ableneo OTFs). presentation-builder builds on its layouts; map, theme palette and format are in design-tokens.json -> presentation. Social 4:5 visuals use deck-kit instead."
else
  emit ""
  emit "Note: presentation template not yet present (ableneo/knowledge/templates/). Build from the documented system until it is added."
fi
