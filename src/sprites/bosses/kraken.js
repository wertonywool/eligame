// ============================================================================
// SPRITES JEFE: KRAKEN DE LAS PROFUNDIDADES (TITÁN ABISAL DEL MEGATSUNAMI)
// ============================================================================
// Cefalópodo titánico con manto orgánico redondeado, aletas laterales de manta,
// 8 ojos bioluminiscentes con pupilas rastreadoras, pico córneos de obsidiana,
// tentáculos maestros ondulantes y vórtice de marea en su base.

function drawKrakenBoss(ctx, k, frame) {
  const px = Math.round(k.x);
  const py = Math.round(k.y);
  const bob = Math.round(Math.sin(frame * 0.07) * 5);
  const hitFlash = k.hitTimer > 0;
  const phase = k.phase || 1;
  const eyesLeft = k.eyesRemaining !== undefined ? k.eyesRemaining : 8;

  // Dirección hacia donde mira el Kraken (persigue al jugador)
  const playerDir = (typeof player !== 'undefined' && player) ? (player.x < px ? -1 : 1) : -1;

  ctx.save();

  // --------------------------------------------------------------------------
  // 1. TENTÁCULOS MAESTROS TRASEROS (ALZÁNDOSE EN LOS FLANCOS)
  // --------------------------------------------------------------------------
  drawMasterTentacle(ctx, px - 52, py - 12 + bob, frame, -1, phase, hitFlash);
  drawMasterTentacle(ctx, px + 52, py - 12 + bob, frame + 16, 1, phase, hitFlash);

  // --------------------------------------------------------------------------
  // 2. VÓRTICE DE AGUA Y REMOLINO DE FONDO EN LA BASE
  // --------------------------------------------------------------------------
  const vortexGrad = ctx.createLinearGradient(px - 60, py + 30, px + 60, py + 65);
  vortexGrad.addColorStop(0, '#001233');
  vortexGrad.addColorStop(0.4, '#023e8a');
  vortexGrad.addColorStop(0.8, '#0077b6');
  vortexGrad.addColorStop(1, '#001233');
  ctx.fillStyle = vortexGrad;
  ctx.beginPath();
  ctx.ellipse(px, py + 48, 62, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  // Anillos de espuma concéntricos y spray girando en el vórtice
  for (let ring = 0; ring < 3; ring++) {
    const ringRad = 36 + ring * 12;
    const ringY = py + 45 + ring * 5;
    ctx.strokeStyle = ring % 2 === 0 ? 'rgba(202, 240, 248, 0.75)' : 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(px, ringY, ringRad, ringRad * 0.28, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Chorro / spray de agua pulverizada salpicando hacia los lados
  for (let sp = 0; sp < 6; sp++) {
    const spAngle = (frame * 0.12 + sp * 1.1) % (Math.PI * 2);
    const spDist = 44 + (sp % 3) * 9;
    const spX = px + Math.cos(spAngle) * spDist;
    const spY = py + 48 + Math.sin(spAngle) * (spDist * 0.25);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(spX, spY, 2, 2);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(spX + 1, spY - 2, 2, 2);
  }

  // --------------------------------------------------------------------------
  // 3. MANTO ORGÁNICO ESCULPIDO DEL KRAKEN (CÚPULA CEFALÓPODA Y ALETAS)
  // --------------------------------------------------------------------------
  // Paleta dinámica según fase y daño
  const outCol = hitFlash ? '#ffffff' : '#000814';
  const mantleCol = hitFlash ? '#caf0f8' : (phase === 3 ? '#0a192f' : '#03045e');
  const toneCol = hitFlash ? '#ffffff' : (phase === 3 ? '#1c2541' : '#0077b6');
  const cyanGlow = phase === 3 ? '#ff0054' : (phase === 2 ? '#00f5d4' : '#00b4d8');

  // Aletas laterales ondulantes (Manta flukes) que se ensanchan a los lados
  const finWave = Math.sin(frame * 0.08) * 3;
  ctx.fillStyle = outCol;
  ctx.beginPath();
  ctx.ellipse(px - 38 + finWave, py - 20 + bob, 16, 26, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 38 - finWave, py - 20 + bob, 16, 26, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = mantleCol;
  ctx.beginPath();
  ctx.ellipse(px - 38 + finWave, py - 20 + bob, 14, 24, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 38 - finWave, py - 20 + bob, 14, 24, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Borde brillante de las aletas
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(px - 51 + finWave, py - 22 + bob, 2, 14);
  ctx.fillRect(px + 49 - finWave, py - 22 + bob, 2, 14);

  // Cúpula del manto principal (Esculpida de arriba a abajo)
  // Nivel 1: Punta apical superior del manto
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 12, py - 66 + bob, 24, 14);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 10, py - 64 + bob, 20, 12);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 6, py - 63 + bob, 12, 6);

  // Nivel 2: Cúpula superior media
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 22, py - 54 + bob, 44, 16);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 20, py - 52 + bob, 40, 14);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 14, py - 50 + bob, 28, 8);

  // Nivel 3: Masa muscular del manto y frente
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 34, py - 40 + bob, 68, 22);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 32, py - 38 + bob, 64, 20);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 24, py - 36 + bob, 48, 10);

  // Nivel 4: Cresta supraciliar y ceja acorazada
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 40, py - 20 + bob, 80, 26);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 38, py - 18 + bob, 76, 24);

  // Placas de armadura quitinosa abisal en la ceja
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 34, py - 16 + bob, 68, 6);
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 2, py - 16 + bob, 4, 6); // Separador nasal central

  // Vetas bioluminiscentes ramificadas (pulso cardíaco)
  const pulseSpeed = phase === 3 ? 0.35 : (phase === 2 ? 0.22 : 0.12);
  const pulse = Math.sin(frame * pulseSpeed) * 0.3 + 0.7;
  let veinCol = '#00b4d8';
  if (phase === 2) veinCol = pulse > 0.75 ? '#00f5d4' : '#48cae4';
  else if (phase === 3) veinCol = pulse > 0.65 ? '#ffd166' : '#ff0054';

  ctx.fillStyle = veinCol;
  // Tronco central de energía
  ctx.fillRect(px - 1, py - 60 + bob, 2, 22);
  // Ramas diagonales izquierda y derecha
  ctx.fillRect(px - 14, py - 48 + bob, 10, 2);
  ctx.fillRect(px + 4, py - 48 + bob, 10, 2);
  ctx.fillRect(px - 22, py - 38 + bob, 14, 2);
  ctx.fillRect(px + 8, py - 38 + bob, 14, 2);

  // --------------------------------------------------------------------------
  // 4. LOS 8 OJOS DEL KRAKEN (ALMENDRADOS CON SEGUIMIENTO Y DAÑO)
  // --------------------------------------------------------------------------
  const eyeCoords = [
    // Fila superior (4 ojos arqueados)
    { ox: -24, oy: -20, r: 4 },
    { ox: -9, oy: -23, r: 5 },
    { ox: 9, oy: -23, r: 5 },
    { ox: 24, oy: -20, r: 4 },
    // Fila inferior (4 ojos principales grandes)
    { ox: -26, oy: -9, r: 5 },
    { ox: -9, oy: -11, r: 6 },
    { ox: 9, oy: -11, r: 6 },
    { ox: 26, oy: -9, r: 5 }
  ];

  for (let i = 0; i < 8; i++) {
    const c = eyeCoords[i];
    const ex = px + c.ox;
    const ey = py + c.oy + bob;
    const isAlive = i < eyesLeft;
    const size = c.r;

    // Cuenca ocular sombría
    ctx.fillStyle = '#000814';
    ctx.fillRect(ex - size - 1, ey - size - 1, size * 2 + 2, size * 2 + 2);

    if (isAlive) {
      // Esclerótica brillante
      ctx.fillStyle = phase === 3 ? '#ffbe0b' : (phase === 2 ? '#ffd166' : '#caf0f8');
      ctx.fillRect(ex - size, ey - size, size * 2, size * 2);

      // Iris con color dinámico de fase
      const irisCol = phase === 3 ? '#ff0054' : (phase === 2 ? '#ffb703' : '#00b4d8');
      ctx.fillStyle = irisCol;
      ctx.fillRect(ex - size + 1, ey - size + 1, size * 2 - 2, size * 2 - 2);

      // Pupila vertical rasgada que sigue activamente la posición del jugador
      const pupilShiftX = playerDir * 1;
      ctx.fillStyle = '#000814';
      ctx.fillRect(ex + pupilShiftX - 1, ey - size + 1, 2, size * 2 - 2);

      // Brillo especular húmedo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ex - size + 1, ey - size + 1, 1, 1);
    } else {
      // Ojo destruido / cegado
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(ex - size, ey - size, size * 2, size * 2);

      // Cicatriz horizontal
      ctx.fillStyle = '#343a40';
      ctx.fillRect(ex - size + 1, ey, size * 2 - 2, 2);

      // Tinta abisal brotando hacia abajo
      ctx.fillStyle = '#000814';
      ctx.fillRect(ex - 1, ey + size, 2, 6);
      ctx.fillRect(ex, ey + size + 6, 2, 4);
    }
  }

  // --------------------------------------------------------------------------
  // 5. PICO CÓRNEO DE OBSIDIANA Y MANDÍBULA RAPAZ
  // --------------------------------------------------------------------------
  const beakY = py + 7 + bob;
  const isRoaring = hitFlash || (frame % 80 < 22);

  // Cavidad bucal profunda
  ctx.fillStyle = '#000814';
  ctx.fillRect(px - 16, beakY - 4, 32, 22);

  // Pico superior curvado de obsidiana
  ctx.fillStyle = '#1b263b';
  ctx.fillRect(px - 12, beakY - 2, 24, 8);
  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(px - 8, beakY + 4, 16, 6);
  // Filo afilado de corte ámbar
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, beakY + 8, 4, 3);

  // Dientes cónicos córneos
  ctx.fillStyle = '#ffffff';
  for (let d = 0; d < 5; d++) {
    const dx = px - 9 + d * 4;
    ctx.fillRect(dx, beakY, 2, 2);
    if (isRoaring) {
      ctx.fillRect(dx, beakY + 12, 2, 2);
    }
  }

  // Saliva y espuma de mar goteando del pico
  if (frame % 6 < 3) {
    ctx.fillStyle = 'rgba(144, 224, 239, 0.75)';
    ctx.fillRect(px - 4, beakY + 12, 2, 5);
    ctx.fillRect(px + 3, beakY + 11, 2, 6);
  }

  // --------------------------------------------------------------------------
  // 6. BRAZOS FRONTALES CORTOS EN LA BASE
  // --------------------------------------------------------------------------
  for (let a = -2; a <= 2; a++) {
    if (a === 0) continue;
    const ax = px + a * 14;
    const awave = Math.sin(frame * 0.1 + a) * 4;
    const ay = py + 22 + bob + awave;

    ctx.fillStyle = outCol;
    ctx.fillRect(ax - 5, ay, 10, 14);
    ctx.fillStyle = mantleCol;
    ctx.fillRect(ax - 4, ay + 1, 8, 12);
    // Ventosa frontal bioluminiscente
    ctx.fillStyle = veinCol;
    ctx.fillRect(ax - 2, ay + 4, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ax - 1, ay + 5, 2, 2);
  }

  ctx.restore();
}

