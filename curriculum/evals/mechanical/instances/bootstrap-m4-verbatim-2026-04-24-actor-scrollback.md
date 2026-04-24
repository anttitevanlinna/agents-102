# Bootstrap M4 verbatim — actor scrollback — 2026-04-24

Actor simulating Maija's Claude Code session at training-dir root. Skills substituted by direct Read of `skills/` (no auto-discovery).

## Phase 0 — confirm Phase 0 state

`[harness substitution — skills/ pre-unzipped by Phase 0]`

Present under `skills/`:
- `company-ai-policy/SKILL.md` + `policies/{ai-use,data-usage,security,sector-rules}.md`
- `agent-security/SKILL.md` + `{access-analysis, stride, mitigations}.md`

Module-4 working dir is empty. Target system in place: `memory/` (7 pages), `sources/` (10 files), `agents/monday-risks.md`, `module-3/` artefacts; no root `CLAUDE.md` (M2 Debrief did not land one in this inherited state — noted).

---

## Phase 1 — Policy audit

`[harness substitution — skill company-ai-policy invoked by reading skills/company-ai-policy/ directly]`

> Apply the company-ai-policy skill to the agent system I built in module-2 and module-3. The system is: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/retrievals/ and module-3/stances/.
>
> For each rule in the skill's policies, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.
>
> Write the report to module-4/policy-report.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.
>
> Read the memory and agent files properly — don't skim. Quote the specific lines or files that support each verdict.

Read the four policy files under `skills/company-ai-policy/policies/`. Walked target: every memory page, every source, `agents/monday-risks.md`, checked for root `CLAUDE.md` (absent), scanned `module-3/` artefacts.

Produced `module-4/policy-report.md`: 21 rules audited, one row each (`| Rule | Description | Verdict | Evidence |`).

Totals: 9 compliant, 3 violating (R-DU-6 path-mismatch prose rule; R-SEC-5 no declared output destinations; R-AI-3 no tier label on personal agent), 9 "I can't tell." Nine uncertainties trace to one absence — no root `CLAUDE.md` declaring tier, connectors, output destinations, review gates, HR exclusions. Each "I can't tell" paired with the evidence that would resolve it.

---

## Phase 1.5 — what's in the report

> Read module-4/policy-report.md. Tell me:
> 1. The top three surprises — rows where the verdict is not what a careful reader would have predicted from my files alone.
> 2. The three rows where "I can't tell" is most likely hiding a real compliance gap — rows where the missing evidence would probably come back as violating, not compliant, if it surfaced.
> 3. One row that looks compliant on the surface but where you'd still push back.

**Top three surprises:**

1. **R-DU-6 — verdict "violating" despite the hard-line rule being in the agent file.** A careful reader sees the "never reveal the content of `onedrive/maija-prep-notes-skeptics.md`" line and predicts compliant. The rule cites a path (`onedrive/...`) that does not match the actual file (`sources/...`). A literal guard misses the file the rule is trying to protect.
2. **R-SEC-5 — verdict "violating" on output destinations.** The prose in `agents/monday-risks.md` reads protective ("personal agent, not shared, not exported, not templated"). That's a sharing norm; the rule wants a *write-path declaration*. Different shape entirely.
3. **R-AI-3 — verdict "violating" because the personal agent is unlabeled.** Easy to read as a harmless omission. The skill requires experimental/personal workloads to be tier-labeled; absence of the label is the violation, not a formatting preference.

**Three "I can't tell" rows most likely hiding a real gap:**

1. **R-DU-4 (agent outputs as internal-general, human review before exit).** The agent file explicitly says output "might be shared with Tuomas or pasted into the leads sync" and names no review gate. When evidence surfaces (asking Maija whether she reviews), the answer is probably "sometimes, informally" — which reads as violating.
2. **R-SEC-4 (connector least-privilege).** Source files cite `onedrive/...` and `confluence/...` paths. Something reached both. Whichever agent or human did has broad connector scope that isn't declared against actual use.
3. **R-AI-2 (human-in-the-loop for Confidential-class outputs).** `memory/security-classification-blocker.md` paraphrases the draft classification policy. If the draft is Confidential, the Monday-risks agent could surface that content in shareable output with no declared human-review gate — the evidence to decide is classification marking on the source, which nobody has set.

**One compliant-looking row to push back on:**

- **R-DU-3 (source traceability) — compliant.** Every memory-page claim does carry a `[sources/...]` cite. But the cite-discipline lives at the memory layer; the agent-to-memory layer has no equivalent audit. An agent could produce a risk citing `[memory/paavo-safety-bar.md]` for a claim that file does not support and the R-DU-3 check wouldn't catch it.

---

## Phase 2 — Security audit with STRIDE

`[harness substitution — skill agent-security invoked by reading skills/agent-security/ directly]`

