# Agents that build agents

The map you just drew ended on a dashed loop, yours to draw solid. This is the move that draws it. *Agents that build agents.* The flywheel, each session leaving the next one sharper: this is that line, unfolded.

## The move widens to everything you do

Two skills, two sources, same move. The first, at M3, packaged a piece of judgement you had carried for years (how to write a good test). The second, at M6, packaged a piece of judgement you had earned over two runs of the same task. Each skill made the next run cheaper.

The flywheel turns once more when you hand the agent the move itself. Not "write me a skill." Not "improve my setup." Ask it for a handoff prompt: one you paste into a fresh session later, that studies your work across your repos for the shapes you repeat, draws the ones worth packaging, and authors a skill for each. The same move you just practiced, widened to everything you do.

What comes back is a candidate. You read it the way you read any prompt the agent drafts: judgement, push-back, taste. Some of it will be obvious. Some of it will be off. One or two lines will be moves you would not have written on your own.

## The agent stops where your judgement begins

Not the agent writing its own skills without you in the room. At the start of this training, you might have hoped that was the destination. At the close of M6, you know it is not. Agents that build agents is a collaboration in the same shape every other beat in this training has been a collaboration. Claude proposes, you steer.

The agent's evidence stops at the disk. It can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint. The plan it generates is grounded in the evidence on disk; the decision about which proposals to act on is grounded in evidence the agent does not have.

Build the flywheel to run exactly that far. Let the agent run as far as it can on its own evidence, and stop at the moment your judgement is the input that matters. That is the practitioner shape. Anything further pretends the agent has access it does not have.

## The handoff prompt that builds your kit

This one closes the module. The shapes you drew and the skill you shipped are still in the session. Ask the agent to turn them into a prompt that builds the rest of the kit.

{{prompt:agents-that-build-agents-handoff}}

What comes back is a prompt, not a plan. Save it where you will find it. The kit you grow on your own is the one that counts.

## Ralph

```bash
while :; do cat PROMPT.md | claude-code; done
```

- Geoffrey Huntley saw a lever. An agent runs, drifts, needs nudging. The fix already existed in shell: one line, no scaffolding.
- He called it Ralph, after the Simpsons. Hacky, simple, powerful. Ralph re-feed entered the practitioner vocabulary as one of the named verifier shapes, for when a multi-hour task wants a stop-and-check.
- Months later, Claude Code shipped `/goal`. The runtime version of the same move: a condition, a check each turn. The shell hack is now a slash command.
- Practitioners see levers first. The lever was sitting there in plain shell. Huntley reached for it. The runtime caught up later.

That's the M6 leap. The next Ralph is yours.

## There is no last turn

- There is no last turn. Each run surfaces the next gap. Each gap proposes the next move. Each move makes the next run cheaper.
- The kit compounds; the model rotates. The kit grows, the rules sharpen, the skills accumulate, and the model underneath gets replaced every few months without changing the move.

The training closes. The flywheel does not.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** narrative closer — slides 1–2 recast from bolded-claim bullets to prose paragraphs; Ralph and closing slides keep bullets, de-bolded fully; zero bold survives in the body (the practitioner story carries itself) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, kickers, bash block, and `{{prompt:agents-that-build-agents-handoff}}` section untouched. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** prose body CONVERTED to lede + four slides + one prompt section. Opening two paragraphs → lede (one line, near-verbatim) + slide 1 bullet 1 (two-skills recognition; "Module 3/Module 6" compressed to M3/M6, legal at M6 per `check_student_facing §2b`); the one-line flywheel paragraph SUBSUMED by slide 1 bullet 2. *The move* + *What this is not* CONVERTED to slides, near-verbatim. *A prompt to try* KEPT prose-shaped — prompt chrome the flow needs; `{{prompt:agents-that-build-agents-handoff}}` untouched; "Read it the way you read any prompt the agent drafts" de-duplicated (now lives only in slide 1 bullet 3). *Ralph* CONVERTED to a slide with the bash one-liner as the slide's diagram element, kicker kept verbatim. *Where the loop ends* CONVERTED to a two-bullet closing slide + kicker; below the 3-bullet floor by design (the arc-final beat is two claims; padding would be restatement). M-refs KEPT under the `check_lectures §3` consolidation carve-out (arc-closer; two-skills recognition + graduation beat, not sequencing).

