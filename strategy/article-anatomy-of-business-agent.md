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

## Phase 2: [To be continued]

<!--
Planned phases:
- Phase 2: Agent architecture — designing how the agent reasons, what tools it needs, what judgment calls it makes
- Phase 3: Building — the actual Claude Code construction
- Phase 4: Evaluation — how do you know it's working?
- Phase 5: Trust gradient — from read-only to autonomous
-->
