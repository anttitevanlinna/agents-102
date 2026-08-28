# Verification asymmetry

## Checking can cost far less than doing

- Some tasks are far cheaper to check than to do. Reviewing a diff against a failing test versus writing the feature. Checking a sudoku versus solving it. The gap between doing-cost and checking-cost is the asymmetry.
- Some are the reverse. A fact-dense report reads clean whether it is true or not; checking it costs as much as writing it. No asymmetry, no discount.
- Jason Wei named the pattern: "some tasks are much easier to verify than to solve." His corollary, **the verifier's rule**: the ease of training AI to solve a task is proportional to how verifiable the task is, because a cheap check is exactly the feedback signal training and eval loops run on. His own example is code: tedious to read for correctness, fast to check when the test coverage is there.

## Why this decides what to delegate

- Delegation pays where the check is cheap. You hand over the making, keep the cheap checking, and the loop runs fast. The agent generates; you gate.
- Where the check is expensive, delegation is a trap. You saved the writing and bought a harder review. The full cost comes back to you at read time.
- M2 used this without naming it: **find is easier than judge**. The agent finds candidates; you judge them. That was the asymmetry in its smallest form, and it runs through the whole far half of the map.

## Every send-off needs a named cheap verifier

- Before a send-off, ask: what is my cheap verifier here? A failing test, a compiler, a diffable expected output, a checklist a fresh session can run. If you can name one, the task is a delegation candidate.
- No cheap verifier? Keep the task, or build the verifier first and then delegate. Building the verifier is often the more valuable half of the work: it outlives the session it checks.
- Every verifier you write converts one more task family from delegation-trap to delegation-win. That is why checks are worth authoring at all.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** handles kept bold: **the verifier's rule** (Wei's coinage at its naming) and **find is easier than judge** (the named M2 law at its recall); all other bullet leads de-bolded, Wei quote plain, governor question plain, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Re-audit before ship.

**Naming correction (2026-07-26):** body + maintainer block corrected from "the verifier's law" to "the verifier's rule" per BLOCKING finding (rule 1a, curriculum/evals/ae101-full-reeval-2026-07-12.md:365). Live re-fetch of jasonwei.net on 2026-07-26 confirms: the post's H1 reads "Asymmetry of verification and verifier's rule" and the in-body named-principle heading reads "Verifier's rule." "Law" appears only in the URL slug (asymmetry-of-verification-and-verifiers-law), which is left as-is since that's the real, unchangeable URL. Not a deliberate rename; the 2026-07-02 check missed this. See updated source-verification stamp below.

