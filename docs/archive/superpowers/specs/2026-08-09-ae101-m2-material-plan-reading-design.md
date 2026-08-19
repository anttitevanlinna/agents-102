# AE101 M2: Material Plan Reading

**Date:** 2026-08-09

## Intent

Module 2 should teach students to make the highest-value plan sharpenings before generation. The copied prompts deliberately offer a full, relentless grilling. The student is not expected to read and understand every line or exhaust every branch; the human remains the stop gate.

The student still performs two complementary reads:

1. Their own read applies codebase judgment and produces two specific push-backs.
2. A second-pass agent starts a full walk-down of the branches the student may not have noticed.

The stopping rule is good-enough judgment: use the grilling to resolve the uncertainties that would materially improve generation, then stop. The prompt supplies a high ceiling; it does not create a completion requirement.

## Approved prose pass

Revise non-prompt prose in these surfaces:

- `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`
- `curriculum/lectures/when-a-plan-is-good.md`
- `curriculum/exercises/push-back-on-the-plan.md`
- the mirrored M2 guidance in `curriculum/trainings/agentic-engineering-101/trainer-modules.md`
- the M2 reading-contract description in `curriculum/trainings/agentic-engineering-101/training-architecture.md`

The prose will:

- replace the full-read exception with a decision-focused scan;
- state that the second-pass prompt begins a full grilling while the student decides when enough value has landed;
- preserve the student's first read and two push-backs;
- preserve the second-pass read, approval, stop-before-execution, and reflection;
- make stopping a judgment call based on whether the plan is good enough to generate, not a failure to finish;
- update maintainer notes and claims that encode the former complete-read doctrine.

## Deliberately deferred

This pass does not edit:

- any file under `curriculum/prompts/`;
- any copied prompt wording or prompt registry output;
- timing figures, runtime maps, slots, or exercise durations;
- the exercise sequence or artifact contract.

The difference between prompt and prose is intentional. The prompts keep their full-on language (`detail over brevity`, `every unresolved branch`, and the optional relentless variant). The prose gives the student permission and criteria to stop the grilling once the plan is good enough to generate.

## Acceptance checks

- Active prose no longer directs students to read the whole plan, achieve a complete read, exhaust every unresolved branch, or continue until the agent runs out of branches.
- Active prose makes the deliberate asymmetry clear: the agent offers exhaustive pressure; the human decides when the plan is good enough.
- The two-read contrast remains intact: human codebase judgment first, agent breadth second.
- Prompt files, copied prompt wording, and timing lines are unchanged.
- Maintainer explanations no longer describe exhaustive reading as M2's protected pedagogy.
