# Research Insights

Nuggets that emerge from research, analysis, and discussion. Each is a compressed argument — usable in training, advisory conversations, newsletter content, and the Bootstrap curriculum.

## How to use this file

- Add insights as they emerge — from research cycles, from Antti's analysis, from customer conversations
- Each insight has a one-line thesis, the supporting argument, and where it came from
- Tag with domains where it applies
- The hourly researcher can add insights it discovers; Antti curates

---

## The Vertical SaaS Ceiling

**Thesis:** Vertical SaaS agents automate one process brilliantly — but companies run 200 processes.

Salesforce Agentforce gets Finnair to 80% chat resolution. Impressive. But Finnair runs flight ops, crew scheduling, maintenance planning, fuel optimization, revenue management, ground handling, catering, regulatory compliance, baggage tracking, loyalty programs... Customer service is 1 of 200 processes. It's high volume, bounded, and escalation-tolerant — the easiest possible target.

Every vertical SaaS agent hits the same wall: Zendesk sees tickets. SAP sees ERP. ServiceNow sees IT ops. Each automates its own silo. But real business processes cross silos — a customer complaint about a delayed flight touches ops, baggage, rebooking, compensation policy, and loyalty. The moment you need coordination across systems, you're back to the unsolved multi-system orchestration problem.

**The implication for CTOs:** The vendor will sell you automation for the one process they own. The other 199 are yours to figure out.

**Applies to:** Platform advisory, Bootstrap Module 7, newsletter content
**Source:** Agentforce analysis (March 2026) + Antti's Finnair observation
**Date:** 2026-03-21

---

## The Promotion Path Doesn't Exist

**Thesis:** Every platform has personal, team, and company agent tiers — but they're different products. Promotion means rebuilding, not upgrading.

Microsoft: Copilot → Copilot Studio → Foundry = three different runtimes. Google: Gemini → Workspace Studio → Vertex = disconnected layers. OpenAI: ChatGPT → Enterprise → Agents SDK = rebuild. You cannot take a personal agent that works and "promote" it to a governed team agent. You start over.

This is the gap nobody talks about because every vendor wants you to start on their platform — not think about where things go next.

**The implication for CTOs:** Plan for rebuilding at each tier transition. Or build on standards (MCP, Agent Skills) from the start so at least the tool integrations transfer.

**Applies to:** Platform advisory, training arc (personal → team → company)
**Source:** Cross-platform synthesis (March 2026)
**Date:** 2026-03-21

---

## Microsoft's Agent Strategy Is an Azure Upsell

**Thesis:** Microsoft's entire agent infrastructure assumes Azure. AWS-native companies see a migration pitch, not an agent platform.

Entra ID for identity, Cosmos DB for state, Key Vault for secrets, Power Automate for orchestration, Foundry for hosting. Every layer is Azure-locked. Most large enterprises run hybrid — M365 for productivity, AWS for infrastructure. Microsoft is betting those companies will pull agent infra to Azure. That's a big bet, and for many companies a non-starter.

Meanwhile OpenAI's Frontier is deliberately vendor-neutral (manages agents from ANY provider) and MCP servers run anywhere. For AWS shops, these are less threatening entry points.

**The implication for CTOs:** "Which agent platform" depends first on "where does your infrastructure live." The M365/Azure-native company has a different answer than the AWS-native company.

**Applies to:** Platform advisory, infrastructure assessment
**Source:** Platform synthesis + Antti's observation (March 2026)
**Date:** 2026-03-21

---

## Nobody Leads — And That's the Point

**Thesis:** OpenAI's own COO confirmed (Feb 2026): "We have not yet really seen enterprise AI penetrate enterprise business process." The entire business agent space is pre-chasm.

MIT GenAI Divide: 95% of organizations report no measurable ROI from AI. Zero named enterprises report production business agent deployments with measurable outcomes on any horizontal platform. The "which platform should we choose" question is premature — the "what agent should we build" question comes first.

**The implication for CTOs:** Stop evaluating platforms. Start with $20/month personal agents. Discover which processes benefit. Then evaluate platforms against YOUR discovered use cases, not vendor demos.

**Applies to:** Bootstrap opening, advisory positioning, newsletter
**Source:** OpenAI COO (TechCrunch Feb 24, 2026), MIT GenAI Divide study
**Date:** 2026-03-21

---

## Customer Service Is the Only Domain Crossing the Chasm

**Thesis:** Customer service has Level 3 convergence evidence. No other business domain does.

