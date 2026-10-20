// ============================================================================
// SPRITES MUNDO 4: PANADERÍA Y CASA DE TÉ "EL HORNO DEL YETI" (PIXEL ART)
// ============================================================================
// Fachada exterior cálida, gran horno de leña abovedado y mostrador de repostería.

function drawBakeryFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Chimenea de arcilla con humo aromático dulce
  const chimX = px + w - 24;
  const chimY = py - h - 14;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(chimX - 1, chimY, 14, 20);
  ctx.fillStyle = '#78350f'; ctx.fillRect(chimX, chimY + 1, 12, 18);
  ctx.fillStyle = '#b45309'; ctx.fillRect(chimX + 2, chimY + 3, 8, 6);

  // Espirales de humo suave
  for (let s = 0; s < 4; s++) {
    const sOff = ((frame * 0.4 + s * 10) % 36);
    const sx = chimX + 5 + Math.sin(frame * 0.05 + s) * 5 + sOff * 0.2;
    const sy = chimY - sOff;
    ctx.fillStyle = 'rgba(254, 243, 199, ' + Math.max(0, 0.45 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + sOff * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de piedra y muros de madera color miel tostada
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#451a03'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#92400e'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Tablones horizontales cálidos
  for (let ly = py - h + 20; ly < py - 14; ly += 7) {
    ctx.fillStyle = '#451a03'; ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#b45309'; ctx.fillRect(px + 6, ly + 1, w - 12, 5);
  }

  // 3. Gran vitrina arqueada con panes dorados y bollos
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#fef3c7'; ctx.fillRect(winX, winY, winW, winH);

  // Estante interior de la vitrina con panes y cruasanes
  ctx.fillStyle = '#b45309'; ctx.fillRect(winX + 2, winY + 14, winW - 4, 2);
  // Panes dorados
  ctx.fillStyle = '#d97706';
  ctx.fillRect(winX + 4, winY + 8, 7, 5);
  ctx.fillRect(winX + 13, winY + 7, 8, 6);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(winX + 5, winY + 9, 5, 2);
  // Tetera de cobre en el estante inferior
  ctx.fillStyle = '#ea580c'; ctx.fillRect(winX + 6, winY + 18, 6, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(winX + 10, winY + 17, 4, 2);
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.strokeRect(winX, winY, winW, winH);

  // 4. Puerta de entrada con marco de roble
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#451a03'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#b45309'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte

  // Farol sobre la puerta con halo dorado
  const lanX = doorX + 7, lanY = doorY - 10;
  const glow = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 14);
  glow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
  glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(lanX + 2, lanY + 3, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(lanX, lanY, 4, 6);

  // 5. Letrero superior: "EL HORNO DEL YETI"
  ctx.fillStyle = '#451a03'; ctx.fillRect(px + 14, py - h + 6, 72, 9);
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EL HORNO DEL YETI', px + 50, py - h + 13);

  // 6. Tejado a dos aguas nevado
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fef3c7';
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

function drawBakeryOven(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Gran horno de piedra refractaria
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 20, py - 42, 40, 42);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px - 18, py - 40, 36, 40);

  // Bóveda del horno
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.arc(px, py - 24, 14, Math.PI, 0);
  ctx.fill();

  // Fuego y brasas ardiendo en el interior
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 12, py - 24, 24, 24);
  ctx.fillStyle = '#ea580c';
  const fShift = (frame * 0.25) % 4;
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 4);
  ctx.lineTo(px - 2 + fShift, py - 18 - (frame % 3));
  ctx.lineTo(px + 10, py - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 4);
  ctx.lineTo(px + (fShift % 2), py - 14 - ((frame + 1) % 3));
  ctx.lineTo(px + 6, py - 4);
  ctx.closePath();
  ctx.fill();

  // Resplandor cálido envolvente del horno
  const glow = ctx.createRadialGradient(px, py - 16, 4, px, py - 16, 36);
  glow.addColorStop(0, 'rgba(245, 158, 11, 0.42)');
  glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(px, py - 16, 36, 0, Math.PI * 2); ctx.fill();

  // Repisa superior con botes de especias
  ctx.fillStyle = '#451a03'; ctx.fillRect(px - 22, py - 44, 44, 4);
  ctx.fillStyle = '#10b981'; ctx.fillRect(px - 12, py - 52, 6, 8); // tarro verde
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(px + 4, py - 50, 7, 6); // tarro miel
}

function drawBakeryDisplayCounter(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46, h = 26;

  // Mostrador de madera pulida
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);

  // Cubierta de mármol blanco
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(px - 2, py - h - 3, w + 4, 4);
  ctx.fillStyle = '#cbd5e1'; ctx.fillRect(px - 1, py - h - 3, w + 2, 1);

  // Bandeja con bollos de canela y tetera humeante
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 6, py - h - 8, 12, 5); // bollos
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - h - 8, 8, 1); // glaseado

  // Tetera de té de mantequilla de yak
  ctx.fillStyle = '#b45309'; ctx.fillRect(px + 26, py - h - 10, 8, 7);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 28, py - h - 12, 4, 2);

  // Vapor flotante aromático
  const vOff = (frame * 0.3) % 14;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - vOff * 0.035) + ')';
  ctx.fillRect(px + 29 + Math.sin(frame * 0.1) * 2, py - h - 14 - vOff, 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBakeryFacade = drawBakeryFacade;
  SpriteManager.prototype.drawBakeryOven = drawBakeryOven;
  SpriteManager.prototype.drawBakeryDisplayCounter = drawBakeryDisplayCounter;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawBakeryFacade,
    drawBakeryOven,
    drawBakeryDisplayCounter
  };
}
