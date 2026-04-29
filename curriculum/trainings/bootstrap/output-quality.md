# Output Quality and Hallucination Control

## Big Idea
You don't pick a quality check because someone said so. You run several on your own output, score them against a 30-claim benchmark, and keep the winner.


## Prework

**Setup:** Start this module at the training-directory root. Module 5 reads the Module 3 synthesized briefing and retrieval evidence, writes the benchmark under `module-5/`, saves the winning judge at `judges/groundedness-judge.md`, and compounds groundedness rules into `./CLAUDE.md`.

Agent-sprawl reading from Module 4 covered shadow agents and the 82%-think-protected / 24%-have-visibility pattern. [Before Module 5](lectures/module-5-prework.md) added two public-record cases with documented organisational root causes: Mata v. Avianca (S.D.N.Y. 2023) and Deloitte Australia / DEWR welfare-compliance report (2025). Walk in with one sentence per case: "the missing organisational check was X."

## What You'll Learn
After this module, you will be able to:
- **Evaluate** detection methods empirically: set up a 30-claim benchmark, compare methods against it, pick the winner with measured reasoning rather than intuition
- **Synthesize** the winning method into a reusable judge file with a stated scope and a named "known limit" (a judge you can defend in production)
- **Explain** why method selection for agent quality work is empirical, not authoritative, and why the scoreboard IS the explanation
- **Identify** what a judge can and can't reach: the difference between a narrow tool that works and a broad tool that pretends

