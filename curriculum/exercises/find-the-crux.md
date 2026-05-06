# Exercise: Find the crux

**Time:** 60 minutes. Three phases.

This exercise has two parts, in this order:

1. **Individual first.** Each participant opens Cowork on the workshop folder root and saves their own rollout notes in their first-name folder.
2. **Group second.** One group driver opens Cowork on the same workshop folder root. Claude reads the notes from the group members' first-name folders and writes the group's synthesis to `shared/`.

The order matters: individual signal first, group synthesis second. Only the group synthesis is shared.

## Phase 1. Divergence (15 minutes)

Each participant runs an interview with Claude, alone. Claude asks; you answer. The aim is not a polished list. It is to surface the rollout difficulties as you see them, in the words you would use, with Claude pushing back when your first answer is too tidy.

Ask Claude to interview you about your team's top three Claude-rollout difficulties and save the notes in your first-name folder under the workshop folder root.

**Prompt** *(Cowork)*

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once: ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, ask me for my first name. Then save the conversation as `rollout-notes.md` in the folder named with my first name.

Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
```

Answer Claude's questions in plain language. When the file saves, you're done with Phase 1.

If your first interview is saved and there is still time, ask Claude to capture rollout ideas in the same file.

**Prompt** *(Cowork, optional)*

```
I have a few ideas about what we should do next with Claude rollout.

Interview me one question at a time so we can capture those ideas clearly in my `rollout-notes.md`.

Keep the ideas in my voice. Don't turn them into final recommendations yet.

Show me the proposed addition in chat before saving it.
```

## Phase 2. Group synthesis (25 minutes)

FYI: *crux* here is borrowed from strategy thinker Richard Rumelt. It means the one difficult part of the challenge where focused action would make the biggest difference.

Each group has one driver. If you're the driver, open Cowork on the same workshop folder root. The participant folders are named with first names like `aino`, `petra`, or `juhani`; duplicate names may have a short suffix. Give Claude the folder names exactly as they appear.

Claude reads the rollout notes from your group's first-name folders and saves the group synthesis to `shared/`. Your job is to find your group's crux.

Ask Claude to read the group notes, propose a crux in chat, then save the corrected synthesis.

Claude will propose. Assume it got the crux partly right. Also assume it may be way off. Steer heavily if needed; make Claude really see the trouble the group is naming.

**Prompt** *(Cowork, group driver)*

```
Create our group's rollout synthesis.

First ask me for the exact folder names of the people in this group. Wait for my answer.

Read `rollout-notes.md` from each folder I give you. If a folder or file is missing, tell me which one is missing and continue with the files you can read.

Use only the saved rollout notes as raw material.

Propose the crux. Use Richard Rumelt's meaning: the one difficulty that, if our team got it right, would make the others follow.

Show the crux candidate in chat first. Do not save yet. Include:
- named crux
- why you chose it over the other difficulties
- evidence from the rollout notes
- what would change if we got this crux right

Wait while I ask the group what is wrong or missing.

After I give you the group's push-back, rewrite the synthesis.

Ask me for the group's name for the filename. If we have not named the group, invent a short label from the selected crux.

Save the synthesis in `shared/` with a filename like `rollout-synthesis-atlas.md` or `rollout-synthesis-escalation-fog.md`, using lowercase kebab-case.

The saved file must include:
- named crux
- supporting evidence from the group
- what would change if we got this crux right
```

Before saving, push back until the crux sounds like the group's real trouble, not Claude's neat version of it.

If the group wants to compare alternatives before approving the synthesis, ask Claude to list the other possible cruxes.

**Prompt** *(Cowork, group driver, optional)*

```
Based on what you have read, list the other possible cruxes.
```

The crux belongs to the group, not to whoever held the keyboard.

The synthesis file holds the diagnosis. Now add the ideas already in the notes, plus anything the group wants to add.

Ask Claude to collect ideas from the rollout notes and invite final additions.

**Prompt** *(Cowork, group driver)*

```
Read the rollout synthesis file you just saved in `shared/`.

Use the rollout notes you already read for this group. Find any rollout ideas, suggested next steps, or "what we should do" notes in those files.

Ask me whether the group wants to add any more ideas. Wait for my answer.

Append a section called "Ideas" to the synthesis file. Include the ideas from the rollout notes and any additions I give you.

Then add your brief read below them: which idea best fits the crux, which might be premature.

