# Workflow composition — Cycle 3 confirmation

Research question: do the five lineages + Ronacher hold up against live evidence as of 2026-05-21?
Date: 2026-05-21
Cycle: 3 (verification of supplementary)
Freshness window: since 2025-11-21

## Per-lineage verdict

### Klaassen lineage

- URL live: **Y** — https://github.com/EveryInc/compound-engineering-plugin resolves; README lists `/ce-strategy`, `/ce-ideate`, `/ce-brainstorm`, `/ce-plan`, `/ce-work`, `/ce-debug`, `/ce-code-review`, `/ce-compound`, `/ce-product-pulse`, `/ce-setup`. The "37 skills + 51 agents" count cited in OODA 2A is reproduced in the README.
- Distinctive move accurate: **Y, partial.** The phase-chain shape (plan → work → review → compound) and the file-paths-as-contract claim hold. **However, the `lfg` slash command is NOT named in the public README.** OODA 2A may have surfaced it from earlier plugin content or a deeper file. Without re-confirming `lfg/SKILL.md` live, the supplementary's claim that `lfg` chains `ce-plan` → `ce-work` → `ce-code-review` → `ce-test-browser` → `ce-commit-push-pr` should be hedged or replaced with `/ce-plan` → `/ce-work` → `/ce-code-review` → `/ce-compound` as the visible chain. `ce-test-browser` and `ce-commit-push-pr` are likewise unconfirmed at this URL.
- Quote verified: **Drifted.** The supplementary's *"A good compound note means the next agent does not have to learn the same lesson from scratch"* was NOT returned from the plugin README or the Every.to compound-engineering post. The closest verbatim Klaassen/Shipper sentence from Every.to is: *"We take what we learned in any of the previous steps—bugs, potential performance issues, new ways of solving particular problems—and record them so that the agent can use them next time."* Either swap the quote or attribute the current phrasing as paraphrase.
- Freshness: **OK on the plugin (active repo).** Klaassen's own-byline Every.to post is dated mid-2025; falls into "past freshness window" but the supplementary already flags this in maintainer-block TODOs.
- Proposed edits to supplementary:
  - Line 9: replace the explicit five-step chain with the four steps verifiable from README (`ce-plan` → `ce-work` → `ce-code-review` → `ce-compound`), or hedge with "the canonical chain on the plugin's README is roughly".
  - Line 13: swap the quote for the Every.to verbatim above, OR drop the direct quote and paraphrase ("Klaassen frames `ce-compound`'s job as recording lessons so the next agent uses them, not re-derives them") — phrasing under a paraphrase doesn't need verbatim source.
  - Line 11: confirm `lfg/SKILL.md` exists before naming it; if not present on the public plugin, drop the file path and refer to "the orchestrator skill the plugin ships."

### Cherny lineage

- URL live: **Y** — howborisusesclaudecode.com resolves; subagents (`code-simplifier`, `verify-app`, `code-architect`, `build-validator`, `oncall-guide`) and the `/go` composite are confirmed verbatim. Page also references `/goal` (added 2026-05-12), so the canonical page is actively maintained.
- Distinctive move accurate: **Y.** Phase pipeline across worktrees, subagents-per-phase, `/go` as composite — all confirmed.
- Quote verified: **Drifted.** The supplementary's *"Coding becomes a pipeline of phases. Each phase benefits from a different mind."* does NOT appear verbatim on howborisusesclaudecode.com. A third-party (dev.to / Karol Zieminski Substack) write-up *paraphrases* Cherny as "coding as a pipeline of phases: spec, draft, simplify, verify. Each phase benefits from a different mind." This is a write-up author's framing, not Cherny's direct words. **Risk**: attributing the quote as Cherny's verbatim phrasing is an evidence-ladder slippage — [practitioner direct] when the source is actually [practitioner analysis].
- Freshness: **OK** — canonical page actively maintained through 2026-05-12.
- Proposed edits to supplementary:
  - Line 19: drop the quotes around "Coding becomes a pipeline of phases" and paraphrase: *Cherny's frame: coding as a pipeline of phases — spec, draft, simplify, verify — each phase served by a different specialised mind.* Cite [practitioner direct] for the page itself and [practitioner analysis] for the framing.

### Pocock lineage

