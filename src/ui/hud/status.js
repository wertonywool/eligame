// ============================================================================
// HUD: ESTADO DEL JUGADOR (VIDAS, QUESOS, FLORES Y BOTÓN ZONAS)
// ============================================================================
// Paleta estricta: Negro Obsidiana, Blanco Puro y Rosado Oscuro

function drawHUDStatus() {
  const collectedCount = cheeses.filter(c => c.collected).length;
  const cheeseText = `${collectedCount}/${cheeses.length}`;
  const flowerText = `${saveState.dexterLilies || 0}`;

  ctx.font = `bold 7.5px ${UI_FONT}`;
  const cheeseTextW = Math.ceil(ctx.measureText(cheeseText).width);
  const flowerTextW = Math.ceil(ctx.measureText(flowerText).width);

  const hudX = 10;
  const hudY = 7;
  const hudH = 22;
  const hudR = 6;

  // Dimensiones dinámicas de secciones para cero colisiones
  const heartSpacing = 13;
  const heartsW = player.maxLives * heartSpacing;

  let curX = hudX + 8;
  const heartsStartX = curX;
  curX += heartsW + 6;

  // Divisor 1
  const div1X = curX;
  curX += 7;

  // Sección Quesos
  const cheeseIconX = curX;
  const cheeseTextX = curX + 13;
  curX = cheeseTextX + cheeseTextW + 7;

  // Divisor 2
  const div2X = curX;
  curX += 7;

  // Sección Flores
  const flowerIconX = curX;
  const flowerTextX = curX + 13;
  curX = flowerTextX + flowerTextW + 7;

  // Divisor 3
  const div3X = curX;
  curX += 7;

  // Botón Zonas / Mapa
  const warpBtnW = 50;
  const warpBtnH = 16;
  const warpBtnX = curX;
  const warpBtnY = hudY + 3;
  curX += warpBtnW + 6;

  const hudW = curX - hudX;

  const warpBtn = {
    x: warpBtnX, y: warpBtnY, w: warpBtnW, h: warpBtnH,
    action: () => {
      window.sfx.playJump(false);
      openWorldMap(currentLevelIndex);
    }
  };

  // Contenedor principal: Cápsula oscura en obsidiana con ribete rosado oscuro
  const hudGrad = ctx.createLinearGradient(hudX, hudY, hudX, hudY + hudH);
  hudGrad.addColorStop(0, 'rgba(22, 6, 26, 0.95)');
  hudGrad.addColorStop(1, 'rgba(10, 3, 14, 0.95)');
  drawRoundedPanel(hudX, hudY, hudW, hudH, hudR, hudGrad, '#8f143c', 1.2);

  // Divisores verticales sutiles
  ctx.fillStyle = 'rgba(255, 117, 160, 0.22)';
  ctx.fillRect(div1X, hudY + 4, 1, hudH - 8);
  ctx.fillRect(div2X, hudY + 4, 1, hudH - 8);
  ctx.fillRect(div3X, hudY + 4, 1, hudH - 8);

  // 1. Corazones de Rubí Pixel Art
  for (let i = 0; i < player.maxLives; i++) {
    const hx = heartsStartX + i * heartSpacing;
    const hy = hudY + 6;
    const isFull = i < player.lives;
    const isPulsing = player.lives === 1 && isFull;
    const pulseY = isPulsing ? Math.round(Math.sin(globalFrame * 0.25) * 1) : 0;

    if (isFull) {
      ctx.fillStyle = '#100618';
      ctx.fillRect(hx + 1, hy - pulseY, 3, 1);
      ctx.fillRect(hx + 5, hy - pulseY, 3, 1);
      ctx.fillRect(hx, hy + 1 - pulseY, 9, 4);
      ctx.fillRect(hx + 1, hy + 5 - pulseY, 7, 2);
      ctx.fillRect(hx + 2, hy + 7 - pulseY, 5, 1);
      ctx.fillRect(hx + 3, hy + 8 - pulseY, 3, 1);
      ctx.fillRect(hx + 4, hy + 9 - pulseY, 1, 1);

      ctx.fillStyle = '#b31b52';
      ctx.fillRect(hx + 1, hy + 1 - pulseY, 7, 4);
      ctx.fillRect(hx + 2, hy + 5 - pulseY, 5, 2);
      ctx.fillRect(hx + 3, hy + 7 - pulseY, 3, 1);

      ctx.fillStyle = '#ff75a0';
      ctx.fillRect(hx + 1, hy + 1 - pulseY, 2, 2);
      ctx.fillRect(hx + 5, hy + 1 - pulseY, 2, 1);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx + 2, hy + 2 - pulseY, 1, 1);
    } else {
      ctx.fillStyle = 'rgba(20, 6, 22, 0.8)';
      ctx.fillRect(hx + 1, hy, 7, 5);
      ctx.fillRect(hx + 2, hy + 5, 5, 2);
      ctx.fillRect(hx + 3, hy + 7, 3, 1);
      ctx.fillStyle = '#4a0e22';
      ctx.fillRect(hx + 1, hy, 3, 1);
      ctx.fillRect(hx + 5, hy, 3, 1);
      ctx.fillRect(hx, hy + 1, 1, 4);
      ctx.fillRect(hx + 8, hy + 1, 1, 4);
      ctx.fillRect(hx + 1, hy + 5, 1, 2);
      ctx.fillRect(hx + 7, hy + 5, 1, 2);
      ctx.fillRect(hx + 2, hy + 7, 1, 1);
      ctx.fillRect(hx + 6, hy + 7, 1, 1);
      ctx.fillRect(hx + 3, hy + 8, 3, 1);
    }
  }

  // 2. Insignia de Quesos del Nivel (Sprite Pixel Art)
  drawPixelCheeseIcon(ctx, cheeseIconX, hudY + 5);
  ctx.textAlign = 'left';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cheeseText, cheeseTextX, hudY + 14);

  // 3. Insignia de Flores / Lirios
  drawPixelLilyIcon(ctx, flowerIconX, hudY + 5);
  ctx.textAlign = 'left';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillStyle = '#ffcad4';
  ctx.fillText(flowerText, flowerTextX, hudY + 14);

  // 4. Botón Zonas / Mapa
  drawRoundedPanel(warpBtn.x, warpBtn.y, warpBtn.w, warpBtn.h, 5, '#5a0c25', '#b31b52', 1.1);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('✦ ZONAS', Math.round(warpBtn.x + warpBtn.w / 2), warpBtn.y + 11);
  ctx.textAlign = 'left';
  hudPhaseButtons.push(warpBtn);
}
