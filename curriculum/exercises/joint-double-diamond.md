# Exercise: Joint Double Diamond, diagnose and guide

**What you do:**

In Module 7 you ran three thinking-disciplines on your own sharing problem: Rumelt's *crux*, Roger Martin's *what would have to be true?*, Klein and Kahneman's *pre-mortem*. One person, one problem. Today the same three disciplines run at room scale against a real company question: **what's the company's strategy for agents, over the next six months, grounded in what we've actually built?** The disciplines are named inline in the prompts you'll paste, same shape as M2's Debrief.

The deliverable: a Rumelt-style strategy kernel (diagnosis, guiding policy, near-term experiments, ranked risks) synthesised from everyone's agents reading everyone's work. Not the CEO's strategy from a consulting deck. Your strategy, from your system.

Two diamonds. The first diverges then narrows to diagnosis. The second diverges then narrows to a guiding policy plus experiments plus risks. The three disciplines are the methods; the agents are the instrument.

**Time:** 55 minutes. Phase 1 fifteen, Phase 2 fifteen, Phase 3 fifteen, synthesis and read-out ten.

**The five-line shape (read this before you dive in):**

1. Grounding (before Phase 1, ~5 min): every agent writes a `context-manifest.md` so others can see what it carries and what it doesn't.
2. Phase 1: pool the *cruxes* (Rumelt). Output: `crux.md` per agent → `pooled-cruxes.md`.
3. Phase 2: diagnose the top three, then drift each into a *guiding policy* move. Output: `guiding-policy.md` per agent → `composite-policy.md`.
4. Phase 3: pressure-test the composite with *what would have to be true?* (Roger Martin) and *pre-mortem* (Klein and Kahneman). Output: `assumptions.md` + `premortem.md`.
5. Synthesis + read-out: the strategy kernel lands as one file; the room reads it back.

**Before you start. The grounding rule:**

