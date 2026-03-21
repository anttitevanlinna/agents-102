# Microsoft 365 / Azure AI Foundry — Platform State

Last updated: 2026-03-21
OODA cycles: 1

## Focus

Microsoft's agent ecosystem as it serves **business users** — not developers. The question: what can a sales rep, HR manager, finance analyst, or compliance officer actually do with agents today in the M365 world?

## Business Agent Surface

### Copilot Studio (Low-code agent builder for M365)
- Visual builder for agents that work in Teams, SharePoint, Outlook
- 1,400+ connectors to enterprise systems
- **This is where business agents live** — not Azure Foundry

### Microsoft Copilot (personal assistant layer)
- Embedded in M365 apps — summarize, draft, analyze
- Copilot Cowork (Research Preview, March 2026) — Claude-powered, multi-step tasks across M365 apps
- **Personal agent** tier — works for one user, in their apps

### Azure AI Foundry Agent Service (GA March 2026)
- Enterprise infrastructure — durable orchestration, human-in-the-loop, multi-model
- Private networking, Entra Agent ID
- **Company-wide agent** tier — but requires developer involvement

## Personal → Team → Company Progression

| Level | Microsoft product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Copilot in M365 | Shipping | No practitioner evidence of agentic use (vs. chatbot use) |
| Team | Copilot Studio agents | Shipping | No practitioner evidence of team agents in production |
| Company | Azure Foundry Agent Service | GA March 2026 | Practitioners report hidden prompts, unreliable grounding |
| Promotion path | ? | Unknown | No evidence this exists as a designed workflow |

## What We Know (from developer-focused research)

- Broadest surface area but practitioners confused about which product to use
- Hidden system prompts, unreliable knowledge grounding, random tool failures
- 80% Fortune 500 on Azure (broad) — not evidence of agent adoption
- Foundry Agent Service free through April 2026
- No named enterprise deploying agents for a specific business process

## What We Need To Learn (business user focus)

- [ ] What can a business user actually build in Copilot Studio without developers?
- [ ] Are there real Copilot Studio agents running business processes? (Not demos)
- [ ] What does the personal→team promotion look like? Can a Copilot personal workflow become a Copilot Studio team agent?
- [ ] What are business users (not developers) saying about M365 Copilot for agentic work?
- [ ] Copilot Cowork — is this the personal agent play? What can it actually do?
- [ ] Pricing for business users — what does agent capability cost per seat?

## Sources

See `runs/` for detailed research logs.
