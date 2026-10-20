// ============================================================================
// MAPA GALÁCTICO: RENDERIZADO DEL SISTEMA PLANETARIO Y NAVEGACIÓN
// ============================================================================
function drawWorldMapPlanets() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 34, W, 76);
  ctx.clip();
  ctx.translate(-Math.round(worldMapScrollX), 0);

  // Línea estelar que conecta los planetas
  ctx.strokeStyle = 'rgba(217, 37, 104, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < WORLDS_CONFIG.length; i++) {
    if (i === 0) ctx.moveTo(WORLDS_CONFIG[i].x, WORLDS_CONFIG[i].y);
    else ctx.lineTo(WORLDS_CONFIG[i].x, WORLDS_CONFIG[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = '#ff8fab';
  ctx.lineWidth = 1.6;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Dibujar cada planeta
  for (const w of WORLDS_CONFIG) {
    const isSelected = selectedWorldIndex === w.idx;
    const r = isSelected ? 19 : 14;

    if (isSelected) {
      const pulse = Math.sin(globalFrame * 0.12) * 1.8;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w.x, w.y, r + 5 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 117, 160, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(w.x, w.y, r + 9 + pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    const pGrad = ctx.createRadialGradient(w.x - r * 0.32, w.y - r * 0.32, 1, w.x, w.y, r);
    if (w.unlocked) {
      pGrad.addColorStop(0, '#ffffff');
      pGrad.addColorStop(0.35, w.ring);
      pGrad.addColorStop(1, w.color);
    } else {
      pGrad.addColorStop(0, '#381022');
      pGrad.addColorStop(0.55, '#1a0612');
      pGrad.addColorStop(1, '#0a0208');
    }
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isSelected ? '#ffffff' : (w.unlocked ? w.ring : '#5a1028');
    ctx.lineWidth = isSelected ? 2.2 : 1.2;
    ctx.stroke();

    ctx.strokeStyle = w.unlocked ? w.ring : '#4d0d22';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(w.x, w.y, r + 6, 4, -0.28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    if (w.unlocked) drawSparkleStar(w.x, w.y, isSelected ? 6 : 4, '#ffffff');
    else drawPixelLockIcon(ctx, w.x, w.y);

    ctx.fillStyle = isSelected ? '#ffffff' : (w.unlocked ? '#ffcad4' : '#8a6275');
    ctx.font = isSelected ? `bold 8px ${UI_FONT}` : `7px ${UI_FONT}`;
    ctx.fillText(w.name, w.x, w.y + r + 13);
  }
  ctx.restore();

  // Hitboxes interactivas para clic en cada planeta
  for (const w of WORLDS_CONFIG) {
    const screenX = Math.round(w.x - worldMapScrollX);
    if (screenX >= -30 && screenX <= W + 30) {
      menuButtons.push({
        x: screenX - 22, y: w.y - 22, w: 44, h: 46,
        action: () => { window.sfx.playJump(false); selectedWorldIndex = w.idx; selectedZoneCpId = null; }
      });
    }
  }

  // Flechas de navegación fijas
  if (selectedWorldIndex > 0) {
    const arrowL = { x: 6, y: 56, w: 22, h: 28 };
    drawRoundedPanel(arrowL.x, arrowL.y, arrowL.w, arrowL.h, 6, 'rgba(28, 8, 22, 0.94)', '#b31b52', 1.4);
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.font = `bold 11px ${UI_FONT}`;
    ctx.fillText('<', Math.round(arrowL.x + arrowL.w / 2), arrowL.y + 18);
    menuButtons.push({
      x: arrowL.x - 2, y: arrowL.y - 2, w: arrowL.w + 6, h: arrowL.h + 4,
      action: () => { if (selectedWorldIndex > 0) { window.sfx.playJump(false); selectedWorldIndex--; selectedZoneCpId = null; } }
    });
  }

  if (selectedWorldIndex < WORLDS_CONFIG.length - 1) {
    const arrowR = { x: W - 28, y: 56, w: 22, h: 28 };
    drawRoundedPanel(arrowR.x, arrowR.y, arrowR.w, arrowR.h, 6, 'rgba(28, 8, 22, 0.94)', '#b31b52', 1.4);
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.font = `bold 11px ${UI_FONT}`;
    ctx.fillText('>', Math.round(arrowR.x + arrowR.w / 2), arrowR.y + 18);
    menuButtons.push({
      x: arrowR.x - 4, y: arrowR.y - 2, w: arrowR.w + 6, h: arrowR.h + 4,
      action: () => { if (selectedWorldIndex < WORLDS_CONFIG.length - 1) { window.sfx.playJump(false); selectedWorldIndex++; selectedZoneCpId = null; } }
    });
  }
}
