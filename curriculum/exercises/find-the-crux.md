# Exercise: Find the crux on our journey

**Time:** 60 minutes. Three phases.

This exercise has two modes, in this order:

1. **Individual first.** Each participant opens Cowork on the shared SharePoint workshop folder and saves their own rollout notes in their first-name folder.
2. **Group second.** One nominated driver opens Cowork on the same workshop folder. Claude reads the notes from the group members' first-name folders and writes the group's synthesis to `shared/`.

The point is the sequence: individual signal first, group synthesis second. Only the group synthesis is shared.

## Phase 1. Divergence (15 minutes)

Each participant runs an interview with Claude, alone. Claude asks; you answer. The point isn't to write a polished list. The point is to surface the rollout difficulties YOU actually see, in the words YOU actually use, with Claude pushing back when your first answer is too tidy.

Ask Claude to interview you about your team's top three Claude-rollout difficulties and save the notes in your first-name folder under the workshop folder organisers had you sync.

**Prompt** *(Cowork)*

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once: ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, ask me for my first name. Then save the conversation as `rollout-notes.md` in the folder named with my first name.

Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
```

Answer Claude's questions in plain language. When the file saves, you're done with Phase 1.

## Phase 2. Group synthesis (25 minutes)

Each group picks one driver. If you're the driver, open Cowork on the same synced SharePoint workshop folder. The participant folders are named with first names like `aino`, `petra`, `juhani`, and if there are duplicates, organisers add a short suffix. Give Claude the folder names exactly as they appear.

Your group doesn't need its own folder. You're the only person writing to `shared/` in this phase. Claude reads the personal notes from the first-name folders and saves the group synthesis to `shared/`, not to your personal folder. Do not start by reading other groups. Your job is to find your group's crux first.

Ask Claude in your Cowork session to help synthesize the group's views.

**Prompt** *(Cowork, group driver)*

```
Create our group's rollout synthesis.

First ask me for the exact folder names of the people in this group. Wait for my answer.

For each folder name I give you, find that folder among the working folders and read `rollout-notes.md` from it. If a folder or file is missing, tell me which one is missing and continue with the files you can read. Do not interview the group for raw material.

After reading the files, propose the ONE difficulty that, if our team got it right, would make the others follow. That's the crux (Rumelt).

Show the crux candidate in chat first, compact but specific. Don't save yet. Write enough for the group to check and debate: name the crux, explain why you chose it over the other difficulties, quote or paraphrase the evidence from the rollout notes, and name what would change if we got this crux right. I will ask the group what is wrong or missing.

After I give you the group's push-back, ask me for the group's name for the filename. If we have not named the group, invent a short, vivid label from the selected crux.

Then rewrite the synthesis and save it in `shared/`. If I say Atlas, save it as `shared/rollout-synthesis-atlas.md`. If you invent the label from a crux about unclear escalation, save something like `shared/rollout-synthesis-escalation-fog.md`. Use lowercase kebab-case in the filename.

The file must include:
- named crux
- supporting evidence from the group
- what would change if we got this crux right
```

FYI: *crux* here is borrowed from strategy thinker Richard Rumelt. It means the one difficult part of the challenge where focused action would make the biggest difference.

The crux belongs to the group, not to whoever held the keyboard.

The synthesis file holds the diagnosis. Now add what you'd try first.

Ask Claude to append your group's ideas and give a quick read on them.

**Prompt** *(Cowork, group driver)*

```
Read the rollout synthesis file you just saved in `shared/`.

Append a section called "Ideas". Store the ideas I give you there. Then add your brief read below them: which idea best fits the crux, which might be premature.

After saving, tell us what you added and what you think in 5 to 7 bullets.

Our ideas:
```

## Phase 3. Cross-pollination (20 minutes, only after every group has saved)

Run this only after every group has saved its synthesis with the Ideas section. If any group is still working, skip Phase 3 and protect the core artifacts.

If you're the driver, paste one prompt that cycles between other groups' files and ours. Visit two other groups, leave a comment and an idea on each. Check our file. If a new comment arrived, Claude narrates it. Refresh a running Plan view in chat. Loop. Stop whenever, quality per comment beats coverage.

Ask Claude to cycle between other groups' files and ours, leaving comments out and narrating what comes in.

**Prompt** *(Cowork, group driver)*

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

Whenever the group says stop, stop. The artifact is the synthesis file plus whatever comments accumulated. The Plan view in chat is a live read off that file; anyone can re-deduce it later by reading the file.

The organisers may run their own synthesis after the group files exist. That is a separate organisers-only exercise, not part of the group driver's work.

<!-- maintainer -->

**Meta:**
- **Length:** 60 minutes. 15 + 25 + 20 = 60 phase budget. Phase 2's saved file is the core artifact; Phase 3 enriches it with cross-group comments and is the live system surface
- **Core artifact:** one file per group in `shared/`, named with the pattern `rollout-synthesis-atlas.md` or an invented crux-based label like `rollout-synthesis-escalation-fog.md`. The file accumulates: crux + evidence (Phase 2 prompt 1), Ideas (Phase 2 prompt 2), Comments from other groups (Phase 3)
- **Folder topology assumption:** one synced SharePoint workshop folder contains one first-name folder per participant plus `shared/`. Everyone syncs the same workshop folder before the session. The group driver does not add folders live; they open Cowork on the workshop folder, read group members' first-name folders, and write only the group synthesis to `shared/`
- **Phase 3 skip rule:** if any group has not saved by the end of Phase 2, skip Phase 3 entirely. The core artifacts still hold. Active cross-pollination needs every group's synthesis to exist
- **Plan as running callout:** the priorities / defers / open organiser question are not a saved file section. They live in the driver's Cowork chat, refreshed each cycle as comments arrive. The artifact is the rich file; the Plan is a live read off it
- **The reveal at Phase 3 close:** *"You just watched agents coordinate on shared files: individuals diverged, groups synthesized, then comments and ideas cross-pollinated live across files in the room. That ordering matters, and so does the structure that produced it."* Land it once
- **Maintainer-acceptance — Cowork loop capability (technical class):** the Phase 3 prompt asks Claude to run cycles continuously without re-prompt, and to detect "new sections since last check" across cycles. Pre-ship audit on 2026-05-05 flagged both as UNVERIFIED platform-capability claims. Maintainer accepts — Cowork supports this loop shape per Antti's direct knowledge. Reference: `memory/compounded/2026-05-04-platform-cowork-capabilities-ui-and-rename.md` (Cowork capability surface). Mechanical re-run still queued pre-cohort against the new Phase 3 prompt
- **Pre-cohort TODO:** re-run mechanical harness against the reshaped Phase 3 cross-pollination prompt before the first Claude Basics cohort. Existing mechanical-tested row (2026-04-28 @ c25d7c4) is STALE. Capability is maintainer-accepted; mechanical confirms the prompt mechanics (detection, narration cap, stop behavior) actually fire as designed

**Quality:** compendium-audited 2026-05-05 (writing@edf18d5 story@edf18d5 technical@edf18d5 behavior@edf18d5)
- judges @edf18d5: writing PASS, story PASS, technical PASS, behavior PASS

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`
