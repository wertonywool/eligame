// ============================================================================
// SPRITES MUNDO 4 - FASE 5: DECORACIONES DE ALTA MONTAÑA Y CUMBRE (PIXEL ART)
// ============================================================================
// 1. Puente de escaleras de aluminio sobre grietas del Khumbu (drawAluminumLadderBridge)
// 2. Depósito de botellas de oxígeno de alta montaña (drawOxygenDepot)
// 3. Estación de anclaje de cuerdas fijas y mosquetones (drawFixedRopesAnchor)
// 4. Mástil meteorológico de alta cota con anemómetro giratorio (drawWeatherStationMast)
// 5. Hito sagrado de piedras apiladas y cintas votivas (drawPrayerCairn)

function drawAluminumLadderBridge(ctx, x, y, len = 64, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = Math.max(32, Math.round(len));

  // 1. Estacas y placas de anclaje de acero en los extremos de la grieta
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 6, 6, 8);
  ctx.fillRect(px + w - 2, py - 6, 6, 8);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 3, py - 8, 4, 3); // Clavija de hielo
  ctx.fillRect(px + w - 1, py - 8, 4, 3);

  // 2. Cuerdas guía laterales de seguridad (naranja brillante de rescate)
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 14);
  ctx.lineTo(px + w + 4, py - 14);
  ctx.stroke();

  // Postecillos verticales de soporte de la cuerda guía
  const numPosts = Math.max(2, Math.floor(w / 28));
  for (let i = 0; i <= numPosts; i++) {
    const postX = px + Math.round((w * i) / numPosts);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(postX - 1, py - 14, 2, 14);
    // Mosquetón pequeño
    ctx.fillStyle = '#fb923c';
    ctx.fillRect(postX - 2, py - 14, 4, 3);
  }

  // 3. Largueros tubulares de aluminio (superior e inferior)
  // Larguero superior
  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py - 2, w, 3);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px, py - 2, w, 1);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px + 4, py - 2, w - 8, 1);

  // Larguero inferior
  ctx.fillStyle = '#334155';
  ctx.fillRect(px, py + 2, w, 3);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py + 2, w, 1);

  // 4. Peldaños antideslizantes estriados
  const rungs = Math.max(4, Math.floor(w / 8));
  for (let r = 0; r <= rungs; r++) {
    const rx = px + Math.round((w * r) / rungs);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx - 1, py - 2, 2, 7);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx, py - 1, 1, 5);
  }

  // 5. Pequeños carámbanos de escarcha colgando de los peldaños centrales
  ctx.fillStyle = '#bae6fd';
  for (let i = 1; i < numPosts; i++) {
    const icx = px + Math.round((w * i) / numPosts) + 6;
    ctx.beginPath();
    ctx.moveTo(icx - 1, py + 5);
    ctx.lineTo(icx + 1, py + 5);
    ctx.lineTo(icx, py + 10);
    ctx.closePath();
    ctx.fill();
  }
}

function drawOxygenDepot(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 44;
  const h = 30;

  // 1. Base y armazón metálico de expedición
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 3, w, 3);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py - 14, 2, 12);
  ctx.fillRect(px + w - 4, py - 14, 2, 12);
  ctx.fillRect(px + 2, py - 14, w - 4, 2);

  // 2. Cilindros de oxígeno de alta montaña apilados
  // Colores: Naranja de rescate y Verde neón de alta presión
  const tanks = [
    { x: px + 6, color: '#f97316', capColor: '#c2410c', dialColor: '#ffffff' },
    { x: px + 15, color: '#22c55e', capColor: '#15803d', dialColor: '#ffffff' },
    { x: px + 24, color: '#f97316', capColor: '#c2410c', dialColor: '#ffffff' },
    { x: px + 33, color: '#22c55e', capColor: '#15803d', dialColor: '#ffffff' }
  ];

  tanks.forEach(t => {
    // Cuerpo del cilindro
    ctx.fillStyle = t.color;
    ctx.fillRect(t.x, py - 22, 6, 20);
    // Brillo cilíndrico
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(t.x + 1, py - 21, 1, 18);
    // Ojiva superior redondeada
    ctx.fillStyle = t.capColor;
    ctx.beginPath();
    ctx.arc(t.x + 3, py - 22, 3, Math.PI, 0);
    ctx.fill();
    // Válvula de bronce y manómetro
    ctx.fillStyle = '#d97706';
    ctx.fillRect(t.x + 2, py - 27, 2, 3);
    ctx.fillStyle = t.dialColor;
    ctx.beginPath();
    ctx.arc(t.x + 4, py - 26, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(t.x + 4, py - 26, 1, 1);
  });

  // Manguera flexible en espiral
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 10, py - 25);
  ctx.bezierCurveTo(px + 14, py - 18, px + 20, py - 28, px + 28, py - 25);
  ctx.stroke();

  // 3. Manto de nieve protectora sobre la repisa
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 22, Math.floor(w / 2) - 2, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + 4, py - 2, w - 8, 2);
}

