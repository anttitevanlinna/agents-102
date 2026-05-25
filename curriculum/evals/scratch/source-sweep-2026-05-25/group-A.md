# Source sweep — Group A (M5 numbers cluster)

Auditor run: 2026-05-25. Window for "current evidence": published on/after ~2025-11-25.
Files: `what-packaging-is.md`, `the-loop-has-a-name.md`, `story-of-module-6.md`, `learn-from-the-test.md`.

Verdict legend: OK · CAVEAT · CORRECT (body drifted, fix given) · GONE · STALE · NEEDED · BLOCKED.

---

## 1. Ronacher MiniJinja port — `what-packaging-is.md`

- **file:line** what-packaging-is.md:14, :99, :110; reference at story-of-module-6 none; learn-from-the-test.md:175.
- **Body attribution/claim** "In Ronacher's MiniJinja port, the original Rust snapshot tests played [the reference] role." Numbers tracked: 10h, 2.2M tokens.
- **URL** https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **Verdict: OK — [practitioner direct].**
- **Found** Byline Armin Ronacher. Date 2026-01-14. Confirmed: Rust→Go port driven by a coding agent; the `insta` `.snap` snapshot tests are the verifier the agent diffs against. Numbers verbatim: 10 hours total (3 supervised), 2.2 million tokens. Date is ~4.5 months old — just outside the 6-month *current-evidence* line is NOT crossed (2026-01-14 is after 2025-11-25), so it still counts as current. The three-pattern (reference / plan-equivalent / verifier) is cleanly inferable from the snapshot-test harness + skip-list tooling, as the body claims.
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Rust→Go port, snapshot tests as verifier, 10h/2.2M tokens. fallback: if gone, cite as named-practitioner long-run with reused test-suite-as-verifier, drop the exact numbers.`

---

## 2. Cherny "three stop-hook shapes" — `what-packaging-is.md` (BLOCK)

- **file:line** what-packaging-is.md:24, :100, :111; learn-from-the-test.md:176, :183.
- **Body attribution/claim** L24: "All three appear in Boris Cherny's stop-hook practice (Cherny built Claude Code); the menu form is the synthesis." Maintainer block L100/L111 asserts: *"The 'three shapes' framing is Cherny's own, NOT our paraphrase."*
- **URLs** https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually (John Kim, 2026-02-21); https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny (Gergely Orosz, 2026-03-04 — file says 2026-03-04, page reads Mar 4 2026).
- **Verdict: CORRECT — [practitioner analysis] (Kim on Cherny).** The three-shape taxonomy is the INTERVIEWER's synthesis, not Cherny's own framing.
- **Found** getpushtoprod byline is **John Kim**, date 2026-02-21. The three shapes appear in Kim's numbered "13 tips from Boris Cherny": *"For very long running tasks, Boris either prompts Claude to verify its work with a background agent when it's done, uses an agent-stop hook for deterministic verification, or uses the Ralph Wiggin plugin for autonomous looping."* This is Kim's list-structure and Kim's editorialising (immediately preceded by Kim's own "I'm less bullish on fully autonomous loops"). It is **[practitioner analysis]**, attributed "John Kim on Cherny," NOT Cherny-authored taxonomy. The Pragmatic Engineer / Orosz piece (2026-03-04) does **NOT** contain the three-shape taxonomy at all — verification passages of this type are absent. Local `observations/boris-cherny.md` likewise has no three-shape taxonomy (it records only "Stop hooks turn verification into determinism" from the AI&I transcript). So the file's own maintainer-block claim that the framing is "Cherny's own, NOT our paraphrase" is exactly backwards. This is the 2026-04-25 prior finding — it was NOT fixed; the source block was instead edited to assert the wrong direction.
  - The three SHAPES the curriculum teaches (background-agent / shell-hook / Ralph re-feed) are still a legitimate menu — they're real and practitioner-grounded. Only the *attribution* ("Cherny's own three-shape framing") is wrong.
- **EXACT proposed body fix**
  - L24, replace: *"All three appear in Boris Cherny's stop-hook practice (Cherny built Claude Code); the menu form is the synthesis."* → *"All three appear in Cherny's long-running practice as written up by John Kim (getpushtoprod), who lists them as the three things Cherny reaches for; the menu form is Kim's synthesis, not Cherny's own taxonomy."*
  - Maintainer block L100, replace the sentence *"The 'three shapes' framing is Cherny's own, NOT our paraphrase"* → *"The 'three shapes' framing is John Kim's synthesis of Cherny's practice (getpushtoprod, 2026-02-21), NOT Cherny's own stated taxonomy and NOT present in the Orosz/Pragmatic Engineer interview. Label [practitioner analysis], attribute 'Kim on Cherny.'"*
  - L111 framework line, replace *"Cherny's three stop-hook shapes — Boris Cherny [practitioner direct]. Shape-count confirmed his own framing 2026-05-25"* → *"Cherny's three stop-hook shapes — synthesised by John Kim on Cherny [practitioner analysis], getpushtoprod 2026-02-21. NOT Cherny's own framing; absent from the Orosz interview."*
- `- ` `[checked:2026-05-25 result:CORRECT due:asap]` ` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim's 13-tips synthesis lists Cherny's three long-run moves (background-agent / agent-stop hook / Ralph Wiggin plugin); taxonomy is Kim's, not Cherny's. fallback: present the three verifier shapes as a practitioner-convergent menu with no single attribution; drop "Cherny's own framing."`

---

## 3. Curran / Intercom "2x, nine months later" — `what-packaging-is.md`

- **file:line** what-packaging-is.md:54-56, :78, :101, :112; learn-from-the-test.md:177.
- **Body attribution/claim** L56: "Darragh Curran (CTO, Intercom) published a post in April 2026 called '2x, nine months later.' ... 19.2% of pull requests are auto-approved (no human reviewer). Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of auto-approved PRs are 20 lines or fewer." L78 "500-person R&D org."
- **URL** https://ideas.fin.ai/p/2x-nine-months-later
- **Verdict: CAVEAT — [practitioner direct, vendor venue].** Numbers verbatim; venue is Intercom's own surface so the metrics are vendor-self-reported (flag, don't drop). Minor wording nit on title and headcount.
- **Found** Byline Darragh Curran (Intercom). Date 2026-04-16 — within window. All four numbers verbatim: "19.2% of all merged PRs auto-approved with no human reviewer in the loop"; "median of 14.6 minutes compared to the org median of 75.8 minutes"; "Eighty-six percent of auto-approved PRs are 20 lines or fewer." Org size: **~473 R&D within 1,305 total** (page) — matches `observations/intercom.md` line 41/20 (~500 R&D, ~1,305 total, 497 fully-autonomous PRs). Two soft nits: (a) Curran's title — the post is on Intercom's engineering surface; he is widely listed as VP/SVP Engineering, not "CTO." Low-stakes but flag. (b) Title rendering: file uses "2x, nine months later" and "2x – nine months later: We did it" interchangeably (L56 vs L101) and the-loop file uses an em-dash variant — cosmetic, harmonise.
- **Cross-file note** the-loop-has-a-name.md:26 says "around 470 people inside a 1,300-person company" — accurate to 473/1,305. what-packaging-is.md says "500-person" (looser round of 473). Both defensible; "~470 / ~1,300" is the tighter pair. Not a CORRECT, but recommend normalising to "~470-person R&D inside a ~1,300-person company" across both files for one consistent figure.
- **Proposed fix (optional, CAVEAT-level)** L56 "Darragh Curran (CTO, Intercom)" → "Darragh Curran (VP Engineering, Intercom)" (verify exact title at delivery). Keep the four numbers; they are correct. Tag the metrics vendor-self-reported in the maintainer block (already noted L177).
- `- ` `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` ` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2% auto-approved, 14.6 vs 75.8 min, 86% ≤20 lines, ~473 R&D / 1,305 total. Metrics vendor-self-reported. fallback: keep numbers, attribute "Intercom's own published R&D telemetry," flag self-report.`

---

## 4. Huntley Ralph technique — `what-packaging-is.md` (BLOCK)

- **file:line** what-packaging-is.md:16 (body), :52 (body), :102, :113.
- **Body attribution/claim** L16: "Geoffrey Huntley's Ralph technique builds entire ticket-triage systems on this single primitive." L52: "The original Ralph reconstructs fresh sessions continuously, letting each one give up and rebuilding from the durable state."
- **URL** https://ghuntley.com/ralph/
- **Verdict: CORRECT (L16 only) — [practitioner direct].** L52 is accurate. L16 mischaracterises Ralph.
- **Found** Byline Geoffrey Huntley. Date 2025-07-14 (historical-foundational, outside 6-month window — body cites as technique-origin, not current evidence, which is fine). Bash loop verbatim: `while :; do cat PROMPT.md | claude-code ; done`. Huntley explicitly positions Ralph for **greenfield**: "Ralph can replace the majority of outsourcing at most companies for greenfield projects," and states **"There's no way in heck would I use Ralph in an existing code base."** The post contains **no mention of ticket-triage systems**. So L52 (fresh-sessions over durable markdown state) is ACCURATE; L16 ("builds entire ticket-triage systems") is INACCURATE — both the ticket-triage characterisation and the implied existing-codebase usage contradict the source. The file already self-flags this (L102/L113); confirming it is a real body error needing the edit, not just a watch.
- **EXACT proposed body fix** L16, replace: *"Geoffrey Huntley's Ralph technique builds entire ticket-triage systems on this single primitive."* → *"Geoffrey Huntley's Ralph technique bootstraps entire greenfield projects on this single primitive — a Bash loop re-feeding one prompt against durable markdown state."*
- `- ` `[checked:2026-05-25 result:CORRECT due:asap]` ` https://ghuntley.com/ralph/ — [practitioner direct] Huntley 2025-07-14: Ralph is greenfield-only ("no way in heck would I use Ralph in an existing code base"), Bash loop over durable markdown; no ticket-triage. Historical-foundational, dated. fallback: cite as origin of the loop-prompt-over-durable-state technique; drop any application claim.`

