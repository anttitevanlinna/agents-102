#!/usr/bin/env bash
# Student-reviewer round for a take's chain: frames at 2 fps (timestamp burned in) + a reviewer brief.
#   review.sh <take> [chain]   -> prints the brief's path; hand it to a FRESH subagent ("Read <brief> and do what it says"),
#                         fix what it lists, clip.sh <take> --cut, run again. Done = the reviewer writes `great and clear`.
# The take declares what the student reads beside the video and what the reviewer must not ask for:
#   # review-text: <one line of the workbook text>        (repeat; in reading order)
#   # review-fixed: <a constraint, not a defect>          (repeat; e.g. private names never shown, a fix tried and cut)
# Each round gets its own folder and a fresh reviewer: never resume an earlier one (it anchors on its own notes).
#   review.sh --hunt <take> [chain]  -> a DEFECT HUNT instead: an editor who assumes defects exist and works a craft
#                         checklist (legibility, framing, dead time, pointer, transitions, context, continuity, text).
#                         The student round measures "can I follow it?" and passes a video with a dozen visible craft
#                         defects (2026-11-21: round 3 "great and clear", 5-10 clear mistakes left). Run the hunt BEFORE
#                         the student round; the student round is the last gate, never the only one.
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
HUNT=""; [[ "${1:-}" == --hunt ]] && { HUNT=1; shift; }
TAKE="${1:?usage: review.sh [--hunt] <take> [chain]}" T="$D/takes/$1.sh" CH="$D/out/$1-chain${2:+-$2}.mp4"
[[ -f "$T" && -f "$CH" ]] || { echo "need takes/$TAKE.sh and out/$TAKE-chain.mp4 (clip.sh $TAKE --cut)" >&2; exit 1; }
RN="$TAKE${2:+-$2}${HUNT:+-hunt}"; n=1; while [[ -e "$D/out/review/$RN-$n" ]]; do n=$((n+1)); done
R="$D/out/review/$RN-$n"; mkdir -p "$R"
ffmpeg -nostdin -v error -i "$CH" -vf "fps=2,drawtext=text='t=%{pts\:hms}':x=10:y=10:fontsize=24:fontcolor=red" "$R/f_%03d.png"
frames="$(ls "$R" | grep -c '^f_')" dur="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CH" | cut -d. -f1)"
text="$(sed -n 's/^# review-text: //p' "$T")"; fixed="$(sed -n 's/^# review-fixed: /- /p' "$T")"
[[ -n "$text" ]] || { echo "takes/$TAKE.sh has no # review-text: lines: the reviewer must see what the student reads" >&2; exit 1; }
MAP="${CH%.mp4}.map"; clipmap="$( [[ -f "$MAP" ]] && awk -F'\t' '{printf "- %s: %ss to %ss\n",$1,$2,$3}' "$MAP" )"
if [[ -n "$HUNT" ]]; then
lints="$(python3 "$D/src/lint.py" "$TAKE" 2>&1 | sed 's/^/- /' || true)"
cat > "$R/brief.md" <<EOF
You are the editor doing quality control on a short silent how-to video before it ships to students (non-technical professionals, working alone, watching on a laptop beside written steps). Your job is a DEFECT HUNT, not a pass/fail. Assume defects exist: a previous reviewer called this video clear while it still had many visible mistakes. Find every one. Nothing is "harmless": a flaw that does not stop a student still goes on the list, marked polish.

The video: $CH (about $dur s, short clips joined by 0.35 s crossfades, each cropped to one part of the app's window and centred on a white canvas). Frames at 2 fps with the time burned in red top-left (the red text is NOT part of the video): $R/f_001.png … f_$(printf '%03d' "$frames").png. Read every frame. Extract finer frames (ffmpeg -nostdin, from that .mp4 only, into $R) around every clip boundary and every click. Open nothing else under $D/out: the other files show private screen content.

Clips (chain seconds):
$clipmap

Fixed constraints (never list these):
- The operator's private names (folders, chats, files) are never shown; crops show only the app's own labels; a blurred box hides a private value on purpose.
- Silent, no captions: the workbook text beside it carries the words.
${fixed}

The workbook text beside it:

$(sed 's/^/> /' <<< "$text")

Already flagged by the mechanical lints (src/lint.py: timing from the logs, edges and text size from the clips). Do not re-list these; confirm or refute any you see, then hunt for everything else:
${lints:-- (none)}

Work the checklist on EVERY clip and EVERY boundary:
1. Legibility: the smallest text the student must read, at the video's own size on a laptop. Too small, blurry, scaled down, low contrast?
2. Framing: the crop slices through UI (half a button, a clipped menu item, a cut-off label), shows dimmed backdrop, gray or dark bands, corner notches, stray artefacts at the edges, or too much empty space around a small target.
3. Dead time: still frames with nothing happening, blank or empty screens, a hold longer than reading needs, a clip that starts long before its action.
4. Pointer: appears from nowhere, wanders, glides from off-crop, covers the text it should point at, click ring missing or late, pointer missing at the moment of a click.
5. Transitions: a crossfade that ghosts two different screens over each other, jumps in size or position between clips, the student losing where on screen they are.
6. Context: a crop so tight the student cannot tell which window, dialog or part of the screen it is (would they find it on their own screen?).
7. Continuity: a state change the student needs to see is cut (what got selected, what appeared), or the end state of one clip does not lead into the next.
8. Match with the text: wording, labels, order, a step in the text with no clip or a clip with no step.
9. Anything else a careful editor would fix.

Answer: a numbered list of defects, most severe first. Each: clip name, chain timestamp, checklist number, what is wrong (what you saw), the fix, severity (blocks | hurts | polish). Then one line: how many per severity. No verdict, no praise.
EOF
echo "$R/brief.md"; exit 0
fi
cat > "$R/brief.md" <<EOF
You are reviewing a short silent how-to video for a non-technical professional working through an AI training on their own, with no trainer. Judge whether a first-time student would understand it and be able to follow it.

The video: $CH (about $dur s, short clips with crossfades, each cropped to one part of the screen, centred on a white canvas). Frames at 2 fps, timestamp burned in red top-left (the red text is NOT part of the video): $R/f_001.png … f_$(printf '%03d' "$frames").png. Read them all, in order. For finer timing, extract more frames from that .mp4 only (ffmpeg -nostdin) into $R. Open nothing else under $D/out: the other files there show private screen content.

Fixed constraints, not defects:
- The operator's private names (folders, chats, files) are never shown; crops show only the app's own labels.
- The video is silent, no captions: the workbook text beside it carries the words.
${fixed}

The workbook text beside it (the student reads it, then watches):

$(sed 's/^/> /' <<< "$text")

Judge as that student. Per clip: what you see, what you think you are told to do, whether it is unambiguous where to click and what happens next. Watch for: clips too short to read, a click you cannot see, a jump between clips that loses your place, text too small, anything confusing or misleading, a missing step, a mismatch with the text.

Answer:
- Per-clip notes (one or two lines each, with timestamps).
- Text notes (separate; they do not decide the verdict).
- Verdict on the VIDEO: exactly \`great and clear\` ONLY if a first-time student could follow it with no confusion and you would change nothing that matters. Otherwise \`not yet\` and a numbered list of concrete fixes, most important first, each naming clip/timestamp and what to change. No invented nitpicks; no passing it to be nice.
EOF
echo "$R/brief.md"