function drawFixedRopesAnchor(ctx, x, y, h = 60, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const height = Math.max(30, Math.round(h));

  // 1. Piqueta de nieve y tornillo de hielo profundo en la base
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 8, 6);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 2, py - 6, 6, 3);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px, py - 8, 2, 3);

  // 2. Placa multidireccional con mosquetones de seguridad
  ctx.fillStyle = '#dc2626'; // Mosquetón rojo
  ctx.beginPath();
  ctx.ellipse(px + 1, py - 10, 4, 3, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#0284c7'; // Mosquetón azul
  ctx.beginPath();
  ctx.ellipse(px + 3, py - 14, 4, 3, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Líneas de cuerda fija tensas (Amarillo fluorescente y Azul zafiro)
  // Cuerda 1 (Amarilla)
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(px + 1, py - 10);
  ctx.lineTo(px + 2, py - height);
  ctx.stroke();

  // Cuerda 2 (Azul zafiro)
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 14);
  ctx.lineTo(px + 5, py - height + 4);
  ctx.stroke();

  // 4. Puño de ascensión (Jumar) bloqueador en la cuerda
  const jumarY = py - Math.round(height * 0.55);
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(px - 1, jumarY, 5, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, jumarY + 2, 2, 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 3, jumarY + 4, 2, 3);

  // Anclaje superior
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py - height, 4, 4);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 2, py - height - 2, 8, 2);
}

function drawWeatherStationMast(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 54;

  // 1. Base de trípode con zapatas sobre permafrost
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 3, 28, 3);
  ctx.fillStyle = '#64748b';
  // Patas diagonales del trípode
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 12, py - 3);
  ctx.lineTo(px, py - 16);
  ctx.lineTo(px + 12, py - 3);
  ctx.stroke();

  // 2. Mástil central en celosía de aleación ligera
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 2, py - h + 12, 4, h - 14);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 1, py - h + 12, 2, h - 14);

  // Celosía horizontal
  for (let ly = py - h + 18; ly < py - 16; ly += 7) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(px - 3, ly, 6, 1);
  }

  // 3. Caja de instrumental / registrador térmico
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 7, py - 30, 14, 10);
  ctx.fillStyle = '#0f172a';
  ctx.strokeRect(px - 7, py - 30, 14, 10);

  // LED de transmisión por satélite (parpadeo verde)
  const ledOn = Math.floor(frame / 20) % 2 === 0;
  ctx.fillStyle = ledOn ? '#22c55e' : '#14532d';
  ctx.fillRect(px + 2, py - 28, 3, 3);

  // 4. Panel solar orientado al sol de altura
  ctx.save();
  ctx.translate(px - 8, py - 34);
  ctx.rotate(-0.35);
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, 14, 7);
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(0, 0, 14, 7);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1, 1, 4, 1); // Escarcha solar
  ctx.restore();

  // 5. Cúpula superior y anemómetro de cazoletas giratorio
  const mastTop = py - h + 10;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 1, mastTop - 6, 2, 6);

  // Travesaño de cazoletas
  const rot = (frame * 0.15) % (Math.PI * 2);
  const cupSpan = Math.cos(rot) * 9;

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(px - cupSpan, mastTop - 6);
  ctx.lineTo(px + cupSpan, mastTop - 6);
  ctx.stroke();

  // Cazoletas hemisféricas
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px - cupSpan, mastTop - 6, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + cupSpan, mastTop - 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Veleta de viento apuntando
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px, mastTop - 11, 6, 3);
  ctx.beginPath();
  ctx.moveTo(px - 4, mastTop - 10);
  ctx.lineTo(px, mastTop - 12);
  ctx.lineTo(px, mastTop - 8);
  ctx.closePath();
  ctx.fill();
}

function drawPrayerCairn(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 36;
  const h = 38;

  // 1. Zócalo de permafrost y nieve
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 3, w + 4, 3);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px, py - 4, w, 2);

  // 2. Piedras de pizarra apiladas en pirámide (Cairn / Chörten)
  // Nivel 1 (Base ancha)
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py - 12, w - 4, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 4, py - 11, w - 10, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 12, py - 12, 1, 8);
  ctx.fillRect(px + 24, py - 12, 1, 8);

  // Nivel 2 (Medio)
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 6, py - 22, w - 12, 10);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 8, py - 20, w - 18, 5);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 18, py - 22, 1, 10);

  // Nivel 3 (Superior)
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 11, py - 30, w - 22, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 13, py - 29, w - 26, 4);

  // Piedra cimera vertical grabada
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 15, py - 36, 6, 6);
  ctx.fillStyle = '#fbbf24'; // Runa dorada
  ctx.fillRect(px + 17, py - 34, 2, 2);

  // 3. Cintas sagradas de oración atadas y ondeando al viento
  const wave = Math.sin(frame * 0.1) * 2;
  const colors = ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'];

  colors.forEach((col, idx) => {
    const ribbonX = px + 8 + idx * 4;
    const ribbonY = py - 22 - idx * 2;
    ctx.fillStyle = col;
    ctx.fillRect(ribbonX, ribbonY, 3, 2);
    // Vuelo de la cinta hacia la derecha
    ctx.beginPath();
    ctx.moveTo(ribbonX + 3, ribbonY);
    ctx.lineTo(ribbonX + 7 + wave, ribbonY + 2);
    ctx.lineTo(ribbonX + 3, ribbonY + 3);
    ctx.closePath();
    ctx.fill();
  });

  // 4. Copos y remate de nieve helada en las aristas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py - 13, 6, 2);
  ctx.fillRect(px + 22, py - 13, 8, 2);
  ctx.fillRect(px + 8, py - 23, 7, 2);
  ctx.fillRect(px + 14, py - 37, 8, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAluminumLadderBridge = drawAluminumLadderBridge;
  SpriteManager.prototype.drawOxygenDepot = drawOxygenDepot;
  SpriteManager.prototype.drawFixedRopesAnchor = drawFixedRopesAnchor;
  SpriteManager.prototype.drawWeatherStationMast = drawWeatherStationMast;
  SpriteManager.prototype.drawPrayerCairn = drawPrayerCairn;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAluminumLadderBridge,
    drawOxygenDepot,
    drawFixedRopesAnchor,
    drawWeatherStationMast,
    drawPrayerCairn
  };
}
