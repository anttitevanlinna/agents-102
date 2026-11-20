#!/usr/bin/env bash
# Proves the privacy path fails closed and cuts never leave stale clips. Needs a recorded take on this Mac
# (out/a101-prework-add-folder.mov, which shows the operator's real folder list); skips without it. No GUI.
#   1. a raw cut over private text exits 2 (RAW CUT NOT CLEAN), and no chain is left behind
#   2. the leak check catches this Mac's real names when the "redacted" video is in fact the raw take
#   3. a clip from an earlier cut list is pruned
#   4. --show without a deny list is refused
#   5. a --show region over the whole screen still blurs this Mac's real names (the private picker list at 8-9 s)
#   6. ...and does leave other off-allowlist text sharp (so 5 is not passing on a no-op)
set -uo pipefail
D="$(cd "$(dirname "$0")" && pwd)" SRC=a101-prework-add-folder
[[ -f "$D/out/$SRC.mov" ]] || { echo "SKIP: no out/$SRC.mov on this machine"; exit 0; }
X="_selftest$$" fail=0
cleanup() { rm -f "$D/takes/$X.sh" "$D/out/$X".* "$D/out/$X"-*; }
trap cleanup EXIT
ln -s "$D/out/$SRC.mov" "$D/out/$X.mov"
check() { if eval "$2"; then echo "ok   $1"; else echo "FAIL $1"; fail=1; fi; }

# 1. raw cut over the picker's "Today" column (the operator's own recent folders), plus a stale clip to prune
ln -s "$D/out/$SRC.mp4" "$D/out/$X.mp4"
printf '# cut[a]: 2.9-3.9 crop=1340:300:966:660 src=raw mask=30:30:800:70:fcfcfc\n# cut[b]: 8.0-8.5 crop=800:500:860:470 src=raw\n' > "$D/takes/$X.sh"
: > "$D/out/$X-old-name.mp4"; : > "$D/out/$X-chain.mp4"
out="$(bash "$D/clip.sh" "$X" --cut 2>&1)"; rc=$?
check "raw cut over private text exits 2" '[[ $rc -eq 2 && "$out" == *"RAW CUT NOT CLEAN"* ]]'
check "stale clip from an earlier cut list removed" '[[ ! -e "$D/out/$X-old-name.mp4" ]]'
check "no chain left after a failed run" '[[ ! -e "$D/out/$X-chain.mp4" ]]'

# 2. the "redacted" video is the raw take: the leak check must find real names
rm -f "$D/out/$X.mp4"; ln -s "$D/out/$SRC.mov" "$D/out/$X.mp4"
printf '# cut[c]: 8.0-8.5 crop=800:500:860:470\n' > "$D/takes/$X.sh"
out="$(bash "$D/clip.sh" "$X" --cut 2>&1)"; rc=$?
check "leak check catches real names" '[[ $rc -eq 2 && "$out" == *"LEAK in"* ]]'

# 4-5. show regions: sharp text only where no real name is
deny="$( { ls ~/Documents ~/Desktop 2>/dev/null; id -un; } | sed 's/\.[A-Za-z0-9]*$//' | awk 'length($0) >= 4' \
  | grep -v -x -i -E 'agents-101|documents|desktop|downloads|projects|shared|google drive' | sort -u)"
"$D/bin/redact" "$D/out/$SRC.mov" "$D/out/$X-show.mp4" "$D/redact-allow.txt" --trim 9 --fps 10 --show 0,0,4000,4000 >/dev/null 2>&1; rc=$?
check "--show without --deny refused" '[[ $rc -ne 0 && ! -s "$D/out/$X-show.mp4" ]]'
"$D/bin/redact" "$D/out/$SRC.mov" "$D/out/$X-show.mp4" "$D/redact-allow.txt" --trim 9 --fps 10 --show 0,0,4000,4000 \
  --deny <(printf '%s\n' "$deny") >/dev/null 2>&1
hits="$("$D/bin/redact" "$D/out/$X-show.mp4" /dev/null "$D/redact-allow.txt" --report-only --fps 10 2>/dev/null | grep -i -F -f <(printf '%s\n' "$deny") || true)"
check "--show over everything still blurs real names" '[[ -s "$D/out/$X-show.mp4" && -z "$hits" ]]'
shown="$("$D/bin/redact" "$D/out/$X-show.mp4" /dev/null "$D/redact-allow.txt" --report-only --fps 10 2>/dev/null | wc -l)"
check "--show really leaves off-allowlist text sharp (else test 5 proves nothing)" '[[ $shown -gt 0 ]]'

(( fail == 0 )) && echo "ALL OK" || { echo "FAILED"; exit 1; }
