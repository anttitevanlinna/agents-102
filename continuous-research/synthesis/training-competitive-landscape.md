---
type: synthesis
domain: competitive-landscape
updated: 2026-05-03
answers: ["who competes for engineering-IC agent training budget", "what do paid agent cohorts cost", "is there Nordic competition for agentic engineering training", "what arc do other trainings cover"]
---

# Agentic Engineering Training — Competitive Landscape (Nov 2025 – Apr 2026)

Inventory of paid cohort trainings, corporate write-ups, Nordic providers, YouTube long-form, conference workshops, and books-with-cohorts that plausibly compete for an L0→L3 engineering-IC training budget in a Nordic enterprise.

**Per-claim split for this file:** training syllabi cited as fact about *what they teach* are labeled `[practitioner direct]` where the lead is a named practitioner; **price and outcome claims sourced from those same vendor pages are [vendor press release] / [vendor case study]** — Level 0, marketing, not evidence. Any inferred price (e.g., "~$2k typical" where the page does not list price) is flagged inline as **inference**, not a sourced fact.

## Direct threats — paid cohort trainings for engineering ICs

| Name | Lead | URL | Price | Audience | Format | Module topics | Date | Syllabus label | Price label |
|---|---|---|---|---|---|---|---|---|---|
| Claude Code for Real Engineers | Matt Pocock | https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04 | **$795** (page-listed) | experienced SWEs | 2-week cohort, Zoom + Discord, async video + live office hours | LLM context; Plan / Execute / Clear; AGENTS.md; custom skills; PRD writing; multi-phase planning; feedback loops; AFK agents | Mar 30–Apr 13 2026 (replays on sale) | [practitioner direct] | [vendor press release] L0 — page-listed price is fact-of-page; outcome claims = L0 |
| Compound Engineering | Kieran Klaassen (Every / Cora) | https://every.to/events/compound-engineering | **not published** — Every's typical band $1.5k–$2.5k is **inference**, not sourced | "engineers, tech leads, CTOs who are already technical" | 4 weeks, 4 live workshops + Thu open working sessions | AI-first engineering; plan / work / review / compound loop; team tackles a real PRD | Apr 7–28 2026 | [practitioner direct] | **inference, not source** — flagged below |
| Agentic Coding & Workflows for Developers | Dan Mason (Stride) | https://maven.com/dan-mason/agentic-coding-and-workflows | not listed publicly; private cohorts for teams of 50+ | developers, EMs, tech PMs | 1-day immersive | agentic workflow patterns; local runs; chain-of-thought observability; LangGraph | ongoing | [practitioner direct] | not listed |
| Agent Engineering Bootcamp: Developers Edition | Hamza Farooq, Zain Hasan | https://maven.com/boring-bot/advanced-llm | Maven cohort, **inference: ~$1.5–2k typical** | AI builders | 7 weeks | agentic RAG, routing, multi-agent production | Apr 29–Jun 13 2026 | [practitioner direct] | **inference** |
| End-to-End AI Engineering Bootcamp | Aurimas Griciunas (SwirlAI) | https://maven.com/swirl-ai/end-to-end-ai-engineering | **inference: ~$2k typical** | technical professionals | 8 weeks | full-stack AI eng incl. multi-agent systems | Jun 22–Aug 16 2026 | [practitioner direct] | **inference** |
| AI Engineering Bootcamp | AI Makerspace (Loughnane, Alexiuk) | https://maven.com/aimakerspace/ai-eng-bootcamp | **inference: ~$2k** | "backend engineers who code every day" | 10 weeks | production AI apps | rolling | [practitioner direct] | **inference** |
| Agentic AI Engineering Bootcamp | Ryan Ahmed | https://maven.com/stemplicity/become-an-agentic-ai-engineer | **inference: ~$1.5k** | broad | cohort | agent fleets, specialized collaboration | May 2–Jun 10 2026 | [practitioner direct] | **inference** |
| Level Up SWE → AI Engineer | Swyx + Noah Hein | https://maven.com/noah-hein/ai-engineering-intro | **inference: ~$1k** | software engineers | 3 weeks | OpenAI APIs → prompt tooling systems | rolling | [practitioner direct] | **inference** |

