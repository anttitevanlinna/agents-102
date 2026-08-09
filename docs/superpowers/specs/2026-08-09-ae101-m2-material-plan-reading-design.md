# AE101 M2: Material Plan Reading

**Date:** 2026-08-09

## Intent

Module 2 should teach students to make the highest-value plan sharpenings before generation. It should not ask them to read and understand every line, exhaust every branch, or mistake coverage for control.

The student still performs two complementary reads:

1. Their own read applies codebase judgment and produces two specific push-backs.
2. A second-pass agent surfaces consequential branches the student may not have noticed.

The stopping rule is materiality: resolve the few uncertainties most likely to change scope, design, files touched, migration safety, or verification. Approve once the remaining questions are routine implementation choices or would not change the plan.

## Approved prose pass

Revise non-prompt prose in these surfaces:

- `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`
- `curriculum/lectures/when-a-plan-is-good.md`
- `curriculum/exercises/push-back-on-the-plan.md`
- the mirrored M2 guidance in `curriculum/trainings/agentic-engineering-101/trainer-modules.md`
- the M2 reading-contract description in `curriculum/trainings/agentic-engineering-101/training-architecture.md`

The prose will:

- replace the full-read exception with a decision-focused scan;
- replace exhaustive branch coverage with ranked, consequential branches;
- preserve the student's first read and two push-backs;
- preserve the second-pass read, approval, stop-before-execution, and reflection;
- make stopping early a judgment call based on remaining value, not a failure to finish;
- update maintainer notes and claims that encode the former complete-read doctrine.

## Deliberately deferred

This pass does not edit:

- any file under `curriculum/prompts/`;
- any copied prompt wording or prompt registry output;
- timing figures, runtime maps, slots, or exercise durations;
- the exercise sequence or artifact contract.

Until the prompt discussion is resolved, the current second-pass prompt will remain more exhaustive than the revised body. That temporary mismatch is explicit and must not be treated as the finished M2 design.

## Acceptance checks

- Active prose no longer directs students to read the whole plan, achieve a complete read, exhaust every unresolved branch, or continue until the agent runs out of branches.
- The prose consistently names execution impact as the selection and stopping criterion.
- The two-read contrast remains intact: human codebase judgment first, agent breadth second.
- Prompt files and timing lines are unchanged.
- Maintainer explanations no longer describe exhaustive reading as M2's protected pedagogy.

