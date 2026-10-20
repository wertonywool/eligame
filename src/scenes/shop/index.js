// ============================================================================
// TIENDA: ENTRADA PRINCIPAL Y SELECTOR DE PESTAÑAS (SKINS / HABILIDADES)
// ============================================================================
let shopTab = 'skins'; // 'skins' | 'skills'
let selectedSkinPreview = 'rick_prime';

function drawShopScreen() {
  menuButtons = [];

  // Fondo cielo cósmico obsidiana profundo
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#07020a');
  bgGrad.addColorStop(0.55, '#160618');
  bgGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas sutiles de fondo
  for (let i = 0; i < 16; i++) {
    const sx = 20 + ((i * 53 + 12) % (W - 40));
    const sy = 12 + ((i * 37 + 7) % (H - 24));
    drawSparkleStar(sx, sy, 1.2, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }

  // Barra Superior: Título + Botón Volver + Marcadores de Monedas
  drawRoundedPanel(16, 6, W - 32, 28, 8, 'rgba(20, 7, 24, 0.96)', '#b31b52', 1.5);

  const backBtn = {
    x: 22, y: 9, w: 64, h: 22,
    action: () => {
      window.sfx.playJump(false);
      gameState = previousShopState || 'TITLE';
    }
  };
  drawRoundedPanel(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 6, '#5a0c25', '#b31b52', 1.2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('◀ ATRÁS', Math.round(backBtn.x + backBtn.w / 2), backBtn.y + 15);
  menuButtons.push(backBtn);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 9.5px ${UI_FONT}`;
  ctx.fillText(shopTab === 'skins' ? 'BOUTIQUE DE SKINS' : 'ÁRBOL DE EVOLUCIÓN', W / 2 + 10, 18);

  const srx1 = Math.round(W / 2 - 95);
  drawPixelLilyIcon(ctx, srx1, 23);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${saveState.dexterLilies || 0} Flores`, srx1 + 14, 30);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', srx1 + 95, 30);

  const srx2 = Math.round(W / 2 + 15);
  drawPixelCheeseIcon(ctx, srx2, 23);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${saveState.bankCheeses} Quesos`, srx2 + 16, 30);
  ctx.textAlign = 'center';

  // Pestañas Superiores de Categoría (Skins en primer lugar con iconos pixel art)
  const tabSkins = {
    x: 22, y: 36, w: 214, h: 22,
    action: () => { window.sfx.playJump(false); shopTab = 'skins'; }
  };
  const isTabSkins = shopTab === 'skins';
  drawRoundedPanel(tabSkins.x, tabSkins.y, tabSkins.w, tabSkins.h, 7, isTabSkins ? '#8f143c' : 'rgba(18, 6, 22, 0.94)', isTabSkins ? '#ffffff' : '#b31b52', isTabSkins ? 2 : 1.2);
  drawPixelShopIcon(ctx, tabSkins.x + 14, tabSkins.y + 6);
  ctx.textAlign = 'left';
  ctx.fillStyle = isTabSkins ? '#ffffff' : '#d4a5b8';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText('BOUTIQUE DE SKINS', tabSkins.x + 30, tabSkins.y + 15);
  ctx.textAlign = 'center';
  menuButtons.push(tabSkins);

  const tabSkills = {
    x: 244, y: 36, w: 214, h: 22,
    action: () => { window.sfx.playJump(false); shopTab = 'skills'; }
  };
  const isTabSkills = shopTab === 'skills';
  drawRoundedPanel(tabSkills.x, tabSkills.y, tabSkills.w, tabSkills.h, 7, isTabSkills ? '#8f143c' : 'rgba(18, 6, 22, 0.94)', isTabSkills ? '#ffffff' : '#b31b52', isTabSkills ? 2 : 1.2);
  drawPixelCheeseIcon(ctx, tabSkills.x + 14, tabSkills.y + 6);
  ctx.textAlign = 'left';
  ctx.fillStyle = isTabSkills ? '#ffffff' : '#d4a5b8';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText('ÁRBOL DE EVOLUCIÓN', tabSkills.x + 30, tabSkills.y + 15);
  ctx.textAlign = 'center';
  menuButtons.push(tabSkills);

  // Renderizar la vista de la pestaña activa
  if (shopTab === 'skills') {
    drawShopSkillsView();
  } else {
    drawShopSkinsView();
  }

  ctx.textAlign = 'left';
}
