# Bug-finding improvements — todo list for future runner-mechanic sessions

Captured 2026-05-24 after self-introspection on the M1+M2 dry-run sweep. Numbered roughly by yield-per-hour: high yield + low effort first.

## Done

- [x] Read M1 + M2 transcripts turn-by-turn (not just sampled final artifacts) — done 2026-05-24, findings logged below the list.
- [x] Fix wait_for_turn cleanup hang — done 2026-05-24. Added `pane_capture_safe` in `lib/tmux.sh` that wraps `tmux capture-pane` in a hard wall-clock alarm (gtimeout → timeout → perl-alarm fallback for macOS). All FAIL-path captures + EXIT trap captures in run-m1.sh and run-m2.sh now use it. Previously a high-effort claude rendering past the runner's sentinel timeout could hold the bash trap hostage for an hour.
- [x] Backport key_seq dispatch to run-m1.sh — done 2026-05-24. Lets the same runner drive both `scenarios/m1.txt` (no literals) and `scenarios/m1-codesearch.txt` (with `* One commit, no PR` literal). Cases 6+7 updated to handle commit-at-T6 (m1.txt tail) OR commit-at-literal (m1-codesearch.txt default).
- [x] N=4 of M1 non-deterministic save-gate — collapsed via m1.txt tail rewrite (lazy-student "don't call AskUserQuestion + don't commit at T4" guard). m2-codesearch.txt by other agent uses the smarter ask-and-wait pattern (preserves Q&A in chat text + canned student-voice replies).
- [x] **run-m4.sh `m4_sha` grep fixed 2026-05-25.** Was greping first 7+hex from turn-5 transcript (caught prior-commit references). Now uses `git log --format='%h' --grep='^M4 starting point$' -1` on the SUT cwd; falls back to transcript-grep only if git lookup is empty. Authoritative source is git itself.
- [x] **run-m3.sh race loop liveness check landed 2026-05-25.** Race loop now calls `tmux has-session` on both main + quality sessions every poll cycle. Fails fast with named-session diagnostic if either pane dies externally (OOM, API kill, etc), instead of polling for the full 7200s phase-B timeout. Earlier M3 runs polled 90+ min after the session was actually gone.

## Caught 2026-05-25 M5 + M6 lemmings runs

Both runs PASSed end-to-end on the M1→M4 chain. M5 produced a real fix: three commits (fitness guard `aca8342` → packaging artefacts `dd7091b` → blocker-deadlock fix `e49b1ac`), `npm test` 7/7 green including the new `tests/blocker-terminal-no-scan.test.js` shape-check. M6 authored `~/.claude/skills/plan-gap-finder-lemmings/SKILL.md` and saved an arc note to `docs/notes/2026-05-25-rules-to-guards.md`. Bugs found:

- [ ] **Pre-existing target worktree path silently breaks the M5 contract.** Before this run, `~/Projects/lemmings-m5` already existed from a prior unrelated dry-run (10-level campaign work). `ae101-m5-worktree-setup` would have tried `git worktree add ../lemmings-m5 <sha>` and hit git's refusal on a populated path. The runner's PA assertion is `[[ ! -d "$worktree_cwd" ]]` — checks dir existence only, doesn't verify the worktree was *created by this run*. A pre-existing path passes that assertion trivially even if the prompt's `git worktree add` errored. Workaround for this run: `git worktree move lemmings-m5 lemmings-m5-prior` before launch. **Real-cohort risk:** any student who reruns M5 (replay, swapped repo, second pass) hits this and the curriculum doesn't say what to do. **Runner fix:** PA pre-flight should refuse to launch if `worktree_cwd` exists; PA post-assertion should verify the worktree's HEAD matches the M4 starting-point SHA, not just that the dir exists.

