# Pre-cohort punchlist, Agents 101

Everything that needs to land before the first paying Agents 101 cohort. Grouped by kind of work, not by module.

Delete items when done. Git is the history; this file is current state.

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

## 4. Maintainer contract normalization

Bring Agents 101 module maintainer blocks closer to the AE101 shape:

- **All modules:** add or verify `Mood target`, `Push-back moves`, `Watch-fors`, `Decision points`, `Plug points`, framework credits, delivery/runtime notes, and explicit Quality-state dimension log.
- **Early-module language audit:** use agent language from the start where Claude acts, while keeping `Claude` for product, UI, and prompt addressee. Module 1 should make the leap from chat to agent feel explicit without adding technical heaviness.
- **Modules 1 and 2:** body touched after maintainer review; re-review needed.
- **Modules 6, 7, 8:** maintainer contracts are visibly thinner than AE101. Normalize before running expensive sims.
- **Module 5:** move the `Quality:` line to the top of the maintainer block on next edit so it matches the project shape.

## 5. Cross-module artifact contracts

- **Automated contract audit before cohort.** Re-run `node scripts/audit-training-artifact-contracts.js --training agents-101` after the next module-body touch. Keep missing sections, uncontracted produced mentions, consumer-without-producer, weak consumers, and order problems at zero. Review identifier-drift groups manually; they are naming prompts, not automatic failures.

## 6. Unclear / design-choice flags

These are not easy to choose from text alone. Decide before polishing body further.

- **Module 7 prework load.** The three-walls packet plus Rumelt, Martin, and Klein may be too much for a business audience between modules. Decide which are required and which are facilitator/background.

## 7. Scaffold and reference disposition

- **Module 4 policy references.** Confirm Nordic-baseline reference files exist in the starter package and customer-distilled files have a prep checklist.
- **Module 5 superseded `ground-your-output.md`.** Decide whether to keep as supplementary or add a redirect to `hallucination-bakeoff.md` / `eval-loop.md`.
- **Claude quick reference Cowork mode.** `curriculum/trainings/agents-101/reference/claude-quick-reference.md` has Agents 101 Cowork facts, but no Cowork-mode student-facing section for plan-mode simulation, connector paths, personal-skill creation, scheduling, and file/folder attachment. Add before relying on it from Cowork-facing prework.
- **Module 7 pattern catalog.** Pattern catalog contains intentional `[TODO]` fields. Confirm this is still desired before first cohort; otherwise fill examples.
- **Wire `agent-ready-data.md` and `personal-to-company-gap.md` into Agents 101.** Both ship in `curriculum/trainings/agents-101/supplementary/` but aren't declared in the TRAININGS registry (`site/layouts/curriculum.js` → `agents-101.supplementaries`) and no module body links them. Pick which module(s) each serves, add body link, register. Until then the workbook surfaces nothing for them; the files ride along in any tarball that reads the dir directly.
- **Wire `agent-trigger-list.md` into Agents 101, or remove.** Same orphan shape: ships in `curriculum/trainings/agents-101/supplementary/` but no registry entry and no module link. The 2026-05-09 audit also flagged that its line-92 prompt pastes Agents-101-style paths (`./crux.md`, `module-3/stances/`, `judges/groundedness-judge.md`), confirm these resolve in the current Agents-101 starter scaffold before wiring; if any path has drifted, fix before students paste.

### `claude-quick-reference.md` audit findings (2026-05-09; refreshed 2026-05-14)

Captured by audit subagent against the Agents-101 reference file. Some items now have evidence from the 2026-05-14 AE101 verification pass.

**HIGH (own-audience):**

- **Three "*Official docs:..."* references with no clickable URL** in `claude-quick-reference.md` (currently lines ~104, 147, 155, file tools, Skills, Subagents). SVP audience needs the link, not a generic pointer.

**LOW:**

- **Lines 159, 169, em-dashes on customer-facing content.** Per `check_sales_copy.md` "no em dashes on site." Convert to comma or sentence break.
- **Line 119 hedge-stack borderline** ("Less automation, same teaching value..."); quick clean-up.

