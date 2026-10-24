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
    if (p.broken) continue;
    if (p.oneWay || p.isWater || p.subType === 'water_puddle' || p.subType === 'ocean_water' || p.subType === 'snow_bank' || p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring' || p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') continue;
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
    if (p.broken) continue;

    // Cristal celestial de salto de gran impulso
    if ((p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring') &&
        rectOverlap(player.x, player.y, player.w, player.h, p.x - 4, p.y - 8, p.w + 8, p.h + 12)) {
      if (player.vy > -50 && prevBottom <= p.y + 16) {
        player.y = p.y - player.h;
        player.vy = -345;
        player.jumpsLeft = 2;
        player.onGround = false;
        player.squashX = 0.65;
        player.squashY = 1.45;
        if (window.sfx && window.sfx.playGeyser) window.sfx.playGeyser();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 12, '#00f5d4');
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 8, '#ffffff');
        }
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(p.x - 10, p.y - 20, '¡IMPULSO CELESTIAL!', '#00f5d4');
        }
      }
      continue;
    }

    // Loto de Cristal de Shambhala (Gran Salto Elástico y Bendición del Loto)
    if ((p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') &&
        rectOverlap(player.x, player.y, player.w, player.h, p.x - 4, p.y - 8, p.w + 8, p.h + 12)) {
      if (player.vy > -50 && prevBottom <= p.y + 16) {
        player.y = p.y - player.h;
        player.vy = -355;
        player.jumpsLeft = 2;
        player.onGround = false;
        player.squashX = 0.60;
        player.squashY = 1.48;
        if (window.sfx && window.sfx.playLotusBounce) window.sfx.playLotusBounce();
        else if (window.sfx && window.sfx.playGeyser) window.sfx.playGeyser();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 14, '#38bdf8');
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#fef08a');
        }
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(p.x - 8, p.y - 20, '¡SALTO DE LOTO!', '#38bdf8');
        }
      }
      continue;
    }

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
          // Si cae con impulso sobre un monolito o pilar quebrable
          if (p.breakable && player.vy > 130 && prevBottom <= p.y + 14) {
            const pIdx = level.platforms.indexOf(p);
            if (pIdx !== -1) {
              level.platforms.splice(pIdx, 1);
              player.vy = -230; // Rebote elástico estelar
              player.jumpsLeft = 2;
              score += 200;
              triggerShake(0.18, 2.5);
              if (window.sfx && window.sfx.playHit) window.sfx.playHit();
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 22, '#38bdf8', 110, -45);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 16, '#c084fc', 90, -35);
              spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#ffffff');
              spawnFloatingText(p.x + p.w / 2 - 20, p.y - 12, '¡PILAR DESTRUIDO! +200', '#38bdf8');
              spawnDroppedLilies(p.x + p.w / 2, p.y + p.h / 2, 3);
              continue;
            }
          }
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
        if (g.isCosmic || g.isAstral || (level && level.id === 4 && player.x >= 33000)) {
          if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
          else window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 14, '#00f5d4', 95, -50);
          spawnParticles(player.x + 11, player.y + 22, 10, '#ffd166', 80, -40);
          spawnStarSparkles(player.x + 11, player.y + 22, 10, '#ffffff');
          spawnFloatingText(g.x - 12, g.y - g.boostHeight - 12, '¡IMPULSO CÓSMICO!', '#00f5d4');
        } else if (g.isAstral || (level && level.theme === 'snow')) {
          window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 12, '#38bdf8', 85, -50);
          spawnParticles(player.x + 11, player.y + 22, 8, '#c084fc', 70, -40);
          spawnStarSparkles(player.x + 11, player.y + 22, 8, '#ffffff');
          spawnFloatingText(g.x - 10, g.y - g.boostHeight - 12, '¡IMPULSO ASTRAL!', '#38bdf8');
        } else {
          window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 8, '#ffd166', 65, -40);
        }
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

  // ============================================================================
  // MECÁNICAS ÚNICAS DECORATIVAS DE SHAMBHALA (AGUAS TERMALES, CAMPANAS, PORTAL)
  // ============================================================================
  if (level && level.decorations) {
    for (const d of level.decorations) {
      // 1. Aguas Termales de Shambhala (Curación y Purificación)
      if (d.subType === 'hot_spring' && rectOverlap(player.x, player.y, player.w, player.h, d.x, d.y - 12, 68, 20)) {
        if (globalFrame % 5 === 0) {
          spawnParticles(player.x + 11, player.y + 20, 1, '#cffafe', 40, -25);
        }
        d.healTimer = (d.healTimer || 0) + dt;
        if (d.healTimer >= 1.0) {
          d.healTimer = 0;
          if (player.lives < player.maxLives) {
            player.lives++;
            if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
            spawnParticles(player.x + 11, player.y + 12, 14, '#67e8f9', 75, -35);
            spawnStarSparkles(player.x + 11, player.y + 10, 8, '#ffffff');
            spawnFloatingText(player.x - 14, player.y - 18, '¡AGUAS TERMALES! +1 CORAZÓN', '#38bdf8');
          } else if (!d.blessedNotice) {
            d.blessedNotice = true;
            spawnFloatingText(player.x - 18, player.y - 18, '¡PURIFICACIÓN DE SHAMBHALA!', '#67e8f9');
            spawnStarSparkles(player.x + 11, player.y + 10, 6, '#fef08a');
          }
        }
      }

      // 2. Campanas Sagradas de Oración (Vibración mística, aturdimiento de bestias y puntos)
      if (d.subType === 'shambhala_prayer_bell') {
        const bellHit = rectOverlap(player.x, player.y, player.w, player.h, d.x - 12, d.y - 48, 24, 48);
        const isTriggering = bellHit && (player.isSwingingPick || player.dashTimer > 0 || Math.abs(player.vx) > 30 || player.vy > 40);
        if (isTriggering && (!d.lastRing || Date.now() - d.lastRing > 1200)) {
          d.lastRing = Date.now();
          d.ringing = 1.0;
          if (window.sfx && window.sfx.playShambhalaBell) window.sfx.playShambhalaBell();
          else if (window.sfx && window.sfx.playShieldBreak) window.sfx.playShieldBreak();
          triggerShake(0.12, 2.0);
          spawnStarSparkles(d.x, d.y - 30, 14, '#fde047');
          spawnParticles(d.x, d.y - 30, 16, '#f59e0b', 85, -30);
          spawnFloatingText(d.x - 24, d.y - 54, '¡CAMPANA SAGRADA! +150', '#fde047');
          score += 150;

          // Aturdir / alejar enemigos cercanos
          if (magmaCrawlers) {
            magmaCrawlers.forEach(mc => {
              if (Math.hypot(mc.x - d.x, mc.y - d.y) < 180) {
                mc.dir *= -1;
                spawnStarSparkles(mc.x + 9, mc.y + 6, 6, '#fde047');
              }
            });
          }
          if (fireBats) {
            fireBats.forEach(fb => {
              if (Math.hypot(fb.x - d.x, fb.y - d.y) < 180) {
                fb.dir *= -1;
                spawnStarSparkles(fb.x + 6, fb.y + 4, 6, '#fde047');
              }
            });
          }
        }
      }

      // 3. Portales Dimensionales del Santuario (Hacia Shambhala y hacia el Monte Kailash)
      if (d.subType === 'sanctuary_portal_gate' && rectOverlap(player.x, player.y, player.w, player.h, d.x - 20, d.y - 58, 40, 58)) {
        if (!d.warped) {
          d.warped = true;
          if (window.sfx && window.sfx.playPortal) window.sfx.playPortal();
          triggerShake(0.22, 3.2);
          spawnStarSparkles(player.x + 11, player.y + 12, 22, '#00f5d4');
          spawnParticles(player.x + 11, player.y + 12, 26, '#fde047', 130, -55);
          if (d.x < 30000) {
            spawnFloatingText(player.x - 18, player.y - 28, '¡ENTRANDO A SHAMBHALA!', '#fde047');
            player.x = 29640;
            player.y = 100;
            player.vx = 220;
            player.vy = -120;
          } else {
            spawnFloatingText(player.x - 24, player.y - 28, '¡ASCENSO ASTRAL AL MONTE KAILASH!', '#00f5d4');
            player.x = 33040;
            player.y = 90;
            player.vx = 250;
            player.vy = -190;
          }
          player.jumpsLeft = 2;
        }
      }
    }
  }

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

