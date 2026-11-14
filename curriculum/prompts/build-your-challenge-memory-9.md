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
produces:
  - id: m2-close
    location: module-2/close.md
---
Answer my question below twice and save both answers in module-2/close.md, under the headings Bare and System.

1. Bare: dispatch a helper agent in an empty scratch folder with only the question. No memory, no rules, no files.
2. System: run the question through the agent I built in Phase 2, using my memory and its rules, citing the memory file each claim came from. Mark any line that used the source I added in Phase 3.

End close.md with one line: what the System answer has that the Bare one could not. Then add the gap the System answer still left to the open questions of the memory page it belongs to.

Question:
