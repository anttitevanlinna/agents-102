#!/usr/bin/env bash
# Build the Agents 101 starter tarball that the student extracts into their
# already-created training directory at ~/Documents/agents-101/.
#
# Output: agents-101-starter.tar.gz at repo root.
#
# Contents (the prework-installed working material from
# curriculum/scaffolds/agents-101-starter/, maintainer blocks stripped):
#
#   prework/.keep
#   module-4/policies/*.md
#   memory/.keep
#   sources/.keep
#   agents/.keep
#   .claude/skills/self-study/SKILL.md
#
# No top-level wrapper directory — the tarball extracts in-place into the
# student's connected/working folder. Both runtimes use the same prompt:
#
#   curl -fsSL <CONTENT_URL> -o starter.tar.gz
#   tar xzf starter.tar.gz
#   rm starter.tar.gz
#
# Code:   the shell runs in the open Claude Code session's working directory.
# Cowork: the shell runs in the connected folder. Verified 2026-04-28 that
#         /usr/bin/tar (GNU 1.34) is present and extracts cleanly into the
#         connected folder. See memory/reference_cowork_capabilities.md.

set -euo pipefail

cd "$(dirname "$0")/.."

OUT="agents-101-starter.tar.gz"
SRC="curriculum/scaffolds/agents-101-starter"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/starter"
mkdir -p "$ROOT"

# Strip maintainer blocks: everything from `<!-- maintainer -->` to end-of-file.
strip_maintainer() {
  local src="$1"
  local dst="$2"
  awk '/<!-- maintainer -->/{exit} {print}' "$src" > "$dst"
}

# Mirror the scaffold tree into ROOT, stripping maintainer blocks from .md.
# Preserves directory structure and dotfile entries (.keep, .claude/).
(cd "$SRC" && find . -type d) | while read -r d; do
  mkdir -p "$ROOT/$d"
done

(cd "$SRC" && find . -type f) | while read -r f; do
  src_file="$SRC/$f"
  dst_file="$ROOT/$f"
  case "$f" in
    *.md) strip_maintainer "$src_file" "$dst_file" ;;
    *)    cp "$src_file" "$dst_file" ;;
  esac
done

# Build tarball from inside ROOT so the archive has prework/, module-4/policies/,
# memory/, sources/, agents/, .claude/ at the top level (no wrapper).
rm -f "$OUT"
(cd "$ROOT" && tar czf "$OLDPWD/$OUT" .)

# Sanity-check expected paths.
echo "Built $OUT"
echo "Top-level entries:"
tar tzf "$OUT" | awk -F/ 'NF>1 && $2 != "" {print $2}' | sort -u | sed 's|^|  |'
echo
for path in prework module-4/policies/gdpr-essentials.md module-4/policies/data-classification.md module-4/policies/ai-use-baseline.md module-4/policies/sector-rules-placeholder.md memory sources agents .claude/skills/self-study/SKILL.md; do
  if ! tar tzf "$OUT" | grep -qE "^\./?${path}(/|\$)"; then
    echo "WARNING — expected path missing: $path" >&2
    exit 1
  fi
done
echo "Expected paths present."
