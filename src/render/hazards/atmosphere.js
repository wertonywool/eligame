// ============================================================================
// ATMÓSFERA Y CENIZAS EN PRIMER PLANO DEL VOLCÁN
// ============================================================================

function drawVolcanoLandmarks() {
  // Desactivado: los carteles flotantes tapaban la pantalla y se veían borrosos
}

let cachedVolcanoVignette = null;

function getCachedVolcanoVignette() {
  if (!cachedVolcanoVignette) {
    cachedVolcanoVignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.36, W / 2, H / 2, W * 0.62);
    cachedVolcanoVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    cachedVolcanoVignette.addColorStop(1, 'rgba(12, 4, 15, 0.50)');
  }
  return cachedVolcanoVignette;
}

function drawVolcanoForegroundAtmosphere() {
  for (let i = 0; i < 14; i++) {
    const fx = ((i * 97 - cameraX * 1.35 + globalFrame * (0.4 + (i % 3) * 0.2)) % W + W) % W;
    const fy = ((i * 61 - cameraY * 1.25 - globalFrame * 0.55) % H + H) % H;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(255, 202, 212, 0.45)' : 'rgba(255, 42, 112, 0.38)';
    ctx.fillRect(Math.round(fx), Math.round(fy), 3, 3);
  }

  ctx.fillStyle = getCachedVolcanoVignette();
  ctx.fillRect(0, 0, W, H);
}
