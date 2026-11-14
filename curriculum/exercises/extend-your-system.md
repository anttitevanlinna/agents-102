# Exercise: Extend your system

**Time:** 25 minutes.

**Session** *(new, "Module 8 - Agents building agents")*

**What you do:**

In Module 7 your neighbour could not use your agent. Describe an agent for what they needed; an agent builds it, judges it and rebuilds it.

## Phase 1: Describe the gap your neighbour hit

*5 min*

Open `module-7/handover.md`. It says what your neighbour needed and what broke without your files. Write four lines in `module-8/extension-brief.md`:

- The gap: what your neighbour needed and could not get.
- The job: what the agent does, on your neighbour's system.
- What it reads: files your neighbour has. Nothing from your own folders.
- What it writes: one named file.

Over five minutes? Narrow the gap.

## Phase 2: An agent builds it

*10 min*

{{prompt:extend-your-system-1}}

## Phase 3: Judge it, and the agent rebuilds it

*8 min*

Don't edit the new agent yourself. The judge finds what fails; the agent that built it rebuilds it.

{{prompt:extend-your-system-2}}

Your agent built an agent, then rebuilt it from what the judge found.

## Phase 4: Hand it over

*2 min*

Send the built agent to your neighbour. Their agent runs it on their system.

## Take stock of the compound

**What happened:**

In under half an hour an agent built an agent for a gap your colleague hit, and rebuilt it until the judge passed it.

**The point:**

Each agent you describe is built faster than the last. When agents build agents for each other's gaps, the organisation learns faster.

This is **Recipe 8**: agent generates agent, on a real gap. The [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the moves for the next gap, plus the rest of Recipe 8 for bigger moves than one agent.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Frameworks riffed on:**
- Agents building agents — the meta-tool thesis. The coding agent is the first platform that compounds: each agent it builds raises the capability for the next.
- Claude Code as curriculum-shaped-building — the same tool students have used for seven modules now writes the next agent without leaving the surface.

**Trainer artifacts required:**
- No scaffold needed beyond what Module 2 shipped (`agents/` already exists in the training dir).
- Facilitator-demo version: a pre-recorded extension (new perspective — skeptic persona) to show before students start, timed at 25 minutes.

**Plug points:**
- The gap is always participant-chosen. If a cohort stalls, offer the three shapes (data / output / perspective) as tickboxes, not as prescriptions.
- Self-study: if the student has no real gap in mind, Teacher Claude offers three gaps drawn from their `memory/` — *"I notice you don't have anything that does X, Y, or Z. Pick one."*

**Facilitator notes:**
- **Phase 2 discipline.** If the brief runs past five minutes, the student is designing the second agent, not the first. Redirect: *"Ship a small one. Ship a second one after."*
- **Watch for 'demo agent' trap.** Students will reach for the impressive extension (multi-step, multi-tool, spectacular). Nudge them toward the mundane one they'd actually use Tuesday.
- **The compound beat.** End-of-exercise, ask aloud (in-room) or surface via Teacher Claude (self-study): *"How long did it take to describe vs. build? What would the second agent take?"* The answer makes the thesis land.
- **Agent-file rules inheritance.** Students sometimes start the new agent from scratch. Nudge: *"You already have agents whose rules work. Inherit them. Add what's new. Don't rediscover."*

**View summary:** The gap comes from Module 7: what your neighbour needed and could not use. You describe an agent for it; an agent builds it, the Module 5 judge finds what fails, the builder rebuilds it, and `module-8/built-agent.md` records before, after and the minutes it took.
