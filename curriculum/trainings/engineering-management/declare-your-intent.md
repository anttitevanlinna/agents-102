# Declare your intent

## Big Idea

Say where you are heading and build the first thing that takes you there. The vision is what you earn by running it.

## What You'll Learn

After this module, you will be able to:

- **Deliberate** your intent across three shapes for your team, bound by your two crux
- **Rehearse** how your team will react, with agents grounded in what your memory knows about them
- **Build** the first version of a leadership creation only you could have designed for this team
- **Hand** that first version to one coalition member and log what they did with it

## Start here

Start a fresh Claude Code session in `~/Documents/leading-agentic-engineering/`. Your memory, your two crux and the note from your coalition conversation are all there.

If your two crux moved by the end of the quarter, what would your team's week look like?

## Declare where you are heading

[Lecture: Intent, not vision](lectures/intent-not-vision.md)

[Exercise: Write your intent](exercises/deliberate-your-intent.md)

## Hear it before you say it

[Exercise: Test your intent on the team first](exercises/rehearse-the-reactions.md)

## Build what only you could build

[Exercise: Build your first leadership creation](exercises/build-your-first-creation.md)

## Put it in someone's hands

Send your first version and `intent.md` to one person from your coalition now, by the channel you already use with them. Ask them two things: to try the creation on something real, and to change one line of the intent.

Then write a short note in `observations/`: who you sent it to, what you asked, and what came back if anything has. The weekly diagnostic reads it from there.

This is where the intent stops being only yours. What they change in it tells you more than the rehearsal did.

## Did you make progress?

Ask the calibration question against what this module left on disk.

{{prompt:em-close-declare-your-intent}}

## Key Concepts

- **Declare, then revise.** Your intent names a crux, a direction and a week someone could check, and it changes when running it teaches you something.
- **Let the shapes argue.** Keeping the hierarchy, flattening it and the hybrid each had to move your crux to count, including the argument about your own role.
- **Hear it before you say it.** The rehearsal listened for your team, grounded in what you know about them, and the gaps it found are people to talk to.
- **Build what only you could build.** Your creation quotes your people and your observations; a template with your team's name pasted in would not.
- **Companions, not instruments.** The first person to use your creation is also the first to change your intent.

## Next

Your creation is in someone else's hands. What they do with it goes into `observations/`, and the weekly diagnostic reads it. The next stretch is about what really happened: which parts of the intent held, and what the creation changed for real people.

<!-- maintainer -->

- **Transitions:** start-here 5 @start "Start here" · hand-off 10 @end "Put it in someone's hands" · close 10 @end "Did you make progress?"
- **Runtime:** lecture 10 + deliberate 25 + rehearse 15 + build 30 + transitions 25 = 105 min (cap, Pass 3 decision 8).

## Design (EM proving run 2026-09-30)

- **Mood:** let's lead, clarity of aim. No corrective framing; every beat ends on something the manager now holds.
- **Intent, not vision (lecture):** declare intent and revise it; vision is earned over 90 days of running. Bet A (Fin (Intercom), Ramp) vs Bet B (Block) held in tension; the course does not pick.
- **Write your intent:** `em-deliberate-intent` (three shape subagents + synthesis, chat only) → manager picks in chat → `em-write-intent` (`intent.md` + journal). Reads `crux`-tagged hypotheses (decision 3).
- **Test your intent on the team first:** `em-rehearse-reactions`: one subagent per kind of person, never a named colleague; `rehearsal.md`; gaps into Team Knowledge; one revision applied conversationally.
- **Build your first leadership creation:** `em-list-frustrations` → pick → `em-build-creation-v1` (one agent in `creation/`, run once, journaled; Schedule sidebar only if it needs a cadence).
- **Put it in someone's hands:** body section, no prompt (the send is the manager's move). Coalition member gets v1 + `intent.md` and edits one line: the first coalition edit of the intent (decision 7; strategy M4 row "coalition-owned").
- **Did you make progress?:** `em-close-declare-your-intent`; hand-off note read if present; second confidence rating against `em-confidence-baseline` (stands in for M6; the proving run ends here).
- **Next** names no module number: the registry stops at M4 for this run; the strategy's M5 (PDCA reckoning) is where this lands when the training grows.
- **Artifacts:** `intent.md`, `rehearsal.md`, `creation/`, Decision Journal entries, one hand-off note in `observations/`.
- **Trainer:** the hand-off is live. Give the room the ten minutes to actually send; a message drafted "for later" is the failure mode. Someone with no reply by the close is normal and still counts.
