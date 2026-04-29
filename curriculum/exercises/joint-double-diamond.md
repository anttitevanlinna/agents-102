# Exercise: Agent Proposal Forum, diagnose and guide

**What you do:**

In Module 7 you ran three thinking-disciplines on your own sharing problem: Rumelt's *crux*, Roger Martin's *what would have to be true?*, Klein and Kahneman's *pre-mortem*. One person, one problem. Today the buyer or sponsor seeds a live company challenge, and the room's agents form a proposal forum around it: take an initial stance, cross-check with each other, make proposals on the shared surface, criticize the emerging selections, and let one or two central synthesizers keep choosing the best ideas.

The deliverable: a Rumelt-style strategy kernel (diagnosis, guiding policy, near-term experiments, ranked risks), a suggested set of agents, and the plan. Not the CEO's strategy from a consulting deck. Not an averaged room consensus. Your strategy, selected from the strongest claims your agents can defend against each other, then turned into an agent build-out and execution plan.

The shape is closer to a governed agent forum than a relay. Agents start privately enough to have a point of view, ask their human for missing judgment when useful, cross-check with other agents, then move onto the shared proposal surface. The central synthesizers do not summarize everything. They keep publishing selections, and the other agents keep criticizing and improving those selections.

**Time:** 60 minutes. Sponsor challenge five, grounding five, initial stance eight, cross-check eight, shared proposals twelve, synthesizer selection eight, critique and better ideas nine, final agent set + plan five.

The steps start in this sequence, but the room is not a clean queue. Agents continue reading, revising, and reacting while later steps begin. The sequence is the launch order, not a ban on overlap.

**The six-line shape (read this before you dive in):**

1. Sponsor challenge: buyer or sponsor writes `challenge.md` at the shared root. This is the prompt the room argues with.
2. Grounding: every agent writes `context-manifest.md` so others can see what it carries and what it doesn't.
3. Initial stance and cross-check: every agent writes `stance.md`, then reads neighbouring stances and writes `cross-check.md`.
4. Shared proposal surface: every agent writes `proposal.md`; one or two central synthesizers publish `selection-board.md`.
5. Critique loop: agents write `critique.md` with better ideas; the synthesizer updates `selection-board.md`.
6. Conclusion: the synthesizer writes `strategy-kernel.md`, `agent-set.md`, and `plan.md`.

**Before you start. The grounding rule:**

Twenty agents are about to publish into the shared deliberation folder. They know different things. Depth varies. The ground truth: every agent **publishes what it has and what it doesn't have** before another agent weighs its proposal. No agent cites a claim without pointing at the file it came from. Before you publish your context-manifest, redact what shouldn't leave your boundary: customer names, partner-NDA material, M&A speculation, salary references. The manifest is read by other agents in the room; treat it like a published document.

At the start of Module 8, the trainer posts the shared folder path or name in chat. Use that exact shared folder for every shared-folder instruction below. It is separate from your local training directory.

**Prompt** *(buyer/sponsor agent, run once at the start)*

```
Use the shared folder the trainer posted in chat. Write challenge.md at the shared folder root.

The challenge is:
"What should our company's strategy for agents be over the next six months?"

Make it concrete for this room:
- The buyer/sponsor goal in one paragraph.
- Three constraints the strategy must respect.
- Two non-negotiables.
- Three kinds of evidence that matter most.
- One decision the room must make today.

Do not solve it. Seed the challenge so the agents have something real to argue with.
```

**Prompt** *(Builder Claude, run once after challenge.md exists)*

```
Use the shared folder the trainer posted in chat. Create a subfolder named after me if it does not exist. Write context-manifest.md in that subfolder. List:
- Which modules' working folders I carry (module-1 through module-7).
- Which memory/ pages I have, by topic.
- Which sources/ I've fetched content for, vs. which are reference-only or NOT REACHABLE.
- Which custom agents I've built, by job.
- One sentence per major gap — what my system does NOT know about.

Keep it dense. Half a page. The point is other agents (and other people) can see at a glance what I bring and what I don't, before they cite me or weigh my position.
```


The manifest is the ground. Every claim in every round after this one cites the file it came from. An agent that can't cite is improvising, and the room or central synthesizer calls that out.

**Initial stance (8 min).**

Every agent in the room reads the sponsor challenge and takes its own opening stance. Do not read other participants' stances yet. The first round only works if the stances start from different memory, sources, agent systems, and human judgment. It is OK for the agent to ask its human one or two clarifying questions before writing.

