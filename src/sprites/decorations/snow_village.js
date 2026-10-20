// ============================================================================
// SPRITES MUNDO 4: DECORACIONES DEL PUEBLO NEVADO Y TABERNA (PIXEL ART)
// ============================================================================
// Fachada de la taberna, gran chimenea de piedra, barra rústica y mesas alpinas.

function drawAlpineTavernFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 110;
  const h = 76;

  // 1. Chimenea de piedra en el tejado con humo continuo
  const chimX = px + w - 24;
  const chimY = py - h - 14;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX - 1, chimY, 14, 20);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX, chimY + 1, 12, 18);
  ctx.fillStyle = '#475569';
  ctx.fillRect(chimX + 2, chimY + 3, 8, 5);

  // Volutas de humo cálido flotando
  for (let s = 0; s < 4; s++) {
    const sOff = ((frame * 0.45 + s * 12) % 40);
    const sx = chimX + 5 + Math.sin(frame * 0.06 + s) * 6 + sOff * 0.35;
    const sy = chimY - sOff;
    const sRad = 2.5 + sOff * 0.12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de piedra sillar oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#334155';
  for (let sx = px + 6; sx < px + w - 6; sx += 18) {
    ctx.fillRect(sx, py - 11, 12, 7);
  }

  // 3. Muros de troncos de abeto oscuro
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  for (let ly = py - h + 20; ly < py - 14; ly += 7) {
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(px + 6, ly + 1, w - 12, 5);
  }

  // 4. Puerta de entrada arqueada con herrajes de bronce
  const doorX = px + Math.floor(w / 2) - 12;
  const doorY = py - 32;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(doorX - 2, doorY - 2, 24, 34);
  ctx.fillStyle = '#27160c';
  ctx.fillRect(doorX, doorY, 20, 32);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(doorX + 2, doorY + 2, 16, 28);
  // Picaporte dorado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 14, doorY + 14, 2, 4);

  // Farol sobre la puerta con resplandor cálido
  const lanX = doorX + 8;
  const lanY = doorY - 12;
  const glowGrad = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 16);
  glowGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  glowGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(lanX + 2, lanY + 3, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(lanX, lanY, 5, 7);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX + 1, lanY + 1, 3, 3);

  // 5. Ventanales con celosía y luz cálida
  const winY = py - 36;
  const winW = 18;
  const winH = 20;
  [px + 14, px + w - 32].forEach(wx => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(wx - 1, winY - 1, winW + 2, winH + 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(wx, winY, winW, winH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 2, winY + 2, 6, 6);
    // Travesaño de madera
    ctx.fillStyle = '#27160c';
    ctx.fillRect(wx + Math.floor(winW / 2) - 1, winY, 2, winH);
    ctx.fillRect(wx, winY + Math.floor(winH / 2) - 1, winW, 2);
  });

  // 6. Letrero colgante: "EL REFUGIO CÁLIDO"
  ctx.fillStyle = '#78350f';
  ctx.fillRect(doorX - 14, doorY - 18, 48, 8);
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('REFUGIO CÁLIDO', doorX + 10, doorY - 12);

  // 7. Tejado a dos aguas con gruesa nieve virgen
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 12);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.closePath();
  ctx.fill();

  // Nieve acumulada en el tejado
  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px - 14, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 14, py - h + 18);
  ctx.lineTo(px + w + 10, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px - 10, py - h + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 18);
  ctx.lineTo(px + w + 12, py - h + 16);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 13);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  // Carámbanos colgantes del alero
  for (let ix = px - 6; ix < px + w + 8; ix += 12) {
    const iLen = 4 + ((ix * 7) % 6);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py - h + 16, 2, iLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py - h + 16, 1, iLen - 1);
  }
}

function drawTavernFireplace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Hogar de piedra de río
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 18, py - 42, 36, 42);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 16, py - 40, 32, 40);

  // Hueco interior del fuego
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 10, py - 24, 20, 24);

  // Troncos ardiendo
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 8, py - 5, 16, 5);

  // Llamas animadas y brasas
  const fShift = (frame * 0.2) % 4;
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - 5);
  ctx.lineTo(px - 2 + fShift, py - 18 - (frame % 3));
  ctx.lineTo(px + 7, py - 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 5);
  ctx.lineTo(px + (fShift % 2), py - 15 - ((frame + 1) % 4));
  ctx.lineTo(px + 5, py - 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, py - 10, 4, 6);

  // Resplandor cálido envolvente
  const glow = ctx.createRadialGradient(px, py - 12, 4, px, py - 12, 32);
  glow.addColorStop(0, 'rgba(255, 140, 0, 0.4)');
  glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, py - 12, 32, 0, Math.PI * 2);
  ctx.fill();

  // Repisa de madera superior con jarra
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 20, py - 44, 40, 4);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 6, py - 52, 6, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 5, py - 50, 2, 2);
}

function drawTavernCounter(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46;
  const h = 26;

  // Barra de madera lustrosa
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);

  // Tablón superior pulido
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 2, py - h - 3, w + 4, 4);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - h - 3, w + 2, 1);

  // Tazas de cacao humeante en la barra
  [px + 8, px + 26].forEach((mx, i) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx, py - h - 10, 7, 7);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(mx + 1, py - h - 9, 5, 2);
    // Vapor flotante
    const vapOff = (frame * 0.3 + i * 8) % 12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - vapOff * 0.04) + ')';
    ctx.fillRect(mx + 2 + Math.sin(frame * 0.1 + i) * 2, py - h - 12 - vapOff, 2, 2);
  });
}

