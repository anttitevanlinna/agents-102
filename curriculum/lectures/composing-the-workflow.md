# Composing the workflow

You have a kit now: a test-strategy skill, a verifier, and a freshly drawn map of the moves worth packaging next. A workflow is those moves in the right order around one passage. Before you read how the field argues about composition, look at what composition actually is, on the passage you already sailed.

## You drew a control loop

{{figure:student-closed-loop}}

- You drew a control loop. Shape the session before it moves, watch what comes back, correct, encode. That is **feedback control** around a non-deterministic agent, and it is the shape the whole map has had from the start.
- The near half shapes; the far half corrects. Intent, context, and the plan set the target before the session starts; the far half reads what came back, takes up what passed, and encodes what the session taught, changing the system so the next session starts better.
- Verification is the sensor. A loop with no way to read its own result runs open: send the work off and hope. The checks you built are how this loop reads what came back. They are the part that lets the system catch its own error before it ships.
- The harness makes continuing possible. What a session gets right without you is set by what has accumulated around it: rules, durable state, checks, encoded corrections. The M4 send-off and the M5 re-send: same model, same harness, two different agents.

## A skill's footprint is where its job lands
<!--tier:3-->

{{figure:skill-sea-passage}}

- A **skill** is a named move you reach for. Single purpose, reusable, invoked by name. Your test-strategy and your verifier are moves you already own; your stack-map names the ones worth building next. You reach for one where the passage needs it, not rebuild it each session.
- Its **footprint** is wherever the job lands. One move takes a single fix at a turning point. Another carries a whole leg. A third runs at the pier, before the first leg. You never size a skill in advance. The job sizes it.
- Nothing here is new except the placing. A move now stands at each point you used to steer by hand. Where no move stands, you sail that stretch yourself.

## From skills to a workflow
<!--tier:3-->

- A session passes through phases: context, plan, build, verify, ship. A skill sits where its job sits. Its footprint is set by the job, not by the phase line.
- The field wires kits more ways than one; no way has won. Pocock ships a public kit with no orchestrator: you call each skill by hand. Klaassen chains steps through files on disk, a gate at every seam. Some workflows have a pilot; many do not.
- One documented kit wires skills. One skill names another as a precondition: **an explicit load**. One sequences and gates a chain: **an orchestrator**, the pilot. A rule in `./CLAUDE.md` matches a file or phrase: **routing**. One hands its output to the next: **a hand-off**. A skill that does one job and calls nothing is a **leaf**.
- A workflow is not only steps in order. At a seam, a check or stop condition decides whether the next step may begin.
- Chaining generation without checks only moves work into the review queue faster.
- Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment.

## Composition is a live argument, so you read
<!--tier:3-->

How the field composes kits like this is a live argument with no settled answer, so there is no prompt to drill here. The move is to read: one engineer's whole worked stack, then the wider field.

[Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md)

[Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md)

Pick the shape that resembles your day.

<!-- maintainer -->

**Lean pass (2026-08-25):** cut "Same passage, same drift, same fixes and guardrails." from slide-1 bullet 3 — the figure shows it. Do not restore.

**Emphasis budget (Antti-directed "go very lightly on the bold"):** bold = handles only — slide 1: **skill** + **footprint** sub-spans (third bullet plain); slide 2: the four wiring mechanisms (**an explicit load** / **an orchestrator** / **routing** / **a hand-off**) plus **leaf** at its definition; *pilot* stays plain as the chart-to-field bridge; all other bullets plain (the chart caption already carries "the value is the order, not the count") — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, SVG, and the two supplementary links carry no bold.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS

**Framing provenance (5-framing / 3-judge panel, 2026-07-04).** The skills-on-the-passage concept was stress-tested. Winner: *footprint follows the job* — a skill's footprint is wherever its job lands (one turning point, one leg, or the whole trip), never sized in advance. This dissolves the granularity question into one rule instead of a fixed per-feature mapping (the rejected `fix = verifier` trap). Retired: *phases-as-legs* as the chart spine (Antti's steer) — `leg = phase = skill` re-commits the same fixed-mapping error one level up, and a linear phase chain cannot seat the loop (re-invocation has to arc back across the chart). The phase vocabulary survives in slide-2 bullet 1 as prose, teaching scope is NOT phase-bound (a move spans what its job spans), rather than as a chart spine. Load-bearing correction carried in BOTH chart and body: not every workflow has an orchestrator. The bold oxblood hand-off arrow + the Pocock bullet (a whole public kit with no orchestrator at all) + the pilot bullet ("many do not") inoculate against the orchestrator-always error the bracket/leaf framings quietly teach.

