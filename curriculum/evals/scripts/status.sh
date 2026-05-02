#!/usr/bin/env bash
# status.sh — one-glance verdict table across mechanical + sim/eval layers.
#
# Reads every curriculum/evals/instances/*.json and prints a (file × class) grid.
# Mechanical row pulls from curriculum/evals/mechanical/NEXT.md.
#
# Usage: curriculum/evals/scripts/status.sh [--training bootstrap|ae101|all]
#                                           [--md > analytics/status.md]

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
INSTANCES_DIR="$ROOT/curriculum/evals/instances"
MECH_NEXT="$ROOT/curriculum/evals/mechanical/NEXT.md"

TRAINING_FILTER="${1:-all}"
case "${TRAINING_FILTER:-}" in
  --training) TRAINING_FILTER="${2:-all}" ;;
esac

# ---- Mechanical row ----------------------------------------------------------
mech_summary() {
  if [[ ! -f "$MECH_NEXT" ]]; then
    echo "  (NEXT.md missing)"
    return
  fi
  awk '
    /^\| M[0-9]/ {
      # | M1 | **PASS 23/23** | ...
      gsub(/\*/, "", $0)
      split($0, a, "|")
      mod = a[2]; verdict = a[3]
      gsub(/^[ \t]+|[ \t]+$/, "", mod)
      gsub(/^[ \t]+|[ \t]+$/, "", verdict)
      printf "  %-12s %s\n", mod, verdict
    }
  ' "$MECH_NEXT"
}

# ---- Sim/eval grid -----------------------------------------------------------
# For each instance: extract (training, file_short, class, verdict, blocks).
# class is normalized: storytelling → story.
extract_rows() {
  for f in "$INSTANCES_DIR"/*.json; do
    [[ -f "$f" ]] || continue
    jq -r '
      def normclass:
        if . == "storytelling" then "story" else . end;
      def blocks:
        (.counts.blocking_violations // .blocking_findings_count //
          ((.rules_evaluated // []) | map(select(.blocking == true and .verdict == "REVISE")) | length));
      [
        (.training // "?"),
        (.file // "?" | sub("^.*curriculum/"; "")),
        (.class // "?" | normclass),
        (.verdict // "?"),
        (blocks)
      ] | @tsv
    ' "$f" 2>/dev/null
  done
}

print_grid() {
  local training="$1"
  extract_rows | awk -F'\t' -v want="$training" '
    {
      tr=$1; file=$2; cls=$3; v=$4; b=$5
      if (want != "all" && tr != want && tr != "shared") next
      # Dedup by file alone — shared and bootstrap classes for same file collapse
      key = file
      verdict[key, cls] = v
      blocks[key, cls] = b
      seen[key] = 1
      classes[cls] = 1
    }
    END {
      # Class column order
      n=0
      order[++n] = "writing"
      order[++n] = "story"
      order[++n] = "technical"
      order[++n] = "behavior"

      # Header
      printf "%-44s", "FILE"
      for (i=1; i<=n; i++) printf " %-8s", toupper(substr(order[i],1,4))
      printf " %s\n", "BLOCKS"
      printf "%-44s", "----"
      for (i=1; i<=n; i++) printf " %-8s", "----"
      printf " %s\n", "------"

      # Sort keys
      m=0; for (k in seen) keys[++m] = k
      # bubble sort, fine for small N
      for (i=1; i<=m; i++) for (j=i+1; j<=m; j++) if (keys[j] < keys[i]) { tmp=keys[i]; keys[i]=keys[j]; keys[j]=tmp }

      tot_p=0; tot_r=0; tot_b=0; tot_cells=0
      for (i=1; i<=m; i++) {
        file=keys[i]
        # Strip prefix for display
        disp=file
        sub("^trainings/[^/]+/", "[mod] ", disp)
        sub("^exercises/", "[exr] ", disp)
        sub("^lectures/", "[lec] ", disp)
        sub("^supplementary/", "[sup] ", disp)
        sub("\\.md$", "", disp)
        # Truncate
        if (length(disp) > 43) disp = substr(disp, 1, 40) "..."

        printf "%-44s", disp
        row_blocks = 0
        for (c=1; c<=n; c++) {
          cls = order[c]
          v = verdict[keys[i], cls]
          b = blocks[keys[i], cls]
          if (v == "") {
            printf " %-8s", "-"
          } else if (v == "PASS" && (b+0) == 0) {
            printf " %-8s", "PASS"
            tot_p++
          } else if (v == "PASS") {
            printf " %-8s", "PASS-t"  # PASS with TODOs (blocking-rule count > 0 but no violations)
            tot_p++
          } else if (v == "REVISE") {
            printf " %-8s", "REVISE"
            tot_r++
            row_blocks += (b+0)
          } else {
            printf " %-8s", v
          }
          if (v != "") tot_cells++
        }
        printf " %d\n", row_blocks
        tot_b += row_blocks
      }

      printf "\n"
      printf "Totals: %d cells · PASS %d · REVISE %d · %d blocking findings\n",
        tot_cells, tot_p, tot_r, tot_b
    }
  '
}

# ---- Output ------------------------------------------------------------------
echo "=== MECHANICAL BATTERY (Bootstrap M1-M6) ==="
mech_summary

echo
echo "=== SIM + EVAL GRID (training: $TRAINING_FILTER) ==="
print_grid "$TRAINING_FILTER"
