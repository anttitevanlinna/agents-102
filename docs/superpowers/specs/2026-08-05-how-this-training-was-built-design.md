# “How this training was built” rewrite design

## Goal

Cut the M1 closing lecture from 870 student-facing words to roughly 400–450 words. The lecture used to carry more of the training's theory; its remaining job is narrower: show how the training itself was compounded, give concrete evidence of how it was checked, and connect that process to the loop the student just ran.

## Student-facing shape

Three slides:

1. **Thirty bullets were not the training.** Keep the origin story and one or two concrete examples of specific wrongness becoming reusable rules. Compress the current “Wrong is how steering gets in” and “The rules started doing the work” sections into this beat.
2. **Then we tested the training.** Replace the current scaling story with a concise account of the actual quality stack:
   - 286 numbered rules and subrules across 12 checklists, counted from the canonical `check_*.md` compendiums;
   - automated quality judges, each reading through a focused lens;
   - simulated engineer reads using the competent-builder, skeptical-senior, and fast-operator perspectives, plus separate prompt-behavior analysis;
   - real Claude Code sessions driven through M1–M6 in tmux against working codebases.
3. **You just ran the same loop.** Connect the build story to the student's correction and `./CLAUDE.local.md`. Keep the name **compound engineering**, but remove the full stage sequence and repeated explanation.

Use “automated quality judges,” not “evals,” so the lecture can describe the machinery without teaching M6 vocabulary early.

## Cuts

- Remove the entire “Built to forgive” slide. Later theory and the training's artifact design now carry that idea.
- Remove the week-to-afternoon claim.
- Remove most explanation of rule inheritance across sessions and subagents.
- Remove the escalating one-agent/five-agent work narrative.
- Remove the full Klaassen loop sequence and the comparison between two loop taxonomies.
- Reduce the three quoted rule specimens to the minimum concrete evidence the origin beat needs.

## Evidence discipline

- Describe the rule total as a repository snapshot, not a timeless property: “The current system has 286 numbered rules and subrules across 12 checklists.”
- “Automated quality judges” refers to the eight focused classes exposed by the eval machinery: writing, story, technical, behavior, pedagogy, strategy, cross-module, and slides.
- Do not claim three codebases all pass the full M1–M6 chain. The supported claim is that the tmux runner has driven real Claude Code sessions through M1–M6 against working codebases; the complete chain is documented on Lemmings, with later-module variants on Codesearch and Picoshare.
- Update the lecture's backing claims and maintainer notes so removed claims and retired constraints do not survive below the student-facing body.

## Acceptance criteria

- Student-facing body is 400–450 words unless clarity warrants a small deviation.
- Exactly three `##` slide sections.
- The lecture remains a first-person Antti build story, not a tooling inventory or achievement narrative.
- The testing stack is understandable to software engineers without explaining its implementation.
- The final slide still makes the student's M1 work feel like a real instance of the same compounding loop.
- Required backing, slide-size, numbering, repository test, and significant-rewrite sim/eval checks pass before the lecture commit.
