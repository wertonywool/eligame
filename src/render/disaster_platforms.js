// ============================================================================
// RENDERIZADO DE PLATAFORMAS DE DESASTRE Y MEGATSUNAMI (MUNDO 3 - FASE 5)
// ============================================================================
// Renderiza estructuras urbanas sumergidas e infraestructuras del tsunami:
// 1. submerged_highway: Viaductos de autopista rota con asfalto, franjas y guardarraíles
// 2. shipping_container: Contenedores intermodales de carga con chapa ondulada y marcajes
// 3. cargo_ship_hull: Casco de carguero comercial encallado con remaches y ojos de buey
// 4. submerged_skyscraper_roof: Azotea de rascacielos con helipuerto H, paneles solares y baliza
// 5. tsunami_barrel_wave: Tubo de ola colosal de surf con vórtice interno y cresta espumosa

function drawDisasterPlatform(ctx, p, frame) {
  if (!p || !p.subType) return false;

  const px = Math.round(p.x);
  const py = Math.round(p.y);
  const pw = p.w;
  const ph = p.h;

  if (p.subType === 'submerged_highway') {
    drawSubmergedHighway(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shipping_container') {
    drawShippingContainer(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'cargo_ship_hull') {
    drawCargoShipHull(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'submerged_skyscraper_roof') {
    drawSubmergedSkyscraperRoof(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'tsunami_barrel_wave') {
    drawTsunamiBarrelWave(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'construction_girder') {
    drawConstructionGirder(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'skyscraper_rooftop_level') {
    drawSkyscraperRooftopLevel(ctx, px, py, pw, ph, p, frame);
    return true;
  }

  return false;
}

// 1. AUTOPISTA URBANA SUMERGIDA / RAMPA DE LANZAMIENTO
function drawSubmergedHighway(ctx, px, py, pw, ph, p, frame) {
  // Pilares de concreto sumergidos hacia el fondo marino
  const pierStep = 70;
  for (let pierX = px + 20; pierX < px + pw - 20; pierX += pierStep) {
    ctx.fillStyle = '#212529';
    ctx.fillRect(pierX - 6, py + ph, 12, 55);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(pierX - 4, py + ph, 8, 55);
    // Manchas de algas marinas en la línea de agua
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(pierX - 5, py + ph + 24, 10, 8);
    ctx.fillStyle = '#1b4332';
    ctx.fillRect(pierX - 4, py + ph + 28, 8, 12);
  }

  // Base y grosor de la losa de autopista (concreto armado)
  ctx.fillStyle = '#16181b';
  ctx.fillRect(px - 1, py - 1, pw + 2, ph + 2);
  ctx.fillStyle = '#2b2d42';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e1e24';
  ctx.fillRect(px, py + 4, pw, ph - 4);

  // Bordillo exterior de granito biselado
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px, py, pw, 1);

  // Línea blanca lateral continua (arcén)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 2, pw - 8, 1);

  // Doble línea amarilla de autopista (centro)
  const lineY = py + Math.floor(ph * 0.45);
  for (let lx = px + 8; lx < px + pw - 8; lx += 18) {
    const dashW = Math.min(10, px + pw - 8 - lx);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(lx, lineY, dashW, 2);
    ctx.fillStyle = '#e76f51';
    ctx.fillRect(lx, lineY + 1, dashW, 1);
  }

  // Guardarraíl metálico superior con reflectores ámbar
  for (let rx = px + 6; rx < px + pw - 6; rx += 24) {
    ctx.fillStyle = '#6c757d';
    ctx.fillRect(rx, py - 5, 2, 5);
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(rx - 1, py - 5, 4, 2);
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(rx, py - 4, 2, 2); // Reflector de peligro
  }

  // Si es rampa de lanzamiento con impulso: flechas chevron amarillas brillantes
  if (p.launchRamp) {
    const pulse = (Math.floor(frame * 0.12) % 3);
    for (let cx = px + 24; cx < px + pw - 24; cx += 32) {
      const isLit = (Math.floor((cx - px) / 32) % 3) === pulse;
      ctx.fillStyle = isLit ? '#ffffff' : '#ffd166';
      // Flecha >
      ctx.fillRect(cx, py + 6, 2, 6);
      ctx.fillRect(cx + 2, py + 7, 2, 4);
      ctx.fillRect(cx + 4, py + 8, 2, 2);
    }
  }

  // Grietas de fractura sísmica por el terremoto
  for (let kx = px + 36; kx < px + pw - 30; kx += 64) {
    ctx.fillStyle = '#14101c';
    ctx.fillRect(kx, py + 2, 3, ph - 4);
    ctx.fillRect(kx + 2, py + 5, 4, 2);
    // Salpicaduras de agua emergiendo de la grieta
    if (globalFrame % 4 < 2) {
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(kx + 1, py - 2, 2, 2);
    }
  }
}

// 2. CONTENEDOR INDUSTRIAL DE CARGA INTERMODAL
function drawShippingContainer(ctx, px, py, pw, ph, p, frame) {
  // Balanceo suave sobre las olas
  const bob = Math.round(Math.sin(frame * 0.05 + px * 0.03) * 1.5);
  const cy = py + bob;

  // Paleta según color de la naviera
  let baseCol = '#0077b6', ribCol = '#0096c7', darkCol = '#023e8a', textCol = '#ffffff';
  if (p.containerColor === 'orange') {
    baseCol = '#d9480f'; ribCol = '#f77f00'; darkCol = '#7f2a03';
  } else if (p.containerColor === 'red') {
    baseCol = '#c1121f'; ribCol = '#e63946'; darkCol = '#660708';
  } else if (p.containerColor === 'teal') {
    baseCol = '#2a9d8f'; ribCol = '#52b788'; darkCol = '#1d3557';
  }

  // Borde y cuerpo de acero acanalado
  ctx.fillStyle = '#0b0c10';
  ctx.fillRect(px - 1, cy - 1, pw + 2, ph + 2);
  ctx.fillStyle = baseCol;
  ctx.fillRect(px, cy, pw, ph);

  // Chapa ondulada: costillas verticales de sombra y luz en 3D
  for (let rx = px + 6; rx < px + pw - 6; rx += 7) {
    ctx.fillStyle = darkCol;
    ctx.fillRect(rx, cy + 2, 2, ph - 4);
    ctx.fillStyle = ribCol;
    ctx.fillRect(rx + 2, cy + 2, 2, ph - 4);
  }

  // Vigas perimetrales y refuerzo superior
  ctx.fillStyle = ribCol;
  ctx.fillRect(px, cy, pw, 2);
  ctx.fillStyle = darkCol;
  ctx.fillRect(px, cy + ph - 2, pw, 2);

  // Cantoneras de esquina (Corner Castings) de alta resistencia
  const corners = [
    { x: px, y: cy },
    { x: px + pw - 6, y: cy },
    { x: px, y: cy + ph - 5 },
    { x: px + pw - 6, y: cy + ph - 5 }
  ];
  for (const c of corners) {
    ctx.fillStyle = '#1f2421';
    ctx.fillRect(c.x, c.y, 6, 5);
    ctx.fillStyle = '#495057';
    ctx.fillRect(c.x + 1, c.y + 1, 4, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(c.x + 2, c.y + 2, 2, 1); // Orificio de izado de grúa
  }

  // Matrícula y marcajes marítimos estarcidos
  ctx.fillStyle = textCol;
  ctx.fillRect(px + 10, cy + 3, 14, 2);
  ctx.fillRect(px + 28, cy + 3, 8, 2);
  // Rombo de mercancías peligrosas (Hazmat diamond)
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(px + pw - 20, cy + 3, 4, 4);
  ctx.fillStyle = '#d90429';
  ctx.fillRect(px + pw - 19, cy + 4, 2, 2);

  // Espuma y salpicaduras en la línea de flotación
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(px - 2, cy + ph - 2, pw + 4, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 1, cy + ph - 1, pw + 2, 1);
}

// 3. CASCO DE CARGUERO MERCANTE ENCALLADO
function drawCargoShipHull(ctx, px, py, pw, ph, p, frame) {
  // Sombra y contorno de acero naval
  ctx.fillStyle = '#0a1128';
  ctx.fillRect(px - 2, py - 1, pw + 4, ph + 2);

  // Cubierta superior y regala de acero oscuro
  ctx.fillStyle = '#1b263b';
  ctx.fillRect(px, py, pw, ph);

  // Casco inferior con pintura antiincrustante roja abisal
  const hullMid = py + Math.floor(ph * 0.45);
  ctx.fillStyle = '#780001';
  ctx.fillRect(px, hullMid, pw, ph - Math.floor(ph * 0.45));
  ctx.fillStyle = '#540b0e';
  ctx.fillRect(px, hullMid + 6, pw, ph - Math.floor(ph * 0.45) - 6);

  // Franja blanca de demarcación de francobordo
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px, hullMid - 2, pw, 3);
  ctx.fillStyle = '#e9ecef';
  ctx.fillRect(px, hullMid + 1, pw, 1);

  // Remaches navales y juntas de placas de acero soldadas
  for (let jx = px + 18; jx < px + pw - 12; jx += 38) {
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(jx, py + 2, 2, ph - 4);
    for (let ry = py + 4; ry < py + ph - 4; ry += 6) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(jx - 1, ry, 1, 1);
      ctx.fillRect(jx + 2, ry, 1, 1);
    }
  }

  // Ojos de buey de bronce con cristal marino reflectante
  for (let ox = px + 26; ox < px + pw - 26; ox += 42) {
    // Marco de bronce
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(ox - 3, py + 5, 7, 7);
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(ox - 2, py + 6, 5, 5);
    // Cristal marino azul turquesa
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(ox - 1, py + 7, 3, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ox, py + 7, 1, 1); // Destello
  }

  // Barandilla de cubierta superior con pasamanos
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(px, py, pw, 2);
  for (let bx = px + 10; bx < px + pw - 10; bx += 20) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(bx, py - 4, 2, 4); // Candelero
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx - 1, py - 5, 4, 1); // Perno
  }

  // Olas rompiendo contra el casco encallado
  const waveSplash = Math.sin(frame * 0.12 + px * 0.05) * 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, hullMid + Math.round(waveSplash), 8, 4);
  ctx.fillRect(px + pw - 4, hullMid - Math.round(waveSplash), 8, 4);
}

// 4. AZOTEA SUMERGIDA DE RASCACIELOS CON HELIPUERTO Y PANELES SOLARES
function drawSubmergedSkyscraperRoof(ctx, px, py, pw, ph, p, frame) {
  // Contorno y parapeto de concreto blanco arquitectónico
  ctx.fillStyle = '#1f2421';
  ctx.fillRect(px - 1, py - 1, pw + 2, ph + 2);
  ctx.fillStyle = '#dee2e6';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px, py + 4, pw, ph - 4);

  // Remate superior de aluminio blanco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);

  // Zona A: Helipuerto corporativo (Círculo y letra H gigante)
  const heliX = px + 44;
  const heliY = py + Math.floor(ph * 0.48);
  // Anillo perimetral amarillo
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(heliX - 16, heliY - 7, 32, 14);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(heliX - 14, heliY - 5, 28, 10);
  // Letra H blanca gruesa de aterrizaje
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(heliX - 8, heliY - 4, 3, 8); // Barra izq
  ctx.fillRect(heliX + 5, heliY - 4, 3, 8); // Barra der
  ctx.fillRect(heliX - 5, heliY - 1, 10, 2); // Travesaño central

  // Zona B: Campo de paneles solares fotovoltaicos en rejilla azul índigo
  const solarStart = px + 80;
  const solarEnd = px + pw - 40;
  for (let sx = solarStart; sx < solarEnd; sx += 22) {
    const sw = Math.min(18, solarEnd - sx);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(sx, py + 3, sw, ph - 7);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(sx + 1, py + 4, sw - 2, ph - 9);
    // Rejilla de silicio y reflejo solar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(sx + Math.floor(sw / 2), py + 4, 1, ph - 9);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(sx + 2, py + 5, 3, 2);
  }

  // Zona C: Chiller de aire acondicionado y compuertas de ventilación
  const hvacX = px + pw - 34;
  ctx.fillStyle = '#343a40';
  ctx.fillRect(hvacX, py + 3, 28, ph - 6);
  ctx.fillStyle = '#495057';
  ctx.fillRect(hvacX + 2, py + 5, 24, ph - 10);
  for (let vy = py + 7; vy < py + ph - 8; vy += 3) {
    ctx.fillStyle = '#212529';
    ctx.fillRect(hvacX + 4, vy, 20, 1);
  }

  // Antena / baliza de aviación en el extremo con destello rojo intermitente
  const beaconX = px + pw - 8;
  ctx.fillStyle = '#6c757d';
  ctx.fillRect(beaconX, py - 14, 2, 14);
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(beaconX - 2, py - 4, 6, 2);
  const isFlash = Math.floor(frame * 0.12) % 2 === 0;
  ctx.fillStyle = isFlash ? '#ff0054' : '#590d22';
  ctx.fillRect(beaconX - 1, py - 16, 4, 3);
  if (isFlash) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(beaconX - 4, py - 19, 10, 9);
  }
}

