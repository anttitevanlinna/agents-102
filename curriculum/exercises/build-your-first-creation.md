# Exercise: Build your first leadership *creation*

**Time:** 30 minutes.

**What you do:** pick one frustration your memory keeps showing, and have the agent build a working mechanism around it.

**What you build:** a first version in `creation/` that does one piece of leadership work for this team, and runs.

**The point:** nobody outside this team could have designed it.

## Phase 1: Pick the frustration

*8 min*

You are not building a product feature. You are building something around the work: a thing that notices, connects, carries or asks, where right now it waits on you or never happens at all.

List the frustrations that keep coming back in your team's week, from your memory.

{{prompt:em-list-frustrations}}

Pick the one you would most like gone, and tell the agent why in a sentence. Your reason matters more than the list: it is the part of the design only you can supply.

## Phase 2: Build it and run it once

*18 min*

Build a first version around the frustration you just picked.

{{prompt:em-build-creation-v1}}

It might match someone who is stuck with someone who solved the same thing, carry an experiment's results into the decision that needs them, or ask the question you keep forgetting to ask. It might be something no list would have suggested.

The test is whether it could only exist here. If you could hand it to another manager with their team's name swapped in, it is a template. Push back until it quotes your people and your observations.

**If the build grows past one agent,** stop it. A first version that runs beats a platform that almost does.

## Phase 3: Decide whether it runs on its own

*4 min*

Some creations should wake up without you: weekly, or when new notes arrive. If yours is one, schedule it as a local routine in the Claude Code desktop app, the same way you scheduled the weekly diagnostic, with the prompt the agent gave you. If it runs when someone asks it to, leave it as it is.

<!-- maintainer -->

- **Prompts:** `em-list-frustrations` (read + list, no writes) → manager picks in chat → `em-build-creation-v1` (build + one run + journal). Split per prompts §35; the pick and its reason are the manager's typed input (the irreducible people-knowledge).
- **Originality bar** (strategy § Deliverable): template with the team's name pasted in does not count. Enforced in the fence (cite entries + observations; "if it would work for any team unchanged, it is not done") and in the Phase 2 push-back line.
- **Leadership work, not product features** (strategy § player-coach). Body examples are a range, not a menu (pedagogy §20), plus an explicit open door.
- **Scope cap:** one agent, one job (prompts §49). Proposes only, never sends or edits outside `creation/`. Manager-as-bottleneck guard (strategy § "the manager's own necessity becomes a design question"): fence requires someone other than the manager can use it.
- **Scheduling:** desktop app local routine, same flow as `schedule-the-weekly-diagnostic` (verified 2026-09-30 against https://code.claude.com/docs/en/desktop-scheduled-tasks.md (curl): Code tab → Routines → New routine → Local; fields Name, Description, Instructions (folder picked below it), Schedule presets incl. Daily and Weekly (day + time); Run now on the task detail page; a run the machine sleeps through is skipped, not caught up.) The build prompt tells the agent to hand back a schedule prompt only if it needs one; everything runs headless in the CLI.
- **Failure modes:** too big → Phase 2 callout; too generic → push-back line; first run fails on missing material → the agent says what it needed (fence), and the manager adds it to `observations/` rather than inventing it.
- **Timing:** 35 → 30 at Pass 3 (105-min cap).
- **Leap test (Monday, arc-mood carve-out: name the artifact):**
  - owns a running agent in `creation/` that did one piece of leadership work on this team's real material this week
  - has handed v1 to one coalition member, who used it without the manager in the room
  - has a Decision Journal entry naming the frustration, the options passed over and what v1 leaves out
