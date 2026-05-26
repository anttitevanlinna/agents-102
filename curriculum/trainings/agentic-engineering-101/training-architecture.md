# Agentic Engineering 101, Training Architecture

AE101 is for software-engineer ICs who already use or have seen Claude Code. The training turns uneven self-taught usage into an engineering loop that compounds inside the engineer's real repo. Architecture differs from Agents 101 in two load-bearing ways: AE101 has no persistent training directory (work lives in the student's repo), and the runtime contract is engineer-shaped rather than leader-shaped (no Cowork; no async cloud agents).

Today AE101 ships only on Claude Code (CLI + Desktop). Gemini CLI is the planned alternate runtime; the diff plan lives under §Future TODO.

## Platform

**Supported today: Claude Code (CLI + Desktop).** Canonical and battle-tested. Every shipped artefact has been authored against this runtime.

**Cowork is not a supported runtime for AE101.** Cowork is sandboxed to connected folders, not the engineer's coding flow. Engineers code in their real repo on their laptop, run tests, run MCP server installs at the org level, and compound rules into files Git tracks. None of that maps to Cowork's connected-folder + plugin-marketplace model. Cowork is the right surface for Agents 101 (non-engineer leaders); it is the wrong surface for AE101.

**Jules and other async cloud agents are out of scope.** AE101 teaches a synchronous loop where the engineer reads what the agent did and steers in real time. Async PR-back agents fit a different pedagogy.

**Planned: Gemini CLI** as alternate runtime. See §Future TODO.

## Material distribution

Two artefacts per student:

1. **Content folder.** `ae101-content.tar.gz` (this file owns the tarball filename, build scripts, prework, and audit regex point back here). Shipped at training start. Contains `lectures/`, `exercises/`, `prework/`, `reference/`, `supplementary/`, and `content/skills/` (source files for the curated skills M3 uses). All markdown. Read in place at the agent's direction; skim when you want to. Same files render via the cohort site for projection and human browsing, the file-on-disk is the source of truth for agentic reading.

2. **The student's real repo.** Where compounding actually happens. Picked in prework against four criteria: owned or co-owned, still active in six months, dense enough that compounding has somewhere to land, real work ahead at both sizes (a one-line bug for M1, an epic or refactor for M4 onward).

No persistent training-directory state. No `module-N/` folders. If a student asks where the module folder is, they have imported an Agents 101 habit; redirect to the repo.

## Working directory model

The student's real repo is the working directory. Every module starts a fresh agent session in that repo. Rules and memory accumulate inside the repo across modules.

```
<student-repo>/
├── .gitignore                     # student adds CLAUDE.local.md + observations/ here in M1/M4
├── CLAUDE.md                      # team-shared, PR-reviewed; grows from M2 Debrief onward
├── CLAUDE.local.md                # personal, gitignored; created by M1 compound exercise
├── observations/                  # observations + business-rules notes (Block 1); introduced at M4
└── ...                            # the real codebase
```

## Session boundaries

AE101 assumes a fresh agent session at the start of each module. Engineers arrive after a working-day or a working-week gap, usually without last week's scrollback. The cross-module continuity lives on disk (rules files + memory + the repo itself), not in chat history.

Two session verbs:

- **`new`**, fresh session at the working directory. Default for module openings.
- **`return`**, pick up a prior session by name at the same working directory; if it is not still open, start a fresh one at the same working directory. Use when the prior session's scrollback is load-bearing and the session window is still alive (e.g. an in-flight send-off resumed after a short break, a mid-module wait picked up later).

Cross-working-directory boundaries always open `new`. M5 forks a worktree at `../<repo>-m5` and starts a fresh session there; M4's evidence travels by disk (the transcript at `~/.claude/projects/<encoded>/<uuid>.jsonl`, the starting-point branch and SHA in shared `.git`, the personal rules and `observations/` copied at fork time). The same-cwd `return` verb does not cross worktrees.

Inside a module, keep the same session running by default. Exercises in the same module may rely on short-term scrollback from the previous exercise plus files written on disk.

## Rule files

**No prewritten root `CLAUDE.md` ships in AE101 content.** The student's repo already has whatever rule file the team agreed on (or doesn't). Do not over-write it.

