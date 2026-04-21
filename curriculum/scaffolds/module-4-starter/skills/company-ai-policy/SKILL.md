---
name: company-ai-policy
description: Audit an agent system against company AI, data-usage, and security policies and produce a compliance report with per-rule verdicts (compliant / violating / "I can't tell"). Use when a student asks to check their agent against company rules, run a policy audit, or find compliance gaps.
---

# Company AI Policy — audit skill

> **IMPORTANT — this is the Nordic-baseline default.** This version of the skill is the fallback used in Agents 102 when a training is delivered without a customer-specific policy (self-study, demos, open enrolments). It encodes a conservative Nordic-baseline bundle: GDPR essentials, general data-classification discipline, and a prudent AI-use template. It is **not** the real policy of any specific company.
>
> **For in-company training deliveries**, this skill is replaced by a customer-specific version co-created with the buying organisation as a separate deliverable outside this repository. The customer's version encodes their actual data-usage policy, security policy, AI-use policy (if one exists), and sector-specific rules (finance, health, public sector, etc.). Build process and template for that deliverable live outside this repo.

## What to produce

One report. Write it to the path the user names (default: `module-4/policy-report.md`).

For each rule in `policies/*.md`, produce one row in a markdown table:

| Rule | Description | Verdict | Evidence |
|---|---|---|---|

- **Rule** — a short name (e.g., "Customer-data classification").
- **Description** — one sentence of what the rule requires.
- **Verdict** — one of three: **Compliant**, **Violating**, or **"I can't tell"**. Don't reach for a clear verdict when the evidence isn't there.
- **Evidence** — the file or path that justifies the verdict, with one line of what you found there. If "I can't tell," name the evidence you'd need to decide.

After the table, add a short summary section:
- Count of verdicts (compliant / violating / I can't tell)
- Top two or three rules that most need attention
- For rules marked "I can't tell," a list of questions the user could answer (or files they could produce) that would let you decide next time.

## How to read the agent system

The system usually lives in the current working directory:
- `memory/` — cross-module knowledge files
- `sources/` — raw input material (internal docs, exports, call notes, policy text)
- `agents/` — agent instruction files (`*.md`)
- Root `CLAUDE.md` — cross-module rules
- `module-N/` subfolders — per-module artifacts, prior outputs

Read the files properly. Don't skim. Quote the specific lines or paths that support each verdict.

## Verdict rules

**Compliant:** the evidence in the files clearly shows the rule is honoured. Quote the specific file and sentence.

**Violating:** the evidence in the files clearly shows the rule is broken. Quote the specific file and sentence. Don't soften this — a violation stated honestly is more useful than a hedge.

**"I can't tell":** either the evidence isn't present, or it's ambiguous, or the rule is about behaviour that you can't observe from files alone (e.g., "external sharing of outputs" — you can't tell from the agent system itself what got shared with whom). **This is a real answer, not a failure.** Leaving a rule in this column is honest; reclassifying to hide uncertainty is the failure.

## Style rules

- **Be specific.** Quote files. Name paths. One-line evidence per verdict.
- **Be honest.** "I can't tell" is a better answer than a confident guess.
- **Don't invent content.** If the rule asks about something not present in the system, that's usually "I can't tell" — not "compliant by default."
- **Don't moralise.** You're reporting findings, not lecturing on best practice.

## What not to do

- Don't produce generic advice ("you should follow GDPR"). The user knows. The rules in `policies/*.md` are the specific checks.
- Don't skip a rule because the answer is hard. If you genuinely can't tell, say so.
- Don't reclassify "I can't tell" as "Compliant" to have a cleaner report.
- Don't produce a verdict without evidence — every row needs a specific file or path.

## The posture

You are a compliance-literate reviewer the user is borrowing for one audit. You know the Nordic-baseline rules. You know how to read an agent system and match it against policy. You bring that discipline, but the user owns the business decision about what to fix, accept, or close off — you surface what's true.

Read the policies. Read the system. Score each rule with evidence. Stop.

Supporting files in this skill:
- `policies/gdpr-essentials.md` — personal data handling under GDPR (lawful basis, minimisation, purpose limitation, data subject rights)
- `policies/data-classification.md` — general data-classification discipline (public / internal / confidential / restricted) and how each tier should be handled by agents
- `policies/ai-use-baseline.md` — a prudent AI-use policy covering scope, approved use cases, human-in-the-loop requirements, output review, and prohibited uses
- `policies/sector-rules-placeholder.md` — stub. In-company deliveries replace this with actual sector rules (MIFID II, NIS2, DORA, sector codes, etc.). For the baseline version, this file names common Nordic regulated-sector rules as context but does not enforce them as hard rules.
