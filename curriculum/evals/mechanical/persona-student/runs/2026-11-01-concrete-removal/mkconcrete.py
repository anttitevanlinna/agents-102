#!/usr/bin/env python3
"""mkconcrete.py OUTDIR: deterministic concrete-sentence-removal damage on Agents 101 module slides.
A sentence counts as concrete if it holds a digit, inline code, a file path, or a quoted example. One per slide,
the first such sentence in the body (not the heading); slide kept only if 2+ other sentences remain. No LLM in the loop."""
import re, os, sys, json, random
OUT = sys.argv[1]
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../..'))
MODS = ['getting-going', 'output-quality', 'security', 'evaluations', 'building-agent-systems', 'multi-agent-systems', 'personal-to-team', 'agents-building-agents']
CONC = re.compile(r'\d|`[^`]+`|\w+/\w+\.\w+|\*"[^"]+"\*|"[^"]{8,}"')
rnd = random.Random(20261101); blind, key = [], []
for m in MODS:
    t = open(f'{ROOT}/curriculum/trainings/agents-101/{m}.md').read()
    t = re.sub(r'^---\n.*?\n---\n', '', t, flags=re.S); t = t.split('\n<!--')[0]
    for n, ch in enumerate(c.strip() for c in re.split(r'\n(?=## )', t)):
        if not ch.startswith('## ') or '{{prompt:' in ch or '{{figure' in ch: continue
        head, body = ch.split('\n', 1) if '\n' in ch else (ch, '')
        sents = [s for s in re.split(r'(?<=[.!?])\s+(?=[A-Z*`(])|\n', body) if len(s.split()) >= 5]
        cands = [s for s in sents if CONC.search(re.sub(r'Modules? \d+', '', s)) and not s.startswith('Start a fresh') and 'Lecture:' not in s and '](' not in s and not re.search(r'Module \d+ (starts|ends|opens)', s)]
        if not cands or len(sents) < 3 or len(ch.split()) > 220: continue
        s = cands[0]; dam = (head + '\n' + body.replace(s, '', 1)).replace('\n- \n', '\n').replace('  ', ' ')
        dam = re.sub(r'\n-\s*\n', '\n', dam)
        pid = f'cc-{m}-{n}'; ab = rnd.random() < .5
        blind.append({'id': pid, 'a': ch if ab else dam, 'b': dam if ab else ch})
        key.append({'id': pid, 'answer': 'a' if ab else 'b', 'module': m, 'removed': s})
w = lambda f, r: open(f'{OUT}/{f}', 'w').write(''.join(json.dumps(x, ensure_ascii=False) + '\n' for x in r))
w('cc.blind.jsonl', blind); w('cc.swapped.jsonl', [{**x, 'a': x['b'], 'b': x['a']} for x in blind]); w('cc.key.jsonl', key)
from collections import Counter; print(len(key), Counter(k['module'] for k in key))
