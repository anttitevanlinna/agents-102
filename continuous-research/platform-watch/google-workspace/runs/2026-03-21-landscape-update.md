# Agent Platform Landscape Update — 2026-03-21

**Purpose:** Track major developments across the agent platform landscape (March 2026) that affect the CTO platform question.

## Queries Used
- Claude Agent SDK update new features March 2026
- AI agent platform framework production March 2026
- LangGraph enterprise NVIDIA agent platform March 2026
- OpenAI Frontier enterprise agent platform 2026
- Bedrock AgentCore update March 2026 new features
- A2A protocol agent production deployment real 2026

## Findings

### Finding 1: Amazon Bedrock AgentCore — five major features in March 2026
**Source:** [AWS — AgentCore Policy GA](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/), [AWS — Stateful MCP](https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-stateful-mcp/), [AWS — AG-UI](https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-ag-ui-protocol/), [AWS — Memory Streaming](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-memory-streaming-ltm/), [AWS — Shell Command](https://aws.amazon.com/about-aws/whats-new/2026/03/bedrock-agentcore-runtime-shell-command/) — [vendor press release] for each
**Date:** March 3-17, 2026
**Agent level:** company
**Evidence level:** Level 0 (vendor announcements) but significant capability expansion
**What:** AgentCore shipped 5 features in rapid succession:
1. **Policy GA (Mar 3):** Centralized agent-tool access control using Cedar policy language. Natural language policy authoring. Operates OUTSIDE agent code — security teams can govern without modifying agents. Gateway intercepts every agent-tool call.
2. **Stateful MCP (Mar 10):** Dedicated microVM per session, session context persistence, server-initiated elicitation (multi-turn data gathering), sampling (AI-powered text generation from client).
3. **Memory Streaming (Mar 12):** Push notifications via Kinesis when long-term memory records change. Eliminates polling for memory updates.
4. **AG-UI Protocol (Mar 13):** Agent-User Interaction protocol support. Complements MCP (agent-tool) and A2A (agent-agent) with agent-user interface standardization.
5. **Shell Command API (Mar 17):** Direct shell command execution inside AgentCore sessions via API. Enables deterministic operations (tests, git, installs) alongside LLM reasoning.
**Key claims:** All GA or available. 14 AWS regions. Cedar policy language for agent governance.
**Significance for platform-watch:** AgentCore is pulling ahead on the "managed agent runtime" front. Policy GA addresses a gap we noted — external governance of agent behavior. The stateful MCP + AG-UI combination makes it the first platform supporting all three interaction protocols (MCP + A2A + AG-UI).

### Finding 2: LangChain + NVIDIA enterprise partnership (Mar 16, 2026)
**Source:** [LangChain Blog](https://blog.langchain.com/nvidia-enterprise/) — [vendor press release], [PR Newswire](https://www.prnewswire.com/news-releases/langchain-announces-enterprise-agentic-ai-platform-built-with-nvidia-302714006.html) — [vendor press release]
**Date:** March 16, 2026
**Agent level:** company
**Evidence level:** Level 0 (vendor partnership announcement)
**What:** LangChain announced enterprise platform built with NVIDIA. Key components:
- **Deep Agents:** LangChain's agent harness with task planning, sub-agent spawning, long-term memory, context management. Agents that run for minutes/hours across dozens of steps.
- **NVIDIA AI-Q Blueprint:** Production enterprise deep research system. Claims #1 on deep research benchmarks.
- **NVIDIA OpenShell:** Secure runtime sandboxing autonomous agents with policy-based guardrails.
- **Performance claims:** NIM microservices deliver "up to 2.6x higher throughput" vs standard deployments.
- **Scale:** 1 billion cumulative downloads, 1M practitioners, 300+ enterprise LangSmith customers, 15B traces processed.
**Key claims:** 1B downloads (vendor claim), 300+ enterprise customers (vendor claim), 2.6x throughput (vendor claim)
**Significance:** LangGraph/LangChain consolidating position as default enterprise agent framework. NVIDIA partnership adds hardware-accelerated inference. "Deep Agents" is a new concept — longer-running agents with planning and memory. Worth tracking for real deployments.

### Finding 3: OpenAI Frontier platform — launched Feb 5, early results emerging
**Source:** [OpenAI announcement](https://openai.com/index/introducing-openai-frontier/) — [vendor press release], [TechCrunch](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/) — [general press], [Fortune](https://fortune.com/2026/02/05/openai-frontier-ai-agent-platform-enterprises-challenges-saas-salesforce-workday/) — [general press], [CNBC](https://www.cnbc.com/2026/02/05/open-ai-frontier-enterprise-customers.html) — [general press]
**Date:** February 5, 2026
**Agent level:** company
**Evidence level:** Level 0 (vendor launch) + Level 2 (named customers with results, but vendor-sourced)
**What:** OpenAI launched Frontier as enterprise agent platform. Multi-vendor (supports Google, Microsoft, Anthropic agents). Named customers: HP, Intuit, Oracle, State Farm, Thermo Fisher, Uber, BBVA, Cisco, T-Mobile.
Vendor-sourced results:
- Major manufacturer: production optimization reduced from 6 weeks to 1 day
- Global investment company: 90%+ more time for salespeople
- Large energy producer: 5% output increase = $1B+ additional revenue
- Hardware troubleshooting: root cause from 4 hours to minutes
**Key claims:** 75% of enterprise workers say AI enabled previously impossible tasks (vendor survey). Enterprise = ~40% of OpenAI revenue, targeting 50%.
**Significance for platform-watch:** OpenAI now competing directly with Microsoft Agent 365 and Google Gemini Enterprise for the enterprise agent platform layer. The "multi-vendor" positioning (supports Anthropic, Google agents) is notable — not model-locked. Named customer results are vendor-sourced only. No independent verification yet (6 weeks post-launch). Forward Deployed Engineers model = high-touch, consulting-like.

### Finding 4: Claude Agent SDK — March 2026 updates
**Source:** [npm](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) — [vendor/package registry], [PyPI](https://pypi.org/project/claude-agent-sdk/) — [vendor/package registry], [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) — [vendor documentation], [Claude Code changelog](https://code.claude.com/docs/en/changelog) — [vendor documentation]
**Date:** March 2026
**Agent level:** company
**Evidence level:** Level 0 (vendor releases)
**What:** Key SDK/platform updates:
- **Opus 4.6 + Sonnet 4.6:** New model releases with 1M context window, improved agentic performance.
- **Compaction API (beta):** Server-side context summarization for effectively infinite conversations. Significant for long-running business agents.
- **Effort parameter GA:** Controls reasoning depth (low/medium/high). Replaces budget_tokens.
- **Data residency controls:** Specify where inference runs (US-only available at 1.1x pricing). Important for EU/Nordic compliance.
- **MCP Elicitation (v2.1.76+):** MCP servers can request structured input during task execution — interactive forms, browser URLs.
- **SDK versions:** npm 0.2.81, Python 0.1.49 (Mar 17).
**Key claims:** All verifiable via release notes and package registries.
**Significance for platform-watch:** Data residency controls are significant for Nordic/EU customers. Compaction API addresses the long-running agent memory problem. MCP elicitation makes agent-tool interaction more interactive.

### Finding 5: A2A Protocol — v0.3, growing ecosystem, minimal production evidence
**Source:** [Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade) — [vendor press release], [LangChain A2A docs](https://docs.langchain.com/langsmith/server-a2a) — [vendor documentation], [Spring AI A2A](https://spring.io/blog/2026/01/29/spring-ai-agentic-patterns-a2a-integration/) — [vendor documentation]
**Date:** March 2026
**Agent level:** company
**Evidence level:** Level 0 (vendor) for ecosystem, Level 2 for framework integrations
**What:** A2A v0.3 released with gRPC support and security card signing. 150+ technology partners. Now integrated into LangSmith Agent Server (A2A endpoint at `/a2a/{assistant_id}`), Spring AI, and Bedrock AgentCore. Google offering deployment paths: Agent Engine, Cloud Run, GKE.
**Key claims:** 150+ partners (vendor claim). gRPC support (verifiable via spec). LangSmith integration (verifiable via docs).
**Significance:** A2A is becoming infrastructure — framework integrations (LangChain, Spring) make it accessible. But production deployments beyond Tyson Foods/Gordon Food Service (noted in previous cycles) remain scarce. The protocol is ready. Real-world adoption evidence is still Level 0-1.

### Finding 6: New entrant — Dify ($30M raise, 280 enterprises)
**Source:** Search results mention, [general press] references
**Date:** 2026
**Agent level:** team / company
**Evidence level:** Level 0 (vendor claims)
**What:** Dify is a no-code/low-code platform for building agent workflows visually. Raised $30M. Claims 280 enterprises across 1.4M deployments. Worth tracking as potential competitor to Copilot Studio and Workspace Studio for business users.
**Key claims:** $30M funding, 280 enterprises, 1.4M deployments (all vendor claims, no independent verification)

## What I Looked For But Did Not Find

1. **Independent Bedrock AgentCore production case studies** — Five features shipped but no named customer deployments or practitioner reviews of Policy GA, stateful MCP, or AG-UI.
2. **OpenAI Frontier independent reviews (6 weeks post-launch)** — All results are vendor-sourced or general press. No practitioner has published "we deployed Frontier and here's what happened."
3. **A2A real production deployments beyond Tyson Foods** — Protocol is maturing fast but production evidence remains thin.
4. **LangChain Deep Agents practitioner experience** — Just announced (Mar 16). Too early for practitioner reports.
5. **Agent platform failure postmortems** — No new public postmortems found. The 80-90% failure rate (RAND 2025) hasn't generated many public post-mortems — survivorship bias continues.

## Orientation

**Three trends worth tracking:**

1. **Bedrock AgentCore pulling ahead on managed runtime.** Five features in 17 days, including the first GA agent governance (Policy + Cedar). Now supports all three interaction protocols (MCP + A2A + AG-UI). If independent deployment evidence appears, this becomes the leading platform recommendation.

2. **OpenAI Frontier = new competitor for enterprise platform layer.** Multi-vendor positioning is notable. Named customers with vendor-sourced results. 6 weeks post-launch, zero independent verification. Watch for practitioner reports in April.

3. **LangChain consolidating as the framework layer.** 1B downloads, NVIDIA partnership, Deep Agents for long-running tasks. The framework-vs-platform distinction matters: LangGraph is the logic layer, Bedrock/Azure/Frontier are the hosting layers. They complement, not compete.

**For the CTO question:** The platform landscape is fragmenting further, not consolidating. A CTO now faces: Microsoft (Agent 365 + Foundry), Google (Gemini Enterprise + Workspace Studio), OpenAI (Frontier), AWS (Bedrock AgentCore), plus framework choices (LangGraph, Claude Agent SDK, Strands). The "competence first, platform second" thesis from our synthesis is more relevant than ever — no one can evaluate these options without agent literacy.
