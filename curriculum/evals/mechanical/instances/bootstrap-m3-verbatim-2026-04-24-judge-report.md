# Judge report — Bootstrap M3 three-retrievers-three-minds verbatim (2026-04-24)

## Summary

**PASS: 31 / 32. FAIL: 0. NOTES: 1 tooling-only (V4 script false-negative; substance PASS).**

The M3 harness run — three parallel retriever Actors plus one synthesizer Actor — produced every expected artefact at spec-level quality. All V-assertions round-trip cleanly (V4 had a script-level false negative that is noted; the prompt is byte-for-byte present in the synthesizer transcript, twice). All three retrievers stayed in their lane, the synthesizer did not cross into mock territory, the three stances are genuinely distinct, the answer is a decision, and no harness leakage appeared across any of the four Actors.

## Transcript paths

- Wiki: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a059e168bc1ab5c36.jsonl`
- Docs: `.../subagents/agent-ade6dc2f8bec83c60.jsonl`
- Internet: `.../subagents/agent-a94effc08176f9ff5.jsonl`
- Synthesizer: `.../subagents/agent-a06d08601228495f9.jsonl`

Scratch: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`

## Verbatim round-trip

- **V1 PASS** — `verbatim-check.sh` returned match; prefix `You are the wiki retriever for my challe`.
- **V2 PASS** — match; prefix `You are the docs retriever for my challe`.
- **V3 PASS** — match; prefix `You are the internet retriever for my ch`.
- **V4 PASS (with tooling note)** — script reported mismatch, but the prompt is present verbatim twice in the synthesizer scrollback: once as the tool_result input (`Read the three files in module-3/retrievals/. You'll answer the question in module-3/question.md, but not by summarising…`) and once as the blockquoted verbatim echo the synthesizer itself emitted. `grep -c "Rumelt's strategy kernel as the spine" = 2`. The script's blockquote normaliser does not handle JSON-escaped `\n` inside the transcript's tool_result content. Round-trip substance holds; flag the script for a fix.

## Phase 0 — question

