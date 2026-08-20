# What packaging is

The packaged re-send is running and the laptop is closed again. What you assembled to get there has names.

## One session, plotted

One long session, drawn as a sea passage.

{{figure:session-sea-passage}}

- Drift grows with distance since the last check. The agent steers each step from its own previous step, so small errors compound silently until something outside the session measures position. On the chart that is the wedge: everywhere the session might be.
- **A check is a position fix**. At a fix the wedge of possible states collapses to a point, and the next leg starts from a known position instead of an assumption. The diagnose-and-re-send you just ran was exactly this move: measure where the session actually is, then aim the next leg from there.
- Guardrails belong where damage cannot be undone. Fence the reef, not the open water. At an irreversible edge a standing check stays lit whether anyone remembers to look or not; where redo is cheap, let the session sail.
- An unchecked session arrives confident, and wrong. Same start, no fixes, one wedge widening the whole way. The success report comes from the wrong harbor.

Packaging decides what catches problems during the handoff.

A standing check pushes back before the next wrong step builds on the last one. That is the difference between a final review and feedback inside the passage.

## Reference and plan

- Each piece turns up on its own across practitioner write-ups. This training combined them into one kit and gave them names. Geoffrey Huntley's Ralph is the one published practice that runs all three at once. Armin Ronacher's January 2026 MiniJinja port ran two of them and named neither. You built all three today off your own failures, which beats a citation. On the map, the kit is what stands in for you at Verification.
- **Reference artefact**, against goal drift. A spec the agent reads and re-reads: success criteria, pointers at the relevant memory, named constraints. The spec on disk stays readable mid-session when the buried instructions in the conversation no longer are. In Ronacher's MiniJinja port, the original Rust snapshot tests played this role; in your re-send, the reference you assembled plays it.
- **plan.md** the agent owns and mutates, against context rot. A working document that holds durable state across the task: the agent reads it at every session boot, updates it as decisions land, re-reads it when the working window fills. What got ruled out an hour ago is written down, not remembered. Ralph leans on exactly this primitive to bootstrap entire greenfield projects.

## The verifier completes the three-pattern

- **External verifier**, against plausible-but-wrong. An automated check that decides whether a piece of agent-produced work meets a quality bar. Your job is to spot when quality is passable and nudge the agent along to done-done.
- The menu you picked from is practitioner-lived. Kim's writeup of Boris Cherny has him reaching for all three shapes in his long-running practice; the menu form is Kim's synthesis. You built one against your dominant failure. The other two sit alongside the three-pattern for next time.

## The model has read the field

- The weights hold the written record: the setup posts, the plan-file templates, the verifier write-ups, the reversals that followed them. More of the field than you will read in a career.
- Ask for best practice and that is what answers: a well-read average of what other people published about other repos, frozen at a cutoff while the consensus keeps moving. Steer it as hard as you like: what it holds about your next run is a forecast.
- Whether this field ever settles into a real best practice is an open question. Either way, today's playbooks are **candidates**.

## The missing evidence is local

- Much of what shapes your setup is on the record, and the agent can survey it: the test suite's shape, the merge rules in CI, the age of everything in git.
- What no survey returns: how this task, this model, this repository and this setup behave together in a run. No document holds it because, until the run, there is nothing to document. Asked ahead, the model predicts. **A prediction is not a measurement.**
- So a playbook stays a candidate until something tests it here, and nothing published can run that local test for you.

## The optimum is local, and it moves

- An A/B on your own repo: the same task without the kit, then with it. The un-packaged send-off is the baseline; the packaged experiment testing the kit is running right now.
- Where the two sessions disagree, you'll know something no write-up could have told you: which failure the kit catches here, and which still recurs.
- The experiment promotes a candidate to tested-here: a wide first fix that narrows as more experiments land. The local optimum stays ahead, moving when your stack moves.
- The agent makes the evidence cheap: it runs the task, reads its own transcript, diffs the returns. **The engineer decides**: what counts, what the evidence means, what earns promotion into durable practice.
- What's tested holds in review: *"measured here, this catches it, watch."*

## Hooks always fire

- A **hook** fires on a named event, and the agent has no say in whether it runs. Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more. The runtime fires the script whether or not the model remembers it exists.
- Hooks exist because the LLM is forgetful. Drift, half-remembered rules: the longer the session runs, the less you can trust the agent to hit a step that "should" happen every time. Hooks don't forget.

## Hooks for must-happen, prompts for taste

