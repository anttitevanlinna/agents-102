# Composing the workflow

You have a kit now: a test-strategy skill, a verifier, and a freshly drawn map of the moves worth packaging next. A workflow is those moves in the right order around one passage. Before you read how the field argues about composition, look at what composition actually is, on the passage you already sailed.

## A skill's footprint is where its job lands

<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="The sea-passage chart re-annotated: your kit placed where each job lands (a verifier at one fix, a test-strategy across one leg, the next mapped move at the start pier), an under-drawn pilot bracket over the whole trip, and a bold hand-off arrow between two legs showing a workflow with no orchestrator." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<defs>
 <pattern id="sk-reefhatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
 <line x1="0" y1="0" x2="0" y2="7" stroke="#a05a2c" stroke-width="1" opacity="0.45"/>
 </pattern>
</defs>
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<g font-family="ui-monospace, Menlo, Consolas, monospace" font-size="8.5" fill="#786c56" opacity="0.5" text-anchor="middle">
 <text x="250" y="388">14</text>
 <text x="330" y="448">18</text>
 <text x="390" y="252">9</text>
 <text x="300" y="330">12</text>
 <text x="900" y="312">21</text>
 <text x="1140" y="252">16</text>
 <text x="600" y="182">4</text>
 <text x="540" y="430">3</text>
 <text x="655" y="410">2</text>
</g>
<g fill="#786c56" opacity="0.35">
 <circle cx="280" cy="470" r="0.9"/><circle cx="450" cy="512" r="0.9"/>
 <circle cx="700" cy="178" r="0.9"/><circle cx="985" cy="332" r="0.9"/>
 <circle cx="530" cy="132" r="0.9"/><circle cx="1120" cy="330" r="0.9"/>
</g>
<g stroke="#786c56" fill="none" opacity="0.5">
 <circle cx="190" cy="468" r="28" stroke-width="1"/>
 <circle cx="190" cy="468" r="3" stroke-width="1"/>
 <line x1="190" y1="436" x2="190" y2="500" stroke-width="0.8"/>
 <line x1="158" y1="468" x2="222" y2="468" stroke-width="0.8"/>
 <line x1="170" y1="448" x2="210" y2="488" stroke-width="0.5"/>
 <line x1="210" y1="448" x2="170" y2="488" stroke-width="0.5"/>
</g>
<polygon points="190,440 186,452 194,452" fill="#786c56" opacity="0.6"/>
<text x="190" y="430" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="8.5" letter-spacing="1.5" fill="#786c56" opacity="0.6">N</text>
<path d="M470,560 C480,520 495,485 520,462 C560,428 600,450 640,445 C700,438 722,428 760,418 C800,408 840,424 880,428 C930,433 960,430 1000,430 C1040,430 1080,427 1120,426 C1150,425 1175,424 1200,424 L1200,560 Z" fill="url(#sk-reefhatch)" stroke="#a05a2c" stroke-width="1" opacity="0.9" stroke-opacity="0.5"/>
<g stroke="#a05a2c" stroke-width="1" opacity="0.55">
 <path d="M556,496 l8,8 M564,496 l-8,8 M560,494 l0,12"/>
 <path d="M646,478 l8,8 M654,478 l-8,8 M650,476 l0,12"/>
 <path d="M756,456 l8,8 M764,456 l-8,8 M760,454 l0,12"/>
 <path d="M896,466 l8,8 M904,466 l-8,8 M900,464 l0,12"/>
 <path d="M1046,452 l8,8 M1054,452 l-8,8 M1050,450 l0,12"/>
 <path d="M1146,466 l8,8 M1154,466 l-8,8 M1150,464 l0,12"/>
 <path d="M616,528 l8,8 M624,528 l-8,8 M620,526 l0,12"/>
 <path d="M976,506 l8,8 M984,506 l-8,8 M980,504 l0,12"/>
