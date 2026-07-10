---
key: compound-and-close-2
dest: Claude Code
runtime: any
origin: exercises/close-the-ticket
requires:
  - id: shipped-bug-fix
    source: prompt:fix-tests-first-3
  - id: ticket-tracker
    source: external (Linear / Jira / GitHub Issues via MCP connector)
produces:
  - id: ticket-summary
    location: scrollback (ticket fields + comments read back)
    consumed-by:
      - prompt:compound-and-close-3
---
Read the ticket for the bug we just fixed. Tell me what it says: reporter, description, any comments. If you can't find it, search the tracker by keywords from the bug; if there still isn't one, say so and we'll create one.

Ticket:
