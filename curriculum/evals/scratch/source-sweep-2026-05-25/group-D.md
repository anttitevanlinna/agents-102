# Source sweep — Group D (AE101 supplementaries + module bodies)

Auditor pass: 2026-05-25. Cwd: /Users/anttitevanlinna/Projects/agents-102. Window: evidence on/after 2025-11-25 = current.

Files audited (6):
- supplementary/clean-code-is-steering.md
- supplementary/how-the-best-do-ci-cd.md
- supplementary/what-is-agentic-engineering.md
- earn-the-trust.md
- getting-going.md
- plan-mode-done-right.md

Watch-list note: Mata v. Avianca, Deloitte AU refund, and Pocock grill-me skill do NOT appear in any Group-D file. Ronacher 2025/6/12 DOES appear (clean-code maintainer block) — verified + flagged STALE below.

---

## FILE: how-the-best-do-ci-cd.md (12 cited sources — the load-bearing file)

### 1. Klaassen — Compound Engineering (line 11, 83, 142)
- Body claim: "Klaassen at Every named the loop. Each unit of engineering work should make the next one cheaper. The mechanism lives in the artifacts the next agent reads — rules files, skill files, AGENTS.md."
- URL: https://every.to/source-code/compound-engineering-the-definitive-guide
- Verdict: **CAVEAT** — `[practitioner direct, vendor venue]` L1.
- Findings: Author Kieran Klaassen, pub 2026-02-09 (in window). Source confirms the core framing verbatim: "each unit of engineering work should make subsequent units easier—not harder." BUT the source does NOT spell out the artifact mechanism (rules files / skill files / AGENTS.md) the body's second sentence attributes to it. The maintainer Pass-2.1 log already knows this (softened M1 to "named the loop"; moved the concrete mechanism to Move 5 / Shapira+Larson). Residual: the sentence "The mechanism lives in the artifacts the next agent reads" still reads as Klaassen's when it is the supplementary's synthesis. Acceptable as-is given Move 5 carries the mechanic, but if tightening, attribute the artifact sentence to the piece's own synthesis, not Klaassen.
- `[checked:2026-05-25 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] "each unit of work makes the next cheaper" verified verbatim; artifact-mechanism is supplementary synthesis, not in source. fallback: drop the artifact-mechanism sentence or mark it as the piece's gloss.

### 2. Cursor Bugbot (line 13, 84, 143)
- Body claim: "Resolution rate climbed from 52% to around 80% as the rule corpus grew across 110,000 repos to 44,000 learned rules."
- URL: https://cursor.com/blog/bugbot-learning
- Verdict: **OK** — `[practitioner direct, vendor venue]` L0/L1; metrics vendor-self-reported (flagged inline as "Cursor's own numbers").
- Findings: Author Michael Zhao, pub 2026-04-08 (in window). All four numbers verified verbatim: "52% of the bugs... resolved" (July 2025) → "nearing 80%"; "more than 110,000 repos have enabled learning, generating more than 44,000 learned rules." Promote/demote mechanism confirmed. Self-reported caveat correctly handled in maintainer block.
- `[checked:2026-05-25 result:OK due:2026-08-08]` https://cursor.com/blog/bugbot-learning — [practitioner direct, vendor venue] 52%→~80%, 110K repos, 44K rules all verified verbatim; vendor-self-reported, flagged inline. fallback: none.

### 3. Cloudflare AI code review (line 21, 85, 144)
- Body claim: "seven specialist reviewers... security, performance, code quality, documentation, release management, AGENTS.md compliance, internal compliance. 131,246 review runs across 48,095 merge requests in 5,169 repos over 30 days. Median review time 3m39s. Human break-glass override fires on 0.6% of reviews."
- URL: https://blog.cloudflare.com/ai-code-review/
- Verdict: **CAVEAT** — `[practitioner direct, vendor venue]`; metrics self-reported (flagged "Cloudflare's own numbers").
- Findings: Author Ryan Skidmore, pub 2026-04-20 (in window). All numbers verified: 131,246 / 48,095 / 5,169 / 30 days / 3m39s median / 0.6% (288) override. "Specialized agents beat monolithic prompting" confirmed. ONE small discrepancy in the specialty list: source names the seven as security, performance, code quality, documentation, release management, **compliance**, **AGENTS.md review**. Body splits this into "AGENTS.md compliance" + "internal compliance" which reads as eight and slightly misnames two. Substance correct; labels drift.
- Proposed fix (line 21): change "documentation, release management, AGENTS.md compliance, internal compliance" → "documentation, release management, compliance, AGENTS.md review".
- `[checked:2026-05-25 result:CAVEAT due:2026-08-20]` https://blog.cloudflare.com/ai-code-review/ — [practitioner direct, vendor venue] all metrics verified; specialty list mis-splits "compliance"/"AGENTS.md review" into three labels. fallback: rename per source's seven.

### 4. Curran / Intercom (line 31, 86, 145)
- Body claim: "routes 19.2% of merges through a Tier-1 auto-approve path. Median cycle time on that path is 14.6 minutes against an org median of 75.8 minutes. 86% of those PRs are 20 lines or fewer."
- URL: https://ideas.fin.ai/p/2x-nine-months-later
- Verdict: **OK** — `[practitioner direct, vendor venue]`; metrics self-reported.
- Findings: Author Darragh Curran (CTO), pub 2026-04-16 (in window). All four verified: "19.2% of PRs are now AI-approved", "median of 14.6 minutes", org median "75.8 minutes", "Eighty-six percent of auto-approved PRs are 20 lines or fewer." Cross-checks observations/intercom.md exactly. Minor wording: source says "AI-approved," body says "Tier-1 auto-approve path" — Intercom's own framing is auto-approval of lowest-risk PRs, so "Tier-1" is the supplementary's gloss; harmless.
- `[checked:2026-05-25 result:OK due:2026-08-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] 19.2% / 14.6min / 75.8min / 86%≤20 lines all verified verbatim. fallback: none.

