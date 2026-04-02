# Collaboration Platforms Adding Agents — Platform State

Last updated: 2026-04-02 (cycle 1)
OODA cycles: 1

## Focus

Agents arriving inside collaboration tools enterprises already use — Atlassian, Slack, Notion, Zoom. The "Trojan horse" scenario: if agents ship embedded in Jira, Slack, and Confluence, does the CTO's platform choice become irrelevant? Tracked because this is how most business users will first encounter agents — not through a platform selection process, but through a feature toggle in a tool they already have open.

## Key Verdict (as of 2026-04-02)

**Agents are shipping inside collaboration tools — but they are shallow agents with hard boundaries.** Every platform has launched "agents" or "AI teammates" in the last 6 months: Atlassian Rovo Agents, Slack's Agentforce-powered Slackbot, Notion Custom Agents, Zoom AI Companion 3.0. Adoption numbers look real (Rovo: 5M+ MAU; Notion: 21,000 agents built in beta; Slack Agentforce: 86% internal adoption at Salesforce; Zoom AI Companion MAU tripled YoY). But the pattern across all four is the same: **strong within the tool's own data, weak the moment you need to cross system boundaries.** MCP support is expanding (Atlassian MCP Server GA, Slack as MCP client, Notion MCP integrations) but multi-system orchestration is nascent. These are co-pilot features marketed as agents, not autonomous multi-tool workers. The Trojan horse is real but it's a wooden horse — impressive on the outside, limited payload inside.

**Evidence level: Level 2 (single experiments) trending toward Level 3 on adoption numbers, but Level 1 on actual agentic capability.** Vendor adoption stats are high but vendor-sourced. Independent practitioner evidence of multi-step autonomous work is thin across all four platforms.

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
- **Backend LLM swap issues (April 2026)** — New backend model broke attachment retrieval. Agents can no longer access files in primary Attachments field, only through comments/activity. ([Atlassian Community: Important Update](https://community.atlassian.com/forums/Atlassian-AI-Rovo-articles/Important-Update-Rovo-Agents-are-getting-a-new-backend-LLM-model/ba-p/3207356)) [practitioner direct]
- **Limitation: no programmatic API for agents** — Marketplace apps cannot call Rovo agents programmatically; must go through the chat interface manually. ([Atlassian Community: Understanding Rovo Agent limitations](https://community.atlassian.com/forums/Atlassian-AI-Rovo-discussions/Understanding-Rovo-Agent-limitations-auto-creating-vs-publishing/td-p/3166960)) [practitioner direct]
- **Bulk action cap** — limited to 20 work items per bulk action in Jira. Field mapping errors reported. ([eesel AI: Rovo review](https://www.eesel.ai/blog/rovo)) [practitioner analysis]

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
- **No independent enterprise deployment evidence found.** All adoption metrics are Salesforce's own numbers about their own product used internally. Classic vendor-sourced. [SOURCE NEEDED for independent deployments]

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

### Limitations (Practitioner-Sourced)

- **Workspace confinement** — agents operate on Notion data. Cannot write data to external systems directly. No HTTP requests outside Notion's ecosystem. ([eesel AI: Notion AI limitations](https://www.eesel.ai/blog/notion-ai-limitations-best-practices); [Build to Launch: Notion AI Agents](https://buildtolaunch.substack.com/p/notion-ai-agents-examples-guide)) [practitioner analysis]
- **1,000-row data limit** — not designed for complex calculations or data analysis
- **Slack integration gaps** — private messages and Slack grid unsupported. Triggers only work with public channels
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
- **Customer support complaints** — "AI chatbot goose chase" described by practitioners seeking help. ([tldv.io: Zoom AI Companion Review](https://tldv.io/blog/zoom-ai-companion-review/)) [practitioner analysis]
- **Governance gap** — role-based access controls and audit trails need careful configuration. No formal agent governance framework. ([Condado review]) [domain trade publication]
- **No absolute adoption numbers** — "tripled YoY" without a base number is a classic vendor opacity move

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

### Verdict on the Trojan Horse

**The Trojan horse is real but it carries co-pilots, not agents.** These features will normalize AI interaction for millions of business users — which is significant. But they won't replace the need for a platform strategy because:
- They can't orchestrate across systems (the thing enterprises actually need)
- They have no governance framework (the thing security teams will demand)
- They lock agent capability to one vendor's data silo (the thing CTOs should worry about)

The real risk isn't that these tools make platform choice irrelevant. It's that they create **agent sprawl** — every team picks up the agent in their favorite tool, creating a fragmented mess that's harder to govern than no agents at all.

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

- [ ] **Independent deployment evidence** — anyone outside Salesforce reporting real outcomes from Agentforce in Slack? Anyone outside Atlassian reporting Rovo Agent outcomes?
- [ ] **MCP integration depth** — can agents actually DO things across system boundaries, or just read? Specifically: can a Notion agent create a Jira ticket via MCP? Can Slack's Agentforce update a Confluence page?
- [ ] **Agent sprawl reality** — are enterprises experiencing governance problems from agents in multiple collaboration tools? Is anyone trying to unify governance across Rovo + Slack + Notion agents?
- [ ] **Credit/consumption pricing impact** — as usage-based pricing kicks in (Rovo, Notion), does adoption plateau or collapse?
- [ ] **Notion Custom Agents practitioner depth** — 21,000 agents built, but what are they actually doing? Are any running complex multi-step workflows in production?
- [ ] **Nordic signal** — any Nordic companies deploying collaboration-tool agents beyond basic features?
- [ ] **A2A protocol adoption** — will collaboration tools adopt Agent-to-Agent protocol, enabling agents in different tools to coordinate?
- [ ] **Security incident watch** — when (not if) an agent with write access to production Jira creates a mess, that will be the governance wake-up call

## Sources

All sources cited inline with URLs and source type labels. Key source types:
- **Vendor press releases:** Atlassian, Salesforce/Slack, Notion, Zoom announcements — Level 0, used for "what was announced" only
- **Practitioner direct:** Atlassian Community posts on Rovo limitations, backend model issues — Level 2
- **Practitioner analysis:** eesel AI reviews of Rovo, Zoom, Notion — Level 2
- **General press:** TechCrunch, SiliconANGLE, Computer Weekly — bare facts only
- **Domain trade publication:** Deviniti (Atlassian statistics), Futurum (Agentforce analysis) — Level 1-2

**What We Did Not Find:**
- Independent (non-vendor) enterprise deployment evidence for ANY of these four platforms
- Practitioner reports of multi-system agent orchestration through collaboration tools
- Any formal governance framework for agents in collaboration tools
- Nordic-specific deployment evidence
- Head-to-head comparison of agent capabilities across collaboration platforms by an independent practitioner
