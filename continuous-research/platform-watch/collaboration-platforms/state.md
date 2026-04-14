# Collaboration Platforms Adding Agents — Platform State

Last updated: 2026-04-14 (cycle 96)
OODA cycles: 2

## Focus

Agents arriving inside collaboration tools enterprises already use — Atlassian, Slack, Notion, Zoom. The "Trojan horse" scenario: if agents ship embedded in Jira, Slack, and Confluence, does the CTO's platform choice become irrelevant? Tracked because this is how most business users will first encounter agents — not through a platform selection process, but through a feature toggle in a tool they already have open.

## Key Verdict (as of 2026-04-14 — Cycle 96 update)

**The Trojan horse has already entered the gates.** Agents are running in production inside collaboration tools — the question is no longer "will this happen?" but "how do we govern what's already arrived?" Key cycle 96 updates:

- **Notion Custom Agents cross the agentic threshold** for workspace-bound work. Remote (global HR company) runs agents that autonomously resolve 25%+ of IT tickets with >95% routing accuracy. Ramp runs 300+ production agents including a Product Oracle answering roadmap questions daily. These are named companies + specific practices + measurable outcomes — the best evidence in this category.
- **Atlassian's governance-first design is the most mature answer** in this space. Agents in Jira (GA Feb 25, 2026) operate inside existing Jira permission structures with audit trails, OAuth 2.1, and human approval gates. Enterprise MCP usage is real: 93% from paid editions, 1/3 of operations are writes.
- **Agent sprawl is now empirically documented as a crisis.** 94% of organizations report sprawl concern. 3M+ agents running across enterprises, 1.5M unsecured. Collaboration tools are the primary vector. Every major cloud provider (AWS, Microsoft, Google, ServiceNow) is now building agent registries in direct response.
- **Agentforce in Slack remains vendor-only evidence.** No independent enterprise has published deployment results. $800M ARR is a real financial metric but doesn't tell us what Slack agents are actually doing.
- **Zoom AI Companion has a new documented gap:** summarization quality degrades substantially for non-English content — Nordic-relevant.

**Evidence level: Level 2-3 on adoption; Level 2 on agentic capability (Notion, Atlassian); Level 1 on Agentforce/Zoom.** Agent sprawl governance gap has reached Level 3 (multiple independent surveys converging on same finding).

## Key Verdict (as of 2026-04-02 — original) [STALE — see above for current verdict]

---

## Atlassian Rovo

### What It Is

Rovo is Atlassian's AI layer across Jira, Confluence, and Compass. Three components: Search (cross-product), Chat (conversational), and Agents (configurable AI teammates). Agents can be invoked in Chat, in automation rules, while editing in Confluence/Jira, or in the Studio app. Rovo Dev extends to coding agents in CLI.

### What's Shipping

