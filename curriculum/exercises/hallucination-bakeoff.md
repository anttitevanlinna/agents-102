# Exercise: Hallucination benchmark

**Time:** 55 minutes. Phase 1 ~8, Phase 2 ~8, Phase 3 ~20, Phase 4 ~10, Phase 5 close ~9.

**Session** *(new, "Module 5 - Hallucination benchmark")*

**What you do:**

You set up a benchmark: a 30-claim pool, four detection methods, and a scorer that checks each claim against the evidence. Run all four on your own output and keep the one that scores best, or the ensemble if it does. The winner becomes a judge file.

## Phase 1: The target and the benchmark

*8 min*

The target is the Module 3 briefing, copied as it stands. A separate worker chooses a bounded evidence roster from the question alone, since the roster fixes the evidence the judgment may stand on.

{{prompt:hallucination-bakeoff-1}}

## Extract the claim pool

The agent extracts a varied pool of 30 claims from the briefing. Thirty is enough to start seeing the pattern.

{{prompt:hallucination-bakeoff-2}}

## Phase 2: Run the four detectors

*8 min*

Four helper agents run in parallel on the same claim pool, each with its own detection method and output file.

In your main session:

<div class="rt-code">

{{prompt:hallucination-bakeoff-3}}

</div>
<div class="rt-cowork">

{{prompt:hallucination-bakeoff-4}}

</div>

## Phase 3: Scorer runs the benchmark

*20 min*

A fifth agent, the scorer, scores the four detector files against the 30 claims:

- precision: of what the detector flagged, how much was ungrounded?
- recall: of the ungrounded claims, how many did the detector catch?
- coverage: did the detector look at the claim pool?

{{prompt:hallucination-bakeoff-5}}

Ask the agent to explain both using your own rows.

{{prompt:hallucination-bakeoff-6}}

## Read the scoreboard and name the surprise

One detector catches more of the ungrounded claims. Another catches less, with higher precision. A third catches what the others missed, such as a broken citation.

Point at a row: *this is why I'm keeping this one*. Ask the agent to contrast this with the classic way.

{{prompt:hallucination-bakeoff-7}}

Answer the surprise question in one sentence.

## Phase 4: Save the winner as a judge

*10 min*

Keep the winner, or the two-method ensemble. Save it as a judge file: a named, reusable prompt you can run against any briefing.

{{prompt:hallucination-bakeoff-8}}

Open `judges/groundedness-judge.md`. It is narrow on purpose: the "known limit" line names what you measured and decided not to chase.

## Phase 5: Close, name the rescue

*9 min*

In Module 3 you marked one line of the briefing you doubted. The judge now reads the whole briefing, and you see its verdict on that line beside the evidence. You decide whether your doubt was right and whether the judge caught it.

{{prompt:hallucination-bakeoff-9}}

`module-5/baseline-score.md` is the number Module 6 starts from.

## Carry the benchmark pattern forward

**The point:**

You pick a quality check by running candidates on your own output and scoring them against your own reference. The winner becomes a judge you can defend. The pattern (candidates → benchmark → scorer → winner) works for any quality judgment you automate.

