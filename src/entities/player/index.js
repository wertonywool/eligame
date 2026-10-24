// --- Orquestador Principal del Jugador ---
function updatePlayer(dt) {
  if (typeof updatePlatforms === 'function') {
    updatePlatforms(dt);
  }
  updatePlayerMovement(dt);
  updatePlayerCollisions(dt);
  updatePlayerCamera(dt);
}
