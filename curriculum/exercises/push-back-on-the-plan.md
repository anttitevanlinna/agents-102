# Sharpen the plan with *two reads*

**Time:** 57 minutes.

**What you do:** push back twice on your plan, run a second-pass grilling, then approve and **stop**.

**What you build:** paired reads on one plan: your two push-backs, then a walk-down three questions at a time.

**The point:** the first pass is plausible, and usually not good enough.

---

## Phase 1: Bring a real task

*5 min*

- Bring a task that spans a few files, with enough execution depth to make plan mode worth using. A feature slice, a small migration, a targeted refactor: something where touching the wrong file matters. **A one-line fix is too small for plan mode; a refactor whose outcome you can't hold in your head is too big.**
- If nothing fits, ask Claude to surface three candidates from recent issues, PRs, or TODO comments. Pick the one you'd ship today if you had an hour.

## Phase 2: Ask for the plan

*15 min*

- In plan mode, name the task, why it matters, and the one constraint you care about most.
- Plan mode explores the codebase and drafts the steps; your job starts when it pauses for approval.

Drop your task after the colon.

{{prompt:push-back-on-the-plan-1}}

Plan mode takes minutes on real codebases. Eight to twelve isn't unusual. Use the wait to chat with colleagues about what you're building.

## Scan the plan before you push back

- A plan deserves more attention than ordinary agent output; not every line is equally important.
- Open the plan file (descriptive name, e.g. `migrate-auth-hash-calm-otter.md`); the chat summary is secondary. Scan it against the five things a good plan has, and start where a sharper answer would most change execution.
- Two push-backs forming in your head? Move on.

## Phase 3: Push back twice

*12 min*

- Don't approve yet. At the approval prompt, pick **No, keep planning**. That holds plan mode open. Send two push-backs on two different axes: one soft item, and one of (assumption · alternative). Your own words, your own concerns.
- **Soft items:** the step that reads clean but skips over something. *"Update the config"* without which keys. *"Handle migration errors"* without what happens to rows mid-flight. The vagueness isn't a drafting slip; it's where the agent hasn't decided yet. Stuck picking one? Ask Claude which step it's least confident about. **The agent finds; you judge.**
- **Assumptions:** something the plan is carrying silently that it shouldn't. A library version, a schema shape, a teammate's recent change the agent hasn't seen.
- **Alternatives:** not just a flag; the change you'd make. Merge two steps that belong together. Reorder two steps whose sequence matters.

> **Two messages, then move on.** Two push-backs on two axes, plus one check that the regeneration held: read the flagged steps in the revised plan, not the agent's report of them, and if the vagueness survived, push back again on that line. A third push-back may be forming. That is fine; it is the second-pass read's job to catch the rest.

## Phase 4: Walk down the unresolved branches

*15 min*

- The second read runs in this same session and still in plan mode, working through the plan file differently from the way you did.
- The prompt asks Claude to walk every unresolved branch, three questions at a time, with a recommendation for each. Take the questions that sharpen the plan; you remain the stop gate.

{{prompt:push-back-on-the-plan-2}}

> **If it feels slow, ask why.** Stop the turn, ask Claude what's making it crawl, then relax that requirement. The prompt is a starting recipe, not a contract.

## Answer the branches that change what "done" means

- The second read asks three questions at a time. Some will feel trivial (*"which logger should step 2 use?"*); answer and move on. Some will reach into something you hadn't considered (*"step 4 touches the shared cache; what's the invalidation story?"*); pause, think, answer. A few will surface decisions the plan was silently making for you; reject the recommended answer and give a different one.

> **Too many low-level questions? Steer up.** If Claude keeps asking about implementation detail (which helper, a variable name, error-message wording), tell it: ask me about requirements, not low-level design. The branches worth the time change what 'done' means; the rest you'd settle in verification.

## Switch to a picker if you prefer one
<!--tier:3-->

- If you would rather answer from a structured picker, ask Claude to switch to AskUserQuestion once the walk-down is rolling, and add any steering of your own.

{{prompt:push-back-on-the-plan-2-askuserquestion}}

## Stop when the plan is good enough to generate

- The decisions most likely to change execution are settled, and the questions coming back now are routine implementation detail, settled ground, or genuine non-goals. The agent can keep walking; you decide when another answer is no longer worth the working memory it costs. Approve when the plan reads like your plan.

> **Timebox check.** If branches are still surfacing when your time is up, approve the sharpened plan as it stands and move to Phase 5.

## Run the original grill-me if you want the full hour
<!--tier:3-->

