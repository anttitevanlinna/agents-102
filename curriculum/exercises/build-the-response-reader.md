# Exercise: Build the response *reader*

**Time:** 30 minutes.

**What you do:** Have Claude write a reader agent for your team's answers, run it once, and schedule it daily.

**What you build:** A reader that keeps two shortlists current as answers arrive: moves worth making, and the people who want to make them.

**The point:** The people who want to move and the moves worth making show up in the same answers.

## Write the reader's instructions

Ask Claude to write a reader agent for your team's answers and run it once.

{{prompt:em-build-response-reader}}

The reader is one markdown file in `agents/`. Everything it does is written there in plain language, so changing how it sorts means editing that file.

## Read the two lists side by side

Few answers are in yet, so the first run leans on the observations you brought from the M1 week. The lists sharpen as answers land.

Check the coalition list against your instinct. Someone on it you would not have picked by title is the list doing its job. Someone you expected and do not see: open their answer, or check whether they have sent one. If a placement looks wrong to you, tell Claude why and have it change the reader's instructions, not the list.

## Schedule it daily

In the desktop app's **Code** tab, click **Routines**, then **New routine**, and choose **Local**. Fill in:

- **Name:** `Response reader`
- **Instructions:** the prompt below, with your `leading-agentic-engineering` folder picked underneath it
- **Schedule:** Daily, at a time you will actually look at the result

Ask Claude to read the reader's instructions and rewrite the shortlists from what is in `responses/` now.

{{prompt:em-response-reader-task}}

Save. Click **Run now** once and check that `shortlists.md` changed. Each run starts from the reader's file, so an edit to `agents/response-reader.md` shows up in the next run.

<!-- maintainer -->

**Atomic — no phase markers.** Write, read, schedule: one agent built and put on a clock in one sitting.

## Design (EM proving run 2026-09-30)

- **Role in M2:** second agent in the swarm, after M1's weekly diagnostic. Runs daily so the next module opens on a full week of answers.
- **Two prompts, same split as M1's diagnostic and Agents 101's `personal-agent-homework`.** `em-build-response-reader` writes `agents/response-reader.md` and runs it once; `em-response-reader-task` is the scheduled task's Prompt field and only points at the agent file. Both run headless.
- **Two lists at once:** move candidates and coalition candidates (engagement, not seniority). The reader proposes only and never edits `team-leadership.md`. M1's weekly diagnostic reads `responses/` too and promotes into Team Knowledge there, so the memory learns from answers without the reader writing to it.
- **Companions, not instruments** (strategy § Coalition as companions): the reader lists who has not answered without ranking them down, and quotes the line that put each person on the list so the manager judges the evidence, not a score.
- **Cold start (§47):** in the room there may be no answers yet. The reader reads `observations/` (M1's Bring) as a starting point and marks every entry that rests on an observation rather than an answer. Both empty: it writes the two empty lists so the shape is visible.
- **Correct the instructions, not the output:** a wrong placement becomes an edit to the agent file, so the next daily run carries the correction.
- **Platform claim:** verified 2026-09-30 against https://code.claude.com/docs/en/desktop-scheduled-tasks.md (curl): Code tab → Routines → New routine → Local; fields Name, Description, Instructions (folder picked below it), Schedule presets incl. Daily and Weekly (day + time); Run now on the task detail page; a run the machine sleeps through is skipped, not caught up.
- **Handoff:** `shortlists.md` and `agents/response-reader.md` are read by M3 (`em-shortlist-and-first-move` reruns the reader on the full week; `em-find-two-crux`; the coalition check-in names members from it; the peer export carries it).

**Leap test** (`check_pedagogy` §45, three observable outcomes by the next working day):
1. **`Response reader` is a scheduled task in the desktop app and has run at least once.** Falsifiable: the routine's history shows a run.
2. **`shortlists.md` holds two lists, and every entry quotes the answer or observation behind it.** Falsifiable: an entry with no quote is a guess.
3. **The manager names one coalition candidate they would not have picked by title.** Falsifiable: a Decision Journal line or observation saying who, and which answer did it.
