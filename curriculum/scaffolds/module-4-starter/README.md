# Module 4 starter scaffold

Reference material the student reads while authoring their security plugin during M4. **No pre-shipped plugin ships** (per Antti 2026-04-25 — strict rule: no pre-shipped plugins anywhere in Bootstrap; M4 is the canonical plugin-authoring module, taught once, here).

## What ships

```
policies/                          # input material the student reads, not a plugin
  gdpr-essentials.md
  data-classification.md
  ai-use-baseline.md
  sector-rules-placeholder.md
```

Drop into `module-4/policies/` in the training directory at Phase 0. The student reads these while authoring the plugin in the exercise.

## What used to ship and was removed (2026-04-25)

Two pre-built skills (`agent-security/` generic, `company-ai-policy/` Nordic-baseline) used to ship under `skills/`. Removed: pre-shipped plugins violate the strict rule (Antti 2026-04-25). M4 now teaches plugin-authoring as the canonical move, once. The policy-content half travels forward as reference `.md` (above); the agent-security/STRIDE half is named in the exercise body and authored inline by the student.

## Two delivery modes (input only — no pre-built plugin either way)

### Self-study / open enrolment

Nordic-baseline policy reference files ship from this repo: GDPR essentials, general data-classification discipline, a prudent AI-use template, sector-rules placeholder. The student reads these, then authors their plugin in the exercise.

### In-company delivery

The Nordic-baseline reference is replaced by **customer-specific policy reference material**:

- **Co-distilled** from the customer's actual policies (data-usage, security, AI-use, sector-specific) by Antti, before the engagement.
- **Built outside this repository** — the customer's policies belong to the customer, not the repo.
- **Separately billable** — approximately 0.5–1 day of Antti's time per customer, plus customer-side input time.
- **Inputs from the customer:**
  - Data-usage policy (mandatory)
  - Security policy (mandatory)
  - AI-use policy (if one exists; otherwise the baseline template is adapted)
  - Sector-specific rules (as applicable — MIFID II, NIS2, DORA, MDR, national public-sector rules, etc.)
  - Any internal guidance on prohibited uses or approval thresholds
- **Output:** `policies/*.md` reference material — same shape as the Nordic-baseline files, customer-specific content. The student reads these while authoring the plugin during M4.

Do NOT commit customer-specific policy content to this repo.

## Per-runtime install paths (the student's plugin, authored in the exercise)

The student authors the plugin during Phase 2 of the exercise. Install paths differ per runtime:

- **Cowork** — *Save plugin* button after authoring (smoothest path).
- **Claude Code Desktop** — plugin loader.
- **Claude Code CLI** — `~/.claude/skills/<plugin-name>/SKILL.md`.

The exercise body names the path matching the student's runtime.

## Owed before first delivery

- **M4 reshape session.** The exercise body currently carries a surgical-pass strip of pre-shipped framing; full plugin-authoring reshape (per-runtime install affordances, authoring scaffold, reference-vs-plugin distinction in body prose) is owed in a separate `/content-creation` session.
- **Capability check on per-runtime plugin install paths.** Verify all three runtimes' authoring-and-install flows in current Claude Code / Cowork builds. Run `claude-code-guide` before the first live delivery.
- **Customer-input checklist** for distilling customer policies into reference `.md` material.
