import { buildLevel, drawTerrain, W, H } from './terrain.js';
import { makeLemming, updateLemming, drawLemming, LEM_W, LEM_H } from './lemming.js';
import { initUI, render } from './ui.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const SPAWN = { x: 40, y: 180 };
const EXIT  = { x: 598, y: 312, w: 24, h: 28 };

const state = {
  lemmings: [],
  spawned: 0,
  total: 12,
  saved: 0,
  lost: 0,
  goal: 8,
  tick: 0,
  done: false,
};

buildLevel();
initUI(canvas, state);

function spawn() {
  const l = makeLemming(SPAWN.x, SPAWN.y);
  l.dir = 1;
  state.lemmings.push(l);
  state.spawned++;
}

function step() {
  state.tick++;
  if (state.spawned < state.total && state.tick % 50 === 0) spawn();

  for (const l of state.lemmings) updateLemming(l, state.lemmings, EXIT);

  // Tally
  state.saved = state.lemmings.filter(l => l.state === 'saved').length;
  state.lost  = state.lemmings.filter(l => l.state === 'dead').length;

  draw();
  render(state);

  if (!state.done && state.spawned === state.total &&
      state.saved + state.lost === state.total) {
    state.done = true;
    const el = document.getElementById('status');
    el.textContent = state.saved >= state.goal
      ? `You saved ${state.saved}. Nice work.`
      : `Only ${state.saved} saved — needed ${state.goal}. Refresh to retry.`;
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  drawTerrain(ctx);

  // Exit door
  ctx.fillStyle = '#fc3';
  ctx.fillRect(EXIT.x, EXIT.y, EXIT.w, EXIT.h);
  ctx.fillStyle = '#222';
  ctx.fillRect(EXIT.x + 8, EXIT.y + 8, EXIT.w - 16, EXIT.h - 8);

  // Spawn marker
  ctx.fillStyle = '#f0f';
  ctx.fillRect(SPAWN.x - 2, SPAWN.y - 6, LEM_W + 4, 4);

  for (const l of state.lemmings) drawLemming(ctx, l);
}

setInterval(step, 1000 / 30);
