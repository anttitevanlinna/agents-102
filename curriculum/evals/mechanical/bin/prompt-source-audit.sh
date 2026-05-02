#!/usr/bin/env bash
# Static lint of curriculum source: fenced prompts (P-checks) + exercise body (E-checks).
#
# Replaces the "Prompt-source audit" dimension that judges previously
# delegated to LLM-graded grep narration. This is pure grep/awk — exits
# 0 on no Sev-1, 1 on any Sev-1, prints a markdown report to stdout.
#
# Usage: prompt-source-audit.sh <exercise-slug> [exercise-file]
#   - <exercise-slug> resolves to /tmp/prompts/<slug>/ for fenced prompts
#     AND to curriculum/exercises/<slug>.md for body checks (unless
#     <exercise-file> is passed explicitly).
#
# Severity:
#   Sev-1 = breaks a cold student run (script exits 1)
#   Sev-2 = degrades quality without breaking
#   FLAG  = human judgement required

set -uo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <exercise-slug> [exercise-file]" >&2
  exit 2
fi

SLUG="$1"
EXERCISE_FILE="${2:-curriculum/exercises/$SLUG.md}"
PROMPTS_DIR="/tmp/prompts/$SLUG"

SEV1=0
SEV2=0
FLAG=0

note_sev1() { SEV1=$((SEV1+1)); echo "  Sev-1: $1"; }
note_sev2() { SEV2=$((SEV2+1)); echo "  Sev-2: $1"; }
note_flag() { FLAG=$((FLAG+1)); echo "  FLAG:  $1"; }

echo "# Prompt-source audit — $SLUG"
echo
echo "Inputs:"
echo "- Fenced prompts: $PROMPTS_DIR/prompt-*.txt"
echo "- Exercise body:  $EXERCISE_FILE"
echo

# ---- P-checks: fenced-prompt content ----

echo "## P-checks (fenced prompts)"
echo

if [[ ! -d "$PROMPTS_DIR" ]]; then
  echo "  (skipped — $PROMPTS_DIR not found; run parse-prompts.sh first)"
  echo
else
  for prompt in "$PROMPTS_DIR"/prompt-*.txt; do
    [[ -f "$prompt" ]] || continue
    name=$(basename "$prompt")

    # P1: bracketed placeholders. Carve out [text](url) markdown links.
    # Strip markdown links first, then look for [Word...] patterns.
    p1_hits=$(sed -E 's/\[[^]]+\]\([^)]+\)//g' "$prompt" \
              | grep -nE '\[[A-Za-z][^]]{2,}\]' || true)
    if [[ -n "$p1_hits" ]]; then
      note_sev1 "P1 placeholder in $name: $(echo "$p1_hits" | head -1)"
    fi

    # P2: skill path. Sev-1 only if the path is being INVOKED
    # (invoke/use/call/run/load near the path); otherwise Sev-2 (reference
    # or authoring destination). Exempt ~/.claude/projects/.
    p2_hits=$(grep -nE '(~/\.claude/skills/|\.claude/skills/|content/skills/)' "$prompt" || true)
    if [[ -n "$p2_hits" ]]; then
      while IFS= read -r line; do
        if echo "$line" | grep -qiE '\b(invoke|use the|call|run|load|dispatch)\b.*(skills/|SKILL\.md)'; then
          note_sev1 "P2 skill invoked by path in $name: $line"
        else
          note_sev2 "P2 skill path reference in $name: $line"
        fi
      done <<< "$p2_hits"
    fi

    # P3: markdown shout (**bold** or *italic*). Carve out backtick spans.
    p3_hits=$(sed -E 's/`[^`]+`//g' "$prompt" \
              | grep -nE '\*\*[^*]+\*\*|(^|[^*])\*[^*]+\*([^*]|$)' || true)
    if [[ -n "$p3_hits" ]]; then
      note_sev2 "P3 markdown shout in $name: $(echo "$p3_hits" | head -1)"
    fi

    # P4: curriculum-vocab leak.
    p4_hits=$(grep -nwE 'M[1-9]|the training|the send-off|compounding|the kit|requirement-weaving|the M-arc' "$prompt" || true)
    if [[ -n "$p4_hits" ]]; then
      note_sev1 "P4 curriculum vocab in $name: $(echo "$p4_hits" | head -1)"
    fi

    # P5: open-hook (last non-whitespace char is colon). FLAG only.
    last_char=$(tr -d '[:space:]' < "$prompt" | tail -c 1)
    if [[ "$last_char" == ":" ]]; then
      note_flag "P5 open-hook in $name (last char is colon — verify student owns the value)"
    fi
  done

  if [[ $SEV1 -eq 0 && $SEV2 -eq 0 && $FLAG -eq 0 ]]; then
    echo "  All P-checks clean."
  fi
  echo
fi

# ---- E-checks: exercise body (ex-maintainer) ----

echo "## E-checks (exercise body)"
echo

if [[ ! -f "$EXERCISE_FILE" ]]; then
  echo "  (skipped — $EXERCISE_FILE not found)"
  echo
