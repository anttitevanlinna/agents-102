# RPA-to-Agent Platforms — Platform State

Last updated: 2026-04-02 (cycle 1)
OODA cycles: 1

## Focus

The RPA-to-agent transition: can enterprises extend existing RPA investments into agentic automation, or is the architectural gap too wide? Tracks UiPath, Automation Anywhere, Power Automate, and workflow automation tools (Zapier, Make). Critical for Nordic enterprises — most large Nordic companies have significant UiPath or Automation Anywhere investments. This is the "should we upgrade or start over?" question.

## Key Verdict (as of 2026-04-02)

**Every RPA vendor is pivoting to "agentic" — but the pivot is mostly architectural lipstick on deterministic foundations.** UiPath (Maestro + Agent Builder) and Automation Anywhere (AI Agent Studio + Process Reasoning Engine) both ship agent orchestration layers on top of their existing bot execution engines. Power Automate bolts Copilot Studio agents onto cloud flows. All three claim "agentic automation" but the core pattern is the same: LLM reasoning sits on top, deterministic RPA executes underneath, human-in-the-loop gates the handoff.

**What's real:** Self-healing UI automation (agents fix broken selectors), document processing with LLM reasoning, and multi-step orchestration that mixes bots + APIs + humans. These are genuine improvements over pure RPA.

**What's not proven:** Truly autonomous multi-turn agents running enterprise processes end-to-end. Zero independent evidence of production deployments where agents reason across multiple systems without pre-defined workflow paths. Every "success story" traces back to vendor press releases or partner case studies — Level 0 evidence.

**The honest answer for now:** RPA vendors are adding an AI reasoning layer, not building native agent platforms. This makes existing RPA investments more valuable (self-healing, document AI, smarter routing), but it is NOT the same as building agents from scratch on native agent platforms (Claude, OpenAI, Bedrock). Whether the hybrid approach is "good enough" for enterprise use cases remains unproven by independent evidence.

## UiPath — Agentic Automation Platform

