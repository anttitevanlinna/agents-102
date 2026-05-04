# Actor — Agents 101 M6 run + diff (Phase 2b + Phase 3)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to execute the orchestrator (3 rounds), produce the two integrity diffs, and leave file artefacts (per-round briefings/judgments/strategy-diffs, dashboard, eval-notes) on disk for the Judge's scripts to inspect. You are NOT trying to produce great briefings or sharp strategy rules. Stub generated content. The load-bearing invariant: NEVER write to `judges/groundedness-judge.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m6`.

## Big framing

`judges/groundedness-judge.md` must be byte-identical at end as at start. The loop improves `module-6/generator.md`, not the judge.

## Protocol

**Hard rule (forcing-function):** invoke the **Read tool** on each prompt file BEFORE blockquote-pasting. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory fails the verbatim check. Two Reads, two pastes (prompt-006 truncated).

**Prompts:**
- `/tmp/prompts/eval-loop/prompt-004.txt` — Phase 2b: kick off orchestrator, 3 rounds
- `/tmp/prompts/eval-loop/prompt-005.txt` — Phase 3: two diffs

**Truncated:** `/tmp/prompts/eval-loop/prompt-006.txt` — take-home; not executed.

## Phase 2b — execute orchestrator (prompt-004)

Paste prompt-004 verbatim. **First, capture byte-level baseline:** `shasum judges/groundedness-judge.md > /tmp/m6-judge-baseline.txt`.

Open `module-6/orchestrator.md` and run it.

**Nested-Task substitution:** generator + judge roles run inline; file outputs materialize on disk; log each substitution.

### Pre-round 2: drop deltas.md

Before round 2 strategy rewrite, write `module-6/runs/round-2/deltas.md` — 4-6 lines with two concrete deltas (one numeric-precision, one probability-plus-timeline).

### For each round N in {1, 2, 3}:

1. **Generator (inline).** Read `module-6/generator.md`, `module-3/question.md`, `sources/`. Produce one-page briefing per current strategy. Save `module-6/runs/round-N/briefing.md` (skeleton OK).
2. **Judge (inline).** Read `judges/groundedness-judge.md` **read-only**, apply rules to briefing. Each claim: claim + verdict + per-claim feedback sentence. Top line: `Flagged claims: <count>`. Save `module-6/runs/round-N/judgment.md`.
3. **Heartbeat.** Append `<ISO timestamp> round-N generation+judging done` to `module-6/heartbeat.md`.
4. **Strategy rewrite (orchestrator role).** Read `module-6/runs/round-N/judgment.md` and `deltas.md` if it exists. Rewrite `module-6/generator.md` adding/tightening at least one rule that would reduce flags next round. Write old→new to `module-6/runs/round-N/strategy-diff.md` (one-line reasoning + which judgment-line produced it).
5. **Heartbeat.** Append `<ISO timestamp> round-N strategy updated`.
6. **Inter-round pause.** Log 60s pause; don't literally sleep.

After round 3, write `module-6/dashboard.md`:
- **Score trajectory table:** round | flagged-claim count | delta from prior round.
- **Rules added per round:** one line each.
- **Monotonic?** yes/no with explanation.
- **Judge integrity line:** `shasum` of `judges/groundedness-judge.md` against baseline.

**Never write to `judges/groundedness-judge.md`.** Refuse and log if any step proposes it.

## Phase 3 — two diffs (prompt-005)

Paste prompt-005 verbatim. Produce both:

1. **Judge diff.** Compare `judges/groundedness-judge.md` to baseline. Expected: zero changes. If any line differs, report critical failure + name the round.
2. **Generator diff.** Compare `module-6/generator.md` to seeded starting state. List every new rule line. Expected: ≥3 total.

## Phase 4 — eval-notes line

Write `module-6/eval-notes.md` — one short paragraph: number of new rules across 3 rounds, two specific R1-flagged claims absent in R3 (quote both), what changed about evals.

## Prompt-006 truncation

Log: `Prompt-006 (take-home generic loop) deliberately skipped — not part of the first-pass mechanical run.`

## Report

Scrollback: `.../instances/agents-101-m6-verbatim-run-scrollback.md`.

Report: `.../instances/agents-101-m6-verbatim-run-report.md`:

```markdown
# Actor — Agents 101 M6 run
Status: done
Phase 2b: 3 rounds × (briefing + judgment + strategy-diff) + heartbeat
Dashboard: module-6/dashboard.md (<lines>)
Score trajectory: R1=<N1> R2=<N2> R3=<N3>; monotonic: <yes/no>
Judge unchanged: <yes/no> — baseline hash <hash>, end hash <hash>
Generator changed: <N rule lines added>
Phase 3: both diffs produced
Phase 4: module-6/eval-notes.md written
Substitutions: nested-Task → inline; sleep(60) → log-only
Truncations: prompt-006 skipped
```

## What you must NOT do

- Write to `judges/groundedness-judge.md`. Not once. Refuse and log if asked.
- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Attempt real nested Task dispatch.
- Re-execute Phase 0/1/2a (setup Actor's job).
- Overwrite `module-3/*`, `module-4/*`, `module-5/*`.
- Leave `module-6/generator.md` unchanged across the 3 rounds.
- Paraphrase prompts.
