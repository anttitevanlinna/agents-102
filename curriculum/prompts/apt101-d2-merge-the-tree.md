---
key: apt101-d2-merge-the-tree
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-grow-the-tree
requires:
  - id: crux-md
    source: prompt:apt101-d2-the-call-it-blocks
produces:
  - id: tree-md
    location: "team/tree.md"
    note: "read by three-minds-one-synthesis, apt101-d2-add-the-challenges, apt101-d2-whats-behind-each-branch"
---
Read the tree frame on our team's Miro board: every sticky on it, including any on its edge. If you can't reach the board, say so, and I'll paste a screenshot. Ask us which sticky colour is whose if you don't know. Read the outcome in ./crux.md too.

Merge our three sketches into one opportunity solution tree: the outcome at the root, opportunities under it, solutions under the opportunities.
- Label every branch with the names of everyone who put it down. A branch only one of us put down stays, marked with that one name. Don't drop it, and don't average it into a neighbour.
- An "opportunity" with only one possible solution is a solution in disguise. Flag it.
- List the branches you would cut as not serving the outcome, each with its reason. Don't cut them.

Draw the merged tree in a new frame on the board, titled Merged tree, with stickies and connecting lines, written inside the frame.

Then write it to team/tree.md, with the names. Under each branch, quote the source sentence behind it word for word, with its file and whose it is, so any of us can check the branch from team/tree.md alone. Where that sentence sits on another person's laptop, ask them to paste it in.