</g>
<path d="M470,545 C480,505 492,470 516,446 C556,414 600,434 642,428 C700,421 722,410 762,400 C802,392 842,404 882,412 C932,417 962,414 1002,414 C1042,414 1082,411 1122,410 C1152,409 1176,408 1198,408" fill="none" stroke="#a05a2c" stroke-width="1.3" stroke-dasharray="6 5" opacity="0.8"/>
<g stroke="#a05a2c" stroke-width="1" opacity="0.6">
 <line x1="540" y1="438" x2="545" y2="446"/>
 <line x1="620" y1="430" x2="625" y2="438"/>
 <line x1="700" y1="416" x2="705" y2="424"/>
 <line x1="780" y1="398" x2="785" y2="406"/>
 <line x1="860" y1="408" x2="865" y2="416"/>
 <line x1="940" y1="415" x2="945" y2="423"/>
 <line x1="1020" y1="413" x2="1025" y2="421"/>
 <line x1="1100" y1="411" x2="1105" y2="419"/>
 <line x1="1180" y1="408" x2="1185" y2="416"/>
</g>
<path d="M115,168 L987,600 Q1182,522 1073,344 Z" fill="#786c56" fill-opacity="0.09" stroke="#786c56" stroke-width="1" stroke-dasharray="4 6" opacity="0.45"/>
<path d="M115,168 C420,248 720,348 1030,472" fill="none" stroke="#786c56" stroke-width="1.8" stroke-dasharray="5 7" stroke-linecap="round" opacity="0.5"/>
<polygon points="496,278 482,279 485,270" fill="#786c56" opacity="0.55"/>
<g stroke="#8a3a2a" stroke-width="2.2" opacity="0.85" stroke-linecap="round">
 <line x1="1022" y1="464" x2="1038" y2="480"/>
 <line x1="1038" y1="464" x2="1022" y2="480"/>
</g>
<g fill="#2f6b6b" fill-opacity="0.12" stroke="#2f6b6b" stroke-opacity="0.25" stroke-width="0.7">
 <path d="M115,168 L290,264 Q331,250 310,212 Z"/>
 <path d="M300,238 L474,215 Q496,184 462,169 Z"/>
 <path d="M758,352 L966,248 Q979,200 930,196 Z"/>
 <path d="M948,222 L1091,148 Q1099,115 1065,112 Z"/>
</g>
<path d="M468,192 L736,392 Q806,379 780,312 Z" fill="#2f6b6b" fill-opacity="0.16" stroke="#2f6b6b" stroke-opacity="0.35" stroke-width="0.8"/>
<path d="M115,168 L300,238 L468,192 L758,352 L948,222 L1078,130" fill="none" stroke="#2f6b6b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
<g fill="#2f6b6b" opacity="0.9">
 <polygon points="218,207 203,208 207,197"/>
 <polygon points="398,211 387,219 384,210"/>
 <polygon points="617,274 603,272 608,263"/>
 <polygon points="862,281 854,293 848,285"/>
 <polygon points="1020,171 1012,183 1006,175"/>
</g>
<g stroke="#2f6b6b" stroke-width="1.1" opacity="0.55">
 <line x1="176" y1="195" x2="178" y2="187"/>
 <line x1="411" y1="203" x2="413" y2="211"/>
 <line x1="563" y1="249" x2="567" y2="242"/>
 <line x1="661" y1="303" x2="665" y2="296"/>
 <line x1="819" y1="306" x2="823" y2="312"/>
 <line x1="1028" y1="165" x2="1032" y2="171"/>
