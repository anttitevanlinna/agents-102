# Two windows on one codebase

**Time:** ~5 min

Module 3 runs in two windows. Security is the main quest in your chosen repo. Quality is a side-quest in a sibling worktree.

**What you do:** Start a Claude Code session in your repo for security. Fork a sibling worktree for quality, open a second session there, and confirm both sessions read the same codebase from their own working directories.

**What you build:** two Claude Code sessions running side by side on one git history. A security main lane in your repo, and a quality side lane in a sibling worktree that waits until you author the test-strategy skill there. When one lane runs a long prompt, the other is where you work.

## Fork the side worktree from your security lane

- Security is the main quest. Start it in your repo. This is your main lane for Module 3. Access mapping, STRIDE, and the ADR all live here.

**Session** *(new, "m3-security")*

```
/rename m3-security
```

- A sibling worktree is a second working directory on the same git history. It opens next to your repo, useful when two unrelated changes run concurrently, each on its own branch and working state. `git worktree add` makes the sibling folder on its own branch; a new Claude Code session in another window works there; both sessions see the same git history but keep their own working state. The [Multi-session and Git survival guide](../trainings/agentic-engineering-101/reference/multi-session-git.md) carries the longer read.
- Personal files like `CLAUDE.local.md` don't sync between worktrees. They get copied across once at fork time, then evolve independently.
- Decide where to base the side worktree. It branches off your current local HEAD. Clean main is the safe default. If you want another base, switch to it before you fork.

Ask Claude to fork a sibling worktree and copy your personal rules across. The prompt reads your repo's folder name from the working directory: paste it as-is, Claude fills in `<repo-name>` itself.

{{prompt:ae101-m3-fork-quality-side}}

## Read back the worktree path

- Claude reports the sibling worktree path. That path is where the second session opens.

## Open the quality lane in the new worktree

- This is your side-quest lane. Start a second Claude Code session in another window, in the sibling worktree directory Claude just named.

**Session** *(new, "m3-quality")*

```
/rename m3-quality
```

- Authoring and invoking the test-strategy skill both happen in this window, on this codebase. It installs to user scope, so it crosses back to the main lane on its own, and you never carry it by hand. The main lane's read on it comes later, at a separate step that revisits this window's scrollback rather than invoking anything here again; the evidence-based sharpen runs later still, back in the main lane where the compound step lives.
- Ask Claude to confirm the worktree state, then wait.

{{prompt:ae101-m3-quality-side-orient}}

## Set the two windows side by side

- Two windows, side by side, both visible at once. Each holds its own scrollback. Arrange them so neither disappears behind the other.
- The move this module installs: when one window kicks off a long-running prompt, the other is where you work. Module 3's exercises name which window the work runs in, and where the switch points are.

**What happened:** You forked a sibling worktree for the quality side, opened two Claude Code sessions (one in your repo, one in the sibling), and confirmed each reads the same codebase from a different working directory. Security picks up in the main window at the next exercise. The quality side waits.

<!-- maintainer -->

