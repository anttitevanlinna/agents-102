# Test and learn

## Every send-off is an experiment

You are testing, and you are learning. Every send-off from here on is an experiment. The agent is the apparatus, your rules and context are the setup, the task is the assay, and the result is data.

You don't need to get it right first time. You need to read the result and know what to change for the next run. That is the whole obligation.

A tourist runs an agent and hopes; a practitioner runs a test and reads the data. The difference is not the outcome of the run. It is what you can say afterwards about why.

## The two-run arc

- Same task, two runs. Run one goes now, un-packaged: no plan.md, no verifier, no reference artifact. Just *"here's my system, go do X."* The agent works with exactly what you've given it.
- Run two goes packaged, after you've read the return. You find what went wrong, watch each packaging piece close a specific gap you just saw, and send the same task again.
- The contrast is the lesson. No generic long-running-agent advice lands the way *you just watched this fail, here's what would have caught it* lands. Un-packaged first is by design.

## Gap analysis: walk your system against the task

- **Gap analysis**: walk the system you have against the system the task needs. Claude audits your setup as a subagent and returns a ranked list of thin spots.
- Not a template. A question. *What's between what I've got and what this task is asking for?* You'll use it on every future agent hand-off.
- The agent finds the thin spots; you judge which ones matter. A ranked list is candidates, not verdicts. Which gaps will hurt on this task is your call, and filling the worst few beats closing them all.

## Cancel is legitimate; traces are data

- Cancel is legitimate; traces are data. If twenty minutes in you can see Claude hallucinating file paths, arguing with itself, or missing a requirement that wasn't in the prompt, stop it. You have the data you came for.
- You owe the experiment a result you can read, not a completed artifact. Letting it run another hour teaches you less than stopping at twenty minutes with an observation. Any trace counts.
- Fifteen to thirty minutes buys the clues the read needs. Engineers run these for hours at work when the task warrants it; ambition and length grow run by run.

