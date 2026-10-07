---
key: apt101-d2-whats-behind-each-branch
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-choose-the-bet
requires:
  - id: tree-md
    source: prompt:apt101-d2-add-the-challenges
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
produces:
  - id: branch-verdicts
    location: "Miro bet frame (one sticky per branch)"
    note: "read by the trio in phase 2"
---
Run judges/groundedness-judge.md on every branch of team/tree.md, against the source sentences quoted under that branch.

For each branch, list:
- what holds: the supporting sentence, and where it came from
- what is stretched
- what has nothing behind it

Then put one sticky per branch on the bet frame of our Miro board, inside the frame, with that verdict in a few words. If you can't reach the board, give me the list to copy.

Cut nothing, from the board or from the file.
