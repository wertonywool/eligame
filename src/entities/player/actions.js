// ============================================================================
// MAMÁ RATÓN: ENTRADA, SALTO, DASH Y PARTÍCULAS DE SKINS
// ============================================================================
function updatePlayerMovement(dt) {
  player.squashX += (1 - player.squashX) * Math.min(1, dt * 14);
  player.squashY += (1 - player.squashY) * Math.min(1, dt * 14);

  if (player.invulnTimer > 0) player.invulnTimer -= dt;
  if (player.dashCooldown > 0) player.dashCooldown -= dt;

  // Bloqueo dramático de controles durante la sorpresa sísmica en la azotea (signo !!! y mirada a los lados)
  if (typeof isRooftopTremorLocked === 'function' && isRooftopTremorLocked()) {
    player.vx = 0;
    keys.left = false;
    keys.right = false;
    keys.jump = false;
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    keys.downJustPressed = false;
    player.state = 'idle';
    return;
  }

let cachedDashBtn = null;
function getDashBtn() {
  if (!cachedDashBtn) cachedDashBtn = document.getElementById('btn-dash');
  return cachedDashBtn;
}

  // Detección de contacto con agua (Charcos de Marea, Olas y Tubos de Surf)
  let inWater = false;
  let activeWaterPlat = null;
  if (level && level.platforms) {
    const feetX = player.x + player.w / 2;
    const feetY = player.y + player.h;
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if ((p.subType === 'water_puddle' || p.isWater || p.subType === 'ocean_water' || p.subType === 'tsunami_barrel_wave') &&
          feetX >= p.x && feetX <= p.x + p.w &&
          feetY >= p.y - 4 && feetY <= p.y + p.h + 8) {
        inWater = true;
        activeWaterPlat = p;
        break;
      }
    }
  }
  // El oleaje del remolino inunda la arena de combate contra el Kraken
  const kBoss = window.krakenBossState || (typeof krakenBossState !== 'undefined' ? krakenBossState : null);
  if (kBoss && kBoss.active) {
    inWater = true;
  }

  player.inWater = inWater;
  player.isSurfing = inWater && player.ability === 'surf';

  // Impulso y aceleración por corrientes hidrodinámicas de gran velocidad
  if (player.isSurfing && activeWaterPlat && activeWaterPlat.boostCurrent) {
    if (player.facingRight && player.vx < 280) {
      player.vx = Math.min(310, player.vx + dt * 550);
    }
    if (globalFrame % 2 === 0) {
      const trailX = player.x + (player.facingRight ? -4 : 26);
      spawnParticles(trailX, player.y + 21, 2, '#00f5d4', 60, -18);
    }
  }

  // Salpicaduras y spray continuo mientras se surfea en el agua
  if (player.isSurfing && Math.abs(player.vx) > 20 && globalFrame % 3 === 0) {
    const sprayX = player.x + (player.facingRight ? -2 : 24);
    spawnParticles(sprayX, player.y + 21, 2, '#ffffff', 45, -20);
    spawnParticles(sprayX, player.y + 22, 2, '#caf0f8', 35, -12);
    if (Math.abs(player.vx) > 120 && Math.random() > 0.4) {
      spawnParticles(sprayX, player.y + 19, 1, '#90e0ef', 50, -26);
    }
  }

  // Actualizar estado visual del botón táctil de Dash
  const dashBtn = getDashBtn();
  if (dashBtn) {
    if (player.ability === 'lava_run') {
      if (player.dashCooldown > 0) dashBtn.classList.add('cooldown');
      else dashBtn.classList.remove('cooldown');
    } else if (player.ability === 'surf') {
      if (player.inWater && player.dashCooldown <= 0) dashBtn.classList.remove('cooldown');
      else dashBtn.classList.add('cooldown');
    } else if (player.ability === 'shovel' || player.ability === 'ice_pick') {
      dashBtn.classList.remove('cooldown');
    }
  }

  // Ejecución de Habilidad Especial: LAVA RUN (Dash Oscuro de Magma)
  if (keys.dashJustPressed && player.ability === 'lava_run' && player.dashCooldown <= 0 && player.dashTimer <= 0) {
    player.dashTimer = 0.22;
    player.dashCooldown = saveState.upgrades.fastDash ? 0.55 : 0.82;
    player.vy = 0;
    player.vx = (player.facingRight ? 1 : -1) * 340;
    window.sfx.playLavaDash();
    triggerShake(0.12, 2);
    rumbleGamepad(110, 0.4, 0.2);
    spawnParticles(player.x + 11, player.y + 12, 10, '#b31b52', 110, 10);
    spawnParticles(player.x + 11, player.y + 12, 6, '#ff2a70', 130, 15);
    spawnParticles(player.x + 11, player.y + 12, 4, '#ffcad4', 140, 20);
    spawnParticles(player.x + 11, player.y + 12, 8, '#07020a', 90, 0);
  }

  // Ejecución de Habilidad Especial: TABLA DE SURF (Water Dash en Charcos/Agua)
  if (keys.dashJustPressed && player.ability === 'surf' && player.dashCooldown <= 0 && player.dashTimer <= 0) {
    if (player.inWater) {
      player.dashTimer = 0.28;
      player.dashCooldown = saveState.upgrades.fastDash ? 0.45 : 0.68;
      player.vy = 0;
      player.vx = (player.facingRight ? 1 : -1) * 390;
      if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
      triggerShake(0.1, 2.0);
      rumbleGamepad(90, 0.35, 0.4);
      spawnParticles(player.x + 11, player.y + 21, 14, '#ffffff', 150, -45);
      spawnParticles(player.x + 11, player.y + 22, 10, '#caf0f8', 130, -30);
      spawnParticles(player.x + 11, player.y + 22, 8, '#48cae4', 110, -20);
      spawnParticles(player.x + 11, player.y + 23, 6, '#0077b6', 90, -15);
      spawnFloatingText(player.x - 4, player.y - 10, '¡WATER DASH!', '#caf0f8');
    } else {
      spawnFloatingText(player.x - 6, player.y - 10, '¡SOLO EN AGUA!', '#ff75a0');
    }
  }

  const isDashing = player.dashTimer > 0;

  if (isDashing) {
    player.dashTimer -= dt;
    player.vy = 0;
    const dashSpeed = player.ability === 'surf' ? 390 : 340;
    player.vx = (player.facingRight ? 1 : -1) * dashSpeed;

    if (player.ability === 'surf') {
      // Estela marina violenta de espuma blanca, spray y turquesa
      if (globalFrame % 2 === 0) {
        const trailX = player.x + (player.facingRight ? -6 : 28);
        spawnParticles(trailX, player.y + 21, 4, '#ffffff', 80, -35);
        spawnParticles(trailX, player.y + 22, 3, '#caf0f8', 65, -25);
        spawnParticles(trailX, player.y + 23, 2, '#00b4d8', 50, -15);
      }
    } else {
      // Rastro de sombra y llamas rosas (Lava Run)
      if (globalFrame % 2 === 0) {
        afterimages.push({
          x: player.x,
          y: player.y,
          facingRight: player.facingRight,
          alpha: 0.75,
          isLavaDash: true
        });
        spawnParticles(player.x + 11, player.y + 14, 2, '#ff2a70', 40, -20);
        spawnParticles(player.x + 11, player.y + 14, 1, '#b31b52', 30, -10);
      }
    }
  } else {
    // Movimiento horizontal normal con transición suave
    const targetDir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    if (targetDir !== 0) {
      if (Math.abs(player.vx) < 25 || (targetDir > 0 !== player.facingRight)) {
        player.transitionTimer = 0.085;
      }
      player.facingRight = targetDir > 0;
      player.vx += (targetDir * player.speed - player.vx) * Math.min(1, dt * 13);
      if (Math.abs(player.vx - targetDir * player.speed) < 6) {
        player.vx = targetDir * player.speed;
      }
      player.animFrame += dt * 11;
    } else {
      if (Math.abs(player.vx) > 65) {
        player.transitionTimer = 0.075;
      }
      player.vx *= Math.pow(0.0005, dt);
      if (Math.abs(player.vx) < 5) player.vx = 0;
      player.animFrame += dt * 4;
    }

    if (player.transitionTimer > 0) player.transitionTimer -= dt;

    // Coyote Time y Jump Buffer
    if (player.onGround) player.coyoteTimer = 0.11;
    else player.coyoteTimer -= dt;

    if (keys.jumpJustPressed) player.jumpBufferTimer = 0.12;
    else player.jumpBufferTimer -= dt;

    // Verificar si el jugador presiona FLECHA ABAJO junto a un NPC para hablar
    if (keys.downJustPressed && nearbyNpc && player.onGround) {
      keys.downJustPressed = false;
      keys.down = false;
      player.vx = 0;
      player.state = 'idle';
      let lines = null;
      if (typeof nearbyNpc.getLines === 'function') {
        lines = nearbyNpc.getLines();
      } else if (typeof getNpcDynamicLines === 'function') {
        lines = getNpcDynamicLines(nearbyNpc);
      }
      if (!lines || lines.length === 0) {
        lines = nearbyNpc.lines || nearbyNpc.dialogue || [];
      }
      activeDialogueList = lines.map(t => (typeof t === 'string' ? { speaker: nearbyNpc.name, text: t } : Object.assign({ speaker: nearbyNpc.name }, t)));
      activeNpc = nearbyNpc;
      dialogueIndex = 0;
      dialogueCharIndex = 0;
      dialogueMode = 'NPC';
      gameState = 'DIALOGUE';
      window.sfx.playCheese();
      keys.jumpJustPressed = false;
      keys.dashJustPressed = false;
      keys.downJustPressed = false;
      return;
    }

    // Salto y Doble Salto
    if (player.jumpBufferTimer > 0) {
      if (player.coyoteTimer > 0) {
        const isLaunchRamp = (player.currentPlatform && player.currentPlatform.launchRamp);
        player.vy = isLaunchRamp ? (player.jumpForce * 1.34) : player.jumpForce;
        if (isLaunchRamp) {
          player.vx = Math.max(player.vx, 290);
          player.trailTimer = 0.35;
          spawnStarSparkles(player.x + 11, player.y + 20, 8, '#00f5d4');
        }
        player.onGround = false;
        player.coyoteTimer = 0;
        player.jumpBufferTimer = 0;
        player.jumpsLeft = 1;
        player.squashX = 0.78;
        player.squashY = 1.24;
        window.sfx.playJump(isLaunchRamp);
        spawnDustPuff(player.x + 11, player.y + 24, 4, getBiomeDustColor(player.x));
      } else if (player.jumpsLeft > 0) {
        player.vy = player.jumpForce * 0.92;
        player.jumpsLeft--;
        player.jumpBufferTimer = 0;
        player.squashX = 1.28;
        player.squashY = 0.76;
        player.trailTimer = 0.24;
        window.sfx.playJump(true);
        spawnStarSparkles(player.x + 11, player.y + 20, 6, '#ffffff');
        spawnDustPuff(player.x + 11, player.y + 20, 3, '#ff8fab');
      }
    }

    // Gravedad con soporte de Baja Gravedad Cósmica (Mundo 4 • Fases 8 y 9) y Pluma de Dexter
    const isCosmicSpace = (level.id === 4 && player.x >= 33000);
    const baseGravity = isCosmicSpace ? player.gravity * 0.54 : player.gravity;
    const isGliding = !player.onGround && player.vy > 10 && keys.jumpPressed && saveState.upgrades.featherFall;
    const effectiveGravity = isGliding ? baseGravity * 0.42 : baseGravity;
    player.vy += effectiveGravity * dt;
    const maxFall = isGliding ? 140 : (isCosmicSpace ? 280 : 420);
    if (player.vy > maxFall) player.vy = maxFall;
    if (isGliding && globalFrame % 6 === 0) {
      spawnStarSparkles(player.x + 11, player.y + 22, 1, '#ffccd5');
    } else if (isCosmicSpace && !player.onGround && globalFrame % 5 === 0) {
      spawnStarSparkles(player.x + 11, player.y + 22, 1, '#00ffff');
    }
  }

  // Estela de doble salto
  if (player.trailTimer > 0) {
    player.trailTimer -= dt;
    if (globalFrame % 2 === 0) {
      afterimages.push({
        x: player.x,
        y: player.y,
        facingRight: player.facingRight,
        alpha: 0.45,
        isLavaDash: false
      });
    }
  }

  // Estelas y efectos cosméticos pasivos según la Skin equipada
  if ((Math.abs(player.vx) > 30 || !player.onGround) && globalFrame % 6 === 0) {
    const sk = saveState.equippedSkin;
    const px = player.x + (player.facingRight ? 4 : 18);
    const py = player.y + 16;
    if (sk === 'rick_prime') {
      spawnParticles(px, py - 2, 2, Math.random() > 0.5 ? '#00f5d4' : '#55ff99', 32, -18);
      if (Math.random() > 0.5) spawnParticles(px, py - 6, 1, '#22c55e', 22, -10);
    } else if (sk === 'homelander') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ff0033' : '#ffd700', 30, -18);
      if (Math.random() > 0.6) spawnParticles(px, py - 8, 1, '#ff4d4d', 22, -12);
      if (Math.random() > 0.7) spawnParticles(px + 4, py - 2, 1, '#ffffff', 18, -8);
    } else if (sk === 'peacemaker') {
      spawnParticles(px, py - 3, 1, Math.random() > 0.4 ? '#ffffff' : '#e2e8f0', 25, -14);
      if (Math.random() > 0.5) spawnParticles(px, py - 6, 1, '#facc15', 20, -10);
      if (Math.random() > 0.7) spawnParticles(px - 4, py - 2, 1, '#94a3b8', 18, -8);
    } else if (sk === 'ivan_alien_stage') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ef4444' : '#18181b', 26, -16);
      if (Math.random() > 0.6) spawnParticles(px, py - 8, 1, '#27272a', 18, -10);
      if (Math.random() > 0.7) spawnParticles(px + 4, py - 2, 1, '#ffffff', 20, -12);
    } else if (sk === 'abaddon_hotel') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ff0055' : '#7c3aed', 28, -20);
      if (Math.random() > 0.5) spawnParticles(px, py - 8, 1, '#11071f', 20, -12);
      if (Math.random() > 0.6) spawnParticles(px + 4, py - 2, 1, '#c084fc', 22, -14);
      if (Math.random() > 0.75) spawnParticles(px - 3, py - 6, 1, '#ff1744', 18, -10);
    } else if (sk === 'sakura') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#ff8fab' : '#ffffff', 22, -15);
    } else if (sk === 'noir') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#1a1420' : '#ff2a75', 18, -10);
    } else if (sk === 'mage') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#c77dff' : '#ffe066', 26, -20);
    } else if (sk === 'steampunk') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#e09f3e' : '#fefae0', 20, 20);
    } else if (sk === 'empress') {
      spawnParticles(px, py - 2, 1, Math.random() > 0.4 ? '#ffd700' : '#ffffff', 24, -18);
    }
  }
}
