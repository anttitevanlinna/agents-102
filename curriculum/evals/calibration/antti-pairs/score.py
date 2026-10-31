"""Score a reader's picks against Antti's calls.
Usage: python3 score.py picks.jsonl   (one {"id":..., "pick":"a"|"b"} per line)
Prints accuracy overall, by kind and by dim, next to the always-pick-the-shorter baseline."""
import json,sys,os,collections
here=os.path.dirname(os.path.abspath(__file__))
key={k['id']:k for k in map(json.loads,open(os.path.join(here,'pairs.key.jsonl')))}
blind={b['id']:b for b in map(json.loads,open(os.path.join(here,'pairs.blind.jsonl')))}
picks={p['id']:p['pick'] for p in map(json.loads,open(sys.argv[1]))}
def shorter(i):
    b=blind[i]; la,lb=len(b['a'].split()),len(b['b'].split())
    return 'a' if la<lb else 'b' if lb<la else None
tot=collections.Counter(); hit=collections.Counter(); base=collections.Counter()
for i,k in key.items():
    if i not in picks: continue
    for g in ('all','tier:'+k.get('tier','gold'),'kind:'+k['kind'],'dim:'+k['dim']):
        tot[g]+=1; hit[g]+=picks[i]==k['answer']; base[g]+=shorter(i)==k['answer']
print(f"answered {tot['all']}/{len(key)}")
for g in sorted(tot,key=lambda x:(x!='all',x)):
    print(f"{g:24} {hit[g]:3}/{tot[g]:<3} {hit[g]/tot[g]:.0%}   shorter-baseline {base[g]/tot[g]:.0%}")
