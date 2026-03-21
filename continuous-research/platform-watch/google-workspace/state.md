# Google Workspace / Gemini Enterprise — Platform State

Last updated: 2026-03-21 (cycle 28)
OODA cycles: 8

## Focus

Google's agent ecosystem as it serves **business users** in the Workspace world. What can a sales rep, HR manager, or operations lead do with Gemini agents today?

## Business Agent Surface

### Gemini in Workspace (Personal tier)
- Embedded in Gmail, Docs, Sheets, Meet, Chat
- Summarize, draft, analyze — chatbot-level, NOT agentic
- IT Pro review: 3/5 stars, "flawed but fast," Sheets "disappointingly overstated"
- Meet transcription with speaker labels works well
- Speed at expense of detail — users frequently rephrase or scrap outputs
- Microsoft Copilot rated as having better enterprise support channels
- **Verdict: copilot, not agent. Comparable to but slightly behind M365 Copilot.**

### Workspace Studio (Personal→Team tier) — NEW, GA March 2026
- No-code agent builder, GA completed March 19, 2026
- Describe workflow in natural language → Gemini builds it
- Tested: email invoice detection → Sheets logging in 30 seconds, correctly reading PDF attachments
- ~10 deep integrations (Asana, Jira, Mailchimp, Salesforce) vs Zapier's 6,000+
- Limits: 50 executions/day (standard), 500 (Enterprise), 20 steps max, 100 agents max
- 80% of tasks genuinely no-code; complex conditional logic requires "logic brain"
- Agents shareable via Drive → primitive personal→team promotion path
- Kärcher: 90% reduction in drafting time for product planning (vendor-sourced)
- Governance gap: no solution documented for when agent-building employees leave
- **Capacity issues persist post-GA:** "We are at capacity" errors continue across agents users try to build. Analysts note these are "text-based automations" — likely "flawed rollout" not compute shortage. 63 user outage reports in 24 hours on StatusGator (March 19). Promotional higher limits expire March 31 — capacity may worsen. "AI Expanded Access" add-on required for high AI usage since March 1. ([Google AI Forum](https://discuss.ai.google.dev/t/constant-capacity-issue-in-gemini-workspace-studio-we-are-at-capacity-well-be-back-soon/111858); [StatusGator](https://statusgator.com/services/google-workspace/google-workspace-studio), Mar 2026)
- **Verdict: the most interesting new development. Real but brand new, limited, unproven at scale. Capacity problems undermine enterprise trust.**

### AppSheet + Gemini (Team→Company tier)
- AI Tasks in automations: extract data from photos/PDFs, categorize, route, prioritize
- Seegrid: photographing shipping labels → auto-parse to database
- Connects to Vertex AI agents via Apps Script (shown at Google I/O 2025)
- Requires Enterprise Plus licensing
- **Verdict: closer to agentic (multi-step automated workflows) but requires technical setup and premium licensing.**

### NotebookLM Plus/Enterprise (Personal→Team tier)
- Enterprise tiers: Plus (SMBs/Workspace), Enterprise (large orgs/Cloud)
- VPC-SC compliant, audit trails, no training on customer data
- Deep Research, Reports, interactive audio overviews, infographic generation, slide decks
- Business use: competitive intelligence synthesis, onboarding knowledge bases, strategic communication
- **Verdict: powerful research copilot, NOT agentic. Human-driven, not autonomous.**

### Gemini Enterprise (formerly Agentspace) (Company tier, $30/user/mo)
- Enterprise search across Confluence, Jira, SharePoint, ServiceNow, Workspace
- Agent Designer (no-code visual builder, GA)
- Deep Research agent, NotebookLM integration
- GA — HIPAA, FedRAMP High, VPC-SC
- On-premises via Google Distributed Cloud
- Mobile app launched Feb 2026
- Google claims "20 million tasks" from Alpha customers — unverifiable
- InfoTech reviews: easy to start, features feel immature, "still in an early phase"
- **Verdict: on paper the most powerful. In practice: zero independent deployment evidence.**

### Vertex AI Agent Builder (Developer tier)
- Agent Designer (visual, low-code, Preview), Agent Engine (production, GA)
- Developer-facing — not for business users directly
- **Company-wide agent** tier with developer involvement

## Personal → Team → Company Progression

| Level | Google product | Maturity | Evidence |
|-------|--------------|----------|----------|
| Personal | Gemini in Workspace | Shipping | Chatbot-level, 3/5 stars, not agentic |
| Personal | Workspace Studio | GA (March 2026) | One practitioner test, one vendor customer case (Kärcher) |
| Personal | NotebookLM Plus | Shipping | Research copilot, not agentic. Multiple reviews. |
| Team | Workspace Studio (shared) | GA | Sharing mechanism exists. Zero evidence of team adoption. |
| Team | AppSheet + Gemini | GA | One customer quote (Seegrid). Requires Enterprise Plus. |
| Company | Gemini Enterprise (Cloud) | GA | Zero independent deployment reports. Reviews say "immature." |
| Company | Vertex AI Agent Builder | GA | Developer-only, no business user path |
| Promotion path | Studio → Gemini Enterprise | Theoretically possible | No one has documented doing it |

## Pricing Landscape (March 2026, updated cycle 28)

- **Gemini in Workspace:** Bundled into Workspace plans (no longer pick-and-choose). Standard access at lower limits free. Higher usage requires add-on.
- **Workspace Studio:** Included in Business Standard/Plus and Enterprise plans. **Promotional higher limits expire March 31, 2026.**
- **AI Expanded Access add-on:** 2,000 monthly Flow credits. No rollover. Price localized (not public). Available from March 1, 2026.
- **AI Ultra Access add-on:** 25,000 monthly Flow credits + Deep Think access. No rollover. Price localized.
- **NotebookLM Plus:** Part of Workspace. Enterprise tier via Cloud.
- **Gemini Enterprise (Cloud):** ~$30/user/mo separately.
- **AppSheet AI Tasks:** Enterprise Plus licensing required.
- **The trap:** Google eliminated targeted AI seat purchasing AND moved to per-execution credits for agents. Orgs pay for all employees, then pay again per agent execution. CTO question: "Am I paying per-seat for everyone AND per-execution for agents?"

## What We Know (consolidated from all cycles)

### Developer layer (from cycle 1)
- ADK is strong open-source framework (7M downloads) — developer tool, not business user
- Jules coding agent differentiated (async PR workflow) but unreliable
- Model stability problems: 503 errors, forced migrations, vanishing histories
- Rate limits significantly lower than competitors

### Business user layer (from cycles 2-3)
- Workspace Studio is the first real "business user builds agents" product — but brand new and limited
- Gemini-in-Workspace is a chatbot, not an agent. Sheets integration disappointing.
- NotebookLM is a powerful research tool but not agentic
- AppSheet + Gemini adds AI to automations but requires premium licensing and technical knowledge
- Gemini Enterprise (Cloud) is GA but has zero independent deployment evidence
- Accuracy/hallucination concerns documented for regulated domains
- Pricing restructuring forces all-or-nothing purchasing

### Post-GA update (cycle 22, Mar 21)
- **Capacity issues officially acknowledged, NOT resolved.** Google support docs now explicitly state: "currently receiving high volume of requests and access may be impacted" with rollout pace being "adjusted" (slowed). Escalated from forum complaints to official support documentation. Previously-created flows encountering runtime errors — not just new access denied. 21,228 outage reports in February 2026 (StatusGator), 63 in 24hrs around Mar 19 GA. ([Google Support](https://support.google.com/workspace-studio/answer/16782648?hl=en); [Google Dev Forum](https://discuss.ai.google.dev/t/constant-capacity-issue-in-gemini-workspace-studio-we-are-at-capacity-well-be-back-soon/111858); [StatusGator](https://statusgator.com/services/google-workspace/google-workspace-studio), Mar 2026)
- **Hard limits confirmed:** 50 executions/day (Business Standard/Plus), 500/day (Enterprise), 20-step maximum per flow, 25 active Gmail-triggered flows/user, daily run cap pauses ALL flows until reset. Webhooks in limited preview only. ([Google Support — limits](https://support.google.com/workspace-studio/answer/16765942?hl=en), Mar 2026)
- **AI Tool Analysis review confirms 80/20 split.** Independent reviewer tested agent building: 80% of tasks genuinely no-code, 20% require "logic brain" (variable mapping, flow control). Gemini 3 PDF attachment reasoning works well. ([AI Tool Analysis](https://aitoolanalysis.com/google-workspace-studio/); [dev.to](https://dev.to/alifar/google-workspace-studio-technical-overview-a63), practitioner analysis, Mar 2026)
- **Kärcher still the ONLY named Studio deployment (3 months).** 90% drafting time reduction claimed. Built with Google Cloud partner Zoi (guided, not self-service). No new named deployments since December 2025 announcement. Absence of new customers 3 months post-announcement is a significant negative signal. ([Google Workspace Blog](https://workspace.google.com/blog/product-announcements/introducing-google-workspace-studio-agents-for-everyday-work), vendor press release)
- **Gemini Enterprise CX launched (NRF Jan 2026).** Named retail adopters: Kroger, Lowe's, Papa Johns, Woolworths. Papa Johns first to deploy omnichannel food ordering agent. All vendor-sourced, no metrics. ([Google Cloud Press Corner](https://www.googlecloudpresscorner.com/2026-01-11-Google-Cloud-Brings-Shopping-and-Customer-Service-Together-with-Gemini-Enterprise-for-Customer-Experience), vendor press release, Jan 2026)
- **Deloitte scaled to 300+ agents (from 100+).** Channel/supply-side scaling for Agent Fleet, 100+ on Cloud Marketplace. Zero named Deloitte CLIENT using these agents. Nokia: "potential to revolutionize" (no deployment). Decathlon: "sees promise" (no deployment). ([Google Cloud Blog](https://cloud.google.com/blog/products/ai-machine-learning/bringing-ai-agents-to-enterprises-with-google-agentspace), vendor press release)
- **Governance gap deepens.** Vertex AI Agent Builder got enterprise governance: Cloud API Registry integration, Agent Engine sessions/memory at GA, human-in-the-loop, rewindable state. **Workspace Studio got NONE of these.** Two-tier problem: governance exists but only for developers, not business users. ([Google Cloud Blog — tool governance](https://cloud.google.com/blog/products/ai-machine-learning/new-enhanced-tool-governance-in-vertex-ai-agent-builder), Dec 2025-Mar 2026)
- **"70% of Google Cloud customers use Gemini"** conflates chatbot usage with agentic deployment. Other circulating stats (105 min/week saved, 20-50% improvements) lack named companies. All fail our evidence standards. ([Incremys](https://www.incremys.com/en/resources/blog/gemini-statistics), industry blog)
- **Promotional limits expire March 31.** Capacity may worsen after expiry.
- **Nordic: education moves, enterprise doesn't.** Norway completed national DPIA for Google Workspace Education. Iceland pilot: 300 teachers on Gemini Education + NotebookLM. Sweden: teachers using Gemini across districts. Svenska Spel appeared on Stockholm Gemini Enterprise event page (zero details). For enterprise agents: **zero Nordic deployments — fifth consecutive cycle.** ([TechBuzz.ai](https://www.techbuzz.ai/articles/google-gemini-ai-powers-30k-nordic-students-in-classroom-revolution), tech press)
- **Cloud Next '26 (April 22-24)** confirmed agent-focused. Next potential announcement window. ([Google Developers Blog](https://developers.googleblog.com/you-cant-stream-the-energy-a-developers-guide-to-google-cloud-next-26-in-vegas/), vendor blog)

### GA launch reality (from cycles 3-4)
- Workspace Studio GA plagued by capacity issues — "at capacity" errors, quota exceeded on paid plans, 63 outages in 24hrs around launch ([Google Dev Forum](https://discuss.ai.google.dev/t/constant-capacity-issue-in-gemini-workspace-studio-we-are-at-capacity-well-be-back-soon/111858), Mar 2026)
- **Capacity issues NOT resolved post-GA (cycle 4, Mar 21).** Forum thread still active, no Google acknowledgment of root cause or timeline. StatusGator confirms ongoing outage reports. ([StatusGator](https://statusgator.com/services/google-workspace/google-workspace-studio), Mar 2026)
- Architectural limitations prevent enterprise use: no webhook triggers, no state persistence, no observability/decision traces. Author warns: "Workspace Studio should never be used where strict correctness or transactional integrity is required." ([dev.to analysis](https://dev.to/alifar/google-workspace-studio-technical-overview-a63), Mar 2026)
- Agent sprawl/shadow AI risk: tool ON by default, no lifecycle management for orphaned agents. Forrester: "beyond skill level of most employees" ([UC Today](https://www.uctoday.com/productivity-automation/is-google-workspace-studios-rollout-already-ahead-of-your-governance-policy/), Mar 2026)
- CCS Insight: only 12% of orgs have fully integrated automation strategies. Predicts 25% of compliance failures linked to unsanctioned AI by 2027. ([CCS Insight](https://www.ccsinsight.com/blog/google-workspace-studio-signals-a-new-front-line-for-business-first-ai-agents/), Dec 2025)
- Microsoft Copilot Studio ahead on enterprise: model-agnostic, OpenAPI plugins, deeper governance. Google wins simplicity/price ([SourceForge comparison](https://sourceforge.net/software/compare/Google-Workspace-Studio-vs-Microsoft-Copilot-Studio/), [Revolgy](https://www.revolgy.com/insights/blog/google-workspace-vs-microsoft-365-2026-strategic-playbook-for-enterprises), Mar 2026)
- All enterprise deployment claims remain vendor-sourced only — circular evidence ecosystem ([Google Cloud ROI report](https://cloud.google.com/transform/roi-of-ai-how-agents-help-business))
- **BizTech Magazine article (Mar 2026) about Workspace Studio "transforming enterprise workflows" contains zero named customers, zero metrics, zero independent evidence** — filed as evidence of absence ([BizTech](https://biztechmagazine.com/article/2026/03/how-googles-workspace-studio-transforming-enterprise-workflows), Mar 2026)

### Cycle 28 update (Mar 21) — Credit cliff + Mattel PQA agent + ADK 2.0

- **March 31 credit cliff: promotional limits expire, credit system takes over.** Three-tier pricing: standard (free, low limits) → AI Expanded Access (2,000 monthly Flow credits) → AI Ultra Access (25,000 monthly Flow credits + Deep Think). Credits don't roll over. Public pricing not disclosed — localized per currency. This fundamentally changes agent economics from per-seat to per-execution. Business users who built agents during the promotional window may see them throttled or stop running. ([Google Workspace Updates Blog — AI Expanded Access](https://workspaceupdates.googleblog.com/2026/02/google-workspace-ai-expanded-access.html), Feb 2026)
- **Capacity issues still active post-GA.** Forum thread still growing in March 2026. New threads: "Quota exceeded" (5 replies, 177 views), "Persistent 429 Resource Exhausted Error" (0 replies), "Gemini AI studio broken" (86 views). March 5 skepticism thread: "Was Google AI Studio really able to return to normal operation?" (11 replies, 280 views). Google's only visible response remains from December 30, 2025. No resolution timeline communicated. ([Google AI Dev Forum](https://discuss.ai.google.dev/t/constant-capacity-issue-in-gemini-workspace-studio-we-are-at-capacity-well-be-back-soon/111858), Mar 2026)
- **Mattel PQA agent: first named multi-system business agent on Google Cloud.** Mattel + Insight presenting at Cloud Next '26: "Architecting for the Agent and Beyond: Inside Mattel's Product Quality World." Conversational Analytics Agent for Product Quality Analysis (PQA) integrating Google Cloud AI with Jira. Speaker: Joseph Vinhais (Chief Safety Officer, SVP Global Quality, Mattel). Background: Mattel previously reported 100x data processing improvement (month → minute), but that was analytics, not agentic. Session will be first public architecture disclosure. **Unverified until April 22-24.** ([Insight Cloud Next page](https://www.insight.com/en_US/shop/partner/google/google-cloud/google-cloud-next.html); [Google Cloud Blog — Mattel](https://cloud.google.com/transform/mattel-gen-ai-customer-feedback-real-time-product-improvements), vendor sources)
- **GEAR program: Google's enterprise agent skilling play.** Free program targeting builders, devs, LOB leaders, IT decision-makers. 35 monthly learning credits on Google Skills. Progressive pathways (intro → build → deploy). Selective "Get Certified" cohort for Google Cloud customer employees only. No named participants, no deployment evidence, no graduates. Lowest-investment skilling approach compared to Anthropic ($100M partner network) and Microsoft (massive partner ecosystem). ([Google Cloud Blog — GEAR](https://cloud.google.com/blog/products/ai-machine-learning/gear-program-now-available); [GEAR FAQ](https://developers.google.com/profile/help/gear), Mar 2026)
- **ADK 2.0 Alpha: graph workflows + TypeScript.** Graph-based deterministic routing, iterative loops, complex branching. TypeScript SDK (previously Python-only). New AgentTeam API for multi-agent coordination. Built-in eval framework. Streamlined Cloud Run deployment. Compatible with ADK 1.x (separate storage required). Alpha — not production-ready. Narrows gap with LangGraph/CrewAI. ([ADK 2.0 Docs](https://google.github.io/adk-docs/2.0/); [Moltbook-AI Roundup](https://moltbook-ai.com/posts/ai-agents-march-2026-roundup), Mar 2026)
- **Cloud Next '26 agent sessions announced.** Key sessions: "Beyond the hype: Orchestrating end-to-end developer workflows with agents" (SPTL008), "Build Production-Ready Agents on Google Cloud" (BRK2-091), "From Prototype to Production: 45 Minutes to a Reliable Vertex AI Agent" (BRK2-014), "The Gemini 3 Playbook" (BRK2-086). Plus Mattel PQA session. ([Google Developers Blog](https://developers.googleblog.com/you-cant-stream-the-energy-a-developers-guide-to-google-cloud-next-26-in-vegas/), Mar 2026)
- **Nordic enterprise agents: still zero — sixth consecutive cycle.** No new signals from Finland, Sweden, or Norway. Education continues. Enterprise agent deployments remain absent.
- **Kärcher remains the ONLY named Studio customer — fourth consecutive cycle.** No new named customers since December 2025. "20 million tasks" claimed but no named orgs.

### Gemini Enterprise developer layer (from cycle 4)
- GitHub issues show deployment friction: agent authorization errors in EU locations (FAILED_PRECONDITION), agents not appearing in Agent Gallery (SIGTERM after 2 min) ([GitHub #3534](https://github.com/google/adk-python/issues/3534), [GitHub #4453](https://github.com/google/adk-python/issues/4453), Mar 2026)
- CGI equips 90K+ consultants with Gemini Enterprise (Jan 2026) — consultancy channel play, not deployment evidence. No named customers, no metrics. Nordic-relevant because CGI has strong Nordic presence. ([CGI](https://www.cgi.com/en/cgi-help-clients-accelerate-agentic-ai-outcomes-gemini-enterprise), [ChannelE2E](https://www.channele2e.com/news/cgi-expands-global-alliance-with-google-cloud-to-help-businesses-with-gemini-ai), Jan 2026)

## What We Need To Learn (business user focus)

- [~] What can a business user actually do in Gemini Enterprise? Real capabilities, not marketing.
  → *Partially answered: Workspace Studio gives real no-code agent building for simple workflows. Gemini Enterprise Cloud remains unverified.*
- [~] Are there Workspace users building agent-like workflows? (AppSheet + Gemini?)
  → *Partially answered: Workspace Studio just GA. AppSheet AI Tasks exist but require Enterprise Plus. No evidence of widespread adoption.*
- [x] What's the business user experience with Gemini in Workspace — agentic or just chatbot?
  → *Answered: chatbot. 3/5 stars. Fast but inaccurate. Not agentic.*
- [x] Pricing: $25/user/mo for Gemini Enterprise — what does that actually buy?
  → *Answered: ~$30/user/mo for Cloud platform (enterprise search + agent builder). Workspace AI now bundled (no pick-and-choose). AI Expanded Access add-on needed from March 2026.*
- [~] NotebookLM as agent starting point? Practitioners using it for business analysis?
  → *Partially answered: yes for analysis, no as agent. It's a copilot, not autonomous.*
- [ ] Google Chat as agent delivery surface — any evidence?
  → *Still no findings.*

## Next Cycle Priorities

1. **Post-credit-cliff reality (April 1+).** Promotional limits expired March 31. Are agents throttled? Are orgs purchasing add-ons or abandoning automations? This is the #1 question.
2. **Cloud Next '26 (April 22-24).** Agent-focused event. Watch for: Mattel PQA agent architecture, Studio improvements, new customer wins with metrics, governance for Studio, capacity fix timeline.
3. **Mattel PQA session.** Is it genuinely agentic (multi-step, autonomous, cross-system) or analytics with a chat interface? First named multi-system agent on Google Cloud.
4. **Workspace Studio practitioner reports (late April).** 5+ weeks post-GA. Track forums, blogs, Reddit for real user experiences.
5. **Papa Johns / retail CX results.** Any independent report on the food ordering agent?
6. **Gemini Enterprise Cloud deployments.** Still zero independent evidence after 6 cycles. Deloitte (300+ agents built), Nokia, Decathlon, CGI to track.
7. **Governance gap.** Vertex AI gets governance; Studio gets nothing. Any Cloud Next roadmap?
8. **Nordic:** Zero enterprise agent deployments — sixth consecutive cycle. Svenska Spel (zero details). Norwegian DPIA spillover?
9. **Google Chat as agent delivery surface.** Still zero findings after 7 cycles.
10. **GEAR program adoption.** Any graduates? Any deployments?

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run02.md` — Developer-focused ecosystem research
- `runs/2026-03-21-biz01.md` — Business user agent capabilities research
- `runs/2026-03-21-cycle13.md` — GA launch reality check: capacity issues, architectural limits, governance gaps
- `runs/2026-03-21-cycle19.md` — Post-GA reality check: capacity still broken, Gemini Enterprise dev bugs, CGI channel play, evidence absence confirmed
- `runs/2026-03-21-cycle22.md` — Post-GA update (expanded): capacity officially acknowledged (21K outage reports), hard limits documented, Kärcher still only customer after 3 months, Gemini CX retail names, governance gap deepens (Vertex gets tools, Studio gets nothing), Nordic education moves but enterprise zero, Cloud Next '26 watch
- `runs/2026-03-21-cycle28.md` — Pre-Cloud-Next state: credit cliff (March 31), GEAR skilling program, Mattel PQA multi-system agent, ADK 2.0 Alpha, capacity still broken, Nordic still zero
- `runs/2026-03-21-landscape-update.md` — Cross-platform landscape: Bedrock AgentCore 5 features, LangChain+NVIDIA, OpenAI Frontier, Claude SDK updates, A2A v0.3
- `../cross-platform/runs/2026-03-21-cycle24.md` — Capacity issues persist post-GA (forum reports, StatusGator 63 outage reports), promotional limits expire March 31, AI Expanded Access add-on required
