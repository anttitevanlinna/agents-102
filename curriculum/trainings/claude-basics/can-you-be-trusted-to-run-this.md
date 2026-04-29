# Can you be trusted to run this?

## Big Idea

Trust isn't a feeling. It's a verification you can run on output you didn't already know the answer to.

## Meta

- **Primary Bloom's level:** Apply → Evaluate
- **Prework:** none in Module 2 (Module 1 already had everyone in Cowork on a personal SharePoint folder; folder CLAUDE.md exists)
- **Homework:** none
- **Materials (trainer):** the IT Director's chosen real-O365-admin task confirmed and dry-run two days before the cohort. The chosen task must produce at least one claim no participant can verify on the spot
- **Plug points:** the IT Director's prompt (composed live, room steers); the admin panel each participant opens for verification; one *"I can't tell"* row that becomes a verification rule

## What You'll Learn

After this module, you will be able to:

- **Construct** a verification table that pulls every claim out of an LLM output, one row per claim
- **Verify** each claim backward against ground truth held in a real admin panel
- **Distinguish** *checked-true / checked-wrong / I can't tell on this* and treat the third as a custodial answer, not a failure
- **Translate** an *"I can't tell"* row into a CLAUDE.md verification rule that fires before trusting the next similar output

## Connections

Think back to Module 1, or to your pre-work. Was there a moment when Claude told you something at work and you weren't sure if it was right?

In Module 1 you built a system on a task where you knew the answer. The output came out generic, you caught it, you wrote rules. The catches landed because the truth lived in your head.

Now point that same instinct at a task where you DON'T already know the answer. That's the work the team will be doing on Monday.

## Lectures

[Lecture: The data question](lectures/the-data-question.md)

## Exercises

[Exercise: The IT Director's prompt](exercises/the-it-directors-prompt.md)

## Key Concepts (Emergent)

- LLMs fabricate. Confidence and correctness aren't related. The output sounds the same whether the model knows or doesn't
- *Grounded* is the discipline. Every claim should be checkable against something that isn't the model
- The verification table is the work. Three columns. Some rows clear. Some don't
- *"I can't tell"* is a custodial answer, not a defect

## Plug Points

- **The IT Director's task.** Real O365 admin work the buyer picks two days pre-cohort. The dry-run confirms it produces at least one un-verifiable-on-the-spot claim
- **The admin panel.** Each participant opens the panel relevant to the chosen task: SharePoint admin, Teams admin, Entra ID, whichever fits
- **The break-time verdict.** The IT Director leaves the room during the 15-minute break and runs the same verification on a separate real task. Comes back with one specific thing right, one specific thing wrong, one *"I can't tell."* That verdict opens Module 3

## Debrief

Three minutes. No rule-write here. The verification rule already landed in Phase 5 of the exercise; this Debrief addresses what didn't get fixed.

Ask Claude to list every row from `verification-table.md` you marked *"I can't tell."*

**Prompt** *(Claude Code)*

```
Read verification-table.md. List the rows I marked "I can't tell". Just the claim and where I would have checked. Don't suggest fixes. Don't write rules for them. I want to see them open, not closed.
```

Read the list in chat. One row, in your head: which *"I can't tell"* would matter most if a real user acted on the answer and it turned out to be wrong?

That question scales. Module 3 picks it up at the rollout level.

## Bridge

One prompt verified against one admin panel. The rollout is bigger. What's the actual crux: the thing that, if got right, would make the rest follow?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply → Evaluate
- **Length:** 45 minutes module + 15 min break. 3 Connections + 5 concept + 27 exercise + 7 lecture + 3 Debrief
- **Materials (trainer):** the IT Director's chosen task — real, picked two days pre-cohort, dry-run once. The dry-run criterion is *"does this generate at least one claim nobody in the room can verify on the spot?"* If everything is verifiable, the table reads as checklist
- **The break is part of the training.** The IT Director leaves the room (or shifts to a quiet workstation) and runs the same verification on a real admin task. Trainer briefs them on what *"a good verdict to open M3 with"* looks like: one specific thing right, one specific thing wrong, one *"I can't tell"*. If the IT Director comes back with *"yeah it was mostly fine,"* M3's opening collapses
- **Connections fallback if M1 didn't run.** Self-study readers and any cohort where M2 runs without M1 — replace the *"this morning's M1"* anchor with *"the last time you used Claude on something at work"*

**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rule 35 audience-tier)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-judge-report.md` @ c25d7c4) PASS 12/12 — verbatim round-trip on all 4 prompts; Phase 2 propose-then-save order; Phase 4 chat-walk row-by-row with 2/2/2 verdict distribution; Phase 5 rule lands on the seeded Teams-recording wrong-claim
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched Connections + Bridge prose; re-sim recommended before next cohort

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*

**Eval instance:** `curriculum/evals/instances/claude-basics--the-it-directors-prompt.md`

**Mood contract:** sober alert. Steady-hand custodial. Edits that resolve into *"we've solved hallucination"* steal M3's set-up. Edits that resolve into panic steal M1's empowerment.

**Frame to land (verbatim from strategy session 2026-04-27):**
- *"Trust isn't a feeling — it's a verification you run."*
- *"sober alert custodial — competence in the presence of fallibility, not panic and not false comfort."*
- From the offer (FI): *"Miten Claudesta saa hallittavan? IT-johtaja kirjoittaa ohjeet livenä, tiimi varmistaa että säännöt näkyvät tulosteessa ja tuntuvat toimivilta."*
