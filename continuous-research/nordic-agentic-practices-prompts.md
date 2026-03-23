# Nordic Agentic Business Practices — OODA Research Prompts

## Research Goal

**Map what Nordic companies are actually doing with AI agents in non-coding business processes — right now, in early 2026.**

Not what they plan. Not what vendors promise. What's deployed, what's piloting, and what just became possible. Tagged by process domain, adoption stage, and global vs. Nordic origin.

### The Output

A **Nordic Agentic Practice Map** — the first systematic picture of where agents are being used in business processes (not coding) across Nordic enterprises. This becomes:

1. The data backbone for the quiz's Nordic Readiness Benchmark (28 data cards)
2. The source material for the first quarterly synthesis ("State of Agentic Practice Q1 2026")
3. Marketing content: LinkedIn posts, email signals
4. Proof of curation quality — the 80% frontier research demonstrated

### What We're Looking For

For each finding, capture:

| Field | Description |
|-------|-------------|
| **Company** | Named company (or "anonymous Nordic enterprise" if sourced from case study without name) |
| **Country** | Nordic country or global |
| **Process domain** | Operations, Finance, HR, Customer Service, Compliance/Legal, Sales/Marketing, Product/Strategy |
| **What the agent does** | Specific, concrete. Not "uses AI in operations." Instead: "agent processes incoming purchase orders, validates against contract terms, flags exceptions for human review" |
| **Adoption stage** | Innovator experiment / Early adopter pilot / Production deployment / Scaling |
| **Evidence level** | Level 0 (commercial) / Level 1 (opinion) / Level 2 (single experiment) / Level 3 (convergence) / Level 4 (meta-pattern). See Evidence Ladder below. |
| **Evidence source type** | Practitioner at conference / Third-party investigation / Customer testimonial on vendor site / Vendor press release / Analyst report. Source hierarchy matters — practitioner > third-party > testimonial > vendor press release. |
| **Finding category** | **Production Agentic** (multi-step autonomous work, deployed) / **Platform Announcement** (vendor says coming, not yet verified by practitioners) / **Context** (market stats, analyst predictions, chatbots, general AI use) |
| **Source URL** | **MANDATORY.** A specific, verifiable URL for every claim. Not "Gartner says X" without a link. Not "Web search synthesis." If no URL can be found, mark the claim as `[SOURCE NEEDED]`. Prefer primary sources (company press release, earnings call, conference talk) over secondary blogs. For gated reports, link the public summary page. |
| **Origin tag** | Global / Nordic / Both |
| **Nordic applicability** | Direct / Requires adaptation / Unknown |
| **Nordic label precision** | Nordic-origin deployment / Nordic-available platform / Nordic-relevant pattern (these are NOT the same thing) |
| **Chasm signal** | Is this crossing from innovator to early majority? What governance/compliance wrapped around it? |

### Evidence Ladder

We don't do science, but we follow the same credibility process:

```
Level 4: Cross-domain meta-pattern     ← Premium insight. "Across ALL domains, X holds."
Level 3: Convergence (10-20 independent)← WHERE WE REPORT. This is signal.
Level 2: Single experiment              ← Supporting evidence, clearly labeled.
Level 1: Opinion                        ← Context only. Never a finding.
Level 0: Commercial content             ← OUTSIDE THE LADDER. Not evidence at all.
```

**Four sources that don't work for agent research — and what does:**

1. **Vendors** oversell to hit quota. A SAP press release is not an experiment. A vendor case study is curated advertising. Label all vendor-sourced claims as "Vendor claim" and track the gap between announcement and deployment. That gap IS the story.

2. **General press and tech press** don't understand agents. A CNBC journalist writing "Goldman uses AI agents" doesn't know whether that's a chatbot or multi-step autonomous work. They report announcements, not substance. Useful only for confirming bare facts (funding, partnerships). Never cite general press for "how it works" or "is it real."

3. **Single early adopter "propeller heads"** are not trusted. One builder saying "I built an agent that does X" is a curiosity, not evidence. Could be genius. Could be survivorship bias. CTOs don't act on individual experiments.

4. **Consultancy frameworks** (McKinsey, Deloitte, Gartner) are paid opinion dressed as methodology. A Gartner prediction is not a survey. Useful for understanding how the early majority thinks, not for seeing what's coming.

