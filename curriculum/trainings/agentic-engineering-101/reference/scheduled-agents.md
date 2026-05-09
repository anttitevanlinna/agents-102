# Scheduled agents

Lookup page for the three ways Claude Code runs on a clock. Pick the one that matches the shape of your work. Composes with any skill you have installed.

**Root docs:** [docs.anthropic.com](https://docs.anthropic.com) for the source of truth. This page is a shortcut.

## The three primitives

### Desktop local task — the everyday choice

A prompt runs on your laptop on a cadence (daily 7:00am, weekdays 9:00am, every 30 minutes).

**How to set one up.** Open the **Schedule** sidebar, pick **New task → New local task**, name it, paste the prompt, pick a frequency. GUI-only today; no slash command.

**Missed runs catch up on wake.** If the laptop slept through 7:00am, the task fires once when the app next comes online (7-day window — older misses drop). Put a time guard in the prompt itself if a late-morning catch-up would cause trouble: *"Only run if it's before 10:00am. Otherwise report that you skipped today's run."*

**Inherits your connectors automatically.** No re-auth needed.

### `/loop` — in-session recurring

Type `/loop <interval> <prompt>` and the prompt fires every interval while the session is open. Closes when the session closes. No catch-up on wake (the session has to be live).

Omit the interval (`/loop <prompt>`) for self-paced mode: Claude picks the cadence based on activity.

Good for polling and iteration during active work. *"Check the build every 5 minutes until it passes."* *"Re-run the verifier every 2 minutes on each new commit."* *"Re-read the draft every 3 minutes and tighten one section."* Ralph-style re-feed sits here.

### `/schedule` / Routines — remote, Git-dependent

Type `/schedule daily PR review at 9am` or use the sidebar: **New task → New remote task.** The prompt runs on Anthropic's cloud whether your laptop is on or off. The cloud runner needs somewhere to pull from, which typically means a connected GitHub repo cloned fresh on each run.

**Not the default for AE101.** Your real repo is local in these exercises; Routines assumes the working directory lives in a cloud Git repo. Good to know the primitive exists; reach for it when your team already has a Git-backed workflow for agent work. No catch-up on wake (runs in the cloud; the cloud doesn't sleep).

## When each fits

| Primitive | Good for | Not for |
|---|---|---|
| Desktop local task | Standing verifier runs, nightly codebase sweeps, rule-drift monitoring, scheduled research OODA loops. Catch-up on wake means weekend misses don't drop on Monday | Anything that needs to react in the same session you're actively working in |
| `/loop` | Iterative polish on active work, continuous check-and-fix, Ralph-style re-feed patterns | Morning automation when you're not at the laptop |
| `/schedule` (Routines) | Cloud-Git workflows, multi-machine scenarios where any laptop might be off | Local-repo training work (AE101 default) |

## How it composes with an authored skill

The scheduled agent invokes the skill. The skill is the thing that catches the gap, judges the output, or packages the move. The scheduler just tells it when.

**Nightly verifier run.** Desktop local task at 2:00am → prompt reads *"Invoke the `commit-verifier` skill on the last 24h of commits. Report anything the skill flags."* The skill is the check; the schedule is the cadence.

**Continuous polish loop.** `/loop 3m` while editing → prompt reads *"Invoke the `tighten-draft` skill on the current file. Propose changes."* The skill is the move; the loop is the rhythm.

**Rule-drift monitor.** Desktop local task weekly → prompt reads *"Invoke the `rule-drift` skill on the project root. Flag rules in `CLAUDE.md` that the last week of commits contradicted."* Your second authored skill from M6 is a strong candidate to wire into a schedule like this one.

*Official docs: [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks), [/loop](https://code.claude.com/docs/en/scheduled-tasks), [Routines](https://code.claude.com/docs/en/routines).*

<!-- maintainer -->

**Capability verification (2026-04-24, `claude-code-guide` agent):**
- `/schedule` creates cloud-based Routines; GUI equivalent is Schedule sidebar → New task → New remote task. Git-connected repo required.
- Desktop local tasks are GUI-only (Schedule sidebar → New task → New local task). Catch-up on wake: Desktop fires one catch-up run for the most recently missed time within a 7-day window.
- `/loop` supports fixed interval (`/loop 5m <prompt>`) and self-paced mode (omit interval); no catch-up (session-bound).
- Skills auto-discover at `~/.claude/skills/<name>/SKILL.md` within the same session; no restart, no registration.

**Quality:** compendium-audited 2026-05-03 (writing@bb9c1d5)
- judges @bb9c1d5: writing PASS, story N/A (no-mood-or-sim-surface), technical grandfathered, behavior N/A (no-student-prompt-blocks)
