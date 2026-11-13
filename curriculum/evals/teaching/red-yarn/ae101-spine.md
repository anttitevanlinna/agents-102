# AE101 verification/trust yarn: structural model

Paths relative to `curriculum/`. Module pages in `trainings/agentic-engineering-101/`. Text above `<!-- maintainer -->` only. This sits beside `evals/teaching/red-yarn/ae101-yarn.md` (the word model); it covers what that file leaves out: placement.

## 1. Slide continuations

**Chain A: the map-engine (one drawing, five stations).** Phases Intent, Context, Work, Verification, Absorption, Outcome.
1. M2 `lectures/the-whole-map.md`, `## Every task maps onto the same six phases`, `{{figure:map-engine}}`. Introduces the six phases. Verification gets its fixed place: "How you know the result is any good. Tests, checks, reads: everything that pushes back on the work before you accept it." The checking loop is a dashed ghost (`◌ THE CHECKING LOOP`, "read · judge · gate what ships · by hand for now").
2. M3 `lectures/the-loop-half-filled.md` (the module page sends you there: "Before you clear the session, see the near half of the map whole, its parts named."). Lecture title is "The near half of the map". Slide `## Three modules on the near half: Intent, Context, Work` carries `{{figure:map-engine-m3-close}}`. Adds: a haze over the far half, firm near-half loops, caption "NAMED SO FAR: INTENT · CONTEXT · WORK" / "THE FAR HALF · AHEAD". Checking loop still dashed. Callback: "M1 stepped into the territory without the map, on purpose. The map arrived at M2." The closing slide `## The far half goes quiet` ends "how do you trust work you didn't watch?" and says "M4 opens it."
3. M4 `lectures/the-far-half.md`, first slide `## Back to the map: the far half opens`, `{{figure:map-engine-m4-open}}`. Haze moves to the near half ("NEAR HALF · DONE"), the far half is lit. Checking loop still dashed. Text: "The map lights its other side now." Verification is defined again almost verbatim, then "On a long session, this stops being a glance and becomes a job." Closes on the M3 question: "when the agent takes a hundred steps alone, what makes you trust the result at the end?"
4. M5 module page `learn-from-the-test.md`, `## The whole map?`, the same `map-engine-m4-open` figure. Refers back: "The map at sitting 2 had an edge nobody explained." This one is about the wall (personal to team) and is flagged out when M6 follows. Verification is not the topic here, but the checking loop is still shown dashed while the student has just built one.
5. M6 `lectures/composing-the-workflow.md`, `## The checking loop, drawn solid`, `{{figure:map-engine-filled}}`. The checking loop turns solid and the label changes from "by hand for now" to "by your evals now". The heading "drawn solid" answers the earlier "dashed". The student's own M5 verifier and M6 evals are what filled it.

**Chain B: delegation frontier (reach x calibration, four states).**
- M2 `lectures/when-a-plan-is-good.md`, `## What you can test and check sets your complexity ceiling`. It teaches only the two axes. The name is held back on purpose (maintainer note: "The name rides the figure's own caption"). Last bullets: "Push reach past what you can check and you have not delegated more. You are checking less." / "The ceiling is not fixed. Every check you make cheap and repeatable raises it."
- M5 `lectures/the-gate-is-a-claim.md`, `## The delegation frontier` (tier:1, closer), the same `{{figure:delegation-frontier}}`. The name is given here. The same line returns with the axes swapped for the verifier: "Push reach past your calibration and you are not delegating more. You are checking less." Adds "The frontier moves outward only as fast as the gates behind it." and the bitter-lesson shelf life. The maintainer note says "read it as recognition rather than introduction."
- Also in the optional M1-to-M2 supplementary `agentic-engineering-progression.md` and M4 prework.

**Chain C: near half / far half as vocabulary.** The phrases are set at M3 (`the-loop-half-filled.md`) and used on: M3 module page ("see the near half of the map whole"), `the-far-half.md`, `the-agent-loop.md`, `reading-the-return.md`, `ironies-of-automation.md`, `composing-the-workflow.md`. The M3 hand-off line to M4 (`earn-the-trust.md` Next) is "Module 4 turns the discipline inward".

**Chain D: sea passage (M5).** `lectures/what-packaging-is.md`, `## One session, plotted`, `{{figure:session-sea-passage}}`. It points back at the exercise just done: "The diagnose-and-re-send you just ran was exactly this move." It reappears in M6 as `skill-sea-passage` (same drawing language) in `composing-the-workflow.md`, `## A skill's footprint is where its job lands`.

**Chain E: the control loop.** M3 `the-loop-half-filled.md`: "The agent loop is a closed-loop controller... Cut the feedback signal (a test, a check, a read) and it drifts." M6 `composing-the-workflow.md`, `## You drew a control loop`, `{{figure:student-closed-loop}}`.

