// ============================================================================
// SPRITES MUNDO 4 - FASE 6: DECORACIONES DEL SANTUARIO DEL YETI (PIXEL ART)
// ============================================================================
// 1. Huella gigante de Yeti en la nieve (drawYetiFootprint)
// 2. Arco de estalactitas y estalagmitas de hielo azul (drawIceCavernArch)
// 3. Aguja de cristal rúnico pulsante (drawRunicCrystalSpire)
// 4. Tótem de advertencia sherpa con calavera y marcas de garras (drawYetiWarningTotem)

function drawYetiFootprint(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Depresión cóncava de la huella en la nieve
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 5, -0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(px + 1, py - 2, 7, 3, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // 4 garras gigantescas clavadas en el hielo
  const toes = [
    { dx: -7, dy: -6, r: 2.5 },
    { dx: -2, dy: -8, r: 2.8 },
    { dx: 3, dy: -7, r: 2.6 },
    { dx: 8, dy: -5, r: 2.2 }
  ];

  toes.forEach(t => {
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.arc(px + t.dx, py + t.dy, t.r + 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0369a1';
    ctx.beginPath();
    ctx.arc(px + t.dx, py + t.dy, t.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Cristales de hielo desprendidos alrededor
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 9, py - 3, 2, 1);
  ctx.fillRect(px + 8, py - 1, 2, 1);
}

function drawIceCavernArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 68;
  const h = 58;

  // 1. Estalagmitas ascendentes en el pilar izquierdo
  ctx.fillStyle = '#0369a1';
  ctx.beginPath();
  ctx.moveTo(px - 4, py);
  ctx.lineTo(px + 10, py - h * 0.45);
  ctx.lineTo(px + 16, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + 10, py - h * 0.45);
  ctx.lineTo(px + 12, py);
  ctx.closePath();
  ctx.fill();

  // 2. Estalagmitas en el pilar derecho
  ctx.fillStyle = '#0369a1';
  ctx.beginPath();
  ctx.moveTo(px + w - 16, py);
  ctx.lineTo(px + w - 10, py - h * 0.5);
  ctx.lineTo(px + w + 4, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#7dd3fc';
  ctx.beginPath();
  ctx.moveTo(px + w - 12, py);
  ctx.lineTo(px + w - 10, py - h * 0.5);
  ctx.lineTo(px + w, py);
  ctx.closePath();
  ctx.fill();

  // 3. Gran arco superior de hielo con estalactitas colgantes
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 14);
  ctx.bezierCurveTo(px + 16, py - h - 4, px + w - 16, py - h - 4, px + w + 6, py - h + 14);
  ctx.lineTo(px + w, py - h + 22);
  ctx.bezierCurveTo(px + w - 18, py - h + 6, px + 18, py - h + 6, px, py - h + 22);
  ctx.closePath();
  ctx.fill();

  // Estalactitas afiladas colgando del arco
  const stalactites = [
    { x: px + 14, len: 14 },
    { x: px + 26, len: 20 },
    { x: px + 36, len: 16 },
    { x: px + 48, len: 22 },
    { x: px + 56, len: 12 }
  ];

  stalactites.forEach(s => {
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.moveTo(s.x - 3, py - h + 16);
    ctx.lineTo(s.x + 3, py - h + 16);
    ctx.lineTo(s.x, py - h + 16 + s.len);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(s.x - 1, py - h + 16, 1, s.len - 3);
  });
}

function drawRunicCrystalSpire(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 48;

  // Base de roca permafrost con runas grabadas
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 10, py - 6, 20, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 8, py - 10, 16, 5);

  // Cristal de cuarzo glacial azul puro hexagonal
  const glow = Math.sin(frame * 0.12) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (glow * 0.3).toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - Math.floor(h / 2), 22, 0, Math.PI * 2);
  ctx.fill();

  // Cuerpo geométrico facetado del cristal
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px + 6, py - 10);
  ctx.closePath();
  ctx.fill();

  // Faceta izquierda luminosa
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px - 1, py - 10);
  ctx.closePath();
  ctx.fill();

  // Brillo frontal
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.moveTo(px - 1, py - h + 4);
  ctx.lineTo(px + 1, py - h + 4);
  ctx.lineTo(px, py - 12);
  ctx.closePath();
  ctx.fill();

  // Runa mística brillante en el centro
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 2, py - Math.floor(h * 0.45), 4, 2);
  ctx.fillRect(px - 1, py - Math.floor(h * 0.45) - 3, 2, 7);
}

