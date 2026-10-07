---
key: apt101-d1-box-baseline
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: team-folder
    source: prompt:apt101-d1-link-the-team-folder
produces:
  - id: product-box
    location: "team/product-box.html"
    note: "repainted by every later box prompt; read by apt101-d1-bet-outcome, Day 3 five users"
---
Paint a product box for our product from the public page I'll paste below, and nothing else. One page of HTML, saved to team/product-box.html.

The front: the product's name, one promise, three reasons to buy. The back: who it is for.

Use only what the page says. Don't ask me questions yet.

Our public page:
