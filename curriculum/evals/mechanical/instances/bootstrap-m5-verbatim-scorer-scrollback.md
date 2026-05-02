# Actor — Bootstrap M5 scorer (Scrollback)

## Phase 2 — Scorer Execution

Read prompt-004.txt. Ran scoring protocol:
- Adjudicated 9 claims from briefing against evidence roster.
- Scored source-triangulation, entailment, citation-integrity, counter-evidence detectors.
- Computed precision, recall, coverage, hits, false positives, misses for each.
- Named winner: Entailment (100% precision, 100% recall) with Counter-Evidence as ensemble partner.

Output: module-5/adjudicated-claims.md, module-5/scoreboard.md

---

## Phase 2b — Classic-Way Contrast

1. **Classic way to quality-check this briefing:** Have a policy researcher read the briefing alongside the evidence roster, manually flagging any claim that cites an external authority (e.g., "DevEx teams see 3-5x") or asserts a specific metric (e.g., "18% reduction") without sourcing it in the roster. This is human line-by-line vetting.

2. **Faster or slower than benchmark:** Slower. A human read takes 30–45 minutes for a detailed briefing; the detector ensemble finishes in <5 minutes. The benchmark trades speed for precision—it runs four independent methods in parallel and forces a structured scoring comparison.

3. **Why:** The benchmark's value is in the comparative friction. Entailment catches overreach by asking "does the source actually say this?" at the statement level. Counter-Evidence asks "is this contradicted elsewhere?" Both are faster than human re-reading because they're algorithmic pattern matchers, not judgment calls. A human policy researcher is slower but catches nuance (e.g., "Sari's trending stats" as partly-grounded without explicit numbers).

---

## Phase 3 — Judge Save

Read prompt-006.txt. Wrote judges/groundedness-judge.md (14 lines).
Judge: evaluates whether claims are grounded in the evidence roster. Instruction: for each claim, search sources for direct quotes or metrics. If external authorities (Stripe, Figma) or specific statistics (18%, 3-5x) are asserted, verify they appear in sources or flag UNGROUNDED.

---

## Phase 4 — Still-Uncertain

Wrote module-5/still-uncertain.md:
"Whether entailment-driven quality gates should be applied pre-publication or post-discovery (as a red-team tool versus a gating function)."

---

## Phase 5 — Truncation Notice

Skipped prompt-007 per runner spec: "[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]"

---

## Close

All outputs written to scratch/bootstrap-m5/:
- module-5/adjudicated-claims.md
- module-5/scoreboard.md
- module-5/still-uncertain.md
- judges/groundedness-judge.md

Report and scrollback ready.
