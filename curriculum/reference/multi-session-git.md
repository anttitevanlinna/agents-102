# Multi-session and Git: survival guide

Optional homework between M1 and M2. ~10 min read. How to run more than one Claude Code session on the same codebase without the sessions wrecking each other's state.

You do not have to start here. Find your way to this over time. There is no rush.

## Why multi-session, why Git

Once you trust Claude Code on one thing, you will want to run it on more things at once. A bug in one corner of the repo, a refactor in another, a small feature in a third. Three sessions, three tasks, one hour that used to be one task.

Git is what makes this safe. Every session works against a commit graph that remembers who changed what. If two sessions collide, Git tells you at merge time. Nothing silently overwrites.

Worktrees are the Git feature that makes multi-session fast. Instead of one working directory per repo, you get one per branch, each in its own folder, all sharing the same underlying Git history. Open N folders, open N sessions, run N tasks.

The permission beat, once: you will want to run multiple sessions. Find your way to do it over time. There's no rush.

## Worktrees vs. branches vs. clones

Three ways to have "another copy of this code to work on." They behave differently.

**Branches** are cheap. One command, instant. The cost is switching: when you check out a different branch, your working tree gets overwritten in place. Any editor you have open now points at different file contents than a second ago. A Claude Code session running against that directory gets confused too. Its scrollback references files that no longer look the way it remembers.

**Clones** are heavy. `git clone` gives you a full second copy of the repo on disk. Independent history, detached from the original. Fine for "I want to experiment on a fork I'll throw away." Overkill for "I want to work on two branches at once."

**Worktrees** are the middle path. One repo, many working directories, each checked out to its own branch. Shared Git history, independent working trees. Switching between them is `cd`, not `git checkout`.

```
git worktree add ../my-repo-feature-x feature-x
```

That creates a sibling directory on the branch `feature-x`. Your original working directory stays on whatever branch it was on. Two folders, two branches, zero checkout churn.

## Opening N Claude Code sessions on the same codebase

Each Claude Code session opens in a working directory. A worktree gives you one working directory per session.

The flow:

1. `git worktree add ../repo-bug-fix bug/issue-412`
2. `git worktree add ../repo-refactor refactor/auth-module`
3. `git worktree add ../repo-feature feature/export-csv`
4. Open three Claude Code sessions, one per folder, one task each.

Each session has its own scrollback, its own working directory, its own branch. They do not see each other.

The agent-level trap: if two sessions open the same working directory (not two worktrees, the same folder), the later write wins. The earlier session's in-progress edit gets clobbered on disk, its scrollback still references the old content, and the next turn goes sideways. The rule is one session per working directory. Worktrees enforce this for free; running two sessions in one folder breaks it.

Close a session, delete the worktree when the branch is merged:

```
git worktree remove ../repo-bug-fix
```

## Stashing and switching between sessions

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

Three situations where one session beats three.

1. **Ordering dependencies.** Schema migration, followed by data backfill, followed by the code that reads the new column. Each step has to finish before the next starts. Parallelising buys you nothing and risks running step 3 against pre-step-1 state.

2. **Greedy parallelism on a small task.** Two 20-minute tasks spun up in parallel sounds like 20 minutes of calendar time, but if you spend 15 minutes coordinating worktrees and another 10 recovering from a conflict, you lost. One session, two tasks in sequence, done in 45 minutes.

3. **You are new to the loop.** If you are still learning what "good" looks like in one session, adding a second session adds variables, not learning. Land the single-session loop first. Multi-session will still be waiting.

## Close

Two sessions is a milestone. Five is a habit. Ten is something you grow into. Find your way at your pace.

<!-- maintainer -->

**Canonical home:** `curriculum/reference/multi-session-git.md`. Referenced from AE101 M1 homework.

**Source-verification TODOs (before first cohort):**
- Confirm current `git worktree add` / `git worktree remove` syntax against `git-scm.com/docs/git-worktree` — stable since 2.5 but double-check for any deprecated flags.
- Confirm `git reset --soft HEAD~1` behaviour against current Git docs — load-bearing for the "wrong-branch commit" recovery.
- Confirm Claude Code does not yet ship a native multi-worktree session switcher — if it does by first cohort, add a one-line pointer and demote the manual flow to the fallback.

**Open question for first-cohort feedback:** does AE101 want `git worktree` as the default mental model for multi-session, or as an advanced move taught only after students have landed the single-session loop? Current stance: optional homework (this file), not a prerequisite. Reassess after Cohort 1 reports.

**Attribution:** Cherny frames parallel worktrees as "the single biggest productivity unlock" in his [Jan 2026 X thread](https://x.com/bcherny/status/2017742743125299476) and in the [Pragmatic Engineer interview](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) [both practitioner direct / practitioner analysis].
