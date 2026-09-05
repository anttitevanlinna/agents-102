# What packaging is

The packaged re-send is running and the laptop is closed again. What you assembled to get there has names.

## One session, plotted
<!--tier:1-->

One long session, drawn as a sea passage.

{{figure:session-sea-passage}}

- Drift grows with distance since the last check. The agent steers each step from its own previous step, so small errors compound silently until something outside the session measures position. On the chart that is the wedge: everywhere the session might be.
- **A check is a position fix**. At a fix the wedge of possible states collapses to a point, and the next leg starts from a known position instead of an assumption. The diagnose-and-re-send you just ran was exactly this move: measure where the session actually is, then aim the next leg from there.
- Guardrails belong where damage cannot be undone. Fence the reef, not the open water. At an irreversible edge a standing check stays lit whether anyone remembers to look or not; where redo is cheap, let the session sail.
- An unchecked session arrives confident, and wrong. Same start, no fixes, one wedge widening the whole way. The success report comes from the wrong harbor.

## Reference and plan
<!--tier:1-->

- On the map, the kit is what stands in for you at Verification.
- **Reference artefact**, against goal drift. A spec the agent reads and re-reads: success criteria, pointers at the relevant memory, named constraints. The spec on disk stays readable mid-session when the buried instructions in the conversation no longer are. In Armin Ronacher's January 2026 MiniJinja port, the original Rust snapshot tests played this role; in your re-send, the reference you assembled plays it.
- **plan.md** the agent owns and mutates, against context rot. A working document that holds durable state across the task: the agent reads it at every session boot, updates it as decisions land, re-reads it when the working window fills. What got ruled out an hour ago is written down, not remembered. Geoffrey Huntley's Ralph practice leans on exactly this primitive to bootstrap entire greenfield projects.

## The verifier completes the three-pattern
<!--tier:1-->

- **External verifier**, against plausible-but-wrong. An automated check that decides whether a piece of agent-produced work meets a quality bar. Your job is to spot when quality is passable and nudge the agent along to done-done.
- The menu is a synthesis across practitioners (Cherny, Huntley, Ronacher); no single write-up carries it. You built one against your dominant failure. The other two sit alongside the three-pattern for next time.

## The model has read the field
<!--tier:3-->

- The weights hold the written record: the setup posts, the plan-file templates, the verifier write-ups, the reversals that followed them. More of the field than you will read in a career.
- Ask for best practice and that is what answers: a well-read average of what other people published about other repos, frozen at a cutoff while the consensus keeps moving. Steer it as hard as you like: what it holds about your next run is a forecast.
- Whether this field ever settles into a real best practice is an open question. Either way, today's playbooks are **candidates**.

## The missing evidence is local
<!--tier:3-->

- Much of what shapes your setup is on the record, and the agent can survey it: the test suite's shape, the merge rules in CI, the age of everything in git.
- What no survey returns: how this task, this model, this repository and this setup behave together in a run. No document holds it because, until the run, there is nothing to document. Asked ahead, the model predicts. **A prediction is not a measurement.**
- So a playbook stays a candidate until something tests it here, and nothing published can run that local test for you.

## The optimum is local, and it moves
<!--tier:3-->

- An A/B on your own repo: the same task without the kit, then with it. The un-packaged send-off is the baseline; the packaged experiment testing the kit is running right now.
- Where the two sessions disagree, you'll know something no write-up could have told you: which failure the kit catches here, and which still recurs.
- The experiment promotes a candidate to tested-here: a wide first fix that narrows as more experiments land. The local optimum stays ahead, moving when your stack moves.
- The agent makes the evidence cheap: it runs the task, reads its own transcript, diffs the returns. **The engineer decides**: what counts, what the evidence means, what earns promotion into durable practice.
- What's tested holds in review: *"measured here, this catches it, watch."*

## Every re-feed pass starts a fresh session
<!--tier:2-->

