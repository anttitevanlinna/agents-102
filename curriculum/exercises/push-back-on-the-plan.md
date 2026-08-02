# Sharpen the plan with *two reads*

**Time:** 60 minutes.

**What you do:** take a real multi-file task from your backlog, run it through plan mode, push back twice with what you can see, then hand the plan to a second agent for a deeper read. Approve the plan. **Stop.** Don't execute. Compare what your read caught to what the second-pass read caught. That gap is the skill this module is building.

**What you build:** two reads paired on one plan. Your own two push-backs, in your voice, catch what a human catches. A second-pass walk-down, three questions at a time, catches the branches you can't see. Together they make a plan you can approve without rubber-stamping it.

**The point:** two reads, paired. Making the plan good is the work.

---

## Phase 1: Bring a real task

- Bring a task that spans a few files, with enough execution depth to make plan mode worth using. A feature slice, a small migration, a targeted refactor: something where touching the wrong file matters. A one-line fix is too small for plan mode; a refactor whose outcome you can't hold in your head is too big.
- Just a simple task that spans a few files. Not an epic.
- If nothing fits, ask Claude to surface three candidates from recent issues, PRs, or TODO comments. Pick the one you'd ship today if you had an hour.

## Phase 2: Enter plan mode and ask for the plan

- Shift+Tab until the status bar shows plan. Ask Claude to plan the task you'll drop after the colon: what, why, the one constraint you care about most.
- You ask; the agent drafts. You are not writing the plan. Plan mode explores the codebase and drafts the steps; your job starts when it pauses for approval.

{{prompt:push-back-on-the-plan-1}}

Plan mode takes minutes on real codebases. Eight to twelve isn't unusual. While Claude works, take in the side material that fits the wait: the [Multi-session and Git: survival guide](trainings/agentic-engineering-101/reference/multi-session-git.md) if you skipped it in the gap, or the plan-mode-at-depth section of [Claude Code for engineers](trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#5-plan-mode-at-depth) for the approval-paths table. When Claude is on a long-running prompt, that's when you take in selected side reading or watch a demo. Wait isn't dead time.

## The plan is the one you read whole

- M1 named the countermove: never let the agent say everything, take the ranked list first.
- A plan is the exception. Approval hands it to execution as the whole contract, and a summary of a contract is not a contract.
- So this read is complete: every step, every file name, every verification. The countermove comes back the moment you approve.

## Read the plan before you push back

- Open the plan file; the chat summary is secondary, the file is the artifact. The agent explores, writes a plan file with a descriptive name (e.g. `migrate-auth-hash-calm-otter.md`), and pauses for approval.
- Read the whole plan before pushing back. Notice which steps name files and which say "the relevant files." Notice which verification steps could actually fail and which are cosmetic. Notice which assumptions the plan is carrying silently.
- Read the tests section carefully. A good plan names the tests before any code; the tests are part of what "done" means, not something you bolt on after. If the tests section is thin or missing, that's a push-back.
- Notice at what altitude the steps decide. Naming the file is one decision; naming the new function's signature, its types, and who calls it is the design. A step that stops at the file name defers the design to mid-run, where nobody is reading. If the steps that matter stop at file names, that's a push-back.
- When you have two push-backs forming in your head, move on. Don't wait for the clock.

## Phase 3: Push back twice

- Don't approve yet. At the approval prompt, pick **No, keep planning**. That holds plan mode open and gives you the floor. Send two push-backs on two different axes: one soft item, and one of (assumption · committed change). Your own words, your own concerns.
- **Soft items:** the step that reads clean but skips over something. *"Update the config"* without which keys. *"Handle migration errors"* without what happens to rows mid-flight. The vagueness isn't a drafting slip; it's where the agent hasn't decided yet.
- **Assumptions:** something the plan is carrying silently that it shouldn't. A library version, a schema shape, a teammate's recent change the agent hasn't seen.
- **Committed changes:** not just a flag; an alternative. Merge two steps that belong together. Reorder two steps whose sequence matters. Swap a file path for the right one.

## Catch the re-softening in the revised plan

