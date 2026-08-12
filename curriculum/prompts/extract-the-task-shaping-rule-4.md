---
key: extract-the-task-shaping-rule-4
dest: Claude Code
runtime: any
origin: exercises/extract-the-task-shaping-rule
requires:
  - id: task-shaping-rules-draft
    source: prompt:extract-the-task-shaping-rule-1
  - id: story-ticket
    source: external (Linear / Jira / GitHub Issues; student pastes one story ticket, or the fields if the session cannot reach the tracker)
produces:
  - id: story-shaping-rules
    location: scrollback (3 proposed rules, held beside the session-derived set; no file written at this step)
    consumed-by:
      - prompt:extract-the-task-shaping-rule-2
---
Reverse-engineer how this team writes stories from one story ticket. Infer basic rules from the fields and wording: status, labels, priority, component, estimate, owner, epic, acceptance criteria, comments, and links.

If you cannot open the ticket, say so and ask me to paste the fields. Don't infer conventions from the URL.

Separate strong signals, guesses that need more tickets, and things you cannot tell.

Then propose three basic rules an agent could follow when shaping the next story in this tracker. Keep them in chat beside the rules we just named. We pick where the file lives next, so don't write one yet.

Story ticket:
