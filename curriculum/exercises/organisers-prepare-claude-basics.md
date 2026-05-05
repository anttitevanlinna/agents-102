# Exercise: Organisers prepare Claude Basics

**Time:** 2-hour organiser prework block. Organisers only.

This is the setup exercise for the 3-hour live workshop. The live room has two moving parts: the repo demo and the rollout-crux synthesis. The build-and-verify exercises are homework in each participant's own safe folder.

## What organisers need to understand

Use one shared SharePoint workshop folder for the live synthesis. Everyone syncs that same folder before the workshop. Inside it, create one first-name folder for each participant and one directory named `shared/`; individual notes go in the first-name folders, group synthesis files and the optional organisers' readout go in `shared/`.

Participants do their build-and-verify homework later in an empty personal folder they choose. That homework does not use the shared SharePoint folder.

The public workbook gives prompts and file names. The actual group syntheses and any customer context stay in the customer's environment.

The trainer's computer shows the Bosser repo demo and public workbook. It does not connect to the customer SharePoint workspace, Cowork folders, or real workshop files. Customer organisers prove and operate the customer-side workspace.

Participants copy the workbook prompts into Cowork. In the live crux exercise, the important mechanics are: each person can save personal notes in their own first-name folder, one group driver can read the group's first-name folders and write the group synthesis to `shared/`, and organisers can read the group files after they sync.

The synthesis comes from sync plus constraint. Most participants do not write shared files. Group drivers write the small number of group synthesis files. Once those files have synced, organisers can run the synthesis prompt without collecting documents manually or opening private participant folders.

Assume eventual consistency. A file that was just saved may need a moment before another Cowork session can read it. If synthesis cannot see a group file immediately, confirm the filename, confirm the `shared/` directory, wait briefly, and retry. Do not turn that moment into a content discussion.

The organiser role is mechanical and custodial, not epistemic. Organisers keep access, folders, filenames, timing, and synthesis moving. Participants do the rollout judgment.

## Default room shape for 10 people

For a 10-person IT team that already knows chat and is now taking on Cowork, use this as the default live format:

| Live segment | Time | Owner | Purpose |
|---|---:|---|---|
| Arrival, boundary, and goal | 5 min | Trainer + organisers | Name the co-organised setup, the customer-side workspace, and the output: group rollout syntheses |
| Repo demo | 35 min | Trainer | Show system shape through the Bosser repo and public workbook; translate each stop back to Cowork folders, prompts, saved output, and checks |
| Break | 10 min | Everyone | Reset after the demo before participants open Cowork |
| Cowork threshold check | 10 min | Organisers | Everyone opens the shared workshop folder and confirms their first-name folder. Pair or move anyone blocked; do not debug sync live |
| Rollout-crux work | 60 min | Participants + group drivers | Run individual divergence, group synthesis, and optional cross-pollination |
| Break | 15 min | Everyone | Let the synthesis settle before readout and homework launch |
| Group readout | 15 min | Group drivers | Each group reads its named crux, 30-day priority, and open organiser question |
| Homework launch | 20 min | Trainer + organisers | Show the personal-folder path for build-and-verify homework and make the expected artifacts concrete |
| Organiser close | 10 min | Organisers | Confirm where group syntheses live, what happens next, and who owns follow-through |

Default grouping for 10 people is three groups: 3 / 3 / 4. Each group needs one Cowork-confident driver. If Cowork confidence is uneven, identify the drivers during preflight and place one in each group.

## Phase 1. Prepare the live demo

Confirm the trainer can open the live demo without hunting:

- public workbook URL
- repo or screen-share setup for the trainer's system demo
- two or three prepared stops that show rules, prompts, checks, output, and a recent change

The demo should show structure, not become a code walkthrough.

## Phase 2. Prepare the live synthesis workspace

Create or confirm the shared SharePoint workshop folder. Make sure every participant and organiser has synced it locally before the workshop.

Inside the synced SharePoint workshop folder, create:

- one first-name folder per participant, such as `aino/`, `petra/`, or `juhani/`; if two people have the same first name, add a short suffix and tell them the exact folder name
- one directory named `shared/`
- one `CLAUDE.md` at the workshop folder root with two short lines: *"You are working in a SharePoint-synced folder. Assume eventual consistency on file reads, a file just saved by another session may need a moment before another Cowork session can read it."* This is what tells Claude the runtime; the prose advice in Phase 1 is for humans

Expected file names:

- one `rollout-synthesis-...md` file for each group, such as `rollout-synthesis-access.md` or `rollout-synthesis-escalation-fog.md`. The name comes from the group driver prompt: a group name if the group gives one, or a crux-based name if the group does not
- `organisers-rollout-readout.md` if the optional organisers' readout runs

