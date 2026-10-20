// ============================================================================
// SPRITES MUNDO 4 - FASE 8: EL MONTE KAILASH Y EL REINO ASTRAL (PIXEL ART)
// ============================================================================

// 1. Chorten Sagrado del Monte Kailash (Estupa tibetana con sedas rituales Khata)
function drawKailashChorten(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 42;
  const h = 64;

  // Base escalonada de piedra sagrada y marmol
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 16, py - 14, 32, 8);
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(px - 14, py - 13, 28, 2);

  // Cuerpo semiesferico blanco inmaculado (Bumpa)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px, py - 24, 14, Math.PI, 0, false);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - 12, py - 24, 24, 3);

  // Hornacina dorada con gema astral
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 4, py - 23, 8, 8);
  const gemGlow = Math.sin(frame * 0.12) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + gemGlow.toFixed(2) + ')';
  ctx.fillRect(px - 2, py - 21, 4, 4);

  // Sedas rituales Khata ondeando
  const wave = Math.sin(frame * 0.09) * 2;
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 14, py - 18);
  ctx.quadraticCurveTo(px - 18 + wave, py - 12, px - 20 + wave, py - 6);
  ctx.stroke();

  ctx.strokeStyle = '#93c5fd';
  ctx.beginPath();
  ctx.moveTo(px + 14, py - 18);
  ctx.quadraticCurveTo(px + 18 - wave, py - 12, px + 20 - wave, py - 6);
  ctx.stroke();

  // Capitel dorado y anillos conicos de sabiduria (13 anillos rituales)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 7, py - 30, 14, 6);
  ctx.fillStyle = '#fbbf24';
  for (let i = 0; i < 6; i++) {
    const rw = 12 - i * 1.6;
    ctx.fillRect(px - Math.floor(rw / 2), py - 32 - i * 3, Math.round(rw), 2);
  }

  // Sombrilla ceremonial y Pinaculo Sol y Luna
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 9, py - 52, 18, 3);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 7, py - 51, 14, 1);

  // Aguja superior
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 1, py - 60, 2, 8);
  // Luna creciente y disco solar
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 61, 3, 0, Math.PI * 2);
  ctx.fill();

  // Particulas de incienso que ascienden
  const inc = (frame * 0.05) % 1;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (1 - inc * 0.8).toFixed(2) + ')';
  ctx.fillRect(px - 2 + Math.sin(frame * 0.1) * 3, py - 64 - inc * 16, 2, 2);
}

// 2. Cristal Astral de Kailash (Gemas de cuarzo cosmico flotantes)
function drawAstralStarCrystal(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Levitacion armonica
  const floatY = Math.sin(frame * 0.08) * 3;
  const cy = py - 16 + floatY;

  // Halo astral violeta y cian
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  const grad = ctx.createRadialGradient(px, cy, 2, px, cy, 20);
  grad.addColorStop(0, 'rgba(192, 132, 252, ' + (glow * 0.5).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(56, 189, 248, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, cy, 20, 0, Math.PI * 2);
  ctx.fill();

  // Cristal central romboidal
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.moveTo(px, cy - 14);
  ctx.lineTo(px + 7, cy);
  ctx.lineTo(px, cy + 14);
  ctx.lineTo(px - 7, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px, cy - 14);
  ctx.lineTo(px + 4, cy);
  ctx.lineTo(px, cy + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, cy - 10, 2, 4);

  // Dos cristales satelites en orbita
  const orbRot = frame * 0.06;
  for (let s = 0; s < 2; s++) {
    const ang = orbRot + s * Math.PI;
    const sx = px + Math.cos(ang) * 14;
    const sy = cy + Math.sin(ang) * 6;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(sx - 2, sy - 3, 4, 6);
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(sx - 1, sy - 2, 2, 2);
  }
}

// 3. Puente del Arcoiris de Kailash (Estructura de luz prismatica)
function drawRainbowBridge(ctx, x, y, w = 180, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Espectro de luz cromatica en gradiente horizontal
  const colors = [
    'rgba(239, 68, 68, 0.75)',   // Rojo
    'rgba(249, 115, 22, 0.75)',  // Naranja
    'rgba(234, 179, 8, 0.8)',    // Amarillo
    'rgba(34, 197, 94, 0.8)',    // Verde
    'rgba(6, 182, 212, 0.85)',   // Cian
    'rgba(59, 130, 246, 0.85)',  // Azul
    'rgba(168, 85, 247, 0.8)'    // Violeta
  ];

  const barH = 2;
  for (let c = 0; c < colors.length; c++) {
    ctx.fillStyle = colors[c];
    ctx.fillRect(px, py + c * barH, w, barH);
  }

  // Brillo estelar pulsante en la superficie
  const pulse = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (pulse * 0.6).toFixed(2) + ')';
  ctx.fillRect(px, py - 1, w, 1);

  // Destellos estelares sobre el arcoiris
  for (let s = 0; s < 5; s++) {
    const sTime = (frame * 0.04 + s * 0.2) % 1;
    const sx = px + sTime * w;
    const sy = py + (Math.sin(s * 2 + frame * 0.08) * 4) + 6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

// 4. Palacio de Cristal de Agartha (Ciudadela celestial de cuarzo y oro)
function drawAgarthaCrystalPalace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;
  const h = 80;

  // Pedestal y escalinatas de marmol sagrado
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  // Nivel 1: Columnas de lapislazuli y gran portal ojival
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(px - 22, py - 30, 6, 24);
  ctx.fillRect(px + 16, py - 30, 6, 24);
  ctx.fillRect(px - 16, py - 28, 32, 22);

  // Portal ojival con energia cosmica interior
  const portalGlow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(192, 132, 252, ' + portalGlow.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - 18, 9, Math.PI, 0);
  ctx.lineTo(px + 9, py - 6);
  ctx.lineTo(px - 9, py - 6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 1, py - 20, 2, 14);

  // Cornisa y tejadillo de oro y lapislazuli
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 26, py - 32, 52, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px - 24, py - 34, 48, 2);

  // Nivel 2: Baluarte de cristales facetados y agujas de cuarzo
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(px - 15, py - 54, 30, 20);

  // Agujas laterales de cristal de cuarzo
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px - 20, py - 32);
  ctx.lineTo(px - 15, py - 52);
  ctx.lineTo(px - 10, py - 32);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 10, py - 32);
  ctx.lineTo(px + 15, py - 52);
  ctx.lineTo(px + 20, py - 32);
  ctx.closePath();
  ctx.fill();

  // Celosia de diamante estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py - 48, 8, 8);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 2, py - 46, 4, 4);

  // Aguja central y gran diamante de Agartha
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - 54);
  ctx.lineTo(px, py - 72);
  ctx.lineTo(px + 12, py - 54);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 54);
  ctx.lineTo(px, py - 72);
  ctx.lineTo(px + 4, py - 54);
  ctx.closePath();
  ctx.fill();

  // Gran gema cumbrera de Agartha pulsante
  const gemPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + gemPulse.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - 75, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 76, 2, 2);
}

