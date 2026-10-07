---
key: apt101-d3-slice-by-learning
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-map-the-story
requires:
  - id: story-map
    source: prompt:apt101-d3-backbone
  - id: team-bet
    source: prompt:apt101-d1-bet-record-map
produces:
  - id: story-map
    location: "team/story-map.md (slices + chosen first slice)"
    note: "read by apt101-d3-build-the-slice, apt101-d3-test-script"
---
Read the Story map frame, team/story-map.md, the assumption map in team/bet.md and team/chosen-bet.md.

Propose a walking skeleton and two or three slices. Each slice cuts across the whole backbone, from the first step to the last. Name each slice for the assumption it tests, riskiest first, and give it a hypothesis statement and the signal that would say no.

Draw each slice as a labelled row under the backbone, inside the frame.

Don't choose the first slice. That's ours. Wait while we move post-its and choose. When we tell you we're done, read the frame again and write the slices and our choice to team/story-map.md, in the words now on the board.
