#!/usr/bin/env bash
# One command from take to publishable clips.
#   clip.sh <take>            record the take, redact it, cut the clips, leak-check each, contact sheets
#   clip.sh <take> --redact   re-redact an existing recording (after editing the allowlist or the take's # redact: line)
#   clip.sh <take> --cut      re-cut from the existing redacted video (after editing # cut[...] lines; seconds, no OCR)
#   DRAFT=1 clip.sh <take> …  while iterating: redact at 10 fps (about 3x faster; raw cuts stay full rate). Every output is
#                             still leak-checked. Publish only from a run without DRAFT.
# Then: review.sh <take> (student-reviewer frames + brief).
# <take> = file name under takes/ without .sh. Outputs in out/: <take>.mov (raw, never publish), <take>.mp4 (redacted
# whole take), <take>-<name>.mp4 per cut, <take>-chain.mp4 (all cuts in order, crossfaded), *.sheet.png. The take declares, in comment lines:
#   # allow: agents-101                                               (text this take may show sharp, on top of the app
#                                                                      labels in redact-allow.txt; course names only, never a
#                                                                      name a user chose; "re:" = regex; one per line)
#   # redact: --crop ... --trim ... --blur x,y,w,h@from-to          (once; see bin/redact)
#   # show: x,y,w,h@from-to                                           (raw px; the conversation pane while it matters: text
#                                                                      there stays sharp unless it holds a real name below)
#   # cut[name]: 12.5-20.3 crop=640:400:160:255                       (one segment, optional crop of the redacted video)
#   # cut[name]: 0-12.4,20.3-31                                       (several segments, joined with a 0.3 s crossfade;
#                                                                      join=cut: a hard cut, for skipping a flash)
#   # cut[name]: 13.3-19.4 crop=670:330:1020:588 src=raw              (native-resolution crop of the raw take; only where
#                                                                      nothing private is inside the crop)
#   # chain[name]: cutA cutB                                         (optional, repeat: one video per scene)
#   options: round=R (mask a dialog's rounded corners white), hold=S (freeze the last frame S s; default 0.8),
#            scale=F (shrink a tall crop, e.g. 0.6; not with round=), mask=x:y:w:h:RRGGBB (paint a crop-px box flat,
#            e.g. a sliver of a private list at the crop edge; applied before scale), mark=x:y:w:h:T (orange outline
#            on the result from T s: points at the success state), lead=S (freeze the first frame S s: time to find the target). End a click cut ON the press-ring frame: the ring
#            lasts ~1 frame, the hold then freezes it.
# Cuts come from the redacted video, so they never need their own redaction; each is still leak-checked.
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
TAKE="${1:?usage: clip.sh <take> [--redact|--cut]}" MODE="${2:-}"
T="$D/takes/$TAKE.sh" RAW="$D/out/$TAKE.mov" MP4="$D/out/$TAKE.mp4"
[[ -f "$T" ]] || { echo "no take $T" >&2; exit 1; }
for b in click scroll ocr redact; do [[ -x "$D/bin/$b" ]] || "$D/build.sh"; done
mkdir -p "$D/out"
# The take's allowlist = the app labels (redact-allow.txt) + its own # allow: lines (course names live with the take).
ALLOW="$D/out/$TAKE.allow.txt"
{ cat "$D/redact-allow.txt"; echo; echo "# from takes/$TAKE.sh"; sed -n 's/^# allow: //p' "$T"; } > "$ALLOW"

if [[ -z "$MODE" ]]; then
  echo "== recording $TAKE (hands off)"
  bash "$T" record "$RAW"
  ( source "$D/steps.sh"; back_to_operator )
fi
# This Mac's real names, built at run time and never written to disk: folders in ~/Documents and ~/Desktop, the
# username, plus the operator's own private words in ~/.config/desktop-driver/deny.txt (people, companies; outside
# the repo). A name that is also a word of the take's allowlist ("Auto", "Open") cannot be told from the UI: skipped.
uiwords="$(grep -v -E '^(#|re:|$)' "$ALLOW" | tr ' ' '\n' | tr -d '",:?' | awk 'length($0) >= 3' | sort -u)"
deny="$( { ls ~/Documents ~/Desktop 2>/dev/null; id -un; } \
  | sed 's/\.[A-Za-z0-9]*$//' | awk 'length($0) >= 4' \
  | grep -v -x -i -F -f <(printf '%s\n' "$uiwords") | sort -u)"
