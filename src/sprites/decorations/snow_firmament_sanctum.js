// ============================================================================
// SPRITES PIXEL ART: EL SANCTUM SANCTORUM DE LA ESTRELLA POLAR
// Mundo 4 - Fase 9 Parte 3: Trono de Polaris, Templo Cósmico y Portal Supremo
// ============================================================================

function drawPolarisThrone(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Basamento escalonado de mármol astral y oro celestial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 22, py - 6, 44, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 18, py - 12, 36, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 20, py - 14, 40, 2);
  ctx.fillRect(px - 16, py - 16, 32, 2);

  // 2. Alas celestiales de cristal de luna (Respaldo del Trono)
  const wingPulse = Math.sin(f * 0.08) * 2;
  ctx.fillStyle = 'rgba(72, 202, 228, 0.85)';
  // Ala izquierda
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 16);
  ctx.lineTo(px - 26, py - 38 + wingPulse);
  ctx.lineTo(px - 22, py - 52 + wingPulse);
  ctx.lineTo(px - 6, py - 36);
  ctx.closePath();
  ctx.fill();

  // Ala derecha
  ctx.beginPath();
  ctx.moveTo(px + 10, py - 16);
  ctx.lineTo(px + 26, py - 38 + wingPulse);
  ctx.lineTo(px + 22, py - 52 + wingPulse);
  ctx.lineTo(px + 6, py - 36);
  ctx.closePath();
  ctx.fill();

  // Ribetes dorados en las alas
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 22, py - 52 + wingPulse);
  ctx.lineTo(px - 26, py - 38 + wingPulse);
  ctx.lineTo(px - 10, py - 16);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(px + 22, py - 52 + wingPulse);
  ctx.lineTo(px + 26, py - 38 + wingPulse);
  ctx.lineTo(px + 10, py - 16);
  ctx.stroke();

  // 3. Respaldo central del Trono de Cuarzo y Oro
  ctx.fillStyle = '#0b091a';
  ctx.fillRect(px - 12, py - 46, 24, 30);
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px - 10, py - 44, 20, 28);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 12, py - 48, 24, 2);

  // Cojín de terciopelo cósmico índigo
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px - 10, py - 22, 20, 6);
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(px - 8, py - 20, 16, 2);

  // 4. Gran Corona de la Estrella Polar en la Cima
  const starTopY = py - 56;
  const starPulse = 1 + Math.sin(f * 0.12) * 0.15;
  const sRad = Math.round(6 * starPulse);

  // Halo radial de starlight
  const haloRad = 12 + Math.sin(f * 0.1) * 3;
  const haloGrad = ctx.createRadialGradient(px, starTopY, 2, px, starTopY, haloRad);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  haloGrad.addColorStop(0.4, 'rgba(0, 245, 212, 0.6)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(px, starTopY, haloRad, 0, Math.PI * 2);
  ctx.fill();

  // Gran Rombo de Diamante de Polaris
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px, starTopY - sRad * 2);
  ctx.lineTo(px + sRad, starTopY);
  ctx.lineTo(px, starTopY + sRad * 2);
  ctx.lineTo(px - sRad, starTopY);
  ctx.closePath();
  ctx.fill();

  // Destellos estelares en cruz (Rayos de luz polar)
  const rayLen = 8 + Math.sin(f * 0.15) * 4;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - rayLen, starTopY);
  ctx.lineTo(px + rayLen, starTopY);
  ctx.moveTo(px, starTopY - rayLen);
  ctx.lineTo(px, starTopY + rayLen);
  ctx.stroke();

  ctx.restore();
}

