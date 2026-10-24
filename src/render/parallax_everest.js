// ============================================================================
// FONDO PARALLAX MUNDO 4: EL MONTE EVEREST Y LAS CUMBRES HELADAS (CELESTE STYLE)
// ============================================================================
// 1. Cielo alpino helado con degradado ártico y suave resplandor de alpenglow
// 2. Silueta colosal del Monte Everest en la lejanía con picos nevados y glaciares
// 3. Cordillera media de picos escarpados de pizarra y abetos alpinos
// 4. Copos de nieve flotando suavemente en la atmósfera

function drawEverestParallax(ctx, camX, frame) {
  // 0. Si la cámara está en el Valle Oculto de Shambhala (Mundo 4 - Fase 7: X 29400 -> 33100)
  if (camX >= 29300 && camX <= 33150) {
    drawShambhalaParallax(ctx, camX, frame);
    return;
  }

  // 1. Degradado del cielo ártico alpino
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0b132b');      // Azul medianoche polar
  grad.addColorStop(0.42, '#1c2541');   // Índigo de alta montaña
  grad.addColorStop(0.72, '#3a506b');   // Azul pizarra frío
  grad.addColorStop(0.88, '#6c757d');   // Bruma de glaciares
  grad.addColorStop(1, '#f1c0e8');      // Alpenglow rosado suave en el horizonte
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Luna plateada tenue de alta montaña
  const moonX = Math.round(W * 0.78);
  const moonY = 38;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0b132b';
  ctx.beginPath();
  ctx.arc(moonX + 4, moonY - 2, 9, 0, Math.PI * 2);
  ctx.fill();

  // 3. Picos lejanos del Monte Everest (Capa muy distante, Parallax 0.04)
  const farOffset = Math.round(camX * 0.04);
  const peaks = [
    { x: 30, h: 140, w: 120 },
    { x: 140, h: 175, w: 150 }, // Pico Everest principal
    { x: 280, h: 130, w: 110 },
    { x: 380, h: 155, w: 130 }
  ];

  for (let p of peaks) {
    const px = ((p.x - farOffset) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const py = H - p.h;

    // Cuerpo rocoso oscuro del pico
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(px, H);
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + p.w, H);
    ctx.closePath();
    ctx.fill();

    // Cumbre de nieve perpetua blanca
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(p.w * 0.35), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + Math.floor(p.w * 0.65), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w * 0.52), py + Math.floor(p.h * 0.28));
    ctx.closePath();
    ctx.fill();

    // Sombra azulada del glaciar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(px + Math.floor(p.w / 2) - 1, py, 2, Math.floor(p.h * 0.32));
  }

  // 4. Cordillera intermedia de bosques alpinos y riscos nevados (Parallax 0.12)
  const midOffset = Math.round(camX * 0.12);
  ctx.fillStyle = '#0f172a';
  for (let mi = 0; mi < 10; mi++) {
    const mx = ((mi * 65 - midOffset) % (W + 80) + (W + 80)) % (W + 80) - 40;
    const mh = 50 + (mi % 3) * 16;
    const my = H - mh;

    // Silueta de pino alpino nevado
    ctx.beginPath();
    ctx.moveTo(mx, H);
    ctx.lineTo(mx + 16, my);
    ctx.lineTo(mx + 32, H);
    ctx.closePath();
    ctx.fill();

    // Nieve en las ramas
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(mx + 10, my + 8, 12, 3);
    ctx.fillRect(mx + 6, my + 20, 20, 3);
    ctx.fillStyle = '#0f172a';
  }

  // 5. Copos de nieve flotantes cayendo suavemente
  for (let f = 0; f < 30; f++) {
    const fx = ((f * 33 - frame * 0.5 - camX * 0.2) % W + W) % W;
    const fy = (f * 17 + frame * 0.6) % H;
    const size = f % 3 === 0 ? 2 : 1;
    ctx.fillStyle = f % 2 === 0 ? '#ffffff' : '#caf0f8';
    ctx.fillRect(fx, fy, size, size);
  }
}

