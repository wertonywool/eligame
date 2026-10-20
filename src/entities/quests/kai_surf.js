// ============================================================================
// MISIONES MUNDO 3 • FASE 3: MISIÓN 2 "EL SURFISTA KAI Y LAS 67 OLAS"
// ============================================================================
// Misión 2 de 4:
// - Desafío propuesto por Kai el Surfista: atravesar "67 olas" en la rompiente.
// - Al cruzar 8 olas con el Water Dash, Kai queda perplejo ("ya me queda claro que llegas a las 67").
// - Recompensa: Llave de Bronce #2 y la apertura definitiva de la Tienda de Surf.

let activeKaiWaves = [];
let kaiWaveSpawnTimer = 0;

function getKaiQuest() {
  if (!saveState.kaiQuest) {
    saveState.kaiQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'ACTIVE' | 'READY_TO_TURN_IN' | 'COMPLETED'
      wavesCrossed: 0,
      memeTarget: 67,
      realTarget: 8,
      shopOpen: false,
      boardSkin: 'fucsia' // 'fucsia' | 'nacar' | 'neon'
    };
  }
  return saveState.kaiQuest;
}

function startKaiQuest() {
  const q = getKaiQuest();
  q.state = 'ACTIVE';
  q.wavesCrossed = 0;
  activeKaiWaves = [];
  kaiWaveSpawnTimer = 0.5;
  persistSave();
  spawnFloatingText(player.x - 10, player.y - 14, '¡MISIÓN 2: ATRAVIESA LAS 67 OLAS!', '#ffd166');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function updateKaiWaves(dt) {
  const q = typeof getKaiQuest === 'function' ? getKaiQuest() : null;
  if (!q || q.state !== 'ACTIVE') {
    activeKaiWaves = [];
    return;
  }

  // Zona de rompiente: X entre 8380 y 8780
  kaiWaveSpawnTimer -= dt;
  if (kaiWaveSpawnTimer <= 0) {
    kaiWaveSpawnTimer = 1.4 + Math.random() * 0.4;
    activeKaiWaves.push({
      id: Date.now() + Math.random(),
      x: 8780,
      y: 220,
      w: 24,
      h: 22,
      speed: 85 + Math.random() * 15,
      pierced: false
    });
  }

  const pFeetX = player.x + 11;
  const pFeetY = player.y + 22;

  for (let i = activeKaiWaves.length - 1; i >= 0; i--) {
    const w = activeKaiWaves[i];
    w.x -= w.speed * dt;

    // Colisión con Elizabeth
    const inRange = Math.abs(pFeetX - (w.x + 10)) < 18 && Math.abs(pFeetY - w.y) < 22;
    if (inRange && !w.pierced) {
      if (player.dashTimer > 0 && player.isSurfing) {
        // ¡Water Dash perfecto a través de la cresta!
        w.pierced = true;
        q.wavesCrossed++;
        persistSave();

        spawnParticles(w.x + 10, w.y - 10, 14, '#ffffff', 80, -25);
        spawnParticles(w.x + 10, w.y - 10, 8, '#ffcad4', 70, -15);
        spawnParticles(w.x + 10, w.y - 10, 6, '#ff2a70', 60, -10);
        triggerShake(0.08, 1.5);
        if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();

        if (q.wavesCrossed >= q.realTarget) {
          q.state = 'READY_TO_TURN_IN';
          persistSave();
          spawnFloatingText(player.x - 20, player.y - 22, '¡8/67! ¡KAI QUEDÓ IMPRESIONADO!', '#ffcad4');
          spawnStarSparkles(player.x + 11, player.y + 12, 18, '#ffd166');
          if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
        } else {
          spawnFloatingText(player.x - 12, player.y - 16, `¡OLA ATRAVESADA! (${q.wavesCrossed}/67)`, '#ffd166');
        }
      } else if (!w.hitCooldown || globalFrame - w.hitCooldown > 40) {
        w.hitCooldown = globalFrame;
        player.vx = -120;
        spawnParticles(player.x + 11, player.y + 22, 6, '#ffffff', 40, -10);
        spawnFloatingText(player.x - 14, player.y - 12, '¡USA WATER DASH (BOTÓN)!', '#ff75a0');
      }
    }

    if (w.x < 8350 || w.pierced) {
      activeKaiWaves.splice(i, 1);
    }
  }
}

function drawKaiWaves(ctx) {
  if (!activeKaiWaves || activeKaiWaves.length === 0) return;
  for (const w of activeKaiWaves) {
    if (window.sprites && window.sprites.drawSurfWave) {
      window.sprites.drawSurfWave(ctx, w, globalFrame);
    }
  }
}

function completeKaiQuest(kaiNpc) {
  const q = getKaiQuest();
  if (q.state !== 'READY_TO_TURN_IN') return;

  q.state = 'COMPLETED';
  q.shopOpen = true;
  saveState.keysPhase3 = Math.max(saveState.keysPhase3 || 0, 2);
  persistSave();

  triggerShake(0.18, 2.5);
  spawnStarSparkles(kaiNpc.x + 14, kaiNpc.y - 14, 22, '#ffd166');
  spawnStarSparkles(kaiNpc.x + 14, kaiNpc.y - 14, 16, '#ffffff');
  spawnFloatingText(kaiNpc.x - 24, kaiNpc.y - 24, '★ ¡LLAVE #2 OBTENIDA! TIENDA DE SURF ABIERTA ★', '#ffffff');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function drawKaiQuestHUD(ctx) {
  if (!saveState || !saveState.kaiQuest) return;
  const q = saveState.kaiQuest;
  if (q.state !== 'ACTIVE' && q.state !== 'READY_TO_TURN_IN') return;

  // Si Sami también está activo, ubicar debajo
  const samiActive = saveState.samiQuest && (saveState.samiQuest.state === 'ACTIVE' || saveState.samiQuest.state === 'READY_TO_TURN_IN');
  const pw = 124;
  const ph = 20;
  const px = W - pw - 10;
  const py = samiActive ? 56 : 32;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(18, 5, 24, 0.94)', '#ff2a70', 1.2);

  // Icono de ola de surf
  ctx.fillStyle = '#ffcad4';
  ctx.beginPath();
  ctx.arc(px + 11, py + 11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 9, py + 8, 4, 3);

  ctx.textAlign = 'left';
  ctx.fillStyle = q.state === 'READY_TO_TURN_IN' ? '#ffd166' : '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;

  if (q.state === 'READY_TO_TURN_IN') {
    ctx.fillText(`¡Habla con Kai! (8/67)`, px + 22, py + 13);
  } else {
    ctx.fillText(`Olas: ${q.wavesCrossed}/67 (Water Dash)`, px + 22, py + 13);
  }
}
