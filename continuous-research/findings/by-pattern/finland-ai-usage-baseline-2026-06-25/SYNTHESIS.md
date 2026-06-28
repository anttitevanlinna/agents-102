---
type: finding
domain: ai-adoption-baseline
evidence_level: 3
scope: "Finland AI-usage baseline — the 'we use AI' denominator and its chat-collapse; EU/Nordic comparison; international meta-pattern"
run_date: 2026-06-25
freshness_cutoff: 2025-12-27
nordic: true
sibling_findings:
  - "productivity-gains-2026-06-25/SYNTHESIS.md (agentic SE productivity ceiling — the frontier above this baseline)"
  - "e-nordic-finland.md / f-nordic-rest.md (Nordic agentic SE frontier)"
built_from: "a-finnish-official-statistics.md · b-depth-breakdown-surveys.md · c-finnish-workforce-usage.md · d-eu-nordic-comparison-and-chat-pattern.md · g-software-sector-cut.md · h-finnish-software-sector.md · i-developer-adoption-depth.md · j-software-org-integration.md · k-code-diff-volume-comparators.md"
answers:
  - "What is the latest official statistic for AI usage in Finnish business, and what does it actually mean?"
  - "Is the 60–80% 'we use AI' headline mostly plain LLM chat?"
  - "Where does Finland rank vs the EU and the other Nordics, and how thin is the agentic slice inside the headline?"
practitioners_and_sources: [Statistics Finland/Tilastokeskus, Eurostat, EIB/EIBIS, Työterveyslaitos, Suomen Yrittäjät, ETLA, FAIR EDIH, Akava Works, SAK, VTT/TEK, OECD, US Census BTOS, OpenAI/NBER, Anthropic Economic Index, McKinsey, Bain, Slack Workforce Lab, Ramp, "Software sector: DORA 2025, Stack Overflow 2025, JetBrains, GitHub Octoverse, DX, Faros AI, Atlassian, Stripe Minions, LinkedIn CAPT, Spotify Honk, Uber, Shopify, Gofore, Luoto Company, Software Finland, Reaktor×University of Helsinki"]
---

# Finland AI-usage baseline — the fat headline and the thin slice

**One-paragraph answer.** Finland is the **#2 enterprise-AI adopter in the EU (37.8%, ~1.9× the EU-27 average)** — a genuine lead. But every "we use AI" headline here is a **breadth** denominator ("used ≥1 AI technology, in ≥1 function, at least once, self-reported"), and when you decompose it — in Finland and everywhere else — it collapses to **mostly conversational writing and information-seeking**. The EU-topping "66% use generative AI" figure is *literally defined* as using "ChatGPT, Bard or Copilot." Depth thins sharply with every step toward integration (Finnish firms: **91% permit GenAI → 28% pursue org-wide transformation → 12% have actually replaced a task**) and the agentic tier has **no published Finnish denominator at all**. The maintainer's hypothesis — "60–80% claim to use AI, which mostly means chat" — is **confirmed on shape, with one correction on magnitude**: the population-wide enterprise number is 38%, not 60–80%; the 60–80% is the *generative-AI / large-firm / individual-worker* cut. The chat-collapse itself is a **global law (Level 3 convergence across official + telemetry + commercial methods)**, not a Finnish quirk.

---

## 0. Which number is your slide actually about? (the denominator trap)

The single most important move before this goes on a slide: **say which population you mean.** The headline swings from 23% to 80% depending on it.