function drawTavernTable(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Mesa redonda de madera
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px - 3, py - 16, 6, 16);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 16, py - 19, 32, 4);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 15, py - 19, 30, 1);

  // Taburetes laterales
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 22, py - 10, 8, 10);
  ctx.fillRect(px + 14, py - 10, 8, 10);

  // Vela en botella en el centro
  ctx.fillStyle = '#10b981';
  ctx.fillRect(px - 2, py - 24, 4, 5);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 1, py - 27, 2, 3);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - 29, 2, 2);
}

function drawVillageStreetSign(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Poste de madera
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 32, 4, 32);

  // Flecha 1: "TABERNA"
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 18, py - 30, 24, 8);
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TABERNA', px - 7, py - 24);

  // Flecha 2: "TIENDAS ->"
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 4, py - 20, 26, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('TIENDA ->', px + 9, py - 14);

  // Nieve sobre las señales
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 19, py - 31, 26, 2);
  ctx.fillRect(px - 5, py - 21, 28, 2);
}

function drawHatShopFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Muro de piedra y tablas de madera verde bosque
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#064e3b'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#047857'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // 2. Vitrina iluminada con gorros de lana
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#fef08a'; ctx.fillRect(winX, winY, winW, winH);
  // Gorro rojo
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(winX + 10, winY + 16, 6, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.fillRect(winX + 4, winY + 16, 12, 3);
  ctx.beginPath(); ctx.arc(winX + 10, winY + 9, 2.5, 0, Math.PI * 2); ctx.fill();
  // Gorro azul con orejeras
  ctx.fillStyle = '#0284c7';
  ctx.beginPath(); ctx.arc(winX + 24, winY + 16, 6, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(winX + 18, winY + 16, 12, 3);
  ctx.fillRect(winX + 18, winY + 19, 3, 4); ctx.fillRect(winX + 27, winY + 19, 3, 4);
  ctx.strokeStyle = '#065f46'; ctx.lineWidth = 1.5; ctx.strokeRect(winX, winY, winW, winH);

  // 3. Puerta de entrada elegante
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#0f766e'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4);

  // Farol sobre la puerta
  const lanX = doorX + 7, lanY = doorY - 10;
  const glow = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 14);
  glow.addColorStop(0, 'rgba(255, 220, 100, 0.4)');
  glow.addColorStop(1, 'rgba(255, 220, 100, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(lanX + 2, lanY + 3, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(lanX, lanY, 4, 6);

  // 4. Cartel superior: "EL GORRO NEVADO"
  ctx.fillStyle = '#042f2e';
  ctx.fillRect(px + 14, py - h + 6, 72, 9);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EL GORRO NEVADO', px + 50, py - h + 13);

  // 5. Tejado a dos aguas con nieve
  ctx.fillStyle = '#134e4a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e0f2fe';
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

function drawShopDisplayRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Perchero de madera noble
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 1, py - 36, 3, 36);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 8, py - 3, 17, 3);
  // Ganchos superiores
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 12, py - 34, 25, 2);
  // Bufandas colgando
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 10, py - 32, 5, 20);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 10, py - 24, 5, 3);
  // Capa verde
  ctx.fillStyle = '#059669';
  ctx.fillRect(px + 4, py - 32, 8, 24);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(px + 6, py - 30, 4, 18);
}

function drawMannequinWithHat(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Base y poste
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 6, py - 2, 12, 2);
  ctx.fillRect(px - 1, py - 30, 2, 28);

  // Torso del maniquí con abrigo invernal de lana
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 6, py - 26, 12, 14);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 5, py - 25, 10, 12);
  // Botones dorados
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px, py - 23, 1, 2);
  ctx.fillRect(px, py - 19, 1, 2);
  ctx.fillRect(px, py - 15, 1, 2);

  // Cabeza con gorro chullo andino/nepalí
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(px, py - 31, 5, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(px - 5, py - 31, 10, 3);
  // Orejeras del chullo
  ctx.fillRect(px - 5, py - 28, 2, 5);
  ctx.fillRect(px + 3, py - 28, 2, 5);
  // Pompón
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px, py - 37, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAlpineTavernFacade = drawAlpineTavernFacade;
  SpriteManager.prototype.drawTavernFireplace = drawTavernFireplace;
  SpriteManager.prototype.drawTavernCounter = drawTavernCounter;
  SpriteManager.prototype.drawTavernTable = drawTavernTable;
  SpriteManager.prototype.drawVillageStreetSign = drawVillageStreetSign;
  SpriteManager.prototype.drawHatShopFacade = drawHatShopFacade;
  SpriteManager.prototype.drawShopDisplayRack = drawShopDisplayRack;
  SpriteManager.prototype.drawMannequinWithHat = drawMannequinWithHat;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAlpineTavernFacade,
    drawTavernFireplace,
    drawTavernCounter,
    drawTavernTable,
    drawVillageStreetSign,
    drawHatShopFacade,
    drawShopDisplayRack,
    drawMannequinWithHat
  };
}
