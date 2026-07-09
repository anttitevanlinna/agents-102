# Read the run before you fix it

## Diagnose first, fix later

- The artefact is data, whatever came back. You sent off an un-packaged run at the close of M4. Stopped, finished, ran out of credit: there is something to read now, and reading it is the work.
- **Diagnose first. Fix later.** The move cuts against most engineering instinct. When an agent gets something wrong, the reflex is to fix it immediately: edit the prompt, add a constraint, reach for the next tool. This module holds that reflex off. The failures earn the validation that catches them.
- The arc is *test → learn → encode*. M4 was the test. This is the learn. The encode turns what the read finds into durable checks.

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

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept bullets; bold reduced to slide 1's named stance (**Diagnose first. Fix later.**), slide 2's three failure-lens handles (**Goal drift** / **Context rot** / **Plausible-but-wrong**), and slide 3's operational rule trimmed to the sub-span **`/compact` manually at around 60%**; all other leads de-bolded, kicker untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** three slides + one kicker. Per-passage verdicts: opening artefact-anchor + "the move M5 asks of you" lede CONVERTED into slide 1 (first two bullets) · arc line (*test → learn → encode*) KEPT as slide-1 bullet under the §3 arc-subject carve-out (judgment below) · "The pre-read introduced these" connective CUT · three one-sentence lenses CONVERTED to slide 2, "read through all three" tail folded in as fourth bullet · "One operational move" + the hands-off FAQ MERGED into slide 3 (*Managing the window*); "`/context` is oldskool" phrasing dropped, `/context` and ccstatusline both kept (preserves the 2026-05-15 technical fix) · "What is about to happen" phase preview CUT (the exercise body carries the flow) · "Practice beats external proof" pair TRIMMED to the slide-1 kicker · "Open your repo. Let's go." CUT (room beat; trainer carries the exercise start).

**§3 judgment (cross-module refs in body):** carve-out HOLDS, partially — the lecture's subject IS the contrast arc (M4 baseline → this module's learn → the encode; the lecture is named for it), so the backward anchor "close of M4" and the backward arc legs "M4 was the test. This is the learn." are constitutive, not incidental sequencing; they stay. The forward leg ("M6 will be the encode") was incidental sequencing — the module file's `## Next` owns that bridge — rewritten to name what the encode IS without the module number. Incidental self-refs dispositioned in the same pass: "the move M5 asks of you" / "M5 holds that reflex off" → "this module"; "the re-send at the end of M5" → "the end of this module". No other M-refs above the fence.
- section-3 sweep 2026-07-02: 3 cross-module refs judged, 1 fixed (forward "M6 will be the encode" → "The encode turns what the read finds into durable checks"; the M6 bridge lives in `learn-from-the-test.md` `## Next`, confirmed present), 2 carve-out ("close of M4" + "M4 was the test" — arc-subject lecture, backward anchors). Self-refs ("this module" ×2) OK.

**Quality:** compendium-audited 2026-07-08 (writing@1ff6f8a story@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a slides@47f3357) — predates the slides-only rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical REVISE (1/0 see instances/ae101--learning-through-contrast.technical.json - /context replaces UI-location claim 2026-05-15), behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~330 words body (post-rework).

**Time:** ~5 min at presentation pace. Tighter than the closing; this is a room-opener, not a topic.

**Design intent:** Names the M5 spirit (read first, fix later) and the diagnostic stance the exercise depends on. Doesn't name the three-pattern. The exercise earns it.

**Delivery mode:** In-room only.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-17]` https://github.com/sirmalloc/ccstatusline — [operational tool] Claude Code status-line w/ context-usage widgets; live, maintained. fallback: name the capability generically ("a status-line tool that shows live context %") if the repo moves.
- Three failure modes: convergent practitioner vocabulary (no URL), sourced via the 2026-04-21 long-running OODA at `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md`. Convergence IS the citation; confirm against pre-read attribution at delivery, must NOT diverge.
- `/compact at ~60%`: convergent practitioner pattern (no URL), sourced via `continuous-research/platform-watch/coding-agents/runs/2026-04-23-scaling-session-length-2-platform-mechanics.md`. No single name.

**Frameworks attributed:**
- **Three failure modes** — convergent practitioner vocabulary; pre-read carries the citation.
- **test → learn → encode** — M5 strategy framing (`bosser-strategy:content-strategy-agentic-engineering-101.md` § "M5 in detail" and § "M4–M6 spirit"). Internal arc terminology, not a third-party framework.
- **/compact at ~60%** — convergent practitioner pattern. Subagent dispatch as the second extension primitive is ceded to the closing lecture (kit recap), not named in the opener.

**Watch-fors (delivery):**
- "Read first, fix later" is the load-bearing line. Land it slowly. Pause after.
- Don't expand the three-lens explanation. The pre-read carries depth; the opener restates for the room.
- Don't name reference / plan.md / verifier in the opener — even when answering the hands-off FAQ. The FAQ bullets use descriptive paraphrases ("a working document the agent owns," "a reference it diffs against," "an automated check") that match Phase 2's prompt vocabulary; the closer earns the Ronacher names. If a student presses for the names in Q&A, defer: *"the closing lecture names them."*
- The opener names `/compact at ~60%` for the diagnosis session AND auto-compact-as-fallback for hands-off runs. The closer also names `/compact` and subagents-for-isolation as kit primitives, with counter-camp framing (Sourcegraph Amp). Confirm at delivery the closer still lands as kit-recap-with-counter-camp, not repetition. Three-persona sim should test this specifically.
- The exercise start is the trainer's call now (the "Open your repo. Let's go." closer was cut in the slide pass); land slide 3's last bullet and hand over.

**Philosophy callouts:** none. The diagnostic stance is the beat; further philosophy tagging dilutes.

**Vision vs. detail:**
- Vision layer: the diagnostic stance ("read first, fix later"), the test→learn→encode framing.
- Detail layer: the three failure-mode names (sourced via pre-read), the `~60%` threshold, `/compact` invocation.
