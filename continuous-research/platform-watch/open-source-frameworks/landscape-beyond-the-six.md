---
type: landscape-scan
domain: platform
evidence_level: 1-2
updated: 2026-04-02
cycle: 1
answers:
  - "what open-source agent frameworks exist beyond LangGraph, CrewAI, Mastra, MS Agent Framework, Google ADK?"
  - "which newer agent frameworks should a CTO know about?"
  - "are there European or non-US agent frameworks worth watching?"
  - "what low-code agent builders exist for business users?"
  - "what agent deployment/runtime platforms exist?"
---

# Open-Source Agent Frameworks: The Wider Landscape

Last updated: 2026-04-02
Scope: Everything BEYOND the six frameworks tracked in `state.md` (LangGraph, CrewAI, Mastra, Microsoft Agent Framework, Google ADK, Ruflo)

**Why this matters:** A CTO asking "which framework?" will find the top 5-6 everywhere. The wider landscape reveals specialized tools, infrastructure layers, and low-code options that may actually matter more for non-coding business process use cases. This scan maps 35+ additional projects across seven categories.

**Research method:** Web searches across multiple queries (see bottom), cross-referenced with the Lars de Ridder 44-framework analysis (Feb 2026) and multiple 2026 roundup articles. Every project checked for: active development, GitHub stars, enterprise evidence, business user accessibility.

**Key finding up front:** The landscape is fragmenting into layers, not competing monoliths. The stack is standardizing around: **Model -> Runtime -> Framework -> Agent**. A CTO doesn't pick one framework -- they pick a layer combination. The frameworks in `state.md` are the "framework" layer. This document covers the other layers plus specialized alternatives.

---

## Category 1: Major Alternative Frameworks (developer-focused, code-required)

These are serious frameworks with real traction that compete with or complement the top 6.

