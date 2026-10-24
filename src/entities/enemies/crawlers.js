// ============================================================================
// IA DE ENEMIGOS TERRESTRES (MARIQUITAS, ESCARABAJOS Y ORUGAS DE MAGMA)
// ============================================================================
function updateCrawlers(dt, isLavaDashing) {
  for (let i = magmaCrawlers.length - 1; i >= 0; i--) {
    const mc = magmaCrawlers[i];
    if (mc.dead) {
      magmaCrawlers.splice(i, 1);
      continue;
    }
    mc.x += mc.dir * mc.speed * dt;
    if (mc.x >= mc.maxX) { mc.x = mc.maxX; mc.dir = -1; }
    if (mc.x <= mc.minX) { mc.x = mc.minX; mc.dir = 1; }

    // Si Elizabeth esta excavando bajo la nieve con la pala, es inmune a los enemigos de superficie
    if (player && player.isDigging) {
      continue;
    }

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
        spawnParticles(mc.x + 9, mc.y + 7, 16, '#ff2a70', 95, 70);
        magmaCrawlers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}
