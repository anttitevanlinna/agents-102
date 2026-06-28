---
type: finding
domain: coding-engineering
evidence_level: 2
platforms: [github-copilot, cursor, claude-code, codex]
practitioners: [Spotify, Klarna, Visma, "NAV IT", "Humlum/Vestergaard (Denmark study)", CCP/Fenris]
nordic: true
scope: "Sweden, Norway, Denmark, Iceland (Finland covered by sibling agent — excluded here)"
updated: 2026-06-25
answers:
  - "is there public evidence of agentic software-engineering adoption at non-Finnish Nordic companies?"
  - "has any non-Finnish Nordic company published a measured engineering-throughput number?"
  - "is the Nordic signal absence 'no adoption' or 'adoption but unpublished'?"
  - "do Klarna's public AI-productivity claims hold up as software-engineering throughput evidence?"
---

# Non-Finnish Nordic — Public Evidence of Agentic Software-Engineering Adoption

**Evidence level:** Level 2 (mostly single-org cases + 2 independent academic studies; NOT a convergence) | **Last updated:** 2026-06-25 | **Scope:** Sweden, Norway, Denmark, Iceland. Finland excluded (sibling agent). Spotish +76% PR figure already documented in `b-practitioner-gains-convergence.md` — new Spotify items noted, not re-documented.

**One-line verdict:** Outside Spotify, the non-Finnish Nordic landscape is **"adoption is real but engineering-throughput numbers are barely published, and the two independent measured numbers that DO exist are null-to-tiny."** Only **Spotify** has a citable practitioner-direct throughput number. **Klarna has published NO software-engineering throughput number** — its loud AI claims are CEO-personal vibe-coding or customer-service AI (out of scope). The most rigorous Nordic engineering-AI evidence is **counter-evidence**: an independent University of Oslo / SINTEF study of **NAV IT** found *no statistically significant* commit-activity gain from Copilot, and the Humlum/Vestergaard Denmark labor study found **~3% time saved** for AI users (devs among them).

Bucket legend: **(a)** published a productivity number · **(b)** documented adoption/practice, no number · **(c)** individual practitioners posting · **(d)** silent (where I looked).

---

## SWEDEN

### (a) Published a productivity number

