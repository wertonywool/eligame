// ============================================================================
// TIENDA: ÁRBOL DE EVOLUCIÓN (HABILIDADES CON QUESOS)
// ============================================================================
const SKILLS_TREE_CONFIG = [
  // --- TIER 1 (NIVEL 1) - Costo: 1 Queso ---
  {
    key: 'extraHeart1',
    tier: 1,
    cost: 1,
    reqSkill: null,
    title: '✦ Corazón I',
    benefit: '+1 Vida (4 Corazones)',
    col: 0, row: 0
  },
  {
    key: 'cheeseMagnet',
    tier: 1,
    cost: 1,
    reqSkill: null,
    title: '✦ Imán Dorado',
    benefit: 'Atrae quesos y flores',
    col: 1, row: 0
  },

  // --- TIER 2 (NIVEL 2) - Costo: 2 Quesos ---
  {
    key: 'fastDash',
    tier: 2,
    cost: 2,
    reqSkill: 'extraHeart1',
    title: '✦ Sombra Ígnea',
    benefit: '-30% Enfriamiento Dash',
    col: 0, row: 1
  },
  {
    key: 'featherFall',
    tier: 2,
    cost: 2,
    reqSkill: 'cheeseMagnet',
    title: '✦ Pluma Dexter',
    benefit: 'Salto grácil y planeo',
    col: 1, row: 1
  },

  // --- TIER 3 (NIVEL 3) - Costo: 3 Quesos ---
  {
    key: 'longerInvuln',
    tier: 3,
    cost: 3,
    reqSkill: 'fastDash',
    title: '✦ Resonancia',
    benefit: '+0.8s Inmunidad daño',
    col: 0, row: 2
  },
  {
    key: 'flowerHarvest',
    tier: 3,
    cost: 3,
    reqSkill: 'featherFall',
    title: '✦ Cosecha Doble',
    benefit: 'Doble flor en combate',
    col: 1, row: 2
  },

  // --- TIER 4 (NIVEL 4 - MAESTRÍA SUPREMA) - Costo: 4 Quesos ---
  {
    key: 'extraHeart2',
    tier: 4,
    cost: 4,
    reqSkill: 'longerInvuln',
    title: '✦ Bendición',
    benefit: '+2 Vidas (5 Corazones)',
    col: 0, row: 3
  }
];

