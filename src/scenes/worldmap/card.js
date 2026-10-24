// ============================================================================
// MAPA GALACTICO: TARJETA DE DETALLES DEL MUNDO Y SELECTOR DE ZONAS
// ============================================================================
function drawWorldMapCard(curWorld) {
  const cardX = 20;
  const cardY = 112;
  const cardW = W - 40;
  const cardH = 148;
  const isVolcanoWorld = selectedWorldIndex === 1;
  const isCoastalWorld = selectedWorldIndex === 2;
  const isSnowWorld = selectedWorldIndex === 3;

  drawRoundedPanel(cardX, cardY, cardW, cardH, 14, 'rgba(18, 6, 22, 0.96)', '#b31b52', 2);

  if (!curWorld.unlocked) {
    drawLockedWorldMapCard(curWorld, cardX, cardY, cardW);
    ctx.textAlign = 'left';
    return;
  }

  const rawLvl = (window.LEVELS && window.LEVELS[selectedWorldIndex]) || (window.LEVELS && window.LEVELS[0]) || { id: 1, cheeses: [] };
  const savedCheeses = (saveState.collectedCheeseIds && saveState.collectedCheeseIds[rawLvl.id])
    ? saveState.collectedCheeseIds[rawLvl.id].length : 0;
  const totalCheeses = rawLvl.cheeses ? rawLvl.cheeses.length : 0;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = curWorld.title.length > 28 ? `bold 6.5px ${UI_FONT}` : `bold 8.5px ${UI_FONT}`;
  ctx.fillText(`* ${curWorld.name}: ${curWorld.title}`, cardX + 14, cardY + 20);

  const badgeW = 104;
  const badgeX = cardX + cardW - badgeW - 10;
  drawRoundedPanel(badgeX, cardY + 7, badgeW, 20, 7, 'rgba(10, 3, 12, 0.92)', '#b31b52', 1.2);
  drawPixelCheeseIcon(ctx, badgeX + 7, cardY + 12);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${savedCheeses}/${totalCheeses} Quesos`, badgeX + 22, cardY + 20);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f3e8ee';
  ctx.font = `6px ${UI_FONT}`;
  const subText = rawLvl.subtitle || curWorld.desc;
  ctx.fillText(subText, cardX + 14, cardY + 34);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('ZONAS DE TELETRANSPORTE:', cardX + 14, cardY + 47);

  let zones = [];
  if (isSnowWorld) {
    zones = [
      { label: 'F1: BASE', sub: 'Campamento 1', cpId: null },
      { label: 'F2: KHUMBU', sub: 'Cascada Hielo', cpId: 19 },
      { label: 'F3: NAMCHE', sub: 'Aldea Nevada', cpId: 23 },
      { label: 'F4: GOKYO', sub: 'Lagos Sagrados', cpId: 30 },
      { label: 'F5: EVEREST', sub: 'La Gran Cima', cpId: 37 },
      { label: 'F6: YETI', sub: 'Santuario', cpId: 41 },
      { label: 'F7: SHAMBHALA', sub: 'Pagoda', cpId: 42 },
      { label: 'F8: KAILASH', sub: 'Agartha', cpId: 44 },
      { label: 'F9: COSMOS', sub: 'Vía Láctea', cpId: 46 },
      { label: 'F9: POLARIS', sub: 'Sanctum', cpId: 48 }
    ];
  } else if (isCoastalWorld) {
    zones = [
      { label: 'F1: CIUDAD', sub: 'Inicio', cpId: null },
      { label: 'F2: PLAYA', sub: 'Surf', cpId: 5 },
      { label: 'F3: RESORT', sub: 'Helados', cpId: 9 },
      { label: 'CP: AZOTEA', sub: 'Oficinas', cpId: 13 },
      { label: 'F4: CIUDAD', sub: 'Objetivo', cpId: 14 }
    ];
  } else if (isVolcanoWorld) {
    zones = [
      { label: 'F1: VILLA', sub: 'Inicio', cpId: null },
      { label: 'CP1: ESTE', sub: 'Basalto', cpId: 1 },
      { label: 'F2: CIAN', sub: 'Cristal', cpId: 2 },
      { label: 'F3: FORJA', sub: 'Hornos', cpId: 3 },
      { label: 'F4: BOSS', sub: 'Castillo', cpId: 4 }
    ];
  } else {
    zones = [
      { label: 'F1: TREBOL', sub: 'Aldea Cerezos', cpId: null },
      { label: 'F2: LOTO', sub: 'Estanque Cristal', cpId: 1 },
      { label: 'F3: ROSAS', sub: 'Jardin Real', cpId: 2 }
    ];
  }

  const hasGrid = zones.length > 5;
  const cols = hasGrid ? 5 : zones.length;
  const zw = hasGrid ? 76 : (zones.length <= 3 ? 132 : 78);
  const zh = hasGrid ? 24 : 38;
  const gapX = hasGrid ? 6 : (zones.length <= 3 ? 8 : 5);
  const gapY = 4;

  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    const col = hasGrid ? (i % cols) : i;
    const row = hasGrid ? Math.floor(i / cols) : 0;
    const zx = cardX + 16 + col * (zw + gapX);
    const zy = cardY + 50 + row * (zh + gapY);
    const active = selectedZoneCpId === z.cpId;

    drawRoundedPanel(zx, zy, zw, zh, hasGrid ? 6 : 9,
      active ? '#8f143c' : 'rgba(12, 4, 16, 0.94)',
      active ? '#ffffff' : '#b31b52',
      active ? 2.0 : 1.2
    );

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = hasGrid ? (z.label.length > 10 ? `bold 5.5px ${UI_FONT}` : `bold 6.2px ${UI_FONT}`) : `bold 7px ${UI_FONT}`;
    ctx.fillText(z.label, Math.round(zx + zw / 2), zy + (hasGrid ? 10 : 15));

    ctx.fillStyle = active ? '#ffe5ec' : '#d4a5b8';
    ctx.font = hasGrid ? (z.sub.length > 11 ? `4.8px ${UI_FONT}` : `5.4px ${UI_FONT}`) : `6px ${UI_FONT}`;
    ctx.fillText(z.sub, Math.round(zx + zw / 2), zy + (hasGrid ? 19 : 27));

    menuButtons.push({
      x: zx, y: zy, w: zw, h: zh,
      action: () => {
        selectedZoneCpId = z.cpId;
        jumpToLevelPhase(selectedWorldIndex, z.cpId);
      }
    });
  }

  const playBtnY = hasGrid ? cardY + 108 : cardY + 104;
  const playBtnH = hasGrid ? 28 : 34;
  const playBtn = {
    x: cardX + 60, y: playBtnY, w: cardW - 120, h: playBtnH,
    action: () => { jumpToLevelPhase(selectedWorldIndex, selectedZoneCpId); }
  };
  drawRoundedPanel(playBtn.x, playBtn.y, playBtn.w, playBtn.h, 10, '#8f143c', '#ffffff', 2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${hasGrid ? '9px' : '10px'} ${UI_FONT}`;
  ctx.fillText('< TELETRANSPORTAR AL MUNDO >', Math.round(playBtn.x + playBtn.w / 2), playBtn.y + (hasGrid ? 18 : 22));
  menuButtons.push(playBtn);
  ctx.textAlign = 'left';
}
