# Simulation protocol — Class B (prompt-behavior / risk)

Loaded by the prompt-behavior judge (`curriculum/evals/judges/prompt-behavior.md`). The agent's lens. Class A (`simulation.md`) is the reader's lens — persona walk-through for mood + confusion. The two run in parallel and don't overlap.

**Scope:** for each `**Prompt**` fenced code block in a curriculum file, predict how Claude would respond *as a distribution* and flag which behavioral risks the prompt's shape invites. Per-prompt, not per-phase. The pattern catalog below is the primary input.

**Why this exists alongside mechanical:** mechanical runs one path through one Actor (Haiku, sandboxed scratch repo, substitution table). It can't see the failure distribution, doesn't probe the long tail, doesn't run on most files (no runner). Class B reasons over the distribution: *if a hundred students pasted this prompt, how often does niceness tax fire? overwrite anxiety? question dump?*

**When it runs:** the prompt-behavior judge invokes Class B automatically when its cached trace is missing or per-prompt SHA stale. Per-prompt cache means a single-prompt edit re-walks one prompt; the rest of the trace carries forward.

## Cache layout

`curriculum/evals/sim-cache/<file-slug>.behavior.json` — one file per slug. Inside, an array indexed by prompt position (1..N) with per-prompt content SHA. The judge re-generates only the entries whose SHA mismatches the file's current prompt blocks.

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

`load_bearing: true` when the prompt is a teaching-moment trigger or a hand-off; `false` when it's a setup or housekeeping prompt. The judge weighs blocking severity by load-bearing-ness × confidence.

## The pattern catalog

Each pattern has a compounded entry that fires at generation time via `check_prompts.md` or `check_pedagogy.md`. The catalog here is the **evaluation-time** consumer — Class B grades whether the prompt's *shape* still invites the failure mode despite the rules.

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

## How to score confidence

- **`high`** — the prompt's shape *forces* the risk; >70% of runs would exhibit it. (E.g., "Ask the student these five questions" with no "one at a time" → near-certain question dump.)
- **`med`** — the prompt invites the risk but doesn't force it; 30–70%. (E.g., "Update the file with X" without preserve language → file-preservation-gap fires sometimes.)
- **`low`** — the prompt allows the risk but the surrounding scaffold mitigates; <30%.

## Scope discipline

- Class B reasons **per prompt**, not per phase. A phase's mood / confusion / arc are Class A's job.
- Class B does NOT execute the prompt. Mechanical (`curriculum/evals/mechanical/`) does that. Class B reasons about distributions; mechanical samples one path.
- Class B does NOT grade prompt-design mechanics that a static rule catches (action lead-in, no placeholders in fenced blocks, multi-sample structural enforcement). Those belong to the `technical` judge via `check_prompts.md`.
- Class B owns the **probabilistic gap** between the static rule (the prompt is well-formed) and the deterministic execution (the prompt succeeded once on Haiku).

## Manual invocation

The prompt-behavior judge handles cache + regen autonomously. To run Class B alone on a single file:

```
/eval-fire behavior <file-path>
```

To force regen of a single prompt without editing the file (e.g., catalog updated):

```
rm curriculum/evals/sim-cache/<file-slug>.behavior.json
/eval-fire behavior <file-path>
```
