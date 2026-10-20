// ============================================================================
// MAPA GALÁCTICO: CONTROLADOR PRINCIPAL Y NAVEGACIÓN ENTRE MUNDOS
// ============================================================================
let menuButtons = [];
let hudPhaseButtons = [];
let selectedWorldIndex = 0;
let selectedZoneCpId = null;
let worldMapScrollX = 0;
let targetWorldMapScrollX = 0;
let worldMapNavCooldown = 0;
let worldMapDrag = { active: false, startX: 0, startScroll: 0, hasMoved: false };

function getWorldMapScrollTarget(idx) {
  const w = WORLDS_CONFIG[idx] || WORLDS_CONFIG[0];
  const maxScroll = Math.max(0, WORLDS_CONFIG[WORLDS_CONFIG.length - 1].x - (W - 80));
  return Math.max(0, Math.min(maxScroll, w.x - W / 2));
}

function openWorldMap(worldIdx = selectedWorldIndex) {
  gameState = 'WORLD_MAP';
  selectedWorldIndex = Math.max(0, Math.min(WORLDS_CONFIG.length - 1, worldIdx));
  targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
  worldMapScrollX = targetWorldMapScrollX;
  selectedZoneCpId = null;
}

function jumpToLevelPhase(levelIdx, checkpointId) {
  const targetRaw = window.LEVELS[levelIdx] || window.LEVELS[0];
  if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};

  if (!checkpointId || checkpointId === 0) {
    delete saveState.activeCheckpoints[targetRaw.id];
  } else {
    const cp = (targetRaw.checkpoints || []).find(c => c.id === checkpointId);
    if (cp) {
      saveState.activeCheckpoints[targetRaw.id] = {
        id: cp.id,
        x: cp.x,
        y: cp.y,
        name: cp.name
      };
    }
  }
  persistSave();
  loadLevel(levelIdx);
  gameState = 'PLAYING';
  window.sfx.init();
  if (typeof startPortalArrival === 'function') {
    startPortalArrival();
  } else {
    window.sfx.playCheckpoint();
  }
}

function drawWorldMapScreen() {
  menuButtons = [];

  // Fondo estelar profundo en negro obsidiana
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#07020a');
  bgGrad.addColorStop(0.55, '#160618');
  bgGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas de fondo con sutil paralaje
  ctx.save();
  ctx.translate(-Math.round(worldMapScrollX * 0.25), 0);
  for (let i = 0; i < 24; i++) {
    const sx = 20 + ((i * 67 + 15) % 850);
    const sy = 12 + ((i * 29 + 8) % 95);
    drawSparkleStar(sx, sy, (i % 2) + 1.2, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }
  ctx.restore();

  // Barra Superior del Mapa de Mundos + Botón Volver + Acceso a Tienda
  drawRoundedPanel(16, 6, W - 32, 26, 8, 'rgba(20, 7, 24, 0.96)', '#b31b52', 1.5);
  const curWorld = WORLDS_CONFIG[selectedWorldIndex] || WORLDS_CONFIG[0];

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  const titleText = `MUNDO ${selectedWorldIndex + 1}: ${(curWorld.title || curWorld.name).toUpperCase()}`;
  ctx.font = titleText.length > 24 ? `bold 7px ${UI_FONT}` : `bold 9px ${UI_FONT}`;
  ctx.fillText(titleText, Math.round(W / 2 + 20), 22);

  const backBtn = {
    x: 22, y: 8, w: 66, h: 22,
    action: () => { window.sfx.playJump(false); gameState = 'TITLE'; }
  };
  drawRoundedPanel(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 6, '#5a0c25', '#b31b52', 1.2);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('◀ INICIO', Math.round(backBtn.x + backBtn.w / 2), backBtn.y + 15);
  menuButtons.push(backBtn);


  // Renderizar planetas y tarjeta
  drawWorldMapPlanets();
  drawWorldMapCard(curWorld);

  ctx.textAlign = 'left';
}