- **Re-feed**, the third shape on the verifier menu: loop the same prompt with a check baked in, and the agent re-runs on top of the previous round's output until the check passes.
- Each pass is a new session, not a continuation of the last one. What carries over is what sits on disk: the work the previous pass wrote, and the check that judged it. Nothing from the conversation survives.
- That is why it catches drift. Drift lives in the conversation, and the conversation is what the loop throws away. Re-run inside the same session and you compound the drift; re-feed and the next pass reads the goal cold.
- The check is the stopping condition, so a verifier that can never fail makes an infinite loop. Every pass also pays to re-read its context from scratch. That cost is the point: it buys a session with no drift in it.

<!-- maintainer -->

**`## Every re-feed pass starts a fresh session` exists to close a depth asymmetry across the verifier menu, and its scope is mechanism only.** The menu lives in `diagnose-and-resend.md`'s Phase 3, where the student picks from it; it names three shapes as peers and tells them *"match the failure, not your familiarity."* Shape 1 is expanded by a whole lecture (`the-gate-is-a-claim.md`); shape 2 by `hooks-always-fire.md`, pulled forward before the exercises 2026-08-25; shape 3 has no expansion here. Runtime primitives (`/loop`, `/schedule`) belong to M6's `composing-the-workflow.md` cadence slide and stay out of this slide by design, so the M6 elaboration has something to land. **M6 carries no Ralph slide; this slide is the Ralph re-feed shape's only home** — a lever sat in plain shell, Huntley reached for it, the next Ralph is yours — and mechanism bolted onto it would convert the training's closing beat into an explainer. A judge reading *re-anchoring* in the exercise's Ralph re-feed bullet as a dangling referent should resolve it here rather than propose a clause upstream.

**Current shape (2026-08-14/15, Antti-directed; hooks extracted 2026-08-25):** seven slides. The two hook slides + demo prompt now live in `hooks-always-fire.md`, wired before the M5 exercises (Antti: doable for laymen, helps complete the exercise); their claims and the cc-hooks-docs stamp travelled. The three-pattern lands first; the theory passage (*The model has read the field* · *The missing evidence is local* · *The optimum is local, and it moves*, wording Antti-blessed) fills the middle; re-feed retains the implication end. Cut redistribution, all three documented: the Intercom tier case is taught nowhere; M5 carries no duplicate; context-window management and the subagent-isolation callout live in M4's durable-state slide; **the 80/20 ratio slide is cut with its personal axis absorbed into the theory passage's engineer-decides bullet — the numeric ratio deliberately has no M5 slide, and its only stamped home is `composing-the-workflow.md` (the M6 map figure).**

- Family B judged 2026-07-03: B-star durability PASS — keystone three-pattern (slides 2–3) recovers NAMED·PLACED·MECHANISM·GOVERNOR cold, placed at Verification; closer honors recognition-before-naming ("what you assembled… has names").

**Slide progression:** chart → reference and plan → verifier → the theory passage → re-feed. The opener remains recognition-before-naming; the theory passage sits between the kit and its implications so the trophy is re-priced to *candidate* before the mechanics resume.

**Noun-"run" on the theory slides — Antti-waived 2026-08-15.** The experiment sense (*"what it holds about your next run is a forecast"*, *"until the run, there is nothing to document"*), not session/task/run registry drift; the slides are about evidence produced by runs, and "session" would blur the claim. Do not flatten.

**`## Reference and plan` stays concept-named (Antti 2026-08-15).** Naming two concepts is a valid header; not every header owes a claim. The dense-slides note's "headings carry the claims" is a delivery description, not a per-header requirement — do not re-flag.

**§3 disposition (was 4×M5 + 5×M6 above the fence; now zero):** "walked into M5" → lede recast without ref · "start of M5" (failure modes) → folded into slide-1 mapping bullets · "M5 teaches the extend camp" → "the extend camp is the one you just ran" · "Bridge to M6" (all 5×M6 + "M5 asks") → module file `## Next` per §3; no refs remain above the fence.

