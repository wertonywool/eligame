// ============================================================================
// SPRITES PIXEL ART: EL FIRMAMENTO CÓSMICO Y LAS BÓVEDAS ASTRALES
// Mundo 4 - Fase 9: Decoraciones de Auroras, Constelaciones y Altares de Cometa
// ============================================================================

function drawBorealPillar(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Base ceremonial de obsidiana astral y oro celestial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 16, py - 6, 32, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 12, 28, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 16, py - 14, 32, 2);
  ctx.fillRect(px - 12, py - 16, 24, 2);

  // Grabados rúnicos dorados en la base
  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(px - 8, py - 10, 3, 3);
  ctx.fillRect(px + 5, py - 10, 3, 3);

  // 2. Fuste del Pilar de Cristal Cósmico (Luz translúcida y facetada)
  const pillarHeight = 72;
  const topY = py - 16 - pillarHeight;

  // Fondo del núcleo de cristal
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(px - 9, topY, 18, pillarHeight);

  // Bandas ondulantes de Aurora Boreal dentro del pilar (Esmeralda, Cian, Violeta, Magenta)
  for (let i = 0; i < pillarHeight; i += 3) {
    const wave = Math.sin((f * 0.08) + (i * 0.12));
    const wave2 = Math.cos((f * 0.06) + (i * 0.15));
    const offset = Math.round(wave * 3);

    // Gradiente cromático por altura
    let auroraColor = '#00f5d4'; // Turquesa / Esmeralda
    if (i < 24) {
      auroraColor = '#f72585'; // Magenta en la cúspide
    } else if (i < 48) {
      auroraColor = '#9d4edd'; // Violeta astral en el medio
    }

    ctx.fillStyle = auroraColor;
    ctx.fillRect(px - 5 + offset, topY + i, 10, 2);

    // Hilos de brillo blanco estelar
    if ((i + Math.floor(f * 0.5)) % 9 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 2 + Math.round(wave2 * 2), topY + i, 4, 1);
    }
  }

  // Bordes cristalinos exteriores y facetado
  ctx.fillStyle = 'rgba(72, 202, 228, 0.9)';
  ctx.fillRect(px - 10, topY, 2, pillarHeight);
  ctx.fillRect(px + 8, topY, 2, pillarHeight);

  // 3. Anillos orbitales flotantes de diamante estelar
  const ringY1 = topY + 22 + Math.sin(f * 0.07) * 4;
  const ringY2 = topY + 50 + Math.cos(f * 0.07) * 4;

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 13, ringY1, 26, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 11, ringY1 - 1, 4, 4);
  ctx.fillRect(px + 7, ringY1 - 1, 4, 4);

  ctx.fillStyle = '#48cae4';
  ctx.fillRect(px - 12, ringY2, 24, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, ringY2 - 1, 4, 4);

  // 4. Capitel y Cúspide de Diamante Astral
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 14, topY - 4, 28, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 12, topY - 8, 24, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 8, topY - 12, 16, 4);

  // Gran Rombo de Diamante de la Aurora en la cima
  const gemPulse = 1 + Math.sin(f * 0.1) * 0.15;
  const gSize = Math.round(7 * gemPulse);

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.moveTo(px, topY - 14 - gSize * 2);
  ctx.lineTo(px + gSize, topY - 14 - gSize);
  ctx.lineTo(px, topY - 14);
  ctx.lineTo(px - gSize, topY - 14 - gSize);
  ctx.closePath();
  ctx.fill();

  // Brillo central y destellos estelares
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, topY - 14 - gSize - 2, 4, 4);

  // Destellos estelares en cruz (Rayos de luz astral)
  const flare = 4 + Math.sin(f * 0.15) * 3;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(px - flare, topY - 14 - gSize, flare * 2, 1);
  ctx.fillRect(px, topY - 14 - gSize - flare, 1, flare * 2);

  ctx.restore();
}

