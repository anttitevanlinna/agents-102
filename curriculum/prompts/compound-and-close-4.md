---
key: compound-and-close-4
dest: Claude Code
runtime: any
origin: exercises/compound-and-close
requires:
  - id: claude-local-md
    source: prompt:compound-and-close-1
produces:
  - id: claude-local-md
    location: ./CLAUDE.local.md (in-place integrate; second-pass compound)
    consumed-by:
      - prompt:ae101-m3-sharpen-skill
      - prompt:walk-and-send-off-2
      - prompt:diagnose-and-resend-6
      - prompt:ae101-m5-rerun-packaged
      - prompt:spot-gaps-build-the-loop-2
      - prompt:arc-retrospective-1
    opportunistic-copy-by:
      - prompt:ae101-m3-fork-quality-side
      - prompt:ae101-m5-worktree-setup
    note: ae101-m2-integrate-branch WRITES to ./CLAUDE.local.md (creates if missing) but doesn't strictly consume it as a precondition
---
We're preparing to close this session. Anything more to learn and compound into ./CLAUDE.local.md since the first compound — refusals, push-backs, sequence catches, anything that earned a rule? Integrate into the existing file, don't append. Tell me in 2–3 lines what you added, or "nothing new" if nothing did.