[[ -f ~/.config/desktop-driver/deny.txt ]] && deny="$(printf '%s\n%s\n' "$deny" "$(grep -v '^#' ~/.config/desktop-driver/deny.txt)" | awk 'length($0) >= 4' | sort -u)"

# ---- annotate: the screen recorder draws the cursor unreliably for posted events, so when the take logged its pointer
# (out/<take>.clicks.tsv + .t0, written by rec_start), draw it: a cursor along every glide and a ring on every press.
# Cuts and redaction then read the annotated video. REC_LAG = recorder spin-up (s) between REC_T0 and frame 0.
CLICKS="$D/out/$TAKE.clicks.tsv" T0F="$D/out/$TAKE.t0" ANN="$D/out/$TAKE.ann.mov" ORIG="$RAW"
if [[ -s "$CLICKS" && -f "$T0F" && -f "$RAW" ]]; then
  if [[ ! -f "$ANN" || "$ANN" -ot "$RAW" || "$ANN" -ot "$CLICKS" || "$ANN" -ot "$0" ]]; then
    echo "== annotating the pointer from $(wc -l < "$CLICKS" | tr -d ' ') logged events"
    CMD="$D/out/$TAKE.cursor.cmd"
    RINGS="$(python3 - "$CLICKS" "$T0F" "${REC_LAG:-0.3}" "$CMD" <<'PY'
import sys
clicks, t0f, lag, cmd = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
t0, wx, wy = (float(v) for v in open(t0f).read().split())
ev = [l.rstrip("\n").split("\t") for l in open(clicks) if l.strip()]
out, rings = [], []
for e, x, y, k in ev:
    t = float(e) - t0 - lag
    if t < 0: t = 0
    X, Y = round((float(x) - wx) * 2), round((float(y) - wy) * 2)
    out.append(f"{t:.3f} overlay@cur x {X - 4}, overlay@cur y {Y - 4};")
    if k == "down":
        out.append(f"{t:.3f} overlay@ring x {X - 40}, overlay@ring y {Y - 40};"); rings.append(t)
open(cmd, "w").write("\n".join(out) + "\n")
print("+".join(f"between(t,{r:.3f},{r + 0.45:.3f})" for r in rings) or "0")
PY
)"
    ffmpeg -nostdin -v error -y -i "$RAW" -loop 1 -i "$D/bin/cursor.png" -loop 1 -i "$D/bin/ring.png" -filter_complex \
      "[0:v]sendcmd=f='$CMD'[s];[s][2:v]overlay@ring=x=-200:y=-200:shortest=1:enable='$RINGS'[r];[r][1:v]overlay@cur=x=-200:y=-200:shortest=1[v]" \
      -map "[v]" -an -c:v libx264 -crf 12 -preset veryfast -pix_fmt yuv420p "$ANN"
  fi
  RAW="$ANN"
fi

if [[ "$MODE" != --cut ]]; then
  [[ -f "$RAW" ]] || { echo "no recording $RAW" >&2; exit 1; }
  echo "== redacting"
  read -r -a OPTS <<< "$(sed -n 's/^# redact: //p' "$T")"
  while read -r sh; do [[ -n "$sh" ]] && OPTS+=(--show "$sh"); done < <(sed -n 's/^# show: //p' "$T")
  [[ -n "${DRAFT:-}" ]] && OPTS+=(--fps 10) && echo "   (draft: 10 fps)"
  [[ " ${OPTS[*]} " == *" --show "* ]] && OPTS+=(--deny <(printf '%s\n' "$deny"))
  rm -f "$D/out/$TAKE.draft"
  "$D/bin/redact" "$RAW" "$MP4" "$ALLOW" "${OPTS[@]}"
  [[ -n "${DRAFT:-}" ]] && : > "$D/out/$TAKE.draft"
fi
[[ -f "$MP4" ]] || { echo "no redacted video $MP4" >&2; exit 1; }

