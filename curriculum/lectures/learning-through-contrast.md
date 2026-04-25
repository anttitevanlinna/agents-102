# Learning through contrast

*~5 min in-room opener for M5. Lands at the start of the M5 session, after the room has gathered and the M4 artefact is in front of each student. Names the M5 spirit (read first, fix later) and the diagnostic stance the exercise depends on. Doesn't name the three-pattern. The exercise earns it.*

---

You sent off an un-packaged run at the close of M4 and you have something to read now. Stopped, finished, ran out of credit, doesn't matter. The artefact is data either way.

Here is the move M5 asks of you. It cuts against most engineering instinct.

**Read first. Fix later.**

When we see something an agent did wrong, the reflex is to fix it immediately. Edit the prompt, add a constraint, reach for the next tool. M5 holds that reflex off. We diagnose first. We name the failure modes. We let the failures earn the validation that catches them.

The arc is *test → learn → encode.* M4 was the test. Today is the learn. M6 will be the encode.

## Three lenses

The pre-read introduced these. One sentence each in case you skimmed.

**Goal drift.** The agent solved an adjacent problem with confidence. Buried instruction, redirected scope.

**Context rot.** Signal-to-noise dropped, agent rehashed approaches it ruled out an hour ago.

**Plausible-but-wrong.** Outputs look reasonable in isolation, don't match the spec.

These are your reading lens. Every artefact gets read through all three, even if one dominates.

## One operational move

The diagnosis session will fill its own working window. What works, per recent practitioner posts: trigger `/compact` manually at around 60% context. Don't wait for auto-compact. Auto fires when the model decides; manual at 60% means you choose what to keep (the diagnosis quotes, the failure-mode mapping, the validation shape you're sketching for Phase 3). Watch the context indicator at the bottom of Claude Code.

This is session-management, not packaging. Packaging is what the exercise builds for the re-send.

## "What if I'm not there to compact?"

Fair question. The diagnosis session you're about to run is ~65 minutes at the keyboard, so manual `/compact` works. But the re-send at the end of M5 will run for hours while you're away. You won't be there.

Two real options for hands-off runs.

1. **Trust auto-compact and live with what it picks.** The model decides what to keep when its window fills. Sometimes useful, sometimes wrong. Better than dropping context entirely.
2. **Build the agent something durable to re-read.** A working document the agent owns and updates. A reference it diffs its output against. An automated check that fires on produced work. Once those exist, auto-compact can fire and the agent can re-anchor from what survives.

Option 2 is what the exercise builds. The whole point of packaging is that you can leave the room.

## What is about to happen

Phase 1: open Claude Code in your repo, ask it to read your M4 artefact through the three lenses, quote specific moments for each. Don't generalise. Quote.

Phase 2 inverts the move: for each named failure, ask what validation would have caught it at hour 2.

Phases 3 and 4 build. Then the module re-sends.

Open your repo. Let's go.

<!-- maintainer -->

**Word count:** ~340 words body.

**Time:** ~5 min at presentation pace. Tighter than the closing; this is a room-opener, not a topic.

**Delivery mode:** In-room only. Self-study Nerd opens M5 with the same content as the C1 framing for the exercise.

**Source verification — MUST DO before first cohort:**
- The three failure modes are convergent practitioner vocabulary (sourced via the 2026-04-21 long-running OODA at `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md`). Confirm against pre-read attribution at delivery time; the lecture must NOT diverge from the pre-read on these terms.
- The `/compact at ~60%` heuristic is sourced via `continuous-research/platform-watch/coding-agents/runs/2026-04-23-scaling-session-length-2-platform-mechanics.md` as a convergent practitioner pattern. Same attribution stance as the closer (no single name).
- No external URLs cited. The lecture defers anchoring to the pre-read (Ronacher) and to the closing lecture (Cherny, Curran, Sourcegraph Amp).

**Frameworks attributed:**
- **Three failure modes** — convergent practitioner vocabulary; pre-read carries the citation.
- **test → learn → encode** — M5 strategy framing (`content-strategy-agentic-engineering-101.md` § "M5 in detail" and § "M4–M6 spirit"). Internal arc terminology, not a third-party framework.
- **/compact at ~60%** — convergent practitioner pattern. Subagent dispatch as the second extension primitive is ceded to the closing lecture (kit recap), not named in the opener.

**Watch-fors (delivery):**
- "Read first, fix later" is the load-bearing line. Land it slowly. Pause after.
- Don't expand the three-lens explanation. The pre-read carries depth; the opener restates for the room.
- Don't name reference / plan.md / verifier in the opener — even when answering the hands-off FAQ. The FAQ uses descriptive paraphrases ("a working document the agent owns," "a reference it diffs against," "an automated check") that match Phase 2's prompt vocabulary; the closer earns the Ronacher names. If a student presses for the names in Q&A, defer: *"the closing lecture names them."*
- The opener names `/compact at ~60%` for the diagnosis session AND auto-compact-as-fallback for hands-off runs. The closer also names `/compact` and subagents-for-isolation as kit primitives, with counter-camp framing (Sourcegraph Amp). Confirm at delivery the closer still lands as kit-recap-with-counter-camp, not repetition. Three-persona sim should test this specifically.
- The closing line ("Open your repo. Let's go.") signals exercise start. Don't pad it with last-second framing; the room is ready.

**Philosophy callouts:** none. The diagnostic stance is the beat; further philosophy tagging dilutes.

**Vision vs. detail:**
- Vision layer: the diagnostic stance ("read first, fix later"), the test→learn→encode framing.
- Detail layer: the three failure-mode names (sourced via pre-read), the `~60%` threshold, `/compact` invocation.

**TODO (pre-first-cohort):**
- Three-persona sim: does the in-room opener carry the room AND the student who didn't pre-read? Is the one-sentence-per-mode sufficient, or does a non-reader still feel underprepared at Phase 1?
- Confirm framing alignment with pre-read (no contradictions, no different vocabulary).
- Test the "Open your repo. Let's go." closer in self-study mode — does the Nerd need to add a transition prompt, or does the line work as-is?
