## Agents 101 Trainer Handbook

The one trainer document for Agents 101. Read **Start here** before your first cohort. Open the relevant module tab before and during each sitting. The URL hash keeps the selected tab bookmarkable.

<nav class="module-tabs" aria-label="Trainer handbook tabs">
  <a href="#start-glance">Start here</a>
  <a href="#m1-glance">M1 · Getting Going</a>
  <a href="#m2-glance">M2 · Agent Systems</a>
  <a href="#m3-glance">M3 · Multi-Agent</a>
  <a href="#m4-glance">M4 · Security</a>
  <a href="#m5-glance">M5 · Output Quality</a>
  <a href="#m6-glance">M6 · Evaluations</a>
  <a href="#m7-glance">M7 · Personal to Team</a>
  <a href="#m8-glance">M8 · Flywheel</a>
</nav>

<section class="module-glance" id="start-glance">

### Start here — the delivery contract

**Who this training is for.** Builder leaders, operators, transformation owners, function heads, and sharp practitioners making the chat-to-systems leap. The student starts with ordinary LLM use and builds one compounding working directory: sources, memory, agents, skills, judges, outputs, and operating rules earned from the work.

**The operating contract.**

- Use the same student workbook the room sees. The long-read and Slides views are two views of that source; choose the view that serves the beat.
- Demo the exercise while students run it concurrently. The budget is `max(trainer, student)`, not trainer time plus student time.
- Keep this handbook open privately. Maintainer blocks are prep material, not a screen-sharing surface.
- Carry the push-backs. The module tabs give the first lines to use when the room accepts a weak artifact too quickly.
- Protect the live work. If time slips, compress framing and polish before you cut the exercise that leaves the module's load-bearing artifact.
- The sponsor participates in every contracted module. They build on their own challenge and share the room's uncertainty; they are not an observer waiting for a closing readout.

**The working-directory contract.** Agents 101 compounds on one local training directory. Module 1 deliberately stays inside `module-1/`. Module 2 creates the root `CLAUDE.md` from session evidence. Modules 2–8 reuse and sharpen the same `memory/`, `sources/`, `agents/`, `outputs/`, `judges/`, and rules. Do not supply a prewritten root rules file. `training-architecture.md` is the canonical maintainer source when a path or session boundary is contested.

**Runtime discipline.** The training supports Claude Code CLI, Claude Code Desktop, and Cowork. Confirm the cohort's runtime before each sitting. Keep the teaching move constant while using the vocabulary and controls the selected runtime exposes. Do not turn a module into a tool comparison. If a capability claim or UI path differs from your rehearsal, stop asserting it and use the verified route from the reference material.

**Prep for every sitting.**

1. Run the module on your own challenge in the cohort runtime. Keep the artifacts as your demo starting state.
2. Read the module, its included exercises and lectures, this run sheet, and the adjacent module handoff.
3. Confirm the incoming files and folders exist at the exact paths the module consumes.
4. Rehearse the prompt chain, not isolated prompts. Know what each prompt reads, writes, and leaves for the next beat.
5. Note two concrete moments from your rehearsal to narrate during agent waits.
6. Confirm customer inputs and access named in the tab. A missing prerequisite is a delivery decision before the room opens, not a surprise to improvise around.

**Craft moves.**

- **Folder is state.** Correct folder drift early. A file in the wrong place becomes a broken handoff several modules later.
- **Evidence before rules.** Ask what source, miss, trace, or artifact earned a proposed rule. Plausible generic rules do not compound.
- **Scoped first, root later.** Module 1 rules stay in `module-1/`; the training root becomes shared state only when Module 2 earns it.
- **Quote before summary.** When the agent claims it changed a file or found a risk, ask for the line, path, report row, or scoreboard cell.
- **Ask for critique, not defence.** *"What is weakest?"* and *"What did this miss?"* produce evidence. *"Justify this"* produces confidence.
- **Push back on question dumps.** One question at a time means one question at a time. Correcting the agent live is part of the lesson.
- **Do not smooth the mood.** M3 and M4 end with useful unease. M5 earns relief. M6 earns leverage. M7 begins from generosity, and M8 ends in forward curiosity rather than tidy closure.
- **Leave the chair when the loop owns the work.** In M5 and M6, watching every token weakens the autonomy lesson. The student returns to artifacts and evidence.
- **Variation is evidence.** Compare outputs by what they quote, preserve, expose, or change. Do not normalize the room toward your demo's polish.

