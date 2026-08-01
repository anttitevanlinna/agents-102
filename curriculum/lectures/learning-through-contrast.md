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

- Trigger **`/compact` manually at around 60%** context. The diagnosis session will fill its own working window. Auto-compact fires when the model decides; manual at 60% means you choose what survives: the diagnosis quotes, the failure-mode mapping, the validation shape you're sketching. `/context` shows the number on demand; [ccstatusline](https://github.com/sirmalloc/ccstatusline) keeps it live in your status line.
- Manual compaction works because you're at the keyboard. The diagnosis is bounded keyboard work. The re-send at the end of this module runs for hours while you're away, and a run nobody is watching can't be manually compacted.
- Hands-off option one: trust auto-compact. The model decides what to keep when its window fills. Sometimes useful, sometimes wrong; better than dropping context entirely.
- Hands-off option two: give the agent something durable to re-read. A working document the agent owns and updates. A reference it diffs its output against. An automated check that fires on produced work. Once those exist, auto-compact can fire and the agent re-anchors from what survives.
- Option two is what the exercise builds. `/compact` is session management, not packaging. The whole point of packaging is that you can leave the room.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept bullets; bold reduced to slide 1's named stance (**Diagnose first. Fix later.**), slide 2's three failure-lens handles (**Goal drift** / **Context rot** / **Plausible-but-wrong**), and slide 3's operational rule trimmed to the sub-span **`/compact` manually at around 60%**; all other leads de-bolded, kicker untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** three slides + one kicker. Per-passage verdicts: opening artefact-anchor + "the move M5 asks of you" lede CONVERTED into slide 1 (first two bullets) · arc line (*test → learn → encode*) KEPT as slide-1 bullet under the §3 arc-subject carve-out (judgment below) · "The pre-read introduced these" connective CUT · three one-sentence lenses CONVERTED to slide 2, "read through all three" tail folded in as fourth bullet · "One operational move" + the hands-off FAQ MERGED into slide 3 (*Managing the window*); "`/context` is oldskool" phrasing dropped, `/context` and ccstatusline both kept (preserves the 2026-05-15 technical fix) · "What is about to happen" phase preview CUT (the exercise body carries the flow) · "Practice beats external proof" pair TRIMMED to the slide-1 kicker · "Open your repo. Let's go." CUT (room beat; trainer carries the exercise start).

**§3 judgment (cross-module refs in body):** the lecture's subject IS the contrast arc (baseline → learn → encode; the lecture is named for it), so the backward anchor and the backward arc legs are constitutive and stay. The *number* on them is not: what is load-bearing is that the un-packaged send-off was the test, not which slot it sat in. Both legs now name the artefact instead of the module, so the arc survives a cut that runs these modules in different positions. The forward leg names what the encode IS; the module file's `## Next` owns the bridge. Self-refs read "this module". No module numbers above the fence.

**Quality:** compendium-audited 2026-07-26 (writing@b3143a4 story@b3143a4 technical@9697944 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@b3143a4)
- judges @9697944: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~330 words body (post-rework).

**Time:** ~5 min at presentation pace. Tighter than the closing; this is a room-opener, not a topic.

**Design intent:** Names the M5 spirit (read first, fix later) and the diagnostic stance the exercise depends on. Doesn't name the three-pattern. The exercise earns it.

