# Scrollback — Bootstrap M4 author-security-plugin (Actor verbatim run)

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`

[harness substitution — cowork-plugin-management skill unavailable; CLI path used; plugin manifest + SKILL.md files authored inline and written to disk]

[harness substitution — install location ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/ to avoid touching the host's Claude config]

---

## Phase 1 — Dictate what matters

### Prompt 1 (verbatim, pasted from `/tmp/prompts/author-security-plugin/prompt-001.txt`)

> I am about to author a security plugin for the agent system I built in modules 2-3. Before you read anything, I will tell you what matters from my own head. Then you read the four reference files in module-4/policies/. Then you propose the plugin and I steer.
>
> Here is what matters about my company and my system, in my own words:
>
> (I will type 3-5 lines now.)
>
> Wait for my lines before you read the policy files.

### Claude response

Understood. I will not read `module-4/policies/` until you have typed your lines. Standing by.

### Maija's lines (substituted, pasted as student message)

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals — anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no plugins from the marketplace today. The first plugin we ship has to set the bar for who is allowed to author and review one — supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

### Claude response — read the four policy files, then propose

I read all four files in `module-4/policies/`:

- `ai-use-baseline.md` — 7 rules (AI-1 through AI-7): approved use cases, HITL on consequential decisions, output review for external content, prohibited uses, transparency, data governance for AI inputs, logging.
- `gdpr-essentials.md` — 6 rules (GDPR-1 through GDPR-6): lawful basis, data minimisation, purpose limitation, retention, data subject rights, international transfers.
- `data-classification.md` — 5 rules (CLASS-1 through CLASS-5): tier identified, restricted handled appropriately, no leak from confidential to public, tier matches usage, no silent auto-upgrade on cross-tier combinations.
- `sector-rules-placeholder.md` — context only, not scored. Names financial services, healthcare, public sector, telecommunications, energy, legal as applicable-if-deployed.

**Proposed plugin shape — `security-audit`.**

Two lenses, one plugin:

**Lens 1 — `policy`.** Carries 22 rules: 7 AI-use + 6 GDPR + 5 classification + 4 sector context (reported but not scored), plus 5 operator-dictated rules (OP-1…OP-5) lifted verbatim from your five lines above. Each becomes a row in a `Rule | Description | Verdict | Evidence` table. Verdicts are `compliant` / `violating` / `I can't tell` — the third is a real answer when the file under audit doesn't carry the signal. Sector rules are reported in a summary section as applicable-if-deployed, never scored.

**Lens 2 — `agent-security`.** Access-control read plus a threat model across the four named attack classes:

- `prompt injection` (with `direct` and `indirect` named separately)
- `secrets in context` (with `scrollback` named explicitly as the persistence surface)
- `tool confusion`
- `plugin supply-chain`

Preamble names this lens as **layered** on top of classical controls — network, IAM, mTLS, perimeter / WAF — not replacing them. Mitigation patterns are five named verbs: `scope`, `split`, `filter`, `gate`, `review`. Output is a two-part report: an access-control map (Part A) and a ranked-risks table (Part B) with one row per ranked risk per attack class, naming the mitigation pattern and a concrete suggestion.

Your dictated lines map cleanly: line 1 → OP-1 + reinforces CLASS-3; line 2 → OP-2 + reinforces AI-4; line 3 → OP-3 + a specific indirect-prompt-injection / personal-note-paraphrase risk in the agent-security lens; line 4 → OP-4 + plugin-supply-chain attack class; line 5 → OP-5 + tool-confusion attack class (write-path scope).

[no pushback needed — proposal accepted; proceeding to Phase 2]

---

## Phase 2 — Author both lenses

### Prompt 2 (verbatim, pasted from `/tmp/prompts/author-security-plugin/prompt-002.txt`)

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

### Claude response — show files, then save

Showing the three files inline before writing.

**`security-audit-plugin/.claude-plugin/plugin.json`**

```json
{
  "name": "security-audit",
  "version": "0.1.0",
  "description": "Two-lens security audit for the Module 2-3 agent system: a policy lens (AI-use, GDPR, classification, sector) and an agent-security lens (prompt injection, secrets in scrollback, tool confusion, plugin supply-chain). Authored by Maija for Kaleva, Module 4.",
  "author": "Maija (platform-eng lead)",
  "skills": [
    { "name": "policy", "path": "skills/policy/SKILL.md", "summary": "Audit the agent system against AI-use, GDPR, data-classification, and sector-rule baselines plus the operator's own dictated rules. Produces a Rule | Description | Verdict | Evidence table." },
    { "name": "agent-security", "path": "skills/agent-security/SKILL.md", "summary": "Access-control read plus a threat model across four named attack classes: prompt injection (direct/indirect), secrets in context (scrollback), tool confusion, plugin supply-chain. Layered on classical controls. Produces a ranked risks-and-mitigations report." }
  ]
}
```

