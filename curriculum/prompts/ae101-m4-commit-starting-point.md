---
key: ae101-m4-commit-starting-point
dest: Claude Code
runtime: any
origin: agentic-engineering-101/run-the-first-experiment
requires:
  - id: scoped-task
    source: prompt:walk-and-send-off-1
  - id: task-md
    source: prompt:walk-and-send-off-1
  - id: m4-transcript-path-printed
    source: prompt:ae101-m4-locate-transcript
produces:
  - id: m4-starting-point-sha
    location: git (m4/<task-slug> branch, "M4 starting point" commit)
    consumed-by:
      - prompt:ae101-m5-worktree-setup
      - prompt:diagnose-and-resend-2
    note: ae101-m5-worktree-setup uses this as the fork point; later readers get the branch and transcript path from m4-run-coordinates rather than rediscovering them by search
  - id: m4-run-coordinates
    location: ./task.md (repo root; protected "Run coordinates" block with branch name + transcript path; written BEFORE the commit so it rides the m5 worktree fork)
    consumed-by:
      - prompt:ae101-m5-worktree-setup
      - prompt:diagnose-and-resend-1
      - prompt:diagnose-and-resend-2
      - prompt:spot-gaps-build-the-loop-1
      - prompt:agents-that-build-agents-handoff
    note: replaces branch-grep + transcript marker-search in M5/M6 readers; the coordinates are recorded at creation rather than reconstructed by search
---
Create a fresh feature branch named m4/<short-task-slug>. Before committing, append a protected block to `./task.md` headed `Run coordinates (do not rewrite or remove)` so a later session can recover this run without searching for it: the branch name exactly as `git branch --show-current` reports it (read it back from git — don't retype it from memory), and the transcript path you just located. Then stage everything, commit with message "M4 starting point", and tell me the short SHA.
