# Prework — do this before Module 1

About 30 minutes. Land with the content folder unzipped, Claude Code open on the repo you've picked, and a bug ready to work on.

## 1. Unzip the content folder (5 min)

Unzip `agents-102-content-agentic-engineering-101.zip` somewhere you'll find it — `~/agents-102/`, alongside your repo, your call. Remember the path. Claude will read from this folder during the training.

## 2. Pick THE repo (10 min)

One decision: which repo are you going to grow a `CLAUDE.md` on over the next six weeks?

- One you own or co-own
- One you'll still work in six months
- Dense enough that compounding has somewhere to land (the Hello World you cloned to try Claude Code isn't it)

Pick one. If you later realize it's wrong — you change teams, the project ends, you picked the quick one — replay M1 through the current module on the new repo in an evening. Not a blood oath.

Open Claude Code in that repo. If Claude Code isn't installed yet, install the desktop app (no terminal required) and sign in.

## 3. Let Claude walk you through the rest (15 min)

**Prompt** *(copy → Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. The curriculum content is unzipped at [path from step 1]. Three things:

1. Read lectures/the-wizard-move.md and tell me the framing in your own words, in under two minutes. I want it landed before Module 1 starts.

2. Help me find one trivial bug in this repo. Criteria: under 50 lines changed, visible (wrong error message, date off by a day, button that misroutes), mine or co-owned, shippable in an hour. Surface three candidates from recent issues, PR comments tagged "fix later," or patterns you notice reading the code. I'll pick one.

3. Once I've picked, confirm the repo is ready for Module 1 — tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Ask one question at a time if you need to, no preamble.
```

*(end of prompt)*

Claude does the framing read, surfaces candidate bugs, and checks the repo. You pick one. You're prepped.

## 4. What to bring to M1

Connections question — we'll ask at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big.

<!-- maintainer -->

**Meta:**
- **Runtime:** 30 min target. Steps 1–2 are crisp; step 3 is where time can expand if the student's repo is messy.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude.
- **Artifacts at end of prework:** student's mental list — content folder path, chosen repo (Claude Code open in it), one picked bug (in the scrollback). No files created.
- **Install blockers:** a one-line help prompt in the cohort Slack; don't absorb install debugging into M1 time.

**TODO (2026-04-21 session close):**
- **Content folder zip (`agents-102-content-agentic-engineering-101.zip`) does not yet exist.** Prework step 1 depends on it. Before first cohort: build a one-time packaging script that zips `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/prework.md`, and `curriculum/reference/` into the expected archive. Verify unzip produces the paths referenced by step 3's prompt (`lectures/the-wizard-move.md` resolvable from the content folder root).