- URL live: **Y** — github.com/mattpocock/skills resolves; `to-prd`, `to-issues`, `handoff`, `write-a-skill`, `setup-matt-pocock-skills` all present. Repo has grown well beyond the supplementary's snapshot (now includes `diagnose`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `tdd`, `zoom-out`, `prototype`, `caveman`, `grill-me`, `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`).
- Distinctive move accurate: **Y.** No `compose`/orchestrator skill, weakly-coupled toolkit shape confirmed.
- Quote verified: **Drifted / paraphrase.** *"Design your process, encode it as skills, let the agent ride the rails you laid"* was NOT returned from the GitHub README. Search results surface the phrase as commentary from third-party write-ups (Medium / Tosea / byteiota) attributed to Pocock's philosophy, not as a verbatim quote from him. The "YOLO vs OH NO" framing also appears in commentary, not in the repo README.
- Freshness: **OK** — repo crossed 48k stars in late April 2026; actively maintained.
- Proposed edits to supplementary:
  - Line 29: drop the quote OR find a verbatim Pocock source (his Twitter/X, a Total TypeScript post). Safer: paraphrase — *Pocock's framing is rails not chains — the human picks the chain at runtime, each skill stays standalone and copy-pasteable.* Drops the quoted-as-verbatim claim.

### Cognition lineage

- URL live: **Y** — cognition.ai/blog/multi-agents-working resolves. **Byline is Walden Yan, dated 2026-04-22.**
- Distinctive move accurate: **Y.** "Writes stay single-threaded; additional agents contribute intelligence" is verbatim from the post. Single writer + advisor agents shape confirmed.
- Quote verified: **PARTIAL drift.** Supplementary says *"2 bugs per PR, 58% severe (logic errors, missing edge cases)"*. Verbatim from the post: *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe"*. The "logic errors, missing edge cases" parenthetical is paraphrase / not in that sentence. Recommend tightening to the verbatim shape and dropping the parenthetical, or attributing the parenthetical as added gloss.
- Freshness: **OK** (2026-04-22, within window).
- Proposed edits to supplementary:
  - Line 41: clarify date as 2026-04-22 and author as Walden Yan in the lead-in or attribution line.
  - Line 43: rewrite quote to verbatim: *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe."* Drop the in-quote parenthetical; if the gloss is desired, move it outside the quote marks.

### Amp lineage

- URL live: **Y** — both ampcode.com/news/handoff (2025-10-23) and ampcode.com/notes/feedback-loopable (2026-02-05, Lewis Metcalf byline) resolve. Quote about `/handoff` analysing thread and generating prompt + relevant files is verbatim.
- Distinctive move accurate: **Y.** Vendor-shipped primitives, `/handoff` replaces compaction, Feedback Loopable three-part framing all hold.
- Quote verified: **OK** for the verbatim Amp text. The Feedback Loopable three-part (Playground + Experiments + Verification Loop) is supported by Metcalf's own framing.
- Freshness: `/handoff` post past 6-month window (2025-10-23, freshness cutoff 2026-04-23). Supplementary explicitly handles this in maintainer block — flagged as historical context; fine.
- Proposed edits to supplementary: None on URL/quote. Optional: add Metcalf byline to the Feedback Loopable reference (parallel to Yan attribution above).

### Ronacher (counter-voice)

- URL live: **Y.** Both https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ and https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ resolve. (WebFetch initially surfaced `armin.ronacher.me` for the bottleneck post; both domains appear to serve the same content — `lucumr.pocoo.org` is canonical per the supplementary and is what the search results consistently link to.)
- Distinctive move accurate: **Y.** "If the machine writes the code, the machine better review the code" is verbatim in *The Final Bottleneck*. Argument that composition throttles inflow rather than multiplying throughput is faithful.
- Quote verified: **One quote misattributed to the wrong post.** *"I throw skills away if I don't need them"* is verbatim, BUT it's from https://lucumr.pocoo.org/2026/1/31/pi/ (*Pi: The Minimal Agent Within OpenClaw*, 2026-01-31), NOT from either of the two posts the supplementary cites. The supplementary's "Where to start" list omits the Pi post entirely.
- Freshness: All three posts within window (2026-01-18, 2026-01-31, 2026-02-13).
- Proposed edits to supplementary:
  - Line 61: add the Pi post — `[Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/)` — as the source for the disposable-skills move. Line 63's quote attribution then resolves cleanly.

## Missing lineages assessment

