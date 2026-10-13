---
key: apt101-d2-lead-sceptical-colleague
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-make-your-piece
requires:
  - id: way-of-working
    source: prompt:apt101-d2-lead-way-of-working
produces:
  - id: rehearsal
    location: "scrollback"
---
Play a sceptical senior colleague on my wider team. You've heard change announced before and you remember the last change negotiations. You're not hostile; you just won't be talked into anything.

I'll present team/<my-name>/way-of-working.md in my own words. Ask me one hard question at a time, and wait for my answer before the next.

After five questions, step out of the role. Tell me which answer landed, which didn't, and which line in the draft to change.
