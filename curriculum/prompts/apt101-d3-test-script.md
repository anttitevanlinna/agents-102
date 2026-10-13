---
key: apt101-d3-test-script
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-five-users
requires:
  - id: slice-1
    source: prompt:apt101-d3-build-the-slice
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
produces:
  - id: five-users
    location: "team/five-users.md (script)"
    note: "read by the trio in sessions; apt101-d3-read-the-sessions"
---
Read the first slice and its signal in team/story-map.md, team/chosen-bet.md, team/slice-1/ and team/product-box.html.

Write a test script for five sessions with people who do the job our product serves:
- Open with the box front, shown on its own for thirty seconds, and one question: who is this for, and what does it promise them?
- Then three tasks a customer would bring to this slice, phrased as goals. Never name a button or a screen.
- One opening line for the facilitator. No leading questions.
- A short list of moments worth noting: where they hesitate, what they try instead, what they say they'd use it for.

Write it to team/five-users.md.
