---
type: finding
domain: ai-adoption-baseline
evidence_level: 2
scope: "Finnish software-INDUSTRY AI / coding-agent adoption, people-first — industry-body surveys, the Reaktor×UH productivity study, named Finnish firms/practitioners with published coding-agent evidence, and the Helsinki agentics community vein. Sibling of g- (official NACE-J statistics cut) and the global coding-engineering track."
parent_thread: "finland-ai-usage-baseline-2026-06-25"
siblings: ["g-software-sector-cut.md (NACE-J 80% official cell)", "by-domain/coding-engineering.md (global Dec-2025 phase shift, Spotify/Lovable Nordic)"]
run_date: 2026-06-25
freshness_cutoff: 2025-12-25
prior: "adoption-but-unpublished — Finnish software firms adopt coding agents but mostly don't publish (e-nordic-finland / nordic-landscape)"
answers:
  - "What does the Finnish software INDUSTRY's own survey machinery (Software Finland Sykemittari, the Software Industry Survey, Luoto) say about AI adoption in software firms?"
  - "Did the Reaktor × University of Helsinki GenAI-productivity study (Alma Media, RELEX) publish results?"
  - "Which named Finnish software firms/practitioners have PUBLISHED coding-agent evidence (named firm + specific practice + measurable result + URL)?"
  - "Is Finnish software-sector coding-agent adoption published, adoption-but-unpublished, or genuinely behind?"
---

# H — Finnish Software-Industry Coding-Agent Adoption, People-First

