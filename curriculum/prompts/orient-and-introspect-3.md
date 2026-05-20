---
key: orient-and-introspect-3
dest: Claude Code
runtime: any
origin: exercises/orient-and-introspect
requires: []
produces:
  - id: context-window-read
    location: scrollback (/context output showing window utilization)
    consumed-by:
      - prompt:compound-and-close-1
    note: pedagogical delta against read-self-report reveals the unread slice
---
/context