- Two messages, your phrasing, specific to what you saw. The agent acknowledges each, regenerates the plan, re-presents it.
- Read the revised plan carefully. This is where Claude's niceness bites. Claude will sometimes verbally accept a push-back and re-soften the step anyway (RLHF doing its job). If you see the original vagueness survive the regeneration, push back again on that specific line. Softening-on-regeneration is a reliable tell; catching it is part of the read.
- Stuck on the soft item? Ask Claude which step it's least confident about. That answer IS one. **Find is easier than judge.**

> **Two messages, then move on.** Two push-backs on two axes, plus one check that the regeneration held, is all Phase 3 asks. A third push-back may be forming. That is fine; it is the second-pass read's job to catch the rest. Send your two, check the revision once, and move to Phase 4.

## Phase 4: Walk down every unresolved branch

- Hand the plan to a second agent that reads differently than you do. Still in plan mode: the plan file is the artifact you're walking, and edits to it stay locked while you're in plan mode. Nothing changes until you approve.
- Ask Claude to walk down every unresolved branch of the plan three questions at a time, recommending an answer for each.

{{prompt:push-back-on-the-plan-2}}

> **If it feels sluggish, ask why.** Stop the turn, ask Claude what's making it slow, then relax the requirement that's making it crawl. The prompt is a starting recipe, not a contract, loosen what's costing you the slot.

## Answer the branches that change what "done" means

- The second read asks three questions at a time. Some will feel trivial (*"which logger should step 2 use?"*); answer and move on. Some will reach into something you hadn't considered (*"step 4 touches the shared cache; what's the invalidation story?"*); pause, think, answer. A few will surface decisions the plan was silently making for you; reject the recommended answer and give a different one.

> **Too many low-level questions? Steer up.** If Claude keeps asking about implementation detail (which helper, a variable name, error-message wording), tell it: ask me about requirements, not low-level design. The branches worth the time change what 'done' means; the rest you'd settle in code review.

## Stop when the read starts reaching

- Typical session: 5 to 12 questions. Stop when the second read starts reaching: a question about something genuinely out of scope, a branch that's already settled, a recommendation you'd accept without thinking. The agent doesn't always know when to stop; you do. The agent incorporates your answers into a sharpened plan. Approve when it reads like your plan.

> **Timebox check.** When the slot ends, stop. The second-pass walk-down can run deep on a real codebase. If it is still surfacing branches when time is up, take the most recent sharpened plan, approve it, and move to Phase 5. The branches that did not surface today are the ones you will catch when you actually ship the work. The exercise teaches the move. You take the move home.

- The walk-down prompt's three-at-a-time prose is the starting point. That batching cuts round-trips on the branches that need real thought. If you prefer a structured picker, switch once the walk-down is rolling. Ask Claude to switch to AskUserQuestion, and add any steering of your own.

{{prompt:push-back-on-the-plan-2-askuserquestion}}

