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
