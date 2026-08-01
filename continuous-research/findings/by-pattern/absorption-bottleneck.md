---
type: finding
domain: cross-domain
evidence_level: 2
platforms: [multiple]
practitioners: [Osmani, Ronacher]
vendor_reports: [Faros AI, DX, CodeRabbit, CircleCI, Anthropic, PostHog, Thoughtworks]
other_sources: [DORA, NBER, Karpathy, Willison, Furze, Bowley, Cursor/Graphite]
nordic: false
updated: 2026-08-01
updated_scope: "2026-07-31 re-verified the practitioner leg and wrote the audit note. 2026-08-01 carried that verdict into the body: the L4 cross-domain paragraph is withdrawn, the What-We-Did-Not-Find RESOLVED marker is reopened, the healthcare-L3 claims are withdrawn, and all eight flagged figures now carry [SOURCE NEEDED] at point of use rather than only in the header note. NOT re-verified: the cycle-81 primaries themselves (still unchased), the quantitative table, the six-names table."
answers:
  - "is the review bottleneck easing, or still binding?"
  - "can an agent reviewer absorb the output instead of a human?"
  - "why doesn't AI productivity show up in organizational metrics?"
  - "what happens when agents generate faster than humans can evaluate?"
  - "what is the absorption bottleneck?"
  - "why do AI-assisted teams have flat productivity?"
  - "what comes after generation and verification are solved?"
  - "why does PR review time increase with AI adoption?"
---

# The Absorption Bottleneck — When AI Generates Faster Than Humans Can Evaluate

**Evidence level: L2** — two independent practitioners (Ronacher, Osmani), fresh and quotable. The L4 claim this file used to carry is withdrawn, not merely queried. | **Practitioner leg re-verified:** 2026-07-31 | **Cycle 76 / 81 / 90 / 91 material below:** never re-verified; the parts that asserted a level now say so at point of use.

> **Audit note, 2026-07-31, carried into the body 2026-08-01.** A four-persona review (source-type · zombie-stat · freshness · evidence-ladder) found the L4 claim unsupported *as written*. Two reasons. **Both are now applied throughout the file, not just stated here** — which was the actual defect: for a day this note sat at the top saying the L4 paragraph "licenses nothing" while the paragraph itself, the What-We-Did-Not-Find entry, and two healthcare-L3 assertions all still read as settled to anyone landing mid-file. A header annotation does not correct a body claim.
>
> **1 · The practitioner leg is two people, not five.** Faros AI, DX and CodeRabbit were each labelled `[practitioner analysis]` while CircleCI — identical shape, a vendor reporting telemetry from its own paying customers, bylined by the company, ending in a product pitch — was correctly demoted to Level 0. One standard applied to all four leaves **Ronacher and Osmani** as the independent practitioners on the core claim. The labels below are now corrected and the tally is what it is.
>
> **2 · The six-domain cross-check that licenses L4 carries zero URLs.** Every figure in it is an uncited number, and *"three academic papers describe it as domain-independent cognitive failure"* names no paper. Some of it may not even measure this pattern: "21% of ICLR reviews AI-generated" measures AI *writing* reviews, not reviewers drowning in volume. The sourcing, if it exists, is in `platform-watch/cross-platform/runs/2026-03-31-cycle81.md`; until it is pulled forward, that paragraph licenses nothing.
>
> **The pattern is not withdrawn.** Two independent practitioners with fresh, quotable, converging material is a real L2, and the direction of travel is not in doubt. What is withdrawn is the claim to have *proven it across domains*. Restoring L4 needs the cycle-81 citations pulled forward and 8+ more independent non-vendor practitioners.
>
> **Uncited figures — each now carries `[SOURCE NEEDED]` inline where it is used**, so a reader who lands mid-file meets the mark instead of trusting the number: Amazon Kiro "6.3M lost orders" · SXSW CMO "$2–3 per $1" and "60–70% abandonment" · StrongDM "32K lines, zero human review" · Greptile "82% bug catch" · Cleveland Clinic "80% alert reduction" · Swiss hospitals "72.4%" · the Three Mile Island operator quote · aviation "<10% of flights". Several are the round-number shape the zombie-stat rule exists to catch. **None is chased yet** — marking is not sourcing, and this list stays until a primary is opened or the figure is cut.

