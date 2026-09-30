---
key: em-rehearse-reactions
dest: Claude Code
runtime: cli
origin: engineering-management/declare-your-intent
note: EM M4 exercise rehearse-the-reactions. One subagent per kind of person on the team, each given only intent.md + the Team Knowledge entries that describe that kind; never a named colleague, never a persona alone. Writes rehearsal.md and Team Knowledge gaps; leaves intent.md to the manager's conversational revision.
requires:
  - id: em-intent
    source: prompt:em-write-intent
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
produces:
  - id: em-rehearsal
    location: rehearsal.md
    consumed-by:
      - prompt:em-close-declare-your-intent
  - id: em-leadership-memory
    location: team-leadership.md
    note: gaps the rehearsal could not ground, added to Team Knowledge as things to find out
---
Read `intent.md` and Team Knowledge in `team-leadership.md`. From the entries, find the three to five kinds of people my team actually has: for example who is already ahead, who the last change burned, who waits to see. Name each kind by what it is, never by a person's name.

Start one subagent per kind. Give each only `intent.md` and the Team Knowledge entries that describe its kind. Each one reacts to the intent the way those entries suggest: which line lands, which line loses them, and what they would ask me. Every reaction quotes the entries it stands on. Where the entries are too thin to know, the subagent says so instead of guessing.

Write the reactions to `rehearsal.md`, one section per kind. Under them, name the line that lands best, the line that loses the most people, and one revision to the intent that keeps its aim and loses fewer people.

Add each thin spot to Team Knowledge as something I need to find out, and say about whom.

Tell me what you wrote. Don't change `intent.md`. Don't call AskUserQuestion.
