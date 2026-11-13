# Pass 2 (2026-11-02)

Rubric before: run a101-full-r3, mean 80 (POV 73, weakest). n=24 panels throughout.

**Spar drafts** (`spar-*.md`): today's page (v0) vs pages and lectures regenerated from the whole strategy file (s1), exercises unchanged. Big Idea stated: M3 25 → 38, M5 4 → 33, M8 0 → 0. None on main: each changes what the module teaches and waits for the maintainer's spar. The M5 replication run is in progress.

**Judge-agreed exercise fixes** (`edits-*.md` and `edits-*.json`):
- M5 `hallucination-bakeoff` Phase 5: run the new judge on the M3 doubt. Big Idea stated 17 → 17, learnings flat, taste preferred the variant. **On main.**
- M3 `three-retrievers-one-curator`: find one seam. Big Idea stated 4 → 4, "dialects" learning 17 → 11. Held.
- M8 `joint-double-diamond`: count your own cited files before the sponsor's line. Flat, and the taste judge preferred v0 (0%). Dropped.

**Noise:** the same M3 page scored 22, 25 and 4 in three n=24 runs on the same day. Treat single-run gaps under ~25 points with suspicion and replicate before deciding.

**M5 grounding comparison, rescored with the graded scorer (b97eaf18)**, two full n=24 runs per page: today's page 13 and 14; grounding draft 43 and 51. The gap is about 33 points against a 10-point threshold, and it replicates. Files in `m5-rescore/`.

**M4 hands-on first** (`edits-security.*`): "The discipline of risk" lecture moved after both exercises (Antti's rule: hands-on as soon as possible, heavier theory after). n=24 graded: Big Idea stated 95 → 96; learnings flat within noise (non-determinism 4 → 9, escalate 18 → 14). **On main.**

**M3 seam beat, rerun under the graded scorer** (`edits-multi-agent-systems-rerun.md`): Big Idea stated 17 → 21, learnings flat (the earlier "dialects" dip was noise: 10 → 12 this run). Rubric judges asked for it 3/3 in two runs. **On main.**

**M7: name what stopped your prework example** (`edits-personal-to-team.*`): before the agent finds the absorption bottleneck, the student writes one line on what stopped people using the tool in their own prework example. n=24 graded: Big Idea stated 63 → 70, learnings flat. **On main.**

**M6: spot-check the judge by hand** (`edits-evaluations.*`): after the integrity check, the student marks three claims before reading the judge's verdicts. n=24 graded: Big Idea stated 99 → 98; learnings within noise (each 1–3 students lower). Matches the live-run finding that the judge's inputs drift unseen. **On main.**

**M2: who else would read the output** (`edits-building-agent-systems.*`): one review question seeds M7's absorption idea. n=24 graded: Big Idea stated 37 → 44 (noise), learnings flat. **On main** (rubric judge r4).

## M8 on main, 2026-11-13 (Antti yes)

Lecture `where-is-this-all-going` cut to one thread: your agent improves your agent, each fix stays on disk, learning rate multiplies the work. Citation, three walls, obsolete-next-year and what-would-change-our-mind slides out; extend-your-system gains Phase 0 (improve an agent you already have, 5 min; Phase 2 down to 10 min). Big Idea stated cold, lean scorer: today's page 16, draft 2 28 (n=24 each), draft 3 (draft 2 + obsolete slide) 19 (n=12). Old split scorer on the same answers: 24 vs 38. Draft 1 (citation and walls kept): no gain over today's page. Story judge POV 38 → 28: the trainer's own voice went with the obsolete slide. Strategy Big Idea line now matches the page (core 86981b1).

## Point-of-view pass, 2026-11-13

Rubric r4: POV 74, weakest; judges: Antti absent M2-M6. Beats added only from his own words (spar notes, bosser articles, AE101 story-of-module-6). Teaching-only guard (lean scorer, n=12 per page):
- M2: page Big Idea aligned to the strategy line, key concept leads with compounding, compounding lecture gains his agent-factory moment and "Stop chatting. Build a system.": 50 → 63.
- M6: "I drifted too" in new-human-role-in-the-loop: 79 → 92.
- M5: "Steering without reading every line" (his article) in grounded: 96 → 83 at n=12, answers still on grounding; second 12 pending before main.
- M3 (Antti's aims, 2026-11-13): new strategy line (core e8e76d4), lecture rebuilt as *How agents work together*, key concepts on shared-file handoffs, split-and-parallel, handoffs where work gets lost. Against the new line: today's page 60, new page 74 (lean scorer, n=24 each). First wording (with "hire", "meeting room") scored 83 vs 48 on n=12; Antti struck both words.
- M5: "Steering without reading every line" on main after a second 12: 83 vs 82 (n=24 each), no cost.
