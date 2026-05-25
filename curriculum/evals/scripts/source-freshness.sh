#!/usr/bin/env bash
# source-freshness.sh — audit per-source freshness stamps against a cohort date.
#
# Reads the stamps defined in curriculum/source-freshness-format.md:
#   - `[checked:YYYY-MM-DD result:RESULT due:DUE]` <url> — [label] <anchor>. fallback: ...
# where RESULT ∈ OK CAVEAT CORRECT GONE STALE NEEDED BLOCKED
#       DUE    ∈ YYYY-MM-DD | cohort | asap
#
# The question is "will this be stale by the time the room sees it?" — so DUE is
# compared against --target (the COHORT date), not today.
#
# Flagging:
#   BLOCK  result ∈ {CORRECT,GONE,STALE,NEEDED}  OR checked:never  OR due:asap
#   WARN   due < target (expires before delivery)  OR due:cohort (routine re-test)
#   INFO   result ∈ {CAVEAT,BLOCKED}
# Exit nonzero if any BLOCK.
#
# Usage:
#   source-freshness.sh [--target YYYY-MM-DD] [paths...]
#   --target  cohort date to audit against (default: today)
#   paths     files/dirs to scan (default: curriculum/)

set -eu

usage() { sed -n '2,24p' "$0"; exit 2; }

TARGET="$(date +%Y-%m-%d)"
PATHS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="$2"; shift 2 ;;
    -h|--help) usage ;;
    -*) echo "error: unknown arg $1" >&2; exit 1 ;;
    *) PATHS+=("$1"); shift ;;
  esac
done
[[ ${#PATHS[@]} -eq 0 ]] && PATHS=(curriculum)

# grep every stamp line: file:line:content. Require a real date (20YY-) or
# `never` after checked: so prose examples (`[checked:… result:… due:…]`) in
# docs are not parsed as stamps.
matches="$(grep -rnE '`\[checked:(20[0-9][0-9]-|never)' "${PATHS[@]}" 2>/dev/null || true)"

if [[ -z "$matches" ]]; then
  echo "No source-freshness stamps found under: ${PATHS[*]}"
  echo "(stamps live in 'Source verification' maintainer blocks — see curriculum/source-freshness-format.md)"
  exit 0
fi

block=()
warn=()
info=()
ok_count=0

while IFS= read -r m; do
  [[ -z "$m" ]] && continue
  loc="${m%%:*}"; rest="${m#*:}"
  lno="${rest%%:*}"; content="${rest#*:}"

  # pull the bracket payload: checked:<v> result:<v> due:<v>
  payload="$(printf '%s\n' "$content" | sed -nE 's/.*`\[checked:([^]]+)\]`.*/checked:\1/p')"
  checked="$(printf '%s\n' "$payload" | sed -nE 's/.*checked:([^ ]+).*/\1/p')"
  result="$(printf '%s\n' "$payload" | sed -nE 's/.*result:([^ ]+).*/\1/p')"
  due="$(printf '%s\n' "$payload" | sed -nE 's/.*due:([^ ]+).*/\1/p')"
  # source preview: everything after the closing ]` token
  anchor="$(printf '%s\n' "$content" | sed -nE 's/.*\]`[[:space:]]*(.*)$/\1/p' | cut -c1-72)"

  tag="$loc:$lno"
  reason=""
  sev="ok"

  case "$result" in
    CORRECT)  sev=block; reason="body claim drifted — needs fix" ;;
    GONE)     sev=block; reason="URL dead/removed" ;;
    STALE)    sev=block; reason="past 6mo window, used as current evidence" ;;
    NEEDED)   sev=block; reason="no source pinned ([SOURCE NEEDED])" ;;
    CAVEAT)   sev=info;  reason="accepted caveat" ;;
    BLOCKED)  sev=info;  reason="couldn't open (paywall/403) — verification deferred" ;;
    OK)       sev=ok ;;
    ATTESTED) sev=ok ;;   # maintainer first-hand observation — primary evidence, trusted
    *)        sev=block; reason="unparseable result:'$result'" ;;
  esac

  # never-checked is a block UNLESS the source is maintainer-attested (the
  # `checked:` date on an attested source is the date witnessed, never 'never').
  if [[ "$checked" == "never" && "$result" != "ATTESTED" ]]; then sev=block; reason="never checked"; fi

  # due-based escalation applies ONLY to OK-result stamps. CAVEAT and BLOCKED
  # are INFO by result (a paywalled source is deferred, not a content defect) and
  # must not be escalated by their due field; CORRECT/GONE/STALE/NEEDED/never are
  # already block by result.
  if [[ "$sev" == "ok" ]]; then
    case "$due" in
      asap)   sev=block; reason="re-verify flagged asap" ;;
      none)   : ;;  # permanent dated fact / maintainer-attested — never expires
      cohort) sev=warn; reason="re-test at delivery (due:cohort)" ;;
      [0-9]*) if [[ "$due" < "$TARGET" ]]; then sev=warn; reason="due $due < cohort $TARGET — expires before delivery"; fi ;;
      *)      sev=block; reason="unparseable due:'$due'" ;;
    esac
  fi

  line="  $tag  [$result due:$due]  $anchor"
  [[ -n "$reason" ]] && line="$line
       └─ $reason"
  case "$sev" in
    block) block+=("$line") ;;
    warn)  warn+=("$line") ;;
    info)  info+=("$line") ;;
    ok)    ok_count=$((ok_count+1)) ;;
  esac
done <<< "$matches"

echo "Source-freshness audit — target cohort date: $TARGET"
echo "scanned: ${PATHS[*]}"
echo

if [[ ${#block[@]} -gt 0 ]]; then
  echo "BLOCK (${#block[@]}) — must clear before cohort:"
  printf '%s\n' "${block[@]}"
  echo
fi
if [[ ${#warn[@]} -gt 0 ]]; then
  echo "WARN (${#warn[@]}) — re-verify + re-stamp before delivery:"
  printf '%s\n' "${warn[@]}"
  echo
fi
if [[ ${#info[@]} -gt 0 ]]; then
  echo "INFO (${#info[@]}) — known/accepted:"
  printf '%s\n' "${info[@]}"
  echo
fi

echo "summary: ${#block[@]} block · ${#warn[@]} warn · ${#info[@]} info · $ok_count ok"
[[ ${#block[@]} -gt 0 ]] && exit 1
exit 0
