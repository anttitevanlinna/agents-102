---
key: close-the-ticket-2
dest: Claude Code
runtime: any
origin: exercises/close-the-ticket
requires:
  - id: ticket-summary
    source: prompt:close-the-ticket-1
produces:
  - id: bug-rules
    location: scrollback (5 proposed bug rules)
    consumed-by: []
    opportunistic-copy-by:
      - prompt:compound-and-close-1
---
Reverse-engineer how this team handles bugs from one bug ticket. Infer basic rules from the fields and wording: status, labels, severity or priority, component, owner, repro steps, acceptance criteria, comments, links, and custom fields.

If we created this ticket ourselves a moment ago, say so and ask me for a different one. A ticket you wrote carries none of the team's conventions. If you cannot open the ticket, ask me to paste the fields rather than reading anything off the URL.

Separate strong signals, guesses that need more tickets, and things you cannot tell.

Then propose five basic rules an agent could follow on the next bug in this tracker.
