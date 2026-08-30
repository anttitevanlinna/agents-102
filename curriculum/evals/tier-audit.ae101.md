# Tier audit — standing report

Slide-by-slide `<!--tier:N-->` assignment across AE101. Standing report, one per scope,
**overwritten on rerun** (same contract as `arc-read.ae101.md`, `cut-sweep.ae101.md`).

**Last run:** 2026-08-30 · six read-only subagents, one per module, disjoint file sets · orchestrator applied.
**Scope:** 6 module bodies + 25 lectures = **158 slides**. Exercises excluded by rule — they are the doing
the barebones deck exists to reach, T1 by default. **Rubric:** `curriculum/evals/tier-rubric.md`, written
before dispatch so six agents could not invent six dialects of "T2".
**Method:** each agent got the rubric, `_index/slides.leads.md`, `taste-notes.md` **including the
counterweights**, and its module's ref order — so it could tell pre-exercise from post-exercise, which is
evidence the content alone does not carry. Read the registry file behind any `{{prompt:}}` before ruling.

**Result:** 84 slides tagged, up from 38. Coverage 14% → 32%. The real deck goes **531 → 433 slides**
in barebones (98 fewer, including 15 covers of lectures that emptied out).

---

## The finding

**All three known "T2 before the first exercise" violations were mis-tags. Not one was a mis-placement.**

The programme assumed these were slides sitting in the wrong half of a module. They were not. In every
case the tag was being asked to do a job it cannot do:

| Slide | Was | Now | Why |
|---|---|---|---|
| `when-a-plan-is-good` § Plan review is a high-leverage gate | T2 | **T1** | Teaches new mechanism the push-back exercise runs on. Its maintainer block calls it "the mechanism's only M2 home." Not recognition of anything. |
| `when-a-plan-is-good` § What you can test and check sets your complexity ceiling | T2 | **T1** | First delivery of the reach/calibration model, deliberately placed early per `check_pedagogy.md §9b` and reused at the M5 closer. A model reused three modules later is load-bearing by definition. |
| `the-agent-loop` § The agent, the harness, the loop | T2 | **T3** | Fails T1's necessity test — neither M4 exercise uses "harness" or "agent loop" anywhere. The maintainer's own note says "skippable by a trainer under time pressure," which is T3's definition, not T2's. |

**The mechanism behind all three: T2 was being used as a synonym for "droppable."** T3 is the droppable
tier; T2 is a claim about *position* that happens to imply droppability. An author reaching for "the
trainer can skip this" grabbed the nearer word. Every one of these tags was applied in a per-file pass,
which is how a positional claim got applied to slides whose position nobody checked.

Two more of the same shape, post-exercise so no gate caught them:
`how-instructions-grow` § Some rules grow into skills (T2 → **T1**: establishes the term M3 needs) and
§ Keep your context where it loads optimally (T2 → **T1**: carries a live-demo prompt).
`where-the-rule-could-live` § Three agents using the file (T2 → **T3**: forward-looking vision about
Slack triage and webhooks, which no M2 exercise touches — it recognises nothing).

## What the tags now say, per module

| | slides | T1 | T2 | T3 | unsure |
|---|---|---|---|---|---|
| M1 getting-going | 22 | 9 | 8 | 4 | 1 |
| M2 plan-mode-done-right | 25 | 16 | 4 | 4 | 1 |
| M3 earn-the-trust | 25 | 13 | 9 | 3 | 0 |
| M4 run-the-first-experiment | 31 | 15 | 11 | 3 | 2 |
| M5 learn-from-the-test | 31 | 11 | 9 | 10 | 1 |
| M6 spot-gaps-build-the-loop | 51 | 22 | 17 | 12 | 2 |

Untagged means core (the renderer defaults `tier` to `'1'`), so only the T2/T3 columns became markers.
The 7 unsures were left untagged — a wrong tag is invisible until a room loses a slide it needed.

## Where the time actually is

**M5's back half. Both closing lectures drop wholesale in barebones** — `what-packaging-is` is
4×T2/3×T3 and `the-gate-is-a-claim` is 4×T2/2×T3, no T1 between them. That is 13 slides and **20 of the
35 minutes of closers**, against a module running 127 against a 120 cap. The overrun has a switch now.