**Current practitioner anchor (2026-07-31).** The constraint is still described as binding, by the practitioners closest to it, in the freshest material available. Addy Osmani, *Software Factories, Light and Dark* ([addyosmani.com](https://addyosmani.com/blog/software-factories/), 20 Jul 2026) — [practitioner direct]: *"Verification, not generation, is the real constraint on a factory."* *"Generation is a wide mouth; verification is the narrow neck. Speeding up the mouth just deepens the pile at the neck."* And the load-bearing line for anyone hoping tooling closes this: the review gate is *"the only expensive box that proves stubbornly resistant to scaling."* Same author, five days earlier, *Own the Outer Loop* ([addyosmani.com](https://addyosmani.com/blog/own-the-outer-loop/), 15 Jul 2026) — [practitioner direct]: *"Generation moved faster than control."* His coinage for the underlying deficit is defined in *Comprehension Debt* ([addyosmani.com](https://addyosmani.com/blog/comprehension-debt/), 14 Mar 2026) — [practitioner direct]: *"the growing gap between how much code exists in your system and how much of it any human being genuinely understands."*

Ronacher has sharpened rather than walked back his February position: *The Coming Loop* ([lucumr.pocoo.org](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/), 23 Jun 2026) — [practitioner direct] — *"I so far see very little progress of this improving. If anything, on that front it feels to me that we might even be making steps in the wrong direction."*

**Where Osmani puts the gate is the newer finding.** Not a per-item phase but an organisational chokepoint: *"The Factory — Multiple harnessed loops running in parallel, feeding a shared review gate."* One gate, many loops. That predicts the constraint gets *worse* with fan-out rather than being diluted by it, and it is a sharper structural claim than the volume framing this file has carried so far.

**Counter-evidence, and it is real.** Jina Yoon on PostHog's engineering team ([newsletter.posthog.com](https://newsletter.posthog.com/p/code-review-tips), 9 Jul 2026) — [practitioner direct, vendor venue], single-company self-report, Level 2 at best: an agent reviewer named StampHog *"gives the final stamp on roughly 1 in 3 PRs merged into our main repo"* and *"took care of 1.6K PRs on its own"* last month. Safety rails first (PR state checks, blast-radius denylists, diff-size limits), humans still the escalation path. This is the strongest published claim that the gate is easing. Weigh it against Osmani writing, eleven days later and knowing review agents exist, that the gate remains *"stubbornly resistant to scaling."* A "2.09x throughput" figure circulating in search summaries of the PostHog piece **could not be reconfirmed on the page** across two fetches — do not cite it.

**A named model in which the human stage disappears — described as a warning, not a design.** **CORRECTED 2026-07-31; the earlier version of this paragraph read Ronacher backwards and should not be restored.** It claimed his decomposition "omits the human entirely" and set up a tension between his prose and his diagram. A closer read of *The Coming Loop* (23 Jun 2026) shows he is contrasting **two** architectures and stating his own practice in the other one: *"In the agent loop, the model eventually says 'done' and I review. Even before that, I usually steer along the way. I am involved."* The human-free version is the **harness loop**, which he expects and resents: *"Even the 'done' signal loses all meanings and just becomes communicated to yet another machine that judges. My role is reduced to that of a messenger."* His closing question is how to stop precisely that: *"how do we don't abdicate judgment, how we can retain rules of good engineering, how we can ensure that responsible human can continue to supervise."*

So he is a **witness for** human-owned absorption and against its erosion, not evidence that the field is removing the human. What the corrected reading still licenses, and this is the part worth keeping: a respected practitioner **expects** absorption's decision-authority to migrate onto a machine judge, and does not think anyone has solved how to prevent it. Whether absorption is a place a machine can stand in, or is human by definition, remains this pattern's open question — but it is open as a *risk he names*, not as a model he ships. Do not cite this source as an instance of human-free absorption in practice.

**Platform-scale numbers — vendor-reported, and contested (re-verified 2026-07-31):** CircleCI's 2026 State of Software Delivery is the largest dataset pointing at the WIP accumulation dynamic, and it is **[vendor blog] — Level 0, off the evidence ladder.** CircleCI publishing about telemetry from CircleCI's own paying customers, bylined by its content-marketing staff, selling into the exact pain the report diagnoses. Three figures are verbatim on the page: *"the average number of daily workflow runs increased 59% year over year"*, *"on the main branch, throughput fell by 7%"*, *"Main branch success rates dropped to 70.8%, the lowest in over five years."* The dataset is one month wide: *"Based on 28,738,317 workflows run on CircleCI during September 2025. Projects with at least 2 contributors, workflows that ran at least 5 times."*

The "1 in 20 teams" figure needs three caveats and gets cited with them or not at all. It is a **compression of two adjacent sentences** (*"Fewer than 1 in 20 teams have figured out how to ship at AI speed"* + *"The top 5% of teams are the exception to every trend above"*), not one CircleCI claim. Rob Bowley ([blog.robbowley.net](https://blog.robbowley.net/2026/04/02/more-code-less-delivery-but-does-the-circleci-2026-report-really-show-1-in-20-teams-are-benefiting/)) — [practitioner analysis] — is **counter-evidence, not corroboration**: he attacks the top-5% cohort's data quality directly (*"Their average CI pipeline duration is 6 seconds… it's hard to think of a single CI step that legitimately completes in 6 seconds"*; *"one team apparently running 130,000 CircleCI workflows a day would have an outsized effect on any aggregate figures"*) and concludes *"the data here for the teams making that case doesn't add up clearly enough to draw confident lessons from."* His separate line — *"For 95% of teams, AI is generating more work in progress that isn't shipping"* — is his restatement of CircleCI's framing while disputing it, not an independent measurement. Round number, vendor conflict of interest, independently disputed underlying data: same shape as a zombie stat even though the origin is traceable. Treat as **[UNVERIFIED STAT]-equivalent** — usable only as "CircleCI claims X about its own platform, and a practitioner has disputed the data behind the headline cohort."

Armin Ronacher (Feb 2026, [lucumr.pocoo.org](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/)) — [practitioner direct] — independently names review as the bottleneck: *"the pull request review clearly turns into the bottleneck. But it cannot really be automated."* He reasons in informal backpressure language (*throttle, throughput, load shedding*); **the page contains no instance of "Little's Law" or "queueing theory"** (searched 2026-07-31). The queueing formalisation is this file's gloss and the Tier-0 user signal's frame, not Ronacher's — attribute it accordingly. Thoughtworks offers a mechanism — AI code is "often syntactically correct but contextually misaligned" ([Thoughtworks](https://www.thoughtworks.com/insights/blog/generative-ai/a-thoughtworks-perspective-on-circleci-s-2026-state-of-software-)) — but that is a consultancy's own thought-leadership blog promoting its own framework: **[vendor blog] — Level 0**, off the ladder. Quote it as a phrasing, never as evidence.

Net: the WIP dynamic stands on **two independent practitioners, Ronacher and Osmani**, and that is L2. It does not get promoted by the CircleCI numbers, because a vendor grading its own customers is not platform-scale confirmation of anything — and by the same rule it does not get promoted by Faros, DX or CodeRabbit either. All three are vendors reading telemetry off their own paying customers, and each sells into the very burden it reports. Naming that inconsistency was the point of this pass: the demotion has to apply to the vendors whose numbers we like, or it is not a standard.

**Mainstream crossing signal (cycle 90, April 2026):** HBR published "AI Doesn't Reduce Work — It Intensifies It" (Feb 2026). SXSW 2026 CMO data **[SOURCE NEEDED]** was recorded as showing $2-3 training overhead per $1 AI tool spend and 60-70% tool abandonment without facilitation; "confirms" is withdrawn 2026-08-01, since an uncited figure confirms nothing. The absorption bottleneck concept is now reaching mainstream business press — the practitioner-to-enterprise confirmation arc described in research methodology. Still no entity using the term "absorption bottleneck" specifically.

~~**L4 upgrade (cycle 81):** The absorption bottleneck is confirmed across 6+ domains beyond engineering.~~ **WITHDRAWN 2026-08-01 — [SOURCE NEEDED] on every figure; this paragraph licenses nothing.** What cycle 81 asserted, preserved so it can be chased rather than silently vanish: academic peer review (21% of ICLR 2026 reviews fully AI-generated), healthcare (90-96% alert override rates, 40+ years of fatigue research), marketing (only 25.8% of web pages purely human-written, consumer trust 60%→26%), legal (700+ court cases with AI hallucinations), customer service (Klarna reversal), compliance/government (Stanford "cognitive escrow"), and *"three academic papers"* describing it as domain-independent cognitive failure. **Not one carries a URL, and the three papers are named nowhere.** One of them may not even measure this pattern: *"21% of ICLR reviews AI-generated"* measures AI **writing** reviews, which is the opposite direction from reviewers drowning in volume. If the sourcing exists it is in `platform-watch/cross-platform/runs/2026-03-31-cycle81.md` and has to be pulled forward before any of this is citable. **The file's demonstrable level is L2 on two practitioners (Ronacher, Osmani).** The withdrawal is of the cross-domain *proof*, not of the pattern.

**The bottleneck sequence:**
1. **Generation** — solved. Agents produce at superhuman speed.
2. **Verification** — known problem. Tests, evals, holdout scenarios.
3. **Absorption** — the next wall. Humans can't process the volume of mostly-correct output fast enough to steer. 95% accuracy at overwhelming volume may be worse than 80% at digestible volume.

**"Absorption bottleneck" is a novel name for a convergent phenomenon.** The concept exists under six different labels — nobody connected them. This finding unifies them.

## The Quantitative Evidence

| Metric | Source | What it shows |
|--------|--------|--------------|
| +59% workflow runs YoY | [CircleCI 2026](https://circleci.com/blog/five-takeaways-2026-software-delivery-report/) (28.7M workflows, Sept 2025 only) — **[vendor blog] — Level 0** | Generation side exploding, per the vendor's own telemetry |
| -7% main-branch throughput (median) | CircleCI 2026 (same dataset) — **[vendor blog] — Level 0** | Delivery side collapsing, per the same |
| 70.8% main-branch success rate | CircleCI 2026 (five-year low) — **[vendor blog] — Level 0** | Quality collapsing under volume, per the same |
| ~~95% of teams fail to scale both~~ **[UNVERIFIED STAT]** | CircleCI's own compression of two sentences; the cohort behind it is disputed by [Bowley](https://blog.robbowley.net/2026/04/02/more-code-less-delivery-but-does-the-circleci-2026-report-really-show-1-in-20-teams-are-benefiting/) — [practitioner analysis] | Nothing, on its own. Cite only with the dispute attached |
| 91% increase in PR review time | [Faros AI](https://www.faros.ai/blog/ai-software-engineering) (10K+ devs, 1,255 teams, Jul 2025) — **[vendor blog] — Level 0** | More AI code = way more human review |
| 98% more PRs merged per developer | Faros AI (same study) | Volume explodes |
| 1.7x more issues in AI-generated code | [CodeRabbit](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report) (470 PRs, Dec 2025) — **[vendor blog] — Level 0**, and it sells AI code review | AI code needs MORE review, not less |
| ~3.4x total review burden | (2x volume × 1.7x issues combined) | The compound math kills you |
| 80% zero productivity impact | [NBER](https://fortune.com/2026/02/17/ai-productivity-paradox-ceo-study-robert-solow-information-technology-age/) (6K executives) — [general press] | Volume up, organizational output flat |
| Time savings plateau at 4 hours | [DX](https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/) (135K devs, Nov 2025) — **[vendor blog] — Level 0** | Hard ceiling regardless of adoption level |
| Worker confidence DOWN 18%, usage UP 13% | [ManpowerGroup](https://fortune.com/2026/03/10/ai-productivity-workers-workday-efficiency/) — [general press] | People use more AI and trust it less |
| No correlation AI adoption → better DORA metrics | [DORA 2025](https://dora.dev/research/2025/dora-report/) — [academic/research] | Organizational delivery flat despite individual throughput gains |

**The compound math:** 2x more PRs, each with 1.7x more issues, needing 91% more review time. The review burden isn't additive — it's multiplicative. This is why "review harder" fails as a strategy.

## Six Names for One Phenomenon

The absorption bottleneck has been independently observed and labeled by multiple practitioners and researchers. Nobody connected them:

| Name | Who | What it captures | What it misses |
|------|-----|------------------|----------------|
| Comprehension debt | [Osmani](https://addyosmani.com/blog/comprehension-debt/) — [practitioner direct] | Accumulated understanding deficit | The throughput constraint |
| AI Productivity Paradox | [Faros AI](https://www.faros.ai/blog/ai-software-engineering), [NBER](https://fortune.com/2026/02/17/ai-productivity-paradox-ceo-study-robert-solow-information-technology-age/) | Macro outcome failure | Root cause mechanism |
| Alarm fatigue | [Aviation/nuclear](https://en.wikipedia.org/wiki/Alarm_fatigue) — tertiary aggregator, **context only, not evidence**; trace to primaries before citing | Desensitization under volume | AI-specific generation dynamics |
| Slop / effort asymmetry | [Willison](https://simonwillison.net/2026/Mar/23/neurotica/), [Furze](https://leonfurze.com/2026/03/28/the-effort-economy-of-slop/) — both [practitioner direct] (Furze writes his own analysis on his own site; not peer-reviewed) | Production-consumption imbalance | Organizational/team dynamics |
| Societal cognitive overload | [arXiv 2504.19990](https://arxiv.org/abs/2504.19990) — [academic/research] | Systemic institutional paralysis | Practitioner-level actionability |
| Review bottleneck | [Bowley on DX's 2025 report](https://blog.robbowley.net/2025/11/05/findings-from-dxs-2025-report-ai-wont-save-you-from-your-engineering-culture/) — [practitioner analysis], Nov 2025, **historical** (this is Bowley critiquing DX, not DX); [Cursor/Graphite](https://fortune.com/2025/12/19/cursor-ai-coding-startup-graphite-competition-heats-up/) — [general press], Dec 2025, **historical** | Engineering-specific flow constraint | Cross-domain generalizability |

**Absorption bottleneck is the unifying concept.** It names the specific throughput constraint that creates comprehension debt, drives the productivity paradox, triggers alarm fatigue, makes slop harmful, causes institutional cognitive overload, and manifests as review bottleneck in engineering.

## Why "Review Harder" Fails

People hitting the absorption wall are doing one of three things, all wrong:

1. **Read everything** — doesn't scale. The 91% review time increase IS this strategy failing at 10K developer scale.
2. **Sample randomly** — misses the 5% that's wrong. Errors cluster in edge cases, not random distribution.
3. **Trust and ship** — until something breaks in production (Amazon Kiro: 6.3M lost orders **[SOURCE NEEDED]**).

The instinct is to review harder, not to review differently. But the bottleneck is structural, not attentional. No amount of human attention scales against 2x volume with 1.7x more issues.

## The Aviation Parallel

This is alarm fatigue applied to AI output. Three Mile Island operator **[SOURCE NEEDED — quote not traced to a primary]**: "I would have liked to have thrown away the alarm panel. It wasn't giving us any useful information." Aviation's solution after decades: track 10,000+ data points but set alarm thresholds so <10% of flights trigger any alert **[SOURCE NEEDED]**. **False positive avoidance is MORE important than detection sensitivity.**

Applied to AI: filtering out the 95% that's fine is more important than catching every issue. The human's job shifts from "review all output" to "design the system that surfaces the 5% worth reviewing."

## What Actually Works

### Agent-evaluates-agent (emerging Level 2-3)

LLM-as-a-Judge achieves 80-85% agreement with human judgment at 500x-5000x cost reduction. Human-to-human agreement is only 81% — LLM judges approach parity. Multi-agent debate evaluation emerging as strongest pattern.

Source: [arXiv](https://arxiv.org/html/2508.02994v1) — [academic/research]; [LabelYourData](https://labelyourdata.com/articles/llm-as-a-judge) — **[vendor blog] — Level 0** (written by the company's CEO, closing with a pitch for its own annotation services; do not carry it as support for the 80–85% agreement figure)

**Market signal:** Cursor acquired Graphite ($52M) for code review. Anthropic launched multi-agent Code Review (March 2026) — dispatches a team of agents per PR that find bugs in parallel, verify to filter false positives, rank by severity. The money is moving toward agent-evaluates-agent as infrastructure.

Source: [Anthropic](https://claude.com/blog/code-review) — [vendor press release]; [TechCrunch](https://techcrunch.com/2026/03/09/anthropic-launches-code-review-tool-to-check-flood-of-ai-generated-code/) — [general press]

### Scalar-metric constraints (Karpathy bypass)

Karpathy's autoresearch: 700 experiments in 2 days, human reviews RESULTS not PROCESS. Works only where a single scalar metric exists (training loss). The human doesn't absorb 700 experiments — they check which 20 improved the number.

Source: [GitHub/autoresearch](https://github.com/karpathy/autoresearch) — [practitioner direct]; [WinBuzzer](https://winbuzzer.com/2026/03/23/karpathy-humans-bottleneck-ai-research-xcxwbn/) — [general press]

**Limitation:** Most business domains don't have a single loss function. Marketing, legal, finance, HR — the output requires judgment, not metric comparison.

### Progressive disclosure

Show lightweight metadata first (titles, types, confidence scores), fetch full content only when needed. Layer-based architecture: Index → Summaries → Full details → Source files. Same principle applies to both AI context windows and human attention.

Source: [AI UX Design Guide](https://www.aiuxdesign.guide/patterns/progressive-disclosure) — [practitioner analysis]; [Martia/Medium](https://medium.com/@martia_es/progressive-disclosure-the-technique-that-helps-control-context-and-tokens-in-ai-agents-8d6108b09289) — [practitioner direct]

## Connection to Other Patterns

- **Verification infrastructure (L4 meta-pattern):** Absorption is what happens when verification is needed at volume. The three-level verification progression (expert-in-loop → rule-based → eval-based) needs a volume dimension: at what output volume does each level break?
- **Compound engineering:** Works partly BECAUSE it's solo — one person, manageable output volume. The absorption bottleneck is a team/organization problem, not an individual one.
- **SwarmAI:** Parallel agent generation MAXIMIZES the absorption problem. SwarmAI's value depends on solving absorption (through collective evaluation, summarization layers, agent-evaluates-agent).
- **MobAI limitation:** MobAI teaches "human watches AI" — Phase 1 thinking. The absorption bottleneck proves this doesn't scale. Phase 4 is "human designs the system that watches."
- **DORA amplification paradox:** The "AI amplifies what's already there" finding is partially explained by absorption. Good teams absorb AI output (they have review culture, test suites, CI/CD). Weak teams drown in it.

## What We Did Not Find

1. **The term "absorption bottleneck" in prior literature.** Nobody uses this phrase. Genuinely novel framing that unifies six existing concepts.
2. **Non-engineering domains experiencing absorption explicitly. STILL NOT FOUND — the "RESOLVED" marker here was withdrawn 2026-08-01.** Cycle 81 recorded six domains with per-domain levels (academic peer review L3, healthcare L3, marketing L3, legal L2, customer service L2, compliance L2) and upgraded the file to L4 on that basis. **Every figure behind those levels is uncited**, and the per-domain levels themselves carry no working. This item is open, not closed. Chase `platform-watch/cross-platform/runs/2026-03-31-cycle81.md` before re-asserting any of it.
3. **Counter-evidence — anyone who scaled AI review without hitting absorption.** **One real counter-example now exists — PostHog's StampHog agent reviewer, self-approving roughly 1 in 3 merged PRs (see the audit note at the top).** It is single-company and self-reported, so it does not settle anything, but the previous wording here ("remarkable absence of counter-evidence") is no longer true and absence was never corroboration in the first place. Karpathy's scalar-metric constraint remains the other partial case. The DX figure that used to close this line is vendor telemetry (Level 0) and cannot carry a "NO companies" universal.
4. **A formal mathematical model** of the generation-absorption gap as a function.

## Five Solution Strategies (Cycle 82)

No single strategy is universal. Each is domain-constrained. The combination approach is untested but likely optimal.

| # | Strategy | Mechanism | Best example | Results | Works when... | Fails when... |
|---|----------|-----------|-------------|---------|---------------|---------------|
| 1 | **Eliminate human review** | Holdout scenarios + Digital Twins. Agent generates, separate evaluator checks against criteria agent never saw. | StrongDM (3 engineers, 32K lines production code) **[SOURCE NEEDED]** | Zero human review, 3-10x velocity **[SOURCE NEEDED]** | Greenfield, well-defined behavioral specs, testable output | Legacy code, judgment-heavy domains, accountability requirements |
| 2 | **Scalar metric filter** | Run many experiments, human reviews only what improved the number. | Karpathy autoresearch (700 experiments → 20 winners) | 11% training speed gain from 2 days autonomous | Success measurable as single number (training loss, conversion rate, latency) | Most business domains — marketing quality, legal accuracy, strategic fit have no scalar metric |
| 3 | **Agent-reviews-agent** | AI reviews AI output — finds issues, verifies to filter false positives, ranks by severity. | Anthropic Code Review, Greptile (82% bug catch) **[SOURCE NEEDED]**, Ramp (financial transactions) | 80-85% agreement with human judgment at 500x cost reduction **[SOURCE NEEDED]** | Output is evaluable by another agent, false positives tolerable | Blind spot problem — reviewer may hallucinate. Early/unproven at scale. |
| 4 | **Constrain generation** | Spec-driven development. Narrow option space BEFORE generation. | StrongDM (zero-code repo, 3 spec files), Karpathy (program.md), Spotify (task specs) | Reduces unpredictability, prevents decision queue explosion | Clear requirements, experienced spec writer | Exploratory work, unclear requirements, innovation/discovery phases |
| 5 | **Tiered review + specialist filter** | Severity tiers, suppress low-value alerts, specialist intermediary reviews mid-tier, humans see only high-severity. | Cleveland Clinic (80% alert reduction) **[SOURCE NEEDED]**, Swiss hospitals (72.4% acceptance rate) **[SOURCE NEEDED]** | **[SOURCE NEEDED] — level withdrawn 2026-08-01.** Previously read *"most independently validated, 40 years of healthcare evidence (L3)"*; both figures behind it are uncited, so the row cannot be the best-evidenced strategy in the table. The general alarm-fatigue literature is real but is not traced to primaries here. | High volume, classifiable severity, specialist intermediaries available | Novel/unprecedented situations that don't fit tiers |

### The Untested Combo (Hypothesis)

No practitioner combines strategies. The likely optimal approach for most organizations:

1. **Constrain with specs** (Strategy 4) — reduce generation volume and unpredictability upfront
2. **Agent-reviews-agent** (Strategy 3) — automated first-pass review of everything generated
3. **Tiered human review** (Strategy 5) — humans see only what agents flagged as high-severity or low-confidence

This is the healthcare model (tiered review) with AI-era additions (specs as constraints, agents as first-pass reviewers). Nobody has built this full stack yet.

### Healthcare Is 20 Years Ahead

Healthcare has been drowning in machine-generated alerts since the 1990s. Their solutions (alert tiering, suppression algorithms, specialist intermediaries, iterative threshold tuning) are long-established practice. ~~L3 proven with 40 years of evidence.~~ **[SOURCE NEEDED] — level withdrawn 2026-08-01**, same reason as the Strategy 5 row: the two figures this file offers as the evidence (Cleveland Clinic, Swiss hospitals) are uncited, and no alarm-fatigue primary is cited anywhere in this file. **Also note the arithmetic never worked:** the heading says *20 years ahead*, this sentence said *40 years of evidence*, and *"since the 1990s"* is about 30 — three different numbers for one span, which is the tell that none was measured. Engineering is reinventing these solutions from scratch. The transfer opportunity looks real and is the reason to chase the primaries rather than drop the section.

### Gap: Individual vs. Organizational

All five strategies work at team level. None has demonstrated organizational-level absorption improvement. Faros AI (10K developers): no correlation between AI adoption and company-level productivity even where teams use these techniques. The team solves its review queue; the organization's decision/integration/coordination queues remain.

## CTO Advice

The absorption bottleneck explains why your AI investment isn't showing up in organizational metrics. Individual developers produce more. The organization drowns in reviewing it.

**Three responses, in order of maturity:**

1. **Redesign workflows around review, not generation** (immediate). Review is the new bottleneck, not coding. Staff, tool, and optimize for review capacity. This is what Cursor/Graphite bet $52M on.

2. **Deploy agent-evaluates-agent** (near-term). Use AI to filter, triage, and pre-verify AI output before it reaches humans. Anthropic's Code Review, LLM-as-a-Judge patterns. 80-85% human agreement at 500x cost reduction.

3. **Design for scalar metrics where possible** (strategic). Karpathy bypass: constrain domains to measurable outcomes, let agents run 700 experiments, humans review only what improved the metric. Where you can't find a scalar metric, build one — that's the verification infrastructure investment.

**The shift:** From "human reviews AI output" to "human designs the system that reviews AI output." Same shift as manufacturing quality control — statistical process control, not widget inspection.
