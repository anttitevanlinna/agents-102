# Exercise: Author your test-strategy skill

**Time:** 18–22 minutes.

**Window:** *m3-quality* (the side-quest lane; switch from m3-security for Phases 1 and 2's authoring conversation). Phase 2's invocation switches back to m3-security; the callout fires there.

**What you do:** Author a test-strategy skill for your codebase, through conversation with Claude, not by typing markdown. Claude asks you what it needs to encode the skill; you push back on the defaults your codebase doesn't fit. Before you ship, ask the skill to disclose its own weakest part. Then invoke the skill on the feature you just security-tested, ask Claude if the test strategy is any good, sharpen if needed, and ship it personally first.

**The point:** Test strategy authored generically is a pyramid diagram. Test strategy authored on your codebase, through conversation, with one forced self-critique and one invocation on a real feature, is a piece of agentic infrastructure a teammate can adopt. The move you're learning isn't *"write a SKILL.md file"*; it's *author skills by prompting Claude, push back on defaults, verify by invoking*. That move you'll run again at Module 6 (M6).

> **Quick timebox note.** This is the longest beat in Module 3 and the place where authoring conversations spiral. Keep it tight: one author pass, one self-critique, one invocation, ship. If the skill is weak after a single sharpen, ship it with a TODO at the top naming the gap. A skill that names its own gap is more useful to a teammate than a skill that pretends to be finished. The deeper sharpening loop is Module 6 (M6)'s job.

---

## Phase 1: ask Claude to author the skill

Skills aren't hand-crafted. They're authored through conversation.

The ship destination is your personal skills folder: `~/.claude/skills/test-strategy/SKILL.md`. Auto-discovered in every session you run, across every repo.

This skill encodes codebase conventions, so it's team-shaped by nature. But it ships personally first, for reasons named in Phase 3. The team PR is a great candidate for a follow-up move; that move starts with a human conversation, not an agent commit.

{{prompt:author-test-strategy-skill-1}}


Answer each question. When Claude asks something like *"is this codebase Jest?"* and the answer is *"Jest for units, Playwright for e2e, nothing for integration,"* that's the shape of answer the skill needs. When Claude offers a default you don't like, push back: *"no, we don't mock the database; integration tests run against a real Postgres in Docker."*

## Phase 2: invoke the skill on the security-tested feature

**Switch to:** *m3-security window*. The skill at `~/.claude/skills/test-strategy/SKILL.md` is auto-discovered in every session, so the m3-security window picks it up. The access-surface notes and the hardening ADR live in the main lane's working tree, so invocation belongs there.

Authoring without invocation is theatre. Run the skill on the feature you just access-mapped and threat-modeled.

{{prompt:author-test-strategy-skill-2}}

This prompt asks Claude to invoke the skill it just helped author AND grade the result in the same turn. That's biased by design, the same context window self-charity. The shape is one paste, one wait, one read, convenient over rigorous. If you want a harsher read, run it as two prompts: invoke first, read the output, then a second prompt that says *"Read that output as if you'd never seen the SKILL.md. Does the strategy cover the hardening decision? Or does it read generic?"* Your call.

Read the output. If the strategy doesn't cover the hardening decision, or if Claude's "is it good?" answer names a real weakness, sharpen the skill (not the output; the skill). Then decide: one re-invoke if the sharpen was substantive, or ship with a one-line TODO at the top naming what's unresolved. Don't loop. A skill that names its own gap is more useful to a teammate than a skill that pretends it's finished. The authoring muscle is what Module 3 is installing; perfection waits for M6.

## Phase 3: ship

The skill is already at `~/.claude/skills/test-strategy/SKILL.md` (Claude wrote it there in Phase 1, sharpened by your push-back during Phase 2's invoke-and-critique). Auto-discovered in every session you run. That's the ship.

**A strong candidate for a team PR, after you talk to the team.**

A test-strategy skill encodes codebase conventions teammates share: framework, mocking policy, integration boundary, flakiness patterns. If it's accurate for you, it's accurate for them.

So: show it to your staff engineer over coffee. Send it to the channel. Ask two teammates who'd use it: *"does this match how you actually write tests on this codebase?"* If they say yes, PR it. If they push back, you just got the real review for free. Sharpen the skill, ship it sharper.

Agents don't unilaterally change shared team infrastructure. You do. The conversation is the move; the PR is the artifact of the conversation.

Personal stays a fine final home. Not every skill needs to graduate to a shared kit; the test you'll apply is whether teammates would use it as-written, and whether the skill carries enough codebase truth to survive their review.

**What happened:** You ended with one SKILL.md file tuned to your codebase's actual testing conventions (framework, mocking policy, integration boundary, flakiness patterns, regression scope) living in your personal skills folder. A strong candidate for a team PR, but the PR starts with a human conversation, not an agent commit.

Shipped. Debrief will integrate the session.

---

## What this sets up

Module 4 (memory that reads your system) consumes the test-strategy skill as a Block 3 quality-criterion anchor. M6 (long-running return) will author a verifier skill the same way you authored this one; the move repeats, gets faster. Your personal skills folder now has one file you authored from session evidence. Promotion to a team home is the conversation you'll start over coffee, not the move you make today.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-14 (writing@e840433 story@e840433 technical@e840433 behavior@e840433)
- judges @e840433: writing PASS, story PASS, technical PASS, behavior PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Time:** 18–22 minutes (12 / 6 / 2)
- **Primary Bloom's level:** Create + Evaluate
- **Mood target:** earned trust, culminating. Student leaves with *"I authored a skill, I invoked it on a real feature, I sharpened it from what came back, I shipped it somewhere my teammates read."* Watch for: default-acceptance failure (student ships Claude's first draft verbatim). Diagnostic: skill file has generic testing advice. Fix: Nerd pushes at the pyramid-dressed-as-codebase-specific question during Phase 1 and at the invoke-and-critique in Phase 2.

**Push-back moves** (trainer delivers in cohort; Nerd delivers only in self-study):
- **P1 question-dump.** Claude fires all questions at once instead of one at a time. Nerd: *"tell Claude to ask one at a time, wait for your answer, then ask the next. You want the conversation to surface detail, not a form to fill."*
- **P1 generic answers.** Student gives pyramid-shaped answers (*"unit first, then integration, then e2e"*). Nerd: *"is that actually how your codebase's tests run, or how you think they should? A skill encoding the first is useful; the second is a wish."*
- **P1 missed detail.** Student mentions something in conversation that doesn't make it into SKILL.md. Nerd catches: *"you said X earlier — is that in the skill? if not, add it."*
- **P2 invoke-skip.** Student ships without running the skill on the feature. Nerd: *"authoring without invocation is theatre. Run it on the feature we just threat-modeled and ask 'is it good?'"*
- **P2 invoke-output-weak.** Output is generic. Sign the skill itself is weak. Nerd: *"the output is only as good as the skill. What in the skill would you sharpen to get a better output? sharpen the skill, then re-invoke."*
- **P3 ship-confusion.** Team-kit home ambiguous. Nerd checks: *"the skill ships to your personal `~/.claude/skills/test-strategy/SKILL.md` (Claude wrote it there in Phase 1). That's the ship for today. The team-PR move is a separate human conversation later, after teammates have weighed in. The pre-engagement contract's team-kit slot names where a skill goes if it graduates, not whether this one ships now."*

**Watch-fors:**
- Student opens an editor to hand-craft SKILL.md. Redirect to conversation — the authoring move is prompting Claude, not keyboard-crafting markdown. This rule is load-bearing for the training; catch it every time.
- Student's codebase has genuinely no integration tests. Good signal — the skill encodes that (*"integration coverage is aspirational; unit + e2e are load-bearing today"*) rather than pretending.
- Student over-specifies the skill's output shape in Phase 1. Trust Claude's default SKILL.md shape (frontmatter + instructions). Don't ship a template.
- Team-kit home was not resolved in the pre-engagement contract. That's fine; the skill ships to personal `~/.claude/skills/test-strategy/SKILL.md` regardless. Personal-first is the through-line (matches M1's `CLAUDE.local.md`). Promotion to a team home is a later human conversation; sponsor non-answer does not block this exercise. If the cohort spontaneously decides on an org-level home, trainer logs the decision in the cohort overrides log.

**Plug points:**
- Student's feature (Ex1 + Ex2 carried forward) — Phase 2 invocation target
- Sponsor-named test framework / mocking policy / CI gate convention — Phase 1 authoring conversation surfaces these as the codebase-specific encoding the skill ships
- Hardening decision ADR (from Ex2) — read by Phase 2 invocation
