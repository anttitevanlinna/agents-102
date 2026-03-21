# Vertical SaaS Agent Platforms — Platform State

Last updated: 2026-03-21
OODA cycles: 1

## Focus

Vertical SaaS platforms that have shipped agent capabilities for business users. These platforms have a structural advantage over horizontal platforms (Microsoft/Google/OpenAI): they already own the data, workflows, and enterprise trust relationships.

**The key question:** Are vertical SaaS platforms ahead of horizontal platforms for domain-specific agent use cases?

**Answer (March 2026):** Yes, for constrained domain-specific tasks. Customer service has convergence-level evidence (Level 3). Other domains are earlier. But the advantage is narrow — each platform is strong only in its lane.

## Platform Summary

### Salesforce Agentforce — CRM / Sales / Service
- **Scale:** 18,500+ deals, 9,500+ paid, $540M+ ARR (Q3 FY2026) ([Salesforce Q3 earnings](https://investor.salesforce.com/news/news-details/2025/Salesforce-Delivers-Record-Third-Quarter-Fiscal-2026-Results-Driven-by-Agentforce--Data-360/default.aspx), Dec 2025)
- **Named deployments:**
  - Finnair (Nordic): 80% chat resolution, 30% faster onboarding — first airline adopter ([Diginomica](https://diginomica.com/how-finnair-aims-fly-high-agentforce), [TechInformed](https://techinformed.com/agentforce-finnair-deployment/))
  - Wiley: 40%+ case resolution improvement, $213K saved ([TechInformed](https://techinformed.com/salesforce-launches-agentforce-saks-wiley-and-wyndham-spearhead-no-code-ai-for-enterprise/))
  - reMarkable (Nordic): 50% autonomous case handling + internal agents via Slack ([vendor case study — Level 0](https://www.salesforce.com/agentforce/metrics/))
  - 1-800Accountant: 70% repetitive inquiry automation during tax season ([Ksolves](https://www.ksolves.com/blog/salesforce/top-companies-using-agentforce))
- **Limitations:** 15 topics max, 15 actions per topic per agent. $2/conversation creates budget unpredictability. Practitioners report hallucination and forced adoption. ([Salesforce Ben](https://www.salesforceben.com/where-are-we-really-at-with-agentforce-adoption/), [Apex Hours](https://www.apexhours.com/agentforce-limitations-and-workarounds/))
- **Practitioner verdict:** "Marketing veneer over underbaked AI" — but improving steadily (Salesforce Ben, Mar 2026)
- **Nordic signal:** Strong. Finnair + reMarkable. Salesforce opened Stockholm office Dec 2025 for Nordic Agentforce adoption.
- **Evidence level:** Level 2-3 (customer service convergence)

### Zendesk AI Agents — Customer Service
- **Scale:** ~20,000 enterprise customers, 4.6B tickets/year. Acquiring Forethought (Mar 2026) for self-learning agents.
- **Named deployment:**
  - SeatGeek: 51% auto-resolution in 4 months, 57,000 queries autonomous during peak events ([TechBuzz.ai](https://www.techbuzz.ai/articles/zendesk-s-ai-agent-claims-80-issue-resolution-rate))
- **Architecture:** Multi-step: understand query → search KB → execute actions (refunds, cancellations) → LLM verification. Genuinely agentic within bounded domain.
- **Pricing:** $1.50-$2.00 per automated resolution (outcome-based) ([eesel.ai](https://www.eesel.ai/blog/zendesk-automated-resolutions))
- **Evidence level:** Level 2-3 (independently reported results)
- **Nordic signal:** None found

### ServiceNow (Now Assist / AI Agents) — IT Ops / Employee Service
- **Scale:** $600M+ ACV, tracking to $1B+. 55x consumption growth since May 2025. 244 deals >$1M in Q4. ([Futurum](https://futurumgroup.com/insights/servicenow-q4-fy-2025-earnings-highlight-ai-platform-momentum/))
- **Named customers:** ExxonMobil, Standard Chartered, Merck — no detailed metrics from any.
- **Practitioner reality check:** Mark Orsborn: most orgs claiming Phase 3 maturity are actually Phase 2. CMDB accuracy below 90% threshold needed for agents. Realistic Phase 1→4: 18-33 months. ([Medium](https://medium.com/@markorsborn/the-four-phases-of-servicenow-ai-evolution-7733cf0d6efa))
- **Nordic signal:** Acquired Advania's Quality 360 (Nordic company)
- **Evidence level:** Level 2 (strong revenue signal, weak deployment evidence)

### SAP Joule — ERP / Finance / Supply Chain / HR
- **Scale:** 400+ AI use cases, 2,400+ Joule skills. Joule Studio Agent Builder GA January 2026.
- **Unique position:** Only platform targeting core ERP processes — cash management, procurement, production planning, expense management. Deepest business process agents across any platform.
- **Expert assessment:** Josh Bersin: "SAP really has its AI act together" — ahead of Workday. Multi-functional agents (recruiting + training) = where big ROI comes. ([Josh Bersin](https://joshbersin.com/2025/10/sap-jumps-ahead-in-ai-agents-with-joule-hcm-features-and-more/))
- **Deployment evidence:** Accenture (Optisell, 3 weeks) and Western Sugar Cooperative (25% invoice processing reduction) — both vendor-sourced only ([SAP News Center](https://news.sap.com/2025/10/sap-connect-business-ai-new-joule-agents-embedded-intelligence/))
- **Evidence level:** Level 1-2 (expert opinion + vendor-sourced metrics)
- **Nordic signal:** None found

### HubSpot Breeze — Marketing / Sales (SMB)
- **Scale:** 15+ Breeze Agents. Defaults to GPT-5 since Jan 2026.
- **Named deployment:** Zeffy: 84% support ticket deflection ([MyAskAI](https://myaskai.com/blog/hubspot-breeze-ai-agent-complete-guide-2026))
- **Practitioner assessment:** 8/10 for day-to-day, but 40% failure rate without proper config. No custom instructions. Credits expire monthly ($470/month for 500 extra conversations). Limited integrations outside HubSpot (5/10). ([Simple Machines](https://www.simplemachinesmarketing.com/blog/hubspot-ai-whats-actually-useful-and-what-to-skip/), [Resolve247](https://resolve247.ai/blog/hubspot-breeze/))
- **Truly agentic?** Mostly copilot-level. Prospecting Agent in "fully autonomous" mode is the exception.
- **Evidence level:** Level 2
- **Nordic signal:** None found

## Cross-Platform Patterns

### Pattern 1: Customer service is the breakthrough domain (Level 3 convergence)
3+ platforms independently showing 40-80% autonomous resolution: Zendesk (51% SeatGeek), Salesforce (80% Finnair chat, 40%+ Wiley), HubSpot (84% Zeffy). Clear success criteria + bounded scope + human escalation tolerance = why this domain leads.

### Pattern 2: Most deployed "agents" are still copilots
Despite marketing language, majority do: summarization, search, content generation, single-step completion. Orsborn (ServiceNow): "Most organisations claiming Phase 3 are Phase 2 with aspirations." Truly autonomous multi-step workflows are just reaching GA (SAP Q1 2026, ServiceNow Zurich Mar 2025).

### Pattern 3: Pricing shifting to outcome-based
Zendesk $1.50-$2.00/resolution, Salesforce $2/conversation, HubSpot credit model. Aligns incentives with effectiveness but creates budget unpredictability enterprises struggle with.

### Pattern 4: The vertical advantage is data context
Vertical platforms win because they already own the data. Zendesk has the ticket history + KB + customer context. Salesforce has the CRM. SAP has the ERP. A horizontal platform needs extensive integration to match.

## Personal → Team → Company Progression

| Level | Platform | Maturity | Evidence |
|-------|----------|----------|----------|
| Team | Salesforce Agentforce | Production | Finnair, Wiley — independently verified |
| Team | Zendesk AI Agents | Production | SeatGeek — independently reported |
| Team | HubSpot Breeze | Production | Zeffy — single report |
| Team→Company | ServiceNow | Foundation | Strong revenue, weak deployment evidence |
| Team→Company | SAP Joule | Early GA | Expert endorsement, minimal production evidence |
| Company | All platforms | Aspirational | No cross-function autonomous agent evidence anywhere |

## What We Need To Learn

- [ ] Nordic companies on Zendesk, SAP, ServiceNow, or HubSpot agent platforms
- [ ] Head-to-head practitioner comparison (someone who deployed 2+ platforms)
- [ ] Cost-effectiveness: vertical SaaS agents vs building on horizontal platforms
- [ ] Multi-agent orchestration in production at any vertical vendor
- [ ] Failure case studies (specific companies, not analyst predictions)
- [ ] Customer service agent accuracy/hallucination rates in production
- [ ] SAP Joule production deployment results (beyond vendor case studies)

## Next Cycle Priorities

1. **Salesforce Agentforce practitioner deep-dive.** Best evidence base — dig into what practitioners report about real deployment experience beyond customer service.
2. **ServiceNow deployment evidence.** Revenue signal is strong but deployment evidence is weak. Find practitioners who've implemented.
3. **SAP Joule early GA results.** Cash Management Agent, Bid Analysis Agent — anyone using them?
4. **Zendesk Forethought acquisition impact.** Self-learning agents — when do they ship?
5. **Nordic vertical SaaS adoption.** Beyond Finnair and reMarkable.

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-initial.md` — Initial survey of all five platforms
