// ============================================================================
// SPRITES MUNDO 4 - FASE 4: DECORACIONES DEL LAGO CONGELADO (PIXEL ART)
// ============================================================================
// 1. Cabaña de pesca en el hielo con estufa, agujero en el hielo y cubo de truchas.
// 2. Escultura de hielo cristalina esculpida en hielo glacial milenario.
// 3. Boya náutica congelada con campana de niebla y farol de advertencia ámbar.

function drawIceFishingHut(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;
  const h = 46;

  // Cimientos de patines de trineo de madera bajo la cabaña
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px, py - 4, w, 4);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 2, py - 6, w - 4, 3);

  // Muros de tablones de cedro rústico
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 4, py - h + 14, w - 8, h - 18);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 6, py - h + 16, w - 12, h - 22);

  // Tablones horizontales
  for (let ly = py - h + 20; ly < py - 6; ly += 8) {
    ctx.fillStyle = '#27160c';
    ctx.fillRect(px + 6, ly, w - 12, 1);
  }

  // Tejado inclinado a un agua con grueso manto de nieve
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px + 2, py - h + 14);
  ctx.lineTo(px + w - 2, py - h + 6);
  ctx.lineTo(px + w + 2, py - h + 10);
  ctx.lineTo(px - 2, py - h + 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - h + 16);
  ctx.lineTo(px + w + 4, py - h + 6);
  ctx.lineTo(px + w + 2, py - h + 10);
  ctx.lineTo(px - 2, py - h + 20);
  ctx.closePath();
  ctx.fill();

  // Chimenea de tubo de hierro con humo de leña
  const chimX = px + 10;
  const chimY = py - h + 6;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX, chimY - 14, 4, 16);
  // Humo suave
  for (let s = 0; s < 3; s++) {
    const sBob = Math.sin(frame * 0.1 + s * 1.2) * 4;
    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.beginPath();
    ctx.arc(chimX + 2 + sBob, chimY - 18 - s * 8, 3 + s * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ventanuco con luz cálida
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + w - 18, py - 32, 10, 10);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + w - 16, py - 30, 6, 6);

  // Puerta de madera con picaporte
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px + 18, py - 28, 12, 24);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 19, py - 27, 10, 22);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 20, py - 16, 2, 2);

  // Agujero de pesca en el hielo al lado derecho de la cabaña
  const holeX = px + w + 8;
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(holeX, py - 1, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(holeX, py - 1, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Caña de pescar apoyada con sedal hacia el agujero
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(holeX - 12, py - 2);
  ctx.lineTo(holeX - 2, py - 14);
  ctx.stroke();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(holeX - 2, py - 14);
  ctx.lineTo(holeX + 1, py);
  ctx.stroke();

  // Cubo de madera con peces árticos al lado
  const bX = holeX - 20;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(bX, py - 10, 7, 10);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(bX + 1, py - 12, 5, 3); // Colas de pescado
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(bX + 2, py - 14, 2, 3);
}

function drawIceSculpture(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Pedestal de roca de permafrost y nieve compacta
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 8, 28, 8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 12, py - 10, 24, 3);

  // Escultura de cisne de hielo esculpida
  // Cuerpo cristalino
  ctx.fillStyle = '#7dd3fc';
  ctx.beginPath();
  ctx.ellipse(px, py - 18, 10, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Alas translúcidas talladas
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 18);
  ctx.lineTo(px - 14, py - 28);
  ctx.lineTo(px - 2, py - 22);
  ctx.closePath();
  ctx.fill();

  // Cuello elegante curvado
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 18);
  ctx.quadraticCurveTo(px + 12, py - 26, px + 8, py - 34);
  ctx.lineTo(px + 5, py - 34);
  ctx.quadraticCurveTo(px + 8, py - 26, px + 1, py - 18);
  ctx.closePath();
  ctx.fill();

  // Cabeza y pico
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px + 7, py - 34, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px + 9, py - 35, 3, 2); // Pico

  // Destello brillante cíclico
  const glint = (frame % 45 < 8);
  if (glint) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py - 24, 3, 3);
    ctx.fillRect(px - 3, py - 23, 5, 1);
    ctx.fillRect(px - 1, py - 25, 1, 5);
  }
}

function drawFrozenLakeBuoy(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Plancha de hielo quebrada alrededor de la base
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 11, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cuerpo cilíndrico cónico de la boya (rojo de alta visibilidad)
  ctx.fillStyle = '#be123c';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - 3);
  ctx.lineTo(px - 4, py - 22);
  ctx.lineTo(px + 4, py - 22);
  ctx.lineTo(px + 7, py - 3);
  ctx.closePath();
  ctx.fill();

  // Franja blanca reflectante central
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 11);
  ctx.lineTo(px - 5, py - 16);
  ctx.lineTo(px + 5, py - 16);
  ctx.lineTo(px + 6, py - 11);
  ctx.closePath();
  ctx.fill();

  // Témpanos colgantes de la boya
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px - 5, py - 3, 2, 6);
  ctx.fillRect(px + 3, py - 3, 2, 5);

  // Farol de destello superior
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 26, 6, 4);

  // Luz ámbar parpadeante
  const isLit = (frame % 36 < 22);
  ctx.fillStyle = isLit ? '#fbbf24' : '#78350f';
  ctx.fillRect(px - 2, py - 30, 4, 4);

  if (isLit) {
    const bHalo = ctx.createRadialGradient(px, py - 28, 2, px, py - 28, 18);
    bHalo.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    bHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = bHalo;
    ctx.beginPath();
    ctx.arc(px, py - 28, 18, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGlacialAltar(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 64;
  const h = 54;

  // Base escalonada de basalto y permafrost milenario
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 8, w, 8);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 4, py - 14, w - 8, 6);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 8, py - 18, w - 16, 4);

  // Pilares gemelos de hielo rúnico a los costados
  const pW = 10;
  const pH = 32;
  // Pilar izquierdo
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px + 10, py - 18 - pH, pW, pH);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 12, py - 18 - pH + 2, pW - 4, pH - 4);
  // Runas grabadas en pilar izquierdo
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + 14, py - 40, 2, 4);
  ctx.fillRect(px + 13, py - 30, 4, 2);

  // Pilar derecho
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px + w - 20, py - 18 - pH, pW, pH);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + w - 18, py - 18 - pH + 2, pW - 4, pH - 4);
  // Runas grabadas en pilar derecho
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + w - 16, py - 40, 2, 4);
  ctx.fillRect(px + w - 17, py - 30, 4, 2);

  // Dintel superior de hielo tallado
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px + 6, py - 18 - pH - 6, w - 12, 6);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px + 8, py - 18 - pH - 5, w - 16, 2);

  // Gema o cristal celestial en el centro del frontón
  const gemX = px + Math.floor(w / 2);
  const gemY = py - 18 - pH - 3;
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(gemX, gemY, 4, 0, Math.PI * 2);
  ctx.fill();

  // Resplandor celestial pulsante
  const gPulse = Math.sin(frame * 0.1) * 3;
  const aHalo = ctx.createRadialGradient(gemX, gemY, 2, gemX, gemY, 24 + gPulse);
  aHalo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  aHalo.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
  aHalo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = aHalo;
  ctx.beginPath();
  ctx.arc(gemX, gemY, 24 + gPulse, 0, Math.PI * 2);
  ctx.fill();

  // Pebetero central de bronce con fuego sagrado y humo turquesa
  const bX = px + Math.floor(w / 2) - 8;
  const bY = py - 18;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(bX, bY - 8, 16, 8);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(bX + 2, bY - 6, 12, 6);

  // Llama sagrada azul
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(bX + 8, bY - 11, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(bX + 8, bY - 12, 2, 0, Math.PI * 2);
  ctx.fill();

  // Humo sagrado ascendente
  for (let s = 0; s < 3; s++) {
    const sBob = Math.sin(frame * 0.08 + s) * 3;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.beginPath();
    ctx.arc(bX + 8 + sBob, bY - 16 - s * 6, 2.5 + s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawIceCrevasseMarker(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Base de nieve compacta
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Piolet clavado en el hielo
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 2);
  ctx.lineTo(px + 4, py - 24);
  ctx.stroke();

  // Cabeza de acero del piolet
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 1, py - 26, 6, 3);
  ctx.fillRect(px - 2, py - 25, 4, 2);

  // Banderín triangular de peligro naranja de alta visibilidad
  const wAngle = Math.sin(frame * 0.15) * 2;
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 22);
  ctx.lineTo(px + 18 + wAngle, py - 17);
  ctx.lineTo(px + 4, py - 12);
  ctx.closePath();
  ctx.fill();

  // Franja reflectante plateada en el banderín
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - 19, 2, 6);

  // Diodo de advertencia en la punta
  const isBlink = (frame % 28 < 14);
  ctx.fillStyle = isBlink ? '#ef4444' : '#7f1d1d';
  ctx.fillRect(px + 3, py - 28, 2, 2);
}

function drawSummitSignpost(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Poste de madera tratada para alta montaña
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 36, 4, 36);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 1, py - 35, 2, 35);

  // Tablilla de dirección apuntando hacia arriba a la cumbre
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 16, py - 34, 32, 12);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 15, py - 33, 30, 10);

  // Flecha y texto reflectante
  ctx.fillStyle = '#ffd166';
  // Flecha hacia arriba a la derecha
  ctx.beginPath();
  ctx.moveTo(px + 8, py - 30);
  ctx.lineTo(px + 13, py - 30);
  ctx.lineTo(px + 13, py - 25);
  ctx.lineTo(px + 8, py - 30);
  ctx.fill();
  ctx.fillRect(px - 12, py - 29, 16, 2);

  // Nieve acumulada en la tablilla
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 17, py - 36, 34, 2);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px - 14, py - 22, 2, 4); // Témpano
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawIceFishingHut = drawIceFishingHut;
  SpriteManager.prototype.drawIceSculpture = drawIceSculpture;
  SpriteManager.prototype.drawFrozenLakeBuoy = drawFrozenLakeBuoy;
  SpriteManager.prototype.drawGlacialAltar = drawGlacialAltar;
  SpriteManager.prototype.drawIceCrevasseMarker = drawIceCrevasseMarker;
  SpriteManager.prototype.drawSummitSignpost = drawSummitSignpost;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawIceFishingHut,
    drawIceSculpture,
    drawFrozenLakeBuoy,
    drawGlacialAltar,
    drawIceCrevasseMarker,
    drawSummitSignpost
  };
}
