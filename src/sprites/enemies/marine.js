// ============================================================================
// SPRITES MUNDO 3: ENEMIGOS MARINOS DEL MEGATSUNAMI (PIXEL ART)
// ============================================================================

function drawElectricJellyfish(ctx, x, y, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const pulse = Math.sin(frame * 0.15) * 2;

  // Campana de la medusa con brillo translúcido turquesa
  ctx.fillStyle = '#005f73';
  ctx.fillRect(px + 2, py - 4 + pulse, 12, 9);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 3, py - 3 + pulse, 10, 7);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 4, py - 2 + pulse, 8, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 6, py - 1 + pulse, 4, 2);

  // Tentáculos eléctricos ondulantes
  const tentBob = Math.sin(frame * 0.2) * 2;
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 3, py + 5 + pulse, 2, 7 + tentBob);
  ctx.fillRect(px + 7, py + 5 + pulse, 2, 9 - tentBob);
  ctx.fillRect(px + 11, py + 5 + pulse, 2, 7 + tentBob);

  // Chispas de energía bioeléctrica dorada
  if (frame % 16 < 8) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 1, py + 2 + pulse, 2, 2);
    ctx.fillRect(px + 13, py + 6 + pulse, 2, 2);
  }
}

function drawTsunamiShark(ctx, x, y, facingRight, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const swimBob = Math.sin(frame * 0.2 + x * 0.1) * 2;

  // Espuma del corte en el agua turquesa
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py + 8, 24, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 2, py + 6, 18, 2);

  // Gran aleta dorsal triangular en azul marino / pizarra
  ctx.fillStyle = '#0b132b';
  ctx.fillRect(px + 4, py - 4 + swimBob, 7, 12);
  ctx.fillStyle = '#1c2541';
  ctx.fillRect(px + 5, py - 3 + swimBob, 5, 10);
  ctx.fillStyle = '#3a506b';
  ctx.fillRect(px + 6, py - 1 + swimBob, 3, 6);

  // Mandíbula y cuerpo sumergido
  ctx.fillStyle = '#0b132b';
  ctx.fillRect(px, py + 4 + swimBob, 16, 6);
  ctx.fillStyle = '#e63946';
  ctx.fillRect(px + (facingRight ? 12 : 2), py + 5 + swimBob, 3, 2); // Ojo hostil
  // Dientes afilados blancos
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + (facingRight ? 10 : 2), py + 8 + swimBob, 2, 2);
  ctx.fillRect(px + (facingRight ? 13 : 5), py + 8 + swimBob, 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawElectricJellyfish = drawElectricJellyfish;
  SpriteManager.prototype.drawTsunamiShark = drawTsunamiShark;
}

if (typeof module !== 'undefined') {
  module.exports = { drawElectricJellyfish, drawTsunamiShark };
}
