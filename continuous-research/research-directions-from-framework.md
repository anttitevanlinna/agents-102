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

## Priority 4: From Practitioner Essays (Year One) — Added April 2026

Six research directions surfaced from cross-referencing one year of practitioner essays (`strategy/practitioner-essays-year-one.md`) with current research findings. These represent gaps the practitioner lived through but the research system hasn't investigated externally.

### 4.1 Habit and Taste as Code

**Finding (Oct 3 essay):** "Habit and taste as code." CLAUDE.md captures rules and process. But habits (automatic behaviors) and taste (aesthetic/quality judgment) are different from rules. StrongDM's holdout scenarios encode taste (what "good" looks like). Compound engineering's CLAUDE.md encodes habits. Nobody has named this as a distinct challenge.

**What to investigate:**
- Who is encoding taste and habit into agent systems, not just rules?
- What does "taste" look like in machine-checkable form? Is it eval criteria? Style guides? Examples?
- How do you transfer a senior engineer's or domain expert's judgment into agent context?
- Connection to Mollick's "knowing what good looks like" as the human skill that remains

### 4.2 Knowledge as Code — Git for Organizational Knowledge

**Finding (Sep 12 essay):** "We've recently started curating text files into version control so they can be shared just as code. Knowledge is becoming like code." Git provides versioning, branching, merging, review, diffing for free. But nobody applies software engineering rigor (PRs, reviews, CI/CD) to organizational knowledge artifacts.

**What to investigate:**
- Is anyone applying software engineering practices to organizational knowledge management? Not code — knowledge artifacts.
- What would CI/CD for knowledge look like? Automated staleness checks? Contradiction detection across files?
- Connection to company memory gap (personal exists, team = CLAUDE.md hack, company = crickets)
- The ETH Zurich counter-evidence: extensive context files may hinder agents. When does more knowledge become noise?

### 4.3 The Billion Lines Problem — AI-Generated Codebase Explosion

**Finding (Mar 20 essay, Wardley):** Agents produce so much code that codebases become unmanageable by any human. 1000+ features confuse users. The absorption bottleneck applies to the CODEBASE ITSELF, not just the review queue.

**What to investigate:**
- Does anyone have a strategy for managing AI-generated codebase explosion?
- Is disposable code (generate, use, discard, regenerate) the answer rather than maintaining everything?
- StrongDM's zero-code repo (specs only, code regenerated) — is this the model?
- What happens to technical debt when code is disposable?
- Connection to Red Queen dynamics: competition forces ever-larger codebases

### 4.4 Cross-Team Knowledge Sharing — What Actually Works?

**Finding (Jun 6 → Dec 5 essays):** "Sharing is caring" strategy designed for cross-team innovation sharing. Six months later: "We failed to imagine how that knowledge sharing could really work." The gap between intention and execution.

**What to investigate:**
- Who has actually made cross-team AI knowledge sharing work at enterprise scale?
- Varonis AI Guild is suspicious (cycle 77). Citi has adoption, not knowledge sharing. Is there a real case?
- Does the Conditions Creator pattern (cycle 72) solve this? Or is cross-team sharing a different problem from within-team adoption?
- Connection to internal open source (research direction 2.2) — agents dissolve barriers but who invests in the shared infrastructure?

### 4.5 Information Products for AI — Knowledge as Product Management

**Finding (Dec 19 essay):** Prediction that teams will create and publish "information products" — curated, governed, reusable knowledge assets for AI consumption. This is company memory articulated as a product management problem, not an infrastructure problem.

**What to investigate:**
- Is anyone doing "information product management" for AI/LLM consumption?
- Data products exist (Databricks, dbt). Knowledge products for LLMs don't. Why?
- What would a "knowledge product" look like? Owner, quality standards, consumers, SLAs, versioning?
- Connection to ArcticRex/Unblocked (team context delivery) — are they information products without naming them?
- Connection to MCP servers as information products (structured data access with governance)

### 4.6 Human-Mediated vs. Autonomous Agent Learning