Twenty agents (or in self-study, one student's M1–M7 stack plus persona-stand-ins) are about to read each other's memory folders. They know different things. Depth varies. The ground truth: every agent **publishes what it has and what it doesn't have** before it speaks to another agent's work. No agent cites a claim without pointing at the file it came from. Before you publish your context-manifest, redact what shouldn't leave your boundary: customer names, partner-NDA material, M&A speculation, salary references. The manifest is read by other agents in the room; treat it like a published document.

**Prompt** *(Builder Claude, run once at the start, before Phase 1)*

```
Write module-8/<my-name>/context-manifest.md. List:
- Which modules' working folders I carry (module-1 through module-7).
- Which memory/ pages I have, by topic.
- Which sources/ I've fetched content for, vs. which are reference-only or NOT REACHABLE.
- Which custom agents I've built, by job.
- One sentence per major gap — what my system does NOT know about.

Keep it dense. Half a page. The point is other agents (and other people) can see at a glance what I bring and what I don't, before they cite me or weigh my position.
```


The manifest is the ground. Every claim in every round after this one cites the file it came from. An agent that can't cite is an agent that's improvising, and the room (or the orchestrator) calls that out.

**Phase 1. Diamond 1 diverge: pool the cruxes (15 min).**

Every agent in the room runs the *crux* move (Rumelt) against the company-strategy question, using its own memory and what it can see of neighbouring agents' published work.

**Prompt** *(Builder Claude)*

```
Find the crux of this question (Rumelt — the load-bearing obstacle that, if removed, collapses several others):

"What's our company's strategy for agents over the next six months — the one load-bearing obstacle that, if we remove it, unlocks the rest?"

Your ground is my own memory/, sources/, agents/, module-1/ through module-7/ outputs, plus my context-manifest.md so you know what I don't have. If other participants' context-manifest.md files (or crux.md files) are reachable in the shared module-8/ folder, read those too — weight your cluster by what they cite, not by what I already thought.

Rules:
- Every obstacle you name cites a file. "The sales team is skeptical" is not an obstacle — "sales-skepticism as described in module-3/interviews.md line 14" is.
- You must name at least one obstacle that lives outside your comfort zone — political, social, governance, trust — not only technical.
- Cluster the obstacles you see. Name the crux: the one that, if removed, collapses several others. One sentence.

Save to module-8/<my-name>/crux.md.
```


**In-room**: once everyone's `crux.md` is published, the CTO's (or sponsor's) agent reads all of them. It synthesises the top three cruxes across the room. Everyone reads the synthesis. It's the first moment the room sees its own shape.

> **In-room cohort (self-study readers, skip the pooling step).**
> In-room the CTO's agent pools cruxes across 20 memory folders. One clear prompt: *"Read every module-8/\*/crux.md. Cluster the cruxes. Name the top three for the room. Cite which participant's file each point came from."* The CTO (or sponsor) reads the output, pushes back, the agent re-synthesises.

**Self-study parallel (Phase 1):** The student's M1–M7 agents stand in for the room. Teacher Claude orchestrates the pooling: each of the student's major agents (the memory-librarian, the researcher, the skeptic if they built one, the judge) publishes a crux from its own angle. Teacher Claude then runs the CTO-agent synthesis move itself: reads them, clusters, names the top three for the student's company as the agents see it. The diversity isn't twenty real people; it's the diversity of angles your own system has accumulated. That's still real signal.

**Phase 2. Converge to diagnosis, drift to guiding policy (15 min).**

The top three cruxes from Phase 1 ARE the diagnosis (Diamond 1's narrow point). Now drift outward again: every agent drafts one guiding policy move that pivots around the crux. Rumelt's sense: a policy is not a goal, it's a *how*.

**Prompt** *(Builder Claude)*

```
Read module-8/pooled-cruxes.md (the synthesis) and your own module-8/<my-name>/crux.md.

Draft a guiding policy move — one sentence in the Rumelt form: "To remove [the crux], we will [specific move that pivots around the crux], not [the obvious-but-wrong alternative]."

Then: three concrete actions that follow from the policy. Each action names an owner (or UNASSIGNED), a timeframe (this week / this month / this quarter), and the file or system it touches.

Cite every claim against a memory file or a pooled-cruxes entry. Don't add anything that doesn't trace back.

Save to module-8/<my-name>/guiding-policy.md.
```


**In-room:** the CTO's agent reads every policy file, clusters, and drafts the single composite policy for the company. Same citation rule. Pushback rounds: any participant can `@mention` the synthesising agent with *"the second action is missing the data-access wall from module-4/compliance.md line 8"* and force a re-synthesis.

> **In-room cohort (self-study readers, skip to next paragraph).**
> In-room the CTO's agent and the room argue through two or three rounds of pushback before converging. The humans talk. The agents compose. The synthesis file gets rewritten live.

**Self-study parallel (Phase 2):** Teacher Claude reads the student's agents' policy drafts and runs the synthesising move: clusters, drafts the single composite, cites against the pooled cruxes. Then Teacher Claude flips hats and becomes devil's advocate: *"The second action assumes the sponsor backs this. Your module-3/sponsor-notes.md suggests they'd balk. Rewrite action two."* One round of pushback. The student approves or pushes back further.

**Phase 3. Diamond 2 converge: pressure-test the policy with assumption-test, then pre-mortem (15 min).**

Every agent now runs Roger Martin's *what would have to be true?* on the composite guiding policy, then a Klein/Kahneman *pre-mortem* on the survivors.

**Prompt** *(Builder Claude)*

```
Read module-8/composite-policy.md (or your own guiding-policy.md in self-study).

First, run Roger Martin's assumption-test. What would have to be true for this policy and its three actions to work? List the top five assumptions. For each: confidence (high / medium / low) against specific evidence in my memory; one two-week experiment to test it.

Then run a pre-mortem (Klein and Kahneman) on the policy. It is 18 months from now. The policy failed. Write three failure stories — one social, one technical, one 'the failure I'm not seeing.' For each, one early warning sign visible in week two.

Cite every claim against a memory file, a module-8 file, or a pooled-cruxes entry.

Save the assumption-test to module-8/<my-name>/assumptions.md and the pre-mortem to module-8/<my-name>/premortem.md.
```


**In-room:** the orchestrator-agent pools the assumptions and pre-mortems across the room, clusters, and surfaces the two or three that appear in most agents' lists. Those are the load-bearing ones. The room argues about them.

> **In-room cohort (self-study readers, skip the decision-layer paragraph).**
> Final decision: the CTO (or sponsor), in the room, picks which two or three assumptions the company actually commits to testing next. That's the real deliverable and it sits at a human layer. The agents produced the options. The human picks. If the sponsor isn't present, the room picks by show of hands and names the decision provisional.

**Self-study parallel (Phase 3 decision):** The student picks the two or three assumptions themselves. Teacher Claude plays one more round of devil's advocate: *"You picked assumption three. Your pre-mortem said the social-failure story was the one not seen. That assumption touches the political wall you've been avoiding. Do you still pick it, or are you dodging?"* The student decides. The decision is the deliverable.

**Synthesis and read-out (10 min).**

Close the session with a single file: `module-8/strategy-kernel.md`. Four sections:

- **Diagnosis.** The three cruxes, ranked, one sentence each, each citing the file it came from.
- **Guiding policy.** The one-sentence policy move in Rumelt form.
- **Experiments.** The two or three assumptions you will test in the next two weeks. Each with owner, experiment, success signal.
- **Risks.** The one pre-mortem failure story the room (or the student) agreed was most likely unseen. One early warning sign.

**Prompt** *(Builder Claude, for the student compiling their own kernel, or for the orchestrator-agent compiling the room's)*

```
Read every module-8/*/ file. Write module-8/strategy-kernel.md with the four sections — diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where two agents conflicted, name the conflict in one line under the relevant section.
```


**In-room:** one participant reads the kernel aloud. Not the sponsor. A participant who wasn't the loudest voice in the diamonds. The read-out is three minutes.

> **In-room cohort (self-study readers, read the kernel aloud to yourself).**
> The read-aloud beat matters even alone. Hearing the four paragraphs in your own voice is what makes the kernel real. It turns a file into a commitment.

**Identity-naming close (5 min).**

**In-room:** the sponsor (the one who sat alongside for all eight modules) names what just happened, in one sentence, out loud: *"You are now agent builders. You have built agents that do real work on your company's data. You can do it again tomorrow on a new problem. That's what you carry out of this room."* No certificate. No ceremony. A name the graduate can say on Tuesday morning to colleagues who weren't there.

> **In-room cohort (self-study readers, Teacher Claude runs this beat instead).**

**Self-study parallel (identity-naming):** Teacher Claude delivers the naming as a reflective beat in its own voice: *"You are now an agent builder. You built agents that do real work on your own data. You can build another one Tuesday on a new problem. That's what you carry out: not the modules, not the files. The fact that you can make the next one."* The student reads it. No confetti. The name is the gift.

**What happens:**

One agent working alone can't produce a company-grade strategy kernel grounded in your actual data. Twenty agents (or one student's M1–M7 stack plus persona-stand-ins orchestrated by Teacher Claude) can, because the three disciplines compose. Crux finds the load-bearing obstacle. Assumption-test surfaces what has to be true. Pre-mortem names what breaks. The composite is a Rumelt kernel that a consultant could not produce in a month, because it cites your files.

The diamonds didn't converge on the first try. Pushback rounds were the work. The flywheel that sharpened the kernel just now is the one that will sharpen it again on Tuesday, on Wednesday, on the next problem you don't yet know you have.

**The point:**

You do not graduate. You have a flywheel.

**Time:** 55 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Rumelt — *crux*, guiding policy, strategy kernel (diagnosis + policy + coherent actions). Named inline in prompts.
- Roger Martin — *assumption-test* (what would have to be true). Named inline.
- Klein / Kahneman — *pre-mortem*, 18-month failure story. Named inline.
- Double Diamond (Design Council) — diverge then converge, twice; the three disciplines are the methods that do the converging.
- Agents orchestrating agents — the M8 thesis made literal; the orchestrator is also an agent

**Trainer artifacts required:**
- Shared-context mechanism for in-room runs: agents able to read each other's `module-8/<name>/` folders. Simplest is shared filesystem + naming convention. Cowork-native variant is the future shape; either is acceptable.
- **Capability check — Cowork shared-FS story.** In-room shape assumes a shared filesystem twenty agents can read each other's `module-8/` folders on. Code CLI / Desktop with shared filesystem (NFS, shared mount, or git-pulled before each round) is the verified path. Cowork connected-folders are per-participant by default; in-room delivery on Cowork requires either a shared workspace primitive that doesn't yet exist, or a fallback where each participant's `context-manifest.md`, `crux.md`, and `guiding-policy.md` are git-pushed and pulled between rounds. For mixed-runtime cohorts, default to the git-push fallback so Code and Cowork participants land at the same shared state at each phase boundary.
- Orchestrator-agent prompt for the CTO/sponsor's agent: pool, cluster, cite source, force pushback on uncited claims.
- Self-study: Teacher Claude plays orchestrator and devil's advocate across the three phases. Teacher Claude's persona-stand-ins draw from the student's own agent stack — no synthetic characters.

**Plug points:**
- **Company strategy question** — rephrase the top-level question for the cohort. "Our company's strategy for agents" is the default. If the cohort has a more specific live question (a portfolio decision, a re-org question, a vendor question), use that instead.
- **CTO/sponsor role** — in-room, their agent runs the pooling synthesis. If the sponsor isn't present, the role rotates.

**Facilitator notes:**
- **Grounding rule is load-bearing.** If context-manifest.md is skipped, agents will hallucinate about what other agents know. Don't skip it. Five-minute investment pays for itself ten times over in the pushback rounds.
- **Phase 1 convergence watch-for.** Rooms want to skip the divergence — every agent comes back with the same crux because they read each other's manifests first. Nudge: *"Produce your crux from your own memory first. Read the others second. Revise only if something they cited changes your view."*
- **Pushback rounds are the work.** If the room goes silent during Phase 2 synthesis, that's a failure, not a success. Prompt: *"What did the composite policy get wrong? Find one uncited claim. Find one action whose owner is you and you disagree."*
- **Phase 3 decision layer is human.** Don't let an agent pick the two or three assumptions to commit to. The agents produce options; the human picks. That's the thesis — agents orchestrate each other; humans sit at the decision.
- **Self-study peak.** The solo run can't match an in-room run for raw diversity of context. What it can do — and does — is surface the student's own blind spots via Teacher-Claude-as-devil's-advocate in each phase. The self-study deliverable is not worse; it's more confronting, because there's no room to hide in.
- **Awe mood.** The exercise ends on "you have a flywheel, not a graduation." Do NOT frame this as completion. Don't say *"you've mastered X"* or *"you've arrived at Y."* The point is the next cycle is better than this one, and will happen without us.
- **Identity-naming is the only ceremonial beat.** Keep it one sentence. No speech. No certificate. The word *agent builder* is the deliverable.

**Claude-behavior watch-fors:**
- **Uncited claims.** Agents will sometimes assert a crux without a file. Tell: the sentence is generic. Push: *"Cite the file. If no file, it's not in the diagnosis."*
- **Synthesis flattening.** The pooling agent will smooth disagreements into averages. Nudge: *"Name the conflict, don't average it. Where two participants disagreed, that's signal."*
- **Phase 3 assumption-test turning into a PowerPoint.** The test is not *are these assumptions plausible?* — it's *which two would we bet on this week?* Push: *"Pick two. Not three. Not five. Two."*
- **Pre-mortem ducking the social failure.** Agents will write technical failure stories because they're easier. Check all three stories: if the social-failure one reads generic, push: *"The social failure should name a specific person, role, or political fault line. Try again."*
