---
key: walk-and-send-off-3
dest: Claude Code
runtime: any
origin: exercises/walk-and-send-off
requires:
  - id: gap-audit-report
    source: prompt:walk-and-send-off-2
produces:
  - id: observations-folder
    location: ./observations/ (observations + business-rules gaps) + ./CLAUDE.local.md (sharpened rules) + connector setup (no file)
    consumed-by:
      - prompt:walk-and-send-off-4
      - prompt:ae101-m4-take-task-end-to-end
      - prompt:diagnose-and-resend-6
      - prompt:agents-that-build-agents-handoff
      - prompt:ae101-m5-worktree-setup
    note: 2-3 fills per audit run, one per picked gap; destination depends on the audit's per-gap shape label. The ./observations/ folder is the durable artefact M4-M6 read as 'observations-folder'; ae101-m5-worktree-setup copies it opportunistically into the M5 worktree.
---
Use the AskUserQuestion tool, at most four options per question, one question per call. First ask which 2-3 audit gaps I want to focus on; if the audit surfaced more than four, offer the four most material as options.

After I've picked, list the gaps you left off so I can see what didn't make the cut.

For each picked gap, propose a resolution in the shape the audit named, hear my pushback, then persist it: the `./observations/` folder in your repo for observations and business-rules gaps, `./CLAUDE.local.md` for rule sharpening, connector setup for connector wiring.
