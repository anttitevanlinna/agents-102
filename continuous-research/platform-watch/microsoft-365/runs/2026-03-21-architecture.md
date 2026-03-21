# Microsoft Agent Platform Architecture Deep Dive — 2026-03-21

**Focus area:** What is Foundry REALLY? What is Copilot Studio REALLY? How do they relate?

## Queries Used
- "Azure AI Foundry architecture how it works technically 2026"
- "Azure AI Foundry Agent Service durable orchestration architecture"
- "Copilot Studio architecture what runs agents Power Platform"
- "Copilot Studio vs Azure AI Foundry relationship difference"
- "Microsoft agent platform landscape Foundry Copilot Studio AutoGen Semantic Kernel"
- "Azure AI Foundry multi-model routing MCP A2A protocol"
- "Microsoft agent strategy roadmap Satya Nadella 2026"
- "Copilot Studio real limits what business users can actually build"

## Finding 1: Foundry Is a PaaS Layer, Not a Runtime
**Source:** https://learn.microsoft.com/en-us/azure/foundry/concepts/architecture — [vendor documentation]
**Date:** March 2026
**What:** Foundry (rebranded from Azure AI Foundry to "Microsoft Foundry") is organized into Foundry Resource → Project → Project Assets. Shares the `Microsoft.CognitiveServices` resource provider namespace with Azure OpenAI, Speech, Vision, Language. It's an extension of existing cognitive services infrastructure, not a new runtime.
**Key claims:** Three-tier resource model; shares namespace with Azure OpenAI; PaaS not runtime.

## Finding 2: Three Agent Types in Foundry Agent Service
**Source:** https://learn.microsoft.com/en-us/azure/foundry/agents/overview — [vendor documentation]
**Date:** March 2026
**What:** Agent Service provides three distinct agent types:
- **Prompt Agents** — no-code, configuration-driven. What most demos show.
- **Workflow Agents (Preview)** — declarative multi-step orchestration, visual or YAML. Multi-agent coordination.
- **Hosted Agents (Preview)** — code-based containers, any framework. Where real enterprise agents would live.
Infrastructure: Cosmos DB (state), Azure Storage, Azure AI Search. Durable orchestration = Cosmos DB persistence, NOT Azure Durable Functions.
**Key claims:** Three agent types; Workflow and Hosted are Preview; Cosmos DB for state persistence.

## Finding 3: Multi-Model Routing Is Azure OpenAI Only
**Source:** https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-dec-2025-jan-2026/ — [vendor documentation]
**Date:** Jan 2026
**What:** Model Router routes between Azure OpenAI models only, not cross-provider. 11,000+ models in catalog available for selection but not dynamic routing. A single agent uses a single model deployment. Copilot Studio now supports GPT-4.1 (default), GPT-5, and Claude Sonnet 4.5 (beta, Computer Use agents only).
**Key claims:** Router is Azure OpenAI only; Claude Sonnet available in Copilot Studio (beta, Computer Use only).

## Finding 4: MCP + A2A — Architecture, Not Production
**Source:** https://azure.microsoft.com/en-us/blog/agent-factory-connecting-agents-apps-and-data-with-new-open-standards-like-mcp-and-a2a/ — [vendor press release, Level 0]
**Additional:** https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol — [vendor documentation]
**Additional:** https://www.infoq.com/news/2026/01/azure-functions-mcp-support/ — [tech press, Jan 2026]
**What:** Foundry hosts MCP servers at mcp.ai.azure.com with Entra auth. Logic Apps and Azure Functions support MCP, turning Power Platform connectors into MCP-accessible tools. A2A Tool (Preview) lets agents call any A2A endpoint cross-cloud. CRITICAL: In Copilot Studio, MCP fails if attached to child agent — must proxy through parent. Breaks multi-agent architectures.
**Key claims:** MCP hosting exists; 1,400 connectors exposed as MCP tools; A2A is Preview; child-agent MCP is broken.

## Finding 5: Copilot Studio = Power Virtual Agents on Power Platform
**Source:** https://www.epcgroup.net/blog/microsoft-copilot-studio-enterprise-guide — [consulting firm analysis, 2026]
**Additional:** https://ragnarheil.de/the-good-the-bad-and-the-ugly-of-copilot-studio-a-brutally-honest-review-going-into-late-2025/ — [practitioner direct, Microsoft MVP]
**Additional:** https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas — [vendor documentation]
**What:** Copilot Studio is architecturally descended from Power Virtual Agents. Runs on Power Platform runtime within Dataverse. Three layers: Authoring (visual canvas) → Runtime (intent classification, knowledge retrieval, Azure OpenAI generation, Power Automate triggers) → Integration (connectors, channels). Executes within Dataverse environment with RPM quotas.
**Practitioner limits (Microsoft MVP):** Knowledge base degrades beyond ~500 docs. Files from SharePoint must be <7MB. Can't write/run code. Child agents can't run MCP servers. Legacy PVA framework constrains orchestration. Debugging is opaque. Teams deployment doesn't auto-update. English-only for generative features. No governance to prevent agent sprawl.
**Key claims:** PVA heritage; Dataverse runtime; 500-doc knowledge ceiling; child-agent MCP broken; English-only generative.

