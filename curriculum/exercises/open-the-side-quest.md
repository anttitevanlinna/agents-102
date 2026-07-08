# Two windows on one codebase

**Time:** ~5 min

Module 3 runs in two windows. Security is the main quest in your chosen repo. Quality is a side-quest in a sibling worktree.

**What you do:** Start a Claude Code session in your repo for security. Fork a sibling worktree for quality, open a second session there, and confirm both sessions read the same codebase from their own working directories.

**What you build:** two Claude Code sessions running side by side on one git history. A security main lane in your repo, and a quality side lane in a sibling worktree that waits until Exercise 3. When one lane runs a long prompt, the other is where you work.

## Fork the side worktree from your security lane

- **Security is the main quest. Start it in your repo.** This is your main lane for Module 3. Access mapping, STRIDE, and the ADR all live here.

**Session** *(new, "m3-security")*

```
/rename m3-security
```

- **A sibling worktree is a second working directory on the same git history.** It opens next to your repo, useful when two unrelated changes run concurrently, each on its own branch and working state. `git worktree add` makes the sibling folder on its own branch; a new Claude Code session in another window works there; both sessions see the same git history but keep their own working state. The [Multi-session and Git survival guide](../trainings/agentic-engineering-101/reference/multi-session-git.md) carries the longer read.
- **Personal files like `CLAUDE.local.md` don't sync between worktrees.** They get copied across once at fork time, then evolve independently.
- **Decide where to base the side worktree.** It branches off your current local HEAD. Clean main is the safe default. If you want another base, switch to it before you fork.

The fork prompt reads your repo's folder name from the working directory. Paste it as-is; Claude fills in `<repo-name>` itself.

{{prompt:ae101-m3-fork-quality-side}}

## Read back the worktree path

- **Claude reports the sibling worktree path.** That path is where the second session opens.

## Open the quality lane in the new worktree

- **This is your side-quest lane.** Start a second Claude Code session in another window, in the sibling worktree directory Claude just named.

**Session** *(new, "m3-quality")*

```
/rename m3-quality
```

- **You author the test-strategy skill here while the main lane runs security.** The skill installs to user scope, so Exercise 3 returns to the main lane to invoke it on the security-tested feature. You are not carrying the skill back by hand; it crosses worktrees on its own.

{{prompt:ae101-m3-quality-side-orient}}

## Set the two windows side by side

- **Two windows, side by side, both visible at once.** Each holds its own scrollback. Arrange them so neither disappears behind the other.
- **The move this module installs: when one window kicks off a long-running prompt, the other is where you work.** Module 3's exercises name which window the work runs in, and where the switch points are.

**What happened:** You forked a sibling worktree for the quality side, opened two Claude Code sessions (one in your repo, one in the sibling), and confirmed each reads the same codebase from a different working directory. Security picks up in the main window at the next exercise. The quality side waits.

<!-- maintainer -->

**Quality:** compendium-audited 2026-07-08 (writing@0ef2ca6 story@1a9e10b technical@0ef2ca6 behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS (override-r1-module-signposting-carve-out-see-instances/ae101--open-the-side-quest.slides.json)

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
