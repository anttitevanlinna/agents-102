# AE101 M1 Room Agreement Design

## Purpose

Set the cohort's working agreement before the first participant contribution in Agentic Engineering 101. The opening uses two slides. The first establishes shared humility, learning through the exercises, and conversational room energy. The second gives the group responsibility for a workable pace and gives each participant permission to cut depth or prompts when cognitive load starts crowding out the work.

## Placement

Keep two top-level slides in `curriculum/trainings/agentic-engineering-101/getting-going.md` after `## What You'll Learn` and before `## Start here`. This places the agreement before the opening trick-share and keeps it in the canonical M1 deck used by the full, preview, and team-track variants.

## Approved slides

```markdown
## How we work in this room

- **All learners.** Trainers included. The field moves fast, and everyone struggles to keep up.
- **Exercises.** Do them. That is how you experience what the model actually does.
- **Share and discuss.** Detours and banter are welcome. The trainer will bring us back.

## Freedom to choose

- Set the right pace for the group. Not too fast, not too slow.
- People will finish at different times. Cutting depth and prompts here and there is often the right thing.
- Protect your working memory. Cut where needed.
- All modules are designed to cope with missing details from prior modules.
```

## Delivery contract

- The agreement is cohort-room framing, not a lecture or exercise.
- It consumes no separate runtime line. The trainer presents both slides inside the existing 10-minute opening allocation.
- The trainer run sheet names both slides before Connections. The module's maintainer guidance records that self-study skips the room-only slides silently.
- The group owns the shared pace. Individuals may cut depth or prompts to protect working memory and rejoin that pace.
- The slide makes the curriculum's existing prerequisite-tolerant design explicit. It does not promise that every detail is independent or that missing work has no cost.
- No prompt, exercise, learning objective, or downstream artifact changes.

## Verification

- Run the slide-size and slide-numbering checks on the changed module.
- Run the curriculum test suite.
- Build an AE101 student workbook and inspect the composed Slides deck to confirm both slides appear before `Start here`, fit at projection size, and contain the approved wording.
