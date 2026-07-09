# Author your test-strategy skill

**Time:** 18–22 minutes.

**Window:** the side quest window (*m3-quality*). All phases run here.

**What you do:** Author a test-strategy skill for your codebase, through conversation with Claude, not by typing markdown. Claude asks you what it needs to encode the skill; you push back on the defaults your codebase doesn't fit. Before you ship, ask the skill to disclose its own weakest part. Then invoke the skill on this codebase, ask Claude if the test strategy is any good, sharpen if needed, and ship it personally first.

**What you build:** one SKILL.md tuned to how your codebase actually tests, hardened by one forced self-critique and one real invocation, living in your personal skills folder, ready for a teammate to adopt.

**The point:** Test strategy authored generically is a pyramid diagram. Test strategy authored on your codebase, through conversation, with one forced self-critique and one invocation on a real feature, is a skill a teammate can adopt. The move you're learning isn't *"write a SKILL.md file"*; it's *author skills by prompting Claude, push back on defaults, verify by invoking*. That move you'll run again at Module 6 (M6).

> **Quick timebox note.** This is the longest beat in Module 3 and the place where authoring conversations spiral. Keep it tight: one author pass, one self-critique, one invocation, ship. If the skill is weak after a single sharpen, ship it with a TODO at the top naming the gap. The deeper sharpening loop is Module 6 (M6)'s job.

---

## Phase 1: Author the skill through conversation

- Skills aren't hand-crafted; they're authored through conversation. You describe your codebase; the agent drafts the SKILL.md. You are not typing markdown into an editor.
- The ship destination is your personal skills folder. `~/.claude/skills/test-strategy/SKILL.md`, auto-discovered in every session you run, across every repo.
- A test-strategy skill is team-shaped by nature, but it ships personal first. It encodes codebase conventions teammates share. The reasons for personal-first land in Phase 3; the team PR is a follow-up move that starts with a human conversation, not an agent commit.

Ask Claude to author the skill, asking one question at a time.

{{prompt:author-test-strategy-skill-1}}

## Answer from how your codebase really tests

- Answer each question from how your codebase actually tests, not how a diagram says it should. *"Jest for units, Playwright for e2e, nothing for integration"* is the shape of answer the skill needs. Pyramid-shaped answers (*"unit first, then integration, then e2e"*) encode a wish, not your codebase.
- Push back when Claude offers a default you don't like. *"No, we don't mock the database; integration tests run against a real Postgres in Docker."* The push-back is where the skill gets its codebase truth.

## Phase 2: Invoke the skill on this codebase

- Authoring without invocation is theatre. The skill only earns its place when it runs on real code.
- The skill is auto-discovered right here. It sits at `~/.claude/skills/test-strategy/SKILL.md`, and this worktree holds the full codebase. Invoke it on the code as it stands in front of you.
- The agent reads the codebase; you read what comes back.

Ask Claude to invoke the skill on this codebase and grade what it produced in the same turn.

{{prompt:author-test-strategy-skill-2}}

## Sharpen the skill from what came back

- The grade is biased by design. Claude invoked the skill it just helped author, then graded the result in the same context window: same-window self-charity. One paste, one wait, one read, convenient over rigorous.
- Want a harsher read? Run it as two prompts. Invoke first, read the output, then a second prompt: *"Read that output as if you'd never seen the SKILL.md. Does it fit this codebase, or does it read generic?"* Your call.
- If the strategy reads generic, sharpen the skill, not the output. A weak output is usually a weak skill. Sharpen the SKILL.md, then re-invoke.
- Then decide: one re-invoke, or ship with a TODO. Re-invoke if the sharpen was substantive. Otherwise ship with a one-line TODO at the top naming what's unresolved. A skill that names its own gap is more useful to a teammate than one that pretends it's finished. The authoring muscle is what Module 3 installs; perfection waits for M6.

## Phase 3: Ship the skill personal-first

- The skill is already shipped. It sits at `~/.claude/skills/test-strategy/SKILL.md`. The agent wrote it there in Phase 1, sharpened by your push-back during Phase 2's invoke-and-critique. Auto-discovered in every session you run. That's the ship.

## Decide if it graduates to the team

- A strong candidate for a team PR, after you talk to the team. A test-strategy skill encodes conventions teammates share: framework, mocking policy, integration boundary, flakiness patterns. Accurate for you, accurate for them.
- The team PR starts with a conversation, not a commit. Show it to your staff engineer over coffee. Send it to the channel. Ask two teammates who'd use it whether it matches how they actually write tests on this codebase. Say yes, and you PR it. Push back, and you got the real review for free; sharpen the skill, ship it sharper.
- Agents don't unilaterally change shared team infrastructure. You do. The conversation is the move; the PR is the artifact of the conversation.
- Personal stays a fine final home. Not every skill graduates to a shared kit. The test: would teammates use it as-written, and does the skill carry enough codebase truth to survive their review.

