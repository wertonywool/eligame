// ============================================================================
// ESCENA DE PREVISUALIZACIÓN: TABLA DE SURF & WATER DASH (MUNDO 3)
// ============================================================================
function drawSurfPreviewScene() {
  // Cielo soleado diurno
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 118);
  skyGrad.addColorStop(0, '#1d8cf8');
  skyGrad.addColorStop(0.6, '#4ea8de');
  skyGrad.addColorStop(1, '#90e0ef');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, 118);

  // Sol brillante
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(W - 40, 28, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 230, 109, 0.35)';
  ctx.beginPath();
  ctx.arc(W - 40, 28, 18, 0, Math.PI * 2);
  ctx.fill();

  // Mar y oleaje realista
  if (typeof drawRealisticOceanHorizon === 'function') {
    drawRealisticOceanHorizon(ctx, 118, H - 118, 0, globalFrame);
  } else {
    const seaGrad = ctx.createLinearGradient(0, 118, 0, H);
    seaGrad.addColorStop(0, '#0096c7');
    seaGrad.addColorStop(0.4, '#0077b6');
    seaGrad.addColorStop(1, '#023e8a');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, 118, W, 152);
  }

  const activeSkin = (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const activeBoard = (typeof saveState !== 'undefined' && saveState && saveState.surfboardSkin) || 'classic';

  // Títulos pixel art
  ctx.fillStyle = '#ffffff';
  ctx.font = '9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HABILIDAD: TABLA DE SURF & IMPULSO (WATER DASH)', W / 2, 22);
  ctx.fillStyle = '#ffd166';
  ctx.font = '7px "Silkscreen", monospace';
  ctx.fillText(`MUNDO 3: CIUDAD COSTERA • SKIN: ${activeSkin.toUpperCase()} • TABLA: ${activeBoard.toUpperCase()}`, W / 2, 34);

  // 1. Navegación en el agua (Surfing Normal)
  ctx.fillStyle = '#ffffff';
  ctx.font = '7px "Silkscreen", monospace';
  ctx.fillText('SURFING NORMAL (CRUISING)', 110, 56);
  window.sprites.drawMamaSurfing(ctx, 110, 94, true, false, globalFrame, activeSkin, activeBoard);

  // 2. Animación de Impulso (Water Dash con chorro de propulsión)
  ctx.fillStyle = '#ffd166';
  ctx.fillText('IMPULSO ACUATICO (WATER DASH)', 340, 56);
  window.sprites.drawMamaSurfing(ctx, 340, 94, true, true, globalFrame, activeSkin, activeBoard);

  // 3. Detalle de ingeniería de la Tabla de Surf (Zoom x2.6)
  ctx.fillStyle = '#ffffff';
  ctx.fillText('DESGLOSE: ALMA NEON • KICK-TAIL • LEASH • 3 QUILLAS', W / 2, 182);
  ctx.save();
  ctx.translate(W / 2, 206);
  ctx.scale(2.6, 2.6);
  window.sprites.drawSurfboard(ctx, 0, 0, true, 0, true, activeBoard);
  ctx.restore();

  // 4. Muestrario de la paleta oficial
  const palette = ['#0077b6', '#00b4d8', '#48cae4', '#90e0ef', '#ffd166', '#ff2a70', '#ffffff', '#14101c'];
  const startX = Math.round(W / 2 - (palette.length * 20) / 2);
  for (let i = 0; i < palette.length; i++) {
    ctx.fillStyle = palette[i];
    ctx.fillRect(startX + i * 20, 240, 16, 7);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(startX + i * 20, 240, 16, 7);
  }
  ctx.fillStyle = '#caf0f8';
  ctx.font = '6px "Silkscreen", monospace';
  ctx.fillText('PALETA OFICIAL COSTERA & NEON', W / 2, 258);

  ctx.textAlign = 'left';
}
