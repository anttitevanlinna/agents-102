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
prior_top=""
# Prior per-class SHA pins from the existing top-line. Empty if absent.
# Used when a class is in `keep` state so the top-line tuple is preserved.
prior_pin_writing=""
prior_pin_story=""
prior_pin_technical=""
prior_pin_behavior=""
in_block=0
while IFS= read -r line; do
  if [[ "$line" == "**Quality:**"* ]]; then
    in_block=1
    prior_top="$line"
    continue
  fi
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

# Extract prior per-class pins from `(<cls>@<sha> ...)` group on the top-line.
# Pattern: writing@abc1234 story@def5678 technical@ghi9012 behavior@jkl3456.
# Tolerates extra spaces and any subset of the four classes.
if [[ -n "$prior_top" ]]; then
  for cls in writing story technical behavior; do
    pin=$(printf '%s\n' "$prior_top" | sed -nE "s/.*[^a-z]($cls@[a-zA-Z0-9_-]+).*/\1/p")
    case "$cls" in
      writing)    prior_pin_writing="$pin" ;;
      story)      prior_pin_story="$pin" ;;
      technical)  prior_pin_technical="$pin" ;;
      behavior)   prior_pin_behavior="$pin" ;;
    esac
  done
fi

# Fallback: recover per-class pins from the `- judges @<sha>: <verdicts>` row
# when the top-line tuple was dropped by an earlier broken stamp. The judges
# row records a SINGLE row-level SHA and per-class verdict strings; lift the
# row SHA onto each class that is currently marked PASS (or PASS:*). Classes
# in REVISE / grandfathered / N/A get no pin (correct — they're not in PASS
# state). This restores spec-conformant top-lines on files whose tuples were
# previously clobbered.
if [[ -z "$prior_pin_writing$prior_pin_story$prior_pin_technical$prior_pin_behavior" \
      && -n "$keep_judges" ]]; then
  row_sha=$(printf '%s\n' "$keep_judges" | sed -nE 's/^- judges @([a-zA-Z0-9_-]+):.*/\1/p')
  if [[ -n "$row_sha" ]]; then
    judges_body="${keep_judges#*: }"
    for cls in writing story technical behavior; do
      if printf '%s\n' "$judges_body" | grep -qE "(^|, )$cls PASS(\b|,|$)"; then
        case "$cls" in
          writing)   prior_pin_writing="$cls@$row_sha"   ;;
          story)     prior_pin_story="$cls@$row_sha"     ;;
          technical) prior_pin_technical="$cls@$row_sha" ;;
          behavior)  prior_pin_behavior="$cls@$row_sha"  ;;
        esac
      fi
    done
  fi
fi

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

# Parse prior judges-row body into per-class verdict entries so `keep` classes
# preserve their prior state rather than collapsing to grandfathered.
prior_judges_writing=""
prior_judges_story=""
prior_judges_technical=""
prior_judges_behavior=""
if [[ -n "$keep_judges" ]]; then
  judges_body_prior="${keep_judges#*: }"
  IFS=',' read -r -a verdict_arr <<< "$judges_body_prior"
  for entry in "${verdict_arr[@]}"; do
    entry="${entry#"${entry%%[![:space:]]*}"}"  # ltrim
    case "$entry" in
      writing\ *)   prior_judges_writing="$entry"   ;;
      story\ *)     prior_judges_story="$entry"     ;;
      technical\ *) prior_judges_technical="$entry" ;;
      behavior\ *)  prior_judges_behavior="$entry"  ;;
    esac
  done
fi

# Convert a rendered "<cls> PASS (note)" entry back to internal state value.
prior_state_for() {
  local cls="$1" entry="$2"
  [[ -z "$entry" ]] && { echo ""; return; }
  local body="${entry#"$cls "}"
  case "$body" in
    PASS)                  echo "PASS" ;;
    "PASS ("*)             local n="${body#PASS (}"; echo "PASS:${n%)}" ;;
    "REVISE ("*)           local n="${body#REVISE (}"; echo "REVISE:${n%)}" ;;
    grandfathered)         echo "grandfathered" ;;
    "grandfathered ("*)    local n="${body#grandfathered (}"; echo "grandfathered:${n%)}" ;;
    "N/A")                 echo "na" ;;
    "N/A ("*)              local n="${body#N/A (}"; echo "na:${n%)}" ;;
    *)                     echo "grandfathered" ;;  # unrecognised — degrade safely
  esac
}

if [[ $all_keep -eq 1 ]]; then
  judges_row="${keep_judges:-- judges: not yet judge-audited}"
else
  parts=""
  for pair in "writing $state_writing" "story $state_story" \
              "technical $state_technical" "behavior $state_behavior"; do
    cls="${pair%% *}"
    raw="${pair#* }"
    if [[ "$raw" == "keep" ]]; then
      case "$cls" in
        writing)    raw=$(prior_state_for writing   "$prior_judges_writing")   ;;
        story)      raw=$(prior_state_for story     "$prior_judges_story")     ;;
        technical)  raw=$(prior_state_for technical "$prior_judges_technical") ;;
        behavior)   raw=$(prior_state_for behavior  "$prior_judges_behavior")  ;;
      esac
      [[ -z "$raw" ]] && raw=grandfathered  # no prior judges row at all
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

# ---- Build top-state line: SHA pins for PASS judge-classes ------------------
# Resolution order per class:
#   1. State set this invocation to PASS / PASS:*  → pin @ current SHA.
#   2. State left as `keep` → re-use prior pin if one existed.
#   3. State explicitly REVISE / grandfathered / na → no pin (judge-class is
#      not in a PASS state, so no SHA token on the top-line).
sha_pins=""
for pair in "writing $state_writing" "story $state_story" \
            "technical $state_technical" "behavior $state_behavior"; do
  cls="${pair%% *}"
  raw="${pair#* }"
  if [[ "$raw" == "PASS" || "$raw" == PASS:* ]]; then
    sha_pins+="${sha_pins:+ }$cls@$SHA"
  elif [[ "$raw" == "keep" ]]; then
    case "$cls" in
      writing)   [[ -n "$prior_pin_writing"   ]] && sha_pins+="${sha_pins:+ }$prior_pin_writing"   ;;
      story)     [[ -n "$prior_pin_story"     ]] && sha_pins+="${sha_pins:+ }$prior_pin_story"     ;;
      technical) [[ -n "$prior_pin_technical" ]] && sha_pins+="${sha_pins:+ }$prior_pin_technical" ;;
      behavior)  [[ -n "$prior_pin_behavior"  ]] && sha_pins+="${sha_pins:+ }$prior_pin_behavior"  ;;
    esac
  fi
done

# Top-line date: bump to DATE iff a judge-class state was actually set this run.
# Otherwise preserve the prior date so a mechanical-only stamp doesn't lie about
# when the compendium audit happened.
top_date="$DATE"
if [[ $all_keep -eq 1 && -n "$prior_top" ]]; then
  prior_date=$(printf '%s\n' "$prior_top" | sed -nE 's/.*compendium-audited ([0-9]{4}-[0-9]{2}-[0-9]{2}).*/\1/p')
  [[ -n "$prior_date" ]] && top_date="$prior_date"
fi
NEW_TOP="**Quality:** compendium-audited $top_date${sha_pins:+ ($sha_pins)}"

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