| Denominator | Figure | Source |
|---|---|---|
| All enterprises 10+ employees, "any AI tech" | **38% / 37.8%** | Tilastokeskus / Eurostat, spring 2025 — [official statistics] |
| **Software / ICT firms (NACE-J)** — *the cut for a software audience* | **~80% / 79.79%** | Tilastokeskus / Eurostat, spring 2025 — [official statistics] |
| Large enterprises (250+) | **~68%** | Tilastokeskus, spring 2025 — [official statistics] |
| Firms, **generative AI**, def = "ChatGPT/Bard/Copilot" | **66%** (EU #1) | EIB/EIBIS 2025 — [academic/research, independent EU] |
| SMEs | **57%** (19% regular / 38% occasional) | Suomen Yrittäjät × Elisa, Oct 2025 — [domain trade pub, flag self-interest] |
| Population 16–89, used genAI in last 3 mo | **41%**; **22%** for work | Tilastokeskus SUTIVI 2025 — [official statistics] |
| Private-sector **engineers** | **80%** | Akava Works / Tekniikan akateemiset, Jun 2026 — [union/labor survey] |
| Blue-collar workers | **23%** | SAK, Dec 2025 — [union/labor survey] |

> **The "60–80%" you remember is real — it's the generative-AI / large-firm / individual-worker cut, not the 38% population-wide enterprise number.** Name the denominator or the room will pick its own.
>
> **For a software-company audience the right denominator is the NACE-J cut: ~80%, not 38%** (full treatment in §6). The all-sector 38% averages software in with construction and hospitality — useless on a software slide.

*Freshness note on the official cells (38% / 80% / 41% etc.): these are the **latest available** releases — the annual EU enterprise-ICT survey, reference period spring 2025, **published Nov–Dec 2025**; next round ~late 2026. Dated by reference period, current by publication; no fresher official data exists. Cite as the standing official number, not as stale.*

---

## 1. The headline is denominated in chat — confirmed at the instrument level

Your hypothesis isn't an inference here; it's baked into the survey questions.

- **The EU-topping number is a chatbot question wearing a chatbot's name.** EIB's 66% = firms using "generative AI tools *such as ChatGPT, Bard or Copilot*." The metric *is* chat. — EIB 2025, [academic/research].
- **The official type-split is all generative.** Tilastokeskus spring 2025: text analysis **29%**, image/video/audio generation **22%**, written/spoken-language/code generation **20%** — prompt-in / content-out, none describing embedded-in-product or autonomous-workflow use. Eurostat's EU-wide split has the same shape (text mining 11.8% the single most common technology). — [official statistics].
- **There is no depth question.** The official instrument has no Layer-2 (intensity/integration) item, so the 38% headline *cannot* be read as integrated or agentic. Breadth, by construction.

## 2. The depth collapse (Finland-specific)

The funnel from "people may chat" to "the work changed" loses ~87% of the headline:

> **91%** of AI-using Finnish firms *permit* GenAI experimentation → **49%** *trained* anyone → **28%** pursue *org-wide transformation* → **12%** have *actually replaced a task* with GenAI.
> *(Työterveyslaitos × Tilastokeskus, "Tekoälyn hyödyntäminen yrityksissä 2025", N=1,691, 10+ employees — [academic/research] + [official statistics].)*

⚠️ **PROVISIONAL — hard gate.** The julkari.fi primary PDF returned 403; these figures came via a secondary synthesis + ResearchGate mirror. This funnel is load-bearing for the depth-collapse thesis — **do NOT put 91/28/12 on a deck until the julkari.fi primary is confirmed first-hand.** Cited here as a flagged research finding, not a slide-ready number. *(Maintainer follow-up below.)*

Corroborating depth gradients (independent):
- **Frequency is shallow:** of the 57% SME headline, only **19% use AI regularly**; 38% occasionally (Suomen Yrittäjät). Occasional 2:1 over regular = a tool people open when they remember it, not a wired-in process.
- **Integration is a minority even among leaders:** just **25%** of *leading-edge* Finnish adopters report AI "integrated into products/services" (FAIR EDIH, Dec 2025–Feb 2026, sample = established AI users only — [academic/research]). If a quarter of the front-runners are integrated, the population share is far lower.

## 3. The workforce layer — chat by composition

Where "it just means chat" is most visible: how Finnish *employees* personally use it.

- **The task mix is conversational.** Tilastokeskus SUTIVI 2025: **information search 33% (now the #1 use, up from 14%)** > text production/improvement **25%** > image/video 11% > **coding 6%**. The modal Finnish AI interaction is *asking a chatbot a question*. — [official statistics].
- **Adoption came through the side door.** ~**50%** of highly-educated professionals learned AI by self-study, only ~**20%** via employer training (Akava Works); only ~**1/3** got employer genAI training (ETLA). The employee brought ChatGPT to the desk; the org did not hand them an integrated agent.
- **"Available" ≫ "actively used."** 28% had AI tech *available* at work but only ~10% *actively used it themselves* (Tilastokeskus Työolotutkimus, autumn 2023 — dated, but the mechanism is the point). This gap is exactly where "we have AI" inflates past "people do agentic work."
- **Even the engineers chat.** The cohort most able to do agentic work — private-sector engineers at 80% adoption — self-classify AI as a **"tool" (58%)** or **"assistant" (39%)**, with only ~2% treating it as a delegated work-partner. When the most technical population in the country still uses AI as a chat-assistant, the chat-not-integration read is robust. — Akava Works, Jun 2026, [union/labor survey].

*Honest bound:* sector spread is enormous (universities ~70% vs municipalities/welfare 21%; blue-collar 23%), and daily use is rising fast (15%→27% daily in 11 months, Suomen Yrittäjät). The chat verdict is strongest in white-collar knowledge work; the depth picture is a *moving* target.

## 4. The chat-collapse is a global law, not a Finnish quirk — Level 3

The most valuable thing in this thread: the Finnish numbers sit inside a structural pattern that clears the convergence bar across **independent methods**.

- **US Census working paper "The Microstructure of AI Diffusion"** (2026 BTOS AI supplement, nationally representative): **18% of firms adopted (32% employment-weighted)**; **57% of users integrate AI in ≤3 functions**; "*writing, document analysis, and information search are the leading generative-AI uses … 65% of firms limit use to ≤3 tasks*"; **66% rely on AI solely to augment**. — [academic/research]. *The single best official statement of the collapse.*
- **OpenAI × NBER "How People Use ChatGPT"** (1.5M-conversation sample): ~**70% of usage non-work**; **three-quarters is practical guidance, info-seeking, and writing**. — [survey, commercial venue / academic/research], disclose OpenAI's own telemetry.
- **Anthropic Economic Index:** consumer **52% augmentation** vs 45% automation; even enterprise-API "automation" is an **extraordinarily narrow** coding-shaped spike (bottom 80% of task categories = 10.5% of usage). — [survey, commercial venue], self-interested.
- **Adopt-vs-scale surveys (each weak alone, convergent together):** McKinsey **88% use / ~7% fully scaled / ~6% material P&L impact**; Bain **95% use / ~23% report value**; Slack **1-in-5 desk workers use AI daily** (+233%/6mo); Ramp paid AI subscriptions **>50%** (a license ≠ a workflow). — all [survey, commercial venue], flag self-interest.

**Leveling (honest):** the *direction* — fat "we use AI" headline collapsing to (i) mostly writing/info-seeking, (ii) ≤3 functions per adopter, (iii) a single-digit fully-scaled tail — is **Level 3 convergence**, carried by the two genuinely *independent* legs (**US Census official microdata + OpenAI/NBER telemetry**); the commercial bucket (McKinsey/Bain/Slack/Ramp/Anthropic) **corroborates the shape but does not add independent weight**, and the specific round numbers (88%, 95%, 7%) are commercial point estimates, **not** L3-grade on their own. The "fat headline, thin integration" shape is the classic general-purpose-technology diffusion law (broad shallow uptake first, deep integration later and concentrated among leaders) — gestures toward L4 but is asserted, not independently demonstrated here.

## 5. Comparative frame — Finland leads on breadth

| Country | Enterprise AI adoption | Year |
|---|---|---|
| Denmark | **42.0%** | 2025 |
| **Finland** | **37.8% (#2 in EU)** | 2025 |
| Sweden | 35.0% | 2025 |
| EU-27 average | **20.0%** | 2025 |

*(Eurostat `isoc_eb_ai`, 10+ employees, ≥1-of-8 technologies — [official statistics].)* Finland is a genuine high-adoption outlier at **~1.9× the EU average** — *but only on the any-use denominator.* OECD corroborates the Nordic ordering (>35% Denmark/Finland/Sweden; firm adoption doubled in two years) but rests on the **same Eurostat survey** — so OECD + Eurostat = one official lineage, not two. The genuinely independent official corroboration is **US Census BTOS** (a different statistical system showing the same text-task shape).

---

## 6. The software-sector cut — where the chat-collapse cracks (not shatters)

*The deck is aimed at software companies, so the 38% all-sector average is the wrong denominator for that room. This section re-cuts the whole thread for software/ICT. Built from `g-software-sector-cut.md · h-finnish-software-sector.md · i-developer-adoption-depth.md · j-software-org-integration.md`.*

**The honest software number is ~80%, not 38%.** Finnish "Information & communication" (NACE-J — the sector that houses software/IT services) enterprise AI use = **79.79%** (Eurostat `isoc_eb_ain2`) / **80%** (Statistics Finland), spring 2025 — **+42pp over the all-sector average, 2.1×**, and cross-confirmed two independent ways. EU-27 software sector = **62.52%**. Among *large* Finnish software firms it's effectively universal (an inference from the J × size-class marginals — the intersection cell isn't published). — [official statistics], the load-bearing number of this section.

⚠️ **Two honesty flags before this goes on a slide:**
1. **Same low bar.** 80% is the *same* "used ≥1 of 8 AI techs, self-reported, no intensity threshold" denominator as the 38%. It changes the audience-appropriate base rate, **not** the definition — "almost every software firm has *touched* AI," not "runs agents."
2. **Finland's lead does NOT survive the software cut.** On the all-sector number Finland is EU #2; on the *software-sector* number **Sweden tops it — 87.9% vs Finland's 79.8%** (Denmark 79.1%). Do not claim "Finland leads Europe in software-sector AI." It doesn't.

**Does the chat-collapse break in software? It *cracks* — three layers, decreasing depth:**

| Layer | Number | Read |
|---|---|---|
| Firm *access* (NACE-J) | **80%** (FI) / 62.5% (EU) | Near-universal — but the same shallow "touched AI" denominator |
| Developer *use* | **84–90%** use AI; **~30–35%** use a genuine coding *agent* at some cadence *(convergent estimate across SO 2025 + JetBrains Jan-2026 + Cursor telemetry — no single survey)* | Saturation on AI; agentic is a *doubling-YoY* but still minority cohort even among devs |
| Org *integration* | **majority** integrated into CI/PR (Faros 80% of teams active, DX ~52% of code AI-authored, Bain 40% of pilots→prod vs 20–33% elsewhere — *Bain Q3-2025, n=197, [survey, commercial venue], ~9mo; all org-level sources are commercial*); **<1%** of PRs agent-*opened* unattended | Integrated = crossed; autonomous/agentic = leading-edge minority diffusing fast |

So: **the global "it's just chat" law genuinely breaks for software — the one sector where the median org has AI in the *pipeline*, not just the chat window.** But it *cracks, it doesn't shatter*: even here only ~1/3 of developers use a real agent, <1% of PRs are agent-opened, DORA found **61% had *never* touched an agentic workflow** (Jun 2025 — dated/trailing edge), and a frontier AI-first org (**Shopify**) deliberately forbids auto-merge. The vanguard running unattended fleets is countable on two hands — **Stripe "Minions"** (1,000+ PRs/week containing zero human-written code), **Spotify Honk**, **Faire Swarm**, **LinkedIn CAPT** (1,000+ engineers, 500+ playbooks). Caveat that keeps it honest: every org-level adoption-rate source (DX, Faros, DORA, Bain, Atlassian) is a **self-interested commercial venue** — convergent on *shape*, soft on *magnitude*; the depth layer is direction-only, not clean L3.

**Finland's software sector, in its own practitioners' words — the competence gap, sector-proofed:**
> **51.6% of Finnish devs use AI systematically for code — but only 9.5% of orgs have org-wide AI practices.**
> *(Luoto Company own-sector survey, N=69, Feb 2026 — [survey, commercial venue]. Small N; directional, not definitive.)*

That line is the whole thread's thesis localized: tools in hand (80% access), organisational learning rate the ceiling (9.5% systematised). Corroborated by a named, citable case — **Gofore at the City of Helsinki** (Juhana Harmanen: a ~20-person AI-assisted team runs a 30-service slice that "would have required >3× the staff"; the bottleneck has moved *past coding* to prioritisation — [practitioner direct, vendor venue]; note the 3× is a stated claim, no tool named, not an audited DORA delta). **Verdict on Finnish software: adoption-but-unpublished, not behind.** Access is EU-leading; published practitioner evidence is thin. The tell: the flagship **Reaktor × University of Helsinki DORA study** (participants incl. Alma Media, RELEX; Business Finland-funded) launched **Feb 2025** with results promised within ~6 months — and **still has not published as of 2026-06-25**. The one instrument purpose-built to produce hard Finnish coding-agent numbers is itself the proof of the white space.

---

## 7. The diff-volume axis — Anthropic stands alone (verification dig)

*Built from `k-code-diff-volume-comparators.md`. Tests one hard negative: on the exact metric Anthropic's 8× uses, has anyone else published?*

Anthropic's 8× and the maintainer's measured ~2× both sit on **axis (A): merged-code VOLUME (lines / diff size) per engineer per unit time** — distinct from PR/MR *count* throughput (axis B) and from *% code authored* (axis C). Verified across the five most-likely measurement shops: **no independent organization publishes a number on axis (A).** The negative is L3-grade (GitClear, DX, Faros, Stanford/Denisov-Blanch, METR + GitHub Octoverse all checked — every one lands on a *different* axis) and **structural, not a coverage gap**: the post-DORA/SPACE discipline deliberately abandoned lines-of-code-as-output (Dijkstra: code is "lines *spent*, not produced"). Even DX's own SPACE-framework arm disowns the volume axis its 8×-cousin metric lives on.

Closest near-misses, each disqualified: **DX** median PR size 44→72 lines (+64%) and **Faros** average PR size +51% are *per-PR unit size* with no engineer-time denominator; **Faros** files-touched/dev +150% is a *count*, not line-volume. The one independent diff-*level* shop, **GitClear** (211M changed lines), measures diff *quality* not volume — and its 2025 finding cuts *against* the hype: short-term churn roughly doubled (~3.3% → 7.1%) while refactored/"moved" code fell ~60% (25% → <10%).

**Deck implication:** on the diff-volume axis your 2× has **no honest competitor except Anthropic's self-disclaimed 8×** — because the axis itself is one serious engineering orgs refuse to publish on. Saying that on stage ("the only number bigger than mine lives on the one metric the industry spent 40 years learning not to trust") is both true and disarming.

---

## The strategic read (baseline-vs-frontier) — report only, not yet folded into strategy

> Being high on the **chat denominator** (Finland is — #1 in Europe on genAI-as-ChatGPT) says **almost nothing** about readiness on the **integration/agentic axis** (almost no one is, anywhere). Finland leads Europe at *chatting with a copilot*; the agentic frontier our other findings document (Spotify's background PR agents, the ~2X coding-throughput ceiling) is a thin, fast-moving slice *inside* that fat number. The race everyone thinks is being won (adoption) is over; the race that's actually open (organisational integration) has barely started. **That gap is the wedge — competence makes the integration question askable, and the fat "we use AI" headline is precisely what disguises how empty the frontier still is.**

*Per research-claims §6, this is a reported read for discussion — not folded into `bosser-strategy` or curriculum without sign-off.*

## Deck recommendation (software-company audience)

1. **Lead with the sector-honest number, not the national one:** "Among software firms, **~80% use AI** — not the 38% you'll see in the national headline, which averages software in with construction and retail." Hero = 80%; the 38% is the *reveal* that makes it land.
2. **Immediately flag the low bar:** 80% = "touched AI," the same shallow denominator. Don't let the room read it as "80% run agents."
3. **Show where the collapse cracks — the three-layer slide:** firm access **80%** → developer agent-use **~30–35%** → PRs agent-opened **<1%**. Each step down is the competence gap made visible.
4. **The punchline that survives even here:** *"Everyone has AI; almost no one has agents"* — true even in software, the agent-native sector. If even the home turf of coding agents is ~1/3 of devs and <1% of PRs, the gap is the opportunity, not the embarrassment.
5. **Localize it:** Finnish devs say it themselves — **51.6% use AI systematically, 9.5% of orgs have org-wide practice** (Luoto, small-N). And the flagship Finnish study that would settle it *hasn't published* — the white space is real and ownable.
6. **State your own datapoint honestly:** your measured **~2X** coding throughput sits *inside* the thin agentic slice — above the 80%-chat baseline, in the fast-diffusing leading-edge minority. Not 4–8X; a real, defensible 2X with room to compound as verification/review (the actual bottleneck) gets built.
7. **One caveat to pre-empt:** do **not** claim "Finland leads Europe in software AI" — Sweden tops the software-sector cut (87.9%).

*(For a general / non-software audience, the national framing in §§0–5 still applies — lead with "Finland #2 in Europe at 37.8%," then spring the chat-denominated-66% trap.)*

## What we did NOT find

- **No Finnish survey with a clean, mutually-exclusive chat / integrated / agentic cross-tab.** The split is triangulated from depth gradients + task-mix + adoption-path, not one table. State this when presenting.
- **No Finnish-specific agentic-AI adoption denominator.** Only global proxies (KPMG 42% "some agents", Capgemini 2% at scale, McKinsey 23% scaling — all global, all consultancy, none cited as Finnish convergence).
- **Norway & Iceland Eurostat cells** — not machine-extractable from fetchable surfaces; a gap, not a number to invent.
- **No Finland-specific Anthropic Economic Index cut** — its telemetry is global Claude.ai usage, not Finnish workforce behaviour.
- **No published NACE-J × size-class (250+) cross-tab** — the "≥80% among large Finnish software firms" line is a defensible *inference* from the two marginals (J=80%, 100+=68%), not a single published cell.
- **No official "agentic vs chat" depth split for software** — the 30–35%-of-devs-use-an-agent and <1%-of-PRs-agent-opened figures are convergent commercial/telemetry estimates, not statistical-agency cells; every org-level adoption-rate source is a self-interested commercial venue.
- **No published Reaktor × University of Helsinki DORA-study results** — the one Finnish instrument built to produce hard coding-agent numbers; 16 months post-launch, still silent. The highest-value confirmed absence in the thread.
- **No independent per-engineer code-VOLUME-per-unit-time multiple anywhere (axis A)** — Anthropic's self-disclaimed 8× stands alone; GitClear/DX/Faros/Stanford/METR/Octoverse all measure a *different* axis. The absence is structural (LOC-as-output is a deliberately-abandoned metric), not a coverage gap. See §7.

## Maintainer follow-ups (deferred to wind-down)

- **Re-verify the 91/28/12 depth funnel** against the julkari.fi primary PDF (currently via secondary mirror — flagged provisional in §2).
- **Pull Norway/Iceland** from the Eurostat `isoc_eb_ai` DB UI or bulk `.tsv` to complete the Nordic table.
- **Open the firm-level DigiBarometri 2025 genAI section** (only the citizen EVA study was captured; the firm barometer is an open gap).
- **Pull the Eurostat `isoc_eb_ain2` J × size_emp cross-tab** (DB UI or bulk `.tsv`) to confirm the large-software-firm cell currently carried as inference.
- **Watch for the Reaktor × University of Helsinki DORA-study results** (Alma Media, RELEX) — convert the white space into a hard Finnish number the moment it drops; watch `reaktor.com/impact-of-genai-in-software-development` + HIIT/UH publications.
- **Antti's Agentics Helsinki access = the primary-research channel** to convert the community vein (currently founder-marketing, not evidence) into a citable Finnish coding-agent case.
- **Refresh `coding-engineering.md`'s global dev line** per `i-`: replace the dated "85% use AI / 62% use a coding agent" with "~84–90% use AI; ~30–35% use a genuine coding agent at some cadence; agentic doubling YoY but still minority."
- ✅ **`/research-review` run 2026-06-27** (four personas; both rollups). Fixes applied: §4 L3-independence tightened, §6 dev-agent/Bain caveats added, official-cell "latest available" framing, frontmatter cutoff harmonized. **One open hard gate: re-verify the 91/28/12 julkari.fi primary** (currently secondary-sourced) before any deck use.
- **Decide on the strategic wedge** (§"strategic read") — discuss before folding into strategy/curriculum (research-claims §6).
