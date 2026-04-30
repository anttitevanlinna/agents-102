# Agent Trigger List

The hard part after training is not knowing whether agents can help. You know they can. The hard part is noticing the moment when you should stop doing the work alone and bring the agent into the loop.

This page is a small operating habit: a list of moments that should trigger agent use on a normal workday.

## After Module 2 — Start noticing trigger moments

*Referenced from: Module 2 (building-agent-systems).*

You now have a memory around one live challenge. That changes the question.

Before Module 2, the agent was useful when you had a prompt.

After Module 2, the agent is useful when the work has context it can reuse.

Start a rough trigger list. Do not polish it yet. Just notice the moments where you think:

- I am about to search the same material again.
- I am about to explain the same challenge again.
- I am about to write from scattered notes.
- I am scanning calendar or inbox items to decide what deserves attention.
- I am about to ask for a summary, but what I really need is a point of view.
- I am about to make a decision with context spread across memory, sources, and my head.

The first version can be ugly. A good line looks like:

> When I prepare for the weekly project meeting, ask the agent to read memory/ and sources/ first, then draft the three decisions I need from the room.

That is enough. The habit starts before the system is mature.

## After Module 3 — Notice when one agent is not enough

*Referenced from: Module 3 (multi-agent-systems).*

Now add one more question to each trigger:

**Does this need one agent, or more than one?**

Most triggers need one good agent with good context. Some earn a split:

- Different source zones: one agent for wiki, one for docs, one for internet.
- Different stances: planner, skeptic, reframer.
- Different jobs: generator and judge.
- Different access: one agent can see what another cannot.

Do not split because it feels advanced. Split when the work would get worse if one agent tried to hold every source, stance, and job in one head.

## After Module 6 — When to call the agent

*Referenced from: Module 6 (evaluations).*

Use your agent when one of these shows up:

- You are about to write the same kind of thing for the third time.
- You need to turn scattered material into a decision, briefing, mail, ticket, or plan.
- You are sorting calendar or inbox items and the useful output is a proposed order, draft reply, or preparation note.
- You do not trust the first answer because it depends on sources, numbers, names, policy, or context.
- You need more than one stance on the same question before choosing.
- You are about to take an action that should be proposed, checked, and only then applied.
- You have a judgment you keep making by eye and want to turn into a repeatable check.
- You are avoiding the work because the first step is unclear.
- You are about to ask a colleague a question that your memory or sources might already answer.

The question is not "can the agent do this whole workflow?"

The better question is:

**What part of this work would be easier if the agent did the first pass, the second opinion, the source check, or the next safe action?**

## The three-minute Monday scan

At the start of a workday, scan your calendar and task list. Pick one live item and ask:

1. What context would make this easier?
2. What output will I need by the end?
3. What could the agent draft, check, compare, or prepare before I start?
4. What action could it propose but not yet take?
5. What would make that action safe enough to let it do next time?

Do not start with your biggest process. Start with one repeatable seam in real work.

## Prompt

Ask Claude to turn the habit into your own trigger list:

**Prompt** *(Claude Code)*

```
Help me create my personal agent trigger list.

Read my current training folder: ./crux.md, memory/, module-3/stances/, module-5/still-uncertain.md if it exists, judges/groundedness-judge.md if it exists, ./generation-tactic.md if it exists, and module-6/eval-notes.md if it exists.

Then ask me one question at a time, wait for my answer, and do not show the list. Ask about:
- recurring outputs I write
- recurring decisions I prepare
- source-heavy questions I answer
- checks I do by eye
- safe actions an agent could propose before doing

When you have enough, write ./agent-trigger-list.md with:
1. Five moments when I should call the agent.
2. The first prompt I should use for each moment.
3. The evidence or memory the agent should read first.
4. The eval, judge, or human check that should run before I trust the result.
5. One safe action I could let the agent take later, after the proposal version works.

Keep it practical enough that I can use it on Monday.
```

## What good looks like

A weak trigger list says:

- "Use AI for emails."
- "Use AI for research."
- "Use AI for summaries."

A useful trigger list says:

- "Before Monday's customer-risk meeting, ask the agent to read the account notes, source files, and last week's memory update, then draft a one-page risk brief with every claim grounded."
- "When my calendar is crowded, ask the agent to group meetings by challenge, prepare the two that matter most, and name anything I can decline or delegate."
- "When my inbox contains follow-ups on this challenge, ask the agent to draft replies with the source note beside each claim. I edit and send manually."
- "When I need to send an internal update about this project, ask the agent to draft the mail, run the groundedness judge, then run the goal-nudger eval for executive crispness before I edit."
- "When a ticket update would change customer-facing status, ask the agent to propose the update and cite the source. I apply it manually until the check has passed five times."

That is the habit: not "use AI more."

Use the agent at the moment where context, judgment, repetition, or safe action starts to produce useful force.

<!-- maintainer -->

**Placement:** Post-M6 supplementary. Designed as the Monday operating bridge if Modules 7 and 8 are not held.

**Strategic role:** Converts the six-module capability arc into daily invocation habits. The student leaves with a trigger list, not just a sense of possibility.

**Voice target:** practical, low-ceremony, action-forward. No productivity-hack energy.
