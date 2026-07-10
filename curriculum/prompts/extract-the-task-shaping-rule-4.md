---
key: extract-the-task-shaping-rule-4
dest: Claude Code
runtime: any
origin: exercises/read-the-ticket-rules
requires:
  - id: ticket-data
    source: scrollback (student pastes one ticket)
produces:
  - id: backlog-refinement-rules
    location: scrollback (5 proposed rules)
    consumed-by: []
---
Reverse-engineer how this team uses its task manager from one ticket. Infer basic rules from the fields and wording: status, labels, priority, component, estimate, owner, epic, acceptance criteria, comments, links, and custom fields.

Separate strong signals, guesses that need more tickets, and things you cannot tell.

Then propose five basic rules a backlog-refinement agent could use on future tickets.

Ticket:
