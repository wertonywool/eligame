// ============================================================================
// HOMELANDER AI, HAZ LÁSER Y SECUENCIA DE CRISTALES (FASE 3)
// ============================================================================
function getHomelanderLaserEndY(beamCenterX, startY, defaultGroundY) {
  let endY = defaultGroundY;
  if (!level || !level.platforms) return endY;
  for (const p of level.platforms) {
    if (p.oneWay && p.y > startY + 8 && p.y < endY) {
      if (beamCenterX >= p.x - 4 && beamCenterX <= p.x + p.w + 4) {
        endY = p.y;
      }
    }
  }
  return endY;
}

function updateColorPadsAndPuzzle(dt) {
  if (!homelanderPuzzle || !homelanderPuzzle.active) return;

  for (const pad of colorPads) {
    if (pad.wrongFlash > 0) pad.wrongFlash -= dt;
    if (pad.cooldown > 0) pad.cooldown -= dt;

    if (homelanderPuzzle.solved) continue;

    // Colisión física con la caja del jugador
    const isOverlapping = rectOverlap(player.x, player.y, player.w, player.h, pad.x, pad.y - 14, pad.w, 16);
    const justStepped = isOverlapping && !pad.playerOverlapping;
    pad.playerOverlapping = isOverlapping;

    if (justStepped) {
      const curTargetId = homelanderPuzzle.sequence[homelanderPuzzle.currentIndex];

      if (pad.activated) {
        // Ya activado previamente, no penaliza
        spawnFloatingText(pad.x - 14, pad.y - 20, '✓ ¡Ya activado!', '#00f5d4');
      } else if (pad.id === curTargetId) {
        // ¡Paso correcto de la secuencia!
        pad.activated = true;
        homelanderPuzzle.currentIndex++;
        const step = homelanderPuzzle.currentIndex;
        window.sfx.playPatternCorrect(step);
        rumbleGamepad(90, 0.3, 0.4);
        spawnParticles(pad.x + pad.w / 2, pad.y - 6, 22, pad.hex, 90, 80);

        if (step >= homelanderPuzzle.sequence.length) {
          // ¡Todos los 7 botones activados! Escudo roto y Homelander derrotado
          homelanderPuzzle.solved = true;
          if (homelander) {
            homelander.phase = 'defeated';
            homelander.timer = 5.0;
          }
          window.sfx.playShieldBreak();
          triggerShake(0.65, 6);
          rumbleGamepad(450, 0.8, 1.0);
          if (level.babyMouse) {
            spawnParticles(level.babyMouse.x + 10, level.babyMouse.y, 40, '#ffd166', 130, 80);
            spawnParticles(level.babyMouse.x + 10, level.babyMouse.y, 35, '#00f5d4', 120, 70);
            spawnFloatingText(level.babyMouse.x - 45, level.babyMouse.y - 26, '💥 ¡ESCUDO ROTO! ¡HOMELANDER DERROTADO!', '#ffd166');
          }
          spawnFloatingText(pad.x - 18, pad.y - 24, `✨ ¡SECUENCIA COMPLETADA (${step}/${homelanderPuzzle.sequence.length})!`, '#00f5d4');
        } else {
          const nextTargetId = homelanderPuzzle.sequence[step];
          const nextPad = colorPads.find(p => p.id === nextTargetId);
          const nextName = nextPad ? nextPad.colorName : '';
          spawnFloatingText(pad.x - 16, pad.y - 22, `✨ ¡${pad.colorName} ACTIVADO! Siguiente: [${nextName}]`, pad.glowHex || pad.hex);
          if (step === 3) {
            spawnFloatingText(player.x - 32, player.y - 32, '🔥 ¡HOMELANDER AUMENTA SU VELOCIDAD!', '#ff758f');
          } else if (step === 5) {
            spawnFloatingText(player.x - 36, player.y - 32, '⚡ ¡PELIGRO! HOMELANDER ACTIVA DOBLE RÁFAGA', '#ff0055');
          }
        }
      } else {
        // Error de secuencia: pisó un botón fuera de orden (NO SE REINICIA EL PROGRESO)
        if (!pad.cooldown || pad.cooldown <= 0) {
          pad.cooldown = 1.0;
          pad.wrongFlash = 0.45;
          window.sfx.playJump(false);
          triggerShake(0.08, 1.2);
          const targetPad = colorPads.find(p => p.id === curTargetId);
          const targetName = targetPad ? targetPad.colorName : '';
          spawnFloatingText(pad.x - 28, pad.y - 24, `⚠️ ¡Este es [${pad.colorName}]! Busca el [${targetName}]`, '#ffd166');
        }
      }
    }
  }
}

