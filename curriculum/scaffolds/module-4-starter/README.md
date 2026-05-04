# Module 4 policy reference material

Reference material the student runs raw, then packages into reusable security expertise during Module 4. This material is installed by the Agents 101 prework starter at `module-4/policies/`; students do not download a separate Module 4 pack. **No pre-shipped security skill ships** (per Antti 2026-04-29: Module 4 authors a personal skill during the exercise).

## What ships

```
policies/                          # input material the student reads, not a skill
  gdpr-essentials.md
  data-classification.md
  ai-use-baseline.md
  sector-rules-placeholder.md
```

These files live at `module-4/policies/` in the training directory from prework onward. The student first runs these files directly, packages the useful check in the first exercise, then loads and applies it in the second.

## What used to ship and was removed (2026-04-25)

Two pre-built skills (`agent-security/` generic, `company-ai-policy` Nordic-baseline) used to ship under `skills/`. Removed: pre-shipped security skills violate the authoring move. Module 4 now teaches reusable-check authoring as the canonical move, once, split across two exercises so first-time authoring gets real time. The policy-content half travels forward as reference `.md` (above); the agent-security half is named in the *Run and package a security skill* exercise body: four named attack classes (prompt injection direct + indirect, secrets-in-context, tool-confusion, skill supply-chain) the student's lens MUST cover.

## Two delivery modes (input only — no pre-built skill either way)

### Self-study / open enrolment

Nordic-baseline policy reference files ship from this repo: GDPR essentials, general data-classification discipline, a prudent AI-use template, sector-rules placeholder. The student runs these raw, then authors the reusable check in the exercise.

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
- **Output:** `policies/*.md` reference material, same shape as the Nordic-baseline files, customer-specific content. The student runs these raw, then packages the useful check during Module 4.

Do NOT commit customer-specific policy content to this repo.

## Per-runtime paths (the student's reusable check, packaged in Exercise 1 and loaded in Exercise 2)

The student authors the reusable check during *Run and package a security skill*. For Cowork, creating and saving the personal skill is part of that packaging exercise. The next exercise opens a fresh session and loads it before the audit. Paths differ per runtime:

- **Cowork** — in Exercise 1, Claude Desktop *Customize* → *Skills* → *New* → *Create with Claude*, then save the personal skill from that skill-creation chat. Exercise 2 starts in a fresh Cowork session and checks that `/security-audit` appears.
- **Claude Code Desktop** — copy the authored `module-4/skills/security-audit/` source to `~/.claude/skills/security-audit/`, then open a new session.
- **Claude Code CLI** — same standalone skill path: `~/.claude/skills/security-audit/SKILL.md`. The `module-4/skills/security-audit/` folder stays in the training directory as source of truth.

The exercise body uses paired `.rt-cli` / `.rt-desktop` / `.rt-cowork` divs so the renderer surfaces the path matching the student's runtime.

## Owed before first delivery

- **Capability check on per-runtime paths.** Verify Cowork creation/save in Exercise 1 and Desktop/CLI load paths in Exercise 2 in current Claude Code / Cowork builds. Run `claude-code-guide` before the first live delivery.
- **Customer-input checklist** for distilling customer policies into reference `.md` material.
- **Time-boxing pass** across the module after the raw policy run addition.
