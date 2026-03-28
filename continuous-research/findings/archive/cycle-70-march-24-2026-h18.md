# Research Cycle 70 — March 24, 2026 (Hour 18)

*Three parallel research tracks: Platform Agents, Practitioner Signals, Nordic Deployments.*

---

## HEADLINE FINDINGS

### 1. NBIM (Norway's $2.1T Sovereign Wealth Fund) — Major Nordic Signal

**The biggest new signal this cycle.** Norway's sovereign wealth fund disclosed details of its AI deployment using Anthropic's Claude.

**Key facts:**
- ~350 of 700 employees code their own AI tools using Claude
- Claude integrated with Snowflake data warehouse — portfolio managers query complex financial data in plain English
- ESG risk screening: AI scans all new companies on day one of entering the equity portfolio
- Trading cost savings: $100M/year already, targeting $400M
- CEO Nicolai Tangen: "If you don't use it, you will never be promoted. You won't get a job."
- Head of ML/AI Stian Kirkeberg: "At some stage, we're going to trust that the agent can make some of the decisions and we just monitor what it does."
- **No job cuts.** Tangen explicitly rules out layoffs — headcount stays at ~700

**Evidence level:** Level 2-3 (multiple independent sources, practitioner-direct quotes, verifiable deployment)
**Nordic label:** Nordic-origin deployment
**Finding category:** Production deployment (Claude-based), with stated agent direction

**Sources:**
- https://www.bloomberg.com/news/articles/2026-03-24/norway-wealth-fund-ceo-rules-out-job-cuts-despite-ai-savings [general press — bare facts]
- https://www.geo.tv/latest/657006-norway-wealth-fund-moves-towards-some-ai-driven-decisions-but-with-humans-in-control [general press — bare facts]
- https://www.cnbc.com/2026/02/26/norway-sovereign-wealth-fund-nbim-investment-ai-esg-claude.html [general press — bare facts]
- https://nordsip.com/2026/03/20/norways-oil-fund-turns-to-ai-for-esg-risk-screening/ [domain trade publication]
- https://claude.com/customers/nbim [vendor case study — Level 0 for claims, factual for deployment confirmation]
- https://www.smithstephen.com/p/how-norways-18-trillion-fund-saved [practitioner analysis]

**Significance for Agents 102:** Tangen-vs-Siemiatkowski contrast. Both Nordic leaders, radically different approaches: Klarna cut staff and regretted it; NBIM kept staff, made AI mandatory, saving billions. The NBIM story is the "augmentation wins" case study our buyers need.

---

### 2. Agentforce Hard Adoption Numbers — First Enterprise Agent Platform with Scale Data

**Key new data:**
- 18,500 total customers, 9,500+ on paid plans
- ~$540M ARR, up 330% YoY
- Production deployments grew 70% in Q3 FY2026
- Over half of bookings from existing customers expanding

**Specific deployments:**
- **Falabella:** WhatsApp support via Agentforce, deployed in ~2 months, usage jumped from <50% to >70% within 3 weeks
- **OpenTable:** AI-assisted booking support, "tens of thousands" of conversations, reduced wait times

**Critical skepticism:** Robert Sosemann (Senior Principal Architect, Aquiva Labs): 93% accuracy falls short of enterprise Six Sigma (99.999%). "No one wants to be the first to take the risk."

**Sources:**
- https://www.salesforceben.com/revisiting-the-bullish-case-for-agentforce-in-2026/ [domain trade publication]
- https://futurumgroup.com/insights/salesforce-q3-fy-2026-ai-agents-data-360-lift-bookings-and-fy26-outlook/ [analyst — Level 0 for predictions, factual for reported numbers]

**Evidence level:** Level 2 approaching Level 3. Auditable financial disclosures give higher credibility than press releases. The 93% vs. Six Sigma gap is the honest practitioner assessment.

---

### 3. "Agentic Engineering" Reaches L3 Convergence as Named Discipline

