# Agents that build agents

## The handoff prompt that builds your kit

The shapes you drew are still in the session. Ask the agent to turn them into a prompt that builds the kit.

{{prompt:agents-that-build-agents-handoff}}

What comes back is a prompt, not a plan. Save it where you will find it.

<!-- maintainer -->

**Time:** 3 minutes.

**Handoff-prompt forcing function, failure mode + escape hatch (`check_pedagogy.md` §47, added 2026-08-20).** Dominant failure is **plan-instead-of-prompt**: asked to turn the session's shapes into something that builds the kit, the agent returns an implementation plan, and the student saves it believing they have the artefact. The body says *"What comes back is a prompt, not a plan"* precisely because this is the common return, but that line diagnoses without recovering. Escape hatch, trainer or self: ask for the prompt itself, in the words you would paste into a fresh session, and check the return opens with an instruction rather than a numbered plan. Second failure is **thin shapes**, where the stack exercise's diagrams never got drawn and the handoff has nothing to package; recover by pointing at the ranked recurring work from the study prompt and building from the top two. Nothing downstream consumes the return, but the student leaves without the one artefact the module exists to produce.

**L9 stays as it is (Antti 2026-09-03).** The plan-instead-of-prompt tell is not added to the body: more text without value at a three-minute beat. The recovery stays trainer-side, in the note above. Judges should not re-file `check_pedagogy.md` §47 or `check_student_facing.md` §5 on L9.

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Not a `check_lectures.md` §6 violation: *"The shapes you drew are still in the session"* names the student's own session, which is §6's tell. A trainer demo would hand the room the trainer's kit. Leave it student-run; do not re-flag.

**Prompt block:** `agents-that-build-agents-handoff` — the agent reads the recurring-work shapes from the session and writes the student a standalone, cold-runnable prompt that builds workflow skills across their whole stack (study then diagram then author). Anchoring (2026-08-01): requires only `recurring-shape-diagrams` (the `-shapes` output), not a shipped skill — the registry entry is the authority on prerequisites.

**Open for next pass:**
- Real-cohort gold standard: the only handoff-generator live-test on record is sim-grade (constructed M6 context: six named shapes, a stand-in skill) and predates the shapes-only anchor. A live-test on an actual student's M6 close, their real shapes, is the real-cohort bar; owed until a cohort runs.

**`## The move widens to everything you do` — cut whole (Antti 2026-09-02: nothing valuable enough; making room for the right content).** In git at `a4ccebe9`. Do not restore.

<!-- backing -->

Claims

Sources
(none. No claim rows; the prompt block carries its own registry entry.)

Frameworks

Stance `[stance:2026-09-02 level:L1]`
- holds: that a handoff prompt authored from the student's own session evidence is a candidate, not a plan. House position carried as a position.
- contested: nothing external. The only open question is empirical and local: whether a real cohort's handoff comes back cold-runnable (see Open for next pass).
- would-move-it: a real-cohort live-test on an actual student's close.

OODA
- question: none standing beyond the real-cohort live-test.
- roster: none.
- last-run: 2026-09-02

<!-- /backing -->

**Quality:** compendium-audited 2026-09-03 (writing@289b45a3 story@4e0370bc technical@4e0370bc behavior@4e0370bc strategy@4e0370bc slides@289b45a3)
- judges @289b45a3: writing PASS (3 todos see instances/ae101--lecture--the-handoff-prompt.writing.json), story PASS (1 todo see instances/ae101--lecture--the-handoff-prompt.story.json), technical PASS (1 todo see instances/ae101--lecture--the-handoff-prompt.technical.json), behavior PASS (1 todo see instances/ae101--lecture--the-handoff-prompt.behavior.json), pedagogy REVISE (1/0 see instances/ae101--lecture--the-handoff-prompt.pedagogy.json), strategy PASS, slides PASS
