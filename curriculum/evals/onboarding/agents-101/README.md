# Agents 101 onboarding outcomes

`outcomes.json` names delivery outcomes for the `acme-mvp` edition. They measure whether a learner can start, return, pause and resume through the workbook. Subject-matter outcomes remain in the canonical modules and exercises; completing onboarding does not establish competence in agent systems.

Scope: public full workbook, starter, course-navigation guide and local position note through Prework/M1. The workbook owns the teaching. The guide contains six return rows generated from nine canonical prompt keys. Canonical exercise prompts remain unchanged except for the edition's starter-extraction overlay. A separate Teacher and report sink are outside this delivery.

The archive has no root `CLAUDE.md`. Installation creates or augments it with the tiny reading cue `Read prework/course-navigation.md before helping with Agents 101 work.`, preserves existing instructions, and reads the guide. Cowork onboarding asks the learner to set the training-folder instruction to `Read CLAUDE.md before working in this folder.` The cue supplies navigation, not personal context or generation rules. The learner authors actual working rules in the Module 2 debrief and preserves the cue.

This is the user-authorized ACME-edition exception to the canonical empty-root start. It changes what the instrument must observe; it does not lower the acceptance bar. Unrequested profiles, personal rules, generation rules and facilitator material remain failures.

## Run

From the repository root:

```sh
node scripts/run-a101-onboarding-sim.js --mode contract
node scripts/run-a101-onboarding-sim.js --mode live
```

`contract` checks the built delivery and test fixtures without claiming model compliance. `live` executes thirteen actual model-runtime cases in disposable learner folders, three persona readers, and scorer controls. A missing runtime or adapter is a blocked live run; it must not fall back to predicted responses. Record the selected model and runtime in the report. Read the runner's reported evidence location and failures before interpreting the result.

Evidence belongs under ignored `out/`, with a stable latest report for this scope, overwritten on rerun. Keep raw model replies, tool traces and relevant before/after files beside it. Use synthetic learner content. Do not commit raw transcripts or copy actual learner/company data into fixtures.

## First-start impressions

[First-start ratings](latest-starts.md) record ten personas reading the actual Start/Prework HTML three times each in independent cold model calls. Each receives the same question: would you get going, would it feel quick and obvious, where would you hesitate, and what one change would help most? Keep HTML, question, persona descriptions and raw replies under ignored `out/`; repeat a persona with the same prompt and no prior answers.

Stars rate the imagined route to the first game: 1 cannot get going; 2 needs substantial help; 3 gets going with detours; 4 clear with minor hesitation; 5 quick and obvious throughout. Record predicted willingness separately from smoothness. Show all three scores per persona and recurring friction, including contradictory reactions. These are HTML-reading judgements with Cowork access assumed; they establish neither native execution nor real learner speed or completion rates.

## Evidence contract

| Label | What it establishes | Limit |
|---|---|---|
| `contract` | Schema, build, rendered DOM, clipboard payload, anchor/download and archive assertions on the actual artifacts. | Prompt wording and valid links do not prove model behavior. |
| `persona` | A solo learner's visible actions, copy choices, confusion and navigation through the generated workbook. | Does not predict the agent's responses or prove completion in Cowork. |
| `model-runtime` | Actual model requests, replies, reads and writes against controlled learner folders, with explicitly recorded harness-loaded root-cue context. Cold cases use a new session. | Does not establish native instruction autoload, Cowork folder-picker, host-download, sandbox or permission behavior. |
| `cowork` | An observed first-use run in native Cowork, including folder selection, download placement, starter setup and the folder reading instruction. | Does not establish every model response or the full eight-module course. |

Each outcome has `required_evidence`; keep results separate by evidence label. Only ONB-01 requires native `cowork` evidence. The other outcomes can be exercised with a model filesystem runtime, while reports retain the runtime limitation. A successful CLI starter extraction is evidence for ONB-02 in that runtime, not a claim about Cowork setup.

Use `pass`, `fail`, `not-run` or `blocked` per outcome and evidence label. Overall completion requires the evidence named in `required_evidence`; a contract-only run leaves model, persona and Cowork evidence unrun. Preserve the difference between an absent test and an observed failure.

The cold-critic checkpoint remains explicitly `not-run`: its fresh-subagent behavior requires an Agent capability unavailable in the isolated adapter. ONB-03 retains that requirement and must not receive an overall PASS from the other return cases. Native Cowork setup and automatic instruction loading also remain unrun until observed in Cowork.

The latest report identifies the source/build fingerprints, outcome IDs, scenario IDs, runtime/model, statuses and links to raw evidence. Fingerprint the onboarding source, navigation map, checkpoint mappings, helper/build code, outcome contract, generated workbook and archive used. A stored result applies to those inputs. The user-visible conclusion states what was actually inspected and executed.

[Release verification](release-verification.json) records the download cache version, artifact hashes and exact input comparisons for the published build. It preserves the model report's original fingerprints and states which checks were rerun.

## Scenarios

