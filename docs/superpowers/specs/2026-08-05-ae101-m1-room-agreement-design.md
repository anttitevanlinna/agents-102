# AE101 M1 Room Agreement Design

## Purpose

Set the cohort's working agreement before the first participant contribution in Agentic Engineering 101. The slide establishes shared humility, learning through the exercises, conversational room energy, permission to navigate dense material, and a humane response to uneven agent completion times.

## Placement

Add one top-level slide to `curriculum/trainings/agentic-engineering-101/getting-going.md` after `## What You'll Learn` and before `## Start here`. This places the agreement before the opening trick-share and keeps it in the canonical M1 deck used by the full, preview, and team-track variants.

## Approved slide

```markdown
## How we work in this room

- **We are all learners.** Trainers included. The field moves fast, and everyone struggles to keep up.
- **Do the exercises.** That is how you experience what the model actually does.
- **Share and discuss.** Detours and banter are welcome. The trainer will bring us back.
- **Skip and come back.** There is a lot here. Feel free to skip parts and return later.
- **We finish at different times.** Chatter is welcome while some agents are still churning. Eventually, we move on. You can finish any unfinished work after the session.
```

## Delivery contract

- The agreement is cohort-room framing, not a lecture or exercise.
- It consumes no separate runtime line; the trainer presents it inside the existing 10-minute opening allocation.
- The trainer run sheet names the agreement before Connections. The module's maintainer guidance records that self-study skips the room-only slide silently.
- No prompt, exercise, learning objective, or downstream artifact changes.

## Verification

- Run the slide-size and slide-numbering checks on the changed module.
- Run the curriculum test suite.
- Build an AE101 student workbook and inspect the composed Slides deck to confirm the slide appears before `Start here`, fits at projection size, and contains the five approved rules.
