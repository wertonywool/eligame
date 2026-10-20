// ============================================================================
// SPRITES MUNDO 4 - FASE 5: DECORACIONES DE LA CIMA DEL EVEREST (PIXEL ART)
// ============================================================================
// 1. Monumento de la Gran Cima del Everest 8848m (drawSummitVictoryMonument)
// 2. Anclajes y cuerdas técnicas del Paso de Hillary (drawHillaryStepRopes)
// 3. Tienda de asalto de alta montaña para la Zona de la Muerte (drawAssaultTent)
// 4. Nido térmico de plumas y cojín dorado para el Hijo Ratoncito (drawSummitNest)

function drawSummitVictoryMonument(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;

  // 1. Base escalonada de permafrost y piedras sagradas del Himalaya
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 4, w + 8, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 12, w, 8);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 4, py - 20, w - 8, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 10, py - 26, w - 20, 6);

  // Manto de nieve perpetua sobre las cornisas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, py - 13, w + 4, 2);
  ctx.fillRect(px + 2, py - 21, w - 4, 2);
  ctx.fillRect(px + 8, py - 27, w - 16, 2);

  // 2. Placa dorada grabada "8848M"
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 14, py - 18, 26, 7);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 15, py - 17, 24, 5);
  ctx.fillStyle = '#78350f';
  // Texto pixelado "8848"
  ctx.fillRect(px + 17, py - 16, 3, 3);
  ctx.fillRect(px + 22, py - 16, 3, 3);
  ctx.fillRect(px + 27, py - 16, 2, 3);
  ctx.fillRect(px + 31, py - 16, 3, 3);

  // 3. Mástil central de la victoria (acero pulido de expedición)
  const mastX = px + Math.floor(w / 2);
  const mastTop = py - 46;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(mastX - 2, mastTop, 4, 32);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(mastX - 1, mastTop, 2, 32);

  // Remate dorado esférico del mástil
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(mastX, mastTop, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 4. Gran Bandera de la Cumbre ondeando al viento polar (Rojo y Oro)
  const wave = Math.sin(frame * 0.18) * 3;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(mastX + 2, mastTop + 2);
  ctx.lineTo(mastX + 26, mastTop + 2 + wave);
  ctx.lineTo(mastX + 22, mastTop + 14 + wave);
  ctx.lineTo(mastX + 2, mastTop + 14);
  ctx.closePath();
  ctx.fill();

  // Emblema dorado del Monte Everest en la bandera
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.moveTo(mastX + 10, mastTop + 11 + wave * 0.5);
  ctx.lineTo(mastX + 14, mastTop + 5 + wave * 0.5);
  ctx.lineTo(mastX + 18, mastTop + 11 + wave * 0.5);
  ctx.closePath();
  ctx.fill();

  // 5. Cuerdas radiales de banderines tibetanos (5 colores sagrados)
  const colors = ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'];
  // Vuelo hacia la izquierda
  for (let i = 0; i < 5; i++) {
    const fx = mastX - 6 - i * 6;
    const fy = mastTop + 16 + i * 4;
    ctx.fillStyle = colors[i];
    ctx.fillRect(fx, fy, 4, 3);
  }
  // Vuelo hacia la derecha
  for (let i = 0; i < 5; i++) {
    const fx = mastX + 6 + i * 6;
    const fy = mastTop + 16 + i * 4;
    ctx.fillStyle = colors[i];
    ctx.fillRect(fx, fy, 4, 3);
  }

  // Cuerdas de soporte
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(mastX, mastTop + 14);
  ctx.lineTo(px - 6, py - 4);
  ctx.moveTo(mastX, mastTop + 14);
  ctx.lineTo(px + w + 6, py - 4);
  ctx.stroke();
}

function drawHillaryStepRopes(ctx, x, y, h = 64, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const height = Math.max(36, Math.round(h));

  // Piqueta de roca y cuñas de titanio
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 7, 5);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - 1, py - 6, 3, 3);

  // Doble cuerda fija (Amarillo de alta montaña y Azul cielo)
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(px, py - 4);
  ctx.lineTo(px + 2, py - height);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 2);
  ctx.lineTo(px + 5, py - height + 2);
  ctx.stroke();

  // Mosquetones con seguro y bloqueador jumar
  const my = py - Math.round(height * 0.45);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 1, my, 5, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, my + 1, 2, 2);

  // Carámbanos en el anclaje
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px + 1, py - 1);
  ctx.lineTo(px + 3, py - 1);
  ctx.lineTo(px + 2, py + 4);
  ctx.closePath();
  ctx.fill();
}

function drawAssaultTent(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 44;
  const h = 22;

  // Piedras lastre contra el viento huracanado
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - 4, 6, 4);
  ctx.fillRect(px + w - 2, py - 4, 6, 4);

  // Manto de nieve que sella la base
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px - 2, py - 3, w + 4, 3);

  // Cúpula aerodinámica de asalto (Rojo de rescate y Amarillo ártico)
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2), h, 0, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2) - 2, h - 2, 0, Math.PI, 0);
  ctx.fill();

  // Puerta de cremallera redonda con linterna interior
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, 6, 12, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + Math.floor(w / 2) - 2, py - 10, 4, 8);

  // Vientos tensores diagonales
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 12);
  ctx.lineTo(px - 6, py);
  ctx.moveTo(px + w - 4, py - 12);
  ctx.lineTo(px + w + 6, py);
  ctx.stroke();
}

function drawSummitNest(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 32;

  // 1. Zócalo ceremonial dorado
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 2, py - 2, w + 4, 3);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py - 4, w, 2);

  // 2. Cojín de seda budista escarlata y bordado dorado
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 4, Math.floor(w / 2) - 1, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 5, Math.floor(w / 2) - 4, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Plumón de ganso ártico blanco y suave
  ctx.fillStyle = '#f8fafc';
  for (let i = 0; i < 6; i++) {
    const fx = px + 4 + i * 4;
    const fy = py - 7 + Math.sin(i * 1.5) * 1.5;
    ctx.fillRect(fx, fy, 3, 2);
  }

  // 4. Suave aura dorada de protección
  const glow = Math.sin(frame * 0.1) * 0.15 + 0.35;
  ctx.fillStyle = 'rgba(251, 191, 36, ' + glow.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py - 8, 18, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSummitVictoryMonument = drawSummitVictoryMonument;
  SpriteManager.prototype.drawHillaryStepRopes = drawHillaryStepRopes;
  SpriteManager.prototype.drawAssaultTent = drawAssaultTent;
  SpriteManager.prototype.drawSummitNest = drawSummitNest;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSummitVictoryMonument,
    drawHillaryStepRopes,
    drawAssaultTent,
    drawSummitNest
  };
}