**STATUS:** slide-format, proper-length bullets per `theory-plan.md` § Slide format. Not an in-room slot; linked as an optional pre-read from `run-the-first-experiment.md § Pre-reads before Module 5`. Audited — see the Quality line below. Tier-1 canon adoption per `theory-audit.md` (practitioner + syllabus lenses convergent; already enacted in M2 body as "find is easier than judge", `exercises/push-back-on-the-plan.md:52` — the body's M2 back-reference is deliberate lineage-naming, kept per the audit's cheap-groundedness call; supplementary surface, not a lecture body, so `check_lectures §3` sequencing ban doesn't bind, and the ref is backward-naming of a lived moment, not sequencing).

**Placement:** supplementary, linked from M4 where the send-off decision makes the asymmetry a governor. Cross-link to [What keeps a long-running session going?](../../../lectures/what-keeps-a-long-running-session-going.md): asymmetry says where checks are cheap; the post-launch closer names what their pushback buys. M5 builds and calibrates those checks; M6 composes them into workflow seams.

**Laws carried:** verification-asymmetry / verifier's rule · the delegation governor (cheap-verifier question). Sharpens convergence-triad's "independently verifiable" leg into a cost ratio (see audit — triad itself still owed a durable home). The triad, 0.85ⁿ, and principal–agent stay OUT of this page (M4-adjacent surface; packaging laws earn at M5).

<!-- backing -->

Claims
- `some-tasks-are-cheaper-to-check-than-do` · vision · "Some tasks are far cheaper to check than to do." ← none-owed
- `some-are-the-reverse` · vision · "A fact-dense report reads clean whether it is true or not; checking it costs as much as writing it." ← none-owed
- `wei-named-the-pattern` · detail · "some tasks are much easier to verify than to solve" ← wei-asymmetry
- `verifiers-rule` · borrowed · "His corollary, **the verifier's rule**: the ease of training AI to solve a task is proportional to how verifiable the task is" ← wei-asymmetry
- `delegation-pays-where-the-check-is-cheap` · vision · "You hand over the making, keep the cheap checking, and the loop runs fast." ← none-owed
- `expensive-check-makes-delegation-a-trap` · vision · "You saved the writing and bought a harder review. The full cost comes back to you at read time." ← none-owed
- `find-is-easier-than-judge` · vision · "**find is easier than judge**" ← none-owed
- `name-your-cheap-verifier-before-a-send-off` · vision · "Before a send-off, ask: what is my cheap verifier here?" ← none-owed
- `build-the-verifier-first-then-delegate` · vision · "Building the verifier is often the more valuable half of the work: it outlives the session it checks." ← none-owed
- `each-verifier-converts-a-task-family` · vision · "Every verifier you write converts one more task family from delegation-trap to delegation-win." ← none-owed

Sources
- wei-asymmetry `[checked:2026-07-26 result:OK due:none]` https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law — [practitioner direct] Jason Wei, 2025-07-15. A dated framework piece, not a freshness-bound evidence claim, so **`due:none` under the durable-account variant** — the previous `due:2027-01-26` would have re-opened a published essay on a calendar rather than on a reason. Re-verified verbatim 2026-07-26, correcting the 2026-07-02 check: **Wei's own H1 and in-body heading both read "Verifier's rule," not "law"** — "law" survives only in the stale URL slug, and body plus maintainer block now say *rule* throughout. Also re-confirms the coding example (*"if you have test cases with ample coverage, you can quickly check any given solution"*), which is exactly what the body's example bullet is scoped to. **The post does NOT claim coding fell to AI early, so the body does not either.** fallback: teach the asymmetry unattributed as a field observation; drop the "verifier's rule" naming.

Frameworks
- Verification asymmetry / the verifier's rule · [borrow:none] · law:none · ← wei-asymmetry — practitioner-coined, credited by name in body
- Find is easier than judge · [borrow:none] · law:none · ← none — the in-room form of the same asymmetry, named at M2 before this page exists
- Comparative advantage · [borrow:economics] · law:comparative-advantage · ← cultural-vocab — hand the agent what it is relatively best at, keep the cheap check
- Convergence triad · [borrow:none] · law:convergence-triad · ← none — this page sharpens the triad's *independently verifiable* leg into a per-task question

Stance `[stance:2026-08-01 level:L1]`
- holds: the asymmetry itself, which Wei named and which is closer to an observation about problem classes than a claim about the field. One named practitioner is L1, and the body attributes accordingly rather than saying practitioners converge — **a discipline this corpus learned the hard way elsewhere and got right here first.**
- contested: nothing in the asymmetry. What is genuinely open is the corollary's strong form — that verifiability predicts what AI solves next — which is a forecast, and the body carries it as Wei's corollary rather than as our prediction.
- would-move-it: a task class that is cheap to check and stubbornly unsolved, which would weaken the corollary without touching the delegation advice. The delegation half stands on its own arithmetic.

OODA
- question: has the verifier's-rule corollary held as a predictor, and has anyone put numbers on doing-cost versus checking-cost for real engineering tasks?
- roster: Jason Wei, METR, Hamel Husain, Anthropic and OpenAI eval publications
- last-run: 2026-08-01

<!-- /backing -->
**Quality:** compendium-audited 2026-08-28 (writing@0cea7581 story@0cea7581 technical@8cc00874 behavior@b3143a4 pedagogy@1abb84c6 strategy@b3143a4 slides@0cea7581)
- judges @0cea7581: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