# ---- hints -> cut lines, timed from the logs. `# hint[step]: <cut options> [end=press|done] [pad=S] [skip=A-B]`: the
# step's clip starts at the step's start (minus pad, default 0.2) and ends on its last press (+0.03 s; end=press) or when
# the step finished (end=done). skip=A-B drops a span (s into the clip). Times from out/<take>.steps.tsv + .clicks.tsv.
HINTCUTS=""
if grep -qE '^# hint\[' "$T" && [[ -f "$D/out/$TAKE.steps.tsv" && -f "$T0F" ]]; then
  HINTCUTS="$(python3 "$D/src/hints.py" "$T" "$D/out/$TAKE.steps.tsv" "$CLICKS" "$T0F" "${REC_LAG:-0.3}")" || { echo "hint timing failed" >&2; exit 1; }
  echo "$HINTCUTS" > "$D/out/$TAKE.cuts"; echo "== $(grep -c . <<< "$HINTCUTS") hint cuts timed from the logs (out/$TAKE.cuts)"
fi

# ---- cuts. Outputs of an earlier cut list go first, so a renamed or dropped cut, or a failed run, never leaves a stale clip.
CUTLINES="$( { grep -E '^# cut\[[^]]+\]: ' "$T" || true; [[ -n "$HINTCUTS" ]] && echo "$HINTCUTS"; } )"
CUTNAMES="$(sed -nE 's/^# cut\[([^]]+)\]: .*/\1/p' <<< "$CUTLINES")"
for o in "$D/out/$TAKE"-*.mp4; do
  [[ -e "$o" ]] || continue; n="${o#"$D/out/$TAKE"-}"; n="${n%.mp4}"
  grep -qxF "$n" <<< "$CUTNAMES" || { rm -f "$o" "${o%.mp4}.sheet.png"; echo "  removed stale $(basename "$o")"; }
