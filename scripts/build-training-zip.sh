#!/usr/bin/env bash
# Build a hosting kit zip for a training.
#
# The customer's IT team extracts the zip and hosts the contents on any
# auth-aware static host (corporate intranet, SharePoint, Cloudflare Access,
# Netlify Identity, etc.). Students arrive at the hosted URL.
#
# Includes the site renderer (curriculum.html + CSS), the chosen training's
# module files (trainer-only files excluded), and only the
# lectures/exercises/reference/supplementary files actually referenced by the
# training (transitive scan). Maintainer blocks are stripped from every .md.
# DEFAULT_TRAINING is patched in the renderer copy so the home page lands on
# the chosen training.
#
# Usage: scripts/build-training-zip.sh <training-key>
# Where <training-key> is either: bootstrap | agentic-engineering-101
#
# Output: agents-102-<training-key>-hosting-kit.zip at repo root.

set -euo pipefail

TRAINING="${1:-}"
case "$TRAINING" in
  bootstrap|agentic-engineering-101) ;;
  *)
    echo "Usage: $0 <bootstrap|agentic-engineering-101>" >&2
    exit 1
    ;;
esac

cd "$(dirname "$0")/.."

OUT="agents-102-${TRAINING}-hosting-kit.zip"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/agents-102-${TRAINING}-hosting-kit"

# Files in curriculum/trainings/<key>/ to exclude — trainer-only.
EXCLUDE_TRAINER_FILES=("pre-cohort-todos.md" "cohort-onboarding-email.md")

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file.
# Renderer already strips at render time; strip in source too so direct-URL
# fetches don't expose trainer-only content.
strip_maintainer() {
  local src="$1"
  local dst="$2"
  awk '/<!-- maintainer -->/{exit} {print}' "$src" > "$dst"
}

# --- Site renderer + CSS -----------------------------------------------------
mkdir -p "$ROOT/site/layouts"
cp site/curriculum.html "$ROOT/site/curriculum.html"
cp site/layouts/curriculum.css "$ROOT/site/layouts/curriculum.css"

# Patch DEFAULT_TRAINING so the index lands on the chosen training
perl -i -pe "s|var DEFAULT_TRAINING = '[^']+';|var DEFAULT_TRAINING = '${TRAINING}';|" \
  "$ROOT/site/curriculum.html"

# --- Index redirector --------------------------------------------------------
cat > "$ROOT/index.html" <<EOF
<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=site/curriculum.html?training=${TRAINING}">
<title>Agents 102 — ${TRAINING}</title>
<p><a href="site/curriculum.html?training=${TRAINING}">Open the training</a></p>
EOF

# --- Training module files (with maintainer stripped, trainer-only excluded)
mkdir -p "$ROOT/curriculum/trainings/$TRAINING"
for src in curriculum/trainings/$TRAINING/*.md; do
  base="$(basename "$src")"
  skip=0
  for ex in "${EXCLUDE_TRAINER_FILES[@]}"; do
    [ "$base" = "$ex" ] && skip=1 && break
  done
  [ "$skip" = "1" ] && continue
  strip_maintainer "$src" "$ROOT/curriculum/trainings/$TRAINING/$base"
done

# --- Transitive scan: copy only referenced lectures/exercises/reference/supplementary
mkdir -p "$ROOT/curriculum/lectures" \
         "$ROOT/curriculum/exercises" \
         "$ROOT/curriculum/reference" \
         "$ROOT/curriculum/supplementary"

# BFS: starting from training module files, find every kind/slug.md referenced,
# copy it, then scan its body for further references. Stop when no new files surface.
# (Avoid bash 4 associative arrays — macOS ships bash 3.2 by default. Use a seen-file.)
SEEN_FILE="$STAGE/.seen"
: > "$SEEN_FILE"
QUEUE_FILE="$STAGE/.queue"
ls curriculum/trainings/$TRAINING/*.md > "$QUEUE_FILE"

while [ -s "$QUEUE_FILE" ]; do
  NEXT_FILE="$STAGE/.next"
  : > "$NEXT_FILE"
  while IFS= read -r f; do
    grep -qxF "$f" "$SEEN_FILE" && continue
    echo "$f" >> "$SEEN_FILE"
    refs=$(grep -hoE "(lectures|exercises|reference|supplementary)/[a-z0-9-]+\.md" "$f" 2>/dev/null | sort -u || true)
    for ref in $refs; do
      target="curriculum/$ref"
      if [ -f "$target" ] && ! grep -qxF "$target" "$SEEN_FILE"; then
        dest="$ROOT/curriculum/$ref"
        mkdir -p "$(dirname "$dest")"
        strip_maintainer "$target" "$dest"
        echo "$target" >> "$NEXT_FILE"
      fi
    done
  done < "$QUEUE_FILE"
  mv "$NEXT_FILE" "$QUEUE_FILE"
done

# --- Copyright + license -----------------------------------------------------
cp COPYRIGHT.md "$ROOT/COPYRIGHT.md"

# --- Zip ---------------------------------------------------------------------
rm -f "$OUT"
(cd "$STAGE" && zip -qr "$OLDPWD/$OUT" "agents-102-${TRAINING}")

# --- Report ------------------------------------------------------------------
echo "Built $OUT"
echo
echo "Contents (top-level):"
unzip -l "$OUT" | awk 'NR>3 && NF>=4 {print $4}' | awk -F/ '{print $2}' | sort -u | sed '/^$/d' | sed 's|^|  |'
echo
echo "Markdown file count:"
unzip -l "$OUT" | grep -cE "\.md$" | sed 's|^|  |'
echo
echo "Open by extracting and serving the folder over HTTP, or by clicking index.html."
echo "Local serve example: cd agents-102-${TRAINING} && python3 -m http.server 8000"
