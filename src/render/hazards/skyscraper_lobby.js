// ============================================================================
// FONDO ARQUITECTONICO DEL INTERIOR DEL RASCACIELOS (LOBBY / PLANTA BAJA)
// ============================================================================
function drawSkyscraperLobbyBackdrop(ctx, viewL, viewR, frame) {
  const lobbyStart = 13450, lobbyEnd = 14050, lobbyFloor = 220, lobbyCeil = 64;
  if (viewR < lobbyStart || viewL > lobbyEnd) return;

  const left = Math.max(lobbyStart, viewL - 10);
  const right = Math.min(lobbyEnd, viewR + 10);
  const width = right - left;

  // 1. Superestructura superior de la torre (pisos superiores de hormigón armado, sin fugas de cielo exterior)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(viewL - 20, 0, (viewR - viewL) + 40, lobbyCeil);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(left, lobbyCeil - 12, width, 12);
  // Casetones de techo con moldura Art-Deco y focos downlight
  for (let bx = Math.floor(left / 32) * 32; bx < right; bx += 32) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(bx + 4, 12, 24, lobbyCeil - 26);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(bx + 6, 14, 20, lobbyCeil - 30);
    // Downlight cálido
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(bx + 14, lobbyCeil - 13, 4, 2);
  }

  // Muros de fachada en los extremos exteriores
  if (viewL < lobbyStart) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(viewL - 20, 0, (lobbyStart - (viewL - 20)), H);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(lobbyStart - 8, 0, 8, H);
  }
  if (viewR > lobbyEnd) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(lobbyEnd, 0, (viewR + 20) - lobbyEnd, H);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(lobbyEnd, 0, 8, H);
  }

  // 2. Pared de fondo del gran vestíbulo en mármol claro elegante
  const wallGrad = ctx.createLinearGradient(0, lobbyCeil, 0, lobbyFloor);
  wallGrad.addColorStop(0, '#f8f9fa'); wallGrad.addColorStop(0.35, '#e9ecef');
  wallGrad.addColorStop(0.7, '#dee2e6'); wallGrad.addColorStop(1, '#ced4da');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(left, lobbyCeil, width, lobbyFloor - lobbyCeil);

  // 3. Grandes ventanales arqueados con vista al mar retirado y cielo de tormenta violeta
  const windows = [13510, 13870];
  for (const wx of windows) {
    if (wx + 65 >= left && wx <= right) {
      ctx.fillStyle = '#1e293b'; ctx.fillRect(wx - 2, lobbyCeil + 18, 64, 84);
      // Vista exterior de la catástrofe inminente (océano retirado y cielo violeta tempestuoso)
      const winGrad = ctx.createLinearGradient(0, lobbyCeil + 20, 0, lobbyCeil + 100);
      winGrad.addColorStop(0, '#10002b');   // Cielo violeta tormentoso
      winGrad.addColorStop(0.40, '#240046');
      winGrad.addColorStop(0.60, '#3c096c');
      winGrad.addColorStop(0.61, '#001233'); // Océano retirado mar adentro
      winGrad.addColorStop(0.75, '#03045e');
      winGrad.addColorStop(0.76, '#2b2622'); // Fondo marino expuesto (arrecifes y bancos de arena secos)
      winGrad.addColorStop(1, '#1e1b18');
      ctx.fillStyle = winGrad; ctx.fillRect(wx, lobbyCeil + 20, 60, 80);

      // Relámpago distante en el ventanal
      if (frame % 180 < 4) {
        ctx.fillStyle = 'rgba(230, 210, 255, 0.45)';
        ctx.fillRect(wx, lobbyCeil + 20, 60, 80);
      }

      // Marcos y maineles de bronce y acero
      ctx.fillStyle = '#475569';
      ctx.fillRect(wx + 29, lobbyCeil + 20, 2, 80);
      ctx.fillRect(wx, lobbyCeil + 55, 60, 2);
      ctx.fillRect(wx, lobbyCeil + 75, 60, 2);
    }
  }

  // 4. Moldura inferior de boiserie y madera de teca
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(left, 174, width, 46);
  ctx.fillStyle = '#b57639'; ctx.fillRect(left, 172, width, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, 175, width, 1);

  // 5. Friso superior dorado bajo el techo
  ctx.fillStyle = '#583110'; ctx.fillRect(left, lobbyCeil, width, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, lobbyCeil + 7, width, 1.5);
  for (let fx = Math.floor(left / 16) * 16; fx < right; fx += 16) {
    ctx.fillStyle = '#f8f9fa'; ctx.fillRect(fx + 6, lobbyCeil + 2, 4, 3);
  }

  // 5. Columnas monumentales de mármol blanco con capiteles dorados
  const columns = [13460, 13580, 13700, 13820, 13940, 14030];
  for (const cx of columns) {
    if (cx + 14 >= left && cx - 14 <= right) {
      ctx.fillStyle = '#adb5bd'; ctx.fillRect(cx - 7, lobbyCeil + 6, 14, lobbyFloor - lobbyCeil - 6);
      ctx.fillStyle = '#f8f9fa'; ctx.fillRect(cx - 5, lobbyCeil + 8, 10, lobbyFloor - lobbyCeil - 10);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 2, lobbyCeil + 8, 4, lobbyFloor - lobbyCeil - 10);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 8, lobbyCeil + 7, 16, 5);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 6, lobbyCeil + 8, 12, 2);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 8, lobbyFloor - 10, 16, 10);
      ctx.fillStyle = '#583110'; ctx.fillRect(cx - 6, lobbyFloor - 8, 12, 8);

      // Aplique de pared con luz cálida
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 2, 128, 4, 6);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 1, 129, 2, 3);
      ctx.fillStyle = 'rgba(255, 235, 120, 0.18)'; ctx.beginPath();
      ctx.moveTo(cx, 134); ctx.lineTo(cx - 16, lobbyFloor); ctx.lineTo(cx + 16, lobbyFloor);
      ctx.closePath(); ctx.fill();
    }
  }

  // 6. Mural dorado "TORRE CENTRAL BAHIA" sobre la recepcion
  const muralX = 13625;
  if (muralX + 50 >= left && muralX <= right) {
    ctx.fillStyle = '#1d3557'; ctx.fillRect(muralX - 1, 88, 52, 22);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(muralX, 89, 50, 20);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(muralX + 2, 90, 46, 1); ctx.fillRect(muralX + 2, 107, 46, 1);
    ctx.beginPath(); ctx.arc(muralX + 25, 99, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.fillRect(muralX + 10, 102, 30, 2);
  }

  // 7. Alfombra roja de gala sobre el suelo de marmol
  const carpetL = Math.max(13465, left), carpetR = Math.min(14010, right);
  if (carpetR > carpetL) {
    ctx.fillStyle = '#c1121f'; ctx.fillRect(carpetL, lobbyFloor - 3, carpetR - carpetL, 3);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(carpetL, lobbyFloor - 4, carpetR - carpetL, 1);
    ctx.fillRect(carpetL, lobbyFloor, carpetR - carpetL, 1);
  }
}
