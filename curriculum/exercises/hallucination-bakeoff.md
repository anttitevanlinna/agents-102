# Exercise: Hallucination benchmark

**Session** *(new, "Module 5 - Hallucination benchmark")*

<span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

```
/rename m5-hallucination-benchmark
```

**What you do:**

Four detectors, same briefing, one scoreboard. You don't hunt for ungrounded claims by hand. You set up a benchmark: a 30-claim pool, four different detection methods, and a scorer that adjudicates the claims against the evidence. The winner (or the ensemble) becomes a judge file you carry into Module 6.

The move is empirical. You don't pick a detection method because somebody said so. You run the candidates, measure, and keep the one that caught what mattered on *your* output.

**Time:** 45–60 minutes. Phase 0 ~12, Phase 1 ~8 (set up + watch four detectors), Phase 2 ~20 (watch scoreboard + read it), Phase 3 ~10, Close ~5.

Four phases. The work is mostly done by the claim extractor, the four detectors, and the scorer. Your job is to set the benchmark up, start the run, and watch the scoreboard fill in.

**Phase 0: The target and the benchmark.**

Your target is the ungrounded briefing from Module 3. You'll reuse the Module 3 synthesized answer as the test corpus: your sources, your retrievals, your stances, your real question. The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test.

First, produce a fresh briefing so every detector sees the same output. The target is roughly 10% fabrication or misrepresentation. Claude cannot actually dial that number in, of course. The 10% is a slight joke: enough wrongness for the detectors to have a job, not so much that the briefing becomes nonsense.

Ask Claude to choose a bounded evidence roster, generate the overreaching briefing in a separate worker, and save both without previewing the briefing.

Why the evidence roster first? Because `memory/` is the curated layer. `sources/` is raw material behind it. The roster keeps this run bounded and teaches the quiet discipline underneath quality work: before you judge an output, decide what evidence surface the judgment is allowed to stand on.

{{prompt:hallucination-bakeoff-1}}

Why the separate worker? So this session is not tainted by knowing what was fabricated. The main session stays blind for the benchmark setup.

<div class="rt-cowork">

Heads up for Cowork: every file the agent reads shows up in your UI as if your main session did it. That can look like the main session doing the work. It isn't. The dispatched agents are doing the heavy lifting; the main session is just orchestrating and watching the reads stream by.

</div>


Save it. **Don't open it yet.** The claim pool is the measuring surface. Keep the main session blind until the extractor has turned the briefing into claims.

Now extract the claims. Claude scans the briefing and pulls out a varied claim pool for the detectors. Thirty claims is not statistical. It is enough to start seeing the pattern without creating much processing work.

{{prompt:hallucination-bakeoff-2}}


The claim pool is input material. You have not judged anything yet.

**Phase 1: Run the four detectors.**

Four detectors, four different methods, run in parallel on the same claim pool. Each is a <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> with a specific lens. Each writes to its own file. You don't read them yet. The scorer does that work in Phase 2.

In your main session:

<div class="rt-code">

{{prompt:hallucination-bakeoff-3}}

</div>
<div class="rt-cowork">

{{prompt:hallucination-bakeoff-4}}

</div>


Watch the four <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> lines scroll past. Same claim pool, four lenses. Four files in a minute or two. Now the scorer runs.

**Phase 2: Scorer runs the benchmark.**

A fifth agent (the scorer) reads the claim pool and all four detector files, adjudicates the 30 claims against the evidence, and produces a scoreboard. You don't compare them by hand. The scorer measures precision (of what the detector flagged, how much was actually ungrounded?), recall (of what the scorer adjudicated as ungrounded, how much did the detector catch?), and coverage (did the detector look at the claim pool?).

{{prompt:hallucination-bakeoff-5}}


Watch the scoreboard land. You can now see which method actually worked on your output. Not intuition. Measurement.

The columns are labelled `Precision` and `Recall`. They're standard eval vocabulary, and now you have a concrete example in front of you. Ask Claude to explain them using your own rows.

{{prompt:hallucination-bakeoff-6}}


Four detectors read the same claim pool. One method caught more of what the scorer adjudicated as ungrounded. Another caught less but with higher precision. A third caught something the others missed. Maybe the citation-integrity detector caught a broken citation that source-triangulation couldn't, or the counter-evidence search surfaced a claim that looked fine to everyone else until the disconfirming source turned up. The scoreboard IS the explanation. You can point at a row and say *this is why I'm keeping this one*.

Before Phase 3, ask Claude to contrast what you just did with the classic way. Then one sentence on what surprised you in the scoreboard.

{{prompt:hallucination-bakeoff-7}}


Answer the surprise question in one sentence. The scoreboard is the mechanism; naming the surprise is how you own the mechanism rather than just consuming it.

**Phase 3: Save the winner as a judge.**

The winner (or the two-method ensemble) is worth keeping. You'll save it as a judge file: a named, reusable prompt you can run against any future briefing, not just this one. Module 6 picks this file up and turns it into infrastructure.

{{prompt:hallucination-bakeoff-8}}


Open `judges/groundedness-judge.md`. Read it. This is your first real judge. Named after what it does. Narrow on purpose. The "known limit" line matters. It names the thing you measured and decided not to chase. Plain about what it is and what it isn't.

**Close: name the rescue.**

Four methods ran on the same input. A scorer adjudicated 30 claims, measured the detectors against that reference set, and promoted the winner to a reusable judge file. No intuition. No "I heard this method is good." Measurement.

