# The Anatomy of a Business Agent Project

**Draft article — how business agents actually get built with Claude Code.**

---

## The starting point: agents are only as good as their information

This has always been true, and most people have always known it. An agent without accurate, structured information is just an LLM guessing. It might guess well — but guessing is not what you want from a system that does real work.

The information is broad. It can be numbers. It can be knowledge. It can be customer feedback, market analysis, regulatory requirements, competitive positioning, internal strategy documents. Whatever the domain, whatever the goal — the information is where everything starts.

This is what separates a business agent from a chatbot. A chatbot takes whatever you type and responds. A business agent works from a curated body of information that has been deliberately assembled, verified, and structured for a specific purpose. The information is not incidental — it is the foundation.

---

## Phase 1: Information curation

Before you build the agent, you build the information it will work from.

This is the phase most people skip — and it's why most business agents produce mediocre output. They connect an LLM to a database or a document folder and say "go." The result is an agent that knows everything and understands nothing, because the information was never curated for the task.

With Claude Code, Phase 1 looks like this:

**You feed it everything relevant to the goal.** Articles. Strategy documents. Customer comments. Trade publications. Market research. Competitive analysis. Internal memos. Financial data. Whatever is pertinent — you bring it in.

**Claude Code reads, stores, and structures it.** Not as a dump of raw text — as organized, goal-oriented information. It extracts what matters, identifies gaps, flags contradictions, and builds a structured knowledge base that serves the specific purpose you're building toward.

**The goal shapes the curation.** This is critical. You don't curate information in the abstract — you curate it for something. The goal determines what's relevant, what's missing, and how the information should be organized.

### Example: A roadmap drafting agent

Say the goal is an agent that drafts product roadmaps. Phase 1 means curating three bodies of information:

1. **Market information.** What's happening in the market? Competitor moves, technology shifts, customer behavior changes, regulatory developments. Not a generic market report — the specific market dynamics that affect roadmap decisions.

2. **Customer information.** What are customers saying, asking for, complaining about? Direct feedback, support tickets, sales conversations, churn reasons, feature requests. The voice of the customer, structured for roadmap relevance.

3. **Business strategy.** Where is the company going? Strategic priorities, resource constraints, revenue targets, partnership commitments, technical debt decisions. The internal context that shapes what's possible and what matters.

Each of these is a Claude Code session. You point it at the sources, give it the goal, and let it read, extract, and structure. The output is not a summary — it is a structured information base that the agent will work from.

### What makes this different from "just uploading documents"

Three things:

- **Curation is active, not passive.** You don't dump files into a folder. You make deliberate choices about what goes in, challenge Claude Code to find gaps, and iterate until the information base is complete for the purpose.
- **Structure serves the goal.** The information isn't organized by source — it's organized by how the agent will use it. Market dynamics grouped by their roadmap implications. Customer feedback clustered by theme and urgency. Strategy distilled into decision constraints.
- **Quality is verified.** Contradictions are surfaced. Outdated information is flagged. Gaps are named explicitly — "we don't have data on X" is more valuable than pretending X doesn't matter.

Phase 1 is not a preliminary step you rush through to get to the "real" work. Phase 1 IS the work. The quality of the agent's output is determined here — everything after this is architecture and execution on top of the information you've curated.

---

## Phase 2: Goal definition

You arrive at Phase 1 with a vague idea of what you want to build. That's fine — you need the vague idea to know what information to curate. But the real goal is born inside the context you built in Phase 1.

This is the crucial sequence: information first, then goals. Not the other way around. When you define goals before understanding the information landscape, you get aspirational goals disconnected from reality. When you define goals after curating the information, the goals are grounded — shaped by what you actually know, what's actually available, and what's actually possible.

With Claude Code, Phase 2 is a conversation. You have the curated context from Phase 1 sitting in your project directory. You open a session and talk through what the system should accomplish — with Claude Code reading the context as you discuss. The goal emerges from the dialogue between your intent and the information reality.

