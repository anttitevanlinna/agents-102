# AE101 Theory Canon Rewrite Design

**Status:** Approved in conversation, 2026-08-05

## Goal

Turn `theory-plan.md` from a mixed canon, changelog, audit trail and implementation queue into the maintainer-facing canonical account of AE101 theory: what the course teaches, why the mechanisms are believed, where each idea enters the M1–M6 arc, what remains contested, and which evidence supports each claim.

The rewrite changes documentation ownership. It does not change student-facing curriculum in this sweep.

## Canonical ownership

Theory stays separate from training strategy.

| Surface | Owns | Does not own |
|---|---|---|
| `bosser-strategy:content-strategy-agentic-engineering-101.md` | Buyer, positioning, audience, mood, strategic bets, pedagogical and delivery design | Complete theory inventory, claim-level evidence, module placement ledger |
| `theory-plan.md` | Whole current theory canon, mechanisms, boundaries, tensions, evidence status, M1–M6 progression | Project history, completed implementation campaigns, prompt/demo inventories |
| `theory-evals.md` | Reusable soundness and teaching-landing evaluation method | The theory content being evaluated |
| Theory handbook and curriculum files | Student/trainer delivery surfaces | Maintainer-only evidence ledger and unresolved design questions |
| `pre-cohort-todos.md` | Open curriculum decisions discovered by the canon | Closed decisions or historical rationale |
| Git history | Superseded plans, completed fixes and deleted snapshot reviews | Current state |

The strategy may keep a compact theory contract and strategic bets, then point maintainers to `theory-plan.md`. It must not duplicate the full canon. Public-repo files continue to use the `bosser-strategy:` reference rather than a private filesystem path.

## Target document contract

`theory-plan.md` remains at its current path so existing references do not break. Its title changes from a plan to a canon. A maintainer or agent should be able to answer the following from that file alone:

1. What is the Field Map and what does each part mean?
2. What priors, mechanisms and laws does AE101 rely on?
3. Which claims are borrowed theory, research findings, practitioner methods or curriculum synthesis?
4. What evidence level and freshness limits apply?
5. What does each theory item predict or cause someone to do?
6. Where is it lived, named, generalised and recalled across M1–M6?
7. Which apparent contradictions are intentional boundary conditions?
8. Which theory questions remain open?

The document is a current-state reference, not a status report. Dates appear only where evidence freshness or a time-indexed claim requires them.

## Target outline

### 1. Purpose and relationship to strategy

- Define theory as the generating mechanism behind a move: it predicts, generates action and remains grounded.
- State the public-canon/private-strategy boundary.
- Name the theory handbook as the delivery view, not another source of truth.

### 2. The Field Map

- Present the canonical cycle and the personal → team → company climb.
- Explain the near half, far half and feedback-control grounding without making control-theory jargon student doctrine.
- Define the relationship among intent, context, work, verification, absorption and outcome.

### 3. Axioms and working priors

- Capability is a flow produced by action and learning.
- Competence is the gate; learning rate is the ceiling.
- Agenticness is accumulated, not enabled.
- The loosely held 10% prior travels across agent-produced artefacts as a search budget, not a measured error rate.
- Self-report is a hypothesis; artefacts and observed behaviour adjudicate it.

### 4. Theory canon

Organise the theory into four families, but connect every item back to a Field Map position:

1. **Loop behaviour:** feedback control, observability, context bandwidth and retrieval, failure modes, local success/global drift.
2. **Safe autonomy:** verification asymmetry, compound reliability, calibrated delegation, blast radius, critic independence and gate validity.
3. **Compounding:** double-loop learning, trace → taxonomy → recurrence → deterministic check, variation/selection/retention, retrieval/prevention and deletion.
4. **Crossing and throughput:** absorption/WIP, feedback latency, personal-to-team transfer and institutional limits.

Every canonical item uses one compact record:

- **Claim** — the generalisation.
- **Mechanism** — why it happens or what breaks.
- **Move/governor** — the decision it generates.
- **Boundary** — where it stops being true.
- **Evidence** — source type, level, currency and canonical research home.
- **Curriculum path** — lived, named, generalised and recalled.

### 5. Operating tensions

Preserve tensions instead of forcing a falsely tidy doctrine:

- Parallel generation versus accountable absorption.
- Encoded rules versus delegated reversible judgment.
- Human understanding versus durable transferable state.
- Fast deterministic checks versus slow qualitative judgment.
- More independent critics versus more correlated calls.
- Accumulation versus deletion in a compounding system.

Each tension ends with the boundary rule the course should teach.

### 6. M1–M6 theory progression

Use one table with a row per module and separate columns for:

