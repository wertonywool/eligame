// ============================================================================
// SPRITES MUNDO 4: ENEMIGOS ESPACIALES Y SONDAS ORBITALES (PIXEL ART)
// ============================================================================

function drawSpaceDrone(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const hover = Math.round(Math.sin(frame * 0.2 + x * 0.1) * 2);

  // Orugas o patines magnéticos
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px, py + 10, 18, 4);
  ctx.fillStyle = '#3b0820';
  ctx.fillRect(px + 2, py + 11, 14, 2);

  // Chasis blindado angular
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 2, py + 2 + hover, 14, 9);
  ctx.fillStyle = '#120415';
  ctx.fillRect(px + 3, py + 3 + hover, 12, 7);

  // Lente visor óptico hostil
  const eyeX = facingRight ? px + 10 : px + 3;
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(eyeX, py + 4 + hover, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(facingRight ? eyeX + 2 : eyeX, py + 5 + hover, 2, 2);

  // Antena superior parpadeante
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 8, py - 3 + hover, 2, 5);
  if (frame % 16 < 8) {
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 7, py - 4 + hover, 4, 2);
  }
}

function drawSpaceProbe(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const floatBob = Math.round(Math.sin(frame * 0.15 + x * 0.2) * 3);

  // Cuerpo central octogonal de la sonda
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 4, py - 4 + floatBob, 12, 12);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 5, py - 3 + floatBob, 10, 10);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px + 8, py + floatBob, 4, 4); // Núcleo de energía

  // Paneles solares laterales desplegados
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px - 6, py - 1 + floatBob, 10, 6);
  ctx.fillRect(px + 16, py - 1 + floatBob, 10, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 5, py + floatBob, 8, 4);
  ctx.fillRect(px + 17, py + floatBob, 8, 4);

  // Pulsos de telemetría y datos cósmicos
  if (frame % 20 < 10) {
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 9, py - 7 + floatBob, 2, 2);
    ctx.fillRect(px + 9, py + 9 + floatBob, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSpaceDrone = drawSpaceDrone;
  SpriteManager.prototype.drawSpaceProbe = drawSpaceProbe;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSpaceDrone, drawSpaceProbe };
}
