# Research Directions — From Internal Practitioner Research

**Source:** the enterprise internal transformation research (manual OODA passes, March 2026)
**Context:** the enterprise has been running parallel research on AI-native team formation, leadership, cultural enablers, and transition triggers — including direct field observations from enterprise AI training programs, agentic workshops, and greenfield AI-native product teams. This file identifies research directions for continuous research based on findings and gaps identified.

**Created:** March 30, 2026

---

## Priority 1: High-Impact, Evidence Exists But Not Captured Here

### 1.1 The Compound Trigger Model for Team Transitions

**Finding:** No single factor makes an existing team AI-native. Successful transitions require MULTIPLE patterns firing simultaneously. Eight patterns identified:

1. Seed Practitioner (strong evidence)
2. Workflow Redesign (strong — McKinsey 2.8x, Faros AI 10K devs)
3. Mandate/Crisis (moderate, mixed — works when leader practices, backfires as cost-cutting)
4. Project Catalyst (moderate)
5. Peer Cascade (moderate)
6. Tool Shift (necessary but NOT sufficient — enterprise data shows 90% AI-assisted PRs with no way-of-working change)
7. Generational/Cohort Shift (weak)
8. Pain Point Breakthrough (weak, high potential)

**What to investigate:**
- Which COMBINATIONS have documented success? Varonis used seed + guild + scorecards. Spotify used seed + mandate + tool. Are there more?
- Can you predict which combination works for a given team context?
- What's the minimum number of triggers required?
- Are there compound trigger failures documented (all patterns present but still failed)?

### 1.2 Varonis Transform-in-Place Deep Dive

**Finding:** Varonis is the ONLY documented enterprise-scale existing-team transformation to AI-native:
- Five-phase framework (Detect Enablers → Rollout → Monitoring → Level-Up → Completion)
- AI Guild structure
- Team-level adoption scorecards (created respectful competition)
- 100% engineering adoption
- PR cycle time decreased 96%, review time decreased 75%

**What to investigate:**
- Full detail on each phase: how long, what resistance, what worked
- The AI Guild model: composition, cadence, authority, activities
- Scorecard design: what metrics, how displayed, what behaviour they drove
- Was it just tool adoption or genuine way-of-working transformation?
- What happened AFTER 100% adoption? Sustainability?

**Source:** Varonis blog "From Hype to Culture" (2026)

### 1.3 The Faros AI Amdahl's Law Finding

**Finding:** Faros AI data (10,000+ devs, 1,255 teams): teams with high AI adoption complete 21% more tasks, merge 98% more PRs — BUT PR review time increases 91% and bugs increase 9%. AI coding gains evaporate when the rest of the workflow isn't redesigned.

**What to investigate:**
- Is this finding replicated elsewhere?
- What does "workflow redesign" look like specifically in the teams that avoided this trap?
- Connection to compound reliability math (0.85³ works, 0.85¹⁰ fails)

**Source:** Faros AI, "The AI Productivity Paradox" (Jun 2025)

---

## Priority 2: Novel Concepts — Need External Validation

### 2.1 Verification Infrastructure as Three-Level Progression

**Finding:** The prerequisite for agentic workflows in ANY domain is machine-checkable verification. Three levels:

1. **Expert-in-the-loop:** Human reviews every output. Bottleneck moves from generation to review. Where most non-engineering domains are today.
2. **Rule-based automated checks:** Brand guidelines as checkable rules. Decision logs as consistency checks. Human reviews exceptions only. The near-term target.
3. **Eval-based verification:** Agent evaluates agent output against learned quality criteria. System improves over time.

You can't skip levels. Level 2 generates the data that trains Level 3.

**The principle in one sentence:** Verification infrastructure turns "only the expert can do this" into "anyone with an agent can do this." A test suite doesn't care who wrote the code. The day brand compliance checks work the same way, anyone's agent can publish marketing copy.

**What to investigate:**
- What do Level 2 verification systems look like in non-engineering domains? Brand compliance checkers? Legal accuracy validators?
- Can agents bootstrap verification infrastructure?
- What's the minimum rule set for Level 2 to be useful?
- Industries with existing compliance frameworks (finance GAAP, healthcare FDA) — are they naturally closer to Level 2?

### 2.2 Agents Enable Cross-Team Contribution (Internal Open Source Pattern)

**Finding:** Enterprises have wanted "internal open source" for years — any team contributing to any codebase. Failed because barriers are real: context acquisition costs days, fear of breaking things, ownership psychology.

Agents dissolve ALL these barriers: read repos in minutes, no ownership ego, can run tests before touching anything. Internal open source works not because people changed, but because the economics of crossing team boundaries changed.

