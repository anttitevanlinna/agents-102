# Exercise: Organisers synthesize rollout

**Time:** 6 minutes. Organisers only.

This exercise can start once group rollout synthesis files begin appearing in `shared/`. It reads across the files as they land and creates one organisers' readout to use after the workshop.

**Session** *(new, "Organisers rollout synthesis")*

## Phase 1. Read across the group syntheses

Ask Claude to watch the group files and synthesize the latest read.

**Prompt** *(Cowork, organisers only)*

```
Continuously read the group rollout synthesis files in `shared/`.

If no group files are ready, say so briefly, wait, and check `shared/` again.

As new group files appear or existing group files change, re-read them and update the readout.

Keep the current organisers' rollout readout updated in chat with:
- the cruxes that appear across multiple groups
- the sharpest disagreement between groups, even if uncomfortable: where would two groups make a different call? Quote both sides. Don't smooth into a shared theme
- the top three priorities for the next 30 days, named as the problem they solve, not the virtue they embody
- what should be deferred for now
- open questions the organisers need to answer
- one next action for the organisers this week

After each update, wait briefly, check `shared/` again, and refresh the readout if anything changed.

Do not save until I say the readout is final.

When I say it is final, save the latest version as `shared/organisers-rollout-readout.md`.
```

If the synthesis stops, nudge Claude with: *"check again"*. If the current readout is no longer clear after a few synthesis rounds, ask: *"Show me the readout again"*.

Keep the readout grounded in the group syntheses. If the organisers add context that was not in the files, name it as organisers' judgment rather than group evidence.

## Phase 2. Decide what to share back

If time remains, share one point with the room: the crux or disagreement that changes what the team should do next.

Use these prompts as starting points. Keep prompting freely until the final share-back sounds right for this room.

Ask Claude for a few possible share-back angles.

**Prompt** *(Cowork, organisers only)*

```
Based on the current organisers' readout, suggest two or three possible points we could share back with the room.

For each, tell me:
- why it matters
- what it would help the team do next
- what could be misunderstood if we say it badly

Do not save anything.
```

If the first answer gives you the right angle but not the words yet, ask Claude to draft the point in plain organiser language.

**Prompt** *(Cowork, organisers only)*

```
Draft a short organiser share-back for the point below.

Keep it plain and useful for the room. Make it sound like something an organiser can say naturally, not like a report.

Show the draft in chat only. Do not save it.

Let's focus on:
```

<!-- maintainer -->

**Meta (organisers):**
- **Length:** 6 minutes
- **Audience:** organisers only. This file is a runbook for synthesis while group outputs are landing
- **Inputs:** rollout synthesis files in `shared/`
- **Output:** `shared/organisers-rollout-readout.md`
- **Dependency:** optional for participant success. The group synthesis files are the core artifact

**Quality:** draft 2026-04-29
- draft 2026-04-29 (organisers-only rollout synthesis split out; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*
