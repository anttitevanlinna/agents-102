#!/usr/bin/env python3
"""Mine AE101 length/frame sessions into blind slide pairs labelled as Antti's calls.

python3 build_history_pairs.py OUTDIR
Writes history.blind.jsonl {id,a,b}, history.swapped.jsonl, history.key.jsonl
{id,answer,tier,session,commit,date,subject,file,kind,kept_len,cut_len}.
Pairs are whole `##` slide chunks of the student-visible body (text above the first
`<!--` marker). The kept side is the post-commit text; the other side is the pre-commit text.
"""
import subprocess, re, sys, json, random, difflib
import os
REPO = os.environ.get('REPO', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../..')))
OUT = sys.argv[1]

def sh(*a):
    return subprocess.run(a, capture_output=True, text=True, cwd=REPO).stdout

def log(since, until, extra=()):
    out = sh('git', 'log', '--all', '--no-merges', f'--since={since}', f'--until={until}',
             '--format=%h', *extra, '--', 'curriculum/lectures', 'curriculum/exercises',
             'curriculum/trainings/agentic-engineering-101')
    return out.split()

# Sessions. tier gold = commit message records Antti's call or the commit is one
# step of his line-by-line read; silver = rule-driven sweep he took without a per-line call.
SESSIONS = []
# 2026-08-05 morning line-read: ~50 one-change commits, one per 1-2 minutes, plus the build-story cut.
SESSIONS.append(('2026-08-05-line-read', 'gold', log('2026-08-05 05:00', '2026-08-05 11:00') + ['148c7ea6']))
# 2026-08-25 Antti-called / Antti-directed cuts.
SESSIONS.append(('2026-08-25-called-cuts', 'gold', ['b1911175', 'eae1b1cc', '45386652', 'dac39723', '6729f06b',
                 '7a1ee768', 'a0e90a9c', 'a2abc2df', 'c32f5f22', '7b25af0c', '272dff07', 'e7c70250']))
# Rule-driven sweeps Antti took (voice pass with card-adjudicated MILDs, lead-in budget, line-reads, 3-sentence heuristic).
SESSIONS.append(('2026-07-09-voice-pass', 'silver', ['a90c9ec2']))
SESSIONS.append(('2026-08-12-14-sweeps', 'silver', ['7057500e', 'a8ac20ef', 'c6847414', '2d8c60a5', '8fa40902',
                 '28732574', '03264fed']))
SESSIONS.append(('2026-08-18-25-trims', 'silver', ['2b5a60a5', '93e98107']))
# 2026-08-29 AE101 compaction pass, M1-M6 (taste-notes 2026-08-29): Antti-called cuts, 16:08-17:59 +0300.
SESSIONS.append(('2026-08-29-compaction', 'gold', ['ec113ea8', '5711a601', '299b1b01', 'd7be3b65', 'e2fc79e1', 'ff0552ce',
                 '4e50d817', '35e7889b', 'd3c8363a', 'd14b467a', 'cc5a930e', '175ec6e0', '4d995765', 'bd0af5ff', '3f219e43']))

SKIP_FILE = re.compile(r'trainer|todos|README|theory-plan|strategy|architecture|handbook|punchlist|/evals/|/plans/|gaps')
SKIP_MSG = re.compile(r'stamp|re-eval|judge|backing|maintainer block|provenance|audit$', re.I)
ALREADY = {'358f6bd1', '2d0ba13b', 'aa64ce15', '51784aaf', '3fe4ef06', 'be9cf5dd', '5e84db74', '45d55bbf',
           'f3d50aeb', '3ba7c052', '670df493', '1b54cd7c', '65745c75', 'c8238180', '63e110a5', 'd9fed027',
           'e18868f3', '9a6a7089'}

def show(ref, f):
    r = subprocess.run(['git', 'show', f'{ref}:{f}'], capture_output=True, text=True, cwd=REPO)
    return r.stdout if r.returncode == 0 else None

def body(t):
    t = re.sub(r'^---\n.*?\n---\n', '', t, flags=re.S)
    i = t.find('\n<!--')
    return t if i < 0 else t[:i]

def chunks(t):
    parts = re.split(r'(?m)^(?=## )', body(t))
    return [p.strip() for p in parts if p.strip() and not p.strip().startswith('# ') or p.strip().startswith('## ')]

def norm(s): return ' '.join(s.split())

pairs = []
for session, tier, commits in SESSIONS:
    for c in commits:
        if c[:8] in ALREADY: continue
        subj = sh('git', 'log', '-1', '--format=%s', c).strip()
        date = sh('git', 'log', '-1', '--format=%ad', '--date=short', c).strip()
        if tier == 'gold' and session.endswith('line-read') and SKIP_MSG.search(subj): continue
        files = [f for f in sh('git', 'diff-tree', '--no-commit-id', '--name-only', '-r', c).split()
                 if f.endswith('.md') and re.match(r'curriculum/(lectures|exercises|trainings/agentic-engineering-101)/', f)
                 and not SKIP_FILE.search(f)]
        for f in files:
            x, y = show(c + '^', f), show(c, f)
            if not x or not y: continue
            cx, cy = chunks(x), chunks(y)
            sm = difflib.SequenceMatcher(a=[norm(s) for s in cx], b=[norm(s) for s in cy], autojunk=False)
            for op, i1, i2, j1, j2 in sm.get_opcodes():
                if op == 'equal': continue
                before = '\n\n'.join(cx[i1:i2]); after = '\n\n'.join(cy[j1:j2])
                kind = 'edit'
                if op == 'delete':  # whole slide cut: show it with its neighbour for context
                    ctx = cx[i1 - 1] if i1 > 0 else (cx[i2] if i2 < len(cx) else '')
                    if not ctx: continue
                    before = (ctx + '\n\n' + before) if i1 > 0 else (before + '\n\n' + ctx)
                    after = ctx; kind = 'slide-cut'
                elif op == 'insert':
                    continue  # additions are not length/frame cuts; patterns note them separately
                if norm(before) == norm(after): continue
                wb, wa = len(before.split()), len(after.split())
                if wb > 450 or wa > 450 or wa == 0: continue
                if kind == 'edit' and wa < wb * 0.98: kind = 'trim'
                elif kind == 'edit' and wa > wb * 1.02: kind = 'reword-longer'
                elif kind == 'edit': kind = 'reword'
                pairs.append(dict(session=session, tier=tier, commit=c[:8], date=date, subject=subj, file=f,
                                  kind=kind, kept=after, other=before, kept_len=wa, cut_len=wb))

# de-dup identical texts
seen = set(); uniq = []
for p in pairs:
    k = (norm(p['kept']), norm(p['other']))
    if k in seen: continue
    seen.add(k); uniq.append(p)
rnd = random.Random(20261101)
blind, swapped, key = [], [], []
for n, p in enumerate(uniq):
    pid = f"hist-{p['commit']}-{n}"
    side = rnd.choice('ab')
    a, b = (p['kept'], p['other']) if side == 'a' else (p['other'], p['kept'])
    blind.append(dict(id=pid, a=a, b=b)); swapped.append(dict(id=pid, a=b, b=a))
    key.append(dict(id=pid, answer=side, **{k: p[k] for k in ('tier', 'session', 'commit', 'date', 'subject', 'file', 'kind', 'kept_len', 'cut_len')}))
for name, rows in (('history.blind.jsonl', blind), ('history.swapped.jsonl', swapped), ('history.key.jsonl', key)):
    with open(f'{OUT}/{name}', 'w') as fh:
        fh.write(''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in rows))
from collections import Counter
print(len(key), Counter((k['session'], k['kind']) for k in key))