**Sea-passage trailers cut (2026-08-25, Antti-approved):** the two hanging lines after the chart bullets (*"Packaging decides what catches problems during the handoff."* / *"A standing check pushes back before the next wrong step builds on the last one. That is the difference between a final review and feedback inside the passage."*) — doctrine restated after the chart already argued it (`check_slides.md` §16 class a). Their claim rows went with them. Do not restore.

**Quality:** compendium-audited 2026-09-05 (writing@874f921c story@874f921c technical@874f921c behavior@0cea7581 pedagogy@d5aa7e3d strategy@aa1f7826 slides@c0c37913)
- judges @874f921c: writing PASS (1 todo see instances/ae101--lecture--what-packaging-is.writing.json), story PASS, technical PASS (1 todo see instances/ae101--lecture--what-packaging-is.technical.json), behavior PASS, pedagogy PASS, strategy PASS (1 todo see instances/ae101--lecture--what-packaging-is.strategy.json), slides PASS (1 todo see instances/ae101--lecture--what-packaging-is.slides.json)
- source-freshness stamped 2026-05-25; MiniJinja and getpushtoprod stamps re-verified 2026-07-02 (stamps in Source verification block; run `source-freshness.sh --target <cohort-date>`).
**Lecture meta:** *10–15 min closing lecture for M5, deck-shaped. Names the three-pattern after you have built each piece. Earns the name from felt evidence, not from a slide deck delivered cold. The M6 bridge lives in the module file's `## Next`, not here.*
**Word count:** ~940 words body.

**Theory passage (three slides after the three-pattern slide; wording Antti-blessed 2026-08-14/15):**
projects while the packaged re-send is out — *"the packaged experiment testing the kit is running right
now"* is literally true in the room; do not move the passage after the return lands or the tense breaks. It
must not resolve the gate lecture: tested-here is not a verdict — that hand-off belongs to *Passing is not
proof*, and the phrase "one session is a sample" is deliberately not used here (it is that lecture's header). The fate of "best practice" stays an
open question by design — do not resolve it in either direction. Two lines flagged for the technical judge:
*"a well-read average"* (sampling characterization, roughly-true by design) and *"more of the field than
you will read in a career"* (volume claim, deliberately not a currency claim — the cutoff clause beside it
carries currency). The module file's Key Concepts four-line summary maps to these slides.

**Time:** 11 min at presentation pace (walked per-slide 2026-08-15 at 1.3–1.5 per prose slide, chart figure 3; minus ~3 for the two hook slides extracted 2026-08-25).

**Delivery mode:** In-room close after Debrief.

<!-- backing -->

