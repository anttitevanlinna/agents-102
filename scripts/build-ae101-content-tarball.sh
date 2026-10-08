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
#   - content/skills/ whitelisted per AE101 training-architecture: access-control-analysis + stride + security-tools
#   - prompts/, figures/: the entries the shipped pages name (student copies of the prompts)
#   - COPYRIGHT.md and THIRD-PARTY-NOTICES.md at the root
#
# Maintainer blocks stripped from .md content; SKILL.md files ship verbatim.
#
# Module files (curriculum/trainings/agentic-engineering-101/*.md at the dir root)
# are NOT included — those render via the customer workbook URL in browser.
# Trainer-only files (pre-cohort-todos.md, trainer-modules.md,
# training-architecture.md) are never in scope.

set -euo pipefail

cd "$(dirname "$0")/.."

TRAINING="agentic-engineering-101"
TRAINING_DIR="curriculum/trainings/$TRAINING"

# Per-training skill whitelist. Sourced from training-architecture.md §Skills.
# `security-tools` carries the M3 "external skills are a supply-chain vector"
# live demo (rick-roll); design intent in curriculum/exercises/
# threat-model-with-stride.md, "M3 supply-chain easter egg" block.
SKILLS=(access-control-analysis stride security-tools)

# Trainer-only files in the training dir — excluded from reachability walk.
# Module files are never copied into the tarball, only read as link seeds, so
# the cost of seeding the walk from a maintainer file is pure warning noise —
# and a builder that cries wolf on every run is a builder whose warnings stop
# being read.
TRAINER_ONLY=(
  pre-cohort-todos.md
  trainer-modules.md
  training-architecture.md
)

# Tarball filename owned by curriculum/trainings/agentic-engineering-101/training-architecture.md
# § Material distribution. Rename there first; this line and downstream consumers follow.
# Optional arg: where to write it (a build passes its own output dir).
OUT="${1:-ae101-content.tar.gz}"
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/content"
mkdir -p "$ROOT/lectures" "$ROOT/exercises" "$ROOT/reference" "$ROOT/supplementary" "$ROOT/content/skills"

# Training key whose cut this tarball is for. Content flags resolve against its
# modules list, so the student's local copy carries one branch of each flagged
# passage, the same one their workbook page shows. Shipping the markers raw
# would put both branches in a file they open.
TRAINING_KEY="agentic-engineering-101"

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file
# is trainer-only and shouldn't ship to the agent's local context. Tarball-
# shipped .md files keep `{{prompt:<key>}}` markers verbatim — the prompt
# registry ships alongside (see prompts/ block below) and consuming skills /
# agents resolve markers against it.
# What a student of this training reads: the maintainer block cut, content
# flags resolved. Links are collected from this too, never from the raw file, so
# a maintainer-only mention cannot pull a page into the tarball.
# Slide files (`[T](slides/<id>.md)`) are inlined first: a lecture whose
# slides were cut ships to the student exactly as it read before.
student_text() {
  node scripts/read-curriculum.js "$1" | awk '/<!-- maintainer -->/{exit} {print}' \
    | node scripts/resolve-content-flags.js "$TRAINING_KEY"
}

