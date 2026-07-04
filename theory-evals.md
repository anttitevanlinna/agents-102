# Theory-layer evals — Family A (soundness) + Family B (teaching-landing)

Gates for the AE101 theory integration (see `theory-plan.md`). **Family A** validates the theory (Field Map + inventory) *before* build; **Family B** grades each per-module durable law-anchor *during* build (mirrors `/goalcheck`). Compose with existing infra — add only the new judges below. Backbone = the ★ pieces in `theory-plan.md`; graded strictly. Body (non-★) graded with **demotion as the default fix** (drop off the spine into Vocabulary/Context, don't rewrite).

## Reuse map (compose, don't duplicate)

| Need | Verdict | Instrument |
|---|---|---|
| groundedness/truth | reuse + extend | groundwork `groundedness.md` (SOURCED/PRIOR-ART/UNSOURCED/DRIFT, mines agents-102) · research-review `evidence-ladder-classifier` + `zombie-stat-detector` |
| scar / generativity / dose-cap / half-life / no-empty-phase | **new** | no existing instrument |
| spine-coherence | retarget | groundwork **E1** reachability + label parity + **B6** on-cycle → run against the Field Map |
| goalcheck harness | reuse verbatim | `/goalcheck` loop (Baseline→Orient→Improve→Re-eval→Reflect→Decide; max 4; structure>content>wording) |
| durability-without-voice | reuse mechanism, new mode, **override a rule** | story `delivery_mode` persona-reader in a new `trainer-absent` mode; **inverts** `check_student_facing §10` |
| anchor is a pattern card | reuse | run groundwork per-card **A/B/C** on the anchor unchanged |
| leave alone | — | `writing`,`technical`,`behavior`,`cross_module`, groundwork D/E/F, research-review `source-type-auditor` |

---

## Family A — Theory-soundness (gates the theory before any build)

**Unit under test = the MAP, not the bricks.** 35 true·sourced·durable bricks that don't nest (C), don't generate (G), or aren't walked (S) still fail. An all-SOURCED axis-A result is *never* "sound" — it's the most defensible-looking way for a wrong spine to pass. Run A first (cheap) but never let it stand in for S/G/C.

**A · Groundedness/Truth** (per piece). Classify SOURCED / PRIOR-ART / UNSOURCED / I-CAN'T-TELL; DRIFT check (the field's author must not say "that's not what it says"); evidence-level honesty (`[rsch:Ln]` matches the finding; L1/thin = candidate-not-backbone; round-number stats — the **0.85ⁿ floor** included — traced or fenced). **A4 EXTENSION — adversarial house-thesis stress-test:** competence-first, conditions-creator, and any `[rsch]` confirming a Bosser prior must carry a note that engages the *best* counter-evidence and survives or demotes (groundwork groundedness can't do this — a sourced-but-wrong frame looks *more* defensible).
- BLOCK: any UNSOURCED · any DRIFT · any ★ resting on L1/thin or an untraced zombie stat · any `[rsch]` overclaim · any house-thesis piece with no/failed stress-test.

**S · Scar** (borrowed pieces only) — *the sharpest new instrument.* A `[borrow:X]` law earns its place only if the course **walks a scar** for it (philosophy: deliberate · exposed · learned). Classify SCARRED (cite the walked exercise/mechanism) / THIN-SCAR (mention only → demote) / UNSCARRED / SCAR-DRIFT (claimed scar the course doesn't actually walk). Distinct from A: control theory is real prior-art (passes A) yet UNSCARRED if the course never walks a closed-loop-controller practice.
- BLOCK: any ★ borrowed piece UNSCARRED (analogy-theatre as spine) · any SCAR-DRIFT.

**G · Generativity** (per piece). Does it pay theory-rent — **predict** (tells you what happens out-of-sample) and/or **generate a move** (a move derives *from this law*, sharpest as a §6 governor)? Classify GENERATIVE / DESCRIPTIVE (true but inert → demote to §5 Vocabulary) / RENT-CLAIMED-UNPAID (the Field Map's "move it governs" cell lies).
- BLOCK: any ★ DESCRIPTIVE · any RENT-CLAIMED-UNPAID.

**C · Coherence/Spine** (whole Field Map — the only axis grading argument-architecture). C1 **no empty phase** (each of the 6 cycle phases ≥1 law) · C2 reachability/no orphan (every ★ homed in exactly one phase) · C3 on-cycle placement · C4 single home · C5 SOIL spans · C6 the cycle closes & climbs (personal→team→company) · C7 density sanity (the "Verification densest" claim holds or is corrected).
- BLOCK: any empty phase · any ★ orphan · cycle doesn't close.

**H · Half-life** (per piece). DURABLE (`[borrow:X]` mature parent field — decades) vs PERISHABLE (produced-pattern / "…today" — model-generations: hybrid-beats-autonomous, 0.85ⁿ *at current reliability*, absorption/amplification *as currently observed*). 
- BLOCK: **PERISHABLE-BUT-LOAD-BEARING** — a ★ slot whose only support is a rots-soon claim with no durable frame beside it. Pair with a durable law or demote. (Otherwise FLAG; perishables ride as evidence + carry an as-of date.)

**Gate (3 verdicts):**
- **SOUND** — all axes PASS at backbone level; body FLAGs ship as tracked todos → **loops start.**
- **SOUND-WITH-DEMOTIONS** — a ★ fails S/G/H but the fix is demotion; apply demotions, **re-run C only** (no phase emptied, no link broken) → build a thinner, truer spine. *(This is dose-governs-itself at gate time.)*
- **NOT SOUND** — empty phase · UNSOURCED/DRIFT backbone · UNSCARRED backbone that can't demote without emptying its phase · failed house-thesis stress-test · cycle doesn't close → repair, re-run failed axis + C.

**Harness:** deterministic pre-pass parses tags + the Field-Map table → mechanical orphan-list + empty-phase-list (seeds C, short-circuits obvious NOT-SOUND). Then 5 read-only judges (A·S·G·H per-piece, C at map scope) → scoreboard → gate. Parameterised like the groundwork judges (`{INVENTORY_PATH} {FIELDMAP_PATH} {BACKBONE_SET} {HOUSE_THESIS_SET} {GROUND_CHECKOUT} {RESEARCH_ROOT} {AXIS}`).

---

## Family B — Teaching-landing (grades each per-module anchor; mirrors `/goalcheck`)

Runs **after** Family A PASS (soundness precedes landing). Unit = one durable, projected, student-**owned** law-anchor ("the slide"). **Artifact contract:** per law `{NAME · MAP-POSITION · MECHANISM (why/what-breaks) · GOVERNOR (pre-action question)}`; per anchor `≤3 laws · one legible map-slot · glance-legible · re-readable Tuesday`. The four fields are the durable record of what the closer names verbally — Family B tests whether that record survives the voice being gone.

**B★ · Durability-without-voice** (keystone — HARD GATE, never averaged). Persona = AE101 mid-level SWE who **did the exercise but did NOT hear the trainer name anything**; reads ONLY anchor + map. Context DENIED: module prose that names laws, lecture/closer scripts, trainer-guide, maintainer block, any verbal naming. Legibility matrix per law: **NAMED · PLACED · MECHANISM · GOVERNOR** recoverable from the artifact alone.
- BLOCK if any law: label-not-mechanism (WHY depends on a verbal gloss the anchor lacks) · unplaced (no map phase) · decorative governor (not an executable pre-action question) · ask-the-trainer dependency · a beat the in-room judge would wave through as "facilitator-premium 7/10" (here that's a BLOCK, not a false alarm).
- PASS: all ≤3 laws recover all four gates; persona states one Tuesday move per law from its governor; zero trainer-resolution needed.

**B1 · Spine-anchoring / cognitive-load.** Coverage: every technique the module teaches maps to a NAMED Field-Map slot (legible via the anchor). Load: the anchor stays a coat-rack (≤3 laws + map, glance-legible), not a fresh pile.
- BLOCK: any taught technique with no named slot (= "too much material, no place") · anchor carries material beyond ≤3 laws+map that reads as a new pile.

**B2 · Dose.** ≤3 named laws · container-not-content (name+position+compressed-WHY+governor, not lecture-prose) · each law generates an in-session move **on the student's own code** (else empty box).
- BLOCK: >3 laws · any inert law · anchor is textbook not coat-rack.

**B3 · Worldview-fit** (the map-first carve-out). Map front-loaded as **container** (the empty SLOT + "here's the territory, today we're in `<phase>`") = **legal**. Front-loading the law's **NAME / MECHANISM / GOVERNOR** before the felt exercise = **OVER-REACH → BLOCK** (steals the derive-within aha; the `check_lectures §2` violation the doctrine does *not* license). Derivation beat must exist (law named/felt after, not pure lecture).
- Judge instruction: do NOT REVISE the map front-load as premature lecturing — it's the licensed exception *provided it stays container-only.*

**Handoff (rebuild none):** on the ANCHOR — `writing`, `technical`, groundwork `A/B/C` (it *is* a pattern card). On the MODULE — `story` (in-room), `pedagogy`, `strategy`, `behavior`, `cross_module`, unchanged. `story` does NOT run in-room on the anchor-alone — that trainer-absent test is B★'s.

**Loop gate — "this anchor is DONE":** `Family_A == PASS` ∧ `B★ == PASS` (hard gate) ∧ `B1,B2,B3 == PASS` ∧ no REVISE from handed-off classes. Theory-landing journey (swaps the CTO journey): **Named → Placed → Legible → Generative → Un-piled.** Improve ladder: **placement/container > legibility > wording.** After 4 iterations B★ still BLOCKs → **do NOT ship** (shipping reproduces the cohort failure); report as a structure problem.

**Self-study degradation:** no trainer → B★ becomes the WHOLE gate (trainer-absent is now production reality). §10 override permanent. Teacher-Claude may RE-SURFACE naming that is durably on the anchor, never ORIGINATE it (its chat is ephemeral = same lossiness as the voice). Naming only in the Teacher-Claude prompt, not on the anchor → BLOCK.

**Overrides register (Family B inverts these on purpose):**
| Rule | Default | Family B |
|---|---|---|
| `check_student_facing §10` | "simulation personas never alone; 7/10 = facilitator-premium, not breakage" | **INVERTED** for B★: persona IS alone; facilitator-premium gap IS the breakage |
| `story.md` sim | `delivery_mode: in-room` | **new mode `trainer-absent`** on the anchor (story keeps in-room on the module) |
| `check_lectures §2` | "no naming/tradeoffs before the felt exercise" | **carve-out**: front-load the map SLOT (container) legal; the law NAME/MECHANISM/GOVERNOR stays name-after |

New sim cache: `curriculum/evals/sim-cache/<training>--<slug>.anchor-alone.json`.
