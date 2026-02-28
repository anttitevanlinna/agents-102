# Research Pruning Report — 2026-02-21

**Auditor:** Research Pruner Agent (Claude Sonnet 4.6)
**Scope:** `/continuous-research/findings/` (14 files) + `/research/` (19 files)
**Input:** audit-batch-1.md through audit-batch-4.md (pre-existing audit findings)
**Criteria applied:** Freshness (8 months = pre-June 2025), vendor fluff, editorial alignment, chatbot inflation, source quality, unsourced anchor claims

---

## Summary

| Metric | Count |
|--------|-------|
| Files reviewed | 33 |
| Distinct sources/findings evaluated | ~280 |
| Items flagged for removal | 4 |
| Items requiring [SOURCE NEEDED] tag | 32 |
| Items to downgrade (chatbot inflation label) | 8 |
| Items to replace source (low-quality blog) | 6 |
| Protected (old but landmark) | 4 |
| Flagged for human review | 5 |

---

## Criterion 1 — Freshness (pre-June 2025)

**Approach:** Sources with publication dates before June 2025 were checked against landmark criteria before flagging.

### Items to REMOVE (old AND generic)

| Source / Finding | File | Approx. Age | Reason |
|-----------------|------|-------------|--------|
| Swedbank "Nina" Virtual Assistant | `customer-service.md` | ~8+ years (2018 Computer Weekly source) | The Computer Weekly article is from 2018. The finding cites "30,000 conversations/month and 78% resolution" but acknowledges "may be dated." Nina is now a well-known case; it has been superseded by Klarna, Nordea Nova, DNB Aino, and Gjensidige — all with more current evidence. The finding adds no insight that newer Nordic cases don't cover with fresher data. **Remove.** |

### Protected (old source but landmark)

| Source / Finding | File | Age | Justification |
|-----------------|------|-----|---------------|
| Anthropic "Building Effective Agents" (Dec 2024) | `real-vs-fake-agents.md` [Source 2] | ~14 months | Cited as reference [2] throughout `real-vs-fake-agents.md` and referenced across multiple files. Foundational framework defining the workflow vs. agent distinction. Landmark. **Keep.** |
| McDonald's AI Drive-Through (2021-2024) | `convergence-hybrid-beats-autonomous.md` | 2+ years | A documented failure case with clear resolution (program shut down July 2024). Real outcome, not projection. Used as a teaching case across multiple files. The Museum of Failure URL + AI Incident Database provide primary evidence. **Keep.** |
| Air Canada chatbot liability ruling (Feb 2024) | `convergence-hybrid-beats-autonomous.md` | ~2 years | A legal landmark. Tribunal ruling established that companies are liable for AI agent outputs. Frequently cited across chasm-crossing patterns file. This precedent will remain relevant for years. **Keep.** |
| Klarna initial AI deployment claim (Feb 2024) + reversal (May 2025) | Multiple files | The arc spans 2024–2025 | The full Klarna arc (deploy → scale → reverse) is the defining teaching case of the entire research collection. Every file references it. The reversal (May 2025) falls just within the freshness window. Both the original deployment and the reversal are essential. **Keep entire arc.** |

---

## Criterion 2 — Vendor Marketing Fluff

**Definition applied:** Content where the primary analytical substance is a vendor's own performance claims with no independent verification and no counter-evidence or qualifications.

### Items to REMOVE

| Source / Finding | File | Reason |
|-----------------|------|--------|
| MindStudio "30% faster deployment with built-in compliance, 3 weeks to hours" | `convergence-governance-as-prerequisite.md` Signal 10 | Source is MindStudio's own blog making self-promotional claims about their own product with no independent verification. The broader point (governance reduces deployment time) is already proven by Goldman Sachs, KPMG, and Allianz with primary sources. MindStudio adds no incremental analytical value — it is a vendor testimonial for a niche product. **Remove Signal 10 and its associated analysis text.** |

### Items to DOWNGRADE (retain but re-label as "Vendor self-reported — treat with caution")

These findings have legitimate analytical value but are sourced entirely or primarily from vendor case studies with no independent corroboration. They should not be removed but should be clearly labeled.

