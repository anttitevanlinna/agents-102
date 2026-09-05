# AE101 M6 — reference artifact

Task-scoped reference for the M6 generation run. Subagents read this first. Pairs with `ae101-m6-verifier.md` (quality gate).

**Dated generation record: history, not a pointer.** It names the file set as it stood on 2026-05-04. Several of those files were renamed or cut in the M6 re-cut, so do not follow its paths or repair them.

---

## Task scope

Generate AE101 Module 6 (*Spot gaps, build the loop*) end-to-end: seven new files plus two alignment edits. This is the **packaged re-send** on M6. The first attempt (turn 1 of the 2026-04-24 planning session) was un-packaged — chat-shaped, no reference, no plan, no verifier. This run is the M5 move applied to its own work.

## Success criteria

- All seven new files pass the background-agent verifier before save (approve or approve-with-todos).
- Content-strategy *State of play* reflects M6's new shape (Story opener, arc-retrospective beat, simple-round Debrief).
- Site `MODULES` array for AE101 includes the M6 entry with correct slug and title.
- Every subagent decision and loop iteration appends to `ae101-m6-session-notes.md`.
- Story of Module 6 lecture drafted **last**, main-thread, from session notes.

## Mood (verbatim — do not paraphrase)

**Practitioner fluency** — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. You close the laptop at M6 holding the move, not just the file.

Failure shapes that steal the mood: compliance-feel (*"build the eval, pass the gate"*), paperwork-feel, credibility-performance (*"we live what we teach"*), trainer-monologue retrospective. If any draft reads like one of those, revise.

## Learning objectives (verbatim from module file; Bloom ceiling Evaluate — the authoring Create beat lives past the module)

- **Diagnose** the gap two runs of the same task surface
- **Route** each gap to its home: memory, sharper verifier, or new skill
- **Cut** one rule from `./CLAUDE.local.md` the diagnosis killed
- **Surface** the kinds of work you repeat across your stack, and draw their recurring shapes
- **Map** evals across verifier, judge, and gate
- **Encode** the lesson so the next loop inherits it
- **Generalize** the shapes you mapped into a handoff prompt that builds your workflow skills across your stack

## Three moves of the main exercise (strategy § M6 in detail)

1. **Diff against the baseline.** Read the packaged run alongside the un-packaged one. Where did packaging catch what it was meant to catch? Where did it not? What new failure modes surfaced? Compressed into shared Phase 1.
2. **Name the gaps, name the loop.** Claude as co-reader, not quizmaster. What belongs in memory, what in the verifier, what in a new skill. Shared Phase 1.
3. **Map the stack, route the gap.** Stack scan through conversation (work history → recurring shapes → primitives menu); the dominant gap gets a named home before anything gets built. The encode-move ships as the closing lecture's handoff prompt — cold-runnable, built from the shapes and the primitives menu — and the next skill is authored from it after the module, on a real run. No second skill is authored inside M6.

## Forward-looking beat — arc-named retrospective

Between exercise and Debrief. You ask an agent to read your M1–M6 artefacts (root `CLAUDE.md` / `CLAUDE.local.md`, memory, ADRs, the test-strategy skill, the stack-map, the M4 un-packaged run, the M5 packaged re-run) and write a one-page note on what changed across six modules. The agent names the arc from your own evidence, not a trainer monologue. Lands *"everything is scaling of learning"* throughline. For core-only cohorts, this is the visible compounding moment M7 would otherwise carry. 15–20 min.

## Debrief — simple round with trainer/group leeway

M6 closes the core. Default shape: each person speaks briefly on one key learning and one personal thought about the future. Human-voiced, not agent-mediated. Trainer and group choose the exact form (pair exchange, whole-room round, silent write-then-share). The canonical M2+ self-compound pattern does NOT run here — the encode step already happened in the handoff-prompt build. Self-study variant: Teacher Claude invites the same two-part articulation in conversation; scrollback carries it; optional keepsake note. 10–15 min.

## Lectures

**Opener — Story of Module 6** (`lectures/story-of-module-6.md`). 5–7 min. First-person past tense, signed *— Antti*. Stats block from this generation session + two or three real fails + generalize + land. Thesis: *the LLM is not a deterministic machine; everyone struggles, including the trainers, including this morning.* Permission-giving, not credibility-performance. Drafted main-thread LAST from session notes.

