// ============================================================================
// SPRITES MUNDO 4: ESTRUCTURAS GLACIARES Y ESCALADA ALPINAS (PIXEL ART)
// ============================================================================
// Escaleras heladas, cúmulos de cristales de hielo radiante y cuerdas fijas de altura.

function drawFrozenLadder(ctx, x, y, h = 48, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Pernos de anclaje de titanio incrustados en la pared de hielo
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - h, 4, 4);
  ctx.fillRect(px + 12, py - h, 4, 4);
  ctx.fillRect(px - 4, py - 4, 4, 4);
  ctx.fillRect(px + 12, py - 4, 4, 4);

  // 2. Rieles laterales verticales de escalada
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 1, py - h, 3, h);
  ctx.fillRect(px + 10, py - h, 3, h);

  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py - h, 1, h);
  ctx.fillRect(px + 11, py - h, 1, h);

  // 3. Peldaños de aleación de montaña con escarcha de hielo
  for (let ry = py - h + 6; ry <= py - 4; ry += 10) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px, ry, 12, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(px, ry + 1, 12, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1, ry, 10, 1); // Escarcha superior
  }

  // 4. Carámbanos de condensación en el peldaño inferior
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 2, py - 1, 2, 4);
  ctx.fillRect(px + 8, py - 1, 2, 5);
}

function drawIceCrystalCluster(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Resplandor áurico glacial suave
  const glow = Math.sin(frame * 0.08 + px * 0.05) * 0.15 + 0.35;
  const rad = 14;
  const glowGrad = ctx.createRadialGradient(px, py - 8, 2, px, py - 8, rad);
  glowGrad.addColorStop(0, 'rgba(144, 224, 239, ' + glow.toFixed(2) + ')');
  glowGrad.addColorStop(1, 'rgba(0, 180, 216, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(px, py - 8, rad, 0, Math.PI * 2);
  ctx.fill();

  // 1. Cristal central alto
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px - 4, py);
  ctx.lineTo(px, py - 18);
  ctx.lineTo(px + 4, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(px - 3, py);
  ctx.lineTo(px, py - 17);
  ctx.lineTo(px + 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#90e0ef';
  ctx.beginPath();
  ctx.moveTo(px - 1, py);
  ctx.lineTo(px, py - 17);
  ctx.lineTo(px + 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 18, 2, 3);

  // 2. Cristal izquierdo inclinado
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py);
  ctx.lineTo(px - 6, py - 12);
  ctx.lineTo(px - 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(px - 7, py);
  ctx.lineTo(px - 6, py - 11);
  ctx.lineTo(px - 3, py);
  ctx.closePath();
  ctx.fill();

  // 3. Cristal derecho menor
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px + 2, py);
  ctx.lineTo(px + 6, py - 10);
  ctx.lineTo(px + 8, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px + 3, py);
  ctx.lineTo(px + 6, py - 9);
  ctx.lineTo(px + 7, py);
  ctx.closePath();
  ctx.fill();

  // Base de escarcha de nieve
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 10, py - 2, 20, 2);
}

function drawHangingRope(ctx, x, y, h = 40, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Placa de anclaje superior de aleación roja
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 3, py, 6, 4);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 1, py + 1, 2, 2);

  // Oscilación suave con el viento polar
  const windSway = Math.sin(frame * 0.05 + px * 0.01) * 3;

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py + 4);
  ctx.quadraticCurveTo(px + windSway * 0.5, py + h * 0.5, px + windSway, py + h);
  ctx.stroke();

  // Mosquetón y lazo final en el extremo inferior
  const endX = px + windSway;
  const endY = py + h;
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(Math.round(endX) - 2, Math.round(endY), 4, 5);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(Math.round(endX) - 1, Math.round(endY) + 1, 2, 3);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrozenLadder = drawFrozenLadder;
  SpriteManager.prototype.drawIceCrystalCluster = drawIceCrystalCluster;
  SpriteManager.prototype.drawHangingRope = drawHangingRope;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawFrozenLadder,
    drawIceCrystalCluster,
    drawHangingRope
  };
}
