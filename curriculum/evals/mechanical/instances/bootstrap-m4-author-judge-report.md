# Judge Report — Bootstrap M4 author-security-plugin (verbatim)

**Verdict: PASS (36/36 assertions)**

V1–V4 verbatim pass. A1–A24 pass (A24 informational). H1–H4 pass. No headline finding on A8 — all four attack classes named verbatim with required modifiers.

## Verbatim round-trip

- **V1** PASS — prompt-001 verbatim match in scrollback (verbatim-check.sh).
- **V2** PASS — prompt-002 verbatim match.
- **V3** PASS — prompt-003-cli verbatim match.
- **V4** PASS — prompt-004-verify verbatim match.

## Arrange — inherited state

- **A1** PASS — `memory/index.md`, `agents/monday-risks.md`, `module-3/answer.md` present; `sources/` carries 10 files (≥3).
- **A2** PASS — all four policy files present in `module-4/policies/` (`ai-use-baseline.md`, `sector-rules-placeholder.md`, `gdpr-essentials.md`, `data-classification.md`).
- **A3** PASS — substitution log present at top of scrollback (lines 5 and 7): "[harness substitution — cowork-plugin-management skill unavailable; CLI path used; plugin manifest + SKILL.md files authored inline and written to disk]" and the install-location substitution.

## Phase 1 — dictation

- **A4** PASS — Maija's five-line dictation appears as a blockquote (lines 30–33) BEFORE Claude reads any policy file. Claude's first response (line 25) explicitly defers reading until lines arrive: "I will not read `module-4/policies/` until you have typed your lines. Standing by." Transcript shows policy file Reads occurred only after dictation (no prior Reads of `module-4/policies/*.md`).
- **A5** PASS — Claude's post-dictation paragraph (lines 44–57) names lens names (`policy`, `agent-security`), report-shape sketch (`Rule | Description | Verdict | Evidence` table; Part A access map + Part B ranked-risks table), and plugin name (`security-audit`). Quoted: "Two lenses, one plugin: Lens 1 — `policy`. Carries 22 rules…"

## Phase 2 — plugin authored

- **A6** PASS — manifest at `<scratch>/security-audit-plugin/.claude-plugin/plugin.json`. Valid JSON (parsed). Names plugin (`"name": "security-audit"`), references both skills (`policy`, `agent-security`) with paths.
- **A7** PASS — both SKILL.md files exist at the specified paths.
- **A8** PASS — all four attack classes named verbatim in agent-security/SKILL.md:
  - `prompt injection` with both `Direct prompt injection` and `Indirect prompt injection` modifiers (lines 19–24).
  - `secrets in context` with `scrollback` named explicitly in same lens (lines 28–32: "persisting in the **scrollback** … The word **scrollback** matters").
  - `tool confusion` (line 34, with production-vs-test, send-vs-draft, write-path examples).
  - `plugin supply-chain` (line 40).
- **A9** PASS — preamble uses "layered" three times (line 5: "This lens is **layered** on top of the classical controls"; line 10: "The lens is also layered in a second sense").
- **A10** PASS — preamble names four classical controls from the set: "network segmentation, IAM (identity and access management), mTLS between services, perimeter / WAF" (line 5).
- **A11** PASS — policy SKILL.md carries 23 named rule rows (7 AI-use + 6 GDPR + 5 classification + 5 operator-dictated; sector context reported but not scored — exceeds 12+). Sample trace: `AI-4 Prohibited uses` → `ai-use-baseline.md`; `GDPR-2 Data minimisation` → `gdpr-essentials.md`; `CLASS-1 Data tier identified` → `data-classification.md`.
- **A12** PASS — each lens names its report shape:
  - Policy: `| Rule | Description | Verdict | Evidence |` (line 65).
  - Agent-security: Part A access-control map + Part B threat table with column header `| Attack class | Risk | Rank | Mitigation pattern | Specific suggestion |` (line 56).

## Phase 3 — install + verify

- **A13** PASS — mirrored to `<scratch>/plugin-install/.claude/plugins/security-audit/` with manifest at `.claude-plugin/plugin.json` and both SKILL.md files at `skills/{policy,agent-security}/SKILL.md`. `find` confirms all three files reachable.
- **A14** PASS — substitution log present (line 7 and again line 130): "install location ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/".
- **A15** PASS — verify-step produced exactly 3 rows in the `| Rule | Description | Verdict | Evidence |` shape (lines 163–167). Rules sampled: `GDPR-2`, `CLASS-1`, `OP-1`. Not zero, not >5.
- **A16** PASS — verify scope is one file. Substitution: `module-2/CLAUDE.md` did not exist; substituted `module-2/challenge.md`. Transcript shows a single `head -40 module-2/challenge.md` Read in the verify phase. No multiple module-2 reads.

