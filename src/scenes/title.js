// ============================================================================
// 1. PANTALLA PRINCIPAL: ESTILO UNIFICADO (NEGRO, BLANCO Y ROSADO OSCURO)
// ============================================================================
function drawTitleScreen() {
  menuButtons = [];

  // Fondo cielo cósmico obsidiana profundo
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#07020a');
  skyGrad.addColorStop(0.55, '#160618');
  skyGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas titilantes en blanco y rosado suave
  for (let i = 0; i < 14; i++) {
    const sx = 30 + ((i * 47) % (W - 60));
    const sy = 18 + ((i * 31) % 170);
    const pulse = 2 + Math.sin(globalFrame * 0.06 + i) * 1.5;
    drawSparkleStar(sx, sy, pulse, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }

  // Emblema Superior Redondeado en Obsidiana con Borde Rosado Oscuro
  drawRoundedPanel(44, 12, W - 88, 48, 12, 'rgba(18, 6, 22, 0.96)', '#b31b52', 2);
  drawSparkleStar(68, 30, 5, '#ffffff');
  drawSparkleStar(W - 68, 30, 5, '#ffffff');

  // Título Nítido en Blanco Puro
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('EL GRAN ESCAPE DE ELIZABETH', W / 2, 33);

  // Pastilla de recursos unificada con Sprites Pixel Art (Cero Emojis)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;

  const rx1 = Math.round(W / 2 - 155);
  drawPixelCheeseIcon(ctx, rx1, 42);
  ctx.fillText(`${saveState.bankCheeses} Quesos`, rx1 + 15, 49);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', rx1 + 95, 49);

  const rx2 = Math.round(W / 2 - 45);
  drawPixelLilyIcon(ctx, rx2, 42);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${saveState.dexterLilies || 0} Flores`, rx2 + 14, 49);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', rx2 + 95, 49);

  const rx3 = Math.round(W / 2 + 65);
  drawPixelBabyMouseIcon(ctx, rx3, 42);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${saveState.rescuedBabies.length}/7 Hijos`, rx3 + 14, 49);

  // Escenario central despejado: Altar de Obsidiana/Cuarzo Rosa con Elizabeth y Portal
  drawCrystalWarpPad(W / 2, 156, 56, 13, 'rgba(217, 37, 104, 0.32)');
  window.sprites.drawPortal(ctx, W / 2 + 30, 132, globalFrame, 0.72);
  window.sprites.drawMamaMouse(ctx, W / 2 - 26, 126, 'idle', globalFrame * 0.08, true, 1.35, 1.35, 0, false, saveState.equippedSkin);

  // Los 3 Botones Principales Unificados en Negro, Blanco y Rosado Oscuro
  const mainBtns = [
    {
      idx: 0,
      title: '★ MUNDOS',
      sub: 'Elegir Mundo y Zona',
      x: 28, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        openWorldMap(currentLevelIndex);
      }
    },
    {
      idx: 1,
      title: '★ MADRIGUERA',
      sub: `Hijos (${saveState.rescuedBabies.length}/7)`,
      x: 174, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        if (saveState.rescuedBabies.length === 0) saveState.rescuedBabies.push(1);
        enterSafeHouse(window.LEVELS[0].babyMouse);
      }
    },
    {
      idx: 2,
      title: '★ TIENDA SKINS',
      sub: '5 Tipos & Evolución',
      x: 320, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        shopTab = 'skins';
        previousShopState = 'TITLE';
        gameState = 'SHOP';
      }
    }
  ];

  for (let i = 0; i < mainBtns.length; i++) {
    const b = mainBtns[i];
    const isSelected = selectedMenuIndex === i;

    // Sombra 3D en negro obsidiana
    drawRoundedPanel(b.x, b.y + 2, b.w, b.h, 12, '#08020a', null);

    // Superficie frontal: Rosado oscuro si está seleccionado, obsidiana profundo si está inactivo
    const fill = isSelected ? '#8f143c' : 'rgba(20, 7, 24, 0.94)';
    const border = isSelected ? '#ffffff' : '#b31b52';
    const borderWidth = isSelected ? 2.2 : 1.4;
    drawRoundedPanel(b.x, b.y, b.w, b.h - 1, 12, fill, border, borderWidth);

    // Halo sutil de selección
    if (isSelected) {
      ctx.strokeStyle = 'rgba(255, 117, 160, 0.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x - 3, b.y - 3, b.w + 6, b.h + 4);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 10px ${UI_FONT}`;
    ctx.fillText(b.title, Math.round(b.x + b.w / 2), b.y + 24);

    ctx.fillStyle = isSelected ? '#ffe5ec' : '#d4a5b8';
    ctx.font = `7px ${UI_FONT}`;
    ctx.fillText(b.sub, Math.round(b.x + b.w / 2), b.y + 40);

    menuButtons.push(b);
  }
  ctx.textAlign = 'left';
}

