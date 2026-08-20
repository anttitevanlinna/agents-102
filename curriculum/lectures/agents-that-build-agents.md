# Agents that build agents

The map you just drew ended on a dashed loop, yours to draw solid. This is the move that draws it. *Agents that build agents.* The flywheel: the loop feeding itself, each session leaving the next one sharper. This lecture unfolds it.

## The move widens to everything you do

One skill and one map, same move behind both. The skill, at M3, packaged a piece of judgement you had carried for years (how to write a good test). The map, at M6, named the judgement you spend over and over without packaging it. Every packaged move makes the next session cheaper.

The flywheel turns once more when you hand the agent the move itself. Ask it for a handoff prompt: one you paste into a fresh session later, that studies your work across your repos for the shapes you repeat, draws the ones worth packaging, and authors a skill for each. The same move you practiced at M3, widened to everything you do.

What comes back is a candidate. You read it the way you read any prompt the agent drafts: judgement, push-back, taste. Some of it will be obvious. Some of it will be off. One or two lines will be moves you would not have written on your own.

## The agent stops where your judgement begins

Not the agent writing its own skills without you in the room. At the start of this training, you might have hoped that was the destination. At the close of M6, you know it is not. Agents that build agents is a collaboration in the same shape every other part of this training has been a collaboration. Claude proposes, you steer.

The agent's evidence stops at the disk. It can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint. The plan it generates is grounded in the evidence on disk; the decision about which proposals to act on is grounded in evidence the agent does not have.

Build the flywheel to run exactly that far. Let the agent run as far as it can on its own evidence, and stop at the moment your judgement is the input that matters. That is the practitioner shape. Anything further pretends the agent has access it does not have.

## The handoff prompt that builds your kit

This one closes the module. The shapes you drew are still in the session. Ask the agent to turn them into a prompt that builds the kit.

{{prompt:agents-that-build-agents-handoff}}

What comes back is a prompt, not a plan. Save it where you will find it. The kit you grow on your own is the one that counts.

## You make agentic happen

- **Act under uncertainty.** The right way moves every day; there is no time to test everything. Acting is the move from *possibly* to *I have something*.
- **Competence sets the ceiling.** Your brain needs the reps to think different. The pathways you build show you the next level.
- **Cross personal → team.** Personal mastery is nice. But it will never be enough. Share and learn together.

All three have been on the map the whole time: the small print along the bottom, there since M2.

## Ralph

```bash
while :; do cat PROMPT.md | claude-code; done
```

- Geoffrey Huntley saw a lever. An agent runs, drifts, needs nudging. The fix already existed in shell: one line, no scaffolding.
- He called it Ralph, after the Simpsons. Hacky, simple, powerful. The name stuck, and Ralph re-feed is one of the three verifier shapes on your menu, for when a multi-hour task wants a stop-and-check.
- Months later, Claude Code shipped `/goal`. The runtime version of the same move: a condition, a check each turn. The shell hack is now a slash command.
- Practitioners see levers first. The lever was sitting there in plain shell. Huntley reached for it. The runtime caught up later.

That's the M6 leap. The next Ralph is yours.

## There is no last turn

- There is no last turn. Each session surfaces the next gap. Each gap proposes the next move. Each move makes the next session cheaper.
- The kit compounds; the model rotates. The kit grows, the rules sharpen, the skills accumulate, and the model underneath gets replaced every few months without changing the move.

The training closes. The flywheel does not.

<!-- maintainer -->

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as the weakest of six lecture prompts owing the trainer-demo sweep. It is not a violation at all: *"The shapes you drew are still in the session"* and *"The kit you grow on your own is the one that counts"* both name the student's own session and kit, which is §6's tell, so the tell was already present and no body edit is owed. A trainer demo would hand the room the trainer's kit. Leave it student-run; do not re-flag.