After saving, tell us what you added and what you think in 5 to 7 bullets.
```

You are done with Phase 2 when your group synthesis is saved in `shared/` and includes the Ideas section. Nice work.

## Phase 3. Cross-pollination (20 minutes)

You can start Phase 3 as soon as your group synthesis has the Ideas section. Claude can wait for other group files to appear, then re-read as new material comes in.

If you're the driver, ask Claude to visit other groups' files, leave comments, check your group's file, and refresh running recommendations in chat. One useful comment is better than rushing through every file.

This prompt can run for a while. If narration gets long, drifts off, or moves too fast for the group to follow, interrupt and steer: *"narrower, only flag overlaps with our crux"*, *"slow down, one cycle then wait for me"*, or just *"stop"*.

Ask Claude to add comments to other group files and narrate what comes back.

**Prompt** *(Cowork, group driver)*

```
Use the same group name from the synthesis file you just saved. If you cannot tell the group name from the filename or this session, ask me.

Then run cycles. In each cycle:

1. Look in `shared/` for other groups' rollout synthesis files.
   If none are ready yet, say so briefly, wait a little, then check `shared/` again.
   If other group files are ready, visit up to two of them. Prefer files we have not commented on yet, but re-read any file that has changed since you last saw it.
   For each:
   - read the file
   - append a section named with our group name, for example "Comments from Atlas", with two or three bullets: one idea worth borrowing or extending, one comment or sharper question from our group, plus a flag if you see overlap with our crux
   - save the file

2. Re-read our own file in `shared/` every cycle. If a new section whose title starts with "Comments from" arrived since the last check, narrate it: which group commented, what they noticed, whether it fits our crux.

3. Refresh the running recommendations in chat. Do not save them to file. Based on our crux, evidence, ideas, and any incoming comments, show three short bullets each for:
   - try next
   - hold for later
   - one open question only the organisers can answer
   Replace the previous recommendations each cycle. This is a running surface, not a log.

4. Continue to the next cycle unless I tell you to stop.

Narrate each move shortly: "Visiting Atlas, appended. Checking ours, no change. Recommendations updated..." Keep narration tight, one or two sentences per move.

If you've already commented on every other available group's file, pause the writing-out half and keep watching. Re-read `shared/` and our own file as new files or comments arrive, narrating new material and refreshing the recommendations with the new context.

Stop when I say stop.
```

Whenever the group says stop, stop. The artifact is the synthesis file plus whatever comments accumulated. The recommendations in chat are a live read of that file; anyone can rebuild them later by reading the file.

<!-- maintainer -->

**Meta:**
- **Length:** 60 minutes. 15 + 25 + 20 = 60 phase budget. Phase 2's saved file is the core artifact; Phase 3 enriches it with cross-group comments and is the live system surface
- **Core artifact:** one file per group in `shared/`, named with the pattern `rollout-synthesis-atlas.md` or an invented crux-based label like `rollout-synthesis-escalation-fog.md`. The file accumulates: crux + evidence (Phase 2 prompt 1), Ideas (Phase 2 prompt 2), Comments from other groups (Phase 3)
- **Folder topology assumption:** one SharePoint workshop folder synced with OneDrive before the workshop contains one first-name folder per participant plus `shared/`. The group driver does not add folders live; they open Cowork on the workshop folder root, read group members' first-name folders, and write only the group synthesis to `shared/`
- **Phase 3 wait rule:** a group can start Phase 3 once its own synthesis has the Ideas section. The prompt waits and re-reads `shared/` if other group files or incoming comments are not ready yet
- **Recommendations as running callout:** the try-next / hold-for-later / open organiser question bullets are not a saved file section. They live in the driver's Cowork chat, refreshed each cycle as comments arrive. The artifact is the rich file; the recommendations are a live read off it
- **The reveal at Phase 3 close:** *"You just watched agents coordinate on shared files: individuals diverged, groups synthesized, then comments and ideas cross-pollinated live across files in the room. That ordering matters, and so does the structure that produced it."* Land it once
- **Maintainer-acceptance — Cowork loop capability (technical class):** the Phase 3 prompt asks Claude to run cycles continuously without re-prompt, and to detect "new sections since last check" across cycles. Pre-ship audit on 2026-05-05 flagged both as UNVERIFIED platform-capability claims. Maintainer accepts — Cowork supports this loop shape per Antti's direct knowledge. Reference: `memory/compounded/2026-05-04-platform-cowork-capabilities-ui-and-rename.md` (Cowork capability surface). Mechanical re-run still queued pre-cohort against the new Phase 3 prompt
- **Pre-cohort TODO:** re-run mechanical harness against the reshaped Phase 3 cross-pollination prompt before the first Claude Basics cohort. Existing mechanical-tested row (2026-04-28 @ c25d7c4) is STALE. Capability is maintainer-accepted; mechanical confirms the prompt mechanics (detection, narration cap, stop behavior) actually fire as designed

**Quality:** compendium-audited 2026-05-05 (writing@edf18d5 story@edf18d5 technical@edf18d5 behavior@edf18d5)
- judges @edf18d5: writing PASS, story PASS, technical PASS, behavior PASS

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`
