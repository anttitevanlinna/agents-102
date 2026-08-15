#!/usr/bin/env bash
# update-quality.test.sh — regression tests for update-quality.sh.
#
# Locks down the Phase-4 fixes:
#   - stage word is PRESERVED, never hardcoded to compendium-audited (no false promotion)
#   - the axis-only auto-fire path (all-keep) never touches stage word or date
#   - narrative parentheticals survive a stamp
#   - sim-passed / history dimension rows survive a stamp (not deleted by the awk splice)
#   - an explicit --stage flag is the only thing that advances the ladder tier
#   - REVISE-without-note still hard-errors
#   - an all-keep no-op stamp is idempotent on a judged block
#   - 'draft' is removed (2026-05-31): no floor default — the script REFUSES rather than
#     fabricate a stage; --stage draft and any legacy draft line are rejected.
#   - the 'mechanical' axis is removed (2026-06-01): no --mechanical flag; a stray legacy
#     `- mechanical` row is purged (GC) on re-stamp, never reconstructed.
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

# ── T1 — prior stage + narrative preserved; new writing pin added ────────────
mkfix t1.md '# Lesson
<!-- maintainer -->
**Quality:** sim-passed 2026-05-21 (rewritten after fact-check; supersedes 2026-05-20 draft)
- judges @old1234: writing PASS, story PASS

body text'
run "$TMP/t1.md" --writing PASS --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t1.md" '**Quality:** sim-passed' 'T1 stage stays sim-passed'
assert_no_grep "$TMP/t1.md" 'compendium-audited'  'T1 stage not rewritten'
assert_grep    "$TMP/t1.md" 'rewritten after fact-check; supersedes 2026-05-20 draft' 'T1 narrative preserved (incl. the word draft as prose)'
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

# ── T3 — auto-fire regression: an axis-only stamp never bumps stage or date ──
#    stage + date frozen, narrative + sim-passed row survive. Doubles as the
#    mechanical-axis GC test: the legacy `- mechanical-tested` row is purged on
#    re-stamp (axis removed 2026-06-01), never reconstructed.
mkfix t3.md '# Closing lecture
<!-- maintainer -->
**Quality:** compendium-audited 2026-04-28 (post rule-#3 sweeps)
- sim-passed 2026-04-27 — STALE since sweep touched the opener
- mechanical-tested: N/A (lectures are trainer-narrated)

body'
run "$TMP/t3.md" --cohorts "none yet" --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t3.md" '**Quality:** compendium-audited 2026-04-28' 'T3 stage AND date frozen on all-keep'
assert_no_grep "$TMP/t3.md" '2026-06-01'          'T3 date not bumped by axis-only stamp'
assert_grep    "$TMP/t3.md" 'post rule-#3 sweeps' 'T3 narrative preserved'
assert_grep    "$TMP/t3.md" 'sim-passed 2026-04-27' 'T3 sim-passed row not deleted'
assert_no_grep "$TMP/t3.md" 'mechanical-tested'   'T3 legacy mechanical row purged (axis removed 2026-06-01)'

# ── T3b — the maintainer-reviewed flag hard-errors (axis removed 2026-08-15) ─
#    The flag refuses and leaves the file untouched; a stray legacy row is
#    purged (GC) by the next real stamp, never reconstructed.
mkfix t3b.md '# Lecture
<!-- maintainer -->
**Quality:** compendium-audited 2026-04-28
- maintainer-reviewed: 2026-04-20 (Antti)

body'
rc=$(run "$TMP/t3b.md" --maintainer-reviewed PASS --sha x --date 2026-06-01)
assert_rc "$rc" 1 'T3b --maintainer-reviewed refuses (axis removed 2026-08-15)'
assert_grep "$TMP/t3b.md" 'maintainer-reviewed: 2026-04-20' 'T3b refused stamp left the file untouched'
run "$TMP/t3b.md" --cohorts "none yet" --sha x --date 2026-06-01 >/dev/null
assert_no_grep "$TMP/t3b.md" 'maintainer-reviewed' 'T3b stray maintainer-reviewed row purged on re-stamp'

# ── T4 — maintainer-reviewed top-state preserved on an axis-only stamp ───────
mkfix t4.md '# Lecture
<!-- maintainer -->
**Quality:** maintainer-reviewed 2026-04-29

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

# ── T5b — brand-new block, only an axis flag → REFUSED (no draft floor) ──────
#    'draft' was the old floor default; it is removed. With no prior stage and no
#    judge class set, the script must refuse rather than fabricate a stage.
mkfix t5b.md '# New file
<!-- maintainer -->
body, no quality line yet'
rc=$(run "$TMP/t5b.md" --maintainer-reviewed PASS --sha new5678 --date 2026-06-01)
assert_rc      "$rc" "1" 'T5b new+axis-only refuses (no draft floor)'
assert_no_grep "$TMP/t5b.md" '**Quality:**' 'T5b no Quality line fabricated'

# ── T6 — explicit --stage is the only ladder advance (also migrates a legacy draft) ─
#    A legacy `draft` line is fine to re-stamp ONLY with an explicit --stage that
#    moves it onto the real ladder; the override wins before the draft-reject check.
mkfix t6.md '# Lesson
<!-- maintainer -->
**Quality:** draft 2026-05-21 (notes)
- judges @old1234: writing PASS

body'
run "$TMP/t6.md" --writing PASS --stage compendium-audited --sha new5678 --date 2026-06-01 >/dev/null
assert_grep    "$TMP/t6.md" '**Quality:** compendium-audited' 'T6 explicit --stage advances + migrates draft'
assert_no_grep "$TMP/t6.md" '**Quality:** draft' 'T6 legacy draft stage word gone'

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

body'
cp "$TMP/t8.md" "$TMP/t8.before"
run "$TMP/t8.md" --date 2026-06-01 >/dev/null   # no state flags = all keep
if diff -q "$TMP/t8.before" "$TMP/t8.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T8 all-keep no-op should be idempotent"; diff "$TMP/t8.before" "$TMP/t8.md" | sed 's/^/    /'; fi

# ── T9 — cohort-tested rung removed: delivery `- cohorts:` log row survives ───
#    The ladder no longer carries cohort-tested / battle-tested rungs (delivery
#    reality is a NON-degrading log, not an LLM-check ladder stage). A stamp must
#    preserve a hand-written cohorts log row and must never resurrect the dead
#    cohort-tested stage word.
mkfix t9.md '# Module
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS
- cohorts: none yet

body'
run "$TMP/t9.md" --date 2026-06-01 >/dev/null   # all-keep stamp
assert_grep    "$TMP/t9.md" '- cohorts: none yet'             'T9 delivery cohorts log row survives a stamp'
assert_grep    "$TMP/t9.md" '**Quality:** compendium-audited' 'T9 stage preserved'
assert_no_grep "$TMP/t9.md" 'cohort-tested'                   'T9 dead rung word never resurrected'

# ── T10 — 'draft' is rejected as an explicit --stage word (concept removed) ──
mkfix t10.md '# Module
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a)
- judges @1ff6f8a: writing PASS

