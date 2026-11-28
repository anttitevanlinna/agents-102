# Learner judgment

Not student-facing. Where the open edition asks a self-study learner for their own words, and what makes each moment happen. `attention-design.md` covers how much a page asks a learner to read; this file covers what it asks them to say.

**Frame.** A prompt is one click to copy, so a learner can get through most of the course by copying. The Fable target state asks that every module's Big Idea is done in a step nobody can skip, and that most learners name it in their own words. Antti's rule stands: no choice for the learner inside a prompt; the prompt decides.

## Two kinds of own words

- **Input**: facts or material only the learner has (LinkedIn text, strengths, hate list, the challenge, a new source, the person for the solo agent). The work cannot go on without it, so it happens.
- **Judgment**: the learner rates, decides or disagrees with what the agent made (what changed the page most, the line they trust least, grounded or not, which risk). This is the thread's subject.

## What makes a moment happen

| mechanism | what the page does | can a copying learner skip it? |
|---|---|---|
| gated | the prompt tells the agent to ask and wait, or ends on a label the learner fills (*The risk:*) | no: the agent waits, and the file it writes needs the answer |
| page-only | a body sentence asks (*Push back on the summary*), no prompt waits | yes, silently |
| free | the learner leads with no prompt (Module 1 Phase 6) | yes, by design |

Evidence the gate holds: the tmux run of 2026-11-26 (H-8 in `evals/mechanical/tmux-runner/a101-runner-findings.md`). When the runner sent no answer to the Module 1 context-trace question, the agent did not write the file and said it was waiting. The runner now has to answer every waiting prompt (`tests/scenario-answers-waits.test.sh`), so it shows that gated moments work and says nothing about page-only ones.

Rule context: `check_pedagogy.md` §16 puts forcing functions in prompts and lets optional push-backs live in body text; §32 says offered structures are taken as they are unless a mechanic forces engagement. So a page-only moment is right when it is optional; it is wrong when the module's Big Idea depends on it.

## Map, open edition, built page 2026-11-28 (main 73aa869)

One reader's count of judgment moments. Input moments are left out.

| unit | gated | page-only | free |
|---|---|---|---|
| prework | 0 | 1 (ask for changes to the five-line summary) | 0 |
| 1 Getting Going | 1 (what changed the page most, P5) | 4 (harsher picks, push back on rules, push back on the retro, cold read against your own view) | 1 (Phase 6) |
| 2 Building Agent Systems | 3 (plan approval P5, change one starter rule P7, approve or reject each fix P10) | 7 (brief, curation plan, sharper not longer, bare vs system, Debrief, week of watching, brand rule) | 0 |
| 3 Multi-Agent Systems | 1 (doubted line P10) | 4 (crux restates, decision restates, dropped or smoothed number, Debrief) | 0 |
| 4 Security | 3 (guess P4, what matters P6, the risk P11) | 5 (GDPR brochure, four patterns covered, accept the residual on record, ask a person, Debrief) | 0 |
| 5 Catching Hallucinations | 3 (five marks P4, surprise row P7, still doubt it P9) | 1 (Debrief) | 0 |
| 6 Evaluations | 2 (three marks P6, goal-nudger P8) | 3 (remarks after round 1, Debrief and the removal check, five trigger moments) | 0 |
| solo Agents Building Agents | 1 (the person, P1) | 2 (the four-line brief, give it to them) | 0 |
| all | 14 | 27 | 1 |

Deliberate hand-backs, not gaps: Module 3 P9 *You choose fixes*, Module 4 *"You choose. Optimise for what I can't steer."* The learner delegates on purpose.

## Big Idea against the gate

| module | Big Idea done by | gated? |
|---|---|---|
| 1 | what changed the page most, in the learner's words, last line of `context-trace.md` | yes |
| 2 | approve or reject each memory fix | yes |
| 3 | *handoffs are where work gets lost, so check them*: the dropped or smoothed number | **no, page-only** |
| 4 | guess, then the risk; *decide*, accept the residual on record | half: the decision is page-only |
| 5 | marks, surprise row, the doubted line | yes |
| 6 | three marks against the judge; goal-nudger | yes |
| solo | describe the gap; the agent builds | brief page-only, but the next prompt reads it, so a skip fails loudly |

Every Debrief (Modules 1 to 6) ends on a page-only *Push back on the summary*. The rules file it sharpens is what every later session reads, and Module 1 tells the learner the agent goes easy on its own output.

## Proposed, in order (prompt changes wait for prompt-ok)

1. Module 3: move the handoff check into a short prompt after the synthesizer (new `three-retrievers-one-curator-6`).
2. Debriefs: each Debrief prompt ends by asking the learner what the agent got wrong or missed, and waits. One representative (Module 1) decides the pattern.
3. Module 4: the mitigation prompt ends by asking the learner to accept the residual or close the door, written word for word.

Left as they are: Module 6 remarks (human taste is a side product of the loop, Antti 2026-11-18), the solo brief (fails loudly), between-module asks (light homework register, §16 boundary 2).

## Open

- Whether learners do the page-only moments: no data. The page sends `copy-prompt` and `prompt-open`; nothing records what a learner types. The files that keep the learner's words verbatim (`module-1/context-trace.md` last line, `module-3/briefing-baseline.md` *Why:*, `module-4/guess.md`, `module-5/my-marks.md`, `module-5/baseline-score.md`) are where a recorded walk can check them.
- Whether a learner answers a gated question with real judgment or with "ok": a recorded walk with a person, not a sim.
