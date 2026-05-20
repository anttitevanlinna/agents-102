---
key: ae101-m4-nudge-continue
dest: Claude Code
context: optional
runtime: any
origin: agentic-engineering-101/run-the-first-experiment
requires:
  - id: un-packaged-run-artefact
    source: prompt:ae101-m4-take-task-end-to-end
    conditional: agent-stalled
produces: []
---
Continue --- you can do it. Can't you?