## Start here
In Module 3 the synthesized answer sat at an uneasy distance. You'd stake your reputation on some of it and not all of it, and you couldn't yet say which. Your Module 4 residuals stay named, not solved (that's a different axis, and it stays where you put it).

Remember also that agent actions start as text. A tool call, an email draft, a CRM update, a database change, a ticket comment — before any of those touch another system, they are words the agent produced and another system obeys. If the words are wrong, the action will be wrong too.

Today we measure what the system actually says inside its scope. Four detectors run on the same claim pool, a scorer adjudicates 30 claims against the sources, and you walk out with the first judge you can defend.

[Lecture: Grounded, and four candidates to measure](lectures/grounded.md)

[Exercise: Hallucination benchmark](exercises/hallucination-bakeoff.md)

[Lecture: Self-consistency after the scoreboard](lectures/self-consistency-after-scoreboard.md)

## Key Concepts
- **Benchmarking as a pattern.** N candidates on the same input, scorer measures, winner (or ensemble) is kept. Portable to any quality judgment you'll ever automate (tone, brand, compliance, steering). Groundedness is just the first instance.
- **Empirical method selection over authority.** You don't pick a detector because the docs or a paper said so. You run several against your own output and your own benchmark and the data names the winner. The move works every time you need a machine to make a judgment reliably.
- **The scoreboard IS the explanation.** Magic that you can point at a row and explain. Precision, recall, coverage, introduced experientially, not lectured. A student who reads the scoreboard can defend the winner; a student who skips it is trusting the machine instead of measuring it.
- **Benchmarking teaches evaluating evaluators.** The real move isn't "build a detector"; it's "build the thing that benchmarks detectors." Once you've run a benchmark once, you've seen what evaluating evaluators looks like, and the idea transfers to every future quality question.
- **A judge is narrow on purpose.** The winning judge file says what it catches and names its known limit. Narrow tools that work beat broad tools that pretend. A judge that tries to do everything does nothing well.
- **Grounded is the discipline; the benchmark is how you build the check.** There IS truth out there. Sources carry shards of it. A judge that's been measured against a benchmark is the machine that keeps the output connected to the ground when you're not in the room.
- **What the judge can't reach.** The benchmark was 30 claims. A production judge wants hundreds, running on every build, learning from its own corrections. Same method, bigger scale. Next module.

## Debrief

Five minutes. Claude reviews the benchmark and compounds the useful part into the training-root `CLAUDE.md`: when future sessions should run a groundedness check before trusting or using an output. The evidence is what the scoreboard produced: the evidence roster, claim pool, adjudicated claims, detector outputs, scoreboard, and the judge you saved. Claude updates the operating rules, reports what changed, and you push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and update the root `./CLAUDE.md` with groundedness operating rules. Read `./CLAUDE.md` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Look back over the session: when did ungroundedness matter, which claim-shapes needed checking, where did citations look present but not load-bearing, and what should future agents know before they turn a briefing, memo, recommendation, or proposed action into something people rely on?

Then update `./CLAUDE.md` as the durable operating memory for this agent system. Add or sharpen 1-4 short rules that tell future sessions when and how to run groundedness checks: what kinds of output need checking, which evidence surface to use, when to run `judges/groundedness-judge.md`, and when to say "not enough evidence" instead of smoothing over the gap. Integrate the rules into the right section if one exists; otherwise create a short section named "Groundedness checks". Do not paste a benchmark summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in `./CLAUDE.md`, which scoreboard row or adjudicated claim drove it, what future agents must do differently, and what uncertainty remains.
```


Read Claude's summary. Push back where it's wrong: *"run the check only for external-facing claims, not every note"* / *"that rule is too vague; name the evidence roster"* / *"this should say when to stop and ask for sources."* Two things now travel: the reusable judge file exists, and `./CLAUDE.md` tells future sessions when groundedness checking is required.

> Consider automating some of these checks. Not everything. Start with the repeatable, high-cost misses: numbers in external notes, customer names in account summaries, policy claims in internal advice, source citations in briefings. If a future session should never trust that shape of output without a check, write the trigger into `./CLAUDE.md` now. Module 6 turns that trigger into a loop.

## Agent Actions

Same for agent actions. When the action matters, do not let the agent jump straight from thought to tool. Have it propose the action first, quality-check the proposal against the judge or the relevant source, and only then apply it. Propose, double-check, apply. That is output quality becoming operational safety.

Read [What is an Agent — The autonomy ladder](supplementary/what-is-an-agent.md#the-autonomy-ladder-what-may-the-agent-do) before you decide what the agent may do next. The question is not "do I trust the agent?" The question is which rung this action has earned.

Having added the checking step before acting, this is also the suitable place to introduce a human-in-the-loop check. You have both the agent-created action proposal at hand and the report on output quality. That means the expert is not reviewing a blank page or a vague concern; they are reviewing the proposed action, the evidence behind it, and the known limit of the check that passed it.

## Next
The benchmark ran once. Thirty claims, four detectors, one judge. Now imagine the benchmark has three hundred claims, the judge runs on every build, and its own corrections feed back into the next round. That's evals.

## Homework after Module 5: between-module reading

Carry your own `module-5/still-uncertain.md` line into Module 6 prework. Read Ethan Mollick, "Garbage Can and Bitter Lesson."

<!-- maintainer -->

**Meta (trainer):**
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
- Belief — name what you don't know — lands in the judge's "Known limit:" line and the Close's `still-uncertain.md` line. Both student-written.
- Belief — practice beats external proof — continues from M4.

**Mood contract — mechanical rescue, not triumph:**
- M5's rescue is the scoreboard moment — *"ahh, this is actually fixable."* Watching four detectors run and the scorer name a winner with measured reasoning.
- Do NOT resolve M3's strategic uncertainty or M4's security residual. Only groundedness-for-this-shape-of-output gets rescued.
- Close must land with "what the judge won't catch" (the still-uncertain line). A student leaving with "quality is solved" is the failure state.
- Hand-off to M6 is hunger, not closure — 30 claims here, hundreds on every build is the seam.

**Understandable magic bar:** after the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same claim pool, a scorer adjudicated 30 claims, detector X won because Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere.

**Delineation with M6:**
- **M5 = the benchmark.** One judge, 30-claim benchmark, hand-run. One exercise, one artifact (`judges/groundedness-judge.md`).
- **M6 = the judge as infrastructure.** Scaled benchmark, scheduled runs, corrections feed back, the steering counterpart (encoding preference for a product/brand attribute).
- Don't cross-teach. M5's benchmark earns M6's automation.

**Lecture implications (owed):**
- `grounded.md` lecture body sets up the benchmark — "there IS truth out there; your agent is a statistical generator with no model of it; *which detection method works for your output is an empirical question*." Introduce grounded-ness as the discipline, then pivot to benchmarking as the way to build the check. Compound reliability math stays.
- `self-consistency-after-scoreboard.md` is trainer-led after the judge is saved. It shows self-consistency as a different question, includes optional run prompts, and carries the take-home transfer prompt.

**Capability checks owed (before first delivery):**
- Four subagents spawned in parallel, each reading the claim pool + evidence roster and writing to `module-5/detectors/<name>.md`. Three-subagent version is confirmed working in M3; four should behave identically. Dry-run to confirm.
- Scorer reading four detector files + benchmark and producing a stable scoreboard table with precision/recall. If numbers swing wildly run-to-run, tighten the computation spec in the prompt.
- `judges/groundedness-judge.md` handoff to Module 6's first exercise — confirm M6 expects this path verbatim. Align in the same edit if not.

**Why one exercise, not two:** the benchmark is a single bounded activity with a four-phase internal arc (target + benchmark → detectors → scorer → judge). Adding a second exercise here would steal M6's Steering-eval beat. M5 stays focused on the benchmarking pattern; evals are M6's instrument.

**DEFERRED** (pre-first-cohort): Capability dry-run on Module 5's four-subagent spawn + scorer stability. Four-spawn shape is confirmed in production via Module 3's parallel retrievers; Module 5's pipeline + scorer-stability check needs a real benchmark run on real briefing input.

**Quality:** draft 2026-04-28 (Pass 3 polish — sim/eval not yet run)
- compendium-audited 2026-04-28 (check_writing, check_student_facing, check_lectures, check_pedagogy, check_prompts)

**Source-verification owed (pre-first-cohort):**
- Mata v. Avianca (S.D.N.Y. 2023) — public court record; add URL to the court filing or a reputable secondary source.
- Deloitte Australia / DEWR welfare-compliance report (2025) — add URL (widely reported but no anchor in file).
