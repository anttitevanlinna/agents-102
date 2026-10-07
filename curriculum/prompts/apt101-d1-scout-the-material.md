---
key: apt101-d1-scout-the-material
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-what-goes-in
requires:
  - id: challenge-md
    source: prompt:apt101-d1-pin-the-bet
produces:
  - id: curation-seed
    location: "scrollback"
    note: "scouting list; read by apt101-d1-the-door and build-your-challenge-memory-1"
---
Read ./challenge.md. Then ask me where the material on this bet lives in my own work. Ask one question at a time: interview notes, ticket exports, analytics, retro notes, shared folders, and anything else I name.

Then list each source I named, with:
- where it is (tool, folder or path)
- what is in it, in a few words
- whether it holds people's names: customers, colleagues, anyone

Show me the list. Save nothing.
