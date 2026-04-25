# Exercise: Hallucination benchmark

**What you do:**

Five detectors, same briefing, one scoreboard. You don't hunt for ungrounded claims by hand. You set up a benchmark (five different methods for catching ungroundedness run on the same output) and something scores them against a small five-claim benchmark you wrote yourself. The winner (or the ensemble) becomes a judge file you carry into Module 6.

The move is empirical. You don't pick a detection method because somebody said so. You run the candidates, measure, and keep the one that caught what mattered on *your* output.

Four phases. 55–70 minutes. The work is mostly done by the five detectors and the scorer. Your job is to set the benchmark up, write five claims yourself, start the run, and watch the scoreboard fill in.

**Phase 0: The target and the benchmark.**

Your target is the ungrounded briefing from Module 3. You'll reuse the Module 3 synthesized answer as the test corpus: your sources, your retrievals, your stances, your real question. The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test.

First, produce a fresh briefing so every detector sees the same output. Open your training directory in Claude Code.

**Prompt** *(copy → Claude Code)*

```
This briefing is the test corpus — we WANT it to overreach in places so the detectors have something to catch. Blend general knowledge where sources don't cover; don't hedge.

Produce a one-page executive briefing on the strategic question in module-3/question.md, using the material in module-3/retrievals/ and module-3/stances/. Include three named competitors' 2026 priorities, at least two verbatim quotes from sources/, a market-sizing number, two analyst takes, and a Monday action with a measurable outcome. Blend general knowledge where the sources don't cover something. Save to module-5/briefing.md.
```

*(end of prompt)*

Save it. **Don't open it yet.** Your gut verdicts are the measuring stick. Blind verdicts first, then the run.

Now the benchmark. Claude scans the briefing, proposes five specific claims spanning the grounded–ungrounded spectrum, and you verdict each one in one line. Five is the ceiling; more is busywork, fewer is noise.

**Prompt** *(copy → Claude Code)*

```
Open module-5/briefing.md. Scan it and propose exactly five specific claims — one number, one named competitor behaviour, one quote, one market-sizing statement, one Monday outcome. Pick claims that sit across the spectrum from clearly-grounded to clearly-ungrounded — mix deliberately, don't cherry-pick. Quote each claim verbatim from the briefing — the exact sentence or phrase, so the scorer can match detector findings back to it.

Then ask me, for each claim in turn: the verbatim claim, and whether it's grounded in the sources (yes / no / partly — and one line why).

Ask one claim at a time, wait for my answer, then the next. After five answers, write module-5/benchmark.md with the five verbatim claims, my verdicts, and my one-line reasoning per claim.
```

*(end of prompt)*

Answer five questions. Keep it fast: your gut verdict plus one sentence. You're not grading the briefing; you're giving the scorer something to measure against.

**Phase 1a: The first batch: four detectors.**

Four detectors, four different methods, run in parallel on the same briefing. Each is a subagent with a specific lens. Each writes to its own file. You don't read them yet. The scorer does that work in Phase 2.

In your main session:

**Prompt** *(copy → Claude Code)*

```
Run four detectors on module-5/briefing.md in parallel. Each detector is a subagent with a different method. Each reads the briefing and the sources in module-3/retrievals/, module-3/stances/, and sources/. Each writes its findings to module-5/detectors/<name>.md as a list of claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every specific claim in the briefing, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED.

Detector 2 — Entailment. For every claim, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said.

Detector 3 — Citation integrity. Some claims in the briefing will cite a source (either inline or implicitly). For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim.

Detector 4 — Counter-evidence search. For every claim, actively look for sources that contradict it, not just ones that support it. Flag CRUMBLES when disconfirming material exists in the source files that the briefing ignored.

One rule across all four detectors: quote each flagged claim verbatim from the briefing (the exact sentence or phrase). The scorer uses strict substring match to score you against the benchmark; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm: four files written under module-5/detectors/.
```

*(end of prompt)*

Watch the four subagent lines scroll past. Same briefing, four lenses. Four files in a minute or two. The fifth detector is different enough to want its own phase.

**Phase 1b: The second batch: self-consistency, done right.**

Self-consistency is the fifth detector. One subagent can't do it alone. The method needs independent re-derivations and then a comparison. You'll spawn four regenerators, each blind to the briefing, each with a different framing on the same source material. A claim in the briefing that three or four of them independently produce is stable. One or two is contested. Zero is fabricated.

The blinding matters more than the count. If the regenerators saw the briefing, they'd anchor on its framing and mostly agree with it. Without the briefing, they produce their own versions. The briefing becomes the thing being audited, not the source of truth.

