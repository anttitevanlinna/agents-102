---
type: state
domain: platform
evidence_level: 2
platforms: [langgraph, crewai, mastra, microsoft-agent-framework, google-adk, ruflo]
nordic: false
updated: 2026-04-02
cycle: 2
answers:
  - "should we build our own agent stack instead of buying vertical SaaS?"
  - "which open-source agent framework is production-ready for business processes?"
  - "what's the real enterprise adoption of open-source agent frameworks?"
---

# Open-Source Agent Frameworks -- Platform State

Last updated: 2026-04-02 (cycle 2 -- practitioner battle reports added)
OODA cycles: 2

## Focus

Open-source frameworks for building custom AI agents. These are the "build" side of the build-vs-buy decision. Tracked because every CTO evaluating agent platforms will eventually ask: "Should we just build it ourselves?" These frameworks are the answer to that question -- for better or worse.

**The key question:** Can open-source agent frameworks deliver production business agents (not coding agents) for enterprise use cases like HR, finance, operations, and compliance?

**Answer (April 2026):** Maybe, if you have the engineering team. LangGraph and CrewAI have real enterprise traction. Microsoft Agent Framework is the enterprise play for Azure shops. Mastra is the TypeScript dark horse with surprisingly strong enterprise evidence. Google ADK is Google's answer. Ruflo is hype with zero independent enterprise evidence. But here's the thing -- almost all documented deployments are developer-built, developer-maintained systems. No business user is spinning up a LangGraph agent the way they might configure a Salesforce Agentforce topic. The "build" option requires permanent engineering investment.

## Key Verdict (as of 2026-04-02)

**The framework wars are real, but the winner depends on your stack, not the framework.** Six serious contenders, each optimized for a different developer ecosystem. LangGraph dominates Python/ML teams (97K stars, 300+ enterprise LangSmith customers). CrewAI is the fastest-growing multi-agent framework (45.9K stars, claims 60%+ Fortune 500 adoption). Mastra owns TypeScript (22.3K stars, named enterprise deployments at PayPal, Replit, Marsh McLennan). Microsoft Agent Framework is the enterprise convergence play (AutoGen + Semantic Kernel merged, Azure-native). Google ADK is the newest entrant with 1.0 across four languages. Ruflo has inflated star counts and zero independent enterprise evidence.

**For business process agents specifically:** evidence is thin across all frameworks. Most documented deployments are coding/developer workflow agents, customer-facing chatbots, or data pipeline orchestration. True multi-step autonomous business process agents (HR onboarding, financial reconciliation, compliance monitoring) built on these frameworks remain rare and poorly documented.

## Framework-by-Framework Assessment

---

### LangGraph (LangChain) -- The Incumbent

**Architecture:** Graph-based agent workflows in Python. Nodes = actions, edges = control flow. Supports cycles, conditional branching, and persistent state via checkpoints. Part of the LangChain ecosystem (LangSmith observability, LangServe deployment).