### A system, not a single goal

Here's what practice teaches you: a single goal rarely captures what a real business system needs to do. A roadmap drafting agent doesn't just "draft roadmaps." It might have four goals, in priority order:

1. **Synthesize market and customer signals** into a structured view of what matters now.
2. **Draft roadmap candidates** that align with business strategy and resource constraints.
3. **Surface trade-offs explicitly** — what you're choosing and what you're giving up.
4. **Maintain a living context** that updates as new information arrives.

Four goals. Priority-ordered. Each one specific enough to build toward, broad enough to allow the agent judgment in how it gets there.

The world doesn't fit a single goal. A compliance monitoring system might need to: (1) track regulatory changes, (2) assess impact on current operations, (3) draft response recommendations, (4) maintain audit trail. These are related but distinct — and the priority order matters because it tells the agent what to optimize for when goals conflict.

### What you produce

Phase 2 produces goal files — markdown documents in your project that state what the system is for. Not feature specs. Not user stories. Goals: what the system accomplishes, in what priority, with what constraints.

These goal files become part of the stable context that Phase 3 builds on.

---

## Phase 3: Procedures, guardrails, and the plan

Phase 1 gave you context. Phase 2 gave you goals. Phase 3 is the plan: how does the system get from the information to the goals?

This is where you establish:

- **Processes.** What steps does the agent follow? In what order? What's the workflow — not as a rigid Zapier pipeline, but as a described approach the agent can reason within?
- **Procedures.** How does the agent handle specific situations? When it finds contradictory information, what does it do? When it's uncertain, does it flag or decide? These are the operational rules.
- **Guardrails.** What must the agent never do? What boundaries does it operate within? Guardrails are not suggestions — they are hard constraints. "Never send external communications without human review." "Never use data older than 30 days for financial projections." "Always cite sources."
- **Quality criteria.** What does good output look like? Not in the abstract — specifically. For the roadmap agent: "Every recommendation must reference at least one customer signal and one strategic priority." For the compliance agent: "Every regulatory change must be linked to the specific internal process it affects."

With Claude Code, Phase 3 often uses plan mode — you describe what the system needs to do, and Claude Code helps you think through the procedures, identify edge cases, and structure the guardrails. But the human drives. The procedures reflect your domain expertise, your organization's standards, your judgment about what matters.

### Everything is stored as markdown

This is the key architectural point: Phases 1, 2, and 3 all produce markdown files in directories. The context is `.md` files. The goals are `.md` files. The procedures and guardrails are `.md` files. Nothing is hidden in a database, locked in a platform, or encoded in a proprietary format.

The entire foundation of the business agent is readable, editable, version-controlled text. Anyone can open it, understand it, challenge it, improve it. The CLAUDE.md file ties it together — telling Claude Code where to find the context, what goals to pursue, and what guardrails to respect.

This is the architecture the business world has been missing. Not a platform. Not a workflow tool. A directory of structured text that an LLM-based agent can read, reason about, and act on — with full human visibility into every piece.

```
project/
├── CLAUDE.md              ← the agent's operating instructions
├── context/               ← Phase 1: curated information
│   ├── market/
│   ├── customers/
│   └── strategy/
├── goals/                 ← Phase 2: what the system accomplishes
│   ├── goal-1-synthesize.md
│   ├── goal-2-draft.md
│   ├── goal-3-tradeoffs.md
│   └── goal-4-maintain.md
├── procedures/            ← Phase 3: how the agent works
│   ├── processes.md
│   ├── guardrails.md
│   └── quality-criteria.md
└── output/                ← what the agent produces
```

Three phases. All stable. All stored. All human-readable. This is the foundation — and everything the agent does from here builds on it.

---

## Phase 4: [To be continued]

<!--
Planned phases:
- Phase 4: Execution — the agent works, produces output, iterates
- Phase 5: Evaluation — how do you know it's working?
- Phase 6: Trust gradient — from read-only to autonomous
-->
