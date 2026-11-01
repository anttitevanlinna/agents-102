import json,difflib,re,glob,os
S='/tmp/claude-0/-home-claude/3c96baeb-274b-520c-961c-662071f3c836/scratchpad/'
d=json.load(open(S+'studio/data.json'))
ans={os.path.basename(f)[:-5]:json.load(open(f)) for f in glob.glob('taste-studio/answers-2026-11-01/answers/*.json')}
def segs(a,b):
  A,B=a.split(),b.split(); sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
  return [(' '.join(A[i1:i2]),' '.join(B[j1:j2])) for op,i1,i2,j1,j2 in sm.get_opcodes() if op!='equal']
L=["# Worked examples: the course author's own past calls, with their reasons\n","Each shows text the author REJECTED and text the author KEPT instead, then the author's reason in their own words. Learn the judgement behind the reasons, not the surface words.\n"]
for it in d['why']:
  a=ans.get('why-'+it['id'])
  if not a or 'both versions clearly generated' in a['reason']: continue
  kept,rej=(it['a'],it['b']) if it['chose']=='a' else (it['b'],it['a'])
  L.append(f"\n## Example {it['id']}")
  for r,k in segs(rej,kept)[:5]:
    L.append(f"- REJECTED: \"{r[:400] or '(nothing)'}\"\n  KEPT: \"{k[:400] or '(cut)'}\"")
  L.append(f"- Author's reason: {a['reason'].strip()}")
L.append('\n## Short calls (blind, author sure)')
for k,v in sorted(ans.items()):
  if k.startswith('blind-') and v.get('conf')=='sure' and v.get('why'): L.append(f"- {v['why']}")
L.append('\n## Odd-one-out findings on the course slides')
for k,v in sorted(ans.items()):
  if k.startswith('triad-'): L.append(f"- Rejected: {v.get('differs','')}"+(f" (note: {v['when']})" if v.get('when') else ''))
full=open(S+'agentic-engineering-101.md').read()
def chunk(h):
  i=full.index('\n'+h+'\n'); j=full.find('\n## ',i+1); k=full.find('\n# ',i+1)
  e=min(x for x in (j,k) if x>0); return re.sub(r'<!--.*?-->\n?','',full[i+1:e],flags=re.S).strip()
L.append('\n# Reference: point of view and frame done right (from the calibrated sister course)\n')
for h,lab in [('## Two frontiers','where this is going'),('## Read the diff and push back on a line','it is your work: the agent works, you judge'),('## Eval','how the machine works'),('## Change on recurrence, not on noise','the theory'),('## Freedom to choose','the trainer to the room')]:
  try: L.append(f"### Frame: {lab}\n{chunk(h)}\n")
  except Exception as e: print('miss',h)
open('taste-examples.md','w').write('\n'.join(L)+'\n')
print(len(' '.join(L).split()),'words')
