# Exercise: Extend your system

**Time:** 25 minutes.

**Session** *(new, "Module 8 - Agents building agents")*

**What you do:**

Your agent improves your Module 2 agent from what broke at your neighbour's in Module 7. Then you describe a new agent; an agent builds it. Pick one extension you'd use:

- **New data source.** Reads from somewhere your system doesn't: a second wiki, a folder of PDFs, a new connector, another team's `memory/`.
- **New output.** Produces a format you lack: a one-page brief, a weekly digest, a pre-meeting prep note.
- **New perspective.** Reads the same memory but argues with it: a skeptic, a devil's advocate, a persona holding the view your voice suppresses.

## Phase 1: Improve the agent your neighbour ran

*7 min*

`module-7/handover.md` says where your Module 2 agent broke on someone else's system.

{{prompt:extend-your-system-2}}

Your agent improved your agent. Now it builds a new one.

## Phase 2: Describe

*5 min*

Open `module-8/extension-brief.md`; write four lines:

- The gap: *"I don't have anything that does X."*
- The job: *"Each week I need to Y; today I Z by hand."*
- What it reads: files, `memory/` pages, sources. For PDFs, how it checks text extracted.
- What it writes: one named file.

Over five minutes? Narrow the gap.

## Phase 3: Generate

*8 min*

{{prompt:extend-your-system-1}}


## Phase 4: Run, judge, keep the fix

*5 min*

Run your Module 5 judge on the new agent's output. Push back in the session:
- *"Cite the memory file for the second claim."*
- *"You used training data on line 4. Replace it or remove it."*
- *"The tone drifted from my other agents. Sharpen to match."*

Then keep what you pushed back on:

{{prompt:extend-your-system-3}}

## Take stock of the compound

**What happened:**

An agent fixed the agent that failed your neighbour, then built a new one. What you pushed back on went into the rules the next agent starts from.

**The point:**

Each agent your agent builds starts from what the last one learned. In the forum, the room's agents improve each other's work.

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

**View summary:** Until now you built agents by hand. Now you describe one and the coding agent builds it, in twenty-five minutes, against a gap you named on Monday. The artifact is a new working agent in your system, built while the builder role left your desk.
