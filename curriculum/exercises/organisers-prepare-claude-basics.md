# Exercise: Organisers prepare Claude Basics

**Time:** 2 hours before the workshop. Organisers only.

This is the setup exercise for the whole 3-hour workshop. It keeps customer material inside the customer's SharePoint and Cowork environment. The public curriculum names the folder contract; organisers create and test the actual files.

## What organisers need to understand

SharePoint is not just file storage for this workshop. It is the shared runtime. Participants add two Cowork working folders: their own participant folder and the `shared/` folder. Personal drafts, CLAUDE.md files, and experiments stay in the participant folder. The `shared/` folder is the cohort bus: organisers drop prepared inputs there, nominated group drivers write group outputs there, and synthesis becomes possible because everyone is working against the same synced folder contract.

This design protects customer material. The public workbook gives prompts and file names. The actual task, verification document, group findings, answer key, and synthesis files stay in the customer's SharePoint/Cowork environment. Bosser tooling does not need to see them.

Prompts are delivered through the workbook, not through installed skills or a private automation layer. Participants copy the prompt blocks into Cowork. The prompt blocks tell Cowork which working folder to read from and which working folder to save to. If someone loses their place, bring them back to three questions: are both folders added, which file am I reading, and which folder am I saving into?

The synthesis magic comes from sync plus constraint. Most participants write only inside their participant working folder. Group drivers write the small number of shared group files into the `shared/` working folder. Once those files have synced, organisers can run the synthesis prompts against `shared/` and produce a room-level artifact without collecting documents manually, opening private participant folders, or debugging everyone's machine.

Assume eventual consistency. A file that was just saved may need a moment before another Cowork session can read it. If synthesis cannot see a group file immediately, confirm the filename, confirm it is in `shared/`, wait briefly, and retry. Do not turn that moment into a content discussion.

The organiser role is mechanical and custodial, not epistemic. Organisers keep access, folders, filenames, timing, and synthesis moving. Participants do the checking and rollout judgment. The private answer key exists to support reveal and synthesis, not to rescue the group from doing the work.

## Phase 1. Create the workspace

Create one cohort SharePoint workspace with this shape:

- `shared/`
- `participants/`
- one participant folder under `participants/` for each attendee

Do not put customer material in the public curriculum repo. Customer-owned files live only in the customer workspace.

In Cowork, participants do not rely on the cohort root. Each participant adds two working folders:

- their own participant folder
- the `shared/` folder

## Phase 2. Prove access

Before the workshop, prove every participant can do all of this:

- sync or open the cohort SharePoint workspace
- add their own participant folder as a Cowork working folder
- add `shared/` as a second Cowork working folder
- read a file from the `shared` working folder
- save a test markdown file in their participant working folder
- find their participant folder name again without help

If this fails, the workshop does not start as designed. Fix access before content.

## Phase 3. Prepare `shared/m1-task.md`

Write one task that matters to the team's daily work and where the team knows the ground truth.

Good defaults:

- a one-page response to whether internal users may paste customer email content into Claude
- a one-page response comparing Claude and ChatGPT for the team's work
- a one-page response on which connectors internal users should enable

Dry-run Module 1 Phase 1 in a fresh Cowork session with both the test participant folder and `shared/` added as working folders. The bare output should contain at least three catchable generic, off, or wrong items. If the output is simply fine, sharpen the task.

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

Confirm that nominated group drivers can write to the `shared` working folder in Cowork. M3 does not need a prewritten rollout-context file. It starts fresh from participant interviews.

## Phase 6. Dry-run the organiser prompts

Run a quick rehearsal of the organiser-only synthesis prompts using dummy files:

- `[Exercise: Organisers synthesize verification](exercises/organisers-synthesize-verification.md)`
- `[Exercise: Organisers synthesize rollout](exercises/organisers-synthesize-rollout.md)`

Use fake group files or non-sensitive sample content. The point is to test file paths, save behavior, timing, and the organisers' push-back rhythm.

## Phase 7. Dry-run as one participant

Create or use one test participant folder, for example `participants/test-participant/`. In Cowork, add that test participant folder and `shared/` as the two working folders. Run the workshop path from a participant point of view, not from an organiser/admin view.

Do a thin pass through each module:

- M1: read `m1-task.md` from the `shared` working folder, save `response.md`, and save a minimal `CLAUDE.md` in the test participant working folder
- M2: read `m2-verification-output.md` from the `shared` working folder, create `claim-pool.md`, `evidence-map.md`, and `verification-table.md` in the test participant working folder
- M2 group driver: save a dummy `group-1-verification.md` in the `shared` working folder
- M3: save `m3-rollout-notes.md` in the test participant folder
- M3 group driver: save a dummy `group-1-rollout-synthesis.md` in the `shared` working folder

Delete or clearly mark test files before the workshop. Keep any real customer content inside the customer environment.

The dry-run succeeds only if the participant path works without organiser-only permissions.

## Phase 8. Confirm the day-of contract

Before the room arrives, confirm:

- `shared/m1-task.md` exists
- `shared/m2-verification-output.md` exists
- organisers know where the public workbook is and can point participants to the current module prompts
- private M2 answer key is available only to organisers
- participant folders exist
- participants can add both their participant folder and `shared/` as Cowork working folders
- organisers know group count and group numbers
- group drivers know they are the only participant writers to the `shared` working folder
- organisers can save `m2-verification-synthesis.md` in the `shared` working folder
- organisers can save `m3-organisers-rollout-readout.md` in the `shared` working folder if the optional readout runs
- the test participant dry-run has passed

The workshop is ready when access, shared inputs, and organiser synthesis saves all work.

<!-- maintainer -->

**Meta (organisers):**
- **Audience:** organisers only
- **Timing:** reserve a 2-hour organiser prework block, ideally completed one or two days before the workshop
- **Privacy:** customer materials stay in the customer SharePoint/Cowork environment. Bosser tooling must not ingest customer files
- **Core readiness test:** every participant can add both Cowork working folders, read from `shared/`, and write to their own participant folder; organisers can write the two synthesis files; one full participant-path dry-run has passed

**Quality:** draft 2026-04-29
- draft 2026-04-29 (consolidated organiser preparation exercise; participant-path dry-run added; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md`