The framings matter too. Same sources, different angles. Regenerator A asks for strategic claims, Regenerator B for rollout-approach claims, Regenerator C for load-bearing assumptions, Regenerator D for verbatim source quotes. Different framings surface different claim sets. Where three or four framings converge, the claim is stable. Where they diverge, the briefing's version of it needs scrutiny.

Spawn the second batch. Between dispatching the regenerators and returning their collated output, Claude briefs you in three paragraphs on what self-consistency measures. The brief fills the turn; the collated `self-consistency.md` lands at the end.

**Prompt** *(copy → Claude Code)*

```
Run four self-consistency regenerators on the source material in parallel. Each is a subagent that reads ONLY the source files (sources/, module-3/retrievals/, module-3/stances/). None of them reads module-5/briefing.md. Each uses a specific framing (assigned below) and writes a numbered list of specific claims the sources support under that framing, quoting the source file by name. Each writes to module-5/detectors/self-consistency/<framing>.md.

Regenerator A — Strategic claims framing. List the specific strategic claims the sources support about the question in module-3/question.md. Numbered list, one claim per line, quote source files.

Regenerator B — Rollout-approach framing. List the specific claims about how sub-teams should sequence adoption, what each lead is blocked on, and what unblocks them. Numbered list.

Regenerator C — Load-bearing assumptions framing. List the load-bearing assumptions the sources make about skeptic conversion, timing, and forcing functions. Numbered list, one assumption per line, quote the source file that grounds each.

Regenerator D — Verbatim source quote framing. List the verbatim quotes from the source files that would most plausibly appear in a one-page briefing on this question. Numbered list of quotes with their source files.

Spawn all four in parallel.

After dispatching, brief me in three short paragraphs, in the chat, no file: what self-consistency measures, why blinding the regenerators matters, what self-consistency still won't catch. Then collate.

When the four return, collate: read module-5/briefing.md and the four regenerator files. For each specific claim in the briefing, check whether it appears (paraphrase match is fine) in the regenerators' outputs. Label each briefing claim STABLE (3-4 regenerators match), CONTESTED (1-2), or FABRICATED (0). Write the collated output to module-5/detectors/self-consistency.md as a list with the briefing claim, which regenerators matched, the label, and one line of reasoning.
```

*(end of prompt)*

Read the three-paragraph brief. It lands before the collated output, so the method frames what you're about to see. When collation finishes, `self-consistency.md` is there alongside the four detector files from Phase 1a. Five files. Now the scorer runs.

**Phase 2: Scorer runs the benchmark.**

A sixth agent (the scorer) reads all five detector files, compares them to the benchmark you wrote in Phase 0, and produces a scoreboard. You don't compare them by hand. The scorer measures precision (of what the detector flagged, how much was actually ungrounded by your benchmark?), recall (of what your benchmark said was ungrounded, how much did the detector catch?), and coverage (did the detector look at claims your benchmark cared about?).

**Prompt** *(copy → Claude Code)*

```
You are the scorer for a five-way detector benchmark. Your inputs:

- Benchmark: module-5/benchmark.md (five claims, my verdicts)
- Five detector outputs: module-5/detectors/*.md

Your job: score each detector against my benchmark, produce a scoreboard, name a winner.

For each detector:
1. Match detector findings to benchmark claims by strict substring match. Each of my five claims was quoted verbatim from the briefing. If you can't find the verbatim phrase from the benchmark claim in the detector's output, count as MISS — do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each benchmark claim, check whether the detector flagged it. If I said "not grounded," the detector should have flagged it; count as a hit. If I said "grounded," the detector should NOT have flagged it; a flag is a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total I said were not grounded). Coverage = how many of my five claims the detector even looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all five are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.
```

*(end of prompt)*

Watch the scoreboard land. Read it. You can now see which method actually worked on your output. Not intuition. Measurement.

Five detectors read the same briefing. One method caught more of what your expert verdict said was ungrounded. Another caught less but with higher precision. A third caught something the others missed. Maybe the citation-integrity detector caught a broken citation that source-triangulation couldn't, or the counter-evidence search surfaced a claim that looked fine to everyone else until the disconfirming source turned up. The scoreboard IS the explanation. You can point at a row and say *this is why I'm keeping this one*.

Before Phase 3, ask Claude to contrast what you just did with the classic way. Then one sentence on what surprised you in the scoreboard, so the rescue lands as a felt beat, not a checkpoint.

**Prompt** *(copy → Claude Code)*

