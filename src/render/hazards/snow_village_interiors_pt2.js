// ============================================================================
// FONDOS ARQUITECTÓNICOS INTERIORES DEL PUEBLO NEVADO (PARTE 2: CASAS 4 A 7)
// ============================================================================
// Casa 4: Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)
// Casa 5: Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)
// Casa 6: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)

function drawSnowVillageInteriorsPt2(ctx, viewL, viewR, frame) {
  // 4. Interior de la Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)
  const aStart = 51200, aEnd = 51500, aFloor = 196, aCeil = 60;
  if (viewR >= aStart && viewL <= aEnd) {
    const left = Math.max(aStart, viewL - 10);
    const right = Math.min(aEnd, viewR + 10);
    const width = right - left;

    // Fondo synthwave violeta oscuro
    const wallGrad = ctx.createLinearGradient(0, aCeil, 0, aFloor);
    wallGrad.addColorStop(0, '#090514');
    wallGrad.addColorStop(0.5, '#1e0a38');
    wallGrad.addColorStop(1, '#0f051d');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, aCeil, width, aFloor - aCeil);

    // Rejilla de perspectiva neón retro en la pared
    for (let gy = aCeil + 16; gy < aFloor; gy += 14) {
      ctx.fillStyle = 'rgba(236, 72, 153, 0.08)';
      ctx.fillRect(left, gy, width, 1);
    }
    for (let gx = Math.floor(left / 24) * 24; gx < right; gx += 24) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.fillRect(gx, aCeil, 1, aFloor - aCeil);
    }

    // Suelo de baldosas a cuadros retro violeta y negro
    for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
      const isAlt = Math.floor(bx / 12) % 2 === 0;
      ctx.fillStyle = isAlt ? '#2e1065' : '#0f051d';
      ctx.fillRect(bx, aFloor, 12, 28);
      ctx.fillStyle = '#3b0764';
      ctx.fillRect(bx, aFloor, 12, 1);
    }

    // Tubos de neón suspendidos en el techo (magenta y cian)
    const neonPink = (frame % 36 < 28) ? '#ec4899' : '#9d174d';
    const neonCyan = (frame % 30 < 24) ? '#06b6d4' : '#0e7490';
    ctx.fillStyle = '#0f051d'; ctx.fillRect(left, aCeil, width, 6);
    ctx.fillStyle = neonPink; ctx.fillRect(left, aCeil + 6, width, 2);
    ctx.fillStyle = neonCyan; ctx.fillRect(left, aCeil + 9, width, 1);

    // Pantalla de Récords del Arcade en la pared (X: 51340)
    const boardX = 51340;
    if (boardX >= left - 40 && boardX <= right + 40) {
      ctx.fillStyle = '#09090b'; ctx.fillRect(boardX, aCeil + 16, 36, 24);
      ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 1; ctx.strokeRect(boardX, aCeil + 16, 36, 24);
      ctx.fillStyle = '#facc15'; ctx.font = 'bold 4px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('HI-SCORE', boardX + 18, aCeil + 22);
      ctx.fillStyle = '#22c55e'; ctx.fillText('1. PIXEL 99990', boardX + 18, aCeil + 28);
      ctx.fillStyle = '#38bdf8'; ctx.fillText('2. ELIZA 85400', boardX + 18, aCeil + 34);
    }

    // Marco de la puerta de salida al pueblo con moldura de neón cian (X: 51240)
    const doorX = 51240;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f051d';
      ctx.fillRect(doorX - 2, aFloor - 34, 22, 34);
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(doorX, aFloor - 32, 18, 32);
      ctx.fillStyle = '#06b6d4';
      ctx.strokeRect(doorX, aFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, aFloor - 16, 2, 4);
    }
  }

  // 5. Interior de la Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)
  const bStart = 51600, bEnd = 51900, bFloor = 196, bCeil = 60;
  if (viewR >= bStart && viewL <= bEnd) {
    const left = Math.max(bStart, viewL - 10);
    const right = Math.min(bEnd, viewR + 10);
    const width = right - left;

    // Paredes de arcilla cálida y madera color miel tostada
    const wallGrad = ctx.createLinearGradient(0, bCeil, 0, bFloor);
    wallGrad.addColorStop(0, '#451a03');
    wallGrad.addColorStop(0.5, '#78350f');
    wallGrad.addColorStop(1, '#27160c');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, bCeil, width, bFloor - bCeil);

    // Listones de madera horizontales cálidos
    for (let ly = bCeil + 12; ly < bFloor; ly += 14) {
      ctx.fillStyle = '#1c0f08'; ctx.fillRect(left, ly, width, 1);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.05)'; ctx.fillRect(left, ly + 1, width, 1);
    }

    // Suelo de parquet rústico en tonos ámbar
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#b45309' : '#d97706';
      ctx.fillRect(bx, bFloor, 14, 28);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(bx, bFloor, 14, 1);
    }

    // Estantería de fondo con sacos de harina y botes de té (X: 51680 -> 51740)
    const shelfX = 51680;
    if (shelfX >= left - 60 && shelfX <= right + 60) {
      ctx.fillStyle = '#451a03'; ctx.fillRect(shelfX, 90, 60, 4);
      // Sacos de harina
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(shelfX + 4, 80, 10, 10);
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(shelfX + 6, 80, 6, 2);
      // Botes de té verde y especias
      ctx.fillStyle = '#10b981'; ctx.fillRect(shelfX + 20, 82, 8, 8);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(shelfX + 32, 82, 8, 8);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(shelfX + 44, 82, 8, 8);
    }

    // Vigas de madera en el techo
    ctx.fillStyle = '#1c0f08'; ctx.fillRect(left, bCeil, width, 8);
    ctx.fillStyle = '#451a03'; ctx.fillRect(left, bCeil + 1, width, 6);

    // Lámpara de cobre colgante con luz dorada envolvente (X: 51780)
    const lampX = 51780;
    if (lampX >= left - 30 && lampX <= right + 30) {
      ctx.fillStyle = '#b45309'; ctx.fillRect(lampX - 1, bCeil + 8, 2, 18);
      ctx.fillStyle = '#d97706'; ctx.fillRect(lampX - 8, bCeil + 26, 16, 4);
      ctx.fillStyle = '#fef08a'; ctx.fillRect(lampX - 4, bCeil + 30, 8, 6);
      const lHalo = ctx.createRadialGradient(lampX, bCeil + 33, 4, lampX, bCeil + 33, 48);
      lHalo.addColorStop(0, 'rgba(251, 191, 36, 0.35)');
      lHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = lHalo; ctx.beginPath(); ctx.arc(lampX, bCeil + 33, 48, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 51640)
    const doorX = 51640;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(doorX - 2, bFloor - 34, 22, 34);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(doorX, bFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, bFloor - 16, 2, 4);
    }
  }

  // 6. Interior de la Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)
  const fStart = 52000, fEnd = 52300, fFloor = 196, fCeil = 60;
  if (viewR >= fStart && viewL <= fEnd) {
    const left = Math.max(fStart, viewL - 10);
    const right = Math.min(fEnd, viewR + 10);
    const width = right - left;

    // Paredes de piedra de basalto y carbón vegetal
    const wallGrad = ctx.createLinearGradient(0, fCeil, 0, fFloor);
    wallGrad.addColorStop(0, '#0f172a');
    wallGrad.addColorStop(0.5, '#1e293b');
    wallGrad.addColorStop(1, '#0b0f19');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, fCeil, width, fFloor - fCeil);

    // Sillares de piedra oscura y juntas de mortero
    for (let sy = fCeil + 14; sy < fFloor; sy += 16) {
      ctx.fillStyle = '#020617'; ctx.fillRect(left, sy, width, 1);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.04)'; ctx.fillRect(left, sy + 1, width, 1);
    }
    for (let sx = Math.floor(left / 32) * 32; sx < right; sx += 32) {
      ctx.fillStyle = '#020617'; ctx.fillRect(sx, fCeil, 1, fFloor - fCeil);
    }

    // Suelo de losas pesadas de basalto gris
    for (let bx = Math.floor(left / 16) * 16; bx < right; bx += 16) {
      const isAlt = Math.floor(bx / 16) % 2 === 0;
      ctx.fillStyle = isAlt ? '#1e293b' : '#334155';
      ctx.fillRect(bx, fFloor, 16, 28);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx, fFloor, 16, 1);
    }

    // Silueta de estantes con lingotes de hierro y picos en la pared (X: 52080 -> 52140)
    const rackX = 52080;
    if (rackX >= left - 60 && rackX <= right + 60) {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(rackX, 90, 60, 4);
      // Lingotes apilados
      ctx.fillStyle = '#64748b'; ctx.fillRect(rackX + 4, 82, 14, 8);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(rackX + 22, 82, 14, 8); // Lingotes de hielo
      ctx.fillStyle = '#475569'; ctx.fillRect(rackX + 40, 82, 14, 8);
    }

    // Vigas de acero negro y cadenas colgantes en el techo
    ctx.fillStyle = '#020617'; ctx.fillRect(left, fCeil, width, 8);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(left, fCeil + 1, width, 6);

    // Cadenas de hierro colgantes
    const chainX = 52170;
    if (chainX >= left - 20 && chainX <= right + 20) {
      ctx.fillStyle = '#475569';
      for (let cy = fCeil + 7; cy < fCeil + 32; cy += 4) {
        ctx.fillRect(chainX, cy, 2, 3);
      }
      // Gancho de forja al final
      ctx.fillRect(chainX - 2, fCeil + 32, 6, 4);
    }

    // Farol de forja criogénica con resplandor azul celeste (X: 52210)
    const lanX = 52210;
    if (lanX >= left - 30 && lanX <= right + 30) {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(lanX - 1, fCeil + 8, 2, 16);
      ctx.fillStyle = '#1e293b'; ctx.fillRect(lanX - 6, fCeil + 24, 12, 12);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(lanX - 4, fCeil + 26, 8, 8);
      const fHalo = ctx.createRadialGradient(lanX, fCeil + 30, 4, lanX, fCeil + 30, 44);
      fHalo.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      fHalo.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = fHalo; ctx.beginPath(); ctx.arc(lanX, fCeil + 30, 44, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 52040)
    const doorX = 52040;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(doorX - 2, fFloor - 34, 22, 34);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX, fFloor - 32, 18, 32);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(doorX + 2, fFloor - 28, 4, 2); // Remache
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, fFloor - 16, 2, 4); // Picaporte
    }
  }

  // 7. Interior de la Gran Alcaldía del Pueblo Nevado (X: 52400 -> 52700)
  const hStart = 52400, hEnd = 52700, hFloor = 196, hCeil = 60;
  if (viewR >= hStart && viewL <= hEnd) {
    const left = Math.max(hStart, viewL - 10);
    const right = Math.min(hEnd, viewR + 10);
    const width = right - left;

    // Paredes de caoba señorial y cortinajes carmesí
    const wallGrad = ctx.createLinearGradient(0, hCeil, 0, hFloor);
    wallGrad.addColorStop(0, '#1c0710');
    wallGrad.addColorStop(0.5, '#3c0a1a');
    wallGrad.addColorStop(1, '#17030a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, hCeil, width, hFloor - hCeil);

    // Listones de madera tallada verticales con molduras doradas
    for (let lx = Math.floor(left / 22) * 22; lx < right; lx += 22) {
      ctx.fillStyle = '#17030a'; ctx.fillRect(lx, hCeil, 1, hFloor - hCeil);
      ctx.fillStyle = 'rgba(255, 209, 102, 0.08)'; ctx.fillRect(lx + 1, hCeil, 2, hFloor - hCeil);
    }

    // Suelo de parquet noble con gran alfombra ceremonial roja en el centro
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      ctx.fillStyle = '#451a03';
      ctx.fillRect(bx, hFloor, 14, 28);
      ctx.fillStyle = '#27160c';
      ctx.fillRect(bx, hFloor, 14, 1);
    }
    // Alfombra roja señorial
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(left, hFloor, width, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(left, hFloor, width, 1); // Cenefa dorada

    // Gran Tapiz Mural de la Cumbre del Everest en la pared (X: 52540 -> 52620)
    const tapX = 52540;
    if (tapX >= left - 80 && tapX <= right + 80) {
      ctx.fillStyle = '#1e1b4b'; ctx.fillRect(tapX, 78, 64, 42);
      ctx.fillStyle = '#ffd166'; ctx.strokeRect(tapX, 78, 64, 42);
      // Montaña nevada bordada en el tapiz
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(tapX + 10, 118);
      ctx.lineTo(tapX + 32, 88);
      ctx.lineTo(tapX + 54, 118);
      ctx.closePath();
      ctx.fill();
      // Sol naciente alpino
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(tapX + 46, 92, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vigas de caoba en el techo
    ctx.fillStyle = '#17030a'; ctx.fillRect(left, hCeil, width, 8);
    ctx.fillStyle = '#451a03'; ctx.fillRect(left, hCeil + 1, width, 6);

    // Lámpara de araña de bronce y cristal en el centro (X: 52570)
    const chanX = 52570;
    if (chanX >= left - 40 && chanX <= right + 40) {
      ctx.fillStyle = '#ffd166'; ctx.fillRect(chanX - 1, hCeil + 8, 2, 18);
      ctx.fillRect(chanX - 14, hCeil + 26, 28, 3);
      // Luces de velas cálidas
      for (let c = -12; c <= 12; c += 8) {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(chanX + c - 1, hCeil + 22, 2, 4);
      }
      const cHalo = ctx.createRadialGradient(chanX, hCeil + 26, 6, chanX, hCeil + 26, 52);
      cHalo.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      cHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = cHalo; ctx.beginPath(); ctx.arc(chanX, hCeil + 26, 52, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la gran puerta doble de salida a la plaza (X: 52440)
    const doorX = 52440;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, hFloor - 36, 26, 36);
      ctx.fillStyle = '#3f2213';
      ctx.fillRect(doorX, hFloor - 34, 22, 34);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 8, hFloor - 30, 6, 8); // Escudo
      ctx.fillRect(doorX + 8, hFloor - 18, 2, 4); // Picaporte
      ctx.fillRect(doorX + 12, hFloor - 18, 2, 4);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawSnowVillageInteriorsPt2 };
}
