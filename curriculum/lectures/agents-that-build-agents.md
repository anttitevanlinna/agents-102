# There is no last turn

*Agents that build agents.* The flywheel: the loop feeding itself, each session leaving the next one sharper.

## The agent stops where your judgement begins
<!--tier:2-->

- The agent cannot read your mind. It runs on what you have expressed: the spec, the rules, the checks, the plan. What is written down, it can act on. What is still in your head, it cannot.
- That is the frontier, and you set it. Not the model. What you can express is how far the agent runs. It stops exactly where the writing stops and your judgement takes over.
- Judgement becomes expression one piece at a time. A push-back becomes a rule. A "not like that" becomes a check. Each one moves the line, and the agent runs one step further on its own. The line never goes away. You keep finding the next thing you know and have not yet said.

## Quality is grounding

Nobody reviews 500K lines by hand. Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks; the first Agentics Helsinki meetup, fall 2025, had two of them. The recurring theme: every generated line had to correspond to a spec, every feature had to be tested. Without that, no way to know the system works.

The discipline has gone deeper since: **grounding**. Beyond spec-and-tests, toward human signal. Every push-back, every correction, every *"no, like this"* is signal of something: what's true, what's valuable, what works, what's broken.

The agentic engineer maxes that signal out. You ship a million lines of new stuff. How do you know it's right?

## Why the loop survives the model

- The specific Claude you used today will be replaced, probably within months. Each replacement will be better at the work than the current one. None of that changes the move.
- The three pieces (reference, plan, verifier) are not model features. They are a stance toward a thing that does not behave deterministically.
- Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

## You make agentic happen
<!--tier:2-->

- **Act under uncertainty.** The right way moves every day; there is no time to test everything. Acting is the move from *possibly* to *I have something*.
- **Competence sets the ceiling.** Your brain needs the reps to think different. The pathways you build show you the next level.
- **Cross personal → team.** Personal mastery is nice. But it will never be enough. Share and learn together.

## There is no last turn

- There is no last turn. Each session surfaces the next gap. Each gap proposes the next move. Each move makes the next session cheaper.
- The kit compounds; the model rotates.

The training closes. The flywheel does not.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** what-this-is-not slide — hoped-destination pair merged to one sentence, "in the same shape every other part of this training has been a collaboration" tightened; cut "That is the practitioner shape." (§16a); Ralph moral bullet trimmed to "Practitioners see levers first." — its trailing three sentences restated bullets 1 and 3. Soil slide, handoff section, and the two-bullet closer untouched per their contracts. Do not restore.


**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** narrative closer — slides 1–2 recast from bolded-claim bullets to prose paragraphs; Ralph and closing slides keep bullets, de-bolded fully; zero bold survives in the body (the practitioner story carries itself) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, kickers, bash block, and `{{prompt:agents-that-build-agents-handoff}}` section untouched. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** prose body CONVERTED to lede + four slides + one prompt section. Opening two paragraphs → lede (one line, near-verbatim) + slide 1 bullet 1 (two-skills recognition; "Module 3/Module 6" compressed to M3/M6, legal at M6 per `check_student_facing §2` (clause b)); the one-line flywheel paragraph SUBSUMED by slide 1 bullet 2. *The move* + *What this is not* CONVERTED to slides, near-verbatim. *A prompt to try* KEPT prose-shaped — prompt chrome the flow needs; `{{prompt:agents-that-build-agents-handoff}}` untouched; "Read it the way you read any prompt the agent drafts" de-duplicated (now lives only in slide 1 bullet 3). *Ralph* CONVERTED to a slide with the bash one-liner as the slide's diagram element, kicker kept verbatim. *Where the loop ends* CONVERTED to a two-bullet closing slide + kicker; below the 3-bullet floor by design (the arc-final beat is two claims; padding would be restatement). M-refs KEPT under the `check_lectures §3` consolidation carve-out (arc-closer; two-skills recognition + graduation beat, not sequencing).

