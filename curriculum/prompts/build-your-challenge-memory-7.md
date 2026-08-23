---
key: build-your-challenge-memory-7
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
requires:
  - id: challenge-memory
    source: prompt:build-your-challenge-memory-3
  - id: new-memory-source
    source: student-input
produces:
  - id: challenge-memory
    location: memory/ (integrate in place)
---
Take the source below and integrate it into the memory. Steps:

1. Read the source. Integrate its claims into existing pages (sharpen, don't append). Drop any claim the source contradicts. For new topics, add pages in the existing shape. Update memory/index.md.
2. Rewrite tops in place. Replace old framing; don't preserve it above a new section.

When you're done, tell me three pages that got sharper (not longer) and one claim that got dropped or replaced.

New source:
