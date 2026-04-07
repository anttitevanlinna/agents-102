# Global Spillover: Coding Agent Patterns → Business Functions

*Research date: 2026-02-21*
*OODA rounds completed: 4*

## The Question

Are coding agent patterns (multi-turn reasoning, autonomous tool use, self-correction via verification loops) actually appearing in non-coding enterprise functions? Or is business-function AI still pipelines, chatbots, and RAG with marketing paint?

## Short Answer

**Partial spillover is real, but the pattern transfer is incomplete.**

The coding agent stack (multi-turn reasoning, dynamic tool selection, autonomous decision-making, self-correction via tests pass/fail) has a clean verification loop: the agent writes code, runs tests, sees pass/fail, and corrects. This loop is what makes coding agents genuinely autonomous.

In non-coding domains, we found real multi-turn, multi-system agents deployed at enterprise scale — but almost all of them operate in domains where a **structured verification signal** exists: numbers that must balance (finance), documents that must match templates (compliance), or resolution outcomes that can be measured (customer service). Where no structured verification signal exists (strategy, creative work, relationship management), we found zero evidence of true agentic deployment.

The spillover is happening **where the verification gap can be closed.** It is NOT happening where it cannot.

## Named Practitioners Found

### 1. Derek Waldron — JPMorgan Chase

| Field | Detail |
|-------|--------|
| Name | Derek Waldron |
| Company | JPMorgan Chase |
| Role | Chief Analytics Officer |
| Domain | Finance — cross-functional AI deployment |
| What they deployed | LLM Suite: proprietary platform now used by 200,000+ employees across all business functions. Agents create investment banking decks in 30 seconds, handle multi-step research tasks, power Coach AI (95% faster info retrieval for advisors). Agentic AI handles "complex multistep tasks for employees." |
| Evidence of multi-turn agent | Yes — Waldron demonstrated to CNBC an agent creating a full investment banking deck autonomously, pulling from multiple internal systems. Coach AI integrates internal data with predictive analytics across multiple turns. |
| Is it truly agentic? | Partially. LLM Suite itself is an AI assistant platform. Coach AI shows multi-step reasoning. The investment banking deck demo shows autonomous multi-system integration. But "200K employees using it" likely includes many simple assistant interactions alongside the agentic use cases. |
| Source | https://www.cnbc.com/2025/09/30/jpmorgan-chase-fully-ai-connected-megabank.html |
| Source | https://www.mckinsey.com/industries/financial-services/our-insights/jpmorgan-chases-derek-waldron-on-building-an-ai-first-bank-culture |
| Date | September-October 2025 |
| Evidence level | Level 2 (single enterprise deployment, named practitioner at conference/interview) |

### 2. Waheed Jowiya — Novo Nordisk

| Field | Detail |
|-------|--------|
| Name | Waheed Jowiya |
| Company | Novo Nordisk |
| Role | Digitalization Strategy Director |
| Domain | Pharmaceutical operations — clinical documentation |
| What they deployed | NovoScribe: AI-powered documentation platform using Claude models on Amazon Bedrock. Combines RAG with domain expert-approved text and case-specific variables. Produces 300-page clinical study reports (CSRs) that previously took 40-50 people working 15 weeks. Now takes less than 10 minutes with a team of 3. Also generates complete study booklets and patient guides in under a minute. |
| Evidence of multi-turn agent | Yes — this is genuine multi-step autonomous work: pulling data from multiple clinical trial databases, reasoning about regulatory requirements, generating structured documents across hundreds of pages, adapting to case-specific variables. The 90% time reduction on CSRs implies real autonomous work, not just template filling. |
| Is it truly agentic? | Strong yes for document generation. The agent reasons across multiple data sources, applies regulatory domain knowledge, and produces complex outputs. But note: this is autonomous *generation* with human review, not autonomous *decision-making*. The verification loop is "human expert reviews output" — not self-correction. |
| Source | https://claude.com/customers/novo-nordisk |
| Source | https://opentools.ai/news/ai-revolutionizes-pharma-novo-nordisks-massive-time-cut-in-documentation |
| Date | February 2026 |
| Evidence level | Level 2 (single enterprise deployment, named practitioner, vendor customer story — adjust for vendor source bias) |
| Caveat | Source is Anthropic's customer story page. Practitioner is named and quoted, but this is vendor-curated evidence. |