strip_maintainer() {
  student_text "$1" > "$2"
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
  # grep exits 1 when a hop finds no links of this kind; that is a legitimate
  # empty result, not an error. Under `set -euo pipefail` an unguarded no-match
  # aborts the whole build (exposed 2026-07-05 when the M6 arc-retrospective cut
  # left the second hop with zero exercise links). Tolerate empty.
  local f
  for f in "$@"; do student_text "$f"; done \
    | grep -oE "${kind}/[a-z0-9-]+\.md" 2>/dev/null \
    | sed -E "s|${kind}/||;s|\.md$||" | sort -u || true
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

# Supplementary subfolders ship verbatim (a page's diagrams, say). copy_md_dir
# only globs *.md at top level; this picks up any subfolder a supplementary section refers to as a multi-file artefact.
for sub in "$TRAINING_DIR/supplementary"/*/; do
  [ -d "$sub" ] || continue
  cp -R "${sub%/}" "$ROOT/supplementary/"
done

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

# ---- Figures and prompts: this training's entries, no other's --------------
# Shipped pages keep `{{figure:<key>}}` and `{{prompt:<key>}}` markers and
# resolve them against figures/ and prompts/ here. Both registries hold every
# training's entries, so each ships as the closure of what the staged pages
# name, by marker or by path. A named entry with no registry file stops the
# build: the page that names it would point at nothing.
named_keys() {   # $1 = prompt | figure ; remaining args = directories to scan
  local kind="$1"; shift
  grep -rhoE "\{\{$kind:[a-z0-9-]+\}\}|${kind}s/[a-z0-9-]+\.md" "$@" 2>/dev/null \
    | sed -E "s/^\{\{$kind:([a-z0-9-]+)\}\}$/\1/; s#^${kind}s/([a-z0-9-]+)\.md\$#\1#" | sort -u
}
PAGES=("$ROOT/lectures" "$ROOT/exercises" "$ROOT/reference" "$ROOT/supplementary" "$ROOT/content")

mkdir -p "$ROOT/figures"
FIGURE_COUNT=0
while IFS= read -r k; do
  [ -n "$k" ] || continue
  src="curriculum/figures/$k.md"
  [ -f "$src" ] || { echo "ERROR: a shipped page names figure '$k' but $src does not exist" >&2; exit 1; }
  cp "$src" "$ROOT/figures/$k.md"
  FIGURE_COUNT=$((FIGURE_COUNT + 1))
done <<< "$(named_keys figure "${PAGES[@]}")"

# Prompts ship as the student's copy (scripts/student-prompt.js): the body and
# the fields that say how to run it, without the authoring record.
mkdir -p "$ROOT/prompts"
PROMPT_COUNT=0
while IFS= read -r k; do
  [ -n "$k" ] || continue
  src="curriculum/prompts/$k.md"
  [ -f "$src" ] || { echo "ERROR: a shipped page names prompt '$k' but $src does not exist" >&2; exit 1; }
  if grep -qE '\{\{prompt:[a-z0-9-]+\}\}' "$src"; then
    echo "ERROR: $src nests a {{prompt:}} marker; the closure is one level deep, extend the walk" >&2; exit 1
  fi
  node scripts/student-prompt.js "$src" > "$ROOT/prompts/$k.md"
  PROMPT_COUNT=$((PROMPT_COUNT + 1))
done <<< "$(named_keys prompt "${PAGES[@]}" "$ROOT/figures")"

# ---- Copyright notice ------------------------------------------------------
# The licence forbids removing the notice, so the archive carries one.
cp content/PAYLOAD-COPYRIGHT.md "$ROOT/COPYRIGHT.md"
# Third-party material travels with the notice its licence asks for.
cp content/THIRD-PARTY-NOTICES.md "$ROOT/THIRD-PARTY-NOTICES.md"

# ---- Pack ----------------------------------------------------------------
# Run tar from inside ROOT so the archive has lectures/, exercises/, reference/,
# supplementary/, content/, prompts/, figures/ at the top level.
# Extraction: `tar xzf ae101-content.tar.gz -C ~/Documents/ae101-content`
# Fixed mtimes and no gzip timestamp: unchanged inputs give a byte-identical
# archive, whatever the staging dir's clock said.
find "$ROOT" -exec touch -t 200001010000 {} +
rm -f "$OUT"
(cd "$ROOT" && COPYFILE_DISABLE=1 tar cf - .) | gzip -n > "$OUT"

# ---- Sanity checks -------------------------------------------------------
echo "Built $OUT"
echo "  lectures shipped:      $LECTURE_COUNT (reachability-filtered from AE101 modules)"
echo "  exercises shipped:     $EXERCISE_COUNT"
echo "  reference shipped:     $(find "$ROOT/reference"     -name '*.md' | wc -l | tr -d ' ')"
echo "  supplementary shipped: $(find "$ROOT/supplementary" -name '*.md' | wc -l | tr -d ' ')"
echo "  skills shipped:        $(find "$ROOT/content/skills" -name 'SKILL.md' | wc -l | tr -d ' ')"
echo "  prompts shipped:       $PROMPT_COUNT (named by shipped pages)"
echo "  figures shipped:       $FIGURE_COUNT"
echo
echo "Top-level entries:"
tar tzf "$OUT" | awk -F/ 'NF>1 && $2 != "" {print $2}' | sort -u | sed 's|^|  |'
echo

# Spot-check that key load-bearing files made it.
EXPECTED=(
  "lectures/the-wizard-move.md"
  "exercises/compound-and-close.md"
  "reference/prompt-anatomy.md"
  "supplementary/verification-asymmetry.md"
  "content/skills/access-control-analysis/SKILL.md"
  "content/skills/stride/SKILL.md"
  "content/skills/security-tools/SKILL.md"
  "content/skills/security-tools/check.sh"
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
)
LEAKS=()
for path in "${FORBIDDEN[@]}"; do
  tar tzf "$OUT" | grep -q "^\./${path}\$" && LEAKS+=("$path")
done
if [ "${#LEAKS[@]}" -gt 0 ]; then
  echo "ERROR — foreign Agents-101 material leaked into AE101 tarball:" >&2
  for p in "${LEAKS[@]}"; do echo "  $p" >&2; done
  exit 1
fi

echo "Sanity checks passed."