| Finding | File | Issue | Action |
|---------|------|-------|--------|
| Thalamus AI "5x faster response, 2x win rate" | `sales-marketing.md` | All metrics vendor self-reported. No named client validation. Startup with no independent coverage. | Add "[Vendor self-reported — no independent validation]" label |
| Paradox AI / Olivia "75%+ reductions in time-to-hire" | `hr-people-ops.md` | Source is Paradox homepage only. No specific case study. McDonald's deployment cited without URL. | Add "[Vendor-reported — specific source needed for McDonald's claim]" label |
| Odyssey Automation "Top 20 US Bank" case | `convergence-governance-as-prerequisite.md` | Unnamed bank, single vendor source, vendor selling their own product. Metrics (95% compliance gap reduction, zero incidents) are curated by the vendor. | Add "[Single vendor source — unnamed client — treat claims as illustrative, not verified]" label |
| Sana Labs "Am Law Global 200" legal agents | `compliance-legal.md` | Both URLs are vendor's own site. No named Am Law clients. "First eight-figure enterprise deal" is vendor self-reported. | Add "[Vendor self-sourced — client names not disclosed]" label |
| Leena AI / Coca-Cola Vietnam | `hr-people-ops.md` | Vendor case study, inherently promotional. | Add "[Vendor case study]" label — audit already flags this |
| Eightfold AI / Coca-Cola Europacific Partners | `hr-people-ops.md` | Vendor case study + "Pathfinder Award" not linked. | Add "[Vendor case study]" label |
| CUBE / 4CRisk "50x faster than manual" | `compliance-legal.md` | 4CRisk URL is homepage. Speed claim is vendor-sourced. | Add "[Vendor claim — not independently verified]" label |

---

## Criterion 3 — Editorial Alignment (coding drift)

**Definition applied:** Content focused on building/coding agents rather than deploying agents in business processes.

### Items to REMOVE

| Source / Finding | File | Reason |
|-----------------|------|--------|
| `agent-platforms-research.md` — entire file | `research/agent-platforms-research.md` | This file is about orchestration frameworks for developers building Claude-based agents: LangGraph, CrewAI, Bedrock AgentCore, Azure Foundry, Claude Agent SDK internals, MCP protocol details, community orchestrators (claude-flow, ccswarm, Gas Town, Multiclaude). The audience is developers choosing a runtime stack for agentic applications. This is squarely in the coding/builder category — not business process adoption. The project guidelines state: "agentic coding is a red ocean. Our focus is operations, finance, HR, compliance, customer service, sales, product." The file's own framing ("What do people actually use to run concurrent, multi-turn AI agents in production?") confirms the developer orientation. **Remove file contents** (do not delete file — strip to a stub with a note that this was pruned as out of scope). |
| `claude-agent-runtime-vision.md` — entire file | `research/claude-agent-runtime-vision.md` | Deep technical analysis of Claude Agent SDK internals, agent loop architecture, subagent orchestration, Bedrock AgentCore, Azure Foundry Agent Service, Cloudflare Durable Objects — all infrastructure-layer developer concerns. The framing ("Nothing can host this at scale") is an infrastructure engineering problem. Useful for builders, not for business leaders learning to think about agents. **Remove file contents** (same treatment — stub with note). |

**Note on `real-vs-fake-agents.md`:** This file discusses coding agents heavily (Claude Code, Devin, SWE-bench) but its core argument — the Level 0-4 taxonomy and the "agent washing" analysis — is directly relevant to business buyers who will encounter vendor claims. The taxonomy is used as a teaching framework across the research collection. **Keep, but flag the coding-heavy sections (Level 4 coding agents) as "background context, not curriculum content."**

### Items to FLAG for editorial review

| Finding | File | Concern |
|---------|------|---------|
| LangChain State of Agent Engineering survey | `real-vs-fake-agents.md` [Source 5] | Primary insight used (57.3% "in production") but the survey is of LangChain developers, not business process deployers. Useful as counter-evidence, but needs qualification that the population skews heavily technical. Currently used without this caveat. |

---

## Criterion 4 — Chatbot Inflation

**Definition:** Findings where a chatbot or FAQ bot is presented as an "agent." Real agents = multi-step autonomous work.

The research collection handles this unusually well — most findings explicitly use `real-vs-fake-agents.md` framing and the customer service file distinguishes three tiers (informational, action-taking, multi-agent). However, several findings use the "agent" label without qualification for what are clearly informational chatbots.

