# Research Cycle 73 — March 25, 2026 (Hour 04)

*RSAC 2026 breakout cycle. Agent security/governance crosses Level 3. Claude Computer Use first practitioner review. A2A first named customer deployment.*

---

## HEADLINE FINDING: Agent Security/Governance Crosses Level 3 (Convergence)

**This is the most significant convergence signal we have tracked.** RSAC 2026 (March 23-27) produced an explosion of agent security products. Combined with pre-RSAC launches, the signal count now exceeds 15 independent products — well past the L3 threshold of 10-20 independent signals.

### Complete Signal Inventory (March 2026)

| # | Company | Product | Date | What It Does |
|---|---------|---------|------|-------------|
| 1 | Nudge Security | AI Agent Discovery | March 24 | Shadow agent discovery across enterprise platforms |
| 2 | Okta | Okta for AI Agents | April 30 GA | Agent identity, discovery, registration, access revocation |
| 3 | Entro Security | Agentic Governance & Administration (AGA) | March 18 | Shadow AI discovery via EDR, MCP monitoring, policy enforcement |
| 4 | Token Security | Intent-Based AI Agent Security | March 18 | Intent-aligned permissions, lifecycle governance. RSAC Top 10 finalist |
| 5 | Geordie AI | Agent-Native Security Platform + Beam | March 23 | Behavioral monitoring, context-based controls. **Won RSAC Innovation Sandbox** |
| 6 | Snyk | Agent Security + Evo AI-SPM (GA) | March 23 | AI-BOM, agent red teaming, MCP server scanning, guardrails |
| 7 | Microsoft | Agent 365 + Entra Agent ID | May 1 GA | Agent control plane, shadow AI detection, identity for agents |
| 8 | Cisco | Zero Trust for AI Agents + DefenseClaw | March 23 | MCP gateway, agent registration, open-source agent security framework |
| 9 | CrowdStrike | Falcon AI Runtime Protection | March 23 | EDR for AI agents, shadow AI discovery at endpoint |
| 10 | SentinelOne | Prompt AI Agent Security + Red Teaming | March 23 | Agent security posture, adversarial testing |
| 11 | Rubrik | SAGE (Semantic AI Governance Engine) | March 23 | Semantic policy interpretation for agent governance |
| 12 | Google Security | Agentic SOC + Triage Agent | March 23 | Autonomous alert investigation, evidence gathering |
| 13 | 1Password | Unified Access | March 23 | Agent credential/secrets management (with Anthropic, Cursor, GitHub) |
| 14 | Astrix Security | Agent Discovery + Policy Engine | March 23 | Four-method agent discovery, real-time policy enforcement |
| 15 | NVIDIA | OpenShell + 5-vendor threat model | GTC March | Deny-by-default agent policy; CrowdStrike/Palo Alto/JFrog/Cisco/WWT |
| 16 | Anthropic | Computer Use permission-first model | March 24 | Permission-based access control baked into the agent itself |
| 17 | Arctic Wolf | Aurora Agentic SOC | March 23 | Agentic AI for security operations |
| 18 | Kore.ai | Agent Management Platform | March 23 | Cross-framework agent governance |

**Signal count: 18 independent products/announcements from 18 different companies in a single month.**

**Evidence level: Level 3 (Convergence).** This is no longer "some companies are thinking about agent security." This is a new product category being born in real time. The convergence happened at RSAC 2026 — the security industry's main event.

### Source Classification

- Entro AGA: https://www.helpnetsecurity.com/2026/03/19/entro-agentic-governance-administration/ [domain trade publication]
- Token Security: https://www.helpnetsecurity.com/2026/03/18/token-security-intent-based-ai-agent-security/ [domain trade publication]
- Geordie AI win: https://www.prnewswire.com/news-releases/geordie-ai-named-most-innovative-startup-at-rsac-2026-conference-innovation-sandbox-contest-302722519.html [vendor press release — Level 0, but contest result is independently verifiable]
- Geordie AI analysis: https://securityboulevard.com/2026/03/rsac-2026-innovation-sandbox-geordie-ai-architect-of-enterprise-ai-agent-security-governance-systems/ [domain trade publication]
- Snyk Agent Security: https://securityboulevard.com/2026/03/snyk-launches-agent-security-solution-and-ships-evo-ai-spm-at-rsac-2026/ [domain trade publication]
- Snyk + SentinelOne: https://siliconangle.com/2026/03/23/sentinelone-snyk-introduce-new-tools-securing-ai-agents/ [domain trade publication]
- RSAC roundup (Day 1): https://www.securityweek.com/rsac-2026-conference-announcements-summary-day-1/ [domain trade publication]
- RSAC roundup (Pre-event): https://www.securityweek.com/rsac-2026-conference-announcements-summary-pre-event/ [domain trade publication]
- Cisco agent security: https://securityboulevard.com/2026/03/cisco-ships-zero-trust-for-ai-agents-self-service-red-teaming-and-agentic-soc-tools-at-rsac-2026/ [domain trade publication]
- Constellation Research RSAC take: https://www.constellationr.com/insights/news/rsac-2026-everyone-trying-secure-ai-agents-various-claws [analyst — Level 0 for predictions, but event reporting is factual]
- Microsoft Agent 365: https://venturebeat.com/technology/microsoft-says-ungoverned-ai-agents-could-become-corporate-double-agents-its/ [tech press]
- 1Password: inferred from RSAC roundup coverage

