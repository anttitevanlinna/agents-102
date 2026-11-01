const fs=require('fs');const {askJson}=require(process.cwd()+'/lib');
const S=process.argv[2];
const key=fs.readFileSync(S+'dmg/damaged.key.jsonl','utf8').trim().split('\n').map(JSON.parse);
const bl=fs.readFileSync(S+'dmg/damaged.blind.jsonl','utf8').trim().split('\n').map(JSON.parse);
const origs=[];for(const k of key){if(k.kind!=='pad')continue;const b=bl.find(x=>x.id===k.id);origs.push({n:k.id.slice(4,6),text:k.answer==='a'?b.a:b.b});}
const KINDS={putdown:'a light put-down of how people or teams usually do this today, or of the reader\'s current way of working (e.g. "most teams still waste weeks on this")',narrator:'a narrator sentence telling the reader what they just felt or experienced (e.g. "you felt the ground shift there")',witty:'an off-hand witty one-liner or rhetorical flourish that sounds clever but adds nothing (e.g. "Simple, isn\'t it? It isn\'t.")'};
const out=[],keyo=[];
const res=askJson(`For each slide below, and for each of three kinds, pick ONE existing plain sentence in the slide body (not the heading) and rewrite it so it carries the same information but also becomes ${Object.entries(KINDS).map(([k,v])=>`[${k}] ${v}`).join('; ')}. Keep the rewritten sentence within 4 words of the original length. Copy the original sentence EXACTLY as it appears.\n\n${origs.map(o=>`### SLIDE ${o.n}\n${o.text}`).join('\n\n')}\n\nAnswer with one json block: {"edits":[{"slide":"NN","kind":"putdown"|"narrator"|"witty","original":"exact sentence","rewrite":"..."}...three per slide]}`,{model:'sonnet'});
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
for(const e of res.edits||[]){const o=origs.find(x=>x.n===e.slide);if(!o||!o.text.includes(e.original))continue;const dam=o.text.replace(e.original,e.rewrite);const id=`hd-${e.slide}-${e.kind}`;const ab=rnd()<.5;out.push({id,a:ab?o.text:dam,b:ab?dam:o.text});keyo.push({id,answer:ab?'a':'b',kind:e.kind,original:e.original,rewrite:e.rewrite});}
fs.writeFileSync(S+'r3/hard.blind.jsonl',out.map(x=>JSON.stringify(x)).join('\n')+'\n');
fs.writeFileSync(S+'r3/hard.swapped.jsonl',out.map(x=>JSON.stringify({...x,a:x.b,b:x.a})).join('\n')+'\n');
fs.writeFileSync(S+'r3/hard.key.jsonl',keyo.map(x=>JSON.stringify(x)).join('\n')+'\n');
console.log(out.length);