### 5. Gray / Stripe (line 33, 87, 146)
- Body claim: "Over 1,000 agent-produced PRs merge each week, all human-reviewed, none with human-written code... running each agent in an isolated devbox."
- URL: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents
- Verdict: **OK** — `[practitioner direct, vendor venue]`.
- Findings: Author Alistair Gray, pub 2026-02-09 (in window). Verified: "Over a thousand pull requests merged each week at Stripe are completely minion-produced"; "while they're human-reviewed, they contain no human-written code"; "isolated developer environment—or 'devbox'". Pass-2.1 corrections (1,300→"over 1,000"; "quarantined EC2"→"isolated devbox") confirmed correct.
- `[checked:2026-05-25 result:OK due:2026-08-09]` https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents — [practitioner direct, vendor venue] >1,000 PRs/wk, human-reviewed/no-human-code, isolated devbox all verified verbatim. fallback: none.

### 6. Husain — Guardrails vs Evaluators (line 43, 88, 147)
- Body claim: "Husain codifies the split as guardrails versus evaluators... You almost never use a slow LLM-as-judge as a synchronous guardrail."
- URL: https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html
- Verdict: **STALE** — `[practitioner direct]` L1/L3 codification, but OUT of freshness window.
- Findings: Author Hamel Husain, sole byline (Shankar correctly NOT co-bylined). Pub **2025-08-15** — this RESOLVES the maintainer's open freshness conflict (OODA said Jan 2026; critical-review said Aug 2025 → Aug 2025 is correct). 2025-08-15 is >6 months before 2026-05-25, so it is historical context, not current evidence. The guardrails/evaluators distinction is verified in substance (inline fast deterministic block vs async/batch LLM-judge). The exact "almost never use a slow LLM-as-judge as a synchronous guardrail" is paraphrase; source says "Inline use of an LLM-as-Judge is possible only when the latency budget and reliability targets allow it" — same idea, looser wording in body.
- Proposed fix: in maintainer source-verification block, change the Husain freshness line to resolved: pub 2025-08-15, OUTSIDE window. Either (a) mark it dated historical framing in body ("Husain's 2025 codification of..."), or (b) find a fresher convergent source for the guardrails/evaluators split. The framing is widely converged (L3), so a dated-but-canonical label is defensible.
- `[checked:2026-05-25 result:STALE due:2025-11-25]` https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html — [practitioner direct] pub 2025-08-15, OUTSIDE 6mo window; guardrails-vs-evaluators substance verified, "synchronous guardrail" line is paraphrase. fallback: label as dated canonical framing OR swap to a post-2025-11-25 convergent source.

