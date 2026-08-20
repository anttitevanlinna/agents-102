# Agents 102 — Continuous Research System

Curated knowledge engine for the agentic transformation. **Curate → Connect → Advise.**

- **Research** (OODA, findings, KB, signals) → [`continuous-research/CLAUDE.md`](continuous-research/CLAUDE.md). Auto-loads under `continuous-research/`.
- **Curriculum** → [`curriculum/CLAUDE.md`](curriculum/CLAUDE.md). Generation rules autoload per [`.claude/rules/content-rules.md`](.claude/rules/content-rules.md).
- **Strategy** (value prop, buyer, sequence, funnel, IP) → `bosser-strategy` skill.
- **Research results** → `continuous-research/synthesis/index.md`. Don't hardcode findings here.

## Permanent goals

1. **Continuously monitor the landscape.** KB more current than any individual.
2. **Find insights not on page-one Google.** Practitioner-grounded convergence + cross-domain meta + evidence-ladder-tested.
3. **Serve any builder leader, not only Antti.** Output valuable to a CTO who's never heard of Bosser.
4. **Respond to user signals.** Questions / corrections / validations = highest-priority research input.

## Strategic frame (one-liners)

- **Value prop:** competence makes the question askable. Without it, the CTO chooses between marketing stories.
- **Buyer:** the builder leader (CEO / CTO / SVP HR) who wants to own the transformation. Psychographic. Target: large Nordic — software + traditional pursuing high digitalization.
- **Sequence:** competence → discovery → context → platform. Tools commoditize; organisational learning rate is the ceiling.
- **Coding agents = meta-platform.** Claude Code + Codex compound; other platforms can't extend themselves.
- **80/20:** 80% frontier research (OODA) + 20% peer premium (user signals).
- **Funnel:** Newsletter ↔ Survey → DM.

Full strategic context → `bosser-strategy` skill.

## Multi-user hygiene

Shared tree, multiple live sessions. Assume a neighbour is inside your files.

- **Start** `git pull`. **During** commit + push signals every 30–60 min. **End** commit + push uncommitted.
- **Branching:** `main` = shared KB; OODA pushes direct (gates enforced). Users + experimental → branches, Antti merges.
- **Never bare `git commit`** → `git commit -m msg --only -- <paths>` (flags before `--`). Index is shared state, so `git add` can't protect a commit; `--only` ignores it. Read column 1 of `git status --short`, not only column 2.
- **Never** `git stash` / `reset` / `checkout` / `restore` on dirty paths, and no rebasing. WIP is deliberate — don't manufacture clean state. `git pull` complains → `git fetch` or commit.
- **Same-file collision** (neighbour typing inside your file): `git diff -- <f>` to read hunks, `git apply --cached` your `@@` blocks only, then plain `git commit`. `--stat` is blind to this.
- **Before deleting/overwriting:** delete only the leaf you created. An unexplained edit in a shared tree is a colleague, not a bug — check `ps` + mtimes before "restoring".

## Copyright

Proprietary (`curriculum/`, `content/`, `site/`, `memory/`, `docs/`, `scripts/`, `.claude/`, root docs) → © 2026 Bosser Oy, all rights reserved. Each proprietary top-level folder carries `COPYRIGHT.md`. Public: `continuous-research/` under `continuous-research/LICENSE.md`. In doubt → root [`COPYRIGHT.md`](COPYRIGHT.md).

## Subagent rule injection

Subagents DO inherit the full CLAUDE.md hierarchy and `.claude/rules/` — user, project, `CLAUDE.local.md`, managed policy. Built-in Explore and Plan are the only exceptions. Prepend only what sits outside an auto-load surface:
- Research → `continuous-research/research-rules.md` — **prepend verbatim.** This path does not auto-load; a subagent never sees it otherwise.
- Content → `.claude/rules/content-rules.md` already arrives on its own. Do not prepend it. Name the matching `memory/_index/<surface>.leads.md` instead — indices are not on an auto-load surface either. A subagent that will WRITE prose gets the index (T1); a subagent that will JUDGE gets the full `memory/check_*.md` (T3), because judges cite rule numbers and need the carve-outs.

## Orchestrator pattern

1. **Main thread = orchestrator only.** Delegate reading + analysis.
2. **3–5 parallel subagents** by file group. Each writes structured output to disk.
3. **Subagents write, not talk.** Main thread reads only summary files.
4. **Synthesize from summaries** → one verdict for user.
5. **One message, all agents.** `run_in_background: true`.
6. **Validate sweep output at apply time** at the Edit's Read-first gate. → `memory/compounded/2026-05-18-platform-explore-sweep-validate-each-at-apply-time.md`

## Approval gate

Card ONLY **student-facing body text + prompt bodies students copy** (`check_prompts.md §26`) **that still carry a decision Antti has not already made.** BEFORE/AFTER/WHY/RISK, one at a time, wait for the call.

**Not card-shaped even though a student reads it** (§26's standing exemptions, stated here because this tier is what loads every session and the absolute form above is what kept over-firing): a mechanical swap leaving claim/voice/ask untouched (page geometry → reading order, dead anchor, stale locator); **any edit whose wording Antti just supplied or whose direction he just called** — the decision landed in the message that prompted the edit, so carding it asks him to approve his own sentence; **and any body edit to a supplementary** (2026-08-15) — optional progressive reading, never reaches the Slides deck, so it is never projected in a room. Reference pages are NOT covered by that last one; ask before widening it. Apply, then report as landed work, with any genuine open question raised as a note beside it rather than as a gate. Test: *could you write BEFORE/AFTER and be certain of the call yourself?* → not a card.

Everything else applies **directly**, then gets reported as landed work: maintainer blocks, backing blocks, `check_*.md`, `.claude/rules/`, CLAUDE.md tiers, `memory/compounded/`, `continuous-research/` (incl. evidence-level downgrades), scripts, trainer notes. Test = *"will a student read this string?"* — NOT *"does this need judgement?"* A rule surfaced as a card is a rule not in force.

Recurring leak = a **skill's own step text** re-imposing the gate (`/research-review` Step 6, `/compound` Step 6, both fixed 2026-07-31). §26 outranks any skill procedure. Grep blast radius before assuming a fix reaches students — usually one line or none.

## Self-review

- **Session start:** read `memory/self-review-protocol.md` § *Core heuristics*.
- **End of significant sessions:** run self-review per `memory/self-review-protocol.md`. Recurrence 3+ → hard rule or `check_*.md`.

## Rule tiers

Four tiers T0–T3; leads ship as a generated index so a generator pays ~5% of the judge's bytes. Rules live in `memory/check_*.md`; tier membership is one frontmatter line. **Edit a rule → `node curriculum/evals/scripts/build-rule-index.js` → `compendium-drift.js --repin`** (hooks fail closed to T3 while the index is stale). Contract: `.claude/rules/content-rules.md`.

## Memory / compendium authoring

**Sacrifice human readability for agent efficiency.** Applies to non-student-facing internal files: `memory/`, `memory/check_*.md`, `memory/compounded/`, `.claude/rules/`, SKILL.md bodies, internal CLAUDE.md tiers. Telegraphic shorthand, structural punctuation (→, =, ≥), drop "Pairs with #X" cross-references (all rules in context at generation time), drop "Originated from" anecdotes (live in compounded source files), drop "Canonical source:" trailers (date-slug in filename suffices). Every byte under these files is paid every session — earn it. Student-facing curriculum stays prose-shaped; that audience reads, not parses.
