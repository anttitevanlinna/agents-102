#!/bin/bash
# Fetch GitHub traffic data and append to log.
# GitHub only keeps 14 days — run this at least weekly to avoid data loss.
#
# Usage: ./analytics/fetch-traffic.sh
# Requires: gh CLI authenticated with repo access

REPO="anttitevanlinna/agents-102"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG="$SCRIPT_DIR/traffic-log.jsonl"

SNAPSHOT=$(gh api "repos/$REPO/traffic/clones" 2>/dev/null)
if [ $? -ne 0 ]; then
  echo "Error: could not fetch traffic data. Is gh authenticated?"
  exit 1
fi

FETCH_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Extract daily entries and append only new ones
echo "$SNAPSHOT" | python3 -c "
import json, sys

snapshot = json.load(sys.stdin)
fetch_time = '$FETCH_TIME'
log_file = '$LOG'

# Load existing dates
existing_dates = set()
try:
    with open(log_file, 'r') as f:
        for line in f:
            entry = json.loads(line)
            existing_dates.add(entry.get('date'))
except FileNotFoundError:
    pass

# Append new daily entries
added = 0
with open(log_file, 'a') as f:
    for day in snapshot.get('clones', []):
        date = day['timestamp'][:10]
        if date not in existing_dates:
            entry = {
                'date': date,
                'clones': day['count'],
                'uniques': day['uniques'],
                'fetched': fetch_time
            }
            f.write(json.dumps(entry) + '\n')
            added += 1

print(f'Added {added} new daily entries to {log_file}')
print(f'Total period: {snapshot[\"count\"]} clones, {snapshot[\"uniques\"]} unique')
"
