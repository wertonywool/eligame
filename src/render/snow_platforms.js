// ============================================================================
// RENDERIZADO DE PLATAFORMAS DE NIEVE Y ALTA MONTAÑA (MUNDO 4 - EVEREST)
// ============================================================================
// 1. snow_ground: Terreno rocoso alpino con gruesa capa de nieve fresca y polvillo
// 2. snow_bank: Banco de nieve profunda donde Elizabeth cava túneles subterráneos
// 3. ice_rock: Risco de pizarra helada con estalagmitas y carámbanos colgantes
// 4. alpine_bridge: Puente rústico de troncos alpinos y cuerdas cubierto de escarcha

function drawSnowPlatform(ctx, p, frame) {
  if (!p || !p.subType) return false;

  const px = Math.round(p.x);
  const py = Math.round(p.y);
  const pw = p.w;
  const ph = p.h;

  if (p.subType === 'snow_ground') {
    drawSnowGround(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'snow_bank') {
    drawSnowBank(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_rock') {
    drawIceRock(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'alpine_bridge') {
    drawAlpineBridge(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_pillar') {
    drawIcePillar(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_crystal') {
    drawIceCrystal(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'slippery_ice' || p.subType === 'frozen_lake_ice') {
    drawFrozenLakeIce(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'rainbow_ice' || p.subType === 'rainbow_bridge') {
    drawRainbowIcePlatform(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'aluminum_bridge') {
    if (typeof drawAluminumLadderBridge === 'function') {
      drawAluminumLadderBridge(ctx, px, py, pw, frame);
    } else {
      drawAlpineBridge(ctx, px, py, pw, ph, p, frame);
    }
    return true;
  }

  return false;
}

// 1. TERRENO NEVADO ESTÁNDAR
function drawSnowGround(ctx, px, py, pw, ph, p, frame) {
  // Base de roca pizarra oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 8, pw, ph - 8);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 10, pw, ph - 10);

  // Estrato de roca azulada
  for (let rx = px + 10; rx < px + pw; rx += 28) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(rx, py + 12, 14, 6);
  }

  // Capa intermedia de hielo compactado
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px, py + 5, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py + 4, pw, 2);

  // Manto superior de nieve virgen esponjosa con ondas onduladas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 5);

  // Pequeñas dunas y montículos de nieve rítmicos en el borde
  for (let mx = px; mx < px + pw; mx += 16) {
    ctx.fillRect(mx + 2, py - 1, 10, 2);
    // Destello de escarcha
    if ((mx + frame) % 40 < 20) {
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(mx + 6, py - 1, 1, 1);
      ctx.fillStyle = '#ffffff';
    }
  }
}

// 2. BANCO DE NIEVE PROFUNDA (TÚNELES SUBTERRÁNEOS PARA CAVAR)
function drawSnowBank(ctx, px, py, pw, ph, p, frame) {
  // Masa profunda de nieve compacta
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py, pw, ph);

  // Núcleo blanco brillante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 1, py + 2, pw - 2, ph - 4);

  // Ondas de polvo de nieve en el borde superior
  for (let mx = px; mx < px + pw; mx += 14) {
    ctx.fillRect(mx, py - 2, 12, 3);
    ctx.fillRect(mx + 3, py - 4, 6, 2);
  }

  // Indicador de sendero / túnel subterráneo en el interior del banco
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 4, py + Math.floor(ph * 0.45), pw - 8, Math.floor(ph * 0.4));

  // Cristales de nieve brillantes en el interior
  for (let cx = px + 16; cx < px + pw - 16; cx += 26) {
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(cx, py + 10, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 1, py + 10, 1, 2);
    ctx.fillRect(cx + 2, py + 10, 1, 2);
  }

  // Borde inferior con adherencia al suelo
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px, py + ph - 2, pw, 2);
}

// 3. RISCO DE PIZARRA HELADA CON CARÁMBANOS
function drawIceRock(ctx, px, py, pw, ph, p, frame) {
  // Núcleo de roca oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 1, py + 1, pw - 2, ph - 2);

  // Escarcha superficial
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py, pw, 1.5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 2, py, pw - 4, 1);

  // Carámbanos de hielo colgando bajo la plataforma
  for (let ix = px + 8; ix < px + pw - 6; ix += 18) {
    const iLen = 6 + ((ix * 7) % 8);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py + ph, 3, iLen);
    ctx.fillRect(ix + 1, py + ph + iLen, 1, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py + ph, 1, iLen - 2);
  }
}

// 4. PUENTE ALPINO DE TRONCOS Y CUERDAS
function drawAlpineBridge(ctx, px, py, pw, ph, p, frame) {
  // Troncos individuales en hilera
  for (let bx = px; bx < px + pw - 8; bx += 14) {
    // Tronco de madera alpina
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(bx, py, 12, ph);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx + 1, py + 1, 10, ph - 2);
    // Veta de madera
    ctx.fillStyle = '#27160c';
    ctx.fillRect(bx + 4, py + 2, 2, ph - 4);

    // Manto de nieve sobre cada tronco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx, py, 12, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(bx + 1, py + 2, 10, 1);
  }

  // Cuerdas de amarre laterales
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(px, py + ph - 2, pw, 2);
  ctx.fillStyle = '#ffffff';
  for (let kx = px + 6; kx < px + pw; kx += 14) {
    ctx.fillRect(kx, py - 4, 2, 4); // Candelero
  }
}

