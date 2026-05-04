# Lint — Time Budget

**Catches:** module bloat past the 1h45 Agents 101 target. Per SKILL.md "Module session runtime": Connections 8–12 / Lecture 10–15 / Exercise 55–70 / Debrief 12–18 / Bridge 3–5.

## Run

```
You are running the time-budget lint on Agents 101 modules.

TARGETS: all files in curriculum/trainings/agents-101/ whose name doesn't start with 'prework' (prework has a separate time target — 45 min total).

For each module file:

=== CHECK 1 — Phase targets ===
Find each of the five phases: Connections, Lectures (one or more), Exercises (one or more), Debrief, Bridge.
For each phase:
- Read the inlined content (follow include-links to the canonical exercise/lecture file).
- Find time target if explicitly stated (usually a **Time:** line at the bottom of exercise/lecture files).
- If explicit: record target lower and upper bounds.
- If missing: flag "[NO TIME STATED]" as a finding.

=== CHECK 2 — Sum against 1h45 budget ===
Sum the lower bounds and upper bounds across all phases. Targets:
- Lower bound sum: ≥ 90 min (too loose if lower)
- Upper bound sum: ≤ 110 min (bloat if higher)
- Missing phases or missing time: flagged separately.

=== CHECK 3 — Per-phase vs. ratio guidance ===
Compare each phase's time to SKILL.md targets:
- Connections 8–12, Lectures 10–15 (each), Exercises 55–70 (total), Debrief 12–18, Bridge 3–5
- Flag phases >20% outside the target.

=== OUTPUT ===
Per-module table:
| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | ... | 8-12 | OK / over / under / missing |
| Lectures | ... | 10-15 ea | ... |
| ... | | | |
| TOTAL | X-Y min | 90-110 | FIT / BLOAT / THIN |

Then a one-line summary: FIT / BLOAT / THIN / MISSING-TIMES.

If all modules FIT with all times stated: output "PASS — all modules within 1h45 budget."
```

## Known debt

Pass 2 / Pass 3 content for most modules does not yet have explicit time targets per phase. Expect MISSING-TIMES on first run. That's the finding — the fix is adding time estimates as Pass 3 completes per module.
