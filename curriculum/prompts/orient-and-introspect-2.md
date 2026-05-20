---
key: orient-and-introspect-2
dest: Claude Code
runtime: any
origin: exercises/orient-and-introspect
requires:
  - id: repo-shape-report
    source: prompt:orient-and-introspect-1
produces:
  - id: read-self-report
    location: scrollback (Claude's introspection — read vs skipped, with reasoning)
    consumed-by:
      - prompt:compound-and-close-1
---
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
