#!/usr/bin/env bash
# content-creation-brief.sh — emit the strategic context for a curriculum file.
#
# Subagents can't invoke the /content-creation skill (skills don't load in
# subagents). When the orchestrator dispatches fan-out edits, this script
# extracts what /content-creation's preflight would have loaded:
#   - training (bootstrap | ae101 | shared) → voice contract
#   - Big Idea (from ## Big Idea section)
#   - Mood contract (from maintainer block, when present)
#   - Surface compendiums (writing / student_facing / strategy_tie_in / prompts / ...)
#   - Hard rules: read content-rules.md, body-only, etc.
#
# The orchestrator pipes this into each subagent's brief verbatim, alongside
# the per-finding fix-hint. Subagents now edit with strategy in context, same
# shape as /content-creation does in the main thread.
#
# Strategic source (bosser-strategy:content-strategy.md) is a private skill —
# orchestrator loads it once per session and pastes the relevant module slice
# into the subagent brief as a complementary block. This script extracts what
# is observable in the file itself.
#
# Usage:
#   content-creation-brief.sh <file>           # human-readable
#   content-creation-brief.sh <file> --raw     # plain text for piping into prompts

set -eu

FILE="$1"
[[ -f "$FILE" ]] || { echo "error: $FILE not found" >&2; exit 1; }

RAW=0
[[ "${2:-}" == "--raw" ]] && RAW=1

# ---- Detect training -----------------------------------------------------
case "$FILE" in
  *curriculum/trainings/bootstrap/*)              TRAINING="bootstrap" ;;
  *curriculum/trainings/agentic-engineering-101/*) TRAINING="ae101" ;;
  *curriculum/trainings/*)                         TRAINING="other-training" ;;
  *curriculum/exercises/*|*curriculum/lectures/*|*curriculum/supplementary/*)
                                                   TRAINING="shared" ;;
  *) TRAINING="unknown" ;;
esac

# ---- Voice contract per training ----------------------------------------
case "$TRAINING" in
  bootstrap)
    VOICE="Bootstrap voice trio: Godin (peer warmth) × Sutherland (counterintuitive reframe) × Siilasmaa (optimistic action). Audience: builder leader (CTO/CEO/SVP), not engineers. NOT Boris-flat, NOT Martin-deck."
    ;;
  ae101)
    VOICE="AE101 voice quintet: Boris (platform truth) × Roger Martin (frame-and-alternative) × Godin (peer warmth) × Sutherland (counterintuitive reframe) × Siilasmaa (optimistic action). Audience: software engineer IC."
    ;;
  shared)
    VOICE="Shared library — voice depends on consuming training. Default to Bootstrap voice trio unless training context indicates otherwise."
    ;;
  *)
    VOICE="(unrecognized training path; check $FILE location)"
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
[[ -z "$MOOD" ]] && MOOD="(mood contract not stated in maintainer block — load bosser-strategy:content-strategy.md per-module section in the orchestrator and inject separately)"

# ---- Surface compendiums (which check_*.md fire for this file) ----------
# Heuristic: every student-facing file loads writing + student_facing + strategy_tie_in.
# Files with **Prompt** blocks also load prompts. Lectures also load lectures.
COMPENDIUMS="check_writing.md, check_student_facing.md, check_strategy_tie_in.md"
if grep -q '^\*\*Prompt\*\*' "$FILE" 2>/dev/null; then
  COMPENDIUMS+=", check_prompts.md"
fi
case "$FILE" in
  *curriculum/lectures/*) COMPENDIUMS+=", check_lectures.md" ;;
esac

# ---- Hard-rule preamble -------------------------------------------------
HARD_RULES=$(cat <<'EOF'
1. Read `/Users/anttitevanlinna/Projects/agents-102/.claude/rules/content-rules.md` FIRST. It routes you to the right compendiums for this surface.
2. Read each compendium named below on demand (do not bulk-load).
3. Body region only. Do NOT edit content inside fenced code-block prompts unless the brief explicitly authorizes it. The mechanical battery extracts those prompts; touching them rots transcripts.
4. Do NOT touch the maintainer-block Quality line. The orchestrator stamps it via update-quality.sh after eval re-fire.
5. Do NOT touch any Debrief prompt or its body callout — behavior-class blockers there are intentional residual per memory/compounded/2026-05-02-pedagogy-debrief-prompts-residual-med-risk-by-design.md.
6. No em-dashes (the deterministic auto-fix hook will swap to comma; write clean).
7. Honor the mood contract above. Do NOT resolve a mood the strategy keeps open. M3 unsettled-competence stays unsettled. M4 deepened-unease stays uneasy. M5 is the rescue, not earlier.
EOF
)

# ---- Output -------------------------------------------------------------
if [[ $RAW -eq 1 ]]; then
  cat <<EOF
=== STRATEGIC CONTEXT (auto-extracted by content-creation-brief.sh) ===

TARGET FILE: $FILE

TRAINING: $TRAINING

VOICE CONTRACT: $VOICE

BIG IDEA: $BIG_IDEA

MOOD CONTRACT:
$MOOD

SURFACE COMPENDIUMS: $COMPENDIUMS
(at /Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/)

HARD RULES (read these BEFORE editing):
$HARD_RULES

=== END STRATEGIC CONTEXT ===
EOF
else
  echo "## Strategic context for: $FILE"
  echo
  echo "**Training:** $TRAINING"
  echo "**Voice:** $VOICE"
  echo "**Big Idea:** $BIG_IDEA"
  echo
  echo "**Mood contract:**"
  echo "$MOOD"
  echo
  echo "**Compendiums in scope:** $COMPENDIUMS"
  echo
  echo "**Hard rules:**"
  echo "$HARD_RULES"
fi
