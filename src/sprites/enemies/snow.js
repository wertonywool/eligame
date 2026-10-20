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

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrostCrawler = drawFrostCrawler;
  SpriteManager.prototype.drawFrostFlier = drawFrostFlier;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawFrostCrawler,
    drawFrostFlier
  };
}
