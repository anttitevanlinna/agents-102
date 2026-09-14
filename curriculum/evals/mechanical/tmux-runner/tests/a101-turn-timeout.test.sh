#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/a101-controls.sh"

assert_timeout() {
  local expected="$1"
  shift
  local actual
  actual="$(a101_turn_timeout "$@")"
  if [[ "$actual" != "$expected" ]]; then
    echo "FAIL: expected timeout $expected, got $actual" >&2
    exit 1
  fi
}

assert_timeout 1800 m1 1 1800 0
assert_timeout 1800 m6 4 1800 0
assert_timeout 3600 m6 5 1800 0
assert_timeout 900 m6 5 900 1

echo 'PASS: the reusable M6 loop gets a longer default without overriding an explicit timeout'
