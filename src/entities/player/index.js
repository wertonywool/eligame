// --- Orquestador Principal del Jugador ---
function updatePlayer(dt) {
  updatePlayerMovement(dt);
  updatePlayerCollisions(dt);
  updatePlayerCamera(dt);
}
