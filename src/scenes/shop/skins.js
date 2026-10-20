// ============================================================================
// TIENDA: BOUTIQUE DE SKINS DE ELIZABETH (5 SKINS TEMÁTICAS + CLÁSICA)
// ============================================================================
const SKINS_CONFIG = [
  {
    key: 'rick_prime',
    name: 'Rick Prime',
    subtitle: 'Científico Multiversal',
    badge: 'Rick & Morty',
    effect: '✦ Portales verdes y chispas ✦',
    cost: 100,
    unlockedByDefault: false
  },
  {
    key: 'homelander',
    name: 'Homelander',
    subtitle: 'El Patriota Supremo',
    badge: 'The Boys',
    effect: '✦ Rastro láser carmesí y oro ✦',
    cost: 200,
    unlockedByDefault: false
  },
  {
    key: 'peacemaker',
    name: 'Peacemaker',
    subtitle: 'Héroe del Casco Cromado',
    badge: 'DC Comics',
    effect: '✦ Cromo pulido y plumas de paz ✦',
    cost: 300,
    unlockedByDefault: false
  },
  {
    key: 'ivan_alien_stage',
    name: 'Ivan',
    subtitle: 'Vocalista Alien Stage',
    badge: 'Alien Stage',
    effect: '✦ Pétalos negros y brasas rojas ✦',
    cost: 400,
    unlockedByDefault: false
  },
  {
    key: 'abaddon_hotel',
    name: 'Abaddon',
    subtitle: 'Sombra Hotel Embrujado',
    badge: 'Hotel Embrujado',
    effect: '✦ Niebla espectral y fuegos fatuos ✦',
    cost: 500,
    unlockedByDefault: false
  },
  {
    key: 'classic',
    name: 'Elizabeth Clásica',
    subtitle: 'Aspecto Original',
    badge: 'Original',
    effect: '✦ Polvo estelar brillante ✦',
    cost: 0,
    unlockedByDefault: true
  }
];