Walk your system. Fill the gaps. Send it off. Read what comes back.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** slide 1 (spirit opener) joined into three prose paragraphs, sentences near-verbatim; the tourist/practitioner koan stays plain. Slides 2 and 4 keep bullets with zero bold. Slide 3 keeps one handle: **Gap analysis** at its naming, rest of the lead plain. Closing march kicker untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. No claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** prose deleted outright where a slide supersedes it (Path A; git carries it). Per-passage verdicts: stray leading `---` CUT · intro recap paragraph ("Three modules in... M1 closed a bug, M2 read one plan, M3 shipped a feature") SUBSUMED (the module file's `## Start here` already carries the short-loops-behind-you contrast; module numbering dies per §3) · "Today is structurally different / step away / come back whenever the next M5 slot lands" paragraph SUBSUMED into the module opener + `## Next` (sequencing lives there); its unique operational line (15–30 min is enough) CONVERTED into the last slide's third bullet · spirit section CONVERTED (slide 1; tourist/practitioner line kept as a bullet, load-bearing per delivery watch-for) · two-run arc CONVERTED (slide 2) with "M4 → M5" and "Run two. M5, packaged" module refs dead; "Ronacher's three-pattern" name DROPPED from body (attribution-cap fix, `check_writing §11`: Ronacher's M4 student-side mention lives in `reading-the-return.md`; M5 owns the naming — absence-enumeration "no plan.md, no verifier, no reference artifact" kept, deliberate) · gap-analysis section CONVERTED (slide 3) + find-vs-judge bullet added (arms the Phase-2 pick-the-worst-three move) · cancel-is-legitimate CONVERTED (slide 4) · "What happens after" section CUT ("M5 opens with the return" sequencing = module `## Next`'s job; "Rehearse, apply, fail, try again" dropped as redundant with slide 1) · closing march KEPT as kicker. §3 disposition: M1/M2/M3/M4 + 5×M5 refs all dead or subsumed; zero `M[0-9]` above the fence.

- section-3 sweep 2026-07-02: 0 refs remaining to fix — the plan's 5 M5-refs (plus M1–M4 hits) were already removed by the same-day slides-only pass above; verified zero `M[0-9]`/module-name hits above the fence. 3 arc-temporal phrases judged not-sequencing ("from here on", "every future hand-off", the two-run arc — no module named; exercise-internal arc). Owning module `run-the-first-experiment.md` confirmed carrying the dropped sequencing in `## Start here` (short-loops contrast) and `## Next` ("Module 5 opens with...").

**Quality:** compendium-audited 2026-07-08 (writing@689e7e0 story@689e7e0 technical@689e7e0 behavior@689e7e0 pedagogy@689e7e0 strategy@689e7e0 slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Lecture meta:** *10–12 min lecture, now deck-shaped (4 slides + kicker). Sets up M4's walk-and-send-off exercise. Names the spirit of the two-run arc and the one move the exercise opens with — gap analysis. Huryn's three-block memory is seeded in body language (walk-your-memory shape, no attribution) and lands by name at the exercise's Phase 3 when materials get rearranged. See strategy doc § Huryn.*
**Word count:** ~380 words body (post slide rework).

**Time:** 10–12 min at presentation pace. Don't rush; don't pad. The "spirit" slide is load-bearing — it's where the experimental stance lands.

**Frameworks attributed:**
- **Gap analysis** — generic business-analysis framework; no single attribution. Named as *walk the system you have against the system the task needs.*
- **Huryn's three-block memory** — Paweł Huryn `[practitioner direct]`. NOT named in this lecture body — attribution lives at the M4 exercise Phase 3 (`walk-and-send-off.md`) when materials get rearranged. Freshness re-check required before first cohort delivery.
- **Ronacher's three-pattern** — Armin Ronacher `[practitioner direct]`. No longer named in this body (2026-07-02 slides-only pass; attribution-cap + M5-owns-the-naming). The pieces appear only by deliberate absence ("no plan.md, no verifier, no reference artifact"). M5 owns the teaching and the name.
- **Compound engineering** — Kieran Klaassen `[practitioner direct]`. Implicit in the *test → learn → encode* framing; not name-attributed in this lecture (Klaassen attribution lives at Debrief in M1 and here-onwards is experienced, not recited).

**Philosophy callouts:** none this lecture. The spirit itself is the beat; a further philosophy tag would dilute.

**Vision vs. detail:**
- Vision layer: the test-and-learn spirit, two-run arc framing, cancel-is-legit rule, experimental-stance positioning.
- Detail layer: Huryn three-block memory (needs URL + within-6-months source), Ronacher three-pattern (same).

**Watch-fors (delivery):**
- Don't slide past "a tourist runs an agent and hopes; a practitioner runs a test and reads the data" — that's the sentence that gives the module its mood. Land it.
- Don't pre-teach Ronacher's three-pattern. M5 does it through diagnosis; naming the pieces here steals M5's contrast.
- Don't turn "cancel is legit" into a disclaimer. It's a practitioner rule, not a safety net. Frame it as *what real operators do*, not *what nervous students can fall back on*.

**Source freshness:** Huryn `productcompass.pm/p/claude-md-snippets` verified at 2026-03-31 — within 6 months.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-09-30]` https://www.productcompass.pm/p/claude-md-snippets — [practitioner direct] Huryn three-block CLAUDE.md memory (Knowledge Architecture / Decision Journal / Quality Gate), Mar 31 2026. fallback: if removed, paraphrase as observation-rule / decision-with-alternatives / quality-criterion, no name attribution; M4 Phase 3 carries the naming.
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — [practitioner direct, historical Jun-2025] Ronacher agentic-coding principles; re-verified live 2026-07-02 (byline + Jun 12 2025 date hold); does NOT carry verbatim reference/plan/verifier triad + out of freshness window. fallback: anchor the three-pattern to the in-window MiniJinja port (C-2); keep this post as dated principles only.
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen Definitive Guide (Feb 9 2026); re-verified live 2026-07-02; core "each unit makes the next easier" thesis verified, source exits 6-mo window 2026-08-09 (before a Sep-2026 cohort — apply fallback or date it then), explicit plan/work/review/compound naming is convergent-across-appearances not verbatim-on-page. fallback: phrase as "the four-step loop that runs through his work"; treat any Every.to outcome metric as vendor-self-reported.
