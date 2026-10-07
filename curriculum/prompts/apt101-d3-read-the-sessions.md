---
key: apt101-d3-read-the-sessions
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-five-users
requires:
  - id: five-users
    source: prompt:apt101-d3-test-script
  - id: digest-day1
    source: prompt:apt101-d2-what-ran-overnight
produces:
  - id: five-users
    location: "team/five-users.md (moments, call, held/broken lines)"
    note: "read by apt101-d3-the-job-your-team-hires, apt101-d3-team-monday"
---
Read the Five users frame on our team's Miro board: every post-it, including any on its edge, one column per user. If you can't reach the board, say so, and I'll paste a screenshot. Read team/chosen-bet.md (the hypothesis and its signal), each of our Day 1 hypotheses in team/bet.md, our Day 1 digests in team/<name>/digest-day1.html, this morning's digest in module-2/morning-agent/latest.html, and team/five-users.md.

First, copy every moment from the wall into team/five-users.md, under its user, word for word.

For each moment, say whether a digest said it, could have said it, or could not have.

Then read the moments against the signal we agreed. Lay out what persevere, pivot and stop would each mean for the next slice. Don't choose.

Quote each of our Day 1 hypotheses word for word, under its author's name. Don't mark which lines the moments touch. That's ours to say.

When we come back with our call, record it in team/five-users.md exactly as we say it, with who said what:
- the call: persevere, pivot or stop
- for each of us, the line of our Day 1 hypothesis we name as touched, and whether it held or broke; where none broke, the result that would have broken it
- the one sentence we now believe, held or changed
