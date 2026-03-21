# OpenAI — ChatGPT / Codex / Operator — Platform State

Last updated: 2026-03-21 (cycle 8)
OODA cycles: 3

## Focus

OpenAI's ecosystem as it serves **business users**. ChatGPT is the most widely used AI product. But is anyone using it for agentic business work — not just chat?

## Key Verdict (as of 2026-03-21)

**Highest adoption, lowest agentic maturity for business.** ChatGPT has 900M weekly users and 5M paying business seats. But usage is overwhelmingly chatbot/copilot: writing, research, analysis, Q&A. No evidence of truly agentic business workflows in production at any named enterprise. The gap between "everyone uses it" and "anyone runs business processes with it" is the defining characteristic of OpenAI's business agent position.

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
- **NEW MCP connectors:** Atlassian Rovo (Jira + Confluence + Compass, with Jira WRITE actions), Amplitude, Fireflies, Monday.com, Stripe, Hex, Egnyte, Vercel ([Release Notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes))
- **NEW: ChatGPT for Excel and Google Sheets** (beta) — spreadsheet integration ([Release Notes](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes))
- **NEW: Financial data integrations** — FactSet, MSCI, Third Bridge, Moody's for market/company data ([Release Notes](https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes))
- **NEW: Enterprise agent controls** — workspace owners can enable/disable agent mode (default OFF), assign to specific roles, block specific domains, control app availability ([Help Center](https://help.openai.com/en/articles/11752874-chatgpt-agent))
- EKM (Enterprise Key Management) disables all synced connectors
- Single-player architecture: no shared agents, no team workflows, no compounding knowledge
- **Team agent** tier — governance improving (role-based agent access, domain blocking) but agentic workflow capability still limited

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
5. **No agent identity management** — unlike Microsoft Entra, no way to give agents governed identities (Bright Ideas)
6. **No compliance audit trails** — Atlas not SOC 2 scoped, no SIEM/eDiscovery feeds (OpenAI docs)
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
Everything above is announced or in limited availability. Frontier customers are named but no deployment evidence. AgentKit has no independent reviews. Skills are code-only. The vision is the most complete of any vendor. The execution evidence is zero.

## Next Cycle Questions

- [ ] Frontier: what are Uber / State Farm / Intuit actually running? Any public evidence?
- [ ] Codex Skills: has anyone built a non-coding business skill?
- [ ] AgentKit: any practitioner reviews now that it's launched?
- [ ] Open Responses: gaining traction or stalling? Who else has joined?
- [ ] Are Nordic enterprises (beyond Klarna) deploying ChatGPT Enterprise?
- [ ] Responses API `background: true` — anyone using async agent execution for business workflows?
- [ ] **NEW:** Write-action connectors — is anyone using Jira write/Google Sheets creation via ChatGPT in production?
- [ ] **NEW:** Recurring task scheduling — any business user reports of using scheduled agent tasks?
- [ ] **NEW:** Market share erosion — what's gaining ground? Is this Claude/Gemini or vertical tools?

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run00.md` — Developer-focused initial research
- `runs/2026-03-21-biz01.md` — Business agent research
- `runs/2026-03-21-codex-trajectory.md` — Platform trajectory deep dive
- `runs/2026-03-21-cycle08.md` — Connector evolution, enterprise controls, GPT-5.4
