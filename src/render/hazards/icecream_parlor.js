// ============================================================================
// FONDO ARQUITECTONICO DE LA HELADERIA ARTESANAL DE SAMI (MUNDO 3 • FASE 3)
// ============================================================================

function drawIceCreamParlorBackdrop(ctx, viewL, viewR, frame) {
  const pStart = 7300, pEnd = 7750, pFloor = 220, pCeil = 70;
  if (viewR < pStart || viewL > pEnd) return;

  const left = Math.max(pStart, viewL - 10);
  const right = Math.min(pEnd, viewR + 10);
  const width = right - left;

  // 1. Pared interior en degradado calido de salon costero vintage
  const wallGrad = ctx.createLinearGradient(0, pCeil, 0, pFloor);
  wallGrad.addColorStop(0, '#fefae0');
  wallGrad.addColorStop(0.5, '#faedcd');
  wallGrad.addColorStop(1, '#e9d8a6');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(left, pCeil, width, pFloor - pCeil);

  // 2. Ventanales arqueados con vista al cielo soleado y mar turquesa
  const windows = [7440, 7620];
  for (const wx of windows) {
    if (wx + 54 >= left && wx <= right) {
      ctx.fillStyle = '#495057'; ctx.fillRect(wx - 2, pCeil + 18, 56, 76);
      // Cielo azul y mar turquesa a traves del cristal
      const winGrad = ctx.createLinearGradient(0, pCeil + 20, 0, pCeil + 92);
      winGrad.addColorStop(0, '#48cae4');
      winGrad.addColorStop(0.6, '#90e0ef');
      winGrad.addColorStop(0.61, '#0096c7');
      winGrad.addColorStop(1, '#0077b6');
      ctx.fillStyle = winGrad; ctx.fillRect(wx, pCeil + 20, 52, 72);
      // Arco superior
      ctx.fillStyle = '#ffffff'; ctx.fillRect(wx, pCeil + 62, 52, 2); // Horizonte con espuma
      ctx.fillStyle = '#495057'; ctx.fillRect(wx + 25, pCeil + 20, 2, 72);
      ctx.fillRect(wx, pCeil + 54, 52, 2);
    }
  }

  // 3. Moldura de boiserie y zocalo de madera de teca
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(left, 172, width, 48);
  ctx.fillStyle = '#b57639'; ctx.fillRect(left, 170, width, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, 173, width, 1);

  // 4. Suelo de baldosas ajedrezadas vintage (turquesa y blanco marfil)
  for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
    const isAlt = Math.floor(bx / 12) % 2 === 0;
    ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
    ctx.fillRect(bx, 214, 12, 6);
  }

  // 5. Lamparas colgantes de laton con conos de luz calida
  const lamps = [7370, 7470, 7580, 7690];
  for (const lx of lamps) {
    if (lx + 24 >= left && lx - 24 <= right) {
      ctx.fillStyle = '#4a2810'; ctx.fillRect(lx, pCeil, 1, 26);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(lx - 4, pCeil + 26, 9, 4);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(lx - 2, pCeil + 30, 5, 2);
      ctx.fillStyle = 'rgba(255, 235, 120, 0.18)';
      ctx.beginPath();
      ctx.moveTo(lx, pCeil + 32);
      ctx.lineTo(lx - 22, pFloor);
      ctx.lineTo(lx + 22, pFloor);
      ctx.closePath();
      ctx.fill();
    }
  }

  // 6. Gran letrero luminoso en la marquesina de entrada
  const signX = 7320;
  if (signX + 70 >= left && signX <= right) {
    ctx.fillStyle = '#4a2810'; ctx.fillRect(signX - 2, pCeil - 4, 76, 18);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(signX, pCeil - 2, 72, 14);
    ctx.fillStyle = '#00b4d8'; ctx.fillRect(signX + 2, pCeil - 1, 68, 1);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(signX + 6, pCeil + 2, 60, 6);
    // Miniatura de cono de helado en el letrero
    ctx.fillStyle = '#ffffff'; ctx.fillRect(signX + 10, pCeil + 3, 4, 4);
    ctx.fillStyle = '#ffbe0b'; ctx.fillRect(signX + 15, pCeil + 3, 4, 4);
    ctx.fillStyle = '#e63946'; ctx.fillRect(signX + 20, pCeil + 3, 4, 4);
  }

  // 7. Pizarra mural de menu tras el mostrador
  const menuX = 7380;
  if (menuX + 44 >= left && menuX <= right) {
    ctx.fillStyle = '#4a2810'; ctx.fillRect(menuX, 106, 42, 28);
    ctx.fillStyle = '#212529'; ctx.fillRect(menuX + 2, 108, 38, 24);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(menuX + 5, 112, 32, 2);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(menuX + 5, 117, 26, 1);
    ctx.fillRect(menuX + 5, 122, 28, 1);
    ctx.fillStyle = '#90e0ef'; ctx.fillRect(menuX + 5, 126, 20, 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawIceCreamParlorBackdrop };
}
