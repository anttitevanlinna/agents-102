# Google Workspace / Gemini Enterprise — Platform State

Last updated: 2026-03-21 (cycle 25)
OODA cycles: 7

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

## Pricing Landscape (March 2026)

- **Gemini in Workspace:** Bundled into Workspace plans (no longer pick-and-choose). AI Expanded Access add-on required from March 1, 2026 for higher usage.
- **Workspace Studio:** Included in Business Standard/Plus and Enterprise plans.
- **NotebookLM Plus:** Part of Workspace. Enterprise tier via Cloud.
- **Gemini Enterprise (Cloud):** ~$30/user/mo separately.
- **AppSheet AI Tasks:** Enterprise Plus licensing required.
- **The trap:** Google eliminated targeted AI seat purchasing. Orgs pay for all employees. CTO question: "Am I paying for everyone when only 20% use it?"

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

1. **Cloud Next '26 (April 22-24).** Agent-focused event. Watch for: Studio improvements, customer wins with metrics, governance for Studio, capacity fix timeline.
2. **Post-promotional limits (April 1+).** Promotional higher limits expire March 31. Will capacity degrade? Will pricing change?
3. **Workspace Studio practitioner reports (late April).** In 4-6 weeks post-GA, first real user reports should appear. Track forums, blogs, Reddit.
4. **Papa Johns / retail CX results.** Any independent report on the food ordering agent?
5. **Gemini Enterprise Cloud deployments.** Still zero independent evidence after 5 cycles. Deloitte (300+ agents built), Nokia, Decathlon, CGI to track.
6. **Governance gap.** Vertex AI gets governance; Studio gets nothing. Any roadmap?
7. **Nordic:** Svenska Spel (only enterprise signal, zero details). Norwegian DPIA spillover from education to enterprise?
8. **Google Chat as agent delivery surface.** Still zero findings after 5 cycles.

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run02.md` — Developer-focused ecosystem research
- `runs/2026-03-21-biz01.md` — Business user agent capabilities research
- `runs/2026-03-21-cycle13.md` — GA launch reality check: capacity issues, architectural limits, governance gaps
- `runs/2026-03-21-cycle19.md` — Post-GA reality check: capacity still broken, Gemini Enterprise dev bugs, CGI channel play, evidence absence confirmed
- `runs/2026-03-21-cycle22.md` — Post-GA update (expanded): capacity officially acknowledged (21K outage reports), hard limits documented, Kärcher still only customer after 3 months, Gemini CX retail names, governance gap deepens (Vertex gets tools, Studio gets nothing), Nordic education moves but enterprise zero, Cloud Next '26 watch
- `runs/2026-03-21-landscape-update.md` — Cross-platform landscape: Bedrock AgentCore 5 features, LangChain+NVIDIA, OpenAI Frontier, Claude SDK updates, A2A v0.3
- `../cross-platform/runs/2026-03-21-cycle24.md` — Capacity issues persist post-GA (forum reports, StatusGator 63 outage reports), promotional limits expire March 31, AI Expanded Access add-on required