function drawConstellationArch(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Pilares gemelos de mármol azul y oro celestial
  const archW = 64;
  const archH = 58;
  const leftX = px - archW / 2;
  const rightX = px + archW / 2;
  const baseY = py;

  // Bases izquierda y derecha
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(leftX - 8, baseY - 6, 16, 6);
  ctx.fillRect(rightX - 8, baseY - 6, 16, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - 8, 12, 2);
  ctx.fillRect(rightX - 6, baseY - 8, 12, 2);

  // Fustes gemelos
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(leftX - 4, baseY - archH, 8, archH - 8);
  ctx.fillRect(rightX - 4, baseY - archH, 8, archH - 8);

  // Líneas doradas de energía en los fustes
  ctx.fillStyle = '#48cae4';
  ctx.fillRect(leftX - 1, baseY - archH + 4, 2, archH - 14);
  ctx.fillRect(rightX - 1, baseY - archH + 4, 2, archH - 14);

  // Capiteles
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - archH - 3, 12, 3);
  ctx.fillRect(rightX - 6, baseY - archH - 3, 12, 3);

  // 2. Arco Ojival de Constelaciones (Curva estelar con estrellas conectadas)
  const archTopY = baseY - archH - 18;
  const midX = px;

  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX, baseY - archH);
  ctx.quadraticCurveTo(midX, archTopY, rightX, baseY - archH);
  ctx.stroke();

  // Segundo arco exterior de aurora turquesa
  ctx.strokeStyle = 'rgba(0, 245, 212, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX - 3, baseY - archH + 2);
  ctx.quadraticCurveTo(midX, archTopY - 4, rightX + 3, baseY - archH + 2);
  ctx.stroke();

  // 3. Estrellas zodiacales incrustadas en el arco
  const starPoints = [
    { x: leftX + 4, y: baseY - archH - 6 },
    { x: leftX + 14, y: baseY - archH - 12 },
    { x: midX - 12, y: archTopY + 3 },
    { x: midX, y: archTopY },
    { x: midX + 12, y: archTopY + 3 },
    { x: rightX - 14, y: baseY - archH - 12 },
    { x: rightX - 4, y: baseY - archH - 6 }
  ];

  starPoints.forEach((sp, idx) => {
    const starBlink = (Math.sin(f * 0.12 + idx * 1.2) > 0);
    ctx.fillStyle = starBlink ? '#ffffff' : '#ffd166';
    ctx.fillRect(sp.x - 2, sp.y - 2, 4, 4);

    // Hilos de constelación conectados
    if (idx > 0) {
      ctx.strokeStyle = 'rgba(255, 209, 102, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(starPoints[idx - 1].x, starPoints[idx - 1].y);
      ctx.lineTo(sp.x, sp.y);
      ctx.stroke();
    }
  });

  // 4. Gran Esfera de Nebulosa Central suspendida en el arco
  const sphereY = archTopY + 12 + Math.sin(f * 0.08) * 3;

  // Halo difuso
  const haloRad = 9 + Math.sin(f * 0.1) * 2;
  const haloGrad = ctx.createRadialGradient(midX, sphereY, 2, midX, sphereY, haloRad);
  haloGrad.addColorStop(0, 'rgba(247, 37, 133, 0.8)');
  haloGrad.addColorStop(0.5, 'rgba(157, 78, 221, 0.4)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(midX, sphereY, haloRad, 0, Math.PI * 2);
  ctx.fill();

  // Esfera de cuarzo violeta
  ctx.fillStyle = '#7209b7';
  ctx.beginPath();
  ctx.arc(midX, sphereY, 6, 0, Math.PI * 2);
  ctx.fill();

  // Núcleo estelar blanco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(midX - 2, sphereY - 2, 4, 4);

  // Micro-destellos
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(midX - 4, sphereY, 1, 1);
  ctx.fillRect(midX + 3, sphereY, 1, 1);

  ctx.restore();
}

