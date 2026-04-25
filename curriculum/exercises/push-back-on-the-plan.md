# Push back on the plan

**What you do:** take a real multi-file task from your backlog, run it through plan mode, push back twice with what you can see, then hand the plan to a second agent that walks down every unresolved branch and surfaces what you missed. Approve the plan. **Stop.** Don't execute. Compare what your read caught to what the second-pass read caught. That gap is the skill this module is building.

**What happens:** Claude writes a plan. You pick *keep planning with feedback* and send two push-backs: what YOU see. Claude regenerates. Then you run a second-pass read: Claude asks one question at a time, walking down branches you didn't think to check, suggesting answers. You confirm or correct. The plan sharpens again. You approve. You don't run the code. You ask Claude what the second-pass read surfaced that your push-back didn't, and whether any of it would have mattered in execution.

**The point:** reading a plan is finite. A first pass by a human plus a second pass by an agent isn't belt-and-braces. It's the complete read. Two different kinds of scrutiny catch two different kinds of miss. The exercise installs the pairing as a move. No execution needed; you've already done the work of making the plan good. **Execution is next module's concern.**

**Time:** 60 minutes.

## Phase 1: Bring a real task (5 min)

Pick a task from your backlog that needs multi-file work, roughly 30–60 minutes of agent execution. Not a one-line fix (plan mode is overkill); not a refactor so big you can't hold the outcome in your head. A feature slice, a small migration, a targeted refactor: something where touching the wrong file matters.

If nothing fits, ask Claude to surface three candidates from recent issues, PRs, or TODO comments. Pick the one you'd ship today if you had an hour.

## Phase 2: Enter plan mode, read what arrives (15 min)

Shift+Tab until the status bar shows **plan**. Paste the prompt. Then send a second message with your task in 2–3 sentences: what, why, the one constraint you care about most.

Ask Claude to work in plan mode and write a detailed plan file you can read and push back on.

**Prompt** *(Claude Code)*

```
Plan the task I'm about to describe in my next message. Explore the files you need to understand the scope. Write the plan to a plan file. Each step names files touched, shape of the change, tests you'd write or update before any code lands, and what you'd check before declaring it done. Detail over brevity.
```


Then a second message with your task: what, why, the one constraint that matters most.

Claude explores, writes a plan file with a descriptive name (e.g., `migrate-auth-hash-calm-otter.md`), and pauses for approval. Open the plan file; the chat summary is secondary, the file is the artifact. **Read the plan.** Not skim. Read. Notice which steps name files and which say "the relevant files." Notice which verification steps could actually fail and which are cosmetic. Notice which assumptions the plan is carrying silently. **Read the tests section carefully.** A good plan names the tests before any code; the tests are part of what "done" means, not something you bolt on after. If the tests section is thin or missing, that's a push-back. When you have two push-backs forming in your head, move on. Don't wait for the clock.

## Phase 3: Push back twice (15 min)

**Don't approve yet.** At the approval prompt, pick **keep planning with feedback**. Send two push-backs on two different axes: one soft item, and one of (assumption · committed change). Your own words, your own concerns.

**Soft items:** the step that reads clean but skips over something. *"Update the config"* without which keys. *"Handle migration errors"* without what happens to rows mid-flight. The vagueness isn't a drafting slip; it's where the agent hasn't decided yet.

**Assumptions:** something the plan is carrying silently that it shouldn't. A library version, a schema shape, a teammate's recent change the agent hasn't seen.

**Committed changes:** not just a flag; an alternative. Merge two steps that belong together. Reorder two steps whose sequence matters. Swap a file path for the right one.

Two messages, your phrasing, specific to what you saw. Claude acknowledges each, regenerates the plan, re-presents it. **Read the revised plan carefully. This is where Claude's niceness bites.** Claude will sometimes verbally accept a push-back and re-soften the step anyway (RLHF doing its job). If you see the original vagueness survive the regeneration, push back again on that specific line. Softening-on-regeneration is a reliable tell; catching it is part of the read.