- **Must happen goes in a hook**; recommended stays in a prompt or rule. Anything that breaks the work if it skips belongs in a hook: the verifier you just wrote, a pre-commit guard, a session-start context loader. Anything taste-shaped or context-dependent stays in a prompt where the LLM weighs it. Hooks are the runtime's "I will not forget," bought at the cost of flexibility.
- Your repo has demands that don't show up in someone else's article. The verifier you built was one hook against one failure; the same primitive maps to more. This one runs on the screen — watch the list come back rather than typing along.

{{prompt:what-packaging-is-1}}

The ones worth keeping are tied to a specific file, convention, or failure mode in this repo, not a generic team-could-want-this.

## Every re-feed pass starts a fresh session

- **Re-feed**, the third shape on the verifier menu: loop the same prompt with a check baked in, and the agent re-runs on top of the previous round's output until the check passes.
- Each pass is a new session, not a continuation of the last one. What carries over is what sits on disk: the work the previous pass wrote, and the check that judged it. Nothing from the conversation survives.
- That is why it catches drift. Drift lives in the conversation, and the conversation is what the loop throws away. Re-run inside the same session and you compound the drift; re-feed and the next pass reads the goal cold.
- The check is the stopping condition, so a verifier that can never fail makes an infinite loop. Every pass also pays to re-read its context from scratch. That cost is the point: it buys a session with no drift in it.

<!-- maintainer -->

**`## Every re-feed pass starts a fresh session` exists to close a depth asymmetry across the verifier menu, and its scope is mechanism only.** The menu lives in `diagnose-and-resend.md`'s Phase 3, where the student picks from it; it names three shapes as peers and tells them *"match the failure, not your familiarity."* Shape 1 is expanded by a whole lecture (`the-gate-is-a-claim.md`); shape 2 by the two hook slides directly above; shape 3 has no expansion here. Runtime primitives (`/goal`, `/loop`, `/schedule`) belong to M6's `the-loop-has-a-name.md` and `agents-that-build-agents.md` and stay out of this slide by design, so the M6 elaboration has something to land. **M6's `## Ralph` slide is a graduation beat, not this slide's twin** — a lever sat in plain shell, Huntley reached for it, the next Ralph is yours — and mechanism bolted onto it would convert the training's closing beat into an explainer. A judge reading *re-anchoring* in the exercise's Ralph re-feed bullet as a dangling referent should resolve it here rather than propose a clause upstream.

**Slide 8's prompt is a trainer-run beat, not a follow-along (Antti 2026-08-20).** A 2026-08-20
persona run scored this slide 5/10: a live generative task landing right after the deck's emotional
peak, with nothing telling the room whether to run it. The material stays — the fix is the cue.
Body now reads *"This one runs on the screen — watch the list come back rather than typing along,"*
which is `check_slides.md` §4's own remedy for a demo beat that a text read breaks: keep the setup
on the slide, move the doing to trainer delivery. Trainer runs `{{prompt:what-packaging-is-1}}` on
the projected repo and reads the returned list against the closing line's test (tied to a specific
file, convention or failure mode here — not a generic team-could-want-this). Do not restore an
imperative that asks the room to run it.

**Current shape (2026-08-14/15, Antti-directed):** nine slides. The three-pattern lands first; the theory passage (*The model has read the field* · *The missing evidence is local* · *The optimum is local, and it moves*, wording Antti-blessed) fills the middle; hooks and re-feed retain the implication end. Cut redistribution, all three documented: the Intercom tier case has its home in M6's `the-loop-has-a-name.md`, so M5 carries no duplicate; context-window management and the subagent-isolation callout live in M4's durable-state slide; **the 80/20 ratio slide is cut with its personal axis absorbed into the theory passage's engineer-decides bullet — the numeric ratio deliberately has no M5 slide, and its only stamped home is `the-map-filled-in.md` (M6).**

- Family B judged 2026-07-03: B-star durability PASS — keystone three-pattern (slides 2–3) recovers NAMED·PLACED·MECHANISM·GOVERNOR cold, placed at Verification; closer honors recognition-before-naming ("what you assembled… has names").

**Slide progression:** chart → reference and plan → verifier → the theory passage → hooks → re-feed. The opener remains recognition-before-naming; the theory passage sits between the kit and its implications so the trophy is re-priced to *candidate* before the mechanics resume.

**Noun-"run" on the theory slides (×5) — Antti-waived 2026-08-15.** The experiment sense (*"until the run, there is nothing to document"*, *"as more runs cross it"*), not session/task/run registry drift; the slides are about evidence produced by runs, and "session" would blur the claim. Do not flatten.

