#!/usr/bin/env python3
"""
build_deck.py — assemble a real on-brand Ableneo .pptx from a deck spec.

The deck inherits the official template's master, 19 named layouts, theme palette
and embedded Ableneo fonts. You write content; the template owns the look.

Usage
  python3 ableneo/scripts/build_deck.py SPEC.json [-o OUT.pptx]
  python3 ableneo/scripts/build_deck.py --dump-map     # regenerate the slot map JSON

Spec schema (JSON)
  {
    "title": "Deck name",                      # optional, for the filename default
    "output": "ableneo/outputs/my-deck.pptx",  # optional, overrides -o
    "slides": [
      { "layout": "Cover",
        "slots": ["Big headline line", "Supporting subhead"] },

      { "layout": "Key Numbers – 3",
        "title": "The cost of pilot purgatory",
        "slots": { "41": "-37%", "26": "invoice processing time",
                   "42": "-22%", "32": "errors in QC",
                   "43": "90 days", "33": "to production" } },

      { "layout": "Text + Visual",
        "title": "How we ship to production",
        "slots": ["Eyebrow", "Point one", "Point two", "Point three"],
        "pictures": { "1": "ableneo/outputs/visual-a.png" } }
    ]
  }

slots:
  - list  -> fills the layout's content slots in reading order (top->bottom, left->right),
            skipping the title (idx 0) and footer (idx 10).
  - dict  -> keyed by placeholder idx (see layout-slot-map.json) for exact control.
title:   fills the title placeholder (idx 0) when the layout has one.
pictures: dict keyed by idx -> image path, for picture placeholders.

The layout names and per-layout slot idxs are documented in
ableneo/knowledge/templates/layout-slot-map.json (regenerate with --dump-map).
"""
import argparse
import json
import os
import re
import sys
from copy import deepcopy

import math

from pptx import Presentation
from pptx.enum.text import MSO_AUTO_SIZE
from pptx.util import Emu, Pt

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TEMPLATE = os.path.join(REPO, "ableneo", "knowledge", "templates",
                        "ableneo_presentation_template.pptx")
SLOT_MAP = os.path.join(REPO, "ableneo", "knowledge", "templates",
                        "layout-slot-map.json")
OUTPUTS = os.path.join(REPO, "ableneo", "outputs")

TITLE_IDX, FOOTER_IDX = 0, 10
PH_TEXT = {1, 2, 7}      # TITLE, BODY, OBJECT
PH_PICTURE = 18


