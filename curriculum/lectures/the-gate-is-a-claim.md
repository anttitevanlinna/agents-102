# The gate is a claim too

The re-send came back green. The verifier you built read the work and passed it. That green is worth exactly as much as the gate behind it, and the gate is a claim too. On the map it sits in the far half, the last check before the work ships. It can lie in five ways.

## Passing is not proof

- A gate only means what the gate can see. Green is a claim about the check, not a fact about the work. A result passes for three different reasons that look identical from outside: the judge is miscalibrated, the gate got gamed, or the run was a lucky sample.
- The check you built is itself a claim that wants verifying. The same scrutiny you point at the agent's work points at the thing that judges the work. A gate nobody has verified is a gate trusted on vibes.
- Each way a gate lies has its own countermove, and each is cheap. Hand-labels for the miscalibrated judge, a hold-out for the gamed gate, repeated runs for the lucky sample. All three cost less than the failure they hide.

## The judge needs calibrating against your labels

- A judge has an unknown floor until you measure it. A judge is a claim that its bar and your bar agree. Until that is checked against your own labels, a judge-gated pipeline passes work at an agreement rate no one has ever seen.
- The move is hand-label a sample, measure agreement, sharpen, repeat. Thirty outputs is enough to start. Grade them yourself, compare against the judge's verdicts, sharpen the judge prompt until the two converge, and re-check when the model or the task shifts. Hamel Husain reports better than 90% agreement after three iterations of exactly this loop.
- A good gate starts from real traces, not imagined failures. Read runs that actually happened, sort the real failures into buckets, and write the first check for the biggest bucket. A gate built from the armchair catches the failures you pictured and misses the ones you have.

## Gates decay

- A measure that becomes a target stops measuring. **Goodhart's law**, and the agent is an optimizer aimed straight at your gate. Tests get special-cased, judge prompts get keyword-stuffed, asserts get edited into agreement. No malice needed: optimization pressure finds the cheapest path to green.
- Passing while missing the intent is a signature, not bad luck. When work clears the gate and still is not what you meant, the gate has decayed into a target. That is a reason to refresh the gate, not to shrug.
- The countermoves are a hold-out and an integrity check. Keep a check the agent never sees, so nothing can optimize against it. After a suspicious pass, inspect the gate itself (the test file, the judge prompt, the asserts), not only its verdict.

## One run is a sample

- The agent's behavior is a distribution, not a property. One green run is an anecdote with survivorship bias. Reachable and dependable are different claims: passing once shows the task is reachable, passing again and again shows it is dependable. The second collapses far faster than the first.
- Before crediting an improvement, run it repeatedly. A new rule, a new prompt, a new gate: judge it on pass rates across several runs, not on the one run that followed the change. On a single run you cannot separate the change from ordinary run-to-run variance.
- A demo is pass-once evidence. An impressive run someone shows you proves the task is reachable, not that it is dependable. File it there.

## Change on recurrence, not on noise

- One stochastic miss is not a process failure. A system with run-to-run variance produces the odd miss even when nothing is wrong. Rewriting a rule after every single miss does not tighten the process, it churns it. W. Edwards Deming called this **tampering**: chasing ordinary variance case by case adds noise of its own.
- React on recurrence. The same failure shape returning is signal. That is when the rule changes, the gate refreshes, or the skill ships.
- Watch the regression-to-the-mean trap. After a bad run, the next run is usually better with no change at all. A tweak made right after a failure looks effective even when it did nothing.

A gate is one more claim in the system. Build it, then hold it to the same bar it holds the work to.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five law slides kept bullets; every bolded lead de-bolded. Two handles kept, at their naming sub-spans: **Goodhart's law** (Gates decay slide) and **tampering** (Deming, Change-on-recurrence slide); slides 1, 2, and 4 carry zero bold (headers carry the laws). Lede + closing line untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Mood:** gate-skepticism after the build. The verifier just landed the packaged re-send; this names why a green gate can still lie. Register is Boris-precise plus a Rory reframe (green is a claim, not proof), NOT reassurance and NOT resolved optimism. The closer opens doubt about the gate; it does not close it.

