# Anthropic — Claude / Claude Code — Platform State

Last updated: 2026-03-21
OODA cycles: 1

## Focus

Anthropic's ecosystem for **business users**. Claude is strong for reasoning and complex work. But the product surface is developer-heavy. Where does the business user enter?

## Business Agent Surface

### Claude.ai (Pro/Team/Enterprise)
- Chat + document analysis + artifact creation
- Projects with custom instructions and knowledge
- **Personal agent** tier — strong for analysis, writing, research tasks

### Claude for Enterprise
- SSO, admin console, data retention controls
- Team workspaces
- **Team agent** tier — but limited to conversation, no workflow automation

### MCP (Model Context Protocol)
- 6,400+ tool integrations, industry standard
- Connects Claude to external systems (CRM, databases, APIs)
- **The plumbing** — but requires developer setup

### Enterprise Plug-ins (Feb 2026)
- Templates for finance, legal, HR
- Private marketplaces, controlled data flows
- **Company-wide agent** tier — vendor announcement only (Level 0)

### Copilot Cowork (via Microsoft, Research Preview)
- Claude-powered M365 agent — multi-step tasks across Outlook, Teams, SharePoint, Excel
- **This might be the real business user path** — Claude's reasoning + Microsoft's business surface

## Personal → Team → Company Progression

| Level | Anthropic product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Claude.ai Projects | Shipping | Strong for individual knowledge work — but chatbot-level, not agentic |
| Team | Claude Team/Enterprise workspaces | Shipping | Shared conversations, not shared agents |
| Company | Enterprise plug-ins, Copilot Cowork | Preview/Announced | Level 0 — no independent evidence |
| Promotion path | ? | Absent | No mechanism to promote a personal Claude workflow to a team agent |

## What We Know (from developer-focused research)

- Best reasoning quality, longest autonomous task horizon (14.5h METR)
- MCP is strategic moat — adopted by all platforms
- 3-4x token overhead vs Codex — cost concern
- Usage limits provoked user revolt (Jan 2026)
- Agent SDK production-capable but operationally difficult
- VS Code marketplace leader (5.2M installs)
- No enterprise deployment evidence

## What We Need To Learn (business user focus)

- [ ] Claude Projects — are business users building reusable analysis workflows? How?
- [ ] Claude Team/Enterprise — are teams sharing Projects as proto-agents?
- [ ] Copilot Cowork — real capabilities vs announcement. This is potentially huge for business users.
- [ ] Enterprise plug-ins — any beta user reports?
- [ ] MCP for business users — can non-developers connect Claude to their tools?
- [ ] What business processes are people using Claude for today? (Even if chatbot-level, it shows where agents could go)

## Sources

See `runs/` for detailed research logs.
