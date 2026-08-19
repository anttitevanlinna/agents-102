=== MANDATORY CONTENT RULES ===

Before generating prose / curriculum / buyer-facing copy: READ the matching rule index below FIRST (generation-time, not post-hoc — post-hoc misses what generating-with-rules-in-context prevents). **Advising counts as generating (2026-08-08).** Reviewing a draft, ranking missteps, or recommending placement / dosage / structure the maintainer will act on changes the surface as surely as writing it — and the rule that would have stopped you is the one you skipped as "analysis, not authoring." Load on the surface you are about to advise on, not only the one you are about to write. Load only today's surface. Multiple surfaces apply → load ALL (a single file can trip several; split is by firing-moment, not exclusion).

**Four tiers. Writing prose uses the first three; the fourth is the judge's.** The compendiums serve two consumers with opposite appetites — a judge adjudicating a shipped file needs every carve-out and precedent (~400KB across twelve files), a generator about to write a sentence needs the constraint once. The bolded lead IS the constraint, and it is 5% of the bytes. The rest is adjudication, and loading it to write a paragraph was a tax paid on every surface detection.

- **T0 — `memory/_index/diamond.md`.** 115 rules, every surface, ~8KB. Read at session start, before the surface is known. These are the ones that change a sentence before it is typed.
- **T1 — `memory/_index/<surface>.leads.md`.** Every lead for one surface, ~1KB. Read when the surface is detected. `◆` = already in T0. `⚠` = the body carries an exception, carve-out or hard-grep list.
- **T2 — `node curriculum/evals/scripts/rule.js <surface> <N>`.** One rule's body. **Owed, not optional, on any `⚠` rule you are about to act on** — a lead alone cannot tell you where a rule stops applying, and the carve-outs in this corpus are load-bearing (supplementary exemptions, named wait points, deliberate-antipattern prompts).
- **T3 — `memory/check_<surface>.md`.** The full file. For **eval judges** (they cite rule numbers and need the precedents) and for **editing a rule**. Not for writing prose.

**Changing a rule is still a T3 edit, and the compendium stays the single source of truth** — tier membership is one frontmatter line (`metadata.tiers.diamond`), no rule text moves. After any rule edit: `node curriculum/evals/scripts/build-rule-index.js` (rebuild) **and** `compendium-drift.js --repin` (date the moved rule). Skip the rebuild and the hooks fail closed — they detect the drift by content hash and send the session back to T3, which is safe but costs what the tiers were built to save.

Rule indices at: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/_index/`
Compendiums (T3) at: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/`

Surface → index (T1 file is `_index/<surface>.leads.md`; the compendium named is its T3 source):

- **Any prose (internal/external)** → `check_writing.md`. **Always-on surface — loading a specialist compendium does NOT discharge it.** Two exclusions to refuse by name: (a) *"this is bookkeeping, not prose"* — maintainer blocks, `<!-- backing -->` blocks, source stamps, `check_*.md` bodies and compounded entries are all prose and all trip §3 (rules are rules, history is git); their structured-field register is exactly what makes changelog feel like record-keeping. (b) *"I already loaded the specialist one"* — a research-claims or prompts session is still also a writing session. Firing moment for §3 specifically is **revision, not authoring**: a fresh block states what is true, and the next edit records the diff it just made. After editing any block, re-read only the lines you touched and ask of each whether it states a fact or a transition.
- **Buyer-facing copy** (site, newsletter, sponsor decks, pricing) → `check_sales_copy.md`
- **Student-facing curriculum** (modules, exercises, lectures) → `check_student_facing.md`
- **Prompt content** → `check_prompts.md`. Fires when EITHER (a) writing/editing a prompt — registry entry `curriculum/prompts/<key>.md` body OR inline `**Prompt**` fenced block (pre-migration), OR (b) surfacing audit BLOCK findings / proposed edits / any judgement-required choice to the maintainer (curriculum-pre-ship-audit, eval-fire, research-review, /content-creation cycle). Fires alongside the surface compendium. Registry edits also trip the PreToolUse approval gate + git pre-commit gate (§22).
- **Lectures** (placement & dosage) → `check_lectures.md`
- **Slide-rendered files** (any file the Slides layout chunks at `##` — AE101 lectures/exercises/modules; every slides re-chunk pass) → `check_slides.md`. Per-chunk cold read: each `##` slide must resolve its own referents.
- **Strategy tie-in** (Big Idea, Key Concepts, mood contract) → `check_strategy_tie_in.md`
- **Pedagogy** (module/exercise design, PDCA) → `check_pedagogy.md`
- **Room-scale beats** (group adjudication, attributed contribution into a shared record, team deliberation, group round) → `check_workshop.md`. Fires **alongside** `check_pedagogy.md`, never instead of it — the split is per-beat, and `check_workshop.md` carries the N/A carve-out for the individual-learning rules that must not fire on a group beat. Trigger: the artefact belongs to the group, not to a participant. Co-located solo work is not a workshop.
- **Research claims** (citations, stats, practitioner refs) → `check_research_claims.md` (+ `.claude/rules/research-rules.md`: evidence ladder, source-type labels, freshness, zombie-stat guard)
- **Platform/IP claims** (Claude Code capabilities, infra proposals) → `check_platform_and_boundaries.md`

=== END RULES ===
