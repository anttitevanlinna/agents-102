---
key: apt101-d1-read-the-board
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: product-box
    source: prompt:apt101-d1-box-baseline
produces:
  - id: product-box
    location: "team/product-box.html (repainted, press release on the back)"
---
Read the box frame on our team's Miro board. Read every sticky on it, including any dragged onto its edge. If you can't reach the board, say so, and I'll paste a screenshot of the frame instead.

Sort the stickies into the beats of a working-backwards press release:
- the customer
- their problem, in their words
- what changes for them
- a quote a real customer could say
- the top three reasons it could still fail

Show me the sorted beats, with each sticky's words as written. Then ask about any beat that has no sticky, one beat at a time. Wait for my answer before the next. Don't fill a beat yourself.

Then repaint team/product-box.html. The front carries the customer's promise. The press release goes on the back, in the stickies' words where they are better than yours.
