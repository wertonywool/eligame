// ============================================================================
// SPRITES MUNDO 3 • FASE 3: TIENDA DE SURF DE KAI ("KAI SURF SHACK")
// ============================================================================
// Módulo de sprite para la tienda de surf, carteles de neón y exhibidor de tablas

function drawSurfShop(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);
  const isOpen = (typeof saveState !== 'undefined' && saveState.kaiQuest && saveState.kaiQuest.shopOpen);

  // 1. Estructura principal de madera tropical (choza playera)
  ctx.fillStyle = '#583110';
  ctx.fillRect(px, py - 52, 72, 52);
  ctx.fillStyle = '#b57639';
  ctx.fillRect(px + 2, py - 50, 68, 48);

  // Tablones de madera verticales
  for (let bx = px + 8; bx < px + 68; bx += 8) {
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(bx, py - 50, 1, 48);
  }

  // 2. Mostrador frontal
  ctx.fillStyle = '#7f4f24';
  ctx.fillRect(px + 6, py - 22, 42, 22);
  ctx.fillStyle = '#c48b4f';
  ctx.fillRect(px + 8, py - 20, 38, 4); // Borde superior del mostrador

  // 3. Exhibidor lateral de tablas de surf (Rack de 3 tablas)
  const rackX = px + 50;
  ctx.fillStyle = '#583110';
  ctx.fillRect(rackX, py - 32, 18, 32);
  
  // Tabla 1: Azul turquesa
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(rackX + 2, py - 30, 4, 28);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 3, py - 26, 2, 20);

  // Tabla 2: Nácar / Blanco puro
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 7, py - 33, 4, 31);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(rackX + 8, py - 29, 2, 23);

  // Tabla 3: Dorada / Amarillo sol
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(rackX + 12, py - 28, 4, 26);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 13, py - 24, 2, 18);

  // 4. Techo de paja tropical y toldo a rayas náuticas
  ctx.fillStyle = '#583110';
  ctx.fillRect(px - 4, py - 60, 80, 10);
  for (let s = 0; s < 8; s++) {
    ctx.fillStyle = (s % 2 === 0) ? '#0077b6' : '#ffffff';
    ctx.fillRect(px - 2 + s * 10, py - 59, 10, 8);
  }

  // 5. Cartel superior en forma de tabla de surf
  const signY = py - 74;
  ctx.fillStyle = '#005f73';
  ctx.fillRect(px + 10, signY, 52, 13);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 12, signY + 2, 48, 9);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 7px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KAI SURF', px + 36, signY + 9);

  // 6. Estado: CERRADO / ABIERTO
  if (isOpen) {
    // Cartel Neón "OPEN"
    const blink = Math.floor(frame * 0.1) % 2 === 0;
    ctx.fillStyle = blink ? '#ffd166' : '#ffffff';
    ctx.fillRect(px + 16, py - 34, 22, 9);
    ctx.fillStyle = '#07020a';
    ctx.font = 'bold 6px sans-serif';
    ctx.fillText('OPEN', px + 27, py - 27);
  } else {
    // Cadena y cartel "CERRADO"
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px + 12, py - 32, 30, 8);
    ctx.fillStyle = '#ced4da';
    ctx.font = 'bold 5.5px sans-serif';
    ctx.fillText('CERRADO', px + 27, py - 26);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfShop = drawSurfShop;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfShop };
}