done
rm -f "$D/out/$TAKE-chain.mp4"
cut_one() {  # name, segments, [crop], [src: redacted|raw], [round radius px], [end hold s], [lead s], [mark filter: last segment only]
  local name="$1" segs="$2" crop="${3:-}" src="${4:-redacted}" round="${5:-}" hold="${6:-0.8}" lead="${7:-0}" markf="${8:-}" out="$D/out/$TAKE-$1.mp4" vf="" n=0 f="" prev="" off=0 len
  local in="$MP4"; [[ "$src" == raw ]] && in="${CUT_SRC:-$RAW}"; [[ -n "${CUT_OUT:-}" ]] && out="$CUT_OUT"   # raw = native resolution; only for crops with nothing private in them (leak check still runs)
  IFS=',' read -r -a S <<< "$segs"
  for s in "${S[@]}"; do
    local mk=""; (( n == ${#S[@]} - 1 )) && mk="$markf"
    f+="[0:v]trim=${s%-*}:${s#*-},setpts=PTS-STARTPTS${crop:+,$crop}$mk[s$n];"; n=$((n+1))
  done
  if (( n == 1 )); then f+="[s0]null[v0];"
  elif [[ "${JOIN:-fade}" == cut ]]; then   # hard cut: a fade over a skipped flash ghosts both screens into each other
    for ((k=0; k<n; k++)); do f+="[s$k]"; done; f+="concat=n=$n:v=1:a=0[v0];"
  else
    prev="s0"; off=0
    for ((k=1; k<n; k++)); do
      len="$(echo "${S[$((k-1))]#*-} - ${S[$((k-1))]%-*}" | bc -l)"; off="$(echo "$off + $len - 0.3" | bc -l)"
      f+="[$prev][s$k]xfade=transition=fade:duration=0.3:offset=$off[x$k];"; prev="x$k"
    done
    f+="[$prev]null[v0];"
  fi
  if [[ -n "$round" && -n "$crop" ]]; then
    # a dialog's rounded corners show the dimmed screen behind it: mask them to white so the clip is just the panel
    local cw ch R="$round"; IFS=':' read -r cw ch _ <<< "${crop#crop=}"
    f+="[v0]format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*lte(hypot(max(0,max($R-X,X-(W-1-$R))),max(0,max($R-Y,Y-(H-1-$R)))),$R)'[rv];"
    f+="color=c=white:s=${cw}x${ch}:r=60[bg];[bg][rv]overlay=shortest=1,tpad=start_mode=clone:start_duration=$lead:stop_mode=clone:stop_duration=$hold,format=yuv420p[v]"
  else
    f+="[v0]tpad=start_mode=clone:start_duration=$lead:stop_mode=clone:stop_duration=$hold[v]"   # freeze the last frame: the hint loops, the eye needs a beat on the target
  fi
  ffmpeg -nostdin -v error -y -i "$in" -filter_complex "$f" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart "$out"
  echo "  cut $name -> $out ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")s)"
}
CLIPS=("$MP4") RAWCUTS=()
while IFS= read -r line; do
  name="$(sed -E 's/^# cut\[([^]]+)\]: .*/\1/' <<< "$line")"; rest="$(sed -E 's/^# cut\[[^]]+\]: //' <<< "$line")"
  read -r segs opts <<< "$rest"; JOIN=fade crop="" src="redacted" round="" hold="" scale="" mask="" mark="" lead=""
  for o in $opts; do case "$o" in crop=*) crop="$o";; src=*) src="${o#src=}";; round=*) round="${o#round=}";; hold=*) hold="${o#hold=}";; scale=*) scale="${o#scale=}";; mask=*) mask="${o#mask=}";; mark=*) mark="${o#mark=}";; lead=*) lead="${o#lead=}";; join=*) JOIN="${o#join=}";; esac; done
  if [[ -n "$mask" && -n "$crop" ]]; then IFS=: read -r mx my mw mh mc <<< "$mask"; crop+=",format=rgb24,drawbox=x=$mx:y=$my:w=$mw:h=$mh:color=0x$mc:t=fill"; fi
  markf=""; if [[ -n "$mark" && -n "$crop" ]]; then IFS=: read -r kx ky kw kh kt <<< "$mark"; markf=",drawbox=x=$kx:y=$ky:w=$kw:h=$kh:color=0xD97757:t=5:enable='gte(t,$kt)'"; fi
  gcrop="$crop"   # the raw guard reads native size: OCR misreads scaled-down text
  [[ -n "$scale" && -n "$crop" ]] && crop+=",scale=trunc(iw*$scale/2)*2:-2" && [[ -n "$markf" ]] && { echo "cut[$name]: mark= with scale= is not supported" >&2; exit 1; }
  cut_one "$name" "$segs" "$crop" "$src" "$round" "$hold" "$lead" "$markf"; CLIPS+=("$D/out/$TAKE-$name.mp4")
  if [[ "$src" == raw ]]; then   # the guard checks the same cut from the UN-annotated recording: screen content, not our cursor
    mkdir -p "$D/out/guard"; g="$D/out/guard/$TAKE-$name.mp4"
    CUT_SRC="$ORIG" CUT_OUT="$g" cut_one "$name" "$segs" "$gcrop" "$src" "$round" 0 0 "" >/dev/null; RAWCUTS+=("$g")
  fi
done < <(grep -E '^# cut\[[^]]+\]: ' <<< "$CUTLINES" || true)

# ---- raw cuts skip redaction, so they must hold ONLY allowlisted text (stricter than the name check below):
# any text the allowlist does not cover, anyone's or not, fails the cut.
# A check passed once is not re-run on the same bytes: out/.clean/<kind>-<hash of clip + allowlist + deny list>.
# Change any of the three and the clip is checked again. The marker holds no text, only the hash in its name.
mkdir -p "$D/out/.clean"
KEYS="$( { shasum -a 256 "$ALLOW" | cut -c1-64; printf '%s\n' "$deny" | shasum -a 256 | cut -c1-64; } | tr -d '\n')"
passed() { [[ -e "$D/out/.clean/$1-$( { shasum -a 256 "$2" | cut -c1-64; echo "$KEYS"; } | shasum -a 256 | cut -c1-16)" ]]; }
mark()   { : > "$D/out/.clean/$1-$( { shasum -a 256 "$2" | cut -c1-64; echo "$KEYS"; } | shasum -a 256 | cut -c1-16)"; }
for c in "${RAWCUTS[@]+"${RAWCUTS[@]}"}"; do
  passed raw "$c" && continue
  extra="$("$D/bin/redact" "$c" /dev/null "$ALLOW" --report-only --fps 15 2>/dev/null | cut -f2 | sort -u)"
  if [[ -n "$extra" ]]; then
    echo "RAW CUT NOT CLEAN: $c shows text off the allowlist —" >&2; printf '  %s\n' "$extra" >&2
    echo "fix: tighten its crop, or cut it from the redacted video (drop src=raw)" >&2; exit 2
  fi
  mark raw "$c"
