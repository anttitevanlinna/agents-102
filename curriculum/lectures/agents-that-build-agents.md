# There is no last turn

The map you just drew ended on a dashed loop, yours to draw solid. This is the move that draws it. *Agents that build agents.* The flywheel: the loop feeding itself, each session leaving the next one sharper. This lecture unfolds it.

## Why the loop survives the model

- The specific Claude you used today will be replaced, probably within months. Each replacement will be better at the work than the current one. None of that changes the move.
- The three pieces (reference, plan, verifier) are not model features. Neither is the encode loop you ran at M6 (diff, name the gaps, map where the lesson lands). They are a stance toward a thing that does not behave deterministically. Reference because the goal drifts. Plan because the window fills. Verifier because plausible-but-wrong is the default failure mode of a statistical machine. Encode because a lesson learned once and not written down gets learned again next week.
- Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

The loop feeds itself. That is the flywheel, and it starts with what you encoded today.

## You make agentic happen
<!--tier:2-->

- **Act under uncertainty.** The right way moves every day; there is no time to test everything. Acting is the move from *possibly* to *I have something*.
- **Competence sets the ceiling.** Your brain needs the reps to think different. The pathways you build show you the next level.
- **Cross personal → team.** Personal mastery is nice. But it will never be enough. Share and learn together.

These have been on the map the whole time: the small print along the bottom, there since M2.

## Ralph
<!--tier:3-->

```bash
while :; do cat PROMPT.md | claude-code; done
```

- Geoffrey Huntley saw a lever. An agent runs, drifts, needs nudging. The fix already existed in shell: one line, no scaffolding.
- He called it Ralph, after the Simpsons. Hacky, simple, powerful. The name stuck, and Ralph re-feed is one of the three verifier shapes on your menu, for when a multi-hour task wants a stop-and-check.
- Months later, Claude Code shipped `/goal`. The runtime version of the same move: a condition, a check each turn. The shell hack is now a slash command.
- Practitioners see levers first.

That's the M6 leap. The next Ralph is yours.

## There is no last turn

- There is no last turn. Each session surfaces the next gap. Each gap proposes the next move. Each move makes the next session cheaper.
- The kit compounds; the model rotates. The kit grows, the rules sharpen, the skills accumulate, and the model underneath gets replaced every few months without changing the move.

The training closes. The flywheel does not.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** what-this-is-not slide — hoped-destination pair merged to one sentence, "in the same shape every other part of this training has been a collaboration" tightened; cut "That is the practitioner shape." (§16a); Ralph moral bullet trimmed to "Practitioners see levers first." — its trailing three sentences restated bullets 1 and 3. Soil slide, handoff section, and the two-bullet closer untouched per their contracts. Do not restore.


**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** narrative closer — slides 1–2 recast from bolded-claim bullets to prose paragraphs; Ralph and closing slides keep bullets, de-bolded fully; zero bold survives in the body (the practitioner story carries itself) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, kickers, bash block, and `{{prompt:agents-that-build-agents-handoff}}` section untouched. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** prose body CONVERTED to lede + four slides + one prompt section. Opening two paragraphs → lede (one line, near-verbatim) + slide 1 bullet 1 (two-skills recognition; "Module 3/Module 6" compressed to M3/M6, legal at M6 per `check_student_facing §2` (clause b)); the one-line flywheel paragraph SUBSUMED by slide 1 bullet 2. *The move* + *What this is not* CONVERTED to slides, near-verbatim. *A prompt to try* KEPT prose-shaped — prompt chrome the flow needs; `{{prompt:agents-that-build-agents-handoff}}` untouched; "Read it the way you read any prompt the agent drafts" de-duplicated (now lives only in slide 1 bullet 3). *Ralph* CONVERTED to a slide with the bash one-liner as the slide's diagram element, kicker kept verbatim. *Where the loop ends* CONVERTED to a two-bullet closing slide + kicker; below the 3-bullet floor by design (the arc-final beat is two claims; padding would be restatement). M-refs KEPT under the `check_lectures §3` consolidation carve-out (arc-closer; two-skills recognition + graduation beat, not sequencing).

**Placement:** M6 deck order (2026-09-02, three-beat re-cut, slides moved and re-tiered, body text untouched pending cards): the-2-frontiers → exercise `spot-gaps-build-the-loop` (diff + rule cut) → the-loop-has-a-name → `## The loop you drew` → composing-the-workflow (opens on the control-loop slide) → exercise `read-your-stack` → the-handoff-prompt (titled *Agents that build agents*) → story-of-module-6 → the-map-filled-in → quality-is-grounding → Human close → agents-that-build-agents (titled *There is no last turn*, last). The lede still tees the handoff, which now lives in `the-handoff-prompt.md`; that paragraph awaits a card. The file carries *Why the loop survives the model* (from `the-loop-has-a-name.md`) as its first slide.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@059846ef pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
- sim-passed 2026-05-31 (three-persona sim + handoff-generator live-test @182969a): generated handoff is cold-safe — named shapes carried, on-disk `session-shaper` referenced as the worked example, repos re-studied, no placeholders. Sim-grade (constructed M6 context); a real-cohort live-test on an actual M6 close is still owed — no cohort has run it yet. Per-class instances at `curriculum/evals/instances/ae101--lecture--agents-that-build-agents.<class>.json`. Predates the slide rework.

