# Compaction pass 1: Agents 101, Modules 1-6 and 8

`scripts/slide-rewrite.js` rewrote every `##` unit and slide file in seven modules against `curriculum/language/rewrite-rules.md` (maintainer's calls-page steers, glance budget about 60% of current words, capped at 110 per slide and 160 per exercise section). Headings, includes, widgets, prompts, runtime spans and source bullets are frozen. Personal to Team (Module 7) is left to the Module 7 loop. The two prework readings (module-3-prework, module-5-prework) were reverted to keep their source citations intact.

## Words per slide (prose rows, `##` slides, whole training)

| | p25 | median | p75 | p90 | total |
|---|---|---|---|---|---|
| AE101 | 52 | 87 | 128 | 169 | 30,402 |
| Agents 101 before | 59 | 95 | 137 | 171 | 32,468 |
| Agents 101 after | 39 | 61 | 89 | 118 | 23,791 |

Narrator lines 37 -> 12 (5 per 1000 sentences; AE101 8). Dense slides 51 -> 20.

## Key points carried by simulated students (12 runs per side, before -> after)

| module | learning | before -> after |
|---|---|---|
| Getting Going | context-is-king · guardrails · you-are-the-check · package-rules · act-to-learn | 8->9 · 8->10 · 12->12 · 8->11 · 2->2 |
| Building Agent Systems | persistence+automation · three-layers · plain-text · compounds | 3->4 · 3->4 · 6->3 · 3->2 |
| Multi-Agent Systems | meeting-room · dialects · handoff-loss · when-to-split · doubt-stays | 4->1 · 3->4 · 8->10 · 8->10 · 7->9 |
| Security | loop · english-attack-surface · non-determinism · door · on-top · package · escalate | 8->8 · 8->7 · 1->2 · 8->5 · 1->0 · 6->7 · 6->3 |
| Grounded Output | measure · grounded · judge-file · narrow | 6->7 · 1->3 · 6->8 · 6->6 |
| Evaluations | fixed-judge · floor-ceiling · flat-score · design-the-loop | 9->9 · 7->4 · 8->9 · 5->5 |
| Agents Building Agents | tool-builds-tools · disciplines · grounded-in-files · where-going | 0->1 · 2->2 · 2->3 · 0->2 |

Dips of 3 or more were traced to the text. The meeting-room, door, plain-text and floor/ceiling sentences all survive the pass (the Big Idea line, the door slide, the folder-of-text lecture, the ceiling slide), so those dips read as noise at n = 12. Escalate dipped for the second time in a row: the escalate and take-stock sentences the earlier recheck restored had been cut again, so they are back ("Sometimes the right next step is not another prompt.", "The narrow question the expert can answer is sitting in the report.", "The reusable check is the expert in the room", "You must do the work."). The plain-text sentence in the memory exercise regained "Same plain text as the memory and the Module 1 guardrail."

## Maintainer calls applied on top

- Module 1: check slide heading "The agent generated, you decided"; "You steer your agent with context."; felt-experience line kept (lang-01).
- Module 4: heading "Classical security manages risk on predictable software" with risk-based framing and no "prove"; "Agent systems do not offer certainty."; Bring-to-Module-5 compares with the room.
