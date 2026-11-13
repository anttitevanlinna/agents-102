// critic-compounding.js <edits.json> <out.json> — one Sonnet call, fresh context: a hard critic for Agents 101 yarn edits (compounding-led), against yarn-theory.md.
// It has read AE101's compounding beats and rejects anything shallow, additive, not agentic, or badly written.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const R=path.resolve(__dirname,'../../../..'), C=process.env.AGENTS_CORE_DIR?process.env.AGENTS_CORE_DIR+'/memory':path.resolve(R,'../agents-102-core/memory'), P=R+'/curriculum/evals/mechanical/persona-student';
const rd=f=>fs.readFileSync(f,'utf8'), body=f=>rd(R+'/curriculum/'+f).split('<!-- maintainer')[0];
const ae=['exercises/compound-and-close.md','lectures/the-machine-you-just-met.md','lectures/how-instructions-grow.md','lectures/the-loop-half-filled.md','lectures/story-of-module-6.md','lectures/composing-the-workflow.md','lectures/agents-that-build-agents.md'].map(f=>`--- ${f}\n${body(f)}`).join('\n');
const edits=JSON.parse(rd(process.argv[2]));
const prompt=`You are a hard critic for a training course, in a fresh context. The author's best course is AE101; its compounding yarn is the bar. Assume the writer cannot write well and has not understood compounding. Reject anything shallow, additive, not agentic, or worse written than AE101.

THE YARNS AT DEPTH (brief; the loop they are parts of):
${rd(__dirname+'/yarn-theory.md')}

AE101 COMPOUNDING, student-facing text (the bar for depth and for voice):
${ae}

WRITING RULES (house compendium):
${rd(C+'/check_writing.md')}

TASTE RULES (learned from the author's own cuts):
${rd(P+'/taste-rules.md')}
${rd(P+'/taste-examples.md')}

HARD CONSTRAINTS: the edit aligns EXISTING text on the yarn. "after" may not have more sentences than "before" (count them), may not add a label, recap, callout or slide, may not talk about the course ("this module", "from here on"), point "above/below", or narrate what the student did. Banned words: muscle, lands, agent file, actually read, Monday, ship, leverage, hire; no em-dashes. Every claim must be true of what the module actually does (the "context" field says what happens there).

EDITS:
${JSON.stringify(edits,null,1)}

For each edit judge: (1) depth: does it carry the yarn named in its "yarn" field at the depth of the brief (compounding = the outer loop that selects and cuts: fire/help/hurt, recurrence not noise, good examples, check over sentence, expiry), at THIS module's size, or is it a shallow form the brief lists? (2) agentic: is the agent the one improving, with the human pushing back or owning the yardstick? (3) additive? (4) writing: AE101-compact, plain, concrete, named actor? (5) truth. (6) the brief's test: name the artefact this module's exercise leaves and what the student's agent system does differently on its next run because of this passage; if neither, reject. Quote words. Give your best rewrite if any problem exists. verdict "pass" only if you would not change a word and it clearly beats "before" on the yarn without losing what "before" did.
Answer with one json block: {"edits":[{"id":"...","problems":["..."],"depth":"deep|shallow","agentic":true|false,"rewrite":"... or null","verdict":"pass|revise|reject"}]}`;
const r=spawnSync('claude',['-p','--model','sonnet','--output-format','text'],{input:prompt,encoding:'utf8',maxBuffer:64<<20,env:{...process.env,PATH:R+'/curriculum/evals/loops/bin:'+process.env.PATH,EVAL_BUDGET:'300'}});
const m=[...(r.stdout||'').matchAll(/```json\s*([\s\S]*?)```/g)].pop(); const out=m?m[1]:r.stdout;
fs.writeFileSync(process.argv[3], out);
const j=JSON.parse(out);
for(const s of j.edits) console.log(`${s.verdict.toUpperCase()} ${s.id} [${s.depth}${s.agentic?'':' not-agentic'}]\n  ${s.problems.join('\n  ')}\n  -> ${s.rewrite}\n`);