Claims
- `drift-grows-between-checks` · vision · "Drift grows with distance since the last check." ← none-owed
- `check-is-a-position-fix` · vision · "**A check is a position fix**" ← none-owed
- `guardrails-at-irreversible-edges` · vision · "Guardrails belong where damage cannot be undone. Fence the reef, not the open water." ← none-owed
- `unchecked-run-confident-and-wrong` · vision · "An unchecked session arrives confident, and wrong." ← none-owed
- `three-pattern-is-a-synthesis` · detail · "The menu is a synthesis across practitioners (Cherny, Huntley, Ronacher); no single write-up carries it" ← kim-on-cherny, huntley-ralph, ronacher-minijinja — ownership-form wording (`check_research_claims.md §1` vocabulary-is-a-claim: synthesis owned, no field convergence asserted); each named practitioner's pieces are on the stamps.
- `kit-stands-in-at-verification` · vision · "the kit is what stands in for you at Verification" ← none-owed
- `reference-artefact-against-goal-drift` · vision · "**Reference artefact**, against goal drift." ← none-owed
- `minijinja-snapshot-tests-as-reference` · detail · "the original Rust snapshot tests played this role" ← ronacher-minijinja
- `plan-md-against-context-rot` · vision · "**plan.md** the agent owns and mutates, against context rot." ← none-owed
- `ralph-bootstraps-greenfield` · detail · "Geoffrey Huntley's Ralph practice leans on exactly this primitive to bootstrap entire greenfield projects" ← huntley-ralph
- `external-verifier-against-plausible-but-wrong` · vision · "**External verifier**, against plausible-but-wrong." ← none-owed
- `re-read-cost-buys-a-clean-session` · vision · "That cost is the point: it buys a session with no drift in it." ← none-owed
- `weights-hold-the-written-record` · detail · "The weights hold the written record: the setup posts, the plan-file templates, the verifier write-ups, the reversals that followed them." ← amp-handoff, amp-neo
- `more-field-than-a-career` · vision · "More of the field than you will read in a career." ← none-owed
- `best-practice-answers-as-average` · vision · "a well-read average of what other people published about other repos, frozen at a cutoff while the consensus keeps moving" ← none-owed
- `next-run-is-a-forecast` · vision · "Steer it as hard as you like: what it holds about your next run is a forecast." ← none-owed
- `best-practice-fate-open` · vision · "Whether this field ever settles into a real best practice is an open question." ← none-owed
- `interaction-evidence-nonexistent` · vision · "No document holds it because, until the run, there is nothing to document." ← none-owed
- `prediction-not-measurement` · vision · "Asked ahead, the model predicts. **A prediction is not a measurement.**" ← none-owed
- `first-fix-wide-by-design` · vision · "a wide first fix that narrows as more experiments land" ← none-owed
- `engineer-decides-what-counts` · vision · "**The engineer decides**: what counts, what the evidence means, what earns promotion into durable practice." ← none-owed

