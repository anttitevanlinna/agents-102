# Taste notes

Append-only stream of editorial calls made on real curriculum text. **Newest at the top.**

**What this is.** The judgement behind the cuts, kept where the reasoning survives the sentence. A rule in `check_writing.md` fires at generation time and a judge can score it. Most taste cannot be scored — it lives in the counterweights, the exceptions, the times the obvious cut was wrong. That is what this file is for.

**What belongs here**

- A call Antti made on a specific sentence, with the sentence.
- A **counterweight**: a defensible cut he refused, and why the redundancy earned its keep. These matter more than the cuts; a rule without its exceptions gets applied by an agent that has never met the room.
- A survivor worth imitating, quoted whole.
- A rewrite that failed, with what was wrong with it. Failed attempts are cheap here and expensive in a lecture.

**What does not belong here**

- Anything already firing as a numbered rule. Note the rule number instead and move on.
- Session narration, timings, commit SHAs. Git has those.
- A cut nobody argued about. If it was obvious, it teaches nothing.

**How this relates to the compendiums.** This file is upstream of them, not a replacement. An entry that recurs and can be stated as a firing rule gets promoted through `/compound` into the matching `check_*.md`; the entry stays here with a pointer, because the compendium keeps the rule and this file keeps the reason. An entry that resists promotion is not a failure — the un-promotable ones are the reason the file exists.

**Appended at wind-down** (`.claude/skills/wind-down/SKILL.md` Step 3b). Zero entries is a normal session.

---

## 2026-09-02 — the board-clearing bar: what two days of rulings drew

Fifteen-odd proposals crossed the desk in the 2026-09-01/02 decision session; one added sentence survived. The verbs tell the story: *"already done enough"* (demo-shift and the −20% cull, both killed whole and their sections deleted) · *"not at this time"* (room-variance beat, M2 cold-start ask) · *"none + close"* (load-shed lines and per-exercise floors — declined even though both traced directly to Antti's own overwhelm decomposition, which is the sharpest datum here: **tracing to the maintainer's own diagnosis does not make an addition wanted; shipped state wins unless the new text carries something no existing surface does**) · and on the M4→M5 reading-list lede, *"nah. You can make a watch item about the excessive pre-reads. They are in right order. And no: people are not expected to read those while the run is ongoing. 2d version is having lunch."* — the diagnosed fix died because its premise (reading during the run) was wrong, and the real concern became a watch, not a rewrite. Counterweight worth keeping: the position-rail idea was killed with *"It will cause also distraction. Unless you think I'm wrong."* — the invitation to push back was genuine, and agreeing was the right answer, but the invitation is part of the bar, not a formality.

## 2026-09-02 — the rate bullet: the one added sentence, and where its nine words came from

The survivor, approved as a card and shipped to `the-map-filled-in`'s closing slide: *"The frontier keeps moving; your advantage is the rate at which you test, judge, and encode what works here. Recipes churn. The physics underneath does not: context fills, sessions end, what is written down survives."* It earned its slot by paying two banked design items at once (the M6 rate echo and the churn-vs-physics floor) with every noun already arc-earned. It landed nine words over the 210-word slide cap, and the cut came from the *adjacent* bullet's now-redundant coda ("Compounding, read from the frontier…"), not from shrinking the approved sentence — when a new line forces a trim, dedupe the neighbour it made redundant before touching the wording the maintainer approved.

## 2026-09-02 — two header "fixes" refused: the originals were better

Both jargon-header cards declined. `## Check how full the window is` stays over the proposed `## Check how full the **context** window is` ("original is better") — the slide's first bullet supplies the full term one beat later, and the short header reads at projection distance. And `## Read the shapes` stays over `## Read the shapes **Claude proposes**` with an explicit veto on the wording: "let's not say 'Claude proposes'". A header names the student's move; making Claude the subject of a header hands the beat to the tool. Counterweight to §2 earn-every-term zeal: a header may run ahead of its own slide's first bullet — that is the header-names, body-earns pattern, not a leak.

## 2026-08-30 — the 42-card deck, and what the verdicts drew

**Every rule-valid addition died; every cut and swap landed.** Six additions reached cards, each one a sentence a compendium rule genuinely demanded (lead-ins per `check_prompts` §2/§2a, a done-done ask). Verdicts: *"nope. again valid but longer"*, *"nothing to be added to student facing"*, *"Nope. Maybe needs rule change. this prompt is for the trainer. No action verb needed before."* The pattern is not that the rules were wrong about the gap — it is that when a rule demands a sentence the body doesn't want, the fix is a carve-out that removes the obligation, not the sentence. Two rules were born that way in one sitting (`check_prompts` 2b: trainer-screen fences owe no lead-in; 2c: a command-verb `##` header IS the lead-in). Rule-shaped half lives in `feedback_curriculum_default_move_is_cut.md`; what belongs here is the asymmetry itself: on this corpus, a validity argument for an addition carries almost no weight, and an addition card should arrive already wearing its alternative carve-out.

