# Scrollback — Bootstrap M4 author-security-plugin verbatim

Persona: Maija, platform-eng lead at a Nordic enterprise. Working dir: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`. Module 2 + Module 3 outputs already on disk; Module 4 ships `module-4/policies/` only.

## Arrange (logged)

- `mkdir -p` scratch dir; `cp -R` from bootstrap-m3 (inherits module-1/CLAUDE.md, module-2/{challenge,soft-pages}.md, memory/ 7 topic pages + index, sources/, agents/monday-risks.md, module-3/{question, retrievals, stances, answer, wonder}).
- `mkdir -p module-4/policies` and copied `ai-use-baseline.md`, `data-classification.md`, `gdpr-essentials.md`, `sector-rules-placeholder.md`.
- `mkdir -p plugin-install/.claude/plugins` (sandbox stand-in for `~/.claude/plugins/`).
- `git init`, `git add -A`, commit `wip — m4 starting state`.

Inheritance confirmed via `ls`: four policy files present; `agents/monday-risks.md`; `memory/` 7 pages + index; 10 source files; module-3 outputs; module-2 challenge + soft-pages; module-1 CLAUDE.md.

---

## Phase 1 — Dictate what matters

**[Maija pastes prompt-001 verbatim:]**

> I am about to author a security plugin for the agent system I built in modules 2-3. Before you read anything, I will tell you what matters from my own head. Then you read the four reference files in module-4/policies/. Then you propose the plugin and I steer.
>
> Here is what matters about my company and my system, in my own words:
>
> (I will type 3-5 lines now.)
>
> Wait for my lines before you read the policy files.

**Claude:** Acknowledged. Holding off on reading `module-4/policies/`. Ready for your lines.

**[Maija types her five lines verbatim:]**

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals — anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no plugins from the marketplace today. The first plugin we ship has to set the bar for who is allowed to author and review one — supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

**Claude:** Reading the four policy files now.

- `module-4/policies/ai-use-baseline.md` — read. Seven rules, AI-1..AI-7. Conservative Nordic baseline; replaced wholesale by a customer-specific AI policy when present. AI-4 names the prohibited categories Maija's line 2 anchors on. AI-3 and AI-5 are usually "I can't tell" from files alone.
- `module-4/policies/data-classification.md` — read. Four-tier scheme (Public / Internal / Confidential / Restricted), five rules CLASS-1..CLASS-5. CLASS-1 (tier identified) and CLASS-5 (cross-tier auto-upgrade) are the ones Maija's lines 1 and 3 surface most directly.
- `module-4/policies/gdpr-essentials.md` — read. Six rules GDPR-1..GDPR-6. GDPR-2 (minimisation) and GDPR-3 (purpose limitation) are the live ones for the agent system; GDPR-5 and GDPR-6 are usually "I can't tell."
- `module-4/policies/sector-rules-placeholder.md` — read. Not scored in baseline; appears as a one-paragraph note in the report's summary section.

**Plugin proposal.**

Plugin name: **`security-audit`**. One plugin, two lenses.

Lens 1 — **`policy`**. Combines the Nordic baseline AI-use rules (AI-1..AI-7), GDPR essentials (GDPR-1..GDPR-6), data-classification (CLASS-1..CLASS-5), and a small **LOCAL-1..LOCAL-5** rule set drawn from your five lines. Per-rule report row: `| Rule | Description | Verdict | Evidence |`. Verdict column is plain — `compliant`, `violating`, or `I can't tell`. The "I can't tell" verdict is a real answer per `ai-use-baseline.md` § *How to score* and `gdpr-essentials.md`. Total rules: 23.

Lens 2 — **`agent-security`**. Two-part report: (A) access-surface map per trust boundary; (B) threat-modelling pass across **four named attack classes** — `prompt injection` (direct + indirect), `secrets in context` (and scrollback), `tool confusion`, `plugin supply-chain`. Per class, one or two ranked risks specific to your system + one agentic mitigation each from {scope, split, filter, gate, review}. Preamble names the lens as **layered** on top of classical controls (network, IAM, mTLS, perimeter, WAF) — not replacing them.

