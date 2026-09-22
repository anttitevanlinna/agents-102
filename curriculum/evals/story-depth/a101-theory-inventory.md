# Agents 101 — theory / framework / practitioner / case inventory (2026-09-22)

Scope: A101 module files, every linked lecture and exercise, `trainings/agents-101/supplementary/`.
Maintainer and backing blocks excluded. Read-only scout output, saved by the orchestrator.
Feeds `trainings/agents-101/theory-plan.md` § The pieces (the `[curr:…]` tags).

## Named items

| Name | File | Module | Quoted line | Source given? |
|---|---|---|---|---|
| Karpathy, LLM Wiki post | trainings/agents-101/getting-going.md | M1 | "Karpathy's LLM Wiki post, and the candidate Lindenberg memory-architecture piece if you have room." | name only |
| Lindenberg memory-architecture piece | trainings/agents-101/getting-going.md | M1 | (same line) | name only, "candidate" |
| Karpathy, LLM Wiki gist | lectures/module-2-prework.md | M2 prework | "Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is short." | linked |
| Matt Pocock | lectures/module-2-prework.md | M2 prework | "Watch Matt Pocock's *\"I was an AI skeptic. Then I tried plan mode\"* on YouTube." | linked |
| Donald Miller / StoryBrand | exercises/personal-site-with-guardrails.md | M1 | "Donald Miller's **StoryBrand** is the obvious framework for..." | named |
| Adam Grant / energy audit | exercises/personal-site-with-guardrails.md | M1 | "Adam Grant calls a version of this the *energy audit*." | named |
| Patagonia, "Don't Buy This Jacket" | exercises/personal-site-with-guardrails.md | M1 | "Patagonia famously did *\"Don't Buy This Jacket\"*." | named |
| Taleb / via negativa | exercises/personal-site-with-guardrails.md | M1 | "Taleb calls it *via negativa*." | named |
| Willison, Harker, Ronacher, Shihipar, Bilsborough | exercises/module-3-prework.md | M3 prework | "1. Simon Willison... 2. Edward Harker... 3. Armin Ronacher..." | each dated + linked |
| Rumelt, the crux | exercises/name-your-crux.md | M3 | "Richard Rumelt calls it the **crux**: the one thing that, if solved, releases pressure on everything else." | named |
| Rumelt, strategy kernel | exercises/three-minds-one-synthesis.md | M3 | "apply Rumelt's kernel to synthesize their notes back into `./crux.md`" | named |
| The Rory seat | trainings/agents-101/multi-agent-systems.md | M3 | "a counterintuitive reframer, the Rory seat" | informal name |
| Mata v. Avianca (S.D.N.Y. 2023) | lectures/module-5-prework.md | M5 prework | "A passenger sued Avianca... Six of them did not exist." | court order + press linked |
| Deloitte Australia / DEWR | lectures/module-5-prework.md | M5 prework | "...commissioned Deloitte for A$439,000 to review the department's welfare-compliance automation system..." | DEWR, Guardian, Register, FOI linked |
| Mollick, Garbage Can and Bitter Lesson | trainings/agents-101/output-quality.md | M5 | "Ethan Mollick, 'Garbage Can and Bitter Lesson.'" | name only here |
| Mollick, same | trainings/agents-101/evaluations.md | M6 | "[Ethan Mollick, *The Bitter Lesson versus The Garbage Can*]" | linked |
| Mollick, same | lectures/evals-as-steering.md | M6 | "Ethan Mollick asks a useful question in *The Bitter Lesson versus The Garbage Can*." | name only here |
| Compound reliability (85% × 10 ≈ 20%) | lectures/grounded.md | M5 | "If an agent were 85% correct on a single step... land near 20% end-to-end" | self-labelled illustration |
| Flip-math (10% → 1% → 0.1%) | lectures/grounded.md | M5 | "Round 1: 10% fabricated → 1% after fix." | self-labelled working prior |
| 10% fabrication target | exercises/hallucination-bakeoff.md | M5 | "The target is roughly 10% fabrication or misrepresentation... The 10% is a slight joke" | self-labelled joke |
| Self-consistency sample sizes (N=2 / 5–10 / 20–30) | lectures/self-consistency-after-scoreboard.md | M5 | "The signal starts to firm up around N=5 to 10... you'd want N=20 to 30" | none |
| JTBD (Christensen) | trainings/agents-101/personal-to-team.md | M7 | "using the agentic Jobs-to-be-Done pattern (Clayton Christensen and collaborators)" | named |
| Roger Martin, what would have to be true | trainings/agents-101/personal-to-team.md | M7 | "Roger Martin's question is the test: *'what would have to be true for them to replace it?'*" | named |
| JTBD (Christensen) | exercises/share-your-work.md | M7 | "This is the Jobs-to-be-Done frame from Clayton Christensen and collaborators." | named |
| Roger Martin | exercises/test-the-sharing-plan.md | M7 | "Use Roger Martin's question: *what would have to be true...*" | named; citation in maintainer block only |
| Rumelt / Martin / Klein & Kahneman | exercises/joint-double-diamond.md | M8 | "Rumelt's *crux*, Roger Martin's *what would have to be true?*, Klein and Kahneman's *pre-mortem*." | named |
| Escoffier, Le Guide Culinaire | supplementary/cookbook-for-agent-system-design.md | supp. | "*Le Guide Culinaire* is mostly the index; Escoffier's genius was the named preparations, not the dishes." | named, analogy |
| Three thinking disciplines | supplementary/cookbook-for-agent-system-design.md | supp. | "Crux (Rumelt), what would have to be true (Roger Martin), pre-mortem (Klein-and-Kahneman)." | named |
| Michael Polanyi | supplementary/personal-to-company-gap.md | supp. | "Michael Polanyi, philosopher of science, had the line for this: *'We know more than we can tell.'*" | named + quoted |
| Access–trust gap statistic (54–95% / 5–22%) | supplementary/personal-to-company-gap.md | supp. | "54-95% of enterprises have AI access, only 5-22% have trust/production readiness." | **[SOURCE NEEDED] on the page** |
| Ronacher, The Coming Loop | supplementary/personal-to-company-gap.md | supp. | "In June 2026, Armin Ronacher described... in *The Coming Loop*." | linked |
| Osmani, Software Factories | supplementary/personal-to-company-gap.md | supp. | "Addy Osmani, *Software Factories*, puts it in one line: *'Generation is a wide mouth; verification is the narrow neck.'*" | linked |

## Concepts used repeatedly without a named theory behind them

- The loop (risk loop / eval loop) — `lectures/practice-of-risk.md`; `exercises/eval-loop.md`
- Held doubt — `exercises/three-minds-one-synthesis.md`; `trainings/agents-101/output-quality.md`
- Residual risk — `lectures/practice-of-risk.md`; `exercises/audit-your-agent.md`
- The fixed judge — `trainings/agents-101/evaluations.md`; `exercises/eval-loop.md`
- Sharing shapes — `trainings/agents-101/personal-to-team.md`; `exercises/share-your-work.md`
- Grounded, the discipline — `lectures/grounded.md`; `trainings/agents-101/evaluations.md`
