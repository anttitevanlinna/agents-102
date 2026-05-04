# Mechanical execution tests

**Acceptance tests for prompt chains.** Black-box, scripted, deterministic. The Actor runs the exercise's prompts on a real scratch repo; the Judge runs scripts against the resulting file state + transcript and reports pass/fail. Content quality is NOT graded here — that lives in the eval system.

If you find yourself reading scrollback to judge whether the SKILL.md is "good," or whether the strengths are "specific enough," stop — wrong layer.

## What this layer does (and doesn't)

**Tests, by construction:**

- Verbatim prompt round-trip (the prompt the student would paste actually appears in the session).
- File artefacts exist at the paths the prompt names, with the SHAPE the prompt asks for (a 23-row table is a 23-row table, four named sections are four named sections).
- Cross-exercise state transfer (Ex2 read what Ex1 wrote; Ex3 read Ex1+Ex2's session).
- Placeholder leaks into output files.
- Skill / MCP invocation shape.
- Question-dump behaviour where a prompt says *"one at a time."*
- Latent assumptions that only fire on real git / real filesystem state.
- Static lint of the curriculum source itself (`bin/prompt-source-audit.sh`).

**Doesn't test — out of scope, lives elsewhere:**

- Whether the HTML / SKILL.md / ADR / brand rules read well — eval system (LLM-as-judge + persona sims).
- Whether the strengths are specific or generic — eval system.
- Whether the self-critique is substantive — eval system.
- Claude Code UI specifics (plan mode, slash commands, skill auto-discovery) — capability checks.
- Room mood, register drift — three-persona sims.
- Student-in-the-loop reactions — acceptance layer (real cohort).

## The script ratchet

The aspiration: every Judge run should leave behind one more script that the next run doesn't need an LLM for. **Scripts are the unit of progress.** Prompt extraction is already a script (`parse-prompts.sh`); the verbatim round-trip is a script (`bin/verbatim-check.sh`); the curriculum-source lint is a script (`bin/prompt-source-audit.sh`). Anything else a Judge does today that COULD be a `bash` / `jq` / `grep` / `awk` one-liner SHOULD become one over time.

The aspirational endpoint: `bin/judge.sh <runner-slug>` runs the full assertion battery and writes the markdown report — no LLM Judge at all. We're not there yet; treat the LLM Judge as a transitional orchestrator that calls scripts and synthesizes their output, not as an assertion-grader. When a Judge writes the same script-replaceable assertion twice, lift it to `bin/`.

## Runner shape — chain runners

A runner that walks a chain of source-exercise prompts (`agents-101-m2` is the canonical example) uses one `### Phase N — slug` heading per prompt, plus per-phase tags so `runner-mapping-check.sh` knows which exercise's prompt set the phase belongs to:

```
### Phase 5 — distinctive-claims

**Exercise:** build-your-challenge-memory
**Reads:** prompt-003.txt

<phase body>
```

Two rules learned the hard way:

1. **Slug uniqueness.** The phase slug must contain words that appear in the *referenced* prompt and *not* in any other prompt in that exercise. Pre-flight scores keyword overlap; a slug like `name-questions` whose words happen to appear in another prompt (e.g. "folder *names*") will fire a phase-swap FAIL. Pick words you can grep in `/tmp/prompts/<exercise>/prompt-NNN.txt`.
2. **Coverage.** Pre-flight FAILs if any extracted prompt has no phase reading it (the runner is missing a phase). Multi-actor patterns (M3 retrievers, M5 setup/detector/scorer) split coverage across multiple actor runners and will show partial coverage per-actor — that's by design; the family covers it together.

For unnumbered closing sections, `### Close — slug` and `### Setup — slug` are also recognised. Heading without a `prompt-NNN.txt` reference in the body is ignored (organising headers like `### Pre-staging notes` are fine).

## V-checks — transcript, not scrollback

`bin/prompt-read-check.sh <prompt> <transcript.jsonl>` is the canonical V-check. The transcript records every `Read` tool-use; a `Read` of `prompt-NNN.txt` is unforgeable evidence the model received the prompt content unmodified.

The older `bin/verbatim-check.sh` greps a scrollback file the Actor wrote, looking for the prompt text under blockquote normalization. Haiku skipped the blockquote-paste on short prompts mid-chain (M2 run 1 lost V6/V8/V9/V10 this way). Keep `verbatim-check.sh` for substitute-paste assertions (e.g. M1 A1 confirms the LinkedIn paste appears in scrollback before Prompt 1 — that one *is* about scrollback content); migrate every prompt V-check to the transcript-based form.

## Run on Haiku

Both Actor and Judge dispatch with `model: "haiku"`. The contract — mechanics + light shape sampling, no taste — is exactly what Haiku is good at. The constraint also forces simplicity: if an assertion can't be reduced to a script call or a `jq`/`grep` one-liner that Haiku can run, it doesn't belong in this layer.

## Three roles, three agents, three files

- **Actor** — subagent dispatched with a runner's actor prompt. Does not see the assertion list. Arranges the scratch, executes the exercise's prompt chain, writes artefacts. Long generated content (HTML bodies, full SKILL.md prose) may be stubbed — the Judge does not grade content quality, only structure and presence. Returns a one-line *"done"* and the path to the final scratch state.
- **Judge** — subagent dispatched after Actor completes. Calls `bin/` scripts against the scratch state + Actor's `.jsonl` transcript. Reports script exit codes and first-line outputs. Does not quote scrollback to grade prose.
- **Auditor** — main session (you). Reads the Judge report. If a script's verdict sounds thin, opens the Actor transcript directly and verifies.

The Actor can't game the Judge — the Judge reads the transcript. The Judge can't game the Auditor — the Auditor can read the same transcript and rerun the same scripts. No collapsed grading.

## How to run a runner

Single main-thread session, sequential:

1. **Dispatch Actor with `model: "haiku"`.** Agent call, subagent_type `general-purpose`, prompt = `runners/<runner>.actor.md`. Wait for completion.
2. **Find the Actor's transcript.** The Actor writes its own transcript path to its report as its last action (simpler than hunting for session-id). Or:
   ```
   SESSION_DIR=~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<current-session-id>
   ls "$SESSION_DIR/subagents/"  # newest agent-*.jsonl is the Actor
   ```
3. **Dispatch Judge with `model: "haiku"`.** Pass two paths: the scratch dir and the Actor's `.jsonl`. Prompt = `runners/<runner>.judge.md`. Writes `instances/<runner>-judge-report.md`.
4. **Auditor reads Judge report.** Spot-check one or two assertions by re-running the named script. If script and report agree, trust the run. If they diverge, the runner needs work.

Parallelism: runners for different modules are disjoint — dispatch multiple Actors in a single message. Judges fan out the same way after Actors complete.

## Layout

```
mechanical/
├── README.md                             this file
├── bin/                                  scripted assertions (the ratchet)
│   ├── prompt-read-check.sh              V-checks — transcript jq for Read of prompt-NNN.txt
│   ├── verbatim-check.sh                 substitute-paste check (linkedin, hate-list etc.)
│   ├── prompt-source-audit.sh            P/E checks (curriculum source lint)
│   ├── runner-mapping-check.sh           pre-flight: phase ↔ prompt mapping + coverage
│   ├── stage-agents-101-mocks.sh          copy tracked mocks → /tmp/agents-101-mocks/
│   ├── run-mechanical.sh                 one-shot orchestrator: pre-flight + parse + stage
│   ├── preflight-all.sh                  survey every actor runner's pre-flight verdict
│   └── continuation-diff.sh              HTML-aware diff for v-N → v-N+1 continuity
├── parse-prompts.sh                      one-shot prompt extraction from exercise .md
├── playgrounds/
│   ├── lemmings-seed/                    clean seed, committed — NO maintainer docs
│   └── lemmings-seed.maintainer.md       maintainer doc sibling, planted-state table
├── runners/
│   ├── <runner>.actor.md                 Actor prompt; no assertions
│   └── <runner>.judge.md                 Judge prompt; calls bin/ scripts + reports
├── scratch/
│   └── <runner-slug>/                    per-run working tree, Actor-visible only
├── instances/
│   ├── <runner-slug>-actor-report.md     Actor's terse return
│   ├── <runner-slug>-judge-report.md     Judge's pass/fail per assertion
│   └── <runner-slug>-notes.md            Auditor notes after reading transcript
└── .gitignore                            scratch/* and instances/scratch-* gitignored
```

Harness artefacts live in `instances/`, never inside the scratch tree. The Actor sees a clean repo; the Judge and Auditor see everything.

## Sandbox bypass for the scratch tree (hard requirement)

Subagent Bash defaults to sandbox-on, which denies writes outside `/tmp` — including writes to the scratch repo's `.git/`, working tree, and `node_modules/`. Mechanical eval scratch dirs ARE real working trees the Actor must mutate (commit, run tests, install deps). Without bypass, every Actor run shows "intended X, denied" instead of observable artefacts.

**The fix:** every Actor runner instructs the Actor to set `dangerouslyDisableSandbox: true` on Bash calls that mutate the scratch (`git`, `npm`, `node` test runs, anything writing under `<scratch>/`). Read-only Bash (ls, cat, grep) doesn't need it.

`Edit` / `Write` tools: the Actor's working directory at dispatch is the scratch path, so writes inside it land. **Exception:** `<scratch>/.claude/settings.local.json` is treated as the subagent's own self-config and denied even with bypass — substitution table covers this.

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
| Dispatch skill as subagent (`Task` tool) | Run skill inline, label as substitution | Nested Task-in-Task currently unavailable (see TODO below); content-fidelity only, isolation property not tested |

**TODO — confirm subagents can launch skills reliably.** M3 + M4 mechanical runs surfaced the same gap: nested subagents (Actor → skill via Task) did not have the `Task` tool available, so `access-control-analysis` / `stride` ran inline under a harness-substitution note. Before shipping AE101 to a cohort, verify in a real (non-nested) session that a student's Actor can launch a skill as a subagent and carry on.

## Orchestrator discipline — per-dispatch artifacts

Multi-role runs (Actor → Critic → Actor) can contaminate downstream roles if the orchestrator points them at a shared growing scrollback. The fix is orchestrator-side:

1. After each Actor dispatch, the orchestrator extracts the phase output (plan v1, plan v2, the specific question) to `/tmp/<runner>-<phase>.md`.
2. The next Critic/Judge dispatch gets ONLY that artefact as its input, plus scratch files. Does NOT read the shared scrollback.
3. Critic/Judge writes its own per-phase output; the orchestrator passes that forward.

## Arrange → Act → Assert

Every Actor prompt follows this shape:

1. **Arrange.** Copy seed → scratch. `git init`. Apply module-specific patch. Commit with a **neutral message** — never name the bug. Set up prework-assumed state outside the scratch.
2. **Act.** Execute each prompt block in order. Record scrollback to `instances/<runner>-actor-scrollback.md`. Do NOT scan for planted state; behave as the student would.
3. **Report.** Terse — a few lines summarising what was done. The transcript carries the detail.

Every Judge prompt follows this shape:

1. **Run scripts** (`bin/verbatim-check.sh`, `bin/prompt-source-audit.sh`, `jq`/`grep` one-liners against the transcript and scratch state).
2. **Capture exit codes + first-line outputs.** No quoting beyond what scripts emit.
3. **Write `instances/<runner>-judge-report.md`.** One line per assertion with the script's evidence.

## Neutral Arrange discipline (hard rule)

Commit messages, file contents, and directory names in the scratch must not reveal planted state. Good: `initial commit`, `wip`, `squash-this`. Bad: `bug: isSolid inverted`, `planted: weak JWT`. The Actor is a student on Monday; the scratch is their repo.

## Seed provenance

`playgrounds/lemmings-seed/` is a clean vanilla-JS Lemmings prototype with a WIP Node/SQLite/JWT backend. Source copied 2026-04-24 from `~/Projects/lemmings/`; backend added same day for M3's STRIDE surface. Planted-state table lives at `playgrounds/lemmings-seed.maintainer.md` — sibling to the seed, never inside it.
