# Exercise: Send it *off*

**Time:** 35 minutes to set up. It runs before Day 2.

**What you do:**

Your memory sits still until something reads it. Each of you gives it one agent for one recurring job, tries it once, then schedules the job that runs overnight: a digest of your material, briefed in your own words, waiting for you when Day 2 starts.

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

The digest shouldn't read like a wall of plain text. Give it your company's look once, as a file every agent reuses.

Ask Claude to extract the visual pattern from your company website and write it as a plain-language style file.

{{prompt:personal-agent-homework-1}}

Give Claude the URL when it asks. It writes `./style.md` and starts `./CLAUDE.md` with one Styling line. Keep that line; at the close you write the rest of the file around it. The designer usually spots what Claude missed first: a brand colour, a rule like *"never pure black."*

## Phase 4: Write the overnight brief

*8 min*

Ask Claude to interview you on the job, the output shape and the hard boundary, then write the agent's instruction file.

{{prompt:personal-agent-homework-2}}

Claude offers three jobs. Pick the one closest to a digest, with the line each finding came from. For the boundary, the door: the digest reads only your memory, and only what the team let in. Wherever `morning.md` names the door or the bet, have Claude write the team folder's full path, the one the trainer posted, not `team/`. The overnight run starts fresh and has nothing else to find the folder by. Read `module-2/morning-agent/morning.md` before Claude saves it. The numbered folders, `module-2/` here and the ones later prompts make, are where those prompts look for your files, so leave their names as they are.

Then the one line in the brief that only you write. Open your hypothesis, `team/<your-name>/hypothesis.md`, and say in one sentence what the digest should look for in your material about it. Your words, the way you would brief a colleague. Claude writes the sentence into the brief exactly as you said it.

{{prompt:apt101-d1-your-look-for-line}}

One more sentence before it runs, in your own words: what do you expect the digest to say about your hypothesis?

{{prompt:apt101-d1-your-expect-line}}

## Phase 5: Schedule it

*6 min*

In the desktop app, open **Routines** in the sidebar. Click **New routine**, then **Local**. Fill in:

- **Name:** `Overnight digest`
- **Schedule:** daily, early, before Day 2 starts
- **Folder:** your training folder, `~/Documents/apt101/`
- **Instructions:** the prompt below.

Ask Claude to read the overnight brief, follow the rules, and write the output to `latest.html`.

{{prompt:personal-agent-homework-3}}

Save. Click **Run now** once. Where it asks to use a tool, choose **Always allow**, so tonight's run does not stall waiting for you.

Turn on **Keep computer awake** in **Settings > This computer > System**, and leave your laptop plugged in with the lid open until the run fires.

## Phase 6: Check the look, then close it

*3 min*

Ask Claude for a copy of the first run's page with every line of text swapped for placeholder, and open the copy.

{{prompt:apt101-d1-look-check}}

Check the look only: your colours, your type, a page and not a wall of text. If it looks off, or the page is empty, fix `./style.md` or `morning.md`; the scheduled run reads both, so the next run picks up the change.

`latest.html` stays unopened. What it says waits for Day 2.

## Take stock of what you sent off

**What happened:**

Three agents, each with one job, each reading one person's memory through the team's door. Three overnight runs scheduled. Each will be waiting when Day 2 starts, written in your company's look.

**What's next:**

Day 2 starts with what came back.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@9669d4c1 story@ba032676 technical@8e1304d1 behavior@dd243e74 pedagogy@dd242fd9 strategy@1fd93c06 slides@8e1304d1)
- judges @9669d4c1: writing PASS (4 findings see instances/agentic-product-teams-101--exercise--apt101-send-it-off.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS (verify-refuted), strategy PASS, slides PASS

**Role in Day 1:** beat 7, the last hands-on beat; sends off the overnight digest that opens Day 2 (*What came back*) and threads the training (sent Day 1, agrees with you Day 2, caught by your own criteria Day 3).

**Reuse:** keys `build-your-challenge-memory-5`, `-6` (first agent), `personal-agent-homework-1`, `-2`, `-3` (style, brief, scheduled run). Framing in prose: the three-job menu in `-2` is steered to a digest; what it looks for is the student's own sentence, written word for word by the new named prompt `apt101-d1-your-look-for-line`; what the student expects it to say is a second own sentence, written word for word to `team/<name>/expect.md`, outside the brief, by the new named prompt `apt101-d1-your-expect-line`, before the first `Run now`; the `module-2/morning-agent/` path is Agents 101's and stays (rename at the prompt-body pass, per the build plan's wrinkle note).

**Frameworks:** none named in body. *Send it off* before (door you don't open, it runs without you until Day 2) frames the beat; the door slide names what `apt101-what-goes-in` already did, so it lands as recognition.

**Artefacts:** produces `agents/<job>.md`, `./style.md`, the Styling line in `./CLAUDE.md`, `module-2/morning-agent/morning.md` (with each person's own sentence under `## Look for`), `team/<name>/expect.md`, `module-2/morning-agent/latest.html` (first run, unopened), `module-2/morning-agent/look-check.html` (placeholder copy), and the scheduled task. Consumes `memory/`, `./challenge.md`, `team/what-goes-in.md`. `latest.html` is read in Day 2 beat 1 (`apt101-read-the-digest`); its `apt101-d2-what-ran-overnight` quotes the look-for and expect sentences back word for word beside `team/bet.md`, and `team/<name>/doubts.md` keeps a copy because tonight's brief replaces `morning.md`.

**The Day 2 turn, left to happen:** the digest looks for what each person's own sentence asks for. The body offers no example sentence and no verb: whatever the student writes ("find what supports…", "what do users say about…"), the agreement on Day 2 traces back to a sentence they wrote, not to the exercise. The expectation line is written before any run, so Day 2 can set the headline against what each person expected; it carries no example either. Nothing on Day 1 says the digest will agree or be wrong; the Day 2 turn (*Why it agreed*) depends on the trio finding its own sentence behind the agreement. Phase 6 checks the first run's look and closes the page unread: no one hears a headline on Day 1, so every seat meets its own digest first on Day 2.

**Capability check owed:** Cowork's scheduling flow (the Routines wording in Phase 5 is Claude Code Desktop's). A run missed while the laptop slept catches up once on wake (desktop scheduled-tasks docs). A run that didn't fire is rerun on Day 2 from the person's own brief; the trainer's fallback digest is only for a laptop that cannot run it (`apt101-read-the-digest`).

**Failure modes:** phase 1, a job too big for one agent ("run our discovery"; trainer: one recurring output, one reader); phase 2, the try-it task answered from general knowledge (ask which memory page each claim came from); phase 3, the style file copies the website's words instead of its look (colours, type, spacing only); phase 4, the look-for line rewritten by Claude or written by the trainer (it is the person's own sentence, word for word); phase 5, the run never fires (laptop asleep; Day 2 reruns from the person's own brief); phase 6, someone opens `latest.html` (the copy is the only page opened).

**Leap test:** on Monday each person (1) has a scheduled job running on their own memory; (2) can say in one sentence what their digest was told to look for; (3) briefs a new agent with one job, one output shape and one hard boundary.

**View summary:** Each person gives their memory one agent for one recurring job, tries it, then schedules an overnight digest, briefed by one sentence each person writes from their own hypothesis, in the company's own look. The artefact is a running job that will be waiting when Day 2 starts.
