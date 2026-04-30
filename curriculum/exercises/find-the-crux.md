# Exercise: Find the crux on our journey

**Time:** 32 minutes. Three phases.

This exercise has two modes, in this order:

1. **Individual first.** Each participant opens Cowork on the shared SharePoint workshop folder and saves their own rollout notes in their first-name folder.
2. **Group second.** One nominated driver opens Cowork on the same workshop folder. Claude reads the notes from the group members' first-name folders and writes the group's synthesis to `shared/`.

The point is the sequence: individual signal first, group synthesis second. Only the group synthesis is shared.

## Phase 1. Divergence (10 minutes)

Each participant runs an interview with Claude, alone. Claude asks; you answer. The point isn't to write a polished list. The point is to surface the rollout difficulties YOU actually see, in the words YOU actually use, with Claude pushing back when your first answer is too tidy.

Ask Claude to interview you about your team's top three Claude-rollout difficulties and save the notes in your first-name folder.

**Prompt** *(Cowork)*

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once: ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, ask me for my first name. Then save the conversation as `rollout-notes.md` in the folder named with my first name.

Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
```

Answer Claude's questions in plain language. When the file saves, you're done with Phase 1.

## Phase 2. Group synthesis (17 minutes)

Each group picks ONE participant to be the driver. The driver uses the same synced SharePoint workshop folder. The participant folders are named with first names, such as `aino`, `petra`, or `juhani`. The driver knows the first names and gives them to Claude.

The driver is the only person writing to `shared/` in this phase. Claude reads the personal notes from the first-name folders. Do not start by reading other groups. Your job is to find your group's crux first.

Ask Claude, in the driver's Cowork session, to help synthesize the group's views.

**Prompt** *(Cowork, group driver)*

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

FYI: *crux* here is borrowed from strategy thinker Richard Rumelt. It means the one difficult part of the challenge where focused action would make the biggest difference.

Before the driver asks Claude to save: the group looks at the candidate crux and gives push-back. What is wrong, missing, too soft, or too broad? The driver types that push-back to Claude. Then Claude rewrites and saves.

This forcing function is the design. Claude reads the raw material from files; the group steers the synthesis. The crux belongs to the group, not to whoever held the keyboard.

If solution ideas are already in the room, store them after the crux is saved. Keep them separate from the crux so the file preserves both: the diagnosis and the first solution instincts.

Ask Claude to append the ideas and give a quick read on them.

**Prompt** *(Cowork, group driver)*

```
Read the rollout synthesis file you just saved in `shared/`.

Append a section called "Solution ideas from the group". Store the ideas I give you there. Then add your brief read below them: which idea best fits the crux, which idea might be premature, and what question would sharpen the next discussion.

After saving, tell us what you added and what you think in 5 to 7 bullets.

Our ideas:
```

## Phase 3. Cross-pollination bonus (5 minutes, only if synthesis succeeded)

Run this only after every group has saved its synthesis. If any group is still synthesizing, skip this phase and protect the core artifact.

Ask Claude to read one other group's synthesis and borrow one useful idea without blurring your group's crux.

**Prompt** *(Cowork, group driver)*

```
Read our group's rollout synthesis from `shared/`. Then read one other group's rollout synthesis from `shared/`.

Compare them briefly:
- one idea the other group saw that we missed
- one thing our group should keep distinct
- one sentence we should add to our synthesis, if any

Show me the proposed addition in chat first. Don't save until the group approves it.
```

If the addition helps, ask Claude to append a short **Cross-pollination note** to your group's synthesis file. If it muddies the crux, leave the file alone.

The organisers may run their own synthesis after the group files exist. That is a separate organisers-only exercise, not part of the group driver's work.

<!-- maintainer -->

**Meta:**
- **Length:** 32 minutes. 10 + 17 + 5 = 32 phase budget. Module budget 45 min: opening + live work + close
- **Core artifact:** one file per group in `shared/`, named with the pattern `rollout-synthesis-atlas.md` or an invented crux-based label like `rollout-synthesis-escalation-fog.md`
- **Folder topology assumption:** one synced SharePoint workshop folder contains one first-name folder per participant plus `shared/`. Everyone syncs the same workshop folder before the session. The group driver does not add folders live; they open Cowork on the workshop folder, read group members' first-name folders, and write only the group synthesis to `shared/`
- **Remote-resilient simplification:** no cross-group read is required for success. Phase 3 is optional and can be skipped without harming the module
- **The reveal at Phase 3 close:** *"You just ran the smallest useful rollout system: individuals diverged, groups synthesized, and only after that did ideas cross-pollinate. That ordering matters."* Land it once

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule 12 + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rules 12, 26, 35)
- sim-passed 2026-04-28 — STALE after the live-crux simplification
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md` @ c25d7c4) PASS 13/13 — STALE after the live-crux simplification
- draft 2026-04-30 (agenda restructure: live crux exercise uses one agreed shared synthesis location, not a fixed cohort folder; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`
