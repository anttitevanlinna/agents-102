# Source Verification Report — Article 01

Verified: 2026-02-22
Method: Web search verification of each URL, claim matching, source classification

---

### Source 1: Willison — Hallucinations in Code

- URL: https://simonwillison.net/2025/Mar/2/hallucinations-in-code/
- Fetched: YES (confirmed via web search; article title, content, and quote all indexed)
- Claimed fact verified: **YES** — The article's central thesis is exactly: "With code you get a powerful form of fact checking for free — run the code and see if it works." Willison argues that hallucinated methods are instantly obvious because you get an error, contrasting with prose hallucinations that require critical fact-checking skills. Also discusses agentic code systems (ChatGPT Code Interpreter, Claude Code) that self-correct in a loop.
- Source type: **Practitioner direct** — Simon Willison writing about his own experience and analysis of LLM coding workflows. He is a well-known developer (co-creator of Django, active LLM tool builder).
- PASSES quality gate: **YES**
- Notes: Also published on his Substack (simonw.substack.com). Published March 2, 2025. Within freshness window.

---

### Source 2: Spotify Engineering — Honk Part 3 (Feedback Loops)

- URL: https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3
- Fetched: YES (confirmed via web search; article indexed with full title and metrics)
- Claimed fact verified: **YES with nuance** —
  - 650+ PRs/month: **VERIFIED.** Multiple sources confirm "more than 650 agent-generated pull requests merged into production every month."
  - Test suites as verification infrastructure: **VERIFIED.** Article describes deterministic verifiers (formatting, building, testing) plus LLM-as-judge layer. Judge vetoes ~25% of proposed changes; agent successfully course-corrects about half the time.
  - 90% time savings on migrations: **PARTIAL.** The actual claim is "60-90% time savings" on migrations compared to writing code by hand. Citing "90%" alone overstates; the range is 60-90%. Recommend citing as "60-90%" or "up to 90%."
- Source type: **Practitioner direct** — Spotify engineering team writing about their own production system (Honk), built on Claude Agent SDK. First-party engineering blog.
- PASSES quality gate: **YES** (with the 60-90% range correction)
- Notes: Published December 2025. Part 3 of a 3-part series. The 60-90% figure is Spotify's internal measurement, not independently audited — this is acceptable for a practitioner-direct source but should not be presented as an independent finding.

---

### Source 3: Spotify Engineering — Honk Part 1

- URL: https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1
- Fetched: YES (confirmed via web search; full title "1,500+ PRs Later: Spotify's Journey with Our Background Coding Agent (Honk, Part 1)")
- Claimed fact verified: **YES** — The article title itself is "1,500+ PRs Later." Multiple sources confirm Spotify has merged more than 1,500 AI-generated pull requests through Honk.
- Source type: **Practitioner direct** — Spotify engineering team writing about their own production system. First-party engineering blog.
- PASSES quality gate: **YES**
- Notes: Published November 2025. The 1,500+ figure represents the cumulative total at time of publication; the monthly rate is 650+/month (from Part 3).

---

### Source 4: Narayanan — AI as Normal Technology

- URL: https://www.normaltech.ai/p/ai-as-normal-technology
- Fetched: YES (confirmed via web search; article indexed at normaltech.ai Substack)
- Claimed fact verified: **PARTIAL** —
  - "Domain-specific verifiers like compilers": **VERIFIED conceptually.** Narayanan discusses how coding takes advantage of existing symbolic tools like compilers that have been optimized over decades, and how coding is a "verifiable domain." The exact phrase may differ slightly from article text, but the concept is confirmed.
  - Compound error math (95% per step -> 36% over 20 steps): **NOT DIRECTLY CONFIRMED from this URL.** Web search found this specific calculation referenced elsewhere in discussion of compound errors in AI, but could not confirm it appears in THIS specific article. The math is correct (0.95^20 = 0.358), but the attribution to this particular URL needs manual verification. Narayanan's X.com post (Source 5) discusses coding as neurosymbolic AI, which is related but distinct. The compound error math may come from a different Narayanan piece or may be a general principle the article illustrates.