Three platforms independently showing 40-80% autonomous resolution: Zendesk (51% SeatGeek), Salesforce (80% Finnair), HubSpot (84% Zeffy). Why this domain first? Clear success criteria + bounded scope + human escalation tolerance + high volume + data already in one system.

Every other business domain (finance, HR, compliance, operations) is still Level 1-2 at best. The lesson isn't "do customer service" — it's "look for processes with these same characteristics in YOUR domain."

**Applies to:** Bootstrap content, domain research prioritization
**Source:** Vertical SaaS research (March 2026)
**Date:** 2026-03-21

---

## Google's Circular Evidence Ecosystem

**Thesis:** All Google enterprise deployment claims trace back to Google's own materials. The evidence is circular.

Google publishes deployment metrics (Danfoss "80% automation," Telecom Italia "20% efficiency") → aggregators cite Google → looks like multiple independent sources. It's not. Every named company appears only in Google's own ROI reports or blog posts. Zero independent verification for any deployment.

Workspace Studio: 63 user-reported outages in 24 hours around GA. Capacity errors blocking paid users for days. No webhooks, no state persistence, max 20 steps, ~10 integrations.

**The implication:** Don't mistake volume of coverage for independence of evidence. One vendor source republished 10 times is still one source.

**Applies to:** Research methodology, source quality training, newsletter
**Source:** Google Workspace OODA cycle 13 (March 2026)
**Date:** 2026-03-21

---

## The CTO Can't Even See What to Research

**Thesis:** The hardest problem isn't choosing a platform. It's knowing what questions to ask.

A CTO looks at the agent landscape in March 2026 and sees: 4 horizontal platforms each telling a different story. 5+ vertical SaaS vendors each claiming their silo is the answer. Standards (MCP, A2A, Agent Skills) that may or may not matter. 200 internal processes, most never evaluated for agent potential. And a research landscape that actively deceives — Google's evidence is circular, Microsoft's connector counts are misleading, OpenAI's vision runs 12-18 months ahead of reality, and every vendor demo maps to zero production evidence.

The CTO doesn't need a platform comparison matrix. They need structured context that makes the question askable. Before you can evaluate "which platform for invoice reconciliation," you need to know: Is invoice reconciliation even a good candidate? What does "agentic" mean for that process vs. a chatbot? Which of my 200 processes have the right characteristics (bounded scope, clear success criteria, escalation tolerance, data in one system)?

This is why Bootstrap precedes advisory. The 2-day hands-on experience gives the organization enough understanding to formulate real questions instead of vendor-shaped ones. Without it, the CTO is choosing between marketing stories, not between real capabilities.

**The implication for CTOs:** Don't start with "which platform." Start with "which of our processes should we even try." That requires building agent competence first — understanding what agents can and can't do, what makes a process a good candidate, and what the failure modes look like. Then the platform question answers itself.

**The implication for Bosser:** The advisory service isn't "we help you choose a platform." It's "we help you see the landscape clearly enough to know what to evaluate." The structured context IS the deliverable. The platform recommendation falls out of it.

**Applies to:** Advisory positioning, Bootstrap→advisory handoff, sales conversations, newsletter
**Source:** Antti's observation + cumulative platform research (March 2026)
**Date:** 2026-03-21

---

## Three Enablers That Emerge After Competence (F-Secure Evidence)

**Thesis:** Once people can build agents, they discover three infrastructure needs the organization hasn't solved — data access, a platform to run what they built, and a way for others to find and use it.

F-Secure evidence (March 2026): after 2 modules of Claude Code 101, pretty much everyone started building — dashboards, agents, applications. Not because they were told to, but because competence creates pull. But most builders hit walls. The walls are not about capability — they're about infrastructure:

1. **Data access.** Agents need Snowflake, Salesforce, internal systems. Without access, the agent is a toy that works on sample data. This is the multi-tool problem from our platform research, experienced from the inside. It's also why vertical SaaS agents (Agentforce, Zendesk) have an advantage — they already own the data. For everything else, someone needs to connect the pipes.

2. **A platform to run AI-generated apps.** People build personal agents that work. Then: "where does this live? How do I share it? Can it run when I'm not running it?" This is the promotion path problem — personal→team→company — that no platform has solved. F-Secure is hitting exactly the gap we documented across Microsoft, Google, OpenAI, and Anthropic.

3. **Agent skills / user guidance.** Once builders create agents, other people in the org need to find them, understand what they do, and know how to use them. This is the discoverability and governance layer — what OpenAI is calling "Skills" and what Microsoft is building with Agent 365. Nobody has shipped it yet. F-Secure needs it now.

