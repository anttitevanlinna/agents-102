
=== MODULE multi-agent-systems

# Multi-Agent Systems

## Big Idea
Hire three agents to search. Three more to decide. The filesystem is the meeting room.

## Prework

[Schedule your personal agent](exercises/personal-agent-homework.md) to read your challenge memory for a week. [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) covers tools, memory and context. [Helper agents primer](exercises/module-3-prework.md) before Module 3.

## What You'll Learn
You will:
- **Design** a multi-agent setup: independent agents sharing files, or helpers serving one lead task
- **Build** three source-finding agents, each in its source's dialect, and a synthesizer
- **Analyze** handoff failures: hidden conflicts, clashing dialects, beige averaging
- **Create** a framework-guided answer to a strategic question about your challenge
- **Evaluate** when splitting pays off and when one agent wins

## Start here

Start a fresh session or task at `~/Documents/agents-101/`. Save outputs under `module-3/`.

Three agents search Confluence, OneDrive and practitioner articles, and three more decide what it means.


--- lectures/agent-that-takes-action.md

# Demo: Agent that takes action

The scheduled agent runs with one new permission: post one message to a demo Slack channel.

The message holds no customer data, private names, commitments or decisions. The agent writes the message first and sends only after approval. If the channel is missing or the message needs judgment, the agent stops.

Writing a file changes your folder. Slack changes another system.

--- end lectures/agent-that-takes-action.md



--- exercises/name-your-crux.md

# Exercise: Name your crux

**Time:** 8 minutes.

**Session** *(new, "Module 3 - Multi-agent systems")*

**What you do:**

Ask the agent to read Module 2's `memory/` and name the **crux**, Richard Rumelt's term for the one thing that, if solved, releases pressure on everything else. Push back when the first answer restates the problem.

{{prompt:name-your-crux-1}}

Iterate; save when good enough.

The crux is the obstacle. Ask the agent to name the sharpest decision it blocks, the call you'd stay late to make, and append it to the crux file.

{{prompt:name-your-crux-2}}

Iterate past a topic restatement; save when good enough.

--- end exercises/name-your-crux.md



--- exercises/three-retrievers-one-curator.md

# Exercise: Three retrievers, one curator

**Time:** ~28 minutes.

Three retrievers fetch raw material on your challenge into `sources/`; a fourth session curates it into `memory/`. All read `./crux.md`. Each session has its own context and connectors. Skip any retriever you can't run today.

<div class="rt-code">

*Keep your crux session as Session 4 (synthesizer). Open three more: 1 wiki, 2 docs, 3 internet.*

</div>
<div class="rt-cowork">

*In *Cowork*, keep your crux task as Task 4 and start three more: 1 wiki, 2 docs, 3 internet.*

</div>

Paste each retriever prompt and confirm its short list. If an agent starts reading the world, stop it, steer narrower, then say *"continue"*.

Session 1, wiki: `sources/wiki-retrieval.md`.

{{prompt:three-retrievers-one-curator-1}}

Session 2, docs: `sources/docs-retrieval.md`.

{{prompt:three-retrievers-one-curator-2}}

Session 3, internet: `sources/internet-retrieval.md`.

{{prompt:three-retrievers-one-curator-3}}

If a file is thin, paste this for another round.

{{prompt:three-retrievers-one-curator-4}}

Session 4, synthesizer: `memory/`.

{{prompt:three-retrievers-one-curator-5}}

Done when `memory/_synthesis-m3.md` names what changed.

--- end exercises/three-retrievers-one-curator.md



--- exercises/three-minds-one-synthesis.md

# Exercise: Three minds, one synthesis

**Time:** ~22 minutes.

**What you do:** Spawn three helpers with different stances on your curated memory.

Stay in the session that wrote `./crux.md`, close the retriever sessions, and wait for `memory/_synthesis-m3.md`. If a helper reads too widely, stop it, steer narrower, then say *"continue"*.

<div class="rt-code">

Ask the agent to spawn three helpers with different stances, then apply Rumelt's kernel to synthesize their notes into `./crux.md`.

{{prompt:three-minds-one-synthesis-1}}

</div>
<div class="rt-cowork">

Ask the agent to spawn three helpers with different stances, then apply Rumelt's kernel to synthesize their notes into `./crux.md`.

{{prompt:three-minds-one-synthesis-2}}

</div>

If the issue list is long, ask the agent to pick the fixes that aim for optimal function in the next session.

{{prompt:three-minds-one-synthesis-3}}

**Close. Does this feel right?**

Optional: ask the agent to recap the three retrievals' core claims next to your `## Answer`. You can't yet tell if the answer is right. That is expected. Name the doubt; don't fix it here.

--- end exercises/three-minds-one-synthesis.md



--- lectures/when-to-split-an-agent.md

# Lecture: When to split an agent (and how)

Two ways to split an agent: three retrievers in separate windows, three stances inside one session. When do you split, and how?

## The unit is the recurring workflow

Build one agent per recurring workflow: a single `.md` file, guardrailed for that job. A mega-agent that does everything drifts in scope. A hundred tiny agents cost more to coordinate than they save.

Within one workflow, when does splitting pay?

## Start with don't
<!--slide:start-with-dont-->

Inside a workflow, start with don't. Default to one agent with a good prompt. Splitting adds coordination cost: handoffs, mis-framing, prompts to tune per agent, a synthesis step that can mislead. If one agent can produce what you need, use one.