done

# ---- chains: one video per scene. `# chain[name]: cutA cutB ...` -> <take>-chain-<name>.mp4; without chain lines, every
# cut in order -> <take>-chain.mp4. Each hint centred on a white canvas, 0.35 s crossfades.
build_chain() {  # out, cut files...
  local CH="$1"; shift; local CUTS=("$@") W=0 H=0 f="" off=0 prev="" i=0 c w h len ins=()
  (( ${#CUTS[@]} > 1 )) || return 0
  for c in "${CUTS[@]}"; do
    IFS=x read -r w h <<< "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$c")"
    (( w > W )) && W=$w; (( h > H )) && H=$h
  done
  W=$(( (W + 80 + 1) / 2 * 2 )) H=$(( (H + 80 + 1) / 2 * 2 ))   # 40 px margin, even for x264
  for c in "${CUTS[@]}"; do
    ins+=(-i "$c")
    f+="[$i:v]fps=60,format=yuv420p,pad=$W:$H:(ow-iw)/2:(oh-ih)/2:white,setsar=1,settb=1/60[p$i];"; i=$((i+1))
  done
  prev="p0"
  for ((k=1; k<i; k++)); do
    len="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "${CUTS[$((k-1))]}")"
    off="$(printf '%.3f' "$(echo "$off + $len - 0.35" | bc -l)")"
    f+="[$prev][p$k]xfade=transition=fade:duration=0.35:offset=$off[c$k];"; prev="c$k"
  done
  f+="[$prev]null[v]"
  ffmpeg -nostdin -v error -y "${ins[@]}" -filter_complex "$f" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart "$CH"
  echo "  chain -> $CH (${W}x${H}, $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CH")s)"
  CLIPS+=("$CH")
}
if grep -qE '^# chain\[[^]]+\]: ' "$T"; then
  while IFS= read -r line; do
    cn="$(sed -E 's/^# chain\[([^]]+)\]: .*/\1/' <<< "$line")"; members=()
    for m in $(sed -E 's/^# chain\[[^]]+\]: //' <<< "$line"); do
      [[ -f "$D/out/$TAKE-$m.mp4" ]] || { echo "chain[$cn] names cut '$m', which has no cut line" >&2; exit 1; }
      members+=("$D/out/$TAKE-$m.mp4")
    done
    build_chain "$D/out/$TAKE-chain-$cn.mp4" "${members[@]}"
  done < <(grep -E '^# chain\[[^]]+\]: ' "$T")
else
  build_chain "$D/out/$TAKE-chain.mp4" "${CLIPS[@]:1}"
fi

# ---- leak check, every output
echo "== leak check (OCR of each clip against this Mac's real names; nothing written to disk)"
bad=0
for c in "${CLIPS[@]}"; do
  if passed leak "$c"; then echo "CLEAN $c (unchanged, checked before)"; continue; fi
  hits="$("$D/bin/redact" "$c" /dev/null "$ALLOW" --report-only --fps 15 2>/dev/null \
    | grep -i -F -f <(printf '%s\n' "$deny") || true)"
  ffmpeg -nostdin -v error -y -i "$c" -vf "fps=1/2,scale=420:-1,tile=4x4" -frames:v 1 "${c%.mp4}.sheet.png"
  if [[ -n "$hits" ]]; then
    echo "LEAK in $c —" >&2; printf '%s\n' "$hits" | cut -f2 | sort | uniq -c >&2; bad=1
  else
    echo "CLEAN $c ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$c")s)"; mark leak "$c"
  fi
done
[[ -e "$D/out/$TAKE.draft" ]] && echo "DRAFT redaction (10 fps): for iterating only; re-run clip.sh $TAKE --redact before publishing"
(( bad == 0 )) || { echo "fix: add a --blur region to the take's # redact: line, or raise --sigma; then clip.sh $TAKE --redact" >&2; exit 2; }
