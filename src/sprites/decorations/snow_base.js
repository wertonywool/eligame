// ============================================================================
// SPRITES MUNDO 4: DECORACIONES ALPINAS BASE (PIXEL ART)
// ============================================================================
// Cabaña de guardabosques, pinos alpinos nevados, señales de sendero, leña y faroles.

function drawAlpineCabin(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 78;
  const h = 54;

  // 1. Chimenea de piedra y humo ascendente
  const chimX = px + w - 20;
  const chimY = py - h - 10;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX - 1, chimY, 12, 16);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX, chimY + 1, 10, 14);
  ctx.fillStyle = '#475569';
  ctx.fillRect(chimX + 2, chimY + 3, 6, 4);

  // Volutas de humo cálido flotando con el viento
  for (let s = 0; s < 3; s++) {
    const sOff = ((frame * 0.4 + s * 14) % 36);
    const sx = chimX + 4 + Math.sin(frame * 0.05 + s) * 5 + sOff * 0.4;
    const sy = chimY - sOff;
    const sRad = 2.5 + sOff * 0.12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.45 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Cimientos de piedra alpina
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 10, w + 4, 10);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 9, w, 9);
  ctx.fillStyle = '#334155';
  for (let sx = px + 4; sx < px + w - 4; sx += 14) {
    ctx.fillRect(sx, py - 7, 10, 5);
  }

  // 3. Muros de troncos de madera rústica
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 4, py - h + 12, w - 8, h - 22);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 5, py - h + 13, w - 10, h - 24);

  for (let ly = py - h + 17; ly < py - 10; ly += 6) {
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(px + 5, ly, w - 10, 1);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(px + 5, ly + 1, w - 10, 4);
  }

  // 4. Puerta de madera con herrajes
  const doorX = px + 12;
  const doorY = py - 28;
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(doorX - 1, doorY - 1, 16, 29);
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(doorX, doorY, 14, 28);
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(doorX + 2, doorY + 2, 10, 24);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 10, doorY + 13, 2, 3);

  // 5. Ventana iluminada con luz cálida ámbar
  const winX = px + 44;
  const winY = py - 32;
  const winGrad = ctx.createRadialGradient(winX + 9, winY + 9, 2, winX + 9, winY + 9, 22);
  winGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  winGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = winGrad;
  ctx.beginPath();
  ctx.arc(winX + 9, winY + 9, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(winX - 1, winY - 1, 20, 18);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(winX, winY, 18, 16);
  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(winX + 2, winY + 2, 6, 5);
  ctx.fillRect(winX + 10, winY + 2, 6, 5);
  ctx.fillRect(winX + 2, winY + 9, 6, 5);
  ctx.fillRect(winX + 10, winY + 9, 6, 5);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(winX + 8, winY, 2, 16);
  ctx.fillRect(winX, winY + 7, 18, 2);

  // Frontón triangular bajo el tejado
  ctx.fillStyle = '#27160c';
  ctx.beginPath();
  ctx.moveTo(px + 3, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w - 3, py - h + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.moveTo(px + 6, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px + w - 6, py - h + 14);
  ctx.closePath();
  ctx.fill();

  // 6. Tejado con manto de nieve
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 12);
  ctx.lineTo(px + w + 6, py - h + 14);
  ctx.lineTo(px + w + 2, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 2, py - h + 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 7, py - h + 13);
  ctx.lineTo(px + w + 5, py - h + 6);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 20);
  ctx.lineTo(px - 5, py - h + 6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - h + 10);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 17);
  ctx.lineTo(px + w + 5, py - h + 10);
  ctx.lineTo(px + w + 3, py - h + 6);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 20);
  ctx.lineTo(px - 3, py - h + 6);
  ctx.closePath();
  ctx.fill();

  // Carámbanos de hielo
  ctx.fillStyle = '#caf0f8';
  for (let ic = px; ic < px + w; ic += 9) {
    const icLen = 3 + ((ic * 5) % 6);
    ctx.fillRect(ic, py - h + 14, 2, icLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ic, py - h + 14, 1, icLen - 1);
    ctx.fillStyle = '#caf0f8';
  }
}

