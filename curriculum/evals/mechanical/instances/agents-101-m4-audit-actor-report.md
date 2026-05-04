# Actor Report — Agents 101 M4 audit-your-agent verbatim

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4

## Transcript
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/agents-101-m4-audit-actor-scrollback.md

## Prompts Executed

1. Phase 1 (install-skill): Install security-audit SKILL to scratch-local skill-install/.
2. Phase 2 (policy-audit): Apply policy lens (read SKILL.md); audit memory/, sources/, agents/, policies/, module-3/stances/. Produce policy-report.md with ≥12 rule rows.
3. Phase 3 (agent-security-audit): Apply agent-security lens; enumerate access reaches, four named attack classes, ranked mitigations (high/medium/low). Produce security-report.md.
4. Phase 4 (mitigate-residual): Substitute Maija's risk statement; pick FILTER mitigation; edit agents/monday-risks.md (structural exclusion + filter routine + self-check); re-run agent-security lens check; append mitigation section to security-report.md.

## Artifacts Written

- skill-install/.claude/skills/security-audit/SKILL.md
- outputs/policy-report.md (13 rules: AI-1–6, CLASS-1–5, write-scope, supply-chain)
- outputs/security-report.md (access control + four attack classes + ranked mitigations + classical controls + mitigation residual)
- agents/monday-risks.md (edited: structural exclusion rule + filter step + self-check verification)

## Substitutions

- Install location: ~/.claude/skills/security-audit/ → skill-install/.claude/skills/security-audit/ (avoid host config).
- Lens invocation: policy and agent-security lenses applied by direct Read of skill-install/.claude/skills/security-audit/SKILL.md.
- Risk pick: Maija's monday-risks statement (indirect prompt injection via sources/).
- Debrief: truncated (not executed per runner instructions).

**Forcing-function compliance:**
✓ Four Reads of prompt-00{1,2,3,4}.txt before blockquote-paste.
✓ Four named attack classes: prompt injection (direct + indirect), secrets in context (+ scrollback), tool confusion, skill supply-chain — verbatim in security-report.md.
✓ Phase 1 install destination logged: skill-install/.claude/skills/security-audit/.
✓ Phase 4 appends to outputs/security-report.md with mitigation + residual (one paragraph).
✓ Mitigation shapes appear verbatim: scope, split, filter, gate, review (across report).
✓ Classical-controls floor: ≥2 from {network, IAM, identity, mTLS, perimeter, WAF, logging, vendor}.
✓ Tier markers: high, medium, low — ≥3 mentions throughout.
