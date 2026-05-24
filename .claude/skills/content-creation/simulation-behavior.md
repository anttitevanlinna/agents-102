# Simulation — Class B (prompt-behavior / risk)

Loaded by `curriculum/evals/judges/prompt-behavior.md`. Agent's lens. Class A (`simulation.md`) = reader's lens. Parallel, no overlap.

**Scope:** per `**Prompt**` fenced block, predict Claude's response *as distribution* + flag risks the prompt's shape invites. Per-prompt, not per-phase. Pattern catalog below = primary input.

**Why alongside mechanical:** mechanical runs one path through one Actor (Haiku, sandboxed scratch, substitution). Can't see failure distribution, doesn't probe long tail, doesn't run on most files. Class B: if 100 students paste this, how often does niceness tax fire? overwrite anxiety? question dump?

**Auto-fire:** prompt-behavior judge invokes when cached trace missing or per-prompt SHA stale. Per-prompt cache → single-prompt edit re-walks one prompt; rest carries forward.

## Cache

`curriculum/evals/sim-cache/<file-slug>.behavior.json` — array indexed by prompt position (1..N) with per-prompt SHA.

```json
{
  "content_sha": "<sha of full file at last full regen>",
  "generated_at": "<ISO>",
  "prompts": [
    {
      "prompt_index": 1,
      "prompt_sha": "<sha of this prompt's fenced content>",
      "prompt_lead": "<first 80 chars>",
      "expected_response_shape": "<one-line: what Claude is most likely to do>",
      "risks_fired": [
        {"pattern_id": "niceness-tax", "confidence": "high|med|low", "evidence": "<which line in the prompt invites it>"}
      ],
      "failure_modes": ["<one-line each — what goes wrong when a risk fires>"],
      "recovery_paths": ["<one-line each — what the prompt would need to add to neutralise the risk>"],
      "load_bearing": true
    }
  ]
}
```

`load_bearing: true` = teaching-moment trigger or hand-off. Judge weighs severity by load-bearing × confidence.

## Pattern catalog

Each pattern has compounded entry firing at generation via `check_prompts.md` / `check_pedagogy.md`. Catalog here = eval-time consumer: Class B grades whether prompt's *shape* still invites the failure despite the rules.

| `pattern_id` | What fires | Compounded source |
|---|---|---|
| `file-preservation-gap` | Prompt asks Claude to "update" a file without naming preserve-vs-replace boundaries | `compounded/2026-04-27-student_facing-file-preservation-gap.md` |
| `reading-burden` | Prompt makes the student manually proofread Claude's output | `compounded/2026-04-27-pedagogy-reading-burden-manual-error-catching.md` |
| `niceness-tax` | RLHF softening masks a problem the student should see | `compounded/2026-04-27-prompts-niceness-tax.md` |
| `question-dump` | Prompt says "ask these questions" — Claude dumps all at once | `compounded/2026-04-27-prompts-question-dump.md` |
| `overwrite-anxiety` | Prompt asks to add to a file; Claude hesitates / asks before writing | `compounded/2026-04-27-prompts-overwrite-anxiety.md` |
| `preamble-before-action` | Prompt asks for action; Claude opens with a plan/explanation | `compounded/2026-04-27-prompts-preamble-before-action.md` |
| `append-vs-integrate` | Prompt asks to add a section; Claude appends rather than weaving in | `compounded/2026-04-27-prompts-append-vs-integrate-default.md` |
| `plan-mode-preamble-bloat` | Prompt invites plan mode; plan inflates beyond the actual work | `compounded/2026-04-27-prompts-plan-mode-preamble-bloat.md` |
| `citation-gap-asymmetry` | Prompt accepts unsourced claims when other claims need sources | `compounded/2026-04-27-prompts-citation-gap-asymmetry.md` |
| `self-report-inflation` | Prompt asks Claude to grade its own work; Claude inflates | `compounded/2026-04-27-pedagogy-self-report-inflation.md` |
| `default-acceptance` | Prompt offers defaults; Claude doesn't push back on weak ones | `compounded/2026-04-27-pedagogy-default-acceptance-on-offered-defaults.md` |
| `plan-mode-approval-inflation` | Plan-mode plan reads more polished than the work merits | `compounded/2026-04-27-pedagogy-plan-mode-approval-inflation.md` |
| `source-type-blindness` | Prompt asks to ingest sources; Claude doesn't classify L0/L1/L2/L3 | `compounded/2026-04-27-pedagogy-source-type-blindness-on-ingestion.md` |
| `citation-cargo-cult` | Prompt asks for citations; Claude adds plausible-looking but unverified | `compounded/2026-04-27-prompts-citation-cargo-cult.md` |
| `self-audit-charity` | Prompt asks Claude to self-critique; Claude is charitable to itself | `compounded/2026-04-27-pedagogy-self-audit-charity.md` |

## Confidence

- **`high`** — prompt's shape *forces* risk; >70% runs. ("Ask the student these five questions" without "one at a time" → near-certain question dump.)
- **`med`** — invites without forcing; 30–70%. ("Update with X" without preserve language → file-preservation-gap sometimes.)
- **`low`** — allows but scaffold mitigates; <30%.

## Scope

- Per prompt, not per phase. Phase mood / confusion / arc = Class A.
- No execution. Mechanical samples one path; Class B reasons over distribution.
- No static-rule grading (action lead-in, placeholders, multi-sample). Those = technical judge via `check_prompts.md`.
- Owns the probabilistic gap between static-rule (well-formed) and mechanical (succeeded once on Haiku).

## Manual

```
/eval-fire behavior <file-path>
```

Force single-prompt regen without editing file (e.g., catalog updated):

```
rm curriculum/evals/sim-cache/<file-slug>.behavior.json
/eval-fire behavior <file-path>
```
