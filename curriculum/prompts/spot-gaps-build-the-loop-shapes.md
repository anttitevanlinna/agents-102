---
key: spot-gaps-build-the-loop-shapes
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: repeated-work-inventory
    source: prompt:spot-gaps-build-the-loop-study
produces:
  - id: recurring-shape-diagrams
    location: scrollback (the top recurring work patterns drawn as small mermaid diagrams)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-3
      - prompt:agents-that-build-agents-handoff
---
Take the recurring groups you just named. For the top few, draw each one as a mermaid diagram of how that kind of work flows: the steps in order, where it branches, where it loops back, what hands off to what.

Keep each diagram to 30 nodes at most. The point is to recognise the shape of the work, not to document every case. If a shape needs more than 30 nodes, it is really two shapes, split it.
