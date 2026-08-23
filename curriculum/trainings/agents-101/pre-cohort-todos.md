# Pre-cohort punchlist, Agents 101

> **CLOSED = DELETE THE BULLET. Not "annotate done." Not "rewrite as smaller follow-up." Not "update with what landed." DELETE.**
>
> Git log is the history. This file is current state. A closed bullet rewritten as adjacent work is a NEW bullet pretending to be progress, surface the new work cleanly under a real section, or don't add it. If the new work isn't pre-cohort scope, it doesn't belong in this file at all.

Everything that needs to land before the first paying Agents 101 cohort. Grouped by kind of work, not by module.

## 1. Three-persona sim sweep

Run the Agents 101 sim set after the current polish pass settles. Use the same shape as AE101: mid-competent business practitioner, opinionated senior leader, fast operator, plus targeted facilitator persona where module timing is the risk.

- **Module 1, Getting Going.** Re-run after the Module 1 → Module 2 prework handoff edit. Focus: joyful creation, guardrail ownership, no premature "systems" heaviness.
- **Module 2, Building Agent Systems.** Re-run after body touch. Focus: root `CLAUDE.md` creation, memory curation, plan-mode / plan-first runtime split, and the handoff to Module 3.
- **Module 3, Multi-Agent Systems.** Already compendium-audited with approve-with-todos. Re-sim after runtime-fork pass and prework mirroring. Focus: concurrent session friction, subagent terminology, and whether the synthesis beat preserves unsettled competence.
- **Module 4, Security.** Re-sim after the personal-skill shape. Focus: "I can't tell" rows, shame spiral, and whether unease stays epistemic rather than punitive.
- **Module 5, Output Quality.** Sim the hallucination benchmark as one bounded activity. Focus: whether scoreboard rescue lands without implying quality is solved.
- **Module 6, Evaluations.** Sim the eval loop and the core-arc close. Focus: walk-away window, fixed judge integrity, and whether M6 closes the six-module core cleanly.
- **Module 7, From Personal to Team.** Sim the sharing exercise. Focus: outcome interview magic, branch selection, Access-Trust Gap wording, and whether sharing feels like generosity rather than governance.
- **Module 8, Agents Building Agents.** Sim the SharePoint/OneDrive live-deliberation shape. Focus: sync timing, per-participant folder discipline, initial stances, cross-checks, proposal critique, one/two central synthesizers, synthesizer-injected midpoint instructions, and whether the room can push back without losing the thread.

## 2. Capability dry-runs

- **Cowork security permissions.** Bind Module 4 security guidance to Cowork as well as Claude Code: permission choices, folder access, skill creation, connector reach, and what a business participant can actually approve or deny in the UI.
- **Module 4 security skill package + load.** Verify Cowork personal-skill creation through *Customize → Skills → New → Create with Claude*, Desktop/CLI standalone skill install into `~/.claude/skills/security-audit/`, plain-language invocation, and loaded-skill visibility.
- **Module 4 facilitator dry-run.** Run the 90-minute dry-run named in the module: Cowork personal-skill creation, one Cowork participant, one CLI participant, and one freezing-SVP persona.
- **Module 5 four-detector benchmark.** Dry-run four parallel detector agents, scorer stability, precision/recall table, and `judges/groundedness-judge.md` handoff.
- **Module 6 eval loop.** Dry-run generation/judging agent separation, file-write reliability, judge immutability, and `./generation-tactic.md` rewrite reliability.
- **Module 8 SharePoint/OneDrive live-deliberation runtime.** Dry-run 10-20 concurrent writers: participant subfolders, context manifests, stances, cross-checks, proposals, synthesizer-injected midpoint instructions, critiques that consume those instructions, pushback files, central selection rewrites, final `agent-set.md`, final `plan.md`, and sync pauses.

## 3. Maintainer contract normalization

Bring Agents 101 module maintainer blocks closer to the AE101 shape:

- **All modules:** add or verify `Mood target`, `Push-back moves`, `Watch-fors`, `Decision points`, `Plug points`, framework credits, delivery/runtime notes, and explicit Quality-state dimension log.
- **Early-module language audit:** use agent language from the start where Claude acts, while keeping `Claude` for product, UI, and prompt addressee. Module 1 should make the leap from chat to agent feel explicit without adding technical heaviness.
- **Modules 1 and 2:** body touched after maintainer review; re-review needed.
- **Modules 6, 7, 8:** maintainer contracts are visibly thinner than AE101. Normalize before running expensive sims.
- **No `cross_module` row in any A101 maintainer block.** The axis exists (`curriculum/quality-format.md`), fires at module-set scope, and degrades for the whole set when any member is touched. A101 has never carried one.

## 4. Eval instances to fill

