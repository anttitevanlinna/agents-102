---
key: apt101-d3-test-the-switch
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-take-it-to-the-team
requires:
  - id: m7-plans
    source: prompt:apt101-d3-bottleneck-and-plans
produces:
  - id: m7-artifacts
    location: "module-7/jtbd.md, branch.md, absorption-bottleneck.md, technical-plan.md, people-plan.md, assumptions.md, failure-stories.md"
    note: "read by a101-m7-debrief-sharing-artifact, apt101-d3-team-monday"
---
Read everything in module-7/ so far.

List the five things that would have to be true for our wider team to leave how they do the job today for our way of working. For each: how sure we are, and one test we could run this week. Most load-bearing first. Write them to module-7/assumptions.md.

Ask us which two or three we will test, and mark them.

Then write one story of the team going back to the old way, six months from now. Say what the old way did that ours didn't, and the warning sign we would have seen in week two. Write it to module-7/failure-stories.md.

Show us both files before saving.