**The counterweight that proves it isn't dogma.** One addition survived the same deck: an in-fence output-suppressor on `claude-code-for-engineers.md` (*"No preamble. Open with the transcript path you picked, then the numbered answers."*). Reference page, and the sentence changes what the agent does rather than what the student reads. Additions that configure behaviour live; additions that explain survive nowhere.

## 2026-08-30 — M5 over budget: he cut inside the exercise, not around it

**The recommendation was a transitions diet (Debrief 12→7, Connections 5→3, metadata-only, reversible). Antti took neither and asked for the exercise itemized per prompt first** — then capped the grill phase at 10 (*"similar to M2"*), taking the whole 7-minute overage out of the elastic Q&A inside `diagnose-and-resend` Phase 4. The taste worth keeping: the 12-minute Debrief looked like fat on the schedule (it runs before the packaged session has even returned), but room air after the training's longest exercise outranks schedule elegance — while a grill has a corpus precedent (M2's closer runs 10), a good-enough threshold already in body, and an agent that recommends answers for whatever goes unanswered. **When a module is over budget, look for the beat with a natural stopping contract before touching the beats that buy the room air.** The cap arrived with its own move-on device (a `> **Timebox check.**` blockquote ported from M2), because a cap without a named exit is just a schedule lying about itself.

## 2026-08-30 — "you leave holding" — the recast that kept the smell

**A placement move forces seam recasts, and the failed one is instructive.** When `story-of-module-6` moved after the exercise, its closer line *"The next hour you will diagnose gaps… and leave holding the prompt that builds your kit"* got a tense-fix: *"You have just diagnosed… **You leave holding the prompt that builds your kit.**"* Antti: *"'you leave' is a smell. probably better way to say this."* The smell was never the tense — the sentence narrates the module's own schedule (`check_student_facing` §33 cartography), and re-tensing preserved it perfectly. Cut was the fix; the closer chain delivers the prompt itself two slides later. **After a placement move, a forward-promise sentence dies rather than gets re-tensed** — the promise was only ever load-bearing from the old seat.

**The placement call itself reversed a stated principle.** The memo had opened M6 on the grounds that *permission works before the work*. Moved after the exercise, it reads better: the room has just struggled, the debrief has just aired it, and the permission lands on evidence the student now owns. A principle that sounded structural turned out to be a preference about sequencing — and *theory is skippable, and skipping is easiest once the work is done* beat it.

## 2026-08-30 — `story-of-module-6`, the overlap cut

**"Remove overlap. Keep what is genuine" is not "halve it," and the difference was the whole call.** The proposal on the table was to cut the nine-minute M6 opener to five by dropping beats. Antti redirected to overlap-removal, which yielded ~85 words, not 500. Seven catalogue paragraphs looked like one repeated mechanism and were six distinct ones wearing the same sentence-shape: the agent not applying its own teaching, a rule in context not being a rule in the output, a confident wrong recommendation, a premature "done", four LLMs blind to a contradiction one fresh reader caught, and attribution drift. Only two entries closed on the *same* formula — *"The rule was loaded. The check never ran."* — and only one of those was removable, because the other is where the three sentences § *The generalisation* delivers get their provenance. **Test that separates them: same mechanism, or same shape?** Five paragraphs opening with a noun phrase and a full stop read as anaphora long before they read as repetition.

**A counterweight, and the reason it holds.** *"The model is good. It is still not 100% deterministic."* sits eight lines after *"The LLM is not a deterministic machine"* and reads as one refrain too many; a prior sweep escalated it to the maintainer rather than ruling. It stays. Its job is not restatement — it inoculates against the objection a 2026 room actually brings, which is *you just used a bad model, the next one fixes this*. A line that answers an unspoken objection looks like redundancy on the page and does load-bearing work in the room. Cutting on page-evidence alone would have removed it.

**"I ran the M6 prompts."** Antti's swap for *"I ran the M6 exercise."* Not a rule fix — an eval judge had claimed *exercise* was banned and was refuted, decisively and in the opposite direction. The word was sanctioned; he changed it anyway because the prompts are what was actually re-run against the generation. Worth recording *why* it changed, because a body edit landing next to a refuted finding otherwise reads as the refutation being overturned, and would put a registry-endorsed word back on trial across ~100 other instances.