Keep workshop materials in the shared SharePoint workshop folder.

## Phase 3. Prove group-driver access

Before the workshop, prove each likely group driver can do all of this:

- open Cowork on the synced SharePoint workshop folder
- create or read test `rollout-notes.md` files in two fake participant folders, such as `bjorn-test/` and `solveig-test/`
- save a test markdown file in `shared/`
- see the saved file from another organiser's machine

For a quick access proof, the fake `rollout-notes.md` files can contain one or two lines. Phase 6 runs the fuller rehearsal against the same folder pattern.

If this fails, fix SharePoint sync or folder permissions before the room arrives. Do not debug shared writes live.

## Phase 4. Prepare group mechanics

Decide the grouping in the room. Each group can name itself on the fly. If a group does not care, Claude invents a short label from the selected crux.

Groups do not need their own folders. The driver opens Cowork on the shared workshop folder, reads the participant folders for the people in that group, and saves the group synthesis to `shared/`. Do not save group output in the driver's personal folder. Give drivers the participant folder names exactly as they appear.

Do not pre-assign group drivers unless access constraints require it. For a 10-person IT cohort that is new to Cowork, access constraints usually do require it: preflight three likely drivers and place one in each group. If all participants are already fluent, each group can choose the person most comfortable operating Cowork.

## Phase 5. Rehearse the group outputs and organiser readout

Run this rehearsal in the customer-side shared workshop folder, with fake group outputs only. One organiser opens Cowork on the synced workshop folder and asks Claude to simulate the group synthesis files the live room should produce.

Ask Claude to create three dummy group synthesis files in `shared/`.

**Prompt** *(Cowork, organisers only)*

```
Create rehearsal files for the Claude Basics rollout-crux workshop.

Use fake, non-sensitive content. Do not use real customer facts, policies, names, systems, or incidents.

Create three group rollout synthesis files in `shared/`:
- `shared/rollout-synthesis-access.md`
- `shared/rollout-synthesis-confidence.md`
- `shared/rollout-synthesis-support-model.md`

Each file should look like a plausible group output from the live exercise and include:
- named crux
- supporting evidence from the group
- what we should prioritise in the next 30 days
- what we should defer for now
- one open question the organisers need to answer

Make the three cruxes different enough that an organisers' readout has something to synthesize. After saving, list the three files you created.
```

**Watch out for:** Claude may write the files in chat but not save them. Confirm the files exist in `shared/` before continuing. If it invents real-sounding customer details, stop and rerun with fake content only.

Then rehearse the optional cross-group synthesis move that group drivers may run after every group synthesis exists.

**Prompt** *(Cowork, organisers only)*

```
Rehearse the cross-group synthesis move for Claude Basics.

Read:
- `shared/rollout-synthesis-access.md`
- `shared/rollout-synthesis-confidence.md`

Compare them briefly:
- one idea the confidence group saw that the access group missed
- one thing the access group should keep distinct
- one sentence we could add to `shared/rollout-synthesis-access.md`, if any

Show me the proposed addition in chat first. Do not save yet. Before I approve, confirm in one sentence that the addition sharpens the access group's crux rather than blurring it. If the addition muddies the crux, say so and stop.

After I approve it, append a short section called "Cross-pollination note" to `shared/rollout-synthesis-access.md`.
```

**Watch out for:** Cross-pollination should sharpen one group's synthesis, not merge the two groups into one average answer. If the proposed addition muddies the access group's crux, do not save it.

Then ask Claude to create the organiser readout from the dummy group files.

**Prompt** *(Cowork, organisers only)*

```
Read these rehearsal group rollout synthesis files from `shared/`:
- `shared/rollout-synthesis-access.md`
- `shared/rollout-synthesis-confidence.md`
- `shared/rollout-synthesis-support-model.md`

Create an organisers' rollout readout with:
- the cruxes that appear across multiple groups
- the sharpest disagreement between groups, even if uncomfortable: where would two groups make a different call? Quote both sides. Don't smooth into a shared theme
- the top three priorities for the next 30 days, named as the problem they solve, not the virtue they embody
- what should be deferred for now
- open questions the organisers need to answer
- one next action for the organisers this week

Show me the readout in chat first. Do not save yet. I will correct priorities, deferrals, and ownership.

After I approve it, save it as `shared/organisers-rollout-readout.md`.
```

**Watch out for:** The first readout may average the three cruxes into a bland theme. Push back until it preserves useful disagreement and names what organisers actually need to decide next.

