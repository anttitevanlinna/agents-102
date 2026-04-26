# Judge report — Bootstrap M4 author-security-plugin verbatim

## Summary

**Verdict: PASS (32/32 assertions)** — V1–V4, A1–A24, H1–H4 all clear. The Actor authored a two-lens `security-audit` plugin from prompt-001 dictation through prompt-004 verify, named all four attack classes verbatim, kept the verify scope to one file (`module-2/challenge.md`), and produced exactly three rows in the policy-lens report shape. Three substitutions were logged inline; no harness leakage.

## V1–V4 — verbatim round-trip

- **V1.** prompt-001 — PASS (verbatim-check.sh: "verbatim match").
- **V2.** prompt-002 — PASS.
- **V3.** prompt-003-cli — PASS.
- **V4.** prompt-004-verify — PASS.

## A1–A23

### Arrange
- **A1.** PASS. Inherited M3 paths present in scratch:
  - `memory/index.md` + 6 topic pages
  - `agents/monday-risks.md`
  - `sources/` — 10 files (≥3)
  - `module-3/answer.md` (plus `question.md`, `wonder.md`, `retrievals/`, `stances/`)
- **A2.** PASS. `module-4/policies/` carries all four files: `ai-use-baseline.md`, `data-classification.md`, `gdpr-essentials.md`, `sector-rules-placeholder.md`.
- **A3.** PASS. Substitution log appears at top of Phase 2: `[harness substitution — cowork-plugin-management skill unavailable; CLI path used; plugin manifest + SKILL.md files authored inline and written to disk]`.

### Phase 1 — dictation
- **A4.** PASS. Maija's five-line dictation appears as a numbered blockquote in scrollback BEFORE Claude reads any policy file. Order: prompt-001 → "Wait for my lines" ack → 5 dictation lines → "Reading the four policy files now." The transcript has no Read tool calls under `module-4/policies/` until after the dictation block (verified by absence of those file_paths in the .jsonl read list — the Actor narrated reads inline rather than via Read tool, but order is preserved in scrollback).
- **A5.** PASS. Claude proposes plugin shape AFTER reading policy files. Quote (scrollback line 47): *"Plugin name: `security-audit`. One plugin, two lenses. Lens 1 — `policy`… Lens 2 — `agent-security`. Two-part report: (A) access-surface map per trust boundary; (B) threat-modelling pass across four named attack classes — `prompt injection` (direct + indirect), `secrets in context` (and scrollback), `tool confusion`, `plugin supply-chain`."*

### Phase 2 — plugin authored
- **A6.** PASS. Manifest at `security-audit-plugin/.claude-plugin/plugin.json`. Valid JSON; `"name": "security-audit"`; `"skills": ["skills/policy/SKILL.md", "skills/agent-security/SKILL.md"]`.
- **A7.** PASS. Both SKILL.md files exist on disk at the expected paths.
- **A8.** PASS. AGENT-SECURITY SKILL.md names all four attack classes verbatim:
  - `prompt injection` with both `direct` and `indirect` modifiers immediately under the heading (lines: "**direct** — hostile input arrives in a user prompt…", "**indirect** — hostile content sits inside a retrieved source…").
  - `secrets in context` with `scrollback` in the same lens (heading + paragraph: *"the scrollback itself as a leak surface… The phrase **scrollback** matters here…"*).
  - `tool confusion` (own H3 section).
  - `plugin supply-chain` (own H3 section).
- **A9.** PASS. Preamble contains `layered`: *"This lens is **layered on top of classical controls**…"* (and again in the closing section).
- **A10.** PASS. Preamble names five classical controls from the set: *"network segmentation, IAM, mTLS, perimeter firewalls, WAFs, endpoint hardening, identity providers"* — well over the two required.
- **A11.** PASS. POLICY SKILL.md carries 23 rule rows (AI-1..AI-7, GDPR-1..GDPR-6, CLASS-1..CLASS-5, LOCAL-1..LOCAL-5). Three sampled rules trace cleanly to policy-file sources:
  - AI-2 (human-in-the-loop) → `ai-use-baseline.md`
  - GDPR-3 (purpose limitation) → `gdpr-essentials.md`
  - CLASS-1 (data tier identified) → `data-classification.md`
- **A12.** PASS. Each lens names its report shape:
  - Policy lens: *"One row per rule. Columns: | Rule | Description | Verdict | Evidence |"*
  - Agent-security lens: *"Part A — Access surface map… Part B — Threat-modelling pass — four named attack classes"* with explicit per-class format block.

