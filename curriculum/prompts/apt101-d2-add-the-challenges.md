---
key: apt101-d2-add-the-challenges
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-grow-the-tree
requires:
  - id: tree-md
    source: prompt:apt101-d2-merge-the-tree
produces:
  - id: tree-md
    location: "team/tree.md (challenges added)"
    note: "read by apt101-d2-whats-behind-each-branch"
---
Read the challenge stickies on the Merged tree frame of our Miro board, every sticky including any on its edge, or the screenshot I paste. Each sticky's colour tells you whose it is; ask if you don't know.

Add each challenge under its branch in team/tree.md, word for word, with the name of whoever wrote it. Leave every existing branch, name and source sentence untouched.

Tell me which challenges you couldn't place under a branch.
