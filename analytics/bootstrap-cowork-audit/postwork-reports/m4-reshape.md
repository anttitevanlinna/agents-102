# M4 plugin-authoring reshape — postwork report

Reshape executed 2026-04-25 from the security-skeptic Cowork-mode audit findings (`analytics/bootstrap-cowork-audit/sim-security-skeptic.md`). Splits M4 into two exercises so plugin-authoring gets real time; grounds the AGENT-SECURITY lens in four named attack classes; reframes "not firewalls" as layered.

## Files created

- `curriculum/exercises/author-security-plugin.md` — new ~25-min exercise. Phase 1 student dictates 3–5 lines of what matters in own voice (no pre-reading); Phase 2 authors both lenses with four named attack classes as forcing function; Phase 3 per-runtime install + verify with paired `.rt-cli` / `.rt-desktop` / `.rt-cowork` divs. Cowork fork carries more scaffolding per check_prompts rule 11.

## Files modified

- `curriculum/exercises/audit-your-agent.md` — dropped Phase 0 (now in *Author a security plugin*); dropped TODO at top; opening prose retargets to running the plugin authored in the previous exercise; Phase 2 prompt rewritten to invoke the four named attack classes by name (rather than generic STRIDE categories) so the lens cannot collapse into closed-loop self-grading; mitigation prompt now names "layered on top of classical controls" explicitly. Time budget: 45 min total (Phase 1 ~12, Phase 1.5 ~5, Phase 2 ~12, Phase 3 ~12, Close ~4).
- `curriculum/trainings/bootstrap/security.md` — TODO at top removed (resolved items); Meta lists two exercises; LOs include authoring + named attack classes + layered mitigations; Key Concepts adds prompt injection as named class and reframes "not firewalls" as layered (with classical controls as the floor); Connections links both exercises in sequence; Debrief retargeted to sharpen the authored plugin; total time budget ~75–85 min (fits 1h45 with Connections + Debrief).
- `curriculum/exercises/module-4-prework.md` — TODO at top removed; Reading 1 minor touch-up (now references the dictate-first pattern and the two-exercise shape); Reading 2 fully rewritten — drops the "if you have a security background half of this will sound wrong" line (the security-skeptic sim caught it as flattering a caricature of classical security that owns CVSS / residual / NIST), reframes as classical handles deterministic perimeter and residual-risk vocabulary while agent security adds non-deterministic instruction-set surfaces and four named attack classes ON TOP. Layered framing throughout.
- `curriculum/scaffolds/module-4-starter/README.md` — "What used to ship" note now references the two-exercise split + four named attack classes; per-runtime install paths section updated for `~/.claude/plugins/<name>/` (CLI) and paired-divs in the exercise body; "owed before first delivery" trimmed (reshape removed; capability check, customer-input checklist, em-dash sweep remain).
- `curriculum/content-strategy.md` — § Security rewritten: two-exercise spine, four named attack classes called out, layered framing in Big Idea + Key Concepts, prework reframed. State-of-play entry for M4 updated to mark the reshape landed and capture remaining open items (capability check, em-dash sweep, lecture Pass 3). Open-items list (line 611–612) updated: M4 capability check expanded to plugin install paths; M4 reshape line replaced with customer-input checklist (the reshape itself is done).

## Audit-finding before/after verdicts

1. **Phase 0 timing — three minutes can't carry first-time plugin authoring** → RESOLVED. M4 now ships as two exercises. Plugin-authoring gets a dedicated 25 min (Phase 1 ~5 dictate, Phase 2 ~12 author, Phase 3 ~8 install + verify). Audit gets its own 45 min, no Phase 0.
2. **Read-first is empty calories** → RESOLVED. Phase 1 of *Author a security plugin* is explicit: student dictates 3–5 lines from own head FIRST. The prompt tells Claude to wait for the lines before reading the policy files. Watch-for added in maintainer block for "dictation collapses into pre-reading."
3. **Prompt injection unnamed in M4 body** → RESOLVED. Named in three places: Key Concepts in `security.md` (own bullet, names direct + indirect by definition); LOs in `security.md` (named attack classes including prompt injection direct + indirect); the AGENT-SECURITY lens forcing function in *Author a security plugin* Phase 2 prompt (one of four named classes the plugin MUST cover, with direct vs. indirect spelled out in the prompt). Re-named in *Audit your agent* Phase 2 prompt and in prework Reading 2.
4. **AGENT-SECURITY lens closed-loop self-grading** → RESOLVED. The AGENT-SECURITY lens is now grounded in four externally-named attack classes (prompt injection direct + indirect, secrets-in-context-and-scrollback, tool-confusion, plugin supply-chain). The Phase 2 authoring prompt enumerates them by name as a forcing function — "the lens MUST cover these named attack classes by name, not as generic STRIDE categories." The audit prompt in *Audit your agent* re-names them so the audit cannot collapse into running a rubric Claude wrote against output Claude generated.
5. **"Not firewalls" rhetorical foil** → RESOLVED. Reframed throughout as **layered**. Key Concepts in `security.md` carries a dedicated bullet ("Agent mitigations are layered, not replacements") naming the classical floor (WAF, VPC egress, mTLS, IAM-scoped service principals, audit) and the agent surfaces above it. Prework Reading 2 leads with the layered frame. The Phase 2 prompts in both exercises name the layered framing in their language — "layered on top of classical controls (network, IAM, mTLS, perimeter), not replacing them."

