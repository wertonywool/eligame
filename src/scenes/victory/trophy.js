// ============================================================================
// VICTORIA: ICONO PIXEL ART DE COPA DE VICTORIA
// ============================================================================
function drawPixelTrophy(cx, cy) {
  ctx.save();
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(cx - 6, cy - 7, 12, 6);
  ctx.fillRect(cx - 4, cy - 1, 8, 3);
  ctx.fillRect(cx - 2, cy + 2, 4, 3);
  ctx.fillRect(cx - 5, cy + 5, 10, 2);

  // Asas laterales
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(cx - 8, cy - 6, 2, 4);
  ctx.fillRect(cx + 6, cy - 6, 2, 4);

  // Brillo
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4, cy - 6, 2, 4);
  ctx.restore();
}