**The implication for CTOs:** Bootstrap builds competence. Competence creates builders. Builders discover your real infrastructure gaps — and they discover them faster and more accurately than any consultancy assessment. The three enablers (data access, runtime platform, discoverability) are predictable and plannable. Budget for them.

**The implication for Bosser:** This is the natural handoff from Bootstrap to Advisory. "Your people are building. Here's what they need next." The advisory engagement scopes these three enablers against the org's specific landscape.

**Evidence level:** Level 2 (single deployment, strong signal). Watch for convergence as more orgs go through Bootstrap.

**Applies to:** Advisory positioning, Bootstrap→advisory handoff, platform watch, value proposition canvas
**Source:** F-Secure deployment experience (March 2026, Antti direct)
**Date:** 2026-03-21

---

## Competence Leads to Lightweight Choices, Not Big Decisions

**Thesis:** Agent competence doesn't produce a strategy deck — it produces small, practical, reversible decisions that enable real progress by real people.

The traditional transformation sequence is: assess → select platform → big procurement decision → 6-month pilot → maybe rollout. This produces PowerPoints and vendor lock-in before anyone knows what they actually need.

What happens when you build competence first (F-Secure, March 2026): people build agents → they hit data access walls → the question becomes "we need MCPs for Snowflake and Salesforce" → then "where do we run simple apps?" These are lightweight choices: scoped, reversible, made by people who know what they need because they've built things. No board-level vendor evaluation needed. No 6-month assessment. Just practical people making practical decisions.

The big platform decision might still come later — but by then it's informed by months of real usage, real needs, and real data about what works. The platform question answers itself when you have 50 people building and you know exactly what they need.

**The implication for CTOs:** Nobody should be making non-two-way-door decisions on the agent landscape right now. The entire space is pre-chasm. Every platform is immature. Every vendor story is 12-18 months ahead of reality. Betting small while making progress is what a smart CTO does. Build competence, and the decisions get smaller, faster, and reversible — two-way doors you can walk back through if the landscape shifts (and it will). The heavyweight vendor evaluation is what organizations do when they lack competence. The lightweight choice is what organizations do when they have it.

**Corollary: any research that takes more than a week is irrational.** The landscape moves so fast that a 3-month vendor evaluation is stale before it's done. This applies to us too — our research runs in hourly cycles, not quarterly reports. The freshness window is weeks, not months.

**Applies to:** Core value proposition (strongest formulation), sales conversations, advisory positioning, newsletter
**Source:** F-Secure deployment experience (March 2026, Antti direct)
**Date:** 2026-03-21

---

## Competence Creates Pull — People Find Their Own Processes

**Thesis:** You don't need to tell people which processes to automate. Teach them to build agents, and they discover the right processes themselves.

F-Secure evidence: after 2 modules, people started building dashboards, agents, and applications for their own work — unprompted. Nobody assigned "build an agent for X." The competence itself created the pull. This is stronger validation than any process assessment a consultancy could deliver, because the people who know the process best (the ones doing it) are the ones identifying the opportunity.

This inverts the traditional transformation sequence. Consultancies do: assess processes → identify candidates → build solutions → train users. Our sequence is: train people → they identify candidates → they build solutions → assess what worked. The second sequence is faster, cheaper, and produces better candidates — because the domain expert and the builder are the same person.

**The implication for CTOs:** Stop commissioning process assessments. Build competence. Your people will tell you where agents create value — and they'll be right more often than the consultancy, because they know the work.

**Applies to:** Core value proposition, sales conversations, Bootstrap design
**Source:** F-Secure deployment experience (March 2026, Antti direct)
**Date:** 2026-03-21

---

## Agent Sprawl Is Real and Ungoverned

**Thesis:** Shadow agents are the new shadow IT — and most organizations can't even see them, let alone govern them.

Microsoft discovered 500K agents inside their own organization. 29% operate without IT approval. The "Agents of Chaos" academic study independently confirmed the governance gap. Gravitee found 3M+ agents across their customer base with only 47% monitored. Non-human identities already outnumber human identities 50:1 (projected 80:1). 82% of executives think they're protected. Only 24% have actual visibility.

The governance product layer is just starting to exist: ConductorOne (MCP access management, March 19), Microsoft Agent 365 ($15/user/month, GA May 1), Geordie AI (agent security governance), AWS Bedrock AgentCore Policy (Cedar-based formal verification). Six months ago, none of these products existed. But adoption evidence is zero — all just shipped or are shipping.

