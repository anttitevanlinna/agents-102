---
key: hallucination-bakeoff-6
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
requires:
  - id: m5-scoreboard
    source: prompt:hallucination-bakeoff-5
---
Tell me about precision and recall.

Use the scoreboard at `module-5/scoreboard.md` for the examples — point at specific rows from my run. End with one line on which one matters more for catching fabrication, and why.
