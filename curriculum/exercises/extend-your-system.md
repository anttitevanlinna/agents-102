# Exercise: Extend your system

**What you do:**

You've been building agents for seven modules. Today you don't build one. You describe one, and the coding agent builds it. The tool that builds tools. The move stops being linear the moment you see it land.

Pick one extension to your system. Something you'd actually use from Tuesday onward. Not a demo. A real gap.

Three shapes to choose from (pick one):

- **New data source.** An agent that reads from somewhere your current system doesn't: a second wiki, a folder of PDFs, a connector you just enabled, a different team's `memory/`.
- **New output.** An agent that produces a shape you don't have yet: a one-page brief, a weekly digest, a pre-meeting prep note, a Slack-ready summary of something you usually write long-form.
- **New perspective.** An agent that reads the same memory but argues with it: a skeptic, a devil's advocate, a persona-agent that holds the view your own voice suppresses.

**Time:** 25 minutes. If you finish early, ship a second one.

**Phase 1. Describe (5 min).**

Open `module-8/extension-brief.md`. Write four lines, no more:

- The gap. One sentence. *"I don't have anything that does X."*
- The job it gets done. One sentence. *"On Mondays I need to Y; today I Z by hand."*
- What it reads. Which files, which `memory/` pages, which sources.
- What it writes. One file, named (or an output shape, described).

If the brief takes more than five minutes, your gap is too big. Narrow it.

**Phase 2. Generate (15 min).**

**Prompt** *(Builder Claude)*

```
Read module-8/extension-brief.md. Build the agent described in it. Write the agent file to agents/<slug>.md — the slug comes from the job, not the technology.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to agents/<slug>.md, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
```


**Phase 3. Run and judge (5 min).**

Claude ran your new agent. Look at the output. Don't read it to admire it. Read it to find the weakness.

Push back in chat:
- *"Cite the memory file for the second claim. That felt generic."*
- *"You used training data on line 4. Replace it or remove it."*
- *"The tone drifted from my other agents. Sharpen to match."*

One or two rounds of push-back. The artifact: a new agent in `agents/` that you trust enough to run again on Tuesday.

**What happens:**

You described. The tool built. You judged. The cycle took 25 minutes. The second agent next week will take ten. Same tool, less describing, because your vocabulary for what you want is sharper. That's the compound.

**The point:**

The seven modules taught you to be a builder. Module 8's first move is watching the builder disappear. You become the describer; the agent becomes the builder. Monday's new gap gets a new agent in 25 minutes, not a new sprint. The ceiling you raised just climbed again.

You just ran the meta-tool move at the heart of **Recipe 8**: agent generates agent, in 25 minutes, on a real gap. After Agents 101, when the next gap wants the same shape, the [Cookbook for Agent System Design](supplementary/cookbook-for-agent-system-design.md) is where the moves live, plus the rest of Recipe 8 (three thinking disciplines, strategy kernel, domain-readiness 3-test) for when the next move is bigger than one agent.

**Time:** 25 minutes.

<!-- maintainer -->

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
- **Phase 1 discipline.** If the brief runs past five minutes, the student is designing the second agent, not the first. Redirect: *"Ship a small one. Ship a second one after."*
- **Watch for 'demo agent' trap.** Students will reach for the impressive extension (multi-step, multi-tool, spectacular). Nudge them toward the mundane one they'd actually use Tuesday.
- **The compound beat.** End-of-exercise, ask aloud (in-room) or surface via Teacher Claude (self-study): *"How long did it take to describe vs. build? What would the second agent take?"* The answer makes the thesis land.
- **Agent-file rules inheritance.** Students sometimes start the new agent from scratch. Nudge: *"You already have agents whose rules work. Inherit them. Add what's new. Don't rediscover."*
