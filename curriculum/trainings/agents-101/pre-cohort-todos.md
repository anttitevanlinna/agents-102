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

## 3. Source verification

- **Module 3 practitioner roster.** Verify URLs in `exercises/module-3-prework.md`; replace any stale practitioner source before cohort delivery.
- **Module 4 risk/stat reading.** Verify shadow-agent and 82%-think-protected / 24%-visibility source before using in student-facing prework.
- **Module 5 cases.** Add stable source URLs for Mata v. Avianca and Deloitte Australia / DEWR welfare-compliance report.
- **Module 6 readings.** Add URL for Ethan Mollick, "Garbage Can and Bitter Lesson".
- **Module 7 Access-Trust Gap.** Current quantitative range is unverified. Keep qualitative wording unless a primary or fresh reliable source with methodology appears.
- **No `Source verification` blocks anywhere in A101 (2026-08-19).** The five bullets above name claims to check; this one names the missing machinery that would keep them checked. AE101 carries per-source `[checked:… result:… due:…]` stamps inside `Source verification` blocks, audited by `curriculum/evals/scripts/source-freshness.sh --target <cohort-date>`. All nine A101 module files carry zero. Until they exist, source freshness for this training is a memory exercise. Format: `curriculum/source-freshness-format.md`; rule: `check_research_claims.md §11a`, with the `result:ATTESTED` carve-out for a maintainer's own word.

## 4. Maintainer contract normalization

Bring Agents 101 module maintainer blocks closer to the AE101 shape:

- **All modules:** add or verify `Mood target`, `Push-back moves`, `Watch-fors`, `Decision points`, `Plug points`, framework credits, delivery/runtime notes, and explicit Quality-state dimension log.
- **Early-module language audit:** use agent language from the start where Claude acts, while keeping `Claude` for product, UI, and prompt addressee. Module 1 should make the leap from chat to agent feel explicit without adding technical heaviness.
- **Modules 1 and 2:** body touched after maintainer review; re-review needed.
- **Modules 6, 7, 8:** maintainer contracts are visibly thinner than AE101. Normalize before running expensive sims.
- **No `cross_module` row in any A101 maintainer block.** The axis exists (`curriculum/quality-format.md`), fires at module-set scope, and degrades for the whole set when any member is touched. A101 has never carried one.
- **No `<!-- backing -->` blocks in A101 module files (2026-08-19).** AE101 has 9. The claim/source/framework/stance ledger is what lets `/lecture-ooda` find what a claim rests on. Note the shared library is better off than the modules: `curriculum/lectures/when-to-split-an-agent.md` carries a full one with stance level and OODA roster, so the pattern already has a worked example inside this training's own reading. Priority targets: `output-quality.md`'s 85%x10 reliability math, and the 82%/24% stat shared with Module 4. Format: `curriculum/backing-format.md`.

## 5. Cross-module artifact contracts

- **Automated contract audit before cohort.** Re-run `node scripts/audit-training-artifact-contracts.js --training agents-101` after the next module-body touch. Keep missing sections, uncontracted produced mentions, consumer-without-producer, weak consumers, and order problems at zero. Review identifier-drift groups manually; they are naming prompts, not automatic failures.

## 6. Unclear / design-choice flags

These are not easy to choose from text alone. Decide before polishing body further.