**What DOES work: practitioners who understand agents writing about their own work.** Blogs, X.com threads, conference talks, GitHub repos. One practitioner analyzing another practitioner's work. Domain-specific trade publications where the journalist actually understands the domain. Academic benchmarks.

**What CTOs DO trust: convergence.** When 10-20 independent practitioners are making the same leap — different people, different companies, same outcome — that's signal. The pattern makes it real, not the individual claim.

**Editorial threshold:** Report at levels 3-4. Cite level 2 as supporting evidence. Acknowledge level 1 as context. Label level 0 as commercial and never present it as a finding.

### Quality Gates

Every finding must pass three admission gates:

1. **Truly agentic?** Multi-step autonomous work — not a chatbot, not a single LLM prompt, not a dashboard with AI features. A chatbot that answers FAQs is NOT an agent. An AI that processes claims end-to-end (pulls data, validates, decides, escalates) IS an agent.

2. **Independent evidence?** Not solely from the vendor's own press release or marketing site. Practitioner testimony, third-party investigation, or conference talk required for levels 2+.

3. **Specific outcome?** Named company + specific agent behavior + measurable result. "Company X uses AI" does not qualify. "Company X's agent processes Y, resulting in Z" qualifies.

### What Qualifies

An agentic business practice qualifies if:
- An AI agent (not just a chatbot, not just an LLM prompt) performs **multi-step autonomous work** in a business process
- It operates in a **non-coding domain** (exclude: code generation, code review, developer tooling)
- There is **some evidence** it's real (deployed or actively piloting), not just announced
- It passes all three quality gates above

Borderline cases: catalog them under **Context** category, flag what's uncertain. Do NOT inflate finding counts with chatbots or vendor announcements.

### What We Expect to Find

- **Nordic-specific deployments** will be sparse. BCG says only 19% of Nordic workers use GenAI weekly. We may find 10-20 concrete examples across all domains.
- **Global examples that illuminate the Nordic path** will be more abundant. A US insurance company using agents for claims processing tells us what Nordic insurers will face in 6-12 months.
- **Vertical SaaS embedding agents** (Salesforce, ServiceNow, SAP) may be the most common chasm-crossing pattern — agents arriving inside tools companies already use, not as standalone deployments.
- **Some domains will be further along than others.** Customer service likely most mature. Compliance/legal likely most nascent. The map will show this unevenly.

---

## OODA Tracks

**Sequencing:** Domain tracks run in parallel. Cross-cuts run AFTER domain tracks complete (they synthesize across domains). Quality review step before synthesis. Convergence rounds run after cross-cuts identify candidate patterns.

```
Phase 1: 7 domain tracks (parallel)
Phase 2: 3 cross-cuts (after domains, synthesize across)
Phase 3: Quality review (flag chatbots, vendor claims, deduplication)
Phase 4: Convergence rounds (test 10-20+ signal patterns)
Phase 5: Synthesis (write the map)
```

Seven parallel tracks, one per process domain. Each can run independently. 2-3 rounds per track should be sufficient — stop on diminishing returns, not on count.

### Track 1: Customer Service & Success

**Seed: people and companies, not topics.**
- Klarna AI team (Nordic-origin, the most documented case — follow the reversal story)
- Gjensidige claims processing (named in Nordic leaders research)
- If P&C insurance (Nordic insurer, look for practitioner talks/interviews)
- Search: "[company name] AI agent" or "[person name] customer service agent" — NOT "AI agent customer service Nordic"

**Why start here:** Most mature domain for agents. Likely highest volume of findings. Sets the baseline for what "deployed" looks like.

**Follow-up angles:**
- Multi-step resolution agents (not just chatbots — agents that pull data, check systems, take actions)
- Nordic telcos, banks, insurance companies (Telia, Nordea, If, Gjensidige)
- Klarna's reversal: started with AI-only, rehired humans — what broke and what the verification signal was

### Track 2: Finance & Accounting

