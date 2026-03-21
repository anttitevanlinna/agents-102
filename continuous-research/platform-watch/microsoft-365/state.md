# Microsoft 365 / Azure AI Foundry — Platform State

Last updated: 2026-03-21
OODA cycles: 2

## Focus

Microsoft's agent ecosystem as it serves **business users** — not developers. The question: what can a sales rep, HR manager, finance analyst, or compliance officer actually do with agents today in the M365 world?

## Business Agent Surface

### Copilot Studio (Low-code agent builder for M365)
- Visual builder for agents that work in Teams, SharePoint, Outlook
- 1,400+ connectors to enterprise systems
- **This is where business agents live** — not Azure Foundry
- **Two tiers:** "Lite" (built inside M365 Copilot, business-user accessible, limited to Q&A bots grounded in M365 data) and "Full" (requires developer/power-user skills for connectors, Power Automate, APIs)
- One-click upgrade from Lite to Full, but the **skill gap is not one-click** — business users hit a ceiling fast
- Pre-built agents for HR (Employee Self-Service, Leave Management), Sales (Sales Order Agent), Finance (Reconciliation, Time & Expense) — but **embedded in Dynamics 365**, not available to general M365 customers

### Microsoft Copilot (personal assistant layer)
- Embedded in M365 apps — summarize, draft, analyze
- Copilot Cowork (Research Preview, March 2026) — Claude-powered, multi-step tasks across M365 apps
- **Personal agent** tier — works for one user, in their apps
- **Reliability problems:** crashes after 15-20 interactions, memory loss, document modification described as "practically useless" by users. Nadella reportedly called some integrations "almost unusable"

### Copilot Cowork (the personal agent play)
- Built with Anthropic's Claude, runs in Microsoft's cloud within M365 tenants
- Multi-step: assembles presentations, pulls financials, emails teams, schedules prep — from a single request
- Plan-based execution with checkpoints, human approval before changes applied
- **Status: Research Preview only.** Limited customer testing. No independent user reports exist. Broader Frontier access late March 2026.
- This is the strongest personal agent concept in M365 but is NOT shipping broadly

### Azure AI Foundry Agent Service (GA March 2026)
- Enterprise infrastructure — durable orchestration, human-in-the-loop, multi-model
- Private networking, Entra Agent ID
- **Company-wide agent** tier — but requires developer involvement

### Microsoft Agent 365 (launches May 1, 2026)
- Dedicated control plane for IT/security to observe, secure, and govern agents
- Unified view across M365 Copilot and Copilot Studio agents
- Part of E7 bundle or standalone add-on ($15/user/month)
- **Governance for agents that don't yet exist in production** — infrastructure ahead of adoption

## Personal → Team → Company Progression

| Level | Microsoft product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Copilot in M365 (lite agents) | Shipping | Business users can build Q&A bots. Reliability issues (crashes, memory loss). No agentic use evidence. |
| Personal (agentic) | Copilot Cowork | Research Preview | Claude-powered multi-step. No independent user reports. Not broadly available. |
| Team | Copilot Studio (full) | Shipping | Requires developer skills (Power Automate). One practitioner demo (edison365). No production deployment evidence. |
| Team (pre-built) | Dynamics 365 agents | Shipping | HR, Sales, Finance agents exist but only for Dynamics 365 customers. Dow mentioned in vendor marketing (no specifics). |
| Company | Azure Foundry Agent Service | GA March 2026 | Practitioners report hidden prompts, unreliable grounding. No named deployments. |
| Governance | Agent 365 | Launches May 2026 | Unified agent visibility. Part of E7 ($99/user). Not yet available. |
| Promotion path | Lite → Studio → Teams publish → Agent 365 | **Not a designed workflow** | One-click upgrade exists but no practitioner has documented end-to-end promotion. Concept in marketing, not in tooling. |

## Pricing (2026)

| SKU | Price | What you get for agents |
|-----|-------|------------------------|
| M365 Copilot add-on | $30/user/month | Copilot in apps + lite agent builder + Copilot Studio for internal agents |
| M365 Copilot Business (SMB <300) | $21/user/month ($18 promo through June 2026) | Same as above, smaller org tier |
| Copilot Studio standalone | $200/month per 25K credits (or pay-as-you-go) | Advanced agent building without M365 Copilot |
| Agent 365 | $15/user/month | Governance control plane for agents |
| E7 Frontier Worker Suite | $99/user/month | E5 + Copilot + Agent 365 + security (launches May 2026) |

