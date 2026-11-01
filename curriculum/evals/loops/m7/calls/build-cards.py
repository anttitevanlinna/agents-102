#!/usr/bin/env python3
"""build-cards.py <lab-dir> <out-dir> [m4-candidates.md] [disc.blind.jsonl] — the card set for Antti's calls page.
Pair cards are blind: a/b order is seeded-random and the key goes to cards.key.json, never to the page."""
import sys, json, random, re, pathlib
lab, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
LEC, MOD, EX3 = "lectures/access-is-not-absorption.md", "trainings/agents-101/personal-to-team.md", "exercises/test-the-sharing-plan.md"
TITLES = {LEC: "Lecture: Access is not absorption", MOD: "Module 7 page", EX3: "Exercise: Test the sharing plan"}
def chunks(v, rel):
    t = (lab / v / "curriculum" / rel).read_text().split("<!-- maintainer -->")[0]
    return [((p.splitlines()[0][3:] if p.startswith("## ") else "(opening)"), p.strip()) for p in re.split(r"(?m)^(?=## )", t)]
def body(v, rel, h):
    return dict(chunks(v, rel)).get(h)
def neighbours(v, rel, h):
    cs = chunks(v, rel); i = [x[0] for x in cs].index(h)
    return (cs[i-1][1] if i > 0 else ""), (cs[i+1][1] if i + 1 < len(cs) else "")
rng = random.Random(11); cards, key = [], {}
def pair(cid, rel, h, base, var, why, judge):
    a, b = body(base, rel, h) or "", body(var, rel, h)
    if h not in dict(chunks(base, rel)):  # an inserted slide: compare without vs with
        a = ""
    before, after = neighbours(var, rel, h)
    flip = rng.random() < 0.5
    cards.append({"id": cid, "kind": "pair", "group": "Module 7 blind pairs", "where": f"{TITLES[rel]} · {h}",
                  "ask": why, "before": before, "after": after,
                  "a": b if flip else a, "b": a if flip else b})
    key[cid] = {"variant": var, "base": base, "variant_is": "a" if flip else "b", "judge": judge}

ASK_23 = "Two versions of the same slide. Pick the one you would put in front of the room, or steer."
for i, (rel, h, judge) in enumerate([
    (EX3, "Take the transferable move with you", "v3"),
    (LEC, "The job comes first, the candidate second", "v3"),
    (LEC, "You cannot share an agent", "v3"),
    (LEC, "People absorb what they already half know", "v3"),
    (LEC, "This is the interface piece", "v3"),
    (LEC, "The analysis was ready. The decision never came.", "split"),
]):
    pair(f"m7-pair-{i+1}", rel, h, "v2", "v3", ASK_23, judge)
for i, (rel, h) in enumerate([(MOD, "Debrief"), (LEC, "(opening)"), (LEC, "The one piece you don't decide")]):
    pair(f"m7-pair-{i+7}", rel, h, "v0", "v1", ASK_23 + " The judges split on this one.", "split")

# Round 2: the regenerated variant v7 (from strategy input + rules, exercises fixed) lands
# "access is not absorption" best; the taste judge splits on it. Whole lecture v4 vs v7, then
# the slides where the judge split, original (v0) vs v7.
if (lab / "v7").exists():
    lec = lambda v: (lab / v / "curriculum" / LEC).read_text().split("<!-- maintainer -->")[0].strip()
    flip = rng.random() < 0.5
    cards.append({"id": "m7-r2-lecture", "kind": "pair", "group": "Module 7 round 2", "where": "Lecture: Access is not absorption · whole lecture",
      "ask": "Two whole closing lectures. One is your current lecture after edits; the other was regenerated from your strategy input and the rules, with the exercises fixed. Which one goes in front of the room?",
      "before": "", "after": "", "a": lec("v7") if flip else lec("v4"), "b": lec("v4") if flip else lec("v7")})
    key["m7-r2-lecture"] = {"variant": "v7", "base": "v4", "variant_is": "a" if flip else "b", "judge": "story: v4 76 vs v7 75; students carry the law 3/6 vs 6/6"}
    for i, (rel, h) in enumerate([(MOD, "Big Idea"), (MOD, "Debrief"), (MOD, "Bring to Module 8"), (LEC, "(opening)"), (LEC, "Each strategy puts absorption somewhere else")]):
        pair(f"m7-r2-{i+1}", rel, h, "v0", "v7", ASK_23 + " The taste judge split on this one.", "split")
        cards[-1]["group"] = "Module 7 round 2"

