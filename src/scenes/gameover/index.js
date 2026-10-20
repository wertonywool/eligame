// ============================================================================
// PANTALLA DE FIN DE PARTIDA (GAME OVER)
// ============================================================================
// Paleta unificada: Negro Obsidiana, Blanco Puro y Rosado Oscuro
// Cero emojis, cero textos desbordados, 100% responsive.

function drawGameOverScreen() {
  // Fondo oscuro que cubre todo el gameplay
  ctx.fillStyle = 'rgba(7, 2, 10, 0.92)';
  ctx.fillRect(0, 0, W, H);

  const pw = 330;
  const ph = 196;
  const px = Math.round(W / 2 - pw / 2);
  const py = Math.round(H / 2 - ph / 2);

  // Panel central en Obsidiana con Borde Rosado Oscuro
  drawRoundedPanel(px, py, pw, ph, 12, 'rgba(18, 5, 22, 0.98)', '#b31b52', 2);

  // Ribete interior decorativo
  ctx.strokeStyle = 'rgba(255, 202, 212, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 4, py + 4, pw - 8, ph - 8);

  // Icono Pixel Art de Corazón Roto
  drawPixelBrokenHeart(W / 2, py + 26);

  // Título Nítido en Blanco Puro
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('FIN DE LA PARTIDA', W / 2, py + 52);

  // Subtítulo en Rosado Suave
  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText('Elizabeth ha caído en el laberinto...', W / 2, py + 66);

  // Tarjeta de Punto de Control (Evita cualquier desborde de texto)
  const savedCp = saveState.activeCheckpoints && saveState.activeCheckpoints[level.id];
  const cw = 270;
  const ch = 38;
  const cx = Math.round(W / 2 - cw / 2);
  const cy = py + 78;

  drawRoundedPanel(cx, cy, cw, ch, 8, 'rgba(9, 2, 12, 0.94)', '#8f143c', 1.2);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('PUNTO DE REAPARICIÓN', W / 2, cy + 13);

  let cpName = savedCp ? savedCp.name : 'Inicio del nivel';
  cpName = cpName.replace(/^Checkpoint\s*#?\d*:\s*/i, '');
  if (cpName.length > 30) {
    cpName = cpName.slice(0, 28) + '...';
  }
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(cpName, W / 2, cy + 28);

  // Botón Reintentar con Brillo de Pulso
  const bw = 160;
  const bh = 28;
  const bx = Math.round(W / 2 - bw / 2);
  const by = py + 126;
  const pulse = Math.sin(globalFrame * 0.08) > 0;

  drawRoundedPanel(bx, by, bw, bh, 6, '#8f143c', pulse ? '#ffffff' : '#b31b52', 1.5);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('▶ REINTENTAR', W / 2, by + 18);

  // Mensaje inferior de control
  ctx.fillStyle = '#ffcad4';
  ctx.font = `6.5px ${UI_FONT}`;
  const promptText = gamepadConnected ? '[A] Continuar' : 'Toca la pantalla o presiona [ESPACIO]';
  ctx.fillText(promptText, W / 2, py + ph - 12);

  ctx.textAlign = 'left';
}
