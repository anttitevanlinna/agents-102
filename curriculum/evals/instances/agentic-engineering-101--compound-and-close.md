# Eval instance — AE101 M1 Ex3 "Compound and close"

**Target artifact:** `curriculum/exercises/compound-and-close.md`
**Module file:** `curriculum/trainings/agentic-engineering-101/getting-going.md`
**Eval template:** `curriculum/evals/exercise.md`

**Eval runs:**
- Not yet run as a standalone instance. Split 2026-04-23 late from legacy `agentic-engineering-101--getting-going.md`.

---

## The judges

### Primary — the leap test

After completing this exercise, the student can:
- Let Claude write `./CLAUDE.local.md` from the session's own evidence — not a template, not an interview, a rewrite driven by what actually happened
- Push back on the 3–5 line summary Claude reports, quoting a specific session moment where the rewrite misread
- Wire one MCP connector to the team's tracker and close the bug's ticket outside the repo with a real link

If a senior engineer walks out with a personal rules file born from their session, a live MCP connector, and a closed ticket, this exercise is good enough.

### Framing fidelity

The exercise's point: the compound step doesn't interview. The session is the evidence; Claude reviews it and writes; the student pushes back. The loop closes where the team reads it.

Anti-framings to avoid:
- Q1/Q2/Q3 retro (explicitly banned — `check_student_facing § 7`)
- Team `./CLAUDE.md` auto-PR'd (team-worthy rules get *flagged* for separate PR, never auto-pushed)
- MCP as a setup chore (it's the first outside-the-repo move — making the loop land where the team sees it)

### Learning goal fit

From the M1 module file:
- **Write** `./CLAUDE.local.md` via Claude reviewing session evidence — not interview-driven (Create)
- **Wire** one MCP connector to the team's tracker and close an external ticket (Apply)
- **Flag** team-worthy rules for separate PR against team `./CLAUDE.md` (Evaluate) — personal vs. team judgement

---

## TODO (next eval pass)

- Fill remaining judges from `curriculum/evals/exercise.md` template.
- Run LLM-as-judge on the exercise body.
- Run three-persona sim — the compound move (default-acceptance on Claude's summary) is the one Jin (fast operator) is most likely to rubber-stamp.
- Capability check: MCP install flow for GitHub Issues / Jira / Linear on the cohort's OS + tenant.
