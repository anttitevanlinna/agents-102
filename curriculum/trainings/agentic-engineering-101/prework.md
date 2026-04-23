# Prework: before Module 1

Land at Module 1 with the content folder on disk, Claude Code open on a repo that matters, one trivial bug picked, and the wizard-move framing in your head. About 30 minutes.

## 1. Unzip the content folder (2 min)

Unzip `agents-102-content-agentic-engineering-101.zip` somewhere you'll find it. `~/agents-102/`, alongside your repo, your call. Claude will read from this folder during the training.

## 2. Make sure Claude Code is working (2 min)

CLI or desktop, your call. Signed in, sends a prompt, reads a file. If it's not, this is the moment to fix it.

## 3. Pick THE repo (10 min)

One decision: which repo are you going to grow rules + memory on over the next six weeks?

- One you own or co-own
- One you'll still work in six months
- Dense enough that compounding has somewhere to land (the Hello World you cloned to try Claude Code isn't it)
- Real work ahead at two sizes. Module 1 ships a one-line fix. Module 4 onward runs test-and-learn experiments on bigger things — an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Start a new Claude Code session in that repo.

## 4. Let Claude walk you through the rest (15 min)

Ask Claude to read the wizard-move framing, screen three candidate bugs, and confirm the repo is ready for Module 1.

**Prompt** *(copy → Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. The curriculum content is unzipped somewhere on my machine. Ask me for the path, then do three things:

1. Read lectures/the-wizard-move.md and tell me the framing in your own words, in under two minutes. I want it landed before Module 1 starts.

2. Ask me for three bugs I could fix in an hour. I'll tell you the symptom for each. Screen them against these criteria: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

3. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Ask one question at a time if you need to, no preamble.
```

*(end of prompt)*

## 5. Bring to M1

Connections question. We'll ask at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a frustration instead.

<!-- maintainer -->

**Meta:**
- **Runtime:** 30 min target. Steps 1–2 are crisp; step 3 is where time can expand if the student's repo is messy.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude.
- **Artifacts at end of prework:** student's mental list. Content folder path, chosen repo (Claude Code open in it), one picked bug (in the scrollback). No files created.
- **Install blockers:** one-line help prompt in the cohort Slack for classroom; self-study fallback TBD. Don't absorb install debugging into M1 time.
- **Delivery:** classroom cohorts get the zip link via email + Slack/Teams ahead of Day 1. Self-study students download from the site.

**TODO:**
- **Build the content folder zip.** Before first cohort: packaging script that zips `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/prework.md`, and `curriculum/reference/` into `agents-102-content-agentic-engineering-101.zip`. Verify unzip produces the paths referenced by step 3's prompt (`lectures/the-wizard-move.md`, `reference/claude-code-for-engineers.md` resolvable from the content folder root).
