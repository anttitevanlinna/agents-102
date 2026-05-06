# Exercise: Organisers prepare Claude Basics

**Time:** 2-hour organiser prework block. Organisers only.

This is the setup exercise for the 3-hour live workshop. The live room has two moving parts: the agentic system demo and the rollout-crux synthesis. The build-and-verify exercises are homework in an empty local folder on each participant's computer.

## System setup

Prepare this folder shape before the workshop. The example files show what will be created later; do not write the file contents in advance.

```text
claude-basics-workshop/
+-- CLAUDE.md
+-- aino/
|   +-- rollout-notes.md
+-- juhani/
|   +-- rollout-notes.md
+-- petra/
|   +-- rollout-notes.md
+-- samir/
|   +-- rollout-notes.md
+-- shared/
    +-- rollout-synthesis-atlas.md
    +-- rollout-synthesis-escalation-fog.md
    +-- organisers-rollout-readout.md
```

Create `CLAUDE.md` at the workshop folder root with this content:

```markdown
You are working in a SharePoint folder synced with OneDrive.
Assume eventual consistency on file reads; OneDrive may need a moment before another Cowork session can read a file that was just saved by a different session.
```

Use one SharePoint workshop folder root for the live synthesis. Everyone syncs that same folder root with OneDrive before the workshop. Inside it, create one first-name folder for each participant and one directory named `shared/`; individual notes go in the first-name folders, group synthesis files and the optional organisers' readout go in `shared/`.

Participants do their build-and-verify homework later in an empty local folder on their own computer. That homework does not use the shared SharePoint folder.

The public workbook gives prompts and file names. The actual group syntheses and any customer context stay in the customer's environment.

The trainer's computer shows the Bosser agentic system demo and public workbook. It does not connect to the customer SharePoint workspace, Cowork folders, or real workshop files. Customer organisers prove and operate the customer-side workspace.

Participants copy the workbook prompts into Cowork. In the live crux exercise, the important mechanics are: each person saves rollout notes in their own first-name folder, one group driver reads the group's first-name folders and writes the group synthesis to `shared/`, and organisers read the group files from `shared/`.

The synthesis works because writes are constrained. Most participants write only to their first-name folder. Group drivers write the small number of group synthesis files. Once those files appear in `shared/`, organisers can run the synthesis prompt without collecting documents manually or opening every participant folder.

Assume eventual consistency. OneDrive may need a moment before another Cowork session can read a file that was just saved by a different session. If synthesis cannot see a group file immediately, confirm the filename, confirm the `shared/` directory, wait briefly, and retry.

You keep access, folders, filenames, timing, and synthesis moving. Participants make the rollout judgment.

## Default room shape for 10 people

For a 10-person rollout team that already knows chat and is now taking on Cowork, use this as the default live format:

| Live segment | Time | Owner | Purpose |
|---|---:|---|---|
| Arrival, boundary, and goal | 5 min | Trainer + organisers | Name the co-organised setup, the customer-side workspace, and the output: group rollout syntheses |
| Agentic system demo | 35 min | Trainer | Show system shape through the Bosser repo and public workbook; translate each stop back to Cowork folders, prompts, saved output, and checks |
| Break | 10 min | Everyone | Reset after the demo before participants open Cowork |
| Cowork threshold check | 10 min | Organisers | Everyone opens the SharePoint workshop folder root and confirms their first-name folder. If one or two people are blocked, pair them with someone who can write during the individual note step and keep moving |
| Rollout-crux work | 60 min | Participants + group drivers | Run individual divergence, group synthesis, and optional cross-pollination |
| Break | 15 min | Everyone | Let the synthesis settle before readout |
| Group readout | 15 min | Group drivers | Each group reads its named crux, 30-day priority, and open organiser question |
| Homework launch | 20 min | Trainer | Give the build-and-verify homework |
| Organiser close | 10 min | Organisers | Confirm where group syntheses live, what happens next, and who owns follow-through |

Default grouping for 10 people is three groups: 3 / 3 / 4. Each group needs one Cowork-confident driver. For a room new to Cowork, identify the drivers before the workshop and place one in each group.

## Phase 1. Prepare the live synthesis workspace

Create or confirm the SharePoint workshop folder root. Make sure OneDrive sync is complete for every participant and organiser before the workshop.

Before the workshop, create:

- one first-name folder per participant, such as `aino/`, `petra/`, or `juhani/`; if two people have the same first name, add a short suffix and tell them the exact folder name
- one directory named `shared/`
- one `CLAUDE.md` at the workshop folder root with the note from System setup. This tells Claude to allow for OneDrive latency

Expected file names:

- one `shared/rollout-synthesis-...md` file for each group, such as `shared/rollout-synthesis-access.md` or `shared/rollout-synthesis-escalation-fog.md`. The name comes from the group driver prompt: a group name if the group gives one, or a crux-based name if the group does not
- `shared/organisers-rollout-readout.md` if the optional organisers' readout runs

Keep workshop materials in the SharePoint workshop folder root.

## Phase 2. Prepare group mechanics

Decide the grouping in the room. Each group can name itself on the fly. If a group does not care, Claude invents a short label from the selected crux.

For each group, prepare the exact first-name folder names the driver should give Claude. The driver opens Cowork on the SharePoint workshop folder root, reads those first-name folders, and saves the group synthesis to `shared/`.

