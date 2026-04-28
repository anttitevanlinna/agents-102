# Exercise: *Author* a security plugin

**What you do:**

Author one security plugin with two lenses. Install it. Invoke it once on a small target to confirm it loads. The artifact is yours; you carry it to every agent you build from here. Module 4's audit exercise picks the plugin up and runs it against the system you built in modules 2–3.

Three phases. Twenty-five minutes. The plugin is the artifact; the audit comes next.

A **plugin** packages an expertise (rules, checklists, the moves an agent runs) into something the agent can plug in and use. Until now you have shaped agents with prompts, files, and rules. The plugin is the next layer up: a small bundle the agent loads when the work matches. M4 is the canonical place plugin-authoring lands. Taught once, here.

**Phase 1. Dictate what matters (5 min).**

Reference material lives in `module-4/policies/` (your company's distilled policies, or the Nordic-baseline reference for self-study). You will not pre-read it. The plugin is supposed to carry your judgment, not generic GDPR. The way to make that true is to lead with what is in your head, then let Claude read the files.

Open a fresh session in your training directory.

Tell Claude what matters about your company's policies and the agent system you built in modules 2–3. Three to five lines, your own voice.

**Prompt** *(Claude Code)*

```
I am about to author a security plugin for the agent system I built in modules 2-3. Before you read anything, I will tell you what matters from my own head. Then you read the four reference files in module-4/policies/. Then you propose the plugin and I steer.

Here is what matters about my company and my system, in my own words:

(I will type 3-5 lines now.)

Wait for my lines before you read the policy files.
```

Type three to five lines. Specific. The kind of data your agent touches that would be a problem if it leaked. The rule your legal team cares about most. The customer your CEO would not want named in a transcript. The class of input you would not paste into a public model. Plain language; nothing rehearsed.

When you have typed your lines, Claude reads `module-4/policies/` and proposes the plugin shape. You read the proposal and push back on anything that sounds like a generic GDPR brochure rather than the agent system you actually built.

**Phase 2. Author both lenses (12 min).**

The plugin carries two lenses. One does policy. One does agent security. Each lens is a `SKILL.md` plus any reference files it needs; the manifest names them both.

Ask Claude to author the plugin with both lenses, and to enumerate the named attack classes the agent-security lens covers.

**Prompt** *(Claude Code)*

```
Author the plugin now. Two lenses, one plugin.

Lens 1 - POLICY. Rules drawn from the four files in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Access-control analysis plus a threat-modelling pass. The lens MUST cover these named attack classes by name, not as generic STRIDE categories:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do — for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- plugin supply-chain (the plugin itself, or any plugin the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each class, the lens produces one or two specific risks in the target system, ranked, with one suggested agentic mitigation per risk - scope, split, filter, gate, or review. Layered on top of classical controls (network, IAM, mTLS, perimeter), not replacing them. Name that explicitly in the lens's preamble.

Build the plugin: a manifest, one SKILL.md per lens, supporting reference files where useful. Keep each SKILL.md tight - invocation criteria, the rules or attack classes it applies, the report shape it produces. Show me the files before saving so I can push back on rule wording, missing attack classes, or report shape.
```

Read what Claude proposes. Push back where it is off. The four named attack classes are the forcing function. If any one is missing, ask for it. Sharpen the rule wording so it sounds like your company's policy, not a generic GDPR template. Tell Claude to make the report shape narrow enough that you will actually read it on Monday.

**Phase 3. Install and verify (8 min).**

The plugin is authored. Now install it in your runtime and confirm it loads. Plugins load at session start, not into the current session, so the verify step is a fresh session.

Cowork users follow the chat-button install. Desktop users follow the plugin loader. CLI users take a small extraction step. Same plugin, different install surface. Everyone syncs at the verify prompt below.

<div class="rt-cli">

The CLI does not auto-load plugin envelopes from `~/.claude/plugins/<plugin-name>/`. That directory is registry-managed by Claude Code itself. Standalone skills under `~/.claude/skills/<name>/SKILL.md` auto-load with zero install plumbing. So the CLI install is a one-step extraction: lift each lens's SKILL.md (and any reference files) out of the plugin's `skills/<lens>/` folder and copy them to `~/.claude/skills/`. The plugin manifest you authored is harmless leftover; you keep the plugin folder around as the canonical source of truth.

**Prompt** *(Claude Code)*

```
The plugin you just authored lives at the path you wrote. The CLI does not auto-load plugin envelopes, so install the two lenses as standalone CLI skills by copying:

- skills/policy/SKILL.md (and any reference files)  ->  ~/.claude/skills/security-audit-policy/SKILL.md
- skills/agent-security/SKILL.md (and any reference files)  ->  ~/.claude/skills/security-audit-agent-security/SKILL.md

The plugin folder stays where it is as the source of truth for the next time we revise the lenses. Confirm both skill paths back so I can verify with ls.
```

Run `ls ~/.claude/skills/security-audit-*/` to confirm both skills landed. Open a new session in your training directory. Skills load at session start.

</div>

<div class="rt-desktop">

**Prompt** *(Claude Code)*

```
Write the plugin files into a folder I can hand to the Claude Code Desktop plugin loader. Put the manifest at the folder root and the SKILL.md files under skills/<lens-name>/SKILL.md. Tell me the folder path when done.
```

Open the Claude Code Desktop plugin loader and point it at the folder Claude wrote. The loader picks the plugin up. Open a new session in the same training directory.

</div>

<div class="rt-cowork">

The Cowork install is the smoothest path. A *Save plugin* button appears in the chat after the plugin files render. Cowork users picked Cowork because terminal plumbing is friction; the install affordance is built into the chat surface.

After Phase 2's authoring prompt, Claude renders the plugin files in the chat. Look for the *Save plugin* button below the rendered files. It appears once Claude has finished writing all the files in one block. Click it. Cowork registers the plugin in your library.

If the *Save plugin* button does not appear, scroll up to confirm Claude finished writing all the files (manifest plus both SKILL.md files plus any reference files). If a file is missing, ask Claude to write it; the button shows up after the full bundle is on screen.

Once saved, open a new Cowork session connected to the same folder. The plugin is stored locally on your machine and tied to your Claude Desktop install. It loads automatically in any new Cowork session on the same laptop, no per-session import. Plugins load at session start, not into the current one.

</div>

In the new session, type `/` in the prompt and look for the two lenses in the autocomplete list. Cowork and Desktop show them namespaced under the plugin (`/security-audit:policy`, `/security-audit:agent-security`); CLI shows them flat because the install extracted the skills out of the envelope (`/security-audit-policy`, `/security-audit-agent-security`). Either form means the lenses loaded. Then run a single quick invocation on a known-trivial scope: one file, not the whole module-3 system. The point is to see one rule fire, not to do the audit.

**Prompt** *(Claude Code, fresh session)*

```
Apply the policy lens of the security plugin I authored to one file: module-2/challenge.md. Just that one file. Run two or three rules from the lens, produce two or three rows of the report shape, and stop. I am verifying the plugin loads and the report shape is right - this is not the real audit.
```

Read the two or three rows. The rule wording should sound like the lens you authored, not a generic check.

**The explicit slash-command form (also worth knowing).** Plain-language usually dispatches the right lens, but the slash command is the only invocation guaranteed to fire the exact one you mean:

```
/security-audit:policy run two or three rules on module-2/challenge.md and stop.
```

CLI users drop the colon (`/security-audit-policy ...`) because the extracted skills do not carry the plugin namespace.

**What happens:**

You authored a plugin with two lenses, named four attack classes the agent-security lens covers, installed it in your runtime, and watched it fire on one file. The plugin lives on disk now. Module 4's audit exercise picks it up and runs it against your full module-3 system.

**The point:**

The expert is not you reading every file by hand. The expert is the plugin, and you authored it. You fed it your judgment about what matters. You named the attack classes that an agent threat model in 2026 has to name. You layered agent mitigations on top of classical controls, not as a replacement for them. The plugin will travel.

**Time:** 25 minutes. Phase 1 ~5, Phase 2 ~12, Phase 3 ~8.

<!-- maintainer -->

**Quality:** sim-passed 2026-04-26 (curriculum-pre-ship-audit gate cleared APPROVE-WITH-TODOs; mechanical degraded on file touch — see TODOs)
- compendium-audited 2026-04-26 (check_writing, check_student_facing, check_prompts rules 1–11, check_pedagogy, check_strategy_tie_in — re-cleared via LLM-as-judge eval at audit-gate run, banned-word + link-format + voice + prompt-action-leadin all PASS)
- sim-passed 2026-04-26 (three-persona sim: mid-competent practitioner — recommend-with-reservations; opinionated senior — would-steer; fast operator — would-recommend; APPROVE-WITH-TODOs aggregate; LLM-as-judge eval also APPROVE-WITH-TODOs)
- ~~mechanical-tested 2026-04-26 (instances/bootstrap-m4-author-judge-report.md @ 13e3f8e PASS 32/32)~~ DEGRADED 2026-04-26 (Phase 3 install mechanism rewritten; previous mechanical run substituted skill invocation entirely, never exercised the actual install path — new CLI fork needs end-to-end mechanical coverage; runner pair `bootstrap-m4-author.verbatim.{actor,judge}.md` needs re-spec for skill-only install before re-run)

**Pre-ship-audit findings 2026-04-26 (resolved + standing):**
- ~~Phase 3 mood gate fails 8/10 under three-persona sim~~ — RESOLVED 2026-04-26 by restoring Phase 2 to its original framing (no "wrapping" pre-leak) AND reshaping CLI Phase 3 as *extraction* from the authored plugin (the manifest is kept as source of truth; SKILL.md files lifted into `~/.claude/skills/`). Plugin stays the default vocabulary across the body; CLI fork is now a small honest callout, not a bait-and-switch. Re-sim 2026-04-26 with rotated persona (solo self-study learner, fresh archetype): Phase 1 close 8, Phase 2 close 8.5, Phase 3 close 8, exercise close 8. Verdict: ship to first cohort.
- **Phase 1 dictation forcing function under speed** — STILL OPEN as a low-priority TODO. The fast-operator persona originally flagged that the Watch-for predicts the failure but doesn't prevent it. The re-sim's solo-learner had no time pressure and rated Phase 1 at 8 — so the gap is speed-specific. Optional fix next cycle: line-count gate inside the Phase 1 prompt (Claude refuses to proceed under N specifics).
- **Length** — STILL OPEN as polish, not blocking. ~960 words vs 400–700 target. Re-sim found Phase 3 reads tight enough to ship; trimming is polish-cycle work.
- **Mechanical re-run owed** — STILL OPEN, highest priority before first cohort delivery. Runner pair `bootstrap-m4-author.verbatim.{actor,judge}.md` needs re-spec for the extraction install path before re-run.

**Cohort-facilitator audit findings (2026-04-25, fixes 1–3 applied 2026-04-26):**
- ~~Phase 1 freeze case~~ — DONE. `module-4-prework.md` now opens with a "Before you arrive — five lines, in your own voice" subsection plus four example shapes; prework time bumped to 30–40 min to absorb the 5-min prep.
- ~~Tool-confusion needs an inline gloss~~ — DONE. Phase 2 prompt's tool-confusion line now carries two example shapes inline (production-database connector when test would do; email-send tool when the user only asked for a draft). Self-explanatory at projection distance.
- ~~Phase 3 runtime-fork sync sentence~~ — DONE. One line lands above the three `.rt-*` blocks pointing each runtime at its block and naming the verify prompt as the sync point.
- 90-min facilitator dry-run owed before first cohort. Specifically: Phase 3 install moment with one colleague on Cowork and one on CLI, plus one colleague playing the freezing-SVP for Phase 1. Surfaces the runtime-fork hazard and the freeze case at the same time.

**Mechanical-test findings 2026-04-26 (resolved + standing):**
- ~~Verify target `module-2/CLAUDE.md` may not exist on the student's disk~~ — DONE 2026-04-26. prompt-004-verify now targets `module-2/challenge.md`, which is on disk from M2 prework.
- **Cowork plugin install affordance** — capability check #1 still owed (Cowork *Save plugin* button reliability). Exercise text describes UI behaviour, no skill-by-name invocation, so no body fix needed; the verification is whether Cowork delivers the affordance the text describes.
- **Self-study dictation** — covered by `module-4-prework.md` "Before you arrive — five lines" subsection (with four shape examples). No additional example needed in the exercise body.

**Pairs with:** [Audit your agent](audit-your-agent.md) — Module 4's second exercise, runs the plugin authored here.

**Frameworks riffed on:**
- **Plugins as expertise injection** — taught once at M4, named in the prework reading.
- **Named attack classes** (prompt injection direct/indirect, secrets-in-context, tool-confusion, plugin supply-chain) — external grounding the AGENT-SECURITY lens MUST cover. Without the named list, the lens self-grades against a rubric Claude wrote, and the threat model collapses into taxonomy.
- **Layered controls** — classical perimeter (firewalls, RBAC, mTLS, IAM, WAF) is the floor; agent mitigations (scope, split, filter, gate, review) are new surfaces above it. The Cowork-mode security-skeptic sim 2026-04-25 caught the "not firewalls" rhetorical foil and forced this reframe.

**Plug points:**
- Customer-policy reference content under `module-4/policies/` (Antti distils from customer policies; default Nordic-baseline for self-study) — input the student reads while Claude proposes the plugin in Phase 1.
- The student's "what matters" lines in Phase 1 — participant-typed, never prescribed. Three to five lines in their voice.

**Capability checks (status as of 2026-04-26 — verified by live execution, not docs):**
1. **Per-runtime authoring + install.** Cowork *Save plugin* button appears reliably after the file bundle renders ✓ (Antti-confirmed). Desktop plugin loader picks up the authored folder; new session inside the same Desktop app suffices, no app restart ✓ (Antti-confirmed). CLI: standalone skills written to `~/.claude/skills/<name>/SKILL.md` auto-load in the next session ✓ (live-tested 2026-04-26 — wrote `~/.claude/skills/cli-test-skill/SKILL.md`, invoked `/cli-test-skill` from `claude --print`, response landed). Plugin envelopes are NOT a CLI install path — the CLI's plugin loader is registry-mediated (`installed_plugins.json` + `enabledPlugins`), and `~/.claude/plugins/<name>/` direct-folder-write does NOT auto-load (live-tested and falsified 2026-04-26).
2. **Invocation paths.** CLI: `/<skill-name>` (no namespace; e.g. `/security-audit-policy`). Desktop and Cowork: `/<plugin>:<skill>` (namespaced; e.g. `/security-audit:policy`). Plain-language usually dispatches; the slash form is the only invocation guaranteed to fire the exact lens. There is no `/skill use <name>` fallback (corrected from a prior docs-based assumption).
3. **Loaded visibility.** Same `/` autocomplete surface across runtimes; the names that appear depend on wrapping (flat skill names on CLI; namespaced plugin:skill on Desktop/Cowork). No system message announces load — autocomplete is the cue.
4. **Footguns to coach in delivery.** (a) Plugin re-edits do not hot-reload in Cowork — student must re-save and reopen; CLI students re-edit the SKILL.md and the next session picks it up automatically. (b) Skill name collisions across plugins resolve silently to last-loaded; relevant once the student ships a second plugin or skill.

**Watch-fors:**
- **Phase 1 dictation collapses into pre-reading.** Student opens the policy files first because skipping the read feels wrong. Coach: *"The plugin carries your judgment. Reading the files first dilutes the judgment with the file's vocabulary. Trust your three lines; Claude reads the files for you."*
- **One attack class missing from Phase 2's plugin.** Most likely: indirect prompt injection (the lens covers direct prompt injection only) or plugin supply-chain (omitted because the student is authoring the only plugin so far). Coach: *"Ask Claude to add the missing class by name. The four are the forcing function."*
- **Cowork *Save plugin* button does not appear.** Most common cause: Claude wrote the files across multiple turns, not one bundle. Coach: *"Ask Claude to render the full bundle in one message. The button shows up once the bundle is complete."*
- **Verify step expanded into the audit.** Student runs the verify prompt against the whole module-3 system. Coach: *"Verify is one file, two or three rows. The audit comes next exercise. Stop after you see the plugin name in the session."*
- **Plugin sounds like a generic GDPR brochure.** Phase 1 dictation lines were too thin — *"we have customer data, follow GDPR"*. Coach: *"Three to five lines, specific. The customer your CEO would not want named. The class of input you would not paste into a public model. Plain."*

**Why 25 minutes, not 20:**
- Phase 2 is the substantive forcing function; the named-attack-class enumeration takes Claude two or three turns to get right (the first draft usually omits indirect prompt injection or blurs supply-chain into "plugin trust"). Twenty minutes ships a plugin that runs but misses a class.
- Phase 1 dictation needs five real minutes — typing three to five specific lines is harder than it looks. Compressed to two minutes, the lines come out generic and Phase 2's plugin reads like Phase 1 was skipped.
- Phase 3's fresh session opens are the runtime-mechanical cliffs (Cowork *Save plugin*, CLI `~/.claude/plugins/`). Eight minutes covers install + verify with room for one runtime stumble.