### Key Stat (needs primary source verification)

Cisco survey at RSAC: **85% of major enterprise customers are experimenting with AI agents, but only 5% have moved them into production** — with access control gap as the primary blocker.

- Source: RSAC roundup coverage [tech press — stat needs primary Cisco source]

### Curriculum Implications

Module 4 (Security) must now cover agent identity and governance as a first-class topic. The specific risks being productized:
1. **Shadow agents** — agents created without IT knowledge (Nudge, Entro, CrowdStrike, Astrix)
2. **Credential exposure** — hardcoded secrets, orphaned service accounts (1Password, Token, Entro)
3. **Intent drift** — agents operating outside their designed purpose (Token, Geordie)
4. **MCP security** — unauthenticated MCP connections, malicious MCP servers (Cisco, Snyk, Entro)
5. **Agent lifecycle** — orphaned agents, access drift, no audit trail (Token, Okta, Microsoft)

---

## FINDING 2: Claude Computer Use — First Independent Practitioner Review

**Author:** Pawel Jozefiak (runs custom AI agent system on dedicated Mac Mini)
**Source:** https://thoughts.jock.pl/p/claude-cowork-dispatch-computer-use-honest-agent-review-2026 [practitioner direct — Level 2]

### What Works
- Claude Code Desktop: visual diff review, parallel sessions with git worktree isolation, PR monitoring with auto-fix
- 50+ service connectors (Google Calendar, Slack, Gmail, Jira, Notion)
- Dispatch architecture (task delegation from mobile) is "the right direction"
- Channels integration with Slack/Discord/Telegram for team workflows

### What Doesn't Work
- **Computer Use: ~50% success rate.** Finding data works; executing actions or sharing results frequently fails
- **No persistent memory across Cowork sessions** — fundamentally limits agent sophistication
- **Dispatch is "currently slow"**
- **Desktop dependency** — requires machine awake with Claude running
- **Rate limits** hit ceilings on sustained agentic workloads
- **Mac-only** — no Windows/Linux support

### Practitioner Verdict
"Anthropic is getting close. Not there yet, but close. And the direction they're going is exactly right."

### Assessment
- Evidence level: Level 2 (single practitioner, hands-on testing)
- Enterprise readiness: **Not yet.** "Research preview" status, ~50% success rate on computer use, no persistent memory
- Competitive landscape: Three companies converging on "agent on your computer" (Anthropic, OpenAI/Codex, Meta/Manus) — validates market direction but no winner yet

### Additional Coverage
- CNBC: https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html [general press — bare facts]
- Engadget: https://www.engadget.com/ai/claude-code-and-cowork-can-now-use-your-computer-210000126.html [tech press]
- SiliconAngle: https://siliconangle.com/2026/03/23/anthropics-claude-gets-computer-use-capabilities-preview/ [tech press]

---

## FINDING 3: A2A Protocol — First Named Customer Deployment (Tyson Foods + Gordon Food Service)

**New this cycle:** The first named customer A2A deployment surfaced: **Tyson Foods and Gordon Food Service** are using A2A for collaborative supply chain agents — real-time product data and lead sharing between their respective agents.

- Source: Search result summaries referencing these companies; primary source needs verification [SOURCE NEEDED — appears in multiple secondary summaries but original source URL not yet confirmed]

### Protocol Status
- Version 0.3 released: gRPC support, signed security cards, extended Python SDK
- 150+ organizations in ecosystem
- Linux Foundation governance
- Three Google Cloud deployment paths (Agent Engine, Cloud Run, GKE)
- Spring AI integration for Java ecosystem

