// ============================================================================
// SPRITES MUNDO 4: DECORACIONES ESPACIALES Y BASE DE DESPEGUE (PIXEL ART)
// ============================================================================
function drawSpaceRocket(ctx, x, y, stage = 'ready', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Torre de servicio
  ctx.fillStyle = '#120415';
  ctx.fillRect(px - 28, py - 40, 10, 68);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px - 27, py - 38, 8, 2); ctx.fillRect(px - 27, py - 20, 8, 2); ctx.fillRect(px - 27, py - 2, 8, 2);

  // Fuselaje del cohete (blanco puro y lineas rosa neon)
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 14, py - 60, 28, 88);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 12, py - 58, 24, 84);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 8, py - 70, 16, 12); ctx.fillRect(px - 4, py - 78, 8, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 2, py - 82, 4, 4);

  // Ventanillas circulares
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 4, py - 46, 8, 8);
  ctx.fillStyle = '#ffcad4'; ctx.fillRect(px - 3, py - 45, 6, 6);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 44, 2, 2);

  // Aletas laterales
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 20, py + 12, 8, 14); ctx.fillRect(px + 12, py + 12, 8, 14);

  // Toberas y llama de preignicion
  ctx.fillStyle = '#3b0820'; ctx.fillRect(px - 10, py + 26, 20, 4);
  const glow = (frame % 8 < 4);
  ctx.fillStyle = glow ? '#ffd166' : '#ff2a70';
  ctx.fillRect(px - 8, py + 30, 16, 3);
}

function drawSpaceRadarDish(ctx, x, y, scale = 1, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const dy = Math.round(Math.sin(frame * 0.08) * 1.5);

  // Soporte triangular del pedestal
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 8, py - 16, 16, 16);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 6, py - 14, 12, 14);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 1, py - 12, 2, 10);
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 4, py - 20, 8, 4);

  // Plato parabolico concavo con borde metalico
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 18, py - 38 + dy, 36, 18);
  ctx.fillStyle = '#3b0820'; ctx.fillRect(px - 16, py - 36 + dy, 32, 14);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 14, py - 34 + dy, 28, 10);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 12, py - 32 + dy, 24, 6);

  // Mastil focal y receptor con destello dorado
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 2, py - 42 + dy, 4, 10);
  ctx.fillStyle = (frame % 20 < 10) ? '#ffd166' : '#ffffff';
  ctx.fillRect(px - 3, py - 44 + dy, 6, 3);
}

function drawSpaceBeacon(ctx, x, y, color = '#ffd166', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 4, py - 18, 8, 18);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 3, py - 17, 6, 16);
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 2, py - 10, 4, 2);

  const blink = (frame % 24 < 12);
  ctx.fillStyle = blink ? color : '#3b0820';
  ctx.fillRect(px - 5, py - 23, 10, 6);
  if (blink) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 22, 4, 4);
    ctx.fillStyle = 'rgba(255, 209, 102, 0.18)'; ctx.fillRect(px - 1, py - 38, 2, 15);
  }
}

function drawSpaceTerminal(ctx, x, y, w = 32, h = 20, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#120415'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 4);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 4, py - h + 4, w - 8, 7);
  ctx.fillStyle = '#ffd166';
  const scan = Math.floor(frame * 0.2) % 3;
  ctx.fillRect(px + 6 + scan * 6, py - h + 6, 4, 3);
}

function drawSpaceDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);
  if (d.subType === 'space_rocket') drawSpaceRocket(ctx, px, py, d.stage, frame);
  else if (d.subType === 'space_radar_dish') drawSpaceRadarDish(ctx, px, py, d.scale || 1, frame);
  else if (d.subType === 'space_beacon') drawSpaceBeacon(ctx, px, py, d.color || '#ffd166', frame);
  else if (d.subType === 'space_terminal') drawSpaceTerminal(ctx, px, py, d.w || 32, d.h || 20, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSpaceDecoration = drawSpaceDecoration;
  SpriteManager.prototype.drawSpaceRocket = drawSpaceRocket;
  SpriteManager.prototype.drawSpaceRadarDish = drawSpaceRadarDish;
  SpriteManager.prototype.drawSpaceBeacon = drawSpaceBeacon;
  SpriteManager.prototype.drawSpaceTerminal = drawSpaceTerminal;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSpaceRocket, drawSpaceRadarDish, drawSpaceBeacon, drawSpaceTerminal, drawSpaceDecoration };
}
