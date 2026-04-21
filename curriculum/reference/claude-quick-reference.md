# Claude Quick Reference

Lookup material for the hands-on parts of the training. Curriculum content stays conceptual; when you need a specific command or "how do I do X," this is where X lives.

Scan, find what you need, copy the prompt. For deep feature documentation, each section points to the official Anthropic docs.

**Root docs:** [docs.anthropic.com](https://docs.anthropic.com) — the source of truth for Claude Code features. This reference is a shortcut; the docs are the full answer.

## Claude Code — install and open

Three surfaces. Pick whichever fits your habits — the exercises work in all of them.

- **CLI (terminal)** — recommended for self-study. The smoothest flow for the lecture server, folder switches, and pasted prompts.
- **Desktop app** — macOS or Windows. Good alternative if you prefer a GUI.
- **Web (claude.ai/code)** — works when you can't install locally, but can't reach the local lecture server at `localhost:8000`. Use desktop or CLI for self-study.
- **Account tier** — Claude Pro or Team. Your sponsor confirms the license.

**Install through your company's approved channel.** Most companies have an IT self-service catalog, a software request process, or a policy for developer tools. Check there first for Claude, Claude Code, Git, and Python — getting them through the sanctioned path avoids the compliance conversation later. If you're on a personal laptop or your company doesn't have a policy, the official docs at [docs.anthropic.com → Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) cover direct install.

## First time in a terminal? (CLI path)

Skip this section if you already use a terminal.

**Open a terminal.**
- **macOS:** Applications → Utilities → **Terminal.app**. Or press ⌘+Space, type "Terminal," press Enter.
- **Windows:** Press Win+X, pick **Windows Terminal** (or PowerShell).

**You need Git, Python 3, and Claude Code.** All three should come from your company's approved channel (self-service catalog, IT software request, or whatever your org uses for dev tools). If IT hasn't heard of one of them yet, that's worth surfacing — this training is a good reason to ask. On a personal laptop, the official project sites are the fallback.

**Confirm each is installed.** In a terminal:
- `git --version` → should print a version
- `python3 --version` → should print a version (Windows may be `python --version`)
- `claude --version` → should print a version. If "command not found," the CLI isn't on your PATH — restart the terminal or check the install options.

**Tilde (`~`) means your home folder.** `~/Documents/agents-102-bootstrap/` is `/Users/yourname/Documents/agents-102-bootstrap/` on macOS, `C:\Users\yourname\Documents\agents-102-bootstrap\` on Windows. The shell expands it automatically. You don't type `~` into Finder or Explorer — only into the terminal.

**Exit Claude Code CLI:** type `/exit` at the prompt. (Ctrl+C cancels the current prompt; two Ctrl+Cs in a row exits. `/exit` is cleaner.)

## Plan mode — look before you leap

Claude Code has **plan mode**: Claude researches and proposes a plan instead of writing files immediately. You approve the plan, then Claude runs it.

**Toggle it on — three ways, pick whichever:**
- Tell Claude *"Enable plan mode."* (Works anywhere. Recommended default.)
- Use the **mode dropdown** at the bottom of the Claude Code desktop app — pick *Plan* from the list.
- Keyboard: Shift+Tab to cycle permission modes (Default → Auto-accept → Plan → Auto).

**When the footer reads *plan mode*** and you paste a prompt, Claude returns a plan instead of writing files. When the plan is ready, Claude Code pauses and asks:

> *Claude has written up a plan and is ready to execute. Would you like to proceed?*
>
> *1. Yes, and use auto mode*
> *2. Yes, manually approve edits*
> *3. No, refine with Ultraplan on Claude Code on the web*
> *4. Tell Claude what to change*

**What each option does, and when to pick it:**

- **1. Yes, and use auto mode** — Claude executes the whole plan without asking again. Fastest. Pick this when the plan looks right and the work is low-stakes (creating memory pages, drafting an agent file, generating documentation). **This is the friendly default for most Bootstrap exercises.**
- **2. Yes, manually approve edits** — Claude pauses for each file write. You OK each one. Slower, safer. Pick this when the plan touches something you care deeply about (editing a live policy file, modifying production-adjacent work).
- **3. No, refine with Ultraplan on Claude Code on the web** — Sends the plan to a cloud-based refinement tool. Not used in Bootstrap; ignore.
- **4. Tell Claude what to change** — Opens a text box. You type specific feedback (*"merge buyer-tone and buyer-segments into one page,"* *"add a topic for competitive response"*). Claude rewrites the plan. Pick this when the plan is mostly right but something is off. Cheaper than re-running the whole prompt from scratch.

**Rule of thumb for Bootstrap:** plan looks solid → option 1. Plan is close but needs a tweak → option 4 with one sentence of feedback. Plan is fundamentally wrong → option 4 describing the change, or exit plan mode and re-paste the prompt with sharper instructions.

**Turning it off — usually no action needed.** Plan mode exits automatically after you approve a plan and Claude runs it; the footer goes back to *default* on its own. You only need to toggle off manually if you want out *before* executing a plan (e.g., you changed your mind and want to exit without running) — tell Claude *"Disable plan mode"*, pick *Default* from the mode dropdown, or cycle with Shift+Tab.

Use plan mode when a prompt is about to write many files, or touch anything you care about. Skip it for quick single-turn work.

## Working with files

Claude Code can read and write files in your project directory. Ending a prompt with "save as X" or "save in this project" writes the file.

**Save output to a file:**

```
[your task]. Save the result as filename.ext in this project.
```

**Have Claude read a file:**

```
Read the file filename.ext in this project. Summarize it in 3 lines.
```

**Have Claude edit a file:**

```
Open filename.ext. Change the heading to "New heading." Save.
```

*Official docs: Claude Code's file tools (Read / Write / Edit) and project scope.*

## Connectors — let Claude Code read your real data

Connectors give Claude Code access to your actual calendar, inbox, Slack, Notion, GitHub, Linear, Drive. No copy-paste. No screenshots when this works.

**Enable a connector (desktop app):**

1. Click the **+** button next to the prompt box, or go to **Settings → Connectors**
2. Pick the service (Gmail, Google Calendar, Slack, Linear, Notion, GitHub, etc.)
3. Sign in with your work account — it's the same OAuth "sign in with Google/Microsoft" flow you've seen a hundred times
4. Grant the specific permissions Claude asks for

Once enabled, ask Claude naturally: *"List my meetings this week."* Claude uses the connector.

**M365 / Google Workspace — the IT-admin gate.** For a work account, the OAuth consent may need pre-approval from your IT admin at the tenant level (same as any third-party app). If authorization fails, that's the signal — ask IT to allow Claude Code.

**Screenshot fallback.** If a connector isn't available or IT hasn't green-lit it yet, paste a screenshot of the calendar week view or inbox list. Write the prompt as if Claude is reading "the screenshot I just shared." Less automation, same teaching value. Use while waiting for IT.

*Official docs: [Claude Code Desktop → Connectors](https://code.claude.com/docs/en/desktop).*

## Scheduling — let Claude Code run on a clock

Claude Code has three ways to schedule work. Pick the one that matches your intent.

**Local scheduled task (GUI, desktop app — the everyday choice).** Sidebar: **Schedule → New task → New local task.** Name it, give it a prompt, pick a frequency (Daily 7:00am, Weekdays 9:00am, every 30 minutes, etc.). The task runs **on your laptop** when it fires. Inherits your connectors automatically.

**Missed runs.** If the laptop was asleep at the scheduled time, Claude Code catches up **once** for the most recently missed slot when the app next comes online (within a 7-day window — older misses are dropped). So a daily task missed for three days runs once on wake, not three times in a row.

**Time-aware prompts.** If a catch-up run firing at 11:00am for a 7:00am daily task would cause trouble, put the guardrail in the prompt itself: *"Only run if it's before 10:00am. Otherwise, report that you skipped today's run."* The scheduler will catch up; the prompt decides whether to actually do the work.

**Routines (remote, runs in Anthropic's cloud).** Same Schedule sidebar: **New task → New remote task.** The Routine runs on Anthropic's infrastructure whether your laptop is on or not — but this assumes your files live in a Git repo in the cloud (typically GitHub), because the cloud runner needs somewhere to pull the working directory from. **Not what we use in this training** — our working directory is local on your laptop, not in Git. Good to know Routines exist; out of scope for these exercises. If your org already has a Git-backed workflow for AI work, Routines is the path later.

**/loop (in-session only).** Type `/loop 5m <prompt>` and Claude runs the prompt every 5 minutes while the session is open. Closes when you close the session. Good for polling during a work block ("check the build every 5 minutes until it passes"). **Not** for morning automation.

*Official docs: [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks), [/loop](https://code.claude.com/docs/en/scheduled-tasks).*

## Skills

Skills are scoped capabilities — bundles of instructions and permissions that make Claude better at a specific task (e.g., *"check this against our security policy"*) without handing over the keys.

You'll build skills in Module 4. For now, know that they exist, they're files, and they scope what Claude can do when the skill is active.

*Official docs: Claude Code Skills — file format, install location, permissions model, and examples.*

## Subagents — when one Claude isn't enough

For tasks that need specialized agents working on different parts of a problem, Claude can launch subagents. You tell Claude: *"use three subagents — one for X, one for Y, one for Z — then synthesize."* Claude delegates to itself in parallel and returns the combined result.

You'll use this in Module 3. For now, know that Claude can delegate.

*Official docs: Claude Code Subagents — invocation patterns, parallelism, and passing context.*

## New conversation, new project — context hygiene

Starting a new project, or a new conversation inside a project, resets the context. Sometimes you want that (fresh take). Sometimes you don't (losing the last 30 minutes of thinking).

Rule of thumb: if the current conversation is producing confused output, start a new one and paste the relevant files back in. Context that's too long degrades — Claude starts forgetting what matters.

## Troubleshooting

**Claude won't write files to my project.** Is Claude Code open on a real folder (not a default/blank chat)? File-write access is project-scoped. Start a new project at a specific path.

**The connector isn't in my Claude.** Your IT admin hasn't enabled it at the tenant level. Use the screenshot fallback. Ask IT to enable it — this is a useful signal for the whole training, not just you.

**Claude is inventing things about my data.** Your context is thin. Give Claude more of the source (paste the whole file, not a summary). Module 5 is where you learn to catch this.

**I want to start over on this exercise.** New project. The current project stays where it is; the new one starts clean.

*Troubleshooting deeper than this: [docs.anthropic.com support section](https://docs.anthropic.com) + Anthropic's status page for platform issues.*

---

**This document grows.** If you hit something during the training that belongs here and isn't, flag it — the reference gets updated. For anything feature-specific, the [official Anthropic docs](https://docs.anthropic.com) are the source of truth.
