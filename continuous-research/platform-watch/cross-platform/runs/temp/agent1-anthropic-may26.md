# Agent 1 Research: Anthropic + Microsoft Build Pre-event — May 26, 2026

## Query Log
- WebSearch: "Anthropic Claude billing change June 2026"
- WebSearch: "Claude Code pricing change June 2026"
- WebSearch: "Anthropic Agent SDK pricing update 2026"
- WebFetch: https://the-decoder.com/claude-subscriptions-get-separate-budgets-for-programmatic-use-billed-at-full-api-prices/
- WebFetch: https://gist.github.com/MagnaCapax/d9177e35b355853f03c730dfcaa693ef
- WebFetch: https://www.theregister.com/ai-ml/2026/05/14/anthropic-tosses-agents-into-the-api-billing-pool/5240748
- WebFetch: https://venturebeat.com/technology/anthropic-reinstates-openclaw-and-third-party-agent-usage-on-claude-subscriptions-with-a-catch (returned HTTP 429 — rate limited)
- WebSearch: "Anthropic announcement May 2026 new feature Claude product"
- WebSearch: "Microsoft Build 2026 AI agents preview schedule June San Francisco"
- WebSearch: "Claude Design Anthropic Labs visual design tool May 2026"
- WebSearch: "Claude for Small Business Anthropic May 2026 features details"
- WebSearch: "Anthropic Antspace production 2026"
- WebSearch: "Anthropic Antspace staging production launch announcement May 2026"
- WebFetch: https://windowsnews.ai/article/microsoft-build-2026-ai-startup-cohort-agents-governance-observability-data.419425
- WebSearch: "Claude Code changelog May 23-26 2026 new entries updates"
- WebFetch: https://code.claude.com/docs/en/changelog
- WebSearch: "Microsoft Build 2026 pre-event leak AI agent announcement Azure Copilot"
- WebSearch: "Anthropic Claude new announcement May 24 25 26 2026"
- WebFetch: https://www.anthropic.com/news
- WebSearch: "Anthropic Chris Olah Pope Leo XIV encyclical Magnifica humanitas May 25 2026"
- WebSearch: "Claude Code legal MCP connectors May 2026 law firms plugins"
- WebFetch: https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/

---

## Finding A: June 15 Billing Split — Programmatic Usage Separated from Subscription Pool

**Source:** https://the-decoder.com/claude-subscriptions-get-separate-budgets-for-programmatic-use-billed-at-full-api-prices/ — [domain trade publication]
**Date:** May 14, 2026
**What:** Anthropic announced that starting June 15, 2026, all programmatic/agentic usage (Agent SDK, `claude -p`, Claude Code GitHub Actions, third-party apps) moves off the subscription token pool onto a separate monthly dollar credit metered at full API list prices. Interactive usage (Claude Code terminal, Claude.ai chat, Claude Cowork) is unaffected. This resolves a flagged 503-blocked item from cycle 112.

**Evidence level:** Level 2 (single announcement, multiple trade-press coverage, practitioner reaction data below)

**Key claims:**
- Effective date: June 15, 2026. Claim-email from Anthropic sent June 8.
- Credit amounts: Pro $20/mo, Max 5x $100/mo, Max 20x $200/mo, Team Standard $20/seat, Team Premium $100/seat, Enterprise varies.
- Credits do not roll over. If exhausted and "extra usage" is enabled, overages bill at standard API rates. If not enabled, requests are rejected until next billing cycle.
- Token budget at $200 (50/50 input/output): ~13.3M tokens Opus 4.7, ~22M tokens Sonnet 4.6, ~67M tokens Haiku 4.5.
- This is a policy reversal from April 2026, when Anthropic first banned third-party agent usage on subscriptions outright. The new policy reintroduces programmatic use but with metered billing.
- Lydia Hallie's community tweet about the change received a Community Note; Theo Browne framed it as a "25x cut" to programmatic usage value.
- Community disagreement signal: 1,700 quote-tweets vs. 8,900 likes on official announcement.
- Effective price increase vs. prior usage: ~12x for Pro + OpenClaw workloads; ~29–35x for Max 20x heavy-Opus; ~150–175x for Max 20x heavy-Sonnet.

**Additional sources:**
- https://gist.github.com/MagnaCapax/d9177e35b355853f03c730dfcaa693ef — [practitioner analysis] — May 14, 2026 — canonical math breakdown with multiplier table
- https://www.theregister.com/ai-ml/2026/05/14/anthropic-tosses-agents-into-the-api-billing-pool/5240748 — [domain trade publication] — May 14, 2026
- https://thenewstack.io/anthropic-agent-sdk-credits/ — [domain trade publication]
- https://levelup.gitconnected.com/anthropic-will-quietly-reprice-your-claude-pro-plan-on-june-15-the-free-20-credit-replacing-1ebd922a7786 — [practitioner analysis]
- https://zed.dev/blog/anthropic-subscription-changes — [practitioner direct] — Zed editor team's response

---

## Finding B: Claude Code Changelog May 23-26 — v2.1.150 Infrastructure Only

