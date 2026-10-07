---
key: apt101-d1-box-cold-read
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: product-box
    source: prompt:apt101-d1-box-never-say
produces:
  - id: box-cold-read
    location: "scrollback"
    note: "read aloud in the room; the generic line goes on the board"
---
Spawn a subagent to read team/product-box.html cold, with no memory of this session and of how the box was made.

Have it answer:
1. Quote the one line only this product could print: not the best line, the most uniquely ours.
2. Quote the most generic line on the page, the one a competitor could paste onto their own box today.

Give me both quotes exactly as the subagent wrote them.
