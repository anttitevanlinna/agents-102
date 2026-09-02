# Agents that build agents

## The handoff prompt that builds your kit

The shapes you drew are still in the session. Ask the agent to turn them into a prompt that builds the kit.

{{prompt:agents-that-build-agents-handoff}}

What comes back is a prompt, not a plan. Save it where you will find it. The kit you grow on your own is the one that counts.

## The agent stops where your judgement begins
<!--tier:2-->

Not the agent writing its own skills without you in the room. You might have hoped that was the destination at the start of this training; at the close of M6, you know it is not. Agents that build agents is a collaboration in the same shape as everything else here. Claude proposes, you steer.

The agent's evidence stops at the disk. It can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint. The plan it generates is grounded in the evidence on disk; the decision about which proposals to act on is grounded in evidence the agent does not have.

Build the flywheel to run exactly that far. Let the agent run as far as it can on its own evidence, and stop at the moment your judgement is the input that matters. Anything further pretends the agent has access it does not have.

## The move widens to everything you do
<!--tier:3-->

One skill and one map, same move behind both. The skill, at M3, packaged a piece of judgement you had carried for years (how to write a good test). The map, at M6, named the judgement you spend over and over without packaging it. Every packaged move makes the next session cheaper.

The flywheel turns once more when you hand the agent the move itself. Ask it for a handoff prompt: one you paste into a fresh session later, that studies your work across your repos for the shapes you repeat, draws the ones worth packaging, and authors a skill for each. The same move you practiced at M3, widened to everything you do.

What comes back is a candidate. You read it the way you read any prompt the agent drafts: judgement, push-back, taste. Some of it will be obvious. Some of it will be off. One or two lines will be moves you would not have written on your own.

<!-- maintainer -->

**Time:** 5 minutes.

**Handoff-prompt forcing function, failure mode + escape hatch (`check_pedagogy.md` §47, added 2026-08-20).** Dominant failure is **plan-instead-of-prompt**: asked to turn the session's shapes into something that builds the kit, the agent returns an implementation plan, and the student saves it believing they have the artefact. The body says *"What comes back is a prompt, not a plan"* precisely because this is the common return, but that line diagnoses without recovering. Escape hatch, trainer or self: ask for the prompt itself, in the words you would paste into a fresh session, and check the return opens with an instruction rather than a numbered plan. Second failure is **thin shapes**, where M6 Phase 2's diagrams never got drawn and the handoff has nothing to package; recover by pointing at the ranked recurring work from the study prompt and building from the top two. Terminal beat, so nothing downstream breaks, but the student leaves without the one artefact the module exists to produce.

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as the weakest of six lecture prompts owing the trainer-demo sweep. It is not a violation at all: *"The shapes you drew are still in the session"* and *"The kit you grow on your own is the one that counts"* both name the student's own session and kit, which is §6's tell, so the tell was already present and no body edit is owed. A trainer demo would hand the room the trainer's kit. Leave it student-run; do not re-flag.

**Prompt block:** `agents-that-build-agents-handoff` — the agent reads the recurring-work shapes and the ranked primitives menu from the session and writes the student a standalone, cold-runnable prompt that builds workflow skills across their whole stack (study then diagram then author). Anchoring (authoring-sequence cut, 2026-08-01): requires only `recurring-shape-diagrams` (the `-shapes` output), not a shipped skill — the registry entry is the authority on prerequisites.

**Open for next pass:**
- Real-cohort gold standard: the handoff-generator live-test that cleared pedagogy was sim-grade — constructed M6 context (six named shapes, a stand-in skill), and it predates the 2026-08-01 re-anchor (shapes + primitives, no shipped skill). A live-test on an actual student's M6 close (their real shapes, their ranked menu) is the real-cohort bar; owed until a cohort runs.

<!-- backing -->

Claims
- `every-packaged-move-cheapens-the-next-run` · vision · "Every packaged move makes the next session cheaper." ← none-owed
- `hand-the-agent-the-move-itself` · vision · "The flywheel turns once more when you hand the agent the move itself." ← none-owed
- `what-comes-back-is-a-candidate` · vision · "What comes back is a candidate." ← none-owed
- `not-agent-writing-its-own-skills` · vision · "Not the agent writing its own skills without you in the room." ← none-owed
- `agents-evidence-stops-at-the-disk` · vision · "The agent's evidence stops at the disk." ← none-owed
- `stop-where-your-judgement-is-the-input` · vision · "stop at the moment your judgement is the input that matters" ← none-owed

Sources
(none. Every claim is a position about the student's own kit and the delegation boundary; the prompt block carries its own registry entry.)

Frameworks
- Principal–agent · [borrow:economics] · law:principal-agent · ← cultural-vocab — "the agent stops where your judgement begins" is the delegation boundary drawn at the limit of the agent's evidence
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — the handoff runs the ladder one rung further: the move that packages moves

Stance `[stance:2026-09-02 level:L1]`
- holds: that a handoff prompt authored from the student's own session evidence is a candidate, not a plan, and that the agent's evidence stops at the disk. Both are house positions carried as positions.
- contested: nothing external. The only open question is empirical and local: whether a real cohort's handoff comes back cold-runnable (see Open for next pass).
- would-move-it: a real-cohort live-test on an actual student's close.

OODA
- question: none standing beyond the real-cohort live-test.
- roster: none.
- last-run: 2026-09-02

<!-- /backing -->
