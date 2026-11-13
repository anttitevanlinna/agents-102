# Catching Hallucinations

## Big Idea
There is truth out there, and your agent's job is to stay connected to it. Where it cannot reach a source, it fills the gap: confident, plausible, wrong. Grounding, and checks you test on your own output, make the gap visible.

## Prework

Read [The Missing Check](lectures/module-5-prework.md): two public-record cases with documented organisational root causes.

Write one sentence per case: "the missing organisational check was X."

## What You'll Learn
After this module, you will be able to:
- **Test** four detection methods on a 30-claim benchmark and pick the winner
- **Build** a reusable judge file that names what it catches and where it stops
- **Identify** what grounding reaches and what it does not: wrong sources, tilted framing, strategic judgment

## Start here

**Session** *(new, "Module 5 - Catching hallucinations")*

Working folder: `~/Documents/agents-101/`.

**The question, to you:** which line in your Module 3 briefing reads almost right? Point at it.

[Lecture: Grounded, and four candidates to measure](lectures/grounded.md)

[Exercise: Hallucination benchmark](exercises/hallucination-bakeoff.md)

## Debrief

Five minutes. The agent reviews the benchmark and adds rules to the root instructions file so future sessions check groundedness before trusting output. Evidence: the roster, claim pool, adjudicated claims, detector outputs and your saved judge.

{{prompt:a101-m5-debrief-groundedness-rules}}

## Notice what the prompt insists on

The prompt names the boundary: touch only the Groundedness checks section, keep every other section verbatim. Without it, a small edit becomes a rewrite and earlier rules drift.

The prompt also makes the agent re-read the section and confirm each rule is there. The agent's report says what it intended, the file says what happened.

## Push back on the summary

Correct the agent where a rule is vague: *"name the evidence roster"*, *"say when to stop and ask for sources."*

> Start with the costly, repeatable misses: numbers in external notes, customer names in account summaries, policy claims in internal advice, citations in briefings. Put the trigger in the root instructions file.

## Propose, double-check, apply

An agent action starts as text: a mail, a ticket update, a CRM change. Wrong text becomes a wrong action.

For actions that matter, the agent proposes, you check the proposal against the judge or the source, then the agent applies it.

## Which rung has this action earned?

Read [What is an Agent, The autonomy ladder](trainings/agents-101/supplementary/what-is-an-agent.md#the-autonomy-ladder-what-may-the-agent-do) before you decide what the agent may do next.

In a human-in-the-loop check, the expert reviews the proposed action, its evidence, and the known limit of the judge that passed it.

## Key Concepts
- Grounded means traceable to a specific file, number or quote. Stay connected to the source.
- Asking the agent "are you sure?" returns another fluent answer. A check has to touch the source.
- Run candidate detectors on your own output and read the scoreboard.
- The winning judge names its own limit. Wrong sources, framing and strategic choices stay outside it.
- Reusable pattern: candidates, benchmark, scorer, winner.

## Pre-reads before Module 6

Ethan Mollick, "Garbage Can and Bitter Lesson."

End this session once the judge is saved. Module 6 starts fresh in `~/Documents/agents-101/`.

## Next
You can spot ungrounded output with a judge. Next, the judge runs without you at the keyboard: it stays fixed while the generation improves under its feedback.
<!-- maintainer -->

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Quality:** compendium-audited 2026-08-25 (writing@19381896 story@19381896 technical@725101ec behavior@725101ec pedagogy@19381896 strategy@19381896 slides@19381896)
- judges @19381896: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `grounded.md`.


**Mood target:** Mechanical rescue — the student can see which measured method worked without pretending quality is solved.

**Push-back moves / Watch-fors / Decision points:** [M5 run sheet](trainer-modules.md#m5-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** connections 5 @start "Connections" · debrief 5 @end "Debrief" · agent actions 3 @end "Propose, double-check, apply" · bridge 3 @end "Bridge"
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

**Story blend, M5 (2026-09-23).** Three changes per `module-design/a101-story-proposals/blend.md` § Titles, M5. § Start here states the text-is-where-action-starts idea as one backward clause; the paragraph itself lives at the M3 opener, which is where the student first meets it (blend § Keep and cut, item 1). The module links two pieces, the lecture and the exercise; self-consistency lives in the `## A drift signal, never proof` slide inside `lectures/grounded.md`. § Agent Actions runs as two slides, `## Propose, double-check, apply` and `## Which rung has this action earned?`, the student's verb first because the section is about doing (`check_student_facing.md` §17).

**Canonical shape:** M5 is the **hallucination benchmark** — the core arc's measured-quality beat. The student operates as benchmark-setup + scoreboard-watcher + winner-saver, not as the classifier. Scorer picks the winner; student watches. The grounded/ungrounded/misrepresents/overreaches/ungrounded-shape vocabulary is not required material.

**Frameworks riffed on:**
- **Benchmarking** — Antti-run pattern. Empirical method selection over authority.
- **Precision / recall / coverage** — standard eval vocabulary introduced by being measured, not lectured.
- **Benchmark** — the word is earned by the student writing one in two minutes.
- **Illustrative compound reliability math** (if each step is 85% reliable, ten steps compound to about 20% end-to-end) — carried in the lecture, makes the "why measure, not guess" case.

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

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 5 benchmark artifacts | `module-5/evidence-roster.md`, `module-5/briefing.md`, `module-5/claim-pool.md`, `module-5/detectors/`, `module-5/adjudicated-claims.md`, `module-5/scoreboard.md` | M5 hallucination benchmark | M5 Debrief; M6 eval-loop setup; M7 sharing diagnosis |
| Groundedness judge | `judges/groundedness-judge.md` | M5 benchmark winner packaging | M6 eval loop as fixed yardstick; M7-M8 quality infrastructure |
| Root groundedness rules | `./CLAUDE.md` groundedness checks | M5 Debrief | M6-M8 fresh sessions before trusted outputs or actions |