### Items requiring CHATBOT INFLATION label

Add a note clarifying the actual autonomy level using the Level 0-4 taxonomy from `real-vs-fake-agents.md`.

| Finding | File | Issue | Recommended label |
|---------|------|-------|-------------------|
| Nordea Nova | `customer-service.md` | "12 chatbots" that guide customers to self-service and route — explicitly not confirmed to take autonomous actions. The file acknowledges this. | Add: "[Level 1-2: Conversational routing — not action-taking]" |
| DNB Aino | `customer-service.md` | "Automated over 50% of incoming chat traffic" — chat automation is routing, not autonomous action. The file acknowledges autonomy is unclear. | Add: "[Level 1-2: Conversational routing — autonomous actions not confirmed]" |
| NAV Frida | `customer-service.md` | Government welfare queries answered — this is FAQ/informational, not autonomous action on welfare cases. | Add: "[Level 1: Informational Q&A — not action-taking]" |
| Kommune-Kari | `customer-service.md` | Municipal service inquiries — informational. | Add: "[Level 1: Informational Q&A — not action-taking]" |
| Siemens IBM Watson | `hr-people-ops.md` | "Resolves 55% of employee questions" — FAQ resolution, not multi-step workflow execution. | Add: "[Level 1-2: FAQ resolution — not multi-step autonomous]" |
| Unilever Unabot | `hr-people-ops.md` | "Answers HR, IT, and policy questions" — explicitly informational, adapts by location. Not action-taking. | Add: "[Level 1: Informational Q&A — not action-taking]" |
| Telia / Ultimate.ai | `customer-service.md` | "30% of chat support automated" — deflection automation, Level 1-2. | Add: "[Level 1-2: Chat deflection — not action-taking agent]" |
| Personio Assistant | `hr-people-ops.md` | File already acknowledges "not yet fully autonomous (answers questions, does not yet take multi-step actions)." | Promote the existing caveat to the finding title row |

**Note:** These findings should NOT be removed. They are valuable as evidence of the chasm between chatbot deployment (past the chasm) and agentic deployment (pre-chasm). Labeling them correctly makes the collection more useful, not less.

---

## Criterion 5 — Source Quality (Low-Authority Secondary Blogs)

### Items requiring SOURCE REPLACEMENT

Replace the flagged URL with a primary or near-primary source. If no primary source can be found, add [PRIMARY SOURCE NEEDED] note.

| Finding | File | Flagged Source | Action |
|---------|------|---------------|--------|
| JPMorgan Chase | `finance-accounting.md` | `digitaldefynd.com` as sole source for multiple major claims ($1.5B value, 360K hours, 10% staff reduction projection) | Replace with JPMorgan annual report, IR disclosures, or CFO public statements. Add [PRIMARY SOURCE NEEDED] for each specific statistic until replaced. |
| Unilever supply chain | `operations-supply-chain.md` | `cleverence.com` (barcode software company blog) for "30% forecasting accuracy" and "lighthouse factory" claims | Add [PRIMARY SOURCE NEEDED] — find Unilever corporate communications, WEF report, or industry press. |
| SAP Joule Procurement | `operations-supply-chain.md` | `klover.ai` (third-party SAP consulting blog) instead of official SAP documentation | Replace with SAP Sapphire 2025 announcement page or official SAP documentation. |
| JPMorgan Chase | `convergence-narrow-agent-orchestration.md` | `klover.ai` for "$17B tech budget, 2,000+ specialists" | Same as above — JPMorgan IR or annual report. |
| H&M "30% profit uplift" | `cross-cut-nordic-enterprise-ai.md` | `ctomagazine.com`, `digitaldefynd.com`, `reruption.com` — all third-party analysis blogs | Find H&M quarterly earnings report (the Q3 2025 operating profit figure should be in earnings). Add [PRIMARY SOURCE NEEDED] for 30% profit uplift specifically. |
| Maersk "$300M+ savings" | `cross-cut-nordic-enterprise-ai.md` | `enkiai.com`, `debales.ai` — AI analysis blogs with no clear primary sourcing | Find Maersk annual report or corporate communications. Add [PRIMARY SOURCE NEEDED]. |

