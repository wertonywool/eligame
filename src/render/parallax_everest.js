// ============================================================================
// FONDO PARALLAX MUNDO 4: EL MONTE EVEREST Y LAS CUMBRES HELADAS (CELESTE STYLE)
// ============================================================================
// 1. Cielo alpino helado con degradado ártico y suave resplandor de alpenglow
// 2. Silueta colosal del Monte Everest en la lejanía con picos nevados y glaciares
// 3. Cordillera media de picos escarpados de pizarra y abetos alpinos
// 4. Copos de nieve flotando suavemente en la atmósfera

function drawEverestParallax(ctx, camX, frame) {
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

if (typeof module !== 'undefined') {
  module.exports = { drawEverestParallax };
}