- [ ] **`m5-state.json` `m5_verifier` field captures a code-fence fragment, not the saved path.** Output of the 2026-05-25 run: `"m5_verifier": ".claude/hooks/\`,"`. The auto-discovery regex in `run-m5.sh:545` greps PB transcripts for `(/Users/[^[:space:]]+|~/[^[:space:]]+|\.claude/hooks/[^[:space:]]+|verifier\.[a-z]+)` then filters on `(verifier|hook|judge)` and takes `head -1`. Backtick code-fence fragments in Claude's prose match before the actual saved path does. The real verifier landed at `tests/blocker-terminal-no-scan.test.js` (npm test path, not `.claude/hooks/`). **Run-m6.sh does not read `m5_verifier`**, so the garbage doesn't propagate downstream — but the state.json claims a path that doesn't exist. Fix: drop the heuristic and `git status`-diff before/after the save-gate literal to find the real new path, OR add the verifier's path to the canned-reply literal so the runner doesn't have to guess.

- [ ] **PB-T4 pre-save tree empty → case-5 verifier-tree-advance assertion never fires.** `tree_sha_before_verifier_save="$(cd "$worktree_cwd" && git stash create 2>/dev/null || true)"` returns empty on a freshly-forked clean worktree (nothing to stash). Then case 5's `if [[ -n "$tree_now" && "$tree_now" != "$tree_sha_before_verifier_save" ]]` falls through to the scrollback-grep fallback every time. PB-T5 PASSed on this run via the loose grep, not the tree-advance check the comment claims. Fix: use `git ls-files --cached --others --exclude-standard | sort | sha256sum` (or `git rev-parse HEAD` + a separate untracked-file list) as the baseline; OR check that the verifier path Claude named in T4's scrollback exists on disk by T5.

- [ ] **`m6_arc_note_paths` scan misses agent-chosen `docs/notes/`.** Run output: `"m6_arc_note_paths": []`. Actual save: `docs/notes/2026-05-25-rules-to-guards.md` (the agent created `docs/notes/` for it). `run-m6.sh` walks four candidates: `.claude/memory`, `docs/adr`, `docs/adrs`, worktree root. The arc-retrospective prompt says destination is student-picked ("ADR / `.claude/memory/` memo / standalone file"), so a free-form picker can land anywhere. Fix: use a `find $sut_cwd -type f -name '*.md' -newermt "@$run_start_epoch"` walk with excludes for known noise (`node_modules`, `.git`), not a whitelist of dirs. False positives are recoverable (humans filter); false negatives mean state.json lies.

