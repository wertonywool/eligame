// ============================================================================
// SPRITES MUNDO 3 - FASE 3: MOBILIARIO Y ELEMENTOS DE LA HELADERIA ARTESANAL
// ============================================================================

function drawIceCreamTable(ctx, px, py, frame) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; ctx.fillRect(px - 14, py - 2, 28, 2);
  // Sillas izq y der
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 13, py - 18, 2, 18); ctx.fillRect(px - 15, py - 16, 6, 2);
  ctx.fillRect(px + 11, py - 18, 2, 18); ctx.fillRect(px + 9, py - 16, 6, 2);
  ctx.fillStyle = '#00b4d8'; ctx.fillRect(px - 15, py - 9, 6, 3); ctx.fillRect(px + 9, py - 9, 6, 3);
  // Pedestal y tablero circular
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 1, py - 12, 2, 12); ctx.fillRect(px - 5, py - 2, 10, 2);
  ctx.fillRect(px - 9, py - 15, 18, 3);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 8, py - 14, 16, 2);
  ctx.fillStyle = '#caf0f8'; ctx.fillRect(px - 6, py - 14, 12, 1);
  // Copa Sundae con guinda
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 17, 4, 3);
  ctx.fillStyle = '#ff4d6d'; ctx.fillRect(px - 2, py - 20, 4, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 1, py - 22, 2, 2);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px, py - 23, 1, 1);
}

function drawIceCreamBooth(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 24, 36, 24);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 23, 34, 22);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 3, py - 21, 30, 8);
  ctx.fillStyle = '#00b4d8'; ctx.fillRect(px + 5, py - 19, 26, 4);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 1, py - 12, 34, 5);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 11, 32, 2);
  ctx.fillStyle = '#caf0f8'; ctx.fillRect(px + 28, py - 18, 3, 6);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 29, py - 21, 1, 4);
}

function drawIceCreamCounter(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 24, 56, 24);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 2, py - 12, 52, 11);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 4, py - 10, 48, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 12, 48, 1);
  ctx.fillStyle = 'rgba(202, 240, 248, 0.55)'; ctx.fillRect(px + 2, py - 22, 52, 10);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 3, py - 22, 50, 1);
  const flavors = ['#ff4d6d', '#ffbe0b', '#ffffff', '#52b788'];
  for (let i = 0; i < 4; i++) {
    const bx = px + 6 + i * 12;
    ctx.fillStyle = '#343a40'; ctx.fillRect(bx, py - 18, 9, 5);
    ctx.fillStyle = flavors[i]; ctx.fillRect(bx + 1, py - 17, 7, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(bx + 2, py - 17, 3, 1);
  }
  ctx.fillStyle = '#495057'; ctx.fillRect(px + 44, py - 29, 9, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 45, py - 28, 7, 4);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 47, py - 31, 3, 2);
}

function drawIceCreamMenuBoard(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 1, py - 26, 22, 26);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 24, 18, 18);
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 2, py - 23, 16, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 21, 12, 2);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 17, 10, 1);
  ctx.fillRect(px + 4, py - 14, 11, 1); ctx.fillRect(px + 4, py - 11, 8, 1);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 6, 2, 6); ctx.fillRect(px + 17, py - 6, 2, 6);
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawIceCreamTable,
    drawIceCreamBooth,
    drawIceCreamCounter,
    drawIceCreamMenuBoard
  };
}
