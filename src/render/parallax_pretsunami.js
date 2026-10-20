// ============================================================================
// FONDO PARALLAX PRE-TSUNAMI: CIUDAD COSTERA AL ANOCHECER TORMENTOSO (FASE 4)
// ============================================================================
// Atmósfera de tensión previa a la catástrofe (X: 11800 -> 14400):
// 1. Cielo crepuscular violeta-índigo con resplandor ámbar en el horizonte
// 2. Nubes cumulonimbus de tormenta aglomerándose en la lejanía sobre el mar
// 3. Océano retirado hacia el horizonte, dejando al descubierto arrecifes y bancos de arena
// 4. Siluetas de rascacielos lejanos con ventanales iluminados y balizas de alarma rojas
// 5. Destellos intermitentes de relámpagos distantes en la línea de la tempestad

function drawPreTsunamiSky(ctx, camX, frame) {
  // 1. Gradiente del cielo pre-catástrofe (Violeta oscuro a ámbar amenazante)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0a0d24');      // Índigo noche cerrado
  grad.addColorStop(0.38, '#1d1135');   // Violeta oscuro tempestuoso
  grad.addColorStop(0.68, '#3d1245');   // Púrpura de marea
  grad.addColorStop(0.88, '#6a1b4d');   // Carmesí crepuscular
  grad.addColorStop(1, '#d94e28');      // Filo ámbar-fuego en el horizonte del mar
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Relámpagos lejanos en la línea del frente de tormenta
  const isLightning = (frame % 220 < 4) || (frame % 380 === 15);
  if (isLightning) {
    ctx.fillStyle = 'rgba(230, 210, 255, 0.28)';
    ctx.fillRect(0, 0, W, H);
  }

  // 3. Estrellas y planetas tempranos brillando entre las brumas altas
  for (let s = 0; s < 24; s++) {
    const sx = ((s * 59 - Math.round(camX * 0.04)) % W + W) % W;
    const sy = 12 + (s * 19) % 65;
    const twinkle = (frame + s * 9) % 36 < 18;
    ctx.fillStyle = twinkle ? '#ffffff' : '#ffd166';
    ctx.fillRect(sx, sy, 1, 1);
  }

  // 4. Silueta del gran frente de nubes oscuras de tormenta (Cumulonimbus)
  const cloudSpeed = frame * 0.22;
  for (let ci = 0; ci < 6; ci++) {
    const cx = ((ci * 110 + 30 - cloudSpeed) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const cy = 28 + (ci % 3) * 12;
    const cw = 60 + (ci % 2) * 26;

    ctx.fillStyle = isLightning ? 'rgba(75, 45, 95, 0.85)' : 'rgba(20, 10, 30, 0.82)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, Math.floor(cw / 2), 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isLightning ? '#b388ff' : '#2b1b3d';
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.floor(cw / 2), 10, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 8, cy - 3, Math.floor(cw / 3), 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 2, Math.floor(cw / 3.5), 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Océano retirado hacia el horizonte (Calma tensa antes de la ola)
  const seaY = H - 52;
  const seaGrad = ctx.createLinearGradient(0, seaY, 0, H);
  seaGrad.addColorStop(0, '#001233');
  seaGrad.addColorStop(0.4, '#03045e');
  seaGrad.addColorStop(1, '#023e8a');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, seaY, W, 18);

  // Cresta oscura de la gran masa de agua que se agrupa mar adentro
  ctx.fillStyle = '#010b19';
  ctx.fillRect(0, seaY, W, 2);

  // Arrecifes y lecho marino expuesto por la bajamar extrema
  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(0, seaY + 16, W, H - (seaY + 16));
  ctx.fillStyle = '#2b2622';
  for (let bx = 0; bx < W; bx += 28) {
    ctx.fillRect(bx, seaY + 14, 18, 4);
    ctx.fillStyle = '#4a4036';
    ctx.fillRect(bx + 4, seaY + 13, 8, 2);
  }

  // 6. Rascacielos lejanos de la ciudad costera con ventanales encendidos
  const bldgOffset = Math.round(camX * 0.08);
  for (let bi = 0; bi < 10; bi++) {
    const bx = ((bi * 68 + 14 - bldgOffset) % (W + 80) + (W + 80)) % (W + 80) - 40;
    const bh = 54 + (bi % 4) * 16;
    const by = seaY + 14 - bh;
    const bw = 24 + (bi % 3) * 6;

    // Cuerpo del rascacielos
    ctx.fillStyle = '#110d1f';
    ctx.fillRect(bx, by, bw, bh);

    // Borde de recorte
    ctx.fillStyle = '#1e1735';
    ctx.fillRect(bx, by, bw, 2);

    // Ventanales iluminados en tono ámbar y cian
    for (let wy = by + 6; wy < by + bh - 6; wy += 8) {
      for (let wx = bx + 3; wx < bx + bw - 4; wx += 6) {
        if ((bi + wx + wy) % 3 === 0) {
          ctx.fillStyle = (bi % 2 === 0) ? '#ffd166' : '#90e0ef';
          ctx.fillRect(wx, wy, 3, 4);
        }
      }
    }

    // Baliza roja de aviación parpadeante en la cúspide
    const isBeacon = Math.floor(frame * 0.08 + bi) % 2 === 0;
    ctx.fillStyle = '#495057';
    ctx.fillRect(bx + Math.floor(bw / 2) - 1, by - 6, 2, 6);
    ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
    ctx.fillRect(bx + Math.floor(bw / 2) - 2, by - 8, 4, 3);
    if (isBeacon) {
      ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
      ctx.fillRect(bx + Math.floor(bw / 2) - 4, by - 10, 8, 7);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawPreTsunamiSky };
}
