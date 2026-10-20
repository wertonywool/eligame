
// ============================================================================
// BUCLE PRINCIPAL (60 FPS ESTABLES)
// ============================================================================
let lastTime = performance.now();
loadLevel(0);

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  pollGamepad(dt);
  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

