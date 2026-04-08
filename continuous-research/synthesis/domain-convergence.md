---
type: synthesis
domain: cross-domain
evidence_level: 4
updated: 2026-03-28
answers: ["which domains crossed", "domain maturity", "convergence evidence", "Level 4 meta-pattern"]
---

# Domain Convergence — Which Domains Have Crossed? (March 2026)

## The Level 4 Meta-Pattern

**Autonomous agents converge first in domains where: (1) rules are codified, (2) correctness is verifiable, and (3) talent supply is constrained.**

This is the strongest finding in the research program. It holds across coding, customer service, finance/accounting, and legal/compliance — four independent domains, same structural conditions.

## Domains by Evidence Level

### Level 4: Coding Agents (meta-platform)

Compound engineering confirmed at Level 3 with 12 independent practitioner signals (Every, Imprint, Autodesk, Anthropic/Cherny, Microsoft CVP/Schillace, Zelle/Panjwani, AMPECO, Praxis, Balic, Walker/Tembo, Shukla, Martin/Uncharted). Plugin at 10,100+ stars. Beyond-coding: only one signal (economics research). Nordic: zero.

- **Beachhead:** Solo developer productivity → small team compound engineering → spec-driven development. The bowling alley sequence.
- **Transition trigger:** Claude Code and Cursor reaching reliability thresholds where compound engineering (agent builds agent) became practical. Pricing ($20/mo) eliminated adoption friction.
- **Early majority signal:** Enterprise engineering orgs adopting (Autodesk, Microsoft internal) = pragmatists following innovator proof. But business-domain use still innovator-only.

Coding agents are structurally different because they compound — they build the MCP server, the agent that uses it, the eval that tests it, and the next agent. See [patterns.md](patterns.md) Pattern 41.

### Level 3: Customer Service (first domain to cross)

Convergence-level evidence across Zendesk, Salesforce, and HubSpot. Clear success criteria + bounded scope + human escalation tolerance = why this domain leads.

- Zendesk: 51% auto-resolution (SeatGeek), outcome-based pricing ($1.50-$2.00/resolution)
- Salesforce Agentforce: 80% chat at Finnair, UK police "Bobby" 20% reduction
- HubSpot: 84% deflection at Zeffy
- Intercom: 81% AI resolution, first non-engineering team with genuine restructuring (new roles: AI Ops Lead, Knowledge Manager)

