# Microsoft 365 OODA Cycle 24 Supplement — 2026-03-21

**Focus area:** Deeper search on Cowork status, CUA updates, security posture, market share data, AI Agent & Copilot Summit customer stories, practitioner building experiences
**Agent level focus:** Personal (Cowork) / Team (Copilot Studio) / Company (security, governance)

## Queries Used
- "Microsoft Copilot Cowork 2026 general availability user reports"
- "Microsoft Copilot Studio business agents enterprise deployment March 2026"
- "Microsoft Agent 365 beta feedback preview March 2026"
- ""Copilot Studio" agent production deployment company results 2026"
- "Microsoft Copilot security vulnerability DLP bug March 2026"
- "Microsoft Copilot market share decline adoption 2026"
- "Microsoft E7 Frontier pricing adoption enterprise feedback 2026"
- "Microsoft Copilot Studio practitioner experience building business agents blog 2026"
- ""AI Agent Copilot Summit" 2026 enterprise deployment customer stories"
- "Microsoft Copilot computer using agents CUA business process automation March 2026"
- "Microsoft Copilot Cowork Frontier program independent review user experience March 2026"
- "Microsoft Copilot Purview insider risk agents security governance March 2026"

## New Findings (not in cycle 24 base)

### 1. Copilot Cowork: Gartner flags capability gap vs Claude Cowork
**Source:** [The Deep View — "Microsoft debuts Cowork agent, but has work to do"](https://www.thedeepview.com/articles/microsoft-debuts-cowork-agent-but-has-work-to-do) — [practitioner analysis]
**Date:** March 2026
**Agent level:** Personal
**What:** Independent analysis (citing Gartner research) confirms that Copilot Cowork does NOT support local computer use, cannot interact directly with local files or applications — unlike Anthropic's Claude Cowork. These are "fundamental capability gaps" that "constrain Cowork's autonomy and limit its ability to operate end-to-end workloads outside Microsoft 365." The article questions whether Microsoft can compete without proprietary models creating differentiated experiences.
**Evidence level:** Level 1-2 (independent analysis with Gartner citation)
**Key claims:**
- Cowork cannot use local computer, cannot interact with local files/apps
- Confined to M365 cloud — cannot do what Claude Cowork does outside M365
- Microsoft's bundling strategy (distribution) insufficient for consumer appeal
- Microsoft stock down 14% since Anthropic debuted Claude Cowork in January

### 2. Copilot market share: detailed conversion data confirms product quality problem
**Source:** [Recon Analytics — "AI Choice 2026: Why Licenses Don't Equal Adoption"](https://www.reconanalytics.com/ai-choice-2026-why-licenses-dont-equal-adoption/) — [practitioner analysis]
**Date:** March 2026
**Agent level:** Personal
**What:** Based on 150,000+ respondents (US paid subscribers), Copilot adoption drops from 68% when it's the only AI platform offered to just 8% when all three (ChatGPT, Gemini, Copilot) are available. Workplace conversion rate: ChatGPT 83.1%, Copilot 35.8%, Gemini 34.0%. Copilot accuracy NPS consistently negative (-3.5 to -24.1). 44.2% of lapsed users cite "distrust of answers." This is the strongest independent data yet that Copilot's problem is product quality, not distribution.
**Evidence level:** Level 3 (large-sample independent research, convergent with other signals)
**Key claims:**
- 68% → 8% adoption drop when alternatives available
- Accuracy NPS persistently negative (-3.5 to -24.1)
- 44.2% cite distrust of answers
- 150,000+ respondent base, 7-month study
- Workplace conversion: ChatGPT 83.1% vs Copilot 35.8%

### 3. Second DLP bypass in 8 months — pattern, not incident
**Source:** [VentureBeat — "Microsoft Copilot ignored sensitivity labels twice in eight months"](https://venturebeat.com/security/microsoft-copilot-ignoring-sensitivity-labels-dlp-cant-stop-ai-trust-failures) — [domain trade publication]
**Source:** [The Register — "Copilot Chat bug bypasses DLP on 'Confidential' email"](https://www.theregister.com/2026/02/18/microsoft_copilot_data_loss_prevention/) — [domain trade publication]
**Source:** [eSecurity Planet](https://www.esecurityplanet.com/threats/microsoft-365-copilot-bug-circumvented-dlp-controls/) — [domain trade publication]
**Date:** February-March 2026
**Agent level:** Personal / Company (security)
**What:** CW1226324 is the SECOND time in 8 months that Copilot violated its own sensitivity label enforcement. First was EchoLeak (CVE-2025-32711, CVSS 9.3) in June 2025. The latest bug allowed Copilot to summarize emails from Sent Items and Drafts despite "Confidential" labels. UK NHS was affected (incident INC46740412). Fix rolling out via AugLoop component, late March through late April 2026. Combined with CVE-2026-26133 (cross-prompt injection, patched March 11) and CVE-2026-26144 (Excel XSS + Copilot exfiltration, zero-click), this is a pattern of security failures — not isolated incidents.
**Evidence level:** Level 3 (multiple independent sources, named affected org, convergent pattern)
**Key claims:**
- Second DLP bypass in 8 months (June 2025 + January 2026)
- UK NHS affected (named incident number)
- AugLoop fix rollout: late March through late April 2026
- Three distinct CVEs in early 2026: CW1226324, CVE-2026-26133, CVE-2026-26144
- Microsoft Data Security Index 2026: 32% of orgs had AI-related data security incidents

### 4. Gartner flags 5 Copilot security risks at Sydney summit
**Source:** [Winbuzzer — "Gartner Flags Five Microsoft 365 Copilot Security Risks"](https://winbuzzer.com/2026/03/17/gartner-five-microsoft-365-copilot-security-risks-xcxwbn/) — [domain trade publication]
**Date:** March 17, 2026
**Agent level:** Company (security)
**What:** Gartner Research VP Dennis Xu presented findings on "Mitigating the Top 5 Microsoft 365 Copilot Security Risks" at Gartner Security & Risk Management Summit in Sydney. Coming on the heels of multiple Copilot CVEs patched in recent weeks. Specific risks not fully extracted (403 on fetch), but the timing — Gartner presenting security risk framework specifically for Copilot — confirms security is now a first-order enterprise concern, not a theoretical worry.
**Evidence level:** Level 0 (Gartner = analyst prediction/framework), but the event itself confirms the security conversation has reached C-suite
**Key claims:**
- Gartner VP presenting dedicated Copilot security risk framework
- Timed with multiple recent CVE patches
- Signal: enterprise security teams now treating Copilot as a risk surface

### 5. AI Agent & Copilot Summit 2026: "most aggressively multi-agent solutions still rare"
**Source:** [MSDynamicsWorld — "AI Agent & Copilot Summit 2026: Customers take measure of AI gains"](https://msdynamicsworld.com/story/ai-agent-copilot-summit-2026-customers-take-measure-ai-gains) — [domain trade publication]
**Source:** [Cloud Wars — "Summit Day Three: From Reskilling to Real-World Execution"](https://cloudwars.com/ai/ai-agent-copilot-summit-day-three-from-reskilling-to-real-world-execution/) — [domain trade publication]
**Date:** March 2026 (San Diego)
**Agent level:** Company
**What:** At the 750+ attendee summit, presenters confirmed that "the most aggressively multi-agent, non-deterministic, autonomous solutions are still somewhat rare." Companies shared stories of "small injections of generative AI, OCR, sentiment analysis" — enhancements to existing automations, not true agentic deployments. Microsoft principal solution architect Dewain Robinson acknowledged agent management complexity. Keynote focused on Model Context Protocol (MCP) for agents performing tasks that human operators do. National Power and American Engineering Testing mentioned as presenters — no specific deployment metrics shared.
**Evidence level:** Level 2 (domain trade publication reporting from event, multiple sessions)
**Key claims:**
- 750+ attendees, but autonomous multi-agent solutions "still somewhat rare"
- Most deployments are "small injections" of AI into existing processes
- Agent governance complexity acknowledged by Microsoft's own architect
- MCP highlighted as key enabler for ERP-connected agents
- No specific measurable deployment outcomes shared publicly

### 6. CUA success rates: 80% web, 35% desktop
**Source:** [Cloud Wars — "Microsoft Strengthens Copilot Studio"](https://cloudwars.com/ai/microsoft-strengthens-copilot-studio-to-help-enterprises-move-from-ai-assistants-to-ai-coworkers/) — [domain trade publication]
**Source:** [Forward Forever — "Beyond APIs: Computer Use in Copilot Studio"](https://forwardforever.com/beyond-apis-empowering-agents-with-computer-use-in-copilot-studio/) — [practitioner analysis]
**Date:** March 2026
**Agent level:** Team / Company
**What:** CUA success rates confirmed at ~80% for web applications and ~35% for desktop applications. Not intended for sensitive/high-risk scenarios (financial transactions, healthcare operations). New enhancements: Claude Sonnet 4.5 as model option, Cloud PC pools for auto-scaling, built-in credentials (single sign-in), Purview monitoring. Academic benchmark (UI-CUBE) previously showed 9-19% for complex workflows vs 97.9% human — the 80% web / 35% desktop figures suggest improvement but only for basic tasks.
**Evidence level:** Level 1-2 (vendor-sourced metrics, no independent verification)
**Key claims:**
- CUA web success: ~80% (basic tasks only)
- CUA desktop success: ~35%
- Not for financial transactions or healthcare operations
- Claude Sonnet 4.5 now available as CUA model
- Cloud PC pools for scaling CUA infrastructure

### 7. Purview Insider Risk Management for agents delayed to May 2026
**Source:** [MC1200579 via mc.merill.net](https://mc.merill.net/message/MC1200579) — [domain trade publication / M365 message center archive]
**Source:** [m365admin.handsontek.net](https://m365admin.handsontek.net/microsoft-purview-insider-risk-management-insider-risk-management-risky-agents/) — [domain trade publication]
**Date:** March 9, 2026 (timeline update)
**Agent level:** Company (security/governance)
**What:** Purview Insider Risk Management for AI agents — covering Copilot Studio and Azure AI Foundry agents — has been delayed. Originally "late March" GA, now pushed to "early May 2026" GA start and "late May" completion. Features: risky AI usage policies, agent workflow governance, insider risk scores for agents. Data Security Triage Agent enhancements in public preview (March), GA not until late June-July 2026.
**Evidence level:** Level 0 (vendor roadmap update, but the delay itself is informative)
**Key claims:**
- Insider Risk for agents delayed from late March to May 2026
- Data Security Triage Agent GA: late June-July 2026
- Signals: governance features slipping, not just agent features

### 8. E7 hidden costs: effective per-user cost can exceed $200/month
**Source:** [US Cloud — "Microsoft E7 and the New Economics of Enterprise AI"](https://www.uscloud.com/blog/microsoft-e7-and-the-new-economics-of-enterprise-ai/) — [practitioner analysis]
**Source:** [NPI Financial — "Microsoft 365 E7: What Enterprise Buyers Need to Know"](https://www.npifinancial.com/blog/microsoft-365-e7-what-it-is-what-s-inside-and-what-enterprise-buyers-need-to-know) — [practitioner analysis]
**Source:** [Office Watch — "E7: the Future or an Expensive Bundle?"](https://office-watch.com/2026/microsoft-365-e7-a-99-frontier-suite-the-future-or-an-expensive-bundle/) — [practitioner analysis]
**Date:** March 2026
**Agent level:** Company (pricing)
**What:** Multiple independent analyses flag that the $99/user/month E7 price is a floor, not a ceiling. Copilot Studio and Foundry agent workloads consume additional "Copilot Credits" on a pay-as-you-go basis — each agent trigger, model execution, or multi-step task burns credits. This can push effective per-user costs above $200/month. Copilot Cowork is still in preview and not a Day 1 GA feature for E7. Office Watch notes "gales of derisive laughter" at Microsoft calling it "the First Frontier Suite" given 3% Copilot adoption.
**Evidence level:** Level 2-3 (multiple independent practitioner analyses, convergent)
**Key claims:**
- $99/user base, but Copilot Credits can push to $200+/user
- Cowork NOT a Day 1 GA feature despite being part of the E7 story
- E7 priced for "fully-loaded knowledge workers" — wasteful for frontline/task workers
- 10% off 10+ seats, 15% off 100+ seats introductory offers
- E3 → $39/user, E5 → $60/user from July 1, 2026

### 9. Peter Mather practitioner walkthrough: Copilot Studio agent for edison365
**Source:** [Peter Mather blog Part 1](https://pwmather.wordpress.com/2026/02/28/getting-started-with-microsoft-copilot-studio-agents-part-1-end-user-walkthrough/) — [practitioner direct]
**Source:** [Peter Mather blog Part 2](https://pwmather.wordpress.com/2026/03/03/getting-started-with-microsoft-copilot-studio-agents-part-2-copilot-studio-walkthrough/) — [practitioner direct]
**Date:** February-March 2026
**Agent level:** Team
**What:** 13x Microsoft MVP Peter Mather built a Copilot Studio agent for edison365 (business transformation SaaS). Agent does portfolio/project management: status summaries, risk identification, schedule delay detection, ideation. Multi-turn conversational flows with clarification requests and backend data queries. Cross-platform (Teams, Copilot app). VS Code extension for Copilot Studio GA since January 2026. This is one of the few practitioner-documented builds — but it's from an MVP, not a typical business user. No production deployment metrics reported.
**Evidence level:** Level 2 (practitioner direct, single case, no production metrics)
**Key claims:**
- MVP-level practitioner needed for meaningful agent build
- Multi-turn conversational flows working in Copilot Studio
- VS Code extension for Studio GA since January 2026
- No production deployment metrics — demo/walkthrough only
- Demonstrates skill gap: this is not citizen-developer work

### 10. Microsoft's own agent deployment: 500K agents, "Microsoft HR" as case study
**Source:** [Grazitti Interactive — Copilot Studio Cases](https://www.grazitti.com/blog/build-customize-and-deploy-intelligent-agents-with-microsoft-copilot-studio/) — [domain trade publication]
**Date:** March 2026
**Agent level:** Company
**What:** Microsoft's HR team deployed a Copilot Studio assistant on their intranet (8M annual pageviews, 800K manual tickets). Claims: 60% query deflection, 21,000+ work hours saved, 27% ticket volume reduction. This is the only named business agent deployment with specific metrics — but it's Microsoft deploying Microsoft's product on Microsoft's platform. External validation is zero.
**Evidence level:** Level 0 (vendor case study — Microsoft reporting its own results)
**Key claims:**
- 60% query deflection
- 21,000+ hours saved
- 27% ticket reduction
- This is a chatbot/Q&A deflection use case, NOT an agentic deployment

## What I Looked For But Did Not Find

1. **Any independent Copilot Cowork deployment with measurable outcomes.** Zero. Still all vendor demos and LinkedIn enthusiasm.
2. **Any NON-Microsoft company with a production business agent on Copilot Studio with metrics.** Zero. Peter Mather's walkthrough is the closest — but it's a demo, not production, and built by a 13x MVP.
3. **Agent 365 beta user feedback beyond Rob Quickenden.** No additional practitioner reports.
4. **Copilot Cowork Frontier broader access announcement.** Still not materialized as of March 21.
5. **Any E7 purchase commitments or adoption signals.** Nothing — launches May 1.
6. **AI Agent & Copilot Summit specific customer deployment metrics.** Summit reported "small injections" of AI, not full agentic deployments. No public metrics from any presenter.
7. **Post-March-11 CVE-2026-26133 independent security analysis.** Patch confirmed, no in-depth analysis yet.

## Orientation

This supplemental research reinforces and deepens the cycle 24 picture with several important additions:

**Security is now a convergent concern (Level 3).** Three CVEs in early 2026, a second DLP bypass in 8 months, UK NHS affected, and Gartner presenting a dedicated Copilot security risk framework — this is no longer a theoretical worry. It is a pattern. Enterprise security teams are now treating Copilot itself as a risk surface, not just the agents built on it.

**Market share data is now at Level 3 evidence.** The Recon Analytics study (150K+ respondents) showing Copilot adoption dropping from 68% to 8% when alternatives are available — combined with persistently negative accuracy NPS — confirms the product quality problem is structural, not temporary. This is convergent with the practitioner reports and the stock decline.

**E7 pricing has hidden costs.** Multiple independent analyses confirm Copilot Credits can push effective E7 costs above $200/user/month. Combined with Cowork not being a Day 1 GA feature, the E7 value proposition at launch is significantly weaker than the marketing suggests.

**Copilot Cowork vs Claude Cowork: capability gap confirmed.** Independent analysis (with Gartner citation) confirms Cowork cannot interact with local files/apps — a fundamental limitation vs Claude Cowork. This matters for our curriculum: Copilot Cowork is an M365-only agent, not a general-purpose one.

**The summit confirmed what we suspected:** multi-agent autonomous solutions are "still somewhat rare" even among Microsoft's most enthusiastic enterprise customers. The reality is "small injections" of AI into existing processes.

**Bottom line unchanged but stronger:** Strongest governance vision, weakest deployment evidence. Security vulnerabilities are eroding the trust that governance is meant to build. The agent platform is being secured before the agents exist in production — and the security itself keeps breaking.

## State File Updates Needed

1. Add Copilot Cowork capability gap vs Claude Cowork (no local computer use, no local files)
2. Add CUA success rates (80% web, 35% desktop)
3. Add E7 hidden costs (Copilot Credits → $200+/user potential)
4. Update security section: second DLP bypass pattern, Gartner security framework presentation
5. Add Recon Analytics conversion data (68% → 8% when alternatives available)
6. Update Purview Insider Risk timeline: delayed from March to May 2026
7. Add AI Agent Summit finding: multi-agent solutions "still somewhat rare"
8. Add Microsoft HR chatbot case (vendor case study, not agentic — but only deployment with metrics)
