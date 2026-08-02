# Read the run before you fix it

## Diagnose first, fix later

- The artefact is data, whatever came back. You sent off an un-packaged run. Stopped, finished, ran out of credit: there is something to read now, and reading it is the work.
- **Diagnose first. Fix later.** The move cuts against most engineering instinct. When an agent gets something wrong, the reflex is to fix it immediately: edit the prompt, add a constraint, reach for the next tool. This module holds that reflex off. The failures earn the validation that catches them.
- The arc is *test → learn → encode*. The un-packaged send-off was the test. This is the learn. The encode turns what the read finds into durable checks.

The run shows you what no benchmark can.

## Three failure lenses

- **Goal drift.** The agent solved an adjacent problem with confidence: the instruction got buried or the scope got redirected, and the run kept going.
- **Context rot.** Signal-to-noise dropped as the working window filled; the agent rehashed approaches it had already ruled out an hour ago.
- **Plausible-but-wrong.** Outputs look reasonable in isolation and don't match the spec. The most expensive failure to find, because nothing about it looks broken.
- Every artefact gets read through all three. One lens usually dominates; the read still walks each one, because the lens you skip is the failure you can't name.

## Managing the window

- **Never trust the window** to hold over a long run. Compact early and manually if you like: `/compact focus on the failure modes and the validation I'm sketching` keeps what you choose, where a bare `/compact` keeps whatever the summariser guessed mattered. Many good engineers just let auto-compact fire. No winning strategy here, and no percentage worth memorising.
- Manual compaction works because you're at the keyboard. The diagnosis is bounded keyboard work. The re-send at the end of this module runs for hours while you're away, and a run nobody is watching can't be manually compacted.
- Hands-off option one: trust auto-compact. The model decides what to keep when its window fills. Sometimes useful, sometimes wrong; better than dropping context entirely.
- Hands-off option two: give the agent something durable to re-read. A working document the agent owns and updates. A reference it diffs its output against. An automated check that fires on produced work. Files on disk survive compaction; conversation-only instructions may not. Once those exist, auto-compact can fire and the agent re-anchors from what survives.
- Option two is what the exercise builds. `/compact` is session management, not packaging. The whole point of packaging is that you can leave the room.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept bullets; bold reduced to slide 1's named stance (**Diagnose first. Fix later.**), slide 2's three failure-lens handles (**Goal drift** / **Context rot** / **Plausible-but-wrong**), and slide 3's operational rule trimmed to a sub-span, now **Never trust the window** (the 60% span it carried until 2026-08-01 went with the threshold); all other leads de-bolded, kicker untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** three slides + one kicker. Per-passage verdicts: opening artefact-anchor + "the move M5 asks of you" lede CONVERTED into slide 1 (first two bullets) · arc line (*test → learn → encode*) KEPT as slide-1 bullet under the §3 arc-subject carve-out (judgment below) · "The pre-read introduced these" connective CUT · three one-sentence lenses CONVERTED to slide 2, "read through all three" tail folded in as fourth bullet · "One operational move" + the hands-off FAQ MERGED into slide 3 (*Managing the window*); "`/context` is oldskool" phrasing dropped, `/context` and ccstatusline both kept (preserves the 2026-05-15 technical fix) · "What is about to happen" phase preview CUT (the exercise body carries the flow) · "Practice beats external proof" pair TRIMMED to the slide-1 kicker · "Open your repo. Let's go." CUT (room beat; trainer carries the exercise start).

**§3 judgment (cross-module refs in body):** the lecture's subject IS the contrast arc (baseline → learn → encode; the lecture is named for it), so the backward anchor and the backward arc legs are constitutive and stay. The *number* on them is not: what is load-bearing is that the un-packaged send-off was the test, not which slot it sat in. Both legs now name the artefact instead of the module, so the arc survives a cut that runs these modules in different positions. The forward leg names what the encode IS; the module file's `## Next` owns the bridge. Self-refs read "this module". No module numbers above the fence.

**Quality:** compendium-audited 2026-08-02 (writing@1c765f2 story@1c765f2 technical@1c765f2 behavior@1c765f2 pedagogy@1c765f2 strategy@1c765f2 slides@1c765f2)
- judges @1c765f2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~330 words body (post-rework).

**Time:** ~5 min at presentation pace. Tighter than the closing; this is a room-opener, not a topic.

**Design intent:** Names the M5 spirit (read first, fix later) and the diagnostic stance the exercise depends on. Doesn't name the three-pattern. The exercise earns it.

**Delivery mode:** In-room only.

<!-- backing -->

