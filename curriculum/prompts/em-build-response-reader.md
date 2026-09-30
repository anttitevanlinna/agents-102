---
key: em-build-response-reader
dest: Claude Code
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2, exercises/build-the-response-reader. Writes the reader agent file and runs it once; the daily scheduled task (em-response-reader-task) runs the same file. Proposes only, never writes team-leadership.md.
requires:
  - id: em-leadership-memory
    source: prompt:em-log-first-three
  - id: em-starter-questions
    source: prompt:em-draft-starter-questions
  - id: em-responses
    source: student-input (responses/, one file per person, verbatim answer + the question + date; exercises/send-the-first-three)
    conditional: answers-arrived
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
    note: cold-start input while responses/ is still empty in the room
produces:
  - id: em-response-reader
    location: agents/response-reader.md
    consumed-by:
      - prompt:em-response-reader-task
      - prompt:em-shortlist-and-first-move
  - id: em-shortlists
    location: shortlists.md
    note: two lists, move candidates and coalition candidates, each entry quoting its answer; rewritten by every scheduled run
    consumed-by:
      - prompt:em-close-ask-before-you-move
      - prompt:em-shortlist-and-first-move
---
Write a reader agent for my team's answers and save its instructions as `agents/response-reader.md`. Each time it runs, it reads every file in `responses/` against Team Knowledge in `team-leadership.md` and the questions in `questions.md`, then rewrites `shortlists.md` with two lists.

Move candidates: what the answers say is blocked, wanted or worth trying, each with the line it comes from quoted.

Coalition candidates: people whose answers show agency, such as a proposal, an offer to help, a question back, or an objection with a fix in it. Sort by what they wrote, not by seniority and not by how positive they sound. Quote the line that put each person there.

Under both lists, name who hasn't answered yet, without ranking them down. While `responses/` is empty or thin, read `observations/` as a starting point and mark every entry that rests on an observation rather than an answer. The reader only proposes: it never edits `team-leadership.md`.

Then run it once now and tell me what it put on each list. Don't call AskUserQuestion; if something is unclear, say so and make a reasonable call.
