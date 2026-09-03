---
key: agents-that-build-agents-handoff
dest: Claude Code
context: same session, at the close after the stack scan
runtime: any
origin: lectures/the-handoff-prompt
requires:
  - id: recurring-shape-diagrams
    source: prompt:spot-gaps-build-the-loop-shapes
produces:
  - id: workflow-skills-handoff-prompt
    location: scrollback (standalone handoff prompt the student saves and runs later; scans the work, picks one skill with the student and builds it, then puts efficient checks on the work that skill produces)
---
This session we drew the recurring shapes in my work. The shapes are in your context right now.

Write me a handoff prompt I can save and run in a fresh session later. It does three things, in order. It scans my work for the kinds of work I repeat, starting from the shapes named here. It picks with me the one skill most worth building, and builds it. It makes sure the work that skill produces has efficient checks on its quality: checks I can run, not reviews I have to do.

The fresh session will not have this context, so name the shapes inside the prompt and tell it what to re-read.