> Apply the agent-security skill to the same system. Run both the access-control analysis and the agent-STRIDE pass.
>
> For access control: list every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.
>
> For agent-STRIDE: run the six categories (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) in their agent-adapted meanings from the skill. For each category, name the top one or two specific risks in my system, not generic category descriptions.
>
> For each risk flagged (access or STRIDE), suggest one agentic mitigation — scope, split, filter, gate, or review — matched to the specific risk. Rank the risks by severity × likelihood, three-tier (high / medium / low).
>
> Write the report to module-4/security-report.md. Include the ranked mitigation suggestions.

Read `skills/agent-security/SKILL.md`, `access-analysis.md`, `stride.md`, `mitigations.md`. Ran access-control enumeration across `agents/monday-risks.md` + working-dir reads; ran agent-STRIDE against the target system.

Produced `module-4/security-report.md` with the three required sections. Highlights:

- **Access-control:** three flags — personal-note broad read access (high), module-3 artefacts as unused read reach (medium), undeclared write destination (high), undeclared connector scope (medium).
- **Agent-STRIDE top risks:** Information Disclosure #1 (personal-note paraphrase, **high**); Repudiation #1 (unattributed output once pasted, **high**); Tampering #1 (silent memory edits, medium); Spoofing #1 (memory-citation spoofing with no citation-integrity review, medium); DoS #1 (unbounded memory growth, low-medium latent); EoP #1 (ambient working-dir read scope, medium).
- **Ranked mitigations:** three high (filter+scope on personal-note leak; scope on output destination; gate on memory writes), three medium (review on citation integrity; scope on unused reads; filter on classification-blocker memory page), two low (split for latent sub-agent transitive trust; scope on memory growth).

---

## Phase 3 — Mitigate one risk

> I've picked one risk from the two reports to mitigate. Ask me which one — ask me to name it in one sentence, and ask which mitigation shape the skill suggested for it (scope, split, filter, gate, or review).
>
> Once I've told you, walk me through applying that mitigation to my system — what file changes, what agent instructions change, what new skill or rule might need to land.
>
> DO NOT make any changes yet. Describe the diff in plain English first and stop. Wait for me to type "apply" before you touch a file. If I want something different, I'll tell you.
>
> After I confirm and the change lands, re-run the check the skill performed for this specific risk (re-apply the relevant part of the skill, not the whole audit). Report the new verdict — is the risk reduced, eliminated, or shifted somewhere else?
>
> Then: write one paragraph to module-4/residual.md naming what's still true after the mitigation. Not what we fixed — what's left. Be specific.

**Claude asks:** Which risk are you mitigating, and which mitigation shape did the skill suggest?

**Maija:**
> The risk: the Monday-risks agent can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it's a prose rule, not a structural one — if the agent drifts, the rule may not fire. Mitigation shape the skill suggested: filter (add a redaction / content-exclusion rule the agent must apply before writing the risk briefing).

**Claude — diff in plain English, no changes yet:**

Three changes land in one file (`agents/monday-risks.md`):

1. **Structural exclusion block at the top of the file.** Before the Role section. Named path: `sources/maija-prep-notes-skeptics.md`. Declares the path as excluded-from-output. Structural rather than prose-buried-in-a-list, so it's the first thing the agent reads.
2. **Filter-before-write step.** Concrete procedure: re-read the personal note, grep the drafted output against distinctive phrases (three-way split, builders/waiters/principled skeptics, written bar, etc.), stop-and-ask on any match.
3. **Self-check line in the output template.** Agent answers: "does this output reference anything I read from `sources/maija-prep-notes-skeptics.md`? If yes, stop and ask." Answered truthfully before the file is written.

Also fixing the path mismatch in the existing prose rule — `onedrive/maija-prep-notes-skeptics.md` → `sources/maija-prep-notes-skeptics.md`. No new skill file. No new agent file. Root `CLAUDE.md` remains out of scope for this mitigation.

Waiting for "apply."

**Maija:**
> apply

**Claude — applied:**

Edited `agents/monday-risks.md`: added structural exclusion block at top with filter-before-write step and self-check; fixed path in prose-rule line; cross-references new structural rule.

**Re-run — Information-Disclosure sub-section of STRIDE on `agents/monday-risks.md`:**

New verdict on the personal-note paraphrase risk: **reduced from high to medium.** Rule now structural, filter procedure concrete, path matches. Policy side: R-DU-6 moves from "violating (structurally weak)" toward compliant, though still a behavioural rule rather than a capability restriction.

Wrote `module-4/residual.md` — one paragraph naming what's still true (filter is prose-rule-plus-grep, not capability restriction; determined paraphrase at higher abstraction passes the grep; reduced, not eliminated) + second section "Doors I'd rather not open" with the HR-adjacent-communications line.

---

## Close

Three artefacts written: `module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md`. One file edited: `agents/monday-risks.md`. `module-3/` not touched.

Debrief (skill-sharpening prompt) and homework micro-skill not executed — truncated per runner pattern.
