// ============================================================================
// SPRITES: INTERIOR DEL RASCACIELOS (PRIMER PISO, LOBBY Y ASCENSOR)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawSkyscraperDoors(ctx, x, y, isOpen = false, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Portal monumental exterior en granito oscuro pulido y latón
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 10, py - 56, 52, 56);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 54, 48, 54);

  // Pilares laterales de mármol con remates dorados
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(px - 8, py - 52, 6, 52);
  ctx.fillRect(px + 34, py - 52, 6, 52);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 9, py - 54, 8, 3);
  ctx.fillRect(px + 33, py - 54, 8, 3);
  ctx.fillRect(px - 9, py - 3, 8, 3);
  ctx.fillRect(px + 33, py - 3, 8, 3);

  // 2. Marquesina voladiza y rótulo iluminado "TORRE CENTRAL"
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 14, py - 60, 60, 8);
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(px - 12, py - 59, 56, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 14, py - 61, 60, 2);
  // Letras luminosas del cartel
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py - 58, 40, 4);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px - 2, py - 57, 36, 2);

  // 3. Ventana de espejo / tragaluz superior con luz interior cálida
  const interiorGlow = ctx.createLinearGradient(px, py - 46, px, py - 36);
  interiorGlow.addColorStop(0, '#ffd166');
  interiorGlow.addColorStop(1, 'rgba(255, 209, 102, 0.25)');
  ctx.fillStyle = interiorGlow;
  ctx.fillRect(px, py - 46, 32, 10);
  ctx.strokeStyle = '#d4a373';
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py - 46, 32, 10);

  // 4. Panel LED indicador de acceso / cerradura biométrica
  ctx.fillStyle = isOpen ? '#06d6a0' : '#ffd166';
  ctx.fillRect(px + 4, py - 34, 24, 3);

  // 5. Puertas dobles corredizas de cristal templado tintado
  const slide = isOpen ? 12 : 0;
  // Fondo del vestíbulo visible a través del cristal
  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(px, py - 30, 32, 30);
  ctx.fillStyle = 'rgba(255, 243, 176, 0.35)';
  ctx.fillRect(px + 2, py - 28, 28, 28);

  // Hoja izquierda
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 1 - slide, py - 30, 14, 30);
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 1 - slide, py - 30, 14, 30);
  // Tirador vertical de latón
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 12 - slide, py - 20, 2, 10);

  // Hoja derecha
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 17 + slide, py - 30, 14, 30);
  ctx.strokeRect(px + 17 + slide, py - 30, 14, 30);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 18 + slide, py - 20, 2, 10);

  // 6. Felpudo rojo de entrada con ribetes dorados
  ctx.fillStyle = '#c1121f';
  ctx.fillRect(px - 2, py - 2, 36, 2);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 3, py - 3, 38, 1);

  // 7. Candelabros / Farolas de entrada en las columnas
  const lampFlash = Math.sin(frame * 0.1) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 7, py - 40, 4, 6);
  ctx.fillRect(px + 35, py - 40, 4, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 6, py - 39, 2, 4);
  ctx.fillRect(px + 36, py - 39, 2, 4);
  // Cono de luz sobre la terraza
  ctx.fillStyle = 'rgba(255, 230, 109, 0.16)';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 34); ctx.lineTo(px - 14, py); ctx.lineTo(px + 4, py); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(px + 37, py - 34); ctx.lineTo(px + 28, py); ctx.lineTo(px + 46, py); ctx.closePath(); ctx.fill();
}

function drawReceptionDesk(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Mostrador de mármol blanco curvo (44px ancho x 22px alto)
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 18, 44, 20);
  ctx.fillStyle = '#f8f9fa'; ctx.fillRect(px + 1, py - 17, 42, 18);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 17, 40, 3); // Superficie pulida

  // Logotipo corporativo dorado en el frente
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 18, py - 10, 8, 4);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 20, py - 9, 4, 2);

  // Pantalla de terminal con gráfico costero
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 6, py - 26, 12, 9);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 7, py - 25, 10, 7);
  const wave = (frame * 0.2) % 10;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 7 + Math.floor(wave), py - 22, 2, 2);
}

function drawLobbyElevator(ctx, x, y, isRooftop = false, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Gran portal monumental dorado del ascensor (38px ancho x 56px alto)
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 2, py - 54, 42, 56);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px, py - 52, 38, 54);

  // Display digital indicador de piso
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 6, py - 50, 26, 8);
  ctx.fillStyle = '#ffd166'; ctx.font = 'bold 5.5px monospace'; ctx.textAlign = 'center';
  ctx.fillText(isRooftop ? 'P-100' : 'P-01', px + 19, py - 44);

  // Puertas doradas de latón pulido con estrías art-deco
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 2, py - 40, 16, 40);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 20, py - 40, 16, 40);
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 18, py - 40, 2, 40); // Ranura central

  // Botón luminoso de llamada
  const glow = Math.sin(frame * 0.15) > 0 ? '#ffffff' : '#ffd166';
  ctx.fillStyle = glow;
  ctx.fillRect(px + 40, py - 26, 3, 4);
}

function drawLobbyDecorations(ctx, x, y, type = 'palm', frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  if (type === 'palm') {
    // Maceta cilíndrica de cerámica blanca y palmera verde de interior
    ctx.fillStyle = '#343a40'; ctx.fillRect(px + 2, py - 10, 14, 12);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 3, py - 9, 12, 10);
    // Tallo y hojas tropicales verde esmeralda
    ctx.fillStyle = '#7f5539'; ctx.fillRect(px + 8, py - 22, 2, 13);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(px + 1, py - 26, 8, 3);
    ctx.fillRect(px + 9, py - 26, 8, 3);
    ctx.fillStyle = '#52b788';
    ctx.fillRect(px + 4, py - 30, 10, 3);
  } else if (type === 'bench') {
    // Sofá / banco elegante de espera en madera noble y tapiz azul náutico
    ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 10, 32, 12);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 1, py - 9, 30, 8);
    ctx.fillStyle = '#e9ecef'; ctx.fillRect(px + 2, py - 12, 28, 4); // Cojín marfil
  } else if (type === 'turnstile') {
    // Molinete de control de acceso cromado
    ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 18, 8, 20);
    ctx.fillStyle = '#ced4da'; ctx.fillRect(px + 1, py - 17, 6, 18);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 2, py - 14, 4, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSkyscraperDoors = drawSkyscraperDoors;
  SpriteManager.prototype.drawReceptionDesk = drawReceptionDesk;
  SpriteManager.prototype.drawLobbyElevator = drawLobbyElevator;
  SpriteManager.prototype.drawLobbyDecorations = drawLobbyDecorations;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSkyscraperDoors, drawReceptionDesk, drawLobbyElevator, drawLobbyDecorations };
}
