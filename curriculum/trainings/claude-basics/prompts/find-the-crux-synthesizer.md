# Find the crux — group synthesizer

Two plain prompts for the live crux exercise in Claude Basics. The first is the core group-synthesis prompt. The second is optional cross-pollination, used only after every group has saved a synthesis file.

## When to use

- **Phase 2 group synthesis (17 minutes):** the nominated driver in each group pastes the group prompt
- **Phase 3 cross-pollination bonus (5 minutes):** group drivers use the bonus prompt only if all group synthesis files exist
- **Pre-cohort rehearsal:** the organisers run the group prompt once against a sample group discussion one day before the cohort

## Phase 2 — group synthesizer prompt

```
Create our group's rollout synthesis.

First ask me for our group number if you do not already know it.

Then interview the group in chat. Ask for each person's top rollout difficulty and one concrete example. Keep the answers short. After everyone has answered, propose the ONE difficulty that, if our team got it right, would make the others follow. That's the crux.

Show the crux candidate in chat first, in two sentences. Don't save yet. I will ask the group what is wrong or missing.

After I give you the group's push-back, rewrite the synthesis and save it in the agreed shared synthesis location using the group number. If I say group 2, save the file as `group-2-rollout-synthesis.md`. Use the same pattern for the group number I give you.

The file must include:
- named crux
- supporting evidence from the group
- what we should prioritise in the next 30 days
- what we should defer for now
- one open question the organisers need to answer
```

## Phase 3 — cross-pollination bonus prompt

```
Read our group's rollout synthesis from the shared synthesis location. Then read one other group's rollout synthesis from the same location.

Compare them briefly:
- one idea the other group saw that we missed
- one thing our group should keep distinct
- one sentence we should add to our synthesis, if any

Show me the proposed addition in chat first. Don't save until the group approves it.
```

## Notes

- **Core success is group synthesis.** Cross-pollination is a bonus, not a dependency
- **Group count adapts.** The prompt uses the group number the driver gives instead of assuming four groups
- **Protect synthesis quality.** If any group has not saved `group-N-rollout-synthesis.md` in the shared synthesis location, skip cross-pollination and close with the group syntheses that exist
