// --- Seguimiento suave de Cámara 2D a 144 Hz (CERO temblores, tirones ni judder) ---
function updatePlayerCamera(dt) {
  const targetLookAhead = player.facingRight ? 24 : -24;
  cameraLookAheadX += (targetLookAhead - cameraLookAheadX) * (1 - Math.exp(-4 * dt));
  let targetCamX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.38 + cameraLookAheadX));
  let targetCamY = Math.max(0, Math.min(level.worldHeight - H, player.y - H * 0.58));

  // Encuadre cinematográfico de la batalla contra el Kraken (Mundo 3)
  const kraken = window.krakenBossState || (typeof krakenBossState !== 'undefined' ? krakenBossState : null);
  if (kraken && kraken.active) {
    targetCamX = Math.max(18300, Math.min(18520, player.x - 140));
    targetCamY = 0;
  }

  // Amortiguación fluida matemáticamente invariante a framerate
  const camFactorX = 1 - Math.exp(-9 * dt);
  const camFactorY = player.onGround ? (1 - Math.exp(-8 * dt)) : (1 - Math.exp(-4 * dt));
  cameraX += (targetCamX - cameraX) * camFactorX;
  cameraY += (targetCamY - cameraY) * camFactorY;
}
