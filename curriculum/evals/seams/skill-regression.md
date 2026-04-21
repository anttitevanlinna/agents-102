# Seam — Self-Study SKILL.md Regression (STUB)

**Catches:** edits to `.claude/skills/self-study/SKILL.md` that break facilitation for a specific module. The Teacher Claude follows the skill; if the skill's per-module cadence no longer matches the module file, facilitation breaks silently.

## Status

STUB — build when the first self-study pilot surfaces a facilitation gap, OR proactively before the first real self-study cohort.

## Rough shape

For each Bootstrap module file:
- Extract the expected phase sequence (Connections → Lecture(s) → Exercise(s) → Debrief → Bridge)
- Check SKILL.md's per-module guidance matches:
  - Number of lectures
  - Number of exercises
  - Debrief mechanism (3 retro questions, discipline-specific)
  - Artifact names Teacher should expect the student to produce
  - Builder folder switches at the right seams

Flag mismatches.

## Build trigger

First self-study pilot. Or if Antti rewrites SKILL.md significantly and wants confidence the module files still align.
