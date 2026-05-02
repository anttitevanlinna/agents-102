# AE101 M5/M6 Lecture Set — Source Verification

**Date:** 2026-04-25
**Scope:** `lectures/the-loop-has-a-name.md`, `lectures/what-packaging-is.md`, `lectures/skills-from-the-frontier.md`, `lectures/story-of-module-6.md`, plus `learn-from-the-test.md` Pre-reads.
**Method:** verified against `continuous-research/observations/` first; WebFetch for primary sources where on-disk evidence was thin or stale.

---

## Summary counts

- **VERIFIED:** 5
- **VERIFIED-WITH-CAVEAT:** 3
- **NEEDS-CORRECTION:** 3
- **UNVERIFIABLE-AFTER-2-SEARCHES:** 0

## Top 3 corrections needed

1. **Klaassen "You're the Bread in the AI Sandwich" — author is wrong.** Currently cited as Klaassen-authored; the article at `every.to/context-window/you-re-the-bread-in-the-ai-sandwich` is by **Laura Entis** (Every staff), published 2026-04-22. Klaassen is the *interview subject* on Dan Shipper's "AI & I" podcast that the article writes up. Two surfaces affected: `learn-from-the-test.md` L81 and `bosser-strategy:content-strategy-agentic-engineering-101.md` L402. **Fix:** reattribute to "Laura Entis on Dan Shipper's interview with Kieran Klaassen" or, if we want a Klaassen-direct source, swap to a different post (the podcast episode page itself, or `my-ai-had-already-fixed-the-code-before-i-saw-it` — verified Klaassen-authored, Aug 2025, slightly outside 6-month freshness).
2. **Cherny three-shape framing is a synthesis, not Cherny's own taxonomy.** The substack source (John Kim, *getpushtoprod*, 2026-02-21) presents the three options ("background agent verify on stop / agent-stop hook for deterministic verification / Ralph Wiggin plugin for autonomous looping") in one sentence — **the author organized them as a taxonomy**; Cherny himself doesn't enumerate them as "three shapes." `what-packaging-is.md` L24 currently reads *"Boris Cherny (the engineer who built Claude Code) names three shapes practitioners use, cleanly."* **Fix:** reword to *"three shapes practitioners use — drawn from how Cherny describes his stop-hook practice"* or *"the menu, organized by John Kim from Cherny's interview"*. Drop the *"cleanly names"* claim — Cherny doesn't name them; the interviewer does.
3. **Klaassen's 80/20 ratio is NOT in *The Definitive Guide*.** WebFetch of `every.to/source-code/compound-engineering-the-definitive-guide` (Feb 9, 2026) confirms the article does NOT state the "80% planning + review, 20% execution" ratio. `what-packaging-is.md` L40 cites it from that URL. The ratio appears in our internal OODA notes paraphrasing Klaassen — **find the actual primary source** (likely a podcast episode, X.com thread, or *Compound Engineering: How Every Codes With Agents*) before re-citing. Until pinned, mark `[SOURCE NEEDED]` or attribute as *"the ratio practitioners take from Klaassen's posture, even if not stated as 80/20 in any single piece."*

---

## Per-claim verdicts

### 1. Curran "2x — nine months later" numbers

**VERIFIED.** [practitioner direct, 2026-04-16]
URL: https://ideas.fin.ai/p/2x-nine-months-later
- 19.2% auto-approved — VERIFIED (the post says *"19.2% of PRs are now AI-approved"* with goal *">50%"* by end of April)
- 14.6 min vs 75.8 min org median — VERIFIED
- 86% ≤20 lines — VERIFIED (*"Eighty-six percent of auto-approved PRs are 20 lines or fewer"*)
- 500-person R&D — VERIFIED (*"approximately 500 people building and operating the product"*)
- Published April 16, 2026 — within 6-month freshness window for any cohort delivered before mid-October 2026.

### 2. Intercom 267 skills / 31% of R&D

**VERIFIED.** [practitioner direct, same Curran post]
- 267 skills — VERIFIED
- 31% of R&D contributing (153 contributors) — VERIFIED
- Cross-confirmed against `continuous-research/observations/intercom.md` L42.

### 3. Cherny three stop-hook shapes

**NEEDS-CORRECTION.** [practitioner analysis, John Kim / getpushtoprod, 2026-02-21]
URL: https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually
The three options are real practices Cherny employs, but the **three-shape framing is the article author's synthesis**, not Cherny's own taxonomy. The substack passage: *"For very long running tasks, Boris either prompts Claude to verify its work with a background agent when it's done, uses an agent-stop hook for deterministic verification, or uses the Ralph Wiggin plugin for autonomous looping."* — three alternatives in prose, not a numbered framework. See correction #2 above.

