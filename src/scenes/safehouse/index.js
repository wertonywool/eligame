// ============================================================================
// ESCENA DE LA MADRIGUERA: RATONCITOS, MAMÁ RATÓN Y PANEL DE HISTORIA
// ============================================================================
function drawSafeHouseScene() {
  drawSafeHouseRoom();

  // Dibujar los hijos ratones rescatados
  const count = saveState.rescuedBabies.length;
  for (let i = 0; i < count; i++) {
    const babyId = saveState.rescuedBabies[i];
    const bx = 165 + i * 36;
    const by = 194;
    window.sprites.drawBabyMouse(ctx, bx, by, globalFrame, babyId);
  }

  // Mamá Ratón en su casa
  const mamaState = houseState.phase === 'entering_next' ? 'run' : 'idle';
  window.sprites.drawMamaMouse(ctx, houseState.mamaX, houseState.mamaY, mamaState, globalFrame * 0.2, true, 1.15, 1.15, 0, false, saveState.equippedSkin);

  // Panel superior elegante en Obsidiana y Rosado Oscuro
  const panelW = 280;
  const panelX = Math.round(W / 2 - panelW / 2);
  const panelY = 20;
  const panelH = 50;
  drawRoundedPanel(panelX, panelY, panelW, panelH, 10, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.5);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('MADRIGUERA DE ELIZABETH', W / 2, panelY + 16);

  drawPixelBabyMouseIcon(ctx, Math.round(W / 2 - 70), panelY + 22);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`${count}/7 Hijos Rescatados`, Math.round(W / 2 - 56), panelY + 29);
  ctx.textAlign = 'center';

  if (houseState.unlockedAbilityText) {
    const cleanAbility = (houseState.unlockedAbilityText || '').split('(')[0].trim();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(`✦ PODER: ${cleanAbility} ✦`, W / 2, panelY + 41);
  }

  if (Math.floor(globalFrame / 20) % 2 === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText('▶ TOCA SALTAR O ESPACIO PARA AVANZAR ◀', W / 2, 244);
  }
  ctx.textAlign = 'left';
}