For a 10-person cohort that is new to Cowork, identify one Cowork-confident driver per group before the workshop and place one in each group. If the whole room already uses Cowork comfortably, each group can choose its driver live.

## Phase 3. Rehearse participant and group output

In this phase, one organiser creates one fake `rollout-notes.md`, asks Claude to create three more, and then runs the group synthesis prompt against those four files.

**Session** *(new, "Dry run - participant notes")*

First, one organiser opens Cowork on the SharePoint workshop folder root and runs the Phase 1 prompt from [Exercise: Find the rollout challenge](exercises/find-the-crux.md) as a fake participant. Use your own first name, or a clearly marked test name. Answer with fake rollout difficulties.

When that first `rollout-notes.md` exists, ask Claude to use it as the pattern and create three more fake `rollout-notes.md` files.

**Prompt** *(Cowork, organisers only)*

```
Use the `rollout-notes.md` file you just created in the first-name folder from the participant rehearsal.

Use it as the pattern for three more fake `rollout-notes.md` files.

Create:
- `aino-test/rollout-notes.md`
- `petra-test/rollout-notes.md`
- `samir-test/rollout-notes.md`

Keep the same shape as the source `rollout-notes.md`: three rollout difficulties, one push-back answer for each, and enough detail for a group driver to synthesize a crux.

Make the three fake participants meaningfully different from each other.

After saving, list the three files you created.
```

**Session** *(new, "Dry run - group driver")*

Next, start a new Cowork session on the same workshop folder root and run the real group-driver prompt from [Exercise: Find the rollout challenge](exercises/find-the-crux.md) Phase 2 against the source first-name folder and the three generated fake first-name folders. Give Claude those exact folder names when it asks. For example:

- the source folder you used in the participant rehearsal
- `aino-test`
- `petra-test`
- `samir-test`

When Claude asks for the group name, use `rehearsal` or another clearly marked test group name. The saved file should land in `shared/` with the `rollout-synthesis-...md` filename pattern.

**Watch out for:** Claude should show the crux candidate in chat before saving. That gives the driver a chance to correct the choice before the file is written.

At the end of this phase, the workshop folder should contain four fake `rollout-notes.md` files and one group synthesis file in `shared/`.

## Phase 4. Rehearse organiser readout

**Session** *(new, "Dry run - organiser readout")*

After Phase 3 creates one group synthesis file in `shared/`, start a new Cowork session on the same workshop folder root and ask Claude to create two more fake group syntheses. This gives the organiser readout exercise three different group outputs to compare.

**Prompt** *(Cowork, organisers only)*

```
Scan `shared/` for the group rollout synthesis file created by the group-driver dry run. If no group synthesis file exists, stop and tell me to finish the group-driver dry run before continuing.

Read the group synthesis file you found in `shared/`.

Use it as the pattern for two additional fake group rollout synthesis files:
- `shared/rollout-synthesis-confidence.md`
- `shared/rollout-synthesis-support-model.md`

Make the two new files plausible outputs from different groups in the same live exercise. Make their cruxes meaningfully different from the rehearsal group's crux so an organisers' readout has something to compare.

After saving, list the two files you created.
```

Next, run the organiser synthesis exercise below on the rollout synthesis files in `shared/`.

**Watch out for:** The first readout may flatten the three cruxes into one bland theme. Correct it in chat until it preserves useful disagreement and names what organisers need to decide next.

After the readout is saved, delete the test folders and fake files before the workshop.

## Phase 5. Check readiness

Before the workshop, confirm:

- you know where the public workbook is and can point participants to the live module prompts
- OneDrive sync is complete on the participant and organiser machines that will use the SharePoint workshop folder
- every participant has an exact first-name folder name
- each group has one Cowork-confident driver, or each group can choose a driver live
- the rehearsal created one `shared/rollout-synthesis-...md` file from fake first-name folders
- the organiser readout exercise created `shared/organisers-rollout-readout.md`
- the test folders and fake files are deleted

If those checks pass, you are ready to run the customer-side workspace.

<!-- maintainer -->

**Meta (organisers):**
- **Audience:** organisers only
- **Timing:** reserve a 2-hour organiser prework block, ideally completed one or two days before the workshop
- **First cohort note:** the initial room is IT-heavy, but the reusable organiser instructions stay framed for any rollout team
- **Privacy:** customer materials stay in the customer SharePoint/Cowork environment. Bosser tooling and the trainer's computer must not ingest or connect to customer workshop files
- **Folder topology assumption:** one SharePoint workshop folder root is synced by OneDrive for everyone before the workshop. It contains one first-name folder per participant and one `shared/` directory. Participants write `rollout-notes.md` into their own first-name folder. Group drivers read first-name folders and write group syntheses to `shared/`; they do not add folders live
- **Core readiness test:** OneDrive sync is complete before the workshop; one organiser has rehearsed the participant prompt with fake first-name folders, the group-driver prompt into one `shared/rollout-synthesis-...md` file, and the organiser synthesis exercise into `shared/organisers-rollout-readout.md`; test files are deleted afterwards

**Quality:** draft 2026-05-06
- draft 2026-05-06 (removed inline self-link to the next included organiser exercise; eval not rerun)
- draft 2026-04-30 (restructured for live agentic system demo + live crux + homework path; sim/mechanical/eval not rerun)
- persona-simulated 2026-05-04 — organiser pass; group-driver folder rule, access-test order, and exact folder-name fixes applied

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md`
