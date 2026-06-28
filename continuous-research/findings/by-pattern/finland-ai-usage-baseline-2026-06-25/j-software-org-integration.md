---
type: finding-fragment
thread: finland-ai-usage-baseline-2026-06-25
beat: software-org-level integration / agentic-engineering diffusion rate (global)
evidence_level: 3
updated: 2026-06-25
siblings_referenced:
  - productivity-gains-2026-06-25/SYNTHESIS.md   # mechanism + ceiling (~2X, Amdahl) — NOT re-derived here
  - by-domain/coding-engineering.md              # Dec-2025 phase shift, compound engineering, Spotify
answers:
  - "what share of software ORGS run coding agents in production, not just individuals experimenting?"
  - "does the chat-collapse break at the software-org level — majority, or leading-edge minority diffusing fast?"
  - "what is the software-sector pilot-to-production rate vs other functions?"
---

# Software at the ORG Level — How Widely Has Agentic Engineering Diffused Past the Pilot

**Beat:** the diffusion RATE of *integrated/agentic* engineering practice across software firms — not "can it be done" (sibling `productivity-gains` owns the mechanism + ~2X ceiling), but "how many orgs have actually done it past chat." Every number here is org/firm-level, not individual-developer-level (that's a sibling's beat).

**Headline:** the chat-collapse **does** break at the software-org level — software is the thickest integrated/agentic slice of any sector — but the break is **bimodal by layer**. *AI-assisted* coding is now the org baseline (~80-93% of teams). *Autonomous/agentic* engineering in production (background agents opening PRs unattended, eval-gated fleets) is still a **leading-edge minority diffusing fast** — single-digit-to-low-double-digit share of code, <1% of PRs agent-*initiated* across the broad population, concentrated in a named vanguard.

---

## (a) Org-level adoption-rate table