*Credit: Matt Pocock for the original [`grill-me`](https://github.com/mattpocock/skills/blob/62f43a1/skills/productivity/grill-me/SKILL.md) skill. The walk-down prompt is abbreviated to fit the 15-minute slot. The original is fully relentless and can run an hour. Optional:*

{{prompt:push-back-on-the-plan-2-original}}

## Approve

Say *lock it in.* The agent writes the sharpened plan. Approve at the prompt.

Then just hit stop.

## Phase 5: Stop, then surface the patterns

*10 min*

- Don't execute the plan. The work of making it good is the exercise.
- Approving took you out of plan mode, so this last step runs in default mode.
- Ask Claude what the second-pass read surfaced that your two push-backs didn't.

{{prompt:push-back-on-the-plan-3}}

## Compare what each read caught

- The agent answers. You catch what a human catches (specificity, voice-of-experience, "I'd write that differently"). The second read catches what an agent walking a decision tree catches: branches you didn't notice, dependencies you didn't name, side-effects you didn't price.
- Neither read needs to be complete. Paired, they surface the sharpenings worth making before generation.
- **Plan-mode approval inflation** is the thing this pairing defeats: structured plans get rubber-stamped because they look like decisions.

<!-- maintainer -->

**View summary:** You take a real multi-file task into plan mode, challenge the draft twice, then start a second-pass grilling and stop it when the valuable branches have landed. The result is an approved plan shaped by two different reads, with execution deliberately left for later.

**The altitude read is taught in the lecture only (Antti 2026-08-25, superseding the 2026-07-29 point-of-use recall).** `when-a-plan-is-good.md`'s gate slide carries the file-name-vs-design mechanism and its *you will not notice* tail; this file does not restate it. Do not re-add an altitude bullet to the scan slide. The *Steer up* callout still marks the design boundary at the walk-down (its examples are helpers, variable names, error wording; signatures and callers are design).

**Scan slide is deliberately lean (2026-08-25, Antti-directed concision pass: "don't teach software engineers how to check stuff unless there is something really missable").** One slide, four bullets: why a plan earns attention (approval hands it to generation), file-not-chat plus the pointer at the lecture's five things, the altitude read, the two-push-back stop rule. Do not re-add a notice-which walkthrough of the five things — that re-teaches the lecture's checklist one slide after it was taught — and do not re-add a tests-before-code bullet (an instance of the lecture's verification-could-fail criterion). The copied prompts still offer the full plan and exhaustive branch walk; the body makes that pressure a ceiling, not a completion requirement. The student takes the highest-value sharpenings and remains the stop gate.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** Handles kept bold: the **stop** governor closing the What-you-do line, the **No, keep planning** approval path, the three push-back axis menu items (**Soft items** / **Assumptions** / **Alternatives** — third axis renamed from *Committed changes* 2026-08-12, Antti: *"commit is a git word"*; the collision is live inside this training, `compound-and-close.md` using *uncommitted change* in the git sense one module earlier. Do not restore, and do not reach for *commit* / *edit* / *fix* / *proposal* as replacements — each collides with something this arc already owns, git, plan mode's blocked edit tools, M1's bug fix, and the plan itself), the coined term **Plan-mode approval inflation** at its naming moment (bold narrowed to the handle), and the law **Find is easier than judge** newly bolded at its naming moment; all other bullet/paragraph leads de-bolded. Widget chrome and blockquote callouts untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Both optional walk-down escalations are kept (not cut).** `push-back-on-the-plan-2-askuserquestion` (switch to the AskUserQuestion picker) and `push-back-on-the-plan-2-original` (the unfiltered Pocock `grill-me`) are opt-in ceilings on the second read, now on their own slides (*Switch to a picker if you prefer one* and *Run the original grill-me if you want the full hour*). **Order and split are Antti-directed, 2026-08-12:** the picker comes first, the stop instruction second, and the Pocock credit gets its own slide rather than trailing the stop beat. The old single slide told the student to stop four separate times — the header, the bullet's own lead, a four-line Timebox callout, and the working-memory clause — so *Stop when the read starts reaching* became *Stop when the plan is good enough to generate* (Antti on the old header: *"reaching ???"*) and the Timebox callout dropped to one line. Do not re-merge these three. They preserve full-on pressure for a student who wants it; the body makes clear that nobody owes the ceiling. A student keeping it simple skips both, so they add no baseline load and cutting them reclaims none. Not cut candidates.

**What-you-build states the activity only; the second read's value claim lands at the P5 compare beat (maintainer call 2026-08-02).** Line 7 names what the walk-down IS — *three questions at a time* — not what it catches. The claim *catches the branches you can't see* is near-verbatim P5's own expected finding (*"branches you didn't notice"*), so stating it in the opener turns the compare beat into confirmation instead of discovery. It is not cut from the file, it is placed: it lives post-action in *Compare what each read caught*, which is where §53 wants it. Both halves of the compare now stay unstated in the opener. **This reverses an earlier §53 partial-accept** that kept the clause at line 7 as the hook selling the walk-down — do not restore it there.

**Quality:** compendium-audited 2026-08-24 (writing@1abb84c6 story@1abb84c6 technical@1abb84c6 behavior@394a896b pedagogy@1abb84c6 strategy@1c765f2 slides@1abb84c6)
- judges @394a896b: writing PASS (drift-recheck), story PASS (drift-recheck), technical PASS (drift-recheck), behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS (drift-recheck)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat at P5 is the Evaluate beat)
- **No agent-wait charge.** P4 blocks on the student, and P2's plan-mode wait carries no other budgeted beat — nothing shares those minutes.
- **Execution-free by design.** The student does not run the code. The exercise is about reading a plan well; execution is M3's concern. When asked *"why don't we execute?"* the trainer answers: *"you've done the work of making the plan good; recognising a good plan is the skill."*
- **"Stop" repeats across the What-you-do line, the Approve section and the Phase 5 heading — deliberate.** The Approve section closes with *"Then just hit stop."* (operational stop — the student hits stop after approving so plan-mode does not roll into execution). Phase 5's heading opens with *"Stop, then surface the patterns"* (pedagogical stop — surface what the session showed, do not execute). It read *"name the pattern you ran"* until 2026-08-14 (Antti): the student names nothing here, the prompt asks Claude to, and the phase's own beats are the comparison of what each read caught. **The prompt was deliberately left alone** — its third question still asks for the repeatable move, and the tension with the module file's *"Claude may reframe the session into a smart-sounding general rule"* callout is known and accepted; only the heading was mis-framing the beat. The What-you-do line carries the governor for both. Same word, two registers, both load-bearing.
- **Artifact locations:**
  - Plan file → Claude Code's plan directory (auto, descriptive filename)
  - Execution artifacts (diff, PR) → student's real repo
  - Compound-step rules update → personal `CLAUDE.local.md` at repo root (gitignored); team-worthy rules flagged for separate PR against the team's rules home (`CLAUDE.md` at root, `.claude/CLAUDE.md`, or `AGENTS.md`, whichever the repo uses). See `reference/claude-code-for-engineers.md § 1`.
  - No training-dir state.
- **Attribution at P5** is terse. Claude names the design pattern first; "plan-mode approval inflation" is the label the exercise hands them after they've already defeated it. Don't front-load.

<!-- backing -->

Claims
- `first-pass-is-plausible` · vision · "the first pass is plausible, and usually not good enough." ← none-owed — Antti's own frame, near-verbatim. Replaces `two-reads-paired`, which restated *What you build* and then named the procedure; neither was a claim the exercise earns. Paired deliberately with `extract-the-task-shaping-rule`'s `an-agent-hands-you-generic-rules` — plausibility is M2's spine, stated once per exercise, and the repetition is `check_writing.md` §11's reinforcement carve-out rather than a tic. Do not vary one to break the echo.
- `plan-attention-is-not-equal-attention` · vision · "A plan deserves more attention than ordinary agent output; not every line is equally important." ← none-owed
- `read-the-file-not-the-summary` · vision · "the chat summary is secondary" ← none-owed
- `plan-mode-mechanics` · detail · "In plan mode, name the task" ← cc-permission-modes — the Shift+Tab keystroke was cut here 2026-08-12 (Antti: *"M2 instructs now twice how to enable plan mode"*). `when-a-plan-is-good.md`'s `plan-mode-shift-tab` is the single copy and the one the freshness stamp watches; M1 runs without plan mode, so that lecture is the student's first encounter and its own optional beat exercises it before this file opens. Do not restore the keystroke here — the label churns (`⏸ plan mode on`, plus `/plan` as a second entry point) and two copies means two edits.
- `keep-planning-with-feedback` · detail · "At the approval prompt, pick **No, keep planning**." ← cc-permission-modes
- `plan-mode-takes-minutes` · vision · "Plan mode takes minutes on real codebases. Eight to twelve isn't unusual." ← none-owed
- `assumption-push-back-is-wwhtbt` · borrowed · "something the plan is carrying silently that it shouldn't" ← martin-wwhtbt
- `re-softening-on-regeneration` · vision · "read the flagged steps in the revised plan, not the agent's report of them" ← none-owed — the niceness mechanism compressed into the Phase-3 note box; the report-back grain-of-salt is M1's self-report-is-a-hypothesis recalled at point of use.
- `find-is-easier-than-judge` · vision · "**The agent finds; you judge.**" ← none-owed — plain form 2026-08-12 (Antti: *"there is big idea behind that but students will not get it"*). The bare law read as two verbs with no objects and no actors, planted in a bullet that carries no unpacking. This wording is the corpus's own — `the-map-filled-in.md`'s consolidation already glosses the law exactly this way — and it names both actors, which the compressed form hid. This soft-items bullet is the coinage's only M2 home (the lecture's find-vs-judge slide is cut, 2026-08-25) and seeds the M5 verification-asymmetry naming.
- `full-grilling-is-an-offer` · borrowed · "The prompt asks Claude to walk every unresolved branch, three questions at a time, with a recommendation for each." ← pocock-grill-me — the *"deliberately more pressure than you may need"* tail was cut 2026-08-12 (Antti: *"too early"*): it stated the payoff before the student had felt the pressure. The frame is not lost, it is placed — `when-a-plan-is-good.md` sets it up beforehand (*"Stop when another answer would no longer materially sharpen the plan"*; the *"offer, not an obligation"* sentence that used to open that bullet was cut 2026-08-14 as a forward reference to a word the lecture has not earned, and the stop-clause carries the permission on its own) and three beats in this file land it after the fact (*Stop when the read starts reaching*, the *Steer up* callout, the Timebox check). Do not restore it to Phase 4's opener.
- `human-is-the-stop-gate` · vision · "The agent can keep walking; you decide when another answer is no longer worth the working memory it costs." ← none-owed
- `pocock-credit` · detail · "Credit: Matt Pocock for the original [`grill-me`](https://github.com/mattpocock/skills/blob/62f43a1/skills/productivity/grill-me/SKILL.md) skill." ← pocock-grill-me
- `paired-reads-surface-sharpenings` · vision · "Neither read needs to be complete. Paired, they surface the sharpenings worth making before generation." ← none-owed
- `plan-mode-approval-inflation` · vision · "**Plan-mode approval inflation** is the thing this pairing defeats: structured plans get rubber-stamped because they look like decisions." ← none-owed
(No claim here on the Compound step. This file does not point forward to it: `extract-the-task-shaping-rule` states the session dependency three times in its own opener, and has the student place the rules file rather than writing to `./CLAUDE.local.md`. Klaassen is sourced via the Compound engineering framework row.)

