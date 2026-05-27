---
key: agents-that-build-agents-1
dest: Claude Code
context: fresh session in the same repo
runtime: any
origin: lectures/agents-that-build-agents
requires:
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
  - id: memory-folder
    source: prompt:walk-and-send-off-3
    conditional: m4-completed
  - id: second-authored-skill
    source: prompt:spot-gaps-build-the-loop-5
  - id: un-packaged-run-artefact
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
  - id: packaged-run-artefact
    source: prompt:ae101-m5-rerun-packaged
  - id: m5-run-coordinates
    source: prompt:ae101-m5-rerun-packaged
---
Enable plan mode.

Read these artefacts end to end:

- ./CLAUDE.local.md
- ./observations/
- the un-packaged run's commit history and modified files (its `m4/` branch is recorded in `task.md`)
- the packaged run's commit history and modified files (its `m5/` branch is recorded in `plan.md`)
- the SKILL.md of the `session-shaper` skill you authored, in `~/.claude/skills/`

Then design the next iteration of the kit. Three questions:

1. What gap in the kit would the next run want closed? Name it as a memory rule, a sharper verifier, or a third skill. Pick the home; do not split.
2. What rule already in memory has gone stale across the two runs? Name one to subtract.
3. What shape of skill is missing from the menu of verifier / judge / gap-finder? If none is missing, say so. Do not invent.

Return a plan with the three answers. No preamble.