### 4. Sourcegraph Amp counter-camp

**VERIFIED-WITH-CAVEAT.** [practitioner direct, Sourcegraph, 2025-10-23]
URL: https://ampcode.com/news/handoff
Amp has explicitly removed auto-compaction in favor of `/handoff` to a fresh thread — quoted: *"What we want to encourage are focused threads, because we think that's how agents yield the best results."* This pins the counter-camp claim. **Caveat:** Amp's stance is from a vendor product post (Sourcegraph official), so it's [practitioner direct from a vendor] rather than a named-engineer practitioner post. That's acceptable for naming a counter-camp. **Fix in `what-packaging-is.md`:** add the URL `https://ampcode.com/news/handoff` to the maintainer block, replacing the speculative pin TODO. Freshness OK (Oct 2025 = within 6 months of an April 2026 cohort).

### 5. Klaassen URLs in `learn-from-the-test.md` Pre-reads

**a) "You're the Bread in the AI Sandwich" — NEEDS-CORRECTION (author wrong).**
URL: https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — RESOLVES; published 2026-04-22 by **Laura Entis** (interview write-up). Klaassen is the subject, not the author. See correction #1.

**b) "Compound Engineering: The Definitive Guide" — VERIFIED-WITH-CAVEAT.**
URL: https://every.to/source-code/compound-engineering-the-definitive-guide — RESOLVES; Klaassen-authored, 2026-02-09 (updated 2026-03-13). **Caveat:** the 80/20 ratio our lectures pull from this guide is **NOT in the article**. See correction #3. The guide stands as a Klaassen-direct source for compound engineering as a methodology; just don't use it to cite the 80/20 ratio.

### 6. Ronacher's three-pattern (reference / plan / verifier)

**VERIFIED-WITH-CAVEAT.** [practitioner direct]
URL: https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ (the MiniJinja-Go port post, 2026-01-14) describes the practices — Rust snapshot tests as reference, incremental porting, snapshot-comparison verification — **but does not name them as a three-pattern in those terms**. The "reference + plan.md + external verifier" framing is **our synthesis** of Ronacher's practice across this post, *Agentic Coding Recommendations* (2025-06-12), and *Things That Didn't Work* (2025-07-30). **Fix in `what-packaging-is.md`:** the line *"Ronacher's vocabulary is the one that stuck"* overstates — he uses "reference" and "verifier" loosely; he does not centralise *plan.md* as a named primitive (that's closer to Huntley's Ralph + Klaassen's plan-as-artifact). Reframe as: *"the shape practitioners converge on — Ronacher names reference and verifier; the plan.md primitive is closest to Huntley's Ralph and Klaassen's plan-as-artifact."* OR keep the current attribution but flag it as our synthesis of Ronacher's writing rather than his own framework.

### 7. Charles / Ramp paraphrase

**VERIFIED.** [practitioner direct]
`story-of-module-6.md` correctly captures Charles's actual line as *"The models were good enough. The harness wasn't."* (Geoff Charles, x.com post 2026-04-09, sourced via `continuous-research/observations/ramp.md` L36). The lecture's account of catching the paraphrase and lifting the verbatim quote is accurate. **Caveat:** the primary URL is `x.com/geoffintech/status/2042002590758572377`; WebFetch returned 402 (auth-walled), so we rely on the obs file. Maintainer-block TODO already requests pinning a non-X mirror if available.

### 8. Ramp 350-skill count

**VERIFIED.** [practitioner direct, via observations file]
Cross-confirmed `observations/ramp.md` L24 + L38: *"350+ skills shared"* in Dojo, with the *"sales rep packages a Gong-call analysis as a skill"* example. The count is sourced from Charles's x.com thread (2026-04-09); same x.com URL caveat as above.

---

## Recommended fixes (prioritised)

1. `learn-from-the-test.md` L81 + `bosser-strategy:content-strategy-agentic-engineering-101.md` L402 — reattribute "Sandwich" article (correction #1).
2. `what-packaging-is.md` L24 — soften Cherny three-shape framing (correction #2).
3. `what-packaging-is.md` L40 — pull Klaassen 80/20 citation; mark `[SOURCE NEEDED]` until primary pinned (correction #3).
4. `what-packaging-is.md` maintainer block — replace Amp counter-camp pin TODO with `https://ampcode.com/news/handoff` (Oct 2025).
5. `what-packaging-is.md` L12 — reframe Ronacher attribution as our synthesis of his practice rather than "his three-pattern" (correction #6).

All numeric claims (Curran post + Intercom plugin numbers + Ramp 350) are verified within freshness. The corrections concentrate on attribution slippage, not on the underlying evidence.
