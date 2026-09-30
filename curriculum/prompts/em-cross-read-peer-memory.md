---
key: em-cross-read-peer-memory
dest: Claude Code
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise cross-read-a-peers-memory. Read a peer manager's export against my memory; shared patterns + blind spots into Team Knowledge as peer-tagged observations; one outside-view Quality Gate check.
requires:
  - id: em-peer-file
    source: external (a peer manager's peer-export.md, saved as peers/<name>.md; without a partner, curriculum/trainings/engineering-management/sample-peer-export.md saved as peers/sample.md)
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-shortlists
    source: prompt:em-shortlist-and-first-move
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: Team Knowledge observations tagged peer:<name>; one outside-view check added to the Quality Gate
    consumed-by:
      - prompt:em-find-two-crux
---
A manager in my company shared their memory export. It's in `peers/`. Read it against my `team-leadership.md` and `shortlists.md`.

Give me three things: patterns our teams share, what they see in their team that my memory has no line for, and where their team contradicts something my memory treats as settled. Quote the line from each file behind every point.

Add what I don't already have to Team Knowledge as observations tagged with `peer:` and the peer file's name. One outside report is one sighting, so none of these become hypotheses or rules yet.

Then add one check to the Quality Gate that comes from the outside view: something their team shows that I would otherwise miss in mine.

Tell me what changed in `team-leadership.md`. If the peer file is thin, say so and work with what's there. Don't use AskUserQuestion.