- **Spotify (Stockholm)** — already in the thread; not re-documenting +76% PR freq / 94% more-productive / >99% weekly use. **New operational number worth adding:** Honk (Claude Agent SDK background agent) hit **1,000 merged PRs in 3 months, now reaches that same 1,000 merged PRs every ~10 days** (≈9× cadence acceleration); deterministic scripts had already cut 70% of migrations from ~1yr to <1 week, Honk targets the hard 30% to 100%. Speakers **Jo Kelly-Fenton & Aleksandar Mitic**, QCon London 2026 (2026-03-18). PR review (not generation) named as the new bottleneck. URL: [infoq.com/news/2026/03/spotify-honk-rewrite](https://www.infoq.com/news/2026/03/spotify-honk-rewrite/) + [engineering.atspotify.com Honk Part 4](https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4). Label: **[practitioner direct, vendor venue]** (conference talk + own eng blog). Date: 2026-03/04. **Level 2** (single org; the bottleneck-shift corroborates the absorption pattern).

### (b) Documented adoption / practice, no engineering number

- **Klarna** — CEO **Sebastian Siemiatkowski** publicly pushes Cursor company-wide ("download Cursor, pay the license, push in an idea"); says he personally vibe-codes prototypes in ~20 min that "once took weeks." This is **CEO-personal prototyping, NOT engineering-org throughput.** URLs: [fortune.com vibe-coding](https://fortune.com/2025/09/15/klarna-google-ceo-vibe-coding-skill-get-a-job/), [upstartsmedia IPO interview](https://www.upstartsmedia.com/p/klarna-ceo-ipo-interview) (paywalled body). Label: **[general press / exec statement]**. Date: **2025-09 (IPO week) — outside 6-month window; dated anecdote, not current evidence.** **Level 1** (opinion/anecdote). **THE KLARNA TRAP — see verdict box below.**

### (c) Individual practitioners posting
- None located with named output + tool + practice meeting the three gates. (Klarna engineers do not appear to publish engineering-AI throughput; the public Klarna AI voice is the CEO and PR.)

### (d) Silent (where I looked)
- **Ericsson** — no engineering-AI throughput post or talk found. Large org, plausible Copilot rollout, **unpublished**.
- **Truecaller, Tink, Epidemic Sound, Northvolt, King/Candy Crush, Mojang, Voi, Kry/Livi, Einride** — searched engineering-blog + people + conference angles; **no public engineering-AI adoption/number** surfaced for any. (Northvolt also distressed/restructured, low signal expectation.)

---

## NORWAY

### (a) Published a productivity number — and it's the most important Nordic data point

- **NAV IT** (engineering arm of Norway's Labour & Welfare Administration; ~250 Copilot users by May 2025) — **independent longitudinal study** by **Viktoria Stray, Elias Goldmann Brandtzæg, Viggo Tellefsen Wivestad, Astri Barbala, Nils Brede Moe** (University of Oslo + SINTEF — *external researchers, not NAV employees*). 26,317 commits / 703 repos over 2 years; 25 Copilot users vs 14 non-users + 13 interviews. **Finding: NO statistically significant change in commit-based activity after Copilot adoption** (code additions ~188→200 lines/wk; perceived-vs-actual productivity correlation negligible, ρ≈0.17, p=0.40). Copilot users were already more active *before* adopting. v2 abstract surfaces a "26% more completed tasks" framing in places, but the core measured commit-activity result is null — the gap between *felt* and *measured* productivity is the paper's headline. URL: [arxiv.org/abs/2509.20353](https://arxiv.org/abs/2509.20353) / [html v2](https://arxiv.org/html/2509.20353v2) / [ResearchGate 395806676](https://www.researchgate.net/publication/395806676_Developer_Productivity_With_and_Without_GitHub_Copilot_A_Longitudinal_Mixed-Methods_Case_Study). Label: **[academic/research]**. Date: **2025-09 — OUTSIDE the 6-month freshness window (pre-2025-12-25); cited as dated independent evidence, not a current-month signal.** Academic studies don't expire like product news, but the date is flagged per the freshness rule. **Level 2 single rigorous case → strong counter-evidence.** This is the cleanest Nordic engineering-AI measurement and it is *null-to-modest*, directly echoing the absorption-bottleneck / ~10%-outcome cluster.

- **Visma (Oslo)** — Microsoft Customer Story claims developers ship **"new code up to 50% faster"** with GitHub Copilot + Azure DevOps. **FLAG: vendor-marketing venue (Microsoft customer story); the 50% is vendor-self-reported, no methodology.** The *durable, more-credible* fact from the same source set: adoption arc **5–7% → "nearly every technical employee uses AI-assisted coding daily,"** AI Director **Jacob Nyman** named, devs also using Cursor + Windsurf, central AI team driving non-mandated adoption. URLs: [microsoft.com Visma story](https://www.microsoft.com/en/customers/story/1774868194783832907-visma-visual-studio-professional-services-en-norway) (the 50% — **[vendor case study — NOT EVIDENCE for the number]**), [techzine.eu Nyman interview](https://www.techzine.eu/blogs/applications/134709/visma-turns-ai-from-hype-to-value-for-business-software/) (adoption facts — **[tech press relaying exec statement]**: journalist Berry Zwets on AI Director Jacob Nyman. Per byline check, this is an exec-interview write-up, NOT practitioner-builder analysis — Nyman is leadership, so the adoption arc is exec-attested, not independently measured; no productivity number in this one). Date: 2026. **Adoption = Level 2; the 50% number = Level 0/L1, do not cite as measured throughput.**

### (b) Documented adoption / practice, no number
- **Cognite, Schibsted, DNB, Equinor** — broadly cited as active AI/tech employers (DNB fintech lab; Equinor/Cognite industrial AI), but **industrial/data AI, not coding-agent engineering throughput**. No engineering-AI-adoption post or number located.

### (c) Individual practitioners posting
- None meeting the gates located by name. (Norwegian academic practitioners — Stray et al. — are the ones publishing, via the NAV study, which is the (a) entry above.)

### (d) Silent (where I looked)
- **Equinor, Cognite, Kahoot, Gelato, Schibsted, DNB, Remarkable** — no public engineering-AI throughput number or named-practitioner adoption write-up. Equinor/Cognite signal is operational/industrial AI, not coding agents.

---

## DENMARK

### (a) Published a productivity number — independent, and low

- **Humlum (U. Copenhagen) & Vestergaard (U. Chicago)** — "Large Language Models, Small Labor Market Effects" (2025). Administrative payroll data, **~25,000 employees / ~7,000 firms / 11 occupations including software developers**. AI users saved **~3% of time on average (~1 hr/week)**; negligible wage/hours effects. Not company-specific, but it is **Danish, independent, large-N, and includes devs** — and it points the same direction as NAV. URL: [bfi.uchicago.edu BFI_WP_2025-56](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-1.pdf), coverage [fortune.com](https://fortune.com/2025/05/18/ai-chatbots-study-impact-earnings-hours-worked-any-occupation/). Label: **[academic/research]**. Date: **2025-Q2 — OUTSIDE the 6-month freshness window; cited as dated independent context.** **Level 2/3** (large-N labor study; broad-tool, not coding-agent-specific — strong caveat: it measures ChatGPT/chatbot exposure across occupations, NOT agentic-IDE engineering throughput, so it under-reads coding-agent gains; use as a directional sanity-check on the skeptical side, not as a coding-agent number).

### (b) Documented adoption / practice, no number
- None located with a named Danish company + coding-agent practice.

### (c) Individual practitioners posting
- None located meeting the gates.

### (d) Silent (where I looked)
- **Maersk / A.P. Moller, Pleo, Trustpilot, Zendesk (CPH origin), Unity (CPH), Lunar, Templafy, Universal Robots, Netcompany** — **no public software-engineering-AI throughput number or named-practitioner adoption post** for any. Maersk has a large eng org and an internal-developer-platform posture, but nothing public on coding-agent throughput. Zendesk/Universal Robots public AI is *product* AI (support agents / robotics), not their own engineering throughput.

---

## ICELAND

### (d) Silent (where I looked)
- **CCP Games → renamed Fenris Creations (2026-05), now independent + Google DeepMind research partnership** — AI work is *in-game* (NLP moderation, RL NPCs, recommendation/economy), **not coding-agent engineering productivity**. No engineering-throughput number. Other Icelandic firms: nothing surfaced. Iceland = effectively silent on agentic software-engineering throughput, as expected.

---

## What corroborates / contradicts the global thread

- **NAV IT (null) + Denmark/Humlum (~3%)** independently echo the absorption-bottleneck finding and the **~10%-or-less org-outcome cluster** from `c-ceiling-counter-evidence.md` / `absorption-bottleneck.md`. Two independent Nordic measured results land at *modest-to-null*, NOT 4–8X. This is valuable: the Nordic signal that DOES exist is on the **skeptical** side of the deck number.
- **Spotify (Honk, 1,000 PRs/10 days) + Visma (adoption 5%→~universal)** corroborate the *adoption is real and accelerating* layer — and Spotify's "review is the new bottleneck" line independently restates the absorption-bottleneck mechanism.
- **Klarna** is a textbook **announcement≠deployment + exec-inflation** case for the engineering claim specifically.

---

## THE KLARNA VERDICT (apply the trap-guard)

Klarna's loud public AI numbers are **NOT software-engineering throughput**: the famous figures — internal assistant "Kiki," "AI does the work of 700/853 agents," "$40M profit improvement," "90% of staff use AI daily" — are **customer-service / internal-assistant AI (OUT OF SCOPE)** and **earnings-call / press-release framing** ([general press / exec statement] + [vendor press release]). On *software engineering* specifically, the only public Klarna signal is the **CEO personally vibe-coding prototypes in Cursor** — an anecdote, **Level 1**, not an engineering-org throughput measurement. **Klarna has published ZERO citable engineering-throughput number.** Anyone putting "Klarna" on a coding-productivity slide is importing customer-service automation claims or CEO theater. Flag and exclude.

---

## VERDICT

**Is the non-Finnish Nordic absence "no adoption" or "adoption but unpublished"?** → **Adoption but unpublished.** Adoption is clearly real and broad (Spotify production-scale; Visma 5%→near-universal; NAV 250 Copilot seats; Klarna CEO evangelizing Cursor; the whole region inside the 80%+ developer-adoption baseline). What is **absent is the published, measured engineering-throughput number**, not the adoption itself. Outside Spotify, Nordic companies are using these tools and **not blogging the metrics** — the classic enterprise pattern (do it quietly, don't publish what the competitor could copy or what legal would rather not certify).

**Has any non-Finnish Nordic company published a citable engineering-throughput number?** → **Only Spotify** (practitioner-direct: +76% PR freq already in thread; Honk 1,000 merged PRs/10 days, new). Beyond Spotify, the two citable Nordic *engineering* numbers are **independent academic studies and they are null-to-tiny**: **NAV IT — no significant commit-activity gain** (UiO/SINTEF, the strongest Nordic case, and it's counter-evidence) and **Denmark/Humlum — ~3% time saved** (broad-tool, devs included). Visma's "50% faster" exists but is **vendor-marketing self-report (Microsoft customer story), not admissible as a measured number.**

**Net for the deck:** The honest non-Finnish Nordic story is **one production-scale published winner (Spotify), one quiet broad adopter (Visma), and the region's most rigorous engineering measurement (NAV IT) showing the gain is felt-but-not-measured.** That is a *more* useful slide than a 4–8X claim: it says the Nordics are adopting fast, the credible published numbers are modest, and the loudest Nordic AI brand (Klarna) has no engineering number at all.