## Compendium-rule discipline applied

- **check_prompts.md rule 1 (no placeholders in fences):** verified — no `[BRACKETS]` in any fenced block; Phase 1 dictation prompt uses "I will type 3–5 lines now" pattern, Phase 3 verify uses concrete paths.
- **check_prompts.md rule 2 (action lead-in):** every prompt block has a one-sentence action lead-in.
- **check_prompts.md rule 9 (no markdown shout in fences):** verified — no `**bold**` or `*italic*` inside fenced prompt blocks; emphasis through word choice and bullets.
- **check_prompts.md rule 10 (paired runtime-fork divs):** Phase 3 install in *Author a security plugin* uses three paired divs (`.rt-cli` / `.rt-desktop` / `.rt-cowork`) with shared `**Prompt** *(Claude Code)*` chip; pedagogical content stays identical across forks.
- **check_prompts.md rule 11 (Cowork fork needs MORE scaffolding):** Cowork fork carries the most explicit guidance — three paragraphs covering the *Save plugin* button location, what to do if it doesn't appear, the new-session-required mechanic — versus the CLI fork's two-line write-and-confirm pattern.
- **check_student_facing.md #14 (no em-dashes):** new exercise + reshaped exercise + module file written without em-dashes; existing em-dashes in maintainer blocks retained (not student-facing); em-dash sweep flagged as small open TODO.
- **check_writing.md banned words:** grep clean for `honest`, `delve`, `landscape`, `importantly`, `crucial`, `substrate`.
- **check_pedagogy.md #12 (split mega-exercise):** explicitly applied — three phases with three distinct skills (dictate → author → install) plus three artifacts plus a natural pause point earned the split.
- **check_strategy_tie_in.md #4 (strategy-fidelity):** content-strategy.md § Security updated in same cycle to match the new two-exercise spine, named attack classes, layered framing. State-of-play entry refreshed.

## Unresolved / out of scope

- **Lecture Pass 3 polish** (`curriculum/lectures/practice-of-risk.md`) — flagged in `security.md` TODO. Not touched this cycle; the lecture's body still carries the older "not firewalls" framing in places. Owed in a separate cycle.
- **Em-dash sweep** across the three M4 surfaces — small open item; the new exercise was authored em-dash-free, the reshaped exercise had its prose em-dashes removed, but a second pass against the prework + module file is still owed.
- **Capability check** on per-runtime plugin install paths (`~/.claude/plugins/<name>/` for CLI, plugin loader for Desktop, *Save plugin* for Cowork) — flagged as blocking before first delivery in `security.md` and in *Author a security plugin* maintainer. Run `claude-code-guide` per runtime.
- **Customer-input checklist** for distilling customer policies — open item from earlier cycle; out of scope here.
- **Sim + eval re-run** on the new + reshaped exercises — per `check_pedagogy.md` #15, significant rewrites trigger auto-fire of three-persona sim + LLM-as-judge. Not run this cycle (this was an implementation cycle, not a verification cycle); flagged for the next cycle. Same compendium-audit pass clears the cheap-tier check (per the cheap-before-expensive ladder), so the new exercise carries `Quality: draft` with `compendium-audited 2026-04-25` in its dimension log.

## Quality tags

Both exercises and the prework file carry `Quality: draft 2026-04-25` with `compendium-audited 2026-04-25` in the maintainer block. Sim and mechanical tiers not yet earned; cohort and battle tiers not applicable pre-first-delivery.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/postwork-reports/m4-reshape.md
ALL FILES EDITED
