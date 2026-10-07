---
key: apt101-d1-bet-hypothesis
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-the-bet
requires:
  - id: team-bet
    source: prompt:apt101-d1-bet-outcome
produces:
  - id: hypothesis-md
    location: "team/<my-name>/hypothesis.md"
    note: "gathered into team/bet.md; read by apt101-d1-your-look-for-line, Day 2"
---
Read the outcome in team/bet.md. Then ask me for my hunch about what would move it, in my own words.

Turn my hunch into one hypothesis statement: We believe that <doing this> for <these people> will achieve <this outcome>. We'll know we're right when we see <this signal>.

Push until the signal has a number and a time window, and could come back no. If the signal can only say yes, tell me, and ask again. Use my words for the hunch; don't polish them.

Save the statement to team/<my-name>/hypothesis.md. Ask my first name if you don't know it.
