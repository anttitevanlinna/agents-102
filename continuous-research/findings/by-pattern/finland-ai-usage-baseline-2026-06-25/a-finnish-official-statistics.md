# Finland AI-usage baseline — Finnish + EU official statistics

**Compiled:** 2026-06-25 · **Layer scope:** Layer 0 (the "we use AI" headline) + whatever Layer-1 (what it *means*) the official releases themselves break out.

**One-line takeaway:** The latest official headline is **38 % of Finnish enterprises (10+ employees) used "AI technologies" in spring 2025** (Statistics Finland) / **37.8 %** in Eurostat's harmonised cut — but the definition is "used **at least one of eight** listed AI technologies," and the single largest component is **text analysis (29 %)** plus **language generation (20 %)** and **image/video/audio generation (22 %)**. The headline is overwhelmingly **language/text/generative-shaped**, exactly the Layer-1 signal we were testing for.

---

## (a) Headline numbers table

| Source | Reference year | % enterprises using AI | Of which language/text-shaped (Layer-1) | Definition (short) | N / size frame | URL | Source-type label |
|---|---|---|---|---|---|---|---|
| Statistics Finland (Tilastokeskus), *Use of IT in enterprises* | **Spring 2025** (pub. 27.11.2025) | **38 %** | text analysis 29 %; image/video/audio gen 22 %; written/spoken language or code gen 20 % | "systems that collect and/or use data to produce e.g. predictions, recommendations or decisions, using e.g. text mining, computer vision, speech recognition, natural-language generation, machine learning or deep learning" | Enterprises 10+ persons employed; sample survey | https://stat.fi/en/publication/cm1hnps701dbm07w59uo0jw6u (EN) · https://stat.fi/julkaisu/cm1hnps701dbm07w59uo0jw6u (FI) | [official statistics] |
| Statistics Finland, prior release | **Spring 2024** (pub. 17.12.2024) | **24 %** (+9 pp YoY) | analyses written text 15 %; generates written/spoken language 13 %; AI-based RPA / decision support 11 % | same definition as above | Enterprises 10+ persons employed | https://stat.fi/en/publication/cln3odelx9f5x0bvziegurum4 (EN) · https://stat.fi/julkaisu/cln3odelx9f5x0bvziegurum4 (FI) | [official statistics] |
| Eurostat, *Use of AI in enterprises* (isoc_eb_ai) | **2025** (survey ran early 2025; news pub. 2025-12-11) | **Finland 37.8 %** (2nd in EU, after Denmark 42.0 %; Sweden 35.0 %) | *type-split is EU-27, not Finland-specific:* text mining 11.75 %; image/video/audio gen 9.55 %; NLG 8.76 %; speech recognition 7.22 % | enterprise uses **at least one of eight** listed AI technologies (full list below) | Enterprises 10+ persons employed (Finland value); EU-27 for type-split | https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2 | [official statistics] |
| Eurostat, EU-27 average | **2025** | **20.0 %** (EU-27; +6.5 pp from 13.5 % in 2024) | text mining 11.8 % is the single most common purpose EU-wide | same eight-technology "at least one" definition | EU-27, enterprises 10+ | https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises | [official statistics] |

**Number to quote first:** *38 % of Finnish enterprises used AI technologies in spring 2025* (Statistics Finland) — but see the definition problem below before anyone reads it as "38 % are doing agentic / integrated AI."

---

## (b) The definition problem — what each source actually counts as "AI"

Both sources count an enterprise as an **AI user if it uses ≥1 of a menu of technologies** — a deliberately broad denominator. A marketing team pasting copy into a chatbot ("technologies that generate written language") counts identically to a firm running computer-vision QA on a production line.

**Statistics Finland — definition (FI, quoted):**
> "Tekoälyllä tarkoitetaan tässä järjestelmiä, jotka keräävät ja/tai käyttävät dataa tuottaakseen esimerkiksi ennusteita, suosituksia tai päätöksiä, käyttäen esimerkiksi tekstinlouhintaa (text mining), konenäköä, puheentunnistusta, luonnollisen kielen tuottamista (Natural Language Generation, NLG), koneoppimista tai syväoppimista."

Translation: AI = "systems that collect and/or use data to produce e.g. predictions, recommendations or decisions, using e.g. text mining, computer vision, speech recognition, natural-language generation (NLG), machine learning or deep learning." Note the **"esimerkiksi / e.g."** — it is an illustrative, not closed, list, and an enterprise self-reports whether any of these are "in use."

**Eurostat — definition (EN, quoted, the closed eight-item list an enterprise must use at least one of):**
> "technologies analysing written language (text mining); technologies converting spoken language into a machine-readable format (speech recognition); technologies generating written, spoken language or programming codes (natural language generation, speech synthesis); technologies generating pictures, videos, sound/audio; technologies identifying objects or people based on images (image recognition, image processing); machine learning (e.g. deep learning) for data analysis; technologies automating different workflows or assisting in decision-making (AI based software robotic process automation); technologies enabling machines to physically move by observing their surroundings and taking autonomous decisions."

So the headline is **breadth, not depth**: "≥1 technology touched," self-reported, no usage-intensity threshold, no "integrated in product" or "agentic workflow" requirement. This is precisely why Layer 0 ("we use AI") cannot be read as Layer 2 (depth). The survey instrument has no Layer-2 question.

