// ============================================================================
// SPRITES MUNDO 4: CASA 7 - LA ALCALDÍA Y SALIDA AL LAGO CONGELADO
// ============================================================================
// 1. Fachada señorial de la Alcaldía con torre del reloj, campanario y ventanales.
// 2. Gran escritorio de roble tallado, mapa del Everest y trono del Alcalde Dorje.
// 3. Gran Arco Glacial de salida del pueblo hacia el Lago Congelado de la Fase 4.

function drawTownHallFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 120;
  const h = 96;

  // Cimientos de piedra sillar pulida con remates de mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 14, w, 14);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 4, py - 12, w - 8, 12);

  // Muros de pino noble oscuro tallado con columnas laterales
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 6, py - h + 22, w - 12, h - 36);

  // Columnas dóricas de madera tallada a los lados
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 6, py - h + 22, 10, h - 36);
  ctx.fillRect(px + w - 16, py - h + 22, 10, h - 36);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 8, py - h + 22, 6, h - 36);
  ctx.fillRect(px + w - 14, py - h + 22, 6, h - 36);

  // Ventanales señoriales de vidrieras con luz ámbar
  const winY = py - 60;
  // Ventana izquierda
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 22, winY, 18, 22);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + 24, winY + 2, 14, 18);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 30, winY + 2, 2, 18); // Parteluz
  ctx.fillRect(px + 24, winY + 10, 14, 2);

  // Ventana derecha
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + w - 40, winY, 18, 22);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + w - 38, winY + 2, 14, 18);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + w - 32, winY + 2, 2, 18); // Parteluz
  ctx.fillRect(px + w - 38, winY + 10, 14, 2);

  // Gran Tejado a dos aguas de madera y pizarra azulada
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 24);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 6);
  ctx.lineTo(px + w + 6, py - h + 24);
  ctx.closePath();
  ctx.fill();

  // Grueso manto de nieve sobre el tejado principal
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 23);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 9);
  ctx.lineTo(px + w + 8, py - h + 23);
  ctx.lineTo(px + w + 6, py - h + 27);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 4);
  ctx.lineTo(px - 6, py - h + 27);
  ctx.closePath();
  ctx.fill();

  // Témpanos decorativos colgando de los aleros
  ctx.fillStyle = '#bae6fd';
  const icicleOffsets = [4, 16, 28, 42, 58, 76, 92, 106, 116];
  for (let i = 0; i < icicleOffsets.length; i++) {
    const ix = px + icicleOffsets[i];
    const ih = 7 + ((i * 4) % 8);
    ctx.beginPath();
    ctx.moveTo(ix, py - h + 24);
    ctx.lineTo(ix + 3, py - h + 24);
    ctx.lineTo(ix + 1.5, py - h + 24 + ih);
    ctx.closePath();
    ctx.fill();
  }

  // Torre Central del Reloj y Campanario
  const tX = px + Math.floor(w / 2) - 16;
  const tY = py - h - 34;
  ctx.fillStyle = '#27160c';
  ctx.fillRect(tX, tY, 32, 28);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(tX + 2, tY + 2, 28, 24);

  // Tejado piramidal del campanario
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(tX - 3, tY);
  ctx.lineTo(tX + 16, tY - 14);
  ctx.lineTo(tX + 35, tY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(tX - 4, tY - 1);
  ctx.lineTo(tX + 16, tY - 16);
  ctx.lineTo(tX + 36, tY - 1);
  ctx.lineTo(tX + 34, tY + 2);
  ctx.lineTo(tX + 16, tY - 12);
  ctx.lineTo(tX - 2, tY + 2);
  ctx.closePath();
  ctx.fill();

  // Esfera del reloj dorado
  const clockX = tX + 16;
  const clockY = tY + 14;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(clockX, clockY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.arc(clockX, clockY, 7, 0, Math.PI * 2);
  ctx.fill();
  // Manecillas del reloj (animadas)
  const handAngle = frame * 0.04;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + Math.cos(handAngle) * 5, clockY + Math.sin(handAngle) * 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX, clockY - 4);
  ctx.stroke();

  // Gran Puerta Doble Arqueada de la Alcaldía con Escudo
  const dX = px + Math.floor(w / 2) - 14;
  const dY = py - 42;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(dX - 2, dY - 2, 28, 44);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(dX, dY, 24, 42);
  ctx.fillStyle = '#17100b';
  ctx.fillRect(dX + 11, dY, 2, 42); // Hendidura entre las dos hojas
  // Escudo dorado de la villa sobre la puerta
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dX + 8, dY + 6, 8, 10);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(dX + 10, dY + 8, 4, 6);
  // Picaportes de bronce
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dX + 8, dY + 22, 2, 4);
  ctx.fillRect(dX + 14, dY + 22, 2, 4);
}

