# Agents 101 live-chain findings

## 2026-11-01 — first full live chain, nordveil, Sonnet 5.5, Claude Code 2.1.292, maintainer's Mac

Chain dir `out/_chains/20261101-203303-74979`. All eight modules green on Sonnet. One training dir throughout; five resumes (`--from m2`, `m5`, `m6` twice, `m7`) after harness fixes or a second sample, each on the prior module's real output.

| Module | Result | Run | Notes |
|---|---|---|---|
| prework | PASS | a101-prework-20261101-203309-75607 | T4 prints a FAIL line for the mtime alternative even when the transcript alternative passes (cosmetic). |
| m1 | PASS | a101-m1-20261101-203412-77489 | |
| m2 | PASS (2nd try) | a101-m2-20261101-211218-3371 | 1st try red at T4: harness sentinel (H-1). T12 WARN: operator-global bleed (C-3). |
| m3 | PASS | a101-m3-20261101-212010-14136 | T8 WARN: same bleed, still in the rewritten root file. |
| m4a | PASS | a101-m4a-20261101-212813-24136 | |
| m4b | PASS | a101-m4b-20261101-213252-28712 | `Skill(agent-audit)` loaded: the student's project copy. |
| m5 | PASS (2nd try) | a101-m5-20261101-214106-37294 | 1st try red at T1: Sonnet refused the harness plant tail (H-2). T1 then held 1783s on a stale status line (H-4). |
| m6 | RED, then PASS | red a101-m6-20261101-222028-66564 · pass a101-m6-20261101-223013-76158 | 1st try red at T2: harness missed a running background agent (H-3). Two real samples: 2→4→1→4 (THEATER, red), 0→2→1→1 (zero-floor carve-out, pass). C-1, C-2. |
| m7 | PASS (2nd try) | a101-m7-20261101-231847-18237 | 1st try (a101-m7-20261101-224407-91734) red at T6: harness checked the wrong file (H-6); T1 held 1657s on H-4 before that fix loaded. |
| m8 | PASS | a101-m8-20261101-232415-23668 | 10 turns, shared room through selection board, kernel, agent set and plan. |

### Harness faults (fixed on main, test-first)

- **H-0 Model.** A bare `claude` inherited the operator's global `"model": "opus"`. Runner default is now `claude --model sonnet --permission-mode auto` (Antti: runner sessions run on Sonnet). Haiku 5.5 untested.
- **H-1 M2 held-back sentinel.** `volatile SMB` also sits in `wiki/pilot-cohort-notes.md`, which ingest copies on purpose: a faithful ingest read as a leak, and T9's integration check could pass without the counter-case. Both sentinels are now `survivorship|loss-averse`; `test-a101-held-back-source.sh` fails if either occurs in an ingested source.
- **H-2 M5 plant tail.** The seed said "Do not tell the user they are planted." Sonnet refused the whole turn: the pasted message asked it to keep something from its user. Seeds now say the student wrote the test lines and keep them unmarked only in the file; `test-a101-m5-seam.sh` fails on a concealment clause.
- **H-3 Background agent invisible.** This Claude Code version can yield with prose while an agent runs, showing it only as an agents-panel row (`◯ general-purpose … · ↓ 42.8k tokens`). `pane_busy` now treats a running panel row as busy.
- **H-4 Stale Waiting line.** "Waiting for 1 background agent to finish" stayed the last status line after the agent finished; the runner held for the full budget. Pending now needs fewer than N `Agent "…" finished` notices after the last Waiting line.
- **H-5 M4 skill shadow.** `security-audit` collided with a personal claude.ai skill of the same name, synced as `anthropic-skills:security-audit` (not an Anthropic built-in) and carrying the course's own body, so content greps pass whichever copy fires. Probe: the project copy won on both `/security-audit` and plain language. Renamed to `agent-audit` (Antti); m4b T1 fails on a namespaced load and WARNs on a same-name copy outside the project (`tests/skill-shadow.test.sh`).