The four-layer enterprise agent stack is crystallizing: Models → Protocols (MCP + A2A + Agent Skills) → **Governance** → Applications. The gap between layers 2 and 3 is where the 95% failure rate originates.

**The implication for CTOs:** You probably have shadow agents already. Before deploying more, audit what exists. The governance layer is just starting to ship — but waiting for it means falling behind. Start with visibility (what agents exist?) before adding capability (what should agents do?).

**Applies to:** Bootstrap Module 4 (Security), advisory, platform watch
**Source:** Platform watch cycles 23-25, Microsoft 500K agents (Agent 365 announcement), Agents of Chaos study, Gravitee data
**Date:** 2026-03-22

---

## The Compounding Error Problem

**Thesis:** 85% per-step accuracy sounds good. On a 10-step workflow, that's 20% end-to-end success. This is why customer service works and complex processes don't.

Customer service agents succeed because the task is bounded: 2-3 step interactions with clear escalation paths. Zendesk gets 51% (SeatGeek), Salesforce gets 80% (Finnair), HubSpot gets 84% (Zeffy). But every agentic system that attempts longer chains hits the compound reliability wall: 0.85^10 = 0.20.

Salesforce is experiencing this in real-time. Their own help portal achieves 62% resolution vs. 80% target. The Atlas Reasoning Engine shows session-to-session variance — identical scenarios, different paths. They responded by adding Agent Script (a deterministic control layer), effectively pulling back the autonomy promise. Multiple independent practitioners (Salesforce Ben, CIO.com, Greyhound Research) converge on this diagnosis.

The math predicts domain boundaries precisely. Processes with 2-3 bounded steps and escalation tolerance: agents work now. Processes with 10+ steps crossing system boundaries: agents fail at rates that make them worse than humans. This isn't a model quality problem that better AI fixes — it's an architectural constraint that requires supervision design (short action chains, human-in-the-loop at decision points).

**The implication for CTOs:** Design for 2-3 step action chains, not 20-step autonomy. The processes that work look like customer service: bounded scope, clear success criteria, escalation tolerance, data in one system. Find those characteristics in your 200 processes.

**Applies to:** Bootstrap Module 5 (Output Quality), Module 6 (Evals), advisory, newsletter
**Source:** Vertical SaaS research cycle 25 — Salesforce Ben, CIO.com, Greyhound Research CEO, Reddit deployment data, compound math analysis
**Date:** 2026-03-22

---

## Coding Agents Are the Meta-Platform

**Thesis:** The 199-process problem resolves to one question: which platform builds custom agents fastest? Only coding agent platforms compound.

Copilot Studio can't build another Copilot Studio agent. Agentforce can't extend Agentforce. Workspace Studio can't write its own connectors. Claude Code and Codex can. They build the MCP server, the agent that uses it, the eval that tests it, and the next agent. This is the flywheel — and it only exists on coding agent platforms.

The compounding math: each agent built creates reusable MCP servers and tools. The coding agent gets better at building the next agent because it has more context. The organization's agent capability grows superlinearly. No visual builder has this property.

But the deeper ceiling isn't tools. MCP servers, connectors, orchestration — these are engineering problems that get solved within 6-12 months. What remains harder: how fast can the organization create the right context for agents to run? Context means knowing which processes benefit, what success looks like, what data matters, how to describe the work. That's a human learning rate, not a technical one.

And here's the kicker: coding agents are also the best context-creation engines that exist. They read repos, crawl docs, query databases, analyze APIs, synthesize across sources, then output the structured artifacts (MCP servers, system prompts, eval criteria) that encode context for other agents. Manual curation can't keep up because enterprise context changes continuously and the coding agent re-derives it on demand.

**The implication for CTOs:** "Which platform" becomes "which coding agent does my team adopt" — because the coding agent IS the platform that builds everything else. Tools commoditize. Context-creation capability doesn't. Training raises the ceiling. Everything else raises the floor.

**Applies to:** Core value proposition, Bootstrap Module 8 (Agents Building Agents), advisory, newsletter, CLAUDE.md positioning
**Source:** Platform watch synthesis Pattern 41 (strategic analysis, March 2026)
**Date:** 2026-03-22

---

## Template

Copy this for new insights:

```
## [Title]

**Thesis:** [One sentence — the compressed argument]

[2-4 paragraphs of supporting argument]

**The implication for CTOs:** [So what?]

**Applies to:** [training module, advisory, newsletter, etc.]
**Source:** [Where this insight emerged]
**Date:** YYYY-MM-DD
```
