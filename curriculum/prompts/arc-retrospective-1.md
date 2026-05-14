---
key: arc-retrospective-1
dest: Claude Code
runtime: any
origin: exercises/arc-retrospective
---
Read my work across this repo. Specifically:

- My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
- Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
- The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
- Both skills I authored at `~/.claude/skills/` (the test-strategy skill from earlier, and the skill I authored today).
- The M4 un-packaged run artefact (commits, files, session transcript). The M4 session ran in the original repo, so the transcript lives in the encoded-original folder under `~/.claude/projects/`, not this worktree. Get the original repo path via `git rev-parse --git-common-dir` minus the trailing `/.git`; encode it with `/` → `-`.
- The M5 packaged re-run artefact (commits, files, session transcript). The M5 session ran in this worktree, so the transcript lives in the encoded-worktree folder (current cwd with `/` → `-`). In each folder, pick the most recent `.jsonl` that isn't this current session.

Run this audit in a fresh sub-task via the Agent tool so you have the cold-read view, then combine those findings with insights you have from this session's scrollback. I want both viewpoints: the fresh read uncoloured by our conversation, and what you noticed while we worked together.

Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.

Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.
