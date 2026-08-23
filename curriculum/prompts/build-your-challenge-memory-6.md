---
key: build-your-challenge-memory-6
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
requires:
  - id: challenge-memory
    source: prompt:build-your-challenge-memory-3
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: challenge-agent-output
    location: scrollback
---
Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.