### 7. Cherny via Jadhav (line 45, 89, 148)
- Body claim: "pairs a deterministic Stop hook with a background verifying agent... He calls the verify-your-work move the one that 2-3x's the quality of the final result."
- URL: https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/
- Verdict: **OK** — `[practitioner analysis]` (Jadhav on Cherny).
- Findings: Author Anup Jadhav (Pass-2.1 Choudhary→Jadhav correction confirmed), pub 2026-02-15 (in window). Verified: "use an agent Stop hook for more deterministic verification"; "If Claude has a feedback loop to verify its own work, it 2-3x the quality of the final result." Writer-on-subject attribution correct.
- `[checked:2026-05-25 result:OK due:2026-08-15]` https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/ — [practitioner analysis] Jadhav on Cherny; Stop hook + background agent + "2-3x quality" verified verbatim. fallback: none.

### 8. Shapira / Elementor (line 53, 90, 149)
- Body claim: "runs a CI workflow that grabs human review comments, hands them to a Cursor CLI agent, extracts patterns, and commits the rules file back to master."
- URL: https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc
- Verdict: **OK** — `[practitioner direct]`.
- Findings: Author Ofer Shapira (AI Team Lead, Elementor), pub 2026-01-11 (in window). Mechanism verified step-for-step: grabs human PR comments → Cursor CLI agent → extracts patterns/updates shared rules file → commits back to master. Maintainer-noted target file `.cursor/rules/code-review.mdc` consistent with the 120-line capped rules file described.
- `[checked:2026-05-25 result:OK due:2026-08-11]` https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc — [practitioner direct] CI→comments→Cursor CLI→rules file→commit-to-master verified. fallback: none.

### 9. Larson / Imprint (line 55, 91, 150)
- Body claim: "consults the same shape of artifact at plan time. The agent reads AGENTS.md and the skills wiki 'by future iterations of the plan pattern'."
- URL: https://lethain.com/everyinc-compound-engineering/
- Verdict: **OK** — `[practitioner direct]`.
- Findings: Author Will Larson, pub 2026-01-19 (in window). "consulted by future iterations of the plan pattern" confirmed (leading word "consulted" preserved per maintainer note). Imprint monorepo confirmed ("Implementing within Imprint's frontend and backend monorepos"). Minor: body quotes "by future iterations" but source phrasing is "consulting documentation updated during compound phases for future planning iterations" — the quoted fragment is accurate.
- `[checked:2026-05-25 result:OK due:2026-08-19]` https://lethain.com/everyinc-compound-engineering/ — [practitioner direct] "consulted by future iterations of the plan pattern" + Imprint monorepos verified. fallback: none.

### 10. Charles / Ramp via "Rachitsky" (line 57, 92, 151) — TOP-PRIORITY BLOCK
- Body claim: "Charles runs Ramp's Dojo as the team-scale version: 350+ shared skills, 99.5% of employees actively using AI, 84% on coding agents weekly... Ramp's own numbers (Lenny Rachitsky on Geoff Charles, *Inside Ramp*)."
- URL: https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles
- Verdict: **CORRECT** — wrong author attribution AND the load-bearing numbers are not on the cited URL.
- Findings: The creatoreconomy.so URL is **Peter Yang's "Behind the Craft"** newsletter (pub 2026-03-15), NOT Lenny Rachitsky. Geoff Charles's role (CPO of Ramp) is confirmed on the page. BUT the three load-bearing numbers — 350+ skills, 99.5% AI-active, 84% coding agents weekly — do NOT appear anywhere on this page (the page carries different figures, e.g. "50% of code written by AI... probably 80% soon"). Per observations/ramp.md, those three numbers trace to Geoff Charles's own X post (x.com/geoffintech/status/2042002590758572377, 2026-04-09) — the supplementary's own Pass-2.1 note says the X URL was auth-walled and was "swapped to Lenny Rachitsky['s] creatoreconomy.so write-up," but the swap landed on (a) the wrong author and (b) a page that does not carry the numbers.
- Proposed fix (lines 57, 92, 151): correct the author from "Lenny Rachitsky" to "Peter Yang" (newsletter: *Behind the Craft*). Then EITHER (a) re-source the three numbers — they are not on the Peter Yang page; if they cannot be confirmed on a fetchable page, drop them or move them behind the X-post citation with an explicit "auth-walled, mirror-confirmed" caveat as done for Uncle Bob; OR (b) keep only claims actually present on the Peter Yang page (CPO role, Dojo, "50%→80% of code" trajectory) and cite those.
  - Line 57 current: "**Charles runs Ramp's Dojo** ... 350+ shared skills, 99.5% of employees actively using AI, 84% on coding agents weekly. The marketplace pulls personal moves into shared standards. Ramp's own numbers ([Lenny Rachitsky on Geoff Charles, *Inside Ramp*](...))."
  - Suggested: "**Charles runs Ramp's Dojo** ... a 350+-skill internal marketplace that pulls personal moves into shared standards. Ramp's own numbers ([Peter Yang on Geoff Charles, *Inside Ramp*](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles); adoption figures from Charles, [X, 2026-04-09](https://x.com/geoffintech/status/2042002590758572377), auth-walled / mirror-confirmed)." — only if the X figures are confirmed via an accessible mirror; otherwise drop 99.5%/84%.
  - Lines 92 + 151: change "Lenny Rachitsky" → "Peter Yang".