**Lede re-anchor (2026-07-03):** M6 closing sequence re-sequenced — *The map filled in* now sits between *The loop has a name* and this lecture, which is DEAD-LAST (training's final beat). Old lede opened *"The closer named the flywheel in one line"* — a back-reference to *The loop has a name* as the immediately-preceding lecture, now stale. Re-anchored to pick up from the map lecture's *"the next dashed loop is yours to draw solid"* hand-off; flywheel kept as theme (*"named a few beats back"*, not an adjacency claim). *Where the loop ends* beat unchanged. Placement block below still describes the pre-re-sequence chain — re-verify against the module file before ship.

**Quality:** compendium-audited 2026-07-08 (writing@182969a story@182969a technical@6ab470b behavior@6ab470b pedagogy@182969a strategy@182969a slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- sim-passed 2026-05-31 (three-persona sim + handoff-generator live-test @182969a): generated handoff is cold-safe — named shapes carried, on-disk `session-shaper` referenced as the worked example, repos re-studied, no placeholders. Sim-grade (constructed M6 context); a real-cohort live-test on an actual M6 close is still owed — no cohort has run it yet. Per-class instances at `curriculum/evals/instances/ae101--agents-that-build-agents.<class>.json`. Predates the slide rework.

**Lecture meta:** *5–7 min reading, closer-shaped. Lands as the very last teaching beat in Module 6, immediately after* The map filled in *(the penultimate consolidation beat). It picks up that lecture's "next dashed loop is yours to draw solid" hand-off and draws the loop solid; the flywheel was named two beats earlier in* The loop has a name *before it. Voice: Risto-leading (the optimistic-action-on-the-future register Module 6's mood arc warrants), Boris-grounding (the prompt is concrete and runnable), Martin-spare (the move + its alternative — collaboration, not autonomous-agent fantasy). Sutherland surfaces in the *what this is not* slide. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Placement:** Module 6 closer chain — Human close → The loop has a name → The map filled in → Agents that build agents (dead-last) → Next. Re-sequenced 2026-07-03 (Antti): The map filled in now sits between The loop has a name and this lecture, so this lecture picks up The map filled in's kicker *"the next dashed loop is yours to draw solid."* The loop has a name's kicker was updated in the same pass to *"The loop feeds itself. That is the flywheel, and it starts with what you encoded today."*

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the just-shipped second skill. That earning beat needs to land cleanly. Adding a flywheel-extension slide dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* slide is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

**Frameworks attributed:** Geoffrey Huntley, Ralph Loop, [practitioner direct], https://ghuntley.com/ralph/ (2025-07-14, historical foundational — outside 6-month freshness, cite as origin not current evidence). The flywheel framing builds on what Module 3 → Module 5 → Module 6 already named. Klaassen's compound-engineering move sits underneath without re-attribution (already credited in *The loop has a name*).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ghuntley.com/ralph/> — [practitioner direct] Huntley 2025-07-14, bash loop + Simpsons origin verbatim. fallback: outside freshness window — origin/historical only, body flags it correctly.

**Prompt block:** the earlier design-the-next-kit plan-mode prompt retired and replaced by `agents-that-build-agents-handoff` — the agent reads the shipped `session-shaper` and writes the student a standalone, cold-runnable prompt that builds workflow skills across their whole stack (study then diagram then author). NEW prompt — no prior version to diff against; flagged per check_prompts #22.

**Open for next pass:**
- [technical, non-blocking] Stamp the verified `/goal` capability (Claude Code 2.1.142, `/goal [condition|clear]`) into this lecture's own Source-verification block — currently evidenced only in a scratch sweep, not in-artifact.
- Real-cohort gold standard: the handoff-generator live-test that cleared pedagogy was sim-grade — constructed M6 context (six named shapes, a stand-in `session-shaper`). A live-test on an actual student's M6 close (their real shapes, their just-shipped skill) is the real-cohort bar; owed until a cohort runs.
