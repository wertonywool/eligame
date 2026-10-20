// ============================================================================
// HUD: BARRAS DE JEFE Y PUZZLES (OMNI-MAN Y HOMELANDER)
// ============================================================================
function drawHUDBosses() {
  // 1. Barra de Jefe de Omni-Man (Solo activa en el interior del Castillo)
  if (omniMen.length > 0 && bossFightActive) {
    const boss = omniMen[0];
    const bw = 140;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 28;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(18, 6, 22, 0.95)', boss.isEnraged ? '#ff0055' : '#b31b52', 1.2);

    ctx.fillStyle = boss.isEnraged ? '#ff758f' : '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('OMNI-MAN', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / boss.maxHp) - 2;
    for (let i = 0; i < boss.maxHp; i++) {
      ctx.fillStyle = i < boss.hp ? (boss.isEnraged ? '#ff0055' : '#b31b52') : '#261432';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
  }

  // 2. Indicador de Secuencia de Gemas en la Fase 3 del Nivel 1
  if (level.id === 1 && colorPads.length > 0 && player.x >= 3700) {
    const isSolved = homelanderPuzzle && homelanderPuzzle.solved;
    if (!isSolved) {
      const curIdx = homelanderPuzzle ? homelanderPuzzle.currentIndex : 0;
      const seq = (homelanderPuzzle && homelanderPuzzle.sequence) ? homelanderPuzzle.sequence : [0, 1, 2, 3, 4, 5, 6];
      const bw = 150;
      const bx = Math.round(W / 2 - bw / 2);
      const by = 28;

      drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.2);

      const gemSpacing = 18;
      const startX = W / 2 - (seq.length - 1) * (gemSpacing / 2);
      for (let i = 0; i < seq.length; i++) {
        const padId = seq[i];
        const p = colorPads.find(cp => cp.id === padId) || colorPads[i] || { hex: '#ffd166' };
        const gx = Math.round(startX + i * gemSpacing);
        const gy = by + 9;
        const isCurrent = (i === curIdx);
        const isDone = (i < curIdx);

        if (isCurrent) {
          const pulse = Math.sin(globalFrame * 0.25) * 1.5;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(gx - 6 - pulse, gy - 5 - pulse, 12 + pulse * 2, 10 + pulse * 2);
        }

        ctx.fillStyle = isDone ? p.hex : (isCurrent ? p.hex : '#261432');
        ctx.fillRect(gx - 5, gy - 4, 10, 8);
        ctx.strokeStyle = isDone ? '#ffffff' : (isCurrent ? '#ffffff' : (p.hex || '#555'));
        ctx.lineWidth = 1;
        ctx.strokeRect(gx - 5, gy - 4, 10, 8);

        if (isDone) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold 6px ${UI_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('✓', gx, gy + 3);
        }
      }
      ctx.textAlign = 'left';
    }
  }

  // 3. Barra de Jefe del Kraken de las Profundidades (Mundo 3 Fase 5)
  const kraken = typeof krakenBossState !== 'undefined' ? (window.krakenBossState || krakenBossState) : null;
  if (kraken && kraken.active) {
    const bw = 184;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 30;
    const phaseNames = ['DESPERTAR', 'FURIA ABISAL', 'CATACLISMO TOTAL'];
    const pColor = kraken.phase === 3 ? '#ff0054' : (kraken.phase === 2 ? '#00f5d4' : '#ffd166');
    const borderColor = kraken.phase === 3 ? '#ff0054' : (kraken.phase === 2 ? '#00f5d4' : '#00b4d8');

    drawRoundedPanel(bx, by, bw, 25, 6, 'rgba(3, 7, 30, 0.94)', borderColor, 1.4);

    ctx.save();
    ctx.textBaseline = 'top';
    ctx.fillStyle = pColor;
    ctx.font = `bold 6.5px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(`KRAKEN ABISAL - FASE ${kraken.phase}: ${phaseNames[kraken.phase - 1]}`, W / 2, by + 4);

    // 8 Indicadores de ojos del Kraken
    const eyeSpacing = 17;
    const startX = W / 2 - (kraken.maxEyes - 1) * (eyeSpacing / 2);
    for (let i = 0; i < kraken.maxEyes; i++) {
      const isAlive = i < kraken.eyesRemaining;
      const ex = Math.round(startX + i * eyeSpacing);
      const ey = by + 16;

      ctx.fillStyle = isAlive ? '#000814' : '#0a1128';
      ctx.fillRect(ex - 5, ey - 4, 10, 7);
      ctx.strokeStyle = isAlive ? (kraken.phase === 3 ? '#ff0054' : '#00f5d4') : '#343a40';
      ctx.lineWidth = 1;
      ctx.strokeRect(ex - 5, ey - 4, 10, 7);

      if (isAlive) {
        ctx.fillStyle = kraken.phase === 3 ? '#ffbe0b' : '#ffd166';
        ctx.fillRect(ex - 4, ey - 3, 8, 5);
        ctx.fillStyle = kraken.phase === 3 ? '#ff0054' : '#00b4d8';
        ctx.fillRect(ex - 1, ey - 2, 2, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ex - 3, ey - 3, 1, 1);
      } else {
        ctx.fillStyle = '#1c2541';
        ctx.fillRect(ex - 3, ey - 1, 6, 1);
      }
    }
    ctx.restore();
  }

  // 4. Barra de Jefe del Gran Yeti (Mundo 4 • Fase 6)
  if (typeof yetiBossState !== 'undefined' && yetiBossState && yetiBossState.active && !yetiBossState.isDefeated) {
    const bw = 160;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 28;
    const isEnraged = yetiBossState.hp <= 2;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(15, 23, 42, 0.95)', isEnraged ? '#ef4444' : '#0284c7', 1.2);

    ctx.save();
    ctx.fillStyle = isEnraged ? '#fca5a5' : '#e0f2fe';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(isEnraged ? 'GRAN YETI: FURIA ARTICA' : 'EL GRAN YETI DE CRISTAL', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / yetiBossState.maxHp) - 2;
    for (let i = 0; i < yetiBossState.maxHp; i++) {
      ctx.fillStyle = i < yetiBossState.hp ? (isEnraged ? '#ef4444' : '#38bdf8') : '#1e293b';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
    ctx.restore();
  }

  // 5. Barra de Jefe del Dragón Astral de Polaris (Mundo 4 • Fase 9)
  if (typeof astralBossState !== 'undefined' && astralBossState && astralBossState.active && !astralBossState.isDefeated) {
    const bw = 170;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 28;
    const isEnraged = astralBossState.hp <= 3;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(8, 4, 22, 0.95)', isEnraged ? '#ff007f' : '#ffd166', 1.3);

    ctx.save();
    ctx.fillStyle = isEnraged ? '#ff758f' : '#fff3b0';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(isEnraged ? 'DRAGON ASTRAL: HIPERNOVA' : 'EL DRAGON ASTRAL DE POLARIS', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / astralBossState.maxHp) - 2;
    for (let i = 0; i < astralBossState.maxHp; i++) {
      ctx.fillStyle = i < astralBossState.hp ? (isEnraged ? '#ff007f' : '#00f5d4') : '#1e1b4b';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
    ctx.restore();
  }
}
