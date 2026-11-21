# hints.py <take.sh> <steps.tsv> <clicks.tsv> <t0> <lag>: `# hint[step]:` lines -> `# cut[...]` lines timed from the
# take's own logs (see clip.sh). Pure: test-steps.sh covers it.
import sys, re
take, stepsf, clicksf, t0f, lag = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], float(sys.argv[5])
t0 = float(open(t0f).read().split()[0])
steps = {}
for l in open(stepsf):
    n, a, b = l.rstrip("\n").split("\t"); steps[n] = (float(a), float(b))
downs = []
try:
    for l in open(clicksf):
        e, x, y, k = l.rstrip("\n").split("\t")
        if k == "down": downs.append(float(e) - t0)
except FileNotFoundError: pass
for i, line in enumerate(re.findall(r"^# hint\[([^\]]+)\]: (.*)$", open(take).read(), re.M)):
    name, opts = line; o = dict(x.split("=", 1) for x in opts.split() if "=" in x)
    if name not in steps: sys.exit(f"hint[{name}]: no such step in the step log")
    a, b = steps[name]; pad = float(o.pop("pad", "0.2")); end = o.pop("end", "press"); after = float(o.pop("after", "0.15")); skip = o.pop("skip", "")
    d = [t for t in downs if a <= t <= b]
    if (end == "press" or "p" in skip) and not d: sys.exit(f"hint[{name}]: no press logged inside the step")
    e = d[-1] + after if end == "press" else b   # default after 0.15: the press ring and pressed state show before the cut
    s0, e0 = max(0, a - pad - lag), e - lag
    segs = f"{s0:.2f}-{e0:.2f}"
    if skip:
        # skip=A-B: seconds from the clip start; skip=pA-pB: from the step's last press (holds across re-takes)
        k0, k1 = (d[-1] - lag + float(v[1:]) if v.startswith("p") else s0 + float(v) for v in skip.split("-"))
        segs = f"{s0:.2f}-{k0:.2f},{k1:.2f}-{e0:.2f}"
    print(f"# cut[{i + 1:02d}-{name}]: {segs} " + " ".join(f"{k}={v}" for k, v in o.items()))
