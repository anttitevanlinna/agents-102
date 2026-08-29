# Fork the worktree, *carry the evidence*

**Time:** 15 minutes.

**Session** *(continue or new, "original repo")*

Run this from your original repo. If the session you sent off from is still open, ask it there. Otherwise open a fresh one in the same place.

**What you do:** fork a sibling worktree from the commit your un-packaged run started at.

**What you build:** a worktree holding the same code and the same rules the first run had.

**The point:** a worktree lets you run the same task twice as a split test.

---

## Phase 1: Fork it

*15 min*

- This module's work (diagnosis, verifier, reference, plan.md, and the re-send) runs in the worktree, so the second session starts from the same code state as the first.
- Gitignored files (your `CLAUDE.local.md`, `observations/`) don't ride into a worktree, because git doesn't see them. The setup prompt copies them across, so what you built in Module 1<!--flag:module:spot-gaps-build-the-loop--> and Module 4<!--/flag:module:spot-gaps-build-the-loop--> comes with you. From there the two copies compound separately.<!--flag:module:spot-gaps-build-the-loop--> After Module 6 you decide what to merge back.<!--/flag:module:spot-gaps-build-the-loop-->
- Claude works out `<repo-name>` from the working directory. If it picks the wrong repo or path, steer it in chat.

Ask Claude to fork the worktree and copy your gitignored files across.

{{prompt:ae101-m5-worktree-setup}}

- Claude usually opens with a plan summary listing the six sub-steps, then runs them. Skim past it.

## Check the copy landed

- The output should name both `CLAUDE.local.md` and `observations/` at the worktree path. A rules file that didn't copy changes two variables instead of one, and the contrast stops meaning anything.
- Look at the worktree yourself: `ls ../<repo-name>-m5/CLAUDE.local.md ../<repo-name>-m5/observations/`. A copy that silently skipped still reports as done.
- If your rules live somewhere other than the two paths Claude checked, ask it to copy that one across too.

## Anchor the fork to the run coordinates

- Claude normally reads the protected `Run coordinates` block in `task.md`, uses the `m4/<slug>` branch named there, and forks from that branch's "M4 starting point" commit.
- If that block is gone or the commit message was rewritten, use the starting-point SHA Claude reported before the send-off rather than guessing from branch names.
- If you never captured that either, ask Claude to run `git merge-base m4/<slug> <the branch you cut it from>`. That is where the branch left the trunk, a commit or two before the run started, carrying the same code.

<!-- maintainer -->

**View summary:** You fork a sibling git worktree from the commit your un-packaged run started at, copy the gitignored rules and observations across by prompt, and check both landed, so the packaged re-send changes one variable rather than two.

**Extracted from `learn-from-the-test.md` §§ *Run the fork from the original repo* + *Anchor the fork to the run coordinates*, 2026-08-12, Antti-directed** (*"this and next slide should be part of exercise module, e.g. contains prompts and session already"*). Both sections carried a Session widget and a prompt while sitting in module prose, which is the shape of an exercise. Body wording is near-verbatim and the `{{prompt:ae101-m5-worktree-setup}}` ref is byte-intact. The recovery ladder runs coordinates → reported SHA → merge-base, one bullet per rung; all three rungs are load-bearing, so do not drop one to shorten the slide.

**Timing.** The 15 min this file owns is the fork's whole budget, and M5's total already includes it. Do not add a module-level transition for this beat — the leaf owns its duration, and a transition would bill it twice.

**Leap test.** By the next working day the student: (a) owns a sibling worktree at `../<repo-name>-m5` forked from a named starting commit, with the M4 rules and observations inside it; (b) checks a copy landed by listing the destination rather than reading the agent's summary; (c) recovers a fork point from `git merge-base` when the coordinates block is gone.

**Failure mode + escape hatch (Phase 1).** Dominant failure is the silent partial copy — `cp` skips a missing source, Claude reports success, and the re-send then changes two variables instead of one, which voids the split test the module rests on. The `ls` bullet under *Check the copy landed* is the student's own catch; the trainer's room moves for this and for a missing-coordinates fork live in `trainer-modules.md` § M5 trainer cues, and are not restated here.

**Recovery ladder (2026-08-12, Antti-directed read).** The section heading is neutral (*Anchor the fork to the run coordinates*) because the first bullet is the normal path, not a fallback; a heading naming only the failure case contradicts its own opening line. Each bullet opens with its trigger rather than its remedy, so reading down the list is how the student locates which rung applies. **Rung three is deliberately approximate:** `git merge-base` returns the trunk commit *before* "M4 starting point", verified on this exercise's exact branch shape in a throwaway repo. The intervening commit only appends the coordinates block, so the source is identical and the rung holds — do not tighten the wording back to *"where the run started"*.

**Placement:** immediately before `[Exercise: Diagnose and re-send]`. It must stay there — the diagnosis session opens *inside* the worktree this exercise creates.

**Phase 1 opens with the moved-in rationale (2026-08-25, Antti-directed).** The module file's `## Set up the worktree` section folded in as the phase's first two bullets: why the work runs in the worktree, and why the gitignored files need the copy (runtime-fork flags intact: `module:spot-gaps-build-the-loop` gates both the "and Module 4" clause and the Module 6 merge-back sentence). The module body's "Before the exercise session, fork the un-packaged session's starting SHA" setup line was dropped as duplicating this file's intro. Do not restore the section to the module body.

**Quality:** compendium-audited 2026-08-29 (writing@7f5ec798 story@441b361f technical@8cc00874 behavior@61e7fc9 pedagogy@1abb84c6 strategy@61e7fc9 slides@0cea7581)
- judges @7f5ec798: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
