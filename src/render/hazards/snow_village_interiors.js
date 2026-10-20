// ============================================================================
// FONDOS ARQUITECTÓNICOS INTERIORES DEL PUEBLO NEVADO (MUNDO 4 • FASE 3)
// ============================================================================
// Salón rústico de la Taberna Alpina (X: 50000 -> 50300)

function drawSnowVillageInteriors(ctx, viewL, viewR, frame) {
  // 1. Interior de la Taberna Alpina "El Refugio Cálido" (X: 50000 -> 50300)
  const tStart = 50000, tEnd = 50300, tFloor = 196, tCeil = 60;
  if (viewR >= tStart && viewL <= tEnd) {
    const left = Math.max(tStart, viewL - 10);
    const right = Math.min(tEnd, viewR + 10);
    const width = right - left;

    // Fondo cálido de madera de cedro ahumado
    const wallGrad = ctx.createLinearGradient(0, tCeil, 0, tFloor);
    wallGrad.addColorStop(0, '#27160c');
    wallGrad.addColorStop(0.4, '#451a03');
    wallGrad.addColorStop(1, '#1c0f08');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, tCeil, width, tFloor - tCeil);

    // Listones de madera verticales
    for (let lx = Math.floor(left / 18) * 18; lx < right; lx += 18) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(lx, tCeil, 1, tFloor - tCeil);
      ctx.fillStyle = 'rgba(255, 209, 102, 0.05)';
      ctx.fillRect(lx + 1, tCeil, 2, tFloor - tCeil);
    }

    // Suelo de parquet rústico lustroso
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#78350f' : '#92400e';
      ctx.fillRect(bx, tFloor, 14, 28);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(bx, tFloor, 14, 1);
    }

    // Vigas maestras de madera en el techo
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, tCeil, width, 8);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(left, tCeil + 1, width, 6);

    // Lámpara de araña de hierro forjado con velas cálidas en el centro
    const chanX = 50150;
    if (chanX >= left - 30 && chanX <= right + 30) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(chanX - 1, tCeil + 8, 2, 22);
      ctx.fillRect(chanX - 16, tCeil + 30, 32, 3);
      // 3 velas
      [-12, 0, 12].forEach(vx => {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(chanX + vx - 1, tCeil + 24, 2, 6);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(chanX + vx - 1, tCeil + 22, 2, 2);
      });
      // Halo de luz dorada
      const halo = ctx.createRadialGradient(chanX, tCeil + 28, 6, chanX, tCeil + 28, 48);
      halo.addColorStop(0, 'rgba(255, 215, 0, 0.22)');
      halo.addColorStop(1, 'rgba(255, 180, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(chanX, tCeil + 28, 48, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50040)
    const doorX = 50040;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, tFloor - 32, 24, 32);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(doorX, tFloor - 30, 20, 30);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 14, tFloor - 16, 2, 4); // Picaporte
    }
  }

  // 2. Interior de la Tienda de Ropa y Gorros "El Gorro Nevado" (X: 50400 -> 50700)
  const sStart = 50400, sEnd = 50700, sFloor = 196, sCeil = 60;
  if (viewR >= sStart && viewL <= sEnd) {
    const left = Math.max(sStart, viewL - 10);
    const right = Math.min(sEnd, viewR + 10);
    const width = right - left;

    // Papel tapiz verde bosque alpino elegante
    const wallGrad = ctx.createLinearGradient(0, sCeil, 0, sFloor);
    wallGrad.addColorStop(0, '#042f2e');
    wallGrad.addColorStop(0.5, '#064e3b');
    wallGrad.addColorStop(1, '#022c22');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, sCeil, width, sFloor - sCeil);

    // Molduras decorativas verticales doradas tenues
    for (let mx = Math.floor(left / 22) * 22; mx < right; mx += 22) {
      ctx.fillStyle = 'rgba(253, 224, 71, 0.08)';
      ctx.fillRect(mx, sCeil, 1, sFloor - sCeil - 20);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(mx + 1, sCeil, 1, sFloor - sCeil - 20);
    }

    // Zócalo de madera noble en la parte inferior
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, sFloor - 20, width, 20);
    ctx.fillStyle = '#27160c';
    ctx.fillRect(left, sFloor - 19, width, 18);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(left, sFloor - 20, width, 2);

    // Suelo de tablas de madera pulida
    for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
      const isAlt = Math.floor(bx / 12) % 2 === 0;
      ctx.fillStyle = isAlt ? '#78350f' : '#854d0e';
      ctx.fillRect(bx, sFloor, 12, 28);
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(bx, sFloor, 12, 1);
    }

    // Alfombra roja señorial en el pasillo central (X: 50460 -> 50660)
    const carpetL = Math.max(left, 50460);
    const carpetR = Math.min(right, 50660);
    if (carpetR > carpetL) {
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(carpetL, sFloor - 2, carpetR - carpetL, 3);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(carpetL, sFloor - 2, carpetR - carpetL, 1);
      ctx.fillRect(carpetL, sFloor, carpetR - carpetL, 1);
    }

    // Estantería de fondo con rollos de tela de colores (X: 50480 -> 50530)
    const shelfX = 50480;
    if (shelfX >= left - 60 && shelfX <= right + 60) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(shelfX, 90, 50, 4);
      // Rollos de lana alpina
      const woolColors = ['#ef4444', '#0284c7', '#eab308', '#10b981', '#ec4899'];
      woolColors.forEach((wc, idx) => {
        ctx.fillStyle = wc;
        ctx.fillRect(shelfX + 4 + idx * 9, 82, 7, 8);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(shelfX + 4 + idx * 9, 82, 7, 2);
      });
    }

    // Vigas de madera en el techo
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, sCeil, width, 8);
    ctx.fillStyle = '#27160c';
    ctx.fillRect(left, sCeil + 1, width, 6);

    // Lámpara colgante de latón con luz cálida (X: 50560)
    const lampX = 50560;
    if (lampX >= left - 30 && lampX <= right + 30) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(lampX - 1, sCeil + 8, 2, 18);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(lampX - 8, sCeil + 26, 16, 4);
      // Foco brillante
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(lampX - 4, sCeil + 30, 8, 6);
      const lHalo = ctx.createRadialGradient(lampX, sCeil + 33, 4, lampX, sCeil + 33, 46);
      lHalo.addColorStop(0, 'rgba(255, 230, 120, 0.3)');
      lHalo.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = lHalo;
      ctx.beginPath();
      ctx.arc(lampX, sCeil + 33, 46, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50440)
    const doorX = 50440;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, sFloor - 34, 22, 34);
      ctx.fillStyle = '#0f766e';
      ctx.fillRect(doorX, sFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, sFloor - 16, 2, 4); // Picaporte
    }
  }

  // 3. Interior de la Cabaña de Gaston el Melancólico (X: 50800 -> 51100)
  const gStart = 50800, gEnd = 51100, gFloor = 196, gCeil = 60;
  if (viewR >= gStart && viewL <= gEnd) {
    const left = Math.max(gStart, viewL - 10);
    const right = Math.min(gEnd, viewR + 10);
    const width = right - left;

    // Paredes de madera grisácea y azulada melancólica
    const wallGrad = ctx.createLinearGradient(0, gCeil, 0, gFloor);
    wallGrad.addColorStop(0, '#0f172a');
    wallGrad.addColorStop(0.6, '#1e293b');
    wallGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, gCeil, width, gFloor - gCeil);

    // Listones de madera horizontales desgastados
    for (let ly = gCeil + 12; ly < gFloor; ly += 14) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(left, ly, width, 1);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.04)';
      ctx.fillRect(left, ly + 1, width, 1);
    }

    // Suelo de tablas desgastadas
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#1e293b' : '#334155';
      ctx.fillRect(bx, gFloor, 14, 28);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx, gFloor, 14, 1);
    }

    // Ventana melancólica con vista a la nieve exterior (X: 50920)
    const winX = 50920;
    if (winX >= left - 40 && winX <= right + 40) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(winX - 1, gCeil + 18, 30, 36);
      // Cristal oscuro con noche azul y copos cayendo
      ctx.fillStyle = '#0b1329';
      ctx.fillRect(winX, gCeil + 19, 28, 34);
      // Copos en la ventana
      for (let s = 0; s < 4; s++) {
        const sx = winX + 4 + ((s * 7 + frame * 0.2) % 20);
        const sy = gCeil + 22 + ((s * 9 + frame * 0.3) % 26);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
      // Marco de la ventana
      ctx.fillStyle = '#334155';
      ctx.fillRect(winX + 13, gCeil + 19, 2, 34);
      ctx.fillRect(winX, gCeil + 35, 28, 2);
    }

    // Vigas del techo deslucidas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(left, gCeil, width, 8);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(left, gCeil + 1, width, 6);

    // Farol solitario colgante con luz fría tenue (X: 51020)
    const lanX = 51020;
    if (lanX >= left - 30 && lanX <= right + 30) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(lanX - 1, gCeil + 8, 2, 16);
      ctx.fillStyle = '#334155';
      ctx.fillRect(lanX - 6, gCeil + 24, 12, 4);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(lanX - 2, gCeil + 28, 4, 4);
      // Halo azulado pálido
      const halo = ctx.createRadialGradient(lanX, gCeil + 30, 2, lanX, gCeil + 30, 38);
      halo.addColorStop(0, 'rgba(203, 213, 225, 0.18)');
      halo.addColorStop(1, 'rgba(148, 163, 184, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(lanX, gCeil + 30, 38, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50840)
    const doorX = 50840;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, gFloor - 34, 22, 34);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(doorX, gFloor - 32, 18, 32);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(doorX + 12, gFloor - 16, 2, 4); // Picaporte
    }
  }

  // Delegación a Parte 2 para Casas 4, 5, 6 y 7
  if (typeof drawSnowVillageInteriorsPt2 === 'function') {
    drawSnowVillageInteriorsPt2(ctx, viewL, viewR, frame);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawSnowVillageInteriors };
}
