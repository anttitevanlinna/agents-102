#!/usr/bin/env python3
"""build-pairs.py <lab-dir> <out-dir> [base=v0] [variants=v1,v2,v3] — blind slide-level pairs, base vs each variant.
A chunk is a `##` section of a Module 7 student file (maintainer block stripped). A new chunk
(the scar insert) is paired as "previous chunk alone" vs "previous chunk + insert".
Writes pairs.blind.jsonl (a/b shuffled), pairs.swapped.jsonl (a/b flipped) and pairs.key.jsonl."""
import sys, json, random, pathlib, re
lab, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
BASE = sys.argv[3] if len(sys.argv) > 3 else "v0"
VARIANTS = (sys.argv[4] if len(sys.argv) > 4 else "v1,v2,v3").split(",")
FILES = ["trainings/agents-101/personal-to-team.md", "exercises/share-your-work.md",
         "exercises/design-the-sharing-plan.md", "exercises/test-the-sharing-plan.md",
         "lectures/access-is-not-absorption.md"]
def chunks(v, rel):
    t = (lab / v / "curriculum" / rel).read_text().split("<!-- maintainer -->")[0]
    parts = re.split(r"(?m)^(?=## )", t)
    res = []
    for p in parts:
        h = p.splitlines()[0] if p.startswith("## ") else "(top)"
        res.append((h, p.strip()))
    return res
rng = random.Random(7); blind, key = [], []
for v in VARIANTS:
    for rel in FILES:
        a, b = dict(chunks(BASE, rel)), chunks(v, rel)
        prev = None
        for h, body in b:
            if h in a and a[h] != body:
                orig, new = a[h], body
            elif h not in a and prev:
                orig, new = a.get(prev[0], prev[1]), prev[1] + "\n\n" + body
            else:
                prev = (h, body); continue
            pid = f"{v}:{rel.split('/')[-1][:-3]}#{h[3:] if h.startswith('## ') else h}"
            flip = rng.random() < 0.5
            blind.append({"id": pid, "file": rel, "a": new if flip else orig, "b": orig if flip else new})
            key.append({"id": pid, "variant": v, "variant_is": "a" if flip else "b"})
            prev = (h, body)
w = lambda n, rows: (out / n).write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows))
w("pairs.blind.jsonl", blind); w("pairs.key.jsonl", key)
w("pairs.swapped.jsonl", [{**r, "a": r["b"], "b": r["a"]} for r in blind])
print(f"[pairs] {len(blind)} pairs → {out}")
