#!/usr/bin/env bash
# update-quality.sh — write the maintainer-block Quality state.
#
# Quality is current state, not history. Git carries the chain. The script
# replaces the **Quality:** line + the immediately-following `- ` rows.
#
# FOUR axes (each renders as ≤1 row):
#   judges               — four-class verdict (writing/story/technical/behavior)
#   mechanical           — mechanical battery (script-only judge run)
#   maintainer-reviewed  — Antti read end-to-end + ran prompts manually
#   cohorts              — delivery state
#
# Per-judge-class flags (these roll up into ONE judges row):
#   --writing    <state>[:<note>]
#   --story      <state>[:<note>]
#   --technical  <state>[:<note>]
#   --behavior   <state>[:<note>]
#
# Other axis flags:
#   --mechanical          <state>[:<note>]
#   --maintainer-reviewed <state>[:<note>]
#   --cohorts             <state>[:<note>]
#
# State values:
#   PASS                — clean. Pin @<sha>.
#   REVISE:<note>       — flagged. <note> mandatory (cause or accept-reason).
#   grandfathered[:<n>] — pre-judge-refactor pass.
#   na[:<reason>]       — does not apply.
#   keep                — preserve current state for that axis (default for omitted flags).
#
# Other args:
#   --sha <short-sha>   default: current HEAD
#   --date <YYYY-MM-DD> default: today

set -eu

usage() { sed -n '2,32p' "$0"; exit 2; }

[[ $# -lt 1 ]] && usage

FILE="$1"; shift
[[ -f "$FILE" ]] || { echo "error: file not found: $FILE" >&2; exit 1; }

SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
DATE="$(date +%Y-%m-%d)"

# Per-judge-class state
state_writing=keep
state_story=keep
state_technical=keep
state_behavior=keep

# Axis state
state_mechanical=keep
state_maintainer_reviewed=keep
state_cohorts=keep

while [[ $# -gt 0 ]]; do
  case "$1" in
    --writing)             state_writing="$2"; shift 2 ;;
    --story)               state_story="$2"; shift 2 ;;
    --technical)           state_technical="$2"; shift 2 ;;
    --behavior)            state_behavior="$2"; shift 2 ;;
    --mechanical)          state_mechanical="$2"; shift 2 ;;
    --maintainer-reviewed) state_maintainer_reviewed="$2"; shift 2 ;;
    --cohorts)             state_cohorts="$2"; shift 2 ;;
    --sha)                 SHA="$2"; shift 2 ;;
    --date)                DATE="$2"; shift 2 ;;
    -h|--help)             usage ;;
    *) echo "error: unknown arg $1" >&2; exit 1 ;;
  esac
done

# REVISE without note is a hard error
for v in "$state_writing" "$state_story" "$state_technical" "$state_behavior" \
         "$state_mechanical" "$state_maintainer_reviewed" "$state_cohorts"; do
  if [[ "$v" == "REVISE" ]]; then
    echo "error: REVISE state requires :<note> (cause or accept-reason)" >&2
    exit 1
  fi
done

# ---- Read existing Quality block to support --keep ---------------------------
keep_judges=""
keep_mechanical=""
keep_maintainer=""
keep_cohorts=""
in_block=0
while IFS= read -r line; do
  if [[ "$line" == "**Quality:**"* ]]; then in_block=1; continue; fi
  if [[ $in_block -eq 1 ]]; then
    case "$line" in
      "- judges:"*|"- judges "*)                     keep_judges="$line" ;;
      "- mechanical:"*|"- mechanical "*)             keep_mechanical="$line" ;;
      "- maintainer-reviewed:"*|"- maintainer-reviewed "*) keep_maintainer="$line" ;;
      "- cohorts:"*|"- cohorts "*)                   keep_cohorts="$line" ;;
      ""|"**"*)                                       in_block=0 ;;
    esac
  fi
done < "$FILE"

