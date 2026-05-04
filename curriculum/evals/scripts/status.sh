#!/usr/bin/env bash
# status.sh — one-glance verdict table across mechanical + sim/eval layers.
#
# Reads every curriculum/evals/instances/*.json and prints a (file × class) grid.
# Mechanical row pulls from curriculum/evals/mechanical/NEXT.md.
#
# Usage: curriculum/evals/scripts/status.sh [--training agents-101|ae101|all]
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
  local mech_date
  mech_date=$(sed -nE 's/.*Last updated:\*\* ([0-9]{4}-[0-9]{2}-[0-9]{2}).*/\1/p' "$MECH_NEXT" | head -1)
  # Display as MM-DD to match the grid format
  mech_date="${mech_date:5}"
  awk -v d="$mech_date" '
    /^\| M[0-9]/ {
      # | M1 | **PASS 23/23** | ...
      gsub(/\*/, "", $0)
      split($0, a, "|")
      mod = a[2]; verdict = a[3]
      gsub(/^[ \t]+|[ \t]+$/, "", mod)
      gsub(/^[ \t]+|[ \t]+$/, "", verdict)
      # PASS 23/23 → P 23/23
      sub(/^PASS /, "P ", verdict)
      sub(/^REVISE/, "R", verdict)
      printf "  %-12s %-14s (%s)\n", mod, verdict, d
    }
  ' "$MECH_NEXT"
}

