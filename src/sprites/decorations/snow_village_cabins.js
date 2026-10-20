// ============================================================================
// SPRITES MUNDO 4: CABAÑA DE GASTON EL MELANCÓLICO (PIXEL ART)
// ============================================================================
// Fachada exterior desvencijada, mobiliario melancólico y pedestal del Pico de Hielo.

function drawDepressedCabinFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Chimenea desvencijada con humo pálido y lánguido
  const chimX = px + w - 24;
  const chimY = py - h - 12;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(chimX - 1, chimY, 14, 18);
  ctx.fillStyle = '#334155'; ctx.fillRect(chimX, chimY + 1, 12, 16);
  // Humo grisáceo lento
  for (let s = 0; s < 3; s++) {
    const sOff = ((frame * 0.25 + s * 16) % 36);
    const sx = chimX + 5 + Math.sin(frame * 0.04 + s) * 4;
    const sy = chimY - sOff;
    ctx.fillStyle = 'rgba(148, 163, 184, ' + Math.max(0, 0.4 - sOff * 0.01) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + sOff * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de roca oscura y muros de tablas desgastadas
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#334155'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Listones de madera horizontales descoloridos
  for (let ly = py - h + 20; ly < py - 14; ly += 8) {
    ctx.fillStyle = '#0f172a'; ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#475569'; ctx.fillRect(px + 6, ly + 1, w - 12, 6);
  }

  // 3. Ventana empañada y solitaria
  const winX = px + 14, winY = py - 38, winW = 24, winH = 22;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#475569'; ctx.fillRect(winX, winY, winW, winH);
  ctx.fillStyle = '#64748b'; ctx.fillRect(winX + 2, winY + 2, winW - 4, winH - 4);
  // Reflejo empañado
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(winX + 4, winY + 4);
  ctx.lineTo(winX + 16, winY + 4);
  ctx.lineTo(winX + 4, winY + 16);
  ctx.closePath();
  ctx.fill();

  // 4. Puerta desvencijada con letrero ligeramente torcido
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#334155'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#64748b'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte oxidado

  // Letrero ligeramente torcido: "CABAÑA DE GASTON"
  ctx.save();
  ctx.translate(doorX + 9, doorY - 12);
  ctx.rotate(-0.06); // Torcido por la melancolía
  ctx.fillStyle = '#1e293b'; ctx.fillRect(-32, -5, 64, 10);
  ctx.fillStyle = '#334155'; ctx.fillRect(-31, -4, 62, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 4.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CABAÑA DE GASTON', 0, 2);
  ctx.restore();

  // Farol tenue
  const lanX = doorX + 7, lanY = doorY - 10;
  ctx.fillStyle = '#1e293b'; ctx.fillRect(lanX, lanY, 4, 6);
  ctx.fillStyle = '#fbbf24'; ctx.fillRect(lanX + 1, lanY + 2, 2, 2);

  // 5. Tejado nevado con nieve acumulada
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
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

function drawDepressedRoomFurniture(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Sillón descolorido con parche
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 14, py - 20, 28, 20);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px - 12, py - 18, 24, 18);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 10, py - 14, 20, 14);
  // Parche marrón en el respaldo
  ctx.fillStyle = '#78350f'; ctx.fillRect(px - 6, py - 18, 6, 5);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 5, py - 17, 4, 1);

  // Mesa pequeña al lado con taza solitaria
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px + 18, py - 14, 14, 14);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 16, py - 16, 18, 3);
  // Taza vacía y cuchara
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(px + 20, py - 21, 5, 5);
  ctx.fillStyle = '#94a3b8'; ctx.fillRect(px + 26, py - 18, 4, 1);
}

function drawIcePickStand(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Pedestal de madera noble oscura
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 12, py - 22, 24, 22);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px - 10, py - 20, 20, 20);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 8, py - 18, 16, 18);

  // Placa dorada en el pedestal
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 6, py - 8, 12, 4);
  ctx.fillStyle = '#b45309'; ctx.fillRect(px - 5, py - 7, 10, 2);

  // El Gran Pico de Hielo Profesional (Ice Pick)
  const bob = Math.sin(frame * 0.12) * 2;
  const pickY = py - 32 + bob;

  // Destellos mágicos de hielo glacial
  const glow = ctx.createRadialGradient(px, pickY, 2, px, pickY, 24);
  glow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, pickY, 24, 0, Math.PI * 2);
  ctx.fill();

  // Mango ergonómico del pico
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, pickY - 4, 4, 20);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 1, pickY - 2, 2, 16);
  // Grip de goma azul
  ctx.fillStyle = '#0284c7'; ctx.fillRect(px - 2, pickY + 6, 4, 6);

  // Cabeza afilada de doble piolet en titanio glacial
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 12, pickY - 6);
  ctx.lineTo(px, pickY - 9);
  ctx.lineTo(px + 12, pickY - 5);
  ctx.lineTo(px + 10, pickY - 2);
  ctx.lineTo(px, pickY - 4);
  ctx.lineTo(px - 10, pickY - 3);
  ctx.closePath();
  ctx.fill();

  // Filo cortante ultra brillante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, pickY - 6, 4, 2);
  ctx.fillRect(px + 8, pickY - 5, 4, 2);

  // Destello estelar brillante intermitente
  if ((frame % 20) < 10) {
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(px - 1, pickY - 11, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawDepressedCabinFacade = drawDepressedCabinFacade;
  SpriteManager.prototype.drawDepressedRoomFurniture = drawDepressedRoomFurniture;
  SpriteManager.prototype.drawIcePickStand = drawIcePickStand;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawDepressedCabinFacade,
    drawDepressedRoomFurniture,
    drawIcePickStand
  };
}