This was **Recipe 5**. The [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the moves and components.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**TODO (Cowork edition review 2026-04-29):**
- Phase 1 prompt still says "Spawn one subagent" / "Instructions for the subagent" / "When the subagent finishes" in the Cowork edition. Later detector prompt is already runtime-forked correctly. Prompt-block change is gated: propose before/after before editing.

**Pattern: benchmarking.** One of the three designated magic beats in M3–M8 (alongside M3 multi-retriever + multi-stance and M8 agents-building-agents). The student operates as the scorer setup-and-observer, not as the classifier. Claude audits Claude; the student reads the scoreboard and saves the winner.

**Mood contract — mechanical rescue.** The student leaves M3/M4 uneasy. M5's rescue is watching the benchmark name the winner measurably — *"ahh, this is actually fixable."* Key: do NOT resolve M3's strategic uncertainty or M4's security residual. Only the groundedness sub-problem gets rescued, and only for the shape of output the benchmark tested. The body line about 30 claims vs production's hundreds and the judge's "Known limit:" line keep the broader uncertainty alive.

**Understandable magic bar.** After the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same claim pool, a scorer adjudicated 30 claims, detector X won because it caught Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere. If any phase leaves the student unable to describe what just happened, the phase is broken.

**Walk-away calibration.** M5 is "bounded benchmark run" on the ramp — NOT walk-away. The student sets up the benchmark, starts the run, watches it execute (~20 min across Phases 1 and 2 combined). They don't leave the chair; they also don't classify by hand. Watching the scoreboard fill is the visceral moment.

**Benchmark = 30 claims, deliberately.** Not statistical. Enough to start seeing the pattern without creating much processing work. The scale-up ("production judges want hundreds") is M6's problem, named out loud here so the student sees the seam.

**Frameworks riffed on:**
- **Benchmarking** — from ML community work; Antti-run pattern. Empirical method selection beats authority ("this method is best").
- **Precision / recall / coverage** — standard eval vocabulary introduced experientially, not lectured.
- **Benchmark** — the word is earned in Phase 1; the claim pool becomes the reference set the scorer adjudicates.
- **Self-consistency** — Wang et al. 2022, "Self-Consistency Improves Chain of Thought Reasoning" (arXiv:2203.11171). In this module it is a lecture/demo after the benchmark, not a detector in the scoring panel. It asks a different question: what stays stable when the briefing is regenerated from the same evidence?

**Philosophy callout (sparing):**
- Belief #21 — name what you don't know — lands in the judge's "Known limit:" line. Student-written.
- Belief #14 — practice beats external proof — continues from M4. Named in maintainer-space, experienced in body.

**Plug points:**
- The briefing target — Module 3 briefing by default; any over-reaching output the student already cares about also works.
- The four detector methods — these four are calibrated to produce a tight race on a Module 3 shaped briefing. Domain-specific cohorts may swap one in (regulatory-claim flag for compliance teams, pricing-claim flag for commercial teams); keep the ensemble cap at two methods stacked.
- The benchmark size — 30 by default. Lower only if the briefing is genuinely short; raise only if the cohort has time and the claim pool stays readable.

**Watch-fors:**
- **Reading the briefing before claim extraction.** Biases the main session. Coach: *"Don't open it. Let the extractor turn it into claims first."*
- **Claim pool bloats past 30.** Student over-delivers. Coach: *"Thirty is enough to see the pattern. More is processing, not learning."*
- **Scorer hedges.** It picks "all four are useful" rather than naming a winner. Coach: *"Re-run and force a pick — the ensemble is a two-method stack, not a four-method hug."*
- **The scoreboard looks clean and the student doesn't read it.** The scoreboard IS the explanation. If the student skips to Phase 4, the mood beat is stolen. Phase 3's "which row surprised you?" gate forces the read; if the student's one-sentence answer is generic ("the scoreboard was interesting"), push back: *"name the row, name the number, name why."*
- **The judge file sprawls.** Student lets Claude write a 60-line judge. Coach: *"Under 20 lines. A judge that tries to do everything does nothing well."*
- **Self-consistency demo treated as the judge.** The demo can show drift, but it does not decide the winning groundedness judge. Coach: *"Self-consistency is a warning light, not the yardstick."*

**Push-back moves (host varies — trainer by default; Teacher Claude in self-study):**
- *Phase 1 — student opens the briefing before writing the benchmark.* "Close the file. Your gut verdicts are the measuring stick. Reading the briefing first contaminates them."
- *Phase 1 — claim pool bloats past 30.* "Thirty. Enough to see the pattern, not so many that the run becomes processing work."
- *Phase 2 — student wants to read each detector file as it lands.* "Don't. The scorer reads them. You'll see everything in the scoreboard — that's where the contrast lives."
- *Lecture/demo — student treats self-consistency as proof.* "It isn't proof. Drift is a warning signal. Stability is not truth."
- *Phase 3 — scorer hedges, picks 'all four are useful.'* "Re-run and force a pick. The ensemble cap is two methods, not a four-method hug."
- *Phase 3 — student skims past the scoreboard to Phase 4.* "Stay on the scoreboard. Name the row that surprised you. The scoreboard IS the rescue beat — skipping it steals the mood."
- *Phase 4 — judge file sprawls past 20 lines.* "Cut it back. A judge that tries to do everything does nothing well. Narrow on purpose; the Known limit line names what it doesn't reach."
- *Judge "Known limit:" line is generic ('quality is hard').* "Name a specific claim-shape this judge won't catch. 'Hard' isn't a failure mode."

**Decision points (trainer reads these in prep, not during):**
- *Briefing target.* Default is the Module 3 synthesized briefing. If the student's Module 3 briefing came back unusually clean (rare but happens with cohorts that ran Module 3 conservatively), pivot to any over-reaching output the student already cares about — a board paper, a Monday memo, a customer-facing proposal. The exercise needs an output that plausibly overreaches; a too-grounded briefing collapses the contrast.
- *Detector swap.* Domain-specific cohorts can swap one of the four for a regulatory-claim flag (compliance teams) or a pricing-claim flag (commercial teams). Keep the panel at four and the ensemble cap at two methods stacked.
- *Benchmark size.* Thirty claims by default. Lower only if the briefing is genuinely short; raise only if the cohort has time and the claim pool stays readable.
- *Self-consistency demo.* The trainer can run it live after the judge is saved. Treat it as a contrast lecture, not as part of the benchmark score.

**Mood check (before shipping):**
- M5's mood is mechanical rescue — *"ahh, this is actually fixable."* The Close must land there. The scoreboard moment is the rescue beat — a student who scrolls past it steals their own mood.
- Security residual (M4) and strategic uncertainty (M3) should still be present at the end of M5. The Close's "what the judge won't catch" line names the scope of the rescue.
- Hand-off to M6 is hunger, not closure — *"30 claims here; imagine hundreds running on every build"* is the seam.

**Delineation with M6:**
- M5 ships a hand-run benchmark producing one judge file against a 30-claim reference set.
- M6 picks the judge up and turns it into infrastructure — scaled benchmark, scheduled runs, corrections feeding back, the steering counterpart (encoding preference, not groundedness).
- Don't cross-teach. M5's benchmark earns M6's automation.

**View summary:** You run four fabrication detectors against a thirty-claim pool drawn from your own output, with a scorer adjudicating each claim, and read the scoreboard. The artifact is a judge file you can defend because it won a benchmark, not because you read about it.
