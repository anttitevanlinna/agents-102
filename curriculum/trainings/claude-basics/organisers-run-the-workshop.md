# Organisers: run the workshop

## Big Idea

The same workbook carries the organiser runbook, but organiser work stays separate from the participant path.

## What This Section Builds

After this section, you will be able to:

- **Prepare** the shared workshop folder before the live session
- **Test** the group-driver path before participants arrive
- **Run** the organiser synthesis once group files start landing
- **Keep** customer material inside the customer's SharePoint and Cowork environment

## Start Here

This final section is for the people setting up and operating the workshop.

The live-room participant path does not need this section. It stays in the workbook because the customer receives one workbook, and organisers need the same prompts and file names the room will use.

## Prepare the Workshop

[Exercise: Organisers prepare Claude Basics](exercises/organisers-prepare-claude-basics.md)

## Synthesize the Rollout

[Exercise: Organisers synthesize rollout](exercises/organisers-synthesize-rollout.md)

## Close

When the workspace is tested and the organiser readout path is clear, the workbook is ready for delivery.

## Changes since last build

Entries since the workbook sent on 2026-05-06.

- **2026-05-15**, M2 *Find the rollout challenge*, Phase 1: prompt now asks Claude to stop and check with the participant if it can't find the named folder, or if someone else has already written there. Catches misnamed first-name folders and duplicate-name collisions without adding overhead to the common case.
- **2026-05-15**, M2 *Find the rollout challenge*, Phase 2: new optional group-driver prompt to re-check the group's folders for late-arriving notes and redo the crux analysis if anything new shows up. Use when a participant was slow to save or had sync issues.
- **2026-05-15**, M2 *Find the rollout challenge*, Phase 3: cross-pollination cycle now re-reads each target file right before appending and extends an existing "Comments from..." section instead of duplicating it. Reduces OneDrive write-race risk when multiple group drivers comment on the same file at once.
- **2026-05-15**, M3 homework *Find the wrong claims*: source files now live in a `sources/` subfolder. Phase 1 generates from `sources/`; Phase 2 checks against `sources/`. Stops the briefing from pulling in leftover files when the participant reuses the build-your-system folder.

<!-- maintainer -->

**Meta:**
- **Primary Bloom's level:** Apply
- **Audience:** organisers only
- **Role:** final workbook section that preserves the one-workbook customer delivery while separating organiser operations from participant flow
- **Ordering:** setup first, synthesis second. This fixes the previous rendered order where organiser prework appeared after the live participant exercise

**Quality:** compendium-audited 2026-05-15 (writing@eb1168f story@eb1168f technical@eb1168f behavior@eb1168f pedagogy@eb1168f strategy@eb1168f)
- judges @eb1168f: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- cross_module @eb1168f: PASS — set=[M1,M2,M3,M4]

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Organisers: run the workshop*

**Mood contract:** operational clarity. This section should feel like customer-side ownership, not another participant module.
