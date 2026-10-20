// ============================================================================
// FONDO PARALLAX DEL MEGATSUNAMI Y VÓRTICE SÍSMICO (MUNDO 3 - FASE 5)
// ============================================================================
// Atmósfera de catástrofe oceánica:
// 1. Cielo de tempestad abisal con gradientes de tormenta y viento huracanado
// 2. Destellos estroboscópicos de relámpagos con rayos bifurcados
// 3. Nubes oscuras de tormenta rodando velozmente
// 4. Siluetas colosales de megatsunamis en el horizonte
// 5. Rascacielos costeros inundados y balizas rojas de auxilio
// 6. Ráfagas de lluvia y bruma marina en suspensión

function drawMegatsunamiParallax(ctx, camX, frame) {
  // 1. Cielo de tempestad marina
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#03071e');      // Negro tormentoso abisal
  grad.addColorStop(0.35, '#0a1128');   // Azul medianoche tempestuoso
  grad.addColorStop(0.70, '#1c2541');   // Gris azulado de vórtice
  grad.addColorStop(1, '#3a506b');      // Horizonte brumoso del oleaje
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Relámpagos estroboscópicos atmosféricos
  const lightningCycle = frame % 150;
  const isLightning = (lightningCycle === 0 || lightningCycle === 2 || lightningCycle === 5 || (frame % 280 === 10));
  if (isLightning) {
    // Resplandor de cielo iluminado por el rayo
    ctx.fillStyle = 'rgba(202, 240, 248, 0.42)';
    ctx.fillRect(0, 0, W, H);

    // Bifurcación del relámpago pixel art en el horizonte
    const lX = Math.round(((camX * 0.15 + 180) % (W - 80)) + 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lX, 0, 3, 22);
    ctx.fillRect(lX - 4, 20, 6, 18);
    ctx.fillRect(lX + 1, 36, 4, 20);
    ctx.fillRect(lX - 6, 54, 8, 22);
    ctx.fillRect(lX - 2, 74, 5, 24);
    // Ramal secundario
    ctx.fillRect(lX + 3, 42, 10, 3);
    ctx.fillRect(lX + 12, 44, 4, 16);
  }

  // 3. Nubes de tormenta bajas rodando a gran velocidad por el vendaval
  const stormCloudSpeed = frame * 0.48;
  for (let ci = 0; ci < 8; ci++) {
    const cx = ((ci * 95 + 20 - stormCloudSpeed) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const cy = 12 + (ci % 3) * 16;
    const cw = 54 + (ci % 2) * 22;

    // Sombra oscura inferior de la nube
    ctx.fillStyle = isLightning ? 'rgba(40, 60, 90, 0.85)' : 'rgba(10, 15, 25, 0.88)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, Math.floor(cw / 2), 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Núcleo de tormenta azul petróleo
    ctx.fillStyle = isLightning ? '#caf0f8' : '#1c2541';
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.floor(cw / 2), 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 9, cy - 2, Math.floor(cw / 3), 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 1, Math.floor(cw / 3.5), 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Siluetas colosales de olas lejanas del Megatsunami en el horizonte
  const waveOff = ((Math.round(camX * 0.05) % 400) + 400) % 400;
  for (let wi = -1; wi < 5; wi++) {
    const wx = wi * 120 - waveOff;
    const surgeH = 46 + Math.sin(frame * 0.06 + wi * 1.5) * 6;
    const wy = H - 68 - surgeH;

    // Gran lomo de la ola lejana
    ctx.fillStyle = '#0a1128';
    ctx.beginPath();
    ctx.moveTo(wx, H - 68);
    ctx.quadraticCurveTo(wx + 60, wy, wx + 130, H - 68);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#03045e';
    ctx.beginPath();
    ctx.moveTo(wx + 10, H - 68);
    ctx.quadraticCurveTo(wx + 65, wy + 5, wx + 120, H - 68);
    ctx.closePath();
    ctx.fill();

    // Cresta espumosa de la ola colosal
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 45, wy, 35, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 52, wy - 2, 22, 2);
  }

  // 5. Rascacielos costeros semisumergidos e inclinados en la lejanía
  const skyOff = ((Math.round(camX * 0.08) % 360) + 360) % 360;
  for (let i = -1; i < 7; i++) {
    const bx = i * 65 - skyOff;
    const bh = 55 + ((i * 37) % 38);
    const tilt = (i % 2 === 0) ? -2 : 3;

    // Silueta de torre inundada en penumbra
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(bx + tilt, H - 68 - bh, 46, bh + 68);
    ctx.fillStyle = '#1b263b';
    ctx.fillRect(bx + tilt + 2, H - 68 - bh + 2, 42, bh + 66);

    // Ventanas a oscuras y pocas con luces de emergencia rojas
    for (let wy = H - 64 - bh + 6; wy < H - 76; wy += 12) {
      for (let wx = bx + tilt + 6; wx < bx + tilt + 40; wx += 10) {
        if (((wx * 7 + wy * 13) % 7) === 0) {
          ctx.fillStyle = '#e63946'; // Luz de emergencia
          ctx.fillRect(wx, wy, 3, 3);
        } else {
          ctx.fillStyle = '#0a1128'; // Cristal apagado
          ctx.fillRect(wx, wy, 4, 4);
        }
      }
    }

    // Baliza de aviación en la cúspide con destello rojo intermitente
    const beaconFlash = (Math.floor(frame * 0.14 + i) % 2 === 0);
    ctx.fillStyle = '#495057';
    ctx.fillRect(bx + tilt + 22, H - 68 - bh - 10, 2, 10);
    ctx.fillStyle = beaconFlash ? '#ff0054' : '#590d22';
    ctx.fillRect(bx + tilt + 21, H - 68 - bh - 12, 4, 3);
  }

  // 6. Horizonte marino agitado con oleaje oscuro y espuma
  const oceanGrad = ctx.createLinearGradient(0, H - 68, 0, H);
  oceanGrad.addColorStop(0, '#001233');
  oceanGrad.addColorStop(0.35, '#001845');
  oceanGrad.addColorStop(0.70, '#023e8a');
  oceanGrad.addColorStop(1, '#03045e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, H - 68, W, 68);

  // Espuma rompiente en el horizonte distante
  for (let ox = 0; ox < W; ox += 14) {
    const foamY = H - 68 + Math.round(Math.sin(frame * 0.1 + ox * 0.08) * 3);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(ox, foamY, 14, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ox + 2, foamY - 1, 9, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ox + 4, foamY - 2, 5, 1);
  }

  // 7. Ráfagas de viento y bruma marina horizontal en suspensión (Squalls)
  const squallSpeed = frame * 4.5;
  for (let si = 0; si < 9; si++) {
    const sx = ((si * 85 - squallSpeed) % (W + 120) + (W + 120)) % (W + 120) - 60;
    const sy = 35 + (si * 21) % (H - 80);
    ctx.fillStyle = 'rgba(202, 240, 248, 0.28)';
    ctx.fillRect(sx, sy, 36 + (si % 3) * 14, 1);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.fillRect(sx + 10, sy, 18, 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawMegatsunamiParallax };
}
