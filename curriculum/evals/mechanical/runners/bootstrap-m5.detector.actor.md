# Actor — Bootstrap M5 detector (generic; parameterized per dispatch)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to apply ONE assigned detection method to the briefing and write findings to `module-5/detectors/<name>.md` for the Judge's scripts to inspect. You are NOT trying to produce a great detector. Stub findings; quote claims verbatim from the briefing so the scorer's substring match works.

Fresh context. You do not see the other detectors, the setup actor, or the scorer.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`.

## Protocol

The orchestrator tells you at dispatch time:

- Your detector name (e.g., "Detector 1 — Source triangulation")
- Method description (verbatim from prompt-003)
- Output path (`module-5/detectors/<name>.md`)

Read:
- `module-5/briefing.md` (target)
- Source material: `sources/*.md`, `module-3/retrievals/*.md`, `module-3/stances/*.md`

Apply YOUR method only.

## Method reference (use only your assigned one)

From prompt-003:

- **Source triangulation.** For every specific claim, check whether it appears in at least one file. If not, flag UNGROUNDED.
- **Entailment.** For every claim, ask whether briefing says more than sources support. Flag OVERREACH.
- **Citation integrity.** For each citation, open the cited file and check if it contains the attributed claim. Flag CITATION-BROKEN.
- **Self-consistency.** Re-derive briefing's key claims from sources; compare. Flag UNSTABLE where re-derivation differs.
- **Counter-evidence search.** Look for sources that contradict each claim. Flag CRUMBLES.

## Output

Write to `module-5/detectors/<your-name>.md`:

```markdown
# Detector — <name>

Method: <one sentence>

## Findings
- CLAIM: "<verbatim from briefing>" — FLAG: <UNGROUNDED / OVERREACH / CITATION-BROKEN / UNSTABLE / CRUMBLES>. Reasoning: <one line>.
- CLAIM: "<verbatim>" — FLAG: <...>. Reasoning: <one line>.
- ...

## Claims NOT flagged
- "<verbatim>" — looks grounded because <one line>.
```

Aim for 3-6 findings. Quote claims verbatim from briefing.

## Report

No separate report file. The detector file IS the output.

## What you must NOT do

- Read sibling detector output files.
- Read `module-5/benchmark.md` (scorer's input, not yours).
- Read `curriculum/exercises/*`, sibling/judge runners, maintainer docs.
- Apply methods other than your assigned one.
- Paraphrase claims. Quote verbatim from the briefing.
