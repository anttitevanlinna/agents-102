#!/usr/bin/env python3
"""resolve.py: fold Antti's 2026-11-01 answers on the judge-unsure representatives into the history key.
Writes history.key.resolved.jsonl (label = current call; dropped pairs removed) and resolutions.json (why)."""
import json
K = [json.loads(l) for l in open('history.key.jsonl')]
# Antti 2026-11-01 on the calls page (card side a/b = history.blind side a/b).
ANSWERS = {'hist-488cf42a-10': 'neither', 'hist-ad58dca3-2': 'b', 'hist-35e7889b-139': 'b',
           'hist-a90c9ec2-58': 'a', 'hist-a90c9ec2-62': 'neither'}
# Lookalikes resolved by pattern. Low-value closing/restating sentence cut (rep 35e7889b-139, he agreed with August):
CUT_LOOKALIKES = ['hist-488cf42a-11', 'hist-ec113ea8-127', 'hist-d3c8363a-140', 'hist-d14b467a-142', 'hist-a8ac20ef-83', 'hist-c6847414-86']
# Same lens text as the rep he rejected both sides of (488cf42a-10 "Neither"):
DROP_LOOKALIKES = ['hist-488cf42a-12']
res, out = {}, []
for k in K:
    i = k['id']; a = ANSWERS.get(i)
    if a == 'neither' or i in DROP_LOOKALIKES:
        res[i] = {'status': 'dropped', 'why': 'Antti 2026-11-01: neither version' if a else 'lookalike of hist-488cf42a-10 (neither)'}; continue
    k = dict(k)
    if a:
        res[i] = {'status': 'confirmed' if a == k['answer'] else 'relabelled', 'august': k['answer'], 'now': a}
        k['answer'] = a; k['tier'] = 'gold-recent'
    elif i in CUT_LOOKALIKES:
        res[i] = {'status': 'confirmed-by-pattern', 'rep': 'hist-35e7889b-139'}
    out.append(k)
open('history.key.resolved.jsonl', 'w').write(''.join(json.dumps(k, ensure_ascii=False) + '\n' for k in out))
json.dump(res, open('resolutions.json', 'w'), indent=1)
print(len(out), 'pairs kept;', sum(v['status'] == 'dropped' for v in res.values()), 'dropped;', sum(v['status'] == 'relabelled' for v in res.values()), 'relabelled')