**One-line verdict:** The prior holds and sharpens. Finnish software-industry *AI use* is broad and well-surveyed at the firm level (the industry's own bodies report it), but **published, practitioner-direct, measurable coding-agent evidence is thin** — one strong named-firm case (Gofore), one decent practitioner survey (Luoto, N=69), and a flagship academic study (Reaktor × University of Helsinki) that **still has not published results 16 months after launch**. Verdict: **(b) adoption-but-unpublished — the white space is real**, with a measurement vacuum at its centre that the one study built to fill it has not yet filled.

This fragment is **people-first**: it follows what Finnish software *bodies, firms and practitioners say in their own words*, not the official statistical cell (that is sibling `g-`, which pins the NACE-J denominator at ~80%).

---

## (a) Finnish software-industry adoption figures

| Source | Year / ref period | Metric | N | URL | Label |
|---|---|---|---|---|---|
| **Software Finland (Ohjelmistoyrittäjät) — Sykemittari, autumn 2023** | autumn 2023 (pub. 17.11.2023) | **77%** of software companies use AI "in some form," **up from ~50% six months earlier** (+27 pp in 6 mo). 25% of AI-users expect strong growth vs 11% of non-users | not disclosed (member survey) | [sttinfo 70057849](https://www.sttinfo.fi/tiedote/70057849/tekoalyn-kayttoonotto-huikean-nopeaa-80-percent-ohjelmistoyrityksista-kasvaa-softafirma-joka-ei-kayta-aita-on-pian-entinen-softafirma?publisherId=2046279&lang=fi) · [uusiteknologia 2023](https://www.uusiteknologia.fi/2023/11/17/tekoalyosaaminen-vauhdittaa-suomalaisia-ohjelmistoyrityksia/) | [survey, commercial/industry-body venue] |
| **Software Finland — Sykemittari, spring 2026** | spring 2026 (pub. May 2026) | **80%+ of software firms have acquired AI expertise** via hire or outsourcing; **25%+ hiring specifically for AI tasks**; 76%+ expect growth; 56% plan to hire (+10 pp YoY). AI use "correlates clearly with rapid growth." *No fresh standalone "% using AI" figure published in this round* | not disclosed | [uusiteknologia 29.5.2026](https://www.uusiteknologia.fi/2026/05/29/yli-puolet-softayrityksista-aikoo-rekrytoida-lisaa-tekoalyosaaminen-tarkeaa/) · [ePressi](https://www.epressi.com/tiedotteet/ohjelmistoteollisuus/ohjelmistoyrityksista-yli-76-ennakoi-kasvua-yli-puolet-aikoo-rekrytoida-seuraavan-puolen-vuoden-aikana.html) | [survey, industry-body venue] |
| **Luoto Company — software-developer survey** | pub. 20.2.2026 | **78.5%** see clear/significant/critical benefit from AI; **~half use AI ≥ regularly**; **51.6% use AI systematically/by default for small code snippets & functions**; **only 9.5%** have org-wide agreed AI practices. Barriers: skills/shared-practice 26%, security/compliance 25%, customer/contract limits 17% | **69** software-dev professionals | [Y-lehti](https://y-lehti.fi/kysely-paljastaa-tekoalyn-hyodyt-tunnistetaan-ohjelmistokehityksessa-laajasti-mutta-systemaattinen-kaytto-laahaa-perassa/) · [ePressi](https://www.epressi.com/tiedotteet/tietotekniikka/kysely-paljastaa-tekoalyn-hyodyt-tunnistetaan-ohjelmistokehityksessa-laajasti-mutta-systemaattinen-kaytto-laahaa-perassa.html) · [ETN.fi](https://etn.fi/index.php/13-news/18559-suomalaiskoodista-puuttuu-systemaattinen-tekoaelyn-kaeyttoe) | [survey, commercial venue] (Luoto is a SW consultancy; small N) |
| **Software Industry Survey 2025 (Klemetti, Sorvisto, Raatikainen, Nurminen)** — multi-university (Jyväskylä lead + Tampere/Helsinki/Vaasa) | 2025 (AI = year's theme) | of **411** respondents, **64 develop/fine-tune AI models**; **61%** call AI cost a (very) significant concern; AI spend projected <10% of cloud/HW cost 2025 → 10–25% 2026 → 25–50% 2028 | **411** Finnish software companies | [Springer chapter](https://link.springer.com/chapter/10.1007/978-3-032-12089-2_37) · [survey site](https://sites.app.jyu.fi/softwareindustrysurvey/en) | [academic/research] |
| *Context — all-firm, not SW-specific:* EIB Group Investment Survey (EIBIS) 2025 | 2025 | **66%** of Finnish firms use generative AI — **highest in EU**, vs **37%** EU avg | ~13,000 EU firms (FI subset) | [EIB press](https://www.eib.org/en/press/all/2025-502-finland-leads-europe-in-generative-ai-adoption-new-eib-survey-shows) | [official-institution survey] (not SW-cut) |
| *Context — official SW-sector cell (see sibling g-):* Statistics Finland / Eurostat NACE-J | spring 2025 | **80% / 79.79%** of Information-&-communication firms use AI | — | sibling `g-software-sector-cut.md` | [official statistics] |

**The framing trap (caught):** the much-quoted "77%, up from 50%" Sykemittari line is **autumn 2023**, not 2026 — the WebSearch synthesis layer conflated it with the spring-2026 round. The 2026 Sykemittari pivoted its AI message from *adoption %* to *talent acquisition* ("80%+ have acquired AI expertise," "hiring for AI"). So the standing industry-body adoption % is the 2023 77% (dated), and the current official software-sector number is the 80% NACE-J cell in sibling `g-` — they happen to agree, which is reassuring, not a coincidence to over-read.

---

## (b) Named Finnish software firms / practitioners — published coding-agent evidence (three gates)

Gate 1 = truly agentic/multi-step (not chatbot); Gate 2 = ≥1 non-vendor / first-person practitioner; Gate 3 = named firm + specific practice + measurable result + URL. Byline-checked.

| Firm / practitioner | Published practice | Measurable result | Gates | URL | Label |
|---|---|---|---|---|---|
| **Gofore — Juhana Harmanen (Digital Services Director)** | "AI Value Engine" operating model; **two AI-assisted experts (tech PM + architect)** run a 30-service slice of the **City of Helsinki** ~80-digital-service portfolio with a **~20-person team** | "would have required **>3× the staff**"; bottleneck has **moved from coding to decision/prioritisation** | G1 ✓ G2 ✓ (first-person, own firm + named client) G3 ✓ (named firm + named client + specific ratio; *but ratio is a claim, not an audited metric; no tool named*) | [gofore.com 1.6.2026](https://gofore.com/uutiset/tekoaly-ei-tehosta-enaa-vain-koodausta-digikehityksen-pullonkaula-on-siirtynyt-muualle/) | [practitioner direct, vendor venue] |
| **Luoto Company** (as a firm publishing on its own devs) | survey of own + peer Finnish devs; names code-gen + code-review as top systematic uses | 51.6% systematic for snippets/functions; 9.5% org-wide practice (the gap *is* the finding) | G1 ✓ G2 ✓ G3 ~ (firm-level, not a deployment) | see (a) | [survey, commercial venue] |
| **Raine Virta (Helsinki, solo)** | `workmux` — git worktrees + tmux for parallel Claude Code agents; documented atomic-commit / merge-conflict workflow | open-source tool + written workflow (no productivity metric) | G1 ✓ G2 ✓ G3 ~ (tool, not org outcome) | [raine.dev](https://raine.dev/blog/git-worktrees-parallel-agents/) | [practitioner direct] *(carried from coding-engineering.md — strongest Finnish solo-builder signal)* |
| **Futurice — Jamie Warren (Technology Principal)** | "GenAI fast-track" + Agentic-Enterprise series; job ads **require Claude Code / Cursor / multi-agent** fluency | **none** — cites Google/Microsoft/Amazon's numbers, **zero Futurice-internal metric** | G1 ✓ G2 ✗ G3 ✗ | [futurice.com 14.10.2025](https://www.futurice.com/blog/genai-fast-track-to-software-development) · [careers ad](https://careers.futurice.com/jobs/7747614-full-stack-developer-next-gen-value-streams) | [practitioner analysis] (generic thought-leadership; **fails gates** — listed to show the shape of "publishes a lot, evidences nothing") |
| **Supercell — AI Innovation Lab (Helsinki/SF/Tokyo)** | 9-week AI×games incubator, spring-2026 cohort (Mar 23–May 23), free, no equity; kickoff at Arctic Buildcamp, Lapland | builder programme — **no production agentic-coding evidence**, no metric | G1 ~ G2 ✗ G3 ✗ | [ailab.supercell.com](https://ailab.supercell.com/) · [PocketGamer.biz](https://www.pocketgamer.biz/supercell-opens-applications-for-ai-innovation-lab-programme/) | [tech press] / [vendor] (strategy signal, not deployment evidence) |

**Read:** exactly **one** Finnish software firm (Gofore) crosses all three gates with a named-client, specific-ratio, first-person published case — and even that names no tool and reports a claimed ratio, not an audited DORA delta. Everything else is either solo-builder tooling (Virta), a firm-level survey (Luoto), or publish-much-evidence-nothing thought-leadership (Futurice) and recruitment/incubator signal (Supercell). The *signal-flow* model in CLAUDE.md is visible: Finland has segment-1 solo builders (Virta) and a stirring of segment-2 firm-level reports (Gofore), but the segment-2 wave that becomes a CTO-trustable "our team tried it" is **not yet here in published form**.

---

## (c) The verdict — published vs adoption-but-unpublished vs behind

**(b) adoption-but-unpublished — confirmed and sharpened.** Three legs:

1. **Adoption is real and surveyed.** The industry's own bodies measure it: Software Finland (77% in 2023, AI↔growth correlation, 80%+ now buying AI talent), Luoto (51.6% systematic for code-gen), the Software Industry Survey (411 firms, AI = the theme). The official NACE-J cell (sibling `g-`) puts the firm-level denominator at 80%. **Use is not the gap.**

2. **The depth/discipline gap is the real story — and Finnish practitioners themselves name it.** Luoto's headline is *"benefits recognised widely, systematic use lags"*: **9.5% org-wide practice**. Gofore's Harmanen independently says the bottleneck has *moved past coding* to decision-making. This is the **competence-first thesis in Finnish practitioners' own words**: tools are in hand (80% access), organisational learning-rate is the ceiling (9.5% systematised). It mirrors the all-Nordic "embrace but don't prepare" and the BCG/Deloitte/Tieto investment-misallocation convergence in `nordic-landscape.md` — but here it is *software-sector-specific and Finnish-sourced*.

3. **The publication vacuum is structural, not incidental.** The one instrument purpose-built to produce hard, methodologically-clean Finnish coding-agent productivity numbers — **Reaktor × University of Helsinki** — has **not published**. Timeline: launched **14.2.2025** (sttinfo 70865410, researchers Kopteff/Reaktor, Kettunen + Männistö/UH, DORA metrics, Business Finland-funded); "leading companies joined" **8.7.2025** (Alma Media, RELEX, Exertus, Insol, Moment Digital, Qoco, Vuolearning; Marko Aalto/Reaktor, Pekka Horo CEO); results promised "within six months" (≈ Jan 2026). **As of 2026-06-25 no results are published.** The study that would move Finland from "(b) unpublished" toward "(a) published & evidenced" is itself the proof of the white space.

**Not (c) behind.** Nothing supports "genuinely behind." Access is EU-leading (EIB 66%, highest in EU; NACE-J 80%, above EU's 62.5%), the solo-builder layer exists (Virta), and the firm cases that do surface (Gofore) describe real agentic operating models. Finland is *adopting at or above EU software-sector rates and under-publishing the practitioner detail* — which is exactly the Bosser opening: competence and published evidence, not access, are scarce.

---

## (d) What we did NOT find / confirmed absence

- **No published Reaktor × University of Helsinki results.** 16 months post-launch, 6+ months past the promised window. **Highest-value confirmed absence** — a named, funded, DORA-based study on Finnish firms exists and has gone quiet. Watch `reaktor.com/impact-of-genai-in-software-development` and HIIT/UH publications for the drop.
- **No published practitioner coding-agent case from:** Wolt, Smartly.io, Aiven, Oura, RELEX (as an engineering org — it's a *subject* of the Reaktor study, not a publisher of its own results), Unity Finland, M-Files, Vincit, Nitor, Siili, Solita (as a coding-agent *user* — Solita publishes as an Anthropic *reseller* and on RoadCrewAO the *product*, not on its own developers' measured agent use). Site-targeted and named-engineer searches returned generic global listicles, not Finnish first-person output.
- **No Finnish dev-conference talk** on production agentic coding with metrics surfaced (the absence flagged in `coding-engineering.md` still holds).
- **No named-tool + audited-metric Finnish case.** Gofore's 3× ratio is the best we have and it is a stated claim with no tool named and no DORA/cycle-time number.
- **Community vein = founder-energy, not evidence.** Agentics Finland / Helsinki (Mikko Alasaarela + Teemu Linna; meetup #2 at Sitra 7.10.2025; Claude Code Helsinki / Symposium AI events; 200+ at Slush-week with Verda) is **vibrant but demo/networking-shaped** — no published, measured, named-firm coding-agent outcome emerged from it in these searches. Treat as **founder-marketing / direction signal**, not evidence (per the rules' single-builder caution). Antti's direct Agentics Helsinki access is the obvious primary-research channel to convert this absence into signal.
- **No N for the Sykemittari rounds** — Software Finland does not disclose respondent counts; treat its %s as directional industry-body self-report, not survey-grade.

---

## (e) Inline four-persona audit

- **Source-type:** PASS with one downgrade applied. Strongest software-specific item = Gofore [practitioner direct, vendor venue] (named exec byline, own-firm + named-client practice — operational facts count as evidence, the 3× ratio flagged as self-reported). Luoto + Software Industry Survey carry their venue labels ([survey, commercial venue] / [academic/research]). **Futurice deliberately downgraded** [practitioner analysis] and marked *fails gates* despite heavy publishing — byline check showed generic thought-leadership citing others' numbers, zero own-firm metric. Supercell labelled [tech press]/[vendor]. No L0 vendor rewrite carries a headline.
- **Zombie-stat:** PASS. Each % traced to its survey + venue. The "77%, up from 50%" is explicitly **re-dated to autumn 2023** (the round-number trap the search layer fell into) and separated from the spring-2026 round, which carries *different* metrics (80%+ talent-acquisition, not a re-measured adoption %). Luoto's 51.6% / 9.5% / 78.5% are exact, from a disclosed N=69. The Software Industry Survey's 411 / 64 / 61% carry N and definitions. The EIB 66%/37% is flagged **all-firm, not SW-cut**, used only as context.
- **Freshness:** PASS. Load-bearing items inside the 6-month window (cutoff 2025-12-25): Gofore 1.6.2026, Luoto 20.2.2026, Sykemittari spring-2026 (May 2026), Supercell spring-2026. **Dated-and-labelled:** the 2023 Sykemittari (used only to source the historical 50%→77% jump) and Futurice 14.10.2025 (used as a *negative* example). The Reaktor launch (Feb 2025) is dated but the *load-bearing claim about it is the present-tense absence of results*, which is current as of run date.
- **Evidence-ladder:** The **firm-level adoption %s = L2** (single surveys, labelled; industry-body self-report N-undisclosed for Sykemittari). The **"adoption-but-unpublished / competence-is-the-gap" verdict = L3**, by convergence: Finnish-sourced (Luoto 9.5% systematised + Gofore bottleneck-moved-past-coding) meeting the all-Nordic investment-misallocation L3 in `nordic-landscape.md` and the official 80%-access-vs-thin-depth in `g-`. The single named coding-agent case (Gofore) is **L2** (one case, specific outcome). The **non-publication of the Reaktor study is an L-undefined confirmed absence** — strong precisely because it is the instrument designed to produce the L3-grade number Finland currently lacks.
