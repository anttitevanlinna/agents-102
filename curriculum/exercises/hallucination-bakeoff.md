# Exercise: Hallucination benchmark

**Session** *(new, "Module 5 - Hallucination benchmark")*

<span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

```
/rename m5-hallucination-benchmark
```

**What you do:**

Four detectors, same briefing, one scoreboard. You don't hunt for ungrounded claims by hand. You set up a benchmark: a 30-claim pool, four different detection methods, and a scorer that adjudicates the claims against the evidence. The winner (or the ensemble) becomes a judge file you carry into Module 6.

The move is empirical. You don't pick a detection method because somebody said so. You run the candidates, measure, and keep the one that caught what mattered on *your* output.

Four phases. 45–60 minutes. The work is mostly done by the claim extractor, the four detectors, and the scorer. Your job is to set the benchmark up, start the run, and watch the scoreboard fill in.

**Phase 0: The target and the benchmark.**

Your target is the ungrounded briefing from Module 3. You'll reuse the Module 3 synthesized answer as the test corpus: your sources, your retrievals, your stances, your real question. The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test.

First, produce a fresh briefing so every detector sees the same output. The target is roughly 10% fabrication or misrepresentation. Claude cannot actually dial that number in, of course. The 10% is a slight joke: enough wrongness for the detectors to have a job, not so much that the briefing becomes nonsense.

Ask Claude to choose a bounded evidence roster, generate the overreaching briefing in a separate worker, and save both without previewing the briefing.

Why the evidence roster first? Because `memory/` is the curated layer. `sources/` is raw material behind it. The roster keeps this run bounded and teaches the quiet discipline underneath quality work: before you judge an output, decide what evidence surface the judgment is allowed to stand on.

**Prompt** *(Claude Code)*

```
Spawn one subagent to create the benchmark target.

The briefing is the test corpus. Aim for roughly 10% fabrication or misrepresentation so the detectors have something to catch. You cannot make that number precise. Treat it as a direction, not a target metric.

Instructions for the subagent:
- Use the strategic question in `./crux.md` under `## Question`.
- Use the material in `module-3/stances/`.
- Choose a bounded evidence roster before writing the briefing. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the challenge clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Use only the rostered evidence files as the evidence surface for the briefing.
- Produce a one-page briefing on the challenge.
- Include three specific named entities relevant to the challenge (companies, teams, systems, customers, products, policies, or people).
- Include at least two verbatim quotes from rostered evidence files.
- Include at least one number or measurable claim.
- Include two claims that use outside/common knowledge beyond the files.
- Include a next action with a measurable outcome.
- Where the sources do not cover something, blend in general knowledge. Do not hedge.
- Do not browse the web.
- Save the briefing to `module-5/briefing.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
```

Why the separate worker? So this session is not tainted by knowing what was fabricated. The main session stays blind for the benchmark setup.

<div class="rt-cowork">

Heads up for Cowork: every file the agent reads shows up in your UI as if your main session did it. That can look like the main session doing the work. It isn't. The dispatched agents are doing the heavy lifting; the main session is just orchestrating and watching the reads stream by.

</div>


Save it. **Don't open it yet.** The claim pool is the measuring surface. Keep the main session blind until the extractor has turned the briefing into claims.

Now extract the claims. Claude scans the briefing and pulls out a varied claim pool for the detectors. Thirty claims is not statistical. It is enough to start seeing the pattern without creating much processing work.

**Prompt** *(Claude Code)*

```
Open `module-5/briefing.md`. Extract exactly 30 varied claims from the briefing.

Use short verbatim excerpts from the briefing wherever possible, so later detector findings can be matched back to the briefing. Include a mix of claim shapes:
- numbers or measurable outcomes
- named-entity claims
- quotes or paraphrases attributed to sources
- causal claims
- comparison claims
- recommendation or next-action claims
- claims that seem obviously grounded
- claims that smell like overreach

Do not judge whether the claims are grounded yet. Do not ask me questions. Save the claim pool to `module-5/claim-pool.md`.
```


The claim pool is input material. You have not judged anything yet.

**Phase 1: Run the four detectors.**

Four detectors, four different methods, run in parallel on the same claim pool. Each is a <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> with a specific lens. Each writes to its own file. You don't read them yet. The scorer does that work in Phase 2.

In your main session:

<div class="rt-code">

**Prompt** *(Claude Code)*

```
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is a subagent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is an agent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
```

</div>


Watch the four <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> lines scroll past. Same claim pool, four lenses. Four files in a minute or two. Now the scorer runs.

**Phase 2: Scorer runs the benchmark.**

A fifth agent (the scorer) reads the claim pool and all four detector files, adjudicates the 30 claims against the evidence, and produces a scoreboard. You don't compare them by hand. The scorer measures precision (of what the detector flagged, how much was actually ungrounded?), recall (of what the scorer adjudicated as ungrounded, how much did the detector catch?), and coverage (did the detector look at the claim pool?).

