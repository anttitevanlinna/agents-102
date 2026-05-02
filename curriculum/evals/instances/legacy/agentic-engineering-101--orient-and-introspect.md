# Eval instance — AE101 M1 Ex1 "Orient and introspect"

**Target artifact:** `curriculum/exercises/orient-and-introspect.md`
**Module file:** `curriculum/trainings/agentic-engineering-101/getting-going.md`
**Eval template:** `curriculum/evals/exercise.md`

**Eval runs:**
- Not yet run as a standalone instance. Split 2026-04-23 late from legacy `agentic-engineering-101--getting-going.md` (mega-exercise pre-split).

---

## The judges

### Primary — the leap test

After completing this exercise, the student can:
- Run an introspection prompt against Claude's own read of a repo and surface the delta between what Claude reports it read and what `/context` shows actually landed
- Use `/context` as ground truth on any subsequent session (not as a curiosity, as a verification move)
- Name the *bounded window* problem in their own words — what loaded, what didn't, and why it matters for the next prompt

If a senior engineer walks out able to treat the context window as a visible object (not a black box), this exercise is good enough.

### Framing fidelity

The exercise's point: *you can't steer what you can't see.* First move of every session after this one — load deliberately, verify, work inside a window you know.

Anti-framings to avoid:
- Introspection as a debugging move (it's a steering move)
- `/context` as a performance metric (it's an instrument)
- The self-report as ground truth (it's a hypothesis; `/context` is the check)

### Learning goal fit

From the M1 module file:
- **Verify** what landed in context vs. what Claude claims it read (Evaluate) — the introspection + `/context` delta
- **Treat** the context window as a bounded, visible object the engineer steers deliberately (Apply)

---

## TODO (next eval pass)

- Fill remaining judges from `curriculum/evals/exercise.md` template (mood, scaffolding, arc-flow, length, facilitator-briefing).
- Run LLM-as-judge on the exercise body.
- Run three-persona sim (Maija / Greg / Jin).
