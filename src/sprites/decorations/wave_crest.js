// ============================================================================
// SPRITES MUNDO 3 • FASE 3: OLAS DE LA ROMPIENTE (SURF WAVE CREST)
// ============================================================================
// Módulo de renderizado para las olas del desafío de Kai Surf

function drawSurfWave(ctx, wave, frame) {
  if (typeof drawRealisticSurfWave === 'function') {
    drawRealisticSurfWave(ctx, wave, frame);
    return;
  }
  const wx = Math.round(wave.x);
  const wy = Math.round(wave.y);
  const t = frame * 0.14 + (wave.id || 0) * 1.5;
  const bob = Math.sin(t) * 3.5;

  // Sombra marina profunda
  ctx.fillStyle = 'rgba(2, 62, 138, 0.55)';
  ctx.beginPath();
  ctx.ellipse(wx + 14, wy + 4, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pared del tubo en azul marino profundo
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(wx + 28, wy + 2);
  ctx.quadraticCurveTo(wx + 14, wy - 22 + bob, wx - 4, wy - 28 + bob);
  ctx.lineTo(wx - 10, wy - 20 + bob);
  ctx.quadraticCurveTo(wx + 4, wy - 2, wx + 6, wy + 2);
  ctx.closePath();
  ctx.fill();

  // Interior del tubo translúcido
  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(wx + 20, wy);
  ctx.quadraticCurveTo(wx + 10, wy - 18 + bob, wx - 2, wy - 24 + bob);
  ctx.lineTo(wx - 7, wy - 19 + bob);
  ctx.quadraticCurveTo(wx + 6, wy - 4, wx + 10, wy);
  ctx.closePath();
  ctx.fill();

  // Labio cayendo hacia adelante (Pitching Lip)
  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(wx - 2, wy - 25 + bob);
  ctx.quadraticCurveTo(wx + 2, wy - 29 + bob, wx + 8, wy - 22 + bob);
  ctx.lineTo(wx + 4, wy - 18 + bob);
  ctx.quadraticCurveTo(wx, wy - 23 + bob, wx - 4, wy - 22 + bob);
  ctx.closePath();
  ctx.fill();

  // Espuma blanca pura explosiva
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx - 8, wy - 30 + Math.round(bob), 14, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 6, wy - 32 + Math.round(bob), 11, 4);
  ctx.fillRect(wx + 4, wy - 26 + Math.round(bob), 5, 4);

  // Spray marino y gotas
  const sprayAnim = (frame * 2 + (wave.id || 0) * 11) % 6;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 12 + sprayAnim, wy - 36 + Math.round(bob), 3, 3);
  ctx.fillRect(wx - 6 - sprayAnim, wy - 39 + Math.round(bob), 2, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx + 12, wy - 24 + Math.round(bob), 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfWave = drawSurfWave;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfWave };
}