**`## Reference and plan` stays concept-named (Antti 2026-08-15).** Naming two concepts is a valid header; not every header owes a claim. The dense-slides note's "headings carry the claims" is a delivery description, not a per-header requirement — do not re-flag.

**§3 disposition (was 4×M5 + 5×M6 above the fence; now zero):** "walked into M5" → lede recast without ref · "start of M5" (failure modes) → folded into slide-1 mapping bullets · "M5 teaches the extend camp" → "the extend camp is the one you just ran" · "Bridge to M6" (all 5×M6 + "M5 asks") → module file `## Next` per §3; no refs remain above the fence.

**Quality:** compendium-audited 2026-08-19 (writing@215ff1c2 story@215ff1c2 technical@1c765f2 behavior@1c765f2 pedagogy@215ff1c2 strategy@1c765f2 slides@215ff1c2)
- judges @215ff1c2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- source-freshness stamped 2026-05-25; MiniJinja and getpushtoprod stamps re-verified 2026-07-02 (stamps in Source verification block; run `source-freshness.sh --target <cohort-date>`).
**Lecture meta:** *10–15 min closing lecture for M5, deck-shaped. Names the three-pattern after you have built each piece. Earns the name from felt evidence, not from a slide deck delivered cold. The M6 bridge lives in the module file's `## Next`, not here.*
**Word count:** ~900 words body, excluding the SVG.

**Theory passage (three slides after the three-pattern slide; wording Antti-blessed 2026-08-14/15):**
projects while the packaged re-send is out — *"the packaged experiment testing the kit is running right
now"* is literally true in the room; do not move the passage after the return lands or the tense breaks. It
must not resolve the gate lecture: tested-here is not a verdict — that hand-off belongs to *Passing is not
proof*, and the phrase "one session is a sample" is deliberately not used here (it is that lecture's header). The fate of "best practice" stays an
open question by design — do not resolve it in either direction. Two lines flagged for the technical judge:
*"a well-read average"* (sampling characterization, roughly-true by design) and *"more of the field than
you will read in a career"* (volume claim, deliberately not a currency claim — the cutoff clause beside it
carries currency). The module file's Key Concepts four-line summary maps to these slides.

**Time:** 14 min at presentation pace (walked per-slide 2026-08-15: chart figure 3; eight prose slides ≈ 1.3–1.5 each).

**Delivery mode:** In-room close after Debrief.

<!-- backing -->

