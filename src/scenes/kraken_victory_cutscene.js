// ============================================================================
// CINEMÁTICA FINAL: HUNDIMIENTO DEL KRAKEN, ABRAZO Y RETORNO A LA MADRIGUERA
// ============================================================================
let krakenVictoryState = { active: false, timer: 0, duration: 5.2 };

function startKrakenVictoryCutscene() {
  gameState = 'KRAKEN_VICTORY_CUTSCENE';
  krakenVictoryState = { active: true, timer: 0, duration: 5.2 };
  window.krakenVictoryState = krakenVictoryState;
  triggerShake(1.2, 2.0);
  if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
  if (!saveState.rescuedBabies.includes(3)) {
    saveState.rescuedBabies.push(3);
    if (typeof persistSave === 'function') persistSave();
  }
}

function updateKrakenVictoryCutscene(dt) {
  const s = window.krakenVictoryState || krakenVictoryState;
  s.timer += dt;
  if (s.timer >= s.duration || (s.timer > 1.2 && keys.jumpJustPressed)) {
    s.active = false;
    const baby = (window.LEVELS && window.LEVELS[2] && window.LEVELS[2].babyMouse) || {
      id: 3, name: 'Hijo Ratoncito', nextAbilityName: 'MAESTRA DE LAS OLAS Y CIUDAD RESCATADA'
    };
    enterSafeHouse(baby);
  }
}

function drawKrakenVictoryCutscene() {
  const s = window.krakenVictoryState || krakenVictoryState;
  const t = s.timer;

  // 1. Cielo de calma post-tormenta: atardecer dorado en el océano
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#10002b');
  skyGrad.addColorStop(0.35, '#240046');
  skyGrad.addColorStop(0.65, '#e85d04');
  skyGrad.addColorStop(1, '#ffba08');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Sol poniente dorado rompiendo las nubes
  const sunX = W / 2 + 30;
  const sunY = 75;
  ctx.fillStyle = 'rgba(255, 209, 102, 0.35)';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffbe0b';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
  ctx.fill();

  // 2. Aguas marinas en calma y suave oleaje
  const seaGrad = ctx.createLinearGradient(0, H - 70, 0, H);
  seaGrad.addColorStop(0, '#0077b6');
  seaGrad.addColorStop(0.4, '#0096c7');
  seaGrad.addColorStop(0.8, '#023e8a');
  seaGrad.addColorStop(1, '#001233');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, H - 70, W, 70);

  // Espuma suave y destellos dorados del sol en el agua
  ctx.fillStyle = '#caf0f8';
  for (let x = 0; x < W; x += 12) {
    const wy = H - 70 + Math.round(Math.sin(globalFrame * 0.08 + x * 0.15) * 2);
    ctx.fillRect(x, wy, 8, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(x + 2, wy + 2, 4, 1);
    ctx.fillStyle = '#caf0f8';
  }

  // 3. Hundimiento definitivo del Kraken en el abismo
  if (t < 3.2) {
    const sinkY = H - 15 + Math.round((t / 2.5) * 85);
    const defBoss = { x: W / 2 + 105, y: sinkY, hitTimer: 0.1, eyesRemaining: 0, phase: 1 };
    if (window.sprites && window.sprites.drawKrakenBoss) {
      window.sprites.drawKrakenBoss(ctx, defBoss, globalFrame);
    }
    // Burbujas subiendo a la superficie
    for (let b = 0; b < 6; b++) {
      const bx = W / 2 + 85 + (b * 12);
      const by = H - 65 - ((Math.floor(globalFrame * 2 + b * 14)) % 50);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(bx, by, 3, 3);
    }
  }

  // 4. Plataforma del helipuerto de la torre
  const platX = 50, platY = H - 65, platW = 280;
  ctx.fillStyle = '#1f2421';
  ctx.fillRect(platX, platY, platW, 20);
  ctx.fillStyle = '#dee2e6';
  ctx.fillRect(platX, platY, platW, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(platX + 20, platY + 4, platW - 40, 2);

  // 5. Mamá Ratón y su Hijo corriendo a abrazarse
  let mamaX = platX + 40 + Math.min(60, t * 40);
  let sonX = platX + 170 - Math.min(50, t * 35);
  const reached = (sonX - mamaX) <= 16;
  if (reached) {
    mamaX = platX + 94;
    sonX = platX + 110;
    const heartBob = Math.sin(globalFrame * 0.2) * 4;
    ctx.fillStyle = '#ff0054';
    ctx.fillRect(platX + 101, platY - 26 + heartBob, 4, 4);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(platX + 102, platY - 28 + heartBob, 2, 2);
  }

  if (window.sprites) {
    window.sprites.drawMamaMouse(ctx, mamaX, platY - 22, reached ? 'idle' : 'run', globalFrame * 0.15, true, 1.2, 1.2, 0, false, saveState.equippedSkin);
    window.sprites.drawBabyMouse(ctx, sonX, platY - 18, globalFrame, 3);
  }

  // 6. Portal Interdimensional Verde hacia la Madriguera
  if (t >= 2.4) {
    const portalScale = Math.min(1.0, (t - 2.4) / 0.8);
    const portalX = platX + 220, portalY = platY - 16;
    if (window.sprites && window.sprites.drawPortal) {
      window.sprites.drawPortal(ctx, portalX, portalY, globalFrame, portalScale);
    }
    if (globalFrame % 4 === 0) spawnStarSparkles(portalX, portalY, 1, '#ccff33');
  }

  // 7. Banner Cinemático Triunfal
  const bw = 340, bh = 36, bx = Math.round((W - bw) / 2), by = 18;
  drawRoundedPanel(bx, by, bw, bh, 8, 'rgba(3, 7, 30, 0.94)', '#ffd166', 1.8);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('¡KRAKEN DERROTADO! ¡HIJO RESCATADO!', W / 2, by + 14);
  ctx.fillStyle = '#caf0f8';
  ctx.font = `6px ${UI_FONT}`;
  ctx.fillText('¡El Megatsunami ha sido calmado! Regresando a la Madriguera...', W / 2, by + 27);
  ctx.textAlign = 'left';
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenVictoryCutscene, updateKrakenVictoryCutscene, drawKrakenVictoryCutscene };
}
