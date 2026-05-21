# Workflow composition — Cycle 2A wiring mechanics

Research question: What does the actual wiring of composition look like?
Date: 2026-05-20
Cycle: 2A (drilling into the L3-converged shape from Cycle 1)
Freshness window: since 2025-11-20

Cycle 1 found L3 convergence on a composition shape: **a kit of 3–5 small markdown subagents wired into a plan → work → verify → learn loop, with one step that writes back to persistent memory**. This cycle asks: *show me the wiring*. The answer turns out to be unusually concrete — the canonical practitioner kits are publicly checked-in markdown, and the shape is consistent enough across independent practitioners that a curriculum exercise can mimic it almost verbatim.

## Composite slash command — concrete shapes

### Kieran Klaassen / Every — `/lfg`

**File location:** `plugins/compound-engineering/skills/lfg/SKILL.md` in `EveryInc/compound-engineering-plugin` (GitHub). Each skill is a folder with `SKILL.md`, `references/`, and (for `ce-compound`) `assets/` + `scripts/`. The plugin ships 37 skills and 51 review agents.

**What it calls (verbatim from `lfg/SKILL.md`):**

1. `ce-plan` with `$ARGUMENTS` → must produce a plan file in `docs/plans/`
2. `ce-work` → must produce file modifications beyond the plan
3. `ce-code-review` with `mode:autofix plan:<plan-path-from-step-1>`
4. Persist review autofixes (`git commit` + push the fix commit)
5. Autonomous residual handoff — file unresolved findings into the PR body or `docs/residual-review-findings/<sha>.md`
6. `ce-test-browser` with `mode:pipeline`
7. `ce-commit-push-pr`
8. CI watch and autofix loop (up to 3 iterations via `gh pr checks --watch`)

**How outputs chain:** by filesystem path, not by in-context handoff. `ce-plan` writes to `docs/plans/<slug>.md`. `lfg` records that path and passes it as a literal argument to `ce-code-review` (`plan:<path>`). `ce-work` reads the plan, mutates the working tree, and progress is derived from `git` — the plan body is *not* edited during execution ("progress is derived from git by `ce-work`, so there is no progress to preserve"). `ce-compound` reads the resolved problem from session context and writes to `docs/solutions/<slug>.md`.

**Memory close:** `ce-compound` writes structured docs with YAML frontmatter to `docs/solutions/`, classified against `references/schema.yaml`. The README states this explicitly: *"A good compound note means the next agent does not have to learn the same lesson from scratch."*

**Gate discipline:** every step between skills in `lfg` is a hard GATE — "STOP. Verify that … Do NOT proceed to step N if …". Composite skills are not just sequencers; they're verifiers between phases.

**Source:** https://github.com/EveryInc/compound-engineering-plugin [practitioner direct, vendor venue] (active development through 2026-05; commits in last 7 days). Companion narrative: https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents [practitioner direct, vendor venue].

### Boris Cherny — `/go`

**File location:** Not exposed publicly. `howborisusesclaudecode.com` references it without showing the file. The community fork `meleantonio/ChernyCode` carries an approximation but not the original.

**What it calls (paraphrased from canonical doc):** verify (bash / browser / computer use) → `/simplify` skill → open a PR.

**Subagents named on the canonical page:** `code-simplifier`, `verify-app`, `code-architect`, `build-validator`, `oncall-guide` — Cherny calls these "the most common workflows I do for most PRs." Subagents live in `.claude/agents/` as the composition primitive; `/go` is a slash command that calls them in sequence.

**How outputs chain:** Cherny's words: *"Coding becomes a pipeline of phases: spec, draft, simplify, verify. Each phase benefits from a different mind."* Phases hand off through the working tree + git, same shape as Klaassen's `lfg` — not in-conversation summaries.

**Memory close:** *"Each tip refines my CLAUDE.md."* No explicit slash command; the human writes the refinement after a successful loop. Lower formality than Klaassen.

**Source:** https://howborisusesclaudecode.com/ [practitioner direct] (parts dated Jan–Apr 2026).

### Matt Pocock — `to-prd` → `to-issues`

