---
key: apt101-d3-caught
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-write-what-good-means
requires:
  - id: what-good-means
    source: prompt:apt101-d3-what-good-means
  - id: digest-day1
    source: prompt:apt101-d2-what-ran-overnight
produces:
  - id: caught
    location: "team/caught.md"
    note: "read at the close; apt101-d3-what-it-missed"
---
Read each of our Day 1 digests in team/<name>/digest-day1.html against the ceiling lines in team/what-good-means.md.

In team/caught.md, under each ceiling line, quote the digest lines that fall short of it, each with whose digest it came from. A ceiling line no digest falls short of gets "none found".

Show me the file before saving.
