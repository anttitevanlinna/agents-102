# How do you make your system learn?

**Time:** 7 minutes. Closing lecture for Module 1.

A system, just built. It runs on a task that matters, with rules written here, in a folder that will be there next week. The next move is what makes it a system worth keeping.

## A snapshot, not a forever-file

The Phase 2 CLAUDE.md is today's snapshot. It catches what you saw today. Tomorrow the team will use the same response.md template for a different question, and Claude will produce a different generic claim that today's rules don't catch yet. The CLAUDE.md is not a forever-file. It's a Tuesday file.

The wrong move (what most people do): when the next generic claim shows up, they paste a longer prompt to fix it. *"Don't say X this time."* The fix lives in the next message and dies when the conversation ends.

The right move: the rules file gets updated. Same task, same agent, same folder. The new rule joins the list. Tuesday's CLAUDE.md becomes Wednesday's CLAUDE.md, slightly sharper.

## A demo

Here are two outputs from this room. Two participants, same Phase 1 task, two different generic-but-different claims. One said the team uses Microsoft Forms for incoming requests; the team uses Jira. The other said the team checks compliance through a security review board; the team checks through a peer-review chat thread.

Watch what happens when you ask Claude to read both outputs at once and propose a CLAUDE.md update.

```
Read response-A.md and response-B.md, then read CLAUDE.md. Both A and B contain a generic claim about how this team operates that would have been caught by a sharper rule. Propose ONE rule that catches both. Save it to CLAUDE.md as the next rule. Tell me in 2 lines what the rule is and why it catches both.
```

The agent reads. Proposes. The new rule looks something like *"Don't name a tool the team uses unless asked. If asked, say 'tools-vary-by-team' and prompt for confirmation."* That single rule retires both wrong claims. The CLAUDE.md gets one line longer; the next ten responses get cleaner without anyone writing another prompt.

## Compounding

Your finance team has a word for this. **Compounding** is what they call returns that build on previous returns. Small adjustments, repeated, dwarf big one-time interventions. The CLAUDE.md compounds the same way. One sharper rule on Tuesday plus one sharper rule on Wednesday plus one on Thursday is a Friday system that works on the next person's question without your help.

The system does not get better by being clever. It gets better by being edited.

## A note on where rules live

Your CLAUDE.md sits in the folder you opened this session in. It belongs to that folder. Open a different folder on Monday for a different task, and that other folder needs its own CLAUDE.md. Two options when the new task is similar enough that the old rules apply: copy the file across, or write a tighter one from scratch. Most teams settle on a starter CLAUDE.md they keep in a shared spot and copy as the seed for new folders. Today the file is task-scoped; later you'll see how a personal one travels with you regardless of folder.

## What you don't yet trust

The system runs on a task where the ground truth was already known. That's why generic, off, and wrong were spottable. The instinct doing the catching was a human one. Yours.

Take that instinct to a task where the answer isn't already in your head. What happens?

That's where the next module lives. Verification is what the team does when the answer isn't already in their heads. Module 2 picks it up.

<!-- maintainer -->

**Quality:** compendium-audited 2026-04-28 (post rule-#3 + post never-abbreviate-modules sweeps)
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_lectures v2026-04-27)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched opener + close prose; re-sim recommended before next cohort
- mechanical-tested: N/A (lectures are trainer-narrated, no prompt-chain to execute)

**Lecture meta:** *7-minute closing lecture for M1. Trainer leads. Optional 2-output-merge demo from real cohort participants for the compounding metaphor.*

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