**Lecture meta:** *Closer-shaped, the module's last teaching beat. Voice: Risto-leading, Boris-grounding, Martin-spare. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Time:** 6 minutes.

**Soil slide — *You make agentic happen* (2026-08-15, Antti-directed; buried-gold item, relocated from `the-map-filled-in.md`):** full slide between the handoff prompt and *Ralph*, the soil line's one spoken home. Antti's calls, all three: title verbatim; bullets first, provenance line after as a small aside; strip wording *act under uncertainty · competence sets the ceiling · cross personal → team* (*gate* is banned student-side, *a move counts* is scorekeeper register; design-side names + student-form pointer in `theory-plan.md` §0). Register: Godin-leading inside the Risto closer; bullet bodies are Antti's kernels, lightly shaped (2026-08-15) — *possibly* → *I have something* as the acting phase-change · reps and pathways (*think different* keeps its broken grammar, the same game the title plays) · *Share and learn together.* as the open-handed landing. Guards: (a) one bold handle per order = the law-slide pattern; (b) the slide never names Ralph — the next slide is the unspoken worked example (Huntley acted under uncertainty; the check is Ralph's stopping condition; he gave it away and the name stuck), trainer says the connection, body does not; (c) title is the engineer-side voice of *Accumulated, not enabled* (`theory-plan.md` §3) — you, not the product, make agentic happen; the system-side twin sits on `the-map-filled-in.md`'s control-loop slide; (d) the strip rides all four map figures visually — this slide is its only spoken home, do not add siblings.

**Kicker pairing:** the survives-the-model kicker *"The loop feeds itself…"* and the closing *"The training closes. The flywheel does not."* now sit in one file; keep them in step.

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the M5 verifier and the ranked check-menu. That earning beat needs to land cleanly. Adding a flywheel-extension slide dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* slide is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

**Cross-file stamp pointer:** the survives-the-model slide's triad claim leans on the source stamps in `curriculum/lectures/what-packaging-is.md` § Source verification. Those stamps were re-verified 2026-08-01 and **the convergence framing this slide inherited does not survive them.** Counted strictly — all three pieces present together as artefacts in one practice — the independents number **one** (Huntley's Ralph), against an L3 bar of 10–20. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec, not a document mutated across a run, so it is a different piece wearing the same word. The triad is our synthesis of scattered practice, which is candid work to do and misleading to call convergence. The slide reads *"The three pieces (reference, plan, verifier) are not model features"* — a convergence assertion does no work in a sentence whose argument is that the pieces are a stance rather than a model feature. M5's `what-packaging-is` introduces the triad as our combination, so this file must not assert convergence downstream of it. **Do not restore the phrase.**

<!-- backing -->

Claims
- `model-will-be-replaced` · vision · "The specific Claude you used today will be replaced, probably within months." ← none-owed
- `three-pieces-are-not-model-features` · vision · "The three pieces (reference, plan, verifier) are not model features." ← none-owed
- `fluency-lives-in-the-stance` · vision · "Practitioner fluency lives in the stance, not in the tooling." ← none-owed
- `method-does-not-get-faster` · vision · "The work gets faster. The method does not." ← none-owed
- `you-make-agentic-happen` · vision · "You make agentic happen" ← none-owed
- `possibly-to-i-have-something` · vision · "Acting is the move from *possibly* to *I have something*." ← none-owed
- `pathways-show-the-next-level` · vision · "The pathways you build show you the next level." ← none-owed
- `share-and-learn-together` · vision · "Share and learn together." ← none-owed
- `soil-on-the-map-the-whole-time` · vision · "These have been on the map the whole time: the small print along the bottom, there since M2." ← none-owed
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
- cc-goal-capability `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/ — [capability] `/goal [condition|clear]`, reproduced in a scratch sweep against Claude Code 2.1.142, maintainer-accepted 2026-08-01. A URL-carrying capability check records `OK` — `ATTESTED` is the no-URL `attested:` variant for first-hand observation, and a reproduced behaviour is what `OK` means on a capability stamp. fallback: drop the command name and keep the shape (the runtime caught up with the shell hack), which is the sentence's actual argument.

Frameworks
- Ralph loop · [borrow:none] · law:none · ← huntley-ralph — practitioner-coined, credited in body by name
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — fix → memory → skill → system is the flywheel this lecture runs one turn further

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