SCAR = body("v2", LEC, "The analysis was ready. The decision never came.")
cards.append({"id": "scar-1-placement", "kind": "choice", "group": "Scar stories",
  "where": "Lecture: Access is not absorption · after \"This is the interface piece\"",
  "ask": "Your value-stream story, drafted from your dictation into the open Module 7 slot (12 to 18 lines, first person, no lesson line). Does it go in?",
  "text": SCAR,
  "options": ["Yes, as drafted", "Yes, and close on my line about the human principle", "Yes, and name the Workflow Architect", "Somewhere else (say where)", "Not yet"]})
cards.append({"id": "scar-2-placement", "kind": "choice", "group": "Scar stories",
  "where": "Being ahead of time (spar of 2026-10-28), not drafted",
  "ask": "Your second story, about working in a different way from everyone around you. Where should it be drafted? Guard: the tedium is yours to own; it must not put down people who spec and meet.",
  "text": "Your own lines from the spar:\n\n\"I approach all my work with agents, compounding, outcomes and broad analysis. Pretty much everyone still approaches problems by writing confluence pages. And having meetings. Drawing diagrams. I feel I've lost common language.\"\n\nThree colleagues started an agent factory in AWS. \"What's the capabilities you are building at? They say: we have few problems to solve.\"\n\n\"I have always held the prototyping approach. 10 iterations is totally fine. They get better.\"\n\n\"It sometimes feels too inefficient and tedious to take part in the slowness of humans speccing and speculating in chats and meetings.\"",
  "options": ["Draft it as the Module 1 opening", "Draft it for Module 7, beside \"people absorb what they already half know\"", "Keep it for the trainer to tell, not on a slide", "Not yet"]})

LINES = [
 ("line-unglamorous", "Slide: It reads the whole conversation every time (Module 1)", "the weird rhetoric question",
  "That's context. Unglamorous, isn't it? And yet every useful thing in this training is built on this one idea.",
  "That's context. Every useful thing in this training is built on it."),
 ("line-toy", "Lecture: Compounding (Module 2), and the same word in two more files", "calling something a student may make a \"toy\"",
  "Either one alone is a toy. A saved document with no agent is just a document. An agent with no files is a chat.",
  "A saved document with no agent is a document. An agent with no files is a chat."),
 ("line-fantasy", "Lecture: The discipline of risk (Module 4), heading", "\"both fantasy and inherited give me the biggest creeps\"",
  "## Certainty is a fantasy you inherited",
  "## Deterministic software can prove a fix"),
 ("line-old-story", "Lecture: The discipline of risk (Module 4), body under that heading", "\"puts down the historical sensible practise. It also misrepresents that to make a point.\"",
  "Software security, done well, sells you a clean story. Perimeter. Access control. Patch the bug, sign off the build, the system is secure. You've probably worked with people who live inside that story and mostly do a good job of it. The story works because classical software is deterministic (same input, same output). You can find the bug, prove you fixed it, and sleep.",
  "Classical software security works because the software is deterministic: same input, same output. You can find the bug, prove you fixed it, and sign off the build."),
 ("line-only-check", "Lecture: What just happened (Module 1), heading", "\"twists human into some weird mold. I think student would never call themselves check.\"",
  "## You were the only check in the room",
  "## The agent generated, you decided"),
]
for cid, where, objection, now, neutral in LINES:
    cards.append({"id": cid, "kind": "choice", "group": "Loaded lines you flagged", "where": where,
      "ask": f"Your objection: {objection}. Keep, cut to the neutral version, or steer.",
      "text": now, "alt": neutral,
      "options": ["Use the neutral version", "Keep as it is", "Cut it entirely", "Different wording (steer)"]})

