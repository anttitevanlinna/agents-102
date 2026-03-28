# Research Cycle 74 — March 25, 2026 (Hour 06)

*RSAC 2026 Day 2 deepens agent security convergence. Cisco primary stat verified. Vorlon survey: 1-in-3 enterprises had AI agent security incident. CSA launches CSAI Foundation. Check Point adds 19th product. Copilot Cowork 39th zero.*

---

**Focus area:** RSAC 2026 Day 2 coverage + March 31 deadline tracking + Cisco stat verification
**Research mode:** Cross-platform pattern (agent security convergence) + Tier 1 checks
**Why this focus:** RSAC 2026 is mid-conference (Day 2 of 5). Agent security convergence signal is the strongest we've tracked — this is the crystallization event. Plus March 31 deadlines are 6 days away.

## Queries Used
- "RSAC 2026 Day 2 agent security announcements March 24 25"
- "Cisco AI agent survey 85% experimenting 5% production 2026"
- "RSAC 2026 Vorlon agentic ecosystem security gap CISO report"
- "Cloud Security Alliance CSAI Foundation agentic control plane RSAC 2026"
- "Check Point AI agent security RSAC 2026 enterprise"
- "Copilot Cowork hands-on review experience 2026"
- "Zendesk Forethought acquisition close March 2026"
- "A2A protocol first customer deployment supply chain 2026"
- "Anthropic Antspace announcement BYOC 2026"
- "HR AI agent deployment production 2026 SHRM"
- "SecurityWeek RSAC 2026 Day 2 announcements summary"

---

## FINDING 1: Cisco 85%/5% Stat — Primary Source Verified

**Source:** https://blogs.cisco.com/security/the-agent-trust-gap-what-our-research-reveals-about-agentic-ai-security [vendor blog — Level 0 for claims, but survey data is independently useful]
**Author:** Ted Kietzman, Product Marketing Manager, Duo Security (Cisco)
**Date:** March 23, 2026

### Verified Statistics
- **85% of senior IT/security leaders** are experimenting with, piloting, or deploying agentic AI
- **Only 5% have AI agents in broad production** — the 17:1 experimentation-to-production ratio
- **60% view security concerns as primary adoption barrier**
- **29% rank securing agentic AI among top three priorities**
- **Regional variation:** North America 61% piloting/producing, APJC 53%, EMEA 48%
- **Ownership fragmentation:** 29% CISO, 27% CIO/IT, 24% central AI committee, **11% no clear ownership**

### Methodology Caveat
Blog post says "senior IT and security leaders from across Cisco's customer base" — **no sample size disclosed, no methodology details.** This is a Cisco customer survey, not an independent survey. Cisco customers are biased toward Cisco's network security perspective.

### Assessment
- Evidence level: Level 0 (vendor survey). But the stat is the best deployment-gap data point available because it separates "experimenting" from "production" — most surveys don't make this distinction.
- The 85%/5% gap, combined with Vorlon's 99.4% incident rate, paints a consistent picture: almost everyone is experimenting, almost nobody is in production, and the gap is filled with security incidents.
- **Key claims:** 85% experimenting, 5% production, 60% cite security as primary barrier, 11% have no clear ownership of agent security.

---

## FINDING 2: Vorlon CISO Report — 1 in 3 Enterprises Had AI Agent Security Incident

**Source:** https://securityboulevard.com/2026/03/vorlon-survey-99-of-organizations-got-hit-by-a-saas-or-ai-security-incident-in-2025/ [domain trade publication]
**Source:** https://www.globenewswire.com/news-release/2026/03/23/3260443/0/en/ [vendor press release — Level 0]
**Date:** March 23, 2026
**Sample:** 500 US CISOs

### Key Statistics
- **99.4% experienced at least one SaaS or AI ecosystem security incident in 2025** (only 3 of 500 reported zero)
- **1 in 3 enterprises** dealt with a security incident involving AI agents
- **31% experienced unauthorized data exfiltration** through SaaS-to-AI integrations
- **75.4% characterize AI agents as "critical or significant data security risk"**
- **27.4% breached through compromised OAuth tokens/API keys** — despite 89.2% claiming strong OAuth governance
- **Only 0.8% (4 of 500) feel adequately protected** against SaaS/AI supply chain breaches
- **25% express no confidence at all** in understanding what data non-major AI tools can access
- Average 13 dedicated security tools per organization — and 99% still breached

### Assessment
- Evidence level: Level 2 (vendor-published survey but large sample, independently reported by Security Boulevard)
- **The confidence-outcome disconnect is the headline:** 89% claim strong OAuth governance, 27% breached through OAuth. Tools don't equal protection.
- Combined with Cisco (85% experimenting, 5% production) and Saviynt (47% observed unauthorized agent behavior), this is now **three independent surveys** confirming the same pattern: experimentation without security → incidents.

