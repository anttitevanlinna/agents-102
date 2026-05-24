---
key: ae101-m4-locate-transcript
dest: Claude Code
runtime: any
origin: agentic-engineering-101/run-the-first-experiment
produces:
  - id: m4-transcript-path-printed
    location: scrollback (absolute path printed)
    consumed-by:
      - prompt:ae101-m4-commit-starting-point
    note: teaching beat — surfaces that each session keeps a transcript and where it lives. Fires BEFORE the starting-point commit; the commit reads this path and records it into task.md so it rides the m5 worktree fork.
---
Show me where Claude Code is keeping the record of this session. Every session's scrollback is written live to a `.jsonl` file under `~/.claude/projects/`: the folder is this working directory's full path with each `/` turned into `-`, and the filename is this session's id, which lives in the `CLAUDE_CODE_SESSION_ID` environment variable. Build the full path, confirm the file is there, and show me the path.