// 5. Trono Celestial de las Estrellas (Altar del Hijo del Santuario)
function drawCelestialStarThrone(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 52;

  // Base de marmol celestial y oro con molduras sagradas
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - Math.floor(w / 2), py - 7, w, 7);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 6, w - 4, 2);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 4, py - 4, w - 8, 2);

  // Respaldo de alas de cristal de luna
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px - 18, py - 7);
  ctx.quadraticCurveTo(px - 24, py - 26, px - 12, py - 32);
  ctx.lineTo(px - 8, py - 7);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 18, py - 7);
  ctx.quadraticCurveTo(px + 24, py - 26, px + 12, py - 32);
  ctx.lineTo(px + 8, py - 7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 10, py - 24, 20, 17);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 3, py - 28, 6, 6);

  // Halo de luz estelar rotatorio
  const rot = frame * 0.08;
  const haloGlow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  const hGrad = ctx.createRadialGradient(px, py - 18, 2, px, py - 18, 24);
  hGrad.addColorStop(0, 'rgba(254, 240, 138, ' + (haloGlow * 0.45).toFixed(2) + ')');
  hGrad.addColorStop(0.6, 'rgba(192, 132, 252, ' + (haloGlow * 0.25).toFixed(2) + ')');
  hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hGrad;
  ctx.beginPath();
  ctx.arc(px, py - 18, 24, 0, Math.PI * 2);
  ctx.fill();
}

// 6. Gran Portal Cosmico a la Madriguera (Portal dimensional supremo)
function drawCosmicBurrowPortal(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46;
  const h = 60;

  // Columnas doradas con motivos de nubes y relampagos cosmicos
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - Math.floor(w / 2), py - h, 6, h);
  ctx.fillRect(px + Math.floor(w / 2) - 6, py - h, 6, h);

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - Math.floor(w / 2) + 1, py - h + 2, 4, h - 4);
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - h + 2, 4, h - 4);

  // Dintel superior ceremonial
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - Math.floor(w / 2) - 3, py - h - 5, w + 6, 7);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - Math.floor(w / 2) - 1, py - h - 4, w + 2, 2);

  // Centro del vortice galactico dimensional
  const vRadX = 14;
  const vRadY = 22;
  const vCenterY = py - Math.floor(h / 2);

  const grad = ctx.createRadialGradient(px, vCenterY, 1, px, vCenterY, vRadY);
  grad.addColorStop(0, '#fef08a');
  grad.addColorStop(0.3, '#38bdf8');
  grad.addColorStop(0.65, '#a855f7');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(px, vCenterY, vRadX, vRadY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazos de galaxia espiral en rotacion
  const rot = frame * 0.09;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  for (let a = 0; a < 3; a++) {
    const ang = rot + (a * Math.PI * 2) / 3;
    ctx.beginPath();
    ctx.moveTo(px, vCenterY);
    ctx.quadraticCurveTo(
      px + Math.cos(ang) * (vRadX * 0.7),
      vCenterY + Math.sin(ang) * (vRadY * 0.7),
      px + Math.cos(ang + 0.9) * vRadX,
      vCenterY + Math.sin(ang + 0.9) * vRadY
    );
    ctx.stroke();
  }

  // Particulas cosmicas absorbidas por el portal
  for (let p = 0; p < 4; p++) {
    const pProg = (frame * 0.05 + p * 0.25) % 1;
    const pDist = (1 - pProg) * 16;
    const pAng = p * 1.57 + frame * 0.04;
    ctx.fillStyle = (p % 2 === 0) ? '#fde047' : '#67e8f9';
    ctx.fillRect(px + Math.cos(pAng) * pDist, vCenterY + Math.sin(pAng) * (pDist * 1.3), 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKailashChorten = drawKailashChorten;
  SpriteManager.prototype.drawAstralStarCrystal = drawAstralStarCrystal;
  SpriteManager.prototype.drawRainbowBridge = drawRainbowBridge;
  SpriteManager.prototype.drawAgarthaCrystalPalace = drawAgarthaCrystalPalace;
  SpriteManager.prototype.drawCelestialStarThrone = drawCelestialStarThrone;
  SpriteManager.prototype.drawCosmicBurrowPortal = drawCosmicBurrowPortal;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawKailashChorten,
    drawAstralStarCrystal,
    drawRainbowBridge,
    drawAgarthaCrystalPalace,
    drawCelestialStarThrone,
    drawCosmicBurrowPortal
  };
}

