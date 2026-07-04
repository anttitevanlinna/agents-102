#!/usr/bin/env bash
# Build the Agents 101 starter tarball that the student extracts into their
# already-created training directory at ~/Documents/agents-101/.
#
# Output: agents-101-starter.tar.gz at repo root.
#
# Contents (the prework-installed working material from
# curriculum/scaffolds/agents-101-starter/, maintainer blocks stripped, plus
# the canonical self-study skill from .claude/skills/self-study/SKILL.md):
#
#   prework/.keep
#   module-4/policies/*.md
#   memory/.keep
#   sources/.keep
#   agents/.keep
#   .claude/skills/self-study/SKILL.md
#   prompts/<key>.md          # only the Agents 101 marker closure, not the
#                             # whole registry — see the prompts block below
#
# No top-level wrapper directory — the tarball extracts in-place into the
# student's connected/working folder. Both runtimes use the same prompt:
#
#   curl -fsSL <CONTENT_URL> -o agents-101-starter.tar.gz
#   tar xzf agents-101-starter.tar.gz
#   rm agents-101-starter.tar.gz
#
# Code:   the shell runs in the open Claude Code session's working directory.
# Cowork: the shell runs in the connected folder. Verified 2026-04-28 that
#         /usr/bin/tar (GNU 1.34) is present and extracts cleanly into the
#         connected folder. See memory/reference_cowork_capabilities.md.

set -euo pipefail

cd "$(dirname "$0")/.."

OUT="agents-101-starter.tar.gz"
SRC="curriculum/scaffolds/agents-101-starter"
SELF_STUDY_SKILL=".claude/skills/self-study/SKILL.md"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/starter"
mkdir -p "$ROOT"

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file.
# Tarball-shipped .md files keep `{{prompt:<key>}}` markers verbatim — the
# tarball ships curriculum/prompts/ alongside, and the self-study skill teaches
# the agent how to resolve markers against that directory.
strip_maintainer() {
  local src="$1"
  local dst="$2"
  awk '/<!-- maintainer -->/{exit} {print}' "$src" > "$dst"
}

