// ============================================================================
// PANTALLA DE VICTORIA FINAL (NIVEL COMPLETADO)
// ============================================================================
// Paleta unificada: Negro Obsidiana, Blanco Puro y Rosado Oscuro
// Cero emojis, cero textos desbordados.

function drawVictoryScreen() {
  ctx.fillStyle = 'rgba(7, 2, 10, 0.92)';
  ctx.fillRect(0, 0, W, H);

  const pw = 330;
  const ph = 196;
  const px = Math.round(W / 2 - pw / 2);
  const py = Math.round(H / 2 - ph / 2);

  drawRoundedPanel(px, py, pw, ph, 12, 'rgba(18, 5, 22, 0.98)', '#b31b52', 2);

  ctx.strokeStyle = 'rgba(255, 202, 212, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 4, py + 4, pw - 8, ph - 8);

  drawPixelTrophy(W / 2, py + 26);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('¡NIVEL COMPLETADO!', W / 2, py + 52);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`Hijos ratoncitos a salvo: ${saveState.rescuedBabies.length}/7`, W / 2, py + 66);

  // Tarjeta de Recompensas
  const cw = 270;
  const ch = 38;
  const cx = Math.round(W / 2 - cw / 2);
  const cy = py + 78;

  drawRoundedPanel(cx, cy, cw, ch, 8, 'rgba(9, 2, 12, 0.94)', '#8f143c', 1.2);

  // Icono queso + conteo
  drawPixelCheeseIcon(ctx, cx + 24, cy + 13);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(`Banco: ${saveState.bankCheeses}`, cx + 42, cy + 23);

  // Icono lirio + conteo
  drawPixelLilyIcon(ctx, cx + 150, cy + 13);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Lirios: ${saveState.dexterLilies || 0}`, cx + 168, cy + 23);

  // Botón Continuar
  const bw = 160;
  const bh = 28;
  const bx = Math.round(W / 2 - bw / 2);
  const by = py + 126;
  const pulse = Math.sin(globalFrame * 0.08) > 0;

  drawRoundedPanel(bx, by, bw, bh, 6, '#8f143c', pulse ? '#ffffff' : '#b31b52', 1.5);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('▶ CONTINUAR', W / 2, by + 18);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `6.5px ${UI_FONT}`;
  const promptText = gamepadConnected ? '[A] Volver al Menú' : 'Toca la pantalla o presiona [ESPACIO]';
  ctx.fillText(promptText, W / 2, py + ph - 12);

  ctx.textAlign = 'left';
}
