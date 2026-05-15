#!/usr/bin/env bash
# Stage AE101 scratch from the playground seeds.
#
# Usage:
#   stage-ae101-m1.sh                                    (default: M1 layout at scratch/ae101-m1/)
#   stage-ae101-m1.sh <path>                             (custom scratch path, M1 layout)
#   stage-ae101-m1.sh <path> --module <prework|m1|m2-pushback|m3|m4|m5|m6>
#
# Module flag governs what cross-module simulated state lands on top of the base seed:
#   prework / m1 / m2-pushback / m3 / m4:  base seed + Downloads/Documents/skills stubs.
#   m5:  M4 end-state simulated — m4/<slug> branch + .claude-projects-stub/ transcript.
#   m6:  M5 end-state simulated — m4/ + m5/ branches + two transcripts + worktree at <scratch>/repo-m5.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SEED_REPO="$MECH_DIR/playgrounds/ae101-m1-seed"
SEED_CONTENT="$MECH_DIR/playgrounds/ae101-content-stub"
SCRATCH="${1:-$MECH_DIR/scratch/ae101-m1}"
MODULE="m1"

# Parse --module flag (after positional scratch path)
shift 2>/dev/null || true
while [[ $# -gt 0 ]]; do
  case "$1" in
    --module) MODULE="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 1 ;;
  esac
done

echo "stage-ae101: scratch=$SCRATCH module=$MODULE"
rm -rf "$SCRATCH"
mkdir -p "$SCRATCH"/{Downloads-stub,Documents-stub,.claude-user-stub/skills}

# ── 1. Stage the student's repo ────────────────────────────────────────────
mkdir -p "$SCRATCH/repo"
cp -R "$SEED_REPO/." "$SCRATCH/repo/"
rm -f "$SCRATCH/repo/.DS_Store" 2>/dev/null || true

cd "$SCRATCH/repo"
git init -q -b main
git config user.email "ae101-mech@bosser.local"
git config user.name "AE101 Mech"
git add -A
GIT_AUTHOR_DATE="2026-04-01T09:00:00+0000" \
GIT_COMMITTER_DATE="2026-04-01T09:00:00+0000" \
  git commit -q -m "initial commit"

sed -i.bak 's/"version": "0.3.1"/"version": "0.3.2"/' package.json 2>/dev/null || true
rm -f package.json.bak
echo "" >> README.md
echo "Internal use only. See data-platform onboarding for context." >> README.md
git add -A
GIT_AUTHOR_DATE="2026-04-10T14:00:00+0000" \
GIT_COMMITTER_DATE="2026-04-10T14:00:00+0000" \
  git commit -q -m "readme: onboarding pointer"

GIT_AUTHOR_DATE="2026-04-20T11:00:00+0000" \
GIT_COMMITTER_DATE="2026-04-20T11:00:00+0000" \
  git commit -q --allow-empty -m "wip"

cd - >/dev/null

# ── 2. Tarball + mocks (always) ────────────────────────────────────────────
TARBALL="$SCRATCH/Downloads-stub/ae101-content.tar.gz"
tar -czf "$TARBALL" -C "$SEED_CONTENT" .

mkdir -p /tmp/ae101-mocks
cp "$MECH_DIR/playgrounds/ae101-mocks/student-inputs.md" /tmp/ae101-mocks/student-inputs.md

# ── 3. Per-module simulated prior-run state ────────────────────────────────

# Helper: simulate M1+M3 artefacts (CLAUDE.local.md, memory/, ADR, skills) for M4+ baseline.
simulate_post_m3_state() {
  local repo="$1"
  cat > "$repo/CLAUDE.local.md" <<'EOF'
# Personal rules — AE101 session compound

## Rule 1: Filter nulls, not negatives
When writing an aggregation function, filter null/undefined to prevent NaN propagation. Don't drop negatives — refunds are negatives.

## Rule 2: Test names are documentation
Verb-led test names ("sum subtracts negatives") encode the contract. Test names are the first thing a teammate reads.

## Rule 3: TDD shapes intent
Tests-first on bug fixes, even one-line fixes. Forces explicit contract clarification.

## Rule 4: Loop shape — orient → fix → compound → close
Compound-engineering cycle (Klaassen). Mechanical, forces deep work.

## Rule 5: Two-pass plan read
Human push-back + agent second-pass. Approve only after both.
EOF
  echo "CLAUDE.local.md" >> "$repo/.gitignore"

  mkdir -p "$repo/.claude/memory" "$repo/.claude/skills" "$repo/docs/adr"
  echo ".claude/memory/" >> "$repo/.gitignore"

  cat > "$repo/.claude/memory/observations.md" <<'EOF'
# Observations and rules

- `sum()` originally filtered negatives by mistake. Filter nulls instead. Earned at M1.
- CSV-injection: when serialising `reason` or category strings, escape per RFC 4180. Earned at M3 ADR 0001.
- The team's tracker close-out path-3 (manual paste) is acceptable when no MCP connector exists.
EOF

  cat > "$repo/.claude/memory/decisions.md" <<'EOF'
# Decisions

- ADR 0001: encode `reason` field at CSV serialisation boundary (M3 STRIDE outcome).
EOF

  cat > "$repo/.claude/memory/quality-criteria.md" <<'EOF'
# Quality criteria

- Tests cover negative inputs on all aggregations.
- Test names verb-led.
- CSV output escaped per RFC 4180.
- ADRs in `docs/adr/` with Context / Decision / Consequences / Alternatives considered sections.
EOF

  cat > "$repo/docs/adr/0001-csv-injection-on-reason-field.md" <<'EOF'
# ADR 0001: Encode `reason` field at CSV serialisation boundary

## Context
The daily-totals export endpoint serialises adjustment records to CSV.
Embedded commas / quotes / newlines in `reason` strings become a CSV-injection vector.

## Decision
Encode the `reason` field at the serialisation boundary (escape per RFC 4180).

## Consequences
Small per-row encode cost. Protects against admin-opening-export-in-Excel triggering payloads.

## Alternatives considered
- Validate at parse time (rejected: warehouse upstream is trusted source).
- Sanitise at storage (rejected: storage is untyped).
- Output JSON (rejected: ops workflow uses Excel).
EOF
}

# Helper: simulate M4 send-off branch + stub transcript.
simulate_post_m4_state() {
  local repo="$1" scratch="$2"
  cd "$repo"

  # Create M4 send-off branch with simulated commits
  git checkout -q -b m4/dailytotalsbycategory
  GIT_AUTHOR_DATE="2026-04-25T09:00:00+0000" \
  GIT_COMMITTER_DATE="2026-04-25T09:00:00+0000" \
    git commit -q --allow-empty -m "M4 starting point"

  # Simulate the agent's work: incomplete shipping of dailyTotalsByCategory
  cat > src/cli.js <<'EOF'
#!/usr/bin/env node
// M4 send-off: scaffold for daily-totals CSV export.
// Incomplete: missing RFC 4180 escaping on category strings.

import { dailyTotalsByCategory } from './totals.js';

const args = process.argv.slice(2);
const dayIdx = args.indexOf('--export');
if (dayIdx === -1) {
  console.error('usage: cli --export <day>');
  process.exit(1);
}
const day = args[dayIdx + 1];
// TODO: load lineItems from somewhere; stub for now.
const result = dailyTotalsByCategory([], day);
for (const [cat, total] of Object.entries(result)) {
  console.log(`${cat},${total}`);  // BUG: no escaping
}
EOF

  # Append dailyTotalsByCategory to totals.js (stub)
  cat >> src/totals.js <<'EOF'

export function dailyTotalsByCategory(lineItems, day) {
  const byCat = {};
  for (const { day: d, category, amount } of lineItems) {
    if (d !== day) continue;
    byCat[category] = (byCat[category] ?? 0) + amount;
  }
  return byCat;
}
EOF

  git add -A
  GIT_AUTHOR_DATE="2026-04-25T09:25:00+0000" \
  GIT_COMMITTER_DATE="2026-04-25T09:25:00+0000" \
    git commit -q -m "M4 un-packaged send-off: CLI scaffold + dailyTotalsByCategory"

  cd - >/dev/null

  # Stub transcript at .claude-projects-stub/ (sub for ~/.claude/projects/)
  local encoded_path
  encoded_path=$(echo "$repo" | sed 's|/|-|g' | sed 's|^-||')
  local tr_dir="$scratch/.claude-projects-stub/-$encoded_path"
  mkdir -p "$tr_dir"
  cat > "$tr_dir/m4-session.jsonl" <<'EOF'
{"type":"user","message":{"role":"user","content":"Take the task we scoped end to end."}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"I'll add dailyTotalsByCategory to totals.js, then build the CLI."}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Mid-work: noticed a lint warning in totals.js. Going to clean it up first."}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Re-derived the negative-summation contract by reading totals.js. (Note: this contract is already in CLAUDE.local.md from M1.)"}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Shipped: dailyTotalsByCategory + 4 unit tests. CLI scaffold writes CSV directly. Didn't ship: README update, package.json bin entry, RFC 4180 escaping."}]}}
EOF
  echo "stage-ae101: M4 transcript stub at $tr_dir/m4-session.jsonl"
}