body'
cp "$TMP/t10.md" "$TMP/t10.before"
rc=$(run "$TMP/t10.md" --stage draft --sha new5678)
assert_rc "$rc" "1" 'T10 --stage draft is rejected'
if diff -q "$TMP/t10.before" "$TMP/t10.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T10 file must be unchanged on rejection"; fi

# ── T11 — a legacy `draft` line cannot be silently re-stamped (forces migration) ─
#    Resolves to the prior draft stage → reject. The maintainer must --stage it onto
#    the real ladder (T6) or remove the line.
mkfix t11.md '# Lecture
<!-- maintainer -->
**Quality:** draft 2026-04-30
- cohorts: none yet

body'
cp "$TMP/t11.md" "$TMP/t11.before"
rc=$(run "$TMP/t11.md" --maintainer-reviewed PASS --sha new5678 --date 2026-06-01)
assert_rc "$rc" "1" 'T11 axis stamp on a legacy draft line refuses'
if diff -q "$TMP/t11.before" "$TMP/t11.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T11 legacy draft file must be unchanged"; fi

# ── T12–T14 — stale-verdict guard ────────────────────────────────────────────
#    A judge that read the file before a concurrent edit produces a verdict about
#    text that no longer exists. Stamping it pins that verdict at current HEAD and
#    the row silently lies. Instances that record `body_sha` get checked; instances
#    without the field are pre-guard and must still stamp (back-compat).
#    Real case 2026-08-02: a concurrent session's pedagogy verdict quoted a clause
#    cut one minute earlier, and read as a clean PASS.
INST="$TMP/instances"; mkdir -p "$INST"
export QUALITY_INSTANCES_DIR="$INST"

# T12 — body_sha matches the file on disk → stamps normally
mkfix t12.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234)
- judges @old1234: writing PASS

