#!/usr/bin/env bash
# Build the AE101 content tarball that the student lands at ~/Documents/ae101-content/.
#
# Output: ae101-content.tar.gz at repo root.
#
# Ships only AE101-relevant material:
#   - reference/, supplementary/ from curriculum/trainings/agentic-engineering-101/{reference,supplementary}/
#   - lectures/, exercises/ filtered to the link-reachable set from AE101 module files
#       (training files in curriculum/trainings/agentic-engineering-101/, excluding
#        trainer-only artifacts; 2-hop walk catches lectures/exercises that
#        reference each other.)
#   - content/skills/ whitelisted per AE101 training-architecture: access-control-analysis + stride
#       (agentic-nerd is the optional self-study host, ships only from a self-study target)
#   - content/pre-engagement-contract.md (template-with-defaults; per-customer overlay at deploy time)
#   - prompts/ (full registry; consuming files resolve {{prompt:<key>}} markers against this)
#
# Maintainer blocks stripped from .md content; SKILL.md files ship verbatim.
#
# Module files (curriculum/trainings/agentic-engineering-101/*.md at the dir root)
# are NOT included — those render via the customer workbook URL in browser.
# Trainer-only files (pre-cohort-todos.md, sponsor-prework.md, trainer-guide.md,
# training-architecture.md, cohort-onboarding-email.md) are never in scope.

set -euo pipefail

cd "$(dirname "$0")/.."

TRAINING="agentic-engineering-101"
TRAINING_DIR="curriculum/trainings/$TRAINING"

# Per-training skill whitelist. Sourced from training-architecture.md §Skills.
# `security-tools` carries the M3 "external skills are a supply-chain vector"
# live demo (rick-roll); see pre-cohort-todos.md "Surprise-skill live demo".
SKILLS=(access-control-analysis stride security-tools)

# Trainer-only files in the training dir — excluded from reachability walk.
TRAINER_ONLY=(
  pre-cohort-todos.md
  sponsor-prework.md
  trainer-guide.md
  training-architecture.md
  cohort-onboarding-email.md
)

# Tarball filename owned by curriculum/trainings/agentic-engineering-101/training-architecture.md
# § Material distribution. Rename there first; this line and downstream consumers follow.
OUT="ae101-content.tar.gz"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/content"
mkdir -p "$ROOT/lectures" "$ROOT/exercises" "$ROOT/reference" "$ROOT/supplementary" "$ROOT/content/skills"

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file
# is trainer-only and shouldn't ship to the agent's local context. Tarball-
# shipped .md files keep `{{prompt:<key>}}` markers verbatim — the prompt
# registry ships alongside (see prompts/ block below) and consuming skills /
# agents resolve markers against it.
strip_maintainer() {
  local src="$1"
  local dst="$2"
  awk '/<!-- maintainer -->/{exit} {print}' "$src" > "$dst"
}

