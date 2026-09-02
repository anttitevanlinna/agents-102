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
    location: scrollback (standalone handoff prompt the student saves and runs later; drives study then diagram then author across their whole stack)
---
This session we drew the recurring shapes in my work. The shapes are in your context right now.

Write me a handoff prompt I can save and run in a fresh session later to build the kit: one skill per recurring shape worth packaging, across my whole stack. Carry the shapes we just named into the prompt so it starts from them, not from scratch. For each shape: study the work, pick the check that fits, author through conversation, push back, invoke to verify.

The prompt runs later in a cold session, so bake in what that session won't have. Tell it to re-study my repos for these shapes, and name the shapes inside it.