// RENDERIZADO DEL TENTÁCULO MAESTRO LATERAL GIGANTE
function drawMasterTentacle(ctx, tx, ty, frame, dir, phase, hitFlash) {
  const wave = Math.sin(frame * 0.08) * 10;
  const curl = Math.cos(frame * 0.05) * 8;

  const segs = [
    { dx: 0, dy: 30, w: 20 },
    { dx: dir * 8 + wave * 0.2, dy: 14, w: 18 },
    { dx: dir * 18 + wave * 0.5, dy: -4, w: 16 },
    { dx: dir * 26 + wave * 0.8, dy: -24, w: 14 },
    { dx: dir * 30 + wave * 1.1 + curl * 0.4, dy: -46, w: 12 },
    { dx: dir * 28 + wave * 1.4 + curl * 0.8, dy: -68, w: 9 },
    { dx: dir * 20 + wave * 1.6 + curl * 1.2, dy: -86, w: 6 },
    { dx: dir * 10 + wave * 1.8 + curl * 1.5, dy: -100, w: 3 }
  ];

  // Silueta contorno
  ctx.fillStyle = hitFlash ? '#ffffff' : '#000814';
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2) - 1, ty + s.dy - 1, s.w + 2, 16);
  });

  // Masa del tentáculo
  const tentCol = hitFlash ? '#caf0f8' : (phase === 3 ? '#0a192f' : '#03045e');
  ctx.fillStyle = tentCol;
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2), ty + s.dy, s.w, 14);
  });

  // Franja dorsal reflectante
  ctx.fillStyle = phase === 3 ? '#1c2541' : '#0077b6';
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2) + 2, ty + s.dy, 3, 14);
  });

  // Ventosas bioluminiscentes en el lado interior
  const suckerCol = phase === 3 ? '#ffd166' : (phase === 2 ? '#00f5d4' : '#90e0ef');
  segs.forEach((s, idx) => {
    if (idx >= 1 && idx <= 6) {
      const sx = tx + s.dx - dir * Math.floor(s.w / 2) + (dir > 0 ? -3 : 1);
      const sy = ty + s.dy + 3;
      ctx.fillStyle = '#000814';
      ctx.fillRect(sx - 1, sy - 1, 5, 5);
      ctx.fillStyle = suckerCol;
      ctx.fillRect(sx, sy, 3, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx + 1, sy + 1, 1, 1);
    }
  });
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKrakenBoss = drawKrakenBoss;
}

if (typeof module !== 'undefined') {
  module.exports = { drawKrakenBoss };
}