## Split when they can't be one
<!--slide:split-when-they-cant-be-one-->

Split into several agents when any of three tests holds. If none does, a single prompt is probably better.

- **Different access.** Each agent needs different data, tools or credentials. A legal-policy agent shouldn't have customer-data access.
- **Different dialect.** Each source speaks its own language: internal jargon, public tone, email shorthand.
- **Different stance.** Agents should disagree. A backward planner and a reframer in the same voice are one agent pretending to be two.

## More agents is not more rigour

Split for a reason, not because "three is more thorough". More agents means more prompts to tune, more noise and more coordination cost. More input does not fix a beige answer.

## A framework makes it pick

Without a framework, the synthesizer summarises three views, evenly weighted.

Hand the synthesizer the strategy kernel (diagnosis, guiding policy, coherent actions). The synthesizer then commits to one diagnosis and drops what does not serve it.

## The test that catches the bluff

Could one prompt produce the same quality of output? If yes, write that one prompt. Single-agent is the default.

## Two options, each with its own territory

**Separate sessions (the Phase 1 move).** Pick this when each agent needs its own context, tools and clock. You see each agent work and can step into one without confusing the others.

**Helper agents in one session (the Phase 2 move).** Pick this for quick parallel thinking with a bounded return. Each helper gets one job, reports back as a file and disappears. The main session stays in charge.

## Other agents are part of the tool surface

One agent can call another for a different stance, source zone, or working style.

**Pick:** Sessions for agents that stay alive; helper agents for in and out. Different tools: sessions. Shared tools: helper agents.

## Seams are where it fails

Splitting creates handoffs, and handoffs are where work goes wrong. A retriever finds two numbers and the curator keeps one. A source's internal shorthand is rewritten in public tone and loses its meaning.

Check where the pieces meet.

## Three agents is not three times as good

Multiple agents give *three different views of the same thing*, and cost coordination. If one well-prompted agent does the job, write that prompt.

--- end lectures/when-to-split-an-agent.md



--- lectures/debugging-stuck-agents.md

# Debugging Stuck Agents

Agents get stuck: wrong source, three views averaged into mush, the wrong file written, confident right before a failed handoff.

## Diagnose before repair

Prompt your stuck system to diagnose whether the bug lives in the sources, the processing, or the boundary between agents.

{{prompt:debugging-stuck-agents-1}}

Make your own variant.

## Sources, processing, boundary

1. **Sources:** add the missing file, remove the stale one, split contradictory material so the agent sees the conflict.

2. **Processing:** rewrite the prompt, role, handoff, or output format. Split an agent doing two jobs.

3. **Boundary:** narrow the agent's job, remove the tool, add a human gate, move the risky step from "do" to "propose."

4. **Shrink the rerun:** rerun only the smallest step that should now differ.

5. **Write down the lesson:** add a rule to CLAUDE.md: what to read first, what not to smooth over, which output format to produce, when to stop and ask.

--- end lectures/debugging-stuck-agents.md


## Debrief

Five minutes. The agent reviews the four prompts, the retrieval files, the synthesizer's briefing and the conversation, then rewrites CLAUDE.md in place and reports what changed. Push back on anything off.

{{prompt:a101-m3-debrief-handoff-rules}}

## Nothing here checks any of it

The prompt asks for a harsh audit: two seams minimum, with evidence (file, pass, what was lost). Without the evidence clause, the review turns diplomatic.

The audit reads how your agents handed work to each other. It does not check whether the briefing is true.

## Push back on the summary

Push back where the summary is wrong: *"The planner and the reframer needed to be separate."* *"The Confluence retriever kept normalising before writing."*

## The doubt stays. Hold it.

The synthesized briefing's correctness stays an open question today.

## Optional memory check before Module 4

**Optional move: pressure-test the memory.** After adding much to `sources/`, run this between modules. New evidence tests the memory's structure.

{{prompt:a101-m3-homework-memory-health}}

## Key Concepts
- Sessions on shared files, or subagents under one lead.
- Split only where agents can't be one: access, dialect, stance.

## Pre-reads before Module 4

[Agent Trigger List, After Module 3](trainings/agents-101/supplementary/agent-trigger-list.md#after-module-3-notice-when-one-agent-is-not-enough) and the multi-agent sections of [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md).


--- lectures/module-4-prework.md

# Reading: Before Module 4

**Reading 1. Personal skills.** A skill is a `SKILL.md` plus supporting files (policy text, templates). The `SKILL.md` says what the skill is for, when to use it, and how. The agent loads it when a task matches. In Module 4 you run your policy files raw, package the check with a policy lens and an agent-risk lens, then run it on your Module 2-3 system.

**Reading 2. Agent risk sits on top of normal security.** Network controls, access rights and audit logs still apply. Agents add non-deterministic behaviour, prompt injection (direct, or inside retrieved text) and emergent capability you can only bound. Also watch secrets in context, tool confusion and skill supply-chain.

**Before class:** jot three to five lines on what matters about your company's data, e.g. "Sales never lets unredacted CRM exports leave the building."

--- end lectures/module-4-prework.md


After the optional check and pre-reads, end this session. Module 4 starts fresh at `~/Documents/agents-101/`.

## Bring to Module 4: what's the worst thing it could do with that access?

An agent that works across connected systems has access to those systems.

## Next
Until Module 4, keep working on your real problem: add an agent for a critical dependency, or a plan visualisation.
