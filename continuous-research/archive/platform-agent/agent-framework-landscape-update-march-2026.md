# Agent Framework Landscape Update — March 2026

**Date:** 2026-03-21
**Scope:** Changes since the February 2026 agent-platforms-research.md
**Method:** Web search targeting release notes, practitioner feedback, GitHub repos, and protocol updates
**Evidence standard:** Per project research quality protocol. Source type labels on every URL.

---

## 1. LangGraph: v1.0 GA + Type-Safe Streaming

**What changed:** LangGraph reached 1.0 GA — the first stable major release. In March 2026, they shipped type-safe streaming and invoke (`version="v2"`) with unified `StreamPart` output, Pydantic/dataclass coercion on invoke results, and bug fixes for time-travel with interrupts and subgraphs.

**Key detail:** The only breaking change was deprecating `langgraph.prebuilt` (moved to `langchain.agents`). Full backward compatibility otherwise. Commitment to no breaking changes until 2.0.

**New additions:**
- Model profiles via `.profile` attribute (derived from models.dev)
- `SystemMessage` support for `create_agent`
- Model retry middleware with configurable exponential backoff
- New sandbox integration packages: `langchain-modal`, `langchain-daytona`, `langchain-runloop`

**Evidence level:** Level 2 (release notes are vendor-direct, but v1.0 milestone is verifiable fact). The "600-800 companies in production" claim from our Feb research remains the strongest adoption evidence.

**What this means for us:** LangGraph's v1.0 stability commitment makes it safer to recommend in training. The type-safe streaming is a quality-of-life improvement, not a paradigm shift. LangGraph continues to consolidate as the "serious production" default.

