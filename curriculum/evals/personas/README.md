# Simulation personas

Structured participant personas for simulations that measure enjoyment and felt learnings: the live persona-student in the tmux runner, Class A reader runs (`../simulation.md`), and the sentence-level language loop. All people and companies here are fictional.

The persona-panel files in core (`skills/persona-panel/personas/`) stay where they are. They score training ideas before modules exist; these cards play participants inside a module.

## Sets

- `agents-101/`: ten Agents 101 participants (builder leaders and the people around them), plus `_shared.md`.

## How a run loads a persona

1. Prompt = `agents-101/_shared.md` + the card file, in that order.
2. Record the persona id and hash in every score: `node check-personas.js agents-101` prints both. The hash covers the shared preamble and the card together, so editing either changes it.
3. Pick the panel by purpose:
   - **Quick run (3):** `cfo-sceptic`, `ingrid`, `cto-builder`. The impatient sceptic, the motivated control, the overconfident enthusiast.
   - **Baseline run:** all ten.
4. Treat a run where every persona enjoys a module as an instrument failure until checked. `cfo-sceptic` scoring level with `ingrid` on the same module means the personas are not doing their job.

## Roster

| id | Role | AI | Stance | Why here | Learning style | Kit |
| --- | --- | --- | --- | --- | --- | --- |
| `ingrid` | VP Product Ops, Nordveil | L2 | pragmatist | chose | doer | nordveil (protagonist) |
| `hr-svp` | SVP People | L2 | pragmatist | chose | talker | nordveil |
| `cfo-sceptic` | CFO, industrial | L1 | sceptic | sent | doer, own material only | nordveil |
| `cto-builder` | CTO, scale-up | L3 | enthusiast | chose | doer, skips instructions | none |
| `legal-lead` | Head of Legal and Compliance, insurer | L2 | anxious | chose | reader | none |
| `ops-director` | Operations Director, logistics | L1 | indifferent | sent | doer | nordveil |
| `public-head` | Head of a city service unit | L1 | anxious | curious | talker | none |
| `sales-vp` | VP Sales | L2 | enthusiast, shallow | chose | half-present | nordveil |
| `founder-small` | Founder, 12-person agency | L2 | pragmatist | chose, self-paid | doer, arrives late | finnish-psychologist |
| `veteran-director` | Director, telecom | L2 | indifferent | sent | watcher | none |

Personas that can be bored: `cfo-sceptic`, `ops-director`, `veteran-director`, `sales-vp` and, on basics, `cto-builder`. Each card's `patience.checks_out_when` lists the concrete triggers.

## Kits

A card's `fits_kits` names the tmux case kits it can work in. Nordveil hosts several roles in one company; `kit_role` says which part of the company the persona owns and what their challenge is. Running a non-Ingrid persona in the Nordveil kit needs a one-page challenge seed for that role (not written yet). Personas with an empty `fits_kits` run as Class A readers until a matching kit exists.

## Card fields

`check-personas.js` fails on a card missing any of these: `id` (equals the filename), `name`, `role`, `setting`, `ai_level` (L1/L2/L3, defined in `_shared.md`), `stance`, `why_here`, `came_to_get`, `wasted_if`, `patience` (`span` + `checks_out_when`), `leans_in_when`, `learning_style`, `chat_voice` (`style` + `sample`), `misconception`, `monday` (`tries` + `blocked_by`), `fits_kits`, `kit_role`. Below the frontmatter, two short paragraphs give the portrait and the test this persona sets for a module.

## Calibration (next step)

Run each persona twice on one module. Pass: repeat runs agree within a small spread, and `cfo-sceptic` scores clearly below `ingrid`. Antti's calibration calls are designed from that run's output.
