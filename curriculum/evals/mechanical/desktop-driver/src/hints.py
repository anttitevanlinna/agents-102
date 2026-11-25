# hints.py <take.sh> <steps.tsv> <clicks.tsv> <t0> <lag>: `# hint[step]:` lines -> `# cut[...]` lines timed from the
# take's own logs (see clip.sh). Pure: test-steps.sh covers it.
# A clip shows its step's ACTION, not its checks: it starts PRE s before the first action inside its crop (pointer move,
# press, keystroke; start=step = the step's start - pad) and, with end=done, ends TAIL s after the last one (the step's
# OCR checks and sleeps are dead time on screen). end=press (default) ends `after` s past the step's last press.
import sys, re
PRE, TAIL = 0.4, 0.8
take, stepsf, clicksf, t0f, lag = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5])
t0, ox, oy = (float(v) for v in open(t0f).read().split()[:3])
steps = {}
for l in open(stepsf):
    n, a, b = l.rstrip("\n").split("\t"); steps[n] = (float(a), float(b))
events = []   # (log seconds since t0, raw px x, raw px y, kind)
try:
    for l in open(clicksf):
        e, x, y, k = l.rstrip("\n").split("\t")
        events.append((float(e) - t0, (float(x) - ox) * 2, (float(y) - oy) * 2, k))
except FileNotFoundError: pass


def acts(a, b, crop):
    if not crop: return []
    w, h, cx, cy = crop
    return [t for t, x, y, k in events if a <= t <= b and (k == "key" or (cx <= x <= cx + w and cy <= y <= cy + h))]


for i, line in enumerate(re.findall(r"^# hint\[([^\]]+)\]: (.*)$", open(take).read(), re.M)):
    name, opts = line; o = dict(x.split("=", 1) for x in opts.split() if "=" in x)
    if name not in steps: sys.exit(f"hint[{name}]: no such step in the step log")
    a, b = steps[name]; pad = float(o.pop("pad", "0.2")); end = o.pop("end", "press"); skip = o.pop("skip", "")
    after = float(o.pop("after", "0.15")); start = o.pop("start", "action")
    crop = tuple(float(v) for v in o["crop"].split(":")[:4]) if "crop" in o else None
    act = acts(a, b, crop)
    d = [t for t, x, y, k in events if k == "down" and a <= t <= b]
    if (end == "press" or "p" in skip) and not d: sys.exit(f"hint[{name}]: no press logged inside the step")
    e = d[-1] + after if end == "press" else (min(b, act[-1] + TAIL) if act else b)
    s0 = (act[0] - PRE - lag) if (start == "action" and act) else (a - pad - lag)
    s0, e0 = max(0, s0), e - lag
    segs = f"{s0:.2f}-{e0:.2f}"
    if skip:
        # skip=A-B: seconds from the clip start; skip=pA-pB: from the step's last press (holds across re-takes)
        k0, k1 = (d[-1] - lag + float(v[1:]) if v.startswith("p") else s0 + float(v) for v in skip.split("-"))
        segs = f"{s0:.2f}-{k0:.2f},{k1:.2f}-{e0:.2f}"
    print(f"# cut[{i + 1:02d}-{name}]: {segs} " + " ".join(f"{k}={v}" for k, v in o.items()))
