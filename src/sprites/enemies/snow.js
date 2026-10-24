// ============================================================================
// SPRITES MUNDO 4: ENEMIGOS ÁRTICOS Y DE ALTA MONTAÑA (PIXEL ART)
// ============================================================================
// 1. Frost Crawler: Oruga acorazada de hielo glacial con espinas de escarcha.
// 2. Frost Flier: Criatura alada de cristal de hielo que acecha en las alturas.

function drawFrostCrawler(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.25) % 2;

  // 1. Sombra bajo la oruga helada
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Patitas articuladas de hielo
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 7 - step, py + 12, 3, 3);
  ctx.fillRect(px + 12 + step, py + 12, 3, 3);
  ctx.fillRect(px + 16 - step, py + 12, 3, 3);

  // 3. Segmentos del caparazón blindado de hielo ártico
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 2, 20, 11);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 1, py + 3, 18, 9);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 2, py + 4, 16, 7);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 3, py + 5, 14, 5);

  // 4. Espinas afiladas de cristal de hielo en el lomo
  const spikes = [
    { x: px + 3, h: 5 },
    { x: px + 7, h: 7 },
    { x: px + 11, h: 8 },
    { x: px + 15, h: 6 }
  ];

  for (const sp of spikes) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(sp.x - 2, py + 3);
    ctx.lineTo(sp.x, py + 3 - sp.h);
    ctx.lineTo(sp.x + 2, py + 3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(sp.x - 1, py + 3 - sp.h + 2, 1, sp.h - 2);
  }

  // 5. Ojos helados brillantes
  const eyeX = facingRight ? px + 14 : px + 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX, py + 6, 3, 3);
  ctx.fillStyle = '#00f5d4';
  ctx.fillRect(facingRight ? eyeX + 1 : eyeX, py + 7, 2, 2);

  // Mandíbulas gélidas
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(facingRight ? px + 18 : px - 1, py + 9, 3, 2);
}

function drawFrostFlier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const bob = Math.round(Math.sin(frame * 0.16 + x * 0.1) * 2.5);
  const flap = Math.floor(frame * 0.35) % 2 === 0;

  // 1. Núcleo central de hielo y cristal glacial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 4, py + 1 + bob, 12, 12);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 5, py + 2 + bob, 10, 10);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 6, py + 3 + bob, 8, 8);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 8, py + 5 + bob, 4, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 9, py + 6 + bob, 2, 2);

  // 2. Alas de cristales de hielo translucidos
  ctx.fillStyle = 'rgba(202, 240, 248, 0.88)';
  if (flap) {
    // Alas levantadas
    ctx.beginPath();
    ctx.moveTo(px + 4, py + 4 + bob);
    ctx.lineTo(px - 5, py - 6 + bob);
    ctx.lineTo(px - 1, py + 8 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 16, py + 4 + bob);
    ctx.lineTo(px + 25, py - 6 + bob);
    ctx.lineTo(px + 21, py + 8 + bob);
    ctx.closePath();
    ctx.fill();

    // Bordes brillantes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 4, py - 5 + bob, 3, 2);
    ctx.fillRect(px + 21, py - 5 + bob, 3, 2);
  } else {
    // Alas batidas hacia abajo
    ctx.beginPath();
    ctx.moveTo(px + 4, py + 6 + bob);
    ctx.lineTo(px - 6, py + 14 + bob);
    ctx.lineTo(px + 2, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 16, py + 6 + bob);
    ctx.lineTo(px + 26, py + 14 + bob);
    ctx.lineTo(px + 18, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    // Bordes brillantes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 4, py + 11 + bob, 3, 2);
    ctx.fillRect(px + 21, py + 11 + bob, 3, 2);
  }

  // 3. Ojos brillantes de ventisca
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 6, py + 5 + bob, 2, 2);
  ctx.fillRect(px + 12, py + 5 + bob, 2, 2);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px + 7, py + 6 + bob, 1, 1);
  ctx.fillRect(px + 13, py + 6 + bob, 1, 1);

  // 4. Carámbanos inferiores colgantes
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 7, py + 13 + bob, 2, 3);
  ctx.fillRect(px + 11, py + 13 + bob, 2, 4);
}

// 3. Escarabajo Sagrado de Lapislázuli del Monte Kailash (Pixel Art)
function drawKailashScarab(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.22) % 2;

  // Sombra
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Patitas doradas articuladas
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 7 - step, py + 12, 3, 3);
  ctx.fillRect(px + 12 + step, py + 12, 3, 3);
  ctx.fillRect(px + 16 - step, py + 12, 3, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 3 + step, py + 13, 1, 2);
  ctx.fillRect(px + 8 - step, py + 13, 1, 2);
  ctx.fillRect(px + 13 + step, py + 13, 1, 2);
  ctx.fillRect(px + 17 - step, py + 13, 1, 2);

  // Caparazón acorazado de lapislázuli ultramarino
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 2, 20, 11);
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(px + 1, py + 3, 18, 9);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(px + 2, py + 4, 16, 7);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 3, py + 5, 14, 4);

  // Veta ceremonial dorada en el lomo
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 6, py + 4, 8, 2);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + 7, py + 4, 6, 1);
  ctx.fillRect(px + 9, py + 2, 2, 8);

  // Gema astral en el centro del lomo pulsante
  const pulse = Math.sin(frame * 0.14) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(254, 240, 138, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px + 9, py + 5, 2, 2);

  // Ojos sagrados de esmeralda celestial
  const eyeX = facingRight ? px + 15 : px + 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX, py + 6, 3, 3);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(facingRight ? eyeX + 1 : eyeX, py + 7, 2, 2);

  // Pinzas rituales doradas
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(facingRight ? px + 18 : px - 1, py + 8, 3, 2);
  ctx.fillRect(facingRight ? px + 19 : px - 2, py + 7, 1, 1);
}

