---
key: walk-and-send-off-1
dest: Claude Code
runtime: any
origin: exercises/walk-and-send-off
requires:
  - id: candidate-tasks
    source: scrollback (student arrives with 1-2 candidate tasks per M4 Connections)
produces:
  - id: scoped-task
    location: scrollback (task scoped into 2-3 sentences)
    consumed-by:
      - prompt:walk-and-send-off-2
      - prompt:ae101-m4-commit-starting-point
      - prompt:ae101-m4-take-task-end-to-end
  - id: task-md
    location: ./task.md (repo root; inherits to m5 worktree via starting-point SHA)
    consumed-by:
      - prompt:ae101-m4-commit-starting-point
    note: disk persistence of scoped-task; recovery anchor if scrollback compacts mid-long-run; optional seed for M5 diagnose-and-resend-6 reference build and M6 spot-gaps original-spec lookup (downstream prompts work without it)
---
I'm about to run my first long-running experiment. Screen the candidates below against three criteria:

- Send-off shape: the task lets the agent push past 3-4 ambiguities without checking in at every step.
- Requirement-weaving: the task has multiple constraints that interact — getting one right means knowing the others.
- Multi-file reasoning: touches at least 3 files where touching the wrong one matters.

For each candidate, give me your read (fit / marginal / wrong shape) and why. If one is a clear fit, scope it into two or three sentences I can refer back to. If neither fits, tell me what's missing; if both fit, push me to pick the one that'll teach me more.

Once we've settled on one, save the scope as `./task.md` in the repo root (overwrite if it exists) so the send-off commit has something to capture and a later session can recover the task from disk.

Candidates:
