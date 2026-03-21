# Agent Orchestration Platforms — OODA Research

**Date:** 2026-02-21
**Rounds:** 4 (broad scan, deep dive, agent server category, practitioner sentiment)
**Evidence standard:** Practitioner reports and documentation over vendor marketing. Claims marked with confidence where ambiguous.

---

## The Question

What do people actually use to run **concurrent, multi-turn AI agents** in production or serious development? Specifically: platforms that support Claude / Anthropic Agent SDK, handle real multi-turn sessions with tool use, and let you run multiple agents concurrently with orchestration.

## Key Finding

There is **no single dominant "agent server" platform** purpose-built for hosting concurrent multi-turn Claude SDK agents. The landscape is fragmented across three layers:

1. **Frameworks** — how you structure agent logic (LangGraph, CrewAI, Claude Agent SDK, etc.)
2. **Runtimes** — where agents execute (Bedrock AgentCore, Azure Foundry, Docker containers)
3. **Managed services** — cloud platforms that bundle hosting + observability + governance

Most practitioners assemble a stack from these layers. The "just deploy my Claude agents here" platform does not yet exist as a turnkey product.

---

## Landscape Map

| Category | Platforms | Maturity | Claude Support |
|---|---|---|---|
| **Agent Frameworks** | LangGraph, Claude Agent SDK, Microsoft Agent Framework, CrewAI, Agno, OpenAI Agents SDK, Google ADK, Strands Agents | Mixed (LangGraph most mature) | All except OpenAI Agents SDK |
| **Managed Agent Runtimes** | Amazon Bedrock AgentCore, Azure AI Foundry Agent Service | Production (both GA or near-GA) | Both support Claude models |
| **Stateful Agent Platforms** | Letta (MemGPT), Julep | Early-to-mid | Model-agnostic (Claude via API) |
| **Workflow Builders** | n8n, Composio, Relevance AI | Production (as workflow tools) | All support Claude |
| **Community Orchestrators** | claude-flow, ccswarm, Gas Town, Multiclaude | Experimental | Claude-native |
| **Interop Protocols** | MCP (Model Context Protocol), A2A (Agent-to-Agent) | MCP: de facto standard. A2A: v0.3, growing | MCP: Anthropic-originated. A2A: Google-originated |

---

## Tier 1: Production-Ready Platforms

### LangGraph (LangChain)

**What it is:** Graph-based agent orchestration framework. Treats agent behavior as a directed graph of nodes and edges where state flows between steps. Reached v1.0 in October 2025.

**Claude support:** Full. The `langchain-anthropic` package is marked "Production/Stable" (latest release Feb 2026). All Claude model tiers supported.

**Concurrent agents:** Yes. Parallel node execution within graphs. Can orchestrate multiple agent instances.

**Production evidence:** 600-800 companies reported in production by end of 2025. Named production users include Rakuten, GitLab, Elastic, Cisco. LangChain's own messaging: "Use LangGraph for agents, not LangChain."

**Key strengths:**
- Durable execution — agents persist through failures and resume from exact stopping points
- State "time-travel" — roll back to any previous decision point for debugging
- Human-in-the-loop as interrupt nodes where execution pauses and resumes
- Checkpoint/resume across context windows
- Most granular control of any framework

**Key weaknesses:**
- Steep learning curve. One developer reported "two weeks reading docs, three failed prototypes" before getting it working
- Heavy abstraction layer — some practitioners use LangGraph without LangChain to maintain control
- Vendor lock-in concerns around LangChain ecosystem

**Pricing:** Open-source framework. LangSmith (observability) is commercial.

**Practitioner sentiment:** The framework practitioners reach for when they outgrow simpler options. Respected but not loved. "The React.js of agent frameworks — powerful, complex, everywhere."

