#!/usr/bin/env python3
"""Persona calibration from runs already on disk: no new model calls.

Reads every persona-student result (JSON with persona + beats) under
curriculum/evals/, and reports per persona: runs, mean beat enjoyment (1-7),
mean would_recommend (1-10), and the share of beats tagged bored or confused.
Pass bar (README "How a run loads a persona", step 4): cfo-sceptic reads below
ingrid on enjoyment and recommend, and at least one persona tags boredom on
more than 20% of beats.

  python3 curriculum/evals/personas/calibrate.py [--json]
"""
import collections, glob, json, os, statistics, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
rows = collections.defaultdict(lambda: {'runs': 0, 'enj': [], 'rec': [], 'low': 0, 'beats': 0, 'modules': set()})
for f in glob.glob(os.path.join(ROOT, '**', '*.json'), recursive=True):
    try:
        d = json.load(open(f))
    except Exception:
        continue
    if not isinstance(d, dict) or 'persona' not in d or not isinstance(d.get('beats'), list):
        continue
    r = rows[d['persona']]
    r['runs'] += 1
    r['modules'].add(d.get('module'))
    try:
        r['rec'].append(float(d.get('would_recommend')))
    except (TypeError, ValueError):
        pass
    for b in d['beats']:
        if not isinstance(b, dict):
            continue
        r['beats'] += 1
        if isinstance(b.get('enjoyment'), (int, float)):
            r['enj'].append(b['enjoyment'])
        if any(t in str(b.get('tag', '')) for t in ('bore', 'confus')):
            r['low'] += 1

mean = lambda xs: round(statistics.mean(xs), 2) if xs else None
out = {p: {'runs': r['runs'], 'modules': len(r['modules']), 'enjoyment': mean(r['enj']),
           'recommend': mean(r['rec']), 'bored_or_confused': round(r['low'] / r['beats'], 3) if r['beats'] else None}
       for p, r in sorted(rows.items())}
cfo, ing = out.get('cfo-sceptic'), out.get('ingrid')
checks = {
    'cfo_below_ingrid': bool(cfo and ing and cfo['enjoyment'] < ing['enjoyment'] and cfo['recommend'] < ing['recommend']),
    'someone_bored_over_20pct': any((v['bored_or_confused'] or 0) > 0.2 for v in out.values()),
}
if '--json' in sys.argv:
    print(json.dumps({'personas': out, 'checks': checks}, indent=2))
else:
    print('persona            runs  modules  enjoy(1-7)  recommend  bored/confused')
    for p, v in out.items():
        print(f"{p:18} {v['runs']:4}  {v['modules']:7}  {v['enjoyment']!s:10}  {v['recommend']!s:9}  {v['bored_or_confused']}")
    for k, ok in checks.items():
        print(f"{'PASS' if ok else 'FAIL'} {k}")
sys.exit(0 if all(checks.values()) else 1)
