---
type: state
domain: platform
evidence_level: 2
platforms: [anthropic, claude-code, claude-cowork, antspace, agent-sdk]
nordic: false
updated: 2026-04-11
cycle: 96
answers:
  - "what is Anthropic's platform strategy?"
  - "what can business users do with Claude today?"
  - "how does Anthropic's three-layer play compare?"
  - "is Anthropic building a general-purpose agent platform?"
  - "what is the IPO timeline and what does it mean?"
---

# Anthropic — Claude / Claude Code — Platform State

Last updated: 2026-04-02 (cycle 70)
OODA cycles: 8

## Focus

Anthropic's ecosystem for **business users**. Initially developer-heavy, but Cowork + plugins signal a real business user surface is emerging.

## Key Verdict (as of 2026-04-02)

**Six-vector general-purpose agent platform, not just a coding tool.** Anthropic is building across: (1) Cowork (business user surface), (2) Agent SDK (developer harness), (3) Antspace (hosting/runtime, not yet public), (4) MCP + Agent Skills (open standards, 97M installs), (5) Computer Use + Dispatch (desktop automation + mobile), (6) Partner Network ($100M, Accenture/Deloitte/PwC). The IPO target (Q4 2026, $60B) creates urgency to demonstrate platform revenue. Anthropic captures 73% of new enterprise AI spend (Ramp, March 2026). Revenue doubled from $9B to $19B annualized in ~3 months. **But:** infrastructure fragility (109 incidents/90 days), two major security leaks in one week (Mythos + source code), and zero independent enterprise Cowork deployment evidence remain critical gaps. The platform thesis is real — the enterprise proof is not.

## The Six-Vector Platform Strategy (updated cycle 70)

**Previous framing:** Three-layer play (standards + engine + business surface). **Updated framing:** Six reinforcing vectors that collectively form a general-purpose agent platform.

```
Vector 1: COWORK — business user surface (plugins, marketplace, scheduled tasks, Dispatch)
Vector 2: AGENT SDK — developer harness (Python/TypeScript, general-purpose, not just coding)
Vector 3: ANTSPACE — hosting/runtime (not yet public; BYOC, Firecracker, Supabase)
Vector 4: MCP + AGENT SKILLS — open standards (97M installs, industry-wide adoption)
Vector 5: COMPUTER USE + DISPATCH — desktop automation + mobile (human-level OSWorld, any app)
Vector 6: PARTNER NETWORK — enterprise distribution ($100M, SI partners, certifications)
```

**How they reinforce:** Cowork uses Agent SDK harness. Cowork connects via MCP. Cowork loads Skills. Cowork controls legacy via Computer Use. Dispatch commands Cowork from phone. Antspace hosts what Cowork/Code builds. Partner Network distributes it all. Copilot Cowork distributes through Microsoft M365. One investment, every surface.

## The Three-Layer Platform Strategy (original framing, still valid)

### Layer 1: Open Standards as Infrastructure
**MCP** — 6,400+ servers, 97M monthly SDK downloads, Linux Foundation. Adopted by OpenAI, Google, Microsoft. ([Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/), Mar 2026)

