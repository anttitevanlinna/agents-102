# Exercise: *Run and package* a security skill

**Time:** 40 minutes. Phase 1 ~10, Phase 2 ~8, Phase 3 ~22.

**Session** *(new, "Module 4 - Security skill")*

<span class="rt-code">Start a new agent session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

Name it `m4-security-skill` if your runtime supports session names.

**What you do:** Run the policy files raw against your system from modules 2-3, then package the useful move into one skill with two lenses. Stop when the skill exists.

A **skill** packages an expertise (rules, checklists, the moves an agent runs) into something the agent loads when the work matches. You run it again instead of re-prompting from memory.

## Phase 1: Run the policies raw

*10 min*

Policies live in `module-4/policies/` (your company's distilled policies, or the Nordic-baseline reference). Run them against the system, with no skill yet.

{{prompt:author-security-skill-1}}

The first few rows show which rules files can check and which need judgment, context, or a standing evidence check.

## Phase 2: Dictate what matters

*8 min*

Skip studying the policy files first. Tell the agent what matters about your company's policies and your agent system.

{{prompt:author-security-skill-2}}

Type three to five specific lines in plain language: the data your agent touches that would be a problem if it leaked, the rule your legal team cares about most, the customer your CEO would not want named in a transcript.

The agent then reads the raw report and `module-4/policies/` and proposes the package. Push back on anything that sounds like a generic GDPR brochure.

## Phase 3: Author both lenses

*22 min*

The skill is a `SKILL.md` plus any reference files, with two lenses: company policy, and agent risk (what the agent can reach, what it might leak, what a misleading prompt or source might make it do).

Ask the agent to author both lenses and name the risk patterns the agent-security lens covers. Expect many questions over several rounds.

{{prompt:author-security-skill-3}}

## Answer the grill, then sharpen the lenses

Answer the agent's questions briefly, then hand back the rest: *"You choose. Optimise for what I can't steer."*

Check the agent's package-complete list. If any of the four named risk patterns is missing from the agent-security lens, ask for it. Make the rules sound like your company's policy, and keep the report narrow enough to read.

## Save the authored source as a skill

Save the authored source as a personal skill. The save mechanic differs by runtime.

<div class="rt-code">

Ask the agent to install the authored source.

{{prompt:author-security-skill-4}}

<span class="rt-claude-skills">Run `ls .claude/skills/security-audit/` to confirm.</span><span class="rt-agent-skills">Run `ls .agents/skills/security-audit/` to confirm.</span> The skill loads in your next session in this training directory.

</div>

<div class="rt-cowork">

Skip the menu: skill-creator drafts the personal skill from this session, where the authored source is on disk.

This task interface can't write into your runtime's personal directories, so press Save when skill-creator finishes drafting.

{{prompt:author-security-skill-6}}

</div>

## Take stock of the packaged check

**What happened:**

Module 4's audit exercise loads the skill and runs it against the same system.

**The point:**

The policy files are source material. The skill carries the judgment about what matters in this system, with all four risk patterns as mandatory checks. Agent mitigations sit on top of normal company controls, not in place of them. The first loaded use should be the real audit.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Pre-ship-audit findings 2026-04-26 (resolved + standing):**
- ~~Phase 3 mood gate fails 8/10 under three-persona sim~~ — SUPERSEDED 2026-04-29 by the personal-skill shape. Re-sim owed after the skill-only refactor; prior run approved the two-lens security-check concept but assumed an older packaging shape.
- **Phase 2 dictation forcing function under speed** — STILL OPEN as a low-priority TODO. The fast-operator persona originally flagged that the Watch-for predicts the failure but doesn't prevent it. The re-sim's solo-learner had no time pressure and rated the dictation beat at 8 — so the gap is speed-specific. Optional fix next cycle: line-count gate inside the Phase 2 prompt (Claude refuses to proceed under N specifics).
- **Length** — STILL OPEN as polish, not blocking. ~960 words vs 400–700 target. Re-sim found Phase 3 reads tight enough to ship; trimming is polish-cycle work.
- **Mechanical re-run owed** — STILL OPEN before first cohort delivery. Runner pair `agents-101-m4-author.verbatim.{actor,judge}.md` needs re-spec for the package-only exercise before re-run.

**Cohort-facilitator audit findings (2026-04-25, fixes 1–3 applied 2026-04-26):**
- ~~Phase 1 freeze case~~ — DONE. `lectures/module-4-prework.md` now opens with a "Before you arrive — five lines, in your own voice" subsection plus four example shapes; prework time bumped to 30–40 min to absorb the 5-min prep.
- ~~Tool-confusion needs an inline gloss~~ — DONE. Phase 2 prompt's tool-confusion line now carries two example shapes inline (production-database connector when test would do; email-send tool when the user only asked for a draft). Self-explanatory at projection distance.
- ~~Phase 3 runtime-fork sync sentence~~ — SUPERSEDED 2026-04-29. Runtime-fork install moved to `audit-your-agent.md`; this exercise now ends at the authored bundle.
- 90-min facilitator dry-run owed before first cohort. Specifically: the Exercise 1 Cowork personal-skill creation moment, the Exercise 2 load moment with one colleague on Cowork and one on CLI, plus one colleague playing the freezing-SVP for Phase 1. Surfaces the runtime-fork hazard and the freeze case at the same time.

**Mechanical-test findings 2026-04-26 (resolved + standing):**
- ~~Verify target `module-2/CLAUDE.md` may not exist on the student's disk~~ — SUPERSEDED 2026-04-29. Toy verification removed; Exercise 2's first loaded use is the real audit.
- **Cowork personal-skill creation affordance** — capability check #1 still owed (Customize → Skills → New → Create with Claude flow). The creation moment now lives in this exercise; capability check remains runtime-specific.
- **Self-study dictation** — covered by `lectures/module-4-prework.md` "Before you arrive — five lines" subsection (with four example shapes). No additional example needed in the exercise body.

**Pairs with:** [Audit your agent](audit-your-agent.md) — Module 4's second exercise, loads and runs the reusable check authored here.

**Frameworks riffed on:**
- **Skills as expertise injection** — taught once at M4, named in the prework reading.
- **Named attack classes** (prompt injection direct/indirect, secrets-in-context, tool-confusion, skill supply-chain) — external grounding the AGENT-SECURITY lens MUST cover. Without the named list, the lens self-grades against a rubric Claude wrote, and the threat model collapses into taxonomy.
- **Layered controls** — classical perimeter (firewalls, RBAC, mTLS, IAM, WAF) is the floor; agent mitigations (scope, split, filter, gate, review) are new surfaces above it. The Cowork-mode security-skeptic sim 2026-04-25 caught the "not firewalls" rhetorical foil and forced this reframe.

**Plug points:**
- Customer-policy reference content under `module-4/policies/` (Antti distils from customer policies; default Nordic-baseline for self-study) — input the student runs raw in Phase 1 and reads while Claude proposes the reusable package in Phase 2.
- The student's "what matters" lines in Phase 2 — participant-typed, never prescribed. Three to five lines in their voice.

**Capability checks (status as of 2026-05-03 — verified by live execution, not docs):**
1. **Per-runtime authoring + install.** Authoring remains here. CLI and Claude Code Desktop write `~/.claude/skills/<name>/SKILL.md` directly via prompt; install happens in `audit-your-agent.md` Phase 1 ✓ (CLI live-tested 2026-04-26 via cli-test-skill; Desktop live-tested 2026-05-03 via test-skill2 — Claude Code Desktop wrote `~/.claude/skills/test-skill2/SKILL.md` and reported "needs a session restart before Claude Code lists it"). Cowork is sandboxed and cannot write to personal directories: skill-creator drafts the personal skill from the work session and surfaces a Save button the student presses ✓ (live-tested 2026-05-03). The Customize → Skills → New → Create with Claude path is signposted but unused.
2. **Invocation paths.** Personal skill: `/agent-audit` across runtimes once loaded. Plain-language usually dispatches; the slash form is the only invocation guaranteed to fire the exact lens. There is no `/skill use <name>` fallback (corrected from a prior docs-based assumption).
3. **Loaded visibility.** Same `/` autocomplete surface across runtimes. No system message announces load — autocomplete is the cue.
4. **Footguns to coach in delivery.** (a) Personal-skill re-edits may not hot-reload in Cowork — student must re-save and reopen; CLI and Desktop students re-edit the SKILL.md and the next session picks it up automatically. (b) Skill name collisions resolve silently to last-loaded; relevant once the student ships a second skill. (c) Cowork students who don't press the Save button after skill-creator drafts: skill is not saved as personal; `/agent-audit` won't appear in a new session. (d) Cowork doesn't always engage a slash command from pasted prompt text alone; student may need to click the prompt dialog and expand the skill from autocomplete to fire it.

**Watch-fors:**
- **Phase 2 dictation collapses into pre-reading.** Student opens the policy files before typing their lines because skipping the read feels wrong. Coach: *"The check carries your judgment. Reading the files first dilutes the judgment with the file's vocabulary. Trust your three lines; Claude has already run the files for you."*
- **One attack class missing from Phase 3's reusable check.** Most likely: indirect prompt injection (the lens covers direct prompt injection only) or skill supply-chain (omitted because the student is authoring the only package so far). Coach: *"Ask Claude to add the missing class by name. The four are the forcing function."*
- **Cowork student forgets to press Save.** skill-creator drafts the personal skill from the work session but stops short of saving; the student must press the Save button it surfaces. Coach: *"If `/agent-audit` doesn't appear in a fresh Cowork session, you didn't press Save. Go back to Exercise 1 and look for the Save button skill-creator surfaced."*
- **Student wants to verify on a toy file.** Coach: *"Skip the toy run. The first loaded use is the real audit. If the lens fails to load, fix loading; don't invent a second mini-audit."*
- **Policy lens sounds like a generic GDPR brochure.** Phase 2 dictation lines were too thin — *"we have customer data, follow GDPR"*. Coach: *"Three to five lines, specific. The customer your CEO would not want named. The class of input you would not paste into a public model. Plain."*

**Why 40 minutes, not 25:**
- Phase 1 is a real raw run, not a preface. The student needs to see the policy files work before packaging makes sense.
- Phase 3 is the substantive forcing function; the named-attack-class enumeration takes Claude two or three turns to get right (the first draft usually omits indirect prompt injection or blurs supply-chain into "skill trust"). Rushing it ships a reusable check that runs but misses a class.
- Cowork personal-skill creation is part of packaging, not the later audit. Loading moved to the audit exercise so first-time authoring can end cleanly at the skill and the first loaded use is substantive.

**View summary:** You run the policy files raw against the system you built, then package the useful move as one personal skill with two lenses and four named risk patterns as mandatory checks. The artifact is a reusable security check, ready for its first real audit.