# Helper: simulate M5 worktree + packaged-run state.
simulate_post_m5_state() {
  local repo="$1" scratch="$2"
  local worktree="$scratch/repo-m5"

  cd "$repo"

  # Create the m5 worktree from M4 starting-point commit
  local m4_sha
  m4_sha=$(git rev-list --grep="M4 starting point" -1 m4/dailytotalsbycategory)
  git worktree add -q -b m5/dailytotalsbycategory "$worktree" "$m4_sha" 2>/dev/null || true

  cd - >/dev/null

  # Copy gitignored personal files into worktree
  cp "$repo/CLAUDE.local.md" "$worktree/CLAUDE.local.md" 2>/dev/null || true
  if [[ -d "$repo/.claude/memory" ]]; then
    mkdir -p "$worktree/.claude/memory"
    cp -R "$repo/.claude/memory/." "$worktree/.claude/memory/"
  fi

  # Simulate packaged-run shipping the right thing in the worktree
  cd "$worktree"
  cat > src/cli.js <<'EOF'
#!/usr/bin/env node
// M5 packaged re-run: shipped with RFC 4180 escaping.

import { dailyTotalsByCategory } from './totals.js';

function escapeCSV(s) {
  if (typeof s !== 'string') return String(s);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const args = process.argv.slice(2);
const dayIdx = args.indexOf('--export');
if (dayIdx === -1) {
  console.error('usage: cli --export <day>');
  process.exit(1);
}
const day = args[dayIdx + 1];
const result = dailyTotalsByCategory([], day);
for (const [cat, total] of Object.entries(result)) {
  console.log(`${escapeCSV(cat)},${total}`);
}
EOF

  # Append dailyTotalsByCategory to totals.js
  cat >> src/totals.js <<'EOF'

export function dailyTotalsByCategory(lineItems, day) {
  const byCat = {};
  for (const { day: d, category, amount } of lineItems) {
    if (d !== day) continue;
    byCat[category] = (byCat[category] ?? 0) + amount;
  }
  return byCat;
}
EOF

  # Plan, reference, verifier stubs
  mkdir -p .claude/hooks
  cat > plan.md <<'EOF'
# Plan: daily-totals CSV export (M5 packaged re-run)

## Phase 1 — dailyTotalsByCategory function
- Touched: src/totals.js
- Verifier: csv-escape-check after every commit to src/cli.js

## Phase 2 — CLI scaffold with escaping
- Touched: src/cli.js, package.json
- Verifier: csv-escape-check on cli.js commits
EOF
  cat > reference.md <<'EOF'
# Reference: daily-totals export

Scope: add CLI export command with RFC 4180-escaped CSV output.
Done means: tests green + RFC 4180 escaping on all string fields.
Relevant: ADR 0001 (CSV injection), test-strategy skill (~/.claude/skills/test-strategy/).
EOF
  cat > .claude/hooks/csv-escape-check.sh <<'EOF'
#!/usr/bin/env bash
# Smoke-test the CSV escape behaviour
out=$(echo "test,with,comma" | xargs -I{} sh -c 'echo "{}"')
echo "csv-escape-check ran"
EOF

  git add -A
  GIT_AUTHOR_DATE="2026-05-02T09:00:00+0000" \
  GIT_COMMITTER_DATE="2026-05-02T09:00:00+0000" \
    git commit -q -m "M5 packaged re-run: CLI + escaping + verifier + plan + reference"

  cd - >/dev/null

  # M5 transcript stub
  local encoded_path
  encoded_path=$(echo "$repo" | sed 's|/|-|g' | sed 's|^-||')
  local tr_dir="$scratch/.claude-projects-stub/-$encoded_path"
  cat > "$tr_dir/m5-session.jsonl" <<'EOF'
{"type":"user","message":{"role":"user","content":"Re-run the task we just packaged."}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Reading plan.md and reference. Will fire csv-escape-check on cli.js commits."}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"First commit of src/cli.js without escaping. Verifier fired and failed. Adding escapeCSV helper now."}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Verifier passes. Shipped: dailyTotalsByCategory + escape + CLI with --export + README update + package.json bin."}]}}
EOF
  echo "stage-ae101: M5 transcript stub at $tr_dir/m5-session.jsonl + worktree at $worktree"
}

