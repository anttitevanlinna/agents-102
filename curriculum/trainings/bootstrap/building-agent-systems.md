# Building Agent Systems

## Big Idea
A system remembers, grows, and compounds. Chat doesn't. Your next big challenge is the foundation.

## Meta
- **Primary Bloom's level:** Apply → Analyze
- **Setup:** Close Module 1's Claude Code session (which was scoped to `module-1/`) and reopen Claude Code at the `agents-102-bootstrap/` root. The Module 2 starter zip unzips here.
- **Prework:** (1) [Name your next big challenge](exercises/name-your-challenge.md) — pick your next big challenge and write a one-paragraph brief. Before class. (2) Karpathy's LLM Wiki post. (3) Candidate: Lindenberg on Claude Code memory architecture.
- **Homework:** [Schedule your personal agent](exercises/personal-agent-homework.md) — schedule a daily agent that reads your challenge brain (one week of observation). Plus selected "What is an Agent" sections (tools, memory, context).
- **Materials (trainer):** Module 2 zip that unpacks into the student's working directory — empty `sources/` (participant fills via curation on class day — no pre-load), empty `brain/`, empty `agents/`, and a root `CLAUDE.md` with starter rules. Plus an optional second batch of sources for Phase 3 — framed as a fresh Confluence page / OneDrive doc / article the trainer hands out during Phase 3, to simulate real-week source flow.
- **Plug points:** Each participant's own live challenge + curated sources from their Confluence / Office365 / internet. Sponsor pre-agreement: Confluence & Office365 connector access for the cohort; acceptance that the shape (not the substance) of challenges may be shared in the room.

## What You'll Learn
After this module, you will be able to:
- **Build** an LLM brain on your next big challenge, curated from internal wikis, recent work, and practitioner best practice
- **Construct** your first custom agent — a plain markdown file with instructions (what it's for, and the rules it follows) — that does real work against that challenge using the brain
- **Use** Claude Code's plan mode to review multi-step agent actions before they run
- **Analyze** the three layers of the system — raw sources, the brain, the rules file — and explain why plain text beats a database here
- **Evaluate** whether the brain is compounding or merely growing

## Prework Exercise

[Exercise: Name your next big challenge](exercises/name-your-challenge.md)

## Connections
You saw Karpathy's LLM Wiki post in the prework. What's the difference between asking an LLM a question and having an LLM maintain a knowledge base for you? Say it out loud before we build one.

Then the real one: what's the challenge you're carrying right now that isn't solved yet? The thing that's been open in your head for weeks, maybe longer. Not a task — a challenge. Hold it. We're going to build a brain around it.

And one more: if everything you've read, drafted, and half-figured-out on that challenge moved into a brain an agent could read and sharpen — what changes on Monday?

## Exercises

[Exercise: Build your challenge brain](exercises/build-your-challenge-brain.md)

## Lectures

[Lecture: Compounding](lectures/compounding.md)

## Key Concepts (Emergent)
- **Three layers**: raw sources (the originals, untouched) → the brain (maintained by the agent, sharpens over time) → the rules file (`CLAUDE.md`) that keeps the shape consistent
- **Plain text beats databases here** because language models are strongest at reading and writing text. No setup, no extra tools.
- **Persistence + automation = system.** Neither alone is enough.

## Plug Points
- **Each participant's own live challenge.** The exercises are structurally the same across people. What changes is what's inside the brain.
- **Sources must be readable by agents** (text, markdown, PDF, structured data) — Confluence and Office365 connector access arranged with the sponsor before training day.

## Debrief

Five minutes. A personal retro — with Claude. Paste this:

```
Let's run a retro on standing up the brain. Three questions:
1. What went well — where did the compounding effect clearly show up?
2. What was tedious or frustrating — and what does that tell us about what the rules should handle for us next time?
3. What rules should live in the brain's CLAUDE.md so the next update cycle is sharper? Rules for what belongs in the brain, rules for what to cut, rules for when to cross-reference.

Ask me one question at a time. After I've answered all three, propose concrete additions to CLAUDE.md — the exact lines I should add, word for word.
```

Answer each question as it comes. When Claude's done, paste the proposed additions straight into your `CLAUDE.md`. The brain's rules just got sharper, the way your guardrails did in Module 1. Same move, different shelf.

One more move before you close. Paste:

```
Look at my challenge brain. Find the load-bearing obstacle — the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux." One sentence. Save it to module-2/crux.md.
```

Save Claude's answer. That one sentence is the seed Module 8 cashes in.

## Bridge
You have an agent doing real work on your challenge. But the job is getting too big for one agent. What do you split?
