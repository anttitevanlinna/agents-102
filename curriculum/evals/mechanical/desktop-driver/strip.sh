#!/usr/bin/env bash
# A timestamped tile strip of a crop of a take, to find a cut's frames (press ring, pressed state, landing).
#   strip.sh <take> <from> <seconds> <crop w:h:x:y> [fps=10] [raw]  -> prints the PNG path
# Default source = the REDACTED video: the strip is meant to be looked at (by a person or a model), so it must not show
# private text. `raw` (native resolution, for exact ring frames) runs the raw-cut allowlist check on the strip first and
# refuses on any off-allowlist text: a crop that is clean at the click can show private folders a frame later.
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
TAKE="${1:?usage: strip.sh <take> <from> <seconds> <crop> [fps] [raw]}" FROM="$2" LEN="$3" CROP="$4" FPS="${5:-10}" SRC="${6:-}"
T="$D/takes/$TAKE.sh" IN="$D/out/$TAKE.mp4"; [[ "$SRC" == raw ]] && IN="$D/out/$TAKE.mov"
[[ -f "$IN" ]] || { echo "no $IN" >&2; exit 1; }
OUTP="$D/out/strip/$TAKE-${FROM}s-${CROP//:/_}${SRC:+-raw}.png"; mkdir -p "$D/out/strip"
w="${CROP%%:*}" n="$(python3 -c "import math;print(max(1,math.ceil($LEN*$FPS)))")" cols="$(python3 -c "print(max(1,min($n,int(2400/max(1,min($w,600))))))")"
tw="$(python3 -c "print(min($w,600))")"
if [[ "$SRC" == raw ]]; then
  ALLOW="$(mktemp)"; { cat "$D/redact-allow.txt"; sed -n 's/^# allow: //p' "$T"; } > "$ALLOW"
  CLIP="$(mktemp).mp4"
  ffmpeg -nostdin -v error -y -ss "$FROM" -t "$LEN" -i "$IN" -vf "crop=$CROP" -an -c:v libx264 -crf 18 "$CLIP"
  extra="$("$D/bin/redact" "$CLIP" /dev/null "$ALLOW" --report-only --fps 15 2>/dev/null | cut -f2 | sort -u)"; rm -f "$ALLOW" "$CLIP"
  [[ -z "$extra" ]] || { echo "REFUSED: the raw crop shows $(wc -l <<< "$extra" | tr -d ' ') line(s) of off-allowlist text in this window; shorten it or use the redacted video" >&2; exit 2; }
fi
ffmpeg -nostdin -v error -y -ss "$FROM" -t "$LEN" -i "$IN" \
  -vf "fps=$FPS,crop=$CROP,scale=$tw:-1,drawtext=text='%{pts\:flt}':x=2:y=2:fontsize=13:fontcolor=red,tile=${cols}x$(( (n + cols - 1) / cols ))" \
  -frames:v 1 "$OUTP"
echo "$OUTP"