Claims
- `drift-grows-between-checks` · vision · "Drift grows with distance since the last check." ← none-owed
- `check-is-a-position-fix` · vision · "**A check is a position fix**" ← none-owed
- `guardrails-at-irreversible-edges` · vision · "Guardrails belong where damage cannot be undone. Fence the reef, not the open water." ← none-owed
- `unchecked-run-confident-and-wrong` · vision · "An unchecked session arrives confident, and wrong." ← none-owed
- `packaging-catches-problems-during-handoff` · vision · "Packaging decides what catches problems during the handoff." ← none-owed
- `standing-check-pushes-back-inside-the-passage` · vision · "A standing check pushes back before the next wrong step builds on the last one." ← none-owed
- `pieces-turn-up-on-their-own` · detail · "Each piece turns up on its own across practitioner write-ups." ← huntley-ralph, ronacher-minijinja, klaassen-stop-coding
- `three-pattern-is-our-combination` · vision · "This training combined them into one kit and gave them names." ← none-owed
- `huntley-runs-all-three` · detail · "Geoffrey Huntley's Ralph is the one published practice that runs all three at once." ← huntley-ralph, huntley-triad-count, klaassen-stop-coding, ronacher-minijinja
- `ronacher-two-of-three-named-neither` · detail · "Armin Ronacher's January 2026 MiniJinja port ran two of them and named neither." ← ronacher-minijinja
- `kit-stands-in-at-verification` · vision · "the kit is what stands in for you at Verification" ← none-owed
- `reference-artefact-against-goal-drift` · vision · "**Reference artefact**, against goal drift." ← none-owed
- `minijinja-snapshot-tests-as-reference` · detail · "the original Rust snapshot tests played this role" ← ronacher-minijinja
- `plan-md-against-context-rot` · vision · "**plan.md** the agent owns and mutates, against context rot." ← none-owed
- `ralph-bootstraps-greenfield` · detail · "Ralph leans on exactly this primitive to bootstrap entire greenfield projects" ← huntley-ralph
- `external-verifier-against-plausible-but-wrong` · vision · "**External verifier**, against plausible-but-wrong." ← none-owed
- `cherny-reaches-for-all-three` · detail · "Kim's writeup of Boris Cherny has him reaching for all three shapes in his long-running practice; the menu form is Kim's synthesis" ← kim-on-cherny
- `hook-fires-on-named-events` · detail · "Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more." ← cc-hooks-docs
- `agent-has-no-say-whether-hook-runs` · detail · "the agent has no say in whether it runs" ← cc-hooks-docs
- `hooks-exist-because-llm-forgetful` · vision · "Hooks exist because the LLM is forgetful." ← none-owed
- `must-happen-goes-in-a-hook` · vision · "**Must happen goes in a hook**; recommended stays in a prompt or rule." ← none-owed
- `keeper-hooks-are-repo-specific` · vision · "tied to a specific file, convention, or failure mode in this repo" ← none-owed
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
- huntley-ralph `[checked:2026-08-01 result:OK due:none]` https://ghuntley.com/ralph/ — [practitioner direct] **Huntley's Ralph, as he documented it (2025-07-14): all three pieces present together.** Plan: *"create/update a @fix_plan.md which is a bullet point list sorted in priority… ALWAYS KEEP @fix_plan.md up to do date with your learnings using a subagent"* (the filename is `@fix_plan.md`; our *plan.md* is a generic label for the shape, not his). Reference: *"study specs/\* to learn about the compiler specifications"*, diffed explicitly. Verifier: type-system backpressure plus *"run the tests for that unit of code that was improved"*. Greenfield-only by his own scoping — *"no way in heck would I use Ralph in an existing code base"* — which is what the body's "greenfield projects" tracks. A Bash loop over durable markdown; no ticket-triage claim. Still active per *everything is a ralph loop* (2026-01-17), which cites the original rather than restating the pieces. `due:none` because this is a durable first-hand account: re-reading it next year will not change what he wrote. fallback: cite as origin of the loop-prompt-over-durable-state technique; drop any application claim.
- huntley-triad-count `[checked:2026-08-01 result:OK due:2027-02-01]` https://ghuntley.com/ralph/ — [practitioner direct] **§2b split: same URL, different job.** *"The ONE documented practice running all three"* is a claim about the current state of the field, not about his post, and it rests on an eleven-practitioner sweep dated 2026-08-01. It stops being true the day anyone else publishes a triad, and nothing in the `due:none` stamp above would notice — which is exactly the failure `check_research_claims.md §2b` was written for. **Re-count before a cohort.** fallback: drop "the one" and say "the clearest published example".
- klaassen-stop-coding `[checked:2026-08-01 result:CAVEAT due:asap]` https://every.to/source-code/stop-coding-and-start-planning — [practitioner direct, vendor venue] Klaassen (2025-11-06) carries a plan artefact but a **structurally different one**: a pre-work spec created once and reviewed, then implemented and stored in GitHub — not a living document the agent mutates across a run to fight context rot, which is what our *plan.md* piece does. No reference-diff and no verifier language anywhere in his corpus (full Every.to bibliography checked, 20 articles, nothing newer on this topic). Outside the window. **This source backs the count by exclusion:** the nearest rival triad is not one. fallback: cite him for planning-first posture only; do not count him toward the triad.
- kim-on-cherny `[checked:2026-07-02 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): Kim's "13 tips" writeup lists Cherny reaching for background-agent / agent-stop hook / Ralph re-feed. The three-shape taxonomy is KIM'S synthesis, NOT Cherny's own, and is ABSENT from the Orosz/Pragmatic Engineer interview. Body credits Cherny as a practitioner who uses all three, not as the taxonomy's author, and says so in the same sentence. **Due within the month — re-open before any autumn cohort.** fallback: present the three shapes as a practitioner-convergent menu, no single attribution.
- cc-hooks-docs `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] hook events (SessionStart / UserPromptSubmit / PreToolUse / PostToolUse / Stop) fire on every named event, with no model discretion over whether the script runs; live-tested against this repo's `.claude/settings.json` on Claude Code 2.1.142. fallback: inline the event list from a re-test.
- amp-handoff `[checked:2026-08-01 result:OK due:none]` https://ampcode.com/news/handoff — [practitioner direct, vendor] Amp (2025-10-23) rejected auto-compaction and bet on manual handoff: *"Compaction… always had downsides. It's lossy, for one."* Cited here ONLY as the first half of a dated reversal pair backing "the reversals" in the theory passage — a durable historical account, never current behaviour. fallback: drop the named pair; "the reversals" stands on the field's public record.
- amp-neo `[checked:2026-08-01 result:OK due:none]` https://ampcode.com/news/neo — [practitioner direct, vendor venue] Amp rebuilt on 2026-05-06 and killed the feature: *"So handoff is out. Compaction is in."* The second half of the reversal pair — a team that shipped a feature to avoid compaction, then adopted compaction. Single vendor; cite as one team's reversal, never as a trend. fallback: as above.