</g>
<circle cx="115" cy="168" r="8" fill="none" stroke="#2f6b6b" stroke-width="1.2" opacity="0.5"/>
<circle cx="115" cy="168" r="4" fill="#2f6b6b"/>
<g>
 <g fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.8">
 <circle cx="300" cy="238" r="5.5"/>
 <circle cx="468" cy="192" r="5.5"/>
 <circle cx="758" cy="352" r="5.5"/>
 <circle cx="948" cy="222" r="5.5"/>
 </g>
 <g fill="#2f6b6b">
 <circle cx="300" cy="238" r="1.5"/><circle cx="468" cy="192" r="1.5"/>
 <circle cx="758" cy="352" r="1.5"/><circle cx="948" cy="222" r="1.5"/>
 </g>
 <circle cx="758" cy="352" r="9.5" fill="none" stroke="#a05a2c" stroke-width="1.2" opacity="0.8"/>
</g>
<g opacity="0.7">
 <polygon points="832,440 844,440 841,424 835,424" fill="#a05a2c" opacity="0.7"/>
 <circle cx="838" cy="419" r="2.5" fill="#a05a2c" opacity="0.7"/>
 <g stroke="#a05a2c" stroke-width="1" opacity="0.6">
 <line x1="829" y1="414" x2="824" y2="410"/>
 <line x1="847" y1="414" x2="852" y2="410"/>
 <line x1="838" y1="409" x2="838" y2="403"/>
 </g>
</g>
<path d="M0,150 C60,146 90,143 115,140 C170,132 240,122 300,114 C350,108 390,108 430,112 C470,116 500,100 525,96 C555,92 572,99 588,105 C620,117 645,120 665,117 C705,112 735,104 762,97 C795,89 822,77 852,75 C885,73 915,86 945,94 C975,102 1010,124 1042,148 L1054,148 C1058,128 1062,114 1078,110 C1094,114 1098,128 1102,148 L1114,148 C1140,150 1170,146 1200,142 L1200,0 L0,0 Z" fill="#e5dcc3" stroke="#786c56" stroke-width="1" stroke-opacity="0.55"/>
<path d="M0,155 C60,151 90,148 115,145 C170,137 240,127 300,119 C350,113 390,113 430,117 C470,121 500,105 525,101 C555,97 572,104 588,110 C620,122 645,125 665,122 C705,117 735,109 762,102 C795,94 822,82 852,80 C885,78 915,91 945,99 C975,107 1010,129 1042,153" fill="none" stroke="#786c56" stroke-width="0.7" opacity="0.25"/>
<path d="M585,104 Q640,152 700,154 Q762,154 790,99 C762,102 735,109 705,112 C665,117 645,120 620,117 C606,114 594,109 585,104 Z" fill="url(#sk-reefhatch)" stroke="none" opacity="0.8"/>
<path d="M585,104 Q640,152 700,154 Q762,154 790,99" fill="none" stroke="#a05a2c" stroke-width="1.1" stroke-dasharray="6 5" opacity="0.7"/>
<g stroke="#786c56" stroke-width="1.6" opacity="0.7">
 <line x1="113" y1="142" x2="115" y2="162"/>