The **personal rules file** (`./CLAUDE.local.md`, gitignored) is the canonical workhorse. Born from session evidence in M1's compound exercise, grown via Debrief at M2/M4/M5/M6. Every later session reads it at cold-start.

The **team rules file** (`./CLAUDE.md`, PR-reviewed) changes only when a rule is team-worthy enough to earn review. Rare by design. M1's compound exercise flags team-worthy rules separately so the engineer can open a PR against the team file outside the training.

There is no company layer. Whether a company's shared conventions earn a file-backed home of their own, the way the personal and team layers already have, is an open question rather than a settled gap. The M4 closing lecture `will-company-memory-emerge.md` poses it and leaves it deliberately unresolved: this section stays the authority on what ships today, the lecture runs the debate, not the decision.

The in-repo knowledge home needs a rename too, but for a separate, mechanical reason (a name/location collision, not the company-layer debate). That fix is now decided, `.claude/memory/` → repo-root `observations/`, and detailed in §Knowledge-home rename below. It is independent of the open company-layer question; un-parking the rename does not resolve the lecture.

### Knowledge-home rename: `.claude/memory/` → `observations/` (applied 2026-05-26; runner + compendiums tail)

**Problem, reproduced 2026-05-26.** The in-repo `.claude/memory/` convention fails two ways, both traced to its name and location, not to the model behind it:

1. *Auto-memory name reflex.* "memory" is a reserved Claude Code term, the agent's own recall home at `~/.claude/projects/<encoded-cwd>/memory/`, surfaced via `/memory`. Told to "persist this to `.claude/memory/`," the agent sometimes treats it as a memory operation and routes to the user-level home instead of writing the in-repo file. Unpredictable: codesearch M4 routed user-level twice; an interactive write landed in-repo. The unpredictability is the defect.
2. *Sensitive-path guard.* Writes under `.claude/` are gated as sensitive. In headless / acceptEdits runs, the mechanical runner, any unattended cohort run, the gate denies with no human to approve, and the file lands nowhere at all.

**Decision.** Move the home out of `.claude/` and away from "memory": repo-root `observations/`. One move escapes both failure modes. The folder holds what the writer (`walk-and-send-off-3`) actually produces, observations plus business-rules gaps, i.e. the Huryn Block 1 of observations → hypotheses → rules. Decisions (Block 2) keep living in the ADR home; quality criteria (Block 3) keep living in authored skills. "Three-block memory" stays a reading frame across three homes; `observations/` is one block, not "the memory folder." This also retires a real drift: several prompts wrongly call `.claude/memory/` "the three-block memory home" when only Block 1 ever landed there.

**Name choice.** `observations/` over the previously-parked `context/`: "context" is itself a reserved platform word (context window, `/context`), so it would re-introduce the same reserved-term collision the rename exists to kill. Side benefit: a plain repo dir is runtime-agnostic, so the Gemini per-runtime path table below collapses that row to a single path.

**Gitignore stays.** Deliberate: students are not forced to commit work-in-progress during training. The cross-module hand-off never depended on git, gitignored knowledge crosses the M3/M5 worktree fork by explicit `cp -r` at fork time (`check_platform_and_boundaries.md §7b`), not by riding the M4 commit. Gitignore is therefore compatible with the fix; lifting it is possible but unnecessary, since `cp -r` ignores ignore-status.

**Why not the platform's auto-memory.** Routing is unpredictable (above), and the feature is user-scoped and per-machine, the wrong scope for codebase knowledge that must travel with the repo and the worktree fork. Some engineers also disable it. The in-repo file model is the deliberate teaching model; the rename only stops it colliding with the platform feature.

**Sweep surface** (own session): prompt registry (~8 keys touching `.claude/memory/`), exercise + module + lecture bodies (~25 files), mechanical runner (`run-m4.sh` `proj_mem_dir`, `classify_memory_write` in `lib/assertions.sh`, M4/M6 scenarios), compendiums (`check_platform_and_boundaries.md §6d`, the student-facing memory-disambiguation rule), the per-runtime path table below (row "Three-block memory"), and the `pre-cohort-todos.md` line-24 bullet. Touching student-facing files auto-degrades Quality per-class, so a `curriculum-pre-ship-audit` pass follows the sweep.