```
Two things, in the chat.

First, three lines on the classic way:
1. What the classic way to quality-check this briefing would have been.
2. Whether it would have been faster or slower than this benchmark.
3. Why.

Second, ask me which row of the scoreboard surprised me most — the detector that did better or worse than I'd have guessed, or the claim that turned out to be harder to flag than it looked. Wait for my one-sentence answer before we move to saving the judge.
```

*(end of prompt)*

Answer the surprise question in one sentence. The scoreboard is the mechanism; naming the surprise is how you own the mechanism rather than just consuming it.

**Phase 3: Save the winner as a judge.**

The winner (or the two-method ensemble) is worth keeping. You'll save it as a judge file: a named, reusable prompt you can run against any future briefing, not just this one. Module 6 picks this file up and turns it into infrastructure.

**Prompt** *(copy → Claude Code)*

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant source files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
```

*(end of prompt)*

Open `judges/groundedness-judge.md`. Read it. This is your first real judge. Named after what it does. Narrow on purpose. The "known limit" line matters. It names the thing you measured and decided not to chase. Plain about what it is and what it isn't.

**Close: what you just did, named.**

Five methods ran on the same input. A scorer measured them against a five-claim benchmark you wrote in two minutes. The winner got promoted to a reusable judge file. No intuition. No "I heard this method is good." Measurement.

This pattern (run several candidates in parallel, score them empirically, keep the winner or stack an ensemble) is the serious way to build any quality check. Not just groundedness. Tone, brand voice, compliance, steering toward a product attribute. Any judgment call you want a machine to make reliably starts with a benchmark you wrote yourself.

**Take-home: quality-control any output.**

The five techniques are portable. Point the same pattern at a customer email, a pricing memo, a positioning draft, anything about to ship.

Ask Claude to set up the system on a new output.

**Prompt** *(copy → Claude Code)*

```
I have output I want to quality-control against fabrication. Set up a benchmarking system for me using these five techniques:

- Source triangulation: does every specific claim appear in at least one source file?
- Entailment: does the output say more than the sources support?
- Citation integrity: when a citation is made, does the source actually contain the claim?
- Self-consistency: regenerate the output and diff; claims that vary across regenerations are fabrications.
- Counter-evidence search: actively look for sources that contradict each claim, not just ones that support.

Keep the techniques that fit my output; swap any that don't for methods that catch my output's specific failure modes.