**Evidence:**
- Karpathy coined it (Feb 8, 2026) [practitioner direct]
- Willison gave fireside chat at Pragmatic Summit (Mar 14) [practitioner direct]
- **ICSE 2026** formal workshop: "AGENT 2026: International Workshop on Agentic Engineering" [academic]
- **AgentEng 2026** — "world's first conference on Agent Engineering" in London [conference]
- **Agentic Conf Hamburg** (March 22) — 200-300 practitioners, "no vendor pitches, just builders" [conference]
- QCon London dedicated context engineering track (March 2026) [conference]
- Multiple blog posts and newsletters using the term as established vocabulary

The term moved from one person's coinage to conferences, academic workshops, and broad practitioner adoption in 6 weeks. **L3 confirmed** — 10-20+ independent signals.

**The terminology stack is solidifying:**
- Prompt engineering (2023) → Context engineering (mid-2025, Swyx) → Harness engineering (March 2026, Chase) → Agentic engineering (Feb 2026, Karpathy)
- These are nested layers, not competing terms.

---

## PLATFORM UPDATES

### Claude Computer Use — Still Zero Practitioner Reviews (Day 2)

- Simon Willison: actively publishing (March 22 posts) but has NOT covered computer use
- Karpathy: no reaction
- No Reddit r/ClaudeAI hands-on threads
- No YouTube independent demos
- Hacker News thread focused on pricing economics, not functionality
- CNBC March 24: confirmed Dispatch (phone-to-Mac task delegation)

**Assessment:** Expected at Day 2 for macOS-only research preview. Re-scan in 5-7 days.

### Microsoft D365 Payables Agent — Genuinely Agentic, Detailed

Now documented: monitors mailboxes → extracts invoice data via Azure Document Intelligence → identifies vendor in Business Central → creates purchase invoice drafts → 3-way matching (invoices vs. orders vs. receipts) → human supervisor reviews.

- Public preview since Feb 6, 2026 (US/UK). GA planned May 2026.
- Agent 365 governance SKU: $15/user/month, GA May 1.
- **No practitioner reviews yet** — nobody has published "I tested this on our real invoices."

**Sources:**
- https://learn.microsoft.com/en-us/dynamics365/business-central/payables-agent [vendor documentation]
- https://www.simplydynamics.com/blog/d365-bc-erp-blog/payables-agent-in-d365-business-central/ [domain trade publication]

**Evidence level:** Level 1-2. Feature verifiable by anyone with D365 BC. No deployment results.

### ServiceNow Autonomous Workforce — First Substantive Coverage (No Longer "Zero Reviews")

- L1 Service Desk AI Specialist in "controlled availability," GA expected Q2 2026
- Self-reported: 90%+ of IT requests handled autonomously, 99% faster than human
- **CVS Health CISO Alan Rosa** speaking about governance: "Lose trust, and you lose the right to scale."
- **CIO survey reality check (diginomica):** 40% negative sentiment on 2025 AI projects, only 25% positive. Only 21.4% report AI success above 80%.

**Sources:**
- https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it [domain trade publication]

**Evidence level:** Level 1-2. Self-reported metrics. No independent customer deployment results.

### NEW: OpenAI Frontier (launched Feb 5, 2026)

Enterprise platform for building, deploying, and managing multi-vendor AI agents. SOC 2 Type II, ISO 27001.

- Early customers: HP, Intuit, Oracle, State Farm, Thermo Fisher, Uber
- **$110B funding round; Amazon investing $50B** for exclusive third-party cloud distribution
- Impact claims (unverified, unnamed companies): "production optimization from 6 weeks to 1 day"

**Sources:**
- https://openai.com/index/introducing-openai-frontier/ [vendor press release — Level 0]
- https://www.infoq.com/news/2026/02/openai-frontier-agent-platform/ [domain trade publication]

**Evidence level:** Level 0-1. Named customers, no metrics.

### NEW: NVIDIA NemoClaw (GTC March 16)

Open-source secure agent runtime. Security/governance focus: sandboxing, least-privilege, privacy router.
Partners: Adobe, Atlassian, Cisco, CrowdStrike, Red Hat, SAP, Salesforce, ServiceNow, Siemens.
Status: **Alpha.** No deployments.

