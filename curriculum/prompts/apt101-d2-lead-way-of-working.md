---
key: apt101-d2-lead-way-of-working
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-make-your-piece
requires:
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
  - id: door
    source: prompt:apt101-d1-the-door
produces:
  - id: way-of-working
    location: "team/<my-name>/way-of-working.md"
    note: "read by apt101-d2-lead-sceptical-colleague, Day 3 take it to the team"
---
Read team/chosen-bet.md, team/what-goes-in.md and today's files in team/.

Draft a one-page working agreement for how our wider team would work on this bet with agents. Save it to team/<my-name>/way-of-working.md. Cover:
- what the agents do on this bet
- what stays with people: talking to customers, choosing which opportunity to pursue, anything a customer sees before a person reads it
- who reads what the agents write, and when
- when the team revisits the agreement

Write it as a proposal the team decides, not a decision. Where you're guessing at how our team works, mark it as a question for me.
