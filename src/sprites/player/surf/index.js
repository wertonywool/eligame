// ============================================================================
// SPRITES MUNDO 3: COORDINADOR DE HABILIDAD SURF & IMPULSO (WATER DASH)
// ============================================================================
// Conecta y orquesta los módulos divididos:
// - board.js: Casco, quillas, stringer y deck de la tabla
// - stance.js: Postura anatómica de surfista de Mamá Elizabeth con skins completas
// - dash_fx.js: Chorros de propulsión hidrodinámica, estela y olas de corte

SpriteManager.prototype.drawMamaSurfing = function(ctx, x, y, facingRight, isImpulse = false, frame = 0, forceSkin = null, forceBoardSkin = null) {
  ctx.save();
  const px = Math.round(x);
  const py = Math.round(y);

  const activeSkin = forceSkin || (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const activeBoardSkin = forceBoardSkin || (typeof saveState !== 'undefined' && saveState && saveState.surfboardSkin) || 'classic';

  // Oscilación marina natural producida por el oleaje
  const bobbing = Math.sin(frame * 0.16) * 1.8;
  const tilt = isImpulse ? -0.14 : (Math.sin(frame * 0.12) * 0.06);

  // 1. Estelas espectrales de velocidad (After-images) en modo Impulso
  if (isImpulse) {
    const dir = facingRight ? 1 : -1;
    for (let g = 2; g >= 1; g--) {
      ctx.save();
      ctx.globalAlpha = g === 2 ? 0.22 : 0.42;
      const ghostX = px - dir * (g * 14);
      const ghostY = py + bobbing;
      this.drawSurfboard(ctx, ghostX + (facingRight ? 2 : -2), ghostY + 20, facingRight, tilt, true, activeBoardSkin);
      this.drawSurferMama(ctx, ghostX, ghostY, facingRight, true, frame, tilt, activeSkin);
      ctx.restore();
    }
  }

  // 2. Chorro hidrodinámico, estela de espuma y corte de proa
  this.drawSurfSpray(ctx, px, py + bobbing, facingRight, isImpulse, frame);

  // 3. Tabla de Surf colocada firmemente bajo sus patas
  const boardY = py + 20 + bobbing;
  this.drawSurfboard(ctx, px + (facingRight ? 2 : -2), boardY, facingRight, tilt, isImpulse, activeBoardSkin);

  // 4. Mamá Elizabeth en su postura atlética de equilibrio sobre el deck
  this.drawSurferMama(ctx, px, py + bobbing, facingRight, isImpulse, frame, tilt, activeSkin);

  ctx.restore();
};
