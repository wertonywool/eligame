// ============================================================================
// RENDERIZADO DEL DRAGÓN ASTRAL DE POLARIS (MUNDO 4 • FASE 9)
// ============================================================================
// Dibuja el dragon cosmico serpentino con alas estelares, cometas celestiales,
// estrellas teledirigidas y barreras de luz polar en el Sanctum Sanctorum.

function drawAstralBoss(ctx) {
  if (!level || level.id !== 4) return;
  const s = window.astralBossState;
  if (!s || (!s.active && !s.isDefeated)) return;

  const bx = Math.round(s.x);
  const by = Math.round(s.y);
  const frame = globalFrame;
  const isEnraged = s.hp <= 3;

  // 1. Barreras de luz estelar en los extremos de la arena
  if (s.gateLeft.closed) {
    drawAstralBarrier(ctx, s.gateLeft.x, s.gateLeft.y);
  }
  if (s.gateRight.closed) {
    drawAstralBarrier(ctx, s.gateRight.x, s.gateRight.y);
  }

  // 2. Cometas cayendo
  for (const c of s.comets) {
    const cx = Math.round(c.x);
    const cy = Math.round(c.y);
    ctx.save();
    // Estela del cometa
    ctx.strokeStyle = isEnraged ? 'rgba(255, 0, 128, 0.45)' : 'rgba(0, 245, 212, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - c.vx * 0.08, cy - c.vy * 0.08);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Nucleo del cometa
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isEnraged ? '#ff007f' : '#00f5d4';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Estrellas teledirigidas
  for (const st of s.stars) {
    const sx = Math.round(st.x);
    const sy = Math.round(st.y);
    drawSparkleStar(ctx, sx, sy, 5, isEnraged ? '#ff0055' : '#ffd166');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy - 1, 2, 2);
  }

  // Si esta derrotado, no dibujar el cuerpo (se ha convertido en constelacion)
  if (s.isDefeated) {
    // Brillo residual de estrellas
    drawSparkleStar(ctx, bx + s.w / 2, by + s.h / 2, 8, '#ffd166');
    return;
  }

  // 4. Dragon Astral Serpentino
  ctx.save();
  ctx.translate(bx + s.w / 2, by + s.h / 2);

  // Segmentos serpentinos flotantes del cuerpo
  const segments = 4;
  for (let i = segments; i >= 1; i--) {
    const segT = frame * 0.08 - i * 0.35;
    const offX = -i * 14;
    const offY = Math.sin(segT) * 12;
    const segR = 12 - i * 1.8;

    // Resplandor de aura
    const grad = ctx.createRadialGradient(offX, offY, 2, offX, offY, segR + 6);
    grad.addColorStop(0, isEnraged ? 'rgba(255, 0, 128, 0.8)' : 'rgba(0, 245, 212, 0.8)');
    grad.addColorStop(0.5, isEnraged ? 'rgba(128, 0, 255, 0.4)' : 'rgba(0, 119, 182, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(offX, offY, segR + 6, 0, Math.PI * 2);
    ctx.fill();

    // Nucleo estelar
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(offX, offY, Math.max(2, segR * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }

  // Alas celestiales que aletean
  const wingFlap = Math.sin(frame * 0.18) * 16;
  ctx.fillStyle = isEnraged ? 'rgba(255, 117, 143, 0.65)' : 'rgba(180, 240, 255, 0.65)';
  // Ala izquierda
  ctx.beginPath();
  ctx.moveTo(-4, -6);
  ctx.lineTo(-24, -28 + wingFlap);
  ctx.lineTo(-6, -14);
  ctx.closePath();
  ctx.fill();

  // Ala derecha
  ctx.beginPath();
  ctx.moveTo(8, -6);
  ctx.lineTo(26, -28 + wingFlap);
  ctx.lineTo(12, -14);
  ctx.closePath();
  ctx.fill();

  // Cabeza majestuosa del Dragon
  const headBob = Math.sin(frame * 0.12) * 4;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(8, -12 + headBob, 26, 20);
  ctx.fillStyle = isEnraged ? '#e11d48' : '#0284c7';
  ctx.fillRect(10, -10 + headBob, 22, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(12, -8 + headBob, 18, 12);

  // Cuernos de luz dorada
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(18, -12 + headBob);
  ctx.lineTo(26, -26 + headBob);
  ctx.lineTo(23, -12 + headBob);
  ctx.closePath();
  ctx.fill();

  // Ojos luminosos
  ctx.fillStyle = isEnraged ? '#ffd166' : '#00f5d4';
  ctx.fillRect(22, -6 + headBob, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(23, -5 + headBob, 2, 2);

  // Nucleo Supernova en el pecho
  const corePulse = Math.sin(frame * 0.22) * 2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 2, 6 + corePulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = isEnraged ? '#ff0055' : '#ffd166';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawAstralBarrier(ctx, gx, gy) {
  const px = Math.round(gx);
  const py = Math.round(gy);
  ctx.save();
  // Columna de luz vertical con gradiente estelar
  const grad = ctx.createLinearGradient(px, py - 110, px, py);
  grad.addColorStop(0, 'rgba(255, 209, 102, 0.85)');
  grad.addColorStop(0.5, 'rgba(0, 245, 212, 0.65)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
  ctx.fillStyle = grad;
  ctx.fillRect(px - 4, py - 110, 8, 110);

  // Runa central de poder
  drawSparkleStar(ctx, px, py - 55, 6, '#ffffff');
  ctx.restore();
}
