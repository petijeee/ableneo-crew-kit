#!/usr/bin/env bash
# Ableneo video-producer: transcribe a video/audio file (default Slovak).
# Usage: transcribe.sh <input.mp4|mov|wav> [lang] [outdir]
# Output: <outdir>/<name>-transcript.txt + .srt   (srt for cutting clips by timecode)
# Needs: ffmpeg, whisper-cli (whisper.cpp). Model auto-downloaded to ~/.cache/whisper-models.
set -euo pipefail

SRC="${1:?usage: transcribe.sh <input> [lang] [outdir]}"
LANG="${2:-sk}"
OUTDIR="${3:-$(dirname "$SRC")}"
MODELDIR="$HOME/.cache/whisper-models"
MODEL="$MODELDIR/ggml-large-v3-turbo.bin"
name="$(basename "${SRC%.*}")"
WAV="$OUTDIR/$name.16k.wav"
OUT="$OUTDIR/$name-transcript"

mkdir -p "$MODELDIR" "$OUTDIR"
if [ ! -f "$MODEL" ]; then
  echo "[1/3] downloading whisper large-v3-turbo (~1.5GB, once)..."
  curl -L -C - -o "$MODEL" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin"
fi

echo "[2/3] extracting 16k mono audio..."
ffmpeg -y -i "$SRC" -ar 16000 -ac 1 -c:a pcm_s16le "$WAV" -loglevel error

echo "[3/3] transcribing ($LANG)..."
whisper-cli -m "$MODEL" -l "$LANG" -f "$WAV" -otxt -osrt -of "$OUT" -t 8 2>&1 | tail -2
rm -f "$WAV"
echo "DONE: ${OUT}.txt ($(wc -w < "${OUT}.txt" | tr -d ' ') words) + ${OUT}.srt"
echo "Pozn.: whisper na tichu/networking šume halucinuje opakovania, tie ignoruj."