**Prompt** *(Builder Claude)*

```
Read challenge.md at the shared folder root.

Write my initial stance on the sponsor challenge.

Use Rumelt's crux move: name the load-bearing obstacle that, if removed, collapses several others. Then name the direction I currently favor.

Your ground is my own memory/, sources/, agents/, module-1/ through module-7/ outputs, plus my context-manifest.md so you know what I don't have. Do not read other participants' stance.md files yet. This first note should carry my agent's own position.

If you need human judgment before taking a stance, ask me up to two questions. After I answer, write the stance.

Rules:
- Every obstacle you name cites a file. "The sales team is skeptical" is not an obstacle — "sales-skepticism as described in module-3/interviews.md line 14" is.
- You must name at least one obstacle that lives outside your comfort zone — political, social, governance, trust — not only technical.
- Name the crux in one sentence.
- Name the direction I currently favor in one sentence.
- Name the human judgment call I am least certain about.
- Name one risk or objection my stance is weak against.

Save stance.md in my named subfolder in the shared folder.
```


**Cross-check with others (8 min).** Once everyone's `stance.md` is published, each agent reads three to five neighbouring stances. The trainer assigns neighbours, or each participant picks the folders to their left and right. This is not yet the proposal round. The job is to discover what your stance missed before you publish a proposal to the shared surface.

**Prompt** *(Builder Claude)*

```
Read my own stance.md in my named subfolder, then read three to five neighbouring stance.md files from other participant subfolders in the shared folder.

Write cross-check.md in my named subfolder with:
- One thing another agent saw that my stance missed.
- One disagreement I keep after reading the neighbours.
- One evidence gap that appears across more than one stance.
- One idea I should carry into my proposal.
- One stance I want the synthesizer to watch because it may be stronger than it first looks.

Do not summarize every neighbour. Act like a serious peer reviewer with skin in the game.
```

**Shared proposals (12 min).** Every agent now publishes a proposal on the shared surface. This is where the Moltbook-like social mechanic matters: ideas move between agents, but the file history still shows who changed their mind and why.

**Prompt** *(Builder Claude)*

```
Read my stance.md and cross-check.md. Then write my proposal for the shared surface.

Write proposal.md in my named subfolder:
- Crux, one sentence.
- Guiding policy, one sentence.
- Two experiments, each with owner, two-week test, success signal.
- What I changed after cross-checking with other agents.
- What I refused to change, and why.
- One unresolved disagreement the synthesizer must preserve.

Cite every claim against a source file, stance, or cross-check.
```

**Synthesizer starts choosing (8 min).** Now the central synthesizer reads the first shared proposal surface and starts choosing. One synthesizer is enough; two is better if the room is large or politically diverse. If using two, Synthesizer A picks strongest ideas; Synthesizer B names the best objections, evidence gaps, and unsafe assumptions. The sponsor reads both, pushes back, and the synthesizer rewrites.

Central synthesizer prompt: *"Read challenge.md and every participant subfolder in the shared folder the trainer posted in chat. Use each stance.md, cross-check.md, and proposal.md. Do not average the room. Write selection-board.md at the shared folder root with: best crux, best guiding policy move, best two-week experiment, best objection, most dangerous evidence gap, and strongest unresolved disagreement. For each selection, cite the participant file it came from and explain why it currently beats the alternatives. Mark the board as provisional."* The sponsor reads the output, pushes back, the agent re-synthesises.

**Midway instruction injection (5 min).** The room now knows something it didn't know when the exercise began: which disagreements matter, which evidence gaps are dangerous, and what bad synthesis would smooth over. The central synthesizer now injects operating instructions onto the shared surface. Participants do not hand-prompt the cross-pollination behavior; their agents consume the synthesizer's instruction file in the next step.

**Prompt** *(central synthesizer)*

```
Read selection-board.md at the shared folder root and every participant cross-check.md.

Write midway-instructions.md at the shared folder root with 3-5 operating instructions for the critique phase. These are not conclusions. They are rules for how agents should deliberate from here.

Include this instruction unless there is a stronger reason not to:
"Before criticizing the selection, cross-pollinate: read at least two participant folders whose proposals differ from yours, then carry forward one objection, one useful idea, and one evidence gap."

Also include instructions for:
- Which disagreement must not be averaged away.
- Which evidence gap must be named whenever it affects a claim.
- Which kind of claim needs a citation before the synthesizer can use it.
- Which tempting policy move should be treated skeptically.

Each instruction should be one sentence and usable by an agent that did not see the first round.
```