- `[checked:2026-05-25 result:CORRECT due:2026-09-15]` https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles — [practitioner analysis] author is Peter Yang (Behind the Craft), NOT Lenny Rachitsky; 350+/99.5%/84% NOT on this page (trace to Charles X post, auth-walled). fallback: fix byline + re-source or drop the three numbers.

### 11. Majors / Honeycomb (line 67, 93, 152)
- Body claim: quote "How do you expect your agents to validate each change, if the consequences of each change cannot be found?"
- URL: https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/
- Verdict: **OK** — `[practitioner direct]`.
- Findings: Author Charity Majors, pub 2026-03-09 (in window). Quote verified verbatim, in section "Precision tooling makes them findable."
- `[checked:2026-05-25 result:OK due:2026-09-09]` https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/ — [practitioner direct] agent-validation quote verified verbatim. fallback: none.

### 12. Wolff / Anthropic via InfoQ (line 69, 94, 153)
- Body claim: "named the operating principle bluntly at QCon: 'when the implementation cost goes to zero, the feedback loop becomes everything.' The team ships SQLite persistence behind a feature flag, watches the production signal turn bad, removes it within two weeks."
- URL: https://www.infoq.com/presentations/engineering-ai/
- Verdict: **OK** — `[practitioner direct]`.
- Findings: Speaker Adam Wolff (Anthropic, Claude Code team). Quote verified. SQLite-behind-flag → removed within ~two weeks (native dep / concurrency / migration issues, reverted to JSONL) verified. Talk delivered QCon SF 2025 (Nov 2025); InfoQ recording "Recorded at: May 07, 2026" — so the publication is firmly in-window; the underlying talk is late-2025. Freshness fine; optionally label the talk venue/date for honesty.
- `[checked:2026-05-25 result:OK due:2026-11-07]` https://www.infoq.com/presentations/engineering-ai/ — [practitioner direct] Wolff quote + SQLite-two-weeks verified; InfoQ recorded 2026-05-07 (in window), talk = QCon SF 2025. fallback: none.

---

## FILE: clean-code-is-steering.md

