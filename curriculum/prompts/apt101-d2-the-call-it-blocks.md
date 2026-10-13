---
key: apt101-d2-the-call-it-blocks
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-pick-the-outcome
requires:
  - id: crux-md
    source: prompt:apt101-d2-find-the-obstacle
produces:
  - id: crux-md
    location: "./crux.md (## Question)"
    note: "read by every Day 2 reused prompt"
---
Read ./crux.md and team/bet.md. What is the sharpest decision this obstacle blocks: one our team has to make in the next few weeks? One sentence, as a call between options, not a topic. "What about onboarding?" is a topic. "Do we build the import step ourselves, or partner for it?" is a call.

Show it to me. When I agree, append it to ./crux.md under ## Question, without touching the lines above.
