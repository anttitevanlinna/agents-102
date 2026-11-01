#!/usr/bin/env python3
"""build_cut_examples.py: write ../../taste-examples-cuts.md from TRAIN pairs only (split.json).
Each example shows the span the author cut or replaced and what he kept, with the commit subject as the reason."""
import json, difflib, os
H = os.path.dirname(os.path.abspath(__file__))
IDS = ['hist-52b0f7a5-5', 'hist-d99ceeb2-6', 'hist-dbee4373-7', 'hist-1ec44fd3-20', 'hist-378d2f66-21', 'hist-c28bed08-15',
       'hist-d3cd0da3-24', 'hist-965ef288-27', 'hist-c7a1ad07-36', 'hist-b1911175-38', 'hist-7a1ee768-42', 'hist-ec113ea8-126',
       'hist-5711a601-128', 'hist-4e50d817-137', 'hist-bd0af5ff-148', 'hist-175ec6e0-144', 'hist-ceae2b3a-23']
sp = json.load(open(f'{H}/split.json'))
B = {j['id']: j for j in map(json.loads, open(f'{H}/history.blind.jsonl'))}
K = {j['id']: j for j in map(json.loads, open(f'{H}/history.key.jsonl'))}
out = ['# The author\'s own cuts (AE101, 2026-08-05 / 08-25 / 08-29)', '',
       'Each pair: the text he removed or replaced, then what he kept. Reason = his commit subject.', '']
for i in IDS:
    assert sp[i] == 'train', i
    k, b = K[i], B[i]
    kept, oth = b[k['answer']].split(), b['b' if k['answer'] == 'a' else 'a'].split()
    sm = difflib.SequenceMatcher(a=oth, b=kept, autojunk=False)
    ops = [o for o in sm.get_opcodes() if o[0] != 'equal']
    i1, j1 = ops[0][1], ops[0][3]; i2, j2 = ops[-1][2], ops[-1][4]
    rej = [' '.join(oth[max(0, i1 - 4):i2 + 3])]; kp = [' '.join(kept[max(0, j1 - 4):j2 + 3])]
    out += [f'- **{k["subject"]}**', f'  - CUT: …{" … ".join(rej)[:500]}…', f'  - KEPT: …{" … ".join(kp)[:400]}…', '']
open(os.path.join(H, '../../taste-examples-cuts.md'), 'w').write('\n'.join(out))
print(len(IDS), 'examples')
