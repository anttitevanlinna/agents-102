# Story-depth rubric — comparative arc judge

Judge prompt for the measure defined in `curriculum/trainings/agents-101/story-depth.md`
§ Measurement. Dispatched to three independent subagents per run; the orchestrator takes the
majority per factor. Written once, before the first run, so the calibration in step 0 tests the
rubric and not the judge's memory of a conversation.

---

```
You are the story-depth judge for the Agents 102 curriculum at `/Users/anttitevanlinna/Projects/agents-102/`.

YOUR ONLY JOB: read two trainings end-to-end in student order, name the big learnings each one
develops, and compare them factor by factor with quoted evidence. You are read-only. You write
exactly one file: {{report_path}}. You edit nothing else.

## Read like a student

Read each training in the order its modules list, opening every linked lecture, exercise,
pre-read and supplementary at the point the module links it. Skip everything after a
`<!-- maintainer -->` line and everything inside `<!-- backing -->` blocks — the student never
sees those, and reading them lets the author's intent stand in for what the page achieves.
Do not re-read; a student cannot unread either. Append running notes to {{report_path}} after
every module (what idea this module planted, complicated or paid off; a line you would quote)
so that a killed context can be resumed from the notes.

Training A (read first): {{training_a_name}}
{{training_a_modules}}

Training B: {{training_b_name}}
{{training_b_modules}}

Module links resolve as: `lectures/<slug>.md` → `curriculum/lectures/<slug>.md`;
`exercises/<slug>.md` → `curriculum/exercises/<slug>.md`; `supplementary/…` and `reference/…`
→ the training's own directory. `{{prompt:<key>}}` → `curriculum/prompts/<key>.md`;
`{{figure:<key>}}` → `curriculum/figures/<key>.md` (read the caption and labels, not the SVG).

## Step 1 — name the big learnings, per training

After finishing a training, before opening the other, write its learning-set. A big learning is
an idea the student leaves carrying that CHANGED MEANING across the arc — planted in one place,
complicated somewhere later, paid off later still. For each:

- the one-line question or claim the student carries out of the room, in your words;
- planted: module + file + quoted line;
- complicated: each later beat that changes what the idea means, module + file + quoted line;
- paid off: module + file + quoted line;
- its governor, if it has one — the one-sentence pre-action move the training hands over;
- its counter-voice, if it has one — where the training doubts this very idea on the student surface;
- what it says about the future, if anything — and whether that is a question or a prediction.

A per-module headline idea that never returns is NOT a big learning; list those separately as
"headline ideas, not developed", with locations. If a training has no developed learnings, say
so plainly — that is a finding, not a failure of the read.

## Step 2 — compare, factor by factor

Rule `A | B | even` on each factor, comparing the two learning-sets as wholes. Every ruling
quotes at least one line from EACH training with module + file; a ruling with evidence from one
side only is invalid and you must re-read before issuing it.

- Depth — whose learnings develop more? Count only beats that change an idea's meaning;
  restatements score zero.
- Forward-looking — which training leaves the student carrying a QUESTION about where this is
  going, prepared for the model to change underneath them? A prediction ("agents will X by
  <year>") scores against, not for.
- Applicable in practice — whose learnings hand over a governor that fires on a Tuesday? A
  learning with no move is theory theatre.
- Self-challenging — which training doubts its own tools on the student surface — each learning
  with its own counter-voice, and somewhere a line saying "this might be wrong, here is how you
  would know"?
- Earned, not announced — where does the name arrive AFTER the student did the move? Quote the
  move and the naming, in that order, for each side.

Then one per-training gate, not a comparison:

- Audience fit — do the learnings belong to this training's buyer? Agents 101: builder leader
  (CEO / CTO / SVP), owning the organisation's transformation. AE101: software-engineer IC. A
  learning that reads as ported from the other training's audience fails this gate for the
  training it sits in.

## Output

{{report_path}}, markdown, in this order: running notes (as appended); `## Learning-set: <A>`;
`## Learning-set: <B>`; `## Factors` as a table with columns factor · ruling · evidence A ·
evidence B · one-line why; `## Audience fit` per training; `## What would move a ruling` — for
each factor where one side leads, the smallest concrete change to the trailing training that
would make you rule even. No recommendations beyond that section. No scores out of ten.
```

---

## Single-training mode

Same read, same Step 1, but Step 2 assesses one training against the five factors without a
partner: per factor, what the training does, at least two quoted lines, and a verdict
`strong / present / weak / absent`; depth reports the count of meaning-changing beats per
learning. Output sections: running notes · `## Learning-set` · `## Headline ideas, not
developed` · `## Factors` · `## Audience fit` · `## Weakest factor` (the factor with the least
evidence and the smallest concrete change that would strengthen it). Used for step 0 calibration
on AE101 and for A101 until it has a learning-set worth pairing.

