# Exercise: Find the crux

**Time:** 32 minutes. Three phases.

Module 3 is collaborative, but it should not become shared-folder debugging. Each participant starts in Cowork with their participant folder and the `shared` folder both added as working folders. Each group nominates one driver. The driver writes one clean group synthesis to the `shared` working folder.

Before Phase 1: confirm your group number. You will need it in Phase 2.

## Phase 1. Divergence (10 minutes)

Each participant runs an interview with Claude, alone. Claude asks; you answer. The point isn't to write a polished list. The point is to surface the rollout difficulties YOU actually see, in the words YOU actually use, with Claude pushing back when your first answer is too tidy.

Ask Claude to interview you about your team's top three Claude-rollout difficulties and save the notes in your participant working folder.

**Prompt** *(Cowork)*

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once: ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, save the conversation as `m3-rollout-notes.md` in my participant working folder. If you cannot see both my participant working folder and the `shared` working folder, stop and ask me to add them.

Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
```

Answer Claude's questions in plain language. When the file saves, you're done with Phase 1.

## Phase 2. Group synthesis (17 minutes)

Each group picks ONE participant to be the driver. The driver is the only person writing to the `shared` working folder in this phase.

The group talks through the personal notes. Do not start by reading other groups. Your job is to find your group's crux first.

Ask Claude, in the driver's Cowork session, to help synthesize the group's views.

**Prompt** *(Cowork, group driver)*

```
Create our group's rollout synthesis.

First ask me for our group number if you do not already know it.

Then interview the group in chat. Ask for each person's top rollout difficulty and one concrete example. Keep the answers short. After everyone has answered, propose the ONE difficulty that, if our team got it right, would make the others follow. That's the crux.

Show the crux candidate in chat first, in two sentences. Don't save yet. I will ask the group what is wrong or missing.

After I give you the group's push-back, rewrite the synthesis and save it in the `shared` working folder using the group number. If I say group 2, save the file as `group-2-rollout-synthesis.md`. Use the same pattern for the group number I give you.

The file must include:
- named crux
- supporting evidence from the group
- what we should prioritise in the next 30 days
- what we should defer for now
- one open question the organisers need to answer
```

Before the driver asks Claude to save: each non-driver in the group names ONE thing in the candidate crux that's wrong or missing. One sentence each. The driver types those points back to Claude as the push-back. Then Claude rewrites and saves.

This forcing function is the design. Without it, the driver synthesizes alone and the group disengages. The crux belongs to the group, not to whoever held the keyboard.

## Phase 3. Cross-pollination bonus (5 minutes, only if synthesis succeeded)

Run this only after every group has saved its synthesis. If any group is still synthesizing, skip this phase and protect the core artifact.

Ask Claude to read one other group's synthesis and borrow one useful idea without blurring your group's crux.

**Prompt** *(Cowork, group driver)*

```
Read our group's rollout synthesis from the `shared` working folder. Then read one other group's rollout synthesis from the `shared` working folder.

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
- **Length:** 32 minutes. 10 + 17 + 5 = 32 phase budget. Module budget 45 min: 4 Connections + 3 concept + 32 exercise + 4 reveal/reflection + 2 Debrief
- **Core artifact:** one file per group in the `shared` working folder, named `group-N-rollout-synthesis.md`
- **Remote-resilient simplification:** no cross-group read is required for success. Phase 3 is optional and can be skipped without harming the module
- **The reveal at Phase 3 close:** *"You just ran the smallest useful rollout system: individuals diverged, groups synthesized, and only after that did ideas cross-pollinate. That ordering matters."* Land it once

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule 12 + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rules 12, 26, 35)
- sim-passed 2026-04-28 — STALE after the 2026-04-29 M3 simplification
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md` @ c25d7c4) PASS 13/13 — STALE after the 2026-04-29 M3 simplification
- draft 2026-04-29 (M3 redesign: personal divergence, group-driver synthesis, optional cross-pollination; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`
