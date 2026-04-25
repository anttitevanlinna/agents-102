# Mechanical execution tests

Unit-layer tests that **run an exercise's prompt chain on a real scratch repo** and assert on the file-system artifacts + transcript. Complements static lints and three-persona sims.

## Why this works — and what makes it honest

A simulation predicts Claude behaviour. A mechanical execution **observes** it. Different epistemic status.

The harness rests on one platform fact: every subagent dispatched from a Claude Code session writes its full transcript to `~/.claude/projects/<project>/<session-id>/subagents/agent-<id>.jsonl`. Every user/assistant turn, every tool call, every tool result. That file is the ground truth for what a subagent did, independent of what its summary says.

Consequence: we can split actor from judge from auditor. No agent grades itself.

## Three roles, three agents, three files

- **Actor** — subagent dispatched with a runner's actor prompt. Does not see the assertion list. Arranges the scratch, executes the exercise's prompt chain, writes artifacts. Returns a one-line *"done"* and the path to the final scratch state.
- **Judge** — subagent dispatched after Actor completes. Reads two inputs: the scratch file state, and the Actor's transcript `.jsonl`. Runs the assertions against both. Returns pass/fail per assertion with quoted evidence from file state OR transcript.
- **Auditor** — main session (you). Reads the Judge report. If a claim sounds thin, opens the Actor transcript directly and verifies.

The Actor can't game the Judge — the Judge reads the transcript. The Judge can't game the Auditor — the Auditor can read the same transcript. No collapsed grading.

## What this catches (and what it doesn't)

Catches, by construction:

