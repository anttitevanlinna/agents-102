---
key: extract-the-task-shaping-rule-3
dest: Claude Code
runtime: any
origin: exercises/extract-the-task-shaping-rule
requires:
  - id: task-shaping-rules-file
    source: prompt:extract-the-task-shaping-rule-2
produces: []
---
Suppose I wanted these rules to drive automated ticket refinement in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting big items into smaller tickets with these rules as the guardrail. What two or three shapes does that automation typically take? For each: what invokes it, and where these rules would sit in the loop. Don't propose code today.
