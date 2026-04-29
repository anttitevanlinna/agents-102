# Find the crux — synthesizer

Two plain prompts for Module 3 of Claude Basics. The first runs at Phase 2 (one per group of three or four). The second runs at Phase 3 (the IT Director, live, in front of the room).

## When to use

- **Phase 2 group synthesis (12 minutes):** the synthesizer participant in each group pastes the group prompt
- **Phase 3 cross-group synthesis (10 minutes):** the IT Director pastes the cross-group prompt
- **Pre-cohort rehearsal:** the IT Director runs the cross-group prompt against four sample group-crux files one day before the cohort, with the trainer reviewing

## Phase 2 — group synthesizer prompt

```
Read every file in this group folder that starts with "divergence-". You should find three or four files, one per group member.

Across the files, find the ONE difficulty that, if our team got it right, would make the others follow. That's the crux. Not the most-mentioned difficulty. Not the average. The one that, when named, makes the other difficulties downstream of it.

Show me the crux candidate in chat first, in two sentences. Don't save yet. I want to push back if you missed something the files were actually saying.

After I push back, save the final crux as a group-crux file named after our group number in this folder. Include: the named crux (one paragraph), and one quote from each divergence file that supports it.
```

## Phase 3 — cross-group synthesizer prompt

```
Read all four group-crux files: group-1/group-crux-1.md, group-2/group-crux-2.md, group-3/group-crux-3.md, group-4/group-crux-4.md.

The four cruxes are four different angles on the same rollout. Find what's shared across them, what's contested, and what one or two cruxes are downstream of others.

Then propose a rollout strategy in three sections:
1. The two or three top priorities for the next 90 days (the cruxes that, if got right, make the others follow)
2. The two or three deferrals (real difficulties that aren't actually the crux right now — name them and explain why they wait)
3. The single named question I (the IT Director) need to answer myself before the strategy can land

Show me the strategy in chat first. I'll push back, edit live, and add what's missing. Then save as rollout-strategy.md in my personal folder. Save my edits, not your first draft.
```

## Notes

- **Group count adapts.** If the cohort runs 2 or 3 groups instead of 4, edit the file paths in the cross-group prompt to read across only the folders that exist
- **The Phase 3 prompt assumes the IT Director's session has read access** to all four group folders. The pre-cohort folder-topology setup grants that access. Without it, Phase 3 fails on file-not-found
- **The push-back step in Phase 3 is load-bearing.** The IT Director's value-add is editing Claude's first draft live, not approving it. The room watches the edits happen; that's where the real strategy emerges
