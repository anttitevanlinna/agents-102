---
key: apt101-d1-box-only-us
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: product-box
    source: prompt:apt101-d1-read-the-board
produces:
  - id: product-box
    location: "team/product-box.html (repainted)"
---
Read the three only-us stickies we picked on the box frame of our Miro board, or in the screenshot I paste. Each is a thing our product does that a competitor's doesn't.

Repaint team/product-box.html so the front promise and the three reasons to buy rest on those three lines. Every claim on the box that any competitor in our category could also make: replace it, or cut it. Keep the press release on the back.

Then tell me which lines you replaced or cut, quoting the old wording.
