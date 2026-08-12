# When a plan is good

**Session** *(new, "Module 2 - Plan mode done right")*

Start a new Claude Code session at your repo root.

```
/rename m2-plan-mode
```

## Plan mode changes the tools and the instructions

- Plan mode removes the edit tools and swaps the instructions to explore and propose. You press Shift+Tab until the status bar shows plan mode on. The agent reads files, runs shell commands to explore, and writes a plan file, but it won't edit your source until you approve.
- The read-only part is load-bearing. Plan mode isn't "Claude thinks before doing." It's "Claude writes a thing you can read, edit, and push back on before your source changes."
- The plan is saved on disk under a descriptive filename such as `migrate-auth-hash-calm-otter.md`. You can find it again without searching the chat.
- You will notice the wait. While Claude plans, other sessions could be making progress elsewhere. Not today, but soon.

## Optional: ask plan mode directly

A 30-second move first. Enter plan mode in your own session right now and ask Claude what shifted from its side.

Ask Claude to describe what changed in its behaviour when plan mode turned on.

{{prompt:when-a-plan-is-good-1}}


Watch what comes back. Sometimes Claude names the read-only state directly, sometimes the specific instructions it is following. Skip if you trust the framing. The exercise will show you either way.

## Five things a good plan has

- **A specific file list.** Not "update the config." *Which* config, *which* keys. A plan that names three files has made three decisions. A plan that says "the relevant files" has made zero.
- **An early runnable slice.** Find the first step after which something runs end-to-end. A plan that builds layer by layer (data, then services, then UI) answers "the last one," and every wrong guess stays hidden until then. A plan that stands up a thin end-to-end slice early gets checked by reality from step two onward.
- **A verification step** that could actually fail. *"Run the tests"* is cosmetic; *"run `pytest tests/auth/ -k hash` and expect 14 passing, 0 failing"* is a gate. The test is whether, reading the step alone, you could tell Claude it failed and Claude would know what to fix.
- **Named assumptions.** Good plans flag what they're assuming (library versions, schema shapes, whether a teammate's migration ran last week). A plan without assumptions isn't assumption-free; it's just assumption-silent.
- **A list of non-goals.** What the plan will *not* touch. Every adjacent improvement looks helpful, so the agent does the ones you never ruled out. (Dex Horthy)

## Three pressures that make bad plans look good

- **Structure is persuasive.** A 7-item plan with section headers and bold text looks like a decision. It often isn't. It's a draft formatted like a decision. The formatting is the trap.
- **Reasonableness passes for rightness.** Each step sounds reasonable, so the plan sounds right. But three reasonable steps in the wrong order still ship a bug. Read the sequence, not the steps.
- **You already agree with it.** The plan matches what you'd have written, which feels like alignment. But Claude wrote it from a partial read of the codebase and your instinct isn't a substitute for the read. Agreement is cheap; the read is what matters.

## Two reads, paired

- Your read and the agent's walk-down catch different misses. You bring the voice of experience: the soft item, the step that contradicts how this codebase actually works. The agent brings breadth: it can keep walking branches without getting bored or skipping the dull ones.
- The full grilling is an offer, not an obligation. Order matters: your push-back first, so your read stays in the driver's seat; then let the walk-down surface what you did not see. Stop when another answer would no longer materially sharpen the plan.
- Check the revision, not the acknowledgement. The agent agrees easily. A flagged step can come back softened rather than sharpened. A push-back is finished when the regenerated plan is sharper, not when Claude says it heard you.

If the plan still has open questions, run the walk-down. If it's all clear, your read is enough.

## Find is easier than judge

- Generating candidates is cheap for the agent; judging them is where you're needed. Stuck naming a soft item? Ask Claude which step it's least confident about. That answer is a candidate. Whether it matters depends on the codebase and the task.
- The agent finds, you judge, and everything from here sharpens one side or the other. The split runs through the whole discipline.

## Plan review is a high-leverage gate

- A plan is a check before implementation. One correction can redirect every step that follows before the agent turns the plan into code.
- What the plan doesn't decide, the agent decides mid-run, inside work in flight, and you will not notice. A wrong call propagates across files, and the wrongness tangles with everything built after it: what would have been a line edit in the plan becomes an untangling job in the code.
- Aim the read at the unknown that teaches you the most. The branches worth walking are the ones that change what done means. The rest you'd settle in verification anyway.
- You don't have to execute a plan to know it's good. Recognizing a good plan is the skill; the execution can wait for the day the task is real.

## What you can test and check sets your complexity ceiling