### 3. Sebastian Siemiatkowski — Klarna

| Field | Detail |
|-------|--------|
| Name | Sebastian Siemiatkowski |
| Company | Klarna |
| Role | CEO |
| Domain | Customer service — autonomous issue resolution |
| What they deployed | AI assistant handling 2/3 of all customer service chats (~1.3M conversations/month), equivalent to 800+ full-time agents. Multi-agent architecture using LangGraph. Multi-departmental escalation handling. |
| Evidence of multi-turn agent | Yes — multi-agent system with LangGraph, dynamic routing across departments, multi-turn conversations resolving complex issues. Not a FAQ chatbot. 82% improvement in response times, 25% drop in repeat issues. |
| Is it truly agentic? | Genuine multi-turn, multi-system agent. BUT: the critical learning is the *reversal*. After replacing 700 human agents, customer satisfaction dropped 22%. Siemiatkowski admitted cost was "a too predominant evaluation factor" and the bot left "empathetic gaps." Klarna rehired human agents and shifted to hybrid model. This is the most revealing enterprise signal in the dataset. |
| Source | https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 |
| Source | https://blog.langchain.com/customers-klarna/ |
| Source | https://poly.ai/blog/klarna-ai-customer-service-lessons |
| Date | February 2024 (launch), May 2025 (reversal), ongoing through 2025-2026 |
| Evidence level | Level 2 (single enterprise deployment, CEO public statements, third-party investigation by multiple outlets) |

### 4. Walmart — Procurement Negotiation Agent (via Pactum AI)

| Field | Detail |
|-------|--------|
| Name | Not individually named; Walmart Canada procurement team |
| Company | Walmart |
| Role | Procurement / supplier management |
| Domain | Operations — autonomous contract negotiation |
| What they deployed | Pactum AI chatbot negotiates autonomously with thousands of tail-end suppliers for indirect goods. Initial pilot: 89 suppliers, 5 buyers, reps from finance, treasury, and legal. 64% of suppliers reached agreement (vs. 20% target). Average turnaround 11 days (vs. weeks). 3% average savings. Expanded to WM US and International, now includes transportation route rates and goods for resale. |
| Evidence of multi-turn agent | Yes — this is genuine multi-turn autonomous negotiation. The agent engages in back-and-forth negotiation across multiple sessions, makes decisions about when to concede vs. hold firm, adapts strategy based on supplier responses. 75% of suppliers *preferred* negotiating with the bot over a human. |
| Is it truly agentic? | Strong yes. Multi-turn reasoning, autonomous decision-making within parameters, dynamic strategy adaptation. Self-correction via outcome verification (did the deal close? were savings targets met?). This is one of the clearest non-coding spillover examples. |
| Source | https://procureconsupplychain.wbresearch.com/blog/walmart-ai-chatbot-automate-supplier-negotiations |
| Source | https://ctl.mit.edu/news/how-ai-reshaping-supplier-negotiations |
| Source | https://pactum.com/understanding-agentic-ai-in-procurement-how-autonomous-ai-has-been-transforming-supplier-deals/ |
| Date | Originally 2023 (pilot), expanded through 2024-2025, ongoing |
| Evidence level | Level 2 (enterprise deployment, MIT investigation, multiple third-party sources) |
| Caveat | Pactum is the vendor, so some sources are vendor-adjacent. But MIT CTL investigation and WBR conference coverage add independent verification. Original pilot dates to 2023 — this is one of the OLDEST agentic non-coding deployments, predating the current hype. |

### 5. Goldman Sachs — Trade Accounting and Client Onboarding Agents

| Field | Detail |
|-------|--------|
| Name | Not individually named at public level; Goldman Sachs engineering + Anthropic co-development team |
| Company | Goldman Sachs |
| Role | Operations / compliance |
| Domain | Finance — trade reconciliation, KYC/AML compliance |
| What they deployed | Agents built on Anthropic Claude (Opus 4.6, 1M token context) for trade accounting, transaction reconciliation, client onboarding (KYC/AML). Agents review documents, extract entities, determine if additional documentation is required, assess ownership structures, trigger further compliance checks. Managing operations for $2.5T in assets under supervision. 30% faster client onboarding, 20%+ developer productivity gains. |
| Evidence of multi-turn agent | Yes — multi-step document review, cross-referencing against compliance databases, autonomous decision about what additional documentation to request, triggering further compliance workflows. |
| Is it truly agentic? | Strong yes. Multi-turn reasoning across documents, autonomous tool use (database lookups, document extraction), self-correction via compliance rule verification. The verification loop is regulatory compliance checks — a structured signal. |
| Source | Already documented in finance-accounting.md findings: https://www.cnbc.com/2026/02/06/anthropic-goldman-sachs-ai-model-accounting.html |
| Date | February 2026 |
| Evidence level | Level 2 (enterprise deployment, public statement via CNBC) |

