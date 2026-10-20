// ============================================================================
// 🦸🏻‍♂️ BOSS FIGHT: OMNI-MAN (5 DE VIDA, FASE 2 TRAS 2 GOLPES, PUERTA DE CASTILLO CERRADA)
// ============================================================================
function updateOmniMenAndRocks(dt, isLavaDashing) {
  const gate = level.bossCastleGate;

  // Control del Portón del Castillo de Omni-Man:
  // Solo se activa y se cierra cuando el jugador entra al Castillo (x < triggerX y arriba en el Cráter)
  if (gate && omniMen.length > 0) {
    if (!bossFightActive && player.x < gate.triggerX && player.y <= gate.triggerY) {
      bossFightActive = true;
      window.sfx.playLaserFire();
      triggerShake(0.28, 3.8);
      spawnParticles(gate.x + 10, gate.y + 60, 24, '#ff2a55', 95, 40);
      spawnFloatingText(player.x - 48, player.y - 26, '🏰 ¡CASTILLO CERRADO! ¡DERROTA A OMNI-MAN!', '#ff2a55');
    }

    // Mientras la Boss Fight está activa, el portón del Castillo bloquea la salida hasta terminar la pelea
    if (bossFightActive) {
      if (player.x + player.w > gate.x) {
        player.x = gate.x - player.w;
        if (player.vx > 0) player.vx = 0;
      }
      if (player.x < 765) {
        player.x = 765;
        if (player.vx < 0) player.vx = 0;
      }
    }
  } else {
    bossFightActive = false;
  }

  for (let i = omniMen.length - 1; i >= 0; i--) {
    const om = omniMen[i];
    if (om.hitTimer > 0) om.hitTimer -= dt;

    const dx = player.x - om.x;
    const dy = player.y - om.y;
    const dist = Math.hypot(dx, dy);
    // Omni-Man SOLO te puede atacar cuando ya entraste a su Castillo (bossFightActive)
    const inArena = gate ? bossFightActive : (dist < (om.range || 500));
    const speedMult = om.isEnraged ? 1.6 : 1.0;

    // Máquina de estados de Boss Fight cuando el jugador está dentro del Castillo
    if (inArena) {
      om.stateTimer -= dt;
    }

    if (om.bossState === 'patrol') {
      // Regresar suavemente a su altura de vuelo base
      om.y += (om.baseY - om.y) * Math.min(1, dt * 6);
      if (om.minX !== undefined && om.maxX !== undefined) {
        om.x += om.dir * (om.speed || 66) * speedMult * dt;
        if (om.x >= om.maxX) { om.x = om.maxX; om.dir = -1; }
        if (om.x <= om.minX) { om.x = om.minX; om.dir = 1; }
      }
      om.facingRight = dx > 0;

      // Ataque 1: Bombardeo de Rocas de Magma (Simple en Fase 1, Triple Abanico en Fase 2 Enfurecida)
      if (inArena) {
        om.timer -= dt * (om.isEnraged ? 1.35 : 1.0);
        if (om.timer <= 0) {
          om.timer = om.throwInterval;
          window.sfx.playMagmaThrow();
          const flightTime = Math.max(0.5, Math.min(1.0, Math.abs(dx) / 220));
          const baseVx = dx / flightTime;
          const baseVy = (dy - 0.5 * 380 * flightTime * flightTime) / flightTime;

          const spreads = om.isEnraged ? [-55, 0, 55] : [0];
          for (const sp of spreads) {
            magmaRocks.push({
              x: om.x + 12,
              y: om.y - 4,
              vx: baseVx + sp,
              vy: baseVy - Math.abs(sp) * 0.25,
              isShockwave: false,
              life: 3.5
            });
          }
        }

        // Pasar a un Ataque Especial de Boss cuando se cumple el ciclo
        if (om.stateTimer <= 0) {
          om.attackCycle = (om.attackCycle + 1) % 2;
          if (om.attackCycle === 0) {
            // Preparar Embestida Sónica Rasante (Sonic Swoop)
            om.bossState = 'swoop_charge';
            om.stateTimer = om.isEnraged ? 0.45 : 0.65;
            om.swoopDir = player.x >= om.x ? 1 : -1;
            om.facingRight = om.swoopDir > 0;
            window.sfx.playLaserWarning();
          } else {
            // Preparar Impacto Meteórico contra el Suelo (Ground Slam)
            om.bossState = 'slam_aim';
            om.stateTimer = om.isEnraged ? 0.48 : 0.68;
            window.sfx.playLaserWarning();
          }
        }
      }
    } else if (om.bossState === 'swoop_charge') {
      // Se alinea a media-baja altura y parpadea advirtiendo la embestida
      const targetY = om.groundY - 28;
      om.y += (targetY - om.y) * Math.min(1, dt * 8);
      if (om.stateTimer <= 0) {
        om.bossState = 'swoop';
        om.stateTimer = om.isEnraged ? 1.15 : 1.35;
        window.sfx.playLavaDash();
        triggerShake(0.18, 2.5);
      }
    } else if (om.bossState === 'swoop') {
      // Cruza toda la arena a velocidad supersónica
      const swoopSpeed = om.isEnraged ? 320 : 235;
      om.x += om.swoopDir * swoopSpeed * dt;
      if (globalFrame % 2 === 0) {
        spawnParticles(om.x + 12, om.y + 14, 2, '#ff0055', 50, 0);
      }
      if (om.x <= om.minX - 20 || om.x >= om.maxX + 20 || om.stateTimer <= 0) {
        om.x = Math.max(om.minX, Math.min(om.maxX, om.x));
        om.bossState = 'patrol';
        om.stateTimer = om.isEnraged ? 1.5 : 2.3;
      }
    } else if (om.bossState === 'slam_aim') {
      // Se posiciona encima del jugador antes de caer como meteorito
      const targetX = Math.max(om.minX + 30, Math.min(om.maxX - 30, player.x));
      om.x += (targetX - om.x) * Math.min(1, dt * 7);
      om.y += ((om.baseY - 18) - om.y) * Math.min(1, dt * 7);
      om.facingRight = dx > 0;
      if (om.stateTimer <= 0) {
        om.bossState = 'slam_down';
        window.sfx.playLavaDash();
      }
    } else if (om.bossState === 'slam_down') {
      // Cae en picada vertical contra el suelo del Cráter
      om.y += (om.isEnraged ? 520 : 420) * dt;
      spawnParticles(om.x + 12, om.y, 2, '#ff5400', 60, -30);
      if (om.y >= om.groundY) {
        om.y = om.groundY;
        om.bossState = 'slam_recover';
        om.stateTimer = om.isEnraged ? 0.75 : 1.05; // Ventana para castigarlo con Lava Run
        window.sfx.playLaserFire();
        triggerShake(0.35, 4.5);
        spawnParticles(om.x + 12, om.y + 24, 26, '#ff5400', 140, 60);
        spawnParticles(om.x + 12, om.y + 24, 14, '#ffd166', 110, 40);

        // Dispara ondas de choque de lava a ras del suelo hacia izquierda y derecha
        const waveSpd = om.isEnraged ? 235 : 175;
        magmaRocks.push(
          { x: om.x, y: om.groundY + 22, vx: -waveSpd, vy: 0, isShockwave: true, life: 1.8 },
          { x: om.x + 20, y: om.groundY + 22, vx: waveSpd, vy: 0, isShockwave: true, life: 1.8 }
        );
        if (om.isEnraged) {
          // En Fase 2 además salpica 2 rocas ígneas en diagonal hacia arriba
          magmaRocks.push(
            { x: om.x + 6, y: om.groundY + 10, vx: -110, vy: -220, isShockwave: false, life: 2.5 },
            { x: om.x + 16, y: om.groundY + 10, vx: 110, vy: -220, isShockwave: false, life: 2.5 }
          );
        }
      }
    } else if (om.bossState === 'slam_recover') {
      // Breve recuperación en el suelo tras el impacto meteórico
      if (om.stateTimer <= 0) {
        om.bossState = 'patrol';
        om.stateTimer = om.isEnraged ? 1.4 : 2.2;
      }
    }

    // Colisión Jugador <-> Boss Omni-Man
    if (rectOverlap(player.x, player.y, player.w, player.h, om.x - 4, om.y - 6, 30, 34)) {
      if (isLavaDashing) {
        if (om.hitTimer <= 0) {
          om.hp--;
          om.hitTimer = 0.48;
          // Impulso aéreo de rebote y recarga de salto tras golpearlo con el Dash
          player.vy = -215;
          player.jumpsLeft = 2;
          player.dashCooldown = 0.22;
          triggerShake(0.24, 3.8);
          spawnParticles(om.x + 12, om.y + 10, 18, '#ff5400', 110, 60);
          spawnParticles(om.x + 12, om.y + 10, 10, '#ffd166', 90, 40);

          if (om.hp <= 0) {
            // ¡Derrotado al 5to golpe! Se abre el Castillo, suelta Lirios de Dexter y LIBERA AL HIJO RATÓN #2
            bossFightActive = false;
            magmaRocks = [];
            window.sfx.playEnemyDefeat();
            score += 1000;
            spawnDroppedLilies(om.x + 12, om.y + 10, 15);
            spawnParticles(om.x + 12, om.y + 10, 40, '#ff2a55', 145, 80);
            spawnFloatingText(om.x - 36, om.y - 18, '💥 ¡OMNI-MAN DERROTADO! ¡CASTILLO Y JAULA ABIERTOS!', '#00f5d4');
            if (gate) {
              spawnParticles(gate.x + 10, gate.y + 60, 24, '#00f5d4', 110, 45);
            }
            if (level.babyMouse) {
              spawnParticles(level.babyMouse.x + 8, level.babyMouse.y, 30, '#00f5d4', 115, 50);
              spawnFloatingText(level.babyMouse.x - 20, level.babyMouse.y - 18, '🔓 ¡JAULA ROTA!', '#ffd166');
            }
            omniMen.splice(i, 1);
            continue;
          } else if (om.hp <= 3 && !om.isEnraged) {
            // ¡Acaba de recibir el 2do golpe (queda en 3/5 de vida)! Activa FASE 2: FURIA VILTRUMITA
            om.isEnraged = true;
            om.bossState = 'patrol';
            om.stateTimer = 0.8;
            window.sfx.playLaserFire();
            triggerShake(0.45, 5);
            spawnDroppedLilies(om.x + 12, om.y + 10, 4);
            spawnParticles(om.x + 12, om.y + 10, 32, '#ff0055', 140, 40);
            spawnFloatingText(om.x - 45, om.y - 24, `🔥 ¡FASE 2: FURIA VILTRUMITA! (${om.hp}/${om.maxHp})`, '#ff0055');
          } else {
            window.sfx.playEnemyHit();
            spawnDroppedLilies(om.x + 12, om.y + 10, 2);
            spawnFloatingText(om.x - 12, om.y - 16, `💥 ¡GOLPE! (${om.hp}/${om.maxHp})`, '#ff8fab');
          }
        }
      } else if (om.hitTimer <= 0) {
        damagePlayer(false);
      }
    }
  }

  for (let i = magmaRocks.length - 1; i >= 0; i--) {
    const r = magmaRocks[i];
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    if (!r.isShockwave) {
      r.vy += 380 * dt;
    }
    r.life -= dt;

    if (globalFrame % 2 === 0) {
      spawnParticles(r.x, r.y, 1, r.isShockwave ? '#ff0055' : '#ff5400', 28, r.isShockwave ? -30 : 20);
    }

    if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, r.x - 6, r.y - 6, 12, 12)) {
      if (isLavaDashing) {
        spawnParticles(r.x, r.y, 10, '#ffd166', 90, 40);
        magmaRocks.splice(i, 1);
        continue;
      } else {
        damagePlayer(false);
        magmaRocks.splice(i, 1);
        continue;
      }
    }

    if (r.life <= 0 || r.y > level.worldHeight + 40) {
      magmaRocks.splice(i, 1);
    }
  }
}