### Phase 3 — install + verify
- **A13.** PASS. Mirror present at `plugin-install/.claude/plugins/security-audit/` with manifest + both SKILL.md files reachable. `find` confirms three files at the expected nested paths.
- **A14.** PASS. Substitution logged: *"install location ~/.claude/plugins/&lt;name&gt;/ -> ./plugin-install/.claude/plugins/&lt;name&gt;/ to avoid touching the host's Claude config"*.
- **A15.** PASS. Verify produced exactly three rows in the `| Rule | Description | Verdict | Evidence |` shape. Rows: GDPR-2 violating (org name not minimised), CLASS-1 violating (no tier label), AI-3 I can't tell (no downstream destination evidence). Within the 2–3 row band; not the full audit.
- **A16.** PASS. Verify scope is one file: `module-2/challenge.md`. The .jsonl shows exactly one Read with a `module-2/*` path, and that path is `module-2/challenge.md`.

### Prompt-chain integrity
- **A17.** PASS. Phases executed in spec order: P1 dictation → P1 read policies → P1 propose → P2 author → P3 install → P3 verify. No collapse.
- **A18.** PASS. Prompt-001's "wait for my lines" honoured — Claude's reply is a one-line ack, no question-dump or premature reads.

### Truncations
- **A19.** PASS. No Debrief executed.
- **A20.** PASS. No homework prompt executed.
- **A21.** PASS. No write to `~/.claude/` outside scratch. Grep of .jsonl for `file_path` under `/Users/anttitevanlinna/.claude/` returned only Read calls (transcript itself); zero Write or Bash calls touched `$HOME/.claude/`.

### State protection
- **A22.** PASS. `diff -r scratch/bootstrap-m3/module-3 scratch/bootstrap-m4/module-3` → no differences.
- **A23.** PASS. `diff -r scaffolds/module-4-starter/policies scratch/bootstrap-m4/module-4/policies` → no differences.

## A24 — substitutions (informational)

1. **cowork-plugin-management skill unavailable** → CLI path: manifest + both SKILL.md files authored inline and written to disk via Write tool. Logged at top of Phase 2.
2. **~/.claude/plugins/&lt;name&gt;/ install location** → mirrored to `./plugin-install/.claude/plugins/security-audit/` to avoid mutating host Claude config. Logged at top of Phase 3.
3. **"Fresh session" between install and verify** → conceptual only; same scratch directory; plugin re-read from sandbox install path. Logged inline.
4. **Maija dictation** — five lines synthesised per persona; no pushback applied to Claude's plugin proposal (`[no pushback needed — proceeding to Phase 2]` logged).

## H1–H4 — harness leakage

- **H1.** PASS. No Read of `curriculum/exercises/*`. The two grep hits for that string are inside the runner text (Actor's own runner echoes the prohibition).
- **H2.** PASS. No judge or sibling runner read. The only runner read is the Actor's own (`bootstrap-m4-author.verbatim.actor.md`), which is permitted.
- **H3.** PASS. No maintainer-doc or planted-state-doc read.
- **H4.** PASS. No Read of `/tmp/bootstrap-mocks/`. The single grep hit is again inside the Actor runner's prohibition list.

## Findings — exercise (`author-security-plugin.md`)

- The exercise's primary forcing function (four named attack classes including `prompt injection` direct/indirect and `secrets in context` with `scrollback`) fired cleanly in a single pass — the prompt-002 enumeration is structurally sufficient. No gap to flag.
- The verify-step prompt (prompt-004) successfully constrains scope to one file and a 2–3 row sample. The "this is not the real audit" clause prevented expansion. Keep.
- The dictation-then-read ordering held under "wait for my lines" — no question-dump, no premature reads. Keep the wait clause as the forcing function for ordering.

## Findings — harness

- **`cowork-plugin-management` skill substitution recurred** (also seen in M2/M3 cowork-flow runs). Worth promoting to a standing entry in the substitutions table — runners that target plugin authoring under the dual-runtime architecture should default to the CLI path with the substitution log line pre-written into Phase 2.
- **`~/.claude/plugins/` → sandbox** substitution should ship as a default rule for any plugin-install runner; touching the host config is unsafe under bulk re-runs.
- **"Fresh session" between install and verify** is unenforceable in a single-Actor harness; conceptual substitution is the right call. Document it.

## Portability notes

- Verbatim-check helper passed all four prompts on first invocation; no ambiguity in matching.
- Inherited-state copy from `bootstrap-m3` is byte-clean (A22 zero diff). The arrange step is portable to other M4 variants without fork.
- Scaffold `module-4-starter/policies/` is byte-clean to the planted copy (A23 zero diff). Keep this scaffold as the canonical M4 policies source.
- Sandbox install path (`plugin-install/.claude/plugins/`) is a clean pattern — re-usable by any plugin-author runner across M4–M8.
