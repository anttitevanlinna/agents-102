# Reading the return

You stepped away at the end of M4 with the agent working. By the time this lands, the run has either finished, hit its budget, or been stopped because enough was seen. Whatever came back is the artefact M5 starts from.

Here is the question that drives M5.

**What would have caught this earlier in the run?**

Practitioners running these for hours sharpen it as *at hour 2, not hour 6.* At your scale, *at minute 10, not minute 25.* Same diagnostic question, different clock.

Not "did the run succeed." Not "should I have spec'd it tighter." A diagnostic. You read the artefact, you find what went wrong, and for each thing you ask: what would have caught this earlier?

## Three failure modes you'll use to read

Practitioners running multi-hour coding agents in the last six months name the same three failure modes, in roughly the same order. Use them as the lens for the M5 read.

**Goal drift.** The instructions get buried as the conversation grows. By hour one the agent is solving an adjacent problem with confidence. Starts early. Hard to spot until you compare what was asked against what was done.

**Context rot.** Signal-to-noise drops as the working window fills. The agent rehashes approaches it already ruled out two hours ago, because "ruled out two hours ago" no longer fits in the working window. Practitioners hit this around hour one to two.

**Plausible-but-wrong.** Outputs look reasonable in isolation. They don't match the original spec. This is the most expensive failure to find because it doesn't trigger an obvious tell. Hour two onward.

## One practitioner anchor

Armin Ronacher ran a port between two languages in roughly ten hours of agent time, two and a bit million tokens. The run held together because he had something specific in place that catches the failure modes above. M5 diagnoses what.

## What to bring to M5

The artefact (whatever your run produced, including a stopped run). The three failure modes above as your reading lens.

M5 opens with the artefact on screen and the three lenses in hand.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~370 words body.

**Time:** ~5 min read.

**Delivery mode:** Pre-read. Lands at the close of M4 Debrief, after the send-off prompt has been pasted.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-07-14]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Go port, 10h / 2.2M tokens / lexer→parser→runtime / Rust snapshot reuse. fallback: if stale at delivery, swap for a newer Ronacher post or peer practitioner with the same reference-artifact pattern.
- Three failure modes (goal drift / context rot / plausible-but-wrong): convergent practitioner vocabulary (no URL), sourced in the 2026-04-21 OODA at `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md`. Convergence IS the citation; if a single name is contested at review, drop the named-author tone and keep the practitioner-convergence framing.

**Frameworks attributed:**
- **Three failure modes** — convergent practitioner vocabulary. No single attribution; the convergence IS the citation.
- **Ronacher MiniJinja port** — Armin Ronacher [practitioner direct]. Anchor for "reference artefact to diff against."

**Watch-fors (delivery):**
- Don't pre-empt the three-pattern (reference / plan.md / verifier). The pre-read names failure modes, not fixes. Naming the fixes here collapses the M5 contrast.
- Don't drift to "best practices" register. This is a question to plant, not a checklist to deliver.

**Philosophy callouts:** none. The question is the beat.

**Vision vs. detail:**
- Vision layer: the M5 diagnostic question, the curiosity-not-defensiveness frame.
- Detail layer: the three failure-mode names + Ronacher anchor + URL.
