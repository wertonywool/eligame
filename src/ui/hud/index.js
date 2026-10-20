// ============================================================================
// HUD: ORQUESTADOR PRINCIPAL
// ============================================================================
function drawTutorialSigns() {
  // Desactivado: los carteles flotantes tapaban la pantalla
}

function drawHUD() {
  hudPhaseButtons = [];
  drawHUDStatus();
  drawHUDBosses();
  drawGamepadHUDPrompt();
  if (typeof drawSamiQuestHUD === 'function') {
    drawSamiQuestHUD(ctx);
  }
  if (typeof drawKaiQuestHUD === 'function') {
    drawKaiQuestHUD(ctx);
  }
  if (typeof drawEarthquakePreludeBanner === 'function') {
    drawEarthquakePreludeBanner(ctx);
  }
  if (typeof drawRaulFrogHUD === 'function') {
    drawRaulFrogHUD(ctx);
  }
  if (typeof drawShovelHUD === 'function') {
    drawShovelHUD(ctx, 10, 34);
  }
  if (typeof drawIcePickHUD === 'function') {
    drawIcePickHUD(ctx, 10, 34);
  }
}