function drawAlpinePine(ctx, x, y, scale = 1, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const treeH = Math.round(70 * scale);
  const treeW = Math.round(44 * scale);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 4, py - 18, 8, 18);
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 3, py - 17, 6, 17);

  const tiers = [
    { yOff: 14, w: treeW, h: 22 },
    { yOff: 30, w: Math.round(treeW * 0.78), h: 20 },
    { yOff: 46, w: Math.round(treeW * 0.54), h: 18 }
  ];

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    const ty = py - t.yOff;
    const halfW = Math.floor(t.w / 2);

    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(px - halfW, ty);
    ctx.lineTo(px, ty - t.h);
    ctx.lineTo(px + halfW, ty);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.moveTo(px - Math.floor(halfW * 0.7), ty);
    ctx.lineTo(px, ty - t.h + 2);
    ctx.lineTo(px + Math.floor(halfW * 0.7), ty);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(px - halfW + 3, ty - 3, t.w - 6, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - halfW + 4, ty - 5, t.w - 8, 4);

    for (let bx = px - halfW + 4; bx < px + halfW - 4; bx += 6) {
      ctx.fillRect(bx, ty - 1, 4, 2);
    }
  }

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - treeH + 8);
  ctx.lineTo(px, py - treeH);
  ctx.lineTo(px + 4, py - treeH + 8);
  ctx.closePath();
  ctx.fill();
}

function drawAlpineSign(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 3, py - 30, 6, 30);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 2, py - 29, 4, 29);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 22, py - 30, 44, 11);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 21, py - 29, 42, 9);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 16, py - 26, 32, 3);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 14, py - 27, 4, 5);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 18, py - 18, 38, 10);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 17, py - 17, 36, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 15, 26, 3);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 22, py - 32, 44, 3);
  ctx.fillRect(px - 18, py - 20, 38, 2);
}

function drawFirewoodPile(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  const logs = [
    { x: px - 12, y: py - 7, r: 6 },
    { x: px, y: py - 7, r: 6 },
    { x: px + 12, y: py - 7, r: 6 },
    { x: px - 6, y: py - 15, r: 6 },
    { x: px + 6, y: py - 15, r: 6 },
    { x: px, y: py - 22, r: 6 }
  ];

  for (const log of logs) {
    ctx.fillStyle = '#1c0f08';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r - 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r - 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#451a03';
    ctx.fillRect(log.x - 1, log.y - 1, 2, 2);
  }

  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 14, py - 25, 28, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 27, 24, 4);
}

function drawSnowLantern(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 36, 4, 36);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 1, py - 35, 2, 35);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 36, 10, 3);
  ctx.fillRect(px + 8, py - 34, 3, 5);

  const lanX = px + 7;
  const lanY = py - 29;

  const flicker = Math.sin(frame * 0.2) * 2;
  const rad = 24 + flicker;
  const glowGrad = ctx.createRadialGradient(lanX + 3, lanY + 6, 1, lanX + 3, lanY + 6, rad);
  glowGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  glowGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(lanX + 3, lanY + 6, rad, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(lanX - 1, lanY - 1, 8, 14);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(lanX, lanY, 6, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX + 1, lanY + 2, 4, 4);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(lanX - 2, lanY - 3, 10, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX - 2, py - 32, 10, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAlpineCabin = drawAlpineCabin;
  SpriteManager.prototype.drawAlpinePine = drawAlpinePine;
  SpriteManager.prototype.drawAlpineSign = drawAlpineSign;
  SpriteManager.prototype.drawFirewoodPile = drawFirewoodPile;
  SpriteManager.prototype.drawSnowLantern = drawSnowLantern;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAlpineCabin,
    drawAlpinePine,
    drawAlpineSign,
    drawFirewoodPile,
    drawSnowLantern
  };
}
