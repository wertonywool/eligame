// ============================================================================
// SPRITES MUNDO 4: SALA ARCADE RETRO "ARCADE POLAR" (PIXEL ART)
// ============================================================================
// Fachada exterior con marquesina de neón, gabinetes arcade y rótulos fluorescentes.

function drawArcadeFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Base y muros de ladrillo retro violeta oscuro
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e0a38'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#2e1065'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#3b0764'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Ribetes de neón magenta y cian en las esquinas
  const neonCyan = (frame % 30 < 25) ? '#06b6d4' : '#0891b2';
  const neonPink = (frame % 40 < 32) ? '#ec4899' : '#be185d';
  ctx.fillStyle = neonCyan;
  ctx.fillRect(px + 4, py - h + 14, 2, h - 28);
  ctx.fillStyle = neonPink;
  ctx.fillRect(px + w - 6, py - h + 14, 2, h - 28);

  // 2. Vitrina retro con pósteres pixel art fluorescentes
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(winX, winY, winW, winH);

  // Mini marcianito pixel art de neón en la vitrina
  const invPulse = (frame * 0.1) % 2 < 1;
  ctx.fillStyle = '#22c55e';
  // Marciano 8-bit
  ctx.fillRect(winX + 12, winY + 6, 10, 2);
  ctx.fillRect(winX + 10, winY + 8, 14, 4);
  ctx.fillRect(winX + 8, winY + 12, 18, 4);
  ctx.fillStyle = '#0f051d';
  ctx.fillRect(winX + 12, winY + 10, 2, 2);
  ctx.fillRect(winX + 20, winY + 10, 2, 2);
  ctx.fillStyle = '#22c55e';
  if (invPulse) {
    ctx.fillRect(winX + 8, winY + 16, 4, 3);
    ctx.fillRect(winX + 22, winY + 16, 4, 3);
  } else {
    ctx.fillRect(winX + 10, winY + 16, 4, 3);
    ctx.fillRect(winX + 20, winY + 16, 4, 3);
  }
  ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 1.2; ctx.strokeRect(winX, winY, winW, winH);

  // 3. Puerta de entrada con halo de neón
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#4338ca'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  // Cristalera con luz interior magenta
  ctx.fillStyle = 'rgba(236, 72, 153, 0.35)'; ctx.fillRect(doorX + 4, doorY + 4, 10, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte

  // 4. Gran Marquesina Superior: "ARCADE POLAR" con bombillas parpadeantes
  const marqX = px + 8, marqY = py - h + 5;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(marqX - 1, marqY - 1, 84, 12);
  ctx.fillStyle = '#31104b'; ctx.fillRect(marqX, marqY, 82, 10);
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 5.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARCADE POLAR', px + 50, marqY + 7);

  // Bombillitas de la marquesina
  for (let bx = marqX + 2; bx < marqX + 80; bx += 8) {
    const isLit = (Math.floor(frame / 6) + Math.floor(bx / 8)) % 2 === 0;
    ctx.fillStyle = isLit ? '#facc15' : '#713f12';
    ctx.fillRect(bx, marqY, 2, 1);
    ctx.fillRect(bx, marqY + 9, 2, 1);
  }

  // 5. Tejado a dos aguas nevado con nieve que contrasta con el neón
  ctx.fillStyle = '#1e0a38';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e0e7ff';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 12, py - h + 18);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.lineTo(px + w + 6, py - h + 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 11);
  ctx.lineTo(px - 6, py - h + 12);
  ctx.closePath();
  ctx.fill();
}

function drawArcadeCabinet(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 26, h = 38;

  // 1. Chasis del mueble arcade
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - Math.floor(w / 2) - 1, py - h - 1, w + 2, h + 2);
  ctx.fillStyle = '#2e1065'; ctx.fillRect(px - Math.floor(w / 2), py - h, w, h);

  // Moldura lateral en T (T-molding) brillante
  const tColor = (frame % 20 < 10) ? '#06b6d4' : '#ec4899';
  ctx.fillStyle = tColor;
  ctx.fillRect(px - Math.floor(w / 2), py - h, 2, h);
  ctx.fillRect(px + Math.floor(w / 2) - 2, py - h, 2, h);

  // 2. Marquesina retro iluminada
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - h + 2, w - 4, 7);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 4.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('YETI-99', px, py - h + 7);

  // 3. Monitor CRT curvo inclinado
  const scW = 18, scH = 14;
  const scX = px - 9, scY = py - h + 11;
  ctx.fillStyle = '#09090b'; ctx.fillRect(scX, scY, scW, scH);
  ctx.fillStyle = '#022c22'; ctx.fillRect(scX + 1, scY + 1, scW - 2, scH - 2);

  // Animación del minijuego en la pantalla del gabinete
  const ballX = scX + 3 + ((frame * 0.4) % (scW - 6));
  const ballY = scY + 3 + Math.sin(frame * 0.2) * 3 + 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(ballX), Math.round(ballY), 2, 2);
  // Paletas verdes
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(scX + 2, scY + 3 + Math.sin(frame * 0.15) * 3, 1.5, 5);
  ctx.fillRect(scX + scW - 3.5, scY + 4 + Math.cos(frame * 0.15) * 3, 1.5, 5);

  // Resplandor del monitor
  const glow = ctx.createRadialGradient(px, scY + 7, 2, px, scY + 7, 18);
  glow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  glow.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, scY + 7, 18, 0, Math.PI * 2);
  ctx.fill();

  // 4. Panel de control (Joystick y botones)
  const cpy = py - 12;
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(px - Math.floor(w / 2) + 2, cpy, w - 4, 5);
  // Joystick rojo
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 5, cpy - 2, 2, 3);
  ctx.fillStyle = '#ef4444'; ctx.fillRect(px - 6, cpy - 4, 4, 3);
  // Botones amarillo y cian
  ctx.fillStyle = '#facc15'; ctx.fillRect(px + 2, cpy + 1, 2, 2);
  ctx.fillStyle = '#06b6d4'; ctx.fillRect(px + 6, cpy + 1, 2, 2);

  // 5. Ranura de monedas con luz roja
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - 4, py - 6, 8, 4);
  ctx.fillStyle = '#ef4444'; ctx.fillRect(px - 2, py - 5, 1, 2); ctx.fillRect(px + 1, py - 5, 1, 2);
}

function drawNeonSignCluster(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Letrero neón de pared: "INSERT COIN"
  const pulse = (frame % 30 < 20);
  ctx.fillStyle = pulse ? '#f43f5e' : 'rgba(244, 63, 94, 0.3)';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INSERT COIN', px, py - 14);

  // Flecha de neón cian apuntando al gabinete
  ctx.fillStyle = (frame % 20 < 14) ? '#06b6d4' : 'rgba(6, 182, 212, 0.3)';
  ctx.fillRect(px - 1, py - 8, 2, 6);
  ctx.fillRect(px - 3, py - 4, 6, 2);
  ctx.fillRect(px - 5, py - 2, 10, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawArcadeFacade = drawArcadeFacade;
  SpriteManager.prototype.drawArcadeCabinet = drawArcadeCabinet;
  SpriteManager.prototype.drawNeonSignCluster = drawNeonSignCluster;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawArcadeFacade,
    drawArcadeCabinet,
    drawNeonSignCluster
  };
}