<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="A two-by-two map of delegated work. Horizontal axis: reach, how much you hand off. Vertical axis: calibration, whether trust was earned by a measured gate. Four states: chat-shaped work bottom-left, controlled assistance top-left, reckless autonomy bottom-right, calibrated agency top-right. A dashed ochre curve labelled the frontier rises from low reach at low calibration to high reach at high calibration, and moves outward as fast as the gates behind it." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<rect x="12" y="12" width="1176" height="536" fill="none" stroke="#d6c8a3" stroke-width="1" opacity="0.9"/>
<rect x="650" y="270" width="500" height="200" fill="rgba(138,58,42,0.05)"/>
<g stroke="#d6c8a3" stroke-width="1" stroke-dasharray="2 8" opacity="0.8">
<line x1="650" y1="70" x2="650" y2="470"/>
<line x1="150" y1="270" x2="1150" y2="270"/>
</g>
<g stroke="#786c56" stroke-width="1.6" stroke-linecap="round">
<line x1="150" y1="470" x2="1140" y2="470"/>
<line x1="150" y1="470" x2="150" y2="80"/>
</g>
<g fill="#786c56">
<polygon points="1150,470 1138,464 1138,476"/>
<polygon points="150,70 144,82 156,82"/>
</g>
<text x="650" y="505" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56">REACH · HOW MUCH YOU HAND OFF →</text>
<text x="125" y="270" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56" transform="rotate(-90 125 270)">CALIBRATION · TRUST, MEASURED ↑</text>
<g text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="12.5" letter-spacing="2">
<text x="400" y="150" fill="#2f6b6b">CONTROLLED ASSISTANCE</text>
<text x="400" y="400" fill="#2f6b6b">CHAT-SHAPED WORK</text>
<text x="800" y="150" fill="#2f6b6b">CALIBRATED AGENCY</text>
<text x="960" y="400" fill="#8a3a2a">RECKLESS AUTONOMY</text>
</g>
<g text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234">
<text x="400" y="168">small handoffs, tight review</text>
<text x="400" y="418">you read everything</text>
<text x="800" y="168">big handoffs, gates and checks you trust</text>
<text x="960" y="418">big handoffs, green you took on faith</text>
</g>
<path d="M 480,470 C 640,420 760,330 850,240 S 980,120 1020,70" fill="none" stroke="#a05a2c" stroke-width="2.4" stroke-dasharray="7 7" opacity="0.85"/>
<text x="935" y="205" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" letter-spacing="2.5" fill="#a05a2c" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">THE FRONTIER</text>
<text x="935" y="221" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">moves as fast as the gates behind it</text>
<line x1="880" y1="250" x2="945" y2="250" stroke="#a05a2c" stroke-width="1.8" stroke-linecap="round"/>
<polygon points="955,250 943,244 943,256" fill="#a05a2c"/>
<text x="650" y="533" text-anchor="middle" font-family="EB Garamond, Georgia, serif" font-style="italic" font-size="15.5" fill="#4a4234">The frontier: the largest task you can hand off, well designed, enough unclarity removed.</text>
<text x="1176" y="36" text-anchor="end" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9" letter-spacing="2" fill="#8a3a2a">TWO AXES · FOUR STATES</text>
</svg>
</figure>

- Every task you hand off sits on two axes. Reach is how much you delegated: the size of the task, the distance between checks. Calibration is whether your trust in what came back was earned by a check you have verified.
- The plan read is a calibration move. It is cheap, it runs before anything is built, and its cost does not grow with the size of what you approved.
- Reach without calibration is what the three pressures produce: a plan that reads well, approved at a scope your read never actually covered.
- Push reach past what you can check and you have not delegated more. You are checking less.
- The ceiling is not fixed. Every check you make cheap and repeatable raises it, so building a better check buys you more than approving a bigger plan.

<!-- maintainer -->

**The delegation-frontier slide (`## What you can test and check sets your complexity ceiling`).** The header is a claim rather than the model's name, and that is deliberate: at M2 the bare term *the delegation frontier* is an unearned container (`check_lectures.md §4`) and it pulls optimistic where the slide warns. The name rides the figure's own caption instead, so `the-gate-is-a-claim.md`'s `## The delegation frontier` stays the naming beat. Idea first, name after, the doctrine `the-whole-map.md` states for the laws.

*Ceiling* is the arc's recurring shape for a limit set by what the engineer brings, always locally qualified: `painting-the-picture-with-the-llm.md`'s *"Your stance is the ceiling"* (quality), `new-human-role-in-the-loop.md`'s *"Steering raises the ceiling"*, `law:learning-rate-is-the-ceiling`. *Complexity ceiling* is this slide's variable, so it extends the pattern instead of colliding with it. The header states the relationship between the two axes, which is what the model is; the axes themselves are defined in bullet 1 so the slide stands alone (`check_pedagogy.md §9b` self-sufficiency).

