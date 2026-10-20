// ============================================================================
// 🦸🏻‍♂️ BOSS FIGHT: OMNI-MAN (5 DE VIDA, FASE 2 TRAS 2 GOLPES, PUERTA DE CASTILLO CERRADA)
// ============================================================================
function updateOmniMenAndRocks(dt, isLavaDashing) {
  const gate = level.bossCastleGate;

  // Control del Portón del Castillo de Omni-Man
  if (gate && omniMen.length > 0) {
    if (!bossFightActive && player.x < gate.triggerX && player.y <= gate.triggerY) {
      bossFightActive = true;
      window.sfx.playLaserFire();
      triggerShake(0.28, 3.8);
      spawnParticles(gate.x + 10, gate.y + 60, 24, '#ff2a55', 95, 40);
      spawnFloatingText(player.x - 48, player.y - 26, '🏰 ¡CASTILLO CERRADO! ¡DERROTA A OMNI-MAN!', '#ff2a55');
    }

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
    const inArena = gate ? bossFightActive : (dist < (om.range || 500));
    const speedMult = om.isEnraged ? 1.6 : 1.0;

    if (inArena) {
      om.stateTimer -= dt;
    }

    if (om.bossState === 'patrol') {
      om.y += (om.baseY - om.y) * Math.min(1, dt * 6);
      if (om.minX !== undefined && om.maxX !== undefined) {
        om.x += om.dir * (om.speed || 66) * speedMult * dt;
        if (om.x >= om.maxX) { om.x = om.maxX; om.dir = -1; }
        if (om.x <= om.minX) { om.x = om.minX; om.dir = 1; }
      }
      om.facingRight = dx > 0;

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

        if (om.stateTimer <= 0) {
          om.attackCycle = (om.attackCycle + 1) % 2;
          if (om.attackCycle === 0) {
            om.bossState = 'swoop_charge';
            om.stateTimer = om.isEnraged ? 0.45 : 0.65;
            om.swoopDir = player.x >= om.x ? 1 : -1;
            om.facingRight = om.swoopDir > 0;
            window.sfx.playLaserWarning();
          } else {
            om.bossState = 'slam_aim';
            om.stateTimer = om.isEnraged ? 0.48 : 0.68;
            window.sfx.playLaserWarning();
          }
        }
      }
    } else if (om.bossState === 'swoop_charge') {
      const targetY = om.groundY - 28;
      om.y += (targetY - om.y) * Math.min(1, dt * 8);
      if (om.stateTimer <= 0) {
        om.bossState = 'swoop';
        om.stateTimer = om.isEnraged ? 1.15 : 1.35;
        window.sfx.playLavaDash();
        triggerShake(0.18, 2.5);
      }
    } else if (om.bossState === 'swoop') {
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
      const targetX = Math.max(om.minX + 30, Math.min(om.maxX - 30, player.x));
      om.x += (targetX - om.x) * Math.min(1, dt * 7);
      om.y += ((om.baseY - 18) - om.y) * Math.min(1, dt * 7);
      om.facingRight = dx > 0;
      if (om.stateTimer <= 0) {
        om.bossState = 'slam_down';
        window.sfx.playLavaDash();
      }
    } else if (om.bossState === 'slam_down') {
      om.y += (om.isEnraged ? 520 : 420) * dt;
      spawnParticles(om.x + 12, om.y, 2, '#ff2a70', 60, -30);
      if (om.y >= om.groundY) {
        om.y = om.groundY;
        om.bossState = 'slam_recover';
        om.stateTimer = om.isEnraged ? 0.75 : 1.05;
        window.sfx.playLaserFire();
        triggerShake(0.35, 4.5);
        spawnParticles(om.x + 12, om.y + 24, 26, '#ff2a70', 140, 60);
        spawnParticles(om.x + 12, om.y + 24, 14, '#ffcad4', 110, 40);

        const waveSpd = om.isEnraged ? 235 : 175;
        magmaRocks.push(
          { x: om.x, y: om.groundY + 22, vx: -waveSpd, vy: 0, isShockwave: true, life: 1.8 },
          { x: om.x + 20, y: om.groundY + 22, vx: waveSpd, vy: 0, isShockwave: true, life: 1.8 }
        );
        if (om.isEnraged) {
          magmaRocks.push(
            { x: om.x + 6, y: om.groundY + 10, vx: -110, vy: -220, isShockwave: false, life: 2.5 },
            { x: om.x + 16, y: om.groundY + 10, vx: 110, vy: -220, isShockwave: false, life: 2.5 }
          );
        }
      }
    } else if (om.bossState === 'slam_recover') {
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
          player.vy = -215;
          player.jumpsLeft = 2;
          player.dashCooldown = 0.22;
          triggerShake(0.24, 3.8);
          spawnParticles(om.x + 12, om.y + 10, 18, '#ff2a70', 110, 60);
          spawnParticles(om.x + 12, om.y + 10, 10, '#ffcad4', 90, 40);

          if (om.hp <= 0) {
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
      spawnParticles(r.x, r.y, 1, r.isShockwave ? '#ff0055' : '#ff2a70', 28, r.isShockwave ? -30 : 20);
    }

    if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, r.x - 6, r.y - 6, 12, 12)) {
      if (isLavaDashing) {
        spawnParticles(r.x, r.y, 10, '#ffcad4', 90, 40);
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