**Finding (Dec 19 prediction + Mar 13 practice):** "Agents will learn to learn" was the prediction. The curated agent project structure (OODA loop on CLAUDE.md) is human-mediated agent learning — human runs the cycle, updates context. The prediction was about AUTONOMOUS agent learning.

**What to investigate:**
- Where is the line between human-mediated learning (CLAUDE.md, manually curated) and autonomous agent learning (agent updates own context based on outcomes)?
- Who is crossing that line? Karpathy's autoresearch (autonomous experimentation within scalar-metric constraint)?
- What are the failure modes of autonomous agent learning? (Stale patterns, compounding errors, loss of human oversight)
- Connection to the unlearning problem: autonomous learning that accumulates wrong patterns faster than anyone can audit
- The zombie stat audit (cycle 80) as micro-example: the research system "learned" a bad stat and propagated it. What prevents autonomous agents from doing the same at 1000x speed?

---

## Priority 5: The Output-to-Outcome Gap — Added April 2026

### 5.1 The Feature Throughput Trap: 10x Output, 1x Business Impact

**Finding (practitioner signal, April 7):** The absorption bottleneck research (Level 3: CircleCI, Faros, Ronacher, Bowley) documents teams that can't ship what they generate. But there's a level above that: teams that CAN build, verify, and ship at 10x speed — and still see no business impact improvement. The assumption that development speed was the constraint gets exposed as an excuse. The real constraint was always knowing which of the 200 possible things to build actually moves the business.

This is NOT the decision-speed bottleneck (Goldratt/TOC framing of slow approval chains). It's a different problem: not that decisions are queued waiting for approval, but that **organizations don't know what to want**. Fast execution with thin strategic intent just produces more verified, shipped, irrelevant features faster.

**Current evidence status:** Zero practitioner accounts. Practitioners are still stuck one level below — writing about the WIP/review problem. Nobody has solved delivery well enough to discover this next problem. Adjacent signals:
- Duperrin: "organizations mechanically consume any local improvement without overall progress" (consultant framing, not deployment evidence)
- Mollick: "institutions move at institution speed" (academic framing)
- ActivTrak (n=10,584): more activity, same outcomes (task level, not business outcome level)
- Jevons Paradox applied to product: cheaper building → more features, not more impact

**Connection to existing research:**
- Extends absorption bottleneck (by-pattern) to the level above delivery
- Connects to Intent Taktik thesis: quality of intent as the real ceiling
- Connects to experience-first adoption (2.4): the WOW moment reveals what's possible, but doesn't tell you what's worth doing
- Connects to verification infrastructure (2.1): verification solves "is it correct?" not "is it valuable?"

**What to investigate:**
- Any teams that solved the delivery problem (automated QA, CI/CD, fast deploy) and then hit the "now what?" wall?
- Product teams reporting feature velocity up but business metrics flat — is anyone naming this pattern?
- Connection to product discovery practices (Marty Cagan, Teresa Torres): does the "continuous discovery" community see AI speed as exposing their gap?
- The Jevons Paradox in product: does cheaper building always lead to feature bloat rather than better features?
- Counter-evidence: are there teams where 10x speed DID translate to 10x business impact? What was different? (Hypothesis: they had strong discovery/intent practices before AI accelerated execution)

**Why this matters for our positioning:** This is the bridge between "teach people to build agents" (competence) and "know what to build" (strategic clarity). The competence-first sequence (competence → discovery → context → platform) predicts this gap. If we find practitioner evidence, it validates the entire value prop.

---

## Enterprise Practitioner Observations

See: [`observations/enterprise-agentic-transformation-case.md`](observations/enterprise-agentic-transformation-case.md) — detailed observations from a year-long enterprise agentic transformation, including 7 original findings.

See also: [`strategy/practitioner-essays-year-one.md`](../strategy/practitioner-essays-year-one.md) — 20 essays tracking the evolution of thinking over one year, with cross-reference to research findings.

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
