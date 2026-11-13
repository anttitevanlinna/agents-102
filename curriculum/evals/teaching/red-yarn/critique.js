// critique.js <slides.json> <out.json>  (THEME=... overrides the theme line) — one Sonnet call: writing + taste critique of each "after" text.
const fs=require('fs'),{spawnSync}=require('child_process');
const R=require('path').resolve(__dirname,'../../../..'), C=process.env.AGENTS_CORE_DIR?process.env.AGENTS_CORE_DIR+'/memory':require('path').resolve(R,'../agents-102-core/memory'), P=R+'/curriculum/evals/mechanical/persona-student';
const slides=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const rd=f=>fs.readFileSync(f,'utf8');
const ae=rd(R+'/curriculum/lectures/painting-the-picture-with-the-llm.md').split('<!-- maintainer -->')[0]+'\n\nHOW THE AUTHOR’S BEST COURSE RUNS A RED YARN (verification in AE101):\n'+rd(__dirname+'/ae101-yarn.md');
const prompt=`You are a hard editor for a training course. The author wants prose as compact and to the point as his best course (AE101 sample below). Assume the writer cannot write well. Find every problem.

WRITING RULES (house compendium):
${rd(C+'/check_writing.md')}

TASTE RULES (learned from the author's own cuts):
${rd(P+'/taste-rules.md')}
${rd(P+'/taste-examples.md')}
${rd(P+'/taste-examples-cuts.md')}

VOICE TARGET (AE101 lecture, the author's best):
${ae}

THE TASK THE EDITS SERVE: align existing slides on one common theme: ${process.env.THEME||"the agents taking over the making of one analysis of the student's challenge, part by part, with context, compounding, control and agents building agents as recurring ideas"}. Say it in different ways. Add no content: an "after" may not be longer than its "before" in sentences, and must not talk about the course itself, point "above"/"below", or narrate what the student did.

SLIDES (before = current text, after = proposed):
${JSON.stringify(slides,null,1)}

For each slide: list problems in "after" (cite rule numbers or taste rules; be specific, quote words), say whether it aligns on the theme without adding content, and give your best rewrite if any problem exists. verdict "pass" only if you would not change a word.
Answer with one json block: {"slides":[{"id":"...","problems":["..."],"aligned":true|false,"rewrite":"... or null","verdict":"pass|revise"}]}`;
const r=spawnSync('claude',['-p','--model','sonnet','--output-format','text'],{input:prompt,encoding:'utf8',maxBuffer:64<<20,env:{...process.env,PATH:R+'/curriculum/evals/loops/bin:'+process.env.PATH,EVAL_BUDGET:'300'}});
const m=[...r.stdout.matchAll(/```json\s*([\s\S]*?)```/g)].pop();
fs.writeFileSync(process.argv[3], m?m[1]:r.stdout);
const j=JSON.parse(m?m[1]:r.stdout);
for(const s of j.slides) console.log(`${s.verdict.toUpperCase()} ${s.id}\n  ${s.problems.join('\n  ')}\n  -> ${s.rewrite}\n`);
