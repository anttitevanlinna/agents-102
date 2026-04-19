# Module 4 starter scaffold

Content of `module-4-skills.zip` — the scaffold students unzip into the training directory at Module 4, Phase 0.

## What ships

```
skills/
  agent-security/           # generic — ships with training
    SKILL.md
    stride.md
    access-analysis.md
    mitigations.md
  company-ai-policy/        # per-delivery — default is Nordic-baseline
    SKILL.md
    policies/
      gdpr-essentials.md
      data-classification.md
      ai-use-baseline.md
      sector-rules-placeholder.md
```

## Two skills, two delivery modes

### `agent-security` — generic, ships as-is

Access-control analysis + agent-STRIDE + agentic-mitigation suggestions. Same content for every training, every delivery. Maintained in this repo.

### `company-ai-policy` — delivery-specific

**This repo ships the Nordic-baseline default** — conservative fallback used for self-study, demos, and open-enrolment deliveries without a customer. It encodes GDPR essentials, general data-classification discipline, and a prudent AI-use template.

**For in-company deliveries, the Nordic-baseline default is replaced** with a customer-specific version. The customer's version is:

- **Co-created** with the buying organisation as a separate deliverable.
- **Built outside this repository** — it encodes the customer's actual policies (data-usage, security, AI-use, sector-specific) and belongs to the customer, not the repo.
- **Separately billable** — approximately 0.5–1 day of Antti's time per customer, plus customer-side input time.
- **Deliverable to the customer** — the built skill is theirs to keep and reuse beyond the training.

Do NOT commit customer-specific policy content to this repo. The Nordic-baseline is the repo's canonical version; the customer version travels with the engagement.

## Build process for the customer version (reference)

Inputs from the customer:
- Data-usage policy (mandatory)
- Security policy (mandatory)
- AI-use policy (if one exists; otherwise the baseline template is adapted)
- Sector-specific rules (as applicable — MIFID II, NIS2, DORA, MDR, national public-sector rules, etc.)
- Any internal guidance on prohibited uses or approval thresholds

Output:
- `skills/company-ai-policy/SKILL.md` — adapted from the baseline SKILL.md, with customer-specific framing
- `skills/company-ai-policy/policies/*.md` — one file per distinct rule set from the customer, each following the structure of the baseline files (rules with specific audit-check instructions and common violation patterns)

Delivery:
- The skill ships to the customer as part of the training package.
- The customer owns it; can maintain, extend, and reuse it outside the Agents 102 context.

## Zip packaging

The training site hosts `module-4-skills.zip` as a download link. For Bootstrap deliveries:

- **Nordic-baseline variant:** zip contains both skill folders as-is from this repo. For self-study and open enrolments.
- **Customer variant:** zip replaces the `company-ai-policy/` folder with the customer-specific version built outside this repo. `agent-security/` is unchanged.

The student's Phase 0 experience is the same in either case — unzip, skills appear in `skills/`, invoke in Phase 1.

## Capability checks before first delivery

See `curriculum/evals/instances/bootstrap--audit-your-agent.md` for the current list. In brief:

1. Skill drop-in: does current Claude Code pick up `skills/<name>/` without restart?
2. Invocation phrasing: does *"apply the X skill to Y"* dispatch reliably, or is `/skill use X` needed?
3. Visibility: does Claude Code show a "skill loaded" indicator in the transcript?

Run `claude-code-guide` before the first live delivery. If plain-language invocation is unreliable, pre-bake the `/skill use ...` fallback into the exercise's Phase 1 / Phase 2 prompts.
