// ============================================================================
// COLECCIONABLES: QUESO DORADO, LIRIOS SOLTADOS Y DESTELLOS
// ============================================================================
SpriteManager.prototype.drawSparkleStar = function(ctx, cx, cy, size, color = '#ffd166') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size * 2);
  ctx.lineTo(cx + size * 0.6, cy - size * 0.6);
  ctx.lineTo(cx + size * 2, cy);
  ctx.lineTo(cx + size * 0.6, cy + size * 0.6);
  ctx.lineTo(cx, cy + size * 2);
  ctx.lineTo(cx - size * 0.6, cy + size * 0.6);
  ctx.lineTo(cx - size * 2, cy);
  ctx.lineTo(cx - size * 0.6, cy - size * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

SpriteManager.prototype.drawDroppedLily = function(ctx, x, y, frame) {
  const px = Math.round(x);
  const py = Math.round(y + Math.sin(frame * 0.15 + x) * 1.8);

  // Halo suave sutil
  const glow = ctx.createRadialGradient(px + 4, py + 4, 1, px + 4, py + 4, 10);
  glow.addColorStop(0, 'rgba(255, 143, 171, 0.28)');
  glow.addColorStop(1, 'rgba(255, 143, 171, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(px - 6, py - 6, 20, 20);

  // Destello de estrella glint estilo Chiki's Chase
  if (Math.floor((frame + x) * 0.12) % 3 === 0) {
    this.drawSparkleStar(ctx, px + 7, py - 1, 2, '#fff0f3');
  }

  // Contorno oscuro
  ctx.fillStyle = '#14101c';
  ctx.fillRect(px, py, 8, 8);

  // Hojas verdes del Lirio de Dexter
  ctx.fillStyle = '#2b6e2e';
  ctx.fillRect(px + 1, py + 3, 2, 4);
  ctx.fillStyle = '#52b74a';
  ctx.fillRect(px + 1, py + 4, 1, 2);

  // Flor campanita blanca y rosa
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px + 3, py + 1, 4, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 1, 2, 2);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 3, py + 2, 1, 1);
};

SpriteManager.prototype.drawCheese = function(ctx, x, y, frame) {
  const floatY = Math.round(Math.sin((frame + x) * 0.1) * 2.2);
  const px = Math.round(x);
  const py = Math.round(y + floatY);

  // Halo cálido sutil de luz dorada
  const glow = ctx.createRadialGradient(px + 6, py + 5, 1, px + 6, py + 5, 12);
  glow.addColorStop(0, 'rgba(255, 225, 105, 0.32)');
  glow.addColorStop(1, 'rgba(255, 183, 3, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(px - 6, py - 7, 24, 24);

  // Destello de estrella rotando/pulsando estilo Chiki's Chase
  const sparklePhase = ((frame + x) * 0.08) % 3;
  if (sparklePhase < 1.4) {
    const sparkleSize = 2 + Math.sin(frame * 0.22) * 0.8;
    this.drawSparkleStar(ctx, px + 10, py - 1, sparkleSize, '#fff3b0');
  }

  // Contorno oscuro marcado
  ctx.fillStyle = '#14101c';
  ctx.fillRect(px + 1, py, 10, 11);
  ctx.fillRect(px, py + 2, 12, 8);

  // Corteza superior dorada brillante
  ctx.fillStyle = '#ffe169';
  ctx.fillRect(px + 2, py + 1, 8, 3);
  // Cara de queso cheddar maduro
  ctx.fillStyle = '#fca311';
  ctx.fillRect(px + 1, py + 4, 10, 6);
  // Sombra biselada inferior
  ctx.fillStyle = '#cc7700';
  ctx.fillRect(px + 1, py + 8, 10, 2);
  // Agujeros de queso con profundidad
  ctx.fillStyle = '#b05e00';
  ctx.fillRect(px + 2, py + 5, 2, 2);
  ctx.fillRect(px + 7, py + 6, 2, 2);
  ctx.fillRect(px + 5, py + 8, 1, 1);
  ctx.fillStyle = '#ffb703';
  ctx.fillRect(px + 3, py + 6, 1, 1);
  ctx.fillRect(px + 8, py + 7, 1, 1);
  // Brillo especular blanco en la cresta
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py + 2, 3, 1);
};