### Agno (formerly Phidata)
- **Origin:** Rebranded from Phidata in January 2025
- **URL:** [github.com/agno-agi/agno](https://github.com/agno-agi/agno) [vendor press release]
- **GitHub stars:** ~18.5K+
- **Language:** Python
- **What makes it different:** Lightweight, function-calling-focused. Multi-modal agent support. Model-agnostic. Designed for simplicity -- less abstraction than LangGraph, less role-playing than CrewAI. Performance-focused runtime for multi-agent systems.
- **Enterprise evidence:** None found independently. Marketing materials only.
- **Business user accessible:** No. Developer-only.
- **Status:** Active, growing. Positioned as the "simple Python agent framework" alternative.
- **Evidence level:** Level 1

### PydanticAI
- **Origin:** Pydantic team (the validation layer powering OpenAI, Anthropic, LangChain, etc.)
- **URL:** [github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) [vendor press release]
- **GitHub stars:** 16K+
- **Language:** Python
- **What makes it different:** Type-safe agent development using Pydantic v2 validation. Built-in Logfire observability. Supports MCP, A2A, and human-in-the-loop. Agents definable in YAML/JSON -- no code required for configuration. Supports virtually every major LLM provider. Composable capabilities (bundles of tools, hooks, instructions).
- **Enterprise evidence:** The Pydantic library itself is used by OpenAI, Anthropic, Google, etc. PydanticAI framework adoption is newer -- no named enterprise agent deployments found.
- **Business user accessible:** Partially -- YAML agent definitions lower the bar, but still requires developer setup.
- **Status:** Active, rapidly iterating. One of the "consolidation winners" per the 44-framework analysis.
- **Evidence level:** Level 1

### smolagents (Hugging Face)
- **Origin:** Hugging Face (France)
- **URL:** [github.com/huggingface/smolagents](https://github.com/huggingface/smolagents) [vendor press release]
- **GitHub stars:** 26K+ (from ~3K in early 2025 -- explosive growth)
- **Language:** Python
- **What makes it different:** Minimalist -- main code is <1,000 lines. Agents write Python code to act (CodeAgent), not JSON tool calls. ~30% fewer LLM calls than standard tool-calling approaches. Model-agnostic via LiteLLM. Sandboxed execution (E2B, Docker, Pyodide/Deno). Hugging Face ecosystem integration.
- **Enterprise evidence:** None found independently. Hugging Face's own courses teach it.
- **Business user accessible:** No. Developer-only, code-execution focused.
- **Status:** Very active (commits as recent as March 29, 2026). Growing fast. European origin (France).
- **Evidence level:** Level 1

### OpenAI Agents SDK (successor to Swarm)
- **Origin:** OpenAI (US)
- **URL:** [github.com/openai/openai-agents-python](https://github.com/openai/openai-agents-python), [github.com/openai/openai-agents-js](https://github.com/openai/openai-agents-js) [vendor press release]
- **Language:** Python and TypeScript
- **What makes it different:** Production-ready evolution of Swarm. Lightweight, few abstractions. Handoffs (agent-to-agent transfer), guardrails, tracing, sessions, realtime voice agents. Provider-agnostic despite OpenAI branding (supports 100+ LLMs). Open source.
- **Enterprise evidence:** OpenAI's own production systems. No independent enterprise case studies found for the SDK specifically.
- **Business user accessible:** No. Developer-only.
- **Status:** Active, production-grade. Replaces Swarm (now educational-only).
- **Evidence level:** Level 1

### Claude Agent SDK (Anthropic)
- **Origin:** Anthropic (US)
- **URL:** [github.com/anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) [vendor press release]
- **Language:** Python (0.1.48), TypeScript/Node.js (0.2.71)
- **What makes it different:** Powers Claude Code internally. Same agent loop, tools, and context management Anthropic uses. Built-in tools: file read/write, shell commands, HTTP requests, web search. MCP-native -- tools implemented as in-process MCP servers. Subagent orchestration built in.
- **Enterprise evidence:** Powers Claude Code (used by F-Secure, among many others). No independent enterprise case studies for the SDK itself.
- **Business user accessible:** No. Developer-only.
- **Status:** Active, rapid iteration. The "pattern-based" approach (not a traditional framework).
- **Evidence level:** Level 1

### AWS Strands Agents
- **Origin:** AWS (US)
- **URL:** [strandsagents.com](https://strandsagents.com/), [github.com/strands-agents](https://github.com/strands-agents) [vendor press release]
- **Language:** Python and TypeScript
- **What makes it different:** Model-driven approach -- the model drives behavior, not rigid orchestration. 14M+ downloads since May 2025 launch. Model-agnostic (Bedrock, Anthropic, OpenAI, Gemini, Ollama, etc.). Deploy to Lambda, Fargate, EKS, Bedrock AgentCore, Docker, K8s. OpenTelemetry observability built in. Strands Labs (2026) for experimental agentic research.
- **Enterprise evidence:** Amazon Q Developer, AWS Glue, VPC Reachability Analyzer use Strands internally. ([AWS Blog](https://aws.amazon.com/blogs/opensource/introducing-strands-labs-get-hands-on-today-with-state-of-the-art-experimental-approaches-to-agentic-development/) -- [vendor press release]) No independent enterprise case studies.
- **Business user accessible:** No. Developer-only.
- **Status:** Very active. Major cloud provider backing. The AWS answer to Google ADK.
- **Evidence level:** Level 1-2 (internal AWS production use is real evidence, but vendor-sourced)

### AG2 (formerly AutoGen community fork)
- **Origin:** Chi Wang + Qingyun Wu (original AutoGen creators, departed Microsoft)
- **URL:** [github.com/ag2ai/ag2](https://github.com/ag2ai/ag2) [practitioner direct]
- **Language:** Python
- **What makes it different:** Community-driven fork of AutoGen 0.2, maintaining backward compatibility while Microsoft went a completely different direction with their Agent Framework. Open governance with maintainers from Meta, IBM, and universities. Apache 2.0 license for new code.
- **Enterprise evidence:** Inherits AutoGen's user base. Novo Nordisk mentioned as AutoGen user in pre-fork era. No independent AG2-specific deployments found.
- **Business user accessible:** No. Developer-only.
- **Status:** Active, but overshadowed. The "AutoGen split into 4 parts" situation creates confusion: Microsoft Agent Framework (official), AG2 (community fork), AutoGen Studio (visual), and the original AutoGen (maintenance mode).
- **Evidence level:** Level 1

### LlamaIndex Workflows + AgentWorkflow
- **Origin:** LlamaIndex (US)
- **URL:** [llamaindex.ai](https://www.llamaindex.ai/) [vendor press release]
- **Language:** Python
- **What makes it different:** RAG-first, now adding agent capabilities. Event-driven async workflow engine. Pre-built document agent templates (Q&A, invoice processing). Agentic Document Workflows (ADW) -- combines document processing, retrieval, structured outputs, and orchestration. "Vibe-coding" document extraction with one-command deployment.
- **Enterprise evidence:** Strong RAG adoption. Agent-specific deployments not independently documented.
- **Business user accessible:** Partially -- pre-built templates and llamactl deployment lower the bar.
- **Status:** Very active. Pivoting from "RAG framework" to "document agent platform."
- **Evidence level:** Level 1

### DSPy (Stanford NLP)
- **Origin:** Stanford University (US)
- **URL:** [github.com/stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) [academic/research]
- **Language:** Python
- **What makes it different:** Programming, not prompting. Declarative framework that compiles AI programs into optimized prompts and weights. Auto-optimization (MIPROv2, BetterTogether). Modules: Predict, ChainOfThought, ReAct (agent), ProgramOfThought. Academic rigor -- from Stanford NLP group.
- **Enterprise evidence:** Academic research citations. No enterprise deployment case studies found.
- **Business user accessible:** No. Requires understanding of ML optimization concepts.
- **Status:** Active, academically strong. More of a compiler/optimizer than an agent framework per se.
- **Evidence level:** Level 1 (academic)

### Llama Stack (Meta)
- **Origin:** Meta (US)
- **URL:** [github.com/meta-llama/llama-stack](https://github.com/meta-llama/llama-stack) [vendor press release]
- **Language:** Python
- **What makes it different:** Standardized API for the Llama model ecosystem. Drop-in replacement for OpenAI API. Covers model customization, fine-tuning, synthetic data generation, and agentic application building. Partnerships: AWS, Databricks, Dell, Red Hat. Runs anywhere -- laptop, datacenter, cloud.
- **Enterprise evidence:** Red Hat partnership for enterprise deployment via OpenShift. ([Red Hat](https://www.redhat.com/en/about/press-releases/red-hat-and-meta-collaborate-advance-open-source-ai-enterprise) -- [vendor press release]) No independent agent deployment case studies.
- **Business user accessible:** No. Infrastructure-level, developer-only.
- **Status:** Active. More infrastructure than framework -- the "plumbing" for Llama-based agents.
- **Evidence level:** Level 1

### Haystack (deepset) -- Agent Expansion
- **Origin:** deepset (Germany)
- **URL:** [github.com/deepset-ai/haystack](https://github.com/deepset-ai/haystack) [vendor press release]
- **Language:** Python
- **What makes it different:** Enterprise-scale RAG framework that added agent capabilities. Pipeline architecture with branching, looping, conditional logic. Hayhooks for HTTP endpoints + MCP server exposure. **Haystack Enterprise Starter** with enterprise support, templates, and secure deployment guidance. German origin -- potential data sovereignty advantage for European enterprises.
- **Enterprise evidence:** deepset has enterprise customers for RAG. Agent-specific enterprise evidence not found independently.
- **Business user accessible:** No. Developer-only, but pipeline architecture is more declarative than code-heavy frameworks.
- **Status:** Active, mature. One of the Tier 1 frameworks in the 44-framework analysis. European origin.
- **Evidence level:** Level 2 (for RAG), Level 1 (for agents)

---

## Category 2: Low-Code / Visual Agent Builders

**This category matters most for business users.** These are the platforms where non-developers might actually build agents.

### Dify
- **Origin:** LangGenius (originally Chinese team, now global)
- **URL:** [github.com/langgenius/dify](https://github.com/langgenius/dify) [vendor press release]
- **GitHub stars:** 134K+ (as of March 2026 -- massive)
- **What makes it different:** Open-source LLM app platform with visual drag-and-drop workflow builder. Agent capabilities via ReAct or Function Calling. 50+ built-in tools. RAG pipeline included. Model-agnostic (OpenAI, Anthropic, Mistral, Llama, DeepSeek, open-source). Observability via Opik, Langfuse, Arize Phoenix. Cloud version with free tier (200 GPT-4 calls).
- **Enterprise evidence:** 134K stars suggests massive adoption, but no named enterprise deployments found independently. Self-hosted by many organizations for data privacy.
- **Business user accessible:** YES -- this is the strongest open-source option for business users. Visual builder, no code required for basic workflows.
- **Status:** Very active. Fastest-growing in this category. The "open-source alternative to vertical SaaS" for many teams.
- **Evidence level:** Level 2 (community adoption is real, enterprise specifics lacking)

### n8n
- **Origin:** n8n GmbH (Berlin, Germany)
- **URL:** [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n) [vendor press release]
- **GitHub stars:** 150K-182K (sources vary -- massive either way)
- **What makes it different:** Workflow automation platform (think Zapier but self-hosted) that added native AI agent capabilities. 400+ integrations (Slack, Salesforce, databases, APIs). AI agent nodes with tool calling, RAG, vector DB integration. Human-in-the-loop approvals. Fair-code license (not pure open source). Visual builder with custom code support.
- **Enterprise evidence:** Widely used for workflow automation. AI agent adoption is newer -- no named enterprise AI agent deployments found independently. German origin.
- **Business user accessible:** YES -- designed for power users with "some technical skills." Not for pure non-technical users, but far more accessible than code-only frameworks.
- **Status:** Very active. Top 50 GitHub project. The "gateway drug" for business teams wanting AI agents -- they already use n8n for automation.
- **Evidence level:** Level 2 (workflow automation proven, AI agent layer newer)

### Flowise
- **Origin:** FlowiseAI (acquired by Workday in 2025)
- **URL:** [github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) [vendor press release]
- **GitHub stars:** ~36K-49K (sources vary)
- **What makes it different:** Visual drag-and-drop builder for LangChain flows, AI agents, and chatbots. Connect nodes on a canvas -- no orchestration code. Modular building blocks for compositional workflows to autonomous agents.
- **Enterprise evidence:** Workday acquisition gives enterprise backing. Open-source commitment uncertain post-acquisition. Used by DHS for chatbot prototyping ([GitHub](https://github.com/blueraster/DHS-AI-Chatbot-Flowise) -- [practitioner direct]).
- **Business user accessible:** YES -- visual builder is the entire point.
- **Status:** Active but uncertain. Workday acquisition in 2025 raises questions about long-term open-source direction.
- **Evidence level:** Level 1-2

### Langflow
- **Origin:** Originally community, then DataStax
- **URL:** [github.com/langflow-ai/langflow](https://github.com/langflow-ai/langflow) [vendor press release]
- **Language:** Python-based, model/API/database agnostic
- **What makes it different:** Visual IDE for drag-and-drop building and testing of multi-agent and RAG workflows. Playground for step-by-step testing. Publish as API or export as Python app. Multi-agent orchestration built in.
- **Enterprise evidence:** DataStax Langflow (hosted version) was DEPRECATED March 9, 2026, with shutdown April 9, 2026. OSS version continues independently.
- **Business user accessible:** YES -- visual builder. But DataStax deprecation removes the easy hosted path.
- **Status:** CAUTION. The hosted DataStax version is dead. Open-source version continues but lost its enterprise backer. Framework churn risk is real here.
- **Evidence level:** Level 1

### AutoGPT Platform
- **Origin:** Significant Gravitas (US)
- **URL:** [github.com/Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) [vendor press release]
- **GitHub stars:** 183K (legacy hype -- most stars are from the 2023 viral moment)
- **What makes it different:** Evolved from the original "autonomous GPT" experiment into a platform with low-code agent builder, marketplace for pre-built agents, and cloud-hosted execution. Latest release: v0.6.52 (March 2026).
- **Enterprise evidence:** None found. Platform is still in beta. 183K stars reflect 2023 hype, not current usage.
- **Business user accessible:** Partially -- the platform has a visual builder, but it's still beta-quality.
- **Status:** Active but struggling to find product-market fit post-hype. The gap between "183K GitHub stars" and "zero enterprise customers" tells the story.
- **Evidence level:** Level 0-1

---

## Category 3: Enterprise-Backed Agent Infrastructure

### BeeAI Framework (IBM / Linux Foundation)
- **Origin:** IBM Research, now hosted by Linux Foundation
- **URL:** [github.com/i-am-bee/beeai-framework](https://github.com/i-am-bee/beeai-framework) [vendor press release]
- **Language:** Python AND TypeScript (full feature parity)
- **What makes it different:** Linux Foundation governance (open governance, not single-vendor). Production-grade multi-agent systems. 10+ LLM providers including Watsonx.ai. 4 memory strategies. MCP integration. IBM backing with academic rigor.
- **Enterprise evidence:** IBM internal use. Linux Foundation governance increases enterprise trust. No independent deployment case studies found.
- **Business user accessible:** No. Developer-only.
- **Status:** Active. The "safe enterprise choice" for companies wanting open governance guarantees.
- **Evidence level:** Level 1

### NVIDIA Agent Toolkit (NeMo Agent Toolkit / AgentIQ)
- **Origin:** NVIDIA (US), announced GTC 2026
- **URL:** [github.com/NVIDIA/AgentIQ](https://github.com/NVIDIA/AgentIQ) [vendor press release]
- **What makes it different:** Three-component stack: NemoClaw runtime, AI-Q research agent blueprint, Nemotron open models. OpenShell runtime with policy-based security/privacy guardrails. Hybrid architecture routing complex tasks to frontier models, research tasks to open models (claims 50%+ cost reduction). Enterprise adopters: Adobe, Salesforce, SAP, ServiceNow, Siemens, CrowdStrike, Atlassian, Cadence, Synopsys, Palantir, Red Hat, Cisco. ([NVIDIA](https://nvidianews.nvidia.com/news/ai-agents) -- [vendor press release]; [VentureBeat](https://venturebeat.com/technology/nvidia-launches-enterprise-ai-agent-platform-with-adobe-salesforce-sap-among) -- [general press])
- **Enterprise evidence:** 17 named enterprise adopters at launch is strong signal. But this is announcement-level -- no deployment metrics yet.
- **Business user accessible:** No. Infrastructure-level.
- **Status:** Brand new (March 2026). Enormous enterprise weight behind it. Watch this closely.
- **Evidence level:** Level 1 (announcement + named partners, no deployment evidence yet)

### Akka Agentic Platform (formerly Lightbend)
- **Origin:** Lightbend -> Akka (US/Sweden heritage -- originally a Scala/JVM company)
- **URL:** [akka.io](https://akka.io/) [vendor press release]
- **What makes it different:** NOT open source (commercial). Built on the Akka actor model -- decades of distributed systems expertise applied to agents. Enterprise features: orchestration, agents, memory, streaming. Claims 3x velocity and 1/3 cost vs. alternatives. Self-hosted or multi-region on Akka Platform.
- **Enterprise evidence:** Capital One, John Deere, Tubi, Walmart, Swiggy, HPE as existing Akka users (pre-agentic platform). ([Akka.io](https://akka.io/) -- [vendor press release])
- **Business user accessible:** No. Enterprise developer platform.
- **Status:** Active. Not open source -- commercial platform. Included because Akka has real enterprise distributed systems DNA.
- **Evidence level:** Level 1 (enterprise customers are for Akka platform, not specifically the agentic features)

---

## Category 4: Specialized Agent Tools (Not Frameworks -- Integration/Routing/Memory Layers)

These don't compete with frameworks. They're the "picks and shovels" that any framework needs.

### Composio (Agent Integration Layer)
- **Origin:** ComposioHQ (US/India)
- **URL:** [github.com/ComposioHQ/composio](https://github.com/ComposioHQ/composio) [vendor press release]
- **What it does:** 1,000+ tool integrations for agents. Managed authentication (handles OAuth etc. for end users). 500+ LLM-ready tool connectors. Triggers for event-driven automation (Slack messages, GitHub issues, etc.). Agent-agnostic -- works with any framework.
- **Why it matters:** The integration problem is real. Every framework has 10-50 built-in tools. Composio has 1,000+. If your agent needs to talk to Salesforce, GitHub, Slack, and JIRA, Composio handles the auth and API plumbing.
- **Business user accessible:** Partially -- the integration layer removes coding from the connection step.
- **Status:** Active, well-funded. Important infrastructure piece.
- **Evidence level:** Level 1

### Semantic Router (Aurelio AI)
- **Origin:** Aurelio AI (UK)
- **URL:** [github.com/aurelio-labs/semantic-router](https://github.com/aurelio-labs/semantic-router) [vendor press release]
- **What it does:** Superfast decision-making layer. Routes requests using semantic vector space instead of LLM calls. Choose the right LLM/tool for each task. Can scale to thousands of tools -- context window can't hold them all, but semantic routing can select the right ones.
- **Why it matters:** As agents get more tools, the "which tool to use" decision becomes a bottleneck. Semantic Router solves this without burning tokens on an LLM call.
- **Business user accessible:** No. Developer library.
- **Status:** Active, niche but important. MIT license.
- **Evidence level:** Level 1

### Crawl4AI (Web Data for Agents)
- **Origin:** Open source (unclecode)
- **URL:** [github.com/unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) [practitioner direct]
- **GitHub stars:** 58K+ (#1 GitHub trending)
- **What it does:** Turns the web into clean, LLM-ready Markdown for RAG, agents, and data pipelines. Full browser control. Multi-browser support (Chromium, Firefox, WebKit).
- **Why it matters:** Agents need data. Crawl4AI is the leading open-source way to get web data into agent-digestible format. Essential infrastructure piece.
- **Status:** Explosive growth (0 to 58K stars in under a year).
- **Evidence level:** Level 2 (massive practitioner adoption)

---

## Category 5: Memory-First and Stateful Agent Platforms

### Letta (formerly MemGPT)
- **Origin:** MemGPT research project -> Letta company (US)
- **URL:** [github.com/letta-ai/letta](https://github.com/letta-ai/letta) [vendor press release]
- **Language:** Python
- **What makes it different:** Memory IS the architecture. Hierarchical memory: core (always in context), recall (conversation history), archival (long-term knowledge). Letta V1 architecture evolving toward modern agent patterns. Letta Code: model-agnostic coding agent with git-backed memory. Conversations API for shared memory across parallel user sessions. Letta Evals for testing stateful agents.
- **Enterprise evidence:** No named enterprise deployments found. Strong research pedigree.
- **Business user accessible:** No. Developer-only.
- **Status:** Active. The only framework where memory is the primary architectural concern (not an add-on). Per the 44-framework analysis: "Only Letta treats memory as foundational architecture."
- **Evidence level:** Level 1-2

### Julep
- **Origin:** Julep AI (US)
- **URL:** [github.com/julep-ai/julep](https://github.com/julep-ai/julep) [vendor press release]
- **What makes it different:** "Firebase for AI agents." Serverless stateful agent platform. Persistent memory across conversations. Modular workflows in YAML or code. Branching logic, loops, parallel execution, error handling. Serverless scaling without devops.
- **Enterprise evidence:** None found.
- **Business user accessible:** Partially -- YAML workflow definitions lower the bar.
- **Status:** Active, niche. The serverless + stateful combination is unique.
- **Evidence level:** Level 0-1

---

## Category 6: Emerging / Specialized Frameworks

### Deer-Flow 2.0 (ByteDance)
- **Origin:** ByteDance (China)
- **URL:** [github.com/bytedance/deer-flow](https://github.com/bytedance/deer-flow) [vendor press release]
- **GitHub stars:** 45.6K+ (gained ~3,800 in a single day after v2 launch)
- **What makes it different:** "SuperAgent harness" for long-horizon tasks (minutes to hours). Built on LangGraph/LangChain. Ships with: filesystem, memory, skills, sandbox execution, sub-agent spawning. Skills for research, report generation, slides, web pages, images, video. Sub-agents run in parallel with scoped context.
- **Enterprise evidence:** None found outside ByteDance internal use.
- **Business user accessible:** Partially -- pre-built skills lower the bar for content/research tasks.
- **Status:** Very new (Feb-March 2026). Explosive growth. Chinese origin may create data sovereignty concerns for some enterprises.
- **Evidence level:** Level 1

### Swarms (Kye Gomez / Swarm Corporation)
- **Origin:** Swarm Corporation (US)
- **URL:** [github.com/kyegomez/swarms](https://github.com/kyegomez/swarms) [vendor press release]
- **What makes it different:** Enterprise-grade multi-agent orchestration with hierarchical swarms, parallel processing, sequential workflows, and graph-based networks. Claims 99.9%+ uptime. Swarms API for managed multi-agent collaboration. Also has Rust version (swarms-rs). ClawSwarm (Feb 2026) for multi-platform messaging (Telegram, Discord, WhatsApp).
- **Enterprise evidence:** None found independently. Marketing language is extremely aggressive ("Enterprise-Grade Production-Ready") with no named customers.
- **Business user accessible:** No.
- **Status:** Active, prolific output. Single-maintainer risk similar to Ruflo. Claims exceed evidence significantly.
- **Evidence level:** Level 0

### Agent Zero
- **Origin:** Agent0AI (US)
- **URL:** [github.com/agent0ai/agent-zero](https://github.com/agent0ai/agent-zero) [vendor press release]
- **GitHub stars:** ~3.4K+
- **What makes it different:** Autonomous agent running in Docker with full Linux environment. Can execute Python, Node.js, Bash. Spawns child agents for complex tasks. Persistent memory with AI-filtered retrieval. Model-agnostic (OpenAI, Anthropic, Venice.ai, local).
- **Enterprise evidence:** None.
- **Business user accessible:** No. Requires Docker, command line.
- **Status:** Active, small community. More of a personal assistant/power user tool than enterprise framework.
- **Evidence level:** Level 0-1

### OpenAgents
- **Origin:** OpenAgents community
- **URL:** [openagents.org](https://openagents.org/) [vendor press release]
- **What makes it different:** Purpose-built for interoperable agent networks. Native MCP + A2A protocol support. Protocol-independent (WebSocket, gRPC, HTTP, libp2p, A2A). Agents discover peers and collaborate autonomously. Persistent agent networks that grow over time.
- **Enterprise evidence:** None found.
- **Business user accessible:** No.
- **Status:** Early. Interesting bet on the interoperability thesis -- agents from different frameworks talking to each other.
- **Evidence level:** Level 0-1

### FastAgency
- **Origin:** Community
- **URL:** FastAgency [vendor press release]
- **What makes it different:** Bridges AG2/AutoGen workflows to production deployment. Write agent logic once, run in console, web, or distributed. Auto-generates API connectors from OpenAPI specs. Tester class for CI pipeline validation of multi-agent workflows.
- **Enterprise evidence:** None found.
- **Business user accessible:** No. Developer tool for deployment.
- **Status:** Active, niche. Useful for AG2 users wanting production deployment.
- **Evidence level:** Level 0-1

### MetaGPT
- **Origin:** DeepWisdom / FoundationAgents (China)
- **URL:** [github.com/FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) [vendor press release]
- **What makes it different:** "AI Software Company" -- simulates a full dev team (PM, architect, engineers). One-line requirement -> PRD, design, tasks, code. MGX (MetaGPT X) launched Feb 2025 as "first AI agent development team." AFlow paper accepted at ICLR 2025 (top 1.8%).
- **Enterprise evidence:** Academic recognition (ICLR). No enterprise deployment case studies.
- **Business user accessible:** Partially -- one-line input is very accessible, but output is software artifacts.
- **Status:** Active, academically strong. More of a research project than production framework.
- **Evidence level:** Level 1 (academic)

### Rasa (Conversational AI + Agents)
- **Origin:** Rasa Technologies (Germany/US)
- **URL:** [github.com/RasaHQ/rasa](https://github.com/RasaHQ/rasa) [vendor press release]
- **GitHub stars:** Established (25M+ downloads historically)
- **What makes it different:** Conversational AI framework with CALM engine separating LLM fluency from business logic. Hello Rasa playground for prototyping. "Blazed the path" of separating language (LLM) from logic (deterministic flows). Rasa Pro for enterprise.
- **Enterprise evidence:** Real enterprise customers (pre-agentic era). Banking, telecom, support templates.
- **Business user accessible:** YES -- Hello Rasa playground is browser-based, template-driven.
- **Status:** Active, pivoting from chatbots to agentic AI. European origin (Germany). Strong in regulated industries.
- **Evidence level:** Level 2 (for conversational AI), Level 1 (for agentic capabilities)

### SuperAGI
- **Origin:** SuperAGI (India)
- **URL:** [github.com/TransformerOptimus/SuperAGI](https://github.com/TransformerOptimus/SuperAGI) [vendor press release]
- **What makes it different:** Dev-first autonomous agent framework. Early mover in "autonomous agent" space (2023). Enterprise-focused architecture with emphasis on control and reliability. GUI for agent management.
- **Enterprise evidence:** Marketing claims enterprise focus. No named customers found.
- **Business user accessible:** Partially -- has a GUI.
- **Status:** Active but unclear traction. The 2023 autonomous agent hype wave has passed, and SuperAGI hasn't clearly differentiated in the 2026 landscape.
- **Evidence level:** Level 0-1

### BabyAGI / AgentGPT
- **Origin:** Yohei Nakajima (BabyAGI), Reworkd (AgentGPT)
- **What they were:** 2023 pioneering "autonomous agent" experiments. BabyAGI = task-driven agent loop. AgentGPT = browser-based autonomous agents.
- **Status (2026):** Still maintained but largely historical. BabyAGI improved memory management and multi-model support. AgentGPT still runs in browser. Neither has meaningful enterprise adoption. They were the spark -- others built the fire.
- **Business user accessible:** AgentGPT yes (browser-based). BabyAGI no.
- **Evidence level:** Level 0 (historical significance, minimal current relevance)

---

## Category 7: Durable Execution / Agent Runtime Platforms

These aren't agent frameworks -- they're the infrastructure agents run ON. Critical for production.

### Temporal
- **Origin:** Temporal Technologies (US, ex-Uber/AWS)
- **URL:** [temporal.io](https://temporal.io/) [vendor press release]
- **What it does:** Durable execution engine. Workflows survive server crashes, network outages, deployments. Temporal Nexus GA (cross-namespace workflows). Multi-Region Replication GA (99.99% SLA). Separates deterministic workflow logic from non-deterministic LLM activities.
- **Why it matters for agents:** Long-running agents need durability. If your agent takes 4 hours to process invoices and the server crashes at hour 3, Temporal picks up where it left off. Battle-tested at Uber, Netflix, Stripe, Snap.
- **Business user accessible:** No. Infrastructure.
- **Status:** Mature, production-proven. The "right answer" for durable agent execution at scale.
- **Evidence level:** Level 3 (convergence -- widely adopted for durable execution, increasingly used for agents)

### Inngest
- **Origin:** Inngest (US)
- **URL:** [inngest.com](https://www.inngest.com/) [vendor press release]
- **What it does:** Serverless-first, event-driven durable execution. Functions triggered by events, with automatic retry and persistence. Simpler than Temporal for TypeScript developers.
- **Why it matters for agents:** Event-driven agent triggers (new Slack message -> agent runs). Durable steps for reliable multi-step agent workflows. No infrastructure management.
- **Business user accessible:** No. Developer tool.
- **Status:** Active, growing. The "easier Temporal" for modern TypeScript stacks.
- **Evidence level:** Level 1-2

### Trigger.dev
- **Origin:** Trigger.dev (US)
- **URL:** [trigger.dev](https://trigger.dev/) [vendor press release]
- **What it does:** Build and deploy fully-managed AI agents and workflows. Open source, self-hostable. Focuses on developer experience for TypeScript. Background job infrastructure purpose-built for AI workloads.
- **Enterprise evidence:** Open source with self-host option.
- **Business user accessible:** No. Developer tool.
- **Status:** Active. Explicitly positioning as AI agent deployment infrastructure.
- **Evidence level:** Level 1

### Open Responses
- **Origin:** Community + Hugging Face ecosystem
- **URL:** [github.com/open-responses/open-responses](https://github.com/open-responses/open-responses) [practitioner direct]
- **What it does:** Self-hosted drop-in replacement for OpenAI's Responses API. Compatible with OpenAI Agents SDK. Works with all model providers (Claude, Qwen, R1, Ollama, etc.). Docker or CLI deployment.
- **Why it matters:** Lets you use OpenAI's Agents SDK with any model, self-hosted. Model freedom without rewriting agent code.
- **Business user accessible:** No. Infrastructure.
- **Status:** New (March 2025). Important for model-portability.
- **Evidence level:** Level 1

---

## The Landscape Pattern: What a CTO Should Actually See

### 1. The stack is layering, not consolidating

```
Layer 4: Agent (your business logic)
Layer 3: Framework (LangGraph, CrewAI, Mastra, PydanticAI, smolagents...)
Layer 2: Runtime (Temporal, Inngest, Trigger.dev)
Layer 1: Model (Claude, GPT, Gemini, Llama, local)
Layer 0: Infrastructure (cloud, GPU, observability)
```

Each layer is independently swappable. The framework wars are Layer 3 fights. Most CTOs should care more about Layer 2 (will my agent survive a crash?) and Layer 4 (does this solve my business problem?).

### 2. The "business user" gap is ENORMOUS

Out of 35+ projects surveyed, only 4 are accessible to business users:
- **Dify** (134K stars, visual builder, self-hosted)
- **n8n** (150K+ stars, workflow automation + AI, German origin)
- **Flowise** (36K+ stars, visual builder, but Workday acquisition uncertainty)
- **Rasa** (Hello Rasa playground, template-driven, German origin)

Everything else requires developers. This is the gap vertical SaaS fills.

### 3. European origins are notable

- **smolagents** -- Hugging Face (France)
- **Haystack** -- deepset (Germany)
- **n8n** -- n8n GmbH (Berlin, Germany)
- **Rasa** -- Rasa Technologies (Germany)
- **Akka** -- Swedish heritage (JVM/Scala roots)

For European enterprises with data sovereignty concerns, this matters. No dedicated "sovereign AI agent framework" exists, but European-origin projects with self-hosting options (n8n, Haystack, Rasa) partially address the need.

### 4. The real "beyond top 6" contenders for enterprise

If I had to name the platforms a CTO hasn't heard of but should know about:

1. **Dify** -- the open-source visual agent builder at 134K stars that business users can actually use
2. **n8n** -- the workflow automation platform at 150K+ stars that's becoming an AI agent platform
3. **NVIDIA Agent Toolkit** -- 17 enterprise partners at GTC 2026, open-source, hybrid model routing
4. **AWS Strands** -- 14M downloads, used inside Amazon's own products
5. **PydanticAI** -- type-safe agents from the team behind the validation layer everyone uses
6. **smolagents** -- Hugging Face's minimalist approach, 26K stars, European origin
7. **Temporal** -- not an agent framework but THE runtime for durable agent execution
8. **Haystack** -- German enterprise RAG + agents, with enterprise support tier

### 5. What we did NOT find

- **No European-first agent framework designed for EU AI Act compliance.** This is a gap.
- **No open-source framework with built-in agent governance** (audit trails, approval workflows, compliance reporting) at the level enterprises need. Everyone bolts this on.
- **No convergence on business process agents** across ANY of these frameworks. The documented use cases are overwhelmingly: coding agents, chatbots, RAG, data pipelines, and content generation.
- **No Nordic signal.** Zero Nordic companies building or contributing to any of these frameworks.
- **No framework shipping pre-built business process agents** (HR, finance, compliance templates that actually work in production). The templates that exist are demos, not production artifacts.

---

## Protocols and Standards (Cross-Cutting)

### MCP (Model Context Protocol)
- **Origin:** Anthropic, donated to Linux Foundation (Agentic AI Foundation)
- **Status:** 97M+ monthly SDK downloads. De facto standard for tool connection.
- **Adoption:** Supported by PydanticAI, Haystack, Composio, Claude Agent SDK, and most major frameworks.

### A2A (Agent2Agent Protocol)
- **Origin:** Google, donated to Linux Foundation
- **Status:** 50+ technology partners (Atlassian, Salesforce, SAP, ServiceNow, etc.)
- **Purpose:** Agent-to-agent communication and discovery across frameworks.
- **Adoption:** OpenAgents built natively on it. PydanticAI supports it. Growing.

These protocols matter more than any single framework. MCP + A2A together could make the framework choice less important over time -- if agents can talk to tools (MCP) and to each other (A2A) regardless of framework, the framework becomes a local implementation detail.

---

## Research Sources

Searches conducted:
- "open source AI agent framework 2026 GitHub new emerging"
- "Agno Phidata agent framework 2026 GitHub stars"
- "PydanticAI agent framework 2026 GitHub stars features"
- "n8n Dify Flowise Langflow AI agent builder 2026 comparison"
- "smolagents HuggingFace agent framework 2026"
- "Letta MemGPT agent framework 2026 status"
- "Haystack deepset agent framework 2026 features"
- "Composio agent tooling integration 2026 GitHub"
- "Llama Stack Meta agent infrastructure 2026"
- "IBM Bee Agent Framework open source 2026"
- "SuperAGI BabyAGI AgentGPT 2026 status alive dead"
- "AG2 AutoGen fork Microsoft agent framework 2026"
- "OpenAI Swarm agent framework 2026 status"
- "ControlFlow Prefect agent framework Burr DAGWorks 2026"
- "Julep stateful agent platform 2026"
- "Semantic Router agent routing orchestration 2026"
- "agent framework European sovereign AI 2026"
- "Dify open source LLM platform agent features 2026 GitHub stars"
- "n8n AI agent capabilities 2026 GitHub stars"
- "Langflow DataStax visual agent builder 2026"
- "Flowise open source chatbot builder 2026"
- "Agent Zero AI framework 2026"
- "OpenAI Agents SDK open source 2026"
- "Swarms framework Kye Gomez enterprise 2026"
- "agent deployment runtime hosting open source 2026"
- "Deer-Flow ByteDance agent framework 2026"
- "open source AI agent framework comparison 2026 comprehensive list"
- "OpenAgents A2A protocol 2026"
- "FastAgency agent framework 2026"
- "NVIDIA AgentIQ agent toolkit 2026 GTC"
- "Rasa open source conversational AI 2026"
- "LlamaIndex agent framework 2026"
- "Anthropic Claude agent SDK MCP 2026"
- "Akka agentic AI framework enterprise 2026"
- "Temporal Inngest Trigger.dev agent orchestration 2026"
- "open-responses self-hosted OpenAI Responses API alternative 2026"
- "AWS Strands agent framework 2026"
- "DSPy Stanford agent framework 2026"
- "Browser-Use Crawl4AI web agent framework 2026"
- "MetaGPT multi-agent framework 2026"
- "AutoGPT 2026 status GitHub stars"
- "context engineering AI agent framework 2026 analysis 44 frameworks"

Cross-referenced with: Lars de Ridder 44-framework analysis (Feb 2026), multiple 2026 roundup articles from Firecrawl, Shakudo, Lindy, AI Haven, ByteBytego, Botpress, Intuz, Bluehost, ToolRadar, Omdena, Instaclustr.

All source types labeled inline. Evidence levels assigned per project research rules.