## Skills

AE101 ships three curated skills in the content tarball (build whitelist `SKILLS=()` in `scripts/build-ae101-content-tarball.sh`):

- `access-control-analysis`, used at M3 to analyze the engineer's own codebase access surface.
- `stride`, used at M3 for STRIDE threat-modelling on the same codebase.
- `security-tools`, the M3 supply-chain surprise. Framed to students as a generic security-utility pre-flight; its first STRIDE-exercise invocation runs a bundled rick-roll that lands the "external skills are a supply-chain vector" lesson. Mechanics and the don't-spoil-it rule live in `trainer-guide.md` §"M3, the security-tools surprise".

All three install to `~/.claude/skills/<name>/SKILL.md` during prework. M3 invokes them by name. M3's third exercise authors a new skill from session evidence; M6 authors a verifier-shaped skill.

The `agentic-nerd` skill at `content/skills/agentic-nerd/` is an optional self-study facilitator the engaged self-study student can install. Cohort delivery does not install or depend on it; it is not part of the curated three above.

## Prework

Prework is agentic end-to-end. The student unzips the content folder, points the agent at it, and asks the agent to walk through prework. The agent runs the repo-choice conversation, the bug-finding conversation, the install check. No "create this file, paste this content, commit these lines."

## Replay

Repo change mid-training is supported, not remedial. The student replays M1 → M(current) on the new repo in an evening. Replay is artifact regeneration, not re-learning, the pedagogy already landed. The trainer fast-paths replay.

Every module's exercises must produce artefacts deterministically enough to replay. Modules with a room-scale moment (M7 deliberation, optional) or a multi-day wait (M5 send-off) carry an explicit replay-variant path.

## Local-only work

The student's repo lives wherever the team's code actually lives. If the repo is on a synced folder (OneDrive, Dropbox, Google Drive), the repo's `CLAUDE.md` opens with a one-line runtime-naming rule per `check_platform_and_boundaries.md` §7a, *"You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads."* Most engineering repos live on local disk; the rule fires when they don't.

No persistent training-dir state. Everything you need after M1 lives in either your repo (compounding artefacts) or your head (the pedagogy).

---

## Future TODO, Gemini CLI as alternate runtime

**Status: planned, not shipped.** Today AE101 body, prompts, paths, and the content tarball assume Claude Code. Adding Gemini CLI is a coordinated diff that lands as a unit, not piecemeal. This section is the plan.

**Trigger to activate:** a sponsor or cohort asks for Gemini delivery, OR Gemini CLI hits a 1.x release with stable hooks/skills schemas. Until then, this is paper.

### Why supportable at all

The fork-test for "real fork vs. cosmetic rename" is *missing subagents OR different memory hierarchy*. Gemini CLI passes both: native subagents (`@agent-name`, parallel dispatch) and a memory hierarchy (project + global + subdir + `@import`). Capability map below shows 19 of 20 dependencies present, one workaround needed (personal-memory layer is convention, not native), and one acceptable gap (`/loop`, only used in unshipped reference material).

### Capability map (verified against official docs, 2026-05-08)

Verified by direct WebFetch on `geminicli.com` (the official Google docs site, confirmed via `github.com/google-gemini/gemini-cli` homepageUrl) and the developers.googleblog announcement. Latest stable Gemini CLI is v0.41.2 (2026-05-06).

