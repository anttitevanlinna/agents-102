---
key: apt101-d2-find-the-obstacle
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-pick-the-outcome
requires:
  - id: team-bet
    source: prompt:apt101-d1-bet-gather
produces:
  - id: crux-md
    location: "./crux.md (## Crux)"
    note: "read by three-retrievers-one-curator-*, three-minds-one-synthesis-*, hallucination-bakeoff-1, eval-loop-*"
---
Read my memory in memory/, the outcome in team/bet.md, and the chosen doubt at the top of team/doubts.md.

Find the obstacle between our customers and that outcome: the one thing that, if it moved, would release at least three other stuck things. Say it in one sentence, in our customers' words, with the memory line it rests on.

Rules:
- Not the outcome again. "Customers need to finish onboarding faster" is the outcome restated.
- Not a category. "Onboarding is unclear" is a category.
- Not a feature. "We need an import wizard" is a solution.
- Test it: if this obstacle moved, what three other stuck things would release? Name them. If you can't, keep looking.

Show me the sentence. When I agree, save it to ./crux.md under ## Crux.