---

## 5. Sourcegraph Amp counter-philosophy — `what-packaging-is.md`

- **file:line** what-packaging-is.md:70, :103, :115.
- **Body attribution/claim** L70: "Sourcegraph's Amp (their coding-agent product, October 2025) explicitly rejects auto-compaction and bets on short focused sessions plus manual handoff between them."
- **URL** https://ampcode.com/news/handoff
- **Verdict: OK (dated) — [practitioner direct from a vendor — acceptable for naming a counter-camp].** Body inline-dates "October 2025"; used as dated context, not current evidence.
- **Found** Amp (Sourcegraph). Date 2025-10-23. Rejects auto-compaction in favour of focused threads + manual handoff: *"What we want to encourage are focused threads, because we think that's how agents yield the best results."* Stance matches the body. Date is ~7 months old → past the 6-month current-evidence window, but the body explicitly dates it and frames it as a known counter-camp, not fresh evidence — acceptable. Watch: escalate to a fresher Amp post if their public stance shifts by delivery.
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://ampcode.com/news/handoff — [practitioner direct, vendor] Amp 2025-10-23 rejects auto-compaction, bets on focused threads + manual handoff. Inline-dated, counter-camp framing. fallback: name the handoff camp generically as a real practitioner stance, drop product name.`

---