- **Module 7 prework load.** The three-walls packet plus Rumelt, Martin, and Klein may be too much for a business audience between modules. Decide which are required and which are facilitator/background.
- **`## Optional challenges` exists in all 7 AE101 modules and 0 of 9 A101 modules** — and is not in `curriculum/module-shape.md`, so neither training is out of contract. Authoring nine of them is curriculum expansion, not parity. Decide whether A101 wants the section at all before anyone writes one.
- **A101's single `trainer-guide.md` versus AE101's per-module `trainer-modules.md` run-sheets.** A deliberate format choice, not a gap to close by building. Decide which shape this training's trainers actually want.
- **`## Key Concepts` sits ABOVE `## Debrief` in all eight A101 modules**, where `curriculum/module-shape.md` puts the recap after the last teaching section. Consistent, and older than any recent pass. Moving it changes the training's shape rather than its machinery, so it was left alone on 2026-08-19. Decide whether the canon or the practice is wrong.
- **A101 exercises use a different lead-in architecture from AE101's trio, and it is not yet decided.** Seventeen A101 exercises put `**What you do:**` at the top as a heading over multi-paragraph prose and carry `**What happened:**` and `**The point:**` at the BOTTOM as closing sections; fifteen have no `**What you build:**` at all. That is a consistent training-level architecture, not seventeen oversights, and the point landing last is plausibly the design. **Maintainer call 2026-08-15: leave A101 alone for now** (carried in `check_pedagogy.md` §52c so judges do not flag the files). The open question is whether A101 adopts the trio or the corpus sanctions a second shape, and it is one decision for the whole training, never file-by-file. Note if it goes the trio way: the 2026-08-12 audit's proposed replacements would delete instruction that exists nowhere else, such as `build-your-challenge-memory`'s challenge-scoping examples and its *narrow enough that 5–8 topic pages cover it* bound, because they were written against slot word count rather than against what the prose was carrying.
- **`build-workbook.js --theory` aborts for A101** because `THEORY_HANDBOOK_MANIFEST` has no A101 entry. Checked 2026-08-19: the theory layer (`theory-plan.md` / `theory-audit.md` / `theory-evals.md`) is AE101-only IP and A101 has no theory spine to compile, so the abort is correct and its error message already says so. Recorded here only so it is not re-proposed as a bug.

## 7. Scaffold and reference disposition

- **Module 4 policy references.** Confirm Nordic-baseline reference files exist in the starter package and customer-distilled files have a prep checklist.
- **Module 5 superseded `ground-your-output.md`.** Decide whether to keep as supplementary or add a redirect to `hallucination-bakeoff.md` / `eval-loop.md`.
- **Claude quick reference Cowork mode.** `curriculum/trainings/agents-101/reference/claude-quick-reference.md` has Agents 101 Cowork facts, but no Cowork-mode student-facing section for plan-mode simulation, connector paths, personal-skill creation, scheduling, and file/folder attachment. Add before relying on it from Cowork-facing prework.
- **Module 7 pattern catalog.** Pattern catalog contains intentional `[TODO]` fields. Confirm this is still desired before first cohort; otherwise fill examples.
- **Wire `agent-ready-data.md` and `personal-to-company-gap.md` into Agents 101, or delete them.** Both ship in `curriculum/trainings/agents-101/supplementary/` but aren't declared in the TRAININGS registry (`site/layouts/curriculum.js` → `agents-101.supplementaries`) and no module body links them. **Read them before deciding (2026-08-19):** each is five lines of student intro above a `<!-- maintainer -->` fence at line 7 / line 9, and everything below the fence is Pass-2 planning notes — intended examples, module touchpoints, named-company research leads. They are not thin pages, they are outlines. Their only inbound links are from each other and from maintainer notes. Registering them ships an outline to students; deleting them loses the Pass-2 plan. Pick which module each serves and write it, or cut it — this is a maintainer call, not sweep work.
- **Verify `agent-trigger-list.md`'s pasted paths.** Registered in the TRAININGS registry 2026-08-19 (it had six inbound body links and was reachable-but-unlistable, never a dead link — the loader fetches by path). Still open from the 2026-05-09 audit: its line-92 prompt pastes Agents-101-style paths (`./crux.md`, `module-3/stances/`, `judges/groundedness-judge.md`), confirm these resolve in the current Agents-101 starter scaffold before wiring; if any path has drifted, fix before students paste.

### `claude-quick-reference.md` audit findings (2026-05-09; refreshed 2026-05-14)

Captured by audit subagent against the Agents-101 reference file. Some items now have evidence from the 2026-05-14 AE101 verification pass.

**HIGH (own-audience):**

- **Three "*Official docs:..."* references with no clickable URL** in `claude-quick-reference.md` (currently lines ~104, 147, 155, file tools, Skills, Subagents). SVP audience needs the link, not a generic pointer.

**LOW:**

- **Lines 159, 169, em-dashes on customer-facing content.** Per `check_sales_copy.md` "no em dashes on site." Convert to comma or sentence break.
- **Line 119 hedge-stack borderline** ("Less automation, same teaching value..."); quick clean-up.

## 8. Eval instances to fill

