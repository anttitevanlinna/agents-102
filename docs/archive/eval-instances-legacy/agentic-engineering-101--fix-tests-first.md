# Eval instance — AE101 M1 Ex2 "Fix tests-first"

**Target artifact:** `curriculum/exercises/fix-tests-first.md`
**Module file:** `curriculum/trainings/agentic-engineering-101/getting-going.md`
**Eval template:** `curriculum/evals/exercise.md`

**Eval runs:**
- Not yet run as a standalone instance. Split 2026-04-23 late from legacy `agentic-engineering-101--getting-going.md`.

---

## The judges

### Primary — the leap test

After completing this exercise, the student can:
- Run tests-first, root-cause-driven on a real bug in their own repo — failing test lands before the fix lands
- Read a diff line-by-line and push back on at least one line Claude wrote that isn't what they'd have written
- Ship a real PR in 35–40 min (not a demo — a PR their team can merge)

If a senior engineer walks out having run the tests-first + diff-push-back loop with an agent on a real codebase, this exercise is good enough.

### Framing fidelity

The exercise's point: tests-first and root-cause-driven is one discipline. Running it with an agent is a second discipline. Both get practised here.

Anti-framings to avoid:
- Plan mode as the centerpiece — it's deliberately absent in Ex2; the compound move lives in Ex3
- Diff-reading as compliance — it's a push-back move, not a checkbox
- The bug as the point — the bug is the vehicle

### Learning goal fit

From the M1 module file:
- **Run** tests-first bug fix end-to-end on a real bug in your own repo, with a failing test committed before the fix (Apply)
- **Push back** on at least one line of the agent's diff (Analyze) — not *"looks fine"* rubber-stamping

---

## TODO (next eval pass)

- Fill remaining judges from `curriculum/evals/exercise.md` template.
- Run LLM-as-judge on the exercise body.
- Run three-persona sim — the diff-push-back beat is the one most likely to surface rubber-stamp risk under Jin (fast operator).
