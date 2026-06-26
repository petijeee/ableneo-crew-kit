#!/usr/bin/env bash
# Ableneo video-producer: turn a 16:9 clip into a branded 9:16 social clip.
# Letterbox on charcoal + (optional) burned-in brand-styled subtitles.
# Usage: make-9x16.sh <clip.mp4> [subtitles.srt] [outdir]
# Needs: ffmpeg with libass (brew ffmpeg is fine). Ableneo font must be installed for captions.
set -euo pipefail

SRC="${1:?usage: make-9x16.sh <clip.mp4> [subtitles.srt] [outdir]}"
SRT="${2:-}"
OUTDIR="${3:-$(dirname "$SRC")}"
name="$(basename "${SRC%.*}")"
OUT="$OUTDIR/${name}-9x16.mp4"
mkdir -p "$OUTDIR"

# Brand subtitle style (ASS): Ableneo font, white text, charcoal box, lower third.
STYLE="FontName=Ableneo,FontSize=15,Bold=1,PrimaryColour=&H00FFFFFF,BorderStyle=3,Outline=0,Shadow=0,BackColour=&HB31D2024,Alignment=2,MarginV=300"

# 16:9 -> 1080x1920, charcoal #1D2024 letterbox, centered.
PAD="scale=1080:-2,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x1D2024"

if [ -n "$SRT" ]; then
  VF="${PAD},subtitles=${SRT}:force_style='${STYLE}'"
else
  VF="$PAD"
fi

echo "rendering 9:16 -> $OUT"
ffmpeg -y -i "$SRC" -vf "$VF" -r 30 -c:v libx264 -crf 20 -pix_fmt yuv420p -c:a aac -b:a 128k "$OUT" -loglevel error
echo "DONE: $OUT  ($(du -h "$OUT" | cut -f1))"
echo "Tip: branded intro/outro karty pridaj cez video-pipeline (hyperframes) alebo deck-kit."