**Closed cohorts / not currently running:** Jason Liu (engineering cohorts closed; pivoted to indie-consulting training). **Pragmatic Engineer** (Orosz) — newsletter + job board, no paid cohort. **Eugene Yan** — no active paid cohort surfaced.

## Corporate upskilling programs — what's public

What's public is **platforms, not training curricula** — a useful negative finding.

- Ramp built an internal coding agent platform; 30% of engineering PRs flow through it — https://www.infoq.com/news/2026/01/ramp-coding-agent-platform/ — [tech press]. Bare-fact use only; the InfoQ piece reports the deployment, doesn't analyse the training pedagogy.
- Stripe, Shopify, Airbnb — "AI coding agent harness" pattern writeup — https://www.mindstudio.ai/blog/ai-coding-agent-harness-stripe-shopify-airbnb — [practitioner analysis], synthesising practitioner write-ups
- Intercom rebuilt CS platform on GPT — https://stripe.com/customers/intercom — **[vendor case study], L0** — not retained as evidence in this file; reference only

**No major company published a "here's how we train our engineers on agents" curriculum in the last 6 months.** The absence is the story: AI-native and AI-forward firms compound by building infrastructure, not by running internal Bloom-ladder trainings. The opening for an external L0→L3 curriculum is therefore against *hire-and-osmose*, not against a published course.

## Nordic providers

| Provider | What they're selling | URL | Label |
|---|---|---|---|
| Solita | Solita RoadCrewAO™ — multi-agent dev orchestrator product (not training) | https://www.solita.fi/news/solita-launches-ai-agent-orchestrator-for-enterprise-software-development-solita-roadcrewao/ | [vendor press release] |
| Devoteam | "AI Agent Lab Stockholm" — consulting engagement | https://www.devoteam.com/ai-agent-lab-stockholm/ | [vendor press release] |
| NobleProg Denmark | generic "Agentic AI for Enterprise" instructor-led training | https://www.nobleprog.dk/cc/agenticaiea | [vendor press release] |
| Encertify Copenhagen | LangChain / CrewAI / AutoGen cert course | https://www.encertify.com/courses/artificial-intelligence/agentic-ai-certification-training-course-copenhagen | [vendor press release] |
| Reaktor | training & coaching page exists; no public agent-training curriculum | https://www.reaktor.com/training | [vendor press release] |
| Futurice / Gofore / Knowit / Tietoevry / Vincit / Siili / Codemate / Netcompany | no public agent training curriculum surfaced | — | absence (verified) |
| Agentics Finland (Mikko Alasaarela) | community meetups, not paid training | https://www.linkedin.com/in/alasaarela/ | [practitioner direct] |

**Events, not trainings, dominate the Nordics:** Agentic Dev Days Stockholm (Apr 28 2026), AgentCon Stockholm (Feb 3 2026), Data Innovation Summit (May 6–8 2026), Platform Summit 2026. These compete for awareness budget but are not cohort training.

## YouTube long-form

No dedicated 4h+ "agentic coding for engineers" course from a major practitioner has dropped in the window.

- Jeremy Howard, *The Dangerous Illusion of AI Coding?* (Mar 2026) — provocation video, not a course — https://www.youtube.com/watch?v=dHBEQ-Ryo24 — [practitioner direct]
- Andrej Karpathy, *Skill Issue* (code agents interview) — https://www.youtube.com/watch?v=kwSVtQ7dziU — [practitioner direct]; shapes narrative, doesn't train
- Scrimba, *Best Claude Code Tutorials 2026* — roundup pointing to short self-paced — https://scrimba.com/articles/best-claude-code-tutorials-and-courses-in-2026/ — [vendor press release] (roundup is editorial-marketing); not cohort, not deep
- Udemy *Complete Agentic AI Engineering*, *Claude Code Beginner to Pro* — $10–$100 self-paced, not peer competition

