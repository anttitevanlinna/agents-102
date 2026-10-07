---
key: apt101-d3-build-the-slice
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-map-the-story
requires:
  - id: story-map
    source: prompt:apt101-d3-slice-by-learning
  - id: prototype
    source: prompt:apt101-d2-designer-prototype
  - id: product-box
    source: prompt:apt101-d1-box-never-say
produces:
  - id: slice-1
    location: "team/slice-1/"
    note: "read by apt101-d3-walk-the-slice, apt101-d3-test-script, the five users"
---
Read the chosen first slice in team/story-map.md, the designer's Day 2 prototype in team/<designer's name>/, and team/product-box.html.

Build the first slice as clickable HTML in team/slice-1/. Every backbone step is present and works, end to end. Where the slice is thin at a step, keep it thin; where it leaves a step out, put a plain placeholder page. Use the box's look and words.

When it's done, open the start page and tell me which steps are thin.