**Sources:**
- [LangGraph GitHub Releases](https://github.com/langchain-ai/langgraph/releases) [vendor direct — release notes]
- [LangChain Changelog — LangGraph 1.0 GA](https://changelog.langchain.com/announcements/langgraph-1-0-is-now-generally-available) [vendor direct]
- [LangChain Blog — v1.0 Milestones](https://blog.langchain.com/langchain-langgraph-1dot0/) [vendor direct]

---

## 2. CrewAI: Still Growing, Churn Pattern Confirmed

**What changed:** CrewAI released MCP tool resolution improvements, migrated CLI from requests to httpx, added native structured output mapping, and tool search support for Anthropic models (March 2026). Now at 45,900+ GitHub stars, v1.10.1.

**Did the churn concern materialize?** Yes, the pattern we flagged in February is confirmed by multiple independent sources:
- "CrewAI's multi-agent model introduces real costs... for applications where latency matters, the overhead can be prohibitive"
- "One team prototyped in CrewAI in two days, then hit the wall: the role-based paradigm couldn't express the conditional branching and state rollback their compliance team required. They rebuilt in LangGraph in a week."
- "CrewAI to LangGraph is the most common migration handled by agencies"
- Parsing/retry loop issues: "the LLM initially produced correct parameters, but once CrewAI entered a 'Failed to parse' loop, the framework pushed the LLM to reconsider, corrupting parameters the LLM had already gotten right"
- Pricing gaps between tiers noted as a pain point

**The emerging consensus:** "LangGraph for complexity, CrewAI for speed, Pydantic AI for stability." CrewAI remains excellent for rapid prototyping but the 6-12 month production wall is now a documented pattern, not just a concern.

**Evidence level:** Level 3 (convergence) — multiple independent practitioners reporting the same CrewAI-to-LangGraph migration pattern.

**Sources:**
- [CrewAI GitHub Releases](https://github.com/crewAIInc/crewAI/releases) [vendor direct — release notes]
- [DEV Community — 2026 Framework Decision Guide](https://dev.to/linou518/the-2026-ai-agent-framework-decision-guide-langgraph-vs-crewai-vs-pydantic-ai-b2h) [practitioner analysis]
- [OpenAgents Comparison](https://openagents.org/blog/posts/2026-02-23-open-source-ai-agent-frameworks-compared) [practitioner analysis]
- [Particula — Framework Comparison](https://particula.tech/blog/langgraph-vs-crewai-vs-openai-agents-sdk-2026) [practitioner analysis]

---

## 3. Microsoft Agent Framework: Release Candidate, GA Imminent

**What changed:** Microsoft Agent Framework reached Release Candidate on February 19, 2026. GA targeted for end of Q1 2026 (i.e., now). AutoGen and Semantic Kernel are now officially in maintenance mode — bug fixes and security patches only, no new features.

**Key facts:**
- API surface is frozen at RC — what you build today won't break at GA
- Native A2A and MCP protocol support built in
- Process Framework GA planned for Q2 2026 (deterministic business workflow orchestration)
- Enterprise validation: KPMG (audit automation), BMW (vehicle telemetry), Commerzbank (customer support), Fujitsu (IT ops) — **all vendor claims, not independently verified**
- Migration guides published for Semantic Kernel and AutoGen projects

**AutoGen status:** The standalone AutoGen GitHub repo now directs new users to Microsoft Agent Framework. Multiple practitioner sources note that "once-hyped frameworks like Microsoft's AutoGen have virtually disappeared from production environments." The consolidation into MAF is effectively complete.

**Evidence level:** Level 2 (single vendor milestone — RC is verifiable, enterprise claims are vendor-sourced)

**What this means for us:** Our Feb research called GA for Q1 2026 — that's on track. The interesting signal is how quickly AutoGen disappeared from practitioner discourse once maintenance mode was announced. Framework consolidation is real.

**Sources:**
- [Microsoft Foundry Blog — RC Announcement](https://devblogs.microsoft.com/foundry/microsoft-agent-framework-reaches-release-candidate/) [vendor direct]
- [Microsoft Blog — Migration Guide](https://devblogs.microsoft.com/agent-framework/migrate-your-semantic-kernel-and-autogen-projects-to-microsoft-agent-framework-release-candidate/) [vendor direct]
- [Microsoft Agent Framework GitHub](https://github.com/microsoft/agent-framework) [vendor direct]

---

## 4. Strands Agents: 1.0 Shipped, Strands Labs Launched

**What changed:** Strands Agents 1.0 shipped with multi-agent primitives and A2A protocol support. In March 2026, AWS launched Strands Labs — a separate GitHub organization for experimental agent projects.

**Adoption signals:**
- 2,000+ GitHub stars, 150K+ PyPI downloads (modest but growing)
- Five additional model providers contributed by partners (Anthropic, Meta, OpenAI, Cohere, Mistral, Stability, Writer, Baseten)
- Named adopters: Smartsheet, Landchecker, Jit — **all from the vendor blog, not independently verified**
- One practitioner: "seriously in <10 lines I'm up and running"
- AWS Q CLI team "built and shipped with Strands in just 3 weeks"

**Strands Labs projects:**
- AI Functions (runtime code generation from natural-language specs)
- Strands Robots (connecting LLMs to physical hardware via VLA models)
- Robots Sim (simulation environment)

**Evidence level:** Level 2 (single experiments and vendor claims). No convergence-level independent practitioner evidence yet.

**What this means for us:** Strands is AWS's long-term bet. The v1.0 + Labs launch shows commitment. But independent adoption evidence is thin — most testimonials come from the AWS blog. Watch for independent practitioner reports over the next 3-6 months.

**Sources:**
- [AWS Blog — Strands 1.0](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-1-0-production-ready-multi-agent-orchestration-made-simple/) [vendor direct]
- [InfoQ — Strands Labs](https://www.infoq.com/news/2026/03/aws-strands-agents/) [domain trade publication]
- [The New Stack — Strands Labs](https://thenewstack.io/aws-strands-labs-launch/) [domain trade publication]
- [DEV Community — First Impressions](https://dev.to/aws/first-impressions-with-strands-agents-sdk-4hha) [practitioner direct — AWS developer advocate]

---

## 5. New/Rising Entrants

### Pydantic AI — The Type-Safe Contender

**What changed:** Pydantic AI has established itself as the third major framework alongside LangGraph and CrewAI. At v1.68.0 (March 2026) with 15.5K+ GitHub stars. Key additions: durable execution, MCP/A2A/UI integration, graph-based workflows, human-in-the-loop.

**Why it matters:** The "Pydantic way" philosophy resonates with production Python developers who want type safety and IDE support. The ecosystem is growing — third-party projects like `pydantic-ai-skills` and `pydantic-deep` show community investment.

**Evidence level:** Level 2 (growing practitioner adoption, not yet convergence-level)

**Sources:**
- [Pydantic AI Docs](https://ai.pydantic.dev/) [vendor direct]
- [PyPI — pydantic-ai](https://pypi.org/project/pydantic-ai/) [vendor direct — download stats]
- [Towards AI — pydantic-ai-skills](https://pub.towardsai.net/introducing-pydantic-ai-skills-composable-agent-skills-for-the-pydantic-ai-ecosystem-dc98dd2bff53) [practitioner direct]

### Google ADK — 2.0 Alpha with Graph Workflows

**What changed:** Google released ADK 2.0 Alpha with graph-based workflows and ADK for TypeScript (now supports Python, Go, Java, TypeScript). Expanded integrations ecosystem in Feb 2026 with Daytona, GitHub, GitLab, Postman, Asana, Atlassian, Linear.

**Evidence level:** Level 2 (vendor milestone, verifiable). Independent adoption data scarce.

**Sources:**
- [Google ADK Docs](https://google.github.io/adk-docs/) [vendor direct]
- [Google Developers Blog — ADK for TypeScript](https://developers.googleblog.com/introducing-agent-development-kit-for-typescript-build-ai-agents-with-the-power-of-a-code-first-approach/) [vendor direct]
- [Google Developers Blog — ADK Integrations](https://developers.googleblog.com/en/supercharge-your-ai-agents-adk-integrations-ecosystem/) [vendor direct]

### OpenAI Agents SDK — Now Provider-Agnostic

**What changed:** The OpenAI Agents SDK (v0.12.5, March 2026) is now explicitly provider-agnostic, supporting 100+ LLMs through the Chat Completions API. This changes our Feb assessment that it was "OpenAI-locked." New features: WebSocket transport, GPT-5.4 computer use, MCP error handling improvements, sessions for conversation history.

**Important caveat:** While technically provider-agnostic, the SDK is optimized for OpenAI models. Claude support is possible but not native. 19K+ GitHub stars, 10.3M monthly downloads.

**Evidence level:** Level 2 (verifiable from docs/releases)

**Sources:**
- [OpenAI Agents SDK Docs](https://openai.github.io/openai-agents-python/) [vendor direct]
- [GitHub Releases](https://github.com/openai/openai-agents-python/releases) [vendor direct]
- [PyPI — openai-agents](https://pypi.org/project/openai-agents/) [vendor direct — download stats]

---

## 6. A2A Protocol: Gaining Institutional Weight

**What changed:** The A2A protocol continues to gain adoption. Key developments since Feb:
- Official multi-language SDKs now available: Python, Go, JavaScript, Java, .NET
- Spring AI A2A integration shipped (Jan 2026) — Spring Boot autoconfiguration for A2A servers
- Huawei announced A2A-T (Agent-to-Agent for Telecom) as open-source at MWC 2026
- Protocol now supported by Microsoft Agent Framework, Strands Agents, Pydantic AI, and Google ADK
- IBM published an A2A explainer — signal of enterprise interest

**The A2A + MCP complementarity is solidifying:** A2A = agent-to-agent communication. MCP = agent-to-tool communication. Both are under the Linux Foundation. The dual-protocol stack is becoming the assumed standard.

**Evidence level:** Level 3 (convergence) — multiple independent framework implementations, multi-language SDKs, enterprise interest (Spring, IBM, Huawei), standards body backing.

**Sources:**
- [A2A Protocol Official](https://a2a-protocol.org/latest/) [open standard]
- [Spring AI — A2A Integration](https://spring.io/blog/2026/01/29/spring-ai-agentic-patterns-a2a-integration/) [practitioner direct — Spring team]
- [TechNode — Huawei A2A-T](https://technode.com/2026/03/02/mwc-2026-huawei-to-open-source-a2a-t-telecom-agent-protocol-software/) [domain trade publication]
- [IBM — A2A Explainer](https://www.ibm.com/think/topics/agent2agent-protocol) [vendor direct — educational]

---

## 7. MCP: From Protocol to Platform Standard

**What changed:** MCP has crossed from "interesting protocol" to "assumed infrastructure":
- 10,000+ active public MCP servers
- 97M+ monthly SDK downloads (Python + TypeScript)
- Donated to Linux Foundation's Agentic AI Foundation (AAIF) in Dec 2025 — co-founded by Anthropic, OpenAI, Block, with AWS, Google, Microsoft, Cloudflare, Bloomberg supporting
- Natively supported by Anthropic, OpenAI, Google, Microsoft
- 2026 roadmap focuses on: transport scalability, agent communication, governance maturation, enterprise readiness
- Enterprise pain points now documented: audit trails, SSO-integrated auth, gateway behavior, configuration portability

**Evidence level:** Level 3 (convergence) — universal adoption across major AI providers, massive download numbers, Linux Foundation governance.

**Sources:**
- [MCP 2026 Roadmap](http://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/) [open standard — maintainer direct]
- [The New Stack — MCP Roadmap](https://thenewstack.io/model-context-protocol-roadmap-2026/) [domain trade publication]
- [MCP Official Roadmap](https://modelcontextprotocol.io/development/roadmap) [open standard]

---

## 8. Regulatory Signal: NIST AI Agent Standards Initiative

**What changed:** On February 17, 2026, NIST launched the AI Agent Standards Initiative through its Center for AI Standards and Innovation (CAISI). Three pillars: (1) industry-led agent standards, (2) open-source protocol development, (3) research on agent security and identity.

**Why this matters for our training:** What NIST publishes in 2026 will appear in compliance frameworks, vendor questionnaires, and litigation by 2027. Organizations attending our Agents 101 training need to know this is coming.

**Key deliverables coming:**
- Draft concept paper on agent identity and authorization (NCCOE project)
- Request for Information on AI Agent Security (due March 9, 2026)
- Sector-specific listening sessions starting April 2026

**Evidence level:** Level 2 (government announcement — verifiable fact, implications are forward-looking)

**Sources:**
- [NIST — AI Agent Standards Initiative](https://www.nist.gov/caisi/ai-agent-standards-initiative) [government/institutional]
- [NIST Announcement](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure) [government/institutional]
- [Federal News Network](https://federalnewsnetwork.com/cybersecurity/2026/02/nist-agentic-ai-initiative-looks-to-get-handle-on-security/) [domain trade publication]

---

## Synthesis: What Changed Since February 2026

### The big picture (Level 3+ findings only)

1. **Framework consolidation is real.** The "big three" pattern has solidified: LangGraph (complexity), CrewAI (speed), Pydantic AI (stability). AutoGen is dead as a standalone project. The number of frameworks is still growing but practitioner attention is concentrating.

2. **The CrewAI-to-LangGraph migration is now a documented pattern.** Multiple independent practitioners, agencies, and comparison articles confirm the 6-12 month wall. This validates what we flagged in February.

3. **A2A + MCP are becoming the assumed protocol stack.** Every major framework now supports both. The Linux Foundation governance gives enterprises the confidence signal they need. The question is no longer "will these protocols win?" but "how fast do enterprises adopt them?"

4. **NIST entering the agent standards space is the regulatory signal.** This will drive enterprise compliance requirements in 2027. Organizations need to be aware now.

### What to update in our training (Module 7: Agent Platforms)

- LangGraph v1.0 GA is a teachable milestone (stability commitment)
- The CrewAI prototyping-to-production gap is a perfect teaching case for Module 7
- A2A + MCP dual-protocol stack should be covered as emerging infrastructure
- NIST initiative is relevant context for security (Module 4) and platforms (Module 7)
- OpenAI Agents SDK is no longer OpenAI-locked — update our assessment
- Microsoft Agent Framework GA is imminent — update from "targeted Q1" to "shipping"

### What we did NOT find

- **No independent production benchmarks** comparing frameworks head-to-head in real deployments
- **No public postmortems** of framework migration failures (only success stories)
- **Strands Agents lacks independent adoption evidence** — almost all testimonials are vendor-sourced
- **No Nordic-specific framework adoption data** emerged from this research
- **No clear "winner" signal** — the market is consolidating around 3-4 options, not converging on one