</g>
<circle cx="1078" cy="130" r="6" fill="#efe6d2" stroke="#a05a2c" stroke-width="2"/>
<circle cx="1078" cy="130" r="2" fill="#a05a2c"/>
<path d="M150,163 L150,152 L1040,152 L1040,163" fill="none" stroke="#2f6b6b" stroke-width="1.1" opacity="0.32"/>
<text x="332" y="146" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9.5" letter-spacing="2.5" fill="#2f6b6b" opacity="0.72" paint-order="stroke" stroke="#efe6d2" stroke-width="3.5" stroke-linejoin="round">THE PILOT · ONE MOVE, THE WHOLE TRIP</text>
<rect x="42" y="24" width="300" height="80" fill="none" stroke="#cbbd98" stroke-width="1"/>
<text x="56" y="45" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9.5" letter-spacing="3" fill="#8a3a2a" opacity="0.85">ONE PASSAGE · YOUR KIT PLACED</text>
<text x="56" y="68" font-family="Roboto Slab, Georgia, serif" font-size="15.5" fill="#1f1a13">The workflow</text>
<text x="56" y="88" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234">your moves, in the right order.</text>
<line x1="132" y1="176" x2="120" y2="166" stroke="#786c56" stroke-width="0.8" opacity="0.55"/>
<text x="150" y="205" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10" letter-spacing="2" fill="#786c56" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">NEXT MAPPED MOVE</text>
<text x="150" y="220" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="10.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">from your stack-map. one point, at the pier.</text>
<line x1="384" y1="200" x2="384" y2="216" stroke="#786c56" stroke-width="0.8" opacity="0.55"/>
<text x="384" y="180" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10" letter-spacing="2" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">TEST-STRATEGY</text>
<text x="384" y="195" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="10.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">carries one whole leg.</text>
<text x="872" y="352" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2" fill="#a05a2c" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">VERIFIER</text>
<text x="872" y="367" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="10.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">one fix. re-aims the next leg.</text>
<line x1="820" y1="352" x2="772" y2="352" stroke="#786c56" stroke-width="0.8" opacity="0.5"/>
<path d="M928,242 Q972,206 1004,190" fill="none" stroke="#a05a2c" stroke-width="3" stroke-linecap="round" opacity="0.92"/>
<polygon points="1004,190 988,189 995,203" fill="#a05a2c" opacity="0.92"/>
<text x="1010" y="250" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10" letter-spacing="2" fill="#8a3a2a" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">HAND-OFF</text>
<text x="1010" y="265" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="10.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">one move feeds the next. no pilot.</text>
<text x="558" y="316" text-anchor="middle" font-family="EB Garamond, Georgia, serif" font-style="italic" font-size="14" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">the value is the order, not the count.</text>
<text x="1000" y="392" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10" letter-spacing="2" fill="#786c56" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">THE SAME SESSION, NO KIT</text>
<text x="1000" y="407" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="10.5" fill="#786c56" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">nothing stands in for you.</text>
<text x="1030" y="500" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9.5" letter-spacing="2" fill="#8a3a2a" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">WRONG HARBOR</text>
<text x="1078" y="66" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#a05a2c">THE SPOT</text>
<text x="1078" y="90" text-anchor="middle" font-family="EB Garamond, Georgia, serif" font-style="italic" font-size="15" fill="#1f1a13">Done, defined.</text>
<text x="1188" y="548" text-anchor="end" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="8" letter-spacing="2" fill="#8a3a2a" opacity="0.7" paint-order="stroke" stroke="#efe6d2" stroke-width="2.5" stroke-linejoin="round">A MOVE'S FOOTPRINT IS WHERE ITS JOB LANDS</text>
</svg>
</figure>

- A **skill** is a named move you reach for. Single purpose, reusable, invoked by name. Your test-strategy and your verifier are moves you already own; your stack-map names the ones worth building next. You reach for one where the passage needs it, not rebuild it each session.
- Its **footprint** is wherever the job lands. One move takes a single fix at a turning point. Another carries a whole leg. A third runs at the pier, before the first leg. You never size a skill in advance. The job sizes it.
- Nothing here is new except the placing. Same passage, same drift, same fixes and guardrails. A move now stands at each point you used to steer by hand. Where no move stands, you sail that stretch yourself.

## From skills to a workflow

- A session passes through phases: context, plan, build, verify, ship. A skill sits where its job sits. Its footprint is set by the job, not by the phase line.
- The field wires kits more ways than one; no way has won. Pocock ships a public kit with no orchestrator: you call each skill by hand. Klaassen chains steps through files on disk, a gate at every seam. Some workflows have a pilot; many do not.
- One documented kit wires skills four ways. One skill names another as a precondition: **an explicit load**. One sequences and gates a chain: **an orchestrator**, the pilot. A rule in `./CLAUDE.md` matches a file or phrase: **routing**. One hands its output to the next: **a hand-off**. A skill that does one job and calls nothing is a **leaf**.
- A workflow is not only steps in order. At a seam, a check or stop condition decides whether the next step may begin.
- Chaining generation without checks only moves work into the review queue faster.
- Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment.

