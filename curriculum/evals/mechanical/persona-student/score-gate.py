#!/usr/bin/env python3
"""score-gate.py: combine gate.js (step 1) with pairs.js picks (step 2) and score against a key.
usage: score-gate.py KEY PICKS PICKS_SWAPPED [GATE GATE_SWAPPED] [--old-key pairs.key.jsonl]
Swapped files were run on the a/b-swapped blind file; their picks are flipped back here."""
import json,sys
def rd(f): return {j['id']:j for j in map(json.loads,open(f))}
args=sys.argv[1:]
key=rd(args[0]); p1,p2=rd(args[1]),rd(args[2])
g1=g2=None
if len(args)>=5: g1,g2=rd(args[3]),rd(args[4])
flip={'a':'b','b':'a'}
def picks(p,g,sw):
  out={}
  for i in key:
    if g and i in g and g[i]['gate']=='keep_longer': pk=g[i]['longer']
    elif i in p: pk=p[i]['pick']
    else: continue
    out[i]=flip[pk] if sw else pk
  return out
a,b=picks(p1,g1,False),picks(p2,g2,True)
ids=list(key); n=len(ids)
ca=sum(a.get(i)==key[i]['answer'] for i in ids); cb=sum(b.get(i)==key[i]['answer'] for i in ids)
st=[i for i in ids if a.get(i)==b.get(i)]; sc=sum(a[i]==key[i]['answer'] for i in st)
print(f"{ca},{cb}/{n} ({100*(ca+cb)/(2*n):.0f}%)  stable {len(st)} correct {sc}")