**Placement:** M6 deck order (2026-09-02, three-beat re-cut, slides moved and re-tiered, body text untouched pending cards): the-2-frontiers → exercise `spot-gaps-build-the-loop` (diff + rule cut) → composing-the-workflow (control loop, Eval, cadence, skills, the Dino / Pocock examples, the filled-in map figure) → exercise `read-your-stack` → the-handoff-prompt (titled *Agents that build agents*) → story-of-module-6 → Human close → agents-that-build-agents (titled *There is no last turn*, last). The lede still tees the handoff, which now lives in `the-handoff-prompt.md`; that paragraph awaits a card. The file carries *Why the loop survives the model* (from `the-loop-has-a-name.md`) as its first slide.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@059846ef pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
- sim-passed 2026-05-31 (three-persona sim + handoff-generator live-test @182969a): generated handoff is cold-safe — named shapes carried, on-disk `session-shaper` referenced as the worked example, repos re-studied, no placeholders. Sim-grade (constructed M6 context); a real-cohort live-test on an actual M6 close is still owed — no cohort has run it yet. Per-class instances at `curriculum/evals/instances/ae101--lecture--agents-that-build-agents.<class>.json`. Predates the slide rework.

**Lecture meta:** *Closer-shaped, the module's last teaching beat. Voice: Risto-leading, Boris-grounding, Martin-spare. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Time:** 6 minutes.

**Soil slide — *You make agentic happen* (2026-08-15, Antti-directed; buried-gold item, relocated from `the-map-filled-in.md`):** full slide between the handoff prompt and *Ralph*, the soil line's one spoken home. Antti's calls, all three: title verbatim; bullets only (the provenance line *the small print along the bottom, there since M2* was cut 2026-09-02, Antti); strip wording *act under uncertainty · competence sets the ceiling · cross personal → team* (*gate* is banned student-side, *a move counts* is scorekeeper register; design-side names + student-form pointer in `theory-plan.md` §0). Register: Godin-leading inside the Risto closer; bullet bodies are Antti's kernels, lightly shaped (2026-08-15) — *possibly* → *I have something* as the acting phase-change · reps and pathways (*think different* keeps its broken grammar, the same game the title plays) · *Share and learn together.* as the open-handed landing. Guards: (a) one bold handle per order = the law-slide pattern; (b) the slide names no worked example (Ralph, its former neighbour, was cut 2026-09-02); (c) title is the engineer-side voice of *Accumulated, not enabled* (`theory-plan.md` §3) — you, not the product, make agentic happen; the system-side twin sits on `composing-the-workflow.md`'s control-loop slide; (d) the strip rides all four map figures visually — this slide is its only spoken home, do not add siblings.

**Kicker pairing:** the survives-the-model kicker *"The loop feeds itself. That is the flywheel."* and the closing *"The training closes. The flywheel does not."* now sit in one file; keep them in step.

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the M5 verifier and the ranked check-menu. That earning beat needs to land cleanly. Adding a flywheel-extension slide dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* slide is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

**Cross-file stamp pointer:** the survives-the-model slide's triad claim leans on the source stamps in `curriculum/lectures/what-packaging-is.md` § Source verification. Those stamps were re-verified 2026-08-01 and **the convergence framing this slide inherited does not survive them.** Counted strictly — all three pieces present together as artefacts in one practice — the independents number **one** (Huntley's Ralph), against an L3 bar of 10–20. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec, not a document mutated across a run, so it is a different piece wearing the same word. The triad is our synthesis of scattered practice, which is candid work to do and misleading to call convergence. The slide reads *"The three pieces (reference, plan, verifier) are not model features"* — a convergence assertion does no work in a sentence whose argument is that the pieces are a stance rather than a model feature. M5's `what-packaging-is` introduces the triad as our combination, so this file must not assert convergence downstream of it. **Do not restore the phrase.**

**`## Ralph` cut whole (Antti 2026-09-02).** Huntley's loop, the coinage, `/goal`, *practitioners see levers first*, and the *next Ralph is yours* kicker: in git at `7d13d15e`. The Ralph re-feed shape stays taught where M5's verifier menu names it. Do not restore here.

**`## The agent stops where your judgement begins` — body cut whole, header kept; moved here from the handoff lecture as the first slide (Antti 2026-09-02) (Antti 2026-09-02: *"This concept is right. But just wrongly written now."*).** The delegation-boundary beat is owed a rewrite; the old three paragraphs (not-the-agent-writing-its-own-skills / evidence-stops-at-the-disk / build-the-flywheel-to-run-exactly-that-far) are in git at `109ca335`. Do not restore them; write the beat fresh, carded.

**`## Quality is grounding` moved in from `quality-is-grounding.md` (Antti 2026-09-02; header his, body verbatim from *From spec-and-tests to grounding*), that file removed.** Sits after the judgement-boundary header and before *Why the loop survives the model* — position is my placement, not Antti's call. Its claims, the two Helsinki stamps and the grounding framework line travelled; the Horthy stamp and the decay framework stayed with the cut decay slide.

