# Agent Platform Watch — Living Synthesis

Last updated: 2026-03-21
Total research runs: 4

## Purpose

Track the latest developments, features, and practitioner experiences across the four leading business agent platform ecosystems. Updated incrementally — each hourly run adds findings and re-synthesizes.

## Platforms Tracked

### 1. OpenAI — ChatGPT Codex + Adjacent System
<!-- Latest developments, features, real user experiences -->

**Latest model:** GPT-5.3-Codex (Feb 2026) — combined coding + reasoning, 25% faster. GPT-5.4 announced as flagship. Codex app (March 2026) adds worktrees, skills, automations, plugin system. Codex Security (March 2026) — new appsec agent for vulnerability analysis.

**What it does well:** Cloud-parallel coding agent. Practitioner reports 85-90% success on well-scoped maintenance tasks (up from 40-60% in mid-2025). Mid-task steering (redirect agent without losing context). Strong GitHub integration. Pricing favorable at $20/mo Plus tier. GPT-5 costs ~half of Sonnet, ~1/10th of Opus in production. 1.6M weekly active users reported (March 2026).

**What it doesn't do well:** No model selection control (Codex picks internally). Struggles with architectural complexity — practitioners use Claude Code or Cursor for harder problems. Usage limits frustrate heavy users. ~43% failure rate on SWE-Bench Pro. GPT-5.3-Codex API access not yet available. First model OpenAI classifies as "High" cybersecurity risk. OpenAI's own team found the bottleneck shifts from code generation to human QA — environment setup and review capacity are the real constraints.

**Broader ecosystem:** Operator deprecated (Aug 2025), replaced by ChatGPT Agent (unified browser + research + conversation). Atlas browser launched Oct 2025. Responses API replaces Assistants API (deprecated, sunset Aug 2026). Developers migrating now — pain points include File Search limitations, unpredictable costs, complex async architecture. Responses API offers hosted containers, 1M token context with compaction, skills standard. Open Responses spec (Jan 2026) signals play for interoperability standard. Agents SDK is open-source, provider-agnostic. AgentKit adds visual agent builder for enterprise.

**Practitioner consensus:** Codex = strong for routine/well-defined tasks, weak for architecture. Claude Code = more autonomous, better for deep reasoning. Tools are converging; neither holds decisive advantage. Most serious practitioners use both. OpenAI candidly admits agent conversations don't fit request/response semantics — MCP integration hit real architectural friction.

**Key gap:** All public evidence is from individual developers. No enterprise team deployment case studies found. Named customers (Cisco, Nvidia, Ramp, Rakuten, Harvey) are marketing references, not deployment evidence. The chasm-crossing signal has not appeared for Codex.