**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** narrative closer — slides 1–2 recast from bolded-claim bullets to prose paragraphs; Ralph and closing slides keep bullets, de-bolded fully; zero bold survives in the body (the practitioner story carries itself) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, kickers, bash block, and `{{prompt:agents-that-build-agents-handoff}}` section untouched. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** prose body CONVERTED to lede + four slides + one prompt section. Opening two paragraphs → lede (one line, near-verbatim) + slide 1 bullet 1 (two-skills recognition; "Module 3/Module 6" compressed to M3/M6, legal at M6 per `check_student_facing §2b`); the one-line flywheel paragraph SUBSUMED by slide 1 bullet 2. *The move* + *What this is not* CONVERTED to slides, near-verbatim. *A prompt to try* KEPT prose-shaped — prompt chrome the flow needs; `{{prompt:agents-that-build-agents-handoff}}` untouched; "Read it the way you read any prompt the agent drafts" de-duplicated (now lives only in slide 1 bullet 3). *Ralph* CONVERTED to a slide with the bash one-liner as the slide's diagram element, kicker kept verbatim. *Where the loop ends* CONVERTED to a two-bullet closing slide + kicker; below the 3-bullet floor by design (the arc-final beat is two claims; padding would be restatement). M-refs KEPT under the `check_lectures §3` consolidation carve-out (arc-closer; two-skills recognition + graduation beat, not sequencing).

**Lede re-anchor (2026-07-03):** M6 closing sequence re-sequenced — *The map filled in* now sits between *The loop has a name* and this lecture, which is DEAD-LAST (training's final beat). Old lede opened *"The closer named the flywheel in one line"* — a back-reference to *The loop has a name* as the immediately-preceding lecture, now stale. Re-anchored to pick up from the map lecture's *"the next dashed loop is yours to draw solid"* hand-off; flywheel kept as theme (*"named a few beats back"*, not an adjacency claim). *Where the loop ends* beat unchanged. Placement block below still describes the pre-re-sequence chain — re-verify against the module file before ship.

**Quality:** compendium-audited 2026-08-19 (writing@059846ef story@059846ef technical@ffc64f9 behavior@059846ef pedagogy@059846ef strategy@1c765f2 slides@059846ef)
- judges @059846ef: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- sim-passed 2026-05-31 (three-persona sim + handoff-generator live-test @182969a): generated handoff is cold-safe — named shapes carried, on-disk `session-shaper` referenced as the worked example, repos re-studied, no placeholders. Sim-grade (constructed M6 context); a real-cohort live-test on an actual M6 close is still owed — no cohort has run it yet. Per-class instances at `curriculum/evals/instances/ae101--lecture--agents-that-build-agents.<class>.json`. Predates the slide rework.

**Lecture meta:** *6–8 min reading, closer-shaped. Lands as the very last teaching beat in Module 6, immediately after* The map filled in *(the penultimate consolidation beat). It picks up that lecture's "next dashed loop is yours to draw solid" hand-off and draws the loop solid; the flywheel was named two beats earlier in* The loop has a name *before it. Voice: Risto-leading (the optimistic-action-on-the-future register Module 6's mood arc warrants), Boris-grounding (the prompt is concrete and runnable), Martin-spare (the move + its alternative — collaboration, not autonomous-agent fantasy). Sutherland surfaces in the *what this is not* slide. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Time:** 8 minutes.

**Soil slide — *You make agentic happen* (2026-08-15, Antti-directed; buried-gold item, relocated from `the-map-filled-in.md`):** full slide between the handoff prompt and *Ralph*, the soil line's one spoken home. Antti's calls, all three: title verbatim; bullets first, provenance line after as a small aside; strip wording *act under uncertainty · competence sets the ceiling · cross personal → team* (*gate* is banned student-side, *a move counts* is scorekeeper register; design-side names + student-form pointer in `theory-plan.md` §0). Register: Godin-leading inside the Risto closer; bullet bodies are Antti's kernels, lightly shaped (2026-08-15) — *possibly* → *I have something* as the acting phase-change · reps and pathways (*think different* keeps its broken grammar, the same game the title plays) · *Share and learn together.* as the open-handed landing. Guards: (a) one bold handle per order = the law-slide pattern; (b) the slide never names Ralph — the next slide is the unspoken worked example (Huntley acted under uncertainty; the check is Ralph's stopping condition; he gave it away and the name stuck), trainer says the connection, body does not; (c) title is the engineer-side voice of *Accumulated, not enabled* (`theory-plan.md` §3) — you, not the product, make agentic happen; the system-side twin sits on `the-map-filled-in.md`'s control-loop slide; (d) the strip rides all four map figures visually — this slide is its only spoken home, do not add siblings.

