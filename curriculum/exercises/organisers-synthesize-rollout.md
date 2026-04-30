# Exercise: Organisers synthesize rollout

**Time:** 6 minutes. Organisers only.

This exercise happens after groups have saved their rollout synthesis files in `shared/`. It is not required for the participant exercise to succeed. The job is to read across group syntheses and create one organisers' readout that can travel after the workshop.

## Phase 1. Read across the group syntheses

Ask Claude to synthesize the saved group files.

**Prompt** *(Cowork, organisers only)*

```
Read the group rollout synthesis files from `shared/`.

Create an organisers' rollout readout with:
- the cruxes that appear across multiple groups
- one useful disagreement between groups
- the top three priorities for the next 30 days
- what should be deferred for now
- open questions the organisers need to answer
- one next action for the organisers this week

Show me the readout in chat first. Don't save yet. I will correct priorities, deferrals, and ownership.

After I approve it, save it as `shared/organisers-rollout-readout.md`.
```

Keep the readout grounded in the group syntheses. If the organisers add context that was not in the files, name it as organisers' judgment rather than group evidence.

## Phase 2. Decide what to share back

If time remains, share only the highest-signal point with the room: the crux or disagreement that changes what the team should do next. Do not turn this into a second lecture.

<!-- maintainer -->

**Meta (organisers):**
- **Length:** 6 minutes
- **Audience:** organisers only. This file is a runbook for synthesis after group synthesis has succeeded
- **Inputs:** rollout synthesis files in `shared/`
- **Output:** `shared/organisers-rollout-readout.md`
- **Dependency:** optional for participant success. The group synthesis files are the core artifact

**Quality:** draft 2026-04-29
- draft 2026-04-29 (organisers-only rollout synthesis split out; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*