**Source:** https://code.claude.com/docs/en/changelog — [vendor press release / official changelog]
**Date:** May 23, 2026
**What:** Only one release shipped in the May 23-26 window: v2.1.150 on May 23 with internal infrastructure improvements and no user-facing changes. The substantive release was v2.1.149 on May 22 (just outside the window) with significant features and 30+ bug/security fixes. No new releases found for May 24, 25, or 26.

**Evidence level:** Level 0 (official changelog, no independent validation needed — factual record)

**Key claims (v2.1.150, May 23):**
- Internal infrastructure only. No user-facing changes.

**Key claims (v2.1.149, May 22 — adjacent context):**
- `/usage` now shows per-category breakdown of limits usage (skills, subagents, plugins, MCP server costs)
- `/diff` detail view supports full keyboard scrolling
- Enterprise: `allowAllClaudeAiMcps` managed setting added for claude.ai cloud MCP connectors
- Security: Fixed PowerShell `cd` permission bypass, Git worktree sandbox write-allowlist covering full repo root, two additional PowerShell/Bash permission-analysis gaps
- Bug: Fixed `find` tool exhausting macOS file/vnode table and crashing host on large directory trees
- Bug: `/ultraplan` and remote session creation failing on clean working trees
- `/simplify` renamed to `/code-review` with effort-level parameter and `--comment` flag for GitHub PR inline comments (v2.1.147, May 21)

---

## Finding C: Anthropic + Pope Leo XIV — Chris Olah at Vatican Encyclical Launch

**Source:** https://www.anthropic.com/news/chris-olah-pope-leo-encyclical — [vendor press release]
**Date:** May 25, 2026
**What:** Anthropic co-founder Chris Olah spoke at the Vatican presentation of Pope Leo XIV's first encyclical "Magnifica humanitas: On safeguarding the human person in the time of artificial intelligence." This is the only Anthropic news item published after May 23, 2026 as of the research date.

**Evidence level:** Level 0 (vendor/institutional announcement; no independent practitioner validation yet)

**Key claims:**
- Encyclical released May 25, 2026; Pope Leo XIV personally presented it (unusual — past popes delegated to cardinals).
- Olah acknowledged that frontier AI labs "operate inside incentives that can sometimes conflict with doing the right thing" and called for external critics who care about safety.
- Pope's framing: neither utopian nor anti-AI; applies Catholic social teaching to AI governance debate. Warns AI could fuel warfare; calls for regulation and transparency.
- Anthropic framed participation as "widening the conversation on important questions raised by AI."
- CNN, CBC, National Catholic Reporter all covered it independently.

**Additional sources:**
- https://www.ncronline.org/vatican/vatican-news/pope-leo-anthropic-co-founder-call-church-tech-ethics-partnership-magnifica — [domain trade publication] — May 25, 2026
- https://www.cnn.com/2026/05/25/europe/pope-leo-ai-encyclical-magnifica-humanitas-intl — [general press] — May 25, 2026

---

## Finding D: Claude for Legal — 20+ MCP Connectors, 12 Practice-Area Plugins (May 12)

**Source:** https://www.lawnext.com/2026/05/anthropic-goes-all-in-on-legal-releasing-more-than-20-connectors-and-12-practice-area-plugins-for-claude.html — [domain trade publication]
**Date:** May 12, 2026
**What:** Anthropic launched "Claude for Legal" with 20+ MCP connectors to legal-sector SaaS (Relativity, Ironclad, iManage, Thomson Reuters CoCounsel, Everlaw, Datasite) and 12 open-source practice-area plugins covering commercial counsel, litigation, privacy, M&A. Not noted in last cycle. Relevant to the business-agent tracking focus.

**Evidence level:** Level 1-2 (trade press coverage; no independent practitioner adoption reports yet)

**Key claims:**
- 20+ connectors including Ironclad, DocuSign, Definely, iManage, NetDocuments, Relativity, Everlaw, Consilio, Box, Datasite, Midpage, Trellis, Thomson Reuters CoCounsel
- Thomson Reuters rebuilt CoCounsel on Anthropic's technology; connector links Claude directly to that product
- 12 practice-area plugins open-sourced under Apache 2.0
- Available to all paid Claude subscribers; enterprise admins enable in workspace settings
- TechCrunch covered independently: https://techcrunch.com/2026/05/12/the-ai-legal-services-industry-is-heating-up-anthropic-is-getting-in-on-the-action/ — [general press] — May 12, 2026

---

## Finding E: Claude for Small Business — 15 Workflows, Road Tour (May 13)

**Source:** https://www.anthropic.com/news/claude-for-small-business — [vendor press release]
**Date:** May 13, 2026
**What:** Anthropic launched Claude for Small Business as a toggle-on feature inside Claude Cowork, bundling 15 pre-built agent workflows and connectors to 12+ SMB SaaS tools. No additional charge beyond existing Claude subscription. Not noted in last cycle.

**Evidence level:** Level 0-1 (vendor launch + Axios/Inc coverage, no adoption data yet)