---

## Criterion 6 — Unsourced Anchor Claims

These are statistics used to frame entire sections or orientation summaries without a traceable URL. They are the highest-priority items because they anchor the credibility of entire research tracks.

### Critical — Add [SOURCE NEEDED] or Remove

**Priority 1 (highest impact — used as anchor claims, no source at all):**

| Claim | File | Location | Action |
|-------|------|----------|--------|
| "85% of fully autonomous AI SDR deployments shut down within six months" | `sales-marketing.md` | Orientation summary + Sendoso/Gem-E finding | This is the anchor claim of the entire sales/marketing file. No primary source cited anywhere. UserGems blog (a third-party, interested party) is the only proximate reference. **Add [SOURCE NEEDED — ANCHOR CLAIM] in the orientation summary and in the finding. If no source can be found, reframe as "anecdotal industry pattern" or remove the specific percentage.** |
| Carnegie Mellon "agents fail 70% of real-world office tasks" | `convergence-platform-agents-in-wild.md` | "Uncomfortable Truth" section + key stats | Used to anchor a major section. No URL. The `real-vs-fake-agents.md` cites a different Carnegie Mellon figure (30-35% completion rate on multi-step tasks) with a traceable arXiv URL (arxiv.org/html/2602.16666). These are inconsistent. **Resolve: use the `real-vs-fake-agents.md` figure with its source, or find the specific CMU office tasks study. Remove the 70% figure until sourced.** |
| "40% of multi-agent pilots fail within six months of production deployment" | `convergence-narrow-agent-orchestration.md` | Convergence assessment section | Significant framing claim, no source. **Add [SOURCE NEEDED].** |
| McKinsey "95% see no measurable return" | `convergence-platform-agents-in-wild.md` | Summary section | This is likely the McKinsey "Superagency at Work" (Jan 2025) or "Superagency in the Workplace" report. If so, link it. If this misrepresents the finding, remove it. **Add [SOURCE NEEDED — verify against McKinsey report].** |
| S&P Global "42% of companies abandoned most AI initiatives in 2024, up from 17%" | `cross-cut-chasm-crossing-patterns.md` | Anti-Pattern 5 + Summary table | Specific and important statistic, no URL. **Add [SOURCE NEEDED].** |
| RAND "80% of AI projects fail" | `convergence-governance-as-prerequisite.md` | Referenced in context | No URL to RAND report. **Add [SOURCE NEEDED — find RAND report citation].** |

**Priority 2 (section-level data points, important but not anchor claims):**

