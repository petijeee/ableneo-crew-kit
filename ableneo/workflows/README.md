# ComfyUI Cloud workflowy (API formát)

Export z ComfyUI cez „Export Workflow (API)". Generujeme cez `ableneo/scripts/comfy_client.py`
(ComfyUI Cloud, X-API-Key v `ableneo/.env`). Override polí: `--set NODE.inputs.KEY=VALUE`.

GOTCHA: API/partner nody (Wan, Kling, Flux hosted) potrebujú comfy.org kľúč v
`extra_data.api_key_comfy_org`, inak padnú na „Unauthorized: Please login first".
comfy_client.py ho posiela automaticky.

## api_wan2_7_t2v.json — Wan 2.7 text-to-video
Nód **`13`** = `Wan2TextToVideoApi`, nód `12` = SaveVideo. Override:
- `13.inputs.model.prompt` — prompt (drž brand štýl: charcoal #1D2024 + lime #CDDE00, no text, no logos)
- `13.inputs.seed` — seed (drž rovnaký pre konzistentný štýl naprieč zábermi)
- `13.inputs.model.ratio` — `16:9` (web) alebo `9:16` (social)
- `13.inputs.model.resolution` — `720P` / `1080P`
- `13.inputs.model.duration` — sekundy (default 5)

Príklad (jeden b-roll klip):
```
python3 ableneo/scripts/comfy_client.py ableneo/workflows/api_wan2_7_t2v.json \
  --set "13.inputs.model.prompt=Abstract neural network of glowing lime-green nodes on deep charcoal, slow rotation, premium, no text, no logos" \
  --set "13.inputs.seed=778899" \
  --set "13.inputs.model.ratio=16:9" \
  --out "ableneo event promo/<projekt>/broll/"
```
Overené 2026-06-26: prompt → API → on-brand klip, bez kliknutia v ComfyUI.