**Prompt** *(Claude Code)*

```
You are the scorer for a four-way detector benchmark. Your inputs:

- Claim pool: `module-5/claim-pool.md`
- Briefing: `module-5/briefing.md`
- Evidence roster: `module-5/evidence-roster.md` and the rostered evidence files named there
- Detector output 1: `module-5/detectors/source-triangulation.md`
- Detector output 2: `module-5/detectors/entailment.md`
- Detector output 3: `module-5/detectors/citation-integrity.md`
- Detector output 4: `module-5/detectors/counter-evidence.md`

Your job: adjudicate the 30 claims, score each detector against that adjudication, produce a scoreboard, name a winner.

First, create the reference adjudication. For every claim in `module-5/claim-pool.md`, label it GROUNDED, UNGROUNDED, or PARTLY GROUNDED. Quote the evidence line or file that supports the label. If you cannot find support in the rostered evidence, say so plainly. Save this reference set to `module-5/adjudicated-claims.md`.

For each detector:
1. Match detector findings to claim-pool claims by strict substring match. If you can't find the exact claim-pool phrase in the detector's output, count as MISS. Do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each claim, check whether the detector flagged it. If the adjudication says UNGROUNDED or PARTLY GROUNDED, the detector should have flagged it. Count that as a hit. If the adjudication says GROUNDED, the detector should not have flagged it. Count that as a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total claims adjudicated UNGROUNDED or PARTLY GROUNDED). Coverage = how many of the 30 claim-pool claims the detector looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.

Show me the full scoreboard table in chat after saving the file.
```


Watch the scoreboard land. You can now see which method actually worked on your output. Not intuition. Measurement.

The columns are labelled `Precision` and `Recall`. They're standard eval vocabulary, and now you have a concrete example in front of you. Ask Claude to explain them using your own rows.

**Prompt** *(Claude Code)*

```
Tell me about precision and recall.

Use the scoreboard at `module-5/scoreboard.md` for the examples — point at specific rows from my run. End with one line on which one matters more for catching fabrication, and why.
```


Four detectors read the same claim pool. One method caught more of what the scorer adjudicated as ungrounded. Another caught less but with higher precision. A third caught something the others missed. Maybe the citation-integrity detector caught a broken citation that source-triangulation couldn't, or the counter-evidence search surfaced a claim that looked fine to everyone else until the disconfirming source turned up. The scoreboard IS the explanation. You can point at a row and say *this is why I'm keeping this one*.

Before Phase 3, ask Claude to contrast what you just did with the classic way. Then one sentence on what surprised you in the scoreboard.

**Prompt** *(Claude Code)*

```
Two things, in the chat.

First, three lines on the classic way:
1. What the classic way to quality-check this briefing would have been.
2. Whether it would have been faster or slower than this benchmark.
3. Why.

Second, ask me which row of the scoreboard surprised me most — the detector that did better or worse than I'd have guessed, or the claim that turned out to be harder to flag than it looked. Wait for my one-sentence answer before we move to saving the judge.
```


Answer the surprise question in one sentence. The scoreboard is the mechanism; naming the surprise is how you own the mechanism rather than just consuming it.

**Phase 3: Save the winner as a judge.**

The winner (or the two-method ensemble) is worth keeping. You'll save it as a judge file: a named, reusable prompt you can run against any future briefing, not just this one. Module 6 picks this file up and turns it into infrastructure.

**Prompt** *(Claude Code)*

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant evidence files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
```


Open `judges/groundedness-judge.md`. Read it. This is your first real judge. Named after what it does. Narrow on purpose. The "known limit" line matters. It names the thing you measured and decided not to chase. Plain about what it is and what it isn't.

**Close: name the rescue.**

Four methods ran on the same input. A scorer adjudicated 30 claims, measured the detectors against that reference set, and promoted the winner to a reusable judge file. No intuition. No "I heard this method is good." Measurement.

One thing the benchmark can't reach: yours was 30 claims. A real production judge wants hundreds. The method is the same; the scale is the difference. That's next module.

**What happened:**

You produced a fresh briefing, extracted a 30-claim pool, spawned four detectors in parallel on the same claims, let a scorer adjudicate the claims and measure the detectors, read a scoreboard that named the winner with measured reasoning, and saved the winner as a named judge file. Twenty minutes of that was watching agents work while you thought about what you were measuring. The file `judges/groundedness-judge.md` is the artifact Module 6 picks up.

**The point:**

Method selection in agent quality work is empirical, not intuitive. You don't trust a detector because you read about it. You trust it because you ran a benchmark on your own output with your own reference and it won. The scoreboard is the explanation. The winner becomes a judge you can defend. The pattern (candidates → benchmark → scorer → winner) is portable to every quality judgment you'll ever automate.

**Time:** 45–60 minutes. Phase 0 ~12, Phase 1 ~8 (set up + watch four detectors), Phase 2 ~20 (watch scoreboard + read it), Phase 3 ~10, Close ~5.

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
