---
key: diagnose-and-resend-1
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: m5-worktree
    source: prompt:ae101-m5-worktree-setup
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
produces:
  - id: m4-transcript-path
    location: scrollback (read from ./task.md coordinates that rode the worktree fork; not searched)
    consumed-by:
      - prompt:diagnose-and-resend-2
---
I'm working in a fresh worktree. A run I sent off earlier left its `task.md` at the root here, with the run's coordinates recorded in it: the `m4/` branch the run happened on, and the path to its session transcript. Print that transcript path and confirm the `.jsonl` is there. That transcript is the previous run's full scrollback, drift and dead-ends included.
