# source curriculum/evals/loops/guard.sh [budget] — route this shell's eval calls through loops/bin/claude.
# Default budget 400 calls, counted in $EVAL_BUDGET_FILE (default: a fresh file per shell).
_g="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/bin"
case ":$PATH:" in *":$_g:"*) ;; *) export PATH="$_g:$PATH" ;; esac
export EVAL_BUDGET="${1:-${EVAL_BUDGET:-400}}" EVAL_BUDGET_FILE="${EVAL_BUDGET_FILE:-${TMPDIR:-/tmp}/eval-budget.$$.count}"
echo "[guard] eval calls lean, sonnet by default, budget $EVAL_BUDGET ($EVAL_BUDGET_FILE)" >&2
