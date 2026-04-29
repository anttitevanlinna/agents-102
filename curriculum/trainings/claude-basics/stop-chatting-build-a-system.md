# Stop chatting — build a system

## Big Idea

With a CLAUDE.md and a real task, you build a system in 45 minutes. Not a chat session. A system.

## Meta

- **Primary Bloom's level:** Apply
- **Prework:** [Cowork tour, the morning planner, your personal CLAUDE.md](../../../site/clients/<slug>/prework.md). About 30–60 minutes, async, optional but rewarded
- **Homework:** none
- **Materials (trainer):** the buyer-chosen Phase 1 task confirmed before the cohort. No slides
- **Plug points:** the buyer-chosen task; the participant's own organisation context; the OneDrive runtime line that opens every working CLAUDE.md

## What You'll Learn

After this module, you will be able to:

- **Generate** output on your own work by running Claude with no guardrails first, deliberately, to feel the gap
- **Apply** a folder CLAUDE.md and watch the same task produce a different answer
- **Identify** generic or off output by using your own domain knowledge as the evaluator
- **Adjust** guardrails to fix specific failure modes you can name

## Connections

> **In-room cohort opening (self-study readers, skip to the question).**
>
> Your IT Director speaks first. They are in the room as a participant, not as a sponsor with an agenda. One sentence in their own words about why they're in this with you, and what they don't yet know. Something like *"I want to learn this with you, not delegate it."* No corporate kickoff. What matters is that the IT Director said it out loud, before anyone else. That sets the tone for the next three modules.

**The question, to you:** when you've used ChatGPT or Claude on something at work (drafting an email, summarising a document, writing a quick FAQ), where did the output come out generic? And was there ever a moment where it actually felt like *yours,* and if so, what made the difference?

## Lectures

[Lecture: How do you make your system learn?](lectures/how-do-you-make-your-system-learn.md)

## Exercises

[Exercise: Build your system](exercises/build-your-system.md)

## Key Concepts (Emergent)

- A chat is one-shot. A system has rules, persistence, and context that survive the conversation
- The CLAUDE.md file is the contract between you and the agent. Written once, read every time
- You are the one evaluator who can spot fabrication on your own data; that instinct is the foundation of everything that comes next
- A working folder on OneDrive is part of the system; the CLAUDE.md tells the agent what runtime it's living in

## Plug Points

- **The Phase 1 task.** The IT Director picks one task that matters to the team's daily work and where the team knows the ground truth. Defaults provided in the exercise file
- **Organisation context.** The CLAUDE.md the participant writes in Phase 2 reflects the team's tone, terminology, and procedures. None of that is shipped pre-baked
- **OneDrive runtime line.** Pre-shipped as the first rule in every CLAUDE.md template; the trainer mentions it once, doesn't lecture it

## Debrief

Three minutes. The retro you'll do here is short and one-shot. Module 2 picks up the verification thread; Module 3 is the wider rollout look-ahead. This Debrief sets up Module 2.

Ask your session to read what you just built and the folder CLAUDE.md you wrote, and propose ONE rule that's missing. One you'll need before you trust this system on a task where you don't already know the answer.

Ask Claude to read the Phase 5 output and your CLAUDE.md, then suggest one missing rule with a short reason.

**Prompt** *(Cowork)*

```
Read site.html (or whatever filename you saved my Phase 5 output to) and my folder CLAUDE.md.

Suggest ONE rule that's missing from the CLAUDE.md. A rule I'd need before I'd trust this system on a similar task where I DON'T already know the right answer cold.

Keep it concrete. One rule. Two sentences. Tell me what it would catch.
```

Read the suggestion in chat. If it lands, ask Claude to add it. If it doesn't, tell Claude why and ask for a different one. The point is not the rule itself. The point is that you can already feel the next move: verification.

## Bridge

A system that runs on a task where the answer was already known. Next: would the same system hold up on a task where the answer isn't already in the room?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply
- **Length:** 45 minutes total. 3 min Connections + 4 min concept + 28 min exercise + 7 min lecture + 3 min Debrief. The Bridge is one sentence, not a beat
- **Materials (trainer):** the Phase 1 task confirmed with the IT Director two days before the cohort, plus one pre-run on it to verify the bare prompt produces catchable wrongness for the team. No slides. The recap site is the projected surface
- **Plug points (trainer):** Phase 1 task default ships as *"draft a one-page IT-team response to a common Claude question internal users ask — e.g., 'is it safe to paste customer email content into Claude?'"* The IT Director may swap to a different task; criterion is *team knows the ground truth on it*
- **Connections fallback if IT Director didn't prep.** If the IT Director arrives without their one sentence ready (real risk despite pre-cohort coordination), trainer pivots: skip the IT Director-speaks-first beat and ask the question to the room directly. The buyer-as-participant rule still holds across the day; the opening sentence is a nice-to-have, not a load-bearing forcing function. Trainer follows up with the IT Director privately at the first break and lands the *"I want to learn this with you"* sentence then, organically

**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 no-narrate-student-state + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_strategy_tie_in, check_pedagogy)
- sim-passed 2026-04-28 (IT-admin-medium-light-chat persona, post-rule-#3-sweep re-sim returned APPROVE WITH TODOs all ≥8/10, contributory TODOs applied)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md` @ 18affa1) PASS 13/13 — VALID for prompt-chain mechanics; subsequent rule-#3 + never-abbreviate-modules sweeps edited body prose only, no prompt-block changes, so the mechanical assertions still hold

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Stop chatting — build a system*

**Eval instance:** `curriculum/evals/instances/claude-basics--build-your-system.md`

**Mood contract:** confident creation. Empowerment is the payoff. Edits that drift toward tooling-tutorial register steal the empowerment.

**Frame to land (verbatim from strategy session 2026-04-27):**
- *"the 3 mini-module skeleton"*
- *"sharepoint works. 1) personal folder for each participant. 2) make claude.md with info for claude cowork that it it is working on onedrive"*
- From the offer (FI): *"Lopeta chattailu — rakenna järjestelmä. Pääharjoitus: rakennetaan järjestelmä ostajan valitsemalle tehtävälle."*
