// ============================================================================
// MISIONES MUNDO 3 • FASE 4: DON PANCHO, SUS HOTDOGS Y LA ÚLTIMA LLAVE
// ============================================================================
// 1. "Saben asqueroso" -> Don Pancho dice "A" y EXPLOTA.
// 2. "Saben muy bien"   -> Don Pancho dice "muchas gracias por la respuesta generica donde esta el originilismo" y se CONGELA.
// 3. "No sé"            -> Don Pancho dice "si tiene sentido solo soy un npc no tiene sentido nada" y se ELECTROCHUTA.
// En cualquiera de las 3 opciones suelta el último pedazo de llave (4/4).

function getHotdogQuest() {
  if (!saveState.hotdogQuest) {
    saveState.hotdogQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'KEY_DROPPED' | 'COMPLETED'
      choice: null,
      fate: null,
      keyCollected: false,
      keyX: 12480,
      keyY: 192
    };
  }
  return saveState.hotdogQuest;
}

function triggerDonPanchoFate(choice) {
  const q = getHotdogQuest();
  q.choice = choice;

  if (choice === 'asqueroso') q.fate = 'EXPLODE';
  else if (choice === 'bien') q.fate = 'FREEZE';
  else q.fate = 'ELECTROCUTE';

  q.state = 'KEY_DROPPED';
  q.keyX = 12480;
  q.keyY = 192;
  persistSave();

  const kx = q.keyX + 8;
  const ky = q.keyY + 6;

  if (q.fate === 'EXPLODE') {
    spawnParticles(kx, ky, 30, '#ffffff', 140, -40);
    spawnParticles(kx, ky, 22, '#ff2a70', 120, -30);
    spawnParticles(kx, ky, 16, '#3b0820', 90, -15);
    triggerShake(0.24, 3.8);
    if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
    spawnFloatingText(kx - 16, ky - 26, '¡BOOOOOOM!', '#ffd166');
  } else if (q.fate === 'FREEZE') {
    spawnParticles(kx, ky, 26, '#ffffff', 80, -20);
    spawnParticles(kx, ky, 18, '#ffcad4', 70, -15);
    triggerShake(0.12, 1.8);
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
    spawnFloatingText(kx - 20, ky - 26, '¡CONGELADO!', '#ffffff');
  } else {
    spawnParticles(kx, ky, 28, '#ffffff', 110, -30);
    spawnParticles(kx, ky, 18, '#ff2a70', 100, -20);
    triggerShake(0.18, 3.0);
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
    spawnFloatingText(kx - 20, ky - 26, '¡BZZZZZZT!', '#ffd166');
  }

  // Desprendimiento del último pedazo de llave
  spawnStarSparkles(kx, ky, 20, '#ffd166');
  spawnStarSparkles(kx, ky, 14, '#ffffff');
  spawnFloatingText(kx - 34, ky - 14, '¡EL ÚLTIMO PEDAZO DE LLAVE!', '#ffd166');
}

function updateDonPanchoHotdogs(dt) {
  if (gameState !== 'PLAYING') return;
  const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
  if (!q || q.state !== 'KEY_DROPPED' || q.keyCollected) return;

  if (globalFrame % 14 === 0) {
    spawnStarSparkles(q.keyX + 6, q.keyY + 6, 1, '#ffd166');
  }

  // Detección de recogida por Mamá Elizabeth
  const dist = Math.hypot(player.x + 11 - (q.keyX + 6), player.y + 12 - (q.keyY + 6));
  if (dist < 20) {
    q.keyCollected = true;
    q.state = 'COMPLETED';
    saveState.keysPhase3 = 4; // 4 llaves completas para el ascensor
    persistSave();

    triggerShake(0.2, 3.0);
    spawnStarSparkles(player.x + 11, player.y + 8, 24, '#ffd166');
    spawnStarSparkles(player.x + 11, player.y + 8, 16, '#ffffff');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();

    if (typeof startKeyAssemblyAnimation === 'function') {
      startKeyAssemblyAnimation();
    }
  }
}

function drawDonPanchoHotdogsWorld(ctx) {
  const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
  if (!q || q.state !== 'KEY_DROPPED' || q.keyCollected) return;
  if (window.sprites && window.sprites.drawDroppedKeyPiece) {
    window.sprites.drawDroppedKeyPiece(ctx, q.keyX, q.keyY, globalFrame);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { getHotdogQuest, triggerDonPanchoFate, updateDonPanchoHotdogs, drawDonPanchoHotdogsWorld };
}
