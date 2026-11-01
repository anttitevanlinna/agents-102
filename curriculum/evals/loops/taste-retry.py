#!/usr/bin/env python3
"""taste-retry.py <taste-dir> <pairs.js> <rules> [examples] — rerun pairs.js on pairs it returned no pick for (it drops ids now and then)."""
import sys, json, pathlib, subprocess
d, pj, rules = pathlib.Path(sys.argv[1]), sys.argv[2], sys.argv[3]
ex = ["--examples", sys.argv[4]] if len(sys.argv) > 4 else []
for o in ("blind", "swapped"):
    for attempt in range(3):
        pairs = [json.loads(l) for l in (d / f"pairs.{o}.jsonl").read_text().splitlines() if l.strip()]
        pf = d / f"picks-{o}.jsonl"
        have = {json.loads(l)["id"] for l in pf.read_text().splitlines() if l.strip()} if pf.exists() else set()
        todo = [p for p in pairs if p["id"] not in have]
        if not todo: break
        tmp = d / f"retry.{o}.jsonl"; out = d / f"retry-picks.{o}.jsonl"
        tmp.write_text("".join(json.dumps(p, ensure_ascii=False) + "\n" for p in todo))
        subprocess.run(["node", pj, "--blind", str(tmp), "--rules", rules, *ex, "--out", str(out)], env={**__import__("os").environ, "PAIRS_BATCH": "1"}, capture_output=True)
        if out.exists():
            with pf.open("a") as f: f.write(out.read_text())
        print(f"[taste-retry] {o}: {len(todo)} missing, attempt {attempt + 1}")
