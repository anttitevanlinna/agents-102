#!/usr/bin/env bash
# Scorable LLM-as-a-Judge evaluation runner
# Usage: ./scripts/eval.sh <theme> "<response>" ["<request>"]
#
# Themes:
#   a  — CTO Prompt Quality
#   b  — Editorial Quality
#   c  — Epistemic Integrity
#   d  — Curriculum Quality
#
# Examples:
#   ./scripts/eval.sh a "Klarna deployed agents handling 2.3M conversations..."
#   ./scripts/eval.sh b "$(cat continuous-research/findings/finance.md)"
#   ./scripts/eval.sh c "Agents will transform every business by 2027"
#   ./scripts/eval.sh d "$(cat curriculum/module-01-getting-going.md)"
#   ./scripts/eval.sh a "response text" "What agents work in finance?"

set -euo pipefail

# Load API key from .env if present
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
if [ -f "$PROJECT_ROOT/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$PROJECT_ROOT/.env"
  set +a
fi

if [ -z "${SCORABLE_API_KEY:-}" ]; then
  echo "Error: SCORABLE_API_KEY not set. Add it to .env or export it." >&2
  exit 1
fi

if [ $# -lt 2 ]; then
  echo "Usage: $0 <theme: a|b|c|d> <response> [request]" >&2
  exit 1
fi

THEME="$1"
RESPONSE="$2"
REQUEST="${3:-}"

# Map theme to judge ID
case "$THEME" in
  a) JUDGE_ID="6d829329-df54-4bf4-b2d7-6b16eec9753e" ;;
  b) JUDGE_ID="b1d1b71a-97ae-49c9-aa8f-8ab410085934" ;;
  c) JUDGE_ID="087dc020-fb3e-478f-9bac-f7d250fed506" ;;
  d) JUDGE_ID="1481fb79-6d72-4a71-8f51-1903ad0c6cd4" ;;
  *)
    echo "Error: Unknown theme '$THEME'. Use a, b, c, or d." >&2
    exit 1
    ;;
esac

# Use node for JSON processing (jq not available on all systems)
RESULTS_DIR="$PROJECT_ROOT/evals/results"
mkdir -p "$RESULTS_DIR"

# Pass content via env vars (not argv) to avoid node parsing `---` as a flag
export EVAL_RESPONSE="$RESPONSE"
export EVAL_REQUEST="$REQUEST"
export EVAL_JUDGE_ID="$JUDGE_ID"
export EVAL_THEME="$THEME"
export EVAL_RESULTS_DIR="$RESULTS_DIR"

node -e "
const https = require('https');

const judgeId = process.env.EVAL_JUDGE_ID;
const theme = process.env.EVAL_THEME;
const apiKey = process.env.SCORABLE_API_KEY;
const response = process.env.EVAL_RESPONSE;
const request = process.env.EVAL_REQUEST || '';

const payload = JSON.stringify(
  request ? { response, request } : { response }
);

const options = {
  hostname: 'api.scorable.ai',
  path: '/v1/judges/' + judgeId + '/execute/',
  method: 'POST',
  headers: {
    'Authorization': 'Api-Key ' + apiKey,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);

      if (result.error_code) {
        console.error('Error from Scorable API:', result.error_code);
        console.error(JSON.stringify(result, null, 2));
        process.exit(1);
      }

      const results = result.evaluator_results || [];

      console.log('=== Theme ' + theme.toUpperCase() + ' Evaluation ===');
      console.log('');

      for (const r of results) {
        console.log('[' + r.evaluator_name + '] Score: ' + r.score);
        console.log('  ' + (r.justification || '').split('\\n').join('\\n  '));
        console.log('');
      }

      const scores = results.map(r => r.score);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const low = scores.filter(s => s < 0.3).length;

      console.log('---');
      console.log('Average: ' + avg.toFixed(3) + ' (' + scores.length + ' evaluators)');
      console.log('Result: ' + (avg >= 0.7 ? 'PASS' : 'FAIL (threshold: 0.7)'));

      if (low > 0) {
        console.log('FLAGS: ' + low + ' evaluator(s) scored below 0.3');
      }

      // Save raw results
      const output = {
        theme,
        timestamp: new Date().toISOString(),
        average_score: parseFloat(avg.toFixed(3)),
        evaluator_results: results
      };

      const fs = require('fs');
      const outPath = process.env.EVAL_RESULTS_DIR + '/scorable-theme-' + theme + '-latest.json';
      fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
      console.log('');
      console.log('Raw results saved to evals/results/scorable-theme-' + theme + '-latest.json');

    } catch (e) {
      console.error('Failed to parse response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
  process.exit(1);
});

req.write(payload);
req.end();
"
