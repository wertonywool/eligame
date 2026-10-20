// ============================================================================
// PELIGRO AMBIENTAL MUNDO 4: VENTISCAS HELADAS PERIÓDICAS (ICE BLIZZARD)
// ============================================================================
// Cada 7 segundos, una furiosa ventisca ártica azota la superficie de la montaña.
// - En superficie: empuja fuertemente a Elizabeth hacia atrás y congela.
// - Bajo la nieve: si Elizabeth cava con la pala (player.isDigging), es 100% inmune.

let blizzardState = {
  active: false,
  cycleTimer: 7.0,
  duration: 2.8,
  timer: 0,
  particles: []
};

function getBlizzardState() {
  return blizzardState;
}

function updateBlizzardSystem(dt) {
  if (gameState !== 'PLAYING' || !level || level.theme !== 'snow') {
    blizzardState.active = false;
    return;
  }

  blizzardState.cycleTimer -= dt;
  if (blizzardState.cycleTimer <= 0) {
    if (!blizzardState.active) {
      blizzardState.active = true;
      blizzardState.timer = blizzardState.duration;
      triggerShake(0.15, 2.0);
      if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
      spawnFloatingText(player.x - 28, player.y - 18, '¡VENTISCA HELADA! ¡CÁVATE BAJO LA NIEVE!', '#caf0f8');
    }
  }

  if (blizzardState.active) {
    blizzardState.timer -= dt;

    // Resistencia del viento helado sobre la superficie
    const isSheltered = (player.isDigging) || (player.x < 360); // Cabaña resguarda al inicio
    if (!isSheltered) {
      player.vx -= 150 * dt;
      if (globalFrame % 14 === 0) {
        spawnParticles(player.x + 11, player.y + 12, 1, '#caf0f8', 40, -10);
      }
    }

    if (blizzardState.timer <= 0) {
      blizzardState.active = false;
      blizzardState.cycleTimer = 7.5;
    }
  }
}

function drawBlizzardSystem(ctx, camX, frame) {
  if (!level || level.theme !== 'snow') return;

  // Generar ráfagas de nieve continua en el viento
  const isBlizzard = blizzardState.active;
  const count = isBlizzard ? 18 : 6;
  const speed = isBlizzard ? 8 : 2.5;

  ctx.fillStyle = isBlizzard ? 'rgba(255, 255, 255, 0.75)' : 'rgba(224, 242, 254, 0.45)';
  for (let i = 0; i < count; i++) {
    const sx = ((i * 37 - frame * speed * 3) % (W + 60) + (W + 60)) % (W + 60) - 30;
    const sy = (i * 23 + frame * 0.8) % H;
    const len = isBlizzard ? (12 + (i % 3) * 6) : 3;

    ctx.fillRect(sx, sy, len, isBlizzard ? 1.5 : 1);
  }

  // Tinte helado durante la ventisca activa
  if (isBlizzard) {
    ctx.fillStyle = 'rgba(202, 240, 248, 0.12)';
    ctx.fillRect(0, 0, W, H);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getBlizzardState,
    updateBlizzardSystem,
    drawBlizzardSystem
  };
}
