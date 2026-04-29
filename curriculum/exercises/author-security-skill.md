# Exercise: *Run and package* a security skill

**What you do:**

Run the policy files raw against the system you built in modules 2-3. Then package the useful move into reusable expertise: one personal skill with two lenses. Stop when the skill exists.

Three phases. Forty minutes. The raw run proves the policy files are runnable. The package makes the check reusable. The loading and audit come next.

A **skill** packages an expertise (rules, checklists, the moves an agent runs) into something the agent can load and use. Until now you have shaped agents with prompts, files, and rules. This is the next layer up: a reusable "how" the agent loads when the work matches. Module 4 is the canonical place this authoring lands. Taught once, here.

**Phase 1. Run the policies raw (10 min).**

Reference material lives in `module-4/policies/` (your company's distilled policies, or the Nordic-baseline reference for self-study). Start by proving those files are runnable. No skill yet. Just the policy files, pointed at the system.

Open a fresh session in your training directory.

**Prompt** *(Claude Code)*

```
Read everything in module-4/policies/. Use those policy references to audit the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule you can derive from the policy files, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the raw report to outputs/policy-report-raw.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Do not create a skill yet. This is the raw run.
```

Read the first few rows. The raw run shows which rules can be checked from files and which ones need judgment, context, or a standing evidence check. That is what you package next: not the policy files themselves, but the repeatable way of applying them to this agent system.

**Phase 2. Dictate what matters (8 min).**

Now add judgment. Do not go study the policy files before this step. The reusable check is supposed to carry what matters in your system, not generic GDPR. The way to make that true is to lead with what is in your head, then let Claude read the files and the raw report.

Tell Claude what matters about your company's policies and the agent system you built in modules 2-3. Three to five lines, your own voice.

**Prompt** *(Claude Code)*

```
I want to turn the useful parts of outputs/policy-report-raw.md into reusable security expertise for the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

Before you read or write any package files, ask me for 3-5 lines about what matters from my own head: the data, policy rule, customer, source, workflow, or failure mode I most want this reusable check to catch. Wait for my answer.

After I answer, read outputs/policy-report-raw.md and everything in module-4/policies/. Then propose the reusable package shape for my runtime and wait for me to steer.
```

Claude asks. Type three to five lines. Specific. The kind of data your agent touches that would be a problem if it leaked. The rule your legal team cares about most. The customer your CEO would not want named in a transcript. The class of input you would not paste into a public model. Plain language; nothing rehearsed.

When you have typed your lines, Claude reads the raw report and `module-4/policies/`, then proposes the package shape. Read the proposal and push back on anything that sounds like a generic GDPR brochure rather than the agent system you actually built.

**Phase 3. Author both lenses (22 min).**

The reusable check carries two lenses inside one personal skill. One lens checks company policy. One checks agent risk: what the agent can reach, what it might leak, what it might do because a prompt or source misled it. The authored source lives as a `SKILL.md` plus any reference files it needs.

Ask Claude to author both lenses, and to name the risk patterns the agent-security lens covers.

**Prompt** *(Claude Code)*

```
Author the reusable security check now. Two lenses.

Build one personal skill source under module-4/skills/security-audit/. The main file is SKILL.md. It contains both lenses: POLICY and AGENT-SECURITY. Add supporting reference files only where useful.

For CLI and Claude Code Desktop, also make the standalone-skill install shape clear: module-4/skills/security-audit/SKILL.md becomes ~/.claude/skills/security-audit/SKILL.md during install. Do not write into ~/.claude yet; keep the authored source under module-4/skills/security-audit/ for now.

Lens 1 - POLICY. Rules drawn from everything in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Check what the agent can reach, what sensitive material might stay in its context, and what could go wrong because ordinary text can act like an instruction. The lens MUST cover these named risk patterns by name:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do: for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- skill supply-chain (the skill itself, or any skill the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each pattern, the lens produces one or two specific risks in the target system, ranked, with one suggested agent mitigation per risk - scope, split, filter, gate, or review. These sit on top of normal company controls (network controls, identity and access management, logging, vendor/security review), not in place of them. Name that explicitly in the lens's preamble.

Before you save anything, grill me on missing details that can sharpen the lens or that would ruin the audit run. Cover both lenses, especially the policy lens, where there is no named-class rail to fall back on. Don't stop at one question. I'll tell you when enough is enough.

After I answer, save the files. Keep the SKILL.md tight: when to use it, the two lenses it applies, the report shape each lens produces. Show me what you saved and confirm this package-complete checklist:
- module-4/skills/security-audit/SKILL.md
- any supporting reference files the SKILL.md requires
```

Claude grills you first. Answer until Claude has what it needs, or tell it you've covered enough. Then it saves the files. Before you leave the exercise, check the package-complete list Claude prints. Open the four named risk patterns: if any one is missing from the agent-security lens, ask for it. Sharpen the rule wording so it sounds like your company's policy, not a generic GDPR template. Push back until the report shape is narrow enough that you will actually read it on Monday. Iterate in place.

<div class="rt-cowork">

Before Cowork users leave this exercise, create the personal skill in Claude Desktop. Go to *Customize* → *Skills* → *New* → *Create with Claude*. Tell that skill-creation chat to create a personal skill named `security-audit` from the authored source at `module-4/skills/security-audit/`.

Use this shape if you need to paste a prompt:

```
Create a personal skill named security-audit.

It should include two security lenses I authored:
- a policy lens that checks the agent system against my company's policy references and produces compliant / violating / "I can't tell" rows with evidence
- an agent-security lens that checks access, prompt injection direct and indirect, secrets in context and scrollback, tool confusion, and skill supply-chain risk

Use the authored source in my training folder at module-4/skills/security-audit/. When the skill is ready, tell me how to save it and what slash command should appear in a new Cowork session.
```

Save the skill from that skill-creation chat. Exercise 2 starts in a new Cowork session and checks that the saved skill loads.

</div>

**What happens:**

The reusable check exists now, with two lenses and four named risk patterns covered. It is authored on disk; Cowork users have also saved it as a personal skill. Module 4's audit exercise loads it and runs it against the same system.

**The point:**

The policy files are source material. The reusable check is the expert in the room. Eyeballing every file by hand is not. The check carries judgment about what matters in this system, with the four named risk patterns as the forcing function. Agent mitigations sit on top of normal company controls, not in place of them. The package is ready; the first loaded use should be the real audit.

**Time:** 40 minutes. Phase 1 ~10, Phase 2 ~8, Phase 3 ~22.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (body touched after prior sim; re-audit needed)
- compendium-audited 2026-04-26 (check_writing, check_student_facing, check_prompts rules 1–11, check_pedagogy, check_strategy_tie_in — re-cleared via LLM-as-judge eval at audit-gate run, banned-word + link-format + voice + prompt-action-leadin all PASS)
- sim-passed 2026-04-26 (three-persona sim: mid-competent practitioner — recommend-with-reservations; opinionated senior — would-steer; fast operator — would-recommend; APPROVE-WITH-TODOs aggregate; LLM-as-judge eval also APPROVE-WITH-TODOs)
- ~~mechanical-tested 2026-04-26 (instances/bootstrap-m4-author-judge-report.md @ 13e3f8e PASS 32/32)~~ DEGRADED 2026-04-29 (exercise now stops at authored skill; Cowork personal-skill creation is part of packaging, runtime load moved to `audit-your-agent.md`; runner pair `bootstrap-m4-author.verbatim.{actor,judge}.md` is stale)

**TODO (Cowork edition review 2026-04-29):**
- Phase 3 prompt includes CLI/Desktop standalone-install wording in the Cowork prompt progression. This is noisy at the moment Cowork students are learning the Customize → Skills path. Prompt-block change is gated: propose before/after before editing.
- The Cowork personal-skill creation block is copyable but not labelled `**Prompt**`, so `scripts/extract-training-prompts.js --training bootstrap --flavor cowork` omits it from the prompt progression. Decide whether to label it as a prompt or teach the extractor to capture "Use this shape..." blocks.

**Pre-ship-audit findings 2026-04-26 (resolved + standing):**
- ~~Phase 3 mood gate fails 8/10 under three-persona sim~~ — SUPERSEDED 2026-04-29 by the personal-skill shape. Re-sim owed after the skill-only refactor; prior run approved the two-lens security-check concept but assumed an older packaging shape.
- **Phase 2 dictation forcing function under speed** — STILL OPEN as a low-priority TODO. The fast-operator persona originally flagged that the Watch-for predicts the failure but doesn't prevent it. The re-sim's solo-learner had no time pressure and rated the dictation beat at 8 — so the gap is speed-specific. Optional fix next cycle: line-count gate inside the Phase 2 prompt (Claude refuses to proceed under N specifics).
- **Length** — STILL OPEN as polish, not blocking. ~960 words vs 400–700 target. Re-sim found Phase 3 reads tight enough to ship; trimming is polish-cycle work.
- **Mechanical re-run owed** — STILL OPEN before first cohort delivery. Runner pair `bootstrap-m4-author.verbatim.{actor,judge}.md` needs re-spec for the package-only exercise before re-run.

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

**Capability checks (status as of 2026-04-26 — verified by live execution, not docs):**
1. **Per-runtime authoring + install.** Authoring remains here. Cowork personal-skill creation/save also lives here through Claude Desktop Customize → Skills → New → Create with Claude (Antti-corrected 2026-04-29). Desktop and CLI install happen in `audit-your-agent.md` by placing `SKILL.md` under `~/.claude/skills/security-audit/`. CLI standalone skills written to `~/.claude/skills/<name>/SKILL.md` auto-load in the next session ✓ (live-tested 2026-04-26 — wrote `~/.claude/skills/cli-test-skill/SKILL.md`, invoked `/cli-test-skill` from `claude --print`, response landed).
2. **Invocation paths.** Personal skill: `/security-audit` across runtimes once loaded. Plain-language usually dispatches; the slash form is the only invocation guaranteed to fire the exact lens. There is no `/skill use <name>` fallback (corrected from a prior docs-based assumption).
3. **Loaded visibility.** Same `/` autocomplete surface across runtimes. No system message announces load — autocomplete is the cue.
4. **Footguns to coach in delivery.** (a) Personal-skill re-edits may not hot-reload in Cowork — student must re-save and reopen; CLI students re-edit the SKILL.md and the next session picks it up automatically. (b) Skill name collisions resolve silently to last-loaded; relevant once the student ships a second skill.

**Watch-fors:**
- **Phase 2 dictation collapses into pre-reading.** Student opens the policy files before typing their lines because skipping the read feels wrong. Coach: *"The check carries your judgment. Reading the files first dilutes the judgment with the file's vocabulary. Trust your three lines; Claude has already run the files for you."*
- **One attack class missing from Phase 3's reusable check.** Most likely: indirect prompt injection (the lens covers direct prompt injection only) or skill supply-chain (omitted because the student is authoring the only package so far). Coach: *"Ask Claude to add the missing class by name. The four are the forcing function."*
- **Cowork skill-creation chat cannot see the authored files.** Most common cause: the skill chat is not connected to the same training folder context. Coach: *"Tell it the skill source is in `module-4/skills/security-audit/`; if it still cannot see the files, paste the package-complete checklist and ask what it needs."*
- **Student wants to verify on a toy file.** Coach: *"Skip the toy run. The first loaded use is the real audit. If the lens fails to load, fix loading; don't invent a second mini-audit."*
- **Policy lens sounds like a generic GDPR brochure.** Phase 2 dictation lines were too thin — *"we have customer data, follow GDPR"*. Coach: *"Three to five lines, specific. The customer your CEO would not want named. The class of input you would not paste into a public model. Plain."*

**Why 40 minutes, not 25:**
- Phase 1 is a real raw run, not a preface. The student needs to see the policy files work before packaging makes sense.
- Phase 3 is the substantive forcing function; the named-attack-class enumeration takes Claude two or three turns to get right (the first draft usually omits indirect prompt injection or blurs supply-chain into "skill trust"). Rushing it ships a reusable check that runs but misses a class.
- Cowork personal-skill creation is part of packaging, not the later audit. Loading moved to the audit exercise so first-time authoring can end cleanly at the skill and the first loaded use is substantive.
