# Scheduled agents

Lookup page for the three ways Claude Code runs on a clock. Pick the one that matches the shape of your work. Composes with any skill you have installed.

**Root docs:** [docs.anthropic.com](https://docs.anthropic.com) for the source of truth. This page is a shortcut.

## The three primitives

### `/schedule` — local scheduled task

The everyday choice. A prompt runs on your laptop on a cadence (daily 7:00am, weekdays 9:00am, every 30 minutes).

**How to set one up.** Open the **Schedule** sidebar, pick **New task → New local task**, name it, paste the prompt, pick a frequency.

**Missed runs catch up on wake.** If the laptop slept through 7:00am, the task fires once when the app next comes online (7-day window — older misses drop). Put a time guard in the prompt itself if a late-morning catch-up would cause trouble: *"Only run if it's before 10:00am. Otherwise report that you skipped today's run."*

**Inherits your connectors automatically.** No re-auth needed.

### `/loop` — in-session recurring

Type `/loop <interval> <prompt>` and the prompt fires every interval while the session is open. Closes when the session closes.

Good for polling and iteration during active work. *"Check the build every 5 minutes until it passes."* *"Re-run the verifier every 2 minutes on each new commit."* *"Re-read the draft every 3 minutes and tighten one section."* Ralph-style re-feed sits here.

### Routines — remote, Git-dependent

Same Schedule sidebar: **New task → New remote task.** Runs on Anthropic's cloud whether your laptop is on or off. The cloud runner needs somewhere to pull from, which typically means a cloud Git repo.

**Not the default for AE101.** Your real repo is local in these exercises; Routines assumes the working directory lives in the cloud. Good to know the primitive exists; reach for it when your team already has a Git-backed workflow for agent work.

## When each fits

| Primitive | Good for | Not for |
|---|---|---|
| `/schedule` | Standing verifier runs, nightly codebase sweeps, rule-drift monitoring, scheduled research OODA loops | Anything that needs to react in the same session you're actively working in |
| `/loop` | Iterative polish on active work, continuous check-and-fix, Ralph-style re-feed patterns | Morning automation when you're not at the laptop |
| Routines | Cloud-Git workflows, multi-machine scenarios where any laptop might be off | Local-repo training work (AE101 default) |

## How it composes with an authored skill

The scheduled agent invokes the skill. The skill is the thing that catches the gap, judges the output, or packages the move. The scheduler just tells it when.

**Nightly verifier run.** `/schedule` at 2:00am → prompt reads *"Invoke the `commit-verifier` skill on the last 24h of commits. Report anything the skill flags."* The skill is the check; the schedule is the cadence.

**Continuous polish loop.** `/loop 3m` while editing → prompt reads *"Invoke the `tighten-draft` skill on the current file. Propose changes."* The skill is the move; the loop is the rhythm.

**Rule-drift monitor.** `/schedule` weekly → prompt reads *"Invoke the `rule-drift` skill on the project root. Flag rules in `CLAUDE.md` that the last week of commits contradicted."* Your second authored skill from M6 is a strong candidate to wire into a schedule like this one.

*Official docs: [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks), [/loop](https://code.claude.com/docs/en/scheduled-tasks).*

<!-- maintainer -->

**TODO (pre-first-cohort):**
- Capability verification: confirm `/schedule` + `/loop` exact syntax and current-as-of-date behaviour via the `claude-code-guide` agent before first cohort ships. Verify the 7-day catch-up window and "fires once on wake" claim haven't changed since `claude-quick-reference.md § Scheduling` was last verified. Trust-but-verify — WebFetch the official docs URL directly since both claims are load-bearing for M6's closing-lecture scheduled-agents callout.
- Freshness: this page is platform-fact-heavy. Re-verify on the same cadence as `reference/claude-quick-reference.md`.
- Cross-link: once M6's closing lecture ships, confirm the scheduled-agents callout links here with the target's title (*"Scheduled agents"*) not the filename.
