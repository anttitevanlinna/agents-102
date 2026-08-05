# AE101 M1 Room Agreement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved five-rule room agreement to the opening of AE101 M1 and keep the trainer run sheet aligned.

**Architecture:** The agreement is one top-level `##` chunk in the canonical AE101 M1 module, which makes it one composed slide across the full, preview, and team-track variants. The trainer-only run sheet records its delivery position and keeps it within the existing Connections allocation.

**Tech Stack:** Markdown curriculum sources, Node.js workbook renderer, existing curriculum and Slides checks.

## Global Constraints

- Preserve the approved wording exactly.
- Place the slide after `## What You'll Learn` and before `## Start here`.
- Keep the room agreement inside the existing 10-minute opening allocation.
- Do not change prompts, exercises, learning objectives, or downstream artifacts.
- Preserve unrelated working-tree changes.

---

### Task 1: Add and align the room agreement

**Files:**
- Modify: `curriculum/trainings/agentic-engineering-101/getting-going.md`
- Modify: `curriculum/trainings/agentic-engineering-101/trainer-modules.md`

**Interfaces:**
- Consumes: the approved slide copy in `docs/superpowers/specs/2026-08-05-ae101-m1-room-agreement-design.md`
- Produces: one new M1 slide and an aligned trainer flow/runtime description

- [ ] **Step 1: Confirm the slide does not already exist**

Run: `rg -n "How we work in this room" curriculum/trainings/agentic-engineering-101/getting-going.md`

Expected: exit 1 with no match.

- [ ] **Step 2: Add the approved slide**

Insert the exact approved Markdown after the `What You'll Learn` bullets and before `## Start here`.

- [ ] **Step 3: Align the trainer run sheet**

Add `Room agreement` before Connections in the M1 flow. Keep the agreement and trick-share together inside the existing 10-minute opening budget. Add a maintainer note to the module source that self-study skips the room-only slide silently.

- [ ] **Step 4: Verify source-level placement and wording**

Run: `sed -n '1,55p' curriculum/trainings/agentic-engineering-101/getting-going.md`

Expected: the five-rule slide appears once, immediately before `## Start here`.

### Task 2: Verify the rendered student experience

**Files:**
- Test: `scripts/curriculum.test.js`
- Test: `scripts/slides.test.js`
- Generated, gitignored output: `site/clients/codex-room-agreement/agentic-engineering-101/index.html`

**Interfaces:**
- Consumes: the updated module and trainer run sheet
- Produces: verification evidence for source checks, curriculum tests, workbook build, and the painted Slides deck

- [ ] **Step 1: Run focused slide checks**

Run: `node scripts/check-slide-size.js curriculum/trainings/agentic-engineering-101/getting-going.md && node scripts/check-slide-numbering.js curriculum/trainings/agentic-engineering-101/getting-going.md`

Expected: both commands exit 0.

- [ ] **Step 2: Run curriculum and Slides tests**

Run: `node --test scripts/curriculum.test.js scripts/slides.test.js`

Expected: zero failures.

- [ ] **Step 3: Build the student workbook**

Run: `node scripts/build-workbook.js codex-room-agreement agentic-engineering-101 --no-trainer-docs`

Expected: exit 0 and a workbook at `site/clients/codex-room-agreement/agentic-engineering-101/index.html`.

- [ ] **Step 4: Inspect the composed Slides deck**

Open the generated workbook, switch to Slides if needed, navigate to M1, and confirm visually that `How we work in this room` appears before `Start here`, all five bullets fit without clipping, and the approved wording is intact.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check && git diff -- curriculum/trainings/agentic-engineering-101/getting-going.md curriculum/trainings/agentic-engineering-101/trainer-modules.md docs/superpowers/specs/2026-08-05-ae101-m1-room-agreement-design.md docs/superpowers/plans/2026-08-05-ae101-m1-room-agreement.md`

Expected: no whitespace errors; diff contains only the approved room agreement, trainer alignment, design, and plan.
