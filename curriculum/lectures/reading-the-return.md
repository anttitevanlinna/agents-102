# Reading the return

*~5 min pre-read for M5. Lands at the close of M4's Debrief, while your run is going. Names the M5 question and the three failure modes you'll use to read the return. Doesn't name the fixes. Those earn their names in the exercise.*

---

You closed the laptop at the end of M4 with the agent working. By the time you read this, your run has either finished, hit its budget, or been stopped because you saw enough. Whatever came back is the artefact you walk into M5 with.

Here is the question that drives M5.

**What would have caught this at hour 2, not hour 6?**

Not "did the run succeed." Not "should I have spec'd it tighter." A diagnostic question. You read the artefact, you find what went wrong, and for each thing you ask: what would have caught this earlier?

## Three failure modes you'll use to read

Practitioners running multi-hour coding agents in the last six months name the same three failure modes, in roughly the same order. Use them as the lens for the M5 read.

**Goal drift.** The instructions get buried as the conversation grows. By hour one the agent is solving an adjacent problem with confidence. Starts early. Hard to spot until you compare what was asked against what was done.

**Context rot.** Signal-to-noise drops as the working window fills. The agent rehashes approaches it already ruled out two hours ago, because "ruled out two hours ago" no longer fits in the working window. Practitioners hit this around hour one to two.

**Plausible-but-wrong.** Outputs look reasonable in isolation. They don't match the original spec. This is the most expensive failure to find because it doesn't trigger an obvious tell. Hour two onward.

## One practitioner anchor

Armin Ronacher ran a port between two languages in roughly ten hours of agent time, two and a bit million tokens. The run held together because he had something specific in place that catches the failure modes above. We diagnose what at M5.

## What to bring to M5

The artefact (whatever your run produced, including a stopped run). The three failure modes above as your reading lens.

We read it together at M5 open.

<!-- maintainer -->

**Word count:** ~370 words body.

**Time:** ~5 min read.

**Delivery mode:** Pre-read. Lands at the close of M4 Debrief, after the send-off prompt has been pasted. Self-study Nerd shares the link as part of the M4 close-out summary.

**Source verification — MUST DO before first cohort:**
- Open https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ and confirm: 10h figure, 2.2M tokens, lexer→parser→runtime sequence, Rust snapshot test reuse. *(Currently sourced from the 2026-04-21 long-running practitioner OODA at `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md` line 11; verify against original.)*
- Confirm freshness against the 6-month window at delivery time. Jan 2026 piece is in window through July 2026. If stale at delivery, swap for a newer Ronacher post or a peer practitioner with the same pattern.
- The three failure modes (goal drift / context rot / plausible-but-wrong) are convergent practitioner vocabulary, not a single-author framework. The convergence is sourced in the same 2026-04-21 OODA; if any single name is contested at first-cohort review, drop the named-author tone and keep the practitioner-convergence framing.

**Frameworks attributed:**
- **Three failure modes** — convergent practitioner vocabulary. No single attribution; the convergence IS the citation.
- **Ronacher MiniJinja port** — Armin Ronacher [practitioner direct]. Anchor for "reference artefact to diff against."

**Watch-fors (delivery):**
- Don't pre-empt the three-pattern (reference / plan.md / verifier). The pre-read names failure modes, not fixes. Naming the fixes here collapses the M5 contrast.
- Don't drift to "best practices" register. This is a question to plant, not a checklist to deliver.
- Self-study mode: the Nerd shares the link with a one-liner. The pre-read is short enough to read; don't paraphrase it.

**Philosophy callouts:** none. The question is the beat.

**Vision vs. detail:**
- Vision layer: the M5 diagnostic question, the curiosity-not-defensiveness frame.
- Detail layer: the three failure-mode names + Ronacher anchor + URL.

**TODO (pre-first-cohort):**
- Source verification per above.
- Three-persona sim covering this both as pre-read AND as in-room handout (does it land both ways for Greg / Maija / Jin?).