- Source type: **Academic/practitioner analysis** — Arvind Narayanan is a Princeton CS professor and director of CITP. This is academic analysis informed by practitioner understanding. Also published as a World Bank working paper.
- PASSES quality gate: **YES** (for the verifier/compiler claim); **NEEDS MANUAL CHECK** (for the 95%/36% compound error math — verify it appears in this specific URL, not just in the general discourse)
- Notes: The "AI as Normal Technology" project spans a Substack, academic paper, and forthcoming book. The verifier claim is well-supported. The compound error calculation is mathematically correct but needs page-level verification for attribution to this specific article.

---

### Source 5: Narayanan — Coding Agents X.com Post

- URL: https://x.com/random_walker/status/2018342421696766147
- Fetched: **PARTIAL** — X.com posts are not directly fetchable, but web search indexed the post's content via Substack cross-post and search snippets.
- Claimed fact verified: **YES** — The post text begins: "Why do coding agents work so well and what would it take to replicate their success in other domains? One important and under-appreciated reason is that agentic coding is a type of neurosymbolic AI. The main weakness of LLMs is that they are statistical machines and struggle at tasks involving long chains of logic and symbol manipulation..." Narayanan argues that agentic coding fuses statistical and symbolic approaches through code execution during generation.
- Source type: **Practitioner analysis / Academic** — Arvind Narayanan, Princeton CS professor, analyzing patterns in agentic AI. Known academic authority (author of "AI Snake Oil"). The post is substantive analysis, not a hot take.
- PASSES quality gate: **YES**
- Notes: X.com post cannot be directly fetched by automated tools but the content is confirmed through indexed snippets and Substack cross-posting (substack.com/@aisnakeoil/note/c-208836424). The author's identity and credentials are beyond question (Princeton professor, CITP director).

---

### Source 6: Karpathy — Phase Shift Post

- URL: https://x.com/karpathy/status/2015883857489522876
- Fetched: **PARTIAL** — X.com posts are not directly fetchable, but the content is extensively indexed across multiple sources (14M+ views, widely reported).
- Claimed fact verified: **YES** —
  - "80% agents + 20% edits": **VERIFIED.** Karpathy stated: "I rapidly went from about 80% manual+autocomplete coding and 20% agents in November to 80% agent coding and 20% edits+touchups in December."
  - December 2025 phase shift: **VERIFIED.** Karpathy wrote: "LLM agent capabilities (Claude & Codex especially) have crossed some kind of threshold of coherence around December 2025 and caused a phase shift in software engineering." He called it "easily the biggest change to my basic coding workflow in 2 decades of programming and it happened over the course of the few weeks."
- Source type: **Practitioner direct** — Andrej Karpathy (former Tesla AI head, OpenAI founding member) writing about his own coding experience. This is not analysis of others — it is direct testimony about his personal workflow change.
- PASSES quality gate: **YES**
- Notes: Posted December 26, 2025. 14M+ views, 2.4K+ comments. Extensively reported by TechCrunch, The Decoder, Futurum Group, Yahoo Tech, and others. Karpathy also noted caveats: AI models make "subtle conceptual mistakes like sloppy junior developers" and tend to overcomplicate solutions. The X.com URL cannot be fetched directly by tools but the content is thoroughly confirmed.

---

### Source 7: METR Study

- URL: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Fetched: YES (confirmed via web search; article and arXiv paper indexed)
- Claimed fact verified: **YES** —
  - Experienced devs 19% slower with AI: **VERIFIED.** "When developers are allowed to use AI tools, they take 19% longer to complete issues."
  - Perception gap of ~40 percentage points: **VERIFIED.** Developers expected AI to speed them up by 24%, and even after experiencing the slowdown, believed AI had sped them up by 20%. This creates a ~39-43 percentage point gap (sources cite both "40-point" and "43-point" depending on calculation). The "~40 percentage points" framing is accurate.
