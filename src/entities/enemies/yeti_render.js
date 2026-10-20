// ============================================================================
// RENDERIZADO DEL GRAN YETI DE CRISTAL (MUNDO 4 • FASE 6)
// ============================================================================
// Dibuja el sprite pixel art del Yeti gigante, cuernos glaciares, estalactitas,
// bolas de nieve rodantes, ondas sismicas y compuertas de hielo de la arena.

function drawYetiBoss(ctx) {
  if (!level || level.id !== 4) return;
  const s = window.yetiBossState;
  if (!s || (!s.active && !s.isDefeated)) return;

  const bx = Math.round(s.x);
  const by = Math.round(s.y);
  const facingRight = s.facingRight;
  const isEnraged = s.hp <= 2;
  const frame = globalFrame;

  // 1. Compuertas de hielo en los extremos de la arena
  if (s.gateLeft.closed) {
    drawIcePortcullis(ctx, s.gateLeft.x, s.gateLeft.y);
  }
  if (s.gateRight.closed) {
    drawIcePortcullis(ctx, s.gateRight.x, s.gateRight.y);
  }

  // 2. Proyectiles: Estalactitas cayendo
  for (const ic of s.icicles) {
    const ix = Math.round(ic.x);
    const iy = Math.round(ic.y);
    ctx.save();
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(ix - 3, iy - 12, 6, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(ix - 2, iy - 10, 4, 10);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(ix - 2, iy);
    ctx.lineTo(ix, iy + 6);
    ctx.lineTo(ix + 2, iy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 3. Proyectiles: Bolas de nieve rodantes
  for (const sb of s.snowballs) {
    const sx = Math.round(sb.x);
    const sy = Math.round(sb.y);
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(sb.rot);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(0, 0, sb.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, sb.r - 2, 0, Math.PI * 2);
    ctx.fill();
    // Grietas en la bola de nieve
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-3, -2, 6, 2);
    ctx.fillRect(-1, -4, 2, 6);
    ctx.restore();
  }

  // 4. Ondas de choque en el suelo
  for (const sw of s.shockwaves) {
    const wx = Math.round(sw.x);
    const wy = Math.round(sw.y);
    ctx.save();
    ctx.fillStyle = isEnraged ? '#ef4444' : '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(wx - 8, wy);
    ctx.lineTo(wx - 2, wy - 9);
    ctx.lineTo(wx + 4, wy - 4);
    ctx.lineTo(wx + 8, wy);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx - 2, wy - 8, 2, 5);
    ctx.restore();
  }

  // 5. Cuerpo colosal del Gran Yeti
  ctx.save();
  ctx.translate(bx + s.w / 2, by + s.h);
  if (!facingRight) ctx.scale(-1, 1);

  // Sombra proyectada
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Aura de furia cuando le quedan 2 o menos vidas
  if (isEnraged && !s.isDefeated) {
    const auraPulse = Math.sin(frame * 0.25) * 3;
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(-24 - auraPulse, -48 - auraPulse, 48 + auraPulse * 2, 48 + auraPulse * 2);
  }

  const breath = Math.sin(frame * 0.12) * 1.5;
  const isStomp = s.action === 'stomp';
  const isCharge = s.action === 'charge';
  const armRaise = isStomp ? -14 : (isCharge ? 4 : 0);

  // Patas peludas gruesas
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-16, -14, 12, 14);
  ctx.fillRect(4, -14, 12, 14);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-15, -13, 10, 11);
  ctx.fillRect(5, -13, 10, 11);
  // Garras de hielo en los pies
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-17, -3, 4, 3);
  ctx.fillRect(-12, -3, 4, 3);
  ctx.fillRect(5, -3, 4, 3);
  ctx.fillRect(10, -3, 4, 3);

  // Torso masivo de pelaje blanco alpino
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(-20, -42 + breath, 40, 32, [10, 10, 4, 4]);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(-18, -40 + breath, 36, 29, [8, 8, 3, 3]);
  ctx.fill();

  // Pecho muscular celeste gélido
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(-10, -36 + breath, 20, 16);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(-1, -34 + breath, 2, 12);

  // Brazos gigantescos con pelaje y garras
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-24, -38 + armRaise, 9, 26);
  ctx.fillRect(15, -38 - armRaise, 9, 26);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-23, -37 + armRaise, 7, 23);
  ctx.fillRect(16, -37 - armRaise, 7, 23);
  // Garras frontales
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-23, -15 + armRaise, 7, 4);
  ctx.fillRect(16, -15 - armRaise, 7, 4);

  // Cabeza con facciones bestiales y cuernos de hielo
  const headY = -46 + breath;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-12, headY - 10, 24, 16);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-10, headY - 8, 20, 13);

  // Rostro oscuro de simio ártico
  ctx.fillStyle = '#334155';
  ctx.fillRect(-6, headY - 5, 14, 9);

  // Ojos brillantes cian o rojos si enfurecido
  ctx.fillStyle = isEnraged ? '#ef4444' : '#00f5d4';
  ctx.fillRect(0, headY - 4, 3, 3);
  ctx.fillRect(4, headY - 4, 3, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1, headY - 4, 1, 1);
  ctx.fillRect(5, headY - 4, 1, 1);

  // Cuernos de hielo curvos en la cabeza
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-10, headY - 8);
  ctx.lineTo(-17, headY - 18);
  ctx.lineTo(-7, headY - 10);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(8, headY - 8);
  ctx.lineTo(16, headY - 18);
  ctx.lineTo(6, headY - 10);
  ctx.closePath();
  ctx.fill();

  // Efecto de aturdimiento: estrellas orbitando sobre la cabeza
  if (s.isStunned) {
    const starCount = 3;
    for (let st = 0; st < starCount; st++) {
      const starAngle = frame * 0.15 + (st * Math.PI * 2 / starCount);
      const starX = Math.cos(starAngle) * 16;
      const starY = headY - 20 + Math.sin(starAngle) * 6;
      drawSparkleStar(ctx, starX, starY, 4, '#ffd166');
    }
  }

  ctx.restore();
}

function drawIcePortcullis(ctx, gx, gy) {
  const px = Math.round(gx);
  const py = Math.round(gy);
  ctx.save();
  // Columnas laterales
  ctx.fillStyle = '#0c4a6e';
  ctx.fillRect(px - 6, py - 90, 12, 90);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 4, py - 88, 8, 86);

  // Rejas de picos de hielo verticales
  for (let bar = -3; bar <= 3; bar += 3) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(px + bar - 1, py - 80, 3, 80);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + bar, py - 78, 1, 76);
  }
  ctx.restore();
}