- Path duplication, scope drift inside prompt blocks.
- Cross-exercise state transfer (does Ex2 read what Ex1 left; does Ex3 read Ex1+Ex2's session).
- Placeholder leaks into output files.
- Skill / MCP invocation shape mismatches.
- Append-vs-integrate default drift in file writes.
- Question-dump behaviour where a prompt says *"one at a time."*
- Actor self-reports that don't match transcript evidence.
- Latent assumptions that only fire on real git / real filesystem state (example: Ex3's *"`.claude/settings.local.json` is gitignored by default"* — only true on machines with `core.excludesFile` covering it; caught on the first live run).

Does not catch — belongs to other layers:

- Claude Code UI specifics (plan mode, skill auto-discovery, connector installer) — capability checks.
- Room mood, register drift — three-persona sims.
- Student-in-the-loop reactions — acceptance layer.

**TODO — confirm subagents can launch skills reliably.** M3 + M4 mechanical runs consistently surfaced the same gap: nested subagents (a Task-dispatched Actor trying to Task-dispatch a skill) did not have the `Task` tool available, so `access-control-analysis` / `stride` ran inline under a harness-substitution note instead of in isolated fresh-context subagents. The content fidelity held, but the subagent-isolation property the exercises rely on was not tested at this layer. Before shipping AE101 to a cohort, verify end-to-end in a real (non-nested) Claude Code session that a student's Actor can launch a skill as a subagent, receive its output, and carry on. If this turns out to be a Claude Code limitation rather than a harness one, exercises that say "invoke as subagent" need rewording and a capability-check note.

Where a prompt leans on a primitive the Actor lacks (`/context`, `/add-dir`, MCP, plan mode), Actor substitutes the observable effect and logs it. The Judge flags substitution fidelity against a known table; real primitives stay with capability checks.

## Substitution table

Known substitutions the Actor logs and the Judge treats as PASS-with-FLAG (not FAIL):

| Student would do | Actor substitutes | Why |
|---|---|---|
| `/context` slash command | Enumerate files Read so far vs. files present | Subagent has no slash-command surface |
| `/add-dir <path>` | Direct edit of `.claude/settings.local.json` with `additionalDirectories` array | Same |
| MCP connector to tracker | Path-3 manual paste: write close-out to a file in `instances/` | No MCP in subagent env |
| `gh pr create` | `git commit` on the branch, note "no gh" | `gh` not authenticated in subagent |
| Plan mode | Produce plan as text, no Write/Edit/Bash-that-mutates | No plan-mode primitive in subagent |
| Write to `.claude/settings.local.json` | **Log the intended JSON edit; do NOT attempt the write.** Sandbox denies self-modification of the subagent's own `.claude/`; Judge grades the logged intent. | Platform sandbox on subagent self-config |
| Dispatch skill as subagent (`Task` tool) | Run skill inline, label as substitution | Nested Task-in-Task currently unavailable (see TODO above); content-fidelity only, isolation property not tested |

## Orchestrator discipline — per-dispatch artifacts

Multi-role runs (M2-shape: Actor → Critic → Actor → Critic) can contaminate downstream roles if the orchestrator points them at a shared growing scrollback file. H2 FAILed on the first M2 run for exactly this reason — Critic dispatches 3b, 4-A1, 4-A2, 4-close all Read `m2-verbatim-actor-scrollback.md`, which contains Actor meta-text across every phase, not just the phase being critiqued.

The fix is orchestrator-side, not runner-side:

1. After each Actor dispatch, the orchestrator **extracts the phase output** (plan v1, plan v2, the specific question, etc.) to `/tmp/<runner>-<phase>.md`.
2. The next Critic/Judge dispatch gets **only that artifact** as its plan/input source, plus scratch files + rules files. It does NOT read the shared scrollback.
3. Critic/Judge writes its own per-phase output, either into its own scrollback or to another `/tmp/<runner>-<phase>.md`, and the orchestrator passes that forward.

Validated by M2 rerun (commit `cbad8f2`): Critic 3a dispatched with only `/tmp/m2-rerun-plan-v1.md` produced two substantive push-backs; transcript grep confirmed zero reads of any actor scrollback.

## Verbatim-prompt round-trip helper

`bin/verbatim-check.sh <prompt-file> <scrollback-file>` runs the V-series round-trip check with blockquote normalization (strips `^> ?` per line before comparing). Use it in every judge runner that grades V-assertions — raw `grep -F` and Python `in` both fail on multi-paragraph prompts because the Actor pastes them as `> `-prefixed blockquotes. Exits 0 on match, 1 on miss.

## Layout

```
mechanical/
├── README.md                             this file
├── playgrounds/
│   ├── lemmings-seed/                    clean seed, committed — NO maintainer docs
│   └── lemmings-seed.maintainer.md       maintainer doc sibling, planted-state table
├── runners/
│   ├── m1-chain.actor.md                 runner Actor prompt, no assertions
│   └── m1-chain.judge.md                 runner Judge prompt, assertion list
├── scratch/
│   └── <runner-slug>/                    per-run working tree, Actor-visible only
├── instances/
│   ├── <runner-slug>-actor-report.md       Actor's terse return
│   ├── <runner-slug>-judge-report.md       Judge's pass/fail per assertion
│   └── <runner-slug>-notes.md              Auditor notes after reading transcript
└── .gitignore                            scratch/* and instances/scratch-* gitignored
```

Harness artifacts live in `instances/`, never inside the scratch tree. The Actor sees a clean repo; the Judge and Auditor see everything.

## How to run a runner

Single main-thread session, sequential:

1. **Dispatch Actor.** New Agent call, subagent_type `general-purpose`, prompt = `runners/<runner>.actor.md`. Wait for completion.
2. **Find the Actor's transcript.**
   ```
   SESSION_DIR=~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<current-session-id>
   ls "$SESSION_DIR/subagents/"  # the newest agent-*.jsonl is the Actor
   ```
   Or: the Actor writes its own transcript path to `instances/<runner>-actor-report.md` as its last action (simpler; works without the Auditor hunting for session-id).
3. **Dispatch Judge.** New Agent call. Pass two paths: the scratch dir and the Actor's `.jsonl`. Prompt = `runners/<runner>.judge.md`. Waits for completion, writes `instances/<runner>-judge-report.md`.
4. **Auditor reads Judge report.** Spot-check one or two assertions against the transcript directly. If Judge and transcript agree, trust the harness run. If they diverge, the Judge prompt needs work, or the substitution table is wrong.

Parallelism: runners for different modules are disjoint — dispatch multiple Actors in a single message. Judges fan out the same way after Actors complete.

## Arrange → Act → Assert → Transcript

Every Actor prompt follows this shape:

1. **Arrange.** Copy seed → scratch. `git init` the scratch. Apply module-specific patch (planted bug for M1; target feature for M3; un-packaged artifact for M5). Commit with a **neutral message** — never name the bug. Set up prework-assumed state outside the scratch (`.claude/settings.local.json`, `~/.claude/skills/<skill>/`, content-folder pin).
2. **Act.** Execute each prompt block in the exercise file, in order. Record scrollback to `instances/<runner>-actor-report.md`. Do NOT scan for planted state; behave as the student would on their real repo.
3. **Write the report.** Terse — a few lines summarising what was done. The transcript carries the detail.

Every Judge prompt follows this shape:

1. **Read scratch state + Actor transcript.** Bash + Read.
2. **Run assertions.** For each assertion, find evidence in file state, transcript, or both. Quote it. PASS / FAIL.
3. **Write `instances/<runner>-judge-report.md`.** One line per assertion with evidence. Summary at top, harness-substitution list at bottom.

## Neutral Arrange discipline (hard rule)

Commit messages, file contents, and directory names in the scratch must not reveal planted state. Good: `initial commit`, `wip`, `squash-this`, `feature branch`. Bad: `bug: isSolid inverted`, `planted: weak JWT`, `todo: fix score endpoint`. The Actor is a student on Monday; the scratch is their repo.

## Seed provenance

`playgrounds/lemmings-seed/` is a clean vanilla-JS Lemmings prototype with a WIP Node/SQLite/JWT backend. No tests, no maintainer docs inside the tree. Source copied 2026-04-24 from `~/Projects/lemmings/` (not in git there); backend added same day for M3's STRIDE surface. Planted-state table lives at `playgrounds/lemmings-seed.maintainer.md` — sibling to the seed, never inside it.