**Figure.** Derived from `protos/m6-skill-passage-01-footprint.html` (Antti chose proto 01 of a 3-proto set: 01 footprint / 02 phase-backdrop / 03 phase-spine; 02 + 03 stay in `protos/` as alternates, PNGs in session scratchpad). Base geometry is the M5 passage chart from `what-packaging-is.md`, byte-unchanged (same cream/teal/oxblood palette, same drift cones, fixes, guardrails, lighthouse, ghost, spot); only the label layer swapped to the kit (the mapped next move at the pier, test-strategy across a leg, verifier at the orange-ring fix) plus the under-drawn pilot and the weighted hand-off. SVG inlined byte-clean: comments and interior blank lines stripped (marked terminates the raw-HTML block on ANY interior blank line, same failure mode as `the-whole-map.md` / `the-map-filled-in.md`). Single id `sk-reefhatch`, `sk-` prefixed against collision if the theory handbook renders multiple charts on one page.

**Vocabulary bridge (earned once).** move = skill (slide-1 bullet 1; slide 2 then speaks *skill* throughout — the noun *move* stays on slide 1 where the chart defines it, avoiding the moves-verb/move-noun collision); pilot = orchestrator (slide-2 pilot bullet); leaf = a skill that does one job and calls nothing (same bullet). The chart speaks nautical (pilot); the supplementaries speak Dino (orchestrator, leaf); the slide bridges them so chart, slide, and reads are one system. Do not re-earn in the supplementaries. Session/task/run vocabulary per `check_student_facing.md §21b`.

**§3 disposition (no cross-module sequencing in body).** The kit is named by what it is ("test-strategy skill, verifier, and a freshly drawn map of the moves worth packaging next") — backward recognition, not forward sequencing. No `M[0-9]` tags in body. The chart callback ("the passage you already sailed") is spine-anchoring on the shared M5 image, not a cross-module ref.

**Length discipline.** The lecture is concrete-teacher-plus-pointer, not survey-pointer. Ceiling: lede + the figure slide + one mechanics slide + the two reads. The variety sentences on slide 2 (Pocock by hand, Klaassen through files, one documented kit) are the ceiling for in-body field coverage; do NOT re-import the full lineages walk — it lives in `workflow-composition-lineages.md`. New composition discoveries land in the supplementary; the lecture body changes only if a mechanism is renamed at the field level, a wiring shape gains or loses currency, or the student's kit shape changes.

**Headers (squint + truth, `check_lectures §4`).** *A skill's footprint is where its job lands* (slide 1, thesis-claim, matches the chart's own bottom caption); *From skills to a workflow* (slide 2, names the composition concept the slide teaches in its variety). No orphan-mystery, no empty container.

**Lecture meta:** *Opens the loop beat with the control-loop slide (from `the-map-filled-in.md`, T1), then three T3 slides teaching what a workflow-of-skills IS on the M5 passage, handing off to the worked example and the field survey. The register-shift line ("no prompt to drill; the move is to read") stays. Title awaits a card now that the file opens on the loop.*

**Time:** 6 min at presentation pace.

**Delivery mode:** In-room, chart projected. Barebones drops the three T3 slides and keeps the control loop.

<!-- backing -->