function updateHomelander(dt) {
  if (!homelander) return;
  const playerCenter = player.x + player.w / 2;
  // Fase 3 abarca desde X: 3670 hasta el final del nivel (~5750)
  const playerInPhase3 = playerCenter >= 3650;
  const defaultGroundY = homelander.groundY || 220;
  const laserEndY = getHomelanderLaserEndY(homelander.x, homelander.y + 8, defaultGroundY);

  if (homelander.phase === 'defeated') {
    homelander.y -= 155 * dt;
    homelander.x += Math.sin(globalFrame * 0.25) * 2;
    if (Math.random() < 0.35) {
      spawnParticles(homelander.x, homelander.y + 8, 2, '#ffd166', 70, 90);
    }
    return;
  }

  if (!playerInPhase3) {
    // Si estás en Fase 1 o 2, Homelander flota sobre su plaza imperial esperando
    homelander.phase = 'patrol';
    homelander.timer = 1.2;
    homelander.y = 44 + Math.sin(globalFrame * 0.08) * 4;
    homelander.x += homelander.dir * 45 * dt;
    if (homelander.x >= 4500) homelander.dir = -1;
    if (homelander.x <= 4100) homelander.dir = 1;
    return;
  }

  // Dificultad Progresiva según cuántos botones seguidos del patrón de 7 colores se hayan activado
  const progress = (homelanderPuzzle && !homelanderPuzzle.solved) ? homelanderPuzzle.currentIndex : 0;
  let currentSpeed = homelander.speed || 135;
  let currentAimDuration = homelander.aimDuration || 1.10;
  let currentCooldown = homelander.cooldown || 1.40;
  let currentFireDuration = homelander.fireDuration || 0.75;
  let beamTrackingRate = 3.8; // Qué tan rápido sigue la mira al jugador mientras carga

  if (progress >= 3 && progress < 5) {
    // A partir del paso 4: Homelander se enfurece, vuela más veloz y su mira es más tenaz
    currentSpeed = 160;
    currentAimDuration = 0.90;
    currentCooldown = 1.15;
    currentFireDuration = 0.70;
    beamTrackingRate = 5.0;
  } else if (progress >= 5) {
    // Últimos botones (pasos 6 y 7): máxima furia, persecución implacable y doble ráfaga láser
    currentSpeed = 195;
    currentAimDuration = 0.72;
    currentCooldown = 0.95;
    currentFireDuration = 0.65;
    beamTrackingRate = 6.4;
  }

  homelander.timer -= dt;

  // =========================================================================
  // FASE 1: PERSECUCIÓN AÉREA ACTIVA (CHASE / PATROL)
  // Homelander NO sigue un camino fijo: VUELA DIRECTO HACIA TI Y TE ACOSA
  // =========================================================================
  if (homelander.phase === 'patrol') {
    // Flotación aérea orgánica en 2D
    const targetY = 44 + Math.sin(globalFrame * 0.1) * 6;
    homelander.y += (targetY - homelander.y) * Math.min(1, dt * 5);

    // Objetivo: Posicionarse justo encima de Mamá Ratón
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const diff = targetX - homelander.x;

    // Persecución ágil con aceleración y anticipación
    const desiredVx = Math.sign(diff) * Math.min(Math.abs(diff) * 5.2, currentSpeed * 1.3);
    homelander.vx += (desiredVx - homelander.vx) * Math.min(1, dt * 7);

    homelander.x += homelander.vx * dt;
    homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));

    // Partículas de estela de vuelo en persecución
    if (globalFrame % 5 === 0 && Math.abs(homelander.vx) > 40) {
      spawnParticles(homelander.x - Math.sign(homelander.vx) * 8, homelander.y + 12, 1, 'rgba(255, 209, 102, 0.45)', 30, 20);
    }

    // Si ya está alineado con la rata o el temporizador de patrulla expira, pasa a apuntar y cargar láser
    const isOverPlayer = Math.abs(diff) < 32;
    if (homelander.timer <= 0 || (isOverPlayer && homelander.timer < currentCooldown * 0.6)) {
      homelander.vx = 0;
      homelander.phase = 'charging';
      homelander.timer = currentAimDuration;
      homelander.burstStep = 1;
      window.sfx.playLaserWarning();

      // Taunt visual al fijar al jugador
      if (Math.random() < 0.45) {
        const taunts = ['👁️ ¡TE VEO!', '⚡ ¡LÁSER FIJADO!', '🔥 ¡NO ESCAPES!'];
        const chosen = taunts[Math.floor(Math.random() * taunts.length)];
        spawnFloatingText(homelander.x - 24, homelander.y - 12, chosen, '#ff0055');
      }
    }
  }

  // =========================================================================
  // FASE 2: CARGA Y BLOQUEO DE MIRA (CHARGING LASER)
  // ¡Homelander SIGUE PERSIGUIÉNDOTE y ajustando la mira sobre tu cabeza!
  // =========================================================================
  else if (homelander.phase === 'charging') {
    // Swoop amenazante hacia abajo
    const targetY = 52 + Math.sin(globalFrame * 0.16) * 4;
    homelander.y += (targetY - homelander.y) * Math.min(1, dt * 6);

    // MIRA ACTIVA: La mira láser sigue el movimiento del jugador
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const diff = targetX - homelander.x;
    const trackingSpeed = (homelander.burstStep === 2) ? currentSpeed * 1.25 : currentSpeed * 0.90;
    const moveX = Math.sign(diff) * Math.min(Math.abs(diff) * beamTrackingRate, trackingSpeed);
    homelander.x += moveX * dt;
    homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));

    if (Math.floor(homelander.timer * 10) % 3 === 0 && Math.random() < 0.3) {
      window.sfx.playLaserWarning();
    }

    if (homelander.timer <= 0) {
      homelander.phase = 'firing';
      homelander.timer = currentFireDuration;
      window.sfx.playLaserFire();
      triggerShake(0.35, 3.5);
      rumbleGamepad(280, 0.5, 0.75);
      scorchMarks.push({ x: homelander.x, y: laserEndY, w: homelander.beamWidth + 6, life: 3.2 });
    }
  }

  // =========================================================================
  // FASE 3: DISPARO CONTINUO (FIRING BEAM)
  // ¡El rayo abrasa el suelo y se desplaza barriendo hacia la posición del jugador!
  // =========================================================================
  else if (homelander.phase === 'firing') {
    // Barrido dinámico del rayo persiguiendo al jugador
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const sweepDiff = targetX - homelander.x;
    if (Math.abs(sweepDiff) > 8) {
      const sweepSpeed = (progress >= 5 ? 75 : 48);
      homelander.x += Math.sign(sweepDiff) * sweepSpeed * dt;
      homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));
    }

    const beamLeft = homelander.x - homelander.beamWidth / 2;
    const beamRight = homelander.x + homelander.beamWidth / 2;

    if (Math.random() < 0.75) {
      spawnParticles(homelander.x + (Math.random() - 0.5) * 16, laserEndY - 1, 2, '#ff0033', 95, 140);
    }

    // Si Mamá Ratón está refugiada DEBAJO del techo de una Glorieta Real (player.y >= laserEndY - 2), el techo bloquea el láser
    if (
      player.x + player.w > beamLeft + 3 &&
      player.x < beamRight - 3 &&
      player.y + player.h > homelander.y + 10 &&
      player.y < laserEndY - 2
    ) {
      damagePlayer(false);
    }

    if (homelander.timer <= 0) {
      if (progress >= 5 && homelander.burstStep === 1) {
        // En los últimos botones: ¡DOBLE RÁFAGA LÁSER! Re-apunta rápidamente y dispara de nuevo
        homelander.burstStep = 2;
        homelander.phase = 'charging';
        homelander.timer = 0.40;
        window.sfx.playLaserWarning();
        spawnFloatingText(homelander.x - 28, homelander.y - 14, '⚡ ¡DOBLE RÁFAGA!', '#ff0055');
      } else {
        homelander.burstStep = 1;
        homelander.phase = 'patrol';
        homelander.timer = currentCooldown;
      }
    }
  }
}


