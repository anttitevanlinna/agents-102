# Exercise: Author your test-strategy skill

**What you do:** Author a test-strategy skill for your codebase, through conversation with Claude, not by typing markdown. Claude asks you what it needs to encode the skill; you push back on the defaults your codebase doesn't fit. Before you ship, ask the skill to disclose its own weakest part. Then invoke the skill on the feature you just security-tested, ask Claude if the test strategy is any good, sharpen if needed, and ship it personally first.

**What happens:** You end with one SKILL.md file tuned to your codebase's actual testing conventions (framework, mocking policy, integration boundary, flakiness patterns, regression scope) living in your personal skills folder. A strong candidate for a team PR. But that PR starts with a human conversation, not an agent commit.

**The point:** Test strategy authored generically is a pyramid diagram. Test strategy authored on your codebase, through conversation, with one forced self-critique and one invocation on a real feature, is a piece of agentic infrastructure a teammate can adopt. The move you're learning isn't *"write a SKILL.md file"*; it's *author skills by prompting Claude, push back on defaults, verify by invoking*. That move you'll run again at M6.

**Time:** 25–30 minutes.

> **Quick timebox note.** This is the longest beat in M3 and the place where authoring conversations spiral. We keep it tight: one author pass, one self-critique, one invocation, ship. If the skill is weak after a single sharpen, ship it with a TODO at the top naming the gap. A skill that names its own gap is more useful to a teammate than a skill that pretends to be finished. The deeper sharpening loop is M6's job.

---

## Phase 1: ask Claude to author the skill (~12 min)

Skills aren't hand-crafted. They're authored through conversation.

The ship destination is your personal skills folder: `~/.claude/skills/test-strategy/SKILL.md`. Auto-discovered in every session you run, across every repo.

This skill encodes codebase conventions, so it's team-shaped by nature. But it ships personally first, for reasons we'll name in Phase 4. The team PR is a great candidate for a follow-up move; that move starts with a human conversation, not an agent commit.

**Prompt** *(copy → Claude Code)*

```
I want to author a test-strategy skill for this codebase. Ask me the questions you need to encode it well: the ones that'd make the skill give a teammate on a different service a test strategy tuned to OUR system, not a generic pyramid.

Cover at minimum: which testing framework, what's mocked and what isn't, where the integration boundary actually runs (real dependencies vs. stubs), what "flaky" means in our system (what actually fails intermittently and why), what regression scope looks like on this team, which tests are load-bearing (the ones reviewers always check), what's NOT worth testing here (and why).

Ask ONLY question 1 first. Do not preview questions 2-N. Wait for my reply, then ask the next. Push back if my answer is generic. A test-strategy skill that says "write unit tests first" is useless. I need you to extract codebase-specific detail.

When you have enough, write SKILL.md at `~/.claude/skills/test-strategy/SKILL.md`. Follow Claude Code's skill file convention (frontmatter with name + description, then instructions). Show me before saving.
```

*(end of prompt)*

Answer each question. When Claude asks something like *"is this codebase Jest?"* and the answer is *"Jest for units, Playwright for e2e, nothing for integration,"* that's the shape of answer the skill needs. When Claude offers a default you don't like, push back: *"no, we don't mock the database; integration tests run against a real Postgres in Docker."*

## Phase 2: self-critique before shipping (~5 min)

Default-acceptance is the failure mode here. Most students will read Claude's first draft and approve it. Before you ship, ask the skill what's weakest about itself.

**Prompt** *(copy → Claude Code)*

```
Before I ship the test-strategy skill, I want you to critique it. Read the SKILL.md you just wrote. Tell me:

- What's the weakest part of this skill? Be specific. Name the assumption most likely to be wrong for this codebase, or the section a staff engineer would push back on first.
- Is there anything in the skill that's generic test-pyramid wisdom dressed up as codebase-specific?
- Is there anything I told you that didn't make it into the skill? A detail I mentioned in conversation that would sharpen the skill if it were encoded?

Don't just reassure me. Name weak parts.
```

*(end of prompt)*

Read the critique. Push back where Claude is wrong (*"no, that section is fine because X"*); accept where Claude is right. Claude revises SKILL.md from your push-back.

## Phase 3: invoke the skill on the security-tested feature (~6 min)

Authoring without invocation is theatre. Run the skill on the feature you just access-mapped and threat-modeled.

**Prompt** *(copy → Claude Code)*

```
Invoke the test-strategy skill we just wrote on the feature I'm shipping: the same feature from the previous two exercises, now including the hardening decision from the ADR.

Produce the test strategy the skill asks you to produce.

Then, in the same response, read the test strategy you just produced above and answer: is it good? Specifically: does the strategy cover the hardening decision we made in the STRIDE exercise? Does it reflect how testing actually works on this codebase, or does it read generic? Would a teammate opening the PR feel the test coverage is sufficient, or would they ask for more?
```

*(end of prompt)*