// 5. PILAR / MONOLITO DE HIELO CRISTALINO VERTICAL (ESTILO CELESTE)
function drawIcePillar(ctx, px, py, pw, ph, p, frame) {
  // Contorno oscuro de hielo glacial
  ctx.fillStyle = '#03045e';
  ctx.fillRect(px, py, pw, ph);

  // Cuerpo translúcido de hielo comprimido
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 2, py + 2, pw - 4, ph - 4);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 4, py + 2, Math.max(2, pw - 8), ph - 4);

  // Bandas de refracción vertical
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 5, py + 4, 3, ph - 8);
  if (pw > 20) {
    ctx.fillRect(px + pw - 8, py + 6, 2, ph - 12);
  }

  // Líneas de fractura interna de cristal
  ctx.fillStyle = '#caf0f8';
  for (let fy = py + 12; fy < py + ph - 8; fy += 22) {
    ctx.fillRect(px + 3, fy, pw - 6, 1);
    ctx.fillRect(px + Math.floor(pw * 0.4), fy - 3, 2, 6);
  }

  // Tapa superior de nieve compacta
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 1, py + 3, pw - 2, 2);

  // Carámbanos colgantes en la base del pilar
  for (let ix = px + 4; ix < px + pw - 4; ix += 14) {
    const iLen = 4 + ((ix * 5) % 6);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py + ph, 2, iLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py + ph, 1, iLen - 1);
  }
}

// 6. BLOQUE FLOTANTE DE HIELO CRISTALINO (PARKOUR AÉREO CELESTE)
function drawIceCrystal(ctx, px, py, pw, ph, p, frame) {
  // Facetas externas de diamante glacial
  ctx.fillStyle = '#023e8a';
  ctx.fillRect(px, py, pw, ph);

  // Prisma interno celeste brillante
  ctx.fillStyle = '#0096c7';
  ctx.fillRect(px + 1, py + 1, pw - 2, ph - 2);

  // Centro radiante
  ctx.fillStyle = '#48cae4';
  ctx.fillRect(px + 3, py + 2, pw - 6, ph - 4);

  // Destellos geométricos
  const pulse = Math.sin(frame * 0.08 + px * 0.02) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px + 4, py + 2, 4, 2);
  ctx.fillRect(px + pw - 8, py + ph - 4, 3, 2);

  // Borde superior de escarcha para agarre de pisada
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 1, py + 2, pw - 2, 1);

  // Micro-carámbanos de cristal
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 3, py + ph, 2, 4);
  ctx.fillRect(px + pw - 5, py + ph, 2, 4);
}

