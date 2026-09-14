# Agents 101 EU AI Act Case Implementation Plan

**Goal:** Add a second M1-M6 tmux-runner case in which a fictional Finnish solo psychologist builds an evidence-grounded EU AI Act readiness system for non-clinical publishing work.

**Design:** Keep the canonical A101 scenario sequence single-sourced. Add a `--case` selector to the arrange, run, and chain entry points. Each case supplies the same answer-token contract plus a small configuration file for source staging and assertion sentinels. Nordveil remains the default. Case-specific facts and legal claims live only in fixture material; canonical curriculum prompts remain unchanged.

**Scope:** Agents 101 mechanical runner only. Do not touch Agentic Engineering 101 or student-facing prompt bodies.

## Tasks

1. Add a failing case-selection/contract test covering default selection, the psychologist selector, required answer files, source seams, and M1-M6-only support.
2. Add shared case loading and pass `--case` through `arrange-agents-101.sh`, `run-a101.sh`, and `chain-agents-101.sh`.
3. Move domain-specific scenario tails behind existing/new answer tokens while preserving one prompt-key sequence.
4. Add the fictional psychologist fixture: profile, plausible answers, mixed-provenance corpus, M2 held-back contradiction, M3 fresh clarification, M4 security plants, and M5 groundedness plants.
5. Parameterize domain-specific assertions with case-owned regex sentinels; retain structural assertions in the runner.
6. Run static and focused runner tests, then execute the full psychologist M1-M6 chain with `--runtime codex-cli` in tmux.
7. Inspect artifacts and transcripts for prompt-chain or training-material defects. Stop if a real training issue appears; otherwise report the completed M1-M6 result.
