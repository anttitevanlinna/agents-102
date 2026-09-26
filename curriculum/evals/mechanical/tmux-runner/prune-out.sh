#!/usr/bin/env bash
# prune-out.sh — retention for the runner's out/ dir.
#
# Keeps, per module, the newest --keep run dirs (default 5); every run dir a
# kept chain points at (the newest --keep-chains chains, default 5); and any
# run dir younger than --min-age hours (default 24 — an in-flight run has no
# state file yet); and every run a file under --cited-by (default: the repo)
# names as out/<run> — IMPROVEMENTS.md and the todo files cite runs as
# evidence. Drops empty chain dirs (aborted resumes) and chain dirs
# past --keep-chains. Leaves _chain-*.log files alone.
#
# Module = <run>/.module (written by run_register), else inferred from what
# the dir holds: <m>-state.json → m; main/+quality/ → m3; pa/ → m5;
# a101-<mod>-… name → a101-<mod>; otherwise "unknown" (kept by the same rules).
#
# Usage: prune-out.sh [--out DIR] [--keep N] [--keep-chains K] [--min-age H]
#                     [--cited-by DIR] [--apply]
# Dry run by default: prints DELETE <path> lines and a summary.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

OUT="$HERE/out"; CITED_BY="$(git -C "$HERE" rev-parse --show-toplevel 2>/dev/null || true)"; KEEP=5; KEEP_CHAINS=5; MIN_AGE_H=24; APPLY=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --out) OUT="$2"; shift 2 ;;
    --keep) KEEP="$2"; shift 2 ;;
    --keep-chains) KEEP_CHAINS="$2"; shift 2 ;;
    --min-age) MIN_AGE_H="$2"; shift 2 ;;
    --cited-by) CITED_BY="$2"; shift 2 ;;
    --apply) APPLY=1; shift ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

[[ -d "$OUT" ]] || { echo "prune-out: no such dir: $OUT" >&2; exit 2; }
OUT="$(cd "$OUT" && pwd)"
case "$OUT" in
  /|"$HOME"|"$HOME"/Projects|/Users|/tmp|/private/tmp) echo "prune-out: refusing --out $OUT" >&2; exit 2 ;;
esac

now="$(date +%s)"
min_age_s=$(( MIN_AGE_H * 3600 ))
work="$(mktemp -d)"; trap 'rm -rf "$work"' EXIT
: > "$work/pinned"; : > "$work/delete"

# ---- chains: keep the newest K non-empty; their pointers pin run dirs ----
n=0
for c in $(ls -td "$OUT"/_chains/*/ 2>/dev/null); do
  c="${c%/}"
  if ! ls "$c"/*.run >/dev/null 2>&1; then
    echo "$c" >> "$work/delete"; continue
  fi
  n=$((n + 1))
  if (( n <= KEEP_CHAINS )); then
    cat "$c"/*.run >> "$work/pinned"
  else
    echo "$c" >> "$work/delete"
  fi
done

# ---- runs cited as evidence: out/<run> named in any file under CITED_BY ----
if [[ -n "$CITED_BY" && -d "$CITED_BY" ]]; then
  grep -rhoE 'out/[A-Za-z0-9._-]+' "$CITED_BY" --exclude-dir=.git --exclude-dir=node_modules \
       --exclude-dir=out 2>/dev/null | sed "s#^out/#$OUT/#" | sort -u >> "$work/pinned" || true
fi

# ---- run dirs: module<TAB>mtime<TAB>path ----
module_of() {
  local d="$1" b f
  [[ -f "$d/.module" ]] && { head -1 "$d/.module"; return; }
  b="$(basename "$d")"
  if [[ "$b" =~ ^a101-([a-z0-9]+)- ]]; then echo "a101-${BASH_REMATCH[1]}"; return; fi
  for f in "$d"/*-state.json; do
    [[ -e "$f" ]] && { f="$(basename "$f")"; echo "${f%-state.json}"; return; }
  done
  [[ -d "$d/main" && -d "$d/quality" ]] && { echo m3; return; }
  [[ -d "$d/pa" ]] && { echo m5; return; }
  echo unknown
}
for d in "$OUT"/*/; do
  d="${d%/}"
  [[ "$(basename "$d")" == _* ]] && continue
  printf '%s\t%s\t%s\n' "$(module_of "$d")" "$(stat -f %m "$d")" "$d"
done | sort -t$'\t' -k1,1 -k2,2nr > "$work/runs"

awk -F'\t' -v keep="$KEEP" -v now="$now" -v minage="$min_age_s" -v pinned="$work/pinned" '
  BEGIN { while ((getline p < pinned) > 0) pin[p] = 1 }
  { rank[$1]++
    if (rank[$1] <= keep) next
    if ($3 in pin) next
    if (now - $2 < minage) next
    print $3 }' "$work/runs" >> "$work/delete"

# ---- report / apply ----
count=0
while IFS= read -r p; do
  [[ -n "$p" ]] || continue
  echo "DELETE $p"
  count=$((count + 1))
done < "$work/delete"
size="$( (cat "$work/delete" | tr '\n' '\0' | xargs -0 du -sk 2>/dev/null || true) | awk '{s+=$1} END{printf "%.1f MB", s/1024}')"
echo "# $count to delete ($size) — keep=$KEEP per module, keep-chains=$KEEP_CHAINS, min-age=${MIN_AGE_H}h"

if (( APPLY )); then
  while IFS= read -r p; do
    [[ -n "$p" && "$p" == "$OUT"/* ]] || continue
    rm -rf "$p"
  done < "$work/delete"
  echo "# applied"
else
  echo "# dry run — pass --apply to delete"
fi