The YouTube long-course shelf for agentic coding is **thinner than expected.** fast.ai has not published a 2026 agents curriculum.

## Commercial conference workshops (last 6 months)

- AI Engineer Europe, London, Apr 8–10 2026 — workshops $195–$500, conference pass ~$2.1k — https://www.ai.engineer/europe — [vendor press release] (event-organizer page, not practitioner writing)
- AI Engineer Code Summit, NYC, Nov 19–22 — agentic-coding focused — https://www.ai.engineer/code — [vendor press release] (event-organizer page)
- AI Engineer World's Fair, SF, Jun 29–Jul 2 2026 — 50+ workshops — https://www.ai.engineer/worldsfair — [vendor press release] (event-organizer page)
- AI Coding Summit 2026 (GitNation) — agentic coding workshops — https://gitnation.com/events/ai-coding-summit-2026 — [vendor press release] (event-organizer page)
- AgenticDevDays Stockholm, Apr 28 2026 — workshop track unclear — https://agenticdevdays.org/ — [vendor press release] (event-organizer page)

Conference workshops are half-day to day-length, not 8-session arcs — complementary to AE101, not substitutes.

## Books with companion courses

- Chip Huyen, *AI Engineering* (O'Reilly, released early 2025, full print Dec 2026). Top-read on O'Reilly — https://www.oreilly.com/library/view/ai-engineering/9781098166298/ — [practitioner direct] (Huyen-authored). Book is the substitute good — 600 pages for $40. Huyen mentioned an MVP curriculum in Jan 2025 but no public cohort running.

No other book-with-cohort lands in the window.

## Trainings with material arc overlap to AE101

- **Pocock, *Claude Code for Real Engineers*** — overlaps the context → plan → execute → delegate arc. No horizon module, no multi-agent deliberation, no team / promotion layer.
- **Klaassen, *Compound Engineering*** — heavy overlap on test-learn-encode and multi-agent review. Light on early-foundations modules (assumes already technical).
- **Farooq / Hasan, *Agent Engineering Bootcamp*** — multi-agent heavy; light on compound / self-improving loop.
- **Swyx, *Level Up SWE → AI Engineer*** — early-foundations strong; skips the later modules.

**None of the 8 inventoried competitors runs a full L0→L3 arc with the promotion-path framing.** Holding the conservative count.

## Positioning cluster — "compound engineering" / "agents building agents"

Only **Klaassen / Every** owns the phrase in market. Pocock uses "AFK agents" and "feedback loops" (same idea, different brand). Ahmed's Maven bootcamp talks "agent fleets" — adjacent vocabulary, different mechanic. The narrative is uncrowded.

## Price ceiling — bands, not point estimates

- **Floor (page-listed):** $795 (Pocock, 2 weeks, async replays)
- **Maven cluster:** $1.5k–$2.5k for 7–10 week cohorts. **All point estimates above are inference from Maven's typical pricing band, not sourced from individual cohort pages.**
- **Premium / editorial:** Every's Compound Engineering — **price not published**; the "$2k+" estimate is inference and is flagged
- **Conference workshop:** $195–$500 half / full day, plus conference pass ~$2k
- **Corporate private:** Mason / Stride offers private team-of-50+ custom pricing (not public)

## Nordic competitive density — verified absence

**Clear air for cohort training of engineering ICs.** No Nordic consultancy (Reaktor / Futurice / Solita / Gofore / Knowit / Tietoevry / Vincit / Siili) publishes an agent-training curriculum for engineers. NobleProg and Encertify offer generic Nordic-delivered courses but target "AI developers" broadly and teach LangChain / CrewAI — not Claude-Code-native compound engineering for staff engineers. The competition in the Nordics is conferences eating awareness / budget, plus Solita selling a finished orchestrator product.

Counter-check: Reaktor training page, Futurice blog, Gofore, Knowit — no named agent cohort. Absence is real.

---

## Bosser strategic read (separate from research findings)

> Everything below is Bosser's strategic interpretation of the inventory above, not Level-3 evidence. Marked separately to keep the research findings clean.

1. **Pocock at $795 is the anchor — don't compete on it.** AE101's in-room / remote cohort is a different SKU. Price by seat-equivalent only in self-study; price by engagement when sponsor-attended.
2. **Klaassen is the narrative neighbour, not the competitor.** Every runs 4-week remote Zoom cohorts in US time. A Nordic CTO wanting in-room + local trainer has no Every option. Credit Klaassen by name; don't hide from him.
3. **Nordic clear air is real but shrinking.** Stockholm events suggest awareness peaking Q2 2026. *"First Nordic trainer wins the category"* is opinion, not Level-3 evidence — but the timing read is consistent with the inventoried event density.
4. **Arc completeness is the moat candidate.** No competitor inventoried runs the full L0→L3 arc. The training-as-forcing-function + sponsor-attends model is also unique — no competitor sells the CTO a seat in the room.
5. **Corporate write-ups tell us what to teach, not what to compete with.** Ramp / Stripe / Shopify publish their platforms; AE101 should teach *how to build those patterns in your own company* — the platform posts become the evidence base, not the competition.

---

<!-- maintainer -->

**Last updated:** 2026-05-03

**Source verification — MUST DO before first cohort:**

1. Maven cohort prices change. Every inferred "~$Xk typical" must be re-fetched at delivery; if a page lists no price, the cohort goes into the **inference** column, not the sourced column.
2. Klaassen's *Compound Engineering* event price is the single load-bearing inference for the premium-band claim. Open the event page at delivery; if still unpriced, present as a band, not a point estimate.
3. Nordic absence claim re-checks: Reaktor, Futurice, Solita, Gofore, Knowit, Tietoevry, Vincit, Siili training pages. Convergence to "no public agent-training curriculum for engineers" must be re-verified per quarter — Solita launching a product (RoadCrewAO) is a leading indicator that a training offering may follow.
4. The Stripe / Intercom case study is **[vendor case study] L0** and was excluded from evidence; if reintroduced, it must be re-labelled.
5. Numbers to triple-check: "30% of Ramp engineering PRs" (single tech-press source); "18,500 customers / $540M ARR" (Salesforce, not in this file but referenced in adjacent synthesis files); GAIA 30% pass bar (referenced in `curriculum-convergence.md`).
6. Freshness re-check: every URL above must be inside a 6-month window at delivery time.

**Provenance — source-type labels:**

- Practitioner-led cohort syllabi (Pocock, Klaassen, Mason, Farooq + Hasan, Griciunas, AI Makerspace, Ahmed, Swyx + Hein, Husain, Ng, Chase, Allred, Willison, HF) — [practitioner direct] for syllabus content
- Page-listed prices (Pocock $795 only) — vendor-page fact, treat as L0 marketing for outcome use, fact-of-page for price
- Inferred prices ("~$Xk typical") — **inference, not source**, flagged inline
- Maven cohort outcome claims — [vendor press release] L0
- Nordic consultancy pages — [vendor press release]
- Solita RoadCrewAO announcement — [vendor press release]
- Ramp / InfoQ — [tech press]; bare-fact use only
- Karpathy / Howard YouTube — [practitioner direct]; narrative, not curriculum

**Deferred (low-severity) items from 2026-05-03 research-review pass:**

- MindStudio attribution byline-check pending (line 34, AI coding agent harness post). Currently `[practitioner analysis]`; downgrade to `[vendor press release]` if vendor-blog default with no third-party practitioner author.

**Companion files:** `curriculum-convergence.md` (what the 14 inventoried curriculums actually teach), `boris-cherny.md`, `kieran-klaassen.md`, `every-inc.md`.