body'
sha12=$(shasum -a 256 "$TMP/t12.md" | awk '{print $1}')
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' "$sha12" > "$INST/ae101--lecture--t12.writing.json"
rc=$(run "$TMP/t12.md" --writing PASS --sha new5678 --date 2026-06-01)
assert_rc   "$rc" "0" 'T12 matching body_sha stamps'
assert_grep "$TMP/t12.md" 'writing@new5678' 'T12 pin written'

# T13 — body_sha is from a different body → refuse, leave the file untouched
mkfix t13.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (pedagogy@old1234)
- judges @old1234: pedagogy PASS

body'
printf '{"class":"pedagogy","body_sha":"%s","verdict":"PASS"}\n' \
  "0000000000000000000000000000000000000000000000000000000000000000" \
  > "$INST/ae101--exercise--t13.pedagogy.json"
cp "$TMP/t13.md" "$TMP/t13.before"
rc=$(run "$TMP/t13.md" --pedagogy PASS --sha new5678 --date 2026-06-01)
assert_rc "$rc" "1" 'T13 mismatched body_sha refuses to stamp'
if diff -q "$TMP/t13.before" "$TMP/t13.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T13 file must be unchanged after a refused stamp"; fi

# T14 — instance without body_sha (pre-guard) still stamps
mkfix t14.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (slides@old1234)
- judges @old1234: slides PASS

body'
printf '{"class":"slides","verdict":"PASS"}\n' > "$INST/ae101--lecture--t14.slides.json"
rc=$(run "$TMP/t14.md" --slides PASS --sha new5678 --date 2026-06-01)
assert_rc   "$rc" "0" 'T14 instance without body_sha still stamps (back-compat)'
assert_grep "$TMP/t14.md" 'slides@new5678' 'T14 pin written'

# ── T15–T16 — same-slug collision must not disarm the guard ──────────────────
#    `spot-gaps-build-the-loop` is BOTH a module and an exercise, so a bare
#    `*--<slug>.<class>.json` glob matches two instances. The guard used to see
#    two matches and return clean without checking anything — failing OPEN in the
#    one case the rest of the system takes care to disambiguate. Surface-type is
#    derived from the parent directory everywhere else; the guard now does the same.
mkdir -p "$TMP/curriculum/exercises"

# T15 — exercise body moved, module instance still matches → must REFUSE.
#       Picks the wrong instance (or neither) and this stamps a lie.
mkfix curriculum/exercises/t15.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234)
- judges @old1234: writing PASS

exercise body'
sha15=$(shasum -a 256 "$TMP/curriculum/exercises/t15.md" | awk '{print $1}')
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' "$sha15" \
  > "$INST/ae101--module--t15.writing.json"          # matches — but it is the MODULE's
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' \
  "1111111111111111111111111111111111111111111111111111111111111111" \
  > "$INST/ae101--exercise--t15.writing.json"        # the file's own — stale
cp "$TMP/curriculum/exercises/t15.md" "$TMP/t15.before"
rc=$(run "$TMP/curriculum/exercises/t15.md" --writing PASS --sha new5678 --date 2026-06-01)
assert_rc "$rc" "1" 'T15 same-slug collision still refuses on the OWN surface mismatch'
if diff -q "$TMP/t15.before" "$TMP/curriculum/exercises/t15.md" >/dev/null; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: T15 file must be unchanged after a refused stamp"; fi

# T16 — same collision, but the file's OWN instance matches → must STAMP.
#       Guards that only ever refuse are as useless as guards that never do.
mkfix curriculum/exercises/t16.md '# Lesson
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234)
- judges @old1234: writing PASS

exercise body'
sha16=$(shasum -a 256 "$TMP/curriculum/exercises/t16.md" | awk '{print $1}')
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' \
  "2222222222222222222222222222222222222222222222222222222222222222" \
  > "$INST/ae101--module--t16.writing.json"          # the module's, stale, irrelevant here
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' "$sha16" \
  > "$INST/ae101--exercise--t16.writing.json"        # the file's own — current
rc=$(run "$TMP/curriculum/exercises/t16.md" --writing PASS --sha new5678 --date 2026-06-01)
assert_rc   "$rc" "0" 'T16 same-slug collision stamps when the OWN surface matches'
assert_grep "$TMP/curriculum/exercises/t16.md" 'writing@new5678' 'T16 pin written'

