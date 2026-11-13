# Quality loop: one command per module

`loop.sh` runs one pass of the improvement loop on one Agents 101 module. It measures the shipped text (v0), a damaged copy of v0, and any number of variants with the same instruments, then writes one report.

```
curriculum/evals/loops/loop.sh <module> <apply.py> <variants> <out-dir>
curriculum/evals/loops/loop.sh personal-to-team curriculum/evals/loops/m7/apply.py v1,v2 /tmp/m7
curriculum/evals/loops/loop.sh security - "" /tmp/m4-baseline      # shipped text only
```

Needs `curriculum/evals/mechanical/persona-student/modules/<module>.json` (mood contract, intended learnings, damage spec) and, for variants, an `apply.py <checkout> <variant>` that rewrites the module's files in a copy. Student text in this checkout is never touched. Logs that already exist in `<out-dir>` are reused, so a rerun only pays for what is new.

| Step | Tool | Signal |
|---|---|---|
| Student view | `curriculum/evals/mechanical/persona-student/page.sh`, `damage.js` | v0, variants, damaged copy |
| Persona students | `run-students.sh` → `curriculum/evals/mechanical/persona-student/experience.js` | panel `PERSONAS` (default ingrid, cfo-sceptic, cto-builder, hr-svp, ops-director, veteran-director) × `REPEATS` (default 2) = 12 per page |
| Learning match | `persona-student/score.js --match` | take-homes vs intended learnings |
| Word signal | `words.js` | complaints (filler, repetition, missing, tone, confusing), specific praise, skipped beats, tells, learnings carried. Replaces the 1–7 enjoyment mean, which scored the damaged Module 7 copy the same as the original |
| Story judge | `story-judge.js` (+ `story-judge.md`) | frame, narrative, point of view, stance, register; module-scoped, `STORY_N` opus calls, medians |
| Taste judge | `build-pairs.py` → `persona-student/pairs.js --rules taste-rules.md`, both orders | per changed slide: variant, original, or split |
| Sentence checks | `flags.js` | narrator rate, put-downs, loaded lines, sentences per slide, dense slides |
| Report | `report.js` | one table per instrument, then a ranking where language (register, taste wins, narrator rate) weighs the same as the story judge |

Read the damaged row first. If it does not score clearly worse than v0 on the word columns, that instrument is blind on this module and its numbers should not rank anything.

Runs so far: `m7/` (variants, results, the maintainer's calls page) and `language-sweep/` (before and after the sentence sweep on three modules).
