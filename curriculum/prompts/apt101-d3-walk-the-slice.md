---
key: apt101-d3-walk-the-slice
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-map-the-story
requires:
  - id: slice-1
    source: prompt:apt101-d3-build-the-slice
produces:
  - id: walk
    location: "scrollback"
    note: "read by the team lead to the driver"
---
Open team/slice-1/ as a customer seeing it for the first time, with the job named in team/story-map.md. You know nothing about how it was built.

Walk every step, from the first to the last. List each place where:
- the walk stops
- a step is missing
- a page assumes knowledge this customer doesn't have

Don't fix anything. Report to me here in the chat.
