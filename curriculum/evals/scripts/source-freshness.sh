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
#   paths     files/dirs to scan (default: curriculum/ continuous-research/)

set -eu

usage() { sed -n '2,24p' "$0"; exit 2; }

TARGET="$(date +%Y-%m-%d)"
# TODAY is always now; TARGET may be pushed forward to a cohort date. A stamp
# past its due date TODAY is already overdue and does not depend on the target.
TODAY="$(date +%Y-%m-%d)"
PATHS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="$2"; shift 2 ;;
    -h|--help) usage ;;
    -*) echo "error: unknown arg $1" >&2; exit 1 ;;
    *) PATHS+=("$1"); shift ;;
  esac
done
[[ ${#PATHS[@]} -eq 0 ]] && PATHS=(curriculum continuous-research)

# grep every stamp line: file:line:content. Require a real date (20YY-) or
# `never` after checked: so prose examples (`[checked:… result:… due:…]`) in
# docs are not parsed as stamps.
# `*.fixture.md` holds deliberately-broken stamps for the parser's own tests. It
# lives under curriculum/, so a directory walk read it and reported its BLOCKED
# example rows as real corpus BLOCKs — 2 of 8 on the live corpus, a quarter of
# this gate's own output, in the number people quote before a cohort. Pruned on
# a WALK only: naming a fixture explicitly is a deliberate act and still scans,
# which is how the fixture gets exercised on purpose. So the paths are split,
# and the exclusion is applied to the recursive half alone.
STAMP_RE='`\[checked:(20[0-9][0-9]-|never)'
dirs=(); files=()
for p in "${PATHS[@]}"; do
  if [[ -d "$p" ]]; then dirs+=("$p"); else files+=("$p"); fi
done
matches=""
if [[ ${#dirs[@]} -gt 0 ]]; then
  # curriculum/evals/ is judge machinery, not corpus: an instance JSON whose
  # evidence QUOTES a stamp parses as one. All 32 stamp-shaped lines under it
  # were machinery — 28 instances, 3 scripts, 1 lint, none a real citation.
  matches="$(grep -rnE --exclude='*.fixture.md' "$STAMP_RE" "${dirs[@]}" 2>/dev/null \
    | grep -vE '(^|/)curriculum/evals/' || true)"
fi
if [[ ${#files[@]} -gt 0 ]]; then
  more="$(grep -nHE "$STAMP_RE" "${files[@]}" 2>/dev/null || true)"
  [[ -n "$more" ]] && matches="${matches:+$matches$'\n'}$more"
fi

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

  # due-based escalation applies ONLY to OK-result stamps. BLOCKED stays INFO
  # whatever its due field says (a paywalled source is deferred, not a content
  # defect); CORRECT/GONE/STALE/NEEDED/never are already block by result.
  #
  # ONE exception, and it is narrow: a CAVEAT whose author wrote a real calendar
  # date is an author scheduling a re-check, not deferring one, and that date
  # went unread — 33 CAVEAT stamps carried a date and 4 were already past due,
  # invisible in INFO on a green run. Such a stamp warns once its date passes.
  # A CAVEAT on due:none / due:cohort / due:asap keeps the exemption in full.
  if [[ "$result" == "CAVEAT" && "$due" == [0-9]* && "$due" < "$TODAY" ]]; then
    sev=warn; reason="CAVEAT past its own due:$due — re-verify or re-stamp"
  fi

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
