# Quality-state tagging

Canonical format spec. Loaded by `/curriculum-pre-ship-audit`, `/wind-down`, and any session touching Quality lines. Pointer from `curriculum/CLAUDE.md`.

Every student-facing artifact (module / exercise / lecture / prework) carries a Quality line in its maintainer block. The contract between sessions.

**LLM-checks ladder** (cheap → expensive; each tier earns the next):
`compendium-audited` → `sim-passed` → `mechanical-tested`.

No `draft` rung (removed 2026-05-31). A file is either audited — `compendium-audited` or higher — or carries no Quality line at all. Un-audited is the absence of a state, not a state; the stamper refuses to fabricate one (`update-quality.sh` errors rather than mint a floor).

`mechanical-tested` evidence comes from the **tmux-runner** battery. The old `curriculum/evals/mechanical/bin/judge.sh` runner is decommissioned (2026-05-31); its pins no longer count and degrade to "pending tmux-runner re-run."

The ladder tops at the last thing an LLM/script can verify. Delivery reality (a cohort ran it; survived many) is NOT a rung — touch-degrade would forbid ever standing on one. It lives on the `- cohorts:` log row below: a factual record, not touch-degraded.

**Orthogonal axis:** `maintainer-reviewed` — Antti read end-to-end + ran prompts manually. Own dimension-log row, never folded into LLM provenance.

**Format** (top-state line + dimension log in maintainer block):
```
**Quality:** <top-state> <YYYY-MM-DD> (writing@<sha> story@<sha> technical@<sha> behavior@<sha> pedagogy@<sha> strategy@<sha>)
- judges @<sha>: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- cross_module @<set-sha>: PASS — set=[<M(N)>, <M(N+1)>, ...]    # module-set scope; only when ≥2 modules audited together
- maintainer-reviewed <YYYY-MM-DD> (<one-line note>)
- sim-passed <YYYY-MM-DD> (<persona names + scores>)  # carry forward when storytelling or behavior judge regen + PASS
- mechanical-tested <YYYY-MM-DD> (<judge-report-path> @ <short-sha> PASS)
- cohorts: <none yet | cohort-name + date + post-cohort changes>
```

`compendium-audited` carries six per-class git short-SHA pins. Per-file classes mirror the compendium split:

| Class | Surface | Compendium |
|---|---|---|
| `writing` | banned words / register / surface lints | `check_writing.md` |
| `story` | mood / teaching moment / arc (Class A sim trace) | storytelling-class |
| `technical` | platform claims / citations / static prompt mechanics | technical-class |
| `behavior` | per-prompt distribution vs 15-pattern catalog (Class B sim trace) | `check_prompts.md` + behavior-class |
| `pedagogy` | module architecture + dynamics (static) | `check_pedagogy.md` |
| `strategy` | file × strategy-doc alignment (static) | `check_strategy_tie_in.md` |

Each class's SHA = file's git short-SHA when that judge passed.

**Cross_module** = separate axis (own row), not per-file pin. Fires at module-set scope (`/curriculum-pre-ship-audit` when ≥2 modules audited together). Stamps each module in set; touching any member degrades the row for all; restored when set re-audits clean.

## Key rules

- **Auto-degrade is touch-based, not time-based.** File touched after audit date → that tier and higher degrade. Cosmetic edits below `<!-- maintainer -->` don't degrade.
- **Per-class auto-degrade.** Touching a writing-only line invalidates only `writing@<sha>`; others carry forward. Mappings: prompt block → `behavior@` (+ usually `technical@`); `## Phase` / `## Plug Points` / `## Bridge` → `pedagogy@`; `## Big Idea` / `## Key Concepts` / `## What You'll Learn` → `strategy@`. `eval-class-router.sh` PostToolUse hook classifies each edit, writes to `/tmp/claude-eval-queue-<sid>` for next `/wind-down`.
- **Grandfather rule** for files audited pre-2026-05-14: existing `compendium-audited @ <sha>` satisfies the four old classes (writing / story / technical / behavior) IF mtime unchanged. The two new classes (`pedagogy@`, `strategy@`) = `grandfathered` until next touch.
- **SHA pin on `mechanical-tested`** mandatory — instance reports overwrite on rerun; SHA is the only drift detector. Evidence source: the **tmux-runner** battery (`bin/judge.sh` decommissioned 2026-05-31).
- **Reference files** (`curriculum/trainings/<training>/reference/`) **exempt** — flat lookup, no mood / sim surface.

Full rationale → `memory/compounded/2026-04-25-content_creation-quality-state-tagging.md` + `2026-04-28-content_creation-maintainer-reviewed-orthogonal-dimension.md`.
