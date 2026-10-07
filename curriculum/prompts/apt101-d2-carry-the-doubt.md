---
key: apt101-d2-carry-the-doubt
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-gather-the-evidence
requires:
  - id: door
    source: prompt:apt101-d1-the-door
  - id: crux-md
    source: prompt:apt101-d2-the-call-it-blocks
produces:
  - id: retrieval-against
    location: "sources/<retriever>-retrieval.md (AGAINST finding + skipped list)"
    note: "read by the curator"
---
Two limits for this retrieval, before you run.

First, the door. Read team/what-goes-in.md. Open nothing from our own wiki, drives or folders that it keeps out. Treat any source it says to strip as kept out too, unless a stripped copy is already in sources/. At the end of your retrieval file, list each source you skipped for that reason.

Second, the doubt. Take the ## Doubt in ./crux.md as one more search.

Before you finish, append at least one finding that argues against the bet in team/bet.md, marked AGAINST. If you find none, write "[NOT FOUND]" and where you looked.