**Source:** https://nvidianews.nvidia.com/news/ai-agents [vendor press release — Level 0]

### Google ADK v1.0.0 — Production-Ready, Still Zero Deployments

ADK stable release. A2A v0.3 with gRPC. 150+ orgs in ecosystem. **Not a single named production deployment found.**

### Persistent Gaps Confirmed
- Copilot Cowork: still zero practitioner reviews
- Oracle Fusion agents: still zero deployment evidence
- A2A protocol: still zero independent production deployments despite 150+ orgs

---

## PRACTITIONER SIGNALS

### Karpathy — "State of Psychosis" Interview (March 21)

No Priors podcast. Zero manual coding since Dec 2025. "I don't think a normal person actually realizes that this happened or how dramatic it was."

**Autoresearch** released March 7-8: 630-line Python tool, AI agents run autonomous ML experiments. 700 experiments in 2 days. Shopify CEO Lutke independently achieved 19% improvement. Agents-building-agents made concrete → Module 8 content.

**Sources:**
- https://fortune.com/2026/03/21/andrej-karpathy-openai-cofounder-ai-agents-coding-state-of-psychosis-openclaw/ [general press]
- https://github.com/karpathy/autoresearch [practitioner direct]

### Willison — Pragmatic Summit Dense Content (March 14)

- **Red-green TDD with agents:** "Every coding session starts with 'here's how to run the test.'" Hated TDD his whole career, embraces it with agents.
- **"Lethal trifecta"** security: private data access + malicious instructions + exfiltration vector
- **Conformance-driven development:** Reverse-engineered 6 framework implementations into conformance tests
- **Open source flood:** Projects flooded with junk AI-generated PRs. Some maintainers asking GitHub to disable PRs.
- **Agent IP/legal risk:** Chardet relicensing controversy (LGPL → MIT via Claude Code rewrite) legally unresolved. MALUS satire (March 12).

**Sources:**
- https://simonwillison.net/2026/Mar/14/pragmatic-summit/ [practitioner direct]
- https://simonwillison.net/2026/Mar/12/malus/ [practitioner direct]
- https://simonwillison.net/2026/Mar/5/chardet/ [practitioner direct]

### Harrison Chase — "Harness Engineering" (March 7)

Next evolution beyond context engineering. A harness = complete infrastructure around an agent: planning, filesystem, token management, code execution, memory, sub-agent delegation. Deep Agents features isolated subagent contexts and parallel delegation.

**Source:** https://venturebeat.com/orchestration/langchains-ceo-argues-that-better-models-alone-wont-get-your-ai-agent-to-production/ [tech press]

### Mollick — "Hidden Adoption" and "Bitter Lesson Enters Enterprise"

- Most advanced AI users are using AI secretly due to unclear policies. "Hidden adoption creates a major blind spot for organizational leaders."
- Jagged frontier narrowing: tasks that reliably showed AI limits 12 months ago are resolved. Threshold effects "quietly been crossed."
- "Moats survive only where process is the point — where human interaction, organizational judgment, and multi-stakeholder workflows are inseparable from the value delivered."

**Sources:**
- https://www.insightpartners.com/ideas/generative-ai-ethan-mollick/ [practitioner direct]
- https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the [practitioner direct]

### Agent Failure Patterns — L2-L3 Convergence

- OpenAI's "Year of Agents" post-mortem: Altman's prediction "overly optimistic" [The Information, Jan 2026]
- Microsoft AI agent sales struggles: 5 failure modes identified [Medium/Micheal Lanham]
- Six AI leaders: "normalisation of perpetual piloting" pattern [AI Data Insider]
- Replit AI deleted production database during code freeze [Medium, practitioner analysis]

Consistent pattern: premature autonomy, poor scoping, pilot-to-production gap, unclear accountability.

---

## NORDIC UPDATES

### Gjensidige — Three Named AI Agents (Eva, Sofie, Frank)

NHH/DIG presentation revealed three agents, not just Eva:

| Agent | Function | Target |
|-------|----------|--------|
| Eva | Claims from customers | 70% of individual claims |
| Sofie | Internal staff communication | 70% cost reduction |
| Frank | External partner management | Not specified |

Human names chosen deliberately: "We want it to feel normal and natural to work with these agents."
**Still no measurable outcomes.** The 70% targets are aspirational.

**Source:** https://www.nhh.no/en/nhh-bulletin/article-archive/2025/april/claim-the-future/ [academic/research — NHH]

### Klarna — Agentic Product Protocol (December 2025)

Open standard making 100M+ products discoverable by AI agents, live across 12 markets, 400M prices. Positions Klarna as commerce infrastructure, not just BNPL. "Layoff Boomerang" now industry-wide: 55% of AI-layoff companies regret it.

**Source:** https://fintechmagazine.com/news/what-is-klarnas-agent-protocol-doing-for-agentic-commerce [domain trade publication]

### Finland AI Act — Pioneer Status

First EU member with fully operational enforcement (Jan 1, 2026). 10 supervisory authorities. AI sandboxes required by August 2, 2026.

**Source:** https://valtioneuvosto.fi/en/-/1410877/national-supervision-of-eu-artificial-intelligence-act-to-begin-laws-on-powers-of-authorities-to-take-effect-at-start-of-the-year [government/institutional]

### BCG Nordic — Agentic Detail

- 54% of Nordic executives experimenting with agents, 24% observing
- ~60% allocate less than 5% of AI budgets to agentic initiatives
- Over-index on off-the-shelf tools, underinvest in transformative initiatives

**Source:** https://www.bcg.com/publications/2026/nordic-ai-value-creation-or-bubble [analyst — Level 0, useful as context]

### Nordic AI Startup Landscape

18 active agentic AI companies, $1.13B raised collectively, 2 unicorns. Lovable leads at $653M. Nordic AI Union Summit (March 19, Oslo) — unions now engaging with agentic language.

### Sana/Workday Nordic Claims — Still Unverified

All three Nordic customer quotes (Berner, Cheffelo, Telavox) trace back to single March 17 vendor press release. Joona Honka (Berner) is independently verifiable via LinkedIn and AI Finland nomination, but the "90% adoption in 40 days" number has no independent source.

---

## CONVERGENCE PATTERNS

### Pattern: Nordic AI Workforce Split (Approaching L3)

Two opposite models crystallizing:
- **Cut model:** Klarna (cut, regretted), Nordea (cutting 1,500)
- **Augment model:** NBIM (no cuts, AI mandatory, saving billions), Equinor (upskilling)

The data now supports: "Companies keeping people and making AI mandatory are outperforming companies replacing people."

### Pattern: Announcement-to-Deployment Gap Is THE Story (L3 Confirmed)

Every major vendor has an enterprise agent platform (Salesforce, Microsoft, ServiceNow, Google, OpenAI, NVIDIA, Alibaba, Workday). Only Salesforce has hard adoption numbers. The rest are in announcement territory. OpenAI's "year of agents" disappointment, Microsoft's sales struggles, 93% expecting gains vs. 3% achieving — the gap is widening.

### Pattern: Agent Legal/IP Risk as New Category (L2)

Chardet relicensing, open-source junk PRs, Mexican government cyberattack with Claude Code. Agents don't just write code — they create legal exposure. Not yet in our curriculum.

---

## WHAT WE DID NOT FIND

1. **No Claude Computer Use practitioner deep-dives** — Day 2, expected
2. **No Nordic practitioner publishing about agent builds** — the gap persists
3. **No new Nordic companies deploying business process agents** beyond tracked set
4. **No D365 Payables Agent practitioner reviews**
5. **No Google ADK/A2A production deployment anywhere**
6. **No Finnish AI Act enforcement actions** — framework operational, no cases yet
7. **No independent Sana/Workday Nordic verification**
8. **No new practitioner voices** — field dominated by same 5-10 people
9. **No counter-evidence to agentic engineering convergence**
10. **Mollick's "hidden adoption" suggests enterprise signals exist but are systematically invisible** — structural gap in people-first research method
