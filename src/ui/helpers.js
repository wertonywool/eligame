// ============================================================================
// UTILIDADES VISUALES ESTILO STEVEN UNIVERSE (PANELES REDONDEADOS, ESTRELLAS Y WARP PAD)
// ============================================================================
function drawRoundedPanel(x, y, w, h, r, fill, stroke, lineW = 2) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineW;
    ctx.stroke();
  }
}

// Dibuja una cuña de queso 3D en pixel art (reemplazo sin emojis)
function drawPixelCheeseIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px, py + 1, 11, 9);
  ctx.fillStyle = '#ffe169';
  ctx.fillRect(px + 1, py + 2, 9, 3);
  ctx.fillStyle = '#fca311';
  ctx.fillRect(px + 1, py + 5, 9, 4);
  ctx.fillStyle = '#d48b00';
  ctx.fillRect(px + 2, py + 6, 2, 2);
  ctx.fillRect(px + 7, py + 7, 2, 1);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 2, py + 2, 2, 1);
}

// Dibuja un bolso de boutique de skins en pixel art (reemplazo de emoji de tienda)
function drawPixelShopIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py, 4, 1);
  ctx.fillRect(px + 2, py + 1, 1, 2);
  ctx.fillRect(px + 7, py + 1, 1, 2);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px, py + 3, 10, 8);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(px + 1, py + 4, 8, 6);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 2, py + 4, 6, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 6, 2, 2);
}

// Dibuja un lirio sagrado en pixel art (reemplazo de emoji de flor)
function drawPixelLilyIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px + 1, py, 8, 9);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 3, py + 1, 4, 3);
  ctx.fillRect(px + 2, py + 3, 6, 4);
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(px + 4, py + 2, 2, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 3, 2, 1);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(px + 3, py + 7, 4, 2);
}

// Dibuja un ratoncito en pixel art (reemplazo de emoji de ratón)
function drawPixelBabyMouseIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#ff8fab';
  ctx.fillRect(px + 1, py, 2, 2);
  ctx.fillRect(px + 7, py, 2, 2);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px + 2, py + 2, 6, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py + 3, 4, 4);
  ctx.fillStyle = '#ff0054';
  ctx.fillRect(px + 4, py + 5, 2, 1);
}

// Dibuja un candado dorado en pixel art (reemplazo de emoji de candado)
function drawPixelLockIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  // Arco del candado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, py - 4, 4, 1);
  ctx.fillRect(px - 3, py - 3, 2, 3);
  ctx.fillRect(px + 1, py - 3, 2, 3);
  // Cuerpo del candado
  ctx.fillStyle = '#100618';
  ctx.fillRect(px - 4, py - 1, 8, 7);
  ctx.fillStyle = '#ff9e00';
  ctx.fillRect(px - 3, py, 6, 5);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px - 1, py + 1, 2, 2);
}

function drawCrystalWarpPad(cx, cy, radiusX, radiusY, glowColor) {
  // Haz de luz ascendente del Warp Pad estilo Steven Universe (Rosado y Blanco)
  const grad = ctx.createLinearGradient(cx, cy - 55, cx, cy);
  grad.addColorStop(0, 'rgba(217, 37, 104, 0)');
  grad.addColorStop(1, glowColor || 'rgba(217, 37, 104, 0.28)');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - radiusX + 4, cy - 55, (radiusX - 4) * 2, 55);

  // Base octogonal/elíptica de obsidiana y cuarzo rosa oscuro
  ctx.fillStyle = '#0f0412';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 5, radiusX + 4, radiusY + 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6e1034';
  ctx.beginPath();
  ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#b31b52';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 1, radiusX * 0.72, radiusY * 0.68, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 1, radiusX * 0.72, radiusY * 0.68, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Estrella central tallada en el Warp Pad
  drawSparkleStar(cx, cy - 1, 5, '#ffffff');
}


function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

