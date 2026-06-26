#!/usr/bin/env python3
"""Ableneo ai-video-producer: ComfyUI Cloud (comfy.org) API client.

Official Comfy Cloud API (https://docs.comfy.org/development/cloud/overview):
  base    https://cloud.comfy.org
  auth    header  X-API-Key: <key>
  submit  POST /api/prompt        body {"prompt": <api-format workflow>}  -> {prompt_id}
  status  GET  /api/job/{id}/status   -> pending|in_progress|completed|failed|cancelled
  result  GET  /api/jobs/{id}         -> outputs {node_id: {images|gifs|videos:[{filename,subfolder,type}]}}
  view    GET  /api/view?filename=&subfolder=&type=output  -> 302 to signed URL (followed)

Reads COMFY_API_URL (default cloud) + COMFY_API_TOKEN from ableneo/.env.
Export workflows from ComfyUI via "Export Workflow (API)".

Usage:
  comfy_client.py <workflow.api.json> [--set NODE.inputs.KEY=VALUE ...] [--out DIR] [--timeout SEC]
  comfy_client.py --ping                 # connectivity check (GET /api/user)
Example:
  comfy_client.py flux.api.json --set 6.inputs.text="abstract lime network on charcoal, no text" --out broll/
"""
from __future__ import annotations
import json, sys, time, urllib.request, urllib.parse
from pathlib import Path

ENV = Path(__file__).resolve().parents[1] / ".env"   # ableneo/.env

def _env(key: str, default: str = "") -> str:
    if ENV.exists():
        for line in ENV.read_text().splitlines():
            line = line.strip()
            if line.startswith(f"{key}=") and not line.startswith("#"):
                return line.split("=", 1)[1].strip()
    return default

BASE = (_env("COMFY_API_URL") or "https://cloud.comfy.org").rstrip("/")
KEY = _env("COMFY_API_TOKEN")

def _req(path: str, data=None, raw=False, method=None):
    url = path if path.startswith("http") else f"{BASE}{path}"
    headers = {"X-API-Key": KEY}
    if data is not None:
        headers["Content-Type"] = "application/json"
    body = json.dumps(data).encode() if data is not None else None
    m = method or ("POST" if data is not None else "GET")
    req = urllib.request.Request(url, data=body, headers=headers, method=m)
    with urllib.request.urlopen(req, timeout=120) as r:
        blob = r.read()
    return blob if raw else json.loads(blob)

def ping():
    try:
        out = _req("/api/user")
        print("OK, authenticated:", json.dumps(out)[:200])
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}:", e.read().decode()[:200]); sys.exit(1)

def apply_overrides(wf: dict, sets: list[str]) -> dict:
    for s in sets:
        path, val = s.split("=", 1)
        node, sub, key = path.split(".", 2)   # key may contain dots (e.g. model.prompt)
        try: val = int(val)
        except ValueError:
            try: val = float(val)
            except ValueError: pass
        wf[node][sub][key] = val
    return wf

def submit(wf: dict) -> str:
    # API/partner nodes (Wan, Kling, ...) authenticate via the comfy.org key in extra_data.
    out = _req("/api/prompt", {"prompt": wf, "extra_data": {"api_key_comfy_org": KEY}})
    pid = out.get("prompt_id") or out.get("promptId") or out.get("id")
    if not pid:
        sys.exit(f"unexpected /api/prompt response: {json.dumps(out)[:200]}")
    return pid

def wait(pid: str, timeout: int = 600) -> dict:
    t0 = time.time()
    while time.time() - t0 < timeout:
        st = _req(f"/api/job/{pid}/status")
        s = (st.get("status") or st.get("state") or "").lower()
        if s in ("completed", "success", "succeeded"):
            return _req(f"/api/jobs/{pid}")
        if s in ("failed", "cancelled", "canceled", "error"):
            sys.exit(f"job {pid} {s}: {json.dumps(st)[:200]}")
        time.sleep(3)
    sys.exit(f"timeout waiting for {pid}")

def download(job: dict, outdir: Path) -> list[Path]:
    outdir.mkdir(parents=True, exist_ok=True)
    outputs = job.get("outputs") or job.get("output") or {}
    saved = []
    for node_out in outputs.values():
        if not isinstance(node_out, dict):
            continue
        for kind in ("images", "gifs", "videos", "files"):
            for f in node_out.get(kind, []):
                q = urllib.parse.urlencode({"filename": f["filename"], "subfolder": f.get("subfolder", ""), "type": f.get("type", "output")})
                blob = _req(f"/api/view?{q}", raw=True)   # urllib follows the 302 to signed URL
                p = outdir / f["filename"]
                p.write_bytes(blob); saved.append(p)
    return saved

def main():
    if not KEY:
        sys.exit("Set COMFY_API_TOKEN in ableneo/.env")
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args[0] == "--ping":
        ping(); return
    wf_path = args[0]; sets = []; outdir = Path("comfy-out"); timeout = 600
    i = 1
    while i < len(args):
        if args[i] == "--set": sets.append(args[i+1]); i += 2
        elif args[i] == "--out": outdir = Path(args[i+1]); i += 2
        elif args[i] == "--timeout": timeout = int(args[i+1]); i += 2
        else: i += 1
    wf = apply_overrides(json.loads(Path(wf_path).read_text()), sets)
    pid = submit(wf); print("submitted:", pid)
    job = wait(pid, timeout)
    files = download(job, outdir)
    print("downloaded:", *[str(f) for f in files] or ["(none)"])

if __name__ == "__main__":
    main()
