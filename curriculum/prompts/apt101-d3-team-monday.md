---
key: apt101-d3-team-monday
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-take-it-to-the-team
requires:
  - id: door
    source: prompt:apt101-d1-the-door
  - id: m7-artifacts
    source: prompt:apt101-d3-test-the-switch
  - id: five-users
    source: prompt:apt101-d3-read-the-sessions
produces:
  - id: monday
    location: "team/monday.md"
    note: "read at the Day 3 close"
---
Read team/what-goes-in.md, module-7/people-plan.md, module-7/assumptions.md, the Way of working frame on our Miro board (every post-it, including any on its edge), team/five-users.md and team/chosen-bet.md.

Ask each of us in turn for our first Monday move, and wait for each answer:
- the product owner: the next slice and its signal
- the designer: the next five users
- the team lead: the conversation with the team

Write team/monday.md:
1. Open with what goes in, from team/what-goes-in.md, as the first thing our wider team decides for itself: which sources its agents may read, what stays out, and that anyone may say no.
2. Then the proposal, in five lines.
3. The three moves, word for word, with our names.
4. The question the team decides.

Then post the proposal back to the Way of working frame, inside it, beside our post-its, with a name on every part. A part nobody owns says so.
