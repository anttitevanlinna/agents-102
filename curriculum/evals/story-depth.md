# Story-depth — standing report

Rubric: `story-depth-rubric.md`. Goal spec: `trainings/agents-101/story-depth.md`. One `## Run`
section per run, newest first; per-judge reports under `story-depth/`.

## Squint after — 2026-09-22 — the skeleton to be, titles only

Same three-judge test on `story-depth/a101-skeleton-to-be.md` with the change markers hidden.
Raw counts 21–30 learnings, 5–8 governors (counts remain meaningless; the judges still list
one line per title). Against the key: learnings 9–10 of 10 — every intended learning has a
title carrying it, with the trust arc read as a chain (*the report is a hypothesis* → *"are you
sure?" is another fluent answer* → *the gate is a claim too*) and the future thread read as a
seeded-and-echoed question (*the model will change under this* M2 → *the model rotates* M6 →
*will your organisation learn faster than the model changes underneath it?* M8) by all three.
Governors 4–5 of 9 (*I can't tell*, *would you let it send the mail*, *when did you last read
one of these yourself*, *what would change our mind*, *start with don't*); the shortfall was
the skeleton's, not the titles' — *which rung has this action earned*, *what's the worst thing
it could do with that access* and *what would have to be true* were in the theory plan and
absent from the first cut, and are now slides. Own-tool doubt found by all three; two of
three also read *the doubt stays, hold it* as the training doubting itself, which is the mood
contract working from a title alone.

Before → after on the key, with no prose written: learnings ~5 → 9–10 · governors 1 → 4–5
(7–8 after the three added slides, unmeasured) · future 0 → 1 · own-tool doubt 0 → 1. This
is the naming layer measured in isolation. What it cannot show: whether the prose under each
title earns it, or whether the mood arc survives — the closed-book, transfer and mood-guard
instruments in the goal spec own those, and they run after placement.

## Squint before — 2026-09-22 — A101 skeleton as it stands

Three judges, skeleton only (`story-depth/a101-skeleton.md`), told to be stingy. Raw counts:
11–13 learnings, 5–7 governors, future "yes", self-doubt "yes" — every one of which is a
calibration finding, not a result. The learnings named are one topic per module (*security is
a discipline you practise*, *agents get stuck*), the governors are recipe headers (*keep the
heavy reads under control*), the future is a heading called *The question to hold* with no
question under it, and the self-doubt is inferred from topics (*why the LLM fabricates*) rather
than found in a title that doubts the training's own tool. Scored against the key
(`trainings/agents-101/theory-plan.md` § 6 and the A101 learning-set below): learnings ~5/10
(context, compounding, human moves up, absorption, flywheel present; self-report as
hypothesis, certainty unavailable, variety/beige, floor/ceiling, the model rotates absent),
governors 1/9 (*would you let it send the mail?*), future 0, own-tool doubt 0. Per-judge
reports: `story-depth/squint-before.judge-*.md`. Blank stretches agree across judges: twelve
lectures with no `##`, M3 entirely so.

Rule banked in the rubric: the squint test scores matches against the key, never counts.

## Run step-0 — 2026-09-22 — baseline, both trainings

Nine judges on Sonnet. Six cold reads (three per training, single-training mode) named the
learnings; three scoring judges then read both trainings in one head and scored the consensus
learning-sets on the anchors. Scoring judge 2 read both arcs in full (32 files cited in running
notes); judges 1 and 3 read module bodies plus the lectures central to the trust and compounding
lineages and say so in their headers. Their factor means sit within about ten points of judge 2
on most factors, so the module files carry most of the signal; judge 2 is the anchor where they
disagree.

### Profiles (median of three, factor mean over learnings)

| Factor | AE101 | A101 |
|---|---|---|
| Depth | 65 | 77 |
| Forward-looking | 63 | 44 |
| Applicable in practice | 60 | 83 |
| Self-challenging | 58 | 60 |
| Earned, not announced | 44 | 56 |
| Carry share (top learning ÷ all) | 29% | 20% |

Per judge — AE101: J1 57/63/58/58/44 · J2 65/53/62/57/44 · J3 68/76/60/64/58.
A101: J1 77/39/85/60/56 · J2 77/44/80/46/65 · J3 87/47/83/73/33.

**The trade each training made.** AE101 keeps the future open and pays in Tuesday moves:
forward-looking is its top factor, applicable its second-lowest, and its strongest
forward-looking cells are exactly where it declines to hand over a move (`the-gate-is-a-claim`:
*"You do not need to build these today"*). A101 does the opposite: applicable is its top factor,
the governors re-fire unprompted across modules (the assess/mitigate/reassess/decide loop, the
autonomy rung, persistence + automation), and forward-looking is its lowest, with four of six
learnings at or near the floor.

**The calibration premise was wrong, usefully.** Step 0 was set up to confirm AE101 clearly
ahead. On these anchors it is not: A101 leads on depth and applicability, AE101 on
forward-looking and earned-not-announced. The gap is a shape, not a deficit — which is the
reading the goal spec now asks for. The recall test itself passed: all six cold reads named the
trust arc and compounding unprompted.

### Learning-level findings all three scoring judges agree on

- **AE101 "your stance is the ceiling" is a headline, not a learning** — depth 40 from all
  three. Mechanism given once in M1 (`the-machine-you-just-met`), never returns with new
  meaning. The grounding section of the goal spec braided it with M6's *"the agent stops where
  your judgement begins"*; no judge saw that link on the page.
- **AE101's two-frontiers / credo bookend is a recap, not a development** — depth 40,
  applicable 0–20, self-challenging 0–5 from all three; forward-looking 80. The beat designed to
  hold the future open does so, and does nothing else: M6 restates M1 nearly verbatim, and the
  lecture's own meta says it teaches no new term. It carries AE101's forward-looking score
  almost alone.
- **A101 "access is not absorption" is a single-module headline** — depth 30–60, forward 0–20.
  Stated at M7, restated inside M7, no plant before it and no return at M8. All three name the
  same smallest move: one callback line in M8 against the shared-folder rollout.
- **A101's earned-not-announced cost is structural** — every module opens on a `## Big Idea`
  and M1 opens on a lecture titled *Context is King* before any exercise runs. Judge 3 scores
  every A101 learning ≤40 on this factor. AE101 pays the same Big Idea tax but withholds the
  *name* longer (the delegation frontier's axes at M2, the term at M5).
- **A101's strongest learnings are C and D** — *certainty is unavailable, hold the doubt*
  (M3 plant → M4 loop → M5 explicit non-closure → M6/M8 device reused at the close) and *the
  human moves one level up* (paid off near-verbatim at M6, scale-shifted at M8). D is never
  doubted on the page — self-challenging 20–40 — the one place A101's counter-voice goes quiet.

### Progression (judge 2's rows; judge 3's agree in shape)

AE101 — trust arc 60·60·70·70·90·90 · stance 40 flat · compounding 20·60·60·60·60·70 ·
delegation 0·40·60·80·85·85 · two-frontiers 20 flat then 40 at M6.

A101 — context 40·60·60·60·60·60·65·65 · confident≠verified 40·40·40·40·80·88·88·88 ·
certainty 0·0·40·80·85·85·85·85 · human-moves-up 0·0·0·20·20·85·90·92 · access≠absorption
0 until 20 at M6, 60 at M7 · systems-compound 0·40·40·40·40·40·40·70.

Flat stretches worth reading: A101's *context* idles M2–M6; *systems compound* idles M2–M7
then jumps at M8 (the anchors call that a recap, not a development); *human moves up* is silent
until M4 and lands almost entirely at M6. AE101's *compounding* idles M2–M5 before its M6
subtraction beat; its *trust arc* is the only learning in either training that climbs in three
separate modules.

### Where the reads and the numbers disagree

Recorded per judge under `story-depth/step0-scored.judge-*.md § Where the numbers disagree`.
The recurring one: quotability is not depth. The lines each training is proudest of (*your
stance is the ceiling*, *access is not absorption*, *the human moves one level up*) score as
headlines or as undoubted, because a line that lands hard once reads as developed when it is
only remembered.

### Smallest moves the judges converge on (A101)

1. M8 callback line reusing *access is not absorption* against the shared-folder mechanic
   (three of three).
2. A counter-voice for *context makes it yours* — one case where more context does not fix
   generic output (two of three).
3. A sentence naming what would change the training's own mind about *the human moves one
   level up* or *certainty is unavailable* — the forward-looking anchor's top rung, which no
   A101 learning reaches (two of three).
4. Move M1's *Context is King* line to after the first guardrail attempt (judge 3) — the
   biggest single lever on earned-not-announced, and a structural change to module shape.

None of these is applied. They are inputs to the creative diverge, not a punch list — the goal
spec's loop contract stops at Antti's pick before any student-facing text moves.

### What this run says about the rubric

- Single-training four-word verdicts saturate (six of six reads returned *strong* on four
  factors); the anchored scale with both trainings in one head discriminates. Keep single mode
  for naming only.
- Thin reads track full reads within ~10 points on factor means but diverge on individual
  cells (A101 earned-not-announced: 33 / 56 / 65). Report medians; never a single judge.
- Including a candidate learning the cold reads did not name drags a training's means (AE101
  depth 65 with the two-frontiers candidate; 71–75 without). Score candidates in their own row
  and report means both ways next run.