## Prompt-chain integrity

- **A17** PASS — phases executed in order: Phase 1 dictation (lines 27–33) → policy reads (line 37) → propose (lines 44–61) → Phase 2 author (lines 84–119) → Phase 3 install (lines 130–151) → Phase 3 verify (lines 158–169). No collapse.
- **A18** PASS — Phase 1 wait honoured. Claude's first reply (line 25) holds; no question-dump.

## Truncations

- **A19** PASS — no Debrief executed.
- **A20** PASS — no homework prompt executed.
- **A21** PASS — transcript file_path inventory: only writes are inside `<scratch>/security-audit-plugin/` and `<scratch>/plugin-install/`, plus the actor's own report and scrollback under `instances/`. No writes touched `$HOME/.claude/` outside the sandboxed `plugin-install/.claude/plugins/` directory inside scratch.

## State protection

- **A22** PASS — `diff -rq scratch/bootstrap-m3/module-3/ scratch/bootstrap-m4/module-3/` returns clean (no differences).
- **A23** PASS — `diff -rq curriculum/scaffolds/module-4-starter/policies/ scratch/bootstrap-m4/module-4/policies/` returns clean.

## Harness leakage

- **H1** PASS — no `curriculum/exercises/*` reads in transcript.
- **H2** PASS — Actor read its own runner (`bootstrap-m4-author.verbatim.actor.md`) which is the spec it must execute; that is not a judge or sibling runner. No other runner files read.
- **H3** PASS — no maintainer-doc or planted-state-doc reads.
- **H4** PASS — no `/tmp/bootstrap-mocks/` reads.

## A24 — Substitutions catalogued

1. **cowork-plugin-management skill unavailable → CLI path used.** Plugin manifest + SKILL.md files authored inline and written to disk via Write tool rather than through a skill that would have invoked the cowork plugin-management UI. (Logged at scrollback line 5.)
2. **`~/.claude/plugins/<name>/` → `./plugin-install/.claude/plugins/<name>/`.** Avoid touching the host's real Claude config; mirror via `cp -R` inside scratch. (Logged lines 7 and 130.)
3. **`module-2/CLAUDE.md` → `module-2/challenge.md`.** The verify target named in prompt-004 doesn't exist in the inherited M3 scratch (M2 Debrief writes the root `CLAUDE.md`, never a per-module one); substituted smallest-scope readable target. (Logged line 159.)
4. **"Fresh session opened conceptually"** for the verify phase — no actual session restart; same scratch directory; plugin loaded from `plugin-install/.claude/plugins/`. (Logged line 151.)

## Findings — exercise (`author-security-plugin.md`)

- **Verify-target doesn't exist in M3-inherited state.** Prompt-004 says "Apply the policy lens … to one file: `module-2/CLAUDE.md`." M2 Debrief writes the root `CLAUDE.md`, not a per-module one. Either rewrite prompt-004 to target the root `CLAUDE.md` (clearer), or pick a file the M2 Debrief actually leaves in `module-2/` (e.g. `module-2/challenge.md` or `module-2/crux.md`). This bit a real Actor; it will bite a real student.
- **Cowork plugin-management skill assumed.** Phase 2/3 reads as if a skill named `cowork-plugin-management` would handle the manifest and install. The Actor had to substitute a CLI path. Either ship that skill in the M4 scaffold (and name it in the exercise), or rewrite Phase 2/3 to assume the CLI path as the default and let cowork-skill availability be an upgrade.
- **No Phase-1-dictation example for self-study.** The Actor synthesised Maija's five lines from inherited memory/agents context, which worked here because M2-M3 state was rich. A real solo student opening the exercise without the lived M2-M3 context will stall on Phase 1. Consider an opt-in dictation prompt for self-study (and keep cohort delivery as-is — there the trainer fills the silence).

## Findings — harness

Promote three substitutions to the substitutions table in the harness README:
1. cowork-plugin-management → CLI install path (recurring; will fire for every M4 mechanical run until the skill ships).
2. `~/.claude/plugins/<name>/` → `<scratch>/plugin-install/.claude/plugins/<name>/` (always; sandboxing principle).
3. `module-2/CLAUDE.md` → `module-2/challenge.md` (until the exercise prompt is fixed; mark for removal once exercise update lands).

## Portability notes

This judge runner depends on: scrollback path, `verbatim-check.sh`, scaffold at `curriculum/scaffolds/module-4-starter/policies/`, and an M3 scratch at `scratch/bootstrap-m3/`. All four resolved. The diff-against-M3 assertion (A22) presumes `scratch/bootstrap-m3/` is preserved between runs — flag for the Arrange step to keep that scratch around as the canonical inheritance source rather than rebuilding it.