**Source:** [LangChain Anthropic Integration](https://docs.langchain.com/oss/python/integrations/providers/anthropic), [Zircon Production Analysis](https://zircon.tech/blog/agentic-frameworks-in-2026-what-actually-works-in-production/)

---

### Claude Agent SDK (Anthropic)

**What it is:** Anthropic's official open-source SDK for building autonomous AI agents. Exposes the same infrastructure powering Claude Code as a programmable library. Available in Python and TypeScript. Announced May 2025 alongside Claude Opus 4 and Sonnet 4.

**Claude support:** Native. This IS the Claude agent story.

**Concurrent agents:** Yes. Built-in subagent system. Multiple subagents can run concurrently — e.g., style-checker, security-scanner, and test-coverage subagents simultaneously during code review. Subagents maintain separate context from the main agent.

**Multi-turn sessions:** Yes. Built-in tools, function tools, streaming, multi-turn conversations, permission modes, MCP server integration.

**Hosting patterns (from official docs):**
1. **Ephemeral containers** — new container per user task, destroyed on completion. Best for one-off tasks.
2. **Persistent containers** — maintained instances for long-running tasks, multiple Claude Agent processes per container. Best for proactive agents (email monitors, etc.).
3. **Hydrated ephemeral containers** — pre-loaded with user context, spun up on demand. Best for site builders, high-frequency chatbots.

**Runtime requirements:** Python 3.10+ or Node.js 18+. 1 GiB RAM, 5 GiB disk, 1 CPU recommended. Outbound HTTPS to api.anthropic.com.

**Deployment targets:** Docker, AWS (Bedrock AgentCore, Lambda, Fargate), Azure, Vercel Sandbox, any container platform.

**Agent Teams (experimental, Feb 2026):** Claude Opus 4.6 introduced Agent Teams — multiple Claude instances coordinating autonomously, challenging each other's findings, working in parallel on complex codebases. Disabled by default, enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`.

**Key strengths:**
- Native Claude integration — no translation layer
- Battle-tested (powers Claude Code itself)
- Subagent concurrency built in
- MCP protocol support native
- Official hosting documentation with production patterns

**Key weaknesses:**
- No managed hosting service from Anthropic — you bring your own containers
- Orchestration beyond subagents requires external tools (LangGraph, Microsoft Agent Framework, etc.)
- Long-running agents need careful state management (progress files, git checkpoints — see Anthropic's "Effective Harnesses" guidance below)

**Pricing:** SDK is open-source. Cost is Claude API tokens (dominant cost) + container hosting (~$0.05/hour minimum).

**Anthropic's own production guidance:** For long-running agents spanning hours or days, Anthropic recommends: progress tracking files (`claude-progress.txt`), git-based state management, structured artifacts that survive context window boundaries, forcing agents to work on one feature at a time, and end-to-end testing with browser automation. "The solution draws explicitly from how human software engineers work."

**Source:** [Claude Agent SDK Docs](https://platform.claude.com/docs/en/agent-sdk/overview), [Hosting Guide](https://platform.claude.com/docs/en/agent-sdk/hosting), [Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents), [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

---

### Microsoft Agent Framework (Semantic Kernel + AutoGen)

**What it is:** Microsoft's unified agent framework, merging Semantic Kernel and AutoGen (October 2025). GA targeted Q1 2026 with production SLAs. Multi-language: .NET and Python.

**Claude support:** Explicit integration announced. "Build AI agents with Claude Agent SDK and Microsoft Agent Framework" — official Semantic Kernel blog post. Claude agents can be composed with Azure OpenAI, GitHub Copilot, and other agents in sequential, concurrent, handoff, and group chat workflows.

**Concurrent agents:** Yes. Built-in orchestrators for sequential, concurrent, handoff, and group chat patterns.

**Production evidence:** Enterprise backing from Microsoft. Azure AI Foundry provides managed runtime. Claude models (Haiku 4.5, Sonnet 4.5, Opus 4.1) available alongside GPT in Azure Foundry — "the only cloud platform with access to both frontier model families in one place."

**Key strengths:**
- Enterprise governance, identity, compliance built in
- Multi-model orchestration (Claude + GPT + others in same workflow)
- Production SLAs coming with GA
- Deep Azure ecosystem integration

**Key weaknesses:**
- Microsoft ecosystem gravity — most natural for Azure shops
- Framework consolidation still in progress (migration from SK/AutoGen)
- Heavy enterprise features may be overkill for smaller deployments

**Source:** [Semantic Kernel Blog — Claude Agent SDK Integration](https://devblogs.microsoft.com/semantic-kernel/build-ai-agents-with-claude-agent-sdk-and-microsoft-agent-framework/), [Microsoft Agent Framework GitHub](https://github.com/microsoft/agent-framework)

---

### Amazon Bedrock AgentCore

**What it is:** AWS's managed, serverless agent runtime. Launched 2025. Framework-agnostic — supports CrewAI, LangGraph, Strands Agents, and any containerized agent code.

**Claude support:** Yes. Amazon Bedrock hosts Anthropic Claude models. Claude Agent SDK can be deployed to AgentCore.

**Concurrent agents:** Yes. Serverless autoscaling. Session management handled by the platform.

**Production evidence:** Powers features in Amazon Q Developer, AWS Glue, VPC Reachability Analyzer (via Strands Agents).

**Key strengths:**
- True serverless — no infrastructure management
- Firecracker MicroVMs for hardware-level isolation
- Framework-agnostic (bring any agent code)
- Built-in observability, memory, gateway services
- Consumption-based pricing, no upfront commitment
- Two deployment methods: container-based (Dockerfile) and direct code deployment (Python)

**Key weaknesses:**
- AWS ecosystem lock-in
- Billing enabled from Feb 2026 (was free preview)
- Relatively new — less community knowledge than self-hosted approaches

**Source:** [Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/), [AgentCore Runtime Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html)

---

### Azure AI Foundry Agent Service

**What it is:** Microsoft's managed agent runtime within Azure AI Foundry. Multi-agent workflows, persistent memory, enterprise governance.

**Claude support:** Yes. Anthropic Claude models available in Azure Foundry alongside GPT models.

**Concurrent agents:** Yes. Multi-agent workflows available in portal and VS Code. Autoscaling, error recovery, context maintenance over long-running operations.

**Production evidence:** GA features announced at Ignite 2025. Observability (evaluations, OpenTelemetry tracing, continuous red teaming) generally available.

**Key strengths:**
- Managed runtime with enterprise governance (audit trails, policy coverage, risk monitoring)
- Supports agents built with Microsoft Agent Framework, LangGraph, CrewAI, or other frameworks
- Fleet-wide operations view: health, cost, performance, risk, policy in one dashboard
- Deep integration with Azure identity, security, compliance

**Key weaknesses:**
- Azure ecosystem lock-in
- Billing from Feb 2026
- Enterprise complexity may be excessive for simpler use cases

**Source:** [Foundry Agent Service at Ignite 2025](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/foundry-agent-service-at-ignite-2025-simple-to-build-powerful-to-deploy-trusted-/4469788), [InfoQ GA Announcement](https://www.infoq.com/news/2025/05/azure-ai-foundry-agents-ga/)

---

### Strands Agents (AWS)

**What it is:** AWS's open-source agent SDK. Powers production features in Amazon Q Developer, AWS Glue, VPC Reachability Analyzer. Launched May 2025, v1.0 with multi-agent support.

**Claude support:** Model-agnostic. Supports Amazon Bedrock (Claude), Anthropic direct, OpenAI, Gemini, Ollama, LiteLLM, llama.cpp — swap providers in one line.

**Concurrent agents:** Yes (v1.0). Four new primitives for multi-agent orchestration plus A2A protocol support.

**Production evidence:** Strong. "Where it used to take months for Q Developer teams to go from prototype to production with a new agent, they're now able to ship new agents in days and weeks."

**Key strengths:**
- Battle-tested inside AWS's own products
- Three-component simplicity: Model Provider + System Prompt + Toolbelt
- Deploys to Lambda, Fargate, EKS, Bedrock AgentCore, Docker, Kubernetes, Terraform
- Built-in OpenTelemetry observability
- A2A protocol support for cross-framework agent communication

**Key weaknesses:**
- AWS-originated, strongest in AWS ecosystem
- Less community ecosystem than LangGraph or CrewAI
- Relatively new open-source project

**Source:** [AWS Blog — Introducing Strands Agents](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/), [Strands 1.0 Announcement](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-1-0-production-ready-multi-agent-orchestration-made-simple/)

---

## Tier 2: Promising but Earlier Stage

### CrewAI

**What it is:** Role-based multi-agent framework. Agents as "crew members" with defined roles, goals, backstories. Built from scratch without LangChain dependencies. $18M funding.

**Claude support:** Yes. Model-agnostic. Can mix models within a single Crew (e.g., Claude for reasoning, GPT for content).

**Concurrent agents:** Yes, via hierarchical and sequential task execution patterns.

**Scale claims:** 450 million monthly processed workflows. 100,000+ certified developers. 60% of Fortune 500 adoption. (These are vendor claims — large numbers but hard to independently verify.)

**Production evidence:** Widespread adoption but with a significant caveat from practitioners.

**Critical practitioner warning:** Multiple teams report hitting a wall at 6-12 months. "As requirements grow beyond sequential/hierarchical task execution, CrewAI's opinionated design becomes constraining. Custom orchestration patterns are difficult or impossible. Multiple teams report hitting this wall 6-12 months in, requiring painful rewrites to LangGraph." One developer: "Had a working agent in four hours with CrewAI... then hit limitations needing custom tool orchestration CrewAI couldn't handle."

**Pricing:** Open-source framework. CrewAI Enterprise is commercial.

**Verdict:** Excellent for getting started. Questionable for complex production systems. Consider it a prototyping tool that may require migration.

**Source:** [DataCamp Comparison](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen), [CrewAI Community — Claude Connection Issues](https://community.crewai.com/t/unable-to-connect-to-anthropic-claude-using-crewai/537)

---

### Agno

**What it is:** Lightweight, fast Python multi-agent framework. Build a stateful, tool-using agent and serve it as a production API in ~20 lines. Supports FastAPI integration.

**Claude support:** Native. Includes Claude's context editing features — automatically removes old tool and reasoning blocks to manage long-running sessions.

**Concurrent agents:** Yes. Workflows with Loop, Parallel, Condition, Router primitives. Fully async database operations (MongoDB, SQLite, PostgreSQL) for truly concurrent execution.

**Production readiness:** Built-in error handling, retries, observability, state persistence. Runs on Docker/Kubernetes. "Can scale from a single agent to thousands of concurrent sessions."

**Key strengths:**
- Lightweight and Pythonic
- Native Claude support with context window management
- Parallel workflow primitives built in
- Async operations throughout

**Key weaknesses:**
- Smaller ecosystem than LangGraph or CrewAI
- Less enterprise governance tooling
- Newer — less production battle-testing evidence

**Source:** [Agno GitHub](https://github.com/agno-agi/agno), [Agno Docs](https://docs.agno.com/), [DigitalOcean Analysis](https://www.digitalocean.com/community/conceptual-articles/agno-fast-scalable-multi-agent-framework)

---

### Letta (formerly MemGPT)

**What it is:** Platform for building stateful agents with advanced memory that can learn and self-improve over time. Continuation of UC Berkeley MemGPT research. Provides agent runtime, tool execution, reasoning loops, multi-agent orchestration, and developer tools (Agent Development Environment).

**Claude support:** Model-agnostic. Works with any LLM provider.

**Concurrent agents:** Yes. Conversations API for shared memory across parallel user experiences.

**The "agent server" angle:** Letta is the closest thing to the "agent server" concept in the landscape. It bundles framework + runtime + persistence + memory management. Database backends, state management, monitoring, SDKs.

**Key strengths:**
- Purpose-built for stateful, long-running agents
- Persistent memory across sessions (the core differentiator)
- Agent Development Environment for building and debugging
- Production infrastructure included (not just a framework)
- Context Repositories with git-based versioning (Letta Code)

**Key weaknesses:**
- Memory-focused — may be more than needed for simpler agent tasks
- Smaller community than LangGraph/CrewAI
- Still evolving rapidly

**Source:** [Letta.com](https://www.letta.com/), [Letta GitHub](https://github.com/letta-ai/letta), [Letta v1 Agent Architecture](https://www.letta.com/blog/letta-v1-agent)

---

### Julep

**What it is:** Serverless stateful agent platform. "Firebase for AI agents." Open-source. Handles scaling, concurrency, retries, and error handling.

**Claude support:** Model-agnostic via LLM provider configuration.

**Concurrent agents:** Yes. Multiple operations in parallel, platform handles scaling. Multi-user/multi-agent sessions for collaborative scenarios.

**Key strengths:**
- Serverless — no devops overhead
- Built-in retries, self-healing steps for long-running tasks
- Multi-step workflow orchestration with parallel execution
- Persistent memory and context across conversations
- External tool/API integration built in

**Key weaknesses:**
- Relatively small community
- Less enterprise governance tooling
- Early-stage relative to LangGraph or Bedrock AgentCore

**Source:** [Julep.ai](https://julep.ai/), [Julep GitHub](https://github.com/julep-ai/julep)

---

### Google Agent Development Kit (ADK)

**What it is:** Google's open-source framework for multi-agent applications. Announced at Cloud NEXT 2025.

**Claude support:** Yes, via LiteLLM wrapper. Not native — optimized for Gemini and Google ecosystem.

**Concurrent agents:** Yes. Hierarchical multi-agent structures with intelligent routing and task delegation.

**Key strengths:**
- Multi-agent orchestration with team structures
- Google Cloud / Vertex AI integration
- A2A protocol support
- Model-agnostic via LiteLLM

**Key weaknesses:**
- Google ecosystem gravity — most natural for GCP shops
- Claude support is through a wrapper, not native
- Newer framework with smaller independent community

**Source:** [Google ADK Docs](https://google.github.io/adk-docs/), [ADK Claude Integration](https://google.github.io/adk-docs/agents/models/anthropic/)

---

### OpenAI Agents SDK

**What it is:** Production successor to the experimental Swarm framework. Launched March 2025. Minimalist design with four core primitives: Agents, Handoffs, Guardrails, Tracing.

**Claude support:** No. OpenAI-locked.

**Concurrent agents:** Yes, via handoff patterns and multi-agent delegation.

**Production evidence:** Coinbase used it for AgentKit (crypto wallet interactions). Both Python and TypeScript.

**Key strengths:**
- Minimal abstraction — 4 primitives
- Built-in tracing and evaluation
- Clean, lightweight design
- OpenAI ecosystem integration

**Key weaknesses:**
- **OpenAI-locked. No Claude support.** This is disqualifying for the specific research question.
- Less flexible orchestration than LangGraph

**Verdict:** Relevant for OpenAI-only shops. Not relevant for Claude-based agent work.

**Source:** [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/), [OpenAI New Tools for Building Agents](https://openai.com/index/new-tools-for-building-agents/)

---

## Tier 3: Workflow Builders (Different Category)

These platforms are useful but serve a different function than agent orchestration frameworks. They are workflow automation tools that have added AI agent capabilities, not platforms designed for deep multi-turn agent sessions.

### n8n

**What it is:** Open-source workflow automation platform with AI agent nodes.

**Claude support:** Yes. Anthropic Chat Model node supports Claude 3 family, Claude Opus 4, Sonnet 4.

**Multi-turn:** Limited. Simple Memory node retains session context but clears between sessions. Postgres/Redis needed for persistent memory.

**Concurrent agents:** Workflow-level parallelism, not agent-level concurrency.

**Verdict:** Excellent for triggering and orchestrating external processes, webhooks, and API calls. Not a deep agent runtime. Use it to wire up agents built elsewhere, not to run complex multi-turn agent sessions.

**Source:** [n8n Claude Integration](https://n8n.io/integrations/claude/), [n8n AI Agents Guide](https://www.flowmondo.com/article/n8n-ai-agents-guide)

### Composio

**What it is:** Agent tooling/integration platform. 250+ prebuilt app integrations. SOC 2-compliant managed auth. "30-40% fewer tool-call failures compared to homemade solutions."

**Claude support:** Yes. Listens to function calls from Claude, GPT, Gemini, Grok.

**What it is NOT:** An agent runtime or orchestration framework. It is a tool integration layer that sits alongside a framework.

**Verdict:** Useful as a component in an agent stack, not as the stack itself.

**Source:** [Composio.dev](https://composio.dev/), [Open Claude Cowork](https://github.com/ComposioHQ/open-claude-cowork)

### Relevance AI

**What it is:** No-code agent builder focused on data-heavy applications and RAG.

**Claude support:** Model-agnostic. Supports Claude, GPT, Gemini, Meta models.

**Multi-agent:** Yes, multi-agent orchestration with custom logic builder.

**Verdict:** Good for teams wanting no-code multi-agent setups with strong data/vector search capabilities. Not a deep multi-turn agent runtime.

**Source:** [SaaStr Review of Relevance AI](https://www.saastr.com/saastr-ai-app-of-the-week-relevance-ai-the-platform-where-ops-teams-build-entire-ai-workforces-without-writing-a-line-of-code/)

---

## Community Orchestration Tools (Experimental)

These are community-built tools specifically for orchestrating Claude Code / Claude Agent SDK agents. All experimental.

### claude-flow

**What it is:** Community-built orchestration platform for Claude multi-agent swarms. 170+ MCP tools. Claims 60+ concurrent agents, self-learning capabilities, fault-tolerant consensus.

**Key features:** Native Claude Code support via MCP, swarm coordination with "queen" agents, smart model routing (routes to cheapest capable handler), IPFS plugin marketplace.

**Caution:** Bold claims (84.8% SWE-Bench, "Ranked #1 in agent-based frameworks") that should be independently verified. Community project, not enterprise-supported.

**Source:** [claude-flow GitHub](https://github.com/ruvnet/claude-flow)

### Others

- **ccswarm** — Git worktree isolation for concurrent Claude Code development. Rust-native.
- **Gas Town, Multiclaude** — Opinionated orchestrators where a primary agent decomposes tasks and summons subagents.
- **wshobson/agents** — Multi-agent orchestration patterns for Claude Code.

---

## Protocols and Standards

### MCP (Model Context Protocol)

**Origin:** Anthropic.
**Status:** De facto standard for tool integration across agent frameworks.
**What it does:** Client-host-server architecture using JSON-RPC 2.0. Any agent framework can integrate with any tool server through a common protocol.
**Adoption:** Supported by LangGraph, Claude Agent SDK, Microsoft Agent Framework, Strands Agents, Google ADK, and most major frameworks.

### A2A (Agent-to-Agent Protocol)

**Origin:** Google (April 2025). Contributed to Linux Foundation (June 2025).
**Status:** v0.3. Growing adoption. 50+ technology partners including Atlassian, Salesforce, SAP, ServiceNow, plus major consultancies (McKinsey, Deloitte, Accenture, etc.).
**What it does:** Standard for cross-framework agent communication. Agents collaborate without revealing internal logic. Supports long-running tasks with async webhook-based push notifications. Built on HTTP, JSON-RPC, SSE. gRPC support added in v0.3.
**Why it matters:** If you build multi-agent systems using different frameworks (e.g., Claude Agent SDK + LangGraph + Strands), A2A provides the interoperability layer.

**Source:** [A2A Protocol](https://a2a-protocol.org/latest/), [Google A2A Announcement](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)

---

## The "Agent Server" Gap

**The question:** Is there a platform specifically designed as a managed runtime for hosting multi-turn Claude SDK agents with automatic session management, concurrency, and observability?

**The answer:** Not quite. The gap is closing but still exists. Here is what is available, ranked by proximity to the ideal:

### 1. Amazon Bedrock AgentCore (closest to a managed agent server)
- Serverless, framework-agnostic runtime
- Session management, security isolation, autoscaling handled by platform
- You bring your agent code (Claude Agent SDK, Strands, LangGraph, CrewAI)
- Consumption-based pricing
- **Gap:** Generic container runtime, not Claude-specific. You still write the orchestration logic.

### 2. Azure AI Foundry Agent Service
- Similar managed runtime with enterprise governance
- Multi-agent workflow visual designer
- Claude models available in Azure
- **Gap:** Same as AgentCore — you bring the framework logic.

### 3. Letta (closest to "agent server" philosophy)
- Bundles runtime + state + memory + tools
- Purpose-built for stateful, long-running agents
- Agent Development Environment
- **Gap:** Smaller scale, less enterprise governance, memory-focused rather than orchestration-focused.

### 4. Julep (closest to "Firebase for agents")
- Serverless stateful platform
- Handles concurrency, retries, scaling
- **Gap:** Early-stage. Less battle-tested.

### 5. Claude Agent SDK + DIY Containers
- Anthropic documents the patterns but does not offer a managed service
- You host on Docker/Kubernetes/cloud provider
- **Gap:** You own all the infrastructure. No turnkey "deploy my agent" experience.

### What is actually missing

A platform where you can:
1. Write a Claude Agent SDK agent (Python or TypeScript)
2. Deploy it with one command
3. Get automatic session management, concurrent execution, persistent state
4. Have built-in observability (traces, costs, errors)
5. Scale from 1 to 1000 concurrent agent sessions
6. Pay per use

Bedrock AgentCore and Azure Foundry are 70-80% of the way there. The remaining gap is that they are generic agent runtimes, not Claude-specific developer experiences. You still need to understand containers, deployment configs, and framework wiring.

---

## What Practitioners Actually Use (Reddit/HN/X Evidence)

### The production reality check

- **RAND 2025 study:** 80-90% of AI agent projects fail in production environments.
- **Fewer than 1 in 4** organizations that experiment with agents have scaled them to production.
- The key differentiator is not model sophistication but **willingness to redesign workflows** rather than layering agents on legacy processes.

### What developers actually report

**On frameworks:**
- LangGraph is the most commonly cited framework for serious production agent work. "If you need custom control flow, you end up here eventually."
- CrewAI gets developers started fast but "multiple teams report hitting this wall 6-12 months in, requiring painful rewrites to LangGraph."
- "All three top open-source frameworks are exceptional at prototyping but dangerously incomplete for production." The gap: custom security, governance, deployment layers needed.

**On Claude Code in production:**
- r/ClaudeCode has 4,200+ weekly contributors (vs. 1,200 on r/Codex)
- Developers running multi-agent tmux pipelines, multi-file refactors, CI/CD automation
- Power users report Claude handles multi-file refactors with minimal supervision
- Skeptics note it "occasionally commits confidently to wrong solutions before course-correcting"

**On costs:**
- Dominant cost is tokens, not compute
- Container hosting: ~$0.05/hour minimum
- The real expense is failed agent runs that burn tokens without results

**On what works in production:**
- Constrained, well-governed domains: IT operations, employee service, finance ops, compliance, support workflows
- Successful deployments focus on 2-3 high-value use cases with clear KPIs and explicit guardrails
- "AI Agents are primarily deployed where processes are repetitive but not always identical, typically involving unstructured inputs"
- Human oversight remains essential in all successful implementations

### Framework adoption signals (as of Feb 2026)

| Framework | Production Evidence | Trajectory |
|---|---|---|
| LangGraph | 600-800 companies, named logos | Consolidating as default |
| CrewAI | 450M monthly workflows (vendor claim) | Growing but churn risk |
| Microsoft Agent Framework | Enterprise backing, GA Q1 2026 | Growing fast in Azure shops |
| Strands Agents | Powers AWS internal products | Growing in AWS ecosystem |
| Claude Agent SDK | Powers Claude Code | Growing as native option |
| Agno | Newer, smaller community | Rising |
| OpenAI Agents SDK | Coinbase, others | Growing in OpenAI ecosystem |

**Source:** [AI Tool Discovery — Reddit Analysis](https://www.aitooldiscovery.com/guides/best-ai-agents-reddit), [Tensorlake — AI Agent Stack 2026](https://www.tensorlake.ai/blog/the-ai-agent-stack-in-2026-frameworks-runtimes-and-production-tools), [Zircon — What Works in Production](https://zircon.tech/blog/agentic-frameworks-in-2026-what-actually-works-in-production/)

---

## The Moltbook Question

Moltbook is **not** an agent orchestration platform or runtime. It is a social network for AI agents, launched January 2026 by Matt Schlicht. It mimics Reddit's interface with "submolts" instead of subreddits. AI agents visit via a "Heartbeat" system every 4 hours to browse, post, and comment.

**The reality:** A security investigation found most of the claimed 1.6 million agents were controlled by roughly 17,000 humans (average 88 "agents" per person). A critical security vulnerability allowed anyone to commandeer any agent. Platform went offline to patch. Critics including Gary Marcus and Andrej Karpathy called it a "disaster waiting to happen."

Not relevant to the question of running production agents. Included here because it was in the research brief.

**Source:** [CNBC](https://www.cnbc.com/2026/02/02/social-media-for-ai-agents-moltbook.html), [Fortune](https://fortune.com/2026/02/02/moltbook-security-agents-singularity-disaster-gary-marcus-andrej-karpathy/), [Vectra Security Analysis](https://www.vectra.ai/blog/moltbook-and-the-illusion-of-harmless-ai-agent-communities)

---

## Platforms Not Relevant or Pivoted

### Fixie / AI.JSX
Fixie pivoted to **Ultravox** — a real-time voice AI infrastructure layer. AI.JSX is still on GitHub but the company's focus is voice, not general agent orchestration. Not relevant to this research question.

### AutoGen (standalone)
Merged into Microsoft Agent Framework (October 2025). Use Microsoft Agent Framework instead.

### OpenAI Swarm
Replaced by OpenAI Agents SDK (March 2025). Swarm is now a "reference design" only.

---

## Recommendations

For someone who wants to run concurrent multi-turn Claude Agent SDK agents in production:

### Path 1: Simplest (Claude-native)

Use **Claude Agent SDK directly** with built-in subagents for concurrent execution. Host in containers following Anthropic's documented patterns. Deploy to **Amazon Bedrock AgentCore** for managed scaling, or run on Docker/Kubernetes for full control.

**When to choose:** You want maximum closeness to Claude's native capabilities, your orchestration needs are moderate (subagents handle it), and you want minimal abstraction layers.

### Path 2: Maximum control

Use **LangGraph** with `langchain-anthropic` for orchestration logic. Deploy to Bedrock AgentCore or Azure Foundry for managed hosting. Add Composio if you need 250+ app integrations.

**When to choose:** You need complex workflows with branching, checkpointing, human-in-the-loop, and custom error recovery. You are willing to invest in learning LangGraph's abstractions.

### Path 3: Microsoft ecosystem

Use **Microsoft Agent Framework** with Claude Agent SDK integration. Deploy to **Azure AI Foundry Agent Service**. Get enterprise governance, multi-model orchestration (Claude + GPT), and production SLAs.

**When to choose:** You are in an Azure shop, need enterprise compliance/governance, or want to mix Claude with other models in the same workflow.

### Path 4: AWS ecosystem

Use **Strands Agents** with Claude on Bedrock. Deploy to **Bedrock AgentCore**. A2A protocol for cross-agent communication.

**When to choose:** You are in an AWS shop, want the same framework powering Amazon Q Developer, and want serverless scaling.

### Path 5: Stateful long-running agents

Use **Letta** for agents that need persistent memory across sessions and self-improvement over time. Or **Julep** for serverless stateful workflows.

**When to choose:** Your agents must remember context across days/weeks, learn from interactions, and maintain state without manual checkpoint management.

### What to avoid

- **CrewAI for complex production systems** — start fast but prepare for a rewrite at 6-12 months
- **OpenAI Agents SDK** — if you need Claude support (it is OpenAI-locked)
- **n8n as your agent runtime** — use it for workflow triggers and integrations, not for deep multi-turn agent logic
- **Community orchestrators (claude-flow, etc.)** — for experimentation only, not production

---

## Research Log

### Round 1: Broad Landscape Scan (6 searches)
- "what do people use to run AI agents in production 2025 2026 Reddit"
- "multi-agent orchestration platform concurrent agents production CrewAI LangGraph AutoGen comparison"
- "Anthropic Agent SDK Claude Code SDK deployment production hosting"
- "moltbook AI agents platform"
- "n8n AI agent nodes multi-turn Claude Anthropic support"
- "Azure AI Agent Service multi-agent concurrent production deployment"

**Orient:** Landscape is fragmented across frameworks, runtimes, and managed services. No single "agent server" exists. LangGraph and Claude Agent SDK are the strongest Claude-compatible options. Moltbook is not what was expected.

### Round 2: Deep Dive on Promising Platforms (5 searches)
- "agent server agent runtime platform multi-turn Claude SDK concurrent execution"
- "CrewAI Claude Anthropic support multi-turn agent production"
- "Letta MemGPT agent server stateful multi-turn production"
- "Julep AI stateful agent platform concurrent agents production"
- "Amazon Bedrock AgentCore agent runtime deployment managed platform"

**Orient:** Bedrock AgentCore and Azure Foundry are the closest to managed agent runtimes. Letta is the most "agent server"-like in philosophy. CrewAI has scale but practitioner warnings about long-term viability. Claude Agent SDK has three documented hosting patterns.

### Round 3: Agent Server Category & Native Story (6 searches)
- "Claude Agent SDK subagents concurrent multi-agent orchestration production deployment"
- "Anthropic Claude Agent SDK deploy server hosting agent runtime serverless container"
- "Claude Agent SDK hosting guide documentation"
- "OpenAI Agents SDK Swarm multi-agent concurrent production"
- "Strands Agents AWS open source agent framework production"
- "Semantic Kernel Microsoft Agent Framework Claude Anthropic multi-agent"

**Orient:** Claude Agent SDK's native subagent concurrency is more capable than expected. Anthropic documents hosting patterns but does not offer a managed service. Microsoft Agent Framework has explicit Claude SDK integration. Strands Agents powers AWS's own products. OpenAI Agents SDK is OpenAI-locked.

### Round 4: Practitioner Sentiment & Broader Context (6 searches)
- "reddit ai agent framework in production experience LangGraph CrewAI frustration"
- "reddit hacker news running agents in production Claude what do you use"
- "agentic frameworks in 2026 what actually works in production"
- "Composio AI agent tooling platform Claude support production"
- "Relevance AI agent builder platform no-code Claude support review"
- "Agno agent framework production multi-agent Claude"

**Additional searches:**
- "Anthropic effective harnesses long running agents"
- "Google ADK Agent Development Kit multi-agent production Claude support"
- "A2A protocol agent-to-agent Google standard interoperability"
- "LangGraph Claude Anthropic support integration production"
- "run Claude agents multiple agents concurrently server deployment"
- "Fixie AI JSX agent platform status"
- "what are people actually using AI agents production not demo"

**Orient:** 80-90% of agent projects fail in production. CrewAI-to-LangGraph migration is a real pattern. Anthropic's own guidance on long-running agents emphasizes progress files and git-based state. The production reality is much more constrained than vendor marketing suggests.

### Round 5: March 2026 Landscape Update (6 searches)
- "Claude Agent SDK update new features March 2026"
- "AI agent platform framework production March 2026"
- "LangGraph enterprise NVIDIA agent platform March 2026"
- "OpenAI Frontier enterprise agent platform 2026"
- "Bedrock AgentCore update March 2026 new features"
- "A2A protocol agent production deployment real 2026"

**Key developments:**

1. **Bedrock AgentCore — 5 features in March:** Policy GA (Cedar-based agent governance outside agent code), Stateful MCP (session persistence in microVMs), AG-UI protocol (agent-user interface standard), Memory Streaming (Kinesis push for long-term memory), Shell Command API. First platform supporting all three protocols (MCP + A2A + AG-UI). ([AWS announcements](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/), Mar 2026)

2. **LangChain + NVIDIA enterprise partnership (Mar 16):** Deep Agents (long-running agent harness), NVIDIA AI-Q Blueprint (#1 deep research benchmark), OpenShell (secure sandbox), NIM microservices (2.6x throughput). LangChain: 1B cumulative downloads, 300+ enterprise LangSmith customers. ([LangChain blog](https://blog.langchain.com/nvidia-enterprise/), Mar 2026)

3. **OpenAI Frontier (Feb 5):** Enterprise agent platform. Multi-vendor (supports Claude, Gemini, GPT). Named customers: HP, Intuit, Oracle, State Farm, Uber. Vendor-sourced results: manufacturer reduced 6 weeks → 1 day; investment firm freed 90% of sales time; energy producer +5% output = $1B+. Zero independent verification at 6+ weeks post-launch. ([OpenAI](https://openai.com/index/introducing-openai-frontier/); [TechCrunch](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/), Feb 2026)

4. **Claude Agent SDK March updates:** Opus 4.6 + Sonnet 4.6 (1M context). Compaction API (beta) for infinite conversations. Data residency controls (US-only inference at 1.1x). MCP Elicitation (interactive forms). Effort parameter GA. ([platform.claude.com](https://platform.claude.com/docs/en/release-notes/overview); [npm](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk), Mar 2026)

5. **A2A Protocol v0.3:** gRPC support, security card signing. Integrated into LangSmith Agent Server and Spring AI. 150+ partner organizations. Google offering Agent Engine, Cloud Run, GKE deployment paths. ([Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade), Mar 2026)

6. **New entrant — Dify:** No-code/low-code agent platform, $30M funding, claims 280 enterprises and 1.4M deployments. Vendor claims, no independent verification.

6. **NVIDIA Agent Toolkit / NemoClaw (GTC 2026, Mar 10-18):** Enterprise agent runtime with sandboxing, least-privilege, privacy router. AI-Q Blueprint for deep research. 17 enterprise partners. Hardware-agnostic. Alpha stage. Jensen Huang: "For CEOs, the question is, what's your OpenClaw strategy?" ([NVIDIA Newsroom](https://nvidianews.nvidia.com/news/ai-agents), Mar 2026)

7. **Google ADK 2.0 Alpha:** Graph-based workflows (competing with LangGraph), now supporting Python + TypeScript + Go + Java. Built-in A2A support. ([Google ADK docs](https://google.github.io/adk-docs/), Mar 2026)

8. **AG-UI Protocol emerging as third standard:** Agent-User Interaction protocol (alongside MCP for tools, A2A for agents). Created by CopilotKit. Adopted by AWS, Microsoft Agent Framework, Pydantic AI. ([AG-UI docs](https://docs.ag-ui.com/), Mar 2026)

9. **MCP enterprise governance ecosystem:** 7+ frameworks launched. Roadmap updated Mar 5: SSO-integrated auth, gateway/proxy patterns, configuration portability as extensions. Visual Studio 2026 shipped MCP governance via GitHub allowlists. ([MCP roadmap](https://modelcontextprotocol.io/development/roadmap), Mar 2026)

10. **Production failure patterns converging:** Compound reliability (85% per step × 10 = 20%), context rot, Replit production database wipe (agent deleted DB then lied). Broken eval frameworks: benchmarks "terrible at predicting real-world success." ([eWeek](https://www.eweek.com/news/replit-ai-coding-assistant-failure/); [Composio](https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap), Q1 2026)

**Orient:** Bedrock AgentCore pulling ahead as the most complete managed runtime (policy + all three protocols). LangChain consolidating as the default framework layer with NVIDIA partnership. OpenAI Frontier is the newest platform competitor but still zero independent evidence. The framework-vs-platform distinction matters: LangGraph is logic, Bedrock/Azure/Frontier are hosting — they complement, not compete. Claude SDK data residency controls significant for EU/Nordic compliance. The three-protocol stack (MCP + A2A + AG-UI) is crystallizing as enterprise architecture. NVIDIA entering as infrastructure layer. Compound reliability math (85%^10 = 20%) is the fundamental blocker for multi-step business agents.

### What Was Absent

- No managed "Claude Agent Server" product from Anthropic
- No dominant open-source agent runtime (Letta closest but niche)
- Limited independent verification of CrewAI's "60% Fortune 500" and "450M workflows" claims
- Very few public postmortems of failed agent deployments (survivorship bias in discussions)
- Limited information on actual concurrent agent limits in production (how many agents can really run simultaneously?)
- No independent reviews of OpenAI Frontier at 6+ weeks post-launch
- No independent reviews of Bedrock AgentCore Policy GA or other March features
- No practitioner reports on LangChain Deep Agents (announced Mar 16, too early)
