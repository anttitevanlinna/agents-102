# Workflow composition — Cycle 3 confirmation

Research question: do the five practitioner approaches + Ronacher hold up against live evidence as of 2026-05-21?
Date: 2026-05-21
Cycle: 3 (source-verification pass)
Freshness window: since 2025-11-21

## Per-lineage verdict

### Klaassen lineage

- URL live: **Y** — https://github.com/EveryInc/compound-engineering-plugin [practitioner direct, vendor venue] resolves; README lists `/ce-strategy`, `/ce-ideate`, `/ce-brainstorm`, `/ce-plan`, `/ce-work`, `/ce-debug`, `/ce-code-review`, `/ce-compound`, `/ce-product-pulse`, `/ce-setup`. The "37 skills + 51 agents" count cited in OODA 2A is reproduced in the README (self-reported by vendor in own repo).
- Distinctive move accurate: **Y, partial.** The phase-chain shape (plan → work → review → compound) and the file-paths-as-contract claim hold. **However, the `lfg` slash command is NOT named in the public README.** OODA 2A may have surfaced it from earlier plugin content or a deeper file. Without re-confirming `lfg/SKILL.md` live, the claim that `lfg` chains `ce-plan` → `ce-work` → `ce-code-review` → `ce-test-browser` → `ce-commit-push-pr` should be hedged or replaced with `/ce-plan` → `/ce-work` → `/ce-code-review` → `/ce-compound` as the visible chain. `ce-test-browser` and `ce-commit-push-pr` are likewise unconfirmed at this URL.
- Quote verified: **Drifted.** The oft-cited *"A good compound note means the next agent does not have to learn the same lesson from scratch"* was NOT returned from the plugin README or the Every.to compound-engineering post. The closest verbatim Klaassen/Shipper sentence from Every.to is: *"We take what we learned in any of the previous steps—bugs, potential performance issues, new ways of solving particular problems—and record them so that the agent can use them next time."* Either swap the quote or attribute the current phrasing as paraphrase.
- Freshness: **OK on the plugin (active repo).** Klaassen's own-byline Every.to post is dated mid-2025; falls into "past freshness window" but this is already a known, flagged gap.
- **Recommended fix:** Use the four steps verifiable from the README (`ce-plan` → `ce-work` → `ce-code-review` → `ce-compound`) rather than the five-step chain, or hedge with "the canonical chain on the plugin's README is roughly". Swap the compound-note quote for the Every.to verbatim above, or drop the direct quote and paraphrase ("Klaassen frames `ce-compound`'s job as recording lessons so the next agent uses them, not re-derives them") — a paraphrase doesn't need a verbatim source. Confirm `lfg/SKILL.md` exists before naming it; if not present on the public plugin, refer to "the orchestrator skill the plugin ships" instead.

### Cherny lineage

- URL live: **Y** — howborisusesclaudecode.com [practitioner analysis, fan-curated digest by @CarolinaCherry] resolves; subagents (`code-simplifier`, `verify-app`, `code-architect`, `build-validator`, `oncall-guide`) and the `/go` composite are confirmed on the page. Page also references `/goal` (added 2026-05-12), so the canonical page is actively maintained. (Note 2026-05-21: byline-check failure documented; the page is a fan compilation, not Cherny-direct. Synthetic framings on the page attribute to the digest, never to Cherny himself.)
- Distinctive move accurate: **Y.** Phase pipeline across worktrees, subagents-per-phase, `/go` as composite — all confirmed.
- Quote verified: **Drifted.** The oft-cited *"Coding becomes a pipeline of phases. Each phase benefits from a different mind."* does NOT appear verbatim on howborisusesclaudecode.com. A third-party write-up (dev.to / Karol Zieminski Substack) [UNVERIFIED SOURCE — URL not pinned this cycle] *paraphrases* Cherny as "coding as a pipeline of phases: spec, draft, simplify, verify. Each phase benefits from a different mind." This is a write-up author's framing, not Cherny's direct words. **Risk**: attributing the quote as Cherny's verbatim phrasing is an evidence-ladder slippage — [practitioner direct] when the source is actually [practitioner analysis].
- Freshness: **OK** — canonical page actively maintained through 2026-05-12.
- **Recommended fix:** Drop the quote marks around "Coding becomes a pipeline of phases" and paraphrase instead: *Cherny's frame: coding as a pipeline of phases — spec, draft, simplify, verify — each phase served by a different specialised mind.* Cite [practitioner direct] for the page itself and [practitioner analysis] for the framing.

### Pocock lineage

- URL live: **Y** — github.com/mattpocock/skills [practitioner direct] resolves; `to-prd`, `to-issues`, `handoff`, `write-a-skill`, `setup-matt-pocock-skills` all present. Repo has grown well beyond the earlier snapshot (now includes `diagnose`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `tdd`, `zoom-out`, `prototype`, `caveman`, `grill-me`, `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`).
- Distinctive move accurate: **Y.** No `compose`/orchestrator skill, weakly-coupled toolkit shape confirmed.
- Quote verified: **Drifted / paraphrase.** *"Design your process, encode it as skills, let the agent ride the rails you laid"* was NOT returned from the GitHub README. Search results surface the phrase as commentary from third-party write-ups (Medium / Tosea / byteiota) [UNVERIFIED SOURCE — URLs not pinned this cycle] attributed to Pocock's philosophy, not as a verbatim quote from him. The "YOLO vs OH NO" framing also appears in commentary, not in the repo README.
- Freshness: **OK** — repo crossed 48k stars in late April 2026; actively maintained.
- **Recommended fix:** Drop the quote or find a verbatim Pocock source (his Twitter/X, a Total TypeScript post). Safer: paraphrase — *Pocock's framing is rails not chains — the human picks the chain at runtime, each skill stays standalone and copy-pasteable.* This drops the quoted-as-verbatim claim.

### Cognition lineage

- URL live: **Y** — cognition.ai/blog/multi-agents-working [practitioner direct, vendor venue] resolves. **Byline is Walden Yan, dated 2026-04-22.** Operational/structural claims (writes single-threaded, advisor pattern) treated as evidence per the practitioner-on-own-venue evidentiary rule; the *"2 bugs per PR, 58% severe"* metric flagged as vendor-self-reported until independently corroborated.
- Distinctive move accurate: **Y.** "Writes stay single-threaded; additional agents contribute intelligence" is verbatim from the post. Single writer + advisor agents shape confirmed.
- Quote verified: **PARTIAL drift.** The commonly cited phrasing is *"2 bugs per PR, 58% severe (logic errors, missing edge cases)"*. Verbatim from the post: *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe"*. The "logic errors, missing edge cases" parenthetical is paraphrase / not in that sentence. Recommend tightening to the verbatim shape and dropping the parenthetical, or attributing the parenthetical as added gloss.
- Freshness: **OK** (2026-04-22, within window).
- **Recommended fix:** Clarify the date (2026-04-22) and author (Walden Yan) in the lead-in or attribution line. Rewrite the quote to verbatim: *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe."* Drop the in-quote parenthetical; if the gloss is desired, move it outside the quote marks.

### Amp lineage

- URL live: **Y** — both ampcode.com/news/handoff [practitioner analysis, anonymous team byline] (2025-10-23) and ampcode.com/notes/feedback-loopable [practitioner direct, vendor venue] (Lewis Metcalf, 2026-02-05) resolve. Quote about `/handoff` analysing thread and generating prompt + relevant files is verbatim. Per practitioner-on-own-venue rule, Metcalf's methodology framing is evidence; the anonymous-byline handoff post is one step removed.
- Distinctive move accurate: **Y.** Vendor-shipped primitives, `/handoff` replaces compaction, Feedback Loopable three-part framing all hold.
- Quote verified: **OK** for the verbatim Amp text. The Feedback Loopable three-part (Playground + Experiments + Verification Loop) is supported by Metcalf's own framing.
- Freshness: `/handoff` post past 6-month window (2025-10-23, freshness cutoff 2026-04-23). Supplementary explicitly handles this in maintainer block — flagged as historical context; fine.
- **Recommended fix:** None on URL/quote. Optional: add Metcalf byline to the Feedback Loopable reference (parallel to the Yan attribution above).

### Ronacher (counter-voice)

- URL live: **Y.** Both https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ [practitioner direct] and https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ [practitioner direct] resolve. (WebFetch initially surfaced `armin.ronacher.me` for the bottleneck post; both domains appear to serve the same content — `lucumr.pocoo.org` is canonical and is what the search results consistently link to.)
- Distinctive move accurate: **Y.** "If the machine writes the code, the machine better review the code" is verbatim in *The Final Bottleneck*. Argument that composition throttles inflow rather than multiplying throughput is faithful.
- Quote verified: **One quote misattributed to the wrong post.** *"I throw skills away if I don't need them"* is verbatim, BUT it's from https://lucumr.pocoo.org/2026/1/31/pi/ [practitioner direct] (*Pi: The Minimal Agent Within OpenClaw*, 2026-01-31), NOT from either of the two posts cited above. That "Where to start" source list omits the Pi post entirely.
- Freshness: All three posts within window (2026-01-18, 2026-01-31, 2026-02-13).
- **Recommended fix:** Add the Pi post — `[Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/)` — as the source for the disposable-skills move. That resolves the quote attribution cleanly.

## Missing lineages assessment