**Key claims:**
- 15 pre-built skills covering: payroll planning, book reconciliation, financial insights, marketing campaigns, new employee onboarding
- Connectors: QuickBooks, PayPal, Gmail, Google Drive, Calendar, Microsoft 365, DocuSign, Slack, Canva, Square, Stripe, Webflow, HubSpot
- Not a new subscription tier — toggled on within Claude Cowork
- Road tour: free half-day AI fluency workshops, 100 SMB leaders/stop, spring cities: Chicago, Tulsa, Dallas, Hamilton Township, Baton Rouge, Birmingham, Salt Lake City, Baltimore, San Jose, Indianapolis
- Axios confirmed: https://www.axios.com/2026/05/13/anthropic-claude-small-business-smb — [general press] — May 13, 2026

---

## Finding F: Microsoft Build 2026 Pre-Event Signals (June 2-3, San Francisco)

**Source:** https://windowsnews.ai/article/microsoft-build-2026-in-san-francisco-ai-agents-trust-and-developer-platform-shift.418934 — [domain trade publication]
**Date:** ~May 24, 2026
**What:** Build moves from Seattle to Fort Mason Center, San Francisco, June 2-3. Primary theme: AI agents and agentic systems. Pre-event coverage confirms specific session tracks and a startup cohort (11 companies, not named individually) but no major feature leaks.

**Evidence level:** Level 1 (trade press positioning; no leaked internal materials found)

**Key claims:**
- Dates: June 2-3, 2026, Fort Mason Center SF. ~3,000 in-person attendees.
- Keynote: Satya Nadella + Scott Guthrie (Day 1). Day 2: "AI Production," "Agentic Systems," "Cost & Efficiency" tracks.
- Pre-announced: "AI Foundry for Windows" SDK bundling ONNX Runtime, DirectML, Copilot Runtime; identity-aware agent gateway mapping actions to Entra ID principals
- 11-startup Build 2026 cohort focused on agent governance, observability, Windows AI runtime integration — no individual startup names published
- Confirmed sessions: "Building Governed Agents with Copilot Studio," "Future of Observability in Agentic World" (introduces open telemetry schema)
- Copilot Studio April 2026 updates already live: agent governance for admins, intelligent workflows; new "Microsoft Certified: AI Agent Builder Associate" certification launched
- Livestream: build.microsoft.com (free). In-person tickets $1,099.

**Additional source:** https://windowsnews.ai/article/microsoft-build-2026-ai-startup-cohort-agents-governance-observability-data.419425 — May 23, 2026

---

## Finding G: Antspace — Still Staging, No Production Launch

**Source:** https://aprilnea.me/en/blog/reverse-engineering-claude-code-antspace — [practitioner direct]
**Date:** Original discovery ~March 2026; no new announcements found as of May 26
**What:** No new Antspace production announcement found. All current references still describe it as an internal/staging platform discovered via reverse engineering of Claude Code's Firecracker MicroVM. Version string still prefixed "staging-". No Anthropic blog post, job posting, GitHub repo, or documentation referencing Antspace publicly.

**Evidence level:** N/A — absence of evidence

**Key claims:**
- 36th consecutive cycle with no Antspace production signal
- Architecture remains: intent → Claude → Baku (web app builder) → Supabase → Antspace → live app
- Default deployment target is Antspace over Vercel within the Baku workflow
- Enterprise BYOC (Bring Your Own Cloud) environment support exists in code
- No official announcement, no public documentation

---

## What I Looked For But Did Not Find

1. **Anthropic Claude Code changelog entries for May 24-26, 2026** — v2.1.150 (May 23) was the last release, infrastructure only. No new versions shipped in the 24-26 window per the official changelog.

2. **Major Anthropic product announcement May 24-26** — Only item found post-May 23 was Chris Olah's Vatican remarks (May 25). No new model, feature, or partnership announcement in this exact window.

3. **Microsoft Build 2026 pre-event leaks** — No unauthorized leaks or internal agenda documents found. All pre-event content is official Microsoft positioning. Specific feature announcements expected at the June 2-3 event itself.

4. **Independent practitioner reports on Claude for Legal adoption** — Launch was May 12; trade press coverage exists but no practitioner case studies or ROI claims found yet (too early).

5. **VentureBeat article on OpenClaw reinstatement** — URL returned HTTP 429 (rate limited). OpenClaw story confirmed via other sources: it was a third-party agent that was initially banned in April 2026, then reinstated with the new metered billing model.

6. **Anthropic Antspace production launch** — Absence confirmed across 2+ searches. Still staging.

---

## Orientation

The June 15 billing change is the most operationally significant Anthropic development since last cycle: it ends the subsidy for programmatic/agentic usage on subscriptions, with effective price multipliers of 12x–175x depending on workload, and will force business teams running agent workflows on Pro/Max subscriptions to either budget the new credit pools or migrate to direct API billing. Combined with the Claude for Legal and Claude for Small Business launches, the strategic pattern is Anthropic moving up the stack toward vertical SaaS while simultaneously closing the subsidy gap that enabled high-volume agentic use at below-cost pricing — both moves tighten monetization ahead of the projected Q2 2026 profitability quarter.
