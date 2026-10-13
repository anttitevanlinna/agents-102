---
key: apt101-d3-what-it-missed
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-what-good-means
requires:
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
  - id: caught
    source: prompt:apt101-d3-caught
  - id: doubts-md
    source: prompt:apt101-d2-mark-the-doubt
produces:
  - id: what-it-missed
    location: "team/<my-name>/what-it-missed.md"
    note: "read at the close"
---
Read the last round's briefing and judgment in module-6/runs/, the ceiling lines in team/what-good-means.md, what they caught in team/caught.md, and the line I marked as trusting least in team/<my-name>/doubts.md, with my reason.

Put that line and my reason first.

Then show me five claims the judge passed, one at a time, each beside my line. For each, ask whether I would send it back, and wait for my answer.

Then list where my call and the judge's verdict differ, and append them to module-6/eval-notes.md.

Last, ask me for the one ceiling line our team lacked, and add it in my words to team/<my-name>/what-it-missed.md.