## 6. Klaassen TDD quote + 80/20 ratio — `what-packaging-is.md` (80/20 = NEEDED, BLOCK)

- **file:line** what-packaging-is.md:62 (two distinct claims), :104.
- **Body attribution/claim** (a) TDD quote: Klaassen (August 2025): *"Claude writes the test. The test fails, the natural first step in test-driven development (TDD)"* linked to *My AI Had Already Fixed the Code Before I Saw It*. (b) 80/20: "The ratio practitioners take from Kieran Klaassen's compound-engineering posture: roughly 80% planning and review, 20% execution." — **no URL pinned.**
- **URLs** (a) https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it ; (b) UNPINNED in body.
- **Verdict:** (a) **OK (dated) — [practitioner direct, vendor venue].** (b) **NEEDED — primary source exists but is not pinned in the body.**
- **Found (a)** Byline Kieran Klaassen, date 2025-08-18 (no update shown on the page; local file claims an Apr 2026 update timestamp — could not see it on fetch, treat origin date 2025-08-18). Quote verbatim on page: *"Claude writes the test. The test fails—the natural first step in test-driven development (TDD)."* (the curriculum renders the em-dash as a comma — meaning preserved). Also confirmed on the same page: runs the test **10 times** ("So I have Claude run the test 10 times..."), and parallel per-feedback agents ("a dedicated agent for each piece of reviewer feedback"). 2025-08-18 is past the 6-month window; body inline-dates "August 2025" → dated context, OK.
- **Found (b)** The 80/20 ratio does NOT appear in *My AI Had Already Fixed* (fetched — absent), NOT in *Compound Engineering: The Definitive Guide* (Klaassen, 2026-02-09 — fetched, absent from the available text), and NOT verbatim in Entis's *Bread in the AI Sandwich*. The real primary is ***Compound Engineering: How Every Codes With Agents*, Dan Shipper and Kieran Klaassen (Every / Chain of Thought; page date 2026-01-30, local file logs Dec 2025 origin, joint byline)**, which states verbatim: *"Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound."* Joint byline → practitioner-direct for Klaassen. This confirms the 2026-04-25 prior finding: the ratio is NOT in the Definitive Guide. The body's hedge ("the ratio practitioners take from Klaassen's posture") is defensible, but the maintainer block leaves it unsourced and L104 even suggests swapping to the Definitive Guide — which would pin it to an article that doesn't contain it.
- **EXACT proposed body fix** Pin the ratio to its primary. L62, after "roughly 80% planning and review, 20% execution" add citation: *([Compound Engineering: How Every Codes With Agents](https://every.to/source-code/compound-engineering-how-every-codes-with-agents-af3a1bae-cf9b-458e-8048-c6b4ba860e62), Shipper & Klaassen, Jan 2026: "Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound.")*. In maintainer block L104, delete the suggestion to swap the 80/20 to the Definitive Guide (it isn't there) and replace with the How-Every-Codes URL above. Note the source says "work and compound" for the 20%, not "execution" — the gloss is close; optionally reword body to "20% execution-and-compound."
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18, TDD "the test fails—the natural first step in test-driven development (TDD)" verbatim; 10-consecutive-runs + parallel feedback agents confirmed. Dated context. fallback: paraphrase the TDD-first move, drop the verbatim quote.`
- `- ` `[checked:2026-05-25 result:NEEDED due:asap]` ` https://every.to/source-code/compound-engineering-how-every-codes-with-agents-af3a1bae-cf9b-458e-8048-c6b4ba860e62 — [practitioner direct] Shipper & Klaassen Jan 2026: "Roughly 80 percent ... plan and review ... 20 percent ... work and compound" — pin THIS for the 80/20 (NOT the Definitive Guide, which lacks it). fallback: keep "practitioners take from Klaassen's posture" hedge, cite this URL.`

---

## 7. Hook event names / "fires on every named event" — `what-packaging-is.md`

- **file:line** what-packaging-is.md:34, :118.
- **Body attribution/claim** Hook events: session start, prompt submit, before/after each tool call, on stop. "The runtime fires the script; the agent has no say." Maintainer L118 pins event names (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop) to Claude Code 2.1.142 + repo settings.
- **URL** https://code.claude.com/docs/en/hooks (operational docs).
- **Verdict: OK — operational platform fact, not evidence-bearing.** Per sweep scope (operational docs URLs are skipped). Event-name accuracy is a platform-currency check, already live-verified in the maintainer block 2026-05-15 against repo configs. No source-verification action. Noted for completeness only.

---

## 8. Subagents-for-isolation + /compact-at-60% convergent pattern — `what-packaging-is.md`

- **file:line** what-packaging-is.md:50, :52, :105, :114.
- **Body attribution/claim** "Some practitioners suggest manual `/compact` at around 60%." Convergent, no single attribution; maintainer block ties it to internal OODA file `2026-04-23-scaling-session-length-2-platform-mechanics.md` with a "three independent practitioners" backing claim.
- **URL** none (no-URL convergent-pattern claim; internal OODA file).
- **Verdict: NEEDED (internal-backing must be confirmed at finalisation).** No public source pinned, which is fine for a convergent-pattern claim, but the "three independent practitioners" count must be backable when the OODA file is finalised; if it drifts, reword to "some practitioners."
- `- ` `[checked:2026-05-25 result:NEEDED due:asap]` ` (no URL — internal OODA 2026-04-23-scaling-session-length-2-platform-mechanics.md) — [convergent practitioner pattern] /compact-at-~60% + subagent isolation; confirm ≥3 independent practitioners back it at OODA finalisation. fallback: reword to "some practitioners suggest" with no count.`

---

## 9. Curran/Intercom in `the-loop-has-a-name.md`

- **file:line** the-loop-has-a-name.md:26, :70, :75.
- **Body attribution/claim** "Darragh Curran runs engineering at Intercom. In April he published ... '2x, nine months later.' 19.2% ... auto-approved with no human reviewer ... 14.6 minutes versus an org median of 75.8 minutes. 86% ... 20 lines or fewer. The R&D org is around 470 people inside a 1,300-person company."
- **URL** https://ideas.fin.ai/p/2x-nine-months-later (same as #3).
- **Verdict: OK / CAVEAT — [practitioner direct, vendor venue].** All four numbers verbatim; 470/1,300 is the tighter (and accurate) figure vs the other file's "500." "Runs engineering at Intercom" sidesteps the CTO/VP title issue cleanly — keep this phrasing; it's better than what-packaging-is.md's "CTO." Metrics vendor-self-reported (flag).
- `- ` `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` ` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2%/14.6 vs 75.8/86% ≤20 lines, ~473 R&D in 1,305. "Runs engineering" phrasing avoids the title nit. fallback: keep numbers, attribute Intercom's published telemetry, flag self-report.`

---

## 10. Ramp marketplace + "harness was the bottleneck" — `the-loop-has-a-name.md`

- **file:line** the-loop-has-a-name.md:68, :69, :74. (Body itself currently uses generic "hundreds of skills"; numbers live in maintainer to-verify block.)
- **Body attribution/claim** Maintainer block: Ramp plugin marketplace "hundreds of skills" (strategy doc names 350); "harness was the bottleneck" framing attributed to Ramp engineering.
- **URL** x.com/geoffintech/status/2042002590758572377 (Geoff Charles, CPO, 2026-04-09) — per `observations/ramp.md` line 4.
- **Verdict: BLOCKED (public primary) + CAVEAT (internal-confirmed).** The X primary is paywalled/access-walled (HTTP 402 on prior checks of the same handle's posts); could not open. Internal `observations/ramp.md` confirms both claims practitioner-direct.
- **Found** `observations/ramp.md` line 24: "350+ skills shared"; line 38 "Dojo, an internal skills marketplace (350+ skills)"; line 36 verbatim Charles quote: *"Despite hitting 90%+ adoption of AI tools across the company, most people were stuck on a basic chat interface. The models were good enough. The harness wasn't."* Charles is CPO [practitioner direct], dated 2026-04-09. So the marketplace number (350+) IS backable to a primary observation, and the "harness wasn't [good enough]" framing is Charles's verbatim line — but the public X URL is access-walled, so it cannot be independently opened here. Did not attempt a second fetch beyond the known-walled handle (2-attempt cap respected). The exact framing in the body ("harness was the bottleneck, not the model") is a paraphrase of Charles's "The models were good enough. The harness wasn't" — see #11, same drift pattern; if the body asserts the paraphrase as a quote, reword.
- **Proposed fix** Body may restore "350-skill marketplace" (backed by `ramp.md`); keep the "harness was the bottleneck" idea but attribute as Charles's framing in his words: *"The models were good enough. The harness wasn't."* (Geoff Charles, CPO), not as the paraphrase.
- `- ` `[checked:2026-05-25 result:BLOCKED due:carry-2026-04-09]` ` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO 2026-04-09, "models were good enough, the harness wasn't" + 350+ skill Dojo; X access-walled, confirmed via observations/ramp.md. fallback: attribute the verbatim Charles line from the observation file; if number contested, use "hundreds of skills."`

---

## 11. Geoff Charles verbatim quote — `story-of-module-6.md`

- **file:line** story-of-module-6.md:29, :75, :93.
- **Body attribution/claim** The Story tells how Claude shipped a paraphrase *"the harness was the bottleneck, not the model"* as if it were Ramp's words, and source-verify caught the real line: *"The models were good enough. The harness wasn't."* The lesson IS the drift between the two.
- **URL** x.com/geoffintech/status/2042002590758572377 (Charles, 2026-04-09).
- **Verdict: CAVEAT / BLOCKED-public — [practitioner direct].** Verbatim quote confirmed against internal `observations/ramp.md` line 36; public X primary access-walled (402 on prior checks). Disposition already flagged NEEDS-MAINTAINER in the file.
- **Found** `observations/ramp.md` line 36 carries the exact line *"The models were good enough. The harness wasn't."* attributed to Charles (CPO) [practitioner direct, 2026-04-09]. The Story's use is sound: the quote is real and the teaching beat (paraphrase-shipped-as-quote) depends on the exact wording. The only gap is that the sole *public* primary is paywalled. Recommendation: keep the verbatim attribution (internal practitioner-direct observation holds it; the lesson needs the exact words). Past 6-month window note in file is slightly off — 2026-04-09 is WITHIN the window as of 2026-05-25 (the file says "Past 6-month window — dated historical context"; that's wrong, it's current). Minor: drop the "past 6-month window" line for this quote; 2026-04-09 is current.
- **Proposed fix (freshness label)** story-of-module-6.md:93, delete *"Past 6-month window — dated historical context; freshness re-check at delivery."* (the quote is dated 2026-04-09, inside the window). Keep the NEEDS-MAINTAINER disposition on the paywalled-public-primary question.
- `- ` `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` ` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO 2026-04-09 "The models were good enough. The harness wasn't." Confirmed via observations/ramp.md L36; public X access-walled. Within freshness window. fallback: fire the file's documented reframe — "Ramp's engineers' framing converges on: the harness was the bottleneck, not the model" — drop the named verbatim quote.`

---

## 12. story-of-module-6.md `/schedule` platform fact

- **file:line** story-of-module-6.md:31.
- **Body claim** "/schedule is Routines, remote, cloud-based. Desktop local tasks are a separate primitive."
- **Verdict: OK — operational platform fact, out of evidence scope.** Skipped per sweep rules (platform-currency, not a practitioner/number/quote claim). Cross-ref: the-loop-has-a-name.md:34 makes the same distinction; maintainer block there (L71) already routes it to a capability re-check. No source-verification action.

---

## 13. learn-from-the-test.md pre-read links

- **file:line** learn-from-the-test.md:10, :98, :111, :178.
- **Body attribution/claim** Three pre-reads: (a) "Laura Entis on Kieran Klaassen, *You're the Bread in the AI Sandwich*"; (b) "Kieran Klaassen, *Compound Engineering: The Definitive Guide*"; (c) "Kieran Klaassen, *My AI Had Already Fixed the Code Before I Saw It*" with claim that Klaassen "runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel."
- **URLs** (a) https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich ; (b) https://every.to/source-code/compound-engineering-the-definitive-guide ; (c) https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it
- **Verdict:** (a) **OK — [practitioner analysis].** (b) **OK — [practitioner direct].** (c) **OK — [practitioner direct, vendor venue].**
- **Found** (a) Byline **Laura Entis** (staff writer at Every), date 2026-04-22, written ABOUT Klaassen (Shipper–Klaassen interview) — NOT Klaassen-authored. The file ALREADY cites it correctly as "Laura Entis on Kieran Klaassen" (L10) and labels it `[practitioner analysis]` (L178). **Prior 2026-04-25 finding = FIXED.** Within window. (b) Byline Kieran Klaassen, date 2026-02-09, resolves, within window — `[practitioner direct]` (the file's `[practitioner direct, vendor venue]` is also fine; Every is a paid pub he co-runs). (c) Byline Klaassen, 2025-08-18; the verifier-10-runs and parallel-feedback-agents claims at L98 are both verbatim-confirmed on the page (see #6). 2025-08-18 origin is outside window but it's a pre-read for recognition, not a load-bearing current stat; acceptable. The L98 claim "runs the verifier 10 consecutive times" — the source says "run the test 10 times," close enough; "consecutive" is a slight gloss but defensible.
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis on Klaassen, 2026-04-22. Byline correctly attributed in file. fallback: cite as Entis write-up of the Shipper–Klaassen interview.`
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct] Klaassen 2026-02-09, resolves, within window. fallback: cite as Klaassen's canonical compound-engineering writeup.`
- `- ` `[checked:2026-05-25 result:OK due:2026-11-25]` ` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18, 10-runs + parallel-feedback-agents verbatim. Dated origin; pre-read for recognition. fallback: paraphrase the reliability-as-measured idea, drop the date claim.`

---

## Result tally

- OK: 7 (Ronacher, Amp, Klaassen-TDD, Entis pre-read, Definitive-Guide pre-read, My-AI pre-read, + hooks/schedule operational noted out-of-scope)
- CAVEAT: 3 (Curran ×2 vendor-venue, Charles verbatim internal-confirmed)
- CORRECT: 2 (Cherny three-shape attribution; Huntley ticket-triage)
- NEEDED: 2 (Klaassen 80/20 unpinned → primary found; /compact-60% practitioner-count)
- BLOCKED: 1 (Ramp X primary access-walled, internal-confirmed)
- GONE: 0 · STALE: 0 (Amp/My-AI dated-but-flagged-in-body, not used as current evidence)
