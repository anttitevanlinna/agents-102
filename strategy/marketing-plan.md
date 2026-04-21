# Marketing Plan — Agents 102

Two interconnected plays: **make the quiz substantially more valuable** and **start the continuous research before anyone else does**. They feed each other. Both feed the funnel.

---

## The Funnel

Two entry points, one destination, cross-feeding:

```
Newsletter ("Deploying Agents")  ←→  Survey (Agentic Readiness Check)
         ↓                                       ↓
         └────────→  DM (contact Antti)  ←────────┘
```

**Newsletter → Survey:** Each issue ends with "See where you stand" link to the quiz. Research insights make the survey more valuable — "this data informs our benchmarks."

**Survey → Newsletter:** Quiz results page invites: "Get weekly insights like these — subscribe to Deploying Agents." Benchmark data cards prove the newsletter quality.

**Cross-feed:** Survey responses reveal which topics resonate → steer newsletter angles. Newsletter engagement (opens, clicks) reveals which survey-takers are warmest → prioritize DM outreach.

**Both → DM:** Newsletter CTA is soft ("reply to discuss"). Survey CTA is soft ("want to talk about your results?"). Warmest leads self-select.

---

## The Underlying Strategy

The quiz (Agentic Readiness Check) is already live. It's a 7-question strategic survey that maps CTOs onto a 2x2 matrix. Currently it's a **mirror** — it reflects what they already believe. That's interesting for 90 seconds.

The strategic move: turn the quiz into a **tool** that delivers so much value that CTOs screenshot it, send it to their leadership team, and put pieces of it in board decks. The newsletter is the **weekly touchpoint** that keeps the relationship warm between quiz and conversion.

```
Research fleet (parallel OODA agents across 7 domains)
        ↓
Weekly newsletter insight (Opus-written, Antti-steered)
        ↓
Drives CTOs to quiz ←→ Quiz drives CTOs to newsletter
        ↓
Both build trust → warmest leads DM Antti
        ↓
Survey data informs research priorities → feeds newsletter
```

**Why now:** Very few organizations are doing continuous, curated research on what is *just now becoming possible* in agentic business practices. The consultancies publish frameworks. The vendors publish product training. Nobody is curating "what actually worked this quarter across real deployments" in a way that's accessible to non-technical leaders. This is the 80% frontier research from our business model — we can start producing it before the peer network exists, and the newsletter + quiz are the first distribution channels.

---

## Play 1: Quiz Outcome Improvements

### Design Process

Ran a diverge-converge with 5 parallel design agents, each exploring a different value lens. Produced 10 ideas, converged to 3 winners. The convergence signal was strong — multiple agents independently invented the same concepts.

### The 10 Ideas (Divergent)

| # | Lens | Idea | What CTO Gets |
|---|------|------|---------------|
| 1 | Actionability | 90-Day Playbook Generator | Profile-specific action plan, copy-pasteable into a leadership meeting |
| 2 | Actionability | Leadership Team Alignment Diagnostic | Send quiz to CxOs, see agreement/divergence on one screen |
| 3 | Social/Peer | Leadership Team Divergence Map | Same as #2 — independently invented by a second agent |
| 4 | Social/Peer | Industry Blind Spots Board | Where your industry diverges most from others on the same questions |
| 5 | Deep Insight | The Contradiction Map | Which of your 7 answers fight each other — tensions you carry but haven't named |
| 6 | Deep Insight | Budget Reality Test | Your philosophy says one thing, your budget answer says another |
| 7 | Evidence | Nordic Readiness Gap Scorecard | Each answer calibrated against real BCG/Gartner/company data |
| 8 | Evidence | Implied Risk Exposure Estimate | Back-of-envelope EUR calculation with transparent assumptions |
| 9 | Content | Profile-Specific Decision Briefing | 1,200-word briefing with named companies, board question, and 90-day moves |
| 10 | Content | Framework Comparison Lens | Your choices vs. McKinsey/MIT/IBM/Deloitte — question by question |