Frameworks
- Dead reckoning and the position fix · [borrow:navigation] · law:is-a-closed-loop-controller · ← cultural-vocab
- Three failure modes · [borrow:none] · law:three-failure-modes · ← none — house vocabulary; the M5 opener carries the stamp and the naming caveat
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab
- Local success / global drift · [borrow:none] · law:local-success-global-drift · ← none — the wrong-harbor beat is this law in chart form
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the kit's map slot is Verification

Stance `[stance:2026-08-01 level:L1]`
- holds: each piece separately, and not the triad. Reference artefacts, durable plan files and automated verifiers each turn up across practitioner write-ups. **Counted strictly — all three present together as artefacts in one named practice — the independents number one:** Huntley's Ralph. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec rather than a document the agent mutates across a run, so it is a different piece wearing the same word. Against an L3 bar of 10–20 independents, the three-pattern is our combination of scattered practice — candid curriculum work, and misleading to call convergence. The body says "this training combined them" for exactly this reason.
- contested: whether a second named practitioner has published all three pieces as one practice, or anyone has named the triad as a triad.
- would-move-it: a second named practitioner publishing all three pieces together as one practice, or anyone naming the triad as a triad. Either turns "this training combined them" into "practitioners converge," and slide 1's lead has to change. **It moves the other way too** — Huntley abandoning or restructuring Ralph leaves the count at zero, and the slide would owe a different sentence again.

OODA
- question: has anyone besides Huntley published all three pieces as one practice, and has anyone named the triad as a triad?
- roster: Huntley, Ronacher, Klaassen, Cherny
- last-run: 2026-08-01

<!-- /backing -->

**Watch-fors (delivery):**
- The lede + slide 1 are the recognition beat. The room just built each piece; don't rush the naming.
- The three-pattern earns its name HERE, not in the pre-read. If a sim shows the closing landing as repetition rather than naming, the pre-read leaked.
- **"This training combined them into one kit and gave them names" needs the follow-on beat, or it reads as "so this is made up."** The authority is the room's own morning: they built three pieces against three failures they diagnosed themselves. Land the admission and then hand it straight back to them. A trainer who says this apologetically loses the slide; a trainer who says it as a credential ("nobody handed you this, you earned it") wins it. The one published practice running all three is Huntley's Ralph, so the pattern is not invented, only assembled.
- The theory passage's "best practice" question is open BY DESIGN. If the room asks *"so will the field ever settle?"*, hold the question open — *candidates, tested here* is the answer; resolving it in either direction undoes the slide.

**Philosophy callouts:** none. The naming is the beat; further philosophy tagging dilutes.

**Map-position clause (2026-07-02):** slide-1 lead bullet now places the three-pattern on the Field Map as "what stands in for you at Verification" — deliberately NOT an all-three-live-there claim (reference and plan.md guard the run mid-flight; the verifier is the piece that IS Verification); commissioned by theory-completeness-review finding #1, alongside the M6 consolidation closer `the-map-filled-in`.

**Chart (eyeball queue):** the "One session, plotted" slide embeds the dead-reckoning chart from `protos/m4-run-chart-02-passage.html`, chosen by Antti 2026-07-02; protos 01 (terrain) and 03 (orienteering) remain in `protos/` as alternates. Only the svg carried over; the proto page's header strip did not (it names the drift wedge with a two-word label this lecture bans, so the wedge is described here without it). Pattern id renamed to `ps-reefhatch` to avoid collisions with other inlined charts. Slide count is 9 (was 7 before the 2026-07-06 size-split; `Reference and plan` and `Hooks always fire` each shed a slide); the budget question is eyeball queue #1. Open option: graft proto 03's course card (named gates per control: TESTS GREEN, SPEC STILL TRUE, NOTHING LEAKED, DIFF READS CLEAN) onto this chart if Antti wants gates named on-chart.