**Delivery mode:** In-room only.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-17]` https://github.com/sirmalloc/ccstatusline — [operational tool] Claude Code status-line w/ context-usage widgets; live, maintained. fallback: name the capability generically ("a status-line tool that shows live context %") if the repo moves.
- `[checked:2026-08-01 result:CORRECT due:cohort]` three-failure-modes — [practitioner analysis] goal drift / context rot / plausible-but-wrong. **The previous stamp claimed "convergent vocabulary … (L3, ~8 independents)". That is false and is withdrawn.** A per-term hunt on 2026-08-01 found: *context rot* is real field vocabulary with a genuine study behind it (Chroma, 18 models) and Anthropic's own adoption, used unprompted by Ronacher and Osmani — roughly 3–4 named users, not 8, so still short of the L3 bar. *Goal drift* and *plausible-but-wrong* return **zero** named practitioners; the only appearance of "goal drift" as a term is a byline-less digest. **The phenomena are well attested; the names are largely ours.** Body says "practitioners hit" rather than "practitioners name" — keep that verb. Confirm against the pre-read at delivery; the two files now agree. fallback: none needed, the corrected framing is the fallback.
- `[checked:2026-08-01 result:CORRECT due:asap]` convergent:compact-at-60-percent — **not convergent and not L2: one source, and it is vendor content.** Of the three posts the internal OODA run cites, MindStudio does carry *"around 60% context utilization"* but is an unsigned corporate post (byline "MindStudio Team", 2026-04-02) from an AI-app-building platform vendor → `[vendor press release]`, Level 0. ClaudeFA's cited page carries no 60% figure at all: it covers auto-compact mechanics (83.5% trigger, 33K buffer) plus a 50% figure for proactive clearing, a different move — and it carries no byline and no date. ClaudeLog 403s to direct fetch → unverifiable, not disproved. So the count is one, the type is vendor, and the label `[practitioner analysis]` was wrong on all three. fallback IS the fix below.
- `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/prompt-caching — [vendor docs, capability] The habit the slide teaches, stated by Anthropic with no percentage anywhere: *"run `/compact` at a natural break in your work, such as between tasks, instead of waiting for auto-compaction to trigger mid-task"*, and *"save `/compact` for natural breaks between tasks."* Same page gives the mechanism the slide's rationale needs — compaction replaces history with a summary, so choosing the moment is choosing what survives. fallback: none; this is the primary.
- `[checked:2026-07-31 result:CAVEAT due:asap]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md — [practitioner direct, vendor venue] Horthy is the only named practitioner attaching a number to this, and it is a **range held continuously** — *"keeping utilization in the 40%-60% range"* — not a trigger to wait for. A 60% cue reads his ceiling as his signal to act, which inverts him. Full stamp + freshness caveat lives at `the-loop-half-filled.md`. **And his own organisation has since abandoned the percentage as a unit** — HumanLayer, 2026-03-23, in-window: *"We used to set this at around %40 of sonnets 168k token window… we've updated our context warnings for long-context models to trigger at the 100k token mark instead of 40% of the usable context. For opus 1m this is only 10% of the context window"* (https://www.humanlayer.dev/blog/long-context-isnt-the-answer, [practitioner direct, vendor venue], author Kyle of HumanLayer, not Horthy personally). **This is the load-bearing finding for the slide, and it is not "the number is unsourced" — it is that the unit is wrong.** A percentage of a 200K window and a percentage of a 1M window are different amounts of context, so a fixed percentage stopped meaning anything when windows grew. The one org that published a percentage replaced it with an absolute token count for exactly that reason. **Do not repair the slide by swapping 60% for 40–60%, and do not swap in 100k either** — the teachable point is that a percentage is the wrong shape, not that we picked the wrong percentage. fallback: name no number.

**Frameworks attributed:**
- **Three failure modes** — real phenomena, mostly our names. Only *context rot* is field vocabulary (Chroma study + Anthropic adoption + named practitioner use); *goal drift* and *plausible-but-wrong* are our labels for phenomena practitioners describe without a settled word. **Do not restore "convergent practitioner vocabulary"** — corrected 2026-08-01. Pre-read carries the detail.
- **test → learn → encode** — M5 strategy framing (`bosser-strategy:content-strategy-agentic-engineering-101.md` § "M5 in detail" and § "M4–M6 spirit"). Internal arc terminology, not a third-party framework.
- **Manual `/compact` before auto-compact fires** — Anthropic's own stated habit, and it names no percentage. **Not a convergent practitioner pattern**, despite the phrase this line used to carry: no practitioner convergence on a number exists, and the body's `~60%` is unbacked pending the fix stamped above. Subagent dispatch as the second extension primitive is ceded to the closing lecture (kit recap), not named in the opener.

**Watch-fors (delivery):**
- "Read first, fix later" is the load-bearing line. Land it slowly. Pause after.
- Don't expand the three-lens explanation. The pre-read carries depth; the opener restates for the room.
- Don't name reference / plan.md / verifier in the opener — even when answering the hands-off FAQ. The FAQ bullets use descriptive paraphrases ("a working document the agent owns," "a reference it diffs against," "an automated check") that match Phase 2's prompt vocabulary; the closer earns the names. **They are our names, not Ronacher's** (corrected 2026-08-01) — he uses none of the three words. If a student presses for the names in Q&A, defer: *"the closing lecture names them."*
- The opener names `/compact at ~60%` for the diagnosis session AND auto-compact-as-fallback for hands-off runs. The closer also names `/compact` and subagents-for-isolation as kit primitives, with counter-camp framing (Sourcegraph Amp). Confirm at delivery the closer still lands as kit-recap-with-counter-camp, not repetition. Three-persona sim should test this specifically.
- The exercise start is the trainer's call now (the "Open your repo. Let's go." closer was cut in the slide pass); land slide 3's last bullet and hand over.

**Philosophy callouts:** none. The diagnostic stance is the beat; further philosophy tagging dilutes.

**Vision vs. detail:**
- Vision layer: the diagnostic stance ("read first, fix later"), the test→learn→encode framing.
- Detail layer: the three failure-mode names (sourced via pre-read), the `~60%` threshold, `/compact` invocation.
