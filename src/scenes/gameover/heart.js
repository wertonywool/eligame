// ============================================================================
// GAME OVER: ICONO PIXEL ART DE CORAZÓN ROTO
// ============================================================================
// Paleta estricta: Rosado Oscuro (#b31b52), Carmesí (#8f143c) y Blanco (#ffffff)

function drawPixelBrokenHeart(cx, cy) {
  ctx.save();
  // Mitad Izquierda (Rosado Oscuro)
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(cx - 7, cy - 6, 6, 3);
  ctx.fillRect(cx - 8, cy - 3, 7, 5);
  ctx.fillRect(cx - 7, cy + 2, 5, 3);
  ctx.fillRect(cx - 4, cy + 5, 3, 2);
  ctx.fillRect(cx - 2, cy + 7, 2, 1);

  // Mitad Derecha (Rosado Intenso)
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(cx + 2, cy - 6, 6, 3);
  ctx.fillRect(cx + 2, cy - 3, 7, 5);
  ctx.fillRect(cx + 3, cy + 2, 5, 3);
  ctx.fillRect(cx + 2, cy + 5, 3, 2);
  ctx.fillRect(cx + 1, cy + 7, 2, 1);

  // Grieta central en Blanco Puro
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 1, cy - 6, 2, 2);
  ctx.fillRect(cx, cy - 4, 2, 2);
  ctx.fillRect(cx - 2, cy - 2, 2, 2);
  ctx.fillRect(cx - 1, cy, 2, 2);
  ctx.fillRect(cx - 3, cy + 2, 2, 2);
  ctx.fillRect(cx - 1, cy + 4, 2, 3);

  // Destello superior
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(cx - 6, cy - 5, 2, 2);
  ctx.restore();
}