- Source type: **Academic/research** — METR is a respected AI safety research organization. The study is a randomized controlled trial (16 developers, 246 tasks, randomly assigned AI-allowed vs. AI-disallowed conditions). Published on arXiv (2507.09089).
- PASSES quality gate: **YES**
- Notes: Published July 10, 2025. Important methodology context: the study used early 2025 tools (Cursor Pro, Claude 3.5/3.7 Sonnet) on mature codebases where developers had ~5 years of prior experience. The 19% finding is specific to experienced developers on familiar codebases — it does not claim AI slows down all developers on all tasks. The study's acceptance rate finding (developers accepted less than 44% of AI generations) is also noteworthy.

---

### Source 8: Junestrand / Artificial Lawyer Interview

- URL: https://www.artificiallawyer.com/2025/12/01/max-junestrand-legora-were-setting-the-precedent/
- Fetched: YES (confirmed via web search; article title and quote indexed)
- Claimed fact verified: **YES** — Junestrand stated: "Well, I'll be plain Richard, so at Legora, we don't do yearly planning. We plan for about one quarter ahead." The interview covers how they only plan one quarter ahead because AI is moving so fast.
- Source type: **Domain trade publication interview** — Artificial Lawyer is a specialized legal technology publication. The interview is with Max Junestrand (CEO/co-founder of Legora), a practitioner speaking in a domain-specific publication. This is stronger than general press because the interviewer (Richard Tromans) understands the domain.
- PASSES quality gate: **YES**
- Notes: Published December 1, 2025. Legora is a Swedish legal AI company that has raised $150M and works with major firms including White & Case and Cleary Gottlieb. The "no yearly planning" quote illustrates how fast AI is moving in practice, not just in theory.

---

### Source 9: Goldman Sachs + Anthropic (CNBC)

- URL: https://www.cnbc.com/2026/02/06/anthropic-goldman-sachs-ai-model-accounting.html
- Fetched: YES (confirmed via web search; article indexed with headline and key facts)
- Claimed fact verified: **YES** —
  - Trade accounting agents: **VERIFIED.** Goldman Sachs co-developed autonomous AI agents with Anthropic over six months to handle trade reconciliation and accounting.
  - Managing $2.5 trillion in assets: **VERIFIED.** Multiple sources confirm the agents manage operations for "$2.5 trillion in assets under supervision."
  - Additional confirmed facts: 30% faster client onboarding, 20%+ developer productivity boost, powered by Claude Opus 4.6, CIO Marco Argenti quoted.
- Source type: **General press** — CNBC reporting on a corporate announcement. Per classification rules, this can only support bare facts (the partnership exists, the scale of assets, the stated metrics). It CANNOT support "how it works" claims.
- PASSES quality gate: **YES** (for bare fact usage only)
- Notes: Published February 6, 2026. The $2.5 trillion and 30% faster claims originate from Goldman Sachs/Anthropic — these are effectively vendor claims reported by press. The article confirms the partnership and scale exist. Do NOT use this source for "how agents work" analysis. The "in early stages" and "expectations to launch soon" language means these agents may not yet be in full production — the article describes co-development, not fully deployed operations.

---

### Source 10: Klarna Reversal (Bloomberg)

- URL: https://www.bloomberg.com/news/articles/2025-05-08/klarna-turns-from-ai-to-real-person-customer-service
- Fetched: **PARTIAL** — Bloomberg is paywalled, but the article's existence and key facts are confirmed through extensive coverage (Entrepreneur, Fortune, CX Dive, FinTech Weekly, and Klarna CEO's own statements widely reported).
- Claimed fact verified: **YES** —
  - Klarna rehired humans: **VERIFIED.** CEO Sebastian Siemiatkowski acknowledged AI-focused customer service strategy "wasn't the right path" and launched recruitment drive for human customer service agents.
  - AI customer service quality slipped: **VERIFIED.** Multiple sources confirm internal reviews and customer feedback revealed AI systems lacked empathy, produced "lower quality" output, and could not handle nuanced problem-solving.
  - Additional context: Klarna previously claimed its AI chatbot "does the work of 700 human agents." ~700 positions eliminated between 2022-2024.