function drawShopSkinsView() {
  const curSkin = SKINS_CONFIG.find(s => s.key === selectedSkinPreview) || SKINS_CONFIG[0];
  const isOwned = (saveState.unlockedSkins && saveState.unlockedSkins.includes(curSkin.key)) || curSkin.unlockedByDefault;
  const isEquipped = saveState.equippedSkin === curSkin.key;
  const canBuySkin = !isOwned && (saveState.dexterLilies || 0) >= curSkin.cost;

  // Cámara de Exhibición (Izquierda)
  const cx = 22;
  const cy = 62;
  const cw = 156;
  const ch = 194;
  drawRoundedPanel(cx, cy, cw, ch, 10, 'rgba(18, 6, 22, 0.96)', '#b31b52', 1.6);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('✦ PROBADOR EN VIVO ✦', Math.round(cx + cw / 2), cy + 14);

  // Pastilla del Universo / Tema
  drawRoundedPanel(cx + 14, cy + 20, cw - 28, 14, 5, 'rgba(32, 8, 24, 0.95)', '#ff75a0', 1);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(`[TEMA: ${curSkin.badge.toUpperCase()}]`, Math.round(cx + cw / 2), cy + 30);

  // Pedestal de exhibición y Mamá Ratón luciendo la skin con sus accesorios en vivo
  drawCrystalWarpPad(cx + cw / 2, cy + 86, 44, 10, 'rgba(217, 37, 104, 0.35)');
  window.sprites.drawMamaMouse(ctx, cx + cw / 2 - 12, cy + 70, 'idle', globalFrame * 0.08, true, 1.45, 1.45, 0, false, curSkin.key);

  // Información de la Skin seleccionada (Minimalista, elegante y sin desbordes)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText(curSkin.name.toUpperCase(), Math.round(cx + cw / 2), cy + 110);

  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(curSkin.subtitle, Math.round(cx + cw / 2), cy + 123);

  // Pastilla del efecto especial (Elegante y contenida dentro de la ventana)
  drawRoundedPanel(cx + 10, cy + 132, cw - 20, 18, 5, 'rgba(12, 4, 16, 0.75)', '#5a1028', 1);
  ctx.fillStyle = '#ffcad4';
  ctx.font = `5.8px ${UI_FONT}`;
  ctx.fillText(curSkin.effect, Math.round(cx + cw / 2), cy + 143);

  // Botón de Acción en la Cámara de Exhibición
  const actBtn = {
    x: cx + 12, y: cy + 160, w: cw - 24, h: 22,
    action: () => {
      if (isEquipped) {
        window.sfx.playJump(false);
      } else if (isOwned) {
        saveState.equippedSkin = curSkin.key;
        persistSave();
        window.sfx.playJump(false);
        spawnParticles(actBtn.x + actBtn.w / 2, actBtn.y + actBtn.h / 2, 14, '#ffffff', 60, 40);
      } else if (canBuySkin) {
        saveState.dexterLilies -= curSkin.cost;
        if (!saveState.unlockedSkins.includes(curSkin.key)) {
          saveState.unlockedSkins.push(curSkin.key);
        }
        saveState.equippedSkin = curSkin.key;
        persistSave();
        window.sfx.playBuy();
        triggerShake(0.12, 2);
        spawnParticles(actBtn.x + actBtn.w / 2, actBtn.y + actBtn.h / 2, 18, '#ff75a0', 80, 50);
      } else {
        window.sfx.playHurt();
        triggerShake(0.08, 1.5);
      }
    }
  };

  let actFill = '#330818';
  let actBorder = '#ff75a0';
  let actText = '✓ EQUIPADA';

  if (!isOwned && canBuySkin) {
    actFill = '#8f143c';
    actBorder = '#ffffff';
    actText = `COMPRAR (${curSkin.cost} FLORES)`;
  } else if (!isOwned) {
    actFill = '#200614';
    actBorder = '#6e1034';
    actText = `FALTAN FLORES (${curSkin.cost})`;
  } else if (!isEquipped) {
    actFill = '#8f143c';
    actBorder = '#ffffff';
    actText = '▶ USAR ASPECTO';
  }

  drawRoundedPanel(actBtn.x, actBtn.y, actBtn.w, actBtn.h, 6, actFill, actBorder, (canBuySkin || (isOwned && !isEquipped)) ? 1.8 : 1.2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(actText, Math.round(actBtn.x + actBtn.w / 2), actBtn.y + 14);
  menuButtons.push(actBtn);

  // Lista de las 5 Skins + Clásica para Seleccionar (Derecha)
  const listX = 186;
  const listW = 272;
  const cardH = 28;
  const cardGap = 4;
  for (let i = 0; i < SKINS_CONFIG.length; i++) {
    const s = SKINS_CONFIG[i];
    const sy = 62 + i * (cardH + cardGap);
    const isSel = selectedSkinPreview === s.key;
    const sOwned = (saveState.unlockedSkins && saveState.unlockedSkins.includes(s.key)) || s.unlockedByDefault;
    const sEquipped = saveState.equippedSkin === s.key;

    const cardFill = isSel ? '#8f143c' : 'rgba(20, 7, 24, 0.94)';
    const cardBorder = isSel ? '#ffffff' : (sEquipped ? '#ff75a0' : '#b31b52');
    drawRoundedPanel(listX, sy, listW, cardH, 6, cardFill, cardBorder, isSel ? 2 : 1.2);

    // 1. Sprite Único de la Skin (Miniatura Pixel Art interactiva en vivo)
    drawRoundedPanel(listX + 4, sy + 3, 24, 22, 4, isSel ? 'rgba(40, 8, 22, 0.85)' : 'rgba(10, 3, 12, 0.7)', isSel ? '#ffcad4' : '#5a1028', 1);
    ctx.save();
    window.sprites.drawMamaMouse(ctx, listX + 8, sy + 2, 'idle', globalFrame * 0.06, true, 0.65, 0.65, 0, false, s.key);
    ctx.restore();

    // 2. Texto Organizado: Nombre en blanco arriba, subtítulo abajo (Cero choques de texto)
    const textX = listX + 34;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7.5px ${UI_FONT}`;
    ctx.fillText(s.name, textX, sy + 12);

    ctx.fillStyle = isSel ? '#ffe5ec' : '#ffcad4';
    ctx.font = `5.8px ${UI_FONT}`;
    ctx.fillText(s.subtitle, textX, sy + 22);

    // 3. Estado / Precio a la derecha (Limpio y legible con icono pixel art)
    const badgeRight = listX + listW - 8;
    if (sEquipped) {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('✓ EQUIPADA', badgeRight, sy + 17);
    } else if (sOwned) {
      ctx.textAlign = 'right';
      ctx.fillStyle = isSel ? '#ffffff' : '#ff9ebb';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('✓ OBTENIDA', badgeRight, sy + 17);
    } else {
      drawPixelLilyIcon(ctx, badgeRight - 60, sy + 8);
      ctx.textAlign = 'right';
      ctx.fillStyle = isSel ? '#ffffff' : '#ffcad4';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText(`${s.cost} Flores`, badgeRight, sy + 17);
    }

    menuButtons.push({
      x: listX, y: sy, w: listW, h: cardH,
      action: () => {
        selectedSkinPreview = s.key;
        window.sfx.playJump(false);
      }
    });
  }
}
