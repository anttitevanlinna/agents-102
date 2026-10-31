import json,subprocess,re,random,hashlib,sys,os
sys.path.insert(0,os.path.dirname(__file__))
from taste_spec import T
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../../..'))
def g(*a): return subprocess.run(['git','-C',R,*a],capture_output=True,text=True,errors='replace').stdout
def body(t):
    L=t.split('\n'); i=next((k for k,x in enumerate(L) if x.strip().startswith('<!-- maintainer')),len(L)); return '\n'.join(L[:i])
def chunks(t):
    parts=re.split(r'(?m)^(?=## )',body(t)); return [p.strip() for p in parts if p.strip()]
def find_chunk(t,needle):
    n=needle[:80]
    for c in chunks(t):
        if n in c: return c
    return None
S=json.load(open(sys.argv[2] if len(sys.argv)>2 else 'pairs_sig.json'))
GIT={  # index: (kind, dim, note)
 15:('antti-wording','clarity','maintainer: Cagan too abstract for the story'),
 18:('antti-wording','voice',"maintainer's own lines"),
 19:('antti-wording','voice',"maintainer's call on the guide slides"),
 27:('accepted-edit','enjoyment','card 2026-10-06: guess cue before the answer'),
 31:('accepted-edit','agency','maintainer ruling 2026-09-29'),
 32:('accepted-edit','felt-learning','maintainer ruling 2026-09-29'),
 44:('antti-wording','felt-learning',"M1's test bullet is Antti's sentence"),
 47:('accepted-edit','clarity','M6 card ruled'),
 49:('accepted-edit','truth','M6 card ruled: superlative cut'),
 50:('accepted-edit','clarity','M6 card ruled'),
 62:('accepted-edit','clarity','carded cut'),63:('accepted-edit','clarity','carded cut'),64:('accepted-edit','clarity','carded cut'),
 66:('accepted-edit','clarity','carded cut'),67:('accepted-edit','clarity','carded cut'),68:('accepted-edit','clarity','carded cut'),
 72:('antti-wording','truth',"maintainer's word over the judge's"),
 73:('accepted-edit','clarity','card taken'),75:('accepted-edit','clarity','card taken'),77:('accepted-edit','voice','card taken'),
 83:('accepted-edit','clarity','approved trim'),84:('accepted-edit','clarity','approved trim'),85:('accepted-edit','clarity','approved trim'),
 86:('accepted-edit','clarity','approved trim'),88:('accepted-edit','voice','approved trim'),
 90:('refused-edit','felt-learning','restore original Point line: punchier'),
 91:('refused-edit','clarity','revert the map defusing'),
 93:('refused-edit','clarity','revert student-facing edit'),94:('refused-edit','felt-learning','revert: numeral in header kept'),
 95:('refused-edit','felt-learning','revert: numeral in header kept'),96:('refused-edit','clarity','revert student-facing edit'),
 97:('antti-wording','felt-learning',"Antti's kernels under the handles"),
 114:('accepted-edit','clarity','card E'),144:('accepted-edit','clarity','card 3'),
 187:('refused-edit','clarity','restore readiness wording'),
 188:('refused-edit','felt-learning','restore belief line'),
 189:('antti-wording','voice',"rewrite to Antti's three-sentence frame"),
}
pairs=[]
seen=set()
for i,(kind,dim,note) in GIT.items():
    p=S[i]; sha=g('rev-parse',p['sha']).strip()
    key=(sha,p['file'])
    if key in seen: continue
    seen.add(key)
    old=g('show',f'{sha}^:{p["file"]}'); new=g('show',f'{sha}:{p["file"]}')
    cb=find_chunk(old,p['before']); ca=find_chunk(new,p['after'])
    if not cb or not ca: print('nochunk',i,p['file']); continue
    if len(cb)>4000 or len(ca)>4000: cb,ca=p['before'],p['after']
    training=p['file'].split('/')[2] if '/trainings/' in p['file'] else 'shared'
    pairs.append(dict(id=f"git-{p['sha']}-{i}",source='git',sha=p['sha'],date=p['date'],file=p['file'],training=training,
        kind=kind,dim=dim,why=f"{note} — commit: {p['subject'][:160]}",preferred=ca,other=cb))
for t in T:
    cur=g('show',f'HEAD:{t["file"]}')
    c=find_chunk(cur,t['keep'])
    if not c or t['keep'] not in c: print('miss',t['id']); continue
    alt=c.replace(t['keep'],t['alt'],1)
    pairs.append(dict(id=t['id'],source='taste-notes',file=t['file'],training='shared',kind=t['kind'],dim=t['dim'],why=t['why'],preferred=c,other=alt))
rnd=random.Random(20261031)
blind=[];key=[]
for p in pairs:
    flip=rnd.random()<0.5
    a,b=(p['other'],p['preferred']) if flip else (p['preferred'],p['other'])
    blind.append(dict(id=p['id'],file=p['file'],a=a,b=b))
    key.append(dict(id=p['id'],answer='b' if flip else 'a',source=p['source'],kind=p['kind'],dim=p['dim'],file=p['file'],date=p.get('date'),why=p['why'],
        preferred_len=len(p['preferred'].split()),other_len=len(p['other'].split())))
out=sys.argv[1]
import os; os.makedirs(out,exist_ok=True)
with open(f'{out}/pairs.blind.jsonl','w') as f:
    for x in blind: f.write(json.dumps(x,ensure_ascii=False)+'\n')
with open(f'{out}/pairs.key.jsonl','w') as f:
    for x in key: f.write(json.dumps(x,ensure_ascii=False)+'\n')
import collections
print('pairs',len(pairs))
print(collections.Counter(k['kind'] for k in key)); print(collections.Counter(k['dim'] for k in key))
sh=sum(1 for k in key if k['preferred_len']<k['other_len']); eq=sum(1 for k in key if k['preferred_len']==k['other_len'])
print('preferred shorter',sh,'equal',eq,'longer',len(key)-sh-eq)
print('answer a',sum(k['answer']=='a' for k in key))