**Placement:** Module 6 closer chain — Human close → The loop has a name → The map filled in → Agents that build agents (dead-last) → Next. Re-sequenced 2026-07-03 (Antti): The map filled in now sits between The loop has a name and this lecture, so this lecture picks up The map filled in's kicker *"the next dashed loop is yours to draw solid."* The loop has a name's kicker was updated in the same pass to *"The loop feeds itself. That is the flywheel, and it starts with what you encoded today."*

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the M5 verifier and the ranked check-menu. That earning beat needs to land cleanly. Adding a flywheel-extension slide dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* slide is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

<!-- backing -->

Claims
- `you-make-agentic-happen` · vision · "You make agentic happen" ← none-owed
- `possibly-to-i-have-something` · vision · "Acting is the move from *possibly* to *I have something*." ← none-owed
- `pathways-show-the-next-level` · vision · "The pathways you build show you the next level." ← none-owed
- `share-and-learn-together` · vision · "Share and learn together." ← none-owed
- `soil-on-the-map-the-whole-time` · vision · "All three have been on the map the whole time: the small print along the bottom, there since M2." ← none-owed
- `every-packaged-move-cheapens-the-next-run` · vision · "Every packaged move makes the next session cheaper." ← none-owed
- `hand-the-agent-the-move-itself` · vision · "The flywheel turns once more when you hand the agent the move itself." ← none-owed
- `what-comes-back-is-a-candidate` · vision · "What comes back is a candidate." ← none-owed
- `not-agent-writing-its-own-skills` · vision · "Not the agent writing its own skills without you in the room." ← none-owed
- `agents-evidence-stops-at-the-disk` · vision · "The agent's evidence stops at the disk." ← none-owed
- `stop-where-your-judgement-is-the-input` · vision · "stop at the moment your judgement is the input that matters" ← none-owed
- `huntley-saw-a-lever` · detail · "Geoffrey Huntley saw a lever." ← huntley-ralph
- `ralph-one-line-shell-loop` · detail · "The fix already existed in shell: one line, no scaffolding." ← huntley-ralph
- `named-after-the-simpsons` · detail · "He called it Ralph, after the Simpsons." ← huntley-ralph
- `ralph-name-stuck` · detail · "The name stuck" ← ralph-usage-beyond-huntley
- `ralph-refeed-is-on-your-menu` · vision · "Ralph re-feed is one of the three verifier shapes on your menu" ← none-owed
- `goal-shipped-later` · detail · "Months later, Claude Code shipped `/goal`. The runtime version of the same move: a condition, a check each turn." ← cc-goal-capability
- `practitioners-see-levers-first` · vision · "Practitioners see levers first." ← none-owed
- `there-is-no-last-turn` · vision · "There is no last turn. Each session surfaces the next gap." ← none-owed
- `kit-compounds-model-rotates` · vision · "The kit compounds; the model rotates." ← none-owed