### 6. Coca-Cola Beverages Africa (CCBA) — Manufacturing Change Management

| Field | Detail |
|-------|--------|
| Name | Not individually named |
| Company | Coca-Cola Beverages Africa |
| Role | Manufacturing operations |
| Domain | Operations — product change management |
| What they deployed | Microsoft Dynamics 365 Product Change Management Agent. AI-powered solution that transforms how CCBA manages manufacturing changes across operations. Built on Copilot Studio. |
| Evidence of multi-turn agent | Partial — described as "agentic" by Microsoft, embedded in Dynamics 365. Manages multi-step change management workflows. But details are thin; this is a vendor announcement more than a practitioner report. |
| Is it truly agentic? | Unclear. Microsoft calls it an "agent template" — which could mean genuine multi-turn autonomous reasoning or could mean a sophisticated workflow with LLM nodes. Insufficient detail to determine. |
| Source | https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/12/09/the-era-of-agentic-business-applications-arrives-at-convergence-2025/ |
| Date | December 2025 |
| Evidence level | Level 1-2 (vendor announcement with named customer, but no practitioner voice) |

## Spillover Evidence by Domain

### Finance

**Verdict: Strongest spillover domain. Verification gap is smallest here.**

Finance has the clearest structured verification signals: numbers must balance, transactions must reconcile, compliance rules are binary (pass/fail). This makes it the natural first spillover target from coding agents.

**Real deployments:**
- JPMorgan: 200K+ employees on LLM Suite, agentic multi-step tasks, Coach AI for advisor workflows (Derek Waldron, named practitioner)
- Goldman Sachs: Trade accounting agents on Claude, managing $2.5T in assets, 30% faster KYC onboarding (CNBC report, Feb 2026)
- HighRadius: Claims 90% touchless cash application (vendor claim, enterprise customers unnamed)
- KPMG, Deloitte: Multi-agent audit platforms (KPMG Clara, Deloitte Zora AI) — Big Four productizing the pattern

**The pattern:** Invoice matching, reconciliation, compliance checks — all have clear "did the numbers balance?" verification. This is the closest analog to "did the tests pass?" in coding.

### Legal/Compliance

**Verdict: Early spillover, but heavily document-focused. Not yet multi-turn autonomous reasoning.**

**Real deployments:**
- Goldman Sachs KYC/AML agents (see above) — genuine multi-step compliance reasoning
- Thomson Reuters CoCounsel: Agentic legal workflows launching early 2026, autonomous document review + "Deep Research"
- LexisNexis Protege: Four specialized agents (orchestrator, legal research, web search, customer document) collaborating on complex workflows

**The gap:** Most "legal AI" is still document review + extraction — a pipeline with an LLM node, not an autonomous agent. The verification signal in legal is "does this match the regulation?" which is structured enough for agents, but the consequences of errors are severe enough that human-in-the-loop remains mandatory. True autonomous legal agents are not yet deployed at scale.

**Contract review AI** shows 80% time reduction on first-pass analysis and 40% reduction in contract cycle times — but these are acceleration metrics, not autonomy metrics. The human still makes the decision.

### Operations

**Verdict: Real spillover in procurement and supply chain. Walmart/Pactum is the flagship case.**

**Real deployments:**
- Walmart/Pactum: Autonomous supplier negotiation — the strongest non-coding spillover example found. Multi-turn reasoning, strategy adaptation, 64% deal closure rate.
- Walmart "Trend-to-Product": Cuts fashion production timelines by 18 weeks — unclear if this is agentic or a sophisticated pipeline.
- Unilever (Dubai factory): Computer vision + autonomous drones + predictive maintenance. 30% increase in forecasting accuracy. But this is more IoT/ML than LLM-based agents.
- Automotive OEM (unnamed via Bain): Agents for order sequencing, 30% reduction in overtime, 15% throughput boost within one quarter.