// ============================================================================
// PARALLAX MUNDO 4 - FASE 7: EL REINO OCULTO DE SHAMBHALA (VALLE CELESTIAL)
// ============================================================================
function drawShambhalaParallax(ctx, camX, frame) {
  // 1. Degradado del amanecer sagrado de Shambhala (Amatista, Carmesí, Ámbar y Oro)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#150d2a');      // Púrpura cósmico superior
  grad.addColorStop(0.32, '#351848');   // Amatista de las altas cumbres
  grad.addColorStop(0.58, '#782655');   // Rosa magenta cálido
  grad.addColorStop(0.78, '#c75643');   // Ámbar dorado místico
  grad.addColorStop(0.92, '#f59e0b');   // Resplandor de oro puro
  grad.addColorStop(1, '#fef08a');      // Bruma dorada termal del valle
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Sol Sagrado del Loto / Corona Solar Radiante
  const sunX = Math.round(W * 0.74);
  const sunY = 52;
  const haloGlow = Math.sin(frame * 0.05) * 5 + 34;

  const sunGrad = ctx.createRadialGradient(sunX, sunY, 3, sunX, sunY, haloGlow);
  sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
  sunGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.55)');
  sunGrad.addColorStop(0.75, 'rgba(217, 70, 239, 0.22)');
  sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, haloGlow, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 13, 0, Math.PI * 2);
  ctx.fill();

  // Rayos solares sutiles
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.18)';
  ctx.lineWidth = 1.5;
  for (let r = 0; r < 8; r++) {
    const ang = r * Math.PI / 4 + frame * 0.005;
    ctx.beginPath();
    ctx.moveTo(sunX + Math.cos(ang) * 16, sunY + Math.sin(ang) * 16);
    ctx.lineTo(sunX + Math.cos(ang) * (haloGlow + 12), sunY + Math.sin(ang) * (haloGlow + 12));
    ctx.stroke();
  }

  // 3. Picos Celestiales Lejanos de Shambhala (Parallax 0.04)
  const farOffset = Math.round(camX * 0.04);
  const peaks = [
    { x: 20, h: 145, w: 130 },
    { x: 135, h: 180, w: 160 }, // Pico Supremo de Shambhala
    { x: 275, h: 135, w: 120 },
    { x: 380, h: 160, w: 140 }
  ];

  for (let p of peaks) {
    const px = ((p.x - farOffset) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const py = H - p.h;

    // Silueta púrpura de montaña sagrada
    ctx.fillStyle = '#2c1236';
    ctx.beginPath();
    ctx.moveTo(px, H);
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + p.w, H);
    ctx.closePath();
    ctx.fill();

    // Cumbre de nieve dorada iluminada por el sol
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(p.w * 0.35), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + Math.floor(p.w * 0.65), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w * 0.52), py + Math.floor(p.h * 0.28));
    ctx.closePath();
    ctx.fill();

    // Arista iluminada de cuarzo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + Math.floor(p.w / 2) - 1, py, 2, Math.floor(p.h * 0.28));
  }

  // 4. Cordillera Intermedia: Pagodas Doradas y Chortens Tibetanos en la niebla (Parallax 0.10)
  const midOffset = Math.round(camX * 0.10);
  for (let mi = 0; mi < 8; mi++) {
    const mx = ((mi * 85 - midOffset) % (W + 120) + (W + 120)) % (W + 120) - 60;
    const mh = 55 + (mi % 3) * 18;
    const my = H - mh;

    // Colina rocosa redondeada de jade y basalto
    ctx.fillStyle = '#45163e';
    ctx.beginPath();
    ctx.arc(mx + 30, H + 10, 48, Math.PI, Math.PI * 2);
    ctx.fill();

    // Silueta de Pagoda Dorada lejana
    if (mi % 2 === 0) {
      const pagX = mx + 24;
      const pagY = my + 8;
      ctx.fillStyle = '#661b47';
      ctx.fillRect(pagX - 6, pagY, 12, 16);
      // Tejadillo alado dorado
      ctx.fillStyle = '#d97706';
      ctx.fillRect(pagX - 10, pagY - 2, 20, 3);
      ctx.fillRect(pagX - 7, pagY - 8, 14, 6);
      ctx.fillRect(pagX - 11, pagY - 10, 22, 2);
      // Pináculo
      ctx.fillStyle = '#fde047';
      ctx.fillRect(pagX - 1, pagY - 16, 2, 6);
      // Ventana iluminada
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(pagX - 2, pagY + 4, 4, 5);
    }
  }

  // 5. Esporas de Loto y Partículas Doradas que ascienden en la atmósfera sagrada
  for (let s = 0; s < 36; s++) {
    const sx = ((s * 41 + frame * 0.4 + Math.sin(frame * 0.03 + s) * 14 - camX * 0.14) % W + W) % W;
    const sy = ((s * 23 - frame * 0.35) % H + H) % H;
    const glow = Math.sin(frame * 0.12 + s) * 0.3 + 0.7;
    ctx.fillStyle = (s % 3 === 0)
      ? 'rgba(56, 189, 248, ' + glow.toFixed(2) + ')'
      : 'rgba(254, 240, 138, ' + glow.toFixed(2) + ')';
    const sz = (s % 5 === 0) ? 2 : 1;
    ctx.fillRect(sx, sy, sz, sz);
  }

  // 6. Bruma termal cálida del fondo
  const mistGrad = ctx.createLinearGradient(0, H - 34, 0, H);
  mistGrad.addColorStop(0, 'rgba(254, 240, 138, 0)');
  mistGrad.addColorStop(0.5, 'rgba(103, 232, 249, 0.12)');
  mistGrad.addColorStop(1, 'rgba(254, 240, 138, 0.28)');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(0, H - 34, W, 34);
}

if (typeof module !== 'undefined') {
  module.exports = { drawEverestParallax, drawShambhalaParallax };
}