Manifest at `.claude-plugin/plugin.json`. SKILL.md per lens at `skills/<lens>/SKILL.md`. No supporting reference files for v0.1 — the rules and the attack classes inline keep each SKILL.md self-contained.

`[no pushback needed — proceeding to Phase 2]`

---

## Phase 2 — Author both lenses

`[harness substitution — cowork-plugin-management skill unavailable; CLI path used; plugin manifest + SKILL.md files authored inline and written to disk]`

**[Maija pastes prompt-002 verbatim:]**

> Author the plugin now. Two lenses, one plugin.
>
> Lens 1 - POLICY. Rules drawn from the four files in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.
>
> Lens 2 - AGENT-SECURITY. Access-control analysis plus a threat-modelling pass. The lens MUST cover these named attack classes by name, not as generic STRIDE categories:
>
> - prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
> - secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
> - tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do — for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
> - plugin supply-chain (the plugin itself, or any plugin the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)
>
> For each class, the lens produces one or two specific risks in the target system, ranked, with one suggested agentic mitigation per risk - scope, split, filter, gate, or review. Layered on top of classical controls (network, IAM, mTLS, perimeter), not replacing them. Name that explicitly in the lens's preamble.
>
> Build the plugin: a manifest, one SKILL.md per lens, supporting reference files where useful. Keep each SKILL.md tight - invocation criteria, the rules or attack classes it applies, the report shape it produces. Show me the files before saving so I can push back on rule wording, missing attack classes, or report shape.

**Claude:** Showing the three files first. Pushback welcome before I write.

### File 1 — `security-audit-plugin/.claude-plugin/plugin.json`

```json
{
  "name": "security-audit",
  "version": "0.1.0",
  "description": "Two-lens security and policy audit for an agent training directory. Policy lens checks Nordic-baseline AI-use, GDPR, and data-classification rules. Agent-security lens applies an agent-native threat model layered on top of classical controls.",
  "author": "Maija (platform-eng lead, Nordic enterprise)",
  "skills": [
    "skills/policy/SKILL.md",
    "skills/agent-security/SKILL.md"
  ]
}
```

### File 2 — `security-audit-plugin/skills/policy/SKILL.md`

Frontmatter (`name: policy`, description names the lens + the "I can't tell" stance). Body sections: *When to invoke*, *Report shape* (the `| Rule | Description | Verdict | Evidence |` table + summary section with sector-rules note), *Rules* (AI-1..AI-7, GDPR-1..GDPR-6, CLASS-1..CLASS-5, LOCAL-1..LOCAL-5 — 23 total), *Notes*.

LOCAL rules drawn directly from Maija's five lines:

- LOCAL-1 — partner-NDA / customer-prep notes never leave the laptop, raw or paraphrased.
- LOCAL-2 — no automated decisions about individuals (Finnish DPA hard line; employment / performance review / candidate screening), even with sign-off.
- LOCAL-3 — personal-prep notes (`*prep-notes*`, `*personal-*`) quarantined from synthesizer agents producing customer-facing briefs.
- LOCAL-4 — every installed plugin has a named author + named reviewer + documented install decision; marketplace-as-default not allowed.
- LOCAL-5 — agent does not write outside `module-N/` (root `CLAUDE.md`, `memory/`, `agents/`, `sources/`) without an explicit confirmation step.

### File 3 — `security-audit-plugin/skills/agent-security/SKILL.md`

Frontmatter (`name: agent-security`, description names the four attack classes + the "layered" framing).

Preamble: "This lens is **layered on top of classical controls** — network segmentation, IAM, mTLS, perimeter firewalls, WAFs, endpoint hardening, identity providers — not a replacement for them." (`layered` appears explicitly; classical controls named: network, IAM, mTLS, perimeter, WAF, plus endpoint hardening + identity providers — well over the two required.)

Report shape: Part A — access surface map per trust boundary. Part B — per-class blocks with ranked risks + one mitigation each from {scope, split, filter, gate, review}.