### The 3 Winners (Convergent)

Convergence criteria: (1) genuinely new insight for the CTO, (2) buildable client-side, (3) distribution multiplier or pipeline value, (4) hard to copy, (5) multiple agents converged on it independently.

#### Winner 1: The Contradiction Map (#5)

**What:** After the profile, show 1-2 places where the CTO's answers logically fight each other. Example: "You chose 'Let people experiment with tools' on platform strategy but 'Hire one specialist' on budget. You trust bottom-up discovery, but you funded top-down control."

**Why it wins:**
- Makes the CTO genuinely pause — the one thing that shifts from "interesting" to "useful"
- ~15-20 hardcoded contradiction pairs, pure client-side, buildable in hours
- No cold-start problem. Works from the first respondent
- Tests assumption P6 at a deeper level — does the CTO *behave* consistently with their stated beliefs?
- Fallback for consistent answers is equally strong: "Your answers were unusually consistent. That either means deep clarity — or that you answered as the leader you want to be, not as your organization actually operates."

**Complexity:** Low. ~80-120 lines of JS. The hard work is writing 15-20 contradiction insights.

#### Winner 2: Leadership Team Alignment Map (#2/#3)

**What:** CTO collects result URLs from their leadership team. A comparison URL shows: (a) multiple dots on the 2x2 matrix, (b) per-question alignment heatmap, (c) alignment score ("your team agrees on 4 of 7 questions"), (d) facilitation prompt for the most-split question.

**Why it wins:**
- Strongest distribution multiplier: 1 CTO → 5-8 senior quiz takers
- Transforms the quiz from content marketing into a team diagnostic tool
- Surfaces invisible strategic disagreements before they derail programs
- Pure client-side: multiple answer strings encoded in URL, parsed and rendered
- Both the actionability agent and the social/peer agent independently invented this — strongest convergence signal

**Complexity:** Medium. ~300-400 lines of JS, ~80 lines of CSS, 7 facilitation prompts. URL-collection flow is manual (paste links in Slack, then combine) — plain, works, not slick.

#### Winner 3: Nordic Readiness Benchmark (#7)

**What:** For each of the CTO's 7 answers, surface one specific, sourced data point that validates or challenges that choice. Example: if they chose "First-mover advantage is overrated," they see the Gartner 5% → 40% agent adoption projection and Equinor's USD 130M savings.

**Why it wins:**
- Makes results board-presentable — data, not personality typing
- Demonstrates the 80/20 curation skill in action — this IS the product, given away as proof
- Research data already exists in our files
- 28 data cards (7 questions x 4 answers), all static, all sourced
- Rigorous: data supports AND challenges each position

**Complexity:** Medium. All static JS. Hard work is editorial: curating 28 sourced data points.

### How They Layer

```
Current quiz: "Here's who you are" (mirror)
    +
Contradiction Map: "Here's where you're stuck" (insight)
    +
Nordic Benchmark: "Here's what the evidence says" (calibration)
    +
Team Alignment: "Here's whether your team agrees" (action)
```

Each layer takes the CTO deeper. Build in this order — each is independently valuable.

### Honorable Mentions

- **#9 Decision Briefing** — high value, overlaps with #7. Could be a v2 enhancement: combine the benchmark data cards with a narrative briefing per profile.
- **#10 Framework Comparison** — extremely valuable for the "Directed Momentum" and "Strategic Timing" CTOs who read McKinsey. High maintenance cost (frameworks update quarterly). Consider as a standalone content piece rather than a quiz feature.
- **#6 Budget Reality Test** — elegant subset of #5 (contradictions). The implied investment portfolio bar chart is a strong visual. Could fold into the Contradiction Map as a special case.
- **#1 90-Day Playbook** — useful but risks feeling generic. The best elements are already in #9.
- **#4 Industry Blind Spots** — clever, requires volume. Add when 100+ responses accumulate per segment.
- **#8 Risk Exposure Estimate** — the transparent back-of-envelope calculation is compelling but requires company size input. Consider as an add-on to #7.

