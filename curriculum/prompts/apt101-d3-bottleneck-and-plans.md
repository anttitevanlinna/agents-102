---
key: apt101-d3-bottleneck-and-plans
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-take-it-to-the-team
requires:
  - id: m7-jtbd
    source: prompt:apt101-d3-the-job-your-team-hires
  - id: m7-branch
    source: prompt:apt101-d3-the-job-your-team-hires
produces:
  - id: m7-plans
    location: "module-7/absorption-bottleneck.md, technical-plan.md, people-plan.md"
    note: "read by apt101-d3-test-the-switch, apt101-d3-team-monday"
---
Read module-7/jtbd.md and module-7/branch.md.

List what stands between our wider team and the way of working: technical, social, political, habit or trust. Cluster them. Name the one that, removed, makes several others easier, in one sentence. Write it to module-7/absorption-bottleneck.md.

Then draft two plans together:
- module-7/technical-plan.md: what we ship, how the team receives it, and the first real test against their job.
- module-7/people-plan.md: who owns it, who reads what the agents write, who notices when it slips, who decides it no longer does the job, and who teaches the next person.

Invent no names. Where we have none, write "UNASSIGNED: Monday's question".

Show us both plans before saving.
