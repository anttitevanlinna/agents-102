#!/usr/bin/env bash
# Runs a101-scenario-coverage.test.js in the self-test loop. The JS guard was
# red for the M3->M5->M6 freeze chain (three-minds-one-synthesis-4,
# hallucination-bakeoff-1-frozen/-marks/-9, eval-loop-spot-check,
# author-security-skill-guess) while `for t in tests/*.test.sh` stayed green,
# because nothing ran it; the live chain then died at M6 T1 on 2026-11-26.
# Run: bash tests/a101-scenario-coverage.test.sh
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node --test "$HERE/a101-scenario-coverage.test.js"