## Finding 6: Copilot Studio and Foundry Are Separate Platforms
**Source:** https://techcommunity.microsoft.com/blog/microsoft-security-blog/microsoft-copilot-studio-vs-microsoft-foundry-building-ai-agents-and-apps/4483160 — [vendor blog]
**What:** Copilot Studio = SaaS (Microsoft manages everything, Power Platform runtime). Foundry = PaaS (you deploy and manage, Azure cognitive services runtime). No documented migration or promotion path between them. Interop via A2A protocol, not agent portability. "Almost any agent you can build in Copilot Studio can also be built in Foundry, but not the reverse." Foundry is the superset.
**Key claims:** SaaS vs PaaS; no promotion path; Foundry is superset; interop via A2A only.

## Finding 7: Semantic Kernel + AutoGen → Microsoft Agent Framework
**Source:** https://visualstudiomagazine.com/articles/2025/10/01/semantic-kernel-autogen--open-source-microsoft-agent-framework.aspx — [tech press, Oct 2025]
**What:** Semantic Kernel and AutoGen merged into unified Microsoft Agent Framework. Both now in maintenance mode. Framework offers two orchestration styles: Agent Orchestration (AutoGen DNA, LLM-driven, dynamic) and Workflow Orchestration (Semantic Kernel DNA, deterministic, business-logic).
**Key claims:** SK + AutoGen merged; both in maintenance; two orchestration styles.

## Finding 8: Nadella's Strategic Vision — "SaaS Dissolves Into Agents"
**Source:** https://siliconangle.com/2026/02/28/satyas-sacrifice-agents-threaten-office-microsoft-responds/ — [tech press analysis, Feb 2026]
**Additional:** https://windowsnews.ai/article/microsofts-2026-copilot-reorganization-four-pillars-one-ai-strategy.405446 — [tech press, Mar 2026]
**Additional:** https://www.techbuzz.ai/articles/nadella-s-new-blog-signals-microsoft-s-shift-to-ai-systems-over-models — [tech press, 2026]
**What:** Nadella: "SaaS will dissolve into a bunch of agents sitting on top of CRUD databases." March 2026 reorg: Copilot split into 4 divisions (Experience, Platform, M365, Superintelligence) under unified leadership. Suleyman shifted to frontier models to reduce OpenAI dependence. Microsoft sees the existential threat: Claude/agents can operate on Office formats without Microsoft apps. Response: own the governance/identity/security layer, not the apps. 15M paid Copilot seats (160% YoY) but low conversion from 440M M365 users. Some enterprises downgrading.
**Key claims:** "SaaS dissolves" quote; 4-division reorg; Suleyman to frontier models; 15M Copilot seats; some enterprises downgrading.

## Finding 9: The Existential Threat Microsoft Sees
**Source:** https://siliconangle.com/2026/02/28/satyas-sacrifice-agents-threaten-office-microsoft-responds/ — [tech press analysis, Feb 2026]
**What:** Anthropic's Claude Cowork and similar tools can operate on Office file formats directly using open-source libraries — no Microsoft applications needed. Agents don't need to work through Office. This reduces Office from central workspace to pluggable components. Microsoft's likely response: Copilot Pages as new work surface where Word/Excel/PowerPoint are plugins. Sacrifice Office dominance to own the platform layer.
**Key claims:** Agents bypass Office via open-source file libraries; Copilot Pages as replacement surface.

## What I Looked For But Did Not Find
- **Any named company building a non-coding business agent on Foundry.** Zero. All evidence is architecture docs and demos.
- **Successful multi-agent deployments.** Workflow Agents and A2A are both Preview. The MVP who tested multi-agent found MCP broken on child agents.
- **Cross-platform agent portability.** No documented way to promote Copilot Studio agent to Foundry.
- **Hosted Agents in production.** Preview, no private networking support yet.
- **Working agent memory for custom agents.** Memory listed as "preview tool" with caveats.

## Orientation

Microsoft is building the Azure of agents — own the infrastructure layer (identity, governance, security, state) that all agents run on, regardless of model vendor. Foundry is the PaaS; Copilot Studio is the SaaS entry point; Agent Framework is the SDK. But the most powerful capabilities (Hosted Agents, Workflow Agents, A2A, memory) are all in Preview. Copilot Studio is architecturally constrained by its Power Virtual Agents heritage. The gap between what's announced and what's production-ready is 6-12 months. Meanwhile, the existential threat is real: agents that bypass Office entirely.
