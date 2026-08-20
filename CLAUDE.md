# Agents 102 — Continuous Research System

Curated knowledge engine for the agentic transformation. **Curate → Connect → Advise.**

- **Research** (OODA, findings, KB, signals) → [`continuous-research/CLAUDE.md`](continuous-research/CLAUDE.md), auto-loads under `continuous-research/`.
- **Curriculum** → [`curriculum/CLAUDE.md`](curriculum/CLAUDE.md). Generation rules autoload per [`.claude/rules/content-rules.md`](.claude/rules/content-rules.md).
- **Strategy** → `bosser-strategy` skill.
- **Research results** → `continuous-research/synthesis/index.md`. Never hardcode findings here.

## Goals

1. Monitor the landscape continuously — KB more current than any individual.
2. Insights off page-one Google — practitioner convergence + cross-domain meta + evidence-ladder-tested.
3. Serve any builder leader, not only Antti — valuable to a CTO who's never heard of Bosser.
4. User signals (questions / corrections / validations) = highest-priority research input.

## Strategic frame

- **Value prop** = competence makes the question askable; without it the CTO picks between marketing stories.
- **Buyer** = builder leader (CEO / CTO / SVP HR) wanting to own the transformation. Psychographic. Target: large Nordic, software + traditional pursuing high digitalization.
- **Sequence** = competence → discovery → context → platform. Tools commoditize; org learning rate is the ceiling.
- **Coding agents = meta-platform.** Claude Code + Codex compound; other platforms can't extend themselves.
- **80/20** = 80% frontier research (OODA) + 20% peer premium (user signals).
- **Funnel** = Newsletter ↔ Survey → DM.

Full context → `bosser-strategy`.

## Multi-user hygiene

Shared tree, multiple live sessions. Assume a neighbour is inside your files.

- Start `git pull` · during: commit+push signals every 30–60 min · end: commit+push uncommitted.
- `main` = shared KB; OODA pushes direct (gates enforced). Users + experimental → branches, Antti merges.
- **Never bare `git commit`** → `git commit -m msg --only -- <paths>` (flags before `--`). Index = shared state, so `git add` can't protect a commit; `--only` ignores it. Read column 1 of `git status --short`, not only column 2.
- **Never** `git stash` / `reset` / `checkout` / `restore` on dirty paths; no rebasing. WIP is deliberate — don't manufacture clean state. `git pull` complains → `git fetch` or commit.
- **Same-file collision** (neighbour inside your file): `git diff -- <f>` → read hunks → `git apply --cached` your `@@` blocks only → plain `git commit`. `--stat` is blind to this.
- **Before delete/overwrite:** delete only the leaf you created. Unexplained edit in a shared tree = colleague, not bug — check `ps` + mtimes before "restoring".

## Subagent rule injection

Subagents inherit the full CLAUDE.md hierarchy + `.claude/rules/`; built-in Explore and Plan are the only exceptions. Prepend ONLY what sits outside an auto-load surface:

- Research → `continuous-research/research-rules.md`, **verbatim**. Does not auto-load; a subagent never sees it otherwise.
- Content → `.claude/rules/content-rules.md` arrives on its own, **do not prepend**. Name `memory/_index/<surface>.leads.md` instead (indices don't auto-load either). WRITE prose → T1 index. JUDGE → full `memory/check_*.md` (T3); judges cite rule numbers, need carve-outs.

## Orchestrator pattern

1. Main thread = orchestrator. Delegate reading + analysis.
2. 3–5 parallel subagents by file group; each writes structured output to disk.
3. Subagents write, don't talk. Main thread reads summary files only.
4. Synthesize from summaries → one verdict.
5. One message, all agents, `run_in_background: true`.
6. Validate sweep output at apply time, at the Edit Read-first gate. → `memory/compounded/2026-05-18-platform-explore-sweep-validate-each-at-apply-time.md`

## Approval gate

Card ONLY **student-facing body text + prompt bodies students copy** (`check_prompts.md §26`) **still carrying a decision Antti has not made.** Format: BEFORE/AFTER/WHY/RISK, one at a time, wait for the call.

**Not card-shaped though a student reads it** (§26 standing exemptions):

- mechanical swap leaving claim/voice/ask untouched — page geometry → reading order, dead anchor, stale locator;
- any edit whose wording Antti just supplied or whose direction he just called — carding it asks him to approve his own sentence;
- any body edit to a supplementary — optional progressive reading, never reaches the Slides deck, never projected in a room. **Reference pages NOT covered; ask before widening.**

→ apply, report as landed work; genuine open question = note beside it, not a gate. Test: *could you write BEFORE/AFTER and be certain of the call yourself?* → not a card.

Everything else applies **directly**, then reported as landed: maintainer blocks, backing blocks, `check_*.md`, `.claude/rules/`, CLAUDE.md tiers, `memory/compounded/`, `continuous-research/` (incl. evidence-level downgrades), scripts, trainer notes. Test = *"will a student read this string?"*, NOT *"does this need judgement?"* **A rule surfaced as a card is a rule not in force.**

Recurring leak = a **skill's own step text** re-imposing the gate. §26 outranks any skill procedure. Grep blast radius before assuming a fix reaches students — usually one line or none.

## Memory / compendium authoring

**Sacrifice human readability for agent efficiency.** Applies to non-student-facing internal files: `memory/`, `memory/check_*.md`, `memory/compounded/`, `.claude/rules/`, SKILL.md bodies, internal CLAUDE.md tiers. Telegraphic shorthand, structural punctuation (→ = ≥); drop cross-references (all rules in context at generation time), origin anecdotes (live in compounded files), "canonical source" trailers (date-slug in filename suffices). Every byte here is paid every session — earn it.

**Earning test for anything always-loaded.** All four must hold: (a) changes an action; (b) no hook / skill `description` / surface detector / grep-at-moment-of-need would surface it; (c) fails **silently**; (d) fires often enough that residency beats a pointer. (d) is the one skipped — severity is louder than base rate, and once-a-year × silent loses to 300-sessions × resident. Corollaries: a pointer earns residency when its absence produces **confabulation rather than a question**; and a rule that got its forcing function no longer needs to be in memory (`check_pedagogy.md §22` inverted — machinery fails loudly, loud failure is its own trigger). Student-facing curriculum stays prose-shaped; that audience reads, not parses.
