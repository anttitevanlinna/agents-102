---
type: finding
domain: cross-domain
evidence_level: 3
platforms: [multiple]
practitioners: [F-Secure, Mollick/Wharton, MIT/BCG]
nordic: true
updated: 2026-03-28
answers:
  - "why does competence need to come before platform selection?"
  - "what evidence supports competence-first?"
  - "how does F-Secure validate the thesis?"
  - "what's the mechanism behind competence-first?"
  - "what's the competence gap in numbers?"
---

# Competence-First — Evidence for the Core Thesis

**Evidence level:** Level 3 (convergence) | **Last updated:** 2026-03-28

**Thesis:** Without agent competence, there is no vision — just governance of an abstraction. The sequence matters: Competence → Discovery → Context → Platform. Skip to platform selection and you're choosing between vendor narratives.

## The Competence Gap Is Quantified

- **78% of executives** feel AI advances too fast for their training efforts. Source: [InformationWeek](https://www.informationweek.com/machine-learning-ai/2026-enterprise-ai-predictions-fragmentation-commodification-and-the-agent-push-facing-cios)
- **82% of companies in early AI maturity** have no talent strategy. Source: [Joget analysis](https://joget.com/ai-agent-adoption-in-2026-what-the-analysts-data-shows/)
- **Only 8.6% of companies** have AI agents in production. 63.7% have no formalized AI initiative. Source: [Joget analysis](https://joget.com/ai-agent-adoption-in-2026-what-the-analysts-data-shows/)
- **95% of custom/task-specific GenAI tools** report no measurable P&L impact (MIT NANDA, July 2025, N=52 interviews — narrow definition of success; ~40% success for general LLMs in same study. See cycle 80 audit)
- **60% of AI projects fail** due to flawed ROI calculations and unrealistic expectations (TODO: verify critically — round-number stat without specific URL or methodology)
- **OpenAI's own COO** (Feb 2026): "We have not yet really seen enterprise AI penetrate enterprise business process." Source: [TechCrunch](https://techcrunch.com)

The pattern: rush to adopt → skip competence building → agent project fails → blame the technology.

## The Mechanism: No Mental Models, No Vision

Previous transformations (digital, agile, cloud) could be vision-led because concepts were accessible through analogy. A CEO didn't need to write code to envision a digital company. Agents are structurally different. "An agent that autonomously processes invoices across three systems with human escalation at decision points" means nothing to someone who hasn't built or used an agent. They hear "automation" and think RPA. The mental model gap isn't knowledge — it's experience. No slides bridge it.

**The sequence is evidence-backed:**
No mental models → no shared vision → experiments stay isolated → no organizational learning → most fail. [NOTE: The oft-cited "95% fail" is from MIT NANDA (N=52, narrow P&L-impact definition). Use directionally, not as precise measurement.]

Competence creates mental models. Mental models create shared vision. Vision connects experiments. Connected experiments create organizational learning.

## F-Secure Evidence (March 2026, Level 2)

After 2 modules of Claude Code 101, pretty much everyone started building — dashboards, agents, applications. Unprompted. Competence created pull. But builders hit three infrastructure walls:

1. **Data access.** Agents need Snowflake, Salesforce, internal systems. Without access, agents are toys on sample data.
2. **A platform to run AI-generated apps.** "Where does this live? How do I share it?" — the promotion path problem.
3. **Agent skills / user guidance.** Others need to find, understand, and use what builders create.

**The implication:** Competence creates builders. Builders discover infrastructure gaps faster and more accurately than any consultancy assessment. The three enablers are predictable and plannable. This is the natural handoff from Bootstrap to Advisory.

Source: F-Secure deployment experience, Antti direct [practitioner direct — first party]

## Independent Research Confirmation

- **Mollick (Wharton):** Individuals who build competence get 2-3x productivity. Organizations get only 10-20%. The gap is shared mental models — each person discovers something but no common language propagates it. Source: [Wharton research]
- **MIT/BCG:** 95% of custom/task-specific GenAI tools report no measurable P&L impact (MIT NANDA, July 2025, N=52 interviews — narrow success definition, self-described as "directionally accurate"). The differentiator: organizational capability to absorb AI, not technology investment. Source: [MIT/BCG study] [NOTE: Small qualitative study with structural conflict of interest — MIT NANDA builds agent infrastructure. See cycle 80 audit.]
- **HBR experimentation trap:** Hundreds of isolated experiments that never scale because no shared vision connects them. Source: [HBR Nov 2025](https://hbr.org/2025/11/overcoming-the-organizational-barriers-to-ai-adoption)
- **HBR behavioral science:** Leaders assume employees are excited about AI. They're wrong. Leadership enthusiasm vs. workforce readiness gap is a primary failure mode.

## Competence Creates Pull — People Find Their Own Processes

You don't need to tell people which processes to automate. Teach them to build agents, and they discover the right processes themselves. F-Secure evidence: nobody assigned "build an agent for X." The competence itself created the pull. Domain experts identifying opportunities are right more often than consultancies because they know the work.

This inverts the traditional transformation sequence:
- **Consultancy model:** Assess processes → identify candidates → build solutions → train users
- **Competence-first model:** Train people → they identify candidates → they build solutions → assess what worked

The second is faster, cheaper, and produces better candidates.

## Competence Leads to Lightweight Choices

The traditional sequence: assess → select platform → big procurement → 6-month pilot → maybe rollout. Produces PowerPoints and vendor lock-in.

What happens with competence first: people build → hit data access walls → "we need MCPs for Snowflake and Salesforce" → "where do we run simple apps?" These are lightweight, scoped, reversible decisions made by people who know what they need because they've built things. No board-level vendor evaluation needed.

Nobody should be making non-two-way-door decisions on the agent landscape right now. The entire space is pre-chasm. Every platform is immature. Build competence, and the decisions get smaller, faster, and reversible.

## Personal Use Is the Foundation

The sequence has no shortcuts:
1. **Personal use** — one person builds something for themselves. Gets the mental models.
2. **Personal competence creates pull** — they see more possibilities, build more, unprompted.
3. **Shared mental models** — enough people have personal experience that common language emerges.
4. **Organizational effects** — vision, strategy, and coordination become possible.

Skip step 1, nothing above holds.

## Nordic Caution Gap — CONFIRMED (Level 3)

Two independent surveys confirm Nordic companies are systematically more conservative on agentic AI:
- **BCG Nordic AI Report (2026):** Only 4% of Nordic companies achieve strong AI returns. 54% experimenting with agents, 24% observing/planning. 60% allocate less than 5% of AI budgets to agentic initiatives. Source: [BCG](https://www.bcg.com/publications/2026/nordic-ai-value-creation-or-bubble)
- **Deloitte Nordic AI Survey (Dec 2025):** 58% of Nordic organizations using agentic AI expect 3+ years for significant ROI (vs. 37% rest of Europe). Source: [Deloitte DK](https://www.deloitte.com/dk/en/issues/generative-ai/ai-roi-in-the-nordics.html)

The gap between "agents arriving in your software" and "organizations not budgeting for them" is the exact competence gap Agents 102 addresses.

## Counter-Evidence Search: "Design First, Then AI" (2026-04-15)

**Systematic search across 5 communities:** 10X ORG / Org Topologies, LeSS, sociotechnical design academics, SAFe, and Bayer's Dynamic Shared Ownership. 15+ searches, 3 rounds per target.

**Result: No counter-evidence found at Level 2 or above.**

The "design first" community consists of: (1) framework vendors selling a sequence with no public evidence (10X ORG uses a business novel, not case studies; SAFe AI-Native is a certification product), (2) one massive experiment (Bayer DSO — real org redesign at 100K+ people, but no documented AI connection), (3) misinterpreted McKinsey data (says "when deploying" = concurrent, not "before deploying"), and (4) a book (O'Reilly's Artificial Organizations) whose own cases describe competence-first sequences.

**Key finding:** Nobody has documented a company that redesigned their org for AI and THEN saw AI work better. The closest candidate (Bayer) redesigned for speed/delayering, not specifically for AI readiness. The McKinsey State of AI 2025 workflow redesign finding (55% of high performers redesign workflows "when deploying" AI) supports concurrent adaptation — exactly what competence-first predicts.

**The structural problem:** You cannot design an organization for a capability nobody in the organization understands. The redesign requires the knowledge that only comes from building.

**Refined thesis:** Competence-first does not mean "never redesign." It means: the redesign is informed by competence, not the other way around. Competence → Discovery → Redesign → More Deployment.

Full analysis: `platform-watch/cross-platform/runs/2026-04-15-ooda-design-first-counter-evidence.md`
