# AE101 Optional Challenges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one optional-challenges slide with four approved challenges to each Agentic Engineering 101 core module.

**Architecture:** Each challenge menu lives in its module file as a single `## Optional challenges` slide. The slide sits after the module's Key Concepts and closing core material, immediately before the between-module bring/pre-read block; links point to first-party documentation or the named practitioner's original material.

**Tech Stack:** Markdown curriculum sources, AE101 feature flags, repository curriculum validation scripts.

## Global Constraints

- Add exactly one optional-challenges slide per core module and exactly four challenges per slide.
- Keep each slide at or below the 210-word slide-size limit.
- Keep every challenge optional, concrete, and outside the taught sequence.
- Place the slide immediately before between-module prework; when no such block exists, place it before `## Next`.
- Preserve all unrelated worktree changes, including existing edits in Modules 4 and 5.
- Use the approved challenge concepts without adding replacement ideas.

---

### Task 1: Add the six challenge menus

**Files:**
- Modify: `curriculum/trainings/agentic-engineering-101/getting-going.md`
- Modify: `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`
- Modify: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`
- Modify: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md`
- Modify: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md`
- Modify: `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md`

**Interfaces:**
- Consumes: the approved M1-M6 challenge list and existing AE101 slide boundaries.
- Produces: six module-level `## Optional challenges` sections, each rendered as one four-item slide.

- [x] **Step 1: Add the Module 1 menu before `## Pre-reads before Module 2`**

  Include `/loop` PR follow-up, morning Jira root-cause triage, a 100-comment rules sweep, and automatic rule compounding.

- [x] **Step 2: Add the Module 2 menu before its feature-flagged pre-read blocks**

  Include design-framework planning, evidence-first internet research, Claude Code on the web plus mobile continuation, and adversarial pressure-testing of a plan.

- [x] **Step 3: Add the Module 3 menu before `## Bring to Module 4`**

  Include prompt injection through untrusted work items, bug-history versus test-coverage analysis, headless `-p`, and Claude Code GitHub Actions for vulnerability/version updates.

- [x] **Step 4: Add the Module 4 menu before `## Bring to Module 5`**

  Include the Gauntlet Loop, Wayfinder, a personal feature-spec brain, and a disposable-branch `/goal` codebase-reduction run.

- [x] **Step 5: Add the Module 5 menu at the feature-flag seam before Module 6 prework**

  Include original Ralph, `ultracode`, the planted-bug detection experiment, and an adversarial cross-agent feature-planning team.

- [x] **Step 6: Add the Module 6 menu before `## Next`**

  Include a universal skill loader, an architecture-compliance PR gate, team skill adoption, and instrumentation for skills/hooks/rules that do or do not fire.

### Task 2: Verify the curriculum patch

**Files:**
- Test: `curriculum/trainings/agentic-engineering-101/getting-going.md`
- Test: `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`
- Test: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`
- Test: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md`
- Test: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md`
- Test: `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md`

**Interfaces:**
- Consumes: the six edited Markdown files and repository validators.
- Produces: evidence that the menus have the right count, placement, size, link shape, and no unrelated diff damage.

- [x] **Step 1: Check counts and placement**

  Run `rg -n '^## (Optional challenges|Bring to|Pre-read|Pre-reads|Next)' curriculum/trainings/agentic-engineering-101/{getting-going,plan-mode-done-right,earn-the-trust,run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop}.md` and confirm six optional-challenge headings, each before its prework boundary.

- [x] **Step 2: Run focused curriculum validators**

  Run the repository slide-size, slide-numbering, slide-deixis, cross-document-anchor, source-freshness, and timing checks against the edited curriculum.

- [x] **Step 3: Inspect the final diff**

  Run `git diff --check` and inspect the diff for the plan plus six module files, confirming that the pre-existing Module 4 and Module 5 maintainer edits remain untouched.
