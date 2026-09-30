# Exercise: Schedule the coalition check-in

**Time:** 20 minutes.

**What you do:**

Your coalition shortlist names the people who answered with agency. Choose who is coming with you on the two crux, and give them an agent that asks, every week, what they need.

## Name your coalition

Name the people from the coalition list who are coming with you, and have Claude write the weekly check-in agent.

{{prompt:em-schedule-coalition-checkin}}

Name the people who engaged, not the most senior. One person is enough to start.

The agent drafts questions about what each person needs next: time, access, someone to learn from, permission. It never asks what they did. A coalition member who gets asked for status stops being a companion and becomes a report.

## Schedule it and run it once

In the desktop app, open the **Schedule** sidebar. Click **New task → New local task**. Name it `Coalition check-in`, set it to weekly, and paste this prompt, which follows the instructions in the agent file.

{{prompt:em-coalition-checkin-task}}

Click **Run now** once. The first drafts land in `diagnostics/`. Pick one and send it to the person it is for, in your own words and your usual channel.

<!-- maintainer -->

## Design (EM proving run 2026-09-30)

- **Atomic — no phase markers.** one conversation plus the Schedule-sidebar paste; the run-once is the check that it worked.
- **Role in M3:** the swarm addition for M3 (strategy: from M3 on, the manager can close the laptop and find the agents still working).
- **Companions, not instruments:** the check-in asks what they need, never what they did (strategy § Coalition as companions). The forcing function lives in the agent file the prompt writes (pedagogy §16); body states the stance once.
- **Prompts:** `em-schedule-coalition-checkin` asks for names in chat, records the coalition in Team Knowledge (each member tied to a crux, quoting their answer), writes `agents/coalition-check-in.md` (reads coalition + `crux` hypotheses + newest `observations/`, writes `diagnostics/coalition-<date>.md`, never sends, never edits `team-leadership.md`). `em-coalition-checkin-task` = Schedule-sidebar prompt; headless-safe (no AskUserQuestion, missing input noted at the top of the drafts file).
- **Scheduling claim:** Schedule sidebar → New local task, as in `exercises/personal-agent-homework.md` Phase 4 (desktop app); same flow as M1's weekly diagnostic. Weekly.
- **Output location:** `diagnostics/`, so the M1 weekly diagnostic sees the drafts without a new folder. Replies go in `observations/` as usual.
- **Consumed by:** M4 "Put it in someone's hands" (coalition member who gets creation v1), `em-close-find-the-two-crux`.
- **Leap test (§45), by next working day:**
  1. Has `agents/coalition-check-in.md` scheduled weekly and one run's drafts in `diagnostics/`.
  2. Sends one drafted question to a named coalition member.
  3. Has the coalition named in Team Knowledge, each member tied to a crux.

**View summary:** You name the people coming with you on your two crux and schedule a weekly agent that drafts one question per person about what they need next, never what they did.
