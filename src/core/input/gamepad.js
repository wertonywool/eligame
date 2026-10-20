// Eventos de conexión de mando (Xbox, PlayStation, Switch, Genéricos)
window.addEventListener('gamepadconnected', e => {
  gamepadConnected = true;
  gamepadName = cleanGamepadName(e.gamepad.id);
  showGamepadToast(`🎮 ¡MANDO CONECTADO: ${gamepadName}!`);
  document.getElementById('touch-controls')?.classList.add('gamepad-active');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  rumbleGamepad(180, 0.4, 0.7);
});

window.addEventListener('gamepaddisconnected', () => {
  gamepadConnected = false;
  showGamepadToast('🎮 Mando desconectado');
  document.getElementById('touch-controls')?.classList.remove('gamepad-active');
});

window.addEventListener('touchstart', () => {
  document.getElementById('touch-controls')?.classList.remove('gamepad-active');
}, { passive: true });


function drawGamepadMenuCursor() {
  if (!gamepadConnected) return;
  if (!menuButtons || menuButtons.length === 0) return;
  if (selectedMenuIndex >= menuButtons.length) selectedMenuIndex = 0;
  const b = menuButtons[selectedMenuIndex];
  if (!b) return;

  const pulse = Math.sin(globalFrame * 0.22) * 1.5;
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(b.x - 2 - pulse, b.y - 2 - pulse, b.w + 4 + pulse * 2, b.h + 4 + pulse * 2);
  ctx.restore();
}