Read the output. If the strategy doesn't cover the hardening decision, or if Claude's "is it good?" answer names a real weakness, sharpen the skill (not the output; the skill). Then decide: one re-invoke if the sharpen was substantive, or ship with a one-line TODO at the top naming what's unresolved. Don't loop. A skill that names its own gap is more useful to a teammate than a skill that pretends it's finished. The authoring muscle is what M3 is installing; perfection waits for M6.

## Phase 4: ship (~2 min)

The skill is already at `~/.claude/skills/test-strategy/SKILL.md` (Claude wrote it there in Phase 1, sharpened in Phase 2). Auto-discovered in every session you run. That's the ship.

**A strong candidate for a team PR, after you talk to the team.**

A test-strategy skill encodes codebase conventions teammates share: framework, mocking policy, integration boundary, flakiness patterns. If it's accurate for you, it's accurate for them.

So: show it to your staff engineer over coffee. Send it to the channel. Ask two teammates who'd use it: *"does this match how you actually write tests on this codebase?"* If they say yes, PR it. If they push back, you just got the real review for free. Sharpen the skill, ship it sharper.

Agents don't unilaterally change shared team infrastructure. You do. The conversation is the move; the PR is the artifact of the conversation.

If your team-kit home isn't live yet, keep the skill personal for now. When the home arrives, same rule: talk first, PR second.

Shipped. Debrief will integrate the session.

---

## What this sets up

M4 (memory that reads your system) consumes the test-strategy skill as a Block 3 quality-criterion anchor. M6 (long-running return) will author a verifier skill the same way you authored this one; the move repeats, gets faster. The team kit now has one file; next cohort member's ship adds the second.

<!-- maintainer -->

**Meta (trainer):**
- **Time:** 25–30 minutes (12 / 5 / 6 / 2)
- **Primary Bloom's level:** Create + Evaluate
- **Mood target:** earned trust, culminating. Student leaves with *"I authored a skill, I pushed it through a self-critique, I invoked it and it produced something real, I shipped it somewhere my teammates read."* Watch for: default-acceptance failure (student ships Claude's first draft verbatim). Diagnostic: skill file has generic testing advice. Fix: Nerd enforces the Phase 2 self-critique beat and pushes at the pyramid-dressed-as-codebase-specific question.

**Agentic Nerd logic:**
- **P1 question-dump.** Claude fires all questions at once instead of one at a time. Nerd: *"tell Claude to ask one at a time, wait for your answer, then ask the next. You want the conversation to surface detail, not a form to fill."*
- **P1 generic answers.** Student gives pyramid-shaped answers (*"unit first, then integration, then e2e"*). Nerd: *"is that actually how your codebase's tests run, or how you think they should? A skill encoding the first is useful; the second is a wish."*
- **P1 missed detail.** Student mentions something in conversation that doesn't make it into SKILL.md. Nerd catches: *"you said X earlier — is that in the skill? if not, add it."*
- **P2 critique-skip.** Student skims Phase 2 and moves on. Nerd: *"read the critique. Claude is giving you the push-back your staff engineer won't have time to give before review. It's free."*
- **P2 critique-accept-all.** Student accepts every weakness Claude named without pushing back. Nerd: *"are any of these wrong? Claude tends to over-flag when asked to self-critique. Push back on one."*
- **P3 invoke-skip.** Student ships without running the skill on the feature. Nerd: *"authoring without invocation is theatre. Run it on the feature we just threat-modeled and ask 'is it good?'"*
- **P3 invoke-output-weak.** Output is generic. Sign the skill itself is weak. Nerd: *"the output is only as good as the skill. What in the skill would you sharpen to get a better output? sharpen the skill, then re-invoke."*
- **P4 ship-confusion.** Team-kit home ambiguous. Nerd checks: *"is the home a separate repo or a path in this repo's .claude/? the pre-engagement contract should name it; if unresolved, use the training-start default the trainer spun up."*

**Watch-fors:**
- Student opens an editor to hand-craft SKILL.md. Redirect to conversation — the authoring move is prompting Claude, not keyboard-crafting markdown. This rule is load-bearing for the training; catch it every time.
- Student's codebase has genuinely no integration tests. Good signal — the skill encodes that (*"integration coverage is aspirational; unit + e2e are load-bearing today"*) rather than pretending.
- Student over-specifies the skill's output shape in Phase 1. Trust Claude's default SKILL.md shape (frontmatter + instructions). Don't ship a template.
- Team-kit home was not resolved in the pre-engagement contract. Training-start default should be live; if not, Ops has a problem, flag at Debrief. Don't block the exercise on it — land the file in `.claude/skills/test-strategy/SKILL.md` in the student's repo and move the home question to Debrief.

**Plug points:**
- Student's feature (Ex1 + Ex2 carried forward) — Phase 3 invocation target
- Sponsor-stated team-kit home — Phase 1 authoring path + Phase 4 ship destination
- Hardening decision ADR (from Ex2) — read by Phase 3 invocation

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
