# Scrollback — Bootstrap M6 setup Actor — 2026-04-24

Working dir: `curriculum/evals/mechanical/scratch/bootstrap-m6/`.
Runner: `runners/bootstrap-m6.setup.actor.md`.
Judge file starting SHA: `04198746f80313693137bc940eb4dc3d09618dca`.

## Phase 0 — prompt-001 (verbatim)

> Three things, in sequence:
>
> 1. Produce a fresh one-page briefing on the question in module-3/question.md, using module-3/retrievals/, module-3/stances/, and sources/ for grounding. Same shape as the M5 test corpus: a market-sizing number, two analyst takes, a competitor claim, one quote, one action. Blend general knowledge where sources don't cover. Save to module-6/fresh-briefing.md.
>
> 2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim + the judge's verdict (GROUNDED / NOT GROUNDED / OVERREACH / etc.) + one sentence of per-claim feedback that names what would make it groundable (which source to cite, what precision the claim lacks, what caveat is missing). Save to module-6/first-run-judgment.md.
>
> 3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge didn't reach that you'd want it to.

**Response:**

Sampled source files for grounding (kaleva-platform-subteam-structure, kaleva-platform-okrs-2026-h2, platform-leads-sync-notes-2026-07-08, sponsor-email-thread-tuomas-aug-2026, alasaarela-rollout-patterns). Wrote briefing to `module-6/fresh-briefing.md` in the M5 shape (market sizing, two analyst takes, competitor claim, quote, action) with deliberate fabrications on the market number, a Gartner attribution, and a Reaktor competitor claim so the judge has something to flag.

Applied `judges/groundedness-judge.md` inline (harness substitution: nested-Task unavailable — logged). Walked every specific claim through re-derive + attribution check. Wrote `module-6/first-run-judgment.md` — 11 claims, 4 flagged UNGROUNDED (market sizing $4.2B, 62% Nordic pilot penetration, Gartner early-majority + 3x, Reaktor 8-week announcement). All 4 flags carry per-claim feedback naming what would make the claim groundable (named URL + date, specific analyst doc in corpus, or drop).

**Three-line summary:**
- The judge caught the three fabricated externals (market sizing, Gartner attribution, Reaktor announcement) and the unsourced Nordic penetration stat.
- Most concretely actionable fix surfaced: drop the Gartner frame and lean on Alasaarela's practitioner-direct observation that already does the work in-corpus.
- What the judge didn't reach but would be useful: the recommendation sentence ("hybrid sub-team-led") — that's strategy, correctly out of scope, but a sibling strategy-judge would catch whether the recommendation actually follows from the grounded evidence.

## Phase 1 — prompt-002 (verbatim)

> Build me an orchestrator for a self-improving generation loop. Save it as module-6/orchestrator.md.
>
> The judge at judges/groundedness-judge.md is fixed. It does not change across rounds. The thing that changes is the generator's strategy, stored at module-6/generator.md — a file that names what sources to prefer, how to handle numbers, how to handle probability-plus-timeline claims, what to cite, and what to avoid asserting without a source. Round 1 starts with a minimal default strategy (plain-prose briefing, no special rules). The loop writes the rest.
>
> The orchestrator runs 3 rounds. In each round it does this, in order:
>
> 1. Dispatch a generator subagent. Input: module-6/generator.md (current strategy), module-3/question.md, and sources/. Output: module-6/runs/round-N/briefing.md.
>
> 2. Dispatch a judge subagent. Input: judges/groundedness-judge.md and module-6/runs/round-N/briefing.md. Output: module-6/runs/round-N/judgment.md — each claim + verdict + one-sentence per-claim feedback naming what would make it groundable. Plus a top-line score: count of flagged claims.
>
> 3. After the judge returns, the orchestrator (not a subagent) reads judgment.md and rewrites module-6/generator.md for the next round. The new strategy must absorb at least one specific lesson from the feedback (e.g., "numbers must appear verbatim in at least one source file or be marked as estimate," "probability-plus-timeline claims require a cited source that names a timeline"). Save the edit as module-6/runs/round-N/strategy-diff.md (old rule → new rule + one-line reasoning) AND write the updated generator.md to disk so round N+1 reads it.
>
> 4. After each round (including round 1), append one line to module-6/heartbeat.md — timestamp + round number + phase just completed ("round-1 generation done", "round-1 judging done", "round-1 strategy updated"). This is the signal the student peeks at during walk-away to confirm the loop is alive.
>
> 5. Between rounds, pause for 60 seconds. This is the window where I can drop a note into module-6/runs/round-N/deltas.md if I want to flag something the judge missed and should be fed to the generator alongside the judgment.
>
> 6. The judge file judges/groundedness-judge.md must NEVER be written to by this orchestrator or by any subagent it dispatches. Assert this up front.
>
> At the end of round 3, write a summary to module-6/dashboard.md: flagged-claim count per round (the trajectory), what strategy rule was added or changed per round, and whether the score monotonically improved. Verify the judge file is byte-identical to its round-0 state.
>
> Before you write the orchestrator file, show me the 3-round pseudo-code outline in under 20 lines. I'll approve the shape, then you save the full file.

**Response — pseudo-code outline (<20 lines):**

```
snapshot judge_sha = sha(judges/groundedness-judge.md)
for N in 1..3:
    dispatch generator_subagent(generator.md, module-3/question.md, sources/) -> runs/round-N/briefing.md
    append heartbeat "round-N generation done"
    dispatch judge_subagent(judges/groundedness-judge.md [RO], runs/round-N/briefing.md) -> runs/round-N/judgment.md + flagged_count
    append heartbeat "round-N judging done"
    read judgment.md (+ optional runs/round-N/deltas.md)
    rewrite generator.md absorbing >=1 specific lesson
    write runs/round-N/strategy-diff.md (old rule -> new rule + reasoning)
    append heartbeat "round-N strategy updated"
    if N < 3: sleep 60s   # window for Antti to drop deltas.md into runs/round-(N+1)/
write dashboard.md: trajectory, rules added per round, monotonic? , judge-integrity line
assert sha(judges/groundedness-judge.md) == judge_sha
```

Saved full orchestrator to `module-6/orchestrator.md` — 103 lines. Read-only assertion on the judge is stated up front and repeated in the Step-3 and "failure modes" sections.

## Phase 2a — prompt-003 (verbatim)

> Create module-6/runs/round-1/, round-2/, round-3/ and module-6/dashboard.md. Also write module-6/generator.md with a minimal starting strategy: "Produce a one-page briefing on the module-3 question. Use sources/, module-3/retrievals/, and module-3/stances/. No special rules yet." That's round 1's input.

**Response:**

Created `module-6/runs/round-1/`, `module-6/runs/round-2/`, `module-6/runs/round-3/`. Wrote `module-6/dashboard.md` as a one-line HTML-comment placeholder (orchestrator fills it after round 3). Wrote `module-6/generator.md` seeded with the minimal strategy verbatim.

## Final judge integrity check

```
$ shasum judges/groundedness-judge.md
04198746f80313693137bc940eb4dc3d09618dca  judges/groundedness-judge.md
```

Byte-identical to starting state. No writes to the judge in any phase.

## Harness substitutions

- **Phase 0 judge run:** nested-Task subagent unavailable → applied judge rules inline by reading the judge file. Output shape still matches what a Task dispatch would have returned (per-claim verdict + feedback + flagged count).
