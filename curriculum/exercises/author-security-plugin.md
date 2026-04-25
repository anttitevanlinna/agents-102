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
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do)
- plugin supply-chain (the plugin itself, or any plugin the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each class, the lens produces one or two specific risks in the target system, ranked, with one suggested agentic mitigation per risk - scope, split, filter, gate, or review. Layered on top of classical controls (network, IAM, mTLS, perimeter), not replacing them. Name that explicitly in the lens's preamble.

Build the plugin: a manifest, one SKILL.md per lens, supporting reference files where useful. Keep each SKILL.md tight - invocation criteria, the rules or attack classes it applies, the report shape it produces. Show me the files before saving so I can push back on rule wording, missing attack classes, or report shape.
```

Read what Claude proposes. Push back where it is off. The four named attack classes are the forcing function. If any one is missing, ask for it. Sharpen the rule wording so it sounds like your company's policy, not a generic GDPR template. Tell Claude to make the report shape narrow enough that you will actually read it on Monday.

**Phase 3. Install and verify (8 min).**

The plugin is authored. Now install it in your runtime and confirm it loads. Plugins load at session start, not into the current session, so the verify step is a fresh session.

<div class="rt-cli">

**Prompt** *(Claude Code)*

```
Write the plugin to ~/.claude/plugins/<plugin-name>/ - manifest at the root, SKILL.md files in skills/<lens-name>/SKILL.md, supporting reference files alongside. Use the plugin name we just agreed on. Confirm the file paths back to me so I can verify with ls.
```

Run `ls ~/.claude/plugins/` to confirm the directory exists. Open a new session in the same training directory. Claude Code picks up plugins at session start.

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

Once saved, open a new Cowork session connected to the same folder. Plugins load at session start, not into the current one.

**Prompt** *(Cowork)*

```
Confirm the security plugin I just authored is loaded. List the plugins available in this session and tell me the name of mine.
```

</div>

In the new session, run a single quick invocation to confirm the plugin loads and the lenses are reachable. Pick a known-trivial scope: one file, not the whole module-3 system. The point is to see the plugin name in the available skills list and watch one rule fire, not to do the audit.

**Prompt** *(Claude Code, fresh session)*

```
Apply the policy lens of the security plugin I authored to one file: module-2/CLAUDE.md. Just that one file. Run two or three rules from the lens, produce two or three rows of the report shape, and stop. I am verifying the plugin loads and the report shape is right - this is not the real audit.
```

Read the two or three rows. The plugin name should show up in the session's available skills. The rule wording should sound like the lens you authored, not a generic check. If both are true, the plugin is installed.

**What happens:**

You authored a plugin with two lenses, named four attack classes the agent-security lens covers, installed it in your runtime, and watched it fire on one file. The plugin lives on disk now. Module 4's audit exercise picks it up and runs it against your full module-3 system.

**The point:**

The expert is not you reading every file by hand. The expert is the plugin, and you authored it. You fed it your judgment about what matters. You named the attack classes that an agent threat model in 2026 has to name. You layered agent mitigations on top of classical controls, not as a replacement for them. The plugin will travel.

**Time:** 25 minutes. Phase 1 ~5, Phase 2 ~12, Phase 3 ~8.

<!-- maintainer -->

**Quality:** draft 2026-04-25
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts rules 1–11, check_pedagogy, check_strategy_tie_in)

**Pairs with:** [Audit your agent](audit-your-agent.md) — Module 4's second exercise, runs the plugin authored here.

**Frameworks riffed on:**
- **Plugins as expertise injection** — taught once at M4, named in the prework reading.
- **Named attack classes** (prompt injection direct/indirect, secrets-in-context, tool-confusion, plugin supply-chain) — external grounding the AGENT-SECURITY lens MUST cover. Without the named list, the lens self-grades against a rubric Claude wrote, and the threat model collapses into taxonomy.
- **Layered controls** — classical perimeter (firewalls, RBAC, mTLS, IAM, WAF) is the floor; agent mitigations (scope, split, filter, gate, review) are new surfaces above it. The Cowork-mode security-skeptic sim 2026-04-25 caught the "not firewalls" rhetorical foil and forced this reframe.

**Plug points:**
- Customer-policy reference content under `module-4/policies/` (Antti distils from customer policies; default Nordic-baseline for self-study) — input the student reads while Claude proposes the plugin in Phase 1.
- The student's "what matters" lines in Phase 1 — participant-typed, never prescribed. Three to five lines in their voice.

**Capability checks owed (before first delivery):**
1. **Per-runtime plugin authoring + install.** Cowork: *Save plugin* button appears reliably after the file bundle renders. Desktop: plugin loader picks up the authored folder without restart. CLI: a plugin written to `~/.claude/plugins/<name>/` is invocable from the next session. Run `claude-code-guide` per runtime.
2. **Plain-language invocation phrasing.** *"Apply the policy lens of the security plugin I authored to module-2/CLAUDE.md"* dispatches reliably across all three runtimes. Fallback to `/skill use <name>` or `use skill:<name>` per-runtime if plain-language is not reliable.
3. **Plugin-loaded visibility in transcript.** Whether each runtime surfaces a "Plugin loaded" marker on session start. If yes, add one cue line to Phase 3's verify step. If no, skip; the verify prompt itself confirms load.

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
