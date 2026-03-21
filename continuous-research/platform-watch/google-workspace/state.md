# Google Workspace / Gemini Enterprise — Platform State

Last updated: 2026-03-21
OODA cycles: 1

## Focus

Google's agent ecosystem as it serves **business users** in the Workspace world. What can a sales rep, HR manager, or operations lead do with Gemini agents today?

## Business Agent Surface

### Gemini Enterprise (formerly Agentspace, $25/user/mo)
- Enterprise search across company data + agent orchestration
- Deep Research agent, NotebookLM integration
- GA — HIPAA, FedRAMP High, VPC-SC
- On-premises via Google Distributed Cloud
- **This is the business user entry point**

### Gemini in Workspace
- Embedded in Gmail, Docs, Sheets, Meet, Chat
- Summarize, draft, analyze — same pattern as M365 Copilot
- **Personal agent** tier

### Vertex AI Agent Builder
- Agent Designer (visual, low-code, Preview), Agent Engine (production, GA)
- Developer-facing — not for business users directly
- **Company-wide agent** tier with developer involvement

## Personal → Team → Company Progression

| Level | Google product | Maturity | Evidence |
|-------|--------------|----------|----------|
| Personal | Gemini in Workspace | Shipping | Chatbot-level, not agentic |
| Team | Gemini Enterprise | GA | Zero independent deployment reports |
| Company | Vertex AI Agent Builder | GA | Developer-only, no business user path |
| Promotion path | ? | Unknown | No evidence this exists |

## What We Know (from developer-focused research)

- Gemini model stability is serious problem (503s, forced migrations, vanishing histories)
- ADK is strong open-source framework (7M downloads) — but developer tool
- Jules coding agent differentiated (async PR workflow) but unreliable
- Rate limits significantly lower than competitors
- Zero enterprise deployment case studies found

## What We Need To Learn (business user focus)

- [ ] What can a business user actually do in Gemini Enterprise? Real capabilities, not marketing.
- [ ] Are there Workspace users building agent-like workflows? (AppSheet + Gemini?)
- [ ] What's the business user experience with Gemini in Workspace — agentic or just chatbot?
- [ ] Pricing: $25/user/mo for Gemini Enterprise — what does that actually buy?
- [ ] NotebookLM as agent starting point? Practitioners using it for business analysis?
- [ ] Google Chat as agent delivery surface — any evidence?

## Sources

See `runs/` for detailed research logs.
