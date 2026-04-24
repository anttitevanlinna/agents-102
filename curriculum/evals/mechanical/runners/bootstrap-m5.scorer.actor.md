# Actor — Bootstrap M5 scorer + judge save (Phases 2–3 + Close)

You are the scorer Actor. Phase 0 (setup) and Phase 1 (five detectors) completed before you. Now you read the five detector files + the benchmark, produce a scoreboard, do the classic-way contrast, save a judge file, and write the still-uncertain line.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`.

## Protocol

Read each prompt file verbatim. Quote in blockquote. Respond.

**Prompts:**
- `/tmp/prompts/hallucination-bakeoff/prompt-004.txt` — scorer
- `/tmp/prompts/hallucination-bakeoff/prompt-005.txt` — classic-way contrast (3 lines)
- `/tmp/prompts/hallucination-bakeoff/prompt-006.txt` — save judge
- `/tmp/prompts/hallucination-bakeoff/prompt-007.txt` — take-home portable kit (SKIP — see truncation below)

## Inputs

- `module-5/benchmark.md` — Maija's five-claim benchmark with verdicts
- `module-5/detectors/*.md` — five detector outputs
- `module-5/briefing.md` — the target corpus
- Source material: `sources/*.md`, `module-3/retrievals/*.md`, `module-3/stances/*.md`

## Phase 2 — scorer

Paste prompt-004 verbatim. Apply the scorer spec exactly — strict substring match (no semantic similarity, no paraphrase), precision/recall/coverage, force-one-winner, ensemble cap at 2 if top two within 10% on both metrics.

Write `module-5/scoreboard.md` as a table per the prompt:
`| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |`

Then name the winner (or two-method ensemble) below the table, with one line of reasoning.

## Phase 2b — classic-way contrast

Paste prompt-005 verbatim. Three lines in scrollback (not a new file):
1. What the classic way to quality-check would have been.
2. Whether it would have been faster or slower than the benchmark.
3. Why.

## Phase 3 — save judge

Paste prompt-006 verbatim. Write `judges/groundedness-judge.md` — under 20 lines, short heading + one-paragraph description + the judge prompt itself. End with a one-line `Known limit:` naming the failure mode based on what lost the benchmark.

## Close — still-uncertain

Write one sentence to `module-5/still-uncertain.md` naming the one thing this judge caught in this benchmark that Maija would want running on every briefing from here on. One line, plain.

## Truncation — take-home prompt (prompt-007)

The take-home prompt sets up a portable benchmarking kit for a NEW output (a pricing memo, positioning draft, etc.). That's homework on new material, not part of the exercise's main run. Skip execution. Log at the bottom of your scrollback: `[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]`.

## Report

Write scrollback to `.../instances/bootstrap-m5-verbatim-2026-04-24-scorer-scrollback.md`.

Short report at `.../instances/bootstrap-m5-verbatim-2026-04-24-scorer-report.md`:

```markdown
# Actor — Bootstrap M5 scorer — 2026-04-24
Status: done
Scoreboard: module-5/scoreboard.md
Winner: <detector name or ensemble>
Judge: judges/groundedness-judge.md
Still-uncertain: module-5/still-uncertain.md
Substitutions: take-home prompt-007 truncated
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, other actor runners, maintainer docs.
- Read sibling detector/setup runner files.
- Read `/tmp/bootstrap-mocks/` — the source corpus is the inherited scratch state.
- Overwrite `module-3/` or `module-4/` artifacts.
- Paraphrase prompts.
- Execute prompt-007 (take-home truncation).
- Run the Debrief (owned by the module file).
