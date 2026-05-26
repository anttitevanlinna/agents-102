---
key: walk-and-send-off-3
dest: Claude Code
runtime: any
origin: exercises/walk-and-send-off
requires:
  - id: gap-audit-report
    source: prompt:walk-and-send-off-2
produces:
  - id: gap-fills
    location: ./observations/ (observations + business-rules gaps) + ./CLAUDE.local.md (sharpened rules) + connector setup (no file)
    consumed-by:
      - prompt:walk-and-send-off-4
    note: 2-3 fills per audit run, one per picked gap; destination depends on the audit's per-gap shape label
---
Use the AskUserQuestion tool. One question per call. First ask which 2-3 audit gaps I want to focus on. For each picked gap, propose a resolution in the shape the audit named, hear my pushback, then persist it: the `./observations/` folder in your repo for observations and business-rules gaps, `./CLAUDE.local.md` for rule sharpening, connector setup for connector wiring.