<!-- backing -->

Claims
- `agent-cannot-read-your-mind` · vision · "The agent cannot read your mind." ← none-owed
- `expression-sets-the-frontier` · vision · "What you can express is how far the agent runs." ← none-owed
- `nobody-reviews-500k-by-hand` · vision · "Nobody reviews 500K lines by hand." ← none-owed
- `500k-lines-in-weeks` · detail · "Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks" ← antti-agentics-helsinki, luma-agentics-helsinki
- `spec-and-tests-was-the-theme` · detail · "every generated line had to correspond to a spec, every feature had to be tested" ← antti-agentics-helsinki
- `grounding-goes-deeper` · vision · "The discipline has gone deeper since: **grounding**." ← none-owed
- `human-signal-is-the-grounding` · vision · "Every push-back, every correction, every *\"no, like this\"* is signal of something" ← none-owed
- `million-line-close` · vision · "You ship a million lines of new stuff. How do you know it's right?" ← none-owed
- `model-will-be-replaced` · vision · "The specific Claude you used today will be replaced, probably within months." ← none-owed
- `three-pieces-are-not-model-features` · vision · "The three pieces (reference, plan, verifier) are not model features." ← none-owed
- `fluency-lives-in-the-stance` · vision · "Practitioner fluency lives in the stance, not in the tooling." ← none-owed
- `method-does-not-get-faster` · vision · "The work gets faster. The method does not." ← none-owed
- `you-make-agentic-happen` · vision · "You make agentic happen" ← none-owed
- `possibly-to-i-have-something` · vision · "Acting is the move from *possibly* to *I have something*." ← none-owed
- `pathways-show-the-next-level` · vision · "The pathways you build show you the next level." ← none-owed
- `share-and-learn-together` · vision · "Share and learn together." ← none-owed
- `there-is-no-last-turn` · vision · "There is no last turn. Each session surfaces the next gap." ← none-owed
- `kit-compounds-model-rotates` · vision · "The kit compounds; the model rotates." ← none-owed

Sources
- antti-agentics-helsinki `[checked:2026-08-03 result:ATTESTED due:none]` attested:Antti 2025-09-02 Agentics-Helsinki-meetup, count re-attested Antti 2026-08-03 — [maintainer-attested] two single-dev ~500K-lines-in-weeks demos at the first Agentics Helsinki meetup; spec-and-tests was the recurring discipline. The maintainer was in the room — primary evidence, the best rung on the ladder. The number stands on his word: no public URL required and none owed (`check_research_claims.md §1`, maintainer-attested carve-out). A "hundreds of thousands" phrasing is a style option, not a sourcing fix. Correct the body figure only if his own recall was off, never to chase a citation.
- luma-agentics-helsinki `[checked:2026-05-25 result:OK due:none]` https://luma.com/bjg7smsc — [practitioner direct] first Agentics Helsinki meetup, 2 Sep 2025 at Sitra. Event verified live. Body uses month-band phrasing ("fall 2025") on purpose, matching the recall mood. Dated-historical: the body frames it as "the early agentic engineering demos", allowed under `check_research_claims.md §2` — do NOT auto-flag freshness.

Frameworks
- Grounding as the deeper quality move · [borrow:none] · law:none · ← none — curriculum framing, no single-practitioner attribution; the phrase *"grounding to truth"* is Antti's, and push-back-as-signal traces to recurring theme #5 in the AE101 strategy doc (the agent is trying, hard, to capture your world)
- Principal–agent · [borrow:economics] · law:principal-agent · ← cultural-vocab — the slide header *The agent stops where your judgement begins* names the delegation boundary; body owed
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — fix → memory → skill → system is the flywheel this lecture runs one turn further

Stance `[stance:2026-08-01 level:L1]`
- holds: that the flywheel stops where the agent's evidence stops, and that the kit outlives the model. Our framing, carried as a position; the lecture now makes no claim about the field.
- contested: nothing external.
- decided: **the million-line close carries no stamp and should not.** *"you ship a million lines of new stuff"* is a rhetorical figure rather than a claim — the setup for a question, not a report of anything — so no source is owed and the grade is `vision`. The 500K opener carries the only real number. Do not add a `[convergent]` stamp as a fix.
- would-move-it: nothing about the field.

OODA
- question: none standing.
- roster: none.
- last-run: 2026-08-01

<!-- /backing -->