- [ ] **Pre-existing `~/.claude/skills/verify-by-hand-judge` (from codesearch agent's M6) leaks into lemmings M6.** Skills are user-level, not per-SUT, so any prior M6 run installs a skill that the next run sees. T4 chose a *different* name this time (`plan-gap-finder-lemmings`) so suffix-rename didn't fire, but only because the dominant gap was different. **Runner-hygiene fix:** before launching `run-m6.sh`, list `~/.claude/skills/` and either (a) prune skills authored by prior dry-runs into a `prior-runs/` namespace, or (b) snapshot the dir and restore at the end. **Curriculum-side risk lives in M3's pre-cohort-todos.md note** — same axis.

- [ ] **M6 makes zero commits to the worktree.** `m6_starting_sha == m6_ending_sha == e49b1ac`. By design — M6 ships a user-level skill (`~/.claude/skills/plan-gap-finder-lemmings/`) and an arc note (`docs/notes/...`). The runner's state.json shows no commit delta and that's correct. Worth a one-line comment in `run-m6.sh` so the next maintainer doesn't read it as a regression.

- [ ] **Reference-package coupling regression that the new skill noticed but didn't catch.** M5's reference.md prescribed `import { SKILLS }` to derive the blocker count — and the in-flight `fix/per-game-skill-budgets` branch drops that export. M5's run was green here but throws on rebase. `plan-gap-finder-lemmings` was authored explicitly to catch this class of prescribed-coupling break, and the agent's own T7 arc note calls out that **the new skill is "prose again"** — the same soft shape M4 proved gets rationalized. The dominant lesson lands at the file's end: *"stop trusting guards you only wrote and start trusting ones you've watched bind under the change you fear — perturb the dependency, don't just name it."* Not a runner bug; a real curriculum insight about where the practice's ratchet hardens next.

- [ ] **`.residue-archive/` from prior dry-runs is now baked into the M4 starting-point commit, riding into M5/M6's worktree forever.** Confirms the existing `ae101-m4-commit-starting-point` "stage everything" finding biting two modules downstream. Every M5/M6 dry-run after the residue-contamination event ships those files in the working tree. **Curriculum fix:** runner hygiene (clean residue before M3+M4); OR prompt body should say `git add -p` / explicit file list, not "stage everything."

## Caught 2026-05-24 M4 run

- [ ] **`walk-and-send-off-3` says `.claude/memory/` — Claude saves to USER-LEVEL `~/.claude/projects/<encoded-cwd>/memory/`, not project-level `~/Projects/lemmings/.claude/memory/`.** Confirmed in M4 run `20260524-210132-96482`: Claude wrote `project_blocker_deadlock_no_scan.md` to user-level. Real-cohort risk: students expect their `./.claude/memory/` files to live in the repo (gitignored or otherwise). Files invisibly land in `~/.claude/projects/<encoded>/memory/` — a different home dir entirely. **Curriculum fix:** the prompt body should say `./.claude/memory/` (with leading `./`) to force the project-level path, OR explicitly say "user-level agent memory" if that's the intent.

- [ ] **`ae101-m4-commit-starting-point` says "stage everything" — over-commits residue.** In M4 run `20260524-210132-96482`, the M4 starting-point commit `104f4c7` captured `.residue-archive/` (4 files from prior M1+M2 dry-run failures) alongside the M3 ADR + task.md. For a real cohort student this is the intended behavior (committing whatever's in cwd). For the mechanical battery this means residue files end up in the dry-run history. **Runner-hygiene fix:** clean residue OUT of cwd between M3 and M4 runs, OR use a sibling outside cwd for residue archive.

- [x] **run-m4.sh `m4_sha` grep is wrong** — fixed 2026-05-25 via `git log --grep='^M4 starting point$' -1`. See Done section.

- [ ] **run-m4.sh has no per-turn artifact assertions.** Same gap as run-m3.sh. M4 PASSed all 6 turns with zero assertions — only sentinel-only completion. The M4 prompts produce real artifacts (task.md, M4-starting-point commit, fix commit, fix branch). All went unverified. If any silently dropped, M4 would PASS green. Worth backporting the per-turn pattern.

## Caught 2026-05-24 M3 runs

- [x] **run-m3.sh's race loop polls indefinitely if a tmux pane dies externally** — fixed 2026-05-25 via `tmux has-session` check in the poll loop. See Done section.

- [ ] **run-m3.sh has no per-turn artifact assertions.** Unlike run-m1.sh and run-m2.sh which gate each turn on a contract (file exists, commit landed, mtime advanced), M3 is sentinel-only. The M3 retry PASSed green, but if the ADR save-gate at T8/T9 had silently dropped (the same failure mode the M1/M2 work caught at compound-and-close), M3 would also have PASSed green. The artifact contract for each M3 prompt is implicit: T1 fork-worktree → quality cwd exists; T8 ADR save → `docs/adr/<N>-*.md` lands; T11 closer → user-level skill authored. Worth backporting the per-turn assertion pattern. Quality side has its own contracts (the skill authoring at quality T2/T4).

- [ ] **Skill-authoring lands at user-level by default, suffix-renamed on conflict.** In the M3 retry, `author-test-strategy-skill` produced `~/.claude/skills/test-strategy-lemmings/SKILL.md` (suffix `-lemmings` because the original `test-strategy` skill already exists at the user level — and the codesearch agent's earlier run added `test-strategy-codesearch`). Real-cohort risk: first-time M3 students would just get `test-strategy/SKILL.md` — clean. But returning students or students with the original test-strategy skill installed get the suffix-rename behavior, and the curriculum doesn't address what happens on conflict. Worth a one-line callout in the exercise: "if a `test-strategy` skill already exists, Claude will suffix-rename — that's fine, look at the saved path."

## Caught 2026-05-24 run #4 — RESOLVED

- [x] **wait_for_turn fires correctly but pane cleanup may hang** — fixed via `pane_capture_safe`. See Done section.
- [x] **N=4 of M1 shows non-deterministic save-gate behavior at T4** — collapsed via m1.txt tail rewrite. See Done section.
- [ ] **N=4 also shows committing-early variant** — STILL OPEN, this is a curriculum question, not a runner bug. Run 4 proposed commit at T4 rather than waiting for T6. The curriculum DOES allow this (both prompts end "Show me the diff before you commit"). Real-cohort risk: students who commit at T4 then hit T5's "Don't change anything yet... what's still surface?" + T6's "do it properly TDD-style" may be confused. Worth a curriculum-side question: is commit-at-T4 desired or accidental?

## Highest yield, smallest effort

- [ ] **Run M1 + M2 N=5+ on the same starting state.** Two runs is not a sample. Claude's behavior is non-deterministic. Findings like "ae101-m2-integrate-branch always integrates" come from N=2 — could be 80%, could be deterministic, no way to know. Capture: which assertions vary, which prompts produce stable artifacts vs which drift, which prompts depend on session priors that may not exist for every student.

- [ ] **Build a thin-M2 sim to test `ae101-m2-integrate-branch` "nothing earned, stop" branch.** Construct a deliberately bare M2 session (skip push-back, accept first plan, no second-pass walk-down) and run it through to the integrate-branch turn. Verify the "stop" branch can actually fire. If both branches always integrate, the conditional is hedging, not load-bearing — prompt could simplify.

- [ ] **Test the "no MCP connector" path on `compound-and-close-2` + `-3`.** Today's M1 scenario scopes both turns out. Include them, run with no tracker connector configured, observe what Claude actually does. The "graceful degradation" claim is currently unverified — could be a clean no-op turn (per the prompt's "say so and we'll create one" exit), could be a hang on a tool-call retry loop, could be a hallucinated ticket update.

## Medium yield

- [ ] **Test the replay-from-residue path at full strength.** Run M1 a second time on a lemmings repo where the FIRST run's `CLAUDE.local.md` is still in place (auto-loaded, not moved aside). Compare what compound-and-close-1 writes vs. what the first run produced. Real-cohort risk lives here (any student who reruns M1, swaps repos mid-training, or hits the supported "replay" path). My current runs reset state between runs — that's an artificial cleanliness.

- [ ] **Test M2 push-back-on-the-plan-2 in REAL plan mode** (no AskUserQuestion-no guard, manual Shift+Tab engagement). The "walk all branches in one pass" tail I use bypasses the 3-at-a-time interactive design. Findings on `push-back-on-the-plan-2` today are findings about the workaround, not about the prompt. Need a non-headless walk-through (or a runner that drives Shift+Tab).

- [ ] **Tighten the soft assertions.** T5 (`assert_or_warn` deeper-named), T7 in M2 (slack|webhook|...), T9 fallback grep — all loose enough that a hallucinated plausible-sounding response passes. Adversarial test: feed a deliberately-wrong response into the assertion harness and see which assertions notice. Anything that passes on garbage is testing nothing.

## Lower yield, higher effort

- [ ] **Adversarial scenario battery.** Deliberately bad task descriptions, wrong bug claims, contradictory tail context, residue-from-different-repo, malformed plan-mode answers. Run M1+M2 against each. Where do the prompts produce nonsense, and which assertions notice? This is the failure-mode probe the current happy-path battery doesn't do.

- [ ] **SUT-portability check.** Lemmings is one SUT. The codesearch playground (other agent's work, see `playgrounds/codesearch.maintainer.md`) is starting to probe portability. Once it stabilises, run the same M1+M2 scenarios against it and tag which findings were lemmings-specific vs which generalise. Today's `pre-cohort-todos.md` entries don't make this distinction — they could be SUT artifacts dressed as curriculum findings.

- [ ] **Build a "Claude went off the rails" detector.** Today's assertions catch artifact-contract violations (file missing, mtime not advanced). They don't catch semantic drift (Claude wrote a plan that doesn't address the task; Claude wrote a commit message that's a confabulation; Claude integrated rules from a different repo). A separate Judge-style pass against final artifacts (Haiku, cheap) could catch the "Claude looked busy but didn't deliver" class. Pairs with the script-ratchet principle (`check_platform_and_boundaries.md §17`) — start with prose-prose match against the prompt's stated contract.

## Meta — process improvements for future sessions

- [ ] **Stop conflating runner PASS with curriculum quality.** They're two layers (per `check_platform_and_boundaries.md §16`). The runner asserts contracts held; content quality is a separate audit. When I report "M1 PASSed all turns," that does NOT mean the curriculum is good — it means the artifact contracts held. Repeat this distinction in every report.

- [ ] **Stop folding to pushback without falsification.** When the user pushes back on a finding, the right move is: design a falsification test, run it, report what happened. The reflexive "you might be right elsewhere too, let me withdraw the rest" is sycophantic and erases real evidence. Document this in self-review-protocol.

- [ ] **Always read full transcripts before judging output.** Sampling final artifacts (commits, plan files, rules files) is the same shortcut as reviewing a PR by reading its description. Mid-turn behavior is where subtle prompt friction lives. Schedule transcript-reading as a separate step, not "I'll glance at the end."

- [ ] **Name what's untested explicitly in every findings report.** Today's report includes claims like "the chain is graceful in absence of tracker" with no observation behind them. Future reports prefix every claim with the evidence type: `[observed N=2]` / `[reasoned]` / `[untested]`. Saves me and the maintainer from rounding extrapolation into observation.

## Process — when to invoke this list

End of each significant runner-mechanic session. Pick one item, do it, delete the bullet. If the same bullet hasn't been picked after three sessions, downgrade or delete (it was a nice-to-have, not a real need).

---

## Findings from the 2026-05-24 transcript-by-transcript read

Read M1 run `20260524-145026-64490` (turns 1, 2, 6, 7) + M2 run `20260524-151314-79933` (turns 1, 6). Each finding tagged `[observed]`, `[inferred from N=1]`, or `[needs more data]`.

**F1. Orient-and-introspect-1 reads `.claude/settings.local.json` and identifies the eval harness.** [observed] Claude's T1 narrative says verbatim: *"This isn't a normal repo — it's a Claude-agent eval harness dressed as a game, part of an agents-102 curriculum. Three tells: (1) The .claude/settings.local.json Stop hook points at agents-102/curriculum/evals/mechanical/tmux-runner/hooks/stop-sentinel.sh. (2) The branches are eval scenarios... (3) The untracked CLAUDE.local.md.* files are session residue."* Claude knows it's being evaluated. **Mechanical-battery side effect:** the harness leaks its own existence into the SUT via the Stop hook installation. Findings about Claude's M1 behavior may include a "knows-it-is-tested" calibration that doesn't transfer to a real cohort student's repo. The real-cohort student installs no Stop hook; orient reads a clean repo. Worth thinking about whether the mechanical-runner findings overstate or understate cohort behavior.

**F2. M1 T6 (`fix-tests-first-3`) ends with TWO questions, not one.** [observed N=1] Exact tail: *"I haven't committed. Want me to commit this on m1/fix-hud-tally and open a PR (per your gh-not-direct-push convention)? And shall I fold the isResolved consolidation into the same PR as a clearly-separated refactor commit, or leave it for its own?"* The runner answers with one literal (`* One commit, no PR — just commit and move on.`). Claude correctly synthesized both answers (committed one commit, did NOT fold the refactor), but the second answer was inferred from "just commit and move on" — a different literal phrasing could have produced a different commit shape. **Real-curriculum surface:** the prompt's "Show me the diff before you commit" doesn't bound how many decisions Claude offers. In a real cohort, this opens conversation; for the mechanical-runner, it's a friction point that depends on Claude's prose-inference quality.

**F3. The "gh-not-direct-push convention" Claude references in T7 comes from residue.** [inferred from N=1] On my clean-baseline runs (residue moved aside), Claude shouldn't see this rule — but residue under `.preserved` / `.residue-after-*` sibling filenames is still readable via `ls` + `Read`. Orient picks up these residue files (per F1's "three tells") and the rules they contain. **Real-curriculum risk:** T7's commit shape (branch / PR / direct) on M1 RERUN depends on what rules are in cwd from prior runs. A first-ever M1 student gets default Claude behavior; a returning student gets rules-conditioned behavior. The exercise design implicitly assumes one path but doesn't say which.

**F4. `git diff` doesn't show untracked files; M1 `fix-tests-first-3` says "show me the diff."** [observed N=1] In T6, Claude self-flagged this gap: *"Plus the untracked files (won't show in git diff): package.json, tests/_dom-stub.js, and the rewritten tests/main.test.js (3 tests)."* Claude self-corrected. A less self-aware session might commit only the tracked changes. **Potential prompt sharpening (low confidence):** "Show me the diff and any new files before you commit." Defer the call — Claude's self-awareness handled it in N=1. Worth observing across more runs.

**F5. M2 T1 plan-mode prompt produces trace-based reasoning by default; hand-execution is a separate behavior that happens sometimes.** [needs more data] In this run, Claude in T1 traced the bash code by reading and identified the head-row bug. In a different M2 run (`20260524-091831-33155`, the FAIL run), the plan file content showed hand-execution: *"I ran the real lemming.js against the real Level-1 terrain in a throwaway harness."* Same prompt, different behavior. **The plan quality depends on whether Claude chose trace-vs-execute.** Not always reproducible. The prompt body says "Explore the files you need to understand the scope" — neither requires nor forbids execution. For a real cohort, students who get trace-only plans may miss what execution would find.

**F6. M2 T6 (`extract-the-task-shaping-rule-2`) correctly inferred prior task-shaping.md existence + integrated cleanly + self-corrected file drift.** [observed N=1] Caught that the file's frontmatter said "Fourteen rules" but the actual count was 18; fixed it. High-quality integration behavior. The "integrate, don't overwrite" instruction worked as designed when the file already existed from a prior session. **What we DON'T know:** does this work as well on first-ever M2 (no prior task-shaping.md, no @import line in CLAUDE.local.md)? Likely yes, but I haven't tested the cold-start path.

**F7. The `gh` / commit-shape conventions Claude consults come from where the curriculum doesn't pin.** [observed N=1] Composite finding from F2+F3+F7: Claude's T7 decisions depend on (a) what's in residue files, (b) what's in CLAUDE.local.md from prior runs, (c) what's in `~/.claude/CLAUDE.md` user-level. The exercise body and prompts don't fully specify which rules govern. **Real-cohort risk:** a student with a heavily-customized user-level CLAUDE.md gets different M1 behavior than a fresh laptop install. Not necessarily wrong (their rules SHOULD govern), but the curriculum's mood and outcomes vary by student-environment.

## What I'd do next, given these findings

- **F1+F3+F7 cluster** suggests a single experiment: run M1 on a totally-virgin laptop (no `~/.claude/CLAUDE.md`, no project residue, no auto-loaded rules), and compare T7's commit behavior + CLAUDE.local.md content to a "heavily-customized" run. The delta names what the curriculum implicitly assumes vs what it explicitly sets.
- **F4** suggests reading more M1 runs to see how often Claude self-flags the diff-vs-untracked gap. If <100%, prompt could harden.
- **F5** suggests a deliberate trace-only vs execute-encouraged variation on push-back-on-the-plan-1 to see whether execution-encouraged plans are systematically better.

These are all "studies to run," not "fixes to ship."

