# See your team

## Big Idea

Your knowledge of your people is the input nobody else has. Put it where an agent can work with it.

## What You'll Learn

After this module, you will be able to:

- **Write** what you know about each person on your team, before any agent reads a word of it
- **Install** a leadership memory with three blocks: Team Knowledge, Decision Journal, Quality Gate
- **Place** each person on ADKAR and your team on the adoption curve, with the evidence behind each call
- **Schedule** a weekly diagnostic agent that keeps Team Knowledge current while you lead

## How we work in this room

- Bring your real team. Every exercise runs on the people you lead, not on a case study.
- Agents do the legwork; the judgement stays yours. You paste prompts, Claude reads and writes the files, you decide what is true about your people.
- What you write about your team stays in your own folder. Nothing here is shared unless you choose to share it.
- Talk to the managers next to you. They are leading the same change in the same company.

## Freedom to choose

- Change a prompt when your team needs something it does not ask for. Your judgement about your people outranks the script.
- People finish at different times. Cut a step when you need to and keep moving.
- The frameworks are lenses. Use the one that shows you something about your team and set the rest aside.
- Skip reading every line Claude writes. Read the parts about the people you are least sure of.

## Start here

Make a folder called `leading-agentic-engineering` in your Documents folder. Every module of this training starts a fresh Claude Code session there, and everything you build lives in it.

Who on your team would you trust to teach the others how to work with agents? What is that call based on?

## Write down what only you know

[Exercise: Write your team notes](exercises/write-your-team-notes.md)

[Lecture: Theory times people-knowledge](lectures/theory-times-people-knowledge.md)

## Install the memory

[Exercise: Install your leadership memory](exercises/install-your-leadership-memory.md)

[Lecture: Three moves that backfire](lectures/three-moves-that-backfire.md)

## Keep it learning

[Exercise: Schedule the weekly diagnostic](exercises/schedule-the-weekly-diagnostic.md)

## Did you make progress?

Every module closes on the same two questions: did you make progress, and did you lay ground for progress later? The bar is your own team and your own starting point, not anyone else's.

Ask Claude to put the two questions to you against what this session produced.

{{prompt:em-close-see-your-team}}

Answer in your own words. If your answer is "not yet", that is an answer, and the journal keeps it.

## Key Concepts

- Your notes are the input; the agent's placements are only as good as the lines they quote.
- Every entry in Team Knowledge is an observation, a hypothesis or a rule, and says which.
- The Quality Gate asks whether a move made progress before it asks whether the move looked busy.
- A memory an agent re-reads each week learns; a memory nobody opens goes stale.

## Bring to Module 2

**One observation per person you talked to, in `observations/`, and a diagnostic that has run at least once more.** Module 2 opens by asking what the diagnostic told you that you did not already know. Without observations, it has nothing new to tell you.

## Next

You can see your team on one page, with the evidence behind each call and the gaps marked. Next you ask them. The questions come from what the memory says it does not know, and the people who answer with the most agency start to show you who wants to move.

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-30 (writing@518a2710 story@518a2710 technical@518a2710 behavior@518a2710 pedagogy@518a2710 strategy@518a2710 slides@518a2710)
- judges @518a2710: writing PASS (verify-refuted), story PASS (verify-refuted), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

## Design (EM proving run 2026-09-30)

- **Mood:** diagnostic directness. Plain placements, thin spots marked, no reassurance.
- **Write your team notes:** the manager writes `team-notes.md` by hand, a few plain lines per person: what they do, how they use AI now, what they said about it, what the last change left them believing. The 1–10 confidence baseline ("your confidence in leading your organisation to an AI-first and agentic world") is line one. No agent in this exercise: this is the input nobody else has.
- **Theory times people-knowledge (lecture):** we bring ADKAR, the adoption curve, Kotter as lenses; you bring your people; agents multiply both and replace neither.
- **Install your leadership memory:** prompt `em-install-leadership-memory` opens the module's session and builds `team-leadership.md` with the three blocks. Team Knowledge places each person on ADKAR and the team on the adoption curve (chatting → custom assistants → agentic workflows → compounding engineering), each entry tagged observation / hypothesis / rule and quoting its line from the notes; thin notes are named, not guessed. The Decision Journal opens with one entry: why these placements, with the confidence baseline copied from `team-notes.md` line one (`em-close-declare-your-intent` reads it there). The Quality Gate opens with the calibration question as its top gate.
- **Three moves that backfire (lecture):** competence before platform, pull not mandate, hybrid from day one. Each becomes a Quality Gate check the memory runs before any move is logged, written by `em-add-backfire-gates`, which the student runs on their own memory (`check_lectures.md` §6 carve-out).
- **Schedule the weekly diagnostic:** `em-schedule-weekly-diagnostic` writes `agents/weekly-diagnostic.md` (reads `observations/`, `responses/` when present, and Team Knowledge; proposes tier promotions and demotions; writes `diagnostics/<date>.md`; never edits the memory) and creates `observations/` + `diagnostics/`. `em-run-weekly-diagnostic` is the scheduled task's prompt and the headless `claude -p` path. Scheduled in the desktop app's Schedule sidebar and run once in the room.
- **Did you make progress?:** `em-close-see-your-team` puts the calibration question against this session's evidence (placements, thin spots, first diagnostic) and writes the answer into the Decision Journal. The calibration question is the strategy's closing move for every module (strategy § The calibration question), so the body states it once here, in M1, and later modules can use it bare.
- **Training folder:** `~/Documents/leading-agentic-engineering/`, fresh Claude Code session per module (cross-module decision 2026-09-30). Start here says so once; the install exercise carries the Session widget.
- **How we work / Freedom to choose:** M1-only sections (`module-shape.md`). Adapted from Agents 101's pair to this audience: the room-contract lines that matter for managers are *real team, not a case*, *your judgement over the script*, and *privacy of what you write about people*. The privacy line is load-bearing for belief (strategy § Why it can't be pirated: the input is theirs) and for the M3 peer export, which only ever carries roles or pseudonyms.
- **Bring to Module 2:** observations in `observations/` and at least one more diagnostic run. M2's Start here asks what the diagnostic told them.
- **Artifacts:** `team-notes.md`, `team-leadership.md`, `agents/weekly-diagnostic.md`, `observations/`, `diagnostics/`.

## Meta

- **Transitions:** opening 8 @start "Opening: how we work, freedom to choose, the folder, the trust question" · close 7 @end "Did you make progress?"
- **Where these numbers come from:** the opening carries two room-contract slides, the folder step and one open question to the room; the close is one prompt and a written answer. Every other beat bills from its own leaf.
- **Primary Bloom's level:** Apply → Analyze.
- **Materials (trainer):** none shipped; the student starts from an empty folder. A demo `team-notes.md` with fictional roles for the trainer's own screen, never a student's.