---

## FINDING 3: RSAC 2026 Agent Security — Signal Count Now 22+

Previous cycle (73) tracked 18 products. New additions from Day 1-2:

| # | Company | Product | Date | What It Does |
|---|---------|---------|------|-------------|
| 19 | Check Point | AI Defense Plane | March 23 | Three-layer control plane: Workforce AI Security, AI App/Agent Security, AI Red Teaming. Built on Lakera + Cyata acquisitions. |
| 20 | Nagomi Security | Agentic Exposure Ops | March 19 | Agent-driven exposure remediation: detect → investigate → remediate → verify loop. Named CISO customer (WELL Health Technologies). |
| 21 | Vorlon | Agentic Ecosystem Security Platform | March 23 | Runtime AI agent monitoring. DataMatrix maps data/identity/integration interactions. 500-CISO survey released. |
| 22 | Wiz/Google | AI-APP (AI Application Protection) | March 24 | Full-stack AI app protection from infrastructure to agents. Part of Google Cloud acquisition. |
| 23 | SandboxAQ | AQtive Guard AI capabilities | March 24 | AI system discovery, guardrails, prompt injection defense |
| 24 | Pentera | Pentera 8 / Pentera Peer | Pre-RSAC | Agentic NLP interface for adversarial testing. Context-aware by role. GA Q2 2026. |
| 25 | Secure Code Warrior | SCW Trust Agent: AI | Pre-RSAC | Commit-level LLM usage tracking, MCP server monitoring, policy enforcement. |

**Updated signal count: 25 independent products from 25 different companies.**

### New Category: Standards/Governance Bodies

| Org | What | Date |
|-----|------|------|
| Cloud Security Alliance | **CSAI Foundation** — new 501(c)3 for agentic AI security. "Securing the Agentic Control Plane." Six programs. TAISE-Agent certification for autonomous agents. Collaboration with CoSAI. | March 23 |

**Source:** https://cloudsecurityalliance.org/press-releases/2026/03/23/csa-securing-the-agentic-control-plane [industry body — factual]
**Source:** https://blog.checkpoint.com/artificial-intelligence/check-point-at-rsac-how-were-helping-our-customers-secure-their-ai-transformation [vendor blog — Level 0]
**Source:** https://www.helpnetsecurity.com/2026/03/24/check-point-ai-defense-plane/ [domain trade publication]
**Source:** https://www.helpnetsecurity.com/2026/03/19/nagomi-security-agentic-exposure-ops/ [domain trade publication]

### Key Quotes
- Check Point VP David Haber: "AI is no longer limited to generating content. It is beginning to access systems, use tools, chain actions, and operate with increasing autonomy. That changes the security model."
- CSAI/Phil Venables (ex-Google Cloud CISO): Called CSAI's approach "a strong complement to the work of standards bodies"
- Jen Easterly (RSAC CEO, ex-CISA Director): "Delighted to provide a home for the CSAI Foundation unveiling"

### Assessment
- Evidence level: Level 3 (Convergence) — **strengthened.** 25 products + a new foundation + standards body. This is no longer approaching convergence, it IS a fully-formed product category.
- The CSAI Foundation is significant: it's the first **governance body** specifically for agentic AI security, not just another vendor product. CSA has real credibility (ISO standards, CCSK/CCSP certs). TAISE-Agent certification for autonomous agents is novel.
- **Curriculum implication:** Module 4 (Security) should reference the CSAI framework — it's likely to become the de facto governance standard.

---

## FINDING 4: Copilot Cowork — 39th Consecutive Zero

No independent hands-on review found. All results remain:
- Microsoft's own blog post (March 9)
- Partner explainers (2toLead, C5 Insight, eWeek summary of announcement)
- Fortune/Redmond Mag reporting on the announcement
- Gartner Peer Insights page exists but no substantive reviews

**"Broader Frontier program availability" was promised for "late March 2026."** Today is March 25. Five days remain.

**Consecutive zeros: 39.**

---

## FINDING 5: Zendesk-Forethought — Still Pending, No Complications

Deal announced March 11. Expected close "by the end of March." No regulatory or business complications reported. Both companies privately held.

- Source: https://techcrunch.com/2026/03/11/zendesk-acquires-agentic-customer-service-startup-forethought/ [tech press — bare facts]
- New context: Forethought was TechCrunch Battlefield 2018 winner, 6+ years before ChatGPT. 1B+ monthly interactions.
- All technical claims (Resolution Learning Loop, self-improving agents) remain Level 0 — vendor-sourced only.

**Status: Pending. 6 days to expected close.**

---

## FINDING 6: A2A Tyson/Gordon — Primary Source Traced to Google Cloud Blog (July 2025)

