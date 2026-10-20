// ============================================================================
// PELIGROS: ESPINAS DEL JARDÍN Y FOSOS DE MAGMA / LAVA VOLCÁNICA
// ============================================================================

function drawSpikes(s) {
  if (s.x + s.w < cameraX - 40 || s.x > cameraX + W + 40) return;

  // 1. Mar / Foso de lava volcánica hirviente
  if (s.w > 200) {
    const waveT = globalFrame * 0.12;

    // Fondo del abismo de magma
    ctx.fillStyle = '#0c020e';
    ctx.fillRect(s.x, s.y, s.w, 35);
    ctx.fillStyle = '#2c041c';
    ctx.fillRect(s.x, s.y + 2, s.w, 30);
    ctx.fillStyle = '#5c0c2e';
    ctx.fillRect(s.x, s.y + 5, s.w, 25);

    // Oleaje sinuoso de magma rosa oscuro
    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const h1 = Math.sin((x * 0.05) + waveT) * 3;
      const h2 = Math.cos((x * 0.09) - waveT * 0.8) * 2;
      const waveY = s.y + h1 + h2;

      // Capa de llama rosa oscura
      ctx.fillStyle = '#8f143c';
      ctx.fillRect(x, Math.round(waveY), step, 6);

      // Cresta viva magenta
      ctx.fillStyle = '#b31b52';
      ctx.fillRect(x, Math.round(waveY - 1), step, 3);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(x + 1, Math.round(waveY - 2), step - 2, 2);

      // Espuma incandescente blanca en picos del oleaje
      if (h1 + h2 > 3.2) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 2, Math.round(waveY - 3), 4, 2);
      }
    }

    // Mini-vórtices de burbujas incandescentes
    const bubbleSeed = Math.floor(globalFrame * 0.15);
    for (let i = 0; i < 5; i++) {
      const bx = s.x + ((bubbleSeed * 37 + i * 83) % (s.w - 20));
      const by = s.y - 2 - ((globalFrame * 0.6 + i * 5) % 8);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(Math.round(bx), Math.round(by), 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(bx) + 1, Math.round(by), 1, 1);
    }
    return;
  }

  const isVolcano = level && level.theme === 'volcano';
  const isSnow = (level && level.theme === 'snow') || s.theme === 'snow' || s.subType === 'ice_spikes';

  if (isSnow) {
    // ❄️ Estalagmitas y Púas Afiladas de Hielo Glacial Cristalino (Estilo Celeste)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(s.x, s.y + 5, s.w, 5);

    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const idx = Math.floor((x - s.x) / step);
      const hVar = (idx % 2 === 0) ? 14 : 11;
      const tilt = (idx % 3 === 0) ? -2 : ((idx % 3 === 1) ? 2 : 0);
      const tipX = x + 4 + tilt;
      const tipY = s.y - hVar + 6;

      // Base oscura de hielo profundo
      ctx.fillStyle = '#023e8a';
      ctx.beginPath();
      ctx.moveTo(x - 1, s.y + 8);
      ctx.lineTo(tipX, tipY - 2);
      ctx.lineTo(x + 9, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Cono de hielo cian translúcido
      ctx.fillStyle = '#0077b6';
      ctx.beginPath();
      ctx.moveTo(x, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(x + 8, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Reflejo cristalino
      ctx.fillStyle = '#90e0ef';
      ctx.beginPath();
      ctx.moveTo(x + 1, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(tipX + 1, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Punta afilada y escarcha blanca
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(tipX - 1, tipY, 2, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX - 1, tipY - 1, 2, 2);

      // Destello intermitente de luz polar
      if ((idx * 7 + Math.floor(globalFrame * 0.1)) % 10 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(tipX - 1, tipY - 2, 2, 1);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(tipX - 2, tipY - 1, 4, 1);
      }
    }
    return;
  }

  if (!isVolcano) {
    // 🌹 Espinas de Zarzarrosa / Zarzas Espinosas Mortales del Jardín
    ctx.fillStyle = '#14101c';
    ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
    ctx.fillStyle = '#2b101e';
    ctx.fillRect(s.x, s.y + 5, s.w, 5);

    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const idx = Math.floor((x - s.x) / step);
      const hVar = (idx % 2 === 0) ? 14 : 11;
      const tilt = (idx % 3 === 0) ? -2 : ((idx % 3 === 1) ? 2 : 0);
      const tipX = x + 4 + tilt;
      const tipY = s.y - hVar + 6;

      ctx.fillStyle = '#14101c';
      ctx.beginPath();
      ctx.moveTo(x - 1, s.y + 8);
      ctx.lineTo(tipX, tipY - 2);
      ctx.lineTo(x + 9, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#800f2f';
      ctx.beginPath();
      ctx.moveTo(x, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(x + 8, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#c9184a';
      ctx.beginPath();
      ctx.moveTo(x + 1, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(tipX + 1, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ff758f';
      ctx.fillRect(tipX - 1, tipY, 2, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX - 1, tipY - 1, 2, 2);

      if (idx % 2 === 1) {
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(tipX - 3, tipY + 4, 2, 2);
      }
    }

    const dripIdx = Math.floor(globalFrame * 0.1) % Math.max(1, Math.floor(s.w / step));
    const dripX = s.x + dripIdx * step + 4;
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(dripX, s.y + 2, 2, 3);
    return;
  }

  // Volcán: Estalagmitas afiladas de obsidiana y basalto incandescente rosa oscuro
  ctx.fillStyle = '#07020a';
  ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
  for (let x = s.x; x < s.x + s.w; x += 8) {
    const tipX = x + 4;
    const tipY = s.y - 8;
    ctx.fillStyle = '#07020a';
    ctx.beginPath();
    ctx.moveTo(x - 1, s.y + 8);
    ctx.lineTo(tipX, tipY - 2);
    ctx.lineTo(x + 9, s.y + 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#5c0c2e';
    ctx.beginPath();
    ctx.moveTo(x, s.y + 8);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(x + 8, s.y + 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#b31b52';
    ctx.fillRect(tipX - 1, tipY, 2, 4);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(tipX, tipY - 1, 1, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tipX, tipY - 1, 1, 1);
  }
}