### Assessment
- Evidence level: Level 1-2 (named companies cited in summaries, but primary practitioner source not yet verified)
- The Tyson/Gordon deployment, if independently confirmed, would be the first A2A production deployment we can name — moving A2A from "infrastructure ready, nobody using it" to "first real deployment"
- Still no broad production deployment evidence. 150+ organizations "committed" but actual deployments remain scarce.

---

## FINDING 4: Copilot Cowork — 38th Consecutive Zero

No independent hands-on review found. All results remain:
- Microsoft's own blog post (March 9): https://www.microsoft.com/en-us/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/ [vendor blog — Level 0]
- Partner explainers (2toLead, buckleyPLANET, FindSkill, C5 Insight) — all Level 0 derivative content
- Fortune reporting on announcement: https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/ [general press — announcement reporting]

**Status:** "Research Preview" with limited customers. Broader "Frontier program" availability promised for "late March 2026" — that window is NOW (7 days remain until end of March). If no hands-on reviews appear by April 1, the "late March" promise was either delayed or the preview is extremely limited.

**Consecutive zeros: 38.**

---

## FINDING 5: Board Finance AI Agents — No Early Access Reports

No early access reports, practitioner reviews, or beta customer feedback found. All results are republications of the March 18 PR Newswire press release across Yahoo Finance, Morningstar, Manila Times, etc. — all Level 0.

GA remains March 31. The AFP FP&A Forum (March 23-25, Indianapolis) may produce practitioner commentary, but none has surfaced yet.

---

## CONVERGENCE PATTERN UPDATES

### Agent Security/Governance — UPGRADED TO LEVEL 3

**Previous status:** Approaching L3 (7-9 signals)
**New status:** **Level 3 — Convergence confirmed.** 18 independent products from 18 companies in March 2026.

This is no longer a trend. It is a product category. The RSAC 2026 event was the crystallization moment. Key sub-patterns:

1. **Shadow agent discovery** is the #1 use case — every major vendor addresses it
2. **Agent identity** is emerging as the control plane (Okta, Microsoft Entra, Token Security)
3. **MCP security** specifically called out by Cisco, Snyk, Entro as an attack surface
4. **"Guardian agents"** — Gartner has already created a Market Guide for this category (Geordie AI named as representative vendor)
5. **Open-source agent security tooling** appearing (Cisco DefenseClaw)

### Cisco Stat: 85% Experimenting, 5% Production

If verified, this is the best deployment-gap data point we have. 85% experimenting vs. 5% in production = 17:1 ratio. The security gap is the primary cited blocker.

### Computer Use Convergence — L1 (Emerging)

Three companies (Anthropic, OpenAI/Codex, Meta/Manus) converging on desktop-control agents. Plus Perplexity Computer. Direction validated, no winner, early stage. One practitioner review (Jozefiak) documents ~50% success rate.

---

## PERSISTENT GAPS (Updated)

| Watch Item | Consecutive Zeros | Window | Assessment |
|---|---|---|---|
| Copilot Cowork independent reviews | **38 cycles** | "Late March" — 6 DAYS LEFT | Zero hands-on reviews. Partner content only. |
| Board Finance Agents early access | 0 (new watch) | GA March 31 | No early access reports |
| ServiceNow Autonomous Workforce deployments | 5+ weeks | Q2 2026 | Zero outcome evidence |
| SAP Joule production deployments | Ongoing | Horvath: "not yet" | 60% not agile enough |
| A2A independent production deployments | Ongoing | Tyson/Gordon cited but unverified | First named customer, needs primary source |
| Nordic enterprise agent deployments | 38+ cycles | April 15 Finnish report | Zero beyond NBIM/Equinor |

---

## NORDIC SIGNALS

### Nordea — 1,500 Job Cuts, But "Agents" Are Chatbots

Nordea announced 1,500 job cuts across the Nordics as part of its 2030 strategy, citing AI and automation. However, the AI "agents" deployed are **12 conversational AI bots on the boost.ai platform** — chatbot-tier, not agentic (no multi-step autonomous workflows). 91-95% resolution rate, 220K conversations/month.

- Source: https://www.nordiskpost.com/2026/03/18/nordea-will-cut-1500-jobs-across-the-nordics/ [general press — bare fact]
- Source: https://boost.ai/case-studies/nordea-employs-comprehensive-conversational-ai-strategy-to-scale-customer-service/ [vendor case study — Level 0]
- Evidence level: Level 0. Fails all three gates — these are chatbots, not agents.
- **Nordic drought continues: cycle 38 with no new enterprise agentic deployments beyond Equinor/NBIM.**

