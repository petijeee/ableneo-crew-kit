# Ableneo motion system: Lock-in

**Intelligence that works, in motion.** Every move is fast, has a purpose and ends locked in place.
Nothing floats in. Nothing drifts out. The frame behaves like a system that works.

- Tokens: `knowledge/design-tokens.json` → `motion` (GSAP + CSS form of every easing)
- Helper: `video-system/motion.mjs` → `prelude()` injects the verbs into any Hyperframes/GSAP composition

## Three verbs

That is the whole vocabulary. If a move is not one of these, it does not ship.

| Verb | What moves | Physics | Helper |
|---|---|---|---|
| **Snap** | Text, cards, pills, rows | 28px along one axis, **0.45s**, `back.out(1.7)`: small overshoot, then lock | `snap()` `snapY()` `enter()` |
| **Draw** | Rules, progress lines, strokes, bars | scaleX from the left, **0.6s**, `power3.inOut`. Work is happening | `draw()` `grow()` `stroke()` |
| **Count** | The number | 0 → value in **0.45s**, `power2.out`, bold, then holds | `count()` |

Plus two utilities: `exit()` (**0.3s**, `power2.in`, always faster than the entrance) and `stamp()`
(verification check, `back.out(2.6)`, the only move allowed to rotate).

## Design manual elements

Every element of the ABLENEO Design Guidelines 2025, mapped to the verbs. Full params in `design-tokens.json → motion.elements`.

| Element (manual) | Verb | Motion | Helper |
|---|---|---|---|
| Logo mark | Connect | The three nodes open (stagger 0.12s), the links close (0.6s). Ends as the exact approved mark. Intro and end card only | `markSvg()` + `connect()` |
| Logotype | Snap | Follows the mark: opacity + max 8px. Letters never animate | `logo()` |
| Supergraphic (giant cropped mark) | Drift | 4-6% opacity, linear, one axis, max 68px per scene | `drift()` |
| Section number (01, 02) | Snap | Rises 14px and locks. An index, so no count-up | `snapY()` |
| Arrow button | Draw | Circle stroke draws, arrow nudges 8px once toward the next scene | `stroke()` `nudge()` |
| Label chip | Draw | Lime chip wipes open from the left, 0.3s. The lime move of that beat | `chip()` |
| Solid icon | Snap | Circle scales 0.6 to 1, snap easing, stagger 0.12s | `pop()` |
| Linear icon | Draw | Strokes draw in 0.6s. Stroke weight never changes | `stroke()` |
| Color block | Wipe | Scene change: next scene color crosses on one axis, 0.45s in, 0.45s out | `wipe()` |
| Bar chart | Draw | Bars grow from the baseline, stagger 0.12s | `grow()` |
| Dot matrix (80%) | Count | Dots fill to the value in reading order, 0.45s total | `fill()` |
| Key number | Count | 0 to value, bold, holds min 1.6s | `count()` |

### Carousel in motion

The LinkedIn carousel templates from the manual, animated. Same physics, one slide per beat.

| Carousel element | Verb | Motion | Helper |
|---|---|---|---|
| Header row (tag + page no.) | Snap | Arrives first, small and quiet | `enter()` |
| Ghost page number | Snap | Giant cropped number rises 68px in 0.7s behind the content | `ghost()` |
| Statement color block | Draw | Opens from the left in 0.6s, then the text snaps in | `block()` |
| Emphasis words | Count | Land in the line color, then lock to the brand color in 0.3s | `emph()` |
| Pill around a word | Draw | Opens from the left after the line lands | `chip()` |
| Icon list | Snap | Circles pop, labels snap, 0.12s per row | `pop()` `snap()` |
| CTA button | Snap | Rises and locks, arrow nudges once | `snapY()` `nudge()` |
| Photo tile | Draw | Opens top-down, settles from 106% to 100% | `photo()` |
| Slide change | Wipe | Slides push left in 0.45s, the swipe direction of the feed | `swipe()` |

Accent carousels (Sky Blue, Violet) move exactly the same. Swap the color family, never the physics. Families sit side by side only as category coding (one family per item, see `color-palette.md`).

## Rules

1. **One lime move per beat.** Lime marks what the eye should follow. Only one lime element moves at a time; everything else moving in that beat is white, grey or charcoal.
2. **The grid is the track.** Move on x or y. No diagonals, no rotation, no 3D (stamp is the one exception).
3. **No lime top bar.** Films open on the grid and the content, with no lime strip at the top edge.
4. **Logo:** opacity plus at most 8px. Never rotate, bounce or add effects. The one exception is `connect()` on intros and end cards, which builds the mark from its own nodes and ends as the exact approved mark.
5. **Tempo:** in fast (max 0.6s), hold calm (min **1.6s** so it can be read), out faster than in.
6. **Stagger 0.12s** between siblings. Rows arrive as a sequence, never all at once.
7. **No generic fade-up of text** and no uniform ~1.5s cuts. Both are automatic fails in `RUBRIC.md`.
8. **Sound locks to the verbs.** A Snap or Stamp gets a transient, a Draw gets a rise. See `proof/build-proof.mjs`.
9. **Reduced motion (web):** under `prefers-reduced-motion` every move becomes opacity over 0.2s.

## Tokens

| Duration | s | | Easing | GSAP | CSS |
|---|---|---|---|---|---|
| instant | 0.15 | | enter | `power3.out` | `cubic-bezier(.215,.61,.355,1)` |
| fast | 0.3 | | snap | `back.out(1.7)` | `cubic-bezier(.34,1.56,.64,1)` |
| base | 0.45 | | stamp | `back.out(2.6)` | `cubic-bezier(.3,2,.6,1)` |
| draw | 0.6 | | draw | `power3.inOut` | `cubic-bezier(.645,.045,.355,1)` |
| slow | 0.7 | | count | `power2.out` | `cubic-bezier(.25,.46,.45,.94)` |
| exit | 0.3 | | exit | `power2.in` | `cubic-bezier(.55,.085,.68,.53)` |
| hold | 1.6 | | drift | `none` | `linear` |

Distance (px at 1080 wide, scale linearly): xs **8**, sm **14**, md **28**, lg **34**. Frame rate **30 fps**.
Formats: 1080×1080, 1080×1350, 1920×1080, 1080×1920.

## Use it

```js
import { prelude } from '../motion.mjs';
const html = `<script>
const tl = gsap.timeline({ paused: true });
${prelude()}
logo("#logo", 0.2);
snap("#headline", 0.3);
count("n0", 49, "", 1.0);  // the number is the move
draw("#rule", 1.6);
exit("#headline", 4.2);
</script>`;
```

Existing compositions in `video-pipeline/` still hardcode the same values. Switch them to `prelude()` the next time you edit one.
