---
key: ae101-m5-rerun-packaged
dest: Claude Code
context: final move of the module
runtime: any
origin: agentic-engineering-101/learn-from-the-test
requires:
  - id: m5-worktree
    source: prompt:ae101-m5-worktree-setup
  - id: reference-artefact
    source: prompt:diagnose-and-resend-6
  - id: plan-md
    source: prompt:diagnose-and-resend-6
  - id: verifier
    source: prompt:diagnose-and-resend-4
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-completed
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
produces:
  - id: packaged-run-artefact
    location: m5/<task-slug> branch (commits, changed files, RUN-NOTES.md)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-1
      - prompt:spot-gaps-build-the-loop-5
      - prompt:arc-retrospective-1
  - id: m5-session-transcript
    location: ~/.claude/projects/<encoded-worktree-cwd>/<uuid>.jsonl
    consumed-by:
      - prompt:spot-gaps-build-the-loop-1
      - prompt:arc-retrospective-1
  - id: run-notes
    location: RUN-NOTES.md (at worktree root)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-1
---
Re-run the task we just packaged. The reference, plan.md, and verifier are at the paths we wrote in this session.

Rules: run the verifier per plan.md cadence; don't paper over failures; if you get stuck, write into RUN-NOTES.md and try a different angle; I'm walking away.

Before you start, ask for or write anything else you want for this run.

Report back as three lists, no narrative, no hedging:
  shipped — each artefact + path
  did NOT ship — each item, no "partial" / "mostly" / "in progress"
  verifier — last output line of each run, pasted verbatim
If any list is empty, say "none."
