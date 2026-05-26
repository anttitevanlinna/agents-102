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
  - id: m5-run-coordinates
    location: plan.md (worktree root; protected top block "Run coordinates"; m5/ branch + transcript path, recorded at run start)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-1
      - prompt:arc-retrospective-1
      - prompt:agents-that-build-agents-1
    note: M6 readers get the m5 branch + transcript path from plan.md instead of branch-grep + mtime transcript search
  - id: run-notes
    location: RUN-NOTES.md (at worktree root)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-1
---
Before you start, write a protected block at the top of `plan.md` headed `Run coordinates (do not rewrite or remove)`, holding this run's `m5/` branch exactly as `git branch --show-current` reports it (read it back from git — don't retype it from memory) and this session's transcript path (under `~/.claude/projects/`, keyed by the `CLAUDE_CODE_SESSION_ID` environment variable). You'll mutate the rest of plan.md as you run; leave that block alone. Confirm the `.jsonl` exists before writing it; if you can't determine the path, stop and tell me rather than guessing.

Then ask for or write anything else you want for the run.

Run the task at `./task.md` using the packaging in this worktree: reference, plan.md, and verifier all at the worktree root (find them by listing the directory).

Rules: run the verifier per plan.md cadence; don't paper over failures; if you get stuck, write into RUN-NOTES.md and try a different angle; I'm walking away.

Report back as three lists, no narrative, no hedging:
  shipped — each artefact + path
  did NOT ship — each item, no "partial" / "mostly" / "in progress"
  verifier — last output line of each run, pasted verbatim
If any list is empty, say "none."