The last bullet carries the raise, and it plants what `the-gate-is-a-claim.md` deliberately withholds at its close. No conflict: the doubt held open there is whether a given gate tells the truth, not whether ceilings move. Mechanism for raising it stays unnamed here, since naming it would sequence forward (`check_lectures.md §3`).

The canvas is a copy of the one in `the-gate-is-a-claim.md`, which is the parent: change it there and re-derive here. No ids in the SVG, so no prefix collision. The figure carries all four states; the bullets teach only the two axes and the frontier rule, the same furniture split `the-whole-map.md` uses for its nine loop tags. Deliberate early placement of a load-bearing model, per `check_pedagogy.md §9b` — repetition in the right doses is the retention mechanism, so this is dosage rather than a spent reveal, and the M5 closer plugs the same model into the verifier the student builds there. This slide's worked instance is the plan read. Self-sufficiency obligation met in bullet 1: reach and calibration are both defined here, not borrowed from the later lecture. Zero bold, header carries the handle, matching the parent slide. ~135 words against the 210 bar, four bullets against six. Sequential deck read resolves *gate* and *the plan read* from the preceding slide and *the three pressures* from slide 4. If the lecture runs tight, the compression already named below (three-pressures slide to 60 seconds) is the trade; that slide still has to exist, because bullet 3 points at it.

