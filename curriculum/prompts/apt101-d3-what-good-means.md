---
key: apt101-d3-what-good-means
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-what-good-means
requires:
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
produces:
  - id: what-good-means
    location: "team/what-good-means.md"
    note: "read by apt101-d3-caught, apt101-d3-what-it-missed"
---
Each of us will say one line about what a good digest does for our team. Record each line word for word, with the name of who said it, in team/what-good-means.md.

Read judges/groundedness-judge.md, and split the lines in two:
- Floor: lines the judge already checks.
- Ceiling: lines it doesn't.

Don't touch the judge.
