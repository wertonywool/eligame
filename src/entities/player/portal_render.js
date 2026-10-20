// ============================================================================
// RENDERIZADO DE PISTOLA DE PORTALES Y VORTICE DIMENSIONAL
// ============================================================================
// Dibuja la pistola de portales en manos de Elizabeth, el rayo de plasma,
// el resplandor energetico y los vortices de entrada y salida interdimensionales.

function drawPortalGunOnPlayer(ctx, p, frame, recoil = 0) {
  const facingRight = p.facingRight;
  const dir = facingRight ? 1 : -1;
  const kickX = -dir * (recoil * 3.5);
  const kickAngle = -dir * (recoil * 0.18);

  const gunX = Math.round(p.x + (facingRight ? 13 : 9) + kickX);
  const gunY = Math.round(p.y + 13);

  ctx.save();
  ctx.translate(gunX, gunY);
  ctx.rotate(kickAngle);
  if (!facingRight) ctx.scale(-1, 1);

  // Empuñadura ergonomica oscura
  ctx.fillStyle = '#212529';
  ctx.fillRect(-2, 2, 4, 6);

  // Cuerpo metalico blanco ceramico de la pistola
  ctx.fillStyle = '#f8f9fa';
  ctx.beginPath();
  ctx.roundRect(0, -3, 13, 6, [2, 3, 2, 1]);
  ctx.fill();

  // Detalle gris oscuro / chasis
  ctx.fillStyle = '#495057';
  ctx.fillRect(2, -1, 4, 3);

  // Tubo de cristal superior con plasma verde brillante
  ctx.fillStyle = 'rgba(162, 210, 255, 0.6)';
  ctx.fillRect(3, -5, 7, 3);
  const plasmaPulse = Math.sin(frame * 0.25) * 0.5 + 0.5;
  ctx.fillStyle = plasmaPulse > 0.4 ? '#39ff14' : '#00f5d4';
  ctx.fillRect(4, -4, 5, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(5, -4, 2, 1);

  // Garras frontales del emisor de portales
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(12, -4, 2, 1);
  ctx.fillRect(13, -2, 2, 3);
  ctx.fillRect(12, 2, 2, 1);

  // Destello de energia en la punta durante el disparo
  if (recoil > 0.05) {
    const flashR = 4 + recoil * 6;
    const grad = ctx.createRadialGradient(15, 0, 1, 15, 0, flashR);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, '#39ff14');
    grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(15, 0, flashR, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPortalGunVortex(ctx, x, y, frame, scale = 1) {
  if (scale <= 0.01) return;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);

  // Resplandor exterior verde esmeralda y cian
  const auraPulse = Math.sin(frame * 0.14) * 3;
  const auraRx = 26 + auraPulse;
  const auraRy = 36 + auraPulse * 1.3;
  const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, auraRy);
  grad.addColorStop(0, 'rgba(57, 255, 20, 0.75)');
  grad.addColorStop(0.38, 'rgba(0, 245, 212, 0.45)');
  grad.addColorStop(0.72, 'rgba(20, 80, 40, 0.20)');
  grad.addColorStop(1, 'rgba(4, 16, 8, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, auraRx, auraRy, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ondas de choque dimensionales
  for (let r = 0; r < 2; r++) {
    const ringProg = ((frame * 0.042 + r * 0.5) % 1);
    const ringW = 15 * ringProg + 3;
    const ringH = 25 * ringProg + 4;
    const ringAlpha = (1 - ringProg) * 0.65;
    ctx.strokeStyle = `rgba(180, 255, 120, ${ringAlpha})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(0, 0, ringW, ringH, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Silueta organica ondulante del portal
  const numPoints = 18;
  const baseRx = 13;
  const baseRy = 22;

  // Capa 1: Borde exterior verde oscuro obsidiana
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 4 + frame * 0.15) * 1.6 + Math.cos(ang * 3 - frame * 0.18) * 1.1;
    const vx = Math.cos(ang) * (baseRx + 2.4 + wobble);
    const vy = Math.sin(ang) * (baseRy + 3.0 + wobble * 1.25);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#05190d';
  ctx.fill();

  // Capa 2: Manto esmeralda profundo
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 4 + frame * 0.15) * 1.3 + Math.cos(ang * 3 - frame * 0.18) * 0.8;
    const vx = Math.cos(ang) * (baseRx + wobble);
    const vy = Math.sin(ang) * (baseRy + wobble * 1.2);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#1b7a32';
  ctx.fill();

  // Capa 3: Plasma interior verde lima hiperespacial
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 3 - frame * 0.17) * 1.1;
    const vx = Math.cos(ang) * (baseRx * 0.78 + wobble);
    const vy = Math.sin(ang) * (baseRy * 0.78 + wobble * 1.2);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#39ff14';
  ctx.fill();

  // Brazos de vortice en espiral giratoria
  const arms = 3;
  for (let a = 0; a < arms; a++) {
    const baseAng = frame * 0.16 + (a * (Math.PI * 2 / arms));
    ctx.beginPath();
    for (let step = 0; step < 10; step++) {
      const t = step / 9;
      const armAng = baseAng + t * 2.2;
      const armR = (t * baseRx * 0.75);
      const ax = Math.cos(armAng) * armR;
      const ay = Math.sin(armAng) * armR * 1.45;
      if (step === 0) ctx.moveTo(ax, ay);
      else ctx.lineTo(ax, ay);
    }
    ctx.strokeStyle = a % 2 === 0 ? '#ffffff' : '#00ffff';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Singularidad oscura central
  ctx.beginPath();
  ctx.ellipse(0, 0, 4, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.restore();
}

function drawPortalTeleportWorld(ctx, viewL, viewR) {
  if (!portalTeleportState) return;
  const s = portalTeleportState;

  // 1. Rayo de disparo durante la fase 'fire'
  if (s.phase === 'fire' && s.beamProgress > 0) {
    const dir = s.dir;
    const startX = player.x + (dir > 0 ? 25 : -3);
    const startY = player.y + 13;
    const currentEndX = startX + (s.entryPortal.x - startX) * s.beamProgress;
    const currentEndY = startY + (s.entryPortal.y - startY) * s.beamProgress;

    ctx.save();
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.45)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.stroke();
    ctx.restore();
  }

  // 2. Portal de Entrada
  if (s.entryPortal.scale > 0.01) {
    if (s.entryPortal.x >= viewL && s.entryPortal.x <= viewR) {
      drawPortalGunVortex(ctx, s.entryPortal.x, s.entryPortal.y, globalFrame, s.entryPortal.scale);
    }
  }

  // 3. Portal de Salida
  if (s.exitPortal.scale > 0.01) {
    if (s.exitPortal.x >= viewL && s.exitPortal.x <= viewR) {
      drawPortalGunVortex(ctx, s.exitPortal.x, s.exitPortal.y, globalFrame, s.exitPortal.scale);
    }
  }
}