### BCG Nordic Confirmation — "Only 4% Achieve Strong AI Returns"

BCG published Nordic AI analysis arguing most Nordic companies are stuck in productivity-tool mode rather than transformative end-to-end initiatives. Validates our positioning but is consultancy framework (Level 0).

- Source: https://www.bcg.com/publications/2026/nordic-ai-value-creation-or-bubble [analyst/consultancy — Level 0]

---

## DOMAIN UPDATES

### SDR Agent Convergence — "Autonomous Replacement Fails, Augmentation Works" (Level 3)

**This is a genuine convergence finding.** Multiple independent sources converge on the same pattern:

- **50-70% of AI SDR tools churn within a year** (~2x human SDR turnover)
- **Only 2% of companies successfully implement AI SDRs** in a way that sticks
- **AI SDRs convert meetings at 15%** vs. human SDRs at 25%
- **Companies using AI to augment (not replace) human SDRs see 2.8x more pipeline**
- Every successful deployment requires **daily tuning** — "set it and forget it" called "the biggest lie in the market"

The narrative has shifted from "AI SDRs fail" to "autonomous replacement fails, augmentation works." This is our strongest cross-domain example of the human-agent collaboration pattern.

- Source: https://www.gtmaipodcast.com/p/the-ai-sdr-bubble-is-popping-heres [practitioner analysis]
- Source: https://www.usergems.com/blog/are-ai-sdrs-worth-it [vendor with practitioner data]
- Source: https://www.broadn.io/blogs/ai-sdrs-doomed-to-fail [practitioner analysis]
- Source: https://nuacom.com/ai-sdrs-should-you-use-them-or-not/ [domain trade publication]
- Evidence level: Level 3 (convergence). Multiple independent sources describing the same failure-then-pivot pattern.

### HR Agents — Still Zero Deployments Globally

Confirm's Transform 2026 launch (March 23) remains a vendor announcement with no customer evidence. Josh Bersin predicts agents will eliminate 30% of HR roles — Level 0 analyst prediction. The "40% of companies have deployed AI agents in HR" stat conflates chatbots with agents.

**Verdict: ZERO verified autonomous HR agent deployments. 4th consecutive cycle confirming this.**

### AML/Compliance — Approaching Convergence But Not There Yet

Big bank names (JPM, Citi, Wells Fargo) attached to AML AI, but practitioner-level verification still missing. Domain trade press increasingly confident that "2026 is the transition from pilots to production." FCA says 75% of firms using "AI" but this conflates chatbots with agents.

- Source: https://www.amlintelligence.com/2026/01/insight-agentic-ai-and-stablecoins-the-five-trends-redefining-aml-in-2026/ [domain trade publication]
- Source: https://fintech.global/2026/02/16/agentic-ai-drives-next-phase-of-aml-innovation/ [domain trade publication]
- Evidence level: Level 1-2. Worth deeper practitioner-focused search next cycle.

---

## What We Did Not Find

1. **No Copilot Cowork hands-on review** — 38th consecutive cycle. The "late March" Frontier program window is nearly closed.
2. **No Board Finance Agent early access report** — GA in 6 days, zero practitioner signal.
3. **No Claude Computer Use enterprise deployment** — consumer preview only; one practitioner reports ~50% success rate.
4. **No A2A primary source for Tyson/Gordon deployment** — cited in summaries but original source needs verification.
5. **No counter-evidence to agent security convergence** — nobody is arguing "agent security is not needed." The debate is about approach (identity-based vs. behavioral vs. intent-based), not necessity.
6. **No Agentforce practitioner deployments** — still too early.
7. **No new Nordic enterprise agent deployments** — 38th consecutive cycle. Nordea's "agents" are chatbots.
8. **No HR agent deployment anywhere globally** — Confirm launch is vendor announcement only.
9. **No Sana/Workday Nordic independent verification** — Joona Honka (Berner), Anton Nytorp (Cheffelo), Alexander Bergström (Telavox) still unverified.

---

## Next Cycle Priorities

1. **RSAC 2026 Day 2-4 coverage** — more agent security products likely. Watch for practitioner panels, not just vendor launches.
2. **Verify Tyson Foods / Gordon Food Service A2A deployment** — find primary source.
3. **March 31 verdict cycle** — Copilot Cowork "late March" deadline, Board Finance GA, D365 Wave 1.
4. **Cisco 85%/5% stat** — find primary survey source.
5. **Snyk early access data** — "500+ Evo scans" and WEX quote suggest real usage; dig for practitioner accounts.
