#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
OUT="$($ROOT/curriculum/evals/scripts/status.sh --training agents-101)"

for non_surface in ae101-parity timings trainer-guide trainer-modules training-architecture pre-cohort-todos; do
  if grep -Eq "\[mod\][[:space:]]+$non_surface([[:space:]]|$)" <<<"$OUT"; then
    echo "not ok - status includes maintainer-only surface: $non_surface" >&2
    exit 1
  fi
done

echo "ok - status excludes maintainer-only Agents 101 files"
