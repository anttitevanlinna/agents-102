# Retrieval Quality Test Questions — Theme E

These test whether the restructured knowledge base enables fast, grounded answers. Each question targets a specific retrieval pattern.

Run each question independently against the knowledge base. Score with `judges/retrieval-quality-judges.md`.

---

## Q1: "What is the leading AI platform for business agents?"

**Retrieval pattern:** Cross-platform comparison (must synthesize across platforms)
**Expected entry point:** `synthesis/index.md` → `synthesis/platform-trajectories.md` + `synthesis/cto-answer.md`
**Expected files read:** 2-3
**Quality gates:**
- Must say "nobody leads" with evidence (OpenAI COO quote, MIT 95% stat)
- Must compare all 4 horizontal platforms + mention vertical SaaS ahead in CS
- Must include counter-evidence (Microsoft distribution advantage, Anthropic standards play)
- Evidence levels cited for key claims

## Q2: "Define AI-native team"

**Retrieval pattern:** Concept retrieval (must find a specific definition scattered across files)
**Expected entry point:** `synthesis/index.md` → `platform-watch/ai-native-teams/state.md`
**Expected files read:** 1-2
**Quality gates:**
- Must distinguish from "team using AI tools" — the co-worker vs tool distinction
- Must reference compound engineering as a seed signal (Every, Imprint, Autodesk)
- Should mention team characteristics: size, roles, AI work division, tool stacks
- Should acknowledge this is early (Level 2 evidence, pre-convergence)

## Q3: "Which domain is leading in agentic and why?"

**Retrieval pattern:** Evidence ladder traversal (must navigate convergence levels)
**Expected entry point:** `synthesis/index.md` → `synthesis/domain-convergence.md`
**Expected files read:** 1-2
**Quality gates:**
- Must name all 3 Level 3+ domains: customer service, coding, finance/accounting
- Must explain the Level 4 meta-pattern: rules + verification + scarcity
- Must predict next domains (legal, compliance) using the meta-pattern
- Must include counter-evidence (86% CFO hallucinations, compound error problem)

## Q4: "What can Salesforce Agentforce actually do today?"

**Retrieval pattern:** Single platform deep-dive (must find the right state file)
**Expected entry point:** `synthesis/index.md` → `platform-watch/vertical-saas/state.md`
**Expected files read:** 1-2
**Quality gates:**
- Must cite named deployments with metrics (Finnair 80%, Wiley 40%+, Reddit 46%)
- Must cite limitations (15 topics max, 20 agents, pricing instability)
- Must distinguish vendor claims from independent evidence
- Must note expansion beyond CS (IRS, Williams-Sonoma) with evidence quality disclaimer

## Q5: "What are Nordic companies doing with business agents?"

**Retrieval pattern:** Geographic filter (must find Nordic-specific evidence across domains)
**Expected entry point:** `synthesis/index.md` → `synthesis/nordic-landscape.md`
**Expected files read:** 1-3
**Quality gates:**
- Must name: Finnair, reMarkable, Klarna (course correction), Cognite/Aker BP, Go Autonomous cluster (Danfoss, Grundfos)
- Must note: Nordic market is pre-adoption for enterprise agents (Level 3 absence)
- Must distinguish Nordic-origin (Legora, Pactum) from Nordic-deploying
- Must mention Nordic product companies (Noru, Agaton, RELEX)

## Q6: "Should we build on Microsoft Copilot or wait?"

**Retrieval pattern:** Platform trajectory + CTO advice
**Expected entry point:** `synthesis/index.md` → `synthesis/platform-trajectories.md` + `synthesis/cto-answer.md`
**Expected files read:** 2-3
**Quality gates:**
- Must cite user preference collapse (8% choose Copilot, Recon Analytics)
- Must cite Cowork silence (39+ consecutive zeros)
- Must cite E7 pricing concern (>$200/user effective cost)
- Must give actionable advice, not just "it depends"
- Must mention the coding agent alternative

## Q7: "What's the evidence for competence-first vs platform-first adoption?"

**Retrieval pattern:** Pattern retrieval (must find a specific cross-cutting pattern)
**Expected entry point:** `synthesis/index.md` → `findings/by-pattern/competence-first.md` or `synthesis/patterns.md`
**Expected files read:** 1-2
**Quality gates:**
- Must cite Level 3 convergence with named sources (Mollick, MIT, Moderna, F-Secure)
- Must note: zero counter-evidence found across 53+ cycles
- Must explain the mechanism (competence → mental models → shared vision → strategy)
- Must be actionable: "give 20 people $20/month coding agents"

## Q8: "How real is the agent security problem?"

**Retrieval pattern:** Cross-cutting concern (spans platforms and patterns)
**Expected entry point:** `synthesis/index.md` → `synthesis/patterns.md` or `synthesis/enterprise-reality.md`
**Expected files read:** 2-3
**Quality gates:**
- Must cite: 500K shadow agents at Microsoft, 29% ungoverned
- Must cite: DLP bypass Level 3 convergence, CVE examples
- Must cite: access-trust gap (Level 4 meta-pattern — 54-95% access, 5-22% trust)
- Must name governance products shipping (Agent 365, ConductorOne, Stacklok) with zero adoption caveat

## Q9: "What does the compound error problem mean for our agent plans?"

**Retrieval pattern:** Technical concept + practical implications
**Expected entry point:** `synthesis/index.md` → `synthesis/enterprise-reality.md` or `findings/by-pattern/`
**Expected files read:** 1-2
**Quality gates:**
- Must state the math: 85% per step × 10 steps = 20% success
- Must explain why CS works (2-3 steps) and complex workflows don't (10+ steps)
- Must reference Salesforce's own help portal (62% vs 80% target)
- Must give design advice: short action chains, supervision architecture

## Q10: "Who are the practitioners actually building business agents — not coding agents?"

**Retrieval pattern:** Practitioner retrieval (must navigate source roster efficiently)
**Expected entry point:** `synthesis/index.md` → `synthesis/practitioner-map.md` or `source-roster.md`
**Expected files read:** 1-2
**Quality gates:**
- Must name practitioners by domain: finance (Myers/HPE, Daher/Pilot), CS (Masin/Gradient Labs), compliance (Lawrence/Greenlite, Ranjan/Sardine), ops (Uppuluri/Walmart, Ballard/Toyota), HR (Desjourdy/Hitachi, Sammut/Zapier)
- Must note the publishing gap: practitioners build but don't publish
- Must note which platform they use (mostly proprietary or Claude)
- Must flag Nordic roster thinness
