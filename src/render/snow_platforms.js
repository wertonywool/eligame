// ============================================================================
// RENDERIZADO DE PLATAFORMAS DE NIEVE Y ALTA MONTAÑA (MUNDO 4 - EVEREST)
// ============================================================================
// 1. snow_ground: Terreno rocoso alpino con gruesa capa de nieve fresca y polvillo
// 2. snow_bank: Banco de nieve profunda donde Elizabeth cava túneles subterráneos
// 3. ice_rock: Risco de pizarra helada con estalagmitas y carámbanos colgantes
// 4. alpine_bridge: Puente rústico de troncos alpinos y cuerdas cubierto de escarcha

function drawSnowPlatform(ctx, p, frame) {
  if (!p || !p.subType || p.broken) return false;

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
  if (p.subType === 'cracking_ice') {
    drawCrackingIce(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring') {
    drawBounceCrystal(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') {
    drawCrystalLotusPad(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_pagoda_roof' || p.subType === 'pagoda_roof') {
    drawShambhalaPagodaRoof(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_marble_terrace' || p.subType === 'shambhala_marble') {
    drawShambhalaMarbleTerrace(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_bridge') {
    drawShambhalaBridge(ctx, px, py, pw, ph, p, frame);
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
  for (let kx = px + 6; kx < px + pw; kx += 16) {
    // Poste / candelero de madera conectado al puente
    ctx.fillStyle = '#4e342e';
    ctx.fillRect(kx, py - 4, 2, 6);
    // Capucha de nieve sobre el poste
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(kx - 1, py - 5, 4, 2);
  }
}

// 4b. PUENTE DE ESCALERA DE ALUMINIO DE KHUMBU (LADDER BRIDGE SOBRE GRIETAS)
function drawAluminumLadderBridge(ctx, px, py, pw, frame) {
  // Niebla fría / vapor gélido que asciende de la grieta profunda bajo la escalera
  const mistAlpha = 0.22 + Math.sin(frame * 0.08 + px * 0.02) * 0.1;
  ctx.fillStyle = `rgba(186, 230, 253, ${mistAlpha.toFixed(2)})`;
  ctx.fillRect(px + 4, py + 8, pw - 8, 14);

  // Estacas de anclaje de acero y picos en los dos extremos
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px - 4, py - 3, 6, 10);
  ctx.fillRect(px + pw - 2, py - 3, 6, 10);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 3, py - 3, 4, 2);
  ctx.fillRect(px + pw - 1, py - 3, 4, 2);

  // Cuerdas de seguridad tensoras naranjas de escalada de alta montaña (Kernmantle rope)
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 2);
  ctx.lineTo(px + pw + 2, py - 2);
  ctx.stroke();

  // Nudos de amarre en los extremos
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(px - 2, py - 4, 3, 4);
  ctx.fillRect(px + pw - 1, py - 4, 3, 4);

  // Rieles de aluminio dobles (superior e inferior)
  // Sombra del riel inferior
  ctx.fillStyle = '#334155';
  ctx.fillRect(px, py + 5, pw, 2);
  // Riel inferior metálico
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py + 4, pw, 2);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px, py + 4, pw, 1);

  // Sombra del riel superior
  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py + 1, pw, 2);
  // Riel superior brillante de aleación de aluminio aeroespacial
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 1);

  // Peldaños / travesaños de aluminio perpendiculares (rungs) cada 8 píxeles
  for (let rx = px + 4; rx <= px + pw - 4; rx += 8) {
    // Sombra del peldaño
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rx, py + 1, 2, 5);
    // Cuerpo del peldaño de aluminio
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx, py, 2, 5);
    // Destello de escarcha sobre el peldaño
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx, py, 1, 2);

    // Pequeño remache de fijación
    ctx.fillStyle = '#475569';
    ctx.fillRect(rx, py, 1, 1);
    ctx.fillRect(rx, py + 4, 1, 1);
  }

  // Chispas de escarcha / hielo adherido en el aluminio
  const glintPos = (Math.floor(frame * 0.4) * 16) % Math.max(16, pw - 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + glintPos, py, 3, 1);
  ctx.fillRect(px + glintPos + 1, py - 1, 1, 3);
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

  // Si el pilar es quebrable, dibujar vetas luminosas de fractura y runa de impacto
  if (p.breakable) {
    const pulse = Math.sin(frame * 0.12 + px * 0.05) * 0.3 + 0.7;
    ctx.strokeStyle = p.crystalType === 'amethyst'
      ? `rgba(192, 132, 252, ${pulse.toFixed(2)})`
      : (p.crystalType === 'jade' ? `rgba(52, 211, 153, ${pulse.toFixed(2)})` : `rgba(56, 189, 248, ${pulse.toFixed(2)})`);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(pw * 0.3), py + 6);
    ctx.lineTo(px + Math.floor(pw * 0.6), py + Math.floor(ph * 0.45));
    ctx.lineTo(px + Math.floor(pw * 0.25), py + Math.floor(ph * 0.75));
    ctx.lineTo(px + Math.floor(pw * 0.5), py + ph - 6);
    ctx.stroke();

    // Runa central de cristal pulsante
    ctx.fillStyle = p.crystalType === 'amethyst' ? '#c084fc' : (p.crystalType === 'jade' ? '#34d399' : '#38bdf8');
    ctx.fillRect(px + Math.floor(pw / 2) - 3, py + Math.floor(ph / 2) - 3, 6, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + Math.floor(pw / 2) - 1, py + Math.floor(ph / 2) - 1, 2, 2);
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

