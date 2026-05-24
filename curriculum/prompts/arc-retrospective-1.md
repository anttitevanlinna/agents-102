---
key: arc-retrospective-1
dest: Claude Code
runtime: any
origin: exercises/arc-retrospective
requires:
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
  - id: memory-folder
    source: module:run-the-first-experiment
    conditional: m4-completed
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-completed
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
  - id: second-authored-skill
    source: prompt:spot-gaps-build-the-loop-5
  - id: un-packaged-run-artefact
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-session-transcript
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
  - id: packaged-run-artefact
    source: prompt:ae101-m5-rerun-packaged
  - id: m5-session-transcript
    source: prompt:ae101-m5-rerun-packaged
  - id: m5-run-coordinates
    source: prompt:ae101-m5-rerun-packaged
  - id: stale-rule-cut
    source: prompt:spot-gaps-build-the-loop-2
    conditional: rule-earned-cutting
produces:
  - id: arc-retrospective-note
    location: student-picked (ADR, .claude/memory/ memo, or standalone file)
    consumed-by: []
    note: terminal artefact — closes the M1-M6 arc
---
Read my work across this repo. Specifically:

- My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
- Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
- The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
- Both skills I authored at `~/.claude/skills/` (the test-strategy skill from earlier, and the skill I authored today).
- The un-packaged run (commits, files, session transcript). Read `task.md` for its recorded `m4/` branch and transcript path, then use those exact coordinates. Do not reconstruct the transcript folder or pick a recent `.jsonl`.
- The packaged re-run (commits, files, session transcript). Read `plan.md`'s protected `Run coordinates` block for its recorded `m5/` branch and transcript path, then use those exact coordinates. Do not reconstruct the transcript folder or pick a recent `.jsonl`.

Run this audit in a fresh sub-task via the Agent tool so you have the cold-read view, then combine those findings with insights you have from this session's scrollback. I want both viewpoints: the fresh read uncoloured by our conversation, and what you noticed while we worked together.

Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.

Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.
