---
key: ae101-m5-worktree-setup
dest: Claude Code
runtime: any
origin: agentic-engineering-101/learn-from-the-test
requires:
  - id: m4-starting-point-sha
    source: prompt:ae101-m4-commit-starting-point
produces:
  - id: m5-worktree
    location: ../<repo-name>-m5/ (m5/<task-slug> branch)
    consumed-by:
      - prompt:diagnose-and-resend-1
      - prompt:ae101-m5-rerun-packaged
    note: also serves as cwd for diagnose-and-resend-2..6, spot-gaps-build-the-loop-*, arc-retrospective-1 (environmental, not formally required)
opportunistic-copy:
  - id: claude-local-md
    if-present-at: ../<repo-name>/CLAUDE.local.md
    rationale: born at M1's compound-and-close-1; copied so M5/M6 compounding has M1/M3 evidence
  - id: memory-folder
    if-present-at: ../<repo-name>/.claude/memory/
    rationale: born at M4's walk-and-send-off Phase 2; copied so M5/M6 inherits the three-block memory built during M4
---
Find the branch starting with `m4/` (run `git branch -a | grep 'm4/'`). There may be more than one — a push leaves both `m4/<slug>` and `remotes/origin/m4/<slug>`, and a replay can leave several `m4/`-prefixed branches. Pick the one whose log includes the "M4 starting point" commit. If that commit message has been rewritten, ask me for the SHA from the M4 session close. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so M5/M6 compounding has the M1/M3 evidence to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  mkdir -p ../<repo-name>-m5/.claude/
  cp -r ../<repo-name>/.claude/memory/ ../<repo-name>-m5/.claude/memory/  (if .claude/memory/ exists in the original repo)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
