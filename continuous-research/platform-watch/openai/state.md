# OpenAI — ChatGPT / Codex / Operator — Platform State

Last updated: 2026-03-21 (cycle 29)
OODA cycles: 9

## Focus

OpenAI's ecosystem as it serves **business users**. ChatGPT is the most widely used AI product. But is anyone using it for agentic business work — not just chat?

## Key Verdict (as of 2026-03-21)

**Highest adoption, accelerating enterprise decline, strategic fragmentation.** ChatGPT has 900M weekly users and 50M paid subscribers. But the enterprise gap is accelerating: Anthropic now commands **40% of enterprise LLM spending** vs OpenAI's 27% (reversed from 50%/12% in 2023). Ramp AI Index (March 2026) shows Anthropic winning **~70% of head-to-head enterprise matchups** among first-time buyers. Axios (March 18) reports EpochAI projects total revenue crossover in **August 2026**. OpenAI's revenue ($25B ARR) is 85% consumer subscriptions — losing money on each. Anthropic's ($19B ARR) is 85% enterprise. ([Ramp](https://ramp.com/velocity/ai-index-march-2026); [Axios](https://www.axios.com/2026/03/18/ai-enterprise-revenue-anthropic-openai), Mar 2026). Frontier platform is 7+ weeks post-launch with **zero independent deployment evidence** from any named customer. OpenAI responding with five simultaneous strategic initiatives: (1) desktop super-app merge (ChatGPT + Codex + Atlas, March 16 all-hands), (2) Frontier enterprise platform, (3) **$10B PE joint venture** with TPG/Advent/Bain Capital/Brookfield for forward-deployed engineer engagements ($10M minimum), (4) $50B AWS cloud deal (Microsoft weighing lawsuit), (5) Q4 2026 IPO. **OpenAI's own COO Brad Lightcap confirmed Feb 24:** "We have not yet really seen enterprise AI penetrate enterprise business process" ([TechCrunch](https://techcrunch.com/2026/02/24/openai-coo-says-we-have-not-yet-really-seen-ai-penetrate-enterprise-business-processes/)). Strategy is fragmenting across consumer/enterprise/IPO/legal fronts.

## Business Agent Surface

### ChatGPT Agent (replaced Operator)
- Unified browser + research + conversation agent
- Can navigate web, fill forms, do multi-step research
- GPT-5.4 scores 75% on OSWorld-Verified (above 72.4% human average for software navigation)
- GPT-5.4 (March 2026) adds autonomous desktop/browser/software navigation — out-of-the-box agentic computer use ([Fortune](https://fortune.com/2026/03/05/openai-new-model-gpt5-4-enterprise-agentic-anthropic/))
- Operates in sandboxed virtual computer — cannot access user's browser sessions or logged-in business systems
- Plus plan: only 40 agent messages/month. Pro ($200/mo) needed for real usage
- **NEW: Recurring task scheduling** — completed tasks can be scheduled to recur (e.g., weekly metrics report every Monday). First step toward persistent business workflows. ([Help Center](https://help.openai.com/en/articles/11752874-chatgpt-agent))
- **Independent review (Cybernews, March 2026):** Complex tasks take 5-30 minutes. Virtual desktop handover is fuzzy/awkward. Prompt injection risk acknowledged by OpenAI. ([Review](https://cybernews.com/ai-tools/chatgpt-agent-review/))
- **Personal agent** tier — impressive demo, but sandboxed away from business systems

### Custom GPTs with Actions
- 3M+ created, ~159K public in GPT Store
- GPT-5.2 (Dec 2025) added multi-step workflow capability
- Business GPTs built for: proposal generation, onboarding FAQ, compliance Q&A, brand-voice content
- Cannot trigger automations across systems or maintain persistent state between sessions
- No promotion path to governed enterprise agent
- **Personal → Team** tier — but limited to Q&A and content generation

### ChatGPT Enterprise / Team
- Admin controls, SSO, SCIM (Enterprise only), data privacy
- Shared workspace for custom GPTs
- **Connectors (updated March 2026):** Google Drive, SharePoint, Notion, GitHub, Asana, ClickUp — **now with WRITE actions for Google and Microsoft apps** (draft emails, create docs/spreadsheets, schedule meetings). Previously read-only. ([Release Notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes))
- **⚠️ EEA/NORDIC — PARTIAL, INCONSISTENT ROLLOUT (Updated March 2026):** Originally excluded from EEA/Switzerland/UK for Plus/Pro users. Now partially rolling out: Gmail, Calendar, Drive, GitHub connectors appearing for some EEA users — reportedly accelerated after Anthropic released MCP connectors in Europe without restrictions. ChatGPT Agent rolled out to EEA Pro users. BUT: rollout is inconsistent feature-flag based — some users in Italy/Germany/Spain/Netherlands get access while others in same cities remain locked out. No full parity date announced. ([OpenAI on X.com original block](https://x.com/OpenAI/status/1937681383448539167); [Agent EEA rollout](https://x.com/OpenAI/status/1947882931294507263); [DataStudios](https://www.datastudios.org/post/chatgpt-agent-appears-in-europe-despite-no-formal-announcement); [4sysops](https://4sysops.com/archives/chatgpt-gmail-connector-openais-next-flop/), Mar 2026)
- **MCP connectors:** Atlassian Rovo (Jira + Confluence + Compass, with Jira WRITE actions), Amplitude, Fireflies, Monday.com, Stripe, Hex, Egnyte, Vercel ([Release Notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes))
- ChatGPT for Excel and Google Sheets (beta) — spreadsheet integration ([Release Notes](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes))
- Financial data integrations — FactSet, MSCI, Third Bridge, Moody's for market/company data ([Release Notes](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes))
- Enterprise agent controls — workspace owners can enable/disable agent mode (default OFF), assign to specific roles, block specific domains, control app availability ([Help Center](https://help.openai.com/en/articles/11752874-chatgpt-agent))
- EKM (Enterprise Key Management) disables all synced connectors
- 92% Fortune 500 penetration, 9M paying business users (4x from Sept 2025), but 57% adoption concentrated in software dev, 20% use advanced features ([Christian & Timbers](https://www.christianandtimbers.com/insights/chatgpt-reached-92-of-the-fortune-500-in-24-months), Feb 2026)
- Single-player architecture: no shared agents, no team workflows, no compounding knowledge
- **Write actions and scheduled tasks: zero adoption evidence** — features shipped but no practitioner reports of production business use. Scheduled tasks called "half-baked" (no context, 10 max). (source: runs/2026-03-21-cycle17.md)
- **Team agent** tier — governance improving but agentic workflow capability still limited

### Responses API + Agents SDK
- Developer tools for building custom agents
- Hosted containers, 1M token context
- **Company-wide agent** tier — requires developers, completely separate from ChatGPT product

## Personal → Team → Company Progression

| Level | OpenAI product | Maturity | Evidence (updated 2026-03-21) |
|-------|---------------|----------|----------|
| Personal | ChatGPT Agent + Custom GPTs | Shipping, widely used | 900M weekly users, 5M business seats. But 80% of Enterprise messages are plain chat. Usage is copilot, not agent. Agent mode is sandboxed and capped (40 msg/mo on Plus). |
| Team | ChatGPT Team / Enterprise shared GPTs | Shipping | No evidence of team-level agentic workflows. Collaboration is read-only link sharing. Architecture is single-player. Connectors now include some write actions (Google/Microsoft apps, Jira via Rovo). Enterprise controls improving (role-based agent access). |
| Company | Agents SDK + Responses API | Shipping | Developer-only. No business user path. Completely separate product from ChatGPT. |
| Promotion path | Custom GPT → ? | **Broken** | Cannot promote a personal GPT to a governed team agent. No identity management, no audit trails, no access controls on GPTs. Each level requires starting over with different tools. |

## Enterprise Deployment Evidence (business functions)

### Klarna (fintech, Sweden — best available case)
- ChatGPT Enterprise deployed to all 4,000 employees
- 90% daily usage. Communications 93%, Marketing 88%, Legal 86%
- **But:** All described use cases are chatbot/copilot (drafting, Q&A, summarizing)
- The "700 agents replaced" claim refers to customer-facing chatbot (API-built), not internal agentic workflows
- Source: Computer Weekly (independent) + OpenAI case study (Level 0)

### Asana (project management, US)
- "Cut research time by an hour per day" for engineering and data teams
- Used for hypothesis testing, log analysis, data cleaning
- **But:** This is analyst-copilot usage, not agentic workflows
- Source: IntuitionLabs aggregation of multiple sources

### Usage Pattern (OpenAI's own data)
- Top 4 use cases: writing, research, programming, analysis
- IT leads adoption (27% of business WAU), then professional services (17%), finance (6%)
- Advanced features (Custom GPTs, Projects) used in only ~20% of Enterprise messages
- "AI is augmenting expertise, not replacing it" — OpenAI's own framing
- Source: OpenAI workplace adoption report (Jan 2026)

## Structural Limitations for Business Agents (convergence — Level 3)

Multiple independent sources converge on the same set of structural gaps:

1. **Single-player architecture** — no shared agents, no team workflows (Dust, eesel, multiple reviewers)
2. **~~Read-only~~ connectors evolving** — Google/Microsoft apps now support write actions (emails, docs, meetings). Jira write via Atlassian Rovo MCP. But Salesforce/Zendesk/custom systems still read-only or unavailable. (source: runs/2026-03-21-cycle08.md)
3. **EKM kills connectors** — compliance-conscious orgs lose all data sync (OpenAI docs)
4. **No workflow orchestration** — cannot chain actions across business systems (Dust, eesel)
5. **No agent identity management** — unlike Microsoft Entra, no way to give agents governed identities. Industry audit: 93% of agent projects use unscoped API keys, only 21.9% treat agents as identity-bearing entities ([AGAT](https://agatsoftware.com/blog/ai-agent-security-enterprise-2026/), [Grantex](https://grantex.dev/report/state-of-agent-security-2026))
6. **No compliance audit trails** — Atlas not SOC 2 scoped, no SIEM/eDiscovery feeds. Industry audit: only 13% of agent projects include action logging (OpenAI docs, [AGAT](https://agatsoftware.com/blog/ai-agent-security-enterprise-2026/))
7. **Sandboxed agent environment** — Agent mode can't access logged-in business apps (multiple sources)
8. **Model retirement velocity** — two rounds of model retirement in Feb-Mar 2026, breaking Custom GPTs (OpenAI docs)
9. **Single-vendor model lock-in** — only OpenAI models, no routing to specialized models (Dust)

## Pricing (as of March 2026)

| Plan | Price | Agent capability |
|------|-------|-----------------|
| Free | $0 | No agent mode |
| Go | $8/mo | Light usage |
| Plus | $20/mo | 40 agent messages/month (barely testable) |
| Pro | $200/mo | Meaningful agent usage |
| Business | $25/user/mo | Team features, shared GPTs, admin controls |
| Enterprise | Custom (sales call) | Full governance, SSO, SCIM, unlimited GPT-5.2 |

**The cliff:** Plus → Pro is a 10x price jump ($20 → $200) for agent capability. Business plan has no agent mode differentiation from Plus.

## What We Need To Learn (business user focus)

- [x] ChatGPT Agent (post-Operator) — what can it actually do for business tasks? **Answer: Web research, comparison, report compilation. Cannot access business systems. Sandboxed. Capped at 40 msg/mo on Plus.**
- [x] Custom GPTs in enterprise — are teams building shared business GPTs? What for? **Answer: Yes — for Q&A, content generation, onboarding. Not for agentic workflows. No evidence of multi-step autonomous GPTs in production.**
- [x] ChatGPT Enterprise adoption — real usage patterns, not seat counts **Answer: 5M business seats. 80% plain chat. Top uses: writing, research, coding, analysis. Advanced features underused. Chatbot-level, not agentic.**
- [x] The GPT Store — is it being used inside companies? For what business processes? **Answer: 3M GPTs created but dominated by consumer use. No evidence of enterprise GPT Store deployment for business processes.**
- [x] Can a business user build something agentic in ChatGPT without developers? **Answer: No. Custom GPTs can do Q&A with API calls, but cannot orchestrate multi-step workflows, maintain state, or chain actions across systems.**
- [x] Pricing: Enterprise vs Team vs Plus — what agent capabilities at each tier? **Answer: Documented above. The Plus→Pro cliff ($20→$200) gates agent capability. Business plan has no agent differentiation.**

## Platform Trajectory: What OpenAI Is Building Toward

**OpenAI is building an agent operating system** — models → APIs → SDK → platform → OS. The most ambitious agent platform play of any vendor.

### The Full Stack (source: `runs/2026-03-21-codex-trajectory.md`)

| Layer | Product | Status |
|-------|---------|--------|
| Primitives API | Responses API (stateless, composable) | Shipping. Replaces Assistants Aug 2026. [Docs](https://platform.openai.com/docs/guides/migrate-to-responses) |
| Open Standard | Open Responses spec | Feb 2026. Hugging Face, Vercel, Ollama adopted. Anthropic/Google NOT. [Spec](https://www.openresponses.org/specification) |
| Developer SDK | Agents SDK (19K stars, 10.3M downloads/mo) | Open-source, provider-agnostic. [GitHub](https://github.com/openai/openai-agents-python) |
| Coding Platform | Codex (Skills + Automations + Worktrees + Plugins) | Shipping, evolving fast. [Skills docs](https://developers.openai.com/codex/skills) |
| Consumer Agent | ChatGPT Agent (browser + research + code) | Shipping. [Announcement](https://openai.com/index/introducing-chatgpt-agent/) |
| Enterprise Platform | Frontier (multi-vendor agent governance) | Limited availability. [Frontier](https://openai.com/index/introducing-openai-frontier/) |
| Enterprise Builder | AgentKit (visual + connectors + guardrails) | Launched Feb 2026. [AgentKit](https://openai.com/index/introducing-agentkit/) |

### Key Strategic Insights

1. **Frontier manages agents from ALL vendors** (Anthropic, Google, custom) — positioning OpenAI as enterprise control plane regardless of which model wins. Named customers: Uber, State Farm, Intuit, Thermo Fisher. Deals with ServiceNow, Snowflake. ([TechCrunch](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/))

2. **Codex Skills = the promotion path concept.** Packaged, shareable agent capabilities (SKILL.md + scripts). Today code-focused, but architecture is not code-specific — "Manage Projects" skill (Linear triage) is already a business process. ([Skills docs](https://developers.openai.com/codex/skills))

3. **Open Responses = the Android play.** Give away the spec to own the ecosystem. Anthropic and Google haven't joined — betting on their own formats. ([InfoQ](https://www.infoq.com/news/2026/02/openai-open-responses/), [Criticism](https://michaellivs.com/blog/open-responses-missing-spec))

4. **Altman vision: ChatGPT as digital identity.** Memory is "in its GPT-2 era." Agent personalization/learning is the endgame differentiator. But predictions run 12-18 months ahead of delivery. ([The Neuron](https://www.theneuron.ai/explainer-articles/openais-vision-for-2026-sam-altman-lays-out-the-roadmap/))

### The Gap
Everything above is announced or in limited availability. **Frontier is 7 weeks post-launch with zero independent deployment evidence.** Named customers use aspirational language ("exploring," "trial"). Consulting alliances (Accenture, BCG, Capgemini, McKinsey) and AWS exclusive cloud deal confirm go-to-market complexity — product requires hand-holding. Intuit hedging across both OpenAI and Anthropic shows even committed customers are not platform-committed. ([CNBC](https://www.cnbc.com/2026/02/23/open-ai-consulting-accenture-boston-capgemini-mckinsey-frontier.html); [PYMNTS](https://www.pymnts.com/partnerships/2026/intuit-and-anthropic-to-launch-customizable-ai-agents/), Feb 2026)

AgentKit has mixed independent reviews (developer-only). Skills are code-only. The vision is the most complete of any vendor. The execution evidence is zero.

## Cycle 15 Findings (2026-03-21)

### GPT-5.4 — Native Computer Use (Level 2)
Released March 5, 2026. First OpenAI model with desktop interaction (keystrokes, mouse, menus).
- GDPval: 83% on professional knowledge work (44 occupations), up from 70.9%. 33% fewer false claims.
- OSWorld: 75% (above 72.4% human average).
- Tool search: 47% token reduction, same accuracy across 250 tasks/36 MCP servers.
- vs Opus 4.6: GPT-5.4 leads knowledge work + computer use. Opus 4.6 leads coding + web research.
  ([Fortune](https://fortune.com/2026/03/05/openai-new-model-gpt5-4-enterprise-agentic-anthropic/); [BuildFastWithAI](https://www.buildfastwithai.com/blogs/gpt-5-4-review-benchmarks-2026), Mar 2026)

### Frontier Deployments — Named But Unverified (Level 0-1)
Uber (driver inquiries), Intuit (TurboTax), State Farm (claims processing) named as early adopters. BBVA, Cisco, T-Mobile piloted. All descriptions sourced from OpenAI launch announcement — no independent practitioner reports, no measurable outcomes. ([Fortune](https://fortune.com/2026/02/05/openai-frontier-ai-agent-platform-enterprises-challenges-saas-salesforce-workday/); [CNBC](https://www.cnbc.com/2026/02/05/open-ai-frontier-enterprise-customers.html), Feb 2026)

### AgentKit — Mixed Reviews, Developer-Only (Level 2)
Visual Agent Builder (beta), Connector Registry (beta). Praised for speed, criticized for OpenAI-model-lock-in and limited retrieval. Complementary to N8N/Zapier, not replacement. No business user deployments. ([Unite.AI](https://www.unite.ai/agentkit-by-openai-review/), 2026)

### Codex Skills — Acknowledged Not for Business Users (Level 1)
eesel.ai: "It was built by engineers, for engineers... npm install is a non-starter for customer support." ([eesel.ai](https://www.eesel.ai/blog/openai-codex), 2026)

### Open Responses — Credible Backing, No Deployments (Level 1-2)
Backed by Hugging Face, OpenRouter, Vercel, LM Studio, Ollama, vLLM. Anthropic/Google NOT joined. Replaces Assistants API (sunset Aug 26, 2026). Supports MCP natively. ([InfoQ](https://www.infoq.com/news/2026/02/openai-open-responses/); [Hugging Face](https://huggingface.co/blog/open-responses), Feb 2026)

### Write-Action Connectors & Recurring Tasks — Shipped, Zero Adoption (Level 1)
Write actions for Outlook, Google Docs/Sheets, Calendar. Jira write via Atlassian Rovo MCP. Disabled by default. Recurring tasks: 10 active limit, daily/weekly/monthly. Both features documented but zero practitioner reports of production use. ([OpenAI Help Center](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes); [gecco](https://www.geccohq.com/news/chatgpt-can-now-act-inside-outlook-google-docs-and-your-calendar); [Scheduled Tasks](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt), Mar 2026)

## Cycle 17 Findings (2026-03-21)

### Enterprise Market Share Reversal — ACCELERATING (Level 2-3)
Anthropic holds ~40% of enterprise LLM spend (up from 24%), OpenAI fell to ~27% (from 50% in 2023). **Ramp AI Index (March 2026) — strongest new signal:** Anthropic wins ~70% of head-to-head enterprise matchups among first-time buyers (up from 50/50 ten weeks ago, 60/40 in OpenAI's favor in early December). 24.4% of Ramp businesses now pay for Anthropic (vs 1-in-25 a year ago). OpenAI saw largest single-month spending decline since tracking began. Ramp economist: choosing Anthropic becoming a "cultural" moat. OpenAI COO told all-hands they couldn't afford "side quests." ([Menlo Ventures](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/); [Ramp AI Index](https://ramp.com/velocity/ai-index-march-2026); [Axios](https://www.axios.com/2026/03/18/ai-enterprise-revenue-anthropic-openai); [SaaStr](https://www.saastr.com/openai-vs-anthropic-ramp-data-shows-36-vs-12-penetration-but-velocity-curves-tell-a-different-story/), Feb-Mar 2026)

### Frontier: Still Zero Independent Evidence at 7 Weeks (Level 0)
State Farm "exploring" (future tense). Uber use case is customer service chatbot. Intuit hedging across OpenAI + Anthropic. Consulting alliances (Accenture, BCG, Capgemini, McKinsey) confirm product requires hand-holding. AWS becomes exclusive third-party cloud distributor (part of $110B round). No GA timeline. No pricing. (source: runs/2026-03-21-cycle17.md)

### EEA Connector Restriction — Nordic Blocker (Level 2)
Connectors explicitly excluded from EEA/Switzerland/UK for Plus and Pro users. Only Team/Enterprise/Edu get access. Individual Nordic business users cannot use write actions or any connectors. No resolution timeline found. ([OpenAI on X.com](https://x.com/OpenAI/status/1937681383448539167), Mar 2026)

### GPT-5.4 Computer Use: First Production Evidence (Level 2)
Two companies report production computer use on legacy systems: (1) Mainstay — 95% first-attempt success on ~30K property tax portals, 3x faster. (2) Pace (Sequoia-backed) — insurance portals, production deal with Prudential Financial, 50-75% cost savings vs BPOs. Both are OpenAI launch partners (curated evidence). ([OpenAI blog](https://openai.com/index/introducing-gpt-5-4/); [Jamie Cuffe on X.com](https://x.com/jamiecuffe/status/2029628903732482163); [BusinessWire/Prudential](https://www.businesswire.com/news/home/20251203008504/en/Pace-selected-by-Prudential-Financial-to-help-automate-its-insurance-operations-with-agentic-AI), Mar 2026)

### Computer Use Consumer Reliability: Convergence on "Impressive But Unreliable" (Level 3)
Multiple independent reviewers: Timothy B. Lee ("nowhere close to reliable enough"), NN/g (11 min vs 2 min manual for restaurant booking), Cybernews (5-30 min for complex tasks). Common: auth blocking, safety over-filtering, captcha barriers. Altman called it "experimental." ([Understanding AI](https://www.understandingai.org/p/chatgpt-agent-a-big-improvement-but); [NN/g](https://www.nngroup.com/articles/impressions-chatgpt-agent/); [Cybernews](https://cybernews.com/ai-tools/chatgpt-agent-review/), Feb-Mar 2026)

### GPT-5.4 vs Claude Opus 4.6: Benchmark Split Confirmed (Level 2-3)
GPT-5.4: 75% OSWorld (above 72.4% human avg), leads computer use + knowledge work, ~40% cheaper per output token. Claude Opus 4.6: 72.7% OSWorld, leads coding (SWE-Bench 80.8% vs 77.2%) + multi-agent orchestration. ([DataCamp](https://www.datacamp.com/blog/gpt-5-4-vs-claude-opus-4-6); [Artificial Analysis](https://artificialanalysis.ai/models/comparisons/gpt-5-4-vs-claude-opus-4-6), Mar 2026)

## Next Cycle Questions

- [x] Frontier: what are Uber / State Farm / Intuit actually running? **Answer: Named in launch announcement. Zero independent evidence. State Farm "exploring." Uber = customer service chatbot. Intuit hedging across OpenAI + Anthropic.**
- [x] Codex Skills: has anyone built a non-coding business skill? **Answer: No. Even OpenAI ecosystem acknowledges it's not built for non-developers.**
- [x] AgentKit: any practitioner reviews now that it's launched? **Answer: Mixed reviews exist. Developer-only. No business user deployments.**
- [x] Open Responses: gaining traction or stalling? **Answer: Stalled. No new adopters since Jan 2026. Anthropic/Google absent. Overshadowed by AAIF (Agentic AI Foundation) under Linux Foundation. Critic: "solves the wrong problem."**
- [x] Are Nordic enterprises (beyond Klarna) deploying ChatGPT Enterprise? **Answer: No. Equinor reports $130M AI savings but "agents" claim is vendor-sourced/unclear. TietoEVRY showcasing at Microsoft AI Tour but limited detail. EEA connector restriction remains structural blocker.**
- [x] Responses API `background: true` — anyone using async agent execution for business workflows? **Answer: Feature production-ready but zero enterprise deployment stories. One tutorial-level practitioner report. JS SDK still catching up (GitHub issue #651). Incompatible with Zero Data Retention.**
- [x] Write-action connectors — is anyone using Jira write/Google Sheets creation via ChatGPT in production? **Answer: Features shipped. Zero adoption evidence. EEA users partially unblocked (inconsistent rollout).**
- [x] Recurring task scheduling — any business user reports? **Answer: Feature exists (10 task limit). Called "half-baked." Zero reports of business use.**
- [x] Market share erosion — what's gaining ground? **Answer: ACCELERATING. Ramp March 2026: Anthropic wins 70%+ of new buyers (up from 50/50 ten weeks ago). OpenAI saw largest single-month decline. 24.4% of Ramp businesses pay for Anthropic.**
- [x] Frontier practitioner reports — re-check in 4 weeks **Answer: 7+ weeks post-launch, STILL zero. No new customers. No GA date.**
- [x] GPT-5.4 computer use: anyone using it for legacy system integration? **Answer: Mainstay (property tax portals) and Pace (insurance portals/Prudential) — both OpenAI launch partners. Consumer reliability convergence: "impressive but unreliable."**
- [x] EEA connector restriction — when does this get resolved? **Answer: Partial, inconsistent rollout underway (Gmail, Calendar, Drive, GitHub). Feature-flag based — some users get access, others in same cities don't. No full parity date. Reportedly accelerated by Anthropic's unrestricted European MCP access.**
- [x] OpenAI consumer super-app pivot — does this accelerate enterprise gap? **Answer: Desktop super-app merge announced (ChatGPT + Codex + browser, March 16 internal). Consumer integrations (DoorDash, Uber, Expedia) US/Canada only. IPO Q4 2026. Strategy fragmenting across consumer/enterprise/IPO. OpenAI COO warned about "side quests."**
- [x] TinyFish hybrid architecture (81% Mind2Web vs Operator 43%) — is this the pattern for production computer use? **Answer: YES — converging pattern. TinyFish now 90% Mind2Web. Stagehand v3 confirms same pattern (deterministic + AI hybrid, 44% faster). Skyvern at 85.8% WebVoyager. TinyFish selected for Windows 365 for Agents testing.**
- [ ] Independent Frontier deployment reports — re-check after GA announcement (cycle 29: STILL zero at 7+ weeks. No new customers since Feb 5 launch.)
- [x] Computer use: independent enterprise evidence beyond Mainstay/Pace (non-launch-partners) **Answer (cycle 29): Bridgers Agency ran 7-day field test — "excellent for agentic use cases" but "sometimes marks tasks as complete when they are not." Not production deployment. GPT-5.4 only 16 days old.** ([Bridgers Agency](https://bridgers.agency/en/blog/gpt-54-enterprise-review), Mar 2026)
- [ ] Ramp data trend — re-check in 4 weeks to see if enterprise spending shift accelerates or stabilizes (cycle 23: Axios/EpochAI project revenue crossover Aug 2026)
- [x] Desktop super-app merge — does this improve or fragment enterprise experience? **Answer (cycle 29): Confirmed strategic retreat. Simo: "spreading efforts across too many apps." Codex gets non-coding features first, then ChatGPT/Atlas merge in. No timeline. Driven by Anthropic competitive pressure.** ([CNBC](https://www.cnbc.com/2026/03/19/openai-desktop-super-app-chatgpt-browser-codex.html), Mar 2026)
- [x] Klarna APP (Agentic Product Protocol) — does agent-discoverable commerce gain adoption beyond Klarna? **Answer (cycle 29): No. Zero named retailer adoption. Protocol space fragmenting: Stripe+OpenAI, Google UCP, Visa+Cloudflare, Worldpay all have competing protocols. Klarna hedging by joining Google UCP.** ([PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/klarna-joins-google-universal-commerce-protocol-advance-agentic-ai); [American Banker](https://www.americanbanker.com/payments/news/inside-klarnas-agentic-product-protocol), Mar 2026)
- [ ] Agent identity standards — does Grantex IETF draft gain traction? Does OpenAI address the 93% unscoped API key problem? (cycle 29: no OpenAI response found)
- [ ] EEA rollout completion — when does full parity arrive for Nordic users? (cycle 29: deep research connectors still blocked in EEA for Plus/Pro. No date announced.)
- [ ] PE joint venture — does it close? (cycle 29: still in "advanced talks" as of March 16. Not signed. No portfolio company deployments.)
- [ ] Microsoft lawsuit — does it actually get filed? (cycle 29: active threat, no filing. Negotiations ongoing.)
- [x] Codex business features — does the super-app merge actually deliver non-coding agent capabilities? **Answer (cycle 29): Not yet. OpenAI exec told Fortune "very little specific to coding" in Codex architecture — but nothing shipped. Still requires terminal commands. Aspirational, not delivered.** ([Fortune](https://fortune.com/2026/03/04/openai-codex-growth-enterprise-ai-agents/), Mar 2026)
- [ ] Five-front strategy fragmentation — which initiative gets deprioritized? Watch for IPO-driven narrowing.
- [ ] AAIF MCP Dev Summit (April 2-3, NYC) — does this produce governance/enterprise MCP specs? Does it change platform dynamics?
- [ ] Agentic commerce protocol consolidation — do Klarna APP / Stripe / Google UCP / Visa converge or fragment further?
- [ ] GPT-5.4 computer use: independent production deployment (beyond launch partners and field tests)

## Cycle 20 Findings (2026-03-21)

### Enterprise Market Share Decline Accelerating — Ramp Data (Level 2-3)
Ramp AI Index (March 2026): Anthropic wins ~70% of new enterprise buyers (up from 50/50 ten weeks ago). 24.4% of Ramp businesses now pay for Anthropic. OpenAI largest single-month spending decline tracked. Ramp economist: choosing Anthropic becoming "cultural" moat. OpenAI COO warned about "side quests." ([Ramp](https://ramp.com/velocity/ai-index-march-2026); [Axios](https://www.axios.com/2026/03/18/ai-enterprise-revenue-anthropic-openai); [SaaStr](https://www.saastr.com/openai-vs-anthropic-ramp-data-shows-36-vs-12-penetration-but-velocity-curves-tell-a-different-story/), Mar 2026)

### Desktop Super-App Merge (Level 1-2)
Internal all-hands (March 16): CEO of Applications Fidji Simo merging ChatGPT + Codex + browser into single desktop app. Reverses 2025 fragmented product strategy. Consumer integrations (DoorDash, Uber Eats, Instacart, Expedia, Target) US/Canada only. IPO Q4 2026. ([PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2026/openai-reworks-product-strategy-around-new-desktop-super-app/); [Unite.AI](https://www.unite.ai/openai-plans-to-merge-chatgpt-codex-and-atlas-into-a-single-desktop-superapp/), Mar 2026)

### EEA Connectors — Partial Inconsistent Rollout (Level 2)
Gmail, Calendar, Drive, GitHub connectors appearing for some EEA users. ChatGPT Agent rolled out to EEA Pro users. But feature-flag rollout is inconsistent — same city, different access. Reportedly accelerated by Anthropic's unrestricted European MCP release. No full parity date. ([DataStudios](https://www.datastudios.org/post/chatgpt-agent-appears-in-europe-despite-no-formal-announcement); [4sysops](https://4sysops.com/archives/chatgpt-gmail-connector-openais-next-flop/); [OpenAI on X.com](https://x.com/OpenAI/status/1947882931294507263), Mar 2026)

### Hybrid Computer-Use Architecture — Convergence Confirmed (Level 2-3)
TinyFish now 90% Mind2Web (up from 81%). Stagehand v3 (Browserbase) confirms same pattern: Playwright for 80% predictable steps + AI for 20% dynamic = 44% faster. Skyvern at 85.8% WebVoyager. TinyFish selected for Windows 365 for Agents testing. Pattern converging: accessibility tree + deterministic scripts + AI fallback. ([TinyFish](https://www.tinyfish.ai/blog/mind2web); [nxcode Stagehand analysis](https://www.nxcode.io/resources/news/stagehand-vs-browser-use-vs-playwright-ai-browser-automation-2026); [Browserless](https://www.browserless.io/blog/state-of-ai-browser-automation-2026), Mar 2026)

### Open Responses Spec Stalled (Level 1-2)
No new adopters since Jan 2026. AAIF (Agentic AI Foundation) under Linux Foundation superseding as interoperability play. Anthropic/Google not joining Open Responses. Critic: "solves the wrong problem." ([Michael Livs](https://michaellivs.com/blog/open-responses-missing-spec); [InfoQ](https://www.infoq.com/news/2026/02/openai-open-responses/), Feb-Mar 2026)

### Nordic: Klarna APP + Scattered Signals (Level 1-2)
Klarna launched Agentic Product Protocol (APP) — open standard for agent-discoverable commerce, 100M+ products. Equinor reports $130M AI savings but "agent" claims vendor-sourced. TietoEVRY showcasing at Microsoft AI Tour. No Nordic company reporting truly agentic ChatGPT deployment. ([FinTech Magazine](https://fintechmagazine.com/news/what-is-klarnas-agent-protocol-doing-for-agentic-commerce), Mar 2026)

## Cycle 23 Findings (2026-03-21)

### Enterprise Revenue Shift — Axios/EpochAI Confirm Structural Reversal (Level 2-3)
Axios (March 18): Anthropic commands 40% of enterprise LLM spending vs OpenAI's 27%. OpenAI still leads total revenue ($25B vs $19B ARR) but 85% is consumer subs (losing money). EpochAI projects total revenue crossover August 2026. WSJ reports OpenAI considering pivot from consumer bets to enterprise focus. ([Axios](https://www.axios.com/2026/03/18/ai-enterprise-revenue-anthropic-openai); [EpochAI](https://epoch.ai/data/ai_companies_revenue_reports.csv), Mar 2026)

### PE Joint Venture — $10B Enterprise Distribution Subsidiary (Level 2)
OpenAI in advanced talks with TPG, Advent International, Bain Capital, Brookfield for majority-owned subsidiary ($10B pre-money). PE firms invest $4B for equity + board seats. Forward Deployed Engineers (FDEs) embed inside client companies at $10M minimum per engagement. Already active in banks, telecoms, auto across three continents. Anthropic running parallel process with Blackstone, H&F, Permira (JV structure). Strategic admission: Frontier cannot sell itself — needs PE distribution and $10M implementation engagements. ([Reuters](https://money.usnews.com/investing/news/articles/2026-03-16/exclusive-openai-courts-private-equity-to-join-enterprise-ai-venture-sources-say); [Axios](https://www.axios.com/2026/03/17/private-equity-openai-anthropic), Mar 2026)

### Frontier: Still Zero Independent Evidence (Level 0)
Extensive search for independent deployment results from all named customers (Uber, State Farm, Intuit, Thermo Fisher, HP, Oracle, BBVA, Cisco, T-Mobile). Zero found. All metrics trace to OpenAI launch announcement. State Farm uses future tense. Intuit simultaneously building with Anthropic. No GA timeline. No pricing. Consulting alliances (Accenture, BCG, Capgemini, McKinsey) confirm product requires hand-holding. ([Multiple sources — see runs/2026-03-21-cycle23.md])

### AWS Deal — Multi-Cloud Architecture + Microsoft Legal Risk (Level 2)
$50B Amazon investment. Stateful/stateless architectural split: Azure keeps stateless API exclusivity, AWS gets stateful runtime (agents with memory/context). Frontier sold via Amazon Bedrock. Microsoft weighing lawsuit — dispute over whether stateful runtime falls outside Azure exclusivity clause. Government expansion: GovCloud + classified regions. ([InfoQ](https://www.infoq.com/news/2026/03/openai-aws-frontier-stateful/); [CNBC](https://www.cnbc.com/2026/03/19/openai-desktop-super-app-chatgpt-browser-codex.html), Mar 2026)

### Desktop Super-App — Five Simultaneous Strategic Initiatives (Level 2)
Fidji Simo (March 16 all-hands): merging ChatGPT + Codex + Atlas into single desktop app. Internal memo: "spreading our efforts across too many apps." Plan: Codex gets business features first, then ChatGPT/Atlas integrate. OpenAI now running five major initiatives simultaneously (super-app, Frontier, PE JV, AWS deal, IPO). Analyst: "risks diluting the very clarity that made ChatGPT dominant." ([CNBC](https://www.cnbc.com/2026/03/19/openai-desktop-super-app-chatgpt-browser-codex.html); [The Decoder](https://the-decoder.com/openai-plans-to-merge-chatgpt-codex-and-atlas-browser-into-a-single-desktop-superapp/), Mar 2026)

### EEA/Nordic — Still Inconsistent, Deep Research Still Blocked (Level 2)
Gmail, Calendar, Drive, GitHub connectors appearing for some EEA users. ChatGPT Agent for Pro users. Feature-flag rollout: same city, different access. Agent-powered deep research connectors explicitly "not currently available" in EEA. Nordic data center capacity slower than anticipated (Swedish municipal moratoriums, lower fiber density). OpenAI planned Stargate facility in northern Norway (hydro-powered). ([DataStudios](https://www.datastudios.org/post/chatgpt-agent-appears-in-europe-despite-no-formal-announcement); [4sysops](https://4sysops.com/archives/chatgpt-gmail-connector-openais-next-flop/), Mar 2026)

### Codex: 2M WAU, Still Developer-Only, Business Vision Aspirational (Level 1-2)
2M+ weekly active users. OpenAI positioning as "broader enterprise agent platform" for "tasks beyond software development." Independent: "built by engineers, for engineers... not the right tool for other parts of a business." Astral acquisition deepens developer focus. No non-coding Skills reported. ([eesel.ai](https://www.eesel.ai/blog/openai-codex); [Fortune](https://fortune.com/2026/02/02/openai-launches-codex-app-to-bring-coding-models-to-more-users-openclaw-ai-agents/), Mar 2026)

## Cycle 26 Findings (2026-03-21)

### Promptfoo Acquisition — Filling Security/Eval Gap via M&A (Level 0)
OpenAI acquiring Promptfoo (AI security/eval startup). 350K+ developers, 130K MAU, 25%+ Fortune 500. ~$86M valuation. Integrates into Frontier for red-teaming, prompt injection detection, compliance monitoring. Open-source preserved. Shows OpenAI filling enterprise capability gaps via acquisition, not building. ([TechCrunch](https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/); [SecurityWeek](https://www.securityweek.com/openai-to-acquire-ai-security-startup-promptfoo/), Mar 2026)

### OpenAI Agents SDK — Named Business Deployments (Level 2)
Named business (non-coding) deployments using Agents SDK: Klarna (support, 2/3 tickets), Clay (sales, 10x growth), Box (enterprise search). Assistants API deprecation planned mid-2026; Responses API + Agents SDK become primary path. ([OpenAI](https://openai.com/index/new-tools-for-building-agents/), Mar 2026)

### Claude Code Revenue Signal — $2.5B ARR (Level 2)
Claude Code alone at $2.5B ARR, doubled since start of 2026. Anthropic captures 73% of NEW enterprise AI spending (first-time buyers). Revenue crossover with OpenAI projected August 2026. ([Axios](https://www.axios.com/2026/03/18/ai-enterprise-revenue-anthropic-openai); [EpochAI](https://epoch.ai/data-insights/anthropic-openai-revenue), Mar 2026)

### Frontier: Still Zero Independent Evidence at 7+ Weeks (Level 0)
Re-confirmed in cycle 26 search. No change from cycle 23. No named customer has independently published outcomes. All metrics trace to OpenAI launch announcement. PE JV ($10B with TPG/Advent/Bain/Brookfield) still in talks, not signed.

## Cycle 29 Findings (2026-03-21)

### AAIF Rapid Growth — Standards Layer Consolidating Faster Than Platforms (Level 2)
AAIF grew to 146+ member organizations (97 added in a single batch). Platinum: Google, Microsoft, AWS, Cloudflare, Bloomberg. Gold: Docker, IBM, Cisco, Salesforce, SAP, Shopify, Snowflake, Oracle. Three founding projects: MCP (97M+ monthly SDK downloads), goose (Block), AGENTS.md (60K+ projects). MCP Dev Summit: April 2-3, NYC. **Two-protocol standard consolidating: MCP (agent-to-tool, vertical) + A2A (agent-to-agent, horizontal).** Open Responses is a sideshow. ([Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation); [CIO Dive](https://www.ciodive.com/news/big-tech-develop-open-standards-agentic-ai/807608/); [IntuitionLabs](https://intuitionlabs.ai/articles/agentic-ai-foundation-open-standards), Feb-Mar 2026)

### Agentic Commerce Protocol Fragmentation (Level 1-2)
Klarna APP has zero named retailer adoption beyond Klarna's own merchant network. Competing protocols proliferating: Stripe+OpenAI (Agentic Commerce Protocol), Google (Universal Commerce Protocol — Klarna joined), Visa+Cloudflare (Trusted Agent Protocol), Worldpay (MCP for merchants). Klarna hedging across multiple protocols. American Banker: "Large retailers may want to keep their customers in-house." ([PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/klarna-joins-google-universal-commerce-protocol-advance-agentic-ai); [American Banker](https://www.americanbanker.com/payments/news/inside-klarnas-agentic-product-protocol), Mar 2026)

### GPT-5.4 Computer Use — First Independent Field Test, Not Production (Level 2)
Bridgers Agency ran 7-day test across three projects (law firm docs, B2B sales, investment analysis). Finding: "excellent for agentic use cases" but **"sometimes marks tasks as complete when they are not"** — requires verification layer. ARC-AGI-2 reasoning: 52.9% vs Opus 4.6's 68.8%. No independent non-launch-partner production deployment. Model only 16 days old. ([Bridgers Agency](https://bridgers.agency/en/blog/gpt-54-enterprise-review); [Awesome Agents](https://awesomeagents.ai/reviews/review-gpt-5-4/), Mar 2026)

### Codex Business Expansion — Aspirational Only (Level 1)
OpenAI exec told Fortune: "very little specific to coding" in Codex architecture. Plan to expand to non-technical workers via sandboxing. **But nothing shipped.** Still requires terminal commands. Super-app merge (announced March 19) = Codex becomes the surviving platform, ChatGPT/Atlas merge into it. No timeline. Driven by Anthropic competitive pressure. ([Fortune](https://fortune.com/2026/03/04/openai-codex-growth-enterprise-ai-agents/); [CNBC](https://www.cnbc.com/2026/03/19/openai-desktop-super-app-chatgpt-browser-codex.html), Mar 2026)

### Frontier: Zero Evidence Confirmed for Ninth Consecutive Check (Level 0)
Re-confirmed across three parallel research agents. No independent practitioner reports from any named customer. No GA date. No pricing. No new customers since Feb 5. Forward Deployed Engineers required. The 7+ weeks of silence is itself the finding. (source: runs/2026-03-21-cycle29.md)

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run00.md` — Developer-focused initial research
- `runs/2026-03-21-biz01.md` — Business agent research
- `runs/2026-03-21-codex-trajectory.md` — Platform trajectory deep dive
- `runs/2026-03-21-cycle08.md` — Connector evolution, enterprise controls, GPT-5.4
- `runs/2026-03-21-cycle15.md` — Frontier deployments unverified, AgentKit reviews, GPT-5.4 computer use, write-actions shipped
- `runs/2026-03-21-cycle17.md` — Market share reversal, Frontier still vapor, EEA blocker, computer use first evidence, reliability convergence
- `runs/2026-03-21-cycle20.md` — Enterprise decline accelerating (Ramp data), super-app merge, EEA partial rollout, hybrid computer-use convergence, Open Responses stalled
- `runs/2026-03-21-cycle23.md` — PE joint venture, Axios revenue reversal, Frontier still zero evidence, AWS multi-cloud + Microsoft lawsuit risk, five-front strategy fragmentation
- `runs/2026-03-21-cycle26.md` — Promptfoo acquisition, Agents SDK business deployments, cross-platform scan (Agentforce expansion, NVIDIA OpenShell, Anthropic Dispatch, Alibaba Wukong)
- `runs/2026-03-21-cycle29.md` — AAIF growth (146+ members), agentic commerce fragmentation, GPT-5.4 first field test (Bridgers), Codex business aspirational, Frontier still zero, super-app strategic retreat