**Key insight:** Per-seat pricing means costs scale with headcount, not agent value. Licensing confusion is significant enough that multiple consultancies have built businesses around explaining it.

## What We Know (cumulative from both research cycles)

### From developer-focused research (cycle 1):
- Broadest surface area but practitioners confused about which product to use
- Hidden system prompts, unreliable knowledge grounding, random tool failures
- 80% Fortune 500 on Azure (broad) — not evidence of agent adoption
- Foundry Agent Service free through April 2026
- No named enterprise deploying agents for a specific business process

### From business-user research (cycle 2):
- **Lite agent ceiling:** Business users can build Q&A bots easily. Anything requiring external data, approval workflows, or multi-step automation needs developer skills (Power Automate, connectors)
- **Zero production business agent deployments found** across two research cycles. Dow is mentioned once in vendor marketing with no specifics. No independent evidence.
- **Copilot Cowork** is the strongest personal agent concept but in Research Preview only. No user reports.
- **Pre-built agents** for HR/Sales/Finance exist but are Dynamics 365-only — not accessible to general M365 customers
- **Reliability is a trust blocker.** Crashes, memory loss, document tasks "practically useless." This prevents business users from trusting agents for real work.
- **Personal→team promotion** is not a designed workflow. The pieces exist (lite → Studio → Teams publish → governance) but nobody has documented doing it end-to-end.
- **Licensing confusion** is itself a barrier to adoption — multiple explainer articles exist because the tiers are not self-evident.
- **Agent 365 governance** (May 2026) is infrastructure ahead of adoption — governing agents that don't exist in production yet.

## The Announcement-to-Deployment Gap

This is the defining feature of Microsoft's business agent story. The gap is the largest of any vendor we've researched:

| Announced | Status | Evidence |
|-----------|--------|----------|
| Copilot Studio for citizen developers | Shipping | Lite agents limited to Q&A; full Studio needs developers |
| Copilot Cowork (personal agent) | Research Preview | Zero user reports |
| Pre-built business agents | Shipping (Dynamics 365 only) | No independent production reports |
| Agent 365 (governance) | May 2026 | Not yet available |
| E7 bundle ($99/user) | May 2026 | Not yet available |
| "80,000 enterprises" using AI | Claimed | Azure-broad, not agent-specific |

## What We Need To Learn (updated)

- [x] What can a business user actually build in Copilot Studio without developers? **Answer: Q&A bots grounded in M365 data. Ceiling hit fast for anything requiring external systems or workflows.**
- [x] Are there real Copilot Studio agents running business processes? **Answer: No. Zero found across two research cycles.**
- [x] What does the personal→team promotion look like? **Answer: Not a designed workflow. Pieces exist but no one has documented doing it.**
- [x] What are business users saying about M365 Copilot for agentic work? **Answer: Reliability complaints (crashes, memory loss). No agentic-use reports — only chatbot-use complaints.**
- [x] Copilot Cowork — is this the personal agent play? **Answer: Yes, and it's the most promising piece. But Research Preview only, no user data.**
- [x] Pricing for business users? **Answer: $30/user/month (Copilot) + potential credits. E7 at $99/user (May 2026). Per-seat not per-value.**

### New questions for cycle 3:
- [ ] Copilot Cowork: when it enters Frontier (late March), do early users report it working for real tasks?
- [ ] E7 launch (May 2026): do enterprises adopt? At what scale? What's the ROI argument?
- [ ] Are Dynamics 365 pre-built agents actually being used? Check Dynamics-specific communities.
- [ ] Power Automate as the hidden requirement: are business users learning Power Automate to build agents, or giving up?
- [ ] Nordic companies: any M365 Copilot agent adoption signals in Finnish/Nordic enterprise communities?
- [ ] How does Agent 365 governance compare to what enterprises actually need?

## Sources

See `runs/` for detailed research logs:
- `2026-03-21-run01.md` — Developer/infrastructure focus (Azure Foundry, pricing, ecosystem)
- `2026-03-21-biz01.md` — Business user focus (Copilot Studio, Cowork, pricing, reliability)
