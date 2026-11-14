#!/usr/bin/env python3
"""analyze.py <placebo-dir> <picks-dir> [antti-pairs-dir] — what the taste judge does on pairs with no right answer,
and how often it sends a known-better edit back to the original.

Each pair is judged in two orders (blind, swapped). Per pair: both orders pick the same TEXT (a real preference),
or they split (the pick followed the letter, i.e. no preference).
  same   identical texts: letter bias only (share of 'a').
  para   original vs neutral rewrite: 'original both' far above 'rewrite both' = it prefers the original as such.
  para2  rewrite vs rewrite: the noise floor for a confident pick between equals.
  swap   original vs two adjacent sentences swapped.
Antti's pairs: accepted-edit gold (he took the edit) -> false revert = the judge keeps the original in both orders.
refused-edit gold (he kept the original) -> false accept = the judge takes the edit in both orders."""
import json, sys, os, glob, collections
P, K = sys.argv[1], sys.argv[2]; A = sys.argv[3] if len(sys.argv) > 3 else 'curriculum/evals/calibration/antti-pairs'
fl = {'a': 'b', 'b': 'a'}
def rd(f): return {j['id']: j for j in (json.loads(l) for l in open(f) if l.strip())} if os.path.exists(f) else {}
out = {}
print('PLACEBO PAIRS (no right answer; judged in both orders)')
for s in ('same', 'para', 'para2', 'swap'):
    k = rd(f'{P}/{s}.key.jsonl'); a = rd(f'{K}/{s}.blind.picks.jsonl'); b = rd(f'{K}/{s}.swapped.picks.jsonl')
    n = o = r = sp = sa = la = tot = 0
    for i, kk in k.items():
        if i not in a or i not in b: continue
        n += 1; p1 = a[i]['pick']; p2 = fl.get(b[i]['pick'], 'same')  # p2 mapped back to blind letters
        la += (a[i]['pick'] == 'a') + (b[i]['pick'] == 'a'); tot += 2
        if 'same' in (p1, p2): sa += 1
        elif p1 == p2: o += p1 == kk['orig_is']; r += p1 != kk['orig_is']
        else: sp += 1
    out[s] = dict(n=n, orig_both=o, other_both=r, split=sp, same=sa, letter_a=round(100 * la / max(tot, 1)))
    lab = {'same': ('', ''), 'para': ('original', 'rewrite'), 'para2': ('rewrite 1', 'rewrite 2'), 'swap': ('original', 'swapped')}[s]
    print(f"  {s:6} n={n:2}  " + (f"{lab[0]} both orders {o:2} · {lab[1]} both orders {r:2} · " if s != 'same' else '') + f"followed the letter {sp:2} · said same {sa:2} · picked 'a' {out[s]['letter_a']}%")
key = rd(f'{A}/pairs.key.jsonl'); a = {}; b = {}
for f in glob.glob(f'{K}/antti*.blind.picks.jsonl'): a.update(rd(f))
for f in glob.glob(f'{K}/antti*.swapped.picks.jsonl'): b.update(rd(f))
c = collections.defaultdict(collections.Counter); ex = collections.defaultdict(list)
for i, kk in key.items():
    if i not in a or i not in b: continue
    g = f"{kk['tier']} {kk['kind']}"; p1 = a[i]['pick']; p2 = fl.get(b[i]['pick'], 'same')
    res = 'same' if 'same' in (p1, p2) else 'right' if p1 == p2 == kk['answer'] else 'wrong' if p1 == p2 else 'split'
    c[g][res] += 1; c[g]['n'] += 1; c[g]['hits'] += (p1 == kk['answer']) + (p2 == kk['answer'])
    if res == 'wrong': ex[g].append(i)
print("\nANTTI'S PAIRS (both orders; accuracy = share of the 2 picks matching his call)")
for g in sorted(c):
    x = c[g]; print(f"  {g:24} n={x['n']:2}  accuracy {100 * x['hits'] / (2 * x['n']):.0f}%  · his side both orders {x['right']:2} · other side both orders {x['wrong']:2} · split {x['split']:2} · same {x['same']:2}")
acc = c['gold accepted-edit']; ref = c['gold refused-edit']
if acc['n']: print(f"\n  FALSE REVERT (Antti took the edit, judge kept the original in both orders): {acc['wrong']} of {acc['n']} = {100 * acc['wrong'] / acc['n']:.0f}%")
if ref['n']: print(f"  FALSE ACCEPT (Antti kept the original, judge took the edit in both orders): {ref['wrong']} of {ref['n']} = {100 * ref['wrong'] / ref['n']:.0f}%")
out['antti'] = {g: dict(v) for g, v in c.items()}; out['antti_wrong_ids'] = ex
json.dump(out, open(f'{K}/summary.json', 'w'), indent=1)
