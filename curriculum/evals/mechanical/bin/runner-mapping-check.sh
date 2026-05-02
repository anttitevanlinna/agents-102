#!/usr/bin/env bash
# Verify a runner's phase → prompt-NNN.txt mapping is not silently swapped.
#
# Bug class this catches: a runner says "Phase 4 — look back" with body
# "Read prompt-004.txt", but prompt-004.txt's actual content is anti-brand
# work because the exercise was reordered. The slug describes one phase;
# the prompt-file numbering points at a different one.
#
# Heuristic: for each runner phase X with slug S referencing prompt-NNN.txt,
# check whether S's keywords land in the referenced prompt's content vs.
# in some OTHER extracted prompt's content. If S better matches prompt-MMM
# (M ≠ N), the runner is rotated — FAIL.
#
# Chain runners: a phase body may carry an `**Exercise:** <slug>` line
# (with or without backticks around the slug). When present, the phase is
# only checked against the exercise whose basename matches that slug. Phases
# without an Exercise line match every invocation (M1 single-exercise compat).
#
# Usage: runner-mapping-check.sh <runner.md> <exercise.md>
# Exit 0 on PASS+WARN-only, 1 on any FAIL, 2 on usage error.

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <runner.md> <exercise.md>" >&2
  exit 2
fi

RUNNER="$1"
EXERCISE="$2"

[[ -f "$RUNNER" ]]   || { echo "runner not found: $RUNNER" >&2; exit 2; }
[[ -f "$EXERCISE" ]] || { echo "exercise not found: $EXERCISE" >&2; exit 2; }

EXERCISE_SLUG=$(basename "$EXERCISE" .md)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

bash "$SCRIPT_DIR/../parse-prompts.sh" "$EXERCISE" "$TMP_DIR/prompts" >/dev/null