- **Lived:** what the student experiences before it is named.
- **Named:** the theory term or claim that lands.
- **Generalised:** the move that travels beyond the exercise.
- **Recalled:** where a later module pays it off.
- **Durable surface:** the canonical lecture/exercise that carries it without trainer voice.

This replaces historical placement plans and snapshot coverage matrices.

### 7. Evidence and provenance ledger

- Record the evidence level per claim; never assign one level to a bundle.
- Separate borrowed mature theory, current research convergence, single-practitioner method and curriculum synthesis.
- Fence historical practitioner sources that fall outside the six-month currency window.
- Preserve counterevidence and attribution corrections beside the affected claim.
- Link to continuous-research canonical homes rather than copying full research trails.

### 8. Open questions and change protocol

- Hold only unresolved theory questions, not implementation tasks.
- Route curriculum fixes to `pre-cohort-todos.md`.
- Route research gaps to continuous research.
- Treat a new source as evidence to assess, not an automatic addition.
- Use Git history for closed decisions; delete resolved open questions.

## Snapshot-review migration

The dated review artifacts were valuable as instruments, but they are not permanent knowledge homes.

### Fold into the canon

- Confirmed strengths that still describe the current corpus.
- Corrections and boundary conditions that changed canonical claims.
- Durable counterevidence, attribution cautions and evidence-level downgrades.
- Current delivery coverage, expressed through the M1–M6 progression rather than the old snapshot matrix.
- Still-open minors only when they remain true after checking current curriculum files.

### Do not carry forward

- Workflow IDs, agent counts, run mechanics and point-in-time verdict totals.
- Items marked closed whose only purpose was proving the 2026-07-02 campaign completed.
- Raw candidate dumps that were never adopted.
- Historical implementation instructions, eyeball queues and superseded fix shapes.

### Delete after migration

- `theory-completeness-review-2026-07-02.md`
- `theory-completeness-review-2026-07-02.results.json`
- `theory-audit.md`

Before deletion, run a unique-content comparison against the rewritten canon. Git history remains the archive. Keep `theory-evals.md`: it is an operational rubric, not a snapshot of theory content.

## Rewrite boundaries

- Preserve the existing uncommitted double-loop-learning correction and all newer theory content that passes the current evidence check.
- Do not edit lectures, exercises, modules, prompts, manifests or renderer code during this sweep.
- When the canon exposes a student-facing gap, add or refine one punchlist decision; do not fix the delivery surface yet.
- Do not promote the ten practitioner additions as one convergent framework. Use their per-item evidence levels from continuous research.
- Do not copy private strategy prose into the public canon. Restate only theory already intended to be public curriculum knowledge.
- Do not preserve a claim merely because it appeared in the old plan. Current curriculum, research and source fidelity decide.

## Phase sequence

### Phase 1 — Scope and planning

- Record the two newly identified practitioner tensions in `pre-cohort-todos.md`.
- Approve this ownership model, target outline, migration policy and deletion set.
- Stop before rewriting the canon.

### Phase 2 — Context compaction

- Compact the working context around this design, the current research synthesis, curriculum rules and the files in the migration set.
- Carry forward the dirty-tree warning and the existing `theory-plan.md` double-loop edit explicitly.

### Phase 3 — Theory fix sweep

1. Inventory current theory claims and curriculum placements against the live files.
2. Draft the new canon section by section, preserving only current truth.
3. Fold surviving review and audit findings into the relevant claim, tension, module or evidence record.
4. Reconcile the private strategy to a compact theory contract without moving private strategy content into the repo.
5. Compare deleted snapshot files for unique surviving content, then remove them.
6. Run the verification suite below.
7. Report any newly exposed student-facing gaps through the punchlist, leaving curriculum implementation for a later decision.

## Verification

The sweep is complete only when:

- Every canonical theory item has claim, mechanism, move, boundary, evidence and curriculum path.
- Every M1–M6 module has a coherent lived → named → generalised → recalled account.
- Every outside-in practitioner principle is either represented, deliberately excluded with a reason, or left as a research gap.
- Evidence levels match continuous research and no strongest-item evidence leaks across a bundle.
- All local links resolve.
- No tracked file references a deleted review/audit artifact as a live source.
- The old status diary, demo-shift table, cull plan, exercise-refactor campaign and eyeball queue are absent from the canon.
- `git diff --check` passes.
- The theory handbook build and its relevant tests still pass, demonstrating that documentation cleanup did not disturb delivery surfaces.

## Success criterion

A fresh maintainer can open `theory-plan.md`, understand the whole AE101 theory and its evidentiary limits, trace every idea through M1–M6, and identify open questions without consulting a dated review, a historical plan or the private strategy.
