// ============================================================================
// SPRITES MUNDO 3: MEGATSUNAMI, ESCOMBROS Y TENTÁCULOS (PIXEL ART)
// ============================================================================

function drawTsunamiWave(ctx, x, y, w, h, frame) {
  if (typeof drawRealisticTsunamiWall === 'function') {
    drawRealisticTsunamiWall(ctx, x, y, w, h, frame);
    return;
  }
  const px = Math.round(x);
  const py = Math.round(y);
  const t = frame * 0.055;
  const surgeHeight = Math.max(h, 48);
  const bobSurge = Math.sin(t * 1.5 + x * 0.02) * 5;

  const waveGrad = ctx.createLinearGradient(px, py - 15, px, py + surgeHeight);
  waveGrad.addColorStop(0, '#00b4d8');
  waveGrad.addColorStop(0.18, '#0077b6');
  waveGrad.addColorStop(0.5, '#023e8a');
  waveGrad.addColorStop(1, '#001233');
  ctx.fillStyle = waveGrad;
  ctx.fillRect(px, py + bobSurge, w, surgeHeight);

  // Vórtices internos
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py + bobSurge, w, surgeHeight);
  ctx.clip();
  for (let vx = px - 10; vx < px + w + 10; vx += 24) {
    const vOffset = Math.sin(t * 2.2 + vx * 0.12) * 6;
    ctx.fillStyle = 'rgba(72, 202, 228, 0.28)';
    ctx.fillRect(vx + vOffset, py + 8 + bobSurge, 16, 3);
    ctx.fillStyle = 'rgba(2, 62, 138, 0.45)';
    ctx.fillRect(vx - vOffset, py + 16 + bobSurge, 18, 4);
  }
  ctx.restore();

  // Cresta con espuma violenta y spray
  const step = 5;
  for (let ox = 0; ox < w; ox += step) {
    const curX = px + ox;
    const waveCurl = Math.sin(t * 3.2 + curX * 0.14) * 4.5 + Math.cos(t * 1.8 + curX * 0.08) * 3.0;
    const crestY = py + bobSurge + Math.round(waveCurl);

    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, crestY + 5, step, 5);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, crestY + 2, step, 4);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, crestY, step, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, crestY - 2, step, 2);

    if ((frame + ox) % 4 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 1, crestY - 7, 2, 2);
      ctx.fillRect(curX + 3, crestY - 11, 2, 2);
    }
  }
}

function drawFloatingDebris(ctx, x, y, type = 'slab', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const floatBob = Math.round(Math.sin(frame * 0.06 + x) * 2.5);
  const by = py + floatBob;

  if (type === 'girder') {
    // Viga de acero estructural I-Beam industrial con franjas amarillas de peligro
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 6, 42, 9);
    ctx.fillStyle = '#293241';
    ctx.fillRect(px, by - 5, 40, 7);
    ctx.fillStyle = '#3d5a80';
    ctx.fillRect(px + 1, by - 4, 38, 5);

    // Franjas diagonales de advertencia reflectantes (Hazard yellow / black)
    for (let hx = px + 4; hx < px + 36; hx += 8) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(hx, by - 4, 4, 5);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(hx + 4, by - 4, 4, 5);
    }
    // Remaches de unión
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(px + 2, by - 3, 2, 2);
    ctx.fillRect(px + 36, by - 3, 2, 2);
  } else if (type === 'slab') {
    // Losa de autopista / concreto fracturado con varillas de ferralla expuestas
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 1, by - 8, 48, 13);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px, by - 7, 46, 11);
    ctx.fillStyle = '#495057';
    ctx.fillRect(px + 2, by - 6, 42, 9);
    ctx.fillStyle = '#6c757d';
    ctx.fillRect(px + 4, by - 5, 38, 2); // Capa superficial de rodadura

    // Varillas de hierro corrugado oxidado saliendo de la fractura
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(px + 44, by - 5, 6, 2);
    ctx.fillRect(px - 5, by - 3, 6, 2);
    ctx.fillStyle = '#a3704c';
    ctx.fillRect(px + 46, by - 4, 3, 1);

    // Algas marinas y musgo adherido al concreto húmedo
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(px + 8, by + 1, 14, 3);
    ctx.fillRect(px + 28, by, 10, 4);
  } else if (type === 'car' || type === 'taxi') {
    // Taxi metropolitano urbano amarillo sumergido y a la deriva
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 13, 38, 13);
    // Carrocería amarilla
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(px, by - 12, 36, 11);
    ctx.fillStyle = '#fb8500';
    ctx.fillRect(px + 2, by - 8, 32, 7);

    // Franja lateral a cuadros blanco y negro de taxi
    for (let cx = px + 4; cx < px + 32; cx += 4) {
      const isWhite = ((cx - px) % 8 === 4);
      ctx.fillStyle = isWhite ? '#ffffff' : '#14101c';
      ctx.fillRect(cx, by - 7, 4, 2);
    }

    // Parabrisas agrietado reflejando el agua
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(px + 6, by - 11, 7, 4);
    ctx.fillRect(px + 22, by - 11, 8, 4);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px + 13, by - 11, 2, 4); // Pilar de puerta

    // Letrero luminoso TAXI en el techo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 14, by - 15, 8, 3);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 15, by - 14, 6, 1);

    // Ruedas y faldón en el agua
    ctx.fillStyle = '#212529';
    ctx.fillRect(px + 4, by - 2, 7, 2);
    ctx.fillRect(px + 24, by - 2, 7, 2);
  } else if (type === 'container') {
    // Contenedor de carga flotante a la deriva
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 11, 38, 12);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px, by - 10, 36, 10);
    // Nervios ondulados
    for (let rx = px + 4; rx < px + 32; rx += 5) {
      ctx.fillStyle = '#023e8a';
      ctx.fillRect(rx, by - 9, 2, 8);
      ctx.fillStyle = '#0096c7';
      ctx.fillRect(rx + 2, by - 9, 2, 8);
    }
    // Cantoneras
    ctx.fillStyle = '#212529';
    ctx.fillRect(px, by - 10, 4, 3);
    ctx.fillRect(px + 32, by - 10, 4, 3);
  }

  // Estela de espuma blanca alrededor de la pieza flotante
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillRect(px - 3, by - 1, 6, 2);
  ctx.fillRect(px + 34, by - 1, 6, 2);
}

