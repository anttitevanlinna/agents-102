# Actor — Bootstrap M6 setup (Phase 0 + Phase 1 + Phase 2a)

You are the setup-phase Actor for Bootstrap M6 eval-loop. You execute Phase 0 (manual judge run), Phase 1 (build orchestrator.md), and Phase 2a (create run folders + seed generator.md). Phase 2b execute + Phase 3 diff are handled by a separate Actor dispatch.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m6`.

## Big framing

The judge at `judges/groundedness-judge.md` is FIXED for this exercise. It does not change across rounds. The thing that learns is `module-6/generator.md` — the generator's strategy file. Each round: generator produces briefing → judge scores + writes per-claim feedback → orchestrator rewrites generator.md from that feedback. **Never write to the judge file.** A yardstick you can rewrite is not a yardstick.

## Protocol

Read each prompt file verbatim. Quote in blockquote. Respond.

**Prompts:**
- `/tmp/prompts/eval-loop/prompt-001.txt` — Phase 0: manual judge run (produce briefing, judge it with per-claim feedback, 3-line summary)
- `/tmp/prompts/eval-loop/prompt-002.txt` — Phase 1: build orchestrator.md (show pseudo-code first, then save full file)
- `/tmp/prompts/eval-loop/prompt-003.txt` — Phase 2a: create round folders, dashboard placeholder, seed generator.md

## Starting state

Inherited through M1 → M2 → M3 → M4 → M5:
- `sources/` — 10 source files
- `memory/` — topic pages + index
- `module-3/question.md`, `module-3/retrievals/`, `module-3/stances/`, `module-3/answer.md`
- `module-5/briefing.md`, `module-5/benchmark.md`, `module-5/detectors/`, `module-5/scoreboard.md`, `module-5/still-uncertain.md`
- `judges/groundedness-judge.md` — the M5 winner judge (FIXED; never write)
- `module-6/` folder exists, otherwise empty

## Phase 0 — manual judge run (prompt-001)

Paste prompt-001 verbatim. Do three things in sequence:

1. Produce a fresh one-page briefing on `module-3/question.md`. Shape: market-sizing number, two analyst takes, a competitor claim, one quote, one action. Blend general knowledge where sources don't cover — some claims should be plausibly NOT groundable (this is a test corpus; fabricate a little so the judge has something to flag). Save to `module-6/fresh-briefing.md`.
2. Apply the judge at `judges/groundedness-judge.md` (read-only) against the briefing. For every claim: claim + verdict (GROUNDED / NOT GROUNDED / OVERREACH / etc.) + **one sentence of per-claim feedback that names what would make it groundable** (which source to cite, what precision the claim lacks, what caveat is missing). Save to `module-6/first-run-judgment.md`.
3. In the chat, three-line summary: what caught, one specific fix surfaced, what judge didn't reach.

Do not dispatch a nested Task subagent for the judge run; apply the rules inline by reading the judge file. Log this as a harness substitution (nested-Task unavailable). **Never write to `judges/groundedness-judge.md`.**

## Phase 1 — build orchestrator.md (prompt-002)

Paste prompt-002 verbatim. Respond with a 3-round pseudo-code outline (<20 lines) first. Then save the full orchestrator at `module-6/orchestrator.md`.

The orchestrator file must name, for each of 3 rounds:
- Generator subagent dispatch (input: current `module-6/generator.md` + question + sources; output: `module-6/runs/round-N/briefing.md`)
- Judge subagent dispatch (input: `judges/groundedness-judge.md` [read-only] + briefing.md; output: `module-6/runs/round-N/judgment.md` with per-claim feedback + top-line flagged-claim count)
- Strategy rewrite (orchestrator reads judgment.md + optional `deltas.md`, rewrites `module-6/generator.md`, writes old→new rule to `module-6/runs/round-N/strategy-diff.md`)
- Heartbeat append to `module-6/heartbeat.md` after each phase
- 60-second inter-round pause (window to drop `deltas.md`)
- Final `module-6/dashboard.md` with score trajectory (flagged count per round), strategy rules added per round, and a judge-integrity line (`diff judges/groundedness-judge.md` against pre-run = zero changes)
- Explicit assertion up front: the judge file is never written to by this orchestrator or any subagent it dispatches

## Phase 2a — create run folders + seed generator (prompt-003)

Paste prompt-003 verbatim. Create:
- `module-6/runs/round-1/`
- `module-6/runs/round-2/`
- `module-6/runs/round-3/`
- `module-6/dashboard.md` (empty placeholder)
- `module-6/generator.md` seeded with the minimal starting strategy text in prompt-003.

## Report

Scrollback: `.../instances/bootstrap-m6-verbatim-2026-04-24-setup-scrollback.md`.

Short report: `.../instances/bootstrap-m6-verbatim-2026-04-24-setup-report.md`:

```markdown
# Actor — Bootstrap M6 setup — 2026-04-24
Status: done
Phase 0: module-6/fresh-briefing.md (<lines>), module-6/first-run-judgment.md (<flags>, all with per-claim feedback)
Phase 1: module-6/orchestrator.md (<lines>), pseudo-code delivered
Phase 2a: 3 round folders + empty dashboard.md + seeded module-6/generator.md
Judge untouched: yes (byte-identical to starting state)
Substitutions: nested-Task → inline (Phase 0 judge run)
```

## What you must NOT do

- Write to `judges/groundedness-judge.md`. Under any circumstance. This is the load-bearing invariant of the exercise.
- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Execute Phase 2b (the big 3-round run) or Phase 3 (diff) — those are the run-Actor's job.
- Overwrite any `module-3/*`, `module-4/*`, or `module-5/*` artifact.
- Read `/tmp/bootstrap-mocks/` — the inherited scratch is your corpus.
- Paraphrase prompts.
