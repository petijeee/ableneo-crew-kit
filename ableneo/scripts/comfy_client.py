#!/usr/bin/env python3
"""Ableneo ai-video-producer: minimal ComfyUI API client.

Targets the standard ComfyUI HTTP API (POST /prompt, GET /history, GET /view).
Reads COMFY_API_URL + COMFY_API_TOKEN from ableneo/.env. Submits an API-format
workflow (ComfyUI: Save (API Format)), applies overrides, waits, downloads outputs.

NOTE: hosted providers (RunComfy, Comfy Deploy) sometimes use a deployment-based
REST API instead of raw /prompt. If yours does, share its API doc and adapt _queue/_poll.

Usage:
  comfy_client.py <workflow.api.json> [--set NODE.inputs.KEY=VALUE ...] [--out DIR] [--timeout SEC]
Example:
  comfy_client.py flux.api.json --set 6.inputs.text="abstract lime network on charcoal, no text" --out out/
"""
from __future__ import annotations
import json, sys, time, uuid, urllib.request, urllib.parse
from pathlib import Path

ENV = Path(__file__).resolve().parents[1] / ".env"   # ableneo/.env

def _env(key: str, default: str = "") -> str:
    if ENV.exists():
        for line in ENV.read_text().splitlines():
            line = line.strip()
            if line.startswith(f"{key}=") and not line.startswith("#"):
                return line.split("=", 1)[1].strip()
    return default

BASE = _env("COMFY_API_URL").rstrip("/")
TOKEN = _env("COMFY_API_TOKEN")

def _req(path: str, data=None, raw=False):
    # ponytail: Comfy Cloud serves the SPA at bare paths; the real API lives
    # under /api and authenticates via X-API-Key (not Authorization: Bearer).
    url = path if path.startswith("http") else f"{BASE}/api{path}"
    headers = {"Content-Type": "application/json"}
    if TOKEN:
        headers["X-API-Key"] = TOKEN
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers, method="POST" if data is not None else "GET")
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read() if raw else json.loads(r.read())

def apply_overrides(wf: dict, sets: list[str]) -> dict:
    """--set 6.inputs.text=VALUE  (numbers stay numbers if castable)."""
    for s in sets:
        path, val = s.split("=", 1)
        node, sub, key = path.split(".")
        try: val = int(val)
        except ValueError:
            try: val = float(val)
            except ValueError: pass
        wf[node][sub][key] = val
    return wf

def queue(wf: dict) -> str:
    # ponytail: hosted "Api" partner nodes (Wan, Kling, Flux...) need the
    # comfy.org account key in extra_data, else they 401 with "please login".
    body = {"prompt": wf, "client_id": str(uuid.uuid4()), "extra_data": {"api_key_comfy_org": TOKEN}}
    out = _req("/prompt", body)
    pid = out.get("prompt_id") or out.get("promptId")
    if not pid:
        sys.exit(f"unexpected /prompt response: {json.dumps(out)[:200]}")
    return pid

def wait(pid: str, timeout: int = 600) -> dict:
    # ponytail: Comfy Cloud has no /history/{id}; it's /jobs/{id}, flat (not keyed by pid).
    t0 = time.time()
    while time.time() - t0 < timeout:
        entry = _req(f"/jobs/{pid}")
        if entry.get("status") in ("completed", "failed", "success"):
            return entry
        time.sleep(3)
    sys.exit(f"timeout waiting for {pid}")

def download(entry: dict, outdir: Path) -> list[Path]:
    outdir.mkdir(parents=True, exist_ok=True)
    saved = []
    for node_out in entry.get("outputs", {}).values():
        for kind in ("images", "gifs", "videos", "audio"):
            for f in node_out.get(kind, []):
                q = urllib.parse.urlencode({"filename": f["filename"], "subfolder": f.get("subfolder", ""), "type": f.get("type", "output")})
                blob = _req(f"/view?{q}", raw=True)
                p = outdir / f["filename"]
                p.write_bytes(blob); saved.append(p)
    return saved

def main():
    if not BASE:
        sys.exit("Set COMFY_API_URL (and COMFY_API_TOKEN) in ableneo/.env")
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    wf_path = args[0]; sets = []; outdir = Path("comfy-out"); timeout = 600
    i = 1
    while i < len(args):
        if args[i] == "--set": sets.append(args[i+1]); i += 2
        elif args[i] == "--out": outdir = Path(args[i+1]); i += 2
        elif args[i] == "--timeout": timeout = int(args[i+1]); i += 2
        else: i += 1
    wf = apply_overrides(json.loads(Path(wf_path).read_text()), sets)
    pid = queue(wf); print("queued:", pid)
    entry = wait(pid, timeout)
    files = download(entry, outdir)
    print("downloaded:", *[str(f) for f in files] or ["(none)"])

if __name__ == "__main__":
    main()
