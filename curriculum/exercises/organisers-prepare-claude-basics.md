# Exercise: Organisers prepare Claude Basics

**Time:** 2 hours before the workshop. Organisers only.

This is the setup exercise for the 3-hour live workshop. The live room now has two moving parts: the repo demo and the rollout-crux synthesis. The build-and-verify exercises are homework in each participant's own safe folder, not shared-folder work during the session.

## What organisers need to understand

SharePoint is useful for the live synthesis, but it is no longer the whole workshop runtime. Participants do their build-and-verify homework later in any safe personal folder. During the live session, shared storage only needs to support the group rollout syntheses.

This design protects customer material and reduces live debugging. The public workbook gives prompts and file names. The actual group syntheses and any customer context stay in the customer's environment. Bosser tooling does not need to see them.

Prompts are delivered through the workbook, not through installed skills or a private automation layer. Participants copy the prompt blocks into Cowork. In the live crux exercise, the important mechanics are: each person can save personal notes somewhere safe, one group driver can write the group synthesis to the agreed shared location, and organisers can read the group files after they sync.

The synthesis magic comes from sync plus constraint. Most participants do not write shared files. Group drivers write the small number of group synthesis files. Once those files have synced, organisers can run the synthesis prompt and produce a room-level artifact without collecting documents manually or opening private participant folders.

Assume eventual consistency. A file that was just saved may need a moment before another Cowork session can read it. If synthesis cannot see a group file immediately, confirm the filename, confirm the `shared/` directory, wait briefly, and retry. Do not turn that moment into a content discussion.

The organiser role is mechanical and custodial, not epistemic. Organisers keep access, folders, filenames, timing, and synthesis moving. Participants do the rollout judgment. The homework does not need organiser answer keys.

## Phase 1. Prepare the live demo

Confirm the trainer can show the live system without hunting:

- deployed Acme workbook
- source module files
- exercise and prompt files
- `AGENTS.md`, root `CLAUDE.md`, and Claude Basics rules
- build script and generated client output
- recent commit history

The demo should show structure, not become a code walkthrough.

## Phase 2. Prepare the live synthesis workspace

Create or confirm one `shared/` directory for group synthesis files. It can be in SharePoint, Teams files, a shared OneDrive folder, or another customer-approved location.

Recommended file names:

- `rollout-synthesis-atlas.md` if a group chooses Atlas
- `rollout-synthesis-escalation-fog.md` if Claude invents a label from the selected crux
- `organisers-rollout-readout.md` if the optional organisers' readout runs

Do not put customer material in the public curriculum repo. Customer-owned files live only in the customer workspace.

## Phase 3. Prove group-driver access

Before the workshop, prove at least one likely group driver can do all of this:

- open Cowork on a safe personal folder
- add or access the `shared/` directory if Cowork needs it
- save a test markdown file in `shared/`
- see the saved file from another organiser's machine

If this fails, fix the `shared/` directory before the room arrives. Do not debug shared writes live.

## Phase 4. Prepare group mechanics

Decide the grouping in the room. Each group can name itself on the fly. If a group does not care, Claude invents a short label from the selected crux.

Do not pre-assign group drivers unless access constraints require it. Each group should choose the person most comfortable operating Cowork.

## Phase 5. Dry-run the organiser prompt

Run a quick rehearsal of the organiser-only rollout synthesis prompt using dummy files:

- `[Exercise: Organisers synthesize rollout](exercises/organisers-synthesize-rollout.md)`

Use fake group files or non-sensitive sample content. The point is to test file paths, save behavior, timing, and the organisers' push-back rhythm.

## Phase 6. Dry-run as one participant

Create or use one safe test folder. Run the live crux path from a participant point of view, not from an organiser/admin view.

Do a thin pass:

- save `rollout-notes.md` in the test folder
- as group driver, save a dummy `rollout-synthesis-atlas.md` in `shared/`
- as organiser, read that dummy group file and save a dummy `organisers-rollout-readout.md` in `shared/`

Delete or clearly mark test files before the workshop. Keep any real customer content inside the customer environment.

The dry-run succeeds only if the participant path works without organiser-only permissions.

## Phase 7. Frame the homework

Make sure organisers can say the homework path plainly:

- open Cowork on any safe personal folder
- run the build-your-system homework there
- run the verification homework there
- keep the resulting `CLAUDE.md`, `response.md`, `verification-table.md`, and `homework-summary.md`

No organiser material is required for the homework.

## Phase 8. Confirm the day-of contract

Before the room arrives, confirm:

- organisers know where the public workbook is and can point participants to the live module prompts
- trainer can run the repo demo without searching
- organisers know how groups will be formed in the room
- at least one likely group driver has already saved a test file to `shared/`
- organisers can save `organisers-rollout-readout.md` if the optional readout runs
- the test participant dry-run has passed
- organisers can explain the homework folder model in one sentence

The workshop is ready when the demo path, `shared/` save path, and homework framing all work.

<!-- maintainer -->

**Meta (organisers):**
- **Audience:** organisers only
- **Timing:** reserve a 2-hour organiser prework block, ideally completed one or two days before the workshop
- **Privacy:** customer materials stay in the customer SharePoint/Cowork environment. Bosser tooling must not ingest customer files
- **Core readiness test:** trainer can run the repo demo; one group driver can save a synthesis file; organisers can read it and save the readout; one participant-path dry-run has passed

**Quality:** draft 2026-04-30
- draft 2026-04-30 (restructured for live repo demo + live crux + homework path; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md`