### Product Stack
- **Agent Builder** — visual canvas in Studio for building AI agents. Debug tooling, optimization, reusable templates. [vendor press release] ([UiPath](https://www.uipath.com/product/agent-builder))
- **Maestro** — agentic orchestration layer. Coordinates agents, robots, APIs, humans in unified workflows. GA 2026. [vendor press release] ([UiPath](https://www.uipath.com/platform/agentic-automation/agentic-orchestration))
- **AI Trust Layer** — LLM gateway with PII pseudonymization, audit trails, governance policies. Centralized proxy for all LLM calls. [vendor press release] ([UiPath](https://www.uipath.com/platform/agentic-automation/foundation))
- **Autopilot** — natural language automation builder for business users
- **MCP support** — UiPath blogs about MCP as "universal connector" for agent-to-tool communication. [vendor press release] ([UiPath blog](https://www.uipath.com/blog/product-and-updates/model-context-protocol-mcp-universal-connector))
- **A2A involvement** — UiPath is listed among 50+ A2A protocol partners. [domain trade publication] ([Medium/Vishal Mysore](https://medium.com/@visrow/a2a-mcp-ag-ui-a2ui-the-essential-2026-ai-agent-protocol-stack-ee0e65a672ef))

### Architecture
The pattern: LLM reasoning (via OpenAI, Gemini, Azure AI Foundry, or NVIDIA integrations) provides the "thinking." UiPath robots provide the "doing." Maestro orchestrates the handoff. AI Trust Layer governs what data flows to LLMs. This is a hybrid architecture — not a native agent runtime.

Self-healing: when a UI element changes, the agent uses AI to identify the correct element and continue execution. This is real and solves a genuine RPA pain point (UI fragility).

### Evidence Assessment
- **SunExpress case:** claimed $200K savings, cut months of manual work. [vendor press release] — sourced only from UiPath newsroom. Level 0.
- **HR onboarding scaling:** 200 to 800+ employees/week. [vendor press release] — sourced from UiPath/partner materials. Level 0.
- **Deloitte Agentic ERP partnership:** launched March 2026. Record to Report, Source to Pay, Lead to Cash. [vendor press release] ([TechAfrica News](https://techafricanews.com/2026/03/16/uipath-and-deloitte-expand-alliance-with-launch-of-agentic-erp-for-enterprise-automation/))
- **No independent deployment evidence found.** Zero practitioner reports, zero third-party case studies with verified metrics.

### Financials (context)
- Q1 FY2026 revenue: $357M (+6% YoY). ARR: $1.693B (+12% YoY). [general press] ([Yahoo Finance](https://finance.yahoo.com/news/uipath-inc-path-q1-2026-070851580.html))
- Non-GAAP operating income: $70M (20% margin, +450bps YoY)
- Cash: $700M, no short-term debt
- Full-year guidance: $1.549-1.554B revenue
- Interpretation: financially stable, but 6% revenue growth for the "hottest category in enterprise software" is... modest. Not the hockey stick you'd expect if agentic was driving real expansion.

### Nordic Signal
- Digital Workforce (Finnish company) is a UiPath partner with offices across Nordics (Finland, Sweden, Denmark, Norway). [general press] ([Digital Workforce](https://digitalworkforce.com/rpa-news/digital-workforce-partners-with-uipath-to-offer-rpa-services-from-cloud/))
- UiPath has run "Automation First Power-Up Nordics" events. [vendor press release] ([UiPath](https://www.uipath.com/solutions/webinars/automation-first-power-up-nordics))
- No specific Nordic agentic deployment evidence found.

## Automation Anywhere — Agentic Process Automation (APA)

### Product Stack
- **AI Agent Studio** — build and manage goal-driven AI agents. Integrates with Amazon Bedrock, OpenAI, Google AI. [vendor press release] ([Automation Anywhere](https://www.automationanywhere.com/products/ai-agent-studio))
- **Process Reasoning Engine (PRE)** — the key differentiator claim. Trained on 400M+ enterprise flow data (process, UI, documents). Determines next enterprise action, orchestrates across systems. Self-healing, adaptive. [vendor press release] ([Automation Anywhere](https://www.automationanywhere.com/products/process-reasoning-engine))
- **OpenAI partnership** — announced January 2026. OpenAI models for reasoning, PRE for governed execution. [vendor press release] ([PR Newswire](https://www.prnewswire.com/news-releases/automation-anywhere-advances-ai-native-agentic-solutions-for-the-enterprise-with-openai-302664278.html))
- **BPMN 2.0 workflow design** — drag-and-drop orchestration of agents, bots, APIs, documents, human experts

### Architecture
Similar hybrid pattern to UiPath: LLM reasoning on top, deterministic execution underneath, human-in-the-loop governance. The PRE is the interesting piece — if the "400M+ enterprise flows" training claim is real, this is a domain-specific model that understands enterprise process patterns, not just a generic LLM wrapper.

The PRE claim: "self-healing, adaptive workflow intelligence" that "learns with every run." [vendor press release] — no independent verification of these claims.

### Evidence Assessment
- **Q1 FY2026 financials:** "strong bookings growth," 51% APA attach rate in installed base. [vendor press release] ([Automation Anywhere](https://www.automationanywhere.com/company/press-room/automation-anywhere-reports-strong-q1-fiscal-year-2026-growth-and-profitability))
- **Gartner MQ Leader:** 7th consecutive year. [analyst — Level 0]
- **No independent deployment evidence found.** Zero practitioner reports of PRE or AI Agent Studio in production.
- The 51% attach rate is interesting — it suggests existing RPA customers are buying APA add-ons. But buying ≠ deploying ≠ getting results.

### Nordic Signal
- No specific Nordic presence or deployment evidence found in this cycle.

## Power Automate — Microsoft's Automation + Agent Layer

### Product Stack
- **Desktop flows + AI self-healing** — AI fixes broken UI selectors. GA in 2026 Wave 1. [vendor press release] ([Microsoft Learn](https://learn.microsoft.com/en-us/power-platform/release-plan/2026wave1/))
- **Copilot Studio agents in cloud flows** — autonomous agents trigger on events (inbox sentiment, database changes). No pre-defined path required. [vendor press release] ([Microsoft](https://www.microsoft.com/en-us/power-platform/blog/power-automate/advancing-automation-with-new-ai-capabilities-in-power-automate/))
- **Generative actions** — AI-powered steps that reason through unstructured content
- **AI Builder** — pre-built AI models (document processing, text classification) embedded in flows
- **Process mining** — object-centric process mining GA in 2026 Wave 1
- **Governance agents** — AI-powered tenant monitoring and remediation for admins

### Architecture
Power Automate is architecturally different from UiPath/AA — it's not a standalone RPA platform but part of the Microsoft Power Platform + Microsoft 365 + Azure ecosystem. The agent layer comes from Copilot Studio, not from Power Automate itself. Desktop flows handle RPA-style UI automation. Cloud flows handle API-to-API orchestration. Copilot Studio agents add LLM reasoning.

**Advantage:** deepest integration with Microsoft 365 (Exchange, SharePoint, Teams, Dynamics). For Microsoft-native enterprises, this is the lowest-friction path.

**Disadvantage:** governance complexity. Power Platform admin controls, Copilot Studio controls, Entra ID, Purview — multiple governance surfaces that don't always align.

### Evidence Assessment
- All capabilities sourced from Microsoft Learn docs and Microsoft blog posts. [vendor press release]
- No independent deployment evidence of Power Automate + Copilot Studio agents in production.
- The "autonomous workflow with ML-based decisions and full audit trails" capability described in search results could not be verified beyond Microsoft's own documentation.

### Nordic Signal
- Microsoft has massive Nordic enterprise presence (obvious — most Nordic enterprises run Microsoft 365).
- Power Automate is widely deployed in Nordic enterprises for basic workflow automation.
- No specific evidence of Nordic enterprises using Power Automate's agentic capabilities.

## Workflow Automation: Zapier and Make

### Zapier
- **Zapier Agents** — AI agents that work across 7,000+ app integrations. Process leads, manage support tickets, execute multi-step workflows. [vendor press release] ([Zapier](https://zapier.com/agents))
- Natural language Zap creation, AI chatbots, autonomous multi-step workflows
- Exploring MCP, AG-UI, human-in-the-loop for 2026. [vendor press release] ([Zapier](https://zapier.com/resources/events/automation-now-next-ai-agents-and-whats-coming-in-2026))
- **Position:** SMB-focused. Not enterprise-grade governance. But the 7,000+ integrations make it the widest connector layer available.

### Make (formerly Integromat)
- **Make AI Agents** — agents as first-class citizens in the visual Scenario Builder. [vendor press release] ([Make](https://www.make.com/en/blog/next-generation-make-AI-agents))
- Next-gen: redesigned UI, reasoning panel, multimodal inputs (documents, images, audio)
- 400+ pre-built AI app integrations
- **Position:** prosumer/SMB. More technical than Zapier, stronger visual workflow builder.

### Evidence Assessment
- Both are vendor self-descriptions. Level 0.
- Neither Zapier nor Make has independent evidence of enterprise-scale agentic deployments.
- Relevant for the research because they represent the "workflow automation going agentic" path, distinct from the "RPA going agentic" path.

## RPA vs. Agent: What's Architecturally Different

| Dimension | Traditional RPA | RPA + Agent Layer (UiPath/AA 2026) | Native Agent Platform (Claude/OpenAI) |
|-----------|----------------|--------------------------------------|---------------------------------------|
| **Core logic** | Pre-defined rules, step-by-step scripts | Rules + LLM reasoning at decision points | LLM reasoning drives the entire flow |
| **Handling exceptions** | Fails or escalates on any deviation | LLM attempts to reason through exceptions | Agent reasons through exceptions natively |
| **UI interaction** | Screen scraping, selectors (fragile) | Self-healing selectors (AI-assisted) | Computer use agents (early, unreliable) |
| **Multi-system** | Pre-built connectors, API calls | Same + LLM-assisted routing | Tool use (MCP), API calls, code execution |
| **Unstructured data** | Cannot process | Document AI, LLM extraction | Native LLM capability |
| **Governance** | Role-based, audit logs | AI Trust Layer, PII masking, LLM gateway | Emerging (no mature equivalent yet) |
| **Deployment model** | Bot licenses, orchestrator | Same + LLM API costs | API usage, token costs |
| **Vendor lock-in** | High (proprietary bots) | Higher (bots + proprietary agent layer) | Lower (model-agnostic possible) |
| **Who builds** | RPA developers (specialized skill) | RPA developers + AI skills needed | Software developers, prompt engineers |
| **Enterprise readiness** | Mature (10+ years) | Maturing (1-2 years) | Early (governance gaps) |

**The fundamental tension:** RPA vendors are adding AI on top of deterministic foundations. Native agent platforms are building from AI-first foundations. The RPA approach preserves existing investments and enterprise governance. The native approach is more architecturally coherent but lacks enterprise-grade governance.

## The CTO Question: "We Have RPA. What Now?"

**Three options, honestly assessed:**

### Option 1: Extend RPA to Agentic (UiPath Maestro / AA APA)
- **Pro:** Preserves existing RPA investment. Existing bots still run. Governance and compliance infrastructure transfers. Your RPA developers have jobs.
- **Pro:** Self-healing and document AI are real, immediate value-adds that reduce the #1 RPA pain point (maintenance costs eating 70-75% of automation budgets — [SOURCE NEEDED, commonly cited but original methodology unclear]).
- **Con:** You're adding complexity to an already complex stack. LLM reasoning + deterministic bots + human-in-the-loop + governance = many moving parts.
- **Con:** Zero independent evidence that the "agentic" layer delivers autonomous multi-turn processing in production. All evidence is vendor-sourced.
- **Con:** Vendor lock-in deepens. Your bots were already proprietary; now your agent orchestration is too.
- **Verdict:** Safe bet for incremental improvement. Not a transformation play.

### Option 2: Build Native Agents (Claude/OpenAI/Bedrock)
- **Pro:** Architecturally coherent — reasoning and execution in one system.
- **Pro:** Coding agents can build and iterate on their own tooling (the compounding advantage).
- **Pro:** Model-agnostic possible; less vendor lock-in on the execution layer.
- **Con:** Enterprise governance is immature. No equivalent of UiPath's AI Trust Layer with 10 years of compliance track record.
- **Con:** Requires software engineering capability, not RPA developers.
- **Con:** Doesn't leverage existing RPA investment at all — it's a parallel track.
- **Verdict:** Higher ceiling, higher risk, higher skill requirement.

### Option 3: Hybrid — RPA for Deterministic, Agents for Reasoning
- **Pro:** Uses RPA where it excels (stable, high-volume, rules-based tasks) and agents where they excel (exceptions, unstructured data, multi-step reasoning).
- **Pro:** Pragmatic migration path — doesn't require ripping out existing automation.
- **Con:** Two systems to govern, two skill sets to maintain, integration complexity.
- **Con:** The "hybrid" framing is exactly what RPA vendors are selling — so you need to distinguish between "hybrid by architectural choice" and "hybrid because the vendor bolted AI onto their existing product."
- **Verdict:** Most likely path for large enterprises with significant RPA investment. But be honest: this is a transition strategy, not an end state.

**The Nordic angle:** Large Nordic companies (telecom, banking, energy, logistics) typically have 3-7 year RPA investments with UiPath or Automation Anywhere, 50-500 bots in production, and dedicated RPA teams. Telling them to abandon this is unrealistic. The real question is: can the agentic layer on top of RPA deliver enough value to justify the additional complexity, or should new agentic use cases be built natively?

**Our current assessment:** We don't know yet. The evidence doesn't exist. Every "success story" is a vendor press release. This is a critical gap in the research.

## What We Did Not Find

- **Zero independent practitioner reports** of UiPath Maestro or AA PRE in production. Every case study traces to vendor marketing.
- **Zero head-to-head comparisons** by practitioners who tried both the RPA-agent and native-agent approaches on the same use case.
- **Zero Nordic-specific agentic RPA deployments.** We know RPA is widely deployed in the Nordics; we don't know if anyone has turned on the agentic layer.
- **No evidence on the maintenance cost question:** Does adding an agent layer reduce or increase total maintenance burden? The vendors claim reduction (self-healing). No one has independently verified this.
- **No evidence on the "Process Reasoning Engine" claim.** AA says PRE is trained on 400M+ enterprise flows. No third party has validated the architecture, the training data, or the outcomes.
- **No clarity on EU AI Act compliance** for RPA+agent hybrid systems. The August 2026 full applicability date is approaching. How do UiPath's AI Trust Layer and AA's governance map to the Act's requirements? Unknown.

## What We Need To Learn

- [ ] Independent enterprise deployment evidence — anyone running UiPath Maestro or AA AI Agent Studio in production with measurable results?
- [ ] Practitioner comparison — has anyone tried both RPA-agent and native-agent approaches?
- [ ] Nordic signal — which Nordic enterprises are piloting agentic RPA? Digital Workforce (Finland) is the obvious lead to follow.
- [ ] Self-healing ROI — does AI-assisted self-healing actually reduce maintenance costs? By how much?
- [ ] PRE validation — has anyone independently tested Automation Anywhere's Process Reasoning Engine claims?
- [ ] EU AI Act readiness — how do RPA+agent governance layers map to the Act's transparency and accountability requirements?
- [ ] Power Automate + Copilot Studio — any enterprise running this combination for process automation (not just chatbots)?
- [ ] Zapier/Make at enterprise scale — anyone using these for serious business process automation, or are they stuck in SMB territory?
- [ ] Total cost comparison — RPA license + agent layer + LLM API costs vs. native agent platform costs for equivalent use cases
- [ ] The "process mining to agent" pipeline — UiPath and AA both have process mining. Does mined process data actually improve agent performance?

## Sources

All sources listed inline with source type labels. Key limitation: this initial cycle found zero Level 2+ evidence. Every deployment claim is Level 0 (vendor press release) or Level 1 (opinion). The RPA-to-agent transition is, as of April 2026, an evidence desert.
