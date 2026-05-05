# Find the crux — group synthesizer

Three plain prompts for the live crux exercise in Claude Basics. Phase 2 has two prompts in sequence (synthesis, then ideas). Phase 3 has one cross-pollination prompt that the driver runs as a continuous cycle.

## When to use

- **Phase 2 group synthesis (25 minutes):** the nominated driver in each group pastes the synthesis prompt, then the ideas prompt
- **Phase 3 cross-pollination (20 minutes):** every group's driver pastes the cross-pollination prompt and lets it cycle. Run only after every group has saved its Phase 2 file
- **Pre-cohort rehearsal:** the organisers run the synthesis prompt once against a sample group discussion one day before the cohort

## Phase 2 — synthesis prompt (diagnosis)

```
Create our group's rollout synthesis.

First ask me for the first names of the people in this group. Wait for my answer.

For each first name I give you, find that person's folder among the working folders and read `rollout-notes.md` from it. If a folder or file is missing, tell me which one is missing and continue with the files you can read. Do not interview the group for raw material.

After reading the files, propose the ONE difficulty that, if our team got it right, would make the others follow. That's the crux (Rumelt).

Show the crux candidate in chat first, about one page long. Don't save yet. Write enough for the group to check and debate: name the crux, explain why you chose it over the other difficulties, quote or paraphrase the evidence from the rollout notes, and name what would change if we got this crux right. I will ask the group what is wrong or missing.

After I give you the group's push-back, ask me for the group's name for the filename. If we have not named the group, invent a short, vivid label from the selected crux.

Then rewrite the synthesis and save it in `shared/`. If I say Atlas, save it as `shared/rollout-synthesis-atlas.md`. If you invent the label from a crux about unclear escalation, save something like `shared/rollout-synthesis-escalation-fog.md`. Use lowercase kebab-case in the filename.

The file must include:
- named crux
- supporting evidence from the group
- what would change if we got this crux right
```

## Phase 2 — ideas prompt (group surfaces what to try)

```
Read the rollout synthesis file you just saved in `shared/`.

Append a section called "Ideas". Store the ideas I give you there. Then add your brief read below them: which idea best fits the crux, which might be premature.

After saving, tell us what you added and what you think in 5 to 7 bullets.

Our ideas:
```

## Phase 3 — cross-pollination prompt (cycles between others' files and ours)

```
First ask me for our group's name. Wait for my answer.

Then run cycles. In each cycle:

1. Visit two other groups' rollout synthesis files in `shared/` (skip ours, skip any you've already fully covered).
   For each:
   - read the file
   - append a section called "Comments from <our group name>" with two or three bullets: one idea worth borrowing or extending, one comment or sharper question from our group, plus a flag if you see overlap with our crux
   - save the file

2. Read our own file in `shared/`. If a new "Comments from <Group>" section arrived since the last check, narrate it: which group commented, what they noticed, whether it fits our crux.

3. Refresh the running Plan view IN CHAT (don't save to file). Based on our crux, evidence, ideas, and any incoming comments, show three short bullets each for:
   - prioritise in the next 30 days
   - defer for now
   - one open question only the organisers can answer
   Replace the previous Plan view each cycle. This is a running surface, not a log.

4. Continue to the next cycle unless I tell you to stop.

Narrate each move shortly: "Visiting Atlas, appended. Checking ours, no change. Plan now: priorities read..." Keep narration tight, one or two sentences per move.

If you've already commented on every other group's file, stop the writing-out half and keep watching ours, narrating new comments as they arrive and refreshing the Plan with the new context.

Stop when I say stop.
```

## Notes

- **Core artifact is the saved file.** Crux + evidence + ideas live there; cross-pollination comments accumulate there. The Plan is a running chat callout, not a saved section
- **Labels adapt.** The synthesis prompt uses the group name the driver gives. If the group has no name, Claude invents a short label from the selected crux
- **Skip Phase 3 if any group has not saved.** Active cross-pollination needs every group's synthesis to exist. If the room runs short on time, end with the saved syntheses
- **Stop whenever during Phase 3.** Quality per comment beats coverage. Few cross-pollinations is fine
