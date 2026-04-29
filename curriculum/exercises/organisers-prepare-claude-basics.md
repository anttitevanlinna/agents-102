# Exercise: Organisers prepare Claude Basics

**Time:** 2 hours before the workshop. Organisers only.

This is the setup exercise for the whole 3-hour workshop. It keeps customer material inside the customer's SharePoint and Cowork environment. The public curriculum names the folder contract; organisers create and test the actual files.

## Phase 1. Create the workspace

Create one cohort SharePoint workspace with this shape:

- `shared/`
- `participants/`
- one participant folder under `participants/` for each attendee

Do not put customer material in the public curriculum repo. Customer-owned files live only in the customer workspace.

## Phase 2. Prove access

Before the workshop, prove every participant can do all of this:

- sync or open the cohort SharePoint workspace
- start Cowork on the workspace
- read a file from `shared/`
- save a test markdown file in their own participant folder
- find their participant folder name again without help

If this fails, the workshop does not start as designed. Fix access before content.

## Phase 3. Prepare `shared/m1-task.md`

Write one task that matters to the team's daily work and where the team knows the ground truth.

Good defaults:

- a one-page response to whether internal users may paste customer email content into Claude
- a one-page response comparing Claude and ChatGPT for the team's work
- a one-page response on which connectors internal users should enable

Dry-run Module 1 Phase 1 against `shared/m1-task.md` in a fresh Cowork session. The bare output should contain at least three catchable generic, off, or wrong items. If the output is simply fine, sharpen the task.

## Phase 4. Prepare `shared/m2-verification-output.md`

Create a two-page plausible output with about fifty factual claims. The claims should cover a mix of security, data handling, licensing, connectors, rollout advice, user instructions, numbers, dates, and product capabilities.

Seed or preserve several kinds of wrongness:

- known wrong claims
- unsupported claims
- stale claims
- overconfident claims
- claims the room cannot verify from available evidence

Prepare a private answer key for organisers. Keep it outside the public repo. Use it only in the customer Cowork/SharePoint environment during synthesis.

## Phase 5. Prepare M3 mechanics

Decide group count and group numbers:

- 8 or fewer participants: 2 to 3 groups
- 9 to 12 participants: 3 groups
- 13 to 16 participants: 4 groups

Confirm that nominated group drivers can write to `shared/`. M3 does not need a prewritten rollout-context file. It starts fresh from participant interviews.

## Phase 6. Dry-run the organiser prompts

Run a quick rehearsal of the organiser-only synthesis prompts using dummy files:

- `[Exercise: Organisers synthesize verification](exercises/organisers-synthesize-verification.md)`
- `[Exercise: Organisers synthesize rollout](exercises/organisers-synthesize-rollout.md)`

Use fake group files or non-sensitive sample content. The point is to test file paths, save behavior, timing, and the organisers' push-back rhythm.

## Phase 7. Dry-run as one participant

Create or use one test participant folder, for example `participants/test-participant/`. Run the workshop path from a participant point of view, not from an organiser/admin view.

Do a thin pass through each module:

- M1: read `shared/m1-task.md`, save `response.md`, and save a minimal `CLAUDE.md` in the test participant folder
- M2: read `shared/m2-verification-output.md`, create `claim-pool.md`, `evidence-map.md`, and `verification-table.md` in the test participant folder
- M2 group driver: save a dummy `shared/group-1-verification.md`
- M3: save `m3-rollout-notes.md` in the test participant folder
- M3 group driver: save a dummy `shared/group-1-rollout-synthesis.md`

Delete or clearly mark test files before the workshop. Keep any real customer content inside the customer environment.

The dry-run succeeds only if the participant path works without organiser-only permissions.

## Phase 8. Confirm the day-of contract

Before the room arrives, confirm:

- `shared/m1-task.md` exists
- `shared/m2-verification-output.md` exists
- private M2 answer key is available only to organisers
- participant folders exist
- organisers know group count and group numbers
- group drivers know they are the only participant writers to `shared/`
- organisers can save `shared/m2-verification-synthesis.md`
- organisers can save `shared/m3-organisers-rollout-readout.md` if the optional readout runs
- the test participant dry-run has passed

The workshop is ready when access, shared inputs, and organiser synthesis saves all work.

<!-- maintainer -->

**Meta (organisers):**
- **Audience:** organisers only
- **Timing:** reserve a 2-hour organiser prework block, ideally completed one or two days before the workshop
- **Privacy:** customer materials stay in the customer SharePoint/Cowork environment. Bosser tooling must not ingest customer files
- **Core readiness test:** every participant can read from `shared/` and write to their own participant folder; organisers can write the two synthesis files; one full participant-path dry-run has passed

**Quality:** draft 2026-04-29
- draft 2026-04-29 (consolidated organiser preparation exercise; participant-path dry-run added; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md`
