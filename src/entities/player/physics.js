// ============================================================================
// MAMÁ RATÓN: COLISIONES, GÉISERES, CHECKPOINTS Y COLECCIONABLES
// ============================================================================
function updatePlayerCollisions(dt) {
  const isLavaDashing = player.dashTimer > 0;

  // Colisión Horizontal con Plataformas
  player.x += player.vx * dt;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > level.worldWidth) player.x = level.worldWidth - player.w;

  for (const p of level.platforms) {
    if (p.oneWay || p.isWater || p.subType === 'water_puddle' || p.subType === 'ocean_water' || p.subType === 'snow_bank') continue;
    if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  // Colisión con Paredes / Cascadas de Lava
  for (const lw of lavaWalls) {
    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, lw.x, lw.y, lw.w, lw.h)) {
      if (isLavaDashing) {
        if (globalFrame % 3 === 0) {
          spawnParticles(player.x + 11, player.y + 12, 5, '#ffd166', 90, -20);
        }
      } else {
        damagePlayer(false);
        player.vx = player.x < lw.x ? -130 : 130;
      }
    }
  }

  // Colisión Vertical con Plataformas
  const wasOnGround = player.onGround;
  const prevBottom = player.y + player.h;
  player.y += player.vy * dt;
  player.onGround = false;

  for (const p of level.platforms) {
    // Si Elizabeth está excavando túneles bajo el banco de nieve
    if (p.subType === 'snow_bank' && player.isDigging) {
      if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y - 12, p.w, p.h + 24)) {
        player.onGround = true;
        player.vy = 0;
        player.currentPlatform = p;
        player.jumpsLeft = 2;
      }
      continue;
    }

    if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (p.oneWay || p.isWater || p.subType === 'water_puddle') {
        if (player.vy >= 0 && prevBottom <= p.y + 16) {
          player.y = p.y - player.h;
          if (!wasOnGround && player.vy > 60) {
            player.squashX = 1.24;
            player.squashY = 0.78;
            spawnDustPuff(player.x + 11, player.y + 24, 5, getBiomeDustColor(player.x));
          }
          player.vy = 0;
          player.onGround = true;
          player.currentPlatform = p;
          player.jumpsLeft = 2;
        }
      } else {
        if (player.vy > 0) {
          player.y = p.y - player.h;
          if (!wasOnGround && player.vy > 60) {
            player.squashX = 1.24;
            player.squashY = 0.78;
            spawnDustPuff(player.x + 11, player.y + 24, 5, getBiomeDustColor(player.x));
          }
          player.vy = 0;
          player.onGround = true;
          player.currentPlatform = p;
          player.jumpsLeft = 2;
        } else if (player.vy < 0) {
          player.y = p.y + p.h;
          player.vy = 0;
        }
      }
    }
  }

  // Colisión con Géiseres Térmicos Ascendentes
  for (const g of geysers) {
    if (rectOverlap(player.x, player.y, player.w, player.h, g.x, g.y - g.boostHeight, g.w, g.boostHeight)) {
      if (player.vy > g.force * 0.75) {
        player.vy = g.force;
        player.onGround = false;
        player.jumpsLeft = 2;
        player.dashCooldown = 0;
        player.squashX = 0.75;
        player.squashY = 1.3;
        window.sfx.playGeyser();
        spawnParticles(player.x + 11, player.y + 22, 8, '#ffd166', 65, -40);
      }
    }
  }

  // Estado de animación y partículas de carrera
  if (!player.onGround) {
    player.state = 'jump';
  } else if (player.transitionTimer > 0 || (Math.abs(player.vx) >= 8 && Math.abs(player.vx) < 85)) {
    player.state = 'transition';
  } else if (Math.abs(player.vx) >= 85) {
    player.state = 'run';
    if (globalFrame % 6 === 0) {
      spawnDustPuff(
        player.facingRight ? player.x + 3 : player.x + player.w - 3,
        player.y + player.h,
        1,
        getBiomeDustColor(player.x),
        -player.vx * 0.16
      );
    }
  } else {
    player.state = 'idle';
  }

  // Caída al vacío o al fondo del volcán
  if (player.y > level.worldHeight + 30) {
    damagePlayer(true);
  }

  // Activar Checkpoints al pasar o saltar cerca de ellos
  for (const cp of checkpoints) {
    if (!cp.active && rectOverlap(player.x, player.y, player.w, player.h, cp.x - 18, cp.y - 72, 52, 82)) {
      cp.active = true;
      player.spawnX = cp.x;
      player.spawnY = cp.y - 26;
      player.lives = player.maxLives;
      if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
      saveState.activeCheckpoints[level.id] = { id: cp.id, x: cp.x, y: cp.y, name: cp.name };
      persistSave();
      window.sfx.playCheckpoint();
      spawnParticles(cp.x + 8, cp.y - 14, 22, '#00f5d4', 90, 40);
      spawnFloatingText(cp.x - 24, cp.y - 34, `✓ CHECKPOINT GUARDADO: ${cp.name}`, '#00f5d4');
    }
  }

  // Detectar cercanía a NPCs para conversar
  nearbyNpc = null;
  for (const npc of npcs) {
    if (Math.abs((player.x + 11) - (npc.x + 8)) < 32 && Math.abs((player.y + 12) - (npc.y + 8)) < 32) {
      nearbyNpc = npc;
      break;
    }
  }

  // Recolección de Quesos del Nivel
  for (const c of cheeses) {
    if (!c.collected) {
      if (saveState.upgrades.cheeseMagnet) {
        const dx = (player.x + 11) - (c.x + 6);
        const dy = (player.y + 12) - (c.y + 6);
        const dist = Math.hypot(dx, dy);
        if (dist < 68 && dist > 1) {
          c.x += (dx / dist) * 165 * dt;
          c.y += (dy / dist) * 165 * dt;
        }
      }
      if (rectOverlap(player.x, player.y, player.w, player.h, c.x, c.y, 12, 12)) {
        c.collected = true;
        c.collectedThisRun = true;
        score += 100;
        window.sfx.playCheese();
        spawnParticles(c.x + 6, c.y + 6, 12, '#ffd166', 75, 90);
        spawnStarSparkles(c.x + 6, c.y + 6, 8, '#ffe169');
        triggerShake(0.08, 1.2);
        const currentCollected = cheeses.filter(ch => ch.collected).length;
        spawnFloatingText(c.x - 6, c.y - 4, `QUESO ${currentCollected}/${cheeses.length}`, '#ffe169');
      }
    }
  }

  // Actualizar y recolectar Lirios de Dexter físicos
  updateDroppedLilies(dt);

  // Colisión con Pinchos / Pozos de Lava
  for (const s of (level.spikes || [])) {
    if (rectOverlap(player.x + 4, player.y + 6, player.w - 8, player.h - 6, s.x, s.y, s.w, 12)) {
      if (!isLavaDashing) {
        damagePlayer(s.w > 200);
      }
    }
  }



  // Verificar llegada al Hijo Ratón
  const bm = level.babyMouse;
  if (bm && rectOverlap(player.x, player.y, player.w, player.h, bm.x - 6, bm.y - 6, 24, 24)) {
    if (bm.requiresBossDefeat && omniMen.length > 0) {
      if (globalFrame % 35 === 0) {
        window.sfx.playHurt();
        spawnFloatingText(bm.x - 45, bm.y - 20, '¡DERROTA A OMNI-MAN (5 HP) PARA LIBERARLO!', '#ff2a55');
      }
    } else if (bm.requiresPuzzle && homelanderPuzzle && !homelanderPuzzle.solved) {
      if (globalFrame % 35 === 0) {
        window.sfx.playPatternWrong();
        spawnFloatingText(bm.x - 55, bm.y - 20, '¡ESCUDO FLORAL ACTIVO! PISA LOS 5 BOTONES', '#ff758f');
      }
    } else if (level.id === 4 && typeof astralBossState !== 'undefined' && astralBossState && !astralBossState.isDefeated) {
      if (globalFrame % 35 === 0) {
        if (window.sfx && window.sfx.playLaserWarning) window.sfx.playLaserWarning();
        spawnFloatingText(bm.x - 55, bm.y - 20, '¡DERROTA AL DRAGON ASTRAL PARA LIBERARLO!', '#ffd166');
      }
    } else {
      player.vx = 0;
      player.dashTimer = 0;
      player.state = 'idle';
      player.facingRight = true;

      const newlyDiscovered = cheeses.filter(c => c.collectedThisRun && !c.permanentlySaved);
      if (newlyDiscovered.length > 0) {
        saveState.bankCheeses += newlyDiscovered.length;
        spawnFloatingText(bm.x - 36, bm.y - 22, `¡+${newlyDiscovered.length} QUESOS NUEVOS GUARDADOS EN EL BANCO!`, '#ffd166');
      }
      if (!saveState.collectedCheeseIds) saveState.collectedCheeseIds = {};
      saveState.collectedCheeseIds[level.id] = cheeses.filter(c => c.collected).map(c => c.id);

      if (saveState.activeCheckpoints && saveState.activeCheckpoints[level.id]) {
        delete saveState.activeCheckpoints[level.id];
      }
      persistSave();

      activeDialogueList = bm.dialogues;
      dialogueIndex = 0;
      dialogueCharIndex = 0;
      dialogueMode = 'BABY';
      gameState = 'DIALOGUE';
      window.sfx.playCheese();
      spawnParticles(bm.x + 8, bm.y + 4, 20, '#ff8fab', 85, 70);
    }
  }
}