**Chain F: the second read.** M1 (`the-machine-you-just-met.md`), M2 (`push-back-on-the-plan.md` Phase 4, a second pass with a different method), M3 (`the-loop-half-filled.md`: "That is why the second read exists"), M5 (`the-gate-is-a-claim.md`: "A same-window double-check has none of it").

## 2. Exercises as carriers

- **Check step right after the action.** M3 `threat-model-with-stride.md`: `## Check where the ADR landed` ("The agent reasoned forward from the conversation, not from the filesystem."). M5 `fork-the-worktree.md`: `## Check the copy landed`. M5 `diagnose-and-resend.md`: `## Prove the verifier actually fires` ("A built-but-untested verifier is no verifier."). M2 `push-back-on-the-plan.md` Phase 3 box: "one check that the regeneration held: read the flagged steps in the revised plan, not the agent's report of them". M1 `orient-and-introspect.md`: `## Read the self-report, then spot-check it`. M3 `author-test-strategy-skill.md` Phase 2: "Authoring without invocation is theatre."
- **"The point:" lines as a ladder:** M1 "pushing back is core work" (`fix-tests-first`); "the context window is not your codebase" (`orient-and-introspect`); M2 "the first pass is plausible, and usually not good enough"; M3 "STRIDE without an access-surface map is pub-quiz threat modeling", "STRIDE's value is rejection, not enumeration", "test strategy authored generically is a pyramid diagram"; M4 "you find the thin spots before the agent does" (`walk-and-send-off`), "send it off plainly and you find out what you can't steer yet" (`set-the-markers-send-it-off`); M5 "packaging you built against your own failure beats packaging you guessed at"; M6 "two sessions are enough to place every lesson".
- **The deliberate hole (M4).** `set-the-markers-send-it-off.md` sends the task off with no plan file, no verifier, no reference ("un-packaged", `run-the-first-experiment.md` Key Concepts). Its markers exist so M5 can read the session: "Ask Claude where the record of this session lives", then commit a starting point whose branch name and transcript path go into `task.md`. M5 `diagnose-and-resend.md` builds the verifier from what the return shows. `learn-from-the-test.md` says it: "Where a check would have settled the worry, that is the one worth building before you send again."
- **Artefacts read back later.** M2 plan file, path noted "on your way out" (M2 Next), read at M3. `CLAUDE.local.md` rules from M1 `compound-and-close`, copied across at M5 (`fork-the-worktree`: "what you built in Module 1 and Module 4 comes with you"). M3 ADR and skill, which M4 `walk-and-send-off` Phase 2 audits ("The agent reads CLAUDE.md, CLAUDE.local.md, memory, ADRs, and any skills you've authored"). M4 `observations/`, `task.md` and the `Run coordinates` block, read by M5 and M6 (`spot-gaps-build-the-loop.md`: "Read from the recorded coordinates"). M6 reads two sessions (M4 un-packaged vs M5 packaged) against each other.
- **Opposite-direction guards in prompts.** M1 `compound-and-close.md`: "Ask only what it added, and the agent finds something to have added", so the prompt keeps "or 'nothing new' if nothing did". M6 `spot-gaps-build-the-loop.md`: "Expect over-credit on the packaging. A fair push-back is 'name one thing the verifier missed, concretely.'" M5 module page: "Ask the agent to show what the gate checked and what sat outside its view before you credit the kit."
- **Sharpening from evidence, not taste.** M3 `## Sharpen the skill from evidence` then `## Read the sharpen with a skeptical eye` (module-page sections that carry the same-window self-charity warning).

## 3. SVGs

| Figure | Where | Shows |
|---|---|---|
| `map-engine` | M2 the-whole-map | six phases, loops, dashed checking loop "by hand for now" |
| `delegation-frontier` | M2 when-a-plan-is-good; M5 the-gate-is-a-claim | reach x calibration; calibrated agency vs reckless autonomy "big handoffs, green you took on faith"; "THE FRONTIER moves as fast as the gates behind it" |
| `map-engine-m3-close` | M3 the-loop-half-filled | near half firm, far half hazed, "THE FAR HALF · AHEAD" |
| `map-engine-m4-open` | M4 the-far-half; M5 module page | haze flipped, far half lit, checking loop still a dashed ghost |
| `session-sea-passage` | M5 what-packaging-is | "DRIFT SINCE LAST CHECK", wedge, "A FIX · A CHECK", "STANDING CHECK always lit at the edge", "WRONG HARBOR · Confident, and wrong." |
| `student-closed-loop`, `double-loop-m6`, `pocock-skill-system`, `skill-sea-passage` | M6 composing-the-workflow | the student's own control loop, the second loop, a kit |
| `map-engine-filled` | M6 composing-the-workflow | checking loop solid |
| `agent-picture` | `new-human-role-in-the-loop.md` | the loop with "checks deliberately absent from the figure" (maintainer note) |
| `double-loop`, `instructions-route` | M2 `how-instructions-grow.md` | rule changes as the second loop |