## Composition is a live argument, so you read

How the field composes kits like this is a live argument with no settled answer, so there is no prompt to drill here. The move is to read. Two reads take it further: one engineer's whole worked stack, then the wider field.

[Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md)

[Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md)

Pick the shape that resembles your day.

<!-- maintainer -->

**Emphasis budget (Antti-directed "go very lightly on the bold"):** bold = handles only — slide 1: **skill** + **footprint** sub-spans (third bullet plain); slide 2: the four wiring mechanisms (**an explicit load** / **an orchestrator** / **routing** / **a hand-off**) plus **leaf** at its definition; *pilot* stays plain as the chart-to-field bridge; all other bullets plain (the chart caption already carries "the value is the order, not the count") — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, SVG, and the two supplementary links carry no bold.

**Quality:** compendium-audited 2026-08-04 (writing@93bb807 story@93bb807 technical@1c765f2 behavior@1c765f2 pedagogy@93bb807 strategy@1c765f2 slides@93bb807)
- judges @93bb807: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Redesign (2026-07-04).** Rebuilt from a weak field-survey pointer (lede + five-approaches slide + how-to-read slide + link) into a concrete teacher + pointer: lede + one figure slide (the passage, your kit placed) + one mechanics slide (four composition mechanisms) + two reads. Antti flagged the prior version weak: it name-dropped five practitioners one bullet each and taught nothing about what a workflow-of-skills *is*. The five-approaches walk now lives ONLY in `workflow-composition-lineages.md` (which already carries those attributions); `skill-stacking.md` (Dino's worked example) is promoted to the primary deepening read. Net: two survey slides out, one figure + one mechanics slide in.

**Framing provenance (5-framing / 3-judge panel, 2026-07-04).** The skills-on-the-passage concept was stress-tested. Winner: *footprint follows the job* — a skill's footprint is wherever its job lands (one turning point, one leg, or the whole trip), never sized in advance. This dissolves the granularity question into one rule instead of a fixed per-feature mapping (the rejected `fix = verifier` trap). Retired: *phases-as-legs* as the chart spine (Antti's steer) — `leg = phase = skill` re-commits the same fixed-mapping error one level up, and a linear phase chain cannot seat the loop (re-invocation has to arc back across the chart). The phase vocabulary survives in slide-2 bullet 1 as prose, teaching scope is NOT phase-bound (a move spans what its job spans), rather than as a chart spine. Load-bearing correction carried in BOTH chart and body: not every workflow has an orchestrator. The bold oxblood hand-off arrow + the Pocock bullet (a whole public kit with no orchestrator at all) + the pilot bullet ("many do not") inoculate against the orchestrator-always error the bracket/leaf framings quietly teach.

**Figure.** Derived from `protos/m6-skill-passage-01-footprint.html` (Antti chose proto 01 of a 3-proto set: 01 footprint / 02 phase-backdrop / 03 phase-spine; 02 + 03 stay in `protos/` as alternates, PNGs in session scratchpad). Base geometry is the M5 passage chart from `what-packaging-is.md`, byte-unchanged (same cream/teal/oxblood palette, same drift cones, fixes, guardrails, lighthouse, ghost, spot); only the label layer swapped to the kit (the mapped next move at the pier, test-strategy across a leg, verifier at the orange-ring fix) plus the under-drawn pilot and the weighted hand-off. SVG inlined byte-clean: comments and interior blank lines stripped (marked terminates the raw-HTML block on ANY interior blank line, same failure mode as `the-whole-map.md` / `the-map-filled-in.md`). Single id `sk-reefhatch`, `sk-` prefixed against collision if the theory handbook renders multiple charts on one page.

