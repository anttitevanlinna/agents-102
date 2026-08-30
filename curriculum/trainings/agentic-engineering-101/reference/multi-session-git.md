# Multi-session and Git: survival guide

Optional homework between M1 and M2. How to run more than one Claude Code session on the same codebase without the sessions wrecking each other's state.

You do not have to start here. Find your way to this over time. There is no rush.

## Why multi-session, why Git

Once you trust Claude Code on one thing, you will want to run it on more things at once. A bug in one corner of the repo, a refactor in another, a small feature in a third. Three sessions, three tasks, one hour that used to be one task.

Git is what makes this safe. Every session works against a commit graph that remembers who changed what. If two sessions collide, Git tells you at merge time. Nothing committed is silently overwritten.

Worktrees are the Git feature that makes multi-session fast. Instead of one working directory per repo, you get one per branch, each in its own folder, all sharing the same underlying Git history. Open N folders, open N sessions, run N tasks.

## Worktrees vs. branches vs. clones

Three ways to have "another copy of this code to work on." They behave differently.

**Branches** are cheap. One command, instant. The cost is switching: when you check out a different branch, your working tree gets overwritten in place. Any editor you have open now points at different file contents than a second ago. A Claude Code session running against that directory gets confused too. Its scrollback references files that no longer look the way it remembers.

**Clones** are heavy. `git clone` gives you a full second copy of the repo on disk. Independent history, detached from the original. Fine for "I want to experiment on a fork I'll throw away." Overkill for "I want to work on two branches at once."

**Worktrees** are the middle path. One repo, many working directories, each checked out to its own branch. Shared Git history, independent working trees. Switching between them is `cd`, not `git checkout`.

```
git worktree add -b feature-x ../my-repo-feature-x
```

That creates a sibling directory on a new branch `feature-x`. Your original working directory stays on whatever branch it was on. Two folders, two branches, zero checkout churn.

If the branch already exists, drop the `-b`: `git worktree add ../my-repo-feature-x feature-x`.

## Opening N Claude Code sessions on the same codebase

Each Claude Code session opens in a working directory. A worktree gives you one working directory per session.

The flow:

1. `git worktree add -b bug/issue-412 ../repo-bug-fix`
2. `git worktree add -b refactor/auth-module ../repo-refactor`
3. `git worktree add -b feature/export-csv ../repo-feature`
4. Open three Claude Code sessions, one per folder, one task each.

Each session has its own scrollback, its own working directory, its own branch. They do not see each other.

The agent-level trap: if two sessions open the same working directory (not two worktrees, the same folder), the later write wins. The earlier session's in-progress edit gets clobbered on disk, its scrollback still references the old content, and the next turn goes sideways. The rule is one session per working directory. Worktrees enforce this for free; running two sessions in one folder breaks it.

Close a session, delete the worktree when the branch is merged:

```
git worktree remove ../repo-bug-fix
```

## Stashing, switching, and small recoveries between sessions

Sometimes one session's in-flight work needs to show up in another. A helper function you wrote in the bug-fix session is exactly what the feature session needs.

`git stash` is how work moves between sessions. Stash in one, pop in the other. The changes ride the Git graph across worktrees because the graph is shared.

```
git stash push -m "helper fn for csv export"
cd ../repo-feature
git stash pop
```

Claude Code sessions keep their own conversational state. Git is what moves actual changes between them. Don't try to make one session "tell" the other what it did; commit, stash, or push a branch, and let Git carry the bits.

Agent committed to the wrong branch in one session? Don't tie your brain in knots. `git reset --soft HEAD~1` keeps the changes staged, switch branches, re-commit on the right one. A thirty-second fix.

## Conflict recovery when two sessions edited the same file

Different worktrees, different branches, both touched `src/auth/session.ts`. Fine while you work. The conflict surfaces at merge.

Git tells you. Both sessions will stop and show you the conflict markers. Do not let either agent resolve the conflict automatically. This is the one place the human stays in the driver seat. Read the diff. Pick which line wins, or write the line that reconciles both. Let Git commit the resolution.

The reason: agents are confident and do not always read carefully enough at a merge boundary. You know what each change was for. Git knows the lines. Put the two together yourself.

## When NOT to run multi-session

Situations where one session beats three.