- Agents 101 module eval instances for Modules 3, 4, 6, 7, 8 are still missing or stale after the recent reshapes. Fill after the module spines settle and before three-persona sim. (M5 cluster filled 2026-05-04 via curriculum-pre-ship-audit, `agents-101--{exercise--hallucination-bakeoff,lecture--self-consistency-after-scoreboard,module--output-quality}.{writing,story,technical,behavior}.json`.)
- **The 2026-08-19 parity pass moved almost every A101 surface, and all of it owes a re-judge.** All 8 modules, all 15 exercises, 13 lectures. Scope it with `node curriculum/evals/scripts/scan-stale-classes.js --files <f...>` — per-class diff-region routing, NOT all seven classes per body edit. Parked deliberately by Antti that day ("machinery first, judges later"); this bullet is the bill, not a request to pay it now.
- **A101 stamps still carry the retired 4-class set.** Re-stamp on the current seven (`writing / story / technical / behavior / pedagogy / strategy / slides`) plus the `cross_module` row. Correct a claim that was circulating: A101 is not unjudged on the new classes — prefixed instances exist including `.slides`, `.pedagogy` and `.strategy` files, and `claude-basics` has its own set. What is missing is coverage, not a first run.
- **Wire `audit-eval-coverage --training agents-101` into the gate — but only once judging unparks.** The auditor learned `--training` on 2026-08-19 and runs clean mechanically; it reports 3207 holes, which is the honest measurement of an untried training, and a gate that cannot go green until a parked decision unparks is a permanently-red check nobody reads. AE101 stays wired at 429. (Both numbers dropped on 2026-08-19 when the instance-name migration made 843 already-judged rule×file pairs visible to the auditor again — 827 of them A101's.)
- **One instance still names no set:** `claude-basics--cross_module.json` carries no slug, so `check-instance-names.js` cannot derive a name for it. Name the set it judged, or retire it.

## 9. Site / renderer bugs, verification pending

- **Newlines on copy from prompt blocks.** Fix shipped 2026-05-04: `code.innerText` → `code.textContent` in `addCopyButton` (`site/layouts/curriculum.js`). Verify newlines preserve across CLI / Cowork / Desktop / terminal paste targets before first cohort.
- **Paths inside copied prompts auto-converted to markdown links on paste.** Fix shipped 2026-05-04: multi-format clipboard write via `ClipboardItem` (text/plain + text/html). HTML uses `<div>` + `<br>` + `&nbsp;` + `<wbr>` shape, destinations don't recognize as code (no dark-theme styling triggered) and `<wbr>` defeats URL pattern matching on `*.md` strings. Verify across Cowork / Desktop / Slack / terminal that paths land plain and newlines preserve.

## 11. M1 source-shape fixes flagged via Claude Basics bonus M4 port (2026-05-21)

When porting `exercises/personal-site-with-guardrails.md` to Claude Basics bonus M4 as `-cb`, the pedagogy-class judge flagged five source-shape issues that the original 2026-04-30 draft never received a pedagogy-class audit on (the class came online 2026-05-14). The `-cb` port has these fixes applied; the canonical Agents 101 file still carries the source shape. Decide whether to backport.

- **Phase 1 body, scripted-reaction sentence.** *"Don't skip it, even if your instinct is 'I know what's coming.'"* prescribes overriding the student's instinct; not a forcing function. Removal test passes (Phase 1 pedagogy survives the cut). Per `check_pedagogy.md` rule 16. `-cb` cuts the sentence.
- **Close prompt last line, *"shouldn't have to open the file."*** Exact rule 31(a) anti-pattern, explicitly tells the student not to verify at the artifact. `-cb` keeps the chat summary instruction but adds a body sentence after the prompt: open the file, read the first two rules, push back if a rule doesn't match what actually happened.
- **No leap test in maintainer block.** Three observable Monday-morning outcomes required per rule 45. `-cb` adds them: site.html, personal-brand-generation.md, felt distinction between *generic* and *genuinely mine*.
- **No per-phase failure mode + escape hatch.** Each phase's forcing function needs a row per rule 47. `-cb` adds a 7-row table (Phases 1–6 + Close).
- **Phase 5 warm-session self-audit, no convenience-bias callout.** Rule 50 fires: the convenience choice (same session, no cold subagent) accepts the known LLM self-charity bias. `-cb` adds a body callout after the prompt naming the bias and offering two escape hatches (over-flag re-run, or paste Phase 1 site cold into a fresh session).

Module file `getting-going.md` also had two strategy-class findings flagged at the same audit: KC bullet 3 is grammatically truncated (*"average output becomes great not because you prompted better"*, missing the *"but because [Y]"* tail) and WYL bullet 3 leads with the failure-mode noun *"fabrication"*. Both source-side too. `-cb` module fixes applied; backport pending.

## 10. Repeated-Q&A slowness audit (2026-05-15)

Pattern promoted to `check_prompts.md § 35` after AE101 M2 push-back-on-the-plan-2 dry-run hit 13m15s + 37.7K tokens on one Q-and-A turn. Real traps need the five-element fix (lock-in trigger + sectional Edit + three-at-a-time + slowness-watch callout + Approve section); fix-element selection depends on prompt shape (single-shot rewrite vs. iterative grill).

- **`new-human-role-in-the-loop-1.md` (line 11):** *"Keep asking until the dimension is judgeable"* inside an 8–10 minute closing lecture. Could drift into an unbounded eval-design interview. Apply the cadence cap (three-at-a-time + recommend-an-answer) plus an explicit stop condition. Prompt-side and body-side fix both apply.

## 12. Prompt-registry catch-up audit (2026-05-25)

`requires`/`produces` dependency graph now wired across all 16 `a101-*` registry files (root `./CLAUDE.md` lineage explicit: prework scaffold → M2 writes it → M3/M4/M5 compound onto it; lint green). Body re-audit against `check_prompts.md` rules 33–42 (the rules postdating the 2026-05-08 extraction) came back clean: no hard violations, rule 37 already honored in M2/M4/M5, rule 39 correctly absent (a101 has no plan-mode prompts). Open items below.

- **Lead-in consistency (rules 2 / 31).** M2, M3 (handoff), M4, M7, M8 fold the prompt's action into the `## Debrief` framing paragraph; M1, M5, M6 carry a dedicated *"Ask Claude to <verb>."* lead-in line above the marker. The framing sentences do mirror the prompt opening (rule 38 satisfied in substance), so this is skim-cue consistency, not correctness. Module-body prose, not maintainer-gated. Decide whether to normalize the five toward the M1/M5/M6 shape.
- **`a101-m3-homework-memory-health` wide paragraph (rule 36).** Prompt body is one paragraph carrying ~5 moves (look / check health / name a drop / restructure / show-before-write). Split by move for scan-affordance. Prompt body, maintainer-approval-gated edit (BEFORE/AFTER card before applying).
- **The graph closes clean but it is sparse (2026-08-19).** All 16 `a101-*` registry files declare `requires`/`produces`, and `personal-agent-homework`'s three prompts were migrated and declared that day, so the corpus is fully registry-migrated and the validator is green for both trainings. But most A101 *exercise* prompts still declare nothing, and a graph with no declared inputs cannot produce a PREMATURE — only a DANGLING. AE101 declares roughly half its prompts. Backfilling the rest is what turns the validator from a spell-checker into an ordering check.
- **Mechanical (tmux-runner) coverage for a101, PARTIAL (2026-06-06).** Vertical slice built and green: prework + M1 + M2 drive headless on a synthetic persona (Ingrid/Nordveil) via `run-a101.sh` + `arrange-agents-101.sh` + `chain-agents-101.sh` + `scenarios/a101-{prework,m1,m2}.txt` + `fixtures/agents-101-synthetic/`. M3–M7 still have no scenarios; M8 deferred (needs synthetic peer room). `check_prompts.md` rule 42 (AUQ-suppression) now exercised for prework/M1/M2 prompts only. Harness is headless-Code only (not Cowork). Extend to M3+ after the three-persona sim sweep. The prompt/experience findings that slice surfaced were all resolved (2026-06-06).

---

**Canonical home:** this file. New pre-cohort open items go here, not into module files, unless the item is a local maintainer note needed by the trainer while delivering that specific module.

**When an item closes:** delete the bullet. Git log carries the history. Do not annotate "done".