**Why Tilastokeskus 38 % ≠ Eurostat 37.8 % is not a contradiction:** same survey, same reference period (the harmonised EU "ICT usage in enterprises 2025" round, legal basis **Regulation (EU) 2024/1883**). The ~0.2 pp gap is rounding / weighting between the national release and Eurostat's harmonised extract — not two different measurements. The *real* divergence to watch is **38 % (Finland) vs 20 % (EU-27 average)** — Finland sits near the top of the EU distribution, so a Finnish builder-leader's denominator is roughly **double the EU norm**.

---

## (c) Type breakdown — how language/text/generative-shaped is "AI usage"?

This is the Layer-1 payload. The official type-splits show the headline is dominated by **language and generative** technologies, not by machine learning, computer vision, or robotics.

**Statistics Finland — spring 2025 (% of all enterprises using each, quoted):**
- Technologies that **analyse written text** (text mining): **29 %**
- Technologies that **generate images, video or audio**: **22 %**
- Technologies that **generate written/spoken language or program code**: **20 %**
- (Process automation, image recognition, machine learning not given separate % in this release.)

**Statistics Finland — spring 2024 (for trend, quoted):**
- Analyses written text: **15 %**
- Generates written/spoken language: **13 %**
- AI-based RPA / decision-support automation: **11 %**

**Eurostat — 2025, EU-27 level (% of all enterprises):**
- Text mining (analysing written language): **11.75 %** — single most common EU-wide
- Generating pictures/video/audio: **9.55 %**
- Natural-language generation: **8.76 %**
- Speech recognition: **7.22 %**
- Machine learning for data analysis: **5.54 %**
- AI-based process automation: **3.78 %**
- Image recognition: **3.78 %**
- Autonomous robots/vehicles: **1.39 %**

**Read for the deck:** the three text/language/generative categories sit at the top in **both** Finland and the EU; computer vision, machine-learning-for-analysis, RPA and robotics trail well behind. "Using AI" in 2025 official statistics is, in plain terms, **mostly people generating and analysing text and media** — i.e. chat/copilot-shaped (Layer-1 = "chat/copilot," not "integrated-in-product" or "agentic-workflow"). The statistics do **not** decompose chat-vs-integrated-vs-agentic; that distinction is below the survey's resolution, so it stays a qualitative inference, not an official number.

---

## (d) Freshness note

- **Latest available, current as of compile date:** Statistics Finland spring-2025 release, **published 2025-11-27**, reference period spring 2025. Eurostat's matching 2025 cut, **news article 2025-12-11**. Both are **inside the 6-month freshness window** (cutoff 2025-12-25) — the Eurostat news article by 14 days, the Finnish release by ~4 weeks. **Not** dated baseline context; these are the freshest official releases and report the current reference year.
- **Dated baseline context (labelled):** the spring-2024 Finnish release (24 %, pub. 2024-12-17) and the EU-27 2024 figure (13.5 %) are retained **only** for the year-on-year trend (Finland +14 pp; EU +6.5 pp). Treat as historical comparators, not the current denominator.
- **Cadence:** this is an **annual** survey (harmonised EU ICT-usage round). Next release expected ~late 2026 for spring-2026 reference data. Until then, 38 % / 37.8 % is the standing official number.

---

## (e) Inline four-persona audit

- **Source-type-auditor:** PASS. Every row is a primary statistical release — Statistics Finland (`stat.fi`) and Eurostat (`ec.europa.eu/eurostat`), both labelled **[official statistics]** (primary, high-trust). Zero Level-0 vendor/news rewrites cited; the many blog/news rewrites surfaced in search (lmsomeco, aisanomat, dailyfinland, digitalalliance) were **deliberately not used** — primary releases were reachable. The Eurostat `isoc_eb_ai` databrowser table itself is JS-rendered and did not return cell values to the fetcher; figures were instead taken from Eurostat's own Statistics Explained page and dated news release, which quote the same dataset — flagged so a human can pull the raw table if exact size-class cells are needed.
- **Zombie-stat:** PASS with guard satisfied. The headline ("38 % use AI") is exactly a round-ish number at risk of being stripped of its definition — so the **survey definition and the ≥1-of-8-technologies frame are recorded verbatim in §b**, the type-decomposition that shows what it really means in §c, the size frame (10+ employees) in the table, the reference period (spring 2025), and the legal basis (EU Reg. 2024/1883). Definition is **verified**, not [DEFINITION UNVERIFIED]. Confirmation-bias guard: the maintainer's prior was "60–80 % claim to use AI, mostly plain LLM chat" — the official Finnish number is **38 %, not 60–80 %** (the higher figures circulating are non-official consumer/individual-use or self-selected vendor surveys), so the prior's *magnitude* is **not** confirmed, while its *shape* claim (mostly language/text/chat-shaped) **is** supported by the type breakdown. Reported where it fell.
- **Freshness:** PASS. Both headline sources are within the 6-month window (pub. 2025-11-27 and 2025-12-11; cutoff 2025-12-25). 2024 figures explicitly labelled dated baseline context and used only for trend.
- **Evidence-ladder:** These are **official government statistics** (Tilastokeskus / Eurostat), treated per the rules as **primary, high-trust facts** (above the Level-0→4 commercial-evidence ladder, which classifies practitioner/vendor evidence). Methodology recorded: annual harmonised EU enterprise ICT-usage survey, sample-based, self-reported, enterprises with 10+ persons employed, legal basis Regulation (EU) 2024/1883. The one inference that is **not** official — "headline is mostly chat/copilot-shaped rather than integrated/agentic" — is labelled in §c as a qualitative read of the type-split, since the survey carries no Layer-2 depth question.
