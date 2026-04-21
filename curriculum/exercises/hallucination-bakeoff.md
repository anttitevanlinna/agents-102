# Exercise: Hallucination bake-off

**What you do:**

Four detectors, same briefing, one scoreboard. You don't hunt for ungrounded claims by hand. You set up a tournament — four different methods for catching ungroundedness run in parallel on the same output — and a meta-evaluator scores them against a small gold standard you wrote yourself. The winner (or the ensemble) becomes a judge file you carry into Module 6.

The move is empirical. You don't pick a detection method because somebody said so. You run the candidates, measure, and keep the one that caught what mattered on *your* output. That's how serious practitioners build quality machinery.

Four phases. 55–70 minutes. The work is mostly done by the four detectors and the meta-evaluator. Your job is to set the panel up, write a five-claim gold standard, start the run, and watch the scoreboard fill in.

**Phase 0 — The target and the gold standard.**

Your target is the ungrounded briefing from Module 3. You'll reuse the Module 3 synthesized answer as the test corpus — your sources, your retrievals, your stances, your real question. The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test.

First, produce a fresh briefing so every detector sees the same output. Open your training directory in Claude Code. Paste:

```
Produce a one-page executive briefing on the strategic question in module-3/question.md, using the material in module-3/retrievals/ and module-3/stances/. Include three named competitors' 2026 priorities, at least two verbatim quotes from sources/, a market-sizing number, two analyst takes, and a Monday action with a measurable outcome. Blend general knowledge where the sources don't cover something. Save to module-5/briefing.md.
```

Save it. **Do not open it yet.** Your gut verdicts are the measuring stick the meta-evaluator uses to score the four detectors. Reading the briefing first biases your verdicts toward whatever felt confident on the page — exactly the failure mode we're measuring. Blind gold standard first, then the bake-off.

Now the gold standard. Claude scans the briefing, proposes five specific claims spanning the grounded–ungrounded spectrum, and you verdict each one in one line. Five is the ceiling — more is busywork, fewer is noise. Paste:

```
Open module-5/briefing.md. Scan it and propose exactly five specific claims — one number, one named competitor behaviour, one quote, one market-sizing statement, one Monday outcome. Pick claims that sit across the spectrum from clearly-grounded to clearly-ungrounded — mix deliberately, don't cherry-pick. Quote each claim verbatim from the briefing — the exact sentence or phrase, so the meta-evaluator can match detector findings back to it.

Then, for each claim, ask me:

"Claim N — verbatim: [claim]. Is this grounded in the sources? (yes / no / partly — and one line why.)"

Ask one question, wait for my answer, then the next. After five answers, write module-5/gold-standard.md with the five verbatim claims, my verdicts, and my one-line reasoning per claim.
```

Answer five questions. Keep it fast — your gut verdict plus one sentence. You're not grading the briefing; you're giving the meta-evaluator something to measure against.

**Phase 1 — Set up the four detectors.**

Four detectors, four different methods for catching ungroundedness. They're agents you spawn in parallel, each writing to its own file. Claude Code runs them as subagents inside one session.

In your main session, paste:

```
Run four detectors on module-5/briefing.md in parallel. Each detector is a subagent with a different method. Each reads the briefing and the sources in module-3/retrievals/, module-3/stances/, and sources/. Each writes its findings to module-5/detectors/<name>.md as a list of claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every specific claim in the briefing, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED.

Detector 2 — Entailment judge. For every claim, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said.

Detector 3 — Citation integrity. Some claims in the briefing will cite a source (either inline or implicitly). For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim.

Detector 4 — Conventional-wisdom flag. Some claims sound like general business truisms ("companies that don't adapt will fall behind," "procurement is a common blocker"). These cite nothing and feel obvious. Flag CONVENTIONAL-WISDOM for any claim that's stated as fact but grounds in nothing specific.

Spawn all four in parallel. When they finish, confirm: four files written under module-5/detectors/.
```

Watch the four subagent lines scroll past. Each one is reading the same briefing with a different lens. You'll have four files of findings within a minute or two. Don't read them yet. The next phase is where the scoring happens, and reading ahead biases you the same way reading the briefing would have.

**Phase 2 — Meta-evaluator scores the bake-off.**

Now the tournament. A fifth agent — the meta-evaluator — reads all four detector files, compares them to the gold standard you wrote in Phase 0, and produces a scoreboard. You don't compare them by hand. The meta-evaluator measures precision (of what the detector flagged, how much was actually ungrounded by your gold standard?), recall (of what your gold standard said was ungrounded, how much did the detector catch?), and coverage (did the detector look at claims your gold standard cared about?).

Paste:

