# Evals Framework

Lightweight evaluation for research and copy quality. Three themes, fifteen judges, no Python — subagents ARE the judges.

## Three Themes

### Theme A: "CTOs can find what they need by prompting"

Tests whether the research content produces useful answers to realistic CTO questions.

**Flow:**
1. Launch **responder agent** — reads all research files, answers 10 CTO questions, writes `results/responses.json`
2. Launch **judge agent** — reads responses + judge prompts, scores each answer on 4 dimensions, writes `results/theme-a-scores.json`

**4 judges:** Relevance, Specificity, Actionability, Evidence Grounding

### Theme B: "Articles are editorially sound"

Tests whether individual findings meet editorial standards.

**Flow:** Launch 3-4 **judge agents** in parallel (split by file group). Each reads findings files + judge prompts, scores each finding on 5 dimensions, writes `results/theme-b-batch-{N}.json`

**5 judges:** Source Verifiability, Agentic Gate, Vendor Bias, Specificity Gate, Nordic Label Accuracy

### Theme C: "Copy doesn't overreach"

Tests whether user-facing text (quiz profiles, article headlines, insight copy) makes claims it can't support. Catches epistemic overreach: temporal predictions, false certainty, stale time anchors, dismissive framing, unfalsifiable claims, ungrounded analogies.

**Flow:** Launch **1 agent** per file group. Agent reads target files + judge prompt, extracts user-facing strings, applies 6 tests, writes `results/copy-eval.md`.

**6 tests:** Temporal Prediction (error), False Certainty (error), Stale Time Anchor (warning), Dismissive Framing (warning), Unfalsifiable Claim (error), Ungrounded Analogy (warning)

## How to Run

In Claude Code, use Task tool to launch subagents. Example:

### Theme A
```
# Agent 1: Responder
Task(subagent_type="general-purpose", prompt="Read all files in continuous-research/findings/.
Then read evals/test-cases/cto-questions.md. Answer each CTO question using ONLY the research
as context. Write responses to evals/results/responses.json in format:
[{question, response}, ...]")

# Agent 2: Judge (after Agent 1 completes)
Task(subagent_type="general-purpose", prompt="Read evals/results/responses.json and
evals/judges/cto-prompt-judges.md. Score each response using all 4 judges.
Write to evals/results/theme-a-scores.json")
```

### Theme B
```
# Launch 3-4 agents in parallel, each covering 3-5 files
Task(subagent_type="general-purpose", prompt="Read evals/judges/editorial-judges.md and
evals/test-cases/editorial-samples.md. Then read [file list]. Score each finding using
all 5 judges. Write to evals/results/theme-b-batch-1.json")
```

### Theme C
```
Task(subagent_type="general-purpose", prompt="Read evals/judges/copy-epistemic-judges.md.
Then read site/readiness/quiz.js and site/check/quiz.js. Apply all 6 tests to every
user-facing string. Write findings to evals/results/copy-eval.md")
```

## Scoring

- Each judge scores **1-5** with reasoning
- **Pass threshold:** Average >= 3.5 across all judges
- **Auto-flag:** Any individual score of 1 triggers review
- Known weak points listed in `test-cases/editorial-samples.md` — these SHOULD score low (calibration check)

## Results Format

```json
{
  "theme": "a",
  "timestamp": "2026-02-21T...",
  "results": [{
    "question": "...",
    "scores": {
      "relevance": {"score": 4, "reasoning": "..."},
      "specificity": {"score": 5, "reasoning": "..."}
    },
    "pass": true
  }],
  "summary": {"avg_score": 4.0, "pass_rate": "9/10", "flags": []}
}
```

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
```