Claims
- `artefact-is-data` · vision · "The artefact is data, whatever came back." ← none-owed
- `diagnose-first-fix-later` · vision · "Diagnose first. Fix later." ← none-owed
- `test-learn-encode` · vision · "The arc is *test → learn → encode*." ← none-owed
- `three-failure-lenses` · detail · "**Goal drift** … **Context rot** … **Plausible-but-wrong**" ← three-failure-modes
- `skip-a-lens-lose-a-name` · vision · "the lens you skip is the failure you can't name" ← none-owed
- `never-trust-the-window` · vision · "Never trust the window to hold over a long run." ← none-owed
- `compact-with-instructions` · detail · "`/compact focus on the failure modes and the validation I'm sketching` keeps what you choose" ← anthropic-compact-docs
- `auto-compact-is-legitimate` · detail · "Many good engineers just let auto-compact fire." ← osmani-long-running, amp-neo, steipete-inference-speed
- `no-percentage-worth-memorising` · detail · "No winning strategy here, and no percentage worth memorising." ← humanlayer-long-context, cc-autocompact-varies, horthy-ace-fca
- `manual-needs-a-keyboard` · vision · "Manual compaction works because you're at the keyboard." ← none-owed
- `files-survive-compaction` · detail · "Files on disk survive compaction; conversation-only instructions may not." ← cc-context-window-docs
- `compact-is-not-packaging` · vision · "`/compact` is session management, not packaging. The whole point of packaging is that you can leave the room." ← none-owed