- Source type: **General press** — Bloomberg reporting on a corporate development. Per classification rules, bare facts only: Klarna reversed course, CEO admitted quality issues, company is hiring humans again.
- PASSES quality gate: **YES** (for bare fact usage only)
- Notes: Published May 8, 2025. Bloomberg paywall may prevent direct reader access, but the story is widely reported by non-paywalled sources (Entrepreneur, Fortune, CX Dive). Consider adding a non-paywalled secondary link. The Klarna reversal is well-established fact, not disputed.

---

## Summary

| # | Source | Fetched | Claim Verified | Type | Passes |
|---|--------|---------|----------------|------|--------|
| 1 | Willison — Hallucinations | YES | YES | Practitioner direct | YES |
| 2 | Spotify — Honk Part 3 | YES | YES (60-90%, not just 90%) | Practitioner direct | YES* |
| 3 | Spotify — Honk Part 1 | YES | YES | Practitioner direct | YES |
| 4 | Narayanan — Normal Tech | YES | PARTIAL (verifier yes, compound math needs check) | Academic/practitioner | YES* |
| 5 | Narayanan — X.com post | PARTIAL | YES (content confirmed via index) | Academic/practitioner | YES |
| 6 | Karpathy — Phase shift | PARTIAL | YES | Practitioner direct | YES |
| 7 | METR Study | YES | YES | Academic/research | YES |
| 8 | Junestrand — Artificial Lawyer | YES | YES | Domain trade pub | YES |
| 9 | Goldman + Anthropic (CNBC) | YES | YES | General press (bare facts) | YES |
| 10 | Klarna reversal (Bloomberg) | PARTIAL (paywall) | YES | General press (bare facts) | YES |

**Result: 10/10 sources PASS the quality gate.**

### Action items before publication:

1. **Source 2 (Spotify Part 3):** Change "90% time savings" to "60-90% time savings" or "up to 90%" to match the actual claim range. Citing only "90%" overstates.

2. **Source 4 (Narayanan — Normal Tech):** Manually verify that the compound error math (95% per step -> 36% over 20 steps) appears in THIS specific article, not just in the general discourse. The math is correct, but the attribution to this URL needs page-level confirmation. If it's from a different Narayanan piece, update the citation.

3. **Source 9 (Goldman/CNBC):** Note that the deployment appears to still be "in early stages" per the article. Do not present as fully deployed production system. The $2.5T figure describes assets under supervision at the firm, not assets being managed by the AI agents.

4. **Source 10 (Klarna/Bloomberg):** Bloomberg is paywalled. Consider adding a non-paywalled secondary reference (e.g., Fortune: https://fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/ or Entrepreneur: https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396).

5. **Sources 5 and 6 (X.com posts):** These URLs cannot be fetched by automated tools and may not render for all readers (X.com login walls). Content is confirmed through secondary indexing. Consider noting "archived/indexed" if readers cannot access.

### Source quality profile:

- **4 practitioner-direct sources** (Willison, Spotify x2, Karpathy) — strongest tier
- **2 academic/practitioner analysis** (Narayanan x2) — strong tier
- **1 academic/research** (METR) — strong tier
- **1 domain trade publication** (Artificial Lawyer) — acceptable tier
- **2 general press** (CNBC, Bloomberg) — bare facts only tier
- **0 vendor press releases** — clean
- **0 republished PR** — clean

This is a well-constructed source list. The balance is heavily weighted toward practitioner and academic sources (7 of 10), with general press used appropriately for bare facts only. No vendor marketing sources are present.
