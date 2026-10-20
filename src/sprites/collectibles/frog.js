// ============================================================================
// SPRITES MUNDO 3 • FASE 4: LA RANITA DE RAÚL (PIXEL ART 16-BIT)
// ============================================================================
// Renderiza la pequeña rana de Raúl posada sobre la cabeza de Mamá Elizabeth.
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawFrogSprite(ctx, x, y, facingRight, frame = 0) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) ctx.scale(-1, 1);

  // 1. Cuerpo redondeado de la ranita (12px ancho x 8px alto)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-6, -4, 12, 8);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(-5, -3, 10, 6);

  // 2. Garganta inflable con animación de respiración
  const breathe = Math.sin(frame * 0.15) > 0 ? 1 : 0;
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(-2, 0, 5 + breathe, 3);

  // 3. Grandes ojos saltones en la parte superior
  const isBlinking = frame % 110 < 6;
  // Ojo izquierdo
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-4, -7, 4, 4);
  ctx.fillStyle = isBlinking ? '#8f143c' : '#ffffff';
  ctx.fillRect(-3, -6, 2, 2);
  if (!isBlinking) {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(-3, -5, 1, 1); // Pupila
  }

  // Ojo derecho
  ctx.fillStyle = '#07020a';
  ctx.fillRect(1, -7, 4, 4);
  ctx.fillStyle = isBlinking ? '#8f143c' : '#ffffff';
  ctx.fillRect(2, -6, 2, 2);
  if (!isBlinking) {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(2, -5, 1, 1); // Pupila
  }

  // 4. Patas palmeadas abrazando la cabeza
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(-6, 3, 3, 2); // Pata delantera izq
  ctx.fillRect(4, 3, 3, 2);  // Pata delantera der
  ctx.fillStyle = '#3b0820';
  ctx.fillRect(-7, 1, 2, 3); // Anca trasera

  ctx.restore();
}

function drawFrogOnHead(ctx, player, frame) {
  if (typeof saveState === 'undefined' || !saveState.raulQuest || saveState.raulQuest.state !== 'FROG_ON_HEAD') {
    return;
  }

  // Posición de la cabeza de Mamá Elizabeth (entre sus orejitas)
  const dir = player.facingRight ? 1 : -1;
  const bobbing = player.state === 'run' ? Math.sin(frame * 0.4) * 1.5 : (player.state === 'idle' ? Math.sin(frame * 0.1) * 0.8 : 0);
  const frogX = player.x + 11 + dir * 1;
  const frogY = player.y - 2 + bobbing;

  drawFrogSprite(ctx, frogX, frogY, player.facingRight, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrogSprite = drawFrogSprite;
  SpriteManager.prototype.drawFrogOnHead = drawFrogOnHead;
}

if (typeof module !== 'undefined') {
  module.exports = { drawFrogSprite, drawFrogOnHead };
}
