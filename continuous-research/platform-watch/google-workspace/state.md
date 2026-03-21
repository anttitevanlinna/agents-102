# Google Workspace / Gemini Enterprise — Platform State

Last updated: 2026-03-21
OODA cycles: 3

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
- **Verdict: the most interesting new development. Real but brand new, limited, unproven at scale.**

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

### GA launch reality (from cycle 3)
- Workspace Studio GA plagued by capacity issues — "at capacity" errors, quota exceeded on paid plans, 63 outages in 24hrs around launch ([Google Dev Forum](https://discuss.ai.google.dev/t/constant-capacity-issue-in-gemini-workspace-studio-we-are-at-capacity-well-be-back-soon/111858), Mar 2026)
- Architectural limitations prevent enterprise use: no webhook triggers, no state persistence, no observability/decision traces ([dev.to analysis](https://dev.to/alifar/google-workspace-studio-technical-overview-a63), Mar 2026)
- Agent sprawl/shadow AI risk: tool ON by default, no lifecycle management for orphaned agents. Forrester: "beyond skill level of most employees" ([UC Today](https://www.uctoday.com/productivity-automation/is-google-workspace-studios-rollout-already-ahead-of-your-governance-policy/), Mar 2026)
- Microsoft Copilot Studio ahead on enterprise: model-agnostic, OpenAPI plugins, deeper governance. Google wins simplicity/price ([SourceForge comparison](https://sourceforge.net/software/compare/Google-Workspace-Studio-vs-Microsoft-Copilot-Studio/), [Revolgy](https://www.revolgy.com/insights/blog/google-workspace-vs-microsoft-365-2026-strategic-playbook-for-enterprises), Mar 2026)
- All enterprise deployment claims remain vendor-sourced only — circular evidence ecosystem ([Google Cloud ROI report](https://cloud.google.com/transform/roi-of-ai-how-agents-help-business))

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

1. **Workspace Studio practitioner reports.** GA is 2 days old. In 4-6 weeks, first real user reports should appear. Track forums, blogs, Reddit.
2. **Capacity/reliability stabilization.** Are the GA launch issues resolved? Check forums for improvement signals.
3. **Gemini Enterprise Cloud deployments.** Still zero independent evidence. Deloitte, Decathlon, Nokia named as testers — watch for results.
4. **Governance gap solutions.** Agent lifecycle management when employees leave. Watch for Google or partner guidance.
5. **Head-to-head with M365 Copilot Studio.** Initial comparison done (cycle 3) — Microsoft leads on enterprise depth. Track if Google closes gap.

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run02.md` — Developer-focused ecosystem research
- `runs/2026-03-21-biz01.md` — Business user agent capabilities research
- `runs/2026-03-21-cycle13.md` — GA launch reality check: capacity issues, architectural limits, governance gaps
