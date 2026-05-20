---
key: walk-and-send-off-3
dest: Claude Code
context: optional
runtime: any
origin: exercises/walk-and-send-off
requires:
  - id: gap-audit-report
    source: prompt:walk-and-send-off-2
produces: []
note: tool-use directive (use AskUserQuestion to speed gap-fill Q&A); no artifact flow of its own
---
You propose solutions and ask questions. Use the ask-questions tool to speed up my work.
