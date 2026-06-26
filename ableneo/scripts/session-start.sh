#!/usr/bin/env bash
# Ableneo Crew Hub, SessionStart hook (corrected for the ableneo/ subdir layout).
# Surfaces the brand operating context at the start of every session so the crew
# stays on-brand without being asked. Output is injected into the session context.
#
# To enable: register this in .claude/settings.json as a SessionStart hook
# (see ableneo/README.md). Path below assumes the TERMINAL repo root.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

emit() { printf '%s\n' "$1"; }

emit "ABLENEO CREW HUB, claim: \"Intelligence that works.\""
emit ""
emit "Brand canon is loaded. Before producing anything, honor:"
emit "  - ableneo/ABLENEO.md, always-on brand operating context"
emit "  - ableneo/knowledge/, brand-core, voice-and-tone, positioning, audience, color-palette, typography, logo-and-iconography"
emit "  - ableneo/knowledge/: offering, methodology-essa, assets"
emit ""
emit "Non-negotiable voice (Peter's rules win):"
emit "  - Precise (numbers over adjectives), clear, confident, human. Glass-wall test on every headline."
emit "  - No em dashes. No two-sentence reject-then-replace (\"We don't X. We do Y.\")."
emit "  - Color: Lime #CDDE00 + Charcoal #1D2024 + White. ONE chromatic family at a time, on neutrals."
emit "  - Type: Ableneo (Poppins on web). Headline Bold / Subhead SemiBold / Body Regular. Bold the number."
emit ""
emit "Brand crew (.claude/agents): brand-strategist, copywriter, presentation-builder, visual-designer, brand-guardian"
emit "Execution crew: content-linkedin, web-ableneo, video-producer, ai-video-producer"
emit "Commands: /new-deck, /brand-check, /rewrite-voice"

if [ ! -f "$ROOT/ableneo/knowledge/templates/ableneo_presentation_template.pptx" ]; then
  emit ""
  emit "Note: presentation template not yet present (ableneo/knowledge/templates/). Build from the documented system until it is added."
fi
