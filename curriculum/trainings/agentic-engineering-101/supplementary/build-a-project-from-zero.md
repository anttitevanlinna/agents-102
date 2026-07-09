# No repo to bring? Build one.

The training runs on a repo you already ship to. No such repo you can use here? Build one. A repo you grow from zero is a clean instrument. Every decision is yours, every bug is legibly your own, and nothing inherited needs explaining away.

You'll build a small Lemmings game in the browser (the 1991 classic: little creatures you guide across a level). By the end of the first session it runs, it has a test or two, and it has real commit history. That's a project. The six modules grow it.

## Get to a running game

- Set the model to Sonnet first with `/model sonnet`. Sonnet builds a clean first version, so the bugs you do hit are small and few. That's the point: a couple of them become your Module 1 material.
- Ask Claude to create a new folder for the game and start a git repo in it.
- Open a Claude Code session in that folder.
- Ask Claude to build a first playable Lemmings game as a single browser page: a canvas, two levels, and three lemming actions you can trigger (walk plus two you pick, say dig and block). Enough code to have surface area, and an obvious backlog of more levels and more actions to grow into. Small enough to run when you open the `.html`.
- Open the page and play. The first thing that looks wrong or feels missing is your Module 1 bug.
- Ask Claude to add a small test suite so the game has real tests to break and guard.
- Ask Claude to commit at each working step, so the repo grows real history instead of one big drop.
- Before you close the session, ask Claude to add one feature that touches data or other players: a shareable level via a URL, a score you submit, or saved progress. That surface is what Module 3 reads when you map access control and run STRIDE against it. A toy game with no data has nothing to threat-model.

## Where the four task sizes come from

Same four sizes as the [prework](../prework.md), now sourced from the game's own backlog:

- **Trivial bug (Module 1):** a rendering glitch, a lemming clipping through a wall, an off-by-one in the survivor count.
- **Small multi-file task (Module 2):** a new ability like a digger or a blocker that touches input, the game loop, and rendering.
- **Small feature (Module 3):** a user-facing surface like a level-select screen or a win/lose panel, or harden the data feature you seeded at the end of the first session (that is your access-control and STRIDE material).
- **A real send-off (Module 4 onward):** multiple levels, a level editor, or a physics refactor you'd rather hand off than nudge bit by bit.

## Bring to Module 1

The running game, the test suite, the commit history, and the one bug you spotted while playing. Module 1 opens fresh in this repo.

<!-- maintainer -->

**Quality:** compendium-audited 2026-07-09 (writing@148adf6 story@148adf6 technical@148adf6 behavior@148adf6 pedagogy@148adf6 strategy@148adf6)
- judges @148adf6: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

**Meta:** *Opt-in prework alternative for the student who arrives without a usable repo. ~200 words. Golden-path only. Replaces the thin "ask your trainer for a fallback repo" escape hatch in `prework.md` §1 with a self-service build. The Lemmings game is the same SUT the test-harness uses (`arrange-lemmings.sh`, `test-strategy-lemmings`), so a student who builds it lands on a codebase the harness already understands.*

**Role:** Bootstraps a code+tests+history codebase for the no-repo student so the four task sizes in `prework.md` §What-to-bring have somewhere to land. The build is deliberately minimal: the first session produces a running game with a couple of tests and a few commits, and the six modules supply the growth. Not a full game build up front.

**Build sizing (why these numbers):**
- **Sonnet build** (`/model sonnet`) — clean first version, so the residual bugs are small and few. Enough to seed M1, not enough to bury the student in debugging on setup. Matches the training default (`prework.md` top blockquote: Sonnet runs every exercise).
- **2 levels + 3 lemming actions** — right size for "some code, many features to add." Enough surface to carry M2's multi-file task, with an obvious backlog (more levels, more actions) so the student never runs dry across six modules.
- **End-of-session data feature** — seeds M3. A browser game with no data or other players has no access-control surface and nothing to STRIDE. Planting a shareable-level / score-submit / saved-progress feature up front gives the `access-control-analysis` and `stride` skills real material at M3 instead of a contrived one.

**Placement:** Linked from `prework.md` §1 (the fallback line). Read once, before Module 1, only by students who need it. Heavier than the standard 30-min prework path; the extra time is the game build.

**Voice:** AE101 quintet. Rory reframe in the open (empty repo as clean instrument, not consolation prize), Boris-flat on the build steps.

**Open decisions for maintainer:**
- How this interlocks with the existing trainer-handed fallback repo in `prework.md` §1. Build-your-own vs clone-a-canned-one are different flavours; pick one as default or offer both.
- Whether to wire the `prework.md` §1 fallback line to link here (edits a done-done prework file with cross_module contracts; not done in this draft).
