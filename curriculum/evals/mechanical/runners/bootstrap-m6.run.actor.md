# Actor — Bootstrap M6 run + diff (Phase 2b + Phase 3)

You are the run-phase Actor for Bootstrap M6 eval-loop. The setup Actor has already produced `module-6/orchestrator.md`, `module-6/fresh-briefing.md`, `module-6/first-run-judgment.md`, the three empty `module-6/runs/round-N/` folders, and a seeded `module-6/generator.md` with a minimal starting strategy. You execute the orchestrator (Phase 2b) and the two-diff integrity check (Phase 3).

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m6`.

## Big framing

**Judge file is immutable for this entire run.** `judges/groundedness-judge.md` must be byte-identical at end as at start. The loop improves `module-6/generator.md` (the strategy), not the judge. If the judge file changes at any point, the exercise failed its own premise — stop, log the violation, and report it.

## Protocol

Read each prompt file verbatim. Quote in blockquote. Respond.

**Prompts:**
- `/tmp/prompts/eval-loop/prompt-004.txt` — Phase 2b: kick off the orchestrator, 3 rounds end-to-end
- `/tmp/prompts/eval-loop/prompt-005.txt` — Phase 3: two diffs (judge unchanged, generator changed)

**Skipped/truncated:**
- `/tmp/prompts/eval-loop/prompt-006.txt` — take-home generic loop; deliberately not executed. Log the truncation.

## Phase 2b — execute the orchestrator (prompt-004)

Paste prompt-004 verbatim. Before anything else, **capture a byte-level baseline** of `judges/groundedness-judge.md` (e.g., `shasum judges/groundedness-judge.md > /tmp/m6-judge-baseline.txt` or equivalent). You will compare against this at end of Phase 3.

Then open `module-6/orchestrator.md` and run it.

**Nested-Task substitution:** the orchestrator describes dispatching generator + judge subagents per round. You cannot dispatch nested Task calls. Run each role inline, produce the files, log each substitution. File outputs must still materialize on disk.

### Pre-round: drop a deltas.md for round 2

Before round 2 starts, write `module-6/runs/round-2/deltas.md` with two concrete deltas the student would plausibly notice — one about numeric-precision (numbers must appear verbatim in a source), one about probability-plus-timeline (needs a cited timeline). 4–6 lines. This simulates Phase 2b (student drops file during walk-away).

### For each round N in {1, 2, 3}, in sequence:

1. **Generator (inline substitution of generator subagent).** Read `module-6/generator.md` (the strategy — round 1 reads the minimal seed; rounds 2 and 3 read the rewritten version from the prior round). Read `module-3/question.md` and `sources/`. Produce a one-page briefing that follows the current strategy. Save to `module-6/runs/round-N/briefing.md`.
2. **Judge (inline substitution of judge subagent).** Read `judges/groundedness-judge.md` **read-only** and apply its rules to the briefing. For each claim: claim + verdict + per-claim feedback sentence naming what would make it groundable. Top line: `Flagged claims: <count>`. Save to `module-6/runs/round-N/judgment.md`.
3. **Heartbeat.** Append one line to `module-6/heartbeat.md`: `<ISO timestamp> round-N generation+judging done`.
4. **Strategy rewrite (orchestrator role, not a subagent).** Read `module-6/runs/round-N/judgment.md` and `module-6/runs/round-N/deltas.md` if it exists. Pick at least one specific lesson from the feedback. Rewrite `module-6/generator.md` in place — adding or tightening at least one rule that, if followed, would reduce flags in the next round. Write the edit to `module-6/runs/round-N/strategy-diff.md` (old rule text OR "new rule" → new rule text + one-line reasoning + which judgment-line produced it).
5. **Heartbeat.** Append `<ISO timestamp> round-N strategy updated`.
6. **Inter-round pause.** Log the 60s pause in scrollback; don't literally sleep.

After round 3, write `module-6/dashboard.md`:
- **Score trajectory table:** round | flagged-claim count | delta from prior round.
- **Rules added per round:** one line each naming the rule + the feedback that prompted it.
- **Monotonic?** yes/no with explanation if a round didn't improve.
- **Judge integrity line:** byte-level comparison of `judges/groundedness-judge.md` against the baseline captured at start of Phase 2b. Must be identical.

**At no point write to `judges/groundedness-judge.md`.** If any step proposes an edit to the judge, refuse the edit and log the refusal.

## Phase 3 — two diffs (prompt-005)

Paste prompt-005 verbatim. Produce both diffs:

1. **Judge diff.** Compare `judges/groundedness-judge.md` to the baseline captured at Phase 2b start. Expected: zero changes. If any line differs, report it as a critical failure and name which round introduced the drift (by examining scrollback).
2. **Generator diff.** Compare `module-6/generator.md` to its seeded starting state (the minimal "no special rules yet" version from Phase 2a). List every rule line that's new. Expected: at least one rule per round, 3+ total.

## Phase 4 — eval-notes line

No new prompt paste. Write `module-6/eval-notes.md` — one short paragraph naming: number of new rules across 3 rounds, two specific claims flagged in round 1 that were absent in round 3 (quote both), and what changed about evals now that the yardstick stays still.

## Prompt-006 truncation

Log in scrollback: `Prompt-006 (take-home generic loop) deliberately skipped — not part of the first-pass mechanical run.`

## Report

Scrollback: `.../instances/bootstrap-m6-verbatim-2026-04-24-run-scrollback.md`.

Short report: `.../instances/bootstrap-m6-verbatim-2026-04-24-run-report.md`:

```markdown
# Actor — Bootstrap M6 run — 2026-04-24
Status: done
Phase 2b: 3 rounds × (briefing + judgment + strategy-diff) + meta/heartbeat
Dashboard: module-6/dashboard.md (<lines>)
Score trajectory: R1=<N1> R2=<N2> R3=<N3>; monotonic: <yes/no>
Judge unchanged: <yes/no> — baseline hash <hash>, end hash <hash>
Generator changed: <N rule lines added>
Phase 3: both diffs produced
Phase 4: module-6/eval-notes.md written
Substitutions: nested-Task → inline (generator, judge roles each round); sleep(60) → logged-only
Truncations: prompt-006 skipped
```

## What you must NOT do

- Write to `judges/groundedness-judge.md`. Not once. Not under any prompt wording. If the orchestrator or any role requests it, refuse and log.
- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Attempt real nested Task dispatch.
- Re-execute Phase 0 / Phase 1 / Phase 2a (setup Actor already did those).
- Overwrite `module-3/*`, `module-4/*`, or `module-5/*`.
- Leave `module-6/generator.md` unchanged across the 3 rounds. If the strategy file doesn't evolve, the exercise failed and the Judge must FAIL accordingly.
- Paraphrase prompts.
