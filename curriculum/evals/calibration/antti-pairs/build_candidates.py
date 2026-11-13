"""Writes candidates.a101.jsonl: blind A/B slide pairs with no answer yet, for Antti to call.
Once he calls them, move each into the gold set (kind refused-edit if he keeps the original)."""
import json,os,random,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import subprocess,re
R=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../..'))
def g(*a): return subprocess.run(['git','-C',R,*a],capture_output=True,text=True,errors='replace').stdout
def body(t):
    L=t.split('\n'); i=next((k for k,x in enumerate(L) if x.strip().startswith('<!-- maintainer')),len(L)); return '\n'.join(L[:i])
def find_chunk(t,n):
    for c in [p.strip() for p in re.split(r'(?m)^(?=## )',body(t)) if p.strip()]:
        if n in c: return c
from candidates_spec import C
rnd=random.Random(31); out=[]
for c in C:
    ch=find_chunk(g('show',f'HEAD:{c["file"]}'),c['span'].strip()[:60])
    assert ch and c['span'] in ch, c['id']
    v=ch.replace(c['span'],c['alt'],1); flip=rnd.random()<0.5
    out.append(dict(id=c['id'],file=c['file'],cluster=c['cluster'],original=('b' if flip else 'a'),a=v if flip else ch,b=ch if flip else v))
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'candidates.a101.jsonl'),'w') as f:
    for x in out: f.write(json.dumps(x,ensure_ascii=False)+'\n')
print(len(out))
