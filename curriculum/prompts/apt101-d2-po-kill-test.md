---
key: apt101-d2-po-kill-test
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-make-your-piece
requires:
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
produces:
  - id: kill-test
    location: "team/<my-name>/kill-test.md (+ fake-door.html or survey.md)"
    note: "laid beside the other pieces; Day 3"
---
Read team/chosen-bet.md and its riskiest assumption.

Propose two or three of the cheapest experiments that could prove it wrong: a fake-door page, a short survey, a concierge test. For each, one line on what it costs and how fast it answers. Ask me to pick one.

Then write a test card to team/<my-name>/kill-test.md:
- what must be true
- the test
- the measure
- the threshold below which the bet fails

Then build the experiment I picked so it can run on Monday: a fake-door page at team/<my-name>/fake-door.html, or a survey at team/<my-name>/survey.md.
