// ============================================================================
// MECÁNICAS MUNDO 3 • FASE 3: INTERACCIÓN CON SKINS DE TABLA DE SURF
// ============================================================================

const SURFBOARD_STANDS = [
  { skinKey: 'classic', x: 8150, y: 220, name: 'Rosa Neón' },
  { skinKey: 'nacar', x: 8185, y: 220, name: 'Nácar Marina' },
  { skinKey: 'obsidian', x: 8220, y: 220, name: 'Obsidiana Magma' }
];

function updateSurfboardSkinsInteraction() {
  if (gameState !== 'PLAYING') return;

  const px = player.x + 11;
  const py = player.y + 22;

  for (const stand of SURFBOARD_STANDS) {
    const inRange = Math.abs(px - stand.x) < 18 && Math.abs(py - stand.y) < 24;
    if (inRange) {
      if (keys.jumpJustPressed) {
        const isShopOpen = saveState && saveState.kaiQuest && saveState.kaiQuest.shopOpen;
        if (!isShopOpen) {
          spawnFloatingText(stand.x - 24, stand.y - 45, '¡COMPLETA EL RETO DE KAI PARA DESBLOQUEAR!', '#ff75a0');
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          return;
        }

        if (saveState.surfboardSkin === stand.skinKey) {
          spawnFloatingText(stand.x - 14, stand.y - 42, `¡YA TIENES EQUIPADA LA ${stand.name.toUpperCase()}!`, '#ffd166');
          return;
        }

        // Equipar nueva skin
        saveState.surfboardSkin = stand.skinKey;
        persistSave();

        keys.jumpJustPressed = false;
        player.vy = 0;

        // Efectos temáticos de cada skin
        if (stand.skinKey === 'nacar') {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ffd166');
          spawnStarSparkles(stand.x, stand.y - 20, 12, '#ffffff');
          spawnParticles(player.x + 11, player.y + 12, 12, '#ffcad4', 70, -20);
        } else if (stand.skinKey === 'obsidian') {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ff2a70');
          spawnParticles(player.x + 11, player.y + 12, 14, '#8f143c', 80, -25);
          spawnParticles(player.x + 11, player.y + 12, 8, '#07020a', 60, -15);
        } else {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ff2a70');
          spawnParticles(player.x + 11, player.y + 12, 12, '#ffffff', 70, -20);
        }

        triggerShake(0.1, 1.5);
        spawnFloatingText(player.x - 24, player.y - 22, `¡TABLA EQUIPADA: ${stand.name.toUpperCase()}!`, '#ffd166');
        if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
        return;
      }
    }
  }
}

function getSurfboardStands() {
  return SURFBOARD_STANDS;
}
