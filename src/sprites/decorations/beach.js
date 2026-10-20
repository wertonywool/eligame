// SPRITES MUNDO 3 - FASE 2: DECORACIONES DE PLAYA Y ORILLA
function drawBeachDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.type === 'beach_umbrella') {
    // Sombrilla de playa rayada en azul turquesa y blanco puro
    ctx.fillStyle = '#4a2810';
    ctx.fillRect(px + 14, py - 38, 3, 38); // Mástil de madera
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 15, py - 36, 1, 36);

    // Cúpula de la sombrilla
    ctx.fillStyle = '#005f73';
    ctx.fillRect(px - 1, py - 46, 34, 12);
    for (let i = 0; i < 4; i++) {
      const isAlt = i % 2 === 0;
      ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
      ctx.fillRect(px + i * 8, py - 44, 8, 8);
      ctx.fillStyle = isAlt ? '#caf0f8' : '#0096c7';
      ctx.fillRect(px + i * 8 + 1, py - 43, 6, 2);
    }
    // Punta superior dorada
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 15, py - 48, 2, 3);
  } else if (d.type === 'lifeguard_tower') {
    // Torreta de vigilancia costera en madera blanca y techo rojo
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 44, 26, 44);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 2, py - 42, 22, 40);
    // Techo rojo salvavidas
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px - 2, py - 46, 30, 4);
    // Ventana de observación azul celeste
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(px + 5, py - 36, 16, 12);
    ctx.fillStyle = '#495057';
    ctx.fillRect(px + 12, py - 36, 2, 12);
    // Salvavidas colgado (Aro salvavidas rojo y blanco clásico)
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 8, py - 18, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 10, py - 16, 6, 6);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 11, py - 15, 4, 4);
  } else if (d.type === 'driftwood_log') {
    // Tronco de deriva marina varado en la arena
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(px, py - 8, 32, 8);
    ctx.fillStyle = '#c89f78';
    ctx.fillRect(px + 2, py - 7, 28, 6);
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(px + 4, py - 6, 24, 2);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(px + 8, py - 5, 4, 1);
  } else if (d.type === 'seashells') {
    // Conchas marinas nacaradas en la arena dorada
    const glint = Math.sin(frame * 0.1 + px) > 0.4;
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px, py - 4, 6, 4);
    ctx.fillStyle = glint ? '#ffffff' : '#fff1e6';
    ctx.fillRect(px + 1, py - 3, 4, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 8, py - 3, 5, 3);
    ctx.fillStyle = glint ? '#ffffff' : '#fde2e4';
    ctx.fillRect(px + 9, py - 2, 3, 1);
  } else if (d.type === 'surf_rack') {
    // Rack de tablas de surf de playa
    ctx.fillStyle = '#583110';
    ctx.fillRect(px, py - 32, 4, 32);
    ctx.fillRect(px + 24, py - 32, 4, 32);
    ctx.fillRect(px, py - 20, 28, 3);
    // Tablas verticales guardadas (turquesa, amarillo, blanco)
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 6, py - 34, 5, 34);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 8, py - 34, 1, 34);
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(px + 15, py - 36, 5, 36);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 17, py - 36, 1, 36);
  } else if (d.type === 'sandcastle') {
    // Castillo de arena dorada esculpido con torrecillas
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(px, py - 16, 26, 16);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px + 1, py - 15, 24, 15);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 2, py - 18, 5, 4);
    ctx.fillRect(px + 19, py - 18, 5, 4);
    ctx.fillRect(px + 10, py - 21, 6, 6);
    ctx.fillStyle = '#7f5539';
    ctx.fillRect(px + 10, py - 7, 6, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 12, py - 26, 1, 5);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 13, py - 26, 4, 3); // Banderita roja
  } else if (d.type === 'buoy_marker') {
    // Boya marina flotante con baliza
    const bob = Math.sin(frame * 0.12 + px * 0.08) * 2;
    const by = py + Math.round(bob);
    ctx.fillStyle = '#1d3557';
    ctx.fillRect(px + 2, by - 14, 12, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, by - 13, 10, 5);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 3, by - 8, 10, 7);
    const blink = Math.floor(frame * 0.2) % 2 === 0;
    ctx.fillStyle = blink ? '#ffbe0b' : '#c4923e';
    ctx.fillRect(px + 6, by - 18, 4, 4);
    if (blink) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 7, by - 17, 2, 2); }
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBeachDecoration = drawBeachDecoration;
}

if (typeof module !== 'undefined') {
  module.exports = { drawBeachDecoration };
}