**Counter-evidence:** Klarna reversed after quality dropped — "too much efficiency, not enough quality." Agentforce Help portal reverted (couldn't use own product to replace search).

- **Beachhead:** Tier-1 chat (password resets, order status, FAQ) → email triage → complex multi-turn resolution. Each sub-niche has different reliability requirements.
- **Transition triggers:** (1) Zendesk's outcome-based pricing ($1.50-$2/resolution) eliminated financial risk — you pay for success, not attempts. (2) Intercom creating AI Ops Lead and Knowledge Manager roles — the organizational structure adapted to the technology, not just the technology to the org. (3) Bounded scope — CS has clear "done" criteria unlike most business processes.
- **Early majority signals:** Finnair (not a tech company) deploying Agentforce at 80% = pragmatist adoption, not innovator. UK police = public sector pragmatist. These are reference-driven buyers, not enthusiasts.
- **Whole product readiness:** Technology: ready. Training: partial (vendor-led, no independent). Integration: within-platform only. Governance: partial (audit trails within vendor). References: yes (SeatGeek, Finnair, Zeffy). **Verdict: closest to whole product of any domain, but cross-system integration still missing.**

### Level 3: Finance/Accounting (third domain, upgraded cycle 55)

8+ independent companies shipping autonomous agents: Pilot, Basis, Accrual, Digits (97.8% accuracy vs 79.1% human), Vic.ai (70%+ autonomous AP), Numeric ($89M funding), Goldman Sachs (Claude agents, 30% faster onboarding), OpenCFO, HPE ("Alfred" agent).

5 named practitioners: McKellar, Seibert, Argenti, Myers, Shedimbi.

**Counter-evidence real but not blocking:** 86% CFOs encountered hallucinations, 40% rework losses. Deploy with human oversight for material decisions.

**Nordic weak:** Fintower (Sweden, FP&A, EUR 1.5M seed) only. Zero accounting agents.

- **Beachhead:** Accounts payable automation (Vic.ai 70%+ autonomous, Pilot) → reconciliation (Digits 97.8% accuracy) → FP&A (Numeric, OpenCFO). AP is the beachhead because invoices are structured, rules are explicit, verification is mechanical.
- **Transition triggers:** (1) AI-native startups (Pilot, Basis, Digits) built purpose-built solutions — not horizontal platforms adapted. (2) Finance's existing culture of verification and audit made the trust-building sequence natural. (3) Talent scarcity in bookkeeping/AP created genuine pull.
- **Early majority signals:** Goldman Sachs and HPE deploying = pragmatist adoption. Goldman is not an innovator in back-office tech. But both are enterprise-internal, not customer references yet.
- **Whole product readiness:** Technology: ready (multiple vendors). Training: missing. Integration: partial (most are standalone). Governance: strong inherent (finance has existing audit culture). References: emerging (Goldman, HPE). **Verdict: technology ahead of ecosystem. Training and integration are the gaps.**

### Level 3: Sales/GTM (second domain, with critical nuance)

Convergence confirmed but with a twist: **hybrid wins, autonomous fails.** AI SDR bubble popping — 11x lost 70-80% of customers, Artisan admitted hallucinations. SaaStr: 90% AI SDR failure rate, 2% success rate.

The winning pattern is hybrid: AI drafts, human reviews, AI executes.

- **Beachhead:** Meeting prep and research (personal agent) → email drafting (hybrid) → pipeline analysis. NOT outbound SDR — that's where the failures concentrated. The beachhead is internal productivity, not external automation.
- **Transition triggers:** (1) The AI SDR bubble POPPING was itself a trigger — it taught the market what doesn't work and redirected energy toward hybrid. (2) CRM vendors (HubSpot, Salesforce) embedding AI natively reduced adoption friction vs. standalone AI SDR tools.
- **Early majority signals:** Weak. The AI SDR failure wave has made pragmatists cautious. Most enterprise sales teams are still at "personal ChatGPT for research" level.
- **Whole product readiness:** Technology: ready for hybrid, not for autonomous. Training: missing. Integration: strong within CRM platforms. Governance: weak (who audits AI-drafted emails?). References: mostly negative (11x, Artisan). **Verdict: chasm is WIDENING for autonomous, narrowing for hybrid.**

### Approaching Level 3: Legal/Compliance

Legal AI access at 83% but trust at only 22.1% (Factor/Artificial Lawyer). Harvey AI $195M ARR, 500+ customers, 42% Am Law 100. Named practitioners: Craske/CMS (7,000 lawyers, 118 hrs/yr saved), Wakeling/A&O Shearman (4,000 staff, 43 jurisdictions), Daniels/Crosby (1K+ contracts).

Compliance/AML at 10 signals, 7 passing all gates — Unit21, Sardine AI, Flagright, Greenlite/Bretton AI, Diligent AI, Nasdaq Verafin, WorkFusion. But only 18% of AML practitioners have AI in production (ACAMS survey n=850).

### Level 2-3: Product Management (new domain — April 2026)

PM execution work (PRDs, interview synthesis, feedback analysis) at Level 3 convergence. PM strategic work (prioritization, pricing, OKR setting) at Level 0-2. The execution-strategy gap IS the story. 20+ named practitioners found. Three-way role split emerging: Full Stack Builder (AI-native), AI-Augmented PM (mainstream), Agent Manager (enterprises with deployed AI). PM jobs at multi-year highs — "PM is dead" narrative unsupported by data.

- **Beachhead:** PRD writing and feedback synthesis. Bounded, structured, verifiable. Fits L4 meta-pattern. Then: interview synthesis. Then: spec-as-interface (approaching convergence).
- **Transition trigger:** Claude Code crossing usability threshold for non-engineers (Torres: "hadn't opened a terminal since school"). $20/mo entry cost. Practitioner evangelists (Rekhi 1,500 PMs at webinar, Torres, Huryn) creating social proof.
- **Early majority signals:** Weak. All evidence from tech-forward practitioners and AI-native companies. No pragmatist enterprise PM team publishing.
- **Whole product readiness:** Technology: ready for execution. Training: emerging (Reforge, Maven, ccforpms.com). Integration: partial. Governance: missing. References: enthusiast-only. **Verdict: post-chasm for execution PM work, pre-chasm for strategic PM work.**

See `../findings/by-domain/product-management.md` for full evidence.

### Pre-Chasm: HR, Operations/Supply Chain

**HR = black hole.** Zero named practitioners in 67 cycles. Only 11% embedded AI in workflows (SHRM). Structural silence — HR deployers don't publish. See [patterns.md](patterns.md) Pattern 46 (vendor-driven vs practitioner-driven domains).

- **Beachhead:** Unknown. Candidate sub-niches: screening/scheduling (most bounded), onboarding workflows, policy Q&A chatbots. But no evidence any sub-niche has traction beyond vendor demos.
- **Transition triggers:** None observed. HR's structural problem: outcomes are subjective (hiring quality, employee experience), verification is slow (6-month feedback loops), and the domain is legally sensitive. All three L4 meta-pattern conditions are ABSENT — rules are ambiguous, correctness is unverifiable, talent isn't scarce enough to force automation.
- **Early majority signals:** None. Pragmatists can't find references because nobody publishes.
- **Whole product readiness:** Missing across every dimension. **Verdict: pre-pre-chasm. No bowling alley has formed.**

**Operations/supply chain further along than expected:** Procurement negotiation (Pactum 50+ enterprises, Zip $355B), logistics communication (HappyRobot/DHL, Uber Freight 30+ agents). First Nordic cluster: Go Autonomous, Danfoss (80% automation, $15M savings), Maersk (3K+ autonomous sourcing events/year). Counter-evidence: over-scoped supply chain agents become "ambiguity engines."

- **Beachhead:** Procurement negotiation (Pactum) and logistics communication (HappyRobot). Both are narrow, high-volume, rule-based — fits the L4 meta-pattern. Procurement negotiation has the clearest unit economics (measurable savings per transaction).
- **Transition triggers:** (1) Supply chain's existing data infrastructure (EDI, ERP, WMS) provides structured inputs agents can work with. (2) Nordic industrial companies (Danfoss, Maersk) have both the scale and engineering culture to experiment.
- **Early majority signals:** Danfoss and Maersk ARE the early majority signal — these are not startups or innovators, they're established industrials adopting because the economics work. The Nordic operations cluster may be the first domain where Nordic leads rather than lags.
- **Whole product readiness:** Technology: ready for narrow use cases. Training: missing. Integration: strong (existing ERP/WMS). Governance: industrial safety culture helps. References: emerging (Danfoss, Maersk). **Verdict: beachhead forming in procurement. Broader operations still pre-chasm.**

## The Access-Trust Gap — Level 4 Cross-Domain Meta-Pattern (Pattern 47)

Five independent data sources all show the same structure: **access/experimentation is widespread (54-95%), but trust/production readiness is rare (5-22%), with gaps always >35 percentage points.**

| Domain | Access | Trust | Gap | Source |
|--------|--------|-------|-----|--------|
| Legal | 83% | 22.1% | 61 pts | Factor/Artificial Lawyer |
| Cross-industry | 86% invest | 6% trust | 80 pts | HBR n=603 |
| Security | 80.9% past planning | 14.4% approved | 66 pts | Gravitee n=900+ |
| Finance | 54% priority | 15% ready | 39 pts | Deloitte CFO Signals |
| All domains | 95% pilot (custom/task-specific tools only) | 5% production | 90 pts | MIT NANDA (N=52, narrow P&L definition, see cycle 80 audit) |

**The bottleneck is NOT technology access but organizational trust-building.** Platform selection is downstream of trust-building. Agents 102 IS the trust-building program.

## Adoption Velocity — Rate of Change (track cycle-over-cycle)

| Domain | Direction | Velocity signal | Last change |
|--------|-----------|----------------|-------------|
| Coding agents | Accelerating | New practitioner signals every cycle. Beyond-coding use expanding. | Ongoing |
| Customer service | Steady | Crossed Level 3 early. Incremental improvements, no step-change since. Klarna reversal slowed momentum. | Cycle 55 |
| Finance/accounting | Accelerating | Upgraded to L3 at cycle 55. New entrants (Numeric $89M, OpenCFO). Goldman/HPE = enterprise entry. | Cycle 55 |
| Sales/GTM | Decelerating (autonomous) / Steady (hybrid) | AI SDR failures destroyed confidence. Hybrid adoption continues quietly. | Cycle ~60 |
| Legal/compliance | Slow acceleration | Harvey's revenue growth ($195M ARR) is steady. Regulatory pressure (EU AI Act) may force compliance-domain adoption. | Cycle 65 |
| HR | Flatlined | No change in 93 cycles. Structural conditions absent. | Never moved |
| Operations/supply chain | Accelerating (Nordic cluster) | Danish industrial cluster is new and growing. Procurement beachhead forming. | Cycle 65 |
| Product management | Split (execution accelerating, strategy flat) | Execution work at L3. Strategy work stuck at L0-2. Analytics MCP infrastructure arriving. | Cycle 93 (Apr 2026) |

**Research instruction:** When updating this table, note the cycle number of the last evidence-level change. If a domain hasn't moved in 10+ cycles, investigate why.

## Early Majority Signals — Who Are the Pragmatists?

Early adopters buy vision. Early majority buys references. Tracking where pragmatist behavior appears:

**Confirmed early majority signals:**
- **CS:** Finnair, UK police — non-tech orgs adopting after seeing vendor proof. Reference-driven.
- **Operations:** Danfoss, Maersk — established industrials, not startups. Economics-driven.
- **Coding:** Autodesk, Microsoft internal — enterprise engineering orgs following developer innovators.

**No early majority signals:**
- HR (no signals at all), Sales/autonomous (failure wave scared pragmatists), Legal (access high, trust low — classic pre-majority state).

**The pragmatist test:** When a CTO says "who in my industry did this successfully?" — can we name a non-innovator company with measurable results? If yes: early majority has entered. If no: still at the chasm.

See [patterns.md](patterns.md) for full pattern detail. See `../findings/` for per-domain evidence.
