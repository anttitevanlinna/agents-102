# Arc Pass — Static end-to-end eval

Read all 8 Bootstrap modules + the content-strategy arc **in one session** before any manual run. Catches arc-level drift that per-exercise evals miss by design: stolen moods, premature rescues, seam breaks, vocabulary leaks across modules. Cheap (~10 min, one Judge prompt); runs without spinning up Teacher/Builder/student.

**Run this BEFORE the manual end-to-end run.** The manual run is scarce; spend it on what only a live session reveals (Teacher Claude facilitation quality, felt-mood timing, persona drift). Don't burn it on arc problems a Judge can flag statically.

## How to use

1. Open a fresh Claude session at the repo root.
2. Paste the prompt below.
3. Read the report. Fix anything flagged at severity 3+.
4. Re-run after fixes until clean. Then proceed to the manual run.

## Judge prompt

```
You are auditing the full Bootstrap arc for end-to-end coherence. This is a single-pass static eval across 8 modules. Read these files in order:

ARC CONTRACT:
- bosser-strategy:content-strategy.md (focus on the mood-arc synthesis section + per-module "Mood (deliberate)" paragraphs)
- philosophy.md (the 19 beliefs)

MODULES IN SEQUENCE:
- curriculum/trainings/bootstrap/prework.md
- curriculum/trainings/bootstrap/getting-going.md (M1)
- curriculum/trainings/bootstrap/building-agent-systems.md (M2)
- curriculum/trainings/bootstrap/evaluations.md (M3) [check ordering vs current state-of-play]
- curriculum/trainings/bootstrap/security.md (M4)
- curriculum/trainings/bootstrap/output-quality.md (M5)
- curriculum/trainings/bootstrap/multi-agent-systems.md (M6) [check ordering]
- curriculum/trainings/bootstrap/personal-to-team.md (M7)
- curriculum/trainings/bootstrap/agents-building-agents.md (M8)

For each module also read the exercises and lectures it inlines (follow include-links).

Report in this shape:

## Mood landing per module
One line per module: does the module end in the deliberate mood from content-strategy? Quote one passage that lands or steals the mood. Score 1-10. 8+ is the bar.

## Seam transitions (critical)
For each seam M1→M2, M2→M3, M3→M4, M4→M5, M5→M6, M6→M7, M7→M8:
- Does the next module pick up where the prior left off?
- Is there premature resolution (e.g., M3 verification tidying the doubt M5 should rescue)?
- Is there unearned rescue (e.g., M5 relief before M3/M4 had time to stew)?
- Flag any mood handoff that breaks.

## Vocabulary / jargon drift
Any banned business-audience jargon appearing before it's earned (see .claude/skills/content-creation/SKILL.md § Business-audience jargon ban)? Any term introduced in Mn still undefined when used in Mn+1?

## State carry-over
Does M2 actually build on M1's artifact? M3 on M2's memory? M5 on M3/M4's residual doubt? M8 on M1–M7's accumulated stack? Flag modules that reset instead of compound.

## Philosophy callout density
Per heuristic: sparing, never front-loaded, no unintended repetition across modules. Flag any module that over-quotes, front-loads, or repeats a callout already spent.

## Severity-ranked fix list
Top 5 issues ranked 1-5 (5 = arc-breaking, must fix before manual run; 1 = cosmetic). Each: module(s), one-line description, one-line fix direction.

## Verdict
APPROVE / APPROVE WITH TODOs / REVISE. If REVISE, name the minimum set of fixes to reach APPROVE.

Be specific. Quote passages. Do not summarize; diagnose.
```

## What this catches (vs. per-exercise evals)

- Arc breaks invisible within one module (M3 resolution that steals M5's teaching moment)
- Mood handoff failures between adjacent modules
- Vocabulary leaks — a term used in M4 that was never introduced
- State compound failures — modules that don't actually build on prior artifacts
- Philosophy callout collisions across sessions

## What this does NOT catch

- Whether Teacher Claude (`/self-study`) actually facilitates well live
- Whether the exercises break in Claude Code's current behavior
- Whether a real persona's energy holds across 8 modules
- Facilitator-premium gaps (things Teacher Claude must nudge on)

Those need the live manual run. Arc Pass frees the manual run to focus on them.