// 5. TUBO DE OLA COLOSAL DE SURF (TSUNAMI BARREL WAVE)
function drawTsunamiBarrelWave(ctx, px, py, pw, ph, p, frame) {
  // 1. Renderizar la base de agua hidrodinámica continua sin costuras
  if (typeof drawRealisticWaterPlatform === 'function') {
    drawRealisticWaterPlatform(ctx, p, frame);
  }

  const t = frame * 0.06;

  // 2. Líneas de corriente hiper-rápidas en el interior del vórtice
  for (let stream = 0; stream < 4; stream++) {
    const streamY = py + 8 + stream * 10;
    const speed = (stream + 2) * 2.2;
    const streamOff = (frame * speed) % pw;
    ctx.fillStyle = (stream % 2 === 0) ? 'rgba(144, 224, 239, 0.45)' : 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(px + streamOff, streamY, 26, 2);
    ctx.fillRect(px + ((streamOff + Math.floor(pw * 0.5)) % pw), streamY, 32, 2);
  }

  // 3. Bóveda y labio superior que se curva overhead formando el túnel de agua
  const step = 6;
  for (let wx = 0; wx < pw; wx += step) {
    const curX = px + wx;
    const waveSin = Math.sin(t * 3.0 + curX * 0.08) * 5.0;
    const curlY = py - 18 + Math.round(waveSin);

    // Bóveda de agua curvada sobre la cabeza
    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, curlY - 6, step, 6);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(curX, curlY - 4, step, 5);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, curlY - 2, step, 4);

    // Espuma blanca hirviente en la cresta de la bóveda
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, curlY - 1, step, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, curlY - 3, step, 2);

    // Gotas de agua y spray pulverizado cayendo del labio
    if ((frame + wx) % 6 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 2, curlY + 5, 2, 2);
      ctx.fillRect(curX + 4, curlY + 14, 1, 2);
    }
  }

  // 4. Acelerador de corriente visible en agua
  if (p.boostCurrent) {
    ctx.fillStyle = 'rgba(0, 245, 212, 0.45)';
    for (let fx = px + ((frame * 6) % 36); fx < px + pw - 18; fx += 36) {
      ctx.fillRect(fx, py + 8, 16, 2);
    }
  }
}