**The room.** You are a practitioner, not an oracle or grader. Give your judgment and name the conditions behind it. One broken laptop gets a short triage, then the customer support route or a buddy; do not stop the cohort. With a large room, announce recurring patterns to everyone and spot-assist only where it unblocks the protected beat. Quiet first responses are not no-signal; make the first question concrete. Fast room: compare evidence more deeply. Slow room: cut asides rather than sprinting.

**Never:**

- improvise a root `CLAUDE.md` before Module 2 earns it;
- fix every setup issue from the front of the room;
- pre-summarize a teaching beat before students encounter it;
- apologize for agent waits;
- rescue an intentionally imperfect result before the next module can use it;
- let sharing turn into abstract governance before a teammate's real job is named.

**After delivery.** Record the friction, the artifact that exposed it, and the smallest source change that would improve the next cohort. Customer-specific delivery notes stay with the customer. Reusable fixes return to the owning module, exercise, lecture, prompt, architecture file, or this handbook. Closed work disappears; Git holds the history.

</section>

<section class="module-glance" id="m1-glance">

### M1 — Getting Going

**Big idea.** Context and guardrails turn generic generation into something the student can recognize as their own. Module 1 stays deliberately scoped inside `module-1/`.

**Flow.** Opening room agreement → [Context is King](./#lectures-context-is-king) → [Paint by agent with guardrails](./#exercises-personal-site-with-guardrails) → [Iterate and learn](./#lectures-what-just-happened) → Debrief and rules retro → cold critic → Key Concepts → Module 2 handoff.

**Mood.** Joyful creation: *"I made this. It is me."* Check: the student talks only about making a website or about tool mechanics. Fix: compare the generic first pass with the line that became unmistakably theirs, then point at the context that caused the difference.

**Protect.** The baseline-to-guardrailed contrast, the student's own evaluation, the retro into `module-1/personal-brand-generation.md`, and the cold read.

**Push-backs.**

- Generic claim survives because it sounds polished → *"Which exact line would a colleague say could belong to anyone?"*
- Retro praises the rules file it helped write → *"What did the file miss? Quote the moment where the work bent."*
- Student wants the rule at the training root → *"Keep it in Module 1. The wider root has not earned this rule yet."*
- Cold critic warms into praise → *"Ask it for the most generic line first, with no appreciation pass."*

**Watch-fors and recovery.** LinkedIn input is thin: paste text or provide another truthful profile source rather than letting the agent invent. The site opens but the output feels generic: add one specific contrast, not more adjectives. If the exercise runs long, cut free iteration before the retro; do not cut the rules capture or cold read.

**Starting state.** Prework complete; local training directory open; `prework/snake.html` and `prework/meetings.md` present; no root `CLAUDE.md`; empty `module-1/` ready for scoped artifacts.

**Runtime map.**

{{runtime-map:getting-going}}

</section>

<section class="module-glance" id="m2-glance">

### M2 — Building Agent Systems

**Big idea.** A one-shot becomes a system when it has durable sources, maintained memory, operating rules, and a recurring job on the student's real challenge.

**Flow.** Fresh session at the training root → connector demo → [first scheduled agent](./#lectures-first-scheduled-agent) → [name the challenge](./#exercises-name-your-challenge) → [build the challenge memory](./#exercises-build-your-challenge-memory) → [Compounding](./#lectures-compounding) → Debrief creates root `CLAUDE.md` → Key Concepts → scheduled-agent homework and M3 prework.

**Mood.** Satisfied compounding: *"This persists and keeps working on my real challenge."* Check: the student describes a setup exercise or a folder of notes. Fix: run the hardest open question against the memory and trace the cited answer back to the sources that now remain on disk.

**Protect.** The live challenge, three source zones, plan-first review, one real custom agent, and the first root rules file written from what happened.

**Push-backs.**

- Challenge is a task or a slogan → *"What has stayed open in your head for weeks, and what decision would move if it became clearer?"*
- Memory grows without sharpening → *"Which existing page should this new source change? Update that page instead of adding another summary."*
- Root rules are generic best practice → *"Which rule was earned by this session? Quote the miss or repeated move that produced it."*
- Connector demo becomes the point → *"The answer is not the demo. The point is that clues from separate systems can meet in one memory."*

**Watch-fors and recovery.** Missing connector access: use readable local exports or pasted source files and keep the three-zone distinction visible. No source from one zone: record the absence; do not fabricate representative material. The scheduled-agent exercise is homework between sittings and consumes zero live room time. Module 3 requires a real week of observation; name that expectation before the room leaves.

**Starting state.** Module 1 remains scoped; training root has `memory/`, `sources/`, and `agents/`; no root `CLAUDE.md` until the Debrief; customer connector decision known.

**Runtime map.**

{{runtime-map:building-agent-systems}}

</section>

<section class="module-glance" id="m3-glance">

### M3 — Multi-Agent Systems

**Big idea.** Separate agents search from different source positions and think from different stances; files make the handoffs inspectable.

**Flow.** Fresh session at the training root → action boundary demo → [name the crux](./#exercises-name-your-crux) → [three retrievers](./#exercises-three-retrievers-one-curator) → [three minds](./#exercises-three-minds-one-synthesis) → [when to split](./#lectures-when-to-split-an-agent) → [debugging stuck agents](./#lectures-debugging-stuck-agents) → Debrief sharpens handoff rules → Key Concepts → M4 handoff.

**Mood.** Unsettled competence: *"This is useful, and I wonder whether it is right."* Check: the synthesis is presented as finished truth. Fix: ask which conflict disappeared at a seam and write the doubt into `module-3/wonder.md`; do not resolve it here.

**Protect.** Two visibly different coordination shapes, separate source-zone outputs, stance diversity, a framework-backed synthesis, and the unresolved doubt.

**Push-backs.**

- Agents are different only by name → *"What access, dialect, or stance makes these workers genuinely unable to be one?"*
- Synthesizer averages the room into beige → *"Which disagreement did you choose between, and what framework made the choice?"*
- Debrief says every handoff worked → *"Name two seams and quote the file or pass where each lost something."*
- Student tries to fix the doubtful output → *"Record the shape of the doubt. M5 earns the quality move."*

**Watch-fors and recovery.** Sequential execution hides the parallel lesson: start the independent workers together when the runtime supports it and let the files show the coordination. One retriever stalls: preserve the other outputs and name the missing source zone; do not invent its findings. A helper loses the working directory: correct the path before rerunning so outputs land under `sources/` and `module-3/`.

**Starting state.** Root `CLAUDE.md`, `challenge.md`, `memory/`, `sources/`, and `agents/` from M2; scheduled-agent observation available; M3 prework complete.

**Runtime map.**

{{runtime-map:multi-agent-systems}}

</section>

<section class="module-glance" id="m4-glance">

### M4 — Security

**Big idea.** Safety is not visible in a polished output. The durable practice is assess, mitigate, reassess, and name the residual risk.

**Flow.** Fresh session at the training root → [agent loop, raw](./#lectures-agent-loop-raw) → [discipline of risk](./#lectures-practice-of-risk) → [author the security skill](./#exercises-author-security-skill) → [audit the agent](./#exercises-audit-your-agent) → Debrief compounds operating rules → recurring-skills generalization → Key Concepts → M5 handoff.

**Mood.** Deepened unease without blame: *"This is complex, and I now have a practice for working with the uncertainty."* Check: the room treats the audit as a compliance checklist or celebrates a clean bill of health. Fix: read one `I can't tell` row and one residual decision; the loop is the competence, not certainty.

**Protect.** Raw policy read before packaging, a student-authored skill, both policy and agent-security lenses, one mitigation, and a real before/after residual.

**Push-backs.**

- Skill is authored from generic security knowledge → *"Which policy line and which named attack class does this check carry?"*
- `I can't tell` rewritten as pass → *"What evidence would close it? Until that exists, keep the honest answer."*
- Agent control replaces company security → *"Which classical control still owns this boundary? The agent mitigation sits on top."*
- Student tries to close every risk → *"Pick one material risk, apply one mitigation, and show how the residual changed."*

**Watch-fors and recovery.** Customer policy material must already be readable under `module-4/policies/`; never improvise policy content in the room. Runtime-specific skill creation must follow the verified route for the cohort. If skill packaging fails, keep the raw audit evidence, repair the packaging route, and complete the audit with the authored method only after its files exist. This is the one module with an attested 105-minute cap; protect transitions.

**Starting state.** Full M3 system; root rules; policy reference files; verified skill-creation path for the selected runtime; no prebuilt `security-audit` skill shipped to the student.

**Runtime map.**

{{runtime-map:security}}

</section>

<section class="module-glance" id="m5-glance">

### M5 — Grounded Output

**Big idea.** Grounding is a discipline. The student measures candidate detectors against their own benchmark and keeps a narrow judge whose limits are explicit.

**Flow.** Fresh session at the training root → [Grounded](./#lectures-grounded) → [hallucination benchmark](./#exercises-hallucination-bakeoff) → [self-consistency after the scoreboard](./#lectures-self-consistency-after-scoreboard) → Debrief compounds groundedness triggers → action-proposal boundary → Key Concepts → M6 handoff.

**Mood.** Mechanical rescue: *"This is actually fixable, and I can see which method worked."* Check: the student picks a detector by authority or treats the winner as universal. Fix: return to the scoreboard and the judge's Known limit line.

**Protect.** One shared claim pool, adjudicated benchmark, several detectors on the same input, a measurable scoreboard, a saved winner judge, and the explicit limit.

**Push-backs.**

- Detector chosen because it sounds sophisticated → *"Which scoreboard row shows it caught more of your benchmark?"*
- Scoreboard without traceable claims → *"Pick one cell. Show the claim, expected label, detector return, and scoring decision."*
- Judge becomes broad and vague → *"What does this judge catch reliably, and what does it intentionally not claim to catch?"*
- Root rules file gets rewritten wholesale → *"Edit only the Groundedness checks section, then read it back from the file."*

**Watch-fors and recovery.** A thin benchmark can demonstrate the method but cannot support a production-reliability claim. If a detector fails mechanically, record it as a failed candidate and keep the common benchmark intact. Do not let the student manually classify what the agents are meant to benchmark. For consequential actions, keep the sequence visible: propose, check against source or judge, then apply.

**Starting state.** M3 output chosen as the target; evidence roster and source files available; M4 residual remains named; `judges/` ready for the winning groundedness judge.

**Runtime map.**

{{runtime-map:output-quality}}

</section>

<section class="module-glance" id="m6-glance">

### M6 — Evaluations

**Big idea.** A fixed judge turns human judgment into repeatable steering while the generation tactic learns across rounds.

**Flow.** Fresh session at the training root → [evals as steering](./#lectures-evals-as-steering) → [eval loop](./#exercises-eval-loop) → [when the score stops moving](./#lectures-when-the-score-stops-moving) → [new human role in the loop](./#lectures-new-human-role-in-the-loop) → Debrief sharpens the tactic without touching the judge → Key Concepts → core close or M7 handoff.

**Mood.** Unleashed leverage: *"The loop can keep pressure on the work while I design the yardstick and boundaries."* Check: the student celebrates score improvement without showing what changed, or the judge moved with the generator. Fix: compare the judge hash and quote one tactic rule added from one piece of judge feedback.

**Protect.** Separate generation and judging roles, a byte-stable judge, round artifacts, tactic changes tied to feedback, score trajectory, and a walk-away period.

**Push-backs.**

- Generator grades itself → *"Separate the roles. The thing learning cannot be its own yardstick."*
- Judge changes between rounds → *"Restore the original judge before comparing scores. A moving yardstick voids the trajectory."*
- Tactic rewrite is generic → *"Which per-claim feedback produced this rule? Quote both."*
- Debrief congratulates the loop → *"Which judge finding never made it into the tactic, and why?"*

**Watch-fors and recovery.** If the M5 judge is absent, the student must run the missing M5 judge-build on their own material; do not loan a synthetic judge and pretend the compound is intact. A stalled round may be nudged, but preserve the round trail and label the intervention. M6 is a complete ending for the six-module core: land the human's higher-level role without implying blind trust. If M7 follows, close on whether the loop should stay personal.

**Starting state.** `judges/groundedness-judge.md` from M5; target output and sources; writable `module-6/`; current root rules.

**Runtime map.**

{{runtime-map:evaluations}}

</section>

<section class="module-glance" id="m7-glance">

### M7 — From Personal to Team

**Big idea.** The teammate's job comes first. Context, skill, output, and interface are different sharing designs with different absorption costs.

**Flow.** Fresh session at the training root → interview-for-the-job framing → four sharing shapes → [interview and pick](./#exercises-share-your-work) → [design both plans](./#exercises-design-the-sharing-plan) → [test and write Monday](./#exercises-test-the-sharing-plan) → Debrief sharpens the sharing artifact → Key Concepts → real-world test before M8.

**Mood.** Generous impulse: *"This is working for me; could it help someone else?"* Check: the room starts with governance, deployment, or an abstract enterprise rollout. Fix: name one teammate, the job they are already hiring something to do, and the outcome that would make them switch.

**Protect.** A real teammate, a bounded interview, a measurable outcome statement, one to three chosen sharing shapes, equal technical and people plans, and one assumption tested outside the room.

**Push-backs.**

- Student starts from *"share my agent"* → *"What job is the teammate trying to get done, and what do they use now?"*
- Outcome is speed and quality only → *"What dependency, anxiety, scope, or workload changes if this works?"*
- Technical plan has no owner → *"Name who maintains, introduces, reviews, and retires this shared surface."*
- Whole artifact rewritten after feedback → *"Edit the section you named. Preserve the rest."*

**Watch-fors and recovery.** Sharing plans that never meet a person stay hypothetical. The M8 prerequisite is one real contact: one assumption tested, one name asked for, or one next-step artifact used. Do not manufacture a success story for a student who did not test it; name the missing evidence and let M8 work from that boundary.

**Starting state.** The M2–M6 system works on a real challenge; at least one output has been corrected and improved; organization and runtime branch known; pattern catalog available if the exercise calls it.

**Runtime map.**

{{runtime-map:personal-to-team}}

</section>

<section class="module-glance" id="m8-glance">

### M8 — Agents Building Agents (The Flywheel)

**Big idea.** The system extends itself, then many agents use shared context to propose, cross-check, criticize, and synthesize a grounded strategy kernel.

**Flow.** Separate room-scale working folder ready → agent-builds-agent demo → [extend your system](./#exercises-extend-your-system) → [Agent Proposal Forum](./#exercises-joint-double-diamond) → Debrief sharpens the load-bearing file → Key Concepts → sponsor identity line and forward close.

**Mood.** Awe and curiosity: *"Where is this going, and what can this system build next?"* Check: the ending becomes a graduation ceremony or a tidy strategy presentation. Fix: point at the unresolved assumptions, the next experiments, and the fact that the flywheel can run again on the next problem.

**Protect.** A new agent generated from a real extension need; declared sharing scope; attributed stances; cross-checks before promotion; a human decision over the constrained options; criticism that changes the synthesis; and grounded kernel, agent-set, and plan artifacts.

**Room-scale diagnostics and recovery.**

- Contributions lose authorship → stop promotion and restore the participant/agent attribution before synthesis.
- Shared files overwrite one another → pause the room, assign one subfolder per participant, and preserve every original contribution.
- Synthesizer averages rather than decides → make the selection constraint explicit and have the human decision owner choose what proceeds.
- A participant has no M7 field result → record the missing contact as evidence; do not invent adoption. Their agent can still reason from the plan and the untested assumption.
- The room is too large for verbal adjudication → keep contribution and cross-check work concurrent, then narrow the human decision to the top constrained options. Do not replace the decision with a vote count generated by agents.

**Push-backs.**

- New agent is a copy with a new name → *"What new source, output, or perspective changes the system's capability?"*
- Proposal cites another agent's claim as fact → *"Which source file did that claim originate in, and what did the cross-check find?"*
- Critique leaves the chosen proposal unchanged → *"Name one critique that should alter the kernel or explain why the human decision rejects it."*
- Close sounds finished → *"Which assumption goes first, and what experiment will tell you whether it holds?"*

**If behind.** Shorten the demo and reduce the number of proposals entering human adjudication. Do not cut attribution, cross-checking, the human decision, or the final grounding pass. Those are the room-scale equivalents of the mechanical checks an individual exercise gets from its artifact trail.

**Starting state.** M7 next-step evidence; local A101 compound intact; separate trainer-posted SharePoint/OneDrive deliberation folder with one subfolder per participant; sponsor challenge and decision owner confirmed; privacy boundary declared before contribution.

**Runtime map.**

{{runtime-map:agents-building-agents}}

</section>

<!-- maintainer -->

**Ownership.** This is the single trainer-facing document for Agents 101. Module flow and artefact truth remain canonical in the student modules and linked teaching files; this handbook holds the room decisions, diagnostics, recovery paths, protected beats, and cut order a peer trainer needs under time pressure.