else
  # Clip to body before <!-- maintainer -->
  BODY=$(awk '/<!-- maintainer -->/{exit} 1' "$EXERCISE_FILE")

  # E1 + E7 (overlap intentional — same root, different surfaces): vendor / value-prop leak
  e1_hits=$(printf '%s\n' "$BODY" | grep -niE 'not an? aspirational|not a vendor|\bvendor\b|not (a )?marketing|the real practitioners|unlike consultancy|grounded in actual|not theoretical|from the person running it' || true)
  if [[ -n "$e1_hits" ]]; then
    while IFS= read -r line; do
      note_sev2 "E1/E7 vendor/positioning leak: $line"
    done <<< "$e1_hits"
  fi

  # E2: pacing-theatre
  e2_hits=$(printf '%s\n' "$BODY" | grep -niE 'close the laptop|take a deep breath|take a beat|for a second|for a moment|pause and breathe|sit for [0-9]|breathe for' || true)
  if [[ -n "$e2_hits" ]]; then
    while IFS= read -r line; do
      note_sev2 "E2 pacing-theatre: $line"
    done <<< "$e2_hits"
  fi

  # E3: tease-the-payoff headers (FLAG only — list ## headings without obvious noun)
  e3_candidates=$(printf '%s\n' "$BODY" | grep -nE '^## ' || true)
  if [[ -n "$e3_candidates" ]]; then
    # Heuristic: heading is a single word, ends in '?', or is a count word
    while IFS= read -r line; do
      heading=$(echo "$line" | sed -E 's/^[0-9]+:## //')
      if [[ "$heading" == *"?" ]] || [[ $(echo "$heading" | wc -w) -le 2 ]]; then
        note_flag "E3 tease-the-payoff header candidate: $line"
      fi
    done <<< "$e3_candidates"
  fi

  # E4: cross-module artefact references — list, human verifies stable identifier
  e4_hits=$(printf '%s\n' "$BODY" | grep -niE 'from the previous module|from M[1-9]|the previous-run branch|the file you wrote in M[1-9]' || true)
  if [[ -n "$e4_hits" ]]; then
    while IFS= read -r line; do
      note_flag "E4 cross-module artefact ref (verify stable identifier in body): $line"
    done <<< "$e4_hits"
  fi

  # E5: session-open boundaries — list, human verifies working dir named
  e5_hits=$(printf '%s\n' "$BODY" | grep -niE 'open a new claude code session|start a fresh session|open claude code|open a new session' || true)
  if [[ -n "$e5_hits" ]]; then
    while IFS= read -r line; do
      note_flag "E5 session-open (verify working dir named): $line"
    done <<< "$e5_hits"
  fi

  # E6: banned words in body
  e6_hits=$(printf '%s\n' "$BODY" | grep -niE '\bhonest\b|\bdelve\b|\bsubstrate\b|\bcrucial\b|\bimportantly\b|\bsynergize\b' || true)
  if [[ -n "$e6_hits" ]]; then
    while IFS= read -r line; do
      note_sev2 "E6 banned word: $line"
    done <<< "$e6_hits"
  fi

  # E6 'leverage' as verb — heuristic: 'leverage' followed by article/possessive/noun, not 'leverage point'
  e6_lev=$(printf '%s\n' "$BODY" | grep -niE '\bleverage\b' | grep -viE 'leverage point' || true)
  if [[ -n "$e6_lev" ]]; then
    while IFS= read -r line; do
      note_sev2 "E6 'leverage' (verify verb-sense, not 'leverage point'): $line"
    done <<< "$e6_lev"
  fi

  # E6 AE101 carve-out: 'practice' (noun) banned in M1-M3. Detect from filename.
  base=$(basename "$EXERCISE_FILE" .md)
  case "$base" in
    *m1*|*m2*|*m3*|orient-and-introspect|fix-tests-first|compound-and-close|map-the-access-surface|threat-model-with-stride|author-test-strategy-skill|extract-the-task-shaping-rule|push-back-on-the-plan)
      e6_practice=$(printf '%s\n' "$BODY" | grep -niE '\bpractice\b' || true)
      if [[ -n "$e6_practice" ]]; then
        while IFS= read -r line; do
          note_sev2 "E6 'practice' (noun) banned in M1-M3: $line"
        done <<< "$e6_practice"
      fi
      ;;
  esac

  if [[ $SEV1 -eq 0 && $SEV2 -eq 0 && $FLAG -eq 0 ]]; then
    echo "  All E-checks clean."
  fi
  echo
fi

# ---- Summary ----

echo "## Summary"
echo
echo "Sev-1: $SEV1"
echo "Sev-2: $SEV2"
echo "FLAG:  $FLAG"
echo

if [[ $SEV1 -gt 0 ]]; then
  echo "Verdict: BLOCK"
  exit 1
elif [[ $SEV2 -gt 0 || $FLAG -gt 0 ]]; then
  echo "Verdict: READY-WITH-FLAGS"
  exit 0
else
  echo "Verdict: READY"
  exit 0
fi