**What happened:** One SKILL.md tuned to your codebase's actual testing conventions (framework, mocking policy, integration boundary, flakiness patterns, regression scope), living in your personal skills folder. Shipped. The Debrief integrates the session.

## What this sets up

- Module 4 reads this skill as part of the system you have. M4 (memory that reads your system) consumes the test-strategy skill as a quality-criterion anchor.
- M6 authors a verifier skill the same way you authored this one. The move repeats and gets faster.
- Your personal skills folder now holds one file you authored from session evidence. Promotion to a team home is the conversation you start over coffee, not the move you make here.

**Note** The side-quest worktree may still hold changes the agent made here: code, tests, scratch files. Its copy of `CLAUDE.local.md` came over at the fork and may have drifted from the one in your main repo. The skill crossed back on its own (it lives at user scope); everything else stays in the worktree. Those changes are yours to handle later: keep them, carry the useful parts to your main repo, or delete the worktree.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain across all slides; kept bold: none (no named-move or menu handles in body); widget/label chrome (**Time:**/**Window:**/**What you do:**/**What you build:**/**The point:**/**What happened:**/**Note**) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@e840433 story@e840433 technical@e840433 behavior@e840433 pedagogy@689e7e0 strategy@689e7e0 slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Time:** 18–22 minutes (12 / 6 / 2)
- **Primary Bloom's level:** Create + Evaluate
- **Mood target:** earned trust, culminating. Student leaves with *"I authored a skill, I invoked it on my codebase, I sharpened it from what came back, I shipped it somewhere my teammates read."* Watch for: default-acceptance failure (student ships Claude's first draft verbatim). Diagnostic: skill file has generic testing advice. Fix: trainer pushes at the pyramid-dressed-as-codebase-specific question during Phase 1 and at the invoke-and-critique in Phase 2.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- invokes the test-strategy skill on a real feature they're shipping within a week, not a sample one
- sharpens the skill from one self-critique loop after invocation, then re-invokes on the same feature
- opens a team-PR conversation with at least one teammate before promoting the skill team-side

**Push-back moves:**
- **P1 question-dump.** Claude fires all questions at once instead of one at a time. Trainer push: *"tell Claude to ask one at a time, wait for your answer, then ask the next. You want the conversation to surface detail, not a form to fill."*
- **P1 generic answers.** Student gives pyramid-shaped answers (*"unit first, then integration, then e2e"*). Trainer push: *"is that actually how your codebase's tests run, or how you think they should? A skill encoding the first is useful; the second is a wish."*
- **P1 missed detail.** Student mentions something in conversation that doesn't make it into SKILL.md. Trainer catches: *"you said X earlier — is that in the skill? if not, add it."*
- **P2 invoke-skip.** Student ships without running the skill. Trainer push: *"authoring without invocation is theatre. Run it on this codebase and ask 'is it good?'"*
- **P2 invoke-output-weak.** Output is generic. Sign the skill itself is weak. Trainer push: *"the output is only as good as the skill. What in the skill would you sharpen to get a better output? sharpen the skill, then re-invoke."*
- **P3 ship-confusion.** Team-kit home ambiguous. Trainer checks: *"the skill ships to your personal `~/.claude/skills/test-strategy/SKILL.md` (Claude wrote it there in Phase 1). That's the ship for today. The team-PR move is a separate human conversation later, after teammates have weighed in. The pre-engagement contract's team-kit slot names where a skill goes if it graduates, not whether this one ships now."*

**Watch-fors:**
- Student opens an editor to hand-craft SKILL.md. Redirect to conversation — the authoring move is prompting Claude, not keyboard-crafting markdown. This rule is load-bearing for the training; catch it every time.
- Student's codebase has genuinely no integration tests. Good signal — the skill encodes that (*"integration coverage is aspirational; unit + e2e are load-bearing today"*) rather than pretending.
- Student over-specifies the skill's output shape in Phase 1. Trust Claude's default SKILL.md shape (frontmatter + instructions). Don't ship a template.
- Team-kit home was not resolved in the pre-engagement contract. That's fine; the skill ships to personal `~/.claude/skills/test-strategy/SKILL.md` regardless. Personal-first is the through-line (matches M1's `CLAUDE.local.md`). Promotion to a team home is a later human conversation; sponsor non-answer does not block this exercise. If the cohort spontaneously decides on an org-level home, trainer logs the decision in the cohort overrides log.

**Plug points:**
- This codebase/repository in the m3-quality worktree — Phase 2 invocation target (the worktree holds the full repo; no cross-window artifact needed)
- Sponsor-named test framework / mocking policy / CI gate convention — Phase 1 authoring conversation surfaces these as the codebase-specific encoding the skill ships
