---
key: apt101-d3-the-job-your-team-hires
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-take-it-to-the-team
requires:
  - id: five-users
    source: prompt:apt101-d3-read-the-sessions
  - id: way-of-working
    source: prompt:apt101-d2-lead-way-of-working
produces:
  - id: m7-jtbd
    location: "module-7/jtbd.md"
  - id: m7-branch
    location: "module-7/branch.md"
---
Read team/five-users.md (our call, and the one sentence we now believe, held or changed), team/chosen-bet.md, the team lead's team/<name>/way-of-working.md, and the Way of working frame on our Miro board: every post-it, including any on its edge.

Draft the job our wider team is trying to get done, in their words, not ours: the functional part, and at least one emotional or social part. Name their current hire for it: what they use today, and what's broken about it. Every job already has an incumbent. Then one outcome in this form: "minimize/increase <measure> when <doing the job>".

Confirm or correct each piece with us, one question at a time, each with three or four lettered options drawn from our files. Wait for our answer before the next. Then write module-7/jtbd.md, every claim anchored to the file it came from.

Then show us four shapes that could carry our way of working to them: a file they run, a page they read, a habit in a meeting they already hold, a person who walks them through it. For each, the concrete mechanism by which it would move that outcome. Let us pick one to three. Write module-7/branch.md with one sentence per pick: "This moves the outcome because <mechanism>." Tools and infrastructure go after the mechanism, as constraints, not as the reason.

Show us each file before saving.