- **Willison-section: N (standalone lineage), but he stays a counted data point in Cycle 1A.** Keep this distinction explicit across files so the two treatments aren't read as contradictory: Cycle 1A counts Willison toward the parallel-agents-in-worktrees and verifier/empirical-use-test moves (he's one of N there) because he describes firing four agents in parallel and validating by use. He does NOT anchor a standalone lineage section here, because that requires a distinct composition primitive he *ships*, and his published output on composition is editorial/analytical (L1 reading by this auditor) rather than a named primitive. Both hold at once: contributing data point ≠ standalone lineage. Keep as supporting voice (the "normalization of deviance" pointer in Ronacher's section) pending a post where he describes his own workflow with composition primitives he's built. If a future audience needs a security/risk-of-composition section, promote Willison then.
- **Husain/Shankar evals-lineage: N.** Evals are a different primitive — they're how you measure agent quality, not how you compose workflows. Worth separate treatment; doesn't belong in the composition walk.
- **Charles/Ramp lineage: N for an individual-contributor audience.** This is enterprise-org-shaped (Dojo marketplace, internal agent registry) rather than IC-shaped. Worth carrying as a TODO for an engineering-management variant.
- **Curran/Intercom lineage: N for an individual-contributor audience.** Same reasoning as Ramp — plugin marketplace + agent oversight at platform-team scale is engineering-management-shaped. Curran on `ideas.fin.ai` is also vendor-venue (per the 2026-05-14 byline rule), which adds a separate evidence-ladder caveat.
- **Sottiaux or other named practitioner: N surfaced.** Search didn't surface a fresh-window composition move with a distinctive primitive from Sottiaux.

## Overall verdict

- Approach count holds at **5 + 1** as a curated sample, not a convergence finding. Klaassen / Cherny / Pocock / Cognition / Amp surface five distinct practitioner patterns — each backed by a single source (L2 supporting evidence, not L3 convergence which requires 10–20 independent practitioners on the same pattern). Ronacher as the counter-voice is load-bearing. Consolidating to 4+1 would lose the architectural-shape contrast; expanding to 6+1 with Willison/Ramp/etc. would dilute. Hold at 5+1 as the curated sample shape.
- Confidence, split into two dimensions:
  - **URL and quote fidelity: high.** URLs resolve; verbatim quotes verified against the cited posts (with the drift-fixes named in the punchlist).
  - **Evidence level for compositional pattern convergence: L2.** Each of the five approaches is backed by a single practitioner source; 10–20 independent practitioners reporting the same pattern would be required for L3 convergence. This walk should be framed as a curated sample, not as a convergence finding — that framing must hold.
- **Confirmation-bias guard — partial.** This cycle verified that the five named approaches hold (a confirm-the-existing-set walk); it did NOT run a dedicated search for practitioners who tried these composition patterns and then reversed course or found them ineffective. Ronacher is the one disconfirming anchor carried, and he argues throttling-not-multiplication rather than "composition doesn't work." Before the curated sample is leaned on for exercise design, run one counter-search pass ("practitioners who abandoned skill/subagent composition") so the absence of reversers is evidenced, not assumed.
- Material risk if shipped as-is: **quote-attribution drift** is the named risk. A student or trainer who looks up *"Coding becomes a pipeline of phases"* on howborisusesclaudecode.com and doesn't find it loses trust in the source. Same risk for the Klaassen and Pocock quotes. Evidence-ladder slippage from [practitioner direct] to [practitioner analysis] without the relabel is the rule that fires.

## Punchlist of source-verification fixes (priority-ordered)

1. **Fix Ronacher source list (highest priority — quote-attribution error).** Add `https://lucumr.pocoo.org/2026/1/31/pi/` as the source for the *"I throw skills away if I don't need them"* quote. Currently the quote is in the body but its source isn't in the "Where to start" list. This is a verbatim quote attributed to a verifiable post — easy fix, high-trust-protective.
2. **Cherny quote — drop quote marks, paraphrase.** The verbatim phrasing isn't on the canonical page; it's a third-party write-up's framing. Either find the exact source on Cherny's own writing/talks or rephrase as a gloss. Same fix shape for the Pocock quote.
3. **Klaassen quote + chain — tighten to verifiable.** Either narrow the chain to README-verifiable steps (`ce-plan` → `ce-work` → `ce-code-review` → `ce-compound`) and drop `lfg` / `ce-test-browser` / `ce-commit-push-pr` if they don't live at confirmable paths, or hedge as "the orchestrator skill the plugin ships". Replace the compound-note quote with the Every.to verbatim or a paraphrase.
4. **Cognition quote — tighten to verbatim.** Use *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe"* and move the parenthetical gloss outside the quote. Add the Walden Yan byline + 2026-04-22 date to the lead-in.
5. **Source-verification list — add the Pi post.** The source-verification block should list the Pi post as a third Ronacher entry, and the disposable-skills attribution should point at the right URL.
6. **Optional polish:** add the Metcalf byline parallel to the Yan byline addition. Note the 2026-05-12 update-stamp for Cherny's section so future verification passes know the canonical page is actively maintained (saves a re-verify pass).
