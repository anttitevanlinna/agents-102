---
name: goalcheck
description: Iterate on content until it passes eval — driven by CTO conversion, not score-chasing
argument-hint: <file-path> <theme-letter>
---

# Goalcheck: CTO-Conversion-Driven Iteration Loop

**Target file:** `$ARGUMENTS[0]`
**Theme:** `$ARGUMENTS[1]` (a=CTO, b=Editorial, c=Epistemic, d=Curriculum, e=Retrieval)
**Threshold:** 3.5 average across all evaluators (judges score 1-5)
**Max iterations:** 4

## Strategic Frame

The goal is NOT "pass the eval." The goal is: **minimum content that makes a CTO contact Antti and share the site internally.**

The eval is a quality gate — it catches epistemic problems that would make a CTO dismiss the content. But the DIRECTION of improvements is conversion-driven:

1. **30 seconds:** Does the CTO understand what this is and who it's for?
2. **2 minutes:** Do they believe this person is credible (practitioner, not consultant)?
3. **Share trigger:** Is there something worth sending to their team?
4. **Contact trigger:** Do they see thinking they want access to?
5. **Next step:** Is the CTA obvious?

Every improvement must serve one of these five questions. If it only serves the eval score, it's wrong.

## Protocol

You are the orchestrator. **Preserve your context window.** Delegate file reading, editing, and eval running to subagents. You read only the iteration log and short summaries.

### Judge files

| Theme | Judge file | Evaluators | Score |
|-------|-----------|------------|-------|
| A: CTO Prompt | `evals/judges/cto-prompt-judges.md` | Relevance, Specificity, Actionability, Evidence Grounding | 1-5 each |
| B: Editorial | `evals/judges/editorial-judges.md` | Source Verifiability, Agentic Gate, Vendor Bias, Specificity, Nordic Label | 1-5 each |
| C: Epistemic | `evals/judges/copy-epistemic-judges.md` | 6 tests (Temporal Prediction, Framing/Anchoring, etc.) | ERROR/WARNING/PASS per test |
| D: Curriculum | (use editorial judges + `curriculum/lecture-guardrails.md`) | Pedagogical Alignment, Exercise-Led Design, Builder Voice, Plug Points | 1-5 each |
| E: Retrieval | `evals/judges/retrieval-quality-judges.md` | Retrieval Efficiency, Evidence Grounding, Counter-Evidence, Nordic Signal, Frontmatter Nav | Pass/Acceptable/Fail |

### File → context map

| File pattern | Context for judges |
|-------------|-------------------|
| `site/index.html` | Landing page for Agents 102. Target: CTOs and digital leaders at large Nordic companies. |
| `content/*.md` | Research article for Deploying Agents newsletter. Practitioner-grounded, named companies, verifiable sources. |
| `content/year-one.md` | 27-essay whitepaper: one year inside an enterprise agentic transformation. Target: CTO peer sharing. |
| `curriculum/*.md` | Training module for 2-day AI agent building workshop. Exercise-led, Bloom's taxonomy progression. |
| `continuous-research/**/*.md` | Research finding or synthesis. Evidence-leveled, counter-evidenced, Nordic-aware. |

### Step 1: Baseline Eval

Launch a **judge subagent** with this prompt:

```
You are an LLM judge evaluating content quality.

READ the judge definitions at: evals/judges/{theme-judge-file}
READ the content to evaluate at: {target-file}

CONTEXT: {context from file map above}

For EACH evaluator defined in the judge file:
1. Read the evaluator's criteria carefully
2. Score the content 1-5 (or Pass/Fail for Theme C/E) using the exact rubric
3. Provide 2-3 lines of reasoning
4. Note the top issue that would make a CTO dismiss this content

OUTPUT FORMAT:
```
Evaluator: [name]
Score: [1-5]
Reasoning: [2-3 lines]
Top issue: [one line]
```

Then compute:
AVERAGE SCORE: [mean of all evaluator scores]
PASS/FAIL: [>= 3.5 = PASS, < 3.5 = FAIL]
TOP 3 ISSUES (ranked by CTO impact, not score):
1. ...
2. ...
3. ...
```

