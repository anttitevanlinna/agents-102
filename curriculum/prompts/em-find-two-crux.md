---
key: em-find-two-crux
dest: Claude Code
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise find-your-two-crux. Crux method inlined (no crux skill ships to this audience). Reads memory + responses + shortlists + first move + peers; proposes 4-6 candidates with quoted evidence and the alternative each beats; manager picks two in turn.
requires:
  - id: em-leadership-memory
    source: prompt:em-cross-read-peer-memory
  - id: em-responses
    source: student-input (responses/, one file per person)
  - id: em-shortlists
    source: prompt:em-shortlist-and-first-move
  - id: em-first-move
    source: prompt:em-shortlist-and-first-move
  - id: em-peer-file
    source: external (peers/<name>.md, saved by the manager in cross-read-a-peers-memory)
produces:
  - id: em-two-crux
    location: team-leadership.md
    note: two crux in Team Knowledge as hypotheses tagged crux + Decision Journal entry (candidates not picked, why these two, trade-offs)
    consumed-by:
      - prompt:em-schedule-coalition-checkin
      - prompt:em-close-find-the-two-crux
      - prompt:em-deliberate-intent
      - prompt:em-rehearse-reactions
      - module:declare-your-intent
---
Find the crux of my team's move toward agentic work. Read `team-leadership.md`, every answer in `responses/`, `shortlists.md`, my first-move entry in the Decision Journal, and the peer file in `peers/`.

A crux is the obstacle that, once it moves, makes other stuck things movable. It is not a goal ("get the team using agents") and not a category ("culture"). It names the mechanism that blocks: "the two seniors who review every change have no time to try agents, so nobody sees it done on our own code." Test each candidate: if it moved, would at least three other stuck things release? If not, keep looking.

Propose four to six candidates. For each, quote the lines from my files that point to it and name the alternative it beats. When I push back on one, rewrite it rather than defend it. Then ask me in chat which two I'm keeping, and wait.

Write my two into Team Knowledge as hypotheses tagged `crux`, one sentence each, with the evidence lines under them. Log the choice in the Decision Journal: the candidates I cut, why these two won, and what I give up by not working on the others.

Show me both crux as they now read in the file. Don't use AskUserQuestion.
