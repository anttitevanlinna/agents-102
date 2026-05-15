# Test and learn


---

Three modules in, the loops have been short. M1 closed a bug and wired a connector. M2 read one plan twice. M3 shipped a feature with security mapped and a test-strategy skill authored in conversation. Every one finished inside the session. All inside one session.

Today is structurally different. Today you launch a multi-hour task and close the laptop. The agent keeps going while you aren't there to steer. You'll come back to a result whenever the next M5 slot lands. That result is the point.

## The spirit

**You are testing, and you are learning.**

Every send-off, from today forward, is an experiment. The agent is the apparatus, your rules and context are the setup, the task is the assay, and the result is data. You don't need to get it right first time. You need to read the result and know what to change for the next run.

That's what separates a practitioner from a tourist. A tourist runs an agent and hopes. A practitioner runs an agent as a test and reads the data.

## The two-run arc

Today's experiment is the first of two. Same task, two runs across M4 → M5.

Run one. Today, un-packaged. You'll walk what you've built against the task, fill the worst gaps, and send it off with no plan.md, no verifier, no reference artifact. Just *"here's my system, go do X."* The agent will work with what you've given it.

Run two. M5, packaged. You'll read what came back, find what went wrong, and learn what packaging adds by watching each piece of Ronacher's three-pattern close a specific gap you just saw. Then re-send the same task, packaged.

The contrast is the lesson. No lecture on generic long-running-agent advice lands the way *you just watched this fail, here's what would have caught it* lands.

## One move you'll use today

**Gap analysis.** Walk the system you have against the system the task needs. Claude audits your setup as a subagent, returns a ranked list of thin spots, and you fill the worst three. You'll use this move on every future agent hand-off, forever. Not a template. A question: *what's between what I've got and what this task is asking for?*

## One rule about running the experiment

**Cancel is legitimate. Traces are data.**

If you launch the task and after twenty minutes you can see Claude is hallucinating file paths, arguing with itself, or missing a requirement you now realise wasn't in the prompt, stop it. You've got the data you need. Burning six hours to confirm it doesn't teach you more than stopping at twenty minutes with an observation.

What you owe the experiment is a result you can read, not a completed artifact. Any trace counts.

## What happens after

M5 opens with the return when the next slot lands. You read what came back, diagnose what went wrong, decide what to change.

**Rehearse, apply, fail, try again.** This is how practitioners run a first experiment: un-packaged, see what happens, read the result.

Walk your system. Fill the gaps. Send it off. Read what comes back.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@689e7e0 story@689e7e0 technical@689e7e0 behavior@689e7e0 pedagogy@689e7e0 strategy@689e7e0)
- judges @689e7e0: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Lecture meta:** *10–12 min lecture. Sets up M4's walk-and-send-off exercise. Names the spirit of the two-run arc and the one move the exercise opens with — gap analysis. Huryn's three-block memory is seeded in body language (walk-your-memory shape, no attribution) and lands by name at the exercise's Phase 3 when materials get rearranged. See strategy doc § Huryn.*
**Word count:** ~620 words body.

**Time:** 10–12 min at presentation pace. Don't rush; don't pad. The "spirit" section is load-bearing — it's where the experimental stance lands.

**Frameworks attributed:**
- **Gap analysis** — generic business-analysis framework; no single attribution. Named as *walk the system you have against the system the task needs.*
- **Huryn's three-block memory** — Paweł Huryn `[practitioner direct]`. NOT named in this lecture body — attribution lives at the M4 exercise Phase 3 (`walk-and-send-off.md`) when materials get rearranged. Freshness re-check required before first cohort delivery.
- **Ronacher's three-pattern** — Armin Ronacher `[practitioner direct]`. Named here only as forward reference to M5 (reference artifact + plan.md + external verifier). M5 owns the teaching; this lecture just puts the word on the table so the student knows what's coming.
- **Compound engineering** — Kieran Klaassen `[practitioner direct]`. Implicit in the *test → learn → encode* framing; not name-attributed in this lecture (Klaassen attribution lives at Debrief in M1 and here-onwards is experienced, not recited).

**Philosophy callouts:** none this lecture. The spirit itself is the beat; a further philosophy tag would dilute.

**Vision vs. detail:**
- Vision layer: the test-and-learn spirit, two-run arc framing, cancel-is-legit rule, experimental-stance positioning.
- Detail layer: Huryn three-block memory (needs URL + within-6-months source), Ronacher three-pattern (same).

**Watch-fors (delivery):**
- Don't slide past "the spirit is what separates practitioner from tourist" — that's the sentence that gives the module its mood. Land it.
- Don't pre-teach Ronacher's three-pattern. M5 does it through diagnosis; naming the pieces here steals M5's contrast.
- Don't turn "cancel is legit" into a disclaimer. It's a practitioner rule, not a safety net. Frame it as *what real operators do*, not *what nervous students can fall back on*.

**Source freshness:** Huryn `productcompass.pm/p/claude-md-snippets` verified at 2026-03-31 — within 6 months.

**Source verification, MUST DO before first cohort:**
- Re-open Huryn `https://www.productcompass.pm/p/claude-md-snippets` (200 verified 2026-05-15). Confirm the three-block frame language is still on the page. Fallback if removed: paraphrase the three blocks as observation-rule / decision-with-alternatives / quality-criterion, no name attribution — let M4 exercise Phase 3 carry the naming.
- Re-open Ronacher's three-pattern source `https://lucumr.pocoo.org/2025/6/12/agentic-coding/` (200 verified 2026-05-15). Confirm reference / plan / verifier vocabulary still maps to the three-pattern frame. Fallback: name the three patterns descriptively (reference artifact, plan file, external verifier) — M5 lecture owns the named-pattern teaching, this lecture is forward-pointer only.
- Re-open Klaassen compound-engineering `https://every.to/source-code/compound-engineering-the-definitive-guide` (200 verified 2026-05-15). The four-step loop is implicit framing here; explicit attribution lives at M1 Debrief and is experiential by M4. Fallback: no edit needed.
- 6-month re-check stamp at first cohort delivery. If any source 404s and fallback is taken, log a `[UNVERIFIED]` note in this maintainer block + flag at the M4 dry-run.
