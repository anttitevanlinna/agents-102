# AE101 M6 — generation plan

Durable state for the M6 generation run. Subagents and loop iterations read + update this. Pairs with `ae101-m6-reference.md` (goal) and `ae101-m6-verifier.md` (quality gate).

---

## Current phase

**Pre-dispatch.** Reference, plan, verifier landed. Awaiting Antti's green-light to fire Phase A.

## Phases

### Phase A — parallel subagent dispatch

Three subagents, disjoint file ownership, fired together. Each reads the reference + this plan + the verifier + the strategy § M6 + the M5 shape references + the compendiums before writing. Each runs the verifier against every file before save. Each appends decisions and surprises to `ae101-m6-session-notes.md` before returning.

| Subagent | Files owned | Shape reference |
|---|---|---|
| 1 — exercises | `exercises/spot-gaps-build-the-loop.md` + `exercises/arc-retrospective.md` | `exercises/diagnose-and-resend.md` |
| 2 — closing lecture | `lectures/the-loop-has-a-name.md` | `lectures/what-packaging-is.md` |
| 3 — module file + reference + eval stub | `trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` + `reference/scheduled-agents.md` + `evals/instances/agentic-engineering-101--spot-gaps-build-the-loop.md` | `trainings/agentic-engineering-101/learn-from-the-test.md` |

Each subagent returns a completion report: files written, verifier verdicts, decisions summary (full list in notes), escalations, surprising Claude-behaviour moments.

### Phase B — main-thread alignment + Story draft

Runs after all three subagents return. Main thread, sequential:

1. Read subagent completion reports. Update session notes with drift entries not yet in the file.
2. Edit `bosser-strategy:content-strategy-agentic-engineering-101.md` § *State of play* — add M6 to the current-shape line; confirm Story opener + arc-retrospective + simple-round Debrief are live.
3. Edit `site/curriculum.html` `MODULES` array for AE101 — M6 entry at position 6, slug `spot-gaps-build-the-loop`, title *Spot gaps, build the loop*.
4. Draft `curriculum/lectures/story-of-module-6.md` from session notes — first-person past tense, signed *— Antti*, 5–7 min. Stats block (live numbers from notes) + two or three real fails + generalize + land. Flag as *draft; Antti edits in final voice* in the maintainer block.

### Phase C — `/loop`

Self-paced `/loop` fires against the full M6 file set. Verifier + deterministic grep + cross-alignment check per iteration. Two-clean-passes stop. Every iteration appends to session notes. On stop: final summary in notes for Story lecture.

## Decisions log

- Subagent decisions → session notes § *Subagent decisions*.
- Main-thread decisions → session notes § *Main-thread decisions*.
- Loop decisions → session notes § *Loop iterations*.

## What didn't work

(empty — populated by loop iterations + subagent surprise reports)

## Escalations

(empty — populated by subagents + loop when they hit genuine decision-blocks)
