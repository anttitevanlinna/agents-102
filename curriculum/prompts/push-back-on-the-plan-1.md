---
key: push-back-on-the-plan-1
dest: Claude Code
runtime: any
origin: exercises/push-back-on-the-plan
requires:
  - id: multi-file-task
    source: scrollback (student input at M2 Prework / Connections)
produces:
  - id: initial-plan
    location: plan file (Claude Code default location in working directory)
    consumed-by:
      - prompt:push-back-on-the-plan-2
---
Plan the task I describe below. Explore the files you need to understand the scope. Write the plan to a plan file. Each step names files touched, shape of the change, tests you'd write or update before any code lands, and what you'd check before declaring it done. Detail over brevity.

My task:
