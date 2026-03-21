# Agent Platform Watch — Cross-Platform Synthesis

Last updated: 2026-03-21 (cycle 16)
Total OODA cycles: 16 (dev sweep + business agent + architecture deep dives + trajectory analysis + vertical SaaS + open-source frameworks + multi-platform update)

## Purpose

Answer the CTO question: **Which platform can do which use cases for business users? Who is leading? Why?**

Not coding agents. Business agents — sales, finance, HR, compliance, operations, customer service. People who use SharePoint, not Git.

## The Bottom Line (March 2026)

**Nobody should be making non-two-way-door decisions on the agent landscape right now.** The entire business agent space is pre-chasm — OpenAI's own COO confirmed it. Every platform is immature. Every vendor story is 12-18 months ahead of reality. Betting small while making progress is what a smart CTO does.

**The hardest problem isn't choosing a platform — it's knowing what questions to ask.** A CTO facing 4 horizontal platforms, 5+ vertical SaaS vendors, open-source frameworks, and 200 internal processes can't even formulate the right question without agent competence. Every evaluation is shaped by whichever vendor presented last.

**The sequence that works: Competence → discovery → context → platform.**
- Build competence (people who can build agents)
- Discovery happens organically (people find their own high-value processes — you don't need a consultancy to tell them)
- Three infrastructure enablers emerge predictably (data access, runtime platform, discoverability)
- Platform questions become lightweight, reversible, two-way-door decisions — not heavyweight vendor evaluations

**Field evidence (F-Secure, March 2026):** After 2 modules of agent training, pretty much everyone started building — dashboards, agents, apps — unprompted. Competence created pull. The builders then hit three walls: (1) data access (need MCPs for Snowflake, Salesforce), (2) where do apps run, (3) how do others find and use what was built. These are the real questions — scoped, practical, answerable. Not "which of the four platforms should we bet on."

## The Framework: Personal → Team → Company Agents

| Level | What it means | Governance | Data access | Who builds it |
|-------|--------------|------------|-------------|---------------|
| **Personal** | Works for me, knows my context | None — I own it | Only what I can access | The user themselves |
| **Team** | Works for us, knows our processes | Who maintains? Who's accountable? | Team-level shared data | Power user or developer |
| **Company** | Works across boundaries, knows the org | Full — audit, access control, change mgmt | Cross-department, enterprise governance | IT/developers + business owners |

**The natural lifecycle:**
```
Personal agent works → "my team should have this" → Team agent → "this should be standard" → Company agent
```

**The gap nobody has filled:** No platform has designed the promotion path. You can't take a personal ChatGPT workflow and turn it into a governed team agent. You can't promote a Copilot Studio prototype into a Foundry-hosted production agent. Every transition means rebuilding.

## Platform Comparison: Business Agent Capabilities (March 2026)

Per-platform details in each platform's `state.md`. This is the cross-platform view.

### Where Business Users Actually Enter

| Platform | Personal agent | Team agent | Company agent | Promotion path |
|----------|---------------|------------|---------------|----------------|
| **Microsoft** | Copilot in M365 | Copilot Studio (PVA heritage) | Foundry (PaaS, Cosmos DB) | Three different products, different runtimes, no designed path |
| **Google** | Gemini in Workspace | Workspace Studio (GA Mar 19) | Vertex Agent Builder | Disconnected layers. Studio is new and limited (50 exec/day) |
| **OpenAI** | ChatGPT + Custom GPTs | ChatGPT Team/Enterprise | Frontier + AgentKit + Agents SDK | Most ambitious full-stack play. Frontier manages ALL vendor agents. |
| **Anthropic** | Claude Cowork + plugins | Private plugin marketplaces | Agent SDK (self-host) | Plugin architecture could enable promotion. Not documented yet. |

### Platform Trajectories (What They're Building Toward)

**Microsoft: The Azure of Agents.** Own the governance/identity/security layer, not the apps. Nadella: "SaaS will dissolve into agents on CRUD databases." Foundry = PaaS (3 agent types, most powerful in Preview). Copilot Studio = PVA heritage, hits ceiling fast. Separate runtimes, no promotion path. Agent 365 governance (May 2026) = infrastructure ahead of adoption. Existential threat: agents bypass Office via open-source file libraries. 15M Copilot seats but low conversion from 440M M365. (See `microsoft-365/state.md`)

**OpenAI: Agent Operating System.** Every layer from spec to governance: Open Responses spec → Agents SDK (19K stars) → Codex (Skills/Automations) → ChatGPT Agent → Frontier (multi-vendor governance) → AgentKit (visual builder). Skills = portable agent capabilities = closest to promotion path concept. Frontier manages agents from ALL vendors including Claude. Named customers: Uber, State Farm, Intuit. Vision most complete, deployment evidence zero. Altman predictions run 12-18mo ahead. (See `openai/state.md`)

**Anthropic: Standards + Best Engine — but infrastructure is failing.** Three-layer play: (1) open standards competitors adopt (MCP + Agent Skills), (2) model+runtime powering partners (Copilot Cowork), (3) own business surface (Cowork + plugins + marketplace). Computer Use (61.4% OSWorld) = sleeper for legacy integration. B2B marketplace launched Mar 6 (GitLab, Harvey, Snowflake). $100M partner network. **But: infrastructure fragility is now Level 3 convergence — 109 incidents in 90 days** (28 major, 81 minor, median 1h 8m). MCP enterprise governance being filled by third-party gateways (MintMCP, Stacklok, Lunar.dev), not Anthropic. Agent Teams = coding only, not business users. (See `claude-anthropic/state.md`)

**Google: Strong Architecture, Weak Execution.** Workspace Studio (GA Mar 19) is genuinely new — first real no-code agent builder. ADK strongest open-source framework. But GA launch plagued by capacity issues (63 outages in 24hrs), architectural limits (no webhooks, no state, no observability), and agent sprawl risk (ON by default, no lifecycle management). Gemini model stability undermines everything. Zero enterprise evidence. (See `google-workspace/state.md`)

**Vertical SaaS: Ahead in Their Lanes.** Salesforce Agentforce ($540M+ ARR, 9,500+ paid), Zendesk (51% auto-resolution at SeatGeek), ServiceNow ($600M+ ACV), SAP Joule (deepest ERP agents), HubSpot Breeze (SMB-accessible). Customer service is the breakthrough domain with convergence-level evidence. The vertical advantage: they own the data context. The limitation: strong only in their lane, no cross-enterprise capability. Nordic signal: Finnair (80% chat resolution) and reMarkable are global Agentforce showcases. (See `vertical-saas/state.md`)

### The Fifth Path: Open-Source Frameworks

**The vendor platforms may not win.** The alternative is: open-source framework + MCP + your own infrastructure. No vendor platform, no lock-in, no Azure/GCP dependency.

**Ruflo (rUv/Reuven Cohen)** — 22K GitHub stars, MIT licensed. Multi-agent orchestration with 60+ agents, swarm topologies, consensus algorithms. Crucially: **persistent memory/state** (AgentDB + RuVector knowledge graph) — the gap no vendor platform has filled. Plus agent registry with Q-learning routing, multi-provider support (Claude/GPT/Gemini/Ollama), and an IPFS plugin marketplace. Cohen is CTO of GenAI at EY Americas — sees both the builder world and enterprise reality. Adrian Cockcroft (ex-Netflix/AWS VP) validated it publicly.

**What Ruflo has (the 80%):** Orchestration, persistent memory, agent registry, multi-provider routing, cost optimization. These are the hard problems.

**What's missing (the enterprise 20%):** No RBAC/SSO, no promotion path concept (personal→team→company), no governance/audit trails, no multi-enterprise-system orchestration (routes across LLMs, not across Salesforce+Snowflake+Jira), still developer-only (no business user surface).

**Why this matters:** The missing 20% is integration and governance engineering — solvable with existing technology. If someone (Cohen or otherwise) adds the enterprise wrapper, the open-source path becomes the platform nobody expected. This is the threat to every horizontal vendor: the answer might be "framework + standards + your infra" — not a vendor platform at all.

**WATCH:** Does Ruflo evolve from developer tool to business platform? Does someone else wrap Ruflo's engine in an enterprise shell? See `source-roster.md` for tracking.

### Who Leads for Business Users? (Honest Assessment — Updated)

**Nobody leads.** OpenAI's own COO confirmed (Feb 24, 2026): "We have not yet really seen enterprise AI penetrate enterprise business process." MIT's GenAI Divide: 95% of organizations report no measurable ROI from AI.

**Microsoft has the best distribution** — but Copilot Studio is PVA heritage with a low ceiling, Foundry's best features are Preview, and practitioners report unreliable grounding.

**OpenAI has the most ambitious platform vision** — Frontier + AgentKit + Skills could become the agent OS. But everything is announced or limited availability. 900M users, 80% plain chat.

**Anthropic has the strongest model + standards position** — MCP and Agent Skills adopted by everyone. Computer Use solves the "no API" problem. But no managed hosting, infrastructure fragility, and the business surface (Cowork) is brand new.

**Google has the newest business user tool** — Workspace Studio just went GA. Worth watching, but unproven and limited.

## The Enterprise Integration Reality Test

A real enterprise agent must pass three tests that no platform currently addresses:

### 1. Multi-Tool (10-15+ systems simultaneously)
A real business environment looks like this:
**Salesforce, Snowflake, Redshift, Slack, Office 365, SharePoint, Jira, Confluence, Canva, Braze, Hightouch, ...**

An agent that can only talk to one or two systems is a toy. A sales meeting prep agent needs CRM (Salesforce) + data warehouse (Snowflake) + communication history (Slack) + documents (SharePoint/Confluence) + campaign data (Braze). That's 5 systems for ONE task.

| Platform | Native connectors | Cross-system orchestration | Verdict |
|----------|------------------|---------------------------|---------|
| **Microsoft** | 1,400+ connectors (Copilot Studio) | Power Automate (separate product, developer skill) | Broadest connector count but orchestration requires developers |
| **Google** | ~10 integrations (Workspace Studio) | Apps Script + Vertex AI (developer) | Far behind on integrations |
| **OpenAI** | Google/Microsoft write actions + Jira via Rovo MCP. 8+ new MCP connectors (March 2026). Still limited vs M365 1,400+ | None — single-player architecture | Evolving from read-only to write-capable. Still cannot orchestrate across 5+ systems. |
| **Anthropic/MCP** | 6,400+ MCP servers | Developer setup required | Richest ecosystem but zero business-user accessibility |

**The gap:** Connectors exist but orchestration across systems doesn't. Connecting to Salesforce AND Snowflake AND Slack in one agentic workflow requires custom development on every platform.

### 2. Multi-Turn (persistent memory, learning across sessions)
A business agent that forgets everything between sessions is a chatbot. A real agent:
- Remembers what it learned about a customer across meetings
- Builds knowledge over time (which proposals worked, which objections arose)
- Improves its outputs based on user corrections

| Platform | Session memory | Cross-session learning | Verdict |
|----------|---------------|----------------------|---------|
| **Microsoft** | Copilot has conversation memory | No persistent learning across sessions | Forgets between conversations. Crashes after 15-20 interactions. |
| **Google** | Workspace Studio: no state between runs | NotebookLM retains sources but not learning | No learning capability |
| **OpenAI** | Custom GPT instructions persist | Memory feature exists but no structured learning | Closest to persistent memory but no real learning loop |
| **Anthropic** | Claude Projects retain context | No cross-session learning | Context window, not memory |

**The gap:** No platform has agent memory that compounds over time. Every interaction starts from near-zero. This is the most fundamental missing capability for business agents.

### 3. Multi-Turn Learning (the agent gets better at YOUR job)
Beyond memory — the agent should learn patterns:
- "When Antti prepares for a CTO meeting, he always wants competitive positioning, not just product features"
- "This team's proposals that include ROI data close 2x more often"
- "The Finnish compliance team needs EU-specific citations, not US ones"

**No platform offers this.** This is the gap between current "agents" and what enterprises actually need. It's also the hardest technical problem — requiring persistent state, user-specific fine-tuning or retrieval, and feedback loops.

### 4. Enterprise Security (RBAC, access controls, audit trails)
An agent connecting to Salesforce + Snowflake + Slack must respect:
- **Role-based access control (RBAC):** The agent sees only what the USER is authorized to see. A sales rep's agent cannot access finance data. A regional manager's agent sees their region, not all regions.
- **Agent identity:** The agent acts AS the user, with the user's permissions — not as a superuser. Who is the agent when it writes to Jira?
- **Credential management:** How does the agent authenticate to 10 systems? OAuth per system? Delegated credentials? Stored secrets?
- **Audit trails:** Every action the agent takes must be traceable — who asked, what was accessed, what was changed, when.
- **Data residency:** When the agent pulls data from Snowflake and sends it to Slack, where does that data transit? Is PII exposed in the LLM context?
- **Skill-based permissions:** Different agent capabilities (read vs write vs delete) per system, per role, per task.

| Platform | Agent identity | RBAC | Credential mgmt | Audit | Verdict |
|----------|---------------|------|-----------------|-------|---------|
| **Microsoft** | Entra Agent ID (Foundry) | Entra-based for M365 | Azure Key Vault | Azure audit logs | Best infrastructure — but only for Microsoft ecosystem. Cross-system RBAC (SF + Snowflake) requires custom. |
| **Google** | Workspace identity | Workspace roles | Secret Manager | Cloud Audit Logs | Within Google ecosystem only. No cross-system RBAC. |
| **OpenAI** | None — agents have no identity | Enterprise SSO only | No credential management | No agent-level audit | **Biggest gap.** No concept of agent identity or RBAC. |
| **Anthropic/MCP** | None built-in | None built-in | Per-MCP-server | None built-in | MCP servers handle auth individually. No unified RBAC layer. |

**The gap:** Every platform handles security within its own ecosystem. None handles security ACROSS systems. When your agent connects to Salesforce AND Snowflake AND Jira, who governs what it can see in each? This is custom development on every platform today.

**Skills as a security concept:** Agents need skill-based permissions — "this agent CAN read Salesforce contacts but CANNOT modify pipeline data" or "this agent CAN draft Jira tickets but CANNOT close them." No platform offers granular skill-level permissions. It's all-or-nothing access per connector.

### What This Means for Platform Selection

The honest assessment: **no platform passes the enterprise integration reality test.** The question isn't "which platform is best" — it's "which platform gets closest, and how much custom development bridges the gap?"

For an environment with SF + Snowflake + Redshift + Slack + O365 + SharePoint + Jira + Confluence + Canva + Braze + Hightouch:
- **Microsoft** gets you O365 + SharePoint + Slack natively, and maybe Jira/Confluence via connectors. Everything else requires Power Automate or custom dev.
- **MCP ecosystem** (via Claude/Anthropic) has servers for most of these, but requires developer setup and has no business-user surface.
- **Custom build** (Agent SDK + MCP + custom state management) is likely the only path that actually works. Which means: you need engineering capability first, then the agent capability follows.

This is why the training journey matters: Bootstrap builds understanding, then platform advisory helps navigate this reality.

## Cross-Platform Patterns

**Pattern 1: No enterprise chasm-crossing signal — anywhere.** Zero named enterprises report production business agent deployments with measurable outcomes on any platform. **OpenAI's own COO confirmed this Feb 24, 2026:** "We have not yet really seen enterprise AI penetrate enterprise business process" ([TechCrunch](https://techcrunch.com/2026/02/24/openai-coo-says-we-have-not-yet-really-seen-ai-penetrate-enterprise-business-processes/)). MIT's GenAI Divide study: 95% of organizations report no measurable ROI from AI, only 5% of custom AI solutions reached production with sustained value ([Legal.io/MIT](https://www.legal.io/articles/5719519/MIT-Report-Finds-95-of-AI-Pilots-Fail-to-Deliver-ROI-Exposing-GenAI-Divide)).

**Pattern 2: The promotion path doesn't exist.** Every platform has personal, team, and enterprise tiers — but they're different products. Promoting an agent from personal to team to company means rebuilding, not upgrading.

**Pattern 3: Reliability is the bottleneck, not capability.** Microsoft: unreliable grounding. Google: model stability. OpenAI: usage limits. Anthropic: token efficiency. No platform is reliable enough for business-critical workflows.

**Pattern 4: MCP as cross-platform plumbing.** 6,400+ tool integrations, adopted by all four. Reduces lock-in. But requires developers to set up — not accessible to business users yet.

**Pattern 5: Framework > Platform for developers, but business users need Platform.** Developers prefer code-first frameworks (ADK, Agents SDK). Business users need visual builders with governance. These are different markets with different winners.

**Pattern 6: The real competition is M365 vs Workspace, not model vs model.** For business agents, the question isn't "which LLM is best" — it's "where do my employees already work?" That's Microsoft or Google for most enterprises.

**Pattern 7: Vertical SaaS is ahead of horizontal for domain-specific agents.** Customer service has convergence-level evidence (Level 3): Zendesk 51% auto-resolution, Salesforce 80% chat at Finnair, HubSpot 84% deflection at Zeffy. The structural advantage is data context — verticals own the data. But the advantage is narrow (one lane per platform) and most deployed "agents" are still copilots.

**Pattern 8: Customer service is the first domain to cross the agent threshold.** Across Zendesk, Salesforce, and HubSpot, customer service is where autonomous multi-step agents show real results. Clear success criteria (resolved or not) + bounded scope + human escalation tolerance = why this domain leads. Other domains (ERP, IT ops) are 6-12 months behind.

**Pattern 9: Outcome-based pricing is emerging.** Zendesk ($1.50-$2.00/resolution), Salesforce ($2/conversation), HubSpot (credits). Aligns incentives but creates budget unpredictability. This may become the standard pricing model for business agents.

**Pattern 10: Every vendor platform is infrastructure-locked.** Microsoft = Azure upsell. Google = GCP dependency. Even OpenAI's Frontier, while vendor-neutral for agents, requires OpenAI infrastructure. An AWS-native company evaluating any of these is implicitly evaluating an infrastructure migration. The open-source path (framework + MCP + own infra) is the only truly infrastructure-agnostic option.

**Pattern 11: The vertical SaaS ceiling is 1 of 200.** Salesforce gets Finnair to 80% chat resolution — impressive, but customer service is 1 of 200 processes Finnair runs. Every vertical SaaS agent automates one silo. The other 199 processes are unsolved. The vendor will sell you automation for the one process they own. The other 199 are yours to figure out.

**Pattern 12: Competence creates pull — people find their own processes.** (F-Secure field evidence, Level 2.) After agent training, people started building unprompted. They discovered their own high-value processes without a consultancy assessment. This inverts the traditional transformation sequence: instead of assess→identify→build→train, the sequence that works is train→they identify→they build→assess what worked.

**Pattern 13: Three predictable enablers emerge after competence.** (F-Secure field evidence, Level 2.) Builders hit three walls: (1) data access (agents need Snowflake, Salesforce, internal systems), (2) runtime platform ("where does this live?"), (3) discoverability ("how do others find and use what I built?"). These are the natural handoff from training to advisory/platform work — and they're scoped, practical, two-way-door decisions.

**Pattern 14: Computer use is the convergence point (NEW — cycle 16).** Both GPT-5.4 (75% OSWorld, Mar 2026) and Claude (61.4% OSWorld) now offer desktop interaction. This is the capability most relevant to legacy system integration — but neither has independent enterprise deployment evidence yet. GPT-5.4 surpasses human average (72.4%) on software navigation.

**Pattern 15: Reasoning models are paradoxically worse at facts (NEW — cycle 16).** OpenAI o3: 33% hallucination on PersonQA (vs 16% o1). DeepSeek R1: 14.3% (vs V3 base: 3.9%). The "smartest" models are least reliable on facts. For customer-facing agents, factual reliability must be tested separately from reasoning capability. ([Suprmind](https://suprmind.ai/hub/ai-hallucination-rates-and-benchmarks/))

**Pattern 16: Supervision architecture matters more than model quality (NEW — cycle 16).** Vertical Insure achieved "zero customer-facing hallucinations" via supervision layer, not better model. Salesforce's own portal: 62% resolution (target 80%, claimed 93%). The gap between claimed accuracy and real-world performance is the story across all vendors.

**Pattern 17: MCP governance is an ecosystem play, not vendor-provided (NEW — cycle 16).** 4+ third-party MCP gateways (MintMCP, Stacklok, Lunar.dev, Itential) filling the enterprise governance gap. Anthropic's MCP spec ships enterprise features as extensions. Enterprises must select and deploy a gateway themselves.

**Pattern 18: E7 pricing skepticism is convergent (NEW — cycle 16).** 5+ independent practitioners skeptical of Microsoft E7 at $99/user/month. Hidden consumption costs could push >$200/user. Copilot adoption baseline is only 3.3% (15M of 450M+ M365 seats). E7 faces the same distribution-vs-conversion challenge.

**Pattern 19: Consolidation wave in vertical SaaS (NEW — cycle 16).** ServiceNow + Moveworks ($2.85B), Zendesk + Forethought, Salesforce + Convergence.ai + Cimulate, NICE + Cognigy (~$955M). 50+ agentic AI acquisitions in 2 years. Platform landscape will look different in 6 months.

## CTO Answer: Which Platform For What? (March 2026)

| Business Use Case | Best Platform Today | Why | Caveat |
|-------------------|-------------------|-----|--------|
| Sales meeting prep (personal) | Claude Cowork / ChatGPT | Best reasoning (Claude) or broadest data integrations (ChatGPT: FactSet, MSCI, Moody's) | Personal only. Neither connects to your CRM without developer work. |
| Team sales playbook agent | Copilot Studio | M365 + CRM connectors, shareable in Teams | PVA heritage, ceiling at Q&A bots. Zero production evidence. |
| Finance reconciliation | Foundry (Workflow Agents) | Durable orchestration, Cosmos DB state, audit trails | Workflow Agents are Preview. Unreliable grounding reported. Requires developer. |
| HR onboarding workflow | Copilot Studio + Power Automate | M365 integration (SharePoint, Teams, Outlook) | Power Automate = rigid trigger-action. No conversational exception handling. |
| Compliance monitoring | **No clear leader** | None has proven cross-system monitoring | Entirely pre-chasm |
| Legacy system integration | Claude Computer Use | 61.4% OSWorld — works with ANY software user can see, no API needed | Beta. No enterprise deployment evidence. |
| Multi-system orchestration (5+ tools) | **Custom build** (Agent SDK + MCP) | Only path that actually connects SF + Snowflake + Slack + Jira + SharePoint | Requires engineering team. No platform does this natively. |
| Enterprise agent governance | OpenAI Frontier / Azure Agent 365 | Frontier: multi-vendor. Agent 365: M365-native. | Both announced, not proven. Frontier: limited availability. Agent 365: May 2026. E7 pricing skepticism widespread. |
| Customer service agent | **Zendesk or Salesforce Agentforce** | Zendesk: 51% auto-resolution (SeatGeek), outcome-based pricing. Salesforce: 80% chat resolution (Finnair), CRM integration. | Convergence-level evidence (Level 3). Bounded to customer service domain. |
| IT operations / employee service | **ServiceNow** | $600M+ ACV, strongest IT ops context. | Most orgs at Phase 2 despite Phase 3 aspirations. 18-33 month maturity path. |
| ERP / finance / supply chain | **SAP Joule** | Deepest business process agents (cash mgmt, procurement, production). Josh Bersin: "ahead of Workday." | Just reaching GA Q1 2026. Minimal production evidence. |
| Sales/marketing (SMB) | **HubSpot Breeze** | Most accessible for SMBs. 84% deflection at Zeffy. | Mostly copilot-level. 40% failure rate without config. |

### The Honest Answer for CTOs

**The hardest problem isn't choosing a platform. It's knowing what questions to ask.**

A CTO looking at this landscape sees: 4 horizontal platforms each telling a different story, 5+ vertical SaaS vendors each claiming their silo is the answer, standards (MCP, A2A, Agent Skills) that may or may not matter, and 200 internal processes nobody has evaluated for agent potential. The research landscape itself actively deceives — Google's evidence is circular, Microsoft's connector counts are misleading, OpenAI's vision runs 12-18 months ahead of reality. Even knowing what to research requires agent competence the organization doesn't yet have.

**The "which platform" question is premature.** No platform passes the enterprise reality test (multi-tool + multi-turn + security + promotion path). The entire business agent space is pre-chasm — OpenAI's own COO confirmed it. The table above is useful context, but acting on it without organizational understanding produces vendor-shaped decisions, not capability-shaped ones.

**What to do instead:**
1. **Build agent competence first** — without hands-on experience, the organization can't formulate real questions. Every evaluation will be shaped by whichever vendor presented last.
2. **Start with personal agents** — cheap ($20/mo), low risk. Discover which of your 200 processes actually benefit from agents vs. which are vendor fantasies.
3. **Identify YOUR 5 high-value candidates** — look for: bounded scope, clear success criteria, escalation tolerance, data mostly in one system. Those are the characteristics that make customer service work — find them in your other 199 processes.
4. **Then evaluate platforms against YOUR use cases** — not against vendor marketing. The infrastructure question matters: an AWS shop has different answers than an Azure shop.
5. **Plan for custom development** — multi-system orchestration requires engineering on every platform. Build on standards (MCP, Agent Skills), not vendor lock-in.

**The sequence matters:** Competence → discovery → context → platform. Skip to platform selection and you're choosing between marketing stories.

## What We Did Not Find

- **Business user building an agent without developer help** — on any platform. The zero-code promise is unfulfilled.
- **Personal→team agent promotion** — on any platform. The lifecycle doesn't exist as a designed feature.
- **Named enterprise with business agents in production** — on any platform. The entire space is pre-chasm.
- **Nordic companies using business agents on horizontal platforms** — zero findings on Microsoft, Google, or OpenAI.
- ~~**Vertical SaaS agent capabilities** — not yet researched.~~ **RESEARCHED (cycle 13-14).** Vertical SaaS IS ahead for domain-specific use cases. Customer service has convergence-level evidence. See `vertical-saas/state.md`.
- **Nordic vertical SaaS signal found:** Finnair (Agentforce, 80% chat resolution — independently verified) and reMarkable (Agentforce, vendor-sourced). Salesforce opened Stockholm office Dec 2025. ServiceNow acquired Nordic Advania's Quality 360. No Nordic signal for Zendesk, SAP Joule, or HubSpot.

## Research Priorities (Hourly Cycle — Semi-Autonomous)

The hourly researcher uses `cycle-prompt.md` and can make divergent choices. Standing priorities:

1. **Open-source framework evolution** — does Ruflo or similar add the enterprise 20% (RBAC, governance, audit)? Does someone wrap it? Track rUv's GitHub activity and forks.
2. **Enterprise integration reality** — who is connecting 5+ systems in one agentic workflow? Practitioners, not demos.
3. **Agent memory / learning** — Ruflo's AgentDB is the most advanced. Anyone else? Anyone deploying it in enterprise?
4. **Vertical SaaS deep-dives** — Salesforce Agentforce practitioner experience beyond customer service. ServiceNow deployment reality. SAP Joule early GA results.
5. **Frontier/AgentKit in practice** — what are Uber/State Farm/Intuit actually running on OpenAI Frontier?
6. **Workspace Studio adoption** — just went GA (Mar 19). Watch for practitioner reports beyond the capacity issues.
7. **F-Secure pattern replication** — do other organizations hit the same three walls (data access, runtime, discoverability)?
8. **MCP enterprise governance** — when does SSO/audit ship?
9. **Computer Use in enterprise** — anyone using it for legacy system integration?
10. **Domain practitioner discovery** — who are the innovator practitioners per business function? (Links to domain research: `../source-roster.md`)

## Run Log

| Run | Time | Focus | Key Finding |
|-----|------|-------|-------------|
| 0-3 | 2026-03-21 | All platforms (dev focus) | Initial sweep. No enterprise evidence on any platform. |
| 4-7 | 2026-03-21 | All platforms (business focus) | Microsoft: lite ceiling. Google: Workspace Studio new. OpenAI: 900M users, 80% chat. Zero business agent deployments anywhere. |
| 8 | 2026-03-21 | OpenAI (business update) | Connectors evolving to write-capable. Enterprise controls improving. |
| 9 | 2026-03-21 | Microsoft (integration reality) | "1,400 connectors" misleading. No cross-system identity/audit/memory. Power Automate is bottleneck. |
| 10 | 2026-03-21 | OpenAI (trajectory) | Building agent OS: Spec→SDK→Codex→Frontier→AgentKit. Most ambitious stack. Skills = promotion path concept. |
| 11 | 2026-03-21 | Microsoft (architecture) | Foundry = PaaS (best features Preview). Studio = PVA heritage. Separate runtimes, no promotion. Nadella sees existential threat. |
| 12 | 2026-03-21 | Anthropic (trajectory) | Three-layer play: standards + engine + own surface. Computer Use = legacy integration sleeper. Infrastructure fragility risk. |
| 13 | 2026-03-21 | Google (GA reality check) | Workspace Studio GA plagued by capacity issues. Architectural limits prevent enterprise use. All deployment claims vendor-sourced. |
| 14 | 2026-03-21 | Vertical SaaS (initial survey) | Customer service = convergence-level. Vertical SaaS ahead in domain lanes. Finnair/reMarkable = Nordic signal. SAP deepest ERP agents. |
| 15 | 2026-03-21 | Open-source frameworks (Ruflo) | 80% of gaps solved (orchestration, memory, registry). Missing 20% = enterprise wrapper (RBAC, governance, audit). Could disrupt all vendor platforms. |
| 16 | 2026-03-21 | All platforms (multi-platform update) | Anthropic infra fragility Level 3 (109 incidents/90d). E7 pricing skepticism convergent. GPT-5.4 computer use. Agentforce own portal 62%. MCP governance = third-party ecosystem. Reasoning models worse at facts. Consolidation wave. |