The rehearsal passes only if organisers can read the three dummy files from `shared/`, run the cross-group synthesis without blurring the cruxes, correct the readout in chat, save `shared/organisers-rollout-readout.md`, and see the saved file from another organiser's machine.

Delete the dummy group files and dummy organiser readout before the workshop, or move them into a clearly named rehearsal folder. Do not leave fake outputs where participants could mistake them for live work.

## Phase 6. Dry-run as one participant

Use the same synced workshop folder. This checks the participant and group-driver path from inside the folder the room will actually use.

First ask Claude to simulate two participant note files, unless Phase 3 already created them.

**Prompt** *(Cowork, organisers only)*

```
Create two fake participant-note files for a Claude Basics rehearsal.

Use fake, non-sensitive content. Do not use real customer facts, policies, names, systems, or incidents.

Create these files:
- `bjorn-test/rollout-notes.md`
- `solveig-test/rollout-notes.md`

Each file should include:
- three Claude-rollout difficulties in that participant's voice
- one push-back answer for each difficulty
- enough detail for a group driver to synthesize a crux

After saving, tell me which files you created.
```

**Watch out for:** This checks folder access, not content quality. If Claude cannot create `bjorn-test/` or `solveig-test/`, fix folder permissions or create the folders manually before the workshop.

Then rehearse the group-driver synthesis path against those files.

**Prompt** *(Cowork, organisers only)*

```
Create a rehearsal group synthesis from the fake participant notes.

Read:
- `bjorn-test/rollout-notes.md`
- `solveig-test/rollout-notes.md`

Propose the one difficulty that, if this rehearsal team got it right, would make the others follow. That's the crux.

Show the crux candidate in chat first. Do not save yet. Include:
- named crux
- why you chose it over the other difficulties
- evidence from both rehearsal participant notes
- what would change if this crux got handled well

After I approve it, save the synthesis as `shared/rollout-synthesis-rehearsal.md`.

The saved file must include:
- named crux
- supporting evidence from the group
- what we should prioritise in the next 30 days
- what we should defer for now
- one open question the organisers need to answer
```

**Watch out for:** If Claude saves before showing the candidate in chat, the live driver prompt is too easy to rush. In the workshop, drivers must pause for group push-back before saving the synthesis.

At the end of this phase, the workshop folder should contain `bjorn-test/rollout-notes.md`, `solveig-test/rollout-notes.md`, and `shared/rollout-synthesis-rehearsal.md`.

Delete or clearly mark test files before the workshop. Keep any real customer content inside the customer environment.

The dry-run succeeds only if the participant path works without organiser-only permissions.

## Phase 7. Frame the homework

Make sure organisers can say the homework path plainly:

- open Cowork on an empty personal folder
- run the build-your-system homework there
- run the verification homework there
- keep the resulting `CLAUDE.md`, `response.md`, `verification-table.md`, and `homework-summary.md`

No organiser material is required for the homework.

## Phase 8. Confirm the day-of contract

Before the room arrives, confirm:

- organisers know where the public workbook is and can point participants to the live module prompts
- trainer can run the repo demo without searching
- organisers know how groups will be formed in the room
- each group has one Cowork-confident driver, or the room is fluent enough to choose drivers live
- each likely group driver has already saved a test file to `shared/`
- organisers have rehearsed simulated group outputs and can save `organisers-rollout-readout.md` if the optional readout runs
- the test participant dry-run has passed
- organisers can explain the homework folder model in one sentence

The workshop is ready when the demo path, `shared/` save path, and homework framing all work.

<!-- maintainer -->

**Meta (organisers):**
- **Audience:** organisers only
- **Timing:** reserve a 2-hour organiser prework block, ideally completed one or two days before the workshop
- **Privacy:** customer materials stay in the customer SharePoint/Cowork environment. Bosser tooling and the trainer's computer must not ingest or connect to customer workshop files
- **Folder topology assumption:** one shared SharePoint workshop folder is synced by everyone before the workshop. It contains one folder per participant and one `shared/` directory. Participants write `rollout-notes.md` into their own folder. Group drivers read participant folders and write group syntheses to `shared/`; they do not add folders live
- **Core readiness test:** trainer can run the repo demo; everyone can sync the workshop folder; each likely group driver can read participant folders and save a synthesis file to `shared/`; organisers can read it and save the readout; one participant-path dry-run has passed

**Quality:** draft 2026-04-30
- draft 2026-04-30 (restructured for live repo demo + live crux + homework path; sim/mechanical/eval not rerun)
- persona-simulated 2026-05-04 — organiser pass; group-driver folder rule, access-test order, and exact folder-name fixes applied

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md`