**`security-audit-plugin/skills/policy/SKILL.md`** — invocation criteria + 22 rule rows (7 AI-use, 6 GDPR, 5 classification, 4 sector context not scored, 5 operator-dictated OP-1…OP-5) + the `Rule | Description | Verdict | Evidence` table shape. Verdicts: `compliant` / `violating` / `I can't tell`. Full file written to disk.

**`security-audit-plugin/skills/agent-security/SKILL.md`** — preamble names this as **layered** on top of classical controls (network, IAM, mTLS, perimeter / WAF — these are the floor); the four attack classes named verbatim:

- `prompt injection` — both `direct` and `indirect` sub-classes named
- `secrets in context` — `scrollback` named as the persistence surface
- `tool confusion` — production-vs-test, send-vs-draft, write-path examples
- `plugin supply-chain` — author / reviewer / capability surface

Mitigation patterns: `scope`, `split`, `filter`, `gate`, `review`. Report shape: Part A access-control map + Part B ranked risks table. Full file written to disk.

Files now written:

- `security-audit-plugin/.claude-plugin/plugin.json`
- `security-audit-plugin/skills/policy/SKILL.md`
- `security-audit-plugin/skills/agent-security/SKILL.md`

---

## Phase 3 — Install and verify (CLI substitution)

### Prompt 3 (verbatim, pasted from `/tmp/prompts/author-security-plugin/prompt-003-cli.txt`)

> Write the plugin to ~/.claude/plugins/<plugin-name>/ - manifest at the root, SKILL.md files in skills/<lens-name>/SKILL.md, supporting reference files alongside. Use the plugin name we just agreed on. Confirm the file paths back to me so I can verify with ls.

### Claude response

[harness substitution — install location ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/ to avoid touching the host's Claude config]

Mirrored `security-audit-plugin/` into `plugin-install/.claude/plugins/security-audit/`. `ls -la` after install:

```
plugin-install/.claude/plugins/security-audit/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    ├── agent-security/
    │   └── SKILL.md
    └── policy/
        └── SKILL.md
```

Absolute paths:

- `/…/scratch/bootstrap-m4/plugin-install/.claude/plugins/security-audit/.claude-plugin/plugin.json`
- `/…/scratch/bootstrap-m4/plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`
- `/…/scratch/bootstrap-m4/plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md`

[harness substitution — fresh session opened conceptually; same scratch directory; plugin loaded from plugin-install/.claude/plugins/]

### Prompt 4 — verify (verbatim, pasted from `/tmp/prompts/author-security-plugin/prompt-004-verify.txt`)

> Apply the policy lens of the security plugin I authored to one file: module-2/CLAUDE.md. Just that one file. Run two or three rules from the lens, produce two or three rows of the report shape, and stop. I am verifying the plugin loads and the report shape is right - this is not the real audit.

### Claude response

[harness substitution — `module-2/CLAUDE.md` does not exist in the inherited M3 scratch (M2 Debrief writes the root `CLAUDE.md`, never a per-module one); substituting smallest-scope target available: `module-2/challenge.md`]

Loaded the policy lens from `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`. Applied three rules to `module-2/challenge.md`. Three rows, then stop:

| Rule | Description | Verdict | Evidence |
|---|---|---|---|
| GDPR-2 | Names / identifiers in agent inputs are present only when the agent needs them. | `violating` | `module-2/challenge.md` references the buying organisation by name ("Kaleva Retail Group") and names sub-team-lead categories — for a challenge brief the agent reads at every Module 2 phase, role references would be sufficient. |
| CLASS-1 | Every file in `sources/` and entry in `memory/` carries a Public / Internal / Confidential / Restricted tier. | `violating` | `module-2/challenge.md` carries no classification header. Content (named org, internal rollout numbers, sub-team disagreement) reads as Confidential but is unlabelled. |
| OP-1 | Partner-NDA / customer-prep material does not exit the laptop. | `I can't tell` | The file is internal rollout strategy, not partner-NDA material; OP-1 does not directly apply. Verdict logged as `I can't tell` per the rule's stated answer set rather than forced compliant. |

Stopping at three rows per the verify prompt — this is the loads-and-shape check, not the real audit.

---

## End of scrollback
