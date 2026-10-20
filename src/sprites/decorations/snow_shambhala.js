// ============================================================================
// SPRITES MUNDO 4 - FASE 7: EL REINO OCULTO DE SHAMBHALA (PIXEL ART)
// ============================================================================

function drawCrystalLotusFlower(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Halo de resplandor dorado y cian
  const glow = Math.sin(frame * 0.12) * 0.2 + 0.8;
  const grad = ctx.createRadialGradient(px, py - 10, 2, px, py - 10, 18);
  grad.addColorStop(0, 'rgba(56, 189, 248, ' + (glow * 0.4).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(254, 240, 138, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, py - 10, 18, 0, Math.PI * 2);
  ctx.fill();

  // Hojas basales de jade esmeralda
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.ellipse(px - 10, py - 2, 7, 3, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 10, py - 2, 7, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.fillRect(px - 11, py - 3, 5, 1);
  ctx.fillRect(px + 6, py - 3, 5, 1);

  // Pétalos exteriores de cuarzo cristalino azul
  const numPetals = 6;
  for (let i = 0; i < numPetals; i++) {
    const angle = (i * Math.PI) / (numPetals - 1) - Math.PI;
    const petX = px + Math.cos(angle) * 11;
    const petY = py - 7 + Math.sin(angle) * 8;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 5, 8, angle * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores blancos y translúcidos
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px - 4, py - 9, 3, 6, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 4, py - 9, 3, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px, py - 11, 3, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corola central de oro místico
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 9, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#eab308';
  ctx.fillRect(px - 1, py - 10, 2, 2);

  // Partículas doradas que ascienden en espiral
  const sparkle = (frame * 0.08) % 1;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 3 + Math.sin(frame * 0.15) * 6, py - 16 - sparkle * 12, 2, 2);
}

function drawShambhalaPrayerBell(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 48;

  // 1. Armazón de madera lacada roja tibetana
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 12, py - 4, 6, 4);
  ctx.fillRect(px + 8, py - 4, 6, 4);

  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 10, py - h + 8, 4, h - 10);
  ctx.fillRect(px + 8, py - h + 8, 4, h - 10);

  // Viga transversal superior dorada
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 14, py - h + 6, 30, 5);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 12, py - h + 7, 26, 2);

  // Tejadillo asiático con aleros curvos
  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  ctx.moveTo(px - 16, py - h + 6);
  ctx.lineTo(px + Math.floor(2 / 2), py - h);
  ctx.lineTo(px + 18, py - h + 6);
  ctx.closePath();
  ctx.fill();

  // 2. Gran campana de bronce sagrado
  const sway = Math.sin(frame * 0.06) * 1.5;
  const bellX = px + 1 + sway;
  const bellY = py - h + 15;

  // Cadena de suspensión
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 1, py - h + 10);
  ctx.lineTo(bellX, bellY);
  ctx.stroke();

  // Cuerpo de la campana
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(bellX - 6, bellY);
  ctx.lineTo(bellX + 6, bellY);
  ctx.lineTo(bellX + 9, bellY + 16);
  ctx.lineTo(bellX - 9, bellY + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(bellX - 4, bellY + 2);
  ctx.lineTo(bellX + 4, bellY + 2);
  ctx.lineTo(bellX + 7, bellY + 15);
  ctx.lineTo(bellX - 7, bellY + 15);
  ctx.closePath();
  ctx.fill();

  // Grabados sagrados en la campana
  ctx.fillStyle = '#fde047';
  ctx.fillRect(bellX - 6, bellY + 8, 12, 2);
  ctx.fillRect(bellX - 7, bellY + 13, 14, 2);

  // Badajo inferior oscilante
  ctx.fillStyle = '#92400e';
  ctx.fillRect(bellX - 1, bellY + 16, 2, 6);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(bellX - 2, bellY + 20, 4, 3);
}

