---
key: apt101-d2-designer-prototype
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-make-your-piece
requires:
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
produces:
  - id: prototype
    location: "team/<my-name>/prototype.html"
    note: "laid beside the other pieces; Day 3 map the story"
---
Read team/chosen-bet.md and the interview quotes it carries.

Ask me two things, one at a time: which one question this prototype should answer, and the job our customer hires the product for here.

Then build a clickable rough prototype as one HTML file at team/<my-name>/prototype.html. Rough is right: grey boxes, real words. Every screen carries the customer quote it was built from, word for word, with the interview file it came from. If you can't find a quote in the interview files, leave that screen's quote blank rather than writing one.

At the end of the page, list what the prototype does not answer.
