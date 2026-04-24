# Prework: before Module 1

Land at Module 1 with Claude Code open in the repo you're going to grow, the content folder visible to Claude, one trivial bug picked, and the wizard-move framing in your head. About 30 minutes.

## 1. Pick THE repo (10 min)

One decision: which repo are you going to grow rules and memory on over the next six weeks?

- One you own or co-own
- One you'll still work in six months
- Dense enough that compounding has somewhere to land (the Hello World you cloned to try Claude Code isn't it)
- Real work ahead at two sizes. Module 1 ships a one-line fix. Module 4 onward runs test-and-learn experiments on bigger things (an epic you're about to start, a refactor that's been sitting, a feature with unknowns). The repo should have both.

Pick one. Every module of this training opens Claude Code against this repo. Worktrees fine. All compounding lands here.

## 2. Start a new Claude Code session in THAT repo (2 min)

CLI or desktop, your call. Open a new session with the repo as the working directory. Send a prompt, read a file. If Claude Code isn't working, this is the moment to fix it.

## 3. Unzip the content folder (2 min)

Unzip `agents-102-content-agentic-engineering-101.zip` to `~/Documents/ae101-content/`. Note the absolute path; the next step hands it to Claude.

## 4. Point Claude at the content folder (1 min)

In the Claude Code session you just opened, type this slash command. **Replace the placeholder with your actual absolute path before hitting enter.**

```
/add-dir /absolute/path/to/content/folder
```

Session-only for now. M1's compound step pins it permanently to `.claude/settings.local.json` so future sessions load it automatically.

## 5. Let Claude walk you through the rest (15 min)

Ask Claude to read the wizard-move framing, install the curated skills from the content folder, screen three candidate bugs, and confirm the repo is ready for Module 1.

**Prompt** *(copy → Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. Before anything else: check your working directories. You should see a content folder alongside the repo — it contains `lectures/`, `exercises/`, `content/skills/`, and `reference/`. If you don't see it, stop and tell me to run `/add-dir <path>` first. If you do see it, confirm the absolute path back to me, then do four things:

1. Read lectures/the-wizard-move.md from the content folder and tell me the framing in your own words, in under two minutes. I want it landed before Module 1 starts.

2. Install the training's curated skills as personal skills. Copy every folder under content/skills/ in the content folder to ~/.claude/skills/ (preserve the per-skill folder structure, keep SKILL.md capitalisation). Confirm each skill folder now exists at ~/.claude/skills/<name>/SKILL.md. These are personal to me, auto-discovered by Claude Code in every session, removable after training with rm -rf.

3. Ask me for three bugs I could fix in an hour. I'll tell you the symptom for each. Screen them against these criteria: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

4. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Ask one question at a time if you need to, no preamble.
```

*(end of prompt)*

## 6. Bring to M1

Connections question. We'll ask at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a frustration instead.

<!-- maintainer -->

**Meta:**
- **Runtime:** 30 min target. Steps 1–4 are crisp; step 5 is where time can expand if the student's repo is messy.
- **Delivery architecture:** student's repo is the working directory across every module. Prework adds the content folder via `/add-dir` (session-only). M1 Ex3 compound step promotes the path to `.claude/settings.local.json` under `additionalDirectories` so every subsequent session auto-loads it. Split kept clean: rules → `CLAUDE.local.md`; config → `settings.local.json`. Skills install to `~/.claude/skills/` (user-level), auto-discover in every session regardless of cwd.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude. The one exception is the `/add-dir` slash command, which is a UI primitive not a file-edit.
- **Artifacts at end of prework:** chosen repo (Claude Code open in it), content folder on disk + added to the session via `/add-dir`, one picked bug (in the scrollback), two curated skills installed personally at `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md`.
- **Install blockers:** one-line help prompt in the cohort Slack for classroom; self-study fallback TBD. Don't absorb install debugging into M1 time.
- **Delivery:** classroom cohorts get the zip link via email + Slack/Teams ahead of Day 1. Self-study students download from the site.

**Packaging:** `scripts/build-ae101-content-zip.sh` builds `agents-102-content-agentic-engineering-101.zip` from repo. Run before each cohort; host per customer.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
