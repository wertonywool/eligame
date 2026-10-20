// Detectar toques/clics sobre los botones del Menú Principal, Mapa de Mundos, Tienda y HUD
canvas.addEventListener('pointerdown', e => {
  window.sfx.init();
  const rect = canvas.getBoundingClientRect();
  const cx = ((e.clientX - rect.left) / rect.width) * W;
  const cy = ((e.clientY - rect.top) / rect.height) * H;

  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    for (const b of menuButtons) {
      if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
        b.action();
        return;
      }
    }
    // Si toca en la zona de planetas de la constelación, permitir arrastre horizontal
    if (gameState === 'WORLD_MAP' && cy >= 34 && cy <= 110) {
      worldMapDrag.active = true;
      worldMapDrag.startX = cx;
      worldMapDrag.startScroll = worldMapScrollX;
      worldMapDrag.hasMoved = false;
    }
  } else if (gameState === 'PLAYING') {
    for (const hb of hudPhaseButtons) {
      if (cx >= hb.x && cx <= hb.x + hb.w && cy >= hb.y && cy <= hb.y + hb.h) {
        hb.action();
        return;
      }
    }
    if (typeof nearbyNpc !== 'undefined' && nearbyNpc) {
      const camX = typeof camera !== 'undefined' ? camera.x : 0;
      const camY = typeof camera !== 'undefined' ? camera.y : 0;
      const worldX = cx + camX;
      const worldY = cy + camY;
      if (Math.abs(worldX - (nearbyNpc.x + 8)) < 40 && Math.abs(worldY - (nearbyNpc.y + 8)) < 45) {
        keys.downJustPressed = true;
        return;
      }
    }
  } else if (gameState === 'DIALOGUE') {
    if (typeof dialogueChoiceButtons !== 'undefined' && dialogueChoiceButtons.length > 0) {
      for (const cb of dialogueChoiceButtons) {
        if (cx >= cb.x && cx <= cb.x + cb.w && cy >= cb.y && cy <= cb.y + cb.h) {
          selectDialogueChoice(cb.index);
          return;
        }
      }
    }
    keys.jumpJustPressed = true;
  } else {
    keys.jumpJustPressed = true;
  }
});

window.addEventListener('pointermove', e => {
  if (gameState === 'WORLD_MAP' && worldMapDrag.active) {
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * W;
    const dx = cx - worldMapDrag.startX;
    if (Math.abs(dx) > 4) {
      worldMapDrag.hasMoved = true;
      const maxScroll = Math.max(0, WORLDS_CONFIG[WORLDS_CONFIG.length - 1].x - (W - 80));
      targetWorldMapScrollX = Math.max(0, Math.min(maxScroll, worldMapDrag.startScroll - dx));
      worldMapScrollX = targetWorldMapScrollX;
    }
  }
});

window.addEventListener('pointerup', () => {
  if (gameState === 'WORLD_MAP' && worldMapDrag.active) {
    worldMapDrag.active = false;
    if (worldMapDrag.hasMoved) {
      const centerWorldX = worldMapScrollX + W / 2;
      let closestIdx = 0, minDist = Infinity;
      for (let i = 0; i < WORLDS_CONFIG.length; i++) {
        const d = Math.abs(WORLDS_CONFIG[i].x - centerWorldX);
        if (d < minDist) { minDist = d; closestIdx = i; }
      }
      selectedWorldIndex = closestIdx;
      selectedZoneCpId = null;
      targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
});

// Botones de la barra superior con Iconos SVG
document.getElementById('btn-menu')?.addEventListener('click', () => {
  const dashBtn = document.getElementById('btn-dash');
  if (dashBtn) dashBtn.classList.remove('visible');
  gameState = 'TITLE';
});

document.getElementById('btn-map')?.addEventListener('click', () => {
  const dashBtn = document.getElementById('btn-dash');
  if (dashBtn) dashBtn.classList.remove('visible');
  openWorldMap(currentLevelIndex);
});

document.getElementById('btn-mute')?.addEventListener('click', e => {
  const muted = window.sfx.toggleMute();
  e.currentTarget.style.opacity = muted ? '0.45' : '1';
});

document.getElementById('btn-restart')?.addEventListener('click', () => {
  if (gameState === 'PLAYING' && player) {
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.vx = 0;
    player.vy = 0;
  } else {
    loadLevel(currentLevelIndex);
    gameState = 'PLAYING';
  }
});

document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
  const wrapper = document.getElementById('game-wrapper');
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
});

