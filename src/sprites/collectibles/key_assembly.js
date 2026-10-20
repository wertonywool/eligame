// ============================================================================
// SPRITES: ANIMACIÓN DE ENSAMBLAJE DE LA LLAVE MAESTRA (MUNDO 3 • FASE 4)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawKeyFragment(ctx, pieceIndex, x, y, scale = 1, alpha = 1) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  if (pieceIndex === 0) {
    // Pieza 1: Aro de sujeción / Cabezal ornamental (Sami el Heladero)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-10, -10, 20, 16);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-8, -8, 16, 12);
    ctx.fillStyle = '#07020a'; ctx.fillRect(-4, -4, 8, 5); // Hueco interior
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-7, -7, 3, 3); // Brillo
    // Orejitas ornamentales de ratón en el pomo
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(-8, -12, 4, 3);
    ctx.fillRect(4, -12, 4, 3);
  } else if (pieceIndex === 1) {
    // Pieza 2: Vástago central acanalado (Surfista Kai)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-4, -8, 8, 22);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -7, 6, 20);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -7, 2, 20); // Estría reflectante
    ctx.fillStyle = '#8f143c'; ctx.fillRect(-3, 0, 6, 2);   // Engarce medio
  } else if (pieceIndex === 2) {
    // Pieza 3: Paleta dentada de desbloqueo (La Costa)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-2, -6, 14, 14);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-1, -5, 12, 12);
    // Dientes asimétricos de combinación
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, -3, 6, 2);
    ctx.fillRect(6, 1, 4, 2);
    ctx.fillRect(2, 5, 8, 2);
  } else if (pieceIndex === 3) {
    // Pieza 4: Joya / Núcleo de poder maestro (Don Pancho)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-6, -6, 12, 12);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(-5, -5, 10, 10);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -3, 6, 6);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -1, 3, 3); // Destello estelar
  }

  ctx.restore();
}

function drawMasterKeyAssembled(ctx, x, y, scale = 1, glow = 1, glint = 0) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);

  // Aura radiante de poder unificado
  const glowAlpha = Math.max(0, Math.min(0.6, 0.35 * glow));
  ctx.fillStyle = `rgba(255, 209, 102, ${glowAlpha})`;
  ctx.beginPath();
  ctx.arc(0, 4, 36, 0, Math.PI * 2);
  ctx.fill();

  // 1. Cabeza de la Llave Maestra con corona de ratón
  ctx.fillStyle = '#07020a'; ctx.fillRect(-14, -26, 28, 22);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(-12, -24, 24, 18);
  ctx.fillStyle = '#07020a'; ctx.fillRect(-6, -18, 12, 8); // Ojo central

  // Orejitas ornamentales de ratón en el pomo
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-12, -30, 7, 5); ctx.fillRect(5, -30, 7, 5);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(-11, -29, 5, 4); ctx.fillRect(6, -29, 5, 4);

  // Joya de Don Pancho engarzada en el corazón de la llave
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(-3, -15, 6, 4);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -14, 2, 2);

  // 2. Vástago pesado con estrías doradas y blancas
  ctx.fillStyle = '#07020a'; ctx.fillRect(-5, -5, 10, 36);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -4, 6, 34);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -4, 2, 34); // Brillo metálico continuo
  ctx.fillStyle = '#8f143c'; ctx.fillRect(-4, 10, 8, 3);  // Anillo de refuerzo

  // 3. Dientes maestros del mecanismo del rascacielos
  ctx.fillStyle = '#07020a'; ctx.fillRect(4, 12, 14, 18);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(5, 13, 12, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(10, 15, 6, 3);
  ctx.fillRect(12, 21, 4, 3);
  ctx.fillRect(8, 26, 8, 2);

  // 4. Destello estelar móvil que recorre la llave
  if (glint > 0) {
    const glintY = -24 + (glint % 1) * 55;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, Math.round(glintY), 4, 4);
    ctx.fillRect(-5, Math.round(glintY) + 1, 10, 2);
  }

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKeyFragment = drawKeyFragment;
  SpriteManager.prototype.drawMasterKeyAssembled = drawMasterKeyAssembled;
}

if (typeof module !== 'undefined') {
  module.exports = { drawKeyFragment, drawMasterKeyAssembled };
}
