// ============================================================================
// ESCENA CINEMÁTICA: ASCENSOR PANORÁMICO EXPRÉS AL PISO 100 (FASE 4)
// ============================================================================
let elevatorRideState = { active: false, timer: 0, duration: 3.6, targetX: 14490, targetY: 46, doorSlide: 0 };

function startElevatorAscentAnimation(destX = 14490, destY = 46) {
  gameState = 'ELEVATOR_RIDE';
  keys.jumpJustPressed = false;
  keys.upJustPressed = false;
  keyboardState.ArrowUp = false;
  keyboardState.KeyW = false;

  elevatorRideState = { active: true, timer: 0, duration: 3.6, targetX: destX, targetY: destY, doorSlide: 0 };
  triggerShake(0.12, 1.5);
  if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
}

function updateElevatorCutscene(dt) {
  const s = elevatorRideState;
  s.timer += dt;

  if (s.timer < 0.5) {
    s.doorSlide = Math.min(1, s.timer / 0.5);
  } else if (s.timer < 2.9) {
    s.doorSlide = 0;
    if (globalFrame % 8 === 0) triggerShake(0.04, 0.8);
  } else if (s.timer < 3.5) {
    s.doorSlide = Math.max(0, 1 - (s.timer - 2.9) / 0.6);
    if (s.timer >= 3.0 && s.timer - dt < 3.0 && window.sfx && window.sfx.playCheckpoint) {
      window.sfx.playCheckpoint();
    }
  }

  // Finalización o salto voluntario (solo tras 0.8s para evitar saltos involuntarios)
  if (s.timer >= s.duration || (s.timer >= 0.8 && keys.jumpJustPressed)) {
    keys.jumpJustPressed = false;
    player.x = s.targetX;
    player.y = s.targetY;
    player.vx = 0;
    player.vy = 0;
    cameraX = player.x - W / 2;
    cameraY = player.y - H / 2;
    gameState = 'PLAYING';
    s.active = false;
    spawnStarSparkles(player.x + 11, player.y + 12, 16, '#ffffff');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  }
}

function drawElevatorCutscene() {
  const s = elevatorRideState;
  const t = s.timer;

  // 1. Cielo crepuscular de alta altitud en ascenso
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#02040f');
  skyGrad.addColorStop(0.5, '#0a1128');
  skyGrad.addColorStop(1, '#1c2541');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Rascacielos de la ciudad cayendo a gran velocidad (Efecto panorámico exterior)
  const scrollOffset = (t * 280) % 54;
  for (let y = -60; y < H + 60; y += 40) {
    const drawY = y + scrollOffset;
    // Rascacielos izquierdo
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(W / 2 - 105, drawY, 52, 28);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(W / 2 - 85, drawY + 8, 4, 3);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(W / 2 - 75, drawY + 8, 4, 3);

    // Rascacielos derecho
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(W / 2 + 55, drawY + 10, 48, 24);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(W / 2 + 75, drawY + 15, 4, 3);
  }

  // 3. Estelas de velocidad luminosas verticales
  ctx.fillStyle = 'rgba(72, 202, 228, 0.55)';
  for (let i = 0; i < 7; i++) {
    const sx = W / 2 - 85 + i * 28;
    const sy = ((t * 440 + i * 48) % (H + 40)) - 20;
    ctx.fillRect(sx, sy, 2, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(sx, sy + 6, 2, 8);
    ctx.fillStyle = 'rgba(72, 202, 228, 0.55)';
  }

  // 4. Paredes y hueco estructural del hueco del ascensor
  ctx.fillStyle = '#070a13';
  ctx.fillRect(0, 0, 110, H);
  ctx.fillRect(W - 110, 0, 110, H);

  // Columnas de acero estructural y rieles de guía de latón
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(104, 0, 8, H);
  ctx.fillRect(W - 112, 0, 8, H);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(109, 0, 2, H);
  ctx.fillRect(W - 111, 0, 2, H);

  // 5. Suelo, barandilla de bronce y panel de la cabina
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(110, H / 2 + 32, W - 220, 24);
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(110, H / 2 + 32, W - 220, 2);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(116, H / 2 + 20, W - 232, 2);

  // 6. Pantalla digital LED: Contador de Pisos en marco Art-Deco
  const floorProgress = Math.min(1, Math.max(0, (t - 0.5) / 2.5));
  const currentFloor = Math.floor(1 + floorProgress * 99);
  const panelW = 160;
  const panelH = 34;
  const panelX = Math.round((W - panelW) / 2);
  const panelY = 18;

  drawRoundedPanel(panelX, panelY, panelW, panelH, 6, 'rgba(15, 23, 42, 0.94)', '#00b4d8', 1.8);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#caf0f8';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('ASCENSOR PANORÁMICO EXPRÉS', W / 2, panelY + 11);

  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 11px ${UI_FONT}`;
  ctx.fillText(`SUBIENDO: PISO ${currentFloor} / 100`, W / 2, panelY + 26);

  // 7. Mamá Elizabeth en la cabina
  window.sprites.drawMamaMouse(ctx, W / 2 - 11, H / 2 + 10, 'idle', globalFrame, true, 1, 1, 0, false, saveState.equippedSkin);

  // 8. Puertas correderas de cristal templado tintado
  if (s.doorSlide > 0.05) {
    const doorW = (W / 2 - 110);
    const slidePx = Math.round(s.doorSlide * doorW);

    ctx.fillStyle = 'rgba(0, 180, 216, 0.45)';
    ctx.fillRect(112, 54, slidePx, H / 2 - 20);
    ctx.fillRect(W - 112 - slidePx, 54, slidePx, H / 2 - 20);

    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 1;
    ctx.strokeRect(112, 54, slidePx, H / 2 - 20);
    ctx.strokeRect(W - 112 - slidePx, 54, slidePx, H / 2 - 20);

    // Tiradores dorados
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(112 + slidePx - 4, H / 2 - 10, 3, 20);
    ctx.fillRect(W - 112 - slidePx + 1, H / 2 - 10, 3, 20);
  }

  // 9. Subtítulo dinámico
  ctx.fillStyle = '#caf0f8';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(t >= 2.9 ? '¡LLEGANDO A LA AZOTEA (PISO 100)!' : 'ASCENDIENDO A TODA VELOCIDAD...', W / 2, H - 18);
}

if (typeof module !== 'undefined') {
  module.exports = { startElevatorAscentAnimation, updateElevatorCutscene, drawElevatorCutscene };
}
