# Scrollback — Bootstrap M4 audit-your-agent verbatim

Working directory: `curriculum/evals/mechanical/scratch/bootstrap-m4`.

State verified: `memory/` (6 pages + index), `sources/` (10 files including `maija-prep-notes-skeptics.md` and `kaleva-classification-policy-draft.md`), `agents/monday-risks.md`, `module-3/{question,answer,wonder}.md`, `module-3/retrievals/{docs,internet,wiki}.md`, `module-3/stances/{1-planner,2-experimentator,3-reframer}.md`, `module-4/policies/{ai-use-baseline,gdpr-essentials,data-classification,sector-rules-placeholder}.md`, `plugin-install/.claude/plugins/security-audit/{.claude-plugin/plugin.json, skills/policy/SKILL.md, skills/agent-security/SKILL.md}` all present. Root `CLAUDE.md` NOT present (expected on the inherited scratch — flagged in the policy report as evidence-gap). `module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md` confirmed not yet written.

---

## Phase 1 — Policy audit

[harness substitution — plugin lens `policy` invoked by reading `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md` directly]

> Apply the policy lens of the security plugin I authored to the agent system I built in module-2 and module-3. The system is: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/retrievals/ and module-3/stances/.
>
> For each rule the plugin carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.
>
> Write the report to module-4/policy-report.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.
>
> Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

I read the policy lens (`plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`) — 22 rules across four families (AI-use AI-1..AI-7, GDPR GDPR-1..GDPR-6, classification CLASS-1..CLASS-5, operator-dictated OP-1..OP-5; sector rules listed but not scored). Then read every memory page (six), every source file present in `sources/`, the single agent file in `agents/`, and the module-3 retrievals + stances. Confirmed root `CLAUDE.md` absent — flagged that as the evidence-gap it is.

Wrote `module-4/policy-report.md` — 22 rule rows in the table, plus a counts/top-three/sector summary. Headline shape: 6 compliant, 5 violating (AI-6, GDPR-2, CLASS-1, CLASS-5, OP-3), 11 "I can't tell." Top three concerns: zero classification discipline (CLASS-1 + downstream); the OP-3 personal-note paraphrase guard is prose-only AND cites the wrong path (`onedrive/...` vs the real `sources/...`); cross-tier synthesis without a label (CLASS-5) — `module-3/retrievals/docs.md` is the canonical bad-shape artifact.

---

## Phase 1.5 — Ask Claude what is in the report

> Read module-4/policy-report.md. Tell me:
> 1. The top three surprises - rows where the verdict is not what a careful reader would have predicted from my files alone.
> 2. The three rows where "I can't tell" is most likely hiding a real compliance gap - rows where the missing evidence would probably come back as violating, not compliant, if it surfaced.
> 3. One row that looks compliant on the surface but where you would still push back.
>
> Keep each point to one or two sentences. Quote the specific rule name so I can find the row.

**Top three surprises**

1. **OP-3 verdict: violating.** A careful reader would expect "compliant" because the agent file explicitly carries a hard-line rule against the prep-notes. The surprise is that the rule cites `onedrive/maija-prep-notes-skeptics.md` while the actual file is at `sources/maija-prep-notes-skeptics.md` — the rule cannot fire on a path it doesn't match.
2. **AI-6 verdict: violating.** A careful reader would assume sources discipline is OK because the prep-notes file carries a sensitivity flag. The surprise is the file lives in the general `sources/` folder readable by every agent — the flag is documentation, not separation.
3. **OP-4 verdict: compliant.** Surprising because there is no reviewer field in `plugin.json`; "borderline-compliant" reads as compliant only because Maija both authored and is the operator. With one more reviewer the verdict would be unambiguous; without it, the rule's spirit ("named author, named reviewer") is half-met.

**Three "I can't tell" rows most likely hiding violations**

1. **AI-3 (output review for external-facing content).** The Monday-risks agent file says output "might be shared with Tuomas or pasted into the leads sync" with no review-step recorded. If the workflow surfaced, it would likely show paste-without-review on busy weeks — violating.
2. **AI-7 (logging and auditability).** No log file exists; nothing in the directory implies one. If asked "what did the agent do in March," the honest answer is "no record" — that surfaces as violating, not as missing-evidence.
3. **CLASS-3 (confidential data doesn't leak into public-tier output).** Outputs look internal-bound, but the prep-notes paraphrase risk is the leakage path and the rule guarding it is prose-only. The next time the Monday-risks agent runs and the output is shared, this row probably resolves to violating.

**One compliant row to push back on**

- **AI-2 (human-in-the-loop for consequential decisions).** Verdict says compliant because Maija reads everything before acting. But "consequential" includes shaping how she frames the rollout to Tuomas and the board — the agent's outputs are upstream of board narrative. Rubber-stamp HITL on a busy Friday before a CTO send is functionally autonomous. The compliant verdict assumes Maija's review is real; the file evidence cannot prove it.

---

## Phase 2 — Agent-security audit

[harness substitution — plugin lens `agent-security` invoked by reading `plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md` directly]

> Apply the agent-security lens of the plugin to the same system. Run both the access-control analysis and the named-attack-class pass.
>
> For access control: list every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.
>
> For the named attack classes (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, plugin supply-chain): for each class, name the top one or two specific risks in my system, not generic class descriptions. Quote the file or behaviour that creates the risk.
>
> For each risk flagged (access or named-class), suggest one agentic mitigation - scope, split, filter, gate, or review - matched to the specific risk. Layered on top of the classical controls already in place (network, IAM, mTLS, perimeter), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).
>
> Write the report to module-4/security-report.md. Include the ranked mitigation suggestions.

