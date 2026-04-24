# Harness lessons — 2026-04-24 M1 chain run

First live run of the mechanical-execution harness. Eight generalizable findings, ordered by how much they affect M2–M6 runners. Fix items 1–3 before writing the next runner. Items 4–8 are refinements.

## 1. Seed leaks its own documentation into scratch

**What happened.** The seed's `README.md` (maintainer-facing; documents every planted STRIDE target + the M1 `isSolid` inversion) got copied into scratch via `cp -R`. A real Claude-the-student would read it on orientation and game every exercise downstream.

**Fix.** Move the maintainer README out of the seed tree. New layout:

```
mechanical/
├── playgrounds/
│   ├── lemmings-seed/            ← clean repo, no maintainer docs
│   └── lemmings-seed-docs.md     ← maintainer doc, sibling to the seed
```

Or: keep README inside the seed but have every runner's Arrange step `rm` it as the first move. Cleaner is the sibling-file layout — less ceremony per runner.

## 2. Commit messages leak the planted state

**What happened.** My Arrange step committed the planted bug with message `bug: isSolid inverted`. Ex1's orient-and-introspect immediately saw the commit log and identified the bug. Compromises Ex2's root-cause move.

**Fix.** Arrange step uses neutral commit messages only. Patterns:
- Initial state: `initial commit` or `wip`.
- Planted bug: `squash-this` or `wip: in progress`.
- Never name the bug or feature in the message.

The student-Claude finds the bug by reading code and tests, not by reading the log. That's the teaching.

## 3. Harness tells about itself through `.mechanical-test/`

**What happened.** The runner writes scrollback + summaries to `.mechanical-test/` inside the scratch repo. A comprehensive `ls` reveals the harness. Ex1's orientation prompt saw it.

**Fix.** Move harness-internal state OUT of the scratch tree:

```
mechanical/
├── scratch/
│   └── m1-chain/          ← pure student-visible tree, nothing else
└── instances/
    └── scratch-m1-chain-2026-04-24/
        ├── ex1-scrollback.md
        ├── ex2-scrollback.md
        ├── ex3-summary.md
        └── close-out-draft.md
```

Or: name the dir `.harness/` with a rule that no runner scans hidden dirs. But dirs starting with `.` are exactly what gets scanned by thorough agents. Sibling-layout again.

## 4. Assertion units need to match the artifact shape

**What happened.** Assertion A11 said *"summary is 3–5 lines"*. `wc -l` returned 7 because the summary is 4 paragraphs separated by blanks. The exercise prompt says "3–5 lines" meaning paragraphs; the assertion counted newlines.

**Fix.** Every assertion names a concrete unit and a verification command:
- `3–5 paragraphs, each under 60 words` — verifiable with `awk 'BEGIN{RS=""}' | wc -l` (counts paragraphs) + per-paragraph word count.
- `file is valid JSON` — `python3 -c "import json; json.load(open('x'))"` exits 0.
- `no placeholders` — `grep -n '\[[A-Z]' file` returns nothing.

Ambiguous unit = unreliable assertion = useless signal.

## 5. "The student-Claude has Bash/Read/Write/Edit, not UI"

**What happened.** Three prompts leaned on primitives the runner doesn't have: `/context`, `/add-dir`, MCP. Two of the three have clean observable substitutes (file listing for `/context`; direct JSON edit for `/add-dir`). The third (MCP) has a designed fallback in the exercise (path 3 = manual paste).

**Fix.** Write a **substitution table** in the harness README once, reference from every runner:

| Primitive | Runner substitute | Fidelity |
|---|---|---|
| `/context` | file-read log vs tree-listing | coarse — no token accounting |
| `/add-dir` | direct edit of `.claude/settings.local.json` | identical |
| Plan mode | "describe your plan first" prompt wrap | no regeneration loop |
| Skill auto-discovery | explicit file paths in prompts | breaks "invoke by name" check |
| MCP connector | file-based tracker stub OR path-3 fallback | depends on the exercise |

Substitutions documented up front; every runner's A19 lists which ones fired. The fidelity column tells us what the harness can't see — those risks stay with capability checks and manual acceptance.

## 6. Bug-selection criterion for planted state

**What happened.** One-line `isSolid` fix had no push-back surface — *"what line would you have written differently?"* has nothing to chew on.

**Fix.** Arrange step for any module whose exercise includes a diff push-back move plants a bug whose fix is **at least 3–5 lines with a taste choice somewhere** (variable naming, guard placement, test structure). For M1, a slightly bigger bug (e.g., an off-by-one in `fillRect` that produces a subtle leak + needs an off-by-one-aware test + a three-line refactor of the loop bounds) would give the push-back beat surface.

Rule of thumb: planted bugs must produce the full pedagogy's diff, not the smallest fix.

## 7. The "student has prework scrollback" assumption

**What happened.** Ex2 says *"Bring the bug back. In prework, Claude surfaced three candidates and you picked one. Paste the bug back."* The harness has no prework scrollback; the runner supplies the bug description as a standalone. This works for Ex2 but papers over the prework dependency.

**Fix.** Two options:
- **Lightweight:** every runner specifies the "stand-in prework state" explicitly (bug description, repo context, any skills installed). Runner prompt documents the stand-in so the report can flag whether it distorts the exercise.
- **Proper:** add a prework runner that produces real prework scrollback (installs skills, surfaces three candidate bugs, picks one). Downstream runners inherit its output as the starting state.

The lightweight path is cheap and enough for M1–M4. The proper path is worth it before M5 because M5 reads M4's actual artifact — the chain needs genuine handoff, not stand-ins.

## 8. Fidelity-vs-speed: run-in-session vs subagent dispatch

**What happened.** This run happened in Antti's main session so meta-notes could be taken live. Cost: ~15 minutes of main context burned on setup + file-reads + test runs.

**Fix.** Two modes, named:
- **Audit mode** (run-in-session): used when the goal is diagnosing the harness or the exercise. Main thread keeps commentary. Cost is context, payoff is insight. Today's run was audit mode.
- **Battery mode** (subagent dispatch): used for routine pre-cohort verification. Subagent runs Arrange → Act → Assert → Report, returns the instance file only. Parallelizable across modules. Cost is nil for main context, payoff is pass/fail signal.

Every runner has both invocations documented. First run of a new runner = audit mode. Routine regression runs after content edits = battery mode.

## Net of the run

The harness works. Eight findings surfaced in one hour; all are fixable without redesigning the approach. Items 1–3 are blockers for the next runner; items 4–8 ship as polish alongside M2's runner.

**Validated:** the Arrange → Act → Assert → Report shape does catch chain bugs a static lint and a persona sim couldn't find (e.g., the latent `.gitignore` assumption in Ex3 that only fires on a fresh laptop — no sim would catch this because sims don't touch gitignore state).

**Invalidated:** none of the assumptions I made writing the runner prompt turned out to be wrong. The shape transfers.

**Next moves:**
1. Fix items 1–3 in seed + runner template.
2. Re-run M1 audit mode to confirm findings hold after fixes.
3. Write M2 runner using the corrected template.
4. Write a prework runner before touching M3 (item 7's "proper" path earns its keep once M3 depends on installed skills).
