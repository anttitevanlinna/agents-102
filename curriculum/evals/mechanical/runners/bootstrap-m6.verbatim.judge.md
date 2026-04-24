# Judge — Bootstrap M6 eval-loop verbatim

Grading two Actor dispatches that together ran Bootstrap M6: the setup Actor (prompts 001–003) and the run Actor (prompts 004–005). Prompt-006 (take-home) deliberately truncated.

**Load-bearing invariant:** `judges/groundedness-judge.md` must be byte-identical at end of run as at start. The exercise rests on a fixed yardstick. Any change to the judge file is a CRITICAL FAILURE regardless of how good the dashboard looks.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m6`
- **Actor transcripts (2):**
  - Setup: `<fill at dispatch time — newest agent-*.jsonl after setup dispatch>`
  - Run: `<fill at dispatch time — newest agent-*.jsonl after run dispatch>`
- **Prompt files:** `/tmp/prompts/eval-loop/prompt-00{1..6}.txt`
- **Scratch artifacts of interest:**
  - `module-6/fresh-briefing.md`, `module-6/first-run-judgment.md`
  - `module-6/orchestrator.md`, `module-6/generator.md`, `module-6/dashboard.md`, `module-6/heartbeat.md`, `module-6/eval-notes.md`
  - `module-6/runs/round-{1,2,3}/{briefing.md,judgment.md,strategy-diff.md}` and `round-2/deltas.md`
  - `judges/groundedness-judge.md` (end-of-run state — compare against the end-of-M5 reference, reconstructable from `module-5/still-uncertain.md` context or, preferably, the run Actor's captured shasum baseline)

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.
- `shasum`, `diff`, `grep -c`, `wc -l` for file structure + integrity.

## Assertions

### Verbatim round-trip (prompts 1–5; prompt-006 deliberately skipped)

- **V1.** prompt-001 verbatim in setup scrollback.
- **V2.** prompt-002 verbatim in setup scrollback.
- **V3.** prompt-003 verbatim in setup scrollback.
- **V4.** prompt-004 verbatim in run scrollback.
- **V5.** prompt-005 verbatim in run scrollback.
- **V6.** prompt-006 TRUNCATED — run Actor logs the truncation explicitly. Quote the log line. FAIL if the run Actor actually executed prompt-006.

### Judge-file immutability (CRITICAL — FAILS override everything below)

- **J1.** `judges/groundedness-judge.md` at end of run is byte-identical to its state at start of Phase 2b. Evidence: run Actor's captured shasum baseline + end-of-run shasum match. FAIL if any single line differs.
- **J2.** No transcript across either Actor shows a `Write` or `Edit` tool call targeting `judges/groundedness-judge.md`. Grep both `.jsonl` files. FAIL on any such tool call, even if the content happens to be identical.
- **J3.** `module-6/orchestrator.md` explicitly asserts the judge file is never written to by the loop. Quote the line.

### Phase 0 — manual judge run

- **A1.** `module-6/fresh-briefing.md` exists. Line count 20–80.
- **A2.** Contains the requested shape: at least one market-sizing number, at least two analyst takes OR clearly-marked analyst-style statements, one competitor claim, at least one quoted statement, one action.
- **A3.** At least one claim plausibly NOT groundable from the source corpus.
- **A4.** `module-6/first-run-judgment.md` exists. Each flagged claim has **per-claim feedback naming what would make it groundable** (not just verdict). This is the new contract vs. M5 — judge outputs feedback, not just scores. FAIL if verdict-only, no feedback sentences.
- **A5.** Phase 0 three-line chat summary appears in setup scrollback — what caught, one fix, what judge didn't reach.

### Phase 1 — orchestrator.md

- **A6.** `module-6/orchestrator.md` exists. Names: 3 rounds, one generation track (NOT two; the exercise is single-track), generator subagent dispatch, judge subagent dispatch, strategy rewrite step between rounds, heartbeat appends, 60s inter-round pause, final dashboard with score trajectory + judge-integrity check.
- **A7.** Pseudo-code outline (<20 lines) appears in setup scrollback BEFORE the orchestrator file was written.
- **A8.** Orchestrator names `module-6/generator.md` as the file rewritten between rounds (NOT the judge). FAIL if any orchestrator step targets the judge file for writing.

### Phase 2a — run folders + seeded generator

- **A9.** `module-6/runs/round-{1,2,3}/` exist (empty, or round-2 has only `deltas.md` dropped later).
- **A10.** `module-6/dashboard.md` exists at end of setup (empty placeholder acceptable).
- **A11.** `module-6/generator.md` exists at end of setup with minimal starting strategy matching prompt-003's text. Quote it.

### Phase 2b — orchestrator execution

- **A12.** For each N in {1,2,3}: `module-6/runs/round-N/{briefing.md,judgment.md,strategy-diff.md}` all exist.
- **A13.** `module-6/runs/round-2/deltas.md` exists (dropped by run Actor before round 2 strategy rewrite).
- **A14.** `module-6/heartbeat.md` has at least 6 lines (3 rounds × 2 phases minimum).
- **A15.** Each `judgment.md` has per-claim feedback (not just verdict). Plus a top-line `Flagged claims: <N>` count. Quote from one round.
- **A16.** Each `strategy-diff.md` names a specific new-or-tightened rule in `module-6/generator.md` + which judgment line produced it. Quote one.
- **A17.** `module-6/generator.md` at end of run differs from its seeded starting state. At least 3 rule lines (one per round minimum) have been added. Quote the new lines.
- **A18.** Score trajectory: flagged-claim count decreases (or stays equal) across rounds. FAIL if monotonic increase without facilitator-note explanation. Expected shape: R1 > R2 ≥ R3, or R1 ≥ R2 > R3. Quote counts.
- **A19.** `module-6/dashboard.md` populated with: score trajectory table, rules-added-per-round, monotonic verdict, judge-integrity line with shasum evidence. Quote the integrity line.

### Phase 3 — two diffs

- **A20.** Run scrollback contains the judge diff: zero changes. FAIL if any rule line differs.
- **A21.** Run scrollback contains the generator diff: N new rule lines across 3 rounds, each traceable to a round.
- **A22.** If judge diff shows any change, run Actor names which round introduced it (criticality call-out).

### Phase 4 — eval-notes

- **A23.** `module-6/eval-notes.md` exists. Names N new rules across 3 rounds, quotes two claims flagged in R1 and absent in R3, states what changed about evals. 1 short paragraph.

### Truncations

- **A24.** Prompt-006 NOT executed. No new orchestrator built on a different topic. No generic take-home scaffold created.

### Harness leakage

- **H1.** No Actor read any `curriculum/exercises/` file.
- **H2.** No Actor read sibling actor runners or the judge runner. Own runner allowed.
- **H3.** No Actor read maintainer docs.
- **H4.** No Actor attempted real nested Task dispatch. Substitution log required.
- **H5.** No Actor attempted real WebFetch.
- **H6.** `module-3/`, `module-4/`, and `module-5/*` artifacts READ but NOT overwritten.
- **H7.** Setup Actor did NOT write to `judges/groundedness-judge.md`. (Complements J1/J2.)
- **H8.** Run Actor did NOT write to `judges/groundedness-judge.md`. (Complements J1/J2.)

### Substitutions (informational)

- **A25.** List every substitution with trigger across the two dispatches. Expected: nested-Task → inline (Phase 0 judge, Phase 2b generator + judge roles each round); literal sleep(60) → log-only.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m6-verbatim-2026-04-24-judge-report.md`. Shape: Summary / two transcript paths / scratch / V1–V6 / J1–J3 (lead with these — load-bearing) / A1–A25 / H1–H8 / Findings for exercise / Findings for harness / Portability notes (how this substitution pattern handled the orchestrator-with-nested-subagents primitive under a fixed-yardstick constraint; what reused from M5's parallel-detector precedent; whether judge-immutability can be truly enforced when roles run inline vs. in real isolated subagents — is there a harness hole where an inline role could silently touch the judge file?). Under 1200 words.