**Closer — The loop has a name** (`lectures/the-loop-has-a-name.md`). 15–18 min. Names evals with full weight from your just-built artefact: *"your verifier is an eval; your judge is an eval; your gate is an eval. Practitioners call them judges when LLM-based, verifiers when deterministic, gates when placed in CI."* Anchor cases: Ramp Dojo (350-skill marketplace) + Intercom Tier 1/2/3 (19.2% auto-approved, 14.6 min vs 75.8 min org median, 86% ≤20 lines, 500-person R&D). Forward-looking register: scheduled-agents callout, team-kit as accreting infrastructure, loop-as-stance that survives model changes. Bridges to M7 (optional) or to Monday-morning for core-only cohorts. Mirrors `what-packaging-is.md` shape (770 words body, full maintainer block). **Does NOT reuse `lectures/evals-as-steering.md` — that file is Agents 101-voiced (Module 5 in Agents 101 is hallucination-catching, not packaged re-run).**

## Module runtime budget

| Beat | Time |
|---|---|
| Opener — Story of Module 6 | 5–7 min |
| Exercise — diff + name-gaps + second-skill authoring | 40–50 min |
| Forward-looking — arc-named retrospective | 15–20 min |
| Debrief — simple round, leeway | 10–15 min |
| Closer — the loop has a name | 15–18 min |
| **Total** | **85–110 min** — fits AE101 2h slot with buffer |

## Themes earned (in priority for drafting)

- **Self-aware + grain of salt.** The whole module is conversation with Claude about Claude's output across two runs. The artefacts rule, the self-reports don't. Surface this in the exercise's Phase 1 push-backs and in the closing lecture's judge-built-from-diagnosis move.
- **Compounding.** Klaassen's Review + Compound step made explicit across two runs of the same task. Iterative encoding, not single-pass retrospective. Surface in the exercise's Phase 2 authoring + the closing lecture's team-kit-accretion line.

## Delivery architecture guards

AE101 delivery architecture (per `memory/project_ae101_delivery_architecture.md`):

- All compounding artefacts live in your real repo. No training-dir state, no `module-N/` folders, no `prework/` style scaffolds.
- Skills ship to personal `~/.claude/skills/` first; team-PR via human conversation, not auto-promoted.
- Rules file default: `CLAUDE.local.md` (gitignored, personal). Team-worthy rules flagged for separate PR — never auto-PR'd.
- Block-1 observations land at `observations/` — gitignored-by-default (decisions in ADRs, quality criteria in skills).
- Paths in fenced prompt blocks: repo-relative, bare, no `module-N/` prefixes.

## Vocabulary discipline (AE101-wide; compound-candidate for rule)

- **LLM** when the topic is thinking — reasoning, drift, framing, non-deterministic cognitive-like behaviour.
- **Agent** when the topic is acting — files written, tools called, execution.
- **Claude** when referring to the specific product, or for version grounding (*claude-opus-4-7*), or disambiguation.

Default to the specific word. Blurring is how students end up conflating chatbot and agent — vendors do it on purpose; curriculum should not.

## Per-file contracts

| File | Line budget | Shape reference |
|---|---|---|
| `trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` | 180–250 | `learn-from-the-test.md` |
| `exercises/spot-gaps-build-the-loop.md` | 150–200 | `diagnose-and-resend.md` |
| `exercises/arc-retrospective.md` | 80–120 | bounded-activity shared-library shape |
| `lectures/the-loop-has-a-name.md` | 250–350 | `what-packaging-is.md` |
| `lectures/story-of-module-6.md` | 120–180 | (novel; first-person past memo, no precedent) |
| `reference/scheduled-agents.md` | 60–100 | AE101 reference conventions |
| `evals/instances/agentic-engineering-101--spot-gaps-build-the-loop.md` | 80–120 | `curriculum/evals/exercise.md` template |

## Source verification TODO (riding forward from M5)

Pre-first-cohort, these numbers must be verified against original sources:

- **Ramp Dojo — 350-skill marketplace.** Verify against `continuous-research/observations/ramp.md` or original Ramp post.
- **Intercom Tier 1/2/3** — 19.2% auto-approved, 14.6 min vs 75.8 min, 86% ≤20 lines, 500-person R&D. Verify against `https://ideas.fin.ai/p/2x-nine-months-later` and `continuous-research/observations/intercom.md`.

The closing lecture's maintainer block must include the same TODO shape as `what-packaging-is.md` lines 71–82.

## Alignment edits (main-thread, Phase B)

- `bosser-strategy:content-strategy-agentic-engineering-101.md` § *State of play* — add M6 to the current-shape line; note Story opener, arc-retrospective beat, simple-round Debrief are live.
- `site/curriculum.html` `MODULES` array — AE101 M6 entry: `{ slug: 'spot-gaps-build-the-loop', title: 'Spot gaps, build the loop' }` at position 6.

## "Done means"

All seven new files saved. Both alignment edits landed. Session notes populated (Subagent decisions, Loop iterations, Main-thread decisions, Escalations). Pre-dispatch commit tagged. Two-pass-clean loop stop reached. Summary report of what shipped, what deferred, what surprised — fed into the Story of Module 6 lecture.
