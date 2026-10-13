---
key: apt101-d2-mark-the-doubt
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-read-the-digest
requires:
  - id: doubts-md
    source: prompt:apt101-d2-what-ran-overnight
produces:
  - id: doubts-md
    location: "team/<my-name>/doubts.md (marked line + reason)"
    note: "read in phase 5; Day 3 what good means"
---
Append the line I quote below to team/<my-name>/doubts.md, with the source the digest gave for it and my reason, in my words.

Then open that source and find what it actually says about this. Put the source's own sentence next to the digest's line, both quoted exactly. If the source doesn't say it, say so plainly.

The line, and why I trust it least:
