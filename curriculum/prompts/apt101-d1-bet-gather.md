---
key: apt101-d1-bet-gather
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-the-bet
requires:
  - id: hypothesis-md
    source: prompt:apt101-d1-bet-hypothesis
produces:
  - id: team-bet
    location: "team/bet.md (## Hypotheses, attributed)"
    note: "read by apt101-d1-pin-the-bet, apt101-d1-bet-assumptions, Day 2"
---
Copy each team/<name>/hypothesis.md into team/bet.md, under a ## Hypotheses heading below the outcome. Word for word, each under the name of the person who wrote it.

Don't edit, merge or rank them. If a folder has no hypothesis.md yet, write that person's name with "not written yet" under it.

Tell me which names you found.