**No Quality line by design (unaudited).** Promoted from `supplementary/the-gate-is-a-claim.md` to a proper M5-close lecture in slide format; re-audit before ship.

**Placement:** M5 close, final lecture, immediately after `what-packaging-is.md`. Recognition-after-building (`check_lectures §1`): the student built a verifier and re-sent the packaged run before this page names the gate's own fallibility. No cross-module sequencing in the body (`check_lectures §3`); any onward pointer lives in the module file's `## Next`.

**Laws carried (5, one per slide):** green-is-a-claim (passing is not proof) · calibrate-the-judge · Goodhart/gate-decay · one-run-is-a-sample · don't-tamper (change on recurrence). Trimmed from the reference-dose supplementary: hold-out and integrity-check folded into the gate-decay slide; the error-analysis-first bullet kept tight on the calibrate slide (cut candidate — see eyeball). The demo-is-pass-once and regression-to-the-mean bullets kept as one-line traps.

**Frameworks riffed on:** Goodhart's law `[cultural-vocab]` (name-only) · W. Edwards Deming on tampering `[cultural-vocab]` (name-only) · judge-calibration loop credited to Hamel Husain inline (URL below) · regression-to-the-mean = statistics commons, un-attributed.

**EYEBALL (queue):**
- **Does this become THE M5 closer, landing AFTER `what-packaging-is.md`?** M5 then carries two back-to-back closing lectures (packaging ~12–15 min + this ~6–8 min). Confirm the combined closing dose fits the 1h45 runtime, or whether this trims to a shorter recognition beat.
- **Slide budget:** five slides, one law each. A closer is ~5–8 min; five sits at the top of that. Cheapest trim if tighter: the error-analysis-first bullet on *Calibrate the judge* (an eval-building move, not a gate-fallibility law) folds or drops without losing a law.
- **Any law to cut for dose:** the five are distinct failure modes of the gate. If one goes, *don't-tamper* (change on recurrence) is the most separable — it is a reaction policy rather than a gate-fallibility law — but it is one of the delivery gaps this promotion was meant to close, so cut it last.

**Lecture meta:** *6–8 min M5 closer, deck-shaped, five slides. Names the fallibility of the verifier the student just built. Earns each law from the gate in front of them, not cold.*

**Delivery mode:** In-room close, projected, after `what-packaging-is.md`.

**Time:** 6–8 min at presentation pace (recognition; the student built the gate this module).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/llm-judge/ — [practitioner direct] Hamel Husain (first-person byline confirmed), judge validated against a domain expert's labels, agreement tracked, ">90% agreement" in "three iterations" verbatim; "You cannot write a good judge prompt until you've seen the data." Anchors the calibrate-the-judge slide incl. the 90%/three-iterations number. fallback: drop the number, keep the move ("measure agreement against your own labels, iterate until you converge").
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/field-guide/ — [practitioner direct] Hamel Husain: "Error analysis - the single most valuable activity in AI development and consistently the highest-ROI activity"; bottom-up from actual data vs top-down assumed metrics. Anchors the error-analysis-first bullet. fallback: drop the name, teach as "the eval-building discipline practitioners converge on".
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://hamel.dev/blog/posts/evals/ — [practitioner direct] Husain byline confirmed, judge-vs-human agreement loop confirmed ("iterate on the prompt of the critique model to make it sufficiently aligned"), BUT this post leads with synthetic test cases, not error-analysis-first — the audit's original single-URL attribution was imprecise; the two URLs above carry the body claims. fallback: keep as supporting only; drop this URL and the body loses nothing.
- Goodhart's law — [cultural-vocab], name-only, no URL owed. Deming on tampering — [cultural-vocab], name-only, no URL owed.

**Quality:** compendium-audited 2026-07-08 (slides@47f3357)
- judges @47f3357: writing grandfathered, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy grandfathered, strategy grandfathered, slides PASS