| Claim | File | Action |
|-------|------|--------|
| "79% of CFOs say at least 25% of accounting workload handled by agentic AI tools" | `finance-accounting.md` | Market Context section | Cites "survey data" with no source name. **Add [SOURCE NEEDED — identify the survey].** |
| "Only 7% of CFOs have deployed agentic AI in live finance workflows" | `finance-accounting.md` | Market Context section | No source. **Add [SOURCE NEEDED].** |
| "99% of companies plan to put agents into production but only 11% have done so" | `finance-accounting.md` | Market Context section | No source (KPMG is cited for this in other files with a URL — apply that URL here). |
| "$50B global market spend on agentic AI in 2025" — KPMG estimate | `finance-accounting.md` | Market Context section | Named source, no URL. **Add KPMG URL or [SOURCE NEEDED].** |
| "68% of AP teams still enter invoices manually" | `finance-accounting.md` | Market Context section | No source. **Add [SOURCE NEEDED].** |
| "$3 trillion in corporate productivity and 5.4% EBITDA improvement" | `finance-accounting.md` | Market Context section | No source. **Add [SOURCE NEEDED — likely McKinsey, verify].** |
| "44% of finance teams will use agentic AI in 2026" — Wolters Kluwer | `finance-accounting.md` | Market Context section | Named but not linked. **Add URL.** |
| "49% of procurement teams running AI pilots, only 4% reaching meaningful deployment" — EY CPO Survey 2025 | `operations-supply-chain.md` | Key Market Data Points | Named but no URL. **Add URL or [SOURCE NEEDED].** |
| "95% of enterprise AI pilots deliver zero measurable return" — MIT NANDA, July 2025 | `operations-supply-chain.md` | Key Market Data Points | Named but no URL. Very strong claim. **Add URL or [SOURCE NEEDED].** |
| "67% success rate for vendor tools vs. one-third for internal builds" | `operations-supply-chain.md` | Key Market Data Points | No source name or URL. **Add [SOURCE NEEDED — no source at all].** |
| "35% of procurement teams now use AI" (Dec 2025) | `operations-supply-chain.md` | Key Market Data Points | No source. **Add [SOURCE NEEDED].** |
| "Hackett's 2025 research: 10% productivity, leaders 25%+" | `operations-supply-chain.md` | Key Market Data Points | Named but no URL. **Add URL.** |
| Compliance legal market stats (ACC/Everlaw adoption doubling, $1.5B to $3B+ market) | `compliance-legal.md` | Orientation summary | Two of three stats have no source. **Add [SOURCE NEEDED].** |
| "70% new account onboarding fully automated by 2026" — Nordic banks NKYC | `compliance-legal.md` | Nordic banks finding | "Industry projection" with no source. **Add [SOURCE NEEDED].** |
| IKEA "$1.4B additional revenue" from reskilling 8,500 employees | `hr-people-ops.md` | IKEA/ServiceNow finding | No source link. Conference session URL likely ephemeral. Very specific and remarkable claim. **Add [SOURCE NEEDED] and note URL may be expired.** |
| "78.7% of organizations now use AI in ABM programs" | `sales-marketing.md` | Demandbase finding | "Industry-wide" with no survey citation. **Add [SOURCE NEEDED].** |
| Lewis Silkin "45% reduction in biased decisions with human oversight" | `convergence-hybrid-beats-autonomous.md` | HR bias finding | Specific study, no URL. **Add [SOURCE NEEDED].** |
| "Over half of organizations lack systematic inventories of AI systems" | `cross-cut-chasm-crossing-patterns.md` | Pattern 4 | No source. **Add [SOURCE NEEDED].** |
| "48% searchability, 47% reusability" | `cross-cut-chasm-crossing-patterns.md` | Anti-Pattern 3 | No source URL. **Add [SOURCE NEEDED].** |
| "Microsoft now requires ISO 42001 for AI vendors under DPR v10" | `cross-cut-chasm-crossing-patterns.md` | Pattern 5 | No URL. **Add [SOURCE NEEDED].** |
| "Nordic AI Union Summit (March 2026, Oslo)" | `cross-cut-chasm-crossing-patterns.md` | Pattern 2 | Specific event, no URL. **Verify or remove reference.** |
| "76% of organizations plan to pursue ISO 42001 (CSA 2025)" | `convergence-governance-as-prerequisite.md` | Broader context section | No URL. **Add [SOURCE NEEDED].** |
| "Nordic AI Centre (NAIC) cross-border collaboration" | `convergence-governance-as-prerequisite.md` | Nordic section | No URL. **Add [SOURCE NEEDED] or link NAIC website.** |
| "Finland developing regulatory sandboxes for SMEs" | `convergence-governance-as-prerequisite.md` | Nordic section | No source. **Add [SOURCE NEEDED].** |
| Multi-agent system inquiry surge 1,445% | `real-vs-fake-agents.md` [Source 13] | Labeled "[SOURCE: aggregated from vendor reporting]" | Self-acknowledged weak source. Labeled but vague. **Either find a primary source (Gartner URL exists in other files for this) or remove the specific percentage.** |
| Upwork/VentureBeat "60-80% standalone failure, 70% improvement with human partners" | `real-vs-fake-agents.md` [Source 23] | Labeled as via HackerNoon and VentureBeat | HackerNoon URL provided but the Upwork/VentureBeat primary is not directly linked. **Verify the URL chains to the original Upwork study.** |

---

## Additional Audit Findings from Audit Batches

These items were flagged in audit-batch-1 through audit-batch-4 but not yet actioned. Included here for completeness.

### Source quality / traceability issues (moderate, not critical)