| # | Capability | Used at | Claude Code | Gemini CLI | Source |
|---|---|---|---|---|---|
| 1 | Project memory file auto-loaded at session start | M2+ | ✅ `CLAUDE.md` | ✅ `GEMINI.md` (concatenates across hierarchy, does not override) | `geminicli.com/docs/cli/gemini-md/` |
| 2 | Personal memory file, gitignored, auto-loaded | M1+ | ✅ `CLAUDE.local.md` | ⚠️ no native named-personal layer; convention is `./GEMINI.local.md` + gitignore + `@./GEMINI.local.md` import from `./GEMINI.md` | docs silent on `.local`; confirmed absent |
| 3 | User-global memory file | optional | ✅ | ✅ `~/.gemini/GEMINI.md` | `geminicli.com/docs/cli/gemini-md/` |
| 4 | Subdirectory memory scoping | optional | ✅ | ✅ workspace + parents searched | `geminicli.com/docs/cli/gemini-md/` |
| 5 | `@file` import in memory files | M2+ optional | ✅ | ✅ `@file.md` syntax | `geminicli.com/docs/cli/gemini-md/` |
| 6 | Session transcripts on disk | M5 | ✅ `~/.claude/projects/<project>/` | ⚠️ two paths: `~/.gemini/history/<project_hash>` (git snapshots) + `~/.gemini/tmp/<project_hash>/checkpoints` (chat). Resume via `/restore`, not `--resume <UUID>` | `geminicli.com/docs/cli/checkpointing/` |
| 7 | Multiple parallel sessions on same repo (worktree) | M2+ | ✅ | ✅ generic `git worktree`, runtime-agnostic | n/a |
| 8 | Plan mode (read-only proposal turn) | M2 | ✅ | ✅ `/plan [goal]` or Shift+Tab cycle; explicit user approval to exit; auto-YOLO in CI | `geminicli.com/docs/cli/plan-mode/` |
| 9 | Show context-window usage as percentage | M1 | ✅ `/context` (% filled) | ❌ no native % display; `/stats` shows token counts only, not percentage of window | `geminicli.com/docs/reference/commands/` |
| 10 | Reset / compact session context | optional | ✅ two verbs: `/clear` resets to fresh context (prior conversation saved, resumable); `/compact` summarises history in place | ⚠️ verb fork: `/clear` is visual-only (clears display, not session); `/compress` is the actual context summariser | `geminicli.com/docs/reference/commands/` |
| 11 | Recurring local task scheduler | reference page only | ✅ `/loop <interval>` | ❌ no native equivalent; reference page calls out gap | `geminicli.com/docs/reference/commands/` |
| 12 | User-extensible slash commands | M3+ | ✅ | ✅ TOML files at `~/.gemini/commands/` (user) + `<project>/.gemini/commands/` (project) | `geminicli.com/docs/reference/commands/` |
| 13 | Skills, installable, invokable | M3, M6 | ✅ | ✅ Agent Skills at `~/.gemini/skills/<name>/SKILL.md` (also `~/.agents/skills/` alias). Activated via `activate_skill` tool | `geminicli.com/docs/cli/skills/` |
| 14 | Subagents, parallel, isolated | M4, M6 | ✅ Agent tool dispatch | ⚠️ vendor announcement (Apr 2026) confirms parallel ("dispatch multiple agents in parallel"); current docs page describes only sequential @-delegation. Likely supported with docs lag. **Re-verify before activation.** | docs/core/subagents/ vs developers.googleblog (Apr 2026) |
| 15 | Hooks, prompt-submit / stop / tool / model | M3, M5 | ✅ | ✅ 11 event types: `SessionStart`, `SessionEnd`, `BeforeAgent` (= UserPromptSubmit equivalent), `AfterAgent`, `BeforeModel`, `AfterModel`, `BeforeToolSelection`, `BeforeTool`, `AfterTool`, `PreCompress`, `Notification`. Configured in `settings.json` | `geminicli.com/docs/hooks/` |
| 16 | Permission / approval model | every | ✅ | ✅ Default / Auto-edit / YOLO / Plan modes; `--approval-mode` flag | `geminicli.com/docs/cli/plan-mode/` |
| 17 | MCP host (connectors) | M1 | ✅ | ✅ first-class MCP host; per-server tool include/exclude | repo README |
| 18 | Built-in bash / read / edit / grep | every | ✅ | ✅ all built-in, not MCP-only | repo README |
| 19 | Settings file | hooks setup | ✅ `~/.claude/settings.json` | ✅ `~/.gemini/settings.json` (user) + `.gemini/settings.json` (project) + `/etc/gemini-cli/settings.json` (system) | `geminicli.com/docs/hooks/` |
| 20 | Desktop app companion | prework | ✅ | ❌ no first-party desktop; third-party wrappers exist | n/a |