function drawCometAltar(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Basamento de meteorito astral facetado
  ctx.fillStyle = '#0b091a';
  ctx.beginPath();
  ctx.moveTo(px - 22, py);
  ctx.lineTo(px - 18, py - 8);
  ctx.lineTo(px + 18, py - 8);
  ctx.lineTo(px + 22, py);
  ctx.closePath();
  ctx.fill();

  // Ribetes dorados en la base
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 18, py - 9, 36, 2);

  // Cuerpo del altar con grietas de fuego cósmico
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px - 14, py - 22, 28, 13);

  // Fisuras resplandecientes cian y violeta
  ctx.fillStyle = '#00f5d4';
  ctx.fillRect(px - 10, py - 18, 5, 2);
  ctx.fillRect(px - 6, py - 16, 4, 2);
  ctx.fillRect(px + 4, py - 20, 6, 2);
  ctx.fillRect(px + 2, py - 14, 5, 2);

  // Mesa superior de ofrendas
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px - 16, py - 25, 32, 3);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 18, py - 27, 36, 2);

  // 2. Copa ceremonial / Cuenco de stardust
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 27);
  ctx.lineTo(px - 12, py - 33);
  ctx.lineTo(px + 12, py - 33);
  ctx.lineTo(px + 10, py - 27);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(px - 9, py - 32, 18, 2);

  // 3. Fuego de Cometa Pulsante Flotante (Llama cósmica azul, verde y blanca)
  const flameY = py - 36 + Math.sin(f * 0.12) * 3;
  const flameH = 12 + Math.cos(f * 0.15) * 3;

  // Llama exterior turquesa
  ctx.fillStyle = 'rgba(0, 245, 212, 0.8)';
  ctx.beginPath();
  ctx.moveTo(px - 7, flameY);
  ctx.quadraticCurveTo(px, flameY - flameH, px + 7, flameY);
  ctx.closePath();
  ctx.fill();

  // Llama intermedia violeta
  ctx.fillStyle = 'rgba(157, 78, 221, 0.9)';
  ctx.beginPath();
  ctx.moveTo(px - 4, flameY);
  ctx.quadraticCurveTo(px, flameY - (flameH * 0.75), px + 4, flameY);
  ctx.closePath();
  ctx.fill();

  // Núcleo blanco incandescente
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 2, flameY);
  ctx.quadraticCurveTo(px, flameY - (flameH * 0.45), px + 2, flameY);
  ctx.closePath();
  ctx.fill();

  // 4. Micro-cometas que orbitan la llama
  for (let c = 0; c < 2; c++) {
    const cometAngle = (f * 0.08) + (c * Math.PI);
    const cx = px + Math.cos(cometAngle) * 14;
    const cy = flameY - 4 + Math.sin(cometAngle) * 5;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 3, 3);

    // Estela del micro-cometa
    const tx = px + Math.cos(cometAngle - 0.3) * 14;
    const ty = flameY - 4 + Math.sin(cometAngle - 0.3) * 5;
    ctx.fillStyle = 'rgba(72, 202, 228, 0.6)';
    ctx.fillRect(Math.round(tx), Math.round(ty), 2, 2);
  }

  ctx.restore();
}

