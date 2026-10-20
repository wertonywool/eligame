// ============================================================================
// POST-PROCESAMIENTO, PARTICULAS FINALES, HUD Y PANTALLAS DE MENU
// ============================================================================

function drawMenuOrCutsceneScreen() {
  if (gameState === 'TITLE') {
    drawParallaxBackground('garden');
    drawTitleScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'WORLD_MAP') {
    drawParallaxBackground('garden');
    drawWorldMapScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SHOP') {
    drawParallaxBackground('garden');
    drawShopScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SAFE_HOUSE') {
    drawSafeHouseScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SURF_PREVIEW') {
    drawSurfPreviewScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'ARCADE_MINIGAME') {
    if (typeof drawArcadeMinigame === 'function') drawArcadeMinigame(ctx);
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KEY_ASSEMBLY') {
    if (typeof drawKeyAssemblyScene === 'function') drawKeyAssemblyScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'ELEVATOR_RIDE') {
    if (typeof drawElevatorCutscene === 'function') drawElevatorCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'TSUNAMI_CUTSCENE') {
    if (typeof drawTsunamiCutscene === 'function') drawTsunamiCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KRAKEN_INTRO') {
    if (typeof drawKrakenIntroScene === 'function') drawKrakenIntroScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KRAKEN_VICTORY_CUTSCENE') {
    if (typeof drawKrakenVictoryCutscene === 'function') drawKrakenVictoryCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  return false;
}

let cachedGlobalVignette = null;
function getCachedGlobalVignette() {
  if (!cachedGlobalVignette) {
    cachedGlobalVignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.44, W / 2, H / 2, W * 0.64);
    cachedGlobalVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    cachedGlobalVignette.addColorStop(1, 'rgba(8, 4, 16, 0.30)');
  }
  return cachedGlobalVignette;
}

function drawAtmosphericParticlesAndVignette() {
  // Particulas de impacto, salto, polvo y estrellas de 4 puntas
  for (const p of particles) {
    if (p.isDust) {
      const alpha = Math.max(0, p.life / (p.maxLife || 0.25));
      const r = Math.max(0.8, p.size * alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(Math.round(p.x), Math.round(p.y), r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.isStar) {
      const s = Math.max(1, (p.size * p.life) / (p.maxLife || 0.35));
      drawSparkleStar(ctx, Math.round(p.x), Math.round(p.y), s, p.color);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
  }

  // Particulas atmosfericas unicas por fase (Sakura en F1, Esporas en F2, Rosas en F3)
  drawDriftingSakuraPetals();
  drawDriftingLotusSpores();
  drawDriftingRosePetals();

  ctx.restore();

  // Viñeta atmosferica de foco sutil estilo Chiki's Chase para todo el juego
  ctx.fillStyle = getCachedGlobalVignette();
  ctx.fillRect(0, 0, W, H);

  // Viñeta atmosferica y cenizas en primer plano estilo Hollow Knight
  if (level.theme === 'volcano') {
    drawVolcanoForegroundAtmosphere();
  }

  // Peligro ambiental: Ventiscas heladas del Everest (Mundo 4)
  if (typeof drawBlizzardSystem === 'function') {
    drawBlizzardSystem(ctx, cameraX, globalFrame);
  }
}

function drawHUDAndOverlayScenes() {
  // HUD Y DIALOGOS
  if (gameState === 'PLAYING' || gameState === 'DIALOGUE') {
    drawHUD();
  }

  if (gameState === 'DIALOGUE') {
    drawDialogueBox();
  } else if (gameState === 'VICTORY') {
    drawVictoryScreen();
  } else if (gameState === 'GAMEOVER') {
    drawGameOverScreen();
  }

  drawGamepadToast();
  ctx.restore();
}