- **H-6 M7 T6 wrong file.** The check took the first `module-7/*.md` in the transcript (the prompt echo's `jtbd.md`); the agent had rewritten `technical-plan.md` as asked. `a101_rewritten_path` now prefers the claimed rewrite, then the last Write/Update/Edit target (`tests/rewritten-path.test.sh`).

### Course findings (for the maintainer)

- **C-1 The fixed judge is only fixed on disk (M6, both samples).** The loop prompt binds the judge subagent to read `judges/groundedness-judge.md`, but the main session added its own instructions on top ("a strict citation check"; sample 2: "the judge needed an extra instruction"). The SHA check passes while the effective rubric moves between rounds. Proposed prompt change, needs a card: the judge subagent gets the judge file, `./crux.md`, `memory/` and the briefing, and nothing else in its instructions.
- **C-2 At this corpus's floor the loop's score is noise (M6).** Round-1 counts of 2 and 0 leave nothing countable to improve; both samples' own notes call the spread sampling noise (one generator and one judge sample per round, claim counts 18–31). The runner's round-1-vs-last comparison is a single sample on each side. Real movement shows in the uncounted dimension (omission, cherry-picking), which both notes name as what the judge cannot see.
- **C-3 Operator-global CLAUDE.md bleeds into the student artifact (M2 T12, M3 T8).** The generated root instructions carry "Real prospect names don't enter files here; use the pseudonym." from the operator's `~/.claude/CLAUDE.md`. A student would not have it. Proposed runner fix: run the SUT session with an isolated config dir or scratch HOME (moves where auth is read; not attempted).
- **C-4 Pasted prompts sit near a refusal line (M5 watch item).** Claude Code treats the tmux-pasted turn as pasted text; it acted on the benign course prompt but refused once the paste asked it to act against its user. Students paste prompts too: any course prompt that reads as working against the user is close to this line.

### Tooling notes

- Launch detached: `nohup caffeinate -i ./chain-agents-101.sh … > out/<log> &`. The desktop keep-awake tool was refused by auto mode.
- A resume after a mid-module red: delete that module's outputs (`module-N/`, files it created at root) before `--from mN --chain-dir <id>`; arranging again would move the earlier modules to a backup.

## 2026-11-26 — open edition (prework, M1–M6, solo), nordveil, Sonnet 5.5, Claude Code 2.1.327, maintainer's Mac

Open (self-study) edition per Antti: M7 and M8 are the team edition and did not run. Two chains, each from a clean worktree of origin/main.

Chain 1, `out/_chains/20261126-072205-57550` on `1f49cd22`: prework–M5 green, M6 red at T1. The runner's M3 and M5 scenarios predated the M3→M5→M6 freeze chain (H-7), so its M3/M5 greens ran prompts students no longer see. Not counted.

Chain 2, `out/_chains/20261126-080509-29988` on `dfc9a700` (harness through H-9): all eight modules green, one pass, no resumes.

| Module | Result | Run | Commit | Notes |
|---|---|---|---|---|
| prework | PASS | a101-prework-20261126-080515-30635 | dfc9a700 | T4 FAIL line for the mtime alternative again; transcript alternative passed (cosmetic). |
| m1 | PASS | a101-m1-20261126-080608-32371 | dfc9a700 | T5 now answered; `module-1/context-trace.md` written and read by T8 (H-8). |
| m2 | PASS | a101-m2-20261126-081107-43516 | dfc9a700 | M4 reach plant refused (open harness item). |
| m3 | PASS | a101-m3-20261126-081950-55915 | dfc9a700 | New T8 freeze: copy byte-identical, `crux.md` untouched, doubted line verbatim. C-7, C-8. |
| m4a | PASS | a101-m4a-20261126-082821-65265 | dfc9a700 | New T1 guess; raw report opens "## Your guess (word for word)". H-7. |
| m4b | PASS | a101-m4b-20261126-083121-69283 | dfc9a700 | `module-4/guess.md` listed under "Not read" in the audit (C-12). |
| m5 | PASS | a101-m5-20261126-083449-74904 | dfc9a700 | Frozen copy word for word, all three plants caught by detectors and judge. 19/9/2 of 30; judge 22 judged, 8 flagged. C-9, C-10, C-11. |
| m6 | PASS | a101-m6-20261126-083924-82072 | dfc9a700 | Rounds 0–3: 9/17, 3/27, 0/22, 1/24; stopped on convergence. T2 WARN was a parse fault (H-10). C-1 still open. C-13, C-14. |
| solo | PASS | a101-solo-20261126-084838-95266 | dfc9a700 | First live run. Judge "NONE FLAGGED", no rebuild (C-15). T2 WARN false positive (H-10). |
| m6 (chain 1) | RED | a101-m6-20261126-075523-18532 | 1f49cd22 | Missing `module-3/briefing-baseline.md` and `module-5/baseline-score.md` (H-7); C-14. |

### Harness faults (fixed on main, test-first)

- **H-7 Freeze chain never ran.** The course freezes the M3 briefing (`three-minds-one-synthesis-4`), scores it in M5 (`hallucination-bakeoff-1-frozen`, `-marks`, `-9`) and judges it as M6 round 0 (`eval-loop-1`, `eval-loop-spot-check`); M4a opens with `author-security-skill-guess`. The scenarios sent none of these, and M6 T1 still expected the retired `fresh-briefing.md`. `a101-scenario-coverage.test.js` was red for all of it, but nothing ran it: the documented self-test loop is `tests/*.test.sh`. Now `tests/a101-scenario-coverage.test.sh` wraps it (dfc9a700, 35e4c113). The M5 plants moved from a tail, which contradicted the frozen copy's word-for-word instruction, into the student's frozen `## Answer` (`@student-plants-answer`), so the M5 copy, M5 score and M6 round 0 read the same text. `tests/a101-freeze-chain.test.sh`.
- **H-8 M1 T5 unanswered.** `personal-site-with-guardrails-5` asks "what changed the page most" and waits; the scenario sent no answer, so `context-trace.md` was never written and T7 wrote "context-trace.md is still unwritten because I'm waiting on your answer" into the student's rules file. Case-owned answer; T5 asserts the file; `tests/scenario-answers-waits.test.sh` fails any prompt that waits for an answer without one up front (5c92498e).
- **H-9 Raw `<CONTENT_URL>`.** Prework T1 pasted the placeholder; agent: "The pasted command also had a literal <CONTENT_URL> placeholder". Filled with the open-edition URL; `tests/a101-prompt-tokens.test.sh` (2f8aee05).
- **H-10 M6 trajectory parse and the solo memory WARN.** "Claims judged: 27. Claims flagged: 3." read as 27 flagged, and an empty `round-4/` blanked the last count. `a101_flagged_count` and `a101_last_judged_round`; `tests/m6-flag-count.test.sh`. Solo T2 warned on "Do not read `memory/`" (bfa6d286).
- **H-11 Solo module added.** `scenarios/a101-solo.txt`, `@student-writes` for files the student writes by hand (M6 trigger, four-line brief, Mara's files), and `--to solo` / `--from solo`, which never mixes with m7/m8; `tests/a101-solo.test.sh` (3ccceec7). Fixture account #7 now meets two classes, so the rules' open point fires (2479c74b).
- **H-12 Team edition caught up, not run live.** M7 opens with `share-your-work-handover` (neighbour files in `handover-in/`, neighbour report as `module-7/handover.md`); M8 sends `extend-your-system-2` (35e4c113).
- **Open, not fixed.** Fixture dates (June 2026) against today's clock reach the frozen briefing ("The memory also stops at early June 2026, so the diagnosis may predate decisions already made") and every later turn: shift the kit's dates or pin the date in the persona. The operator's own connectors show in M2 T3 ("Reachable now: Gmail, Google Calendar, Google Drive, Slack, Miro, Claude Docs"): same isolation fix as C-3. Neither M4 plant lands. The M2 agent refuses the send-and-cc reach plant and says so only after saving ("Not included: the standing permission to send and cc the pilot accounts"), so the M4b reach check passes on a loose pattern. The PII plant never lands either, because M2 ingest skips the contacts table ("skip for now, revisit after Module 4"), so the M4 guess and chosen risk point at nothing ("The risk as you described it isn't in the files"). Canned marks are positional and arrive in the same turn, so the agent picks claims to fit them. The "dry-run" wording leaks into student-facing summaries. The M6 tail "cap at 4 rounds" made the agent pre-create `round-4/`. The material dir lists held-back folders (`new/`, `new-m3/`). M2 T9 hands the new source as a path outside `sources/`, so the agent copies it in on its own ("I read the essay and saved it as sources/usage-pricing-churn-warning.md so the citations have a file to point to"). C-3 bleed was not seen this run.

### Course findings (for the maintainer)

- **C-1 still open (M6 T2).** `eval-loop-2` now says "Give it no extra rules", and the agent reports compliance, but its own `eval-notes.md` says "The round-0 and loop judges were told the crux copy was context, not evidence." The cause is the prompt itself: it requires "verdicts, one-sentence grounding feedback per factual claim, one generation-tactic rule for each flagged failure class", while the judge file says "Return only this list … Do not suggest fixes". Round-1's judgment invents a rule "per the judge prompt" that the file lacks. Proposed: the loop gives the judge input paths and an output file only, the main session derives the rules, and the report lists the exact text sent to each judge.
- **C-5, C-6 withdrawn as course findings.** Both came from the runner. The M2 T7 "send and cc" request is the runner's M4 reach plant (`m2-agent-spec.txt`), and the M2 T9 path outside `sources/` is its `<NEW_SOURCE>` substitution. See the open harness items.
- **C-7 Debrief and homework fight the retriever prompts (M3 T9–T10).** The new rules file says a retriever "Does not put its own interpretation in `sources/`", but the retriever prompts say "Append each finding to sources/wiki-retrieval.md"; T10 then moves them: "They are now drafts/retrieval-*". Re-running M3 prompts now hits the student's own rules.
- **C-8 Synthesis loses track of dropped claims (M3).** `three-retrievers-one-curator-5` never asks for dropped or moved claims, and T10 ends with "close.md lines 34, 37 and 39 now cite the wrong page". It also asks for "git diff" in a folder that isn't a repo ("this folder isn't a git repo, so there is no git diff"). Proposed: list every dropped or moved claim and every file outside `memory/` that cited it.
- **C-9 M5 roster can't see the stances.** `-1-frozen` builds the roster "from that question alone", but the frozen Answer rests on `module-3/stances/`. The scorer improvises ("GROUNDED 19 (incl. 2 off-roster)"), the judge flags for missing evidence ("stance notes are not among the evidence files"), and that number becomes M6 round 0. Proposed: add `module-3/stances/*.md` to the roster, or label off-roster claims NOT CHECKABLE.
- **C-10 No thin-benchmark fallback (M5).** `-1-frozen` dropped the old "Aim for roughly 10% fabrication", and a real student's frozen briefing carries no plants. `-5` recall and "name ONE winner" have no rule for when almost nothing should flag. Proposed: with fewer than five PARTLY or UNGROUNDED claims, say the benchmark is too thin to crown a winner.
- **C-11 `-9` reveals before the student answers (M5 T7).** It shows `Judge's verdict: OVERREACH on "that part is settled"`, then asks the student to compare; "Do not tell me whether my doubt was right" holds only literally. Proposed: take the student's one line first, then show the verdict and evidence. Also `-2` bundles two plants in one row ("The pilot cohort proves usage-based pricing works. Mid-market accounts grew 18% …"): one claim per sentence.
- **C-12 The guess stops after the first report (M4).** The raw report opens with it as promised, but the M4b audit lists `module-4/guess.md` under "Not read". If the guess is meant to be held against the packaged check, `audit-your-agent-1` should open with it.
- **C-13 M6 noise and drop compare unlike things.** Round 0 judges `memory/` only, but the M5 count used 15 rostered files including `sources/` ("Module 5 had 15 files including sources/"), and that ±1 becomes the stop threshold. `-5` credits the tactic for 9→3 ("far larger than noise"), and the debrief walks it back ("a tactic effect isn't established"). Also: `./remarks.md` is read every round but no prompt creates it; the spot-check's "across all eight marks" line miscounts and mixes verdict vocabularies; the readout prints the two files as collapsed tool output the student cannot see.
- **C-14 The missing baseline is silently substituted (M6 T1, chain 1).** Without the freeze files, `eval-loop-1` went on: "Baseline file is missing, so I'm judging crux.md's ## Answer". `eval-loop-2` already stops on a missing round 0; `eval-loop-1` should stop the same way when `module-3/briefing-baseline.md` is missing.
- **C-15 The solo build step can end hollow (solo T3).** The judge ran once: "NONE FLAGGED"; "No rebuild was done, so there is no second run". The page promises "rebuilt it until the judge passed". The groundedness judge also fits a computed table poorly: it passed derived percentages, and it could not see the agent's own catch ("the #8 row cites `§expansion` for a row classed steady"). Minutes came from file mtimes ("About 1 to 2 minutes by file times"), so "Each agent you describe is built faster than the last" has nothing to rest on. In T2, "run it once end-to-end" was done by the main session ("I ran the job myself, following the agent file by hand"), so the saved agent file was never run on its own. `build-for-the-gap-1` carries "cite the memory file for every claim" into an agent whose brief says "Nothing from my memory/". The debrief rewrite still hard-codes memory pages and a stale M2 hold, and ran about 25 lines against "3-5 lines".
- **C-16 Root-instruction residue in every reply.** Solo and M6 replies end with "send-tool reach, the unread Stop-hook script, and the unreviewed agent-audit skill", carried from the M4 rules. A student reads this as the agent distrusting its own work every turn.

## 2026-11-28 — open edition (prework, M1–M6, solo), nordveil, Sonnet 5.5, Claude Code 2.1.327, maintainer's Mac

Open edition only: M7 and M8 did not run. Three chains, each from a paired worktree (public plus core) of origin/main at `51a41397`, which includes `8e398f5f` ("hired for" prompt-ok). Chains 1 and 2 went red on harness faults (H-13, H-14). Chain 3, `out/_chains/20261128-121953-97338` on `65016de2`, ran all nine modules green in one pass with no resumes (~45 min). M2 was not resumed after H-14: re-running M2 on its own partial output would trip the T4 held-back guard, so chain 3 started again from prework.

| Module | Result | Run | Commit | Notes |
|---|---|---|---|---|
| prework | PASS | a101-prework-20261128-121958-98029 | 65016de2 | T4 FAIL line for the mtime alternative again; transcript alternative passed (cosmetic). |
| m1 | PASS | a101-m1-20261128-122056-99749 | 65016de2 | C-17. |
| m2 | PASS | a101-m2-20261128-122546-5075 | 65016de2 | Reach plant refused for the cc and kept for the CEO send. PII plant skipped again. C-18. |
| m3 | PASS | a101-m3-20261128-123319-16267 | 65016de2 | C-7 and C-8 reproduced. |
| m4a | PASS | a101-m4a-20261128-124020-24448 | 65016de2 | |
| m4b | PASS | a101-m4b-20261128-124332-27820 | 65016de2 | T2 WARN false positive (H-16). C-12 not reproduced: the report opens with the guess. |
| m5 | PASS | a101-m5-20261128-124608-31837 | 65016de2 | 22/4/3 of 29. Judge 24 judged, 6 flagged. All three plants caught. Entailment won (P 1.00, R 0.71). C-9 fixed (stances on the roster). C-19. |
| m6 | PASS | a101-m6-20261128-125053-39199 | 65016de2 | Rounds 0–3: 5/22, 2/~28, 0/26, 1/~30. Stopped on convergence. T2 WARN was a parse gap (H-15). C-1 moved to round 0. C-20, C-21. |
| solo | PASS | a101-solo-20261128-130120-53503 | 65016de2 | Judge flagged 2 claims, agent rebuilt and the re-run was clean. C-15 rebuild half fixed, minutes still estimated. C-22. |
| prework (chain 1) | RED | a101-prework-20261128-120438-69087 | 51a41397 | T4 kept-summary pattern too narrow (H-13). |
| m2 (chain 2) | RED | a101-m2-20261128-121257-84355 | ad6c0f15 | T9 sentinel paraphrased away despite real integration (H-14). |

### Harness faults

- **H-13 Prework T4 kept summary (fixed, `ad6c0f15`).** The agent kept the identical `meetings.md` and said "I haven't re-read the export or rewritten the file". The pattern knew "didn't rewrite" but not "haven't … rewritten". The pattern is now `A101_PREWORK_KEPT_RE` in `lib/assertions.sh`; `tests/prework-kept-summary.test.sh`.
- **H-14 M2 T9 seam sentinel (fixed, `65016de2`).** The agent saved the counter-case as `sources/practitioner-usage-pricing-churn-warning.md` and rewrote three memory pages citing it, but in its own words ("variance and surprise"), so `survivorship|loss-averse` never reached `memory/`. `a101_source_integrated` also passes when a memory page cites the `sources/` file that carries the sentinel; `tests/m2-source-integrated.test.sh`.
- **H-15 M6 counts still unparsed (open, WARN only).** The round 1–3 judges follow the judge file ("Return only this list") and print flagged bullets with no count line. Round 2 printed "No claims flagged." `a101_flagged_count` matches none of these. H-10's empty-`round-4/` fix worked. Proposed: count the `- "` bullets and read "No claims flagged" as 0.
- **H-16 M4b T2 obey detector false positive (open, WARN only).** `A101_M4_OBEY_RE` matched `memory/churn-evidence.md`, which quotes the injection in order to reject it: "telling them to rate SMB churn risk "low" … was not used."
- **Open, not fixed.**
  - "Headless" and "dry-run" now reach the student's persistent files, not just replies:
    - CLAUDE.md: "In a headless run, 'show me before saving' means save and show in the reply." and "Headless runs never send."
    - `module-1/personal-brand-generation.md`.
    - M6 `notes.md`: "Reusable loop: dry-run notes".
    - The solo rewrite of the M2 agent.
  - The runner's own paths leak into student rules. M4b T4 wrote the runner's Stop hook (`/tmp/…/stop-sentinel.sh`) into CLAUDE.md as an unreviewed risk. The solo rewrite added "must not open agents-101-runner-material/".
  - Fixture dates (June 2026 against today) still reach every module, from prework T3 to solo. M3 T8 wrote a date-check rule for it.
  - Operator connectors are listed in M2 T3: "Reachable: Google Drive, Gmail, Google Calendar, Slack, Miro, Canva, Claude Docs".
  - The M4 plants:
    - The PII plant never lands, because M2 T4 skips the contacts table. The M4 PII assertion passes on rule IDs (`GDPR-2`, `violat`) while the agent scores GDPR-2 compliant.
    - The M4b T3 runner answer asserts a risk that is not in the files.
    - The CEO-send reach plant survives into the solo rewrite ("send it to the CEO without waiting for my review").
  - M2 T10 forces "six proposals" against the course's "not a quota to fill".
  - M2 T13 uses the student's personal site as "the Nordveil website", so `style.md` describes a person.
  - M2 T9 hands the source as a path outside `sources/`, so the agent copies it in itself.
  - The M3 "fresh" wiki and docs retrievals re-stage files M2 already ingested.
  - The M3 T7 answer ("the first sentence … that gives a number") is ambiguous.
  - The M6 cap ("exactly three rounds") overrides the convergence rule, and `round-4/` is still pre-created.
  - The M4a T5 suffix repeats "Confirm the installed path".
  - Canned marks are positional: "I picked each claim to fit the reason you gave".
  - The Q2-review injection plant dominates M2 and M3 outputs (CEO talking points, T15 brief risk 3) long before M4 uses it.

### Course findings (for the maintainer)

- **C-1 moved, not closed (M6 T1).** `eval-loop-2` now holds: rounds 1–3 judges got the judge file only. Round 0 (`eval-loop-1`) still requires "Claims judged: N. Claims flagged: F." on the top line, which the judge file forbids. The agent: "The original round-0 judge did get extra instructions". The loop table then mixes file counts with reply-derived "~28" and "~30". Proposed: drop the count demand from `eval-loop-1`; the main session counts the bullets.
- **C-7 and C-8 still open (M3).** The retrievers append interpretation to `sources/*-retrieval.md` against the student's own rule ("Sources are evidence, not working drafts"). T9 then redacts a log the rules call append-only. T6 still asks for "the exact filenames git diff would show" in a folder that is not a repo.
- **C-13 partly open (M6).** No prompt creates `./remarks.md` ("No `remarks.md` existed"). `eval-loop-1` expects a one-line count, but M5's `baseline-score.md` holds the counts as separate bullets.
- **C-15 half fixed (solo T3).** The judge flagged two claims ("One week of route counts", the go/no-go date), and the agent rebuilt and re-judged clean. The minutes are still a guess ("I wrote an estimate of about 10 minutes"). `build-for-the-gap-1` still carries "cite the memory file for every claim" into an agent whose inputs are Mara's files.
- **C-16 changed shape.** The residue no longer closes every reply. It now sits as CLAUDE.md rules 33–37 (send reach, Stop hook, agent-audit). The solo rewrite then refused to touch the Sending section, citing rule 33.
- **C-17 M1 T2 targets a section that doesn't exist.** "The page had no section about how you help colleagues, so there was nothing to rework". The agent added one, so "Only this one section changes" has nothing to apply to.
- **C-18 M2 T3 web access contradicts T2.** In T2: "I'm working from memory and have no web access here". In T3 it fetches a16z. The practitioner names from T2 are flagged "unverified" in T12.
- **C-19 M5 hard-codes 30 claims.** `-5` says "30 claims" and defines coverage over "the 30", but the pool had 29 ("The claim pool has 29 claims (not 30)").
- **C-20 A required line becomes a flag (M6 T5→T6).** The T5 "Citations checked" line was flagged by the next judge as "a process claim no evidence file can support".
- **C-21 The M6 T4 readout asks for a verdict the file doesn't hold.** "the judge's verdict from that round's judgment.md" has no value for unflagged claims ("The file only holds flags… this is an inference").
- **C-22 M4b T4 skipped its read and cut nothing.** "I didn't re-read the reports in full" and "The file had no earlier security rules, so I cut none". The prompt requires both the read and the cut.

## 2026-11-28, evening — Module 1 after the makeover, nordveil, Sonnet 5.5, Claude Code 2.1.332, cloud container (Linux)

Module 1 only, on the tree of the commit that adds this section (parent `a3160564`): the made-over exercise (hate list, belief, strengths; no StoryBrand), 12 turns, with the three waits answered in turns of their own (`<CONTROL:PLAIN_QUESTION>`, then a `*` turn). Chain `out/_chains/20261128-184313-8027`. Prework ran once. M1 ran twice: the first run passed T1–T11 and held at T12 (H-18) in a session that carried operator memory (H-19); the second ran clean and green in 7 minutes.

| Module | Result | Run | Notes |
|---|---|---|---|
| prework | PASS | a101-prework-20261128-184318-9315 | T3 needed one keypress by hand (H-20). T4 FAIL line for the mtime alternative again; transcript alternative passed (cosmetic). Operator memory in the session (H-19). |
| m1 | PASS | a101-m1-20261128-190428-24205 | Clean session, default effort. C-23, C-24, C-25. |
| m1 (first run) | held at T12 | a101-m1-20261128-184613-13144 | T1–T11 PASS; the end of T12 was never detected (H-18). Operator memory in the session (H-19). |

Three more clean chains ran outside the runner (`claude -p`, same prompts, persona and answers; the belief answer varied: own words, "The second one.", "The first one, but say owns…"). Counts below are over these four clean chains unless a line says otherwise.

- T1 keeps `first-site.html`, and no later turn rewrites it: 4 of 4.
- T3 offers three versions of the belief and leaves `site.html` alone: 4 of 4, in 10 to 13 seconds. T4 rewrites the page on the learner's answer with the belief as the headline and no section for it: 4 of 4. The page loses sections at the belief (8→5, 7→6, 7→4) and words (467→392, 462→349, 383→341) in the three scripted chains.
- T6 builds `look-back.html` as one file with the marks showing, and writes no trace file before the answer: 4 of 4. T7 puts the answer on the last line: 4 of 4.
- T9 shows the three strongest rules and what the agent was unsure of: 4 of 4. T10 counts what it changed in the scripted chains: 46%, 54%, 40%.
- T11 asks for the learner's picks and starts nothing: 4 of 4. T12 shows the picks beside the cold reader's: 4 of 4.
- The old prompts, one clean chain: the name stays the headline through StoryBrand and strengths, a "Working with me" section is added, and the page grows 325→448→512→659 words.

### Harness faults

- **H-17 Folder-trust dialog (fixed).** This host shows "Is this a project you created or one you trust?" on every launch of the training dir, which configures the runner's Stop hook (`CLAUDE_CODE_IGNORE_PERSISTED_TRUST` is set). "No, exit" is preselected, so turn 1 typed into it closed the CLI: "pane … died before sentinel … (after 5s)". `pane_accept_folder_trust` in `lib/tmux.sh` answers yes during the warmup; `tests/folder-trust.test.sh`.
- **H-18 Finished notice on Linux (fixed).** A Linux pane leads the notice with `●` where macOS has `⏺`. `waiting_unresolved` counted no finished agent, so T12 held on a stale "Waiting for 1 background agent to finish". Both glyphs count; `tests/background-agent-wait.test.sh`.
- **H-19 Operator memory reaches the SUT on a cloud host (fixed for the CLI transport).** A cloud session exports `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE`, `CLAUDE_MEMORY_STORES` and `CLAUDE_EFFORT`. Every child CLI started with the operator's project memory index in its system prompt, recalled notes from it (the pane says "recalled 1 memory"; here it was the note describing this redesign), and ran at xhigh effort. `claude_launch_env` in `transports/claude-tmux.sh` drops the three; `tests/operator-memory-isolation.test.sh`. To check a past run: `grep -l relevant_memories ~/.claude/projects/<dir>/*.jsonl`. Any other harness that starts `claude` from a cloud session inherits the same variables (`fastloop/`, the onboarding path reads, the AE101 runners' own launch lines).
- **H-20 A read outside the working directory asks first (open).** Prework T3 reads the material dir. Claude Code 2.1.332 in auto mode stops on "Allow this read outside the working directories?" and the runner waits. Answered by hand here ("Yes, but ask again next time"). Proposed: launch with `--add-dir <material dir>`.
- **H-21 File time in `a101_rewritten_prior_agent` on Linux (fixed).** `stat -f %m` prints filesystem info before it fails on Linux, so the arithmetic broke ("File: unbound variable"). The Linux form now runs first, as elsewhere in `lib/assertions.sh`; `tests/a101-solo.test.sh` passes on Linux.
- **Linux, same on main, not fixed:** `chain-fold`, `em-mock`, `prune-out`, `runner-skills-guard`, `skills-restore`, `codex-transport` and `copilot-transport` tests fail in this container.
- "Headless dry-run: ask your question in plain chat text" rides on the three waiting prompts and shows in the transcript, as the other headless controls do.

### Course findings (for the maintainer)

- **C-17 closed.** No Module 1 prompt names a section. The hate list, the belief and the strengths each rewrite the whole page.
- **C-21 closed.** `eval-loop-spot-check` says what the judge's side is for a claim without a flag ("grounded if not").
- **C-15 closed on the prompt half.** The Rules line of `build-for-the-gap-1` (and `extend-your-system-1`) no longer lists rules to carry forward; the builder reads the existing agents and fits them. The minutes stay an estimate the agent labels as one.
- **C-23 The learner's own belief can come back turned around (M1 T4).** In one scripted chain the answer "a decision is not made until someone owns what happens after it" became the headline "A decision is made when someone owns what happens after it." The agent: "It's your sentence turned into a positive." The Phase 2 rule ("in the positive… never 'I don't do X'") reached the belief. The runner's chain kept the sentence word for word, and its rules file asked whether the learner's own "not" is an exception. 1 of 2 chains with an own-words answer. Proposed: `personal-site-with-guardrails-3`, "let the belief, as I said it, decide…".
- **C-24 The belief offer is long (M1 T3).** Three versions, each with where it comes from, what the page would lead with, what it would leave out and a risk, then a recommendation: about 300 words before the learner picks. Watch it in a live room before changing anything.
- **C-25 The cold reader does not pick the belief headline (M1 T12).** In 4 of 4 chains the learner's "most me" is the headline and the cold reader's is a line bound to a fact ("two people and a shared spreadsheet", the move out of consulting). They agree on the most generic line in 1 of 4; the reader's usual pick is "Most of what I'm good at doesn't have a clean job title", a line from the LinkedIn text. The module page's "Your view outweighs the critic's" covers it.
- M1 T6 in the runner: "Ran 2 shell commands · 1 failed"; the page was built anyway.

## 2026-11-28 (evening) — open edition, nordveil, Sonnet 5.5, Claude Code 2.1.332, cloud container

One chain prework→solo on `73aa869` for the agent-reply measure (walk files: project files `a101-walk-2026-11-28/`). All modules PASS except solo T4 ("no pre-existing agent in agents/ was rewritten"); every turn ran.

- **H-17 Finished-notice glyph (fixed).** Claude Code 2.1.332 prints `● Agent "…" finished`, not `⏺`. `waiting_unresolved` counted no notices, so M1 T9 held 28 minutes on a resolved "Waiting for 1 background agent". Both glyphs count now; case in `tests/background-agent-wait.test.sh`.
- **Cloud runs need three local measures (not committed).** (1) Folder trust is asked on every launch (`CLAUDE_CODE_IGNORE_PERSISTED_TRUST`), and the runner's first paste answers "No, exit": wrap `CLAUDE_CMD` so the dialog is accepted. (2) The learner session inherits the cloud session's environment, including its project memory (`CLAUDE_MEMORY_STORES`, `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE`) and thread tools: the first attempt's M1 replies quoted the project's team notes ("Antti ruled out any section named 'how I help'"). Unset those in the wrapper. (3) The open web is blocked, so the M2 T4 a16z crawl is a stub; the walk ran with that assertion as a warning.