Sources
- huntley-ralph `[checked:2026-05-25 result:OK due:none]` https://ghuntley.com/ralph/ — [practitioner direct] Huntley 2025-07-14: the bash loop and the Simpsons origin, both verbatim. **Durable account, `due:none`** (`source-freshness-format.md` § Durable-account variant) — an origin story published once does not expire, and the body already flags it as origin rather than current practice. The previous `due:2026-11-25` treated a historical origin claim as a currency claim; per `check_research_claims.md §2b` the date belongs on claims about the field's present, not on what a person wrote in 2025. fallback: none needed — origin/historical is exactly what the body claims.
- ralph-usage-beyond-huntley `[checked:2026-04-21 result:OK due:2026-10-21]` kb:continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md — [KB staging; primaries recorded there] three uses of the name beyond the coiner: Anthropic's official `ralph-wiggum` plugin (github.com/anthropics/claude-code, `plugins/ralph-wiggum/README.md`) [practitioner direct], paddo.dev/blog/ralph-wiggum-autonomous-loops/ [practitioner direct], and Cherny's "(c) Ralph re-feeds the prompt" via kim-on-cherny [practitioner analysis]. Backs persistence ("the name stuck"), not a census — three recorded users, nobody counted the field. fallback: cut "The name stuck," keep the coinage and the menu ownership.
- cc-goal-capability `[checked:2026-08-01 result:ATTESTED due:cohort]` https://code.claude.com/docs/en/ — [capability, maintainer-attested] `/goal [condition|clear]`, verified in a scratch sweep against Claude Code 2.1.142. **The sweep is the check and the maintainer accepted it on 2026-08-01 without a re-test**, which is what `ATTESTED` records: not that nobody looked, but that the person accountable looked and signed for it. The open-item TODO that had carried this is retired. fallback: drop the command name and keep the shape (the runtime caught up with the shell hack), which is the sentence's actual argument.

Frameworks
- Ralph loop · [borrow:none] · law:none · ← huntley-ralph — practitioner-coined, credited in body by name
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — fix → memory → skill → system is the flywheel this lecture runs one turn further
- Principal–agent · [borrow:economics] · law:principal-agent · ← cultural-vocab — "the agent stops where your judgement begins" is the delegation boundary drawn at the limit of the agent's evidence

Stance `[stance:2026-08-01 level:L1]`
- holds: that the Ralph loop is Huntley's and that it was a shell one-liner before it was a product feature. Both are first-hand and settled. The lecture's larger argument — that the flywheel stops where the agent's evidence stops — is our framing, and the body carries it as a position rather than a finding.
- contested: how far "Ralph re-feed" travels as a name. "The name stuck" is detail-layer, carried by three recorded uses beyond the coiner (ralph-usage-beyond-huntley); how far the name travels beyond those stays in OODA because it is worth knowing, not because a sentence is waiting on it.
- decided: **Ralph's name stuck; the field did not adopt a taxonomy, 2026-08-01.** The bullet claimed Ralph re-feed *"entered the practitioner vocabulary as one of the named verifier shapes"* — field-wide adoption nobody counted, plus a settled taxonomy that is actually Kim's synthesis of Cherny's habits. Now: the name stuck, which is persistence rather than a census, and it is one of three shapes on the menu **this training** gave them at M5. Huntley's coinage is verified and unaffected. Do not restore the adoption verb.
- decided: **`/goal` is stamped `ATTESTED due:cohort`, 2026-08-01.** It had been an unstamped platform claim living only in a maintainer to-do. The maintainer accepted the existing scratch-sweep verification without a re-test. The point of the migration was never the re-test; it was that the debt had been invisible to every tool that audits this corpus.
- would-move-it: evidence that the re-feed shape is called something else in general use, or that nobody outside this curriculum calls it anything. Either turns a recognition beat into a coinage, which is fine to do and not fine to do silently.

OODA
- question: does the name travel further than the three recorded uses (Anthropic plugin, paddo.dev, Cherny via Kim), and is `/goal` still the runtime primitive it is described as?
- roster: Geoffrey Huntley, Simon Willison, Armin Ronacher, the Claude Code changelog and docs, Amp Chronicle
- last-run: 2026-08-01

<!-- /backing -->

**Prompt block:** `agents-that-build-agents-handoff` — the agent reads the recurring-work shapes and the ranked primitives menu from the session and writes the student a standalone, cold-runnable prompt that builds workflow skills across their whole stack (study then diagram then author). Re-anchored 2026-08-01 (authoring-sequence cut): requires `-shapes` + `-primitives`, not a shipped skill.

**Open for next pass:**
- Real-cohort gold standard: the handoff-generator live-test that cleared pedagogy was sim-grade — constructed M6 context (six named shapes, a stand-in skill), and it predates the 2026-08-01 re-anchor (shapes + primitives, no shipped skill). A live-test on an actual student's M6 close (their real shapes, their ranked menu) is the real-cohort bar; owed until a cohort runs.
