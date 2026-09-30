# Exercise: Schedule the *weekly diagnostic*

**Time:** 20 minutes to set up. One read a week after that.

**What you do:** Have Claude write a diagnostic agent, then put it on a weekly clock.
**What you build:** `agents/weekly-diagnostic.md`, an agent that keeps Team Knowledge current while you lead.
**The point:** A memory nobody re-reads is a snapshot; one an agent re-reads each week learns.

## Write the diagnostic agent

An agent here is a file of instructions Claude reads and follows every time it runs. This one reads what you have learned about your people since the last run and proposes what should change in Team Knowledge: an observation that has been backed up again becomes a hypothesis, a hypothesis that has held for weeks becomes a rule, anything contradicted gets demoted.

It proposes. It never edits your memory. You decide what is true about your people.

In the same session, ask Claude to write the agent.

{{prompt:em-schedule-weekly-diagnostic}}

Claude writes the agent file, creates `observations/` and `diagnostics/`, and tells you what the agent does on a week when you have added nothing new.

## Put it on a weekly clock

Open the Claude Code desktop app and go to the **Schedule** sidebar. Click **New task → New local task**, and fill in:

- **Name:** `Weekly team diagnostic`
- **Folder:** your `leading-agentic-engineering` folder
- **Frequency:** Weekly, on the day before your usual one-to-ones
- **Prompt:** the one below

The prompt tells Claude to read the agent file and do what it says.

{{prompt:em-run-weekly-diagnostic}}

Save the task.

## Run it once now

Click **Run now** on the task. When it finishes, open the new file in `diagnostics/`.

With nothing in `observations/` yet, the first diagnostic is short: who has no evidence beyond your notes, and nothing to promote. That is the baseline. From here it only has something to say when you give it something to read.

## Feed it this week

After any real conversation with someone on your team, drop a short file in `observations/`: their name or role, the date, what they said or did, a few lines. A one-to-one, a remark in standup, a question in a pull request review. Plain notes, the same register as your team notes.

The diagnostic reads them on its next run and tells you what they change. The people you marked as thin are the best place to start.

<!-- maintainer -->

## Design (EM proving run 2026-09-30)

- **Atomic — no phase markers.** one setup flow (write, schedule, run once); the last section is between-session work and costs no room time.
- **Two prompts.** `em-schedule-weekly-diagnostic` writes the agent file (warm session: runs after `em-add-backfire-gates` in the module's one session) and creates `observations/` + `diagnostics/`. `em-run-weekly-diagnostic` is the scheduled task's own prompt, cold by definition (a scheduled run is a fresh session), so it names every file it reads (`check_prompts.md` §40). Same split as `personal-agent-homework-2` / `-3` in Agents 101. The run prompt also works headless (`claude -p` from the training folder) for CLI-only managers and for the tmux runner; the body does not teach that path (golden path only, `check_student_facing.md` §5).
- **Reads `observations/` and `responses/` when present** (cross-module decision 5): M2's answers land in `responses/` and the same diagnostic picks them up with no rewrite. `responses/` is declared as opportunistic-copy on both prompts.
- **Proposes only.** Keeps the tier label an epistemic stance the manager owns (strategy § Block 1: the promotion cycle is the learning). Promotions and demotions reach `team-leadership.md` only when the manager asks Claude to apply one.
- **Agent defined in one breath** before first use (`check_student_facing.md` §2): chatting-fluency audience, first agent file of the training.
- **Weekday choice** ("the day before your usual one-to-ones") ties the diagnostic to a moment the manager will use it; no time-of-day anchor (§22).
- **Platform claims** verified 2026-09-30 against https://code.claude.com/docs/en/desktop-scheduled-tasks.md via `claude-code-guide`: Schedule → New local task, Weekly frequency with day + time picker, Run now on the task page, local tasks read and write the chosen folder. Laptop must be awake with the app running for a scheduled run; catch-up behaviour lives in Agents 101's quick reference, not here. Re-verify at cohort (`check_platform_and_boundaries.md` §4).
- **First run on an empty `observations/`** is expected to be near-empty; the body names that as the baseline (§47 failure mode + escape hatch). Trainer move if the run fails: rerun `em-run-weekly-diagnostic` in the terminal session to see the error in scrollback.
- **Observation file shape** is left loose (name or role, date, a few lines). M3's coalition check-in and M4's hand-off write observations too; a strict schema would break them.
- **Leap test (3 Monday outcomes):**
  1. Has a weekly scheduled task in the desktop app that has run at least once and written a file in `diagnostics/`.
  2. Drops a dated file in `observations/` after a real conversation with a team member.
  3. Reads a diagnostic and asks Claude to apply or reject one proposed promotion or demotion in `team-leadership.md`.
