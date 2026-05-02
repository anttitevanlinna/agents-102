#!/usr/bin/env bash
# next-fixes.sh — prioritized punch list across sim/eval instances.
#
# Ranks files by (cross-class recurrence × blocking count × surface weight)
# and prints the top blocking finding per file with a fix-hint.
#
# Usage: curriculum/evals/scripts/next-fixes.sh [--training bootstrap|all] [--limit N]

set -eu

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
INSTANCES_DIR="$ROOT/curriculum/evals/instances"

TRAINING="all"
LIMIT=10
EXCLUDE_RESIDUAL=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --training) TRAINING="$2"; shift 2 ;;
    --limit) LIMIT="$2"; shift 2 ;;
    --exclude-residual) EXCLUDE_RESIDUAL=1; shift ;;
    *) TRAINING="$1"; shift ;;
  esac
done

# Pattern IDs that are intentional Debrief residuals — kept by design per
# memory/compounded/2026-05-02-pedagogy-debrief-prompts-residual-med-risk-by-design.md
# When --exclude-residual is set, behavior-class blocks attributable to ONLY these
# patterns are zeroed out and the file drops out of the rank if no real blocks remain.
RESIDUAL_PATTERNS="self-report-inflation self-audit-charity preamble-before-action overwrite-anxiety file-preservation-gap niceness-tax"