- **Willison-lineage as its own section: N.** Willison is correctly placed as a thematic ally inside Ronacher's section (the "normalization of deviance" pointer). His distinctive move on composition specifically is *commentary* — he amplifies Ronacher's argument rather than originating a separate composition pattern. A standalone section would either repeat Ronacher or stretch into Willison's broader LLM commentary, which dilutes the lineage frame. Keep him as a pointer inside Ronacher's section. If a future audience needs a security/risk-of-composition section, promote Willison then.
- **Husain/Shankar evals-lineage: N (for AE101).** Evals are a different primitive — they're how you measure agent quality, not how you compose workflows. Worth a separate supplementary on evals; doesn't belong in the composition walk.
- **Charles/Ramp lineage: N for AE101.** Supplementary's maintainer block already correctly notes this is enterprise-org-shaped (Dojo marketplace, internal agent registry); AE101 audience is IC. Carry the existing TODO for an Engineering-Management variant.
- **Curran/Intercom lineage: N for AE101.** Same reasoning as Ramp — plugin marketplace + agent oversight at platform-team scale is engineering-management-shaped. Curran on `ideas.fin.ai` is also vendor-venue (per the 2026-05-14 byline rule), which adds a separate evidence-ladder caveat. Keep the TODO.
- **Sottiaux or other named practitioner: N surfaced.** Search didn't surface a fresh-window composition move with a distinctive primitive from Sottiaux. If the strategy doc names him, it's likely in a different context (probably an AE101 sponsor or content-strategy reference, not a composition lineage practitioner).

## Overall verdict

- Lineage count holds at **5 + 1**. Klaassen / Cherny / Pocock / Cognition / Amp covers the practitioner shape diversity (paths-as-contract / phase-pipeline-across-worktrees / weakly-coupled-toolkit / single-writer-with-advisors / vendor-primitives). Ronacher as the counter-voice is load-bearing. Consolidating to 4+1 (e.g. folding Amp into a general "vendor primitives" footnote) would lose the architectural-shape contrast; expanding to 6+1 with Willison/Ramp/etc. would dilute. Hold at 5+1.
- Confidence: **medium-high.** URL liveness is high; quote verbatim attribution is the soft spot — three of the five lineages have at least one quote that's either paraphrase-presented-as-verbatim or sourced to a third-party write-up rather than the practitioner direct.
- Material risk if shipped as-is: **quote-attribution drift** is the named risk. A student or trainer who looks up *"Coding becomes a pipeline of phases"* on howborisusesclaudecode.com and doesn't find it loses trust in the supplementary. Same risk for the Klaassen and Pocock quotes. Evidence-ladder slippage from [practitioner direct] to [practitioner analysis] without the relabel is the rule that fires.

## Punchlist of supplementary edits (priority-ordered)

1. **Fix Ronacher source list (highest priority — quote-attribution error).** Add `https://lucumr.pocoo.org/2026/1/31/pi/` as the source for the *"I throw skills away if I don't need them"* quote. Currently the quote is in the body but its source isn't in the "Where to start" list. This is a verbatim quote attributed to a verifiable post — easy fix, high-trust-protective.
2. **Cherny quote — drop quote marks, paraphrase.** Line 19. The verbatim phrasing isn't on the canonical page; it's a third-party write-up's framing. Either find the exact source on Cherny's own writing/talks or rephrase as supplementary's gloss. Same fix shape for Pocock quote at line 29.
3. **Klaassen quote + chain — tighten to verifiable.** Line 9 (chain steps) and line 13 (quote). Either narrow the chain to README-verifiable steps (`ce-plan` → `ce-work` → `ce-code-review` → `ce-compound`) and drop `lfg` / `ce-test-browser` / `ce-commit-push-pr` if they don't live at confirmable paths, or hedge as "the orchestrator skill the plugin ships". Replace the compound-note quote with the Every.to verbatim or paraphrase.
4. **Cognition quote — tighten to verbatim.** Line 43. Use *"Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe"* and move the parenthetical gloss outside the quote. Add Walden Yan byline + 2026-04-22 date to the lead-in (line 41).
5. **Maintainer-block source list — add Pi post.** The "Source verification" block at lines 92-101 should list the Pi post as a third Ronacher entry. Update the Frameworks-attributed block (line 111) to make the disposable-skills attribution point at the right URL.
6. **Optional polish:** add Metcalf byline (line 52) parallel to Yan byline addition. Add the 2026-05-12 update-stamp note to Cherny's section so future judges know the canonical page is actively maintained (saves a re-verify pass).
