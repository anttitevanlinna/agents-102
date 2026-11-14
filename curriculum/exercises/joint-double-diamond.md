# Exercise: Agent Proposal Forum, diagnose and guide

**Time:** 70 minutes, in nine timed stages.

**What you do:**

The buyer or sponsor seeds a live company challenge. The room's agents form a proposal forum around it: each takes a stance, cross-checks with the others, publishes proposals in the shared folder and criticizes the emerging selections. One or two central synthesizers keep choosing the best ideas.

The deliverable: your Rumelt-style strategy kernel (diagnosis, guiding policy, near-term experiments, ranked risks), then a suggested agent set and execution plan.

The steps are the launch order. Agents keep reading and revising while later steps begin.

**The six-line shape:**

1. Sponsor challenge: buyer or sponsor writes `challenge.md` at the shared root.
2. Grounding: every agent writes `context-manifest.md`, listing what it carries and what it doesn't.
3. Initial stance and cross-check: every agent writes `stance.md`, then reads neighbouring stances and writes `cross-check.md`.
4. Shared proposals: every agent writes `proposal.md`; one or two central synthesizers publish `selection-board.md`.
5. Critique loop: agents write `critique.md` with better ideas; the synthesizer updates `selection-board.md`.
6. Conclusion: the synthesizer writes `strategy-kernel.md`, `agent-set.md`, and `plan.md`.

## Phase 1: Ground the room

*10 min*

Each agent publishes what it has and what it doesn't have before another agent weighs its proposal. Every claim points at the file it came from.

Before you publish your context-manifest, redact customer names, partner-NDA material, M&A speculation and salary references. Other agents in the room read the manifest.

The trainer posts the shared folder path or name in chat at the start of Module 8. Use that exact folder for every shared-folder instruction. It is separate from your local training directory.

{{prompt:joint-double-diamond-1}}

{{prompt:joint-double-diamond-2}}

The room or central synthesizer calls out an agent that can't cite.

## Phase 2: Initial stance

*8 min*

Read the sponsor challenge and write your agent's opening stance. Don't read other stances yet: different context, sources and judgment make the first round useful. Your agent may ask you one or two clarifying questions first.

{{prompt:joint-double-diamond-3}}

## Phase 3: Cross-check with others

*8 min*

Once every `stance.md` is published, your agent reads three to five neighbouring stances, assigned by the trainer or the folders to your left and right. Find what your stance missed.

{{prompt:joint-double-diamond-4}}

## Phase 4: Shared proposals

*12 min*

Every agent publishes a proposal in the shared folder. The file history shows who changed their mind and why.

{{prompt:joint-double-diamond-5}}

## Phase 5: Synthesizer starts choosing

*8 min*

The synthesizer reads proposals and chooses. With two, A picks the strongest ideas and B names objections, evidence gaps and unsafe assumptions. The sponsor pushes back; the synthesizer rewrites.

Central synthesizer prompt: *"Read challenge.md and every participant subfolder in the shared folder from chat, using each stance.md, cross-check.md, and proposal.md. Do not average the room. Write selection-board.md at the shared folder root: best crux, guiding policy move, two-week experiment, objection, dangerous evidence gap, unresolved disagreement. Cite each source file and why it beats the alternatives. Mark it provisional."*

## Phase 6: Midway instruction injection

*5 min*

The central synthesizer publishes operating instructions in the shared folder. Your agents read them in the next step.

{{prompt:joint-double-diamond-6}}

From here on, every agent prompt begins by reading `midway-instructions.md` from the shared folder.

## Phase 7: Criticize and propose better ideas

*9 min*

The selection board is a candidate. Every agent criticizes it and proposes a better idea if it can.

{{prompt:joint-double-diamond-7}}

## Phase 8: Final synthesis and the human decision

*5 min*

The central synthesizer reads every critique, updates the selection board, then writes the strategy kernel, the agent set and the plan. Any participant can publish a correction as `pushback.md` in their named subfolder; the synthesizer rewrites the conclusion.

The CTO, buyer or sponsor picks the two or three assumptions to test next. Without the sponsor, the room picks by show of hands and names the decision provisional.

## Phase 9: Agent set, plan, and read-out

*5 min*

Close the session with three files at the shared folder root:

- `strategy-kernel.md`
- `agent-set.md`
- `plan.md`

## Write the strategy kernel's four sections

`strategy-kernel.md` has four sections:

- **Diagnosis.** Selected crux and strongest rejected alternative, each citing its file.
- **Guiding policy.** One-sentence policy move, Rumelt form.
- **Experiments.** Two or three assumptions to test: owner, experiment, success signal.
- **Risks.** Likeliest unseen pre-mortem failure; one early warning sign.

{{prompt:joint-double-diamond-8}}

## Read out the kernel and name what the room built

**In-room:** a participant who wasn't the loudest voice reads the kernel aloud, not the sponsor.

**Close (5 min).**

**In-room:** the sponsor asks the room one question: *"What is going to be the next hard part about agents?"*

## Take stock of what the forum produced

**What happened:**

The synthesizer turned the proposals into a Rumelt kernel, a buildable agent set, and a two-week plan that cites its evidence and keeps the rejected alternatives. Agents improved each other's work in every pushback round.

**The point:**

You do not graduate. You have a flywheel.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@4d9c4af2 technical@725101ec behavior@194c81b0 pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

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

**View summary:** A sponsor seeds a live company challenge and the room's agents form a proposal forum: stances, cross-checks, published proposals, critique, one or two central synthesizers choosing. The artifact is a shared plan nobody in the room checked, and the doubt you hold about it.
