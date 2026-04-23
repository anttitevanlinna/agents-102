#!/usr/bin/env bash
# Build the AE101 content folder zip that students unpack during prework.
# Output: agents-102-content-agentic-engineering-101.zip at repo root.
#
# Contents (paths preserved as the prompts reference them):
#   lectures/          from curriculum/lectures/
#   exercises/         from curriculum/exercises/
#   prework.md         from curriculum/trainings/agentic-engineering-101/prework.md
#   reference/         from curriculum/reference/
#   content/skills/    from content/skills/{access-control-analysis,stride}/

set -euo pipefail

cd "$(dirname "$0")/.."

OUT="agents-102-content-agentic-engineering-101.zip"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

ROOT="$STAGE/agents-102-content-agentic-engineering-101"
mkdir -p "$ROOT/content/skills"

cp -R curriculum/lectures                                        "$ROOT/lectures"
cp -R curriculum/exercises                                       "$ROOT/exercises"
cp    curriculum/trainings/agentic-engineering-101/prework.md    "$ROOT/prework.md"
cp -R curriculum/reference                                       "$ROOT/reference"
cp -R content/skills/access-control-analysis                     "$ROOT/content/skills/"
cp -R content/skills/stride                                      "$ROOT/content/skills/"

rm -f "$OUT"
(cd "$STAGE" && zip -qr "$OLDPWD/$OUT" "agents-102-content-agentic-engineering-101")

echo "Built $OUT"
echo "Verify paths the prompts reference:"
unzip -l "$OUT" | grep -E "(lectures/the-wizard-move|reference/claude-code-for-engineers|reference/mcp-and-connectors|content/skills/.*/SKILL)" || {
  echo "WARNING — expected paths not found in archive." >&2
  exit 1
}
