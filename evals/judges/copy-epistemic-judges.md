# Copy Eval — Detect Ungrounded Claims in User-Facing Text

Detects **epistemic overreach** — statements that claim more certainty, more predictive power, or more authority than the evidence supports. Run against quiz files, article templates, and any user-facing copy.

**How to use:** Read target file(s). Extract user-facing strings (profile descriptions, body text, bet/risk statements, insight text — anything the reader sees). Apply each of the 6 tests below. Report every finding.

**What counts as user-facing:** Profile descriptions, question text, answer labels, body copy, insight text, headlines, subtitles, bet/risk statements, section headings. NOT: CSS class names, DOM IDs, event names, variable names, code comments.

**Context-aware exclusions:**
- **Questions** (sentences ending with `?`) are excluded from tests 1, 2, 4 — questions are allowed to be provocative
- **Answer option labels** (text the reader selects as their choice) are excluded from test 4 (dismissive framing) — the reader is choosing these, not being told
- **Conditional framing** ("if X, then Y will...") is excluded from test 1 — conditionals acknowledge uncertainty

---

## Test 1: Temporal Prediction (severity: ERROR)

Claims about the future stated as fact. The future is uncertain — state observations about structure, not predictions about timelines.

**Catch these patterns:**
- "won't" / "will not" / "aren't coming" / "isn't coming" / "not coming" as predictions
- "will [work/happen/fail/succeed/arrive/transform/replace/disrupt]" as assertion
- "going to become" / "is about to change" / "is set to transform"
- "the future is/of/belongs"
- "[timeframe] away" (years away, months away)

**Exclude:** Question sentences. Conditional framing ("if...will"). Quotes attributed to named people.

**Guidance when flagged:** Reframe as a structural observation, not a timeline prediction. Instead of "Agents aren't coming to your domain soon" → "Your domain's verification infrastructure isn't in place yet."

---

## Test 2: False Certainty (severity: ERROR)

Absolute claims about uncertain outcomes. Removes the reader's agency to evaluate.

**Catch these patterns:**
- "the question isn't whether" / "the question is not whether"
- "there's no doubt" / "without question" / "beyond doubt" / "no question that"
- "obviously" / "undeniably" / "undoubtedly" / "unquestionably" / "clearly" (as certainty marker, not as clarity marker)
- "the only way/path/option/answer"
- "always" / "never" (as absolute claims about outcomes, not as description of mechanisms)

**Exclude:** Question sentences.

**Guidance when flagged:** Remove certainty. The reader's domain may differ. Instead of "the question isn't whether agents will work" → "If the structural ingredients hold, the pace may surprise you."

---

## Test 3: Stale Time Anchor (severity: WARNING)

References to specific dates that will expire within months. AI moves fast — anything anchored to a specific time becomes stale.

**Catch these patterns:**
- "early/mid/late 20XX" (specific year references in claims)
- "last year" / "this year" / "next year"
- "right now" / "currently" (when used to anchor a claim that will date)
- "in the last/past/next N months/years/weeks"
- Specific year numbers in claims (not in metadata, code comments, or attribution dates)

**Guidance when flagged:** Use relative framing or structural language. Instead of "in the same position coding was in early 2025" → "at the same structural stage coding was when automated testing became standard."

---

## Test 4: Dismissive Framing (severity: WARNING)

Language that talks down to the reader or their domain. Erodes trust — the reader knows their domain better than we do.

**Catch these patterns:**
- "your domain/organization/team/company hasn't/haven't/lacks/doesn't/isn't"
- "not ready" / "still using" / "still running" / "falling behind" / "left behind" (as statements, not as option labels the reader selects)
- "pre-agent" / "pre-AI" used as judgment (not as technical classification)

**Exclude:** Answer option labels (reader is choosing these). Profile names used as classification labels.

**Guidance when flagged:** Reframe as what the reader CAN do, not what they lack. Instead of "your domain hasn't built its test suite yet" → "defining what 'correct' means is the foundational step."

---

## Test 5: Unfalsifiable Claim (severity: ERROR)

Claims that can't be verified or disproven. These sound authoritative but have no evidence behind them.

**Catch these patterns:**
- "most of" / "most people" / "most organizations" / "most companies" (without a source)
- "everyone knows" / "it's well known" / "widely recognized"
- Ungrounded multipliers: "Nx the impact/faster/better/more" without a source
- Unsourced financial claims: "saved millions" / "saved billions" / "costs $XM"
- Claims about what "would have happened" in counterfactuals

**Guidance when flagged:** Either source it or reframe. Instead of "10x the impact" → "significantly more impact" or cite a specific study. Instead of "saved millions" → name the company and amount with a source.

---

## Test 6: Ungrounded Analogy (severity: WARNING)

Comparisons presented as equivalences without evidence. Analogies are powerful but treacherous — the reader's domain may differ from the analogy in ways that matter.

**Catch these patterns:**
- "in the same position [X] was" — equates two situations without showing equivalence
- "just like [X] did in [year]" — historical analogy as prediction
- "this is what happened with/when [technology]" — past as proof of future
- "the [X] of [Y]" patterns ("the blockchain of healthcare") — lazy equivalence

**Guidance when flagged:** State what's similar and what's different. Instead of "in the same position coding was in early 2025" → "coding had similar structural ingredients — fast verification, accessible tools — which is why agents arrived there first."

---

## Output Format

For each file, report every finding in this structure:

```
## [filename]

### ERROR: [test-name] — line [N]
**Text:** "[matched text]"
**Why:** [1-sentence explanation of why this is a problem]
**Fix:** [specific rewrite suggestion]

### WARNING: [test-name] — line [N]
**Text:** "[matched text]"
**Why:** [1-sentence explanation]
**Fix:** [specific rewrite suggestion]
```

End with a summary:

```
## Summary
- [N] errors, [M] warnings across [K] files
- Files clean: [list any files with no findings]
```

Write all findings to `evals/results/copy-eval.md`.

---

## Calibration — Known Violations

These strings exist in the codebase and MUST be flagged. If your eval misses any of these, it is miscalibrated.

**site/readiness/quiz.js:**
1. "in the same position coding was in early 2025" → stale-time-anchor + ungrounded-analogy
2. "the question isn't whether agents will work" → false-certainty
3. "Most of what's called 'agentic' in your space is vendor announcements" → unfalsifiable-claim
4. "Agents aren't coming to your domain soon" → temporal-prediction
5. "your domain hasn't built its test suite yet" → dismissive-framing

**site/check/quiz.js:**
6. "10x the impact" → unfalsifiable-claim
7. "The companies that waited on blockchain saved millions" → unfalsifiable-claim