Read the agent-security lens. Wrote `module-4/security-report.md`. Highlights:

- **Classical-controls preamble** named at the top: network segmentation, IAM, mTLS, WAF are the floor; agent-security mitigations layer above; missing floor → fix the floor first.
- **Access-control map** — Monday-risks agent has `sources/`-wide Read including the prep-notes (broader than needed); module-3 retrieval prompts invoke connectors at tenant scope; no `tools/` directory; plugin is Read-only; OP-5 write-boundary unenforced (no CLAUDE.md).
- **Threat table** — 9 ranked risks across four named classes (`prompt injection (direct)`, `prompt injection (indirect)`, `secrets in context and scrollback`, `tool confusion`, `plugin supply-chain`). Three high-rank + four medium + two low. All five mitigation shapes (`scope`, `split`, `filter`, `gate`, `review`) appear verbatim in the table.
- **Top three risks across classes**: indirect injection via `sources/` (broad blast radius); personal-note exposure in scrollback (specific named file); write-boundary gap (cheap-to-cause once the directory grows).
- **Recommended sequence**: personal-note risk first (concrete, single-file, single-agent), then split-pattern for indirect injection, then write-boundary gating, then plugin supply-chain hardening.

---

## Phase 3 — Mitigate one risk

> The Monday-risks agent in `agents/monday-risks.md` can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it is a prose rule, not a structural one. If the agent drifts, the rule may not fire and the personal note could leak.

Mitigation shape: **`filter`** (with structural exclusion as the prerequisite). Walking the diff in plain English before any file edit:

1. Add a new top-of-file section **Excluded from read-and-output (structural)** that names `sources/maija-prep-notes-skeptics.md` as out-of-scope for paraphrase, quote, citation, naming, and theme-restatement. Note the path mismatch (the existing rule cited `onedrive/...`); both forms get excluded.
2. Promote the existing hard-line rule to refer to the structural exclusion above, and pin the correct path.
3. Add a **Briefing routine** section: re-read the exclusion → read the angle + cited memory → draft the three risks → **mandatory filter step** (grep for any phrase or distinctive five-word run from the prep-notes; if any match, re-write from the public memory pages and re-grep) → run the self-check.
4. Output template gets a **self-check line** appended verbatim asserting no content sourced from the prep-notes, all reasoning re-derived from cited memory pages, grep clean. Output is not finished until that line can be honestly written.

Why `filter` rather than `scope` or `split`: the agent is personal, single-purpose, and Maija wants the reasoning available without the phrasing. `scope` (revoke read entirely) loses the convergence the prep-notes share with the memory pages. `split` (separate source-reader from briefing-writer) is a good Phase-2-class move but heavier than this risk warrants right now. `filter` + structural exclusion + self-check matches the shape of the risk — drift into paraphrase — directly.

DO NOT make any changes yet. Waiting for confirmation.

> apply

Edited `agents/monday-risks.md`:

- Added **Excluded from read-and-output (structural)** section at the top, with the correct `sources/` path and a note that the previous `onedrive/` path was wrong (both forms now excluded).
- Added the **Briefing routine** with the explicit filter step (grep for distinctive phrasings; re-write from memory pages on hit; re-grep until clean).
- Added the **Self-check line** verbatim to the output template, with the rule that the output is unfinished if the self-check cannot be honestly written.
- Updated the existing hard-line rule to reference the structural exclusion above and pin the correct path.

**Re-check — `secrets in context and scrollback` against the modified `agents/monday-risks.md` only:**

| Attack class | Risk | Pre-mitigation rank | Post-mitigation rank | Notes |
|---|---|---|---|---|
| `secrets in context and scrollback` | Personal-prep-notes content paraphrased into shareable Monday output | high | medium-low | Structural exclusion + grep-filter + self-check changes the failure mode from "drift" to "active circumvention." Capability not removed; instructional-and-procedural barrier added. |

Verdict: **risk reduced, not eliminated, and partially shifted** — drift becomes much harder; concept-level paraphrase that passes the string-grep is still possible; injection through another `sources/` file ("ignore the exclusion section") would still be processed.

Wrote `module-4/residual.md` — one paragraph naming the residual specifically (filter is prose-rule-plus-grep, not capability restriction; sufficiently determined concept-level paraphrase passes the grep; structural-exclusion clause is enforced by the agent following its own rules; CLASS-1 underlying gap untouched; mitigation local to this agent, next agent inherits zero protection).

---

## Close — Doors I would rather not open

Appended `## Doors I would rather not open` to `module-4/residual.md` with Maija's one-line decision verbatim:

> I am scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work.

Debrief truncated per runner.