**Map-engine variants, diffed.** Same 1200x560 canvas, same coordinates, same palette `#efe6d2`. Changes only:
- `map-engine` to `-m3-close`: adds a 55% haze rect over x=600..1188 (the far half); re-labels four loops (compounding, prototyping, build, agent's own) in firm type; adds the red captions "NAMED SO FAR: INTENT · CONTEXT · WORK" / "THE FAR HALF · AHEAD". Checking-loop label stays `◌ ... by hand for now`.
- `-m3-close` to `-m4-open`: haze rect moves from x=600 to x=12 (over the near half); the loop labels get `fill-opacity="0.45"`; captions become "NEAR HALF · DONE: INTENT · CONTEXT · WORK" (grey) and "THE FAR HALF · AHEAD". The compounding-loop label is dropped from the lit set.
- `map-engine` to `-filled`: two attribute edits and two text edits. The checking ellipse goes from `stroke-dasharray="3 9" opacity="0.45"` to solid `stroke-width="2.6" opacity="0.9"`; `◌ THE CHECKING LOOP` loses its `◌` and turns teal; "by hand for now" becomes "by your evals now". The aria-label says it: "The checking loop, dashed until now, is drawn solid and labelled as run by the evals built across the far half."
- SVG ids are prefixed per variant (`wm-`, `lh-`, `fh-`, `mf-`) so several can land in one page.

## 4. Repetition

- Same figure keys, re-used: `map-engine-m4-open` M4 then M5 (a gap of one module); `delegation-frontier` M2 then M5 (three modules). Single-sourced in `figures/`, so one edit moves all.
- Fixed phrases: "You are checking less" (M2, M5). "Assume about 10%" (M1 exercise; M2 Key Concepts "Assume about 10% of it is wrong and go find which part"; M5 `diagnose-and-resend`: "Same prior as the repo read in Module 1"). "The M1 countermove rides along" (M5 module page) and "The countermove from M1 goes to work" (M3 `map-the-access-surface`). "Verification" definition, M2 whole-map then M4 far-half, nearly verbatim.
- Exercise shapes repeat: push back twice (M1 fix-tests-first, M2 push-back-on-the-plan, M3 threat-model "Push back on the incident story", M6 "name one thing the verifier missed"). The same-session self-audit with escape hatch: M1 compound-and-close, M3 sharpen, M5 mid-run worries.
- Recurring heading shape "Check ..." / "Read ... with a skeptical eye" / "Prove ...".
- Spacing is every module, never two in a row identical: M1 spot-check, M2 plan read, M3 skeptical read, M4 session as test, M5 verifier, M6 pass rate.

## 5. Visibility

- **Explicit:** M3 Big Idea ("Trust isn't watching harder. It's verification you can run without being there."); the word "Verification" on the map; `the-gate-is-a-claim.md` headings ("Passing is not proof", "Gates decay").
- **Structural only:** the dashed-to-solid checking loop (no slide says "this is the same loop as M2's dashed one"); the M4 send-off with no verifier (nothing says "this is missing a verifier"; M5 supplies the name); read-back artefacts; the "The point:" ladder; the map haze moving sides. No "Verification" section or recap slide exists in any module.

## 6. Recipe: thread a yarn through existing modules, align without adding

1. Pick one drawing that already exists and show it at 3 or more points. Re-point its caption only if the module's job changes. If a variant is needed, change attributes and labels, not geometry, and prefix ids.
2. Make the first appearance carry a visible gap (dashed, "by hand for now", a blank in the exercise). Make a later station close the gap with the same words reversed ("by your evals now").
3. Re-point headings to name the check at the point of action ("Check the copy landed", "Prove the verifier actually fires") rather than adding new slides.
4. Re-point each exercise's "The point:" line so the lines read as a ladder when listed in order.
5. Move the check step to directly after the action in the exercise (an existing paragraph becomes its own `##` step) instead of writing a recap.
6. In each Key Concepts block, rewrite one bullet to state the module's size of the claim; do not add a bullet.
7. Use Next / Bring lines as hand-offs: end a module on the question the next one opens ("how do you trust work you didn't watch?") and have the next module's first slide quote it.
8. Back-reference by module number plus a fixed phrase ("Same prior as the repo read in Module 1"); never re-explain the reason.
9. Leave one deliberate hole in an exercise whose absence the next module fills, and make the earlier artefact (path, transcript, plan file) the input of the later one.
10. Reuse an existing slide through `#id` borrow or the same `{{figure:}}` key instead of copying; add the ids to the home file.
11. Let each repetition widen scope (self-report, plan, own skill, unwatched session, the verifier, the pass rate) while holding wording constant.
12. Never add a theme label slide. Check by reading only the headings, "point" lines and figure captions in order: the thread should be legible from those alone.