function drawHomelanderAndLaser() {
  const eyes = window.sprites.drawHomelander(ctx, homelander.x, homelander.y, homelander.phase, globalFrame);
  const defaultGroundY = homelander.groundY || 220;
  const endY = getHomelanderLaserEndY(homelander.x, eyes.eyeY, defaultGroundY);
  const beamLeft = Math.round(homelander.x - homelander.beamWidth / 2);
  const beamW = homelander.beamWidth;

  if (homelander.phase === 'charging') {
    const blink = Math.floor(globalFrame / 4) % 2 === 0;
    ctx.strokeStyle = blink ? 'rgba(255, 0, 55, 0.85)' : 'rgba(255, 117, 143, 0.45)';
    ctx.beginPath();
    ctx.moveTo(eyes.leftEyeX, eyes.eyeY);
    ctx.lineTo(beamLeft, endY);
    ctx.moveTo(eyes.rightEyeX, eyes.eyeY);
    ctx.lineTo(beamLeft + beamW, endY);
    ctx.stroke();

    ctx.fillStyle = blink ? 'rgba(255, 0, 55, 0.24)' : 'rgba(255, 0, 55, 0.09)';
    ctx.fillRect(beamLeft, eyes.eyeY, beamW, endY - eyes.eyeY);
  } else if (homelander.phase === 'firing') {
    const startY = eyes.eyeY;
    const beamH = endY - startY;
    ctx.fillStyle = 'rgba(255, 0, 55, 0.45)';
    ctx.fillRect(beamLeft - 5, startY, beamW + 10, beamH);
    ctx.fillStyle = '#ff0033';
    ctx.fillRect(beamLeft, startY, beamW, beamH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(beamLeft + 5, startY, beamW - 10, beamH);
  }
}


