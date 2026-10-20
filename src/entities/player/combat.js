// --- Sistema de Combate, Daño y Casa Segura del Jugador ---
function damagePlayer(respawnAtCheckpoint) {
  if (!respawnAtCheckpoint && (player.invulnTimer > 0 || player.dashTimer > 0)) return;

  player.lives--;
  window.sfx.playHurt();
  triggerShake(0.25, 4);
  rumbleGamepad(220, 0.65, 0.85);
  spawnParticles(player.x + 11, player.y + 12, 14, '#ff4d6d', 90, 120);

  if (player.lives <= 0) {
    gameState = 'GAMEOVER';
    return;
  }

  if (respawnAtCheckpoint) {
    // Reaparecer en el último Checkpoint activado
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.vx = 0;
    player.vy = 0;
    if (player.ability === 'surf' && player.x >= 15850 && player.x < 18500) {
      player.vx = 240;
      player.facingRight = true;
      player.isSurfing = true;
      player.inWater = true;
      player.onGround = true;
    }
    if (level.bossCastleGate && player.x >= level.bossCastleGate.x) {
      bossFightActive = false;
      magmaRocks = [];
    }
  } else {
    player.vy = -180;
    player.vx = player.facingRight ? -95 : 95;
  }
  player.invulnTimer = saveState.upgrades.longerInvuln ? 2.1 : 1.3;
}

function enterSafeHouse(babyMouse) {
  gameState = 'SAFE_HOUSE';
  houseState.mamaX = 85;
  houseState.mamaY = 196;
  houseState.phase = 'greeting';
  houseState.timer = 0;
  houseState.unlockedAbilityText = babyMouse.nextAbilityName || 'NUEVA HABILIDAD DESBLOQUEADA';
}