# Module 4 rewrite candidates from the sentence-level thread (project file language/m4-rewrite-candidates.md).
M4 = pathlib.Path(sys.argv[3]) if len(sys.argv) > 3 else None
if M4 and M4.exists():
    for sec in re.split(r"(?m)^## (?=\d+\. )", M4.read_text())[1:]:
        head = sec.splitlines()[0]
        if "WITHDRAWN" in head: continue
        n, where = head.split(". ", 1)
        now = re.search(r"\*\*Now:\*\* (.+)", sec).group(1)
        said = re.findall(r"(?m)^- (cfo-sceptic|cto-builder|ingrid) \((\w+)\): (.+)$", sec)
        opts_block = sec.split("Options:", 1)[1]
        opts = [o.strip() for o in re.findall(r"(?m)^- (.+)$", opts_block)]
        note = re.search(r"(?m)^This looks like a permission beat.+$", sec)
        cards.append({"id": f"m4-cand-{n}", "kind": "choice", "group": "Module 4 sentences the simulated students skipped",
          "where": where.split(" (")[0],
          "ask": "Simulated students went dead on this sentence. Pick or steer." + (" This may be a permission beat, a kind of line you have kept before." if note else ""),
          "said": [f"{w} ({t}): {q}" for w, t, q in said[:3]],
          "text": now,
          "options": [("Cut the sentence" if o == "CUT" else "Use: " + o) for o in opts] + ["Keep as it is", "Different wording (steer)"]})

# Blind cut-or-keep pairs from the taste thread (project file agents-101-taste/disc.blind.jsonl;
# its key stays in that folder). Answers are read back by that thread from the same collection.
DISC = pathlib.Path(sys.argv[4]) if len(sys.argv) > 4 else None
if DISC and DISC.exists():
    for line in DISC.read_text().splitlines():
        d = json.loads(line); h = d["heading"]
        fix = lambda t: (h + "\n\n" + t[len(h) + 1:]) if t.startswith(h + " ") else t
        cards.append({"id": d["id"], "kind": "pair", "group": "One sentence: cut or keep",
          "where": f'{d["file"].replace("curriculum/", "")} · {h[3:]}',
          "ask": "The same section with and without one sentence. Which goes in front of the room?",
          "before": "", "after": "", "a": fix(d["a"]), "b": fix(d["b"])})

# Pairs the taste judge (v3 rules + examples) cannot call, from history (taste thread; key with
# Antti's August call stays in agents-101-taste/unsure-history.key.jsonl, scored by that thread).
for UNSURE in sorted(pathlib.Path("/mnt/project-files/agents-101-taste/").glob("unsure-*.blind.jsonl")):
    for line in UNSURE.read_text().splitlines():
        d = json.loads(line)
        cards.append({"id": d["id"], "kind": "pair", "group": "Judge unsure: which version goes in front of the room",
          "where": d["file"].replace("curriculum/", ""), "ask": ("The same slide with and without one concrete sentence (an example, number, file or command). Is losing it damage? Pick the version for the room." if "concrete" in UNSURE.name else "Two versions of the same section. The judge cannot call this one. Which is better?"),
          "before": "", "after": "", "a": d["a"], "b": d["b"]})

# Unsure pairs other threads send for the maintainer (calls/extra-pairs.jsonl: id, source, where, ask, keep, alt).
EXTRA = pathlib.Path(__file__).parent / "extra-pairs.jsonl"
if EXTRA.exists():
    for line in EXTRA.read_text().splitlines():
        d = json.loads(line); flip = rng.random() < 0.5
        cards.append({"id": d["id"], "kind": "pair", "group": "Language pairs from the sweep", "where": d["where"], "ask": d["ask"],
          "before": "", "after": "", "a": d["alt"] if flip else d["keep"], "b": d["keep"] if flip else d["alt"]})
        key[d["id"]] = {"source": d["source"], "keep_is": "b" if flip else "a"}

out.mkdir(parents=True, exist_ok=True)
(out / "cards.json").write_text(json.dumps(cards, ensure_ascii=False, indent=1))
(out / "cards.key.json").write_text(json.dumps(key, indent=1))
print(f"[cards] {len(cards)} cards → {out}")
