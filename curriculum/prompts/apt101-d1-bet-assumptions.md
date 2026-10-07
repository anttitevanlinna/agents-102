---
key: apt101-d1-bet-assumptions
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-the-bet
requires:
  - id: team-bet
    source: prompt:apt101-d1-bet-gather
produces:
  - id: assumption-stickies
    location: "Miro Bet frame (or a list in chat)"
    note: "placed on the 2x2 by the trio"
---
Read the hypotheses in team/bet.md. Under each one, list the assumptions it rests on: what has to be true for it to work. One line each, as short as a sticky. Tag each one desirable (customers want it), viable (it works for the business) or feasible (we can build it).

Put them as stickies on the Bet frame of our Miro board, beside the 2x2, not on it. Each sticky in the colour of the person whose hypothesis it sits under, with their name on it; ask us whose colour is which if you don't know. Write them inside the frame. If you can't reach the board, give me the list grouped by hypothesis, and we'll copy them onto the board.

Don't place them on the 2x2. Where each one sits is our call.