function drawCosmicNebulaSanctum(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  const sanctumW = 96;
  const sanctumH = 84;
  const baseY = py;
  const leftX = px - sanctumW / 2;

  // 1. Podio de la Ciudadela Celestial
  ctx.fillStyle = '#0b091a';
  ctx.fillRect(leftX, baseY - 8, sanctumW, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX + 4, baseY - 10, sanctumW - 8, 2);

  // 2. Columnas cuádruples de mármol azul y oro
  const colX = [leftX + 10, leftX + 28, leftX + sanctumW - 36, leftX + sanctumW - 18];
  colX.forEach(cx => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 4, baseY - sanctumH + 16, 8, sanctumH - 26);
    ctx.fillStyle = '#00f5d4';
    ctx.fillRect(cx - 1, baseY - sanctumH + 20, 2, sanctumH - 34);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(cx - 5, baseY - sanctumH + 14, 10, 2);
  });

  // 3. Ventanal Ojival Central con Nebulosa en Movimiento
  const windowW = 32;
  const windowH = 46;
  const winX = px - windowW / 2;
  const winY = baseY - windowH - 12;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(winX, winY, windowW, windowH);

  // Espiral de galaxia dentro del ventanal
  const galaxyGrad = ctx.createRadialGradient(px, winY + 24, 2, px, winY + 24, 16);
  galaxyGrad.addColorStop(0, '#f72585');
  galaxyGrad.addColorStop(0.5, '#7209b7');
  galaxyGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = galaxyGrad;
  ctx.beginPath();
  ctx.arc(px, winY + 24, 14, 0, Math.PI * 2);
  ctx.fill();

  // Partículas estelares en rotación
  for (let i = 0; i < 4; i++) {
    const starAngle = (f * 0.06) + (i * (Math.PI / 2));
    const sx = px + Math.cos(starAngle) * (8 + i * 1.5);
    const sy = winY + 24 + Math.sin(starAngle) * (5 + i);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }

  // Marco de oro del ventanal
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.strokeRect(winX, winY, windowW, windowH);

  // 4. Techo de Pagoda Celestial y Cúpula de Cristal
  const roofY = baseY - sanctumH + 14;
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(leftX - 6, roofY);
  ctx.lineTo(leftX + 8, roofY - 14);
  ctx.lineTo(leftX + sanctumW - 8, roofY - 14);
  ctx.lineTo(leftX + sanctumW + 6, roofY);
  ctx.closePath();
  ctx.fill();

  // Aleros dorados con campanas celestes
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 8, roofY - 2, sanctumW + 16, 3);
  ctx.fillRect(leftX + 6, roofY - 16, sanctumW - 12, 2);

  // Aguja cumbrera con diamante estelar
  const spireTopY = roofY - 28;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, roofY - 16);
  ctx.lineTo(px, spireTopY);
  ctx.stroke();

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.arc(px, spireTopY - 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, spireTopY - 5, 2, 2);

  ctx.restore();
}

function drawSanctumBurrowGate(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Columnas ceremoniales doradas con nubes tibetanas
  const gateW = 60;
  const gateH = 68;
  const leftX = px - gateW / 2;
  const rightX = px + gateW / 2;
  const baseY = py;

  // Bases izquierda y derecha
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(leftX - 8, baseY - 8, 16, 8);
  ctx.fillRect(rightX - 8, baseY - 8, 16, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - 10, 12, 2);
  ctx.fillRect(rightX - 6, baseY - 10, 12, 2);

  // Columnas verticales de oro
  ctx.fillStyle = '#eab308';
  ctx.fillRect(leftX - 4, baseY - gateH, 8, gateH - 10);
  ctx.fillRect(rightX - 4, baseY - gateH, 8, gateH - 10);

  // Dintel ceremonial superior
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 8, baseY - gateH - 4, gateW + 16, 6);
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(leftX - 4, baseY - gateH - 10, gateW + 8, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX, baseY - gateH - 12, gateW, 2);

  // 2. Vórtice Dimensional Cósmico a la Madriguera (Tricromático en rotación)
  const portalCenterX = px;
  const portalCenterY = baseY - (gateH / 2) - 2;
  const portalRadX = 22;
  const portalRadY = 30;

  // Capa exterior de energía cósmica púrpura
  ctx.fillStyle = 'rgba(114, 9, 183, 0.85)';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX, portalRadY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Capa intermedia de torbellino turquesa
  ctx.fillStyle = 'rgba(0, 245, 212, 0.75)';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX * 0.75, portalRadY * 0.75, Math.sin(f * 0.05) * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Núcleo blanco y dorado hiperdimensional
  const pulseCore = 1 + Math.sin(f * 0.1) * 0.2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, 8 * pulseCore, 12 * pulseCore, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazo espiral de galaxia absorbiendo partículas hacia la Madriguera
  for (let i = 0; i < 6; i++) {
    const spiralAngle = (f * 0.08) + (i * (Math.PI / 3));
    const dist = 6 + ((f * 0.5 + i * 4) % 18);
    const sx = portalCenterX + Math.cos(spiralAngle) * dist;
    const sy = portalCenterY + Math.sin(spiralAngle) * (dist * 1.3);

    ctx.fillStyle = (i % 2 === 0) ? '#ffd166' : '#ffffff';
    ctx.fillRect(Math.round(sx) - 1, Math.round(sy) - 1, 2, 2);
  }

  // Resplandor exterior pulsante
  ctx.strokeStyle = 'rgba(255, 209, 102, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX + 2, portalRadY + 2, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawPolarisThrone = drawPolarisThrone;
  SpriteManager.prototype.drawCosmicNebulaSanctum = drawCosmicNebulaSanctum;
  SpriteManager.prototype.drawSanctumBurrowGate = drawSanctumBurrowGate;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawPolarisThrone,
    drawCosmicNebulaSanctum,
    drawSanctumBurrowGate
  };
}
