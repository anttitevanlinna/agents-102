#!/usr/bin/env bash
# Build the AE101 content tarball that the student lands at ~/Documents/ae101-content/.
# Replaces the older build-ae101-content-zip.sh — same contents, tar.gz format,
# stripped maintainer blocks, no top-level wrapper directory so `tar xzf -C <dir>`
# extracts cleanly.
#
# Output: agents-102-content.tar.gz at repo root.
#
# Contents (paths preserved as prework Step 4 references them):
#   lectures/          from curriculum/lectures/      (maintainer blocks stripped)
#   exercises/         from curriculum/exercises/     (maintainer blocks stripped)
#   reference/         from curriculum/reference/     (maintainer blocks stripped)
#   content/skills/    from content/skills/*          (verbatim — these are the
#                                                       student-installable skills)
#
# Module files (curriculum/trainings/agentic-engineering-101/*.md) are NOT
# included — those live on the customer workbook URL, read in browser.
# Trainer-only files (pre-cohort-todos.md, cohort-onboarding-email.md) are
# never in scope.

set -euo pipefail

cd "$(dirname "$0")/.."

OUT="agents-102-content.tar.gz"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/content"
mkdir -p "$ROOT/lectures" "$ROOT/exercises" "$ROOT/reference" "$ROOT/content/skills"

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file
# is trainer-only and shouldn't ship to Claude's local context. Renderer strips
# at render time too; this strip protects raw .md fetches.
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
    strip_maintainer "$f" "$dst_dir/$base"
  done
}

copy_md_dir curriculum/lectures   "$ROOT/lectures"
copy_md_dir curriculum/exercises  "$ROOT/exercises"
copy_md_dir curriculum/reference  "$ROOT/reference"

# Skills ship verbatim — they're the installable runtime skills, not curriculum
# prose. Maintainer blocks aren't a thing in SKILL.md files anyway.
# `agentic-nerd` is the optional self-study host skill (Teacher Claude analog);
# cohort delivery doesn't install it by default, so it's excluded here. If a
# self-study tarball variant ever lands, ship it from a separate target.
for skill in content/skills/*/; do
  skill="${skill%/}"
  name="$(basename "$skill")"
  [ "$name" = "agentic-nerd" ] && continue
  cp -R "$skill" "$ROOT/content/skills/$name"
done

# Build tarball. Run tar from inside ROOT so the archive has
# lectures/, exercises/, reference/, content/ at the top level.
# Extraction: `tar xzf agents-102-content.tar.gz -C ~/Documents/ae101-content`
rm -f "$OUT"
(cd "$ROOT" && tar czf "$OLDPWD/$OUT" .)

# Sanity-check expected paths.
echo "Built $OUT"
echo "Top-level entries:"
tar tzf "$OUT" | awk -F/ 'NF>1 && $2 != "" {print $2}' | sort -u | sed 's|^|  |'
echo
tar tzf "$OUT" | grep -E "(lectures/the-wizard-move|reference/claude-code-for-engineers|reference/mcp-and-connectors|content/skills/.*SKILL\.md)" > /dev/null || {
  echo "WARNING — expected paths not found in archive." >&2
  exit 1
}
echo "Expected paths present."