Stuck on the soft item? Ask Claude which step it's least confident about. That answer IS one. Find is easier than judge.

## Phase 4: Second-pass read (15 min)

Now hand the plan to a second agent that reads differently than you do.

Ask Claude to walk down every unresolved branch of the plan one question at a time, recommending an answer for each.

**Prompt** *(Claude Code)*

```
Do a second-pass read of the current plan. Walk down every unresolved branch of the design tree one at a time: dependencies, decisions, side-effects I haven't named. Ask me one question at a time. For each question, recommend an answer. If a question can be answered by reading the codebase, read the codebase instead of asking me. I'll confirm or correct one at a time.
```


The second read asks one question at a time. Some will feel trivial (*"which logger should step 2 use?"*); answer and move on. Some will reach into something you hadn't considered (*"step 4 touches the shared cache; what's the invalidation story?"*); pause, think, answer. A few will surface decisions the plan was silently making for you; reject the recommended answer and give a different one.

Typical session: 5–12 questions. Stop when the second read starts reaching: a question about something genuinely out of scope, a branch that's already settled, a recommendation you'd accept without thinking. The agent doesn't always know when to stop; you do. Claude incorporates your answers into a sharpened plan. Approve when it's yours. Not Claude's, not the second read's.

> **Timebox check.** When the slot ends, we stop. The second-pass walk-down can run deep on a real codebase. If it is still surfacing branches when time is up, take the most recent sharpened plan, approve it, and move to Phase 5. The branches that did not surface today are the ones you will catch tomorrow when you actually ship the work. The exercise teaches the move. You take the move home.

## Phase 5: Stop. See the design pattern. (10 min)

**Don't execute the plan.** You've done the work of making it good; that's the exercise. Execution is next module's concern.

Ask Claude to name the design pattern you just ran and compare what the second-pass read surfaced against what your two push-backs caught.

**Prompt** *(Claude Code)*

```
Looking back at this session: what new information and decisions did the second-pass read surface that my two push-backs didn't? Would any of them have mattered in execution? What's the design pattern I just ran, as a repeatable move I could apply to my next non-trivial plan?
```


Claude answers. Read carefully. The pattern it names should be something like: *read the plan yourself → push back on what you can see → second-pass read for what you can't → approve.* Two reads, two kinds of scrutiny. You catch what a human catches (specificity, voice-of-experience, "I'd write that differently"). The second read catches what an agent walking a decision tree catches: branches you didn't notice, dependencies you didn't name, side-effects you didn't price.

Neither is complete. Paired, they usually are.

**Plan-mode approval inflation** is the thing this pairing defeats: structured plans get rubber-stamped because they look like decisions. One pass by you catches some of it. The second read catches the rest. That's the move.

On to the Compound step. The Debrief writes the pattern into your personal `CLAUDE.local.md` in a shape you can re-run tomorrow. Team-worthy patterns get flagged for a separate PR against team `CLAUDE.md`.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat at P5 is the Evaluate beat)
- **Exercise time band:** 60 min inside a 1h45 module (Connections 10 / Lecture 10 / Exercise 60 / Debrief 15 / Bridge 5 + buffer). Phase breakdown: P1 5 / P2 15 / P3 15 / P4 15 / P5 10. The second-pass read (P4) can stretch on real codebases; Debrief absorbs the overflow.
- **Execution-free by design.** The student does not run the code. The exercise is about reading a plan well; execution is M3's concern. When asked *"why don't we execute?"* the trainer answers: *"you've done the work of making the plan good; recognising a good plan is the skill."*
- **Artifact locations — governed by the pre-engagement contract:**
  - Plan file → Claude Code's plan directory (auto, descriptive filename)
  - Execution artifacts (diff, PR) → student's real repo
  - Compound-step rules update → personal `CLAUDE.local.md` at repo root (gitignored); team-worthy rules flagged for separate PR against sponsor-stated team rules home (`CLAUDE.md` at root, `.claude/CLAUDE.md`, or `AGENTS.md` per pre-engagement contract). See `reference/claude-code-for-engineers.md § 1`.
  - No training-dir state.