*Credit: Matt Pocock for the original [`grill-me`](https://github.com/mattpocock/skills/blob/62f43a1/skills/productivity/grill-me/SKILL.md) skill. The version above is abbreviated to fit the 15-minute slot. The original is fully relentless and can run an hour. Optional:*

{{prompt:push-back-on-the-plan-2-original}}

## Approve

Say *lock it in.* The agent writes the sharpened plan. Approve at the prompt.

Then just hit stop.

## Phase 5: Stop, then name the pattern you ran

- Don't execute the plan. The work of making it good is the exercise. Execution is next module's concern.
- Out of plan mode now: you approved and stopped, so Claude Code is back to default mode for this last step.
- Ask Claude to name the design pattern you just ran and compare what the second-pass read surfaced against what your two push-backs caught.

{{prompt:push-back-on-the-plan-3}}

## Compare what each read caught

- The agent answers. The pattern it names should be something like: read the plan yourself, push back on what you can see, second-pass read for what you can't, approve. Two reads, two kinds of scrutiny. You catch what a human catches (specificity, voice-of-experience, "I'd write that differently"). The second read catches what an agent walking a decision tree catches: branches you didn't notice, dependencies you didn't name, side-effects you didn't price.
- Neither is complete. Paired, they usually are.
- **Plan-mode approval inflation** is the thing this pairing defeats: structured plans get rubber-stamped because they look like decisions. One pass by you catches some of it. The second read catches the rest. That's the pairing.

## Keep the session open for the Compound step

- On to the Compound step, and keep this session open for it. The next step reads this same scrollback to pull the task-shaping rules worth keeping. The Compound step then writes one into your personal `CLAUDE.local.md` in a shape you can re-run on your next plan-mode pass. Team-worthy patterns get flagged for a separate PR against team `CLAUDE.md`.

**What happened:** The agent wrote a plan. You picked *No, keep planning* and sent two push-backs: what YOU saw. The agent regenerated. Then you ran a second-pass read: the agent asked three questions at a time, walking down branches you didn't think to check, suggesting answers. You confirmed or corrected. The plan sharpened. You approved. You did not run the code. You asked Claude what the second-pass read surfaced that your push-back didn't, and whether any of it would have mattered in execution.

<!-- maintainer -->

**View summary:** You take a real multi-file task into plan mode, challenge the draft twice, then give a second agent the unresolved branches. The result is an approved plan shaped by two different reads, with execution deliberately left for later.

**Design-altitude notice added (2026-07-29, Antti-directed, from Horthy's wsff.md program-design gap):** one bullet in *Read the plan before you push back* teaching the file-list vs interface-level altitude read. Sits above the *Steer up* callout's line (its examples are helpers, variable names, error wording; signatures and callers are design).

**Read-whole exception slide added (2026-07-10, Antti-directed cognitive-load arc):** new chunk *The plan is the one you read whole* before *Read the plan before you push back*. Names M1's never-let-the-agent-say-everything countermove and frames the full plan read as its deliberate exception — protects this module's complete-read pedagogy from the selective-reading arc (M1 teach → M3 take-into-use → M5 remind) instead of colliding with it.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** Handles kept bold: the **Stop.** governor in the What-you-do line, the **No, keep planning** approval path, the three push-back axis menu items (**Soft items** / **Assumptions** / **Committed changes**), the coined term **Plan-mode approval inflation** at its naming moment (bold narrowed to the handle), and the law **Find is easier than judge** newly bolded at its naming moment; all other bullet/paragraph leads de-bolded. Widget chrome and blockquote callouts untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Both optional walk-down escalations are kept (not cut).** `push-back-on-the-plan-2-askuserquestion` (switch to the AskUserQuestion picker) and `push-back-on-the-plan-2-original` (the unfiltered Pocock `grill-me`) are opt-in ceilings on the second read, under the *Stop when the read starts reaching* section. A student keeping it simple skips both, so they add no baseline load and cutting them reclaims none. Not cut candidates.

**Quality:** compendium-audited 2026-08-02 (story@d1b6f2c technical@d1b6f2c behavior@d1b6f2c strategy@d1b6f2c slides@d1b6f2c)
- judges @d1b6f2c: writing REVISE (1/1 see instances/ae101--exercise--push-back-on-the-plan.writing.json), story PASS, technical PASS, behavior PASS, pedagogy REVISE (1/3 see instances/ae101--exercise--push-back-on-the-plan.pedagogy.json), strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat at P5 is the Evaluate beat)
- **Exercise time band:** 60 min nominal (P1 5 / P2 15 / P3 15 / P4 15 / P5 10); the current M2 map books it at 50 (Connections 10 / Lecture A 8 / Exercise A 50 / Exercise B 12 / Lecture B 5 / soft-compound 3 / Debrief 7 / Bridge 5 + buffer to 1h45; recounted 2026-08-01) — the 10 comes out of P2/P4 agent-wait, which runs while the student reads. The second-pass read (P4) can stretch on real codebases; the buffer absorbs the overflow.
- **Execution-free by design.** The student does not run the code. The exercise is about reading a plan well; execution is M3's concern. When asked *"why don't we execute?"* the trainer answers: *"you've done the work of making the plan good; recognising a good plan is the skill."*
- **"Stop" repeats across the Approve section and Phase 5 heading — deliberate.** The Approve section closes with *"Then just hit stop."* (operational stop — the student hits stop after approving so plan-mode does not roll into execution). Phase 5's heading opens with *"Stop. See the design pattern."* (pedagogical stop — name the move, do not execute). Same word, two registers, both load-bearing.
- **Artifact locations — governed by the pre-engagement contract:**
  - Plan file → Claude Code's plan directory (auto, descriptive filename)
  - Execution artifacts (diff, PR) → student's real repo
  - Compound-step rules update → personal `CLAUDE.local.md` at repo root (gitignored); team-worthy rules flagged for separate PR against sponsor-stated team rules home (`CLAUDE.md` at root, `.claude/CLAUDE.md`, or `AGENTS.md` per pre-engagement contract). See `reference/claude-code-for-engineers.md § 1`.
  - No training-dir state.
- **Attribution at P5** is terse. Claude names the design pattern first; "plan-mode approval inflation" is the label the exercise hands them after they've already defeated it. Don't front-load.

<!-- backing -->

Claims
- `two-reads-paired` · vision · "two reads, paired. Making the plan good is the work." ← none-owed
- `plan-is-the-exception-to-the-ranked-list` · vision · "Approval hands it to execution as the whole contract, and a summary of a contract is not a contract." ← none-owed
- `read-the-file-not-the-summary` · vision · "the chat summary is secondary, the file is the artifact" ← none-owed
- `plan-mode-mechanics` · detail · "Shift+Tab until the status bar shows plan" ← cc-permission-modes
- `keep-planning-with-feedback` · detail · "At the approval prompt, pick **No, keep planning**." ← cc-permission-modes
- `plan-mode-takes-minutes` · vision · "Plan mode takes minutes on real codebases. Eight to twelve isn't unusual." ← none-owed
- `steps-that-stop-at-file-names-defer-design` · vision · "A step that stops at the file name defers the design to mid-run, where nobody is reading." ← none-owed
- `tests-are-part-of-done` · vision · "the tests are part of what \"done\" means, not something you bolt on after" ← none-owed
- `assumption-push-back-is-wwhtbt` · borrowed · "something the plan is carrying silently that it shouldn't" ← martin-wwhtbt
- `re-softening-on-regeneration` · vision · "Claude will sometimes verbally accept a push-back and re-soften the step anyway (RLHF doing its job)." ← none-owed
- `find-is-easier-than-judge` · vision · "**Find is easier than judge.**" ← none-owed
- `walk-down-branches-three-at-a-time` · borrowed · "walk down every unresolved branch of the plan three questions at a time, recommending an answer for each" ← pocock-grill-me
- `stop-when-the-read-starts-reaching` · vision · "Stop when the second read starts reaching" ← none-owed
- `typical-five-to-twelve-questions` · vision · "Typical session: 5 to 12 questions." ← none-owed
- `pocock-credit` · detail · "Credit: Matt Pocock for the original [`grill-me`](https://github.com/mattpocock/skills/blob/62f43a1/skills/productivity/grill-me/SKILL.md) skill." ← pocock-grill-me
- `neither-read-is-complete-paired-they-are` · vision · "Neither is complete. Paired, they usually are." ← none-owed
- `plan-mode-approval-inflation` · vision · "**Plan-mode approval inflation** is the thing this pairing defeats: structured plans get rubber-stamped because they look like decisions." ← none-owed
- `compound-step-writes-the-rule` · borrowed · "The Compound step then writes one into your personal `CLAUDE.local.md`" ← klaassen-definitive-guide

Sources
- cc-permission-modes `[checked:2026-08-02 result:OK due:cohort]` https://code.claude.com/docs/en/permission-modes.md — [capability] Shift+Tab cycles `default` → `acceptEdits` → `plan`, with the status bar showing the mode; Ctrl+G opens the plan in `$EDITOR`. Re-verified live 2026-08-02, and **the standing CAVEAT is cleared by fixing the body, not the stamp**: the docs name the option *"No, keep planning: stay in plan mode and tell Claude what to change"*, and the body now matches it verbatim. Two things the next cohort check must re-read rather than assume. The approval prompt offers **four** options, not two (*Yes, and use auto mode* · *Yes, manually approve edits* · *No, refine with Ultraplan on Claude Code on the web* · *No, keep planning*), and the first label changes with the account — *Yes, auto-accept edits* where auto mode is unavailable, *Yes, and bypass permissions* in a bypass session. A room will not all see the same menu. Plan mode is also enterable by prefixing a prompt with `/plan`, not only Shift+Tab. fallback: drop the literal label and say "decline the plan and keep planning" — durable against the next copy change, at the cost of concreteness a first-time student needs.
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
- **P4 drift.** Agent expands scope mid-execution. Common on real codebases. Diagnostic: files touched not in plan. Fix: stop, point at plan, resume.
- **P5 deflection.** Student says *"my push-backs didn't really change anything"* as self-deprecation. Diagnostic: was this a comment on their push-back quality or on Claude's execution? Probe which. If the push-back was thin, that's the teaching moment for M3 (they'll build a judge around exactly this).

**Decision points:**
- **P3 under 3 min:** push-back was performative. Send them back in with *"send one more soft item — look at consecutive steps for overlap."*
- **P3 exceeds 12 min:** compress P4's watch time; let Claude run while student reads. Note: this student reads plans seriously; M3 judge-building will go fast.
- **P4 completes in under 15 min:** the task was too small for plan mode. Log for the Debrief: *"plan mode is overkill below ~30 min of agent work — know the floor."*
- **Student asks about Ctrl+G plan-file editing:** it's a real practitioner move (opens the plan in $EDITOR for in-place edits) and fine to mention at Debrief as a next-tier tool — but not the exercise's forcing function. The chat-based push-back stays in conversation with the agent, which is the whole training's shape.
- **P4 turn-time on real codebases.** A single Q-and-A turn can eat 10+ min when the codebase-read fallback fires (2026-05-15 dry-run: 13m15s + 37.7K tokens on one turn). Trainer move: if the slot is being eaten, trim the prompt for next cohort.

**Plug points:**
- Student's own repo (chosen in prework, carried from M1)
- Student's own backlog task (surfaced at P1)
- Sponsor-stated rules home for the Debrief's Compound step

**Push-back moves:**
- **P1:** if student can't surface a fitting task, trainer runs the three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp:** if student approves before 60s with no push-back messages in scrollback, trainer invokes the forcing-function: *"pick No, keep planning. Send one soft item — one step that reads clean but skips something."*
- **P3 performative:** if push-back messages appear in under 3 min without step numbers or specific concerns, trainer asks for specificity — *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening:** if Claude's regenerated plan is no sharper than the original on a flagged step, trainer push: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P3 senior refusal:** if student defends the plan as tight and refuses to produce forced push-backs, accept it — ask for a one-line defense per axis instead of push-backs on auto-pilot. The defense IS the read.
- **P4 tab-away:** fast operators will tab away during execution. Trainer stays silent unless Claude pauses and the student misses the pause.
- **P5:** stay silent until Claude names the shape. Then the trainer says the label — "plan-mode approval inflation" — one line. The corollary (*find is easier than judge*) is in the exercise body and lands the non-obvious beat.

**Arc:**
- Picks up from: M1's Plan → Work → Review → Compound loop, run on a 60-min trivial bug. M2 runs the same loop at deeper Plan scope.
- Hands off to: M2 Debrief (Compound step) — one named pattern about what a good plan looks like for this student on this repo goes into personal `CLAUDE.local.md` (team-worthy flag for separate PR if applicable).
- M3 picks up: the judge-building move — the push-backs the student sent at P3 are the raw material for M3's first judge ("did the fix really land?"). The push-back discipline becomes the gate spec.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- picks plan mode before approving a multi-file change
- sends two specific push-backs naming step numbers before approving a non-trivial plan
- runs a second-pass walk-down on any plan that touches more than two files

**Prompt register — `push-back-on-the-plan-4` deliberately short.** The closing question (`are these rules auto-loaded to each session context?`) is intentionally end-of-session-tired-engineer register: lowercase, no end punctuation, single short question. It models the casual ask a real engineer types after a long session, contrasting with the longer earlier prompts. Audit-class judges flagging it as a stylistic outlier should treat as accepted-by-design.
