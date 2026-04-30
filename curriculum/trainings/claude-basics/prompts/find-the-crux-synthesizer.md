# Find the crux — group synthesizer

Two plain prompts for the live crux exercise in Claude Basics. The first is the core group-synthesis prompt. The second is optional cross-pollination, used only after every group has saved a synthesis file.

## When to use

- **Phase 2 group synthesis (17 minutes):** the nominated driver in each group pastes the group prompt
- **Phase 3 cross-pollination bonus (5 minutes):** group drivers use the bonus prompt only if all group synthesis files exist
- **Pre-cohort rehearsal:** the organisers run the group prompt once against a sample group discussion one day before the cohort

## Phase 2 — group synthesizer prompt

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
- what we should prioritise in the next 30 days
- what we should defer for now
- one open question the organisers need to answer
```

## Optional solution-ideas prompt

```
Read the rollout synthesis file you just saved in `shared/`.

Append a section called "Solution ideas from the group". Store the ideas I give you there. Then add your brief read below them: which idea best fits the crux, which idea might be premature, and what question would sharpen the next discussion.

After saving, tell us what you added and what you think in 5 to 7 bullets.

Our ideas:
```

## Phase 3 — cross-pollination bonus prompt

```
Read our group's rollout synthesis from `shared/`. Then read one other group's rollout synthesis from `shared/`.

Compare them briefly:
- one idea the other group saw that we missed
- one thing our group should keep distinct
- one sentence we should add to our synthesis, if any

Show me the proposed addition in chat first. Don't save until the group approves it.
```

## Notes

- **Core success is group synthesis.** Cross-pollination is a bonus, not a dependency
- **Labels adapt.** The prompt uses the group name the driver gives. If the group has no name, Claude invents a short label from the selected crux
- **Protect synthesis quality.** If not all rollout synthesis files exist in `shared/`, skip cross-pollination and close with the group syntheses that exist
