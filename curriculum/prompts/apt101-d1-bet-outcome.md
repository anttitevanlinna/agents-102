---
key: apt101-d1-bet-outcome
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-the-bet
requires:
  - id: product-box
    source: prompt:apt101-d1-box-never-say
produces:
  - id: team-bet
    location: "team/bet.md (## Outcome)"
    note: "read by every later bet prompt"
---
Read the outcome stickies on the Bet frame of our team's Miro board, every sticky on it including any on its edge, or the screenshot I paste. Read team/product-box.html too.

An outcome is what our customers do differently once the product works for them, not something we ship.

Interview the three of us down to one outcome. Ask one question at a time and wait for the answer. Keep going until the outcome names who, doing what differently, by when, and how we would see it. Where a candidate is a feature or a deliverable, say so and ask what the customer would do differently because of it.

Write the outcome as the first section of team/bet.md, under ## Outcome. Show me the sentence before saving.
