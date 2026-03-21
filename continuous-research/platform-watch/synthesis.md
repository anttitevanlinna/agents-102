# Agent Platform Watch — Living Synthesis

Last updated: 2026-03-21
Total research runs: 2

## Purpose

Track the latest developments, features, and practitioner experiences across the four leading business agent platform ecosystems. Updated incrementally — each hourly run adds findings and re-synthesizes.

## Platforms Tracked

### 1. OpenAI — ChatGPT Codex + Adjacent System
<!-- Latest developments, features, real user experiences -->

**Latest model:** GPT-5.3-Codex (Feb 2026) — combined coding + reasoning, 25% faster. GPT-5.4 announced as flagship. Codex app (March 2026) adds worktrees, skills, automations.

**What it does well:** Cloud-parallel coding agent. Practitioner reports 85-90% success on well-scoped maintenance tasks (up from 40-60% in mid-2025). Mid-task steering (redirect agent without losing context). Strong GitHub integration. Pricing favorable at $20/mo Plus tier.

**What it doesn't do well:** No model selection control (Codex picks internally). Struggles with architectural complexity — practitioners use Claude Code or Cursor for harder problems. Usage limits frustrate heavy users. ~43% failure rate on SWE-Bench Pro. GPT-5.3-Codex API access not yet available. First model OpenAI classifies as "High" cybersecurity risk.

**Broader ecosystem:** Operator deprecated (Aug 2025), replaced by ChatGPT Agent (unified browser + research + conversation). Atlas browser launched Oct 2025. Responses API replaces Assistants API (deprecated, sunset Aug 2026). Agents SDK is open-source, provider-agnostic. AgentKit adds visual agent builder for enterprise.

**Practitioner consensus:** Codex = strong for routine/well-defined tasks, weak for architecture. Claude Code = more autonomous, better for deep reasoning. Tools are converging; neither holds decisive advantage. Most serious practitioners use both.

**Key gap:** All public evidence is from individual developers. No enterprise team deployment case studies found. The chasm-crossing signal has not appeared for Codex.

*Sources: [Zack Proser practitioner review](https://zackproser.com/blog/openai-codex-review-2026), [Builder.io comparison](https://www.builder.io/blog/codex-vs-claude-code), [OpenAI GPT-5.3-Codex announcement](https://openai.com/index/introducing-gpt-5-3-codex/), [Agents SDK repo](https://github.com/openai/openai-agents-python). Full details: `runs/2026-03-21-run00.md`*

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

*No findings yet.*

### 4. Anthropic — Claude Code + Cloud Execution
<!-- Latest developments, features, real user experiences -->

*No findings yet.*

## Cross-Platform Patterns

*No patterns identified yet.*

## What We Did Not Find

*Updated as research progresses.*

## Run Log

| Run | Time | Focus | Key Finding |
|-----|------|-------|-------------|
| 0 | 2026-03-21 | OpenAI — Codex + Adjacent System | Codex maturing fast (85-90% on routine tasks) but no enterprise deployment evidence found. Ecosystem bifurcating: Codex for code, ChatGPT Agent for browser. Tools converging with Claude Code. |
| 1 | 2026-03-21 | Microsoft — Azure AI Foundry | Foundry Agent Service GA (March 2026) with private networking + durable orchestration. Broadest surface area but practitioners report hidden prompts, unreliable grounding, tool failures. Ecosystem is sprawling and confusing. No named enterprise agent deployment found — distribution channel advantage not yet converted to agent adoption evidence. |