function drawKrakenTentacle(ctx, x, y, frame, scale = 1) {
  const px = Math.round(x), py = Math.round(y);
  const wave = Math.sin(frame * 0.05 + x * 0.1) * 8;

  // Anillo de espuma y oleaje turbulento en la base del tentáculo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(px - 18, py - 4, 36, 5);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 14, py - 6, 28, 3);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px - 20, py - 2, 40, 2);

  const segs = [
    { dy: -8, w: 16, ox: 0 },
    { dy: -20, w: 14, ox: wave * 0.3 },
    { dy: -32, w: 12, ox: wave * 0.7 },
    { dy: -44, w: 10, ox: wave * 1.0 },
    { dy: -56, w: 7, ox: wave * 1.3 },
    { dy: -66, w: 4, ox: wave * 1.5 }
  ];

  // Contorno oscuro abisal
  ctx.fillStyle = '#000814';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2 - 1, py + s.dy - 1, s.w + 2, 13));

  // Masa del tentáculo en azul índigo oceánico profundo
  ctx.fillStyle = '#03045e';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2, py + s.dy, s.w, 12));

  // Reflejo dorsal en azul marino vivo
  ctx.fillStyle = '#0077b6';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2 + 1, py + s.dy, 2, 12));

  // Ventosas bioluminiscentes en cian y aguamarina brillante
  const pulse = Math.sin(frame * 0.1 + px * 0.05) * 0.25 + 0.75;
  ctx.fillStyle = pulse > 0.8 ? '#00f5d4' : '#caf0f8';
  segs.forEach((s, idx) => {
    if (idx > 0 && idx < 5) {
      // Ventosas laterales
      ctx.fillRect(px + s.ox - s.w / 2 + 2, py + s.dy + 3, 3, 3);
      ctx.fillRect(px + s.ox + s.w / 2 - 4, py + s.dy + 3, 3, 3);
    }
  });
}

function drawDebrisPile(ctx, x, y, frame) {
  const px = Math.round(x), py = Math.round(y);
  // Base de escombros con maderas, tuberías y balizas náuticas
  ctx.fillStyle = '#0a1128';
  ctx.fillRect(px - 18, py - 12, 36, 12);
  ctx.fillStyle = '#343a40';
  ctx.fillRect(px - 16, py - 10, 32, 10);
  ctx.fillStyle = '#7f5539';
  ctx.fillRect(px - 10, py - 14, 18, 5);
  ctx.fillStyle = '#b08968';
  ctx.fillRect(px - 8, py - 13, 14, 2);
  // Señal o boya de advertencia
  ctx.fillStyle = (frame % 30 < 15) ? '#ffd166' : '#d90429';
  ctx.fillRect(px - 4, py - 18, 8, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, py - 16, 4, 2);
}

function drawTsunamiDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);
  if (d.subType === 'tsunami_wave') drawTsunamiWave(ctx, px, py, d.w || 80, d.h || 24, frame);
  else if (d.subType === 'floating_debris') drawFloatingDebris(ctx, px, py, d.debrisType || 'slab', frame);
  else if (d.subType === 'kraken_tentacle') drawKrakenTentacle(ctx, px, py, frame, d.scale || 1);
  else if (d.subType === 'debris_pile') drawDebrisPile(ctx, px, py, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawTsunamiDecoration = drawTsunamiDecoration;
  SpriteManager.prototype.drawTsunamiWave = drawTsunamiWave;
  SpriteManager.prototype.drawFloatingDebris = drawFloatingDebris;
  SpriteManager.prototype.drawKrakenTentacle = drawKrakenTentacle;
  SpriteManager.prototype.drawDebrisPile = drawDebrisPile;
}

if (typeof module !== 'undefined') {
  module.exports = { drawTsunamiWave, drawFloatingDebris, drawKrakenTentacle, drawDebrisPile, drawTsunamiDecoration };
}
