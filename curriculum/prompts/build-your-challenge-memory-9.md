---
key: build-your-challenge-memory-9
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
requires:
  - id: challenge-memory
    source: prompt:build-your-challenge-memory-7
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
---
Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:
