// ============================================================================
// SPRITES MUNDO 4: CASA 6 - TALLER DE HERRAMIENTAS Y FORJA DE HIELO
// ============================================================================
// "La Forja del Glaciar" del Maestro Kazi:
// 1. Fachada exterior con chimenea de hierro forjado, chispas y letrero de martillo.
// 2. Horno criogénico de fundición y gran Yunque de Hielo con resplandor azul.
// 3. Estante de herramientas de forja, tenazas, lingotes de hielo y cuba de templado.

function drawForgeFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100;
  const h = 88;

  // Base de cimientos de piedra volcánica oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 12, w, 12);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2, py - 10, w - 4, 10);

  // Muros de vigas de madera oscura tratada con herrajes
  ctx.fillStyle = '#261b14';
  ctx.fillRect(px + 4, py - h + 20, w - 8, h - 32);

  // Tablones horizontales y remaches de hierro
  for (let ly = py - h + 24; ly < py - 12; ly += 10) {
    ctx.fillStyle = '#17100b';
    ctx.fillRect(px + 4, ly, w - 8, 1);
    ctx.fillStyle = '#334155';
    // Remaches metálicos en los bordes
    ctx.fillRect(px + 6, ly + 4, 2, 2);
    ctx.fillRect(px + w - 8, ly + 4, 2, 2);
  }

  // Tejado a dos aguas reforzado con tejas de pizarra oscura
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 22);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 4);
  ctx.lineTo(px + w + 6, py - h + 22);
  ctx.closePath();
  ctx.fill();

  // Manto grueso de nieve sobre el tejado
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 21);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 7);
  ctx.lineTo(px + w + 8, py - h + 21);
  ctx.lineTo(px + w + 6, py - h + 25);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 2);
  ctx.lineTo(px - 6, py - h + 25);
  ctx.closePath();
  ctx.fill();

  // Témpanos afilados en los aleros
  ctx.fillStyle = '#bae6fd';
  const icicleOffsets = [4, 16, 28, 44, 56, 72, 84, 94];
  for (let i = 0; i < icicleOffsets.length; i++) {
    const ix = px + icicleOffsets[i];
    const ih = 6 + ((i * 3) % 7);
    ctx.beginPath();
    ctx.moveTo(ix, py - h + 22);
    ctx.lineTo(ix + 3, py - h + 22);
    ctx.lineTo(ix + 1.5, py - h + 22 + ih);
    ctx.closePath();
    ctx.fill();
  }

  // Gran Chimenea de hierro negro con abrazaderas de remaches
  const chimX = px + w - 24;
  const chimY = py - h - 18;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX, chimY, 16, 36);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX + 2, chimY, 12, 36);
  // Abrazaderas
  ctx.fillStyle = '#64748b';
  ctx.fillRect(chimX - 1, chimY + 8, 18, 2);
  ctx.fillRect(chimX - 1, chimY + 22, 18, 2);

  // Humo azul criogénico y chispas ámbar de la fragua
  const smokeFrame = Math.sin(frame * 0.12);
  for (let s = 0; s < 3; s++) {
    const sy = chimY - 8 - s * 12;
    const sx = chimX + 6 + Math.sin(frame * 0.08 + s) * 7;
    const sRad = 4 + s * 2;
    ctx.fillStyle = s % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(251, 146, 60, 0.4)';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Letrero de la forja: Yunque y Martillo de Hielo cruzados
  const signX = px + 14;
  const signY = py - 48;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(signX, signY, 24, 18);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(signX + 1, signY + 1, 22, 16);
  // Icono del martillo y yunque
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(signX + 6, signY + 10, 12, 4); // Yunque
  ctx.fillRect(signX + 8, signY + 14, 8, 2); // Base yunque
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(signX + 10, signY + 4, 4, 5); // Cabeza martillo
  ctx.fillStyle = '#b45309';
  ctx.fillRect(signX + 11, signY + 9, 2, 6); // Mango martillo

  // Puerta de entrada arqueada de roble oscuro con bisagras pesadas
  const doorX = px + 44;
  const doorY = py - 38;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(doorX - 2, doorY - 2, 22, 40);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(doorX, doorY, 18, 38);
  // Bisagras de hierro
  ctx.fillStyle = '#475569';
  ctx.fillRect(doorX, doorY + 6, 8, 3);
  ctx.fillRect(doorX, doorY + 26, 8, 3);
  // Picaporte de bronce
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 13, doorY + 18, 3, 3);
}

function drawIceForgeAnvilAndFurnace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Horno Criogénico de Fundición (Lado izquierdo)
  const fx = px;
  const fy = py;
  // Bóveda exterior de piedra de basalto
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(fx, fy - 52, 44, 52);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(fx + 2, fy - 50, 40, 50);

  // Campana de extracción y chimenea superior
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(fx - 2, fy - 52);
  ctx.lineTo(fx + 22, fy - 72);
  ctx.lineTo(fx + 46, fy - 52);
  ctx.closePath();
  ctx.fill();

  // Boca del horno con fuego místico azul y ámbar
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(fx + 8, fy - 34, 28, 30);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(fx + 12, fy - 30, 20, 24);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(fx + 16, fy - 22, 12, 16);

  // Resplandor pulsante del fuego criogénico
  const pulse = Math.sin(frame * 0.15) * 4;
  const halo = ctx.createRadialGradient(fx + 22, fy - 18, 6, fx + 22, fy - 18, 38 + pulse);
  halo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  halo.addColorStop(0.6, 'rgba(14, 165, 233, 0.15)');
  halo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(fx + 22, fy - 18, 38 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // 2. Gran Yunque de Hielo (Lado derecho)
  const ax = px + 58;
  const ay = py;

  // Base maciza de tronco de roble curtido
  ctx.fillStyle = '#261b14';
  ctx.fillRect(ax - 2, ay - 18, 32, 18);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(ax, ay - 16, 28, 16);
  // Abrazaderas de hierro
  ctx.fillStyle = '#475569';
  ctx.fillRect(ax - 2, ay - 12, 32, 2);

  // Cuerpo del yunque de acero templado
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(ax + 2, ay - 28, 24, 10);
  ctx.fillStyle = '#334155';
  ctx.fillRect(ax - 6, ay - 34, 38, 6);
  // Cuerno del yunque
  ctx.beginPath();
  ctx.moveTo(ax - 6, ay - 34);
  ctx.lineTo(ax - 14, ay - 31);
  ctx.lineTo(ax - 6, ay - 28);
  ctx.closePath();
  ctx.fill();

  // Bloque de hielo cristalino templándose sobre el yunque
  ctx.fillStyle = '#7dd3fc';
  ctx.fillRect(ax + 4, ay - 42, 14, 8);
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(ax + 6, ay - 40, 10, 4);

  // Martillo de forja descansando
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(ax + 20, ay - 40, 6, 4);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(ax + 22, ay - 36, 2, 8);
}

function drawForgeToolRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Estante vertical de hierro
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 36, 3, 36);
  ctx.fillRect(px + 36, py - 36, 3, 36);
  ctx.fillRect(px, py - 32, 39, 3);
  ctx.fillRect(px, py - 18, 39, 3);

  // Herramientas colgadas: tenazas, martillo y cincel
  ctx.fillStyle = '#64748b';
  // Tenazas
  ctx.fillRect(px + 6, py - 30, 2, 14);
  ctx.fillRect(px + 10, py - 30, 2, 14);
  // Cincel de hielo
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 18, py - 30, 3, 12);
  // Mazo pesado
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 26, py - 30, 6, 5);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 28, py - 25, 2, 10);

  // Cuba de templado con agua gélida y vapor
  const tubX = px + 44;
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(tubX, py - 20, 22, 20);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(tubX + 2, py - 18, 18, 6);
  // Vapor tenue
  ctx.fillStyle = 'rgba(224, 242, 254, 0.35)';
  const vBob = Math.sin(frame * 0.1) * 2;
  ctx.beginPath();
  ctx.arc(tubX + 8, py - 22 + vBob, 4, 0, Math.PI * 2);
  ctx.arc(tubX + 14, py - 25 - vBob, 5, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawForgeFacade = drawForgeFacade;
  SpriteManager.prototype.drawIceForgeAnvilAndFurnace = drawIceForgeAnvilAndFurnace;
  SpriteManager.prototype.drawForgeToolRack = drawForgeToolRack;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawForgeFacade,
    drawIceForgeAnvilAndFurnace,
    drawForgeToolRack
  };
}