case "$MODULE" in
  prework|m1|m2-pushback|m3|m4)
    # M4 baseline: add M1+M3 simulated artefacts for the audit to find.
    if [[ "$MODULE" == "m4" ]]; then
      simulate_post_m3_state "$SCRATCH/repo"
      cd "$SCRATCH/repo"
      git add -A
      GIT_AUTHOR_DATE="2026-04-22T10:00:00+0000" \
      GIT_COMMITTER_DATE="2026-04-22T10:00:00+0000" \
        git commit -q -m "M1-M3 artefacts: rules / memory / ADR"
      cd - >/dev/null
    fi
    ;;
  m5)
    # M5: base + M3 artefacts + M4 send-off branch + transcript stub.
    simulate_post_m3_state "$SCRATCH/repo"
    cd "$SCRATCH/repo"
    git add -A
    GIT_AUTHOR_DATE="2026-04-22T10:00:00+0000" \
    GIT_COMMITTER_DATE="2026-04-22T10:00:00+0000" \
      git commit -q -m "M1-M3 artefacts: rules / memory / ADR"
    cd - >/dev/null
    simulate_post_m4_state "$SCRATCH/repo" "$SCRATCH"
    ;;
  m6)
    # M6: full chain — M3 artefacts + M4 send-off + M5 worktree + both transcripts.
    simulate_post_m3_state "$SCRATCH/repo"
    cd "$SCRATCH/repo"
    git add -A
    GIT_AUTHOR_DATE="2026-04-22T10:00:00+0000" \
    GIT_COMMITTER_DATE="2026-04-22T10:00:00+0000" \
      git commit -q -m "M1-M3 artefacts: rules / memory / ADR"
    cd - >/dev/null
    simulate_post_m4_state "$SCRATCH/repo" "$SCRATCH"
    simulate_post_m5_state "$SCRATCH/repo" "$SCRATCH"
    ;;
  *)
    echo "unknown module: $MODULE (valid: prework m1 m2-pushback m3 m4 m5 m6)" >&2
    exit 1
    ;;
esac

# ── 4. Echo final shape ────────────────────────────────────────────────────
echo "stage-ae101: scratch shape:"
( cd "$SCRATCH" && find . -maxdepth 4 -not -path './repo/.git*' -not -path './repo-m5/.git*' -not -path '.' -not -name '*.jsonl' | sort | sed 's|^\./||' | head -40 )