*Sources: [Zack Proser practitioner review](https://zackproser.com/blog/openai-codex-review-2026), [Builder.io comparison](https://www.builder.io/blog/codex-vs-claude-code), [OpenAI GPT-5.3-Codex announcement](https://openai.com/index/introducing-gpt-5-3-codex/), [Codex agent loop deep dive](https://openai.com/index/unrolling-the-codex-agent-loop/), [Assistants API deprecation discussion](https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666), [Agents SDK repo](https://github.com/openai/openai-agents-python), [AI Tool Analysis review](https://aitoolanalysis.com/chatgpt-codex-review/). Full details: `runs/2026-03-21-run00.md`*

### 2. Microsoft — Azure AI Foundry
<!-- Latest developments, features, real user experiences -->

**What it does:** Broadest agent platform surface area of any vendor. Foundry Agent Service (GA March 2026) is the core: fully managed agent hosting with private networking, durable orchestration (human-in-the-loop via Azure Durable Functions + SignalR), multi-model support (OpenAI, Anthropic, DeepSeek, Mistral, xAI, Meta), MCP server hosting, A2A protocol support, and model router for dynamic model selection. Adjacent: Copilot Studio (low-code agent builder for M365), GitHub Copilot (coding agents), AutoGen (multi-agent framework), Semantic Kernel (lightweight SDK). Platform itself is free — pay for consumed services.

**What it does well:** Enterprise security infrastructure (Entra Agent ID, private networking with zero public egress, VNet isolation). Durable orchestration for long-running workflows with human approval loops. Multi-model flexibility — not locked to OpenAI. Deep integration with Azure/M365 ecosystem and 1,400+ connectors. Distribution channel: 80% of Fortune 500 already on Azure. Billing for agent hosting hasn't started yet (free through at least April 2026).

**What it doesn't do well:** Practitioners report significant limitations: hidden system prompts injected by Azure that users cannot see or override; knowledge source grounding unreliable (agents ignore connected search indexes, hallucinate); tools fail randomly on identical parameters; MCP server integration produces generic errors; no custom code within Agent/Workflow service. The product surface is sprawling and confusing — developers struggle to choose between Azure OpenAI, Foundry, Copilot Studio, AutoGen, and Semantic Kernel. Boundaries between products are not crisp.

**Enterprise adoption signals:** Microsoft claims 80,000+ enterprises use Foundry (80% of Fortune 500) — but this is Azure AI broadly, not agent-specific. No named enterprise deploying Foundry agents for a real business process was found in public evidence. No Copilot Studio agents running real business processes found either. The enterprise distribution advantage is real but the chasm-crossing signal for agents specifically has not appeared.

**Key gap:** Zero public evidence of a named company running Foundry Agent Service agents in production for a specific business workflow with measurable results. Microsoft has the strongest enterprise distribution channel but the practitioner evidence of actual agent adoption lags far behind the marketing.

*Sources: [Foundry Agent Service GA analysis](https://earezki.com/ai-news/2026-03-18-azure-weekly-foundry-agent-service-hits-ga-and-the-agentic-devops-era-officially-arrives/), [Technical limitations (Medium)](https://medium.com/@juliansmiles_40140/azure-ai-foundry-agent-service-technical-limitations-6b0f00ff4adc), [MS Q&A: Agent Studio limitations](https://learn.microsoft.com/en-us/answers/questions/5679468/azure-ai-foundry-agent-studio-no-option-for-custom), [Practitioner ecosystem confusion](https://medium.com/@speaktoharisudhan/azure-open-ai-vs-azure-ai-services-vs-azure-ai-foundry-c45e4a7d5013), [Enterprise pricing analysis](https://alrafayglobal.com/azure-ai-foundry-pricing-what-enterprises-need-to-know-before-scaling-ai/). Full details: `runs/2026-03-21-run01.md`*

### 3. Google — Gemini Agent Ecosystem
<!-- Latest developments, features, real user experiences -->

**What it does:** Broadest agent product surface area across coding, enterprise, and developer framework layers. Jules (async coding agent, out of beta, Gemini 2.5-powered) — submit task, get PR back in ~10 minutes. Vertex AI Agent Builder: Agent Designer (visual low-code, Preview), Agent Engine (production scaling, GA), Agent Garden (pre-built samples). ADK (Agent Development Kit) — open-source, code-first Python/TypeScript/Java/Go framework, 7M+ downloads, ADK 2.0 Alpha with graph-based workflows. Gemini Enterprise (formerly Agentspace) — enterprise search + agent orchestration, $25/user/month, GA. A2A protocol v0.3 for cross-framework agent communication.

**What it does well:** ADK is the strongest open-source agent framework in the ecosystem — built-in eval (`adk eval`), local debugging web UI, session state with pluggable backends, reflect-and-retry on tool failures (outperformed OpenAI Agents SDK in resilience testing). Jules' async PR-based workflow is genuinely differentiated — practitioners prefer it over synchronous coding tools for batch tasks. Enterprise security credentials strong (HIPAA, FedRAMP High, VPC-SC, CMEK). On-premises deployment available via Google Distributed Cloud. Framework-agnostic deployment (ADK, LangGraph, or custom).

**What it doesn't do well:** Gemini model stability is the critical weakness. Gemini 3.1 Pro plagued by 503 errors and latencies up to 104 seconds since Feb 2026 launch. Forced model migrations (Gemini 3 Pro shutdown March 9, Flash/Flash-Lite retired March 3). Chat histories vanishing after 3.1 rollout — Google acknowledged bug. Free tier quotas reduced without notice. Rate limits significantly lower than OpenAI (150-300 RPM vs 500-10,000 RPM at Tier 1). Jules still unreliable — "sometimes says it did things that it didn't." Platform deeply tied to Google Cloud services.

**Enterprise adoption signals:** Gemini Enterprise is GA at $25/user/month. Google claims enterprise-grade security. But zero named companies reporting agentic deployment results on any Google platform were found. Every enterprise reference is vendor announcement or analyst prediction. The ADK open-source community is active (GDG events in Berlin, Paris), but this is developer experimentation, not enterprise production.

**Key gap:** Same as OpenAI and Microsoft — no public evidence of named enterprise deployments. But Google has an additional gap: model reliability undermining developer trust at the exact moment they need commitment. The platform architecture is comprehensive but the foundation (Gemini model stability) is shaky. Practitioners are writing about ADK but not about deploying agents on Vertex AI in production.

*Sources: [Nelson's Jules review](https://nelsonslog.wordpress.com/2026/03/18/first-impressions-of-jules-googles-coding-agent/), [ADK docs](https://google.github.io/adk-docs/), [ADK vs OpenAI SDK comparison](https://iamulya.one/posts/a-developer-guide-to-ai-agents-openai-agents-sdk-vs-google-adk/), [ADK resilience testing](https://medium.com/@Micheal-Lanham/adk-typescript-vs-openai-agents-sdk-which-one-survives-retries-timeouts-and-human-approvals-808903d65a61), [Gemini chat history issues (The Register)](https://www.theregister.com/2026/02/23/gemini_users_say_their_chat/), [Gemini Enterprise rebrand](https://cloudfresh.com/en/blog/google-agentspace-evolves-into-gemini-enterprise/), [Vertex AI Agent Builder](https://docs.cloud.google.com/agent-builder/overview). Full details: `runs/2026-03-21-run02.md`*

### 4. Anthropic — Claude Code + Cloud Execution
<!-- Latest developments, features, real user experiences -->

**What it does:** Terminal-first agentic coding assistant (Claude Code) + programmatic agent runtime (Claude Agent SDK, renamed from Code SDK in late 2025). Models: Opus 4.6 (80.8% SWE-bench, 1M context beta, longest autonomous task horizon — METR 50%-time of 14h30m) and Sonnet 4.6 (79.6% SWE-bench, same 1M context). Agent SDK provides the same agent loop, tools, and context management as Claude Code but programmable in Python/TypeScript. MCP (Model Context Protocol) is the tool integration layer — now an industry standard with 6,400+ registered servers, adopted by OpenAI, Google, Microsoft, donated to Linux Foundation's Agentic AI Foundation (Dec 2025). Cloud execution via partners: Google Vertex AI, Microsoft Foundry (Azure), plus Copilot Cowork (Claude-powered M365 agent, Research Preview). Enterprise plug-ins launched Feb 2026 for finance, legal, HR with customizable templates. VS Code extension: 5.2M installs (leads Codex at 4.9M).

**What it does well:** Practitioner-confirmed strengths in complex reasoning, architecture decisions, and multi-constraint instruction following. Produces well-documented code with docstrings, edge-case handling, and comments. Harness design is a major differentiator — same Opus 4.5 scored 78% on CORE benchmark with Claude Code's harness vs 42% with Smolagents. The "measure twice, cut once" philosophy resonates with practitioners who value correctness over speed. MCP ecosystem gives it the richest tool integration of any platform. Sonnet 4.6 on Pro ($20/mo) delivers near-Opus quality (79.6% vs 80.8% SWE-bench), making it the best value in the coding agent market alongside free Gemini CLI.

**What it doesn't do well:** Token efficiency is the critical weakness — uses 3-4x more tokens than Codex for comparable tasks (tested: 6.2M vs 1.5M tokens on a Figma task). Usage limits provoked a user revolt in January 2026 — developers reported ~60% reduction in allowances, hitting limits within 10-15 minutes, calling it "unusable." All Claude surfaces (claude.ai, Code, Desktop) share one usage pool. Anthropic attributed this to removal of holiday bonus limits, not cuts. Production Agent SDK has real operational challenges: OOM risks with multiple subagents, non-trivial sandboxing, difficult filesystem management across users/teams. Code quality unreliable on first pass — practitioners report ~30% first-try success due to poor architectural choices creating downstream problems. Loses to Codex on terminal-native tasks (Terminal-Bench 2.0: Codex 77.3% vs Claude 65.4%). Steeper learning curve than browser-based tools.

**Enterprise adoption signals:** Distribution through Microsoft (Copilot Cowork) and Google (Vertex AI) rather than direct. Enterprise plug-in system with private marketplaces and controlled data flows (Feb 2026). PwC partnership for finance and life sciences agents. But: no named enterprise team deploying Claude Code or Agent SDK in production for a specific business workflow was found in public evidence. All practitioner reports are individual developers. Same chasm-crossing gap as Codex and Foundry.

**Key gap:** Token cost unpredictability for agent workloads. The 3-4x token overhead vs Codex, combined with opaque usage limits and shared usage pools, makes cost planning difficult for teams. No clear Anthropic guidance on expected API costs for heavy agentic use.

*Sources: [Builder.io comparison](https://www.builder.io/blog/codex-vs-claude-code), [Hackceleration benchmark review](https://hackceleration.com/claude-code-review/), [VS Code marketplace data](https://visualstudiomagazine.com/articles/2026/02/26/claude-code-edges-openais-codex-in-vs-codes-agentic-ai-marketplace-leaderboard.aspx), [The Register usage limits](https://www.theregister.com/2026/01/05/claude_devs_usage_limits/), [ML6 Agent SDK summit lessons](https://www.ml6.eu/en/blog/inside-the-claude-agents-sdk-lessons-from-the-ai-engineer-summit), [MCP 2026 roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/), [MCP Wikipedia](https://en.wikipedia.org/wiki/Model_Context_Protocol), [TechCrunch enterprise plug-ins](https://techcrunch.com/2026/02/24/anthropic-launches-new-push-for-enterprise-agents-with-plugins-for-finance-engineering-and-design/), [VentureBeat Copilot Cowork](https://venturebeat.com/orchestration/microsoft-announces-copilot-cowork-with-help-from-anthropic-a-cloud-powered). Full details: `runs/2026-03-21-run03.md`*

## Cross-Platform Patterns

**Pattern 1: No enterprise chasm-crossing signal — anywhere.** Across all four platforms, zero named enterprises report production agent deployments with measurable outcomes. The entire "enterprise agent" narrative is ahead of the evidence as of March 2026.

**Pattern 2: Practitioner workflow convergence — Claude for thinking, Codex for executing.** Multiple independent practitioners describe the same split: Claude Code for architecture/planning, Codex for well-defined execution tasks. Level 3 convergence — the most actionable finding for CTOs.

**Pattern 3: Framework > Platform.** Open-source agent frameworks (ADK, OpenAI Agents SDK, Claude Agent SDK) generate more practitioner activity than managed platforms (Azure Foundry, Vertex Agent Builder, Copilot Studio). Developers want to build agents in code, not visual builders.

**Pattern 4: MCP as the great equalizer.** Adopted by all four ecosystems. 6,400+ servers. Tool integrations increasingly portable — model quality and developer experience become the primary differentiators, not lock-in.

**Pattern 5: Reliability is the bottleneck, not capability.** Google: broadest architecture, worst model stability. Microsoft: best enterprise infra, unreliable grounding. OpenAI: simplest UX, usage limits. Anthropic: best reasoning, worst token efficiency. No platform has solved reliability at scale.

**Pattern 6: Scheduled/autonomous agent execution gap.** Codex and Jules are cloud-native and async (fire task, get result back). Claude Code started desktop-only but now has cloud execution. Azure Foundry has durable orchestration. But no platform offers built-in cron-like scheduling for recurring agent runs — this is infrastructure teams must build themselves.

## CTO Answer: Which Platform For What? (March 2026)

| Use Case | Best Platform | Why | Caveat |
|-----------|--------------|-----|--------|
| Complex coding / architecture | Claude Code | Highest reasoning, longest autonomous horizon (14.5h), best VS Code satisfaction | 3-4x token cost, usage limits |
| Routine coding / well-scoped tasks | OpenAI Codex | 85-90% success rate, cloud-parallel, cheapest per-task | Weak on architectural complexity |
| Enterprise agent infrastructure | Azure AI Foundry | Best security (Entra, VNet), durable orchestration, multi-model | Unreliable grounding, hidden prompts |
| Agent framework (code-first) | Google ADK | Most production-ready OSS framework, built-in eval, stateful | Gemini model reliability issues |
| Tool ecosystem / integrations | MCP (cross-platform) | 6,400+ servers, all four ecosystems, Linux Foundation | Maturing for enterprise governance |
| Non-coding business agents | **No clear leader** | All four have announcements; none has practitioner evidence | Entire space is pre-chasm |

**The honest answer for CTOs:** For coding agents, the tools work — use Claude Code for hard problems, Codex for routine ones, both ~$20/mo. For non-coding business agents (the 90% of the company), no platform has proven deployments. Vendor announcements are 6-12 months ahead of evidence. Build capability now, don't bet the org on any single platform.

## What We Did Not Find

- **Enterprise agent deployment case studies** — on any platform. The single most important gap.
- **Non-coding business agent practitioner evidence** — finance, HR, compliance, operations agents by any named company.
- **Nordic companies using any platform for agents** — zero findings.
- **Scheduled/autonomous agent execution comparisons** — which platforms support recurring agent runs?
- **Cost modeling for enterprise agent workloads** — no platform provides clear guidance.
- **Head-to-head: Jules vs Codex** — both async coding agents, almost no direct comparisons.

## Run Log

| Run | Time | Focus | Key Finding |
|-----|------|-------|-------------|
| 0 | 2026-03-21 | OpenAI — Codex + Adjacent System | Codex maturing fast (85-90% on routine tasks, 1.6M WAU, cost ~half Sonnet) but no enterprise deployment evidence found. Ecosystem bifurcating: Codex for code, ChatGPT Agent for browser. Responses API replacing Assistants API (sunset Aug 2026) with hosted containers + skills. OpenAI's own team admits bottleneck shifts to human QA. No chasm-crossing signal. |
| 1 | 2026-03-21 | Microsoft — Azure AI Foundry | Foundry Agent Service GA (March 2026) with private networking + durable orchestration. Broadest surface area but practitioners report hidden prompts, unreliable grounding, tool failures. Ecosystem is sprawling and confusing. No named enterprise agent deployment found — distribution channel advantage not yet converted to agent adoption evidence. |
| 2 | 2026-03-21 | Google — Gemini Agent Ecosystem | Broadest product surface (Jules, Agent Builder, ADK, Gemini Enterprise) but model stability is the Achilles heel — 503 errors, forced migrations, vanishing histories. ADK (7M downloads) outperforms OpenAI Agents SDK in resilience testing. Jules async workflow differentiated but still unreliable. Zero enterprise deployment evidence. Pattern: strong architecture, weak execution reliability. |
| 3 | 2026-03-21 | Anthropic — Claude Code + Cloud Execution | Practitioner favorite for complex reasoning/architecture (5.2M VS Code installs, leads Codex). MCP is strongest strategic asset — 6,400+ servers, industry standard. But 3-4x token overhead vs Codex and usage limit revolt (Jan 2026) are serious cost/trust issues. Agent SDK production-capable but operationally difficult (OOM, sandboxing). No enterprise team deployment evidence — same gap as all platforms. |