# Walk the runner. For each section heading of the form `### <prefix> — <slug>`
# that contains a `prompt-NNN.txt` reference in its body, emit a row.
# Recognised prefix shapes (in order tried):
#   `Phase 5`, `Phase 5a`     → numbered phase
#   `Close`, `Setup`, `Open`,
#   `Setup phase 1`, `Bridge` → unnumbered or implicit-position section
# Heading without `prompt-NNN.txt` in body is ignored (e.g. organising headers
# like `### Pre-staging notes`). Emit "N<TAB>slug<TAB>NNN<TAB>exercise_or_-".
runner_map=$(
  awk '
    /^### .+ — / {
      flush()
      heading = $0
      in_phase = 1
      body = ""
      next
    }
    /^### / {
      flush()
      in_phase = 0
      heading = ""
      body = ""
      next
    }
    in_phase { body = body "\n" $0 }
    END { flush() }
    function flush(   line, slug, num, ex, n2, lines, i, ref) {
      if (!in_phase || heading == "") return
      line = heading
      sub(/^### /, "", line)
      # Extract phase number: prefer "Phase N", else 0 (sentinel for unnumbered).
      if (match(line, /^Phase [0-9]+[a-z]?/) > 0) {
        ptag = substr(line, 1, RLENGTH)
        sub(/^Phase /, "", ptag)
        # Strip trailing letter (Phase 5a → 5)
        gsub(/[a-z]$/, "", ptag)
        num = ptag + 0
      } else {
        num = 0
      }
      sub(/^[A-Za-z]+([ ]?[0-9]+[a-z]?)? — /, "", line)
      slug = tolower(line)
      gsub(/[^a-z0-9 ]+/, " ", slug)
      gsub(/  +/, " ", slug)
      sub(/^ /, "", slug); sub(/ $/, "", slug)

      # Exercise tag — `**Exercise:** <slug>` (slug may be backtick-wrapped).
      ex = "-"
      n2 = split(body, lines, "\n")
      for (i = 1; i <= n2; i++) {
        if (match(lines[i], /\*\*Exercise:\*\*[[:space:]]+`?[a-z0-9-]+`?/) > 0) {
          tag = substr(lines[i], RSTART, RLENGTH)
          sub(/^\*\*Exercise:\*\*[[:space:]]+/, "", tag)
          gsub(/`/, "", tag)
          ex = tag
          break
        }
      }

      pn = ""
      for (i = 1; i <= n2; i++) {
        if (match(lines[i], /prompt-0*[0-9]+\.txt/) > 0) {
          ref = substr(lines[i], RSTART, RLENGTH)
          sub(/^prompt-0*/, "", ref)
          sub(/\.txt$/, "", ref)
          pn = ref + 0
          break
        }
      }
      if (pn != "") printf "%d\t%s\t%d\t%s\n", num, slug, pn, ex
    }
  ' "$RUNNER"
)

if [[ -z "$runner_map" ]]; then
  echo "FAIL — no '### Phase N — <slug>' headings with prompt-NNN.txt references found in runner."
  exit 1
fi

stopwords="the with from that this your into onto over down apply"

status=0
warns=0
checked=0
while IFS=$'\t' read -r phase slug n ex; do
  if [[ "$ex" != "-" && "$ex" != "$EXERCISE_SLUG" ]]; then
    continue
  fi
  checked=$((checked + 1))

  prompt_file="$TMP_DIR/prompts/$(printf 'prompt-%03d.txt' "$n")"
  if [[ ! -f "$prompt_file" ]]; then
    echo "FAIL — Phase $phase references prompt-$n but parse-prompts produced no such file in $EXERCISE_SLUG."
    status=1
    continue
  fi

  keywords=()
  for w in $slug; do
    [[ ${#w} -lt 4 ]] && continue
    case " $stopwords " in *" $w "*) continue ;; esac
    keywords+=("$w")
  done

  if [[ ${#keywords[@]} -eq 0 ]]; then
    echo "INFO — Phase $phase slug '$slug' has no scoreable keywords (all short or stop-word)."
    continue
  fi

  hits_here=0
  for kw in "${keywords[@]}"; do
    if grep -iqF "$kw" "$prompt_file"; then
      hits_here=$((hits_here + 1))
    fi
  done

  hits_elsewhere_max=0
  hits_elsewhere_at=""
  for other in "$TMP_DIR/prompts/"prompt-*.txt; do
    [[ "$other" == "$prompt_file" ]] && continue
    other_n=$(basename "$other" .txt | sed -E 's/prompt-0*//')
    h=0
    for kw in "${keywords[@]}"; do
      if grep -iqF "$kw" "$other"; then
        h=$((h + 1))
      fi
    done
    if (( h > hits_elsewhere_max )); then
      hits_elsewhere_max=$h
      hits_elsewhere_at=$other_n
    fi
  done

  if (( hits_here >= hits_elsewhere_max && hits_here > 0 )); then
    echo "PASS — Phase $phase ($slug) → prompt-$n: keyword match (hits_here=$hits_here, hits_elsewhere_max=$hits_elsewhere_max)."
  elif (( hits_elsewhere_max > hits_here )); then
    echo "FAIL — Phase $phase ($slug) reads prompt-$n but slug better matches prompt-$hits_elsewhere_at (hits_here=$hits_here vs hits_elsewhere=$hits_elsewhere_max). Likely phase-swap."
    status=1
  else
    echo "WARN — Phase $phase ($slug) → prompt-$n: slug keywords not in any prompt content (different framing). Manual review."
    warns=$((warns + 1))
  fi
done <<< "$runner_map"

if (( checked == 0 )); then
  echo "FAIL — runner has phases tagged for other exercises only; no phase matched $EXERCISE_SLUG."
  exit 1
fi

# Coverage check (catches phantom-phase / uncovered-prompt class of runner-rot).
# Every prompt parse-prompts.sh produced for this exercise should be referenced
# by exactly one phase tagged for this exercise (or untagged, M1-style).
referenced=$(echo "$runner_map" \
  | awk -F'\t' -v ex="$EXERCISE_SLUG" '$4 == ex || $4 == "-" { print $3 }' \
  | sort -un)
existing=$(ls "$TMP_DIR/prompts/" 2>/dev/null \
  | sed -E 's/^prompt-0*//; s/\.txt$//' \
  | sort -un)

uncovered=$(comm -23 <(echo "$existing") <(echo "$referenced") 2>/dev/null || true)
if [[ -n "$uncovered" ]]; then
  while IFS= read -r n; do
    [[ -z "$n" ]] && continue
    echo "FAIL — prompt-$n exists in $EXERCISE_SLUG but no runner phase reads it. Coverage gap (the runner is missing a phase for this prompt)."
    status=1
  done <<< "$uncovered"
fi

if [[ $status -eq 0 ]]; then
  if (( warns > 0 )); then
    echo "Verdict: READY-WITH-FLAGS — $checked phase(s) checked against $EXERCISE_SLUG, $warns slug(s) use framing not present in prompt content. Spot-check."
  else
    echo "Verdict: READY — $checked phase(s) checked against $EXERCISE_SLUG, mapping agrees, all prompts covered."
  fi
else
  echo "Verdict: BLOCK — runner-source mapping disagrees. Fix runner before dispatching Actor."
fi
exit $status
