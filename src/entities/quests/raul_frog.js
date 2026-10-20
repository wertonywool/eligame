// ============================================================================
// MISIONES MUNDO 3: EL NPC RAÚL Y EL FRAGMENTO DE LLAVE #3
// ============================================================================
// Al hablar con Raúl, entrega directamente el fragmento de Llave de Bronce #3.
// Sin cronómetro ni temporizador de cuenta regresiva (pedido expreso del usuario).

function getRaulQuest() {
  if (!saveState.raulQuest) {
    saveState.raulQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'COMPLETED'
      keyGiven: false
    };
  }
  return saveState.raulQuest;
}

function completeRaulDialogue(npc) {
  const q = getRaulQuest();
  if (q.keyGiven) return;
  q.keyGiven = true;
  q.state = 'COMPLETED';

  saveState.keysPhase3 = Math.max(saveState.keysPhase3 || 0, 3);
  persistSave();

  const px = npc ? npc.x : player.x;
  const py = npc ? npc.y : player.y;

  triggerShake(0.15, 2.0);
  spawnStarSparkles(px + 8, py - 4, 20, '#ffd166');
  spawnStarSparkles(px + 8, py - 4, 14, '#ffffff');
  spawnFloatingText(player.x - 36, player.y - 20, 'LLAVE DE BRONCE #3 RECIBIDA!', '#ffd166');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function updateRaulFrog(dt) {
  // Cronometro eliminado segun pedido del usuario
}

function drawRaulFrogHUD(ctx) {
  // Cronometro y HUD eliminados segun pedido del usuario
}

if (typeof module !== 'undefined') {
  module.exports = {
    getRaulQuest,
    completeRaulDialogue,
    updateRaulFrog,
    drawRaulFrogHUD
  };
}