# ---- Sim/eval grid -----------------------------------------------------------
# For each instance: extract (training, file_short, class, verdict, blocks).
# class is normalized: storytelling → story.
extract_rows() {
  for f in "$INSTANCES_DIR"/*.json; do
    [[ -f "$f" ]] || continue
    # File mtime as MM-DD — JSON instances don't carry a run-date field, so
    # mtime is the only date signal. Touching the file post-judge will lie;
    # auto-degrade rules in curriculum/CLAUDE.md handle that case separately.
    local mtime
    if mtime=$(stat -f "%Sm" -t "%m-%d" "$f" 2>/dev/null); then :; else
      mtime=$(stat -c "%y" "$f" 2>/dev/null | cut -c6-10)
    fi
    jq -r --arg mtime "$mtime" '
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
        (blocks),
        $mtime
      ] | @tsv
    ' "$f" 2>/dev/null || echo -e "I\t?\t$(basename "$f" .json)\t?\tBROKEN\t0\t$mtime"
  done
}

# Universe of student-facing files we expect to be evaluated. Files appearing
# here that have no JSON instance show up as MISSING rows so coverage gaps
# are visible. Modules in trainings/<x>/, supplementary as shared.
emit_universe() {
  local training="$1"
  local d tr_dir tr_short f base
  for d in "$ROOT/curriculum/trainings"/*/; do
    [[ -d "$d" ]] || continue
    tr_dir=$(basename "$d")
    case "$tr_dir" in
      agentic-engineering-101) tr_short="ae101" ;;
      *) tr_short="$tr_dir" ;;
    esac
    if [[ "$training" != "all" && "$training" != "$tr_short" ]]; then continue; fi
    for f in "$d"*.md; do
      [[ -f "$f" ]] || continue
      base=$(basename "$f")
      # Tracking + maintainer-only files are not eval surfaces
      case "$base" in
        pre-cohort-todos.md|trainer-guide.md|training-architecture.md) continue ;;
      esac
      printf 'U\t%s\ttrainings/%s/%s\n' "$tr_short" "$tr_dir" "$base"
    done
  done
  # Supplementary — shared across trainings, always emitted
  for f in "$ROOT/curriculum/supplementary"/*.md; do
    [[ -f "$f" ]] || continue
    base=$(basename "$f")
    [[ "$base" == "README.md" ]] && continue
    printf 'U\tshared\tsupplementary/%s\n' "$base"
  done
  # Reference docs — shared, exempt from sim/story/mood ladder per
  # curriculum/CLAUDE.md (flat lookup material). Surfaced for coverage
  # visibility; MISSING here is informational, not a defect.
  for f in "$ROOT/curriculum/reference"/*.md; do
    [[ -f "$f" ]] || continue
    base=$(basename "$f")
    [[ "$base" == "README.md" ]] && continue
    printf 'U\tshared\treference/%s\n' "$base"
  done
}

print_grid() {
  local training="$1"
  { extract_rows | sed 's/^/I\t/'; emit_universe "$training"; } |
  awk -F'\t' -v want="$training" '
    function is_shared_path(p) {
      return (p ~ /^(supplementary|exercises|lectures|reference)\//)
    }
    $1 == "U" {
      tr=$2; file=$3
      if (want != "all" && tr != want && tr != "shared" && !is_shared_path(file)) next
      seen[file] = 1
      universe[file] = 1
      next
    }
    $1 == "I" {
      tr=$2; file=$3; cls=$4; v=$5; b=$6; m=$7
      if (want != "all" && tr != want && tr != "shared" && !is_shared_path(file)) next
      # Dedup by file alone — shared and agents-101 classes for same file collapse
      key = file
      verdict[key, cls] = v
      blocks[key, cls] = b
      mtime[key, cls] = m
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

      # Cell width: "P 05-03" = 7 chars; pad to 9 for breathing room
      cw = 9
      # Header
      printf "%-44s", "FILE"
      for (i=1; i<=n; i++) printf " %-*s", cw, toupper(substr(order[i],1,4))
      printf " %s\n", "BLOCKS"
      printf "%-44s", "----"
      for (i=1; i<=n; i++) printf " %-*s", cw, "----"
      printf " %s\n", "------"

      # Sort keys
      sm=0; for (k in seen) keys[++sm] = k
      # bubble sort, fine for small N
      for (i=1; i<=sm; i++) for (j=i+1; j<=sm; j++) if (keys[j] < keys[i]) { tmp=keys[i]; keys[i]=keys[j]; keys[j]=tmp }

      tot_p=0; tot_r=0; tot_b=0; tot_cells=0; tot_missing=0
      for (i=1; i<=sm; i++) {
        file=keys[i]
        # Strip prefix for display
        disp=file
        sub("^trainings/[^/]+/", "[mod] ", disp)
        sub("^exercises/", "[exr] ", disp)
        sub("^lectures/", "[lec] ", disp)
        sub("^supplementary/", "[sup] ", disp)
        sub("^reference/", "[ref] ", disp)
        sub("\\.md$", "", disp)
        if (length(disp) > 43) disp = substr(disp, 1, 40) "..."

        # Detect universe-only file (no class verdicts)
        any_class = 0
        for (c=1; c<=n; c++) if (verdict[keys[i], order[c]] != "") { any_class = 1; break }

        printf "%-44s", disp
        if (universe[file] && !any_class) {
          # MISSING row — file enumerated but no instances exist
          for (c=1; c<=n; c++) printf " %-*s", cw, "MISSING"
          printf " %s\n", "-"
          tot_missing++
          continue
        }

        row_blocks = 0
        for (c=1; c<=n; c++) {
          cls = order[c]
          v = verdict[keys[i], cls]
          b = blocks[keys[i], cls]
          mt = mtime[keys[i], cls]
          cell = "-"
          if (v == "PASS" && (b+0) == 0) {
            cell = "P " mt
            tot_p++
          } else if (v == "PASS") {
            cell = "Pt " mt  # PASS with TODOs (non-blocking)
            tot_p++
          } else if (v == "REVISE") {
            cell = "R " mt
            tot_r++
            row_blocks += (b+0)
          } else if (v != "") {
            cell = substr(v,1,1) " " mt
          }
          printf " %-*s", cw, cell
          if (v != "") tot_cells++
        }
        printf " %d\n", row_blocks
        tot_b += row_blocks
      }

      printf "\n"
      printf "Legend: P=PASS · Pt=PASS-with-todos · R=REVISE · MISSING=no JSON instance · date is JSON mtime (MM-DD)\n"
      printf "Totals: %d cells · PASS %d · REVISE %d · %d blocking findings · %d files MISSING all classes\n",
        tot_cells, tot_p, tot_r, tot_b, tot_missing
    }
  '
}

# ---- Output ------------------------------------------------------------------
echo "=== MECHANICAL BATTERY (Agents 101 M1-M6) ==="
mech_summary

echo
echo "=== SIM + EVAL GRID (training: $TRAINING_FILTER) ==="
print_grid "$TRAINING_FILTER"