### 13. Uncle Bob — eight verbatim X block-quotes (lines 15-17, 31, 37-45, 61-63, 69-71, 75-81, 85)
- Body claim: eight block quotes attributed to specific X status IDs (status/2016166910698696916, /2032072361436983517, /2032089795766129021, /2049225231273767154, /2049124461127864613, /2046222100164153548, /2049453605237715058) — e.g. "Tests are no longer expensive... Architectural discipline is critical."
- URLs: x.com/unclebobmartin/status/* ; mirror w.twstalker.com/unclebobmartin ; Security Now grc.com/sn/sn-1070.htm
- Verdict: **BLOCKED** (primary + mirror) with **CAVEAT** on the maintainer-block backing claim.
- Findings: All x.com status URLs return HTTP 402 (paywall/login). The mirror w.twstalker.com returns HTTP 403. Both BLOCKED — no invented content; 2 attempts spent. The Security Now transcript (grc.com/sn/sn-1070.htm) IS real and on-topic, and corroborates the SUBSTANCE of the agentic-drift / "quicksilver" material ("AIs are stochastic... rules bias but do not absolutely constrain"; "liars and cheats"; TDD + small decoupled units). It does NOT contain the verbatim block quotes — specifically not the "two Claude windows," "Tests are no longer expensive / coverage / metrics / modularity / architectural discipline" set. The cited research-run backing (runs/2026-04-30-1324-uncle-bob-...md, line 100 of the supplementary) does NOT carry the verbatim quotes OR the status-ID URLs — it cites the twstalker mirror + Security Now, and its own Act section says "verify original X URLs where possible and separate Uncle Bob's exact words from mirror/transcript paraphrase." So the maintainer-block sentence "Research pass captured in [run]" overstates: the run captured the pattern, not the verbatim quotes/IDs.
- The student-facing caveat (line 5: "original X pages may require login or be intermittently inaccessible") is honest and correctly placed. Risk is bounded: substance is corroborated, this is a supplementary not a load-bearing-metric piece. But the verbatim wording + status-ID attributions remain UNVERIFIED against any accessible source.
- Proposed fix (maintainer block, line 100): soften "Research pass captured in [run]" to reflect reality, e.g. "Pattern captured in [run] (substance corroborated by Security Now sn-1070 transcript + twstalker mirror); verbatim X quotes + status-IDs are author-transcribed from X and not independently re-verifiable while x.com is auth-walled — re-verify at next X-access window." Add the run's own open action ("separate exact words from paraphrase") to pre-cohort-todos.
- `[checked:2026-05-25 result:BLOCKED due:2026-08-25]` https://x.com/unclebobmartin/status/2032089795766129021 — [practitioner direct] x.com 402 + twstalker mirror 403; substance corroborated by Security Now sn-1070, verbatim quotes/status-IDs unverified. fallback: keep student caveat; downgrade maintainer "captured" claim; re-verify at X-access window.

### 14. Security Now transcript sn-1070 (line 100, supporting)
- URL: https://www.grc.com/sn/sn-1070.htm
- Verdict: **OK** (as supporting/corroborating source, not as the verbatim-quote source).
- Findings: Real, accessible, episode 1070, discusses Uncle Bob's Empire-game AI experience; carries the stochastic-rules + "liars and cheats" + TDD/modularity material. Corroborates the supplementary's prose framing (lines 21-57). No date issue — the transcript reflects late-Apr-2026 OODA pull.
- `[checked:2026-05-25 result:OK due:2026-08-25]` https://www.grc.com/sn/sn-1070.htm — [domain trade publication / podcast transcript] corroborates Uncle Bob agentic-drift substance; does NOT carry the eight verbatim block quotes. fallback: cite as substance-corroboration only.

### 15. arch-view repo (line 63 context, line 100)
- URL: https://github.com/unclebob/arch-view
- Verdict: **OK**.
- Findings: Repo resolves; owner unclebob; interactive Clojure architecture-visualization tool (namespace deps, cycles, layers, drill-down). Matches body's "architecture-viewer work" framing exactly. 49 stars, 111 commits.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://github.com/unclebob/arch-view — [practitioner direct, code] repo resolves, Clojure arch-viz tool, matches body framing. fallback: none.

### 16. Ronacher — Agentic Coding Recommendations (line 100, supporting) — WATCH-LIST ITEM
- URL: https://lucumr.pocoo.org/2025/6/12/agentic-coding/
- Verdict: **STALE** — `[practitioner direct]`, OUT of window (supporting source only).
- Findings: Author Armin Ronacher, pub **2025-06-12** — >6 months old, historical context. Appears only as a maintainer-block supporting source ("Armin Ronacher agentic coding recommendations"), not a body claim, so impact is low. Per brief, flagged STALE-or-historical.
- Proposed fix: if retained, label dated in maintainer block: "Armin Ronacher, *Agentic Coding Recommendations* (2025-06-12, historical/foundational, outside 6mo window)."
- `[checked:2026-05-25 result:STALE due:2025-11-25]` https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — [practitioner direct] pub 2025-06-12, outside window; maintainer-block supporting source only. fallback: keep with explicit dated/foundational label.

### 17. Simon Willison agentic-engineering-patterns (line 100, supporting)
- URL: (not pinned in supplementary body; run file cites simonwillison.net/guides/agentic-engineering-patterns/*)
- Verdict: **NEEDED** (low priority) — no specific URL pinned in the supplementary for the "Simon Willison agentic engineering patterns" supporting mention.
- Findings: The maintainer block names "Simon Willison agentic engineering patterns" without a URL; the OODA run cites three sub-pages (code-is-cheap, red-green-tdd, first-run-the-tests). Supporting-source only, not a body claim. If any Willison claim becomes load-bearing, pin the exact sub-page URL.
- `[checked:2026-05-25 result:NEEDED due:2026-08-25]` https://simonwillison.net/guides/agentic-engineering-patterns/ — [practitioner direct] supporting mention has no pinned URL; pin sub-page if claim becomes load-bearing. fallback: drop the unpinned supporting mention or add the run's three sub-page URLs.

---

## FILE: what-is-agentic-engineering.md
No evidence-bearing URLs in body. All references are forward-pointers to other modules' citations or cultural-vocab:
- Klaassen compound loop / Cherny parallel worktrees — `[practitioner direct]`, URLs live at M1 (getting-going.md) and verified there (#18, #19 below). No new URL introduced. **OK** (no-new-source).
- Boyd OODA — `[cultural-vocab]`, 1960s-80s military framework, no URL required per carve-out. **OK**.
- `[checked:2026-05-25 result:OK due:2026-11-25]` (no URL) — [cultural-vocab + cross-ref] no new evidence URLs; forward-refs verified at source modules. fallback: none.

---

## FILE: getting-going.md

### 18. Cherny — Mastering Claude Code in 30 minutes (line 54)
- URL: https://www.youtube.com/watch?v=6eBSHbLKuN0
- Verdict: **OK (dated, by maintainer decision)** — `[practitioner direct]`, video.
- Findings: Video title confirmed ("Mastering Claude Code in 30 minutes"); author/date truncated by YouTube footer in fetch but maintainer block (getting-going line 75) documents it as Boris Cherny, May 2025, with an explicit freshness-exception decision ("pedagogy match unbeaten by successors"). Operational/pedagogical pre-read, not load-bearing evidence. Dating is disclosed and deliberate.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://www.youtube.com/watch?v=6eBSHbLKuN0 — [practitioner direct] title confirmed; May-2025 dating disclosed as deliberate freshness exception; pedagogical link, not evidence. fallback: none.

### 19. Klaassen — Compound Engineering (line 125)
- URL: https://every.to/source-code/compound-engineering-the-definitive-guide
- Verdict: **OK** — `[practitioner direct, vendor venue]`. Same URL as #1; verified 2026-02-09, framing matches "Plan → Work → Review → Compound" attribution. Body correctly attributes inside Claude's Ex3 summary, not a fresh metric claim.
- `[checked:2026-05-25 result:OK due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen / Every / 2026-02-09; framework attribution only. fallback: none.

### 20. Huryn — Three-block memory (line 126)
- Body claim: "Three-block memory — Paweł Huryn (productcompass.pm) [practitioner direct, vendor venue]. ... URL deferred to M4 reveal."
- Verdict: **NEEDED** (deferred by design) — no URL pinned here; the maintainer block explicitly defers the URL to the M4 reveal.
- Findings: Framework attributed to Paweł Huryn at productcompass.pm but no URL in this file (intentional — naming is held back to M4 for pedagogical reasons). Not a body-visible claim. Verify the pinned URL when M4's reveal file is audited (out of Group-D scope).
- `[checked:2026-05-25 result:NEEDED due:2026-08-25]` (URL deferred to M4) — [practitioner direct, vendor venue] Huryn three-block-memory URL not pinned here by design; verify at M4 reveal file. fallback: confirm productcompass.pm source exists at M4 audit.

### 21. ccstatusline (line 41) / OWASP LLM Top 10 (operational, also in plan-mode + earn-the-trust)
- URLs: https://github.com/sirmalloc/ccstatusline ; https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Verdict: **OK (operational link, not evidence)** — out of strict scope (not a practitioner claim / number / framework attribution). Not opened; flagged as operational per brief ("NOT operational links").
- `[checked:2026-05-25 result:OK due:n/a]` (operational links) — not evidence-bearing; not verified per scope. fallback: none.

---

## FILE: earn-the-trust.md

### 22. Willison — lethal trifecta (line 14, pre-read) + OWASP (line 14)
- URL: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- Verdict: **OK (dated, disclosed)** — `[practitioner direct]`.
- Findings: Verified below at #24 (same URL appears in plan-mode-done-right with explicit "used as reference not as fresh evidence" framing). In earn-the-trust it is an unframed optional pre-read link; the dated framing lives in plan-mode-done-right. Consistent. OWASP = operational checklist link, not evidence.
- `[checked:2026-05-25 result:OK due:2025-11-25(historical)]` https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ — [practitioner direct] Willison / 2025-06-16, foundational/dated, disclosed at plan-mode. fallback: ensure dated framing travels with the link if earn-the-trust is read standalone.

### 23. STRIDE / Saltzer-Schroeder / Beck-Bach / Klaassen frameworks (lines 158-163)
- Verdict: **OK** — `[cultural-vocab]` / framework attributions.
- Findings: STRIDE — Kohnfelder & Garg (1999 Microsoft memo), Shostack *Threat Modeling* 2014: correct, canonical, no fresh-evidence claim. Saltzer & Schroeder 1975 least-privilege: correct canonical attribution. Kent Beck / James Bach exploratory-testing + Google Testing Blog test-pyramid: correct lineage attributions. Klaassen compound engineering: cross-ref, verified at #1/#19. All historical/cultural-vocab, no URL required per carve-out; no freshness issue (named as lineage, not evidence).
- `[checked:2026-05-25 result:OK due:2026-11-25]` (no URL, cultural-vocab) — [cultural-vocab] STRIDE/Saltzer-Schroeder/Beck-Bach framework lineage attributions correct. fallback: none.

---

## FILE: plan-mode-done-right.md

### 24. Willison — lethal trifecta (line 75, pre-read)
- URL: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- Verdict: **OK (dated, correctly disclosed)** — `[practitioner direct]`.
- Findings: Author Simon Willison, pub 2025-06-16. Three elements verified verbatim: private data + untrusted content + ability to externally communicate. Body explicitly frames it "foundational framing from June 2025... used as reference not as fresh evidence" — exemplary freshness disclosure. Outside 6mo window but correctly handled as historical/canonical naming.
- `[checked:2026-05-25 result:OK due:2025-11-25(historical)]` https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ — [practitioner direct] Willison / 2025-06-16; trifecta (private data + untrusted content + external comms) verified; dated-as-reference disclosed in body. fallback: none.

### 25. Plan mode docs + Roger Martin (lines 152-154)
- URLs: https://code.claude.com/docs/en/permission-modes.md ; Klaassen every.to (cross-ref #1)
- Verdict: **OK** — docs link is operational/platform (not a practitioner-claim/number); Roger Martin "Playing to Win" (HBR) is a cultural-vocab strategy-framework attribution, vision-layer optional, no fresh-evidence claim. Klaassen cross-ref verified at #1.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://code.claude.com/docs/en/permission-modes.md — [platform docs / cultural-vocab] plan-mode docs operational; Roger Martin framework attribution canonical. fallback: none.

---

## ROLL-UP

Result counts (distinct evidence sources):
- OK: 14 (Bugbot, Curran, Stripe, Jadhav/Cherny, Shapira, Larson, Majors, Wolff, SecurityNow, arch-view, Cherny-video, Klaassen-getting-going, Willison×2, cultural-vocab clusters)
- CAVEAT: 3 (Klaassen-Move1 synthesis overreach, Cloudflare specialty-list mis-split, Uncle-Bob maintainer-backing overstatement)
- CORRECT: 1 (Ramp/Charles wrong author + numbers-not-on-URL)
- STALE: 2 (Husain 2025-08-15, Ronacher 2025-06-12)
- BLOCKED: 1 (Uncle Bob X status URLs + twstalker mirror)
- NEEDED: 3 (Willison-patterns unpinned URL, Huryn deferred-to-M4, [low priority])
- GONE: 0

(Counts overlap where one source carries two verdicts, e.g. Uncle Bob = BLOCKED + CAVEAT.)