Sources
- three-failure-modes `[checked:2026-08-01 result:CAVEAT due:cohort]` (no URL — house vocabulary, see below) — [house canonical] goal drift / context rot / plausible-but-wrong. Per-term hunt 2026-08-01: *context rot* is real field vocabulary with a study behind it (Chroma, 18 models) and Anthropic's own adoption, used unprompted by Ronacher and Osmani — roughly 3–4 named users, short of the L3 bar. *Goal drift* and *plausible-but-wrong* return **zero** named practitioners; the only appearance of "goal drift" as a term is a byline-less digest. **The phenomena are well attested; the names are largely ours.** Body says "practitioners hit" rather than "practitioners name" — keep that verb, and do not restore "convergent practitioner vocabulary". fallback: none needed, the corrected framing is the fallback.
- anthropic-compact-docs `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/prompt-caching — [vendor docs, capability] *"run `/compact` at a natural break in your work, such as between tasks, instead of waiting for auto-compaction to trigger mid-task."* The focus-instruction form is at https://code.claude.com/docs/en/context-window: *"run `/compact` with instructions, like `/compact focus on the auth bug fix`… The summary keeps what you choose instead of what the automatic pass guesses is important."* No percentage on either page. fallback: none; this is the primary.
- cc-context-window-docs `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/context-window — [vendor docs, capability] What survives: project-root CLAUDE.md and auto memory *"re-injected from disk"*; nested CLAUDE.md and `paths:`-scoped rules *"Lost until a matching file is read again"*; conversation-only instructions may be lost. This is the mechanical basis for the AFK payoff, not a philosophical one. fallback: state it qualitatively — a file on disk can be re-read, a conversation cannot.
- cc-autocompact-varies `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/env-vars — [vendor docs, capability] **There is no single auto-compact threshold.** Sonnet 5 on the API *"at about 967K tokens by default"* of 1M; Sonnet 4.6 and Opus 4.6 without extended context plus cloud sessions *"compact at the 200K boundary by default"*; other local sessions *"when the conversation reaches the model's context limit."* `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (1–100) *"can only lower the threshold."* fallback: say the trigger varies by model and venue; never name one number.
- humanlayer-long-context `[checked:2026-08-01 result:OK due:2027-02-01]` https://www.humanlayer.dev/blog/long-context-isnt-the-answer — [practitioner direct, vendor venue] Kyle of HumanLayer, 2026-03-23: *"We used to set this at around %40 of sonnets 168k token window… we've updated our context warnings for long-context models to trigger at the 100k token mark instead of 40% of the usable context. For opus 1m this is only 10% of the context window."* **The load-bearing source for the slide.** The defect in "compact at 60%" is not that the number is unsourced, it is that the unit is wrong: a percentage of 200K and a percentage of 1M are different amounts of context. The one org that published a percentage replaced it with an absolute count for exactly that reason. fallback: name no number.
- horthy-ace-fca `[checked:2026-07-31 result:CAVEAT due:none]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md — [practitioner direct, vendor venue] Horthy, last substantively edited 2025-12-03: *"keeping utilization in the 40%-60% range."* A **range held continuously**, not a trigger to wait for, so a 60% cue reads his ceiling as his signal and inverts him. `due:none` scopes this to *what he wrote then* per §2b; his organisation's current position is the in-window source above. **Do not repair the slide by swapping 60% for 40–60%, and do not swap in 100k either.** fallback: name no number.
- osmani-long-running `[checked:2026-08-01 result:OK due:2027-02-01]` https://addyo.substack.com/p/long-running-agents — [practitioner direct] Osmani, 2026-04-30: *"Treat compaction and context resets as first-class"* and *"state lives outside the agent's context… The agent itself is amnesiac, but the filesystem isn't."* Backs both halves of the slide: auto-compact is a legitimate camp, and durable state is what makes it survivable. fallback: cite him for the durable-state half alone.
- amp-neo `[checked:2026-08-01 result:OK due:2027-02-01]` https://ampcode.com/news/neo — [practitioner direct, vendor venue] Amp, 2026-05-06: *"So handoff is out. Compaction is in"*, compaction *"runs automatically when the context window is 90% full"*, and *"You don't have to watch context percentages anymore."* A team that built a feature to avoid compaction reversing to automatic compaction. **Single vendor: their later posts corroborate in time, not independently.** fallback: cite as one team's reversal, never as a trend.
- steipete-inference-speed `[checked:2026-08-01 result:CAVEAT due:none]` https://steipete.me/posts/2025/shipping-at-inference-speed — [practitioner direct] Steinberger, 2025-12-28: *"tasks can run across many compacts and will be finished"*, and he reports abandoning his earlier restart-per-task habit. Pre-window, and he has published nothing on the topic since. `due:none` scopes it to what he reported doing then. fallback: drop him; the claim holds on Osmani and Amp.

Frameworks
- Three failure modes · [borrow:none] · law:three-failure-modes · ← three-failure-modes
- Context as a bandwidth-limited channel · [borrow:information theory] · law:bandwidth-limited-channel · ← cc-context-window-docs
- test → learn → encode · [borrow:none] · law:none · ← cultural-vocab

Stance `[stance:2026-08-01 level:L1]`
- holds: nothing on compaction. A four-lane sweep of eleven named practitioners on 2026-08-01 found **zero convergence in either direction** — Osmani builds compaction in as first-class, Amp reversed to it, Steinberger leans on it, Huntley restarts fresh instead, HumanLayer moved to context isolation, and Ronacher, Willison and Klaassen state no position. The only thing every camp shares is the premise the slide leads with: a long run cannot trust its window.
- contested: everything downstream of that premise. Whether to compact manually, let it fire, restart fresh, or isolate into subagents is unsettled, and the strongest practitioner numbers are absolute token counts rather than percentages.
- would-move-it: three or more named practitioners independently publishing the same trigger, in the same unit, inside a six-month window. That would make a menu into a recommendation and the slide would owe a change.

OODA
- question: has anything become a convergent compaction practice, and is a percentage ever again the right unit?
- roster: Osmani, Horthy and the HumanLayer blog, Huntley, Ronacher, Willison, Steinberger, the Amp Chronicle, Anthropic's Claude Code docs changelog
- last-run: 2026-08-01

<!-- /backing -->

**Watch-fors (delivery):**
- "Read first, fix later" is the load-bearing line. Land it slowly. Pause after.
- Don't expand the three-lens explanation. The pre-read carries depth; the opener restates for the room.
- Don't name reference / plan.md / verifier in the opener — even when answering the hands-off FAQ. The FAQ bullets use descriptive paraphrases ("a working document the agent owns," "a reference it diffs against," "an automated check") that match Phase 2's prompt vocabulary; the closer earns the names. **They are our names, not Ronacher's** (corrected 2026-08-01) — he uses none of the three words. If a student presses for the names in Q&A, defer: *"the closing lecture names them."*
- **"So what number should I use?" will be asked, and the answer does not fit on the slide.** Give it in the room: there isn't one, and the reason is that a percentage stopped being a meaningful unit. HumanLayer moved their own context warning off 40%-of-usable-window to a flat 100k-token mark precisely because *"For opus 1m this is only 10% of the context window"* (2026-03-23). Claude Code's own auto-compact trigger now varies by model and venue rather than sitting at one number. So a percentage is the wrong shape of answer, not a number we happen to lack. If a student wants something concrete to do, point at `/compact <instructions>` — choosing what survives is the move that actually pays.
- The opener frames the window as unreliable and offers manual-compact and auto-compact as equally live options. The closer names `/compact` and subagents-for-isolation as kit primitives. Confirm at delivery the closer lands as kit-recap, not repetition. Three-persona sim should test this specifically.
- *"Never trust the window over a long run"* is Antti's governing stance, not a sourced finding. That is what makes the AFK payoff at the end of the slide an argument rather than a topic change — deliver it as a position held, not as a result reported.
- The exercise start is the trainer's call now (the "Open your repo. Let's go." closer was cut in the slide pass); land slide 3's last bullet and hand over.

**Philosophy callouts:** none. The diagnostic stance is the beat; further philosophy tagging dilutes.

