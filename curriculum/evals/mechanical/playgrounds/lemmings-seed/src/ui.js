import { SKILLS, applySkill } from './skills.js';
import { LEM_W, LEM_H } from './lemming.js';

let selected = 'bash';
const buttons = {};

export function initUI(canvas, state) {
  const skillsDiv = document.getElementById('skills');
  for (const key of Object.keys(SKILLS)) {
    const btn = document.createElement('button');
    btn.className = 'skill';
    btn.onclick = () => { selected = key; render(state); };
    skillsDiv.appendChild(btn);
    buttons[key] = btn;
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const hit = pickLemming(state.lemmings, x, y);
    if (hit && applySkill(selected, hit)) render(state);
  });

  render(state);
}

function pickLemming(lemmings, x, y) {
  // Prefer walking ones; small hit radius.
  let best = null, bestD = 14 * 14;
  for (const l of lemmings) {
    if (l.state === 'saved' || l.state === 'dead') continue;
    const cx = l.x + LEM_W / 2, cy = l.y + LEM_H / 2;
    const d = (x - cx) ** 2 + (y - cy) ** 2;
    if (d < bestD) { bestD = d; best = l; }
  }
  return best;
}

export function render(state) {
  for (const [key, btn] of Object.entries(buttons)) {
    const s = SKILLS[key];
    btn.textContent = `${s.label} (${s.count})`;
    btn.classList.toggle('active', key === selected);
    btn.disabled = s.count <= 0;
  }
  const hud = document.getElementById('hud');
  hud.innerHTML =
    `<span class="stat">Out: ${state.spawned}/${state.total}</span>` +
    `<span class="stat">Saved: ${state.saved}</span>` +
    `<span class="stat">Lost: ${state.lost}</span>` +
    `<span class="stat">Goal: ${state.goal}</span>`;
}