// ============================================================================
// ACTUALIZACIÓN DE PLATAFORMAS DINÁMICAS (TÉMPANOS MÓVILES Y HIELO QUEBRADIZO)
// ============================================================================
function updatePlatforms(dt) {
  if (!level || !level.platforms) return;

  for (let i = 0; i < level.platforms.length; i++) {
    const p = level.platforms[i];

    // 1. Témpanos y Plataformas Móviles a la Deriva
    if (p.moving) {
      if (p.dir === undefined) p.dir = 1;
      const speed = p.speed || 45;
      const prevX = p.x;
      p.x += p.dir * speed * dt;

      if (p.dir > 0 && p.x >= p.maxX) {
        p.x = p.maxX;
        p.dir = -1;
      } else if (p.dir < 0 && p.x <= p.minX) {
        p.x = p.minX;
        p.dir = 1;
      }

      const dx = p.x - prevX;
      // Arrastrar a Elizabeth si está parada sobre el témpano
      if (player && player.onGround && player.currentPlatform === p) {
        player.x += dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.w > level.worldWidth) player.x = level.worldWidth - player.w;
      }
    }

    // 2. Hielo Quebradizo (Cracking Ice)
    if (p.subType === 'cracking_ice') {
      if (p.broken) {
        p.respawnTimer -= dt;
        if (p.respawnTimer <= 0) {
          p.broken = false;
          p.crackTimer = 0;
          p.shakeOffset = 0;
          if (typeof spawnStarSparkles === 'function') {
            spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 8, '#caf0f8');
          }
        }
      } else {
        const isStandingOn = (player && player.onGround && player.currentPlatform === p);
        if (isStandingOn) {
          p.crackTimer = (p.crackTimer || 0) + dt;
          if (p.crackTimer > 0.32) {
            p.shakeOffset = Math.sin(globalFrame * 1.8) * 1.8;
          }
          if (p.crackTimer >= 0.85) {
            p.broken = true;
            p.respawnTimer = 2.8;
            p.shakeOffset = 0;
            if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
            if (typeof spawnParticles === 'function') {
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 14, '#90e0ef', 80, -30);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 8, '#ffffff', 60, -20);
            }
            if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
            if (player.currentPlatform === p) {
              player.onGround = false;
              player.currentPlatform = null;
            }
          }
        } else {
          if (p.crackTimer > 0) {
            p.crackTimer = Math.max(0, p.crackTimer - dt * 1.5);
            p.shakeOffset = 0;
          }
        }
      }
    }
  }
}