```
You are the meta-evaluator for a four-way detector bake-off. Your inputs:

- Gold standard: module-5/gold-standard.md (five claims, my verdicts)
- Four detector outputs: module-5/detectors/*.md

Your job: score each detector against my gold standard, produce a scoreboard, name a winner.

For each detector:
1. Match detector findings to gold-standard claims by substring overlap, not exact match. Each of my five claims was quoted verbatim from the briefing; find that same phrase in the detector's output.
2. For each gold-standard claim, check whether the detector flagged it. If I said "not grounded," the detector should have flagged it; count as a hit. If I said "grounded," the detector should NOT have flagged it; a flag is a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total I said were not grounded). Coverage = how many of my five claims the detector even looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation: "For output of this shape, use [detector or ensemble] because [reason]."
```

Watch the scoreboard land. Read it. This is the magic beat — not because the agents did something opaque, but because you can now see which method actually worked on your output. Not intuition. Measurement.

Four detectors read the same briefing. One method caught more of what your expert verdict said was ungrounded. Another caught less but with higher precision. A third caught something the others missed — maybe the citation-integrity detector caught a broken citation that source-triangulation couldn't, or the conventional-wisdom flag caught a truism that looked fine to everyone else. The scoreboard IS the explanation. You can point at a row and say *this is why I'm keeping this one*.

**Phase 3 — Save the winner as a judge.**

The winner (or the two-method ensemble) is worth keeping. You'll save it as a judge file — a named, reusable prompt you can run against any future briefing, not just this one. Module 6 picks this file up and turns it into infrastructure.

