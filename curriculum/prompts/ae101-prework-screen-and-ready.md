---
key: ae101-prework-screen-and-ready
dest: Claude Code
runtime: any
origin: agentic-engineering-101/prework
requires:
  - id: ae101-content-dir
    source: prompt:ae101-prework-extract-and-install
  - id: candidate-bugs
    source: scrollback (student names three trivial-and-visible candidates after this prompt fires)
produces:
  - id: picked-bug
    location: scrollback (student picks from screened candidates)
    consumed-by:
      - prompt:fix-tests-first-1
  - id: repo-readiness
    location: scrollback (test command or named check path, git status, PR readiness blockers)
    consumed-by:
      - module:getting-going
---
Walk these in order, ask one question at a time if you need to, no preamble.

1. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

2. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Report success on each step and tell me what you did.
