#!/usr/bin/env python3
"""apply-edits.py <checkout> <variant>: apply exact old->new edits from $EDITS_DIR/<variant>.json.
JSON: [{"file": "curriculum/...", "old": "...", "new": "..."}]. Each old must occur exactly once."""
import json, os, pathlib, sys
co, v = pathlib.Path(sys.argv[1]), sys.argv[2]
for e in json.load(open(pathlib.Path(os.environ["EDITS_DIR"]) / f"{v}.json")):
    p = co / e["file"]; s = p.read_text()
    n = s.count(e["old"])
    if n != 1: sys.exit(f"[apply-edits] {e['file']}: old occurs {n} times")
    p.write_text(s.replace(e["old"], e["new"]))
print(f"[apply-edits] {v} ok", file=sys.stderr)