# ── T17 — stamping one class must not invalidate the others ──────────────────
#    Judges return asynchronously, so a file's classes arrive one at a time. Each
#    stamp rewrites the Quality block, which changes the whole-file hash, which
#    made the guard refuse every verdict still pending on that file — the tool
#    invalidating verdicts as a side effect of recording one. The guard must stay
#    armed against real body movement while ignoring its OWN write: a verdict that
#    was valid immediately before the stamp is still a true claim about the body
#    immediately after, because the only delta is the Quality block, which no
#    judge's verdict reads (accept-notes live in other maintainer paragraphs).
mkdir -p "$TMP/curriculum/lectures"
mkfix curriculum/lectures/t17.md '# Lesson
body text the judges read
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234 slides@old1234)
- judges @old1234: writing PASS, slides PASS'
sha17=$(shasum -a 256 "$TMP/curriculum/lectures/t17.md" | awk '{print $1}')
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' "$sha17" \
  > "$INST/ae101--lecture--t17.writing.json"
printf '{"class":"slides","body_sha":"%s","verdict":"PASS"}\n' "$sha17" \
  > "$INST/ae101--lecture--t17.slides.json"
rc=$(run "$TMP/curriculum/lectures/t17.md" --writing PASS --sha new1111 --date 2026-06-01)
assert_rc "$rc" "0" 'T17a first class stamps'
rc=$(run "$TMP/curriculum/lectures/t17.md" --slides PASS --sha new2222 --date 2026-06-01)
assert_rc   "$rc" "0" 'T17b second class still stamps after the first rewrote the block'
assert_grep "$TMP/curriculum/lectures/t17.md" 'slides@new2222' 'T17b second pin written'

# T18 — the guard must still fire when the BODY actually moved between stamps.
#       T17 must not have been bought by disarming the guard.
mkfix curriculum/lectures/t18.md '# Lesson
body text the judges read
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234 slides@old1234)
- judges @old1234: writing PASS, slides PASS'
sha18=$(shasum -a 256 "$TMP/curriculum/lectures/t18.md" | awk '{print $1}')
printf '{"class":"writing","body_sha":"%s","verdict":"PASS"}\n' "$sha18" \
  > "$INST/ae101--lecture--t18.writing.json"
printf '{"class":"slides","body_sha":"%s","verdict":"PASS"}\n' "$sha18" \
  > "$INST/ae101--lecture--t18.slides.json"
rc=$(run "$TMP/curriculum/lectures/t18.md" --writing PASS --sha new1111 --date 2026-06-01)
assert_rc "$rc" "0" 'T18a first class stamps'
printf 'a neighbour session edited the body\n' >> "$TMP/curriculum/lectures/t18.md"
rc=$(run "$TMP/curriculum/lectures/t18.md" --slides PASS --sha new2222 --date 2026-06-01)
assert_rc "$rc" "1" 'T18b real body movement between stamps still refuses'

# T19 — a PRESENT but malformed body_sha must REFUSE. The capture requires 64 hex,
#       and an empty capture reads as "pre-guard instance", so a sha1, a truncated
#       paste or invented hex switches the guard OFF instead of tripping it. A
#       judge that writes a bad hash is exactly the judge whose verdict is suspect.
mkfix curriculum/lectures/t19.md '# Lesson
body text
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234)
- judges @old1234: writing PASS'
printf '{"class":"writing","body_sha":"da39a3ee5e6b4b0d3255bfef95601890afd80709","verdict":"PASS"}\n' \
  > "$INST/ae101--lecture--t19.writing.json"
rc=$(run "$TMP/curriculum/lectures/t19.md" --writing PASS --sha new1111 --date 2026-06-01)
assert_rc "$rc" "1" 'T19 present-but-malformed body_sha refuses (fails closed, never open)'

# T20 — the pre-guard path survives. An instance with NO body_sha field at all
#       predates the guard and must still stamp, or every legacy instance breaks.
mkfix curriculum/lectures/t20.md '# Lesson
body text
<!-- maintainer -->
**Quality:** compendium-audited 2026-05-15 (writing@old1234)
- judges @old1234: writing PASS'
printf '{"class":"writing","verdict":"PASS"}\n' > "$INST/ae101--lecture--t20.writing.json"
rc=$(run "$TMP/curriculum/lectures/t20.md" --writing PASS --sha new1111 --date 2026-06-01)
assert_rc "$rc" "0" 'T20 absent body_sha still stamps (pre-guard instance)'

unset QUALITY_INSTANCES_DIR

echo "──────────────────────────────"
echo "update-quality.test.sh: $pass passed, $fail failed"
[[ $fail -eq 0 ]]