copy_md_dir() {
  local src_dir="$1"
  local dst_dir="$2"
  local f base
  for f in "$src_dir"/*.md; do
    [ -f "$f" ] || continue
    base="$(basename "$f")"
    [ "$base" = "README.md" ] && continue
    strip_maintainer "$f" "$dst_dir/$base"
  done
}

# ---- Reachability walk ---------------------------------------------------
# Build the set of training source files (modules + prework, no trainer-only).
TRAINING_FIND_ARGS=(-maxdepth 1 -name '*.md')
for tof in "${TRAINER_ONLY[@]}"; do
  TRAINING_FIND_ARGS+=(! -name "$tof")
done
TRAINING_SOURCES=()
while IFS= read -r f; do
  TRAINING_SOURCES+=("$f")
done < <(find "$TRAINING_DIR" "${TRAINING_FIND_ARGS[@]}")

[ "${#TRAINING_SOURCES[@]}" -gt 0 ] || {
  echo "ERROR: no AE101 training source files found in $TRAINING_DIR" >&2
  exit 1
}

# 1-hop: links from training files into shared exercises/lectures.
extract_slugs() {
  local kind="$1"; shift
  grep -hoE "${kind}/[a-z0-9-]+\.md" "$@" 2>/dev/null \
    | sed -E "s|${kind}/||;s|\.md$||" | sort -u
}

LECTURES=$(extract_slugs lectures "${TRAINING_SOURCES[@]}")
EXERCISES=$(extract_slugs exercises "${TRAINING_SOURCES[@]}")

# 2-hop: those exercises and lectures may reference further exercises/lectures.
# Compose paths for the second walk.
SECOND_HOP=()
for s in $LECTURES;  do [ -f "curriculum/lectures/$s.md" ]  && SECOND_HOP+=("curriculum/lectures/$s.md");  done
for s in $EXERCISES; do [ -f "curriculum/exercises/$s.md" ] && SECOND_HOP+=("curriculum/exercises/$s.md"); done

if [ "${#SECOND_HOP[@]}" -gt 0 ]; then
  LECTURES_2=$(extract_slugs lectures  "${SECOND_HOP[@]}")
  EXERCISES_2=$(extract_slugs exercises "${SECOND_HOP[@]}")
  LECTURES=$(printf '%s\n%s\n' "$LECTURES" "$LECTURES_2"   | sort -u | sed '/^$/d')
  EXERCISES=$(printf '%s\n%s\n' "$EXERCISES" "$EXERCISES_2" | sort -u | sed '/^$/d')
fi

# Ship only the reachable set.
LECTURE_COUNT=0
for slug in $LECTURES; do
  src="curriculum/lectures/$slug.md"
  if [ -f "$src" ]; then
    strip_maintainer "$src" "$ROOT/lectures/$slug.md"
    LECTURE_COUNT=$((LECTURE_COUNT + 1))
  else
    echo "WARN: AE101 references lectures/$slug.md but file missing" >&2
  fi
done

EXERCISE_COUNT=0
for slug in $EXERCISES; do
  src="curriculum/exercises/$slug.md"
  if [ -f "$src" ]; then
    strip_maintainer "$src" "$ROOT/exercises/$slug.md"
    EXERCISE_COUNT=$((EXERCISE_COUNT + 1))
  else
    echo "WARN: AE101 references exercises/$slug.md but file missing" >&2
  fi
done

# ---- Reference + supplementary (already training-specific on disk) -------
copy_md_dir "$TRAINING_DIR/reference"     "$ROOT/reference"
copy_md_dir "$TRAINING_DIR/supplementary" "$ROOT/supplementary"

# ---- Skills (whitelist, not blacklist) -----------------------------------
# Skills ship verbatim; SKILL.md files don't carry maintainer blocks.
for name in "${SKILLS[@]}"; do
  src="content/skills/$name"
  if [ -d "$src" ]; then
    cp -R "$src" "$ROOT/content/skills/$name"
  else
    echo "ERROR: declared skill content/skills/$name/ not found" >&2
    exit 1
  fi
done

# ---- Pre-engagement contract --------------------------------------------
# Template-with-defaults; per-customer overlay happens at deploy time in the
# private ai-training-internal repo.
CONTRACT_SRC="content/pre-engagement-contract.md"
if [ -f "$CONTRACT_SRC" ]; then
  cp "$CONTRACT_SRC" "$ROOT/content/pre-engagement-contract.md"
fi

# ---- Prompt registry -----------------------------------------------------
# Consuming exercise / lecture / reference / supplementary files keep
# `{{prompt:<key>}}` markers; resolve against this directory at runtime.
PROMPTS_SRC="curriculum/prompts"
if [ -d "$PROMPTS_SRC" ]; then
  mkdir -p "$ROOT/prompts"
  for f in "$PROMPTS_SRC"/*.md; do
    [ -f "$f" ] || continue
    cp "$f" "$ROOT/prompts/$(basename "$f")"
  done
fi

# ---- Pack ----------------------------------------------------------------
# Run tar from inside ROOT so the archive has lectures/, exercises/, reference/,
# supplementary/, content/, prompts/ at the top level.
# Extraction: `tar xzf ae101-content.tar.gz -C ~/Documents/ae101-content`
rm -f "$OUT"
(cd "$ROOT" && tar czf "$OLDPWD/$OUT" .)

# ---- Sanity checks -------------------------------------------------------
echo "Built $OUT"
echo "  lectures shipped:      $LECTURE_COUNT (reachability-filtered from AE101 modules)"
echo "  exercises shipped:     $EXERCISE_COUNT"
echo "  reference shipped:     $(find "$ROOT/reference"     -name '*.md' | wc -l | tr -d ' ')"
echo "  supplementary shipped: $(find "$ROOT/supplementary" -name '*.md' | wc -l | tr -d ' ')"
echo "  skills shipped:        $(find "$ROOT/content/skills" -name 'SKILL.md' | wc -l | tr -d ' ')"
echo
echo "Top-level entries:"
tar tzf "$OUT" | awk -F/ 'NF>1 && $2 != "" {print $2}' | sort -u | sed 's|^|  |'
echo

# Spot-check that key load-bearing files made it.
EXPECTED=(
  "lectures/the-wizard-move.md"
  "exercises/compound-and-close.md"
  "reference/claude-code-for-engineers.md"
  "supplementary/clean-code-is-steering.md"
  "content/skills/access-control-analysis/SKILL.md"
  "content/skills/stride/SKILL.md"
  "content/skills/security-tools/SKILL.md"
  "content/skills/security-tools/check.sh"
  "content/pre-engagement-contract.md"
)
MISSING=()
for path in "${EXPECTED[@]}"; do
  tar tzf "$OUT" | grep -q "^\./${path}\$" || MISSING+=("$path")
done
if [ "${#MISSING[@]}" -gt 0 ]; then
  echo "ERROR — expected paths missing from archive:" >&2
  for p in "${MISSING[@]}"; do echo "  $p" >&2; done
  exit 1
fi

# Spot-check that foreign material (Agents-101 ports) did NOT slip in.
FORBIDDEN=(
  "lectures/agent-loop-raw.md"            # Agents-101 introductory lecture
  "exercises/raw-llm.md"                  # Agents-101 introductory exercise
  "supplementary/what-is-an-agent.md"     # moved to Agents-101 supplementary/
  "supplementary/agent-trigger-list.md"   # Agents-101
  "reference/claude-quick-reference.md"   # Agents-101
  "content/skills/agentic-nerd/SKILL.md"  # self-study only
)
LEAKS=()
for path in "${FORBIDDEN[@]}"; do
  tar tzf "$OUT" | grep -q "^\./${path}\$" && LEAKS+=("$path")
done
if [ "${#LEAKS[@]}" -gt 0 ]; then
  echo "ERROR — foreign Agents-101 / self-study material leaked into AE101 tarball:" >&2
  for p in "${LEAKS[@]}"; do echo "  $p" >&2; done
  exit 1
fi

echo "Sanity checks passed."