// 4. Guardián Cristalino de Agartha (Autómata Sagrado de Cuarzo y Amatista)
function drawAgarthaSentinel(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.2) % 2;

  // Sombra mística
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Extremidades de cuarzo y mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 8 - step, py + 12, 3, 3);
  ctx.fillRect(px + 14 + step, py + 12, 3, 3);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 3 + step, py + 13, 1, 2);
  ctx.fillRect(px + 9 - step, py + 13, 1, 2);
  ctx.fillRect(px + 15 + step, py + 13, 1, 2);

  // Chasis angular de obsidiana estelar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 1, py + 3, 18, 10);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py + 4, 16, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 3, py + 5, 14, 6);

  // Núcleo central de amatista radiante
  const aGlow = Math.sin(frame * 0.15) * 0.25 + 0.75;
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(px + 7, py + 6, 6, 5);
  ctx.fillStyle = 'rgba(192, 132, 252, ' + aGlow.toFixed(2) + ')';
  ctx.fillRect(px + 8, py + 7, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 9, py + 8, 2, 1);

  // Espinas dorsales de cuarzo azul levitantes
  const floatY = Math.sin(frame * 0.1) * 1.5;
  const crystals = [
    { x: px + 3, h: 6, c: '#38bdf8' },
    { x: px + 7, h: 8, c: '#c084fc' },
    { x: px + 12, h: 9, c: '#38bdf8' },
    { x: px + 16, h: 6, c: '#c084fc' }
  ];

  for (const c of crystals) {
    ctx.fillStyle = c.c;
    ctx.beginPath();
    ctx.moveTo(c.x - 2, py + 4 + floatY);
    ctx.lineTo(c.x, py + 4 - c.h + floatY);
    ctx.lineTo(c.x + 2, py + 4 + floatY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(c.x - 1, py + 4 - c.h + 2 + floatY, 1, c.h - 3);
  }

  // Visor estelar del autómata
  const visorX = facingRight ? px + 14 : px + 3;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(visorX, py + 6, 3, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(facingRight ? visorX + 1 : visorX, py + 6, 1, 1);
}

// 5. Fénix Astral / Murciélago Cósmico de Agartha (Pixel Art)
function drawAstralFlier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const bob = Math.round(Math.sin(frame * 0.15 + x * 0.08) * 3);
  const flap = Math.floor(frame * 0.28) % 2 === 0;

  // Estela de polvo estelar cósmico
  const tProg = (frame * 0.06) % 1;
  ctx.fillStyle = 'rgba(192, 132, 252, ' + (1 - tProg).toFixed(2) + ')';
  ctx.fillRect(px + 7 + Math.sin(frame * 0.2) * 3, py + 14 + bob + tProg * 8, 2, 2);
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (1 - tProg).toFixed(2) + ')';
  ctx.fillRect(px + 11 - Math.sin(frame * 0.2) * 3, py + 14 + bob + tProg * 8, 2, 2);

  // Cuerpo romboidal de amatista y oro
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 6, py + 2 + bob, 8, 10);
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(px + 7, py + 3 + bob, 6, 8);
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(px + 8, py + 4 + bob, 4, 6);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 9, py + 5 + bob, 2, 4);

  // Alas de aurora boreal (degradado cian, violeta y ámbar)
  if (flap) {
    // Alas alzadas
    ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.beginPath();
    ctx.moveTo(px + 6, py + 5 + bob);
    ctx.lineTo(px - 6, py - 6 + bob);
    ctx.lineTo(px - 1, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 14, py + 5 + bob);
    ctx.lineTo(px + 26, py - 6 + bob);
    ctx.lineTo(px + 21, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    // Borde de luz violeta
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px - 6, py - 6 + bob);
    ctx.lineTo(px + 6, py + 5 + bob);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px + 26, py - 6 + bob);
    ctx.lineTo(px + 14, py + 5 + bob);
    ctx.stroke();
  } else {
    // Alas extendidas hacia abajo
    ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
    ctx.beginPath();
    ctx.moveTo(px + 6, py + 5 + bob);
    ctx.lineTo(px - 7, py + 14 + bob);
    ctx.lineTo(px + 4, py + 11 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 14, py + 5 + bob);
    ctx.lineTo(px + 27, py + 14 + bob);
    ctx.lineTo(px + 16, py + 11 + bob);
    ctx.closePath();
    ctx.fill();

    // Borde de luz cian
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px - 7, py + 14 + bob);
    ctx.lineTo(px + 6, py + 5 + bob);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px + 27, py + 14 + bob);
    ctx.lineTo(px + 14, py + 5 + bob);
    ctx.stroke();
  }

  // Ojos dorados de halcón estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 7, py + 5 + bob, 2, 2);
  ctx.fillRect(px + 11, py + 5 + bob, 2, 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 7, py + 6 + bob, 1, 1);
  ctx.fillRect(px + 12, py + 6 + bob, 1, 1);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrostCrawler = drawFrostCrawler;
  SpriteManager.prototype.drawFrostFlier = drawFrostFlier;
  SpriteManager.prototype.drawKailashScarab = drawKailashScarab;
  SpriteManager.prototype.drawAgarthaSentinel = drawAgarthaSentinel;
  SpriteManager.prototype.drawAstralFlier = drawAstralFlier;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawFrostCrawler,
    drawFrostFlier,
    drawKailashScarab,
    drawAgarthaSentinel,
    drawAstralFlier
  };
}