// 9. HIELO QUEBRADIZO / CAPA FRÁGIL DE LAGO (CRACKING ICE)
function drawCrackingIce(ctx, px, py, pw, ph, p, frame) {
  if (p.broken) {
    // Si está rota, dibujamos trozos hundiéndose y burbujas de agua
    const fade = Math.max(0, p.respawnTimer / 2.8);
    ctx.fillStyle = `rgba(186, 230, 253, ${fade * 0.4})`;
    for (let c = 0; c < 3; c++) {
      const cx = px + (pw * 0.25) * (c + 1) - 6;
      const cy = py + 4 + (1 - fade) * 8;
      ctx.fillRect(cx, cy, 10, 4);
    }
    return;
  }

  const shakeX = p.shakeOffset || 0;
  const shakeY = (p.shakeOffset ? Math.cos(frame * 2.0) * 1.2 : 0);
  const curX = px + Math.round(shakeX);
  const curY = py + Math.round(shakeY);

  // Base de hielo congelado translúcido
  drawFrozenLakeIce(ctx, curX, curY, pw, ph, p, frame);

  // Grietas activas según el temporizador de pisada
  const crack = p.crackTimer || 0;
  if (crack > 0.05) {
    const crackAlpha = Math.min(1, crack / 0.7);
    ctx.strokeStyle = `rgba(255, 255, 255, ${crackAlpha})`;
    ctx.lineWidth = 1.5;

    // Red de fracturas en zigzag
    ctx.beginPath();
    ctx.moveTo(curX + pw * 0.15, curY + 2);
    ctx.lineTo(curX + pw * 0.35, curY + ph * 0.45);
    ctx.lineTo(curX + pw * 0.5, curY + 2);
    ctx.lineTo(curX + pw * 0.7, curY + ph * 0.6);
    ctx.lineTo(curX + pw * 0.88, curY + 2);
    ctx.stroke();

    if (crack > 0.4) {
      // Grietas transversales profundas
      ctx.strokeStyle = `rgba(224, 242, 254, ${crackAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(curX + pw * 0.35, curY + ph * 0.45);
      ctx.lineTo(curX + pw * 0.3, curY + ph - 2);
      ctx.moveTo(curX + pw * 0.7, curY + ph * 0.6);
      ctx.lineTo(curX + pw * 0.75, curY + ph - 2);
      ctx.stroke();

      // Destellos de peligro de quiebre inminente
      if (Math.sin(frame * 0.6) > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(curX + pw * 0.5 - 2, curY, 4, 3);
      }
    }
  }
}

// 10. CRISTAL CELESTIAL DE IMPULSO / RESORTE GLACIAL (BOUNCE CRYSTAL)
function drawBounceCrystal(ctx, px, py, pw, ph, p, frame) {
  const cx = px + pw / 2;
  const cy = py + ph / 2;
  const pulse = Math.sin(frame * 0.12) * 2;
  const rad = Math.min(pw, ph) / 2 + pulse;

  // Halo de energía celestial circundante
  const halo = ctx.createRadialGradient(cx, cy, 2, cx, cy, rad + 14);
  halo.addColorStop(0, 'rgba(0, 245, 212, 0.6)');
  halo.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
  halo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, rad + 14, 0, Math.PI * 2);
  ctx.fill();

  // Rombo / Diamante de Cristal Glacial
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad - 2);
  ctx.lineTo(cx + rad + 2, cy);
  ctx.lineTo(cx, cy + rad + 2);
  ctx.lineTo(cx - rad - 2, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad);
  ctx.lineTo(cx + rad, cy);
  ctx.lineTo(cx, cy + rad);
  ctx.lineTo(cx - rad, cy);
  ctx.closePath();
  ctx.fill();

  // Núcleo brillante blanco
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad * 0.5);
  ctx.lineTo(cx + rad * 0.5, cy);
  ctx.lineTo(cx, cy + rad * 0.5);
  ctx.lineTo(cx - rad * 0.5, cy);
  ctx.closePath();
  ctx.fill();

  // Chispas estelares orbitando
  for (let s = 0; s < 3; s++) {
    const sAngle = frame * 0.08 + s * (Math.PI * 2 / 3);
    const sx = cx + Math.cos(sAngle) * (rad + 6);
    const sy = cy + Math.sin(sAngle) * (rad + 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(sx) - 1, Math.round(sy) - 1, 2, 2);
  }
}

// 11. PLATAFORMA DE LOTO DE CRISTAL FLOTANTE (SHAMBHALA BOUNCE PAD)
function drawCrystalLotusPad(ctx, px, py, pw, ph, p, frame) {
  const bob = Math.sin(frame * 0.08 + px * 0.04) * 2;
  const cy = py + bob;
  const cx = px + pw / 2;

  // Halo luminoso radial místico
  const glow = Math.sin(frame * 0.12 + px * 0.02) * 0.2 + 0.8;
  const grad = ctx.createRadialGradient(cx, cy + ph / 2, 4, cx, cy + ph / 2, pw / 2 + 10);
  grad.addColorStop(0, 'rgba(56, 189, 248, ' + (glow * 0.45).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(254, 240, 138, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy + ph / 2, pw / 2 + 10, 0, Math.PI * 2);
  ctx.fill();

  // Hoja basal de jade esmeralda
  ctx.fillStyle = '#065f46';
  ctx.beginPath();
  ctx.ellipse(cx, cy + ph / 2 + 2, pw / 2, ph / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.ellipse(cx, cy + ph / 2, pw / 2 - 2, ph / 2 - 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pétalos cristalinos celestes en abanico
  const numPetals = 7;
  for (let i = 0; i < numPetals; i++) {
    const ang = (i * Math.PI) / (numPetals - 1) - Math.PI;
    const petX = cx + Math.cos(ang) * (pw / 2 - 4);
    const petY = cy + ph / 2 + Math.sin(ang) * 4;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 5, 8, ang * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Capa superior de pétalos blancos de cuarzo
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.ellipse(cx - 8, cy + 2, 6, 4, -0.2, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, cy + 2, 6, 4, 0.2, 0, Math.PI * 2);
  ctx.ellipse(cx, cy, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corola dorada elástica de rebote
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 1, pw / 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.fillRect(cx - 3, cy, 6, 2);

  // Destellos estelares
  const spark = (frame * 0.08) % 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4 + Math.sin(frame * 0.15) * 8, cy - 6 - spark * 8, 2, 2);
}

// 12. TECHO DE PAGODA ASIÁTICA DE SHAMBHALA (ALEROS CURVOS DE ORO)
function drawShambhalaPagodaRoof(ctx, px, py, pw, ph, p, frame) {
  // 1. Viga inferior de madera lacada rojo carmesí tibetano
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(px + 4, py + ph - 5, pw - 8, 5);
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px + 6, py + ph - 4, pw - 12, 3);

  // Ménsulas de madera dorada tallada
  for (let bx = px + 10; bx < px + pw - 10; bx += 18) {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(bx, py + ph - 3, 4, 3);
  }

  // 2. Faldón principal de tejas doradas
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 2, py + 4, pw - 4, ph - 8);

  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 1, py + 2, pw - 2, 5);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py + 1, pw, 3);

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + 4, py, pw - 8, 2);

  // Relieve de canales de tejas doradas
  for (let tx = px + 6; tx < px + pw - 6; tx += 8) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tx, py + 3, 1, ph - 6);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(tx + 1, py + 1, 1, 3);
  }

  // 3. Aleros curvos hacia arriba en los extremos (estilo asiático oriental)
  ctx.fillStyle = '#f59e0b';
  // Extremo izquierdo hacia arriba
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 4);
  ctx.lineTo(px + 4, py + 2);
  ctx.lineTo(px, py + 5);
  ctx.closePath();
  ctx.fill();

  // Extremo derecho hacia arriba
  ctx.beginPath();
  ctx.moveTo(px + pw + 4, py - 4);
  ctx.lineTo(px + pw - 4, py + 2);
  ctx.lineTo(px + pw, py + 5);
  ctx.closePath();
  ctx.fill();

  // Campanas de viento oscilantes en las puntas de los aleros
  const sway = Math.sin(frame * 0.08) * 1.5;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 4 + sway, py + 2, 2, 4);
  ctx.fillRect(px + pw + 2 + sway, py + 2, 2, 4);

  // Manto sutil de nieve fresca en la cumbrera
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - 1, pw - 16, 2);
}

// 13. TERRAZA DE MÁRMOL BLANCO Y ORO DE SHAMBHALA
function drawShambhalaMarbleTerrace(ctx, px, py, pw, ph, p, frame) {
  // Base de roca basalto y mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 8, pw, ph - 8);

  // Bloque de mármol blanco puro de Shambhala
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px, py + 3, pw, ph - 3);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px, py, pw, 7);

  // Cenefa ornamental de oro y lapislázuli
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py + 6, pw, 2);
  for (let gx = px + 12; gx < px + pw - 8; gx += 20) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(gx, py + 6, 3, 2);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(gx + 4, py + 6, 2, 2);
  }

  // Reflejo pulido en la superficie
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  for (let sx = px + 10; sx < px + pw - 10; sx += 32) {
    if ((sx + frame) % 50 < 15) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(sx, py + 1, 4, 1);
      ctx.fillStyle = '#ffffff';
    }
  }
}

// 14. PUENTE CEREMONIAL DE SHAMBHALA (MADERA ROJA, ORO Y BARANDILLAS)
function drawShambhalaBridge(ctx, px, py, pw, ph, p, frame) {
  // Viga maestra de madera lacada rojo carmesí
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(px, py + 6, pw, ph - 6);

  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px, py + 3, pw, 5);

  // Tablones de paso
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px, py + 1, pw, 3);
  for (let bx = px + 6; bx < px + pw; bx += 10) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(bx, py + 1, 1, 4);
  }

  // Barandillas de madera roja y adornos de oro
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px, py - 6, pw, 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py - 7, pw, 1);

  // Postes con remates dorados
  for (let px_post = px + 6; px_post < px + pw; px_post += 18) {
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(px_post, py - 6, 2, 7);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(px_post - 1, py - 9, 4, 3);
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
    drawRainbowIcePlatform,
    drawCrackingIce,
    drawBounceCrystal,
    drawAluminumLadderBridge,
    drawCrystalLotusPad,
    drawShambhalaPagodaRoof,
    drawShambhalaMarbleTerrace,
    drawShambhalaBridge
  };
}