# Mirror the scaffold tree into ROOT, stripping maintainer blocks from .md.
# The self-study skill is injected from the repo-root .claude copy below, so
# scaffold-local .claude content is intentionally ignored to avoid drift.
(cd "$SRC" && find . -type d) | while read -r d; do
  case "$d" in
    ./.claude|./.claude/*) continue ;;
  esac
  mkdir -p "$ROOT/$d"
done

(cd "$SRC" && find . -type f) | while read -r f; do
  case "$f" in
    ./.claude/*) continue ;;
  esac
  src_file="$SRC/$f"
  dst_file="$ROOT/$f"
  case "$f" in
    *.md) strip_maintainer "$src_file" "$dst_file" ;;
    *)    cp "$src_file" "$dst_file" ;;
  esac
done

mkdir -p "$ROOT/.claude/skills/self-study"
strip_maintainer "$SELF_STUDY_SKILL" "$ROOT/.claude/skills/self-study/SKILL.md"

# Ship the prompts the student resolves locally via `{{prompt:<key>}}` markers.
# Ship ONLY the Agents 101 closure, not the whole ~166-file registry (finding P1):
# the wholesale copy dragged AE101 / security-IC / eval-loop prompts — the wrong
# product — into a builder-leader's day-one folder, contradicting prework's "two
# visible steps, no magic." The set is DERIVED, not hardcoded, so it can't rot:
# scan the A101 student module files, the exercises/lectures they link, and the
# files this tarball itself ships (scaffold + self-study skill) for markers, then
# ship exactly that closure. Fail-closed if a referenced prompt is missing or
# nests a marker deeper than this depth-1 walk follows.
PROMPTS_SRC="curriculum/prompts"
A101_MODULES_DIR="curriculum/trainings/agents-101"
if [ -d "$PROMPTS_SRC" ]; then
  mkdir -p "$ROOT/prompts"

  # 1. Surface to scan = student A101 module files (not trainer/arch/todos) +
  #    their linked exercises/lectures/supplementary + everything this tarball
  #    ships (scaffold .md + the self-study skill), since any shipped marker must
  #    resolve locally.
  scan_list="$(mktemp)"
  ls "$A101_MODULES_DIR"/*.md \
    | grep -vE 'training-architecture|pre-cohort-todos|trainer-guide' > "$scan_list"
  # Resolve linked exercises/lectures into a separate temp, then append — never
  # read and append the same file in one pipeline. `if` (not `&&`) so a missing
  # link can't make the loop exit nonzero under set -e/pipefail.
  links_tmp="$(mktemp)"
  while IFS= read -r m; do
    grep -hoE '\]\((exercises|lectures|supplementary)/[a-z0-9-]+\.md\)' "$m" 2>/dev/null \
      | sed -E 's/^\]\(//; s/\)$//' || true   # a module with no links: grep exits 1, not a failure
  done < "$scan_list" | sort -u | while IFS= read -r rel; do
    if [ -f "curriculum/$rel" ]; then echo "curriculum/$rel"; fi
  done > "$links_tmp"
  cat "$links_tmp" >> "$scan_list"
  rm -f "$links_tmp"
  find "$SRC" -type f -name '*.md' >> "$scan_list"
  echo "$SELF_STUDY_SKILL" >> "$scan_list"

  # 2. Extract the marker closure (depth-1; step 3 verifies no deeper nesting).
  # {{cut:key|reason}} is a cut-candidate sibling of {{prompt:key}} — still a
  # reference to `key`, so include it in the closure. Strip the optional reason.
  keys="$(sort -u "$scan_list" | while IFS= read -r f; do [ -f "$f" ] && cat "$f"; done \
    | grep -oE '\{\{(prompt|cut):[a-z0-9-]+(\|[a-z0-9-]+)?\}\}' | sed -E 's/\{\{(prompt|cut):([a-z0-9-]+)(\|[a-z0-9-]+)?\}\}/\2/' | sort -u)"
  rm -f "$scan_list"

  # 3. Ship exactly those — fail-closed on a missing registry file or a nested
  #    marker the depth-1 walk wouldn't have followed (either means the closure
  #    shipped is incomplete).
  shipped=0
  while IFS= read -r k; do
    [ -n "$k" ] || continue
    pf="$PROMPTS_SRC/$k.md"
    if [ ! -f "$pf" ]; then
      echo "ERROR — A101 references {{prompt:$k}} but $pf does not exist" >&2; exit 1
    fi
    if grep -qE '\{\{(prompt|cut):[a-z0-9-]+(\|[a-z0-9-]+)?\}\}' "$pf"; then
      echo "ERROR — $pf nests a {{prompt:}}/{{cut:}} marker; closure is deeper than depth-1 — extend the build walk" >&2; exit 1
    fi
    cp "$pf" "$ROOT/prompts/$(basename "$pf")"
    shipped=$((shipped + 1))
  done <<< "$keys"
  total=$(ls "$PROMPTS_SRC"/*.md | wc -l | tr -d ' ')
  echo "Shipped $shipped of $total registry prompts (Agents 101 closure)."
fi

# Build tarball from inside ROOT so the archive has prework/, module-4/policies/,
# memory/, sources/, agents/, .claude/ at the top level (no wrapper).
rm -f "$OUT"
(cd "$ROOT" && tar czf "$OLDPWD/$OUT" .)

# Sanity-check expected paths.
echo "Built $OUT"
echo "Top-level entries:"
tar tzf "$OUT" | awk -F/ 'NF>1 && $2 != "" {print $2}' | sort -u | sed 's|^|  |'
echo
for path in prework module-4/policies/gdpr-essentials.md module-4/policies/data-classification.md module-4/policies/ai-use-baseline.md module-4/policies/sector-rules-placeholder.md patterns/personal-to-team-patterns.md memory sources agents .claude/skills/self-study/SKILL.md; do
  if ! tar tzf "$OUT" | grep -qE "^\./?${path}(/|\$)"; then
    echo "WARNING — expected path missing: $path" >&2
    exit 1
  fi
done
echo "Expected paths present."