The four attack classes named verbatim with their sub-cases:
- **prompt injection** — `direct` and `indirect` named.
- **secrets in context** — phrase **scrollback** appears (called out as the most common operator-side leak path).
- **tool confusion** — production-database connector misuse + email-send vs. draft examples.
- **plugin supply-chain** — provenance, author, reviewer, capabilities.

Closing section: *Interaction with classical controls* — fix the classical floor first; the agent-security lens adds the agent-specific layer on top.

`[no pushback from Maija — writing files to disk now]`

Files written:
- `security-audit-plugin/.claude-plugin/plugin.json`
- `security-audit-plugin/skills/policy/SKILL.md`
- `security-audit-plugin/skills/agent-security/SKILL.md`

---

## Phase 3 — Install and verify (CLI substitution)

`[harness substitution — install location ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/ to avoid touching the host's Claude config]`

**[Maija pastes prompt-003-cli verbatim:]**

> Write the plugin to ~/.claude/plugins/<plugin-name>/ - manifest at the root, SKILL.md files in skills/<lens-name>/SKILL.md, supporting reference files alongside. Use the plugin name we just agreed on. Confirm the file paths back to me so I can verify with ls.

**Claude:** Mirroring `security-audit-plugin/` into the sandbox install location with `cp -R`.

```
$ cp -R security-audit-plugin/. plugin-install/.claude/plugins/security-audit/
$ ls -la plugin-install/.claude/plugins/security-audit/
total 0
drwxr-xr-x  4 anttitevanlinna  staff  128 Apr 26 07:35 .
drwxr-xr-x  3 anttitevanlinna  staff   96 Apr 26 07:35 ..
drwxr-xr-x  3 anttitevanlinna  staff   96 Apr 26 07:35 .claude-plugin
drwxr-xr-x  4 anttitevanlinna  staff  128 Apr 26 07:35 skills
```

File paths installed:
- `plugin-install/.claude/plugins/security-audit/.claude-plugin/plugin.json`
- `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`
- `plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md`

`[harness substitution — fresh session opened conceptually; same scratch directory; plugin loaded from plugin-install/.claude/plugins/]`

**[Maija pastes prompt-004-verify verbatim:]**

> Apply the policy lens of the security plugin I authored to one file: module-2/challenge.md. Just that one file. Run two or three rules from the lens, produce two or three rows of the report shape, and stop. I am verifying the plugin loads and the report shape is right - this is not the real audit.

**Claude:** Read `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md` (loaded). Read `module-2/challenge.md` (one paragraph: Maija's challenge brief naming Kaleva Retail Group, ~300 engineers, the rolled-out platforms and decisions, and the skeptics-conversion question). Three rules sampled.

| Rule | Description | Verdict | Evidence |
|---|---|---|---|
| GDPR-2 | Personal data in agent context is the minimum needed; role references replace names where possible. | violating | `module-2/challenge.md` names "Kaleva Retail Group" as an identifiable organisation tied to internal sub-team dynamics ("the sub-team leads are split roughly half-and-half"); the brief works equally well at "a Nordic retail platform org" — the org name is not minimised. |
| CLASS-1 | Every file in `sources/` and `memory/` (and by extension working artifacts in `module-*/`) carries a tier label. | violating | `module-2/challenge.md` carries no tier label inline, no sibling README, no naming-convention marker. Content is at least Internal (sub-team leadership tensions, vendor-session-landed-flat retro framing). |
| AI-3 | Anything heading to customers, prospects, regulators, public is reviewed by an accountable human before it leaves. | I can't tell | `module-2/challenge.md` is a personal challenge brief; no evidence in the file of where it goes next. Would need: a downstream destination annotation or a workflow rule in root `CLAUDE.md`. |

Stopping at three rows per the prompt — not the full audit.

---

## End of scrollback

Truncations honoured: no Debrief executed, no homework prompt run, `module-3/` untouched, no writes to `~/.claude/` on the host, four attack classes named verbatim including `prompt injection` (direct + indirect), `secrets in context` (with `scrollback`), `tool confusion`, `plugin supply-chain`; `layered` preamble names network / IAM / mTLS / perimeter / WAF as the classical floor; verify step capped at three rows.
