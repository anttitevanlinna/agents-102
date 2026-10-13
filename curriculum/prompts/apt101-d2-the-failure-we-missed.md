---
key: apt101-d2-the-failure-we-missed
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-imagine-it-failed
requires:
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
produces:
  - id: premortem
    location: "team/premortem.md"
    note: "read by apt101-d2-team-rules, apt101-d2-tonights-question, Day 3 five users"
---
Read the pre-mortem frame on our team's Miro board: every sticky, including any on its edge, and the dots on each. Sticky and dot colours tell you whose they are; ask us if you don't know. If you can't reach the board, say so, and I'll paste a screenshot.

Read team/chosen-bet.md and our three pieces in team/<name>/ too.

The bet failed a year from now. Add the causes we missed, at most three. Lean toward what we seem to assume will go fine. Each cause in the past tense, with the early warning sign we would have seen in week two. Put them on the frame in a colour none of us used, inside the frame.

Then save every sticky to team/premortem.md: its words, its author, its dots, and your additions marked as Claude's.
