// SPRITES MUNDO 3 - FASE 3: DECORACIONES DEL RESORT PLAYERO Y HELADERIA
function drawResortDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.type === 'ice_cream_cart') {
    // Carrito móvil de helados de Sami en estilo resort playero
    // Ruedas de radios
    ctx.fillStyle = '#343a40';
    ctx.beginPath();
    ctx.arc(px + 8, py - 6, 6, 0, Math.PI * 2);
    ctx.arc(px + 36, py - 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 7, py - 7, 2, 2);
    ctx.fillRect(px + 35, py - 7, 2, 2);

    // Caja frigorífica blanca pulida
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 24, 44, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 22, 40, 12);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 4, py - 20, 36, 4);

    // Logo de helado en el frontal
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 18, py - 15, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 20, py - 18, 4, 4);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 21, py - 19, 2, 2); // Guinda del helado

    // Toldo a rayas del carrito (turquesa y blanco)
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(px + 4, py - 38, 2, 16);  // Poste soporte izquierdo
    ctx.fillRect(px + 38, py - 38, 2, 16); // Poste soporte derecho
    ctx.fillStyle = '#005f73';
    ctx.fillRect(px - 4, py - 46, 52, 10);
    for (let s = 0; s < 5; s++) {
      const isAlt = s % 2 === 0;
      ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
      ctx.fillRect(px - 2 + s * 10, py - 45, 10, 8);
      ctx.fillStyle = isAlt ? '#caf0f8' : '#0077b6';
      ctx.fillRect(px - 2 + s * 10, py - 38, 10, 2);
    }
    // Campanilla dorada del heladero
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 41, py - 27, 3, 4);
  } else if (d.type === 'beach_towel') {
    // Toalla de playa rayada en turquesa y blanco sobre la arena
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(px, py - 3, 28, 3);
    for (let t = 0; t < 4; t++) {
      ctx.fillStyle = (t % 2 === 0) ? '#00b4d8' : '#ffffff';
      ctx.fillRect(px + 1 + t * 6, py - 2, 6, 2);
    }
    // Refresco tropical con rodaja de limón
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 20, py - 5, 4, 3);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 21, py - 7, 2, 2);
  } else if (d.type === 'sand_castle') {
    // Castillo de arena dorada con torres y foso
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(px, py - 14, 24, 14);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px + 1, py - 13, 22, 13);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 2, py - 10, 20, 10);
    // Tres almenas superiores
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(px + 2, py - 13, 4, 4);
    ctx.fillRect(px + 10, py - 15, 4, 6); // Torre central
    ctx.fillRect(px + 18, py - 13, 4, 4);
    // Banderita roja en la torre central
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 14, py - 18, 5, 3);
  } else if (d.type === 'volleyball_net') {
    // Red de voleibol de playa
    ctx.fillStyle = '#583110';
    ctx.fillRect(px, py - 36, 3, 36);      // Poste izq
    ctx.fillRect(px + 52, py - 36, 3, 36); // Poste der
    // Cinta superior blanca de la red
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 34, 49, 3);
    // Malla cuadriculada blanca translúcida
    ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
    ctx.fillRect(px + 3, py - 31, 49, 14);
    for (let gx = px + 6; gx < px + 50; gx += 6) {
      ctx.fillStyle = '#495057';
      ctx.fillRect(gx, py - 31, 1, 14);
    }
  } else if (d.type === 'beach_chair') {
    // Tumbona reclinable de playa en blanco y azul náutico
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 10, 26, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 9, 22, 3); // Marco blanco
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px + 2, py - 14, 8, 6); // Respaldo náutico
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 3, py - 13, 6, 4);
  } else if (d.type === 'surf_shop') {
    if (typeof drawSurfShop === 'function') drawSurfShop(ctx, d, frame);
  } else if (d.type === 'surfboard_stand') {
    if (typeof drawSurfboardStand === 'function') drawSurfboardStand(ctx, d, frame);
  } else if (d.type === 'ice_cream_table') {
    if (typeof drawIceCreamTable === 'function') drawIceCreamTable(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_booth') {
    if (typeof drawIceCreamBooth === 'function') drawIceCreamBooth(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_counter') {
    if (typeof drawIceCreamCounter === 'function') drawIceCreamCounter(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_menu_board') {
    if (typeof drawIceCreamMenuBoard === 'function') drawIceCreamMenuBoard(ctx, px, py, frame);
  }
}

if (typeof SpriteManager !== 'undefined') SpriteManager.prototype.drawResortDecoration = drawResortDecoration;
if (typeof module !== 'undefined') module.exports = { drawResortDecoration };