**A superlative the corpus had been carrying for months.** *"A rule in context is not a rule in the output. Taste closes the gap. Nothing else does."* — the last sentence cut. The lecture disproves it four times before reaching it: a grep pass caught the banned-word leaks, a verifier loop caught two more, a persona sim caught what the loop missed, and the next section moves the rules into skills that block "done". It survived every prior pass because it is graded `vision · ← none-owed` in the backing block, and the review apparatus points at cited claims. **The most quotable line in a lecture is usually the least audited one.** Fix was the cut, never a hedge; *"Taste closes the gap"* was already carrying the beat, propped up by a falsehood it never needed.

## 2026-08-30 — eval run of 15, and one correction about how a call gets put

**"show me as edit card... or this is about rules?"** Antti, on being handed three paragraphs of analysis about `check_strategy_tie_in.md §7`. He did not need the reasoning; he needed to know which of two things he was being asked for — a curriculum edit (his call, card-shaped) or a rules edit (mine, applies directly). I had buried that distinction under the argument for it.

This is the 2026-08-29 *"when asked to show, show"* entry recurring with the polarity flipped. There it was analysis appended to a request to look at something. Here it was analysis offered *instead of* the artefact, on a question where the repo already has a format that makes the decision legible. **Lead with the shape of the decision, then the reasoning. BEFORE/AFTER first even when the surface is not card-gated** — the format is a courtesy to the reader, not only a gate on the author.

**Counterweight, and it is the one worth keeping: a numeral in a header can be load-bearing.** `## Five things a good plan has` — the maintainer note beside it had drifted into arguing the count should go, three expansions having each cost a header edit. Antti: *"Five is right in this case as that helps memorize the list."* The count is a retention device, and a student carries it away from the slide. Already sanctioned by `check_writing.md §20`'s header carve-out, which names this exact header — so the failure was mine, not the rule's: I cited §20 against the header without opening §20. **Verify the rule you are citing, not only the text you are citing it against.**

---

## 2026-08-29 — orchestrated cut sweep, shared lecture library

19 lectures swept by five read-only subagents carrying this file's counterweights. Report: `curriculum/evals/cut-sweep.ae101.md`.

**The lead-in test.** A sentence before a `{{prompt:}}` block can do two different jobs, and only one of them is cuttable. **Does it tell you to run the prompt, or tell you what the prompt says?** The first is a speech act aimed at the human, which the prompt cannot perform because the prompt addresses the machine. The second is the prompt's own text, repeated to the only reader who acts on it. Keep the verb, drop the preview.

`compounding.md` did both at once: *"Ask Claude to spot the still-generic pages in the memory you built and propose what would sharpen each"* — *"Ask Claude to"* is the speech act, everything after *"to"* is the preview. Antti's instruction was *"cut it to the core of the action"*; it became **"Spot what's still generic and sharpen it."** Twenty-one words to seven, and it reads better aloud, which is what matters for a line a trainer says at the paste moment.

This is the instrument that was missing on the hooks slide earlier the same day. *"Does it restate the adjacent artifact"* (§27b) flags both halves and cannot tell them apart, which is how a proposed cut would have left that prompt unmotivated. The verb-versus-preview split separates them.

**The counterweights did work in the machine.** Agents declined roughly twenty defensible cuts, citing this file and the maintainer blocks — the `why-mostly-right-fails` opener under the opener-repetition counterweight, the eval naming beat under no-understudy. A sweep run the day before would have returned the four cuts Antti had already refused. **Corollary: a rule shipped to subagents without its exceptions returns the maintainer's own rejected work.**

**Scope before dispatch.** Two swept files turned out to belong to agents-101, not AE101, because the file list came from a grep rather than a verified ownership check. §27 still applied, but the tool-explainer class rests on *"this audience uses Claude Code daily"*, which is false for builder leaders. **An audience-dependent rule needs the audience verified before the sweep, not after.**

---

## 2026-08-29 — AE101 compaction pass, M1 through M6

Roughly thirty sentences cut, two slides, across all six modules. Landed as `check_writing.md` §27 (say it once, at its most concrete, plus at most one generalising sentence) and `compounded/2026-08-29-writing-say-it-once-at-its-most-concrete.md`.