**Tally: 12 ✅, 5 ⚠️, 3 ❌.** Five ⚠️ rows mean "supported with caveat" (different verb, convention workaround, docs lag, slightly different shape). Three ❌ rows are real gaps; only #9 (`/context` percent) and #11 (`/loop`) touch AE101 body, and #11 is in unshipped reference material. #20 (desktop) is a prework-mechanic difference.

**Original-research errors corrected by direct verification (2026-05-08):**

1. **Subagent parallelism, uncertain, not confirmed ✅.** Vendor blog asserts parallel; docs page describes sequential. Live-test before activation. Was previously stated as ✅.
2. **`/context` → `/stats` is NOT a clean rename.** Gemini's `/stats` shows token counts, no native percentage display. AE101 M1's introspection beat (*"type /context, look at the unread-slice number"*) does not translate as a one-word rename; it needs reshape (different mechanic, same teaching point, *"how full is your window?"* answered via token math).
3. **`/clear` semantics differ.** Claude Code splits the work across two verbs, `/clear` resets to a fresh context window (prior conversation saved, resumable), `/compact` summarises history in place. Gemini's `/clear` is visual-only and `/compress` is the real summariser. Verb fork on both sides, with different defaults.
4. **Session-transcript path is two paths, not one.** `~/.gemini/history/<project_hash>` (git snapshots) + `~/.gemini/tmp/<project_hash>/checkpoints` (chat). Resume via `/restore`. M5's "fresh session reads M4's transcript" needs path-fork in the personal-rules path map.
5. **Hooks, `UserPromptSubmit` is renamed `BeforeAgent`.** Same firing moment, different name. Rename, not gap.
6. **Latest version v0.41.2 (2026-05-06)**, not v0.40.0. Confirms sub-monthly minor-release cadence; pre-1.0 churn risk holds.

Re-verify the matrix before each Gemini-cohort activation; pre-1.0 schema drift on hooks and skills is real.

### Per-runtime path table (for the Module 1 path-map block)

| Slot | Claude Code | Gemini CLI |
|---|---|---|
| Personal rules file | `./CLAUDE.local.md` (auto-loaded, gitignored) | `./GEMINI.local.md` (gitignored; `@./GEMINI.local.md` import from `./GEMINI.md`) |
| Team rules file | `./CLAUDE.md` (auto-loaded, PR-reviewed) | `./GEMINI.md` (auto-loaded, PR-reviewed) |
| User-global rules | `~/.claude/CLAUDE.md` | `~/.gemini/GEMINI.md` |
| Skills folder | `~/.claude/skills/<name>/SKILL.md` | `~/.gemini/skills/<name>/` |
| Custom agent files | `.claude/agents/<name>.md` | `.gemini/agents/<name>.md` |
| Knowledge home (observations) | `observations/` | `observations/` |
| Settings | `~/.claude/settings.json` | `~/.gemini/settings.json` |
| Session transcripts on disk | `~/.claude/projects/<project>/` | `~/.gemini/tmp/<projectHash>/` |

### Diff plan (Approach D, tool-agnostic body + Module 1 self-encoding)

The cheap, durable shape: write body prose abstractly, push runtime-specific paths to three edges. When the next CLI ships, the body doesn't move.

1. **Body style pass.** Sweep AE101 module files (~10) and AE101-touching exercise files (~25) for hardcoded `./CLAUDE.md`, `./CLAUDE.local.md`, `~/.claude/skills/`, `~/.claude/agents/`, "Claude Code session," "Claude Code." Replace with abstract phrasing: *"your personal rules file"*, *"your team rules file"*, *"your skills folder"*, *"your agent session."* Most edits are single-line phrasing swaps. Some prompt blocks need a small re-shape so the agent infers the path from the rules file rather than receiving it inline. Not every Claude-Code reference is a violation, the trainer-guide and maintainer blocks can stay tool-named where they're delivery-context.

2. **Module 1's compound exercise picks up a path-map block.** When `compound-and-close.md`'s prompt writes `./CLAUDE.local.md` (or `./GEMINI.local.md`) from session evidence, it also writes a four-to-six-line path-map block naming the local conventions: where personal rules live, where team rules live, where skills live, where the agent file folder lives. From M2 onward, every fresh session reads this at cold-start, so abstract body prose resolves correctly. One prompt edit. Load-bearing for the whole approach.

