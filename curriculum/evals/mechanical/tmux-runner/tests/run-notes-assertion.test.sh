#!/usr/bin/env bash
# Unit tests for assert_run_notes_present, the PC-close gate added after the
# 2026-08-17 northwind run (IMPROVEMENTS.md "2026-08-17").
#
# Contract (Antti, 2026-08-31): RUN-NOTES.md is CONDITIONAL. The body writes it
# only on getting stuck, so a smooth run legitimately produces none, and the
# registry now marks it `conditional: agent-got-stuck` on both sides of the
# graph. The gate therefore accepts an ABSENT file when the run's return
# explicitly accounts for it, and still refuses a silent absence, an empty
# file, or notes filed under another name.
#
# Failure mode still being guarded: the packaged re-send filed its run notes as
# observations/<date>-<slug>-run.md instead of RUN-NOTES.md at the worktree
# root, which ae101-m5-rerun-packaged names twice. Nothing caught it, and
# six judge skills (verify-by-hand-judge, scope-creep-judge,
# context-rot-judge-lemmings, disclosure-lock-judge, both session-shaper-*)
# grep RUN-NOTES.md BY NAME — so each one reads nothing and passes free.
# The gate must fail closed: absent, empty, or filed-elsewhere are all FAIL.
# Run: bash tests/run-notes-assertion.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e            # assertions.sh turns on -e; these tests probe failure paths

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
expect_rc() { # $1=label $2=want-rc $3...=command
  local label="$1" want="$2"; shift 2
  "$@" >/dev/null 2>&1; local got=$?
  if [[ "$got" -eq "$want" ]]; then ok "$label"; else bad "$label (want rc=$want got rc=$got)"; fi
}

mk_return() { # $1=dir, rest=return text -> echoes a transcript path
  local d="$1"; shift
  printf '%s\n' "$*" > "$d/transcript.txt"; echo "$d/transcript.txt"
}

echo "[test] the 2026-08-17 incident: notes filed in observations/, root file absent"
wt="$(mktemp -d)"; mkdir -p "$wt/observations"
printf 'phase 7 done-gate, verifier PASS\n' > "$wt/observations/2026-08-17-blocker-deadlock-run.md"
t="$(mk_return "$wt" "shipped: the fix. did NOT ship: nothing.")"
expect_rc "notes misfiled under observations/ -> FAIL" 1 assert_run_notes_present "PC post" "$wt" "$t"

echo "[test] absent and UNaccounted for -> still a failure"
wt2="$(mktemp -d)"
t2="$(mk_return "$wt2" "shipped: the fix, the tests, the ADR.")"
expect_rc "silent absence -> FAIL" 1 assert_run_notes_present "PC post" "$wt2" "$t2"

echo "[test] the 2026-08-31 case: absent, and the return says why (conditional artefact)"
wt6="$(mktemp -d)"
t6="$(mk_return "$wt6" "did NOT ship
  - RUN-NOTES.md — never got stuck; no different angle was needed")"
expect_rc "absent + accounted for -> PASS" 0 assert_run_notes_present "PC post" "$wt6" "$t6"

echo "[test] a missing transcript cannot excuse an absent file"
wt7="$(mktemp -d)"
expect_rc "absent + no transcript to read -> FAIL" 1 assert_run_notes_present "PC post" "$wt7" "$wt7/nope.txt"

echo "[test] present but empty (a touched file is not a record)"
wt3="$(mktemp -d)"; : > "$wt3/RUN-NOTES.md"
t3="$(mk_return "$wt3" "did NOT ship: RUN-NOTES.md — never got stuck")"
expect_rc "empty RUN-NOTES.md -> FAIL even when the return excuses it" 1 assert_run_notes_present "PC post" "$wt3" "$t3"

echo "[test] present but whitespace-only"
wt4="$(mktemp -d)"; printf '\n\n   \n' > "$wt4/RUN-NOTES.md"
t4="$(mk_return "$wt4" "shipped: everything")"
expect_rc "whitespace-only RUN-NOTES.md -> FAIL" 1 assert_run_notes_present "PC post" "$wt4" "$t4"

echo "[test] the contract held"
wt5="$(mktemp -d)"; printf '# Run notes\n\nVerifier FAILed once on phase 4, re-ran after fixing the guard.\n' > "$wt5/RUN-NOTES.md"
t5="$(mk_return "$wt5" "shipped: RUN-NOTES.md")"
expect_rc "non-empty root RUN-NOTES.md -> PASS" 0 assert_run_notes_present "PC post" "$wt5" "$t5"

echo "[test] the FAIL message must name where the notes actually landed"
out="$(assert_run_notes_present "PC post" "$wt" "$t" 2>&1 || true)"
if grep -q 'observations/2026-08-17-blocker-deadlock-run.md' <<<"$out"; then
  ok "FAIL message points at the misfiled candidate"
else
  bad "FAIL message should name the misfiled candidate so the fix is one move (got: $out)"
fi

rm -rf "$wt" "$wt2" "$wt3" "$wt4" "$wt5" "$wt6" "$wt7"
echo
echo "pass=$pass fail=$fail"
[[ "$fail" -eq 0 ]]
