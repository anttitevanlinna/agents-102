# Claude Quick Reference

Lookup material for the hands-on parts of the training. Curriculum content stays conceptual; when you need a specific command or "how do I do X," this is where X lives.

Scan, find what you need, copy the prompt. For deep feature documentation, each section points to the official Anthropic docs.

**Root docs:** [docs.anthropic.com](https://docs.anthropic.com) — the source of truth for Claude Code features. This reference is a shortcut; the docs are the full answer.

## Pick your surface — three modes

The exercises run on any of these three. Same engine underneath, three ways to reach it. Pick whichever fits your habits.

- **Claude Code CLI (terminal)** — recommended if you live in the terminal. Smoothest flow for the lecture server, folder switches, and pasted prompts. Skills auto-load from `~/.claude/skills/<name>/SKILL.md`.
- **Claude Code Desktop app** — macOS or Windows GUI. Good alternative if you prefer a window over a terminal. Personal skills use the same `~/.claude/skills/<name>/SKILL.md` shape.
- **Claude Cowork** — same Claude Desktop app, *Cowork* tab. Connect your training-directory folder once; same prompts, same artifacts. Best if you don't want to think about CLI plumbing. Personal skills are created through *Customize* → *Skills* → *New* → *Create with Claude*.

**Account tier:** Claude Pro, Max, Team, or Enterprise. Your sponsor confirms the license. On Team and Enterprise, your organization owner can disable Cowork; if the Cowork tab is missing, use Claude Code Desktop or CLI with the same training directory.

**What's the same across all three:** the agent engine, `CLAUDE.md` files (loaded the same way from your training folder), parallel subagents (Cowork's UI calls them *agents*), the prompts in this curriculum.

**What's different:**
- **Plan mode** is a Claude Code feature (CLI and Desktop) — Cowork doesn't have a named plan mode. The exercises that use plan mode in Code phrase the same discipline differently in Cowork: *"Before you do anything, write a plan."* Same move, different invocation.
- **Skill install affordance** differs by mode: CLI/Desktop load standalone skills from `~/.claude/skills/<name>/SKILL.md`; Cowork creates personal skills through the Customize UI. Module 4 uses one `security-audit` skill across runtimes.
- **Vocabulary** — Code says *subagent*, Cowork's UI says *agent*. The site swaps the word to match what you see on screen.

**Fallback if Cowork is unavailable.** Use Claude Code Desktop or Claude Code CLI. The Bootstrap prompts and artifacts are written to work across all three surfaces. Do not use an API-key-only route as the default backup for this training: it would skip the local working folder, personal skills, connector UI, and participant-visible agent workflow the curriculum teaches.

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

<!-- maintainer -->

## Maintainer audit — Cowork architecture (verified 2026-04-25)

End-to-end practitioner test. Cut for students by the renderer; here for trainer / future-author reference.

### What was verified