# ---- Render the judges row (rolls up four per-class states) ------------------
render_class_inline() {
  local cls="$1" raw="$2"
  case "$raw" in
    PASS)            echo "$cls PASS" ;;
    PASS:*)          echo "$cls PASS (${raw#PASS:})" ;;
    REVISE:*)        echo "$cls REVISE (${raw#REVISE:})" ;;
    grandfathered)   echo "$cls grandfathered" ;;
    grandfathered:*) echo "$cls grandfathered (${raw#grandfathered:})" ;;
    na)              echo "$cls N/A" ;;
    na:*)            echo "$cls N/A (${raw#na:})" ;;
    keep)            echo "__KEEP__" ;;
  esac
}

# Build judges row only if at least one of the four classes is non-keep
all_keep=1
for v in "$state_writing" "$state_story" "$state_technical" "$state_behavior"; do
  [[ "$v" != "keep" ]] && all_keep=0
done

if [[ $all_keep -eq 1 ]]; then
  judges_row="${keep_judges:-- judges: not yet judge-audited}"
else
  parts=""
  for pair in "writing $state_writing" "story $state_story" \
              "technical $state_technical" "behavior $state_behavior"; do
    cls="${pair%% *}"
    raw="${pair#* }"
    if [[ "$raw" == "keep" ]]; then
      # Try to reuse from existing judges row if present (best-effort: keep value)
      raw=grandfathered
    fi
    rendered=$(render_class_inline "$cls" "$raw")
    parts+="${parts:+, }$rendered"
  done
  judges_row="- judges @$SHA: $parts"
fi

# ---- Render axis rows --------------------------------------------------------
render_axis_row() {
  local label="$1" raw="$2" existing="$3"
  case "$raw" in
    PASS)            echo "- $label @$SHA: PASS" ;;
    PASS:*)          echo "- $label @$SHA: PASS — ${raw#PASS:}" ;;
    REVISE:*)        echo "- $label: REVISE — ${raw#REVISE:}" ;;
    grandfathered)   echo "- $label: grandfathered" ;;
    grandfathered:*) echo "- $label: grandfathered — ${raw#grandfathered:}" ;;
    na)              echo "- $label: N/A" ;;
    na:*)            echo "- $label: N/A — ${raw#na:}" ;;
    keep)            echo "${existing:-}" ;;
  esac
}

mechanical_row=$(render_axis_row mechanical "$state_mechanical" "$keep_mechanical")
maintainer_row=$(render_axis_row maintainer-reviewed "$state_maintainer_reviewed" "$keep_maintainer")
cohorts_row=$(render_axis_row cohorts "$state_cohorts" "$keep_cohorts")

# ---- Build top-state line: SHA pins for PASS judge-classes only --------------
sha_pins=""
for pair in "writing $state_writing" "story $state_story" \
            "technical $state_technical" "behavior $state_behavior"; do
  cls="${pair%% *}"
  raw="${pair#* }"
  if [[ "$raw" == "PASS" || "$raw" == PASS:* ]]; then
    sha_pins+="${sha_pins:+ }$cls@$SHA"
  fi
done
NEW_TOP="**Quality:** compendium-audited $DATE${sha_pins:+ ($sha_pins)}"

# ---- Splice into file --------------------------------------------------------
TMP="$(mktemp)"
awk -v top="$NEW_TOP" \
    -v rj="$judges_row" \
    -v rm="$mechanical_row" \
    -v rmr="$maintainer_row" \
    -v rc="$cohorts_row" '
  BEGIN { in_block = 0; written = 0 }
  /^\*\*Quality:\*\*/ {
    print top
    if (rj  != "") print rj
    if (rm  != "") print rm
    if (rmr != "") print rmr
    if (rc  != "") print rc
    in_block = 1; written = 1
    next
  }
  in_block == 1 {
    if ($0 ~ /^- /) next
    if ($0 == "") { in_block = 0; print; next }
    if ($0 ~ /^\*\*[A-Z]/) { in_block = 0; print; next }
    next
  }
  { print }
  END {
    if (written == 0) {
      print ""
      print top
      if (rj  != "") print rj
      if (rm  != "") print rm
      if (rmr != "") print rmr
      if (rc  != "") print rc
    }
  }
' "$FILE" > "$TMP"

mv "$TMP" "$FILE"
echo "Updated Quality block in $FILE"
echo "---"
awk '/^\*\*Quality:\*\*/ {p=1} p && /^$/ {exit} p' "$FILE"
