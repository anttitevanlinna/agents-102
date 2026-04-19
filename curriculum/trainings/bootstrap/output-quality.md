# Output Quality and Hallucination Control

## Big Idea
There is truth out there. Your agent's job is to stay connected to it. When it can't reach the ground, it fills the gap — confidently, plausibly, wrong. Grounding is the discipline that makes the gap visible.

## Meta
- **Primary Bloom's level:** Evaluate
- **Prework:** [Before Module 5](exercises/module-5-prework.md) — two public-record cases with documented organisational root causes: Mata v. Avianca (S.D.N.Y. 2023) and Deloitte Australia / DEWR welfare-compliance report (2025). Student arrives with one sentence per case: "the missing organisational check was X."
- **Homework:** Chip Huyen *AI Engineering* (O'Reilly 2025) — selected sections (candidate); the student's own "still-uncertain.md" carried into Module 6 prework
- **Materials (trainer):** a prompt pattern that reliably produces ungrounded output from the participant's own Module 3 synthesis (the five over-reach items in Phase 1). Optional blend with internet search material when the source alone is too sparse. No separate pre-built failing agent — the prompt IS the controlled example.
- **Plug points:** the participant's own Module 3 synthesized answer (`module-3/stances/*.md` and the combined output) is the material — no extra data needed

## What You'll Learn
After this module, you will be able to:
- **Explain** grounded vs. ungrounded output as the core discipline — why confidence and correctness are unrelated, and why fabrication is the failure mode of ungroundedness
- **Identify** five shapes of ungrounded content in your own agent's output (ungrounded, misrepresents, overreaches, ungrounded-shape, plus grounded as the positive case) using domain expertise
- **Adjust** generation rules to force output back to the ground (cite-the-ground, name-the-gap, represent-don't-extend) and observe the tradeoff — grounded rules kill good output too
- **Evaluate** the quality loop as a continuous discipline — spot, name, tighten, regenerate, judge; and recognise what grounding can't reach

## Connections
In Module 3 you felt it — the synthesized answer sat at an uneasy distance between "stake my reputation on it" and "something's not quite there." That unease had a shape. Today we name the shape, classify it, and tighten the rules until the shape gets smaller. Then we notice the second thing: grounded rules cost you too.

## Lectures

[Lecture: Grounded — and three ways to check](lectures/grounded.md)

## Exercises

[Exercise: Ground your output](exercises/ground-your-output.md)

## Key Concepts (Emergent)
- **Grounded vs. ungrounded.** There IS truth out there; your sources carry shards of it; the agent's job is to connect to the ground, not approximate it. "Grounded" is a business-audience-friendly frame that carries into every agent output the student will ever read.
- **Five shapes of ungroundedness.** GROUNDED / UNGROUNDED / MISREPRESENTS / OVERREACHES / UNGROUNDED-SHAPE. Working vocabulary for the rest of the training and the student's practice.
- **The quality loop** — generate → spot ungrounded → add grounding rules → regenerate → judge the tradeoff. Continuous practice, not a one-time fix.
- **Grounded rules aren't free.** Tighter rules cost good output. The right setting depends on the stakes.
- **Demo-to-production gap.** Works once ≠ works reliably. Non-deterministic failure means you can't just "fix the bug."
- **What grounding can't reach.** Sources can be wrong. Framing can tilt. Inclusion/exclusion shapes the conclusion. Strategic judgment sits outside what any rule can enforce. M6 automates the mechanical loop; the rest is yours.

## Plug Points

> PLUG POINT: The over-reach list in Phase 1.
> Default: market-sizing, competitor internal strategy, verbatim quotes, analyst opinions, a timed measurable outcome. Each produces a different shape of fabrication. Adjust if a cohort's sources genuinely contain one of these (rare).

> PLUG POINT: The three grounding rules in Phase 3.
> Default: cite-the-ground, name-the-gap, represent-don't-extend. Students can add domain-specific rules in their own voice — a Nordic compliance team might add "no regulatory predictions"; a commercial team might add "no competitor pricing claims." The default three are the spine.

> PLUG POINT: The briefing format.
> Default: one-page executive briefing. Swap for a memo, slack post, board paper, customer-facing proposal by audience.

## Debrief
Five-minute retro with Claude. Three questions, tuned to the module's rescue-but-not-triumph mood:
1. The v1-to-v2 comparison — which specific line in v2 felt like a real improvement, and which felt like a loss you wish you hadn't taken? Name both in one sentence each.
2. Your `still-uncertain.md` line — what specifically about the briefing can't the grounding rules reach? Is it the sources, the framing, the choice of what to include, or the strategic call itself?
3. If you ran this loop weekly on your real work, what would change about how you write and how you read? Not for your agent — for you.

The artifact: `module-5/still-uncertain.md` — the student's one-line honest statement of what grounding doesn't reach in their own output. M6 prework picks it up; it's the seed for their first real eval criterion.

## Bridge
You can spot ungrounded output by eye. But you won't always be there. What if you could automate what you just did — turn your judgment into rules a machine can run? That's evals.

<!-- maintainer -->

**TODO:** Pass 3 polish and eval/simulation run on the Ground your output exercise. Lecture file `why-llms-fabricate.md` not yet written — needs to be drafted with GROUNDED as the lead frame (not fabrication). Compound reliability math stays central.

**Concept reframe (2026-04-19):** M5's center shifted from "fabrication" to "grounded." Business-audience friendly, stronger epistemic frame ("truth is out there — is your output connected to it?"), transfers to every agent output the student will read. Fabrication is the failure mode of ungroundedness; grounded is the discipline. Lecture body must lead with the positive frame.

**Frameworks riffed on:**
- **Grounded-ness as epistemic stance** — borrowed from journalism (sourcing), research (citations), legal drafting (evidence-tied claims). Recognisable from the student's domain; the LLM application is what's new.
- **Compound reliability math** (85% per step × 10 steps ≈ 20% end-to-end) — lecture-central. Makes the demo-to-production gap concrete.
- **Domain-expert-as-verifier** — inverts the usual agent-as-expert framing. The student's expertise is the scarce input; the agent's output is cheap.
- **"Tighter rules kill good output too"** — engineering discipline of noticing tradeoffs.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in Phase 3's "Not in source material" rule and in the Close's `still-uncertain.md` line.
- Belief #14 — practice beats proof — continues from M4.

**Mood contract — rescue, not triumph:**
- M5 rescues the grounding problem specifically. It does NOT resolve M3's strategic uncertainty or M4's security residual — those stay present.
- Close must land with "grounding doesn't catch everything" (the still-uncertain line). A student leaving with "this is solved" is the failure state.
- Hand-off to M6 must feel like hunger ("you ran this once, by hand — imagine doing it at every build"), not closure ("this is done").

**Delineation with M6:**
- **M5 = the human loop.** Eye + rules + regenerate. Student runs it by hand. One exercise.
- **M6 = the mechanical loop.** Two exercises: Convergence eval automates M5's grounding check; Steering eval encodes preference (product/brand attribute). "Encode what matters to YOU as an eval" is M6 Steering territory, not M5.
- Don't cross-teach. M5's manual loop earns M6's automation.

**Why one exercise, not two:** initial sketch had a second exercise encoding a product attribute via micro-eval; pulled back — that's M6's Steering eval. M5 stays focused on grounded as the discipline; evals are M6's instrument.