def _delete_example_slides(prs):
    """Strip the template's bundled example slides; keep masters + layouts."""
    sldIdLst = prs.slides._sldIdLst
    for sldId in list(sldIdLst):
        rId = sldId.get(
            "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
        prs.part.drop_rel(rId)
        sldIdLst.remove(sldId)


def _layouts_by_name(prs):
    m = {}
    for master in prs.slide_masters:
        for lay in master.slide_layouts:
            m[lay.name] = lay
    return m


def _content_order(layout):
    """idxs of text/object content placeholders in reading order, minus title+footer."""
    items = []
    for ph in layout.placeholders:
        pf = ph.placeholder_format
        if pf.idx in (TITLE_IDX, FOOTER_IDX):
            continue
        try:
            t = int(pf.type)
        except Exception:
            t = None
        if t in PH_TEXT:
            g = (Emu(ph.top).inches if ph.top is not None else 999,
                 Emu(ph.left).inches if ph.left is not None else 999)
            items.append((g, pf.idx))
    items.sort()
    return [idx for _, idx in items]


def _base_pt(layout_ph):
    """Largest font size (pt) declared on the layout placeholder, if any.

    Only run-property elements (rPr / defRPr / endParaRPr) carry a numeric `sz`
    in hundredths of a point; other elements use `sz` for non-numeric tokens
    (e.g. line-end sizes), so we read sz only off those tags and require digits.
    """
    if layout_ph is None:
        return None
    szs = []
    for e in layout_ph._element.iter():
        tag = e.tag.rsplit("}", 1)[-1]
        if tag not in ("rPr", "defRPr", "endParaRPr"):
            continue
        v = e.get("sz")
        if v and v.isdigit():
            szs.append(int(v))
    return max(szs) / 100 if szs else None


def _fit_size(text, base_pt, box_w_in, box_h_in):
    """Largest size <= base_pt at which the text is estimated to fit the box.

    Several template slots are oversized display placeholders with autofit OFF
    (Cover headline 156pt, Contact title 178pt). A bare normAutofit is not honored
    by every renderer, so we set an explicit shrunk size when long copy would
    overflow. Returns None when the text already fits at base_pt (keep inherited).
    """
    if not base_pt or not text:
        return None
    w_pt, h_pt = box_w_in * 72.0, box_h_in * 72.0 * 0.93   # 7% safety margin
    size = base_pt
    while size > 8:
        chars_per_line = max(1.0, w_pt / (0.55 * size))   # ~0.55em avg glyph
        lines = sum(max(1, math.ceil(len(seg) / chars_per_line))
                    for seg in str(text).split("\n"))
        if lines * size * 1.38 <= h_pt:                   # display line height
            break
        size -= 2
    return round(size) if size < base_pt else None


def _set_text(ph, text, layout_ph=None):
    """Set placeholder text, keeping the template's font family/color/weight.

    Only the size may be overridden, and only to shrink oversized display copy so
    it fits. Where the base size is unknown, fall back to renderer shrink-to-fit.
    """
    tf = ph.text_frame
    tf.clear()
    p = tf.paragraphs[0]
    run = p.runs[0] if p.runs else p.add_run()
    run.text = str(text)
    tf.word_wrap = True

    base = _base_pt(layout_ph)
    if base and ph.width and ph.height:
        target = _fit_size(str(text), base,
                           Emu(ph.width).inches, Emu(ph.height).inches)
        if target:
            run.font.size = Pt(target)
    else:
        tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE


def build(spec, out_path):
    prs = Presentation(TEMPLATE)
    _delete_example_slides(prs)
    layouts = _layouts_by_name(prs)

    warnings = []
    for i, s in enumerate(spec.get("slides", []), 1):
        name = s.get("layout")
        if name not in layouts:
            raise SystemExit(
                f"Slide {i}: layout {name!r} is not one of the 19 template layouts.\n"
                f"Valid: {', '.join(sorted(layouts))}")
        layout = layouts[name]
        slide = prs.slides.add_slide(layout)
        ph_by_idx = {p.placeholder_format.idx: p for p in slide.placeholders}
        lay_by_idx = {p.placeholder_format.idx: p for p in layout.placeholders}

        # title
        if s.get("title"):
            if TITLE_IDX in ph_by_idx:
                _set_text(ph_by_idx[TITLE_IDX], s["title"], lay_by_idx.get(TITLE_IDX))
            else:
                warnings.append(
                    f"Slide {i} ({name}): has no title placeholder; "
                    f"put the headline in 'slots' instead.")

        # slots
        slots = s.get("slots")
        if isinstance(slots, dict):
            for k, v in slots.items():
                idx = int(k)
                if idx in ph_by_idx:
                    _set_text(ph_by_idx[idx], v, lay_by_idx.get(idx))
                else:
                    warnings.append(f"Slide {i} ({name}): no placeholder idx={idx}.")
        elif isinstance(slots, list):
            order = _content_order(layout)
            if len(slots) > len(order):
                warnings.append(
                    f"Slide {i} ({name}): {len(slots)} slots given but layout has "
                    f"{len(order)} content slots; extras dropped.")
            for val, idx in zip(slots, order):
                _set_text(ph_by_idx[idx], val, lay_by_idx.get(idx))

        # pictures
        for k, path in (s.get("pictures") or {}).items():
            idx = int(k)
            if idx in ph_by_idx and os.path.exists(path):
                ph_by_idx[idx].insert_picture(path)
            elif idx not in ph_by_idx:
                warnings.append(f"Slide {i} ({name}): no picture placeholder idx={idx}.")
            else:
                warnings.append(f"Slide {i} ({name}): image not found: {path}")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    prs.save(out_path)
    return len(spec.get("slides", [])), warnings


def dump_map():
    prs = Presentation(TEMPLATE)
    master = prs.slide_masters[0]
    out = {
        "_meta": {
            "source": "Generated from ableneo_presentation_template.pptx "
                      "by build_deck.py --dump-map",
            "format": {"ratio": "16:9",
                       "emu": [prs.slide_width, prs.slide_height]},
            "conventions": {
                "title_idx": TITLE_IDX, "footer_idx": FOOTER_IDX,
                "note": "idx 0 is the title; idx 10 is page-number/footer chrome "
                        "(left as template default unless overridden). Content slots "
                        "are listed in reading order (top->bottom, then left->right)."},
        },
        "layouts": {},
    }
    for lay in master.slide_layouts:
        slots = []
        for ph in lay.placeholders:
            pf = ph.placeholder_format
            try:
                t = int(pf.type)
            except Exception:
                t = None
            geom = None
            if None not in (ph.left, ph.top, ph.width, ph.height):
                geom = [round(Emu(ph.left).inches, 2), round(Emu(ph.top).inches, 2),
                        round(Emu(ph.width).inches, 2), round(Emu(ph.height).inches, 2)]
            slots.append({
                "idx": pf.idx,
                "kind": "picture" if t == PH_PICTURE else (
                    "text" if t in PH_TEXT else "other"),
                "name": ph.name, "geom_in": geom})

        def key(s):
            g = s["geom_in"]
            return (g[1], g[0]) if g else (999, 999)

        content = sorted([s for s in slots if s["idx"] not in (TITLE_IDX, FOOTER_IDX)],
                         key=key)
        title = [s for s in slots if s["idx"] == TITLE_IDX]
        footer = [s for s in slots if s["idx"] == FOOTER_IDX]
        out["layouts"][lay.name] = {
            "title": title[0]["idx"] if title else None,
            "footer": footer[0]["idx"] if footer else None,
            "content_order": [s["idx"] for s in content if s["kind"] == "text"],
            "text_slots": [s["idx"] for s in content if s["kind"] == "text"],
            "picture_slots": [s["idx"] for s in content if s["kind"] == "picture"],
            "slots": slots,
        }
    with open(SLOT_MAP, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"wrote {SLOT_MAP} ({len(out['layouts'])} layouts)")


def main():
    ap = argparse.ArgumentParser(description="Assemble an Ableneo .pptx from a spec.")
    ap.add_argument("spec", nargs="?", help="deck spec JSON")
    ap.add_argument("-o", "--output", help="output .pptx path")
    ap.add_argument("--dump-map", action="store_true",
                    help="regenerate layout-slot-map.json and exit")
    args = ap.parse_args()

    if args.dump_map:
        dump_map()
        return
    if not args.spec:
        ap.error("provide a spec JSON (or --dump-map)")

    with open(args.spec) as f:
        spec = json.load(f)

    out = args.output or spec.get("output")
    if not out:
        slug = re.sub(r"[^a-z0-9]+", "-", spec.get("title", "deck").lower()).strip("-")
        out = os.path.join(OUTPUTS, f"{slug or 'deck'}.pptx")
    if not os.path.isabs(out):
        out = os.path.join(REPO, out)

    n, warnings = build(spec, out)
    print(f"Built {n} slides -> {out}")
    if warnings:
        print(f"\n{len(warnings)} warning(s):")
        for w in warnings:
            print(f"  - {w}")


if __name__ == "__main__":
    main()