From this point forward, every agent prompt begins by reading `midway-instructions.md`. The instruction injection lives on the shared surface; it is not a participant-authored `CLAUDE.md` update.

**Criticize and propose better ideas (9 min).**

The selection board is now the candidate direction, but it is not final. Every agent criticizes the selection and proposes a better idea if it can. This is where the room keeps the synthesizer honest.

**Prompt** *(Builder Claude)*

```
Read midway-instructions.md and selection-board.md at the shared folder root. Follow the injected instructions before writing.

Write critique.md in my named subfolder.

If midway-instructions.md tells me to cross-pollinate, first read the required participant folders and name which files changed my critique.

First, criticize the current selection:
- What did the synthesizer choose well?
- What did it miss?
- Which selected idea is under-cited or overconfident?
- Which rejected idea deserves another look?

Then propose a better idea if you have one:
- Better crux, policy, experiment, or risk.
- Why it beats the current selection.
- What would have to be true for it to work.
- One pre-mortem failure story if the room adopts it.

Cite every claim against a memory file, a shared-folder file, or a selection-board entry.
```


**Final synthesis and human decision.** The central synthesizer reads every critique, updates the selection board, then writes the strategy kernel, the suggested agent set, and the plan. Same citation rule. Pushback is still live: any participant can say aloud or publish a correction as `pushback.md` in their named subfolder: *"the selected experiment assumes data access we do not have; see module-4/compliance.md line 8."* The synthesizer reads the pushbacks and rewrites the conclusion.

The CTO, buyer, or sponsor picks which two or three assumptions the company actually commits to testing next. That's the real deliverable and it sits at a human layer. The agents produced the options. The human picks. If the sponsor isn't present, the room picks by show of hands and names the decision provisional.

**Agent set, plan, and read-out (5 min).**

Close the session with three files at the shared folder root:

- `strategy-kernel.md`
- `agent-set.md`
- `plan.md`

`strategy-kernel.md` has four sections:

- **Diagnosis.** The selected crux and the strongest rejected alternative, each citing the file it came from.
- **Guiding policy.** The selected one-sentence policy move in Rumelt form.
- **Experiments.** The two or three assumptions the human decision-maker chose to test next. Each with owner, experiment, success signal.
- **Risks.** The one pre-mortem failure story the room agreed was most likely unseen. One early warning sign.

**Prompt** *(central synthesizer)*

```
Read challenge.md, selection-board.md, midway-instructions.md, every proposal.md, every critique.md, and any pushback.md files. Update selection-board.md if a critique changed the best idea.

Then write three files at the shared folder root:

1. strategy-kernel.md
Four sections: diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where the selected idea beat a strong alternative, name the alternative in one line.

2. agent-set.md
Suggest the set of agents the company should build or assign next. For each agent: job, owner, input files/systems, output, first evaluation or judge, and why this agent belongs in the set. Keep it to the smallest set that can execute the plan.

3. plan.md
Write the plan for the next two weeks. Include sequence, owners, agent dependencies, human decision points, evidence to collect, success signal, and stop condition. Make clear which work can start concurrently and which work must wait.
```


**In-room:** one participant reads the kernel aloud. Not the sponsor. A participant who wasn't the loudest voice in the diamonds. The read-out is three minutes.

**Identity-naming close (5 min).**

**In-room:** the sponsor (the one who sat alongside for all eight modules) names what just happened, in one sentence, out loud: *"You are now agent builders. You have built agents that do real work on your company's data. You can do it again tomorrow on a new problem. That's what you carry out of this room."* No certificate. No ceremony. A name the graduate can say on Tuesday morning to colleagues who weren't there.

**What happens:**

One agent working alone can't produce a company-grade strategy kernel grounded in your actual data. Twenty agents can, because they take stances, cross-check, publish proposals, criticize selections, and force better choices. Crux finds the load-bearing obstacle. Cross-checks expose blind spots. Critiques keep the synthesizer honest. Assumption-test and pre-mortem moves appear inside the critique when a better idea needs to prove it can survive. The central synthesizer turns the room's proposal forum into a Rumelt kernel, a buildable agent set, and a two-week plan that a consultant could not produce in a month, because it cites your files and preserves the alternatives it rejected.

The forum didn't converge on the first try. Pushback rounds were the work. The flywheel that sharpened the kernel just now is the one that will sharpen it again on Tuesday, on Wednesday, on the next problem you don't yet know you have.

**The point:**

You do not graduate. You have a flywheel.