One thing the benchmark can't reach: yours was 30 claims. A real production judge wants hundreds. The method is the same; the scale is the difference. That's next module.

**What happened:**

You produced a fresh briefing, extracted a 30-claim pool, spawned four detectors in parallel on the same claims, let a scorer adjudicate the claims and measure the detectors, read a scoreboard that named the winner with measured reasoning, and saved the winner as a named judge file. Twenty minutes of that was watching agents work while you thought about what you were measuring. The file `judges/groundedness-judge.md` is the artifact Module 6 picks up.

**The point:**

Method selection in agent quality work is empirical, not intuitive. You don't trust a detector because you read about it. You trust it because you ran a benchmark on your own output with your own reference and it won. The scoreboard is the explanation. The winner becomes a judge you can defend. The pattern (candidates → benchmark → scorer → winner) is portable to every quality judgment you'll ever automate.

You just ran **Recipe 5** end-to-end: a 30-claim benchmark you wrote yourself, four candidate detectors scored against it, a winning method packaged as a reusable judge file. After Agents 101, when the next quality judgment needs an empirical winner instead of an authoritative pick, the [Cookbook for Agent System Design](supplementary/cookbook-for-agent-system-design.md) is where the moves and components live without the training scaffolding.

<!-- maintainer -->

**TODO (Cowork edition review 2026-04-29):**
- Phase 0 prompt still says "Spawn one subagent" / "Instructions for the subagent" / "When the subagent finishes" in the Cowork edition. Later detector prompt is already runtime-forked correctly. Prompt-block change is gated: propose before/after before editing.

**Pattern: benchmarking.** One of the three designated magic beats in M3–M8 (alongside M3 multi-retriever + multi-stance and M8 agents-building-agents). The student operates as the scorer setup-and-observer, not as the classifier. Claude audits Claude; the student reads the scoreboard and saves the winner.

**Mood contract — mechanical rescue.** The student leaves M3/M4 uneasy. M5's rescue is watching the benchmark name the winner measurably — *"ahh, this is actually fixable."* Key: do NOT resolve M3's strategic uncertainty or M4's security residual. Only the groundedness sub-problem gets rescued, and only for the shape of output the benchmark tested. The body line about 30 claims vs production's hundreds and the judge's "Known limit:" line keep the broader uncertainty alive.

**Understandable magic bar.** After the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same claim pool, a scorer adjudicated 30 claims, detector X won because it caught Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere. If any phase leaves the student unable to describe what just happened, the phase is broken.

**Walk-away calibration.** M5 is "bounded benchmark run" on the ramp — NOT walk-away. The student sets up the benchmark, starts the run, watches it execute (~20 min across Phases 1 and 2 combined). They don't leave the chair; they also don't classify by hand. Watching the scoreboard fill is the visceral moment.

**Benchmark = 30 claims, deliberately.** Not statistical. Enough to start seeing the pattern without creating much processing work. The scale-up ("production judges want hundreds") is M6's problem, named out loud here so the student sees the seam.

**Frameworks riffed on:**
- **Benchmarking** — from ML community work; Antti-run pattern. Empirical method selection beats authority ("this method is best").
- **Precision / recall / coverage** — standard eval vocabulary introduced experientially, not lectured.
- **Benchmark** — the word is earned in Phase 0; the claim pool becomes the reference set the scorer adjudicates.
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
- **The scoreboard looks clean and the student doesn't read it.** The scoreboard IS the explanation. If the student skips to Phase 3, the mood beat is stolen. Phase 2's "which row surprised you?" gate forces the read; if the student's one-sentence answer is generic ("the scoreboard was interesting"), push back: *"name the row, name the number, name why."*
- **The judge file sprawls.** Student lets Claude write a 60-line judge. Coach: *"Under 20 lines. A judge that tries to do everything does nothing well."*
- **Self-consistency demo treated as the judge.** The demo can show drift, but it does not decide the winning groundedness judge. Coach: *"Self-consistency is a warning light, not the yardstick."*

**Push-back moves (host varies — trainer by default; Teacher Claude in self-study):**
- *Phase 0 — student opens the briefing before writing the benchmark.* "Close the file. Your gut verdicts are the measuring stick. Reading the briefing first contaminates them."
- *Phase 0 — claim pool bloats past 30.* "Thirty. Enough to see the pattern, not so many that the run becomes processing work."
- *Phase 1 — student wants to read each detector file as it lands.* "Don't. The scorer reads them. You'll see everything in the scoreboard — that's where the contrast lives."
- *Lecture/demo — student treats self-consistency as proof.* "It isn't proof. Drift is a warning signal. Stability is not truth."
- *Phase 2 — scorer hedges, picks 'all four are useful.'* "Re-run and force a pick. The ensemble cap is two methods, not a four-method hug."
- *Phase 2 — student skims past the scoreboard to Phase 3.* "Stay on the scoreboard. Name the row that surprised you. The scoreboard IS the rescue beat — skipping it steals the mood."
- *Phase 3 — judge file sprawls past 20 lines.* "Cut it back. A judge that tries to do everything does nothing well. Narrow on purpose; the Known limit line names what it doesn't reach."
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

**Quality:** compendium-audited 2026-05-04 (writing@92b7e79 story@92b7e79 technical@92b7e79 behavior@92b7e79)
- judges @92b7e79: writing PASS, story PASS, technical PASS, behavior PASS
