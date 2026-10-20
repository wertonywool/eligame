// ============================================================================
// MISIONES MUNDO 3 • FASE 3: MISIÓN 1 "SAMI EL HELADERO"
// ============================================================================
// Misión 1 de 4:
// - Vende 10 helados a los turistas de la playa.
// - Reúne el pago total ($100).
// - Devuelve el pago a Sami para recibir la Llave de Bronce de la Ciudadela.

function getSamiQuest() {
  if (!saveState.samiQuest) {
    saveState.samiQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'ACTIVE' | 'READY_TO_TURN_IN' | 'COMPLETED'
      sold: 0,
      target: 10,
      money: 0
    };
  }
  return saveState.samiQuest;
}

function startSamiQuest() {
  const q = getSamiQuest();
  q.state = 'ACTIVE';
  q.sold = 0;
  q.target = 10;
  q.money = 0;
  persistSave();
  spawnFloatingText(player.x - 10, player.y - 14, '¡MISIÓN 1: 10 HELADOS!', '#ffd166');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function deliverIceCreamToTourist(npc) {
  const q = getSamiQuest();
  if (q.state !== 'ACTIVE' || npc.boughtIceCream) return null;

  npc.boughtIceCream = true;
  q.sold++;
  q.money += 10;
  persistSave();

  if (q.sold >= q.target) {
    q.state = 'READY_TO_TURN_IN';
    spawnFloatingText(npc.x - 12, npc.y - 16, '¡10/10 VENDIDOS! VUELVE CON SAMI', '#ffcad4');
  } else {
    spawnFloatingText(npc.x - 6, npc.y - 14, `+$10 (${q.sold}/${q.target} Helados)`, '#ffd166');
  }

  spawnParticles(npc.x + 8, npc.y + 4, 8, '#ffcad4', 50, -15);
  spawnParticles(npc.x + 8, npc.y + 4, 4, '#ffffff', 60, -20);
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();

  return [
    `¡Mmm, qué delicia de helado de fresa y vainilla! ¡Muchas gracias Elizabeth!`,
    `Aquí tienes tus $10 de pago. ¡Sigue así!`
  ];
}

function completeSamiQuest(samiNpc) {
  const q = getSamiQuest();
  if (q.state !== 'READY_TO_TURN_IN') return;

  q.state = 'COMPLETED';
  saveState.keysPhase3 = (saveState.keysPhase3 || 0) + 1;
  persistSave();

  triggerShake(0.15, 2);
  spawnStarSparkles(samiNpc.x + 14, samiNpc.y - 12, 18, '#ffd166');
  spawnStarSparkles(samiNpc.x + 14, samiNpc.y - 12, 12, '#ffffff');
  spawnFloatingText(samiNpc.x - 14, samiNpc.y - 22, '★ ¡LLAVE DE BRONCE #1 DESBLOQUEADA! ★', '#ffffff');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function drawSamiQuestHUD(ctx) {
  if (!saveState || !saveState.samiQuest) return;
  const q = saveState.samiQuest;
  if (q.state !== 'ACTIVE' && q.state !== 'READY_TO_TURN_IN') return;

  // Mini-Panel de progreso de la misión en la parte superior derecha
  const pw = 124;
  const ph = 20;
  const px = W - pw - 10;
  const py = 32;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(18, 5, 24, 0.94)', '#b31b52', 1.2);

  if (window.sprites && window.sprites.drawIceCreamCone) {
    window.sprites.drawIceCreamCone(ctx, px + 11, py + 12, 0.9);
  }

  ctx.textAlign = 'left';
  ctx.fillStyle = q.state === 'READY_TO_TURN_IN' ? '#ffd166' : '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;

  if (q.state === 'READY_TO_TURN_IN') {
    ctx.fillText(`¡Vuelve con Sami!`, px + 22, py + 13);
  } else {
    ctx.fillText(`Helados: ${q.sold}/10 ($${q.money})`, px + 22, py + 13);
  }
}