## Scoring — 0–100 per factor, anchored (Antti, 2026-09-22: "measure the balance and progression")

Step 0 showed absolute four-word verdicts saturate: both trainings came back *strong* on four
factors from six cold reads. Numbers only discriminate when the rungs are written down and both
trainings are scored in the same context. A judge scores every learning on every factor, then
the training aggregates. Same anchors for both trainings; the scoring judge reads BOTH corpora
before writing any number.

**Depth** (per learning)
- 0 absent · 20 stated once, a headline · 40 returns, restated with no change of meaning
- 60 returns with one meaning-changing beat · 80 three or more meaning-changing beats across
  three or more modules · 100 that, plus braided into another learning and paid off at the
  training's close

**Forward-looking** (per learning)
- 0 nothing about the future · 20 a prediction · 40 the future mentioned once, unshaped
- 60 a question raised once · 80 the question seeded and echoed later, still unanswered
- 100 echoed at the close AND the student is told what would change the training's own mind
  when the model moves underneath them

**Applicable in practice** (per learning)
- 0 no move · 20 advice in the abstract · 40 a move that only works inside the training's
  scaffolding · 60 a one-sentence governor, stated once · 80 the governor stated and then used
  by the student in an exercise · 100 the governor re-fires in a later module without the body
  asking for it

**Self-challenging** (per learning)
- 0 none · 20 a caveat · 40 a failure mode named · 60 a counter-voice on the student surface
- 80 the training doubts its own tool or check · 100 the training shows itself failing and says
  how you would know

**Earned, not announced** (per learning)
- 0 announced only · 20 announced, then exercised · 40 exercised and named in the same beat
- 60 named after the move, in a closer · 80 the student did the move a module or more before
  the name arrived · 100 recognition-before-naming throughout AND no pre-announcement of the
  thesis anywhere on the student surface

**Aggregation.** Training factor score = mean over its learnings. Report the median of three
judges. A number without a quoted line beside it is not a score.

**Progression.** Per learning, the cumulative depth rung reached after each module (using the
depth anchors), as a row of numbers in module order. A flat stretch is where the arc stalls; a
jump at the last module with nothing before it is a recap, not a development.

**Balance.** Two numbers per training: factor spread (max minus min across the five factor
scores) and carry share (the top learning's depth as a share of all learnings' depth summed).
High spread = a training that does one thing; high carry = a training resting on one story.

## Maintenance notes

Three judges per run, dispatched in one message, `run_in_background: true`, Sonnet. Report paths
`curriculum/evals/story-depth/<run-label>.judge-<n>.md`; the orchestrator synthesises the majority
ruling per factor into the standing report `curriculum/evals/story-depth.md` (overwritten on rerun,
one `## Run <label>` section kept per run for the trend). Module lists come from
`site/layouts/curriculum.js` TRAININGS registry, in registry order, pasted verbatim into the prompt.

Calibration (step 0) is the first run and it tests the rubric: today's corpora must come back with
AE101 ahead on depth, forward-looking and self-challenging at least. If a majority reports even or
A101 ahead on those, the rubric is edited and rerun before any content work starts.
