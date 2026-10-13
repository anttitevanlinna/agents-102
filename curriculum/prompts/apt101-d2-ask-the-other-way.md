---
key: apt101-d2-ask-the-other-way
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-read-the-digest
requires:
  - id: look-for-line
    source: prompt:apt101-d1-your-look-for-line
  - id: hypothesis-md
    source: prompt:apt101-d1-bet-hypothesis
produces:
  - id: digest-against
    location: "team/<my-name>/digest-against.html"
    note: "read by Day 3 what good means, five users"
---
Run the job in module-2/morning-agent/morning.md once more, over the same material, with one change: my ## Look for line turned round, against my hypothesis in team/<my-name>/hypothesis.md.

- If my line looked for support, the new line is: find what in my material argues against it.
- If my line looked for a test, or looked both ways, the new line is: find what in my material supports it. Support only.

Either way, the run also says how much of it there is, and where.

Leave morning.md and latest.html untouched. Write the result to team/<my-name>/digest-against.html.

Then show me its headline beside my first headline, both quoted exactly. Add nothing.