Claims
- `a-workflow-is-moves-in-order` · vision · "A workflow is those moves in the right order around one passage." ← none-owed
- `skill-is-a-named-move` · vision · "A **skill** is a named move you reach for. Single purpose, reusable, invoked by name." ← none-owed
- `footprint-follows-the-job` · vision · "Its **footprint** is wherever the job lands." ← none-owed
- `never-size-a-skill-in-advance` · vision · "You never size a skill in advance. The job sizes it." ← none-owed
- `nothing-new-except-the-placing` · vision · "Nothing here is new except the placing." ← none-owed
- `moves-are-not-phase-bound` · vision · "Its footprint is set by the job, not by the phase line." ← none-owed
- `four-wiring-mechanisms` · detail · "One documented kit wires skills. … **an explicit load** … **an orchestrator** … **routing** … **a hand-off**" ← skill-stacking-supp
- `field-wires-more-ways-than-one` · detail · "The field wires kits more ways than one; no way has won." ← lineages-supp
- `pocock-by-hand` · detail · "Pocock ships a public kit with no orchestrator: you call each skill by hand." ← lineages-supp
- `klaassen-file-chained` · detail · "Klaassen chains steps through files on disk, a gate at every seam." ← lineages-supp
- `many-kits-keep-zero-pilots` · detail · "Some workflows have a pilot; many do not." ← skill-stacking-supp, lineages-supp
- `pilot-and-leaf-defined` · detail · "**an orchestrator**, the pilot … A skill that does one job and calls nothing is a **leaf**." ← skill-stacking-supp
- `seam-check-decides-whether-next-step-begins` · vision · "At a seam, a check or stop condition decides whether the next step may begin." ← none-owed
- `unchecked-generation-fills-the-review-queue` · vision · "Chaining generation without checks only moves work into the review queue faster." ← none-owed
- `workflow-designer-owns-checks-routes-exceptions` · vision · "Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment." ← none-owed
- `composition-is-a-live-argument` · detail · "How the field composes kits like this is a live argument with no settled answer" ← lineages-supp

Sources
- skill-stacking-supp `[checked:2026-07-05 result:OK due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/skill-stacking.md` carries the primary stamps for the four composition mechanisms and the `/ship`-as-pilot worked example (Dino's in-repo stack). A worked example of a shipped kit does not expire. **`/ship` is Dino's own skill, NOT a Claude Code built-in** — the chart keeps the orchestrator generic ("the pilot") and the named example stays in the supplementary, which is the whole reason this body carries no product name. fallback: re-verify in that doc if its own stamps age out.
- lineages-supp `[checked:2026-08-01 result:CAVEAT due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md` carries the field-survey lineages and their per-source stamps. **`due:none` is the delegated variant** (`backing-format.md` § Delegated): the delegation does not expire, the delegate's own stamps do, and `source-freshness.sh` already walks that file. `checked:` still means what it says here: the date this pointer was last confirmed to aim at the right file. fallback: this lecture asserts no dated specific of its own; if the supplementary's lineages change, only the "live argument" claim here is affected, and that claim gets *stronger* when the field moves.

Frameworks
- Footprint follows the job · [borrow:none] · law:none · ← none — house framing, chosen over phases-as-legs in a 5-framing / 3-judge panel (2026-07-04); the rejected alternative re-committed the fixed-mapping error one level up
- Orchestrator / leaf · [borrow:distributed systems] · law:none · ← skill-stacking-supp — Dino's vocabulary, bridged once to the chart's nautical *pilot*
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the phase chain (context, plan, build, verify, ship) is the cycle in run-local form

Stance `[stance:2026-08-01 level:L1]`
- holds: that composition comes in recorded variety — called by hand (Pocock), chained through files (Klaassen), authored wiring in the one fully documented kit — and that the four wirings are scoped in-body to that kit, not taught as a field taxonomy. Every named specific delegates to the two supplementaries; the one field-level assertion is that no way has won, which the lineages' own stance supports at L2.
- contested: whether the four wirings are the complete set. Nobody has enumerated composition mechanisms across kits (the delegate's stance says so in as many words), which is exactly why the body scopes the count to one kit and teaches the variety first.
- decided: **delegated stamps take `due:none`, 2026-08-02.** This file's `due:2026-11-25` pointed at a delegate checked 2026-05-25 that had since been corrected and re-stamped, so the pointer aged against a fact it did not own. The pointer is legitimate; a computed date on it is a second copy of the delegate's freshness that nothing in the toolchain compares. Rule now in `backing-format.md` § Delegated.
- would-move-it: a second fully documented kit (takes the wirings claim from L1 toward L2), a mechanism renamed at field level, or a fifth wiring gaining currency — each edits slide 2. Convergence on one composition shape would break the "live argument" framing and turn the variety bullet into a recommendation.

OODA
- question: have the four wiring mechanisms held their names, and has a fifth appeared?
- roster: Dino (skill-stacking), Kieran Klaassen, Simon Willison, Geoffrey Huntley, the Amp Chronicle, Anthropic's skills documentation
- last-run: 2026-08-01

<!-- /backing -->