1. **Ordering dependencies.** Schema migration, followed by data backfill, followed by the code that reads the new column. Each step has to finish before the next starts. Parallelising buys you nothing and risks running step 3 against pre-step-1 state.

2. **Greedy parallelism on a small task.** Two 20-minute tasks spun up in parallel sounds like 20 minutes of calendar time, but if you spend 15 minutes coordinating worktrees and another 10 recovering from a conflict, you lost. One session, two tasks in sequence, done in 45 minutes.

3. **New to the loop.** If you are still learning what "good" looks like in one session, adding a second session adds variables, not learning. Land the single-session loop first. Multi-session will still be waiting.

4. **Coupled writes, shared decisions.** Reads, investigations and reviews parallelise cleanly. Writes that share a design decision do not: each session makes implicit calls, naming, style, edge-case handling, and the calls collide at merge even when the lines do not. Keep those writes in one session, and let the other sessions read, review and report into it.

## Close

Two sessions is a milestone. Five is a habit. Ten is something you grow into.

<!-- maintainer -->

**Canonical home:** `curriculum/trainings/agentic-engineering-101/reference/multi-session-git.md`. Referenced from AE101 M1 homework.

**Read time:** ~10 min.

**Attribution:** Cherny frames parallel worktrees as "the single biggest productivity unlock" in his [Jan 2026 X thread](https://x.com/bcherny/status/2017742743125299476) [practitioner direct]. Separately, [Gergely Orosz on Boris Cherny, *Building Claude Code with Boris Cherny*](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) [practitioner analysis] — Cherny there describes running five parallel Claude Code instances across separate checkouts, corroborating parallel-session workflows generally, not the "productivity unlock" framing or the "worktrees" word.

**Attribution, item 4 of § When NOT:** the reads-parallelise / single-writer shape is Cognition's (Walden Yan, *Multi-Agents: What's Actually Working*); quotes, lineage and the dated stamp live in `supplementary/workflow-composition-lineages.md` § *Single writer with advisor agents*. The body carries the shape without the name: this page teaches the student's own session topology, not multi-agent architecture.

**Source verification — MUST DO before first cohort:**
- Open both URLs against original. Re-confirm the X-thread quote verbatim (X posts can be edited or deleted) and re-confirm the Pragmatic Engineer piece still doesn't use "worktree"/"worktrees" before letting it stand as corroboration of anything beyond parallel-checkout workflows.
- The phrase "single biggest productivity unlock" and the word "worktrees" ride on the X thread only. Do not let the interview citation imply it independently corroborates either.
- Fallback if the X thread no longer resolves/confirms: drop the single attribution and reframe as "some practitioners describe parallel worktrees as a major productivity unlock" without naming Cherny.
- Fallback if the interview no longer supports even the parallel-checkouts framing: drop the second citation and let the X thread stand alone.
- `[checked:2026-08-01 result:OK due:2026-08-21]` https://x.com/bcherny/status/2017742743125299476 — [practitioner direct] Cherny "single biggest productivity unlock" quote; verbatim text + byline re-confirmed 2026-08-01 via search-index title of the canonical URL (oEmbed now 402s and TwStalker mirrors 403 — see `memory/reference_x_content_fetch_workaround.md`), post dated 2026-01-31. fallback: if unconfirmable at next check, reframe as unattributed "some practitioners" framing.
- `[checked:2026-07-12 result:OK due:2026-09-04]` https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — [practitioner analysis: Gergely Orosz on Boris Cherny] describes 5 parallel Claude Code instances via separate checkouts; full-text search for "worktree"/"worktrees"/"productivity unlock" returns zero hits. Cited only for parallel-session workflows, never for the word "worktrees." fallback: drop this citation if it no longer supports even the checkouts framing.
- `[checked:2026-08-30 result:OK due:none]` `supplementary/workflow-composition-lineages.md:cognition-multi-agents-working` — [delegated stamp] Item 4's single-writer shape; the dated live check (currently 2026-05-25, due 2026-11-25) is owned by the supplementary. `due:none`, a delegation does not expire. fallback: keep the item, it stands as ordinary merge-hygiene advice without the lineage.

**Quality:** compendium-audited 2026-08-29 (writing@43e6cae1 story@43e6cae1 technical@8cc00874 behavior@b3143a4 pedagogy@43e6cae1 strategy@b3143a4 slides@43e6cae1)
- judges @43e6cae1: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
