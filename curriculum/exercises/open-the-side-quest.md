# Open the side quest

**Time: ~5 min**

Module 3 runs in two windows. Security is the main quest in your chosen repo. Quality is a side-quest in a sibling worktree.

A sibling worktree is a second working directory on the same git history, opened next to your repo. Useful when two unrelated changes need to run concurrently, each on its own branch and working state. The [Multi-session and Git survival guide](../trainings/agentic-engineering-101/reference/multi-session-git.md) carries the longer read; one-line version: `git worktree add` makes a sibling folder on its own branch, you start a new Claude Code session in another window there, both sessions see the same git history but keep their own working state. Personal files like `CLAUDE.local.md` don't sync between worktrees, they get copied across once at fork time, then evolve independently.

**Session** *(new, "m3-security")*

Start a new Claude Code session in your repo. This is your main lane for Module 3. Access mapping, STRIDE, and the ADR all live here. Optionally rename to `m3-security`.

```
/rename m3-security
```

Before firing the fork, decide where to base the side-quest worktree from, it branches off your current local HEAD. Clean main is the safe default; pick another branch if you have a reason. Switch now if you need to.

Paste the prompt as-is. Claude reads `<repo-name>` as your repo's folder name from the working directory.

{{prompt:ae101-m3-fork-quality-side}}

Claude reports the sibling worktree path.

**Session** *(new, "m3-quality")*

Start a second Claude Code session in another window, in the sibling worktree directory Claude just named. This is your side-quest lane. You author the test-strategy skill here while the main lane does security. The skill installs to user scope, so Exercise 3 returns to the main lane to invoke on the security-tested feature. Optionally rename to `m3-quality`.

```
/rename m3-quality
```

{{prompt:ae101-m3-quality-side-orient}}

Two windows, side by side on your screen from here, arrange them so both stay visible at once. Each holds its own scrollback. Module 3's exercises name which window the work runs in. The move you're installing this module: when one window kicks off a long-running prompt, the other is where you work. The exercises name the switch points.

**What happened:**

You forked a sibling worktree for the quality side, opened two Claude Code sessions (one in your repo, one in the sibling), and confirmed each reads the same codebase from a different working directory. Security picks up in the main window at the next exercise. The quality side waits.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-26 (writing@0ef2ca6 story@1a9e10b technical@0ef2ca6 behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b)
- judges @0ef2ca6: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

**Time:** ~5 min.

**Phase:** Module 3 opener, before *Map the access surface*.

**Pedagogical role:** First felt multi-session moment in AE101. Introduces no new primitive. Packages M3's existing Q+S split into two windows so the side-quest is visibly waiting during S exercises. Side-quest converges at Exercise 3 invocation; the authored test-strategy skill installs to `~/.claude/skills/test-strategy/SKILL.md` (user scope) and crosses worktrees freely.

**Why two windows, not two tabs:** projection legibility. The trainer's screen-share shows both worktrees side by side from minute one. Cognitive separation matches the Quality versus Security framing.

**Plug points:** student's Module 2 inherited repo (main window); worktree directory name (default `../<repo>-m3-quality`, sponsor or student override allowed); fresh branch name on the side (default `m3/quality`).

**Push-back moves:**
- Student opens both sessions in the same working directory. Trainer push: *"one window per worktree, not two windows on the same folder. The later write wins; the earlier session goes sideways."* Source: `multi-session-git.md` rule (one session per working directory).
- Student opens a shell and runs `git worktree add` themselves. Redirect to conversation: the fork happens via Claude in the main lane; AE101's agentic-end-to-end rule holds.
- Student forgets to copy `CLAUDE.local.md` into the sibling. The fork prompt names the copy step; if it gets skipped, the side-quest session has no personal rules loaded. Recovery: ask Claude in the side lane to copy it from the main repo.

**Prompts:**
- `ae101-m3-fork-quality-side` — main-lane prompt that forks the sibling worktree at `../<repo-name>-m3-quality` on a fresh `m3/quality` branch and copies `CLAUDE.local.md` into it.

**`observations/` deliberately not copied (2026-05-27).** M3 most often runs before M4, where `observations/` is first authored. At M3 the folder usually doesn't exist and the student has never met it, so naming it in the fork prompt is more harm (an unintroduced concept copied blind) than good (a defensive copy for a rare M4-before-M3 reorder). Earlier versions copied it under an `(if exists)` guard; removed from prompt body + frontmatter. If a cohort does run M4 first, the side-quest forks without prior observations, which is fine.
- `ae101-m3-quality-side-orient` — side-lane orientation that confirms worktree directory, branch, loaded rules, codebase visibility — then waits.

**Frameworks riffed on:**
- Worktree-as-side-quest framing inherited from Boris Cherny, *Mastering Claude Code in 30 minutes* (parallel worktrees as productivity unlock).
- Side-quest convergence-via-user-scope-skill pattern follows Claude Code's skill loading model (skills at `~/.claude/skills/<name>/` auto-discovered every session regardless of working directory).

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- opens a sibling worktree from a chosen branch when two unrelated changes need to run concurrently
- runs two Claude Code sessions side by side on the same git history, one window per worktree
- routes work between windows by lane/window callout rather than tab-switching mid-prompt