**M4's front half does not have one.** 30 minutes to its first exercise, the longest in the training, and
five of the six pre-exercise slides are genuinely T1 — each cited elsewhere in the module as load-bearing
(the trust question, the un-packaged instruction, the cancel rule). The one slack slide is the retagged
`the-agent-loop` beat, worth 1–2 minutes. **M4 is a dosage problem, not a padding problem**, and no
amount of tagging will fix it. That is a scope call, not a tier call.

**M3 was the control.** Already correctly shaped — first exercise at 10 minutes, zero pre-exercise
lectures — and it came out 13 T1 / 9 T2 / 3 T3 with the T2s concentrated in an explicit consolidation
closer whose own maintainer block calls it "consolidation, NOT new teaching." The tag discriminated on a
module already known to be right, which is the evidence the rubric is not just relabelling everything.

## The rubric gap the audit found

M6's `quality-is-grounding` § *Five moves, one quality discipline* recognises the quality kit built
across **M1–M5** — work the room genuinely has done — while sitting before M6's own first exercise. The
constraint is module-local; the recognition is not. Nothing mechanical can tell that apart from a slide
recognising an exercise that has not run.

Resolved with a maintainer-attested escape hatch in `check-slide-tiers.js`, same shape as
`check-slide-deixis.js`'s accepted-phrase hatch and scoped the same way — to the one heading ruled on,
so the check keeps biting on every other slide in the file:

```
**Pre-exercise T2 accepted:** "<exact slide header>" — <what earlier work it names>
```

Declared once so far, in `quality-is-grounding.md`. The gate is green and now runs in `test:gates`.

## Open — maintainer calls, none blocking

**The 7 unsures**, left untagged (= core, the safe default):

1. `getting-going` § Prework — recognises *prework*, done outside the module. The hard constraint is
   written for in-module exercises and does not squarely cover it. T1 or T3.
2. `how-instructions-grow` § Rules have a ceiling — three defensible readings; the deep version lives in
   the optional supplementary `the-context-ceiling.md`.
3. `learn-from-the-test` § Inspect your results — mixes a recognition of Phase 1's method with the
   no-M6 branch's only substitute for an exercise step.
4. `run-the-first-experiment` § Bring to Module 5 — the hole it leaves is real and severe, but it is one
   module over. The rubric's "what breaks" test does not say whether downstream crosses a module boundary.
5. `what-keeps-a-long-running-session-going` §§ Feedback keeps the direction / What stops a session —
   tagged T2, but both serve M5 more than M4's own finished exercise.
6. `agents-that-build-agents` § The agent stops where your judgement begins — tagged T1 on the
   maintainer's "load-bearing", but the load is tonal, and the rubric's test is built for capability.
7. `composing-the-workflow` § From skills to a workflow — genuine three-way call; introduces vocabulary
   (orchestrator, leaf, routing) that nothing downstream cites by name.

**Deferred, mechanical:** `plan-mode-done-right`'s two `## Pre-reads before Module N` sections are
variant-flag-wrapped (`<!--flag:module:earn-the-trust-->##`), one of them mid-line, so a marker cannot be
inserted on its own line. Both would be T3. Every other module's pre-reads section is tagged.

**Not swept:** exercises (106 slides, T1 by rule — the two existing T3 asides in `push-back-on-the-plan`
were left alone), prework, supplementaries, references, and the agents-101 library.

## Two things the agents were told, and kept

The counterweights travelled. `story-of-module-6` came back **five slides, all T1** — the agent applied
the recorded test (*does anything else carry this, or only this?*) slide by slide and found the numbers,
the six anecdotes, and the compounding move exist nowhere else in the corpus. Its closing law *is*
restated on `the-map-filled-in`, but asserted there and earned here. Note the audit ruled on tiers only;
whether the beat survives at all remains Antti's open call in `pre-cohort-todos.md`.

And M6 flagged a second terminal beat nobody had named: the module file's own `## Next` renders **after**
`agents-that-build-agents` in the composed deck, so the training's actual last slide is the signed
sign-off, not the lecture closer. Both T1. Worth knowing before anyone treats a module-wrap section as
boilerplate.