function drawHotSpringPool(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 68;

  // Borde de piedras volcánicas redondeadas
  const rocks = [
    { dx: -4, r: 6 }, { dx: 12, r: 5 }, { dx: 26, r: 7 },
    { dx: 42, r: 5 }, { dx: 56, r: 6 }, { dx: 68, r: 5 }
  ];

  ctx.fillStyle = '#1e293b';
  rocks.forEach(rk => {
    ctx.beginPath();
    ctx.arc(px + rk.dx, py - 3, rk.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#475569';
  rocks.forEach(rk => {
    ctx.beginPath();
    ctx.arc(px + rk.dx, py - 4, rk.r - 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Espejo de agua termal turquesa reluciente
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 5, Math.floor(w / 2) - 4, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#67e8f9';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 6, Math.floor(w / 2) - 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ondulaciones en el agua
  const wave = Math.sin(frame * 0.1) * 2;
  ctx.fillStyle = '#cffafe';
  ctx.fillRect(px + 16 + wave, py - 7, 14, 1);
  ctx.fillRect(px + 36 - wave, py - 5, 12, 1);

  // Columnas de vapor caliente que se elevan
  for (let s = 0; s < 3; s++) {
    const steamTime = (frame * 0.05 + s * 0.33) % 1;
    const sx = px + 14 + s * 18 + Math.sin(frame * 0.1 + s) * 4;
    const sy = py - 8 - steamTime * 22;
    const alpha = (1 - steamTime) * 0.45;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha.toFixed(2) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 3 + steamTime * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 4. Gran Pagoda Dorada de Shambhala (Templo sagrado de múltiples niveles)
function drawGoldenPagodaTower(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 76;
  const w = 48;

  // Base y pedestal de mármol blanco y piedra tallada
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  // Nivel 1: Columnas lacadas en rojo carmesí y cancel dorado
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 18, py - 26, 4, 20);
  ctx.fillRect(px + 14, py - 26, 4, 20);
  ctx.fillRect(px - 14, py - 24, 28, 18);

  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 12, py - 22, 24, 14);

  // Celosía dorada y resplandor interior
  const relicGlow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(254, 240, 138, ' + relicGlow.toFixed(2) + ')';
  ctx.fillRect(px - 6, py - 18, 12, 10);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - 18, 2, 10);
  ctx.fillRect(px - 6, py - 14, 12, 2);

  // Tejado 1: Aleros curvos de oro místico
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 26, py - 28, 52, 3);
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(px - 28, py - 27);
  ctx.lineTo(px - 16, py - 36);
  ctx.lineTo(px + 16, py - 36);
  ctx.lineTo(px + 28, py - 27);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 22, py - 34, 44, 2);
  ctx.fillRect(px - 14, py - 36, 28, 2);

  // Campanas de viento en las esquinas del tejado 1
  const windSway = Math.sin(frame * 0.08) * 1.2;
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 27 + windSway, py - 24, 2, 4);
  ctx.fillRect(px + 25 + windSway, py - 24, 2, 4);

  // Nivel 2: Santuario superior más esbelto
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 12, py - 50, 24, 14);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 4, py - 46, 8, 8);

  // Tejado 2: Cúpula dorada superior
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(px - 20, py - 50);
  ctx.lineTo(px - 8, py - 58);
  ctx.lineTo(px + 8, py - 58);
  ctx.lineTo(px + 20, py - 50);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 16, py - 56, 32, 2);

  // Aguja y Pináculo Solar-Lunar (Chorten tibetano)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 1, py - 70, 2, 12);
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 72, 3, 0, Math.PI * 2);
  ctx.fill();

  // Destello en la cumbre
  const spark = (frame * 0.05) % 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 75 - spark * 4, 2, 2);
}