**Scale:**
- 97K+ GitHub stars (LangChain ecosystem)
- 52M+ weekly PyPI downloads (LangChain), 9M+ (LangGraph) ([The Hacker News](https://thehackernews.com/2026/03/langchain-langgraph-flaws-expose-files.html) -- [general press], Mar 2026)
- 300+ enterprise LangSmith customers, 15B+ traces processed ([LangChain blog](https://blog.langchain.com/nvidia-enterprise/) -- [vendor press release], Mar 2026)
- LangChain + LangGraph both hit v1.0 ([LangChain blog](https://blog.langchain.com/langchain-langgraph-1dot0/) -- [vendor press release])

**Enterprise evidence:**
- **NVIDIA partnership (Mar 2026):** Enterprise-grade agentic AI development platform integration. ([LangChain blog](https://blog.langchain.com/nvidia-enterprise/) -- [vendor press release]. Level 0 until independent confirmation.)
- **Named production users (vendor-claimed):** Uber, JP Morgan, BlackRock, Cisco, Vodafone. No independent metrics from any of these. ([LangChain website](https://www.langchain.com/langgraph) -- [vendor press release], Level 0)
- **State of Agent Engineering survey:** 57% of 1,300+ respondents have agents in production, large enterprises leading. ([LangChain](https://www.langchain.com/state-of-agent-engineering) -- [vendor press release]. Self-selected sample, treat as directional only.)
- **Vodafone:** Autonomous agents for data engineering and operations workflows, internal AI assistants monitoring performance metrics. ([LangChain website](https://www.langchain.com/langgraph) -- [vendor press release], Level 0)
- **Enterprise ABAC:** Attribute-Based Access Control layering tag-based allow/deny policies on top of RBAC. ([LangChain newsletter](https://blog.langchain.com/march-2026-langchain-newsletter/) -- [vendor press release])

**Security issues (critical):**
- **CVE-2026-34070** (CVSS 7.5): Path traversal in prompt-loading API. Arbitrary file access. Fixed in langchain-core 1.2.22+. ([The Hacker News](https://thehackernews.com/2026/03/langchain-langgraph-flaws-expose-files.html) -- [general press], Mar 2026)
- **CVE-2025-68664** (CVSS 9.3): Critical deserialization flaw leaking API keys and secrets. Fixed in 0.3.81/1.2.5. ([Cyata](https://cyata.ai/blog/langgrinch-langchain-core-cve-2025-68664/) -- [practitioner analysis], Dec 2025)
- **CVE-2025-67644** (CVSS 7.3): SQL injection in LangGraph SQLite checkpoint. Fixed in langgraph-checkpoint-sqlite 3.0.1. ([The Hacker News](https://thehackernews.com/2026/03/langchain-langgraph-flaws-expose-files.html) -- [general press], Mar 2026)
- Three serious CVEs in 6 months signals a framework moving faster than its security posture can sustain. Enterprise security teams will flag this.

**Limitations:**
- Graph-based mental model has a steep learning curve -- overkill for simple workflows
- Scaling and high parallelism not LangGraph's strength; checkpointing adds 10-20% infra overhead
- Tight coupling to LangChain ecosystem creates vendor lock-in despite being open-source
- Retries, fallbacks, observability, monitoring, CI/CD all require external systems
- Potential infinite loops with sub-agents ([Latenode community](https://community.latenode.com/t/current-limitations-of-langchain-and-langgraph-frameworks-in-2025/30994) -- [practitioner direct])

**Business process evidence:** Thin. Documented use cases are primarily developer tooling, data pipelines, and RAG systems. Financial analysis and insurance workflow examples exist as blog posts and tutorials, not production case studies. ([Vocal.media](https://vocal.media/01/how-to-automate-business-processes-with-lang-graph-in-2026); [Intuz](https://www.intuz.com/blog/top-5-ai-agent-frameworks-2025) -- [domain trade publication])

**Evidence level:** Level 2 (multiple named enterprise customers, but metrics are vendor-sourced only)

---

### CrewAI -- The Multi-Agent Specialist

**Architecture:** Role-based multi-agent orchestration in Python. Agents have roles, goals, and backstories. Tasks are assigned to agents. Crews coordinate multiple agents. CrewAI Flows wraps crews for production with error handling, retry logic, and state persistence.

**Scale:**
- 45.9K+ GitHub stars ([GitHub](https://github.com/crewAIInc/crewAI))
- 100,000+ certified developers ([CrewAI](https://crewai.com/) -- [vendor press release])
- Claims 60%+ Fortune 500 adoption ([CrewAI](https://crewai.com/) -- [vendor press release]. Extraordinary claim, no independent verification.)
- CrewAI OSS 1.0 GA released ([CrewAI blog](https://blog.crewai.com/crewai-oss-1-0-we-are-going-ga/) -- [vendor press release])

**Enterprise evidence:**
- **Named customers (vendor-claimed):** IBM, Microsoft, Procter & Gamble, Walmart, SAP, Adobe, PayPal, Salesforce, Deloitte. ([DecisionCrafters](https://www.decisioncrafters.com/crewai-multi-agent-orchestration/) -- [domain trade publication]; [The Agent Times](https://theagenttimes.com/articles/44335-stars-and-counting-crewais-github-surge-maps-the-rise-of-the-multi-agent-e) -- [domain trade publication], Mar 2026)
- **No independent deployment metrics from any named customer.** Not one case study with measurable outcomes from an independent source.
- **CrewAI AMP (enterprise platform):** Control Plane with tracing, observability, RBAC, 24/7 support. Cloud and on-premise deployment. Triggers for Gmail, Slack, Salesforce. ([CrewAI](https://crewai.com/) -- [vendor press release])

**Pricing:**
- Free tier (limited)
- Basic: $99/month
- Enterprise: $6,000/year (billed annually)
- Significant gap between Basic and Enterprise tiers ([Lindy](https://www.lindy.ai/blog/crew-ai) -- [practitioner analysis])

**Limitations:**
- ~56% more token overhead per request vs. LangGraph ([MarkAICode](https://markaicode.com/vs/langgraph-vs-crewai-multi-agent-production/) -- [practitioner analysis])
- Limited mid-run introspection and debugging tools
- Python-only -- limits adoption in TypeScript/Java shops
- Role-based rigidity can constrain unconventional agent behaviors
- Open-source nature means agent code is visible -- IP concern for some enterprises
- Large virtual environment sizes complicate deployment ([Latenode](https://latenode.com/blog/ai-frameworks-technical-infrastructure/crewai-framework/crewai-framework-2025-complete-review-of-the-open-source-multi-agent-ai-platform) -- [domain trade publication])

**Business process evidence:** Marketing materials reference supply chain, HR, and media use cases. No independent production case studies for business process automation found. Most documented use cases are content generation, research automation, and developer workflows.

**Evidence level:** Level 1-2 (many named enterprise customers, but "60% Fortune 500" claim is unverified and metrics are absent)

---

### Mastra -- The TypeScript Dark Horse

**Architecture:** TypeScript-first agent framework from the Gatsby team. AI primitives: workflows, agents, RAG, evals. MCP-native. Modern web dev stack -- built for the 70% of developers who work in TypeScript/JavaScript.

**Scale:**
- 22.3K+ GitHub stars ([GitHub](https://github.com/mastra-ai/mastra))
- 300K+ weekly npm downloads ([DecisionCrafters](https://www.decisioncrafters.com/mastra-build-production-ready-ai-agents-in-typescript-with-22-3k-github-stars/) -- [domain trade publication])
- Third-fastest-growing JavaScript framework ever measured
- $13M seed round: Y Combinator, Paul Graham, Gradient Ventures, Guillermo Rauch (Vercel), Amjad Masad (Replit), Balaji Srinivasan, Arash Ferdowsi (Dropbox). ([Mastra blog](https://mastra.ai/blog/seed-round) -- [vendor press release]; [TechNews180](https://technews180.com/funding-news/mastra-raises-13m-seed-for-typescript-ai-framework/) -- [domain trade publication])

**Enterprise evidence (strongest of any OSS framework for named deployments):**
- **Marsh McLennan:** Agentic search tool deployed to 75,000 employees. ([TechNews180](https://technews180.com/funding-news/mastra-raises-13m-seed-for-typescript-ai-framework/) -- [domain trade publication]. Single source, needs independent confirmation.)
- **Replit:** Agent 3 uses Mastra to build agents at scale. ([TechNews180](https://technews180.com/funding-news/mastra-raises-13m-seed-for-typescript-ai-framework/) -- [domain trade publication])
- **SoftBank:** Demonstrated Mastra-based product on stage. ([TechNews180](https://technews180.com/funding-news/mastra-raises-13m-seed-for-typescript-ai-framework/) -- [domain trade publication])
- **PayPal, Adobe, Docker** named as production users. ([TechNews180](https://technews180.com/funding-news/mastra-raises-13m-seed-for-typescript-ai-framework/) -- [domain trade publication])
- **First framework with enterprise RBAC:** Built-in role definitions (owner, admin, editor, viewer), @mastra/core/auth export, pluggable auth interfaces. Enterprise Edition with license key. @mastra/auth-okta package for SSO + RBAC via Okta. ([Mastra changelog](https://mastra.ai/blog/changelog-2026-03-04) -- [vendor press release])

**Limitations:**
- TypeScript-only -- excludes Python/ML teams and .NET shops
- Youngest framework -- 22K stars is impressive growth but less battle-tested than LangGraph (97K) or CrewAI (46K)
- Enterprise Edition requires license key (MASTRA_EE_LICENSE) -- open-core model, not fully open
- Seed-stage company ($13M) -- long-term viability depends on follow-on funding or revenue
- Limited documentation compared to LangGraph's extensive ecosystem

**Business process evidence:** Marsh McLennan deployment (75K employees, agentic search) is the closest to a real business process agent deployment among all frameworks tracked. But it's a single source and we don't know the scope or autonomy level.

**Evidence level:** Level 2 (named enterprises with some deployment detail, but mostly single-source)

---

### Microsoft Agent Framework -- The Enterprise Convergence Play

**Architecture:** Merged AutoGen (research) + Semantic Kernel (enterprise) into a unified SDK. Supports .NET (C#), Python, and Java. Both agent orchestration (LLM-driven) and workflow orchestration (business-logic-driven). Deploys to Azure AI Foundry with observability, durability, and compliance.

**Scale:**
- Release Candidate 1.0 shipped Feb 19, 2026. GA targeted end of Q1 2026. ([Microsoft DevBlog](https://devblogs.microsoft.com/foundry/microsoft-agent-framework-reaches-release-candidate/) -- [vendor press release])
- AutoGen and Semantic Kernel moved to maintenance mode (bug fixes and security patches only). ([VentureBeat](https://venturebeat.com/ai/microsoft-retires-autogen-and-debuts-agent-framework-to-unify-and-govern) -- [general press], 2026)
- Azure AI Foundry Agent Service already GA since May 2025. ([Microsoft DevBlog](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/) -- [vendor press release])

**Enterprise evidence:**
- **KPMG Clara AI:** Audit automation -- agents detect financial data anomalies, integrate with human-in-the-loop approval workflows. Built on Semantic Kernel foundations. ([Azure blog](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/) -- [vendor press release], Level 0)
- **Vodafone:** Network Operations Agent Framework for autonomous telecom network operations. NOA Framework accelerator (reference architectures, templates) expected April 2026. ([RCR Wireless](https://www.rcrwireless.com/20260316/ai/microsoft-agents-vodafone) -- [domain trade publication]; [Microsoft TechCommunity](https://techcommunity.microsoft.com/blog/telecommunications-industry-blog/evolving-the-network-operations-agent-framework-driving-the-next-wave-of-autonom/4496607) -- [vendor press release])
- **Enterprise readiness features:** SOC 2, HIPAA compliance, production SLAs, formal support contracts, session-based state management, type safety, filters, telemetry. ([InfoQ](https://www.infoq.com/news/2026/02/ms-agent-framework-rc/) -- [domain trade publication], Feb 2026)
- **Important caveat:** "Major enterprises already run production workloads" is a vendor claim. KPMG and Vodafone details come from vendor narratives, not independent audits. No independent metrics from any deployment.

**Limitations:**
- Brand new (RC in Feb 2026) -- migration from AutoGen/Semantic Kernel is a real cost
- Azure lock-in despite being open-source -- "experiment locally, deploy to Azure Foundry" is the pitch
- Migration friction: existing AutoGen and Semantic Kernel projects need rewriting
- Multi-language support (.NET/Python/Java) is a strength for Microsoft shops but fragments the community
- No business user surface -- this is 100% a developer tool

**Business process evidence:** KPMG audit automation is a genuine business process use case. Vodafone network operations is infrastructure, not business process. No HR, finance, or compliance deployments documented.

**Evidence level:** Level 1-2 (named enterprises, vendor-sourced details only, framework is pre-GA)

---

### Google ADK (Agent Development Kit) -- The Multi-Language Newcomer

**Architecture:** Open-source, code-first agent framework. Launched at Cloud NEXT 2025. Explicit orchestration layer -- agents defined as code, not configuration. Now at 1.0 across four languages: Python, TypeScript, Java, Go. Deploys to Vertex AI Agent Engine.

**Scale:**
- 17.5K+ GitHub stars (adk-python) ([GitHub](https://github.com/google/adk-python))
- v1.0.0 released across Python, TypeScript, Java, Go ([Google Developers Blog](https://developers.googleblog.com/announcing-adk-for-java-100-building-the-future-of-ai-agents-in-java/) -- [vendor press release])
- 100+ pre-built connectors (AlloyDB, BigQuery, NetApp, Application Integration) ([Google Cloud docs](https://docs.cloud.google.com/agent-builder/agent-development-kit/overview) -- [vendor press release])
- Bi-weekly releases, currently v1.19.0

**Enterprise evidence:**
- **Zero independent enterprise deployment evidence.** All documentation is vendor-produced tutorials and examples.
- **Google Cloud ecosystem play:** Positioned as default for Google Cloud customers, with native Vertex AI deployment path. ([Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/build-multi-agentic-systems-using-google-adk) -- [vendor press release])
- Google claims ADK powers its own products but provides no specifics. ([The AI Corner](https://www.the-ai-corner.com/p/google-open-sourced-the-ai-agent) -- [domain trade publication])

**Limitations:**
- Despite being open-source, gravitates toward Google Cloud -- Vertex AI deployment is the paved path ([n8n, cited in search results] -- [practitioner analysis])
- Tool exclusivity limitation: specific tools within an agent exclude use of other tools in that agent (workaround exists for GoogleSearchTool and VertexAiSearchTool only) ([Google ADK docs](https://google.github.io/adk-docs/tools/limitations/) -- [vendor press release])
- Built-in tools cannot be used in sub-agents (except GoogleSearchTool/VertexAiSearchTool)
- Event-driven approach echoes "early TensorFlow pain points" (Lak Lakshmanan, former Googler) -- complexity concern ([Medium](https://medium.com/@reliabledataengineering/google-adk-vs-langchain-the-2026-ai-agent-framework-showdown-cecc25efc9d4) -- [practitioner analysis])
- Context management: easy to fall into "context dumping" trap that inflates costs ([Google Developers Blog](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/) -- [vendor press release])
- Newest major entrant -- smallest community and ecosystem of the six

**Business process evidence:** None found. All examples are developer-oriented (code generation, data analysis, search).

**Evidence level:** Level 0-1 (vendor documentation only, no independent evidence)

---

### Ruflo -- The Star-Inflated Outlier

**Architecture:** Multi-agent swarm orchestration for Claude. "Hive Mind" architecture with queen-led hierarchical coordination. 100+ pre-built agents across 8 categories. Claims Byzantine fault tolerance, HNSW vector search, self-learning neural capabilities.

**Scale:**
- GitHub stars: **29.3K** per GitHub page, but sources report wildly inconsistent numbers (16K, 21.6K, 28.6K at different times). Star count growth pattern is suspicious -- went from ~1,173 stars (noted in one Q1 2026 source) to 29.3K in weeks. ([GitHub](https://github.com/ruvnet/ruflo); [byteiota](https://byteiota.com/agent-orchestration-frameworks-2026-openai-ruflo-swarms/) -- [domain trade publication])
- 3.2K forks, 399 open issues, 6,007 commits
- Single-maintainer project (ruvnet)

**Enterprise evidence:**
- **Zero named enterprise customers.** Not one.
- **Zero independent deployment evidence.** Not one blog post, case study, or practitioner report from anyone using Ruflo in production.
- **Zero business process deployments.** All examples are coding/developer workflow scenarios.
- README contains extensive marketing language ("352x faster," "150x-12,500x faster") with no independent verification.
- The articles that do exist (Medium, SitePoint, MLHive) read as promotional content, not independent analysis.

**Limitations:**
- Claude-only -- locked to Anthropic's models
- Single maintainer -- bus factor of 1
- Star count inconsistencies suggest artificial inflation (star-buying or bot activity)
- "Enterprise-grade" claims with zero enterprise evidence
- No pricing, no support contracts, no compliance certifications
- v3.5 versioning for a project with no documented production users

**Business process evidence:** None. Zero. The framework is positioned entirely for coding agent swarms.

**Evidence level:** Level 0 (marketing claims only, zero independent evidence of any kind)

---

## Cross-Framework Comparison

| Dimension | LangGraph | CrewAI | Mastra | MS Agent Framework | Google ADK | Ruflo |
|-----------|-----------|--------|--------|-------------------|------------|-------|
| **Language** | Python | Python | TypeScript | .NET/Python/Java | Python/TS/Java/Go | Python (Claude) |
| **GitHub stars** | 97K (ecosystem) | 45.9K | 22.3K | New (merged) | 17.5K | 29.3K (suspicious) |
| **v1.0 GA** | Yes | Yes | Yes | RC (Q1 2026 GA) | Yes (4 languages) | No formal versioning |
| **Enterprise RBAC** | ABAC (new) | AMP platform | First with built-in RBAC + Okta | Azure Entra ID | Vertex AI IAM | None |
| **Named enterprises** | Uber, JPM, Cisco (vendor) | IBM, Walmart, SAP (vendor) | Marsh McLennan 75K, PayPal, Replit | KPMG, Vodafone (vendor) | None | None |
| **Independent metrics** | None | None | Partial (Marsh McLennan) | None | None | None |
| **Business process agents** | Tutorials only | Marketing only | 1 deployment (Marsh McLennan) | KPMG audit (vendor) | None | None |
| **Security track record** | 3 CVEs in 6 months | No major CVEs found | No major CVEs found | Microsoft security practices | No major CVEs found | Unknown |
| **Cloud lock-in** | LangSmith (optional) | CrewAI AMP (optional) | None (deploy anywhere) | Azure Foundry | Vertex AI | Claude-only |
| **Pricing (enterprise)** | LangSmith (custom) | $6K/year+ | License key (EE) | Azure consumption | Vertex AI pricing | Free (no support) |
| **Evidence level** | Level 2 | Level 1-2 | Level 2 | Level 1-2 | Level 0-1 | Level 0 |

## The CTO Question: "Should We Build Instead of Buy?"

**The real answer: probably not, unless you're building something none of the vertical SaaS platforms do.**

Here's why:

1. **The engineering tax is permanent.** Every framework here requires developers to build, deploy, monitor, and maintain agents. Vertical SaaS platforms (Salesforce, Zendesk, ServiceNow) bundle the agent into the workflow you already have. Building on LangGraph means you're also building the deployment pipeline, the observability stack, the retry logic, the security layer, and the upgrade path. Forever.

2. **Business process evidence is almost nonexistent.** Across all six frameworks, we found exactly one named business process deployment with any detail (Marsh McLennan on Mastra, 75K employees, agentic search). Everything else is either vendor-claimed logos with no metrics, or coding/developer workflow use cases. If your use case is "HR onboarding agent" or "compliance monitoring agent," nobody has proven these frameworks can deliver that in production.

3. **The framework wars create their own risk.** AutoGen just got retired. Semantic Kernel just got merged. What happens when CrewAI's VC money runs out? What happens when Google loses interest in ADK (as they have with countless developer tools)? The framework you bet on today might not exist in its current form in 18 months.

4. **Where building DOES make sense:**
   - Your process is genuinely unique (not served by any vertical SaaS)
   - You need multi-system orchestration across 5+ enterprise systems that no single vendor spans
   - You have a strong internal engineering team that can own the full stack
   - You're already deep in one cloud ecosystem (Azure -> MS Agent Framework, Google Cloud -> ADK, AWS -> LangGraph/CrewAI on Bedrock)
   - You need agent behavior that vertical SaaS platforms' guardrails prevent

5. **The real play: coding agents building business agents.** The most promising path isn't choosing a framework -- it's using Claude Code or Codex to build the specific agent you need, on whatever framework fits your stack. The coding agent handles the framework complexity. You provide the business judgment. This is the meta-platform argument from our research.

## Practitioner Battle Reports (April 2026)

**This section captures what we couldn't find in vendor documentation: real people describing what it's actually like to build and deploy agents on these frameworks.** Evidence levels noted per finding. Most of this is Level 1-2 (single experiments and practitioner opinions). No convergence-level evidence (Level 3) found for any framework.

### The Universal Finding: It's Not About the Framework

The single strongest signal across all practitioner reports is that **framework choice is almost never the variable that determines success or failure.** What matters is:

1. **Domain knowledge** -- knowing the problem well enough to catch the agent when it makes a bad call. A Reddit user running agents in production for real estate said they tried 4-5 frameworks before landing on one, noting "none of them were the variable that mattered -- what actually mattered was knowing the problem well enough to tell when the agent was wrong." ([DEV Community](https://dev.to/synsun/autogen-vs-langgraph-vs-crewai-which-agent-framework-actually-holds-up-in-2026-3fl8) -- [practitioner direct])

2. **Infrastructure around the agent** -- state persistence, retries, deployment, monitoring. Same practitioner: "Learn the infrastructure side." The debugging workflow determines production survival more than any framework feature. ([DEV Community](https://dev.to/synsun/autogen-vs-langgraph-vs-crewai-which-agent-framework-actually-holds-up-in-2026-3fl8) -- [practitioner direct])

3. **Context engineering, not prompt engineering** -- Manus team bet on context engineering and shipped improvements in hours instead of weeks. Google's ADK team: "Context engineering means treating context as a first-class system with its own architecture, lifecycle, and constraints." Stanford ACE framework (ICLR 2026): contexts as evolving playbooks that accumulate strategies. ([Manus blog](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) -- [practitioner direct]; [Google Developers Blog](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/) -- [vendor press release]; [Softmax Data](https://softmaxdata.com/blog/the-biggest-lesson-from-ace-iclr-2026-the-power-of-agentic-engineering/) -- [academic/research])

**Evidence level:** Level 3 (convergence). Multiple independent practitioners, the Manus team, Google ADK team, and Stanford researchers all converged on the same finding: the framework is secondary to context management and domain knowledge.

---

### LangGraph Practitioner Experiences

**Moon Robert** (small team, 3 engineers + 1 ML specialist) rebuilt a competitive research pipeline across LangGraph, CrewAI, and AutoGen. Four sequential agents: researcher -> summarizer -> critic -> writer, with critic loop-back. **LangGraph won for their use case.** Key findings:
- State machine model prevented runaway loops
- LangSmith tracing: "from print statements everywhere to click on the node that failed"
- Debugged agent failures *weekly* -- state visibility was critical
- First run cost $4 in API tokens due to 11 revision cycles before adding revision count caps
- Learning curve: "you can set up a CrewAI project in an afternoon; a robust LangGraph implementation requires deep understanding of state machines and async programming"

([DEV Community](https://dev.to/synsun/autogen-vs-langgraph-vs-crewai-which-agent-framework-actually-holds-up-in-2026-3fl8) -- [practitioner direct])

**Evidence level:** Level 2 (single experiment, well-documented)

---

### CrewAI Practitioner Experiences

**Moon Robert** (same team as above) found CrewAI's role-based model immediately intuitive to a non-ML teammate reviewing code. But: "fighting the framework rather than using it" when implementing feedback loops. Team simplified the pipeline to avoid loops, making it "less capable than my LangGraph version." CrewAI's task flow is primarily designed for sequential or hierarchical execution, not arbitrary graph-shaped workflows. ([DEV Community](https://dev.to/synsun/autogen-vs-langgraph-vs-crewai-which-agent-framework-actually-holds-up-in-2026-3fl8) -- [practitioner direct])

**Migration pattern confirmed by multiple sources:** CrewAI -> LangGraph is the most common migration path. Teams prototype in CrewAI (fast, intuitive), validate the concept, then hit CrewAI's control flow ceiling. ([Particula](https://particula.tech/blog/langgraph-vs-crewai-vs-openai-agents-sdk-2026) -- [domain trade publication]; [LevelUp GitConnected](https://levelup.gitconnected.com/langgraph-vs-crewai-vs-autogen-which-agent-framework-should-you-actually-use-in-2026-b8b2c84f1229) -- [practitioner analysis])

**The ceiling:** Role-based paradigm couldn't express conditional branching and state rollback needed for compliance workflows. 56% more token overhead per request vs. LangGraph. Agents produce inconsistent output schemas without explicit Pydantic output models. ([MarkAICode](https://markaicode.com/vs/langgraph-vs-crewai-multi-agent-production/) -- [practitioner analysis])

**Evidence level:** Level 2 (multiple practitioners report similar ceiling, but all at individual level)

---

### AutoGen Practitioner Experiences

**Moon Robert's finding:** Speaker selection with `speaker_selection_method="auto"` was "unpredictable -- the manager would sometimes skip the critic entirely, or loop back to the researcher three times in a row." Switching to `round_robin` "fixed the chaos but made the flow rigid." Team had to write custom orchestration logic anyway, defeating the framework's purpose. ([DEV Community](https://dev.to/synsun/autogen-vs-langgraph-vs-crewai-which-agent-framework-actually-holds-up-in-2026-3fl8) -- [practitioner direct])

**Note:** AutoGen is now in maintenance mode, merged into Microsoft Agent Framework. New projects should not start on AutoGen.

**Evidence level:** Level 2 (single experiment)

---

### Mastra Practitioner Experiences

**Kacper Wlodarczyk** (AI Engineer, Vstorm consultancy) built `pydantic-deep`, a batteries-included agent framework on PydanticAI, but also evaluated Mastra. Over two years and six projects at Vstorm, observed that production agents require "planning before acting, operating on real files, and delegating subtasks." Rather than copy-pasting across projects, extracted common components into reusable libraries. ([Medium](https://medium.com/@kacperwlodarczyk/we-built-a-batteries-included-ai-agent-framework-on-pydanticai-heres-the-architecture-53f228d673b6) -- [practitioner direct])

**Developer experience:** Reviews highlight Mastra provides "a notably more enjoyable and productive experience than alternatives like LangChain." JavaScript-native design with clean TypeScript support. Thoughtful separation between deterministic workflows and probabilistic agents. ([Hillock Studio](https://hillock.studio/blog/mastra) -- [practitioner direct]; [Medium](https://justinrich.medium.com/mastra-agent-system-review-a-fresh-take-on-ai-development-04ca3e8e3a1b) -- [practitioner direct])

**Production improvements (2026):** Token-threshold-based routing (auto-selects cheaper model for small inputs, stronger model for larger contexts). Workflow `stepExecutionPath` for debugging. Composite storage for production deployments. ([Mastra changelog](https://mastra.ai/blog/changelog-2026-03-23) -- [vendor press release])

**Evidence level:** Level 2 (small number of practitioners, positive signal)

---

### n8n Practitioner Experiences (Visual Builder)

**Nova** (agent builder for clients, 8-month review) built 20+ AI agents for clients. Flagship: textile company in Karachi -- WhatsApp message capture, intent analysis via OpenAI, inventory lookup in Google Sheets, multilingual response generation. Results: response time from 2 hours to 30 seconds, 85% of queries handled automatically. Also built a 47-node job application processor screening candidates through AI.

**What worked:** Unlimited workflow complexity, code nodes fill gaps, version history, cost-effective ($20/month handling multiple projects).

**What didn't work:**
- Cryptic error messages wasted hours
- No undo button -- deleted nodes required backup restoration
- Community node documentation often nonexistent
- Steep learning curve: 2-3 weeks for basic competency, **2 months for mastery**
- Requires basic JavaScript knowledge -- non-technical users hit walls

**Verdict: 4/5 stars.** "If you're serious about building AI agents as a business, n8n's learning curve pays off." But "countless late nights debugging."

**Scale signal:** One user's busiest client processes 1,000+ interactions daily without issues.

([DEV Community](https://dev.to/nova_gg/n8n-review-2026-i-used-it-for-8-months-to-build-ai-agents-honest-verdict-2aib) -- [practitioner direct])

**Evidence level:** Level 2 (single practitioner, detailed and candid)

**Important note:** n8n, Dify, and Flowise represent a different adoption path -- visual builders for business-adjacent users, not Python developers. This may be where real business process agent adoption is hiding, below the radar of the framework comparison articles.

---

### Dify and Flowise

**Dify:** $30M Series Pre-A at $180M valuation (March 2026). Claims organizations use it for document review pipelines, internal copilots, customer support automation, invoice auditing, correspondence drafting. Zero independent practitioner reports found -- everything is vendor-sourced. ([BusinessWire](https://www.businesswire.com/news/home/20260309511426/en/Dify-Raises-$30-million-Series-Pre-A-to-Power-Enterprise-Grade-Agentic-Workflows) -- [vendor press release])

**Flowise:** Acquired by Workday (August 2025). "Simple enough to prototype in minutes, yet powerful enough for production" but "difficult debugging and scaling limitations make it a poor choice for advanced production-grade solutions." Popular with enterprise IT teams including Fortune 500 companies. ([Voiceflow](https://www.voiceflow.com/blog/flowise-alternative) -- [practitioner analysis]; [AI Agents List](https://aiagentslist.com/agents/flowise) -- [domain trade publication])

**Evidence level:** Level 0-1 (vendor claims, no independent practitioner evidence)

---

### PydanticAI Practitioner Experiences

**Kacper Wlodarczyk** (Vstorm) built `pydantic-deep` on PydanticAI. Five standalone packages rather than a monolith. Backend abstraction proved foundational -- agents operate across ephemeral, filesystem, and sandboxed environments by changing one configuration line. "No custom runtime, no proprietary execution engine. Just a PydanticAI agent with the right toolsets pre-wired." ([Medium](https://medium.com/@kacperwlodarczyk/we-built-a-batteries-included-ai-agent-framework-on-pydanticai-heres-the-architecture-53f228d673b6) -- [practitioner direct])

**Market position:** "Dark horse" -- smaller than LangGraph/CrewAI but gaining traction with teams prioritizing type safety and code quality. Leverages Python's type system to catch agent logic errors at development time. Feels familiar to FastAPI users. Supports 25+ model providers. ([DEV Community](https://dev.to/linou518/the-2026-ai-agent-framework-decision-guide-langgraph-vs-crewai-vs-pydantic-ai-b2h) -- [practitioner analysis])

**Evidence level:** Level 2 (single practitioner, technically detailed)

---

### Production Failure Patterns (Cross-Framework)

**Michael Hannecke** (Sovereign AI Strategist, bluetuple.ai) analyzed production agent failures across multiple organizations:
- Tool calling fails 3-15% of the time in production
- Multi-agent systems consume 15x more tokens than simple chat
- A four-agent system costs ~EUR8,500/month vs EUR50 for simple applications
- Prompt injection success rates ~11% -- unacceptable for financial/database access
- Models effectively use only 8K-50K tokens despite larger advertised capacities
- His advice: deploy only when you have "a specific use case with measurable ROI" and can tolerate 3-15% error rates

([Medium](https://medium.com/@michael.hannecke/why-ai-agents-fail-in-production-what-ive-learned-the-hard-way-05f5df98cbe5) -- [practitioner direct])

**Lilian Makena** (Robo Rhythms) found agents "drift off-task, loop on tool calls, or return outputs that looked right but were quietly wrong." The fix: "Routing belongs in your code, not in your prompt. LLM-based routing creates non-deterministic behavior that is hard to reproduce and nearly impossible to debug in production." ([Robo Rhythms](https://www.roborhythms.com/why-ai-agents-fail-in-production/) -- [practitioner direct])

**GitHub Engineering Blog:** Multi-agent workflow failures "come down to missing structure" -- agents close issues other agents just opened, ship changes that fail downstream checks they didn't know existed. ([GitHub Blog](https://github.blog/ai-and-ml/generative-ai/multi-agent-workflows-often-fail-heres-how-to-engineer-ones-that-dont/) -- [practitioner analysis])

**Vectara awesome-agent-failures repo:** Community-curated collection of failure modes. Documents Google Antigravity agent wiping a user's entire drive, Replit agent deleting production database and attempting to hide its actions. ([GitHub](https://github.com/vectara/awesome-agent-failures) -- [practitioner direct])

**Composio report:** Five senior engineers spending 3 months on custom connectors for a shelved pilot = $500K+ in salary burn. Projects die from "Dumb RAG," "Brittle Connectors," and the "Polling Tax." ([Composio](https://composio.dev/blog/why-ai-agent-pilots-fail-2026-integration-roadmap) -- [domain trade publication])

**LangChain State of Agent Engineering (March 2026):** 57% of 1,300+ respondents have agents in production. Quality is the production killer (32% cite it as top barrier). Hallucinations and output consistency biggest challenges for 10K+ employee orgs. 89% have implemented observability; 62% have detailed step-level tracing. Production agents execute at most 10 steps before requiring human intervention in 68% of cases. ([LangChain](https://www.langchain.com/state-of-agent-engineering) -- [vendor press release]. Self-selected sample, treat as directional.)

**Evidence level:** Level 3 (convergence). Multiple independent practitioners converge on the same failure patterns: tool calling unreliability, non-deterministic routing, insufficient observability, and the massive gap between demo and production.

---

### The Convergence Pattern: What Production Practitioners Actually Do

Across all practitioner reports, a clear pattern emerges for teams that succeed:

1. **Start with a single agent, not multi-agent** -- Hannecke: "Multi-agent complexity requires genuine business justification." Most successful deployments use one agent with tools, not a swarm.

2. **Use deterministic code for everything except genuinely ambiguous decisions** -- "Input validation, output formatting, API call construction, error handling -- these don't benefit from LLM flexibility and actively suffer from LLM non-determinism." ([Zircon Tech](https://zircon.tech/blog/agentic-frameworks-in-2026-what-actually-works-in-production/) -- [practitioner analysis])

3. **Invest in observability before scaling** -- "Every production agent system that failed at scale had the same root cause: insufficient observability." 94% of organizations with agents in production have observability in place.

4. **Human-in-the-loop is a requirement, not a limitation** -- 47Billion's insurance company deployment: launched with minimal human oversight, discovered human checkpoints were essential for compliance, error recovery, and trust. ([47Billion](https://47billion.com/blog/ai-agents-in-production-frameworks-protocols-and-what-actually-works-in-2026/) -- [domain trade publication])

5. **Frameworks are converging on the same standards** -- MCP for tool interoperability, A2A for agent-to-agent communication, OpenTelemetry for observability. "The framework you pick today doesn't have to be the framework you're stuck with forever." ([Softmax Data](https://softmaxdata.com/blog/definitive-guide-to-agentic-frameworks-in-2026-langgraph-crewai-ag2-openai-and-more/) -- [domain trade publication])

**Evidence level:** Level 3-4 (convergence approaching meta-pattern). This is the most robust finding from the practitioner research.

---

## What We Did Not Find

- **No convergence-level evidence (Level 3) for any framework in business process automation.** Individual experiments exist. No pattern of 10-20 independent practitioners deploying the same type of business process agent on any single framework.
- **No independent deployment metrics from any Fortune 500 company** on any of these frameworks. Every named enterprise is vendor-sourced.
- **No Nordic enterprise deployments** on any open-source agent framework. Zero Nordic signal.
- **No head-to-head production comparisons.** Moon Robert's three-framework comparison is the closest we found, but it's one team on one use case. No "we ran both in production for 6 months" comparison exists.
- **No business user interfaces.** Every code-first framework (LangGraph, CrewAI, Mastra, PydanticAI) is developer-only. Visual builders (n8n, Dify, Flowise) get closer but still require JavaScript/API literacy.
- **No non-coding business process agent practitioner reports.** We found zero blog posts or threads from someone who built an HR onboarding agent, financial reconciliation agent, or compliance monitoring agent on any open-source framework and wrote about the experience. All practitioner reports are about coding/research/content generation agents.
- **No Dify practitioner reports.** Despite $30M funding and claimed enterprise adoption, zero independent practitioners wrote about their Dify experience. This is suspicious -- either adoption is lower than claimed, or the user base isn't the blogging type.
- **No long-term production reports.** All practitioner accounts describe building and initial deployment. Nobody has written "I ran this agent framework in production for 12 months, here's what happened." The longest report found is Nova's 8-month n8n review.

## What We Need To Learn

- [ ] Independent enterprise metrics -- anyone publishing real results (latency, accuracy, cost, ROI) from production business agents built on these frameworks?
- [ ] Marsh McLennan / Mastra deployment -- independent confirmation of scope, autonomy level, and outcomes
- [ ] KPMG Clara AI on Microsoft Agent Framework -- independent audit of what's actually running vs. announced
- [ ] CrewAI "60% Fortune 500" claim -- is there ANY independent verification?
- [ ] LangGraph security posture -- are enterprises actually patching fast enough? Are the CVEs slowing adoption?
- [ ] Nordic signal -- any Nordic company building business agents on open-source frameworks?
- [ ] Framework churn risk -- how are enterprises handling the AutoGen -> MS Agent Framework migration? What's the actual cost?
- [ ] Google ADK adoption -- is anyone outside Google Cloud actually using it? Or is it a Google Cloud lock-in play?
- [ ] Ruflo star count -- investigate whether stars are artificial (star-buying services, bot activity)
- [ ] Business process agent templates -- are any frameworks shipping pre-built agents for HR, finance, compliance, or operations?
- [ ] **n8n / Dify / Flowise deep dive** -- visual builders may be where real business process agent adoption is hiding. Need more practitioner reports from this segment.
- [ ] **Long-term production reports** -- nobody has written about running agents for 12+ months. Need to track practitioners who wrote initial deployment reports and check back in 6 months.
- [ ] **Workday + Flowise implications** -- what does Workday's acquisition mean for open-source agent builders? Is Flowise becoming an HR/Finance agent platform?
- [ ] **"No framework" practitioners** -- find developers who deliberately chose no framework and succeeded. The Firecrawl article mentions a pipeline using direct API calls to DeepSeek V3 and Claude. Where else is this pattern working?
- [ ] **Cost reality in production** -- Hannecke cites EUR8,500/month for a 4-agent system. Need more data points on actual production costs across frameworks.

## Sources

All sources cited inline with URL and source type classification per project research rules.

Key source types used:
- [vendor press release]: LangChain blog, CrewAI website, Mastra blog, Microsoft DevBlog, Google Cloud blog, GitHub READMEs
- [domain trade publication]: TechNews180, DecisionCrafters, The Agent Times, InfoQ, RCR Wireless, Latenode
- [general press]: VentureBeat, The Hacker News
- [practitioner direct]: Latenode community forums
- [practitioner analysis]: Cyata (CVE analysis), MarkAICode (benchmarks), Lindy (CrewAI review), Medium practitioners

**Note on evidence quality:** The open-source framework space is dominated by vendor marketing, tutorial content, and hype articles. Independent practitioner evidence is scarce. Most "comparison" articles are SEO content, not genuine analysis. The evidence quality for this category is significantly lower than for vertical SaaS platforms (which have paying customers with measurable outcomes).
