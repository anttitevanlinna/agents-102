# Eval Instance - Claude Basics M2: Find the crux on our journey

**Target file:** `curriculum/exercises/find-the-crux.md`
**Module file:** `curriculum/trainings/claude-basics/where-is-this-all-going.md`
**Strategy:** `bosser-strategy:content-strategy-claude-basics.md` section *Where is this all going?*
**Eval template:** `curriculum/evals/exercise.md`
**Audience persona:** rollout custodian with medium-to-light chat experience. Just finished the repo demo. Module 2 opens directly into live rollout-crux synthesis.

---

## Primary Judge - Leap Test

After completing this exercise, the participant can:

- **Articulate** the top difficulties facing their team's Claude rollout, surfaced through a Claude-led interview
- **Synthesize** a group's divergent rollout concerns into one named crux
- **Evaluate** what another group saw that their group missed, only after their own synthesis is stable
- **Recognise** the structure the room produced together: individual divergence, group convergence, then cross-pollination only if it helps

Pass condition: a chat-level rollout custodian can name their team's actual rollout crux in one sentence and explain why synthesis had to come before cross-pollination.

## Strategy Fidelity

The module leads with the current Big Idea:

> In 60 minutes each group produces a clean synthesis of what would make the Claude rollout work. The hard part isn't picking a tool. It's finding the crux on our journey.

The exercise must keep the Claude Basics mood contract:

- **M1 handoff:** the repo demo made system shape visible
- **M2 mood:** expanded horizon, forward awe with a deliverable in hand
- **M2 teaching moment:** the room realizes after the fact that it ran a useful divergence-to-synthesis system
- **M3 handoff:** separate homework turns the live shape into personal muscle memory

Avoid:

- Graduation-register close, where the room feels done
- Abstract architecture lecture before the room has lived the structure
- Organisers taking over the rollout judgment
- Any implication that Bosser tooling or the trainer's computer reads customer SharePoint, Cowork folders, or real workshop files

## Learning Goal Fit

The current module learning goals map to the exercise phases:

| Learning goal | Exercise evidence |
|---|---|
| Articulate rollout difficulties | Phase 1 `rollout-notes.md` in each participant's first-name folder |
| Synthesize divergent concerns | Phase 2 group synthesis file in `shared/`, such as `rollout-synthesis-access.md` |
| Evaluate another group's view | Phase 3 proposed addition, only if every group synthesis exists |
| Recognise the room structure | Close / reveal: individual divergence, group convergence, then cross-pollination |

## Prompt Design Checks

Prompt blocks should pass:

- Action lead-in before every fenced prompt
- No bracket placeholders inside fenced prompt blocks
- Cowork-only prompt labels, no runtime forks
- Plain prompt files, not installed skills
- Chain by files saved earlier: `rollout-notes.md` and the group's saved synthesis file in `shared/`
- Group synthesis shows the crux candidate in chat before saving
- Cross-pollination is optional and gated on all group syntheses existing

## Boundary Checks

The exercise is co-organised with the customer. That is deliberate.

Pass condition:

- Customer organisers prepare and operate the shared SharePoint/Cowork workspace
- Participants and nominated group drivers use Cowork in the customer's environment
- The trainer's computer shows the Bosser repo demo and public workbook only
- Public curriculum names artifact shapes and paths, never customer content
- Bosser tooling does not ingest or connect to customer workshop files

Fail condition:

- Any instruction asks the trainer, Bosser tooling, or this repo's build system to read, sync, import, or verify customer SharePoint/Cowork files
- Any organiser-only setup is reframed as Bosser-side access

## Failure Modes

- **Shared workspace not proven:** organisers did not confirm a likely group driver can read first-name folders and save to `shared/`
- **Participant notes become over-shared:** Phase 1 notes should sit in first-name folders; group-level files are the shared artifact
- **Driver works alone:** the group must challenge the candidate crux before saving
- **Cross-pollination starts too early:** groups compare before their own synthesis is stable
- **Organiser readout replaces group synthesis:** organiser synthesis is optional and downstream
- **Homework treated as live dependency:** build-and-verify belongs after the live session in a personal folder

## Verdict

**Status:** draft after live-architecture restructure.

Needs fresh compendium audit, sim pass, and mechanical prompt-chain test before claiming `compendium-audited`, `sim-passed`, or `mechanical-tested` again.
