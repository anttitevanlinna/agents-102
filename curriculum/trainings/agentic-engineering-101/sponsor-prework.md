# Agentic Engineering 101 — sponsor prework

**Audience:** the sponsor CTO (or equivalent buyer) who signed the cohort for their team.
**Purpose:** the one question the training needs answered *before* Day 1 — *where does durable engineering knowledge live in this company so an agent can read it next time?*
**Runtime:** 15–20 minutes, once. Five answers, one reason each.
**Fate of the answers:** populated into `content/pre-engagement-contract.md` in the cohort's content bundle. The Agentic Nerd reads it at the right blocker in each module and substitutes your answer into the student's workflow. No student asks *"where should this go?"* — your answer is already in the prompt.

This is the asset we send to the sponsor after contract signature, weeks before Day 1. It's a pre-engagement deliverable, not a training artifact.

---

## Why this question, and why you

Every module produces a durable artifact — a decision record, a rules file, a memory page, a shared team kit contribution. Each of those needs a home the agent can read next time. Without a stated home, the trainer has to adjudicate "where does this go" mid-Module-1, and the company ships the cohort with six engineers each making a different call. That's not a convention; that's drift.

You're the right person to answer because:

- **You have the authority** to say *"in this company, engineering knowledge lives here"* in a way the trainer doesn't.
- **You've already formed a view** — even if it's *"we don't have a convention and I've been meaning to pick one."* That's a legitimate answer: *"pick one now, use it for this cohort, revisit in Q3."*
- **Your answer is overridable, not final.** Your engineers are often right about their own repo. If one proposes a better home with a reason, we go there — and we feed the reasoning back to you at close. Your answer is the default, not a decree.
- **Opting out isn't available** — the compounding loop requires a durable home. A cohort where nobody picks one produces six engineers with disposable memory. Every week. For six weeks.

Half the CTOs who fill this worksheet discover their company doesn't have an answer to one of these questions. That discovery is the most valuable thing the training does, and it happens before Day 1.

---

## The five answers

For each, one home, one reason. Under three sentences each.

### 1. Decision records — where should an engineer log a trade-off they made during a fix?

*Shows up:* Module 1 onward. Every module after M1 produces at least one.

*Common shapes:* `docs/adr/NNNN-slug.md` inside the same repo. A separate decisions repo. Linear tickets with a "Decision" label plus a linkback file in the repo. Team Notion page indexed by date.

**Your answer:**

```
Home: 
Reason: 
```

---

### 2. Rules for the next session — where does the agent read "here's how we work in this repo" before it starts?

*Shows up:* Module 1 Debrief onward. The file the agent reads *first* in any session on this repo.

*Common shapes:* root `CLAUDE.md`. `.claude/CLAUDE.md`. `AGENTS.md` (used by Codex and others; language-agnostic choice if you're not Claude-Code-only). A mix (root pointer + per-subdir `.claude/CLAUDE.md`).

**Your answer:**

```
Home: 
Reason: 
```

---

### 3. Memory / knowledge architecture — where does the agent's learned context about this codebase and this team live?

*Shows up:* Module 2 onward. Grows across the arc. This is the thing that compounds visibly over weeks.

*Common shapes:* `.claude/memory/` in the repo with a three-block structure (knowledge / decisions / quality gates). External wiki (Confluence / Notion) with a pointer file in the repo. Shared team-memory repo that every engineer's Claude references.

**Your answer:**

```
Home: 
Reason: 
```

---

### 4. Team kit — where do shared judges, gate specs, and constraints live so every engineer's agent reads the same ones?

*Shows up:* Module 4 onward. This is the team's collective agentic infrastructure — the thing that makes one engineer's eval help another engineer's PR.

*Common shapes:* a shared plugin repo (Klaassen's pattern — every engineer's Claude reads from it). Monorepo `.claude/` directory. Private GitHub org-level repo cloned into each engineer's setup.

**Your answer:**

```
Home: 
Reason: 
```

---

### 5. Ticket tracker — which system tracks bugs, epics, and tasks for this team?

*Shows up:* Module 1. The first loop closes by closing a real ticket through an MCP connection. We need to know the target.

*Common shapes:* Jira. Linear. GitHub Issues. Shortcut. Azure DevOps. If the team uses more than one, name the primary one for this cohort.

**Your answer:**

```
System: 
Reason: 
```

---

## If you don't have an answer for one (or more)

That's the most common case. Pick the one you'd trial for this cohort, note that it's provisional, and tell us you want to see what the engineers push back on. We collect the overrides at close; you get a memo with *"your six engineers agreed with the default on decisions, disagreed on memory (three proposed external wiki, three proposed in-repo), and four of six proposed a team-kit repo structure."* That's a Q3 planning artifact.

---

## What happens next

1. You send this back.
2. We populate `content/pre-engagement-contract.md` in the cohort's content bundle.
3. Every module's Agentic Nerd reads the contract and surfaces your answer at the right moment. Your engineers see your default, not a placeholder.
4. Overrides (where an engineer proposed a better home) are collected by the Nerd and handed back to you in the cohort-close memo.

---

<!-- maintainer -->

**Maintainer notes:**
- Ship alongside the signed contract and the cohort prework email. Sponsor fills in 15–20 minutes; ops converts the five answers into `content/pre-engagement-contract.md` in the content bundle.
- **Asset status:** v0 — sponsor-facing, not yet sent to a real sponsor. First cohort delivery is the first test. Iterate from sponsor feedback.
- **Tone check:** sponsor is a builder CTO (reads Willison, uses Claude Code daily). Direct, short, no consultant padding. The Rory beats ("Half the CTOs who fill this worksheet discover…") earn their keep because the sponsor wants a transformation artifact, not a training vendor's paperwork. If a real sponsor finds any line smells like vendor-speak, trim.
- **Override handling** — the Nerd writes student overrides to a per-cohort `content/overrides.md` or appends to the contract with attribution. The trainer collects these for the close memo. Implementation lives in the Agentic Nerd skill (not yet built).
- **Future asset companions:**
  - Cohort-close memo template ("what your engineers said about the four homes") — to be written after first cohort.
  - Sponsor one-pager on the pre-engagement contract's purpose (belongs in the sales pack, different audience — the sponsor who hasn't signed yet, doing diligence on the program).
