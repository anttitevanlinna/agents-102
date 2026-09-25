# Round 3 research: agents that learn from prior experience

**Research date:** 2026-09-06  
**Freshness cutoff:** 2026-03-06. Papers first posted before the cutoff appear only in the historical section.  
**Scope:** Primary papers, their official project pages, and author code repositories. No company claims, general press, surveys, or secondary summaries are used as evidence.

## Bottom line for AE101 M9

Recent experiments support a bounded claim: an agent can collect execution traces, induce candidate procedural guidance, persist that guidance outside model weights, and load it in a later run. The evidence does **not** support a general claim that agents reliably improve themselves. Every method below is a single research program, most results come from benchmarks, and selection, regression testing, and cost accounting change the conclusion. Provisional evidence level: **L2**.

The best-supported classroom framing is **controlled artifact improvement**:

1. run a genuinely tool-using agent and preserve the full trace plus outcome;
2. compare success and failure behavior, then write a small candidate rule with provenance;
3. gate the candidate against a fresh, held-out task and the no-rule baseline;
4. let a human accept or reject the diff;
5. store the accepted rule as a readable, reversible artifact;
6. load it selectively in a new session and measure repairs, regressions, token cost, and new risk.

This sequence is an inference from the trace distillation, paired verification, fresh-agent audit, and file-level rollback mechanisms in [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`, [SkillEvolver](https://arxiv.org/abs/2605.10500) `[academic]`, [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`, and [Agentic Harness Engineering](https://arxiv.org/abs/2604.25850) `[academic]`. None of those papers tests the exact M9 sequence with a human admission gate.

## Evidence gate and level

Bylines were checked on the linked arXiv title pages. The recent papers below have distinct author groups. The studies pass the three admissibility gates: they involve agents acting through tools or executable environments, come from identifiable research teams rather than the vendors whose products are being sold, and report task outcomes or ablations. They remain **L2 single experiments** individually. Nine distinct recent teams point toward the usefulness of verified external artifacts, but that is short of the repository's L3 requirement of 10 to 20 independent practitioners converging on the same result. No L4 cross-domain conclusion is earned. Source roster: [AHE](https://arxiv.org/abs/2604.25850) `[academic]`; [ERL](https://arxiv.org/abs/2603.24639) `[academic]`; [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`; [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`; [SkillEvolver](https://arxiv.org/abs/2605.10500) `[academic]`; [CoEvoSkills](https://arxiv.org/abs/2604.01687) `[academic]`; [Socratic-SWE](https://arxiv.org/abs/2606.07412) `[academic]`; [budget-constrained web agents](https://arxiv.org/abs/2606.15017) `[academic]`; [financial self-evolution audit](https://arxiv.org/abs/2608.17684) `[academic]`.

## Recent primary studies

### 1. Agentic Harness Engineering, closest recent SWE match

- **Paper and date:** [Agentic Harness Engineering, 2026-04-28](https://arxiv.org/abs/2604.25850) `[academic]`; [official implementation](https://github.com/china-qijizhifeng/agentic-harness-engineering) `[practitioner direct]`.
- **Loop:** Run coding-agent rollouts, normalize and distill raw traces into task reports and a benchmark overview, attribute outcomes to the previous change manifest, have an evolver edit file-represented harness components, record predicted fixes and regressions, commit the revision, and retain or revert it after the next evaluation. The base model stays fixed; tools, middleware, prompts, skills, subagent configuration, and long-term memory are the editable surface. [AHE](https://arxiv.org/abs/2604.25850) `[academic]`.
- **Outcome:** One 10-iteration, roughly 32-hour Terminal-Bench 2 campaign moved pass@1 from 69.7% to 77.0%. On frozen SWE-bench Verified transfer, the seed scored 75.2% and the evolved harness 75.6%, while token use fell 12%. The aggregate gain was only 0.4 points, and scikit-learn, pydata, and astropy regressed. [AHE](https://arxiv.org/abs/2604.25850) `[academic]`.
- **Ablations and failure:** Memory-only reached 75.3%, tool-only 73.0%, middleware-only 71.9%, system-prompt-only 67.4%, and the full harness 77.0%. The evolver predicted fixes better than chance, but regression precision and recall were only 11.8% and 11.1%. Components interacted non-additively. Only Terminal-Bench 2 evolution and SWE-bench transfer were studied; human-in-the-loop workflows were not tested. [AHE](https://arxiv.org/abs/2604.25850) `[academic]`.
- **M9 read:** Strong evidence for trace distillation, explicit diffs, predicted effects, rollback, and preserving raw evidence for drill-down. Weak evidence for broad transfer. Its automatic self-modification is riskier than M9's proposed human-gated rule harvest.

### 2. Experiential Reflective Learning, compact external heuristic memory

- **Paper and date:** [Experiential Reflective Learning, 2026-03-25](https://arxiv.org/abs/2603.24639) `[academic]`.
- **Loop:** After each ReAct task, store the task, reasoning and tool trajectory, tool outputs, and binary result. A reflection step writes a structured heuristic with trigger conditions and actions. At test time an LLM decomposes the new task, selects top-ranked heuristics from a persistent pool, and injects them into context. Model weights do not change. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`.
- **Outcome:** On Gaia2, ERL scored 56.1% versus 48.3% for ReAct across three runs. Raw-trajectory few-shot prompting scored 46.4%, below the baseline. LLM selection over a candidate pool outperformed no retrieval, embedding retrieval, and random retrieval. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`.
- **Ablations and failure:** Self-assessed outcomes were correct only 70% of the time and reduced ERL to 51.2%, so external verification mattered. Adding too much random memory degraded performance after roughly 40 to 60 memories. On the separate tau-squared benchmark the overall gain was small, 36.7% to 38.0%, and one domain regressed. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`.
- **M9 read:** Supports distilling traces into small trigger-action rules and loading only relevant items. It also supplies direct counter-evidence against replaying whole traces or accepting the agent's own success judgment.

### 3. SkillGen, paired repairs-versus-regressions selection

- **Paper and date:** [SkillGen, 2026-05-09](https://arxiv.org/abs/2605.10999) `[academic]`; [official implementation](https://github.com/yccm/SkillGen) `[practitioner direct]`.
- **Loop:** Collect baseline successes and failures, cluster and contrast nearby trajectories, synthesize a readable skill, run the same verification instances with and without it, count repairs and regressions, refine from structured feedback, and return the candidate with the largest verified net effect. Persisted skills are marked active or deprecated; model weights stay fixed. [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`.
- **Outcome:** Across eight evaluated base models, held-out average gains ranged from 3.27 to 10.08 percentage points. LiveCodeBench results were mixed, including zero gains for several models and small positive gains for others, so this is not repository-level SWE evidence. [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`.
- **Ablations and failure:** At round 8, the latest candidate had expected effect of -3.1 points while the best previously verified candidate was +8.1 points. The admission and best-so-far gate was therefore load-bearing. Even accepted skills sometimes overgeneralized on the final held-out split. The paper recommends application-specific safety evaluation and human review before deployment. [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`.
- **M9 read:** The cleanest empirical basis for diffing a new run against the baseline, measuring both fixed and newly broken cases, and rejecting a plausible rule that lacks positive net effect.

### 4. MIND-Skill, checking whether a rule preserves procedural content

- **Paper and date:** [MIND-Skill, 2026-05-09](https://arxiv.org/abs/2605.08670) `[academic]`.
- **Loop:** An induction agent extracts a structured skill from a successful ReAct trajectory. A frozen deduction agent receives only the task and skill, then tries to reconstruct the procedure in a live environment. Reconstruction, execution outcome, and documentation/abstraction rubrics produce textual losses that update the induction prompt through TextGrad. The best skill is retained and retrieved later; base-agent weights stay fixed. [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`.
- **Ablations and failure:** Removing reconstruction reduced AppWorld Challenge task-goal completion from 51.8 to 45.8. Removing the abstraction rubric reduced Normal completion from 71.4 to 64.3 and increased instance-specific leakage. Execution outcome checks caught runtime errors and silent API failures that text judgment missed. The method requires successful source trajectories and was evaluated on AppWorld and BFCL-v3, not SWE-bench. [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`.
- **M9 read:** A harvested rule should be tested by a fresh agent that sees the rule, not the harvester's private reasoning. A rule also needs a specificity check: enough procedure to act, without constants copied from one bug.

### 5. SkillEvolver and CoEvoSkills, fresh-agent use and iterative verification

- **Papers and dates:** [SkillEvolver, 2026-05-11](https://arxiv.org/abs/2605.10500) `[academic]`; [official implementation](https://github.com/THU-AICosmos/skillevolver) `[practitioner direct]`. [CoEvoSkills, 2026-04-02](https://arxiv.org/abs/2604.01687) `[academic]`; [official implementation](https://github.com/Zhang-Henry/CoEvoSkills) `[practitioner direct]`.
- **SkillEvolver loop:** Run four strategy-diverse trials, contrast high- and low-reward traces, patch the current prose-and-code skill, deploy it to a separate fresh agent, and admit it only after a clean-context audit for leakage, hard-coded constants, missing scripts, and silent bypass. A second iteration lifted the 83-task SkillsBench aggregate from 48.2% to 56.87%. The headline sweep used one model and harness, the refinement depth stopped at two, and repository repair was not tested. [SkillEvolver](https://arxiv.org/abs/2605.10500) `[academic]`.
- **CoEvoSkills loop:** Generate a multi-file skill from task background, execute it, have a separate surrogate verifier construct deterministic checks and return actionable diagnostics, revise the skill, periodically check it against an opaque ground-truth oracle, and release the validated artifact read-only. The full method scored 71.1% on its SkillsBench ablation set; removing the surrogate verifier scored 41.1%, and removing evolution scored 42.4%. Those ablation rows were single runs. [CoEvoSkills](https://arxiv.org/abs/2604.01687) `[academic]`.
- **M9 read:** Both support fresh-context evaluation and an explicit gate before compounding. CoEvoSkills begins from provided background knowledge rather than historical work sessions, so it is adjacent evidence, not a direct trace-harvesting match.

### 6. Socratic-SWE, trace-derived skills that ultimately update weights

- **Paper and date:** [Socratic-SWE, 2026-06-05](https://arxiv.org/abs/2606.07412) `[academic]`.
- **Loop:** Collect successful and failed repository-solving traces, distill recurring behavior into a structured skill registry, use those skills to generate new repository repair tasks, filter tasks with format, grounding, execution, and semantic checks, then train the shared Generator/Solver weights with reinforcement learning. New weights generate the next trace corpus. [Socratic-SWE](https://arxiv.org/abs/2606.07412) `[academic]`.
- **Outcome and ablation:** Under a fixed 36,000-instance training budget, SWE-bench Verified moved from 42.6% to 50.4% after three iterations. Removing the skill registry scored 46.2%; replacing trace distillation with manual skills scored 48.0%. The process nearly plateaued by iteration five at 52.0% because the fixed repository pool produced redundant signal. [Socratic-SWE](https://arxiv.org/abs/2606.07412) `[academic]`.
- **M9 read:** This is strong SWE-specific evidence that traces can shape a future training curriculum. It is **not** evidence for M9's lightweight memory loop: the durable change is in trained model weights, the process needs tens of thousands of generated tasks, and it depends on a fixed held-out validation gradient.

## Counter-evidence and risk findings

- **Memory may lose to more direct work at equal cost.** A 2026-06-12 study compared AWM, ASI, and ReasoningBank with a token-matched vanilla actor across four WebArena domains and three models. The vanilla actor matched or exceeded every augmented method in aggregate and often used fewer tokens. The authors limit the conclusion to largely self-contained web tasks, but the result requires M9 to count all reflection, retrieval, and verification tokens rather than treating memory as free. [Budget-Constrained Web Agents](https://arxiv.org/abs/2606.15017) `[academic]`.
- **Benign experience can widen the attack surface.** In a 2026-08-18 simulated banking audit, one evolved skill method raised utility from 0.741 to 0.837 but also produced 10 correct-to-wrong regressions, raised exposure to injected content from 0.820 to 0.943, and raised unauthorized financial state changes from 0.583 to 0.685. The authors ran three independently evolved lineages but one primary executor and one environment, so this is an L2 warning, not a general rate. [Auditing Self-Evolution in Financial Agents](https://arxiv.org/abs/2608.17684) `[academic]`.
- **Artifact/executor mismatch can mimic improvement or safety.** In the same audit, an AWM workflow copied from a text-action environment did not operate correctly under native function calling. Removing only the incompatible action tags changed utility from 0.319 to 0.756 and attack success from 0.195 to 0.575. A learned rule must therefore be tested through the exact loader and tool interface used in the next session. [Auditing Self-Evolution in Financial Agents](https://arxiv.org/abs/2608.17684) `[academic]`.
- **Automatic admission remains fallible.** SkillGen's gate rejected large candidate regressions but still admitted some skills that failed on final held-out data. AHE's evolver missed most coming regressions. These results support human review as a prudent control, but no located experiment isolates the causal benefit of human review over automated selection. [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`; [Agentic Harness Engineering](https://arxiv.org/abs/2604.25850) `[academic]`.

## Historical lineages, outside the freshness window

These sources explain the method lineage but are not used as live-state evidence.

- [Reflexion, 2023-03-20](https://arxiv.org/abs/2303.11366) `[academic]` stores verbal reflections in episodic memory rather than changing weights.
- [ExpeL, 2023-08-20](https://arxiv.org/abs/2308.10144) `[academic]` collects training experiences, extracts natural-language insights, and recalls both insights and past experiences at inference.
- [Agent Workflow Memory, 2024-09-11](https://arxiv.org/abs/2409.07429) `[academic]` induces reusable workflows and supplies selected workflows to later web-agent tasks.
- [Darwin Godel Machine, 2025-05-29](https://arxiv.org/abs/2505.22954) `[academic]` evolves coding-agent implementations through an archive and benchmark selection. It changes agent code and is materially broader than harvesting a reviewed rule.
- [Agentic Context Engineering, 2025-10-06](https://arxiv.org/abs/2510.04618) `[academic]`; [official implementation](https://github.com/ace-agent/ace) `[practitioner direct]`. ACE uses generation, reflection, and curation to append itemized playbook deltas. It documents context collapse under monolithic rewriting and motivates IDs, deduplication, pruning, and incremental edits.
- [Structurally Aligned Subtask-Level Memory for Software Engineering Agents, 2026-02-25](https://arxiv.org/abs/2602.21611) `[academic]` is the closest historical external-memory SWE study. It stores subtask-level experience and retrieves by workflow stage, but the average gain came with model-specific regressions and roughly half of retrieved entries were single-use.
- [SWE Context Bench, 2026-02-09](https://arxiv.org/abs/2602.08316) `[academic]`; [official benchmark repository](https://github.com/jiayuanz3/SWEContextBench) `[practitioner direct]`. Its controlled context-selection experiments show that free retrieval or summary can fail to beat no context, while oracle-selected context helps, making selection quality a stronger hypothesis than “more history is better.”

## External memory versus model-weight learning

| Mechanism | Durable state | Loaded in later run | Weight update | M9 fit |
|---|---|---:|---:|---|
| ERL | retrieved trigger/action heuristics | yes | no | direct |
| SkillGen | active/deprecated readable skill | yes | no | direct |
| MIND-Skill | retrieved skill plus optimized induction prompt | yes | no base-agent update | direct but success-only input |
| SkillEvolver / CoEvoSkills | prose, scripts, references in a skill directory | yes | no | direct or adjacent |
| AHE | versioned harness files and long-term memory | yes | no | direct but much broader and autonomous |
| Socratic-SWE | skill registry guides generated training tasks; trained policy persists | indirectly | yes | conceptual contrast, not the exercise mechanism |

Source basis for the table: [ERL](https://arxiv.org/abs/2603.24639) `[academic]`; [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`; [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`; [SkillEvolver](https://arxiv.org/abs/2605.10500) `[academic]`; [CoEvoSkills](https://arxiv.org/abs/2604.01687) `[academic]`; [AHE](https://arxiv.org/abs/2604.25850) `[academic]`; [Socratic-SWE](https://arxiv.org/abs/2606.07412) `[academic]`.

## Design constraints suggested for the M9 exercise

These are research-grounded inferences, not directly tested curriculum prescriptions.

- Keep the base model fixed and call the change an **external rule or skill update**, not model learning. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`; [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`.
- Harvest from trace evidence plus an executable outcome and the student's judgment. Do not use the agent's self-rated success as the only label. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`.
- Make every candidate a small diff with `trigger`, `action`, `source trace`, `expected fix`, `regression risk`, `status`, and reviewer decision. This combines the evidence manifest in [AHE](https://arxiv.org/abs/2604.25850) `[academic]` with active/deprecated admission in [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`.
- Run the accepted candidate in a fresh session on a comparable, unseen bug. Give that session the stored artifact, not the original harvester's context. [SkillEvolver](https://arxiv.org/abs/2605.10500) `[academic]`; [MIND-Skill](https://arxiv.org/abs/2605.08670) `[academic]`.
- Compare no-rule and rule conditions on the same task family. Count repairs and regressions separately, then include tokens and elapsed steps. [SkillGen](https://arxiv.org/abs/2605.10999) `[academic]`; [Budget-Constrained Web Agents](https://arxiv.org/abs/2606.15017) `[academic]`.
- Keep prior versions and a rollback path. Do not allow a harvested rule to edit the evaluator, hidden tests, model, or budget. [AHE](https://arxiv.org/abs/2604.25850) `[academic]`.
- Keep rules scoped and selectively loaded. Full trace replay, monolithic summaries, and unrestricted memory growth all have negative examples. [ERL](https://arxiv.org/abs/2603.24639) `[academic]`; historical [ACE](https://arxiv.org/abs/2510.04618) `[academic]`.
- Add a short safety check: did the new rule increase tool access, read more untrusted content, or enable new side effects? [Financial self-evolution audit](https://arxiv.org/abs/2608.17684) `[academic]`.

## Searches run

Primary-search strings, with title and repository follow-ups where a method was found:

```text
site:arxiv.org 2026 "Agentic Context Engineering" agents trajectories
site:arxiv.org 2026 agents experience trajectories memory software engineering
site:arxiv.org 2026 self-improving coding agents experience SWE-bench
site:openreview.net 2026 agent experience memory trajectories software engineering
"Experiential Reflective Learning" agent trajectories
"ReasoningBank" agent memory
"MemGrad" agent memory
"Live-SWE-agent" self-improving
"SkillEvolver" agent skill
"MIND-Skill" agent skill
"CoEvoSkills" agent skill
"SkillGen" agent skill
"SWE Context Bench"
"Darwin Godel Machine" SWE-bench
"Agentic Harness Engineering" coding agent
"Socratic-SWE" trace-derived skills
"Are Online Skill and Memory Modules Always Worth Their Tokens"
"Auditing Self-Evolution in Financial Agents"
"ExpeL: LLM Agents Are Experiential Learners"
"Reflexion: Language Agents with Verbal Reinforcement Learning"
"Agent Workflow Memory"
"SkillEvolver" GitHub
"SkillGen: Verified Inference-Time Agent Skill Synthesis" GitHub
"MIND-Skill" GitHub
"Experiential Reflective Learning" GitHub
"Socratic-SWE" GitHub
"Agentic Harness Engineering" GitHub
"CoEvoSkills" GitHub
```

## Not found and evidence limits

- No fresh primary study was found that tests the exact M9 loop of one real coding-agent bug trace, stored human feedback, human acceptance of a harvested rule, and a fresh comparable bug session.
- No located study ablates **human review** against automatic admission. Human review is therefore a safety-oriented design choice supported indirectly by observed automatic-gate failures, not an experimentally measured performance ingredient.
- No production deployment study or 10 to 20 independent practitioner convergence was found. L3 and L4 are not earned.
- No official code repository was linked from the arXiv records for ERL, MIND-Skill, or Socratic-SWE at the time of this check. Third-party implementations were excluded.
- Fresh SWE evidence separates into two incomplete cases: AHE updates an external harness but showed only a 0.4-point aggregate frozen transfer gain on SWE-bench Verified, while Socratic-SWE showed a larger SWE gain by training model weights at substantial scale. Neither directly validates the lightweight human-gated M9 loop.
- Benchmark overfit, model and harness dependence, context or memory bloat, faulty rule induction, missing regressions, security drift, and artifact-loader mismatch remain open risks. The current evidence justifies a small, reversible experiment, not an autonomous self-modification claim.