function drawShopSkillsView() {
  // Conexiones verticales entre Tiers del árbol
  const connectors = [
    { colX: 22 + 38, r1: 0, r2: 1, active: !!saveState.upgrades.extraHeart1 },
    { colX: 22 + 38, r1: 1, r2: 2, active: !!saveState.upgrades.fastDash },
    { colX: 22 + 38, r1: 2, r2: 3, active: !!saveState.upgrades.longerInvuln },
    { colX: 244 + 38, r1: 0, r2: 1, active: !!saveState.upgrades.cheeseMagnet },
    { colX: 244 + 38, r1: 1, r2: 2, active: !!saveState.upgrades.featherFall },
    { colX: 244 + 38, r1: 2, r2: 3, active: !!saveState.upgrades.flowerHarvest }
  ];

  for (const c of connectors) {
    const topY = 62 + c.r1 * 46 + 40;
    const botY = 62 + c.r2 * 46;
    ctx.strokeStyle = c.active ? '#ffffff' : '#3d0a1a';
    ctx.lineWidth = c.active ? 2.2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(c.colX, topY - 1);
    ctx.lineTo(c.colX, botY + 1);
    ctx.stroke();

    ctx.fillStyle = c.active ? '#ff75a0' : '#5a1028';
    ctx.beginPath();
    ctx.moveTo(c.colX - 3.5, botY - 3);
    ctx.lineTo(c.colX + 3.5, botY - 3);
    ctx.lineTo(c.colX, botY);
    ctx.closePath();
    ctx.fill();
  }

  for (const it of SKILLS_TREE_CONFIG) {
    const bx = it.col === 0 ? 22 : 244;
    const by = 62 + it.row * 46;
    const bw = 214;
    const bh = 40;

    const owned = !!saveState.upgrades[it.key];
    const reqMet = !it.reqSkill || !!saveState.upgrades[it.reqSkill];
    const canBuy = !owned && reqMet && saveState.bankCheeses >= it.cost;

    const cardFill = owned ? 'rgba(40, 10, 24, 0.88)' : (canBuy ? 'rgba(22, 6, 26, 0.94)' : 'rgba(14, 4, 18, 0.82)');
    const cardBorder = owned ? '#ff75a0' : (canBuy ? '#b31b52' : '#5a1028');
    drawRoundedPanel(bx, by, bw, bh, 8, cardFill, cardBorder, owned ? 1.6 : 1.2);

    ctx.fillStyle = owned ? '#ff75a0' : (canBuy ? '#ffffff' : '#4d0a1c');
    ctx.fillRect(bx + 4, by + 12, 3, 16);

    ctx.textAlign = 'left';
    ctx.fillStyle = owned ? '#ffffff' : (reqMet ? '#ffffff' : '#8a6275');
    ctx.font = `bold 7.5px ${UI_FONT}`;
    ctx.fillText(it.title, bx + 12, by + 13);

    ctx.fillStyle = owned ? '#ffcad4' : (reqMet ? '#f3e8ee' : '#6b4859');
    ctx.font = `6.5px ${UI_FONT}`;
    ctx.fillText(it.benefit, bx + 12, by + 24);

    ctx.fillStyle = '#ff75a0';
    ctx.font = `6px ${UI_FONT}`;
    ctx.fillText(`✦ Tier ${it.tier} (${it.cost} Quesos)`, bx + 12, by + 34);

    const btnW = 66;
    const btnH = 24;
    const btnX = bx + bw - btnW - 6;
    const btnY = by + 8;

    let btnFill = '#1c0612';
    let btnBorder = '#5a1028';
    let btnText = `COMPRAR`;
    let btnTextColor = '#8a6275';

    if (owned) {
      btnFill = '#3b0c20';
      btnBorder = '#ff75a0';
      btnText = '✓ ACTIVO';
      btnTextColor = '#ffffff';
    } else if (canBuy) {
      btnFill = '#8f143c';
      btnBorder = '#ffffff';
      btnText = `${it.cost} QUESOS`;
      btnTextColor = '#ffffff';
    } else if (!reqMet) {
      btnFill = '#12040d';
      btnBorder = '#3d0a1a';
      btnText = 'BLOQUEADO';
      btnTextColor = '#6b4859';
    } else {
      btnFill = '#240816';
      btnBorder = '#6e1034';
      btnText = `FALTA Q`;
      btnTextColor = '#d4a5b8';
    }

    drawRoundedPanel(btnX, btnY, btnW, btnH, 6, btnFill, btnBorder, canBuy ? 1.8 : 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = btnTextColor;
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(btnText, Math.round(btnX + btnW / 2), btnY + 16);

    menuButtons.push({
      x: bx, y: by, w: bw, h: bh,
      action: () => {
        if (canBuy) {
          saveState.bankCheeses -= it.cost;
          saveState.upgrades[it.key] = true;
          persistSave();
          window.sfx.playBuy();
          triggerShake(0.12, 2);
          spawnParticles(bx + bw / 2, by + bh / 2, 14, '#ff75a0', 70, 40);
        } else if (owned) {
          window.sfx.playJump(false);
        } else {
          window.sfx.playHurt();
          triggerShake(0.08, 1.5);
        }
      }
    });
  }

  const mx = 244;
  const my = 62 + 3 * 46;
  const mw = 214;
  const mh = 40;
  const unlockedSkills = Object.values(saveState.upgrades).filter(Boolean).length;
  const isMasteryComplete = unlockedSkills >= 7;
  drawRoundedPanel(mx, my, mw, mh, 8, isMasteryComplete ? 'rgba(56, 12, 34, 0.94)' : 'rgba(26, 8, 30, 0.94)', isMasteryComplete ? '#ffffff' : '#b31b52', isMasteryComplete ? 2 : 1.4);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText(isMasteryComplete ? '★ ¡MAESTRÍA TOTAL ACTIVADA!' : '★ MAESTRÍA DE EVOLUCIÓN', Math.round(mx + mw / 2), my + 15);
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`Progreso: ${unlockedSkills}/7 Habilidades Desbloqueadas`, Math.round(mx + mw / 2), my + 28);
}
