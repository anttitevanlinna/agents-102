# Output Quality and Hallucination Control

## Big Idea
You don't pick a quality check because someone said so. You run several on your own output, score them against a 30-claim benchmark, and keep the winner.


## Prework

Carry forward Module 4's risk discipline, then read [The Missing Check](lectures/module-5-prework.md): two public-record cases with documented organisational root causes.

Walk in with one sentence per case: "the missing organisational check was X."

## What You'll Learn
After this module, you will be able to:
- **Test** detection methods on a 30-claim benchmark and pick the winner
- **Build** a reusable judge file from the winning method that names what it catches and where it stops
- **Identify** what a judge can reach and what it can't, narrow and working beats broad and pretending

## Start here

In Module 3 the synthesized answer sat at an uneasy distance. You'd stake your reputation on some of it and not all of it, and you couldn't yet say which. Your Module 4 residuals stay named, not solved (that's a different axis, and it stays where you put it).

This module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are. One shape of output, measured, with the limits the judge can't reach named on its face. Module 6 turns the benchmark you build here into a check that runs on every build.

Remember also that agent actions start as text. A tool call, an email draft, a CRM update, a database change, a ticket comment, before any of those touch another system, they are words the agent produced and another system obeys. If the words are wrong, the action will be wrong too.

This module measures what the system actually says inside its scope. Four detectors run on the same claim pool, a scorer adjudicates 30 claims against the sources, and you walk out with the first judge you can defend.

[Lecture: Grounded, and four candidates to measure](lectures/grounded.md)

[Exercise: Hallucination benchmark](exercises/hallucination-bakeoff.md)

[Lecture: Self-consistency after the scoreboard](lectures/self-consistency-after-scoreboard.md)

## Debrief

Five minutes. Claude reviews the benchmark and compounds the useful part into the training-root `CLAUDE.md`: when future sessions should run a groundedness check before trusting or using an output. The evidence is what the scoreboard produced: the evidence roster, claim pool, adjudicated claims, detector outputs, scoreboard, and the judge you saved. Claude updates the operating rules, reports what changed, and you push back on anything that's off.

Ask Claude to review the session and update `./CLAUDE.md` with groundedness operating rules.

{{prompt:a101-m5-debrief-groundedness-rules}}


## Notice what the prompt insists on

Notice what this prompt insists on: touch only the Groundedness checks section, preserve every other section verbatim, then read back what you wrote and confirm each rule landed. Both moves do work the model wouldn't volunteer. Left to itself, Claude treats `./CLAUDE.md` as a clean canvas. A small edit becomes a full rewrite, your earlier rules quietly drift, the diff is uglier than it needed to be. Reading back the section against the file is a separate problem: the report Claude writes describes what it intended, not what landed. The verify-at-artifact step closes the gap. Two different patterns from the same family. Name the boundary, then check the work. Once you have them, you'll start seeing where to apply them in every prompt that asks Claude to edit a file you care about.

## Push back on the summary

Read Claude's summary. Push back where it's wrong: *"run the check only for external-facing claims, not every note"* / *"that rule is too vague; name the evidence roster"* / *"this should say when to stop and ask for sources."* Two things now travel: the reusable judge file exists, and `./CLAUDE.md` tells future sessions when groundedness checking is required.

> Consider automating some of these checks. Not everything. Start with the repeatable, high-cost misses: numbers in external notes, customer names in account summaries, policy claims in internal advice, source citations in briefings. If a future session should never trust that shape of output without a check, write the trigger into `./CLAUDE.md` now. Module 6 turns that trigger into a loop.

## Agent Actions

Same for agent actions. When the action matters, do not let the agent jump straight from thought to tool. Have it propose the action first, quality-check the proposal against the judge or the relevant source, and only then apply it. Propose, double-check, apply. That is output quality becoming operational safety.

Read [What is an Agent, The autonomy ladder](trainings/agents-101/supplementary/what-is-an-agent.md#the-autonomy-ladder-what-may-the-agent-do) before you decide what the agent may do next. The question is not "do I trust the agent?" The question is which rung this action has earned.

Having added the checking step before acting, this is also the suitable place to introduce a human-in-the-loop check. You have both the agent-created action proposal at hand and the report on output quality. That means the expert is not reviewing a blank page or a vague concern; they are reviewing the proposed action, the evidence behind it, and the known limit of the check that passed it.

## Key Concepts
- **Benchmarking as a pattern.** N candidates on the same input, scorer measures, winner (or ensemble) is kept. Portable to any quality judgment you'll automate: tone, brand, compliance, steering.
- **The real move is building the thing that benchmarks the detectors.** Run one benchmark and you have seen what evaluating evaluators looks like. It transfers to every future quality question.
- **Empirical method selection over authority.** You don't pick a detector because the docs or a paper said so. You run several against your own output and your own benchmark, and the data names the winner.
- **The scoreboard is the artifact.** Precision, recall, coverage, measured per detector on the same claim pool. Read it row by row and you can name why one won and where another lost.
- **A judge is narrow on purpose.** The winning judge file says what it catches and names its known limit. Narrow tools that work beat broad tools that pretend.
- **Grounded is the discipline; the benchmark is how you build the check.** A judge measured against a benchmark is what keeps output connected to the ground when you're not in the room. A small benchmark proves the method; a production judge wants hundreds of claims and learns from its own corrections.

## Pre-reads before Module 6

Ethan Mollick, "Garbage Can and Bitter Lesson."

## Next
The benchmark ran once. Thirty claims, four detectors, one judge. Now imagine the benchmark has three hundred claims, the judge runs on every build, and its own corrections feed back into the next round. That's evals.

<!-- maintainer -->

**Mood target:** Mechanical rescue — the student can see which measured method worked without pretending quality is solved.

**Push-back moves / Watch-fors / Decision points:** [M5 run sheet](trainer-modules.md#m5-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** connections 5 @start "Connections" · debrief 5 @end "Debrief" · agent actions 3 @end "Agent actions" · bridge 3 @end "Bridge"
- **Where these numbers come from:** debrief from the body ("Five minutes."); connections and agent-actions are estimates. Every beat here has no file of its own, so nothing else prices it.
- **Primary Bloom's level:** Evaluate (method selection) → Synthesize (winning judge saved as reusable file)
- **Materials (trainer):** the student's Module 3 synthesized answer and retrievals — no pre-built failing agent. The briefing that comes out of Module 3's synthesis IS the test corpus.
- **Plug points:** briefing target, four detector methods, benchmark size

**Plug Points (trainer):**

> PLUG POINT: The briefing target.
> Default: the Module 3 synthesized briefing the student already produced. Any over-reaching output the student cares about also works (a board paper, a Monday memo, a customer-facing proposal).

> PLUG POINT: The four detector methods.
> Default: source triangulation, entailment, citation integrity, counter-evidence search. Calibrated to produce a tight race on a Module 3 shaped briefing. Domain-specific cohorts may swap one in (regulatory-claim flag for compliance, pricing-claim flag for commercial). Ensemble capped at two methods stacked.

> PLUG POINT: The benchmark size.
> Default: 30 claims. Lower only if the briefing is genuinely short; raise only if the cohort has time and the claim pool stays readable.

**Canonical shape:** M5 is the **hallucination benchmark** — the core arc's measured-quality beat. The student operates as benchmark-setup + scoreboard-watcher + winner-saver, not as the classifier. Scorer picks the winner; student watches. Supersedes `ground-your-output.md`; the grounded/ungrounded/misrepresents/overreaches/ungrounded-shape vocabulary is no longer required material.

**Superseded exercise:** `ground-your-output.md` kept alive as supplementary reading for cohorts that want the five-category taxonomy. Delete at the next sweep if unused by delivery date. The benchmark teaches grounded-ness as a discipline empirically without needing the five-category frame up front.

**Frameworks riffed on:**
- **Benchmarking** — Antti-run pattern. Empirical method selection over authority.
- **Precision / recall / coverage** — standard eval vocabulary introduced by being measured, not lectured.
- **Benchmark** — the word is earned by the student writing one in two minutes.
- **Compound reliability math** (85% × 10 steps ≈ 20% end-to-end) — carried in the lecture, makes the "why measure, not guess" case.

**Philosophy callout (sparing):**
- Belief — name what you don't know — lands in the judge's "Known limit:" line. Student-written.
- Belief — practice beats external proof — continues from M4.

**Mood contract — mechanical rescue, not triumph:**
- M5's rescue is the scoreboard moment — *"ahh, this is actually fixable."* Watching four detectors run and the scorer name a winner with measured reasoning.
- Do NOT resolve M3's strategic uncertainty or M4's security residual. Only groundedness-for-this-shape-of-output gets rescued.
- Close must land with "what the judge won't catch" (the body line about 30 claims vs production's hundreds, plus the judge's "Known limit:" line). A student leaving with "quality is solved" is the failure state.
- Hand-off to M6 is hunger, not closure — 30 claims here, hundreds on every build is the seam.

**Understandable magic bar:** after the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same claim pool, a scorer adjudicated 30 claims, detector X won because Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere.

**Delineation with M6:**
- **M5 = the benchmark.** One judge, 30-claim benchmark, hand-run. One exercise, one artifact (`judges/groundedness-judge.md`).
- **M6 = the judge as infrastructure.** Scaled benchmark, scheduled runs, corrections feed back, the steering counterpart (encoding preference for a product/brand attribute).
- Don't cross-teach. M5's benchmark earns M6's automation.

**Why one exercise, not two:** the benchmark is a single bounded activity with a four-phase internal arc (target + benchmark → detectors → scorer → judge). Adding a second exercise here would steal M6's Steering-eval beat. M5 stays focused on the benchmarking pattern; evals are M6's instrument.

**Quality:** compendium-audited 2026-05-04 (writing@92b7e79 story@92b7e79 technical@92b7e79 behavior@92b7e79)
- judges @92b7e79: writing PASS, story PASS, technical PASS, behavior PASS

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 5 benchmark artifacts | `module-5/evidence-roster.md`, `module-5/briefing.md`, `module-5/claim-pool.md`, `module-5/detectors/`, `module-5/adjudicated-claims.md`, `module-5/scoreboard.md` | M5 hallucination benchmark | M5 Debrief; M6 eval-loop setup; M7 sharing diagnosis |
| Groundedness judge | `judges/groundedness-judge.md` | M5 benchmark winner packaging | M6 eval loop as fixed yardstick; M7-M8 quality infrastructure |
| Root groundedness rules | `./CLAUDE.md` groundedness checks | M5 Debrief | M6-M8 fresh sessions before trusted outputs or actions |