The Tyson Foods / Gordon Food Service A2A deployment claim traces to Google Cloud's blog post from July 2025 about A2A protocol upgrades.

- Source: https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade [vendor blog — Level 0]
- This is a Google Cloud blog, making the claim vendor-sourced. No independent confirmation.
- The description is aspirational: "pioneering collaborative A2A systems" — unclear if this is in production or in development.

**Assessment:** Level 0 vendor claim. The A2A "first customer" is vendor-announced, not independently verified. Downgrade from "Level 1-2" (previous cycle) to "Level 0, vendor-sourced."

---

## FINDING 7: Antspace — 35th Consecutive Silence for Official Announcement

No new Antspace developments. Only derivative content (AI Advances Medium article restating AprilNEA's March 18 findings). No official Anthropic announcement. No new BYOC evidence. Still staging.

**Consecutive silence: 35 cycles.**

---

## FINDING 8: SHRM AI+HI Project 2026 — HR Remains Pre-Deployment

SHRM's own data confirms what 74 cycles of research found:
- **Only 11% of HR organizations have embedded AI in daily workflows**
- AI adoption in HR doubled from 26% to 43% — but this is "using AI tools," not deploying agents
- Conference sessions titled "AI in HR: What's Real, What's Stalled, and What Comes Next" and "AI ROI – From Pilot to Scale" — confirming the gap between experimentation and deployment
- **Two-thirds of HR professionals say their org hasn't been proactive in preparing employees**

**Source:** https://www.shrm.org/topics-tools/news/age-of-ai-agents-next-era-of-human-ai-collaboration [domain trade publication]
**Source:** https://generalassemb.ly/blog/the-culture-gap-is-real-what-500-hr-leaders-revealed-at-shrms-aihi-project-2026/ [domain trade publication]

**Assessment:** Level 1 (opinion/survey context). Confirms HR is pre-deployment for agents. The 11% "embedded in daily workflows" is useful quantification. **HR agents: 74th consecutive cycle with zero production deployments.**

---

## CONVERGENCE PATTERN UPDATES

### Agent Security/Governance — Level 3 Strengthened (25 products + governance body)

The signal is now overwhelmingly clear:
- **25 independent vendor products** from 25 different companies
- **1 new governance foundation** (CSA → CSAI)
- **3 independent surveys** quantifying the problem (Cisco 85%/5%, Vorlon 99.4%/33%, Saviynt 47%)
- **Standards bodies activating** (CSA, CoSAI, NIST, OWASP)

Sub-patterns crystallizing at RSAC:
1. **Shadow agent discovery** — now addressed by 6+ products
2. **Agent identity/NHI** — converging on non-human identity as the control framework (Okta, Microsoft Entra, Token, 1Password, Astrix)
3. **MCP security** — specifically called out as attack surface (Cisco, Snyk, Entro, Secure Code Warrior)
4. **Agent red teaming** — becoming standard (Check Point, Snyk, SentinelOne, Pentera)
5. **Governance certification** — CSA TAISE-Agent for autonomous agents is the first such program
6. **NEW: Agentic SOC** — security teams using agents to defend against agents (Google, Arctic Wolf, Cisco, SentinelOne)

### The Supply-Demand Irony
**25 security products exist. Zero deployed customers reported outcomes.** The agent security product category is being built before the agents it's meant to secure are deployed (Cisco: only 5% in production). This is either prescient infrastructure-building or a vendor hype cycle. The CSAI Foundation suggests the industry believes this is prescient.

---

## What I Looked For But Did Not Find

1. **SecurityWeek Day 2 summary** — not published yet (Day 1 published ~14 hours ago)
2. **Any Copilot Cowork independent review** — 39th consecutive zero
3. **Any HR agent production deployment** — 74th consecutive zero. SHRM's own data confirms pre-deployment.
4. **Antspace official announcement** — 35th consecutive silence
5. **Independent A2A deployment evidence** — Tyson/Gordon traced to Google vendor blog only
6. **Any RSAC counter-evidence** — nobody arguing "agent security is premature." The debate is about approach, not necessity.
7. **Any practitioner deploying one of the 25 agent security tools** — zero deployment outcomes reported

---

## Next Cycle Priorities

1. **RSAC 2026 Day 3-4 coverage** — SecurityWeek Day 2 summary should be published. Watch for practitioner panels and deployment evidence.
2. **March 31 deadline sprint (5 days out):** Copilot Cowork late-March promise, Board Finance GA, Google credit cliff, Zendesk-Forethought close
3. **Vorlon full report** — available at vorlon.io. Fetch for deeper AI agent incident data.
4. **CSA CSAI Foundation detail** — fetch the blog post for framework details that map to our curriculum.
5. **Counter-evidence hunt:** Is the agent security product category premature? Who is buying these tools?