// 5. Gran Altar Supremo del Loto del Nirvana
function drawNirvanaLotusAltar(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;

  // Pedestal de mármol blanco de Shambhala con bajorrelieves dorados
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - Math.floor(w / 2), py - 8, w, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - Math.floor(w / 2) + 4, py - 7, w - 8, 2);

  // Moldura dorada con gemas de lapislázuli
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 3);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px - 16, py - 4, 4, 2);
  ctx.fillRect(px - 2, py - 4, 4, 2);
  ctx.fillRect(px + 12, py - 4, 4, 2);

  // Flor del Loto Supremo del Nirvana (levitando suavemente)
  const floatY = Math.sin(frame * 0.07) * 2.5;
  const lotusY = py - 14 + floatY;

  // Halo sagrado radial
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.85;
  const grad = ctx.createRadialGradient(px, lotusY, 4, px, lotusY, 26);
  grad.addColorStop(0, 'rgba(254, 240, 138, ' + (glow * 0.55).toFixed(2) + ')');
  grad.addColorStop(0.5, 'rgba(56, 189, 248, ' + (glow * 0.35).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, lotusY, 26, 0, Math.PI * 2);
  ctx.fill();

  // Pétalos exteriores de cuarzo cian sagrado
  const petals = 8;
  for (let i = 0; i < petals; i++) {
    const ang = (i * Math.PI) / (petals - 1) - Math.PI;
    const petX = px + Math.cos(ang) * 15;
    const petY = lotusY + Math.sin(ang) * 10;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 6, 10, ang * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores blancos y puros
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.ellipse(px - 6, lotusY - 2, 4, 8, -0.25, 0, Math.PI * 2);
  ctx.ellipse(px + 6, lotusY - 2, 4, 8, 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px, lotusY - 4, 4, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corazón dorado ardiente
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, lotusY - 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Partículas celestiales ascendentes
  for (let p = 0; p < 3; p++) {
    const pTime = (frame * 0.06 + p * 0.33) % 1;
    const pX = px - 6 + p * 6 + Math.sin(frame * 0.12 + p) * 5;
    const pY = lotusY - 8 - pTime * 20;
    ctx.fillStyle = (p % 2 === 0) ? '#fde047' : '#67e8f9';
    ctx.fillRect(pX, pY, 2, 2);
  }
}

// 6. Gran Portal a la Madriguera (Portal dimensional de Shambhala hacia el hogar)
function drawSanctuaryPortalGate(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 58;
  const w = 46;

  // Columnas del arco de piedra tallada y oro
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - Math.floor(w / 2), py - h, 6, h);
  ctx.fillRect(px + Math.floor(w / 2) - 6, py - h, 6, h);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 1, py - h + 2, 4, h - 4);
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - h + 2, 4, h - 4);

  // Dintel superior con relieves
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - Math.floor(w / 2) - 2, py - h - 4, w + 4, 6);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - Math.floor(w / 2), py - h - 3, w, 2);

  // Vórtice dimensional interior en espiral
  const vRadiusX = 14;
  const vRadiusY = 22;
  const vCenterY = py - Math.floor(h / 2);

  const vGrad = ctx.createRadialGradient(px, vCenterY, 2, px, vCenterY, vRadiusY);
  vGrad.addColorStop(0, '#fef08a');
  vGrad.addColorStop(0.35, '#38bdf8');
  vGrad.addColorStop(0.7, '#6366f1');
  vGrad.addColorStop(1, 'rgba(30, 27, 75, 0.2)');
  ctx.fillStyle = vGrad;
  ctx.beginPath();
  ctx.ellipse(px, vCenterY, vRadiusX, vRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazos espirales rotatorios del vórtice
  const rot = frame * 0.08;
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1.5;
  for (let a = 0; a < 3; a++) {
    const angle = rot + (a * Math.PI * 2) / 3;
    ctx.beginPath();
    ctx.moveTo(px, vCenterY);
    ctx.quadraticCurveTo(
      px + Math.cos(angle) * (vRadiusX * 0.7),
      vCenterY + Math.sin(angle) * (vRadiusY * 0.7),
      px + Math.cos(angle + 0.8) * vRadiusX,
      vCenterY + Math.sin(angle + 0.8) * vRadiusY
    );
    ctx.stroke();
  }

  // Chispas que son atraídas hacia el centro del portal
  for (let s = 0; s < 4; s++) {
    const sProg = (frame * 0.05 + s * 0.25) % 1;
    const sAng = s * 1.57 + frame * 0.03;
    const sDist = (1 - sProg) * 16;
    const sx = px + Math.cos(sAng) * sDist;
    const sy = vCenterY + Math.sin(sAng) * (sDist * 1.3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawCrystalLotusFlower = drawCrystalLotusFlower;
  SpriteManager.prototype.drawShambhalaPrayerBell = drawShambhalaPrayerBell;
  SpriteManager.prototype.drawHotSpringPool = drawHotSpringPool;
  SpriteManager.prototype.drawGoldenPagodaTower = drawGoldenPagodaTower;
  SpriteManager.prototype.drawNirvanaLotusAltar = drawNirvanaLotusAltar;
  SpriteManager.prototype.drawSanctuaryPortalGate = drawSanctuaryPortalGate;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawCrystalLotusFlower,
    drawShambhalaPrayerBell,
    drawHotSpringPool,
    drawGoldenPagodaTower,
    drawNirvanaLotusAltar,
    drawSanctuaryPortalGate
  };
}

