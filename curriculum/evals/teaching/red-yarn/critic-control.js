// critic-control.js <edits.json> <out.json> — one Sonnet call, fresh context: a hard critic for the Agents 101 control yarn.
// It has read AE101's verification and control beats plus the yarn brief, and rejects anything shallow, additive, not agentic, or badly written.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const R=path.resolve(__dirname,'../../../..'), C=process.env.AGENTS_CORE_DIR?process.env.AGENTS_CORE_DIR+'/memory':path.resolve(R,'../agents-102-core/memory'), P=R+'/curriculum/evals/mechanical/persona-student';
const rd=f=>fs.readFileSync(f,'utf8'), body=f=>rd(R+'/curriculum/'+f).split('<!-- maintainer')[0];
const ae=['lectures/the-machine-you-just-met.md','lectures/when-a-plan-is-good.md','lectures/the-loop-half-filled.md','lectures/the-far-half.md','lectures/ironies-of-automation.md','lectures/what-packaging-is.md','lectures/the-gate-is-a-claim.md','trainings/agentic-engineering-101/supplementary/verification-asymmetry.md'].map(f=>`--- ${f}\n${body(f)}`).join('\n');
const edits=JSON.parse(rd(process.argv[2]));
const prompt=`You are a hard critic for a training course, in a fresh context. The author's best course is AE101; its verification and control yarn is the bar. Assume the writer cannot write well and has not understood control. Reject anything shallow, additive, not agentic, or worse written than AE101.

THE BRIEF (the course's one closed loop; control = independent sensor, containment by reversibility, measured trust in both, rationed):
${rd(__dirname+'/yarn-theory.md')}

AE101 VERIFICATION AND CONTROL, student-facing text (the bar for depth and for voice):
${ae}

WRITING RULES (house compendium):
${rd(C+'/check_writing.md')}

TASTE RULES (learned from the author's own cuts):
${rd(P+'/taste-rules.md')}
${rd(P+'/taste-examples.md')}

HARD CONSTRAINTS: the edit aligns EXISTING text on the yarn. "after" may not have more sentences than "before" (count them), may not add a label, recap, callout or slide, may not talk about the course ("this module", "from here on"), point "above/below", or narrate what the student did. Banned words: muscle, lands, agent file, actually read, Monday, ship, leverage, hire; no em-dashes. Every claim must be true of what the module actually does (the "context" field says what happens there).

EDITS:
${JSON.stringify(edits,null,1)}

For each edit judge: (1) depth: does it carry control as the brief defines it (which check licenses which action, how well that check is tested, containment by reversibility, rationed where redo is cheap), at THIS module's size, or a shallow form (verify everything, the person reads everything, push back as control, security or evals as separate topics)? (2) agentic: does a check or the agent system carry the control, with the human owning the yardstick, calibrating the judge, or deciding what may run unchecked? (3) additive? (4) writing: AE101-compact, plain, concrete, named actor? (5) truth. Quote words. Give your best rewrite if any problem exists. verdict "pass" only if you would not change a word and it clearly beats "before" on the yarn without losing what "before" did.
Answer with one json block: {"edits":[{"id":"...","problems":["..."],"depth":"deep|shallow","agentic":true|false,"rewrite":"... or null","verdict":"pass|revise|reject"}]}`;
const r=spawnSync('claude',['-p','--model','sonnet','--output-format','text'],{input:prompt,encoding:'utf8',maxBuffer:64<<20,env:{...process.env,PATH:R+'/curriculum/evals/loops/bin:'+process.env.PATH,EVAL_BUDGET:'300'}});
const m=[...(r.stdout||'').matchAll(/```json\s*([\s\S]*?)```/g)].pop(); const out=m?m[1]:r.stdout;
fs.writeFileSync(process.argv[3], out);
const j=JSON.parse(out);
for(const s of j.edits) console.log(`${s.verdict.toUpperCase()} ${s.id} [${s.depth}${s.agentic?'':' not-agentic'}]\n  ${s.problems.join('\n  ')}\n  -> ${s.rewrite}\n`);