**Vocabulary bridge (earned once).** move = skill (slide-1 bullet 1; slide 2 then speaks *skill* throughout — the noun *move* stays on slide 1 where the chart defines it, avoiding the moves-verb/move-noun collision); pilot = orchestrator (slide-2 pilot bullet); leaf = a skill that does one job and calls nothing (same bullet). The chart speaks nautical (pilot); the supplementaries speak Dino (orchestrator, leaf); the slide bridges them so chart, slide, and reads are one system. Do not re-earn in the supplementaries. Session/task/run vocabulary per `check_student_facing.md §21b`.

**§3 disposition (no cross-module sequencing in body).** The kit is named by what it is ("test-strategy skill, verifier, and a freshly drawn map of the moves worth packaging next") — backward recognition, not forward sequencing. No `M[0-9]` tags in body. The chart callback ("the passage you already sailed") is spine-anchoring on the shared M5 image, not a cross-module ref.

**Length discipline.** The lecture is concrete-teacher-plus-pointer, not survey-pointer. Ceiling: lede + the figure slide + one mechanics slide + the two reads. The variety sentences on slide 2 (Pocock by hand, Klaassen through files, one documented kit) are the ceiling for in-body field coverage; do NOT re-import the full lineages walk — it lives in `workflow-composition-lineages.md`. New composition discoveries land in the supplementary; the lecture body changes only if a mechanism is renamed at the field level, a wiring shape gains or loses currency, or the student's kit shape changes.

**Headers (squint + truth, `check_lectures §4`).** *A skill's footprint is where its job lands* (slide 1, thesis-claim, matches the chart's own bottom caption); *From skills to a workflow* (slide 2, names the composition concept the slide teaches in its variety). No orphan-mystery, no empty container.

**Lecture meta:** *3-4 min M6 mini-lecture at the closer area. Teaches what a workflow-of-skills IS, concretely, on the M5 passage the student already met, then hands off to the worked example and the field survey. The register-shift line ("no prompt to drill; the move is to read") is kept so the student knows they are in practitioner mode.*

**Time:** 4 min at presentation pace, or a 4-min student read.

**Delivery mode:** Read aloud in-room at the closer area with the chart projected, or skipped if the cohort is tight (the two reads are the load-bearing deepening; the lecture is the concrete entry).

<!-- backing -->

Claims
- `a-workflow-is-moves-in-order` · vision · "A workflow is those moves in the right order around one passage." ← none-owed
- `skill-is-a-named-move` · vision · "A **skill** is a named move you reach for. Single purpose, reusable, invoked by name." ← none-owed
- `footprint-follows-the-job` · vision · "Its **footprint** is wherever the job lands." ← none-owed
- `never-size-a-skill-in-advance` · vision · "You never size a skill in advance. The job sizes it." ← none-owed
- `nothing-new-except-the-placing` · vision · "Nothing here is new except the placing." ← none-owed
- `moves-are-not-phase-bound` · vision · "Its footprint is set by the job, not by the phase line." ← none-owed
- `four-wiring-mechanisms` · detail · "One documented kit wires skills four ways. … **an explicit load** … **an orchestrator** … **routing** … **a hand-off**" ← skill-stacking-supp
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
- lineages-supp `[checked:2026-08-01 result:CAVEAT due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md` carries the field-survey lineages and their per-source stamps. **`due:none` is the delegated variant** (`backing-format.md` § Delegated): the delegation does not expire, the delegate's own stamps do, and `source-freshness.sh` already walks that file. The previous `due:2026-11-25` was a second copy of the delegate's freshness, computed from a 2026-05-25 check that the July correction had superseded — it went stale in silence because nothing compares a delegating date against the file it delegates to. `checked:` still means what it says here: the date this pointer was last confirmed to aim at the right file. fallback: this lecture asserts no dated specific of its own; if the supplementary's lineages change, only the "live argument" claim here is affected, and that claim gets *stronger* when the field moves.

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