**The bottleneck is NOT understanding — it's safeguards** (test automation for code, brand compliance for marketing, etc.)

**What to investigate:**
- Any documented cases of cross-team agent contribution?
- How do teams react when agents cross boundaries?
- The commons problem: who invests in safeguards that enable cross-team contribution?

### 2.3 The Conditions Creator Role

**Finding:** Observable across Anthropic (Ben Kuhn's "glue" function), Citi (champion program team), GitHub (playbook maintainers). No researcher has formally studied or named it.

The role: sets up tools, training, peer networks, cultural safety — then gets out of the way. NOT a project manager. NOT a change manager. Creates the WOW moment, builds competence, lets people self-organise.

**What to investigate:**
- Formal definition: minimum capabilities?
- Can you hire for this? Job description?
- How do you scale beyond one person?
- Is this the same as Anthropic's "glue" or distinct?

### 2.4 Experience-First Adoption Sequence

**Finding:** The adoption sequence is reversed from standard change management:
- Standard: vision → strategy → tools → adoption
- Observed: tool that gives WOW → competence through doing → person sees their own future → acts

Validated in two enterprise training cohorts (50 people NPS 80%, 12 people NPS 90%). Pieces exist in McKinsey ("what did you learn?"), Workera (sceptics shift through operational proof), WOW research. But the full sequence isn't articulated elsewhere.

**What to investigate:**
- Does the WOW moment require a specific tool or capability level?
- Is there a WOW threshold below which it doesn't happen?
- Does the sequence hold across industries and cultures?
- What happens if competence doesn't follow the WOW quickly?

---

## Priority 3: Strategic Questions — Need New Evidence

### 3.1 The Cross-Functional Ownership Gap

**Finding:** Cross-functional transformation has no natural owner in a functional org. Not CEO (too operational). Not any single SVP (others' territory). People with desire + methodology lack positional authority.

Observed: workshops that bring functions together produce excellent results, but sustained follow-through stalls because nobody co-owns the cross-functional outcome after the event.

**What to investigate:**
- Solutions for mid-size enterprises (200-2000 people)?
- Does function-level AI-native adoption eventually converge into cross-functional transformation without a formal owner?
- Case studies of cross-functional transformation owners: title, authority, support?

### 3.2 Governance-Enablement Balance in High-Risk Industries

**Finding:** Germany's compliance culture killed adoption entirely. But cybersecurity / banking / healthcare have asymmetric downside from AI governance failure.

**What to investigate:**
- How do high-risk industries balance enabling governance with real risk?
- Minimum governance surface that's both safe and non-blocking?
- Tiered risk models: any documented implementations?

### 3.3 AI-Native Maintenance and Sustainability

**Finding:** Nobody has answered what AI-native system maintenance looks like. New failure modes: prompt drift, model update breaks, context sprawl — all invisible, no error messages, system keeps running but degrades.

**What to investigate:**
- Maintenance cost as % of development cost?
- Specific degradation patterns and how to detect them?
- The "comprehension debt" concept (Addy Osmani 2026) — any longitudinal evidence?

### 3.4 Non-Engineering Practitioner Progression

**Finding:** Business people adopt eagerly ("self-actualisation as driver"). A specific profile predicts success: domain expertise + technical curiosity + structured thinking + just enough CS vocabulary to steer agents. But the skill progression for non-engineers is undocumented.

**What to investigate:**
- Stages of non-engineering practitioner development?
- Different walls than engineers?
- What does "AI-native marketing team" or "AI-native finance team" actually look like?
- Nordic-specific evidence?

---

## Enterprise Practitioner Observations

See: [`observations/enterprise-agentic-transformation-case.md`](observations/enterprise-agentic-transformation-case.md) — detailed observations from a year-long enterprise agentic transformation, including 7 original findings.

---

## Key External Sources Referenced

| Source | Finding |
|---|---|
| McKinsey QuantumBlack (2025) | Workflow redesigners 2.8x more likely high performers |
| Faros AI (Jun 2025) | 10K devs: AI without redesign = more bugs, not more value |
| Microsoft/HBR (Mar 2026) | Peer influence: 8.9pp increase in AI adoption |
| Infosys/MIT (Dec 2025) | 83% say psychological safety affects AI success |
| HBR (Feb 2026) | 70% of C-suite uses AI <1hr/week |
| Varonis (2026) | Only documented transform-in-place: 100% adoption, PR cycle -96% |
| Addy Osmani (2026) | "Generation not the bottleneck. Verification is." + comprehension debt |
| Mollick/Wharton | Individual 2-3x, organisational only 10-20%. Gap = shared mental models |

---

*Research directions identified from enterprise transformation practitioner research, March 2026*