- **Frameworks riffed on:**
  - **Plan mode** (Anthropic Claude Code). Activation via Shift+Tab; push-back via *keep planning with feedback* at the approval prompt. Reference: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`, current as of 2026-04-22.
  - **Socratic walk-down-branches move** — Matt Pocock's grill-me skill ([mattpocock/skills](https://github.com/mattpocock/skills/blob/main/grill-me/SKILL.md), MIT license, commit `a6bdfd9`, 2026-04-22). Socratic requirement elicitation — walks down branches of a decision tree one at a time with recommended answers. Forked into `curriculum/skills/external/pocock-skills/grill-me/` with LICENSE and attribution preserved. **In M2 we inline the behaviour as a prompt; the skill reveal — "that second-pass read you did was a skill all along, here's how to author one" — lands in M3 as authoring material, so we don't front-run M3's first-Skill-use moment by invoking it by name here.**
  - **Compound engineering** — Kieran Klaassen (Every Inc.). Plan step at depth; continuation from M1's four-step loop. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`.
  - **"What would have to be true" / strategic-choice assumption-testing** — Roger Martin (HBR, *Playing to Win*). The assumption-flag move in P3 is the Martin move applied to engineering plans. Most engineers know the shape from strategy readings; optional attribution at Debrief.
- **Attribution at P5** is terse. Claude names the design pattern first; "plan-mode approval inflation" is the label the exercise hands them after they've already defeated it. Don't front-load.
- **Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts)

**Watch-fors:**
- **P3 rubber-stamp.** Student hits "approve" under 60 seconds without sending a push-back message. Diagnostic: no keep-planning-with-feedback branch in the scrollback. Push-back move: *"pick keep planning with feedback — send one soft-item message before approving."*
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

**Plug points:**
- Student's own repo (chosen in prework, carried from M1)
- Student's own backlog task (surfaced at P1)
- Sponsor-stated rules home for the Debrief's Compound step

**Push-back moves** (trainer delivers by default; Nerd in self-study):
- **P1:** if student can't surface a fitting task, Nerd runs the three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp:** if student approves before 60s with no push-back messages in scrollback, Nerd invokes the forcing-function: *"pick keep planning with feedback. Send one soft item — one step that reads clean but skips something."*
- **P3 performative:** if push-back messages appear in under 3 min without step numbers or specific concerns, Nerd asks for specificity — *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening:** if Claude's regenerated plan is no sharper than the original on a flagged step, Nerd: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P3 senior refusal:** if student defends the plan as tight and refuses to produce forced push-backs, accept it — ask for a one-line defense per axis instead of push-backs on auto-pilot. The defense IS the read.
- **P4 tab-away:** fast operators will tab away during execution. Nerd stays silent unless Claude pauses and the student misses the pause.
- **P5:** stay silent until Claude names the shape. Then the Nerd says the label — "plan-mode approval inflation" — one line. The corollary (*find is easier than judge*) is in the exercise body and lands the non-obvious beat.

**Arc:**
- Picks up from: M1's Plan → Work → Review → Compound loop, run on a 60-min trivial bug. M2 runs the same loop at deeper Plan scope.
- Hands off to: M2 Debrief (Compound step) — one named pattern about what a good plan looks like for this student on this repo goes into personal `CLAUDE.local.md` (team-worthy flag for separate PR if applicable).
- M3 picks up: the judge-building move — the push-backs the student sent at P3 are the raw material for M3's first judge ("did the fix really land?"). The push-back discipline becomes the gate spec.

**Frameworks riffed on (attributed at P5):**
- Compound engineering (Klaassen) — one line, continuation from M1
- Plan-mode approval inflation — exercise-named pattern, not a practitioner attribution
- "What would have to be true" (Martin) — optional attribution at Debrief if it lands naturally
