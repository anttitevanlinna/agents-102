# Output Quality and Hallucination Control

## Big Idea
You don't pick a detection method because someone said so. You run several in parallel on your own output, let a meta-evaluator score them against a gold standard you wrote, and keep the winner. Quality is measured, not assumed.

## Meta
- **Prework:** [Before Module 5](exercises/module-5-prework.md) — two public-record cases with documented organisational root causes: Mata v. Avianca (S.D.N.Y. 2023) and Deloitte Australia / DEWR welfare-compliance report (2025). Student arrives with one sentence per case: "the missing organisational check was X."
- **Homework:** Chip Huyen *AI Engineering* (O'Reilly 2025) — selected sections (candidate); the student's own `module-5/still-uncertain.md` carried into Module 6 prework

## What You'll Learn
After this module, you will be able to:
- **Evaluate** detection methods empirically — set up a bake-off, compare methods against a gold standard you wrote, pick the winner with measured reasoning rather than intuition
- **Synthesize** the winning method into a reusable judge file with a stated scope and a named "known limit" — a judge you can defend in production
- **Explain** why method selection for agent quality work is empirical, not authoritative — and why the scoreboard IS the explanation
- **Identify** what a judge can and can't reach — the difference between a narrow tool that works and a broad tool that pretends

## Connections
In Module 3 the synthesized answer sat at an uneasy distance — you'd stake your reputation on some of it and not all of it, and you couldn't yet say which. Your Module 4 residuals stay named, not solved — that's a different axis, and it stays where you put it. Today we measure what the system actually says inside its scope. Four detectors run on the same briefing, a meta-evaluator scores them against a gold standard you wrote in two minutes, and you walk out with the first judge you can defend.

## Lectures

[Lecture: Grounded — and three ways to check](lectures/grounded.md)

## Exercises

[Exercise: Hallucination bake-off](exercises/hallucination-bakeoff.md)

## Key Concepts (Emergent)
- **Bake-off as a pattern.** N candidates on the same input, meta-evaluator measures, winner (or ensemble) is kept. Portable to any quality judgment you'll ever automate — tone, brand, compliance, steering. Groundedness is just the first instance.
- **Empirical method selection over authority.** You don't pick a detector because a vendor or a paper said so. You run several against your own output and your own gold standard and the data names the winner. The move works every time you need a machine to make a judgment reliably.
- **The scoreboard IS the explanation.** Magic that you can point at a row and explain. Precision, recall, coverage — introduced experientially, not lectured. A student who reads the scoreboard can defend the winner; a student who skips it is trusting the machine instead of measuring it.
- **Meta-eval teaches evaluating evaluators.** The real move of the module isn't "build a detector" — it's "build the thing that judges detectors." Once you've run a bake-off once, you've seen what evaluating evaluators looks like, and the idea transfers to every future quality question.
- **A judge is narrow on purpose.** The winning judge file says what it catches and names its known limit. Narrow tools that work beat broad tools that pretend. A judge that tries to do everything does nothing well.
- **Grounded is the discipline; the bake-off is how you build the check.** There IS truth out there. Sources carry shards of it. A judge that's been measured against a gold standard is the machine that keeps the output connected to the ground when you're not in the room.
- **What the judge can't reach.** The bake-off's gold standard was five claims you wrote in two minutes. A production judge wants hundreds, running on every build, learning from its own corrections. Same method, bigger scale. Next module.

## Debrief

Five minutes. Claude reviews the bake-off and sharpens the judge file you just saved. The evidence is what the scoreboard produced: four detector outputs, the meta-eval's reasoning, the gold standard you wrote, the winning judge. Claude reviews, rewrites `judges/groundedness-judge.md` in place, reports what changed. You push back on anything that's off.

**Prompt** *(copy → Claude Code)*

```
Review this session and sharpen the winning judge. Read judges/groundedness-judge.md, then scan module-5/detectors/ (all four), module-5/gold-standard.md, and the meta-eval's scoreboard. Look back over the session: where did the winning detector catch something the others missed, where was the meta-eval charitable to a generic claim, which claim-shape did no detector flag, where did a citation get cargo-culted (present but not load-bearing), what specific failure class slipped past everyone?

Then rewrite judges/groundedness-judge.md. Integrate, don't append. Tighten the scope statement so the judge knows what it's for, add the specific claim-shape or source-type the bake-off revealed it doesn't handle, sharpen the "Known limit:" line so it names a real failure class, not a platitude. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why — grounded in specific rows from the scoreboard. Name the one claim-shape this judge will still miss.
```

*(end of prompt)*

Read Claude's summary. Push back where it's wrong — *"that's not why detector 3 lost, it was the citation-integrity rule"* / *"the known limit you wrote is too soft — say it."* The artifact: the sharpened `judges/groundedness-judge.md`, plus one line added to `module-5/still-uncertain.md` naming what the judge won't catch. Module 6 picks the judge up tomorrow; it's the seed of the student's first production eval.

## Bridge
You ran the bake-off once. Five claims, four detectors, one judge. Now imagine the gold standard has three hundred claims, the judge runs on every build, and its own corrections feed back into the next round. That's evals.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Evaluate (method selection) → Synthesize (winning judge saved as reusable file)
- **Materials (trainer):** the student's Module 3 synthesized answer and retrievals — no pre-built failing agent. The briefing that comes out of Module 3's synthesis IS the test corpus.
- **Plug points:** briefing target, four detector methods, gold standard size

**Plug Points (trainer):**

> PLUG POINT: The briefing target.
> Default: the Module 3 synthesized briefing the student already produced. Any over-reaching output the student cares about also works (a board paper, a Monday memo, a customer-facing proposal).

> PLUG POINT: The four detector methods.
> Default: source triangulation, entailment judge, citation integrity, conventional-wisdom flag. Calibrated to produce a tight race on a Module 3 shaped briefing. Domain-specific cohorts may add a fifth (regulatory-claim flag for compliance, pricing-claim flag for commercial). Ensemble capped at two methods stacked.

> PLUG POINT: The gold standard size.
> Default: five claims. Raise to seven for cohorts whose briefings run long; never below five (precision/recall get noisy).

**Reshape (2026-04-19):** M5 shifted from "student manually classifies claims" to **hallucination bake-off** — one of the three designated magic beats in M3–M8. The student operates as panel-setup + scoreboard-watcher + winner-saver, not as the classifier. Meta-eval picks the winner; student watches. Previous exercise (`ground-your-output.md`) superseded; the grounded/ungrounded/misrepresents/overreaches/ungrounded-shape vocabulary is no longer required material.

**Superseded exercise:** `ground-your-output.md` kept alive as supplementary reading for cohorts that want the five-category taxonomy. Delete at the next sweep if unused by delivery date. The bake-off teaches grounded-ness as a discipline empirically without needing the five-category frame up front.

**Frameworks riffed on:**
- **Bake-off / method tournament** — Antti-run pattern. Empirical method selection over authority.
- **Precision / recall / coverage** — standard eval vocabulary introduced by being measured, not lectured.
- **Gold standard** — the word is earned by the student writing one in two minutes.
- **Compound reliability math** (85% × 10 steps ≈ 20% end-to-end) — carried in the lecture, makes the "why measure, not guess" case.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the judge's "Known limit:" line and the Close's `still-uncertain.md` line. Both student-written.
- Belief #14 — practice beats proof — continues from M4.

**Mood contract — mechanical rescue, not triumph:**
- M5's rescue is the scoreboard moment — *"ahh, this is actually fixable."* Watching four detectors fight and the meta-evaluator name a winner with measured reasoning.
- Do NOT resolve M3's strategic uncertainty or M4's security residual. Only groundedness-for-this-shape-of-output gets rescued.
- Close must land with "what the judge won't catch" (the still-uncertain line). A student leaving with "quality is solved" is the failure state.
- Hand-off to M6 is hunger, not closure — five-claim gold standard by hand, hundreds on every build is the seam.

**Understandable magic bar:** after the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same briefing, a meta-evaluator scored them against a five-claim gold standard I wrote myself, detector X won because Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere.

**Delineation with M6:**
- **M5 = the bake-off.** One judge, five-claim gold standard, hand-run. One exercise, one artifact (`judges/groundedness-judge.md`).
- **M6 = the judge as infrastructure.** Scaled gold standard, scheduled runs, corrections feed back, the steering counterpart (encoding preference for a product/brand attribute).
- Don't cross-teach. M5's bake-off earns M6's automation.

**Lecture implications (owed):**
- `grounded.md` lecture body must set up the bake-off — "there IS truth out there; your agent is a statistical generator with no model of it; *which detection method works for your output is an empirical question*." Introduce grounded-ness as the discipline, then pivot to the bake-off as the way to build the check. Compound reliability math stays.
- The three detection techniques the old lecture previewed (claim-by-claim, citation integrity, source triangulation) become three of the four bake-off candidates — lecture names them, exercise measures them.

**Capability checks owed (before first delivery):**
- Four subagents spawned in parallel, each reading briefing + sources and writing to `module-5/detectors/<name>.md`. Three-subagent version is confirmed working in M3; four should behave identically. Dry-run to confirm.
- Meta-evaluator reading four detector files + gold standard and producing a stable scoreboard table with precision/recall. If numbers swing wildly run-to-run, tighten the computation spec in the prompt.
- `judges/groundedness-judge.md` handoff to Module 6's first exercise — confirm M6 expects this path verbatim. Align in the same edit if not.

**Why one exercise, not two:** the bake-off is a single bounded activity with a four-phase internal arc (target + gold standard → detectors → meta-eval → judge). Adding a second exercise here would steal M6's Steering-eval beat. M5 stays focused on the bake-off pattern; evals are M6's instrument.

**TODO:** Pass 3 polish on the bake-off exercise (facilitator notes pass). `grounded.md` lecture reshape to lead into the bake-off. Capability dry-run on four-subagent spawn + meta-eval stability.
