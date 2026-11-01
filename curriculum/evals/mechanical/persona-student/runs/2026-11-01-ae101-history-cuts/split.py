#!/usr/bin/env python3
"""split.py: stratified train/holdout split of the history pairs (per session, md5 of id order).
Writes split.json {id: train|holdout} and holdout.{blind,swapped,key}.jsonl. Examples for the judge
come from train only; scores are reported on holdout."""
import json, hashlib
from collections import defaultdict
rows = {n: [json.loads(l) for l in open(f'history.{n}.jsonl')] for n in ('blind', 'swapped', 'key')}
by = defaultdict(list)
for k in rows['key']: by[k['session']].append(k['id'])
split = {}
for s, ids in by.items():
    ids.sort(key=lambda i: hashlib.md5(i.encode()).hexdigest())
    for n, i in enumerate(ids): split[i] = 'train' if n < len(ids) // 2 else 'holdout'
json.dump(split, open('split.json', 'w'), indent=0)
for n, rs in rows.items():
    with open(f'holdout.{n}.jsonl', 'w') as f:
        f.write(''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in rs if split[r['id']] == 'holdout'))
print(sum(v == 'holdout' for v in split.values()), 'holdout of', len(split))