function pollGamepad(dt) {
  if (!navigator.getGamepads) return;

  const gamepads = navigator.getGamepads();
  let pad = null;
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && gamepads[i].connected) {
      pad = gamepads[i];
      break;
    }
  }

  if (!pad) {
    if (gamepadConnected) {
      gamepadConnected = false;
      showGamepadToast('🎮 Mando desconectado');
      document.getElementById('touch-controls')?.classList.remove('gamepad-active');
    }
    gamepadMovement.left = false;
    gamepadMovement.right = false;
    gamepadMovement.jump = false;
    return;
  }

  if (!gamepadConnected) {
    gamepadConnected = true;
    gamepadName = cleanGamepadName(pad.id);
    showGamepadToast(`🎮 ¡MANDO CONECTADO: ${gamepadName}!`);
    document.getElementById('touch-controls')?.classList.add('gamepad-active');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    rumbleGamepad(160, 0.4, 0.6);
  }

  const btnCount = pad.buttons.length;
  const isBtnDown = idx => (idx < btnCount && pad.buttons[idx].pressed);
  const isBtnJustPressed = idx => (idx < btnCount && pad.buttons[idx].pressed && !prevGamepadButtons[idx]);

  // Ejes del stick izquierdo con zona muerta
  const axisX = (pad.axes && pad.axes.length > 0) ? pad.axes[0] : 0;
  const axisY = (pad.axes && pad.axes.length > 1) ? pad.axes[1] : 0;
  const deadzone = 0.25;
  const stickLeft = axisX < -deadzone;
  const stickRight = axisX > deadzone;
  const stickUp = axisY < -deadzone;
  const stickDown = axisY > deadzone;

  // D-Pad standard mapping
  const dpadUp = isBtnDown(12);
  const dpadDown = isBtnDown(13);
  const dpadLeft = isBtnDown(14);
  const dpadRight = isBtnDown(15);

  const moveLeft = stickLeft || dpadLeft;
  const moveRight = stickRight || dpadRight;

  if (menuNavCooldown > 0) menuNavCooldown -= dt;

  // Si se detecta cualquier pulsación en el mando, asegurar que se atenúen los controles táctiles
  if (moveLeft || moveRight || isBtnDown(0) || isBtnDown(1) || isBtnDown(2) || isBtnDown(3)) {
    document.getElementById('touch-controls')?.classList.add('gamepad-active');
  }

  // =========================================================================
  // MODO 1: NAVEGACIÓN EN MENÚS (TITLE, WORLD_MAP, SHOP)
  // =========================================================================
  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    if (menuButtons.length > 0) {
      if (selectedMenuIndex >= menuButtons.length) selectedMenuIndex = 0;
      if (selectedMenuIndex < 0) selectedMenuIndex = menuButtons.length - 1;

      if (menuNavCooldown <= 0) {
        if (moveRight || stickDown || dpadDown) {
          selectedMenuIndex = (selectedMenuIndex + 1) % menuButtons.length;
          menuNavCooldown = 0.20;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        } else if (moveLeft || stickUp || dpadUp) {
          selectedMenuIndex = (selectedMenuIndex - 1 + menuButtons.length) % menuButtons.length;
          menuNavCooldown = 0.20;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        }
      }

      if (isBtnJustPressed(0) || isBtnJustPressed(2) || isBtnJustPressed(9)) {
        rumbleGamepad(70, 0.3, 0.4);
        if (menuButtons[selectedMenuIndex] && menuButtons[selectedMenuIndex].action) {
          menuButtons[selectedMenuIndex].action();
        }
      }
    }

    if (isBtnJustPressed(1)) {
      rumbleGamepad(50, 0.2, 0.2);
      if (gameState === 'SHOP' || gameState === 'WORLD_MAP') {
        gameState = 'TITLE';
        selectedMenuIndex = 0;
        if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
      }
    }
  }

  // =========================================================================
  // MODO 2: DIÁLOGOS
  // =========================================================================
  else if (gameState === 'DIALOGUE') {
    if (isBtnJustPressed(0) || isBtnJustPressed(1) || isBtnJustPressed(2) || isBtnJustPressed(3) || isBtnJustPressed(9)) {
      keys.jumpJustPressed = true;
      rumbleGamepad(40, 0.2, 0.2);
    }
  }

  // =========================================================================
  // MODO 3: ESCENAS DE INTERLUDIO
  // =========================================================================
  else if (gameState === 'VICTORY' || gameState === 'GAMEOVER' || gameState === 'SAFE_HOUSE') {
    if (isBtnJustPressed(0) || isBtnJustPressed(1) || isBtnJustPressed(2) || isBtnJustPressed(3) || isBtnJustPressed(9)) {
      keys.jumpJustPressed = true;
      rumbleGamepad(70, 0.3, 0.4);
    }
  }

  // =========================================================================
  // MODO 4: GAMEPLAY ACTIVO (PLAYING)
  // =========================================================================
  else if (gameState === 'PLAYING') {
    // Salto
    const jumpBtnDown = isBtnDown(0) || isBtnDown(3) || dpadUp;
    const jumpBtnJust = isBtnJustPressed(0) || isBtnJustPressed(3) || (dpadUp && !prevGamepadButtons[12]);
    if (jumpBtnJust) {
      keys.jumpJustPressed = true;
      rumbleGamepad(40, 0.1, 0.1);
    }

    // Dash (Lava Run)
    const dashBtnJust = isBtnJustPressed(2) || isBtnJustPressed(1) || isBtnJustPressed(4) || isBtnJustPressed(5) || isBtnJustPressed(6) || isBtnJustPressed(7);
    if (dashBtnJust) {
      keys.dashJustPressed = true;
      rumbleGamepad(110, 0.4, 0.2);
    }

    // Selector de Zonas / Mapa
    if (isBtnJustPressed(8)) {
      rumbleGamepad(60, 0.2, 0.2);
      openWorldMap(currentLevelIndex);
      selectedMenuIndex = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }

    // Pausa / Menú
    if (isBtnJustPressed(9)) {
      rumbleGamepad(60, 0.2, 0.2);
      gameState = 'TITLE';
      selectedMenuIndex = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }

    // Reaparición rápida en Checkpoint (L3 / R3)
    if (isBtnJustPressed(10) || isBtnJustPressed(11)) {
      if (player) {
        player.x = player.spawnX;
        player.y = player.spawnY;
        player.vx = 0;
        player.vy = 0;
        spawnFloatingText(player.x - 20, player.y - 12, '📍 REAPARICIÓN', '#00f5d4');
        rumbleGamepad(110, 0.4, 0.4);
      }
    }

    // Flecha abajo / Hablar con NPC
    const downBtnDown = stickDown || dpadDown;
    const downBtnJust = (dpadDown && !prevGamepadButtons[13]);
    if (downBtnJust) {
      keys.downJustPressed = true;
    }

    // Movimiento
    gamepadMovement.left = moveLeft;
    gamepadMovement.right = moveRight;
    gamepadMovement.down = downBtnDown;
    gamepadMovement.jump = jumpBtnDown;
  }

  // Actualizar keys combinando teclado, táctil y mando
  keys.left = keyboardState.left || touchState.left || gamepadMovement.left;
  keys.right = keyboardState.right || touchState.right || gamepadMovement.right;
  keys.down = keyboardState.down || touchState.down || gamepadMovement.down;
  keys.jumpPressed = keyboardState.jump || touchState.jump || gamepadMovement.jump;

  // Guardar estado de botones
  for (let i = 0; i < btnCount; i++) {
    prevGamepadButtons[i] = pad.buttons[i].pressed;
  }
}