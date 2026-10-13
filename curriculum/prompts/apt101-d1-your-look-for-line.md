---
key: apt101-d1-your-look-for-line
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-send-it-off
requires:
  - id: hypothesis-md
    source: prompt:apt101-d1-bet-hypothesis
  - id: morning-agent-brief
    source: prompt:personal-agent-homework-2
produces:
  - id: look-for-line
    location: "module-2/morning-agent/morning.md (## Look for)"
    note: "read by the overnight run; quoted by Day 2 apt101-d2-what-ran-overnight"
---
Read team/<my-name>/hypothesis.md. Then ask me for one sentence, in my own words: what the digest should look for in my material about this hypothesis.

Don't suggest a sentence, and don't improve mine. If my answer runs longer than a sentence, ask me which sentence to keep.

Write that sentence word for word into module-2/morning-agent/morning.md, under a ## Look for heading. Don't reword it, and don't add a line of your own. Then show me the heading and the line as saved.
