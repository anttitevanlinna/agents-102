# Finland — agentic software-engineering adoption: public signal scan

**Thread:** productivity-gains-2026-06-25 · **Scope:** Finland · **Run date:** 2026-06-25
**Question under test:** the leader's hunch — Finnish firms (Relex, F-Secure et al.) are "far on their journey" but simply haven't PUBLISHED. Is the Finnish absence "no adoption" or "adoption but unpublished"?

**Bucket key:** (a) PUBLISHED a productivity number · (b) DOCUMENTED adoption/practice, no number · (c) INDIVIDUAL practitioners posting, not company-level · (d) SILENT — no public agentic-engineering signal found.

**Method note:** Followed people, not topics. General web search for "[Finnish company] + Claude Code / Cursor" returns almost pure SEO comparison spam (truefoundry, cosmicjs, faros, mindstudio, etc.) — zero company-level signal. The productive vein was the **Agentics Finland / Symposium AI / Claude Code Helsinki meetup community**, which surfaces named practitioners and their employers. Throughout I separated *product AI* (the company ships AI features) from *agentic software ENGINEERING* (the company's own engineers build with coding agents) — the mission is the latter. Most Finnish "AI" signal is the former.

---

## Solita (consultancy, Helsinki) — bucket (a), but STALE and vendor-self-reported

The one Finnish case with named people, a measured methodology, and published numbers — and it largely fails the freshness gate.

- **The "GenAI Twin Project":** Solita + ISS Palvelut (facility-management firm) ran two parallel teams building the same digital solution — one classic agile, one "leveraging generative AI tools in all stages." University of Turku academic partner (master's thesis). Named: Ossi Lindroos (CEO), Lasse Girs (Head of GenAI Enablement), Sami Köykkä (Senior Consultant), Marko Taipale (Principal Consultant); Jenni Heinisuo (ISS CIO), Sami Öfverberg (ISS Head of AI Tech Dev).
  - Setup announcement: https://www.solita.fi/news/solita-and-iss-research-project-how-does-genai-change-the-future-of-software-development/ — [vendor press release] (corporate `/news/` post, no individual byline) — **published 2024-05-15, project completed 2024-09**.
  - Results write-up: https://www.solita.fi/work/breaking-new-ground-in-software-development-with-ai-powered-collaboration/ — [vendor case study] — Solita's own marketing of its own project.
- **Published numbers** (from the results page / secondary coverage): "100× faster prototyping" (40 prototypes/hour), "500× faster decision-making" (a decision every 5 min), "90% fewer meetings," non-technical staff contributing in 1 day.
- **Three hard caveats — do NOT cite these as evidence of a current Finnish engineering gain:**
  1. **STALE.** Published May 2024, completed Sept 2024 — ~20 months old, well outside the 6-month freshness window (since 2025-12-25). Dated historical context only.
  2. **ZOMBIE-SHAPED round numbers.** 100×, 500×, 90% are round multipliers with **no disclosed methodology or sample** on the published pages → treat as [UNVERIFIED STAT]. And they measure *prototyping / decision cadence / meeting count*, not shipped production-engineering throughput. The primary 2024 announcement carried NO numbers; the numbers appear only in the later marketing write-up.
  3. **Tooling is 2024-era and unconfirmed.** Secondary coverage names OpenDevin / Devika / "GPT+ assistants" — genuinely agentic for their day, but not the 2026 Claude Code / Codex / Cursor frontier the deck is about. The primary Solita pages don't even name the tools.
- **Entanglement flag:** the Twin Project → "CollabAI" book → "Agion Pattern" lineage ties Marko Taipale's framing to Mikko Alasaarela's **Agion** commercial platform (below). This is a consultancy/vendor narrative, not an independent practitioner report.

**Verdict on Solita:** technically bucket (a) — a named Finnish firm did publish numbers — but stale, methodology-free, prototyping-not-shipping, and vendor-self-reported. Useful as "Finland was experimenting publicly in 2024," NOT as a current citable productivity figure.

## Agentics Finland / Mikko Alasaarela / Agion — bucket (c)/(b), vendor pitch, no engineering number

- **Agentics Finland** is the most active Finnish frontier-AI community: meetup #1 (~200 registrations, 60 in person), #2 (Oct 7 2025, Sitra, 180 registered, 600 wanted in), #3 the "Slush Edition" (Nov 18 2025), WhatsApp community 1,650+. Organizer Mikko Alasaarela. Sources: https://luma.com/fsj7j1dn , https://luma.com/g3sdjm0n , https://www.linkedin.com/posts/alasaarela_agentics-finland-yhteis%C3%B6n-toinen-tapahtuma-activity-7381282908419907584-hH4F — [practitioner direct], 2025-10/11.
- **Alasaarela / Agion** ("operating system for AI-native organizations," https://agion.ai/). His public claims: an "enterprise-grade, GDPR/AI-Act-compliant platform representing multi-year work of dozens of developers, built in a few months with swarms of AI agents"; "scale productivity 10×." Sources: https://www.linkedin.com/posts/alasaarela_i-spoke-at-the-inaugural-meetup-of-the-agentics-activity-7368868093009313792-43jK ([practitioner direct] — his own LinkedIn) , https://theshift.fi/news/how-to-build-an-ai-native-organization-mikko-alasaarelas-vision-for-the-future/ ([practitioner analysis] / [tech press] — SHIFT journalist profile, not Alasaarela's byline) — 2025.
  - **NOT EVIDENCE for the deck.** Founder marketing his own platform. The "multi-year-work-in-a-few-months" and "10×" are unmethodologied round-number vendor claims → [UNVERIFIED STAT], Level 0–1. No independent corroboration, no measured engineering throughput, no specifics on tool/PRs/cycle time.
- **The community is the signal, not the claims.** The single most likely vein for genuine Finnish frontier practice — but its public output is event logistics and founder vision, not measured engineering case studies. Demo slots exist; demos aren't written up publicly.

## Claude Code Helsinki / Symposium AI / AaltoAI — bucket (b), thin

- Real, recurring Helsinki coding-agent community: "Claude Code Meetup Helsinki" (Dec 18 2025, hosts Héctor Tortosa & Tuomas Lounamaa, Anthropic-supported), "Coding Agents with Symposium AI × AaltoAI" (May 2026, Founders House, sold-out panel), "Helsinki Claude Cowork" (Apr 27 2026). Sources: https://luma.com/3dgkyp8s , https://www.symposiumai.net/ ([practitioner direct] — community event pages) , https://events.coinpedia.org/helsinki-claude-cowork-for-everyone-8476/ ([tech press] — event-listing aggregator, attendance/existence facts only) — 2025-12 → 2026-05.
- **Documents that Finnish builders are actively using Claude Code** (lightning talks "real examples of building with Claude," open demos, sold-out crowds) — but no named company, no engineer attribution, no number survives into the public record. Adoption is visible; measurement is not published.

## Root Signals / Invinite / Verda(DataCrunch) / Solita panelists — bucket (c)

Named Finnish AI practitioners who appeared at Agentics #3 (Nov 2025): Oguzhan Gencoglu (Head of AI, Root Signals — Helsinki LLM-eval startup), Eevamaija Virtanen (co-founder/lead data engineer, Invinite; founder of Helsinki Data Week), Arturs Polis (CTO, Verda/DataCrunch — Finnish GPU infra), Marko Taipale (Solita). Source: https://luma.com/g3sdjm0n — [practitioner direct], 2025-11-18.
- These are individuals visibly in the agentic space, but **no public artifact ties any of them to a measured coding-agent engineering gain at their company.** Root Signals' public output is about LLM *evaluation* (Root Judge open model), not about their own engineers' coding-agent throughput. Bucket (c) at best.

## Priority targets — SILENT, bucket (d)

For each below I searched: company engineering blog, Medium/dev.to, named-engineer X/LinkedIn/GitHub, conference talks, meetup appearances. No PUBLIC agentic-software-ENGINEERING signal found.

- **Relex Solutions** — (d) for engineering; abundant signal for the WRONG thing. Relex publishes heavily on *AI inside its product* (multi-agent supply-chain optimization, "Rebot" gen-AI assistant, agentic/generative/specialized AI taxonomy) — https://www.relexsolutions.com/relex-and-ai/ , careers/tech blog exists. **Zero public evidence of Relex engineers using Claude Code/Cursor/Codex to build software, and zero measured engineering gain.** The leader's specific hunch about Relex is not confirmable from public sources — product-AI maturity ≠ coding-agent adoption.
- **F-Secure / WithSecure** — (d). PUBLIC sources only (per hard constraint — no internal/training material touched). No engineering blog post, conference talk, or named-engineer public post on coding-agent adoption or a measured gain surfaced. Silent in public.
- **Wolt** — (d). Active tech blog (careers.wolt.com/en/blog) but content is career stories + stack posts (Kotlin/Python/Scala/React/K8s); no coding-agent adoption or productivity post found.
- **Supercell** — (b), but product-side. Stated AI strategy pillar "give our people superpowers — accelerate development through code-gen + CI/CD automation" (Otto Söderlund, AI lead, via PocketGamer/AIandGames coverage); the AI Innovation Lab (ailab.supercell.com) is about *incubating AI-games founders*, not internal engineering tooling. Documented intent, **no engineering throughput number, company-PR-framed** → weak (b).
- **Smartly.io** — (d). Only adjacent signal is ex-CPO Otto Hilska now running Swarmia (which *measures* AI-coding productivity) — that's Swarmia, not Smartly. Smartly itself: silent.
- **Reaktor, Futurice, Aiven, M-Files, Oura, Silo AI (AMD), Unity Helsinki, OP Financial, Nordea, Elisa, Vaisala** — (d). No public agentic-engineering signal found. (M-Files publishes Microsoft 365 Copilot *product* integration — not engineers coding with agents. Silo AI public output is research/lab, not coding-agent practice.)

---

## VERDICT

**The Finnish absence is mostly "adoption-but-unpublished," with a thin layer of genuine no-public-signal — and crucially, almost NO published, current, citable engineering productivity number.**

Three things are simultaneously true:

1. **Adoption is real and visible at the community level, but undocumented at the company level.** Helsinki sustains multiple recurring coding-agent communities (Agentics Finland 1,650+ members; Claude Code Helsinki; Symposium AI × AaltoAI sold-out) with sold-out crowds doing live demos through 2025–2026. Finnish engineers are demonstrably using Claude Code/Cursor. That practice almost never converts into a written, attributed, measured public case study. So for Relex, F-Secure, Wolt, et al., "silent in public" is the honest read — and the leader's hunch (using it, not publishing it) is *plausible* but **unprovable from public sources**. We cannot confirm Relex/F-Secure are "far on their journey"; we can only confirm we found no public evidence either way.

2. **The only Finnish firm that PUBLISHED numbers is Solita — and the citation is weak:** ~20 months stale (May/Sept 2024), round-number metrics with no disclosed methodology ([UNVERIFIED STAT]), measuring prototyping/decision-cadence rather than shipped engineering throughput, 2024-era tooling (OpenDevin/Devika), and entangled with a vendor (Agion) narrative. **Do not put a Solita "100×" number in a 2026 productivity deck.**

3. **No Finnish company has published a clean, current, methodologically-sound coding-agent engineering productivity number.** Unlike the global set (Spotify/Cloudflare/Anthropic/Faire/Every/Intercom/Ramp), Finland offers no bucket-(a) citation that survives the freshness + zombie-stat gates. The Agion/Alasaarela "10×" and "multi-year-in-months" claims are founder marketing (Level 0–1), not evidence.

**Net for the deck:** Treat Finland as a *white space*, not a *proof point*. The strongest honest framing is "Finnish engineers are visibly adopting coding agents (live community evidence) but the country has not yet produced a published, measured engineering case — the published productivity numbers all come from outside the Nordics." If the leader wants a Finnish proof point, the move is to CREATE one (instrument a team, publish the number) rather than cite one — the gap is publication, not practice. A confirmed clean "no current public number found in Finland" is itself the reportable finding.