## 8. Eval instances to fill

- Agents 101 module eval instances for Modules 3, 4, 6, 7, 8 are still missing or stale after the recent reshapes. Fill after the module spines settle and before three-persona sim. (M5 cluster filled 2026-05-04 via curriculum-pre-ship-audit, `agents-101--{hallucination-bakeoff,self-consistency-after-scoreboard,output-quality}.{writing,story,technical,behavior}.json`.)

## 9. Site / renderer bugs, verification pending

- **Newlines on copy from prompt blocks.** Fix shipped 2026-05-04: `code.innerText` → `code.textContent` in `addCopyButton` (`site/layouts/curriculum.js`). Verify newlines preserve across CLI / Cowork / Desktop / terminal paste targets before first cohort.
- **Paths inside copied prompts auto-converted to markdown links on paste.** Fix shipped 2026-05-04: multi-format clipboard write via `ClipboardItem` (text/plain + text/html). HTML uses `<div>` + `<br>` + `&nbsp;` + `<wbr>` shape, destinations don't recognize as code (no dark-theme styling triggered) and `<wbr>` defeats URL pattern matching on `*.md` strings. Verify across Cowork / Desktop / Slack / terminal that paths land plain and newlines preserve.

## 10. Repeated-Q&A slowness audit (2026-05-15)

Pattern promoted to `check_prompts.md § 35` after AE101 M2 push-back-on-the-plan-2 dry-run hit 13m15s + 37.7K tokens on one Q-and-A turn. Real traps need the five-element fix (lock-in trigger + sectional Edit + three-at-a-time + slowness-watch callout + Approve section); fix-element selection depends on prompt shape (single-shot rewrite vs. iterative grill).

- **`new-human-role-in-the-loop-1.md` (line 11):** *"Keep asking until the dimension is judgeable"* inside an 8–10 minute closing lecture. Could drift into an unbounded eval-design interview. Apply the cadence cap (three-at-a-time + recommend-an-answer) plus an explicit stop condition. Prompt-side and body-side fix both apply.

## 11. Key Concepts critical pass (2026-05-18)

AE101 M1–M6 received a `check_strategy_tie_in.md` § 3–6 critical pass this session. Eleven instances of curriculum-meta in Key Concepts bullets across six files (module-number references, *"the exercise,"* *"the exercise window,"* *"no lecture can land,"* *"not from a slide,"* *"this module's reading,"* *"in this training"*). Also found: inverted-direction breadcrumbs (90%-trust-prior instead of 10%-discipline-hunt), verbatim breadcrumb duplication across adjacent modules, redundant body-and-breadcrumb saying the same thing, and brochure/value-prop tails (*"a move you'll use forever"*).

Agents 101 hasn't had the equivalent pass. Apply same critical review to the eight modules' Key Concepts sections before first cohort. Look for:

- Curriculum-meta: any bullet referencing Module N, *the exercise*, *this module*, *the lecture*, *the slide*, *this training*. Belongs in `## Next` / `## Bridge` / maintainer block.
- Inverted breadcrumb direction: *"Remember: assume 90% on first pass"* trust-prior framing should be *"Remember: at least 10% wrong"* discipline-hunt framing. The breadcrumb's verb must name the move, not the trust ratio.
- Verbatim breadcrumb repetition across adjacent modules, themes recur, exact phrasings shouldn't.
- Body + breadcrumb saying the same thing, drop one (usually the body's repetitive sentence).
- Brochure tails, *"a move you'll use forever,"* *"a lesson no lecture can land."* Value-prop register; cut.
- Lead bullet check: is it worldview or curriculum-summary? If summary, demote.

Pattern lives in `check_strategy_tie_in.md` § 6; compendium amendment for explicit curriculum-meta sub-rule expected at the same wind-down that filed this TODO.

---

**Canonical home:** this file. New pre-cohort open items go here, not into module files, unless the item is a local maintainer note needed by the trainer while delivering that specific module.

**When an item closes:** delete the bullet. Git log carries the history. Do not annotate "done".
