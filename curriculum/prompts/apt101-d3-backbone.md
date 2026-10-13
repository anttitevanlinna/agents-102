---
key: apt101-d3-backbone
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-map-the-story
requires:
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
  - id: tree-md
    source: prompt:apt101-d2-add-the-challenges
produces:
  - id: story-map
    location: "team/story-map.md (backbone)"
    note: "read by apt101-d3-slice-by-learning"
---
Read the Story map frame on our team's Miro board: every post-it on it, including any on its edge. If you can't reach the board, say so, and I'll paste a screenshot. Read team/chosen-bet.md, team/tree.md and my memory in memory/ too.

Turn our post-its into a backbone of five to eight steps, left to right: the steps a customer goes through for this bet. Each step in the customer's words, with the interview or ticket it comes from. Mark any step no customer source supports. Don't drop it.

Post the backbone back to the frame, inside it, as a row above our post-its. Then write it to team/story-map.md.
