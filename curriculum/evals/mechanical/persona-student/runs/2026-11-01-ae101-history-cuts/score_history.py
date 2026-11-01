#!/usr/bin/env python3
"""score_history.py KEY BLIND READER=PICKS,PICKS_SW[,GATE,GATE_SW] ...
Agreement with Antti's history calls by tier, session and kind, both orders, beside always-shorter."""
import json, sys
from collections import defaultdict
rd = lambda f: {j['id']: j for j in map(json.loads, open(f))}
key, blind = rd(sys.argv[1]), rd(sys.argv[2])
flip = {'a': 'b', 'b': 'a'}
w = lambda s: len(s.split())
shorter = {i: ('a' if w(b['a']) < w(b['b']) else 'b' if w(b['b']) < w(b['a']) else None) for i, b in blind.items()}
readers = {'always-shorter': (lambda i, o: shorter[i])}
for arg in sys.argv[3:]:
    name, files = arg.split('=')
    fs = [rd(f) for f in files.split(',')]
    def mk(fs=fs):
        def pick(i, order):
            p = fs[order]; g = fs[2 + order] if len(fs) == 4 else None
            if g and i in g and g[i]['gate'] == 'keep_longer':
                pk = g[i]['longer']
            elif i in p: pk = p[i]['pick']
            else: return None
            return flip[pk] if order else pk
        return pick
    readers[name] = mk()
groups = defaultdict(list)
for i, k in key.items():
    groups['ALL'].append(i); groups['tier:' + k['tier']].append(i)
    groups['session:' + k['session']].append(i); groups['kind:' + ('kept-longer' if k['kept_len'] > k['cut_len'] else 'kept-shorter-or-equal')].append(i)
rows = []
print('| group | n | ' + ' | '.join(readers) + ' |')
print('|---|---|' + '---|' * len(readers))
for g in sorted(groups, key=lambda x: (x != 'ALL', x)):
    ids = groups[g]; cells = []
    for name, f in readers.items():
        if name == 'always-shorter':
            c = sum(f(i, 0) == key[i]['answer'] for i in ids); cells.append(f'{100*c/len(ids):.0f}%')
        else:
            a = sum(f(i, 0) == key[i]['answer'] for i in ids); b = sum(f(i, 1) == key[i]['answer'] for i in ids)
            cells.append(f'{100*(a+b)/(2*len(ids)):.0f}% ({a},{b})')
    print(f'| {g} | {len(ids)} | ' + ' | '.join(cells) + ' |')