### Step 2: Orient — BEFORE any editing

**This is the critical step. Do NOT skip it.**

Read the eval results and ask:

**2a. CTO journey check:**
Walk through the five questions against this file:
1. 30 seconds — does the CTO understand what this is?
2. 2 minutes — do they believe the author is credible?
3. Share trigger — is there something worth forwarding?
4. Contact trigger — do they see thinking they want access to?
5. Next step — is the CTA obvious?

**Which of these five is the file failing at?** The eval findings are symptoms. The CTO journey question is the diagnosis.

**2b. Structure check:**
Does the file's structure serve the CTO journey? Or does it need structural change?

**2c. Strategic intervention:**
- **Structure:** sections in wrong order, something critical missing
- **Content:** right sections exist but lack substance
- **Wording:** content is right but epistemically sloppy

Priority: structure > content > wording. Always.

**Write a 3-5 line Orient summary** before launching the improvement agent.

### Step 3: Improve (general-purpose subagent)

Launch a general-purpose subagent with:

```
You are a content editor. Goal: make this content good enough that a CTO at a large Nordic company would contact the author and share it with their team.

FILE: {file_path}
PURPOSE: {context}
CURRENT EVAL SCORE: {average} (threshold: >= 3.5)

## Strategic diagnosis (from orchestrator)
{your Orient summary}

## Eval findings (secondary input)
{per-evaluator scores and top 3 issues}

## Edit priority
1. STRUCTURAL changes first
2. CONTENT additions second
3. WORDING fixes last

If you only do #3, you've failed.

=== EDITORIAL VOICE (Antti's style) ===
- Simple > elaborate. Don't replace a claim with a different claim — remove false precision.
- Name the underlying dynamic. Don't hedge with "may/might" — explain WHY structurally.
- Keep texture. Don't strip provocative lines — make them honest.
- Reader as protagonist. "Yours to build" > "you lack."
- Scope to experience: "In my experience" > "most companies."
- CTOs and software leaders. Peer-to-peer.

=== CONSTRAINTS ===
- Don't add generic hedging. Name the actual reason.
- Don't remove specific data — improve attribution or scope it.
- Don't weaken the editorial voice.
- Don't change HTML/CSS/JS unless orchestrator explicitly requested structural changes.

After editing, append to evals/iteration-log.md:
## {file} — Iteration {N} ({date})
Score: {before} → {after}
CTO journey: {which question was failing, what you did}
Changes: Structure: {what} / Content: {what} / Wording: {what}
```

### Step 4: Re-Eval

Same as Step 1. Launch judge subagent on the updated file.

### Step 5: Reflect (MANDATORY)

After each iteration, write 5 lines to the iteration log:

```
### Meta-reflection — {file} iteration {N}
1. **Leverage:** What type of change had the most leverage? (structure/content/wording)
2. **Proxy check:** Did the changes serve the CTO or the eval?
3. **Surprise:** What was unexpected in the score movement?
4. **Cross-file learning:** What does this tell us about other files?
5. **Loop adjustment:** What should change next iteration?
```

### Step 6: Decide

- **>= 3.5 average** → PASS. Report to user with meta-reflection.
- **Improved but < 3.5** → Apply learnings, go to Step 2 (re-orient).
- **Stalled or dropped** → Stop. Report why. Was it a structure problem the eval can't see?
- **4 iterations** → Stop. Report best score + accumulated learnings.

Report format:
```
Checkpoint: {file} Theme {theme}
Iterations: {N}
Score: {start} → {end}
Status: PASS / STALLED / MAX_ITERATIONS
Key changes: {what improved for the CTO reader}
What the loop learned: {1-2 lines}
```

### For multiple files

When given a roadmap milestone:
1. Run baseline evals on all files in parallel
2. Files that PASS → done
3. Files that FAIL → Orient on each, then improve
4. Apply cross-file learnings (what worked on file A informs file B)
5. Report milestone status against CTO journey, not just scores
