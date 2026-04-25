# Edit summary — multi-session Git survival guide

**File:** `curriculum/reference/multi-session-git.md`
**Status:** drafted 2026-04-24, pre-first-cohort.
**Word count:** ~1,140 words (target 800–1,200, sits at the top of range to cover all seven required sections without feeling thin).

**Sections shipped (7, in strategy-spec order):**
1. Why multi-session, why Git — the trust→scale move + Git-makes-it-safe + worktrees-make-it-fast + permission beat.
2. Worktrees vs. branches vs. clones — comparison + the one-line `git worktree add` command.
3. Opening N Claude Code sessions on the same codebase — three-worktree walkthrough + one-session-per-working-directory rule + `git worktree remove` cleanup.
4. Stashing and switching between sessions — `git stash push/pop` across worktrees + `git reset --soft HEAD~1` wrong-branch recovery.
5. Conflict recovery when two sessions edited the same file — do not let agents auto-resolve; human stays in driver seat at merge.
6. When NOT to run multi-session — ordering deps, greedy parallelism, new-to-the-loop.
7. Close — *"Two sessions is a milestone. Five is a habit. Ten is something you grow into."* No prescribed number.

**Compendium conformance:** second person throughout; no em-dashes in body (confirmed via grep after two rounds of edits); no banned words (honest, delve, crucial, importantly, ritual, ceremony, substrate, practice-as-noun); links in `[Title](URL)` format; no fenced-block placeholders; section headers action-verb where the section is about doing, declarative where about understanding.

**Open source-verification TODOs (logged in maintainer block):**
- `git worktree add` / `git worktree remove` current syntax against `git-scm.com/docs/git-worktree`.
- `git reset --soft HEAD~1` behaviour against current Git docs.
- Whether Claude Code has shipped a native multi-worktree session switcher by first cohort (would demote the manual flow to fallback).

**Open question logged for first-cohort feedback:** default vs. advanced-move positioning for `git worktree` in AE101. Current stance: optional homework, not prerequisite.

**Attribution:** Cherny cited once in maintainer block (Jan 2026 X thread + Pragmatic Engineer interview), per the attribution-cap rule — student-side body carries zero citations.
