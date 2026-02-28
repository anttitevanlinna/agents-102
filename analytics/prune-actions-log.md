# Prune Actions Log — 2026-02-21

**Input:** `analytics/research-prune-report.md`
**Executor:** Claude Opus 4.6

---

## Actions Completed

### 1. REMOVED: Swedbank Nina from `customer-service.md`

- **What:** Removed the entire "Swedbank -- Nina Virtual Assistant" finding block (company table + all fields)
- **Why:** 2018 Computer Weekly source is stale. The finding was superseded by fresher Nordic banking cases (Nordea Nova, DNB Aino, Gjensidige). Added no insight not already covered.
- **Research log preserved:** The Round 2 research log still references Swedbank Nina in the search history, which is appropriate for audit trail.

### 2. REMOVED: MindStudio Signal 10 from `convergence-governance-as-prerequisite.md`

- **What:** Removed Signal 11 (MindStudio "30% faster deployment with built-in compliance") entirely. Renumbered remaining signals (old 12-16 became 11-15). Updated convergence assessment counts: "16 independent signals" to "15 independent signals", removed MindStudio from the platform/vendor lessons count (3 to 2). Added explanatory note in convergence assessment.
- **Why:** Vendor self-citation with zero incremental analytical value. The broader point (governance reduces deployment time) is already proven by Goldman Sachs, KPMG, and Allianz with primary sources.

### 3. NOT REMOVED: `agent-platforms-research.md` and `claude-agent-runtime-vision.md`

- **Per instructions:** These files are intentionally kept despite the prune report flagging them as out of editorial scope.

### 4. ADDED `[SOURCE NEEDED]` markers — 6 P0 anchor claims

| # | Claim | File | Location(s) marked |
|---|-------|------|--------------------|
| 4a | "85% of autonomous AI SDR deployments shut down within 6 months" | `findings/sales-marketing.md` | Orientation summary + Sendoso/Gem-E chasm signal field |
| 4b | Carnegie Mellon "agents fail 70% of real-world office tasks" | `findings/convergence-platform-agents-in-wild.md` | "The Uncomfortable Truth" section. Note added about inconsistency with `real-vs-fake-agents.md` arXiv figure. |
| 4c | "40% of multi-agent pilots fail within 6 months" | `findings/convergence-narrow-agent-orchestration.md` | Convergence assessment section + "Honest Starting Point" section |
| 4d | McKinsey "95% see no measurable return" | `findings/convergence-platform-agents-in-wild.md` | Pattern 4 bullet point. Note added to verify against McKinsey "Superagency in the Workplace" report. |
| 4e | S&P Global "42% abandoned AI initiatives" | `findings/cross-cut-chasm-crossing-patterns.md` | Anti-Pattern 5 text + Summary Statistics table |
| 4f | RAND "80% of AI projects fail" | `findings/convergence-governance-as-prerequisite.md` | Signal 13 (Gartner) text + "Cost of NOT Doing Governance First" table |

### 5. ADDED chatbot classification labels — 5 findings

| # | Finding | File | Label added |
|---|---------|------|-------------|
| 5a | Nordea Nova | `findings/customer-service.md` | "Classification: Chatbot/conversational AI (Level 1-2), not agentic. Conversational routing -- not confirmed to take autonomous actions on customer accounts." |
| 5b | DNB Aino | `findings/customer-service.md` | "Classification: Chatbot/conversational AI (Level 1-2), not agentic. Conversational routing -- autonomous actions not confirmed." |
| 5c | NAV Frida | `findings/customer-service.md` | "Classification: Chatbot/conversational AI (Level 1), not agentic. Informational Q&A -- answers welfare queries but does not take autonomous action on welfare cases." |
| 5d | Kommune-Kari | `findings/customer-service.md` | "Classification: Chatbot/conversational AI (Level 1), not agentic. Informational Q&A -- answers citizen inquiries, does not take autonomous action on municipal services." |
| 5e | Telia / Ultimate.ai | `findings/customer-service.md` | "Classification: Chatbot/conversational AI (Level 1-2), not agentic. Chat deflection -- automates 30% of chat support but not confirmed as action-taking agent." |

### 6. MARKED secondary blog sources with `[NEEDS PRIMARY SOURCE]`

| # | Finding | File | Blog flagged | Note added |
|---|---------|------|-------------|------------|
| 6a | JPMorgan Chase | `findings/finance-accounting.md` | digitaldefynd.com | Marked source field with note to replace with JPMorgan annual report, IR disclosures, or CFO public statements |
| 6b | Unilever supply chain | `findings/operations-supply-chain.md` | cleverence.com | Marked source field with note to replace with Unilever corporate comms, WEF report, or industry press |
| 6c | Maersk $300M+ savings | `findings/cross-cut-nordic-enterprise-ai.md` | enkiai.com, debales.ai | Marked both blog sources; noted Maersk's own AI insights page is retained as a valid source |

---

## Files Modified

1. `continuous-research/findings/customer-service.md` — Swedbank Nina removed; 5 chatbot labels added
2. `continuous-research/findings/convergence-governance-as-prerequisite.md` — MindStudio removed + renumbered; RAND [SOURCE NEEDED] added (2 locations)
3. `continuous-research/findings/sales-marketing.md` — 85% SDR claim [SOURCE NEEDED] added (2 locations)
4. `continuous-research/findings/convergence-platform-agents-in-wild.md` — CMU 70% [SOURCE NEEDED] added; McKinsey 95% [SOURCE NEEDED] added
5. `continuous-research/findings/convergence-narrow-agent-orchestration.md` — 40% multi-agent [SOURCE NEEDED] added (2 locations)
6. `continuous-research/findings/cross-cut-chasm-crossing-patterns.md` — S&P Global 42% [SOURCE NEEDED] added (2 locations)
7. `continuous-research/findings/finance-accounting.md` — JPMorgan [NEEDS PRIMARY SOURCE] added
8. `continuous-research/findings/operations-supply-chain.md` — Unilever [NEEDS PRIMARY SOURCE] added
9. `continuous-research/findings/cross-cut-nordic-enterprise-ai.md` — Maersk [NEEDS PRIMARY SOURCE] added

## Not Actioned (out of scope for this run)

- P1/P2 items from prune report (vendor-sourced labels, additional [SOURCE NEEDED] markers for P2 claims, HR file chatbot labels for Siemens Watson / Unilever Unabot / Personio)
- `research/agent-platforms-research.md` and `research/claude-agent-runtime-vision.md` explicitly kept per instructions
- Copyright items (Agilcon quote shortening, Anthropic framework attribution)
- URL verification (Telia/Ultimate.ai, Hertz/Decagon)
