---
key: build-your-challenge-memory-3
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
---
Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.

Rules — non-negotiable:

1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.

2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.

3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.