**The finding under all of it:** not one cut was a missing idea. Every one was a sentence explaining the sentence beside it, the prompt below it, or the header above it. The corpus was not over-taught. It was over-narrated, which is what happens when a writer believes something and then cannot quite trust the reader to have got it.

### Calls

**Don't teach the tool to people who use the tool.** Antti, verbatim: *"let's not assume students have never used plan mode before. They have. M2 just does it better."* This reclassified three sentences that read as fine prose: the Shift+Tab keystroke, *"nothing edits your source until you approve"*, and *"the other two options approve and leave plan mode."* All three explained a tool the room opens daily. Not covered by §27 — it is an audience call, not a redundancy one, and it is the sharpest single reframe of the pass.

Corollary found while cutting: the non-obvious half was in the maintainer block the whole time. Since v2.1.218 approved shell commands run during planning, so plan mode protects the source tree and not all state. The body taught the known half; the surprising half sat in a stamp no student reads.

**Accuracy outranks brevity, and a redundancy can be hiding an error.** *"Plan mode explores the codebase and drafts the steps"* — Antti flagged *drafts the steps* as misrepresentation while I had it filed as padding. A plan is a set of decisions; the lecture two files over spends a slide arguing exactly that. The exercise was teaching the misconception the lecture then had to undo. **Read a redundancy for truth before cutting it for length.**

**Hedges are not precision.** Cut on sight: *or rule*, *or context-dependent*, *where the LLM weighs it*, *in a way*. They read as care at the keyboard and as throat-clearing at projection distance. Sibling of `check_writing.md` §9 (hedging-as-reassurance); this is hedging-as-completeness, and it is the one that feels like rigour.

**A body next to an artifact says only what the artifact does not.** The hooks slide told the room to cross-reference against their own repo when the prompt printed directly below already instructed exactly that. Now §27(b). Firing moment: writing prose beside any prompt block, header, or figure — read the element first.

### Counterweights

**Repetition earns its keep in an opener.** Antti: *"M1 openers are quite tough and a bit of repetition is good."* Slide 3 of `painting-the-picture-with-the-llm` asks each frontier question twice, bare then loaded, and both survive. Same call on `the-whole-map`'s *"The phases are places, not a pipeline. A real task sits in several at once"* — a room that has just met a six-box diagram will read it as a pipeline unless told twice.

**Permission is content.** Kept against my proposal: *"You are testing, and you are learning"* and *"You don't need to get it right first time."* The pattern is consistent — Antti protects the psychological setup and cuts the informational padding. Asking a room to ship a run they expect to fail costs something, and buying that cheaply is not padding.

**Some beats have no understudy.** M6's `story-of-module-6` is nine minutes and the largest pre-exercise block in the training, and it is still open rather than cut. It is a first-person memo in a named voice: the one beat in the arc that cannot be reconstructed from bullets. Every other cut this pass was a sentence some other sentence already carried. Test before cutting a whole beat: **does anything else carry this, or only this?**

### Method

**Name the core before rewriting.** Antti: *"What is the core here. In short. Then I'll instruct."* Two rewrites failed before that instruction (*"not great at all"*, *"nah, not better"*). The slide came right only after the two jobs it does were said out loud. Structure first, words second — *"ok. The structure is right now… apply my taste here."*

**Cut before rewrite.** Every successful change this pass was a deletion. Every rewrite offered was rejected or reduced to a deletion. Extends `feedback_curriculum_default_move_is_cut.md`.

**When asked to show, show.** Earlier in the same session: *"i said show the slide."* An analysis appended to a request to look at something is an answer to a question nobody asked.

### Survivors worth imitating

> A verifier against one failure is one hook. The same primitive covers everything else that must happen every time.

Concrete instance, then the sentence that makes it portable, then stop. Antti's framing of what makes it work: *"we got to the core of the concept and explained it, but so that it can still be used across."*

> You're new to this country. A tourist runs an agent and hopes; a practitioner runs a test and reads the data.

Cutting the gloss is what let the metaphor land. The explanation had been standing between the image and its punchline.

> A menu, not a checklist.

Four words, after a prompt returns five plausible options and the exercise wants one.

### Where the agent was wrong, for calibration

Reliable at spotting redundancy, unreliable at judging what it was for. Four proposed cuts were load-bearing (the openers, the pipeline warning, both reassurance lines). On the hooks slide two lines were diagnosed as duplicates when they were setup and filter doing different jobs; the real finding came from reading the prompt, not from pattern-matching the prose.

**The division of labour that worked: the agent finds the shapes, the maintainer rules on the purposes.** §27 says as much in its own body — *not a REVISE on its own, the default move, not the law.*