- Agents 101 module eval instances for Modules 3, 4, 6, 7, 8 are still missing or stale after the recent reshapes. Fill after the module spines settle and before three-persona sim. (M5 cluster filled 2026-05-04 via curriculum-pre-ship-audit, `agents-101--{exercise--hallucination-bakeoff,lecture--self-consistency-after-scoreboard,module--output-quality}.{writing,story,technical,behavior}.json`.)
- **The 2026-08-19 parity pass moved almost every A101 surface, and all of it owes a re-judge.** All 8 modules, all 15 exercises, 13 lectures. Scope it with `node curriculum/evals/scripts/scan-stale-classes.js --files <f...>` — per-class diff-region routing, NOT all seven classes per body edit. Parked deliberately by Antti that day ("machinery first, judges later"); this bullet is the bill, not a request to pay it now.
- **A101 stamps still carry the retired 4-class set.** Re-stamp on the current seven (`writing / story / technical / behavior / pedagogy / strategy / slides`) plus the `cross_module` row. Correct a claim that was circulating: A101 is not unjudged on the new classes — prefixed instances exist including `.slides`, `.pedagogy` and `.strategy` files, and `claude-basics` has its own set. What is missing is coverage, not a first run.
- **Wire `audit-eval-coverage --training agents-101` into the gate — but only once judging unparks.** The auditor learned `--training` on 2026-08-19 and runs clean mechanically; it reports 3207 holes, which is the honest measurement of an untried training, and a gate that cannot go green until a parked decision unparks is a permanently-red check nobody reads. AE101 stays wired at 429. (Both numbers dropped on 2026-08-19 when the instance-name migration made 843 already-judged rule×file pairs visible to the auditor again — 827 of them A101's.)
- **One instance still names no set:** `claude-basics--cross_module.json` carries no slug, so `check-instance-names.js` cannot derive a name for it. Name the set it judged, or retire it.

## 5. Site / renderer bugs, verification pending

- **Newlines on copy from prompt blocks.** Fix shipped 2026-05-04: `code.innerText` → `code.textContent` in `addCopyButton` (`site/layouts/curriculum.js`). Verify newlines preserve across CLI / Cowork / Desktop / terminal paste targets before first cohort.
- **Paths inside copied prompts auto-converted to markdown links on paste.** Fix shipped 2026-05-04: multi-format clipboard write via `ClipboardItem` (text/plain + text/html). HTML uses `<div>` + `<br>` + `&nbsp;` + `<wbr>` shape, destinations don't recognize as code (no dark-theme styling triggered) and `<wbr>` defeats URL pattern matching on `*.md` strings. Verify across Cowork / Desktop / Slack / terminal that paths land plain and newlines preserve.

## 6. M1 gated prompt fix

- **Close prompt last line, *"shouldn't have to open the file."*** The body now tells the student to inspect `module-1/personal-brand-generation.md`, but the registry prompt still contains the opposite instruction. Prompt-body change requires the maintainer before/after card and `prompt-ok` approval.

## 7. Repeated-Q&A slowness audit (2026-05-15)

Pattern promoted to `check_prompts.md § 35` after AE101 M2 push-back-on-the-plan-2 dry-run hit 13m15s + 37.7K tokens on one Q-and-A turn. Real traps need the five-element fix (lock-in trigger + sectional Edit + three-at-a-time + slowness-watch callout + Approve section); fix-element selection depends on prompt shape (single-shot rewrite vs. iterative grill).

- **`new-human-role-in-the-loop-1.md` (line 11):** *"Keep asking until the dimension is judgeable"* inside an 8–10 minute closing lecture. Could drift into an unbounded eval-design interview. Apply the cadence cap (three-at-a-time + recommend-an-answer) plus an explicit stop condition. Prompt-side and body-side fix both apply.

## 8. Prompt-registry catch-up audit (2026-05-25)

`requires`/`produces` dependency graph now wired across all 16 `a101-*` registry files (root `./CLAUDE.md` lineage explicit: prework scaffold → M2 writes it → M3/M4/M5 compound onto it; lint green). Body re-audit against `check_prompts.md` rules 33–42 (the rules postdating the 2026-05-08 extraction) came back clean: no hard violations, rule 37 already honored in M2/M4/M5, rule 39 correctly absent (a101 has no plan-mode prompts). Open items below.

- **Lead-in consistency (rules 2 / 31).** M2, M3 (handoff), M4, M7, M8 fold the prompt's action into the `## Debrief` framing paragraph; M1, M5, M6 carry a dedicated *"Ask Claude to <verb>."* lead-in line above the marker. The framing sentences do mirror the prompt opening (rule 38 satisfied in substance), so this is skim-cue consistency, not correctness. Module-body prose, not maintainer-gated. Decide whether to normalize the five toward the M1/M5/M6 shape.
- **`a101-m3-homework-memory-health` wide paragraph (rule 36).** Prompt body is one paragraph carrying ~5 moves (look / check health / name a drop / restructure / show-before-write). Split by move for scan-affordance. Prompt body, maintainer-approval-gated edit (BEFORE/AFTER card before applying).
- **Mechanical (tmux-runner) coverage for a101, PARTIAL (2026-06-06).** Vertical slice built and green: prework + M1 + M2 drive headless on a synthetic persona (Ingrid/Nordveil) via `run-a101.sh` + `arrange-agents-101.sh` + `chain-agents-101.sh` + `scenarios/a101-{prework,m1,m2}.txt` + `fixtures/agents-101-synthetic/`. M3–M7 still have no scenarios; M8 deferred (needs synthetic peer room). `check_prompts.md` rule 42 (AUQ-suppression) now exercised for prework/M1/M2 prompts only. Harness is headless-Code only (not Cowork). Extend to M3+ after the three-persona sim sweep. The prompt/experience findings that slice surfaced were all resolved (2026-06-06).

---

**Canonical home:** this file. New pre-cohort open items go here, not into module files, unless the item is a local maintainer note needed by the trainer while delivering that specific module.

**When an item closes:** delete the bullet. Git log carries the history. Do not annotate "done".
