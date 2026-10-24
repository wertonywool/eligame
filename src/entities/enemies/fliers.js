// ============================================================================
// IA DE ENEMIGOS VOLADORES (ABEJAS, MARIPOSAS NOCTURNAS Y MURCIELAGOS)
// ============================================================================
function updateFliers(dt, isLavaDashing) {
  for (let i = fireBats.length - 1; i >= 0; i--) {
    const fb = fireBats[i];
    if (fb.dead) {
      fireBats.splice(i, 1);
      continue;
    }
    fb.x += fb.dir * fb.speed * dt;
    if (fb.x >= fb.maxX) { fb.x = fb.maxX; fb.dir = -1; }
    if (fb.x <= fb.minX) { fb.x = fb.minX; fb.dir = 1; }
    fb.y = fb.baseY + Math.sin(globalFrame * 0.08 + fb.phase) * 16;

    // Si Elizabeth esta excavando bajo la nieve con la pala, es inmune a los murcielagos aereos
    if (player && player.isDigging) {
      continue;
    }

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
}
