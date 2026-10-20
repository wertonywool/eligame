// ============================================================================
// SPRITES MUNDO 3 • FASE 3: ICONO DE HELADO DE FRESA Y VAINILLA
// ============================================================================
function drawIceCreamCone(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (scale !== 1) ctx.scale(scale, scale);

  // 1. Cono de barquillo crujiente dorado
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(-4, 0, 8, 2);
  ctx.fillRect(-3, 2, 6, 3);
  ctx.fillRect(-2, 5, 4, 3);
  ctx.fillRect(-1, 8, 2, 2);

  ctx.fillStyle = '#c4923e';
  ctx.fillRect(-3, 0, 6, 2);
  ctx.fillRect(-2, 2, 4, 3);
  ctx.fillRect(-1, 5, 2, 3);

  // Cuadrícula del barquillo
  ctx.fillStyle = '#e9c46a';
  ctx.fillRect(-2, 1, 1, 1);
  ctx.fillRect(1, 1, 1, 1);
  ctx.fillRect(-1, 3, 1, 1);

  // 2. Bola / Remolino de helado de fresa y vainilla
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(-5, -6, 10, 6);
  ctx.fillRect(-4, -9, 8, 4);
  ctx.fillRect(-2, -11, 4, 3);

  // Capa de fresa
  ctx.fillStyle = '#ff4d6d';
  ctx.fillRect(-4, -5, 8, 5);
  ctx.fillRect(-3, -8, 6, 3);

  // Espiral de nata/vainilla blanca
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-2, -10, 4, 2);
  ctx.fillRect(-1, -7, 3, 2);
  ctx.fillRect(-3, -4, 2, 2);
  ctx.fillRect(1, -3, 2, 2);

  // Guinda roja en la punta
  ctx.fillStyle = '#d90429';
  ctx.fillRect(0, -11, 1, 1);

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawIceCreamCone = drawIceCreamCone;
}

if (typeof module !== 'undefined') {
  module.exports = { drawIceCreamCone };
}
