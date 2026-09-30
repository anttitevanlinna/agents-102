---
key: em-close-declare-your-intent
dest: Claude Code
runtime: cli
context: final move of the module
origin: engineering-management/declare-your-intent
note: EM M4 close. Calibration question (progress / ground for progress; did the coalition come along) against intent, rehearsal, creation v1 and the hand-off note; second 1-10 confidence rating against the M1 baseline in the Decision Journal's opening entry (stands in for the M6 rating; the proving run ends at M4). Answers written to the Decision Journal.
requires:
  - id: em-intent
    source: prompt:em-write-intent
  - id: em-rehearsal
    source: prompt:em-rehearse-reactions
  - id: em-creation
    source: prompt:em-build-creation-v1
  - id: em-confidence-baseline
    source: prompt:em-install-leadership-memory
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
opportunistic-copy:
  - id: em-observations
    if-present-at: observations/
    rationale: the hand-off note from "Put it in someone's hands"; the coalition member may not have used v1 by the close, so the prompt reads the note if it is there and says so if not
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: calibration answer + second confidence rating in the Decision Journal
---
Ask me whether I made progress in this module, and whether I laid ground for progress later. Hold my answer against the evidence: `intent.md`, `rehearsal.md`, what is in `creation/` and its first run, and my hand-off note in `observations/` if I wrote one. If nobody has used the creation yet, say so plainly; the hand-off is the evidence for now.

Then ask whether the people I am bringing along came with me, and what tells me.

Last, ask me to rate from 1 to 10 my confidence in leading my organisation to an AI-first and agentic world. Put the number next to my first rating in the Decision Journal's opening entry, and ask what moved it.

Ask one question at a time, in chat, not with AskUserQuestion. When I have answered all three, write them into the Decision Journal in `team-leadership.md` as this module's closing entry, and tell me what you wrote.
