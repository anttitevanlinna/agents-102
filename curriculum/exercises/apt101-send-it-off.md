# Exercise: Send it *off*

**Time:** 35 minutes to set up. It runs before Day 2.

**What you do:**

Your memory sits still until something reads it. Each of you gives it one agent for one recurring job, tries it once, then schedules the job that runs overnight: a digest of what your material says about the bet, waiting for you when Day 2 starts.

Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running. Your memory is on disk, and `./challenge.md` points at the bet.

## Phase 1: One agent, one job

*8 min*

An agent, at its simplest, is a markdown file: instructions Claude reads at the start of every task. What the agent is for, and the rules it follows.

Pick the job from your own week. The product owner might want next week's priority call prepared. The designer might want new interview notes sorted against the riskiest assumption. The team lead might want this sprint's tickets read for what the team keeps tripping on. One job, not three.

Ask Claude to help you create your first agent as a file in `agents/`.

{{prompt:build-your-challenge-memory-5}}

Claude asks; you answer. On the rules, add one of your own, and one from the door: the agent reads only what `team/what-goes-in.md` lets in.

## Phase 2: Try it once

*5 min*

Ask Claude to read the agent file, apply its rules, and do a real task on your memory.

{{prompt:build-your-challenge-memory-6}}

Give it a task from your next working day's to-do list. The citations tell you whether the memory earned its keep, or whether Claude filled in from somewhere else.

## Phase 3: Capture the look

*5 min*

The digest shouldn't read like a terminal dump. Give it your company's look once, as a file every agent reuses.

Ask Claude to extract the visual pattern from your company website and write it as a plain-language style file.

{{prompt:personal-agent-homework-1}}

Give Claude the URL when it asks. It writes `./style.md` and starts `./CLAUDE.md` with one Styling line. Keep that line; at the close you write the rest of the file around it. The designer usually spots what Claude missed first: a brand colour, a rule like *"never pure black."*

## Phase 4: Write the overnight brief

*8 min*

Ask Claude to interview you on the job, the output shape and the hard boundary, then write the agent's instruction file.

{{prompt:personal-agent-homework-2}}

Claude offers three jobs. Pick the one closest to a digest and tell it what you want: what your material says about the bet, with the line it came from. For the boundary, the door: the digest reads only your memory, and only what the team let in. Read `module-2/morning-agent/morning.md` before Claude saves it. Leave the folder name as it is.

## Phase 5: Schedule it

*6 min*

In the desktop app, open the **Schedule** sidebar. Click **New task → New local task**. Fill in:

- **Name:** `Overnight digest`
- **Frequency:** daily, early, before Day 2 starts
- **Prompt:** the one below.

Ask Claude to read the overnight brief, follow the rules, and write the output to `latest.html`.

{{prompt:personal-agent-homework-3}}

Save. Click **Run now** once. Open `module-2/morning-agent/latest.html` in your browser. If it looks off, fix `morning.md` or `./style.md`; the scheduled run reads both, so the next run picks up the change.

Leave your laptop plugged in until the run fires, lid open if you can.

## Phase 6: Read it like a stranger

*3 min*

Each of you reads the first run's top line to the other two. Don't judge it yet. Say one thing: does it sound sure of itself?

## Take stock of what you sent off

**What happened:**

Three agents, each with one job, each reading one person's memory through the team's door. Three overnight runs scheduled. Each will be waiting when Day 2 starts, written in your company's look, and every line in it will sound as sure as the next.

**What's next:**

Day 2 starts with what came back.

<!-- maintainer -->

**Role in Day 1:** beat 7, the last hands-on beat; sends off the overnight digest that opens Day 2 (*What came back*) and threads the training (sent Day 1, agrees with you Day 2, caught by your own criteria Day 3).

**Reuse:** keys `build-your-challenge-memory-5`, `-6` (first agent), `personal-agent-homework-1`, `-2`, `-3` (style, brief, scheduled run). Framing in prose: the three-job menu in `-2` is steered to "a digest of what the material says about the bet"; the `module-2/morning-agent/` path is Agents 101's and stays (rename at the prompt-body pass, per the build plan's wrinkle note).

**Frameworks:** none named in body. *Send it off* before (door you don't open, one agent per job, six parts, it will be wrong) frames the beat; the door slide names what `apt101-what-goes-in` already did, so it lands as recognition.

**Artefacts:** produces `agents/<job>.md`, `./style.md`, the Styling line in `./CLAUDE.md`, `module-2/morning-agent/morning.md`, `module-2/morning-agent/latest.html` (first run), and the scheduled task. Consumes `memory/`, `./challenge.md`, `team/what-goes-in.md`. `latest.html` is read in Day 2 beat 1 (`apt101-read-the-digest`).

**The Day 2 turn, left to happen:** the digest brief asks "what the material says about the bet". The exercise does not ask for evidence against; the Day 2 turn (*Why it agreed*) depends on the trio recognising the agreement themselves. Phase 6 plants the observation (sure of itself) without naming it.

**Capability check owed:** Cowork's scheduling flow (the Schedule sidebar wording is Claude Code Desktop's, copied from `personal-agent-homework`); laptop-asleep catch-up behaviour (A101 facilitator note says one catch-up run on wake). Trainer keeps the Day 2 fallback digest for any run that didn't fire.

**View summary:** Each person gives their memory one agent for one recurring job, tries it, then schedules an overnight digest of what their material says about the bet, in the company's own look. The artefact is a running job that will be waiting when Day 2 starts.