3. **Prework runtime pick + install branch.** Add one line at the top of `prework.md`: *"You're on Claude Code or Gemini CLI?"* Branches to a short install paragraph per runtime (~6 lines each), then reconverges. The Gemini install paragraph carries the `./GEMINI.local.md` convention setup (gitignore line + `@import` from `./GEMINI.md`).

4. **One new reference page.** `curriculum/trainings/agentic-engineering-101/reference/gemini-cli-for-engineers.md` as peer of the existing `claude-code-for-engineers.md`. Four-layer hierarchy mapped to `GEMINI.md` + global + subdir + `@import`, common command translations, MCP install per tracker, the `/loop` runtime-difference callout. The renderer's existing per-runtime include picks the right page based on the student's runtime.

5. **Content tarball, dual-format skills.** `scripts/build-ae101-content-tarball.sh` extends to ship skill copies in both formats: Claude Code skill format under `content/skills/claude-code/<name>/SKILL.md`, Gemini Agent Skill format under `content/skills/gemini/<name>/`. The tarball builder picks based on runtime variable. Re-author each curated skill (`access-control-analysis`, `stride`) once in Gemini format. ~one afternoon.

6. **Compendium amendment.** `memory/check_platform_and_boundaries.md` §1 currently says *"Training platform = Claude Code (CLI + Desktop) + Cowork"* as a global rule. Amend to *"Per training; see the training's architecture file"* and let each `training-architecture.md` carry the contract.

7. **Update the architecture doc.** Once 1–6 ship, this §Future TODO collapses into the main body. The capability matrix and per-runtime path table promote up; the diff-plan section deletes.

### Sequencing

1. **Pilot D on one module first.** Pick the most path-heavy exercise in M1 (`compound-and-close.md`) and rewrite tool-agnostic; write the path-map block; gut-check both runtimes by running the exercise on a real repo in each. If the abstract phrasing reads natural and the path-map block lands cleanly, proceed.
2. **Sweep AE101 in two passes.** Module files first, then AE101-touching exercises. ~one focused session each.
3. **Ship the reference page + dual-format skill copies + compendium amendment + prework branch as one PR.** All-or-nothing, partial landing leaves the body inconsistent.
4. **Defer renderer-level runtime divs.** `rt-gemini` divs in module bodies should stay rare. The point of Approach D is that the body doesn't fork. If a div seems necessary, first try moving the runtime-specific bit into the path map (Module 1), the reference page, or the prework install paragraph. Renderer divs are reserved for the few places where a UI affordance genuinely differs (Connector install button vs settings panel).

### Risks to watch

- **Pre-1.0 schema drift.** Gemini CLI ships sub-monthly minors as of 2026-05-08 (latest stable 0.40.0). Hooks and skills schemas have moved between 0.3x and 0.4x. The dual-format skills and any hook references in the reference page need re-validation on each Gemini-cohort delivery.
- **`./GEMINI.local.md` is convention, not native.** If a student forgets the gitignore + `@import` setup, their personal rules end up in the team file or aren't loaded at all. The prework install paragraph has to handle this idempotently.
- **Tool-agnostic prose can read awkwardly**, *"your personal rules file"* repeated ten times in a body becomes noise. Pilot on M1 before sweeping; if the prose suffers, fall back to per-prompt runtime divs and accept the higher edit surface.
- **Mid-training repo move across runtimes is unsupported.** A student starting on Claude Code and switching to Gemini CLI mid-cohort would carry a stale path map. Replay covers it (the M1 compound exercise re-runs and rewrites the map for the new runtime); not a designed feature.

### What this section is NOT

- Not a buy-or-build decision. The sponsor question (does any cohort actually need Gemini delivery?) lives in the strategy doc, not here.
- Not a marketing position. AE101 is canonical on Claude Code and stays canonical on Claude Code; Gemini support is alternate-runtime hospitality, not platform-neutral framing.
- Not a vendor-comparison surface. The reference pages translate Claude commands to Gemini commands for a student who already chose; they don't argue which runtime is better.