**Seed: people and companies, not topics.**
- Goldman Sachs / Anthropic partnership (CNBC reported independently — follow for updates)
- Basware / Jason Kurtz / Anssi Ruokonen (Finnish company, AP automation — look for practitioner interviews, not Basware's own blog)
- Nordea, SEB, Danske Bank — search for named people presenting at finance/AI conferences
- Search: "[person name] agentic finance" or "[company] AI agent accounting interview" — NOT "AI agent finance accounting enterprise"

**Why:** High-value domain. Compliance requirements make chasm-crossing visible — when does an agent get trusted with financial decisions?

**Follow-up angles:**
- Invoice reconciliation agents across ERP systems
- Financial reporting and close-cycle automation
- Nordic banks and insurance companies using agents internally (not customer-facing)
- SAP/Oracle embedding agentic features — track announcement-to-deployment gap, not the announcement

### Track 3: Operations & Supply Chain

**Seed: people and companies, not topics.**
- Equinor (claimed USD 130M — find independent verification, not just Equinor's own reporting)
- Maersk logistics AI team (look for conference talks, CTO interviews)
- Scania, IKEA supply chain — search for named practitioners
- Search: "[company name] AI operations results" or "[person name] supply chain agent" — NOT "AI agent operations supply chain enterprise"

**Why:** Where the big efficiency numbers live. Operations is where agents have clearest ROI story.

**Follow-up angles:**
- Nordic manufacturing and logistics — who has DEPLOYED, not announced
- Procurement agents that handle vendor selection, PO generation, compliance checks
- Warehouse and logistics optimization with autonomous decision-making

### Track 4: HR & People Operations

**Seed: people and companies, not topics.**
- Note: previous research found ZERO autonomous HR agent deployments globally. Start by verifying this is still true.
- Search for HR tech conference speakers (Unleash, HR Tech Nordic) discussing agent deployments
- Look for Workday / SAP SuccessFactors customers reporting actual agent use (not vendor announcements)
- Search: "[person name] HR AI agent deployed" or "Unleash 2025 agent" — NOT "AI agent HR onboarding enterprise"

**Why:** Every large Nordic company has HR processes. Previous research found zero deployments — if that's still true, the absence IS the finding.

**Follow-up angles:**
- Onboarding workflow agents (multi-step, multi-system)
- Internal knowledge/policy agents
- Recruitment screening beyond simple resume parsing
- **Primary question: has anything changed since our last finding of zero deployments?**

### Track 5: Compliance & Legal

**Seed: people and companies, not topics.**
- Max Junestrand / Legora (Artificial Lawyer interview is independent — look for more practitioner interviews, NOT Legora's own press releases)
- Harvey AI (legal AI leader — look for law firm practitioners commenting on it, not Harvey's blog)
- Nordic KYC/AML: Nordea, Danske Bank, SEB compliance teams — search for named compliance officers at conferences
- Search: "[person name] legal AI agent" or "[law firm name] AI workflow" — NOT "AI agent compliance regulatory enterprise"

**Why:** Highest governance requirements = most interesting chasm-crossing signals. But also most prone to vendor fluff (every regtech startup claims "agentic compliance").

**Follow-up angles:**
- EU AI Act compliance — agents that monitor regulatory changes
- Contract review and analysis agents — who has deployed, verified by whom?
- KYC/AML in Nordic banking — find the practitioners, not the platform announcements
- GDPR-related processing with agent autonomy

### Track 6: Sales & Marketing

**Seed: people and companies, not topics.**
- Previous research found high failure rates in sales agents (85% stat needs primary source)
- Look for sales practitioners (not vendors) presenting results at SaaStr, Pavilion, or Nordic sales conferences
- Search: "[person name] sales AI agent results" or "[company name] SDR agent deployed" — NOT "AI agent sales automation enterprise"

**Why:** Revenue-generating domain. Different buyer psychology than cost-saving domains. High vendor noise — every sales tool claims "AI agent."

**Follow-up angles:**
- Lead qualification agents — who has real results, verified independently?
- Proposal/RFP generation agents
- The SDR agent failure pattern — is it converging?
- Content workflow automation beyond simple generation

### Track 7: Product & Strategy

**Seed: people and companies, not topics.**
- Ethan Mollick / "Claude Cowork" — look for practitioner responses and experiments
- Product managers writing about agent use in their workflow (search individual blogs, not vendor sites)
- Search: "[person name] product management AI agent" — NOT "AI agent product management enterprise"

**Why:** Least likely to have mature deployments. But may find early innovator patterns that signal what's coming. This is the frontier of the frontier.

**Follow-up angles:**
- Market research synthesis agents
- Customer feedback / NPS analysis with autonomous insight generation
- Agents that monitor competitor activity and surface strategic implications

---

## Cross-Cutting Search Angles

After the domain-specific tracks, run 1-2 rounds on these cross-cutting themes:

### Cross-Cut A: Nordic Enterprise AI Programs

**Seed: named companies, look for practitioner evidence.**
- Equinor, Novo Nordisk, IKEA, Nordea, Scania — search for CTO/CIO interviews, conference talks, not corporate press releases
- Search: "[CTO name] [company] AI agent" or "[company] AI deployed results interview"
- **Verify independently.** A company's own press release about their AI program is marketing. A CTO speaking at a conference about what worked is evidence.

Map what the known Nordic leaders are doing across ALL domains, not just one. Build company profiles that show which process domains each has entered.

### Cross-Cut B: Vertical SaaS Agentic Features

**Seed: practitioner reactions to platform agents, not vendor announcements.**
- Salesforce Agentforce, ServiceNow, SAP Joule, Workday, Microsoft Copilot — search for CUSTOMER reactions (practitioners on X.com, Reddit, conference Q&As), not vendor keynotes
- Track announcement-to-deployment gap: announced when, deployed by whom, with what results?
- Search: "[platform] agent real deployment" or "[practitioner name] Agentforce review" — NOT the vendor's own launch blog

Track which enterprise platforms are embedding agents. But **the story is the gap between announcement and deployment**, not the announcement.

### Cross-Cut C: Chasm-Crossing Patterns

**Seed: practitioners who deployed and wrote about what broke.**
- Search for post-mortems, "lessons learned" talks, "what we got wrong" blog posts from named practitioners
- Conference talks at AI Engineer Summit, re:Invent, KubeCon about production agent failures
- Search: "[person name] agent production lessons" or "agent deployment failed" — NOT "enterprise AI agent governance"

What governance, security, and compliance patterns are wrapping around agents? **The signal is in the failures and reversals** (like Klarna), not in the governance frameworks.

---

## Per-Round Protocol

Each round:
1. **Observe** — 1-2 targeted searches, find 3-5 practices
2. **Orient** — What did we learn? Apply the three quality gates. Classify each finding: Production Agentic / Platform Announcement / Context. Assign evidence level (0-4). Flag vendor-sourced claims explicitly. What surprised us? How does this compare to global vs. Nordic?
3. **Decide** — Where next? Which angle is richest? Diminishing returns? Are we seeing convergence (10-20 independent signals saying the same thing)?
4. **Act** — Write findings to `continuous-research/findings/[domain].md`, propose next round

**Every claim MUST have a URL AND a source type label.** No exceptions.
- URL: specific, verifiable link. If none found, mark `[SOURCE NEEDED]`.
- Source type: one of `[independent journalism]` `[practitioner direct]` `[trade interview]` `[third-party investigation]` `[vendor press release]` `[republished PR]` `[vendor case study]`
- **Any source labeled `[vendor press release]`, `[republished PR]`, or `[vendor case study]` is Level 0 and CANNOT be used as evidence for a finding.** It goes in Context, clearly labeled.
- Do not write "Gartner predicts X" or "McKinsey found Y" without linking to the specific page. Unsourced market stats are worse than no stats.

**Write files immediately each round.** Don't accumulate across rounds.

**Deduplication rule:** Each company = primary finding in one domain only. If Klarna appears in Customer Service, HR, and Sales, pick the strongest domain and reference the others.

**Stop when:** You have clear signal on the domain's adoption stage in the Nordics, at least 2-3 concrete examples that pass all three quality gates, and a sense of where the chasm is. Not every domain needs the same depth — customer service may need 3 rounds, product/strategy may need 1.

**Every domain file MUST include a "What We Did Not Find" section.** The absence of evidence is itself a finding. If we searched for Nordic finance agent deployments and found only vendor announcements, say so. Silence is signal.

---

## Convergence Methodology

After domain tracks and cross-cuts complete, run convergence-focused rounds to test patterns at the 10-20+ signal threshold.

### When to Run Convergence

When domain tracks reveal a pattern that appears in 3+ domains, it's a candidate for convergence testing. The domain tracks surface the hypothesis; convergence rounds test it.

### How Convergence Works

1. **Identify the hypothesis** from domain findings. Example: "Hybrid human-AI beats full autonomy."
2. **Search specifically for independent signals** — different companies, different industries, same outcome. Look for both confirming and disconfirming evidence.
3. **Count independent sources.** Vendor claims don't count. The same company cited by 3 articles is 1 signal, not 3. Different companies reporting the same pattern independently = separate signals.
4. **Apply the threshold:** 10-20 independent signals = Level 3 (convergence). Report this. Below 10 = Level 2 (single experiments). Above 20 with cross-domain consistency = Level 4 (meta-pattern).
5. **Document counter-arguments.** A convergence finding without counter-arguments is incomplete. What are the conditions where the pattern breaks? Who disagrees, and why?

### Convergence Output Format

Write to `continuous-research/findings/convergence-[pattern-name].md`:
- **Hypothesis** tested
- **Verdict:** CONFIRMED / PARTIALLY CONFIRMED / NOT CONFIRMED
- **Signal count** and list of independent sources
- **The mechanism** — not just "X works" but "X works because Y"
- **Counter-arguments and boundary conditions**
- **What this means in 6 months**

---

## Research Run Log

| Track | Round | Date | Findings Added | Orientation Summary |
|-------|-------|------|----------------|---------------------|
| Platform Agents | Incremental | 2026-03-23 | 6 platforms updated | SAP Joule upgraded from vaporware to early GA. ServiceNow Autonomous Workforce launched. Microsoft Release Wave 1 shipping April 2026. Agentforce polarizing. Workday+Sana launched. |
| Practitioner Signals | Incremental | 2026-03-23 | 5 practitioners + enterprise failure data | Karpathy shifted to autonomous research agents. Mollick: orgs still early. Swyx: "context engineering." 85%^10 = 20% success rate insight. Nordic practitioner gap persists. |
| Nordic Deployments | Incremental | 2026-03-23 | 6 company updates + startup landscape | Legora 3x'd to $5.55B. Sana Labs launched in Workday ($1.1B). Nordea cutting 1,500 jobs (AI-linked). Basware launched AP agents. Finland AI Act enforcement live. |
| Convergence Update | Incremental | 2026-03-23 | 3 patterns strengthened + 3 new candidates | Hybrid (18+ signals), Governance (19+ signals), Narrow orchestration (22+ signals) all strengthened. Meta rogue agent = landmark security case. New: agent security, observability, context engineering. |

---

## After All Tracks Complete

### Quality Review (Before Synthesis)

Before writing the synthesis, review all domain findings against the quality gates:

1. **Count Production Agentic findings vs. Platform Announcements vs. Context.** The finding count that matters is Production Agentic only. Don't inflate with chatbots.
2. **Flag vendor-sourced claims.** Any finding whose only evidence is a vendor press release or case study gets labeled "Vendor claim — unverified by independent practitioners."
3. **Deduplicate companies.** Each company = primary finding in one domain. Count total unique companies, not total appearances.
4. **Check Nordic label precision.** A Nordic-available SaaS platform is not a Nordic deployment. SAP being available in Finland is not a Finnish agentic practice.

### Synthesis Output

Write `continuous-research/nordic-agentic-practices-map.md` containing:

1. **The Map** — 7 process domains, each rated: Not started / Innovator only / Early adopter pilots / Crossing the chasm / Early majority adoption. Based on Nordic evidence, contextualized with global. Ratings based on Production Agentic findings only — Platform Announcements and Context do not move the rating.

2. **The Headline Findings** — 3-5 insights a CTO would screenshot. Each grounded in convergence (Level 3+) or clearly labeled as single experiment (Level 2). No vendor claims presented as findings.

3. **The Gap** — Where global is ahead of Nordic, and by how much. Where Nordic has advantages (trust culture, flat orgs, regulation as forcing function).

4. **Convergence Patterns** — What patterns hold across 10-20+ independent signals? These are the premium insights. Include counter-arguments and boundary conditions.

5. **What We Did Not Find** — The absences. Which domains had zero Production Agentic findings? Where is the vendor hype furthest ahead of reality?

6. **Quiz Data Cards** — Draft the 28 data points for the Nordic Readiness Benchmark, sourced from Level 2+ findings only.

7. **What's Possible in 6 Months** — Tier 1 (high confidence, already crossing), Tier 2 (emerging, watch closely), Tier 3 (vendor hype, don't believe yet). Based on convergence evidence, not vendor roadmaps.