Sources
- cc-permission-modes `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/permission-modes.md — [capability] Shift+Tab cycles `default` → `acceptEdits` → `plan`, with the status bar showing the mode; Ctrl+G opens the plan in `$EDITOR`. Re-verified live 2026-08-15, and **the standing CAVEAT is cleared by fixing the body, not the stamp**: the docs name the option *"No, keep planning: stay in plan mode and tell Claude what to change"*, and the body now matches it verbatim. **The option count dropped from four to three between 2026-08-02 and 2026-08-15**, because Anthropic removed the Ultraplan research preview and its *"No, refine with Ultraplan on Claude Code on the web"* row went with it (https://code.claude.com/docs/en/ultraplan is now a removal notice). The menu is now *Yes, and use auto mode* · *Yes, manually approve edits* · *No, keep planning*, and **the first label still changes with the account** — *Yes, auto-accept edits* where auto mode is unavailable, *Yes, and bypass permissions* in a bypass session. A room will not all see the same menu. A fourth row appears only where `showClearContextOnPlanAccept` is enabled. Plan mode is also enterable by prefixing a prompt with `/plan`, not only Shift+Tab. **Thirteen days took this stamp from OK to wrong: cite the option count by shape, never by number, unless the check is fresh.** fallback: drop the literal label and say "decline the plan and keep planning" — durable against the next copy change, at the cost of concreteness a first-time student needs.
- pocock-grill-me `[checked:2026-07-26 result:OK due:2027-01-26]` https://github.com/mattpocock/skills/blob/62f43a1/skills/productivity/grill-me/SKILL.md — [practitioner direct] Pocock's grill-me skill, commit `62f43a1` **pinned**, file confirmed live at that path; MIT licence confirmed via the local fork at `curriculum/skills/external/pocock-skills/grill-me/`, which carries the method inline and runs standalone. At `main` the skill is two files — that path now holds a 4-line invoker and the method sits at `skills/productivity/grilling/SKILL.md` — and **the pin is what insulates this file from that drift**, which is the whole argument for pinning a commit rather than a branch. Billed at source as *"a relentless interview to sharpen a plan or design"*. **Not Socratic** — Socratic method surfaces contradictions, this one proposes. Do not reintroduce the word. fallback: describe as "a branch-walking interview skill, forked with attribution" if the named-skill framing needs to soften.
- klaassen-definitive-guide `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen (GM of Cora, Every's own product) on Every's own site, published 2026-02-09; sole byline, first person throughout. Confirms the term and the philosophy: *"each unit of engineering work should make subsequent units easier—not harder."* **The four-step loop is NOT on this page** — the step names are on the how-Every-codes piece, and as of 2026-05-29 Klaassen has expanded the loop past four steps. **Cite this URL for the term, never for a step count**, and note the body obeys that by naming only "the Compound step". Every.to is Klaassen's employer's venue: treat any outcome metric from it as vendor-self-reported (none quoted here). fallback: attribute as "the loop that runs through his work", ordinal-free.
- martin-wwhtbt `[checked:2026-07-26 result:OK due:none]` https://rogermartin.medium.com/what-would-have-to-be-true-83dac5bd2189 — [practitioner direct] Martin's own essay (2022-08-22), restating the framework he developed from 1994 and published in *Playing to Win*. **Foundational-literature variant, `due:none`** — an established strategy framework's content is fixed by publication, and the previous `due:2027-01-26` treated a 2022 restatement of a 1994 framework as if it could expire. Cited as lineage, never as current-trend evidence. fallback: drop the URL and cite WWHTBT generally if single-source attribution needs to soften.

Frameworks
- Plan mode · [borrow:none] · law:none · ← cc-permission-modes
- Walk-down-branches interview · [borrow:none] · law:none · ← pocock-grill-me — inlined as a prompt here and credited at Phase 4; the authoring reveal lands a module later
- What would have to be true · [borrow:strategy] · law:name-the-uncertainty-before-you-move · ← martin-wwhtbt — the assumption-flag push-back is Martin's move applied to an engineering plan
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-definitive-guide
- Find is easier than judge · [borrow:none] · law:none · ← none — house naming, earned in-room; the supplementary-resident name is deliberately not used in body

Stance `[stance:2026-08-01 level:L2]`
- holds: that a second automated read catches branches a human read misses, and that the two are complementary rather than redundant. Pocock's skill is one practitioner shipping exactly this move under an open licence, which is stronger evidence than a described practice — the artefact runs. The exercise's own claim is narrower than the field's: it says these two reads catch different things, which the student verifies against their own plan in Phase 5.
- contested: nothing evidential. The live risk here is copy drift rather than claim drift — this file names a UI affordance, a keystroke, and a third-party skill file, and all three can move under it without anything being wrong about the teaching.
- would-move-it: plan mode's approval affordances changing shape, or Pocock retiring the skill. Neither would touch the pairing argument; both would strand a sentence.

OODA
- question: do plan mode's approval options still read as the body describes, and is the pinned grill-me commit still reachable?
- roster: Matt Pocock, Kieran Klaassen, the Claude Code permission-modes docs and changelog
- last-run: 2026-08-01

Flagged

<!-- /backing -->

**Watch-fors:**
- **P3 rubber-stamp.** Student hits "approve" under 60 seconds without sending a push-back message. Diagnostic: no keep-planning branch in the scrollback. Push-back move: *"pick No, keep planning — send one soft-item message before approving."*
- **P3 performative push-back.** Three messages in under 3 minutes, none name steps or specific concerns. Diagnostic: message reads *"step 3 is vague."* Push-back move: *"which step says what? which words are the vague ones? if you can't point at them, it's not a soft item — it's a vibe."*
- **P3 softening on regeneration.** Claude accepts a push-back, regenerates, but re-softens the step in the new plan (Claude's RLHF-niceness tell). Diagnostic: revised plan reads no sharper than original on the flagged step. Fix: student says *"you softened it — step 5 still says 'update config' without which keys. Be specific."* Teaches that push-back isn't one-shot; push-back is a check on the revision too.
- **P3 timer abuse.** Student spends 15+ min reading before sending any message. Diagnostic: past 10 min, zero push-back messages. Fix: *"send what you've got and approve. The discipline is the 10-minute read, not the complete read."*
- **P3 senior-refusing-the-forcing-function.** Strong senior student refuses to produce three push-backs because the plan is genuinely clean. Diagnostic: they defend the plan with specifics. Fix: let them — the defense IS the read. Ask them to send one sentence per axis defending why the plan is tight there, instead of producing push-backs on auto-pilot.
- **P4 over-answering.** Student keeps answering after the walk-down stops changing the plan. Diagnostic: the latest question only chooses a helper, variable name, or error wording. Fix: *"what would the next answer still change in execution? If nothing material, lock it in. If one branch still matters, take that one."*
- **P5 deflection.** Student says *"my push-backs didn't really change anything"* as self-deprecation. Diagnostic: was this a comment on their push-back quality or on Claude's execution? Probe which. If the push-back was thin, that's the teaching moment for M3 (they'll build a judge around exactly this).

**Decision points:**
- **P3 under 3 min:** push-back was performative. Send them back in with *"send one more soft item — look at consecutive steps for overlap."*
- **P3 exceeds 12 min:** compress P4's watch time; let Claude run while student reads. Note: this student reads plans seriously; M3 judge-building will go fast. **P3 is now booked at 12 (was 15, cut 2026-08-15), which is what makes this threshold mean anything:** a trainer instruction to intervene above 12 could never fire against a 15-minute booking, because the plan itself was already over the line. The 12 is also what the body asks for — the timer-abuse watch-for above calls the discipline *the 10-minute read*, leaving two minutes for the two sends. Exercise total 60 → 57; M2's runtime 126 → 123, which restores the *"runs 3 min past its slot"* figure `trainer-modules.md` already states. Do not restore the 15 without re-reading that Slot line.
- **P4 completes in under 15 min:** the task was too small for plan mode. Log for the Debrief: *"plan mode is overkill below ~30 min of agent work — know the floor."*
- **Student asks about Ctrl+G plan-file editing:** it's a real practitioner move (opens the plan in $EDITOR for in-place edits) and fine to mention at Debrief as a next-tier tool — but not the exercise's forcing function. The chat-based push-back stays in conversation with the agent, which is the whole training's shape.
- **P4 turn-time on real codebases.** A single Q-and-A turn can eat 10+ min when the codebase-read fallback fires (2026-05-15 dry-run: 13m15s + 37.7K tokens on one turn). Trainer move: if the slot is being eaten, trim the prompt for next cohort.

**Plug points:**
- Student's own repo (chosen in prework, carried from M1)
- Student's own backlog task (surfaced at P1)
- Rules home for the Debrief's Compound step

**Push-back moves:**
- **P1:** if student can't surface a fitting task, trainer runs the three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp:** if student approves before 60s with no push-back messages in scrollback, trainer invokes the forcing-function: *"pick No, keep planning. Send one soft item — one step that reads clean but skips something."*
- **P3 performative:** if push-back messages appear in under 3 min without step numbers or specific concerns, trainer asks for specificity — *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening:** if Claude's regenerated plan is no sharper than the original on a flagged step, trainer push: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P3 senior refusal:** if student defends the plan as tight and refuses to produce forced push-backs, accept it — ask for a one-line defense per axis instead of push-backs on auto-pilot. The defense IS the read.
- **P4 over-answering:** if the student keeps consuming low-value questions because the prompt can continue, trainer asks *"what would the next answer still change in execution?"* Nothing material → lock it in. One material branch → take that one, then stop.
- **P5:** stay silent until Claude names the shape. Then the trainer says the label — "plan-mode approval inflation" — one line. The corollary (*find is easier than judge*) is in the exercise body and lands the non-obvious beat.

**Arc:**
- Picks up from: M1's compound loop, run on a 60-min trivial bug. M2 runs the same loop at deeper plan scope. **Do not restate the stage list here** — Klaassen expanded it on 2026-05-29 and a copy in a maintainer note is a second copy that drifts; `compound-and-close` prints the current sequence and carries the stamp.
- Hands off to: M2 Debrief (Compound step) — one named pattern about what a good plan looks like for this student on this repo goes into personal `CLAUDE.local.md` (team-worthy flag for separate PR if applicable).
- M3 picks up: the judge-building move — the push-backs the student sent at P3 are the raw material for M3's first judge ("did the fix really land?"). The push-back discipline becomes the gate spec.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- picks plan mode before approving a multi-file change
- sends two specific push-backs naming step numbers before approving a non-trivial plan
- runs a second-pass walk-down on any plan that touches more than two files
