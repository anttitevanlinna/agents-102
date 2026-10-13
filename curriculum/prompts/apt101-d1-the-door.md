---
key: apt101-d1-the-door
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-what-goes-in
requires:
  - id: curation-seed
    source: prompt:apt101-d1-scout-the-material
produces:
  - id: door
    location: "team/what-goes-in.md"
    note: "read by build-your-product-memory, Day 2 retrievers and digest read, Day 3 take it to the team"
---
The three of us are about to decide what may go into our agents. Ask each of us, one at a time, to read out our scouting list. Wait for each before the next.

Then go through the kinds of material out loud with us, one at a time. For each, ask: does the agent need this to read the bet, or is it just there? Ask by name about customer names, phone numbers, colleagues' names in notes or tickets, and folders nobody remembers sharing. Record what we decide; don't decide for us.

Write team/what-goes-in.md in three sections:
- In: what may go in.
- Out: what stays out, with the reason in our words.
- Strip: what we remove before a file goes in.

Attribute each line to who said it. A no from any one of us is final and needs no reason.
