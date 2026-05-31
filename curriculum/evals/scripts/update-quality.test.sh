#!/usr/bin/env bash
# update-quality.test.sh — regression tests for update-quality.sh.
#
# Locks down the Phase-4 fixes:
#   - stage word is PRESERVED, never hardcoded to compendium-audited (no false promotion)
#   - the mechanical/cohorts auto-fire path (all-keep) never touches stage word or date
#   - narrative parentheticals survive a stamp
#   - sim-passed / history dimension rows survive a stamp (not deleted by the awk splice)
#   - an explicit --stage flag is the only thing that advances the ladder tier
#   - REVISE-without-note still hard-errors
#   - an all-keep no-op stamp is idempotent on a judged block
#
# Run: bash curriculum/evals/scripts/update-quality.test.sh
# Exit 0 = all pass; 1 = at least one failure.

set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$HERE/update-quality.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fail=0
pass=0

# run the script, swallowing its exit so a deliberate non-zero (REVISE) doesn't kill the harness
run() { bash "$SCRIPT" "$@" >/dev/null 2>&1; echo $?; }

assert_grep()  { # file pattern msg
  if grep -qF -- "$2" "$1"; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: $3"; echo "    expected to find: $2"; echo "    in:"; sed 's/^/      /' "$1"; fi
}
assert_no_grep() { # file pattern msg
  if grep -qF -- "$2" "$1"; then fail=$((fail+1)); echo "FAIL: $3"; echo "    did NOT expect: $2"; echo "    in:"; sed 's/^/      /' "$1"; else pass=$((pass+1)); fi
}
assert_rc() { # actual expected msg
  if [[ "$1" == "$2" ]]; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: $3 (rc=$1, wanted $2)"; fi
}

mkfix() { printf '%s\n' "$2" > "$TMP/$1"; }

# ── T1 — draft stage + narrative preserved; new writing pin added ────────────
mkfix t1.md '# Lesson
<!-- maintainer -->
**Quality:** draft 2026-05-21 (rewritten after fact-check; supersedes 2026-05-20 draft)
- judges @old1234: writing PASS, story PASS

body text'
run "$TMP/t1.md" --writing PASS --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t1.md" '**Quality:** draft' 'T1 stage stays draft'
assert_no_grep "$TMP/t1.md" 'compendium-audited'  'T1 not falsely promoted'
assert_grep    "$TMP/t1.md" 'rewritten after fact-check; supersedes 2026-05-20 draft' 'T1 narrative preserved'
assert_grep    "$TMP/t1.md" 'writing@new5678'     'T1 new writing pin'

# ── T2 — compendium-audited: set pedagogy, keep the other five pins ──────────
mkfix t2.md '# Module
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS

body'
run "$TMP/t2.md" --pedagogy PASS --sha new5678 --date 2026-06-01 >/dev/null
assert_grep "$TMP/t2.md" '**Quality:** compendium-audited' 'T2 stage preserved'
assert_grep "$TMP/t2.md" 'pedagogy@new5678'  'T2 pedagogy re-pinned'
assert_grep "$TMP/t2.md" 'writing@1ff6f8a'   'T2 untouched writing pin kept'
assert_grep "$TMP/t2.md" '2026-06-01'        'T2 date bumped (a class was set)'

# ── T3 — THE auto-fire regression: mechanical-only on a draft ────────────────
#    stage + date frozen, narrative + sim-passed row survive.
mkfix t3.md '# Closing lecture
<!-- maintainer -->
**Quality:** draft 2026-04-28 (post rule-#3 sweeps)
- sim-passed 2026-04-27 — STALE since sweep touched the opener
- mechanical-tested: N/A (lectures are trainer-narrated)

body'
run "$TMP/t3.md" --mechanical "PASS:lesson via bin/judge.sh" --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t3.md" '**Quality:** draft 2026-04-28' 'T3 stage AND date frozen on all-keep'
assert_no_grep "$TMP/t3.md" 'compendium-audited'  'T3 auto-fire did not promote'
assert_no_grep "$TMP/t3.md" '2026-06-01'          'T3 date not bumped by mechanical-only'
assert_grep    "$TMP/t3.md" 'post rule-#3 sweeps' 'T3 narrative preserved'
assert_grep    "$TMP/t3.md" 'sim-passed 2026-04-27' 'T3 sim-passed row not deleted'

# ── T4 — maintainer-reviewed top-state preserved on an axis-only stamp ───────
mkfix t4.md '# Lecture
<!-- maintainer -->
**Quality:** maintainer-reviewed 2026-04-29
- maintainer-reviewed 2026-04-29 (Antti, full pass)

body'
run "$TMP/t4.md" --cohorts "Acme cohort 2026-06" --sha x --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t4.md" '**Quality:** maintainer-reviewed 2026-04-29' 'T4 maintainer-reviewed stage+date frozen'
assert_no_grep "$TMP/t4.md" 'compendium-audited' 'T4 not promoted'

# ── T5a — brand-new block, a judge class set → compendium-audited ────────────
mkfix t5a.md '# New file
<!-- maintainer -->
body, no quality line yet'
run "$TMP/t5a.md" --writing PASS --sha new5678 --date 2026-06-01 >/dev/null
assert_grep "$TMP/t5a.md" '**Quality:** compendium-audited' 'T5a new+judgeclass → compendium-audited'
assert_grep "$TMP/t5a.md" 'writing@new5678' 'T5a writing pinned'

# ── T5b — brand-new block, only a mechanical axis → ladder floor draft ───────
mkfix t5b.md '# New file
<!-- maintainer -->
body, no quality line yet'
run "$TMP/t5b.md" --mechanical PASS --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t5b.md" '**Quality:** draft' 'T5b new+axis-only → draft floor'
assert_no_grep "$TMP/t5b.md" 'compendium-audited' 'T5b not auto-audited'

# ── T6 — explicit --stage is the only ladder advance ────────────────────────
mkfix t6.md '# Lesson
<!-- maintainer -->
**Quality:** draft 2026-05-21 (notes)
- judges @old1234: writing PASS

body'
run "$TMP/t6.md" --writing PASS --stage compendium-audited --sha new5678 --date 2026-06-01 >/dev/null
assert_grep "$TMP/t6.md" '**Quality:** compendium-audited' 'T6 explicit --stage advances'

# ── T7 — REVISE without note hard-errors ────────────────────────────────────
mkfix t7.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a)
- judges @1ff6f8a: writing PASS

body'
rc=$(run "$TMP/t7.md" --writing REVISE --sha new5678)
assert_rc "$rc" "1" 'T7 REVISE-without-note errors'

# ── T8 — all-keep no-op is idempotent on a judged block ─────────────────────
mkfix t8.md '# Module
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS
- maintainer-reviewed 2026-04-28 (Antti, full pass)

body'
cp "$TMP/t8.md" "$TMP/t8.before"
run "$TMP/t8.md" --date 2026-06-01 >/dev/null   # no state flags = all keep
if diff -q "$TMP/t8.before" "$TMP/t8.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T8 all-keep no-op should be idempotent"; diff "$TMP/t8.before" "$TMP/t8.md" | sed 's/^/    /'; fi

echo "──────────────────────────────"
echo "update-quality.test.sh: $pass passed, $fail failed"
[[ $fail -eq 0 ]]
