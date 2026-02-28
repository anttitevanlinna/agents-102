# Evals Framework

Two execution modes: **Scorable API** (automated, repeatable, CI-friendly) and **subagent** (deep analysis, flexible). Four themes covering CTO prompting, editorial quality, epistemic integrity, and curriculum quality.

## Scorable Judges

Automated scoring via [Scorable](https://scorable.ai) LLM-as-a-Judge API. Each judge returns 0-1 scores with justifications per evaluator.

| Theme | Judge ID | Evaluators |
|-------|----------|------------|
| A: CTO Prompt Quality | `6d829329-df54-4bf4-b2d7-6b16eec9753e` | Relevance, Specificity, Actionability, Evidence Grounding + auto |
| B: Editorial Quality | `b1d1b71a-97ae-49c9-aa8f-8ab410085934` | Source Verifiability, Agentic Gate, Vendor Bias, Specificity, Nordic Label + auto |
| C: Epistemic Integrity | `087dc020-fb3e-478f-9bac-f7d250fed506` | Predictive Integrity, Framing/Anchoring, Substantive Grounding + auto |
| D: Curriculum Quality | `1481fb79-6d72-4a71-8f51-1903ad0c6cd4` | Pedagogical Alignment, Exercise-Led Design, Builder Voice, Plug Points + auto |

### Run via script

```bash
# Score a single response
./scripts/eval.sh <theme> "<response_text>" ["<request_text>"]

# Examples:
./scripts/eval.sh a "Klarna deployed agents handling 2.3M conversations..."
./scripts/eval.sh b "$(cat continuous-research/findings/finance.md)"
./scripts/eval.sh c "Agents will transform every business by 2027"
./scripts/eval.sh d "$(cat curriculum/module-01-getting-going.md)"
```

### Run via curl

```bash
curl -s -X POST "https://api.scorable.ai/v1/judges/JUDGE_ID/execute/" \
  -H "Authorization: Api-Key $SCORABLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"response": "text to evaluate", "request": "optional context"}'
```

### Scorable response format

```json
{
  "evaluator_results": [
    {
      "evaluator_name": "Source Verifiability Auditor",
      "score": 0.85,
      "justification": "4 of 5 claims have specific URLs..."
    }
  ]
}
```

## Four Themes

### Theme A: "CTOs can find what they need by prompting"

Tests whether the research content produces useful answers to realistic CTO questions.

**Scorable judge:** `6d829329-df54-4bf4-b2d7-6b16eec9753e`
**Evaluators:** Relevance, Specificity, Actionability, Evidence Grounding

**Subagent flow:**
1. Launch **responder agent** — reads all research files, answers 10 CTO questions, writes `results/responses.json`
2. Launch **judge agent** — reads responses + judge prompts, scores each answer on 4 dimensions, writes `results/theme-a-scores.json`

### Theme B: "Articles are editorially sound"

Tests whether individual findings meet editorial standards.

**Scorable judge:** `b1d1b71a-97ae-49c9-aa8f-8ab410085934`
**Evaluators:** Source Verifiability, Agentic Gate, Vendor Bias, Specificity, Nordic Label

**Subagent flow:** Launch 3-4 **judge agents** in parallel (split by file group). Each reads findings files + judge prompts, scores each finding on 5 dimensions, writes `results/theme-b-batch-{N}.json`

### Theme C: "Copy doesn't overreach"

Tests whether user-facing text makes claims it can't support. Catches epistemic overreach: temporal predictions, false certainty, stale time anchors, dismissive framing, unfalsifiable claims, ungrounded analogies.

**Scorable judge:** `087dc020-fb3e-478f-9bac-f7d250fed506`
**Evaluators:** Predictive Integrity, Framing/Anchoring, Substantive Grounding

**Subagent flow:** Launch **1 agent** per file group. Agent reads target files + judge prompt, extracts user-facing strings, applies 6 tests, writes `results/copy-eval.md`.

### Theme D: "Curriculum modules are well designed"

Tests whether training modules follow the pedagogical guardrails: Bloom's taxonomy, TBR 4Cs, builder voice, audience calibration, plug points, strategic throughline.

**Scorable judge:** `1481fb79-6d72-4a71-8f51-1903ad0c6cd4`
**Evaluators:** Pedagogical Alignment, Exercise-Led Design, Builder Voice, Plug Points

**Subagent flow:** Launch **1 agent** per module. Agent reads module + `curriculum/lecture-guardrails.md`, scores against all guardrails, writes `results/theme-d-module-{N}.json`.

## Scoring

### Scorable (automated)
- Each evaluator scores **0-1** with justification
- **Pass threshold:** Average >= 0.7 across all evaluators
- **Auto-flag:** Any evaluator score below 0.3 triggers review

### Subagent (manual)
- Each judge scores **1-5** with reasoning
- **Pass threshold:** Average >= 3.5 across all judges
- **Auto-flag:** Any individual score of 1 triggers review
- Known weak points listed in `test-cases/editorial-samples.md` — these SHOULD score low (calibration check)

## Files

```
evals/
├── judges/
│   ├── cto-prompt-judges.md      # 4 judge prompts (Theme A)
│   ├── editorial-judges.md       # 5 judge prompts (Theme B)
│   └── copy-epistemic-judges.md  # 6 tests (Theme C)
├── test-cases/
│   ├── cto-questions.md          # 10 CTO questions + expected traits
│   └── editorial-samples.md     # File list + known weak points
├── results/                      # JSON output (gitignored except .gitkeep)
└── README.md
scripts/
└── eval.sh                       # Scorable API runner
```
