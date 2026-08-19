---
key: personal-agent-homework-2
dest: Claude Code
runtime: any
origin: exercises/personal-agent-homework
requires:
  - id: m2-style-md
    source: prompt:personal-agent-homework-1
produces:
  - id: morning-agent-brief
    path: module-2/morning-agent/morning.md
---
I'm setting up a daily agent that reads my challenge memory every morning and reports back as a stylised HTML page. Ask me, one at a time:

1. Which job — morning plan, daily risk scan, or next-move draft?
2. What should the output look like — how long, what sections, what voice?
3. What must this agent never do? Name at least one hard boundary.

When I've answered all three, write the file at module-2/morning-agent/morning.md. The output instructions say: write the result as a single self-contained HTML file to module-2/morning-agent/latest.html, following the styling rules in style.md at the training-directory root. One file, overwritten each day. Show me morning.md before saving.