Sources
- ronacher-minijinja `[checked:2026-08-01 result:OK due:none]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Rust→Go port, 14 Jan 2026: snapshot tests as verifier, 10 h / 2.2M tokens, three pieces cleanly inferable. **Durable account, `due:none`** (`source-freshness-format.md` § Durable-account variant): a completed run reported first-hand does not expire, so swapping a perfect example purely on its date would trade accuracy for freshness. Figures re-verified verbatim on page 2026-08-01: *"Agent run duration: 10 hours (3 hours supervised)"*, *"Total tokens: 2.2 million"*. **The condition that binds is the date in body** — cite it as *"in January 2026"* so the account cannot read as current practice. "Three pieces cleanly inferable" is our reading of his description, not his naming. **And the naming scope is tighter than "not his naming" conveys — he does not use the words at all.** Full-text check 2026-08-01: *reference* occurs once, as an adjective for test files (*"Parse the reference insta `.snap` snapshots and compare output"*); *verify* occurs once as an ordinary verb (*"using insta to verify they match"*); *verifier* occurs zero times. Plan files appear only as the approach he **rejected** — *"Without switching branches, I would probably just make new sessions and have more plan files lying around"* — so the post is 2-of-3 as practice and 0-of-3 as vocabulary. A 14-post sweep of his archive (Nov 2025–Jul 2026, the full window) returns zero uses of *verifier* anywhere, including the three posts that discuss agent harnesses at length. His nearest statement of the idea names nothing: *"In an ideal world the agent has one command, that lints and compiles and it tells the agent if all worked out fine"* (*A Language For Agents*, 2026-02-09). fallback: cite him for the practice, never for the vocabulary.
- huntley-ralph `[checked:2026-08-01 result:OK due:none]` https://ghuntley.com/ralph/ — [practitioner direct] **Huntley's Ralph, as he documented it (2025-07-14): all three pieces present together.** Plan: *"create/update a @fix_plan.md which is a bullet point list sorted in priority… ALWAYS KEEP @fix_plan.md up to do date with your learnings using a subagent"* (the filename is `@fix_plan.md`; our *plan.md* is a generic label for the shape, not his). Reference: *"study specs/\* to learn about the compiler specifications"*, diffed explicitly. Verifier: type-system backpressure plus *"run the tests for that unit of code that was improved"*. Greenfield-only by his own scoping — *"no way in heck would I use Ralph in an existing code base"* — which is what the body's "greenfield projects" tracks. A Bash loop over durable markdown; no ticket-triage claim. Still active per *everything is a ralph loop* (2026-01-17), which cites the original rather than restating the pieces. `due:none` scopes this stamp to **what he wrote on 2025-07-14**: re-reading it next year will not change that. fallback: cite as origin of the loop-prompt-over-durable-state technique; drop any application claim.
- huntley-ralph-currency `[checked:2026-08-01 result:OK due:2026-07-17]` https://ghuntley.com/ralph/ — [practitioner direct] The second job this URL does. The body's present-tense *"Huntley's Ralph practice leans on exactly this primitive to bootstrap entire greenfield projects"* is a live position, not a completed event, so it carries its own clock (`check_research_claims.md` §2b). Currency evidence is *everything is a ralph loop*, 2026-01-17; due = pub+6mo. Stance § would-move-it holds the falsifier: Huntley abandoning or restructuring Ralph leaves the count at zero and the slide owes a different sentence. fallback: date the practice clause in body and let the durable line above carry it alone.
- klaassen-stop-coding `[checked:2026-08-01 result:CAVEAT due:none]` https://every.to/source-code/stop-coding-and-start-planning — [practitioner direct, vendor venue] Klaassen (2025-11-06). Backs the Stance's by-exclusion characterization only: his plan artefact is a pre-work spec created once, reviewed, implemented and stored in GitHub — **structurally different** from a living document the agent mutates across a run, which is what our *plan.md* piece does. No reference-diff and no verifier language anywhere in his corpus (full Every.to bibliography, 20 articles, swept 2026-08-01). `due:none` on the durable-account variant — the published piece says what it says; the by-exclusion count leans on the dated archive sweep, so a newer Klaassen publication on this topic re-opens it. fallback: cite him for planning-first posture only; do not count him toward the triad.
- kim-on-cherny `[checked:2026-08-29 result:OK due:none]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): Kim's "13 tips" writeup lists Cherny reaching for background-agent / agent-stop hook / Ralph re-feed. The three-shape taxonomy is KIM'S synthesis, NOT Cherny's own, and is ABSENT from the Orosz/Pragmatic Engineer interview. Body credits Cherny as a practitioner who uses all three, not as the taxonomy's author, and says so in the same sentence. Re-fetched 2026-08-29: passage unchanged — *"Boris either prompts Claude to verify its work with a background agent when it's done, uses an agent-stop hook for deterministic verification, or uses the Ralph Wiggin plugin for autonomous looping"* — still Kim's framing. **Durable account, `due:none`**, matching its siblings in this block (ronacher-minijinja, huntley-ralph, klaassen-stop-coding): a dated analysis and its attribution reading do not expire the way a currency claim does. fallback: present the three shapes as a practitioner-convergent menu, no single attribution.
- amp-handoff `[checked:2026-08-01 result:OK due:none]` https://ampcode.com/news/handoff — [practitioner direct, vendor] Amp (2025-10-23) rejected auto-compaction and bet on manual handoff: *"Compaction… always had downsides. It's lossy, for one."* Cited here ONLY as the first half of a dated reversal pair backing "the reversals" in the theory passage — a durable historical account, never current behaviour. fallback: drop the named pair; "the reversals" stands on the field's public record.
- amp-neo `[checked:2026-08-01 result:OK due:none]` https://ampcode.com/news/neo — [practitioner direct, vendor venue] Amp rebuilt on 2026-05-06 and killed the feature: *"So handoff is out. Compaction is in."* The second half of the reversal pair — a team that shipped a feature to avoid compaction, then adopted compaction. **Durable account, `due:none`** (`source-freshness-format.md` § Durable-account variant): backs the dated reversal event only, never Amp's current mechanism — a currency reading owes a dated due (`workflow-composition-lineages.md` amp-neo carries publication+6mo). Single vendor; cite as one team's reversal, never as a trend. fallback: as above.