---

## Play 2: Continuous Research Program

**Full system design: `continuous-research/README.md`**

The short version: we track what's just now becoming possible in agentic business practices **beyond coding** — operations, finance, HR, compliance, customer service, supply chain. Agentic coding is a red ocean. Every vendor and bootcamp is already there. The blue ocean is the 90% of the company that isn't engineering.

We watch innovators and early adopters (Moore's adoption curve) and translate chasm-crossing patterns for the early majority. Our sources are builders (X.com, platform/protocol creators, Agentics Foundation, no-code agent tools, vertical SaaS with agentic features), not buyers (CTOs). All findings tagged Global vs. Nordic. McKinsey looks backward at what CTOs decided. We look forward at what builders are creating — for business processes, not code.

### How Research Feeds Marketing

The research IS the marketing. The research itself demonstrates the caliber of thinking. No pitch needed — the quality sells.

**Research → Quiz:** The Nordic Readiness Benchmark (Winner #3) needs 28 sourced data points. These come from the research program. Quarterly refresh keeps the quiz current. The Contradiction Map (Winner #1) gets sharper as we learn which strategic bets play out.

**Research → Content:** Monthly signal posts on LinkedIn. Quarterly synthesis becomes the first proto-practice pack. Monthly email for quiz completers who subscribe. All of it is the research, distributed — not a pitch wrapped in research.

**Distribution channels:**
1. **LinkedIn newsletter: "Deploying Agents"** — weekly practitioner-grounded insights. Opus-written, human-steered (Antti). The research fleet (parallel OODA agents across 7 business process domains) produces findings continuously; the newsletter translates one insight per week into "what this means for your organization in 6 months." The format is meta — a human-AI collaboration producing content about human-AI collaboration. That's the proof of concept. Not monthly signal posts. Weekly.
2. **Quiz results page** — benchmark data cards, always fresh
3. **Email for subscribers** — for CTOs who subscribe after the quiz or newsletter. Pure research, no pitch.
4. **Proto-practice packs** — quarterly synthesis = first practice pack (tests assumptions P1 and P2)

---

## Sequencing

### Phase 1: Now (Feb-Mar 2026)
1. Build the **Contradiction Map** into the quiz (2-3 hours code, 4-6 hours writing)
2. Start the **first research synthesis** — "State of Agentic Practice, Q1 2026"
3. Use the research to populate the **Nordic Benchmark data cards** (28 sourced data points)
4. Build the **Nordic Benchmark** into the quiz (1-2 days)

### Phase 2: After first 50+ quiz responses (Mar-Apr 2026)
5. Build the **Team Alignment Map** (3-5 days)
6. Launch **"Deploying Agents" LinkedIn newsletter** — weekly, Opus-written, Antti-steered. First issue from the Q1 synthesis.
7. Add email capture on quiz results page ("subscribe to the research")

### Phase 3: Ongoing
8. Quarterly research synthesis → refreshes quiz data cards → feeds monthly content
9. Quiz responses provide validation data → informs research priorities
10. Team alignment data reveals which organizations are actively discussing agent strategy → warmest leads

---

## Metrics

| Metric | What it tells us | Target |
|--------|-----------------|--------|
| Quiz completion rate | Is the quiz engaging enough? | >70% of starters |
| Share rate (link copied) | Is the outcome valuable enough to share? | >15% of completers |
| Team comparison created | Is the team tool compelling? | >5% of completers create a team view |
| Email capture rate | Is the research promise attractive? | >10% of completers with builder-leader profile |
| Research forward/share | Is the curation quality high enough? | Track LinkedIn engagement per post |
| Contradiction Map engagement | Do people read it? | Track scroll depth / time on section |

---

*This plan connects two plays: the quiz improvements make every CTO interaction more valuable, and the continuous research makes the quiz perpetually fresh. The research is the product, given away as proof of quality. The quiz is the distribution channel. Together, they build the audience that becomes the peer network.*
