---
type: state
domain: platform
evidence_level: 2
platforms: [langgraph, crewai, mastra, microsoft-agent-framework, google-adk, ruflo]
nordic: false
updated: 2026-04-02
cycle: 1
answers:
  - "should we build our own agent stack instead of buying vertical SaaS?"
  - "which open-source agent framework is production-ready for business processes?"
  - "what's the real enterprise adoption of open-source agent frameworks?"
---

# Open-Source Agent Frameworks -- Platform State

Last updated: 2026-04-02 (cycle 1)
OODA cycles: 1

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

**The honest answer: probably not, unless you're building something none of the vertical SaaS platforms do.**

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

## What We Did Not Find

- **No convergence-level evidence (Level 3) for any framework in business process automation.** Individual experiments exist. No pattern of 10-20 independent practitioners deploying the same type of business process agent on any single framework.
- **No independent deployment metrics from any Fortune 500 company** on any of these frameworks. Every named enterprise is vendor-sourced.
- **No Nordic enterprise deployments** on any open-source agent framework. Zero Nordic signal.
- **No head-to-head production comparisons.** All comparisons are benchmark-level or opinion-level, not "we tried both in production and here's what happened."
- **No business user interfaces.** Every framework is developer-only. No business user will configure agents on these platforms without engineering support.

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

## Sources

All sources cited inline with URL and source type classification per project research rules.

Key source types used:
- [vendor press release]: LangChain blog, CrewAI website, Mastra blog, Microsoft DevBlog, Google Cloud blog, GitHub READMEs
- [domain trade publication]: TechNews180, DecisionCrafters, The Agent Times, InfoQ, RCR Wireless, Latenode
- [general press]: VentureBeat, The Hacker News
- [practitioner direct]: Latenode community forums
- [practitioner analysis]: Cyata (CVE analysis), MarkAICode (benchmarks), Lindy (CrewAI review), Medium practitioners

**Note on evidence quality:** The open-source framework space is dominated by vendor marketing, tutorial content, and hype articles. Independent practitioner evidence is scarce. Most "comparison" articles are SEO content, not genuine analysis. The evidence quality for this category is significantly lower than for vertical SaaS platforms (which have paying customers with measurable outcomes).