| Claim | Evidence |
|---|---|
| Cowork uses the same agent engine as Claude Code | Anthropic docs: *"Claude Cowork uses the same agentic architecture that powers Claude Code"* ([cowork product page](https://claude.com/product/cowork), [getting started](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)) |
| `CLAUDE.md` loads from connected folder | Probe Test 1 — planted secret phrase returned verbatim |
| Parallel subagents dispatch | Probe Test 5 — three `subagents/agent-*.jsonl` files in transcript, `agentType: general-purpose` |
| Cowork session transcripts ARE Claude Code `.jsonl` format | On-disk inspection of `~/Library/Application Support/Claude/local-agent-mode-sessions/<workspace>/<session>/local_<id>/.claude/projects/<project>/<sessionId>.jsonl` — same `parentUuid`/`type`/`message` shape, same `subagents/` subfolder |
| Folder-local `.claude/skills/` NOT auto-registered in Cowork | Probe Test 3 — Cowork's `<available_skills>` showed only centralised namespaces; folder-local `probe-skill` did not appear |
| Personal-skill creation path | Antti correction 2026-04-29 — Cowork personal skills are created from Claude Desktop *Customize* → *Skills* → *New* → *Create with Claude* |
| Skill install needs new session to take effect | Verified pattern: install/save → start new session → invoke. Skill registry reads at boot. |
| Cowork availability / licensing | Official docs checked 2026-04-30: Cowork is available on paid plans (Pro, Max, Team, Enterprise) in Claude Desktop for macOS/Windows; Team/Enterprise owners can disable Cowork in Organization settings > Capabilities ([getting started](https://support.claude.com/en/articles/13345190-getting-started-with-cowork), [Team/Enterprise considerations](https://support.claude.com/en/articles/13455879-use-claude-cowork-on-team-and-enterprise-plans), [product page](https://claude.com/product/cowork)) |

### Known gaps

- **No plan mode in Cowork.** Code's plan mode (Shift+P / Shift+Tab cycle / *"Enable plan mode"*) does not exist. Discipline (*think before doing*) is universal; the Cowork-mode prose teaches it through prompt phrasing rather than naming a feature.
- **CLI/Desktop skill path.** Write standalone skills under `~/.claude/skills/<name>/SKILL.md` and let auto-discovery do the rest in a fresh session.
- **Cowork personal-skill path.** Use Claude Desktop *Customize* → *Skills* → *New* → *Create with Claude*, then save and open a new Cowork session.
- **M4 slash form.** Module 4 uses one personal skill: `/security-audit`. The two lenses live inside that skill and are selected by the audit prompt.
- **Folder-local `.claude/agents/` NOT auto-registered in Cowork either.** Subagents dispatch as the built-in `general-purpose` context.
- **Cowork unavailable / disabled fallback.** If a participant cannot use Cowork because their tenant disables it, desktop readiness fails, or the Cowork tab is missing, switch them to Claude Code Desktop or CLI against the same training directory. Avoid API-key-only fallback for Bootstrap delivery unless redesigning the exercise: it does not preserve the participant-facing runtime, connector, personal-skill, and local-folder mechanics.

### Probes — all clear (2026-04-25, Antti)

- **Multi-session on the same connected folder — PASS.** Cowork runs multiple sessions concurrently against one connected folder. M3's four-session pattern is unblocked.
- **Long-running file-write across rounds — PASS.** Three sequential rounds with 30-second waits + 90-second walk-away — all three files landed; round-2 referenced round-1; round-3 synthesised both. M6's walk-away orchestrator is unblocked.
- **Footnote:** a trailing 45-second sleep at the end of the last walk-away tripped a Cowork workspace timeout — the files were already on disk by then. Implication: **M6's orchestrator should be doing work, not sleeping**, when scheduled to walk away. Real work (subagent dispatch, file writes, judging) doesn't trip the timeout; explicit sleeps do. The M6 design naturally has Claude working through rounds, so this is not a blocker — just don't write *"sleep for N seconds"* into the orchestrator prompt.

### Implications for Bootstrap content

**Architecture rule (Antti, 2026-04-29):** No pre-shipped security skill. Personal-skill authoring is taught **once, in M4**. Other modules carry context as inline prompts or `.md` references the student reads. The student authors the reusable security skill; we don't hand them one.

**Same content, three install paths — but install matters in only one place.**
- M2's `CLAUDE.md` move works in all three modes.
- M2's plan-mode language wraps in `.rt-code` (CLI + Desktop); `.rt-cowork` teaches the same discipline through prompt phrasing.
- M3 / M5 / M6 parallel subagent dispatch verified; *agent* / *subagent* terminology fork via switcher.
- **M4 is the canonical lens-authoring teach.** Student authors one `security-audit` personal skill with two lenses (policy + agent-security), installs it, invokes it. Per-runtime affordance: Cowork personal-skill creation (`Customize → Skills → New → Create with Claude`), Desktop/CLI standalone skill under `~/.claude/skills/security-audit/`. Slash form: `/security-audit`.
- M5 / M6 / M7 / M8 do **not** introduce new reusable skills. Context lives in inline prompts and `.md` files the student reads.
- AE101 is unaffected. AE101 uses CLI + folder skills only.

### Why this section is in the Bootstrap reference, not AE101's

AE101 and Bootstrap are separate trainings with separate audiences and separate reference docs. AE101 students don't use Cowork and don't need its details. Cowork architecture lives here, in the Bootstrap reference, full stop.

### Capability-check trust note

A capability-check agent told us early in the audit that Cowork was a separate codebase from Claude Code. The agent was wrong; the official docs say same architecture. Practitioner observation + direct WebFetch sided against the agent. Pattern matches platform compendium § 4: *"Trust-but-verify the capability-check agent too — WebFetch the URL yourself when the assertion is load-bearing; agents can hallucinate credible-sounding official answers."*

**Quality:** compendium-audited 2026-05-03 (writing@bb9c1d5)
- judges @bb9c1d5: writing PASS, story N/A (no-mood-or-sim-surface), technical grandfathered, behavior N/A (no-student-prompt-blocks)