// 7. PISTA DE HIELO CRISTALINO / HIELO DESLIZANTE DEL LAGO CONGELADO
function drawFrozenLakeIce(ctx, px, py, pw, ph, p, frame) {
  // Base profunda de aguas gélidas y basalto submarino
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 12, pw, ph - 12);
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px, py + 8, pw, ph - 8);

  // Bloque de hielo cristalino translúcido azul cian
  const iceGrad = ctx.createLinearGradient(0, py, 0, py + ph);
  iceGrad.addColorStop(0, '#bae6fd');
  iceGrad.addColorStop(0.3, '#38bdf8');
  iceGrad.addColorStop(0.8, '#0284c7');
  iceGrad.addColorStop(1, '#0369a1');
  ctx.fillStyle = iceGrad;
  ctx.fillRect(px, py + 2, pw, ph - 2);

  // Grietas y vetas de permafrost submarino en el hielo
  ctx.strokeStyle = '#e0f2fe';
  ctx.lineWidth = 1;
  for (let cx = px + 16; cx < px + pw - 12; cx += 32) {
    ctx.beginPath();
    ctx.moveTo(cx, py + 3);
    ctx.lineTo(cx + 6, py + 10);
    ctx.lineTo(cx + 12, py + 14);
    ctx.stroke();
  }

  // Capa de pulido cristalino de espejo (reflejo de cielo ártico)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#f0f9ff';
  ctx.fillRect(px, py + 2, pw, 1);

  // Destellos de luz en la pista de patinaje
  for (let sx = px + 8; sx < px + pw; sx += 48) {
    const glint = (frame + sx * 3) % 40 < 10;
    if (glint) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx, py + 1, 4, 1);
      ctx.fillRect(sx + 1, py, 2, 3);
    }
  }

  // Pequeños témpanos en la parte inferior si está suspendida
  if (p.oneWay) {
    ctx.fillStyle = '#7dd3fc';
    for (let ix = px + 8; ix < px + pw - 6; ix += 20) {
      ctx.beginPath();
      ctx.moveTo(ix, py + ph);
      ctx.lineTo(ix + 4, py + ph);
      ctx.lineTo(ix + 2, py + ph + 6);
      ctx.closePath();
      ctx.fill();
    }
  }
}

// 8. PUENTE DE ARCOIRIS DE KAILASH (CRISTAL CROMATICO CELESTIAL)
function drawRainbowIcePlatform(ctx, px, py, pw, ph, p, frame) {
  // Espectro cromatico de 7 colores
  const rainbowColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7'
  ];
  const barH = Math.max(1, Math.floor(ph / rainbowColors.length));
  for (let c = 0; c < rainbowColors.length; c++) {
    ctx.fillStyle = rainbowColors[c];
    ctx.fillRect(px, py + c * barH, pw, (c === rainbowColors.length - 1) ? (ph - c * barH) : barH);
  }

  // Reflejo blanco cristalino superior
  const pulse = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px, py, pw, 2);

  // Pilares de anclaje dorados en ambos extremos
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 3, py - 8, 4, ph + 8);
  ctx.fillRect(px + pw - 1, py - 8, 4, ph + 8);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 2, py - 9, 2, 2);
  ctx.fillRect(px + pw, py - 9, 2, 2);

  // Cuerdas de luz estelar de pasamanos
  const sway = Math.sin(frame * 0.08) * 1.5;
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 1, py - 6);
  ctx.quadraticCurveTo(px + pw / 2, py - 6 + sway, px + pw + 1, py - 6);
  ctx.stroke();

  // Chispas flotantes sobre el puente
  for (let s = 0; s < 4; s++) {
    const sProg = (frame * 0.05 + s * 0.25) % 1;
    const sx = px + 10 + sProg * (pw - 20);
    const sy = py - 4 - Math.sin(sProg * Math.PI) * 8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSnowPlatform,
    drawSnowGround,
    drawSnowBank,
    drawIceRock,
    drawAlpineBridge,
    drawIcePillar,
    drawIceCrystal,
    drawFrozenLakeIce,
    drawRainbowIcePlatform
  };
}