- **Rovo Agents GA** — configurable agents accessible across Jira, Confluence, Chat, automation rules, and Studio app ([Atlassian Support: Agents](https://support.atlassian.com/rovo/docs/agents/))
- **Rovo MCP Server GA** — cloud-hosted gateway exposing Jira, Confluence, and Compass data to external AI clients (Claude, Cursor, VS Code, GitHub, AWS, ChatGPT, Docker, Figma, and 15+ others). Read AND write operations via natural language. Migrating from SSE to MCP endpoint before June 30, 2026. ([Atlassian blog: Rovo MCP GA](https://www.atlassian.com/blog/announcements/atlassian-rovo-mcp-ga)) [vendor press release]
- **Rovo Dev** — coding agents in CLI for software teams ([Atlassian: Rovo Dev](https://www.atlassian.com/software/rovo-dev)) [vendor press release]
- **5M+ monthly active users** claimed ([Deviniti: 38 Atlassian AI Statistics](https://deviniti.com/blog/enterprise-software/38-atlassian-ai-statistics-for-2026-rovo-atlassian-intelligence-adoption/)) [domain trade publication] — but this is Rovo overall, not specifically Agents

### Practitioner Evidence

- **First Rovo Agent build report** — Automation Consultants (Atlassian partner) documented building their first Rovo Agent. Results described as "results we didn't [expect]" — suggestive of underwhelming outcomes. ([Atlassian Community: The Making of Our First Rovo Agent](https://community.atlassian.com/forums/App-Central-articles/The-Making-of-Our-First-Rovo-Agent-and-the-Results-We-Didn-t/ba-p/3160646)) [practitioner direct]
- **Backend LLM swap broke production agents (March 31, 2026)** — Mandatory migration to new backend model broke attachment-reliant workflows. Agents can no longer access files in primary Attachments field, only through comments/activity. Community urgency expressed — production workflows disrupted. ([Atlassian Community: Important Update](https://community.atlassian.com/forums/Atlassian-AI-Rovo-articles/Important-Update-Rovo-Agents-are-getting-a-new-backend-LLM-model/ba-p/3207356)) [practitioner direct]
- **Agents in Jira governance design (Feb 25, 2026)** — Agents operate inside Jira's existing permission structures (not alongside), with audit logs, OAuth 2.1, and human approval required for high-impact changes. SVP Saxena: "What we don't want is agents that do 10 times the work but also create 10 times the chaos." Agents cannot delete or modify production code without approval. ([TechInformed: Atlassian adds AI agents to Jira](https://techinformed.com/atlassian-adds-ai-agents-to-jira-under-existing-permissions/)) [domain trade publication]
- **MCP enterprise adoption is real** — Enterprises account for 50% of all Rovo MCP Server usage; 93% from paid editions. Nearly 1/3 of MCP operations are writes (creating/updating records). ([same source]) [domain trade publication]
- **Limitation: no programmatic API for agents** — Marketplace apps cannot call Rovo agents programmatically; must go through the chat interface manually. ([Atlassian Community: Understanding Rovo Agent limitations](https://community.atlassian.com/forums/Atlassian-AI-Rovo-discussions/Understanding-Rovo-Agent-limitations-auto-creating-vs-publishing/td-p/3166960)) [practitioner direct]
- **Bulk action cap** — limited to 20 work items per bulk action in Jira. Cannot handle custom Jira fields. Context degradation reported in long-running projects. ([eesel AI: Rovo review](https://www.eesel.ai/blog/rovo)) [practitioner analysis]

### Pricing Reality

- **Per-user fee:** ~$16/user/month, charged for every user with access — not just active users
- **Usage caps:** Enterprise users get ~7 "engagements" per month (extremely tight)
- **Transition to consumption-based pricing** in early 2026 — teams worried about cost unpredictability after lock-in
- **Credit system** — specific actions (agent triggers) deduct from monthly enterprise pool
- (Sources: [eesel AI: Rovo review](https://www.eesel.ai/blog/rovo); [Atlassian: Rovo Plans](https://www.atlassian.com/licensing/rovo)) [practitioner analysis / vendor]

### The Agentic Test

| Dimension | Assessment |
|-----------|------------|
| Multi-step autonomous? | Limited. Agents execute predefined workflows, not open-ended multi-step reasoning |
| Multi-tool? | Within Atlassian ecosystem only. MCP Server enables external AI to read/write Jira/Confluence, but Rovo agents themselves don't reach outside |
| Multi-turn? | Chat interface supports multi-turn, but limited session memory reported |
| Security/governance? | Write-access warnings. "Never deploy with full write-access to production" per implementation guides. No formal verification |

---

## Slack (Salesforce Agentforce)

### What It Is

Slack is becoming the "agentic OS" for Salesforce — the conversational surface where Agentforce agents live. Slackbot has been rebuilt as an enterprise agent with 30 new AI features (March 2026). Slack also functions as an MCP client and exposes an MCP server for external agents.

### What's Shipping

- **Agentforce in Slack GA** — Slackbot rebuilt with Agentforce backend. @mention agents in DMs or channels. Agentforce Hub as dedicated UI. Rolled out to Business+ and Enterprise+ customers Jan-Feb 2026. ([Salesforce: Slackbot GA announcement](https://www.salesforce.com/news/press-releases/2026/01/13/slackbot-announcement/)) [vendor press release]
- **30 new AI features** announced March 31, 2026 — many "set to roll out in coming months" (not all shipping). MCP client capability, CRM integration, workflow orchestration. ([TechCrunch](https://techcrunch.com/2026/03/31/salesforce-announces-an-ai-heavy-makeover-for-slack-with-30-new-features/); [SiliconANGLE](https://siliconangle.com/2026/03/31/salesforce-transforms-slackbot-ultimate-work-assistant-30-new-ai-features/)) [general press]
- **Slackbot as MCP client** — connects to any app that registers its MCP server through Slack's manifest: Agentforce, Google Workspace, Microsoft 365, Notion, Workday, ServiceNow, and 6,000+ Salesforce ecosystem apps. ([Slack blog: Powering Agentic Collaboration](https://slack.com/blog/news/powering-agentic-collaboration)) [vendor press release]
- **Slack MCP Server + Real-Time Search API GA** — 50+ partners (Anthropic, Google, OpenAI, Perplexity) building context-aware agents grounded in Slack's real-time conversational data. ([Slack blog: MCP RTS API](https://slack.com/blog/news/mcp-real-time-search-api-now-available)) [vendor press release]
- **Third-party AI agents** — Adobe Express, Cohere available now; Claude (Anthropic), Glean, You.com, IBM, Perplexity coming. ([Slack: AI Agents](https://slack.com/ai-agents)) [vendor press release]
- **Anthropic deep integration** — two-way Claude integration via MCP. Strategic partnership between Salesforce and Anthropic. ([Salesforce: Anthropic partnership](https://www.salesforce.com/news/stories/salesforce-anthropic-trusted-context-ai-actions-on-claude/); [NoJitter](https://www.nojitter.com/ai-automation/salesforce-s-slack-deepens-anthropic-s-claude-integration)) [vendor press release / general press]

### Practitioner Evidence

- **Salesforce as "Customer Zero"** — 6 months of internal testing. 86% of employees use Agentforce in Slack. Projected 500K+ employee hours saved annually. Started with HR and IT use cases before expanding. Key lesson: "success depends as much on change management as technical implementation." ([Salesforce: Deploying Agentforce](https://www.salesforce.com/news/stories/deploying-agentforce-slack-insights/)) [vendor case study — Level 0, but unusually detailed on change management lessons]
- **Specialized > general agents** — Salesforce found specialized agents (Sales Agent, HR Agent) outperformed general-purpose ones. Sales Agent pulls pipeline data, forecasts, competitive intel without leaving Slack. ([same source]) [vendor case study]
- **Financial metrics confirm revenue reality (Q4 FY26)** — Agentforce ARR $800M, up 169% YoY. 29,000 deals closed, up 50% QoQ. 2.4 billion "agentic work units" in Agentforce and Slack. ([TechHQ: Agentforce numbers](https://techhq.com/news/salesforce-agentforce-enterprise-agentic-ai/)) [domain trade publication] — Revenue is reliable, "work units" is vendor-defined.
- **Independent analyst concern (Futurum, Jan 2026)** — Keith Kirkpatrick: "The larger question around Agentforce is whether these productivity data points will ultimately result in top- or bottom-line benefits to the business." Time savings ≠ business value unless capacity redirected. Evidence is "experience-driven" not independently verified. ([Futurum: Slackbot GA analysis](https://futurumgroup.com/insights/salesforces-slackbot-goes-ga-is-this-the-real-test-for-agentforce/)) [practitioner analysis]
- **No independent enterprise deployment evidence found (confirmed after Cycle 96).** 6+ targeted searches returned zero independent enterprise deployment stories. Every customer mention traces to Salesforce-curated sources. [SOURCE NEEDED for independent deployments — escalated to confirmed absence after second cycle]

### The Agentic Test

| Dimension | Assessment |
|-----------|------------|
| Multi-step autonomous? | Agentforce agents can chain steps within Salesforce ecosystem. Slackbot orchestrates across connected MCP servers — how autonomous this really is remains unclear |
| Multi-tool? | Strongest of the four — MCP client connecting 6,000+ apps. But depth of integration per tool unknown |
| Multi-turn? | Conversational interface is inherently multi-turn. Agentforce maintains context within sessions |
| Security/governance? | Enterprise access controls, admin management. Salesforce Trust architecture. But governance of third-party agents in Slack is a gap |

---

## Notion AI / Custom Agents

### What It Is

Notion has evolved from a workspace with AI assistance to a platform where Custom Agents run 24/7, handling recurring workflows. Launched September 2025 (Notion 3.0: Agents), expanded February 2026 (Notion 3.3: Custom Agents with MCP).

### What's Shipping

- **Custom Agents GA** (Feb 24, 2026) — autonomous agents that run on schedules or triggers, complete multi-step work across workspace and connected tools. Up to 20 minutes of autonomous work across hundreds of pages simultaneously. ([Notion releases: 3.3](https://www.notion.com/releases/2026-02-24)) [vendor press release]
- **21,000 agents built in beta** — within weeks of public beta. Notion runs 2,800 agents internally (more agents than employees). ([Y Build: Notion Custom Agents](https://ybuild.ai/en/blog/notion-custom-agents-autonomous-ai-teammates-2026)) [domain trade publication]
- **Multi-model support** — GPT-5.2, Claude Opus 4.5, Gemini 3. User picks the model. ([Notion releases](https://www.notion.com/releases)) [vendor press release]
- **MCP integrations** — pre-configured: Linear, Figma, HubSpot, Slack, Notion Mail, Notion Calendar. Custom MCP server connections for internal tools. Wiz (security) integration via MCP announced. ([Notion Help: MCP connections](https://www.notion.com/help/mcp-connections-for-custom-agents); [Wiz: Notion MCP integration](https://www.wiz.io/blog/wiz-notion-mcp-agents-integration)) [vendor press release]
- **Pricing: credit-based** — free trial through May 3, 2026. Then $10/1,000 credits on Business ($20/user/month) or Enterprise plans. ([Notion: Custom Agents help](https://www.notion.com/help/custom-agents)) [vendor]

### Named Production Deployments (Cycle 96 additions)

- **Remote (global HR company)** — IT team replaced help desk system with Custom Agents. Agents triage with >95% accuracy and autonomously resolve 25%+ of tickets. Saves IT team 20 hours per week. Keeps Slack and Notion in sync. (Source: Notion launch blog citing Remote; curated by vendor.) ([Notion: Introducing Custom Agents](https://www.notion.com/blog/introducing-custom-agents)) [vendor press release — Level 0 proximity, Level 2 in substance]
- **Ramp ($32B fintech)** — Over 300 agents in production. "Product Oracle" answers roadmap questions daily (Slack-connected Q&A). "Sales Feedback Categorizer" maps inbound sales feedback to roadmap. "Referral Bonus Roy" identifies customers due referral bonuses and routes work to completion. Cut productivity-tool costs roughly 70%, teams moved 3x faster. Mid-2025 start. ([Creator Economy: Inside Ramp AI agents](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles)) [practitioner direct — paywall limited]
- **Notion internal** — 2,800 agents running continuously, more agents than the company has employees.

**Caveat:** Both Remote and Ramp cases are surfaced via Notion's own launch materials. Named companies, named practices, measurable outcomes — but vendor-curated.

### Limitations (Practitioner-Sourced)

- **Workspace confinement** — agents operate on Notion data. Cannot write data to external systems directly. No HTTP requests outside Notion's ecosystem. ([eesel AI: Notion AI limitations](https://www.eesel.ai/blog/notion-ai-limitations-best-practices); [Build to Launch: Notion AI Agents](https://buildtolaunch.substack.com/p/notion-ai-agents-examples-guide)) [practitioner analysis]
- **Agents cannot create other agents** — manual setup required for each agent (practitioner-confirmed via BuildToLaunch review) [practitioner direct]
- **Isolated agent editing** — locked to one agent when editing, no cross-agent bulk updates [practitioner direct]
- **No audit trail for regulated industries** — explicitly flagged as unaddressed. Finance/healthcare deployments would require supplemental tooling. [practitioner direct]
- **1,000-row data limit** — not designed for complex calculations or data analysis
- **Slack integration gaps** — private messages and Slack Enterprise Grid unsupported. Triggers only work with public channels
- **Static knowledge** — operates on Notion's copy of data, disconnected from live external databases. MCP alleviates this partially but integration depth varies
- **No image generation** in automated workflows

### The Agentic Test

| Dimension | Assessment |
|-----------|------------|
| Multi-step autonomous? | Yes — 20-minute autonomous runs, scheduled/triggered execution. Closest to real agents among the four |
| Multi-tool? | Expanding via MCP but workspace-confined for writes. Reads external data, can't write back to most systems |
| Multi-turn? | Agents run autonomously, not conversationally. Different paradigm — more batch than interactive |
| Security/governance? | Business/Enterprise plan requirement. MCP connections require admin approval. No formal governance framework documented |

---

## Zoom AI Companion

### What It Is

Zoom AI Companion 3.0 is Zoom's expansion from meeting summarization to agentic workflows across Zoom Workplace, Phone, and CX. Announced at Enterprise Connect March 2026. Includes prebuilt agents (Sales, IT, Marketing) and custom agent builder.

### What's Shipping

- **AI Companion 3.0 GA** — agentic workflows, personal workflows, central AI tab in Zoom Workplace app. ([Zoom news: AI Companion 3.0](https://news.zoom.com/zoom-launches-ai-companion-3-0/)) [vendor press release]
- **MAU tripled YoY** in Q4 FY26 (no absolute number given). ([same source]) [vendor press release]
- **Prebuilt agents** for Sales, IT, Marketing — no-code. Custom agent builder for organizations. ([Zoom news: EC26 announcements](https://news.zoom.com/ec26-agentic-ai-platform-announcements/)) [vendor press release]
- **10 new enterprise connectors** — Salesforce, ServiceNow, Box, Google Drive, OneDrive for intelligent retrieval. ([same source]) [vendor press release]
- **Personal workflows** — auto-compile meeting insights into daily reflection reports, summarize Team Chat threads. ([same source]) [vendor press release]
- **Included at no extra cost** for paid plans (base AI Companion). Custom AI Companion add-on is separate. ([Computer Weekly](https://www.computerweekly.com/news/366631736/Zoom-includes-AI-at-no-extra-cost-to-crack-enterprise-adoption-puzzle)) [general press]

### Limitations (Practitioner/Analyst-Sourced)

- **Knowledge silo** — strong within Zoom data (meetings, chats, recordings), near-useless for information living in Confluence, Google Docs, Zendesk, or other systems. ([eesel AI: Zoom AI review](https://www.eesel.ai/blog/zoom-ai); [Condado: Strategic Review](https://www.condado.com/news/zoom-ai-companion-3-0-for-enterprise-a-strategic-review)) [practitioner analysis]
- **Zoom-universe confinement** — actions limited to Zoom products. Can retrieve from external connectors but orchestration stays within Zoom. ([same sources])
- **Non-English degradation (Cycle 96 addition)** — Summarization quality degrades significantly with non-English content. Mixed-language meetings report substantially reduced accuracy. Nordic-relevant limitation. ([Condado review](https://www.condado.com/news/zoom-ai-companion-3-0-for-enterprise-a-strategic-review)) [domain trade publication]
- **Data governance concern** — audio transcripts, screen-shared content, chat messages processed by third-party AI providers (Anthropic, OpenAI). Regulated industries need to assess carefully. ([same source]) [domain trade publication]
- **Customer support complaints** — "AI chatbot goose chase" described by practitioners seeking help. ([tldv.io: Zoom AI Companion Review](https://tldv.io/blog/zoom-ai-companion-review/)) [practitioner analysis]
- **Governance gap** — role-based access controls and audit trails need careful configuration. No formal agent governance framework. ([Condado review]) [domain trade publication]
- **Financial metrics confirm real adoption (Cycle 96):** Q4 FY26 revenue $1.247B (+5.3% YoY); enterprise revenue +7.1%; all top 10 deals included paid AI components. Revenue is reliable. "MAU tripled" without base number remains vendor opacity. ([NoJitter: AI Companion 3.0 GA](https://www.nojitter.com/ai-automation/zoom-ai-companion-3-0-now-generally-available)) [domain trade publication]

### The Agentic Test

| Dimension | Assessment |
|-----------|------------|
| Multi-step autonomous? | Limited. Personal workflows automate sequences, but these are scripted automations, not open-ended reasoning |
| Multi-tool? | 10 connectors for retrieval. Actual cross-system orchestration is minimal |
| Multi-turn? | Conversational in the AI Companion tab, but agent depth is shallow |
| Security/governance? | Basic RBAC. No formal verification. Governance is a known gap |

---

## Lighter Tracking: Asana, Monday.com, Miro

### Asana AI Teammates

- 21 prebuilt agents for Marketing, IT, Ops. No-code custom builder.
- 93% of AI Teammates granted full edit access (vendor-sourced stat — interesting signal on trust if verified independently)
- Pre-built: Campaign Brief Writer, Launch Planner, Status Reporter, Business Case Builder
- CEO quote: "In 2026, the most successful companies will set goals that sound absurd without AI"
- (Source: [Asana: AI Teammates Overview](https://asana.com/resources/ai-teammates-overview)) [vendor press release]

### Monday.com AI Agents

- Infrastructure for AI agents (Claude, ChatGPT, Copilot, Gemini, Perplexity) to sign up, authenticate, and operate within Monday.com
- Agents organize projects, update workflows, trigger automations, generate reports
- Positioning as an "agent-ready" platform rather than building their own agents
- (Source: [Monday.com IR: AI Agents Announcement](https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Welcomes-AI-Agents-to-Its-Platform-Marking-a-Shift-in-How-Work-Gets-Done/default.aspx)) [vendor press release]

### Miro AI

- AI Workflows: multi-step Flows + Sidekicks for analysis/content creation (Enterprise plans)
- Connects to Microsoft Copilot, Gemini Enterprise, Amazon Q, Glean for company knowledge grounding
- Focused on discovery and planning → structured action
- (Source: [Miro: What's New January 2026](https://www.gend.co/blog/miro-whats-new-january-2026)) [domain trade publication]

**All three are Level 0 evidence (vendor announcements only). No independent deployment evidence found.**

---

---

## Agent Sprawl — The Governance Crisis (Cycle 96 addition)

The agent sprawl problem this research category predicted is now empirically documented across multiple independent surveys.

### Scale

- **3M+ agents running in enterprises, 1.5M unsecured** — Gravitee State of AI Agent Security 2026 report. ([Gravitee/beam.ai](https://beam.ai/agentic-insights/ai-agent-sprawl-new-shadow-it)) [domain trade publication]
- **94% of organizations concerned about sprawl** increasing complexity, technical debt, and security risk — OutSystems research. ([PRNewswire/OutSystems](https://www.prnewswire.com/apac/news-releases/agentic-ai-goes-mainstream-in-the-enterprise-but-94-raise-concern-about-sprawl-outsystems-research-finds-302739251.html)) [general press — stat only]
- **80%+ of IT leaders** believe proliferating AI agents will create more complexity than value — 2026 Salesforce Connectivity Benchmark Report (n=1,050 IT leaders with Vanson Bourne and Deloitte Digital). ([CIO Dive: IT leaders grapple with agent sprawl](https://www.ciodive.com/news/it-leaders-grapple-ai-agent-sprawl-integration/811411/)) [domain trade publication]
- **Only 36% have centralized governance; 12% use a centralized platform** — same survey.
- **Average 12 agents per company today, projected 20 by 2027** — same survey.
- **96% of IT leaders say agentic AI's long-term effectiveness depends on data integration** — same survey.
- **35% cite siloed app integration as primary challenge** — same survey.

### Collaboration Tools as Primary Vector

Agent sprawl is driven by the Trojan horse dynamic: agents arriving via feature toggles in Jira, Slack, Notion, and Zoom require no procurement decision. Each tool brings its own agents. No one tool can govern agents from another tool. This is the mechanism by which 1.5M agents became unsecured.

### Vendor Response: Agent Registries

Every major cloud provider is now building agent registries in direct response to sprawl:
- **AWS Agent Registry** (announced April 13, 2026) — visibility into every agent across the enterprise, metadata for all agents/tools/MCP servers ([thelettertwo.com: AWS Agent Registry](https://thelettertwo.com/2026/04/09/aws-unveils-agent-registry-to-bring-order-to-enterprise-ai-sprawl)) [domain trade publication]
- **Microsoft** — Agent 365 + Entra Agent ID for identity management
- **Google** — Cloud API Registry + Vertex AI Agent Builder
- **ServiceNow** — AI Control Tower
- **Okta** — AI agent identity solutions

None of these registries specifically govern agents deployed inside collaboration tools yet.

**Evidence level: Level 3** (multiple independent surveys converging on governance gap as the defining enterprise AI problem of 2026)

---

## A2A Protocol — The Cross-Tool Coordination Wildcard (Cycle 96 addition)

**What's emerged:** A three-layer AI protocol stack is becoming the enterprise consensus architecture:
- **MCP** — connects agents to tools and data (Atlassian, Slack, Notion, Zoom all MCP-enabled now)
- **A2A (Agent-to-Agent)** — coordination layer for agent-to-agent communication and delegation
- **WebMCP** — web access layer

**A2A milestone:** One year in, the A2A Protocol (Linux Foundation hosted) has 150+ supporting organizations, integrated across Google, Microsoft, and AWS. Active production deployments in supply chain, financial services, insurance, IT operations.

**Collaboration platform A2A gap:** No collaboration platform has announced A2A adoption as of April 2026. This is the critical next frontier. If Jira agents, Slack agents, and Notion agents adopt A2A, they could coordinate autonomously across tools — eliminating workspace confinement at protocol level rather than requiring a single-vendor platform.

**Implication for the Trojan Horse thesis:** A2A adoption by collaboration platforms would transform the "wooden horse" into a real agent. The silo problem that limits all four platforms today would become architecturally solvable without a platform selection decision.

**Source:** [DEV Community: MCP vs A2A 2026](https://dev.to/pockit_tools/mcp-vs-a2a-the-complete-guide-to-ai-agent-protocols-in-2026-30li) [practitioner analysis]; [A2A Protocol milestone](https://zexprwire.com/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year/) [general press — facts only]
**Evidence level:** Level 2 on A2A adoption; confirmed absence for collaboration platform adoption

---

## The Trojan Horse Thesis

**Thesis:** Agents arriving through collaboration tools people already use will bypass the CTO's platform selection entirely. By the time the CTO forms a platform strategy, employees are already using agents in Jira, Slack, and Notion.

### Evidence For

1. **Adoption numbers are real** — 5M+ Rovo MAU, 21K Notion agents built in beta, Zoom AI Companion MAU tripled. These aren't pilots; people are using the features.
2. **MCP is connecting the tools** — Atlassian MCP Server GA with 15+ clients, Slack as MCP client with 6,000+ app ecosystem, Notion MCP with Linear/Figma/HubSpot. The plumbing for cross-tool agent work is being laid.
3. **Zero friction adoption** — no procurement process, no IT project. Toggle a feature, start using agents. This is how Shadow IT won before — same pattern.
4. **Multi-vendor agent support** — Slack hosts agents from Adobe, Anthropic, Cohere, Perplexity. Monday.com supports Claude, ChatGPT, Copilot, Gemini. The tools are becoming agent surfaces, not locked ecosystems.

### Evidence Against (Counter-Evidence)

1. **These are shallow agents, not real autonomous workers.** Rovo is capped at 20 bulk items. Notion agents can't write to external systems. Zoom can't see Confluence. None of these pass the multi-tool/multi-turn/security enterprise reality test from our research framework.
2. **Workspace confinement is structural.** Every platform's agents work best (and often only) within their own data silo. The moment a workflow crosses system boundaries, the agent hits a wall. MCP helps but integration depth is thin.
3. **Pricing traps.** Rovo's consumption-based pricing, Notion's credit system, Zoom's add-on tier — these are designed to drive adoption then monetize. The "free agent" in your collaboration tool won't stay free as usage scales.
4. **No governance framework.** None of these platforms offer formal verification, Cedar-style policy enforcement, or enterprise-grade agent governance. Running agents with write access to production Jira without governance is a disaster waiting to happen.
5. **Vendor-sourced metrics only.** Salesforce's "86% adoption" is Salesforce using their own product. Notion's "21,000 agents" doesn't mean 21,000 useful agents. Zero independent verification of any adoption or outcome claim.

### Verdict on the Trojan Horse (updated Cycle 96, April 2026)

**The Trojan horse has already entered the gates. The question is now governance, not arrival.**

The previous verdict ("carries co-pilots, not agents") needs differentiation:

- **Notion Custom Agents** now carries genuine agents for workspace-bound work. Remote and Ramp are running real production autonomous workflows. This passes the "multi-step autonomous" test within a constrained scope.
- **Atlassian Rovo** is the most mature governance model in the category — agents inside existing permissions, audit trails, human approval gates. Still workspace-confined for agent-initiated actions, but MCP enables external clients to reach in.
- **Agentforce in Slack** has real financial traction ($800M ARR) but zero independent enterprise deployment evidence. Still vendor-only.
- **Zoom AI Companion** remains the shallowest — automation sequences, not autonomous reasoning.

The real risk has materialized: **agent sprawl is now the defining enterprise governance problem.** 94% of organizations confirm it. 1.5M unsecured agents are running. Collaboration tools are the primary vector because they arrive as feature toggles, not procurement decisions. Every major cloud provider is now building agent registries in direct response.

The platform choice doesn't disappear — it escalates to governance. "Which platform?" becomes "how do we govern the agents that arrived through every tool we already use before we had a strategy?" Atlassian's governance-first design is currently the best available template for this problem in the collaboration tool space.

---

## The CTO Question

> "Will agents show up inside the tools we already use, making platform choice irrelevant?"

**Answer (as of 2026-04-02):** They're already showing up, and they're already being used. But they don't make platform choice irrelevant — they make it more urgent. Here's why:

1. **Agents in collaboration tools are feature-level, not platform-level.** They automate within one tool's data. Real enterprise processes cross 5-10 systems. Feature-level agents can't do that.

2. **Agent sprawl is the new Shadow IT.** Without a platform strategy, you'll have Rovo agents in Jira, Agentforce in Slack, Notion agents for docs, Zoom agents for meetings — none of them talking to each other, none governed consistently.

3. **MCP is the bridge, but it's early.** MCP support is expanding across all four platforms. If MCP matures into a real interoperability layer, the "agents in every tool" model could work. But today, MCP connections are read-heavy, write-light, and shallow.

4. **The platform question shifts, it doesn't disappear.** Instead of "which agent platform do we pick?" the question becomes "how do we govern the agents that are already arriving in every tool our people use?"

---

## Personal → Team → Company Progression

| Level | Atlassian Rovo | Slack/Agentforce | Notion AI | Zoom AI Companion |
|-------|---------------|-----------------|-----------|-------------------|
| Personal | Chat, search | Slackbot AI assist | AI Q&A, writing | Meeting summaries, AI tab |
| Team | Rovo Agents in workflows | Agentforce in channels | Custom Agents on schedules | Personal workflows, prebuilt agents |
| Company | MCP Server for external AI | MCP client + 6K apps | MCP integrations (expanding) | 10 enterprise connectors |
| Promotion path | Unclear — consumption pricing creates uncertainty | Strongest — Agentforce ecosystem pulls toward Salesforce platform | Weak — workspace-confined | Weakest — Zoom-universe only |

---

## What We Need To Learn

- [ ] **Independent deployment evidence for Agentforce in Slack** — CONFIRMED ABSENCE after 2 cycles. Zero independent enterprise deployment published. Every mention traces to Salesforce. Priority: find any non-Salesforce enterprise that has published Agentforce in Slack outcomes.
- [ ] **MCP write depth in practice** — 1/3 of Rovo MCP operations are writes (confirmed), but which writes? Creating Jira tickets from external agents? Updating Confluence pages? Actual workflow examples from practitioners needed.
- [ ] **Notion Custom Agents post-pricing (May 4, 2026)** — credit pricing just kicked in. Did adoption plateau, collapse, or continue? Remote/Ramp are named deployers — are they paying at scale?
- [ ] **A2A protocol adoption by collaboration platforms** — None have adopted A2A as of April 2026. If one does, it changes the cross-tool coordination picture fundamentally. Watch Atlassian, Slack, and Notion announcements.
- [ ] **Agent sprawl governance: who's winning?** — AWS Agent Registry, Microsoft Entra Agent ID, ServiceNow AI Control Tower all launched. Which are enterprises actually using to govern collaboration-tool agents? No evidence yet.
- [ ] **Nordic signal** — Zoom's non-English degradation is Nordic-relevant but not Nordic-origin. Zero Nordic collaboration-tool deployments found after 2 cycles.
- [ ] **First public security incident** — agents with write access to Jira, Confluence, Notion are running. The first publicized "agent made a mess in production" will be the governance wake-up call and a major finding for this category.
- [ ] **Rovo pricing cliff impact** — Atlassian's consumption-based pricing transition in early 2026 was anticipated as a potential adoption brake. Has any team reported reducing Rovo usage due to cost?

## Sources

All sources cited inline with URLs and source type labels. Key source types:
- **Vendor press releases:** Atlassian, Salesforce/Slack, Notion, Zoom announcements — Level 0, used for "what was announced" only
- **Practitioner direct:** Atlassian Community posts on Rovo limitations, backend model issues; BuildToLaunch on Notion agent limitations — Level 2
- **Practitioner analysis:** eesel AI reviews of Rovo, Zoom, Notion; Futurum analyst assessment — Level 2
- **Domain trade publication:** CIO Dive (agent sprawl survey), TechInformed (Agents in Jira governance), Condado (Zoom enterprise review), NoJitter — Level 2
- **General press:** TechCrunch, SiliconANGLE, Computer Weekly — bare facts only

**What We Did Not Find (updated Cycle 96):**
- Independent (non-vendor) enterprise deployment evidence for Agentforce in Slack — CONFIRMED ABSENCE after 2 cycles
- Practitioner reports of multi-system agent orchestration through collaboration tools (agents reading from AND writing to 3+ systems autonomously)
- Any formal governance framework specifically for agents in collaboration tools (registries are building but not yet governing collaboration tool agents)
- Nordic-specific deployment evidence — confirmed absence after 2 cycles
- Head-to-head practitioner comparison of agent capabilities across collaboration platforms
- A2A protocol adoption by any collaboration platform — confirmed absence
- First documented security incident from collaboration tool agent with write access
