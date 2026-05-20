---
key: ae101-m4-commit-starting-point
dest: Claude Code
runtime: any
origin: agentic-engineering-101/run-the-first-experiment
requires:
  - id: scoped-task
    source: prompt:walk-and-send-off-1
produces:
  - id: m4-starting-point-sha
    location: git (m4/<task-slug> branch, "M4 starting point" commit)
    consumed-by:
      - prompt:ae101-m5-worktree-setup
      - prompt:diagnose-and-resend-2
    note: spot-gaps-build-the-loop-1 finds the m4/ branch via `git branch -a | grep m4/`, not the SHA directly — branch ref carries the artifact forward
---
Commit the current state of the repo on a fresh feature branch named m4/<short-task-slug>. Stage everything, commit with message "M4 starting point". Tell me the short SHA.
