// ============================================================================
// SPRITES MUNDO 3 • FASE 4: CARRITO DE HOTDOGS Y DON PANCHO (PIXEL ART 16-BIT)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawHotdogCart(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Toldo a rayas del carrito (28px x 8px)
  const canopyX = px - 4, canopyY = py - 24;
  for (let c = 0; c < 7; c++) {
    ctx.fillStyle = c % 2 === 0 ? '#e63946' : '#ffbe0b';
    ctx.fillRect(canopyX + c * 4, canopyY, 4, 7);
  }
  ctx.fillStyle = '#343a40';
  ctx.fillRect(canopyX - 1, canopyY + 6, 29, 2);

  // 2. Postes delgados y cuerpo de acero
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px - 2, py - 17, 2, 16);
  ctx.fillRect(px + 22, py - 17, 2, 16);
  ctx.fillStyle = '#495057'; ctx.fillRect(px, py - 2, 24, 16);
  ctx.fillStyle = '#e9ecef'; ctx.fillRect(px + 1, py - 1, 22, 14);

  // Parrilla caliente y hotdogs con salsa
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 3, py + 1, 12, 5);
  ctx.fillStyle = '#e9c46a'; ctx.fillRect(px + 4, py + 2, 10, 3); // Pan
  ctx.fillStyle = '#c1121f'; ctx.fillRect(px + 5, py + 3, 8, 1); // Salchicha
  ctx.fillStyle = '#ffbe0b'; ctx.fillRect(px + 6, py + 2, 6, 1); // Mostaza

  // Humo y ruedas
  const steamY = Math.round(Math.sin(frame * 0.12) * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(px + 8, py - 6 + steamY, 2, 2);
  ctx.fillRect(px + 12, py - 9 + steamY, 2, 2);
  ctx.fillStyle = '#212529';
  ctx.beginPath();
  ctx.arc(px + 5, py + 15, 4, 0, Math.PI * 2);
  ctx.arc(px + 19, py + 15, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 14, 2, 2);
  ctx.fillRect(px + 18, py + 14, 2, 2);
}

function drawDonPancho(ctx, x, y, fate, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  if (!fate) {
    const bob = Math.floor(Math.sin(frame * 0.08) * 1);
    // Sombrero de chef
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 10 + bob, 8, 7);
    ctx.fillRect(px + 2, py - 4 + bob, 10, 2);
    // Cara y bigote
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 3, py - 2 + bob, 8, 7);
    ctx.fillStyle = '#07020a';
    ctx.fillRect(px + 8, py + bob, 2, 2); // Ojo
    ctx.fillStyle = '#3b0820';
    ctx.fillRect(px + 6, py + 2 + bob, 5, 2); // Bigote
    // Cuerpo y delantal
    ctx.fillStyle = '#8f143c';
    ctx.fillRect(px + 2, py + 5 + bob, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 4, py + 6 + bob, 6, 8); // Delantal
  } else if (fate === 'FREEZE') {
    // Bloque de hielo translúcido con Don Pancho congelado
    ctx.fillStyle = 'rgba(255, 202, 212, 0.45)';
    ctx.fillRect(px - 1, py - 12, 16, 28);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(px - 1, py - 12, 16, 28);
    // Destello de escarcha
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1, py - 10, 3, 3);
    ctx.fillRect(px + 10, py + 8, 3, 3);
  } else if (fate === 'ELECTROCUTE') {
    // Silueta chamuscada con pequeños arcos voltaicos
    const zap = frame % 12 < 6;
    ctx.fillStyle = zap ? '#ffffff' : '#07020a';
    ctx.fillRect(px + 2, py - 5, 10, 20);
    ctx.fillStyle = '#ff2a70';
    if (zap) {
      ctx.fillRect(px - 2, py - 8, 2, 4);
      ctx.fillRect(px + 13, py + 2, 2, 4);
    }
  } else if (fate === 'EXPLODE') {
    // Marca de quemadura en el asfalto con migajas
    ctx.fillStyle = '#07020a';
    ctx.beginPath();
    ctx.ellipse(px + 6, py + 15, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(px + 2, py + 13, 2, 2);
    ctx.fillRect(px + 9, py + 14, 2, 2);
  }
}

function drawDroppedKeyPiece(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const bob = Math.sin(frame * 0.12) * 3;
  const py = Math.round(y + bob);

  // Destello resplandeciente
  const glow = 0.5 + Math.sin(frame * 0.15) * 0.3;
  ctx.save();
  ctx.globalAlpha = glow;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px + 6, py + 6, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Llave dorada 4/4 (Cabeza con aro ornamental y dientes)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 1, py + 1, 10, 10);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 2, py + 2, 8, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 4, 4, 4);
  // Vástago y dientes de la llave
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 6, py + 10, 3, 8);
  ctx.fillRect(px + 9, py + 14, 3, 2);
  ctx.fillRect(px + 9, py + 17, 3, 2);

  if (frame % 8 < 4) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py - 2, 2, 2);
    ctx.fillRect(px + 14, py + 6, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawHotdogCart = drawHotdogCart;
  SpriteManager.prototype.drawDonPancho = drawDonPancho;
  SpriteManager.prototype.drawDroppedKeyPiece = drawDroppedKeyPiece;
}

if (typeof module !== 'undefined') {
  module.exports = { drawHotdogCart, drawDonPancho, drawDroppedKeyPiece };
}
