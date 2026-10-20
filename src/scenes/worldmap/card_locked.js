// ============================================================================
// MAPA GALACTICO: TARJETA DE MUNDOS BLOQUEADOS
// ============================================================================
function drawLockedWorldMapCard(curWorld, cardX, cardY, cardW) {
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 11px ${UI_FONT}`;
  ctx.fillText(`* ${curWorld.name}: ${curWorld.title}`, cardX + 14, cardY + 20);

  // Insignia Bloqueado
  const lkBadgeW = 96;
  const lkBadgeX = cardX + cardW - lkBadgeW - 10;
  drawRoundedPanel(lkBadgeX, cardY + 7, lkBadgeW, 20, 8, 'rgba(42, 8, 22, 0.92)', '#ff75a0', 1.2);
  drawPixelLockIcon(ctx, lkBadgeX + 10, cardY + 17);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff75a0';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('BLOQUEADO', lkBadgeX + 22, cardY + 20);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f3e8ee';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(curWorld.desc, cardX + 14, cardY + 35);

  const tags = [
    { label: 'NUEVAS MECANICAS' },
    { label: 'JEFE GUARDIAN' },
    { label: `HIJO #${curWorld.idx + 1}` }
  ];
  for (let i = 0; i < tags.length; i++) {
    const tx = cardX + 14 + i * 140;
    const ty = cardY + 44;
    drawRoundedPanel(tx, ty, 132, 22, 6, 'rgba(14, 4, 18, 0.88)', '#b31b52', 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(tags[i].label, Math.round(tx + 66), ty + 15);
  }

  // Panel de Mision Principal
  drawRoundedPanel(cardX + 14, cardY + 72, cardW - 28, 26, 6, 'rgba(14, 4, 18, 0.88)', '#6e1034', 1);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('MISION:', cardX + 22, cardY + 88);
  ctx.fillStyle = '#ffffff';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(curWorld.objective, cardX + 70, cardY + 88);

  // Boton de Portal Inactivo
  const lockedBtn = {
    x: cardX + 40,
    y: cardY + 106,
    w: cardW - 80,
    h: 32,
    action: () => {
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      shakeTime = 0.2;
      shakeMagnitude = 3;
    }
  };
  drawRoundedPanel(lockedBtn.x, lockedBtn.y, lockedBtn.w, lockedBtn.h, 10, 'rgba(42, 8, 22, 0.85)', '#b31b52', 1.6);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffccd5';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(`COMPLETA EL MUNDO ${curWorld.idx} PARA DESBLOQUEAR ESTE WARP PAD`, Math.round(lockedBtn.x + lockedBtn.w / 2), lockedBtn.y + 20);
  menuButtons.push(lockedBtn);
}
