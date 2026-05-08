---
key: author-security-skill-3
dest: Claude Code
runtime: any
origin: exercises/author-security-skill
---
Author the reusable security check now. Two lenses.

Build one personal skill source under module-4/skills/security-audit/. The main file is SKILL.md. It contains both lenses: POLICY and AGENT-SECURITY. Add supporting reference files only where useful.

For CLI and Claude Code Desktop, also make the standalone-skill install shape clear: module-4/skills/security-audit/SKILL.md becomes ~/.claude/skills/security-audit/SKILL.md during install. Do not write into ~/.claude yet; keep the authored source under module-4/skills/security-audit/ for now.

Lens 1 - POLICY. Rules drawn from everything in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Check what the agent can reach, what sensitive material might stay in its context, and what could go wrong because ordinary text can act like an instruction. The lens MUST cover these named risk patterns by name:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do: for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- skill supply-chain (the skill itself, or any skill the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each pattern, the lens produces one or two specific risks in the target system, ranked, with one suggested agent mitigation per risk - scope, split, filter, gate, or review. These sit on top of normal company controls (network controls, identity and access management, logging, vendor/security review), not in place of them. Name that explicitly in the lens's preamble.

Before you save anything, grill me on missing details that can sharpen the lens or that would ruin the audit run. Cover both lenses, especially the policy lens, where there is no named-class rail to fall back on. Don't stop at one question. I'll tell you when enough is enough.

After I answer, save the files. Keep the SKILL.md tight: when to use it, the two lenses it applies, the report shape each lens produces. Show me what you saved and confirm this package-complete checklist:
- module-4/skills/security-audit/SKILL.md
- any supporting reference files the SKILL.md requires