function drawTownHallMayorDesk(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Trono ceremonial de respaldo alto con terciopelo rojo
  const tx = px + 18;
  const ty = py;
  ctx.fillStyle = '#451a03';
  ctx.fillRect(tx - 4, ty - 56, 26, 56);
  ctx.fillStyle = '#be123c';
  ctx.fillRect(tx - 2, ty - 52, 22, 38);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(tx + 7, ty - 54, 4, 4); // Remate dorado superior

  // Gran Escritorio señorial de roble macizo
  const dx = px;
  const dy = py;
  ctx.fillStyle = '#27160c';
  ctx.fillRect(dx, dy - 26, 64, 26);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(dx + 2, dy - 24, 60, 24);
  // Molduras y tiradores dorados en los cajones
  ctx.fillStyle = '#17100b';
  ctx.fillRect(dx + 6, dy - 20, 20, 8);
  ctx.fillRect(dx + 38, dy - 20, 20, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dx + 15, dy - 16, 2, 2);
  ctx.fillRect(dx + 47, dy - 16, 2, 2);

  // Objetos sobre el escritorio:
  // 1. Mapa enrollado del Everest con sello de lacre
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(dx + 8, dy - 30, 14, 4);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(dx + 13, dy - 31, 3, 3); // Lacre rojo

  // 2. Tintero con pluma dorada
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(dx + 26, dy - 30, 4, 4);
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(dx + 28, dy - 30);
  ctx.lineTo(dx + 33, dy - 38);
  ctx.lineTo(dx + 30, dy - 34);
  ctx.closePath();
  ctx.fill();

  // 3. Candelabro con vela encendida y suave llama oscilante
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dx + 48, dy - 34, 6, 8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(dx + 50, dy - 42, 2, 8);
  // Llama
  const fBob = Math.sin(frame * 0.2) * 1.5;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(dx + 51, dy - 45 + fBob, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(dx + 51, dy - 45 + fBob, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawGlacialGateArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 56;
  const h = 76;

  // Pilares ciclópeos de piedra de basalto tallada a los lados
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - h, 14, h);
  ctx.fillRect(px + w - 14, py - h, 14, h);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2, py - h + 2, 10, h - 2);
  ctx.fillRect(px + w - 12, py - h + 2, 10, h - 2);

  // Gran dintel semicircular de hielo glacial tallado
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px, py - h - 10, w, 14);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 4, py - h - 8, w - 8, 10);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px + 8, py - h - 6, w - 16, 4);

  // Escudo rúnico en la clave del arco con resplandor pulsante
  const rPulse = Math.sin(frame * 0.1) * 3;
  const keyX = px + Math.floor(w / 2);
  const keyY = py - h - 4;
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(keyX, keyY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(keyX - 2, keyY - 2, 4, 4);

  // Resplandor glacial del paso hacia el Lago Congelado (Fase 4)
  const gHalo = ctx.createRadialGradient(keyX, py - 36, 10, keyX, py - 36, 38 + rPulse);
  gHalo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  gHalo.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
  gHalo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = gHalo;
  ctx.beginPath();
  ctx.arc(keyX, py - 36, 38 + rPulse, 0, Math.PI * 2);
  ctx.fill();

  // Témpanos afilados colgando del dintel interior
  ctx.fillStyle = '#bae6fd';
  const tipX = [16, 24, 32, 40];
  for (let i = 0; i < tipX.length; i++) {
    const tx = px + tipX[i];
    const th = 8 + ((i * 3) % 7);
    ctx.beginPath();
    ctx.moveTo(tx - 2, py - h + 4);
    ctx.lineTo(tx + 2, py - h + 4);
    ctx.lineTo(tx, py - h + 4 + th);
    ctx.closePath();
    ctx.fill();
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawTownHallFacade = drawTownHallFacade;
  SpriteManager.prototype.drawTownHallMayorDesk = drawTownHallMayorDesk;
  SpriteManager.prototype.drawGlacialGateArch = drawGlacialGateArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawTownHallFacade,
    drawTownHallMayorDesk,
    drawGlacialGateArch
  };
}
