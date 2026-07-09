# The wizard move

## Who this is for

You've already done the hard part. You found this training because you use Claude Code regularly and you want to get further with it. That's who this training is for.

Nobody here needs the "agents can write code" setup. So this training won't run one.

You'll watch what's possible, not what's missing. That's the posture of the whole training.

## Context is King

The same question, two answers. Two Claude chat windows. In one, the first prompt is *"What is the capital of Italy?"* Claude answers *Rome.* Then the second prompt: *"What should we have for dinner?"* Claude suggests something Italian: pasta, osso buco, risotto.

Same words, different window. In the other window, the first prompt is *"What is the largest lake in Finland?"* Claude answers *Saimaa.* Then the same second prompt: dinner. Take a guess before it runs. What does Claude suggest now?

Something Finnish: salmon, rye bread, meatballs. But not as reliably. The first exchange became context, and the context colored everything after.

## You steer the answer by loading context

A role colors answers the same way a fact does. One more window. The first prompt: *"I'm a cardiologist preparing dinner for my patients."* Then the same second prompt about dinner. The suggestion shifts again: heart-healthy, low-sodium, vegetable-forward. Not because Claude knows medicine better than Italian cooking. You told it who you are, and every answer after took that into account.

Context is whatever you tell it. A fact. A role. A preference. A constraint. All of it colors what comes next. You, in a way, compel the right output by having the right stuff in the context.

That's the move. The move is loading the right context before the question, not a clever prompt or a slash command you didn't know. Everything else in this training is about how to earn that kind of primed window on any codebase, any Monday.

## Everyone arrives partial, trainers included

You found your way to Claude Code by yourself. Maybe a colleague pointed you at it. Maybe you watched a video. Mostly you just typed something, watched what came back, and kept the prompts that worked. You picked up tricks nobody taught you. The slash command that saves keystrokes. The `CLAUDE.md` shape that produced output you liked. The weird thing you tell Claude at the start of every session.

Every engineer who sat down with this tool did some version of that. The trick you named at the opening trick-exchange is your slice of partial; everyone else's slice is different.

This training pools partial into a shared floor, then raises the ceiling. The people building this are partial too. Six months ahead of you on some moves, six months behind on others.

## The loop is what you repeat, not the fix

Fix one trivial bug from your own backlog, end-to-end. Log one decision. Seed a rules file your next session reads first.

The fix happens once. The loop is what you repeat: a way of working, not one bug closed. You become the Claude wizard by running the loop on real work and letting the habit sharpen. Not by reading about it.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five narrative/demo slides recast from bolded-claim bullets to prose paragraphs, zero bold kept, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Context-is-King guess-before-reveal order preserved (guess paragraph still precedes the Finnish-dinner reveal, `check_slides §4`). Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slides-only pass (2026-07-02, unaudited):** RE-CHUNK, not cull. Per-passage verdicts: unheaded intro CONVERTED to slide *Who this is for* (new heading; openers carry no setup lede) · posture line ("what's possible, not what's missing") MOVED from the demo section's close into the intro slide as a posture bullet · *Context is King* CONVERTED to one six-bullet slide, demo narration near-verbatim, guess-beat kept in original position (after both windows are narrated, before the live run) · *Where you're starting* CONVERTED one-to-one · *What you'll do today* CONVERTED; **"with plan mode used deliberately" DELETED as drift** — module Big Idea + LO say the M1 fix runs tests-first with NO plan mode (plan mode earns its keep at M2); maintainer eyeball requested · "The bug is the vehicle; the loop is the cargo" gained one mechanism sentence ("a way of working, not one fix") to pass bullet durability; the closer lecture's "loop is the shape / bug was the excuse" kicker NOT stolen. No cuts beyond the drift clause, no new theory, zero map references (M1 protected). File is now four slides.

**Quality:** compendium-audited 2026-07-08 (slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing grandfathered, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy grandfathered, strategy grandfathered, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- compendium-audited 2026-04-26 (check_writing voice-quartet Seth-Rory-Risto, check_student_facing #14, check_lectures opener, check_strategy_tie_in)
**Meta:**
- **Placement:** M1 opener, after Connections, before the exercise.
- **Runtime:** 10 min. 5–7 min lecture prose + 3 min live two-session demo on the volunteer's codebase.
- **Voice:** Seth × Rory × Risto — warm + counterintuitive + direct.

**The Context is King demo (stolen verbatim from Agents 101):**
- Two chat windows. Capital-of-Italy → pasta suggestion. Largest-lake-of-Finland → Finnish dinner. Same second prompt, different answer, because the first exchange became context.
- Third window: cardiologist-preparing-dinner-for-patients → heart-healthy suggestion. Context is whatever you tell it.
- Not adapted for engineers. The universality is the point — the lesson lands because it is not about code. Engineers come in expecting a clever-prompt flex and get a 60-second demo that reframes the whole training.

**Demo watch-fors:**
- Room wants something code-specific up front — hold. The exercise is on their codebase; the opener isn't. The abstract demo is what makes Monday-on-their-repo feel inevitable rather than impressive.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
