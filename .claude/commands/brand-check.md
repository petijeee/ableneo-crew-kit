---
description: Audit content or a file against the Ableneo brand guidelines
---

Run a brand compliance audit on: **$ARGUMENTS**

(If $ARGUMENTS is a file path, read it. If it's pasted text, audit that. If empty, audit the most recently changed draft in the repo.)

Use the `brand-guardian` agent to check against `ableneo/ABLENEO.md` and `ableneo/knowledge/`:
voice (numbers over adjectives, clear, confident, human, glass-wall test), positioning
and the enemy checklist, color rules (Lime `#CDDE00` + Charcoal + White; one chromatic
family on neutrals; never mix; Lime never with accents), typography hierarchy, and logo/
icon usage.

Return:
1. Verdict, ✅ PASS / ⚠️ PASS WITH NITS / ❌ NEEDS FIXES
2. Findings as `[severity] problem → rule → fix` (🔴 blocker / 🟡 should-fix / 🔵 nit)
3. Which agent should make each fix.

Don't rewrite the content, verify and direct.
