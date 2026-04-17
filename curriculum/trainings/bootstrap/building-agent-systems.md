# Building Agent Systems

## Big Idea
A system remembers, grows, and compounds. Chat doesn't. Your company's own content is the foundation.

## Meta
- **Primary Bloom's level:** Apply → Analyze
- **Prework:** (1) Build one personal scheduled agent — daily planner (pulls your calendar, produces a plan every morning), or email triage (categorizes + prioritizes inbox), or similar. Uses the O365 connector set up during training prework. Runs on schedule. (2) Karpathy's LLM wiki post. (3) Candidate: Lindenberg on Claude Code memory architecture.
- **Homework:** selected "What is an Agent" sections (tools, memory, context)
- **Materials (trainer):** LLM brain scaffold (directory layout, initial schema `CLAUDE.md`, ingestion prompt)
- **Plug points:** the company's own knowledge base — pre-agreed with sponsor (product KB, compliance process docs, competitive intelligence, customer insights)

## What You'll Learn
After this module, you will be able to:
- **Build** an LLM brain from your company's source content
- **Construct** an agent that does real work using the brain
- **Analyze** the three-layer architecture (raw sources → brain → schema) and explain why markdown files beat databases here
- **Evaluate** whether the brain is compounding or merely growing

## Lectures
- **Compounding** — how agents learn and self-correct. Self-correction as a design pattern, not a wish. Reference Pawel Huryn's pragmatic instructions.

## Exercises
- **Stand up your company brain** — Ingest the company's source materials. Watch the agent build the initial knowledge pages, add cross-references, refine summaries as you feed in more. Build an agent that does real work drawing from the compiled knowledge — drafting, checking, synthesizing. Query the brain directly. Let the agent lint its own brain for contradictions, gaps, stale claims. The system maintains itself.

## Key Concepts (Emergent)
- **Three layers**: raw sources (immutable) → wiki/brain (LLM-maintained, compounding) → schema (the rules, `CLAUDE.md`)
- **File-based architecture**: markdown beats databases because LLMs write text and are best at text. Zero dependencies.
- **Persistence + automation = system.** Neither alone is enough.

## Plug Points
- **The company's knowledge base.** The exercises are structurally the same across companies. What changes is what's inside the brain.
- **Must be readable by agents** (text, markdown, PDF, structured data) — arrange with sponsor before training day.

## Bridge
You have agents doing real work with your content. But the job is getting too big for one agent. What do you split?