| Source | Metric (org/PR/firm level) | Value | Year | N | URL | Label |
|---|---|---|---|---|---|---|
| Bain *From Pilots to Payoff* (Q3-2025 GenAI Survey) | **Software-dev AI pilots that scaled to production** | **40%** (vs ~20-33% other functions) | 2025 Q3 *(dated ~9mo, lead stat)* | n=197 execs | [bain.com](https://www.bain.com/insights/executive-survey-ai-moves-from-pilots-to-production/) · [report](https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/) | [survey, commercial venue] (self-interest flagged) |
| Bain (same) | Software firms that rolled out GenAI dev tools | "two of three" (~67%) | 2025 | n=197 | [bain.com](https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/) | [survey, commercial venue] |
| Faros AI *AI Engineering Report 2026* | Teams past 50% weekly-active-AI-user threshold | **80% of teams** | 2026 | 22K devs / 4K+ teams telemetry | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] (telemetry; flag self-interest) |
| Faros AI (same) | **PRs *autonomously opened* by AI agents** | **<1%** | 2026 | 22K devs | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] |
| Faros AI (same) | AI-code acceptance rate (low→high adoption within org) | 20% → **60%** | 2026 | 22K devs | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] |
| Faros AI (same) | PRs merged with **no review** (human or agentic) | **+31.3%** | 2026 | 22K devs | [faros.ai](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | [survey, commercial venue] |
| Google **DORA 2025** | Respondents who had **never used agentic AI workflows** | **61%** | 2025 (Jun-Jul) | ~5,000 | [dora.dev](https://dora.dev/dora-report-2025/) · [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/) | [survey, commercial venue] (Google self-interest) |
| Google DORA 2025 | Any AI use at work | 90% | 2025 | ~5,000 | [cloud.google.com](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) | [survey, commercial venue] |
| **DX** AI-authored-code report | Mean **AI-authored code share** across firms | Q1 27.4% → **Q2 51.9%** | 2026 | **400+ companies** | [newsletter.getdx.com](https://newsletter.getdx.com/p/ai-authored-code-has-nearly-doubled) | [survey, commercial venue] (telemetry) |
| Atlassian *State of Developer Experience* | Developers reporting time savings from AI | 99% (68% save >10h/wk) | 2025 | 6,200+ devs | [atlassian.com](https://www.atlassian.com/teams/software-development/state-of-developer-experience-2025) | [survey, vendor venue] |

**Best single org-level stat:** Bain — **40% of software-dev AI pilots have scaled to production, vs ~one-fifth-to-one-third for every other business function** (Q3-2025, n=197). Software is measurably the leading sector at crossing pilot→production — but 40% is a *minority*, and the survey conflates "AI" broadly (much of it assisted-not-agentic).

**The load-bearing contrast in this table:** AI-*assisted* share is near-universal (DX ~52% of code, Faros 80% of teams active), but the *agentic* slice — PRs an agent **opens unattended** — is **<1%** (Faros) and ~10% of *committed code authored by autonomous agents* at the vanguard (Uber). The collapse of "chat" into integrated practice is real; the collapse of integrated into *autonomous/agentic* is early.

---

## (b) Named software firms past chat into integrated/agentic (three gates)

Sibling `productivity-gains` already banks: **Anthropic, Spotify, Cloudflare, Faire, Intercom, Ramp** (+ Every/Klaassen solo). Not re-derived. Additions with practitioner-direct, in-production evidence:

- **Stripe — "Minions" (NEW, strongest add).** Homegrown one-shot end-to-end coding agents: **>1,000 PRs/week (1,300 in later reports) that contain zero human-written code**, fully unattended ("starts in a Slack message, ends in a PR that passes CI, ready for human review, no interaction between"). Harness = isolated 10-second-warm devboxes + selective CI (≤2 rounds) + automated test selection from **3M+ tests** + lint autofix. Humans retain *merge* authority; agents have *submission* authority. Gates: ✅ agentic (multi-step autonomous), ✅ practitioner-direct, ✅ named firm + practice + measurable + URL. Source: [stripe.dev](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) (Alistair Gray, 2026-02-09) `[practitioner direct, vendor venue]`; corroborated [InfoQ](https://www.infoq.com/news/2026/03/stripe-autonomous-coding-agents/) `[tech press]`.

- **Uber — autonomous-agent share, exec-attested.** **~10% of committed code built by autonomous agents** (distinct from AI-*assisted*), CEO Dara Khosrowshahi, **earnings call May 2026**. Burned full 2026 AI-coding budget in 4 months (Claude Code + Cursor; $500-2,000/eng/mo) — adoption is real and *costly*, COO openly questions consumer-benefit linkage ("that link is not there yet"). Gates: ✅ agentic (autonomous-authored, not chat), ✅ named + measurable, ⚠️ source is CEO-on-earnings-call (self-interest) not engineering-blog. Source: [Fortune](https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/) `[general press, quoting exec]`. The COO caveat is the credibility asset — cite *with* it.

- **LinkedIn — CAPT (already in `coding-engineering.md`, re-anchored as org-breadth proof).** Contextual Agent Playbooks & Tools: **1,000+ engineers, 500+ playbooks authored**, issue triage −70%. This is the cleanest *org-scale internal-adoption-breadth* number (not a few pioneers — a thousand engineers). Source: [linkedin.com/blog/engineering](https://www.linkedin.com/blog/engineering/ai/contextual-agent-playbooks-and-tools-how-linkedin-gave-ai-coding-agents-organizational-context) `[practitioner direct]`.

- **Shopify — integrated, NOT yet autonomous (the honest boundary marker).** Centralized LLM-proxy platform layer + MCP servers wiring agents to wiki/PM/data-warehouse; ~20% productivity (VP Eng Farhan Thawar). But explicitly: **"not yet at the place where we allow AI to check in code automatically"** — human PR review mandatory, parallel-agent fleets framed as *future*. Gates: ✅ integrated (MCP, platform layer), ❌ not-yet-autonomous-in-prod. The value of this case is precisely that a frontier AI-first eng org **draws the line short of unattended merge** — evidence the autonomous slice is thin even at the vanguard. Source: [bvp.com/atlas](https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook) (2026-04-02) `[practitioner direct, vendor venue]`; [latent.space](https://www.latent.space/p/shopify) `[practitioner analysis]`.

- **Vendor-attested code-share (L0-L1, cite only as ceiling-of-claims):** Google 75% AI-generated new code (Pichai, Apr 2026), Microsoft 20-30% (Nadella), Snap 65%, Meta *target* 65%-of-engineers-at-75%-of-code for 2026. All are **composition share, exec-attested, un-audited** — same artifact the sibling flags for Anthropic's 80%. Not evidence of *autonomous* practice; a share, not a multiplier, not a diffusion rate. [DevOps.com](https://devops.com/google-ceo-says-75-of-new-code-is-ai-generated/) · [TechCrunch](https://techcrunch.com/2025/04/29/microsoft-ceo-says-up-to-30-of-the-companys-code-was-written-by-ai/) `[general press, quoting exec]`.

**Breadth read:** the named vanguard running *unattended* agentic fleets in production is still countable on two hands (Stripe, Anthropic, Spotify, Faire + the LinkedIn/Cloudflare/Intercom/Ramp internal-platform set). Below them sits a broad, fast-growing band doing *integrated* (MCP, platform layer, mandatory human review — Shopify, Uber) but stopping short of unattended merge.

---

## (c) Verdict — does the chat-collapse break at the software-org level, and how broadly?

**Yes — and software is the only sector where it convincingly does. But "past chat" splits into two thresholds, and the org population sits between them:**

1. **Past chat → integrated: MAJORITY, already crossed.** ~80% of teams are 50%+ weekly-active on AI (Faros); ~52% of code AI-authored across 400+ firms (DX); 40% of software pilots scaled to production vs ~one-third elsewhere (Bain). For software orgs, AI in the SDLC is the *baseline*, not the experiment. The hypothesis "headline adoption = mostly chat" **fails specifically for the software sector** — these are integrated-into-CI/PR-workflow numbers, not chatbot-window numbers.

2. **Integrated → autonomous/agentic: LEADING-EDGE MINORITY, diffusing fast.** PRs an agent *opens unattended* = **<1%** broadly (Faros); autonomous-authored code ~**10%** even at an aggressive adopter (Uber); and a frontier AI-first org (Shopify) **deliberately forbids auto-merge**. DORA: **61% had never touched an agentic workflow** (Jun-Jul 2025 — dated, the leading edge of the curve). The fully-agentic vanguard (Stripe Minions, Spotify Honk, Faire Swarm) is real, in production, and impressive — but it is a *minority of firms*, not the median.

**The honest one-liner for a CTO:** *In software, chat is dead as the ceiling — the median org has already integrated AI into the PR/CI workflow. But "agentic engineering" (unattended fleets, eval-gated auto-PRs) is where ~2-3 years of coding-agent lead is being spent right now: a fast-diffusing leading-edge minority, not yet the majority.* The diffusion is steep (DX AI-authored share **doubled in one quarter**, Q1→Q2 2026), so the minority→majority crossing on the *autonomous* threshold is plausibly 2026-2027 — but as of mid-2026 it has **not** happened. This is consistent with, and downstream of, the sibling's ceiling argument: the wall isn't generation (cheap, diffusing fast), it's **verification/review** (Faros: +31.3% PRs merged unreviewed = the absorption bottleneck showing up as a *quality* failure at org scale, not a throughput win).

**Why software and not other sectors (mechanism, per `coding-engineering.md`):** executable verification + existing test suites + git/CI/sandbox + decomposable PRs. The same five ingredients that make coding agents work also make the *org-level autonomous* threshold reachable here first — Stripe's 3M-test selection + ≤2-round CI is exactly the verification-as-infrastructure the sibling names as the gate.

---

## (d) What we did NOT find

- **No clean org-population stat for "% of software firms running unattended agentic fleets in production."** The <1% (Faros, PR-initiation) is the closest proxy; it conflates "agent opened the PR" with "org runs a fleet." No survey yet asks the org-level fleet question directly. **[Gap]**
- **No independent (non-vendor, non-self-interest) org-level diffusion survey.** Every adoption-rate source here is a commercial venue (DX, Faros, DORA/Google, Atlassian, Bain) with self-interest in the number being high. The *direction* converges across all five; treat any single magnitude as soft.
- **No firm-level breakdown by company size / sector-within-software** (SaaS vs infra vs fintech). Stripe/fintech and Spotify/consumer are anecdotes, not a segmented adoption curve.
- **DORA's 61%-never-agentic is dated** (Jun-Jul 2025, ~12 mo old, pre-Dec-2025 phase shift) — almost certainly overstates current non-adoption. Cite as the *trailing* edge, not current.
- **No Nordic org-level agentic-engineering adoption number** beyond what the sibling already banks (Spotify; rest is publication-gap white space). Not re-investigated — owned by the Finland-firms sibling.
- **No reconciliation of Uber's "10% autonomous-agent code" with Faros's "<1% PRs agent-opened"** — different metrics (authored-share vs PR-initiation) and different populations (one firm vs 22K-dev panel); both can be true. Flagged, not resolved.

---

## (e) Inline four-persona audit

- **Source-type auditor:** Every URL labeled; the entire adoption-rate table is `[survey, commercial venue]` or `[vendor venue]` — flagged repeatedly, and the (b) named-firm cases lean on `[practitioner direct]` primaries (Stripe, LinkedIn, Shopify) to offset. Uber/Google/MS code-share are exec-on-earnings/press, labeled `[general press, quoting exec]` and quarantined as L0-L1 claims-of-ceiling, not evidence.
- **Zombie-stat detector:** Round numbers traced to N — Bain 40% (n=197, Q3-2025), Faros (22K devs/4K teams), DX 27.4%/51.9% (400+ cos), DORA 61% (~5,000). The one un-pinned: Uber "10% autonomous" has no methodology disclosed (earnings-call assertion) — labeled as such, not laundered.
- **Freshness checker:** Most sources within the 6-mo window (DX Jun-2026, Faros 2026, Stripe Feb-2026, Uber May-2026, Shopify Apr-2026). DORA (Jun-Jul 2025 fieldwork) and Google/MS code-share (Apr 2026 / 2025) flagged dated; DORA's 61% explicitly marked trailing-edge.
- **Evidence-ladder classifier:** Fragment lands **L3** — convergence across 5+ independent org-level instruments (DX, Faros, DORA, Bain, Atlassian) on the *integrated-is-majority / autonomous-is-minority-diffusing-fast* shape, plus 4+ named practitioner-direct firm cases. Vendor code-share claims correctly held at L0-L1 and not counted toward the convergence.
