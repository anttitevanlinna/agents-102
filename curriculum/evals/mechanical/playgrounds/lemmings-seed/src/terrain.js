// Pixel-grid destructible terrain. 1 byte per pixel, 1 = solid.

export const W = 640;
export const H = 400;

const solid = new Uint8Array(W * H);
const buf = document.createElement('canvas');
buf.width = W; buf.height = H;
const bctx = buf.getContext('2d');

function fillRect(x, y, w, h, color) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      if (i >= 0 && i < W && j >= 0 && j < H) solid[j * W + i] = 1;
    }
  }
  bctx.fillStyle = color;
  bctx.fillRect(x, y, w, h);
}

export function buildLevel() {
  solid.fill(0);
  bctx.clearRect(0, 0, W, H);

  // Upper platform — lemmings spawn here, walk right, fall off.
  fillRect(0, 195, 280, 8, '#6a4');

  // Lower-left pad — landing zone if they turn back into the pit is fatal.
  fillRect(0, 340, 200, 60, '#6a4');

  // Death pit from x=200..260 (empty)

  // Lower-right pad — main landing zone after the drop.
  fillRect(260, 340, 380, 60, '#6a4');

  // The wall between them and the exit. Must bash through.
  fillRect(480, 250, 30, 90, '#a76');
}

export function isSolid(x, y) {
  x |= 0; y |= 0;
  if (x < 0 || x >= W || y < 0 || y >= H) return false;
  return solid[y * W + x] === 1;
}

export function clearPixel(x, y) {
  x |= 0; y |= 0;
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  if (solid[y * W + x]) {
    solid[y * W + x] = 0;
    bctx.clearRect(x, y, 1, 1);
  }
}

export function clearRect(x, y, w, h) {
  for (let j = y; j < y + h; j++)
    for (let i = x; i < x + w; i++) clearPixel(i, j);
}

export function drawTerrain(ctx) {
  ctx.drawImage(buf, 0, 0);
}
