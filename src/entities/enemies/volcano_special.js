// ============================================================================
// IA DE ENEMIGOS ESPECIALES DEL VOLCÁN (SAPOS, ESPÍRITUS, GÓLEMS Y GUSANOS)
// ============================================================================
function updateVolcanoSpecialEnemies(dt, isLavaDashing) {
  // 1. Sapos Volcánicos Saltarines (Lava Hoppers)
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
        spawnParticles(lh.x + 9, lh.y + 8, 18, '#ff2a70', 100, 65);
        lavaHoppers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 2. Espíritus Orbitales de Fuego (Flame Wisps)
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
        spawnParticles(fw.x + 7, fw.y + 7, 18, '#ff2a70', 95, 45);
        flameWisps.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 3. Gólems Acorazados de Obsidiana (Obsidian Brutes)
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
          spawnParticles(ob.x + 11, ob.y + 10, 16, '#ff2a70', 100, 60);

          if (ob.hp <= 0) {
            window.sfx.playEnemyDefeat();
            score += 300;
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 5);
            spawnParticles(ob.x + 11, ob.y + 10, 24, '#b31b52', 115, 70);
            spawnFloatingText(ob.x - 12, ob.y - 12, '💥 ¡GÓLEM DESTRUIDO! (🌸x5)', '#ff8fab');
            obsidianBrutes.splice(i, 1);
          } else {
            window.sfx.playEnemyHit();
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 1);
            spawnFloatingText(ob.x - 10, ob.y - 12, '🛡️ ¡ARMADURA ROTA! (1/2)', '#ffcad4');
          }
        }
      } else if (ob.hitTimer <= 0) {
        damagePlayer(false);
      }
    }
  }

  // 4. Gusanos de Magma Saltarines (Magma Worms)
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
        spawnParticles(mw.x + 6, mw.y + 8, 18, '#ff2a70', 95, 55);
        magmaWorms.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}