**File locations:**
- `skills/engineering/to-prd/SKILL.md` (frontmatter: `name: to-prd`, description requires conversation context to already exist).
- `skills/engineering/to-issues/SKILL.md` ("Break a plan into independently-grabbable issues using vertical slices").
- `skills/engineering/setup-matt-pocock-skills/SKILL.md` (writes `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, `docs/agents/domain.md` + an `## Agent skills` block in `CLAUDE.md`/`AGENTS.md`).
- `skills/productivity/handoff/SKILL.md` (writes handoff doc to the OS temp directory, includes a "suggested skills" section for the next agent).

**What it calls:** Pocock's composition is *explicitly weakly coupled*. `to-prd` and `to-issues` do not invoke each other directly. Instead, `to-prd` writes a PRD to the issue tracker with a `ready-for-agent` label; the human (or another skill) later invokes `to-issues`. The chain is **mediated by repo configuration** (`docs/agents/*.md` from `setup-matt-pocock-skills`) and **tracker state** (the `ready-for-agent` label), not by an orchestrator.

**Memory close:** `setup-matt-pocock-skills` is the per-repo memory step — runs once per repo, creates the config files other skills read. `handoff` is the per-session memory step. There is no "compound the learning" closer skill in the public repo; Pocock leaves that to the human.

**Source:** https://github.com/mattpocock/skills [practitioner direct] (~54k stars; initial commit 2026-02-03; active).

### Sourcegraph Amp — `/handoff`

**File location:** Built into Amp; not file-based like Klaassen's plugin.

**What it does:** analyzes current thread → generates a goal-specific prompt for a new thread → identifies relevant files → presents an *editable draft* in the new thread → user reviews before sending.

**How outputs chain:** explicitly *not* via summary stacking. The Amp post is pointed about this: compaction is lossy ("each summary replaced prior context, stacking summaries atop summaries"); handoff produces a single fresh prompt the user edits, so the next thread starts clean.

**Source:** https://ampcode.com/news/handoff [practitioner direct, vendor venue] Sourcegraph (2025-10-23 — slightly outside the 6-month window but still the canonical statement of the move; sister doc https://ampcode.com/notes/feedback-loopable Metcalf 2026-02-05 is in window).

## Orchestrator pattern — what gets passed, what returns

### Anthropic (canonical guidance) — compressed summary in, compressed summary out

**Pass to subagent:** task-specific prompt with **minimal compressed context**, not the full conversation. Their order-lookup example: "the order lookup agent processes the full order history and extracts a summary. The main agent receives only the 50-100 tokens it actually needs."

**Subagent returns:** "compact summary, not full context." Use an `extract_summary()` step before reinjecting into the orchestrator.

**Orchestrator integrates:** parallel fan-in via `asyncio.gather()` for research-shaped work — "Spawn subagents to research each facet in parallel. Lead agent synthesizes findings."

**Source:** https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them [vendor direct].

### Cognition — full context shared, but writes stay single-threaded

**Pass to subagent:** *full context shared with strategic filtering*. For their "Smart Friend" pattern: "a fork of the full context of the primary model with the smart model." For their review-agent pattern: deliberately clean context, so the reviewer "goes deeper into areas the original coding agent may not."

**Subagent returns:** *intelligence contributions, not actions*. Concrete shapes: "2 bugs per PR, 58% severe (logic errors, missing edge cases)"; or guidance like "instruct the primary model to investigate this file and ask again later."

**Orchestrator integrates:** *single-threaded write, advisor agents around it*. Quote: "most multi-agent setups work best today when writes stay single-threaded and the additional agents contribute intelligence rather than actions." This is a real evolution from their 2024 "Don't Build Multi-Agents" post: parallel write agents created conflicting "implicit choices about style, edge cases"; parallel *reviewers/advisors* feeding a single writer do not.

**Source:** https://cognition.ai/blog/multi-agents-working [practitioner direct] (2026).

### Klaassen — context = filesystem, not chat

The `lfg` skill is the cleanest practitioner exemplar of orchestration-by-filesystem. Each step passes a **path** to the next step's argument list, not a paragraph of conversation. The plan file IS the brief; the working tree IS the result. The orchestrator never re-reads the plan into its own context — it hands the path to `ce-work` and reads `git status` to check the gate.

## Integration pattern (orchestrator after subagent returns)

Three patterns surfaced; they map cleanly onto stack depth:

**1. File-mediated (Klaassen, Cherny, Pocock).** Subagent writes to a path; orchestrator checks the path exists and passes it forward. The orchestrator does not read the contents into its own context. **This is the dominant pattern for engineering work** — it survives context-window limits because the artefact is the contract, not the conversation. Klaassen's gates ("verify plan file in `docs/plans/`", "verify files changed beyond the plan") are file-existence and git-status checks.

**2. Summary-fan-in (Anthropic guidance, Cognition review pattern).** Multiple subagents return short summaries (~50–100 tokens each); orchestrator reads all summaries serially and synthesizes. Works for research/review where the intermediate artefact is the judgement, not a file. The 51 review agents in Klaassen's plugin (`ce-correctness-reviewer`, `ce-security-sentinel`, `ce-performance-oracle`, `ce-scope-guardian-reviewer`, etc.) fan into `ce-code-review`, which produces a "Residual Actionable Work summary" — a structured fan-in result.

**3. Single-threaded write with advisors (Cognition's evolved position).** One writer agent; other agents *advise* without writing. The orchestrator integrates the advice into the writer's next turn. This is what `ce-code-review mode:autofix` does inside `lfg`: many review agents advise, one agent applies the autofix commit.

## Closure / memory step

The single most consistent move across the L3-converged set:

- **Klaassen `ce-compound`** — `docs/solutions/<slug>.md` with YAML frontmatter (validated against `references/schema.yaml`). Headless mode exists for skill-to-skill invocation. Discoverability check edits a discoverability surface (CLAUDE.md or equivalent) so the next session finds the doc.
- **Cherny** — manual edit of `CLAUDE.md` after a successful loop. No skill; the human writes it.
- **Pocock `setup-matt-pocock-skills`** — per-repo, not per-session. Writes `docs/agents/{issue-tracker,triage-labels,domain}.md` + a section in `CLAUDE.md`/`AGENTS.md` that other skills read. The memory is the **repo-shape config**, not the session's lesson.
- **Pocock `handoff`** — per-session, but writes to OS temp dir (transient). Not persistent memory; it's a baton.
- **Anthropic guidance** — implicit; the post doesn't prescribe a memory-close skill.

The pattern: **the durable memory write lands on the filesystem in a place the *next* fresh agent will find by default** — either via `CLAUDE.md` auto-load, a `docs/` directory convention, or an explicit discoverability surface edit. Lessons that land only in a transcript are not yet compounded.

## Curriculum-mimicable kernel

The smallest composition exercise that mirrors the production wiring above:

1. **Three subagent SKILL.md files in `.claude/skills/`** — `plan`, `work`, `verify`. Each ≤ 100 lines, action lead-in, no orchestration vocabulary inside the skill itself (each skill knows only its own job).
2. **One composite slash command** (`/loop` or equivalent) that calls plan → work → verify in order, with a verification gate between each step. The gate is a *file-existence* check or `git status` check, not a content read.
3. **File-mediated handoff:** `plan` writes `docs/plans/<slug>.md`. `/loop` records the path. `work` reads the plan; progress lives in git, not in the plan body. `verify` reads the diff.
4. **Closure step writes to discoverable memory:** a `compound` (or `learn`) step writes a structured note to `docs/lessons/<slug>.md` and appends a one-line index entry to `CLAUDE.md` so the next session finds it without being told.
5. **Counter-evidence callout in the module:** Ronacher's review-bandwidth argument + Willison's normalization-of-deviance warning belong in the same exercise as failure-mode callouts. Teaching the loop without the failure modes teaches its decay.
6. **No orchestration framework, no DSL, no shared state object.** Plain markdown skills, filesystem paths as the contract, slash command as the sequencer. Pocock's "rails you laid" framing is the right register.
7. **One named gate the student must encode** — e.g., "do not proceed to `work` if no plan file exists in `docs/plans/`". This is the cheapest forcing function and it's what Klaassen's `lfg` does at every seam.
8. **Avoid teaching summary-fan-in in the kernel exercise.** It's the right pattern for research, but the engineering loop survives on file-mediated handoff. Teach fan-in as a second move (M6 second half or M7) once the file-mediated loop is in the muscle.

## What I did not find

- **The original `/go` SKILL.md from Cherny's actual repo.** `howborisusesclaudecode.com` names the skill and lists the subagents but does not show the file. The `meleantonio/ChernyCode` fork is the closest public approximation and was not opened in depth this cycle. If the curriculum wants a Cherny-verbatim example, this is a follow-up task.
- **A `/LFG` slash command in the Klaassen plugin.** The actual skill is `lfg` (lowercase, in `plugins/compound-engineering/skills/lfg/`). Earlier write-ups (Creator Economy, Every) name it as `/LFG`; the canonical implementation uses `lfg`. The wiring described above is verbatim from the SKILL.md.
- **Intercom's hook + subagent wiring at the file level.** Curran and Scanlan describe 13 plugins + 100+ skills with PreToolUse/PostToolUse/SessionEnd hooks, but the internal plugin repo is not public. The community plugin at `intercom/claude-plugin-external` was not opened this cycle.
- **Ramp's Dojo skill-file format.** Charles describes 350 skills as "version-controlled, code-reviewed artifacts," but the Dojo repo is private. The Tuck case study + Goddijn companion piece carry the mechanism description without showing the files.
- **Klaassen's own byline in the freshness window.** Same gap as Cycle 1 — current Klaassen material is Katie Parrott at Every, Creator Economy summaries, and the plugin itself. The plugin is the most direct primary source available and it is actively committed-to through 2026-05.
- **Pocock cohort post-mortems.** Cohort ran 2026-03-30 to 2026-04-13; no public retrospective from Pocock surfaced. The public skills repo is the durable evidence.