function drawYetiWarningTotem(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 50;

  // Poste de enebro envejecido clavado en la nieve
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 8, 4);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 2, py - h + 16, 5, h - 18);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 1, py - h + 16, 2, h - 18);

  // Marcas de garras gigantes talladas en la madera
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 1, py - 26, 3, 1);
  ctx.fillRect(px - 1, py - 24, 3, 1);
  ctx.fillRect(px - 1, py - 22, 3, 1);

  // Calavera ritual en la cima del poste
  const skullY = py - h + 6;
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(px + 1, skullY + 4, 7, 0, Math.PI * 2);
  ctx.fill();

  // Cuencas oculares oscuras
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, skullY + 3, 2, 3);
  ctx.fillRect(px + 3, skullY + 3, 2, 3);

  // Plumas de águila y cintas rojas ondeantes
  const wave = Math.sin(frame * 0.14) * 2;
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 6, skullY + 4, 4, 2);
  ctx.fillRect(px + 7, skullY + 4, 4, 2);

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 6, skullY + 5);
  ctx.lineTo(px - 10 + wave, skullY + 12);
  ctx.lineTo(px - 6, skullY + 7);
  ctx.closePath();
  ctx.fill();
}

function drawHangingFrostBridge(ctx, x, y, width = 120, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = Math.round(width || 120);

  // Postes de anclaje de madera milenaria en ambos extremos
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - 14, 6, 20);
  ctx.fillRect(px + w - 2, py - 14, 6, 20);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 3, py - 13, 4, 18);
  ctx.fillRect(px + w - 1, py - 13, 4, 18);

  // Clavijas de hierro y herrajes
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 4, py - 12, 6, 2);
  ctx.fillRect(px + w - 2, py - 12, 6, 2);

  // Cuerdas de suspension catenarias (superior e inferior)
  const droop = 10;
  const sway = Math.sin(frame * 0.08) * 1.5;

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  // Cuerda pasamanos superior
  ctx.beginPath();
  ctx.moveTo(px, py - 10);
  ctx.quadraticCurveTo(px + w / 2, py - 10 + droop + sway, px + w, py - 10);
  ctx.stroke();

  // Cuerda inferior de soporte de tablones
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.quadraticCurveTo(px + w / 2, py + droop + sway, px + w, py);
  ctx.stroke();

  // Tirantes verticales y tablones de madera
  const numPlanks = Math.floor(w / 12);
  for (let i = 0; i <= numPlanks; i++) {
    const t = i / numPlanks;
    const curX = px + Math.round(t * w);
    const sag = 4 * droop * t * (1 - t) + (t > 0 && t < 1 ? sway : 0);
    const curTopY = Math.round(py - 10 + sag);
    const curBotY = Math.round(py + sag);

    // Tirante vertical de cuerda
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(curX, curTopY);
    ctx.lineTo(curX, curBotY);
    ctx.stroke();

    // Tablon horizontal
    ctx.fillStyle = (i % 2 === 0) ? '#78350f' : '#92400e';
    ctx.fillRect(curX - 4, curBotY, 8, 3);

    // Escarcha de nieve sobre el tablon
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(curX - 3, curBotY - 1, 6, 1);

    // Estalactitas de hielo colgando bajo ciertos tablones
    if (i % 3 === 1) {
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.moveTo(curX - 2, curBotY + 3);
      ctx.lineTo(curX + 2, curBotY + 3);
      ctx.lineTo(curX, curBotY + 8 + (i % 2) * 3);
      ctx.closePath();
      ctx.fill();
    }

    // Banderines de plegaria colgando de algunos tirantes
    if (i === 2 || i === Math.floor(numPlanks / 2) || i === numPlanks - 2) {
      const pColor = (i === 2) ? '#ef4444' : (i === numPlanks - 2 ? '#3b82f6' : '#eab308');
      ctx.fillStyle = pColor;
      ctx.beginPath();
      ctx.moveTo(curX, curTopY + 2);
      ctx.lineTo(curX + 4 + sway, curTopY + 6);
      ctx.lineTo(curX, curTopY + 5);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawPolarWindVortex(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const rot = (frame * 0.08) % (Math.PI * 2);

  ctx.save();
  ctx.translate(px, py);

  // Halo central de viento gelido
  const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, 32);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(0.5, 'rgba(186, 230, 253, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fill();

  // Brazos espirales de la tormenta polar
  for (let i = 0; i < 3; i++) {
    const baseAngle = rot + (i * Math.PI * 2 / 3);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(224, 242, 254, 0.75)' : 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let r = 6; r <= 28; r += 2) {
      const a = baseAngle + r * 0.12;
      const vx = Math.cos(a) * r;
      const vy = Math.sin(a) * (r * 0.45);
      if (r === 6) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.stroke();
  }

  // Cristales de nieve orbitando en el vortice
  const crystals = [
    { dist: 14, speed: 0.12, offset: 0 },
    { dist: 22, speed: 0.09, offset: 2.1 },
    { dist: 26, speed: 0.14, offset: 4.2 }
  ];

  ctx.fillStyle = '#ffffff';
  crystals.forEach(c => {
    const ang = frame * c.speed + c.offset;
    const cx = Math.cos(ang) * c.dist;
    const cy = Math.sin(ang) * (c.dist * 0.45);
    ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 2, 2);
  });

  ctx.restore();
}

function drawBlueBrazier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  // Base y pedestal de piedra runica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 7, py - 4, 14, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 5, py - 18, 10, 14);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 3, py - 16, 6, 10);
  // Runa cian grabada
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 1, py - 14, 2, 6);

  // Copa de hierro forjado
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 22, 16, 4);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - 6, py - 21, 12, 2);

  // Resplandor de fuego azul
  const flicker = Math.sin(frame * 0.2) * 2;
  const flameH = 14 + flicker;
  const grad = ctx.createRadialGradient(px, py - 24, 2, px, py - 24, 20);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, py - 24, 20, 0, Math.PI * 2);
  ctx.fill();

  // Lenguas de llama azul mistica
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 22);
  ctx.quadraticCurveTo(px - 6 + flicker, py - 22 - flameH * 0.7, px, py - 22 - flameH);
  ctx.quadraticCurveTo(px + 6 - flicker, py - 22 - flameH * 0.7, px + 5, py - 22);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px - 3, py - 22);
  ctx.quadraticCurveTo(px - 3 + flicker, py - 22 - flameH * 0.5, px, py - 22 - flameH * 0.8);
  ctx.quadraticCurveTo(px + 3 - flicker, py - 22 - flameH * 0.5, px + 3, py - 22);
  ctx.closePath();
  ctx.fill();

  // Nucleo blanco caliente
  ctx.fillStyle = '#f0f9ff';
  ctx.fillRect(px - 1, py - 26, 2, 4);
}

function drawSanctuaryPortalArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 76;
  const h = 64;

  // 1. Pilares megaliticos de piedra runica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 6, py - h, 14, h);
  ctx.fillRect(px + w - 8, py - h, 14, h);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - h + 2, 10, h - 4);
  ctx.fillRect(px + w - 6, py - h + 2, 10, h - 4);

  // Relieves de piedra tallada en los pilares
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 2, py - h + 8, 6, 4);
  ctx.fillRect(px - 2, py - h + 20, 6, 4);
  ctx.fillRect(px - 2, py - h + 34, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 8, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 20, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 34, 6, 4);

  // Runas celestiales brillantes en los pilares
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + glow.toFixed(2) + ')';
  ctx.fillRect(px, py - h + 14, 2, 4);
  ctx.fillRect(px, py - h + 26, 2, 6);
  ctx.fillRect(px + w - 2, py - h + 14, 2, 4);
  ctx.fillRect(px + w - 2, py - h + 26, 2, 6);

  // 2. Dintel megalitico superior
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 10, py - h - 10, w + 20, 14);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 8, py - h - 8, w + 16, 10);

  // Capa de nieve sobre el dintel
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px - 9, py - h - 11, w + 18, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 6, py - h - 12, w + 12, 2);

  // Timpano central con efigie esculpida del Yeti Ancestral
  const midX = px + Math.floor(w / 2);
  const archY = py - h - 4;
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(midX, archY, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(midX - 4, archY - 3, 8, 6);
  // Ojos del relieve que resplandecen en azul mistico
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(midX - 3, archY - 1, 2, 2);
  ctx.fillRect(midX + 1, archY - 1, 2, 2);

  // 3. Estalactitas de hielo azul colgando del dintel
  const icicles = [
    { dx: 12, len: 12 }, { dx: 22, len: 18 }, { dx: 32, len: 10 },
    { dx: 44, len: 10 }, { dx: 54, len: 19 }, { dx: 64, len: 13 }
  ];
  icicles.forEach(ic => {
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.moveTo(px + ic.dx - 2, py - h + 4);
    ctx.lineTo(px + ic.dx + 2, py - h + 4);
    ctx.lineTo(px + ic.dx, py - h + 4 + ic.len);
    ctx.closePath();
    ctx.fill();
  });
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawYetiFootprint = drawYetiFootprint;
  SpriteManager.prototype.drawIceCavernArch = drawIceCavernArch;
  SpriteManager.prototype.drawRunicCrystalSpire = drawRunicCrystalSpire;
  SpriteManager.prototype.drawYetiWarningTotem = drawYetiWarningTotem;
  SpriteManager.prototype.drawHangingFrostBridge = drawHangingFrostBridge;
  SpriteManager.prototype.drawPolarWindVortex = drawPolarWindVortex;
  SpriteManager.prototype.drawBlueBrazier = drawBlueBrazier;
  SpriteManager.prototype.drawSanctuaryPortalArch = drawSanctuaryPortalArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawYetiFootprint,
    drawIceCavernArch,
    drawRunicCrystalSpire,
    drawYetiWarningTotem,
    drawHangingFrostBridge,
    drawPolarWindVortex,
    drawBlueBrazier,
    drawSanctuaryPortalArch
  };
}