**The pattern:** Operations spillover is strongest where there are clear outcome metrics (cost savings, cycle time, throughput). The verification signal is operational KPIs.

### Customer Service

**Verdict: Most visible spillover, but the Klarna reversal is the defining story.**

**Real deployments:**
- Klarna: 2/3 of all customer chats handled by multi-agent system (LangGraph), 800+ FTE equivalent. BUT: 22% satisfaction drop led to reversal. Now hybrid model.
- Walmart: GenAI Customer Support Assistant "routes and resolves issues autonomously without human intervention."

**The critical lesson:** Customer service agents can handle volume and routine multi-turn interactions. But when empathy, judgment, and relationship are required, the agents fail. Siemiatkowski's admission — "cost was too predominant" — is the most revealing enterprise signal in the entire dataset.

**The verification gap is the problem here.** In coding: test passes or fails. In customer service: "Was the customer satisfied?" is a lagging, fuzzy signal. Klarna learned that resolution rate (structured metric) and satisfaction (human judgment) diverge.

### HR

**Verdict: Mostly vendor promises, thin on practitioner evidence.**

**Real deployments:**
- HONO (HRMS vendor): Agentic onboarding across HR, IT, Finance, hiring managers. Adapts to country-specific requirements (GDPR in Germany vs. India). Claims 30-60% reduction in admin time.
- IBM watsonx Orchestrate: AI Agent for HR — vendor platform, no named enterprise customer evidence found.

**What we did NOT find:** Named HR leaders at enterprises saying "we deployed an autonomous agent for onboarding and here's what happened." The HR domain is dominated by vendor announcements, not practitioner reports. This is a red flag — it suggests HR agentic AI is still in vendor sales cycles, not production deployment.

### Sales/Marketing

**Verdict: Dominated by Salesforce Agentforce marketing. Thin on independent practitioner evidence.**

**Real deployments:**
- Salesforce Agentforce: Multi-step lead qualification, support ticket resolution, field service scheduling. Atlas Reasoning Engine as cognitive core. "93% of IT leaders plan to deploy autonomous agents within two years" (Salesforce survey — self-serving source).

**What we did NOT find:** A named sales leader at a non-vendor company saying "we deployed an autonomous sales agent and here are the real results." The sales domain is awash in vendor marketing but starved of practitioner evidence. This mirrors the HR pattern.

### Pharmaceutical/Life Sciences

**Verdict: Genuine spillover for document-heavy processes. Novo Nordisk is the standout case.**

