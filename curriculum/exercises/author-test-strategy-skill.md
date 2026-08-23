# Author your test-strategy skill

**Time:** 20 minutes.

**Window:** the side quest window (*m3-quality*). All phases run here.

**What you do:** author a test-strategy skill for your codebase through conversation with Claude, not by typing markdown.

**What you build:** one SKILL.md tuned to how your codebase actually tests, living in your personal skills folder.

**The point:** test strategy authored generically is a pyramid diagram.

> **Quick timebox note.** Authoring conversations spiral here. Keep it tight: one author pass, one self-critique, one invocation, ship.

---

## Phase 1: Author the skill through conversation

*12 min*

- Skills aren't hand-crafted; they're authored through conversation. You describe your codebase; the agent drafts the SKILL.md. You are not typing markdown into an editor.
- The ship destination is your personal skills folder. `~/.claude/skills/test-strategy/SKILL.md`, auto-discovered in every session you run, across every repo.
- A test-strategy skill is team-shaped by nature, but it ships personal first. It encodes codebase conventions teammates share. The reasons for personal-first land in Phase 3; the team PR is a follow-up move that starts with a human conversation.

Ask Claude to author the skill, asking one question at a time.

{{prompt:author-test-strategy-skill-1}}

## Answer from how your codebase really tests

- Answer each question from how your codebase actually tests, not how a diagram says it should. *"Jest for units, Playwright for e2e, nothing for integration"* is the shape of answer the skill needs. Pyramid-shaped answers (*"unit first, then integration, then e2e"*) encode a wish, not your codebase.
- Push back when Claude offers a default you don't like. *"No, we don't mock the database; integration tests run against a real Postgres in Docker."* The push-back is where the skill gets its codebase truth.

## Phase 2: Invoke the skill on this codebase

*6 min*

- Authoring without invocation is theatre. The skill proves itself only when it runs on real code.
- The skill is auto-discovered right here, and this worktree holds the full codebase. Invoke it on the code as it stands in front of you.
- The agent reads the codebase; you read the strategy it produced and the grade it gave itself, and whether either one reads generic.

Ask Claude to invoke the skill on this codebase and grade what it produced in the same turn.

{{prompt:author-test-strategy-skill-2}}

## Sharpen the skill from what came back

- Before you ship, ask the skill itself to name its own weakest part: the assumption most likely wrong for this codebase, or what a teammate would push back on first. Push back on what it names; don't settle for reassurance.
- The grade is biased by design. Claude invoked the skill it just helped author, then graded the result in the same context window: same-window self-charity. One paste, one wait, one read, convenient over rigorous.
- Want a harsher read of the output too? Run it as two prompts. Invoke first, read the output, then a second prompt: *"Read that output as if you'd never seen the SKILL.md. Does it fit this codebase, or does it read generic?"* Either approach is fine.
- If the strategy reads generic, sharpen the skill, not the output. A weak output is usually a weak skill. Sharpen the SKILL.md, then re-invoke.
- Then decide: one re-invoke, or ship with a TODO. Re-invoke if the sharpen was substantive. Otherwise ship with a one-line TODO at the top naming what's unresolved. A skill that names its own gap is more useful to a teammate than one that pretends it's finished. The authoring muscle is what Module 3 installs.

## Phase 3: Ship the skill personal-first

*2 min*

- The skill is already shipped. The agent wrote it in Phase 1 and your push-back sharpened it during Phase 2's invoke-and-critique. There is no separate install step. That's the ship.

## Decide if it graduates to the team

- A strong candidate for a team PR, after you talk to the team. A test-strategy skill encodes conventions teammates share: framework, mocking policy, integration boundary, flakiness patterns. Accurate for you, accurate for them.
- The team PR starts with a conversation, not a commit. Show it to your staff engineer over coffee. Send it to the channel. Ask two teammates who'd use it whether it matches how they actually write tests on this codebase. Say yes, and you PR it. Push back, and you got the real review for free; sharpen the skill, ship it sharper.
- Agents don't unilaterally change shared team infrastructure. You do.
- Personal stays a fine final home. Not every skill graduates to a shared kit. The test: would teammates use it as-written, and does the skill carry enough codebase truth to survive their review.

**What happened:** One SKILL.md tuned to your codebase's actual testing conventions (framework, mocking policy, integration boundary, flakiness patterns, regression scope), living in your personal skills folder. Shipped. The module's close sharpens it from what the invocation showed.

## What this sets up

- Module 4 reads this skill as part of the system you have: it walks a real task against everything you've built, and the test-strategy skill is the quality-criterion anchor in that walk.
- Your personal skills folder now holds one file you authored from session evidence. Promotion to a team home is the conversation you start over coffee, not the move you make here.

**Note** The side-quest worktree may still hold changes the agent made here: code, tests, scratch files. Its copy of `CLAUDE.local.md` came over at the fork and may have drifted from the one in your main repo. The skill crossed back on its own (it lives at user scope); everything else stays in the worktree. Those changes are yours to handle later: keep them, carry the useful parts to your main repo, or delete the worktree.

<!-- maintainer -->