// ============================================================================
// IA DE LAS 6 VARIANTES DE ENEMIGOS VOLCÁNICOS (SUELTAN LIRIOS DE DEXTER 🌸)
// ============================================================================
function updateVolcanoEnemies(dt, isLavaDashing) {
  // 1. Escarabajos (Se derrotan con Lava Run o saltando encima de su caparazón en el Mundo 1 y 2)
  for (let i = magmaCrawlers.length - 1; i >= 0; i--) {
    const mc = magmaCrawlers[i];
    mc.x += mc.dir * mc.speed * dt;
    if (mc.x >= mc.maxX) { mc.x = mc.maxX; mc.dir = -1; }
    if (mc.x <= mc.minX) { mc.x = mc.minX; mc.dir = 1; }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, mc.x, mc.y, 18, 15)) {
      const isStomping = player.vy > 0 && (player.y + player.h - player.vy * dt) <= mc.y + 9;
      if (isLavaDashing || isStomping) {
        window.sfx.playEnemyHit();
        score += 150;
        if (isStomping && !isLavaDashing) {
          player.vy = -235;
          player.jumpsLeft = 2;
        }
        spawnDroppedLilies(mc.x + 9, mc.y + 4, 2);
        spawnParticles(mc.x + 9, mc.y + 7, 16, '#ff5400', 95, 70);
        magmaCrawlers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 2. Murciélagos (Se derrotan con Lava Run o rebotando encima de ellos)
  for (let i = fireBats.length - 1; i >= 0; i--) {
    const fb = fireBats[i];
    fb.x += fb.dir * fb.speed * dt;
    if (fb.x >= fb.maxX) { fb.x = fb.maxX; fb.dir = -1; }
    if (fb.x <= fb.minX) { fb.x = fb.minX; fb.dir = 1; }
    fb.y = fb.baseY + Math.sin(globalFrame * 0.08 + fb.phase) * 16;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, fb.x, fb.y, 12, 10)) {
      const isStomping = player.vy > 0 && (player.y + player.h - player.vy * dt) <= fb.y + 8;
      if (isLavaDashing || isStomping) {
        window.sfx.playEnemyHit();
        score += 150;
        if (isStomping && !isLavaDashing) {
          player.vy = -240;
        }
        player.jumpsLeft = 2; // Recarga salto en el aire
        spawnDroppedLilies(fb.x + 6, fb.y + 4, 2);
        spawnParticles(fb.x + 6, fb.y + 5, 16, '#ffd166', 95, 50);
        fireBats.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 3. Sapos Volcánicos Saltarines (Lava Hoppers)
  for (let i = lavaHoppers.length - 1; i >= 0; i--) {
    const lh = lavaHoppers[i];
    if (lh.inAir) {
      lh.vy += 480 * dt;
      lh.x += lh.vx * dt;
      lh.y += lh.vy * dt;
      if (lh.x <= lh.minX) { lh.x = lh.minX; lh.dir = 1; lh.vx = Math.abs(lh.vx); }
      if (lh.x >= lh.maxX) { lh.x = lh.maxX; lh.dir = -1; lh.vx = -Math.abs(lh.vx); }
      if (lh.y >= lh.groundY) {
        lh.y = lh.groundY;
        lh.vy = 0;
        lh.vx = 0;
        lh.inAir = false;
        lh.hopTimer = 0.85;
      }
    } else {
      lh.hopTimer -= dt;
      if (lh.hopTimer <= 0) {
        lh.inAir = true;
        lh.vy = -205;
        if (lh.x <= lh.minX + 10) lh.dir = 1;
        else if (lh.x >= lh.maxX - 10) lh.dir = -1;
        lh.vx = lh.dir * 62;
      }
    }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, lh.x, lh.y, 18, 16)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(lh.x + 9, lh.y + 4, 3);
        spawnParticles(lh.x + 9, lh.y + 8, 18, '#ffbe0b', 100, 65);
        lavaHoppers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 4. Espíritus Orbitales de Fuego (Flame Wisps)
  for (let i = flameWisps.length - 1; i >= 0; i--) {
    const fw = flameWisps[i];
    fw.angle += fw.speed * dt;
    fw.x = fw.centerX + Math.cos(fw.angle) * fw.radius - 7;
    fw.y = fw.centerY + Math.sin(fw.angle) * fw.radius - 7;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, fw.x, fw.y, 14, 14)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(fw.x + 7, fw.y + 7, 3);
        spawnParticles(fw.x + 7, fw.y + 7, 18, '#ff5400', 95, 45);
        flameWisps.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 5. Gólems Acorazados de Obsidiana (Obsidian Brutes - Requieren 2 golpes de Lava Run)
  for (let i = obsidianBrutes.length - 1; i >= 0; i--) {
    const ob = obsidianBrutes[i];
    if (ob.hitTimer > 0) ob.hitTimer -= dt;

    ob.x += ob.dir * ob.speed * dt;
    if (ob.x >= ob.maxX) { ob.x = ob.maxX; ob.dir = -1; }
    if (ob.x <= ob.minX) { ob.x = ob.minX; ob.dir = 1; }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, ob.x, ob.y, 22, 22)) {
      if (isLavaDashing) {
        if (ob.hitTimer <= 0) {
          ob.hp--;
          ob.hitTimer = 0.4;
          player.vy = -175;
          player.jumpsLeft = 2;
          player.dashCooldown = 0.2;
          triggerShake(0.16, 2.5);
          spawnParticles(ob.x + 11, ob.y + 10, 16, '#ff5400', 100, 60);

          if (ob.hp <= 0) {
            window.sfx.playEnemyDefeat();
            score += 300;
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 5);
            spawnParticles(ob.x + 11, ob.y + 10, 24, '#ff0055', 115, 70);
            spawnFloatingText(ob.x - 12, ob.y - 12, '💥 ¡GÓLEM DESTRUIDO! (🌸x5)', '#ff8fab');
            obsidianBrutes.splice(i, 1);
          } else {
            window.sfx.playEnemyHit();
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 1);
            spawnFloatingText(ob.x - 10, ob.y - 12, '🛡️ ¡ARMADURA ROTA! (1/2)', '#ffd166');
          }
        }
      } else if (ob.hitTimer <= 0) {
        damagePlayer(false);
      }
    }
  }

  // 6. Gusanos de Magma Saltarines (Magma Worms)
  for (let i = magmaWorms.length - 1; i >= 0; i--) {
    const mw = magmaWorms[i];
    const jumpArc = Math.max(0, Math.sin(globalFrame * 0.045 * mw.speed + mw.phase));
    mw.y = mw.baseY - jumpArc * mw.jumpHeight;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, mw.x, mw.y, 12, 18)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(mw.x + 6, mw.y + 6, 3);
        spawnParticles(mw.x + 6, mw.y + 8, 18, '#ffd166', 95, 55);
        magmaWorms.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}

// Calcula hasta dónde baja el láser de Homelander (se detiene en el techo de las Glorietas de Mármol de la Fase 3)
