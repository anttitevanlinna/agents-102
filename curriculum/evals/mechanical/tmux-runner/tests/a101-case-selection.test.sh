#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"

# The existing case stays the default; the new case is explicit.
[[ "$($RUNNER/run-a101.sh --print-case)" == nordveil ]]
[[ "$($RUNNER/run-a101.sh --case finnish-psychologist --print-case)" == finnish-psychologist ]]

set +e
"$RUNNER/run-a101.sh" --case missing-case --print-case > /dev/null 2>"$HERE/.case-error"
rc=$?
set -e
trap 'rm -f "$HERE/.case-error"' EXIT
[[ $rc -eq 2 ]]
grep -q 'unknown Agents 101 case' "$HERE/.case-error"

set +e
"$RUNNER/run-a101.sh" --from-turn 0 --print-case > /dev/null 2>"$HERE/.from-turn-error"
rc=$?
set -e
trap 'rm -f "$HERE/.case-error" "$HERE/.from-turn-error"' EXIT
[[ $rc -eq 2 ]]
grep -q 'invalid --from-turn' "$HERE/.from-turn-error"
grep -q 'seq < from_turn' "$RUNNER/run-a101.sh"

set +e
"$RUNNER/run-a101.sh" --case finnish-psychologist --module m7 > /dev/null 2>"$HERE/.module-cap-error"
rc=$?
set -e
trap 'rm -f "$HERE/.case-error" "$HERE/.from-turn-error" "$HERE/.module-cap-error"' EXIT
[[ $rc -eq 2 ]]
grep -q 'supports through m6' "$HERE/.module-cap-error"

# Both cases must satisfy the same M1-M6 answer-token contract. The runner owns
# the sequence; a case owns only the participant inputs and evidence.
required_answers=(
  m1-phase2.txt m1-strengths.txt m1-hatelist.txt m1-iterate.txt
  m2-challenge.txt m2-curation-where.txt m2-ingest.txt m2-agent-spec.txt
  m2-task.txt m2-final-q.txt m2-homework-style.txt m2-homework-agent.txt
  m3-crux-steer.txt m3-wiki-answer.txt m3-docs-answer.txt m3-net-answer.txt
  m4-what-matters.txt m4-grill-answers.txt m4-chosen-risk.txt
  m5-briefing-seed.txt m6-reusable-loop.txt
)

for case_name in nordveil finnish-psychologist; do
  case_dir="$($RUNNER/run-a101.sh --case "$case_name" --print-case-dir)"
  [[ -f "$case_dir/case.env" ]]
  [[ -f "$case_dir/linkedin-profile.md" ]]
  [[ -f "$case_dir/meetings-week.md" ]]
  for answer in "${required_answers[@]}"; do
    [[ -f "$case_dir/answers/$answer" ]] || {
      echo "FAIL: $case_name missing answers/$answer" >&2
      exit 1
    }
  done
done

# A case capped at M6 must not be forced to carry unused M7/M8 answers.
psych_dir="$($RUNNER/run-a101.sh --case finnish-psychologist --print-case-dir)"
[[ ! -e "$psych_dir/answers/m7-recipient.txt" ]]
[[ ! -e "$psych_dir/answers/m7-assumptions.txt" ]]

echo 'PASS: Agents 101 selects either M1-M6 case through one shared contract'
