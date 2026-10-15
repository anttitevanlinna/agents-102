---
key: apt101-d2-write-the-chosen-bet
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-choose-the-bet
requires:
  - id: tree-md
    source: prompt:apt101-d2-add-the-challenges
produces:
  - id: chosen-bet
    location: "team/chosen-bet.md"
    note: "read by make your piece, imagine it failed, tonight’s run, Day 3"
---
Read the branch we chose on the bet frame of our Miro board and in team/tree.md. If you can't reach the board, ask me which branch we chose. Read the outcome in ./crux.md and team/bet.md.

Write team/chosen-bet.md as a hypothesis statement: We believe <this capability> for <these people> will achieve <this outcome>. We'll know we're right when we see <this signal>. The signal has a number and a window, and could come back no.

Under it:
- the evidence behind it, quoted from team/tree.md with its source
- the riskiest assumption
- the branches we set aside, and why

Mark the set-aside branches in team/tree.md as set aside. Don't delete them.

Show me chosen-bet.md before saving.