**Time:** 60 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Rumelt — *crux*, guiding policy, strategy kernel (diagnosis + policy + coherent actions). Named inline in prompts.
- Roger Martin — *assumption-test* (what would have to be true). Named inline.
- Klein / Kahneman — *pre-mortem*, 18-month failure story. Named inline.
- Agent forum mechanics — stances, cross-checks, proposals, critiques, and selection under citation rules.
- Agents orchestrating agents — the M8 thesis made literal; central synthesizers are also agents.

**Trainer artifacts required:**
- Shared write surface for in-room runs: a separate, nearly empty SharePoint directory or OneDrive shared folder, with one named subfolder per participant.
- Naming convention: participants write only inside their named subfolder in the shared folder the trainer posts in chat; buyer/sponsor writes `challenge.md`; one or two central synthesizers write `selection-board.md`, `midway-instructions.md`, `strategy-kernel.md`, `agent-set.md`, and `plan.md` at the shared folder root.
- Capability check — SharePoint/OneDrive sync timing. Dry-run 10-20 concurrent writers before the cohort: context manifests, stances, cross-checks, proposals, synthesizer-injected midpoint instructions, critiques that consume those instructions, pushback files, and central selection rewrites. If sync delay appears, insert explicit 60-90 second sync pauses at each phase boundary.
- Central synthesizer prompts for the CTO/sponsor's agent(s): select best ideas, cite source, preserve disagreements, force pushback on uncited claims.
- Delivery constraint: this exercise requires an in-room cohort. Do not convert it to self-study; the learning objective depends on real participant heterogeneity, a shared folder, cross-checks, proposal critique, and central selection.

**Plug points:**
- **Company strategy question** — rephrase the top-level question for the cohort. "Our company's strategy for agents" is the default. If the cohort has a more specific live question (a portfolio decision, a re-org question, a vendor question), use that instead.
- **Central synthesizer role** — in-room, the CTO/sponsor's agent is the natural synthesizer. If the sponsor isn't present, the role rotates. In larger or more political rooms, run two synthesizers: one for convergence, one for disagreements and missing evidence.

**Facilitator notes:**
- **Grounding rule is load-bearing.** If context-manifest.md is skipped, agents will hallucinate about what other agents know. Don't skip it. Five-minute investment pays for itself ten times over in the pushback rounds.
- **Proposal convergence watch-for.** Rooms want to skip the disagreement — every agent comes back with the same plausible policy because they read each other too early. Nudge: *"Take your own stance first. Cross-check second. Propose third. Criticize the selection fourth."*
- **Pushback rounds are the work.** If the room goes silent during synthesis, that's a failure, not a success. Prompt: *"Which selected idea should lose? Which rejected idea deserved to survive? Find one uncited claim."*
- **Midway instructions must stay operational.** The midpoint injection is not where the room freezes conclusions. It should add rules for the next round: cross-pollinate before critique, preserve this disagreement, cite this class of claim, distrust this easy policy move.
- **Decision layer is human.** Don't let an agent pick the two or three assumptions to commit to. The agents produce options; the human picks. That's the thesis — agents orchestrate each other; humans sit at the decision.
- **No self-study substitute.** A solo run loses the point: live heterogeneity, cross-checks, proposal critique, pushback, and a shared synthesis surface. If the room is not available, do a different capstone rather than simulate this one.
- **Awe mood.** The exercise ends on "you have a flywheel, not a graduation." Do NOT frame this as completion. Don't say *"you've mastered X"* or *"you've arrived at Y."* The point is the next cycle is better than this one, and will happen without us.
- **Identity-naming is the only ceremonial beat.** Keep it one sentence. No speech. No certificate. The word *agent builder* is the deliverable.

**Claude-behavior watch-fors:**
- **Uncited claims.** Agents will sometimes assert a crux without a file. Tell: the sentence is generic. Push: *"Cite the file. If no file, it's not in the diagnosis."*
- **Synthesis flattening.** The central synthesizer will smooth disagreements into averages. Nudge: *"Pick the stronger idea, name the rejected alternative, and explain why it lost."*
- **Better-idea critique turning into a PowerPoint.** The test is not *is this alternative plausible?* — it's *does this beat the current selection, and what would have to be true this week?* Push: *"Name the better idea or concede the selection holds."*
- **Pre-mortem ducking the social failure.** Agents will write technical failure stories because they're easier. Check all three stories: if the social-failure one reads generic, push: *"The social failure should name a specific person, role, or political fault line. Try again."*
