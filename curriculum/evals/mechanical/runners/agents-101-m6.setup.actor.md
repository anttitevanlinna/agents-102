# Actor — Agents 101 M6 setup (Phase 0 + Phase 1 + Phase 2a)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to execute Phases 0/1/2a and leave file artefacts (briefing, judgment, orchestrator, run folders, seeded generator) on disk for the Judge's scripts to inspect. You are NOT trying to author a great orchestrator or briefing. Stub generated content. The load-bearing invariant: NEVER write to `judges/groundedness-judge.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m6`.

## Big framing

The judge at `judges/groundedness-judge.md` is FIXED. The thing that learns is `module-6/generator.md`. Never write to the judge file.

## Protocol

**Hard rule (forcing-function):** invoke the **Read tool** on each prompt file BEFORE blockquote-pasting. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory fails the verbatim check. Three Reads, three pastes.

**Prompts:**
- `/tmp/prompts/eval-loop/prompt-001.txt` — Phase 0: manual judge run
- `/tmp/prompts/eval-loop/prompt-002.txt` — Phase 1: build orchestrator.md
- `/tmp/prompts/eval-loop/prompt-003.txt` — Phase 2a: round folders + seeded generator

## Starting state

Inherited through M1 → M5: `sources/`, `memory/`, `module-3/{question,retrievals,stances,answer}.md`, `module-5/{briefing,benchmark,detectors,scoreboard,still-uncertain}.md`, `judges/groundedness-judge.md` (FIXED), `module-6/` empty.

## Phase 0 — manual judge run (prompt-001)

Paste prompt-001 verbatim. Three steps:

1. Produce one-page briefing on `module-3/question.md`. Shape: market-sizing number, two analyst takes, competitor claim, one quote, one action. Some claims plausibly NOT groundable (test corpus). Save to `module-6/fresh-briefing.md`.
2. Apply judge at `judges/groundedness-judge.md` (read-only) against the briefing. Each claim: claim + verdict + one-sentence per-claim feedback naming what would make it groundable. Save to `module-6/first-run-judgment.md`.
3. Three-line scrollback summary: what caught, one fix, what judge didn't reach.

Inline judge run (no nested Task). Log harness substitution. **Never write to `judges/groundedness-judge.md`.**

## Phase 1 — build orchestrator.md (prompt-002)

Paste prompt-002. Respond with 3-round pseudo-code outline (<20 lines) first. Then save full orchestrator at `module-6/orchestrator.md`.

Orchestrator must name, for each of 3 rounds:
- Generator subagent dispatch (input: `module-6/generator.md` + question + sources; output: `module-6/runs/round-N/briefing.md`)
- Judge subagent dispatch (input: `judges/groundedness-judge.md` [read-only] + briefing.md; output: `module-6/runs/round-N/judgment.md` with per-claim feedback + top-line flagged-claim count)
- Strategy rewrite (read judgment + optional `deltas.md`, rewrite `module-6/generator.md`, write old→new rule to `module-6/runs/round-N/strategy-diff.md`)
- Heartbeat append to `module-6/heartbeat.md` after each phase
- 60-second inter-round pause
- Final `module-6/dashboard.md` with score trajectory, rules added per round, judge-integrity line
- Explicit assertion up front: judge file is never written to

## Phase 2a — create run folders + seed generator (prompt-003)

Paste prompt-003. Create:
- `module-6/runs/round-{1,2,3}/`
- `module-6/dashboard.md` (empty placeholder)
- `module-6/generator.md` seeded with minimal starting strategy text from prompt-003

## Report

Scrollback: `.../instances/agents-101-m6-verbatim-setup-scrollback.md`.

Report: `.../instances/agents-101-m6-verbatim-setup-report.md`:

```markdown
# Actor — Agents 101 M6 setup
Status: done
Phase 0: module-6/fresh-briefing.md (<lines>), module-6/first-run-judgment.md (<flags>)
Phase 1: module-6/orchestrator.md (<lines>), pseudo-code delivered
Phase 2a: 3 round folders + empty dashboard.md + seeded generator.md
Judge untouched: yes
Substitutions: nested-Task → inline (Phase 0 judge run)
```

## What you must NOT do

- Write to `judges/groundedness-judge.md`. Under any circumstance.
- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Execute Phase 2b or Phase 3 (run-Actor's job).
- Overwrite `module-3/*`, `module-4/*`, `module-5/*`.
- Read `/tmp/agents-101-mocks/`.
- Paraphrase prompts.
