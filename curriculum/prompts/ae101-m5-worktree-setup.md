---
key: ae101-m5-worktree-setup
dest: Claude Code
runtime: any
origin: agentic-engineering-101/learn-from-the-test
requires:
  - id: m4-starting-point-sha
    source: prompt:ae101-m4-commit-starting-point
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
produces:
  - id: m5-worktree
    location: ../<repo-name>-m5/ (m5/<task-slug> branch)
    consumed-by:
      - prompt:diagnose-and-resend-1
      - prompt:ae101-m5-rerun-packaged
    note: also serves as cwd for diagnose-and-resend-2..6, spot-gaps-build-the-loop-* (environmental, not formally required)
opportunistic-copy:
  - id: claude-local-md
    if-present-at: ../<repo-name>/CLAUDE.local.md
    rationale: born at M1's compound-and-close-1; copied so M5/M6 compounding has M1/M3 evidence
  - id: observations-folder
    if-present-at: ../<repo-name>/observations/
    rationale: born at M4's walk-and-send-off Phase 2; copied so M5/M6 inherits the observations folder built during M4
---
Read `./task.md`. Use the branch named in its `Run coordinates (do not rewrite or remove)` block — that block is authoritative; ignore any other `Branch:` line in the task body, which may name a different slug. Don't rediscover the branch with broad branch search. Verify that branch exists locally or as a remote-tracking branch, then find the "M4 starting point" commit on that named branch. If that commit message has been rewritten or is ambiguous, ask me for the SHA from the M4 session close. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so compounding has the previous sessions material to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  cp -r ../<repo-name>/observations/ ../<repo-name>-m5/observations/  (if observations/ exists in the original repo)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