// 6. VIGA DE ACERO INDUSTRIAL SUSPENDIDA ENTRE RASCACIELOS (CONSTRUCTION GIRDER)
function drawConstructionGirder(ctx, px, py, pw, ph, p, frame) {
  // Cables de suspensión tensados hacia el cielo
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px + 8, py);
  ctx.lineTo(px + 4, 0);
  ctx.moveTo(px + pw - 8, py);
  ctx.lineTo(px + pw - 4, 0);
  ctx.stroke();

  // Grilletes de amarre
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 6, py - 4, 5, 4);
  ctx.fillRect(px + pw - 11, py - 4, 5, 4);

  // Ala superior de la viga I con remaches
  ctx.fillStyle = '#d90429';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px, py, pw, 1);

  // Alma central de acero con franjas diagonales de peligro
  ctx.fillStyle = '#780001';
  ctx.fillRect(px + 1, py + 3, pw - 2, ph - 5);

  ctx.save();
  ctx.beginPath();
  ctx.rect(px + 2, py + 3, pw - 4, ph - 6);
  ctx.clip();
  for (let sx = px - 20; sx < px + pw + 20; sx += 12) {
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.moveTo(sx, py + ph - 2);
    ctx.lineTo(sx + 6, py + ph - 2);
    ctx.lineTo(sx + 12, py + 2);
    ctx.lineTo(sx + 6, py + 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Ala inferior de la viga
  ctx.fillStyle = '#590d22';
  ctx.fillRect(px, py + ph - 2, pw, 2);

  // Remaches
  ctx.fillStyle = '#ffffff';
  for (let rx = px + 4; rx < px + pw; rx += 14) {
    ctx.fillRect(rx, py + 1, 1, 1);
    ctx.fillRect(rx, py + ph - 2, 1, 1);
  }
}

// 7. AZOTEA MONUMENTAL DEL RASCACIELOS (PISO 100 / HELIPUERTO)
function drawSkyscraperRooftopLevel(ctx, px, py, pw, ph, p, frame) {
  // Base de hormigón armado y grava asfáltica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 3, pw, ph - 3);

  // Placas de cubierta de mantenimiento
  for (let tx = px; tx < px + pw; tx += 28) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(tx, py + 1, 26, 3);
  }

  // Coronación de aluminio
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 1);

  // Franja perimetral de peligro amarilla y negra
  for (let hx = px; hx < px + pw; hx += 16) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(hx, py + 4, 8, 2);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(hx + 8, py + 4, 8, 2);
  }

  // Helipuerto monumental corporativo
  const heliX = px + Math.min(220, Math.floor(pw * 0.45));
  const heliR = 22;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(heliX, py + 18, heliR, 10, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Letra H gigante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(heliX - 9, py + 11, 4, 14);
  ctx.fillRect(heliX + 5, py + 11, 4, 14);
  ctx.fillRect(heliX - 5, py + 16, 10, 3);

  // Balizas perimetrales del helipuerto
  const heliPulse = Math.sin(frame * 0.15) * 0.4 + 0.6;
  ctx.fillStyle = `rgba(255, 209, 102, ${heliPulse})`;
  ctx.fillRect(heliX - heliR - 2, py + 16, 4, 4);
  ctx.fillRect(heliX + heliR - 2, py + 16, 4, 4);

  // Turbinas y chillers HVAC
  for (let vx = px + 60; vx < px + pw - 60; vx += 130) {
    if (Math.abs(vx - heliX) < 45) continue;
    ctx.fillStyle = '#334155';
    ctx.fillRect(vx, py + 8, 32, 14);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(vx + 2, py + 10, 28, 10);
    const fanAngle = (frame * 0.35 + vx) % (Math.PI * 2);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(vx + 16 - Math.cos(fanAngle) * 8, py + 15 - Math.sin(fanAngle) * 3);
    ctx.lineTo(vx + 16 + Math.cos(fanAngle) * 8, py + 15 + Math.sin(fanAngle) * 3);
    ctx.stroke();
  }

  // Balizas de aviación rojas intermitentes en las esquinas
  const isBeacon = Math.floor(frame * 0.1) % 2 === 0;
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 4, py - 16, 2, 16);
  ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
  ctx.fillRect(px + 3, py - 19, 4, 4);
  if (isBeacon) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(px, py - 22, 10, 10);
  }

  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + pw - 6, py - 16, 2, 16);
  ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
  ctx.fillRect(px + pw - 7, py - 19, 4, 4);
  if (isBeacon) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(px + pw - 10, py - 22, 10, 10);
  }

  // Grietas dinámicas durante el terremoto
  if (typeof earthquakeTriggered !== 'undefined' && earthquakeTriggered) {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + 140, py);
    ctx.lineTo(px + 155, py + 12);
    ctx.lineTo(px + 150, py + 24);
    ctx.moveTo(px + 310, py);
    ctx.lineTo(px + 300, py + 10);
    ctx.lineTo(px + 318, py + 22);
    ctx.stroke();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawDisasterPlatform,
    drawSubmergedHighway,
    drawShippingContainer,
    drawCargoShipHull,
    drawSubmergedSkyscraperRoof,
    drawTsunamiBarrelWave,
    drawConstructionGirder,
    drawSkyscraperRooftopLevel
  };
}