**Criteria slide, two expansions from the same practitioner (2026-07-29 and 2026-07-31, both Antti-directed, both from Dex Horthy).** *Three things* → *Four things* added **An early runnable slice** in second position, from `wsff.md`'s vertical-slicing argument: the prior three would all pass a fully horizontal plan. *Four things* → *Five things* added **A list of non-goals** in last position, from Horthy's `create_plan.md` template, after a 2026-07-31 OODA hunted six practitioners for a criterion the four could not hold and found exactly this one. **Slide now five bullets and sits within a hair of the size bar — measure before touching it.** Attribution differs between the two: the slice ships un-credited in body (the article links from M6's `quality-is-grounding.md`), the non-goals bullet carries a bare *(Dex Horthy)*, because plan mode does not produce that section by itself and the credit stops it reading as a tool behaviour. Horthy is not a new student-side name — M1's `getting-going.md` already assigns his essay as prework. Quality per-class SHAs predate both passes; re-audit before ship.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** the two checklist slides keep bullets with per-item handles (**A specific file list** / **A verification step** (trimmed to sub-span) / **Named assumptions**; **Structure is persuasive** / **Reasonableness passes for rightness** / **You already agree with it**); all other slides de-bolded fully, bullets kept (status-bar `plan` flipped bold → code span), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Session widget + both kickers untouched. Wording near-verbatim; no claims added or cut.

**Slide-page standardization (2026-07-02, Antti-directed):** `### Optional: ask plan mode directly` promoted to `##` — every slide page = line + `##` headline (the "Wrong is how steering gets in" pattern); no h3/hr page divisions in theory lectures. Layout-only. The `ask plan mode directly` section is kept (see the keep note below).

**Slides-only pass (2026-07-02, unaudited):** covered regions DELETED (Path A — prose was verbatim-redundant with the slides; git carries it). Per-passage verdicts: intro agenda line CUT (slide titles carry it) · "you will notice the wait" FOLDED into slide 1 as fourth bullet (plants M3's two-window move) · "What you do with this" section CUT (the exercise body carries the flow; "then you stop" is the exercise's own beat) · slide-4 kicker carries the open-questions decision rule (walk-down vs own read; maintainer-worded, Sami design-phase register — no experience-tier assumption) · *Optional: ask plan mode directly* section KEPT UNCHANGED (its prompt is kept — see the keep note below). File is now Session widget + six slides + kickers + one optional plan-mode-introspection move.

**`ask plan mode directly` — kept, not cut.** The `when-a-plan-is-good-1` prompt was flagged `meta-retrospective` for a possible cull (the case for cutting: it adds an optional beat, and trimming lessens cognitive load). Kept by decision: asking plan mode what changed on its own side is a learn-how-the-tool-works beat. The student reads the read-only permission state back from the agent's own report, which the surrounding framing can only assert. The tool-literacy payoff outweighs the load argument; not a cut candidate.

**Deck notes:** does NOT name "plan-mode approval inflation" — that label lands retroactively at exercise P5. *Plan review is a high-leverage gate* delivers the name-the-uncertainty governor as a pre-action question (doctrine-legal). *Find is easier than judge* seeds the M5 verification-asymmetry naming.

**Deferral bullet on the gate slide (2026-08-08, Antti-directed frame, near-verbatim).** *What the plan doesn't decide, the agent decides mid-run* is the inverse of the slide's lead bullet: the correction-redirects-everything claim gets its shadow, the deferred wrong decision that also redirects everything. *Propagates across files*, *wrongness tangles* and *you will not notice* are the maintainer's own words — do not soften *tangles*, and do not revert *you will not notice* to a nobody-is-reading claim: whether anyone watches mid-generation varies by engineer, but a wrong design call reads as progress while it is being made, so the noticing claim is the true one (maintainer correction, this pass). The exercise's two vague-step bullets (`push-back-on-the-plan.md` read-the-plan altitude bullet + soft-items menu entry) stay as point-of-use recalls; the altitude bullet carries the same *and you will not notice* tail so lecture and exercise state the same mechanism (teach, then recall at the move, per the `check_writing.md` §11 carve-out shape). KC recall lands in `plan-mode-done-right.md` § Key Concepts.

**Quality:** compendium-audited 2026-08-08 (writing@a06abbc story@a06abbc technical@1c765f2 behavior@1c765f2 pedagogy@da65157 strategy@1c765f2 slides@a06abbc)
- judges @a06abbc: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta:**
- **Time:** 12 min. If tight, the three-pressures slide compresses to 60 seconds; the exercise teaches them. M2 runs slightly past its slot — `node scripts/calculate-time.js plan-mode-done-right` for where this beat sits in it.
- **Pedagogy:** primer-before-exercise. Names the three moves (merges / soft items / assumptions) that Phase 3 forces.
- **Mood target:** anticipation toward grounded competence. Student leaves the lecture with "I know what to look for" — the payoff of *actually feeling it* lands in the exercise.
- **Voice check:** no banned words (`honest`, `delve`, `landscape`-verb, `importantly`, `crucial`, `ritual`, `ceremony`, `practice` as noun). No em-dashes in body.
- **Scaffold, not framework:** the five-things / three-pressures shape is exercise scaffold — the house's own synthesis, and it owes no citation as a *shape*. Four of the five criteria are ours; the fifth is Horthy's and is credited in body. See the backing block's stance: across six practitioners searched, his `create_plan.md` is the only published plan-quality rubric anyone has to compare against.
- **Philosophy callout budget:** zero. The lecture is short and operational. The philosophy beat (*memory is my edge, not my keystrokes*; *mastery is structural practice*) lands naturally in the M2 Debrief when `CLAUDE.md` grows.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `plan-mode-is-tool-and-instruction-change` · detail · "Plan mode removes the edit tools and swaps the instructions to explore and propose" ← cc-permission-modes — maintainer-directed reframe: mechanism, not taxonomy. The docs file plan under permission modes; that taxonomy word stays in the reference page's lookup table (`claude-code-for-engineers.md §5`), where it is a docs citation. The mechanism half is live-observable (edit tools blocked in plan mode; approval ships as a tool call in the loop); the behavioral half ("reads files, runs shell commands to explore, writes a plan, won't edit your source") is near-verbatim the docs and stays on the stamp.
- `plan-mode-shift-tab` · detail · "You press Shift+Tab until the status bar shows plan mode on" ← cc-permission-modes
- `plan-mode-read-only` · detail · "The agent reads files, runs shell commands to explore, and writes a plan file, but it won't edit your source until you approve." ← cc-permission-modes
- `plan-before-source-changes` · detail · "Claude writes a thing you can read, edit, and push back on before your source changes" ← cc-permission-modes — "your source" is the load-bearing scope: since v2.1.218 approved shell commands run during planning, so plan mode protects the source tree, not all state.
- `plan-file-is-findable` · detail · "The plan is saved on disk under a descriptive filename such as `migrate-auth-hash-calm-otter.md`. You can find it again without searching the chat." ← cc-plan-file
- `parallel-sessions-plant` · vision · "While Claude plans, other sessions could be making progress elsewhere" ← none-owed
- `specific-file-list` · vision · "A plan that names three files has made three decisions. A plan that says \"the relevant files\" has made zero." ← none-owed
- `early-runnable-slice` · borrowed · "Find the first step after which something runs end-to-end" ← horthy-wsff, cockburn-walking-skeleton
- `verification-step-could-fail` · vision · "*\"Run the tests\"* is cosmetic; *\"run `pytest tests/auth/ -k hash` and expect 14 passing, 0 failing\"* is a gate" ← none-owed
- `named-assumptions` · vision · "A plan without assumptions isn't assumption-free; it's just assumption-silent." ← none-owed
- `named-non-goals` · borrowed · "**A list of non-goals.** What the plan will *not* touch." ← horthy-create-plan
- `structure-is-persuasive` · vision · "It's a draft formatted like a decision. The formatting is the trap." ← none-owed
- `reasonableness-passes-for-rightness` · vision · "three reasonable steps in the wrong order still ship a bug" ← none-owed
- `you-already-agree-with-it` · vision · "Agreement is cheap; the read is what matters." ← none-owed
- `two-reads-catch-different-misses` · vision · "Your read and the agent's walk-down catch different misses" ← none-owed
- `agent-can-keep-walking-branches` · borrowed · "it can keep walking branches without getting bored or skipping the dull ones" ← pocock-grill-me
- `human-stops-the-full-grilling` · vision · "The full grilling is an offer, not an obligation." ← none-owed
- `agent-agrees-easily` · detail · "The agent agrees easily. A flagged step can come back softened rather than sharpened. A push-back is finished when the regenerated plan is sharper, not when Claude says it heard you." ← sharma-sycophancy
- `find-is-easier-than-judge` · detail · "Generating candidates is cheap for the agent; judging them is where you're needed." ← osmani-agentic-code-review
- `plan-review-leverage` · vision · "One correction can redirect every step that follows before the agent turns the plan into code." ← none-owed
- `deferral-propagates-and-tangles` · vision · "What the plan doesn't decide, the agent decides mid-run... A wrong call propagates across files, and the wrongness tangles with everything built after it" ← none-owed — maintainer frame near-verbatim; the inverse of `plan-review-leverage`, stated on the same slide.
- `making-plan-good-is-the-work` · vision · "Recognizing a good plan is the skill; the execution can wait for the day the task is real." ← none-owed

**Sources**
- cc-permission-modes `[checked:2026-07-31 result:CORRECT due:cohort]` https://code.claude.com/docs/en/permission-modes — [capability] Anthropic's own docs on Anthropic's own product: a capability reference, **never `[practitioner direct]`** (that mislabel shipped in this file and in `plan-mode-done-right.md` until 2026-07-31; `push-back-on-the-plan.md` had it right). Verified against docs AND live against the installed binary, v2.1.220, build 2026-07-24. **Three separate results, do not collapse them.** (1) *Permission state, not a feature* — HOLDS. The page defines the whole family (`default`/`acceptEdits`/`plan`/`auto`/`dontAsk`/`bypassPermissions`) as permission modes sharing one Shift+Tab cycle and one `permissionMode` config surface; plan is one row in that table. Our phrasing is a fair reading of the page's structure, not a quote from it. (2) *Read-only* — HOLDS almost verbatim: *"Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source."* Shell exploration is explicitly permitted; only non-read-only tool use is blocked. **But it is no longer unconditional.** Since **v2.1.218** — days before this check — `useAutoModeDuringPlan` defaults on, and where auto mode is available *"the classifier reviews shell commands during planning instead of prompting you. Approved commands run"*, including commands outside the read-only set. And *"In sessions with bypass permissions available, Claude Code also doesn't enforce plan mode's blocks."* The claim was flatly true when written in April and acquired two exceptions in July. **Body corrected 2026-07-31:** it used to promise the agent *"can't edit or execute until you approve"*; the execute half is what stopped being universally true, so the line now promises only that it *"won't edit your source"* — which holds in every case including both exceptions, and matches the docs' own wording. Do not re-widen it back to "execute". **Open, deliberately unresolved:** how often auto mode is actually *available* in a plain classroom CLI session was not established, so the practical reach of exception (1) is unknown. If a cohort ever sees a command run during planning, that is this, not a bug. (3) *Status bar* — the body used to say it reads `plan`; **it reads `⏸ plan mode on`.** Confirmed twice: the docs state the label set, and the shipped binary's status-line table stores it literally as `{label:"plan mode on",symbol:J3r,color:"planMode"}`. The bare word `plan` appears only in a keyboard-hint carousel. **Body corrected 2026-07-31** to "shows plan mode on", deliberately un-code-spanned so it describes the label rather than pinning a literal string to match — the glyph and casing are exactly the sort of thing that churns. Do not re-add a code span here. Also undocumented in our body, and deliberately so at M2: `/plan` as a prompt prefix is a second documented entry point.
- cc-plan-file `[checked:2026-07-31 result:OK due:cohort]` local live-test, installed Claude Code v2.1.220 — [capability] **The `calm-otter` example is sound, and this was checked at three levels.** On disk: `~/.claude/plans/` exists and holds real plan files — `m2-add-levels-2-3-curious-otter.md`, `m2-picoshare-public-guest-status-curious-otter.md`, plus an `.archive/` carrying `m2-add-levels-2-3-skeptical-stoat.md` and `-tenacious-ferret.md` (the same task re-planned on different days, each getting a fresh suffix — which is what the random half is *for*). In the binary: `getPlanFilePath` builds `<plans-dir>/<slug>.md` where the slug is `<slugified first ≤4 words>-<random adjective>-<random noun>`; **"calm" is in the adjective pool and "otter" is in the noun pool**, so our illustration is a reachable output of the real generator rather than an invented shape. Unconditional code path in this build — no flag, no version gate. Only the directory is configurable (`plansDirectory`, itself undocumented). In the docs: the naming scheme is **not published anywhere** — the page says only *"writes a plan"* and, indirectly, *"Press Ctrl+G to open the proposed plan in your default text editor"*, which is only coherent if it is a file. So this claim rests on live observation, not on a citable page. fallback: keep the shape, drop the specific filename, say "a descriptive name you can come back to."
- horthy-wsff `[checked:2026-07-31 result:OK due:2027-01-31]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md — [practitioner direct, vendor venue] Dex Horthy (HumanLayer), "Why Software Factories Fail" — **`wsff` = Why Software Factories Fail**, per the H1; it is not an abbreviation of anything else. First-person and signed: *"I run a company ([HumanLayer]) building tools in the human/agent collaboration space, so what I'm gonna say below may be a tad biased… -Dex"* — that self-disclosure is exactly why the label carries the vendor-venue qualifier. The `### Vertical slices` section says what our criterion claims: models default to *"horizontal plans"* in stack order (migrations → service layer → API → frontend), and the slice surfaces integration problems early instead of at the end. Horthy uses "vertical slices" and "tracer bullets" interchangeably and credits a January 2026 livestream with **Matt Pocock**. Kept in step with `getting-going.md` and `quality-is-grounding.md`, which carry the same URL. **Do NOT import its Faros AI incident statistics** (vendor telemetry, zombie-stat risk).
- horthy-create-plan `[checked:2026-07-31 result:CAVEAT due:cohort]` https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/create_plan.md — [practitioner direct, vendor venue] Horthy's own plan-writing template, named in his `ace-fca.md` (line 239) as *"the prompt we use for planning"*. Backs the fifth criterion verbatim: *"## What We're NOT Doing — [Explicitly list out-of-scope items to prevent scope creep]"*. **Two caveats, both stated in body decisions.** (1) **Freshness:** last substantive commit **2025-11-12**, roughly eight months old and outside the window; currency rests on the `ace-fca.md` mention, which itself carries no date. Inferred current, not attested — do not upgrade this to a fresh-evidence claim. (2) **Not a Claude Code behaviour.** Plan mode does **not** emit a non-goals section on its own. Live-checked 2026-07-31 against the four real plans in `~/.claude/plans/`: only one carries an exclusions list, and it is explicitly *"per task description"* — the human supplied the non-goals and the agent echoed them back. **This is why the body credits Horthy by name rather than describing it as something the tool does.** He is not a new student-side name: `getting-going.md` already assigns *Why Software Factories Fail* as M1 prework, so the cohort has met him before this slide. fallback: keep the criterion, drop the parenthetical — the move stands without the credit, and the credit is what would rot first.
- cockburn-walking-skeleton `[checked:2026-07-31 result:CAVEAT due:none]` https://web.archive.org/web/20171103155809/http://alistair.cockburn.us/Walking+skeleton — [academic/research] Alistair Cockburn's own page, definition sourced to *Crystal Clear* (2004): *"A Walking Skeleton is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components."* Foundational, so `due:none`. **Two caveats, both load-bearing.** (1) The live URL is **404** — `alistair.cockburn.us/Walking+skeleton` and every plausible variant are dead; only the Wayback capture survives, which is why the stamp points there. (2) **Cockburn never uses the phrase "vertical slice."** His coinage is *Walking Skeleton*, and he explicitly credits the parallel terms to others: *"The Poppendiecks (2003) write about a 'spanning application'… Dave Thomas and Andy Hunt use what they call 'tracer bullets'."* "Vertical slice" is general agile/XP story-splitting vocabulary. **Never write "vertical slice (Cockburn)"** — cite him for the concept under his own name, or cite Horthy, who is who actually prompted this criterion.
- pocock-grill-me `[checked:2026-07-29 result:OK due:2027-01-29]` https://github.com/mattpocock/skills — [practitioner direct] Pocock's `grilling` skill: *"Interview me relentlessly about every aspect of this until we reach a shared understanding. Walk down each branch of the decision tree, resolving dependencies between decisions one-by-one."* The copied prompt preserves that full-on behavior; the body describes its breadth as *"keep walking branches"* and gives the human the stop. Body attributes nothing, deliberately — M2 is two modules in and the attribution cap holds names for where they are earned (`check_writing.md §11`); Pocock lands by name at M3 in `skills-from-the-frontier.md`. Stamp carried from that file; keep the two in step. **Do not gloss as "Socratic"** — the skill proposes an answer and waits; Socratic method surfaces contradictions instead.
- sharma-sycophancy `[checked:2026-07-31 result:OK due:none]` https://arxiv.org/abs/2310.13548 — [academic/research] Sharma, Tong, Korbak, Duvenaud, Askell, Bowman et al. (Anthropic), *Towards Understanding Sycophancy in Language Models*, ICLR 2024. The tighter of the two candidate papers because it runs **our exact scenario**: the model gives a correct, confident answer, the user pushes back with no new argument, and the model concedes. *"Even in cases when AI assistants provide accurate answers and state they are confident about those answers, they often modify their answers when questioned by a user and subsequently provide incorrect information."* Also: *"when a response matches a user's views, it is more likely to be preferred"*, and both humans and preference models *"prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time."* **Cite for the mechanism, never for the magnitude.** Its headline number is measured on Claude 1.3 and is three model generations stale; Anthropic's own Sonnet 5 notes claim *"lower rates of hallucination and sycophancy than Sonnet 4.6."* The property is named, measured and tracked; its current size is not what this paper reports. Foundational for the mechanism → `due:none`.
- perez-model-written-evals `[checked:2026-07-31 result:OK due:none]` https://arxiv.org/abs/2212.09251 — [academic/research] Perez, Ringer, Lukošiūtė et al. (Anthropic), ACL Findings 2023. Where the term gets its inverse-scaling framing: *"Larger LMs repeat back a dialog user's preferred answer ('sycophancy')."* Supporting context only — it establishes that sycophancy is a named, measured property that worsens with scale, not the answer-reversal-under-pushback mechanism the body describes. Foundational → `due:none`.
- osmani-agentic-code-review `[checked:2026-07-31 result:CAVEAT due:2027-01-31]` https://addyosmani.com/blog/agentic-code-review/ — [practitioner direct] Osmani, 15 Jun 2026, own blog, first-person byline confirmed. Backs `find-is-easier-than-judge` with his own framing, which opens the piece: *"the hard part of engineering moved from writing code to deciding whether to trust it, which makes review the most leveraged skill in software right now."* **CAVEAT — the 93.4% figure in this post is not Osmani's data and must never be cited as if it were.** He says so himself: *"The most useful result I have seen this year is not from a vendor."* It is v.j.k.'s experiment; see the next entry.
- vjk-four-reviewers `[checked:2026-07-31 result:OK due:2027-01-31]` https://dev.to/_vjk/best-ai-code-reviewer-in-2026-we-ran-4-in-parallel-for-3-weeks-146-prs-679-findings-1c0f — [practitioner direct] the primary source behind the number our KB had been carrying as Osmani's with *"methodology unknown"*. It is published, and it is specific: 146 merged PRs over 3 weeks, four AI reviewers in parallel (CodeRabbit, Sentry Seer, Greptile, Cursor BugBot), 679 findings collapsed to **617 distinct (file, line) coordinates — that is the denominator**. *"Of 617 distinct flagged locations, 93.4% were caught by exactly one of the four tools. 6% by two. Almost none by three. None at all by all four."* **The axis does not reach our claim, and this is the whole reason `two-reads-catch-different-misses` is layered `vision` and not `detail`.** The study measures *tool vs tool*. Our sentence is about *human vs agent*. Independent reviewers catching near-disjoint sets is a strong analogy and it is not the same population (`check_research_claims.md §12a`). Cite it as adjacent support with the axis named, or not at all. Single experiment, single team → L2.
- boehm-defect-cost `[checked:2026-07-31 result:BLOCKED due:none]` Boehm, *Software Engineering Economics*, Prentice-Hall, 1981, p.40 — [academic/research] the classical origin of defect-cost escalation: cost to fix rises with the distance between introduction and discovery, from late-1970s TRW/IBM/GTE waterfall data. **BLOCKED: no verbatim quote was obtainable.** The book predates the web, ACM DL and the NASA scans either 403 or are non-text. Everything above is converging secondary paraphrase, not Boehm's own words. Cited from the framework ledger only; the body carries no number and must never acquire one — see the next entry for why.
- bossavit-leprechauns `[checked:2026-07-31 result:BLOCKED due:none]` Laurent Bossavit, *The Leprechauns of Software Engineering* (2015), ch. 10 "The Cost of Defects: An Illustrated History" — [practitioner analysis] **the counter-source, recorded on purpose.** Bossavit argues Boehm's dataset was thin and under-documented, that a few points were smoothed into a precise-looking exponential curve, that no shared definition of "defect" or "cost" spans the cited studies, and that the famous 10x/100x-per-phase ratios are a citation telephone game. BLOCKED on the same terms — no verbatim quote pinned to the primary text, so this is triangulated summary and one attractive-sounding line surfaced in search could **not** be re-confirmed and is deliberately not reproduced here. **Why this entry exists:** our body's ordinal framing (minutes / hours / weeks, no multiplier, no curve) survives the critique precisely because it carries no number. The guard is against a future edit "strengthening" it with one. Do not add a multiplier, do not draw the curve, and do not attribute the ordinal claim to Boehm as settled research — it stands as plain cost logic without him.

**Frameworks**
- Plan mode · [borrow:none] · law:none · ← cc-permission-modes, cc-plan-file
- Walking skeleton / vertical slice · [borrow:agile practice] · law:none · ← cockburn-walking-skeleton, horthy-wsff
- Sycophancy · [borrow:ML research] · law:principal-agent · ← sharma-sycophancy, perez-model-written-evals
- Generator–verifier asymmetry · [borrow:practitioner-coined] · law:ooda-with-act-collapsed · ← osmani-agentic-code-review, vjk-four-reviewers
- Comparative advantage · [borrow:Ricardo] · law:comparative-advantage · ← cultural-vocab
- Defect-cost escalation · [borrow:software economics] · law:none · ← boehm-defect-cost, bossavit-leprechauns
- Name the uncertainty before you move · [borrow:groundwork pattern language] · law:name-the-uncertainty-before-you-move · ← cultural-vocab
- Decision-tree walk-down · [borrow:practitioner-coined] · law:none · ← pocock-grill-me

**Stance** `[stance:2026-07-31 level:L2]`
- holds: that **judgment, not generation, is the binding constraint** is the least contested thing in this lecture's subject. Osmani puts review as *"the most leveraged skill in software right now"*; Horthy's whole essay lands on human review made affordable by upfront planning; Ronacher's loop work and the absorption-bottleneck material arrive at the same place from different directions. Call the direction L3 and the specifics L2. That plan-before-work is where the cheap check lives is also uncontroversial — it is the shape of plan mode, of compound engineering's explicit plan step, and of Horthy's prescription.
- contested: **the content of a good plan is very nearly unpublished.** Across six practitioners searched on 2026-07-31, exactly one — Horthy — publishes a rubric you could hold a plan against. Four of our five criteria remain the house's own synthesis, layered `vision` and owing nothing; that is not a sourcing gap, it is where they came from. The fifth is his, credited. **Two voices saying plan quality matters is L1–L2, not convergence** — do not let this file drift into "the field agrees". Second and sharper: **the field does not agree that the human belongs at plan-review at all.** Osmani's outer-loop model puts the human at constraint-setting *before* and evidence-audit *after*, explicitly not inside the loop where a plan-review step would sit. Our central move sits in a slot his model leaves empty.
- decided: **plan-review is a different discipline from constraint-setting, so Osmani's empty slot is not our gap, 2026-08-02.** Constraint-setting authors the input before the agent has produced anything; plan-review reads an artifact the agent produced and pushes back on it. One is writing, the other is judging, and *find is easier than judge* is the whole reason the second is a taught move. His outer-loop model answers where the human sits at team scale, not what the human does. No body edit: the body names nobody, so nothing is misattributed either way.
- would-move-it: **the 2026-07-31 run already moved it once** — the standing question was "does any practitioner name a criterion our four cannot hold?", the answer was yes (scope exclusion), and the slide went to five. So the falsifier fired and was taken. What remains, and what the next run should aim at: **rollback / reversibility** (how do we undo this), **open questions routed to a human** as distinct from assumptions merely flagged, a **context manifest** (what the agent must read at execution time), and a **cost or step-count budget**. All four were hunted on 2026-07-31 and none was found as a named criterion anywhere. "Named assumptions" is broad enough to be stretched over most of them — resist stretching it; an assumption you record and a question you route are different moves. Second falsifier, still live and untouched: evidence that plan-review is the wrong place for the human, i.e. that constraint-setting-plus-audit outperforms it. **Watch the other direction too:** five criteria is where a checklist starts becoming a list, and a sixth should have to argue for itself against cutting one.

**OODA**
- question: has any practitioner published a plan-quality rubric for agent-written plans naming a criterion the four cannot hold? And does plan mode still behave as the body says? The second half is not bookkeeping — this is a capability-dense lecture whose mechanics moved twice in the last fortnight.
- roster: Dex Horthy (HumanLayer), Addy Osmani, Armin Ronacher, Simon Willison, Matt Pocock, Kieran Klaassen + Dan Shipper (Every); plus `platform-watch/coding-agents/state.md` and the Claude Code docs for plan-mode deltas.
- last-run: 2026-07-31

<!-- /backing -->