**Real deployments:**
- Novo Nordisk/NovoScribe: 15 weeks → 10 minutes for clinical study reports. Named practitioner (Waheed Jowiya). Multi-source reasoning across clinical trial data. [SOURCE: https://claude.com/customers/novo-nordisk]

**The pattern:** Pharma regulatory documentation has a structured verification signal — documents must meet regulatory templates and include specific required elements. This is close enough to "tests pass/fail" to enable genuine agentic work.

## Counter-Evidence: Where Spillover Is NOT Happening

### The 95% failure rate

MIT reported that 95% of corporate AI initiatives do not deliver measurable ROI. Gartner predicts over 40% of agentic AI projects will be canceled by 2027. [SOURCE: https://www.directual.com/blog/ai-agents-in-2025-why-95-of-corporate-projects-fail] [NOTE: These are analyst numbers — Level 0 on our evidence ladder. Use as directional context only, not as anchor claims.]

### The demo-to-production gap

Composio's 2025 AI Agent Report: "What works in a pilot often breaks or becomes obsolete in production within a quarter." The gap between working demo and reliable production is where projects die. [SOURCE: https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap]

### "Agents struggling outside of coding and narrowly defined workflows"

From the counter-evidence search: "If 2025 had a buzzword, it was 'agents,' and if it had a disappointment, it was also agents. The promise was compelling, but the reality was more sobering, with agents struggling outside of coding and narrowly defined workflows." [SOURCE: https://hyperight.com/2026-ai-depth-over-hype/]

### The Klarna lesson

The most important counter-evidence is not failure but *reversal*. Klarna deployed the most visible non-coding agent in the world, claimed massive success, then reversed course when customer satisfaction dropped 22%. This is not a failure story — it's a *calibration* story. The agent works for routine multi-turn interactions. It fails where human judgment is irreplaceable.

### HR and Sales: vendor noise, not practitioner signal

In both HR and Sales domains, we found abundant vendor marketing ("Agentforce will transform...," "Agentic HRMS reduces admin time by 30-60%...") but almost zero named practitioners at non-vendor companies reporting real deployment results. This absence of practitioner signal, combined with heavy vendor marketing, is itself counter-evidence. These domains are not yet past the vendor promise stage.

## The Verification Gap

This is the core finding of this research.

### Why coding agents self-correct

Coding agents (Claude Code, Codex, Cursor) have a clean verification loop:
1. Agent writes code
2. Agent runs tests
3. Tests pass or fail (binary, immediate, objective signal)
4. Agent corrects based on failure signal
5. Repeat until tests pass

This loop is what makes coding agents genuinely autonomous. The verification signal is **structured, immediate, and objective.**

### The verification spectrum in non-coding domains

| Domain | Verification Signal | Structured? | Immediate? | Objective? | Spillover Status |
|--------|-------------------|-------------|------------|------------|-----------------|
| Finance (reconciliation) | Numbers balance | Yes | Yes | Yes | **Strong spillover** |
| Compliance (KYC/AML) | Rules pass/fail | Yes | Yes | Mostly | **Strong spillover** |
| Procurement (negotiation) | Deal closed, savings target met | Yes | Delayed | Mostly | **Strong spillover** |
| Pharma (documentation) | Template compliance, required elements present | Yes | Yes | Mostly | **Real spillover** |
| Customer service (resolution) | Issue resolved? | Partial | Yes | Partial | **Spillover with reversal** |
| Customer service (satisfaction) | Customer happy? | No | Delayed | No | **Spillover failed** |
| Legal (contract review) | Matches regulation? | Partial | Delayed | Partial | **Early, human-in-loop** |
| HR (onboarding) | Steps completed? | Yes | Yes | Yes | **Vendor promises, thin evidence** |
| Sales (pipeline) | Deal progressed? | Partial | Delayed | No | **Vendor promises, thin evidence** |
| Strategy/creative | "Is this good?" | No | No | No | **No spillover found** |

### The insight

**Coding agent patterns spill over into non-coding domains in direct proportion to how closely the domain's verification signal resembles test pass/fail.** Where verification is structured, immediate, and objective (finance reconciliation, compliance rule checks), spillover is real and strong. Where verification is fuzzy, delayed, or subjective (customer empathy, sales relationship, strategic quality), spillover is weak or absent.

This is not just a technology gap — it's an **epistemological gap.** Coding knows when it's right. Most business work does not.

### Implications for training

The practical implication: teaching non-coders to deploy agents is not just about tools and prompts. It requires teaching them to **design verification signals** — the equivalent of tests — for their domain. Organizations that can create structured feedback loops for business processes will be the ones that successfully deploy agents. Organizations that can't will remain in chatbot territory.

## What We Did Not Find

1. **No explicit "spillover" narrative.** Nobody in the practitioner community is using the word "spillover" or explicitly connecting coding agent patterns to business agent patterns. The transfer is happening implicitly — the same architecture patterns (multi-turn, tool use, self-correction) appear in both domains, but practitioners don't describe it as "learning from coding agents." They describe it as "deploying agentic AI for finance" or "building multi-agent customer service." The meta-pattern is visible from our research vantage point but not articulated by practitioners themselves.

2. **No named HR leaders or sales leaders.** Despite extensive searching, we found zero named individuals at non-vendor enterprises reporting "we deployed an autonomous HR/sales agent and here's what happened." These domains are entirely vendor-driven narratives.

3. **No true autonomous decision-making in high-stakes domains.** Even the strongest cases (Goldman Sachs compliance, JPMorgan finance) maintain human-in-the-loop for consequential decisions. Agents accelerate preparation and analysis; humans decide. Full autonomy exists only in low-stakes, high-volume scenarios (Klarna routine queries, Walmart tail-end supplier negotiations).

4. **No evidence of multi-agent orchestration in non-coding enterprise production.** Multi-agent systems are discussed extensively (LangGraph, CrewAI, Salesforce Atlas) but actual production deployments of multi-agent orchestration in business functions are rare. Klarna's LangGraph deployment is the clearest example. Most "agent" deployments are single agents or sophisticated pipelines, not the multi-agent orchestration that coding demonstrates.

5. **No evidence from Nordic enterprises specifically on spillover.** The Nordic AI landscape is focused on infrastructure (data centers, government funding, EU AI Act compliance) rather than practitioner deployment stories. Klarna (Sweden) is the one Nordic exception, and its story is a cautionary tale.

6. **No Reddit/HN practitioner threads found.** Despite searching, we found no grassroots practitioner discussions of "I deployed an agent at my enterprise job in finance/HR/ops." The enterprise practitioner community is either not on these platforms or not talking publicly.

## Evidence Quality Assessment

| Finding | Evidence Level | Confidence |
|---------|---------------|------------|
| Finance is strongest spillover domain | Level 3 (convergence of multiple signals) | 8/10 |
| Verification gap determines spillover success | Level 4 (cross-domain meta-pattern) | 7/10 |
| Klarna hybrid reversal is the defining story | Level 2 (single enterprise, but exceptionally well-documented) | 9/10 |
| Walmart/Pactum procurement negotiation | Level 2 (single enterprise, MIT investigation) | 8/10 |
| Novo Nordisk clinical documentation | Level 2 (named practitioner, vendor source) | 7/10 |
| JPMorgan cross-functional deployment | Level 2 (named practitioner, CNBC/McKinsey) | 7/10 |
| HR/Sales are vendor noise, not practitioner signal | Level 3 (convergence of absence) | 7/10 |
| 95% failure rate / 40% cancellation predictions | Level 0 (analyst numbers) | Context only |

## Sources

1. https://www.cnbc.com/2025/09/30/jpmorgan-chase-fully-ai-connected-megabank.html — JPMorgan Chase blueprint, Derek Waldron interview
2. https://www.mckinsey.com/industries/financial-services/our-insights/jpmorgan-chases-derek-waldron-on-building-an-ai-first-bank-culture — Waldron on AI-first culture
3. https://claude.com/customers/novo-nordisk — Novo Nordisk / NovoScribe case study
4. https://opentools.ai/news/ai-revolutionizes-pharma-novo-nordisks-massive-time-cut-in-documentation — Novo Nordisk independent coverage
5. https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 — Klarna AI reversal
6. https://blog.langchain.com/customers-klarna/ — Klarna multi-agent architecture details
7. https://poly.ai/blog/klarna-ai-customer-service-lessons — Klarna lessons learned analysis
8. https://procureconsupplychain.wbresearch.com/blog/walmart-ai-chatbot-automate-supplier-negotiations — Walmart/Pactum procurement negotiation
9. https://ctl.mit.edu/news/how-ai-reshaping-supplier-negotiations — MIT CTL investigation of AI negotiation
10. https://pactum.com/understanding-agentic-ai-in-procurement-how-autonomous-ai-has-been-transforming-supplier-deals/ — Pactum agentic procurement
11. https://www.cnbc.com/2026/02/06/anthropic-goldman-sachs-ai-model-accounting.html — Goldman Sachs / Anthropic trade accounting (already in finance-accounting.md)
12. https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap — Composio pilot failure analysis
13. https://hyperight.com/2026-ai-depth-over-hype/ — "Agents struggling outside coding and narrowly defined workflows"
14. https://www.directual.com/blog/ai-agents-in-2025-why-95-of-corporate-projects-fail — MIT 95% failure rate claim
15. https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/12/09/the-era-of-agentic-business-applications-arrives-at-convergence-2025/ — Microsoft D365 agentic applications, CCBA
16. https://claude.com/blog/how-enterprises-are-building-ai-agents-in-2026 — Anthropic enterprise agent blog (vendor source)
17. https://pureai.com/articles/2025/10/22/why-klarnas-ai-experiment-matters.aspx — Klarna as real-world stress test
18. https://www.nasdaq.com/articles/how-goldman-scaling-ai-transform-its-business-operations — Goldman Sachs AI scaling
19. https://cloud.google.com/transform/ai-grew-up-and-got-a-job-lessons-from-2025-on-agents-and-trust — Google Cloud on agents and trust
20. https://www.americanbanker.com/payments/news/inside-klarnas-agentic-product-protocol — Klarna agentic protocol details