Paste:

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant source files as inputs.
2. Flag ungrounded claims using the method(s) that won the bake-off.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the bake-off.
```

Open `judges/groundedness-judge.md`. Read it. This is your first real judge. Named after what it does. Narrow on purpose. The "known limit" line matters — it names the thing you measured and decided not to chase. Honest about what it is and what it isn't.

**Close — what you just did, named.**

You just ran a bake-off. Four methods fought on the same input, a meta-evaluator measured them against a five-claim gold standard you wrote in two minutes, the winner got promoted to a reusable judge file. No intuition. No "I heard this method is good." Measurement.

This pattern — run several candidates in parallel, score them empirically, keep the winner or stack an ensemble — is the serious way to build any quality check. Not just groundedness. Tone, brand voice, compliance, steering toward a product attribute. Any judgment call you want a machine to make reliably starts with a bake-off and a gold standard you wrote yourself.

One thing the bake-off can't reach: your gold standard was five claims. A real production judge wants hundreds. The method is the same; the scale is the difference. That's next module.

Write one line to `module-5/still-uncertain.md`: *"The judge I just built catches [what it catches]. What it won't catch is [what it won't catch]. The first place I'd trust it in production is [where]. The first place I wouldn't is [where]."*

Module 6 comes back for this file. You'll turn this judge into infrastructure — scaled gold standard, running on every build, feeding corrections back into itself.

**What happens:**

You produce a fresh briefing, write a five-claim gold standard in your own voice, spawn four detectors in parallel on the same briefing, let a meta-evaluator score them against your gold standard, read a scoreboard that names the winner with measured reasoning, and save the winner as a named judge file. Twenty minutes of that is watching agents work while you think about what you're measuring. The file `judges/groundedness-judge.md` is the artifact Module 6 picks up.

**The point:**

Method selection in agent quality work is empirical, not intuitive. You don't trust a detector because you read about it. You trust it because you ran a bake-off on your own output with your own gold standard and it won. The scoreboard is the explanation. The winner becomes a judge you can defend. The pattern — candidates → gold standard → meta-evaluator → winner — is portable to every quality judgment you'll ever automate. What you just watched is what serious evaluation looks like before anyone wrote the framework name on it.

**Time:** 55–70 minutes. Phase 0 ~12, Phase 1 ~15 (set up + watch), Phase 2 ~20 (watch scoreboard + read it), Phase 3 ~10, Close ~5.

<!-- maintainer -->

**Pattern: bake-off / method tournament.** One of the three designated magic beats in M3–M8 (alongside M3 multi-retriever + multi-stance and M8 agents-building-agents). The student operates as the meta-evaluator setup-and-observer, not as the classifier. Claude audits Claude; the student reads the scoreboard and saves the winner.

**Why this shape (and not Ralph):**
- Ralph is one generator iterating against a fixed judge.
- Bake-off is N judges competing on a fixed input, scored by a meta-evaluator.
- Different lesson: Ralph teaches *iterate until threshold*; bake-off teaches *pick methods empirically*.

**Mood contract — mechanical rescue.** The student leaves M3/M4 uneasy. M5's rescue is watching the tournament name the winner measurably — *"ahh, this is actually fixable."* Key: do NOT resolve M3's strategic uncertainty or M4's security residual. Only the groundedness sub-problem gets rescued, and only for the shape of output the bake-off tested. The Close's still-uncertain line keeps the broader uncertainty alive.

**Understandable magic bar.** After the exercise the student must be able to say, unprompted: *"four detectors ran in parallel on the same briefing, a meta-evaluator scored them against a five-claim gold standard I wrote myself, detector X won because it caught Y, now I have a judge file I trust for this shape of output."* No black-box move anywhere. If any phase leaves the student unable to describe what just happened, the phase is broken.

**Walk-away calibration.** M5 is "bounded tournament run" on the ramp — NOT walk-away. The student sets up the panel, starts the run, watches it execute (~20 min across Phases 1 and 2 combined). They don't leave the chair; they also don't classify by hand. Watching the scoreboard fill is the visceral moment.

**Gold standard = five claims, deliberately.** Small enough that the student does it in two minutes. Large enough that precision/recall are meaningful. The scale-up ("production judges want hundreds") is M6's problem, named out loud here so the student sees the seam.

**Banned pattern — student manually reads detector outputs to pick the winner.** This is exactly what the previous Module 5 exercise did and what made it the weakest module. The meta-evaluator is non-negotiable. If a simulation reports the student "reads the four files to decide," the exercise is broken — fix the meta-eval prompt until it lands.

**Frameworks riffed on:**
- **Bake-off / method tournament** — from ML practice; Antti-run pattern. Empirical method selection beats authority ("this method is best").
- **Precision / recall / coverage** — standard eval vocabulary introduced experientially, not lectured.
- **Gold standard** — the word is earned in Phase 0; the student writes one in two minutes and sees what it's worth.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the Close's still-uncertain line, and in the judge's "Known limit:" line. Both student-written.
- Belief #14 — practice beats proof — continues from M4. Named in maintainer-space, experienced in body.

**Plug points:**
- The briefing target — Module 3 briefing by default; any over-reaching output the student already cares about also works.
- The four detector methods — these four are calibrated to produce a tight race on a Module 3 shaped briefing. Domain-specific cohorts may add a fifth (regulatory-claim flag for compliance teams, pricing-claim flag for commercial teams); keep the ensemble cap at two methods stacked.
- The gold standard size — five by default. Raise to seven for cohorts whose briefings produce long outputs; never below five (precision/recall get noisy).

**Capability checks owed (before first delivery):**
- **Subagent parallel spawn with four named detectors.** Verified working in M3 with three stances; four should behave identically. Confirm in a dry run.
- **Meta-evaluator reading detector files + gold standard and producing a scoreboard table.** Confirm the table renders cleanly and the precision/recall computation is stable across runs. If the numbers swing wildly run-to-run, tighten the prompt to specify the computation explicitly.
- **`judges/groundedness-judge.md` handoff to Module 6.** Confirm M6's first exercise picks up this path verbatim. If M6 expects a different location, align here or there in the same edit.

**Watch-fors (deferred to facilitator notes pass):**
- **Reading the briefing before writing the gold standard.** Biases everything. Coach: *"Don't open it. Your Phase 0 verdicts are more useful when they're gut verdicts."*
- **Gold standard of seven or eight claims.** Student over-delivers. Coach: *"Five. The measurement gets noisier, not better, with more."*
- **Meta-evaluator hedges.** It picks "all four are useful" rather than naming a winner. Coach: *"Re-run and force a pick — the ensemble is a two-method stack, not a four-method hug."*
- **The scoreboard looks clean and the student doesn't read it.** The scoreboard IS the explanation. If the student skips to Phase 3, the mood beat is stolen. Coach: *"Look at row 2. What did that detector catch that the others didn't?"*
- **The judge file sprawls.** Student lets Claude write a 60-line judge. Coach: *"Under 20 lines. A judge that tries to do everything does nothing well."*

**Mood check (before shipping):**
- M5's mood is mechanical rescue — *"ahh, this is actually fixable."* The Close must land there. The scoreboard moment is the rescue beat — a student who scrolls past it steals their own mood.
- Security residual (M4) and strategic uncertainty (M3) should still be present at the end of M5. The Close's "what the judge won't catch" line names the scope of the rescue.
- Hand-off to M6 is hunger, not closure — *"five claims by hand; imagine hundreds running on every build"* is the seam.

**Delineation with M6:**
- M5 ships a hand-run bake-off producing one judge file against a five-claim gold standard.
- M6 picks the judge up and turns it into infrastructure — scaled gold standard, scheduled runs, corrections feeding back, the steering counterpart (encoding preference, not groundedness).
- Don't cross-teach. M5's bake-off earns M6's automation.

**Supersedes:** `exercises/ground-your-output.md` — the manual classification exercise this replaces. The grounding vocabulary (GROUNDED / UNGROUNDED / MISREPRESENTS / OVERREACHES / UNGROUNDED-SHAPE) from the prior exercise is no longer required material; the bake-off teaches the discipline empirically without the five-category frame. Keep the old file as supplementary reading for cohorts that want the taxonomy, or delete at the next sweep.