# ---- Step 1: per-file aggregate scores ---------------------------------------
score_files() {
  for f in "$INSTANCES_DIR"/*.json; do
    [[ -f "$f" ]] || continue
    jq -r --arg want "$TRAINING" --arg exclude "$EXCLUDE_RESIDUAL" --arg residuals "$RESIDUAL_PATTERNS" '
      def normclass:
        if . == "storytelling" then "story" else . end;
      def matches_training:
        if $want == "all" then true
        else (.training == $want or .training == "shared") end;
      def real_behavior_blocks:
        # Count REVISE-prompts where any risk fired is NOT a known residual
        ($residuals | split(" ")) as $res |
        ((.prompts_findings // [])
          | map(select(.verdict == "REVISE"))
          | map(.risks_fired // []
              | map(select(.confidence == "high" or .confidence == "med"))
              | map(select(.pattern_id as $p | ($res | index($p)) | not))
              | length)
          | add // 0);
      def blocks:
        if .class == "behavior" and $exclude == "1"
        then real_behavior_blocks
        else (.counts.blocking_violations // .blocking_findings_count // 0)
        end;
      select(matches_training and .verdict == "REVISE") |
      blocks as $b |
      select($b > 0) |
      [
        (.file // "?" | sub("^.*curriculum/"; "")),
        (.class | normclass),
        ($b)
      ] | @tsv
    ' "$f" 2>/dev/null || true
  done
}

aggregate() {
  score_files | awk -F'\t' '
    {
      file=$1; cls=$2; b=$3
      total_blocks[file] += (b+0)
      classes_failed[file] = classes_failed[file] (classes_failed[file] ? "," : "") cls
      class_count[file]++
    }
    END {
      for (f in total_blocks) {
        weight = 1
        if (f ~ /^trainings\//) weight = 3
        else if (f ~ /^exercises\//) weight = 2
        score = total_blocks[f] * class_count[f] * weight
        printf "%d\t%d\t%d\t%s\t%s\n", score, total_blocks[f], class_count[f], f, classes_failed[f]
      }
    }
  ' | sort -t$'\t' -k1,1nr -k2,2nr
}

# ---- Step 2: top finding per (file × class) ---------------------------------
find_instance() {
  local file_path="$1" class="$2"
  local norm_class="$class"
  [[ "$class" == "story" ]] && norm_class="storytelling"
  for inst in "$INSTANCES_DIR"/*.json; do
    [[ -f "$inst" ]] || continue
    local match
    match=$(jq -r --arg cls "$class" --arg ncls "$norm_class" --arg fp "$file_path" '
      if (.class == $cls or .class == $ncls) and (.file | endswith($fp))
      then "yes" else "no" end' "$inst" 2>/dev/null || echo no)
    if [[ "$match" == "yes" ]]; then
      echo "$inst"
      return
    fi
  done
}

print_findings() {
  local inst="$1" class="$2"
  if [[ "$class" == "behavior" ]]; then
    # When --exclude-residual is on, hide residual patterns in the per-prompt detail too
    jq -r --arg exclude "$EXCLUDE_RESIDUAL" --arg residuals "$RESIDUAL_PATTERNS" '
      ($residuals | split(" ")) as $res |
      (.prompts_findings // [])[] |
      select(.verdict == "REVISE") |
      "      prompt #\(.prompt_index // "?"): \(.prompt_lead // "" | .[0:80])"
      , (
        (.risks_fired // [])
        | map(select(.confidence == "high" or .confidence == "med"))
        | (if $exclude == "1"
             then map(select(.pattern_id as $p | ($res | index($p)) | not))
             else . end)
        | .[0:2][]
        | "        - \(.pattern_id) [conf=\(.confidence)]\n          fix: \((.fix_hint // "(no hint)") | .[0:200])"
      )
    ' "$inst" 2>/dev/null | head -8
  else
    # Two schema variants: newer .findings[] or older .rules_evaluated[].
    # Prefer .findings if it exists and has blocking entries.
    local has_findings
    has_findings=$(jq '(.findings // []) | map(select(.severity == "blocking")) | length' "$inst" 2>/dev/null || echo 0)
    if [[ "${has_findings:-0}" -gt 0 ]]; then
      jq -r '
        (.findings // [])[] |
        select(.severity == "blocking") |
        "      rule: \(.rule // "?") — line \(.line // "?")\n      evidence: \((.snippet // .issue // "(none)") | tostring | .[0:160])\n      fix: \((.fix // "(no hint)") | tostring | .[0:200])"
      ' "$inst" 2>/dev/null | head -9
    else
      jq -r '
        (.rules_evaluated // [])[] |
        select(type == "object" and .blocking == true and .verdict == "REVISE") |
        "      rule: \(.compendium // "?")#\(.rule_index // "?") — \(.rule_lead // "" | .[0:80])\n      evidence: \((.evidence // "(none)") | .[0:160])\n      fix: \((.fix_hint // "(no hint)") | .[0:200])"
      ' "$inst" 2>/dev/null | head -9
    fi
  fi
}

# ---- Output ------------------------------------------------------------------
echo "=== TOP $LIMIT FIXES (training: $TRAINING) ==="
echo "Ranked by: blocks × classes_failed × surface_weight (mod=3, exr=2, lec=1)"
echo

rank=0
while IFS=$'\t' read -r score blocks class_count file classes; do
  rank=$((rank + 1))
  [[ $rank -gt $LIMIT ]] && break

  surface="lec"
  [[ "$file" == trainings/* ]] && surface="mod"
  [[ "$file" == exercises/* ]] && surface="exr"
  [[ "$file" == supplementary/* ]] && surface="sup"

  display="${file#trainings/*/}"
  display="${display#exercises/}"
  display="${display#lectures/}"
  display="${display#supplementary/}"
  display="${display%.md}"

  printf "%2d. [%s] %s\n" "$rank" "$surface" "$display"
  printf "    blocks=%s · classes=%s (%s) · score=%s\n" \
    "$blocks" "$class_count" "$classes" "$score"

  IFS=',' read -ra cls_arr <<< "$classes"
  for cls in "${cls_arr[@]}"; do
    inst=$(find_instance "$file" "$cls" || true)
    if [[ -n "${inst:-}" ]]; then
      printf "    --- %s (%s) ---\n" "$cls" "$(basename "$inst")"
      print_findings "$inst" "$cls"
    fi
  done
  echo
done < <(aggregate)
