# Fork the worktree, *carry the evidence*

**Time:** 15 minutes.

**Session** *(continue or new, "original repo")*

Run this from your original repo. If the session you sent off from is still open, ask it there. Otherwise open a fresh one in the same place.

**What you do:** fork a sibling worktree from the commit your un-packaged run started at.

**What you build:** a worktree holding the same code and the same rules the first run had.

**The point:** a worktree lets you run the same task twice as a split test: same code, same rules, one thing changed.

---

## Phase 1: Fork it

*15 min*

- Claude works out `<repo-name>` from the working directory. If it picks the wrong repo or path, steer it in chat.

Ask Claude to fork the worktree and copy your gitignored files across.

{{prompt:ae101-m5-worktree-setup}}

- Claude usually opens with a plan summary listing the six sub-steps, then runs them. Skim past it.

## Check the copy landed

- The output should name both `CLAUDE.local.md` and `observations/` at the worktree path. A rules file that didn't copy changes two variables instead of one, and the contrast stops meaning anything.
- If your rules live somewhere other than the two paths Claude checked, ask it to copy that one across too.

## If the coordinates are missing

- Claude reads the protected `Run coordinates` block in `task.md`, uses the `m4/<slug>` branch named there, and forks from that branch's "M4 starting point" commit.
- Block gone, or the commit message rewritten? Use the starting-point SHA Claude reported before the send-off rather than guessing from branch names.
- Never captured that either? Ask Claude to run `git merge-base m4/<slug> <the branch you cut it from>` and fork from that commit. It is where the branch left the trunk, so it is where the run started.

<!-- maintainer -->

**View summary:** You fork a sibling git worktree from the commit your un-packaged run started at, copy the gitignored rules and observations across by prompt, and check both landed, so the packaged re-send changes one variable rather than two.

**Extracted from `learn-from-the-test.md` §§ *Run the fork from the original repo* + *Anchor the fork to the run coordinates*, 2026-08-12, Antti-directed** (*"this and next slide should be part of exercise module, e.g. contains prompts and session already"*). Both sections carried a Session widget and a prompt while sitting in module prose, which is the shape of an exercise. Body wording near-verbatim; the `{{prompt:ae101-m5-worktree-setup}}` ref is byte-intact. The recovery ladder (coordinates → reported SHA → merge-base) became three bullets from one paragraph; no branch was added or dropped.

**Timing.** The 15 min this file owns is the budget M5's `worktree fork` transition carried; that transition was removed in the same edit, so the module total is unchanged. Do not re-add a transition for this beat — the leaf owns its duration.

**The module keeps the framing above the include:** why the work runs in a worktree at all, and that gitignored files don't ride along by themselves. This file owns only what the student does.

**Placement:** immediately before `[Exercise: Diagnose and re-send]`. It must stay there — the diagnosis session opens *inside* the worktree this exercise creates.
