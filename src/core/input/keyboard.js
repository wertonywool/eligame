// ============================================================================
// CONTROLES TÁCTILES, CLICS EN PANEL DE MENÚ Y TECLADO
// ============================================================================
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    keyboardState.left = true;
    keys.left = true;
  }
  if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    keyboardState.right = true;
    keys.right = true;
  }
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    keyboardState.down = true;
    if (!keys.down) keys.downJustPressed = true;
    keys.down = true;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    keyboardState.jump = true;
    if (!keys.jumpPressed) keys.jumpJustPressed = true;
    keys.jumpPressed = true;
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyX' || e.code === 'KeyK') {
    keys.dashJustPressed = true;
  }
  // Tecla Escape / M / P para abrir el mapa de mundos o retroceder
  if (e.code === 'Escape' || e.code === 'KeyM' || e.code === 'KeyP') {
    if (gameState === 'PLAYING') {
      window.sfx.playJump(false);
      openWorldMap(currentLevelIndex);
    } else if (gameState === 'WORLD_MAP') {
      window.sfx.playJump(false);
      gameState = 'TITLE';
    } else if (gameState === 'SHOP') {
      window.sfx.playJump(false);
      gameState = previousShopState || 'TITLE';
    }
  }
  // Atajos de teclado (1 a 9) para cambiar entre Fases / Checkpoints con animacion de pistola de portales
  if (level && gameState === 'PLAYING') {
    if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) return;

    function triggerPhaseTeleport(levelIdx, cpId) {
      if (gameState === 'PLAYING' && currentLevelIndex === levelIdx) {
        if (typeof startInLevelPortalTeleport === 'function') {
          startInLevelPortalTeleport(cpId);
          return;
        }
      }
      jumpToLevelPhase(levelIdx, cpId);
    }

    if (level.id === 1) {
      if (e.code === 'Digit1') triggerPhaseTeleport(0, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(0, 1);
      if (e.code === 'Digit3') triggerPhaseTeleport(0, 2);
    } else if (level.id === 2) {
      if (e.code === 'Digit1') triggerPhaseTeleport(1, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(1, 1);
      if (e.code === 'Digit3') triggerPhaseTeleport(1, 2);
      if (e.code === 'Digit4') triggerPhaseTeleport(1, 3);
      if (e.code === 'Digit5') triggerPhaseTeleport(1, 4);
    } else if (level.id === 3) {
      if (e.code === 'Digit1') triggerPhaseTeleport(2, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(2, 5);
      if (e.code === 'Digit3') triggerPhaseTeleport(2, 9);
      if (e.code === 'Digit4') triggerPhaseTeleport(2, 13);
      if (e.code === 'Digit5') triggerPhaseTeleport(2, 14);
    } else if (level.id === 4) {
      if (e.code === 'Digit1') triggerPhaseTeleport(3, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(3, 19);
      if (e.code === 'Digit3') triggerPhaseTeleport(3, 23);
      if (e.code === 'Digit4') triggerPhaseTeleport(3, 30);
      if (e.code === 'Digit5') triggerPhaseTeleport(3, 37);
      if (e.code === 'Digit6') triggerPhaseTeleport(3, 41);
      if (e.code === 'Digit7') triggerPhaseTeleport(3, 42);
      if (e.code === 'Digit8') triggerPhaseTeleport(3, 45);
      if (e.code === 'Digit9') triggerPhaseTeleport(3, 48);
    }
  }
});

window.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    keyboardState.left = false;
    keys.left = touchState.left || gamepadMovement.left;
  }
  if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    keyboardState.right = false;
    keys.right = touchState.right || gamepadMovement.right;
  }
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    keyboardState.down = false;
    keys.down = touchState.down || gamepadMovement.down;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    keyboardState.jump = false;
    keys.jumpPressed = touchState.jump || gamepadMovement.jump;
  }
});
