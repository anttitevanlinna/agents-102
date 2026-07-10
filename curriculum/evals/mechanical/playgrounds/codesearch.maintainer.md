---
sut: codesearch
location: ~/Projects/codesearch (external clone — NOT inside this repo)
upstream: https://github.com/google/codesearch
pristine_tag: pristine (= 9979c2a, master HEAD with seeded bug amended into 2075077)
language: go
size: ~6.6k LOC, 4 binaries (csearch / cindex / cgrep / csweb)
status: scaffolding — bug-02 (siftUp) seeded, M1 harness run in progress
---

# codesearch — SUT for the tmux-runner harness

Real OSS code-search engine (Russ Cox's trigram index). First "small-to-medium real" SUT we point the harness at after the synthetic tiny-lemmings seed. Lives outside this repo because we want the agent to see an authentic Git tree, not a curated playground.

## Why this repo

- 6.6k LOC of plain Go in a tight tree (`cmd/`, `index/`, `regexp/`, `sparse/`). Small enough to clone fresh per run, big enough that the agent has to actually *read* instead of recall.
- Obscure as a *repo* (the trigram-index ideas are famous; the code isn't), so model recall is limited. Contrast with ripgrep / semgrep / tree-sitter — those are memorised.
- Real binaries with visible behaviour (`csearch foo`, `cgrep -A 2 bar file.txt`) — bugs grade by reproducing CLI output or by unit tests against the real internals.

## Precondition

- Go toolchain (`brew install go`). Verified working with go1.26.3.

## Reset between runs

```bash
cd ~/Projects/codesearch && git checkout master && git reset --hard pristine && git clean -fd
```

The `pristine` tag points at the buggy master HEAD (9979c2a). The bug is **amended into history** at 2075077 — there is no separate "fix this" commit to revert. Reset-to-pristine is the canonical clean state.

To recreate from upstream (rare — only if seeding goes wrong):

```bash
cd ~/Projects/codesearch && git fetch origin && git reset --hard origin/master
# then re-apply the seeding recipe in §Seeded bugs below
```

---

## Lessons from bug-01 (do NOT repeat)

Bug-01 was a `-A`/`-B` argument swap in `regexp/match.go`, injected as a **separate** commit on the master branch with message *"regexp: minor cleanup in lineContext call"*. Ran M1 against it and the agent found the bug in its first orientation turn:

1. **Branch name leaked the answer.** The branch was named `m1/codesearch-bug-01-context-swap`. Agent's first sentence: *"The branch name is a strong hint."*
2. **The bug commit leaked the answer.** A "minor cleanup" commit at HEAD with a 1-line diff to `regexp/match.go` is exactly what `git show HEAD` is for. Lemmings dodges this because its bug is in the Initial commit (`bdd0919`).
3. **Hawthorne effect.** The agent recognised the bug was staged: *"Whoever staged this bug left fingerprints in the documentation as well as the code."*

Bug-02 setup applies the lessons:

- **Neutral branch name** (`m1/codesearch-01`) — no bug-shape token.
- **Bug amended into history** (`2075077 index: move non-merge-specific code into write.go`) — there's no recent commit to grep, no leaky message at HEAD.
- **Real upstream bug** — siftUp is a real Damian Gryski fix from 2018, so the bug-shape isn't artificially novel.

---

## Seeded bugs (ground truth — do NOT share with the agent)

### bug-02-siftup (active for M1)

**Location:** `index/write.go` — `postHeap.siftUp(j int)`. Amended into commit `2075077`. The companion regression test (`TestHeap` in `index/write_test.go`) was also removed in the same amend.

**Change (vs. upstream):**
```diff
 func (h *postHeap) siftUp(j int) {
   ch := h.ch
   for {
     i := (j - 1) / 2
     if i == j || ch[i].e < ch[j].e {
       break
     }
     ch[i], ch[j] = ch[j], ch[i]
-    j = i
   }
 }
```

Also removed: a 14-line `TestHeap(t *testing.T)` block from `index/write_test.go` between `TestTrivialWriteDisk` and `TestZip`.

**Why this bug:** real upstream regression #47, fixed by Damian Gryski in commit `4109688` (Dec 2018). Without `j = i`, the loop body swaps `ch[i]` and `ch[j]` but never advances `j` to walk up the tree — it keeps comparing the same child against its new parent. The heap invariant breaks once a `siftUp` call needs more than one swap (i.e., the inserted element belongs more than one level above where it was added).

**Behavioural symptom:**
- Small indexes: fine. Heap is small, most `siftUp` calls terminate after one or zero swaps.
- Large indexes: posting-chunk merges produce out-of-order trigrams. Resulting index has hits attributed to wrong file IDs, or hits silently dropped. The threshold is around `postBuf = 4096` posting entries — once the merge has to actually heap things together meaningfully, the corruption appears.
- `go test ./...` is GREEN — there is no test exercising `postHeap` at all. That's by design: TDD-style, the agent must write the test that exposes the bug.

**Layered observation available:**
- Surface: the missing `j = i` line.
- Deeper: `postHeap` had zero test coverage. The whole reason this bug shipped (and got fixed in 2018) is that nothing was guarding the heap invariant. The deeper TDD pass should add a property test for siftUp/siftDown.

**Expected fix:**
1. Write a heap-invariant test against `postHeap` that fails on the buggy code (random pushes, pop-in-sorted-order).
2. Add `j = i` back at the end of `siftUp`'s loop body.
3. (Deeper, T6) Add stronger structural tests — siftDown coverage, multiple-swap cases, or a randomised property test.

**Grading rubric (rough):**
- ✅ Test added that fails on buggy code, passes on fix.
- ✅ Fix is the single `j = i` line — no broader rewrite.
- ✅ `go test ./...` green.
- ➕ Deeper pass adds coverage to `siftDown` too (the symmetric defect class).
- ➖ "Fixes" by rewriting siftUp from scratch or replacing `postHeap` with `container/heap` without first stating the line-level cause.
- ➖ Skips the test-first step — patches `siftUp` directly without writing a failing test first.

---

---

## M2 task — csweb shared-instance (security-surface lure for M3)

Branch: `m1/codesearch-01` (continues from M1's HEAD `4d1d1ac`).
Scenario: `tmux-runner/scenarios/m2-codesearch.txt`.

**Task description (in T1 tail):** extend csweb so a team can run one shared instance. Adds `--bind` flag for remote binding, `/api/search?q=` JSON endpoint, URL-hash-pre-populated queries that auto-run on page load. Touches `cmd/csweb/web.go`, `cmd/csweb/_static/viewer.js`, `cmd/csweb/_static/viewer.css`, README.

**Why this task:** deliberately *creates* security surface for M3 to threat-model. Mirrors the lemmings M2→M3 hand-off (Share-a-level feature → STRIDE on shareable URL):

- `--bind 0.0.0.0` — exposes the file viewer beyond localhost; was hand-wavy-safe at localhost, now reachable.
- URL-hash `?q=` auto-run on load — every share link is a one-click query vector; if the page does anything reflective with `q`, classic XSS amplification. Same Vercel-deployment-model risk the lemmings Share-a-level had.
- `/api/search?q=` JSON endpoint — content-type discipline, CORS, no auth.
- The existing show() handler reads raw file paths from request input (one of csweb's three pre-existing TODOs) — now reachable from anywhere.

Deliberately scoped OUT of M2: auth, path clamping, CORS, rate limiting. The task tail says "I'm deliberately NOT scoping auth or path clamping — plan for what I asked, not what I should have asked." Tests whether the planner stays in scope. M3 will threat-model the resulting attack surface.

**M3 hook:** the plan file M2 writes at `~/.claude/plans/m2-csweb-shared-instance-<adj>-<animal>.md` becomes the input artifact for M3's `map-the-access-surface-2` tail. Mirrors the lemmings M3 scenario's `harmonic-stargazing-wren.md` reference.

---

## M3 task — threat-model the csweb shared-instance

Branch: `m1/codesearch-01` for the main lane; quality lane runs in a sibling worktree at `../codesearch-m3-quality` on branch `m3/quality`, forked by `ae101-m3-fork-quality-side`.
Scenarios: `tmux-runner/scenarios/m3-main-codesearch.txt` (main lane) + `tmux-runner/scenarios/m3-quality-codesearch.txt` (quality lane). Driven by `run-m3.sh` with `SCENARIO_MAIN` / `SCENARIO_QUALITY` env overrides.

**Plan file M3 reads:** `~/.claude/plans/m2-csweb-shared-instance-brisk-otter.md` — the actual M2 dry-run output (adjective-animal slug from the most recent run; the `-4` tail says "if a slightly different slug is present, use that one and tell me which file you read"). This IS the plan M3 threat-models.

**Judgment-call security findings the tails reference:**

- `map-the-access-surface-4` ("the skill called out harder than I would have"): the existing `show()` handler in `cmd/csweb/web.go` reads raw file paths from request input — a pre-existing csweb TODO. At localhost-only it was hand-wavy-safe; now that `--bind 0.0.0.0` is on the table, the same handler is reachable from anywhere on the network with no auth. Real for csweb because the TODO predates the shared-instance task — M2's plan deliberately scoped path clamping OUT, so this is a known weakness that becomes a fresh exposure the moment the trust boundary moves.

- `map-the-access-surface-5` ("the surface the skill missed but matters in this codebase"): the `--bind` flag itself reshapes the security model at runtime. The same binary serves two security regimes depending on a flag value — localhost-only is implicit trust, non-loopback is no auth + full filesystem read for anyone on the network. Codebase-specific because csweb is a Go binary with a flag-rebound listener, not a per-deployment-config web framework where the trust boundary is set by infra. Access-surface skills tend to model the surface as static (this binary, these endpoints, these handlers); they don't model that a flag value can flip the whole trust boundary.

**STRIDE categories the agent should hit (rough rubric):**

- ✅ **S — Spoofing:** no authentication on `--bind 0.0.0.0`; anyone on the network is a client. This is the headline.
- ✅ **I — Information disclosure:** the `show()` handler now reachable from anywhere; full filesystem read of every file the csweb process can `os.Open`. This is the load-bearing finding for the STRIDE pick.
- ✅ **T — Tampering:** URL-hash query auto-run on page load makes every share link a one-click vector; if `q` is reflected anywhere, classic XSS amplification. Content-type discipline on `/api/search` matters here too.
- ➕ **D — DoS:** regex DoS on `/api/search?q=` — the endpoint compiles a user-supplied regex and walks every indexed file; a catastrophically expensive pattern saturates the goroutine pool. Bonus depth.
- ➕ **R — Repudiation:** no audit log on `/api/search` or `show()` — once the trust boundary moves, you can't tell who searched what. Bonus.
- ➕ **E — Elevation:** csweb runs as the user who has the index, so "what files can it read" is bounded by that user's filesystem access. Bonus framing; the headline elevation is already covered by the no-auth point.

**Expected ADR (`threat-model-with-stride-3` output):** a `docs/adr/NNNN-csweb-no-auth-on-bind.md` (or similar slug) capturing the spoofing/info-disclosure pair, with the hardening shape one of: (a) refuse to start when `--bind` is non-loopback without an `--allow-remote` confirmation flag, (b) require a `--auth-token` flag for non-loopback binds, (c) scope-clamp the `show()` handler to the indexed roots. M2's plan deliberately deferred auth, so the ADR is choosing AMONG follow-up shapes, not implementing one.

**Test-strategy answers (`author-test-strategy-skill-1` quality-lane reply):** Go's built-in `testing` package; no third-party framework; `net/http/httptest` for csweb; full suite runs sub-second; load-bearing tests are `index/write_test.go` + `regexp/regexp_test.go`; the named gap is that `httptest.NewServer` always binds loopback, so the no-auth-on-non-loopback behavior CANNOT be tested by httptest — the skill should call that out rather than pretend it's covered.

**Grading rubric:**

- ✅ Agent reads the M2 plan file before invoking `map-the-access-surface-2`.
- ✅ STRIDE pass produces findings in at least three of S / T / I / D / R / E.
- ✅ The picked threat for the ADR is S or I (the load-bearing pair).
- ✅ ADR names the M2-deferred-auth context, doesn't pretend auth was in scope.
- ✅ Test-strategy skill calls out the httptest-loopback gap as a NAMED gap, not as "skip".
- ➕ Test-strategy skill notes that csweb has zero tests today (greenfield gap, not "extend coverage").
- ➖ "Threat-models" the static csweb binary without distinguishing localhost vs `--bind 0.0.0.0` modes.
- ➖ Picks DoS or Elevation as the load-bearing class (real but not the headline).

---

## M4 task — implement the M3 ADR

Branch: forks from M3 main-lane HEAD on `m1/codesearch-01` (carries M1's siftUp fix, CLAUDE.local.md, M2's plan, M3's threat-model ADR + test-strategy skill). The commit prompt creates `m4/<task-slug>` per the prompt body.
Scenario: `tmux-runner/scenarios/m4-codesearch.txt`.

**Why this task:** M3 just shipped `docs/adr/0001-gate-csweb-network-exposure-on-bind.md` proposing a startup-time `--expose-without-auth` gate; the ADR also names `/show/` path-clamping as an amplifier. The implementation is the natural M4 candidate — un-packaged work whose context (ADR + test-strategy skill) was packaged in M3. It satisfies the walk-and-send-off shape: multi-file, multiple interacting constraints, several real ambiguities the agent must resolve without checking in.

### Real candidate (the obvious pick after audit)

Implement the M3 ADR decision plus the named amplifier:

1. **`--bind` flag parsing.** Doesn't exist yet — M2 planned it, never implemented. `--bind` accepts `host:port` (today: hard-coded `localhost:2473`). Resolve to a concrete address; classify loopback vs non-loopback.
2. **`--expose-without-auth` gate.** When the resolved bind is non-loopback and the operator did not pass `--expose-without-auth`, exit non-zero with a clear message naming the ADR's informed-consent framing. One startup check in `cmd/csweb/web.go`'s `main`.
3. **`show()` handler path-clamping.** The pre-existing `// TODO maybe trim file by ix.roots` at `web.go:179`. Clamp the requested path to be inside one of `ix.roots` after symlink-resolution; reject anything else with 403/404. The ADR names this as an amplifier of the I-class disclosure.
4. **One httptest-based test.** csweb has zero tests today; the test-strategy skill flags it as greenfield and explicitly carves out the `isExposed(bind) bool` decision as a *pure function* worth unit-testing while marking the socket bind itself as verify-by-hand. The agent should follow that carve-out: table-test `isExposed` (or equivalent), and a single `httptest.NewRecorder` test for the `show()` path-clamping reject path.
5. **README update.** Short section naming the new flags and the gate's behaviour.

Touches: `cmd/csweb/web.go`, `cmd/csweb/web_test.go` (new), README.

### Decoy candidate (plausible but obviously lower-impact after audit)

Add a `csweb` Help page at `/help` documenting RE2 regex syntax (anchors, character classes, the `(?i)` etc. csweb supports), example queries, and the URL endpoints. Touches `cmd/csweb/web.go` (new handler + route), optional minor `cmd/csweb/_static/viewer.css` styling, README.

Genuinely useful UX. But after an audit weighing leverage: the ADR was decided last session and has live exposure risk the moment anyone runs `--bind 0.0.0.0`; the Help page is nice-to-have with zero defer-cost. An experienced engineer picks the security work; the audit prompt should make this comparison visible without hand-holding.

### Expected gaps the audit should surface

The walk-and-send-off-2 audit should pull from a known set; the codesearch-flavoured ranking we expect:

1. **csweb is greenfield in test coverage** — the test-strategy skill already names this. The fix shape is "name it as a business-rules gap" or a sharpened rule in CLAUDE.local.md ("any new csweb code path ships with at least one httptest"). Highest leverage for an autonomous run because without it, the agent's "done" criterion is shaky.
2. **`--bind` parsing edge cases not specified.** Hostname vs literal IP vs `0.0.0.0` vs `[::]` vs unspecified-address are all "non-loopback by some definition." The ADR doesn't pin the predicate. Fix: a sharpened rule in `CLAUDE.local.md` or an observation in `observations/` naming the resolution algorithm (resolve, then check `IsLoopback()` on every resolved address; if *any* is non-loopback, gate).
3. **Path-clamp semantics under symlinks / case-sensitivity** — `ix.roots` are absolute paths the index was built against; on macOS, the filesystem is case-insensitive but path comparison isn't. The agent should surface this and decide (recommended: `filepath.EvalSymlinks` both sides, then prefix-match; reject on equal-or-not-prefix).
4. **No live test harness for non-loopback bind** — test-strategy skill already names this; the carve-out (test the *decision*, hand-verify the *socket*) is the load-bearing memory beat the audit should re-surface so the agent doesn't try to fake an httptest for the bind itself.

The audit may surface other gaps; these four are what an experienced reviewer would prioritise. Gap-fill in walk-and-send-off-3 should pick 2-3, not all four.

### AUQ risk surface in M4

The long send-off (`ae101-m4-take-task-end-to-end`, T6) runs autonomously up to 1h. Every prompt that lets the agent encounter ambiguity must suppress AskUserQuestion explicitly. M4 turns at risk: T3 (gap-fill — agent will want to pick differently than the audit suggested; suppression already in lemmings tail), T6 (send-off — highest risk; many ambiguities across an hour). M1, M2, M4 do not naturally invite AUQ on their own bodies but the agent's *reasoning* can; tail every prompt that could plausibly trigger.

### Grading rubric

- ✅ Agent picks the security candidate in T1 with leverage-based reasoning (ADR risk live; Help page deferable).
- ✅ Audit (T2) surfaces csweb-zero-tests as top-2 (test-strategy skill already names it).
- ✅ Gap-fill (T3) persists 2-3 fills to `observations/` or `CLAUDE.local.md` — not all four, not zero.
- ✅ Commit (T4) creates `m4/<task-slug>` branch, "M4 starting point" message, short SHA echoed.
- ✅ Send-off (T6) implements `--bind` parsing + `--expose-without-auth` gate + `show()` path-clamping, at least one httptest, README updated.
- ✅ `go test ./...` green at the end of T6.
- ➕ `isExposed(bind) bool` (or equivalent) extracted as a pure function, table-tested.
- ➕ Path-clamp uses `filepath.EvalSymlinks` and rejects on case-insensitive macOS edge cases.
- ➖ Agent calls AskUserQuestion at any point — runner can't answer, scenario hangs.
- ➖ Picks the Help-page decoy in T1 (treats UX as equivalent leverage to live exposure).
- ➖ "Implements" auth instead of the consent gate — the ADR is explicit that auth is out of scope.
- ➖ Path-clamp by string-prefix without symlink resolution (passes naive test, fails the obvious `..`/symlink escape).

---

## M5 task — review/iterate the M4 ADR send-off

Branch start: forks from M4's "M4 starting point" commit on `m4/implement-bind-gate` at `bdf9492`. The worktree lives at `../codesearch-m5` on branch `m5/implement-bind-gate`. M5 carries forward: CLAUDE.local.md, `observations/` (if present), the test-strategy skill at `~/.claude/skills/test-strategy/`, docs/adr/0001.

Scenarios: `tmux-runner/scenarios/m5.txt` (lemmings reference) + `tmux-runner/scenarios/m5-codesearch.txt`. Driven by `run-m5.sh` with `SCENARIO=` env override.

**Why this task:** M4 sent off the M3 ADR implementation un-packaged. The work is uncommitted in `~/Projects/codesearch` at fork time (+98 lines in `cmd/csweb/web.go`, new `cmd/csweb/web_test.go`, README). M5 reads that send-off through three failure-mode lenses (diagnose-and-resend), builds a verifier shaped against the dominant failure, assembles reference.md + plan.md scoped to the same ADR work, and re-sends packaged in a fresh session.

The codesearch fork-from-starting-point is deliberate: the worktree does NOT carry M4's uncommitted implementation work. M5 reviews what M4 *did* (read transcript + the uncommitted state via the original cwd) and produces packaging for a clean re-implementation. This is the artefact M6 reads to find the subtler-misses pattern.

**Phase A — worktree setup (`ae101-m5-worktree-setup`).** Runs in `~/Projects/codesearch`. Reads task.md's protected `Run coordinates` block (committed by M4), forks the worktree. The pre-cohort-todos `[watch]` says coordinates land at the bottom of task.md; the codesearch dry-run (2026-05-24) confirmed the agent reads them faithfully. The scenario does not paper over the placement — if it bites in a real cohort run, the watch fires.

**Phase B — diagnose-and-resend exercise.** Runs in the worktree. Six prompt-keys + two ask-and-wait literal canned replies + the `lock it in` literal. Likely failure-mode read for the M4 codesearch artefact:

- **Goal drift** — usually weak in this send-off. The ADR's gate-vs-auth distinction is sharp, and M4's tail anchored on it.
- **Context rot** — possible if the agent re-derives the address-classification predicate mid-run (`IsLoopback()` vs hostname-resolution edge cases).
- **Plausible-but-wrong** — the highest-risk lens. `isExposed()` may classify correctly on textbook addresses but miss `[::]`, `0.0.0.0`, unresolved hostnames. `show()` path-clamp may use string-prefix without symlink resolution. Tests pass; the gate's predicate is wrong.

**Phase B verifier shape (most likely):** shell-hook running `go test ./...` plus a table-test invariant on `isExposed()`. Background-agent / Ralph-feed are options if the diagnosis lands differently. Verifier file location is student-picked — `.claude/hooks/`, a `verifier.sh` at worktree root, or a slash-command. The harness asserts tree-content advance during the save turn rather than a fixed path.

**Phase B reference.md + plan.md.** Assembled in conversation, lock-in approval gates the writes. Reference scoped to the ADR work; plan.md is agent-mutable with tests-first phase, current-phase line, decisions log, and a what-didn't-work section. **Watch for:** reference rewriting `CLAUDE.local.md` content (the "reference-as-rewrite" failure mode named in the module file).

**Phase C — packaged re-send (`ae101-m5-rerun-packaged`).** Fresh session in the worktree. The prompt writes a protected `Run coordinates` block to plan.md at run start, then runs the same ADR task using reference + plan.md + verifier. Up to 1h autonomous. Three-list final report (shipped / did NOT ship / verifier last-line).

**AUQ risk surface in M5:**

- Phase A (worktree-setup): if task.md's coordinates are missing or the "M4 starting point" commit message has been rewritten, the agent will want to ask. Tail tells it to surface the choice in chat and proceed.
- Phase B turns 1–3: low risk; pure diagnosis reading.
- Phase B turn 4 (verifier proposal): structurally interactive — body says "Show me before saving." Ask-and-wait pattern: tail forbids AUQ, canned reply approves the save.
- Phase B turn 5 (smoke-test): may want to ask about edge-case inputs. Suppressed.
- Phase B turn 6 (reference+plan grill): structurally interactive — body says "grill me, three questions at a time." Ask-and-wait pattern: tail forbids AUQ, canned reply answers the grill, `lock it in` literal triggers the file writes.
- Phase C (re-send): highest AUQ risk — runs unattended up to 1h. Tail forbids AUQ across the run and tells the agent to record assumptions in plan.md's decisions-log section.

---

## M6 — Spot gaps, build the loop + Arc retrospective (codesearch variant)

**Runner.** `tmux-runner/run-m6.sh`. Single session in the M5 worktree (`--cwd ../codesearch-m5`). No fork. M6 reads, diagnoses, ships in place. Same structural template as `run-m4.sh` (single-session + state.json) plus `run-m1.sh`'s positional `key_seq` assertion dispatch.

**Codesearch scenario.** `scenarios/m6-codesearch.txt`. Seven prompt-key turns + three literal turns (canned student-voice reply after T4 ask-and-wait + save-gate approval; save-approval literal after T7).

Prompt sequence:
1. `spot-gaps-build-the-loop-1` — diff M4 un-packaged vs M5 packaged across four dimensions (caught / missed / introduced / fix-home). Suppression-style AUQ tail; the reading is from disk.
2. `spot-gaps-build-the-loop-2` — cut one stale rule from `./CLAUDE.local.md` (or stop if all hold).
3. `spot-gaps-build-the-loop-primitives` — 5–10 atomic primitives + 2–3 ranked for dominant gap.
4. `spot-gaps-build-the-loop-3` — author second skill through interview. Ask-and-wait (NOT suppression): Claude asks questions in chat as a numbered list and STOPs; canned student-voice reply turn follows; `* save it` literal is the SKILL.md write approval.
5. `spot-gaps-build-the-loop-4` — critique before shipping.
6. `spot-gaps-build-the-loop-5` — invoke skill by name on M5 packaged re-run, same-turn judgement.
7. `arc-retrospective-1` — one-page arc note across M1–M6 artefacts; agent dispatches a fresh Agent-tool sub-task internally. `* looks good, save it where you proposed.` literal closes the save-gate.

**Canned answers shape (T4 reply turn).** Codesearch-specific: the dominant gap is the verify-by-hand carve-out from the test-strategy skill not actually getting evidenced in RUN-NOTES.md. Shape picked: **judge** (qualitative — was the manual curl run?). Fires on final summary + RUN-NOTES.md; flags any verify-by-hand item from the test-strategy skill that's in scope for the task but lacks quoted evidence. The shape choice is opinionated to give the runner deterministic structure, but the agent may push back and pick differently — that's a real cohort risk to watch for.

**Per-turn assertions (key_seq):**
1. Four-dim diff vocab + rank/dominant signal in scrollback.
2. `CLAUDE.local.md` mtime advanced OR scrollback says "all rules hold / stop".
3. Primitives menu vocab (test / lint / build / curl / httptest / judge / verifier / ...).
4. Interview/draft/save-gate vocab in scrollback. Hard file-existence check deferred to case 5.
5. New skill exists at `~/.claude/skills/<name>/SKILL.md` since baseline AND scrollback has critique-shape vocab.
6. Invoke + judgement vocab.
7. Arc-note vocab + proposed destination.

---

## Next bugs (placeholder)

When bug-02 is wired into a scenario and M1 runs cleanly end-to-end, add bug-03 here. Candidates worth considering:

- `regexp/utf.go` — case-folding edge case. Larger blast radius, riskier to seed cleanly.
- `regexp/match.go` line-number off-by-one (real bug, `af4e10f`). Tiny, gradable, similar shape to bug-01 so probably skip in favour of variety.
- `index/delta.go` varint decoding — deep numerical bug. Save for a "stretch" scenario.

One bug per scenario. Resist the urge to chain.

---

## Harness fixes landed during the codesearch sweep (M1–M6)

### M1 runner

- `run-m1.sh` — `SCENARIO=` env override so we can point M1 at different scenario files without modifying `scenarios/m1.txt`.
- `run-m1.sh` T1 assertion — replaced lemmings-specific `src/|package.json|index.html` regex with a generic file-shape pattern (extensions + path-like tokens). Works on any codebase.
- `run-m1.sh` T6 porcelain assertion — replaced `git status --porcelain` string compare (which only sees file-status markers, not content) with `git stash create` SHA compare (which is byte-identical state). Caught: false-positive when T6 advances content within the same file set T4 already modified.

### M2 runner

- `run-m2.sh` — `SCENARIO=` env override (same pattern as M1).
- `run-m2.sh` `key_seq` counter — separates prompt-key turns from literal `*`-prefixed turns so the assertion dispatch is keyed on prompt position only. Skips literal turns from assertion entirely. Lets one runner drive both the 9-turn lemmings scenario and the 13-turn codesearch ask-and-wait scenario without renumbering cases. Renumbered cases 1–8 (folded the standalone "lock it in" mtime check into push-back-3's case).
- `run-m2.sh` pre-T2 plan-mtime baseline refresh — captures `plan_mtime_pre_lock` immediately before push-back-2 sends, so the "plan untouched during walk-down" assertion is robust to any plan refinement the agent makes in the prior canned-reply literal turn.
- `run-m2.sh` case 5/6 SAVED-PATH refactor — case 5 (extract-rule-2) now does a loose "paths proposed" check; case 6 (extract-rule-3) does a deferred SAVED-PATH scan across ALL turn transcripts so far, anchored to `^[/~]` for absolute-path discipline. Catches the case where the agent emits `SAVED-PATH:` as a future promise (e.g. *"then echo... and SAVED-PATH:."*) in turn N and writes the file in turn N+1. Also retroactively hardens the lemmings path against the same trailing-period-label failure mode.

### M3 runner

- `run-m3.sh` — `SCENARIO_MAIN=` / `SCENARIO_QUALITY=` env overrides so we can point M3 at codesearch-variant scenarios without modifying `scenarios/m3-main.txt` / `scenarios/m3-quality.txt`.

### M4 runner

- `run-m4.sh` — `SCENARIO=` env override (same pattern as M1/M2).

### M5 + M6 runners

- `run-m5.sh` — built from scratch. Three-phase sequential orchestrator: phase A creates the worktree from M4's starting point via `ae101-m5-worktree-setup`; phase B runs the diagnose-and-resend exercise in the new worktree (6 prompt-keys + ask-and-wait literals + `lock it in`); phase C kills the PB session and opens a FRESH session in the same worktree for `ae101-m5-rerun-packaged`. Scenario file split into `# === Pn:` blocks. `key_seq`-keyed dispatch on PB only (PA + PC are single-turn). Mtime-pinning on reference.md + plan.md across PB so save-gates are testable.
- `run-m6.sh` — built from scratch. Single-session in the M5 worktree, no fork. Positional `key_seq` dispatch over 7 prompt-key turns. Snapshots `~/.claude/skills/` baseline at run start so new skills authored during M6 are detectable. state.json captures new-skill names, CLAUDE.local.md mtime-advance bit, best-effort arc-note path scan.

### Cross-cutting authoring lessons (apply to all future scenarios)

- **Ask-and-wait beats suppression where the prompt is structurally interactive.** AUQ-suppression tails ("don't call AskUserQuestion") force the agent to assume; ask-and-wait tails ("ask in chat as numbered list and STOP") surface the questions and pair with a literal canned student-voice reply turn. Surfaces what the prompt's interactive shape would actually ask, instead of masking it.
- **AUQ suppression must be on EVERY prompt, not just the structurally interactive ones.** M3 fork-prompt lesson: any prompt with real ambiguity can trigger agent-initiated AUQ on its own reasoning. The fork prompt has no interactive scaffolding in its body, yet hung run #1 because the agent noticed a wrong instruction about `.claude/memory/` location and asked.
- **Artifact-vs-STOP tail ordering matters.** When a tail says "Write X" and "If questions, STOP", the agent obeys the LAST imperative. The load-bearing artifact instruction must be the strongest / last clause; questions become end-of-response refinements without a STOP.
- **task.md "Run coordinates" block is the canonical hand-off.** state.json in the runner's `out/` is a convenience cache that can drift (M4 captured session UUID prefix as commit SHA; M6 arc-note scan missed the agent's destination). Downstream modules read task.md (or plan.md's coordinates block) instead.
