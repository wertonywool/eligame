// ============================================================================
// MADRIGUERA DE ELIZABETH: ENTORNO Y HABITACIÓN FAMILIAR
// ============================================================================
function drawSafeHouseRoom() {
  // Fondo de madera profunda de la madriguera
  ctx.fillStyle = '#180c10';
  ctx.fillRect(0, 0, W, H);

  // Pared acogedora con moldura rosada oscura
  ctx.fillStyle = '#261219';
  ctx.fillRect(24, 20, W - 48, 196);
  ctx.strokeStyle = '#6e1233';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 20, W - 48, 196);

  // Piso de tablones y alfombra borgoña
  ctx.fillStyle = '#16080d';
  ctx.fillRect(24, 214, W - 48, 36);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(110, 214, 240, 8);

  // Cuadro decorativo del Lirio de Dexter en la pared
  ctx.fillStyle = '#0a0307';
  ctx.fillRect(215, 48, 46, 46);
  ctx.strokeStyle = '#b31b52';
  ctx.strokeRect(215, 48, 46, 46);
  window.sprites.drawWildLily(ctx, 236, 84, 0);

  // Portal de llegada (izquierda) y Portal hacia el siguiente nivel (derecha)
  window.sprites.drawPortal(ctx, 58, 192, globalFrame, 0.85);
  window.sprites.drawPortal(ctx, houseState.portalX, houseState.portalY, globalFrame, 1.0);
}
