---
key: apt101-d1-box-never-say
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: product-box
    source: prompt:apt101-d1-box-only-us
produces:
  - id: product-box
    location: "team/product-box.html (repainted)"
---
Read the hate and never-say stickies on the box frame of our Miro board, or in the screenshot I paste. The hate stickies are what our customers hate about the way they do the job today. The never-say stickies are words our customers would never use about our product.

Turn each hate into what the box stands against, said as what the product does instead. Not a list of what we're against, but the voice of the whole box.

Ban every never-say word from the page. Then repaint team/product-box.html, and keep the only-us lines and the press release.

Finish by quoting any never-say word you found on the old box.
