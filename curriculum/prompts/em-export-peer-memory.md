---
key: em-export-peer-memory
dest: Claude Code
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise cross-read-a-peers-memory. Draft a shareable export of Team Knowledge + shortlists; people become roles or pseudonyms, no quotes from responses/; owner reviews before it leaves.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-shortlists
    source: prompt:em-shortlist-and-first-move
  - id: em-responses
    source: student-input (responses/, read only to know what to leave out)
produces:
  - id: em-peer-export
    location: peer-export.md
    note: leaves the machine by the manager's hand; lands in the peer's peers/<name>.md
    consumed-by:
      - prompt:em-cross-read-peer-memory
---
Write `peer-export.md`: what my memory has learned about my team, in a form another manager in my company can read. Take it from Team Knowledge in `team-leadership.md` and from the two lists in `shortlists.md`.

Nobody on my team appears by name. Give each person their role, or a pseudonym where two people share a role, and keep it the same every time they appear. Leave out every quote from `responses/`, anything about health, family or performance, and anything I wouldn't say to that person's face.

Keep the patterns: where people sit on ADKAR, where the team sits on the adoption curve, what the answers showed, and which moves and coalition candidates are on the lists.

Where a line is borderline, leave it out. Then tell me what you left out and why. Don't use AskUserQuestion.