- **A1 PASS** — `module-3/question.md` exists; one sentence naming the Q3 rollout shape choice among org-wide wave / four sub-team mini-waves / hybrid with the four explicit constraints (Sari ready, Anneli 6–8 weeks, Paavo's bar, Week-6 offsite forcing function).

## Phase 1 — three retrievers

- **A2 PASS** — `wiki.md` has `[harness substitution — mock Confluence connector; /tmp/bootstrap-mocks/confluence/ stands in]` at top; four findings paragraphs covering all four Confluence mocks (sub-team structure, OKRs, classification policy, vendor retro); each cites space + path + title; `## Conflicts and gaps` present.
- **A3 PASS** — `docs.md` has OneDrive substitution log; five findings paragraphs (sync notes, decision memo, CTO email thread, offsite agenda, personal skeptics notes); each cites path + title; personal-prep entry handled with sensitivity flag — one-line theme only ("Builders / Waiters / Principled Skeptics taxonomy"), content explicitly not reproduced; `## Conflicts and gaps` present.
- **A4 PASS** — `internet.md` has practitioner-cache substitution log; four findings (Alasaarela, Intercom, Karpathy, Klaassen); each cites URL + author + maps-to-Maija paragraph; `## Conflicts and gaps` present.
- **A5 PASS** — dialect divergence holds. Wiki reads as structured enumerate-then-quote; docs reads as chronological document-by-document with a "Maija's three clues" opener; internet reads as essay-per-practitioner with explicit *Maps to Maija* / *Doesn't map* sub-beats. Three different shapes, not three parallel summaries.
- **A6 PASS** — no retriever read sibling `retrievals/*.md`. Each transcript's Read-file-paths list contains only its own output file.
- **A7 PASS** — wiki reads only `/tmp/bootstrap-mocks/confluence/`; docs only `/tmp/bootstrap-mocks/onedrive/`; internet only `/tmp/bootstrap-mocks/practitioners/` (via `Bash: for f in /tmp/bootstrap-mocks/practitioners/*.md; do …`). No cross-lane reads.
- **A8 PASS** — `docs.md` contains only a one-line theme for the skeptics-strategy note plus the sensitivity flag; no Tier framing, sub-team splits, or dissent-strategy moves from the underlying mock leaked into the findings.

## Phase 2 — synthesizer

- **A9 PASS** — synthesizer Read all three `retrievals/{wiki,docs,internet}.md` files (plus question.md, plus its own stances and answer later).
- **A10 PASS** — synthesizer did not read any `/tmp/bootstrap-mocks/` file. File-path extraction is clean.
- **A11 PASS** — synthesizer scrollback carries the substitution log `[harness substitution — subagents spawned inline; nested Task unavailable; three stances produced sequentially and written to module-3/stances/*.md]` immediately above its first stance write.
- **A12 PASS** — three stance files exist; word counts 1-planner ~195, 2-experimentator ~210, 3-reframer ~190 — all under the 250-word slack ceiling.
- **A13 PASS** — 1-planner sequence in order: **Outcome (month 12) → Month 9 → Month 6 → Month 3 (Week 6 offsite) → Next week → Monday move**. Monday move: *"Write Paavo's acceptance criteria with Paavo in the room before Wednesday. Everything downstream needs this signed."*
- **A14 PASS** — 2-experimentator names five load-bearing assumptions each with a one-week kill-test. Quoted two: (1) *"Paavo's bar is engineerable in one quarter… Kill-test: sit with Paavo Wednesday; draft acceptance criteria by Friday; if the draft needs work spanning more than Q3, the bar isn't Q3-sized and the shape breaks."* (2) *"Anneli's carve-out lets Security ship a non-data-touching thing by Week 6. Kill-test: ask Anneli this week which specific ritual/tooling change she can ship that touches zero Confidential data. No candidate = carve-out is cosmetic."*
- **A15 PASS** — 3-reframer cleanly hits all three required moves. Analogy (unrelated field / advertising): *"this is the Sutherland point — the decision that feels decisive (media mix) is almost never the one that moves the needle (the offer itself). Shape is media mix. Paavo's bar is the offer."* Bias: *"action bias on the visible axis — shape is the variable Maija can move now, the bar needs engineering Paavo hasn't done yet, so she keeps optimising shape."* Invert: *"assume shape is pre-decided (it basically is). Spend the week on the bar, not the shape."* Sharp, not glib.
- **A16 PASS** — stances are genuinely distinct. Stance 1 = timeline architecture (commits to hybrid, backs out a 12-month plan). Stance 2 = accepts hybrid as frontrunner but forces 5 kill-tests this week. Stance 3 = rejects shape-as-lever; names Paavo's bar as the actual decision, shape as visible-axis action bias. Three different takes on the same retrievals; no convergence-with-different-wording.
- **A17 PASS** — answer opens with a Diagnosis that names conflicts/gaps *before* guiding policy or actions. Explicit: *"all four practitioners described single-shape rollouts; nobody in the cache ran the parallel-then-converge experiment at sub-team-lead scale"* and *"the two [NOT FOUND] artefacts are both downstream-of-shape"* — both land inside Diagnosis, prior to Guiding policy.
- **A18 PASS** — `answer.md` has three labeled sections. Diagnosis: *"Maija is treating shape as the open decision when shape is essentially resolved."* Guiding policy: *"Run the hybrid shape she's already running. Stop choosing the shape and start making the shape real — by closing the two [NOT FOUND] artefacts that gate it."* Coherent actions (Monday): *"Schedule 90 minutes with Paavo midweek to draft acceptance criteria for the safety pattern."*
- **A19 PASS** — "Where the stances disagreed, and which I sided with" section present. *"I sided with Stance 3's reframe, operationalised through Stance 2's tests, wrapped in Stance 1's timeline."*
- **A20 PASS** — at least six citations to retrieval files across the answer (`retrievals/docs.md` cited 3×, `retrievals/wiki.md` 2×, `retrievals/internet.md` 1×) plus two references to specific stances by name. Quoted two: *"The OKRs explicitly rule out an org-wide mandate as a non-goal (`retrievals/wiki.md`)"* and *"retrievals/internet.md is sharp here: all four practitioners described single-shape rollouts."*
- **A21 PASS** — decision, not summary. Picks **hybrid**. Monday move quoted: *"Schedule 90 minutes with Paavo midweek to draft acceptance criteria for the safety pattern (write → blast-radius reviewer → refuse if high-blast → refuse if reviewer unreachable). Goal Friday: Paavo-signed acceptance criteria suitable for the Tuomas one-pager."*

## Close — wonder

- **A22 PASS** — `wonder.md` is a single paragraph naming what feels off without proposing a fix: *"Whether 'hybrid' is a stable shape or just the comfortable name for 'I haven't decided yet' — the practitioners all described single-shape rollouts, and I don't actually know if four parallel sub-team compoundings converge at Week 6 or diverge into four small kingdoms Maija then has to merge in Q4."*

## Truncations

- **A23 PASS** — no root `CLAUDE.md` in scratch (consistent with M2 end-state; Debrief not executed in the harness run). Synthesizer transcript contains no write/rewrite of any root CLAUDE.md.

## Harness leakage

- **H1 PASS** — no Actor read any `curriculum/exercises/` file. All prompt content arrived via `/tmp/prompts/three-retrievers-three-minds/prompt-00{1-4}.txt` (confirmed in Bash `cat` commands in each Actor transcript).
- **H2 PASS** — no Actor read any judge runner or sibling Actor runner. Each Actor read only its own runner file.
- **H3 PASS** — no Actor read `lemmings-seed.maintainer.md` or any maintainer doc.
- **H4 PASS** — no harness-internal files inside `<scratch>` re-read by Actors. Each Actor's reads under scratch are scoped to their own write targets.
- **H5 PASS** — no WebFetch/WebSearch tool use in the internet Actor; practitioner content sourced via `Bash: cat` on `/tmp/bootstrap-mocks/practitioners/*.md`. All four expected mocks (alasaarela, intercom, karpathy, klaassen) appear in the file-path references.

## A24 — Substitutions logged

1. **Wiki retriever:** Confluence MCP → `/tmp/bootstrap-mocks/confluence/` (no live connector available).
2. **Docs retriever:** OneDrive/SharePoint + connector ask → `/tmp/bootstrap-mocks/onedrive/` + simulated three-clues exchange rendered as "Maija's three clues (+ one follow-up)".
3. **Internet retriever:** WebFetch → `Bash cat` over `/tmp/bootstrap-mocks/practitioners/*.md` (no network).
4. **Synthesizer:** nested Task (three parallel subagents) → sequential inline production of three stances, written to `module-3/stances/*.md` (nested Task unavailable).

## Findings for the exercise

- The three-retrievers-three-minds shape produces the pedagogical target cleanly: dialect divergence is visible in the outputs, conflicts-and-gaps sections actually surface disagreements, the synthesizer's side-by-side read produces genuine contrast, and the answer is a decision rather than a summary.
- Stance 3 (reframer) is the strongest pedagogical payload — it produces the "wait, the question is the wrong question" move, and the synthesizer cites it as the lead. Keep the Rory Sutherland analogy instruction sharp.
- The Debrief being truncated reads cleanly; the Wonder line is doing its job as a late-stage hedge without pretending to be a fix.

## Findings for the harness

- **`verbatim-check.sh` has a false-negative path on synthesizer-shaped prompts** where the prompt lands inside a tool_result's JSON-escaped content string. V4 returned rc=1 despite byte-for-byte presence twice. Suggested fix: normalise `\n` → newline and strip surrounding JSON quote-escapes before the blockquote-strip. Add a self-test with a prompt that rides inside a JSON string.
- Three-role separation (Actor / Judge here; Arrange-outside handled by orchestrator) held across four dispatches. Per-dispatch `.jsonl` artefacts made every assertion mechanically checkable with `grep` + `jq`.
- The inline-stance substitution for nested Task is content-fidelity-equivalent but not isolation-equivalent — see portability notes.

## Portability notes

What this M3 design confirms about multi-session pedagogy:

- **Three-role separation + per-source dispatch substitutes for four-parallel-sessions cleanly.** The student-facing exercise runs in four concurrent Claude Code sessions on a shared filesystem; the harness collapses the concurrency into four sequential Actor dispatches without losing the lane-separation property. Each retriever sees only its own runner and its own mocks; the shared filesystem (`retrievals/*.md` + `question.md`) is the only cross-Actor surface, matching the real exercise.
- **Stance-inline substitutes for nested Task at content-fidelity but not isolation.** The real exercise spawns three parallel subagents for stances; the harness produces them sequentially inside one synthesizer. Content is fine — the three stances are genuinely distinct and the sequence is visible in scrollback — but the isolation property (each stance written without seeing the other two) is not tested. A student-run version could have one stance contaminate another; the harness cannot catch that. Flag for a future harness upgrade: stance-per-dispatch when nested Task lands.
- **The substitution logs inside each output artefact are doing real work** — they're the seam between harness and student-facing exercise, and they made A11 mechanically checkable. Keep them as a pattern in future exercise runners.
