#!/usr/bin/env bash
# content-creation-brief.sh — emit the strategic context for a curriculum file.
#
# What a writer cannot get from the autoloaded rules: this file's training,
# Big Idea, mood contract and strategy doc, plus which T1 rule indexes its
# surfaces need (indexes do not autoload; `.claude/rules/content-rules.md`
# does, in subagents too). The orchestrator pipes it into each writer's brief
# alongside the per-finding fix-hint.
#
# Usage:
#   content-creation-brief.sh <file>           # human-readable
#   content-creation-brief.sh <file> --raw     # plain text for piping into prompts

set -eu

FILE="$1"
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
CORE_DIR="${AGENTS_CORE_DIR:-$(cd "$REPO_ROOT/.." && pwd)/agents-102-core}"
CORE_MEM="$CORE_DIR/memory"
[[ -f "$FILE" ]] || { echo "error: $FILE not found" >&2; exit 1; }

RAW=0
[[ "${2:-}" == "--raw" ]] && RAW=1

# ---- Detect training -----------------------------------------------------
# The key is the directory under curriculum/trainings/, so a new training needs
# no edit here. Its strategy doc is content-strategy-<key>.md in core; Agents 101
# predates the convention and keeps the unsuffixed name.
case "$FILE" in
  *curriculum/trainings/*/*)
    TRAINING="${FILE##*curriculum/trainings/}"; TRAINING="${TRAINING%%/*}" ;;
  *curriculum/exercises/*|*curriculum/lectures/*)  TRAINING="shared" ;;
  *) TRAINING="unknown" ;;
esac

case "$TRAINING" in
  agents-101)     STRATEGY="$CORE_DIR/strategy/content-strategy.md" ;;
  shared|unknown) STRATEGY="(shared file: the consuming training's doc in $CORE_DIR/strategy/)" ;;
  *)              STRATEGY="$CORE_DIR/strategy/content-strategy-$TRAINING.md" ;;
esac

# ---- Voice contract per training ----------------------------------------
case "$TRAINING" in
  agents-101)
    VOICE="Agents 101 voice trio: Godin (peer warmth) × Sutherland (counterintuitive reframe) × Siilasmaa (optimistic action). Audience: builder leader (CTO/CEO/SVP), not engineers. NOT Boris-flat, NOT Martin-deck."
    ;;
  agentic-engineering-101)
    VOICE="AE101 voice quintet: Boris (platform truth) × Roger Martin (frame-and-alternative) × Godin (peer warmth) × Sutherland (counterintuitive reframe) × Siilasmaa (optimistic action). Audience: software engineer IC."
    ;;
  shared)
    VOICE="Shared library — voice depends on consuming training. Default to Agents 101 voice trio unless training context indicates otherwise."
    ;;
  unknown)
    VOICE="(unrecognized training path; check $FILE location)"
    ;;
  *)
    VOICE="Per the training's strategy doc (STRATEGY DOC below): its voice and audience sections."
    ;;
esac

# ---- Big Idea -----------------------------------------------------------
BIG_IDEA=$(awk '
  /^## Big Idea/ { in_section=1; next }
  in_section && /^## / { exit }
  in_section && NF { print; exit }   # first non-empty line after header
' "$FILE")
[[ -z "$BIG_IDEA" ]] && BIG_IDEA="(no ## Big Idea section in this file)"

# ---- Mood contract (from maintainer block) ------------------------------
# Look for an explicit mood paragraph in maintainer block.
MOOD=$(awk '
  /<!-- maintainer -->/ { in_maintainer=1; next }
  in_maintainer && /[Mm]ood contract/ {
    found=1
    print
    while ((getline line) > 0) {
      if (line ~ /^\*\*[A-Z]/) break       # next bold-section ends mood
      if (line ~ /^- /) print line          # bullet rows under mood
      else if (line ~ /^$/ && following_bullets > 0) break
      else if (line !~ /^- / && following_bullets == 0) print line
    }
    exit
  }
' "$FILE")
[[ -z "$MOOD" ]] && MOOD="(mood contract not stated in maintainer block — read this module's section of the STRATEGY DOC)"

# ---- Surface compendiums (which check_*.md fire for this file) ----------
# Heuristic: every student-facing file loads writing + student_facing + strategy_tie_in.
# Files with **Prompt** blocks (inline) OR {{prompt:<key>}} markers (post-
# migration registry references) also load prompts. Lectures also load lectures.
SURFACES="writing student_facing strategy_tie_in"
if grep -qE '^\*\*Prompt\*\*|\{\{prompt:[a-z0-9-]+\}\}' "$FILE" 2>/dev/null; then
  SURFACES+=" prompts"
fi
case "$FILE" in
  *curriculum/lectures/*) SURFACES+=" lectures" ;;
esac
# Writers read the T1 rule index per surface; the full check_*.md (T3) is the judges' tier.
INDEXES=""
for sf in $SURFACES; do INDEXES+="${INDEXES:+, }$CORE_MEM/_index/$sf.leads.md"; done

# ---- Hard-rule preamble -------------------------------------------------
HARD_RULES=$(cat <<'EOF'
1. Read each T1 rule index named below before writing. For any ⚠ rule you are about to act on, load its full text: `node curriculum/evals/scripts/rule.js <surface> <N>`. Never load a full `check_*.md` to write prose; that tier is for judges.
2. Body region only. Do NOT edit content inside fenced code-block prompts unless the brief explicitly authorizes it. The mechanical battery extracts those prompts; touching them rots transcripts.
3. Do NOT touch the maintainer-block Quality line. The orchestrator stamps it via update-quality.sh after eval re-fire.
4. Do NOT touch any Debrief prompt or its body callout — behavior-class blockers there are intentional residual per memory/compounded/2026-05-02-pedagogy-debrief-prompts-residual-med-risk-by-design.md.
5. No em-dashes (the deterministic auto-fix hook will swap to comma; write clean).
6. Honor the mood contract above. Do NOT resolve a mood the strategy keeps open. The training's strategy doc (bosser-strategy) is the source; when the contract above is empty, read this module's mood there.
EOF
)

# ---- Output -------------------------------------------------------------
if [[ $RAW -eq 1 ]]; then
  cat <<EOF
=== STRATEGIC CONTEXT (auto-extracted by content-creation-brief.sh) ===

TARGET FILE: $FILE

TRAINING: $TRAINING

VOICE CONTRACT: $VOICE

STRATEGY DOC: $STRATEGY

BIG IDEA: $BIG_IDEA

MOOD CONTRACT:
$MOOD

RULE INDEXES (T1): $INDEXES

HARD RULES (read these BEFORE editing):
$HARD_RULES

=== END STRATEGIC CONTEXT ===
EOF
else
  echo "## Strategic context for: $FILE"
  echo
  echo "**Training:** $TRAINING"
  echo "**Voice:** $VOICE"
  echo "**Strategy doc:** $STRATEGY"
  echo "**Big Idea:** $BIG_IDEA"
  echo
  echo "**Mood contract:**"
  echo "$MOOD"
  echo
  echo "**Rule indexes (T1):** $INDEXES"
  echo
  echo "**Hard rules:**"
  echo "$HARD_RULES"
fi
