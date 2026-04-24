import { isSolid, clearRect, H } from './terrain.js';

export const LEM_W = 4;
export const LEM_H = 10;

// A lemming is a tiny state machine. Keep it dumb and readable.
export function makeLemming(x, y) {
  return {
    x, y,
    dir: 1,
    state: 'fall',     // walk | fall | block | bash | dig | saved | dead
    fallDist: 0,
    timer: 0,
    id: Math.random().toString(36).slice(2, 6),
  };
}

// Is the column (x..x+LEM_W-1) solid at row y?
function groundAt(x, y) {
  for (let i = 0; i < LEM_W; i++) if (isSolid(x + i, y)) return true;
  return false;
}

// Highest solid row below feet within `limit` pixels, or -1.
function feetOnGround(l) {
  return groundAt(l.x, l.y + LEM_H);
}

function wallAhead(l) {
  // check column ahead at body height
  const ax = l.dir > 0 ? l.x + LEM_W : l.x - 1;
  for (let j = 2; j < LEM_H; j++) if (isSolid(ax, l.y + j)) return true;
  return false;
}

function blockedByBlocker(l, lemmings) {
  for (const o of lemmings) {
    if (o === l || o.state !== 'block') continue;
    const overlapY = Math.abs(o.y - l.y) < LEM_H;
    if (!overlapY) continue;
    if (l.dir > 0 && o.x >= l.x + LEM_W - 1 && o.x <= l.x + LEM_W + 2) return true;
    if (l.dir < 0 && o.x + LEM_W <= l.x + 1 && o.x + LEM_W >= l.x - 2) return true;
  }
  return false;
}

export function updateLemming(l, lemmings, exit) {
  if (l.state === 'saved' || l.state === 'dead') return;

  // Off the bottom of the world — dead.
  if (l.y > H) { l.state = 'dead'; return; }

  // Exit reached?
  if (l.x + LEM_W > exit.x && l.x < exit.x + exit.w &&
      l.y + LEM_H > exit.y && l.y < exit.y + exit.h) {
    l.state = 'saved';
    return;
  }

  if (l.state === 'block') return;

  if (l.state === 'bash') {
    l.timer++;
    if (l.timer % 3 === 0) {
      const bx = l.dir > 0 ? l.x + LEM_W : l.x - 8;
      clearRect(bx, l.y + 2, 8, LEM_H - 2);
      l.x += l.dir;
    }
    // Done when nothing solid ahead.
    if (!wallAhead(l)) { l.state = 'walk'; l.timer = 0; }
    // Need ground under us too, otherwise fall.
    if (!feetOnGround(l)) { l.state = 'fall'; l.fallDist = 0; }
    return;
  }

  if (l.state === 'dig') {
    l.timer++;
    if (l.timer % 4 === 0) {
      clearRect(l.x, l.y + LEM_H, LEM_W, 2);
      l.y += 1;
    }
    if (!groundAt(l.x, l.y + LEM_H) && !groundAt(l.x, l.y + LEM_H + 1)) {
      l.state = 'fall'; l.fallDist = 0;
    }
    return;
  }

  if (l.state === 'fall') {
    if (feetOnGround(l)) {
      l.state = 'walk';
      l.fallDist = 0;
    } else {
      l.y += 2;
      l.fallDist += 2;
    }
    return;
  }

  // walk
  if (!feetOnGround(l)) { l.state = 'fall'; l.fallDist = 0; return; }

  if (blockedByBlocker(l, lemmings)) { l.dir *= -1; return; }

  // Try a step. Handle small rises (step up 1–3 px).
  const nextX = l.x + l.dir;
  let stepped = false;
  for (let rise = 0; rise <= 3; rise++) {
    const ny = l.y - rise;
    // feet solid below at new pos?
    const feet = groundAt(nextX, ny + LEM_H);
    // body clear at new pos?
    let clear = true;
    for (let j = 0; j < LEM_H; j++) {
      if (isSolid(l.dir > 0 ? nextX + LEM_W - 1 : nextX, ny + j)) { clear = false; break; }
    }
    if (feet && clear) {
      l.x = nextX; l.y = ny; stepped = true; break;
    }
  }
  if (!stepped) l.dir *= -1;
}

export function drawLemming(ctx, l) {
  if (l.state === 'saved' || l.state === 'dead') return;
  const colors = {
    walk: '#6cf', fall: '#6cf',
    block: '#f63', bash: '#fc3', dig: '#fc3',
  };
  ctx.fillStyle = colors[l.state] || '#fff';
  ctx.fillRect(l.x, l.y, LEM_W, LEM_H);
  // little head
  ctx.fillStyle = '#0f0';
  ctx.fillRect(l.x, l.y, LEM_W, 2);
}