Ask me what output I want to check and where my sources live. Then build me five detectors, a five-claim benchmark I'll annotate, and a scorer that picks a winner. Save under judges/.
```

*(end of prompt)*

One thing the benchmark can't reach: yours was five claims. A real production judge wants hundreds. The method is the same; the scale is the difference. That's next module.

Write one sentence to `module-5/still-uncertain.md` naming the one thing this judge caught in this benchmark that you'd want running on every briefing you write from here on.

Module 6 comes back for this file. You'll turn this judge into infrastructure: scaled benchmark, running on every build, feeding corrections back into itself.

**What happens:**

You produce a fresh briefing, write a five-claim benchmark in your own voice, spawn five detectors in parallel on the same briefing, let a scorer measure them against your benchmark, read a scoreboard that names the winner with measured reasoning, and save the winner as a named judge file. Twenty minutes of that is watching agents work while you think about what you're measuring. The file `judges/groundedness-judge.md` is the artifact Module 6 picks up.

**The point:**

Method selection in agent quality work is empirical, not intuitive. You don't trust a detector because you read about it. You trust it because you ran a benchmark on your own output with your own reference and it won. The scoreboard is the explanation. The winner becomes a judge you can defend. The pattern (candidates → benchmark → scorer → winner) is portable to every quality judgment you'll ever automate.

**Time:** 55–70 minutes. Phase 0 ~12, Phase 1a ~8 (set up + watch four detectors), Phase 1b ~12 (set up second batch + read three-paragraph brief + receive collation), Phase 2 ~20 (watch scoreboard + read it), Phase 3 ~10, Close ~5.

<!-- maintainer -->

**Pattern: benchmarking.** One of the three designated magic beats in M3–M8 (alongside M3 multi-retriever + multi-stance and M8 agents-building-agents). The student operates as the scorer setup-and-observer, not as the classifier. Claude audits Claude; the student reads the scoreboard and saves the winner.

**Mood contract — mechanical rescue.** The student leaves M3/M4 uneasy. M5's rescue is watching the benchmark name the winner measurably — *"ahh, this is actually fixable."* Key: do NOT resolve M3's strategic uncertainty or M4's security residual. Only the groundedness sub-problem gets rescued, and only for the shape of output the benchmark tested. The Close's still-uncertain line keeps the broader uncertainty alive.

**Understandable magic bar.** After the exercise the student must be able to say, unprompted: *"five detectors ran in parallel on the same briefing, a scorer measured them against a five-claim benchmark I wrote myself, detector X won because it caught Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere. If any phase leaves the student unable to describe what just happened, the phase is broken.

**Walk-away calibration.** M5 is "bounded benchmark run" on the ramp — NOT walk-away. The student sets up the benchmark, starts the run, watches it execute (~20 min across Phases 1 and 2 combined). They don't leave the chair; they also don't classify by hand. Watching the scoreboard fill is the visceral moment.

**Benchmark = five claims, deliberately.** Small enough that the student does it in two minutes. Large enough that precision/recall are meaningful. The scale-up ("production judges want hundreds") is M6's problem, named out loud here so the student sees the seam.

**Frameworks riffed on:**
- **Benchmarking** — from ML practice; Antti-run pattern. Empirical method selection beats authority ("this method is best").
- **Precision / recall / coverage** — standard eval vocabulary introduced experientially, not lectured.
- **Benchmark** — the word is earned in Phase 0; the student writes one in two minutes and sees what it's worth.
- **Self-consistency** — Wang et al. 2022, "Self-Consistency Improves Chain of Thought Reasoning" (arXiv:2203.11171). The agreement-across-independent-regenerations mechanic is theirs; the blinded multi-framing variant in Phase 1b (regenerators read only sources, not the briefing; different framings induce variance) is our adaptation. Not named in the body — the student earns the technique by running it.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the Close's still-uncertain line, and in the judge's "Known limit:" line. Both student-written.
- Belief #14 — practice beats proof — continues from M4. Named in maintainer-space, experienced in body.

**Plug points:**
- The briefing target — Module 3 briefing by default; any over-reaching output the student already cares about also works.
- The five detector methods — these five are calibrated to produce a tight race on a Module 3 shaped briefing. Domain-specific cohorts may swap one in (regulatory-claim flag for compliance teams, pricing-claim flag for commercial teams); keep the ensemble cap at two methods stacked.
- The benchmark size — five by default. Raise to seven for cohorts whose briefings produce long outputs; never below five (precision/recall get noisy).

**Watch-fors:**
- **Reading the briefing before writing the benchmark.** Biases everything. Coach: *"Don't open it. Your Phase 0 verdicts are more useful when they're gut verdicts."*
- **Benchmark of seven or eight claims.** Student over-delivers. Coach: *"Five. The measurement gets noisier, not better, with more."*
- **Scorer hedges.** It picks "all five are useful" rather than naming a winner. Coach: *"Re-run and force a pick — the ensemble is a two-method stack, not a five-method hug."*
- **The scoreboard looks clean and the student doesn't read it.** The scoreboard IS the explanation. If the student skips to Phase 3, the mood beat is stolen. Phase 2's "which row surprised you?" gate forces the read; if the student's one-sentence answer is generic ("the scoreboard was interesting"), push back: *"name the row, name the number, name why."*
- **The judge file sprawls.** Student lets Claude write a 60-line judge. Coach: *"Under 20 lines. A judge that tries to do everything does nothing well."*
- **Collator over-charitable-matches.** Phase 1b's collation does paraphrase-matching (intentionally, since regenerators legitimately rephrase). If everything in the briefing ends up STABLE, the collator was too generous. Push back: *"show me the verbatim regenerator phrase that matched this briefing claim. If you can't, downgrade to CONTESTED."* The asymmetry with Phase 2's strict substring match is deliberate; the collator's charity is what the forced-quote pushback keeps honest.

**Mood check (before shipping):**
- M5's mood is mechanical rescue — *"ahh, this is actually fixable."* The Close must land there. The scoreboard moment is the rescue beat — a student who scrolls past it steals their own mood.
- Security residual (M4) and strategic uncertainty (M3) should still be present at the end of M5. The Close's "what the judge won't catch" line names the scope of the rescue.
- Hand-off to M6 is hunger, not closure — *"five claims by hand; imagine hundreds running on every build"* is the seam.

**Delineation with M6:**
- M5 ships a hand-run benchmark producing one judge file against a five-claim benchmark.
- M6 picks the judge up and turns it into infrastructure — scaled benchmark, scheduled runs, corrections feeding back, the steering counterpart (encoding preference, not groundedness).
- Don't cross-teach. M5's benchmark earns M6's automation.

