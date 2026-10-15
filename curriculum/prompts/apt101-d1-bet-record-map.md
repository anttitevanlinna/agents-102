---
key: apt101-d1-bet-record-map
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-the-bet
requires:
  - id: team-bet
    source: prompt:apt101-d1-bet-gather
produces:
  - id: team-bet
    location: "team/bet.md (## Assumption map)"
    note: "read by Day 2 choose the bet, Day 3 story map"
---
Read the Bet frame of our team's Miro board, everything on it including stickies on its edge, or the screenshot I paste. First ask us which sticky and dot colour belongs to whom, if you don't know yet.

From the 2x2, read each assumption sticky: its words, its tag, and which quadrant it sits in. Then read the dots: which assumption each dot sits on, and from its colour, who put it there.

Add the assumption map to team/bet.md under ## Assumption map (if that heading already exists, replace what is under it): each assumption with its tag and quadrant, the riskiest marked. Where the dots split, record it with who put which.

Tell me what you wrote, and anything on the frame you couldn't place.
