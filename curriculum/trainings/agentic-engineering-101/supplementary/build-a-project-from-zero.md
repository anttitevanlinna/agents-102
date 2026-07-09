# No repo to bring? Build one.

The training runs on a repo you already ship to. No such repo you can use here? Build one, and don't treat that as a consolation prize. A repo you grow from zero is a clean instrument. Every decision is yours, every bug is legibly your own, and nothing inherited needs explaining away.

You'll build a small Lemmings game in the browser (the 1991 classic: little creatures you guide across a level). By the end of the first session it runs, it has a test or two, and it has real commit history. That's a project. The six modules grow it.

## Get to a running game

- Ask Claude to create a new folder for the game and start a git repo in it.
- Open a Claude Code session in that folder.
- Ask Claude to build a first playable Lemmings game as a single browser page: a canvas, a handful of lemmings that walk and fall, one ability you can trigger. Small enough to run when you open the `.html`.
- Open the page and play. The first thing that looks wrong or feels missing is your Module 1 bug.
- Ask Claude to add a small test suite so the game has real tests to break and guard.
- Ask Claude to commit at each working step, so the repo grows real history instead of one big drop.

## Where the four task sizes come from

Same four sizes as the [prework](../prework.md), now sourced from the game's own backlog:

- **Trivial bug (Module 1):** a rendering glitch, a lemming clipping through a wall, an off-by-one in the survivor count.
- **Small multi-file task (Module 2):** a new ability like a digger or a blocker that touches input, the game loop, and rendering.
- **Small feature (Module 3):** a user-facing surface like a level-select screen, a win/lose panel, or a scorebar.
- **A real send-off (Module 4 onward):** multiple levels, a level editor, or a physics refactor you'd rather hand off than nudge bit by bit.

## Bring to Module 1

The running game, the test suite, the commit history, and the one bug you spotted while playing. Module 1 opens fresh in this repo.

<!-- maintainer -->

**Meta:** *Opt-in prework alternative for the student who arrives without a usable repo. ~200 words. Golden-path only. Replaces the thin "ask your trainer for a fallback repo" escape hatch in `prework.md` §1 with a self-service build. The Lemmings game is the same SUT the test-harness uses (`arrange-lemmings.sh`, `test-strategy-lemmings`), so a student who builds it lands on a codebase the harness already understands.*

**Role:** Bootstraps a code+tests+history codebase for the no-repo student so the four task sizes in `prework.md` §What-to-bring have somewhere to land. The build is deliberately minimal: the first session produces a running game with a couple of tests and a few commits, and the six modules supply the growth. Not a full game build up front.

**Placement:** Linked from `prework.md` §1 (the fallback line). Read once, before Module 1, only by students who need it. Heavier than the standard 30-min prework path; the extra time is the game build.

**Voice:** AE101 quintet. Rory reframe in the open (empty repo as clean instrument, not consolation prize), Boris-flat on the build steps.

**Open decisions for maintainer:**
- How this interlocks with the existing trainer-handed fallback repo in `prework.md` §1. Build-your-own vs clone-a-canned-one are different flavours; pick one as default or offer both.
- Whether to wire the `prework.md` §1 fallback line to link here (edits a done-done prework file with cross_module contracts; not done in this draft).
- No Quality line yet: unaudited. Run the pre-ship audit before shipping.
