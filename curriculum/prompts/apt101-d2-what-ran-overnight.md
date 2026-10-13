---
key: apt101-d2-what-ran-overnight
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-read-the-digest
requires:
  - id: morning-agent-output
    source: prompt:personal-agent-homework-3
  - id: look-for-line
    source: prompt:apt101-d1-your-look-for-line
  - id: expect-md
    source: prompt:apt101-d1-your-expect-line
produces:
  - id: digest-day1
    location: "team/<my-name>/digest-day1.html"
    note: "read by Day 3 five users, what good means"
  - id: doubts-md
    location: "team/<my-name>/doubts.md (head: look-for + expect lines)"
    note: "read by apt101-d2-mark-the-doubt"
---
First, keep copies before tonight's run overwrites anything. Copy module-2/morning-agent/latest.html to team/<my-name>/digest-day1.html, unchanged. Then write two lines at the head of team/<my-name>/doubts.md, word for word: my ## Look for line from module-2/morning-agent/morning.md, and my expectation from team/<my-name>/expect.md. Ask my first name if you don't know it.

Then read morning.md, latest.html, team/what-goes-in.md and team/bet.md. Show me four lines side by side, each quoted exactly:
- the digest's headline
- my expectation
- my look-for line
- the hypothesis in team/bet.md the digest speaks to

Don't comment on how they compare. That's for us.

Then report what ran:
- when latest.html was last written
- which job ran, from which brief
- which files it read, and any it read that sit outside what team/what-goes-in.md lets in

Last, list every claim in the digest, ranked by how much a decision would rest on it. Give each the source file it came from, or "no source".