**Install mechanic is stated once.** The ship-destination bullet is the canonical statement of the skill's home and auto-discovery; the backing block cites it as `personal-skills-folder-auto-discovered`, so it must stay verbatim. Do not restate the install path anywhere else in body. Install paths and the team-kit route are canonical in `training-architecture.md` § Skills, which is a planning artefact and not a student page, so the pointer lives here and not in body.

**View summary:** You author a test-strategy skill through conversation, challenge its weakest assumption, and invoke it against the real codebase before keeping it. The artifact is a reusable skill shaped by the way this repository actually tests, not by a generic pyramid.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain across all slides; kept bold: none (no named-move or menu handles in body); widget/label chrome (**Time:**/**Window:**/**What you do:**/**What you build:**/**The point:**/**What happened:**/**Note**) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Quality:** compendium-audited 2026-08-23 (writing@12148d77 story@12148d77 technical@7fb973dd behavior@1c765f2 pedagogy@7fb973dd strategy@1c765f2 slides@39466781)
- judges @12148d77: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Meta (trainer):**
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
- **P3 ship-confusion.** Team-kit home ambiguous. Trainer checks: *"the skill ships to your personal `~/.claude/skills/test-strategy/SKILL.md` (Claude wrote it there in Phase 1). That's the ship for today. The team-PR move is a separate human conversation later, after teammates have weighed in."*

**Accept-with-mitigation (`check_pedagogy.md` §56):** no dedicated push-back move for a skipped self-critique ask. The body line above ("ask the skill itself to name its own weakest part...") is the fix; not every miss needs a trainer catch too.

**Watch-fors:**
- Student opens an editor to hand-craft SKILL.md. Redirect to conversation — the authoring move is prompting Claude, not keyboard-crafting markdown. This rule is load-bearing for the training; catch it every time.
- Student's codebase has genuinely no integration tests. Good signal — the skill encodes that (*"integration coverage is aspirational; unit + e2e are load-bearing today"*) rather than pretending.
- Student over-specifies the skill's output shape in Phase 1. Trust Claude's default SKILL.md shape (frontmatter + instructions). Don't ship a template.
- Team-kit home unresolved. That's fine; the skill ships to personal `~/.claude/skills/test-strategy/SKILL.md` regardless. Personal-first is the through-line (matches M1's `CLAUDE.local.md`). Promotion to a team home is a later human conversation. If the cohort spontaneously decides on an org-level home, trainer logs the decision in the cohort overrides log.

**Plug points:**
- This codebase/repository in the m3-quality worktree — Phase 2 invocation target (the worktree holds the full repo; no cross-window artifact needed)
- The codebase's test framework / mocking policy / CI gate convention — Phase 1 authoring conversation surfaces these as the codebase-specific encoding the skill ships

<!-- backing -->

Claims
- `skills-are-authored-through-conversation` · vision · "Skills aren't hand-crafted; they're authored through conversation." ← none-owed
- `you-are-not-typing-markdown` · vision · "You describe your codebase; the agent drafts the SKILL.md." ← none-owed
- `personal-skills-folder-auto-discovered` · detail · "`~/.claude/skills/test-strategy/SKILL.md`, auto-discovered in every session you run, across every repo" ← cc-skills-user-scope
- `team-shaped-but-ships-personal-first` · vision · "A test-strategy skill is team-shaped by nature, but it ships personal first." ← none-owed
- `generic-test-strategy-is-a-pyramid-diagram` · vision · "test strategy authored generically is a pyramid diagram." ← none-owed
- `hardened-by-critique-and-invocation` · vision · "one author pass, one self-critique, one invocation, ship" ← none-owed

Sources
- cc-skills-user-scope `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [capability] Skills at `~/.claude/skills/<name>/SKILL.md` are discovered in every session regardless of working directory. **The load-bearing platform claim of the M3 side-quest design** — the skill is authored in the quality worktree and has to appear in the security lane without the student moving a file, so if user-scope discovery changes, the two-window shape goes with it. Same stamp carries `open-the-side-quest.md`; re-test both together. fallback: have the student invoke from the lane that authored it.

Frameworks
- Test pyramid · [borrow:software testing] · law:none · ← cultural-vocab — named once, as the thing generic authoring produces and this exercise avoids
- Good regulator · [borrow:cybernetics] · law:good-regulator · ← cultural-vocab — a skill tuned to this codebase is a model of the system it regulates
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — memory to skill, the third rung

Stance `[stance:2026-08-01 level:L1]`
- holds: that conversational authoring beats hand-writing a skill file, and that codebase-specific beats generic. The first is a claim about how to use the tool and rests on the room doing it; the second is close to tautological and is the reason the exercise exists.
- contested: nothing evidential. The exposure is entirely capability: one docs page carries the whole two-window design.
- would-move-it: user-scope skill discovery changing shape, or authoring affordances moving. Neither touches the teaching, both strand instructions.

OODA
- question: do user-scope skills still auto-discover across repos, and has the authoring flow changed?
- roster: the Claude Code skills docs and changelog
- last-run: 2026-08-01

<!-- /backing -->