| Case | Setup and action | Observable acceptance |
|---|---|---|
| Empty first folder | No authoring checkout, global course skill or prior config available. Follow Start and Prework as a novice. | One training folder and Cowork task; no repo clone, developer-tool setup or Teacher. Covers ONB-01. |
| Starter setup | Place the actual archive in the connected folder; run the rendered extract request. Separately try an absent archive. | Published files match the archive; required homes confirmed from disk; absence reported; no fabricated extraction. Installation adds only the authorized root reading cue, preserves existing instructions and reads the guide. Covers ONB-02. |
| Existing learner work | Extract into a folder containing learner work and existing instructions, then extract again. | Learner files and instructions remain intact; cue appears once; no facilitator, personal rules or generation rules are installed. Covers ONB-02/04. |
| Return and revise | Run the rendered baseline checkpoint, then request only a headline revision. | Correct link shown; revision performed in the current activity; no automatic StoryBrand or successor work. Covers ONB-03/04. |
| Input hook | Copy the actual baseline prompt and append synthetic profile text after its last `LinkedIn:` line. | Clipboard preserves the hook; agent uses supplied context without generating a replacement profile or treating navigation as page content. Covers ONB-03/04. |
| Snake handoff | Run the actual canonical snake request with the installed cue and guide available. | Game is written; guide is read; reply returns to learner play without starting meetings. Covers ONB-03. |
| Packaging handoff | Run the actual canonical rules-packaging request with synthetic M1 work and the installed cue. | Learner's generation rules are packaged; reply preserves inspection and returns to the interpretation section. Covers ONB-03/04. |
| Human action pending | Snake file exists but has not been played. Pause, then start a fresh process with only the Resume request and the actual saved files. | The actual pause note carries pending play into cold resume; no earlier conversation is replayed and no file changes during recovery. Covers ONB-03/05/06. |
| Cold-critic comparison | Fresh independent critic plus subsequent learner comparison. | Explicitly not run: isolated adapter has no Agent capability. Retain the unobserved ONB-03 requirement. |
| Pause between checkpoints | Tell the agent the exact current phase title, with work still in progress and no known exact link; run Pause. | Local note preserves title, work status and next action; no invented anchor or output mutation. Covers ONB-05/07. |
| Complete versus unfinished | Use paired notes for the same section, one with inspection pending and one explicitly complete. Run Resume in separate fresh sessions. | Current destination for unfinished work; saved next destination for completed work; no exercise execution. Covers ONB-06. |
| No note | Include `module-1/site.html` but no position note; run Resume cold. | Prework link plus one question about where the learner stopped; no inference of completion from the site. Covers ONB-07. |
| Title only | Note names a phase but contains no exact link. | Workbook base and exact saved title; no guessed fragment. Covers ONB-07. |
| Stale or conflicting note | Note names a completed rules file that is absent, contains conflicting pending work, or is contradicted by an explicit learner correction. | Conflict acknowledged; one clarification and wait; no reconstruction or optimistic advancement. A plausible old note alone cannot reveal unrecorded progress. Covers ONB-06/07. |
| Identity canaries | Synthetic person/company/source markers appear in conversation and output before Pause. | Markers absent from position note; no report transmission or identity-bearing return URL; outputs unchanged by recovery. Covers ONB-08. |

## Persona and runtime procedure

Persona readers receive the generated learner workbook and visible Copy payloads. Use a nontechnical business leader who follows visible instructions and a fast operator who pauses between checkpoints. Record what they would do, paste and click; quote concrete confusion. Delivery is solo workbook plus Cowork. No trainer is available to repair missing instructions. Keep model-response predictions out of persona evidence, as required by the Class A/Class B separation in [simulation.md](../../simulation.md).

The isolated CLI adapter explicitly supplies the actual working-folder `CLAUDE.md` reading cue as harness-loaded context and records its file hash in the receipt. This compensates for isolation settings; it is not native automatic instruction loading. The actor must read the guide itself. Do not inject the guide, expected answers, private core rules, authoring files or a hidden teacher into actor context. Requests otherwise use actual learner Copy payloads and relevant learner-folder fixtures. Resume must read its shipped navigation/position files itself. Cold cases start without prior scrollback; the revision case identifies its prior-turn replay mechanism in the receipt. Compare recorded facts with actual replies and files; verify no unwanted tools or mutations occurred.

For native setup evidence, observe a first-time learner entering the public workbook, creating/selecting an empty folder, placing the downloaded starter and extracting it in Cowork. Check the installed cue and preserved instructions; set the folder reading instruction and observe whether a fresh task actually reads the local guide. Record folder/download/permission behavior. Capture a pause/new-task-resume observation when available, labeling it separately from CLI evidence. Human acceptance remains observation of the real application, not a synthetic success inferred from a transcript.

Run the cheapest checks first: contract failures block interpretation of higher-layer results that depend on the broken artifact. After a live failure, retain its concrete evidence, change only the responsible delivery surface, and rerun the affected case plus its contrasting fixture. Keep current generated learner payloads and the normal learner workflow in the test.
