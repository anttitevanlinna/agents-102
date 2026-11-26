# Exercise: Build an agent for someone else

**Time:** 30 minutes.

**Session** *(new, "Module 7 - Agents building agents")*

**What you do:**

Your system works for you because it reads your memory. Pick one real person, describe an agent for what they need, and let an agent build it, judge it and rebuild it.

## Pick one real person

*5 min*

{{prompt:pick-one-person}}

## Describe the gap

*5 min*

Open `module-7/person.md`. Write four lines in `module-7/brief.md`:

- The gap: what your person needs and cannot get from your agent, because your agent reads your memory.
- The job: what the new agent does, without your memory.
- What it reads: files your person has, or files you would hand them. Nothing from your own `memory/`.
- What it writes: one named file.

Over five minutes? Narrow the gap.

## Have an agent build it

*10 min*

{{prompt:build-for-the-gap-1}}

## Judge it, and the agent rebuilds it

*10 min*

Don't edit the new agent yourself. The judge checks the output against the files the new agent read, finds what fails, and the agent that built it rebuilds it.

{{prompt:build-for-the-gap-2}}

Your agent built an agent, then rebuilt it from what the judge found. `module-7/built-agent.md` holds the minutes it took.

## Take stock of the compound

**What happened:**

In under half an hour an agent built an agent for a gap a real person has, and rebuilt it until the judge passed it.

**The point:**

Each agent you describe is built faster than the last. When agents build agents for the gaps people around you hit, you and they learn faster.

The [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the moves for the next gap, under "agent generates agent".

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@42b9610a pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @42b9610a: writing PASS (5 findings see instances/agents-101--exercise--build-for-the-gap.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS (1 finding see instances/agents-101--exercise--build-for-the-gap.pedagogy.json), strategy PASS, slides PASS

**Purpose:** the M8 build step (`extend-your-system.md`) for a learner with no neighbour. `build-for-the-gap-1` and `-2` are `extend-your-system-1` and `-2` with module-7 paths and no "hired". The gap comes from one real person, picked by `pick-one-person` (compresses the M7 interview, pick and next-step prompts).

**Sim 2026-11-25:** an empty-folder handover beat beside this exercise took every take-home (M7 idea); see the module maintainer block. The module runs this exercise alone.

**Plug points:** if the learner names nobody, the gap is "what a colleague without my memory could not get from my agent".

**View summary:** Name one real person and what they get. Four lines describe their gap. An agent builds the agent, the Module 5 judge finds what fails, the builder rebuilds it, and `module-7/built-agent.md` records before, after and the minutes.