function drawNebulaGardenFlora(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Tallo y zarcillos de cristal bioluminiscente
  const stemWave = Math.sin(f * 0.08) * 3;
  ctx.strokeStyle = '#00f5d4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.quadraticCurveTo(px + stemWave, py - 14, px, py - 26);
  ctx.stroke();

  // Hojas astrales de rocío lunar
  ctx.fillStyle = 'rgba(72, 202, 228, 0.7)';
  ctx.beginPath();
  ctx.ellipse(px - 6 + stemWave * 0.5, py - 12, 5, 2, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(px + 6 + stemWave * 0.5, py - 18, 5, 2, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  // 2. Corola de Pétalos de Nebulosa (Púrpura, Magenta y Oro)
  const flowerY = py - 26;
  const pulse = 1 + Math.sin(f * 0.1) * 0.12;

  // Pétalos exteriores magenta translúcido
  ctx.fillStyle = 'rgba(247, 37, 133, 0.75)';
  for (let i = 0; i < 5; i++) {
    const angle = (i * (Math.PI * 2 / 5)) + (f * 0.02);
    const petX = px + Math.cos(angle) * (11 * pulse);
    const petY = flowerY + Math.sin(angle) * (9 * pulse);
    ctx.beginPath();
    ctx.arc(petX, petY, 5 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores violeta cósmico
  ctx.fillStyle = 'rgba(157, 78, 221, 0.85)';
  for (let i = 0; i < 5; i++) {
    const angle = (i * (Math.PI * 2 / 5)) + (f * 0.02) + 0.3;
    const petX = px + Math.cos(angle) * (6 * pulse);
    const petY = flowerY + Math.sin(angle) * (5 * pulse);
    ctx.beginPath();
    ctx.arc(petX, petY, 3.5 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Pistilo y Estambres de Polvo Estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, flowerY - 2, 4, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 1, flowerY - 1, 2, 2);

  // Esporas de polen estelar flotantes
  for (let s = 0; s < 3; s++) {
    const sporeAngle = (f * 0.09) + (s * 2.1);
    const sx = px + Math.cos(sporeAngle) * (15 + s * 2);
    const sy = flowerY - 6 + Math.sin(sporeAngle) * (10 + s);
    ctx.fillStyle = (s % 2 === 0) ? '#fff3b0' : '#00f5d4';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }

  ctx.restore();
}

function drawShootingStarArch(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  const w = 56;
  const h = 48;
  const leftX = px - w / 2;
  const rightX = px + w / 2;

  // 1. Columnas esbeltas de oro blanco
  ctx.fillStyle = '#334155';
  ctx.fillRect(leftX - 4, py - 4, 8, 4);
  ctx.fillRect(rightX - 4, py - 4, 8, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 2, py - h, 4, h - 4);
  ctx.fillRect(rightX - 2, py - h, 4, h - 4);

  // 2. Arco parabólico de estelas de meteorito
  const arcPeakY = py - h - 16;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX, py - h);
  ctx.quadraticCurveTo(px, arcPeakY, rightX, py - h);
  ctx.stroke();

  // Estela inferior de luz cian
  ctx.strokeStyle = 'rgba(0, 245, 212, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX + 2, py - h + 2);
  ctx.quadraticCurveTo(px, arcPeakY + 4, rightX - 2, py - h + 2);
  ctx.stroke();

  // 3. Media luna celestial y estrella fugaz en la cúspide
  const moonY = arcPeakY + 2 + Math.sin(f * 0.07) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px, moonY, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(px + 2.5, moonY - 1, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Estrella fulgurante al centro del arco
  const starPulse = (Math.sin(f * 0.15) > 0);
  ctx.fillStyle = starPulse ? '#ffffff' : '#ffd166';
  ctx.fillRect(px - 1, moonY - 1, 3, 3);

  // Destellos estelares cayendo
  for (let i = 0; i < 3; i++) {
    const sparkX = leftX + 8 + (i * 18) + Math.sin(f * 0.1 + i) * 3;
    const sparkY = py - h + 4 + ((f * 0.8 + i * 12) % 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(Math.round(sparkX), Math.round(sparkY), 2, 2);
  }

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBorealPillar = drawBorealPillar;
  SpriteManager.prototype.drawConstellationArch = drawConstellationArch;
  SpriteManager.prototype.drawCometAltar = drawCometAltar;
  SpriteManager.prototype.drawNebulaGardenFlora = drawNebulaGardenFlora;
  SpriteManager.prototype.drawShootingStarArch = drawShootingStarArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawBorealPillar,
    drawConstellationArch,
    drawCometAltar,
    drawNebulaGardenFlora,
    drawShootingStarArch
  };
}
