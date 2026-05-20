---
key: orient-and-introspect-1
dest: Claude Code
runtime: any
origin: exercises/orient-and-introspect
requires: []
produces:
  - id: repo-shape-report
    location: scrollback (Claude's read of what's in the repo)
    consumed-by:
      - prompt:orient-and-introspect-2
---
Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