**View summary:** You open two agent sessions on one Git history: a security lane in the repository and a quality lane in a sibling worktree. The setup lets independent work continue safely while preserving a clear place for human control at merge.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain across all slides; kept bold: none (no named-move or menu handles in body); Session widgets and **Time:**/**What you do:**/**What you build:**/**What happened:** chrome untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Quality:** compendium-audited 2026-08-02 (writing@366047e story@366047e technical@366047e behavior@366047e pedagogy@366047e strategy@366047e slides@366047e)
- judges @366047e: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** ~5 min.

**Phase:** Module 3 opener, before *Map the access surface*.

**Pedagogical role:** First felt multi-session moment in AE101. Introduces no new primitive. Packages M3's existing Q+S split into two windows so the side-quest is visibly waiting during S exercises. Side-quest converges when the authored test-strategy skill installs to `~/.claude/skills/test-strategy/SKILL.md` (user scope) and crosses worktrees freely; the main lane's read on it is a later, separate step, not a re-invocation.

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

<!-- backing -->

Claims
- `worktree-is-a-second-working-directory` · detail · "A sibling worktree is a second working directory on the same git history." ← git-worktree-docs
- `worktree-branches-off-local-head` · detail · "It branches off your current local HEAD. Clean main is the safe default." ← git-worktree-docs
- `local-files-do-not-sync` · detail · "Personal files like `CLAUDE.local.md` don't sync between worktrees. They get copied across once at fork time, then evolve independently." ← git-worktree-docs
- `user-scope-skills-cross-lanes` · detail · "It installs to user scope, so it crosses back to the main lane on its own, and you never carry it by hand." ← cc-skills-user-scope
- `security-is-the-main-quest` · vision · "Security is the main quest. Start it in your repo." ← none-owed
- `two-sessions-one-history` · vision · "two Claude Code sessions running side by side on one git history" ← none-owed
- `side-lane-waits` · vision · "a quality side lane in a sibling worktree that waits until you author the test-strategy skill there" ← none-owed

Sources
- git-worktree-docs `[checked:2026-05-15 result:OK due:none]` https://git-scm.com/docs/git-worktree — [tool docs] `git worktree add` creates a second working directory sharing one `.git`, branching from the current HEAD unless told otherwise. Untracked and gitignored files (which is what `CLAUDE.local.md` is) are not shared between worktrees — they exist per working directory, which is why the body says they are copied at fork time and diverge after. **`due:none`:** worktree semantics are two decades stable, and applying a six-month window to them would flag core Git as STALE — the artifact-of-the-rule case the foundational variant exists for. fallback: none needed.
- cherny-mastering-cc `[checked:2026-05-25 result:CAVEAT due:none]` https://www.youtube.com/watch?v=6eBSHbLKuN0 — [practitioner direct] Boris Cherny, *Mastering Claude Code in 30 minutes*: parallel worktrees presented as a productivity unlock. **Backs the framing, not a claim** — no sentence in this body cites him, and the side-quest vocabulary is ours. A recorded talk does not expire, hence `due:none`; what would date it is the practice moving on, not the video changing. fallback: drop the name; the worktree mechanics stand on the Git docs alone.
- cc-skills-user-scope `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [capability] Skills installed at user scope (`~/.claude/skills/<name>/`) are discovered every session regardless of working directory, which is the mechanism that carries the test-strategy skill from the side lane back to the main one without the student moving a file. **This is the load-bearing platform claim of the exercise** — the whole two-window shape depends on it, so it is the one to re-test rather than the worktree mechanics. fallback: have the student invoke the skill from the lane that authored it, and drop the crossing-back beat.

Frameworks
- Worktree as side quest · [borrow:none] · law:none · ← cherny-mastering-cc — framing inherited from Boris Cherny's parallel-worktrees-as-unlock talk; the game vocabulary is ours
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab — two lanes on one history is isolation bought cheaply, which is the same instinct as fencing the reef

Stance `[stance:2026-08-01 level:L2]`
- holds: that parallel worktrees are a real practitioner unlock rather than a curriculum convenience, and that user-scope skills cross working directories. Both are mechanical facts about shipped tools rather than contested practice, which is why this file's stance is short and its risk is entirely capability drift.
- contested: nothing. **The honest note is that this exercise is five minutes of setup for a module beat, and its evidence burden is correspondingly small** — recording that plainly is better than inflating a plumbing step into a claim about the field.
- would-move-it: user-scope skill discovery changing, which would break the crossing-back beat and with it the two-lane design. Worktree semantics changing would be surprising enough to be news.

OODA
- question: do user-scope skills still auto-discover across working directories?
- roster: the Claude Code skills docs and changelog, Boris Cherny
- last-run: 2026-08-01

<!-- /backing -->
**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- opens a sibling worktree from a chosen branch when two unrelated changes need to run concurrently
- runs two Claude Code sessions side by side on the same git history, one window per worktree
- routes work between windows by lane/window callout rather than tab-switching mid-prompt
