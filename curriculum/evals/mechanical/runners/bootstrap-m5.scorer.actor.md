# Actor — Bootstrap M5 scorer + judge save (Phases 2–3 + Close)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to read detector files + benchmark and produce a scoreboard, classic-way contrast, judge file, and still-uncertain line so artefacts land on disk for the Judge's scripts to inspect. You are NOT trying to write a great judge. Stub the judge; quality is not graded.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`.

## Protocol

**Hard rule (forcing-function):** invoke the **Read tool** on each prompt file BEFORE blockquote-pasting. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory fails the verbatim check.

**Prompts:**
- `/tmp/prompts/hallucination-bakeoff/prompt-004.txt` — scorer
- `/tmp/prompts/hallucination-bakeoff/prompt-005.txt` — classic-way contrast (3 lines)
- `/tmp/prompts/hallucination-bakeoff/prompt-006.txt` — save judge
- `/tmp/prompts/hallucination-bakeoff/prompt-007.txt` — take-home (SKIP — see truncation)

## Inputs

- `module-5/benchmark.md`, `module-5/detectors/*.md`, `module-5/briefing.md`
- `sources/*.md`, `module-3/retrievals/*.md`, `module-3/stances/*.md`

## Phase 2 — scorer

Paste prompt-004. Apply scorer spec: strict substring match, precision/recall/coverage, force-one-winner, ensemble cap at 2.

Write `module-5/scoreboard.md`:
`| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |`

Name winner (or 2-method ensemble) below table with one line of reasoning.

## Phase 2b — classic-way contrast

Paste prompt-005. Three lines in scrollback (not a new file):
1. Classic way to quality-check.
2. Faster or slower than benchmark.
3. Why.

## Phase 3 — save judge

Paste prompt-006. Write `judges/groundedness-judge.md` — under 20 lines. Heading + one-paragraph description + judge prompt + one-line `Known limit:` at end.

## Close — still-uncertain

Write one sentence to `module-5/still-uncertain.md`.

## Truncation — prompt-007

Skip execution. Log: `[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]`.

## Report

Scrollback: `.../instances/bootstrap-m5-verbatim-scorer-scrollback.md`.

Report: `.../instances/bootstrap-m5-verbatim-scorer-report.md`:

```markdown
# Actor — Bootstrap M5 scorer
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
- Read `/tmp/bootstrap-mocks/`.
- Overwrite `module-3/` or `module-4/`.
- Paraphrase prompts.
- Execute prompt-007.
- Run Debrief.