| Finding | File | Issue |
|---------|------|-------|
| NAV Frida | `customer-service.md` | "Web search synthesis" — 270K inquiries, 220 FTE-equivalent, 80% resolution all unverifiable. See Criterion 4 (chatbot inflation) and Criterion 5. Add [SOURCE NEEDED] for all metrics. |
| Kommune-Kari | `customer-service.md` | "Web search synthesis" — 500K conversations unverifiable. Same treatment. |
| VTT Finland | `sales-marketing.md` | URL is generic Salesforce AI SDR product page, not VTT-specific. If VTT is not findable on the page, remove the finding or find a VTT-specific source. |
| Crayon "22% increase in competitive win rates" | `sales-marketing.md` + `product-strategy.md` | No named client. Appears in two files. **Add [NO CLIENT NAMED — vendor claim] in both.** |
| Stora Enso multi-agent system | `operations-supply-chain.md` | Linked URL is an innovation call page, not a case study. "Secondhand report (industry analysis)" is unlinked. **Add [PRIMARY SOURCE NEEDED].** |
| Harvey AI "$200M raise at $11B valuation" | `compliance-legal.md` | Claim has no source link. **Add URL or [SOURCE NEEDED].** |
| IKEA/Ingka "USD 200M investment in Waabi" | `cross-cut-nordic-enterprise-ai.md` | No URL. **Add [SOURCE NEEDED].** |
| Norway Post / Salesforce "500+ agents" | `cross-cut-vertical-saas-agents.md` | No specific URL. **Add [SOURCE NEEDED].** |
| Salesforce Agentforce "18,500 deals, 9,500 paid" | `convergence-platform-agents-in-wild.md` | No direct URL for this specific stat in this file (URL exists in other files). **Cross-reference or add URL.** |
| Telia Ultimate.ai URL | `customer-service.md` | May redirect due to Zendesk acquisition. **Verify URL is still live; update if broken.** |
| Copyright — Agilcon extended quote | `convergence-platform-agents-in-wild.md` + `convergence-governance-as-prerequisite.md` | Same multi-sentence quote in two files. Consider shortening to key phrase "an agent is a micro-department" and paraphrasing the rest. |
| Copyright — Anthropic three-situation framework | `convergence-narrow-agent-orchestration.md` | Closely reproduces Anthropic's analytical framework. Add "Anthropic recommends evaluating three conditions:" framing and cite clearly. |

---

## Recommended Priority Order for Fixes

### P0 — Do first (anchor claims that undermine credibility if left unsourced)

1. **`sales-marketing.md` — "85% of AI SDR deployments fail"** → Add [SOURCE NEEDED — ANCHOR CLAIM] or remove percentage and reframe as anecdotal
2. **`convergence-platform-agents-in-wild.md` — Carnegie Mellon "70% fail"** → Reconcile with `real-vs-fake-agents.md` arXiv source; remove inconsistent figure
3. **`convergence-narrow-agent-orchestration.md` — "40% of multi-agent pilots fail"** → Add [SOURCE NEEDED]
4. **`convergence-platform-agents-in-wild.md` — McKinsey "95% see no return"** → Find McKinsey report URL or add [SOURCE NEEDED]
5. **`cross-cut-chasm-crossing-patterns.md` — S&P Global "42% abandoned"** → Add [SOURCE NEEDED] or find S&P link
6. **Remove `agent-platforms-research.md` contents** (developer-focused, out of scope)
7. **Remove `claude-agent-runtime-vision.md` contents** (developer infrastructure, out of scope)

### P1 — Fix within next research cycle

8. **`finance-accounting.md` Market Context** — Add [SOURCE NEEDED] to all 8 unsourced statistics
9. **`operations-supply-chain.md` Key Market Data Points** — Add [SOURCE NEEDED] to all 10 unsourced statistics
10. **`convergence-governance-as-prerequisite.md`** — Remove MindStudio Signal 10 (vendor fluff)
11. **`customer-service.md` — Swedbank Nina** — Remove (outdated source, superseded by fresher Nordic cases)
12. **`finance-accounting.md` — JPMorgan** — Replace digitaldefynd.com with primary source
13. **`operations-supply-chain.md` — Unilever, Maersk, Stora Enso** — Replace low-authority blogs with primary sources

### P2 — Improve on next research sweep

