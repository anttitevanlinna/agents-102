---
key: apt101-d1-your-expect-line
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-send-it-off
requires:
  - id: look-for-line
    source: prompt:apt101-d1-your-look-for-line
produces:
  - id: expect-md
    location: "team/<my-name>/expect.md"
    note: "never read by the run; quoted by Day 2 apt101-d2-what-ran-overnight"
---
Ask me for one sentence in my own words: what I expect the digest to say about my hypothesis.

Don't suggest one, and don't improve mine. Write it word for word to team/<my-name>/expect.md. Not into the brief: the run must never read it.

Confirm in one line where you saved it.
