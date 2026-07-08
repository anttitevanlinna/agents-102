# Reading the return

## What would have caught this earlier?

- **Whatever came back is the artefact.** You stepped away with the agent working. The run finished, hit its budget, or was stopped because enough was seen. All three are readable results, and the read is the same.
- **What would have caught this earlier in the run?** Not *did the run succeed*. Not *should I have spec'd it tighter*. A diagnostic: you read the artefact, you find what went wrong, and for each thing you ask this one question.
- **The clock scales with the run.** Practitioners running these for hours sharpen the question as *at hour two, not hour six*. On a short run it is *at minute ten, not minute twenty-five*. Same diagnostic, different clock.

## Three failure modes you'll use to read

- **Practitioners name the same three, in roughly the same order.** Engineers running multi-hour coding agents converge on this vocabulary. Use the three as the lens for the read.
- **Goal drift.** The instructions get buried as the conversation grows, and by hour one the agent is solving an adjacent problem with confidence. The LLM reasons from what fills the window now, and the original ask competes with everything generated since. Starts early. Hard to spot until you compare what was asked against what was done.
- **Context rot.** Signal-to-noise drops as the working window fills. The agent rehashes approaches it already ruled out two hours ago, because "ruled out two hours ago" no longer fits in the working window. Practitioners hit this around hour one to two.
- **Plausible-but-wrong.** Outputs look reasonable in isolation and don't match the original spec. The LLM produces the next likely word, not the next true one, so fluent and confident is its default finish whether the work is right or not. The most expensive failure to find, because it doesn't trigger an obvious tell. Hour two onward.

## Why these three, every run

- **The three are consequences, not bad luck.** The LLM is a statistical machine with a finite window: it predicts what is likely, and it holds only so much. Run it long enough and all three failures follow, whoever wrote the prompt.
- **Predictable failures are readable failures.** Because the three come from the machine, the same three turn up in every practitioner's long run. That is why three lenses are enough to read whatever comes back.
- **On the map, they live in the Work phase.** The failure happens where the work happens. Reading for them is the far half's first verification move.
- **One question per finding: which of the three is this?** A finding counts when it carries a lens and a quoted moment from the artefact. Two modes tangled in one finding means the read is not done; pull them apart.

## Ronacher's ten-hour port surfaced all three

- **Armin Ronacher ran a port between two languages in roughly ten hours of agent time.** Two and a bit million tokens. Long enough for all three failure modes to show up.
- **The run held together anyway.** He had something specific in place that catches the failure modes above. What that was is where your own read leads.
- **The read starts with the artefact on screen and the three lenses in hand.** A stopped run counts; the trace is the data.

<!-- maintainer -->

**Theory promotion (2026-07-02, unaudited):** three-failure-modes bank law (`theory-plan.md` § The pieces §1) promoted to anchor form HERE. Rationale for the beat: this file is the trio's canonical naming surface, dual-wired (M4-close pre-read + M5-open re-projection, so the mechanism lands as recognition once the felt run is in hand), and the depth-carrier by contract (`learning-through-contrast.md` watch-for: "the pre-read carries depth; the opener restates" — the M5 opener stays untouched). Additions: one mechanism sentence each on the drift + plausible-but-wrong bullets (rot already carried its mechanism) + ONE new slide *Why these three, every run* = law claim (statistical machine, finite window, not bad luck) · readability payoff · Work-phase map anchor · governor. Governor is the ENACTED which-lens + quoted-moment question (M5 exercise Phase 1 forcing function + failure-mode-collapse watch-for); no new governor invented. Fixes-not-named discipline held: no reference / plan.md / verifier. Slide count 3 → 4 — rides both wirings, counts against the M4 and M5 raw-count question (fan-out eyeball queue #1). "Statistical machine" is earned here in one breath (next-likely-word sentence directly above); `the-loop-has-a-name.md`'s existing "statistical machine" clause now lands as recognition instead of arriving cold.

**Slides-only pass (2026-07-02, unaudited):** prose deleted outright where a slide supersedes it (Path A; git carries it). Per-passage verdicts: opening stepped-away paragraph CONVERTED into slide-1 bullet 1, "end of M4" module ref dropped (the module file owns placement) · "Here is the question that drives M5" CUT (sequencing; `run-the-first-experiment.md`'s pre-read pointer and `learn-from-the-test.md § Start here` carry it) · question + clock-scaling CONVERTED (slide 1) · three failure modes CONVERTED verbatim-close (slide 2), convergence claim kept as lead bullet ("the lens for the M5 read" → "the lens for the read") · Ronacher anchor CONVERTED (slide 3); "M5 diagnoses what" tease re-phrased module-free as "what that was is where your own read leads" (cliffhanger held, three-pattern still unnamed) · "What to bring to M5" section MOVED: bring-contract line added to `run-the-first-experiment.md § Bring to Module 5`; the lecture keeps a module-free closing bullet ("artefact on screen, three lenses in hand") · "M5 opens with..." closer CUT (module files sequence). §3 disposition: 1×M4 + 6×M5 refs, all dead or moved; zero `M[0-9]` above the fence.

**Quality:** compendium-audited 2026-07-08 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~410 words body (post slide rework + theory promotion).

**Time:** ~5 min read.

**Delivery mode:** Pre-read. Lands at the close of M4 Debrief, after the send-off prompt has been pasted. Re-projected at M5 open (wired in `learn-from-the-test.md § Start here`) — dual-wired file; body stays module-free so both placements read clean.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-07-02 result:CAVEAT due:cohort]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Go port, 10h / 2.2M tokens / lexer→parser→runtime / Rust snapshot reuse; all figures re-verified on page 2026-07-02. CAVEAT: post dated 2026-01-14 exits the 6-mo freshness window 2026-07-14 — at a Sep-2026 cohort cite it dated ("January 2026") or apply fallback. fallback: if stale at delivery, swap for a newer Ronacher post or peer practitioner with the same reference-artifact pattern.
- Three failure modes (goal drift / context rot / plausible-but-wrong): convergent practitioner vocabulary (no URL), sourced in the 2026-04-21 OODA at `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md`. Convergence IS the citation; if a single name is contested at review, drop the named-author tone and keep the practitioner-convergence framing.
- Mechanism sentences (next-likely-word; finite-window recall) carry no numbers by design; the sourced deep treatment lives at `supplementary/token-efficiency.md` (Anthropic effective-context-engineering + Chroma context-rot stamps there).

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

- section-3 sweep 2026-07-02: 2 refs judged, 0 fixed, 2 carve-out (map-position spine anchors — "Work phase" / "the far half"; body already module-free after the slides-only pass, sequencing verified in `run-the-first-experiment.md` § Bring to Module 5 + `learn-from-the-test.md` wiring).