**Agent Skills** — Open standard (Dec 2025). Folders with SKILL.md + scripts. Adopted by Microsoft, OpenAI, Cursor, Atlassian, Figma. Partner skills from Canva, Stripe, Notion, Zapier. "MCP provides connectivity, Skills provide procedural knowledge." ([Anthropic engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills); [The New Stack](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/), Feb 2026; [Simon Willison](https://simonwillison.net/2025/Dec/19/agent-skills/), Dec 2025)

**Strategic position:** Anthropic owns TWO foundational open standards. OpenAI adopted both. If every platform uses MCP + Skills, Claude's tools work everywhere.

### Layer 2: Model + Runtime Engine
**Claude models** — Opus 4.6 (14.5h METR horizon, 1M context), Sonnet 4.6. Best reasoning.
**Agent SDK** — Same engine as Claude Code, exposed as library. Python/TypeScript. Self-host only — no managed hosting. ([Docs](https://platform.claude.com/docs/en/agent-sdk/overview); [Production challenges](https://medium.com/@hugolu87/how-to-run-claude-agents-in-production-using-the-claude-sdk-756f9d3c93d8), Mar 2026)

### Layer 3: Business User Surface (NEW — emerging fast)
**Claude Cowork** — "Claude Code for the rest of your work." Desktop agent across computer environment. (Jan 2026 launch)
**Plugins** — "Mini apps" — skill+connector bundles for domain-specific work. Finance, HR, legal templates. Private enterprise marketplaces. Connectors: Google Workspace, DocuSign, FactSet, MSCI, LegalZoom. ([Blog](https://claude.com/blog/cowork-plugins-across-enterprise); [TechCrunch](https://techcrunch.com/2026/02/24/anthropic-launches-new-push-for-enterprise-agents-with-plugins-for-finance-engineering-and-design/), Feb 24, 2026)
**B2B Marketplace** — Apps from Snowflake, GitLab, Harvey AI, Replit, Rogo, Lovable. ([Digital Commerce 360](https://www.digitalcommerce360.com/2026/03/16/anthropic-launches-claude-b2b-marketplace-enterprise-ai-applications/), Mar 16, 2026)

**Cycle 66 updates (March 24):**
- **Self-serve Enterprise plans now available.** Previously sales-team-only. Any org can purchase directly. Single seat type: Claude + Claude Code + Cowork. Distribution acceleration move.
- **21 plugins total** (11 Jan 30, 10 more Feb 24). Plugin architecture: skills + slash commands + MCP connectors + sub-agents. Private enterprise plugin marketplaces. PwC building industry-specific plugins for regulated sectors.
- **Recurring + on-demand task scheduling** in Cowork. First persistent autonomous business workflow capability.
- **First independent plugin review:** Medium/@boredhead rated all 21 plugins — first practitioner-level Cowork assessment found. ([Medium](https://medium.com/@boredhead/rating-claude-cowork-plugins-eba04fb1327f), Mar 2026)
- **Named enterprise signals (Level 0):** Thomson Reuters (CEO Steve Hasker), NYSE (CTO Sridhar Masam), Epic (SVP R&D Seth Hain) at launch event. All vendor-channeled.
- **Revenue signal:** Claude Code at "$1 billion in revenue — fastest-growing product of all time" per Anthropic's White. ([CNBC](https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html), Feb 2026)

**Cycle 68 updates (March 24, 10:00):**
- **Computer Use research preview launched March 23.** Claude Code and Cowork can click, scroll, navigate web, open apps, fill spreadsheets on macOS. Permission-first safety model. Prioritizes direct integrations first, falls back to screen-based control. Pro/Max subscribers only. macOS only. ([SiliconAngle](https://siliconangle.com/2026/03/23/anthropics-claude-gets-computer-use-capabilities-preview/), Mar 23, 2026)
- **Cowork Dispatch — live March 17, ~50% success rate on complex tasks (Apr 2026 check).** Mobile-triggered desktop agent control. Research preview launched Mar 17. Early practitioner test: ~50% success rate, browser automation and complex task chains failing. Bug fix shipped March 29 (Releasebot changelog: "Fixed message delivery in Cowork Dispatch"). Live but rough in Q1 2026. ([Latent Space](https://www.latent.space/p/ainews-claude-cowork-dispatch-anthropics), Mar 17, 2026) — [domain trade publication]
- **Anthropic CCO adoption claim (Apr 1, Level 1).** Paul Smith stated Cowork week-1 adoption "stronger than Claude Code." No user numbers. Self-reported. ([Bloomberg](https://www.bloomberg.com/news/articles/2026-04-01/anthropic-executive-sees-cowork-agent-as-bigger-than-claude-code), Apr 1, 2026) — [general press, executive opinion]
- **Pentagon court hearing March 24.** New filings reveal Pentagon told Anthropic they were "very close" one week after Trump declared relationship terminated. Anthropic cited "technical misunderstandings." Senator Warren called designation "retaliation." Judge Lin hearing today. ([TechCrunch](https://techcrunch.com/2026/03/20/new-court-filing-reveals-pentagon-told-anthropic-the-two-sides-were-nearly-aligned-a-week-after-trump-declared-the-relationship-kaput/), Mar 20)
**Cycle 96 updates (April 11, 2026):**
- **Claude Cowork GA confirmed April 9, 2026.** Loses "research preview" label. Available on all paid plans (Pro, Team, Enterprise) on macOS and Windows. Six enterprise capabilities: role-based access controls (SCIM/IdP), group spend limits, usage analytics, expanded OpenTelemetry SIEM integration, Zoom MCP connector, per-tool connector controls. ([9to5Mac](https://9to5mac.com/2026/04/09/anthropic-scales-up-with-enterprise-features-for-claude-cowork-and-managed-agents/), Apr 9, 2026) — [tech press]
- **Simon Willison — first independent practitioner review of Claude Cowork.** Tested workflow: reviewing 46 unpublished blog drafts, ran 44 web searches autonomously to verify publication status. Architecture: `/sessions/zealous-bold-ramanujan/mnt/` path confirms containerized filesystem sandbox. Assessment: "regular Claude Code wrapped in a less intimidating interface." Prompt injection risk acknowledged. Display bugs noted. ([simonw.substack.com](https://simonw.substack.com/p/first-impressions-of-claude-cowork), Apr 2026) — [practitioner direct, Level 2]
- **Moody's Agentic Solutions (MAS) — MCP integration in Claude Desktop/Enterprise.** Credit analysis agents (memo generation, peer comparisons, scorecard assessments) + compliance agents (entity profiling, ownership structure mapping across 600M entities/2B ownership links, adverse media, sanctions checks) available as integrated workflows in Claude. MCP integration: outputs rendered as interactive reports inline within Claude, no context switching. Announced April 9, 2026. Vendor press release only — no independent verification. ([BusinessWire](https://www.businesswire.com/news/home/20260409047490/en/Moodys-Brings-Credit-and-Compliance-Workflows-Directly-into-Anthropics-Claude), Apr 9, 2026) — [vendor press release, Level 0 for deployment claims; candidate for finance/compliance domain watch]
- **Antspace: 23rd consecutive cycle with zero public acknowledgment.** No change from cycle 95. Still staging. BYOC not available. Managed Agents (GA Apr 8) is a separate, distinct product from Antspace.

**Cycle 98 updates (April 14, 2026):**
- **Claude Cowork — second independent practitioner review found (Paweł Józefiak, March 24).** Author has been building a custom AI agent for months on a dedicated Mac Mini with 25 background processes. Core assessment: "a good sub-agent, not your agent." Key finding: no persistent memory across sessions — "Each session is mostly fresh." Tested 50+ service connectors (Google Calendar, Slack, Gmail, Linear, Jira). Computer use ~50% success rate (citing MacStories). Specific failures: opening apps on Mac, sending screenshots via iMessage, listing Todoist tasks. Characterizes Cowork as "a stripped and limited version of Claude Code." ([thoughts.jock.pl](https://thoughts.jock.pl/p/claude-cowork-dispatch-computer-use-honest-agent-review-2026), Mar 24, 2026) — [practitioner direct, Level 2]. **PATTERN: Both independent reviews (Willison, Józefiak) converge on the same limitation: Cowork is Claude Code with a friendlier UI, not a persistent agent with long-term memory.** That's now Level 3 convergence on one specific weakness.
- **Cowork independent review count: 2 confirmed (Willison + Józefiak).** Still need enterprise deployment reports — all three named adopters (Zapier, Jamf, Airtree) remain vendor-sourced only.
- **PayPal webinar (April 16) — agenda confirmed, named speaker revealed.** Speaker: Jarred Keneally, Senior Director of Product Management, AI Technology at PayPal. Also: John Lopus (Anthropic Applied AI), Amber Yin (Anthropic Customer Success). Agenda: RBAC in practice, group spend limits, monitoring and admin controls. Key signal: PayPal will share "what's working, what they're watching, and how these controls have shaped their deployment plan." This is the first time a named enterprise is presenting their own Cowork deployment plan (not a vendor-sourced quote). Watch for specifics: which teams, which workflows, what outcomes. Still pre-event — not yet evidence. ([anthropic.com/webinars](https://www.anthropic.com/webinars/deploying-cowork-across-the-enterprise-with-paypal), Apr 2026) — [vendor page, bare facts for speaker/agenda; watch for independent signals post-April 16]
- **Managed Agents — first independent developer analysis found (unicodeveloper, Medium, April 2026).** Author: developer with 4.2K Medium followers. No independent testing — summarizes Anthropic's claims and raises structural concerns: (1) multi-agent coordination and self-evaluation still in research preview, separate access required; (2) lock-in risk confirmed — Claude-only, no model flexibility; (3) data privacy: all agent execution through Anthropic infrastructure; (4) missing persistent agent memory and scheduled recurring tasks. Pricing concern at fleet scale ($0.08/session-hour compounds). ([medium.com/@unicodeveloper](https://medium.com/@unicodeveloper/claude-managed-agents-what-it-actually-offers-the-honest-pros-and-cons-and-how-to-run-agents-52369e5cff14), Apr 2026) — [practitioner direct, Level 1 opinion, no independent testing]. Developer community concerns echo enterprise concerns: infrastructure lock-in + missing features.
- **Anthropic at Google Cloud Next (April 22-24) — session agenda published.** Booth #2021. Sessions: "Building Multi-Agent Systems That Actually Work," "Demystifying Evals at Agentic Frontier," "After Software: Anthropic's Vision for Enterprise AI," "Build agents at scale: How Shopify powers Sidekick with Claude on Vertex AI" (April 22), "Long-Running Agents: Lessons from the Enterprise Frontier" (April 23). Shopify's Sidekick is the first named enterprise customer to present at a public conference. Watch for independent deployment specifics from Shopify. ([anthropic.com/events](https://www.anthropic.com/events/anthropic-at-google-cloud-next-2026), Apr 2026) — [vendor page, bare facts]
- **Microsoft Copilot Cowork — first independent practitioner review (Rob Quickenden, MVP).** Confirmed: "Copilot Cowork" (Microsoft Frontier product using Anthropic's Claude under the hood) is a DISTINCT product from "Claude Cowork" (Anthropic's own product). Both exist simultaneously. Quickenden tested during MVP Summit preview access. Capabilities: multi-step research/document creation, Word/PPT/Excel output, queued task parallelism, data sensitivity label preservation, 20 custom user skills. Honest assessment: "document quality far superior to what we have seen in Copilot to date" — attributed explicitly to Anthropic's Claude models. This is the first independent confirmation that the Anthropic-Microsoft integration produces user-visible quality improvement, validating Ben Thompson's earlier strategic claim. ([robquickenden.blog](https://robquickenden.blog/2026/04/copilot-cowork-walkthrough/), Apr 2026) — [practitioner direct, Level 2]
- **Community feedback aggregation — "11GB Deletion" autonomy incident + credit burn pattern.** CoworkHow (third-party, not affiliated with Anthropic) compiled user feedback from Reddit, X, and developer forums. Key findings: (1) **Autonomy incident:** one user asked Cowork to "clean up" a folder — Cowork deleted 11GB of files it deemed "clutter." Real risk: write permissions require scope guardrails. (2) **Credit burn:** users report burning "$50 of credits in one afternoon" debugging. (3) **UI sluggishness:** Electron app scroll lag, tab-switching delays. (4) **Integration failures:** calendar authentication failures, Google Drive timeouts. (5) **Where it works:** legacy code refactoring, multi-file operations, documentation generation. ([coworkhow.com](https://coworkhow.com/guides/user-feedback-summary), Apr 2026) — [practitioner analysis, aggregated. Evidence level: Level 2 by community pattern]
- **Antspace: 24th consecutive cycle with zero public acknowledgment.** Still staging. No change.

**Cycle 97 updates (April 13, 2026):**
- **Claude Managed Agents — CORRECTION: public beta, not GA.** Cycle 95 entry was inaccurate; multiple tech press confirm "public beta" status as of April 8. Not full GA. ([The Decoder](https://the-decoder.com/anthropic-launches-managed-infrastructure-for-autonomous-ai-agents/), Apr 8, 2026; [SiliconAngle](https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/), Apr 8, 2026) — [tech press]
- **Critical enterprise limitation confirmed: Managed Agents runs on Anthropic infrastructure ONLY — not through Bedrock or Vertex AI.** The Decoder explicitly: "For companies with multi-cloud strategies, that could be a significant limitation." Confirmed by datacenterknowledge.com. This means for AWS-native or Azure-native enterprises, Managed Agents creates a new data transit pathway outside existing cloud governance. ([The Decoder](https://the-decoder.com/anthropic-launches-managed-infrastructure-for-autonomous-ai-agents/), Apr 8, 2026) — [tech press]
- **Nordic/EU implication (double constraint):** BOTH Cowork (outside EU Data Boundary) AND Managed Agents (Anthropic-infra-only) require explicit compliance review for Nordic regulated industries. Neither is available through cloud partners with EU data residency guarantees. (Apr 2026)
- **Managed Agents early adopters — ALL Anthropic-sourced (Level 0):** Notion (private alpha, three-layer architecture: Custom Agents / MCP / Managed Agents), Rakuten ("agents across product, sales, marketing, finance, HR — each reportedly up and running within a week" — Anthropic-sourced, not Rakuten-confirmed), Asana, Sentry (debugging+patch agent), Vibecode. Zero independently confirmed. ([The Decoder](https://the-decoder.com/anthropic-launches-managed-infrastructure-for-autonomous-ai-agents/), Apr 8, 2026)
- **Cowork early adopters — ALL vendor-cited (Level 0):** Zapier (Larisa Cavallaro, AI Automation Engineer — 15 SQL queries from 6 engineering systems), Jamf (45-min performance review workflow), Airtree (board prep workflow). Anthropic webinar with PayPal scheduled April 16 — first potential named enterprise signal from non-vendor channel. ([claude.com/blog/cowork-for-enterprise](https://claude.com/blog/cowork-for-enterprise), Apr 9, 2026) — [vendor press release]
- **Non-engineering Cowork usage — vendor claim, unverified:** "Vast majority of Cowork usage from outside engineering teams — operations, marketing, finance, legal." No quantification, no independent confirmation. Watch for PayPal webinar (Apr 16) and accumulating practitioner reports as the only way to verify.

**Cycle 95 updates (April 10, 2026):**
- **Claude Managed Agents: public beta launched April 8, 2026.** Closes the "no managed hosting" gap noted since Cycle 66. A new cloud service (separate from Antspace) that automates agent infrastructure: container configuration, state management, tool orchestration, error recovery. Pricing: $0.08/session-hour + Claude model fees + $10/1,000 web searches. Named early adopters: Notion Inc., Rakuten Group Inc., Asana Inc. Two features still in research preview: multi-agent spawning and automatic prompt refinement (internal claim: "+10 points task success"). The "months to weeks" development claim is vendor-sourced, not independently verified. ([SiliconAngle](https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/), Apr 8, 2026; author: Maria Deutscher) — [tech press, bare facts]
- **Managed Agents ≠ Antspace.** These are two distinct products. Managed Agents = cloud-hosted service (Anthropic runs it). Antspace = self-hosted PaaS/BYOC (enterprise runs it in their own K8s). Antspace remains staging. Managed Agents is public beta.
- **Antspace BYOC: Still staging, no change from Cycle 93.** No new public acknowledgment from Anthropic. BYOC path for enterprise K8s remains in code, not available to customers.

**Cycle 93 updates (April 8, 2026):**
- **Antspace status: Still staging, not GA.** Binary in Claude Code's Firecracker MicroVM contains `staging-` version prefix. Reverse-engineered by @AprilNEA (X.com) in March 2026. Anthropic has not publicly acknowledged Antspace. BYOC API endpoints exist in code but no enterprise availability confirmed. Zero public mentions on Anthropic's website, blog, GitHub, or job pages. Still internal/staging infrastructure. ([AprilNEA/blog](https://aprilnea.me/en/blog/reverse-engineering-claude-code-antspace), Mar 2026; [AprilNEA/X](https://x.com/AprilNEA/status/2034209430158619084)) — [practitioner analysis]
- **Antspace promotion path still theoretical:** BYOC pattern (run environment-runner in enterprise K8s, orchestrated by Anthropic API) is in code but not available to enterprise customers. "Same artifact from personal to production" promotion path exists in architecture but not in product. The gap from synthesis.md remains open.
- **Copilot Cowork Frontier (March 30):** Zero independent hands-on reviews as of April 8 (30+ days post-announcement). All coverage vendor-channeled. Capital Group testimonial is vendor-cited. Futurum analyst skeptical ("proof point does not yet exist at scale"). GA scheduled May 1 as part of E7 Frontier Suite.

**Cycle 91 updates (April 6, 2026):**
- **Claude Mythos confirmed in early access testing.** Anthropic spokesperson confirmed (not just leaked) that Mythos (codename Capybara) is in early access with select customers. "A step change and most capable we've built to date." Cybersecurity-first rollout: being released first to defensive security organizations — reportedly "far ahead of any other AI model in cyber capabilities." No public general access date. Polymarket: June 30 (54% implied probability). Adds fourth pricing tier above Opus. Benchmark claims from leaked draft are vendor-adjacent until independent evaluators report. ([Fortune](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/), general press, Mar 26, 2026) — Level 1

**Cycle 90 updates (April 5, 2026):**
- **Claude Mythos leaked (April 2, 2026).** Described as Anthropic's most capable model to date. Launch timing unconfirmed as of April 5. API housekeeping already happening: 1M token context beta retiring April 30 for Sonnet 4.5/4; Message Batches API max_tokens raised to 300k for Opus/Sonnet 4.6. [Bare fact; unconfirmed source] — UPDATED: Cycle 91 confirms spokesperson confirmation (not just leak).
- **Copilot Cowork (Frontier preview March 30):** Entered broader Frontier preview. Zero independent hands-on reviews as of April 5 (26+ days since announcement). — UPDATED cycle 91: First review found (Day 27, partner-ecosystem reviewer).

**Cycle 69 updates (March 24, 14:00):**
- **Computer Use day 2:** CNBC mainstream coverage ([CNBC](https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html)). WorkOS comparison: Claude operates on user's real desktop (macOS) vs OpenAI's sandboxed virtual computer — fundamental architectural difference for business system access ([WorkOS](https://workos.com/blog/anthropics-computer-use-versus-openais-computer-using-agent-cua)). **Vercept acquisition ($50M, Feb 25)** explains technical lineage — purpose-built CV team (Girshick). UiPath stock fell 3.6% — market reads as RPA killer ([TechCrunch](https://techcrunch.com/2026/02/25/anthropic-acquires-vercept-ai-startup-agents-computer-use-founders-investors/)). **Safety: Opus 4.6 risk report** flags "elevated susceptibility to harmful misuse" in computer use settings. Claude Code weaponized in Mexican gov't cyberattack (150GB stolen) ([SecurityWeek](https://www.securityweek.com/hackers-weaponize-claude-code-in-mexican-government-cyberattack/)). Zero practitioner reviews yet. Re-run in 7 days.

**Cycle 70 updates (April 2, 2026) — Platform Deep Dive:**

**IPO and financial trajectory:**
- IPO as soon as Q4 2026, targeting $60B+ raise. Current valuation $380B (Feb 2026 round). ([The Information via Investing.com](https://www.investing.com/news/stock-market-news/anthropic-considers-ipo-as-soon-as-q4-2026-the-information-4584016), Mar 27, 2026)
- Revenue: $19B annualized by March 2026, up from $9B at year-end 2025. Revenue doubled in ~2 months. ([Let's Data Science](https://letsdatascience.com/blog/anthropic-revenue-doubled-60-billion-ipo-october-2026))
- Claude Code alone: $2.5B annualized by Feb 2026, doubling since Jan 1.
- 80% enterprise revenue mix. 8 of Fortune 10 are customers. 500+ spending $1M+/year.
- Capital efficiency: $0.23 ARR per dollar raised vs OpenAI $0.11. Gross margins trending toward ~40%.

**Ramp data — hard enterprise adoption numbers (Level 3):**
- Anthropic captured **73% of new enterprise AI spend** in past 10 weeks (was 50/50 with OpenAI). ([Ramp AI Index March 2026](https://ramp.com/velocity/ai-index-march-2026))
- 24.4% of Ramp businesses now pay for Claude (up from ~4% a year ago).
- 4.9% month-over-month adoption growth — largest monthly gain ever tracked.
- 55% of orgs with a gen AI vendor use Anthropic (up 32pp YoY).
- New businesses choosing AI first time: ~70% choose Anthropic.
- Source: [Ramp](https://ramp.com/velocity/ai-index-march-2026) [practitioner data — actual spend, not survey]

**Cowork "bigger than Code" signal:**
- Bloomberg (Apr 1): CCO Paul Smith says Cowork adoption in "first few weeks" exceeds Claude Code's comparable period. Engineering = 2-5% of staff; Cowork targets the other 95-98%. ([Bloomberg](https://www.bloomberg.com/news/articles/2026-04-01/anthropic-executive-sees-cowork-agent-as-bigger-than-claude-code)) [general press — executive quote, treat as vendor claim until independently verified]

**Agent SDK renamed from "Claude Code SDK":**
- Now "Claude Agent SDK" — described as "a powerful, general-purpose agent harness adept at coding, as well as other tasks." Anthropic engineering blog confirms internal use for deep research, video creation, note-taking — "almost all of their major agent loops." ([Anthropic engineering](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))

**Claude Mythos leak (Mar 26):**
- Next-gen model above Opus tier. "Step change" in capabilities. "Dramatically higher" than Opus 4.6 on coding, reasoning, cybersecurity. "Currently far ahead of any other AI model in cyber capabilities." Available only to select clients for cybersecurity defense. Not publicly released. Discovered via misconfigured data store. ([Fortune](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/); [CoinDesk](https://www.coindesk.com/markets/2026/03/27/anthropic-s-massive-claude-mythos-leak-reveals-a-new-ai-model-that-could-be-a-cybersecurity-nightmare/))

**Claude Code source code leak (Mar 31):**
- 500K lines, 1,900 files accidentally included in NPM package. "Process error" due to fast release cycle. Became fastest-growing GitHub repo before DMCA takedowns. Overbroad DMCA hit thousands of unrelated repos, later scaled back. Competitors can now reverse-engineer the agent harness. ([Bloomberg](https://www.bloomberg.com/news/articles/2026-04-01/anthropic-accidentally-releases-source-code-for-claude-ai-agent); [BleepingComputer](https://www.bleepingcomputer.com/news/artificial-intelligence/claude-code-source-code-accidentally-leaked-in-npm-package/); [Fortune](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak-second-security-lapse-days-after-accidentally-revealing-mythos/))

**Two leaks in one week = operational risk signal.** Mythos + source code leaks in 5 days. Both operational process failures, not external attacks. For an IPO-bound company branding on safety, this is a credibility risk.

**Pentagon conflict update:**
- Federal judge blocked Pentagon's supply chain risk designation. "Nothing in the governing statute supports the Orwellian notion that an American company may be branded a potential adversary for expressing disagreement with the government." Both sides appealing. Conflict ongoing. ([CNN](https://www.cnn.com/2026/03/26/business/anthropic-pentagon-injunction-supply-chain-risk))

**$50B infrastructure investment:**
- American AI infrastructure (data centers with Fluidstack in TX and NY). First sites live 2026. This isn't just training — at this scale, it must include inference and hosting infrastructure (Antspace?). ([Anthropic](https://www.anthropic.com/news/anthropic-invests-50-billion-in-american-ai-infrastructure))

**Dispatch shipped (Mar 17):**
- Assign tasks from iPhone, Claude executes on Mac desktop. Persistent cross-device conversation thread. QR code pairing. Max initially, then Pro. ([CNBC](https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html))

**Computer Use benchmark update:**
- 72.5% on OSWorld vs human experts 72.4% = human-level performance on general computer use tasks. ([MacRumors](https://www.macrumors.com/2026/03/24/claude-use-mac-remotely-iphone/))

**MCP at 97M installs:**
- 4,750% growth in 16 months (from ~2M at Nov 2024 launch). OpenAI, Google DeepMind, Cohere, Mistral all ship MCP-compatible tooling. ([Artur Markus AI Unfiltered](https://www.arturmarkus.com/anthropics-model-context-protocol-hits-97-million-installs-on-march-25-mcp-transitions-from-experimental-to-foundation-layer-for-agentic-ai/))

**Ben Thompson / Stratechery analysis:**
- Anthropic enterprise business "reaching escape velocity." Got it right by focusing almost entirely on enterprise market. But notes AI models are commoditizing "faster than anyone predicted." Government conflict increases importance of finding compromise. ([Stratechery](https://stratechery.com/2026/anthropic-and-alignment/); [Stratechery](https://stratechery.com/2026/anthropics-skyrocketing-revenue-a-contract-compromise-nvidia-earnings/))

**Certifications** — "Claude Certified Architect" launched Mar 12. AWS/Kubernetes playbook. ([IntuitionLabs](https://intuitionlabs.ai/articles/claude-enterprise-deployment-training-guide-2026), 2026)
**$100M Partner Network** — Accenture (30K), Deloitte (350K), PwC, Infosys. ([Anthropic](https://www.anthropic.com/news/claude-partner-network), 2026)

## Distribution Strategy: Own Platform + Power Others

### Microsoft Copilot Cowork (the big deal)
Claude model + same agentic harness as Claude Cowork, running in M365 tenants. Part of E7 ($99/user/mo). Despite Microsoft's $13B in OpenAI, they built their newest M365 flagship on Claude. $30B Azure compute deal (Nov 2025). Research Preview, broader access late March 2026. ([Microsoft blog](https://www.microsoft.com/en-us/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/); [Fortune](https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/); [GeekWire](https://www.geekwire.com/2026/microsofts-new-copilot-cowork-integrates-anthropics-claude-in-rollout-of-new-e7-licensing-tier/), Mar 2026)

### Also available via:
- Google Vertex AI
- Amazon Bedrock
- Direct (claude.ai / API)

**Channel tension:** Anthropic building Cowork while also powering Copilot Cowork. Long-term, this creates conflict with Microsoft.

## Computer Use — The Legacy Integration Sleeper

61.4% on OSWorld vs competitors' 7.8%. 94% on Pace Insurance Benchmark. Turns the desktop into an integration layer for systems with no API — mainframes, Citrix, legacy ERPs. Claude Sonnet 4.5 available in Copilot Studio for Computer Use agents (beta). ([Brainroad](https://brainroad.com/claude-computer-use-what-it-means-for-ai-agents-in-2026/), 2026)

**For enterprise reality:** This solves the "no API" problem. Your agent can interact with ANY software the human can see — including legacy systems none of the connector-based platforms can reach.

## Personal → Team → Company Progression

| Level | Anthropic product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Claude Cowork + plugins + Computer Use + Dispatch + scheduled tasks | Shipping (Jan-Mar 2026) | Full desktop agent: plugins, MCP connectors, Computer Use (human-level OSWorld), mobile Dispatch, recurring tasks. No independent deployment reports of business outcomes. |
| Personal (via Microsoft) | Copilot Cowork | Research Preview (Mar 2026) | Claude in M365 E7 ($99/user/mo). No user reports yet. |
| Team | Claude Team/Enterprise + private plugin marketplaces | Shipping/Announced | Plugin sharing via private marketplaces. Self-serve Enterprise plans now available. No evidence of team agent workflows. |
| Company | Agent SDK + enterprise plug-ins + B2B marketplace + BYOC (Antspace) | Emerging | Agent SDK is general-purpose (renamed from Code SDK). BYOC in binary but not public. Certifications launched. $100M Partner Network. |
| Promotion path | Plugin → marketplace → SDK deployment | Emerging | Plugin architecture enables promotion (personal plugin → team marketplace → company standard → SDK-built custom agent). Not documented as designed workflow but architecture supports it. |

## Risks and Weaknesses

### Infrastructure fragility — LEVEL 3 CONVERGENCE (CRITICAL)
**109 incidents in the last 90 days** (28 major outages, 81 minor), median duration 1h 8m. ([StatusGator](https://statusgator.com/services/claude), Mar 2026)

Timeline of recent failures:
- Feb 27–Mar 5: 14 incidents when ChatGPT users flooded Claude. API spiked 300%. Enterprise timeout errors. ([WebProNews](https://www.webpronews.com/claudes-infrastructure-crisis-what-the-chatgpt-exodus-really-means-for-anthropic/); [TechCrunch](https://techcrunch.com/2026/03/02/anthropics-claude-reports-widespread-outage/), Mar 2026)
- March 11: Stalled chats, auth errors, "service unavailable." ([Medium](https://medium.com/@manzonjj/why-claude-keeps-crashing-unprecedented-demand-fragile-infrastructure-and-a-second-outage-in-24-50a64469e869), Mar 2026)
- March 17: 6,800+ Downdetector reports, surging to 10,000+. ([GV Wire](https://gvwire.com/2026/03/17/claude-goes-down-for-thousands-downdetector-reports/))
- March 18: Elevated errors on Claude.ai, Claude Code login affected.
- March 21: Elevated error rates on Opus and Sonnet 4.6.

**Anthropic SRE at QCon London (March 19):** Alex Palcuie (ex-Google Cloud SRE): "Claude goes down more often than any of us would like. Earlier today, I was involved in an incident, even if I'm at a conference." Has been using Claude for incident response since January — excels at log analysis ("reads at the speed of I/O") but "consistently confuses correlation with causation." Produces "80% story that's pretty and convincing" but misses root causes. NYE fraud detection success: Claude found 4,000 suspicious accounts that a human SRE would have missed. But: "It would be hypocritical to say Claude fixes everything. My team exists, we're hiring." Skills atrophy concern: AI use could degrade SRE skills over time. ([The Register](https://www.theregister.com/2026/03/19/anthropic_claude_sre/), domain trade publication, Mar 2026)

**Uptime metrics (90 days):** API 99.34%, Claude Code 99.57%, Claude for Government 99.85%.

Claude Code now accounts for 4% of all GitHub commits — demand outstripping infrastructure. Enterprise architect quoted: "raised red flags about single-provider risk." Plans: $5B compute spend in 2026.

### Security vulnerabilities
CVE-2026-21852 (5.3 severity) — repo config manipulation to steal API keys. Shell command execution in untrusted repos. ([DevOps.com](https://devops.com/security-flaws-in-anthropics-claude-code-risk-stolen-data-system-takeover/), 2026)

### Political risk
Pentagon dispute over AI safeguards. Potential "supply-chain threat" designation. Federal agencies told to stop using Anthropic products. ([CNBC](https://www.cnbc.com/2026/02/26/anthropic-pentagon-ai-amodei.html), Feb 26, 2026)

### Token efficiency
3-4x overhead vs Codex. No evidence of Anthropic addressing this. $5B compute addresses capacity, not per-token cost.

### Scale gap
~40-50M monthly actives vs OpenAI ~200M weekly actives. Consumer brand awareness much lower.

## MCP Enterprise Roadmap — Third-Party Gateways Filling the Gap (Level 2-3)

Four priorities: transport scalability, agent communication, governance, enterprise readiness. Enterprise items will ship as **extensions, not core spec changes.** ([Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/); [New Stack](https://thenewstack.io/model-context-protocol-roadmap-2026/), Mar 2026)

**Third-party MCP gateways converging on the governance gap (4+ independent solutions):**
- **MintMCP:** SOC 2 Type II, SSO/OAuth, real-time tracing, HIPAA/GDPR export. ([Help Net Security](https://www.helpnetsecurity.com/2026/02/06/mintmcp-ai-agents-platform/), Feb 2026)
- **Stacklok (ToolHive):** Identity, policy enforcement, OTel telemetry in Kubernetes. ([Stacklok blog](https://stacklok.com/blog/best-mcp-platforms-for-teams-that-need-access-control-and-audit-logs-2026/), 2026)
- **Lunar.dev MCPX:** Immutable audit trail for compliance.
- **Itential:** RBAC, SSO, audit for infrastructure automation.
- **Scalekit:** Detailed analysis of SSO and scoped auth in enterprise MCP. ([Scalekit](https://www.scalekit.com/blog/enterprise-mcp-how-identity-sso-and-scoped-auth-actually-work), 2026)

**Key insight:** MCP governance is an **ecosystem play**, not an Anthropic-provided solution. Enterprises must select and deploy a gateway layer themselves. This is a training module implication.

## Antspace — Anthropic's Hidden PaaS Platform (BREAKING)

**Discovered March 18, 2026** by AprilNEA, who reverse-engineered the binaries inside Claude Code's Firecracker MicroVM. This is a big find.

**What it is:** A Platform-as-a-Service built by Anthropic — essentially a Vercel competitor. Name likely from "Ant" (internal Anthropic nickname) + "Space" (hosting). Anthropic built a full deployment protocol from scratch rather than wrapping Vercel's API — signals strategic platform investment.

**The full-stack flow (envisioned):**
1. User describes what they want in natural language
2. Claude generates the app in "Baku" (internal codename for claude.ai's web app builder — Vite + React + TypeScript)
3. Supabase database auto-provisioned via MCP tools
4. App deployed to Antspace
5. Live application — user never leaves Anthropic's ecosystem

**Technical details:**
- Claude Code Web runs in Firecracker microVM (4 vCPUs, 16GB RAM, 252GB disk)
- Core binary (`environment-runner`, 27MB Go executable, built with go1.25.7) from Anthropic monorepo (`github.com/anthropics/anthropic/api-go`). **Not stripped** — full debug symbols intact.
- Binary contains both a `VercelClient` and an `AntspaceClient` — Antspace is the default deploy target, Vercel is the alternative
- Three-stage deploy: create deployment (POST to control plane) → upload `dist.tar.gz` (multipart, size-limited) → stream NDJSON status (packaging → uploading → building → deploying → deployed)
- Version string prefixed with `staging-` — early/internal but protocol is production-grade

**Baku (web app builder) details:**
- Template: Vite + React + TypeScript from `/opt/baku-templates/vite-template`
- Dev server auto-managed via supervisord
- File organization: `.baku/drafts/` and `.baku/explorations/`
- Git commits authored as `claude@anthropic.com`, local-only version control
- Pre-stop hooks prevent session termination if uncommitted changes, Vite errors, or TypeScript errors exist

**Supabase integration — 6 MCP tools auto-available:**
1. `provision_database` — on-demand Supabase project creation
2. `execute_query` — SQL execution
3. `apply_migration` — versioned schema changes + auto type generation
4. `list_migrations` — migration history
5. `generate_types` — TypeScript regeneration from schema
6. `deploy_function` — Supabase Edge Functions deployment

**BYOC (Bring Your Own Cloud) for enterprises:**
- Two environment implementations: `anthropic` (Firecracker MicroVMs) and `byoc` (enterprise self-hosted)
- BYOC: default session mode `resume-cached`, custom auth, smart git handling, Kubernetes integration (`podmonitor` package)
- 7-endpoint API surface: `/v1/environments/whoami`, work polling/ack, session context, code signing, WebSocket tunnel, Supabase proxy

**Antspace vs Vercel (from binary analysis):**
| Aspect | Vercel | Antspace |
|--------|--------|----------|
| File upload | SHA-based per-file dedup | Single tar.gz |
| Build | Remote | Local (`npm run build`) |
| Status | Polling-based | Streaming NDJSON |
| Public API | Documented | Completely internal |

**Why it matters:** Anthropic is making the play to own the entire stack — from AI model to code runtime to hosting. As Maya Zehavi noted: they're gathering data on what people build with Claude to offer a more optimized end-to-end platform. This changes the three-layer strategy to potentially four layers: standards + engine + business surface + **hosting/runtime**. Competes against Vercel/Netlify (hosting), Replit/Lovable/Bolt (AI generation), and Supabase/Firebase (managed backends) simultaneously.

**Implication for our framework:** This could solve the "where does the app run?" enabler (Pattern 13) — if Anthropic ships Antspace, the runtime question has an answer for Claude-built apps. The BYOC + Kubernetes support suggests enterprise-readiness is explicitly in scope, not an afterthought.

**Source type: [practitioner direct]** — reverse engineering of actual binaries, not vendor announcement.
- [AprilNEA's full technical analysis](https://aprilnea.me/en/blog/reverse-engineering-claude-code-antspace) (Mar 18, 2026)
- [AprilNEA's X thread](https://x.com/AprilNEA/status/2034209430158619084)
- [Maya Zehavi's analysis](https://x.com/mayazi/status/2034282767693873492)
- [WEEX coverage](https://www.weex.com/news/detail/reverse-engineering-claude-code-reveals-anthropicas-undisclosed-paas-platform-antspace-built-in-baku-self-hosted-full-stack-ecosystem-already-taking-shape-386582) [republished practitioner analysis]
- [Hacker News discussion](https://news.ycombinator.com/item?id=47433685) (minimal engagement so far)

## What We Need To Learn (next cycles)

- [~] Cowork plugin adoption — who's building plugins? What for? Any business user reports? **Partial: One PM plugin review found (Medium, Mohit Aggarwal — [link](https://medium.com/@mohit15856/i-used-claude-coworks-product-management-plugin-for-a-month-honest-review-d38f25348a6d)). No enterprise deployment reports.**
- [~] Copilot Cowork Frontier rollout — now in Frontier early access (March 30). Capital Group and Coca-Cola Beverages Africa cited as users — vendor-sourced, unverified.
- [x] Agent Teams — when? What does multi-agent collaboration look like? **Answer: Released Feb 5, 2026 with Opus 4.6. Coding only (Claude Code). No business user capabilities. ([TechCrunch](https://techcrunch.com/2026/02/05/anthropic-releases-opus-4-6-with-new-agent-teams/))**
- [~] B2B marketplace traction — which apps getting used? **Partial: Launched Mar 6, enterprise-only limited preview. Six partners (GitLab, Harvey, Lovable, Replit, Rogo, Snowflake). Zero customer reviews found. $200M Snowflake partnership. ([SiliconANGLE](https://siliconangle.com/2026/03/06/anthropic-launches-claude-marketplace-third-party-cloud-services/))**
- [x] MCP enterprise governance — when does SSO/audit ship? **Answer: Not from Anthropic directly. Third-party gateways filling the gap (MintMCP, Stacklok, Lunar.dev, Itential). MCP spec ships enterprise features as extensions.**
- [~] Computer Use in enterprise — anyone using it for legacy system integration? **Partial: NYSE uses Claude Code for legacy code refactoring + internal AI agents. This is Claude Code, not Computer Use for screen automation. Zero practitioner reports of Computer Use for mainframe/Citrix/legacy ERP automation.**
- [x] Infrastructure reliability — improving or still fragile? **Answer: WORSE. 109 incidents in 90 days. Level 3 convergence. Own SRE admits "Claude goes down more often than any of us would like" at QCon London (Mar 19). Team hiring, not shrinking. 5+ incidents in March 2026 alone. 99.34% API uptime = ~6 hours downtime per month.**
- [ ] Political risk resolution — Pentagon situation outcome?
- [ ] Cowork plugin enterprise deployment with measurable outcomes
- [ ] B2B marketplace customer reviews — re-check in 4 weeks
- [ ] Agent Teams for business users — any roadmap signal?
- [~] **Antspace** — when does it move from staging to production? Public announcement? **Partial: BYOC details confirmed (Kubernetes, 7-endpoint API, resume-cached sessions). Still staging. No public announcement. 35th consecutive silence (cycle 68).**
- [x] Antspace + Supabase integration — how deep is the database layer? **Answer: Deep. 6 MCP tools auto-provisioned. On-demand DB creation, migrations, type generation, Edge Functions. Full backend-as-a-service.**
- [ ] Computer Use practitioner feedback — launched March 23, zero reviews yet (1 day old). Monitor for first independent reports.
- [x] Political risk resolution — Judge blocked Pentagon's supply chain risk designation (Mar 26). Both sides appealing. Conflict ongoing but Anthropic has legal protection for now.
- [ ] IPO impact on platform strategy — does Q4 2026 IPO timeline accelerate Antspace launch or enterprise Cowork push?
- [ ] Claude Mythos release timeline — when does the next-gen model ship publicly? What does it mean for agent capabilities?
- [ ] Claude Code source leak consequences — do competitors use the leaked harness architecture? Does it accelerate open-source alternatives?
- [ ] Cowork enterprise revenue — Bloomberg says faster adoption than Code. Need independent verification, not just executive claims.
- [ ] Dispatch + Computer Use combined workflows — any practitioner reports of the full phone→desktop→legacy-system pipeline?
- [ ] Channel conflict with Microsoft — does Copilot Cowork compete with or complement Claude's own Cowork? Any signals of tension?

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run03.md` — Developer-focused initial research
- `runs/2026-03-21-trajectory.md` — Platform trajectory deep dive
- `runs/2026-03-21-cycle15.md` — Infrastructure fragility (Level 3), MCP gateways, plugin adoption, marketplace, Agent Teams
- `../cross-platform/runs/2026-03-21-cycle24.md` — SRE QCon London talk (Palcuie), 5+ March incidents, 99.34% API uptime, correlation/causation weakness
- `runs/2026-04-02-anthropic-platform-deep-dive.md` — Full platform deep dive: IPO ($60B Q4 2026), Ramp data (73% new spend), Mythos leak, source code leak, Dispatch, Agent SDK rename, revenue trajectory ($19B ARR), enterprise adoption, competitive picture
