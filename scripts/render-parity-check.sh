#!/usr/bin/env bash
# Render-parity check — verify that build output stays byte-identical across
# refactors. Used during the prompts-registry refactor to assert that moving
# prompt content into curriculum/prompts/<key>.md and expanding via
# {{prompt:key}} markers produces exactly the same student-facing HTML.
#
# Modes:
#   snapshot   capture current site/clients/acme/ as baseline
#              (HTML files copied verbatim; tarballs extracted into baseline
#              tree so non-deterministic gzip headers don't trigger diffs)
#   verify     rebuild site/clients/acme/ and diff against the captured baseline
#              (exits non-zero on any difference; prints affected files)
#
# Usage:
#   scripts/render-parity-check.sh snapshot
#   scripts/render-parity-check.sh verify
#
# Baseline lives at tmp/render-parity-baseline/ (gitignored).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$ROOT/site/clients/acme"
BASELINE_DIR="$ROOT/tmp/render-parity-baseline"
CUSTOMER="acme"

# Strip inlined <script>...</script> and <style>...</style> blocks from HTML so
# we compare rendered semantic content, not bundled asset bytes. The refactor
# touches curriculum.js (the renderer) — its inline copy in every workbook will
# differ across phases; that's intentional and orthogonal to "did the rendered
# prompts/markdown change."
strip_inline_assets() {
    awk '
        /<script[^>]*>/ { in_script = 1 }
        /<style[^>]*>/  { in_style  = 1 }
        !in_script && !in_style { print }
        /<\/script>/    { in_script = 0 }
        /<\/style>/     { in_style  = 0 }
    ' "$1"
}

# Compare-friendly snapshot of $BUILD_DIR -> $1.
# HTML normalized via strip_inline_assets; .tar.gz extracted to <name>.extracted/
# so we compare contents instead of gzip bytes (which are non-deterministic).
capture() {
    local dest="$1"
    rm -rf "$dest"
    mkdir -p "$dest"

    while IFS= read -r -d '' f; do
        local rel="${f#$BUILD_DIR/}"
        local outfile="$dest/$rel"
        mkdir -p "$(dirname "$outfile")"
        case "$f" in
            *.tar.gz)
                local extract_dir="$dest/${rel}.extracted"
                mkdir -p "$extract_dir"
                tar xzf "$f" -C "$extract_dir"
                ;;
            *.html)
                strip_inline_assets "$f" > "$outfile"
                ;;
            *)
                cp "$f" "$outfile"
                ;;
        esac
    done < <(find "$BUILD_DIR" -type f -print0)
}

case "${1:-}" in
    snapshot)
        if [ ! -d "$BUILD_DIR" ]; then
            echo "ERROR: $BUILD_DIR does not exist — run build-workbook.js first" >&2
            exit 1
        fi
        echo "Capturing baseline from $BUILD_DIR ..."
        capture "$BASELINE_DIR"
        echo "Baseline saved to $BASELINE_DIR"
        echo "Files:"
        find "$BASELINE_DIR" -type f \( -name "*.html" -o -name "*.md" \) | wc -l | xargs printf "  %s files captured\n"
        ;;

    verify)
        if [ ! -d "$BASELINE_DIR" ]; then
            echo "ERROR: no baseline at $BASELINE_DIR — run 'snapshot' first" >&2
            exit 1
        fi

        echo "Rebuilding $CUSTOMER ..."
        node "$ROOT/scripts/build-workbook.js" "$CUSTOMER" all >/dev/null

        current="$ROOT/tmp/render-parity-current"
        capture "$current"

        echo "Diffing $current against $BASELINE_DIR ..."
        if diff -r --brief "$BASELINE_DIR" "$current" > "$ROOT/tmp/render-parity-diff.log" 2>&1; then
            echo "PASS: rendered output is byte-identical to baseline"
            rm -rf "$current"
            exit 0
        else
            echo "FAIL: differences detected. Summary:"
            cat "$ROOT/tmp/render-parity-diff.log"
            echo
            echo "Full per-file diffs (first 200 lines):"
            diff -r "$BASELINE_DIR" "$current" 2>&1 | head -200 || true
            echo
            echo "Baseline:  $BASELINE_DIR"
            echo "Rebuilt:   $current"
            exit 1
        fi
        ;;

    *)
        echo "Usage: $0 snapshot | verify" >&2
        exit 1
        ;;
esac