Frameworks
- Dead reckoning and the position fix · [borrow:navigation] · law:is-a-closed-loop-controller · ← cultural-vocab
- Three failure modes · [borrow:none] · law:three-failure-modes · ← none — house vocabulary; the M5 opener carries the stamp and the naming caveat
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab
- Local success / global drift · [borrow:none] · law:local-success-global-drift · ← none — the wrong-harbor beat is this law in chart form
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the kit's map slot is Verification

Stance `[stance:2026-08-01 level:L1]`
- holds: each piece separately, and not the triad. Reference artefacts, durable plan files and automated verifiers each turn up across practitioner write-ups. **Counted strictly — all three present together as artefacts in one named practice — the independents number one:** Huntley's Ralph. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec rather than a document the agent mutates across a run, so it is a different piece wearing the same word. Against an L3 bar of 10–20 independents, the three-pattern is our combination of scattered practice — candid curriculum work, and misleading to call convergence. The body says "a synthesis across practitioners… no single write-up carries it" for exactly this reason (Antti-worded 2026-08-25; no provenance walkthrough on the slide — credit lives on the stamps).
- contested: whether a second named practitioner has published all three pieces as one practice, or anyone has named the triad as a triad.
- would-move-it: a second named practitioner publishing all three pieces together as one practice, or anyone naming the triad as a triad. Either turns "a synthesis across practitioners" into "practitioners converge," and the menu bullet has to change. **It moves the other way too** — Huntley abandoning or restructuring Ralph leaves the count at zero, and the slide would owe a different sentence again.

OODA
- question: has anyone besides Huntley published all three pieces as one practice, and has anyone named the triad as a triad?
- roster: Huntley, Ronacher, Klaassen, Cherny
- last-run: 2026-08-01

<!-- /backing -->

**Watch-fors (delivery):**
- The lede + slide 1 are the recognition beat. The room just built each piece; don't rush the naming.
- The three-pattern earns its name HERE, not in the pre-read. If a sim shows the closing landing as repetition rather than naming, the pre-read leaked.
- **"The menu is a synthesis across practitioners" needs the follow-on beat, or it reads as "so this is made up."** The authority is the room's own morning: they built three pieces against three failures they diagnosed themselves. Land the admission and then hand it straight back to them. A trainer who says this apologetically loses the slide; a trainer who says it as a credential ("nobody handed you this, you earned it") wins it. The one published practice running all three is Huntley's Ralph, so the pattern is not invented, only assembled.
- The theory passage's "best practice" question is open BY DESIGN. If the room asks *"so will the field ever settle?"*, hold the question open — *candidates, tested here* is the answer; resolving it in either direction undoes the slide.

**Philosophy callouts:** none. The naming is the beat; further philosophy tagging dilutes.

**Map-position clause (2026-07-02):** slide-1 lead bullet now places the three-pattern on the Field Map as "what stands in for you at Verification" — deliberately NOT an all-three-live-there claim (reference and plan.md guard the run mid-flight; the verifier is the piece that IS Verification); commissioned by theory-completeness-review finding #1, alongside M6's map slide (`composing-the-workflow.md` § *The checking loop, drawn solid*).

**Chart (eyeball queue):** the "One session, plotted" slide embeds the dead-reckoning chart from `protos/m4-run-chart-02-passage.html`, chosen by Antti 2026-07-02; protos 01 (terrain) and 03 (orienteering) remain in `protos/` as alternates. Only the svg carried over; the proto page's header strip did not (it names the drift wedge with a two-word label this lecture bans, so the wedge is described here without it). Pattern id renamed to `ps-reefhatch` to avoid collisions with other inlined charts. Slide count is 7 (9 before the 2026-08-25 hooks extraction; 7 before the 2026-07-06 size-split; `Reference and plan` and `Hooks always fire` each shed a slide); the budget question is eyeball queue #1. Open option: graft proto 03's course card (named gates per control: TESTS GREEN, SPEC STILL TRUE, NOTHING LEAKED, DIFF READS CLEAN) onto this chart if Antti wants gates named on-chart.