14. Add chatbot inflation labels (Level 1-2 tags) to: Nordea Nova, DNB Aino, NAV Frida, Kommune-Kari, Siemens Watson, Unilever Unabot, Telia, Personio (8 findings)
15. Add vendor-sourced labels to: Thalamus AI, Paradox AI, Odyssey Automation bank case, Sana Labs, Leena AI/CCEP, CUBE/4CRisk
16. Resolve NAV Frida + Kommune-Kari "web search synthesis" — find primary Norwegian sources
17. Verify VTT Finland Salesforce URL is still live and leads to VTT content
18. Shorten Agilcon quote to key phrase across both files
19. Add attribution framing to Anthropic three-situation framework reproduction

### P3 — Optional / housekeeping

20. Fix potentially broken Telia/Ultimate.ai URL
21. Verify Hertz/Decagon URL links to specific case study
22. Add RAND report URL for `convergence-governance-as-prerequisite.md` or add [SOURCE NEEDED]
23. Add Nordic AI Union Summit URL or remove reference
24. Verify Klarna CEO "it went too far" is exact quote vs. paraphrase across all files
25. Reconcile multi-agent inquiry surge 1,445% — Gartner URL exists elsewhere, apply it

---

## Files Reviewed

### `/continuous-research/findings/`
- `customer-service.md`
- `finance-accounting.md`
- `operations-supply-chain.md`
- `hr-people-ops.md`
- `compliance-legal.md`
- `sales-marketing.md`
- `product-strategy.md`
- `cross-cut-nordic-enterprise-ai.md`
- `cross-cut-vertical-saas-agents.md`
- `cross-cut-chasm-crossing-patterns.md`
- `convergence-platform-agents-in-wild.md`
- `convergence-hybrid-beats-autonomous.md`
- `convergence-governance-as-prerequisite.md`
- `convergence-narrow-agent-orchestration.md`

### `/research/`
- `agent-platforms-research.md`
- `claude-agent-runtime-vision.md`
- `real-vs-fake-agents.md`
- `ai-transformation-frameworks-findings.md`
- `ai-transformation-frameworks-resources.md`
- `ai-network-curators-findings.md`
- `ai-network-curators-resources.md`
- `competitors-direct-findings.md`
- `competitors-direct-resources.md`
- `competitors-elearning-findings.md`
- `competitors-elearning-resources.md`
- `practice-curators-findings.md`
- `practice-curators-resources.md`
- `helsinki-consultancies-findings.md`
- `helsinki-consultancies-resources.md`
- `nordic-digital-leaders-findings.md`
- `teaching-methods-findings.md`
- `teaching-methods-resources.md`
- `competitor-research-prompts.md`

### `/analytics/` (used as input, not pruned)
- `audit-batch-1.md`
- `audit-batch-2.md`
- `audit-batch-3.md`
- `audit-batch-4.md`

---

## Files Flagged for Human Review

| File | Question |
|------|----------|
| `agent-platforms-research.md` | Entire file is developer-platform focused (LangGraph, CrewAI, Bedrock AgentCore internals). Recommended for removal/stubbing. Confirm before executing — the file may have been intentionally included for understanding the competitive technology landscape even if not curriculum content. |
| `claude-agent-runtime-vision.md` | Technical analysis of agent hosting infrastructure. Out of editorial scope. Confirm removal before executing — may have strategic value for understanding what Anthropic is building. |
| `real-vs-fake-agents.md` — coding agent sections | The Level 4 coding agents section (Claude Code, Devin, SWE-bench) is developer-focused. The Level 0-4 taxonomy and agent washing analysis are business-relevant. **Human judgment needed:** should the coding sections be pruned to leave only the business-relevant taxonomy, or kept as background context that informed the taxonomy? |
| Klarna CEO quote consistency | Multiple files use Klarna CEO quotes with slightly different wording. Some are in quotation marks, some paraphrased. Before any revision, verify exact wording against the Fortune.com primary source so all files are consistent. |
| `sales-marketing.md` — "85% AI SDR failure rate" | If no source can be found for this anchor claim, the entire orientation framing of the sales file needs rethinking. The pattern (AI SDRs failing at high rates) is directionally correct and well-supported by other evidence (conversion rate decay, Artisan LinkedIn ban, AI SDR "cringe" phenomenon). The question is whether to reframe the orientation around that convergent evidence rather than one unverified statistic. This requires editorial judgment. |

---

*Report generated by Research Pruner Agent. No files modified. Changes require human confirmation before execution.*
